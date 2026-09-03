"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MarketOpenChip } from "@/components/MarketOpenChip";
import { MARKET_CONFIG } from "@/lib/markets/config";
import { MARKET_IDS, type MarketId } from "@/lib/markets/types";
import { marketHref, parseMarketPath } from "@/lib/markets/marketPath";

/** 모바일 — 헤더 아래 가로 이모지 시장 선택 */
export function MarketSwitcher({ current }: { current: MarketId }) {
  const pathname = usePathname();
  const { tab } = parseMarketPath(pathname ?? "");

  return (
    <div
      className="flex items-center justify-center gap-1 px-3 py-2 border-b lg:hidden"
      style={{ background: "var(--header-bg)", borderColor: "var(--border)" }}
      role="navigation"
      aria-label="시장 선택"
    >
      {MARKET_IDS.map((id) => {
        const m = MARKET_CONFIG[id];
        const active = id === current;
        const href = marketHref(id, tab);
        return (
          <Link
            key={id}
            href={href}
            className="flex flex-col items-center gap-0.5 min-w-[68px] flex-1 max-w-[88px] px-1.5 py-1.5 rounded-xl transition-opacity"
            style={{
              background: active ? "rgba(var(--mint-rgb),0.12)" : "transparent",
              opacity: active ? 1 : 0.72,
            }}
            aria-current={active ? "page" : undefined}
          >
            <span className="text-[22px] leading-none" aria-hidden>
              {m.emoji}
            </span>
            <span
              className="text-[9px] font-semibold tracking-tight text-center leading-tight"
              style={{ color: active ? "var(--mint)" : "var(--muted)" }}
            >
              {m.labelKo}
            </span>
            {(id === "us" || id === "kr") && <MarketOpenChip market={id} />}
          </Link>
        );
      })}
    </div>
  );
}
