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
import { MarketPortfolioStub } from "@/components/market/MarketPortfolioStub";
import { ShopPreviewSection } from "@/components/ShopPreviewSection";
import { SessionChatWidget } from "@/components/SessionChatWidget";
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
  const uiLocale: Locale = market === "kr" || market === "kr-re" || market === "safe" ? "ko" : locale;

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <h1 className="sr-only">
        Investus — AI 기반 차세대 자산관리(WM) 핀테크 플랫폼 · {isUs ? "미국주식" : cfg.labelKo}
      </h1>
      <Header />
      {/* 시세 티커 · 경제일정 — 각각 1줄씩 (세로 2줄) */}
      {(isUs || market === "kr" || market === "safe") && (
        <div className="border-b" style={{ borderColor: "var(--border)" }}>
          <TickerTape market={market} />
          <EcoTickerTape market={market} />
        </div>
      )}

      <main className="max-w-[480px] mx-auto lg:max-w-none lg:px-8 lg:pb-10">
        <div className="lg:flex lg:gap-8 lg:items-start lg:pt-2">
          <div className="lg:flex-1 lg:min-w-0">
            <FirstVisitBanner />

            <section className="px-4 lg:px-0 pt-3">
              <MorningBriefingCard locale={uiLocale} market={market} />
            </section>

            <section className="px-4 lg:px-0 pt-3">
              <TodaysGuideCard locale={uiLocale} />
            </section>

            {isUs ? <PortfolioWidget /> : <MarketPortfolioStub market={market} />}

            {market !== "kr-re" && (
              <section className="px-4 lg:px-0 pt-3">
                <HomeAIInsight market={market} />
              </section>
            )}

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

            <ShopPreviewSection />

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

      {isUs && <OnboardingModal />}
      <SessionChatWidget market={market} />
    </div>
  );
}
