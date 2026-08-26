"use client";

import { PreviewHeader } from "@/components/PreviewHeader";
import { MarketSwitcher } from "@/components/MarketSwitcher";
import Link from "next/link";
import type { MarketId } from "@/lib/markets/types";
import { getMarketConfig } from "@/lib/markets/config";

export function MarketMoreShell({ market }: { market: MarketId }) {
  const cfg = getMarketConfig(market);
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <PreviewHeader market={market} />
      <MarketSwitcher current={market} />
      <main className="max-w-[480px] mx-auto px-4 pt-4 pb-8 space-y-4">
        <h2 className="text-base font-bold" style={{ color: "var(--text)" }}>
          더보기 · {cfg.labelKo}
        </h2>
        <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
          미리보기 모드입니다. 프로덕션 설정·약관은 본사이트 더보기 탭을 이용하세요.
        </p>
        <Link
          href="/more"
          className="block rounded-2xl border p-4 text-sm font-semibold"
          style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--mint)" }}
        >
          본사이트 더보기 →
        </Link>
        <Link
          href="/"
          className="block rounded-2xl border p-4 text-sm font-semibold"
          style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--text)" }}
        >
          프로덕션 홈 (미국) →
        </Link>
      </main>
    </div>
  );
}
