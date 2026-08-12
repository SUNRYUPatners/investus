import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronRight } from "lucide-react";
import { LearnHubCards } from "@/components/LearnHubCards";
import { LEARN_ARTICLES, LEARN_SERIES } from "@/lib/learnArticles";
import { TodaysGuideCard } from "@/components/TodaysGuideCard";

export const metadata: Metadata = {
  title: "투자 지식 허브 — 미국주식·ETF·세금·밸류에이션 가이드 | 인베스트어스",
  description:
    "미국주식 입문, ETF, REITs, 옵션, 실적시즌, ISA·연금, 매크로, 체크리스트까지 Investus 오리지널 심화 가이드.",
  alternates: { canonical: "https://www.investus.kr/learn" },
  openGraph: {
    title: "투자 지식 허브 | 인베스트어스 Investus",
    description: "미국주식 투자 심화 가이드 모음",
    url: "https://www.investus.kr/learn",
    type: "website",
  },
};

export default function LearnPage() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-10">
        <div className="pt-4 pb-2">
          <Link href="/more" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            더보기
          </Link>
        </div>

        <div className="mb-6">
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1 font-syne" style={{ color: "var(--mint)" }}>
            INVESTUS LEARN
          </p>
          <h1 className="text-xl font-bold font-syne mb-2" style={{ color: "var(--text)" }}>
            투자 지식 허브
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Investus 편집팀이 쓴 심화 가이드 {LEARN_ARTICLES.length}편.
            시리즈로 묶었으니 입문 → 세금 → 매크로 순으로 읽어도 됩니다.
          </p>
        </div>

        <div className="mb-6">
          <TodaysGuideCard />
        </div>

        <div className="mb-8 flex flex-col gap-3">
          <p className="text-[10px] font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
            시리즈
          </p>
          {LEARN_SERIES.map((s) => {
            const count = LEARN_ARTICLES.filter((a) => a.series === s.id).length;
            return (
              <a
                key={s.id}
                href={`#series-${encodeURIComponent(s.id)}`}
                className="rounded-xl border px-4 py-3 flex items-center justify-between active:opacity-80"
                style={{ background: "var(--card)", borderColor: "var(--border)", textDecoration: "none" }}
              >
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{s.title}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>{s.blurb} · {count}편</p>
                </div>
                <ChevronRight className="w-4 h-4 opacity-40" style={{ color: "var(--muted)" }} />
              </a>
            );
          })}
        </div>

        {LEARN_SERIES.map((s) => {
          const articles = LEARN_ARTICLES.filter((a) => a.series === s.id);
          if (articles.length === 0) return null;
          return (
            <section key={s.id} id={`series-${s.id}`} className="mb-10 scroll-mt-20">
              <div className="mb-3">
                <h2 className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>{s.title}</h2>
                <p className="text-[11px]" style={{ color: "var(--muted)" }}>{s.blurb}</p>
              </div>
              <LearnHubCards articles={articles} />
            </section>
          );
        })}

        <div className="mt-2 mb-4">
          <h2 className="text-sm font-bold font-syne mb-3" style={{ color: "var(--text)" }}>전체 가이드</h2>
          <LearnHubCards />
        </div>

        <div className="mt-6 rounded-2xl p-4 text-center border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>
            AI 투자비서에게 바로 물어보세요
          </p>
          <p className="text-[11px] mb-3" style={{ color: "var(--muted)" }}>
            포트폴리오 분석, 종목 질문, 시장 해석 — 자산 탭에서 무료로 이용
          </p>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: "var(--mint)", color: "#000", textDecoration: "none" }}
          >
            AI 투자비서 열기 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
