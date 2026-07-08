import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "S&P500 완전 가이드 — 미국 경제의 온도계를 읽는 법 | 인베스트어스",
  description: "S&P500 지수의 의미, 구성 방식, 역사적 성과, 투자 방법까지 완전 가이드. 미국주식 투자자가 가장 먼저 이해해야 할 지수를 쉽게 설명합니다.",
  keywords: ["S&P500", "S&P500 지수", "S&P500 ETF", "미국 지수", "SPY", "VOO", "미국주식 지수"],
  alternates: { canonical: "https://www.investus.kr/learn/sp500" },
  openGraph: {
    title: "S&P500 완전 가이드 | 인베스트어스",
    description: "S&P500의 구성, 역사적 성과, 투자 방법까지 — 미국 경제의 온도계 완벽 이해",
    url: "https://www.investus.kr/learn/sp500",
    type: "article",
  },
};

export default function SP500Page() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-10">

        {/* Back */}
        <div className="pt-4 pb-2">
          <Link href="/learn" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-3.5 h-3.5" /> 투자 지식 허브
          </Link>
        </div>

        <div className="mb-6 pt-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(96,165,250,0.15)", color: "#60a5fa" }}>지수</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 10분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            S&P500 완전 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            미국주식 투자자라면 반드시 이해해야 할 S&P500 지수.
            무엇으로 구성되고, 어떻게 움직이며, 어떻게 투자하는지 완전히 이해하면
            미국 경제의 흐름을 읽는 눈이 생깁니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              S&P500이란 무엇인가
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              S&P500(Standard & Poor&apos;s 500)은 미국 증시에 상장된 대형주 500개로 구성된 주가지수입니다.
              S&P 글로벌이 매 분기 구성 종목을 검토하며, 시가총액 가중 방식으로 계산됩니다.
              즉, Apple이나 NVIDIA처럼 시가총액이 큰 기업이 지수에 미치는 영향이 더 큽니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              S&P500은 단순히 &ldquo;주가 지수&rdquo;가 아닙니다. 미국 경제 전체의 건강 상태를 나타내는
              가장 중요한 경제 지표 중 하나입니다. 전 세계 기관투자자, 중앙은행, 연기금이
              S&P500을 기준 벤치마크로 사용합니다.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>S&P500 편입 조건</p>
              <div className="flex flex-col gap-1.5 text-sm">
                {[
                  "시가총액 최소 $145억 달러 이상",
                  "연속 4분기 순이익 흑자",
                  "NYSE 또는 NASDAQ 상장",
                  "최소 유통 주식 비율 50% 이상",
                  "최소 1년 이상 상장 이력",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span style={{ color: "var(--mint)" }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              S&P500의 섹터 구성
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              S&P500은 GICS(글로벌 산업 분류 기준)에 따라 11개 섹터로 나뉩니다.
              2024년 기준 비중이 가장 높은 섹터는 정보기술(IT) 섹터로 약 30%를 차지합니다.
              Apple, Microsoft, NVIDIA, Alphabet이 모두 이 섹터에 포함됩니다.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>주요 섹터 비중 (2024년 기준)</p>
              <div className="flex flex-col gap-2">
                {[
                  ["정보기술 (IT)", "~30%", "#10b981"],
                  ["금융 (Financials)", "~13%", "#60a5fa"],
                  ["헬스케어 (Healthcare)", "~12%", "#c084fc"],
                  ["임의소비재 (Consumer Disc.)", "~10%", "#f59e0b"],
                  ["커뮤니케이션 (Communication)", "~9%", "#fb923c"],
                  ["산업재 (Industrials)", "~8%", "#e879f9"],
                ].map(([sector, pct, color]) => (
                  <div key={sector} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="flex-1 text-sm">{sector}</span>
                    <span className="text-sm font-bold font-mono-num" style={{ color }}>{pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              S&P500의 역사적 성과
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              S&P500의 장기 연평균 수익률(CAGR)은 배당 재투자 포함 약 10~11%입니다.
              물가 상승률을 감안한 실질 수익률도 연 7% 내외로, 장기 투자 시 자산을
              크게 불릴 수 있는 강력한 도구입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              물론 S&P500도 급락을 겪습니다. 2000년 닷컴버블 붕괴, 2008년 금융위기,
              2020년 코로나 충격 때 각각 -50% 이상 하락했습니다.
              하지만 매번 이전 고점을 회복하고 신고점을 경신해왔습니다.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "rgba(0,229,160,0.04)", borderColor: "rgba(0,229,160,0.2)" }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "var(--mint)" }}>📊 핵심 통계</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["장기 연평균 수익률", "약 10~11%"],
                  ["$10,000 → 30년 후", "약 $174,000"],
                  ["역대 최대 낙폭", "-56.8% (2009년)"],
                  ["평균 회복 기간", "약 2~3년"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl p-3" style={{ background: "rgba(0,0,0,0.2)" }}>
                    <p className="text-[10px] mb-0.5" style={{ color: "var(--muted)" }}>{label}</p>
                    <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              S&P500 vs NASDAQ vs DOW — 차이점
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              세 지수는 미국 주식시장의 대표 지수이지만, 목적과 구성이 다릅니다.
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  name: "S&P500",
                  desc: "미국 대형주 500개. 미국 경제 전체를 대표하는 가장 균형 잡힌 지수. 기관투자자들의 기준 벤치마크.",
                  color: "#10b981",
                },
                {
                  name: "NASDAQ Composite",
                  desc: "NASDAQ 거래소 상장 전 종목. 기술주 비중이 높아 S&P500보다 변동성이 큽니다. 상승장에서 더 강하고 하락장에서 더 약합니다.",
                  color: "#60a5fa",
                },
                {
                  name: "DOW Jones (다우)",
                  desc: "미국 전통 대기업 30개 단순 평균. 가장 오래된 지수(1896년~)이지만 대표성은 S&P500에 비해 낮습니다.",
                  color: "#f59e0b",
                },
              ].map((item) => (
                <div key={item.name} className="rounded-xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)", borderLeft: `3px solid ${item.color}` }}>
                  <p className="text-sm font-bold mb-1" style={{ color: item.color }}>{item.name}</p>
                  <p className="text-[12px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              S&P500에 투자하는 방법
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              개인 투자자가 S&P500에 직접 투자하는 방법은 주로 ETF(상장지수펀드)를 통하는 것입니다.
              S&P500을 그대로 추종하는 대표적인 ETF들이 있습니다.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-3" style={{ color: "var(--text)" }}>주요 S&P500 추종 ETF</p>
              <div className="flex flex-col gap-2">
                {[
                  { ticker: "SPY", name: "SPDR S&P 500 ETF Trust", fee: "0.09%", aum: "세계 최대 ETF" },
                  { ticker: "VOO", name: "Vanguard S&P 500 ETF", fee: "0.03%", aum: "가장 낮은 보수" },
                  { ticker: "IVV", name: "iShares Core S&P 500 ETF", fee: "0.03%", aum: "BlackRock 운용" },
                ].map((etf) => (
                  <div key={etf.ticker} className="rounded-xl p-3 border flex items-start gap-3"
                    style={{ background: "rgba(0,0,0,0.2)", borderColor: "rgba(255,255,255,0.06)" }}>
                    <div className="flex-shrink-0">
                      <p className="text-sm font-bold font-syne" style={{ color: "var(--mint)" }}>{etf.ticker}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold" style={{ color: "var(--text)" }}>{etf.name}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
                        운용보수 {etf.fee} · {etf.aum}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              세 ETF 모두 S&P500 지수를 거의 동일하게 추종합니다.
              장기 투자라면 보수가 가장 낮은 VOO나 IVV를 선택하는 것이 합리적입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              Investus에서 S&P500 모니터링하기
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Investus <Link href="/" style={{ color: "var(--mint)" }}>홈 화면</Link>에서
              S&P500 지수를 실시간으로 확인할 수 있습니다.
              섹터별 히트맵을 통해 어떤 섹터가 오르고 내리는지 한눈에 파악할 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              S&P500 지수 선물(Futures)도 확인할 수 있어, 미국 장이 열리기 전
              오늘 시장이 어떻게 시작할지 미리 예측할 수 있습니다.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 이 글은 교육 목적의 투자 정보로, 특정 투자 상품의 매수·매도 권유가 아닙니다.
            과거 수익률은 미래 성과를 보장하지 않으며, 모든 투자는 원금 손실의 위험이 있습니다.
          </div>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/fear-greed" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">😱</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>공포탐욕지수 완전 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>시장 심리로 투자 타이밍 잡기</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/buffett-indicator" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🏦</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>버핏지수 완전 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>시장 고평가 여부 판단하기</p>
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
