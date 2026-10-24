"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SYMBOLS = [
  { sym: "TSLA",  label: "TSLA",  color: "#10b981" },
  { sym: "SPCX",  label: "SPCX",  color: "#a855f7" },
  { sym: "BTC",   label: "BTC",   color: "#f59e0b" },
  { sym: "ETH",   label: "ETH",   color: "#60a5fa" },
  { sym: "NVDA",  label: "NVDA",  color: "#22d3ee" },
  { sym: "DOGE",  label: "DOGE",  color: "#fb923c" },
];

type Price = { price: number; changePercent: number };

function fmt(price: number, sym: string): string {
  if (sym === "BTC") return price >= 1000 ? `$${(price / 1000).toFixed(1)}K` : `$${price.toFixed(0)}`;
  if (sym === "DOGE" || price < 10) return `$${price.toFixed(4).replace(/\.?0+$/, "")}`;
  if (price >= 1000) return `$${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  return `$${price.toFixed(2)}`;
}

export function QuickTickers() {
  const [prices, setPrices] = useState<Record<string, Price>>({});

  useEffect(() => {
    // 1) localStorage market cache 먼저
    try {
      const raw = localStorage.getItem("investus-market-cache-us");
      if (raw) {
        const d = JSON.parse(raw) as { quotes?: { symbol: string; price: number; changePercent: number }[] };
        if (Array.isArray(d?.quotes)) {
          const map: Record<string, Price> = {};
          d.quotes.forEach((q) => { map[q.symbol] = { price: q.price, changePercent: q.changePercent }; });
          setPrices((prev) => ({ ...prev, ...map }));
        }
      }
    } catch { /* ignore */ }

    // 2) guru-prices API fallback
    const syms = SYMBOLS.map((s) => s.sym).join(",");
    fetch(`/api/guru-prices?symbols=${encodeURIComponent(syms)}`)
      .then((r) => r.ok ? r.json() : {})
      .then((d: Record<string, Price>) => {
        const entries = Object.entries(d).filter(([, v]) => v?.price > 0);
        if (entries.length > 0) setPrices((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
      })
      .catch(() => {});
  }, []);

  return (
    <div
      className="no-scrollbar flex flex-row gap-2.5 overflow-x-auto px-4 lg:px-0 pb-0.5"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {SYMBOLS.map(({ sym, label, color }) => {
        const p = prices[sym];
        const pos = p ? p.changePercent >= 0 : true;
        const pctColor = p ? (pos ? "#10b981" : "#ef4444") : "var(--muted)";

        return (
          <Link
            key={sym}
            href={`/stock/${sym}`}
            className="flex-shrink-0 flex flex-col gap-0.5 px-3 py-2.5 rounded-2xl border no-underline"
            style={{
              scrollSnapAlign: "start",
              background: "var(--card)",
              borderColor: "var(--border)",
              minWidth: 88,
            }}
          >
            <span className="text-[11px] font-bold" style={{ color }}>{label}</span>
            <span className="text-[15px] font-bold font-mono-num tabular-nums leading-tight" style={{ color: "var(--text)" }}>
              {p ? fmt(p.price, sym) : "—"}
            </span>
            <span className="text-[11px] font-mono-num font-semibold" style={{ color: pctColor }}>
              {p ? `${pos ? "+" : ""}${p.changePercent.toFixed(2)}%` : "—"}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
