import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "CPI·연준(FOMC)·금리 — 완전 초보 가이드 | 인베스트어스",
  description:
    "인플레이션(CPI·PCE), 연준과 FOMC, 기준금리가 주식·채권·환율에 미치는 영향을 완전 초보도 이해할 수 있게 정의·숫자 예시·실수·다음 단계로 정리합니다.",
  keywords: ["CPI", "연준", "FOMC", "기준금리", "인플레이션", "PCE", "매크로"],
  alternates: { canonical: "https://www.investus.kr/learn/macro-rates" },
  openGraph: {
    title: "CPI·연준·금리 초보 가이드 | 인베스트어스",
    description: "물가·금리 발표가 미국주식에 왜 중요한지, 초보 눈높이로",
    url: "https://www.investus.kr/learn/macro-rates",
    type: "article",
  },
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
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>매크로</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 22분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            CPI·연준(FOMC)·금리 — 완전 초보 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            &ldquo;왜 갑자기 나스닥이 빠졌지?&rdquo; — 답이 개별 회사 뉴스가 아니라 CPI 발표 30분 전에 있을 때가 많습니다.
            매크로는 점쟁이 게임이 아니라, <em>언제 변동성이 커지는지</em>를 아는 리스크 관리입니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>매크로가 뭔가요?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>매크로(거시경제)</strong>는 한 회사 실적이 아니라 나라·세계 전체의 물가·금리·고용·성장 같은 큰 그림을 말합니다.
              개별 주식의 &ldquo;날씨&rdquo;와 비교하면, 매크로는 &ldquo;계절&rdquo;에 가깝습니다.
            </p>
            <p className="text-sm leading-relaxed">
              초보에게 중요한 이유: S&amp;P500·나스닥 ETF만 사도 금리·물가 뉴스에 하루하루 출렁입니다.
              원인을 모르면 공포에 전량 매도하기 쉽습니다. 지수 기초는 <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>·<Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>나스닥</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>인플레이션이란?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>인플레이션</strong>은 물건·서비스 가격이 전반적으로 오르는 현상입니다.
              같은 1만 원으로 살 수 있는 양이 줄어듭니다. 반대로 가격이 전반적으로 내리는 것은 디플레이션입니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>숫자 감각</p>
              <p>연 인플레 3%면, 오늘 1,000만 원의 구매력이 대략 1년 뒤 &ldquo;970만 원 가치&rdquo;처럼 느껴질 수 있습니다(단순 감각용).</p>
              <p>예금 이자가 인플레보다 낮으면, 통장 잔고 숫자는 늘어도 &ldquo;살 수 있는 것&rdquo;은 줄 수 있습니다. 그래서 장기적으로 주식·실물 자산 이야기가 나옵니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>CPI vs Core CPI vs PCE</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>CPI (소비자물가지수)</strong> — 가계가 자주 사는 장바구니(식품·주거·교통 등) 가격의 변화. 뉴스에 가장 많이 나옵니다.</li>
              <li><strong style={{ color: "var(--text)" }}>Core CPI</strong> — 식품·에너지를 뺀 CPI. 들쭉날쭉한 항목을 빼서 &ldquo;흐름&rdquo;을 보려는 지표.</li>
              <li><strong style={{ color: "var(--text)" }}>PCE</strong> — 연준(미국 중앙은행)이 더 중시한다고 알려진 물가 지표. CPI와 방향이 잠깐 다를 수 있어 둘 다 봅니다.</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              발표 직후 선물·개별주가 크게 움직일 수 있습니다. 레버리지·올인 매매는 피하세요.
              일정은 <Link href="/learn/economic-calendar" style={{ color: "var(--mint)" }}>경제 캘린더</Link>, 장전 온도는 <Link href="/learn/futures" style={{ color: "var(--mint)" }}>선물·프리마켓</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>연준·FOMC·기준금리</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>연준(Fed)</strong>은 미국의 중앙은행입니다. 물가를 너무 안 올리고(인플레 억제), 일자리를 너무 안 잃게(고용) 균형을 잡으려 합니다.
              <strong style={{ color: "var(--text)" }}>FOMC</strong>는 연방공개시장위원회 — 기준금리 등을 정하는 회의체입니다. 보통 1년에 8번 정도 정례 회의가 있습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>기준금리</strong>를 올리면 시중 금리도 영향을 받아, 대출이 비싸지고 소비·투자가 식기 쉽습니다. 내리면 반대 방향의 기대를 줍니다.
              (실제 경로는 복잡하고, &ldquo;올리면 반드시 주가 하락&rdquo;은 아닙니다.)
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>금리 ↑ 때 자주 나오는 이야기</strong> — 성장주·고PER 압박, 부동산·리츠 부담, <Link href="/learn/bonds" style={{ color: "var(--mint)" }}>기존 채권 가격</Link> 하락 압력.</p>
              <p><strong style={{ color: "var(--text)" }}>금리 ↓ 때 자주 나오는 이야기</strong> — 성장주·테크에 우호적일 수 있음, 달러 약세 가능성(한국 투자자는 <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율</Link>도 함께).</p>
              <p><strong style={{ color: "var(--text)" }}>금융주</strong> — 금리·경기 회복 기대에 민감할 수 있음. <Link href="/learn/sectors" style={{ color: "var(--mint)" }}>섹터 가이드</Link>.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>시장이 &ldquo;예상보다&rdquo;에 반응하는 이유</h2>
            <p className="text-sm leading-relaxed mb-3">
              헤드라인이 &ldquo;CPI 3.0%&rdquo;여도, 시장이 이미 2.8%를 기대했다면 &ldquo;예상보다 뜨겁다&rdquo;로 받아들여 금리가 더 높을 것이라는 쪽으로 움직일 수 있습니다.
              반대로 숫자 자체는 높아도 예상을 밑돌면 안도 랠리가 나오기도 합니다.
            </p>
            <p className="text-sm leading-relaxed">
              초보가 할 일: 숫자를 맞히려고 하지 말고, <strong style={{ color: "var(--text)" }}>발표일에는 변동성이 커진다</strong>는 사실만 일정에 표시하세요.
              코어 ETF <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립</Link>은 유지하고, 당일 레버리지 단타는 규칙으로 금지하는 편이 안전합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>실적 시즌과의 차이</h2>
            <p className="text-sm leading-relaxed mb-3">
              CPI·FOMC는 <em>경제 전체</em> 뉴스이고, 실적 시즌은 <em>개별 회사</em>가 분기 성적표를 내는 기간입니다.
              둘 다 같은 주에 겹치면 지수가 더 출렁일 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              실적 읽기: <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>실적 시즌 가이드</Link> ·
              숫자 검증: <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link> ·
              비싸 싼지: <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER 가이드</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보용 발표 전후 체크</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>이번 주 CPI·고용·FOMC가 있는지 <Link href="/learn/economic-calendar" style={{ color: "var(--mint)" }}>캘린더</Link>로 확인.</li>
              <li>생활비·비상금을 건드리는 매매인지 점검 (<Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>매수 체크리스트</Link>).</li>
              <li>발표 직후 헤드라인만 보고 전량 매도/추격 매수 금지.</li>
              <li>포트폴리오 점검은 주 1회 이하로 — 매일 새로고침은 <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>심리 함정</Link>.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["매크로로 ‘내일 방향’을 맞히려고 함", "전문가도 자주 틀립니다. 목적은 예측이 아니라 변동성·일정 인지입니다."],
                ["한 번 발표로 포트폴리오 전면 교체", "코어/위성 규칙을 먼저 정하세요. 하루 뉴스에 전략이 바뀌면 전략이 아닙니다."],
                ["CPI 숫자만 보고 Core·PCE 무시", "흐름을 보려면 여러 지표를 같이 봅니다. 한 달 노이즈에 올인하지 마세요."],
                ["금리와 채권·주식 연결을 모름", "금리↑ → 기존 채권 가격↓ 관계를 모르면 ‘안전 자산’ 착각이 납니다."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Investus에서 보는 법</h2>
            <p className="text-sm leading-relaxed">
              홈의 매크로·인사이트 리포트로 &ldquo;이번 주 무엇이 큰지&rdquo; 맥락만 잡으세요.
              공포탐욕은 보조 지표입니다 — <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕 가이드</Link>.
              버핏지수는 고평가 맥락용 — <Link href="/learn/buffett-indicator" style={{ color: "var(--mint)" }}>버핏지수</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 할 일</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li><Link href="/learn/bonds" style={{ color: "var(--mint)" }}>채권과 금리</Link>를 읽고 가격·금리 역관계를 숫자로 한 번 더 확인.</li>
              <li>이번 달 경제 일정 2~3개를 캘린더에 표시.</li>
              <li>본인 규칙은 &ldquo;발표일에는 신규 레버리지 금지&rdquo;처럼 한 줄로 적기.</li>
              <li>장기 코어는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF</Link> + <Link href="/learn/compound" style={{ color: "var(--mint)" }}>복리</Link> 관점으로 유지.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>관련 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/bonds" style={{ color: "var(--mint)" }}>채권</Link>,
              <Link href="/learn/economic-calendar" style={{ color: "var(--mint)" }}> 경제 캘린더</Link>,
              <Link href="/learn/futures" style={{ color: "var(--mint)" }}> 선물</Link>,
              <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}> 실적 시즌</Link>,
              <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}> 환율</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 매크로 예측·단기 매매·투자 권유가 아니며 원금 손실이 가능합니다.
          </div>
        </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/bonds" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📜</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>채권과 금리</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>금리↑ → 채권 가격↓</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/economic-calendar" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🗓️</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>경제 캘린더 활용법</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>발표 전후 변동성 관리</p>
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
