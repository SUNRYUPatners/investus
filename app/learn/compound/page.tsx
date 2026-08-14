import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "복리와 장기 투자 — 시간이 수익을 만드는 원리 | 인베스트어스",
  description:
    "단리 vs 복리, 숫자 예시, 72의 법칙, 복리를 깎는 비용·과매매, S&P500 역사와 변동성, DCA·DRIP·저비용 ETF, 현실적 기대, Investus 습관. 완전 초보용.",
  alternates: { canonical: "https://www.investus.kr/learn/compound" },
};

export default function CompoundPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>원리</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 24분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            복리와 장기 투자
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            아인슈타인이 &ldquo;8번째 불가사의&rdquo;라 불렀다는 복리는 마법이 아닙니다.
            <em>시간 × 수익을 다시 투자</em>하는 수학입니다.
            주식이 처음이어도 &ldquo;왜 오래 버티라고 하는지&rdquo;를 숫자로 이해할 수 있습니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>단리 vs 복리 — 한 문장으로</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>단리:</strong> 이자(수익)를 꺼내 쓰고, 다음 해에도 처음 원금만으로 이자를 계산.
              <strong style={{ color: "var(--text)" }}> 복리:</strong> 이자까지 다시 넣어 두어, 다음 해에는 &ldquo;원금+이자&rdquo;가 새 기준이 됨.
            </p>
            <p className="text-sm leading-relaxed">
              주식·ETF에서는 배당을 재투자하거나(
              <Link href="/learn/dividend" style={{ color: "var(--mint)" }}>DRIP</Link>
              ), 팔지 않고 평가액이 불어난 채로 두는 것이 복리에 가깝습니다.
              자주 팔아 현금을 빼면 복리 시계가 멈춥니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>숫자로 보는 차이 (세전·단순)</h2>
            <p className="text-sm leading-relaxed mb-3">
              가정: 시작 $10,000, 연 수익률 7%, 30년, 중간에 인출 없음.
              (실제 시장은 매년 7%가 아니고, 세금·수수료도 있습니다 — <em>감각용</em> 예시입니다.)
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed mb-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>단리 감각:</strong> 매년 원금의 7%만 → 30년 이자 합 $21,000대 → 합계 약 $31,000.</p>
              <p><strong style={{ color: "var(--text)" }}>복리:</strong> 이자가 이자를 낳음 → 대략 $76,000대.</p>
              <p>차이인 약 $45,000은 &ldquo;재능&rdquo;이 아니라 <em>재투자 + 시간</em>에서 옵니다.</p>
            </div>
            <p className="text-sm leading-relaxed">
              후반 10년이 전반 10년보다 절대 증가액이 큰 경우가 많습니다.
              그래서 &ldquo;나중에 목돈 되면 시작&rdquo;보다, 작은 금액이라도 <em>오늘</em> 시계를 켜는 편이 유리하다는 말이 나옵니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>72의 법칙 — 암산용</h2>
            <p className="text-sm leading-relaxed mb-3">
              대략식: <strong style={{ color: "var(--text)" }}>72 ÷ 연 수익률(%) ≈ 원금이 2배가 되는 데 걸리는 해</strong>.
              연 7%면 약 10년, 연 6%면 약 12년, 연 9%면 약 8년.
            </p>
            <p className="text-sm leading-relaxed">
              정확한 공학 계산기가 아닙니다. &ldquo;수익률이 1%p만 깎여도 배가 되는 시간이 길어진다&rdquo;는
              감각을 얻기 위한 도구입니다. 비용·세금이 수익률을 깎는 이유를 이해할 때 특히 유용합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>복리를 깎는 것들</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 mb-3">
              <li><strong style={{ color: "var(--text)" }}>잦은 매매</strong> — 수수료·스프레드·세금·나쁜 타이밍.{" "}
                <Link href="/learn/myths" style={{ color: "var(--mint)" }}>매일 봐야 돈 번다</Link>는 오해와 연결됩니다.</li>
              <li><strong style={{ color: "var(--text)" }}>높은 운용보수</strong> — 연 1%와 0.03%는 30년 후 결과가 크게 갈립니다.</li>
              <li><strong style={{ color: "var(--text)" }}>중도 전량 인출</strong> — 하락장 공포 매도는 복리 시계를 리셋합니다.</li>
              <li><strong style={{ color: "var(--text)" }}>레버리지 ETF 장기 보유</strong> —{" "}
                <Link href="/learn/etf" style={{ color: "var(--mint)" }}>변동성 감쇠</Link>로 지수와 괴리.</li>
            </ul>
            <p className="text-sm leading-relaxed">
              복리 친화 조합의 예:{" "}
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>저비용 지수 ETF</Link> +{" "}
              <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link> +{" "}
              <Link href="/learn/dividend" style={{ color: "var(--mint)" }}>DRIP</Link>.
              화려하지 않지만 실행이 쉽습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>비용 1%p의 위력 (감각)</h2>
            <p className="text-sm leading-relaxed mb-3">
              같은 $10,000을 30년, 한쪽은 연 7%, 한쪽은 비용 때문에 연 6%만 남는다고 단순 비교하면
              최종 금액 차이가 수만 달러 단위로 벌어질 수 있습니다(세전·가정).
              &ldquo;고작 1%&rdquo;가 장기에는 고작이 아닙니다.
            </p>
            <p className="text-sm leading-relaxed">
              그래서{" "}
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>에서
              운용보수(expense ratio)를 강조합니다. 한국 상장 해외 ETF와 미국 ETF 비교는{" "}
              <Link href="/learn/kr-us-etf" style={{ color: "var(--mint)" }}>KODEX·TIGER vs SPY</Link>도 참고.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>S&amp;P500과 역사 — 복리의 조건</h2>
            <p className="text-sm leading-relaxed mb-3">
              장기 미국 대형주 지수(
              <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>
              )의 과거 장기 평균으로 연 ~10%대(명목·세전)가 자주 인용됩니다.
              그 사이 약 −50% 급락도 있었습니다. 복리는 <em>변동성을 견디고 시간을 줬을 때</em> 의미가 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              숫자가 아무리 좋아도{" "}
              <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>심리</Link>가 무너져
              바닥에서 팔면 복리는 내 계좌에서 작동하지 않습니다.
              &ldquo;역사 평균&rdquo;은 버티는 사람의 통계에 가깝습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초기·중기·후기가 다르게 느껴지는 이유</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>초기:</strong> 절대 금액이 작아 &ldquo;복리가 안 보이는&rdquo; 구간.
              월급 적립(
              <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link>
              )으로 원금을 키우는 것이 체감에 더 큽니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>중기:</strong> 평가액이 커지며 연 변동 금액이 커집니다.
              −20%가 &ldquo;월급 몇 달분&rdquo;으로 보이기 시작 — 규칙을 미리 적어 두지 않으면 흔들립니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>후기:</strong> 인출·세금·자산 배분이 중요해집니다.
              무조건 &ldquo;안 팔기&rdquo;가 아니라{" "}
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>리밸런싱·현금 비중</Link>이
              목표에 맞게 바뀝니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>현실적 기대</h2>
            <p className="text-sm leading-relaxed mb-3">
              미래 30년이 과거 30년과 같다고 보장할 수 없습니다.
              인플레이션,{" "}
              <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율</Link>,{" "}
              <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>세금</Link>을 빼면
              체감 실질 수익률은 더 낮아질 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              복리는 &ldquo;부자 공식&rdquo;이라기보다,
              <strong style={{ color: "var(--text)" }}>규칙적인 저축·투자를 장기화할 때 켜지는 레버</strong>입니다.
              레버를 키우는 방법은 수익률 예측이 아니라, 비용·과매매·중도 포기라는 마찰을 줄이는 것입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
              <li>1~2년 성과로 &ldquo;복리 실패&rdquo; 판정</li>
              <li>고수익·레버리지로 복리를 &ldquo;가속&rdquo;하려다 원금 훼손</li>
              <li>배당을 생활비로 쓰면서도 복리 그래프만 기대</li>
              <li>하락장에 적립을 멈추고 현금만 보유 → 반등 구간 이탈</li>
              <li>세금·환율을 무시한 채 달러 차트만 자랑</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Investus에서 복리 습관 만들기</h2>
            <p className="text-sm leading-relaxed mb-3">
              홈에서{" "}
              <Link href="/learn/futures" style={{ color: "var(--mint)" }}>선물 온도</Link>만 짧게 보고,
              매수는 DCA 규칙·체크리스트에 맡기세요.
              일일 리포트는 &ldquo;매일 매매&rdquo;가 아니라 <em>맥락 유지</em>용입니다.
            </p>
            <p className="text-sm leading-relaxed">
              다음 읽기:{" "}
              <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립식</Link> →{" "}
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF</Link> →{" "}
              <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>매수 체크리스트</Link>.
              원리 → 실행 → 실수 방지 순서입니다.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 과거 수익률·복리 예시는 단순화·세전이며 미래 수익을 보장하지 않습니다. 투자 권유가 아닙니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
