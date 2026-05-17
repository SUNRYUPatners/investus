import Link from "next/link";
import type { IndexQuote } from "@/lib/api";
import { Sparkline } from "./Sparkline";

// US market convention: up = red, down = green
const UP   = "#00e5a0";
const DOWN = "#ff4d6d";

export function IndexCard({ index }: { index: IndexQuote }) {
  const pos = index.changePercent >= 0;
  const color = pos ? UP : DOWN;

  const displayValue = index.isCurrency
    ? "₩" + Math.round(index.value).toLocaleString("ko-KR")
    : index.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const displayChange = index.isCurrency
    ? `${pos ? "+" : ""}${index.change.toFixed(2)}원`
    : `${pos ? "+" : ""}${index.change.toFixed(2)}`;

  return (
    <Link
      href={`/stock/${index.symbol}`}
      className="min-w-[155px] h-[148px] flex-shrink-0 rounded-2xl p-4 border block overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-medium" style={{ color: "var(--muted)" }}>
            {index.name}
          </p>
          <p
            className="text-lg font-bold font-mono-num tabular-nums mt-0.5"
            style={{ color: "var(--text)" }}
          >
            {displayValue}
          </p>
        </div>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full font-mono-num"
          style={{ background: `${color}1e`, color }}
        >
          {pos ? "+" : ""}{index.changePercent.toFixed(2)}%
        </span>
      </div>

      <Sparkline data={index.sparkline} positive={pos} width={120} height={36} />

      <p className="text-xs font-mono-num tabular-nums mt-2" style={{ color }}>
        {displayChange}
      </p>
    </Link>
  );
}
