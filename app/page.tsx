import { Header } from "@/components/Header";
import { TickerTape } from "@/components/TickerTape";
import { IndexCard } from "@/components/IndexCard";
import { StockCard } from "@/components/StockCard";
import { NewsCard } from "@/components/NewsCard";
import { FearGreedGauge } from "@/components/FearGreedGauge";
import { BuffettGauge } from "@/components/BuffettGauge";
import { FuturesHeatmap } from "@/components/FuturesHeatmap";
import { SP500Heatmap } from "@/components/SP500Heatmap";
import { WatchlistSection } from "@/components/WatchlistSection";
import { AdBanner } from "@/components/AdBanner";
import { ChevronRight, Star } from "lucide-react";
import {
  getIndices,
  getQuotes,
  getNews,
  getRecommendedStocks,
  getFearGreed,
  getFutures,
  getBuffett,
} from "@/lib/api";

export default async function HomePage() {
  const [indices, stocks, news, recommended, fearGreed, futures, buffett] =
    await Promise.all([
      getIndices(),
      getQuotes(),
      getNews(),
      getRecommendedStocks(),
      getFearGreed(),
      getFutures(),
      getBuffett(),
    ]);

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <TickerTape quotes={stocks} />

      {/* Desktop 2-column / Mobile single column */}
      <main className="max-w-[480px] mx-auto lg:max-w-none lg:px-8 lg:pb-10 pb-24">
        <div className="lg:flex lg:gap-8 lg:items-start lg:pt-2">

          {/* ── 왼쪽 컬럼 (모바일: 전체, 데스크톱: 좌측) ── */}
          <div className="lg:flex-1 lg:min-w-0">

            {/* 관심종목 */}
            <WatchlistSection />

            {/* Investus 추천주식 */}
            <section className="px-4 lg:px-0 pt-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5" style={{ color: "var(--mint)" }} fill="var(--mint)" />
                  <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--text)" }}>
                    Investus 추천주식
                  </h2>
                </div>
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>편집팀 선정</span>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {recommended.map((s) => (
                  <StockCard key={s.symbol} stock={s} />
                ))}
              </div>
            </section>

            {/* 인기 종목 */}
            <section className="px-4 lg:px-0 pt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
                  인기 종목
                </h2>
                <button className="flex items-center gap-0.5 text-xs font-medium" style={{ color: "var(--mint)" }}>
                  전체 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {stocks.map((s) => (
                  <StockCard key={s.symbol} stock={s} />
                ))}
              </div>
            </section>

            {/* 주요 지수 */}
            <section className="px-4 lg:px-0 pt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
                  주요 지수
                </h2>
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>실시간 · EST</span>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {indices.map((idx) => (
                  <IndexCard key={idx.symbol} index={idx} />
                ))}
              </div>
            </section>

            {/* Futures 히트맵 */}
            <section className="px-4 lg:px-0 pt-6">
              <FuturesHeatmap items={futures} />
            </section>

            {/* S&P 500 섹터 히트맵 */}
            <section className="px-4 lg:px-0 pt-4 pb-4 lg:pb-0">
              <SP500Heatmap />
            </section>

            {/* 광고 — 모바일에서만 여기 표시, 데스크톱은 우측 컬럼 */}
            <section className="px-4 lg:hidden pt-4">
              <AdBanner format="auto" />
            </section>

            {/* 시장심리 / 버핏지수 — 모바일에서만 여기 */}
            <section className="px-4 lg:hidden pt-4">
              <FearGreedGauge data={fearGreed} />
            </section>
            <section className="px-4 lg:hidden pt-4">
              <BuffettGauge data={buffett} />
            </section>

            {/* 뉴스 — 모바일에서만 여기 */}
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
                {news.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          </div>

          {/* ── 오른쪽 컬럼 (데스크톱 전용) ── */}
          <div className="hidden lg:flex lg:flex-col lg:w-[340px] lg:flex-shrink-0 lg:sticky lg:top-[57px] gap-5 pb-10">
            <AdBanner format="auto" />
            <FearGreedGauge data={fearGreed} />
            <BuffettGauge data={buffett} />

            {/* 뉴스 */}
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
                {news.slice(0, 5).map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
