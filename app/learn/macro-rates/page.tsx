import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "CPI·연준(FOMC)·금리 가이드 | 인베스트어스",
  description: "인플레이션 CPI, 연준 금리 결정, FOMC가 미국 주식·채권에 미치는 영향.",
  alternates: { canonical: "https://www.investus.kr/learn/macro-rates" },
};

export default function MacroRatesPage() {
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
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 16분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>CPI·연준·금리</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            &ldquo;왜 갑자기 NVDA가 빠졌지?&rdquo; — 답이 CPI 발표 30분 전에 있을 때가 많습니다.
            매크로는 예측 게임이 아니라 <em>리스크 관리</em>용입니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>CPI (소비자물가지수)</h2>
            <p className="text-sm leading-relaxed mb-2">가계가 사는 물가 basket의 변화. 인플레↑ → 연준이 금리를 올릴 압력.</p>
            <p className="text-sm leading-relaxed">Core CPI(식품·에너지 제외)도 함께 봅니다. 발표 직후 변동성↑ — 레버리지·올인 매매 자제.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>PCE</h2>
            <p className="text-sm leading-relaxed">연준이 더 중시하는 인플레 지표. CPI와 방향이 다를 수 있어 둘 다 체크.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>FOMC와 기준금리</h2>
            <p className="text-sm leading-relaxed mb-2">연방공개시장위원회, 연 8회 정례 회의. 기준금리·점도표·기자회견이 시장을 움직입니다.</p>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li>금리↑ — 성장주·부동산·고PER 압박, <Link href="/learn/bonds" style={{ color: "var(--mint)" }}>채권</Link> 가격↓ (단기)</li>
              <li>금리↓ — 성장주·테크에 우호적, 달러 약세 가능</li>
              <li>금융주(JPM 등) — 금리·경기 회복에 민감 (<Link href="/learn/sectors" style={{ color: "var(--mint)" }}>섹터</Link>)</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>실적 시즌 (Earnings)</h2>
            <p className="text-sm leading-relaxed mb-2">분기마다 기업 실적. EPS vs 컨센서스, 가이던스가 주가를 움직입니다. 비트해도 가이던스↓면 하락.</p>
            <p className="text-sm leading-relaxed"><Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link>로 숫자 검증, <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER</Link> 맥락 확인.</p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>Investus 활용</h2>
            <p className="text-sm leading-relaxed">홈 매크로·인사이트 리포트로 발표 전후 맥락 파악. 매크로 하루에 포트폴리오 전량 변경은 <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>심리 함정</Link>입니다.</p>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 매크로 예측·단기 매매 권유 아님.
          </div>
        </article>
      </main>
    </div>
  );
}
