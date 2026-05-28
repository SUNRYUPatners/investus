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
import { useLocale } from "@/contexts/LocaleContext";
import { SectionInfo } from "./SectionInfo";
import { isMarketOpen } from "@/lib/marketHours";

type MarketData = { indices: IndexQuote[]; quotes: Quote[]; futures: FutureItem[] };

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


export function LiveMarket() {
  const t = useLocale();
  const [data, setData]       = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  const recScroll    = useScrollIndicator();
  const quotesScroll = useScrollIndicator();
  const idxScroll    = useScrollIndicator();

  // Ref so the interval always calls the latest version of doLoad
  const doLoadRef = useRef<(isRetry?: boolean) => void>(() => {});

  const doLoad = (isRetry = false, retryDelay = 3000) => {
    if (isRetry) { setLoading(true); }

    // 15초 타임아웃
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), 15_000);

    fetch("/api/market-data", { signal: controller.signal, cache: "no-store" })
      .then((r) => {
        if (r.status === 503) throw Object.assign(new Error("retry"), { retry: true });
        if (!r.ok) throw new Error("http " + r.status);
        return r.json();
      })
      .then(async (d: MarketData) => {
        clearTimeout(timeout);
        const hasData = (d?.quotes?.length ?? 0) > 0 || (d?.indices?.length ?? 0) > 0;
        if (!hasData) throw new Error("empty");

        // 누락 심볼 보완: RECOMMENDED_SYMBOLS + POPULAR 중 quotes에 없는 심볼 개별 fetch
        const quoteSym = new Set(d.quotes.map((q) => q.symbol));
        const allNeeded = [...new Set([...RECOMMENDED_SYMBOLS, "AAPL", "NVDA", "MSFT", "AMZN", "META", "AMD"])];
        const missing   = allNeeded.filter((s) => !quoteSym.has(s));
        if (missing.length > 0) {
          try {
            const pr = await fetch(`/api/guru-prices?symbols=${encodeURIComponent(missing.join(","))}`);
            const prices = await pr.json() as Record<string, { price: number; change: number; changePercent: number }>;
            for (const sym of missing) {
              const p = prices[sym];
              if (p?.price > 0) {
                d.quotes.push({
                  symbol: sym, name: sym,
                  price: p.price, change: p.change, changePercent: p.changePercent,
                  sparkline: [], volume: "0", marketCap: "—",
                });
              }
            }
          } catch { /* 보완 실패 시 있는 데이터로 표시 */ }
        }

        setData(d);
        setLoading(false);
        try {
          if ((d?.quotes?.length ?? 0) > 0) {
            localStorage.setItem("market-data-cache", JSON.stringify({ ...d, _ts: Date.now() }));
            window.dispatchEvent(new StorageEvent("storage", { key: "market-data-cache" }));
          }
        } catch { /* ignore */ }
      })
      .catch((e: unknown & { retry?: boolean }) => {
        clearTimeout(timeout);
        const shouldRetry = (e as { retry?: boolean })?.retry;
        if (shouldRetry) {
          // 503 일시적 오류 — 데이터 없으면 스켈레톤 유지하면서 재시도, 있으면 보이는 채로 재시도
          const next = Math.min(retryDelay * 2, 15_000);
          setTimeout(() => doLoad(false, next), retryDelay);
        } else {
          // 기존 데이터 있으면 그대로 유지, 없으면 재시도 버튼 (절대 빈 화면 금지)
          setData((prev) => {
            if (!prev) {
              // 데이터 없을 때도 재시도 버튼 대신 자동 재시도
              setTimeout(() => doLoad(true, 3000), 5000);
              setLoading(false);
            }
            return prev;
          });
        }
      });
  };

  // Keep ref pointing to the latest doLoad on every render
  doLoadRef.current = doLoad;

  useEffect(() => {
    // 1. 캐시를 즉시 표시 — 5분 이내 데이터만 사용 (오래된 캐시는 잘못된 가격 표시 방지)
    try {
      const cached = localStorage.getItem("market-data-cache");
      if (cached) {
        const parsed = JSON.parse(cached) as MarketData & { _ts?: number };
        const ageMs = Date.now() - (parsed._ts ?? 0);
        const FRESH_MS = 5 * 60 * 1000; // 5분
        if (ageMs < FRESH_MS && ((parsed?.quotes?.length ?? 0) > 0 || (parsed?.indices?.length ?? 0) > 0)) {
          setData(parsed);
          setLoading(false);
        }
      }
    } catch { /* ignore */ }

    // 항상 최신 데이터를 서버에서 가져옴 (localStorage는 로딩 중 임시 표시용)
    // 장 마감 중이어도 1회 fetch — 서버 KV 캐시에서 당일 종가를 즉시 반환
    doLoadRef.current();

    // 장 중: 60초마다 갱신 / 장 마감: 5분마다 갱신 (항상 최신 데이터 유지)
    const id = setInterval(() => {
      doLoadRef.current();
    }, isMarketOpen() ? 60_000 : 5 * 60_000);

    // 다른 앱/탭에서 돌아오면 즉시 갱신 (임계값 없음)
    const onVisibility = () => {
      if (!document.hidden) doLoadRef.current();
    };
    // 데스크탑: 창 포커스 복귀 시에도 갱신
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
      {/* 추천주식 */}
      <section className="px-4 lg:px-0 pt-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5" style={{ color: "#d4af37" }} fill="#d4af37" />
            <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--text)" }}>
              {t.market.picks}
            </h2>
          </div>
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>{t.market.cioPicks}</span>
        </div>
        <div className="relative">
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

      {/* 주요 지수 */}
      <section className="px-4 lg:px-0 pt-6">
        <div className="flex items-center justify-between mb-3">
          <SectionInfo title={t.market.indices}>
            <p className="font-bold mb-1" style={{ color: "var(--mint)" }}>주요 지수란?</p>
            <p style={{ color: "var(--muted)" }}>미국 증시 전체 흐름을 나타내는 대표 지표예요.</p>
            <div className="mt-2 space-y-1">
              <p>📈 <b>S&P 500</b> — 미국 대형주 500개 평균. 미국 경제의 대표 지수</p>
              <p>💻 <b>NASDAQ</b> — 기술주 중심. 애플·구글·엔비디아 등 포함</p>
              <p>🏭 <b>DOW</b> — 미국 전통 대기업 30개 평균</p>
              <p>📦 <b>Russell 2000</b> — 중소형주 2000개. 미국 경기 선행 지표</p>
            </div>
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

      {/* S&P 500 섹터 히트맵 */}
      <section className="px-4 lg:px-0 pt-6">
        <SP500Heatmap />
      </section>

      {/* Futures 히트맵 */}
      <section className="px-4 lg:px-0 pt-6">
        <FuturesHeatmap items={futures} />
      </section>

      {/* 시장 종합 AI 분석 — S&P500 섹터 + Futures 데이터 기반 */}
      <MarketAISummary />
    </>
  );
}
