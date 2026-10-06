"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import type { Quote } from "@/lib/api";
import { getMarketConfig } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";
import { EXAMPLE_MARKET_ROWS, EXAMPLE_US_HOLDINGS } from "@/lib/samplePortfolio";
import { PreviewFade } from "@/components/SubscribeGate";

function topic(name: string) {
  const c = name.charCodeAt(name.length - 1);
  if (c < 0xac00 || c > 0xd7a3) return /[lmnrLMNR]$/.test(name) ? "은" : "는";
  return (c - 0xac00) % 28 === 0 ? "는" : "은";
}

function fmtPct(n: number) {
  return `${n > 0 ? "+" : ""}${n.toFixed(2)}%`;
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

  const ready = rows.every((r) => typeof quotes[r.symbol] === "number");
  const lead = ready
    ? rows.map((r) => `${r.name}${topic(r.name)} 오늘 ${fmtPct(quotes[r.symbol])}입니다.`).join(" ")
    : "오늘 등락을 불러오는 중입니다.";
  const ranked = ready
    ? [...rows].sort((a, b) => Math.abs(quotes[b.symbol]) - Math.abs(quotes[a.symbol]))
    : rows;
  const mover = ranked[0];
  const follow = ready && mover
    ? `하루 움직임이 가장 큰 종목은 ${mover.name}(${fmtPct(quotes[mover.symbol])})입니다. 구독 화면에서는 이 다음에, 그 등락이 오늘 뉴스와 어떻게 이어지는지 문단이 붙습니다.`
    : "구독 화면에서는 이 다음에 오늘 뉴스와 연결한 문단이 붙습니다.";

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
        <PreviewFade label="구독하고 이어서 보기" maxHeight={132}>
          <div className="px-4 pt-3 pb-10">
            <p className="text-[12px] leading-relaxed" style={{ color: "var(--text)" }}>
              {lead}
            </p>
            <p className="text-[12px] leading-relaxed mt-2" style={{ color: "var(--muted)" }}>
              {follow}
            </p>
          </div>
        </PreviewFade>
      </div>
    </div>
  );
}
