"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { useMarketPortfolio } from "@/hooks/useMarketPortfolio";
import { NYSE_HOLIDAYS, isMarketOpen } from "@/lib/marketHours";
import { isMarketSessionOpen } from "@/lib/markets/hours";
import { getMarketConfig } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";
import { marketHref } from "@/lib/markets/marketPath";
import { useRouter } from "next/navigation";

type LiveQ = { symbol: string; price: number; change: number; changePercent: number };
type MacroIndex = { symbol: string; value: number; changePercent?: number };
type MacroFuture = { symbol: string; name: string; price?: number; changePercent: number; group?: string };

const INTRADAY_LIMIT = 3;

/** YYYY-MM-DD of the most recent NYSE trading day that has already closed (≥ 16:00 ET) */
function lastMarketCloseDate(market: MarketId): string {
  if (market !== "us") {
    const cfg = getMarketConfig(market);
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: cfg.timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    const y = parts.find((p) => p.type === "year")?.value ?? "2026";
    const m = parts.find((p) => p.type === "month")?.value ?? "01";
    const d = parts.find((p) => p.type === "day")?.value ?? "01";
    return `${y}-${m}-${d}`;
  }
  const now  = new Date();
  const etNow = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const pastCloseToday = etNow.getHours() * 60 + etNow.getMinutes() >= 16 * 60;

  for (let back = 0; back < 10; back++) {
    const d   = new Date(etNow);
    d.setDate(d.getDate() - back);
    const dow = d.getDay();
    const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (dow === 0 || dow === 6 || NYSE_HOLIDAYS.has(str)) continue;
    if (back > 0 || pastCloseToday) return str;
  }
  return new Date().toISOString().slice(0, 10);
}

function todayET(market: MarketId): string {
  if (market !== "us") {
    return lastMarketCloseDate(market);
  }
  const et = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  return `${et.getFullYear()}-${String(et.getMonth() + 1).padStart(2, "0")}-${String(et.getDate()).padStart(2, "0")}`;
}

// ─── localStorage helpers ────────────────────────────────────────────────────
function intradayCountKey(market: MarketId)              { return `home_ai_intra_${market}_${todayET(market)}`; }
function closeCacheKey(market: MarketId, date: string)     { return `home_ai_close_${market}_${date}`; }
function closeRetryKey(market: MarketId, date: string)     { return `home_ai_close_retry_${market}_${date}`; }

function readIntradayCount(market: MarketId): number     { try { return parseInt(localStorage.getItem(intradayCountKey(market)) ?? "0", 10); } catch { return 0; } }
function bumpIntradayCount(market: MarketId): number     { const n = readIntradayCount(market) + 1; try { localStorage.setItem(intradayCountKey(market), String(n)); } catch { /* ignore */ } return n; }
function readCloseCache(market: MarketId, date: string)    { try { return localStorage.getItem(closeCacheKey(market, date)) ?? null; } catch { return null; } }
function writeCloseCache(market: MarketId, date: string, text: string) { try { localStorage.setItem(closeCacheKey(market, date), text); } catch { /* ignore */ } }
function readCloseRetryUsed(market: MarketId, date: string): boolean { try { return localStorage.getItem(closeRetryKey(market, date)) === "1"; } catch { return false; } }
function markCloseRetryUsed(market: MarketId, date: string) { try { localStorage.setItem(closeRetryKey(market, date), "1"); } catch { /* ignore */ } }

function readMacroSnapshot(cacheKey: string): { indices: MacroIndex[]; futures: MacroFuture[] } {
  try {
    const raw = localStorage.getItem(cacheKey);
    if (!raw) return { indices: [], futures: [] };
    const d = JSON.parse(raw) as {
      indices?: MacroIndex[];
      futures?: MacroFuture[];
    };
    return {
      indices: Array.isArray(d.indices) ? d.indices : [],
      futures: Array.isArray(d.futures) ? d.futures : [],
    };
  } catch {
    return { indices: [], futures: [] };
  }
}

export function HomeAIInsight({ market = "us" }: { market?: MarketId }) {
  const router = useRouter();
  const cfg = getMarketConfig(market);
  const cacheKey = cfg.marketCacheKey;
  const { holdings, loaded } = useMarketPortfolio(market);
  const [quotes,        setQuotes]        = useState<LiveQ[]>([]);
  const [usdkrw,        setUsdkrw]        = useState(1350);
  const [displayAnswer, setDisplayAnswer] = useState<string | null>(null);
  const [analysisDate,  setAnalysisDate]  = useState("");
  const [loading,       setLoading]       = useState(false);
  const [expanded,      setExpanded]      = useState(false);
  const [intradayUsed,    setIntradayUsed]    = useState(0);
  const [marketOpen,      setMarketOpen]      = useState(false);
  const [closeRetryUsed,  setCloseRetryUsed]  = useState(false);
  // true once LiveMarket writes fresh data (StorageEvent) OR cache is < 10 min old on mount
  const [pricesFresh,     setPricesFresh]     = useState(false);
  // tracks the trading day we last auto-fetched for
  const fetchedForDay  = useRef("");
  const analysisTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Init market status + poll every minute
  useEffect(() => {
    const open = market === "us" ? isMarketOpen() : isMarketSessionOpen(market);
    setMarketOpen(open);
    setIntradayUsed(readIntradayCount(market));

    const update = () => setMarketOpen(market === "us" ? isMarketOpen() : isMarketSessionOpen(market));
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [market]);

  // Sync prices from market-data-cache
  useEffect(() => {
    if (!loaded || holdings.length === 0) return;
    const syms = holdings.map((h) => h.symbol);

    const applyCache = (fromEvent: boolean) => {
      try {
        const raw = localStorage.getItem(cacheKey);
        if (!raw) return;
        const d = JSON.parse(raw) as {
          _ts?:    number;
          quotes?:  { symbol: string; price: number; change?: number; changePercent: number }[];
          indices?: { symbol: string; value: number }[];
        };
        const map = new Map((d.quotes ?? []).map((q) => [q.symbol, q]));
        const matched = syms.filter((s) => map.has(s) && (map.get(s)!.price > 0));
        if (matched.length > 0) {
          setQuotes(matched.map((s) => ({ symbol: s, price: map.get(s)!.price, change: map.get(s)!.change ?? 0, changePercent: map.get(s)!.changePercent })));
        }
        const krw = (d.indices ?? []).find((i) => i.symbol === "USDKRW");
        if (krw && krw.value > 100) setUsdkrw(krw.value);
        // Mark prices as fresh: StorageEvent means LiveMarket just fetched, OR cache is < 10 min old
        const cacheAgeMs = Date.now() - (d._ts ?? 0);
        if (fromEvent || cacheAgeMs < 10 * 60 * 1000) setPricesFresh(true);
      } catch { /* ignore */ }
    };

    applyCache(false);
    const onStorage = (e: StorageEvent) => { if (e.key === cacheKey) applyCache(true); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [loaded, holdings.length, cacheKey]);

  // Auto-fetch post-close: wait for fresh prices + ALL holdings priced, then debounce 2s
  useEffect(() => {
    if (!pricesFresh) return;                                        // wait for LiveMarket to push latest close prices
    if (marketOpen) return;                                          // still open — wait
    if (quotes.length === 0 || holdings.length === 0) return;       // no data yet
    if (quotes.length < holdings.length) return;                    // not all holdings priced yet

    const day = lastMarketCloseDate(market);

    const cached = readCloseCache(market, day);
    if (cached) {
      setDisplayAnswer(cached);
      setAnalysisDate(day);
      setCloseRetryUsed(readCloseRetryUsed(market, day));
      setExpanded(true);
      return;
    }

    if (fetchedForDay.current === day) return;                      // already fetched this session

    // Debounce: prices may still be settling — wait 2s after all holdings are priced
    if (analysisTimer.current) clearTimeout(analysisTimer.current);
    analysisTimer.current = setTimeout(() => {
      if (fetchedForDay.current === day) return;
      fetchedForDay.current = day;
      runAnalysis(false, day);
    }, 2000);
    return () => {
      if (analysisTimer.current) clearTimeout(analysisTimer.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricesFresh, marketOpen, quotes.length, holdings.length, market]);

  function buildPayload() {
    const liveMap   = Object.fromEntries(quotes.map((q) => [q.symbol, q]));
    const macro = readMacroSnapshot(cacheKey);
    const totalValue = holdings.reduce((s, h) => s + h.shares * (liveMap[h.symbol]?.price ?? h.avgCost), 0);
    const totalCost  = holdings.reduce((s, h) => s + h.shares * h.avgCost, 0);
    const totalPnlPct = totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;
    const enriched = holdings.map((h) => {
      const price = liveMap[h.symbol]?.price ?? h.avgCost;
      const dayChangePct = liveMap[h.symbol]?.changePercent ?? 0;
      const value = h.shares * price;
      const costBasis = h.shares * h.avgCost;
      const pnlPct = costBasis > 0 ? ((value - costBasis) / costBasis) * 100 : 0;
      const weightPct = totalValue > 0 ? (value / totalValue) * 100 : 0;
      return { symbol: h.symbol, shares: h.shares, avgCost: h.avgCost, currentPrice: price, value, costBasis, pnlPct, dayChangePct, weightPct };
    });
    return { holdings: enriched, totalValue, totalCost, totalPnlPct, usdkrw, macro };
  }

  async function runAnalysis(isIntraday: boolean, closeDay?: string, isCloseRetry = false) {
    if (loading || holdings.length === 0 || quotes.length === 0) return;
    setLoading(true);
    setDisplayAnswer(null);
    try {
      const res = await fetch("/api/portfolio-ai", {
        method:  "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          question: market === "us"
            ? "오늘 내 포트폴리오 각 종목이 왜 올랐거나 내렸는지, 그리고 Futures Map 기준 매크로 환경이 내 종목들에 어떤 영향을 줬는지 같이 분석해줘"
            : `${cfg.labelKo} 포트폴리오 기준으로 오늘 각 보유 자산이 왜 올랐거나 내렸는지, 해당 시장 매크로·뉴스 맥락과 함께 분석해줘`,
          market,
          ...buildPayload(),
          fetchNews: true,
        }),
      });
      const d = await res.json() as { answer?: string; error?: string };
      // 에러 응답이면 캐시하지 않고 null 유지
      if (d.error || !d.answer || d.answer.length < 30) {
        if (!isIntraday) fetchedForDay.current = ""; // allow retry on next refresh
        setDisplayAnswer("__error__");
        setExpanded(true);
        return;
      }
      const a = d.answer;
      setDisplayAnswer(a);
      if (isIntraday) {
        const n = bumpIntradayCount(market);
        setIntradayUsed(n);
      } else {
        const day = closeDay ?? lastMarketCloseDate(market);
        setAnalysisDate(day);
        writeCloseCache(market, day, a);
        if (isCloseRetry) {
          markCloseRetryUsed(market, day);
          setCloseRetryUsed(true);
        }
      }
      setExpanded(true);
    } catch {
      if (!isIntraday) fetchedForDay.current = ""; // allow retry on next refresh
      setDisplayAnswer("__error__");
      setExpanded(true);
    } finally {
      setLoading(false);
    }
  }

  function handleRefresh() {
    if (intradayUsed >= INTRADAY_LIMIT) return;
    runAnalysis(true);
  }

  if (!loaded) return null;

  if (holdings.length === 0) {
    return (
      <div className="px-4 lg:px-0 mt-3">
        <button
          type="button"
          onClick={() => router.push(marketHref(market, "portfolio"))}
          className="w-full rounded-2xl border p-4 text-left transition-opacity active:opacity-80"
          style={{ background: "var(--card)", borderColor: "rgba(var(--mint-rgb),0.2)" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: "var(--mint)" }} />
            <span className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>
              {cfg.labelKo} 포트폴리오 분석
            </span>
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
            보유 종목을 등록하면 이 시장 기준으로 AI 등락 분석을 받을 수 있습니다. 미국 시장 데이터와는 분리됩니다.
          </p>
          <p className="text-[11px] font-semibold mt-2" style={{ color: "var(--mint)" }}>
            포트폴리오 등록하기 →
          </p>
        </button>
      </div>
    );
  }

  const remaining = INTRADAY_LIMIT - intradayUsed;
  const limitReached = marketOpen && intradayUsed >= INTRADAY_LIMIT;

  return (
    <div className="px-4 lg:px-0 mt-3">
      <div className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--card)", borderColor: "rgba(var(--mint-rgb),0.2)" }}>

        {/* Header */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full px-4 py-3 flex items-center gap-2 active:opacity-70 transition-opacity"
          style={{ background: "rgba(var(--mint-rgb),0.03)" }}
        >
          <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: "var(--mint)" }} />
          <div className="flex-1 text-left min-w-0">
            <span className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>
              {marketOpen ? `${cfg.labelKo} 장중 분석` : `${cfg.labelKo} 등락 분석`}
            </span>
            {!marketOpen && analysisDate && (
              <span className="block text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
                {analysisDate.slice(5, 7)}/{analysisDate.slice(8, 10)} 장마감 기준
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full mr-1 flex-shrink-0"
            style={{ background: "rgba(var(--mint-rgb),0.15)", color: "var(--mint)" }}>Claude</span>
          {expanded
            ? <ChevronUp   className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
            : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />}
        </button>

        {/* Collapsed preview (2 lines) */}
        {!expanded && (loading || displayAnswer) && (
          <div className="px-4 pb-3 pt-0.5 cursor-pointer" onClick={() => setExpanded(true)}>
            {loading ? (
              <div className="flex gap-1.5 items-center py-1">
                {[0, 150, 300].map((d) => (
                  <div key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{ background: "var(--mint)", animationDelay: `${d}ms` }} />
                ))}
              </div>
            ) : displayAnswer && displayAnswer !== "__error__" ? (
              <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>
                {displayAnswer}
              </p>
            ) : null}
          </div>
        )}

        {/* Expanded */}
        {expanded && (
          <div className="border-t" style={{ borderColor: "rgba(var(--mint-rgb),0.1)" }}>
            <div className="px-4 pt-3 pb-3">
              {loading ? (
                <div className="flex gap-1.5 items-center py-2">
                  {[0, 150, 300].map((d) => (
                    <div key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: "var(--mint)", animationDelay: `${d}ms` }} />
                  ))}
                </div>
              ) : displayAnswer === "__error__" ? (
                <div className="flex items-center justify-between py-1">
                  <p className="text-[12px]" style={{ color: "var(--muted)" }}>분석 중 오류가 발생했어요.</p>
                  <button onClick={() => runAnalysis(false, lastMarketCloseDate(market))}
                    className="text-[11px] font-bold px-3 py-1 rounded-lg"
                    style={{ background: "rgba(var(--mint-rgb),0.12)", color: "var(--mint)" }}>
                    다시 시도
                  </button>
                </div>
              ) : displayAnswer ? (
                <p className="text-[12px] leading-relaxed whitespace-pre-line" style={{ color: "var(--text)" }}>
                  {displayAnswer}
                </p>
              ) : (
                <p className="text-[12px]" style={{ color: "var(--muted)" }}>
                  {marketOpen ? "아래 버튼으로 지금 분석해보세요." : "잠시 후 분석 결과가 나타납니다."}
                </p>
              )}
            </div>

            {/* 장마감 후 1회 재분석 버튼 — 가격 로딩 타이밍 오류 보정용 */}
            {!marketOpen && !loading && displayAnswer && displayAnswer !== "__error__" && !closeRetryUsed && (
              <div className="px-4 pb-3 border-t pt-2.5" style={{ borderColor: "rgba(var(--mint-rgb),0.06)" }}>
                <button
                  onClick={() => {
                    const day = lastMarketCloseDate(market);
                    writeCloseCache(market, day, "");
                    try { localStorage.removeItem(closeCacheKey(market, day)); } catch { /* ignore */ }
                    fetchedForDay.current = "";
                    runAnalysis(false, lastMarketCloseDate(market), true);
                  }}
                  disabled={loading}
                  className="w-full flex items-center justify-between rounded-xl px-3.5 py-2 transition-opacity active:opacity-60 disabled:opacity-40"
                  style={{ background: "rgba(var(--mint-rgb),0.06)", border: "1px solid rgba(var(--mint-rgb),0.12)" }}>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-3 h-3" style={{ color: "var(--muted)" }} />
                    <span className="text-[11px]" style={{ color: "var(--muted)" }}>
                      가격이 달랐나요? 다시 분석
                    </span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.05)", color: "var(--muted)" }}>
                    1회 제공
                  </span>
                </button>
              </div>
            )}

            {/* 장중 재분석 버튼 — only during market hours */}
            {marketOpen && (
              <div className="px-4 pb-4 border-t pt-3" style={{ borderColor: "rgba(var(--mint-rgb),0.06)" }}>
                {limitReached ? (
                  <div className="rounded-xl p-3 flex flex-col items-center gap-2 text-center"
                    style={{ background: "rgba(var(--mint-rgb),0.04)", border: "1px solid rgba(var(--mint-rgb),0.12)" }}>
                    <p className="text-[11px] font-bold" style={{ color: "var(--text)" }}>
                      오늘 무료 장중 분석 {INTRADAY_LIMIT}회 소진
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--muted)" }}>
                      장마감 후 자동 분석은 무제한 무료예요 · 지금 더 분석하려면 구독을 업그레이드해요
                    </p>
                    <button
                      onClick={() => router.push("/more")}
                      className="px-4 py-1.5 rounded-xl text-[11px] font-bold text-black mt-0.5"
                      style={{ background: "var(--mint)" }}>
                      구독 알아보기
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-opacity active:opacity-60 disabled:opacity-40"
                    style={{ background: "rgba(var(--mint-rgb),0.08)", border: "1px solid rgba(var(--mint-rgb),0.18)" }}>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5" style={{ color: "var(--mint)" }} />
                      <span className="text-[12px] font-bold" style={{ color: "var(--mint)" }}>
                        지금 다시 분석
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(var(--mint-rgb),0.15)", color: "var(--mint)" }}>
                      오늘 {remaining}/{INTRADAY_LIMIT}회 남음
                    </span>
                  </button>
                )}
              </div>
            )}

            <p className="text-[9px] text-center pb-3" style={{ color: "var(--muted)" }}>
              투자 참고용 · 투자 권유 아님
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
