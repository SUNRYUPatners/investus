"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Pin } from "lucide-react";
import {
  SEED_REPORTS,
  CATEGORY_STYLE,
  CATEGORY_EMOJI,
  type Report,
} from "@/lib/reports";

// ── ReportCard ────────────────────────────────────────────────────────────────

function ReportCard({ report }: { report: Report }) {
  const [open, setOpen] = useState(false);
  const style = CATEGORY_STYLE[report.categoryColor];
  const emoji = CATEGORY_EMOJI[report.category];

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Summary row */}
      <div className="p-4">
        {/* Top: category + subject + date + pin */}
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
          <span className="text-[10px] ml-auto flex-shrink-0" style={{ color: "var(--muted)" }}>
            {report.date}
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
          {report.images && report.images.length > 0 && (
            <div className={`grid gap-2 mb-4 ${report.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
              {report.images.map((src, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)", aspectRatio: "16/9" }}>
                  <Image src={src} alt={`참고 자료 ${i + 1}`} fill style={{ objectFit: "cover" }} sizes="(max-width: 480px) 50vw, 240px" />
                </div>
              ))}
            </div>
          )}

          {report.body.split("\n").map((line, i) => {
            if (line.startsWith("■")) {
              return (
                <p key={i} className="text-xs font-bold mt-4 mb-1.5 first:mt-0" style={{ color: style.color }}>
                  {line}
                </p>
              );
            }
            if (line.startsWith("•") || line.match(/^[0-9]+\)/)) {
              return (
                <p key={i} className="text-[12px] leading-relaxed pl-3 mb-1" style={{ color: "var(--muted)" }}>
                  {line}
                </p>
              );
            }
            if (line.trim() === "") return <div key={i} className="h-1" />;
            return (
              <p key={i} className="text-[12px] leading-relaxed mb-1" style={{ color: "var(--text)" }}>
                {line}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── ReportFeed (main export) ──────────────────────────────────────────────────

export function ReportFeed() {
  const all = [
    ...SEED_REPORTS.filter((r) => r.isPinned),
    ...SEED_REPORTS.filter((r) => !r.isPinned),
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
      </div>

      {/* Report cards */}
      <div className="flex flex-col gap-3">
        {all.map((r) => (
          <ReportCard key={r.id} report={r} />
        ))}
      </div>
    </>
  );
}
