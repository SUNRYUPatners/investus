"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";

type LiveQ = { symbol: string; price: number; change: number; changePercent: number };

export function HomeAIInsight() {
  const { holdings, loaded, isLoggedIn } = usePortfolio();
  const [quotes,   setQuotes]   = useState<LiveQ[]>([]);
  const [usdkrw,   setUsdkrw]   = useState(1350);
  const [answer,   setAnswer]   = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);
  const [expanded, setExpanded] = useState(false);
  const fetchedAI = useRef(false);

  // Fetch live prices from market-data-cache only (YF v7 batch — same source as 추천주식/히트맵)
  useEffect(() => {
    if (!loaded || holdings.length === 0) return;
    const syms = holdings.map((h) => h.symbol);

    // Read from market-data-cache (same source as 추천주식/히트맵)
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

  // Auto-fetch AI analysis once prices are ready
  useEffect(() => {
    if (fetchedAI.current || quotes.length === 0 || holdings.length === 0) return;
    fetchedAI.current = true;

    const liveMap = Object.fromEntries(quotes.map((q) => [q.symbol, q]));
    const totalValue = holdings.reduce(
      (s, h) => s + h.shares * (liveMap[h.symbol]?.price ?? h.avgCost), 0
    );
    const totalCost = holdings.reduce((s, h) => s + h.shares * h.avgCost, 0);
    const totalPnlPct = totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;

    const enriched = holdings.map((h) => {
      const price        = liveMap[h.symbol]?.price ?? h.avgCost;
      const dayChangePct = liveMap[h.symbol]?.changePercent ?? 0;
      const value        = h.shares * price;
      const costBasis    = h.shares * h.avgCost;
      const pnlPct       = costBasis > 0 ? ((value - costBasis) / costBasis) * 100 : 0;
      const weightPct    = totalValue > 0 ? (value / totalValue) * 100 : 0;
      return { symbol: h.symbol, shares: h.shares, avgCost: h.avgCost, currentPrice: price, value, costBasis, pnlPct, dayChangePct, weightPct };
    });

    setLoading(true);
    fetch("/api/portfolio-ai", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        question: "오늘 내 포트폴리오 각 종목이 왜 올랐거나 내렸는지 분석해줘",
        holdings: enriched,
        totalValue,
        totalCost,
        totalPnlPct,
        usdkrw,
        fetchNews: true,
      }),
    })
      .then((r) => r.json())
      .then((d: { answer?: string }) => setAnswer(d.answer ?? null))
      .catch(() => {})
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotes.length]);

  if (!loaded || !isLoggedIn || holdings.length === 0) return null;

  return (
    <div className="px-4 lg:px-0 mt-3">
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--card)", borderColor: "rgba(0,229,160,0.2)" }}
      >
        {/* Header — always visible, tap to expand */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full px-4 py-3 flex items-center gap-2 active:opacity-70 transition-opacity"
          style={{ background: "rgba(0,229,160,0.03)" }}
        >
          <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: "var(--mint)" }} />
          <span
            className="text-sm font-bold font-syne flex-1 text-left"
            style={{ color: "var(--text)" }}
          >
            오늘 내 포트폴리오 등락 분석
          </span>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full mr-1"
            style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)" }}
          >
            Claude
          </span>
          {expanded
            ? <ChevronUp  className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
            : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
          }
        </button>

        {/* Collapsed: 2-line preview */}
        {!expanded && (loading || answer) && (
          <div className="px-4 pb-3 pt-0.5">
            {loading ? (
              <div className="flex gap-1.5 items-center py-1">
                {[0, 150, 300].map((d) => (
                  <div key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{ background: "var(--mint)", animationDelay: `${d}ms` }} />
                ))}
              </div>
            ) : answer ? (
              <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>
                {answer}
              </p>
            ) : null}
          </div>
        )}

        {/* Expanded: full answer */}
        {expanded && (
          <div className="px-4 pt-3 pb-4 border-t" style={{ borderColor: "rgba(0,229,160,0.1)" }}>
            {loading ? (
              <div className="flex gap-1.5 items-center py-2">
                {[0, 150, 300].map((d) => (
                  <div key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{ background: "var(--mint)", animationDelay: `${d}ms` }} />
                ))}
              </div>
            ) : answer ? (
              <p className="text-[12px] leading-relaxed whitespace-pre-line" style={{ color: "var(--text)" }}>
                {answer}
              </p>
            ) : null}
            <p className="text-[9px] text-center mt-3" style={{ color: "var(--muted)" }}>
              투자 참고용 · 투자 권유 아님
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
