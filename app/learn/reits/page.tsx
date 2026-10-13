"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function ReitsPage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/reits")!;

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
              ? "건물을 사지 않고도, 주식처럼 거래하면서 부동산 임대 수익에 간접으로 노출되는 방법이 리츠입니다. \"부동산 = 안전\"만 믿으면 금리 인상기에 크게 놀랄 수 있습니다."
              : article.descEn}
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          {isKo ? (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>REIT란 한 줄로</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>REIT(Real Estate Investment Trust)</strong> —
              오피스·아파트·창고·데이터센터·쇼핑몰 같은 부동(또는 부동산 대출)을 모아 운용하는 회사입니다.
              이익의 대부분을 배당으로 주도록 규정된 경우가 많아, 법인세 혜택을 받는 구조가 일반적입니다.
            </p>
            <p className="text-sm leading-relaxed">
              개인이 수십억짜리 건물을 사지 않아도, 거래소에서 리츠 주식·리츠 ETF를 소액으로 살 수 있습니다.
              가격은 주식처럼 매일 변동합니다. &ldquo;집값처럼 천천히만 움직인다&rdquo;는 착각을 조심하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>직접 부동산 vs 리츠</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>직접 구매</strong> — 대출·관리·공실·세금·환금성(팔기 어려움). 레버리지가 커 수익·손실도 큼.</p>
              <p><strong style={{ color: "var(--text)" }}>리츠</strong> — 소액·분산·유동성(장중 매매). 대신 주가 변동·금리 민감·배당 과세.</p>
              <p><strong style={{ color: "var(--text)" }}>숫자 감각</strong> — 현금 500만 원으로는 서울 아파트를 살 수 없지만, VNQ 같은 ETF는 살 수 있습니다.
                대신 &ldquo;내 명의 건물&rdquo;이 아니라 &ldquo;많은 건물에 쪼개 투자한 증권&rdquo;입니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>돈이 어디서 오나</h2>
            <p className="text-sm leading-relaxed mb-3">
              임차인이 내는 임대료 → 운영비·이자 차감 → 남는 현금의 상당 부분을 배당.
              주가 상승은 자산 가치·금리·성장 기대가 반영될 때 옵니다.
              그래서 리츠는 <Link href="/learn/dividend" style={{ color: "var(--mint)" }}>배당(인컴)</Link>과
              시세 차익을 함께 봅니다. 배당률만 높다고 좋은 것이 아닙니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>금리와 왜 엮이나</h2>
            <p className="text-sm leading-relaxed mb-3">
              리츠 회사는 건물을 사거나 리파이낸싱할 때 대출을 많이 씁니다.
              <strong style={{ color: "var(--text)" }}>금리↑</strong> → 이자 비용↑, 채권 대비 배당 매력↓ →
              밸류에이션 압박이 자주 나타납니다.
              <strong style={{ color: "var(--text)" }}>금리↓</strong>·완만한 성장이면 상대적으로 우호적일 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              2022년처럼 금리가 급등하면 리츠도 크게 빠진 구간이 있었습니다.
              &ldquo;리츠 = 항상 안전&rdquo;은 신화입니다.
              <Link href="/learn/bonds" style={{ color: "var(--mint)" }}>채권·10년물</Link>·
              <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>연준</Link>과 함께 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>섹터별로 성격이 다름</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>산업·물류</strong> — 이커머스·창고 수요</li>
              <li><strong style={{ color: "var(--text)" }}>주거·아파트</strong> — 인구·임대료 인상</li>
              <li><strong style={{ color: "var(--text)" }}>데이터센터</strong> — 클라우드·AI 수요, 전력·냉각 비용 리스크</li>
              <li><strong style={{ color: "var(--text)" }}>오피스</strong> — 재택근무로 구조적 압박이 큰 구간도 있음</li>
              <li><strong style={{ color: "var(--text)" }}>리테일·헬스케어</strong> — 점포·병원 임대 사이클</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              ETF 하나로 여러 섹터를 담으면 분산되지만, &ldquo;오피스만 아픈데 ETF 전체가 같이 출렁&rdquo;일 수도 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>대표 ETF</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>VNQ</strong> — 미국 리츠를 넓게</li>
              <li><strong style={{ color: "var(--text)" }}>IYR</strong> — 미국 부동산</li>
              <li><strong style={{ color: "var(--text)" }}>SCHH</strong> — 상대적으로 저비용 리츠</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              상품 비교 방법은 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>와 같습니다.
              운용보수·배당·추적 지수를 확인하세요.
              한국 거주자는 미국 상장 ETF 배당 원천징수·양도세 개념을
              <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>세금 가이드</Link>에서 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>포트폴리오에서 역할</h2>
            <p className="text-sm leading-relaxed mb-3">
              코어는 보통 <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>·
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>전세계·나스닥 지수 ETF</Link>입니다.
              리츠는 <em>인컴·부동산 노출용 위성</em>으로 소수 비중을 두는 경우가 많습니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>예시 (교육용)</strong> —
                전체의 5~10%만 리츠 ETF, 나머지는 주식·채권·현금.
                비중이 커지면 &ldquo;부동산 베팅&rdquo;이 되고, 금리 한 방에 심리가 무너지기 쉽습니다.
                리밸런싱은 <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오 전략</Link>을 참고.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["배당률만 보고 매수", "원금이 20% 빠지면 높은 배당도 의미가 흐려집니다."],
                ["집값과 리츠 주가를 동일시", "리츠는 매일 거래되는 증권입니다."],
                ["금리 뉴스를 무시", "리츠와 금리는 자주 같이 움직입니다."],
                ["ISA·연금에 넣기 전에 상품 유형 미확인", "국내 편입 가능 여부는 계좌·상품마다 다름 (ISA·연금 가이드)."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-3">
              세제혜택 계좌는 <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA·연금저축·IRP</Link>를 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>배당을 볼 때 추가로 볼 것</h2>
            <p className="text-sm leading-relaxed mb-3">
              리츠 배당수익률이 연 3~5%로 보이면 매력적으로 느껴질 수 있습니다.
              다만 (1) 배당이 삭감될 수 있고, (2) 주가가 빠지면 총수익이 마이너스일 수 있으며,
              (3) 한국 거주자는 미국 상장 ETF 배당에 원천징수 등이 붙을 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>숫자 예시</strong> —
              1,000만 원어치 리츠 ETF, 연 배당 4%(세전)면 Roughly 연 40만 원.
              같은 해 주가가 15% 빠지면 평가손실 약 150만 원 → 배당으로 메우기 어렵습니다.
              &ldquo;배당만 보고 올인&rdquo;이 위험한 이유입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보 실습</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>VNQ(또는 관심 리츠 ETF)의 상위 보유·섹터 비중 훑어보기</li>
              <li>최근 금리(10년물) 뉴스와 리츠 차트를 같은 기간으로만 비교해 보기</li>
              <li>목표 비중을 전체의 10% 이하로 적어 두기</li>
              <li>매수 전 <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>체크리스트</Link>에 &ldquo;인컴용 위성&rdquo;이라고 명시</li>
            </ol>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 리츠·부동산 ETF 특정 종목 권유가 아니며, 원금 손실이 가능합니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>What Is a REIT?</h2>
            <p className="text-sm leading-relaxed mb-3">
              A <strong style={{ color: "var(--text)" }}>Real Estate Investment Trust (REIT)</strong> is a company that owns and operates income-producing real estate — offices, apartments, warehouses, data centers, shopping malls, and more. By law, REITs must distribute at least 90% of taxable income as dividends to shareholders, which gives them a favorable tax structure.
            </p>
            <p className="text-sm leading-relaxed">
              You can buy REIT shares or REIT ETFs in a standard brokerage account for small amounts, without buying actual property. The key distinction: REIT prices move every trading day like a stock — not slowly like direct real estate.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Direct Property vs. REITs</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>Direct Real Estate</strong> — large capital outlay, mortgage, vacancy risk, property management, illiquid (selling takes months). Leverage amplifies both gains and losses.</p>
              <p><strong style={{ color: "var(--text)" }}>REITs</strong> — small minimum investment, instant diversification, daily liquidity. Trade-offs: price volatility, interest rate sensitivity, dividend taxation.</p>
              <p><strong style={{ color: "var(--text)" }}>In practice</strong> — $5,000 is not enough to buy a property in most cities, but it can buy shares in VNQ, which owns hundreds of properties across the US. You get real estate exposure, but you own a security — not bricks.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>How REITs Generate Returns</h2>
            <p className="text-sm leading-relaxed mb-3">
              Tenants pay rent → the REIT collects it, deducts operating costs and debt service, and distributes the remainder as dividends. Price appreciation happens when asset values, occupancy rates, or growth expectations improve. This dual return — <Link href="/learn/dividend" style={{ color: "var(--mint)" }}>income (dividends)</Link> plus potential price appreciation — is what makes REITs attractive. But a high yield alone is not a sufficient reason to buy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Why REITs Are Sensitive to Interest Rates</h2>
            <p className="text-sm leading-relaxed mb-3">
              REITs rely heavily on debt to buy and refinance properties. When rates rise, their borrowing costs increase and their dividends look less attractive compared to bonds. This typically compresses REIT valuations. When rates fall, the opposite dynamic tends to apply.
            </p>
            <p className="text-sm leading-relaxed">
              In 2022, aggressive Fed rate hikes caused broad REIT ETFs to fall 25–30%. &ldquo;Real estate is always safe&rdquo; is a myth. Read the <Link href="/learn/bonds" style={{ color: "var(--mint)" }}>bonds guide</Link> and <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>Fed rate guide</Link> together with this one.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>REIT Sectors Have Different Profiles</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>Industrial / Logistics</strong> — driven by e-commerce and supply chain demand for warehousing</li>
              <li><strong style={{ color: "var(--text)" }}>Residential / Apartments</strong> — tied to housing demand, population growth, and rent increases</li>
              <li><strong style={{ color: "var(--text)" }}>Data Centers</strong> — benefits from cloud and AI growth; exposed to high power and cooling costs</li>
              <li><strong style={{ color: "var(--text)" }}>Office</strong> — structurally pressured by remote work trends; higher vacancy risk</li>
              <li><strong style={{ color: "var(--text)" }}>Retail / Healthcare</strong> — retail REITs follow consumer spending; healthcare REITs tied to hospital and senior-living lease cycles</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              A broad REIT ETF diversifies across sectors, but if one sector like office is under stress, the whole ETF still feels the drag.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Key REIT ETFs</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>VNQ</strong> — Vanguard Real Estate ETF. Broad US REIT exposure. One of the most widely referenced REIT ETFs.</li>
              <li><strong style={{ color: "var(--text)" }}>IYR</strong> — iShares US Real Estate ETF. Slightly different composition from VNQ; includes some real estate services companies.</li>
              <li><strong style={{ color: "var(--text)" }}>SCHH</strong> — Schwab US REIT ETF. Low-cost alternative with similar broad exposure.</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              Compare ETFs the same way described in the <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF Guide</Link>: expense ratio, dividend yield, and benchmark index. For non-US investors, review withholding tax and capital gains treatment in your jurisdiction (<Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>Tax Guide</Link>).
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Role in a Portfolio</h2>
            <p className="text-sm leading-relaxed mb-3">
              Most portfolio frameworks use REITs as a satellite allocation for income and real estate exposure — not as the core. The core typically remains <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>broad equity ETFs</Link>.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>Example (illustrative)</strong> — 5–10% of portfolio in REIT ETFs; remainder in equities, bonds, and cash. As the REIT allocation grows, you are making a directional real estate and rate-sensitivity bet rather than diversifying. See <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>Portfolio Strategy</Link> for rebalancing rules.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Common Mistakes</h2>
            <div className="flex flex-col gap-3">
              {[
                ["Buying for yield alone", "A 20% drop in NAV offsets years of dividend income. Total return is what matters."],
                ["Treating REITs like physical real estate prices", "REITs are securities that trade every millisecond — not your local housing market."],
                ["Ignoring rate news", "REIT prices and interest rates are tightly linked. Monitor the Fed."],
                ["Not checking tax-advantaged account eligibility", "Rules vary by account type and country — verify before placing REITs in a pension or ISA wrapper."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ Educational content only. REITs and real estate ETFs carry interest rate, credit, and market risk. Principal loss is possible. Not a recommendation of any specific security.
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
            <Link href="/learn/dividend" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">💰</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "배당 투자 가이드" : "Dividend Investing Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "배당수익률·배당귀족·DRIP" : "Yield, Aristocrats & DRIP reinvestment"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/bonds" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📜</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "채권과 금리 가이드" : "Bonds & Interest Rates Guide"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "금리가 리츠에 영향을 주는 이유" : "Why rate moves hit REITs hard"}</p>
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
