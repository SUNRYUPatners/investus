import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "투자 심리·행동재무 — 완전 초보 가이드 (FOMO·손실 회피) | 인베스트어스",
  description:
    "FOMO, 손실 회피, 확증 편향, 공포·탐욕 등 초보가 빠지기 쉬운 심리를 쉬운 말로 설명하고, 숫자 예시와 규칙으로 막는 방법을 정리합니다.",
  keywords: ["투자 심리", "행동재무", "FOMO", "손실 회피", "공포탐욕", "확증 편향"],
  alternates: { canonical: "https://www.investus.kr/learn/investing-psychology" },
  openGraph: {
    title: "투자 심리 초보 가이드 | 인베스트어스",
    description: "FOMO·손실 회피·규칙을 완전 초보 눈높이로",
    url: "https://www.investus.kr/learn/investing-psychology",
    type: "article",
  },
};

export default function InvestingPsychologyPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>심리</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 22분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            투자 심리·행동재무 — 완전 초보 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            차트와 PER을 외우는 것보다, &ldquo;내가 왜 지금 사고 싶은지&rdquo;를 아는 편이 수익률에 더 큰 영향을 줄 때가 많습니다.
            아래는 흔한 함정과, 감정 대신 <em>규칙</em>으로 막는 방법입니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>행동재무가 뭔가요?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>행동재무(behavioral finance)</strong>는
              &ldquo;사람은 항상 이성적으로 투자하지 않는다&rdquo;는 사실을 연구하는 분야입니다.
              두려움을 느낄 때 파는 것, 남이 벌었다는 말에 쫓아가는 것 — 둘 다 정상 뇌의 반응에 가깝습니다.
            </p>
            <p className="text-sm leading-relaxed">
              왜 배우나요? 좋은 ETF를 골라도, 하락장에 팔고 고점에 다시 사면
              <Link href="/learn/compound" style={{ color: "var(--mint)" }}> 복리</Link>가 끊깁니다.
              전략보다 먼저 &ldquo;나를 지키는 규칙&rdquo;이 필요합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>FOMO — 놓칠까 봐 두려운 마음</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>FOMO</strong>는 Fear Of Missing Out의 약자입니다.
              &ldquo;나만 소외되는 것 같다&rdquo;는 느낌으로, 이미 많이 오른 자산에 뒤늦게 올인하게 만듭니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>예시</p>
              <p>단톡방에 &ldquo;○○ +80%&rdquo; 인증이 뜹니다. 생활비까지 끌어와 같은 종목을 삽니다.
                이미 많은 기대가 가격에 들어 있을 수 있고, 이후 -30%만 와도 심리가 무너집니다.</p>
              <p><strong style={{ color: "var(--text)" }}>막는 규칙</strong> — 충동 매수는 24시간 보류. <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>체크리스트</Link> 7개 이상 &ldquo;예&rdquo;가 아니면 사지 않기. 코어는 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립</Link>만.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>손실 회피 — 잃은 게 더 아프게 느껴진다</h2>
            <p className="text-sm leading-relaxed mb-3">
              연구에 자주 나오는 이야기: 같은 금액이라도 <em>잃는 고통</em>이 <em>얻는 기쁨</em>보다 크게 느껴진다는 것입니다.
              그래서 -20% 종목을 &ldquo;본전까지&rdquo; 붙잡고, -50%까지 가는 경우가 생깁니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>숫자로 보는 회복</p>
              <p>100만 원 → 80만 원(-20%)이 되려면, 다시 100만 원이 되기 위해 약 +25%가 필요합니다.</p>
              <p>100만 원 → 50만 원(-50%)이면, 본전 회복에 <strong style={{ color: "var(--text)" }}>+100%</strong>가 필요합니다. 같은 &ldquo;본전&rdquo;이라도 깊을수록 회복이 어렵습니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              코어 지수 ETF는 장기·적립이 기본이고, 위성 개별주는 &ldquo;-25%면 재평가 회의&rdquo;처럼
              <em>미리</em> 규칙을 적어두세요. 감정이 뜨거울 때는 규칙을 새로 만들지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>확증 편향 — 듣고 싶은 말만 듣기</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>확증 편향</strong>은 내가 산 종목에 유리한 뉴스만 찾고, 불리한 정보는 무시하는 경향입니다.
              유튜브·단톡은 이 편향을 키우기 쉽습니다.
            </p>
            <p className="text-sm leading-relaxed">
              실전 팁: 매수 전에 &ldquo;이 투자가 틀릴 수 있는 이유 3가지&rdquo;를 의무적으로 적습니다.
              <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무 숫자</Link>가 스토리와 다르면 스토리를 의심하세요.
              기관이 샀다고 무조건 따라가지 않기 — <Link href="/learn/13f-guide" style={{ color: "var(--mint)" }}>13F 가이드</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>공포와 탐욕의 사이클</h2>
            <p className="text-sm leading-relaxed mb-3">
              시장은 반복해서 &ldquo;다 끝났다&rdquo;와 &ldquo;이번엔 다르다&rdquo; 사이를 오갑니다.
              <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕지수</Link>는 그 온도를 숫자로 보여주는 <em>참고</em> 지표입니다. 매수·매도 버튼이 아닙니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>극단 공포</strong> — 적립을 <em>유지</em>하는 편이 DCA 취지에 맞습니다. 증액은 &ldquo;평소의 1.2배까지&rdquo;처럼 미리 정한 규칙이 있을 때만.</li>
              <li><strong style={{ color: "var(--text)" }}>극단 탐욕</strong> — 신규 테마·레버리지 베팅을 자제. 리밸런싱으로 비중만 맞추기 (<Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오</Link>).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>멘탈 회계·과신·군중</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>멘탈 회계</strong> — &ldquo;보너스니까 날려도 된다&rdquo;고 더 위험한 베팅. 돈은 출처와 무관하게 같은 돈입니다.</li>
              <li><strong style={{ color: "var(--text)" }}>과신</strong> — 두세 번 수익 나면 &ldquo;나는 감을 안다&rdquo;고 레버리지. <Link href="/learn/myths" style={{ color: "var(--mint)" }}>초보 오해</Link>와 겹칩니다.</li>
              <li><strong style={{ color: "var(--text)" }}>군중</strong> — 모두가 같은 이야기를 할 때일수록, 이미 가격에 많이 반영됐을 수 있습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>감정을 이기는 실전 규칙 예시</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>투자 원금·최대 허용 손실을 <em>숫자</em>로 적기 (예: 투자금의 -30%면 전략 재검토).</li>
              <li>코어 / 위성 비중 상한 — 예: 개별주 합 20% 이내.</li>
              <li>포트폴리오 점검은 주 1회 이하. 앱 알림을 끄세요.</li>
              <li>뉴스·단톡 헤드라인으로 당일 매매 금지.</li>
              <li>매수는 <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>체크리스트</Link> 통과 후에만.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["하락장에 적립 중단", "수량이 많아지는 구간에서 멈추면 DCA가 무력화됩니다."],
                ["본전 올 때까지 존버만", "위성 종목의 ‘본전 집착’은 기회비용과 추가 하락을 키울 수 있습니다. 규칙을 따르세요."],
                ["수익 나면 과신 → 레버리지", "짧은 행운을 실력으로 착각하기 쉽습니다."],
                ["철학을 장이 좋을 때만 읽음", "나쁜 날에 쓸 매뉴얼을 평온할 때 적어 두세요."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>대가들도 심리와 싸웠다</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/value-investing" style={{ color: "var(--mint)" }}>버핏·그레이엄·막스</Link> 같은 이름들이 반복하는 말은
              &ldquo;시장과 싸우지 말라&rdquo;, &ldquo;나쁜 날은 온다&rdquo;입니다.
              철학 문장은 자랑이 아니라, 공포가 올 때 꺼내는 비상 매뉴얼입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 할 일</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>노트에 &ldquo;나의 3가지 금지 행동&rdquo;을 적기 (예: 레버리지, 단톡 추격, 생활비 투입).</li>
              <li><Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>매수 체크리스트</Link>를 휴대폰에 북마크.</li>
              <li>코어 ETF 적립일을 달력에 고정 (<Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link>).</li>
              <li><Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕</Link>은 참고만, 버튼으로 쓰지 않기.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>관련 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>매수 체크리스트</Link>,
              <Link href="/learn/myths" style={{ color: "var(--mint)" }}> 초보 오해</Link>,
              <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}> 공포탐욕</Link>,
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}> 포트폴리오</Link>,
              <Link href="/learn/value-investing" style={{ color: "var(--mint)" }}> 가치투자</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 심리 상담·치료가 아니며 투자 권유가 아닙니다. 원금 손실이 가능합니다.
          </div>
        </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/buy-checklist" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">✅</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>매수 전 체크리스트</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>FOMO로 사기 전에</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/dca" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📅</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>적립식 투자(DCA)</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>감정을 줄이는 실행법</p>
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
