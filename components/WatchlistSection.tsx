"use client";

import { useWatchlist } from "@/hooks/useWatchlist";
import { mockQuotes } from "@/lib/api";
import { Sparkline } from "./Sparkline";
import { Star } from "lucide-react";

const UP   = "#ff4d6d";
const DOWN = "#00e5a0";

export function WatchlistSection() {
  const { list, remove } = useWatchlist();

  if (list.length === 0) return null;

  const stocks = list
    .map((sym) => mockQuotes.find((q) => q.symbol === sym))
    .filter(Boolean) as typeof mockQuotes;

  return (
    <section className="px-4 pt-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5" style={{ color: "#facc15" }} fill="#facc15" />
          <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--text)" }}>
            관심종목
          </h2>
        </div>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>{list.length}개</span>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {stocks.map((stock) => {
          const pos   = stock.changePercent >= 0;
          const color = pos ? UP : DOWN;
          return (
            <div
              key={stock.symbol}
              className="min-w-[140px] flex-shrink-0 rounded-2xl p-3 border relative"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              {/* Remove button */}
              <button
                onClick={() => remove(stock.symbol)}
                className="absolute top-2 right-2 p-0.5"
                aria-label="관심종목 제거"
              >
                <Star className="w-3.5 h-3.5" style={{ color: "#facc15" }} fill="#facc15" />
              </button>

              <div className="mb-2 pr-5">
                <p className="text-sm font-bold font-mono-num" style={{ color: "var(--text)" }}>
                  {stock.symbol}
                </p>
                <p className="text-[10px] truncate" style={{ color: "var(--muted)" }}>{stock.name}</p>
              </div>

              <Sparkline data={stock.sparkline} positive={pos} width={100} height={28} />

              <div className="mt-1.5 flex items-end justify-between">
                <p className="text-sm font-bold font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
                  ${stock.price.toFixed(2)}
                </p>
                <p className="text-xs font-mono-num" style={{ color }}>
                  {pos ? "+" : ""}{stock.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
