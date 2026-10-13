"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function BuyChecklistPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/buy-checklist")!;

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
              ? "단톡·유튜브·급등 차트에 손이 먼저 갈 때, 이 목록이 브레이크입니다. 규칙은 심리를 이기는 도구이지, 완벽한 종목을 찾는 시험이 아닙니다."
              : article.descEn}
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          {isKo ? (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>체크리스트를 쓰는 이유</h2>
            <p className="text-sm leading-relaxed mb-3">
              초보가 돈을 잃는 흔한 패턴은 &ldquo;공부를 안 해서&rdquo;가 아니라
              <strong style={{ color: "var(--text)" }}> 감정이 뜨거울 때 규칙을 건너뛰어서</strong>입니다.
              비행기 조종사가 이륙 전 목록을 읽듯, 매수 전에도 같은 질문을 반복하면 실수가 줄어듭니다.
            </p>
            <p className="text-sm leading-relaxed">
              사용법: 휴대폰 메모에 10문항을 복사해 두고, 매수 버튼 전에 &ldquo;예/아니오&rdquo;만 표시하세요.
              <strong style={{ color: "var(--text)" }}>7개 미만이 &ldquo;예&rdquo;</strong>이면 오늘은 사지 않고,
              코어 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립</Link>만 유지하는 것을 권장 규칙으로 둡니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>1~3. 포지션 — 비중과 돈의 출처</h2>
            <div className="rounded-2xl p-4 border space-y-3 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>1. 코어인가, 위성인가?</strong><br />
                코어 = 오래 들고 갈 중심(예: S&amp;P500 ETF). 위성 = 테마·개별주·소비중 실험.
                구분이 안 되면 사지 마세요. 설명은 <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오 전략</Link>.</p>
              <p><strong style={{ color: "var(--text)" }}>2. 비중 상한은?</strong><br />
                예: 전체 투자금 1,000만 원일 때 개별주 하나 100만 원(10%) 초과 금지.
                &ldquo;이번에만 20%&rdquo;가 쌓이면 한 종목 리스크가 계좌를 지배합니다.</p>
              <p><strong style={{ color: "var(--text)" }}>3. 살 돈은 비상금·생활비와 분리됐나?</strong><br />
                3~6개월 생활비는 투자하지 않습니다. 카드값·월세를 미루며 사는 매수는 지속 불가능합니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>4~6. 숫자 — 이유와 반대 시나리오</h2>
            <div className="rounded-2xl p-4 border space-y-3 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>4. 한 문장으로 사는 이유?</strong><br />
                &ldquo;친구가 올랐대&rdquo;는 이유가 아닙니다. 예: &ldquo;저비용 S&amp;P500 ETF를 10년 적립한다&rdquo;,
                &ldquo;매출이 3년 연속 늘고 FCF가 양수인 회사를 위성 5%로 산다&rdquo;.</p>
              <p><strong style={{ color: "var(--text)" }}>5. 밸류·상품 구조를 봤나?</strong><br />
                개별주: <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER 등</Link>과 업종 비교.
                ETF: 추적 지수·운용보수·레버리지 여부 (<Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>).
                레버리지·인버스는 &ldquo;장기 적립용&rdquo;이 아닌 경우가 많습니다.</p>
              <p><strong style={{ color: "var(--text)" }}>6. 반대 시나리오 3가지를 적었나?</strong><br />
                예: 금리 급등, 실적 미스, 규제·환율 악화.
                적을 수 없으면 확증 편향일 수 있습니다 — <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>투자 심리</Link>.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              실적 발표 직전이라면 <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>실적 시즌</Link> 체크도 함께.
              재무 숫자 위치는 <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>7~8. 비용·세금·계좌</h2>
            <div className="rounded-2xl p-4 border space-y-3 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>7. 환율·수수료를 감안했나?</strong><br />
                같은 미국 주식도 원/달러에 따라 원화 손익이 달라집니다.
                <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율 가이드</Link>.
                환전·거래 수수료가 크면 &ldquo;하루에 여러 번 쪼개 사기&rdquo;가 독이 될 수 있습니다.</p>
              <p><strong style={{ color: "var(--text)" }}>8. 계좌는 어디가 맞나?</strong><br />
                일반 계좌 vs ISA·연금저축·IRP — 세금·한도가 다릅니다.
                <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA·연금</Link>,
                <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>미국주식 세금</Link>,
                국내 상장 해외 ETF는 <Link href="/learn/kr-us-etf" style={{ color: "var(--mint)" }}>한국 vs 미국 ETF</Link>.</p>
            </div>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed mt-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>숫자 감각 (개념용)</p>
              <p>100만 원을 사고, 왕복 수수료·환전 스프레드가 합쳐 1%면 시작부터 약 1만 원이 비용입니다.
                자주 사고팔수록 <Link href="/learn/compound" style={{ color: "var(--mint)" }}>복리</Link>를 깎습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>9~10. 심리와 출구</h2>
            <div className="rounded-2xl p-4 border space-y-3 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>9. 자극으로 산 건 아닌가?</strong><br />
                뉴스 속보, 단톡 인증, &ldquo;오늘만&rdquo; 카피.
                <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕</Link>이 극단 탐욕일수록 신규 베팅을 의하세요.</p>
              <p><strong style={{ color: "var(--text)" }}>10. -20% / +30% 때 할 행동을 적었나?</strong><br />
                예: 코어 ETF는 적립 유지·리밸런싱만.
                위성은 -25%면 재평가 회의, +30%면 비중 상한까지 일부 익절 등.
                &ldquo;그때 가서 생각&rdquo;은 계획이 아닙니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>한 장으로 보는 10문항</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>코어 / 위성 구분이 명확한가?</li>
              <li>비중 상한 안인가?</li>
              <li>비상금·생활비와 분리됐나?</li>
              <li>사는 이유를 한 문장으로 쓸 수 있나?</li>
              <li>밸류 또는 ETF 구조(보수·레버리지)를 봤나?</li>
              <li>반대 시나리오 3가지를 적었나?</li>
              <li>환율·수수료를 감안했나?</li>
              <li>계좌(일반·ISA·연금)가 맞나?</li>
              <li>자극(단톡·급등)으로 산 게 아닌가?</li>
              <li>-20%·+30% 행동을 미리 적었나?</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>상황별 빠른 가이드</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>지수 ETF 적립일</strong> — 1~3, 7~8만 빠르게 확인해도 되는 경우가 많습니다. 매달 테마를 바꾸지 마세요.</li>
              <li><strong style={{ color: "var(--text)" }}>개별주 첫 매수</strong> — 10문항 전부. 실적 시즌이면 가이던스까지.</li>
              <li><strong style={{ color: "var(--text)" }}>암호화폐·레버리지</strong> — 위성 + 더 낮은 비중. <Link href="/learn/crypto" style={{ color: "var(--mint)" }}>크립토 가이드</Link>·옵션은 별도 고위험.</li>
              <li><strong style={{ color: "var(--text)" }}>배당 목적</strong> — 수익률만 보지 말고 지속성·세금 (<Link href="/learn/dividend" style={{ color: "var(--mint)" }}>배당 가이드</Link>).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["체크리스트를 '나중에'로 미룸", "미루는 순간이 바로 FOMO 구간입니다. 북마크해 두세요."],
                ["'예'를 억지로 맞춤", "스스로 속이면 의미가 없습니다. 애매하면 '아니오'."],
                ["코어와 위성을 섞어 생각", "적립용 ETF에 단타 규칙을 적용하거나, 테마주에 10년 존버만 외치면 어긋납니다."],
                ["세금·계좌를 나중에", "세후 수익률이 달라집니다. 사기 전에 한 번만 확인하세요."],
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
            ⚠️ 교육 목적입니다. 매수·매도 권유가 아니며 원금 손실이 가능합니다. 세금은 세무 자문이 아닙니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Why Use a Checklist?</h2>
            <p className="text-sm leading-relaxed mb-3">
              Most beginner investing losses don&apos;t happen because of a lack of research — they happen because <strong style={{ color: "var(--text)" }}>rules get skipped when emotions are running hot</strong>. FOMO, a viral stock tip, or a headline-induced panic are the real culprits. A pre-flight checklist — like pilots use before takeoff — forces the same deliberate questions every time, before the impulse fires.
            </p>
            <p className="text-sm leading-relaxed">
              How to use it: save these 10 questions to your phone. Before pressing buy, mark each yes or no. If <strong style={{ color: "var(--text)" }}>fewer than 7 are &ldquo;yes,&rdquo;</strong> skip the trade today and stick to your core <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA contributions</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>1–3. Position — Size and Source of Funds</h2>
            <div className="rounded-2xl p-4 border space-y-3 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>1. Is this core or satellite?</strong><br />
                Core = long-term anchor holdings (e.g., S&amp;P 500 ETF). Satellite = thematic bets, individual stocks, small experiments. If you cannot categorize it, do not buy. See <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>portfolio strategy</Link>.</p>
              <p><strong style={{ color: "var(--text)" }}>2. What is my position size limit?</strong><br />
                Example: with $100,000 invested, no single stock exceeds $10,000 (10%). &ldquo;Just this once, 20%&rdquo; stacks up and lets one stock dominate your outcome.</p>
              <p><strong style={{ color: "var(--text)" }}>3. Is this money separate from emergency funds and living expenses?</strong><br />
                Keep 3–6 months of living expenses in cash, uninvested. Buying with money you may need next month makes panic-selling almost inevitable.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>4–6. Numbers — Reason and Counter-Scenarios</h2>
            <div className="rounded-2xl p-4 border space-y-3 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>4. Can I write the reason in one sentence?</strong><br />
                &ldquo;My friend made money&rdquo; is not a reason. Valid examples: &ldquo;I am dollar-cost averaging into a low-cost S&amp;P 500 ETF for 10 years&rdquo; or &ldquo;This company has grown revenue 3 consecutive years and generates positive FCF; I am adding 5% as satellite.&rdquo;</p>
              <p><strong style={{ color: "var(--text)" }}>5. Have I checked valuation or product structure?</strong><br />
                For stocks: compare <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>P/E and sector peers</Link>. For ETFs: check the tracked index, expense ratio, and whether it uses leverage — see the <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF guide</Link>. Leveraged and inverse ETFs are generally not suitable for long-term DCA.</p>
              <p><strong style={{ color: "var(--text)" }}>6. Have I written down 3 bearish scenarios?</strong><br />
                Example: rates spike, earnings miss, regulatory change, or currency move. If you cannot articulate the risks, you are likely in confirmation bias mode — see <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>investor psychology</Link>.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              If an earnings report is imminent, also run through the <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>earnings season checklist</Link>. For finding the financial numbers, see the <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>financial statements guide</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>7–8. Costs, Tax, and Account Type</h2>
            <div className="rounded-2xl p-4 border space-y-3 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>7. Have I accounted for currency and fees?</strong><br />
                For US stocks bought in Korean won, the USD/KRW rate affects your returns in won — see the <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>currency guide</Link>. Trading frequently to average in on small price moves can erode more than you gain once fees are included.</p>
              <p><strong style={{ color: "var(--text)" }}>8. Am I using the right account type?</strong><br />
                Tax-advantaged accounts (ISA, pension savings, IRP) have different caps, tax treatments, and eligible instruments. See <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA &amp; pension accounts</Link>, <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>US stock tax for Korean residents</Link>, and <Link href="/learn/kr-us-etf" style={{ color: "var(--mint)" }}>Korea-listed vs US-listed ETFs</Link>.</p>
            </div>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed mt-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>Cost intuition</p>
              <p>On a $10,000 purchase, a combined round-trip cost (FX spread + broker commission) of 1% means you start $100 in the hole. Every unnecessary trade chips away at compounding — see <Link href="/learn/compound" style={{ color: "var(--mint)" }}>compound interest</Link>.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>9–10. Psychology and Exit Plan</h2>
            <div className="rounded-2xl p-4 border space-y-3 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>9. Am I buying because of a stimulus?</strong><br />
                Breaking news, a group chat pump, &ldquo;limited time&rdquo; framing. The more the <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>Fear &amp; Greed Index</Link> reads &ldquo;extreme greed,&rdquo; the more cautious new bets deserve to be.</p>
              <p><strong style={{ color: "var(--text)" }}>10. Have I pre-written what I will do at -20% and +30%?</strong><br />
                Examples: for core ETFs — maintain contributions and rebalance only. For satellite stocks — -25% triggers a thesis re-evaluation meeting; +30% means trimming back to the size limit. &ldquo;I&apos;ll figure it out then&rdquo; is not a plan.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Quick Reference: All 10 Questions</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Is core vs. satellite clearly defined?</li>
              <li>Am I within my position size limit?</li>
              <li>Is this money separate from emergency savings and living expenses?</li>
              <li>Can I write the reason in one sentence?</li>
              <li>Have I checked valuation or ETF structure (expense ratio, leverage)?</li>
              <li>Have I listed 3 bearish counter-scenarios?</li>
              <li>Have I factored in currency and transaction costs?</li>
              <li>Is this the right account type (taxable, tax-advantaged)?</li>
              <li>Am I acting on a trigger (hype, tip, sudden spike)?</li>
              <li>Have I pre-written my -20% and +30% response rules?</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Situation-Based Quick Guide</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>Scheduled index ETF contribution:</strong> Run through items 1–3 and 7–8 quickly. Do not change the strategy every month based on market mood.</li>
              <li><strong style={{ color: "var(--text)" }}>First purchase of an individual stock:</strong> All 10 items. Add earnings guidance check if a report is due soon.</li>
              <li><strong style={{ color: "var(--text)" }}>Crypto or leveraged ETF:</strong> Satellite with a lower size limit than normal. See the <Link href="/learn/crypto" style={{ color: "var(--mint)" }}>crypto guide</Link>. Options are a separate high-risk category.</li>
              <li><strong style={{ color: "var(--text)" }}>Dividend-focused buy:</strong> Do not fixate on yield alone — check sustainability and tax treatment. See the <Link href="/learn/dividend" style={{ color: "var(--mint)" }}>dividend guide</Link>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Common Mistakes</h2>
            <div className="flex flex-col gap-3">
              {[
                ["Postponing the checklist to \"later\"", "The moment you feel the urge to skip it is exactly the FOMO moment the checklist is designed to catch. Bookmark it now."],
                ["Forcing \"yes\" answers", "If you are rationalizing a questionable answer to clear the threshold, the checklist has failed. Uncertain = no."],
                ["Mixing core and satellite logic", "Applying short-term trading rules to your index ETF, or vowing to hold a meme stock for 10 years, are both category errors."],
                ["Deferring tax and account questions", "After-tax returns are what compound over time. Check once before buying — not years later when it is too late to optimize."],
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
            ⚠️ Educational content only. This is not a buy or sell recommendation. Principal loss is possible. Tax information is not tax advice — consult a qualified tax professional for your specific situation.
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
            <Link href="/learn/investing-psychology" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🧠</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "투자 심리·행동재무" : "Investor Psychology & Behavioral Finance"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "FOMO·손실 회피" : "FOMO, loss aversion & emotional mistakes"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/portfolio-strategy" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">💼</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "포트폴리오 분산·리밸런싱" : "Portfolio Diversification & Rebalancing"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "코어·위성 비중" : "Core/satellite sizing and rebalancing"}</p>
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
