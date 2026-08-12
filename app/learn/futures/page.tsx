import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "선물·프리마켓 읽는 법 | 인베스트어스",
  description: "나스닥·S&P500 선물, 프리·애프터 마켓, 한국 아침에 보는 시장 온도.",
  alternates: { canonical: "https://www.investus.kr/learn/futures" },
};

export default function FuturesPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8" }}>시장</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 14분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>선물·프리마켓 읽는 법</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            한국 시간 아침 뉴스의 &ldquo;나스닥 선물 +1%&rdquo;는 오늘 장 분위기 힌트일 뿐, 종가 예언이 아닙니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>선물(Futures)이란</h2>
            <p className="text-sm leading-relaxed mb-2">미래 특정일·가격에 자산을 사고팔겠다는 계약. 지수·원유·금 등. 정규장이 닫혀도 거래되어 &ldquo;24시간 시장 기대&rdquo;를 반영.</p>
            <p className="text-sm leading-relaxed">ES( S&amp;P500), NQ(나스닥100) 선물이 뉴스에 자주 나옵니다. <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>·<Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>나스닥</Link> 지수와 구분하세요.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>프리·애프터 마켓</h2>
            <p className="text-sm leading-relaxed mb-2">미국 정규장(한국 밤~새벽) 전후로 거래량이 적어 호가 스프레드가 넓습니다. 실적 발표 직후 급등락이 프리마켓에 먼저 나타날 수 있습니다.</p>
            <p className="text-sm leading-relaxed">입문자는 정규장 지정가·유동성 있는 시간대 매매가 안전합니다.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>선물 해석 실수</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li>선물 +1% → 당일 +1% 종가 (X)</li>
              <li>선물만 보고 급매수·급매도 (X)</li>
              <li>발표 30분 전후 변동성 무시 (X)</li>
            </ul>
            <p className="text-sm leading-relaxed mt-2">Investus 홈 선물·지수는 &ldquo;오늘 온도&rdquo; 체크용. <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>CPI·FOMC</Link> 날은 특히 조심.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>레버리지 선물 ETF</h2>
            <p className="text-sm leading-relaxed">개인이 지수 선물을 직접 거래하는 것과, TQQQ 같은 레버리지 ETF는 다릅니다. 후자는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>변동성 감쇠</Link> 문제. 장기 보유 부적합.</p>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 선물·프리마켓 타이밍 매매 권유 아님.
          </div>
        </article>
      </main>
    </div>
  );
}
