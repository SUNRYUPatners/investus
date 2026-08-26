"use client";

import { PreviewHeader } from "@/components/PreviewHeader";
import { MarketSwitcher } from "@/components/MarketSwitcher";
import { ReportFeed } from "@/components/ReportFeed";
import type { MarketId } from "@/lib/markets/types";
import { getMarketConfig } from "@/lib/markets/config";

export function MarketInsightShell({ market }: { market: MarketId }) {
  const cfg = getMarketConfig(market);
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <PreviewHeader market={market} />
      <MarketSwitcher current={market} />
      <main className="max-w-[480px] mx-auto px-4 pt-4 pb-8">
        <h2 className="text-base font-bold mb-1" style={{ color: "var(--text)" }}>
          인사이트 · {cfg.labelKo}
        </h2>
        <p className="text-[12px] mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
          이 시장 리포트 피드입니다. 본사이트 인사이트 탭과 같은 자리입니다.
        </p>
        <ReportFeed market={market} />
      </main>
    </div>
  );
}
