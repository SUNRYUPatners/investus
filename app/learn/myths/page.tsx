import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "초보 투자 오해 TOP10 | 인베스트어스",
  description:
    "미국주식 완전 초보가 자주 믿는 오해 10가지 — 바닥·천장 맞추기, 레버리지 ETF, 버핏 따라 사기, 본전 심리, 고배당, 세금·환율 무시, 차트·옵션 환상, 과매매. 왜 틀렸는지와 대신 할 일.",
  alternates: { canonical: "https://www.investus.kr/learn/myths" },
};

export default function MythsPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(248,113,113,0.15)", color: "#f87171" }}>입문</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 26분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            초보 투자 오해 TOP10
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            &ldquo;다들 아는 상식&rdquo;이 계좌를 깎는 경우가 많습니다.
            주식·ETF가 처음이어도 이해할 수 있게, 각 오해를 <em>왜 믿는지 → 왜 틀렸는지 → 대신 무엇을 할지</em>로 풀었습니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>이 글을 읽는 이유</h2>
            <p className="text-sm leading-relaxed mb-3">
              초보 시절 실수는 대부분 &ldquo;공부 부족&rdquo;보다 <strong style={{ color: "var(--text)" }}>잘못된 확신</strong>에서 옵니다.
              SNS·유튜브·단톡방의 한마디가 규칙처럼 자리 잡으면, 손실이 나도 &ldquo;조금만 더 기다리면 된다&rdquo;고 합리화하기 쉽습니다.
            </p>
            <p className="text-sm leading-relaxed">
              아래 10가지는 Investus 커뮤니티와 초보 질문에서 반복되는 패턴입니다.
              완벽한 정답 목록이 아니라, <em>스스로 의심할 체크리스트</em>로 쓰세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>1. &ldquo;바닥·천장을 맞출 수 있다&rdquo;</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 믿나:</strong> 뉴스에 &ldquo;저점 매수&rdquo; 성공담이 많이 나옵니다.
              차트를 뒤로 돌리면 &ldquo;여기가 바닥이었네&rdquo;가 눈에 보여, 미래에도 같은 감각이 통할 것 같습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 틀리나:</strong> 바닥은 지나간 뒤에야 바닥으로 보입니다.
              전문 운용사도 매일의 고·저점을 맞추지 않습니다. 한두 번 맞추면 &ldquo;실력&rdquo;이라 착각하고, 틀렸을 때 현금만 쌓이다가 상승장을 통째로 놓칩니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>숫자 예시:</strong> S&amp;P500이 연평균 약 10%(과거·세전·단순 가정)라면, 현금으로 1년을 기다리다가 &ldquo;더 싼 날&rdquo;을 못 잡으면
              그 해의 기대 수익을 통째로 포기한 셈입니다. 맞출 확률보다 <em>놓칠 비용</em>이 큰 경우가 많습니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>대신:</strong>{" "}
              <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립식(DCA)</Link>으로 날짜와 금액을 고정하세요.
              &ldquo;완벽한 날&rdquo;보다 &ldquo;꾸준히 사는 날&rdquo;이 초보에게 유리합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>2. &ldquo;레버리지 ETF는 장기 복리 머신이다&rdquo;</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 믿나:</strong> TQQQ처럼 지수의 2~3배를 추종한다고 하면,
              &ldquo;장기면 3배 수익&rdquo;처럼 들립니다. 단기 급등장 후 계좌가 불어난 스크린샷이 SNS에 돌아다닙니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 틀리나:</strong> 대부분의 레버리지 ETF는 <em>하루 수익률</em>의 N배를 목표로 합니다.
              오르락내리락이 반복되면 장기 보유 시 &ldquo;변동성 감쇠&rdquo;로 지수 N배보다 훨씬 못 미치는 경우가 많습니다. 코어 자산으로 쓰기엔 구조가 맞지 않습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>숫자 예시:</strong> 어떤 날이 +10%, 다음 날 −9%면 원금 100 → 110 → 약 100.1입니다.
              3배 레버리지는 +30% / −27% → 130 → 약 94.9. 지수는 거의 제자리인데 레버리지는 이미 약 5% 깎였습니다. 이런 날이 쌓이면 장기 곡선이 크게 갈라집니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>대신:</strong> 장기 코어는{" "}
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>저비용 지수 ETF</Link>(VOO, SPY, QQQ 등)로 두고,
              레버리지는 &ldquo;짧게·소수 비중&rdquo;만 검토하세요. 잘 모르면 안 사는 편이 낫습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>3. &ldquo;버핏이 샀으니 나도 사면 된다&rdquo;</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 믿나:</strong> 워런 버핏·유명 헤지펀드 이름이 붙으면 안심이 됩니다.
              뉴스 제목만 보고 &ldquo;검증된 종목&rdquo;이라고 느끼기 쉽습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 틀리나:</strong>{" "}
              <Link href="/learn/13f-guide" style={{ color: "var(--mint)" }}>13F</Link>는 분기 말 기준의 <em>과거 스냅샷</em>입니다.
              공시가 나올 때쯤엔 이미 팔았거나 더 샀을 수 있습니다. 기관의 규모·세금·기간·헤지 구조도 개인과 다릅니다. &ldquo;버핏이 산 한 종목&rdquo;만 따라 사면, 그의 포트폴리오 전체 맥락을 버리는 것입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>숫자 예시:</strong> 분기 말(3/31) 보유 → 공시가 5월 중순에 공개되는 식이면,
              그사이 40일 이상 가격·포지션이 바뀌었을 수 있습니다. 그 기간에 주가가 20% 오른 뒤 따라 사면, 기관의 평균 단가와 전혀 다른 배팅이 됩니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>대신:</strong> 아이디어 소스로만 쓰고,{" "}
              <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무</Link>·{" "}
              <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>밸류</Link>·{" "}
              <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>매수 체크리스트</Link>로 직접 검증하세요.
              Investus 검색 탭의 투자 대가도 같은 원칙입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>4. &ldquo;손실 종목은 본전 오면 판다&rdquo;</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 믿나:</strong> 손실을 확정하면 실패처럼 느껴집니다.
              &ldquo;본전만 오면 나온다&rdquo;는 말은 감정을 달래 주지만, 투자 규칙이 아닙니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 틀리나:</strong> 이미 산 가격은 되돌릴 수 없는 <em>매몰비용</em>입니다.
              앞으로의 기대 수익·리스크만 보면 됩니다. 본전 집착은 나쁜 자산을 오래 붙잡고, 더 나은 기회(기회비용)를 놓치게 합니다. 근거 없는 물타기도 같은 심리입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>숫자 예시:</strong> A종목을 −30%로 들고 있는데, 전망이 나빠진다면
              &ldquo;본전(+43% 반등)까지 기다림&rdquo;과 &ldquo;손절 후 지수 ETF로 재배치&rdquo;를 비교해야 합니다.
              본전 올 때까지 2년이 걸린다면, 그 2년의 복리·배당을 다른 곳에서 놓친 비용입니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>대신:</strong>{" "}
              <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>심리 가이드</Link>의 규칙처럼,
              &ldquo;왜 샀는지&rdquo;가 사라지면 비중을 줄이거나 정리하세요. 물타기는 <em>미리 정한 계획</em>일 때만.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>5. &ldquo;배당만 높으면 좋은 주식이다&rdquo;</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 믿나:</strong> 예금 이자처럼 &ldquo;매달·매분기 현금&rdquo;이 들어오면 안정적으로 보입니다.
              수익률 숫자(예: 8%)만 보고 고르면 단순합니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 틀리나:</strong> 배당수익률 = 연 배당 ÷ 주가입니다.
              주가가 반 토막 나면 수익률 숫자는 치솟습니다. 그게 &ldquo;싸게 사는 기회&rdquo;일 수도, <em>삭감·파산 직전</em>의 함정일 수도 있습니다. 배당은 기업이 임의로 줄이거나 끊을 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>숫자 예시:</strong> 주가 $50, 연 배당 $2 → 4%.
              실적 악화로 주가 $25가 되면 같은 배당이면 8%로 &ldquo;좋아 보이지만&rdquo;, 곧 배당을 $1로 깎으면 다시 4%이고 원금은 이미 −50%입니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>대신:</strong>{" "}
              <Link href="/learn/dividend" style={{ color: "var(--mint)" }}>배당 가이드</Link>처럼 지속성·현금흐름·세후 수익률을 같이 보세요.
              SCHD 등 배당 ETF로 분산하는 편이 단일 고배당주보다 초보에게 낫습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>6. &ldquo;미국주식은 세금이 없다&rdquo;</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 믿나:</strong> &ldquo;해외주식은 비과세&rdquo; 같은 오래된 말이나,
              앱 화면에서 세금 줄이 잘 안 보여 착각합니다. 증권사 이벤트 문구를 과신하기도 합니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 틀리나:</strong> 한국 거주자는 양도차익·배당에 대해 과세 이슈가 있습니다.
              미국에서는 배당에 원천징수가 붙는 경우가 많고, 국내에서는 금융소득 합산·신고 이슈가 생길 수 있습니다. (세무 자문 아님 — 개념만)
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>숫자 예시:</strong> 배당 $100이 입금된다고 가정해도,
              원천징수 후 실수령이 줄고, 연간 금융소득이 기준을 넘으면 추가 부담이 생길 수 있습니다.
              &ldquo;표면 배당 4%&rdquo;와 &ldquo;세후 체감&rdquo;은 다릅니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>대신:</strong>{" "}
              <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>미국주식 세금</Link>·{" "}
              <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA·연금</Link> 가이드로
              <em>세후</em>로 비교하세요. 큰 금액은 세무사 상담이 맞습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>7. &ldquo;환율은 무시해도 된다&rdquo;</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 믿나:</strong> 앱에 달러·퍼센트만 보이면 원화 손익을 잊기 쉽습니다.
              &ldquo;주가가 올랐으니 이득&rdquo;이라고만 생각합니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 틀리나:</strong> 월급·생활비는 원화입니다.
              같은 달러 수익이라도 원/달러가 움직이면 원화 평가액이 달라집니다. 환전 수수료·스프레드도 장기 비용을 만듭니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>숫자 예시:</strong> 주식 $10,000을 원/달러 1,300원에 사서 1,300만 원.
              주가는 그대로인데 환율이 1,200원이 되면 원화 평가액은 약 1,200만 원(−약 7.7%). 반대로 환율이 오르면 원화 기준으로는 이득처럼 보일 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>대신:</strong>{" "}
              <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율 가이드</Link>로 환노출·환헤지 차이를 알고,
              적립식은 환율 분산에도 도움이 됩니다. 원화 기준 수익률을 가끔이라도 확인하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>8. &ldquo;차트 신호 = 확정 수익&rdquo;</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 믿나:</strong> RSI·골든크로스 같은 용어가 &ldquo;과학&rdquo;처럼 들립니다.
              뒤로 돌린 차트에서는 신호가 잘 맞은 구간만 보이기 쉽습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 틀리나:</strong> 기술적 지표는 과거 가격을 가공한 <em>보조 도구</em>입니다.
              미래 확정이 아닙니다. 같은 신호라도 횡보장·추세장에서 성패가 갈리고, 수수료·슬리피지를 넣으면 &ldquo;백테스트 수익&rdquo;이 사라지는 경우가 많습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>숫자 예시:</strong> 승률 55%인 단기 전략이라도,
              한 번 크게 지면(+2% 열 번, −15% 한 번) 계좌는 마이너스가 될 수 있습니다. 신호 &ldquo;맞음/틀림&rdquo;보다 손익비·규칙 준수가 중요합니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>대신:</strong>{" "}
              <Link href="/learn/technical-analysis" style={{ color: "var(--mint)" }}>기술적 분석</Link>은
              진입·청산 <em>타이밍 보조</em>로만 쓰고, 무엇을 살지는 사업·재무·지수 비중이 먼저입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>9. &ldquo;옵션으로 빨리 부자 된다&rdquo;</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 믿나:</strong> 적은 증거금으로 큰 노출이 가능하고,
              SNS에 &ldquo;원금 대비 몇 배&rdquo; 인증이 많습니다. 레버리지의 매력이 강하게 포장됩니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 틀리나:</strong> 옵션(콜·풋)은 만기·행사가·변동성까지 맞춰야 하는 계약입니다.
              방향만 맞아도 시간가치 감소로 손실일 수 있고, 매수 옵션은 <em>원금 전액</em>이 0이 될 수 있습니다. &ldquo;빨리&rdquo;와 &ldquo;쉽게&rdquo;는 반대인 경우가 많습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>숫자 예시:</strong> $500짜리 콜 옵션을 샀는데 만기까지 주가가 행사가에 못 미치면
              그 $500은 소멸합니다. 같은 $500으로 지수 ETF를 샀다면 적어도 지분(주식·ETF)은 남아 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>대신:</strong>{" "}
              <Link href="/learn/options" style={{ color: "var(--mint)" }}>옵션 기초</Link>는 용어 학습용으로만 보고,
              실전은 소액·모의·규칙 후에. 초보 코어는 여전히 주식·ETF입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>10. &ldquo;매일 봐야 수익이 난다&rdquo;</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 믿나:</strong> 프로처럼 느껴지고, 뉴스를 놓치면 손해 볼 것 같습니다.
              앱 알림·프리마켓·종토방이 &ldquo;부지런함 = 수익&rdquo;으로 연결됩니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>왜 틀리나:</strong> 자주 볼수록 단기 등락에 반응해 <em>과매매</em>하기 쉽습니다.
              수수료·스프레드·세금·나쁜 타이밍이{" "}
              <Link href="/learn/compound" style={{ color: "var(--mint)" }}>복리</Link>를 깎습니다.
              장기 지수 투자자는 &ldquo;매일의 정보&rdquo;보다 &ldquo;몇 년의 시간&rdquo;이 수익의 핵심입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>숫자 예시:</strong> 연 7% 목표인데 잦은 매매로 비용·실수가 연 2%p만 깎여도
              30년 후 결과는 크게 벌어집니다. $10,000을 30년 연 7% vs 연 5%(비용 차)로 단순 비교하면 복리 격차가 수만 달러 단위로 벌어질 수 있습니다(세전·단순).
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>대신:</strong> Investus는 홈·리포트로 &ldquo;오늘 온도&rdquo;만 짧게 보고,
              매수 규칙은{" "}
              <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link>·{" "}
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오</Link>에 맡기세요.
              매일 보는 습관이 필요하면 <em>체크리스트만</em> 보고 주문은 줄이세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>한 줄로 정리</h2>
            <p className="text-sm leading-relaxed mb-3">
              초보가 이기는 방식은 &ldquo;남보다 빨리 맞추기&rdquo;가 아니라,
              <strong style={{ color: "var(--text)" }}>큰 실수를 피하는 것</strong>입니다.
              타이밍·레버리지·대가 복제·본전 심리·고배당 함정·세금·환율·차트·옵션·과매매 — 이 열 가지는 그 실수의 단골 메뉴입니다.
            </p>
            <p className="text-sm leading-relaxed">
              다음으로{" "}
              <Link href="/learn/us-stock-basics" style={{ color: "var(--mint)" }}>미국주식 입문</Link>→{" "}
              <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>매수 체크리스트</Link>→{" "}
              <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link> 순으로 읽으면
              &ldquo;하지 말아야 할 것&rdquo; 다음에 &ldquo;하면 되는 것&rdquo;이 이어집니다.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 투자 권유가 아닙니다. 예시 숫자는 단순화·세전이며 미래 수익을 보장하지 않습니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
