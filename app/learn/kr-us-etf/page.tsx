import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "한국 vs 미국 ETF — KODEX·TIGER vs SPY·VOO | 인베스트어스",
  description: "국내 상장 해외 ETF와 미국 상장 ETF 차이 — 환율, 세금, 추적오차, 환헤지.",
  alternates: { canonical: "https://www.investus.kr/learn/kr-us-etf" },
};

export default function KrUsEtfPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>ETF</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 17분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>한국 vs 미국 ETF</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            같은 S&amp;P500을 사도 KODEX·TIGER(국내 상장)와 SPY·VOO(미국 상장)는 세금·환율·거래 방식이 다릅니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>두 갈래</h2>
            <p className="text-sm leading-relaxed mb-2">
              <strong style={{ color: "var(--text)" }}>미국 상장 ETF</strong> — SPY, VOO, QQQ. 달러로 매매, 미국 거래소.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>국내 상장 해외 ETF</strong> — KODEX 미국S&amp;P500, TIGER 미국나스닥100 등. 원화로 매매, 한국 거래소. 내부적으로 해외 자산·선물을 보유합니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>비교 요약</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th className="text-left py-2 pr-2" style={{ color: "var(--text)" }}>항목</th>
                    <th className="text-left py-2 pr-2" style={{ color: "var(--text)" }}>미국 ETF</th>
                    <th className="text-left py-2" style={{ color: "var(--text)" }}>국내 해외 ETF</th>
                  </tr>
                </thead>
                <tbody className="leading-relaxed">
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-2">통화</td>
                    <td className="py-2 pr-2">USD + 환전</td>
                    <td className="py-2">KRW</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-2">세금(개념)</td>
                    <td className="py-2 pr-2">양도·배당 (<Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>가이드</Link>)</td>
                    <td className="py-2">국내 상장 ETF 과세 체계</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-2">거래 시간</td>
                    <td className="py-2 pr-2">미국 장 (한국 밤~새벽)</td>
                    <td className="py-2">한국 정규장</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-2">운용보수</td>
                    <td className="py-2 pr-2">VOO 등 매우 낮음</td>
                    <td className="py-2">상품별 상이 (확인 필수)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>환헤지 vs 환노출</h2>
            <p className="text-sm leading-relaxed mb-2">
              국내 해외 ETF 중 &ldquo;H&rdquo;(헤지) 붙은 상품은 환율 변동을 줄이려 합니다. 비헤지는 달러 강세 시 원화 환산 수익이 더해질 수 있고, 약세 시 깎입니다.
            </p>
            <p className="text-sm leading-relaxed">
              미국 ETF는 본질적으로 환노출. 자세한 내용은 <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율 가이드</Link>.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>어떤 걸 고를까</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li>환전·야간 거래가 부담 → 국내 상장 해외 ETF</li>
              <li>최저 비용·미국 시장 직거래 → SPY/VOO/QQQ</li>
              <li>ISA·연금에 편입 → 국내 상품 가능 여부 확인 (<Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA·연금</Link>)</li>
              <li>레버리지·인버스(곱버스) — 장기 코어 부적합 (<Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>)</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>추적오차</h2>
            <p className="text-sm leading-relaxed">
              국내 ETF가 선·현물 조합으로 지수를 따라가면, 미국 현물 ETF와 일간 수익률이 어긋날 수 있습니다. 장기에는 방향은 비슷해도 누적 차이가 납니다. 상품 설명서의 추적오차·총보수를 보세요.
            </p>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 세율·상품명은 변경될 수 있으니 증권사·국세청 자료를 확인하세요.
          </div>
        </article>
      </main>
    </div>
  );
}
