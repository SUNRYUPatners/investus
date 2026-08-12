import Link from "next/link";
import { LearnHubCards } from "@/components/LearnHubCards";
import { LEARN_ARTICLES } from "@/lib/learnArticles";
import { AdFitStrip } from "@/components/AdFitBanner";

export function PortfolioLearnHub({ locale }: { locale: string }) {
  const isKo = locale === "ko";

  return (
    <section className="mt-2 mb-8">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
            {isKo ? "투자 지식 허브" : "Learn Hub"}
          </h2>
          <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
            {isKo
              ? "미국주식 심화 가이드 · 스크롤해서 읽어보세요"
              : "In-depth guides · scroll to browse"}
          </p>
        </div>
        <Link
          href="/learn"
          className="text-[11px] font-semibold flex-shrink-0"
          style={{ color: "var(--mint)", textDecoration: "none" }}
        >
          {isKo ? "전체 보기 →" : "View all →"}
        </Link>
      </div>
      <div className="flex gap-1.5 mb-4">
        <span
          className="text-[9px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: "rgba(0,229,160,0.12)", color: "rgba(0,229,160,0.95)" }}
        >
          {isKo ? "심화 가이드" : "Guides"}
        </span>
        <span
          className="text-[9px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: "rgba(96,165,250,0.12)", color: "#60a5fa" }}
        >
          {LEARN_ARTICLES.length}{isKo ? "편" : " articles"}
        </span>
      </div>
      <LearnHubCards />
      <div className="mt-4">
        <AdFitStrip />
      </div>
    </section>
  );
}
