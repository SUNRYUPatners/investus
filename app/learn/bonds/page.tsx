import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "채권과 금리 — 완전 초보 가이드 (10년물·역수익률·ETF) | 인베스트어스",
  description:
    "채권이 무엇인지, 금리와 가격이 왜 반대로 움직이는지, 미국 10년물·역수익률 곡선, AGG·TLT 등 ETF와 주식 포트폴리오에서의 역할을 숫자 예시로 설명합니다.",
  keywords: ["채권", "금리", "미국 10년물", "역수익률", "TLT", "AGG", "국채"],
  alternates: { canonical: "https://www.investus.kr/learn/bonds" },
  openGraph: {
    title: "채권과 금리 초보 가이드 | 인베스트어스",
    description: "채권·금리 역관계, 10년물, 역수익률, 대표 ETF를 완전 초보 눈높이로",
    url: "https://www.investus.kr/learn/bonds",
    type: "article",
  },
};

export default function BondsPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(148,163,184,0.15)", color: "#94a3b8" }}>매크로</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 22분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            채권과 금리 — 완전 초보 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            주식만 보면 시장의 절반을 놓칩니다. 채권은 &ldquo;나라·회사에 돈을 빌려주고 이자를 받는 영수증&rdquo;이고,
            금리는 그 영수증의 가격을 매일 흔듭니다. 용어부터 숫자 예시까지 하나씩 잡습니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>채권이란? (주식과 한 줄 비교)</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>채권(bond)</strong>은 국가나 기업이 &ldquo;돈을 빌릴게요. 만기까지 이자 주고, 마지막에 원금 갚을게요&rdquo;라고 발행하는 차용증입니다.
              <strong style={{ color: "var(--text)" }}>주식</strong>은 회사의 <em>소유권</em> 조각이고, 채권은 <em>빌려준 돈</em>입니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>주식</strong> — 회사가 잘되면 주가가 오를 수 있음. 망하면 주식이 0에 가까워질 수 있음. 이자가 보장되지 않음.</p>
              <p><strong style={{ color: "var(--text)" }}>채권</strong> — 약속한 이자(쿠폰)와 만기 원금 상환이 목표. 회사·국가가 망하면(신용 리스크) 못 받을 수 있음. 중간에 팔면 가격이 오르내릴 수 있음.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              왜 배우나요? 금리가 오르면 성장주·부동산·고평가 주식이 압박을 받고, 포트폴리오에 채권을 넣으면 주식만 100%일 때보다 흔들림을 줄이려는 목적이 있기 때문입니다.
              관련: <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>금리·연준 가이드</Link>, <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오 전략</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>꼭 알아둘 단어 5개</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>액면가</strong> — 만기에 돌려받기로 한 원금. 보통 $1,000 단위로 설명합니다.</li>
              <li><strong style={{ color: "var(--text)" }}>쿠폰(이자)</strong> — 매년(또는 반년) 받는 이자. 예: 액면 $1,000, 쿠폰 3% → 1년에 $30.</li>
              <li><strong style={{ color: "var(--text)" }}>만기</strong> — 원금을 갚는 날. 2년·10년·30년처럼 길이가 다릅니다.</li>
              <li><strong style={{ color: "var(--text)" }}>수익률(yield)</strong> — &ldquo;지금 시장 가격으로 사면 사실상 얼마의 이자를 받는 셈인가&rdquo;. 뉴스의 &ldquo;10년물 4.2%&rdquo;가 이것에 가깝습니다.</li>
              <li><strong style={{ color: "var(--text)" }}>듀레이션</strong> — 금리가 움직일 때 가격이 얼마나 민감한지. 만기가 길수록 보통 더 민감합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>핵심: 금리 오르면 채권 가격은 내려간다</h2>
            <p className="text-sm leading-relaxed mb-3">
              새 채권이 더 높은 이자를 주면, 예전에 산 &ldquo;이자 낮은 채권&rdquo;은 시장에서 싸게 팔려야 사람들이 삽니다.
              반대로 금리가 내리면 예전 고이자 채권이 더 비싸집니다. <strong style={{ color: "var(--text)" }}>금리 ↑ → 기존 채권 가격 ↓</strong> (반대도 성립).
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>숫자로 느끼는 예시 (개념용)</p>
              <p>당신이 쿠폰 2%짜리 국채를 $1,000에 샀습니다. 1년에 $20을 받습니다.</p>
              <p>다음 해 새로 나오는 비슷한 국채가 쿠폰 4%면, 사람들은 $40을 주는 새 채권을 원합니다.</p>
              <p>당신이 중간에 팔려면 가격을 내려야 합니다. 대략 &ldquo;이자를 맞춰 주는 수준&rdquo;까지 가격이 조정됩니다. (실제 계산은 만기·쿠폰·시장 금리로 더 복잡합니다.)</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              2022~2023년처럼 금리가 빠르게 오르면 장기 국채 ETF(예: TLT)도 크게 빠질 수 있습니다.
              &ldquo;채권 = 무조건 안전&rdquo;만 믿으면 위험한 이유입니다. 안전에 가까운 것은 <em>만기까지 보유하는 우량 국채의 원리금 약속</em>이지, 중간에 팔 때의 가격 안정이 아닙니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>미국 10년물 국채 수익률이 중요한 이유</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>미국 10년물(10-year Treasury yield)</strong>은 &ldquo;세계에서 가장 안전한 편인 미국에 10년 빌려주면 대략 몇 %를 받나&rdquo;를 나타냅니다.
              주식·부동산·회사채를 평가할 때 &ldquo;무위험(에 가까운) 기준 금리&rdquo;로 자주 씁니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              10년물이 오르면: 미래 이익을 오늘 가치로 환산할 때 쓰는 <em>할인율</em>이 커져, 특히 먼 미래 이익에 의존하는 성장주가 압박받기 쉽습니다.
              밸류에이션 개념은 <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER·가치 평가 가이드</Link>에서 이어집니다.
            </p>
            <p className="text-sm leading-relaxed">
              Investus 홈 매크로와 <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>CPI·연준 가이드</Link>를 함께 보면 &ldquo;왜 오늘 테크가 빠졌는지&rdquo;의 배경이 잡힙니다.
              다만 하루 금리 움직임만으로 전량 매도하지 마세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>수익률 곡선·역수익률이란?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>수익률 곡선</strong>은 만기별로 &ldquo;빌려주면 몇 %&rdquo;를 점으로 이은 선입니다.
              보통은 긴 만기일수록 이자가 조금 더 높습니다(장기 리스크 보상).
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>역수익률(inversion)</strong>은 예를 들어 2년물 이자가 10년물보다 <em>더 높을</em> 때입니다.
              시장이 &ldquo;가까운 미래 금리·경기 불안&rdquo;을 크게 보고 있다는 신호로 자주 언급되고, 과거에는 경기침체 전후에 나타난 적이 많습니다.
            </p>
            <p className="text-sm leading-relaxed">
              하지만 <em>언제</em> 침체가 오는지, <em>주가가 언제</em> 빠지는지는 타이밍이 불확실합니다.
              역전만 보고 전량 현금화하는 것은 <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>공포 반응</Link>에 가깝습니다. 신호로 기록하되, 본인 규칙(비중·적립)을 먼저 지키세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보가 접하기 쉬운 채권 ETF</h2>
            <p className="text-sm leading-relaxed mb-3">
              개별 채권을 직접 사지 않고도, ETF로 여러 채권을 묶어 살 수 있습니다. ETF 기초는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>AGG / BND</strong> — 미국 종합 채권. &ldquo;채권 바구니&rdquo;에 가깝고, 입문 비중용으로 자주 언급됩니다.</li>
              <li><strong style={{ color: "var(--text)" }}>SHY / VGSH</strong> — 단기 국채 쪽. 금리 변동에 상대적으로 덜 민감(가격 흔들림이 작은 편).</li>
              <li><strong style={{ color: "var(--text)" }}>TLT</strong> — 만기 매우 긴 국채. 금리 인하 기대 시 크게 오를 수도, 금리 상승 시 크게 빠질 수도 있음. 초보 &ldquo;안전 자산&rdquo;으로만 쓰기 위험.</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              부동산 관련 배당 상품은 채권과 다릅니다. <Link href="/learn/reits" style={{ color: "var(--mint)" }}>REITs 가이드</Link>를 따로 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>포트폴리오에서 채권의 역할 (숫자 감각)</h2>
            <p className="text-sm leading-relaxed mb-3">
              흔히 말하는 &ldquo;주식 60 / 채권 40&rdquo;은 마법이 아니라 <em>흔들림과 기대수익의 타협</em> 예시입니다.
              나이·목표·비상금에 따라 다릅니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>예시 A</strong> — 투자 가능 자금 1,000만 원. 주식(S&amp;P500 ETF) 700만 + 종합채권 ETF 300만. 주식만 있을 때보다 큰 폭 하락 시 계좌 전체 낙폭이 작아질 <em>가능성이</em> 있습니다.</p>
              <p><strong style={{ color: "var(--text)" }}>예시 B</strong> — 3년 안에 쓸 학자금은 장기 채권·주식보다 예금·단기 상품에 가깝게. &ldquo;투자&rdquo;와 &ldquo;곧 쓸 돈&rdquo;을 섞지 마세요.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              리밸런싱(비중 맞추기)은 <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오 분산·리밸런싱</Link>에서 다룹니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["채권 = 원금 보장이라고 착각", "만기 전 매도·금리 급등·회사채 부도 시 손실 가능. ETF는 매일 가격이 움직입니다."],
                ["TLT만 사면 ‘방어’라고 생각", "장기채는 금리 민감도가 큽니다. 방어가 목적이면 단기·종합 비중을 먼저 이해하세요."],
                ["금리 뉴스만 보고 전량 매매", "하루 발표로 포트폴리오를 뒤집으면 매크로가 아니라 단타입니다. 경제 캘린더는 참고용."],
                ["한국 세금·환율 무시", "미국 채권 ETF도 해외주식과 비슷한 세금·환율 이슈가 있습니다. 세금 가이드를 확인하세요."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-3">
              세금: <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>미국주식 세금</Link> · 환율: <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율과 미국주식</Link> · 발표 일정: <Link href="/learn/economic-calendar" style={{ color: "var(--mint)" }}>경제 캘린더</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 할 일</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Investus 홈에서 미국 10년물·금리 관련 지표가 어디에 있는지 한 번만 찾아보세요.</li>
              <li><Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>CPI·연준 가이드</Link>를 읽고 &ldquo;금리가 왜 움직이는지&rdquo;를 연결하세요.</li>
              <li>본인 계좌에 채권·현금 비중이 몇 %인지 적어 보세요. 0%여도 &ldquo;의도한 0%&rdquo;인지 확인합니다.</li>
              <li>코어는 <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>·<Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립(DCA)</Link>으로 두고, 채권은 완충용인지 스펙용인지 한 문장으로 정하세요.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>관련 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>금리·연준</Link>,
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}> ETF</Link>,
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}> 포트폴리오</Link>,
              <Link href="/learn/commodities" style={{ color: "var(--mint)" }}> 원자재</Link>,
              <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}> 공포탐욕</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 채권·채권 ETF도 원금 변동·신용·금리 리스크가 있으며 투자·세무 자문이 아닙니다.
          </div>
        </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/macro-rates" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🏛️</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>CPI·연준·금리 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>금리가 왜 오르내리는지</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/portfolio-strategy" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">💼</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>포트폴리오 분산·리밸런싱</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>주식·채권 비중 잡기</p>
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
