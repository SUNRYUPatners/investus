"use client";

import { PreviewHeader } from "@/components/PreviewHeader";
import { MarketSwitcher } from "@/components/MarketSwitcher";
import { MarketPortfolioStub } from "@/components/market/MarketPortfolioStub";
import type { MarketId } from "@/lib/markets/types";
import { getMarketConfig } from "@/lib/markets/config";

export function MarketPortfolioShell({ market }: { market: MarketId }) {
  const cfg = getMarketConfig(market);
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <PreviewHeader market={market} />
      <MarketSwitcher current={market} />
      <main className="max-w-[480px] mx-auto px-4 pt-4 pb-8">
        <h2 className="text-base font-bold mb-1" style={{ color: "var(--text)" }}>
          포트폴리오 · {cfg.labelKo}
        </h2>
        <p className="text-[12px] mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
          시장별 보유 키(`{cfg.portfolioKey}`)로 분리됩니다. 레이아웃은 본사이트 포트폴리오 탭과 같습니다.
        </p>
        {market === "kr-re" ? (
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            부동산 미리보기에서는 시세 포트폴리오 대신 정책·뉴스·리포트를 홈에서 확인하세요.
          </p>
        ) : (
          <MarketPortfolioStub market={market} />
        )}
      </main>
    </div>
  );
}
