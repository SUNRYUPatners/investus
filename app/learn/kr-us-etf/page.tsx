import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "한국 vs 미국 ETF — KODEX·TIGER vs SPY·VOO 초보 완전 정리 | 인베스트어스",
  description:
    "국내 상장 해외 ETF와 미국 상장 ETF 차이를 완전 초보 눈높이로. 환율·세금·환헤지·거래시간·ISA·추적오차까지.",
  keywords: ["국내 상장 해외 ETF", "KODEX", "TIGER", "SPY", "VOO", "환헤지", "ISA ETF"],
  alternates: { canonical: "https://www.investus.kr/learn/kr-us-etf" },
  openGraph: {
    title: "한국 vs 미국 ETF | 인베스트어스",
    description: "같은 S&P500도 세금·환율·거래가 다릅니다",
    url: "https://www.investus.kr/learn/kr-us-etf",
    type: "article",
  },
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
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>ETF</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 23분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            한국 vs 미국 ETF
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            &ldquo;S&amp;P500 사고 싶은데 KODEX로 살까, VOO로 살까?&rdquo; —
            같은 지수를 추종해도 <em>어디서 상장됐는지</em>에 따라 통화·세금·거래 시간·보수가 달라집니다.
            정답 한 줄은 없고, 본인 계좌·습관에 맞는 쪽을 고르면 됩니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>ETF부터 30초 복습</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>ETF</strong>는 여러 주식을 묶어 지수처럼 따라가게 만든 상품을
              거래소에 상장한 것입니다. 자세한 구조는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>미국 ETF 가이드</Link>,
              지수 자체는 <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>·
              <Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>나스닥</Link>을 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>두 갈래 — 어디서 사나</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>미국 상장 ETF</strong> —
              SPY, VOO, IVV, QQQ 등. 미국 거래소에서 <em>달러</em>로 매매합니다.
              한국 증권사 해외주식 계좌가 필요합니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>국내 상장 해외 ETF</strong> —
              KODEX 미국S&amp;P500, TIGER 미국나스닥100처럼 한국 거래소에 상장된 상품.
              <em>원화</em>로 사고팔며, 내부적으로 해외 주식·선물 등으로 지수를 따라갑니다.
              &ldquo;국내 ETF&rdquo;이지만 내용물은 해외 자산인 경우가 많습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>비교 표 (개념)</h2>
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
                    <td className="py-2 pr-2">거래 시간</td>
                    <td className="py-2 pr-2">미국 장 (한국 밤~새벽)</td>
                    <td className="py-2">한국 정규장</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-2">세금(개념)</td>
                    <td className="py-2 pr-2">양도·배당 체계</td>
                    <td className="py-2">국내 상장 ETF 과세 체계</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-2">운용보수</td>
                    <td className="py-2 pr-2">VOO 등 매우 낮은 편</td>
                    <td className="py-2">상품별 상이 (확인 필수)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-2">ISA·연금</td>
                    <td className="py-2 pr-2">직접 편입 제한적</td>
                    <td className="py-2">편입 가능 상품 많음</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              세금 세부는 해마다·상품마다 달라질 수 있습니다.
              미국 상장은 <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>미국주식 세금</Link>,
              세제혜택 계좌는 <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA·연금</Link>을 반드시 확인하세요.
              이 표는 교육용 개념입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>환율 — 같은 지수여도 원화 수익이 다름</h2>
            <p className="text-sm leading-relaxed mb-3">
              미국 ETF는 본질적으로 <strong style={{ color: "var(--text)" }}>환노출</strong>입니다.
              주가가 그대로여도 달러가 비싸지면(원/달러↑) 원화로 환산한 평가액이 늘고,
              달러가 싸지면 줄어듭니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>숫자 예시 (단순화)</strong></p>
              <p>VOO를 $100에 샀고, 그때 환율이 1,300원 → 원화 환산 약 13만 원.</p>
              <p>VOO가 여전히 $100인데 환율이 1,430원이 되면 → 약 14.3만 원. 주가는 안 올랐는데 원화로는 +10%.</p>
              <p>반대로 환율이 1,170원이면 → 약 11.7만 원. 주가 그대로인데 원화 −10%.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              더 자세한 내용은 <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율과 미국주식</Link>을 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>환헤지 vs 환노출 (국내 ETF)</h2>
            <p className="text-sm leading-relaxed mb-3">
              국내 상장 해외 ETF 중 이름에 <strong style={{ color: "var(--text)" }}>H</strong>(헤지)가 붙은 상품은
              환율 변동을 줄이려는 설계입니다. 비헤지(환노출)는 달러 강세 시 원화 환산이 더해질 수 있고,
              약세 시 깎입니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>헤지</strong> — 환율 스트레스를 줄이고 싶을 때. 헤지 비용이 수익률을 깎을 수 있음</li>
              <li><strong style={{ color: "var(--text)" }}>비헤지</strong> — 달러 자산 효과를 원할 때. 환율 변동을 감수</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              &ldquo;헤지가 항상 안전&rdquo;도, &ldquo;비헤지가 항상 유리&rdquo;도 아닙니다. 목표에 맞게 고르세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>추적오차 — 왜 수익률이 살짝 다르나</h2>
            <p className="text-sm leading-relaxed mb-3">
              국내 ETF가 현물·선물·스왑 조합으로 지수를 따라가면,
              미국 현물 ETF(VOO 등)와 <em>일간</em> 수익률이 어긋날 수 있습니다.
              장기에도 방향은 비슷해도 누적 차이가 납니다.
            </p>
            <p className="text-sm leading-relaxed">
              상품 설명서에서 <strong style={{ color: "var(--text)" }}>총보수</strong>·
              <strong style={{ color: "var(--text)" }}>추적오차</strong>·기초지수를 확인하세요.
              보수가 0.03%와 0.50%면 20년 적립 차이가 눈에 띕니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>어떤 상황에 무엇을</h2>
            <div className="flex flex-col gap-3">
              {[
                ["환전·야간 거래가 부담", "국내 상장 해외 ETF — 한국 장중·원화 매매"],
                ["최저 비용·미국 시장 직거래", "VOO·IVV·QQQ 등 미국 ETF"],
                ["ISA·연금에 넣고 세제 혜택", "편입 가능한 국내 상품 위주 (계좌 규정 확인)"],
                ["환율까지 분산하고 싶다", "미국 ETF 또는 비헤지 국내 ETF + 장기 적립"],
                ["레버리지·인버스(곱버스)", "장기 코어 부적합 — ETF 가이드의 함정 참고"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>적립할 때 실전 팁</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>코어는 1~2개로 단순화 — 매달 상품을 바꾸지 않기 (<Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link>)</li>
              <li>미국 ETF면 환전 수수료·환전일을 적립일과 맞추기</li>
              <li>국내 ETF면 H/비헤지·총보수를 매수 전에 한 번만 확인</li>
              <li>세금·계좌 한도는 <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA·연금</Link>과 맞춰 계획</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["이름만 보고 같은 상품이라 생각", "추적 방식·보수·세금이 다릅니다."],
                ["레버리지 국내 ETF를 10년 적립", "변동성 감쇠. 코어 금지에 가깝습니다."],
                ["세금 무시하고 수익률만 비교", "세후가 진짜 성적표입니다."],
                ["환율 하루 보고 전량 이동", "타이밍 비용이 큽니다. 규칙은 미리."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 읽을 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>미국 ETF</Link> ·
              <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율</Link> ·
              <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>세금</Link> ·
              <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA·연금</Link> ·
              <Link href="/learn/us-stock-basics" style={{ color: "var(--mint)" }}>미국주식 입문</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 세율·상품명·편입 가능 여부는 변경될 수 있으니 증권사·국세청·상품 설명서를 확인하세요.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
