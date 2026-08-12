import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "나스닥(NASDAQ) 완전 가이드 — 나스닥100·QQQ·기술주 투자 | 인베스트어스",
  description:
    "나스닥 종합지수와 나스닥100의 차이, QQQ 투자 시 주의점, S&P500과의 비교, 변동성이 큰 이유를 한국 투자자 눈높이로 설명합니다.",
  keywords: ["나스닥", "NASDAQ", "나스닥100", "QQQ", "기술주", "나스닥 지수"],
  alternates: { canonical: "https://www.investus.kr/learn/nasdaq" },
  openGraph: {
    title: "나스닥 완전 가이드 | 인베스트어스",
    description: "나스닥 vs 나스닥100, QQQ, S&P500 비교",
    url: "https://www.investus.kr/learn/nasdaq",
    type: "article",
  },
};

export default function NasdaqPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(96,165,250,0.15)", color: "#60a5fa" }}>지수</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 16분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            나스닥(NASDAQ) 완전 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            한국 투자자가 &ldquo;나스닥&rdquo;이라고 말할 때, 거래소·종합지수·나스닥100을 섞어 부르는 경우가 많습니다.
            무엇을 추종하는 ETF를 사느냐에 따라 성과가 달라집니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>세 가지를 구분하기</h2>
            <div className="flex flex-col gap-3">
              {[
                ["나스닥 거래소", "미국 전자 거래소. 기술·성장 기업이 많이 상장되어 있지만, 금융·소비재도 있습니다. Apple·Microsoft·NVIDIA 등이 여기 상장되어 있습니다."],
                ["나스닥 종합지수 (Composite)", "나스닥에 상장된 수천 종목을 아우르는 지수. 소형주까지 포함되어 변동 요인이 많습니다. 뉴스 헤드라인의 ‘나스닥’이 종종 이 숫자입니다."],
                ["나스닥100 (NDX)", "금융주를 제외한 대형 100종목. QQQ가 주로 따라가는 대상입니다. 한국 투자자가 ETF로 가장 많이 사는 ‘나스닥’은 사실 이쪽에 가깝습니다."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>왜 S&P500보다 출렁이나</h2>
            <p className="text-sm leading-relaxed mb-3">
              나스닥100은 정보기술·커뮤니케이션·임의소비 비중이 높습니다.
              금리, 성장 기대, AI 사이클에 민감합니다. 상승장에서는 S&amp;P500을 앞서는 구간이 많고,
              긴축·실적 쇼크 구간에서는 낙폭이 더 클 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              S&amp;P500은 에너지·금융·헬스케어·필수소비 등이 더 섞여 있어, 같은 &ldquo;미국 대형주&rdquo;라도
              경기 민감도가 다릅니다. 나스닥100만 들고 있으면 기술 조정이 곧 포트폴리오 조정이 됩니다.
            </p>
            <p className="text-sm leading-relaxed">
              &ldquo;나스닥 = 무조건 더 좋은 투자&rdquo;는 아닙니다. 코어를 S&amp;P500에 두고,
              성장 노출을 나스닥100으로 일부 더하는 배분이 입문자에게 흔합니다.
              자세한 지수 비교는 <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500 가이드</Link>를 함께 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>QQQ를 살 때</h2>
            <p className="text-sm leading-relaxed mb-3">
              QQQ는 나스닥100을 추종하는 대표 ETF입니다. 유동성이 좋고 인지도가 높습니다.
              운용보수·구성 비중은 운용사 자료에서 확인하세요. 동일 지수를 추종하는 다른 ETF도 있습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              상위 종목 집중도가 높으면, 소수 메가캡이 성과를 좌우합니다.
              &ldquo;100개라서 충분히 분산됐다&rdquo;고 착각하지 마세요.
              이미 AAPL·MSFT·NVDA 개별주를 많이 들고 있다면 QQQ를 추가하는 순간 기술 비중이 한 번에 커집니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              레버리지 나스닥 ETF는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>에서 설명한
              변동성 감쇠 문제가 더 두드러질 수 있습니다. 적립 대상으로 TQQQ를 고르는 것은 권하지 않습니다.
            </p>
            <p className="text-sm leading-relaxed">
              QQQM처럼 보수가 더 낮은 나스닥100 ETF를 비교해 보는 것도 장기 적립에서는 의미가 있습니다.
              유동성(스프레드)과 국내 증권사 거래 가능 여부를 함께 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>선물·프리마켓과 나스닥</h2>
            <p className="text-sm leading-relaxed mb-3">
              한국 아침 뉴스의 &ldquo;나스닥 선물&rdquo;은 정규장 시작 전 온도입니다.
              선물이 올랐다고 당일 종가까지 올린다는 뜻은 아닙니다.
              Investus 홈의 선물·지수 영역은 개장 전 점검을 위해 두었습니다.
            </p>
            <p className="text-sm leading-relaxed">
              프리·애프터 마켓에서 개별 기술주가 크게 움직이는 날이 있습니다.
              유동성이 얇아 스프레드가 벌어지니, 입문자는 정규장 지정가를 기본으로 하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>금리·실적 시즌에 일어나는 일</h2>
            <p className="text-sm leading-relaxed mb-3">
              성장주는 먼 미래 이익을 현재 가치로 할인합니다. 금리가 오르면 할인율이 커져
              같은 실적이라도 주가 배수가 줄어들 수 있습니다. 그래서 FOMC·CPI 날에 나스닥이
              S&amp;P500보다 더 크게 반응하는 경우가 많습니다.
            </p>
            <p className="text-sm leading-relaxed">
              빅테크 실적 주간에는 소수 종목이 지수 전체를 끌어올리거나 끌어내립니다.
              &ldquo;나스닥이 빠졌다&rdquo;고만 보지 말고, 상위 종목 뉴스를 같이 확인하세요.
              Investus 검색에서 해당 티커 차트와 뉴스를 열어 보면 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>포트폴리오에 넣는 법</h2>
            <p className="text-sm leading-relaxed mb-3">
              예시(교육용): 코어 S&amp;P500 70% + 나스닥100 20% + 현금 10%.
              기술주 개별 종목을 이미 많이 들고 있다면 QQQ를 추가하면 집중도가 더 올라갑니다.
              자산 탭에서 섹터·종목 비중을 보고{" "}
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>분산 전략</Link>
              ·<Link href="/learn/sectors" style={{ color: "var(--mint)" }}>섹터 가이드</Link>와 맞춰 보세요.
            </p>
            <p className="text-sm leading-relaxed">
              적립으로 넣을 거면 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA 가이드</Link>의
              &ldquo;종목을 매달 바꾸지 않기&rdquo; 규칙을 그대로 적용하세요. 나스닥만 적립할지, S&amp;P와 나눠 적립할지는
              한 번만 정하고 최소 1년은 유지하는 편이 낫습니다.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적 정보이며 특정 지수·ETF 투자 권유가 아닙니다. 원금 손실이 가능합니다.
          </div>
        </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/sp500" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📈</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>S&P500 완전 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>미국 경제의 온도계</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/etf" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📦</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>미국 ETF 완전 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>QQQ·레버리지 함정</p>
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
