"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { NYSE_HOLIDAYS, isMarketOpen } from "@/lib/marketHours";
import { useRouter } from "next/navigation";

type LiveQ = { symbol: string; price: number; change: number; changePercent: number };

const INTRADAY_LIMIT = 3;

/** YYYY-MM-DD of the most recent NYSE trading day that has already closed (≥ 16:00 ET) */
function lastMarketCloseDate(): string {
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

function todayET(): string {
  const et = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  return `${et.getFullYear()}-${String(et.getMonth() + 1).padStart(2, "0")}-${String(et.getDate()).padStart(2, "0")}`;
}

// ─── localStorage helpers ────────────────────────────────────────────────────
function intradayCountKey()              { return `home_ai_intra_${todayET()}`; }
function closeCacheKey(date: string)     { return `home_ai_close_${date}`; }

function readIntradayCount(): number     { try { return parseInt(localStorage.getItem(intradayCountKey()) ?? "0", 10); } catch { return 0; } }
function bumpIntradayCount(): number     { const n = readIntradayCount() + 1; try { localStorage.setItem(intradayCountKey(), String(n)); } catch { /* ignore */ } return n; }
function readCloseCache(date: string)    { try { return localStorage.getItem(closeCacheKey(date)) ?? null; } catch { return null; } }
function writeCloseCache(date: string, text: string) { try { localStorage.setItem(closeCacheKey(date), text); } catch { /* ignore */ } }

export function HomeAIInsight() {
  const router = useRouter();
  const { holdings, loaded, isLoggedIn } = usePortfolio();
  const [quotes,        setQuotes]        = useState<LiveQ[]>([]);
  const [usdkrw,        setUsdkrw]        = useState(1350);
  const [displayAnswer, setDisplayAnswer] = useState<string | null>(null);
  const [analysisDate,  setAnalysisDate]  = useState("");
  const [loading,       setLoading]       = useState(false);
  const [expanded,      setExpanded]      = useState(false);
  const [intradayUsed,  setIntradayUsed]  = useState(0);
  const [marketOpen,    setMarketOpen]    = useState(false);
  // tracks the trading day we last auto-fetched for
  const fetchedForDay = useRef("");

  // Init market status + poll every minute
  useEffect(() => {
    setMarketOpen(isMarketOpen());
    setIntradayUsed(readIntradayCount());

    const update = () => setMarketOpen(isMarketOpen());
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  // Sync prices from market-data-cache
  useEffect(() => {
    if (!loaded || holdings.length === 0) return;
    const syms = holdings.map((h) => h.symbol);

    const applyCache = () => {
      try {
        const raw = localStorage.getItem("market-data-cache");
        if (!raw) return;
        const d = JSON.parse(raw) as {
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
      } catch { /* ignore */ }
    };

    applyCache();
    const onStorage = (e: StorageEvent) => { if (e.key === "market-data-cache") applyCache(); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [loaded, holdings.length]);

  // Auto-fetch post-close: load cache first, only fetch if no cached result
  useEffect(() => {
    if (marketOpen) return;                            // still open — wait
    if (quotes.length === 0 || holdings.length === 0) return; // no price data yet
    const day = lastMarketCloseDate();
    if (fetchedForDay.current === day) return;         // already fetched this session
    fetchedForDay.current = day;

    // Use cached analysis if available (persists across page refreshes)
    const cached = readCloseCache(day);
    if (cached) {
      setDisplayAnswer(cached);
      setAnalysisDate(day);
      setExpanded(true);
      return;
    }

    // No cache — run fresh analysis and save result
    runAnalysis(false, day);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketOpen, quotes.length]);

  function buildPayload() {
    const liveMap   = Object.fromEntries(quotes.map((q) => [q.symbol, q]));
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
    return { holdings: enriched, totalValue, totalCost, totalPnlPct, usdkrw };
  }

  async function runAnalysis(isIntraday: boolean, closeDay?: string) {
    if (loading || holdings.length === 0 || quotes.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio-ai", {
        method:  "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          question: "오늘 내 포트폴리오 각 종목이 왜 올랐거나 내렸는지 분석해줘",
          ...buildPayload(),
          fetchNews: true,
        }),
      });
      const d = await res.json() as { answer?: string };
      const a = d.answer ?? null;
      if (a) {
        setDisplayAnswer(a);
        if (isIntraday) {
          const n = bumpIntradayCount();
          setIntradayUsed(n);
        } else {
          const day = closeDay ?? lastMarketCloseDate();
          setAnalysisDate(day);
          writeCloseCache(day, a); // 캐시 저장 — 새로고침해도 재분석 안 함
        }
        setExpanded(true);
      }
    } catch { /* ignore */ }
    finally   { setLoading(false); }
  }

  function handleRefresh() {
    if (intradayUsed >= INTRADAY_LIMIT) return;
    runAnalysis(true);
  }

  if (!loaded || !isLoggedIn || holdings.length === 0) return null;

  const remaining = INTRADAY_LIMIT - intradayUsed;
  const limitReached = marketOpen && intradayUsed >= INTRADAY_LIMIT;

  return (
    <div className="px-4 lg:px-0 mt-3">
      <div className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--card)", borderColor: "rgba(0,229,160,0.2)" }}>

        {/* Header */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full px-4 py-3 flex items-center gap-2 active:opacity-70 transition-opacity"
          style={{ background: "rgba(0,229,160,0.03)" }}
        >
          <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: "var(--mint)" }} />
          <div className="flex-1 text-left min-w-0">
            <span className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>
              {marketOpen ? "장중 포트폴리오 분석" : "오늘 포트폴리오 등락 분석"}
            </span>
            {!marketOpen && analysisDate && (
              <span className="block text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
                {analysisDate.slice(5, 7)}/{analysisDate.slice(8, 10)} 장마감 기준
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full mr-1 flex-shrink-0"
            style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)" }}>Claude</span>
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
            ) : displayAnswer ? (
              <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>
                {displayAnswer}
              </p>
            ) : null}
          </div>
        )}

        {/* Expanded */}
        {expanded && (
          <div className="border-t" style={{ borderColor: "rgba(0,229,160,0.1)" }}>
            <div className="px-4 pt-3 pb-3">
              {loading ? (
                <div className="flex gap-1.5 items-center py-2">
                  {[0, 150, 300].map((d) => (
                    <div key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: "var(--mint)", animationDelay: `${d}ms` }} />
                  ))}
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

            {/* 장중 재분석 버튼 — only during market hours */}
            {marketOpen && (
              <div className="px-4 pb-4 border-t pt-3" style={{ borderColor: "rgba(0,229,160,0.06)" }}>
                {limitReached ? (
                  <div className="rounded-xl p-3 flex flex-col items-center gap-2 text-center"
                    style={{ background: "rgba(0,229,160,0.04)", border: "1px solid rgba(0,229,160,0.12)" }}>
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
                    style={{ background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.18)" }}>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5" style={{ color: "var(--mint)" }} />
                      <span className="text-[12px] font-bold" style={{ color: "var(--mint)" }}>
                        지금 다시 분석
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)" }}>
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
