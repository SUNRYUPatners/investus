import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "13F·기관 포트폴리오 읽는 법 | 인베스트어스",
  description:
    "SEC 13F가 무엇인지, 누가·언제 내는지, 공시 지연·숏·파생 한계, 버핏·헤지펀드 따라 사기의 위험, Investus에서 아이디어로만 쓰는 법. 완전 초보용.",
  alternates: { canonical: "https://www.investus.kr/learn/13f-guide" },
};

export default function ThirteenFGuidePage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(212,175,55,0.15)", color: "#d4af37" }}>기관</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 24분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            13F·기관 포트폴리오 읽는 법
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            뉴스에 &ldquo;버핏이 ○○ 매수&rdquo;가 뜨면 따라 사고 싶어집니다.
            그 정보의 출처가 대개 <strong style={{ color: "var(--text)" }}>13F</strong>입니다.
            치트키가 아니라 <em>이미 지난 사진</em>을 읽는 법을 처음부터 정리합니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>13F가 뭐예요?</h2>
            <p className="text-sm leading-relaxed mb-3">
              13F는 미국 증권거래위원회(SEC)에 일정 규모 이상 기관투자자가
              <strong style={{ color: "var(--text)" }}>분기마다</strong> 제출하는 보유 공시입니다.
              주로 미국 상장 주식·일부 옵션 등 &ldquo;13F 증권&rdquo; 보유 내역이 담깁니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              쉽게 말해 &ldquo;큰손 펀드가 지난 분기 말에 미국 상장 주식을 얼마나 들고 있었는지&rdquo;를
              공개하는 서류입니다. 개인 투자자가 내는 서류가 아닙니다.
            </p>
            <p className="text-sm leading-relaxed">
              Investus 검색 탭의 <em>투자 대가</em> 섹션은 이런 공시 데이터를 참고해 보여 줍니다.
              숫자는 참고용이지, 지금 사라는 신호가 아닙니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>왜 초보에게도 알아둘 가치가 있나</h2>
            <p className="text-sm leading-relaxed mb-3">
              기관이 어떤 섹터·종목에 비중을 늘렸는지 보면, &ldquo;시장이 무엇에 돈을 싣는지&rdquo; 힌트가 됩니다.
              혼자 종목을 고를 때 아이디어 풀을 넓히는 용도입니다.
            </p>
            <p className="text-sm leading-relaxed">
              다만 가치는 <em>복사</em>가 아니라 <em>질문</em>에서 나옵니다.
              &ldquo;왜 이 회사가 포트에 들어갔을까?&rdquo; →{" "}
              <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무제표</Link>·{" "}
              <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>밸류에이션</Link>으로 직접 확인하는 습관이
              13F를 쓰는 올바른 방식입니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>타임라인: 언제 보는 숫자인가</h2>
            <p className="text-sm leading-relaxed mb-3">
              분기는 보통 3/31, 6/30, 9/30, 12/31 기준입니다.
              제출 기한은 분기 종료 후 약 45일 안쪽인 경우가 많아, 우리가 뉴스로 볼 때는 이미 한두 달 지난 사진입니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p><strong style={{ color: "var(--text)" }}>예:</strong> 3월 31일 보유 → 5월 중순 공시 공개 → 당신이 기사를 읽는 날.</p>
              <p>그사이 기관은 팔았거나 더 샀을 수 있고, 주가도 이미 크게 움직였을 수 있습니다.</p>
              <p><strong style={{ color: "var(--text)" }}>기억:</strong> &ldquo;지금 버핏이 산다&rdquo;가 아니라 &ldquo;그때 들고 있었다&rdquo;입니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>숫자로 보는 &ldquo;따라 사기&rdquo;의 함정</h2>
            <p className="text-sm leading-relaxed mb-3">
              가정: 기관이 분기 말에 A주식 $100에 비중을 크게 늘렸고, 공시가 나올 때 주가는 $120입니다.
              당신이 $120에 따라 사면, 기관의 그 분기 평균 단가와는 이미 20% 차이가 납니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              더 나쁜 경우: 공시 전에 이미 일부를 정리했을 수도 있습니다.
              뉴스 제목은 &ldquo;매수&rdquo;인데, 실제로는 &ldquo;과거 매수 잔량&rdquo;만 남은 상태일 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              그래서 13F 기반 모방은{" "}
              <Link href="/learn/myths" style={{ color: "var(--mint)" }}>초보 오해</Link> TOP에 자주 올라갑니다.
              대가의 <em>원칙</em>은{" "}
              <Link href="/learn/value-investing" style={{ color: "var(--mint)" }}>가치투자 가이드</Link>에서 배우고,
              종목은 스스로 검증하세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>한계 — 이게 더 중요합니다</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 mb-3">
              <li><strong style={{ color: "var(--text)" }}>지연:</strong> 45일+ 지난 스냅샷. 실시간 포트가 아닙니다.</li>
              <li><strong style={{ color: "var(--text)" }}>부분만 보임:</strong> 숏(공매도), 일부 파생, 비미국 자산, 채권 등은 안 보이거나 일부만 보입니다.</li>
              <li><strong style={{ color: "var(--text)" }}>의도 불명:</strong> 헤지·차익거래·고객 자금 대행일 수 있어 &ldquo;장기 확신 매수&rdquo;가 아닐 수 있습니다.</li>
              <li><strong style={{ color: "var(--text)" }}>규모 차이:</strong> 수조 원 운용사는 유동성·규제 때문에 개인과 다른 종목을 고릅니다.</li>
              <li><strong style={{ color: "var(--text)" }}>한 종목 ≠ 전략:</strong> 버핏도 현금·보험 float·다양한 비중으로 전체를 운영합니다.</li>
            </ul>
            <p className="text-sm leading-relaxed">
              &ldquo;안 보이는 것&rdquo;이 리스크의 절반일 수 있습니다. 보이는 롱 주식만 복사하면 반쪽짜리 포트가 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>어떻게 읽으면 쓸모가 있나</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>1) 신규 진입·비중 확대</strong> — &ldquo;왜 지금 이 섹터인가?&rdquo;를 적고
              산업·실적 시즌 맥락을{" "}
              <Link href="/learn/earnings-season" style={{ color: "var(--mint)" }}>실적 시즌</Link>·{" "}
              <Link href="/learn/sectors" style={{ color: "var(--mint)" }}>섹터</Link>와 맞춰 봅니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>2) 여러 대가의 교집합</strong> — 한 명이 아니라 여러 운용사에 공통으로 보이면
              &ldquo;유행&rdquo;일 수도, &ldquo;구조적 테마&rdquo;일 수도 있습니다. 어느 쪽이든 맹신은 금물입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>3) 코어와 위성 분리</strong> — 장기 코어는 여전히{" "}
              <Link href="/learn/etf" style={{ color: "var(--mint)" }}>지수 ETF</Link>(S&amp;P500·나스닥100 등).
              13F에서 얻은 종목은 포트의 소수 %만{" "}
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>위성</Link>으로.
            </p>
            <p className="text-sm leading-relaxed">
              <strong style={{ color: "var(--text)" }}>4) 매수 전 체크</strong> —{" "}
              <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>매수 체크리스트</Link>의
              비중·이유·손절·세금 칸을 채운 뒤에만 주문합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>흔한 실수</h2>
            <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
              <li>공시 당일 전량 따라 매수 → 이미 반영된 가격에 추격</li>
              <li>한 종목만 보고 대가 &ldquo;올인&rdquo;처럼 착각</li>
              <li>분기마다 포트 전체를 기관처럼 갈아엎기 → 수수료·세금·과매매</li>
              <li>13F에 없는 위험(레버리지·옵션)까지 개인이 추가로 얹기</li>
              <li>손실 나면 &ldquo;버핏도 샀으니 본전&rdquo;으로 물타기 (
              <Link href="/learn/investing-psychology" style={{ color: "var(--mint)" }}>심리</Link>)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>Investus에서 쓰는 법</h2>
            <p className="text-sm leading-relaxed mb-3">
              검색 탭 → 13F / 투자 대가에서 보유·비중 변화를 훑습니다.
              &ldquo;오늘 매수 버튼&rdquo;이 아니라, 리포트·종목 페이지와 함께 <em>공부 목록</em>을 만드는 용도입니다.
            </p>
            <p className="text-sm leading-relaxed">
              홈·매크로 흐름과 겹치면{" "}
              <Link href="/learn/macro-rates" style={{ color: "var(--mint)" }}>금리·CPI</Link> 맥락도 같이 보세요.
              기관 비중 확대가 금리 민감 섹터인지, 성장주인지에 따라 해석이 달라집니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>미니 워크플로 (따라 하기)</h2>
            <ol className="list-decimal pl-5 text-sm leading-relaxed space-y-2 mb-3">
              <li>Investus에서 관심 대가·펀드의 최근 분기 상위 보유 3~5개를 적는다.</li>
              <li>각 종목에 &ldquo;내가 이해하는 사업인가?&rdquo;를 YES/NO로만 표시한다. NO면 목록에서 제외.</li>
              <li>YES만{" "}
                <Link href="/learn/valuation" style={{ color: "var(--mint)" }}>PER·밸류</Link>·{" "}
                <Link href="/learn/financial-statements" style={{ color: "var(--mint)" }}>재무</Link>로 30분 이상 훑는다.</li>
              <li>그래도 사고 싶으면 포트의 위성 비중 상한(예: 종목당 3~5%)을 적고{" "}
                <Link href="/learn/buy-checklist" style={{ color: "var(--mint)" }}>체크리스트</Link>를 채운다.</li>
              <li>코어(
                <Link href="/learn/etf" style={{ color: "var(--mint)" }}>지수 ETF</Link>
                ) 비중은 건드리지 않는다.</li>
            </ol>
            <p className="text-sm leading-relaxed">
              이 다섯 단계를 건너뛰고 &ldquo;뉴스 제목 → 시장가 매수&rdquo;로 가면 13F는 독이 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보를 위한 한 줄 규칙</h2>
            <p className="text-sm leading-relaxed mb-3">
              &ldquo;13F는 숙제 자료이고, 숙제는 내가 푼다.&rdquo;
              따라 사기는 숙제를 베끼는 것과 같고, 시험(시장)은 매번 문제가 바뀝니다.
            </p>
            <p className="text-sm leading-relaxed">
              관련 글:{" "}
              <Link href="/learn/myths" style={{ color: "var(--mint)" }}>오해 TOP10</Link>·{" "}
              <Link href="/learn/value-investing" style={{ color: "var(--mint)" }}>가치투자</Link>·{" "}
              <Link href="/learn/portfolio-strategy" style={{ color: "var(--mint)" }}>포트폴리오</Link>.
            </p>
          </section>

          <div className="rounded-xl p-4 text-[11px]" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 교육 목적. 13F 기반 모방 투자는 손실을 초래할 수 있습니다. 투자 권유가 아닙니다.
          </div>
          </LearnArticleWithAds>
        </article>
      </main>
    </div>
  );
}
