"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function OptionsPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/options")!;

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
              ? "옵션은 \"나중에 어떤 가격에 사거나 팔 수 있는 권리\"를 사고파는 계약입니다. 뉴스·실적 시즌에 자주 나오지만, 시간 가치 소멸·레버리지로 원금 전액 손실이 가능합니다. 아래는 용어를 이해하기 위한 교육용 글입니다."
              : article.descEn}
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          {isKo ? (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>주식과 무엇이 다른가</h2>
            <p className="text-sm leading-relaxed mb-3">
              주식을 사면 그 회사의 지분을 갖습니다. 가격이 내려도 &ldquo;버티면 본전&rdquo;을 기대하는 사람이 많습니다(보장 아님).
            </p>
            <p className="text-sm leading-relaxed">
              옵션을 <em>산</em> 사람은 권리를 위해 <strong style={{ color: "var(--text)" }}>프리미엄</strong>(보험료 같은 돈)을 냅니다.
              만기까지 유리한 상황이 안 되면 그 프리미엄은 0에 가까워질 수 있습니다.
              &ldquo;오래 들고 있으면 회복&rdquo;이 기본값이 아닙니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>콜(Call)·풋(Put)</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>콜옵션</strong> —
              정해진 가격(행사가)에 기초자산(예: 주식·ETF)을 <em>살 수 있는</em> 권리.
              주가가 크게 오를 때 유리해지는 방향입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>풋옵션</strong> —
              정해진 가격에 <em>팔 수 있는</em> 권리.
              주가가 크게 내릴 때 유리. 보유 주식을 보험처럼 헤지할 때도 쓰입니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>숫자 예시 (매우 단순화)</strong></p>
              <p>어떤 주식이 지금 $100입니다. 행사가 $105 콜을 프리미엄 $3에 샀다고 합시다.</p>
              <p>만기에 주가가 $120이면, $105에 살 수 있는 권리가 대략 $15만큼 가치 있어 보입니다(수수료·세부 무시).
                $3를 냈으니 이익 감각은 $12 근처.</p>
              <p>만기에 주가가 $100에 머물면, $105에 살 이유는 없고 콜 가치는 0 → 낸 $3는 전부 손실에 가깝습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>행사가·만기·프리미엄</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>행사가(Strike)</strong> — 권리를 행사할 수 있는 약속 가격</li>
              <li><strong style={{ color: "var(--text)" }}>만기(Expiration)</strong> — 권리가 끝나는 날. 지나면 소멸</li>
              <li><strong style={{ color: "var(--text)" }}>프리미엄</strong> — 옵션을 사기 위해 지불하는 가격</li>
              <li><strong style={{ color: "var(--text)" }}>내가격·외가격</strong> — 지금 당장 행사하면 이득인지(내가격) / 아닌지(외가격)</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              만기가 가까울수록 <strong style={{ color: "var(--text)" }}>시간 가치</strong>가 빨리 줄어드는 경향이 있습니다(세타).
              &ldquo;조금만 더 기다리면&rdquo;이 오히려 가치를 깎을 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>IV(내재변동성)</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>IV(Implied Volatility)</strong>는
              옵션 가격에 녹아 있는 &ldquo;앞으로 얼마나 출렁일까&rdquo;에 대한 시장의 기대입니다.
              실적 발표·대형 이벤트 전에는 IV가 올라 프리미엄이 비싸지는 경우가 많습니다.
            </p>
            <p className="text-sm leading-relaxed">
              발표 직후 주가가 올라도 IV가 급락하면(<strong style={{ color: "var(--text)" }}>IV Crush</strong>)
              콜을 산 사람이 손해를 볼 수 있습니다. &ldquo;방향만 맞으면 된다&rdquo;가 통하지 않는 이유입니다.
              <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>실적 시즌</Link>과 함께 읽으세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>사는 쪽 vs 파는 쪽</h2>
            <p className="text-sm leading-relaxed mb-3">
              옵션을 <em>매수</em>하면 최대 손실은 (대개) 낸 프리미엄으로 제한되는 전략이 많습니다.
              옵션을 <em>매도(숏)</em>하면 프리미엄을 받지만, 전략에 따라 손실이 이론상 매우 커질 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              초보가 유튜브에서 &ldquo;옵션 팔아서 매달 수익&rdquo;만 보고 따라 하면 위험합니다.
              이해·증거금·자격 없이 숏에 들어가면 안 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>입문자가 피해야 할 것</h2>
            <div className="flex flex-col gap-3">
              {[
                ["0DTE(만기 당일) 올인", "시간 가치가 순식간에 사라집니다. 도박에 가깝습니다."],
                ["이해 없이 숏", "손실이 감당 불능일 수 있습니다."],
                ["레버리지 ETF와 혼동", "TQQQ와 옵션은 다른 상품입니다."],
                ["생활비·비상금으로 매매", "심리와 가계가 동시에 무너집니다."],
                ["'확정 수익' 전략 복제", "과거 백테스트 ≠ 미래."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>장기 투자와의 관계</h2>
            <p className="text-sm leading-relaxed mb-3">
              Investus가 초보에게 권하는 코어는
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>저비용 지수 ETF</Link> +
              <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립</Link> +
              <Link href="/learn/compound" style={{ color: "var(--mint)" }}>시간</Link>입니다.
              옵션은 그 위에 올리는 고급·고위험 도구이며, 없어도 충분히 투자할 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              심리 함정이 큰 영역입니다. <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>투자 심리</Link>·
              <Link href="/learn/myths" style={{ color: "var(--mint)" }}>초보 오해</Link>를 먼저 읽으세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>한국 투자자 참고</h2>
            <p className="text-sm leading-relaxed">
              미국 주식·ETF 옵션은 증권사마다 거래 가능 여부·자격·증거금이 다릅니다.
              세금·양도 규정도 국내 규정·증권사 정책을 확인해야 합니다.
              이 글은 자격 안내·세무 자문·매매 권유가 아닙니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>뉴스에서 옵션이 나올 때 읽는 법</h2>
            <p className="text-sm leading-relaxed mb-3">
              &ldquo;콜 매수 급증&rdquo; = 일부 트레이더가 상승에 베팅한다는 뜻이지, 주가가 반드시 오른다는 뜻이 아닙니다.
              &ldquo;풋으로 헤지&rdquo; = 하락 보험을 산다는 뜻이지, 폭락이 확정됐다는 뜻이 아닙니다.
            </p>
            <p className="text-sm leading-relaxed">
              초보는 헤드라인을 <em>분위기 힌트</em>로만 두고, 포트폴리오 비중은
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>분산·리밸런싱</Link> 규칙으로 유지하세요.
              옵션 미결제약정·이상한 티커를 쫓아갈 필요는 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>배움 순서 (매매 전)</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>주식·ETF·수수료·세금 기초 (<Link href="/learn/us-stock-basics" style={{ color: "var(--mint)" }}>입문</Link>)</li>
              <li>이 글의 콜·풋·만기·프리미엄·IV 용어 정리</li>
              <li>모의/페이퍼로만 손익 구조를 그려 보기 (실전 금지 권장)</li>
              <li>그래도 관심이 있으면 증권사 교육·자격 요건을 <em>직접</em> 확인 — 이 앱이 대신해 주지 않음</li>
            </ol>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 옵션은 고위험이며 원금 전액 손실이 가능합니다. 투자·세무 자문이 아닙니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>How Options Differ from Stocks</h2>
            <p className="text-sm leading-relaxed mb-3">
              When you buy a stock, you own a piece of the company indefinitely. Even if the price falls, you can hold and wait for a recovery (no guarantee, but the option remains). Options are fundamentally different — they are contracts with an expiration date.
            </p>
            <p className="text-sm leading-relaxed">
              The <em>buyer</em> of an option pays a <strong style={{ color: "var(--text)" }}>premium</strong> (upfront cost, like an insurance policy). If the underlying asset doesn&apos;t move favorably before expiration, that premium decays toward zero. &ldquo;Hold and recover&rdquo; is not the default outcome.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Calls and Puts</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Call option</strong> — the right to <em>buy</em> an asset at a fixed strike price before expiration. Profitable when the stock rises significantly above the strike.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Put option</strong> — the right to <em>sell</em> an asset at a fixed strike price before expiration. Profitable when the stock falls. Often used as portfolio insurance (hedging existing positions).
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>Simple numeric example</strong></p>
              <p>A stock is at $100. You buy a call with a $105 strike for a $3 premium.</p>
              <p>At expiration, stock is $120: the right to buy at $105 is worth roughly $15. You paid $3, so profit is approximately $12.</p>
              <p>At expiration, stock is still $100: no reason to buy at $105 when market is $100. Your call expires worthless — the full $3 premium is lost.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Key Terms: Strike, Expiry, Premium</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>Strike Price</strong> — the agreed price at which you can buy (call) or sell (put) the underlying asset</li>
              <li><strong style={{ color: "var(--text)" }}>Expiration Date</strong> — the date the contract ends. After this, the option is worthless if unexercised.</li>
              <li><strong style={{ color: "var(--text)" }}>Premium</strong> — the upfront price you pay to buy the option contract</li>
              <li><strong style={{ color: "var(--text)" }}>In-the-Money / Out-of-the-Money</strong> — ITM means exercising now would be profitable; OTM means it would not</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              As expiration approaches, <strong style={{ color: "var(--text)" }}>time value (theta)</strong> decays faster. Waiting &ldquo;a little longer&rdquo; can erode value quickly, especially in the final weeks.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Implied Volatility (IV)</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Implied Volatility (IV)</strong> is the market&apos;s expectation of future price swings, embedded in the option&apos;s price. Before major events — earnings, Fed decisions — IV rises and premiums become expensive.
            </p>
            <p className="text-sm leading-relaxed">
              Even if a stock moves in the right direction after an earnings release, if IV collapses immediately after (<strong style={{ color: "var(--text)" }}>IV Crush</strong>), the option buyer can still lose money. &ldquo;Get the direction right&rdquo; is necessary but not sufficient. See the <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>Earnings Season Guide</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Buying vs. Selling Options</h2>
            <p className="text-sm leading-relaxed mb-3">
              <em>Buying</em> options: your maximum loss is limited to the premium paid. Defined risk, but theta works against you continuously.
            </p>
            <p className="text-sm leading-relaxed">
              <em>Selling (writing)</em> options: you collect the premium upfront, but your potential loss can theoretically be very large (or unlimited for naked calls). Many &ldquo;sell options for income&rdquo; strategies look great in back-tests and blow up during volatility spikes. Beginners should not sell options without deep understanding, margin availability, and brokerage approval.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What Beginners Should Avoid</h2>
            <div className="flex flex-col gap-3">
              {[
                ["0DTE (same-day expiry) all-in", "Time value evaporates instantly. This is closer to gambling than investing."],
                ["Selling options without understanding", "Unlimited theoretical loss. Margin calls can exceed your account balance."],
                ["Confusing leveraged ETFs with options", "TQQQ and a call option are completely different instruments."],
                ["Trading with rent money or emergency funds", "Options losses can exceed 100% of the premium, and psychology collapses under financial pressure."],
                ["Copying \"guaranteed income\" strategies", "Historical back-tests do not capture tail risk. Past premium collection ≠ future safety."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Options in the Context of Long-Term Investing</h2>
            <p className="text-sm leading-relaxed mb-3">
              The foundation most beginners need is <Link href="/learn/etf" style={{ color: "var(--mint)" }}>low-cost index ETFs</Link> + <Link href="/learn/dca" style={{ color: "var(--mint)" }}>dollar-cost averaging</Link> + <Link href="/learn/compound" style={{ color: "var(--mint)" }}>time</Link>. Options are an advanced, high-risk layer on top of that foundation — completely optional and skippable.
            </p>
            <p className="text-sm leading-relaxed">
              Options are especially susceptible to behavioral mistakes. Read the <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>Psychology Guide</Link> and <Link href="/learn/myths" style={{ color: "var(--mint)" }}>Common Myths</Link> before going further.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Reading Options News Without Trading Them</h2>
            <p className="text-sm leading-relaxed mb-3">
              &ldquo;Call buying surge&rdquo; means some traders are betting on upside — it does not mean the stock will rise. &ldquo;Hedging with puts&rdquo; means someone is buying insurance against a drop — not that a crash is confirmed.
            </p>
            <p className="text-sm leading-relaxed">
              Treat options news as one more signal to contextualize, not a trading trigger. Maintain your portfolio with <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>diversification and rebalancing</Link> rules rather than reacting to unusual options activity.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ Educational content only. Options are high-risk derivatives. Total loss of premium is common. Not investment or tax advice.
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
            <Link href="/learn/etf" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📦</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "미국 ETF 완전 가이드" : "Complete US ETF Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "코어 ETF가 먼저입니다" : "Build your core before adding derivatives"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/investing-psychology" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🧠</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "투자 심리·행동재무" : "Investor Psychology & Behavioral Finance"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "옵션은 심리 함정이 큽니다" : "Options amplify every behavioral bias"}</p>
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
