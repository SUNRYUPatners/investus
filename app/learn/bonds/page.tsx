import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "채권과 금리 — 10년물·역수익률 가이드 | 인베스트어스",
  description: "채권 가격과 금리의 역관계, 미국 10년물 국채, TLT·AGG, 주식 포트폴리오에서의 역할.",
  alternates: { canonical: "https://www.investus.kr/learn/bonds" },
};

export default function BondsPage() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-10">
        <div className="pt-4 pb-2">
          <Link href="/learn" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-3.5 h-3.5" /> 투자 지식 허브
          </Link>
        </div>
        <div className="mb-6 pt-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(148,163,184,0.15)", color: "#94a3b8" }}>매크로</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 16분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>채권과 금리</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            주식만 보면 시장의 절반을 놓칩니다. 금리와 채권은 주식 밸류에이션·섹터 로테이션·포트폴리오 방어에 직결됩니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>채권이란</h2>
            <p className="text-sm leading-relaxed mb-2">국가·기업이 돈을 빌리며 발행하는 차용증. 만기까지 이자(쿠폰)와 원금 상환. 주식은 소유권, 채권은 채권.</p>
            <p className="text-sm leading-relaxed">수익은 상대적으로 예측 가능하지만, 장기 수익률은 주식보다 낮은 경우가 많습니다. 역할은 <strong style={{ color: "var(--text)" }}>변동 완충</strong>과 <strong style={{ color: "var(--text)" }}>현금흐름</strong>.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>금리 ↑ → 채권 가격 ↓</h2>
            <p className="text-sm leading-relaxed mb-2">새 채권이 더 높은 이자를 주면, 기존(낮은 쿠폰) 채권은 싸져야 팔립니다. 반대로 금리 인하면 채권 가격 상승.</p>
            <p className="text-sm leading-relaxed">2022~2023처럼 급격한 금리 인상기에는 TLT(장기 국채 ETF)도 크게 하락해 &ldquo;채권=안전&rdquo;만 믿으면 위험했습니다. 듀레이션(만기)이 길수록 민감합니다.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>10년물 국채 수익률</h2>
            <p className="text-sm leading-relaxed mb-2">미국 10년물은 &ldquo;무위험 수익률&rdquo; 기준으로 자주 인용됩니다. 10년물↑ → 할인율↑ → 성장주·장기 자산 밸류에이션 압박.</p>
            <p className="text-sm leading-relaxed">Investus 홈·<Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>매크로 가이드</Link>와 함께 장 시작 전 확인.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>역수익률 곡선</h2>
            <p className="text-sm leading-relaxed">2년물 수익률 &gt; 10년물이면 역전. 역사상 경기침체 <em>신호</em>로 자주 언급되지만, 타이밍은 불확실. 공포만 보고 전량 매도는 과잉 반응일 수 있습니다.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>대표 ETF</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li>AGG / BND — 미국 종합 채권</li>
              <li>TLT — 20년+ 장기 국책 (금리 민감)</li>
              <li>SHY / VGSH — 단기 (변동 작음)</li>
            </ul>
            <p className="text-sm leading-relaxed mt-2">입문자는 주식 100%보다 <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>현금·채권 비중</Link>을 의도적으로 두는 편이 심리적으로 유리한 경우가 많습니다.</p>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 채권도 원금 변동·신용 리스크가 있습니다.
          </div>
        </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
