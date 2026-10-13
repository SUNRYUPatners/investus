"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function InvestingPsychologyPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/investing-psychology")!;

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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>행동재무가 뭔가요?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>행동재무(behavioral finance)</strong>는
              &ldquo;사람은 항상 이성적으로 투자하지 않는다&rdquo;는 사실을 연구하는 분야입니다.
              두려움을 느낄 때 파는 것, 남이 벌었다는 말에 쫓아가는 것 — 둘 다 정상 뇌의 반응에 가깝습니다.
            </p>
            <p className="text-sm leading-relaxed">
              왜 배우나요? 좋은 ETF를 골라도, 하락장에 팔고 고점에 다시 사면
              <Link href="/learn/compound" style={{ color: "var(--mint)" }}> 복리</Link>가 끊깁니다.
              전략보다 먼저 &ldquo;나를 지키는 규칙&rdquo;이 필요합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>FOMO — 놓칠까 봐 두려운 마음</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>FOMO</strong>는 Fear Of Missing Out의 약자입니다.
              &ldquo;나만 소외되는 것 같다&rdquo;는 느낌으로, 이미 많이 오른 자산에 뒤늦게 올인하게 만듭니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>예시</p>
              <p>단톡방에 &ldquo;○○ +80%&rdquo; 인증이 뜹니다. 생활비까지 끌어와 같은 종목을 삽니다.
                이미 많은 기대가 가격에 들어 있을 수 있고, 이후 -30%만 와도 심리가 무너집니다.</p>
              <p><strong style={{ color: "var(--text)" }}>막는 규칙</strong> — 충동 매수는 24시간 보류. <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>체크리스트</Link> 7개 이상 &ldquo;예&rdquo;가 아니면 사지 않기. 코어는 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립</Link>만.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>손실 회피 — 잃은 게 더 아프게 느껴진다</h2>
            <p className="text-sm leading-relaxed mb-3">
              연구에 자주 나오는 이야기: 같은 금액이라도 <em>잃는 고통</em>이 <em>얻는 기쁨</em>보다 크게 느껴진다는 것입니다.
              그래서 -20% 종목을 &ldquo;본전까지&rdquo; 붙잡고, -50%까지 가는 경우가 생깁니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>숫자로 보는 회복</p>
              <p>100만 원 → 80만 원(-20%)이 되려면, 다시 100만 원이 되기 위해 약 +25%가 필요합니다.</p>
              <p>100만 원 → 50만 원(-50%)이면, 본전 회복에 <strong style={{ color: "var(--text)" }}>+100%</strong>가 필요합니다. 같은 &ldquo;본전&rdquo;이라도 깊을수록 회복이 어렵습니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              코어 지수 ETF는 장기·적립이 기본이고, 위성 개별주는 &ldquo;-25%면 재평가 회의&rdquo;처럼
              <em>미리</em> 규칙을 적어두세요. 감정이 뜨거울 때는 규칙을 새로 만들지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>확증 편향 — 듣고 싶은 말만 듣기</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>확증 편향</strong>은 내가 산 종목에 유리한 뉴스만 찾고, 불리한 정보는 무시하는 경향입니다.
              유튜브·단톡은 이 편향을 키우기 쉽습니다.
            </p>
            <p className="text-sm leading-relaxed">
              실전 팁: 매수 전에 &ldquo;이 투자가 틀릴 수 있는 이유 3가지&rdquo;를 의무적으로 적습니다.
              <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무 숫자</Link>가 스토리와 다르면 스토리를 의심하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>공포와 탐욕의 사이클</h2>
            <p className="text-sm leading-relaxed mb-3">
              시장은 반복해서 &ldquo;다 끝났다&rdquo;와 &ldquo;이번엔 다르다&rdquo; 사이를 오갑니다.
              <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕지수</Link>는 그 온도를 숫자로 보여주는 <em>참고</em> 지표입니다. 매수·매도 버튼이 아닙니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>극단 공포</strong> — 적립을 <em>유지</em>하는 편이 DCA 취지에 맞습니다. 증액은 &ldquo;평소의 1.2배까지&rdquo;처럼 미리 정한 규칙이 있을 때만.</li>
              <li><strong style={{ color: "var(--text)" }}>극단 탐욕</strong> — 신규 테마·레버리지 베팅을 자제. 리밸런싱으로 비중만 맞추기 (<Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오</Link>).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>멘탈 회계·과신·군중</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>멘탈 회계</strong> — &ldquo;보너스니까 날려도 된다&rdquo;고 더 위험한 베팅. 돈은 출처와 무관하게 같은 돈입니다.</li>
              <li><strong style={{ color: "var(--text)" }}>과신</strong> — 두세 번 수익 나면 &ldquo;나는 감을 안다&rdquo;고 레버리지. <Link href="/learn/myths" style={{ color: "var(--mint)" }}>초보 오해</Link>와 겹칩니다.</li>
              <li><strong style={{ color: "var(--text)" }}>군중</strong> — 모두가 같은 이야기를 할 때일수록, 이미 가격에 많이 반영됐을 수 있습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>감정을 이기는 실전 규칙 예시</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>투자 원금·최대 허용 손실을 <em>숫자</em>로 적기 (예: 투자금의 -30%면 전략 재검토).</li>
              <li>코어 / 위성 비중 상한 — 예: 개별주 합 20% 이내.</li>
              <li>포트폴리오 점검은 주 1회 이하. 앱 알림을 끄세요.</li>
              <li>뉴스·단톡 헤드라인으로 당일 매매 금지.</li>
              <li>매수는 <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>체크리스트</Link> 통과 후에만.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["하락장에 적립 중단", "수량이 많아지는 구간에서 멈추면 DCA가 무력화됩니다."],
                ["본전 올 때까지 존버만", "위성 종목의 '본전 집착'은 기회비용과 추가 하락을 키울 수 있습니다. 규칙을 따르세요."],
                ["수익 나면 과신 → 레버리지", "짧은 행운을 실력으로 착각하기 쉽습니다."],
                ["철학을 장이 좋을 때만 읽음", "나쁜 날에 쓸 매뉴얼을 평온할 때 적어 두세요."],
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
            ⚠️ 교육 목적입니다. 심리 상담·치료가 아니며 투자 권유가 아닙니다. 원금 손실이 가능합니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What Is Behavioral Finance?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Behavioral finance</strong> studies why people make systematically irrational financial decisions. Selling during a panic, chasing a stock after a 100% run — these are not character flaws, they are predictable responses from a human brain that evolved to avoid immediate danger, not to hold assets through multi-year drawdowns.
            </p>
            <p className="text-sm leading-relaxed">
              Why does it matter? You can own an excellent ETF and still underperform it by selling at the bottom and buying back at the top. Understanding your own biases is more valuable than memorizing another valuation ratio. Good strategy requires protective rules. See <Link href="/learn/compound" style={{ color: "var(--mint)" }}>Compound Interest</Link> for why continuous holding matters.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>FOMO — Fear of Missing Out</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>FOMO</strong> is the anxiety that others are profiting while you sit out. It drives investors to buy assets that have already risen sharply, often near the peak of a momentum cycle. The mental calculation is distorted: the upside feels vivid because others are talking about it; the downside risk is invisible because no one posts about losses.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>Example</p>
              <p>A group chat shows "+80% in six months." You move living-expense money into the same position. The price already reflects enormous optimism. A 30% pullback alone is enough to break your resolve and cause a panic sale at a loss.</p>
              <p><strong style={{ color: "var(--text)" }}>Rule to prevent it:</strong> Wait 24 hours on every impulse trade. Run through the <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>Buy Checklist</Link> — if fewer than 7 boxes are checked, do not buy. Keep your core in <Link href="/learn/dca" style={{ color: "var(--mint)" }}>scheduled DCA</Link> only.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Loss Aversion — Losses Hurt More Than Gains Feel Good</h2>
            <p className="text-sm leading-relaxed mb-3">
              Behavioral research consistently finds that the pain of a loss is roughly twice as powerful psychologically as the pleasure of an equivalent gain. This leads investors to hold losing positions far too long (&ldquo;I&apos;ll sell when I get back to even&rdquo;) while cutting winners too early.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>Recovery Math</p>
              <p>$1,000 → $800 (−20%): requires +25% to recover.</p>
              <p>$1,000 → $500 (−50%): requires <strong style={{ color: "var(--text)" }}>+100%</strong> to recover. The deeper the hole, the steeper the climb. Waiting for &ldquo;break-even&rdquo; is a psychologically normal but mathematically costly strategy.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              For your core index ETF, stay long-term and use <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link>. For satellite individual stocks, write your exit rule <em>before</em> you buy — e.g., &ldquo;If this drops 25%, I will reassess the thesis.&rdquo; Do not create new rules when emotions are running hot.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Confirmation Bias — Only Hearing What You Want</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Confirmation bias</strong> leads investors to seek out information that supports their existing positions while dismissing contradicting evidence. YouTube rabbit holes and group chats are engineered to feed this bias.
            </p>
            <p className="text-sm leading-relaxed">
              Practical counter: before buying any position, write down three reasons it could be wrong. If the <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>financial statements</Link> tell a different story than the narrative, trust the numbers. See also the <Link href="/learn/13f-guide" style={{ color: "var(--mint)" }}>13F Guide</Link> — institutional ownership alone is not a buy signal.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>The Fear-Greed Cycle</h2>
            <p className="text-sm leading-relaxed mb-3">
              Markets oscillate between &ldquo;everything is over&rdquo; and &ldquo;this time it&apos;s different.&rdquo; The <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>Fear &amp; Greed Index</Link> quantifies market sentiment at a point in time. It is a reference indicator — not a buy or sell trigger.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>Extreme Fear:</strong> Continue DCA. If you have a pre-written rule to buy slightly more at extreme fear (e.g., up to 1.2× normal amount), follow that rule. Do not improvise.</li>
              <li><strong style={{ color: "var(--text)" }}>Extreme Greed:</strong> Resist new theme bets and leveraged positions. Use rebalancing to trim oversized positions back to target (<Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>Portfolio Strategy</Link>).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Mental Accounting, Overconfidence, and Herd Behavior</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>Mental Accounting:</strong> &ldquo;It&apos;s my bonus, so it&apos;s okay to gamble with it.&rdquo; Money is money regardless of source. Apply the same risk rules to all capital.</li>
              <li><strong style={{ color: "var(--text)" }}>Overconfidence:</strong> A few winning trades create the illusion of skill. The instinct to add leverage after a good run is one of the most reliably dangerous patterns in investing. See <Link href="/learn/myths" style={{ color: "var(--mint)" }}>Top 10 Investing Myths</Link>.</li>
              <li><strong style={{ color: "var(--text)" }}>Herding:</strong> When everyone is saying the same thing, the information is likely already priced in. Crowded trades have the most severe crashes when they unwind.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Practical Rules to Protect Yourself</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Write your maximum acceptable loss in dollar terms before investing (e.g., &ldquo;If my portfolio drops 30%, I will review my entire strategy.&rdquo;).</li>
              <li>Set a hard cap on individual stock exposure — e.g., all individual stocks combined under 20% of total portfolio.</li>
              <li>Limit portfolio check-ins to once per week. Turn off real-time price alerts.</li>
              <li>No same-day trades triggered by news headlines or group chat messages.</li>
              <li>All buys require passing the <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>Buy Checklist</Link> first.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Common Mistakes</h2>
            <div className="flex flex-col gap-3">
              {[
                ["Pausing DCA in a downturn", "The dip is exactly when DCA accumulates the most shares. Stopping breaks the entire mechanism."],
                ["Holding only for break-even on satellite positions", "The opportunity cost and further downside risk can exceed the tax saved by not selling."],
                ["Turning early profits into overconfidence", "A short winning streak is not evidence of superior skill. Leveraging up is when the most damage happens."],
                ["Reading investment philosophy only in good markets", "Write your bad-day manual when you are calm. You will not have the capacity to think clearly during a drawdown."],
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
            ⚠️ Educational content only. Not psychological counseling or investment advice. Principal loss is possible.
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
            <Link href="/learn/buy-checklist" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">✅</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "매수 전 체크리스트" : "10-Point Checklist Before You Buy"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "FOMO로 사기 전에" : "Rules to run before pressing buy"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/dca" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📅</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "적립식 투자(DCA)" : "Dollar-Cost Averaging (DCA) Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "감정을 줄이는 실행법" : "The systematic approach that removes emotion"}</p>
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
