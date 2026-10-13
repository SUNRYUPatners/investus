"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function BuffettIndicatorPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/buffett-indicator")!;

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
            {isKo
              ? "워런 버핏이 2001년 Fortune 인터뷰에서 \"현재 시장 가치 평가를 위한 최고의 단일 지표\"라고 소개한 버핏지수. 이 지수 하나만 제대로 이해해도 시장이 싼지 비싼지를 직관적으로 파악할 수 있습니다."
              : article.descEn}
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          {isKo ? (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              버핏지수란 무엇인가
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              버핏지수(Buffett Indicator)는 미국 전체 주식 시가총액을 미국 GDP(국내총생산)로 나눈 비율입니다.
            </p>
            <div className="rounded-2xl p-4 border text-center" style={{ background: "rgba(var(--mint-rgb),0.04)", borderColor: "rgba(var(--mint-rgb),0.2)" }}>
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
            <div className="rounded-xl px-4 py-3 mt-3" style={{ background: "rgba(var(--mint-rgb),0.06)", border: "1px solid rgba(var(--mint-rgb),0.2)" }}>
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
              금리·이익과 함께 보는 법
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              버핏지수가 높아도 기업 이익(EPS)이 빠르게 늘고 금리가 안정적이면,
              시장은 그 밸류에이션을 더 오래 유지하기도 합니다. 반대로 이익 전망이 꺾이는데
              지수가 고공행진이면 조정의 폭이 커질 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              실전에서는 버핏지수 하나만 보지 말고, (1) 장기 금리, (2) 기업 이익 전망,
              (3) 공포탐욕지수(단기 심리)를 같이 봅니다. Investus 홈에서 버핏지수와 공포탐욕을
              나란히 확인할 수 있게 한 이유입니다.
            </p>
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
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What Is the Buffett Indicator?</h2>
            <p className="text-sm leading-relaxed mb-3">
              The Buffett Indicator is the ratio of total US stock market capitalization to US GDP, expressed as a percentage. Buffett described it in a 2001 Fortune interview as &ldquo;probably the best single measure of where valuations stand at any given moment.&rdquo;
            </p>
            <div className="rounded-2xl p-4 border text-center" style={{ background: "rgba(var(--mint-rgb),0.04)", borderColor: "rgba(var(--mint-rgb),0.2)" }}>
              <p className="text-base font-bold font-syne mb-1" style={{ color: "var(--mint)" }}>
                Buffett Indicator = Total Market Cap ÷ GDP × 100
              </p>
              <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                Example: $45T market cap ÷ $28T GDP × 100 ≈ 160%
              </p>
            </div>
            <p className="text-sm leading-relaxed mt-3 mb-3">
              A high ratio means the stock market is pricing itself at a significant premium to the underlying economy&apos;s output. A low ratio suggests equities are historically cheap relative to economic activity.
            </p>
            <p className="text-sm leading-relaxed">
              Its appeal is its simplicity: no complex financial model, just a direct comparison between what the economy produces (GDP) and what the market charges for ownership of it (total market cap).
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Historical Benchmarks</h2>
            <p className="text-sm leading-relaxed mb-3">
              These are rough historical reference zones — they are not fixed rules and shift over time as the structure of the economy changes.
            </p>
            <div className="flex flex-col gap-2">
              {[
                { range: "Below 70%", label: "Significantly undervalued", action: "Strong long-term buying opportunity — historically rare", color: "#10b981" },
                { range: "70–100%", label: "Fair value", action: "Balanced market — normal investing conditions", color: "#7ed957" },
                { range: "100–140%", label: "Somewhat overvalued", action: "Caution warranted — diversify carefully on new entries", color: "#ffd166" },
                { range: "140–180%", label: "Overvalued", action: "Caution zone — Buffett historically built cash reserves here", color: "#ff8c55" },
                { range: "Above 180%", label: "Extremely overvalued", action: "Historically followed by significant corrections", color: "#ef4444" },
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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Historical Cases — When It Warned</h2>
            <div className="flex flex-col gap-3">
              {[
                {
                  period: "Dot-com bubble peak (2000)",
                  level: "~148%",
                  result: "S&P 500 fell 49%, Nasdaq fell 78% (2000–2002)",
                  color: "#ef4444",
                },
                {
                  period: "Pre-financial crisis (2007)",
                  level: "~110%",
                  result: "S&P 500 fell 57% (2007–2009)",
                  color: "#f59e0b",
                },
                {
                  period: "Financial crisis trough (2009)",
                  level: "~65%",
                  result: "Followed by the longest US bull market in history",
                  color: "#10b981",
                },
                {
                  period: "Post-Covid euphoria (2021)",
                  level: "~195%",
                  result: "S&P 500 fell 25%, Nasdaq fell 33% in 2022",
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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Key Limitations</h2>
            <p className="text-sm leading-relaxed mb-3">
              The indicator is useful but not infallible. Several structural changes may justify higher sustained readings than historical norms:
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: "Low interest rates raise fair value",
                  desc: "When rates are low, future cash flows are discounted at a lower rate — increasing the present value of equities. The prolonged low-rate era of the 2010s mechanically pushed the Buffett Indicator higher without necessarily signaling the same level of danger as 148% in 2000.",
                },
                {
                  title: "US companies earn profits globally",
                  desc: "Apple, Google, and Microsoft generate revenue worldwide, but the denominator (US GDP) only counts US economic output. As the global revenue share of US multinationals has grown, the indicator naturally trends higher — even if valuations haven't moved proportionally.",
                },
                {
                  title: "Big-tech concentration",
                  desc: "The top 10 companies represent 30%+ of S&P 500 market cap. A handful of extraordinarily valuable businesses inflate the numerator in ways that have no direct historical precedent.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{item.title}</p>
                  <p className="text-[12px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl px-4 py-3 mt-3" style={{ background: "rgba(var(--mint-rgb),0.06)", border: "1px solid rgba(var(--mint-rgb),0.2)" }}>
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                The indicator is not a short-term timing tool
              </p>
              <p className="text-[12px] leading-relaxed mt-1.5">
                A high reading is not a signal to sell everything. It is a long-term risk management input — use it to consider position sizing and cash allocation, not to time exits. Buffett himself held high-quality businesses through periods of elevated readings.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Using It Alongside Rates and Earnings</h2>
            <p className="text-sm leading-relaxed mb-3">
              Even at elevated levels, the indicator is more dangerous when earnings growth is decelerating and interest rates are rising simultaneously. Conversely, strong EPS growth and stable rates have historically supported high readings for extended periods.
            </p>
            <p className="text-sm leading-relaxed">
              In practice, combine the Buffett Indicator with: (1) the 10-year Treasury yield (see <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>rates guide</Link>), (2) forward earnings growth estimates, and (3) the <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>Fear &amp; Greed Index</Link> for near-term sentiment. The Investus home screen shows all three side by side for this reason.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Check It Live on Investus</h2>
            <p className="text-sm leading-relaxed">
              The current Buffett Indicator reading is displayed in real time on the Investus <Link href="/" style={{ color: "var(--mint)" }}>home screen</Link>. Pair it with the Fear &amp; Greed Index for a fuller picture of market temperature.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ Educational content only. The Buffett Indicator is a reference gauge, not a buy or sell signal. All investment decisions and their consequences are the investor&apos;s own responsibility.
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
            <Link href="/learn/portfolio-strategy" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">💼</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "포트폴리오 분산 투자 전략" : "Portfolio Diversification & Rebalancing"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "흔들리지 않는 포트폴리오 구성법" : "Building a resilient portfolio"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/valuation" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🔢</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "PER·PBR 밸류에이션 가이드" : "P/E, P/B & Valuation Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "개별 종목 비싸거나 싼지 보는 법" : "Individual stock valuation vs. market-wide gauge"}</p>
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
