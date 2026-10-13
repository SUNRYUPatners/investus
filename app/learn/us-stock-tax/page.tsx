"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function UsStockTaxPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/us-stock-tax")!;

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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>왜 세금을 먼저 배우나요?</h2>
            <p className="text-sm leading-relaxed mb-3">
              미국주식은 <strong style={{ color: "var(--text)" }}>살 때</strong>보다 <strong style={{ color: "var(--text)" }}>팔 때·배당 받을 때</strong> 세금 이벤트가 생깁니다.
              세후 수익률이 세전 차트와 다를 수 있고, 잦은 매매는 세금·수수료로 성과를 깎습니다.
            </p>
            <p className="text-sm leading-relaxed">
              세제혜택 계좌(ISA·연금)와 일반 해외주식 계좌는 규칙이 다릅니다.
              계좌 구분은 <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA·연금·IRP 가이드</Link>를 먼저 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>어디에 계좌를 열까</h2>
            <p className="text-sm leading-relaxed mb-3">
              대부분의 한국 개인 투자자는 국내 증권사의 해외주식 서비스로 미국 주식을 삽니다.
              미국 현지 브로커를 직접 쓰는 경우도 있으나, 송금·세금·상속·규제 이슈가 더 복잡해질 수 있습니다.
              입문 단계에서는 국내 증권사 + 해외주식 신청이 일반적입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              계좌를 여러 개 쪼개면 수수료·환전·잔고 관리 비용이 늘어납니다.
              거래 기록이 한곳에 모이면 양도세 계산도 수월합니다.
            </p>
            <p className="text-sm leading-relaxed">
              증권사마다 해외주식 수수료, 환전 우대, 소수점 거래, 프리마켓 지원이 다릅니다.
              &ldquo;이벤트로 수수료 0원&rdquo;만 보고 옮기면, 이벤트 종료 후 비용이 커질 수 있습니다.
              계좌 개설 체크리스트는 <Link href="/learn/us-stock-basics" style={{ color: "var(--mint)" }}>미국주식 입문</Link>에도 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>매매 차익: 양도소득이란?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>양도소득</strong>은 산 가격보다 비싸게 팔아서 생긴 차익입니다.
              해외주식 매도 차익은 국내에서 양도소득으로 다루는 것이 일반적입니다.
              연간 기본공제를 넘는 순이익에 세율이 붙는 구조가 오랫동안 쓰여 왔습니다.
              (정확한 공제액·세율·지방세 포함 여부는 해당 연도 세법을 보세요.)
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>숫자 예시 (개념용, 세율은 가정)</p>
              <p>올해 해외주식 순이익(원화) 500만 원, 기본공제 250만 원이면 → 과세표준 250만 원.</p>
              <p>세율·지방세를 합쳐 약 22%라면 → 세금 약 55만 원 수준으로 &ldquo;감&rdquo;을 잡습니다. (실제는 연도·개인·통산에 따라 다름)</p>
              <p>순이익이 200만 원이면 기본공제 안에 들어가 양도세가 0에 가까울 수 있습니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              &ldquo;팔지 않으면 세금이 없다&rdquo;는 말은 양도세에 한해 대략 맞지만,
              배당은 보유만 해도 과세 이벤트가 생깁니다. 리밸런싱·테마 교체를 자주 하면
              세금과 수수료가 성과를 깎습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>환율이 양도손익에 들어가는 이유</h2>
            <p className="text-sm leading-relaxed mb-3">
              손익은 보통 <strong style={{ color: "var(--text)" }}>원화</strong>로 계산합니다.
              달러 주가가 그대로여도 원화가 약해지면(환율↑) 원화 환산 이익이 늘 수 있고,
              원화가 강해지면(환율↓) 이익이 줄거나 손실이 날 수 있습니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p>매수 $100 × 1,200원 = 12만 원 원가.</p>
              <p>매도 $100 × 1,400원 = 14만 원 → 주가는 그대로인데 원화 이익 2만 원.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              상세 개념은 <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율 가이드</Link>를 보세요.
              적용 환율·산식은 증권사·세법을 따릅니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>배당: 미국 원천징수 + 국내 합산</h2>
            <p className="text-sm leading-relaxed mb-3">
              미국 기업·ETF 배당은 미국에서 일정 세율로 <strong style={{ color: "var(--text)" }}>원천징수</strong>되는 경우가 많습니다.
              한·미 조세조약이 적용되면 15%대가 흔히 언급됩니다. 증권사 입금 내역의
              &ldquo;세전 배당 / 원천세 / 실입금&rdquo;을 구분해 보관하세요.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>예시</p>
              <p>세전 배당 $100, 원천징수 15% → 계좌에 $85 입금.</p>
              <p>국내에서는 금융소득으로 합산될 수 있고, 이자·배당이 많아지면 종합과세 여부를 살펴야 합니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              REIT·일부 펀드 분배는 일반 배당과 세무 처리가 다를 수 있습니다.
              ETF 상품설명서의 분배금 성격과 증권사 원천징수 내역을 대조하세요.
              상품 구조는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>·
              <Link href="/learn/dividend" style={{ color: "var(--mint)" }}>배당 가이드</Link>를 참고하면 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>손익 통산·절세 매매의 함정</h2>
            <p className="text-sm leading-relaxed mb-3">
              손실이 난 종목을 같은 해에 실현하면 이익과 통산되는 경우가 많습니다.
              다만 &ldquo;절세 매매&rdquo;를 위해 우량 코어를 깨는 것은 본말이 전도될 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              세무 전략은 세무사와, 투자 전략은 본인 계획과 맞추세요.
              잦은 실현은 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립</Link> 철학과도 어긋나기 쉽습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보가 자주 하는 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["증권사 하나만 보고 신고", "여러 계좌를 쓰면 합산해야 합니다. 누락이 가산세를 만듭니다."],
                ["달러 차익만 보고 양도세 무시", "원화·환율이 들어갑니다."],
                ["배당은 공짜라고 생각", "원천징수 + 국내 합산이 있습니다."],
                ["ISA와 일반 계좌 규칙을 혼동", "비과세·공제·양도세 프레임이 다릅니다."],
                ["스크린샷만 모아 두기", "연말 PDF·거래내역 ZIP 백업이 더 안전합니다."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>신고 시즌에 당황하지 않으려면</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed">
              <li>증권사 앱의 &ldquo;해외주식 양도소득&rdquo; 안내·미리보기 메뉴를 연초에 한 번 열어 보세요.</li>
              <li>여러 증권사를 쓰면 내역을 합산해야 합니다. 한곳만 보고 신고하면 누락이 납니다.</li>
              <li>가족 명의·미성년 계좌는 증여·명의 이슈가 별도로 있습니다. 이 글 범위를 넘습니다.</li>
              <li>해외 직접 계좌(미국 브로커)는 FATCA·CRS·송금 증빙이 더 붙을 수 있습니다.</li>
            </ul>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 본 페이지는 세무·법률 자문이 아닙니다. 세법 개정으로 내용이 달라질 수 있으며, 개별 상황에 대한 책임은 이용자에게 있습니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Why Learn About Tax Before You Invest?</h2>
            <p className="text-sm leading-relaxed mb-3">
              With US stocks, the tax events happen <strong style={{ color: "var(--text)" }}>when you sell</strong> or <strong style={{ color: "var(--text)" }}>when you receive dividends</strong> — not when you buy. Your after-tax return can differ significantly from the pre-tax chart. Frequent trading compounds this through transaction taxes and fees.
            </p>
            <p className="text-sm leading-relaxed">
              Tax-advantaged accounts (ISA, pension savings, IRP) follow different rules from a regular overseas brokerage account. See the <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA &amp; Pension Guide</Link> for that comparison.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Where to Open an Account</h2>
            <p className="text-sm leading-relaxed mb-3">
              Most Korean individual investors buy US stocks through the overseas trading service of a Korean domestic broker. Opening a US brokerage account directly (e.g., Interactive Brokers, Charles Schwab) is possible but adds complexity around international wire transfers, FATCA reporting, Korean tax treatment, and inheritance rules. For beginners, a domestic Korean broker is the standard starting point.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              Spreading assets across too many brokerage accounts increases administrative burden. Consolidating transaction records in one place makes capital gains calculations significantly easier at year-end.
            </p>
            <p className="text-sm leading-relaxed">
              Brokers vary on commission rates, FX conversion spreads, fractional share support, and pre-market access. Zero-commission promotions often revert after an initial period. See the <Link href="/learn/us-stock-basics" style={{ color: "var(--mint)" }}>US Stock Basics Guide</Link> for an account-opening checklist.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Capital Gains Tax on US Stock Sales</h2>
            <p className="text-sm leading-relaxed mb-3">
              For Korean residents, profits from selling overseas stocks are generally treated as <strong style={{ color: "var(--text)" }}>capital gains (양도소득)</strong>. The annual basic deduction threshold reduces the taxable amount. Only the net profit above that threshold is taxed. The combined rate (including local surtax) has historically been around 22%, though exact figures depend on the applicable tax year and individual circumstances.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>Illustrative Example (assumed rates — verify with current law)</p>
              <p>Net profit for the year: ₩5,000,000. Basic deduction: ₩2,500,000. Taxable base: ₩2,500,000.</p>
              <p>At ~22% combined rate → estimated tax: ~₩550,000. Actual result depends on your year, transactions, and account type.</p>
              <p>If net profit is ₩2,000,000 (below the deduction threshold), capital gains tax may be near zero.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              &ldquo;No tax until you sell&rdquo; is roughly true for capital gains. But dividends create a taxable event the moment they are paid — regardless of whether you reinvest them.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>How Exchange Rates Affect Your Taxable Gain</h2>
            <p className="text-sm leading-relaxed mb-3">
              Your taxable gain is calculated in <strong style={{ color: "var(--text)" }}>Korean won</strong>, not dollars. If the USD/KRW rate rises while you hold a stock (weaker won), your won-denominated gain increases — even if the dollar price is unchanged. If the won strengthens, your reported gain shrinks.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p>Buy: $100 × ₩1,200/$ = ₩120,000 cost basis.</p>
              <p>Sell: $100 × ₩1,400/$ = ₩140,000 → ₩20,000 gain even though the dollar price was unchanged.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              See the <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>USD/KRW Guide</Link> for more on currency effects. The exact exchange rate methodology used in tax calculations follows your brokerage and current tax law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Dividend Withholding Tax</h2>
            <p className="text-sm leading-relaxed mb-3">
              US companies and ETFs typically withhold a portion of dividends at source before crediting your account. Under the Korea-US tax treaty, the standard rate for Korean residents is commonly cited at 15%. Your brokerage statement will show &ldquo;gross dividend / withholding tax / net credited.&rdquo; Keep these records.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>Example</p>
              <p>Gross dividend: $100. Withholding at 15%: $15. Credited to account: $85.</p>
              <p>In Korea, dividend income is also included in financial income (금융소득). If your total interest + dividend income exceeds a certain threshold, comprehensive income taxation (종합과세) may apply.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              REITs and some fund distributions may be taxed differently from ordinary dividends. Cross-reference your ETF prospectus with your brokerage&apos;s withholding statements. See the <Link href="/learn/dividend" style={{ color: "var(--mint)" }}>Dividend Guide</Link> for context.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Tax-Loss Harvesting — Use with Caution</h2>
            <p className="text-sm leading-relaxed mb-3">
              Realizing a loss in the same calendar year can offset taxable gains in many cases. However, breaking up a solid long-term core position purely for a tax benefit may cost you more in missed compounding than you save. Tax strategy belongs with a tax professional; investment strategy belongs with your own plan.
            </p>
            <p className="text-sm leading-relaxed">
              Frequent realization of gains and losses also conflicts with the spirit of <Link href="/learn/dca" style={{ color: "var(--mint)" }}>systematic investing</Link> — each round-trip adds transaction costs and potential tax friction.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Common Mistakes</h2>
            <div className="flex flex-col gap-3">
              {[
                ["Reporting from only one brokerage", "If you use multiple brokers, you must aggregate. Omissions can trigger penalties."],
                ["Ignoring the KRW/USD conversion on gains", "Your gain is taxed in won, not dollars. Currency moves affect your taxable amount."],
                ["Treating dividends as free money", "Withholding tax plus potential domestic aggregation means net dividend is less than the headline yield."],
                ["Confusing ISA/pension and regular account rules", "Tax exemptions, deductions, and capital gains treatment differ by account type."],
                ["Keeping only screenshots", "Export year-end trade history and dividend PDFs from your broker for proper documentation."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Staying Ready for Tax Season</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed">
              <li>Locate your broker&apos;s &ldquo;overseas stock capital gains preview&rdquo; menu at the start of each year.</li>
              <li>If you use multiple brokers, aggregate all records before filing — a single-broker view will be incomplete.</li>
              <li>Accounts under family members&apos; names or minor children involve separate gift and name-lending considerations beyond this article&apos;s scope.</li>
              <li>Direct foreign brokerage accounts (US-based) may require additional FATCA and CRS disclosures.</li>
            </ul>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ This page is for educational purposes only and does not constitute tax or legal advice. Tax laws change; individual situations vary. Consult a qualified tax professional for your specific circumstances.
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
            <Link href="/learn/usd-krw" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">💱</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "환율과 미국주식" : "USD/KRW & US Stocks"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "원/달러가 수익률을 어떻게 바꾸나" : "How currency moves affect your returns"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/korea-accounts" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🏦</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "ISA·연금저축·IRP" : "ISA, Pension Savings & IRP Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "세제혜택 계좌와 미국 ETF" : "Tax-advantaged accounts and US ETFs"}</p>
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
