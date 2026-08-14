import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "경제 캘린더 활용법 — CPI·FOMC·고용 | 인베스트어스",
  description:
    "경제 캘린더가 무엇인지, CPI·PCE·FOMC·비농업고용·GDP를 초보가 보는 법, 발표 전후 변동성 관리, 한국 시간대, Investus 활용. 예측기가 아닌 일정표로 쓰기.",
  alternates: { canonical: "https://www.investus.kr/learn/economic-calendar" },
};

export default function EconomicCalendarPage() {
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
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 24분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            경제 캘린더 활용법
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            경제 캘린더는 &ldquo;내일 주가가 오를지&rdquo;를 알려 주는 예언서가 아닙니다.
            <strong style={{ color: "var(--text)" }}>변동성이 커질 수 있는 날짜</strong>를 미리 적어 둔 일정표입니다.
            초보는 예측보다 <em>리스크 관리</em>에 쓰는 편이 맞습니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>경제 캘린더란?</h2>
            <p className="text-sm leading-relaxed mb-3">
              정부가 발표하는 물가·고용·성장 지표, 중앙은행(연준) 회의처럼
              시장이 크게 반응하는 일정을 날짜·시간별로 모아 둔 표입니다.
              각 항목에는 보통 <em>이전 값 · 시장 예상(컨센서스) · 실제 발표</em>가 붙습니다.
            </p>
            <p className="text-sm leading-relaxed">
              주가가 움직이는 이유 중 하나는 &ldquo;숫자 자체&rdquo;보다
              <strong style={{ color: "var(--text)" }}>예상과의 차이(서프라이즈)</strong>입니다.
              물가가 높더라도 &ldquo;예상보다 덜 높다&rdquo;면 시장이 안도할 수 있고, 그 반대도 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>왜 초보에게 중요한가</h2>
            <p className="text-sm leading-relaxed mb-3">
              발표 직후 수분~수시간은 호가가 넓어지고,{" "}
              <Link href="/learn/futures" style={{ color: "var(--mint)" }}>선물·프리마켓</Link>이 출렁입니다.
              레버리지·옵션·당일 단타를 들고 있으면 의도치 않은 손절·강제 청산을 맞기 쉽습니다.
            </p>
            <p className="text-sm leading-relaxed">
              장기{" "}
              <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립식</Link>·지수 ETF 투자자는
              일정을 &ldquo;알고 넘어가는&rdquo; 정도면 충분합니다.
              다만 <em>왜 오늘 뉴스가 시끄러운지</em>를 이해하면 공포에 전량 매도하는 실수를 줄일 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>꼭 알아둘 일정 (초보 우선순위)</h2>
            <div className="rounded-2xl p-4 border space-y-3 text-sm leading-relaxed mb-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p>
                <strong style={{ color: "var(--text)" }}>CPI / PCE</strong> — 소비자·개인소비 물가.
                인플레이션이 높은지 낮은지. 금리 기대를 흔듭니다. 자세한 흐름은{" "}
                <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>CPI·연준·금리 가이드</Link>.
              </p>
              <p>
                <strong style={{ color: "var(--text)" }}>FOMC</strong> — 미국 중앙은행(연준) 회의.
                기준금리 결정, 점도표(위원들의 금리 전망), 의장 기자회견이 함께 나옵니다.
              </p>
              <p>
                <strong style={{ color: "var(--text)" }}>비농업 고용·실업률</strong> — 일자리가 늘었는지.
                &ldquo;경기가 뜨거운지/식는지&rdquo; 신호로 금리·주식 모두에 영향.
              </p>
              <p>
                <strong style={{ color: "var(--text)" }}>GDP, PMI, 소매판매</strong> — 성장·기업 체감·소비.
                CPI·FOMC보다는 덜 자주 헤드라인이지만 추세 확인용.
              </p>
            </div>
            <p className="text-sm leading-relaxed">
              처음에는 빨간불(중요도 높음)만 체크해도 됩니다. 모든 지표를 외울 필요는 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>숫자 예시: &ldquo;예상보다&rdquo;가 핵심</h2>
            <p className="text-sm leading-relaxed mb-3">
              가상의 CPI 발표: 시장 예상 전년 대비 +3.0%, 실제 +3.3%.
              &ldquo;물가가 올랐다&rdquo;보다 &ldquo;예상보다 0.3%p 높다&rdquo;가 당일 금리·달러·성장주 반응을 만듭니다.
            </p>
            <p className="text-sm leading-relaxed">
              같은 날{" "}
              <Link href="/learn/bonds" style={{ color: "var(--mint)" }}>미국 10년물 금리</Link>가 급등하고
              나스닥이 약하면, &ldquo;금리가 부담&rdquo; 프레임으로 읽는 식입니다.
              반대로 숫자와 시장 반응이 어긋치면 첫 해석이 틀렸을 수 있으니 서두르지 마세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>발표 전에 할 일</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 mb-3">
              <li>레버리지 ETF·만기 임박 옵션 비중을 줄이거나 정리 검토</li>
              <li>당일 &ldquo;지표 방향 맞히기&rdquo; 데이트레이딩 자제</li>
              <li>코어{" "}
                <Link href="/learn/etf" style={{ color: "var(--mint)" }}>VOO·QQQ</Link> 장기 보유는
                일정을 이유로 전량 매도할 필요 없음 (계획이 없다면)</li>
              <li>
                <Link href="/learn/futures" style={{ color: "var(--mint)" }}>선물</Link>로 장전 온도만 확인
              </li>
            </ul>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>심리적 준비:</strong> 발표 직후 −1~2% 출렁임이
              &ldquo;내 인생 망함&rdquo;이 아니라 일정표에 있던 날임을 미리 인정하세요.{" "}
              <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>투자 심리</Link>가 여기서 작동합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>발표 직후에 할 일</h2>
            <p className="text-sm leading-relaxed mb-3">
              첫 15~30분은 알고리즘·헤지 주문이 교차하는 <em>노이즈</em> 구간인 경우가 많습니다.
              헤드라인만 보고 시장가 추격 매수·매도는 초보에게 특히 위험합니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              같이 볼 것: (1) 지표 vs 예상 (2) 금리·달러 반응 (3) 지수·섹터 반응.
              주식만 보면 &ldquo;왜&rdquo;가 빠집니다.
            </p>
            <p className="text-sm leading-relaxed">
              채권과 주식이 같은 방향으로 급하면 단순 &ldquo;리스크온/오프&rdquo; 프레임을 의심하세요.
              해석이 엇갈릴 때는 포지션을 키우지 않는 편이 낫습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>한국 시간으로 보기</h2>
            <p className="text-sm leading-relaxed mb-3">
              미국 오전(동부) 발표는 한국 저녁~심야인 경우가 많습니다.
              서머타임(일광절약시간)이 바뀌면 한 시간 밀립니다. 캘린더 앱의 &ldquo;한국 시간&rdquo; 표기를 믿으세요.
            </p>
            <p className="text-sm leading-relaxed">
              수면을 깨며 단타하는 것보다, 다음 날 Investus 리포트·홈 요약으로
              <em>정리된 맥락</em>을 보는 편이 장기 투자자에게 유리합니다.
              &ldquo;부지런함&rdquo;이 수익이 아니라는 점은{" "}
              <Link href="/learn/myths" style={{ color: "var(--mint)" }}>오해 TOP10</Link>과도 같습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
              <li>숫자만 보고 &ldquo;무조건 금리 인상 → 주식 폭락&rdquo;처럼 한 줄 공식화</li>
              <li>중요 지표 날 레버리지로 방향 베팅</li>
              <li>서프라이즈 직후 시장가로 추격</li>
              <li>장기 적립 계획을 하루 뉴스로 중단</li>
              <li>모든 지표를 다 챙기다가 정작 포트 규칙이 없음</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Investus에서</h2>
            <p className="text-sm leading-relaxed mb-3">
              홈·매크로 영역과 일일 리포트에서 그날의 CPI·FOMC·고용 이슈가 정리됩니다.
              캘린더로 &ldquo;오늘이 큰날인지&rdquo; 확인 → 리포트로 &ldquo;왜 움직였는지&rdquo; 복습 순서를 추천합니다.
            </p>
            <p className="text-sm leading-relaxed">
              공포·탐욕이 극단일 때는{" "}
              <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕지수</Link>도
              보조로만 보세요. 지표 발표와 겹치면 변동성이 이중으로 커질 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보용 미니 체크리스트</h2>
            <ol className="list-decimal pl-5 text-sm leading-relaxed space-y-2">
              <li>이번 주 빨간불 일정 3개만 표시했는가?</li>
              <li>레버리지·옵션 만기가 그 날짜와 겹치는가?</li>
              <li>발표 직후 1시간은 &ldquo;관찰만&rdquo;으로 정해 두었는가?</li>
              <li>장기 코어 매도 이유가 &ldquo;뉴스 공포&rdquo;뿐인가? (그렇다면 보류)</li>
            </ol>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 경제지표 트레이딩·방향 베팅을 권유하지 않습니다. 예시 숫자는 가상의 단순화입니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
