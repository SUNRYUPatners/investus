"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function DividendPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/dividend")!;

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
              ? "배당은 회사가 이익의 일부를 주주에게 현금(또는 주식)으로 나눠 주는 것입니다. \"월급처럼\" 느껴지지만, 세후 현금흐름과 지속 가능성을 같이 봐야 합니다."
              : article.descEn}
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          {isKo ? (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>배당이 뭐예요?</h2>
            <p className="text-sm leading-relaxed mb-3">
              주식을 보유하면 두 가지로 돈이 움직일 수 있습니다.
              (1) 주가 상승·하락 (시세차익) (2) 배당 (회사 → 주주 현금).
              모든 회사가 배당을 주는 것은 아닙니다. 성장기는 이익을 사업에 재투자하고 배당을 거의 안 줄 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              미국 주식은 보통 분기(3개월)마다 배당하는 경우가 많습니다.
              &ldquo;매달 배당&rdquo; ETF도 있지만, 그게 항상 더 좋다는 뜻은 아닙니다 — 총수익·비용·구성을 봐야 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>왜 배당이 중요한가 (그리고 중요하지 않은가)</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>중요한 이유:</strong> 현금이 들어오면 심리가 편해질 수 있고,
              재투자하면{" "}
              <Link href="/learn/compound" style={{ color: "var(--mint)" }}>복리</Link>에 도움이 됩니다.
              은퇴 후 생활비처럼 <em>인출 계획</em>이 있을 때 배당은 유용한 도구입니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>과신하면 안 되는 이유:</strong> 배당은 주가에서 &ldquo;떨어져 나온&rdquo; 가치이기도 합니다.
              배당락일 전후로 주가가 조정되는 것이 정상입니다. &ldquo;배당 = 공짜 보너스&rdquo;가 아닙니다.
              높은 배당만 쫓으면{" "}
              <Link href="/learn/myths" style={{ color: "var(--mint)" }}>함정 수익률</Link>에 빠지기 쉽습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>배당수익률 — 숫자로 이해하기</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>배당수익률</strong> = (연간 배당금 ÷ 현재 주가) × 100%.
              주가 $100, 1년에 주당 $4를 주면 4%입니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed mb-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>예시 A:</strong> $50 주식, 연 $2 배당 → 4%. 실적 안정.</p>
              <p><strong style={{ color: "var(--text)" }}>예시 B:</strong> 같은 회사 실적 악화로 주가 $25 → 연 $2면 8%로 &ldquo;매력적&rdquo;으로 보임.</p>
              <p><strong style={{ color: "var(--text)" }}>함정:</strong> 곧 배당을 $1로 깎으면 수익률 4%로 돌아가고, 원금은 이미 −50%.</p>
            </div>
            <p className="text-sm leading-relaxed">
              비정상적으로 높은 수익률(예: 8~10%+)은 &ldquo;횡재&rdquo;보다 <em>위험 신호</em>로 먼저 의하세요.
              지속 가능한지 현금흐름·부채·배당성향을 확인해야 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>알아야 할 날짜 단어</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 mb-3">
              <li><strong style={{ color: "var(--text)" }}>배당 선언일</strong> — 회사가 &ldquo;이번엔 얼마 주겠다&rdquo;고 발표</li>
              <li><strong style={{ color: "var(--text)" }}>배당락일(ex-dividend)</strong> — 이 날짜부터 사면 이번 배당 대상이 아님</li>
              <li><strong style={{ color: "var(--text)" }}>지급일</strong> — 실제 계좌에 입금되는 날</li>
            </ul>
            <p className="text-sm leading-relaxed">
              &ldquo;배당락 직전에 사서 배당만 받고 팔기&rdquo;는 초보에게 이득이 되기 어렵습니다.
              배당락으로 주가가 조정되고, 수수료·세금이 남습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>배당귀족·아리스토크랫</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>배당귀족(Dividend Aristocrats)</strong> —
              S&amp;P500 구성 종목 중 25년 이상 연속으로 배당을 <em>인상</em>해 온 기업군을 가리키는 표현입니다.
              (정확한 지수 요건은 지수·상품마다 다를 수 있습니다.)
              JNJ, KO, PG 같은 이름이 자주 언급됩니다.
            </p>
            <p className="text-sm leading-relaxed">
              &ldquo;한 번도 안 깎았다&rdquo;는 과거 기록이지 미래 보장가 아닙니다.
              그래도 초보가 단일 고배당 함정주보다, 긴 배당 이력이 있는 쪽을 고르는 필터로는 쓸 만합니다.
              개별 종목 대신 SCHD 같은{" "}
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>배당 ETF</Link>로 묶는 방법도 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>DRIP — 배당 재투자</h2>
            <p className="text-sm leading-relaxed mb-3">
              DRIP(Dividend Reinvestment Plan)은 들어온 배당금으로 같은 주식·ETF를 자동으로 더 사는 설정입니다.
              현금을 쓰지 않고 수량이 늘어{" "}
              <Link href="/learn/compound" style={{ color: "var(--mint)" }}>복리</Link>에 유리한 습관입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>숫자 감각:</strong> 연 배당 3%를 전부 재투자하고
              주가·배당이 장기적으로 완만히 성장한다고 가정하면, 배당만 현금으로 빼 쓰는 경우보다
              수십 년 후 평가액 차이가 커질 수 있습니다. (세전·단순 가정 — 미래 보장 아님)
            </p>
            <p className="text-sm leading-relaxed">
              생활비로 배당을 써야 하는 단계라면 DRIP을 끄고 현금 수령을 선택합니다.
              &ldquo;항상 재투자&rdquo;가 정답이 아니라 <em>목표에 맞게</em> 켜고 끄는 것입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>세금 (한국 거주자 — 개념만)</h2>
            <p className="text-sm leading-relaxed mb-3">
              미국 주식 배당은 미국 측에서 원천징수되는 경우가 많고,
              국내에서도 금융소득으로 합산·신고 이슈가 생길 수 있습니다.
              &ldquo;앱에 찍힌 달러&rdquo;가 곧 세후 실수령은 아닙니다.
            </p>
            <p className="text-sm leading-relaxed">
              자세한 구조는{" "}
              <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>미국주식 세금</Link>·{" "}
              <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA·연금</Link> 가이드를 보세요.
              이 글은 세무 자문이 아닙니다. 금액이 커지면 전문가와 확인하세요.
              배당 전략일수록 <em>세후</em>로 비교하는 습관이 필요합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>성장 vs 배당 — 어떻게 나눌까</h2>
            <p className="text-sm leading-relaxed mb-3">
              젊은 투자자·장기 적립: 성장·지수 ETF 코어(
              <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>·{" "}
              <Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>나스닥</Link>
              )가 흔합니다. 배당은 적어도 총수익(시세+배당)이 목표입니다.
            </p>
            <p className="text-sm leading-relaxed">
              은퇴·현금흐름이 필요: 배당 비중을 늘리되, 한 종목 올인 대신 ETF·섹터 분산.
              현실적인 답은 둘을 섞는{" "}
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오</Link>입니다.
              환율도 수익률을 바꾸니{" "}
              <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>원/달러</Link>를 가끔 점검하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
              <li>수익률 %만 보고 매수 — 주가 급락형 함정</li>
              <li>배당락 단기 매매로 &ldquo;공짜 배당&rdquo; 노리기</li>
              <li>세금·원천징수를 무시하고 표면 수익률만 자랑</li>
              <li>배당 삭감 뉴스를 무시하고 본전 올 때까지 홀딩</li>
              <li>고배당 + 레버리지 상품을 장기 적립 코어로 사용</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Investus에서</h2>
            <p className="text-sm leading-relaxed mb-3">
              종목·ETF 페이지에서 배당 관련 수치와 리포트 맥락을 함께 보세요.
              &ldquo;배당만 높은 종목&rdquo; 리스트를 그대로 따라 사지 말고,{" "}
              <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>매수 체크리스트</Link>의
              비중·이유·세후 칸을 채우세요.
            </p>
            <p className="text-sm leading-relaxed">
              적립 습관과 맞추려면{" "}
              <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link> + DRIP 조합이
              초보에게 실행하기 쉽습니다.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 배당 정책은 기업 재량이며 삭감·중단 가능. 세금은 개인 상황에 따라 다르며 세무 자문이 아닙니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What Is a Dividend?</h2>
            <p className="text-sm leading-relaxed mb-3">
              When you own a stock, you can make money two ways: (1) price appreciation and (2) dividends — cash the company distributes from its profits directly to shareholders. Not every company pays dividends. High-growth companies often reinvest all earnings and pay nothing.
            </p>
            <p className="text-sm leading-relaxed">
              US stocks typically pay dividends quarterly. &ldquo;Monthly dividend&rdquo; ETFs exist but are not inherently superior — what matters is total return, expense ratio, and portfolio composition.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Why Dividends Matter — and Why They Don&apos;t</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Why they matter:</strong> Regular cash income provides psychological stability and can compound powerfully through reinvestment (<Link href="/learn/compound" style={{ color: "var(--mint)" }}>compounding guide</Link>). For retirees or those needing ongoing income, a dividend strategy can function like a systematic withdrawal plan.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>Why not to over-rely on them:</strong> Dividends are paid out of equity — the stock price typically drops by roughly the dividend amount on ex-dividend day. &ldquo;Dividend = free bonus&rdquo; is a myth. Chasing high yields leads directly to the <Link href="/learn/myths" style={{ color: "var(--mint)" }}>yield trap</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Dividend Yield — Understanding the Number</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Dividend Yield</strong> = (Annual Dividend per Share ÷ Current Stock Price) × 100%. If a stock trades at $100 and pays $4/year, yield is 4%.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed mb-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>Example A:</strong> Stock at $50, pays $2/year → 4%. Earnings stable.</p>
              <p><strong style={{ color: "var(--text)" }}>Example B:</strong> Same company disappoints; stock falls to $25. Same $2 payout now looks like 8% — &ldquo;attractive!&rdquo;</p>
              <p><strong style={{ color: "var(--text)" }}>The trap:</strong> Dividend gets cut to $1 → yield back to 4%, but you already lost 50% of principal.</p>
            </div>
            <p className="text-sm leading-relaxed">
              Abnormally high yields (8–10%+) are warning signs first, windfalls second. Always check free cash flow, debt levels, and payout ratio before buying a high-yielder.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Key Dates to Know</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 mb-3">
              <li><strong style={{ color: "var(--text)" }}>Declaration Date</strong> — company announces the next dividend amount and payment date</li>
              <li><strong style={{ color: "var(--text)" }}>Ex-Dividend Date</strong> — you must own the stock before this date to receive the upcoming dividend</li>
              <li><strong style={{ color: "var(--text)" }}>Payment Date</strong> — cash actually lands in your account</li>
            </ul>
            <p className="text-sm leading-relaxed">
              &ldquo;Buy just before ex-date, collect dividend, sell immediately&rdquo; rarely works for beginners. The stock price adjusts down on ex-date, and you still owe brokerage fees and taxes on the dividend received.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Dividend Aristocrats</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Dividend Aristocrats</strong> is the popular term for S&P 500 companies that have raised their dividend every year for at least 25 consecutive years. Well-known examples include Johnson &amp; Johnson (JNJ), Coca-Cola (KO), and Procter &amp; Gamble (PG).
            </p>
            <p className="text-sm leading-relaxed">
              A long dividend streak is a useful filter — it signals durable earnings and disciplined management — but it is a historical record, not a guarantee. Rather than picking individual Aristocrats, many investors prefer a <Link href="/learn/etf" style={{ color: "var(--mint)" }}>dividend ETF</Link> like SCHD for instant diversification.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>DRIP — Dividend Reinvestment Plans</h2>
            <p className="text-sm leading-relaxed mb-3">
              A DRIP automatically uses incoming dividends to buy more shares of the same stock or ETF. Your share count grows without you adding new cash, which turbocharges the <Link href="/learn/compound" style={{ color: "var(--mint)" }}>compounding</Link> effect over decades.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Rough intuition:</strong> If you earn 3% annually in dividends and reinvest all of it, the reinvested shares also generate dividends — the snowball grows. Over 30 years, the accumulated difference between DRIP and cash-out strategies can be substantial (before taxes, illustrative only).
            </p>
            <p className="text-sm leading-relaxed">
              Turn DRIP off when you need the income for living expenses. It is not &ldquo;always reinvest&rdquo; — it is &ldquo;reinvest when you don&apos;t need the cash.&rdquo;
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>US Dividend Withholding Tax</h2>
            <p className="text-sm leading-relaxed mb-3">
              The US withholds 15% of dividends paid to most foreign investors (under tax treaties). That means if a company declares a $1.00/share dividend, you receive $0.85. This withholding is applied before you ever see the cash — the number shown in many apps is already reduced.
            </p>
            <p className="text-sm leading-relaxed">
              Your home country may also impose additional taxes. Always compare strategies on an <em>after-tax</em> basis. For a fuller breakdown, see the <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>US Stock Tax Guide</Link>. Not tax advice — consult a professional for large amounts.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Growth vs. Dividend — How to Balance</h2>
            <p className="text-sm leading-relaxed mb-3">
              Younger investors accumulating wealth usually favor a growth-and-index-ETF core (<Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&P 500</Link>, <Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>Nasdaq</Link>). Even dividend-light, total return (price + reinvested dividends) is what matters long term.
            </p>
            <p className="text-sm leading-relaxed">
              Investors needing ongoing income — retirees or those in drawdown mode — can gradually shift toward dividend-focused ETFs or stocks. The practical answer is a blended <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>portfolio</Link>. Currency moves also affect real returns if you hold USD assets, so check the <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>FX guide</Link> periodically.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Common Mistakes</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
              <li>Buying based on yield % alone — often a falling-stock yield trap</li>
              <li>Trying to &ldquo;capture&rdquo; dividends by buying before ex-date and immediately selling</li>
              <li>Ignoring withholding taxes and reporting gross yield as actual income</li>
              <li>Holding a dividend-cutter waiting for recovery while the business deteriorates</li>
              <li>Using high-dividend leveraged products as a core long-term holding</li>
            </ul>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ Educational content only. Dividend policy is at company discretion and can be cut or eliminated. Tax treatment varies by individual. Not tax advice.
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
            <Link href="/learn/reits" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🏢</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "REITs 부동산 ETF 가이드" : "REITs & Real Estate ETFs Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "부동산 임대수익에 간접 노출" : "Indirect real estate income exposure"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/compound" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📈</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "복리와 장기 투자" : "Compound Interest & Long-Term Investing"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "DRIP이 복리를 만드는 원리" : "How DRIP turns dividends into compounding"}</p>
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
