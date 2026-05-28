"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { NYSE_HOLIDAYS, isMarketOpen } from "@/lib/marketHours";
import { useLocale } from "@/contexts/LocaleContext";

const INTRADAY_LIMIT = 3;

function lastTradingDay(): string {
  const now = new Date();
  const et  = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const pastClose = et.getHours() * 60 + et.getMinutes() >= 16 * 60;
  for (let back = 0; back < 7; back++) {
    const d   = new Date(et);
    d.setDate(d.getDate() - back);
    const dow = d.getDay();
    const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (dow === 0 || dow === 6 || NYSE_HOLIDAYS.has(str)) continue;
    if (back > 0 || pastClose) return str;
  }
  return et.toISOString().slice(0, 10);
}

function todayET(): string {
  const et = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  return `${et.getFullYear()}-${String(et.getMonth() + 1).padStart(2, "0")}-${String(et.getDate()).padStart(2, "0")}`;
}

const CLOSE_KEY   = () => `market-ai-summary-${lastTradingDay()}`;
const INTRA_KEY   = () => `market-ai-intra-${todayET()}`;

function readCloseCache():    string | null { try { return localStorage.getItem(CLOSE_KEY());                           } catch { return null; } }
function writeCloseCache(v:   string)       { try { localStorage.setItem(CLOSE_KEY(), v);                              } catch { /* ignore */ } }
function readIntradayCount(): number        { try { return parseInt(localStorage.getItem(INTRA_KEY()) ?? "0", 10);     } catch { return 0; } }
function bumpIntradayCount(): number        { const n = readIntradayCount() + 1; try { localStorage.setItem(INTRA_KEY(), String(n)); } catch { /* ignore */ } return n; }

export function MarketAISummary() {
  const t = useLocale();
  const [summary,      setSummary]      = useState<string | null>(null);
  const [loading,      setLoading]      = useState(false);
  const [expanded,     setExpanded]     = useState(false);
  const [date,         setDate]         = useState("");
  const [marketOpen,   setMarketOpen]   = useState(false);
  const [intradayUsed, setIntradayUsed] = useState(0);
  // tracks the trading day we last fetched for (prevents duplicate calls)
  const fetchedForDay = useRef("");

  // Init from localStorage + poll market status every minute
  useEffect(() => {
    const cached = readCloseCache();
    if (cached) { setSummary(cached); setDate(lastTradingDay()); }
    setIntradayUsed(readIntradayCount());

    const update = () => setMarketOpen(isMarketOpen());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  // Auto-fetch post-close: triggers when marketOpen transitions false (or on mount if already closed)
  useEffect(() => {
    if (marketOpen) return;                            // still open — wait
    const day = lastTradingDay();
    if (fetchedForDay.current === day) return;         // already fetched for this close
    if (readCloseCache()) {                            // fresh localStorage cache exists
      setSummary(readCloseCache()!);
      setDate(day);
      fetchedForDay.current = day;
      return;
    }
    fetchedForDay.current = day;
    doFetch(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketOpen]);

  async function doFetch(intraday: boolean) {
    if (loading) return;
    setLoading(true);
    try {
      // Always force=1: bypasses stale Redis cache (intraday or post-close)
      const res = await fetch("/api/market-summary?force=1");
      if (!res.ok) return;
      const d = await res.json() as { summary?: string; date?: string };
      if (!d.summary) return;
      setSummary(d.summary);
      setDate(d.date ?? "");
      if (intraday) {
        const n = bumpIntradayCount();
        setIntradayUsed(n);
      } else {
        writeCloseCache(d.summary);
      }
      setExpanded(true);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }

  function handleRefresh() {
    if (intradayUsed >= INTRADAY_LIMIT || loading) return;
    doFetch(true);
  }

  if (!loading && !summary) return null;

  const remaining    = INTRADAY_LIMIT - intradayUsed;
  const limitReached = marketOpen && intradayUsed >= INTRADAY_LIMIT;
  const ms = t.marketSummary;
  const dateLabel    = date
    ? marketOpen
      ? `${date.slice(5, 7)}/${date.slice(8, 10)} ${ms.intraLive}`
      : `${date.slice(5, 7)}/${date.slice(8, 10)} ${ms.intraClosed}`
    : ms.fallback;

  return (
    <div className="mt-4 px-4 lg:px-0">
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--card)", borderColor: "rgba(99,179,237,0.2)" }}
      >
        {/* Header */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full px-4 py-3 flex items-center gap-2 active:opacity-70 transition-opacity"
          style={{ background: "rgba(99,179,237,0.04)" }}
        >
          <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: "#63b3ed" }} />
          <span className="text-sm font-bold font-syne flex-1 text-left" style={{ color: "var(--text)" }}>
            {marketOpen ? ms.titleOpen : ms.titleClosed}
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full mr-1"
            style={{ background: "rgba(99,179,237,0.15)", color: "#63b3ed" }}>
            Claude
          </span>
          {expanded
            ? <ChevronUp   className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
            : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />}
        </button>

        {/* 접힌 상태: 미리보기 */}
        {!expanded && (loading || summary) && (
          <div className="px-4 pb-3 pt-0.5">
            {loading ? (
              <Dots color="#63b3ed" />
            ) : summary ? (
              <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>
                {summary}
              </p>
            ) : null}
          </div>
        )}

        {/* 펼친 상태 */}
        {expanded && (
          <div className="border-t" style={{ borderColor: "rgba(99,179,237,0.1)" }}>
            <div className="px-4 pt-3 pb-2">
              {loading ? (
                <Dots color="#63b3ed" />
              ) : summary ? (
                <p className="text-[12px] leading-relaxed whitespace-pre-line" style={{ color: "var(--text)" }}>
                  {summary}
                </p>
              ) : null}
            </div>

            {/* 장중 재분석 버튼 */}
            {marketOpen && (
              <div className="px-4 pb-4 border-t pt-3" style={{ borderColor: "rgba(99,179,237,0.06)" }}>
                {limitReached ? (
                  <div className="rounded-xl p-3 flex flex-col items-center gap-1.5 text-center"
                    style={{ background: "rgba(99,179,237,0.04)", border: "1px solid rgba(99,179,237,0.12)" }}>
                    <p className="text-[11px] font-bold" style={{ color: "var(--text)" }}>
                      {ms.limitTitle(INTRADAY_LIMIT)}
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--muted)" }}>
                      {ms.limitDesc}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-opacity active:opacity-60 disabled:opacity-40"
                    style={{ background: "rgba(99,179,237,0.08)", border: "1px solid rgba(99,179,237,0.18)" }}
                  >
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5" style={{ color: "#63b3ed" }} />
                      <span className="text-[12px] font-bold" style={{ color: "#63b3ed" }}>
                        {ms.refresh}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(99,179,237,0.15)", color: "#63b3ed" }}>
                      {ms.remaining(remaining, INTRADAY_LIMIT)}
                    </span>
                  </button>
                )}
              </div>
            )}

            <p className="text-[9px] text-center pb-3" style={{ color: "var(--muted)" }}>
              {dateLabel} · {ms.disclaimer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Dots({ color }: { color: string }) {
  return (
    <div className="flex gap-1.5 items-center py-1">
      {[0, 150, 300].map((d) => (
        <div key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{ background: color, animationDelay: `${d}ms` }} />
      ))}
    </div>
  );
}
