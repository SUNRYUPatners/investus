"use client";

import { useEffect, useMemo, useState } from "react";
import type { Quote } from "@/lib/api";
import { getMarketConfig } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";

type Holding = { symbol: string; shares: number; avgCost: number };

export function MarketPortfolioStub({ market }: { market: MarketId }) {
  const cfg = getMarketConfig(market);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(cfg.portfolioKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Holding[];
        if (Array.isArray(parsed)) setHoldings(parsed);
      } else if (market === "kr") {
        // seed demo holdings for preview
        const demo: Holding[] = [
          { symbol: "005930.KS", shares: 10, avgCost: 70000 },
          { symbol: "000660.KS", shares: 5, avgCost: 180000 },
        ];
        localStorage.setItem(cfg.portfolioKey, JSON.stringify(demo));
        setHoldings(demo);
      } else if (market === "safe") {
        const demo: Holding[] = [
          { symbol: "BTC-USD", shares: 0.05, avgCost: 60000 },
          { symbol: "GC=F", shares: 1, avgCost: 2300 },
        ];
        localStorage.setItem(cfg.portfolioKey, JSON.stringify(demo));
        setHoldings(demo);
      }
    } catch { /* ignore */ }

    const url = market === "us" ? "/api/market-data" : `/api/market-data?market=${market}`;
    fetch(url)
      .then((r) => r.json())
      .then((d: { quotes?: Quote[] }) => setQuotes(d.quotes ?? []))
      .catch(() => {});
  }, [market, cfg.portfolioKey]);

  const rows = useMemo(() => {
    return holdings.map((h) => {
      const q = quotes.find((x) => x.symbol === h.symbol);
      const price = q?.price ?? h.avgCost;
      const pnlPct = h.avgCost > 0 ? ((price - h.avgCost) / h.avgCost) * 100 : 0;
      const name = q?.name ?? h.symbol;
      return { ...h, price, pnlPct, name, changePercent: q?.changePercent ?? 0 };
    });
  }, [holdings, quotes]);

  if (rows.length === 0) return null;

  const dayMove =
    rows.reduce((acc, r) => acc + r.changePercent * r.shares * r.price, 0) /
    Math.max(1, rows.reduce((acc, r) => acc + r.shares * r.price, 0));

  return (
    <section className="px-4 lg:px-0 pt-3 space-y-2">
      <div
        className="rounded-2xl border p-4"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>
          내 포트폴리오 ({cfg.labelKo})
        </p>
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.symbol} className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{r.name}</p>
                <p className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>{r.symbol}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-semibold" style={{ color: "var(--text)" }}>
                  {r.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
                <p
                  className="text-[11px] font-mono font-semibold"
                  style={{ color: r.changePercent >= 0 ? "var(--up)" : "var(--down)" }}
                >
                  오늘 {r.changePercent >= 0 ? "+" : ""}{r.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl border p-4"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <p className="text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>
          오늘 포트폴리오 등락 분석
        </p>
        <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
          {cfg.labelKo} 보유분 가중 등락은 약{" "}
          <span style={{ color: dayMove >= 0 ? "var(--up)" : "var(--down)", fontWeight: 700 }}>
            {dayMove >= 0 ? "+" : ""}
            {dayMove.toFixed(2)}%
          </span>
          입니다. 미리보기용 간단 집계이며, 미국 홈의 AI 인사이트와 동일한 슬롯입니다.
        </p>
      </div>
    </section>
  );
}
