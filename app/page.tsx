import { Header } from "@/components/Header";
import { TickerTape } from "@/components/TickerTape";
import { LiveMarket } from "@/components/LiveMarket";
import { NewsSection } from "@/components/NewsSection";
import { FearGreedWidget } from "@/components/FearGreedWidget";
import { BuffettWidget } from "@/components/BuffettWidget";
import { WatchlistSection } from "@/components/WatchlistSection";
import { AdFitBanner } from "@/components/AdFitBanner";
import { ReportFeed } from "@/components/ReportFeed";
import { OnboardingModal } from "@/components/OnboardingModal";
import { PortfolioWidget } from "@/components/PortfolioWidget";
import { HomeAIInsight } from "@/components/HomeAIInsight";
import { FirstVisitBanner } from "@/components/FirstVisitBanner";
import { getLocale } from "@/lib/getLocale";

export default async function HomePage() {
  const locale = await getLocale();

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      {/* 티커 테이프: LiveMarket이 localStorage 업데이트하면 자동 동기화 */}
      <TickerTape />

      <main className="max-w-[480px] mx-auto lg:max-w-none lg:px-8 lg:pb-10">
        <div className="lg:flex lg:gap-8 lg:items-start lg:pt-2">

          {/* ── 왼쪽 컬럼 ── */}
          <div className="lg:flex-1 lg:min-w-0">

            {/* 첫 방문자 가이드 배너 */}
            <FirstVisitBanner />

            {/* 내 보유종목 (포트폴리오에 종목이 있을 때만 표시) */}
            <PortfolioWidget />

            {/* 오늘 포트폴리오 등락 분석 — 내 보유종목 바로 아래 */}
            <section className="px-4 lg:px-0 pt-3">
              <HomeAIInsight />
            </section>

            {/* 관심종목 */}
            <WatchlistSection />

            {/* 추천주식 · 인기종목 · 주요지수 · S&P500 히트맵 · Futures · 시장종합분석 (실시간) */}
            <LiveMarket />

            {/* 광고 — LiveMarket 아래 (첫 광고는 스크롤 후 노출) */}
            <section className="px-4 lg:px-0 pt-4">
              <AdFitBanner />
            </section>

            {/* Investus 리포트 — AI 분석 아래 */}
            <section className="px-4 lg:px-0 pt-4 lg:pt-6">
              <ReportFeed />
            </section>

            {/* 광고 — 리포트 아래 (모바일 전용) */}
            <section className="px-4 lg:hidden pt-3">
              <AdFitBanner />
            </section>

            {/* 시장심리 · 버핏지수 — 모바일 전용 */}
            <section className="px-4 lg:hidden pt-5">
              <AdFitBanner />
            </section>
            <section className="px-4 lg:hidden pt-4">
              <FearGreedWidget locale={locale} />
            </section>
            <section className="px-4 lg:hidden pt-4">
              <BuffettWidget locale={locale} />
            </section>

            {/* 시장 뉴스 */}
            <section className="px-4 lg:hidden pt-4">
              <NewsSection />
            </section>
            {/* 광고 — 뉴스 아래 */}
            <section className="px-4 lg:hidden pt-3 pb-2">
              <AdFitBanner />
            </section>
          </div>

          {/* ── 오른쪽 컬럼 (데스크톱 전용, sticky) ── */}
          <div className="hidden lg:flex lg:flex-col lg:w-[340px] lg:flex-shrink-0 lg:sticky lg:top-[57px] lg:max-h-[calc(100vh-57px)] lg:overflow-y-auto no-scrollbar gap-5 pb-10">
            <FearGreedWidget locale={locale} />
            <AdFitBanner />
            <BuffettWidget locale={locale} />
            <NewsSection />
          </div>

        </div>
      </main>
      <OnboardingModal />
    </div>
  );
}
