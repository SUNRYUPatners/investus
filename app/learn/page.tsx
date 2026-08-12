import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronRight } from "lucide-react";
import { LearnHubCards } from "@/components/LearnHubCards";

export const metadata: Metadata = {
  title: "투자 지식 허브 — 미국주식·ETF·세금·밸류에이션 가이드 | 인베스트어스",
  description:
    "미국주식 입문, ETF, REITs, 옵션, 기술적 분석, 원자재·암호화폐, ISA·연금, 채권·금리, PER·배당, 재무제표, 가치투자, DCA, 세금까지 Investus 오리지널 심화 가이드.",
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
            미국주식 투자에 필요한 개념을 Investus 편집팀이 직접 쓴 심화 가이드로 정리했습니다.
            입문부터 원자재·암호화폐, ISA·연금, 밸류에이션·매크로·세금까지 한곳에서 읽을 수 있습니다.
          </p>
        </div>

        <LearnHubCards />

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
