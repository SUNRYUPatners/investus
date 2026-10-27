"use client";
import { useState, useEffect } from "react";
import type { Locale } from "@/lib/i18n";

const TICKERS = [
  { sym: "TSLA", label: "Tesla",   color: "#EF4444", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.25)" },
  { sym: "SPCX", label: "SpaceX",  color: "#60A5FA", bg: "rgba(96,165,250,0.1)",  border: "rgba(96,165,250,0.25)" },
  { sym: "DOGE", label: "Dogecoin",color: "#FBBF24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.25)" },
  { sym: "BTC",  label: "Bitcoin", color: "#F97316", bg: "rgba(249,115,22,0.1)",  border: "rgba(249,115,22,0.25)" },
  { sym: "NVDA", label: "Nvidia",  color: "#86EFAC", bg: "rgba(134,239,172,0.1)", border: "rgba(134,239,172,0.25)" },
  { sym: "META", label: "Meta",    color: "#818CF8", bg: "rgba(129,140,248,0.1)", border: "rgba(129,140,248,0.25)" },
];

const STATS_KO = [
  { label: "누적 리포트",   value: "2,100+", sub: "전문 분석 리포트" },
  { label: "실시간 커버리지", value: "TSLA·SPCX·DOGE", sub: "일론 생태계 전종목" },
  { label: "투자자 커뮤니티", value: "종토방·애널리스트", sub: "실전 투자자 의견" },
];
const STATS_EN = [
  { label: "Research Reports", value: "2,100+",         sub: "Expert analysis" },
  { label: "Live Coverage",    value: "TSLA·SPCX·DOGE", sub: "Full Elon ecosystem" },
  { label: "Community",        value: "Wall · Analyst",  sub: "Real investor views" },
];

export function HeroLanding({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("hero-v1-dismissed")) setVisible(true);
  }, []);

  if (!visible) return null;

  const stats = locale === "ko" ? STATS_KO : STATS_EN;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #030712 0%, #0a0f1e 45%, #030712 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* glow blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-80px", left: "-60px",
          width: "320px", height: "320px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-40px", right: "-40px",
          width: "260px", height: "260px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%)",
        }}
      />

      {/* dismiss */}
      <button
        onClick={() => { localStorage.setItem("hero-v1-dismissed", "1"); setVisible(false); }}
        className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors text-lg leading-none"
        aria-label="닫기"
      >
        ×
      </button>

      <div className="relative max-w-[480px] mx-auto lg:max-w-screen-2xl lg:px-8 px-4 pt-6 pb-5 lg:pt-10 lg:pb-8">
        <div className="lg:flex lg:items-center lg:gap-12">

          {/* ── LEFT: copy ─────────────────────────────────────────── */}
          <div className="w-full lg:flex-1 lg:min-w-0">
            {/* badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(34,197,94,0.08)", color: "#4ADE80", border: "1px solid rgba(34,197,94,0.2)" }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              {locale === "ko" ? "일론 머스크 생태계 전문 플랫폼" : "The Elon Musk Ecosystem Platform"}
            </div>

            <h2
              className="text-2xl lg:text-4xl font-black leading-tight mb-2 text-white"
              style={{ letterSpacing: "-0.02em" }}
            >
              {locale === "ko" ? (
                <>
                  테슬라 · 스페이스X{" "}
                  <span style={{ color: "#4ADE80" }}>주주를 위한</span>
                  <br className="hidden lg:block" /> 투자 인텔리전스
                </>
              ) : (
                <>
                  Tesla · SpaceX{" "}
                  <span style={{ color: "#4ADE80" }}>Investor</span>
                  <br className="hidden lg:block" /> Intelligence Platform
                </>
              )}
            </h2>

            <p className="text-sm lg:text-base text-gray-400 mb-5 leading-relaxed">
              {locale === "ko"
                ? "TSLA · SPCX · DOGE 실시간 시세, 2100+ 전문 리포트, AI 분석까지 — 일론 머스크 생태계 투자자를 위한 올인원 플랫폼"
                : "Real-time TSLA · SPCX · DOGE quotes, 2100+ expert reports & AI analysis — all-in-one for Elon ecosystem investors"}
            </p>

            {/* ticker chips */}
            <div className="flex flex-wrap gap-2">
              {TICKERS.map((t) => (
                <span
                  key={t.sym}
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}` }}
                >
                  {t.sym}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: stats + logo ───────────────────────────────── */}
          <div className="mt-6 lg:mt-0 lg:w-[360px] flex-shrink-0">
            {/* stats grid */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="text-xs font-black text-white leading-tight mb-0.5 truncate" style={{ color: "#4ADE80", fontSize: "10px" }}>
                    {s.value}
                  </div>
                  <div className="text-gray-400" style={{ fontSize: "9px", lineHeight: "1.3" }}>
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* logo */}
            <div className="flex items-center justify-center">
              <div className="relative">
                {/* outer glow ring */}
                <div
                  className="absolute rounded-2xl pointer-events-none"
                  style={{
                    inset: "-3px",
                    background: "linear-gradient(135deg, rgba(34,197,94,0.5) 0%, rgba(96,165,250,0.3) 50%, rgba(34,197,94,0.1) 100%)",
                    borderRadius: "20px",
                    filter: "blur(4px)",
                  }}
                />
                <div
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden relative z-10"
                  style={{ boxShadow: "0 0 48px rgba(34,197,94,0.3), 0 0 96px rgba(34,197,94,0.1)" }}
                >
                  <img src="/logo.png" alt="Investus" className="w-full h-full object-cover" />
                </div>
                {/* TSLA pill — top right */}
                <div
                  className="absolute z-20 px-2 py-0.5 rounded-full text-white font-bold"
                  style={{ fontSize: "9px", background: "#EF4444", top: "-10px", right: "-22px", boxShadow: "0 2px 8px rgba(239,68,68,0.4)" }}
                >
                  TSLA
                </div>
                {/* SPCX pill — bottom left */}
                <div
                  className="absolute z-20 px-2 py-0.5 rounded-full text-white font-bold"
                  style={{ fontSize: "9px", background: "#3B82F6", bottom: "-10px", left: "-24px", boxShadow: "0 2px 8px rgba(59,130,246,0.4)" }}
                >
                  SPCX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
