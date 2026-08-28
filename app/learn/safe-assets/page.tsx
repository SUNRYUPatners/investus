import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "안전자산 가이드 — 비트코인·이더리움·금·은을 초보도 이해하게 | 인베스트어스",
  description:
    "안전자산이란 무엇인지, 비트코인·이더리움과 금·은이 왜 다르게 움직이는지, 금리·달러·ETF 수급, 포트폴리오 비중까지 초보 눈높이로 설명합니다.",
  keywords: ["안전자산", "비트코인", "이더리움", "금", "은", "금 투자", "BTC", "ETH", "실질금리"],
  alternates: { canonical: "https://www.investus.kr/learn/safe-assets" },
  openGraph: {
    title: "안전자산 가이드 — BTC·ETH·금·은 | 인베스트어스",
    description: "가상화폐와 현물을 나눠 보는 초보용 한 장 정리",
    url: "https://www.investus.kr/learn/safe-assets",
    type: "article",
  },
};

export default function SafeAssetsPage() {
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
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 24분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            안전자산 가이드 — 비트코인·이더리움·금·은
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            &ldquo;안전자산&rdquo;이라는 말은 자주 쓰이지만, 비트코인과 금은 같은 날이어도 방향이 갈라질 수 있습니다.
            두 그룹을 나눠 보고, 금리·달러·수급을 공통 체크리스트로 잡는 법을 정리합니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              안전자산이란? (오해부터)
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              흔히 안전자산이라고 하면 &ldquo;절대 안 떨어진다&rdquo;는 뜻으로 오해하기 쉽습니다.
              실제로는 <strong style={{ color: "var(--text)" }}>주식과 다른 이유로 움직이는 자산</strong>을
              묶어 부르는 말에 가깝습니다. 손실이 없다는 보장은 없습니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>가상화폐</strong> — 비트코인, 이더리움 등. 위험선호(risk-on)·ETF 수급·규제에 민감.</p>
              <p><strong style={{ color: "var(--text)" }}>현물·귀금속</strong> — 금, 은 등. 실질금리·달러·지정학에 더 가까운 날도 많음.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              Investus 미리보기 안전자산 탭은 가상화폐 탑5와 현물 탑5를 같이 보여 줍니다.
              <Link href="/preview/safe" style={{ color: "var(--mint)" }}> /preview/safe</Link>
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              비트코인(BTC) — 디지털 금? 위험자산?
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              비트코인은 &ldquo;디지털 금&rdquo;으로도, &ldquo;위험자산&rdquo;으로도 이야기됩니다.
              금리 인하 기대가 커지면 주식과 같이 오르기도 하고, 불안이 커지면 금과 같이 움직이기도 합니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>ETF 수급</strong> — 현물 ETF로 기관 돈이 들어오면 가격 이야기에 자주 등장</li>
              <li><strong style={{ color: "var(--text)" }}>매크로</strong> — 달러·금리 (<Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>금리 가이드</Link>)</li>
              <li><strong style={{ color: "var(--text)" }}>변동성</strong> — 하루에도 크게 출렁일 수 있음</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              더 자세한 용어·ETF·비중은 <Link href="/learn/crypto" style={{ color: "var(--mint)" }}>비트코인·암호화폐 가이드</Link>를 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              이더리움(ETH) — 비트코인과 다른 점
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              이더리움은 스마트 계약·온체인 앱이 돌아가는 플랫폼으로 자주 설명됩니다.
              비트코인과 &ldquo;같은 코인&rdquo;이 아닙니다. 리스크온 구간에서 비트보다 베타(변동성)가 크게 느껴지는 날도 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              초보가 처음 공부할 때는 BTC 개념과 &ldquo;내 전체 자산 중 크립토 비중&rdquo;만으로도 충분합니다.
              알트·밈코인은 정보·유동성 리스크가 더 클 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              금(Gold) — 실질금리와 달러
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              금은 이자가 없는 자산이라, <strong style={{ color: "var(--text)" }}>실질금리가 내려가면</strong>
              상대 매력이 커지는 경우가 많습니다. 달러가 약해질 때도 힘을 받는 구간이 있습니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>인플레이션·지정학 헤지로 자주 거론</li>
              <li>중앙은행 매입 뉴스가 중장기 이야기로 등장</li>
              <li>금리가 다시 올라가면 조정도 나옴 — &ldquo;항상 오른다&rdquo; 아님</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              ETF·원자재 맥락은 <Link href="/learn/commodities" style={{ color: "var(--mint)" }}>원자재 가이드</Link>에서 이어집니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              은(Silver) — 금과 같이, 산업도 같이
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              은은 금과 같이 움직이는 날이 많지만, <strong style={{ color: "var(--text)" }}>산업 수요</strong>
              (전자·태양광 등)가 붙으면 금과 벌어지기도 합니다. 변동성이 금보다 크게 느껴지는 구간도 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              초보자는 &ldquo;금의 동생&rdquo;으로만 보지 말고, 산업 사이클이 섞인다는 점만 기억해도 충분합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              한눈에 보는 공통 변수
            </h2>
            <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <div className="flex flex-col gap-2 text-sm">
                {[
                  ["금리·실질금리", "금·은에 특히 중요"],
                  ["달러(DXY)", "달러 강세면 원자재 압박되는 날도"],
                  ["위험선호", "BTC·ETH가 주식과 동행하는 날"],
                  ["ETF 플로우", "크립토·금 ETF 자금 유출입"],
                  ["지정학", "안전자산 수요 급증 구간"],
                ].map(([t, d]) => (
                  <div key={t} className="flex gap-2">
                    <span className="font-bold flex-shrink-0" style={{ color: "var(--text)", minWidth: 100 }}>{t}</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              포트폴리오에 넣을 때
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>주식 코어와 분리해 <strong style={{ color: "var(--text)" }}>위성 비중</strong>으로 잡기</li>
              <li>크립토와 금을 한 바구니 &ldquo;안전자산 100%&rdquo;로 몰지 않기</li>
              <li>원금 전액 손실을 감수할 수 있는 금액만 (<Link href="/learn/crypto" style={{ color: "var(--mint)" }}>크립토 가이드</Link>)</li>
              <li>매수 전 <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>체크리스트</Link> 통과</li>
            </ol>
            <p className="text-sm leading-relaxed mt-3">
              분산·리밸런싱은 <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오 전략</Link>을 참고하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>관련 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/crypto" style={{ color: "var(--mint)" }}>암호화폐</Link>,
              <Link href="/learn/safe-haven-etfs" style={{ color: "var(--mint)" }}> 안전자산 탑10 해설</Link>,
              <Link href="/learn/commodities" style={{ color: "var(--mint)" }}> 원자재</Link>,
              <Link href="/learn/bonds" style={{ color: "var(--mint)" }}> 채권</Link>,
              <Link href="/learn/korea-stocks" style={{ color: "var(--mint)" }}> 한국주식</Link>,
              <Link href="/learn/korea-real-estate" style={{ color: "var(--mint)" }}> 한국 부동산</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 암호화폐·원자재는 고변동 자산일 수 있으며 투자·세무 자문이 아닙니다.
          </div>
          </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/crypto" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">₿</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>비트코인·암호화폐 상세</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>ETF·비중·리스크</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/commodities" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🛢️</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>원자재 가이드</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>금·유가·ETF</p>
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
