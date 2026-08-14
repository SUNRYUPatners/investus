import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "REITs 부동산 ETF 입문 — 금리·배당·VNQ를 초보도 | 인베스트어스",
  description:
    "리츠(REIT)가 무엇인지, 건물 직접 구매와 어떻게 다른지, 금리·공실·섹터 차이, VNQ·IYR과 세금까지 완전 초보용으로.",
  keywords: ["리츠", "REIT", "VNQ", "부동산 ETF", "IYR", "배당"],
  alternates: { canonical: "https://www.investus.kr/learn/reits" },
  openGraph: {
    title: "REITs 부동산 ETF 가이드 | 인베스트어스",
    description: "부동산에 간접 투자 — 구조·금리·비중",
    url: "https://www.investus.kr/learn/reits",
    type: "article",
  },
};

export default function ReitsPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(96,165,250,0.15)", color: "#60a5fa" }}>자산</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 22분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            REITs 부동산 ETF 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            건물을 사지 않고도, 주식처럼 거래하면서 부동산 임대 수익에 간접으로 노출되는 방법이 리츠입니다.
            &ldquo;부동산 = 안전&rdquo;만 믿으면 금리 인상기에 크게 놀랄 수 있습니다. 구조부터 차근히 봅시다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>REIT란 한 줄로</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>REIT(Real Estate Investment Trust)</strong> —
              오피스·아파트·창고·데이터센터·쇼핑몰 같은 부동(또는 부동산 대출)을 모아 운용하는 회사입니다.
              이익의 대부분을 배당으로 주도록 규정된 경우가 많아, 법인세 혜택을 받는 구조가 일반적입니다.
            </p>
            <p className="text-sm leading-relaxed">
              개인이 수십억짜리 건물을 사지 않아도, 거래소에서 리츠 주식·리츠 ETF를 소액으로 살 수 있습니다.
              가격은 주식처럼 매일 변동합니다. &ldquo;집값처럼 천천히만 움직인다&rdquo;는 착각을 조심하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>직접 부동산 vs 리츠</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>직접 구매</strong> — 대출·관리·공실·세금·환금성(팔기 어려움). 레버리지가 커 수익·손실도 큼.</p>
              <p><strong style={{ color: "var(--text)" }}>리츠</strong> — 소액·분산·유동성(장중 매매). 대신 주가 변동·금리 민감·배당 과세.</p>
              <p><strong style={{ color: "var(--text)" }}>숫자 감각</strong> — 현금 500만 원으로는 서울 아파트를 살 수 없지만, VNQ 같은 ETF는 살 수 있습니다.
                대신 &ldquo;내 명의 건물&rdquo;이 아니라 &ldquo;많은 건물에 쪼개 투자한 증권&rdquo;입니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>돈이 어디서 오나</h2>
            <p className="text-sm leading-relaxed mb-3">
              임차인이 내는 임대료 → 운영비·이자 차감 → 남는 현금의 상당 부분을 배당.
              주가 상승은 자산 가치·금리·성장 기대가 반영될 때 옵니다.
              그래서 리츠는 <Link href="/learn/dividend" style={{ color: "var(--mint)" }}>배당(인컴)</Link>과
              시세 차익을 함께 봅니다. 배당률만 높다고 좋은 것이 아닙니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>금리와 왜 엮이나</h2>
            <p className="text-sm leading-relaxed mb-3">
              리츠 회사는 건물을 사거나 리파이낸싱할 때 대출을 많이 씁니다.
              <strong style={{ color: "var(--text)" }}>금리↑</strong> → 이자 비용↑, 채권 대비 배당 매력↓ →
              밸류에이션 압박이 자주 나타납니다.
              <strong style={{ color: "var(--text)" }}>금리↓</strong>·완만한 성장이면 상대적으로 우호적일 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              2022년처럼 금리가 급등하면 리츠도 크게 빠진 구간이 있었습니다.
              &ldquo;리츠 = 항상 안전&rdquo;은 신화입니다.
              <Link href="/learn/bonds" style={{ color: "var(--mint)" }}>채권·10년물</Link>·
              <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>연준</Link>과 함께 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>섹터별로 성격이 다름</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>산업·물류</strong> — 이커머스·창고 수요</li>
              <li><strong style={{ color: "var(--text)" }}>주거·아파트</strong> — 인구·임대료 인상</li>
              <li><strong style={{ color: "var(--text)" }}>데이터센터</strong> — 클라우드·AI 수요, 전력·냉각 비용 리스크</li>
              <li><strong style={{ color: "var(--text)" }}>오피스</strong> — 재택근무로 구조적 압박이 큰 구간도 있음</li>
              <li><strong style={{ color: "var(--text)" }}>리테일·헬스케어</strong> — 점포·병원 임대 사이클</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              ETF 하나로 여러 섹터를 담으면 분산되지만, &ldquo;오피스만 아픈데 ETF 전체가 같이 출렁&rdquo;일 수도 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>대표 ETF</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>VNQ</strong> — 미국 리츠를 넓게</li>
              <li><strong style={{ color: "var(--text)" }}>IYR</strong> — 미국 부동산</li>
              <li><strong style={{ color: "var(--text)" }}>SCHH</strong> — 상대적으로 저비용 리츠</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              상품 비교 방법은 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>와 같습니다.
              운용보수·배당·추적 지수를 확인하세요.
              한국 거주자는 미국 상장 ETF 배당 원천징수·양도세 개념을
              <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>세금 가이드</Link>에서 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>포트폴리오에서 역할</h2>
            <p className="text-sm leading-relaxed mb-3">
              코어는 보통 <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>·
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>전세계·나스닥 지수 ETF</Link>입니다.
              리츠는 <em>인컴·부동산 노출용 위성</em>으로 소수 비중을 두는 경우가 많습니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>예시 (교육용)</strong> —
                전체의 5~10%만 리츠 ETF, 나머지는 주식·채권·현금.
                비중이 커지면 &ldquo;부동산 베팅&rdquo;이 되고, 금리 한 방에 심리가 무너지기 쉽습니다.
                리밸런싱은 <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오 전략</Link>을 참고.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["배당률만 보고 매수", "원금이 20% 빠지면 높은 배당도 의미가 흐려집니다."],
                ["집값과 리츠 주가를 동일시", "리츠는 매일 거래되는 증권입니다."],
                ["금리 뉴스를 무시", "리츠와 금리는 자주 같이 움직입니다."],
                ["ISA·연금에 넣기 전에 상품 유형 미확인", "국내 편입 가능 여부는 계좌·상품마다 다름 (ISA·연금 가이드)."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-3">
              세제혜택 계좌는 <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA·연금저축·IRP</Link>를 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>배당을 볼 때 추가로 볼 것</h2>
            <p className="text-sm leading-relaxed mb-3">
              리츠 배당수익률이 연 3~5%로 보이면 매력적으로 느껴질 수 있습니다.
              다만 (1) 배당이 삭감될 수 있고, (2) 주가가 빠지면 총수익이 마이너스일 수 있으며,
              (3) 한국 거주자는 미국 상장 ETF 배당에 원천징수 등이 붙을 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>숫자 예시</strong> —
              1,000만 원어치 리츠 ETF, 연 배당 4%(세전)면 Roughly 연 40만 원.
              같은 해 주가가 15% 빠지면 평가손실 약 150만 원 → 배당으로 메우기 어렵습니다.
              &ldquo;배당만 보고 올인&rdquo;이 위험한 이유입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보 실습</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>VNQ(또는 관심 리츠 ETF)의 상위 보유·섹터 비중 훑어보기</li>
              <li>최근 금리(10년물) 뉴스와 리츠 차트를 같은 기간으로만 비교해 보기</li>
              <li>목표 비중을 전체의 10% 이하로 적어 두기</li>
              <li>매수 전 <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>체크리스트</Link>에 &ldquo;인컴용 위성&rdquo;이라고 명시</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 읽을 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/dividend" style={{ color: "var(--mint)" }}>배당</Link> ·
              <Link href="/learn/bonds" style={{ color: "var(--mint)" }}>채권</Link> ·
              <Link href="/learn/commodities" style={{ color: "var(--mint)" }}>원자재</Link> ·
              <Link href="/learn/kr-us-etf" style={{ color: "var(--mint)" }}>한국 vs 미국 ETF</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 리츠·부동산 ETF 특정 종목 권유가 아니며, 원금 손실이 가능합니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
