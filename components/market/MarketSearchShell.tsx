"use client";

import { PreviewHeader } from "@/components/PreviewHeader";
import { MarketSwitcher } from "@/components/MarketSwitcher";
import { NewsSection } from "@/components/NewsSection";
import { MarketLiveMarket } from "@/components/market/MarketLiveMarket";
import type { MarketId } from "@/lib/markets/types";
import { getMarketConfig } from "@/lib/markets/config";

/** 미리보기 검색 탭 — 레이아웃은 본사이트 검색과 같은 슬롯, 내용은 시장별 */
export function MarketSearchShell({ market }: { market: MarketId }) {
  const cfg = getMarketConfig(market);
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <PreviewHeader market={market} />
      <MarketSwitcher current={market} />
      <main className="max-w-[480px] mx-auto px-4 pt-4 pb-8 space-y-6">
        <div>
          <h2 className="text-base font-bold mb-1" style={{ color: "var(--text)" }}>
            검색 · {cfg.labelKo}
          </h2>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
            미리보기: 이 시장의 인기 종목·뉴스만 보여 줍니다. 레이아웃은 본사이트 검색 탭과 동일 구조입니다.
          </p>
        </div>
        <MarketLiveMarket market={market} />
        <NewsSection market={market} />
      </main>
    </div>
  );
}
