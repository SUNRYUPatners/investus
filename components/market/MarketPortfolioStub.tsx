"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, ChevronRight } from "lucide-react";
import type { Quote } from "@/lib/api";
import { getMarketConfig } from "@/lib/markets/config";
import { marketHref } from "@/lib/markets/marketPath";
import type { MarketId } from "@/lib/markets/types";
import { useMarketPortfolio } from "@/hooks/useMarketPortfolio";

export function MarketPortfolioStub({ market }: { market: MarketId }) {
  const router = useRouter();
  const cfg = getMarketConfig(market);
  const { holdings, loaded } = useMarketPortfolio(market);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const url = `/api/market-data?market=${market}`;
    fetch(url)
      .then((r) => r.json())
      .then((d: { quotes?: Quote[] }) => setQuotes(d.quotes ?? []))
      .catch(() => {});
  }, [market]);

  const rows = useMemo(() => {
    return holdings.map((h) => {
      const q = quotes.find((x) => x.symbol === h.symbol);
      const price = q?.price ?? h.avgCost;
      const name = q?.name ?? h.symbol;
      return { ...h, price, name, changePercent: q?.changePercent ?? 0 };
    });
  }, [holdings, quotes]);

  if (!loaded) return null;

  const portfolioHref = marketHref(market, "portfolio");

  if (rows.length === 0) {
    return (
      <section className="px-4 lg:px-0 pt-3">
        <button
          type="button"
          onClick={() => router.push(portfolioHref)}
          className="w-full rounded-2xl border p-4 text-left transition-opacity active:opacity-80"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(var(--mint-rgb),0.12)" }}
            >
              <Wallet className="w-5 h-5" style={{ color: "var(--mint)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                {cfg.labelKo} 포트폴리오를 등록해 주세요
              </p>
              <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: "var(--muted)" }}>
                보유 종목을 등록하면 홈에서 시세·AI 분석을 볼 수 있습니다.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
          </div>
        </button>
      </section>
    );
  }

  return (
    <section className="px-4 lg:px-0 pt-3">
      <div
        className="rounded-2xl border p-4"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--muted)" }}>
            내 포트폴리오 ({cfg.labelKo})
          </p>
          <button
            type="button"
            onClick={() => router.push(portfolioHref)}
            className="text-[10px] font-semibold"
            style={{ color: "var(--mint)" }}
          >
            편집
          </button>
        </div>
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
    </section>
  );
}
