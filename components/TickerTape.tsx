"use client";

import { useEffect, useState } from "react";
import type { Quote } from "@/lib/api";
import { getMarketConfig } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";

function formatPrice(market: MarketId, price: number): string {
  if (market === "kr") return `₩${Math.round(price).toLocaleString("ko-KR")}`;
  if (market === "safe") {
    if (price >= 1000) return `$${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
    return `$${price.toFixed(2)}`;
  }
  return `$${price.toFixed(2)}`;
}

function displaySymbol(market: MarketId, symbol: string): string {
  if (market === "kr") return symbol.replace(/\.(KS|KQ)$/i, "");
  return symbol;
}

function TickerItem({ q, market }: { q: Quote; market: MarketId }) {
  const pos = q.changePercent >= 0;
  return (
    <span className="inline-flex items-center gap-2 px-5 border-r" style={{ borderColor: "var(--border)" }}>
      <span className="text-xs font-bold font-mono-num" style={{ color: "var(--text)" }}>
        {displaySymbol(market, q.symbol)}
      </span>
      <span className="text-xs font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
        {formatPrice(market, q.price)}
      </span>
      <span className="text-xs font-mono-num tabular-nums" style={{ color: pos ? "var(--up)" : "var(--down)" }}>
        {pos ? "▲" : "▼"} {Math.abs(q.changePercent).toFixed(2)}%
      </span>
    </span>
  );
}

export function TickerTape({ market = "us" }: { market?: MarketId }) {
  const cfg = getMarketConfig(market);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const sync = () => {
      try {
        const raw = localStorage.getItem(cfg.marketCacheKey);
        if (!raw) return;
        const d = JSON.parse(raw) as { quotes?: Quote[] };
        if (Array.isArray(d?.quotes) && d.quotes.length > 0) setQuotes(d.quotes);
      } catch { /* ignore */ }
    };
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [cfg.marketCacheKey]);

  if (quotes.length === 0) return null;

  const items = [...quotes, ...quotes];
  const duration = Math.max(60, quotes.length * 2.5);

  return (
    <div className="overflow-hidden py-2 border-b lg:border-b-0" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div className="ticker-track" style={{ "--ticker-duration": `${duration}s` } as React.CSSProperties}>
        {items.map((q, i) => <TickerItem key={`${q.symbol}-${i}`} q={q} market={market} />)}
      </div>
    </div>
  );
}
