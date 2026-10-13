"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function EtfGuidePage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/etf")!;

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
              ? "ETF는 미국주식 입문자가 가장 많이 고르는 상품입니다. 한 종목으로 수백 개 기업에 나눠 담고, 주식처럼 장중에 사고팔 수 있습니다."
              : article.descEn}
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          {isKo ? (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>ETF란 무엇인가</h2>
            <p className="text-sm leading-relaxed mb-3">
              ETF(Exchange Traded Fund, 상장지수펀드)는 특정 지수나 자산군을 따라가도록 설계된 펀드를
              거래소에 상장한 것입니다. 펀드처럼 분산되고, 주식처럼 실시간 호가로 거래됩니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              개별 종목을 고르지 않아도 S&amp;P500, 나스닥100, 반도체, 배당주 바스켓에 투자할 수 있습니다.
              단, ETF도 원금 손실이 있고, 레버리지·인버스 ETF는 장기 보유에 특히 부적합할 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              뮤추얼펀드와 다른 점은 &ldquo;하루 한 번 NAV로만 사고파는&rdquo; 구조가 아니라,
              장중 내내 호가가 붙는다는 점입니다. 프리미엄·디스카운트가 생길 수 있지만
              대형 지수 ETF는 보통 스프레드가 매우 좁습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>자주 비교되는 티커</h2>
            <div className="rounded-2xl p-4 border space-y-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              {[
                ["SPY", "S&P500 추종. 유동성이 매우 크고 옵션 시장도 활발. 보수는 VOO/IVV보다 높은 편."],
                ["VOO / IVV", "같은 S&P500. 운용보수가 낮아 장기 적립 코어로 많이 선택됩니다."],
                ["QQQ", "나스닥100. 기술·성장 비중이 높아 상승장에 강하고 조정장에 더 흔들립니다."],
                ["SCHD / VYM 등", "배당 성향 ETF. 현금흐름을 중시할 때. 성장 속도는 지수 ETF보다 완만한 경우가 많습니다."],
                ["IWM", "러셀2000(소형주). 경기에 민감하고 변동성이 큽니다. 입문 코어로는 비중이 과하지 않게."],
                ["GLD / SLV", "금·은 현물 추종. 주식과 상관관계가 낮을 때가 있어 위성 자산으로 쓰입니다."],
              ].map(([t, d]) => (
                <div key={t}>
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed mt-0.5">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>고를 때 볼 숫자 4가지</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>운용보수(ER, Expense Ratio)</strong> — 연간 자산에서 떼는 비용. 같은 지수를 추종한다면 보수가 낮은 쪽이 장기적으로 유리한 경우가 많습니다.</li>
              <li><strong style={{ color: "var(--text)" }}>추적오차</strong> — 지수 대비 성과가 얼마나 빗나가는지.</li>
              <li><strong style={{ color: "var(--text)" }}>거래량·스프레드</strong> — 호가 간격이 좁을수록 매매 비용이 작습니다.</li>
              <li><strong style={{ color: "var(--text)" }}>구성 종목·섹터</strong> — 이름만 보고 사지 말고, 상위 10개 종목 비중과 섹터 비중을 확인하세요.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>코어와 위성으로 나누기</h2>
            <p className="text-sm leading-relaxed mb-3">
              입문 포트폴리오에서 ETF를 쓸 때는 <strong style={{ color: "var(--text)" }}>코어(Core)</strong>와
              <strong style={{ color: "var(--text)" }}> 위성(Satellite)</strong>을 나누는 편이 관리가 쉽습니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>코어: S&amp;P500 또는 전세계 주식 ETF. 적립의 대부분. 자주 바꾸지 않습니다.</li>
              <li>위성: 나스닥100, 반도체, 배당, 금 등. 전체의 10~30% 안에서만.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>레버리지 ETF를 피해야 하는 이유</h2>
            <p className="text-sm leading-relaxed mb-3">
              TQQQ, SOXL처럼 일간 수익률을 2~3배로 추종하는 상품은, 오를 때만이 아니라 내릴 때도 배가 됩니다.
              매일 리밸런싱하기 때문에 횡보장에서는 <strong style={{ color: "var(--text)" }}>변동성 감쇠</strong>로
              지수가 제자리여도 ETF 가격이 깎일 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              초보 투자자의 첫 상품으로 레버리지·인버스 ETF는 권하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>배당·세금·환율</h2>
            <p className="text-sm leading-relaxed mb-3">
              미국 ETF 배당은 보통 미국에서 원천징수된 뒤 국내 계좌로 들어옵니다.
              매매 차익은 국내 양도소득 과세 대상일 수 있습니다. 자세한 골격은{" "}
              <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>미국주식 세금 가이드</Link>를 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>자주 하는 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["같은 지수를 여러 ETF로 중복 매수", "SPY+VOO+IVV를 동시에 사면 분산이 아니라 중복입니다."],
                ["테마 ETF만 모으기", "AI·양자·우주를 한꺼번에 담으면 상관관계가 높아 조정이 한 번에 옵니다."],
                ["국내 상장 미국 ETF와 혼동", "한국 거래소에 상장된 미국지수 ETF는 과세·환헤지·거래시간이 다릅니다."],
                ["NAV와 시장가 차이를 무시", "거래량이 적은 테마 ETF는 호가가 벌어질 수 있습니다. 지정가로 넣으세요."],
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
            ⚠️ 교육 목적 정보이며 특정 ETF 매수·매도 권유가 아닙니다. 과거 성과는 미래를 보장하지 않으며 원금 손실이 가능합니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What Is an ETF?</h2>
            <p className="text-sm leading-relaxed mb-3">
              An Exchange-Traded Fund (ETF) is a basket of securities — stocks, bonds, or other assets — that trades on an exchange like a single stock. Unlike mutual funds, ETFs trade continuously throughout the day at market prices, making them highly accessible for individual investors.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              A single S&P 500 ETF like VOO or SPY gives you exposure to 500 large US companies in one purchase. This instant diversification eliminates the need to pick individual stocks and dramatically reduces company-specific risk.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>ETF vs. Mutual Fund vs. Stock</p>
              <div className="flex flex-col gap-2 text-sm">
                <div><strong style={{ color: "var(--text)" }}>ETF</strong> — trades like a stock, diversified like a fund, usually low-cost</div>
                <div><strong style={{ color: "var(--text)" }}>Mutual Fund</strong> — priced once daily at NAV, often higher minimums</div>
                <div><strong style={{ color: "var(--text)" }}>Stock</strong> — single company, higher potential return AND higher risk</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Key ETFs to Know</h2>
            <div className="rounded-2xl p-4 border space-y-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              {[
                ["SPY", "S&P 500 tracker. Most liquid ETF in the world, very active options market. Expense ratio slightly higher than VOO/IVV."],
                ["VOO / IVV", "Same S&P 500 index, lower expense ratio. Popular choice for long-term core holdings."],
                ["QQQ", "Nasdaq 100. Heavy tech/growth weighting — outperforms in bull markets, falls harder in corrections."],
                ["SCHD / VYM", "Dividend-focused ETFs. Good for income investors; typically grow more slowly than pure index ETFs."],
                ["IWM", "Russell 2000 small-cap index. More economically sensitive and volatile. Use as a small satellite position."],
                ["GLD / SLV", "Physical gold and silver trackers. Low correlation to equities at times — often used as a hedge."],
              ].map(([t, d]) => (
                <div key={t}>
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed mt-0.5">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>4 Numbers to Check Before Buying</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>Expense Ratio (ER)</strong> — the annual fee deducted from assets. 0.03% vs. 0.50% may look small but compounds significantly over decades.</li>
              <li><strong style={{ color: "var(--text)" }}>Tracking Error</strong> — how closely the ETF follows its benchmark index. Lower is better.</li>
              <li><strong style={{ color: "var(--text)" }}>Volume &amp; Bid-Ask Spread</strong> — tighter spreads mean lower trading costs. Always use limit orders for thinly traded ETFs.</li>
              <li><strong style={{ color: "var(--text)" }}>Top Holdings &amp; Sector Weights</strong> — look past the name. Some &ldquo;diversified&rdquo; ETFs concentrate heavily in 5–10 stocks.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Core vs. Satellite Strategy</h2>
            <p className="text-sm leading-relaxed mb-3">
              A practical ETF portfolio splits holdings into a <strong style={{ color: "var(--text)" }}>Core</strong> — the stable, low-cost index exposure you hold long-term — and a <strong style={{ color: "var(--text)" }}>Satellite</strong> — smaller tactical positions in sectors, themes, or factors.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>Core (70–90%):</strong> S&P 500 or total market ETF. Dollar-cost average, rarely change.</li>
              <li><strong style={{ color: "var(--text)" }}>Satellite (10–30%):</strong> Nasdaq 100, semiconductors, dividends, gold, etc. Express your views here but keep it bounded.</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              Swapping satellite positions every month turns disciplined investing into theme chasing. See <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>Portfolio Strategy</Link> for the full framework.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Why Avoid Leveraged ETFs</h2>
            <p className="text-sm leading-relaxed mb-3">
              Products like TQQQ (3× Nasdaq 100) amplify daily returns in both directions. Due to daily rebalancing, <strong style={{ color: "var(--text)" }}>volatility decay</strong> means the ETF can lose value even when the underlying index is flat or slightly positive over the same period.
            </p>
            <p className="text-sm leading-relaxed">
              Leveraged and inverse ETFs are designed as short-term trading tools, not long-term investments. Beginners should build their core with 1× index ETFs and individual quality stocks before touching leveraged products.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Common Mistakes</h2>
            <div className="flex flex-col gap-3">
              {[
                ["Holding duplicate ETFs", "Owning SPY + VOO + IVV is not diversification — they all track the same index. Pick one."],
                ["Stacking thematic ETFs", "AI + quantum + space ETFs are highly correlated. A single sector correction hits all of them at once."],
                ["Ignoring NAV vs. market price", "Thinly traded ETFs can trade at wide premiums or discounts. Always use limit orders."],
                ["Overlooking dividends and taxes", "ETF distributions are taxable events. Know your tax situation before choosing between accumulating and distributing ETFs."],
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
            ⚠️ Educational content only. Not a recommendation to buy or sell any ETF. Past performance does not guarantee future results.
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
            <Link href="/learn/dca" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📅</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "적립식 투자(DCA) 가이드" : "Dollar-Cost Averaging (DCA) Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "매달 같은 금액으로 모으는 법" : "Fixed monthly investing explained"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/nasdaq" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">💻</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "나스닥 완전 가이드" : "Complete Nasdaq Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "나스닥100과 QQQ를 구분하는 법" : "Nasdaq 100 and QQQ explained"}</p>
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
