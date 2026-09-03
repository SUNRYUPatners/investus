"use client";

import { useEffect, useState } from "react";
import { getMarketConfig } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";
import { isMarketSessionOpen } from "@/lib/markets/hours";
import { isMarketOpen } from "@/lib/marketHours";

type StockMarket = "us" | "kr";

function sessionOpen(market: StockMarket, now = new Date()): boolean {
  return market === "us" ? isMarketOpen() : isMarketSessionOpen("kr", now);
}

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
  { badge: string; title: string; sub: string; status: string; icon: string }
> = {
  us: {
    badge: "● 장중 LIVE",
    title: "미국주식 장중",
    sub: "NYSE · NASDAQ 정규장 · 실시간 시세",
    status: "실시간 업데이트 중",
    icon: "📈",
  },
  kr: {
    badge: "● 장중 LIVE",
    title: "한국주식 장중",
    sub: "코스피 · 코스닥 정규장 · 실시간 시세",
    status: "실시간 업데이트 중",
    icon: "📊",
  },
};

export function MarketOpenBanner({ market }: { market: MarketId }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const stockMarket = market === "us" || market === "kr" ? market : null;

  useEffect(() => {
    if (!stockMarket) return;
    setMounted(true);
    const tick = () => setOpen(sessionOpen(stockMarket));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [stockMarket]);

  if (!stockMarket || !mounted || !open) return null;

  const copy = COPY[stockMarket];
  const hours = sessionHoursLabel(stockMarket);

  return (
    <>
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
      <div
        className="block rounded-2xl overflow-hidden border market-open-banner-glow"
        role="status"
        aria-live="polite"
        aria-label={`${copy.title} — ${hours}`}
      >
        <div
          className="relative px-5 py-5 flex items-center gap-4 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #10203c 0%, #152848 60%, #0c1424 100%)" }}
        >
          <div className="market-open-sweep-line" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 80% 50%, rgba(var(--up-rgb),0.14) 0%, transparent 60%)",
            }}
          />
          <div
            className="relative w-[68px] h-[68px] rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(145deg, #1a2744, #10203c)",
              border: "1px solid rgba(var(--up-rgb),0.45)",
              boxShadow: "0 8px 24px rgba(var(--up-rgb),0.18)",
            }}
          >
            <span className="text-3xl">{copy.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="inline-flex items-center gap-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full mb-2"
              style={{ background: "rgba(var(--up-rgb),0.18)", color: "var(--up)" }}
            >
              <span className="market-open-live-dot inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--up)" }} />
              {copy.badge}
            </div>
            <p className="text-sm font-bold leading-snug mb-1" style={{ color: "#f5f6f8" }}>
              {copy.title}
            </p>
            <p className="text-[11px] mb-2.5" style={{ color: "rgba(255,255,255,0.72)" }}>
              {copy.sub}
            </p>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs truncate" style={{ color: "var(--up)" }}>
                {copy.status}
              </p>
              <span
                className="text-[11px] font-bold px-3 py-1.5 rounded-full flex-shrink-0 font-mono-num tabular-nums"
                style={{
                  background: "linear-gradient(135deg, rgba(var(--up-rgb),0.85), rgba(var(--up-rgb),0.55))",
                  color: "#0c1424",
                }}
              >
                {hours}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
