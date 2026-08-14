import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "매수 전 체크리스트 10가지 — 완전 초보 가이드 | 인베스트어스",
  description:
    "미국주식·ETF를 사기 전에 비중·이유·밸류·세금·환율·심리를 점검하는 10가지 질문을 완전 초보도 따라 할 수 있게 설명합니다. 숫자 예시와 흔한 실수 포함.",
  keywords: ["매수 체크리스트", "투자 규칙", "미국주식 매수", "FOMO 방지", "포트폴리오 비중"],
  alternates: { canonical: "https://www.investus.kr/learn/buy-checklist" },
  openGraph: {
    title: "매수 전 체크리스트 초보 가이드 | 인베스트어스",
    description: "사기 전에 적을 10가지 규칙 — 비중·숫자·세금·심리",
    url: "https://www.investus.kr/learn/buy-checklist",
    type: "article",
  },
};

export default function BuyChecklistPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>습관</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 20분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            매수 전 체크리스트 10가지 — 완전 초보 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            단톡·유튜브·급등 차트에 손이 먼저 갈 때, 이 목록이 브레이크입니다.
            규칙은 <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>심리</Link>를 이기는 도구이지, 완벽한 종목을 찾는 시험이 아닙니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>체크리스트를 쓰는 이유</h2>
            <p className="text-sm leading-relaxed mb-3">
              초보가 돈을 잃는 흔한 패턴은 &ldquo;공부를 안 해서&rdquo;가 아니라
              <strong style={{ color: "var(--text)" }}> 감정이 뜨거울 때 규칙을 건너뛰어서</strong>입니다.
              비행기 조종사가 이륙 전 목록을 읽듯, 매수 전에도 같은 질문을 반복하면 실수가 줄어듭니다.
            </p>
            <p className="text-sm leading-relaxed">
              사용법: 휴대폰 메모에 10문항을 복사해 두고, 매수 버튼 전에 &ldquo;예/아니오&rdquo;만 표시하세요.
              <strong style={{ color: "var(--text)" }}>7개 미만이 &ldquo;예&rdquo;</strong>이면 오늘은 사지 않고,
              코어 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립</Link>만 유지하는 것을 권장 규칙으로 둡니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>1~3. 포지션 — 비중과 돈의 출처</h2>
            <div className="rounded-2xl p-4 border space-y-3 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>1. 코어인가, 위성인가?</strong><br />
                코어 = 오래 들고 갈 중심(예: S&amp;P500 ETF). 위성 = 테마·개별주·소비중 실험.
                구분이 안 되면 사지 마세요. 설명은 <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오 전략</Link>.</p>
              <p><strong style={{ color: "var(--text)" }}>2. 비중 상한은?</strong><br />
                예: 전체 투자금 1,000만 원일 때 개별주 하나 100만 원(10%) 초과 금지.
                &ldquo;이번에만 20%&rdquo;가 쌓이면 한 종목 리스크가 계좌를 지배합니다.</p>
              <p><strong style={{ color: "var(--text)" }}>3. 살 돈은 비상금·생활비와 분리됐나?</strong><br />
                3~6개월 생활비는 투자하지 않습니다. 카드값·월세를 미루며 사는 매수는 지속 불가능합니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>4~6. 숫자 — 이유와 반대 시나리오</h2>
            <div className="rounded-2xl p-4 border space-y-3 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>4. 한 문장으로 사는 이유?</strong><br />
                &ldquo;친구가 올랐대&rdquo;는 이유가 아닙니다. 예: &ldquo;저비용 S&amp;P500 ETF를 10년 적립한다&rdquo;,
                &ldquo;매출이 3년 연속 늘고 FCF가 양수인 회사를 위성 5%로 산다&rdquo;.</p>
              <p><strong style={{ color: "var(--text)" }}>5. 밸류·상품 구조를 봤나?</strong><br />
                개별주: <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER 등</Link>과 업종 비교.
                ETF: 추적 지수·운용보수·레버리지 여부 (<Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>).
                레버리지·인버스는 &ldquo;장기 적립용&rdquo;이 아닌 경우가 많습니다.</p>
              <p><strong style={{ color: "var(--text)" }}>6. 반대 시나리오 3가지를 적었나?</strong><br />
                예: 금리 급등, 실적 미스, 규제·환율 악화.
                적을 수 없으면 확증 편향일 수 있습니다 — <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>투자 심리</Link>.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              실적 발표 직전이라면 <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>실적 시즌</Link> 체크도 함께.
              재무 숫자 위치는 <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>7~8. 비용·세금·계좌</h2>
            <div className="rounded-2xl p-4 border space-y-3 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>7. 환율·수수료를 감안했나?</strong><br />
                같은 미국 주식도 원/달러에 따라 원화 손익이 달라집니다.
                <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율 가이드</Link>.
                환전·거래 수수료가 크면 &ldquo;하루에 여러 번 쪼개 사기&rdquo;가 독이 될 수 있습니다.</p>
              <p><strong style={{ color: "var(--text)" }}>8. 계좌는 어디가 맞나?</strong><br />
                일반 계좌 vs ISA·연금저축·IRP — 세금·한도가 다릅니다.
                <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA·연금</Link>,
                <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>미국주식 세금</Link>,
                국내 상장 해외 ETF는 <Link href="/learn/kr-us-etf" style={{ color: "var(--mint)" }}>한국 vs 미국 ETF</Link>.</p>
            </div>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed mt-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>숫자 감각 (개념용)</p>
              <p>100만 원을 사고, 왕복 수수료·환전 스프레드가 합쳐 1%면 시작부터 약 1만 원이 비용입니다.
                자주 사고팔수록 <Link href="/learn/compound" style={{ color: "var(--mint)" }}>복리</Link>를 깎습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>9~10. 심리와 출구</h2>
            <div className="rounded-2xl p-4 border space-y-3 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>9. 자극으로 산 건 아닌가?</strong><br />
                뉴스 속보, 단톡 인증, &ldquo;오늘만&rdquo; 카피.
                <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕</Link>이 극단 탐욕일수록 신규 베팅을 의하세요.</p>
              <p><strong style={{ color: "var(--text)" }}>10. -20% / +30% 때 할 행동을 적었나?</strong><br />
                예: 코어 ETF는 적립 유지·리밸런싱만.
                위성은 -25%면 재평가 회의, +30%면 비중 상한까지 일부 익절 등.
                &ldquo;그때 가서 생각&rdquo;은 계획이 아닙니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>한 장으로 보는 10문항</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>코어 / 위성 구분이 명확한가?</li>
              <li>비중 상한 안인가?</li>
              <li>비상금·생활비와 분리됐나?</li>
              <li>사는 이유를 한 문장으로 쓸 수 있나?</li>
              <li>밸류 또는 ETF 구조(보수·레버리지)를 봤나?</li>
              <li>반대 시나리오 3가지를 적었나?</li>
              <li>환율·수수료를 감안했나?</li>
              <li>계좌(일반·ISA·연금)가 맞나?</li>
              <li>자극(단톡·급등)으로 산 게 아닌가?</li>
              <li>-20%·+30% 행동을 미리 적었나?</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>상황별 빠른 가이드</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>지수 ETF 적립일</strong> — 1~3, 7~8만 빠르게 확인해도 되는 경우가 많습니다. 매달 테마를 바꾸지 마세요.</li>
              <li><strong style={{ color: "var(--text)" }}>개별주 첫 매수</strong> — 10문항 전부. 실적 시즌이면 가이던스까지.</li>
              <li><strong style={{ color: "var(--text)" }}>암호화폐·레버리지</strong> — 위성 + 더 낮은 비중. <Link href="/learn/crypto" style={{ color: "var(--mint)" }}>크립토 가이드</Link>·옵션은 별도 고위험.</li>
              <li><strong style={{ color: "var(--text)" }}>배당 목적</strong> — 수익률만 보지 말고 지속성·세금 (<Link href="/learn/dividend" style={{ color: "var(--mint)" }}>배당 가이드</Link>).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["체크리스트를 ‘나중에’로 미룸", "미루는 순간이 바로 FOMO 구간입니다. 북마크해 두세요."],
                ["‘예’를 억지로 맞춤", "스스로 속이면 의미가 없습니다. 애매하면 ‘아니오’."],
                ["코어와 위성을 섞어 생각", "적립용 ETF에 단타 규칙을 적용하거나, 테마주에 10년 존버만 외치면 어긋납니다."],
                ["세금·계좌를 나중에", "세후 수익률이 달라집니다. 사기 전에 한 번만 확인하세요."],
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
              <li>위 10문항을 메모장에 붙여 넣기.</li>
              <li>본인 비중 상한 숫자를 채우기 (예: 개별주 합 15%).</li>
              <li><Link href="/learn/us-stock-basics" style={{ color: "var(--mint)" }}>미국주식 입문</Link>으로 계좌·수수료 기초 복습.</li>
              <li>매수 습관은 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link>와 <Link href="/learn/myths" style={{ color: "var(--mint)" }}>초보 오해</Link>를 이어서 읽기.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>관련 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>투자 심리</Link>,
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}> 포트폴리오</Link>,
              <Link href="/learn/valuation" style={{ color: "var(--mint)" }}> 밸류</Link>,
              <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}> 세금</Link>,
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}> ETF</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 매수·매도 권유가 아니며 원금 손실이 가능합니다. 세금은 세무 자문이 아닙니다.
          </div>
        </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/investing-psychology" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🧠</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>투자 심리·행동재무</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>FOMO·손실 회피</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/portfolio-strategy" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">💼</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>포트폴리오 분산·리밸런싱</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>코어·위성 비중</p>
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
