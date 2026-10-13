"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

export default function KoreaRealEstatePage() {
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const article = LEARN_ARTICLES.find(a => a.href === "/learn/korea-real-estate")!;

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
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              주식과 무엇이 다른가
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              주식은 클릭 몇 번으로 사고팔 수 있지만, 주택은 <strong style={{ color: "var(--text)" }}>거래 비용·세금·대출·이주</strong>가 큽니다.
              &ldquo;오늘 뉴스에 올랐다&rdquo;고 바로 실행하기 어렵고, 실행까지 시차가 깁니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>실수요</strong> — 거주·학군·출퇴근이 우선</p>
              <p><strong style={{ color: "var(--text)" }}>투자 수요</strong> — 시세차익·임대수익이 우선 (규제·세금 영향이 큼)</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              둘을 섞어 생각하면 헤드라인에 흔들리기 쉽습니다. 내 목적이 어느 쪽인지 먼저 적어두세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              삼각 축 ① 공급·재건축·정책
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              공급 확대·재건축 완화 발표는 <strong style={{ color: "var(--text)" }}>심리를 먼저</strong> 움직입니다.
              실제 인허가·착공·입주는 훨씬 늦게 따라옵니다. &ldquo;발표 = 당장 집이 늘어난다&rdquo;가 아닙니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>세부 시행령·안전진단·공사비가 실행 속도를 가름</li>
              <li>선호지와 비선호지 온도 차가 벌어지는 구간이 있음</li>
              <li>금리·대출 규제가 겹치면 거래가 멈출 수도</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              삼각 축 ② 전세 — 거주 비용의 바로미터
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              전세 매물이 줄고 보증금이 오르면, 일부는 &ldquo;차라리 매수&rdquo;로, 일부는 월세로 이동합니다.
              반대로 입주 물량이 늘면 전세가 안정되는 구간도 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              초보자는 <strong style={{ color: "var(--text)" }}>전세수급동향</strong>과
              <strong style={{ color: "var(--text)" }}> 전세대출 한도</strong>를 같이 보시면 됩니다.
              전세가 올라도 대출이 막히면 매수 실행이 안 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              삼각 축 ③ 대출·DSR·세제
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              DSR(총부채원리금상환비율) 등은 &ldquo;사고 싶은 마음&rdquo;과 &ldquo;살 수 있는 한도&rdquo;를 갈라놓습니다.
              다주택·양도·보유 관련 세제 이슈도 거래 타이밍에 영향을 줍니다.
            </p>
            <p className="text-sm leading-relaxed">
              세무·법률은 개인 상황이 달라 일반론만으로는 부족합니다.
              큰 결정 전에는 전문가 상담을 전제로 하세요. (이 글은 세무 자문이 아닙니다.)
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              미국 REITs와는 어떻게 다른가
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              미국 <Link href="/learn/reits" style={{ color: "var(--mint)" }}>REITs</Link>는
              주식처럼 거래되는 부동산 간접투자 상품인 경우가 많습니다.
              한국 아파트 매매·전세는 <strong style={{ color: "var(--text)" }}>실물 거래·정책·대출</strong>이 중심에 가깝습니다.
            </p>
            <p className="text-sm leading-relaxed">
              &ldquo;부동산&rdquo;이라는 같은 단어라도, 상품 구조가 다르면 리스크도 다릅니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              Investus에서 보는 법
            </h2>
            <div className="rounded-2xl p-4 border" style={{ background: "rgba(var(--mint-rgb),0.04)", borderColor: "rgba(var(--mint-rgb),0.2)" }}>
              <p className="text-sm leading-relaxed">
                미리보기 한국부동산 탭에서 브리핑·정책·지역 히트맵·뉴스를
                본사이트와 같은 레이아웃으로 확인할 수 있습니다.
                <Link href="/preview/kr-re" style={{ color: "var(--mint)" }}> /preview/kr-re</Link>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              초보 체크리스트
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>목적이 실수요인지 투자인지 한 줄로 적기</li>
              <li>대출 한도·DSR을 먼저 확인 (감정 매수 금지)</li>
              <li>정책 헤드라인과 실행 일정표를 구분</li>
              <li>전세·입주 물량·선호지 온도를 같이 보기</li>
              <li>큰 결정은 세무·법률 전문가와 교차 확인</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>관련 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/korea-stocks" style={{ color: "var(--mint)" }}>한국주식</Link>,
              <Link href="/learn/reits" style={{ color: "var(--mint)" }}> REITs</Link>,
              <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}> 금리</Link>,
              <Link href="/learn/safe-assets" style={{ color: "var(--mint)" }}> 안전자산</Link>,
              <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}> ISA·연금</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 특정 지역·단지 매수 권유가 아니며, 부동산·세무·법률 자문이 아닙니다.
          </div>
            </>
          ) : (
            <>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>How Real Estate Differs from Stocks</h2>
            <p className="text-sm leading-relaxed mb-3">
              Stocks can be bought or sold with a few clicks. Residential property involves <strong style={{ color: "var(--text)" }}>transaction costs, taxes, loans, and physical relocation</strong> — and a long lead time between decision and execution. A headline announcing a policy change does not mean prices move immediately; real-world implementation follows months or years later.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>Owner-occupier (실수요)</strong> — Primary driver is living location, school district, and commute. Price appreciation is secondary.</p>
              <p><strong style={{ color: "var(--text)" }}>Investment demand (투자 수요)</strong> — Focused on capital gains and rental income. Significantly affected by regulation and holding taxes.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              Conflating the two leads to being driven by headlines. Clarify your own purpose before evaluating any market data.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Pillar 1 — Supply, Redevelopment &amp; Policy</h2>
            <p className="text-sm leading-relaxed mb-3">
              Announcements of expanded housing supply or relaxed redevelopment rules move <strong style={{ color: "var(--text)" }}>sentiment first</strong>. Actual permits, groundbreaking, and occupancy follow much later — sometimes by years. A policy headline is not the same as new housing being available.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>Implementation speed depends on secondary regulations, safety assessments, and construction costs.</li>
              <li>Price divergence between preferred and non-preferred neighborhoods tends to widen during policy transition periods.</li>
              <li>When interest rates and lending restrictions tighten simultaneously, transaction volume can stall even if supply is constrained.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Pillar 2 — Jeonse: Korea&apos;s Unique Rental System</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>Jeonse (전세)</strong> is a Korean rental arrangement where a tenant deposits a large lump sum (typically 60–80% of the property value) with the landlord, lives rent-free, and receives the deposit back at lease end. When jeonse deposits rise and supply of jeonse units tightens, some renters shift to buying; others shift to monthly rent.
            </p>
            <p className="text-sm leading-relaxed">
              For beginners, tracking jeonse supply/demand trends and jeonse loan limits together gives a better picture than property prices alone. Rising jeonse prices do not automatically translate into buying activity if mortgage lending is restricted.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Pillar 3 — Loans, DSR &amp; Taxation</h2>
            <p className="text-sm leading-relaxed mb-3">
              Korea&apos;s DSR (Debt Service Ratio — 총부채원리금상환비율) regulation caps the proportion of income that can be committed to debt repayment. This creates a hard ceiling between &ldquo;wanting to buy&rdquo; and &ldquo;being able to buy.&rdquo; When DSR limits tighten, effective demand drops regardless of underlying desire.
            </p>
            <p className="text-sm leading-relaxed">
              Multi-property ownership taxes, capital gains holding periods, and acquisition taxes are additional variables that affect timing. Tax and legal situations are highly individual — always consult a specialist before a major transaction. (This article is not tax or legal advice.)
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>How This Differs from US REITs</h2>
            <p className="text-sm leading-relaxed mb-3">
              US <Link href="/learn/reits" style={{ color: "var(--mint)" }}>REITs</Link> are publicly traded companies that own income-producing real estate. You buy shares on a stock exchange — liquid, no mortgages, no physical property. Korean apartment buying and jeonse are <strong style={{ color: "var(--text)" }}>physical transactions</strong> driven by policy, lending rules, and local supply dynamics.
            </p>
            <p className="text-sm leading-relaxed">
              The word &ldquo;real estate&rdquo; covers both, but the risk drivers, liquidity, and leverage structures are fundamentally different.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Beginner Checklist</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Write down in one sentence whether your purpose is to live there or to invest.</li>
              <li>Check your loan limit and DSR ceiling before getting emotionally attached to a property.</li>
              <li>Separate policy headlines from implementation timelines — they are rarely the same date.</li>
              <li>Track jeonse supply trends, upcoming move-in volumes, and your target neighborhood temperature together.</li>
              <li>For major decisions, cross-check with a tax and legal professional.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Related Articles</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/korea-stocks" style={{ color: "var(--mint)" }}>Korean Stocks</Link>,{" "}
              <Link href="/learn/reits" style={{ color: "var(--mint)" }}>REITs</Link>,{" "}
              <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>Interest Rates</Link>,{" "}
              <Link href="/learn/safe-assets" style={{ color: "var(--mint)" }}>Safe Assets</Link>,{" "}
              <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA &amp; Pension</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ Educational content only. Not a recommendation to purchase any specific property or location. Not real estate, tax, or legal advice.
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
            <Link href="/learn/korea-stocks" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🇰🇷</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "한국주식 입문" : "Introduction to Korean Stocks"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "코스피·수급·시총" : "KOSPI, order flow, large-caps"}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/macro-rates" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🏛️</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "금리·매크로" : "CPI, Fed & Interest Rates"}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{isKo ? "대출·자산가격과 연결" : "How rates connect to property prices"}</p>
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
