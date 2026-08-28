import Link from "next/link";
import type { Quote } from "@/lib/api";
import { formatMarketPrice } from "@/lib/markets/formatPrice";
import type { MarketId } from "@/lib/markets/types";
import { Sparkline } from "./Sparkline";

const UP   = "var(--up)";
const DOWN = "var(--down)";

export function StockCard({ stock, market = "us" }: { stock: Quote; market?: MarketId }) {
  const pos = stock.changePercent >= 0;
  const color = pos ? UP : DOWN;
  const primaryLabel = market === "kr" ? stock.name : stock.symbol;
  const secondaryLabel = market === "kr" ? stock.symbol.replace(/\.(KS|KQ)$/i, "") : stock.name;

  return (
    <Link
      href={`/stock/${stock.symbol}`}
      className="w-[155px] lg:w-[190px] flex-shrink-0 rounded-2xl p-4 border block"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="mb-2">
        <p className="text-sm font-bold font-syne truncate max-w-[130px] lg:max-w-full" style={{ color: "var(--text)" }}>
          {primaryLabel}
        </p>
        <p className="text-[10px] truncate max-w-[110px] lg:max-w-full" style={{ color: "var(--muted)" }}>
          {secondaryLabel}
        </p>
      </div>

      <Sparkline data={stock.sparkline} positive={pos} width={100} height={28} className="w-full" />

      <div className="mt-1.5 flex items-end justify-between gap-1">
        <p className="text-sm font-bold font-mono-num tabular-nums truncate min-w-0" style={{ color: "var(--text)" }}>
          {formatMarketPrice(market, stock.price)}
        </p>
        <p className="text-xs font-mono-num tabular-nums flex-shrink-0" style={{ color }}>
          {pos ? "+" : ""}{stock.changePercent.toFixed(2)}%
        </p>
      </div>
    </Link>
  );
}
