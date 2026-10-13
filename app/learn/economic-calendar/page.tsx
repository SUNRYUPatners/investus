"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function EconomicCalendarPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/economic-calendar")!;

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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>경제 캘린더란?</h2>
            <p className="text-sm leading-relaxed mb-3">
              정부가 발표하는 물가·고용·성장 지표, 중앙은행(연준) 회의처럼
              시장이 크게 반응하는 일정을 날짜·시간별로 모아 둔 표입니다.
              각 항목에는 보통 <em>이전 값 · 시장 예상(컨센서스) · 실제 발표</em>가 붙습니다.
            </p>
            <p className="text-sm leading-relaxed">
              주가가 움직이는 이유 중 하나는 &ldquo;숫자 자체&rdquo;보다
              <strong style={{ color: "var(--text)" }}>예상과의 차이(서프라이즈)</strong>입니다.
              물가가 높더라도 &ldquo;예상보다 덜 높다&rdquo;면 시장이 안도할 수 있고, 그 반대도 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>왜 초보에게 중요한가</h2>
            <p className="text-sm leading-relaxed mb-3">
              발표 직후 수분~수시간은 호가가 넓어지고,{" "}
              <Link href="/learn/futures" style={{ color: "var(--mint)" }}>선물·프리마켓</Link>이 출렁입니다.
              레버리지·옵션·당일 단타를 들고 있으면 의도치 않은 손절·강제 청산을 맞기 쉽습니다.
            </p>
            <p className="text-sm leading-relaxed">
              장기{" "}
              <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립식</Link>·지수 ETF 투자자는
              일정을 &ldquo;알고 넘어가는&rdquo; 정도면 충분합니다.
              다만 <em>왜 오늘 뉴스가 시끄러운지</em>를 이해하면 공포에 전량 매도하는 실수를 줄일 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>꼭 알아둘 일정 (초보 우선순위)</h2>
            <div className="rounded-2xl p-4 border space-y-3 text-sm leading-relaxed mb-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p>
                <strong style={{ color: "var(--text)" }}>CPI / PCE</strong> — 소비자·개인소비 물가.
                인플레이션이 높은지 낮은지. 금리 기대를 흔듭니다. 자세한 흐름은{" "}
                <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>CPI·연준·금리 가이드</Link>.
              </p>
              <p>
                <strong style={{ color: "var(--text)" }}>FOMC</strong> — 미국 중앙은행(연준) 회의.
                기준금리 결정, 점도표(위원들의 금리 전망), 의장 기자회견이 함께 나옵니다.
              </p>
              <p>
                <strong style={{ color: "var(--text)" }}>비농업 고용·실업률</strong> — 일자리가 늘었는지.
                &ldquo;경기가 뜨거운지/식는지&rdquo; 신호로 금리·주식 모두에 영향.
              </p>
              <p>
                <strong style={{ color: "var(--text)" }}>GDP, PMI, 소매판매</strong> — 성장·기업 체감·소비.
                CPI·FOMC보다는 덜 자주 헤드라인이지만 추세 확인용.
              </p>
            </div>
            <p className="text-sm leading-relaxed">
              처음에는 빨간불(중요도 높음)만 체크해도 됩니다. 모든 지표를 외울 필요는 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>숫자 예시: &ldquo;예상보다&rdquo;가 핵심</h2>
            <p className="text-sm leading-relaxed mb-3">
              가상의 CPI 발표: 시장 예상 전년 대비 +3.0%, 실제 +3.3%.
              &ldquo;물가가 올랐다&rdquo;보다 &ldquo;예상보다 0.3%p 높다&rdquo;가 당일 금리·달러·성장주 반응을 만듭니다.
            </p>
            <p className="text-sm leading-relaxed">
              같은 날{" "}
              <Link href="/learn/bonds" style={{ color: "var(--mint)" }}>미국 10년물 금리</Link>가 급등하고
              나스닥이 약하면, &ldquo;금리가 부담&rdquo; 프레임으로 읽는 식입니다.
              반대로 숫자와 시장 반응이 어긋치면 첫 해석이 틀렸을 수 있으니 서두르지 마세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>발표 전에 할 일</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 mb-3">
              <li>레버리지 ETF·만기 임박 옵션 비중을 줄이거나 정리 검토</li>
              <li>당일 &ldquo;지표 방향 맞히기&rdquo; 데이트레이딩 자제</li>
              <li>코어{" "}
                <Link href="/learn/etf" style={{ color: "var(--mint)" }}>VOO·QQQ</Link> 장기 보유는
                일정을 이유로 전량 매도할 필요 없음 (계획이 없다면)</li>
              <li>
                <Link href="/learn/futures" style={{ color: "var(--mint)" }}>선물</Link>로 장전 온도만 확인
              </li>
            </ul>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>심리적 준비:</strong> 발표 직후 −1~2% 출렁임이
              &ldquo;내 인생 망함&rdquo;이 아니라 일정표에 있던 날임을 미리 인정하세요.{" "}
              <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>투자 심리</Link>가 여기서 작동합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>발표 직후에 할 일</h2>
            <p className="text-sm leading-relaxed mb-3">
              첫 15~30분은 알고리즘·헤지 주문이 교차하는 <em>노이즈</em> 구간인 경우가 많습니다.
              헤드라인만 보고 시장가 추격 매수·매도는 초보에게 특히 위험합니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              같이 볼 것: (1) 지표 vs 예상 (2) 금리·달러 반응 (3) 지수·섹터 반응.
              주식만 보면 &ldquo;왜&rdquo;가 빠집니다.
            </p>
            <p className="text-sm leading-relaxed">
              채권과 주식이 같은 방향으로 급하면 단순 &ldquo;리스크온/오프&rdquo; 프레임을 의심하세요.
              해석이 엇갈릴 때는 포지션을 키우지 않는 편이 낫습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>한국 시간으로 보기</h2>
            <p className="text-sm leading-relaxed mb-3">
              미국 오전(동부) 발표는 한국 저녁~심야인 경우가 많습니다.
              서머타임(일광절약시간)이 바뀌면 한 시간 밀립니다. 캘린더 앱의 &ldquo;한국 시간&rdquo; 표기를 믿으세요.
            </p>
            <p className="text-sm leading-relaxed">
              수면을 깨며 단타하는 것보다, 다음 날 Investus 리포트·홈 요약으로
              <em>정리된 맥락</em>을 보는 편이 장기 투자자에게 유리합니다.
              &ldquo;부지런함&rdquo;이 수익이 아니라는 점은{" "}
              <Link href="/learn/myths" style={{ color: "var(--mint)" }}>오해 TOP10</Link>과도 같습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
              <li>숫자만 보고 &ldquo;무조건 금리 인상 → 주식 폭락&rdquo;처럼 한 줄 공식화</li>
              <li>중요 지표 날 레버리지로 방향 베팅</li>
              <li>서프라이즈 직후 시장가로 추격</li>
              <li>장기 적립 계획을 하루 뉴스로 중단</li>
              <li>모든 지표를 다 챙기다가 정작 포트 규칙이 없음</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Investus에서</h2>
            <p className="text-sm leading-relaxed mb-3">
              홈·매크로 영역과 일일 리포트에서 그날의 CPI·FOMC·고용 이슈가 정리됩니다.
              캘린더로 &ldquo;오늘이 큰날인지&rdquo; 확인 → 리포트로 &ldquo;왜 움직였는지&rdquo; 복습 순서를 추천합니다.
            </p>
            <p className="text-sm leading-relaxed">
              공포·탐욕이 극단일 때는{" "}
              <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕지수</Link>도
              보조로만 보세요. 지표 발표와 겹치면 변동성이 이중으로 커질 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보용 미니 체크리스트</h2>
            <ol className="list-decimal pl-5 text-sm leading-relaxed space-y-2">
              <li>이번 주 빨간불 일정 3개만 표시했는가?</li>
              <li>레버리지·옵션 만기가 그 날짜와 겹치는가?</li>
              <li>발표 직후 1시간은 &ldquo;관찰만&rdquo;으로 정해 두었는가?</li>
              <li>장기 코어 매도 이유가 &ldquo;뉴스 공포&rdquo;뿐인가? (그렇다면 보류)</li>
            </ol>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 경제지표 트레이딩·방향 베팅을 권유하지 않습니다. 예시 숫자는 가상의 단순화입니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What Is an Economic Calendar?</h2>
            <p className="text-sm leading-relaxed mb-3">
              An economic calendar lists scheduled government data releases — inflation figures, employment reports, GDP, central bank meetings — by date and time, alongside the previous reading, market consensus forecast, and actual result once released. These are the events that reliably cause broad market moves.
            </p>
            <p className="text-sm leading-relaxed">
              Markets do not simply react to whether a number is high or low. They react to the <strong style={{ color: "var(--text)" }}>surprise vs. consensus</strong>. Inflation at 3.5% YoY can be bullish if the consensus was 3.8%, and bearish if the consensus was 3.2%. Understanding this distinction prevents misreading the market&apos;s reaction.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Why Beginners Should Pay Attention</h2>
            <p className="text-sm leading-relaxed mb-3">
              In the minutes to hours after a major release, bid-ask spreads widen and <Link href="/learn/futures" style={{ color: "var(--mint)" }}>futures and pre-market</Link> become volatile. Holding leveraged ETFs, short-dated options, or intraday positions during these periods greatly increases the chance of unintentional stop-outs or forced liquidation.
            </p>
            <p className="text-sm leading-relaxed">
              For long-term <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link> index investors, simply knowing an event is coming is enough. Understanding why the market is moving today prevents the panic-sell mistake — which is typically far more costly than the event itself.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>The Events That Matter Most (Beginner Priority)</h2>
            <div className="rounded-2xl p-4 border space-y-3 text-sm leading-relaxed mb-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p>
                <strong style={{ color: "var(--text)" }}>CPI / PCE</strong> — Consumer and Personal Consumption Expenditures price indices. The primary inflation gauges that drive Federal Reserve rate expectations. For deeper context see the <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>CPI &amp; Fed Guide</Link>.
              </p>
              <p>
                <strong style={{ color: "var(--text)" }}>FOMC Meeting</strong> — The Fed&apos;s interest rate decision, dot plot (members&apos; rate forecasts), and Chair press conference. The most market-moving scheduled event of any month it occurs.
              </p>
              <p>
                <strong style={{ color: "var(--text)" }}>Non-Farm Payrolls / Unemployment Rate</strong> — How many jobs were added (or lost) and the unemployment rate. A &ldquo;too hot&rdquo; labor market can push the Fed toward rate hikes; a &ldquo;cooling&rdquo; one signals potential cuts.
              </p>
              <p>
                <strong style={{ color: "var(--text)" }}>GDP, PMI, Retail Sales</strong> — Growth, business confidence, and consumer spending. Less explosive than CPI/FOMC but useful for tracking the economic trend over time.
              </p>
            </div>
            <p className="text-sm leading-relaxed">
              Start by flagging only the red (high-impact) items each week. You do not need to memorize every indicator.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Numeric Example: The &ldquo;vs. Consensus&rdquo; Effect</h2>
            <p className="text-sm leading-relaxed mb-3">
              Hypothetical CPI release: consensus forecast +3.0% YoY, actual result +3.3%. The headline &ldquo;inflation rose&rdquo; is less important than &ldquo;inflation came in 0.3 percentage points above expectations.&rdquo; That gap drives the intraday repricing.
            </p>
            <p className="text-sm leading-relaxed">
              On such a day, if the <Link href="/learn/bonds" style={{ color: "var(--mint)" }}>10-year Treasury yield</Link> spikes and Nasdaq underperforms, the market is repricing future rate expectations upward — reducing the present value of growth stocks. If the actual number and the market reaction diverge from your initial interpretation, slow down rather than chasing.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What to Do Before a Release</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 mb-3">
              <li>Review (and consider reducing) any leveraged ETF or near-expiry option positions.</li>
              <li>Avoid &ldquo;direction-betting&rdquo; day trades timed to the release itself.</li>
              <li>Core long-term holdings like <Link href="/learn/etf" style={{ color: "var(--mint)" }}>VOO or QQQ</Link> do not need to be sold just because a big data day is coming — if your plan did not include that as a sell trigger.</li>
              <li>Check <Link href="/learn/futures" style={{ color: "var(--mint)" }}>futures</Link> for the pre-market temperature before the US open.</li>
            </ul>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>Mental preparation:</strong> A 1–2% swing right after the release is a scheduled event, not a crisis. Pre-accepting this prevents the <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>emotional overreaction</Link> that turns a normal drawdown into a permanent loss.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What to Do in the First 30 Minutes After</h2>
            <p className="text-sm leading-relaxed mb-3">
              The first 15–30 minutes after a major release are dominated by algorithmic rebalancing and hedging flows. The initial direction often partially reverses. Market-ordering into a spike or gap is one of the worst-timed trades a beginner can make.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              Check all three simultaneously: (1) Actual vs. consensus for the data; (2) bond yield and dollar reaction; (3) equity index and sector reaction. Reading equities alone misses the &ldquo;why.&rdquo;
            </p>
            <p className="text-sm leading-relaxed">
              If bonds and stocks are moving in the same direction sharply, the simple &ldquo;risk-on / risk-off&rdquo; framework may not apply. When the interpretation is unclear, reducing position size rather than adding is the safer default.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Korean Time Zone Reference</h2>
            <p className="text-sm leading-relaxed mb-3">
              Most major US data releases occur at 8:30 AM ET, which is 9:30 PM KST (standard) or 10:30 PM KST (during US daylight saving time, March–November). FOMC decisions come at 2:00 PM ET. Set your calendar app to display KST times to avoid confusion.
            </p>
            <p className="text-sm leading-relaxed">
              For long-term investors, waking up to trade the 30-minute post-release window is rarely worth the sleep loss and emotional cost. Reading the Investus daily report the next morning for context is more effective — and less likely to lead to a reactive trade you will regret.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Common Mistakes</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
              <li>Applying a one-line formula: &ldquo;rate hike = stocks fall&rdquo; — the actual relationship is always more complex.</li>
              <li>Using leverage to bet on the direction of a data release.</li>
              <li>Market-ordering immediately after a surprise in either direction.</li>
              <li>Pausing a long-term DCA plan because of one data day.</li>
              <li>Tracking every calendar item obsessively while having no clear portfolio rules at all.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Using Investus</h2>
            <p className="text-sm leading-relaxed mb-3">
              The Investus home screen and macro section surface the day&apos;s CPI, FOMC, and jobs report context. The recommended workflow: check the calendar for whether today is a high-impact day → read the daily report after the event to understand what moved and why.
            </p>
            <p className="text-sm leading-relaxed">
              On days when the <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>Fear &amp; Greed Index</Link> is at an extreme and a major release coincides, volatility can stack. That is a day for observation, not new entries.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Mini Checklist for Beginners</h2>
            <ol className="list-decimal pl-5 text-sm leading-relaxed space-y-2">
              <li>Have I flagged the top 3 high-impact events this week?</li>
              <li>Do any of my leveraged positions or option expiries coincide with those dates?</li>
              <li>Have I committed to observation-only for the first hour after each release?</li>
              <li>Is &ldquo;news fear&rdquo; the only reason I am considering selling my long-term core? (If yes, pause.)</li>
            </ol>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ Educational content only. Not a recommendation to trade economic data releases or make directional bets. Example numbers are hypothetical and simplified.
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
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "금리가 주식·채권에 미치는 영향" : "How Fed decisions move stocks and bonds"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/futures" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📆</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "선물·프리마켓 읽는 법" : "How to Read Futures & Pre-Market"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "아침 선물 뉴스 오해 없이 읽기" : "Read overnight futures without misinterpreting"}</p>
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
