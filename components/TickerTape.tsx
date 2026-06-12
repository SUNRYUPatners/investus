"use client";

import { useEffect, useState } from "react";
import type { Quote } from "@/lib/api";

function TickerItem({ q }: { q: Quote }) {
  const pos = q.changePercent >= 0;
  return (
    <span className="inline-flex items-center gap-2 px-5 border-r" style={{ borderColor: "var(--border)" }}>
      <span className="text-xs font-bold font-mono-num" style={{ color: "var(--text)" }}>{q.symbol}</span>
      <span className="text-xs font-mono-num tabular-nums" style={{ color: "var(--text)" }}>${q.price.toFixed(2)}</span>
      <span className="text-xs font-mono-num tabular-nums" style={{ color: pos ? "var(--mint)" : "var(--down)" }}>
        {pos ? "▲" : "▼"} {Math.abs(q.changePercent).toFixed(2)}%
      </span>
    </span>
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

  const items = [...quotes, ...quotes];
  const duration = Math.max(60, quotes.length * 2.5);

  return (
    <div className="overflow-hidden py-2 border-b" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div className="ticker-track" style={{ "--ticker-duration": `${duration}s` } as React.CSSProperties}>
        {items.map((q, i) => <TickerItem key={`${q.symbol}-${i}`} q={q} />)}
      </div>
    </div>
  );
}
