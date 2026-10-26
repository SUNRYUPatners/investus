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
import { HeroLanding } from "@/components/HeroLanding";
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

      {isUs && <HeroLanding locale={uiLocale} />}

      <main className="max-w-[480px] mx-auto lg:max-w-screen-2xl lg:px-8 lg:pb-10">
        <div className="lg:flex lg:gap-8 lg:items-start lg:pt-3">
          <div className="lg:flex-1 lg:min-w-0">
            {/* 1. 모닝 브리핑 */}
            <section className="px-4 lg:px-0 pt-3">
              <MorningBriefingCard locale={uiLocale} market={market} />
            </section>

            {/* 2. 실시간 시장 — 데스크탑에서 두 번째 (핵심 시세) */}
            {isUs ? (
              <LiveMarket initialData={initialData} />
            ) : (
              <MarketLiveMarket market={market} />
            )}

            {/* 3. 가입 CTA (비로그인에만 표시) */}
            <HomeValueStrip market={market} />

            {/* 4. 관심종목 */}
            <WatchlistSection />

            {/* 5. 광고 — 리포트 바로 위 (상단 노출) */}
            <section className="px-4 lg:px-0 pt-4">
              <AdFitBanner />
            </section>

            {/* 6. 리포트 — 핵심 콘텐츠 (모바일: 가로 스와이프) */}
            <section className="pt-3 lg:pt-4">
              <ReportFeed market={market} />
            </section>

            {/* 7. 뉴스 — 모바일 전용 (데스크탑: 사이드바) */}
            <section className="pt-4 lg:hidden">
              <NewsSection market={market} />
            </section>

            {/* 8. 공포/탐욕 — 모바일 전용 (데스크탑: 사이드바) */}
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

            {/* 9. 포트폴리오 — 모바일: 전체, 데스크탑: 사이드바로 이동 */}
            <div className="lg:hidden">
              {isUs ? <PortfolioWidget /> : <MarketPortfolioStub market={market} />}
            </div>

            {/* 9. TodaysGuide — 모바일 전용 (데스크탑: 사이드바) */}
            <section className="px-4 lg:hidden pt-3">
              <TodaysGuideCard locale={uiLocale} />
            </section>

            {/* 10. AIInsight — 모바일 전용 (데스크탑: 사이드바) */}
            {market !== "kr-re" && (
              <section className="px-4 lg:hidden pt-3">
                <HomeAIInsight market={market} />
              </section>
            )}

            <ShopPreviewSection />
          </div>

          {/* 데스크탑 사이드바 */}
          <div className="hidden lg:flex lg:flex-col lg:w-[360px] lg:flex-shrink-0 lg:sticky lg:top-[57px] lg:max-h-[calc(100vh-57px)] lg:overflow-y-auto no-scrollbar gap-5 pb-10">
            {/* 내 포트폴리오 — 가로 스와이프 컴팩트 (맨 위) */}
            {isUs && <PortfolioWidget sidebar />}
            {/* AI 인사이트 */}
            {market !== "kr-re" && <HomeAIInsight market={market} />}
            {/* 광고 */}
            <AdFitBanner />
            {/* 감정 지수 */}
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
            {/* 오늘의 가이드 */}
            <TodaysGuideCard locale={uiLocale} />
            {/* 뉴스 */}
            <NewsSection market={market} />
          </div>
        </div>
      </main>

      <OnboardingModal />
    </div>
  );
}
