"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { IndexCard } from "./IndexCard";
import { StockCard } from "./StockCard";
import { FuturesHeatmap } from "./FuturesHeatmap";
import type { IndexQuote, Quote, FutureItem } from "@/lib/api";
import { RECOMMENDED_SYMBOLS } from "@/lib/api";

type MarketData = { indices: IndexQuote[]; quotes: Quote[]; futures: FutureItem[] };

function ESTClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="text-[10px] font-mono-num tabular-nums" style={{ color: "var(--muted)" }}>
      {time} EST
    </span>
  );
}

function CardSkeleton() {
  return (
    <div
      className="min-w-[155px] flex-shrink-0 rounded-2xl border animate-pulse"
      style={{ background: "var(--card)", borderColor: "var(--border)", height: 148 }}
    />
  );
}

function isMarketOpen(): boolean {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  const day = now.getDay(); // 0=Sun 6=Sat
  if (day === 0 || day === 6) return false;
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= 9 * 60 + 30 && mins < 16 * 60;
}

export function LiveMarket() {
  const [data, setData]       = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 이전 캐시를 즉시 표시 — mock flash 방지
    try {
      const cached = localStorage.getItem("market-data-cache");
      if (cached) {
        const parsed = JSON.parse(cached) as MarketData;
        // 캐시에 실제 데이터 구조가 있을 때만 표시 (부분 mock 방지)
        if (parsed?.indices?.length && parsed?.quotes?.length) {
          setData(parsed);
          setLoading(false);
        }
      }
    } catch { /* ignore */ }

    const load = () => {
      fetch("/api/market-data")
        .then((r) => { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
        .then((d: MarketData) => {
          if (!d?.indices?.length || !d?.quotes?.length) throw new Error("empty");
          setData(d);
          setLoading(false);
          try { localStorage.setItem("market-data-cache", JSON.stringify(d)); } catch { /* ignore */ }
          // watchlist도 같은 캐시를 보도록 storage 이벤트 트리거
          try { window.dispatchEvent(new StorageEvent("storage", { key: "market-data-cache" })); } catch { /* ignore */ }
        })
        .catch(() => {
          // API 실패: 캐시 있으면 현재 표시 유지, 없으면 skeleton 유지 — mock 노출 금지
        });
    };

    load();
    // 장 마감 시 폴링 불필요 — 전날 마감 데이터를 캐시에서 그대로 표시
    if (!isMarketOpen()) return;
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, []);

  const indices     = data?.indices ?? [];
  const quotes      = data?.quotes  ?? [];
  const futures     = data?.futures ?? [];
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
          <ESTClock />
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
