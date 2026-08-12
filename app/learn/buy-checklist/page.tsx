import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "매수 전 체크리스트 10가지 | 인베스트어스",
  description: "미국주식·ETF 매수 전에 확인할 비중·밸류·리스크·세금·심리 체크리스트.",
  alternates: { canonical: "https://www.investus.kr/learn/buy-checklist" },
};

export default function BuyChecklistPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>습관</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 14분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>매수 전 체크리스트</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            FOMO로 사기 전에 10가지만 적어두세요. 규칙은 <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>심리</Link>를 이기는 도구입니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>1~3. 포지션</h2>
            <ol className="list-decimal pl-5 text-sm leading-relaxed space-y-1">
              <li>이 종목/ETF가 코어인가 위성인가? (<Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오</Link>)</li>
              <li>전체 자산 대비 비중 상한은? (예: 단일 종목 10% 이내)</li>
              <li>살 돈은 비상금·생활비와 분리됐는가?</li>
            </ol>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>4~6. 숫자</h2>
            <ol start={4} className="list-decimal pl-5 text-sm leading-relaxed space-y-1">
              <li>무엇을 보고 사는가? (실적·테마·차트) — 한 문장으로</li>
              <li><Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER·밸류</Link> 또는 지수 ETF라면 추적·보수 확인</li>
              <li>반대 시나리오 3가지를 적어 봤는가?</li>
            </ol>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>7~8. 비용·세금</h2>
            <ol start={7} className="list-decimal pl-5 text-sm leading-relaxed space-y-1">
              <li>환율·수수료·슬리피지 감안했는가? (<Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율</Link>)</li>
              <li>계좌는 일반·ISA·연금 중 어디가 맞나? (<Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA</Link>·<Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>세금</Link>)</li>
            </ol>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>9~10. 심리·계획</h2>
            <ol start={9} className="list-decimal pl-5 text-sm leading-relaxed space-y-1">
              <li>뉴스·단톡·유튜브 자극으로 산 건 아닌가?</li>
              <li>-20%·+30% 때 할 행동을 미리 적었는가? (손절·익절·리밸런싱)</li>
            </ol>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>한 줄 규칙</h2>
            <p className="text-sm leading-relaxed">10개 중 7개 이상 &ldquo;예&rdquo;가 아니면 오늘은 사지 않고, <Link href="/learn/dca" style={{ color: "var(--mint)" }}>코어 적립</Link>만 유지합니다.</p>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 매수·매도 권유가 아닙니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
