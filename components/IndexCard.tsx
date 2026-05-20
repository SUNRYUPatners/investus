import Link from "next/link";
import type { IndexQuote } from "@/lib/api";
import { Sparkline } from "./Sparkline";

const UP   = "#10b981";
const DOWN = "#ef4444";

export function IndexCard({ index }: { index: IndexQuote }) {
  const pos = index.changePercent >= 0;
  const color = pos ? UP : DOWN;

  const displayValue = index.isCurrency
    ? "₩" + Math.round(index.value).toLocaleString("ko-KR")
    : index.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <Link
      href={`/stock/${index.symbol}`}
      className="w-[155px] lg:w-[190px] flex-shrink-0 rounded-2xl p-4 border block"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="mb-2">
        <p className="text-sm font-bold font-mono-num tabular-nums truncate" style={{ color: "var(--text)" }}>
          {displayValue}
        </p>
        <p className="text-[10px] truncate" style={{ color: "var(--muted)" }}>
          {index.name}
        </p>
      </div>

      <Sparkline data={index.sparkline} positive={pos} width={100} height={28} className="w-full" />

      <div className="mt-1.5 flex items-end justify-between gap-1">
        <p className="text-sm font-bold font-mono-num tabular-nums truncate min-w-0" style={{ color: "var(--text)" }}>
          {displayValue}
        </p>
        <p className="text-xs font-mono-num tabular-nums flex-shrink-0" style={{ color }}>
          {pos ? "+" : ""}{index.changePercent.toFixed(2)}%
        </p>
      </div>
    </Link>
  );
}
