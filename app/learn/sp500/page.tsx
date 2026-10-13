"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function SP500Page() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/sp500")!;

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-10">

        {/* Back */}
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
            <div className="rounded-2xl p-4 border" style={{ background: "rgba(var(--mint-rgb),0.04)", borderColor: "rgba(var(--mint-rgb),0.2)" }}>
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
              시가총액 가중 — 왜 상위 종목이 지수를 좌우하나
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              S&amp;P500은 시가총액이 큰 기업의 움직임이 지수에 더 크게 반영됩니다.
              그래서 메가캡 기술주가 강하면 지수도 강하고, 그 소수 종목이 조정을 받으면
              &ldquo;시장 전체&rdquo;가 약해 보일 수 있습니다. 실제로는 나머지 400여 종목이 다르게 움직일 때도 많습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              이것을 &ldquo;시장 폭(breadth)&rdquo;이라고 합니다. 지수만 보고 매매하면 착시가 생깁니다.
              Investus 홈의 섹터 히트맵은 지수 숫자 뒤에 어떤 업종이 오르내리는지 확인하는 용도입니다.
            </p>
            <p className="text-sm leading-relaxed">
              동일가중(equal-weight) S&amp;P500 ETF도 있습니다. 대형주 편중을 줄이지만, 중소형 비중이 커져
              변동성과 비용 구조가 다를 수 있습니다. 입문용 코어로는 일반 시총가중(VOO/IVV/SPY)이 더 흔합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              배당 재투자와 총수익
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              언론에 나오는 &ldquo;S&amp;P500 연 10%&rdquo;는 대개 <strong style={{ color: "var(--text)" }}>배당을 재투자한 총수익(total return)</strong>에 가깝습니다.
              가격 지수만 보면 숫자가 더 낮게 나옵니다. ETF를 보유하면 배당이 현금으로 들어오거나(과세 후)
              증권사 설정에 따라 재투자될 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              장기 성과를 비교할 때는 &ldquo;가격 수익률&rdquo;과 &ldquo;배당 포함 수익률&rdquo;을 구분하세요.
              한국 계좌에서는 배당 원천징수·양도세가 총수익을 깎으므로, 해외 백테스트 숫자를 그대로 기대하면 안 됩니다.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 이 글은 교육 목적의 투자 정보로, 특정 투자 상품의 매수·매도 권유가 아닙니다.
            과거 수익률은 미래 성과를 보장하지 않으며, 모든 투자는 원금 손실의 위험이 있습니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What Is the S&P 500?</h2>
            <p className="text-sm leading-relaxed mb-3">
              The S&P 500 (Standard &amp; Poor&apos;s 500) is a market-cap-weighted index of 500 large US companies traded on NYSE or Nasdaq. S&P Global reviews the composition quarterly. Because it is cap-weighted, mega-cap names like Apple, Microsoft, and Nvidia have an outsized effect on the index&apos;s daily movement.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              It is more than a &ldquo;stock index.&rdquo; Institutional investors, central banks, and pension funds worldwide use the S&P 500 as their primary benchmark. When analysts say the market is up or down, they almost always mean the S&P 500.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>Inclusion Criteria</p>
              <div className="flex flex-col gap-1.5 text-sm">
                {[
                  "Market cap of at least ~$14.5 billion",
                  "Positive earnings in the most recent quarter and over the prior four quarters",
                  "Listed on NYSE or Nasdaq",
                  "At least 50% of shares publicly available (float)",
                  "At least one year of trading history",
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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Sector Breakdown</h2>
            <p className="text-sm leading-relaxed mb-3">
              The S&P 500 is divided into 11 GICS sectors. As of 2024, Information Technology accounts for roughly 30% of the index — meaning Apple, Microsoft, Nvidia, and Alphabet alone can move the index meaningfully on any given day.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>Major Sector Weights (approx. 2024)</p>
              <div className="flex flex-col gap-2">
                {[
                  ["Information Technology", "~30%", "#10b981"],
                  ["Financials", "~13%", "#60a5fa"],
                  ["Health Care", "~12%", "#c084fc"],
                  ["Consumer Discretionary", "~10%", "#f59e0b"],
                  ["Communication Services", "~9%", "#fb923c"],
                  ["Industrials", "~8%", "#e879f9"],
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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Historical Performance</h2>
            <p className="text-sm leading-relaxed mb-3">
              The S&P 500&apos;s long-run annualized total return (including reinvested dividends) has been roughly 10–11%. After adjusting for inflation, the real return is approximately 7% per year — making it one of the most powerful long-term wealth-building tools available to individual investors.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              It does crash. The dot-com bust (2000–02), the global financial crisis (2008–09), and the COVID shock (2020) each caused drawdowns exceeding 50%. But after every single bear market, the index recovered and set new all-time highs.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "rgba(var(--mint-rgb),0.04)", borderColor: "rgba(var(--mint-rgb),0.2)" }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "var(--mint)" }}>📊 Key Statistics</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Long-run annualized return", "~10–11%"],
                  ["$10,000 invested 30 years", "~$174,000"],
                  ["Worst peak-to-trough", "−56.8% (2009)"],
                  ["Avg. recovery time", "~2–3 years"],
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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>S&P 500 vs Nasdaq vs Dow</h2>
            <p className="text-sm leading-relaxed mb-3">
              The three major US indices serve different purposes and include different stocks.
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  name: "S&P 500",
                  desc: "500 large-cap US companies across all sectors. The broadest and most representative benchmark. Used by institutional investors worldwide.",
                  color: "#10b981",
                },
                {
                  name: "Nasdaq Composite",
                  desc: "All stocks listed on the Nasdaq exchange — heavily skewed toward tech and growth. More volatile than the S&P 500; outperforms in bull markets, underperforms in downturns.",
                  color: "#60a5fa",
                },
                {
                  name: "Dow Jones Industrial Average",
                  desc: "Just 30 large, established US companies, price-weighted. The oldest index (since 1896), but considered less representative than the S&P 500 for portfolio benchmarking.",
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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>How to Invest in the S&P 500</h2>
            <p className="text-sm leading-relaxed mb-3">
              Individual investors access the S&P 500 primarily through ETFs. All three options below track the same index; the main differences are expense ratio and liquidity profile.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-3" style={{ color: "var(--text)" }}>Major S&P 500 ETFs</p>
              <div className="flex flex-col gap-2">
                {[
                  { ticker: "SPY", name: "SPDR S&P 500 ETF Trust", fee: "0.09%", note: "World's largest ETF by AUM; most liquid" },
                  { ticker: "VOO", name: "Vanguard S&P 500 ETF", fee: "0.03%", note: "Lowest expense ratio; popular for long-term DCA" },
                  { ticker: "IVV", name: "iShares Core S&P 500 ETF", fee: "0.03%", note: "Run by BlackRock; near-identical to VOO" },
                ].map((etf) => (
                  <div key={etf.ticker} className="rounded-xl p-3 border flex items-start gap-3"
                    style={{ background: "rgba(0,0,0,0.2)", borderColor: "rgba(255,255,255,0.06)" }}>
                    <div className="flex-shrink-0">
                      <p className="text-sm font-bold font-syne" style={{ color: "var(--mint)" }}>{etf.ticker}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold" style={{ color: "var(--text)" }}>{etf.name}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
                        Expense ratio {etf.fee} · {etf.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              For long-term investing, VOO or IVV are the most cost-efficient choices. The fee difference from SPY compounds meaningfully over decades.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Cap-Weighting and Market Breadth</h2>
            <p className="text-sm leading-relaxed mb-3">
              Because the S&P 500 is cap-weighted, the top 10 holdings can represent 30–35% of the index. When mega-cap tech is strong, the headline number looks great even if most of the other 490 stocks are flat or down. This gap between the index and its average member is called <strong style={{ color: "var(--text)" }}>market breadth</strong>.
            </p>
            <p className="text-sm leading-relaxed">
              There is also an equal-weight S&P 500 ETF (RSP). It reduces mega-cap concentration, but adds more exposure to smaller companies and tends to behave differently during momentum-driven markets. For most beginners, the standard cap-weighted index is the simpler starting point.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Total Return vs. Price Return</h2>
            <p className="text-sm leading-relaxed mb-3">
              When you read &ldquo;the S&P 500 returned 10% per year,&rdquo; that figure almost always includes <strong style={{ color: "var(--text)" }}>reinvested dividends</strong>. Price-only return is lower. ETF holders receive dividends as cash (subject to withholding tax) or reinvestment depending on brokerage settings.
            </p>
            <p className="text-sm leading-relaxed">
              When comparing historical results, distinguish &ldquo;price return&rdquo; from &ldquo;total return.&rdquo; Korean investors must also account for dividend withholding tax and capital gains tax, which reduce the net return below the headline backtest figure. See the <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>US Stock Tax guide</Link> for details.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ Educational content only. Past returns do not guarantee future results. All investments carry risk of principal loss.
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
            <Link href="/learn/fear-greed" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">😱</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "공포탐욕지수 완전 가이드" : "Complete Fear & Greed Index Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "시장 심리로 투자 타이밍 잡기" : "Reading market sentiment as context"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/buffett-indicator" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🏦</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "버핏지수 완전 가이드" : "Complete Buffett Indicator Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "시장 고평가 여부 판단하기" : "Market cap/GDP and overvaluation context"}</p>
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
