import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "PER·PBR·기업 가치 평가 가이드 | 인베스트어스",
  description: "PER, PBR, EV/EBITDA 등 밸류에이션 지표를 한국 투자자 눈높이로 설명합니다.",
  alternates: { canonical: "https://www.investus.kr/learn/valuation" },
};

export default function ValuationPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(192,132,252,0.15)", color: "#c084fc" }}>분석</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 16분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>PER·PBR·기업 가치 평가</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            &ldquo;PER 10이면 싸다&rdquo;는 말은 업종·성장률·금리 환경 없이는 의미가 없습니다.
            지표는 <strong style={{ color: "var(--text)" }}>비교 도구</strong>이지, 매수 버튼이 아닙니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>PER (주가수익비율)</h2>
            <p className="text-sm leading-relaxed mb-2">PER = 주가 ÷ EPS(주당순이익). &ldquo;이익의 몇 배를 주고 사는가&rdquo;입니다.</p>
            <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed">
              <li>성장주(NVDA 등): PER 30~50도 &ldquo;성장 기대&rdquo;가 반영될 수 있음</li>
              <li>성숙·저성장: PER 10~15가 흔함</li>
              <li>적자 기업: PER 무의미 → P/S(매출 배수) 등 다른 지표</li>
            </ul>
            <p className="text-sm leading-relaxed mt-2">동종 업계 평균·과거 5년 PER 대비 현재 위치를 함께 봅니다.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>PBR (주가순자산비율)</h2>
            <p className="text-sm leading-relaxed mb-2">PBR = 주가 ÷ BPS(주당순자산). 1 미만은 장부가치보다 싸게 거래된다는 뜻이지만, 자산이 실제 가치보다 과대평가됐거나 사업이 쇠퇴 중일 수 있습니다.</p>
            <p className="text-sm leading-relaxed">금융·제조 등 자산이 큰 업종에서 자주 씁니다. IT·SaaS는 자산 대비 이익 창출이 커서 PBR만으로 판단하기 어렵습니다.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>EV/EBITDA</h2>
            <p className="text-sm leading-relaxed mb-2">기업가치(EV)를 영업현금에 가까운 EBITDA로 나눈 값. 부채가 많은 기업을 PER만으로 비교할 때 왜곡이 줄어듭니다.</p>
            <p className="text-sm leading-relaxed">M&amp;A·사모펀드에서 자주 쓰는 지표입니다. 개인 투자자도 레버리지가 큰 종목을 볼 때 참고합니다.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>PER·PBR을 같이 볼 때</h2>
            <div className="rounded-xl p-3 border space-y-2 text-[12px]" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>PER↑ PBR↑</strong> — 성장·기대 반영, 고평가 논쟁 구간</p>
              <p><strong style={{ color: "var(--text)" }}>PER↓ PBR↓</strong> — 실적 악화·구조적 쇠퇴 가능, &ldquo;싸다&rdquo; 함정</p>
              <p><strong style={{ color: "var(--text)" }}>PER↑ PBR 보통</strong> — 수익성은 좋으나 자산 대비 프리미엄</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              <Link href="/learn/buffett-indicator" style={{ color: "var(--mint)" }}>버핏지수</Link>는 시장 전체 밸류에이션,
              <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link>는 PER·PBR의 분모(EPS·BPS)를 검증합니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>실전 체크리스트</h2>
            <ol className="list-decimal pl-5 space-y-1 text-sm leading-relaxed">
              <li>같은 섹터 3~5개 종목 PER·PBR 나란히</li>
              <li>최근 4분기 EPS 추세 (일회성 제외)</li>
              <li>부채·현금 — EV 관점</li>
              <li>성장률 대비 PER (PEG 개념) — 대략적 sanity check</li>
            </ol>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 저PER·저PBR이 항상 매수 신호는 아닙니다.
          </div>
        </article>
      </main>
    </div>
  );
}
