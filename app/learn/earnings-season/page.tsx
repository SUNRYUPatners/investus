import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "실적 시즌 읽는 법 — 완전 초보 가이드 (EPS·컨센서스·가이던스) | 인베스트어스",
  description:
    "어닝 시즌이 무엇인지, EPS·매출·컨센서스·가이던스를 초보 눈높이로 설명하고, 비트해도 주가가 빠지는 이유와 발표 전후 체크리스트를 정리합니다.",
  keywords: ["실적 시즌", "어닝", "EPS", "컨센서스", "가이던스", "실적 발표"],
  alternates: { canonical: "https://www.investus.kr/learn/earnings-season" },
  openGraph: {
    title: "실적 시즌 초보 가이드 | 인베스트어스",
    description: "EPS·컨센서스·가이던스와 발표 전후 행동 규칙",
    url: "https://www.investus.kr/learn/earnings-season",
    type: "article",
  },
};

export default function EarningsSeasonPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(192,132,252,0.15)", color: "#c084fc" }}>시장</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 22분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            실적 시즌 읽는 법 — 완전 초보 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            분기마다 미국 상장사가 &ldquo;이번 3개월 성적표&rdquo;를 공개합니다. 숫자 한 줄보다
            <em> 예상을 이겼는지</em>, <em>앞으로 전망이 어떤지</em>가 주가를 흔드는 경우가 많습니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>실적 시즌이란?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>실적 시즌(earnings season)</strong>은 많은 회사가 비슷한 시기에
              분기 실적(매출·이익 등)을 발표하는 기간입니다. 보통 1·4·7·10월 전후에 몰립니다.
            </p>
            <p className="text-sm leading-relaxed">
              왜 중요할까요? 애플·엔비디아·마이크로소프트 같은 대형주가 같은 주에 발표하면
              <Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}> 나스닥</Link>·<Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link> 지수 전체가 출렁일 수 있습니다.
              ETF만 사도 &ldquo;남의 실적&rdquo;이 내 계좌에 영향을 줍니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>꼭 알 단어: EPS·매출·컨센서스</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>매출(revenue)</strong> — 회사가 판 금액의 합. &ldquo;장사가 얼마나 됐나&rdquo;.</li>
              <li><strong style={{ color: "var(--text)" }}>EPS (주당순이익)</strong> — 순이익을 주식 수로 나눈 값. &ldquo;주식 한 주당 이익이 얼마인가&rdquo;에 가깝습니다.</li>
              <li><strong style={{ color: "var(--text)" }}>컨센서스</strong> — 애널리스트들이 미리 맞춰 둔 예상치의 평균(또는 중간값). &ldquo;시장이 기대하던 숫자&rdquo;.</li>
              <li><strong style={{ color: "var(--text)" }}>비트(beat)</strong> — 실제 숫자 &gt; 컨센서스. <strong style={{ color: "var(--text)" }}>미스(miss)</strong> — 실제 &lt; 컨센서스.</li>
            </ul>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed mt-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>숫자 예시 (가상의 회사)</p>
              <p>컨센서스 EPS $1.00 → 실제 $1.05면 &ldquo;비트&rdquo;입니다.</p>
              <p>그런데 경영진이 &ldquo;다음 분기는 $0.80 수준일 것&rdquo;이라고 하면, 비트해도 주가가 빠질 수 있습니다. 시장은 이미 지난 분기를 어느 정도 가격에 반영해 두고, <em>앞으로</em>를 더 보기 때문입니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>가이던스가 더 중요할 때가 많다</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>가이던스(guidance)</strong>는 회사가 스스로 말하는 &ldquo;앞으로의 전망&rdquo;(다음 분기·연간 매출·이익 범위 등)입니다.
              헤드라인에 &ldquo;실적 서프라이즈&rdquo;만 보고 사면 가이던스 약화로 바로 물릴 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              읽을 때 우선순위 예시: (1) 가이던스·수요·마진 코멘트 (2) EPS·매출 vs 컨센서스 (3) 자사주 매입·배당·부채 변화.
              재무제표로 숫자가 스토리와 맞는지 보려면 <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표 가이드</Link>,
              비싸 보이는지는 <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER·밸류</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>발표는 장중? 장후?</h2>
            <p className="text-sm leading-relaxed mb-3">
              많은 미국 기업은 정규장 마감 후(애프터마켓)나 개장 전(프리마켓)에 실적을 냅니다.
              이때는 거래량이 적고 호가가 벌어져, 같은 뉴스에도 가격이 과하게 튈 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              한국 시간으로는 새벽인 경우가 많습니다. &ldquo;잠결에 헤드라인만 보고 전량 매도&rdquo;는
              <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}> 심리 실수</Link>의 전형입니다.
              장전 온도: <Link href="/learn/futures" style={{ color: "var(--mint)" }}>선물·프리마켓</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>비트했는데 왜 떨어지나요?</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>가이던스가 약함 / 수요·마진 우려</li>
              <li>이미 &ldquo;비트할 것&rdquo;을 가정하고 주가가 올라 있었음 (기대가 선반영)</li>
              <li>같은 날 매크로(금리·CPI)가 더 큰 악재</li>
              <li>섹터 전체 분위기 (<Link href="/learn/sectors" style={{ color: "var(--mint)" }}>섹터</Link>)</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              반대로 미스여도 &ldquo;최악은 지났다&rdquo;는 가이던스면 반등하는 경우도 있습니다.
              <strong style={{ color: "var(--text)" }}>헤드라인 ≠ 매수/매도 신호</strong>로 기억하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>ETF 투자자는 어떻게?</h2>
            <p className="text-sm leading-relaxed mb-3">
              VOO·QQQ 같은 지수 ETF를 적립 중이라면, 개별 실적 하나에 적립을 끊을 필요는 거의 없습니다.
              수백 개 회사가 섞여 있고, 장기 수익률은 한 분기 서프라이즈보다
              <Link href="/learn/compound" style={{ color: "var(--mint)" }}> 시간·복리</Link>·<Link href="/learn/dca" style={{ color: "var(--mint)" }}>규칙적 적립</Link>에 더 가깝습니다.
            </p>
            <p className="text-sm leading-relaxed">
              개별 종목이 &ldquo;위성&rdquo;이라면: 발표 전후로 비중 상한·손절 규칙을 미리 적어 두고,
              발표 직후 충동 매매만 막으세요. 매수 전 점검은 <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>체크리스트</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>발표 전후 체크리스트</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>이 종목은 코어인가 위성인가? 비중 상한은?</li>
              <li>EPS·매출 vs 컨센서스 (비트/미스만으로 결론 내리지 않기)</li>
              <li>가이던스·마진·수요·경쟁 코멘트</li>
              <li>자사주·배당·부채·현금흐름 변화</li>
              <li>같은 업종 피어와 비교</li>
              <li>본인 투자 기간(3개월 vs 5년)과 맞는지</li>
              <li>-20% / +30% 때 할 행동을 미리 적었는지</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["‘비트 = 상승’만 암기", "가이던스·밸류·선반영을 무시하면 물립니다."],
                ["애프터마켓에서 올인·전량 청산", "유동성이 낮아 체결가가 불리할 수 있습니다. 규칙을 낮에 정하세요."],
                ["코어 ETF 적립을 실적 주에 중단", "지수 투자의 의미를 스스로 없앱니다."],
                ["옵션으로 ‘실적 한 방’", "변동성이 비싸게 반영된 경우가 많습니다. 옵션은 별도 고위험 영역입니다."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-3">
              옵션: <Link href="/learn/options" style={{ color: "var(--mint)" }}>옵션 기초</Link> (교육용·고위험 안내).
              차트만 보고 판단하지 않기: <Link href="/learn/technical-analysis" style={{ color: "var(--mint)" }}>기술적 분석</Link>은 보조.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 할 일</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>보유 종목(또는 관심 종목) 다음 실적 예정일을 메모.</li>
              <li><Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link>에서 매출·이익·현금흐름이 어디에 있는지 한 번만 찾아보기.</li>
              <li>위성 종목이면 &ldquo;발표 전후 24시간은 신규 매수 금지&rdquo; 같은 한 줄 규칙 적기.</li>
              <li>매크로 일정과 겹치는지 <Link href="/learn/economic-calendar" style={{ color: "var(--mint)" }}>경제 캘린더</Link>·<Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>금리 가이드</Link>로 확인.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>관련 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link>,
              <Link href="/learn/valuation" style={{ color: "var(--mint)" }}> 밸류에이션</Link>,
              <Link href="/learn/13f-guide" style={{ color: "var(--mint)" }}> 13F</Link>,
              <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}> 매수 체크리스트</Link>,
              <Link href="/learn/dividend" style={{ color: "var(--mint)" }}> 배당</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 실적 해석·매매 권유가 아니며 원금 손실이 가능합니다.
          </div>
        </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/financial-statements" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📋</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>재무제표 읽기</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>손익·재무·현금흐름</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/valuation" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🔢</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>PER·PBR 가치 평가</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>비싸 싼지 보는 법</p>
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
