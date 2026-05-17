"use client";

import { useEffect, useRef, useState } from "react";
import { useWatchlist } from "@/hooks/useWatchlist";
import type { Quote } from "@/lib/api";
import { Sparkline } from "./Sparkline";
import { Star } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import Link from "next/link";

const UP   = "#00e5a0";
const DOWN = "#ff4d6d";

type PriceData = { price: number; change: number; changePercent: number };

export function WatchlistSection() {
  const t = useLocale();
  const { list, remove } = useWatchlist();
  const [liveQuotes, setLiveQuotes]   = useState<Quote[]>([]);
  const [extraPrices, setExtraPrices] = useState<Map<string, PriceData>>(new Map());
  const fetchedRef = useRef<Set<string>>(new Set());

  // 1. market-data-cache에서 읽기 (LiveMarket과 공유)
  useEffect(() => {
    const load = () => {
      try {
        const cached = localStorage.getItem("market-data-cache");
        if (cached) {
          const d = JSON.parse(cached) as { quotes?: Quote[] };
          if (Array.isArray(d?.quotes)) setLiveQuotes(d.quotes);
        }
      } catch { /* ignore */ }
    };
    load();
    const onStorage = (e: StorageEvent) => { if (e.key === "market-data-cache") load(); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // 2. 캐시에 없는 관심종목은 개별 fetch
  useEffect(() => {
    const liveMap = new Map(liveQuotes.map((q) => [q.symbol, q]));
    const missing = list.filter(
      (sym) => !liveMap.has(sym) && !extraPrices.has(sym) && !fetchedRef.current.has(sym)
    );
    if (missing.length === 0) return;

    missing.forEach((sym) => fetchedRef.current.add(sym));

    fetch(`/api/guru-prices?symbols=${encodeURIComponent(missing.join(","))}`)
      .then((r) => r.json())
      .then((data: Record<string, PriceData>) => {
        setExtraPrices((prev) => {
          const next = new Map(prev);
          for (const sym of missing) {
            if (data[sym]?.price > 0) next.set(sym, data[sym]);
          }
          return next;
        });
      })
      .catch(() => {});
  }, [list, liveQuotes, extraPrices]);

  if (list.length === 0) return null;

  const liveMap = new Map(liveQuotes.map((q) => [q.symbol, q]));

  return (
    <section className="px-4 pt-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5" style={{ color: "#facc15" }} fill="#facc15" />
          <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--text)" }}>
            {t.watchlist.title}
          </h2>
        </div>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>{t.watchlist.count(list.length)}</span>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {list.map((sym) => {
          const stock = liveMap.get(sym);
          const extra = extraPrices.get(sym);

          // 가격 데이터 결정: market-data-cache → 개별 fetch → 로딩 중
          const priceData: PriceData | null = stock
            ? { price: stock.price, change: stock.change, changePercent: stock.changePercent }
            : extra ?? null;

          if (!priceData) {
            return (
              <Link key={sym} href={`/stock/${sym}`} style={{ textDecoration: "none" }}>
                <div
                  className="min-w-[140px] flex-shrink-0 rounded-2xl p-3 border relative active:opacity-70 transition-opacity"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); remove(sym); }}
                    className="absolute top-2 right-2 p-0.5"
                    aria-label={t.watchlist.removeLabel}
                  >
                    <Star className="w-3.5 h-3.5" style={{ color: "#facc15" }} fill="#facc15" />
                  </button>
                  <div className="mb-6 pr-5">
                    <p className="text-sm font-bold font-mono-num" style={{ color: "var(--text)" }}>{sym}</p>
                    <p className="text-[10px]" style={{ color: "var(--muted)" }}>{t.watchlist.loading}</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-sm font-bold font-mono-num" style={{ color: "var(--muted)" }}>—</p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>—</p>
                  </div>
                </div>
              </Link>
            );
          }

          const pos   = priceData.changePercent >= 0;
          const color = pos ? UP : DOWN;
          const sparkline = stock?.sparkline ?? [];

          return (
            <Link key={sym} href={`/stock/${sym}`} style={{ textDecoration: "none" }}>
              <div
                className="min-w-[140px] flex-shrink-0 rounded-2xl p-3 border relative active:opacity-70 transition-opacity"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); remove(sym); }}
                  className="absolute top-2 right-2 p-0.5"
                  aria-label={t.watchlist.removeLabel}
                >
                  <Star className="w-3.5 h-3.5" style={{ color: "#facc15" }} fill="#facc15" />
                </button>

                <div className="mb-2 pr-5">
                  <p className="text-sm font-bold font-mono-num" style={{ color: "var(--text)" }}>
                    {sym}
                  </p>
                  <p className="text-[10px] truncate" style={{ color: "var(--muted)" }}>
                    {stock?.name ?? sym}
                  </p>
                </div>

                <Sparkline data={sparkline} positive={pos} width={100} height={28} />

                <div className="mt-1.5 flex items-end justify-between">
                  <p className="text-sm font-bold font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
                    ${priceData.price.toFixed(2)}
                  </p>
                  <p className="text-xs font-mono-num" style={{ color }}>
                    {pos ? "+" : ""}{priceData.changePercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
