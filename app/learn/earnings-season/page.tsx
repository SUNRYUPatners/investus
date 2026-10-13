"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function EarningsSeasonPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/earnings-season")!;

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
              ? "분기마다 미국 상장사가 \"이번 3개월 성적표\"를 공개합니다. 숫자 한 줄보다 예상을 이겼는지, 앞으로 전망이 어떤지가 주가를 흔드는 경우가 많습니다."
              : article.descEn}
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          {isKo ? (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>실적 시즌이란?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>실적 시즌(earnings season)</strong>은 많은 회사가 비슷한 시기에
              분기 실적(매출·이익 등)을 발표하는 기간입니다. 보통 1·4·7·10월 전후에 몰립니다.
            </p>
            <p className="text-sm leading-relaxed">
              왜 중요할까요? 애플·엔비디아·마이크로소프트 같은 대형주가 같은 주에 발표하면
              <Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}> 나스닥</Link>·<Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link> 지수 전체가 출렁일 수 있습니다.
              ETF만 사도 &ldquo;남의 실적&rdquo;이 내 계좌에 영향을 줍니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>꼭 알 단어: EPS·매출·컨센서스</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>매출(revenue)</strong> — 회사가 판 금액의 합. &ldquo;장사가 얼마나 됐나&rdquo;.</li>
              <li><strong style={{ color: "var(--text)" }}>EPS (주당순이익)</strong> — 순이익을 주식 수로 나눈 값. &ldquo;주식 한 주당 이익이 얼마인가&rdquo;에 가깝습니다.</li>
              <li><strong style={{ color: "var(--text)" }}>컨센서스</strong> — 애널리스트들이 미리 맞춰 둔 예상치의 평균(또는 중간값). &ldquo;시장이 기대하던 숫자&rdquo;.</li>
              <li><strong style={{ color: "var(--text)" }}>비트(beat)</strong> — 실제 숫자 &gt; 컨센서스. <strong style={{ color: "var(--text)" }}>미스(miss)</strong> — 실제 &lt; 컨센서스.</li>
            </ul>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed mt-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>숫자 예시 (가상의 회사)</p>
              <p>컨센서스 EPS $1.00 → 실제 $1.05면 &ldquo;비트&rdquo;입니다.</p>
              <p>그런데 경영진이 &ldquo;다음 분기는 $0.80 수준일 것&rdquo;이라고 하면, 비트해도 주가가 빠질 수 있습니다. 시장은 이미 지난 분기를 어느 정도 가격에 반영해 두고, <em>앞으로</em>를 더 보기 때문입니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>가이던스가 더 중요할 때가 많다</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>가이던스(guidance)</strong>는 회사가 스스로 말하는 &ldquo;앞으로의 전망&rdquo;(다음 분기·연간 매출·이익 범위 등)입니다.
              헤드라인에 &ldquo;실적 서프라이즈&rdquo;만 보고 사면 가이던스 약화로 바로 물릴 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              읽을 때 우선순위 예시: (1) 가이던스·수요·마진 코멘트 (2) EPS·매출 vs 컨센서스 (3) 자사주 매입·배당·부채 변화.
              재무제표로 숫자가 스토리와 맞는지 보려면 <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표 가이드</Link>,
              비싸 보이는지는 <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER·밸류</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>발표는 장중? 장후?</h2>
            <p className="text-sm leading-relaxed mb-3">
              많은 미국 기업은 정규장 마감 후(애프터마켓)나 개장 전(프리마켓)에 실적을 냅니다.
              이때는 거래량이 적고 호가가 벌어져, 같은 뉴스에도 가격이 과하게 튈 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              한국 시간으로는 새벽인 경우가 많습니다. &ldquo;잠결에 헤드라인만 보고 전량 매도&rdquo;는
              <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}> 심리 실수</Link>의 전형입니다.
              장전 온도: <Link href="/learn/futures" style={{ color: "var(--mint)" }}>선물·프리마켓</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>비트했는데 왜 떨어지나요?</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>가이던스가 약함 / 수요·마진 우려</li>
              <li>이미 &ldquo;비트할 것&rdquo;을 가정하고 주가가 올라 있었음 (기대가 선반영)</li>
              <li>같은 날 매크로(금리·CPI)가 더 큰 악재</li>
              <li>섹터 전체 분위기 (<Link href="/learn/sectors" style={{ color: "var(--mint)" }}>섹터</Link>)</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              반대로 미스여도 &ldquo;최악은 지났다&rdquo;는 가이던스면 반등하는 경우도 있습니다.
              <strong style={{ color: "var(--text)" }}>헤드라인 ≠ 매수/매도 신호</strong>로 기억하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>ETF 투자자는 어떻게?</h2>
            <p className="text-sm leading-relaxed mb-3">
              VOO·QQQ 같은 지수 ETF를 적립 중이라면, 개별 실적 하나에 적립을 끊을 필요는 거의 없습니다.
              수백 개 회사가 섞여 있고, 장기 수익률은 한 분기 서프라이즈보다
              <Link href="/learn/compound" style={{ color: "var(--mint)" }}> 시간·복리</Link>·<Link href="/learn/dca" style={{ color: "var(--mint)" }}>규칙적 적립</Link>에 더 가깝습니다.
            </p>
            <p className="text-sm leading-relaxed">
              개별 종목이 &ldquo;위성&rdquo;이라면: 발표 전후로 비중 상한·손절 규칙을 미리 적어 두고,
              발표 직후 충동 매매만 막으세요. 매수 전 점검은 <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>체크리스트</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>발표 전후 체크리스트</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>이 종목은 코어인가 위성인가? 비중 상한은?</li>
              <li>EPS·매출 vs 컨센서스 (비트/미스만으로 결론 내리지 않기)</li>
              <li>가이던스·마진·수요·경쟁 코멘트</li>
              <li>자사주·배당·부채·현금흐름 변화</li>
              <li>같은 업종 피어와 비교</li>
              <li>본인 투자 기간(3개월 vs 5년)과 맞는지</li>
              <li>-20% / +30% 때 할 행동을 미리 적었는지</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["'비트 = 상승'만 암기", "가이던스·밸류·선반영을 무시하면 물립니다."],
                ["애프터마켓에서 올인·전량 청산", "유동성이 낮아 체결가가 불리할 수 있습니다. 규칙을 낮에 정하세요."],
                ["코어 ETF 적립을 실적 주에 중단", "지수 투자의 의미를 스스로 없앱니다."],
                ["옵션으로 '실적 한 방'", "변동성이 비싸게 반영된 경우가 많습니다. 옵션은 별도 고위험 영역입니다."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-3">
              옵션: <Link href="/learn/options" style={{ color: "var(--mint)" }}>옵션 기초</Link> (교육용·고위험 안내).
              차트만 보고 판단하지 않기: <Link href="/learn/technical-analysis" style={{ color: "var(--mint)" }}>기술적 분석</Link>은 보조.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 실적 해석·매매 권유가 아니며 원금 손실이 가능합니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What Is Earnings Season?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Earnings season</strong> is the roughly six-week period each quarter when most public companies report their quarterly results. It clusters around January, April, July, and October — roughly 3–4 weeks after each calendar quarter ends.
            </p>
            <p className="text-sm leading-relaxed">
              Why it matters even for ETF investors: when Apple, Nvidia, and Microsoft report in the same week, the <Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>Nasdaq</Link> and <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P 500</Link> can swing sharply. Even if you only hold index ETFs, other companies&apos; earnings are affecting your portfolio.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Key Terms: EPS, Revenue, Consensus</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>Revenue</strong> — Total sales. How much business was done.</li>
              <li><strong style={{ color: "var(--text)" }}>EPS (Earnings Per Share)</strong> — Net income divided by shares outstanding. How much the company earned per share.</li>
              <li><strong style={{ color: "var(--text)" }}>Consensus</strong> — The average (or median) of analyst estimates. The number &ldquo;the market already expected.&rdquo;</li>
              <li><strong style={{ color: "var(--text)" }}>Beat</strong> — Actual result &gt; consensus. <strong style={{ color: "var(--text)" }}>Miss</strong> — Actual &lt; consensus.</li>
            </ul>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed mt-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>Numeric example</p>
              <p>Consensus EPS $1.00 → actual $1.05 = &ldquo;beat.&rdquo;</p>
              <p>But if management says next quarter will be ~$0.80, the stock can fall despite the beat. Markets price the future, not the past — a strong quarter was likely already baked in.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Guidance Often Matters More Than the Beat</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Guidance</strong> is management&apos;s forward-looking forecast — next quarter or full-year revenue and earnings ranges. A stock that beats the quarter but lowers guidance typically falls. A stock that misses but raises guidance often rallies.
            </p>
            <p className="text-sm leading-relaxed">
              Reading priority: (1) guidance, demand, and margin commentary; (2) EPS and revenue vs. consensus; (3) buybacks, dividends, and debt changes. To verify the numbers against the financials, see the <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>financial statements guide</Link>; for valuation context see <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>P/E &amp; valuation</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Pre-Market vs. After-Hours Reports</h2>
            <p className="text-sm leading-relaxed mb-3">
              Most US companies report earnings either before the market opens (pre-market) or after it closes (after-hours). Liquidity is thin in these sessions — bid-ask spreads widen and prices can overshoot in both directions on the same headline.
            </p>
            <p className="text-sm leading-relaxed">
              The rule: set your response plan — position sizing, stop levels, hold or add thresholds — during regular trading hours, before the report. Reacting to headlines in an illiquid after-hours market is a classic <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>psychology mistake</Link>. For pre-open context, see <Link href="/learn/futures" style={{ color: "var(--mint)" }}>futures &amp; pre-market</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Why Does a Beat Sometimes Cause a Drop?</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>Guidance was weak — the market prices the future, not the past quarter</li>
              <li>The beat was already priced in — the stock had already rallied in anticipation</li>
              <li>Same-day macro news (rate decision, CPI print) overwhelmed the company-specific result</li>
              <li>Sector rotation — the whole <Link href="/learn/sectors" style={{ color: "var(--mint)" }}>sector</Link> was being sold regardless of individual results</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              The reverse is equally true: a miss can be followed by a rally if guidance signals the worst is over. <strong style={{ color: "var(--text)" }}>Headline ≠ buy/sell signal.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>For ETF Investors</h2>
            <p className="text-sm leading-relaxed mb-3">
              If you are dollar-cost averaging into VOO or QQQ, there is almost never a good reason to pause contributions because of a single company&apos;s earnings. Hundreds of companies are in the mix, and long-term returns depend far more on <Link href="/learn/compound" style={{ color: "var(--mint)" }}>time and compounding</Link> than on any individual report.
            </p>
            <p className="text-sm leading-relaxed">
              For satellite individual stock positions: write down your position size ceiling and exit levels before the report is released. The only goal during earnings week is to avoid impulsive trades. Pre-trade discipline lives in the <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>buy checklist</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Pre/Post-Earnings Checklist</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Is this a core or satellite position? What is my size limit?</li>
              <li>EPS and revenue vs. consensus — don&apos;t conclude just from beat/miss</li>
              <li>Guidance, margin trends, demand commentary</li>
              <li>Buybacks, dividends, debt, and free cash flow changes</li>
              <li>Compare with industry peers</li>
              <li>Does the result match my investment time horizon (3 months vs. 5 years)?</li>
              <li>Have I written down what I will do at -20% and +30%?</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Common Mistakes</h2>
            <div className="flex flex-col gap-3">
              {[
                ["Treating \"beat = buy\"", "Ignoring guidance, valuation, and prior run-up leads to buying tops."],
                ["Going all-in or all-out after hours", "Low liquidity means bad fills. Set rules during regular hours."],
                ["Pausing index ETF contributions during earnings week", "This defeats the purpose of systematic investing."],
                ["Playing earnings with options for \"one big move\"", "Implied volatility is usually expensive going into earnings — you often need a larger move than expected to profit."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ Educational content only. This is not an interpretation of specific earnings reports or a trading recommendation. Principal loss is possible.
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
            <Link href="/learn/financial-statements" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📋</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "재무제표 읽기" : "Reading Financial Statements"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "손익·재무·현금흐름" : "Income, balance sheet & cash flow"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/valuation" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🔢</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "PER·PBR 가치 평가" : "P/E, P/B & Valuation Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "비싸거나 싼지 보는 법" : "Judging if a stock is cheap or expensive"}</p>
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
