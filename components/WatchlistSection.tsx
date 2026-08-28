"use client";

import { useEffect, useRef, useState } from "react";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useMarket } from "@/contexts/MarketContext";
import { getMarketConfig } from "@/lib/markets/config";
import { formatMarketPrice } from "@/lib/markets/formatPrice";
import type { Quote } from "@/lib/api";
import { Sparkline } from "./Sparkline";
import { Star } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import Link from "next/link";

const UP   = "#10b981";
const DOWN = "#ef4444";

type PriceData = { price: number; change: number; changePercent: number };

export function WatchlistSection() {
  const t = useLocale();
  const market = useMarket();
  const cfg = getMarketConfig(market);
  const { list, remove } = useWatchlist();
  const [liveQuotes, setLiveQuotes]   = useState<Quote[]>([]);
  const [extraPrices, setExtraPrices] = useState<Map<string, PriceData>>(new Map());
  const fetchedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const load = () => {
      try {
        const cached = localStorage.getItem(cfg.marketCacheKey);
        if (cached) {
          const d = JSON.parse(cached) as { quotes?: Quote[] };
          if (Array.isArray(d?.quotes)) setLiveQuotes(d.quotes);
        }
      } catch { /* ignore */ }
    };
    load();
    const onStorage = (e: StorageEvent) => { if (e.key === cfg.marketCacheKey) load(); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [cfg.marketCacheKey]);

  useEffect(() => {
    const liveMap = new Map(liveQuotes.map((q) => [q.symbol, q]));
    const missing = list.filter(
      (sym) => !liveMap.has(sym) && !extraPrices.has(sym) && !fetchedRef.current.has(sym)
    );
    if (missing.length === 0) return;

    missing.forEach((sym) => fetchedRef.current.add(sym));

    if (market === "us") {
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
      return;
    }

    fetch(`/api/market-data?market=${market}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { quotes?: Quote[] }) => {
        const quotes = d.quotes ?? [];
        setExtraPrices((prev) => {
          const next = new Map(prev);
          for (const sym of missing) {
            const q = quotes.find((x) => x.symbol === sym);
            if (q && q.price > 0) {
              next.set(sym, { price: q.price, change: q.change, changePercent: q.changePercent });
            }
          }
          return next;
        });
      })
      .catch(() => {});
  }, [list, liveQuotes, extraPrices, market]);

  if (list.length === 0) return null;

  const liveMap = new Map(liveQuotes.map((q) => [q.symbol, q]));

  return (
    <section className="px-4 lg:px-0 pt-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5" style={{ color: "#d4af37" }} fill="#d4af37" />
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

          const priceData: PriceData | null = stock
            ? { price: stock.price, change: stock.change, changePercent: stock.changePercent }
            : extra ?? null;

          const displayName = stock?.name ?? sym;
          const displaySymbol = market === "kr" ? sym.replace(/\.(KS|KQ)$/i, "") : sym;

          if (!priceData) {
            return (
              <Link
                key={sym}
                href={`/stock/${sym}`}
                className="w-[155px] lg:w-[190px] flex-shrink-0 rounded-2xl p-4 border block relative active:opacity-70 transition-opacity"
                style={{ background: "var(--card)", borderColor: "var(--border)", textDecoration: "none" }}
              >
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); remove(sym); }}
                  className="absolute top-2 right-2 p-0.5"
                  aria-label={t.watchlist.removeLabel}
                >
                  <Star className="w-3.5 h-3.5" style={{ color: "#d4af37" }} fill="#d4af37" />
                </button>
                <div className="mb-2 pr-5">
                  <p className="text-sm font-bold truncate" style={{ color: "var(--text)" }}>{displayName}</p>
                  <p className="text-[10px]" style={{ color: "var(--muted)" }}>{t.watchlist.loading}</p>
                </div>
                <div className="h-[28px]" />
                <div className="mt-1.5 flex items-end justify-between gap-1">
                  <p className="text-sm font-bold font-mono-num" style={{ color: "var(--muted)" }}>—</p>
                  <p className="text-xs flex-shrink-0" style={{ color: "var(--muted)" }}>—</p>
                </div>
              </Link>
            );
          }

          const pos   = priceData.changePercent >= 0;
          const color = pos ? UP : DOWN;
          const sparkline = stock?.sparkline ?? [];

          return (
            <Link
              key={sym}
              href={`/stock/${sym}`}
              className="w-[155px] lg:w-[190px] flex-shrink-0 rounded-2xl p-4 border block relative active:opacity-70 transition-opacity"
              style={{ background: "var(--card)", borderColor: "var(--border)", textDecoration: "none" }}
            >
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); remove(sym); }}
                className="absolute top-2 right-2 p-0.5"
                aria-label={t.watchlist.removeLabel}
              >
                <Star className="w-3.5 h-3.5" style={{ color: "#d4af37" }} fill="#d4af37" />
              </button>

              <div className="mb-2 pr-5">
                <p className="text-sm font-bold truncate max-w-[100px] lg:max-w-full" style={{ color: "var(--text)" }}>
                  {market === "kr" || market === "safe" ? displayName : displaySymbol}
                </p>
                <p className="text-[10px] truncate max-w-[100px] lg:max-w-full" style={{ color: "var(--muted)" }}>
                  {market === "kr" || market === "safe" ? displaySymbol : displayName}
                </p>
              </div>

              <Sparkline data={sparkline} positive={pos} width={100} height={28} className="w-full" />

              <div className="mt-1.5 flex items-end justify-between gap-1">
                <p className="text-sm font-bold font-mono-num tabular-nums truncate min-w-0" style={{ color: "var(--text)" }}>
                  {formatMarketPrice(market, priceData.price)}
                </p>
                <p className="text-xs font-mono-num flex-shrink-0" style={{ color }}>
                  {pos ? "+" : ""}{priceData.changePercent.toFixed(2)}%
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
