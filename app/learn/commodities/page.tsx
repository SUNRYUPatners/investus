import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "원자재 투자 입문 — 금·유가·농산물·ETF를 초보도 이해하게 | 인베스트어스",
  description:
    "원자재가 무엇인지, 금·원유·농산물·산업금속이 왜 움직이는지, GLD·DBC 등 ETF와 인플레·포트폴리오 역할까지.",
  keywords: ["원자재", "금 ETF", "GLD", "유가", "USO", "DBC", "인플레이션 헤지"],
  alternates: { canonical: "https://www.investus.kr/learn/commodities" },
  openGraph: {
    title: "원자재 투자 가이드 | 인베스트어스",
    description: "금·유가·농산물 — 주식과 다른 사이클",
    url: "https://www.investus.kr/learn/commodities",
    type: "article",
  },
};

export default function CommoditiesPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24" }}>자산</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 22분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            원자재 투자 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            금·원유·구리·밀처럼 &ldquo;실물&rdquo;의 가격에 투자하는 영역입니다.
            주식(회사 이익)과 다른 이유로 오르내리며, 인플레이션·지정학 뉴스에 자주 등장합니다.
            초보는 선물 계좌보다 <em>ETF로 소액 위성</em>부터 이해하는 편이 안전합니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>원자재란</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>원자재(Commodities)</strong>는
              가공하기 전의 기초 실물입니다. 크게 네 갈래로 나눕니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>귀금속</strong> — 금, 은</li>
              <li><strong style={{ color: "var(--text)" }}>에너지</strong> — 원유, 천연가스</li>
              <li><strong style={{ color: "var(--text)" }}>산업금속</strong> — 구리, 알루미늄</li>
              <li><strong style={{ color: "var(--text)" }}>농산물</strong> — 밀, 옥수수, 대두 등</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              가격을 움직이는 것은 주로 <em>수급·날씨·지정학·달러·금리</em>입니다.
              레이 달리오식 올웨더 사고에서는 주식과 상관이 낮은 축으로 자주 언급됩니다
              (<Link href="/learn/value-investing" style={{ color: "var(--mint)" }}>대가 전략</Link>·
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오</Link>).
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>왜 주식과 다르게 움직이나</h2>
            <p className="text-sm leading-relaxed mb-3">
              주식은 &ldquo;이 회사가 앞으로 얼마나 벌까&rdquo;에 반응합니다.
              원자재는 &ldquo;지금·앞으로 실물이 얼마나 부족·남는가&rdquo;에 더 가깝습니다.
              그래서 경기 침체에도 금이 오르거나, 주식 하락장에 유가가 따로 움직이는 구간이 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>인플레이션 헤지</strong>라는 말도 자주 듣습니다.
              물가가 오르면 원자재 가격도 오르는 경향이 있어, 주식·현금만 있을 때보다
              구매력 하락을 일부 줄이려는 목적입니다. 다만 &ldquo;헤지 = 항상 수익&rdquo;은 아닙니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>금(Gold)</h2>
            <p className="text-sm leading-relaxed mb-3">
              금은 이자를 주지 않는 자산입니다. 그래서 <em>실질금리</em>(금리 − 인플레)가 높을 때는
              예금·채권 대비 매력이 떨어지고, 실질금리가 낮거나 지정학 리스크가 커지면
              &ldquo;안전자산&rdquo; 프레임으로 수요가 늘곤 합니다. 달러가 약할 때도 강세인 경우가 많습니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>숫자로 감각 잡기</strong></p>
              <p>포트폴리오 1억 중 금을 5%(500만 원 상당)만 두었다고 가정합시다.
                주식만 20% 빠지고 금이 10% 올라도, 전체 손실을 조금 완충하는 정도의 역할입니다.
                금을 50% 넣으면 &ldquo;완충&rdquo;이 아니라 금 베팅이 됩니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              미국 ETF: <strong style={{ color: "var(--text)" }}>GLD</strong>, <strong style={{ color: "var(--text)" }}>IAU</strong>(현물 추종에 가깝게 설계).
              금광주(채굴 회사)는 금 가격 + 채굴 비용·경영 리스크가 겹칩니다.
              <Link href="/learn/sectors" style={{ color: "var(--mint)" }}>소재·에너지 섹터</Link>와 함께 보면 맥락이 잡힙니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>유가·에너지</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>WTI·브렌트</strong>는 원유 가격의 대표 벤치마크입니다.
              유가가 오르면 운송·항공·화학 원가가 올라 <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>CPI·인플레</Link> 기대에도 영향을 줍니다.
              OPEC+, 중동 리스크, 미국 셰일 공급이 변수입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              ETF 예시: <strong style={{ color: "var(--text)" }}>USO</strong>(원유 선물 기반 — 장기 보유 시 롤오버 비용·추적 오차 주의),
              <strong style={{ color: "var(--text)" }}>XLE</strong>(에너지 <em>주식</em> 섹터).
              &ldquo;유가 ETF&rdquo;와 &ldquo;에너지 회사 주식 ETF&rdquo;는 다릅니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>롤오버</strong> —
              선물은 만기가 있어서, ETF가 만기 가까운 계약을 팔고 먼 계약을 사며 갈아탑니다.
              이 과정에서 비용·손실이 쌓여 장기 수익률이 현물 유가와 어긋날 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>농산물·산업금속</h2>
            <p className="text-sm leading-relaxed mb-3">
              농산물은 기후·수확·수출 규제가 가격을 흔듭니다.
              구리는 건설·전기·전기차 수요 때문에 &ldquo;경기 온도계&rdquo;로 자주 인용됩니다.
              개별 농산물 선물은 변동성이 매우 커서 초보 코어에는 맞지 않습니다.
            </p>
            <p className="text-sm leading-relaxed">
              분산용 바스켓: <strong style={{ color: "var(--text)" }}>DBC</strong>, <strong style={{ color: "var(--text)" }}>PDBC</strong> 등.
              코어는 여전히 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>주식 지수 ETF</Link>,
              원자재는 보통 <em>5% 내외 위성</em>이 현실적인 경우가 많습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>한국 투자자 체크리스트</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>미국 상장 원자재 ETF도 환율·양도·배당 과세 개념이 적용됩니다 (<Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>세금</Link>·<Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율</Link>)</li>
              <li>선물 기반 ETF는 장기 보유 시 추적 오차·롤 비용을 설명서에서 확인</li>
              <li>인플레 헤지 ≠ 타이밍 없는 올인</li>
              <li>레버리지·인버스 원자재는 단기용 — 장기 적립에 쓰지 않기</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["뉴스 보고 전량 금·유가", "지정학 헤드라인은 이미 가격에 반영된 경우가 많습니다."],
                ["USO를 10년 적립", "롤오버로 장기 성과가 현물과 크게 다를 수 있습니다."],
                ["원자재 = 안전", "천연가스·농산물은 주식보다 더 출렁일 수 있습니다."],
                ["주식 코어를 비우고 원자재만", "역할은 위성입니다. 분산이 목적이지 교체가 아닙니다."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>주식·채권·원자재를 한 테이블로</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>주식</strong> — 기업 이익·성장 기대. 장기 코어.</p>
              <p><strong style={{ color: "var(--text)" }}>채권</strong> — 이자·원금 상환 약속. 완충·인컴 (<Link href="/learn/bonds" style={{ color: "var(--mint)" }}>채권 가이드</Link>).</p>
              <p><strong style={{ color: "var(--text)" }}>원자재</strong> — 실물 수급. 인플레·지정학 위성.</p>
              <p>초보 포트폴리오는 &ldquo;주식 ETF 대부분 + 현금·채권 일부 + (선택) 금/원자재 소액&rdquo;이면 충분합니다.
                암호화폐는 성격이 또 다릅니다 (<Link href="/learn/crypto" style={{ color: "var(--mint)" }}>크립토 가이드</Link>).</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보 실습 — 오늘 할 일</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>관심 있는 것이 금인지, 유가인지, 바스켓(DBC)인지 한 가지만 고르기</li>
              <li>해당 ETF 설명서에서 &ldquo;현물인가 / 선물인가 / 총보수&rdquo; 확인</li>
              <li>전체 자산의 5%를 넘는 비중 계획을 일단 적지 않기</li>
              <li>매수 이유를 한 문장으로 — &ldquo;헤드라인이 무서워서&rdquo;는 이유에서 빼기</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 읽을 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/bonds" style={{ color: "var(--mint)" }}>채권·금리</Link> ·
              <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>CPI·연준</Link> ·
              <Link href="/learn/reits" style={{ color: "var(--mint)" }}>리츠</Link> ·
              <Link href="/learn/crypto" style={{ color: "var(--mint)" }}>암호화폐</Link> ·
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 원자재·선물 ETF는 변동성이 크며 특정 상품 권유가 아닙니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
