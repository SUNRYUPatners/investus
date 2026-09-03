"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { getMarketConfig } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";
import { isStockMarketOpen } from "@/lib/markets/hours";
import { openSessionChatPanel } from "@/lib/sessionChat/openPanel";

type StockMarket = "us" | "kr";

function sessionHoursLabel(market: StockMarket): string {
  const cfg = getMarketConfig(market);
  const fmt = (m: number) => {
    const h = Math.floor(m / 60);
    const min = m % 60;
    return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
  };
  return `${fmt(cfg.openHours.startMin)} – ${fmt(cfg.openHours.endMin)} ${cfg.clockLabel}`;
}

const COPY: Record<
  StockMarket,
  { badge: string; title: string; sub: string; status: string; cta: string; icon: string }
> = {
  us: {
    badge: "● 장중 LIVE",
    title: "미국주식 장중",
    sub: "NYSE · NASDAQ 정규장 · 실시간 시세",
    status: "실시간 업데이트 중",
    cta: "실시간 시황 토크 확인",
    icon: "📈",
  },
  kr: {
    badge: "● 장중 LIVE",
    title: "한국주식 장중",
    sub: "코스피 · 코스닥 정규장 · 실시간 시세",
    status: "실시간 업데이트 중",
    cta: "실시간 시황 토크 확인",
    icon: "📊",
  },
};

const BANNER_STYLES = (
  <style>{`
    @keyframes market-open-glow {
      0%, 100% { box-shadow: 0 0 0 1px rgba(var(--up-rgb),0.35), 0 0 18px rgba(var(--up-rgb),0.1); }
      50%       { box-shadow: 0 0 0 1px rgba(var(--up-rgb),0.85), 0 0 32px rgba(var(--up-rgb),0.28); }
    }
    @keyframes market-open-sweep {
      0%   { left: -80%; }
      100% { left: 130%; }
    }
    @keyframes market-open-pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.45; }
    }
    .market-open-banner-glow { animation: market-open-glow 2.8s ease-in-out infinite; border-color: transparent !important; }
    .market-open-sweep-line {
      position: absolute; top: 0; left: -80%;
      width: 55%; height: 100%;
      background: linear-gradient(90deg, transparent 0%, rgba(var(--up-rgb),0.1) 50%, transparent 100%);
      animation: market-open-sweep 3.2s ease-in-out infinite;
      pointer-events: none;
    }
    .market-open-live-dot { animation: market-open-pulse 1.6s ease-in-out infinite; }
  `}</style>
);

/** 헤더 시장 탭 바로 아래 — 교육 배너 스타일 장중 안내 */
export function MarketOpenBanner({ market }: { market: MarketId }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const stockMarket = market === "us" || market === "kr" ? market : null;

  useEffect(() => {
    if (!stockMarket) return;
    setMounted(true);
    const tick = () => setOpen(isStockMarketOpen(stockMarket));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [stockMarket]);

  if (!stockMarket || !mounted || !open) return null;

  const copy = COPY[stockMarket];
  const hours = sessionHoursLabel(stockMarket);

  return (
    <>
      {BANNER_STYLES}
      <div
        className="block rounded-xl lg:rounded-2xl overflow-hidden border market-open-banner-glow"
        role="status"
        aria-live="polite"
        aria-label={`${copy.title} — ${hours}`}
      >
        <div
          className="relative px-4 py-3 lg:px-5 lg:py-4 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #10203c 0%, #152848 60%, #0c1424 100%)" }}
        >
          <div className="market-open-sweep-line" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 80% 50%, rgba(var(--up-rgb),0.14) 0%, transparent 60%)",
            }}
          />
          <div className="relative flex items-center gap-3">
            <div
              className="w-11 h-11 lg:w-[52px] lg:h-[52px] rounded-xl flex-shrink-0 flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, #1a2744, #10203c)",
                border: "1px solid rgba(var(--up-rgb),0.45)",
                boxShadow: "0 6px 18px rgba(var(--up-rgb),0.16)",
              }}
            >
              <span className="text-xl lg:text-2xl">{copy.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="inline-flex items-center gap-1.5 text-[8px] lg:text-[9px] font-bold px-2 py-0.5 rounded-full mb-1"
                style={{ background: "rgba(var(--up-rgb),0.18)", color: "var(--up)" }}
              >
                <span className="market-open-live-dot inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--up)" }} />
                {copy.badge}
              </div>
              <p className="text-[13px] lg:text-sm font-bold leading-snug" style={{ color: "#f5f6f8" }}>
                {copy.title}
              </p>
              <p className="text-[10px] lg:text-[11px] mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.72)" }}>
                {copy.sub} · {hours}
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-between gap-2 mt-3 pt-3 border-t border-white/10">
            <p className="text-[11px] flex items-center gap-1.5 min-w-0" style={{ color: "var(--up)" }}>
              <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden />
              <span className="truncate">{copy.status} · 장중 토크 ON</span>
            </p>
            <button
              type="button"
              onClick={() => openSessionChatPanel(stockMarket)}
              className="text-[11px] font-bold px-3 py-1.5 rounded-full flex-shrink-0 transition-opacity active:opacity-80"
              style={{
                background: "linear-gradient(135deg, rgba(var(--up-rgb),0.92), rgba(var(--up-rgb),0.62))",
                color: "#0c1424",
              }}
            >
              {copy.cta} →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
