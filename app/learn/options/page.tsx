import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "옵션 기초 — 콜·풋·행사가·IV를 초보도 이해하게 | 인베스트어스",
  description:
    "옵션이 무엇인지, 콜·풋·행사가·만기·프리미엄·내재변동성을 숫자 예시로. 고위험·교육용 안내. 매매 권유 아님.",
  keywords: ["옵션", "콜옵션", "풋옵션", "IV", "내재변동성", "행사가", "프리미엄"],
  alternates: { canonical: "https://www.investus.kr/learn/options" },
  openGraph: {
    title: "옵션 기초 가이드 | 인베스트어스",
    description: "콜·풋·IV — 용어 이해용, 고위험",
    url: "https://www.investus.kr/learn/options",
    type: "article",
  },
};

export default function OptionsPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(168,85,247,0.15)", color: "#a855f7" }}>파생</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 22분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            옵션 기초 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            옵션은 &ldquo;나중에 어떤 가격에 사거나 팔 수 있는 <em>권리</em>&rdquo;를 사고파는 계약입니다.
            뉴스·실적 시즌에 자주 나오지만, 시간 가치 소멸·레버리지로 <strong style={{ color: "var(--text)" }}>원금 전액 손실</strong>이 가능합니다.
            아래는 <em>용어를 이해하기 위한</em> 교육용 글입니다. 매매를 권하지 않습니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>주식과 무엇이 다른가</h2>
            <p className="text-sm leading-relaxed mb-3">
              주식을 사면 그 회사의 지분을 갖습니다. 가격이 내려도 &ldquo;버티면 본전&rdquo;을 기대하는 사람이 많습니다(보장 아님).
            </p>
            <p className="text-sm leading-relaxed">
              옵션을 <em>산</em> 사람은 권리를 위해 <strong style={{ color: "var(--text)" }}>프리미엄</strong>(보험료 같은 돈)을 냅니다.
              만기까지 유리한 상황이 안 되면 그 프리미엄은 0에 가까워질 수 있습니다.
              &ldquo;오래 들고 있으면 회복&rdquo;이 기본값이 아닙니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>콜(Call)·풋(Put)</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>콜옵션</strong> —
              정해진 가격(행사가)에 기초자산(예: 주식·ETF)을 <em>살 수 있는</em> 권리.
              주가가 크게 오를 때 유리해지는 방향입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>풋옵션</strong> —
              정해진 가격에 <em>팔 수 있는</em> 권리.
              주가가 크게 내릴 때 유리. 보유 주식을 보험처럼 헤지할 때도 쓰입니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>숫자 예시 (매우 단순화)</strong></p>
              <p>어떤 주식이 지금 $100입니다. 행사가 $105 콜을 프리미엄 $3에 샀다고 합시다.</p>
              <p>만기에 주가가 $120이면, $105에 살 수 있는 권리가 대략 $15만큼 가치 있어 보입니다(수수료·세부 무시).
                $3를 냈으니 이익 감각은 $12 근처.</p>
              <p>만기에 주가가 $100에 머물면, $105에 살 이유는 없고 콜 가치는 0 → 낸 $3는 전부 손실에 가깝습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>행사가·만기·프리미엄</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>행사가(Strike)</strong> — 권리를 행사할 수 있는 약속 가격</li>
              <li><strong style={{ color: "var(--text)" }}>만기(Expiration)</strong> — 권리가 끝나는 날. 지나면 소멸</li>
              <li><strong style={{ color: "var(--text)" }}>프리미엄</strong> — 옵션을 사기 위해 지불하는 가격</li>
              <li><strong style={{ color: "var(--text)" }}>내가격·외가격</strong> — 지금 당장 행사하면 이득인지(내가격) / 아닌지(외가격)</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              만기가 가까울수록 <strong style={{ color: "var(--text)" }}>시간 가치</strong>가 빨리 줄어드는 경향이 있습니다(세타).
              &ldquo;조금만 더 기다리면&rdquo;이 오히려 가치를 깎을 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>IV(내재변동성)</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>IV(Implied Volatility)</strong>는
              옵션 가격에 녹아 있는 &ldquo;앞으로 얼마나 출렁일까&rdquo;에 대한 시장의 기대입니다.
              실적 발표·대형 이벤트 전에는 IV가 올라 프리미엄이 비싸지는 경우가 많습니다.
            </p>
            <p className="text-sm leading-relaxed">
              발표 직후 주가가 올라도 IV가 급락하면(<strong style={{ color: "var(--text)" }}>IV Crush</strong>)
              콜을 산 사람이 손해를 볼 수 있습니다. &ldquo;방향만 맞으면 된다&rdquo;가 통하지 않는 이유입니다.
              <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>실적 시즌</Link>과 함께 읽으세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>사는 쪽 vs 파는 쪽</h2>
            <p className="text-sm leading-relaxed mb-3">
              옵션을 <em>매수</em>하면 최대 손실은 (대개) 낸 프리미엄으로 제한되는 전략이 많습니다.
              옵션을 <em>매도(숏)</em>하면 프리미엄을 받지만, 전략에 따라 손실이 이론상 매우 커질 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              초보가 유튜브에서 &ldquo;옵션 팔아서 매달 수익&rdquo;만 보고 따라 하면 위험합니다.
              이해·증거금·자격 없이 숏에 들어가면 안 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>입문자가 피해야 할 것</h2>
            <div className="flex flex-col gap-3">
              {[
                ["0DTE(만기 당일) 올인", "시간 가치가 순식간에 사라집니다. 도박에 가깝습니다."],
                ["이해 없이 숏", "손실이 감당 불능일 수 있습니다."],
                ["레버리지 ETF와 혼동", "TQQQ와 옵션은 다른 상품입니다."],
                ["생활비·비상금으로 매매", "심리와 가계가 동시에 무너집니다."],
                ["'확정 수익' 전략 복제", "과거 백테스트 ≠ 미래."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>장기 투자와의 관계</h2>
            <p className="text-sm leading-relaxed mb-3">
              Investus가 초보에게 권하는 코어는
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>저비용 지수 ETF</Link> +
              <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립</Link> +
              <Link href="/learn/compound" style={{ color: "var(--mint)" }}>시간</Link>입니다.
              옵션은 그 위에 올리는 고급·고위험 도구이며, 없어도 충분히 투자할 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              심리 함정이 큰 영역입니다. <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>투자 심리</Link>·
              <Link href="/learn/myths" style={{ color: "var(--mint)" }}>초보 오해</Link>를 먼저 읽으세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>한국 투자자 참고</h2>
            <p className="text-sm leading-relaxed">
              미국 주식·ETF 옵션은 증권사마다 거래 가능 여부·자격·증거금이 다릅니다.
              세금·양도 규정도 국내 규정·증권사 정책을 확인해야 합니다.
              이 글은 자격 안내·세무 자문·매매 권유가 아닙니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>뉴스에서 옵션이 나올 때 읽는 법</h2>
            <p className="text-sm leading-relaxed mb-3">
              &ldquo;콜 매수 급증&rdquo; = 일부 트레이더가 상승에 베팅한다는 뜻이지, 주가가 반드시 오른다는 뜻이 아닙니다.
              &ldquo;풋으로 헤지&rdquo; = 하락 보험을 산다는 뜻이지, 폭락이 확정됐다는 뜻이 아닙니다.
            </p>
            <p className="text-sm leading-relaxed">
              초보는 헤드라인을 <em>분위기 힌트</em>로만 두고, 포트폴리오 비중은
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>분산·리밸런싱</Link> 규칙으로 유지하세요.
              옵션 미결제약정·이상한 티커를 쫓아갈 필요는 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>배움 순서 (매매 전)</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>주식·ETF·수수료·세금 기초 (<Link href="/learn/us-stock-basics" style={{ color: "var(--mint)" }}>입문</Link>)</li>
              <li>이 글의 콜·풋·만기·프리미엄·IV 용어 정리</li>
              <li>모의/페이퍼로만 손익 구조를 그려 보기 (실전 금지 권장)</li>
              <li>그래도 관심이 있으면 증권사 교육·자격 요건을 <em>직접</em> 확인 — 이 앱이 대신해 주지 않음</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 읽을 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF</Link> ·
              <Link href="/learn/technical-analysis" style={{ color: "var(--mint)" }}>기술적 분석</Link> ·
              <Link href="/learn/fear-greed" style={{ color: "var(--mint)" }}>공포탐욕</Link> ·
              <Link href="/learn/us-stock-basics" style={{ color: "var(--mint)" }}>미국주식 입문</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 옵션은 고위험이며 원금 전액 손실이 가능합니다. 투자·세무 자문이 아닙니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
