"use client";

import { useEffect, useState } from "react";
import type { Quote } from "@/lib/api";
import { RECOMMENDED_SYMBOLS } from "@/lib/api";

const POPULAR_SYMS = ["AAPL", "NVDA", "TSLA", "MSFT", "AMZN", "META", "GOOGL", "AMD"];

function TickerRow({ label, quotes, duration }: { label: string; quotes: Quote[]; duration: number }) {
  if (quotes.length === 0) return null;
  const items = [...quotes, ...quotes];
  return (
    <div
      className="flex items-center border-b"
      style={{ borderColor: "var(--border)", height: 28 }}
    >
      {/* 고정 레이블 */}
      <div
        className="flex-shrink-0 flex items-center justify-center border-r text-[9px] font-semibold tracking-wider font-syne"
        style={{
          width: 52, height: "100%",
          color: "var(--muted)",
          borderColor: "var(--border)",
        }}
      >
        {label}
      </div>
      {/* 스크롤 영역 */}
      <div className="overflow-hidden flex-1" style={{ height: "100%" }}>
        <div
          className="ticker-track h-full items-center"
          style={{ animationDuration: `${duration}s` }}
        >
          {items.map((q, i) => {
            const pos = q.changePercent >= 0;
            return (
              <span
                key={`${q.symbol}-${i}`}
                className="inline-flex items-center gap-1.5 px-4 border-r h-full"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="text-[11px] font-bold font-mono-num" style={{ color: "var(--text)" }}>
                  {q.symbol}
                </span>
                <span className="text-[11px] font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
                  ${q.price.toFixed(2)}
                </span>
                <span
                  className="text-[11px] font-mono-num tabular-nums"
                  style={{ color: pos ? "var(--mint)" : "var(--down)" }}
                >
                  {pos ? "▲" : "▼"}{Math.abs(q.changePercent).toFixed(2)}%
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function TickerTape() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const sync = () => {
      try {
        const raw = localStorage.getItem("market-data-cache");
        if (!raw) return;
        const d = JSON.parse(raw) as { quotes?: Quote[] };
        if (Array.isArray(d?.quotes) && d.quotes.length > 0) setQuotes(d.quotes);
      } catch { /* ignore */ }
    };
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  if (quotes.length === 0) return null;

  const qMap        = new Map(quotes.map((q) => [q.symbol, q]));
  const recommended = RECOMMENDED_SYMBOLS.map((s) => qMap.get(s)).filter(Boolean) as Quote[];
  const popular     = POPULAR_SYMS.map((s) => qMap.get(s)).filter(Boolean) as Quote[];

  if (recommended.length === 0 && popular.length === 0) return null;

  return (
    <div style={{ background: "var(--card)" }}>
      <TickerRow label="추천주식" quotes={recommended} duration={18} />
      <TickerRow label="인기종목" quotes={popular}     duration={24} />
    </div>
  );
}
