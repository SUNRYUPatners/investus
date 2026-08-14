import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "미국주식 투자 완전 입문 가이드 — 처음 시작하는 투자자를 위한 A to Z | 인베스트어스",
  description: "미국주식 투자를 처음 시작하는 분을 위한 완전 입문 가이드. 왜 미국주식인지, 어떻게 계좌를 개설하는지, 어떤 종목부터 시작해야 하는지, 투자 시 주의해야 할 점까지 단계별로 설명합니다.",
  keywords: ["미국주식 입문", "미국주식 시작", "미국주식 투자 방법", "해외주식 계좌", "미국주식 초보"],
  alternates: { canonical: "https://www.investus.kr/learn/us-stock-basics" },
  openGraph: {
    title: "미국주식 투자 완전 입문 가이드 | 인베스트어스",
    description: "미국주식 첫 투자를 위한 단계별 가이드 — 계좌 개설부터 종목 선택까지",
    url: "https://www.investus.kr/learn/us-stock-basics",
    type: "article",
  },
};

export default function UsStockBasicsPage() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-10">

        {/* Back */}
        <div className="pt-4 pb-2">
          <Link href="/learn" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-3.5 h-3.5" /> 투자 지식 허브
          </Link>
        </div>

        {/* Hero */}
        <div className="mb-6 pt-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>입문</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 18분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            미국주식 투자 완전 입문 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            처음 미국주식을 시작하는 투자자를 위한 A to Z 가이드입니다.
            왜 미국주식인지, 무엇부터 시작해야 하는지, 어떤 실수를 피해야 하는지까지 단계별로 정리했습니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>

          {/* Section 1 */}
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              왜 미국주식인가
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              미국 주식시장은 전 세계 주식 시가총액의 약 42%를 차지하는 세계 최대의 자본 시장입니다.
              Apple, NVIDIA, Microsoft, Amazon, Alphabet(Google), Meta 등 세계를 이끄는 기업들이
              모두 미국 증시에 상장되어 있습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              한국 코스피의 시가총액이 약 2조 달러인 반면, 미국 S&P500 지수에 편입된 500개 기업의
              시가총액 합계만 해도 약 45조 달러에 달합니다. 규모 자체가 다릅니다.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>미국주식의 3가지 핵심 장점</p>
              <div className="flex flex-col gap-2">
                {[
                  ["🌐 시장 규모", "전 세계 최대 유동성 — 언제든 사고팔 수 있습니다"],
                  ["🏆 기업 품질", "Apple, NVIDIA, Microsoft 등 세계 최고 기업들"],
                  ["📊 투명한 공시", "SEC 규정으로 재무 정보가 완전 공개됩니다"],
                ].map(([t, d]) => (
                  <div key={t} className="flex gap-2 text-sm">
                    <span className="font-bold flex-shrink-0" style={{ color: "var(--text)", minWidth: 100 }}>{t}</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              미국주식 거래 시간 — 한국과 다릅니다
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              미국 주식시장은 한국 시간(KST) 기준으로 밤에 열립니다.
              서머타임(3월~11월)에는 오후 10시 30분~새벽 5시,
              겨울(11월~3월)에는 오후 11시 30분~새벽 6시까지가 정규 거래 시간입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              장 전(프리마켓)과 장 후(애프터마켓) 거래도 가능하지만, 유동성이 낮아
              초보 투자자에게는 정규 시간 내 거래를 권장합니다.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "rgba(var(--mint-rgb),0.04)", borderColor: "rgba(var(--mint-rgb),0.2)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--mint)" }}>
                💡 Investus 활용 팁
              </p>
              <p className="text-sm">
                Investus 홈 화면에서 주요 지수와 선물 시세를 실시간으로 확인할 수 있습니다.
                아침에 일어나서 <Link href="/" style={{ color: "var(--mint)" }}>홈 탭</Link>의
                FUTURES MAP을 확인하면 미국 장이 어땠는지 바로 파악됩니다.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              첫 번째 종목 선택 — 무엇부터 살까
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              미국주식 투자를 처음 시작할 때 가장 많이 하는 실수는 &ldquo;좋은 주식 하나만 알려달라&rdquo;는
              마음으로 접근하는 것입니다. 하지만 개별 종목 투자 전에 시장 전체를 이해하는 것이 먼저입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              초보 투자자에게 가장 추천하는 첫 번째 투자 대상은 <strong style={{ color: "var(--text)" }}>S&P500 지수 추종 ETF</strong>입니다.
              SPY, VOO, IVV 같은 ETF 하나로 미국 대형주 500개에 분산 투자할 수 있습니다.
              개별 종목 리스크 없이 미국 경제 성장에 참여하는 가장 안전한 방법입니다.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>추천 첫 투자 순서</p>
              <div className="flex flex-col gap-2">
                {[
                  ["1단계", "S&P500 ETF (SPY/VOO) — 시장 전체에 분산 투자"],
                  ["2단계", "메가캡 개별주 — Apple, Microsoft, NVIDIA 등"],
                  ["3단계", "성장주 — 본인이 잘 아는 산업의 리더 기업"],
                  ["4단계", "소형/성장주 — 충분한 학습 후 도전"],
                ].map(([step, desc]) => (
                  <div key={step} className="flex gap-3 text-sm items-start">
                    <span className="font-bold flex-shrink-0 px-2 py-0.5 rounded text-[10px]"
                      style={{ background: "rgba(var(--mint-rgb),0.1)", color: "var(--mint)" }}>
                      {step}
                    </span>
                    <span className="leading-snug">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              환율 리스크 이해하기
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              미국주식은 달러로 거래됩니다. 주가가 올랐더라도 원/달러 환율이 하락하면
              원화 기준 수익률이 줄어들 수 있습니다. 반대로 달러가 강세일 때는 보너스 수익이 생깁니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              장기 투자 관점에서 미국 달러는 세계 기축통화로서 장기적으로 상대적 강세를
              유지해왔습니다. 단기 환율 변동에 일희일비하지 않는 것이 중요합니다.
            </p>
            <p className="text-sm leading-relaxed">
              Investus <Link href="/" style={{ color: "var(--mint)" }}>홈 화면</Link>에서
              원달러 환율(USD/KRW)을 실시간으로 확인할 수 있습니다.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              초보 투자자가 피해야 할 5가지 실수
            </h2>
            <div className="flex flex-col gap-3">
              {[
                ["① 테마·단기 급등주 추종", "SNS나 유튜브에서 떠도는 &ldquo;지금 당장 사야 하는 주식&rdquo;은 대부분 이미 오를 만큼 오른 상태입니다. 이런 흐름을 쫓는 것을 FOMO(놓칠까 봐 두려운 심리) 투자라고 합니다."],
                ["② 분산 없이 한 종목에 몰빵", "아무리 좋아 보이는 주식도 개별 종목은 예상치 못한 리스크가 있습니다. 포트폴리오의 20% 이상을 한 종목에 넣는 것은 초보 투자자에게 위험합니다."],
                ["③ 손절 원칙 없이 버티기", "주가가 -30%, -50% 떨어져도 &ldquo;언젠가는 오르겠지&rdquo;라는 생각으로 버티다가 원금 대비 훨씬 큰 손실을 보는 경우가 많습니다. 투자 전 손절 기준을 정해두세요."],
                ["④ 레버리지 ETF로 시작", "TQQQ, SOXL 같은 3배 레버리지 ETF는 오를 때 3배 오르지만 내릴 때도 3배 내립니다. 변동성 감쇠(Volatility Decay) 효과로 장기 보유 시 수익률이 극도로 나빠집니다."],
                ["⑤ 뉴스만 보고 즉각 매매", "뉴스는 이미 시장이 반영한 정보입니다. 호재 뉴스에 사고 악재 뉴스에 파는 행동은 대부분 &ldquo;고점 매수, 저점 매도&rdquo;로 이어집니다."],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1.5" style={{ color: "var(--text)" }}
                    dangerouslySetInnerHTML={{ __html: title }} />
                  <p className="text-[12px] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: desc }} />
                </div>
              ))}
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              성공하는 미국주식 투자자의 3가지 습관
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              장기적으로 미국주식에서 좋은 성과를 내는 투자자들에게는 공통점이 있습니다.
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: "매일 시장을 모니터링하되, 매일 매매하지 않는다",
                  desc: "시장 흐름을 파악하는 것과 매일 사고파는 것은 다릅니다. 좋은 투자자는 매일 시장을 확인하지만 매매 빈도는 낮습니다.",
                  color: "#10b981",
                },
                {
                  title: "기업의 본질 가치를 이해하고 투자한다",
                  desc: "주가는 단기적으로 감정에 따라 움직이지만, 장기적으로는 기업의 실적과 성장성에 수렴합니다. 내가 투자하는 기업이 어떻게 돈을 버는지 반드시 이해하고 있어야 합니다.",
                  color: "#60a5fa",
                },
                {
                  title: "공포가 극에 달했을 때 오히려 사들인다",
                  desc: '워런 버핏은 "남들이 탐욕스러울 때 두려워하고, 남들이 두려워할 때 탐욕스러워라"고 했습니다. 시장이 패닉일 때가 좋은 기업을 싸게 살 기회입니다.',
                  color: "#d4af37",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)", borderLeft: `3px solid ${item.color}` }}>
                  <p className="text-sm font-bold mb-1.5" style={{ color: "var(--text)" }}>{item.title}</p>
                  <p className="text-[12px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              한국에서 미국주식 계좌 여는 법
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              국내 증권사 앱에서 &ldquo;해외주식&rdquo; 또는 &ldquo;미국주식&rdquo; 서비스를 신청하면 됩니다.
              별도의 미국 증권사 계좌가 꼭 필요한 것은 아닙니다. 대부분 기존 국내 계좌에 해외주식 거래 권한을
              추가하는 방식입니다. 신분증 확인, 투자자 성향 설문, 환전(원화→달러) 약관 동의가 일반적입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              수수료는 증권사마다 다릅니다. 매매 수수료(보통 0.07%~0.25%대), 환전 스프레드, 최소 환전 단위를
              비교하세요. &ldquo;수수료 0원&rdquo; 이벤트는 기간·한도가 있는 경우가 많아 이벤트 종료 후 조건을 다시 확인해야 합니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              소수점 거래(1주 미만)를 지원하는 증권사도 있습니다. 고가 종목(예: 메가캡)을 소액으로 시작할 때 유용하지만,
              의결권·배당 처리 방식이 1주 단위와 다를 수 있으니 약관을 읽으세요.
            </p>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>계좌 개설 체크리스트</p>
              <ul className="text-sm leading-relaxed list-disc pl-5 space-y-1">
                <li>해외주식 거래 신청 완료 여부</li>
                <li>달러 환전 한도·우대 환율 조건</li>
                <li>정규장 / 프리·애프터 마켓 가능 여부</li>
                <li>양도소득 신고를 증권사가 어떻게 안내하는지</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              세금 — 한국 거주자가 꼭 알아야 할 것
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              미국주식 매매 차익은 국내에서 <strong style={{ color: "var(--text)" }}>양도소득세</strong> 대상입니다.
              연간 기본공제(일반적으로 250만 원)를 넘는 순이익에 대해 세율이 적용됩니다.
              세율·신고 기한은 세법 개정에 따라 달라질 수 있으니, 실제 신고 전에는 국세청 안내 또는 세무사 확인이 안전합니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              배당금은 미국에서 원천징수(일반적으로 15%, 한·미 조세조약)된 뒤 국내 계좌로 입금되는 경우가 많습니다.
              국내에서 금융소득종합과세 대상이 될 수 있으므로, 배당 비중이 큰 포트폴리오는 연간 금융소득 합계를 따로 적어 두는 것이 좋습니다.
            </p>
            <p className="text-sm leading-relaxed">
              Investus는 세무 대행을 하지 않습니다. 이 단락은 개념 안내이며, 개별 세액 계산·절세 설계는 전문가와 상의하세요.
              더 긴 정리는 <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>미국주식 세금·계좌 가이드</Link>를 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              적립식(DCA)으로 시작하는 방법
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              한 번에 목돈을 넣기 부담스럽다면, 매달 같은 날 같은 금액으로 S&amp;P500 ETF를 사는
              달러코스트애버리징(DCA)이 입문에 잘 맞습니다. 고점에 전액을 넣는 실수를 줄이고,
              환율·시세 변동을 시간에 분산합니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              예시: 매달 30만 원을 VOO 또는 SPY에 12개월 적립. 어떤 달은 주가가 높아 수량이 적고,
              어떤 달은 낮아 수량이 많아집니다. 평균 단가는 한 번에 산 경우보다 완만해지는 경우가 많습니다.
              (항상 더 높은 수익을 보장하지는 않습니다. 강한 일방 상승장에서는 일시 목돈 투자가 유리할 수도 있습니다.)
            </p>
            <p className="text-sm leading-relaxed">
              자세한 원리와 주의점은 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립식 투자 가이드</Link>에서 다룹니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              Investus로 매일 5분 루틴 만들기
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>
                <Link href="/" style={{ color: "var(--mint)" }}>홈</Link>에서 선물·지수·환율·공포탐욕·버핏지수를 훑습니다.
                &ldquo;오늘 살지 말지&rdquo;보다 &ldquo;시장 온도가 어떤지&rdquo;를 먼저 봅니다.
              </li>
              <li>
                <Link href="/insight" style={{ color: "var(--mint)" }}>인사이트</Link>에서 당일 리포트 핵심 문단만 읽습니다.
                매수/매도 한 줄에만 의존하지 마세요.
              </li>
              <li>
                관심 종목이 있으면 <Link href="/search" style={{ color: "var(--mint)" }}>검색</Link>으로 차트·뉴스를 확인한 뒤,
                <Link href="/portfolio" style={{ color: "var(--mint)" }}>자산</Link>에 비중을 기록합니다.
              </li>
            </ol>
          </section>

          {/* Disclaimer */}
          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 이 글은 교육 목적의 투자 정보로, 특정 종목의 매수·매도 권유가 아닙니다.
            투자 결과에 대한 책임은 투자자 본인에게 있으며, 모든 투자는 원금 손실의 위험이 있습니다.
          </div>
        </LearnArticleWithAds>
        </article>

        {/* Next articles */}
        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/sp500" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📈</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>S&P500 완전 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>미국 경제의 온도계를 읽는 법</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/etf" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📦</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>미국 ETF 완전 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>SPY·VOO·QQQ 고르는 법</p>
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
