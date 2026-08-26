import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "한국주식 투자 입문 가이드 — 코스피·시총상위·수급·세금 | 인베스트어스",
  description:
    "한국주식(코스피·코스닥)을 처음 보는 분을 위한 입문 가이드. 거래시간, 시총 상위 종목, 외국인·기관 수급, 장전·장중·장후 보는 법, 미국주식과의 차이까지.",
  keywords: ["한국주식", "코스피", "코스닥", "삼성전자", "SK하이닉스", "한국주식 입문", "시총 상위"],
  alternates: { canonical: "https://www.investus.kr/learn/korea-stocks" },
  openGraph: {
    title: "한국주식 투자 입문 가이드 | 인베스트어스",
    description: "코스피·시총상위·수급·미국주식과의 차이를 초보 눈높이로",
    url: "https://www.investus.kr/learn/korea-stocks",
    type: "article",
  },
};

export default function KoreaStocksPage() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-10">
        <div className="pt-4 pb-2">
          <Link href="/learn" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-3.5 h-3.5" /> 투자 지식 허브
          </Link>
        </div>

        <div className="mb-6 pt-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>한국</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 22분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            한국주식 투자 입문 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            코스피·코스닥, 시총 상위 종목, 외국인·기관 수급, 장전·장중·장후 보는 법을
            처음 시작하는 분 눈높이로 정리했습니다. 미국주식과 무엇이 다른지도 함께 봅니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              한국주식이란 — 코스피와 코스닥
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              한국 주식시장은 크게 <strong style={{ color: "var(--text)" }}>코스피(KOSPI)</strong>와
              <strong style={{ color: "var(--text)" }}> 코스닥(KOSDAQ)</strong>으로 나뉩니다.
              코스피는 대형·중견 기업이 많고, 코스닥은 성장·중소형 비중이 상대적으로 큽니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>코스피</strong> — 시총이 큰 대표 종목(삼성전자, SK하이닉스, 현대차 등)이 지수 방향을 크게 좌우합니다.</p>
              <p><strong style={{ color: "var(--text)" }}>코스닥</strong> — 변동성이 더 큰 날이 많고, 테마·수급에 민감할 수 있습니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              초보자는 지수 이름보다 &ldquo;오늘 시총 상위가 올랐는지·외국인이 샀는지&rdquo;를 먼저 보시면 흐름이 잡히기 쉽습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              거래 시간 — 낮에 열립니다
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              정규 거래는 보통 <strong style={{ color: "var(--text)" }}>평일 오전 9시 ~ 오후 3시 30분(KST)</strong>입니다.
              미국주식(밤에 열림)과 달리, 한국 시장은 낮에 움직입니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>장전</strong> — 개장 전 뉴스·미국 마감·환율을 확인하는 구간</li>
              <li><strong style={{ color: "var(--text)" }}>장중</strong> — 실시간 수급·시총 상위 등락</li>
              <li><strong style={{ color: "var(--text)" }}>장후</strong> — 마감 후 정리·다음날 브리핑 준비</li>
            </ul>
            <div className="rounded-2xl p-4 border mt-3" style={{ background: "rgba(var(--mint-rgb),0.04)", borderColor: "rgba(var(--mint-rgb),0.2)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--mint)" }}>💡 Investus 활용</p>
              <p className="text-sm">
                미리보기에서 한국시장을 선택하면 시총 상위 시세·히트맵·브리핑을
                본사이트와 같은 레이아웃으로 볼 수 있습니다.
                <Link href="/preview/kr" style={{ color: "var(--mint)" }}> /preview/kr</Link>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              시총 상위가 중요한 이유
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              코스피는 시가총액이 큰 종목의 비중이 높습니다.
              그래서 <strong style={{ color: "var(--text)" }}>삼성전자·SK하이닉스</strong> 같은 종목이 움직이면
              지수 전체가 같이 움직이는 날이 많습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              초보 체크리스트로 자주 보는 축은 다음과 같습니다.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>자주 보는 시총 축</p>
              <div className="flex flex-col gap-2 text-sm">
                {[
                  ["반도체", "삼성전자, SK하이닉스 — AI·메모리·수출"],
                  ["자동차", "현대차, 기아 — 해외 판매·마진"],
                  ["배터리·바이오", "LG엔솔, 삼바, 셀트리온"],
                  ["금융·플랫폼", "KB·신한, NAVER"],
                ].map(([t, d]) => (
                  <div key={t} className="flex gap-2">
                    <span className="font-bold flex-shrink-0" style={{ color: "var(--text)", minWidth: 72 }}>{t}</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              수급 — 외국인·기관이 왜 나오나
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              한국 시장 뉴스에서 &ldquo;외국인 순매수&rdquo; &ldquo;기관 매도&rdquo;를 자주 듣습니다.
              단기적으로는 누가 사는지가 가격을 밀거나 누르는 힘이 될 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              다만 수급만으로 &ldquo;반드시 오른다&rdquo;고 단정하면 안 됩니다.
              환율(원/달러), 미국 금리·반도체 업황이 같이 움직이는 경우가 많습니다.
              <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}> 환율 가이드</Link>,
              <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}> 금리 가이드</Link>를 함께 보시면 좋습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              미국주식과 무엇이 다른가
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>시간대</strong> — 한국은 낮, 미국은 밤(KST)</li>
              <li><strong style={{ color: "var(--text)" }}>통화</strong> — 한국은 원화, 미국은 달러(+환율)</li>
              <li><strong style={{ color: "var(--text)" }}>세금·계좌</strong> — 국내주식과 해외주식 과세 구조가 다름 (
                <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>미국주식 세금</Link>,
                <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}> ISA·연금</Link>)</li>
              <li><strong style={{ color: "var(--text)" }}>기업 구성</strong> — 한국은 반도체·자동차 비중이 크게 느껴지는 날이 많음</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              둘 중 하나만 &ldquo;정답&rdquo;은 아닙니다. 목적·시간대·리스크 감수에 맞게 비중을 나누는 편이
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}> 포트폴리오 전략</Link>에 가깝습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              초보가 피하면 좋은 실수
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>테마주만 쫓아 비중을 한곳에 몰아넣기</li>
              <li>레버리지·인버스 ETF를 단기 도박처럼 쓰기</li>
              <li>뉴스 제목만 보고 매수 — 수급·실적·환율을 안 보기</li>
              <li>손절·비중 규칙을 정하지 않은 채 감정 매매</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              매수 전에는 <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>체크리스트</Link>와
              <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}> 투자 심리</Link>를 같이 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>관련 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/us-stock-basics" style={{ color: "var(--mint)" }}>미국주식 입문</Link>,
              <Link href="/learn/kr-us-etf" style={{ color: "var(--mint)" }}> 한국 vs 미국 ETF</Link>,
              <Link href="/learn/safe-assets" style={{ color: "var(--mint)" }}> 안전자산</Link>,
              <Link href="/learn/korea-real-estate" style={{ color: "var(--mint)" }}> 한국 부동산</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 특정 종목 매수·매도 권유가 아니며, 투자·세무 자문이 아닙니다.
          </div>
          </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/safe-assets" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🛡️</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>안전자산 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>비트코인·이더·금·은</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/korea-real-estate" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🏠</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>한국 부동산 입문</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>매매·전세·정책</p>
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
