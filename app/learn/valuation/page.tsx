import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "PER·PBR·기업 가치 평가 — 초보도 이해하는 밸류에이션 | 인베스트어스",
  description:
    "PER, PBR, EV/EBITDA가 무엇인지 숫자 예시로 설명합니다. 비싸거나 싼지 판단하는 비교 도구와 흔한 함정까지.",
  keywords: ["PER", "PBR", "밸류에이션", "EV/EBITDA", "PEG", "주가수익비율"],
  alternates: { canonical: "https://www.investus.kr/learn/valuation" },
  openGraph: {
    title: "PER·PBR·기업 가치 평가 | 인베스트어스",
    description: "주식이 비싼지 싼지 — 비교 도구로 읽는 법",
    url: "https://www.investus.kr/learn/valuation",
    type: "article",
  },
};

export default function ValuationPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(192,132,252,0.15)", color: "#c084fc" }}>분석</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 22분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            PER·PBR·기업 가치 평가
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            &ldquo;이 주식이 비싼가, 싼가?&rdquo;를 숫자로 비교하려는 도구가 밸류에이션입니다.
            PER 10이면 무조건 싸다는 말은 없습니다. 업종·성장률·금리·부채를 같이 봐야 합니다.
            지표는 <strong style={{ color: "var(--text)" }}>비교용 자</strong>이지, 매수 버튼이 아닙니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>밸류에이션이란</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>밸류에이션(Valuation)</strong>은
              기업(또는 주식)의 &ldquo;값어치&rdquo;를 추정·비교하는 일입니다.
              아파트 시세를 비슷한 동네 매물과 비교하듯, 주식도 이익·자산·현금흐름 대비
              주가가 어느 정도인지 봅니다.
            </p>
            <p className="text-sm leading-relaxed">
              분모(이익·자산)는 <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link>에서 나옵니다.
              시장 전체 고평가 논쟁은 <Link href="/learn/buffett-indicator" style={{ color: "var(--mint)" }}>버핏지수</Link>도 참고하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>PER — 이익의 몇 배를 주나</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>PER(주가수익비율, Price-to-Earnings)</strong> =
              주가 ÷ <strong style={{ color: "var(--text)" }}>EPS</strong>(주당순이익, 한 주당 얼마 벌었나).
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>숫자 예시</strong></p>
              <p>주가 $100, 지난 1년 EPS $5 → PER = 100 ÷ 5 = <strong style={{ color: "var(--text)" }}>20배</strong>.</p>
              <p>의미(단순화): &ldquo;지금 이익이 매년 그대로라면, 투자금을 회수하는 데 약 20년&rdquo;처럼
                거칠게 생각하기도 합니다. 실제로는 이익이 늘거나 줄고, 배당·자사주도 있어 정확하지 않습니다.</p>
              <p>같은 업종 A기업 PER 15, B기업 PER 30이면 B가 &ldquo;이익 대비 더 비싸다&rdquo;는 뜻입니다.
                다만 B가 빨리 성장한다면 시장이 프리미엄을 준 것일 수도 있습니다.</p>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed mt-3">
              <li>성장주(기술·바이오 등): PER 30~50도 &ldquo;성장 기대&rdquo;가 반영될 수 있음</li>
              <li>성숙·저성장 기업: PER 10~15대가 흔함</li>
              <li>적자 기업: EPS가 음수라 PER이 의미 없음 → 매출 배수(P/S) 등 다른 지표</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>PBR — 장부 자산의 몇 배인가</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>PBR(주가순자산비율, Price-to-Book)</strong> =
              주가 ÷ <strong style={{ color: "var(--text)" }}>BPS</strong>(주당순자산, 장부에 적힌 자산에서 부채를 뺀 몫을 주식 수로 나눈 값).
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>숫자 예시</strong> —
              주가 $50, BPS $25 → PBR = 2.
              &ldquo;장부 자산의 2배로 거래된다&rdquo;는 뜻입니다. PBR 1 미만이면 장부보다 싸게 거래된다는 뜻이지만,
              자산이 실제로는 가치가 없거나 사업이 쇠퇴 중일 수 있습니다. &ldquo;1 아래 = 무조건 싸다&rdquo;는 함정입니다.
            </p>
            <p className="text-sm leading-relaxed">
              은행·제조처럼 유형 자산이 큰 업종에서 자주 씁니다.
              소프트웨어·브랜드 기업은 장부에 안 잡히는 무형 가치가 커서 PBR만으로 판단하기 어렵습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>EV/EBITDA — 부채까지 넣은 비교</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>EV(Enterprise Value, 기업가치)</strong> ≈
              시가총액 + 순부채(대략). 주식뿐 아니라 빚까지 포함한 &ldquo;회사 전체 가격&rdquo;에 가깝습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>EBITDA</strong>는 이자·세금·감가상각 전 영업 이익에 가까운 숫자입니다.
              EV를 EBITDA로 나눈 값이 <strong style={{ color: "var(--text)" }}>EV/EBITDA</strong>입니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>왜 쓰나</strong> —
              A사는 빚이 거의 없고 B사는 빚이 많다면, PER만 보면 A·B가 비슷해 보여도
              EV 관점에서는 B가 더 비쌀 수 있습니다. M&amp;A·사모펀드에서 자주 쓰고,
              개인도 레버리지(빚)가 큰 종목을 볼 때 참고합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>PEG — 성장까지 대충 보정</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>PEG</strong> ≈ PER ÷ 예상 이익 성장률(%).
              예: PER 30, 예상 성장률 15% → PEG = 2.
              &ldquo;성장 대비 PER이 너무 높은가&rdquo;를 거칠게 보는 용도입니다. 성장률 추정이 틀리면 PEG도 틀립니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>PER·PBR을 같이 볼 때</h2>
            <div className="rounded-xl p-3 border space-y-2 text-[12px]" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>PER↑ PBR↑</strong> — 성장·기대가 많이 반영. 고평가 논쟁 구간일 수 있음</p>
              <p><strong style={{ color: "var(--text)" }}>PER↓ PBR↓</strong> — 싸 보이지만 실적 악화·쇠퇴 &ldquo;가치 함정&rdquo;일 수 있음</p>
              <p><strong style={{ color: "var(--text)" }}>PER↑ PBR 보통</strong> — 수익성은 좋으나 자산 대비 프리미엄</p>
              <p><strong style={{ color: "var(--text)" }}>금리↑</strong> — 같은 이익에도 할인율이 올라가 성장주 PER이 압박받기 쉬움 (<Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>금리 가이드</Link>)</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>실전 체크리스트 (초보용)</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>같은 <Link href="/learn/sectors" style={{ color: "var(--mint)" }}>섹터</Link> 3~5개 종목의 PER·PBR을 나란히 적기</li>
              <li>최근 4분기 EPS가 일회성(자산 매각 등) 없이 꾸준한지</li>
              <li>현금·부채 — EV 관점에서 빚이 너무 큰지</li>
              <li>성장률 대비 PER(PEG)이 터무니없는지 한 번만 sanity check</li>
              <li>싸다고 전 재산 — 비중은 <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오</Link>·<Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>체크리스트</Link>로</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["저PER만 모으기", "구조적으로 사업이 줄어드는 중일 수 있습니다. 가치 함정."],
                ["업종을 무시하고 비교", "은행 PER과 소프트웨어 PER을 직접 비교하면 거의 항상 오해합니다."],
                ["적자인데 PER로 판단", "분모가 음수면 지표가 깨집니다."],
                ["한 순간 숫자만 보고 매매", "실적 시즌·환율·금리와 함께 보세요."],
                ["지수 ETF까지 매일 PER로 타이밍", "코어 적립은 밸류보다 실행이 우선인 경우가 많습니다."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>가치투자와의 연결</h2>
            <p className="text-sm leading-relaxed mb-3">
              그레이엄·버핏식 사고는 &ldquo;내재가치보다 싸게&rdquo;입니다. PER·PBR은 그중 <em>일부</em>만 보여 줍니다.
              철학은 <Link href="/learn/value-investing" style={{ color: "var(--mint)" }}>가치투자·대가 가이드</Link>에서,
              차트 보조는 <Link href="/learn/technical-analysis" style={{ color: "var(--mint)" }}>기술적 분석</Link>에서 이어 읽으세요.
            </p>
            <p className="text-sm leading-relaxed">
              시장 전체가 비싸 보이는지는 <Link href="/learn/buffett-indicator" style={{ color: "var(--mint)" }}>버핏지수</Link>(시가총액/GDP)로
              큰 그림을 볼 수 있습니다. 개별 종목 PER과 혼동하지 마세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보가 오늘 할 실습</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>관심 종목 하나와 같은 섹터 경쟁사 둘의 PER·PBR을 표로 적기</li>
              <li>적자인지·일회성 이익이 있는지 <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>손익</Link>에서 확인</li>
              <li>&ldquo;싸다/비싸다&rdquo; 한 줄 결론을 쓰기 — 매수 버튼은 아직 누르지 않기</li>
              <li>코어 ETF 적립 규칙은 그대로 유지 (<Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link>)</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 읽을 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link> →
              <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>실적 시즌</Link> →
              <Link href="/learn/buffett-indicator" style={{ color: "var(--mint)" }}>버핏지수</Link> →
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 저PER·저PBR이 매수 신호가 아니며, 특정 종목 권유가 아닙니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
