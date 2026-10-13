"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function FuturesPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/futures")!;

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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>선물(Futures)이란? (초보 정의)</h2>
            <p className="text-sm leading-relaxed mb-3">
              선물은 &ldquo;미래에 정해진 날·가격으로 어떤 자산을 사고팔겠다&rdquo;는 <em>계약</em>입니다.
              주식 자체를 지금 소유하는 것과 다릅니다. 지수·원유·금·금리 등 다양한 자산에 선물이 있습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              미국 주식 정규장이 닫혀 있어도 지수 선물은 거의 하루 종일 거래됩니다.
              그래서 밤사이 뉴스·해외 시장 충격이 먼저 <strong style={{ color: "var(--text)" }}>선물 가격</strong>에 반영되고,
              아침 뉴스에 &ldquo;선물 상승/하락&rdquo;으로 나옵니다.
            </p>
            <p className="text-sm leading-relaxed">
              입문자가 당장 선물 계좌를 개설할 필요는 없습니다.
              이 글의 목표는 <em>뉴스를 오해하지 않는 것</em>입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>ES·NQ — 뉴스에 자주 나오는 이름</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>ES</strong> — S&amp;P500 지수와 연결된 선물.
              <strong style={{ color: "var(--text)" }}> NQ</strong> — 나스닥100과 연결된 선물.
              미디어는 그냥 &ldquo;S&amp;P 선물&rdquo; &ldquo;나스닥 선물&rdquo;이라고 부릅니다.
            </p>
            <p className="text-sm leading-relaxed">
              지수 자체(
              <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>·{" "}
              <Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>나스닥</Link>
              )와 선물은 형제처럼 움직이지만, 계약·만기·거래 시간이 다릅니다.
              &ldquo;선물이 올랐다 = 내가 산 ETF가 이미 올랐다&rdquo;가 아닙니다. 정규장이 열리면 현물 지수·ETF가 따라가거나 어긋날 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>왜 초보에게 중요한가</h2>
            <p className="text-sm leading-relaxed mb-3">
              한국에 살면 미국 정규장(보통 밤 10시 30분~새벽, 서머타임에 따라 변동)을 못 보는 날이 많습니다.
              아침에 선물만 보고 &ldquo;오늘 사야지/팔아야지&rdquo;를 결정하기 쉬운데, 그게{" "}
              <Link href="/learn/myths" style={{ color: "var(--mint)" }}>타이밍 착각</Link>으로 이어집니다.
            </p>
            <p className="text-sm leading-relaxed">
              올바른 사용: <em>오늘 변동성이 클지 감을 잡기</em>,{" "}
              <Link href="/learn/economic-calendar" style={{ color: "var(--mint)" }}>경제지표</Link> 날인지와 겹치는지 확인,
              장기 적립 일정은 그대로 두기.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>숫자 예시: +1%의 의미</h2>
            <p className="text-sm leading-relaxed mb-3">
              가정: 전일 S&amp;P500 종가 5,000. 한국 아침 ES 선물이 약 +1%면 &ldquo;대략 5,050 부근 기대&rdquo;로 읽습니다.
              그런데 장중 실적·발언·지표가 나오면 종가는 +0.2%일 수도, −0.5%일 수도 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              선물 +1%를 보고 레버리지로 추격했다가, 장 시작 후 되돌림에 물리는 패턴이 흔합니다.
              <strong style={{ color: "var(--text)" }}>+1%는 &ldquo;확정 수익&rdquo;이 아니라 &ldquo;현재 기대&rdquo;</strong>입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>프리마켓·애프터마켓</h2>
            <p className="text-sm leading-relaxed mb-3">
              미국 정규장 전후에도 일부 주식·ETF가 거래됩니다(프리·애프터).
              거래량이 적어 <em>호가 스프레드</em>(사는 가격과 파는 가격 차이)가 넓습니다.
              같은 &ldquo;+5%&rdquo;라도 체결이 어렵거나, 정규장에서 바로 반납될 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              기업{" "}
              <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>실적 발표</Link>가
              장후에 나오면, 프리마켓에서 급등락이 먼저 보이기도 합니다.
              초보는 &ldquo;이미 올랐으니 놓친다&rdquo;는 느낌에 시장가로 뛰어들기보다, 정규장·지정가를 쓰는 편이 안전합니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>입문 규칙:</strong> 잘 모르는 장외 시간대 매매는 기본 끄기.
              유동성 있는 정규장 중심.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>선물 해석에서 흔한 실수</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 mb-3">
              <li>선물 +1% → 당일 종가도 +1% (X)</li>
              <li>선물만 보고 급매수·급매도 (X)</li>
              <li>
                <Link href="/learn/economic-calendar" style={{ color: "var(--mint)" }}>CPI·FOMC</Link> 직전·직후
                변동성을 무시 (X)
              </li>
              <li>개별 종목 프리마켓 급등을 지수 선물과 동일시 (X)</li>
              <li>선물 거래를 &ldquo;필수 스킬&rdquo;로 착각 — 장기 투자 코어와 무관</li>
            </ul>
            <p className="text-sm leading-relaxed">
              Investus 홈의 선물·지수는 &ldquo;오늘 온도&rdquo; 체크용입니다.
              매수 버튼의 대체물이 아닙니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>레버리지 선물 ETF와 혼동 금지</h2>
            <p className="text-sm leading-relaxed mb-3">
              개인이 지수 선물을 직접 증거금으로 거래하는 것과,
              TQQQ처럼 &ldquo;일일 배수&rdquo;를 추종하는 레버리지 ETF는 다릅니다.
              후자는{" "}
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>변동성 감쇠</Link> 때문에
              장기 코어로 부적합합니다.
            </p>
            <p className="text-sm leading-relaxed">
              &ldquo;선물로 3배&rdquo;라는 마케팅 문구에 속아 장기 적립에 레버리지를 넣지 마세요.
              코어는{" "}
              <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>·{" "}
              <Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>나스닥100</Link> ETF로 충분합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>선물 vs 내가 산 ETF — 한 장 정리</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed mb-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>지수 선물:</strong> 계약, 거의 24시간, 뉴스의 &ldquo;온도&rdquo;.</p>
              <p><strong style={{ color: "var(--text)" }}>현물 지수:</strong> S&amp;P500·나스닥100 숫자 자체 (정규장 중심).</p>
              <p><strong style={{ color: "var(--text)" }}>ETF (VOO·QQQ 등):</strong> 그 지수를 따라가는 상품 — 초보 코어.</p>
              <p><strong style={{ color: "var(--text)" }}>레버리지 ETF:</strong> 일일 배수 추종 — 장기 복리와 별개 ({" "}
                <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>).</p>
            </div>
            <p className="text-sm leading-relaxed">
              관련 글:{" "}
              <Link href="/learn/economic-calendar" style={{ color: "var(--mint)" }}>경제 캘린더</Link>·{" "}
              <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕</Link>·{" "}
              <Link href="/learn/myths" style={{ color: "var(--mint)" }}>초보 오해</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 선물·프리마켓 타이밍 매매를 권유하지 않습니다. 파생상품은 원금 초과 손실 위험이 있을 수 있습니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What Are Futures? (Beginner Definition)</h2>
            <p className="text-sm leading-relaxed mb-3">
              A futures contract is an agreement to buy or sell an asset at a predetermined price on a future date. You are not owning the underlying asset today — you are agreeing to a transaction that settles later. Futures exist for equity indices, commodities, currencies, and interest rates.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              Because US equity index futures trade nearly 24 hours a day (including when the US stock market is closed), overnight news and global market shocks are reflected in <strong style={{ color: "var(--text)" }}>futures prices first</strong>. That is why Korean morning news says &ldquo;Nasdaq futures up 1%&rdquo; before the US market opens.
            </p>
            <p className="text-sm leading-relaxed">
              Beginners do not need a futures account. The goal of this article is to read the news correctly — not to trade futures.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>ES &amp; NQ — The Names You&apos;ll See in Headlines</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>ES</strong> is the S&amp;P 500 E-mini futures contract. <strong style={{ color: "var(--text)" }}>NQ</strong> is the Nasdaq 100 E-mini futures contract. Financial media simply calls them &ldquo;S&amp;P futures&rdquo; and &ldquo;Nasdaq futures.&rdquo;
            </p>
            <p className="text-sm leading-relaxed">
              Futures and the underlying index (<Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P 500</Link>, <Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>Nasdaq</Link>) track each other closely but are not identical — they differ in contract structure, expiry dates, and trading hours. &ldquo;Futures up&rdquo; does not mean your ETF is already up; the cash index and ETF will converge at open, but the gap can reverse intraday.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Why This Matters for Korean Investors</h2>
            <p className="text-sm leading-relaxed mb-3">
              The US regular session typically runs from 10:30 PM to 5:00 AM KST (shifting by one hour during daylight saving changes). Most Korean investors cannot watch the full session. Checking futures in the morning before the next session is a natural instinct — but acting on a single +1% futures reading often leads to the <Link href="/learn/myths" style={{ color: "var(--mint)" }}>market timing mistake</Link>.
            </p>
            <p className="text-sm leading-relaxed">
              Correct use: gauge whether today is likely to be volatile, check whether a major <Link href="/learn/economic-calendar" style={{ color: "var(--mint)" }}>economic data release</Link> is scheduled, and leave your long-term DCA plan unchanged.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Numeric Example: What Does +1% Mean?</h2>
            <p className="text-sm leading-relaxed mb-3">
              Assume the prior S&amp;P 500 close was 5,000. If ES futures are up about +1% at the Korean morning check, that implies a rough expected open near 5,050. But an earnings release, Fed speaker comment, or economic data during the session could push the final close to +0.2% — or −0.5%.
            </p>
            <p className="text-sm leading-relaxed">
              Chasing futures +1% with leverage at open, only to see a reversal after the first 30 minutes, is one of the most common beginner losses. <strong style={{ color: "var(--text)" }}>+1% in futures is an expectation, not a guaranteed outcome.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Pre-Market &amp; After-Hours Trading</h2>
            <p className="text-sm leading-relaxed mb-3">
              Some US stocks and ETFs also trade in the pre-market (4:00 AM–9:30 AM ET) and after-hours (4:00 PM–8:00 PM ET) sessions. Volume is lower, bid-ask spreads are wider, and the same &ldquo;+5%&rdquo; move seen in pre-market can reverse at the regular open.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              When a company announces <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>earnings</Link> after the close, pre-market can show sharp moves the next morning. Beginners should resist the &ldquo;I&apos;m missing out&rdquo; impulse to market-buy at open — using the regular session with limit orders is safer.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>Beginner rule:</strong> Default to the regular session. Extended-hours trading is a tool for experienced traders, not a beginner necessity.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Common Mistakes Reading Futures</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 mb-3">
              <li>Assuming futures +1% = today&apos;s closing gain of +1%. It does not.</li>
              <li>Rushing to buy or sell based on a single pre-market futures reading.</li>
              <li>Ignoring the volatility amplification that happens on <Link href="/learn/economic-calendar" style={{ color: "var(--mint)" }}>CPI/FOMC days</Link>.</li>
              <li>Equating a single stock&apos;s pre-market surge with the overall index futures.</li>
              <li>Treating futures trading as a required skill for long-term index investing — it is not.</li>
            </ul>
            <p className="text-sm leading-relaxed">
              Futures and index prices on the Investus home screen are a morning temperature check. They are not a trigger for portfolio decisions.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Do Not Confuse Futures with Leveraged ETFs</h2>
            <p className="text-sm leading-relaxed mb-3">
              Trading index futures directly with margin is completely different from holding a leveraged ETF like TQQQ. The latter aims to deliver 3× the <em>daily</em> return of the Nasdaq 100, not a long-term 3× multiple. Due to volatility decay, long-term holding of leveraged ETFs typically underperforms the index multiple significantly. See the <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF Guide</Link>.
            </p>
            <p className="text-sm leading-relaxed">
              Do not let &ldquo;3× futures exposure&rdquo; marketing language convince you to put leveraged products in your long-term core. The core belongs in <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P 500</Link> and <Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>Nasdaq 100</Link> ETFs.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Futures vs Your ETF — Quick Reference</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed mb-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>Index futures (ES/NQ):</strong> Contract, nearly 24h, the &ldquo;temperature gauge&rdquo; in morning news.</p>
              <p><strong style={{ color: "var(--text)" }}>Cash index:</strong> The S&amp;P 500 or Nasdaq 100 number itself — computed during the regular session.</p>
              <p><strong style={{ color: "var(--text)" }}>ETF (VOO/QQQ):</strong> A product tracking the index — the beginner&apos;s core holding.</p>
              <p><strong style={{ color: "var(--text)" }}>Leveraged ETF (TQQQ etc.):</strong> Daily multiple — NOT a long-term compounding vehicle. (<Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF Guide</Link>)</p>
            </div>
            <p className="text-sm leading-relaxed">
              Related:{" "}
              <Link href="/learn/economic-calendar" style={{ color: "var(--mint)" }}>Economic Calendar</Link> ·{" "}
              <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>Fear &amp; Greed</Link> ·{" "}
              <Link href="/learn/myths" style={{ color: "var(--mint)" }}>Investing Myths</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ Educational content only. Not a recommendation to trade futures or pre-market. Derivatives can result in losses exceeding the initial investment.
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
            <Link href="/learn/economic-calendar" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🗓️</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "경제 캘린더 활용법" : "How to Use the Economic Calendar"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "CPI·FOMC·고용 발표 전후" : "CPI, FOMC, and jobs report days"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/myths" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🚫</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "초보 투자 오해 TOP10" : "Top 10 Investing Myths Debunked"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "레버리지·타이밍·대가 복제" : "Leverage, timing, copying gurus"}</p>
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
