"use client";

import { Header } from "@/components/Header";
import { TickerTape } from "@/components/TickerTape";
import { EcoTickerTape } from "@/components/EcoTickerTape";
import { LiveMarket } from "@/components/LiveMarket";
import { MarketLiveMarket } from "@/components/market/MarketLiveMarket";
import { NewsSection } from "@/components/NewsSection";
import { FearGreedWidget } from "@/components/FearGreedWidget";
import { MarketFearWidget } from "@/components/market/MarketFearWidget";
import { BuffettWidget } from "@/components/BuffettWidget";
import { WatchlistSection } from "@/components/WatchlistSection";
import { AdFitBanner, AdFitStrip } from "@/components/AdFitBanner";
import { ReportFeed } from "@/components/ReportFeed";
import { OnboardingModal } from "@/components/OnboardingModal";
import { PortfolioWidget } from "@/components/PortfolioWidget";
import { HomeAIInsight } from "@/components/HomeAIInsight";
import { FirstVisitBanner } from "@/components/FirstVisitBanner";
import { TodaysGuideCard } from "@/components/TodaysGuideCard";
import { MorningBriefingCard } from "@/components/MorningBriefingCard";
import { MarketBriefingCard } from "@/components/market/MarketBriefingCard";
import { MarketPortfolioStub } from "@/components/market/MarketPortfolioStub";
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
  const showFear = market === "us" || market === "kr";
  const showBuffett = market === "us";
  const uiLocale: Locale = market === "kr" || market === "kr-re" || market === "safe" ? "ko" : locale;

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <h1 className="sr-only">
        Investus {isUs ? "미국주식" : cfg.labelKo} — 본사이트와 동일 레이아웃
      </h1>
      <Header />
      {/* 미국 = 본사이트와 동일 티커. 다른 시장은 해당 시장 시세 슬롯(LiveMarket 대체)에서 표시 */}
      {isUs && (
        <>
          <TickerTape />
          <EcoTickerTape />
        </>
      )}

      <main className="max-w-[480px] mx-auto lg:max-w-none lg:px-8 lg:pb-10">
        <div className="lg:flex lg:gap-8 lg:items-start lg:pt-2">
          <div className="lg:flex-1 lg:min-w-0">
            <FirstVisitBanner />

            <section className="px-4 lg:px-0 pt-3">
              {isUs ? (
                <MorningBriefingCard locale={uiLocale} />
              ) : (
                <MarketBriefingCard market={market} />
              )}
            </section>

            <section className="px-4 lg:px-0 pt-3">
              <TodaysGuideCard locale={uiLocale} />
            </section>

            {isUs ? <PortfolioWidget /> : market !== "kr-re" ? <MarketPortfolioStub market={market} /> : null}

            <section className="px-4 lg:px-0 pt-3">
              <HomeAIInsight />
            </section>

            <WatchlistSection />

            {isUs ? (
              <LiveMarket initialData={initialData} />
            ) : (
              <MarketLiveMarket market={market} />
            )}

            <section className="px-4 lg:px-0 pt-4">
              <AdFitBanner />
            </section>

            {showFear && (
              <>
                <section className="px-4 lg:hidden pt-4">
                  {isUs ? (
                    <FearGreedWidget locale={uiLocale} />
                  ) : (
                    <MarketFearWidget market={market} locale={uiLocale} />
                  )}
                </section>
                <section className="px-4 lg:hidden pt-2">
                  <AdFitStrip />
                </section>
                {showBuffett && (
                  <section className="px-4 lg:hidden pt-2">
                    <BuffettWidget locale={uiLocale} />
                  </section>
                )}
              </>
            )}

            <section className="px-4 pt-4">
              <AdFitBanner />
            </section>

            <section className="px-4 lg:hidden pt-4">
              <NewsSection market={market} />
            </section>

            <section className="px-4 pt-2">
              <AdFitStrip />
            </section>

            <section className="px-4 lg:px-0 pt-4 lg:pt-6">
              <ReportFeed market={market} />
            </section>

            <section className="px-4 pt-3 pb-2">
              <AdFitBanner />
            </section>
          </div>

          <div className="hidden lg:flex lg:flex-col lg:w-[340px] lg:flex-shrink-0 lg:sticky lg:top-[57px] lg:max-h-[calc(100vh-57px)] lg:overflow-y-auto no-scrollbar gap-5 pb-10">
            {showFear && (
              <>
                {isUs ? (
                  <FearGreedWidget locale={uiLocale} />
                ) : (
                  <MarketFearWidget market={market} locale={uiLocale} />
                )}
                <AdFitBanner />
                {showBuffett && <BuffettWidget locale={uiLocale} />}
                <AdFitStrip />
              </>
            )}
            <NewsSection market={market} />
            <AdFitBanner />
          </div>
        </div>
      </main>

      <section aria-label="서비스 소개" className="max-w-[480px] mx-auto px-4 pt-4 pb-6 lg:hidden">
        <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
          {isUs ? (
            <>
              SUNRYU Partners CIO의 일일 시장 분석 리포트 · 미국주식 실시간 시세 · S&amp;P500·NASDAQ·다우존스 지수 · 공포탐욕지수 · 버핏지수를 무료로 제공합니다.
              <span className="ml-1" style={{ color: "var(--mint)" }}>매일 아침 Investus 하나로 전날 시장을 파악하세요.</span>
            </>
          ) : (
            <>
              {cfg.labelKo} 미리보기 · 본사이트와 같은 구성에서 시세·뉴스·리포트만 이 시장 기준으로 표시합니다.
            </>
          )}
        </p>
      </section>

      {isUs && <OnboardingModal />}
    </div>
  );
}
