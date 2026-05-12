import { Header } from "@/components/Header";
import { TickerTape } from "@/components/TickerTape";
import { LiveMarket } from "@/components/LiveMarket";
import { NewsCard } from "@/components/NewsCard";
import { FearGreedGauge } from "@/components/FearGreedGauge";
import { BuffettGauge } from "@/components/BuffettGauge";
import { SP500Heatmap } from "@/components/SP500Heatmap";
import { WatchlistSection } from "@/components/WatchlistSection";
import { AdBanner } from "@/components/AdBanner";
import { ChevronRight } from "lucide-react";
import { getNews, getFearGreed, getBuffett, mockQuotes } from "@/lib/api";

export default async function HomePage() {
  const [news, fearGreed, buffett] = await Promise.all([
    getNews(),
    getFearGreed(),
    getBuffett(),
  ]);

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      {/* 티커 테이프: mock 사용 (애니메이션 목적) */}
      <TickerTape quotes={mockQuotes} />

      <main className="max-w-[480px] mx-auto lg:max-w-none lg:px-8 lg:pb-10 pb-24">
        <div className="lg:flex lg:gap-8 lg:items-start lg:pt-2">

          {/* ── 왼쪽 컬럼 ── */}
          <div className="lg:flex-1 lg:min-w-0">

            {/* 관심종목 */}
            <WatchlistSection />

            {/* 추천주식 · 인기종목 · 주요지수 · Futures (실시간) */}
            <LiveMarket />

            {/* S&P 500 섹터 히트맵 */}
            <section className="px-4 lg:px-0 pt-4 pb-4 lg:pb-0">
              <SP500Heatmap />
            </section>

            {/* 광고 · 시장심리 · 버핏지수 · 뉴스 — 모바일 전용 */}
            <section className="px-4 lg:hidden pt-4">
              <AdBanner format="auto" />
            </section>
            <section className="px-4 lg:hidden pt-4">
              <FearGreedGauge data={fearGreed} />
            </section>
            <section className="px-4 lg:hidden pt-4">
              <BuffettGauge data={buffett} />
            </section>
            <section className="px-4 lg:hidden pt-4 pb-2">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
                  시장 뉴스
                </h2>
                <button className="flex items-center gap-0.5 text-xs font-medium" style={{ color: "var(--mint)" }}>
                  더보기 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {news.map((item) => <NewsCard key={item.id} item={item} />)}
              </div>
            </section>
          </div>

          {/* ── 오른쪽 컬럼 (데스크톱 전용, sticky) ── */}
          <div className="hidden lg:flex lg:flex-col lg:w-[340px] lg:flex-shrink-0 lg:sticky lg:top-[57px] gap-5 pb-10">
            <AdBanner format="auto" />
            <FearGreedGauge data={fearGreed} />
            <BuffettGauge data={buffett} />
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
                  시장 뉴스
                </h2>
                <button className="flex items-center gap-0.5 text-xs font-medium" style={{ color: "var(--mint)" }}>
                  더보기 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {news.slice(0, 5).map((item) => <NewsCard key={item.id} item={item} />)}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
