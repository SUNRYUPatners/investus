"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { IndexCard } from "@/components/IndexCard";
import { StockCard } from "@/components/StockCard";
import { SP500Heatmap } from "@/components/SP500Heatmap";
import { FuturesHeatmap } from "@/components/FuturesHeatmap";
import { KospiHeatmap } from "@/components/market/KospiHeatmap";
import { SafeAssetsHeatmap } from "@/components/market/SafeAssetsHeatmap";
import { RegionHeatmap, PolicyHighlightCards } from "@/components/market/RegionHeatmap";
import type { IndexQuote, Quote, FutureItem } from "@/lib/api";
import { getMarketConfig } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";
import { isMarketSessionOpen } from "@/lib/markets/hours";

type MarketData = { indices: IndexQuote[]; quotes: Quote[]; futures: FutureItem[]; liveAt?: number };

function hasNonZeroChanges(d: MarketData): boolean {
  return (
    (d.quotes ?? []).some((q) => q.changePercent !== 0) ||
    (d.indices ?? []).some((i) => i.changePercent !== 0)
  );
}

function KrReMarketBlocks() {
  return (
    <section className="px-4 lg:px-0 pt-3 space-y-4">
      <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/kr-re-apartment-hero.svg"
          alt="아파트 단지"
          className="w-full h-[120px] object-cover object-center"
        />
        <div className="px-4 py-3" style={{ background: "var(--card)" }}>
          <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>한국 아파트 · 매매 시장</p>
          <p className="text-[11px] mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>
            시도별 거래호수·매매등락과 정부정책을 한곳에서 확인하세요.
          </p>
        </div>
      </div>
      <PolicyHighlightCards />
      <RegionHeatmap />
    </section>
  );
}

export function MarketLiveMarket({ market }: { market: MarketId }) {
  const cfg = getMarketConfig(market);
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const doLoadRef = useRef<(retryDelay?: number) => void>(() => {});

  const doLoad = (retryDelay = 3000) => {
    if (market === "kr-re") {
      setLoading(false);
      return;
    }
    const url = market === "us" ? "/api/market-data" : `/api/market-data?market=${market}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
    fetch(url, { cache: "no-store", signal: controller.signal })
      .then((r) => {
        if (r.status === 503) throw Object.assign(new Error("retry"), { retry: true });
        if (!r.ok) throw new Error("http");
        return r.json();
      })
      .then((d: MarketData) => {
        clearTimeout(timeout);
        const has = (d?.quotes?.length ?? 0) > 0 || (d?.indices?.length ?? 0) > 0;
        if (!has) throw Object.assign(new Error("empty"), { retry: true });

        // 장마감·장전: PREOPEN 0% 응답으로 localStorage 덮어쓰기 방지
        if (market === "kr" && !isMarketSessionOpen(market) && !hasNonZeroChanges(d)) {
          try {
            const raw = localStorage.getItem(cfg.marketCacheKey);
            if (raw) {
              const prev = JSON.parse(raw) as MarketData;
              if (hasNonZeroChanges(prev)) {
                setData(prev);
                setLoading(false);
                return;
              }
            }
          } catch { /* ignore */ }
        }

        setData(d);
        setLoading(false);
        if (hasNonZeroChanges(d) || isMarketSessionOpen(market)) {
          try {
            localStorage.setItem(cfg.marketCacheKey, JSON.stringify({ ...d, _ts: Date.now() }));
          } catch { /* ignore */ }
        }
      })
      .catch((e: unknown & { retry?: boolean }) => {
        clearTimeout(timeout);
        if ((e as { retry?: boolean })?.retry) {
          setTimeout(() => doLoadRef.current(Math.min(retryDelay * 2, 15_000)), retryDelay);
        } else {
          setLoading(false);
        }
      });
  };
  doLoadRef.current = doLoad;

  useEffect(() => {
    if (market === "kr-re") {
      setLoading(false);
      return;
    }
    try {
      const raw = localStorage.getItem(cfg.marketCacheKey);
      if (raw) {
        const parsed = JSON.parse(raw) as MarketData;
        if ((parsed.quotes?.length ?? 0) > 0 || (parsed.indices?.length ?? 0) > 0) {
          setData(parsed);
          setLoading(false);
        }
      }
    } catch { /* ignore */ }
    doLoadRef.current();
    const open = isMarketSessionOpen(market);
    const id = setInterval(() => doLoadRef.current(), open ? 60_000 : 5 * 60_000);
    return () => clearInterval(id);
  }, [market, cfg.marketCacheKey]);

  if (market === "kr-re") return <KrReMarketBlocks />;

  const recSyms = new Set(cfg.recommended.map((s) => s.symbol));
  const popSyms = new Set(cfg.popular.map((s) => s.symbol));
  const quotes = data?.quotes ?? [];
  const indices = data?.indices ?? [];
  const futures = data?.futures ?? [];
  const recommended = quotes.filter((q) => recSyms.has(q.symbol));
  const popular = quotes.filter((q) => popSyms.has(q.symbol));

  const showRecommended = market === "us";

  return (
    <>
      {showRecommended && (
        <section className="px-4 lg:px-0 pt-5">
          <div className="flex items-center gap-1.5 mb-3">
            <Star className="w-3.5 h-3.5" style={{ color: "#d4af37" }} fill="#d4af37" />
            <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--text)" }}>
              추천 종목
            </h2>
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {loading && recommended.length === 0
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="min-w-[155px] h-[148px] rounded-2xl border animate-pulse flex-shrink-0" style={{ borderColor: "var(--border)", background: "var(--card)" }} />
                ))
              : recommended.map((q) => <StockCard key={q.symbol} stock={q} market={market} />)}
          </div>
        </section>
      )}

      {(market === "us" || market === "kr" || market === "safe") && (
        <section className="px-4 lg:px-0 pt-5">
          <h2 className="text-xs font-semibold tracking-widest uppercase font-syne mb-3" style={{ color: "var(--text)" }}>
            {market === "safe" ? "주요 지표" : "주요 지수"}
          </h2>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {indices.map((idx) => <IndexCard key={idx.symbol} index={idx} />)}
          </div>
        </section>
      )}

      <section className="px-4 lg:px-0 pt-5">
        <h2 className="text-xs font-semibold tracking-widest uppercase font-syne mb-3" style={{ color: "var(--text)" }}>
          {market === "safe" ? "인기 자산" : "인기 종목"}
        </h2>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {popular.map((q) => <StockCard key={q.symbol} stock={q} market={market} />)}
        </div>
      </section>

      <section className="px-4 lg:px-0 pt-5">
        {cfg.heatmap === "sp500" && <SP500Heatmap />}
        {cfg.heatmap === "kospi" && <KospiHeatmap />}
        {(cfg.heatmap === "safe6" || cfg.heatmap === "safe10") && <SafeAssetsHeatmap quotes={quotes} />}
      </section>

      {(market === "us" || market === "kr" || market === "safe") && futures.length > 0 && (
        <section className="px-4 lg:px-0 pt-5">
          <FuturesHeatmap items={futures} />
        </section>
      )}
    </>
  );
}
