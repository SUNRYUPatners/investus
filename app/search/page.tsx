"use client";

import { useState, useTransition, useEffect } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { mockQuotes, type Quote, RECOMMENDED_SYMBOLS } from "@/lib/api";
import { Header } from "@/components/Header";
import { TickerTape } from "@/components/TickerTape";
import { useWatchlist } from "@/hooks/useWatchlist";
import { GuruHoldings } from "@/components/GuruHoldings";
import { AdFitBanner } from "@/components/AdFitBanner";
import { NewsSection } from "@/components/NewsSection";
import { Star } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
const UP   = "#10b981";
const DOWN = "#ef4444";

const POPULAR = ["AAPL", "NVDA", "TSLA", "MSFT", "AMZN", "META", "GOOGL", "AMD"];

// Static symbol registry — source of truth for symbol + name only
const SYMBOL_REGISTRY = mockQuotes.map(({ symbol, name, volume, marketCap }) => ({
  symbol, name, volume, marketCap,
}));

function StockRow({
  stock,
  hasLivePrice,
  inWatchlist,
  onToggle,
}: {
  stock: Quote;
  hasLivePrice: boolean;
  inWatchlist: boolean;
  onToggle: () => void;
}) {
  const t     = useLocale();
  const pos   = stock.changePercent >= 0;
  const color = pos ? UP : DOWN;

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
          <span className="text-xs font-bold font-mono-num" style={{ color: "var(--text)" }}>
            {stock.symbol.slice(0, 2)}
          </span>
        </div>

        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-bold font-mono-num" style={{ color: "var(--text)" }}>{stock.symbol}</p>
          <p className="text-xs truncate" style={{ color: "var(--muted)" }}>{stock.name}</p>
        </div>

        <div className="text-right flex-shrink-0">
          {hasLivePrice ? (
            <>
              <p className="text-sm font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
                ${stock.price.toFixed(2)}
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
  const [query, setQuery]     = useState("");
  const [, startTransition]   = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const { list, toggle }      = useWatchlist();

  // Live prices: localStorage 캐시 → 누락 심볼은 API 직접 fetch
  const [liveMap, setLiveMap] = useState<Map<string, Quote>>(new Map());

  useEffect(() => {
    const ALL_SYMBOLS = [...new Set([...POPULAR, ...RECOMMENDED_SYMBOLS, ...SYMBOL_REGISTRY.map(s => s.symbol)])];

    const loadFromCache = (): Map<string, Quote> => {
      try {
        const cached = localStorage.getItem("market-data-cache");
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
      // 캐시 여부와 무관하게 누락 심볼 보완
      await fetchMissing(map);
    };

    init();

    const onStorage = (e: StorageEvent) => {
      if (e.key !== "market-data-cache") return;
      const map = loadFromCache();
      setLiveMap(map);
      fetchMissing(map);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Fetch Yahoo Finance when local results < 3
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
        const r = await fetch(`/api/stock-search?q=${encodeURIComponent(searchQuery)}`);
        const data = await r.json() as { symbol: string; name: string; exchange: string }[];
        // exclude symbols already in local registry
        const localSymbols = new Set(SYMBOL_REGISTRY.map(s => s.symbol));
        setApiResults((Array.isArray(data) ? data : []).filter(d => !localSymbols.has(d.symbol)));
      } catch { /* ignore */ }
      setApiLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const lq = searchQuery.toLowerCase();
  const results = searchQuery.trim()
    ? enriched.filter(({ stock }) =>
        stock.symbol.toLowerCase().includes(lq) || stock.name.toLowerCase().includes(lq)
      )
    : [];

  const popularStocks     = enriched.filter(({ stock }) => POPULAR.includes(stock.symbol));
  const recommendedStocks = enriched.filter(({ stock }) => RECOMMENDED_SYMBOLS.includes(stock.symbol));
  const showResults   = query.length > 0;

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <TickerTape />

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
                  <NewsSection />
                </div>

                {/* 투자 대가 13F — 모바일에서만 여기 */}
                <div className="lg:hidden">
                  <GuruHoldings />
                </div>

                {/* 광고 — 모바일 전용 */}
                <div className="lg:hidden">
                  <AdFitBanner />
                </div>

                {/* 시장 뉴스 — 데스크톱: 추천주식 위 */}
                <div className="hidden lg:block">
                  <NewsSection />
                </div>

                {/* Investus 추천주식 */}
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
                    {recommendedStocks.map(({ stock, hasLivePrice }) => (
                      <StockRow
                        key={stock.symbol}
                        stock={stock}
                        hasLivePrice={hasLivePrice}
                        inWatchlist={list.includes(stock.symbol)}
                        onToggle={() => toggle(stock.symbol)}
                      />
                    ))}
                  </div>
                </div>

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
                      />
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* 오른쪽: 투자대가 13F — 데스크톱 전용 sticky */}
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
          </div>

        </div>
      </main>
    </div>
  );
}
