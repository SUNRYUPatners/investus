import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "버핏지수 완전 가이드 — 시장 고평가 여부 판단하는 법 | 인베스트어스",
  description: "워런 버핏이 즐겨 쓰는 버핏지수(총 시가총액/GDP)의 의미, 계산 방법, 역사적 해석, 현재 시장에 적용하는 방법을 완전히 설명합니다.",
  keywords: ["버핏지수", "Buffett Indicator", "시장 고평가", "주식 밸류에이션", "시가총액 GDP 비율"],
  alternates: { canonical: "https://www.investus.kr/learn/buffett-indicator" },
  openGraph: {
    title: "버핏지수 완전 가이드 | 인베스트어스",
    description: "버핏지수로 시장 고평가 여부 판단하기 — 워런 버핏이 시장을 보는 방법",
    url: "https://www.investus.kr/learn/buffett-indicator",
    type: "article",
  },
};

export default function BuffettIndicatorPage() {
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
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(192,132,252,0.15)", color: "#c084fc" }}>밸류</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 8분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            버핏지수 완전 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            워런 버핏이 2001년 Fortune 인터뷰에서 &ldquo;현재 시장 가치 평가를 위한 최고의 단일 지표&rdquo;라고
            소개한 버핏지수. 이 지수 하나만 제대로 이해해도 시장이 싼지 비싼지를 직관적으로 파악할 수 있습니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              버핏지수란 무엇인가
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              버핏지수(Buffett Indicator)는 미국 전체 주식 시가총액을 미국 GDP(국내총생산)로 나눈 비율입니다.
            </p>
            <div className="rounded-2xl p-4 border text-center" style={{ background: "rgba(0,229,160,0.04)", borderColor: "rgba(0,229,160,0.2)" }}>
              <p className="text-base font-bold font-syne mb-1" style={{ color: "var(--mint)" }}>
                버핏지수 = 전체 주식 시가총액 ÷ GDP × 100
              </p>
              <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                예: 시가총액 $45조 ÷ GDP $28조 × 100 = 약 160%
              </p>
            </div>
            <p className="text-sm leading-relaxed mt-3 mb-3">
              이 비율이 높을수록 주식 시장이 실제 경제 규모에 비해 과대평가되어 있다는 뜻이고,
              낮을수록 저평가 상태임을 의미합니다.
            </p>
            <p className="text-sm leading-relaxed">
              버핏이 이 지표를 선호하는 이유는 단순하기 때문입니다. 어떤 복잡한 재무 모델도 없이,
              경제가 만들어내는 가치(GDP)와 시장이 매기는 가격(시가총액)을 직접 비교합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              역사적 기준점 — 어느 수준이 적정한가
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              역사적으로 S&P500과 GDP의 관계를 분석해보면 다음과 같은 구간이 참고 기준이 됩니다.
              단, 이 기준은 고정된 것이 아니며 시대에 따라 변합니다.
            </p>
            <div className="flex flex-col gap-2">
              {[
                { range: "70% 이하", label: "상당히 저평가", action: "강력한 매수 기회 — 역사적으로 흔치 않은 수준", color: "#10b981" },
                { range: "70~100%", label: "적정 가치", action: "균형 잡힌 시장 — 정상적인 투자 환경", color: "#7ed957" },
                { range: "100~140%", label: "다소 고평가", action: "신중한 투자 필요 — 신규 진입 시 분산 철저히", color: "#ffd166" },
                { range: "140~180%", label: "고평가", action: "경계 구간 — 버핏은 이 시기에 현금을 쌓았음", color: "#ff8c55" },
                { range: "180% 이상", label: "극단적 고평가", action: "역사적으로 큰 조정이 뒤따른 수준", color: "#ef4444" },
              ].map((z) => (
                <div key={z.range} className="rounded-xl p-3 border flex gap-3 items-start"
                  style={{ background: "var(--card)", borderColor: "var(--border)", borderLeft: `3px solid ${z.color}` }}>
                  <div className="flex-shrink-0">
                    <p className="text-sm font-bold font-mono-num" style={{ color: z.color }}>{z.range}</p>
                    <p className="text-[10px] font-bold mt-0.5" style={{ color: z.color }}>{z.label}</p>
                  </div>
                  <p className="text-[11px] leading-relaxed">{z.action}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              역사적 사례 — 버핏지수가 경고했을 때
            </h2>
            <div className="flex flex-col gap-3">
              {[
                {
                  period: "2000년 닷컴버블 정점",
                  level: "버핏지수 약 148%",
                  result: "이후 S&P500 -49%, NASDAQ -78% 폭락 (2000~2002년)",
                  color: "#ef4444",
                },
                {
                  period: "2007년 금융위기 직전",
                  level: "버핏지수 약 110%",
                  result: "이후 S&P500 -57% 하락 (2007~2009년)",
                  color: "#f59e0b",
                },
                {
                  period: "2009년 금융위기 저점",
                  level: "버핏지수 약 65%",
                  result: "이후 10년간 미국 주식 역대 최장 강세장",
                  color: "#10b981",
                },
                {
                  period: "2021년 코로나 이후 과열",
                  level: "버핏지수 약 195%",
                  result: "2022년 S&P500 -25%, NASDAQ -33% 조정",
                  color: "#ef4444",
                },
              ].map((s) => (
                <div key={s.period} className="rounded-xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="flex items-start gap-2 mb-1.5">
                    <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{s.period}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 font-bold"
                      style={{ background: `${s.color}20`, color: s.color }}>
                      {s.level}
                    </span>
                  </div>
                  <p className="text-[12px] leading-relaxed" style={{ color: s.color }}>{s.result}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              버핏지수의 한계 — 맹목적으로 믿으면 안 되는 이유
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              버핏지수는 유용하지만 완벽하지 않습니다. 특히 최근에는 다음과 같은 이유로
              역사적 기준보다 높은 수준이 &ldquo;정상&rdquo;일 수 있다는 시각도 있습니다.
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: "초저금리 시대의 구조 변화",
                  desc: "금리가 낮으면 미래 수익의 현재 가치(DCF 밸류에이션)가 높아집니다. 2010년대 이후 저금리 기조가 지속되면서 버핏지수 기준도 올라갔다는 주장이 있습니다.",
                },
                {
                  title: "미국 기업의 글로벌 수익 증가",
                  desc: "Apple, Google, Microsoft는 전 세계에서 돈을 법니다. 하지만 버핏지수는 미국 GDP만 분모로 씁니다. 미국 기업의 해외 매출 비중이 커질수록 버핏지수가 자연스럽게 높아집니다.",
                },
                {
                  title: "빅테크 집중화",
                  desc: "상위 10개 기업이 S&P500 전체의 30% 이상을 차지합니다. 소수 기업의 시가총액이 천문학적으로 커지면서 전체 지수를 끌어올립니다.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{item.title}</p>
                  <p className="text-[12px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl px-4 py-3 mt-3" style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.2)" }}>
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                결론: 버핏지수는 &ldquo;단기 타이밍 도구&rdquo;가 아닙니다
              </p>
              <p className="text-[12px] leading-relaxed mt-1.5">
                시장이 비싸 보인다고 해서 당장 팔고 빠져나올 신호가 아닙니다.
                장기적인 리스크 관리와 포지션 사이즈 조절에 참고하는 것이 올바른 활용법입니다.
                버핏 본인도 이 지표가 높아도 좋은 기업은 계속 보유했습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              Investus에서 실시간 확인하기
            </h2>
            <p className="text-sm leading-relaxed">
              Investus <Link href="/" style={{ color: "var(--mint)" }}>홈 화면</Link>에서
              현재 버핏지수 수치를 실시간으로 확인할 수 있습니다.
              공포&탐욕 지수와 함께 활용하면 시장의 전반적인 온도를 더 정확하게 파악할 수 있습니다.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 이 글은 교육 목적의 투자 정보로, 특정 매매 시점을 추천하지 않습니다.
            버핏지수는 참고 지표일 뿐이며, 모든 투자 결정의 책임은 투자자 본인에게 있습니다.
          </div>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/portfolio-strategy" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">💼</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>포트폴리오 분산 투자 전략</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>흔들리지 않는 포트폴리오 구성법</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/us-stock-basics" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🇺🇸</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>미국주식 투자 완전 입문 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>처음 시작하는 투자자를 위한 A to Z</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
