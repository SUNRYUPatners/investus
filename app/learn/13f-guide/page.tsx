import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "13F·기관 포트폴리오 읽는 법 | 인베스트어스",
  description: "SEC 13F 공시, 투자 대가·헤지펀드 보유 종목 해석법과 한계. 단순 모방의 위험.",
  alternates: { canonical: "https://www.investus.kr/learn/13f-guide" },
};

export default function ThirteenFGuidePage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(212,175,55,0.15)", color: "#d4af37" }}>기관</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 15분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>13F·기관 포트폴리오 읽는 법</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            13F는 &ldquo;대가 따라 사기&rdquo;용 치트키가 아닙니다. <em>과거 스냅샷</em>을 참고 자료로 읽는 법을 정리합니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>13F란</h2>
            <p className="text-sm leading-relaxed">미국 SEC에 일정 규모 이상 기관이 분기별로 제출하는 미국 상장 주식·옵션 등 보유 공시. Investus 검색 탭의 투자 대가 섹션이 이 데이터를 참고합니다.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>한계 (중요)</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li>공시 시점이 이미 45일 이상 지난 경우가 많음</li>
              <li>그 사이 매도·추가 매수 가능</li>
              <li>숏·파생·비미국 자산은 일부만 보이거나 안 보임</li>
              <li>버핏도 분기마다 포지션을 바꿈 — 맹목적 복제 위험</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>어떻게 쓰나</h2>
            <p className="text-sm leading-relaxed mb-2">아이디어 소스: &ldquo;왜 이 기관이 이 섹터에 비중을 늘렸나?&rdquo; → <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무</Link>·<Link href="/learn/valuation" style={{ color: "var(--mint)" }}>밸류</Link>로 직접 검증.</p>
            <p className="text-sm leading-relaxed">코어는 여전히 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>지수 ETF</Link>. 대가 종목은 위성·소수 비중 (<Link href="/learn/value-investing" style={{ color: "var(--mint)" }}>가치투자 가이드</Link>).</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>Investus에서</h2>
            <p className="text-sm leading-relaxed">검색 탭 → 13F / 투자 대가. 숫자는 참고용이며 매수 신호가 아닙니다. <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>매수 체크리스트</Link>와 함께 쓰세요.</p>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 13F 기반 모방 투자는 손실을 초래할 수 있습니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
