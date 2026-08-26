"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MARKET_CONFIG } from "@/lib/markets/config";
import { MARKET_IDS, type MarketId } from "@/lib/markets/types";
import { marketHref, parseMarketPath } from "@/lib/markets/marketPath";

/** 데스크탑 사이드바·홈 상단 — 2×2 이모지 그리드 */
export function MarketSwitcherDesktop({ current }: { current: MarketId }) {
  const pathname = usePathname();
  const { tab } = parseMarketPath(pathname ?? "");

  return (
    <div
      className="grid grid-cols-2 gap-1.5 p-2 rounded-xl border mb-3"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
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
            className="flex items-center gap-2 px-2.5 py-2 rounded-lg transition-opacity"
            style={{
              background: active ? "rgba(var(--mint-rgb),0.14)" : "transparent",
              opacity: active ? 1 : 0.78,
            }}
            aria-current={active ? "page" : undefined}
          >
            <span className="text-lg leading-none" aria-hidden>
              {m.emoji}
            </span>
            <span
              className="text-[11px] font-semibold leading-tight"
              style={{ color: active ? "var(--mint)" : "var(--muted)" }}
            >
              {m.labelKo}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
