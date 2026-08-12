import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "적립식 투자(DCA) 가이드 — 매달 같은 금액으로 미국주식 모으기 | 인베스트어스",
  description:
    "달러코스트애버리징(DCA)의 원리, 장단점, 목돈 일시 투자와의 차이, 한국 투자자가 환율까지 고려해 적립하는 방법과 실패 패턴을 설명합니다.",
  keywords: ["적립식 투자", "DCA", "달러코스트애버리징", "미국주식 적립", "정액 적립"],
  alternates: { canonical: "https://www.investus.kr/learn/dca" },
  openGraph: {
    title: "적립식 투자(DCA) 가이드 | 인베스트어스",
    description: "매달 같은 금액으로 미국 ETF·주식을 모으는 방법과 한계",
    url: "https://www.investus.kr/learn/dca",
    type: "article",
  },
};

export default function DcaPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>습관</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 16분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            적립식 투자(DCA) 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            시장 타이밍을 맞추지 않아도, 매달 같은 날 같은 금액으로 사는 방법입니다.
            완벽한 전략은 아니지만 초보가 가장 오래 지속하기 쉬운 방법 중 하나입니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>DCA가 하는 일</h2>
            <p className="text-sm leading-relaxed mb-3">
              Dollar-Cost Averaging은 가격이 높을 때 적게, 낮을 때 많이 사지게 만드는 정액 매수입니다.
              평균 단가가 한 번에 전액 투입한 경우보다 완만해지는 <em>경향</em>이 있습니다.
              항상 더 높은 수익을 보장하지는 않습니다.
            </p>
            <p className="text-sm leading-relaxed">
              강한 상승장만 이어지면 초기에 목돈을 넣은 쪽이 유리할 수 있습니다.
              DCA의 진짜 가치는 수익 극대화가 아니라 <strong style={{ color: "var(--text)" }}>실행 가능성</strong>과
              고점 올인 방지입니다. &ldquo;언제 살지&rdquo;를 매일 고민하면 결국 안 사게 되는 사람이 많습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>목돈 일시 투자 vs 적립</h2>
            <p className="text-sm leading-relaxed mb-3">
              학술·실무에서 자주 나오는 결론은 &ldquo;장기적으로 주가가 우상향한다면, 가능한 한 빨리 시장에 넣는 쪽이
              기대값이 높다&rdquo;는 쪽입니다. 다만 그 문장은 <em>심리를 버틸 수 있을 때</em>만 의미가 있습니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>일시 투입이 맞는 경우</strong> — 이미 투자 경험이 있고, 현금이 예비비 위에 남아 있으며, 2~3년 안에 쓸 돈이 아닙니다.</p>
              <p><strong style={{ color: "var(--text)" }}>적립이 맞는 경우</strong> — 월급으로 모으는 단계, 첫 해외주식, 고점 공포가 큰 사람.</p>
              <p><strong style={{ color: "var(--text)" }}>혼합</strong> — 목돈의 30~50%를 먼저 넣고 나머지를 6~12개월 적립. 타협안입니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>한국 투자자가 추가로 겪는 변수: 환율</h2>
            <p className="text-sm leading-relaxed mb-3">
              원화로 월급을 받고 달러 자산을 사면, 주가뿐 아니라 원/달러도 매수 단가에 들어갑니다.
              달러가 비쌀 때 같은 원화로 사는 주식 수량이 줄어듭니다. DCA는 이 환율 변동도 시간에 분산합니다.
            </p>
            <p className="text-sm leading-relaxed">
              Investus 홈에서 USD/KRW를 매일 확인하되, 하루 환율에 일희일비하며 적립을 중단하지 마세요.
              적립을 멈추는 순간 DCA의 의미가 사라집니다.
              원화 환산 손익은 <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율 가이드</Link>에서 더 다룹니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>실전 규칙 예시</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>대상: S&amp;P500 ETF 1종 (VOO 또는 IVV 등). 처음에는 종목을 늘리지 않습니다. 상품 비교는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>.</li>
              <li>주기: 매월 급여일 +1~2일. 자동이체·예약 매수가 있으면 감정 개입을 줄입니다.</li>
              <li>금액: 생활비를 빼고도 12개월 유지 가능한 금액. &ldquo;남는 돈&rdquo;이 아니라 예산의 한 줄로 잡습니다.</li>
              <li>예외: 실직·의료비 등 현금이 필요하면 적립을 줄이거나 멈춥니다. 레버리지로 메우지 않습니다.</li>
              <li>기록: Investus 자산 탭에 매수 수량·평단을 남기면 나중에 &ldquo;얼마에 샀는지&rdquo;를 잊어도 됩니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>금액 정하는 간단한 방법</h2>
            <p className="text-sm leading-relaxed mb-3">
              월급의 고정 비율(예: 10%)보다, <strong style={{ color: "var(--text)" }}>고정 원화 금액</strong>이 DCA 정의에 더 가깝습니다.
              비율로 하면 보너스가 있는 달만 갑자기 커져 평균 단가 효과가 왜곡됩니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              보너스·성과급은 별도 규칙으로 두세요. 예: 보너스의 30%만 같은 ETF에 분할 매수, 나머지는 비상금.
              &ldquo;올해는 시장이 좋아 보이니 보너스 전부&rdquo;는 DCA가 아닙니다.
            </p>
            <p className="text-sm leading-relaxed">
              세금·수수료도 금액에 포함해 생각하세요. 환전 수수료가 큰 증권사면 한 달에 여러 번 쪼개 환전하는 것이
              오히려 비용을 늘릴 수 있습니다. 적립일과 환전일을 맞춰 두는 편이 낫습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>DCA가 실패하는 패턴</h2>
            <div className="flex flex-col gap-3">
              {[
                ["하락장에 중단", "가장 수량이 많아지는 구간에서 멈추면 평균단가 효과가 사라집니다. 공포탐욕만 보고 끊지 마세요."],
                ["종목을 매달 바꿈", "테마를 쫓으면 적립이 아니라 단타가 됩니다. 코어 ETF는 최소 1년은 유지하세요."],
                ["레버리지로 적립", "변동성 감쇠 + 심리적 항복이 겹치기 쉽습니다. TQQQ 적립은 DCA의 대표 오용입니다."],
                ["적립과 전량 매도를 반복", "공포탐욕만 보고 팔면 DCA 의미가 없습니다. 비중만 소폭 조절하세요."],
                ["생활비를 깎아 적립", "카드값·월세를 미루며 사는 적립은 지속 불가능합니다. 먼저 비상금."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>언제 적립액을 바꿔도 되나</h2>
            <p className="text-sm leading-relaxed mb-3">
              소득이 늘면 금액을 올려도 됩니다. 다만 &ldquo;지수가 빠졌으니 이번 달만 3배&rdquo;는
              타이밍 베팅에 가깝습니다. 올리고 싶다면 규칙을 미리 적어 두세요.
              예: 공포탐욕이 극단 공포여도 평소의 1.2배까지만, 3개월 연속으로만.
            </p>
            <p className="text-sm leading-relaxed">
              목표 금액(예: 은퇴 자금의 일정 비율)에 도달하면 적립을 줄이고 리밸런싱·인출 규칙으로 넘어갑니다.
              그때는 <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오 전략</Link>이 더 중요해집니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>관련 글</h2>
            <p className="text-sm leading-relaxed">
              상품 선택은 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>,
              세금은 <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>미국주식 세금</Link>,
              입문 전체는 <Link href="/learn/us-stock-basics" style={{ color: "var(--mint)" }}>미국주식 입문</Link>을 이어서 읽으세요.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. DCA는 수익을 보장하지 않으며 원금 손실이 가능합니다.
          </div>
        </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/etf" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📦</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>미국 ETF 완전 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>SPY·VOO·QQQ 고르는 법</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/us-stock-tax" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🧾</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>미국주식 세금·계좌 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>양도세·배당 원천징수 개념</p>
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
