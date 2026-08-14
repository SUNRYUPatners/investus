import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "기술적 분석 입문 — 이동평균·RSI·지지저항을 초보도 이해하게 | 인베스트어스",
  description:
    "차트·이동평균선·RSI·지지·저항이 무엇인지, 왜 보는지, 숫자 예시와 흔한 실수까지. 완전 초보를 위한 기술적 분석 입문 가이드.",
  keywords: ["기술적 분석", "이동평균선", "RSI", "지지 저항", "차트 분석", "골든크로스"],
  alternates: { canonical: "https://www.investus.kr/learn/technical-analysis" },
  openGraph: {
    title: "기술적 분석 입문 | 인베스트어스",
    description: "이동평균·RSI·지지저항 — 차트는 보조 도구로",
    url: "https://www.investus.kr/learn/technical-analysis",
    type: "article",
  },
};

export default function TechnicalAnalysisPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8" }}>차트</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 22분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            기술적 분석 입문
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            주식을 처음 보면 화면에 선과 숫자가 가득합니다. 기술적 분석은 &ldquo;과거 가격과 거래량을 보고
            지금 분위기를 읽는&rdquo; 방법입니다. 미래를 맞히는 마법이 아니라, <em>위험을 줄이고 과열·침체를 참고하는</em> 보조 도구로
            이해하는 편이 안전합니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>한 줄 정의</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>기술적 분석(Technical Analysis)</strong> —
              기업의 매출·이익 대신, <em>주가 차트와 거래량</em>을 보고
              &ldquo;지금 사는 사람이 많은지, 파는 사람이 많은지, 어느 가격대에서 막히는지&rdquo;를 추정하는 방법입니다.
            </p>
            <p className="text-sm leading-relaxed">
              반대로 <strong style={{ color: "var(--text)" }}>펀더멘털 분석</strong>은 회사 실적·재무·산업을 봅니다.
              재무는 <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link>,
              비싸거나 싼지는 <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER·PBR</Link> 가이드를 보세요.
              장기 적립 투자자는 펀더멘털·분산이 먼저이고, 차트는 &ldquo;지금 너무 들떴나?&rdquo; 정도만 참고해도 충분합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>왜 사람들이 차트를 보나</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>가격에는 이미 많은 사람의 기대·공포가 반영되어 있다는 가정</li>
              <li>단기 매매에서 &ldquo;언제 들어가고 언제 나올지&rdquo;를 정할 때</li>
              <li>장기 투자자도 과열(너무 올랐다) 또는 침체(너무 빠졌다)를 감각적으로 확인할 때</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              중요한 점: 차트만으로 &ldquo;내일 오를 확률 80%&rdquo; 같은 확정 신호는 없습니다.
              같은 차트를 보고도 해석이 사람마다 갈립니다. 그래서 Investus는 차트를
              <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립(DCA)</Link>·
              <Link href="/learn/compound" style={{ color: "var(--mint)" }}>복리</Link> 전략의
              <em>보조</em>로만 권합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>캔들·종가부터</h2>
            <p className="text-sm leading-relaxed mb-3">
              차트에서 가장 기본은 <strong style={{ color: "var(--text)" }}>종가(그날 마지막 거래 가격)</strong>입니다.
              하루·한 주·한 달의 시가·고가·저가·종가를 한 막대로 그린 것이 <strong style={{ color: "var(--text)" }}>캔들</strong>입니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>예시</strong> — A주식 오늘 시가 $100, 고가 $105, 저가 $98, 종가 $103이면
                &ldquo;하루 동안 $98~$105에서 거래됐고, 마감은 $103&rdquo;입니다.</p>
              <p>초보는 복잡한 캔들 패턴 이름보다, <em>가격이 며칠째 올라가는지·거래량이 갑자기 늘었는지</em>만 봐도 됩니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>이동평균선(MA) — 평균 가격의 선</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>이동평균(Moving Average)</strong>은
              최근 N일 종가의 평균을 매일 이어서 그린 선입니다.
              &ldquo;요즘 평균적으로 얼마에 거래됐나&rdquo;를 보여 줍니다. 자주 쓰는 기간은 20일·50일·200일입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>숫자 예시</strong> —
              어떤 날 종가가 10일간 $100, $102, $101, $103, $105, $104, $106, $108, $107, $110이었다면
              10일 이동평균은 이 열 개 숫자의 평균입니다. 주가가 이 선 <em>위</em>에 있으면
              &ldquo;최근 평균보다 비싸게(강세)&rdquo;, <em>아래</em>면 &ldquo;최근 평균보다 싸게(약세)&rdquo;로 단순 해석하기도 합니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>
                <strong style={{ color: "var(--text)" }}>골든크로스</strong> —
                단기 이동평균이 장기 이동평균을 <em>아래에서 위로</em> 뚫고 올라감. 상승 분위기로 읽는 사람이 많음.
              </li>
              <li>
                <strong style={{ color: "var(--text)" }}>데드크로스</strong> —
                단기선이 장기선을 <em>위에서 아래로</em> 뚫고 내려감. 하락 분위기로 읽는 사람이 많음.
              </li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              함정: 이동평균은 <em>후행</em>합니다. 이미 많이 오른 뒤에 골든크로스가 나오기도 합니다.
              &ldquo;신호 = 즉시 전량 매수&rdquo;로 쓰면 고점에 쫓아갈 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>RSI — 과열·침체를 0~100으로</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>RSI(Relative Strength Index)</strong>는
              최근 일정 기간 상승일과 하락일의 강도를 비교해 0~100 숫자로 만든 지표입니다.
              보통 <strong style={{ color: "var(--text)" }}>70 이상</strong>을 과매수(너무 많이 올랐다),
              <strong style={{ color: "var(--text)" }}>30 이하</strong>를 과매도(너무 많이 빠졌다)로 읽습니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>왜 조심해야 하나</strong> —
                강한 상승장에서는 RSI가 70 위에 <em>오래</em> 머무를 수 있습니다.
                &ldquo;과매수니까 바로 판다&rdquo;면 계속 오르는 구간을 놓칠 수 있고,
                &ldquo;과매도니까 무조건 산다&rdquo;면 더 떨어지는 구간을 만날 수 있습니다.</p>
              <p>초보 활용법: RSI만으로 매매하지 말고,
                <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕지수</Link>나
                뉴스·실적과 함께 &ldquo;분위기가 한쪽으로 쏠렸나&rdquo;만 확인하세요.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>지지·저항 — 막히거나 버티는 가격대</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>지지(Support)</strong> —
              과거에 여러 번 내려오다가 반등한 가격대. &ldquo;여기서 사려는 사람이 많았다&rdquo;는 해석.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>저항(Resistance)</strong> —
              과거에 여러 번 올라가다 막힌 가격대. &ldquo;여기서 팔려는 사람이 많았다&rdquo;는 해석.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>숫자 예시</strong> —
              어떤 ETF가 $480 근처에서 세 번 반등했다면 $480을 지지로 보는 사람이 많습니다.
              반대로 $520에서 세 번 밀렸다면 $520을 저항으로 봅니다.
              $100, $500처럼 둥근 숫자도 심리적 지지·저항으로 자주 언급됩니다.
            </p>
            <p className="text-sm leading-relaxed">
              돌파 뒤에는 역할이 바뀌었다는 프레이밍이 흔합니다(옛 저항 → 새 지지).
              다만 뉴스나 실적 한 방에 선이 무너질 수 있으니, 선에 인생을 걸지 마세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>거래량 — 힘이 실린 움직임인가</h2>
            <p className="text-sm leading-relaxed mb-3">
              가격이 올라도 <strong style={{ color: "var(--text)" }}>거래량</strong>(사고판 주식 수)이 적으면
              &ldquo;관심 없는 상승&rdquo;일 수 있습니다. 급등과 함께 거래량이 크게 늘면
              많은 사람이 참여했다는 뜻으로 읽습니다. 초보는 &ldquo;갑자기 평소의 몇 배로 거래량이 붙었나&rdquo;만 보면 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["차트만 보고 회사는 안 봄", "적자·부채가 커져도 차트는 잠깐 예쁠 수 있습니다. 재무와 함께 보세요."],
                ["지표를 너무 많이 겹침", "MA·RSI·MACD·볼린저를 전부 켜면 신호만 늘고 결정은 더 헷갈립니다. 1~2개면 충분."],
                ["과거 차트에 맞춰 규칙을 계속 바꿈", "과최적화. 과거만 잘 맞는 규칙은 미래에는 자주 깨집니다."],
                ["유튜브 '확정 패턴'을 그대로 복제", "같은 패턴도 시장·종목·시간대마다 다릅니다."],
                ["공포탐욕과 차트를 겹쳐 확증만 찾기", "이미 사고 싶은데 유리한 신호만 보면 확증 편향입니다."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>장기 투자자에게 현실적인 쓰는 법</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>코어는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>지수 ETF</Link> + <Link href="/learn/dca" style={{ color: "var(--mint)" }}>월 적립</Link>으로 고정</li>
              <li>차트는 &ldquo;지금 너무 과열인가?&rdquo; 정도만 — 적립을 멈추는 이유로 쓰지 않기</li>
              <li>개별주를 살 때는 <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>매수 체크리스트</Link>에 비중·세금·이유를 먼저 적기</li>
              <li>단타·옵션과 차트를 섞지 않기 — <Link href="/learn/options" style={{ color: "var(--mint)" }}>옵션</Link>은 별도 고위험 영역</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 읽을 글</h2>
            <p className="text-sm leading-relaxed">
              기업 숫자 → <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link>·
              <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>밸류에이션</Link>,
              시장 분위기 → <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕</Link>·
              <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>투자 심리</Link>,
              상품 → <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 차트 신호 기반 매매·종목 추천이 아닙니다. 투자 손실 가능성은 본인에게 있습니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
