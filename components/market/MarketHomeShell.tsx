"use client";

import { Header } from "@/components/Header";
import { TickerTape } from "@/components/TickerTape";
import { EcoTickerTape } from "@/components/EcoTickerTape";
import { MarketOpenBanner } from "@/components/market/MarketOpenBanner";
import { NyseHolidayBanner } from "@/components/market/NyseHolidayBanner";
import { LiveMarket } from "@/components/LiveMarket";
import { MarketLiveMarket } from "@/components/market/MarketLiveMarket";
import { NewsSection } from "@/components/NewsSection";
import { FearGreedWidget } from "@/components/FearGreedWidget";
import { MarketFearWidget } from "@/components/market/MarketFearWidget";
import { BuffettWidget } from "@/components/BuffettWidget";
import { WatchlistSection } from "@/components/WatchlistSection";
import { AdFitBanner } from "@/components/AdFitBanner";
import { ReportFeed } from "@/components/ReportFeed";
import { OnboardingModal } from "@/components/OnboardingModal";
import { PortfolioWidget } from "@/components/PortfolioWidget";
import { HomeAIInsight } from "@/components/HomeAIInsight";
import { TodaysGuideCard } from "@/components/TodaysGuideCard";
import { MorningBriefingCard } from "@/components/MorningBriefingCard";
import { HomeValueStrip } from "@/components/HomeValueStrip";
import { MarketPortfolioStub } from "@/components/market/MarketPortfolioStub";
import { ShopPreviewSection } from "@/components/ShopPreviewSection";
import { QuickTickers } from "@/components/QuickTickers";
import type { MarketId } from "@/lib/markets/types";
import { getMarketConfig } from "@/lib/markets/config";
import type { Locale } from "@/lib/i18n";
import type { IndexQuote, Quote, FutureItem } from "@/lib/api";

type MarketSnap = {
  indices: IndexQuote[];
  quotes: Quote[];
  futures: FutureItem[];
  liveAt?: number;
} | null;

/**
 * 본사이트(`/`)와 동일한 레이아웃·섹션 순서.
 * 시장별로 바뀌는 것은 시세·뉴스·리포트·브리핑·센티먼트 내용뿐.
 */
export function MarketHomeShell({
  market,
  locale,
  initialData = null,
}: {
  market: MarketId;
  locale: Locale;
  initialData?: MarketSnap;
}) {
  const cfg = getMarketConfig(market);
  const isUs = market === "us";
  const showFear = market === "us" || market === "kr" || market === "kr-re";
  const showBuffett = market === "us";
  const uiLocale: Locale = locale; // always follow user locale, not market

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <h1 className="sr-only">
        {locale === "ko"
          ? `Investus — AI 기반 차세대 자산관리(WM) 핀테크 플랫폼 · ${isUs ? "미국주식" : cfg.labelKo}`
          : `Investus — AI-powered next-gen wealth management fintech · ${isUs ? "US Stocks" : cfg.labelEn}`}
      </h1>
      <Header />
      {/* 시세·경제 티커는 항상 장중 배너보다 위 */}
      {(isUs || market === "kr" || market === "safe") && (
        <div className="border-b" style={{ borderColor: "var(--border)" }}>
          <TickerTape market={market} />
          <EcoTickerTape market={market} />
        </div>
      )}
      {(isUs || market === "kr") && (
        <div
          className="px-4 lg:px-8 pt-2 pb-2 border-b"
          style={{ background: "var(--header-bg)", borderColor: "var(--border)" }}
        >
          <div className="max-w-[480px] lg:max-w-none mx-auto flex flex-col gap-2">
            {isUs && <NyseHolidayBanner locale={uiLocale} />}
            <MarketOpenBanner market={market} />
          </div>
        </div>
      )}

      <main className="max-w-[480px] mx-auto lg:max-w-none lg:px-8 lg:pb-10">
        {/* QuickTickers — 바로 시세 확인 (전체 너비) */}
        <section className="pt-3">
          <QuickTickers />
        </section>

        <div className="lg:flex lg:gap-8 lg:items-start lg:pt-2">
          <div className="lg:flex-1 lg:min-w-0">
            {/* 1. 모닝 브리핑 — 하루 컨텍스트 */}
            <section className="px-4 lg:px-0 pt-3">
              <MorningBriefingCard locale={uiLocale} market={market} />
            </section>

            {/* 2. 리포트 — 핵심 콘텐츠 (모바일: 가로 스와이프) */}
            <section className="pt-3 lg:pt-4">
              <ReportFeed market={market} />
            </section>

            {/* 3. 뉴스 — 최신 소식 (모바일: 가로 스와이프, 데스크탑: 사이드바) */}
            <section className="pt-4 lg:hidden">
              <NewsSection market={market} />
            </section>

            {/* 4. 관심종목 */}
            <WatchlistSection />

            {/* 5. 실시간 시장 */}
            {isUs ? (
              <LiveMarket initialData={initialData} />
            ) : (
              <MarketLiveMarket market={market} />
            )}

            {/* 6. 공포/탐욕 (모바일: 여기, 데스크탑: 사이드바) */}
            {showFear && (
              <>
                <section className="px-4 lg:hidden pt-4">
                  {isUs ? (
                    <FearGreedWidget locale={uiLocale} />
                  ) : (
                    <MarketFearWidget market={market} locale={uiLocale} />
                  )}
                </section>
                {showBuffett && (
                  <section className="px-4 lg:hidden pt-2">
                    <BuffettWidget locale={uiLocale} />
                  </section>
                )}
              </>
            )}

            {/* 7. 포트폴리오 */}
            {isUs ? <PortfolioWidget /> : <MarketPortfolioStub market={market} />}

            {/* 8. 보조 콘텐츠 (하단) */}
            <HomeValueStrip market={market} />

            <section className="px-4 lg:px-0 pt-3">
              <TodaysGuideCard locale={uiLocale} />
            </section>

            {market !== "kr-re" && (
              <section className="px-4 lg:px-0 pt-3">
                <HomeAIInsight market={market} />
              </section>
            )}

            <section className="px-4 pt-4">
              <AdFitBanner />
            </section>

            <ShopPreviewSection />
          </div>

          {/* 데스크탑 사이드바 */}
          <div className="hidden lg:flex lg:flex-col lg:w-[340px] lg:flex-shrink-0 lg:sticky lg:top-[57px] lg:max-h-[calc(100vh-57px)] lg:overflow-y-auto no-scrollbar gap-5 pb-10">
            {showFear && (
              <>
                {isUs ? (
                  <FearGreedWidget locale={uiLocale} />
                ) : (
                  <MarketFearWidget market={market} locale={uiLocale} />
                )}
                {showBuffett && <BuffettWidget locale={uiLocale} />}
              </>
            )}
            <NewsSection market={market} />
            <AdFitBanner />
          </div>
        </div>
      </main>

      <OnboardingModal />
    </div>
  );
}
