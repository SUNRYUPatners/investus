import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { getLocale } from "@/lib/getLocale";

export const metadata: Metadata = {
  title: "미국주식 초보 가이드 — 계좌·ETF·리포트 읽는 법 | Investus",
  description:
    "미국주식 투자를 시작하는 한국 투자자를 위한 실전 가이드. 계좌 개설, S&P500·나스닥 ETF, 공포탐욕지수·버핏지수, Investus 리포트 활용법까지 정리합니다.",
  openGraph: {
    title: "미국주식 초보 가이드 | Investus",
    description: "계좌·ETF·지표·리포트까지 — 미국주식 입문자를 위한 오리지널 가이드",
    type: "article",
  },
};

export default async function UsInvestingGuidePage() {
  const locale = await getLocale();
  const isKo = locale === "ko";

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 lg:pb-10">
        <div className="pt-4 pb-2">
          <Link href="/more" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-3.5 h-3.5" /> {isKo ? "더보기" : "More"}
          </Link>
        </div>

        <article>
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--mint)" }}>
            EDITORIAL
          </p>
          <h1 className="text-xl font-bold font-syne mb-2 leading-snug" style={{ color: "var(--text)" }}>
            {isKo ? "미국주식 초보 가이드" : "US Stocks Starter Guide"}
          </h1>
          <p className="text-[12px] mb-6" style={{ color: "var(--muted)" }}>
            {isKo
              ? "주식회사 선류파트너스 · Investus 편집팀 · 2026년 8월 12일"
              : "Sunryu Partners · Investus Editorial · August 12, 2026"}
          </p>

          <div className="space-y-5 text-[14px] leading-relaxed" style={{ color: "var(--muted)" }}>
            {isKo ? (
              <>
                <p>
                  Investus(인베스트어스)는 한국 투자자가 미국 시장을 매일 파악할 수 있도록 만든 투자 정보 플랫폼입니다.
                  실시간 시세·지수·환율, 공포탐욕지수·버핏지수, CIO 리포트, 종목 검색과 포트폴리오 도구를 한곳에 모았습니다.
                  이 글은 광고 수익화와 무관하게, 처음 미국주식을 접하는 독자를 위해 서비스가 직접 작성한 오리지널 가이드입니다.
                </p>

                <h2 className="text-base font-bold pt-2" style={{ color: "var(--text)" }}>1. 왜 미국주식인가</h2>
                <p>
                  미국 주식시장은 전 세계 시가총액의 상당 비중을 차지하며, 공시(SEC)·유동성·기업 다양성 측면에서
                  장기 투자 환경을 갖추고 있습니다. Apple, Microsoft, NVIDIA 등 글로벌 성장 기업의 본거지이기도 합니다.
                  다만 환율(달러/원), 시차, 세금·증권사 수수료를 함께 이해해야 합니다. Investus 홈의 환율·선물·지수 섹션은
                  장이 열리기 전 점검용으로 설계되어 있습니다.
                </p>

                <h2 className="text-base font-bold pt-2" style={{ color: "var(--text)" }}>2. 시작 전 체크리스트</h2>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>국내 증권사에서 해외주식(미국) 거래 가능 여부를 확인합니다.</li>
                  <li>투자 원금과 손실 감내 한도를 미리 적어둡니다. 레버리지·단타부터 시작하지 마세요.</li>
                  <li>개별 종목보다 S&amp;P500(예: SPY, VOO) 또는 나스닥100(예: QQQ) ETF로 시장 전체를 익히는 편이 안전합니다.</li>
                  <li>투자 정보는 참고용이며, Investus는 개별 투자 권유를 하지 않습니다.</li>
                </ul>

                <h2 className="text-base font-bold pt-2" style={{ color: "var(--text)" }}>3. Investus에서 매일 볼 것</h2>
                <p>
                  <strong style={{ color: "var(--text)" }}>홈</strong> — 전일·당일 시장 흐름(지수, 선물, 환율, 섹터).
                  공포탐욕지수와 버핏지수는 과열·침체 맥락을 보는 보조 지표입니다.
                </p>
                <p>
                  <strong style={{ color: "var(--text)" }}>인사이트</strong> — SUNRYU Partners CIO가 작성한 일일 리포트.
                  뉴스 요약이 아니라 시장·섹터·종목 관점의 분석 글입니다. 오늘자 리포트와 추천 도서·유튜브도 함께 제공합니다.
                </p>
                <p>
                  <strong style={{ color: "var(--text)" }}>검색·종목</strong> — 티커 검색 후 차트·관련 뉴스·종토방 논의를 확인할 수 있습니다.
                </p>
                <p>
                  <strong style={{ color: "var(--text)" }}>자산</strong> — 보유 종목을 기록하고 등락을 추적합니다. 증권사 연동·AI 분석은 선택 기능입니다.
                </p>

                <h2 className="text-base font-bold pt-2" style={{ color: "var(--text)" }}>4. 리포트를 읽는 방법</h2>
                <p>
                  리포트 상단의 핵심 수치와 결론을 먼저 본 뒤, 근거(매크로·실적·수급) 문단을 읽으세요.
                  “매수/매도” 한 줄에만 의존하지 말고, 본인의 투자 기간·비중과 맞는지 대조하는 습관이 중요합니다.
                  과거 성과나 타인의 의견은 미래 수익을 보장하지 않습니다.
                </p>

                <h2 className="text-base font-bold pt-2" style={{ color: "var(--text)" }}>5. 콘텐츠·광고 정책</h2>
                <p>
                  Investus는 투자 교육·시장 정보 제공을 목적으로 운영됩니다. 사이트에는 Google AdSense 및 Kakao AdFit 광고가
                  표시될 수 있으며, 광고는 콘텐츠와 구분됩니다. 개인정보·쿠키·광고 설정은{" "}
                  <Link href="/more/privacy" className="underline" style={{ color: "var(--mint)" }}>개인정보처리방침</Link>
                  을 참고하세요. 문의는{" "}
                  <Link href="/more/contact" className="underline" style={{ color: "var(--mint)" }}>연락처</Link>
                  페이지를 이용해 주세요.
                </p>

                <h2 className="text-base font-bold pt-2" style={{ color: "var(--text)" }}>6. 더 깊게 공부하기</h2>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><Link href="/learn" className="underline" style={{ color: "var(--mint)" }}>투자 지식 허브 전체</Link></li>
                  <li><Link href="/learn/us-stock-basics" className="underline" style={{ color: "var(--mint)" }}>미국주식 입문</Link></li>
                  <li><Link href="/learn/value-investing" className="underline" style={{ color: "var(--mint)" }}>가치투자·대가 전략</Link></li>
                  <li><Link href="/learn/etf" className="underline" style={{ color: "var(--mint)" }}>미국 ETF (SPY·VOO·QQQ)</Link></li>
                  <li><Link href="/learn/valuation" className="underline" style={{ color: "var(--mint)" }}>PER·PBR 밸류에이션</Link></li>
                  <li><Link href="/learn/bonds" className="underline" style={{ color: "var(--mint)" }}>채권과 금리</Link></li>
                  <li><Link href="/learn/commodities" className="underline" style={{ color: "var(--mint)" }}>원자재 (금·유가)</Link></li>
                  <li><Link href="/learn/crypto" className="underline" style={{ color: "var(--mint)" }}>비트코인·암호화폐</Link></li>
                  <li><Link href="/learn/korea-accounts" className="underline" style={{ color: "var(--mint)" }}>ISA·연금저축·IRP</Link></li>
                  <li><Link href="/learn/nasdaq" className="underline" style={{ color: "var(--mint)" }}>나스닥100·QQQ</Link></li>
                  <li><Link href="/learn/sp500" className="underline" style={{ color: "var(--mint)" }}>S&amp;P500 이해하기</Link></li>
                  <li><Link href="/learn/dca" className="underline" style={{ color: "var(--mint)" }}>적립식 투자(DCA)</Link></li>
                  <li><Link href="/learn/us-stock-tax" className="underline" style={{ color: "var(--mint)" }}>미국주식 세금·계좌</Link></li>
                  <li><Link href="/learn/usd-krw" className="underline" style={{ color: "var(--mint)" }}>환율과 미국주식</Link></li>
                  <li><Link href="/learn/sectors" className="underline" style={{ color: "var(--mint)" }}>11개 섹터 가이드</Link></li>
                  <li><Link href="/learn/fear-greed" className="underline" style={{ color: "var(--mint)" }}>공포탐욕지수</Link></li>
                  <li><Link href="/learn/buffett-indicator" className="underline" style={{ color: "var(--mint)" }}>버핏지수</Link></li>
                  <li><Link href="/insight" className="underline" style={{ color: "var(--mint)" }}>일일 인사이트 리포트</Link></li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  Investus is a US-market information platform for investors who want a daily overview:
                  live quotes, indices, FX, Fear &amp; Greed, the Buffett Indicator, CIO reports, stock search, and portfolio tools.
                  This original guide was written by our team for first-time US equity investors.
                </p>
                <h2 className="text-base font-bold pt-2" style={{ color: "var(--text)" }}>1. Why US equities</h2>
                <p>
                  The US market offers deep liquidity, SEC disclosure, and access to global growth companies.
                  Still, FX (USD/KRW), time zones, taxes, and brokerage fees matter. Use the Home tab futures/indices/FX block before the open.
                </p>
                <h2 className="text-base font-bold pt-2" style={{ color: "var(--text)" }}>2. Starter checklist</h2>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Confirm your broker supports US equity trading.</li>
                  <li>Write down capital and loss limits — avoid leverage first.</li>
                  <li>Learn with broad ETFs (e.g. SPY/VOO, QQQ) before single names.</li>
                  <li>Investus content is informational only, not personalized advice.</li>
                </ul>
                <h2 className="text-base font-bold pt-2" style={{ color: "var(--text)" }}>3. What to check daily</h2>
                <p>Home for market tape; Insights for CIO reports; Search for tickers; Portfolio to track holdings.</p>
                <h2 className="text-base font-bold pt-2" style={{ color: "var(--text)" }}>4. Ads &amp; privacy</h2>
                <p>
                  Pages may show Google AdSense and Kakao AdFit. See our{" "}
                  <Link href="/more/privacy" className="underline" style={{ color: "var(--mint)" }}>Privacy Policy</Link>
                  {" "}and{" "}
                  <Link href="/more/contact" className="underline" style={{ color: "var(--mint)" }}>Contact</Link>.
                </p>
              </>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
