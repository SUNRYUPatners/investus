"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Star } from "lucide-react";
import { IndexCard } from "./IndexCard";
import { StockCard } from "./StockCard";
import { FuturesHeatmap } from "./FuturesHeatmap";
import type { IndexQuote, Quote, FutureItem } from "@/lib/api";
import { mockIndices, mockQuotes, mockFutures, RECOMMENDED_SYMBOLS } from "@/lib/api";

type MarketData = { indices: IndexQuote[]; quotes: Quote[]; futures: FutureItem[] };

function CardSkeleton() {
  return (
    <div
      className="min-w-[155px] flex-shrink-0 rounded-2xl border animate-pulse"
      style={{ background: "var(--card)", borderColor: "var(--border)", height: 148 }}
    />
  );
}

export function LiveMarket() {
  const [data, setData]       = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 이전 캐시를 즉시 표시 (mock 대신 마지막 실제값 사용)
    try {
      const cached = localStorage.getItem("market-data-cache");
      if (cached) { setData(JSON.parse(cached)); setLoading(false); }
    } catch { /* ignore */ }

    fetch("/api/market-data")
      .then((r) => r.json())
      .then((d: MarketData) => {
        setData(d);
        setLoading(false);
        try { localStorage.setItem("market-data-cache", JSON.stringify(d)); } catch { /* ignore */ }
      })
      .catch(() => setLoading(false));
  }, []);

  const indices     = data?.indices ?? mockIndices;
  const quotes      = data?.quotes  ?? mockQuotes;
  const futures     = data?.futures ?? mockFutures;
  const recommended = quotes.filter((q) => RECOMMENDED_SYMBOLS.includes(q.symbol));

  return (
    <>
      {/* Investus 추천주식 */}
      <section className="px-4 lg:px-0 pt-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5" style={{ color: "var(--mint)" }} fill="var(--mint)" />
            <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--text)" }}>
              Investus 추천주식
            </h2>
          </div>
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>편집팀 선정</span>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
            : recommended.map((s) => <StockCard key={s.symbol} stock={s} />)}
        </div>
      </section>

      {/* 인기 종목 */}
      <section className="px-4 lg:px-0 pt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
            인기 종목
          </h2>
          <button className="flex items-center gap-0.5 text-xs font-medium" style={{ color: "var(--mint)" }}>
            전체 <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : quotes.map((s) => <StockCard key={s.symbol} stock={s} />)}
        </div>
      </section>

      {/* 주요 지수 */}
      <section className="px-4 lg:px-0 pt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
            주요 지수
          </h2>
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>실시간 · EST</span>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : indices.map((idx) => <IndexCard key={idx.symbol} index={idx} />)}
        </div>
      </section>

      {/* Futures 히트맵 */}
      <section className="px-4 lg:px-0 pt-6">
        <FuturesHeatmap items={futures} />
      </section>
    </>
  );
}
