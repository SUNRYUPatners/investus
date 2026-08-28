"use client";

import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { IndexCard } from "./IndexCard";
import { StockCard } from "./StockCard";
import { FuturesHeatmap } from "./FuturesHeatmap";
import { SP500Heatmap } from "./SP500Heatmap";
import { MarketAISummary } from "./MarketAISummary";
import type { IndexQuote, Quote, FutureItem } from "@/lib/api";
import { RECOMMENDED_SYMBOLS } from "@/lib/api";
import { useLocale, useLocaleCode } from "@/contexts/LocaleContext";
import { SectionInfo } from "./SectionInfo";
import { isMarketOpen, isEodCacheFresh } from "@/lib/marketHours";
import { useAuth } from "@/hooks/useAuth";
import { SUBSCRIPTION, proPriceSummaryKo } from "@/lib/subscription";
import { SubscribeBlurOverlay } from "@/components/SubscribeGate";

type MarketData = { indices: IndexQuote[]; quotes: Quote[]; futures: FutureItem[]; liveAt?: number };

function useScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 4);
      setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return { ref, canLeft, canRight };
}

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


function persistMarketCache(d: MarketData) {
  try {
    if ((d?.quotes?.length ?? 0) > 0) {
      localStorage.setItem("market-data-cache", JSON.stringify({ ...d, _ts: Date.now() }));
      window.dispatchEvent(new StorageEvent("storage", { key: "market-data-cache" }));
    }
  } catch { /* ignore */ }
}

function fillMissingQuotes(d: MarketData, onExtras: (extras: Quote[]) => void): void {
  const quoteSym = new Set(d.quotes.map((q) => q.symbol));
  const allNeeded = [...new Set([...RECOMMENDED_SYMBOLS, "AAPL", "NVDA", "MSFT", "AMZN", "META", "AMD"])];
  const missing = allNeeded.filter((s) => !quoteSym.has(s));
  if (missing.length === 0) return;

  void fetch(`/api/guru-prices?symbols=${encodeURIComponent(missing.join(","))}`)
    .then((r) => r.json())
    .then((prices: Record<string, { price: number; change: number; changePercent: number }>) => {
      const extras: Quote[] = [];
      for (const sym of missing) {
        const p = prices[sym];
        if (p?.price > 0) {
          extras.push({
            symbol: sym, name: sym,
            price: p.price, change: p.change, changePercent: p.changePercent,
            sparkline: [], volume: "0", marketCap: "—",
          });
        }
      }
      if (extras.length > 0) onExtras(extras);
    })
    .catch(() => {});
}

export function LiveMarket({ initialData = null }: { initialData?: MarketData | null }) {
  const t      = useLocale();
  const locale = useLocaleCode();
  const { user } = useAuth();
  const picksLocked = SUBSCRIPTION.enabled && user?.isPro !== true;
  const [data, setData] = useState<MarketData | null>(initialData);
  const [loading, setLoading] = useState(!initialData);

  const recScroll    = useScrollIndicator();
  const quotesScroll = useScrollIndicator();
  const idxScroll    = useScrollIndicator();

  const doLoadRef = useRef<(isRetry?: boolean) => void>(() => {});

  const doLoad = (isRetry = false, retryDelay = 3000, bustCdn = false) => {
    // 이미 종가/시세가 보이면 스켈레톤으로 되돌리지 않음
    if (isRetry) setLoading(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    const url = bustCdn ? `/api/market-data?ts=${Date.now()}` : "/api/market-data";

    fetch(url, { signal: controller.signal, cache: "no-store" })
      .then((r) => {
        if (r.status === 503) throw Object.assign(new Error("retry"), { retry: true });
        if (!r.ok) throw new Error("http " + r.status);
        return r.json();
      })
      .then((d: MarketData) => {
        clearTimeout(timeout);
        const hasData = (d?.quotes?.length ?? 0) > 0 || (d?.indices?.length ?? 0) > 0;
        if (!hasData) throw new Error("empty");

        const dataAge = Date.now() - (d.liveAt ?? 0);
        if (!bustCdn && isMarketOpen() && dataAge > 10 * 60 * 1000) {
          doLoad(false, retryDelay, true);
          return;
        }
        if (!bustCdn && !isMarketOpen() && d.liveAt && !isEodCacheFresh(d.liveAt)) {
          doLoad(false, retryDelay, true);
          return;
        }

        // 즉시 페인트 — guru-prices는 막지 않음
        setData(d);
        setLoading(false);
        persistMarketCache(d);
        fillMissingQuotes(d, (extras) => {
          setData((prev) => {
            if (!prev) return prev;
            const have = new Set(prev.quotes.map((q) => q.symbol));
            const add = extras.filter((q) => !have.has(q.symbol));
            if (add.length === 0) return prev;
            const next = { ...prev, quotes: [...prev.quotes, ...add] };
            persistMarketCache(next);
            return next;
          });
        });
      })
      .catch((e: unknown & { retry?: boolean }) => {
        clearTimeout(timeout);
        const shouldRetry = (e as { retry?: boolean })?.retry;
        if (shouldRetry) {
          const next = Math.min(retryDelay * 2, 15_000);
          setTimeout(() => doLoad(false, next), retryDelay);
        } else {
          setData((prev) => {
            if (!prev) {
              setTimeout(() => doLoad(true, 3000), 5000);
              setLoading(false);
            }
            return prev;
          });
        }
      });
  };

  doLoadRef.current = doLoad;

  useEffect(() => {
    // SSR 데이터가 없으면 localStorage EOD/신선 캐시로 즉시 표시
    if (!initialData) {
      try {
        const cached = localStorage.getItem("market-data-cache");
        if (cached) {
          const parsed = JSON.parse(cached) as MarketData & { _ts?: number };
          const liveAt = parsed.liveAt ?? parsed._ts ?? 0;
          const ok = isMarketOpen()
            ? liveAt > 0 && Date.now() - liveAt < 10 * 60 * 1000
            : isEodCacheFresh(liveAt);
          if (ok && ((parsed?.quotes?.length ?? 0) > 0 || (parsed?.indices?.length ?? 0) > 0)) {
            setData(parsed);
            setLoading(false);
          }
        }
      } catch { /* ignore */ }
    } else {
      persistMarketCache(initialData);
    }

    // 백그라운드 최신화 (이미 보이면 스켈레톤 없이)
    doLoadRef.current();

    const id = setInterval(() => {
      doLoadRef.current();
    }, isMarketOpen() ? 60_000 : 5 * 60_000);

    const onVisibility = () => {
      if (!document.hidden) doLoadRef.current();
    };
    const onFocus = () => doLoadRef.current();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const indices     = data?.indices ?? [];
  const quotes      = data?.quotes  ?? [];
  const futures     = data?.futures ?? [];
  const recommended = quotes.filter((q) => RECOMMENDED_SYMBOLS.includes(q.symbol));


  return (
    <>
      {/* 추천주식 — Pro 유료 상품 */}
      <section className="px-4 lg:px-0 pt-5" aria-label="Investus 추천주식 유료 상품">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5" style={{ color: "#d4af37" }} fill="#d4af37" />
            <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--text)" }}>
              {t.market.picks}
            </h2>
          </div>
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>{t.market.cioPicks}</span>
        </div>
        <p className="text-[11px] mb-3 leading-relaxed" style={{ color: "var(--muted)" }}>
          <span className="font-semibold" style={{ color: "var(--text)" }}>유료 구독 상품</span>
          {" — "}CIO 선정 추천주식 열람 · {proPriceSummaryKo()}
        </p>
        <div className="relative">
          <SubscribeBlurOverlay
            locked={picksLocked}
            title="Investus 추천주식"
            description={`유료 구독 상품입니다. CIO 추천주식 열람 · ${proPriceSummaryKo()}`}
          >
          {recScroll.canLeft && (
            <div className="absolute left-0 top-0 bottom-1 w-10 z-10 pointer-events-none flex items-center"
              style={{ background: "linear-gradient(to right, var(--bg) 40%, transparent)" }}>
              <ChevronLeft className="w-4 h-4 ml-1 opacity-60" style={{ color: "var(--muted)" }} />
            </div>
          )}
          <div ref={recScroll.ref} className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
              : recommended.map((s) => <StockCard key={s.symbol} stock={s} />)}
          </div>
          {recScroll.canRight && (
            <div className="absolute right-0 top-0 bottom-1 w-10 z-10 pointer-events-none flex items-center justify-end"
              style={{ background: "linear-gradient(to left, var(--bg) 40%, transparent)" }}>
              <ChevronRight className="w-4 h-4 mr-1 opacity-60" style={{ color: "var(--muted)" }} />
            </div>
          )}
          </SubscribeBlurOverlay>
        </div>
      </section>

      {/* 주요 지수 */}
      <section className="px-4 lg:px-0 pt-6">
        <div className="flex items-center justify-between mb-3">
          <SectionInfo title={t.market.indices}>
            {locale === "ko" ? (<>
              <p className="font-bold mb-1" style={{ color: "var(--mint)" }}>주요 지수란?</p>
              <p style={{ color: "var(--muted)" }}>미국 증시 전체 흐름을 나타내는 대표 지표예요.</p>
              <div className="mt-2 space-y-1">
                <p>📈 <b>S&P 500</b> — 미국 대형주 500개 평균. 미국 경제의 대표 지수</p>
                <p>💻 <b>NASDAQ</b> — 기술주 중심. 애플·구글·엔비디아 등 포함</p>
                <p>🏭 <b>DOW</b> — 미국 전통 대기업 30개 평균</p>
                <p>📦 <b>Russell 2000</b> — 중소형주 2000개. 미국 경기 선행 지표</p>
              </div>
            </>) : (<>
              <p className="font-bold mb-1" style={{ color: "var(--mint)" }}>What are Major Indices?</p>
              <p style={{ color: "var(--muted)" }}>Key benchmarks tracking the overall direction of US markets.</p>
              <div className="mt-2 space-y-1">
                <p>📈 <b>S&P 500</b> — Average of 500 large-cap US stocks. The benchmark for the US economy</p>
                <p>💻 <b>NASDAQ</b> — Tech-heavy index. Includes Apple, Alphabet, Nvidia, etc.</p>
                <p>🏭 <b>DOW</b> — Average of 30 major traditional US blue chips</p>
                <p>📦 <b>Russell 2000</b> — 2,000 small/mid-cap stocks. A leading indicator for the US economy</p>
              </div>
            </>)}
          </SectionInfo>
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>{t.market.liveEst}</span>
        </div>
        <div className="relative">
          {idxScroll.canLeft && (
            <div className="absolute left-0 top-0 bottom-1 w-10 z-10 pointer-events-none flex items-center"
              style={{ background: "linear-gradient(to right, var(--bg) 40%, transparent)" }}>
              <ChevronLeft className="w-4 h-4 ml-1 opacity-60" style={{ color: "var(--muted)" }} />
            </div>
          )}
          <div ref={idxScroll.ref} className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
              : indices.map((idx) => <IndexCard key={idx.symbol} index={idx} />)}
          </div>
          {idxScroll.canRight && (
            <div className="absolute right-0 top-0 bottom-1 w-10 z-10 pointer-events-none flex items-center justify-end"
              style={{ background: "linear-gradient(to left, var(--bg) 40%, transparent)" }}>
              <ChevronRight className="w-4 h-4 mr-1 opacity-60" style={{ color: "var(--muted)" }} />
            </div>
          )}
        </div>
      </section>

      {/* 인기 종목 */}
      <section className="px-4 lg:px-0 pt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
            {t.market.popular}
          </h2>
          <ESTClock />
        </div>
        <div className="relative">
          {quotesScroll.canLeft && (
            <div className="absolute left-0 top-0 bottom-1 w-10 z-10 pointer-events-none flex items-center"
              style={{ background: "linear-gradient(to right, var(--bg) 40%, transparent)" }}>
              <ChevronLeft className="w-4 h-4 ml-1 opacity-60" style={{ color: "var(--muted)" }} />
            </div>
          )}
          <div ref={quotesScroll.ref} className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
              : quotes.map((s) => <StockCard key={s.symbol} stock={s} />)}
          </div>
          {quotesScroll.canRight && (
            <div className="absolute right-0 top-0 bottom-1 w-10 z-10 pointer-events-none flex items-center justify-end"
              style={{ background: "linear-gradient(to left, var(--bg) 40%, transparent)" }}>
              <ChevronRight className="w-4 h-4 mr-1 opacity-60" style={{ color: "var(--muted)" }} />
            </div>
          )}
        </div>
      </section>

      {/* S&P 500 섹터 히트맵 */}
      <section className="px-4 lg:px-0 pt-6">
        <SP500Heatmap />
      </section>

      {/* Futures 히트맵 */}
      <section className="px-4 lg:px-0 pt-6">
        <FuturesHeatmap items={futures} />
      </section>

      {/* 시장 종합 AI 분석 — Futures Map 바로 아래 */}
      <MarketAISummary />
    </>
  );
}
