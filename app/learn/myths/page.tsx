import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "초보 투자 오해 TOP10 | 인베스트어스",
  description: "미국주식 초보가 자주 하는 오해 10가지 — 레버리지, 타이밍, 대가 복제, 세금.",
  alternates: { canonical: "https://www.investus.kr/learn/myths" },
};

export default function MythsPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(248,113,113,0.15)", color: "#f87171" }}>입문</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 15분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>초보 투자 오해 TOP10</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            &ldquo;다들 아는 상식&rdquo;이 계좌를 깎는 경우가 많습니다. 짧게 깨뜨려 봅니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          {[
            ["1. 바닥·천장을 맞출 수 있다", <>못 맞춥니다. 그래서 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link>가 있습니다.</>],
            ["2. 레버리지 ETF는 장기 복리 머신", <>변동성 감쇠. 장기 코어 부적합 (<Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF</Link>).</>],
            ["3. 버핏이 샀으니 나도", <>13F는 과거 스냅샷 (<Link href="/learn/13f-guide" style={{ color: "var(--mint)" }}>13F 가이드</Link>).</>],
            ["4. 손실 종목은 본전 오면 판다", <>기회비용. 규칙 없는 물타기는 위험 (<Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>심리</Link>).</>],
            ["5. 배당만 높으면 좋은 주식", <>원금·삭감 리스크 (<Link href="/learn/dividend" style={{ color: "var(--mint)" }}>배당</Link>).</>],
            ["6. 미국주식은 세금이 없다", <>양도·배당 과세 (<Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>세금</Link>).</>],
            ["7. 환율은 무시해도 된다", <>원화 수익률이 달라집니다 (<Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율</Link>).</>],
            ["8. 차트 신호 = 확정 수익", <>보조 도구일 뿐 (<Link href="/learn/technical-analysis" style={{ color: "var(--mint)" }}>기술적 분석</Link>).</>],
            ["9. 옵션으로 빨리 부자", <>원금 전액 손실 가능 (<Link href="/learn/options" style={{ color: "var(--mint)" }}>옵션</Link>).</>],
            ["10. 매일 봐야 수익이 난다", <>과매매가 복리를 깎습니다 (<Link href="/learn/compound" style={{ color: "var(--mint)" }}>복리</Link>).</>],
          ].map(([title, body]) => (
            <section key={title as string}>
              <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>{title}</h2>
              <p className="text-sm leading-relaxed">{body}</p>
            </section>
          ))}
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 투자 권유가 아닙니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
