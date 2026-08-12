import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "ISA·연금저축·IRP 가이드 — 한국 계좌와 미국주식 | 인베스트어스",
  description: "개인종합자산관리계좌(ISA), 연금저축, IRP와 미국 ETF·주식 투자, 세제 혜택 개념.",
  alternates: { canonical: "https://www.investus.kr/learn/korea-accounts" },
};

export default function KoreaAccountsPage() {
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(248,113,113,0.15)", color: "#f87171" }}>세금</span>
          <span className="text-[10px] ml-2" style={{ color: "var(--muted)" }}>읽는 시간: 18분</span>
          <h1 className="text-xl font-bold font-syne leading-snug mt-3 mb-3" style={{ color: "var(--text)" }}>ISA·연금저축·IRP 가이드</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            미국주식을 살 때 &ldquo;어떤 계좌로?&rdquo;가 세후 수익률을 바꿉니다. 한국 세제혜택 계좌와 해외주식 직접투자 계좌를 구분해 보세요.
          </p>
        </div>
        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>먼저 구분하기</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
              <li><strong style={{ color: "var(--text)" }}>일반 위탁계좌</strong> — 해외주식(미국) 직접 매매, 환전 필요</li>
              <li><strong style={{ color: "var(--text)" }}>ISA</strong> — 국내·해외 금융상품, 비과세·세액공제 혜택</li>
              <li><strong style={{ color: "var(--text)" }}>연금저축</strong> — 노후 연금, 세액공제 + 연금 수령 시 세금</li>
              <li><strong style={{ color: "var(--text)" }}>IRP</strong> — 퇴직금·개인 추가 납입, 연금저축과 유사 프레임</li>
            </ul>
            <p className="text-sm leading-relaxed mt-2">
              세율·한도·상품 목록은 <em>매년 정책이 바뀔 수 있습니다</em>. 아래는 개념 정리이며, 개설 전 증권사·은행 안내와 국세청 자료를 확인하세요.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>ISA (개인종합자산관리계좌)</h2>
            <p className="text-sm leading-relaxed mb-2">
              하나의 계좌에서 예금·펀드·ETF·일부 해외 ETF 등을 운용. <strong style={{ color: "var(--text)" }}>일반형</strong>과 <strong style={{ color: "var(--text)" }}>서민형</strong> 등 유형별 비과세 한도·납입 한도가 다릅니다.
            </p>
            <p className="text-sm leading-relaxed mb-2">
              장점: 만기(3년 등) 유지 시 수익에 대한 비과세·추가 세액공제(조건 충족 시). 단점: 납입 한도, 만기 전 해지 시 혜택 소멸, 편입 가능 상품이 증권사·유형마다 다름.
            </p>
            <p className="text-sm leading-relaxed">
              미국 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>S&amp;P500 ETF</Link>를 ISA로 살 수 있는지는 <em>해외 ETF 편입 여부</em>를 확인해야 합니다. 직접 AAPL 매수가 가능한 ISA 상품도 있으나 증권사별 상이합니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>연금저축펀드·연금저축계좌</h2>
            <p className="text-sm leading-relaxed mb-2">
              연간 납입 한도(세액공제 대상, 소득·나이별 상한) 내 납입 시 <strong style={{ color: "var(--text)" }}>세액공제</strong>(예: 12~15%대, 소득구간·유형에 따라 다름). 펀드·ETF·예금 등 편입.
            </p>
            <p className="text-sm leading-relaxed mb-2">
              55세 이후 연금 형태로 수령 시 연금소득세(3.3~5.5% 등 분리과세 구간) 적용. 중도 인출 시 세제 불이익.
            </p>
            <p className="text-sm leading-relaxed">
              장기 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립식</Link>·노후 자금에 적합. 단기 매매·미국 개별주 직접 투자 목적과는 성격이 다를 수 있습니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>IRP (개인형 퇴직연금)</h2>
            <p className="text-sm leading-relaxed mb-2">
              퇴직금 수령 계좌이거나 개인이 추가 납입하는 연금 계좌. 연금저축과 마찬가지로 세액공제·연금 수령 시 과세 프레임.
            </p>
            <p className="text-sm leading-relaxed">
              퇴직 후 자산을 IRP에 유지하며 ETF·펀드로 운용하는 경우가 많습니다. 미국 주식 <em>직접</em> 매수보다 국내 상장 해외 ETF·펀드 비중이 큰 편입니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>미국주식 직접 vs ISA/연금</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th className="text-left py-2 pr-2" style={{ color: "var(--text)" }}>구분</th>
                    <th className="text-left py-2 pr-2" style={{ color: "var(--text)" }}>일반 해외주식</th>
                    <th className="text-left py-2" style={{ color: "var(--text)" }}>ISA·연금</th>
                  </tr>
                </thead>
                <tbody className="leading-relaxed">
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-2">대상</td>
                    <td className="py-2 pr-2">미국 개별주·ETF 직접</td>
                    <td className="py-2">편입 상품 한정</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-2">세제</td>
                    <td className="py-2 pr-2"><Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>양도세·배당세</Link></td>
                    <td className="py-2">비과세·공제·연금과세</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-2">유연성</td>
                    <td className="py-2 pr-2">매매·종목 자유</td>
                    <td className="py-2">한도·만기·상품 제한</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              실무에서 흔한 조합: <strong style={{ color: "var(--text)" }}>연금·ISA로 세제 혜택 + 일반 계좌로 미국주식 코어</strong>. 본인 소득·한도·투자 기간에 따라 다릅니다.
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>체크리스트</h2>
            <ol className="list-decimal pl-5 text-sm leading-relaxed space-y-1">
              <li>올해 ISA·연금 납입 한도와 이미 납입한 금액</li>
              <li>미국 ETF/주식 편입 가능 여부 (증권사 상품 검색)</li>
              <li>만기·인출 조건 — 단기 자금은 부적합</li>
              <li>해외주식 양도세 250만 원 공제와의 관계 (<Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>세금 가이드</Link>)</li>
            </ol>
          </section>
          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적이며 세무·법률 자문이 아닙니다. 한도·세율·상품은 정책·증권사별로 다르니 개설 전 반드시 확인하세요.
          </div>
        </article>
      </main>
    </div>
  );
}
