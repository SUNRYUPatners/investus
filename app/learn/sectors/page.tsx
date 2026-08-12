import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "미국 주식 11개 섹터 가이드 — 경기 국면별 읽는 법 | 인베스트어스",
  description:
    "GICS 11개 섹터(기술·헬스케어·금융·에너지 등)가 금리·경기와 어떻게 움직이는지, 입문자가 포트폴리오 쏠림을 피하는 법을 정리합니다.",
  keywords: ["미국 주식 섹터", "GICS", "섹터 로테이션", "기술주", "헬스케어", "금융주"],
  alternates: { canonical: "https://www.investus.kr/learn/sectors" },
  openGraph: {
    title: "미국 주식 섹터 가이드 | 인베스트어스",
    description: "GICS 11섹터와 포트폴리오 쏠림을 피하는 법",
    url: "https://www.investus.kr/learn/sectors",
    type: "article",
  },
};

const SECTORS = [
  { name: "정보기술 (IT)", when: "금리 하락·성장 기대. AI·클라우드 사이클에 민감.", ex: "NVDA, AAPL, MSFT", note: "나스닥100·QQQ 비중이 여기로 몰립니다." },
  { name: "커뮤니케이션", when: "광고·구독 경기. 빅테크 플랫폼과 겹칩니다.", ex: "GOOGL, META, NFLX", note: "IT와 함께 움직이면 ‘기술 집중’이 더 커집니다." },
  { name: "임의소비재", when: "고용·소비 심리. 고금리에 부담.", ex: "AMZN, TSLA, NKE", note: "성장주와 소비가 한 포트폴리오에 겹치기 쉽습니다." },
  { name: "필수소비재", when: "불황에도 수요가 상대적으로 안정.", ex: "WMT, COST, PG", note: "배당·방어 성향. 성장 속도는 느린 편." },
  { name: "헬스케어", when: "실적 방어 + 신약·보험 이슈.", ex: "LLY, UNH, JNJ", note: "개별 파이프라인 리스크는 큽니다." },
  { name: "금융", when: "금리·순이자마진·경기 회복.", ex: "JPM, BAC, GS", note: "나스닥100에는 거의 없습니다. S&P500에 더 있습니다." },
  { name: "에너지", when: "유가·지정학. 인플레 헤지 성격.", ex: "XOM, CVX", note: "기술 일변도 포트폴리오의 반대편." },
  { name: "산업재", when: "설비투자·인프라·항공방산.", ex: "CAT, GE, RTX", note: "경기 확장 후반에 주목받는 경우가 많습니다." },
  { name: "소재", when: "원자재·건설 수요.", ex: "LIN, SHW", note: "입문 개별주보다는 ETF 비중이 무난합니다." },
  { name: "유틸리티", when: "방어 + 금리에 민감한 배당주.", ex: "NEE", note: "고금리 구간에서는 부담이 될 수 있습니다." },
  { name: "부동산", when: "금리·공실·리츠 분배.", ex: "AMT, PLD", note: "세금·분배 성격이 일반 배당과 다를 수 있습니다." },
];

export default function SectorsPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(251,146,60,0.15)", color: "#fb923c" }}>섹터</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 17분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            미국 주식 11개 섹터 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            종목 이름만 보고 &ldquo;분산됐다&rdquo;고 느끼기 쉽습니다.
            Apple·Microsoft·NVIDIA·Amazon·Google을 동시에 들고 있으면 기업 수는 다섯이지만,
            실질적으로는 성장·기술 한 바구니에 가깝습니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>GICS가 나누는 이유</h2>
            <p className="text-sm leading-relaxed mb-3">
              S&amp;P와 MSCI가 쓰는 GICS(Global Industry Classification Standard)는 상장 기업을
              11개 섹터로 나눕니다. 지수·ETF·애널리스트 리포트가 같은 언어를 쓰기 위한 지도입니다.
            </p>
            <p className="text-sm leading-relaxed">
              Investus 홈의 섹터 흐름과 리포트의 &ldquo;업종&rdquo; 문단도 이 틀을 전제로 읽으면 이해가 빠릅니다.
              완벽한 예측 도구가 아니라, <strong style={{ color: "var(--text)" }}>쏠림을 보는 체크리스트</strong>로 쓰세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>11개 섹터 한눈에</h2>
            <div className="flex flex-col gap-2">
              {SECTORS.map((s) => (
                <div key={s.name} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{s.name}</p>
                  <p className="text-[12px] leading-relaxed mb-1">{s.when}</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>예: {s.ex} · {s.note}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] mt-2 leading-relaxed">
              예시 티커는 교육용이며 추천이 아닙니다. 구성은 시간에 따라 바뀝니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>입문자가 가장 많이 하는 쏠림</h2>
            <p className="text-sm leading-relaxed mb-3">
              한국 개인 해외주식 잔고는 빅테크·반도체에 치우치는 경향이 있습니다.
              여기에 QQQ까지 더하면 IT+커뮤니케이션+임의소비가 80%를 넘기도 합니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              S&amp;P500 ETF 하나면 11개 섹터가 시총 가중으로 들어갑니다.
              &ldquo;분산을 직접 설계&rdquo;하기 전에 코어를 지수 ETF로 두는 이유가 여기 있습니다.
              <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>
              ·<Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF</Link>
              ·<Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>나스닥</Link>을 이어서 읽으세요.
            </p>
            <p className="text-sm leading-relaxed">
              개별 기술주를 이미 많이 샀다면, 같은 방향의 섹터 ETF를 또 사는 것은 분산이 아닙니다.
              자산 탭에서 종목별 비중을 보고 IT+커뮤니케이션 합이 얼마인지 한 번만 계산해 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>섹터 로테이션을 쫓지 않아도 되는 이유</h2>
            <p className="text-sm leading-relaxed mb-3">
              &ldquo;지금은 금융, 다음에는 에너지&rdquo;처럼 로테이션을 맞추는 전략은 기관 리서치에도 나오지만,
              개인이 매매 비용·세금·타이밍 오차까지 이기기는 어렵습니다.
            </p>
            <p className="text-sm leading-relaxed">
              입문 단계에서는 코어 지수를 유지하고, 위성을 한두 섹터만, 전체의 소수 비중으로 두는 편이 낫습니다.
              리밸런싱 주기는{" "}
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오 전략</Link>을 참고하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>금리 한 줄로 다시 보기</h2>
            <p className="text-sm leading-relaxed mb-3">
              금리가 오르면 성장주(먼 미래 이익) 배수가 압박받고, 은행 순이자마진·달러 강세 이야기가 붙습니다.
              금리가 내리면 그 반대 서사가 나옵니다. 다만 실제 장에서는 실적·지정학이 서사를 덮습니다.
            </p>
            <p className="text-sm leading-relaxed">
              Investus 홈의 금리·지수·섹터와 인사이트 리포트를 같이 보면,
              &ldquo;오늘 기술만 빠졌다&rdquo;가 금리 이슈인지 개별 실적인지 구분하기 쉽습니다.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 특정 섹터·종목 투자 권유가 아니며 원금 손실이 가능합니다.
          </div>
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
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>포트폴리오 분산 전략</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>비중·리밸런싱</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/etf" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📦</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>미국 ETF 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>섹터 ETF vs 지수 ETF</p>
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
