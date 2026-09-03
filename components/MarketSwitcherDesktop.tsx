"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MarketOpenChip } from "@/components/MarketOpenChip";
import { MARKET_CONFIG } from "@/lib/markets/config";
import { MARKET_IDS, type MarketId } from "@/lib/markets/types";
import { marketHref, parseMarketPath } from "@/lib/markets/marketPath";

/** 데스크탑 상단 — 시장 선택 가로 1줄 */
export function MarketSwitcherDesktop({ current }: { current: MarketId }) {
  const pathname = usePathname();
  const { tab } = parseMarketPath(pathname ?? "");

  return (
    <nav
      className="hidden lg:flex items-center gap-1"
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-opacity whitespace-nowrap"
            style={{
              background: active ? "rgba(var(--mint-rgb),0.14)" : "transparent",
              opacity: active ? 1 : 0.72,
            }}
            aria-current={active ? "page" : undefined}
          >
            <span className="text-base leading-none" aria-hidden>
              {m.emoji}
            </span>
            <span
              className="text-[12px] font-semibold leading-none"
              style={{ color: active ? "var(--mint)" : "var(--muted)" }}
            >
              {m.labelKo}
            </span>
            {(id === "us" || id === "kr") && <MarketOpenChip market={id} />}
          </Link>
        );
      })}
    </nav>
  );
}
