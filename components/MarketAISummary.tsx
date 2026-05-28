"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { NYSE_HOLIDAYS, isMarketOpen } from "@/lib/marketHours";

function lastTradingDay(): string {
  const now  = new Date();
  const et   = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
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

const LS_KEY = () => `market-ai-summary-${lastTradingDay()}`;

export function MarketAISummary() {
  const [summary,   setSummary]   = useState<string | null>(null);
  const [loading,   setLoading]   = useState(false);
  const [expanded,  setExpanded]  = useState(false);
  const [date,      setDate]      = useState("");
  const fetched = useRef(false);

  // localStorage에서 즉시 복원
  useEffect(() => {
    try {
      const cached = localStorage.getItem(LS_KEY());
      if (cached) { setSummary(cached); setDate(lastTradingDay()); }
    } catch { /* ignore */ }
  }, []);

  // 장마감 후 자동 fetch (캐시 없을 때)
  useEffect(() => {
    if (fetched.current) return;
    if (isMarketOpen()) return;                    // 장중에는 스킵
    try { if (localStorage.getItem(LS_KEY())) return; } catch { /* ignore */ }
    fetched.current = true;
    fetchSummary();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchSummary() {
    if (loading) return;
    setLoading(true);
    try {
      const res  = await fetch("/api/market-summary");
      if (!res.ok) return;
      const d    = await res.json() as { summary?: string; date?: string };
      if (d.summary) {
        setSummary(d.summary);
        setDate(d.date ?? "");
        try { localStorage.setItem(LS_KEY(), d.summary); } catch { /* ignore */ }
      }
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }

  // 아무것도 없으면 렌더링 안 함
  if (!loading && !summary) return null;

  const dateLabel = date ? `${date.slice(5, 7)}/${date.slice(8, 10)} 장마감 기준` : "장마감 기준";

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
            시장 종합 분석
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full mr-1"
            style={{ background: "rgba(99,179,237,0.15)", color: "#63b3ed" }}>
            Claude
          </span>
          {expanded
            ? <ChevronUp   className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
            : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />}
        </button>

        {/* 접힌 상태: 미리보기 1줄 */}
        {!expanded && (loading || summary) && (
          <div className="px-4 pb-3 pt-0.5">
            {loading ? (
              <div className="flex gap-1.5 items-center py-1">
                {[0, 150, 300].map((d) => (
                  <div key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{ background: "#63b3ed", animationDelay: `${d}ms` }} />
                ))}
              </div>
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
                <div className="flex gap-1.5 items-center py-2">
                  {[0, 150, 300].map((d) => (
                    <div key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: "#63b3ed", animationDelay: `${d}ms` }} />
                  ))}
                </div>
              ) : summary ? (
                <p className="text-[12px] leading-relaxed whitespace-pre-line" style={{ color: "var(--text)" }}>
                  {summary}
                </p>
              ) : null}
            </div>
            <p className="text-[9px] text-center pb-3" style={{ color: "var(--muted)" }}>
              {dateLabel} · S&P500 섹터 + 주요 선물 데이터 기반 · 투자 권유 아님
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
