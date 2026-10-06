"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Quote } from "@/lib/api";
import { getMarketConfig } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";
import { EXAMPLE_MARKET_ROWS, EXAMPLE_US_HOLDINGS } from "@/lib/samplePortfolio";

function topic(name: string) {
  const c = name.charCodeAt(name.length - 1);
  if (c < 0xac00 || c > 0xd7a3) return /[lmnrLMNR]$/.test(name) ? "은" : "는";
  return (c - 0xac00) % 28 === 0 ? "는" : "은";
}

export function ExampleAnalysisCard({ market }: { market: MarketId }) {
  const cfg = getMarketConfig(market);
  const rows = market === "us"
    ? EXAMPLE_US_HOLDINGS.map((h) => ({ symbol: h.symbol, name: h.name }))
    : (EXAMPLE_MARKET_ROWS[market] ?? []);
  const [quotes, setQuotes] = useState<Record<string, number>>({});

  useEffect(() => {
    const url = market === "us" ? "/api/market-data" : `/api/market-data?market=${market}`;
    let cancelled = false;
    fetch(url)
      .then((r) => r.json())
      .then((d: { quotes?: Quote[] }) => {
        if (cancelled) return;
        const map: Record<string, number> = {};
        for (const q of d.quotes ?? []) {
          if (typeof q.changePercent === "number") map[q.symbol] = q.changePercent;
        }
        setQuotes(map);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [market]);

  const lines = rows.map((r) => {
    const pct = quotes[r.symbol];
    if (typeof pct !== "number") return `${r.name} 시세를 불러오는 중입니다.`;
    const sign = pct > 0 ? "+" : "";
    return `${r.name}${topic(r.name)} 오늘 ${sign}${pct.toFixed(2)}%입니다.`;
  });

  return (
    <div className="px-4 lg:px-0 mt-3">
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--card)", borderColor: "rgba(var(--mint-rgb),0.2)" }}
      >
        <div className="px-4 py-3 flex items-center gap-2" style={{ background: "rgba(var(--mint-rgb),0.03)" }}>
          <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: "var(--mint)" }} />
          <span className="text-sm font-bold font-syne flex-1" style={{ color: "var(--text)" }}>
            {cfg.labelKo} 등락 분석
          </span>
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: "rgba(var(--mint-rgb),0.14)", color: "var(--mint)" }}
          >
            예시
          </span>
        </div>
        <div className="px-4 pt-3 pb-2">
          {rows.map((r, i) => (
            <p key={r.symbol} className="text-[12px] leading-relaxed mb-1" style={{ color: "var(--text)" }}>
              {lines[i]}
            </p>
          ))}
          <p className="text-[12px] leading-relaxed mt-2" style={{ color: "var(--muted)" }}>
            구독하고 내 종목을 넣으면, 왜 움직였는지까지 이 칸에 이어집니다.
          </p>
        </div>
        <div className="px-4 pb-4">
          <Link
            href="/subscribe"
            className="block w-full py-2.5 rounded-xl text-center text-[12px] font-bold"
            style={{ background: "var(--mint)", color: "var(--on-accent)" }}
          >
            구독하고 내 종목으로 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
