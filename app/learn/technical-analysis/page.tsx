import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "기술적 분석 입문 — 이동평균·RSI·지지저항 | 인베스트어스",
  description: "이동평균선, RSI, MACD, 지지·저항 등 차트 분석 기초. 한계와 펀더멘털과의 관계.",
  alternates: { canonical: "https://www.investus.kr/learn/technical-analysis" },
};

export default function TechnicalAnalysisPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8" }}>차트</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 15분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>기술적 분석 입문</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            차트는 &ldquo;시장이 가격에 무엇을 반영했는지&rdquo;를 보는 도구입니다. 미래 예언이 아니라 <em>확률·위험 관리</em>용으로 쓰는 편이 안전합니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>펀더멘털 vs 기술적</h2>
            <p className="text-sm leading-relaxed mb-2">
              펀더멘털 — 실적·밸류에이션·산업 (<Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무</Link>·<Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER</Link>).
            </p>
            <p className="text-sm leading-relaxed">
              기술적 — 가격·거래량 패턴. 단기 트레이더가 많이 쓰지만, 장기 투자자도 &ldquo;과열·침체&rdquo; 참고용으로 볼 수 있습니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>이동평균선 (MA)</h2>
            <p className="text-sm leading-relaxed mb-2">
              일정 기간 종가의 평균. 50일·200일이 자주 쓰입니다. 주가가 200일선 위면 장기 상승 추세, 아래면 약세로 해석하는 단순 규칙이 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>골든크로스</strong> — 단기 MA가 장기 MA를 상향 돌파. <strong style={{ color: "var(--text)" }}>데드크로스</strong> — 하향 돌파. 후행 지표라 이미 많이 움직인 뒤 신호가 나오기도 합니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>RSI</h2>
            <p className="text-sm leading-relaxed">
              Relative Strength Index — 0~100. 보통 70 이상 과매수, 30 이하 과매도로 읽습니다. 강한 상승장에서는 RSI가 오래 70 위에 머물 수 있어, &ldquo;과매수=즉시 매도&rdquo;는 위험합니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>지지·저항</h2>
            <p className="text-sm leading-relaxed">
              과거에 여러 번 반등한 가격대(지지), 여러 번 막힌 가격대(저항). 심리적 라운드 넘버($100, $200)도 자주 언급됩니다. 돌파 후 지지가 저항으로 바뀌는 프레이밍이 흔합니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>한계</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li>같은 차트, 해석은 사람마다 다름</li>
              <li>뉴스·실적 한 방에 패턴이 깨짐</li>
              <li>과최적화(과거만 잘 맞는 지표) 함정</li>
              <li><Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕</Link>과 겹치면 확증 편향 강화</li>
            </ul>
            <p className="text-sm leading-relaxed mt-2">
              Investus 장기 관점에서는 차트보다 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립</Link>·<Link href="/learn/compound" style={{ color: "var(--mint)" }}>복리</Link>·펀더멘털이 우선입니다. 차트는 보조입니다.
            </p>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 차트 신호 기반 매매 권유 아님.
          </div>
        </article>
      </main>
    </div>
  );
}
