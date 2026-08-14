import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "가치투자·대가 전략 입문 — 버핏·그레이엄·보글을 초보도 | 인베스트어스",
  description:
    "가치투자가 무엇인지, 안전마진·해자·인덱스·올웨더를 완전 초보 눈높이로. 버핏·그레이엄·린치·보글·달리오·막스 핵심과 한국 투자자 적용.",
  keywords: ["가치투자", "워런 버핏", "벤저민 그레이엄", "존 보글", "안전마진", "경제적 해자"],
  alternates: { canonical: "https://www.investus.kr/learn/value-investing" },
  openGraph: {
    title: "가치투자·대가 전략 가이드 | 인베스트어스",
    description: "원칙을 배우는 일 — 종목 복제가 아님",
    url: "https://www.investus.kr/learn/value-investing",
    type: "article",
  },
};

export default function ValueInvestingPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(212,175,55,0.15)", color: "#d4af37" }}>철학</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 24분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            가치투자·대가 전략 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            &ldquo;버핏이 산 종목을 따라 사자&rdquo;가 가치투자가 아닙니다.
            시장이 흔들릴 때 버티는 <em>원칙</em>을 배우는 일입니다.
            아래는 완전 초보도 따라올 수 있게, 각 대가의 핵심만 풀어 쓴 교육용 정리입니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>가치투자란 — 한 줄 + 비유</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>가치투자</strong>는
              &ldquo;회사가 실제로 만들 수 있는 가치(내재가치)보다 <em>싸게</em> 사서,
              시장이 알아줄 때까지 기다린다&rdquo;는 생각에 가깝습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              비유: 중고로 100만 원짜리 노트북을 60만 원에 사는 것.
              다만 주식에서는 &ldquo;진짜 값&rdquo;이 확실하지 않아, 할인폭을 넉넉히 두는
              <strong style={{ color: "var(--text)" }}>안전마진</strong>이 중요해집니다.
            </p>
            <p className="text-sm leading-relaxed">
              숫자 도구는 <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER·PBR</Link>,
              회사 체력은 <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link>입니다.
              차트만으로 가치를 재지는 않습니다 (<Link href="/learn/technical-analysis" style={{ color: "var(--mint)" }}>기술적 분석</Link>은 보조).
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>왜 초보에게 철학이 필요한가</h2>
            <p className="text-sm leading-relaxed mb-3">
              상승장에서는 아무 전략이나 잘 보입니다. 하락장에서
              &ldquo;왜 이 투자를 하는지&rdquo;가 없으면 바닥에서 팔고, 꼭지에서 다시 사는 패턴이 반복됩니다.
            </p>
            <p className="text-sm leading-relaxed">
              대가들의 공통점: <em>규칙·인내·비용·위험</em>을 먼저 말합니다.
              &ldquo;빨리 부자&rdquo; 문장과는 거리가 멉니다. 심리 함정은
              <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>투자 심리</Link>·
              <Link href="/learn/myths" style={{ color: "var(--mint)" }}>초보 오해</Link>를 함께 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>벤저민 그레이엄 — 안전마진</h2>
            <p className="text-sm leading-relaxed mb-3">
              가치투자의 아버지로 불립니다. 핵심은
              <strong style={{ color: "var(--text)" }}>안전마진(Margin of Safety)</strong> —
              추정한 내재가치보다 <em>충분히</em> 싼 가격에만 산다는 것입니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>숫자 감각 (교육용)</strong></p>
              <p>내가 보수적으로 본 회사 가치가 주당 $100이라고 가정합시다.
                안전마진 30%를 두면 $70 아래에서만 산다는 식의 규칙입니다.
                추정이 틀려도 버퍼가 남게 하려는 태도입니다.</p>
              <p>저PER·저PBR만 모으는 &ldquo;숫자 놀이&rdquo;와는 다릅니다.
                자산·이익·부채를 보수적으로 보고, 확신이 없으면 사지 않습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>워런 버핏 — 좋은 기업을 합리적 가격에</h2>
            <p className="text-sm leading-relaxed mb-3">
              버핏은 초기에는 그레이엄식 초저평가주를 많이 샀고,
              이후 <strong style={{ color: "var(--text)" }}>경제적 해자(moat)</strong>가 있는
              훌륭한 기업을 적당한 가격에 사서 오래 보유하는 쪽으로 확장했습니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>해자</strong> — 브랜드·네트워크·규모·전환 비용처럼 경쟁자가 따라오기 어려운 방패</li>
              <li>단기 뉴스보다 5~10년 이익 창출력</li>
              <li>&ldquo;이해 가능한 사업&rdquo;만 — 모르는 테마·과도한 레버리지 회피</li>
              <li>&ldquo;시장은 단기 투표기, 장기 저울&rdquo; — 가격과 가치는 언젠가 만남</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              13F로 버핏 포트폴리오를 그대로 복제하는 함정은
              <Link href="/learn/13f-guide" style={{ color: "var(--mint)" }}>13F 가이드</Link>를 보세요. 공시는 과거 스냅샷입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>찰리 멍거 — 여러 렌즈로 보기</h2>
            <p className="text-sm leading-relaxed">
              멍거는 한 지표에 집착하지 말고 심리·경제·역사·경쟁 구조를 함께 보라고 했습니다.
              모두가 탐욕일 때 조심하고, 모두가 공포일 때 기회를 찾는
              <em>역발상</em> 태도. Investus의
              <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕지수</Link>는
              &ldquo;분위기 온도계&rdquo;일 뿐, 매수 버튼이 아닙니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>피터 린치 — 아는 것에 투자</h2>
            <p className="text-sm leading-relaxed mb-3">
              일상에서 좋은 제품·서비스를 발견해 조사하라는 접근으로 유명합니다.
              &ldquo;10배터&rdquo;(10배 성장 가능 기업) 이야기도 많지만,
              스토리만 믿고 재무를 안 보면 위험합니다.
            </p>
            <p className="text-sm leading-relaxed">
              초보 적용: 개별주는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 코어</Link> 위에서
              <em>소수 비중 위성</em>만. 매수 전
              <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>체크리스트</Link>에 이유를 적으세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>존 보글 — 비용과 인덱스</h2>
            <p className="text-sm leading-relaxed mb-3">
              뱅가드 창설자 보글의 메시지: &ldquo;시장을 이기려 하지 말고 <em>시장을 소유</em>하라.&rdquo;
              운용보수·거래비용·세금이 장기 수익을 갉아먹습니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>숫자 감각</strong> —
                연 수익률이 비슷할 때, 보수 0.03%와 1.00%의 차이는 20~30년 적립에서
                수백만~수천만 원 이상으로 벌어질 수 있습니다(금액·기간에 따라 다름).
                저비용 <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link> ETF +
                <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link>가 그의 유산에 가깝습니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              한국에서 살지 미국에서 살지는 <Link href="/learn/kr-us-etf" style={{ color: "var(--mint)" }}>한국 vs 미국 ETF</Link>를 참고하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>레이 달리오 — 올웨더·분산</h2>
            <p className="text-sm leading-relaxed mb-3">
              경제를 &ldquo;성장↑/↓ × 인플레↑/↓&rdquo; 네 구간으로 보는 프레임이 유명합니다.
              주식만 들고 있으면 특정 구간에서 크게 아픕니다.
              채권·금·원자재처럼 상관이 다른 자산을 섞는
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>분산</Link> 사고입니다.
            </p>
            <p className="text-sm leading-relaxed">
              관련: <Link href="/learn/bonds" style={{ color: "var(--mint)" }}>채권</Link>·
              <Link href="/learn/commodities" style={{ color: "var(--mint)" }}>원자재</Link>·
              <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>금리·CPI</Link>.
              초보는 완벽한 올웨더 복제보다 &ldquo;주식 100%만은 피하자&rdquo; 수준부터.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>하워드 막스 — 리스크와 사이클</h2>
            <p className="text-sm leading-relaxed">
              &ldquo;수익률 극대화&rdquo;보다 &ldquo;나쁜 날 버티기&rdquo;를 강조합니다.
              2차적 사고 — 남들이 믿는 것에 대해 <em>어떻게 생각할지</em>.
              사이클이 뜨거울 때 위험을 사고, 차가울 때 기회를 산다는 태도.
              개인에게는 &ldquo;레버리지로 수익률을 억지로 키우지 않기&rdquo;로 번역해도 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>필립 피셔·짐 로저스 — 성장과 매크로</h2>
            <p className="text-sm leading-relaxed">
              피셔는 경영진·R&amp;D·성장성을 깊게 조사해 우량 성장주를 오래 보유했습니다.
              로저스는 원자재·신흥국 등 장기 사이클에 베팅하는 매크로 투자자로 알려져 있습니다.
              개인에게는 &ldquo;한 사이클에 올인&rdquo;보다 코어 지수 + 소액 위성이 현실적입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>한국 투자자에게 적용하기</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>코어: S&amp;P500 또는 전세계 지수 ETF + 저비용 + 적립</li>
              <li>위성: 이해한 개별주·섹터만, 전체의 소수 비중</li>
              <li>밸류: PER·PBR·재무로 숫자 확인 — &ldquo;싸 보인다&rdquo;만으로 올인 금지</li>
              <li>세금·환율: <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>세금</Link>·<Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율</Link>·<Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA</Link></li>
              <li>심리: 규칙 없는 매매는 어떤 철학도 못 구함</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["대가 종목만 복사", "매수 단가·세금·비중이 다릅니다. 원칙을 복사하세요."],
                ["저PER = 가치투자", "가치 함정일 수 있습니다."],
                ["철학은 읽고 매매는 단타", "실행이 철학입니다."],
                ["인덱스를 '패배'로 여김", "보글에게 인덱스는 승리에 가깝습니다."],
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
              <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>밸류에이션</Link> ·
              <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link> ·
              <Link href="/learn/compound" style={{ color: "var(--mint)" }}>복리</Link> ·
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오</Link> ·
              <Link href="/learn/buffett-indicator" style={{ color: "var(--mint)" }}>버핏지수</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 과거 대가의 성과는 미래를 보장하지 않으며, 특정 종목·전략 권유가 아닙니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
