"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronDown, Pin, X } from "lucide-react";

// ── 이미지 라이트박스 (모바일 핀치줌 지원) ────────────────────────────────
function ImageLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10"
        style={{ background: "rgba(255,255,255,0.15)" }}
        onClick={onClose}
      >
        <X className="w-5 h-5 text-white" />
      </button>
      {/* touch-action: pinch-zoom 으로 모바일 핀치줌 허용 */}
      <div
        className="w-full h-full flex items-center justify-center overflow-auto"
        style={{ touchAction: "pinch-zoom" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="확대 보기"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", touchAction: "pinch-zoom" }}
        />
      </div>
      <p className="absolute bottom-6 left-0 right-0 text-center text-xs text-white/40">
        두 손가락으로 확대 · 탭해서 닫기
      </p>
    </div>
  );
}
import {
  SEED_REPORTS,
  CATEGORY_STYLE,
  CATEGORY_EMOJI,
  type Report,
} from "@/lib/reports";

// ── 3일 필터 ──────────────────────────────────────────────────────────────
// updatedAt: "2026.05.14 07:27" KST 형식
// 현재 시각 기준 3일 이내 리포트만 표시

const SHOW_WINDOW = 3 * 24 * 60 * 60 * 1000;

function parseKST(s: string): Date {
  // "2026.05.14 07:27" → UTC 변환 (KST = UTC+9)
  const [datePart, timePart = "00:00"] = s.split(" ");
  const sep = datePart.includes(".") ? "." : "-";
  const [y, m, d] = datePart.split(sep).map(Number);
  const [h, mn]   = timePart.split(":").map(Number);
  return new Date(Date.UTC(y, m - 1, d, h - 9, mn));
}

function getDateKey(r: Report): string {
  const s = r.updatedAt ?? r.date ?? "";
  return s.split(" ")[0].replace(/\./g, "-"); // "2026.05.15 08:30" → "2026-05-15"
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
  const [lightbox, setLightbox]       = useState<string | null>(null);
  const style = CATEGORY_STYLE[report.categoryColor];
  const emoji = CATEGORY_EMOJI[report.category];

  const handleImgError = useCallback((idx: number) => {
    setFailedImgs((prev) => new Set(prev).add(idx));
  }, []);

  return (
    <>
    {lightbox && <ImageLightbox src={lightbox} onClose={() => setLightbox(null)} />}
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
                    <button
                      key={i}
                      className="relative rounded-xl overflow-hidden border w-full"
                      style={{ borderColor: "var(--border)", aspectRatio: "16/9", display: "block" }}
                      onClick={() => setLightbox(src)}
                    >
                      <Image
                        src={src}
                        alt={`참고 자료 ${i + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 480px) 50vw, 240px"
                        onError={() => handleImgError(i)}
                        unoptimized={src.startsWith("/charts/")}
                      />
                      <span className="absolute bottom-1.5 right-1.5 text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                        style={{ background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.7)" }}>
                        🔍 확대
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          })()}

          {/* Category tag below image */}
          {report.images && report.images.length > 0 && (
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: style.bg, color: style.color }}
              >
                {emoji} {report.category}
              </span>
              {report.subject && (
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                  {report.subject}
                </span>
              )}
            </div>
          )}

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
    </>
  );
}

// ── 투자대가 명언 (날짜 기반 일별 자동 교체) ──────────────────────────────

const GURU_QUOTES = [
  { text: "주식 시장은 인내심 없는 사람의 돈을 인내심 있는 사람에게 이전하는 장치다.", name: "워렌 버핏", en: "Warren Buffett" },
  { text: "훌륭한 기업을 적정 가격에 사는 것이, 적정 기업을 훌륭한 가격에 사는 것보다 훨씬 낫다.", name: "워렌 버핏", en: "Warren Buffett" },
  { text: "10년을 보유할 자신이 없다면 10분도 보유하지 마라.", name: "워렌 버핏", en: "Warren Buffett" },
  { text: "공포에 탐욕스러워지고, 탐욕에 두려워하라.", name: "워렌 버핏", en: "Warren Buffett" },
  { text: "리스크는 자신이 무엇을 하는지 모를 때 발생한다.", name: "워렌 버핏", en: "Warren Buffett" },
  { text: "가격은 당신이 지불하는 것이고, 가치는 당신이 얻는 것이다.", name: "워렌 버핏", en: "Warren Buffett" },
  { text: "우리가 가장 좋아하는 보유 기간은 영원이다.", name: "워렌 버핏", en: "Warren Buffett" },
  { text: "좋은 아이디어는 드물다. 기회가 왔을 때 크게 베팅하라.", name: "찰리 멍거", en: "Charlie Munger" },
  { text: "천천히 부자가 되는 것에 만족하지 못하는 사람은 빠르게 가난해진다.", name: "찰리 멍거", en: "Charlie Munger" },
  { text: "기다림은 투자자의 가장 강력한 도구다.", name: "찰리 멍거", en: "Charlie Munger" },
  { text: "역전시킬 수 없는 실수를 조심하라. 항상 실패 가능성을 전제로 생각하라.", name: "찰리 멍거", en: "Charlie Munger" },
  { text: "단순하게 생각하라. 복잡한 것이 반드시 좋은 것은 아니다.", name: "찰리 멍거", en: "Charlie Munger" },
  { text: "모든 지식을 하나의 관점에서만 보면 세상을 제대로 이해할 수 없다.", name: "찰리 멍거", en: "Charlie Munger" },
  { text: "주가 하락은 투자자에게 위협이 아닌 기회다.", name: "피터 린치", en: "Peter Lynch" },
  { text: "주식에 투자하기 전에 회사에 대해 공부하는 데 최소 5분은 투자해야 한다.", name: "피터 린치", en: "Peter Lynch" },
  { text: "훌륭한 기업을 찾아라, 그리고 오래 기다려라.", name: "피터 린치", en: "Peter Lynch" },
  { text: "자신이 이해하는 것에만 투자하라.", name: "피터 린치", en: "Peter Lynch" },
  { text: "시장을 예측하려 하지 마라. 좋은 기업을 사고 기다려라.", name: "피터 린치", en: "Peter Lynch" },
  { text: "투자의 비결은 기업의 가치를 알고 그보다 싸게 사는 것이다.", name: "피터 린치", en: "Peter Lynch" },
];

function DailyQuote() {
  const today = new Date();
  const seed  = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const q     = GURU_QUOTES[seed % GURU_QUOTES.length];

  return (
    <div
      className="rounded-xl px-4 py-3 mb-3 flex gap-3 items-start"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}
    >
      <span className="text-base flex-shrink-0 mt-0.5">💬</span>
      <div className="min-w-0">
        <p className="text-[11px] leading-relaxed italic" style={{ color: "var(--text)", opacity: 0.88 }}>
          &ldquo;{q.text}&rdquo;
        </p>
        <p className="text-[10px] mt-1.5 font-semibold" style={{ color: "var(--muted)" }}>
          — {q.name} <span className="font-normal opacity-60">({q.en})</span>
        </p>
      </div>
    </div>
  );
}

// ── ReportFeed (main export) ──────────────────────────────────────────────

export function ReportFeed() {
  const [showOlder, setShowOlder] = useState(false);
  const olderRef = useRef<HTMLDivElement>(null);

  const recent = SEED_REPORTS.filter(isWithinWindow);

  // 가장 최근 날짜 파악 (이 날짜의 리포트만 isPinned 적용)
  const latestDateKey = recent.reduce((max, r) => {
    const d = getDateKey(r);
    return d > max ? d : max;
  }, "");

  // 정렬: 최신 날짜 우선 → 최신 날짜 내에서만 핀 우선 → 같은 그룹 내 updatedAt 내림차순
  const all = [...recent].sort((a, b) => {
    const da = getDateKey(a);
    const db = getDateKey(b);
    if (da !== db) return da > db ? -1 : 1;
    if (da === latestDateKey) {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
    }
    const ta = a.updatedAt ?? a.date ?? "";
    const tb = b.updatedAt ?? b.date ?? "";
    return tb > ta ? 1 : -1;
  });

  const todayReports = all.filter((r) => getDateKey(r) === latestDateKey);
  const olderReports = all.filter((r) => getDateKey(r) !== latestDateKey);

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
          SUNRYU Partners CIO 작성
        </span>
      </div>

      {/* Daily guru quote */}
      <DailyQuote />

      {/* Report cards */}
      {all.length > 0 ? (
        <div className="flex flex-col gap-3">
          {todayReports.map((r) => (
            <ReportCard key={r.id} report={r} />
          ))}

          {olderReports.length > 0 && (
            <>
              {/* 데스크톱: 항상 표시 / 모바일: 펼치기 버튼으로 토글 */}
              <div ref={olderRef} className={showOlder ? "flex flex-col gap-3 lg:flex-col lg:gap-3" : "hidden lg:flex lg:flex-col lg:gap-3"}>
                {olderReports.map((r) => (
                  <ReportCard key={r.id} report={r} />
                ))}
              </div>

              {/* 모바일 전용 토글 버튼 */}
              <button
                className="lg:hidden w-full py-3 rounded-2xl border text-sm font-semibold flex items-center justify-center gap-2 active:opacity-70 transition-opacity"
                style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--card)" }}
                onClick={() => {
                  setShowOlder((v) => {
                    if (!v) setTimeout(() => olderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
                    return !v;
                  });
                }}
              >
                {showOlder ? "접기 ▲" : `이전 리포트 더보기 (${olderReports.length}개) ▼`}
              </button>
            </>
          )}
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
