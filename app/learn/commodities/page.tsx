import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "원자재 투자 가이드 — 금·유가·농산물·ETF | 인베스트어스",
  description: "금, 원유, 천연가스, 농산물 등 원자재가 주식·인플레이션·포트폴리오에 미치는 영향과 대표 ETF.",
  alternates: { canonical: "https://www.investus.kr/learn/commodities" },
};

export default function CommoditiesPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24" }}>자산</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 16분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>원자재 투자 가이드</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            금·유가·농산물은 주식과 다른 사이클을 탑니다. 인플레이션 헤지·분산·매크로 읽기에 쓰이지만, 변동성도 큽니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>원자재란</h2>
            <p className="text-sm leading-relaxed mb-2">
              실물 자산 — 금·은 같은 귀금속, 원유·천연가스 같은 에너지, 밀·옥수수 같은 농산물, 구리·알루미늄 같은 산업금속. 가격은 <em>수급·지정학·달러·금리</em>에 민감합니다.
            </p>
            <p className="text-sm leading-relaxed">
              주식은 기업 이익에, 원자재는 <strong style={{ color: "var(--text)" }}>실물 수요</strong>에 더 가깝게 반응합니다. 레이 달리오식 올웨더 포트폴리오에서 원자재·금은 주식과 상관이 낮은 축으로 자주 언급됩니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>금(Gold)</h2>
            <p className="text-sm leading-relaxed mb-2">
              &ldquo;안전자산&rdquo; 프레임 — 실질금리↓·달러↓·지정학 리스크↑ 때 강세인 경우가 많습니다. 이자를 주지 않아 금리가 높은 환경에서는 매력이 떨어질 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              미국 ETF: <strong style={{ color: "var(--text)" }}>GLD</strong>, <strong style={{ color: "var(--text)" }}>IAU</strong>. 금광주(NEM, GOLD 등)는 금 가격 + 채굴 비용·운영 리스크가 함께 작용합니다. Investus에서 <Link href="/learn/sectors" style={{ color: "var(--mint)" }}>에너지·소재 섹터</Link>와 함께 보면 맥락이 잡힙니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>유가·에너지</h2>
            <p className="text-sm leading-relaxed mb-2">
              WTI·브렌트 유가는 인플레이션·에너지주(XOM, CVX)·항공·물류 비용에 직결됩니다. OPEC+, 중동 리스크, 미국 셰일 공급이 변수입니다.
            </p>
            <p className="text-sm leading-relaxed">
              ETF: <strong style={{ color: "var(--text)" }}>USO</strong>(원유, 롤오버 이슈 주의), <strong style={{ color: "var(--text)" }}>XLE</strong>(에너지 섹터 주식). 유가 급등은 <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>CPI·연준</Link> 기대에도 영향을 줍니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>농산물·산업금속</h2>
            <p className="text-sm leading-relaxed mb-2">
              기후·수확·중국 수요가 가격을 움직입니다. 구리는 경기 선행 지표로 자주 인용됩니다. 개별 농산물 선물은 변동성이 매우 큽니다.
            </p>
            <p className="text-sm leading-relaxed">
              분산용: <strong style={{ color: "var(--text)" }}>DBC</strong>(원자재 바스켓), <strong style={{ color: "var(--text)" }}>PDBC</strong> 등. 코어는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>주식 지수 ETF</Link>, 원자재는 소액 위성(5% 내외)이 현실적인 경우가 많습니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>한국 투자자 체크리스트</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li>원자재 ETF도 환율·양도세·배당 과세 적용 (미국 상장 기준)</li>
              <li>선물 기반 ETF는 장기 보유 시 추적 오차·롤 비용</li>
              <li>인플레 헤지 ≠ 항상 수익 — 타이밍과 비중이 중요</li>
              <li><Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>코어·위성</Link> 구조로 과몰입 방지</li>
            </ul>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 원자재·선물 ETF는 변동성이 크며 특정 상품 권유가 아닙니다.
          </div>
        </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
