import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "비트코인·암호화폐 투자 가이드 — ETF·리스크 | 인베스트어스",
  description: "비트코인·이더리움, 현물 ETF(IBIT·FBTC), 변동성·규제·포트폴리오 비중.",
  alternates: { canonical: "https://www.investus.kr/learn/crypto" },
};

export default function CryptoPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}>자산</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 17분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>비트코인·암호화폐 가이드</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            암호화폐는 주식과 다른 리스크 프로필입니다. 2024년 이후 미국 현물 비트코인 ETF 승인으로 접근성은 높아졌지만, 변동성·규제 이슈는 여전합니다.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>암호화폐란</h2>
            <p className="text-sm leading-relaxed mb-2">
              블록체인 위에서 거래되는 디지털 자산. <strong style={{ color: "var(--text)" }}>비트코인(BTC)</strong>은 디지털 금·가치 저장수단 프레임, <strong style={{ color: "var(--text)" }}>이더리움(ETH)</strong>은 스마트 계약·DeFi 플랫폼으로 자주 구분됩니다.
            </p>
            <p className="text-sm leading-relaxed">
              가격은 유동성·규제·ETF 수급·반감기(halving)·온체인 지표·거시(달러·금리)에 민감합니다. 주식 PER처럼 표준 밸류에이션이 없어 <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>심리·FOMO</Link> 비중이 큽니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>미국 현물 비트코인 ETF</h2>
            <p className="text-sm leading-relaxed mb-2">
              2024년 SEC 승인 이후 <strong style={{ color: "var(--text)" }}>IBIT</strong>(블랙록), <strong style={{ color: "var(--text)" }}>FBTC</strong>(피델리티), <strong style={{ color: "var(--text)" }}>GBTC</strong> 등 현물 BTC를 보유하는 ETF로 증권 계좌에서 거래 가능합니다.
            </p>
            <p className="text-sm leading-relaxed">
              장점: 콜드월렛·거래소 직접 관리 불필요, 일반 주식과 같은 세금·계좌 체계(한국 거주자는 <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>미국주식 세금 가이드</Link>와 유사 프레임). 단점: 운용보수, BTC 가격 그대로 추종(하락도 동일).
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>관련 미국 주식</h2>
            <p className="text-sm leading-relaxed mb-2">
              Investus에서 자주 보는 티커: <strong style={{ color: "var(--text)" }}>COIN</strong>(코인베이스), <strong style={{ color: "var(--text)" }}>MSTR</strong>(마이크로스트래티지·BTC 보유), <strong style={{ color: "var(--text)" }}>MARA</strong>/<strong style={{ color: "var(--text)" }}>RIOT</strong>(채굴).
            </p>
            <p className="text-sm leading-relaxed">
              이들은 BTC 가격에 민감하지만 레버리지·운영 리스크가 추가됩니다. BTC ETF와 동일 자산이 아닙니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>리스크</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li>일간 -20%도 흔한 변동성 — 생활비·비상금 투입 금지</li>
              <li>규제·거래소 해킹·스테이블코인 이슈</li>
              <li>레버리지 ETF(BITX 등) 장기 보유 부적합</li>
              <li>한국 거래소·해외 거래소 세금·신고 규정 별도 확인 필요</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>포트폴리오에 넣는다면</h2>
            <p className="text-sm leading-relaxed">
              많은 자산배분 연구에서 암호화폐는 <em>소수 비중 위성</em>(예: 전체의 1~5%, 본인 리스크 허용 범위 내)으로만 논의됩니다. 코어는 <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500</Link>·<Link href="/learn/etf" style={{ color: "var(--mint)" }}>글로벌 ETF</Link>가 일반적입니다. 올인·레버리지는 <Link href="/learn/compound" style={{ color: "var(--mint)" }}>복리</Link>를 깎는 패턴입니다.
            </p>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 암호화폐는 고위험 자산이며 투자·세무·법률 자문이 아닙니다. 손실 가능성을 전제로 하세요.
          </div>
        </article>
      </main>
    </div>
  );
}
