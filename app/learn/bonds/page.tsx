"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function BondsPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/bonds")!;

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
              ? "주식만 보면 시장의 절반을 놓칩니다. 채권은 \"나라·회사에 돈을 빌려주고 이자를 받는 영수증\"이고, 금리는 그 영수증의 가격을 매일 흔듭니다."
              : article.descEn}
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          {isKo ? (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>채권이란? (주식과 한 줄 비교)</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>채권(bond)</strong>은 국가나 기업이 &ldquo;돈을 빌릴게요. 만기까지 이자 주고, 마지막에 원금 갚을게요&rdquo;라고 발행하는 차용증입니다.
              <strong style={{ color: "var(--text)" }}>주식</strong>은 회사의 <em>소유권</em> 조각이고, 채권은 <em>빌려준 돈</em>입니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>주식</strong> — 회사가 잘되면 주가가 오를 수 있음. 망하면 주식이 0에 가까워질 수 있음.</p>
              <p><strong style={{ color: "var(--text)" }}>채권</strong> — 약속한 이자(쿠폰)와 만기 원금 상환이 목표. 중간에 팔면 가격이 오르내릴 수 있음.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>꼭 알아둘 단어 5개</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>액면가</strong> — 만기에 돌려받기로 한 원금.</li>
              <li><strong style={{ color: "var(--text)" }}>쿠폰(이자)</strong> — 매년(또는 반년) 받는 이자. 예: 액면 $1,000, 쿠폰 3% → 1년에 $30.</li>
              <li><strong style={{ color: "var(--text)" }}>만기</strong> — 원금을 갚는 날.</li>
              <li><strong style={{ color: "var(--text)" }}>수익률(yield)</strong> — 지금 시장 가격으로 사면 실질적으로 얼마의 이자를 받는 셈인가.</li>
              <li><strong style={{ color: "var(--text)" }}>듀레이션</strong> — 금리가 움직일 때 가격이 얼마나 민감한지. 만기가 길수록 보통 더 민감합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>핵심: 금리 오르면 채권 가격은 내려간다</h2>
            <p className="text-sm leading-relaxed mb-3">
              새 채권이 더 높은 이자를 주면, 예전에 산 &ldquo;이자 낮은 채권&rdquo;은 시장에서 싸게 팔려야 사람들이 삽니다.
              <strong style={{ color: "var(--text)" }}>금리 ↑ → 기존 채권 가격 ↓</strong> (반대도 성립).
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>숫자 예시 (개념용)</p>
              <p>당신이 쿠폰 2%짜리 국채를 $1,000에 샀습니다. 다음 해 새로 나오는 비슷한 국채가 쿠폰 4%면, 사람들은 $40을 주는 새 채권을 원합니다. 당신이 중간에 팔려면 가격을 내려야 합니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>미국 10년물 국채 수익률이 중요한 이유</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>미국 10년물</strong>은 주식·부동산·회사채를 평가할 때 무위험 기준 금리로 자주 씁니다.
              10년물이 오르면 특히 먼 미래 이익에 의존하는 성장주가 압박받기 쉽습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>수익률 곡선·역수익률이란?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>역수익률(inversion)</strong>은 예를 들어 2년물 이자가 10년물보다 <em>더 높을</em> 때입니다.
              과거에는 경기침체 전후에 나타난 적이 많습니다. 하지만 타이밍이 불확실하므로
              역전만 보고 전량 현금화하는 것은 공포 반응에 가깝습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보가 접하기 쉬운 채권 ETF</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>AGG / BND</strong> — 미국 종합 채권. &ldquo;채권 바구니&rdquo;에 가깝고, 입문 비중용으로 자주 언급됩니다.</li>
              <li><strong style={{ color: "var(--text)" }}>SHY / VGSH</strong> — 단기 국채 쪽. 금리 변동에 상대적으로 덜 민감.</li>
              <li><strong style={{ color: "var(--text)" }}>TLT</strong> — 만기 매우 긴 국채. 금리 인하 기대 시 크게 오를 수도, 금리 상승 시 크게 빠질 수도 있음.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["채권 = 원금 보장이라고 착각", "만기 전 매도·금리 급등·회사채 부도 시 손실 가능. ETF는 매일 가격이 움직입니다."],
                ["TLT만 사면 '방어'라고 생각", "장기채는 금리 민감도가 큽니다."],
                ["금리 뉴스만 보고 전량 매매", "하루 발표로 포트폴리오를 뒤집으면 단타입니다."],
                ["한국 세금·환율 무시", "미국 채권 ETF도 해외주식과 비슷한 세금·환율 이슈가 있습니다."],
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
            ⚠️ 교육 목적입니다. 채권·채권 ETF도 원금 변동·신용·금리 리스크가 있으며 투자·세무 자문이 아닙니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What Is a Bond?</h2>
            <p className="text-sm leading-relaxed mb-3">
              A bond is a loan you make to a government or corporation. In return, the issuer promises to pay you regular interest (coupon payments) and return your principal at maturity. Unlike stocks — which represent ownership — bonds represent debt.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>Stock</strong> — ownership slice. Upside is unlimited; downside can be total loss.</p>
              <p><strong style={{ color: "var(--text)" }}>Bond</strong> — lender&apos;s claim. Fixed coupons and principal repayment are the goal; credit risk and rate risk still apply.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>5 Key Terms</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>Face Value (Par)</strong> — the principal repaid at maturity, typically $1,000.</li>
              <li><strong style={{ color: "var(--text)" }}>Coupon</strong> — the annual interest rate paid on par. A 3% coupon on $1,000 = $30/year.</li>
              <li><strong style={{ color: "var(--text)" }}>Maturity</strong> — the date the issuer repays principal. Can be 2, 10, or 30 years away.</li>
              <li><strong style={{ color: "var(--text)" }}>Yield</strong> — the effective return if you buy at today&apos;s market price and hold to maturity.</li>
              <li><strong style={{ color: "var(--text)" }}>Duration</strong> — a measure of interest-rate sensitivity. Longer maturity = more price movement per rate change.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>The Core Principle: Rates Up, Prices Down</h2>
            <p className="text-sm leading-relaxed mb-3">
              When new bonds offer higher coupons, existing bonds paying lower rates become less attractive and must fall in price to compete. The rule is simple: <strong style={{ color: "var(--text)" }}>interest rates rise → existing bond prices fall</strong>, and vice versa.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>Numeric example (conceptual)</p>
              <p>You buy a 2% coupon bond at $1,000. New bonds now pay 4%. Buyers demand the higher yield, so your bond must drop in price to offer an equivalent effective return to the buyer.</p>
              <p>This is why the 2022 rate-hike cycle caused TLT (long-duration Treasury ETF) to fall over 30%.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Why the 10-Year Treasury Yield Matters</h2>
            <p className="text-sm leading-relaxed mb-3">
              The US 10-year yield is the closest thing markets have to a &ldquo;risk-free rate.&rdquo; When it rises, the discount rate applied to all future cash flows increases — which is why high-growth stocks (whose earnings are far in the future) tend to underperform during rate-hike cycles.
            </p>
            <p className="text-sm leading-relaxed">
              The 10-year yield is a critical input for valuation models, mortgage rates, and corporate borrowing costs. It is the single most-watched macro data point in US markets. See the <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>CPI &amp; Fed Guide</Link> for context.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Yield Curve &amp; Inversions</h2>
            <p className="text-sm leading-relaxed mb-3">
              The yield curve plots yields across maturities. Normally, longer maturities pay more. An <strong style={{ color: "var(--text)" }}>inverted curve</strong> — where short-term rates exceed long-term rates — has historically preceded recessions, though the lag is unpredictable (sometimes 12–24 months).
            </p>
            <p className="text-sm leading-relaxed">
              An inversion is a warning signal, not a sell trigger. Liquidating your portfolio on every inversion would have kept you out of major bull market gains. Use it as context for position sizing, not as a timing tool.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Bond ETFs for Beginners</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>AGG / BND</strong> — broad US bond market. A solid starting point for fixed-income exposure.</li>
              <li><strong style={{ color: "var(--text)" }}>SHY / SGOV / VGSH</strong> — short-term Treasuries. Low duration, less rate sensitivity, roughly cash-like.</li>
              <li><strong style={{ color: "var(--text)" }}>TLT / VGLT</strong> — long-duration Treasuries. Large price swings with rate moves. Not a &ldquo;safe&rdquo; short-term holding.</li>
              <li><strong style={{ color: "var(--text)" }}>HYG / JNK</strong> — high-yield (junk) bonds. Higher income, but correlates more with equities in downturns.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Role in a Portfolio</h2>
            <p className="text-sm leading-relaxed mb-3">
              The classic 60/40 portfolio (60% stocks, 40% bonds) is not magic — it is a historical compromise between growth and volatility reduction. During equity sell-offs, high-quality bonds often (though not always) hold value or rise, cushioning the portfolio.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>Aggressive (younger)</strong> — 80–100% equities, little or no bonds. Tolerates volatility for growth.</p>
              <p><strong style={{ color: "var(--text)" }}>Balanced</strong> — 60% equities / 40% bonds. Reduced drawdowns at the cost of some long-run return.</p>
              <p><strong style={{ color: "var(--text)" }}>Conservative (near retirement)</strong> — more bonds and short-term instruments to protect capital.</p>
            </div>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ Educational content only. Bond and bond ETF prices fluctuate; principal loss is possible. Not investment or tax advice.
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
            <Link href="/learn/macro-rates" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🏛️</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "CPI·연준·금리 가이드" : "CPI, Fed & Interest Rates Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "금리가 왜 오르내리는지" : "How rate decisions move markets"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/portfolio-strategy" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">💼</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "포트폴리오 분산·리밸런싱" : "Portfolio Diversification & Rebalancing"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "주식·채권 비중 잡기" : "Sizing stocks and bonds"}</p>
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
