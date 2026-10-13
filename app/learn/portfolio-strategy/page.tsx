"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function PortfolioStrategyPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/portfolio-strategy")!;

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-10">

        <div className="pt-4 pb-2">
          <Link href="/learn" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-3.5 h-3.5" /> {isKo ? "투자 지식 허브" : "Learn Hub"}
          </Link>
        </div>

        <div className="mb-6 pt-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${article.tagColor}22`, color: article.tagColor }}>
              {isKo ? article.tag : article.tagEn}
            </span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>
              {article.minutes} {isKo ? "읽기" : "read"}
            </span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            {isKo ? article.title : article.titleEn}
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {isKo ? article.desc : article.descEn}
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          {isKo ? (
            <>
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
            <div className="rounded-2xl p-4 border" style={{ background: "rgba(var(--mint-rgb),0.04)", borderColor: "rgba(var(--mint-rgb),0.2)" }}>
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
              현금 비중의 역할
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              현금(또는 단기 달러/원화 예금)은 &ldquo;수익이 안 나는 자산&rdquo;이 아니라
              다음 조정에서 살 수 있는 옵션입니다. 전액 투자 상태에서 급락이 오면
              심리가 무너져 저점에 팔기 쉽습니다.
            </p>
            <p className="text-sm leading-relaxed">
              입문자는 주식 80~90% + 현금 10~20%로 시작해, 극단적 탐욕 구간에서는 현금을 조금 늘리고
              극단적 공포 구간에서는 적립액을 늘리는 식으로 조절할 수 있습니다.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 이 글에 소개된 포트폴리오 구성 예시는 교육 목적이며 특정 투자 권유가 아닙니다.
            개인의 투자 성향, 목표, 상황에 따라 최적의 구성이 다를 수 있으며,
            모든 투자는 원금 손실의 위험이 있습니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Why Diversification Matters</h2>
            <p className="text-sm leading-relaxed mb-3">
              In February 2022, Meta (Facebook) fell 26% in a single day — erasing roughly $237 billion in market cap overnight. An investor who held only Meta lost a quarter of their investment in one session. Diversification is the defense against this kind of concentrated blow: by spreading capital across assets that don&apos;t all move together, a single company&apos;s collapse cannot destroy the whole portfolio.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "rgba(var(--mint-rgb),0.04)", borderColor: "rgba(var(--mint-rgb),0.2)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--mint)" }}>The Core Principle</p>
              <p className="text-sm leading-relaxed">
                Combining assets with low or negative correlation reduces portfolio volatility without necessarily sacrificing long-term returns. When one asset falls, another may hold — cushioning the overall drawdown.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Concentration vs. Diversification</h2>
            <p className="text-sm leading-relaxed mb-3">
              Warren Buffett famously said diversification is &ldquo;protection against ignorance.&rdquo; He has at times held over 40% of Berkshire in a single stock. But Buffett has decades of deep company analysis behind him. For the vast majority of investors, concentration amplifies both upside and downside in ways that are psychologically unsustainable.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "rgba(16,185,129,0.3)" }}>
                <p className="text-[11px] font-bold mb-2" style={{ color: "#10b981" }}>Concentration</p>
                <div className="flex flex-col gap-1 text-[11px]">
                  <p>✓ Higher potential upside</p>
                  <p>✓ Fewer positions to track</p>
                  <p>✗ Single-stock risk</p>
                  <p>✗ Requires deep expertise</p>
                </div>
              </div>
              <div className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "rgba(96,165,250,0.3)" }}>
                <p className="text-[11px] font-bold mb-2" style={{ color: "#60a5fa" }}>Diversification</p>
                <div className="flex flex-col gap-1 text-[11px]">
                  <p>✓ Reduced single-asset risk</p>
                  <p>✓ Suitable for beginners</p>
                  <p>✗ Returns converge to average</p>
                  <p>✗ More positions to manage</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Portfolio Templates by Experience Level</h2>
            <p className="text-sm leading-relaxed mb-3">
              These are illustrative examples only. Adjust for your risk tolerance, investment horizon, and personal circumstances.
            </p>
            <div className="flex flex-col gap-4">
              {[
                {
                  level: "Beginner",
                  sub: "Under 1 year of experience",
                  color: "#10b981",
                  items: [
                    { label: "S&P 500 ETF (SPY / VOO / IVV)", pct: "70%", desc: "Core position — instant exposure to 500 large US companies" },
                    { label: "Nasdaq 100 ETF (QQQ)", pct: "20%", desc: "Additional growth / tech tilt" },
                    { label: "1–2 individual blue-chip stocks", pct: "10%", desc: "Companies you genuinely understand (Apple, Microsoft, etc.)" },
                  ],
                },
                {
                  level: "Intermediate",
                  sub: "2–5 years of experience",
                  color: "#60a5fa",
                  items: [
                    { label: "Individual growth stocks (5–8)", pct: "50%", desc: "Cap each at 15–20% max" },
                    { label: "S&P 500 ETF", pct: "30%", desc: "Safety net and market exposure" },
                    { label: "Sector ETFs (semiconductors, health care, etc.)", pct: "20%", desc: "High-conviction sector overweight" },
                  ],
                },
                {
                  level: "Advanced",
                  sub: "5+ years of experience",
                  color: "#c084fc",
                  items: [
                    { label: "Individual growth stocks (8–15)", pct: "60%", desc: "Mix of sectors and market caps" },
                    { label: "Core ETF", pct: "25%", desc: "Maintain broad market exposure" },
                    { label: "Cash and bonds", pct: "15%", desc: "Dry powder for drawdown opportunities" },
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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Rebalancing — When and How</h2>
            <p className="text-sm leading-relaxed mb-3">
              Portfolios drift over time. If Nvidia rises 300%, a 10% allocation can balloon to 40% — leaving you far more exposed than intended. Rebalancing trims winners and adds to laggards to restore your target weights. The discipline also forces a mechanical form of &ldquo;sell high, buy low.&rdquo;
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>Rebalancing Approaches</p>
              <div className="flex flex-col gap-2">
                {[
                  ["Calendar-based", "Rebalance quarterly (every 3 months) or semi-annually (every 6 months)"],
                  ["Threshold-based", "Rebalance when any position drifts more than 5% from its target weight"],
                  ["Event-based", "Review after major market dislocations (crashes or euphoric runs)"],
                  ["Tax awareness", "Factor in capital gains tax before selling appreciated positions — sometimes it is cheaper to buy more of the underweight asset"],
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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Sector Diversification</h2>
            <p className="text-sm leading-relaxed mb-3">
              Owning 10 semiconductor stocks is not diversification — it is concentration with extra steps. Sector exposure matters as much as the number of positions. Different sectors shine at different points in the economic cycle.
            </p>
            <div className="flex flex-col gap-2">
              {[
                { sector: "Information Technology", when: "Outperforms in low-rate, high-growth environments", example: "NVDA, AAPL, MSFT", color: "#10b981" },
                { sector: "Health Care", when: "Defensive — relatively stable earnings in downturns", example: "LLY, UNH, JNJ", color: "#60a5fa" },
                { sector: "Financials", when: "Benefits from rising rates and economic recovery", example: "JPM, BAC, GS", color: "#f59e0b" },
                { sector: "Energy", when: "Inflation hedge, geopolitical risk premium", example: "XOM, CVX", color: "#fb923c" },
                { sector: "Consumer Staples", when: "Recession-resistant, steady dividends", example: "WMT, COST, PG", color: "#c084fc" },
              ].map((s) => (
                <div key={s.sector} className="rounded-xl p-3 border"
                  style={{ background: "var(--card)", borderColor: "var(--border)", borderLeft: `3px solid ${s.color}` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[12px] font-bold" style={{ color: s.color }}>{s.sector}</p>
                    <span className="text-[10px]" style={{ color: "var(--muted)" }}>Examples: {s.example}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">{s.when}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-3">
              For a full breakdown of all 11 GICS sectors, see the <Link href="/learn/sectors" style={{ color: "var(--mint)" }}>Sectors Guide</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>The Role of Cash</h2>
            <p className="text-sm leading-relaxed mb-3">
              Cash is not a dead asset — it is optionality. A fully-invested portfolio has no purchasing power when a crash creates opportunities. More importantly, being 100% invested makes every drawdown feel like an emergency, increasing the likelihood of panic-selling at the worst time.
            </p>
            <p className="text-sm leading-relaxed">
              A reasonable starting point for beginners: 80–90% equities, 10–20% cash. During extreme greed, let cash drift slightly higher. During extreme fear, deploy a portion of that cash through your existing <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA schedule</Link>. Do not try to time the exact bottom — adjust by size, not by conviction.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ Portfolio examples are for educational purposes only and are not investment recommendations. Optimal allocation varies by individual goals, risk tolerance, and timeline. All investments carry principal loss risk.
          </div>
            </>
          )}
        </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            {isKo ? "다음으로 읽을 글" : "Read Next"}
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/sp500" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📈</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "S&P500 완전 가이드" : "Complete S&P 500 Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "미국 경제의 온도계를 읽는 법" : "The benchmark at the core of most portfolios"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/sectors" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🏭</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "미국 주식 11개 섹터" : "Guide to the 11 US Stock Sectors"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "기술 쏠림을 피하는 지도" : "Avoiding over-concentration in tech"}</p>
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
