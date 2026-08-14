import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "환율과 미국주식 — 원/달러가 수익률을 바꾸는 방식 | 인베스트어스",
  description:
    "한국 투자자가 미국주식을 할 때 원/달러 환율이 매수 단가·평가손익·환전에 미치는 영향을 숫자 예시로 설명합니다. 환헤지 ETF와의 차이와 흔한 실수도 정리합니다.",
  keywords: ["원달러", "환율 미국주식", "USD KRW", "환전", "환헤지", "원화 수익률"],
  alternates: { canonical: "https://www.investus.kr/learn/usd-krw" },
  openGraph: {
    title: "환율과 미국주식 | 인베스트어스",
    description: "달러 vs 원화 수익률, 환헤지 vs 환노출 — 완전 초보 가이드",
    url: "https://www.investus.kr/learn/usd-krw",
    type: "article",
  },
};

export default function UsdKrwPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>환율</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 22분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            환율과 미국주식
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            한국에서 미국 주식을 사면 수익률은 주가 × 환율입니다.
            달러 차트만 보고 &ldquo;수익&rdquo;이라고 말하면, 원화 통장 기준으로는 다른 숫자가 나올 수 있습니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>원/달러 환율이란?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>원/달러(USD/KRW)</strong>는 &ldquo;미국 달러 1달러를 사려면 원화 몇 원이 필요한가&rdquo;입니다.
              숫자가 올라가면(예: 1,200 → 1,400) 달러가 비싸진 것이고, 내려가면 달러가 싸진 것입니다.
            </p>
            <p className="text-sm leading-relaxed">
              왜 중요할까요? 월급·생활비·목표는 대부분 <em>원화</em>인데, 미국 주식 가격은 <em>달러</em>입니다.
              두 통화가 동시에 움직이므로, 한국 투자자의 실제 손익은 항상 두 축입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>두 개의 수익률</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>달러 수익률</strong>은 매수 단가 대비 현재가입니다.
              증권사 앱 해외주식 화면에 나오는 숫자가 보통 이쪽입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>원화 수익률</strong>은 환전해서 산 원금 대비,
              지금 팔아 원화로 되돌렸을 때의 손익입니다. 생활비·세금·목표 금액은 대부분 원화입니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>숫자 예시 (개념용)</p>
              <p>환율 1,300원일 때 AAPL을 $100에 샀습니다. 원금 ≈ 13만 원(수수료 무시).</p>
              <p>나중에 주가 $110(+10%), 환율 1,200원(−7.7%)이면 → 매도 시 약 $110 × 1,200 = 13.2만 원.</p>
              <p>달러로는 +10%인데, 원화로는 약 +1.5% 수준입니다. 반대(주가 횡보 + 환율 상승)면 원화만 플러스가 되기도 합니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              같은 날 AAPL이 +1%여도, 원/달러가 −2%면 원화로는 마이너스에 가깝습니다.
              2022년처럼 주가는 부진해도 달러가 강하면 원화 평가가 덜 아픈 구간이 있었습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>환전 타이밍에 집착하지 않기</h2>
            <p className="text-sm leading-relaxed mb-3">
              &ldquo;환율이 떨어질 때까지 기다리자&rdquo;는 말은 주가 타이밍과 같은 함정입니다.
              기다리는 동안 시장이 오르면 기회비용이 생깁니다. 환율도 아무도 매일 맞추지 못합니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              월급 적립이라면 환전도 적립과 같은 날, 같은 규칙으로 하는 편이 낫습니다.
              <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link>가 주가뿐 아니라 환율도 분산합니다.
            </p>
            <p className="text-sm leading-relaxed">
              목돈을 한 번에 환전할 때는 증권사 우대 환율·시간대 스프레드를 확인하세요.
              은행 환전 후 증권사로 이체하는 경로가 더 비싼 경우도 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>환헤지 vs 환노출</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>환노출</strong>은 환율 변동이 원화 수익률에 그대로 들어오는 상태입니다.
              미국 거래소 ETF(SPY, VOO, QQQ 등)를 국내 증권사로 사면 기본적으로 환노출입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>환헤지</strong>는 환율 변동을 줄이려는 설계입니다.
              국내 상장 미국지수 ETF 중 &ldquo;(H)&rdquo; 표기가 흔합니다. 헤지 비용이 있고, 달러 강세 국면의 이득도 줄어듭니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>환노출이 맞는 경우</strong> — 장기 달러 자산 비중을 키우고 싶을 때, 헤지 비용을 아끼고 싶을 때.</p>
              <p><strong style={{ color: "var(--text)" }}>환헤지가 맞는 경우</strong> — 원화 기준 변동을 줄이고 싶을 때. 다만 &ldquo;항상 더 안전&rdquo;은 아닙니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              같은 지수라도 한국 상장 ETF와 미국 상장 ETF는 세금·거래시간·헤지 여부가 다릅니다.
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>·
              <Link href="/learn/kr-us-etf" style={{ color: "var(--mint)" }}>국내 vs 미국 ETF</Link>를 함께 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>달러 예금만 vs 주식만</h2>
            <p className="text-sm leading-relaxed mb-3">
              환율만 보고 달러 예금·RP만 늘리는 전략은, 달러 약세 + 미국 증시 강세가 겹치면 소외됩니다.
              반대로 주식만 가득 채우면 동시 충격(위험자산 매도 + 안전자산 달러 수요)에서 심리가 무너질 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              교육용 출발점: 투자 가능 자산의 대부분을 지수 ETF 적립, 일부는 원화 비상금,
              달러가 필요하면 소액 달러 잔고. 숫자는{" "}
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오 전략</Link>과 맞춰 조정하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>세금과 환율</h2>
            <p className="text-sm leading-relaxed mb-3">
              해외주식 양도손익을 원화로 계산할 때 적용 환율이 들어갑니다.
              주가 차익이 없어도 환율 때문에 과세 대상 이익이 생기거나, 그 반대일 수 있습니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>개념 예시</p>
              <p>매수 시 환율 1,200원, 매도 시 1,400원이고 달러 주가가 그대로면 → 원화로는 이익이 날 수 있습니다.</p>
              <p>그 이익이 연간 기본공제를 넘으면 양도세 신고 대상이 될 수 있습니다. 상세는{" "}
                <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>세금 가이드</Link>.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              실제 적용 환율·산식은 증권사·세법을 따르세요. Investus는 세액을 계산해 주지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보가 자주 하는 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["하루 환율만 보고 적립 중단", "DCA의 의미가 사라집니다. 월 규칙을 먼저 지키세요."],
                ["달러 수익률만 자랑하기", "생활은 원화입니다. 원화 평가도 같이 보세요."],
                ["환헤지 = 무조건 안전", "헤지 비용·헤지 실패·상품 구조가 있습니다. 이름만 믿지 마세요."],
                ["은행·증권사 환전을 비교 안 함", "같은 1,000달러라도 수수료 차이가 큽니다. 우대 조건을 확인하세요."],
                ["환율 예측으로 전량 환전", "맞으면 운이지만, 틀리면 기회비용이 큽니다. 분할이 기본입니다."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Investus에서 매일 볼 것</h2>
            <p className="text-sm leading-relaxed mb-3">
              홈 화면의 USD/KRW는 개장 전 점검용입니다. 숫자를 보고 당일 매매를 결정하라는 뜻이 아니라,
              &ldquo;이번 달 적립의 환율 환경&rdquo;을 기억하는 용도입니다.
            </p>
            <p className="text-sm leading-relaxed">
              급변 뉴스가 있으면 인사이트 리포트의 매크로 문단과 함께 읽으세요.
              금리·달러 관계는 <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>금리·연준 가이드</Link>와도 연결됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 할 일</h2>
            <ol className="list-decimal pl-5 text-sm leading-relaxed space-y-2">
              <li>증권사 앱에서 &ldquo;달러 손익&rdquo;과 &ldquo;원화 평가&rdquo;를 각각 찾아보세요.</li>
              <li>월급 적립일이면 환전일도 같은 규칙으로 고정하세요.</li>
              <li>보유 중인 국내 상장 ETF에 (H)가 있는지 확인하세요.</li>
              <li><Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link>·
                <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA·연금</Link>과 맞춰 계좌 역할을 나누세요.</li>
            </ol>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 환율 예측·환전 타이밍 권유가 아니며 원금 손실이 가능합니다.
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
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>적립식 투자(DCA)</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>환율까지 시간에 분산</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/us-stock-tax" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🧾</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>미국주식 세금</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>환율이 양도손익에 들어가는 이유</p>
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
