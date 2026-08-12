import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "배당 투자 가이드 — 배당수익률·배당귀족·DRIP | 인베스트어스",
  description: "미국 배당주·배당 ETF, 배당수익률, SCHD, DRIP, 한국 거주자 세금 개념.",
  alternates: { canonical: "https://www.investus.kr/learn/dividend" },
};

export default function DividendPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>수익</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 15분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>배당 투자 가이드</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            배당은 &ldquo;매달 월급&rdquo;처럼 느껴지지만, 배당만 높다고 좋은 주식은 아닙니다.
            <strong style={{ color: "var(--text)" }}>세후 현금흐름</strong>과 <strong style={{ color: "var(--text)" }}>배당 지속 가능성</strong>을 같이 봅니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>배당수익률</h2>
            <p className="text-sm leading-relaxed">배당수익률 = 연간 배당금 ÷ 주가 × 100%. 주가 $100, 연 $4 배당이면 4%.</p>
            <p className="text-sm leading-relaxed mt-2">수익률이 비정상적으로 높으면(8~10%+) 주가가 급락했거나 배당 삭감 위험이 클 수 있습니다. &ldquo;함정 수익률&rdquo;을 조심하세요.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>배당귀족·아리스토크랫</h2>
            <p className="text-sm leading-relaxed mb-2">배당귀족(Dividend Aristocrats): S&amp;P500 중 25년 이상 연속 배당 인상. JNJ, KO, PG 등.</p>
            <p className="text-sm leading-relaxed">성장은 느려도 현금흐름·방어 성향. SCHD 같은 배당 ETF로 묶어 사는 방법도 있습니다. <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link> 참고.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>DRIP (배당 재투자)</h2>
            <p className="text-sm leading-relaxed">배당금으로 추가 주식을 자동 매수. <Link href="/learn/compound" style={{ color: "var(--mint)" }}>복리</Link> 효과. 성장주(AAPL 등)는 배당보다 자사주·재투자 비중이 클 수 있습니다.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>세금</h2>
            <p className="text-sm leading-relaxed">
              미국 원천징수 후 국내 입금, 금융소득 합산 가능. <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>세금 가이드</Link>.
              배당 전략일수록 세후 수익률을 따로 계산하세요.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>성장 vs 배당</h2>
            <p className="text-sm leading-relaxed">젊은 투자자·장기 적립: 성장·지수 ETF 코어가 흔함. 은퇴·현금흐름: 배당 비중 확대. 둘 다 섞는 <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오</Link>가 현실적입니다.</p>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 배당 정책은 기업 재량이며 삭감·중단 가능.
          </div>
        </article>
      </main>
    </div>
  );
}
