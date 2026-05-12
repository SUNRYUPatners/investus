import Link from "next/link";
import type { Quote } from "@/lib/api";
import { Sparkline } from "./Sparkline";

// US market convention: up = red, down = green
const UP   = "#00e5a0";
const DOWN = "#ff4d6d";

export function StockCard({ stock }: { stock: Quote }) {
  const pos = stock.changePercent >= 0;
  const color = pos ? UP : DOWN;

  return (
    <Link
      href={`/stock/${stock.symbol}`}
      className="min-w-[155px] flex-shrink-0 rounded-2xl p-4 border block"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>
            {stock.symbol}
          </p>
          <p className="text-[11px] truncate max-w-[85px]" style={{ color: "var(--muted)" }}>
            {stock.name}
          </p>
        </div>
        <span
          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md font-mono-num"
          style={{ background: `${color}1e`, color }}
        >
          {pos ? "+" : ""}{stock.changePercent.toFixed(2)}%
        </span>
      </div>

      <Sparkline data={stock.sparkline} positive={pos} />

      {/* Price */}
      <div className="mt-2">
        <p className="text-base font-bold font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
          ${stock.price.toFixed(2)}
        </p>
        <p className="text-xs font-mono-num" style={{ color }}>
          {pos ? "+" : ""}${stock.change.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
