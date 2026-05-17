import Link from "next/link";
import type { Quote } from "@/lib/api";
import { Sparkline } from "./Sparkline";

const UP   = "#00e5a0";
const DOWN = "#ff4d6d";

export function StockCard({ stock }: { stock: Quote }) {
  const pos = stock.changePercent >= 0;
  const color = pos ? UP : DOWN;

  return (
    <Link
      href={`/stock/${stock.symbol}`}
      className="w-[155px] lg:w-[190px] flex-shrink-0 rounded-2xl p-4 border block"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="mb-2">
        <p className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>
          {stock.symbol}
        </p>
        <p className="text-[10px] truncate max-w-[110px] lg:max-w-full" style={{ color: "var(--muted)" }}>
          {stock.name}
        </p>
      </div>

      <Sparkline data={stock.sparkline} positive={pos} width={100} height={28} className="w-full" />

      <div className="mt-1.5 flex items-end justify-between gap-1">
        <p className="text-sm font-bold font-mono-num tabular-nums truncate min-w-0" style={{ color: "var(--text)" }}>
          ${stock.price.toFixed(2)}
        </p>
        <p className="text-xs font-mono-num tabular-nums flex-shrink-0" style={{ color }}>
          {pos ? "+" : ""}{stock.changePercent.toFixed(2)}%
        </p>
      </div>
    </Link>
  );
}
