"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function DcaPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/dca")!;

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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>DCA란? (한 줄 정의)</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>DCA(Dollar-Cost Averaging)</strong>는
              &ldquo;정해진 주기로 같은 <em>금액</em>을 같은 자산에 넣는 것&rdquo;입니다.
              가격이 높을 때 수량이 적게, 낮을 때 많이 사져 평균 단가가 완만해지는 <em>경향</em>이 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              왜 중요한가요? 강한 상승장만 이어지면 초기에 목돈을 넣은 쪽이 유리할 수 있습니다.
              DCA의 진짜 가치는 수익 극대화가 아니라 <strong style={{ color: "var(--text)" }}>실행 가능성</strong>과
              고점 올인 방지입니다. &ldquo;언제 살지&rdquo;를 매일 고민하면 결국 안 사게 되는 사람이 많습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>숫자로 느끼는 평균단가</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>예시 (수수료·환율 무시, 개념용)</p>
              <p>매달 30만 원으로 ETF를 삽니다.</p>
              <p>1월 $100 → 약 3주 · 2월 $75 → 약 4주 · 3월 $150 → 약 2주</p>
              <p>총 투입 90만 원, 보유 약 9주 → 평균 단가 ≈ $100.</p>
              <p>만약 1월에 90만 원을 한 번에 $100에 샀다면 평균도 $100이지만,
                중간에 $75에서 더 많이 담는 효과가 DCA에 있습니다. (항상 이기는 것은 아닙니다.)</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              가격이 계속 오르기만 하면 초기에 몰아 산 쪽이 유리합니다.
              DCA는 &ldquo;모르는 미래를 버티는 습관&rdquo;에 가깝습니다.{" "}
              <Link href="/learn/compound" style={{ color: "var(--mint)" }}>복리·장기 투자</Link>와 함께 보면 시간이 왜 중요한지 연결됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>목돈 일시 투자 vs 적립</h2>
            <p className="text-sm leading-relaxed mb-3">
              학술·실무에서 자주 나오는 결론은 &ldquo;장기적으로 주가가 우상향한다면, 가능한 한 빨리 시장에 넣는 쪽이
              기대값이 높다&rdquo;는 쪽입니다. 다만 그 문장은 <em>심리를 버틸 수 있을 때</em>만 의미가 있습니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>일시 투입이 맞는 경우</strong> — 이미 투자 경험이 있고, 현금이 예비비 위에 남아 있으며, 2~3년 안에 쓸 돈이 아닙니다.</p>
              <p><strong style={{ color: "var(--text)" }}>적립이 맞는 경우</strong> — 월급으로 모으는 단계, 첫 해외주식, 고점 공포가 큰 사람.</p>
              <p><strong style={{ color: "var(--text)" }}>혼합</strong> — 목돈의 30~50%를 먼저 넣고 나머지를 6~12개월 적립. 타협안입니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>한국 투자자가 추가로 겪는 변수: 환율</h2>
            <p className="text-sm leading-relaxed mb-3">
              원화로 월급을 받고 달러 자산을 사면, 주가뿐 아니라 원/달러도 매수 단가에 들어갑니다.
              달러가 비쌀 때 같은 원화로 사는 주식 수량이 줄어듭니다. DCA는 이 환율 변동도 시간에 분산합니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>환율 예시</p>
              <p>매달 30만 원 환전. 환율 1,200원이면 ≈ $250, 1,500원이면 ≈ $200.</p>
              <p>같은 원화라도 달러 수량이 달라집니다. 그래서 &ldquo;환율 떨어질 때까지 적립 중단&rdquo;은 DCA를 깨뜨립니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              원화 환산 손익은 <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율 가이드</Link>에서 더 다룹니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>실전 규칙 예시</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>대상: S&amp;P500 ETF 1종 (VOO 또는 IVV 등). 처음에는 종목을 늘리지 않습니다. 상품 비교는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>.</li>
              <li>주기: 매월 급여일 +1~2일. 자동이체·예약 매수가 있으면 감정 개입을 줄입니다.</li>
              <li>금액: 생활비를 빼고도 12개월 유지 가능한 금액. &ldquo;남는 돈&rdquo;이 아니라 예산의 한 줄로 잡습니다.</li>
              <li>예외: 실직·의료비 등 현금이 필요하면 적립을 줄이거나 멈춥니다. 레버리지로 메우지 않습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>DCA가 실패하는 패턴</h2>
            <div className="flex flex-col gap-3">
              {[
                ["하락장에 중단", "가장 수량이 많아지는 구간에서 멈추면 평균단가 효과가 사라집니다. 공포탐욕만 보고 끊지 마세요."],
                ["종목을 매달 바꿈", "테마를 쫓으면 적립이 아니라 단타가 됩니다. 코어 ETF는 최소 1년은 유지하세요."],
                ["레버리지로 적립", "변동성 감쇠 + 심리적 항복이 겹치기 쉽습니다. TQQQ 적립은 DCA의 대표 오용입니다."],
                ["적립과 전량 매도를 반복", "공포탐욕만 보고 팔면 DCA 의미가 없습니다. 비중만 소폭 조절하세요."],
                ["생활비를 깎아 적립", "카드값·월세를 미루며 사는 적립은 지속 불가능합니다. 먼저 비상금."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-3">
              심리는 <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>투자 심리 가이드</Link>·
              <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕지수</Link>와 함께 보면 중단 유혹을 객관화하기 쉽습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 할 일</h2>
            <ol className="list-decimal pl-5 text-sm leading-relaxed space-y-2">
              <li>월급일 기준 적립일과 금액을 한 줄로 적으세요. (예: 매월 25일, 30만 원, VOO)</li>
              <li>12개월 유지 가능한지 비상금과 분리해 확인하세요.</li>
              <li>환전일을 적립일과 맞추세요.</li>
              <li>상품은 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF</Link>,
                입문은 <Link href="/learn/us-stock-basics" style={{ color: "var(--mint)" }}>미국주식 입문</Link>을 이어서 읽으세요.</li>
            </ol>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. DCA는 수익을 보장하지 않으며 원금 손실이 가능합니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What Is DCA?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Dollar-Cost Averaging (DCA)</strong> means investing a fixed <em>dollar amount</em> into the same asset on a regular schedule — regardless of price. When prices are high, your fixed amount buys fewer shares. When prices are low, it buys more. Over time this smooths your average cost per share.
            </p>
            <p className="text-sm leading-relaxed">
              DCA&apos;s real value is not return maximization — it is <strong style={{ color: "var(--text)" }}>consistency</strong>. In a straight-up bull market, a lump sum invested early outperforms DCA. But for most people, the biggest risk is never investing at all because they can&apos;t decide when to start. DCA removes that decision. See <Link href="/learn/compound" style={{ color: "var(--mint)" }}>Compound Interest &amp; Long-Term Investing</Link> for why time in the market matters.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>The Average Cost Mechanic — By the Numbers</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>Example (ignoring fees and FX, conceptual only)</p>
              <p>You invest $250/month into an ETF.</p>
              <p>Month 1 at $100/share → 2.5 shares · Month 2 at $75/share → 3.3 shares · Month 3 at $150/share → 1.7 shares</p>
              <p>Total invested: $750 · Shares held: ~7.5 · Average cost: ~$100/share.</p>
              <p>A lump sum of $750 at $100 also gives $100 average cost — but DCA bought more shares during the month-2 dip. The benefit shows up when markets are volatile, not trending straight up.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              In a relentlessly rising market, the lump-sum investor wins. DCA is better described as a &ldquo;habit that survives an unknown future&rdquo; than as a return-maximizing strategy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Lump Sum vs. DCA</h2>
            <p className="text-sm leading-relaxed mb-3">
              Research generally finds that investing a lump sum immediately outperforms spreading it over time — because markets trend upward over long periods and cash waiting on the sidelines earns less. But this conclusion only holds if you can psychologically tolerate a large immediate drawdown.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>Lump sum fits when</strong> — you have investing experience, cash surplus above your emergency fund, and won&apos;t need the money for 3+ years.</p>
              <p><strong style={{ color: "var(--text)" }}>DCA fits when</strong> — you&apos;re building savings from monthly income, it&apos;s your first overseas investment, or high-entry-point anxiety is a real concern.</p>
              <p><strong style={{ color: "var(--text)" }}>Hybrid</strong> — invest 30–50% of a lump sum now, DCA the remainder over 6–12 months. A reasonable compromise.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>The Extra Variable: USD/KRW Exchange Rate</h2>
            <p className="text-sm leading-relaxed mb-3">
              Korean investors earn income in won and buy USD-denominated assets. Your purchase price is determined not just by the stock&apos;s dollar price but also by the won/dollar rate on the day you convert and buy. DCA spreads this currency risk across time as well.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>Currency Example</p>
              <p>Converting ₩300,000/month: at ₩1,200/$ you get ~$250; at ₩1,500/$ you get ~$200.</p>
              <p>Same won amount, different USD purchasing power. This is why pausing DCA to &ldquo;wait for a better exchange rate&rdquo; breaks the discipline.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              See the <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>USD/KRW Guide</Link> for a deeper look at currency effects on returns.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>A Simple DCA Rule Set</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>Target:</strong> One broad-market ETF (e.g., VOO or IVV). Do not add new tickers in the first year. See the <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF Guide</Link> for comparison.</li>
              <li><strong style={{ color: "var(--text)" }}>Schedule:</strong> 1–2 days after each paycheck. Automate if your broker supports scheduled orders — remove the emotion entirely.</li>
              <li><strong style={{ color: "var(--text)" }}>Amount:</strong> A fixed sum you can sustain for 12 months after covering all living expenses. Budget it like a bill, not &ldquo;whatever is left over.&rdquo;</li>
              <li><strong style={{ color: "var(--text)" }}>Exceptions:</strong> Reduce or pause if you face job loss, medical bills, or another genuine cash emergency. Never borrow to keep the schedule.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Patterns That Make DCA Fail</h2>
            <div className="flex flex-col gap-3">
              {[
                ["Stopping during a downturn", "The months when prices are lowest are when DCA acquires the most shares. Pausing based on Fear & Greed eliminates the advantage."],
                ["Switching target ETFs each month", "Chasing themes turns a systematic habit into active trading. Commit to your core ETF for at least 12 months."],
                ["DCA-ing into a leveraged product", "Volatility decay compounds losses. TQQQ as a DCA vehicle is a widely cited misuse of the strategy."],
                ["Alternating DCA and full liquidation", "Selling everything on fear, then restarting when sentiment improves, destroys the cost-averaging benefit."],
                ["Cutting living expenses to keep investing", "An unsustainable budget breaks the schedule. Build your emergency fund first."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-3">
              For the psychological side of staying the course, read the <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>Investor Psychology Guide</Link> and the <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>Fear &amp; Greed Index Guide</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ Educational content only. DCA does not guarantee profits; principal loss is possible.
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
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "SPY·VOO·QQQ 고르는 법" : "Choosing between SPY, VOO, and QQQ"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/us-stock-tax" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🧾</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "미국주식 세금·계좌 가이드" : "US Stock Taxes for Korean Residents"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "양도세·배당 원천징수 개념" : "Capital gains, dividends, and withholding"}</p>
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
