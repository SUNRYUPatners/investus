"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function CompoundPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/compound")!;

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
              ? "시간 × 수익을 다시 투자하는 수학입니다. 왜 오래 버티라고 하는지를 숫자로 이해할 수 있습니다."
              : article.descEn}
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          {isKo ? (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>단리 vs 복리 — 한 문장으로</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>단리:</strong> 이자(수익)를 꺼내 쓰고, 다음 해에도 처음 원금만으로 이자를 계산.
              <strong style={{ color: "var(--text)" }}> 복리:</strong> 이자까지 다시 넣어 두어, 다음 해에는 &ldquo;원금+이자&rdquo;가 새 기준이 됨.
            </p>
            <p className="text-sm leading-relaxed">
              주식·ETF에서는 배당을 재투자하거나(<Link href="/learn/dividend" style={{ color: "var(--mint)" }}>DRIP</Link>), 팔지 않고 평가액이 불어난 채로 두는 것이 복리에 가깝습니다.
              자주 팔아 현금을 빼면 복리 시계가 멈춥니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>숫자로 보는 차이 (세전·단순)</h2>
            <p className="text-sm leading-relaxed mb-3">
              가정: 시작 $10,000, 연 수익률 7%, 30년, 중간에 인출 없음. (실제 시장은 매년 7%가 아니고, 세금·수수료도 있습니다 — 감각용 예시입니다.)
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed mb-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>단리 감각:</strong> 매년 원금의 7%만 → 30년 이자 합 $21,000대 → 합계 약 $31,000.</p>
              <p><strong style={{ color: "var(--text)" }}>복리:</strong> 이자가 이자를 낳음 → 대략 $76,000대.</p>
              <p>차이인 약 $45,000은 &ldquo;재능&rdquo;이 아니라 <em>재투자 + 시간</em>에서 옵니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>72의 법칙 — 암산용</h2>
            <p className="text-sm leading-relaxed mb-3">
              대략식: <strong style={{ color: "var(--text)" }}>72 ÷ 연 수익률(%) ≈ 원금이 2배가 되는 데 걸리는 해</strong>.
              연 7%면 약 10년, 연 6%면 약 12년.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>복리를 깎는 것들</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 mb-3">
              <li><strong style={{ color: "var(--text)" }}>잦은 매매</strong> — 수수료·스프레드·세금·나쁜 타이밍.</li>
              <li><strong style={{ color: "var(--text)" }}>높은 운용보수</strong> — 연 1%와 0.03%는 30년 후 결과가 크게 갈립니다.</li>
              <li><strong style={{ color: "var(--text)" }}>중도 전량 인출</strong> — 하락장 공포 매도는 복리 시계를 리셋합니다.</li>
              <li><strong style={{ color: "var(--text)" }}>레버리지 ETF 장기 보유</strong> — 변동성 감쇠로 지수와 괴리.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>S&amp;P500과 역사 — 복리의 조건</h2>
            <p className="text-sm leading-relaxed mb-3">
              장기 미국 대형주 지수(<Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>)의 과거 장기 평균으로 연 ~10%대(명목·세전)가 자주 인용됩니다.
              그 사이 약 −50% 급락도 있었습니다. 복리는 변동성을 견디고 시간을 줬을 때 의미가 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
              <li>1~2년 성과로 &ldquo;복리 실패&rdquo; 판정</li>
              <li>고수익·레버리지로 복리를 &ldquo;가속&rdquo;하려다 원금 훼손</li>
              <li>배당을 생활비로 쓰면서도 복리 그래프만 기대</li>
              <li>하락장에 적립을 멈추고 현금만 보유 → 반등 구간 이탈</li>
            </ul>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 과거 수익률·복리 예시는 단순화·세전이며 미래 수익을 보장하지 않습니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Simple vs. Compound Interest</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Simple interest</strong> earns returns only on the original principal. <strong style={{ color: "var(--text)" }}>Compound interest</strong> earns returns on both the principal and previously earned returns — so each period&apos;s gains become the base for the next.
            </p>
            <p className="text-sm leading-relaxed">
              In investing, compounding works when you reinvest dividends (DRIP) and avoid selling. Every withdrawal or sale resets the clock on that portion of capital.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>The Numbers That Show Why Time Matters</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>Scenario: $10,000 at 7% annually for 30 years (pre-tax, simplified)</p>
              <p><strong style={{ color: "var(--text)" }}>Simple interest:</strong> $700/year × 30 = $21,000 in interest → ~$31,000 total.</p>
              <p><strong style={{ color: "var(--text)" }}>Compound interest:</strong> ~$76,000 total.</p>
              <p>The $45,000 difference comes purely from <em>reinvestment over time</em> — not skill or luck.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              The last 10 years typically generate more absolute dollars than the first 20 combined. This is why starting early — even with a small amount — matters more than the size of the initial investment.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>The Rule of 72</h2>
            <p className="text-sm leading-relaxed mb-3">
              A quick mental math shortcut: <strong style={{ color: "var(--text)" }}>72 ÷ annual return % ≈ years to double your money</strong>.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <div className="flex flex-col gap-1 text-sm">
                {[["6%", "~12 years"], ["7%", "~10 years"], ["9%", "~8 years"], ["12%", "~6 years"]].map(([r, y]) => (
                  <div key={r} className="flex justify-between">
                    <span style={{ color: "var(--text)" }}>{r} return</span>
                    <span>{y} to double</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              The rule also shows why costs matter: shaving 1% off your annual return adds roughly 1–2 years to your doubling time.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What Kills Compounding</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
              <li><strong style={{ color: "var(--text)" }}>Frequent trading</strong> — commissions, spreads, taxes, and poor timing all reduce net returns.</li>
              <li><strong style={{ color: "var(--text)" }}>High expense ratios</strong> — 1% vs. 0.03% annually looks small; over 30 years it can be tens of thousands of dollars.</li>
              <li><strong style={{ color: "var(--text)" }}>Panic selling in downturns</strong> — locking in losses and missing the recovery resets the compounding clock.</li>
              <li><strong style={{ color: "var(--text)" }}>Leveraged ETF decay</strong> — daily rebalancing erodes value in volatile markets even when the index is flat.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Historical Context: S&P 500</h2>
            <p className="text-sm leading-relaxed mb-3">
              The S&P 500 has compounded at roughly 10% annually (nominal, pre-tax) over the long run — through two world wars, multiple recessions, the dot-com crash, the financial crisis, and COVID. Investors who stayed invested captured those returns; those who sold during panics did not.
            </p>
            <p className="text-sm leading-relaxed">
              Compounding requires two inputs: time in the market, and the psychological discipline to stay invested through 30–50% drawdowns. The math is straightforward; the behavior is the hard part.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Early vs. Middle vs. Late Stages</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Early stage:</strong> Absolute dollar gains feel small. DCA contributions add more value than investment returns at this point. Focus on consistency, not returns.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Middle stage:</strong> Portfolio value grows large enough that annual fluctuations feel painful. Pre-set rules for downturns become essential here.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>Late stage:</strong> Sequence-of-returns risk emerges. Withdrawals, tax efficiency, and asset allocation shifts matter more than maximizing growth.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ Educational content only. Compound interest examples are pre-tax and simplified. Past returns do not guarantee future results.
          </div>
            </>
          )}
        </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
