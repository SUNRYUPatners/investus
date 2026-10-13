"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function NasdaqPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/nasdaq")!;

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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>세 가지를 구분하기</h2>
            <div className="flex flex-col gap-3">
              {[
                ["나스닥 거래소", "미국 전자 거래소. 기술·성장 기업이 많이 상장되어 있지만, 금융·소비재도 있습니다. Apple·Microsoft·NVIDIA 등이 여기 상장되어 있습니다."],
                ["나스닥 종합지수 (Composite)", "나스닥에 상장된 수천 종목을 아우르는 지수. 소형주까지 포함되어 변동 요인이 많습니다. 뉴스 헤드라인의 '나스닥'이 종종 이 숫자입니다."],
                ["나스닥100 (NDX)", "금융주를 제외한 대형 100종목. QQQ가 주로 따라가는 대상입니다. 한국 투자자가 ETF로 가장 많이 사는 '나스닥'은 사실 이쪽에 가깝습니다."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-3">
              왜 중요할까요? &ldquo;나스닥이 올랐다&rdquo;는 말이 종합지수인지 나스닥100인지에 따라
              내 ETF(QQQ) 성과와 다를 수 있기 때문입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>왜 S&P500보다 출렁이나</h2>
            <p className="text-sm leading-relaxed mb-3">
              나스닥100은 정보기술·커뮤니케이션·임의소비 비중이 높습니다.
              금리, 성장 기대, AI 사이클에 민감합니다. 상승장에서는 S&amp;P500을 앞서는 구간이 많고,
              긴축·실적 쇼크 구간에서는 낙폭이 더 클 수 있습니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>개념 숫자 (교육용)</p>
              <p>같은 해에 S&amp;P500이 −20%일 때 나스닥100이 −30% 근처까지 간 사례가 있었습니다(예: 2022년 성장주 조정 국면).</p>
              <p>반대로 AI·메가캡 강세 해에는 나스닥100이 S&amp;P500을 크게 앞설 수 있습니다. &ldquo;항상 더 좋다&rdquo;가 아니라 &ldquo;변동이 더 크다&rdquo;에 가깝습니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              S&amp;P500은 에너지·금융·헬스케어·필수소비 등이 더 섞여 있어, 같은 &ldquo;미국 대형주&rdquo;라도
              경기 민감도가 다릅니다. 자세한 비교는 <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500 가이드</Link>·
              <Link href="/learn/sectors" style={{ color: "var(--mint)" }}>섹터 가이드</Link>를 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>QQQ를 살 때</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>QQQ</strong>는 나스닥100을 추종하는 대표 ETF입니다. 유동성이 좋고 인지도가 높습니다.
              운용보수·구성 비중은 운용사 자료에서 확인하세요. 동일 지수를 추종하는 QQQM 등도 있습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              상위 종목 집중도가 높으면, 소수 메가캡이 성과를 좌우합니다.
              &ldquo;100개라서 충분히 분산됐다&rdquo;고 착각하지 마세요.
              이미 AAPL·MSFT·NVDA 개별주를 많이 들고 있다면 QQQ를 추가하는 순간 기술 비중이 한 번에 커집니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>중복 예시</p>
              <p>개별주로 빅테크 40% + QQQ 40%면, 사실상 기술·성장 비중이 대부분입니다. 기업 수만 세면 안 됩니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              레버리지 나스닥 ETF는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>에서 설명한
              변동성 감쇠 문제가 더 두드러질 수 있습니다. 적립 대상으로 TQQQ를 고르는 것은 권하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>선물·프리마켓과 나스닥</h2>
            <p className="text-sm leading-relaxed mb-3">
              한국 아침 뉴스의 &ldquo;나스닥 선물&rdquo;은 정규장 시작 전 온도입니다.
              선물이 올랐다고 당일 종가까지 올린다는 뜻은 아닙니다.
              Investus 홈의 선물·지수 영역은 개장 전 점검을 위해 두었습니다.
            </p>
            <p className="text-sm leading-relaxed">
              프리·애프터 마켓에서 개별 기술주가 크게 움직이는 날이 있습니다.
              유동성이 얇아 스프레드가 벌어지니, 입문자는 정규장 지정가를 기본으로 하세요.
              더 자세한 선물은 <Link href="/learn/futures" style={{ color: "var(--mint)" }}>선물·프리마켓 가이드</Link>를 참고하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>금리·실적 시즌에 일어나는 일</h2>
            <p className="text-sm leading-relaxed mb-3">
              성장주는 먼 미래 이익을 현재 가치로 할인합니다. 금리가 오르면 할인율이 커져
              같은 실적이라도 주가 배수가 줄어들 수 있습니다. 그래서 FOMC·CPI 날에 나스닥이
              S&amp;P500보다 더 크게 반응하는 경우가 많습니다.
            </p>
            <p className="text-sm leading-relaxed">
              빅테크 실적 주간에는 소수 종목이 지수 전체를 끌어올리거나 끌어내립니다.
              &ldquo;나스닥이 빠졌다&rdquo;고만 보지 말고, 상위 종목 뉴스를 같이 확인하세요.
              <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>실적 시즌 가이드</Link>·
              <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>금리 가이드</Link>와 함께 읽으면 맥락이 잡힙니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>포트폴리오에 넣는 법</h2>
            <p className="text-sm leading-relaxed mb-3">
              예시(교육용): 코어 S&amp;P500 70% + 나스닥100 20% + 현금 10%.
              기술주 개별 종목을 이미 많이 들고 있다면 QQQ를 추가하면 집중도가 더 올라갑니다.
              자산 탭에서 섹터·종목 비중을 보고{" "}
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>분산 전략</Link>과 맞춰 보세요.
            </p>
            <p className="text-sm leading-relaxed">
              적립으로 넣을 거면 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA 가이드</Link>의
              &ldquo;종목을 매달 바꾸지 않기&rdquo; 규칙을 그대로 적용하세요. 나스닥만 적립할지, S&amp;P와 나눠 적립할지는
              한 번만 정하고 최소 1년은 유지하는 편이 낫습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보가 자주 하는 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["나스닥 = 무조건 더 좋은 투자", "장기 기대수익·변동성·본인 버티기 능력을 같이 보세요."],
                ["종합지수 뉴스와 QQQ를 동일시", "추종 지수가 다르면 성과도 다릅니다."],
                ["TQQQ로 적립", "변동성 감쇠 + 심리적 항복이 겹치기 쉽습니다."],
                ["빅테크 + QQQ 중복 무시", "섹터 합계를 계산하세요."],
                ["선물만 보고 전량 매매", "개장 전 온도일 뿐입니다."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 할 일</h2>
            <ol className="list-decimal pl-5 text-sm leading-relaxed space-y-2">
              <li>보유 ETF가 Composite인지 나스닥100인지 상품설명서를 확인하세요.</li>
              <li>개별 기술주와 QQQ 비중을 합산해 적어 보세요.</li>
              <li>코어를 S&amp;P500으로 둘지, 성장 비중을 얼마나 둘지 한 줄 규칙을 정하세요.</li>
              <li><Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF</Link>·
                <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link> 가이드를 이어서 읽으세요.</li>
            </ol>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적 정보이며 특정 지수·ETF 투자 권유가 아닙니다. 원금 손실이 가능합니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Three Things Called &ldquo;Nasdaq&rdquo;</h2>
            <div className="flex flex-col gap-3">
              {[
                ["Nasdaq Exchange", "An electronic US stock exchange. Tech and growth companies dominate, but financials and consumer stocks are also listed. Apple, Microsoft, and Nvidia all trade here."],
                ["Nasdaq Composite", "An index of all several thousand stocks listed on the Nasdaq exchange, including small-caps. When headlines say 'Nasdaq is up,' they sometimes mean this broader number."],
                ["Nasdaq 100 (NDX)", "The 100 largest non-financial companies on Nasdaq. This is the index that QQQ tracks — and the one most investors mean when they buy a 'Nasdaq ETF.'"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-3">
              Why does it matter? If a headline says &ldquo;Nasdaq rose 1%&rdquo; but your QQQ ETF moved differently, it may be because the headline cited the Composite while your fund tracks the Nasdaq 100.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Why It Moves More Than the S&P 500</h2>
            <p className="text-sm leading-relaxed mb-3">
              The Nasdaq 100 is heavily weighted toward Information Technology, Communication Services, and Consumer Discretionary. These sectors are highly sensitive to interest rates, earnings growth expectations, and AI cycles. In bull markets, the Nasdaq 100 tends to outperform the S&P 500. In tightening or earnings-shock environments, its drawdowns tend to be larger.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>Illustrative Numbers (educational)</p>
              <p>In 2022, when the S&P 500 fell roughly −20%, the Nasdaq 100 declined closer to −30% as rate hikes compressed growth-stock multiples.</p>
              <p>In an AI-driven bull year, the Nasdaq 100 can outperform by a wide margin. The key word is not &ldquo;better&rdquo; — it is &ldquo;more volatile in both directions.&rdquo;</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              The S&P 500 includes energy, financials, health care, and consumer staples, giving it more balance across economic cycles. See the <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&P 500 Guide</Link> and <Link href="/learn/sectors" style={{ color: "var(--mint)" }}>Sectors Guide</Link> for side-by-side comparison.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Buying QQQ — What to Know</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>QQQ</strong> is the flagship ETF tracking the Nasdaq 100. It is highly liquid and widely recognized. A lower-cost version, <strong style={{ color: "var(--text)" }}>QQQM</strong>, tracks the same index and is designed for long-term holders.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              Don&apos;t assume &ldquo;100 companies&rdquo; means sufficient diversification. The top 10 holdings often represent 40–50% of QQQ. If you already own large individual positions in Apple, Microsoft, and Nvidia, adding QQQ doubles down on the same concentration.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>Overlap Example</p>
              <p>Big-tech individual stocks at 40% + QQQ at 40% = tech and growth at nearly 80% of your portfolio. Count sector exposure, not company names.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              Leveraged Nasdaq ETFs (TQQQ) suffer from volatility decay described in the <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF Guide</Link>. They are not appropriate for systematic DCA.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Futures and Pre-Market</h2>
            <p className="text-sm leading-relaxed mb-3">
              &ldquo;Nasdaq futures&rdquo; quoted on morning news shows the market&apos;s pre-open temperature — not a guarantee of where the index will close. Futures can reverse sharply between 6 a.m. and the 9:30 a.m. ET open.
            </p>
            <p className="text-sm leading-relaxed">
              Pre- and after-market sessions for individual tech stocks can produce outsized moves on thin volume. Wide bid-ask spreads make limit orders at regular session open a safer default for beginners. See the <Link href="/learn/futures" style={{ color: "var(--mint)" }}>Futures &amp; Pre-Market Guide</Link> for more.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Rates, Earnings, and the Nasdaq</h2>
            <p className="text-sm leading-relaxed mb-3">
              Growth stocks are valued by discounting future earnings back to today. When interest rates rise, that discount rate increases, compressing multiples even if the underlying earnings are unchanged. This is why the Nasdaq 100 reacts more sharply to FOMC and CPI releases than the broader S&P 500.
            </p>
            <p className="text-sm leading-relaxed">
              During big-tech earnings weeks, a handful of companies can swing the entire index by multiple percentage points. Instead of reacting to &ldquo;Nasdaq fell,&rdquo; check whether the move was driven by one or two names or by broad selling. Read the <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>Earnings Season Guide</Link> and <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>Rate Guide</Link> together for context.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Portfolio Allocation</h2>
            <p className="text-sm leading-relaxed mb-3">
              A common example (educational only): S&P 500 core at 70% + Nasdaq 100 at 20% + cash at 10%. If you already hold significant individual tech positions, adding QQQ raises concentration further — not reduces it. Check your holdings in the portfolio tab and compare against your <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>diversification targets</Link>.
            </p>
            <p className="text-sm leading-relaxed">
              For <Link href="/learn/dca" style={{ color: "var(--mint)" }}>systematic investing</Link>, decide once whether to DCA into Nasdaq 100 alone, S&P 500 alone, or a split — then stick to it for at least a year before evaluating. Changing the target ETF each month turns DCA into active trading.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Common Mistakes</h2>
            <div className="flex flex-col gap-3">
              {[
                ["Nasdaq = always the better investment", "Higher expected return comes with higher volatility. Make sure your risk tolerance matches."],
                ["Treating Composite news as QQQ performance", "Different indices, different results. Always check which one is being quoted."],
                ["DCA-ing into TQQQ", "Volatility decay and psychological capitulation are a dangerous combination."],
                ["Ignoring big-tech / QQQ overlap", "Calculate your total sector exposure, not just the number of positions."],
                ["Trading on futures alone", "Pre-market indicators are temperature checks, not trading signals."],
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
            ⚠️ Educational content only. Not a recommendation to buy any specific index or ETF. Principal loss is possible.
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
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📈</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "S&P500 완전 가이드" : "Complete S&P 500 Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "미국 경제의 온도계" : "The broadest US large-cap benchmark"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/etf" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📦</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "미국 ETF 완전 가이드" : "Complete US ETF Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "QQQ·레버리지 함정" : "QQQ, leverage traps, core vs. satellite"}</p>
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
