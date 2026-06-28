import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { InsightReportSection } from "@/components/InsightReportSection";
import { YoutubeChannels } from "@/components/YoutubeChannels";
import { BookCarousel } from "@/components/BookCarousel";
import Link from "next/link";
import { AdFitBanner, AdFitStrip } from "@/components/AdFitBanner";
import { getLocale } from "@/lib/getLocale";
import { getT } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "투자 인사이트 & 리포트 | 인베스트어스",
  description: "SUNRYU Partners CIO가 직접 작성한 미국주식 시장 분석 리포트. S&P500·NASDAQ 시장 흐름 분석, 개별 종목 실적·밸류에이션 분석, 투자 기초 지식, 워렌 버핏·론 배런 등 전설적 투자가 전략을 무료로 제공합니다.",
  openGraph: {
    title: "투자 인사이트 & 리포트 | 인베스트어스",
    description: "CIO 직접 작성 미국주식 분석 리포트 · 투자 기초 지식 · 투자 대가 전략",
    type: "website",
  },
};

export default async function InsightPage() {
  const locale = await getLocale();
  const t = getT(locale).insight;

  /* ── 투자 기초&대가 통합 배너 ── */
  const LearnBanner = (
    <Link
      href="/insight/basics"
      className="block rounded-2xl overflow-hidden border active:opacity-90 transition-opacity"
      style={{ borderColor: "rgba(0,229,160,0.2)" }}
    >
      <div
        className="relative px-4 py-4 flex items-center gap-3"
        style={{ background: "linear-gradient(135deg, #001a12 0%, #0d0b00 60%, #0a0c10 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 75% 50%, rgba(212,175,55,0.07) 0%, transparent 55%)" }} />
        <div className="relative flex gap-1.5 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.2)" }}>
            <span className="text-xl">📚</span>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}>
            <span className="text-xl">🏆</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex gap-1.5 mb-1.5">
            <span className="inline-flex items-center text-[9px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(0,229,160,0.12)", color: "rgba(0,229,160,0.9)" }}>
              기초 지식
            </span>
            <span className="inline-flex items-center text-[9px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(212,175,55,0.12)", color: "#d4af37" }}>
              투자 대가
            </span>
          </div>
          <p className="text-sm font-bold leading-snug" style={{ color: "var(--text)" }}>투자 기초 & 대가 전략</p>
          <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>버핏·린치·달리오 등 핵심 투자 철학 전체 보기</p>
        </div>
        <span className="text-lg flex-shrink-0" style={{ color: "var(--muted)" }}>›</span>
      </div>
    </Link>
  );

  /* ── 투자교육 배너 (재사용) ── */
  const EduBanner = (
    <>
      <style>{`
        @keyframes edu-border-glow {
          0%, 100% { box-shadow: 0 0 0 1px rgba(212,175,55,0.3), 0 0 18px rgba(212,175,55,0.08); }
          50%       { box-shadow: 0 0 0 1px rgba(212,175,55,0.9), 0 0 32px rgba(212,175,55,0.35); }
        }
        @keyframes edu-sweep {
          0%   { left: -80%; }
          100% { left: 130%; }
        }
        .edu-banner-glow { animation: edu-border-glow 2.8s ease-in-out infinite; border-color: transparent !important; }
        .edu-sweep-line {
          position: absolute; top: 0; left: -80%;
          width: 55%; height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.09) 50%, transparent 100%);
          animation: edu-sweep 3.2s ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>
      <Link
        href="/education"
        className="block rounded-2xl overflow-hidden border edu-banner-glow active:opacity-90 transition-opacity"
        style={{ borderColor: "rgba(212,175,55,0.3)" }}
      >
      <div
        className="relative px-5 py-5 flex items-center gap-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1c1500 0%, #0d0b00 60%, #0a0c10 100%)" }}
      >
        <div className="edu-sweep-line" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 80% 50%, rgba(212,175,55,0.1) 0%, transparent 60%)" }} />
        <div className="relative w-[68px] h-[68px] rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(145deg, #2a1f00, #1a1400)", border: "1px solid rgba(212,175,55,0.4)", boxShadow: "0 8px 24px rgba(212,175,55,0.2)" }}>
          <span className="text-3xl">🎓</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full mb-2"
            style={{ background: "rgba(212,175,55,0.18)", color: "#d4af37" }}>
            {t.exclusiveClass}
          </div>
          <p className="text-sm font-bold leading-snug mb-1" style={{ color: "var(--text)" }}>{t.courseTitle}</p>
          <p className="text-[11px] mb-2.5" style={{ color: "var(--muted)" }}>{t.courseSub}</p>
          <div className="flex items-center justify-between">
            <p className="text-xs" style={{ color: "#d4af37" }}>{t.limitedSpots}</p>
            <span className="text-[11px] font-bold px-3 py-1.5 rounded-full"
              style={{ background: "linear-gradient(135deg, #b8960c, #d4af37)", color: "#000" }}>
              {t.apply}
            </span>
          </div>
        </div>
      </div>
    </Link>
    </>
  );


  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      {/* ── Mobile ── */}
      <main className="lg:hidden max-w-[480px] mx-auto px-0">
        <div className="px-4 pt-5 pb-3">
          <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>{t.title}</h1>
          <p className="text-xs mt-0.5 mb-3" style={{ color: "var(--muted)" }}>{t.subtitle}</p>
          {/* 에디토리얼 소개 — Google 인덱싱 콘텐츠 */}
          <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
            SUNRYU Partners CIO가 매일 직접 분석한 미국주식 투자 리포트를 무료로 제공합니다.
            단순 뉴스 요약이 아닌, S&P500·NASDAQ 시장 흐름·섹터 분석·개별 종목 밸류에이션까지
            투자 판단에 직결되는 핵심 분석을 담습니다.
          </p>
        </div>
        <section className="px-4 mb-4"><AdFitBanner /></section>
        <section className="px-4 mb-6">{EduBanner}</section>
        <section className="px-4 mb-6"><InsightReportSection /></section>
        <section className="px-4 mb-4"><AdFitBanner /></section>
        <section className="px-4 mb-4">{LearnBanner}</section>
        <section className="px-4 mb-2"><AdFitStrip /></section>
        <section className="px-4 mb-4"><AdFitBanner /></section>
        <section className="px-4 mb-6">
          <h2 className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            {t.books}
          </h2>
          <BookCarousel />
        </section>
        <section className="px-4 mb-2"><AdFitStrip /></section>
        <section className="px-4 mb-4"><AdFitBanner /></section>
        <section className="px-4">
          <h2 className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            {t.youtube}
          </h2>
          <YoutubeChannels />
        </section>
        <section className="px-4 mt-3"><AdFitStrip /></section>
        <section className="px-4 mt-2"><AdFitBanner /></section>
      </main>

      {/* ── Desktop: 왼쪽 페이지 스크롤 + 오른쪽 sticky 사이드바 ── */}
      <div className="hidden lg:flex lg:gap-10 lg:px-8 lg:items-start lg:pt-2 lg:pb-10">
        {/* 왼쪽 */}
        <div className="flex-1 min-w-0 pt-5">
          <div className="pb-4">
            <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>{t.title}</h1>
            <p className="text-xs mt-0.5 mb-2" style={{ color: "var(--muted)" }}>{t.subtitle}</p>
            <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
              SUNRYU Partners CIO가 매일 직접 분석한 미국주식 투자 리포트. S&P500·NASDAQ 시장 흐름·섹터 분석·개별 종목 밸류에이션까지 투자 판단에 직결되는 핵심 분석을 무료로 제공합니다.
            </p>
          </div>
          <InsightReportSection />
        </div>

        {/* 오른쪽 — sticky 사이드바 */}
        <aside
          className="w-[340px] flex-shrink-0 sticky top-[57px] flex flex-col pt-5"
          style={{ maxHeight: "calc(100vh - 57px)" }}
        >
          <div className="flex flex-col gap-3 flex-shrink-0">
            {EduBanner}
            {LearnBanner}
          </div>
          <div className="flex flex-col gap-5 overflow-y-auto no-scrollbar mt-5 pb-10 flex-1 min-h-0">
            <AdFitBanner />
            <section>
              <h2 className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
                {t.books}
              </h2>
              <BookCarousel />
            </section>
            <AdFitBanner />
            <section>
              <h2 className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
                {t.youtube}
              </h2>
              <YoutubeChannels />
            </section>
            <AdFitBanner />
          </div>
        </aside>
      </div>
    </div>
  );
}
