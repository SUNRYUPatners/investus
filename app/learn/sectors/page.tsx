"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

const SECTORS_KO = [
  { name: "정보기술 (IT)", when: "금리 하락·성장 기대. AI·클라우드 사이클에 민감.", ex: "NVDA, AAPL, MSFT", note: "나스닥100·QQQ 비중이 여기로 몰립니다." },
  { name: "커뮤니케이션", when: "광고·구독 경기. 빅테크 플랫폼과 겹칩니다.", ex: "GOOGL, META, NFLX", note: "IT와 함께 움직이면 '기술 집중'이 더 커집니다." },
  { name: "임의소비재", when: "고용·소비 심리. 고금리에 부담.", ex: "AMZN, TSLA, NKE", note: "성장주와 소비가 한 포트폴리오에 겹치기 쉽습니다." },
  { name: "필수소비재", when: "불황에도 수요가 상대적으로 안정.", ex: "WMT, COST, PG", note: "배당·방어 성향. 성장 속도는 느린 편." },
  { name: "헬스케어", when: "실적 방어 + 신약·보험 이슈.", ex: "LLY, UNH, JNJ", note: "개별 파이프라인 리스크는 큽니다." },
  { name: "금융", when: "금리·순이자마진·경기 회복.", ex: "JPM, BAC, GS", note: "나스닥100에는 거의 없습니다. S&P500에 더 있습니다." },
  { name: "에너지", when: "유가·지정학. 인플레 헤지 성격.", ex: "XOM, CVX", note: "기술 일변도 포트폴리오의 반대편." },
  { name: "산업재", when: "설비투자·인프라·항공방산.", ex: "CAT, GE, RTX", note: "경기 확장 후반에 주목받는 경우가 많습니다." },
  { name: "소재", when: "원자재·건설 수요.", ex: "LIN, SHW", note: "입문 개별주보다는 ETF 비중이 무난합니다." },
  { name: "유틸리티", when: "방어 + 금리에 민감한 배당주.", ex: "NEE", note: "고금리 구간에서는 부담이 될 수 있습니다." },
  { name: "부동산", when: "금리·공실·리츠 분배.", ex: "AMT, PLD", note: "세금·분배 성격이 일반 배당과 다를 수 있습니다." },
];

const SECTORS_EN = [
  { name: "Information Technology", when: "Rate cuts and high growth expectations. Highly sensitive to AI/cloud cycles.", ex: "NVDA, AAPL, MSFT", note: "Where most of the Nasdaq 100 / QQQ weighting lives." },
  { name: "Communication Services", when: "Ad market and subscription economy. Overlaps with big-tech platforms.", ex: "GOOGL, META, NFLX", note: "Combined with IT, can create heavy 'tech concentration.'" },
  { name: "Consumer Discretionary", when: "Employment and consumer confidence. Pressured by high rates.", ex: "AMZN, TSLA, NKE", note: "Growth stocks and consumer names often land here together." },
  { name: "Consumer Staples", when: "Relatively stable demand even in recessions.", ex: "WMT, COST, PG", note: "Dividend and defensive character. Slower growth." },
  { name: "Health Care", when: "Defensive earnings plus drug-pipeline and insurance catalysts.", ex: "LLY, UNH, JNJ", note: "Individual pipeline risk can be large despite sector stability." },
  { name: "Financials", when: "Interest rates, net interest margins, and economic recovery.", ex: "JPM, BAC, GS", note: "Barely represented in the Nasdaq 100; well-represented in the S&P 500." },
  { name: "Energy", when: "Oil prices and geopolitical risk. Natural inflation hedge.", ex: "XOM, CVX", note: "The opposite end of the risk spectrum from tech." },
  { name: "Industrials", when: "Capital expenditure, infrastructure, aerospace & defense.", ex: "CAT, GE, RTX", note: "Often gains attention in late-cycle expansions." },
  { name: "Materials", when: "Raw materials and construction demand.", ex: "LIN, SHW", note: "ETF exposure is often cleaner for beginners than individual names." },
  { name: "Utilities", when: "Defensive + dividend-focused, but rate-sensitive.", ex: "NEE", note: "High-rate environments create pressure on utility valuations." },
  { name: "Real Estate (REITs)", when: "Rate sensitivity, vacancy, and REIT distributions.", ex: "AMT, PLD", note: "Distribution tax treatment differs from ordinary dividends." },
];

export default function SectorsPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/sectors")!;
  const sectors = isKo ? SECTORS_KO : SECTORS_EN;

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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>섹터·GICS란?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>섹터(sector)</strong>는 &ldquo;비슷한 사업을 하는 회사끼리 묶은 큰 바구니&rdquo;입니다.
              S&amp;P와 MSCI가 쓰는 <strong style={{ color: "var(--text)" }}>GICS</strong>(Global Industry Classification Standard)는
              상장 기업을 11개 섹터로 나눕니다.
            </p>
            <p className="text-sm leading-relaxed">
              왜 배우나요? 지수·ETF·애널리스트 리포트가 같은 언어를 쓰기 때문입니다.
              Investus 홈의 섹터 흐름과 리포트의 &ldquo;업종&rdquo; 문단도 이 틀을 전제로 읽으면 이해가 빠릅니다.
              완벽한 예측 도구가 아니라, <strong style={{ color: "var(--text)" }}>쏠림을 보는 체크리스트</strong>로 쓰세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>11개 섹터 한눈에</h2>
            <div className="flex flex-col gap-2">
              {sectors.map((s) => (
                <div key={s.name} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{s.name}</p>
                  <p className="text-[12px] leading-relaxed mb-1">{s.when}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>예: {s.ex} · {s.note}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] mt-2 leading-relaxed">
              예시 티커는 교육용이며 추천이 아닙니다. 구성은 시간에 따라 바뀝니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>숫자로 보는 쏠림</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>예시 (개념용)</p>
              <p>포트폴리오 1,000만 원 중 AAPL 300 · MSFT 200 · NVDA 200 · QQQ 200 · 현금 100.</p>
              <p>기업 수는 적지만, IT + 커뮤니케이션 + 성장 소비 비중이 쉽게 70~80%를 넘습니다.</p>
              <p>같은 1,000만 원을 VOO(S&amp;P500 ETF) 하나로 두면 11개 섹터가 시총 가중으로 들어갑니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              &ldquo;분산을 직접 설계&rdquo;하기 전에 코어를 지수 ETF로 두는 이유가 여기 있습니다.
              <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>
              ·<Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF</Link>
              ·<Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>나스닥</Link>을 이어서 읽으세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>입문자가 가장 많이 하는 쏠림</h2>
            <p className="text-sm leading-relaxed mb-3">
              한국 개인 해외주식 잔고는 빅테크·반도체에 치우치는 경향이 있습니다.
              여기에 QQQ까지 더하면 IT+커뮤니케이션+임의소비가 80%를 넘기도 합니다.
            </p>
            <p className="text-sm leading-relaxed">
              개별 기술주를 이미 많이 샀다면, 같은 방향의 섹터 ETF를 또 사는 것은 분산이 아닙니다.
              자산 탭에서 종목별 비중을 보고 IT+커뮤니케이션 합이 얼마인지 한 번만 계산해 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>섹터 로테이션을 쫓지 않아도 되는 이유</h2>
            <p className="text-sm leading-relaxed mb-3">
              &ldquo;지금은 금융, 다음에는 에너지&rdquo;처럼 로테이션을 맞추는 전략은 기관 리서치에도 나오지만,
              개인이 매매 비용·세금·타이밍 오차까지 이기기는 어렵습니다.
            </p>
            <p className="text-sm leading-relaxed">
              입문 단계에서는 코어 지수를 유지하고, 위성을 한두 섹터만, 전체의 소수 비중으로 두는 편이 낫습니다.
              리밸런싱 주기는{" "}
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오 전략</Link>을 참고하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>금리 한 줄로 다시 보기</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>금리 ↑ 때 자주 거론</strong> — 금융(순이자), 에너지(인플레·유가), 가치 성향. 성장 IT는 압박 서사.</p>
              <p><strong style={{ color: "var(--text)" }}>금리 ↓ 때 자주 거론</strong> — IT·커뮤니케이션·장기 성장. 다만 경기 침체면 실적이 먼저 무너질 수도 있습니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              배경은 <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>금리·연준 가이드</Link>를 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>코어 ETF vs 섹터 ETF</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>코어</strong>는 S&amp;P500처럼 11개 섹터가 섞인 지수 ETF입니다.
              <strong style={{ color: "var(--text)" }}>섹터 ETF</strong>(예: XLK 기술, XLE 에너지)는 한 방향 베팅에 가깝습니다.
            </p>
            <p className="text-sm leading-relaxed">
              입문자는 코어 80~100%로 시작하고, 확신이 있을 때만 위성 섹터를 소수로 더하는 편이 안전합니다.
              섹터 ETF를 여러 개 사면 &ldquo;분산한 것 같지만&rdquo; 실제로는 같은 매크로에 묶일 수 있습니다.
              상품 구조는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>를 참고하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보가 자주 하는 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["종목 수 = 분산", "같은 섹터 10종목은 분산이 약합니다. 섹터 합계를 보세요."],
                ["QQQ + 빅테크 개별주 중복", "나스닥100 상위와 겹칩니다. 비중을 합산하세요."],
                ["뉴스 테마로 섹터 ETF 순회", "비용·세금이 쌓입니다. 코어는 고정하세요."],
                ["방어 섹터 = 절대 안전", "유틸리티·필수소비도 금리·실적에 흔들립니다."],
                ["히트맵만 보고 당일 매매", "하루 색깔은 소음일 수 있습니다. 규칙 우선."],
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
            ⚠️ 교육 목적입니다. 특정 섹터·종목 투자 권유가 아니며 원금 손실이 가능합니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What Are Sectors and GICS?</h2>
            <p className="text-sm leading-relaxed mb-3">
              A <strong style={{ color: "var(--text)" }}>sector</strong> is a grouping of companies with similar business models. S&P Global and MSCI jointly maintain the <strong style={{ color: "var(--text)" }}>GICS</strong> (Global Industry Classification Standard), which divides all publicly traded companies into 11 sectors and dozens of sub-industries.
            </p>
            <p className="text-sm leading-relaxed">
              Why learn this? Indices, ETFs, analyst reports, and the Investus home screen all use the same GICS language. Understanding sectors turns the sector heatmap from a color display into actionable context. Use sectors as a <strong style={{ color: "var(--text)" }}>concentration checklist</strong> — not as a market-timing tool.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>All 11 Sectors at a Glance</h2>
            <div className="flex flex-col gap-2">
              {sectors.map((s) => (
                <div key={s.name} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{s.name}</p>
                  <p className="text-[12px] leading-relaxed mb-1">{s.when}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>Examples: {s.ex} · {s.note}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] mt-2 leading-relaxed">
              Ticker examples are for education only and are not recommendations. Index compositions change over time.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Concentration by the Numbers</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>Example (conceptual)</p>
              <p>Portfolio of $10,000: AAPL $3,000 · MSFT $2,000 · NVDA $2,000 · QQQ $2,000 · cash $1,000.</p>
              <p>Five &ldquo;different&rdquo; positions, but IT + Communication + Consumer Discretionary easily exceeds 70–80% of total.</p>
              <p>That same $10,000 in VOO (S&P 500 ETF) gives you all 11 sectors weighted by market cap — automatic diversification with one trade.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              This is why the advice &ldquo;start with a broad index core&rdquo; exists before you design your own allocation. See <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&P 500</Link>, <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF Guide</Link>, and <Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>Nasdaq Guide</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>The Most Common Beginner Concentration</h2>
            <p className="text-sm leading-relaxed mb-3">
              Retail investors worldwide tend to overweight mega-cap technology and semiconductors because those are the companies with the most media coverage. Adding QQQ on top of existing Apple, Microsoft, and Nvidia positions pushes IT + Communication + Consumer Discretionary well above 80% of total portfolio value.
            </p>
            <p className="text-sm leading-relaxed">
              If you already own individual tech names, buying another tech-heavy ETF is not diversification — it is amplification. Run the math: add up every position&apos;s sector label and calculate the percentage, not just the count.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Why You Don&apos;t Need to Chase Sector Rotation</h2>
            <p className="text-sm leading-relaxed mb-3">
              Institutional research regularly publishes &ldquo;now is the time for financials&rdquo; or &ldquo;rotate into energy.&rdquo; For individual investors, timing sector rotations correctly while accounting for trading costs, taxes, and execution lag is extremely difficult — most academic evidence suggests it erodes returns rather than adding them.
            </p>
            <p className="text-sm leading-relaxed">
              A better approach for beginners: hold a broad-market core index, then add one or two sectors you have genuine conviction in — capping them at a small percentage of total portfolio. See <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>Portfolio Strategy</Link> for rebalancing schedules.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Interest Rates and Sector Behavior</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>Rates rising — common narratives:</strong> Financials (net interest margin), Energy (inflation/oil), value-oriented sectors. Growth IT faces multiple compression.</p>
              <p><strong style={{ color: "var(--text)" }}>Rates falling — common narratives:</strong> IT, Communication, long-duration growth. But if rates are falling because of recession risk, earnings may deteriorate faster than valuations re-rate.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              For the macro context behind these rate moves, see the <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>CPI, Fed &amp; Interest Rates Guide</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Core Index ETF vs. Sector ETF</h2>
            <p className="text-sm leading-relaxed mb-3">
              A <strong style={{ color: "var(--text)" }}>core index ETF</strong> like VOO (S&P 500) blends all 11 sectors in market-cap proportion. A <strong style={{ color: "var(--text)" }}>sector ETF</strong> (e.g., XLK for tech, XLE for energy, XLF for financials) is a directional bet on one slice of the economy.
            </p>
            <p className="text-sm leading-relaxed">
              Beginners should start 80–100% in the core and add sector ETFs only when there is a specific, well-reasoned conviction. Holding five sector ETFs may feel diversified but can still be tightly correlated to the same macro backdrop. See the <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF Guide</Link> for product structure details.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Common Mistakes</h2>
            <div className="flex flex-col gap-3">
              {[
                ["Number of stocks = diversification", "Ten stocks in the same sector is still concentration. Check sector totals, not position counts."],
                ["QQQ + individual big-tech overlap", "The top holdings of QQQ and your individual tech names are likely the same companies. Calculate combined exposure."],
                ["Cycling through sector ETFs on news themes", "Transaction costs and taxes accumulate. Keep the core stable."],
                ["Defensive sectors = zero risk", "Utilities and Consumer Staples are still affected by rates, earnings, and credit conditions."],
                ["Trading on the heatmap color alone", "A single day's sector movement is mostly noise. Stick to your rules."],
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
            ⚠️ Educational content only. Not a recommendation for any specific sector or stock. Principal loss is possible.
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
            <Link href="/learn/portfolio-strategy" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">💼</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "포트폴리오 분산 전략" : "Portfolio Diversification & Rebalancing"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "비중·리밸런싱" : "Position sizing and rebalancing schedules"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/etf" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📦</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "미국 ETF 가이드" : "Complete US ETF Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "섹터 ETF vs 지수 ETF" : "Sector ETFs vs. broad-market index ETFs"}</p>
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
