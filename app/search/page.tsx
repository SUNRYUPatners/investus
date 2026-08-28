"use client";

import { useState, useTransition, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { mockQuotes, type Quote, RECOMMENDED_SYMBOLS } from "@/lib/api";
import { Header } from "@/components/Header";
import { TickerTape } from "@/components/TickerTape";
import { EcoTickerTape } from "@/components/EcoTickerTape";
import { useWatchlist } from "@/hooks/useWatchlist";
import { GuruHoldings } from "@/components/GuruHoldings";
import { AdFitBanner, AdFitStrip } from "@/components/AdFitBanner";
import { NewsSection } from "@/components/NewsSection";
import { EconomicCalendar } from "@/components/EconomicCalendar";
import { Star } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { useMarket } from "@/contexts/MarketContext";
import { useAuth } from "@/hooks/useAuth";
import { SUBSCRIPTION } from "@/lib/subscription";
import { SubscribeBlurOverlay } from "@/components/SubscribeGate";
import { getMarketConfig } from "@/lib/markets/config";
import { formatMarketPrice } from "@/lib/markets/formatPrice";
import type { MarketId } from "@/lib/markets/types";
const UP   = "var(--up)";
const DOWN = "var(--down)";

const POPULAR_US = ["AAPL", "NVDA", "TSLA", "MSFT", "AMZN", "META", "GOOGL", "AMD"];

// Static symbol registry — source of truth for symbol + name only (US)
const SYMBOL_REGISTRY_US = mockQuotes.map(({ symbol, name, volume, marketCap }) => ({
  symbol, name, volume, marketCap,
}));

function formatPrice(price: number, market: MarketId) {
  return formatMarketPrice(market, price);
}

function StockRow({
  stock,
  hasLivePrice,
  inWatchlist,
  onToggle,
  market,
}: {
  stock: Quote;
  hasLivePrice: boolean;
  inWatchlist: boolean;
  onToggle: () => void;
  market: MarketId;
}) {
  const t     = useLocale();
  const pos   = stock.changePercent >= 0;
  const color = pos ? UP : DOWN;
  const primary = market === "kr" || market === "safe" ? stock.name : stock.symbol;
  const secondary = market === "kr" || market === "safe" ? stock.symbol.replace(/\.(KS|KQ)$/i, "") : stock.name;

  return (
    <div
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <Link href={`/stock/${stock.symbol}`} className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--border)" }}
        >
          <span className="text-xs font-bold" style={{ color: "var(--text)" }}>
            {primary.slice(0, 2)}
          </span>
        </div>

        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-bold truncate" style={{ color: "var(--text)" }}>{primary}</p>
          <p className="text-xs truncate" style={{ color: "var(--muted)" }}>{secondary}</p>
        </div>

        <div className="text-right flex-shrink-0">
          {hasLivePrice ? (
            <>
              <p className="text-sm font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
                {formatPrice(stock.price, market)}
              </p>
              <p className="text-xs font-mono-num" style={{ color }}>
                {pos ? "+" : ""}{stock.changePercent.toFixed(2)}%
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-mono-num" style={{ color: "var(--muted)" }}>—</p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>—</p>
            </>
          )}
        </div>
      </Link>

      <button
        onClick={onToggle}
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg active:scale-90 transition-transform"
        aria-label={inWatchlist ? t.search.watchlistRemove : t.search.watchlistAdd}
      >
        <span
          className="text-lg leading-none"
          style={{ color: inWatchlist ? "#facc15" : "var(--border)", filter: inWatchlist ? "drop-shadow(0 0 4px #facc15)" : "none" }}
        >
          ★
        </span>
      </button>
    </div>
  );
}

export default function SearchPage() {
  const t = useLocale();
  const market = useMarket();
  const cfg = getMarketConfig(market);
  const isUs = market === "us";
  const isKr = market === "kr";
  const hidePicks = isKr || market === "kr-re";
  const { user } = useAuth();
  const picksLocked = SUBSCRIPTION.enabled && user?.isPro !== true;
  const [query, setQuery]     = useState("");
  const [, startTransition]   = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const { list, toggle }      = useWatchlist();

  const POPULAR = useMemo(
    () => (isUs ? POPULAR_US : cfg.popular.map((s) => s.symbol)),
    [isUs, cfg.popular],
  );
  const RECOMMENDED = useMemo(
    () => (isUs ? RECOMMENDED_SYMBOLS : cfg.recommended.map((s) => s.symbol)),
    [isUs, cfg.recommended],
  );
  const SYMBOL_REGISTRY = useMemo(() => {
    if (isUs) return SYMBOL_REGISTRY_US;
    const all = [...cfg.recommended, ...cfg.popular, ...cfg.indices];
    const seen = new Set<string>();
    return all
      .filter((s) => {
        if (seen.has(s.symbol)) return false;
        seen.add(s.symbol);
        return true;
      })
      .map((s) => ({ symbol: s.symbol, name: s.name, volume: "—", marketCap: "—" }));
  }, [isUs, cfg]);

  // Live prices: localStorage 캐시 → 누락 심볼은 API 직접 fetch
  const [liveMap, setLiveMap] = useState<Map<string, Quote>>(new Map());

  useEffect(() => {
    const ALL_SYMBOLS = [...new Set([...POPULAR, ...RECOMMENDED, ...SYMBOL_REGISTRY.map(s => s.symbol)])];
    const cacheKey = cfg.marketCacheKey;

    const loadFromCache = (): Map<string, Quote> => {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const d = JSON.parse(cached) as { quotes?: Quote[] };
          if (Array.isArray(d?.quotes)) return new Map(d.quotes.map((q) => [q.symbol, q]));
        }
      } catch { /* ignore */ }
      return new Map();
    };

    const fetchMissing = async (map: Map<string, Quote>) => {
      const missing = ALL_SYMBOLS.filter((s) => !map.has(s));
      if (missing.length === 0) return;
      try {
        if (!isUs) {
          const r = await fetch(`/api/market-data?market=${market}`, { cache: "no-store" });
          if (!r.ok) return;
          const d = await r.json() as { quotes?: Quote[] };
          if (!Array.isArray(d?.quotes)) return;
          setLiveMap((prev) => {
            const next = new Map(prev);
            for (const q of d.quotes!) next.set(q.symbol, q);
            return next;
          });
          return;
        }
        const r = await fetch(`/api/guru-prices?symbols=${encodeURIComponent(missing.join(","))}`);
        const data = await r.json() as Record<string, { price: number; change: number; changePercent: number }>;
        setLiveMap((prev) => {
          const next = new Map(prev);
          SYMBOL_REGISTRY.forEach((s) => {
            if (data[s.symbol]?.price > 0 && !next.has(s.symbol)) {
              next.set(s.symbol, {
                ...s,
                price:         data[s.symbol].price,
                change:        data[s.symbol].change,
                changePercent: data[s.symbol].changePercent,
                sparkline:     [],
              } as Quote);
            }
          });
          return next;
        });
      } catch { /* ignore */ }
    };

    const init = async () => {
      const map = loadFromCache();
      if (map.size > 0) setLiveMap(map);
      await fetchMissing(map);
    };

    setLiveMap(new Map());
    init();

    const onStorage = (e: StorageEvent) => {
      if (e.key !== cacheKey) return;
      const map = loadFromCache();
      setLiveMap(map);
      fetchMissing(map);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [market, cfg.marketCacheKey]);

  // Build enriched stock list: static symbol/name + live price (or no price flag)
  const enriched = SYMBOL_REGISTRY.map((s) => {
    const live = liveMap.get(s.symbol);
    return {
      stock: live ?? { ...s, price: 0, change: 0, changePercent: 0, sparkline: [] } as Quote,
      hasLivePrice: !!live,
    };
  });

  // API fallback results for queries not found locally
  const [apiResults, setApiResults] = useState<{ symbol: string; name: string; exchange: string }[]>([]);
  const [apiLoading, setApiLoading] = useState(false);

  const handleChange = (q: string) => {
    setQuery(q);
    startTransition(() => setSearchQuery(q));
    setApiResults([]);
  };

  // Fetch remote search when local results are sparse
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 1) { setApiResults([]); return; }
    const lq2 = searchQuery.toLowerCase();
    const localCount = enriched.filter(({ stock }) =>
      stock.symbol.toLowerCase().includes(lq2) || stock.name.toLowerCase().includes(lq2)
    ).length;
    if (localCount >= 3) { setApiResults([]); return; }
    const timer = setTimeout(async () => {
      setApiLoading(true);
      try {
        const endpoint = isUs
          ? `/api/stock-search?q=${encodeURIComponent(searchQuery)}`
          : isKr
            ? `/api/kr-stock-search?q=${encodeURIComponent(searchQuery)}`
            : market === "safe"
              ? `/api/market-data?market=safe`
              : market === "kr-re"
                ? `/api/kr-re-regions`
                : null;
        if (!endpoint) { setApiResults([]); setApiLoading(false); return; }
        const r = await fetch(endpoint);
        const data = await r.json();
        const localSymbols = new Set(SYMBOL_REGISTRY.map(s => s.symbol));
        if (market === "safe") {
          const quotes = (data as { quotes?: { symbol: string; name: string }[] }).quotes ?? [];
          const lq3 = searchQuery.toLowerCase();
          setApiResults(
            quotes
              .filter((d) => !localSymbols.has(d.symbol) && (d.symbol.toLowerCase().includes(lq3) || d.name.toLowerCase().includes(lq3)))
              .map((d) => ({ symbol: d.symbol, name: d.name, exchange: "SAFE" })),
          );
        } else if (market === "kr-re") {
          const regions = (data as { regions?: { id: string; name: string }[] }).regions ?? [];
          const lq3 = searchQuery.toLowerCase();
          setApiResults(
            regions
              .filter((d) => !localSymbols.has(d.id) && d.name.toLowerCase().includes(lq3))
              .map((d) => ({ symbol: d.id, name: d.name, exchange: "KR-RE" })),
          );
        } else {
          setApiResults((Array.isArray(data) ? data : []).filter((d: { symbol: string }) => !localSymbols.has(d.symbol)));
        }
      } catch { /* ignore */ }
      setApiLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, isUs, isKr]);

  const lq = searchQuery.toLowerCase();
  const results = searchQuery.trim()
    ? enriched.filter(({ stock }) =>
        stock.symbol.toLowerCase().includes(lq) || stock.name.toLowerCase().includes(lq)
      )
    : [];

  const popularStocks     = enriched.filter(({ stock }) => POPULAR.includes(stock.symbol));
  const recommendedStocks = enriched.filter(({ stock }) => RECOMMENDED.includes(stock.symbol));
  const showResults   = query.length > 0;

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      {isUs && (
        <>
          <TickerTape market="us" />
          <EcoTickerTape market="us" />
        </>
      )}
      {market === "kr" && (
        <>
          <TickerTape market="kr" />
          <EcoTickerTape market="kr" />
        </>
      )}
      {market === "safe" && (
        <>
          <TickerTape market="safe" />
          <EcoTickerTape market="safe" />
        </>
      )}

      <main className="max-w-[480px] mx-auto lg:max-w-none px-4 lg:px-8 pt-5 lg:pb-10">
        <div className="lg:flex lg:gap-8 lg:items-start">

          {/* 왼쪽: 검색 + 결과 / 인기종목 */}
          <div className="lg:flex-1 lg:min-w-0">
            {/* Search input */}
            <div
              className="flex items-center gap-2 rounded-2xl px-4 py-3 border mb-5"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
              <input
                type="text"
                placeholder={t.search.placeholder}
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                className="flex-1 bg-transparent outline-none"
                style={{ color: "var(--text)", fontSize: "16px" }}
              />
              {query && (
                <button onClick={() => handleChange("")}>
                  <X className="w-4 h-4" style={{ color: "var(--muted)" }} />
                </button>
              )}
            </div>

            {showResults ? (
              <div>
                <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>
                  {t.search.results(results.length + apiResults.length)}
                </p>
                {results.length > 0 || apiResults.length > 0 ? (
                  <>
                    <div className="flex flex-col gap-2">
                      {results.map(({ stock, hasLivePrice }) => (
                        <StockRow
                          key={stock.symbol}
                          stock={stock}
                          hasLivePrice={hasLivePrice}
                          inWatchlist={list.includes(stock.symbol)}
                          onToggle={() => toggle(stock.symbol)}
                        market={market}
                        />
                      ))}
                      {/* Yahoo Finance API fallback results */}
                      {apiResults.map((r) => (
                        <Link key={r.symbol} href={`/stock/${r.symbol}`}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: "var(--border)" }}>
                            <span className="text-xs font-bold font-mono-num" style={{ color: "var(--text)" }}>
                              {r.symbol.slice(0, 2)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold font-mono-num" style={{ color: "var(--text)" }}>{r.symbol}</p>
                            <p className="text-xs truncate" style={{ color: "var(--muted)" }}>{r.name}</p>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "var(--muted)" }}>{r.exchange}</span>
                        </Link>
                      ))}
                      {apiLoading && (
                        <div className="flex justify-center py-3">
                          <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--mint)", borderTopColor: "transparent" }} />
                        </div>
                      )}
                    </div>
                    <div className="mt-4"><AdFitBanner /></div>
                  </>
                ) : apiLoading ? (
                  <div className="flex justify-center py-16">
                    <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--mint)", borderTopColor: "transparent" }} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <Search className="w-10 h-10 opacity-20" style={{ color: "var(--muted)" }} />
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      {t.search.noResults(query)}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {/* 시장 뉴스 — 모바일 최상단 */}
                <div className="lg:hidden">
                  <NewsSection market={market} />
                </div>

                <div>
                  <AdFitStrip />
                </div>

                {/* 투자 대가 13F — 미국주식만 */}
                {isUs && (
                <div className="lg:hidden">
                  <GuruHoldings />
                </div>
                )}

                <div>
                  <AdFitBanner />
                </div>

                {/* 경제 캘린더 — 모바일 */}
                <div className="lg:hidden">
                  <EconomicCalendar />
                </div>

                <div>
                  <AdFitStrip />
                </div>

                {/* 시장 뉴스 — 데스크톱: 추천주식 위 */}
                <div className="hidden lg:block">
                  <NewsSection market={market} />
                </div>

                {/* 경제 캘린더 — 데스크톱 */}
                <div className="hidden lg:block">
                  <EconomicCalendar />
                </div>

                <div className="hidden lg:block">
                  <AdFitBanner />
                </div>

                {/* Investus 추천주식 — 한국장은 미표시 */}
                {!hidePicks && (
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Star className="w-3.5 h-3.5" style={{ color: "var(--mint)" }} fill="var(--mint)" />
                    <h2
                      className="text-xs font-semibold tracking-widest uppercase font-syne"
                      style={{ color: "var(--text)" }}
                    >
                      {t.search.picks}
                    </h2>
                    <span className="ml-auto text-[10px]" style={{ color: "var(--muted)" }}>{t.search.cioPicks}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <SubscribeBlurOverlay
                      locked={picksLocked}
                      title="Investus 추천주식"
                      description={`CIO 선정 종목은 Pro 구독 후 열람할 수 있습니다. 월 ${SUBSCRIPTION.priceKrw.toLocaleString("ko-KR")}원`}
                    >
                    {recommendedStocks.map(({ stock, hasLivePrice }) => (
                      <StockRow
                        key={stock.symbol}
                        stock={stock}
                        hasLivePrice={hasLivePrice}
                        inWatchlist={list.includes(stock.symbol)}
                        onToggle={() => toggle(stock.symbol)}
                        market={market}
                      />
                    ))}
                    </SubscribeBlurOverlay>
                  </div>
                </div>
                )}

                {/* 인기 종목 */}
                <div>
                  <h2
                    className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
                    style={{ color: "var(--muted)" }}
                  >
                    {t.search.popular}
                  </h2>
                  <div className="flex flex-col gap-2">
                    {popularStocks.map(({ stock, hasLivePrice }) => (
                      <StockRow
                        key={stock.symbol}
                        stock={stock}
                        hasLivePrice={hasLivePrice}
                        inWatchlist={list.includes(stock.symbol)}
                        onToggle={() => toggle(stock.symbol)}
                        market={market}
                      />
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* 오른쪽: 투자대가 13F — 미국주식 데스크톱 전용 */}
          {isUs && (
          <div
            className="hidden lg:block lg:w-[340px] lg:flex-shrink-0 overflow-y-auto no-scrollbar"
            style={{
              position: "sticky",
              top: 57,
              maxHeight: "calc(100vh - 57px)",
              background: "var(--bg)",
              willChange: "transform",
            }}
          >
            <GuruHoldings />
            <div className="mt-4 px-1">
              <AdFitBanner />
            </div>
            <div className="mt-3 px-1">
              <AdFitStrip />
            </div>
          </div>
          )}

        </div>
      </main>
    </div>
  );
}
