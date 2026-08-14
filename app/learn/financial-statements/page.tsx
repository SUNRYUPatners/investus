import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "재무제표 읽기 입문 — 손익·재무상태·현금흐름을 초보도 | 인베스트어스",
  description:
    "10-K·10-Q가 무엇인지, 손익계산서·재무상태표·현금흐름표를 숫자 예시로 읽는 법. 완전 초보용 재무제표 가이드.",
  keywords: ["재무제표", "손익계산서", "현금흐름표", "10-K", "EPS", "FCF", "잉여현금흐름"],
  alternates: { canonical: "https://www.investus.kr/learn/financial-statements" },
  openGraph: {
    title: "재무제표 읽기 | 인베스트어스",
    description: "매출·이익·부채·현금이 어디서 오는지",
    url: "https://www.investus.kr/learn/financial-statements",
    type: "article",
  },
};

export default function FinancialStatementsPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa" }}>분석</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 23분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            재무제표 읽기
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            앱의 예쁜 차트만 보면 &ldquo;이 회사가 실제로 돈을 버는지&rdquo;를 놓치기 쉽습니다.
            재무제표는 회사의 <em>성적표·통장·가계부</em>를 세 장으로 나눈 것입니다.
            회계사가 되지 않아도, 몇 줄만 꾸준히 보면 이야기가 달라집니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>10-K·10-Q가 뭐예요?</h2>
            <p className="text-sm leading-relaxed mb-3">
              미국 상장사는 증권거래위원회(SEC)에 정기 보고서를 올립니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong style={{ color: "var(--text)" }}>10-K</strong> — 연간 보고서. 1년치 상세 재무·사업 설명</li>
              <li><strong style={{ color: "var(--text)" }}>10-Q</strong> — 분기 보고서. 3개월마다 업데이트</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              한국어로 &ldquo;사업보고서·분기보고서&rdquo;에 가깝습니다.
              Yahoo Finance·기업 IR·Investus 종목 페이지에서도 요약 숫자를 볼 수 있지만,
              한 번은 원문 표 구조를 눈으로 익혀 두면 가짜 뉴스에 덜 흔들립니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>세 장의 표 — 비유로 기억하기</h2>
            <div className="flex flex-col gap-3">
              {[
                ["손익계산서 (Income Statement)", "일정 기간의 성적표. 매출에서 비용을 빼 이익이 얼마나 남았나."],
                ["재무상태표 (Balance Sheet)", "특정 날짜의 몸무게·체력. 가진 것(자산) = 빚(부채) + 내 몫(자본)."],
                ["현금흐름표 (Cash Flow Statement)", "통장 입출금. 이익이 났어도 현금이 빠질 수 있음."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>손익계산서 — 얼마나 벌었나</h2>
            <p className="text-sm leading-relaxed mb-3">
              위에서 아래로 대략 이렇게 내려갑니다.
              <strong style={{ color: "var(--text)" }}>매출(Revenue)</strong> → 매출원가 → 매출총이익 →
              판관비 → <strong style={{ color: "var(--text)" }}>영업이익</strong> → 이자·세금 →
              <strong style={{ color: "var(--text)" }}>순이익</strong> → <strong style={{ color: "var(--text)" }}>EPS</strong>(주당순이익).
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>숫자 예시 (가상의 작은 회사)</strong></p>
              <p>매출 1,000억 − 원가 600억 = 매출총이익 400억</p>
              <p>− 인건비·마케팅 250억 = 영업이익 150억</p>
              <p>− 이자·세금 50억 = 순이익 100억</p>
              <p>주식 수 10억 주라면 EPS = 100억 ÷ 10억 = <strong style={{ color: "var(--text)" }}>10원</strong>(또는 $ 단위로 환산).</p>
              <p>이 EPS가 <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER</Link>의 분모입니다.</p>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed mt-3">
              <li>매출 YoY(전년 대비) 성장률 — 커지고 있나</li>
              <li>영업이익률 — 100원 팔아 영업으로 몇 원 남나. 마진이 줄면 경쟁·원가 압박</li>
              <li>일회성 이익(건물 매각 등) — 빼고 추세를 보기</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>재무상태표 — 체력과 빚</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>자산 = 부채 + 자본</strong>이 항상 맞아야 합니다.
              자산: 현금, 매출채권, 재고, 건물, 특허 등.
              부채: 단기차입, 장기부채, 미지급금 등.
              자본: 주주 몫.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              초보가 볼 것: <em>현금·단기투자</em>가 충분한지, <em>총부채</em>가 갑자기 불어났는지,
              부채/자기자본 비율이 업종 대비 이상한지.
            </p>
            <p className="text-sm leading-relaxed">
              은행·보험은 레버리지가 구조적으로 높아, 제조업 기준으로 &ldquo;빚이 많다&rdquo;고 단정하면 안 됩니다.
              <Link href="/learn/sectors" style={{ color: "var(--mint)" }}>섹터</Link>를 먼저 확인하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>현금흐름표 — 가장 중요한 한 줄</h2>
            <p className="text-sm leading-relaxed mb-3">
              이익(회계)과 현금(통장)은 다를 수 있습니다.
              예를 들어 외상으로 팔면 매출·이익은 잡히지만 현금은 아직 안 들어옵니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed mb-3">
              <li><strong style={{ color: "var(--text)" }}>영업활동현금흐름(OCF)</strong> — 본업으로 현금이 들어왔나</li>
              <li><strong style={{ color: "var(--text)" }}>투자활동</strong> — 공장·장비(CapEx)에 썼나, 자산을 팔았나</li>
              <li><strong style={{ color: "var(--text)" }}>재무활동</strong> — 빚을 갚았나, 배당·자사주·증자를 했나</li>
            </ul>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>FCF(잉여현금흐름)</strong> ≈ OCF − CapEx(설비투자).
              &ldquo;본업으로 번 현금에서, 사업을 유지·성장시키는 투자를 빼고 남은 여유 현금&rdquo;에 가깝습니다.
              배당·자사주·빚 상환 여력과 연결됩니다 (<Link href="/learn/dividend" style={{ color: "var(--mint)" }}>배당 가이드</Link>).
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>빨간 깃발 예시</strong></p>
              <p>순이익은 매년 +인데 OCF가 계속 −이면, 매출채권·재고가 불어나거나
                회계와 현금이 어긋나는지 의심해 볼 수 있습니다. &ldquo;이익만 보고 매수&rdquo;의 함정입니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>실적 시즌과 연결</h2>
            <p className="text-sm leading-relaxed">
              분기마다 나오는 숫자가 <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>실적 시즌</Link>의 핵심입니다.
              컨센서스(시장 예상) 대비 서프라이즈·가이던스(회사 전망)가 주가를 하루만에 흔들 수 있습니다.
              숫자만 보고 당일 전량 매매하지 마세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["매출만 보고 좋아함", "적자·현금 유출이 커질 수 있습니다. 이익률·OCF를 같이."],
                ["한 분기만 보고 판단", "계절성·일회성이 큽니다. 최소 4~8분기 추세."],
                ["다른 업종끼리 마진 비교", "소프트웨어와 유통의 마진은 원래 다릅니다."],
                ["재무를 안 보고 차트만", "보조와 본말이 바뀝니다."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보 실습 순서</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>관심 종목(또는 보유 ETF의 상위 종목) 하나 고르기</li>
              <li>최근 연간 매출·영업이익·순이익·EPS 적어 보기</li>
              <li>현금·총부채·OCF·FCF 한 줄씩 확인</li>
              <li><Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER</Link> 분모(EPS)가 일회성인지 점검</li>
              <li><Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>매수 체크리스트</Link>에 &ldquo;왜 사는지&rdquo; 한 문장</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 읽을 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>밸류에이션</Link> ·
              <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>실적 시즌</Link> ·
              <Link href="/learn/value-investing" style={{ color: "var(--mint)" }}>가치투자</Link> ·
              <Link href="/learn/13f-guide" style={{ color: "var(--mint)" }}>13F</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 회계 해석·투자 판단은 본인 책임이며, 세무·투자 자문이 아닙니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
