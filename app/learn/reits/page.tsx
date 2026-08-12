import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "REITs 부동산 ETF 가이드 — 금리·배당·VNQ | 인베스트어스",
  description: "리츠(REITs)와 부동산 ETF의 구조, 금리와의 관계, 배당소득, VNQ·IYR 등 대표 상품.",
  alternates: { canonical: "https://www.investus.kr/learn/reits" },
};

export default function ReitsPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(96,165,250,0.15)", color: "#60a5fa" }}>자산</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 16분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>REITs 부동산 ETF 가이드</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            리츠는 부동산에 간접 투자하면서 배당을 받는 구조입니다. 금리·공실률·섹터(오피스·창고·주거)가 주가를 움직입니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>REIT란</h2>
            <p className="text-sm leading-relaxed mb-2">
              Real Estate Investment Trust — 상업용·주거용 부동산·모기지를 보유·운용하는 회사. 이익의 대부분을 배당으로 지급하는 조건으로 법인세를 감면받는 구조가 일반적입니다.
            </p>
            <p className="text-sm leading-relaxed">
              개인이 건물을 사지 않고도 부동산 임대수익·시세 변동에 노출됩니다. 주식처럼 거래소에서 사고팔 수 있습니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>금리와의 관계</h2>
            <p className="text-sm leading-relaxed mb-2">
              금리↑ → 대출 비용↑, 채권 상대 매력↑ → 리츠 밸류에이션 압박이 자주 나타납니다. 금리↓·완만한 성장 국면에서는 임대·리파이낸싱에 우호적일 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/bonds" style={{ color: "var(--mint)" }}>채권·10년물</Link>·<Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>연준</Link> 흐름과 함께 보는 것이 좋습니다. &ldquo;리츠=항상 안전&rdquo;은 아닙니다 — 2022년 금리 급등기에 크게 빠졌습니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>섹터별 차이</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li>산업·물류 — 이커머스·창고 수요</li>
              <li>주거·아파트 — 인구·임대료 인상</li>
              <li>데이터센터 — AI·클라우드 수혜, 전력 비용 리스크</li>
              <li>오피스 — 재택근무로 구조적 압박이 큰 구간도 있음</li>
              <li>리테일·헬스케어 — 점포·병원 임대 사이클</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>대표 ETF</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li><strong style={{ color: "var(--text)" }}>VNQ</strong> — 미국 리츠 광범위</li>
              <li><strong style={{ color: "var(--text)" }}>IYR</strong> — 미국 부동산</li>
              <li><strong style={{ color: "var(--text)" }}>SCHH</strong> — 저비용 리츠</li>
            </ul>
            <p className="text-sm leading-relaxed mt-2">
              배당수익률이 높아 보이지만, <Link href="/learn/dividend" style={{ color: "var(--mint)" }}>배당</Link>만 보고 사면 원금 변동을 간과하기 쉽습니다. 한국 거주자는 미국 상장 ETF 배당에 원천징수·양도세가 적용됩니다 (<Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>세금 가이드</Link>).
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>포트폴리오 역할</h2>
            <p className="text-sm leading-relaxed">
              주식·채권과 상관이 완전히 다르진 않지만, 인컴·부동산 노출용 <em>위성</em>으로 쓰는 경우가 많습니다. 코어는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>지수 ETF</Link>, 리츠는 소수 비중 + <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>리밸런싱</Link>이 현실적입니다.
            </p>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 리츠·부동산 ETF 특정 종목 권유가 아닙니다.
          </div>
        </article>
      </main>
    </div>
  );
}
