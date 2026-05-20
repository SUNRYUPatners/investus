import { Header } from "@/components/Header";
import { TickerTape } from "@/components/TickerTape";
import { LiveMarket } from "@/components/LiveMarket";
import { NewsSection } from "@/components/NewsSection";
import { FearGreedWidget } from "@/components/FearGreedWidget";
import { BuffettWidget } from "@/components/BuffettWidget";
import { SP500Heatmap } from "@/components/SP500Heatmap";
import { WatchlistSection } from "@/components/WatchlistSection";
import { AdBanner } from "@/components/AdBanner";
import { ReportFeed } from "@/components/ReportFeed";
import { OnboardingModal } from "@/components/OnboardingModal";
import { PortfolioWidget } from "@/components/PortfolioWidget";
import { FirstVisitBanner } from "@/components/FirstVisitBanner";
import { getLocale } from "@/lib/getLocale";

export default async function HomePage() {
  const locale = await getLocale();

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      {/* 티커 테이프: LiveMarket이 localStorage 업데이트하면 자동 동기화 */}
      <TickerTape />

      <main className="max-w-[480px] mx-auto lg:max-w-none lg:px-8 lg:pb-10 pb-24">
        <div className="lg:flex lg:gap-8 lg:items-start lg:pt-2">

          {/* ── 왼쪽 컬럼 ── */}
          <div className="lg:flex-1 lg:min-w-0">

            {/* 첫 방문자 가이드 배너 */}
            <FirstVisitBanner />

            {/* 내 보유종목 (포트폴리오에 종목이 있을 때만 표시) */}
            <PortfolioWidget />

            {/* 관심종목 */}
            <WatchlistSection />

            {/* 추천주식 · 인기종목 · 주요지수 · Futures (실시간) */}
            <LiveMarket />

            {/* S&P 500 섹터 히트맵 */}
            <section className="px-4 lg:px-0 pt-4 pb-4 lg:pb-0">
              <SP500Heatmap />
            </section>

            {/* Investus 리포트 — 히트맵 아래 (모바일 + 데스크톱 공통) */}
            <section className="px-4 lg:px-0 pt-4 lg:pt-6">
              <ReportFeed />
            </section>

            {/* 광고 · 시장심리 · 버핏지수 — 모바일 전용 */}
            <section className="px-4 lg:hidden pt-5">
              <AdBanner format="auto" />
            </section>
            <section className="px-4 lg:hidden pt-4">
              <FearGreedWidget locale={locale} />
            </section>
            <section className="px-4 lg:hidden pt-4">
              <BuffettWidget locale={locale} />
            </section>

            {/* 시장 뉴스 */}
            <section className="px-4 lg:hidden pt-4 pb-2">
              <NewsSection />
            </section>
          </div>

          {/* ── 오른쪽 컬럼 (데스크톱 전용, sticky) ── */}
          <div className="hidden lg:flex lg:flex-col lg:w-[340px] lg:flex-shrink-0 lg:sticky lg:top-[57px] lg:max-h-[calc(100vh-57px)] lg:overflow-y-auto no-scrollbar gap-5 pb-10">
            <AdBanner format="auto" />
            <FearGreedWidget locale={locale} />
            <BuffettWidget locale={locale} />
            <NewsSection />
          </div>

        </div>
      </main>
      <OnboardingModal />
    </div>
  );
}
