import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "가치투자·대가 전략 가이드 — 버핏·그레이엄·린치·보글 | 인베스트어스",
  description: "워런 버핏, 벤저민 그레이엄, 피터 린치, 존 보글, 레이 달리오, 하워드 막스 등 전설적 투자가의 핵심 원칙을 한국 투자자 눈높이로 정리합니다.",
  alternates: { canonical: "https://www.investus.kr/learn/value-investing" },
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(212,175,55,0.15)", color: "#d4af37" }}>철학</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 17분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>가치투자·대가 전략 가이드</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            &ldquo;대가 따라하기&rdquo;는 종목 추천이 아닙니다. 시장이 흔들릴 때 버티는 <em>원칙</em>을 배우는 일입니다.
            아래는 Investus 편집팀이 각 투자가의 핵심만 추린 교육용 정리입니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>워런 버핏 — 좋은 기업을 합리적 가격에</h2>
            <p className="text-sm leading-relaxed">
              버핏의 핵심은 &lsquo;경제적 해자(moat)&rsquo;가 있는 기업을 싸게 사서 오래 보유하는 것입니다. 브랜드·네트워크·규모·전환 비용이 높은 사업은 경쟁자가 따라오기 어렵습니다. &lsquo;주식시장은 단기적으로 투표기, 장기적으로 저울&rsquo;이라는 말처럼, 단기 뉴스보다 5~10년 이익 창출력을 봅니다. 레버리지·낯선 산업·모르는 테마는 피합니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>벤저민 그레이엄 — 안전마진</h2>
            <p className="text-sm leading-relaxed">
              가치투자의 아버지 그레이엄은 &lsquo;내재가치 대비 충분히 싼 가격&rsquo;을 안전마진이라 불렀습니다. PER·PBR만 보는 숫자 놀이가 아니라, 자산·이익·부채를 보수적으로 추정한 뒤 할인율을 요구합니다. 버핏도 초기에는 그레이엄식 &lsquo;시gar(저평가주)&rsquo;를 했고, 이후 &lsquo;훌륭한 기업을 적당한 가격에&rsquo;로 확장했습니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>찰리 멍거 — 다중 사고 모델</h2>
            <p className="text-sm leading-relaxed">
              멍거는 한 가지 지표에 집착하지 말고 심리·경제·역사·경쟁 구조를 함께 보라고 했습니다. &lsquo;역발상&rsquo; — 모두가 탐욕일 때 조심하고, 모두가 공포일 때 기회를 찾는 태도. 버핏과 함께 코카콜라·애플 같은 &lsquo;이해 가능한&rsquo; 대형주 집중 투자로 유명합니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>피터 린치 — 아는 것에 투자</h2>
            <p className="text-sm leading-relaxed">
              매그ellan 펀드 13년 연복리 약 29%의 린치는 일상에서 좋은 제품·서비스를 발견해 조사하라고 했습니다. &lsquo;10배터&rsquo; — 작은 기업이 10배 성장할 여지. 다만 성장주는 PER이 높아질 수 있고, 스토리만 믿고 재무를 안 보면 위험합니다. 개별주 위성은{" "}
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 코어</Link> 위에서만.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>존 보글 — 비용과 인덱스</h2>
            <p className="text-sm leading-relaxed">
              뱅가드 창설자 보글은 &lsquo;시장을 이기려 하지 말고 시장을 소유하라&rsquo;고 했습니다. 운용보수·거래비용·세금이 장기 수익을 갉아먹는다는 통찰은 ETF 적립(
              <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link>
              )과 직결됩니다. SPY·VOO·VTI 같은 저비용 지수 ETF가 그의 유산입니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>레이 달리오 — 올웨더·원칙</h2>
            <p className="text-sm leading-relaxed">
              브리지워터 창립자 달리오는 경제가 &lsquo;성장↑/↓ × 인플레↑/↓&rsquo; 네 구간으로 움직인다고 봅니다. 주식만 들고 있으면 특정 구간에서 크게 아픕니다. 채권·금·원자재 등 상관관계가 다른 자산을 섞는{" "}
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>분산</Link> 사고가 핵심입니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>하워드 막스 — 리스크와 사이클</h2>
            <p className="text-sm leading-relaxed">
              오크트리 창립자 막스는 &lsquo;수익률 극대화&rsquo;보다 &lsquo;나쁜 날 버티기&rsquo;를 강조합니다. 2차적 사고 — &lsquo;남들이 생각하는 것&rsquo;이 아니라 &lsquo;남들이 생각하는 것에 대해 어떻게 생각하는가&rsquo;.{" "}
              <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>심리</Link>와{" "}
              <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕</Link>을 함께 읽으세요.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>필립 피셔·짐 로저스 — 성장과 매크로</h2>
            <p className="text-sm leading-relaxed">
              피셔는 R&amp;D·경영진·성장성을 &lsquo;스커틀버트&rsquo;로 조사해 우량 성장주를 오래 보유했습니다. 로저스는 원자재·신흥국 등 장기 사이클에 베팅하는 매크로 투자자로, 개인에게는 &lsquo;한 사이클에 올인&rsquo;보다 코어 지수 + 소액 위성이 현실적입니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>한국 투자자에게 적용하기</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed">
              <li>코어: S&amp;P500 또는 전세계 지수 ETF + 저비용</li>
              <li>위성: 이해한 개별주·섹터, 전체의 소수 비중</li>
              <li>밸류: <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER·PBR</Link>, <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link>로 숫자 확인</li>
              <li>심리: 규칙 없는 매매는 대가 철학도 못 구합니다</li>
            </ul>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 과거 대가의 성과는 미래를 보장하지 않으며, 특정 종목·전략 권유가 아닙니다.
          </div>
        </article>
      </main>
    </div>
  );
}
