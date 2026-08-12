import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "경제 캘린더 활용법 — CPI·FOMC·고용 | 인베스트어스",
  description: "미국 경제지표 발표 일정 보는 법, CPI·FOMC·비농업고용 전후 체크리스트.",
  alternates: { canonical: "https://www.investus.kr/learn/economic-calendar" },
};

export default function EconomicCalendarPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>매크로</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 15분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>경제 캘린더 활용법</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            캘린더는 예측기가 아니라 <em>변동성 일정표</em>입니다. 발표 전후 리스크를 관리하는 데 쓰세요.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>꼭 볼 일정</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li>CPI / PCE — 인플레 (<Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>금리 가이드</Link>)</li>
              <li>FOMC — 기준금리·점도표·기자회견</li>
              <li>비농업 고용·실업률</li>
              <li>GDP, PMI, 소매판매</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>발표 전</h2>
            <p className="text-sm leading-relaxed">레버리지·옵션 만기 임박 포지션 축소. 코어 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF</Link>는 그대로 두고, 당일 데이트레이딩은 자제. <Link href="/learn/futures" style={{ color: "var(--mint)" }}>선물</Link>로 장전 온도만 체크.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>발표 직후</h2>
            <p className="text-sm leading-relaxed mb-2">첫 30분은 노이즈. &ldquo;예상보다 높다/낮다&rdquo; 헤드라인 → 금리·달러·성장주 반응을 함께 봅니다.</p>
            <p className="text-sm leading-relaxed">채권(<Link href="/learn/bonds" style={{ color: "var(--mint)" }}>10년물</Link>)과 주식이 같은 방향으로 급하면 &ldquo;리스크온/오프&rdquo; 프레임을 의심하세요.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>한국 시간</h2>
            <p className="text-sm leading-relaxed">미국 오전 발표는 한국 저녁~밤. 수면·일상 리듬을 깨며 단타하지 말고, 다음 날 Investus 리포트로 정리된 맥락을 보는 편이 낫습니다.</p>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 경제지표 트레이딩 권유 아님.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
