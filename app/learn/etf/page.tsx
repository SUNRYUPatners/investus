import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "미국 ETF 완전 가이드 — SPY·VOO·QQQ 차이부터 고르는 법 | 인베스트어스",
  description:
    "미국주식 ETF가 무엇인지, SPY·VOO·IVV·QQQ 차이, 운용보수·추적오차·배당·세금·레버리지 함정까지 한국 투자자 기준으로 정리한 오리지널 가이드입니다.",
  keywords: ["미국 ETF", "SPY", "VOO", "QQQ", "IVV", "ETF 투자", "상장지수펀드", "운용보수"],
  alternates: { canonical: "https://www.investus.kr/learn/etf" },
  openGraph: {
    title: "미국 ETF 완전 가이드 | 인베스트어스",
    description: "SPY·VOO·QQQ 차이, 보수, 추적오차, 배당·세금 — ETF 입문",
    url: "https://www.investus.kr/learn/etf",
    type: "article",
  },
};

export default function EtfGuidePage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(96,165,250,0.15)", color: "#60a5fa" }}>ETF</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 18분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            미국 ETF 완전 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            ETF는 미국주식 입문자가 가장 많이 고르는 상품입니다. 한 종목으로 수백 개 기업에 나눠 담고,
            주식처럼 장중에 사고팔 수 있습니다. 이 글은 Investus 편집팀이 한국 투자자 기준으로 정리한 오리지널 설명입니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>ETF란 무엇인가</h2>
            <p className="text-sm leading-relaxed mb-3">
              ETF(Exchange Traded Fund, 상장지수펀드)는 특정 지수나 자산군을 따라가도록 설계된 펀드를
              거래소에 상장한 것입니다. 펀드처럼 분산되고, 주식처럼 실시간 호가로 거래됩니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              개별 종목을 고르지 않아도 S&amp;P500, 나스닥100, 반도체, 배당주 바스켓에 투자할 수 있습니다.
              단, ETF도 원금 손실이 있고, 레버리지·인버스 ETF는 장기 보유에 특히 부적합할 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              뮤추얼펀드와 다른 점은 &ldquo;하루 한 번 NAV로만 사고파는&rdquo; 구조가 아니라,
              장중 내내 호가가 붙는다는 점입니다. 프리미엄·디스카운트가 생길 수 있지만
              대형 지수 ETF는 보통 스프레드가 매우 좁습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>자주 비교되는 티커</h2>
            <div className="rounded-2xl p-4 border space-y-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              {[
                ["SPY", "S&P500 추종. 유동성이 매우 크고 옵션 시장도 활발. 보수는 VOO/IVV보다 높은 편."],
                ["VOO / IVV", "같은 S&P500. 운용보수가 낮아 장기 적립 코어로 많이 선택됩니다."],
                ["QQQ", "나스닥100. 기술·성장 비중이 높아 상승장에 강하고 조정장에 더 흔들립니다."],
                ["SCHD / VYM 등", "배당 성향 ETF. 현금흐름을 중시할 때. 성장 속도는 지수 ETF보다 완만한 경우가 많습니다."],
                ["IWM", "러셀2000(소형주). 경기에 민감하고 변동성이 큽니다. 입문 코어로는 비중이 과하지 않게."],
                ["GLD / SLV", "금·은 현물 추종. 주식과 상관관계가 낮을 때가 있어 위성 자산으로 쓰입니다."],
              ].map(([t, d]) => (
                <div key={t}>
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed mt-0.5">{d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-3">
              나스닥 쪽을 더 깊게 보려면 <Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>나스닥 가이드</Link>,
              지수 자체는 <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500 가이드</Link>를 참고하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>고를 때 볼 숫자 4가지</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>
                <strong style={{ color: "var(--text)" }}>운용보수(ER, Expense Ratio)</strong> —
                연간 자산에서 떼는 비용. 0.03%와 0.09%는 하루로는 작아 보여도 20년 적립이면 눈에 띕니다.
                같은 지수를 추종한다면 보수가 낮은 쪽이 장기적으로 유리한 경우가 많습니다.
              </li>
              <li>
                <strong style={{ color: "var(--text)" }}>추적오차</strong> —
                지수 대비 성과가 얼마나 빗나가는지. 보수·증권 대여·현금 유보가 원인일 수 있습니다.
              </li>
              <li>
                <strong style={{ color: "var(--text)" }}>거래량·스프레드</strong> —
                호가 간격이 좁을수록 매매 비용이 작습니다. 국내 증권사 해외주식 호가는 미국 정규장 기준으로 보세요.
              </li>
              <li>
                <strong style={{ color: "var(--text)" }}>구성 종목·섹터</strong> —
                이름만 보고 사지 말고, 상위 10개 종목 비중과 섹터 비중을 확인하세요.
                &ldquo;테마 ETF&rdquo;는 종목 수가 적어도 한 이슈에 몰릴 수 있습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>코어와 위성으로 나누기</h2>
            <p className="text-sm leading-relaxed mb-3">
              입문 포트폴리오에서 ETF를 쓸 때는 <strong style={{ color: "var(--text)" }}>코어(Core)</strong>와
              <strong style={{ color: "var(--text)" }}> 위성(Satellite)</strong>을 나누는 편이 관리가 쉽습니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>코어: S&amp;P500 또는 전세계 주식 ETF. 적립의 대부분. 자주 바꾸지 않습니다.</li>
              <li>위성: 나스닥100, 반도체, 배당, 금 등. 전체의 10~30% 안에서만.</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              위성을 매달 바꾸면 적립이 아니라 테마 단타가 됩니다.
              섹터 배분은 <Link href="/learn/sectors" style={{ color: "var(--mint)" }}>미국 주식 섹터 가이드</Link>,
              전체 비중은 <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오 전략</Link>을 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>레버리지 ETF를 피해야 하는 이유</h2>
            <p className="text-sm leading-relaxed mb-3">
              TQQQ, SOXL처럼 일간 수익률을 2~3배로 추종하는 상품은, 오를 때만이 아니라 내릴 때도 배가 됩니다.
              매일 리밸런싱하기 때문에 횡보장에서는 <strong style={{ color: "var(--text)" }}>변동성 감쇠</strong>로
              지수가 제자리여도 ETF 가격이 깎일 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              예: 어느 지수가 +10%, −10%를 반복하면 지수는 거의 제자리여도,
              3배 레버리지 상품은 손실이 누적되는 경로가 나옵니다. &ldquo;장기적으로 나스닥이 오를 테니 TQQQ를 적립&rdquo;은
              지수 방향과 상품 수학이 다른 이야기입니다.
            </p>
            <p className="text-sm leading-relaxed">
              초보 투자자의 첫 상품으로 레버리지·인버스 ETF는 권하지 않습니다.
              코어는 1배 지수 ETF, 위성은 개별 우량주로 나누는 편이 관리가 쉽습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>배당·세금·환율</h2>
            <p className="text-sm leading-relaxed mb-3">
              미국 ETF 배당은 보통 미국에서 원천징수된 뒤 국내 계좌로 들어옵니다.
              매매 차익은 국내 양도소득 과세 대상일 수 있습니다. 자세한 골격은{" "}
              <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>미국주식 세금 가이드</Link>를 보세요.
            </p>
            <p className="text-sm leading-relaxed">
              원화로 사서 달러 자산을 보유하면, ETF 가격뿐 아니라 원/달러도 수익률에 들어갑니다.
              <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율과 미국주식</Link>에서 원화 환산 손익을 정리했습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>자주 하는 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["같은 지수를 여러 ETF로 중복 매수", "SPY+VOO+IVV를 동시에 사면 분산이 아니라 중복입니다. 보수·유동성만 보고 하나를 고르세요."],
                ["테마 ETF만 모으기", "AI·양자·우주를 한꺼번에 담으면 상관관계가 높아 조정이 한 번에 옵니다."],
                ["국내 상장 미국 ETF와 혼동", "한국 거래소에 상장된 미국지수 ETF는 과세·환헤지·거래시간이 다릅니다. 티커만 같다고 같은 상품이 아닙니다."],
                ["NAV와 시장가 차이를 무시", "거래량이 적은 테마 ETF는 호가가 벌어질 수 있습니다. 지정가로 넣으세요."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Investus에서 활용하기</h2>
            <p className="text-sm leading-relaxed">
              홈에서 S&amp;P500·나스닥 지수와 선물을 보고, 검색에서 SPY·QQQ 등 티커를 찾아 차트를 확인한 뒤,
              자산 탭에 보유 수량·평단을 기록하면 비중을 관리하기 쉽습니다.
              적립 계획이 있다면 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA 가이드</Link>와 함께 읽으세요.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적 정보이며 특정 ETF 매수·매도 권유가 아닙니다. 과거 성과는 미래를 보장하지 않으며 원금 손실이 가능합니다.
          </div>
        </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/dca" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📅</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>적립식 투자(DCA) 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>매달 같은 금액으로 모으는 법</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/nasdaq" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">💻</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>나스닥 완전 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>나스닥100과 QQQ를 구분하는 법</p>
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
