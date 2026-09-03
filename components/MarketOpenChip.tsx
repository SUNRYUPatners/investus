"use client";

import { useEffect, useState } from "react";
import type { MarketId } from "@/lib/markets/types";
import { isStockMarketOpen } from "@/lib/markets/hours";

/** 시장 탭 위 장중 뱃지 (미국·한국만) */
export function MarketOpenChip({ market }: { market: MarketId }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (market !== "us" && market !== "kr") return;
    const tick = () => setOpen(isStockMarketOpen(market));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [market]);

  if (market !== "us" && market !== "kr") return null;
  if (!open) return null;

  return (
    <span
      className="inline-flex items-center gap-0.5 text-[7px] lg:text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none"
      style={{ background: "rgba(var(--up-rgb),0.16)", color: "var(--up)" }}
    >
      <span className="inline-block w-1 h-1 rounded-full animate-pulse" style={{ background: "var(--up)" }} />
      장중
    </span>
  );
}
