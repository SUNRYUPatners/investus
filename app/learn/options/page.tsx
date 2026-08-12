import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "옵션 기초 가이드 — 콜·풋·IV·만기 | 인베스트어스",
  description: "콜옵션·풋옵션, 행사가·만기, 내재변동성(IV) 개념. 교육용 — 레버리지 위험 포함.",
  alternates: { canonical: "https://www.investus.kr/learn/options" },
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(168,85,247,0.15)", color: "#a855f7" }}>파생</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 16분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>옵션 기초 가이드</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            옵션은 권리를 사고파는 계약입니다. 뉴스·실적 시즌에 자주 나오지만, 레버리지·시간 가치 소멸로 원금 전액 손실이 가능합니다. 아래는 <em>용어 이해</em>용입니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>콜·풋</h2>
            <p className="text-sm leading-relaxed mb-2">
              <strong style={{ color: "var(--text)" }}>콜(Call)</strong> — 정해진 가격(행사가)에 <em>살 수 있는</em> 권리. 주가↑ 때 유리.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>풋(Put)</strong> — 정해진 가격에 <em>팔 수 있는</em> 권리. 주가↓ 때 유리. 헤지용으로도 쓰입니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>행사가·만기·프리미엄</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li>행사가(Strike) — 권리를 행사할 수 있는 가격</li>
              <li>만기(Expiration) — 권리가 소멸하는 날</li>
              <li>프리미엄 — 옵션을 사기 위해 지불하는 가격</li>
            </ul>
            <p className="text-sm leading-relaxed mt-2">
              만기까지 주가가 유리한 방향으로 안 가면, 산 옵션의 가치는 0에 가까워질 수 있습니다. 주식 보유와 달리 &ldquo;버티면 본전&rdquo;이 아닙니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>IV (내재변동성)</h2>
            <p className="text-sm leading-relaxed mb-2">
              Implied Volatility — 옵션 가격에 녹아 있는 &ldquo;앞으로의 변동성 기대&rdquo;. 실적 발표 전에는 IV가 올라 프리미엄이 비싸지는 경우가 많습니다.
            </p>
            <p className="text-sm leading-relaxed">
              발표 직후 주가가 올라도 IV가 급락(IV Crush)하면 콜 매수자가 손해를 볼 수 있습니다. 변동성 자체도 상품입니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>입문자가 피해야 할 것</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li>만기 임박 0DTE 올인 매매</li>
              <li>이해 없이 숏(매도) — 손실이 이론상 무제한인 전략도 있음</li>
              <li>레버리지 ETF와 옵션을 혼동</li>
              <li>유튜브 &ldquo;확정 수익&rdquo; 전략 그대로 복제</li>
            </ul>
            <p className="text-sm leading-relaxed mt-2">
              장기 투자 코어는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF</Link>·<Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link>가 훨씬 단순합니다. 옵션은 <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>심리</Link> 함정이 큰 영역입니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>한국 투자자</h2>
            <p className="text-sm leading-relaxed">
              미국 주식 옵션은 증권사·자격·증거금 요건이 다릅니다. 세금·거래 가능 여부도 국내 규정·증권사 정책을 확인하세요. 이 글은 매매 권유가 아닙니다.
            </p>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 옵션은 고위험·원금 전액 손실 가능. 투자·세무 자문 아님.
          </div>
        </article>
      </main>
    </div>
  );
}
