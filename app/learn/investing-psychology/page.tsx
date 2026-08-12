import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "투자 심리·행동재무 가이드 — FOMO·손실 회피 | 인베스트어스",
  description: "행동재무학, FOMO, 손실 회피, 공포탐욕, 규칙으로 막는 실수.",
  alternates: { canonical: "https://www.investus.kr/learn/investing-psychology" },
};

export default function InvestingPsychologyPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>심리</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 15분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>투자 심리·행동재무</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            차트·PER을 아는 것보다, 본인 뇌를 아는 게 수익률에 더 클 때가 많습니다.
            아래는 흔한 함정과 막는 <em>규칙</em>입니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>FOMO (놓칠까 두려움)</h2>
            <p className="text-sm leading-relaxed">NVDA +200% 뉴스 후 올인. 이미 대부분의 기대가 가격에 반영됐을 수 있습니다. &ldquo;이번만&rdquo;은 누적하면 레버리지·테마 집중이 됩니다.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>손실 회피</h2>
            <p className="text-sm leading-relaxed mb-2">-20% 종목을 안 팔고 -50%까지. 같은 돈 잃는 것인데, 회복 필요 수익률은 더 큽니다(-50% → +100% 필요).</p>
            <p className="text-sm leading-relaxed">손절 규칙(예: 단일 종목 -25% 시 재평가)을 미리 적어 두면 감정 개입이 줄어듭니다. 코어 ETF는 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립 유지</Link>, 위성만 손절 대상.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>확증 편향</h2>
            <p className="text-sm leading-relaxed">내가 산 주식 좋은 뉴스만 찾기. 반대 근거 3개를 의무적으로 적어 보세요. <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무</Link> 숫자가 스토리와 다르면 스토리를 의심.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>공포·탐욕 사이클</h2>
            <p className="text-sm leading-relaxed"><Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕지수</Link>는 참고용. 극단 공포에서 적립 유지·소폭 증액(규칙 있을 때만), 극단 탐욕에서 신규 베팅 자제.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>실전 규칙 예시</h2>
            <ol className="list-decimal pl-5 text-sm leading-relaxed space-y-1">
              <li>투자 원금·손실 한도를 숫자로 적기</li>
              <li>코어/위성 비중 — <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오</Link></li>
              <li>주 1회 이하 포트폴리오 점검 (매일 X)</li>
              <li>뉴스 헤드라인으로 매매 금지</li>
            </ol>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>대가들도 심리와 싸웠다</h2>
            <p className="text-sm leading-relaxed"><Link href="/learn/value-investing" style={{ color: "var(--mint)" }}>버핏·막스</Link>도 '시장과 싸우지 말라' 'Bad days will happen'을 반복했습니다. 철학은 감정이 없을 때 쓰는 비상 매뉴얼입니다.</p>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 투자 심리 상담·치료가 아닙니다.
          </div>
        </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
