import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "선물·프리마켓 읽는 법 | 인베스트어스",
  description:
    "지수 선물이 무엇인지, ES·NQ와 S&P500·나스닥 차이, 프리·애프터마켓, 한국 아침 '선물 +1%' 해석법, 흔한 실수, 레버리지 ETF와의 차이, Investus 활용. 완전 초보용.",
  alternates: { canonical: "https://www.investus.kr/learn/futures" },
};

export default function FuturesPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8" }}>시장</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 22분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            선물·프리마켓 읽는 법
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            한국 시간 아침 뉴스의 &ldquo;나스닥 선물 +1%&rdquo;는
            <strong style={{ color: "var(--text)" }}>오늘 장 분위기의 힌트</strong>일 뿐, 종가 예언이 아닙니다.
            주식을 사기 전에 &ldquo;온도계&rdquo;로 읽는 법을 처음부터 배웁니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>선물(Futures)이란? (초보 정의)</h2>
            <p className="text-sm leading-relaxed mb-3">
              선물은 &ldquo;미래에 정해진 날·가격으로 어떤 자산을 사고팔겠다&rdquo;는 <em>계약</em>입니다.
              주식 자체를 지금 소유하는 것과 다릅니다. 지수·원유·금·금리 등 다양한 자산에 선물이 있습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              미국 주식 정규장이 닫혀 있어도 지수 선물은 거의 하루 종일 거래됩니다.
              그래서 밤사이 뉴스·해외 시장 충격이 먼저 <strong style={{ color: "var(--text)" }}>선물 가격</strong>에 반영되고,
              아침 뉴스에 &ldquo;선물 상승/하락&rdquo;으로 나옵니다.
            </p>
            <p className="text-sm leading-relaxed">
              입문자가 당장 선물 계좌를 개설할 필요는 없습니다.
              이 글의 목표는 <em>뉴스를 오해하지 않는 것</em>입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>ES·NQ — 뉴스에 자주 나오는 이름</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>ES</strong> — S&amp;P500 지수와 연결된 선물.
              <strong style={{ color: "var(--text)" }}> NQ</strong> — 나스닥100과 연결된 선물.
              미디어는 그냥 &ldquo;S&amp;P 선물&rdquo; &ldquo;나스닥 선물&rdquo;이라고 부릅니다.
            </p>
            <p className="text-sm leading-relaxed">
              지수 자체(
              <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>·{" "}
              <Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>나스닥</Link>
              )와 선물은 형제처럼 움직이지만, 계약·만기·거래 시간이 다릅니다.
              &ldquo;선물이 올랐다 = 내가 산 ETF가 이미 올랐다&rdquo;가 아닙니다. 정규장이 열리면 현물 지수·ETF가 따라가거나 어긋날 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>왜 초보에게 중요한가</h2>
            <p className="text-sm leading-relaxed mb-3">
              한국에 살면 미국 정규장(보통 밤 10시 30분~새벽, 서머타임에 따라 변동)을 못 보는 날이 많습니다.
              아침에 선물만 보고 &ldquo;오늘 사야지/팔아야지&rdquo;를 결정하기 쉬운데, 그게{" "}
              <Link href="/learn/myths" style={{ color: "var(--mint)" }}>타이밍 착각</Link>으로 이어집니다.
            </p>
            <p className="text-sm leading-relaxed">
              올바른 사용: <em>오늘 변동성이 클지 감을 잡기</em>,{" "}
              <Link href="/learn/economic-calendar" style={{ color: "var(--mint)" }}>경제지표</Link> 날인지와 겹치는지 확인,
              장기 적립 일정은 그대로 두기.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>숫자 예시: +1%의 의미</h2>
            <p className="text-sm leading-relaxed mb-3">
              가정: 전일 S&amp;P500 종가 5,000. 한국 아침 ES 선물이 약 +1%면 &ldquo;대략 5,050 부근 기대&rdquo;로 읽습니다.
              그런데 장중 실적·발언·지표가 나오면 종가는 +0.2%일 수도, −0.5%일 수도 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              선물 +1%를 보고 레버리지로 추격했다가, 장 시작 후 되돌림에 물리는 패턴이 흔합니다.
              <strong style={{ color: "var(--text)" }}>+1%는 &ldquo;확정 수익&rdquo;이 아니라 &ldquo;현재 기대&rdquo;</strong>입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>프리마켓·애프터마켓</h2>
            <p className="text-sm leading-relaxed mb-3">
              미국 정규장 전후에도 일부 주식·ETF가 거래됩니다(프리·애프터).
              거래량이 적어 <em>호가 스프레드</em>(사는 가격과 파는 가격 차이)가 넓습니다.
              같은 &ldquo;+5%&rdquo;라도 체결이 어렵거나, 정규장에서 바로 반납될 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              기업{" "}
              <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>실적 발표</Link>가
              장후에 나오면, 프리마켓에서 급등락이 먼저 보이기도 합니다.
              초보는 &ldquo;이미 올랐으니 놓친다&rdquo;는 느낌에 시장가로 뛰어들기보다, 정규장·지정가를 쓰는 편이 안전합니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>입문 규칙:</strong> 잘 모르는 장외 시간대 매매는 기본 끄기.
              유동성 있는 정규장 중심.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>선물 해석에서 흔한 실수</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 mb-3">
              <li>선물 +1% → 당일 종가도 +1% (X)</li>
              <li>선물만 보고 급매수·급매도 (X)</li>
              <li>
                <Link href="/learn/economic-calendar" style={{ color: "var(--mint)" }}>CPI·FOMC</Link> 직전·직후
                변동성을 무시 (X)
              </li>
              <li>개별 종목 프리마켓 급등을 지수 선물과 동일시 (X)</li>
              <li>선물 거래를 &ldquo;필수 스킬&rdquo;로 착각 — 장기 투자 코어와 무관</li>
            </ul>
            <p className="text-sm leading-relaxed">
              Investus 홈의 선물·지수는 &ldquo;오늘 온도&rdquo; 체크용입니다.
              매수 버튼의 대체물이 아닙니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>레버리지 선물 ETF와 혼동 금지</h2>
            <p className="text-sm leading-relaxed mb-3">
              개인이 지수 선물을 직접 증거금으로 거래하는 것과,
              TQQQ처럼 &ldquo;일일 배수&rdquo;를 추종하는 레버리지 ETF는 다릅니다.
              후자는{" "}
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>변동성 감쇠</Link> 때문에
              장기 코어로 부적합합니다.
            </p>
            <p className="text-sm leading-relaxed">
              &ldquo;선물로 3배&rdquo;라는 마케팅 문구에 속아 장기 적립에 레버리지를 넣지 마세요.
              코어는{" "}
              <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>·{" "}
              <Link href="/learn/nasdaq" style={{ color: "var(--mint)" }}>나스닥100</Link> ETF로 충분합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>한국 투자자 루틴 예시</h2>
            <ol className="list-decimal pl-5 text-sm leading-relaxed space-y-2 mb-3">
              <li>아침: Investus 홈에서 선물·전일 종가·환율만 30초</li>
              <li>오늘이{" "}
                <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>금리·물가</Link> 큰날인지 확인</li>
              <li>
                <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link> 날이면 규칙대로 매수 — 선물 등락으로 일정 연기하지 않기
              </li>
              <li>장중에 계속 보지 않기 —{" "}
                <Link href="/learn/compound" style={{ color: "var(--mint)" }}>복리</Link>는 과매매와 반대</li>
            </ol>
            <p className="text-sm leading-relaxed">
              환율까지 보려면{" "}
              <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>원/달러 가이드</Link>를 함께.
              선물 +1%여도 원화 기준으로는 다르게 느껴질 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>언제 &ldquo;조심&rdquo; 모드인가</h2>
            <p className="text-sm leading-relaxed mb-3">
              선물이 평소보다 크게(예: ±1.5% 이상) 움직이거나, 갭(전일 종가와 괴리)이 클 때,
              그리고 FOMC·CPI·대형 실적 시즌이 겹칠 때입니다.
              이때 새 레버리지·옵션은 특히 위험합니다.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>기억:</strong> 온도계가 &ldquo;덥다&rdquo;고 해서
              에어컨을 부술 필요는 없습니다. 옷차림(비중·레버리지)만 조절하면 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>선물 vs 내가 산 ETF — 한 장 정리</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed mb-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>지수 선물:</strong> 계약, 거의 24시간, 뉴스의 &ldquo;온도&rdquo;.</p>
              <p><strong style={{ color: "var(--text)" }}>현물 지수:</strong> S&amp;P500·나스닥100 숫자 자체 (정규장 중심).</p>
              <p><strong style={{ color: "var(--text)" }}>ETF (VOO·QQQ 등):</strong> 그 지수를 따라가는 상품 — 초보 코어.</p>
              <p><strong style={{ color: "var(--text)" }}>레버리지 ETF:</strong> 일일 배수 추종 — 장기 복리와 별개 ({" "}
                <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>).</p>
            </div>
            <p className="text-sm leading-relaxed">
              관련 글:{" "}
              <Link href="/learn/economic-calendar" style={{ color: "var(--mint)" }}>경제 캘린더</Link>·{" "}
              <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕</Link>·{" "}
              <Link href="/learn/myths" style={{ color: "var(--mint)" }}>초보 오해</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 선물·프리마켓 타이밍 매매를 권유하지 않습니다. 파생상품은 원금 초과 손실 위험이 있을 수 있습니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
