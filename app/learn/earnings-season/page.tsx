import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "실적 시즌 읽는 법 — EPS·가이던스·컨센서스 | 인베스트어스",
  description: "어닝 시즌에서 EPS, 컨센서스 비트/미스, 가이던스를 어떻게 읽는지. 한국 투자자용 체크리스트.",
  alternates: { canonical: "https://www.investus.kr/learn/earnings-season" },
};

export default function EarningsSeasonPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(192,132,252,0.15)", color: "#c084fc" }}>시장</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 16분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>실적 시즌 읽는 법</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            분기마다 돌아오는 어닝 시즌. 숫자 한 줄보다 <em>가이던스·컨센서스·서술</em>이 주가를 움직이는 경우가 많습니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>언제인가</h2>
            <p className="text-sm leading-relaxed">보통 1·4·7·10월 전후. 대형 빅테크가 같은 주에 몰리면 지수 전체가 출렁입니다. Investus 리포트·홈 매크로와 함께 보세요.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>EPS·매출 vs 컨센서스</h2>
            <p className="text-sm leading-relaxed mb-2">컨센서스 = 애널리스트 예상 평균. 비트(beat)여도 가이던스가 약하면 하락, 미스여도 가이던스가 강하면 반등하는 경우가 있습니다.</p>
            <p className="text-sm leading-relaxed"><Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link>·<Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER</Link>로 숫자가 스토리와 맞는지 검증하세요.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>가이던스가 더 중요할 때</h2>
            <p className="text-sm leading-relaxed">시장은 &ldquo;이미 아는 실적&rdquo;보다 &ldquo;앞으로의 이익&rdquo;에 가격을 매깁니다. 경영진의 다음 분기·연간 전망, 마진·수요 코멘트를 먼저 읽으세요.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>발표 직후 주의</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li>프리·애프터 마켓 유동성 낮음 (<Link href="/learn/futures" style={{ color: "var(--mint)" }}>선물·프리마켓</Link>)</li>
              <li>헤드라인만 보고 올인·전량 매도 금지</li>
              <li>코어 ETF는 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립</Link> 유지, 위성만 재평가</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>체크리스트</h2>
            <ol className="list-decimal pl-5 text-sm leading-relaxed space-y-1">
              <li>EPS·매출 vs 컨센서스</li>
              <li>가이던스·마진·수요 코멘트</li>
              <li>자사주·배당·부채 변화</li>
              <li>섹터 피어와 비교 (<Link href="/learn/sectors" style={{ color: "var(--mint)" }}>섹터</Link>)</li>
              <li>본인 비중·투자 기간과 맞는지</li>
            </ol>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 실적 해석·매매 권유가 아닙니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
