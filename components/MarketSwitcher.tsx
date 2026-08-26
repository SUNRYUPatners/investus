"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MARKET_CONFIG, type MarketConfig } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";
import { MARKET_IDS } from "@/lib/markets/types";
import { parsePreviewPath } from "@/lib/markets/previewPath";

export function MarketSwitcher({
  current,
}: {
  current: MarketId;
}) {
  const pathname = usePathname();
  const { suffix } = parsePreviewPath(pathname);

  return (
    <div
      className="flex items-center justify-center gap-1.5 px-3 py-2 border-b"
      style={{ background: "var(--header-bg)", borderColor: "var(--border)" }}
      role="navigation"
      aria-label="시장 선택"
    >
      {MARKET_IDS.map((id) => {
        const m: MarketConfig = MARKET_CONFIG[id];
        const active = id === current;
        // 탭 유지: /preview/kr/search → /preview/us/search
        const href = `/preview/${id}${suffix}`;
        return (
          <Link
            key={id}
            href={href}
            className="flex flex-col items-center gap-0.5 min-w-[64px] px-2 py-1.5 rounded-xl transition-opacity"
            style={{
              background: active ? "rgba(var(--mint-rgb),0.12)" : "transparent",
              opacity: active ? 1 : 0.72,
            }}
            aria-current={active ? "page" : undefined}
          >
            <span className="text-xl leading-none" aria-hidden>
              {m.emoji}
            </span>
            <span
              className="text-[10px] font-semibold tracking-tight"
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
