import Link from "next/link";
import type { IndexQuote } from "@/lib/api";
import { Sparkline } from "./Sparkline";

const UP   = "#00e5a0";
const DOWN = "#ff4d6d";

export function IndexCard({ index }: { index: IndexQuote }) {
  const pos = index.changePercent >= 0;
  const color = pos ? UP : DOWN;

  const displayValue = index.isCurrency
    ? "₩" + Math.round(index.value).toLocaleString("ko-KR")
    : index.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <Link
      href={`/stock/${index.symbol}`}
      className="w-[155px] flex-shrink-0 rounded-2xl p-4 border block"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="mb-2">
        <p className="text-sm font-bold font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
          {displayValue}
        </p>
        <p className="text-[10px] truncate" style={{ color: "var(--muted)" }}>
          {index.name}
        </p>
      </div>

      <Sparkline data={index.sparkline} positive={pos} width={100} height={28} />

      <div className="mt-1.5 flex items-end justify-between">
        <p className="text-sm font-bold font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
          {displayValue}
        </p>
        <p className="text-xs font-mono-num tabular-nums" style={{ color }}>
          {pos ? "+" : ""}{index.changePercent.toFixed(2)}%
        </p>
      </div>
    </Link>
  );
}
