import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "안전자산 탑10 해설 — 달러인덱스·TLT·GLD·SGOV 뜻 | 인베스트어스",
  description:
    "Investus 안전자산 탭의 달러인덱스, TLT·IEF·SHY·TIP·UUP·GLD·BND·SGOV·LQD가 각각 무엇을 뜻하는지, 만기·금리 민감도·포트폴리오 역할을 초보 눈높이로 설명합니다.",
  keywords: ["달러인덱스", "DXY", "TLT", "IEF", "SHY", "TIP", "UUP", "GLD", "BND", "SGOV", "LQD", "안전자산", "국채 ETF"],
  alternates: { canonical: "https://www.investus.kr/learn/safe-haven-etfs" },
  openGraph: {
    title: "안전자산 탑10 티커 해설 | 인베스트어스",
    description: "달러·국채·금 ETF 10개를 한 장에 정리",
    url: "https://www.investus.kr/learn/safe-haven-etfs",
    type: "article",
  },
};

const ROWS: { sym: string; name: string; what: string; when: string; risk: string }[] = [
  {
    sym: "달러인덱스",
    name: "DX-Y.NYB (DXY)",
    what: "달러가 유로·엔·파운드 등 6개 주요 통화 대비 얼마나 강한지 보여 주는 지수입니다. 직접 사는 상품이 아니라 ‘달러 체온계’에 가깝습니다.",
    when: "달러가 오르면 원자재·신흥국 자산에 압박이, 내려가면 그 반대가 나오는 날이 많습니다.",
    risk: "지수 자체는 투자 상품이 아님. UUP ETF로 추종 가능.",
  },
  {
    sym: "TLT",
    name: "미국 장기국채 ETF",
    what: "만기 20년 이상 미국 국채 묶음 ETF. 금리가 내리면 가격이 크게 오르고, 금리가 오르면 크게 빠집니다.",
    when: "금리 인하·경기 침체 기대 시 ‘채권 랠리’ 논의에 자주 등장합니다.",
    risk: "금리 민감도(듀레이션)가 매우 큼. ‘안전=안 떨어짐’이 아님.",
  },
  {
    sym: "IEF",
    name: "미국 중기국채 ETF",
    what: "만기 7~10년 미국 국채 ETF. TLT보다 만기가 짧아 금리 변동에 덜 흔들립니다.",
    when: "장기·단기 사이 ‘중간 지점’ 국채 노출을 원할 때.",
    risk: "TLT보다는 작지만 금리 상승기에는 여전히 하락 가능.",
  },
  {
    sym: "SHY",
    name: "미국 단기국채 ETF",
    what: "만기 1~3년 미국 국채 ETF. 이자 수익은 작지만 가격 변동이 상대적으로 완만합니다.",
    when: "주식 변동성이 클 때 현금 대용·완충재로 쓰는 경우가 많습니다.",
    risk: "수익률이 낮음. 인플레가 높으면 실질 가치는 깎일 수 있음.",
  },
  {
    sym: "TIP",
    name: "물가연동국채 ETF",
    what: "미국 물가연동국채(TIPS) ETF. 물가(CPI)가 오르면 원금·이자가 연동되어 인플레 헤지 성격이 있습니다.",
    when: "‘금리는 오르는데 물가도 높다’는 구간에서 일반 국채 대안으로 논의됩니다.",
    risk: "실질금리가 급등하면 TIP도 하락할 수 있음.",
  },
  {
    sym: "UUP",
    name: "달러 ETF",
    what: "달러인덱스(DXY) 움직임을 추종하려는 ETF. 달러 강세 베팅·헤지용.",
    when: "해외 주식·원자재를 보유한 한국 투자자가 달러 리스크를 줄이거나 늘리고 싶을 때 참고.",
    risk: "달러 약세 구간에서는 손실. 환헤지 대체 수단은 아님.",
  },
  {
    sym: "GLD",
    name: "금 ETF",
    what: "실물 금 가격을 추종하는 대표 ETF. 금괴를 담보로 거래됩니다.",
    when: "지정학·금융 불안, 실질금리 하락 기대 시 ‘전통적 안전자산’으로 수급이 몰리기도 합니다.",
    risk: "금도 하락 구간 있음. 배당 없음.",
  },
  {
    sym: "BND",
    name: "총채권 ETF",
    what: "미국 투자등급 채권 시장 전체(국채+우량 회사채)를 한 번에 담는 ETF. 채권 포트폴리오의 ‘기본 바구니’.",
    when: "개별 만기를 고르기 어려울 때 코어 채권 비중을 잡을 때.",
    risk: "금리·신용 리스크가 섞여 있음. TLT만큼 극단적이진 않음.",
  },
  {
    sym: "SGOV",
    name: "초단기국채 ETF",
    what: "만기 0~3개월 미국 국채( T빌 ) ETF. 사실상 단기 현금·머니마켓에 가깝습니다.",
    when: "금리가 높을 때 ‘놀고 있는 현금’에 이자를 붙이고 싶을 때.",
    risk: "수익은 Fed 금리에 연동. 주식 대체 수단은 아님.",
  },
  {
    sym: "LQD",
    name: "투자등급 회사채 ETF",
    what: "애플·마이크로소프트 등 신용등급이 높은 기업이 발행한 회사채 묶음 ETF. 국채보다 이자는 높고, 국채보다 신용 리스크는 있습니다.",
    when: "국채 수익이 낮을 때 ‘조금 더 이자’를 원할 때. 경기 둔화 시 스프레드 확대 주의.",
    risk: "경기 침체·신용 경색 시 국채보다 더 크게 하락할 수 있음.",
  },
];

export default function SafeHavenEtfsPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa" }}>안전자산</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 12분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            안전자산 탑10 — 달러·국채·금 ETF 한 장 정리
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Investus <Link href="/safe" style={{ color: "var(--mint)" }}>안전자산</Link> 탭 히트맵 세 번째 줄
            「안전자산 탑10」에 나오는 지표·ETF가 각각 무엇을 뜻하는지, 만기 길이와 금리 민감도 중심으로 정리했습니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              왜 이 10개인가?
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              주식·비트코인과 <strong style={{ color: "var(--text)" }}>다른 이유로 움직이는</strong> 자산을 한눈에 보기 위한 목록입니다.
              크게 <strong style={{ color: "var(--text)" }}>달러</strong>(환율),
              <strong style={{ color: "var(--text)" }}> 미국 국채</strong>(만기별),
              <strong style={{ color: "var(--text)" }}> 금</strong>,
              <strong style={{ color: "var(--text)" }}> 회사채</strong> 네 그룹으로 나뉩니다.
            </p>
            <div className="rounded-2xl p-4 border text-sm leading-relaxed space-y-2"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>만기 짧을수록</strong> → SHY, SGOV (가격 안정, 이자 낮음)</p>
              <p><strong style={{ color: "var(--text)" }}>만기 길수록</strong> → TLT (금리에 민감, 변동 큼)</p>
              <p><strong style={{ color: "var(--text)" }}>물가 헤지</strong> → TIP · <strong style={{ color: "var(--text)" }}>귀금속</strong> → GLD</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              티커별 해설
            </h2>
            <div className="flex flex-col gap-4">
              {ROWS.map((r) => (
                <div key={r.sym} className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-sm font-bold font-syne" style={{ color: "var(--mint)" }}>{r.sym}</span>
                    <span className="text-xs" style={{ color: "var(--muted)" }}>{r.name}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-2">{r.what}</p>
                  <p className="text-[12px] leading-relaxed mb-1">
                    <strong style={{ color: "var(--text)" }}>언제 주목?</strong> {r.when}
                  </p>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(239,68,68,0.85)" }}>
                    <strong>주의:</strong> {r.risk}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              초보자가 헷갈리는 포인트
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>달러인덱스 ≠ UUP</strong> — 하나는 지수(체온계), 하나는 그걸 추종하는 ETF입니다.</li>
              <li><strong style={{ color: "var(--text)" }}>TLT ≠ 안전 현금</strong> — 2022~2023처럼 금리 급등기에는 장기채 ETF가 크게 하락했습니다. (<Link href="/learn/bonds" style={{ color: "var(--mint)" }}>채권 가이드</Link>)</li>
              <li><strong style={{ color: "var(--text)" }}>LQD는 국채가 아님</strong> — 기업이 빌린 돈입니다. 경기가 나빠지면 국채보다 먼저 흔들릴 수 있습니다.</li>
              <li><strong style={{ color: "var(--text)" }}>SGOV·SHY</strong> — 수익은 작지만 ‘잠자는 돈’에 가깝습니다. 주식 대신 넣는 게 아니라 현금 일부를 굴리는 용도에 가깝습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>관련 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/safe-assets" style={{ color: "var(--mint)" }}>안전자산 가이드</Link>,
              <Link href="/learn/bonds" style={{ color: "var(--mint)" }}> 채권과 금리</Link>,
              <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}> 매크로·금리</Link>,
              <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}> 원·달러</Link>,
              <Link href="/learn/commodities" style={{ color: "var(--mint)" }}> 원자재·금</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. ETF는 원금 손실이 있을 수 있으며 투자·세무 자문이 아닙니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
