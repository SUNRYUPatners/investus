"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronDown, Pin } from "lucide-react";
import {
  SEED_REPORTS,
  CATEGORY_STYLE,
  CATEGORY_EMOJI,
  type Report,
} from "@/lib/reports";

// ── 7일 필터 ──────────────────────────────────────────────────────────────
// updatedAt: "2026.05.14 07:27" KST 형식
// 현재 시각 기준 7일 이내 리포트만 표시

const SHOW_WINDOW = 7 * 24 * 60 * 60 * 1000;

function parseKST(s: string): Date {
  // "2026.05.14 07:27" → UTC 변환 (KST = UTC+9)
  const [datePart, timePart = "00:00"] = s.split(" ");
  const sep = datePart.includes(".") ? "." : "-";
  const [y, m, d] = datePart.split(sep).map(Number);
  const [h, mn]   = timePart.split(":").map(Number);
  return new Date(Date.UTC(y, m - 1, d, h - 9, mn));
}

function isWithinWindow(r: Report): boolean {
  const s = r.updatedAt ?? r.date;
  if (!s) return false;
  try {
    const dt = parseKST(s);
    if (isNaN(dt.getTime())) return false;
    return Date.now() - dt.getTime() < SHOW_WINDOW;
  } catch {
    return false;
  }
}

// ── ReportCard ────────────────────────────────────────────────────────────

function ReportCard({ report }: { report: Report }) {
  const [open, setOpen]               = useState(false);
  const [failedImgs, setFailedImgs]   = useState<Set<number>>(new Set());
  const style = CATEGORY_STYLE[report.categoryColor];
  const emoji = CATEGORY_EMOJI[report.category];

  const handleImgError = useCallback((idx: number) => {
    setFailedImgs((prev) => new Set(prev).add(idx));
  }, []);

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Summary row */}
      <div className="p-4">
        {/* Top: category + subject + pin + updatedAt */}
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: style.bg, color: style.color }}
          >
            {emoji} {report.category}
          </span>
          {report.subject && (
            <span
              className="text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.06)", color: "var(--text)" }}
            >
              {report.subject}
            </span>
          )}
          {report.isPinned && (
            <Pin className="w-3 h-3 flex-shrink-0" style={{ color: style.color }} />
          )}
          <span
            className="text-[9px] font-mono-num tabular-nums ml-auto flex-shrink-0"
            style={{ color: "var(--muted)", opacity: 0.7 }}
          >
            {report.updatedAt ?? report.date}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-sm font-bold leading-snug mb-2"
          style={{ color: "var(--text)" }}
        >
          {report.title}
        </h3>

        {/* Summary */}
        <p
          className="text-[12px] leading-relaxed"
          style={{
            color: "var(--muted)",
            display: "-webkit-box",
            WebkitLineClamp: open ? undefined : 3,
            WebkitBoxOrient: "vertical" as const,
            overflow: open ? "visible" : "hidden",
          }}
        >
          {report.summary}
        </p>

        {/* More button */}
        <button
          className="flex items-center gap-0.5 text-[11px] font-semibold mt-2.5 active:opacity-60 transition-opacity"
          style={{ color: style.color }}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "접기" : "더보기"}
          <ChevronDown
            className="w-3.5 h-3.5 transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "none" }}
          />
        </button>
      </div>

      {/* Full body */}
      {open && (
        <div
          className="border-t px-4 py-4"
          style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.02)" }}
        >
          {/* Images */}
          {report.images && report.images.length > 0 && (() => {
            const visibleImgs = report.images.filter((_, i) => !failedImgs.has(i));
            if (visibleImgs.length === 0) return null;
            return (
              <div className={`grid gap-2 mb-4 ${visibleImgs.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                {report.images.map((src, i) => {
                  if (failedImgs.has(i)) return null;
                  return (
                    <div key={i} className="relative rounded-xl overflow-hidden border"
                      style={{ borderColor: "var(--border)", aspectRatio: "16/9" }}>
                      <Image
                        src={src}
                        alt={`참고 자료 ${i + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 480px) 50vw, 240px"
                        onError={() => handleImgError(i)}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {report.body.split("\n").map((line, i) => {
            if (line.startsWith("■")) {
              return (
                <p key={i} className="text-xs font-bold mt-4 mb-1.5 first:mt-0"
                  style={{ color: style.color }}>
                  {line}
                </p>
              );
            }
            if (line.startsWith("•") || line.match(/^[0-9]+\)/)) {
              return (
                <p key={i} className="text-[12px] leading-relaxed pl-3 mb-1"
                  style={{ color: "var(--muted)" }}>
                  {line}
                </p>
              );
            }
            if (line.trim() === "") return <div key={i} className="h-1" />;
            return (
              <p key={i} className="text-[12px] leading-relaxed mb-1"
                style={{ color: "var(--text)" }}>
                {line}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── ReportFeed (main export) ──────────────────────────────────────────────

export function ReportFeed() {
  // 7일 이내 리포트만 표시, 핀 우선 정렬
  const recent = SEED_REPORTS.filter(isWithinWindow);
  const all    = [
    ...recent.filter((r) => r.isPinned),
    ...recent.filter((r) => !r.isPinned),
  ];

  return (
    <>
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2
            className="text-xs font-semibold tracking-widest uppercase font-syne"
            style={{ color: "var(--muted)" }}
          >
            Investus 리포트
          </h2>
          <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
            시장 분석 · 종목 인사이트
          </p>
        </div>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>
          류현우 최고투자책임자 발행
        </span>
      </div>

      {/* Report cards */}
      {all.length > 0 ? (
        <div className="flex flex-col gap-3">
          {all.map((r) => (
            <ReportCard key={r.id} report={r} />
          ))}
        </div>
      ) : (
        /* 24h 경과 후 빈 상태 */
        <div
          className="rounded-2xl border p-8 flex flex-col items-center gap-2 text-center"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <p className="text-2xl">📋</p>
          <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            오늘의 리포트를 준비 중입니다
          </p>
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>
            매일 아침 새로운 시장 분석이 업데이트됩니다
          </p>
        </div>
      )}
    </>
  );
}
