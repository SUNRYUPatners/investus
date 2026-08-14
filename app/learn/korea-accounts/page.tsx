import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "ISA·연금저축·IRP 가이드 — 한국 계좌와 미국주식 | 인베스트어스",
  description:
    "개인종합자산관리계좌(ISA), 연금저축, IRP가 무엇인지, 일반 해외주식 계좌와 어떻게 다른지, 숫자 예시와 흔한 실수까지 완전 초보 눈높이로 설명합니다.",
  keywords: ["ISA", "연금저축", "IRP", "세제혜택 계좌", "미국주식 계좌", "세액공제"],
  alternates: { canonical: "https://www.investus.kr/learn/korea-accounts" },
  openGraph: {
    title: "ISA·연금저축·IRP 가이드 | 인베스트어스",
    description: "한국 세제혜택 계좌와 미국 ETF·주식 — 개념·숫자·실수 정리",
    url: "https://www.investus.kr/learn/korea-accounts",
    type: "article",
  },
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
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(248,113,113,0.15)", color: "#f87171" }}>세금</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 24분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            ISA·연금저축·IRP 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            미국주식을 살 때 &ldquo;어떤 계좌로?&rdquo;가 세후 수익률을 바꿉니다.
            같은 돈을 넣어도 일반 계좌·ISA·연금은 세금 규칙이 다릅니다. 용어부터 숫자 예시까지 잡습니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>왜 계좌를 먼저 배우나요?</h2>
            <p className="text-sm leading-relaxed mb-3">
              한국에서는 <strong style={{ color: "var(--text)" }}>어디에 돈을 넣느냐</strong>가 상품 선택만큼 중요합니다.
              같은 S&amp;P500 ETF라도 일반 해외주식 계좌면 양도·배당 규칙이 적용되고,
              ISA·연금이면 비과세·세액공제·연금과세 프레임이 붙습니다.
            </p>
            <p className="text-sm leading-relaxed">
              세율·한도·편입 가능 상품은 <em>매년 정책·증권사마다 바뀔 수 있습니다</em>.
              아래는 교육용 개념이며, 개설 전 증권사·은행 안내와 국세청 자료를 확인하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>먼저 네 가지를 구분하기</h2>
            <div className="flex flex-col gap-3">
              {[
                ["일반 위탁(해외주식) 계좌", "미국 개별주·미국 상장 ETF를 달러로 직접 매매. 환전 필요. 양도·배당은 일반 해외주식 세금 프레임."],
                ["ISA (개인종합자산관리계좌)", "예금·펀드·ETF 등을 한 계좌에서 운용. 만기·유형에 따라 비과세·세액공제 혜택."],
                ["연금저축", "노후 자금용. 납입 시 세액공제, 55세 이후 연금 수령 시 낮은 세율 구간이 흔함."],
                ["IRP (개인형 퇴직연금)", "퇴직금·개인 추가 납입. 연금저축과 비슷한 공제·연금과세 프레임."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>ISA란? (초보용 정의)</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>ISA</strong>는 &ldquo;여러 금융상품을 한곳에 모아, 일정 기간·한도 안에서 세제 혜택을 주는 계좌&rdquo;입니다.
              <strong style={{ color: "var(--text)" }}>일반형</strong>·<strong style={{ color: "var(--text)" }}>서민형</strong> 등 유형에 따라 납입 한도·비과세 한도가 다릅니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              장점: 만기(예: 3년)를 지키면 수익의 일부·전부가 비과세되거나 추가 세액공제(조건 충족 시)가 붙을 수 있음.
              단점: 납입 한도, 만기 전 해지 시 혜택 소멸, 편입 가능 상품이 증권사·유형마다 다름.
            </p>
            <p className="text-sm leading-relaxed">
              미국 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>S&amp;P500 ETF</Link>를 ISA로 살 수 있는지는
              <em>해외 ETF·국내 상장 해외지수 ETF 편입 여부</em>를 확인해야 합니다.
              직접 AAPL 매수가 가능한 상품도 있으나 증권사별로 상이합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>연금저축이란?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>연금저축</strong>은 노후를 위해 매년 일정 한도까지 넣고,
              그해 세금에서 <strong style={{ color: "var(--text)" }}>세액공제</strong>(예: 납입액의 12~15%대, 소득·나이·유형에 따라 다름)를 받는 계좌입니다.
              펀드·ETF·예금 등을 편입합니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              55세 이후 연금으로 수령하면 연금소득세(예: 3.3~5.5% 분리과세 구간)가 적용되는 경우가 많습니다.
              중도 인출하면 세제 불이익이 큽니다. 단기 매매·미국 개별주 직접 투자 목적과는 성격이 다릅니다.
            </p>
            <p className="text-sm leading-relaxed">
              장기 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립식</Link>·노후 코어에 잘 맞습니다.
              &ldquo;올해 세액공제만 받고 내년에 다 빼기&rdquo;는 설계와 맞지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>IRP란?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>IRP</strong>는 퇴직금을 받거나, 개인이 추가로 납입하는 퇴직·연금 계좌입니다.
              연금저축과 마찬가지로 세액공제·연금 수령 시 과세 프레임을 씁니다.
              연금저축 + IRP 합산 납입·공제 한도가 있는 해가 많으니, &ldquo;둘 다 한도 가득&rdquo;이 되는지 매년 확인하세요.
            </p>
            <p className="text-sm leading-relaxed">
              퇴직 후 자산을 IRP에 두고 ETF·펀드로 운용하는 경우가 많습니다.
              미국 주식 <em>직접</em> 매수보다 국내 상장 해외 ETF·펀드 비중이 큰 편입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>숫자로 느끼는 예시 (개념용)</h2>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>예시 A — 연금 세액공제</p>
              <p>연간 공제 대상 납입 400만 원, 세액공제율 15%라면 → 그해 세금이 약 60만 원 줄어드는 &ldquo;환급·절감&rdquo; 효과가 납니다.</p>
              <p className="font-bold pt-2" style={{ color: "var(--text)" }}>예시 B — 같은 수익, 다른 계좌</p>
              <p>일반 해외주식으로 연 양도 순이익 500만 원이면, 기본공제(예: 250만 원) 초과분에 양도세·지방세가 붙을 수 있습니다.</p>
              <p>같은 수익이 ISA 비과세 한도 안이면 세금이 0에 가까울 수 있습니다. (한도·유형·만기 조건 충족 시)</p>
              <p className="text-[11px] pt-1">※ 세율·한도는 연도·개인 소득에 따라 다릅니다. 실제 계산은 국세청·세무사 기준.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              해외주식 양도·배당의 일반 규칙은{" "}
              <Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>미국주식 세금 가이드</Link>를 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>미국주식 직접 vs ISA·연금</h2>
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
                    <td className="py-2 pr-2">양도세·배당세</td>
                    <td className="py-2">비과세·공제·연금과세</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-2">유연성</td>
                    <td className="py-2 pr-2">매매·종목 자유</td>
                    <td className="py-2">한도·만기·상품 제한</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-2">환전</td>
                    <td className="py-2 pr-2">달러 환전 필요</td>
                    <td className="py-2">원화 상품이 많음</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              실무에서 흔한 조합: <strong style={{ color: "var(--text)" }}>연금·ISA로 세제 혜택 한도 채우기 + 일반 계좌로 미국주식 코어</strong>.
              본인 소득·한도·투자 기간에 따라 다릅니다. 국내 상장 해외 ETF vs 미국 상장 ETF는{" "}
              <Link href="/learn/kr-us-etf" style={{ color: "var(--mint)" }}>국내·미국 ETF 비교</Link>를 참고하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보가 자주 하는 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["한도 모르고 중복 납입", "연금저축과 IRP 합산 한도를 넘기면 공제가 안 되거나 돌려받게 됩니다. 올해 이미 넣은 금액을 먼저 적으세요."],
                ["만기 전 ISA 해지", "급전이 필요해 해지하면 비과세 혜택이 날아갈 수 있습니다. 단기 자금은 일반 예금·비상금으로."],
                ["‘미국주식 = ISA’로 단정", "증권사·상품마다 편입 가능 여부가 다릅니다. 개설 전 검색·상담이 필수입니다."],
                ["세액공제만 보고 단기 인출", "공제 받았다가 중도 인출하면 추징·가산이 붙을 수 있습니다. 장기 돈이 아니면 넣지 마세요."],
                ["계좌를 너무 많이 쪼개기", "ISA·연금·해외주식·은행이 흩어지면 리밸런싱·신고가 어렵습니다. 2~3개로 역할을 나누세요."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>개설 전 체크리스트</h2>
            <ol className="list-decimal pl-5 text-sm leading-relaxed space-y-2">
              <li>올해 ISA·연금·IRP 납입 한도와 이미 납입한 금액</li>
              <li>미국 ETF/주식 편입 가능 여부 (증권사 상품 검색)</li>
              <li>만기·인출 조건 — 3년 안에 쓸 돈인지</li>
              <li>소득 구간별 세액공제율 (공제 vs 비과세 중 무엇이 이득인지)</li>
              <li>해외주식 양도 기본공제와의 관계 (<Link href="/learn/us-stock-tax" style={{ color: "var(--mint)" }}>세금 가이드</Link>)</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 할 일</h2>
            <p className="text-sm leading-relaxed mb-3">
              1) 월급의 &ldquo;장기 돈&rdquo;과 &ldquo;3년 안에 쓸 돈&rdquo;을 나눕니다.
              2) 장기 돈부터 연금/ISA 한도를 채울지 메모합니다.
              3) 나머지는 일반 해외주식으로 <Link href="/learn/sp500" style={{ color: "var(--mint)" }}>S&amp;P500 ETF</Link> 적립을 검토합니다.
            </p>
            <p className="text-sm leading-relaxed">
              환율은 <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율 가이드</Link>,
              적립 규칙은 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>DCA</Link>,
              입문 전체는 <Link href="/learn/us-stock-basics" style={{ color: "var(--mint)" }}>미국주식 입문</Link>을 이어서 읽으세요.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적이며 세무·법률 자문이 아닙니다. 한도·세율·상품은 정책·증권사별로 다르니 개설 전 반드시 확인하세요.
          </div>
        </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/us-stock-tax" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🧾</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>미국주식 세금·계좌</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>양도세·배당 원천징수 개념</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/kr-us-etf" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">📦</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>국내 vs 미국 ETF</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>세금·환헤지·거래시간</p>
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
