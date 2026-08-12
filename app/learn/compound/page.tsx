import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "복리와 장기 투자 — 시간이 수익을 만드는 원리 | 인베스트어스",
  description: "복리 효과, 장기 지수 투자, DCA와의 관계, 초기·중기·후기 차이.",
  alternates: { canonical: "https://www.investus.kr/learn/compound" },
};

export default function CompoundPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>원리</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 14분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>복리와 장기 투자</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            아인슈타인이 &ldquo;8번째 불가사의&rdquo;라 부른 복리는 마법이 아니라 <em>시간 × 수익 재투자</em>의 수학입니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>단리 vs 복리</h2>
            <p className="text-sm leading-relaxed mb-2">단리: 이자만 받고 원금 고정. 복리: 이자까지 다시 투자해 다음 기간 수익의 기준이 커짐.</p>
            <p className="text-sm leading-relaxed">연 7% 가정 시 $10,000을 30년 — 단리 $31,000 vs 복리 $76,000대(세전·수수료 제외 단순 예시). 후반 10년이 전반 10년보다 절대 증가액이 클 수 있습니다.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>72의 법칙</h2>
            <p className="text-sm leading-relaxed">72 ÷ 연 수익률(%) ≈ 원금 2배 년수. 7%면 약 10년. 대략적 mental math용.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>복리를 깎는 것들</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li>잦은 매매 — 수수료·세금·슬리피지</li>
              <li>운용보수 높은 상품</li>
              <li>중간에 전량 인출·중단</li>
              <li>레버리지 ETF 장기 보유</li>
            </ul>
            <p className="text-sm leading-relaxed mt-2"><Link href="/learn/etf" style={{ color: "var(--mint)" }}>저비용 ETF</Link> + <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link> + <Link href="/learn/dividend" style={{ color: "var(--mint)" }}>DRIP</Link>이 복리 친화적 조합.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>S&amp;P500과 역사</h2>
            <p className="text-sm leading-relaxed">장기 nominal 연 ~10%대(세전)가 자주 인용됩니다. 그 사이 50% 하락도 있었습니다. 복리는 <em>변동성을 견디고</em> 시간을 줬을 때 의미가 있습니다. <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>심리</Link>가 없으면 복리도 없습니다.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>현실적 기대</h2>
            <p className="text-sm leading-relaxed">미래 30년도 과거 30년과 같지 않습니다. 복리는 &ldquo;부자 되는 공식&rdquo;이 아니라, 규칙적인 저축·투자를 장기화할 때 작동하는 레버입니다.</p>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 과거 수익률·복리 예시는 미래 보장 아님.
          </div>
        </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
