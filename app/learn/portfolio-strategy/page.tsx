import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "미국주식 포트폴리오 분산 투자 전략 — 흔들리지 않는 포트폴리오 구성법 | 인베스트어스",
  description: "미국주식 포트폴리오 구성 전략. 집중 vs 분산 투자, 섹터 배분, 리밸런싱, 시가총액별 배분 방법까지 실전 포트폴리오 전략을 설명합니다.",
  keywords: ["포트폴리오 전략", "분산 투자", "섹터 배분", "리밸런싱", "미국주식 포트폴리오"],
  alternates: { canonical: "https://www.investus.kr/learn/portfolio-strategy" },
  openGraph: {
    title: "미국주식 포트폴리오 분산 투자 전략 | 인베스트어스",
    description: "집중 vs 분산, 섹터 배분, 리밸런싱 — 흔들리지 않는 미국주식 포트폴리오 구성법",
    url: "https://www.investus.kr/learn/portfolio-strategy",
    type: "article",
  },
};

export default function PortfolioStrategyPage() {
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
              style={{ background: "rgba(251,146,60,0.15)", color: "#fb923c" }}>전략</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 9분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            미국주식 포트폴리오 분산 투자 전략
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            주식 투자에서 수익을 내는 것만큼 중요한 것이 리스크 관리입니다.
            분산 투자는 한 종목의 급락이 전체 자산을 날리는 상황을 막는 가장 기본적이고 강력한 방어책입니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              왜 분산 투자가 필요한가
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              2022년 Meta(페이스북)는 하루 만에 주가가 -26% 폭락했습니다. 총 시가총액이 단 하루에
              약 2,370억 달러(약 310조 원)가 사라진 것입니다. 만약 전 재산을 Meta에만 넣었다면
              그날 하루 4분의 1을 잃었을 것입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              이런 사태를 막기 위해 존재하는 것이 분산 투자(Diversification)입니다.
              서로 다른 특성을 가진 여러 자산에 투자해서 한 자산의 폭락이 전체를 무너뜨리지 않도록 합니다.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "rgba(0,229,160,0.04)", borderColor: "rgba(0,229,160,0.2)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--mint)" }}>
                분산 투자의 핵심 원리
              </p>
              <p className="text-sm leading-relaxed">
                서로 다른 방향으로 움직이는 자산들을 섞으면, 한 자산이 하락해도 다른 자산이 그 충격을 상쇄합니다.
                이것을 투자에서는 &ldquo;상관관계(Correlation)를 낮춘다&rdquo;고 표현합니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              집중 투자 vs 분산 투자 — 어느 쪽이 맞는가
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              워런 버핏은 &ldquo;분산 투자는 무지에 대한 방어책이다. 본인이 무엇을 하는지 안다면
              분산 투자는 별 의미가 없다&rdquo;고 했습니다. 그러면서도 버핏 본인은 Apple 하나에만
              포트폴리오의 50%를 담기도 했습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              하지만 이것은 수십 년간 기업 분석을 해온 전문가의 얘기입니다.
              일반 투자자에게는 분산 투자가 필수입니다.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "rgba(16,185,129,0.3)" }}>
                <p className="text-[11px] font-bold mb-2" style={{ color: "#10b981" }}>집중 투자</p>
                <div className="flex flex-col gap-1 text-[11px]">
                  <p>✓ 수익률 극대화 가능</p>
                  <p>✓ 소수 종목만 집중 분석</p>
                  <p>✗ 단일 종목 리스크 극대</p>
                  <p>✗ 전문 지식 필수</p>
                </div>
              </div>
              <div className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "rgba(96,165,250,0.3)" }}>
                <p className="text-[11px] font-bold mb-2" style={{ color: "#60a5fa" }}>분산 투자</p>
                <div className="flex flex-col gap-1 text-[11px]">
                  <p>✓ 리스크 분산</p>
                  <p>✓ 초보자에 적합</p>
                  <p>✗ 수익률 평균 수렴</p>
                  <p>✗ 많은 종목 관리 필요</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              실전 포트폴리오 구성 — 어떻게 나눌까
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              다음은 투자 경험 수준에 따른 포트폴리오 구성 예시입니다.
              어디까지나 참고 예시이며, 본인의 투자 성향과 목표에 맞게 조정해야 합니다.
            </p>

            <div className="flex flex-col gap-4">
              {[
                {
                  level: "입문자",
                  sub: "투자 경험 1년 미만",
                  color: "#10b981",
                  items: [
                    { label: "S&P500 ETF (SPY/VOO/IVV)", pct: "70%", desc: "핵심 포지션 — 미국 대형주 500개 자동 분산" },
                    { label: "NASDAQ 100 ETF (QQQ)", pct: "20%", desc: "기술주 성장 추가 노출" },
                    { label: "개별 우량주 1~2개", pct: "10%", desc: "본인이 잘 아는 기업 (Apple, Microsoft 등)" },
                  ],
                },
                {
                  level: "중급자",
                  sub: "투자 경험 2~5년",
                  color: "#60a5fa",
                  items: [
                    { label: "개별 성장주 5~8개", pct: "50%", desc: "각 종목 최대 15~20% 제한" },
                    { label: "S&P500 ETF", pct: "30%", desc: "안전망 역할" },
                    { label: "섹터 ETF (반도체, 헬스케어 등)", pct: "20%", desc: "확신 있는 섹터 추가 비중" },
                  ],
                },
                {
                  level: "고급자",
                  sub: "투자 경험 5년 이상",
                  color: "#c084fc",
                  items: [
                    { label: "개별 성장주 8~15개", pct: "60%", desc: "다양한 섹터와 시가총액 믹스" },
                    { label: "코어 ETF", pct: "25%", desc: "마켓 익스포저 유지" },
                    { label: "현금 및 채권", pct: "15%", desc: "조정 시 매수 여력 확보" },
                  ],
                },
              ].map((p) => (
                <div key={p.level} className="rounded-2xl border overflow-hidden" style={{ borderColor: p.color + "40" }}>
                  <div className="px-4 py-2.5" style={{ background: p.color + "12" }}>
                    <p className="text-sm font-bold" style={{ color: p.color }}>{p.level}</p>
                    <p className="text-[10px]" style={{ color: "var(--muted)" }}>{p.sub}</p>
                  </div>
                  <div className="p-3 flex flex-col gap-2">
                    {p.items.map((item) => (
                      <div key={item.label} className="flex gap-3 items-start text-sm">
                        <span className="font-bold flex-shrink-0 text-[11px] px-1.5 py-0.5 rounded"
                          style={{ background: p.color + "20", color: p.color, minWidth: 36, textAlign: "center" }}>
                          {item.pct}
                        </span>
                        <div>
                          <p className="text-[12px] font-bold" style={{ color: "var(--text)" }}>{item.label}</p>
                          <p className="text-[11px]">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              리밸런싱 — 언제, 어떻게 해야 하나
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              포트폴리오는 시간이 지나면서 구성 비율이 변합니다. 예를 들어 NVIDIA가 300% 오르면,
              처음에 10%였던 NVIDIA 비중이 40%로 늘어날 수 있습니다.
              이런 상태를 방치하면 특정 종목에 과도하게 노출되어 리스크가 높아집니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              리밸런싱은 이런 비율 불균형을 원래 목표 비율로 되돌리는 작업입니다.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>리밸런싱 원칙</p>
              <div className="flex flex-col gap-2">
                {[
                  ["주기 기준", "분기마다(3개월) 또는 반기마다(6개월) 정기 리밸런싱"],
                  ["비율 기준", "특정 종목이 목표 비중보다 5% 이상 벗어나면 실행"],
                  ["이벤트 기준", "대규모 시장 변동 후 포트폴리오 점검"],
                  ["세금 주의", "미국주식 양도소득세(22%)를 고려하여 필요할 때만 실행"],
                ].map(([t, d]) => (
                  <div key={t} className="flex gap-3 text-sm">
                    <span className="font-bold flex-shrink-0" style={{ color: "var(--text)", minWidth: 80 }}>{t}</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              섹터 분산 — 업종 쏠림을 피하는 법
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              기술주를 좋아한다고 해서 포트폴리오를 AI 반도체 기업들로만 채우면,
              반도체 업황이 나빠질 때 전체 포트폴리오가 함께 무너집니다.
              서로 다른 경기 상황에서 강한 섹터를 적절히 섞는 것이 중요합니다.
            </p>
            <div className="flex flex-col gap-2">
              {[
                { sector: "기술주 (IT)", when: "금리 하락기, 성장 기대 높을 때 강함", example: "NVDA, AAPL, MSFT", color: "#10b981" },
                { sector: "헬스케어", when: "경기 불황에도 상대적으로 방어적", example: "LLY, UNH, JNJ", color: "#60a5fa" },
                { sector: "금융주", when: "금리 상승기에 강함, 경기 회복기 수혜", example: "JPM, BAC, GS", color: "#f59e0b" },
                { sector: "에너지", when: "인플레이션 헤지, 지정학 리스크 수혜", example: "XOM, CVX", color: "#fb923c" },
                { sector: "필수소비재", when: "불황에도 안정적 실적, 배당 투자 적합", example: "WMT, COST, PG", color: "#c084fc" },
              ].map((s) => (
                <div key={s.sector} className="rounded-xl p-3 border"
                  style={{ background: "var(--card)", borderColor: "var(--border)", borderLeft: `3px solid ${s.color}` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[12px] font-bold" style={{ color: s.color }}>{s.sector}</p>
                    <span className="text-[10px]" style={{ color: "var(--muted)" }}>대표: {s.example}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">{s.when}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              Investus 포트폴리오 기능 활용하기
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Investus <Link href="/portfolio" style={{ color: "var(--mint)" }}>자산 탭</Link>에서
              내 포트폴리오를 등록하면 실시간 수익률과 종목별 비중을 한눈에 확인할 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              AI 투자비서(Claude)에게 &ldquo;내 포트폴리오 분산이 잘 됐어?&rdquo;,
              &ldquo;특정 섹터에 너무 치우쳐 있는 건 아니야?&rdquo;라고 직접 물어볼 수도 있습니다.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 이 글에 소개된 포트폴리오 구성 예시는 교육 목적이며 특정 투자 권유가 아닙니다.
            개인의 투자 성향, 목표, 상황에 따라 최적의 구성이 다를 수 있으며,
            모든 투자는 원금 손실의 위험이 있습니다.
          </div>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/sp500" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📈</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>S&P500 완전 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>미국 경제의 온도계를 읽는 법</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
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
          </div>
        </div>
      </main>
    </div>
  );
}
