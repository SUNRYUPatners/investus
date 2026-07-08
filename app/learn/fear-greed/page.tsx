import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "공포탐욕지수 완전 가이드 — 시장 심리로 투자 타이밍 잡기 | 인베스트어스",
  description: "CNN의 공포&탐욕 지수(Fear & Greed Index)가 무엇인지, 7가지 세부 지표가 어떻게 계산되는지, 실전 투자에서 어떻게 활용하는지 완전히 설명합니다.",
  keywords: ["공포탐욕지수", "Fear Greed Index", "CNN 공포탐욕", "투자 타이밍", "시장 심리", "공포지수"],
  alternates: { canonical: "https://www.investus.kr/learn/fear-greed" },
  openGraph: {
    title: "공포탐욕지수 완전 가이드 | 인베스트어스",
    description: "공포&탐욕 지수 계산 방법, 실전 투자 활용법 — 시장 심리로 매수·매도 타이밍 잡기",
    url: "https://www.investus.kr/learn/fear-greed",
    type: "article",
  },
};

export default function FearGreedPage() {
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
              style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>심리</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 7분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            공포탐욕지수 완전 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            &ldquo;남들이 공포에 떨 때 사고, 남들이 탐욕을 부릴 때 팔아라.&rdquo;
            워런 버핏의 이 말을 실천하려면 지금 시장이 공포인지 탐욕인지 알아야 합니다.
            공포&탐욕 지수는 바로 그 답을 숫자로 보여줍니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              공포&탐욕 지수란 무엇인가
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              CNN Business가 개발한 Fear &amp; Greed Index(공포&탐욕 지수)는 주식 시장 투자자들의
              심리 상태를 0~100 사이의 수치로 표현합니다.
              0에 가까울수록 극단적 공포(Extreme Fear), 100에 가까울수록 극단적 탐욕(Extreme Greed)입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              이 지수는 단일 지표가 아니라 7가지 시장 지표를 종합해서 계산합니다.
              각 지표가 과거 52주 동안의 평균 대비 얼마나 높거나 낮은지를 측정하여
              동등한 가중치로 합산합니다.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>지수 범위 해석</p>
              <div className="flex flex-col gap-2">
                {[
                  { range: "0 ~ 24", label: "극단적 공포 (Extreme Fear)", color: "#10b981", desc: "패닉 상태 — 역사적 매수 기회" },
                  { range: "25 ~ 44", label: "공포 (Fear)", color: "#7ed957", desc: "불안 심리 우세 — 과매도 가능성" },
                  { range: "45 ~ 55", label: "중립 (Neutral)", color: "#ffd166", desc: "균형 상태" },
                  { range: "56 ~ 74", label: "탐욕 (Greed)", color: "#ff8c55", desc: "낙관 심리 — 과열 주의" },
                  { range: "75 ~ 100", label: "극단적 탐욕 (Extreme Greed)", color: "#ef4444", desc: "버블 위험 — 현금 비중 검토" },
                ].map((z) => (
                  <div key={z.range} className="flex gap-3 items-start">
                    <span className="text-[10px] font-mono font-bold flex-shrink-0 mt-0.5" style={{ color: z.color, minWidth: 52 }}>
                      {z.range}
                    </span>
                    <div>
                      <p className="text-[12px] font-bold" style={{ color: z.color }}>{z.label}</p>
                      <p className="text-[11px]">{z.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              7가지 세부 지표 — 어떻게 계산되나
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              공포&탐욕 지수는 다음 7개 지표를 각각 0~100으로 표준화한 후 평균을 냅니다.
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  num: "1",
                  title: "주가 모멘텀 (Stock Price Momentum)",
                  desc: "S&P500이 125일 이동평균선보다 얼마나 위에 있는지를 측정합니다. 이동평균 위에 있으면 탐욕, 아래에 있으면 공포 신호.",
                  color: "#10b981",
                },
                {
                  num: "2",
                  title: "주가 강도 (Stock Price Strength)",
                  desc: "NYSE에서 52주 신고가 종목 수 vs 신저가 종목 수의 비율입니다. 신고가가 많을수록 탐욕.",
                  color: "#60a5fa",
                },
                {
                  num: "3",
                  title: "주가 너비 (Stock Price Breadth)",
                  desc: "상승 종목 거래량 vs 하락 종목 거래량의 차이(McClellan Volume Summation Index)입니다.",
                  color: "#c084fc",
                },
                {
                  num: "4",
                  title: "풋/콜 비율 (Put and Call Options)",
                  desc: "풋 옵션(하락 베팅) vs 콜 옵션(상승 베팅) 거래 비율입니다. 풋 매수가 많으면 공포, 콜 매수가 많으면 탐욕.",
                  color: "#f59e0b",
                },
                {
                  num: "5",
                  title: "정크본드 수요 (Junk Bond Demand)",
                  desc: "투자등급 채권 대비 정크본드(고위험 채권)의 금리 스프레드입니다. 스프레드가 좁으면 위험 선호(탐욕), 넓으면 위험 회피(공포).",
                  color: "#fb923c",
                },
                {
                  num: "6",
                  title: "시장 변동성 (Market Volatility)",
                  desc: "VIX(변동성 지수)를 활용합니다. VIX가 높으면 공포, 낮으면 탐욕.",
                  color: "#ef4444",
                },
                {
                  num: "7",
                  title: "안전자산 수요 (Safe Haven Demand)",
                  desc: "주식 대비 국채(미국 국채)로의 자금 이동 정도입니다. 국채로 돈이 몰리면 공포.",
                  color: "#a3a3a3",
                },
              ].map((item) => (
                <div key={item.num} className="rounded-xl p-3 border"
                  style={{ background: "var(--card)", borderColor: "var(--border)", borderLeft: `3px solid ${item.color}` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: `${item.color}20`, color: item.color }}>
                      {item.num}
                    </span>
                    <p className="text-[12px] font-bold" style={{ color: "var(--text)" }}>{item.title}</p>
                  </div>
                  <p className="text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              실전 투자에서 어떻게 활용하나
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              공포&탐욕 지수는 <strong style={{ color: "var(--text)" }}>단기 타이밍 도구</strong>가 아닙니다.
              지수가 극단적 공포를 가리킨다고 해서 내일 당장 반등한다는 보장은 없습니다.
              오히려 며칠 더 하락할 수도 있습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              이 지수의 올바른 활용법은 <strong style={{ color: "var(--text)" }}>추세의 방향성</strong>을 파악하는 것입니다.
              지수가 30 이하의 공포 구간에서 회복되기 시작한다면, 시장 바닥에 가까워졌을
              가능성이 높습니다. 반대로 80 이상의 탐욕 구간에 오래 머문다면 조정이 올 수 있습니다.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-3" style={{ color: "var(--text)" }}>투자 전략 가이드</p>
              <div className="flex flex-col gap-3">
                {[
                  {
                    situation: "지수 0~24 (극단적 공포)",
                    action: "분할 매수 검토 — 좋은 기업을 싸게 살 기회. 단, 전체 자금을 한번에 넣지 말고 2~4회로 나눠 매수.",
                    color: "#10b981",
                  },
                  {
                    situation: "지수 25~44 (공포)",
                    action: "관심 종목 위시리스트 정리 — 매수 준비 단계. 더 내릴 수 있으니 서두르지 않는다.",
                    color: "#7ed957",
                  },
                  {
                    situation: "지수 45~55 (중립)",
                    action: "포트폴리오 점검 — 큰 방향성 변화 없이 기존 전략 유지.",
                    color: "#ffd166",
                  },
                  {
                    situation: "지수 56~74 (탐욕)",
                    action: "신규 진입 자제 — 이미 많이 오른 상태. 기존 보유 종목 수익 실현 일부 고려.",
                    color: "#ff8c55",
                  },
                  {
                    situation: "지수 75~100 (극단적 탐욕)",
                    action: "현금 비중 확대 — 버핏이 현금을 쌓는 구간. 레버리지 포지션 해소 검토.",
                    color: "#ef4444",
                  },
                ].map((s) => (
                  <div key={s.situation} className="rounded-xl p-3 border"
                    style={{ background: "rgba(0,0,0,0.2)", borderColor: "rgba(255,255,255,0.06)", borderLeft: `2px solid ${s.color}` }}>
                    <p className="text-[11px] font-bold mb-1" style={{ color: s.color }}>{s.situation}</p>
                    <p className="text-[12px] leading-relaxed">{s.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              역사적 사례 — 극단적 공포일 때 무슨 일이 일어났나
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              과거 공포&탐욕 지수가 10 이하로 떨어진 대표적 사례들을 살펴보면,
              이 시기가 모두 훗날 최고의 매수 기회였음을 알 수 있습니다.
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  date: "2020년 3월 (코로나 충격)",
                  fg: "지수 2~5",
                  result: "S&P500 -34% 하락 후 12개월 내 +75% 반등",
                  color: "#10b981",
                },
                {
                  date: "2022년 10월 (금리 충격)",
                  fg: "지수 5~10",
                  result: "이후 14개월간 S&P500 +30% 이상 상승",
                  color: "#60a5fa",
                },
                {
                  date: "2018년 12월 (무역전쟁 공포)",
                  fg: "지수 8~12",
                  result: "이후 12개월간 S&P500 +30% 이상 상승",
                  color: "#c084fc",
                },
              ].map((s) => (
                <div key={s.date} className="rounded-xl p-3 border"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{s.date}</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-bold"
                      style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }}>
                      {s.fg}
                    </span>
                  </div>
                  <p className="text-[12px] leading-relaxed" style={{ color: s.color }}>{s.result}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-3">
              단, 이것은 사후에 알 수 있는 결과입니다. 당시에는 더 내릴 것 같은 공포가 지배적이었습니다.
              그래서 &ldquo;분할 매수&rdquo;가 중요합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              Investus에서 실시간 확인하기
            </h2>
            <p className="text-sm leading-relaxed">
              Investus <Link href="/" style={{ color: "var(--mint)" }}>홈 화면</Link>에서
              공포&탐욕 지수를 실시간으로 확인할 수 있습니다.
              현재 수치와 함께 어제, 1주일 전, 1개월 전 수치를 비교해서 추세를 파악해보세요.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 공포&탐욕 지수는 참고 지표일 뿐, 특정 매수·매도 시점을 보장하지 않습니다.
            모든 투자는 원금 손실의 위험이 있으며, 투자 결정의 최종 책임은 투자자 본인에게 있습니다.
          </div>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
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
          </div>
        </div>
      </main>
    </div>
  );
}
