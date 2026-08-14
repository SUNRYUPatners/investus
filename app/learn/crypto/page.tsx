import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "비트코인·암호화폐 — 완전 초보 가이드 (ETF·리스크·비중) | 인베스트어스",
  description:
    "암호화폐가 무엇인지, 비트코인·이더리움, 미국 현물 BTC ETF(IBIT·FBTC), 관련 주식, 변동성·규제·포트폴리오 비중을 주식 초보도 이해할 수 있게 설명합니다.",
  keywords: ["비트코인", "암호화폐", "IBIT", "FBTC", "비트코인 ETF", "이더리움", "크립토"],
  alternates: { canonical: "https://www.investus.kr/learn/crypto" },
  openGraph: {
    title: "비트코인·암호화폐 초보 가이드 | 인베스트어스",
    description: "BTC·ETH, 현물 ETF, 변동성·비중을 완전 초보 눈높이로",
    url: "https://www.investus.kr/learn/crypto",
    type: "article",
  },
};

export default function CryptoPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}>자산</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 22분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            비트코인·암호화폐 — 완전 초보 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            암호화폐는 주식과 다른 리스크 프로필입니다. 현물 ETF로 접근은 쉬워졌지만,
            하루에도 크게 출렁일 수 있고, &ldquo;반드시 오른다&rdquo;는 보장이 없습니다. 용어부터 비중까지 차근차근 갑니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>암호화폐란? (주식과 한 줄 비교)</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>암호화폐(cryptocurrency)</strong>는 블록체인(거래 기록을 여러 컴퓨터가 나눠 검증하는 기술) 위에서
              전송·보관되는 디지털 자산입니다. 중앙은행이 찍는 원화·달러와 다릅니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>주식</strong> — 회사 소유권. 매출·이익·재무제표로 어느 정도 설명할 수 있음.</p>
              <p><strong style={{ color: "var(--text)" }}>암호화폐</strong> — 발행·합의 규칙이 자산마다 다름. PER 같은 표준 밸류가 약하고, 수급·규제·심리 비중이 큼.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              그래서 <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>FOMO·공포</Link>에 더 취약합니다.
              매수 전에는 <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>체크리스트</Link>를 꼭 거치세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>비트코인(BTC)과 이더리움(ETH)</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>비트코인(BTC)</strong> — 가장 먼저 널리 알려진 암호화폐. &ldquo;디지털 금&rdquo;처럼 가치 저장 수단으로 이야기되는 경우가 많습니다. 공급량이 규칙으로 제한되어 있다는 점이 자주 강조됩니다.</li>
              <li><strong style={{ color: "var(--text)" }}>이더리움(ETH)</strong> — 스마트 계약(조건이 맞으면 자동 실행되는 프로그램)과 그 위의 앱·DeFi 등이 돌아가는 플랫폼으로 자주 설명됩니다. BTC와 &ldquo;같은 것&rdquo;이 아닙니다.</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              그 밖의 알트코인·밈코인은 유동성·정보·사기 리스크가 더 클 수 있습니다.
              초보가 처음 공부할 때는 BTC 개념과 &ldquo;내 비중&rdquo;만으로도 충분합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>가격을 움직이는 것들 (쉬운 목록)</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>수요·공급과 대형 ETF 자금 유출입</li>
              <li>각국 규제·거래소 이슈</li>
              <li>달러·금리 등 매크로 (<Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>금리 가이드</Link>)</li>
              <li>반감기(비트코인 채굴 보상이 줄어드는 이벤트) 같은 일정 — 과거와 미래가 같다고 보장되지 않음</li>
              <li>시장 심리·레버리지 청산 연쇄</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>미국 현물 비트코인 ETF란?</h2>
            <p className="text-sm leading-relaxed mb-3">
              2024년 이후 미국에서는 <strong style={{ color: "var(--text)" }}>현물 비트코인 ETF</strong>가 거래됩니다.
              ETF가 실제 BTC를 보유하고, 투자자는 증권 계좌에서 주식처럼 사고팔 수 있습니다.
              대표적으로 언급되는 티커: <strong style={{ color: "var(--text)" }}>IBIT</strong>(블랙록), <strong style={{ color: "var(--text)" }}>FBTC</strong>(피델리티), <strong style={{ color: "var(--text)" }}>GBTC</strong> 등.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>장점 (개념)</strong> — 거래소 지갑·콜드월렛 관리 부담이 상대적으로 적음. 익숙한 증권 계좌 UI.</p>
              <p><strong style={{ color: "var(--text)" }}>단점</strong> — 운용보수. BTC가 떨어지면 ETF도 함께 떨어짐. &ldquo;ETF라서 안전&rdquo;이 아님.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              ETF 일반 개념은 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>.
              한국 거주자 세금 프레임은 자산마다 다를 수 있으니
              <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}> 미국주식 세금</Link>·거래소·국세청 안내를 별도로 확인하세요. (자문 아님)
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>관련 미국 주식 — BTC와 동일하지 않다</h2>
            <p className="text-sm leading-relaxed mb-3">
              Investus에서 자주 보이는 티커 예시:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>COIN</strong> — 코인베이스. 거래소 사업. 거래량·규제에 민감.</li>
              <li><strong style={{ color: "var(--text)" }}>MSTR</strong> — 마이크로스트래티지. 대량 BTC 보유로 알려져 BTC와 같이 움직이는 경향이 크지만, 회사·부채·주식 구조 리스크가 추가됩니다.</li>
              <li><strong style={{ color: "var(--text)" }}>MARA / RIOT</strong> — 채굴 관련. 전력·설비·해시레이트 등 운영 변수.</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              &ldquo;비트코인 산 것과 같다&rdquo;고 생각하면 위험합니다. 레버리지처럼 더 크게 움직일 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>변동성 숫자로 느끼기</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p>가령 투자금 100만 원 중 암호화폐에 50만 원을 넣고, 한 달에 -40%가 오면 그 부분만 -20만 원입니다.
                계좌 전체로는 -20%입니다.</p>
              <p>같은 100만 원 중 5만 원만 넣었다면, 같은 -40%여도 계좌 전체는 약 -2%입니다.
                <strong style={{ color: "var(--text)" }}>비중</strong>이 생존을 좌우합니다.</p>
              <p>주식 지수 ETF만 있는 포트폴리오와 비교해 보세요 — <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>·<Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>분산</Link>.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>리스크 목록 (초보가 꼭 읽을 것)</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>일간 -10%~-20%도 나올 수 있는 변동성 — 생활비·비상금 투입 금지</li>
              <li>규제 변화, 거래소 해킹·파산, 스테이블코인 이슈</li>
              <li>레버리지 ETF·선물·빚내서 투자 — 청산·변동성 감쇠로 장기 보유에 부적합할 수 있음</li>
              <li>사기·피싱·가짜 지갑 주소</li>
              <li>한국 거래소 vs 해외 거래소 vs 미국 ETF — 세금·신고 규칙이 다를 수 있음</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>포트폴리오에 넣는다면</h2>
            <p className="text-sm leading-relaxed mb-3">
              많은 자산배분 논의에서 암호화폐는 <em>소수 비중 위성</em>으로만 이야기됩니다.
              예: 전체의 1~5% (본인 위험 허용 범위 내). 코어는
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}> 저비용 주식 ETF</Link> + 필요 시
              <Link href="/learn/bonds" style={{ color: "var(--mint)" }}> 채권</Link>이 일반적입니다.
            </p>
            <p className="text-sm leading-relaxed">
              &ldquo;올인하면 대박&rdquo;은 <Link href="/learn/myths" style={{ color: "var(--mint)" }}>초보 오해</Link>와
              <Link href="/learn/compound" style={{ color: "var(--mint)" }}> 복리를 깎는 패턴</Link>에 가깝습니다.
              금·원자재와 헷갈리면 <Link href="/learn/commodities" style={{ color: "var(--mint)" }}>원자재 가이드</Link>도 참고.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["생활비·대출로 매수", "변동성이 일상을 무너뜨립니다. 먼저 비상금."],
                ["단톡·유튜브 FOMO 추격", "이미 급등한 뒤일 수 있습니다. 24시간 보류 + 체크리스트."],
                ["레버리지·선물로 ‘단타 만회’", "손실을 키우는 전형적 패턴입니다."],
                ["BTC ETF와 채굴주·COIN을 동일시", "추가 사업·재무 리스크가 있습니다."],
                ["세금·신고를 무시", "국가·상품별로 다릅니다. 확실치 않으면 전문가·공식 안내를 확인하세요."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 할 일</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>본인 포트폴리오에서 암호화폐 비중 상한을 숫자로 적기 (0%도 선택입니다).</li>
              <li>코어 ETF 적립을 먼저 안정시키기 — <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link>·<Link href="/learn/us-stock-basics" style={{ color: "var(--mint)" }}>미국주식 입문</Link>.</li>
              <li>관심 있다면 IBIT/FBTC가 &ldquo;현물 BTC 추종 ETF&rdquo;라는 점만 구분해서 메모.</li>
              <li>매수 전 <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>체크리스트</Link> 10문항 통과 여부 확인.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>관련 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF</Link>,
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}> 포트폴리오</Link>,
              <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}> 심리</Link>,
              <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}> 세금</Link>,
              <Link href="/learn/commodities" style={{ color: "var(--mint)" }}> 원자재</Link>,
              <Link href="/learn/options" style={{ color: "var(--mint)" }}> 옵션(고위험)</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 암호화폐는 고위험 자산이며 투자·세무·법률 자문이 아닙니다. 원금 전액 손실 가능성을 전제로 하세요.
          </div>
        </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/portfolio-strategy" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">💼</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>포트폴리오 분산·리밸런싱</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>위성 비중 잡기</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/buy-checklist" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">✅</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>매수 전 체크리스트</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>사기 전에 10가지</p>
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
