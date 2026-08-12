import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "재무제표 읽기 — 손익·재무·현금흐름 | 인베스트어스",
  description: "미국 주식 10-K·10-Q에서 손익계산서, 재무상태표, 현금흐름표를 읽는 법.",
  alternates: { canonical: "https://www.investus.kr/learn/financial-statements" },
};

export default function FinancialStatementsPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa" }}>분석</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 17분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>재무제표 읽기</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            미국 상장사는 SEC에 10-K(연간)·10-Q(분기)를 공시합니다.
            앱 차트만 보지 말고, <em>돈이 어디서 와서 어디로 갔는지</em> 한 번은 직접 확인해 보세요.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>세 장의 표</h2>
            <div className="flex flex-col gap-2">
              {[
                ["손익계산서 (Income Statement)", "매출 → 비용 → 영업이익 → 순이익. '얼마나 벌었나'."],
                ["재무상태표 (Balance Sheet)", "자산 = 부채 + 자본. 특정 시점의 체력."],
                ["현금흐름표 (Cash Flow)", "영업·투자·재무 활동으로 현금이 어떻게 움직였나. 이익과 현금은 다를 수 있음."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>손익계산서에서 볼 것</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>매출(Revenue)</strong> — YoY 성장률, 계절성</li>
              <li><strong style={{ color: "var(--text)" }}>영업이익률</strong> — 마진이 줄면 경쟁·원가 압박</li>
              <li><strong style={{ color: "var(--text)" }}>EPS</strong> — <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER</Link>의 분모</li>
              <li>일회성 항목 — 자산 매각 이익 등은 제외하고 추세 판단</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>재무상태표에서 볼 것</h2>
            <p className="text-sm leading-relaxed mb-2">현금·단기투자, 총부채, 자기자본. 부채/자기자본 비율이 갑자기 튀면 위험 신호일 수 있습니다.</p>
            <p className="text-sm leading-relaxed">은행·보험은 레버리지가 구조적으로 높아 일반 제조업 기준으로 비교하면 안 됩니다.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>현금흐름표 — 가장 중요한 한 줄</h2>
            <p className="text-sm leading-relaxed mb-2">
              <strong style={{ color: "var(--text)" }}>영업활동현금흐름(OCF)</strong>이 순이익과 함께 꾸준히 플러스인지.
              이익은 나는데 현금이 줄면 매출채권·재고가 불어나거나 회계 조정 가능성을 의심해 볼 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">FCF(잉여현금흐름) ≈ OCF − 설비투자(CapEx). 배당·자사주·부채 상환 여력과 연결됩니다.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>어디서 보나</h2>
            <p className="text-sm leading-relaxed">
              SEC EDGAR, 기업 IR, Yahoo Finance·Investus 검색 종목 페이지.
              실적 시즌에는 <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>어닝</Link> 전후 변동성이 커지므로 숫자만 보고 매매하지 마세요.
            </p>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 회계 해석·투자 판단은 본인 책임입니다.
          </div>
        </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
