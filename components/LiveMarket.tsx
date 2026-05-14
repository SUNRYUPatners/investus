"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { IndexCard } from "./IndexCard";
import { StockCard } from "./StockCard";
import { FuturesHeatmap } from "./FuturesHeatmap";
import type { IndexQuote, Quote, FutureItem } from "@/lib/api";
import { RECOMMENDED_SYMBOLS } from "@/lib/api";
import { useLocale } from "@/contexts/LocaleContext";

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
  const t = useLocale();
  const [data, setData]       = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);

  const doLoad = (isRetry = false) => {
    if (isRetry) { setFetchFailed(false); setLoading(true); }

    // 15초 타임아웃
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), 15_000);

    fetch("/api/market-data", { signal: controller.signal })
      .then((r) => { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then((d: MarketData) => {
        clearTimeout(timeout);
        // 최소한 하나라도 있으면 표시 (부분 데이터 허용)
        const hasData = (d?.quotes?.length ?? 0) > 0 || (d?.indices?.length ?? 0) > 0;
        if (!hasData) throw new Error("empty");
        setData(d);
        setLoading(false);
        setFetchFailed(false);
        try {
          // quotes가 있는 경우만 localStorage에 저장
          if ((d?.quotes?.length ?? 0) > 0) {
            localStorage.setItem("market-data-cache", JSON.stringify(d));
            window.dispatchEvent(new StorageEvent("storage", { key: "market-data-cache" }));
          }
        } catch { /* ignore */ }
      })
      .catch((e: unknown) => {
        clearTimeout(timeout);
        // 캐시 데이터가 이미 표시 중이면 에러 숨김, 없으면 retry 버튼 표시
        setData((prev) => {
          if (!prev) {
            // abort(타임아웃)이면 재시도 유도, 그 외 에러도 동일
            const isAbort = e instanceof DOMException && e.name === "AbortError";
            if (isAbort || true) setFetchFailed(true);
            setLoading(false);
          }
          return prev;
        });
      });
  };

  useEffect(() => {
    // 이전 캐시를 즉시 표시 — 시크릿 모드에서도 skeleton 최소화
    try {
      const cached = localStorage.getItem("market-data-cache");
      if (cached) {
        const parsed = JSON.parse(cached) as MarketData;
        if ((parsed?.quotes?.length ?? 0) > 0 || (parsed?.indices?.length ?? 0) > 0) {
          setData(parsed);
          setLoading(false);
        }
      }
    } catch { /* ignore */ }

    doLoad();

    // 60초마다 체크 — 장 중일 때만 실제 API 호출
    // (마운트 시점이 아닌 인터벌 실행 시점에 장 여부를 판단해야
    //  장 시작 전 켜놔도 개장 후 자동 갱신됨)
    const id = setInterval(() => {
      if (isMarketOpen()) doLoad();
    }, 60_000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const indices     = data?.indices ?? [];
  const quotes      = data?.quotes  ?? [];
  const futures     = data?.futures ?? [];
  const recommended = quotes.filter((q) => RECOMMENDED_SYMBOLS.includes(q.symbol));

  // 로딩 실패 시 — 캐시도 없는 경우 재시도 UI
  if (fetchFailed && !data) {
    return (
      <section className="px-4 lg:px-0 pt-8 flex flex-col items-center gap-3">
        <p className="text-sm" style={{ color: "var(--muted)" }}>{t.market.loadFailed}</p>
        <button
          onClick={() => doLoad(true)}
          className="text-xs px-4 py-2 rounded-xl font-semibold"
          style={{ background: "rgba(0,229,160,0.1)", color: "var(--mint)" }}
        >
          {t.market.retry}
        </button>
      </section>
    );
  }

  return (
    <>
      {/* 추천주식 */}
      <section className="px-4 lg:px-0 pt-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5" style={{ color: "var(--mint)" }} fill="var(--mint)" />
            <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--text)" }}>
              {t.market.picks}
            </h2>
          </div>
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>{t.market.cioPicks}</span>
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
            {t.market.popular}
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
            {t.market.indices}
          </h2>
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>{t.market.liveEst}</span>
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
