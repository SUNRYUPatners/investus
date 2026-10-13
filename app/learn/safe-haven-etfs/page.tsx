"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

const ROWS_KO: { sym: string; name: string; what: string; when: string; risk: string }[] = [
  {
    sym: "달러인덱스",
    name: "DX-Y.NYB (DXY)",
    what: "달러가 유로·엔·파운드 등 6개 주요 통화 대비 얼마나 강한지 보여 주는 지수입니다. 직접 사는 상품이 아니라 '달러 체온계'에 가깝습니다.",
    when: "달러가 오르면 원자재·신흥국 자산에 압박이, 내려가면 그 반대가 나오는 날이 많습니다.",
    risk: "지수 자체는 투자 상품이 아님. UUP ETF로 추종 가능.",
  },
  {
    sym: "TLT",
    name: "미국 장기국채 ETF",
    what: "만기 20년 이상 미국 국채 묶음 ETF. 금리가 내리면 가격이 크게 오르고, 금리가 오르면 크게 빠집니다.",
    when: "금리 인하·경기 침체 기대 시 '채권 랠리' 논의에 자주 등장합니다.",
    risk: "금리 민감도(듀레이션)가 매우 큼. '안전=안 떨어짐'이 아님.",
  },
  {
    sym: "IEF",
    name: "미국 중기국채 ETF",
    what: "만기 7~10년 미국 국채 ETF. TLT보다 만기가 짧아 금리 변동에 덜 흔들립니다.",
    when: "장기·단기 사이 '중간 지점' 국채 노출을 원할 때.",
    risk: "TLT보다는 작지만 금리 상승기에는 여전히 하락 가능.",
  },
  {
    sym: "SHY",
    name: "미국 단기국채 ETF",
    what: "만기 1~3년 미국 국채 ETF. 이자 수익은 작지만 가격 변동이 상대적으로 완만합니다.",
    when: "주식 변동성이 클 때 현금 대용·완충재로 쓰는 경우가 많습니다.",
    risk: "수익률이 낮음. 인플레가 높으면 실질 가치는 깎일 수 있음.",
  },
  {
    sym: "TIP",
    name: "물가연동국채 ETF",
    what: "미국 물가연동국채(TIPS) ETF. 물가(CPI)가 오르면 원금·이자가 연동되어 인플레 헤지 성격이 있습니다.",
    when: "'금리는 오르는데 물가도 높다'는 구간에서 일반 국채 대안으로 논의됩니다.",
    risk: "실질금리가 급등하면 TIP도 하락할 수 있음.",
  },
  {
    sym: "UUP",
    name: "달러 ETF",
    what: "달러인덱스(DXY) 움직임을 추종하려는 ETF. 달러 강세 베팅·헤지용.",
    when: "해외 주식·원자재를 보유한 한국 투자자가 달러 리스크를 줄이거나 늘리고 싶을 때 참고.",
    risk: "달러 약세 구간에서는 손실. 환헤지 대체 수단은 아님.",
  },
  {
    sym: "GLD",
    name: "금 ETF",
    what: "실물 금 가격을 추종하는 대표 ETF. 금괴를 담보로 거래됩니다.",
    when: "지정학·금융 불안, 실질금리 하락 기대 시 '전통적 안전자산'으로 수급이 몰리기도 합니다.",
    risk: "금도 하락 구간 있음. 배당 없음.",
  },
  {
    sym: "BND",
    name: "총채권 ETF",
    what: "미국 투자등급 채권 시장 전체(국채+우량 회사채)를 한 번에 담는 ETF. 채권 포트폴리오의 '기본 바구니'.",
    when: "개별 만기를 고르기 어려울 때 코어 채권 비중을 잡을 때.",
    risk: "금리·신용 리스크가 섞여 있음. TLT만큼 극단적이진 않음.",
  },
  {
    sym: "SGOV",
    name: "초단기국채 ETF",
    what: "만기 0~3개월 미국 국채( T빌 ) ETF. 사실상 단기 현금·머니마켓에 가깝습니다.",
    when: "금리가 높을 때 '놀고 있는 현금'에 이자를 붙이고 싶을 때.",
    risk: "수익은 Fed 금리에 연동. 주식 대체 수단은 아님.",
  },
  {
    sym: "LQD",
    name: "투자등급 회사채 ETF",
    what: "애플·마이크로소프트 등 신용등급이 높은 기업이 발행한 회사채 묶음 ETF. 국채보다 이자는 높고, 국채보다 신용 리스크는 있습니다.",
    when: "국채 수익이 낮을 때 '조금 더 이자'를 원할 때. 경기 둔화 시 스프레드 확대 주의.",
    risk: "경기 침체·신용 경색 시 국채보다 더 크게 하락할 수 있음.",
  },
];

const ROWS_EN: { sym: string; name: string; what: string; when: string; risk: string }[] = [
  {
    sym: "Dollar Index",
    name: "DX-Y.NYB (DXY)",
    what: "Measures the US dollar against a basket of 6 major currencies (euro, yen, pound, etc.). It is a thermometer for dollar strength — not a tradeable product itself.",
    when: "A rising dollar often pressures commodities and emerging-market assets; a falling dollar tends to support them.",
    risk: "The index itself is not an investable product. UUP ETF tracks it.",
  },
  {
    sym: "TLT",
    name: "iShares 20+ Year Treasury ETF",
    what: "Holds US Treasury bonds with maturities of 20 years or more. Highly sensitive to rate changes — rises sharply when rates fall, drops sharply when rates rise.",
    when: "Discussed during rate-cut expectations or recession scenarios when bond rallies are anticipated.",
    risk: "Extremely high duration. 'Safe' does not mean 'won't fall.' TLT fell over 30% in 2022.",
  },
  {
    sym: "IEF",
    name: "iShares 7–10 Year Treasury ETF",
    what: "Holds US Treasuries maturing in 7–10 years. Less rate-sensitive than TLT but still moves meaningfully with interest rate changes.",
    when: "When you want intermediate Treasury exposure between the extremes of SGOV and TLT.",
    risk: "Less volatile than TLT but still falls during rate hike cycles.",
  },
  {
    sym: "SHY",
    name: "iShares 1–3 Year Treasury ETF",
    what: "Holds 1–3 year US Treasuries. Low yield, but relatively stable price. Often used as a near-cash substitute.",
    when: "During high equity volatility as a buffer or parking spot for capital.",
    risk: "Low returns. In high-inflation environments, real purchasing power still erodes.",
  },
  {
    sym: "TIP",
    name: "iShares TIPS Bond ETF",
    what: "Holds US Treasury Inflation-Protected Securities (TIPS). Principal adjusts with CPI, providing inflation hedge characteristics.",
    when: "When rates are rising but inflation is also high — as an alternative to nominal Treasuries that lose real value.",
    risk: "Rising real rates (real = nominal minus inflation) can still cause TIP to fall.",
  },
  {
    sym: "UUP",
    name: "Invesco DB US Dollar Index",
    what: "ETF designed to track the DXY dollar index. Used for dollar-strength bets or hedging against dollar weakness in a foreign-asset portfolio.",
    when: "When an investor wants to increase or reduce dollar exposure relative to foreign stocks or commodities.",
    risk: "Loses value in a dollar-weakness environment. Not a substitute for currency hedging on individual positions.",
  },
  {
    sym: "GLD",
    name: "SPDR Gold Shares ETF",
    what: "Tracks physical gold prices, backed by gold bullion held in vaults. One of the most liquid gold ETFs globally.",
    when: "During geopolitical stress, financial instability, or when real interest rates are falling or expected to fall.",
    risk: "Gold also has drawdown periods. No dividends. Managed expense ratio applies.",
  },
  {
    sym: "BND",
    name: "Vanguard Total Bond Market ETF",
    what: "Holds the broad US investment-grade bond market — Treasuries plus high-quality corporate bonds. A single-fund fixed-income core.",
    when: "When you want broad bond diversification without choosing between maturities or credit types.",
    risk: "Mix of rate and credit risk. Not as extreme as TLT but will still fall in rate hike cycles.",
  },
  {
    sym: "SGOV",
    name: "iShares 0–3 Month Treasury ETF",
    what: "Holds US T-bills maturing in 0–3 months. Essentially a money-market equivalent — near-cash with interest.",
    when: "When rates are elevated and you want idle cash to earn a return without equity risk.",
    risk: "Returns tied directly to the Fed funds rate. Will fall as rates decline. Not an equity substitute.",
  },
  {
    sym: "LQD",
    name: "iShares Investment Grade Corporate Bond ETF",
    what: "Holds investment-grade corporate bonds from Apple, Microsoft, and similar companies. Higher yield than Treasuries, with added credit risk.",
    when: "When Treasury yields are low and you want incrementally more income with manageable credit risk.",
    risk: "In recessions or credit crunches, LQD can fall more than Treasuries as spreads widen.",
  },
];

export default function SafeHavenEtfsPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/safe-haven-etfs")!;
  const ROWS = isKo ? ROWS_KO : ROWS_EN;

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
              ? "Investus 안전자산 탭 히트맵 「안전자산 탑10」에 나오는 지표·ETF가 각각 무엇을 뜻하는지, 만기 길이와 금리 민감도 중심으로 정리했습니다."
              : article.descEn}
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              {isKo ? "왜 이 10개인가?" : "Why These 10?"}
            </h2>
            {isKo ? (
              <>
                <p className="text-sm leading-relaxed mb-3">
                  주식·비트코인과 <strong style={{ color: "var(--text)" }}>다른 이유로 움직이는</strong> 자산을 한눈에 보기 위한 목록입니다.
                  크게 <strong style={{ color: "var(--text)" }}>달러</strong>(환율),
                  <strong style={{ color: "var(--text)" }}> 미국 국채</strong>(만기별),
                  <strong style={{ color: "var(--text)" }}> 금</strong>,
                  <strong style={{ color: "var(--text)" }}> 회사채</strong> 네 그룹으로 나뉩니다.
                </p>
                <div className="rounded-2xl p-4 border text-sm leading-relaxed space-y-2"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p><strong style={{ color: "var(--text)" }}>만기 짧을수록</strong> → SHY, SGOV (가격 안정, 이자 낮음)</p>
                  <p><strong style={{ color: "var(--text)" }}>만기 길수록</strong> → TLT (금리에 민감, 변동 큼)</p>
                  <p><strong style={{ color: "var(--text)" }}>물가 헤지</strong> → TIP · <strong style={{ color: "var(--text)" }}>귀금속</strong> → GLD</p>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm leading-relaxed mb-3">
                  This list covers assets that move for <strong style={{ color: "var(--text)" }}>different reasons than stocks and crypto</strong> — useful for understanding what is happening in macro markets. They fall into four groups: <strong style={{ color: "var(--text)" }}>Dollar</strong>, <strong style={{ color: "var(--text)" }}>US Treasuries</strong> (by maturity), <strong style={{ color: "var(--text)" }}>Gold</strong>, and <strong style={{ color: "var(--text)" }}>Corporate Bonds</strong>.
                </p>
                <div className="rounded-2xl p-4 border text-sm leading-relaxed space-y-2"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p><strong style={{ color: "var(--text)" }}>Shorter maturity</strong> → SHY, SGOV (stable price, low yield)</p>
                  <p><strong style={{ color: "var(--text)" }}>Longer maturity</strong> → TLT (rate-sensitive, high price swings)</p>
                  <p><strong style={{ color: "var(--text)" }}>Inflation hedge</strong> → TIP · <strong style={{ color: "var(--text)" }}>Precious metals</strong> → GLD</p>
                </div>
              </>
            )}
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              {isKo ? "티커별 해설" : "Ticker-by-Ticker Breakdown"}
            </h2>
            <div className="flex flex-col gap-4">
              {ROWS.map((r) => (
                <div key={r.sym} className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-sm font-bold font-syne" style={{ color: "var(--mint)" }}>{r.sym}</span>
                    <span className="text-xs" style={{ color: "var(--muted)" }}>{r.name}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-2">{r.what}</p>
                  <p className="text-[12px] leading-relaxed mb-1">
                    <strong style={{ color: "var(--text)" }}>{isKo ? "언제 주목?" : "When to watch:"}</strong> {r.when}
                  </p>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(239,68,68,0.85)" }}>
                    <strong>{isKo ? "주의:" : "Risk:"}</strong> {r.risk}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              {isKo ? "초보자가 헷갈리는 포인트" : "Common Points of Confusion"}
            </h2>
            {isKo ? (
              <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
                <li><strong style={{ color: "var(--text)" }}>달러인덱스 ≠ UUP</strong> — 하나는 지수(체온계), 하나는 그걸 추종하는 ETF입니다.</li>
                <li><strong style={{ color: "var(--text)" }}>TLT ≠ 안전 현금</strong> — 2022~2023처럼 금리 급등기에는 장기채 ETF가 크게 하락했습니다. (<Link href="/learn/bonds" style={{ color: "var(--mint)" }}>채권 가이드</Link>)</li>
                <li><strong style={{ color: "var(--text)" }}>LQD는 국채가 아님</strong> — 기업이 빌린 돈입니다. 경기가 나빠지면 국채보다 먼저 흔들릴 수 있습니다.</li>
                <li><strong style={{ color: "var(--text)" }}>SGOV·SHY</strong> — 수익은 작지만 '잠자는 돈'에 가깝습니다. 주식 대신 넣는 게 아니라 현금 일부를 굴리는 용도에 가깝습니다.</li>
              </ul>
            ) : (
              <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
                <li><strong style={{ color: "var(--text)" }}>Dollar Index ≠ UUP</strong> — The index is a benchmark (thermometer); UUP is an ETF designed to track it.</li>
                <li><strong style={{ color: "var(--text)" }}>TLT ≠ safe cash</strong> — During 2022–2023 rate hikes, TLT fell over 30%. Long-duration bonds are volatile. (<Link href="/learn/bonds" style={{ color: "var(--mint)" }}>Bonds Guide</Link>)</li>
                <li><strong style={{ color: "var(--text)" }}>LQD is not Treasuries</strong> — It holds corporate debt, which is riskier. Credit spreads can widen sharply in recessions.</li>
                <li><strong style={{ color: "var(--text)" }}>SGOV / SHY</strong> — Low returns, but these act like high-yield savings. Use for idle cash management, not as a stock replacement.</li>
              </ul>
            )}
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>{isKo ? "관련 글" : "Related Articles"}</h2>
            <p className="text-sm leading-relaxed">
              {isKo ? (
                <>
                  <Link href="/learn/safe-assets" style={{ color: "var(--mint)" }}>안전자산 가이드</Link>,
                  <Link href="/learn/bonds" style={{ color: "var(--mint)" }}> 채권과 금리</Link>,
                  <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}> 매크로·금리</Link>,
                  <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}> 원·달러</Link>,
                  <Link href="/learn/commodities" style={{ color: "var(--mint)" }}> 원자재·금</Link>.
                </>
              ) : (
                <>
                  <Link href="/learn/safe-assets" style={{ color: "var(--mint)" }}>Safe Assets Guide</Link>,{" "}
                  <Link href="/learn/bonds" style={{ color: "var(--mint)" }}>Bonds & Rates</Link>,{" "}
                  <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>CPI & Fed</Link>,{" "}
                  <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>USD/KRW</Link>,{" "}
                  <Link href="/learn/commodities" style={{ color: "var(--mint)" }}>Commodities & Gold</Link>.
                </>
              )}
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            {isKo
              ? "⚠️ 교육 목적입니다. ETF는 원금 손실이 있을 수 있으며 투자·세무 자문이 아닙니다."
              : "⚠️ Educational content only. ETF prices fluctuate and principal loss is possible. Not investment or tax advice."}
          </div>
          </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            {isKo ? "다음으로 읽을 글" : "Read Next"}
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/safe-assets" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🛡️</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "안전자산 가이드" : "Safe Assets Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "BTC·ETH·금·은 한 장 정리" : "BTC, ETH, gold & silver at a glance"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/bonds" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📜</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "채권과 금리 가이드" : "Bonds & Interest Rates Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "TLT·SHY·BND 심층 분석" : "Deep dive on TLT, SHY, BND and duration"}</p>
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
