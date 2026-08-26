import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "한국 부동산 입문 가이드 — 매매·전세·정책·대출을 초보도 이해하게 | 인베스트어스",
  description:
    "한국 부동산의 매매·전세·공급정책·DSR·세제를 처음 보는 분 눈높이로 정리합니다. 실수요와 투자 수요를 구분하고, 헤드라인과 실행 시차를 이해합니다.",
  keywords: ["한국 부동산", "전세", "매매", "부동산 정책", "DSR", "재건축", "주택공급"],
  alternates: { canonical: "https://www.investus.kr/learn/korea-real-estate" },
  openGraph: {
    title: "한국 부동산 입문 가이드 | 인베스트어스",
    description: "매매·전세·정책·대출 — 초보용 삼각 축",
    url: "https://www.investus.kr/learn/korea-real-estate",
    type: "article",
  },
};

export default function KoreaRealEstatePage() {
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
              style={{ background: "rgba(52,211,153,0.15)", color: "#34d399" }}>부동산</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 22분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            한국 부동산 입문 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            시세 차트만 보면 놓치기 쉽습니다. 한국 부동산은
            <strong style={{ color: "var(--text)" }}> 공급·정책 · 전세 수급 · 대출·세제</strong>가
            가격 기대와 거래량에 바로 붙습니다. 세 축으로 나눠 봅니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              주식과 무엇이 다른가
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              주식은 클릭 몇 번으로 사고팔 수 있지만, 주택은 <strong style={{ color: "var(--text)" }}>거래 비용·세금·대출·이주</strong>가 큽니다.
              &ldquo;오늘 뉴스에 올랐다&rdquo;고 바로 실행하기 어렵고, 실행까지 시차가 깁니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>실수요</strong> — 거주·학군·출퇴근이 우선</p>
              <p><strong style={{ color: "var(--text)" }}>투자 수요</strong> — 시세차익·임대수익이 우선 (규제·세금 영향이 큼)</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              둘을 섞어 생각하면 헤드라인에 흔들리기 쉽습니다. 내 목적이 어느 쪽인지 먼저 적어두세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              삼각 축 ① 공급·재건축·정책
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              공급 확대·재건축 완화 발표는 <strong style={{ color: "var(--text)" }}>심리를 먼저</strong> 움직입니다.
              실제 인허가·착공·입주는 훨씬 늦게 따라옵니다. &ldquo;발표 = 당장 집이 늘어난다&rdquo;가 아닙니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>세부 시행령·안전진단·공사비가 실행 속도를 가름</li>
              <li>선호지와 비선호지 온도 차가 벌어지는 구간이 있음</li>
              <li>금리·대출 규제가 겹치면 거래가 멈출 수도</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              삼각 축 ② 전세 — 거주 비용의 바로미터
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              전세 매물이 줄고 보증금이 오르면, 일부는 &ldquo;차라리 매수&rdquo;로, 일부는 월세로 이동합니다.
              반대로 입주 물량이 늘면 전세가 안정되는 구간도 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              초보자는 <strong style={{ color: "var(--text)" }}>전세수급동향</strong>과
              <strong style={{ color: "var(--text)" }}> 전세대출 한도</strong>를 같이 보시면 됩니다.
              전세가 올라도 대출이 막히면 매수 실행이 안 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              삼각 축 ③ 대출·DSR·세제
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              DSR(총부채원리금상환비율) 등은 &ldquo;사고 싶은 마음&rdquo;과 &ldquo;살 수 있는 한도&rdquo;를 갈라놓습니다.
              다주택·양도·보유 관련 세제 이슈도 거래 타이밍에 영향을 줍니다.
            </p>
            <p className="text-sm leading-relaxed">
              세무·법률은 개인 상황이 달라 일반론만으로는 부족합니다.
              큰 결정 전에는 전문가 상담을 전제로 하세요. (이 글은 세무 자문이 아닙니다.)
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              미국 REITs와는 어떻게 다른가
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              미국 <Link href="/learn/reits" style={{ color: "var(--mint)" }}>REITs</Link>는
              주식처럼 거래되는 부동산 간접투자 상품인 경우가 많습니다.
              한국 아파트 매매·전세는 <strong style={{ color: "var(--text)" }}>실물 거래·정책·대출</strong>이 중심에 가깝습니다.
            </p>
            <p className="text-sm leading-relaxed">
              &ldquo;부동산&rdquo;이라는 같은 단어라도, 상품 구조가 다르면 리스크도 다릅니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              Investus에서 보는 법
            </h2>
            <div className="rounded-2xl p-4 border" style={{ background: "rgba(var(--mint-rgb),0.04)", borderColor: "rgba(var(--mint-rgb),0.2)" }}>
              <p className="text-sm leading-relaxed">
                미리보기 한국부동산 탭에서 브리핑·정책·지역 히트맵·뉴스를
                본사이트와 같은 레이아웃으로 확인할 수 있습니다.
                <Link href="/preview/kr-re" style={{ color: "var(--mint)" }}> /preview/kr-re</Link>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
              초보 체크리스트
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>목적이 실수요인지 투자인지 한 줄로 적기</li>
              <li>대출 한도·DSR을 먼저 확인 (감정 매수 금지)</li>
              <li>정책 헤드라인과 실행 일정표를 구분</li>
              <li>전세·입주 물량·선호지 온도를 같이 보기</li>
              <li>큰 결정은 세무·법률 전문가와 교차 확인</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>관련 글</h2>
            <p className="text-sm leading-relaxed">
              <Link href="/learn/korea-stocks" style={{ color: "var(--mint)" }}>한국주식</Link>,
              <Link href="/learn/reits" style={{ color: "var(--mint)" }}> REITs</Link>,
              <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}> 금리</Link>,
              <Link href="/learn/safe-assets" style={{ color: "var(--mint)" }}> 안전자산</Link>,
              <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}> ISA·연금</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적입니다. 특정 지역·단지 매수 권유가 아니며, 부동산·세무·법률 자문이 아닙니다.
          </div>
          </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/korea-stocks" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🇰🇷</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>한국주식 입문</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>코스피·수급·시총</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/macro-rates" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🏛️</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>금리·매크로</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>대출·자산가격과 연결</p>
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
