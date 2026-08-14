import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { LearnArticleWithAds } from "@/components/LearnArticleAds";

export const metadata: Metadata = {
  title: "한국 거주자 미국주식 세금·계좌 가이드 — 양도세·배당원천징수 | 인베스트어스",
  description:
    "국내 증권사로 미국주식을 할 때 알아둘 양도소득세, 배당 원천징수, 금융소득종합과세, 환율 손익을 숫자 예시와 함께 교육 목적으로 정리합니다. 세무 자문이 아닙니다.",
  keywords: ["미국주식 세금", "양도소득세", "배당세", "해외주식 세금", "금융소득종합과세", "기본공제"],
  alternates: { canonical: "https://www.investus.kr/learn/us-stock-tax" },
  openGraph: {
    title: "미국주식 세금·계좌 가이드 | 인베스트어스",
    description: "양도세·배당·종합과세 개념 정리 (교육용, 세무 자문 아님)",
    url: "https://www.investus.kr/learn/us-stock-tax",
    type: "article",
  },
};

export default function UsStockTaxPage() {
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.15)", color: "#f87171" }}>세금</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>읽는 시간: 24분</span>
          </div>
          <h1 className="text-xl font-bold font-syne leading-snug mb-3" style={{ color: "var(--text)" }}>
            한국 거주자 미국주식 세금·계좌 가이드
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            수익률만 보고 시작했다가 신고·과세에서 놀라는 경우가 많습니다.
            아래는 <strong style={{ color: "var(--text)" }}>개념 안내</strong>입니다. 세율·공제·신고기한은 개정될 수 있으니
            실제 신고는 국세청 자료 또는 세무사 확인이 필요합니다. Investus는 세무 대리인이 아닙니다.
          </p>
        </div>

        <article className="flex flex-col gap-6" style={{ color: "var(--muted)" }}>
          <LearnArticleWithAds>
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>왜 세금을 먼저 배우나요?</h2>
            <p className="text-sm leading-relaxed mb-3">
              미국주식은 <strong style={{ color: "var(--text)" }}>살 때</strong>보다 <strong style={{ color: "var(--text)" }}>팔 때·배당 받을 때</strong> 세금 이벤트가 생깁니다.
              세후 수익률이 세전 차트와 다를 수 있고, 잦은 매매는 세금·수수료로 성과를 깎습니다.
            </p>
            <p className="text-sm leading-relaxed">
              세제혜택 계좌(ISA·연금)와 일반 해외주식 계좌는 규칙이 다릅니다.
              계좌 구분은 <Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>ISA·연금·IRP 가이드</Link>를 먼저 보세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>어디에 계좌를 열까</h2>
            <p className="text-sm leading-relaxed mb-3">
              대부분의 한국 개인 투자자는 국내 증권사의 해외주식 서비스로 미국 주식을 삽니다.
              미국 현지 브로커를 직접 쓰는 경우도 있으나, 송금·세금·상속·규제 이슈가 더 복잡해질 수 있습니다.
              입문 단계에서는 국내 증권사 + 해외주식 신청이 일반적입니다.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              계좌를 여러 개 쪼개면 수수료·환전·잔고 관리 비용이 늘어납니다.
              거래 기록이 한곳에 모이면 양도세 계산도 수월합니다.
            </p>
            <p className="text-sm leading-relaxed">
              증권사마다 해외주식 수수료, 환전 우대, 소수점 거래, 프리마켓 지원이 다릅니다.
              &ldquo;이벤트로 수수료 0원&rdquo;만 보고 옮기면, 이벤트 종료 후 비용이 커질 수 있습니다.
              계좌 개설 체크리스트는 <Link href="/learn/us-stock-basics" style={{ color: "var(--mint)" }}>미국주식 입문</Link>에도 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>매매 차익: 양도소득이란?</h2>
            <p className="text-sm leading-relaxed mb-3">
              <strong style={{ color: "var(--text)" }}>양도소득</strong>은 산 가격보다 비싸게 팔아서 생긴 차익입니다.
              해외주식 매도 차익은 국내에서 양도소득으로 다루는 것이 일반적입니다.
              연간 기본공제를 넘는 순이익에 세율이 붙는 구조가 오랫동안 쓰여 왔습니다.
              (정확한 공제액·세율·지방세 포함 여부는 해당 연도 세법을 보세요.)
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>숫자 예시 (개념용, 세율은 가정)</p>
              <p>올해 해외주식 순이익(원화) 500만 원, 기본공제 250만 원이면 → 과세표준 250만 원.</p>
              <p>세율·지방세를 합쳐 약 22%라면 → 세금 약 55만 원 수준으로 &ldquo;감&rdquo;을 잡습니다. (실제는 연도·개인·통산에 따라 다름)</p>
              <p>순이익이 200만 원이면 기본공제 안에 들어가 양도세가 0에 가까울 수 있습니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              &ldquo;팔지 않으면 세금이 없다&rdquo;는 말은 양도세에 한해 대략 맞지만,
              배당은 보유만 해도 과세 이벤트가 생깁니다. 리밸런싱·테마 교체를 자주 하면
              세금과 수수료가 성과를 깎습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>환율이 양도손익에 들어가는 이유</h2>
            <p className="text-sm leading-relaxed mb-3">
              손익은 보통 <strong style={{ color: "var(--text)" }}>원화</strong>로 계산합니다.
              달러 주가가 그대로여도 원화가 약해지면(환율↑) 원화 환산 이익이 늘 수 있고,
              원화가 강해지면(환율↓) 이익이 줄거나 손실이 날 수 있습니다.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p>매수 $100 × 1,200원 = 12만 원 원가.</p>
              <p>매도 $100 × 1,400원 = 14만 원 → 주가는 그대로인데 원화 이익 2만 원.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              상세 개념은 <Link href="/learn/usd-krw" style={{ color: "var(--mint)" }}>환율 가이드</Link>를 보세요.
              적용 환율·산식은 증권사·세법을 따릅니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>배당: 미국 원천징수 + 국내 합산</h2>
            <p className="text-sm leading-relaxed mb-3">
              미국 기업·ETF 배당은 미국에서 일정 세율로 <strong style={{ color: "var(--text)" }}>원천징수</strong>되는 경우가 많습니다.
              한·미 조세조약이 적용되면 15%대가 흔히 언급됩니다. 증권사 입금 내역의
              &ldquo;세전 배당 / 원천세 / 실입금&rdquo;을 구분해 보관하세요.
            </p>
            <div className="rounded-2xl p-4 border space-y-2 text-sm leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>예시</p>
              <p>세전 배당 $100, 원천징수 15% → 계좌에 $85 입금.</p>
              <p>국내에서는 금융소득으로 합산될 수 있고, 이자·배당이 많아지면 종합과세 여부를 살펴야 합니다.</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              REIT·일부 펀드 분배는 일반 배당과 세무 처리가 다를 수 있습니다.
              ETF 상품설명서의 분배금 성격과 증권사 원천징수 내역을 대조하세요.
              상품 구조는 <Link href="/learn/etf" style={{ color: "var(--mint)" }}>ETF 가이드</Link>·
              <Link href="/learn/dividend" style={{ color: "var(--mint)" }}>배당 가이드</Link>를 참고하면 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>손익 통산·절세 매매의 함정</h2>
            <p className="text-sm leading-relaxed mb-3">
              손실이 난 종목을 같은 해에 실현하면 이익과 통산되는 경우가 많습니다.
              다만 &ldquo;절세 매매&rdquo;를 위해 우량 코어를 깨는 것은 본말이 전도될 수 있습니다.
            </p>
            <p className="text-sm leading-relaxed">
              세무 전략은 세무사와, 투자 전략은 본인 계획과 맞추세요.
              잦은 실현은 <Link href="/learn/dca" style={{ color: "var(--mint)" }}>적립</Link> 철학과도 어긋나기 쉽습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>ISA·연금과의 관계</h2>
            <p className="text-sm leading-relaxed mb-3">
              국내 절세 계좌(ISA, 연금저축, IRP 등)의 투자 가능 상품은 제도·운용사마다 다릅니다.
              &ldquo;미국 개별 주식을 ISA에 그대로 담는다&rdquo;고 단정하면 안 됩니다.
              해외주식형 펀드/ETF만 가능한 경우, 한도가 있는 경우, 중도 인출 페널티가 있는 경우를 각각 확인하세요.
            </p>
            <p className="text-sm leading-relaxed">
              절세 계좌와 일반 해외주식 계좌를 섞어 쓸 때는, 어디에 어떤 자산이 있는지를 메모해 두지 않으면
              리밸런싱과 신고 때 헷갈립니다. Investus 자산 탭은 투자 추적용이며 공식 세무 장부가 아닙니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>초보가 자주 하는 실수</h2>
            <div className="flex flex-col gap-3">
              {[
                ["증권사 하나만 보고 신고", "여러 계좌를 쓰면 합산해야 합니다. 누락이 가산세를 만듭니다."],
                ["달러 차익만 보고 양도세 무시", "원화·환율이 들어갑니다."],
                ["배당은 공짜라고 생각", "원천징수 + 국내 합산이 있습니다."],
                ["ISA와 일반 계좌 규칙을 혼동", "비과세·공제·양도세 프레임이 다릅니다."],
                ["스크린샷만 모아 두기", "연말 PDF·거래내역 ZIP 백업이 더 안전합니다."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{t}</p>
                  <p className="text-[12px] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>신고 시즌에 당황하지 않으려면</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed">
              <li>증권사 앱의 &ldquo;해외주식 양도소득&rdquo; 안내·미리보기 메뉴를 연초에 한 번 열어 보세요.</li>
              <li>여러 증권사를 쓰면 내역을 합산해야 합니다. 한곳만 보고 신고하면 누락이 납니다.</li>
              <li>가족 명의·미성년 계좌는 증여·명의 이슈가 별도로 있습니다. 이 글 범위를 넘습니다.</li>
              <li>해외 직접 계좌(미국 브로커)는 FATCA·CRS·송금 증빙이 더 붙을 수 있습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>기록으로 남길 것</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed">
              <li>매수·매도 일자, 수량, 체결가(달러), 적용 환율</li>
              <li>배당 입금일과 원천징수 금액</li>
              <li>증권사 연말 세금 관련 안내 메일·PDF</li>
              <li>환전 내역(원화→달러, 달러→원화) — 수수료 포함</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              신고 근거는 증권사 거래내역이 우선입니다. 스크린샷만 모아 두면 누락되기 쉬우니
              연 1회 ZIP으로 백업해 두는 습관을 권합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>다음에 할 일</h2>
            <ol className="list-decimal pl-5 text-sm leading-relaxed space-y-2">
              <li>증권사 앱에서 해외주식 양도소득 미리보기 메뉴 위치를 찾아 두세요.</li>
              <li>올해 실현 손익이 기본공제에 가까운지 대략만 적어 보세요.</li>
              <li>ISA·연금 한도와 일반 계좌 역할을 나눕니다 (<Link href="/learn/korea-accounts" style={{ color: "var(--mint)" }}>계좌 가이드</Link>).</li>
              <li>입문 전체는 <Link href="/learn/us-stock-basics" style={{ color: "var(--mint)" }}>미국주식 입문</Link>,
                문의는 <Link href="/more/contact" style={{ color: "var(--mint)" }}>연락처</Link>. 세금 계산 요청은 받지 않습니다.</li>
            </ol>
          </section>

          <div className="rounded-xl p-4 text-[11px] leading-relaxed"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}>
            ⚠️ 본 페이지는 세무·법률 자문이 아닙니다. 세법 개정으로 내용이 달라질 수 있으며, 개별 상황에 대한 책임은 이용자에게 있습니다.
          </div>
        </LearnArticleWithAds>
        </article>

        <div className="mt-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            다음으로 읽을 글
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/learn/usd-krw" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">💱</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>환율과 미국주식</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>원/달러가 수익률을 어떻게 바꾸나</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" style={{ color: "var(--muted)" }} />
              </div>
            </Link>
            <Link href="/learn/korea-accounts" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl p-4 border flex items-center gap-3 active:opacity-70" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="text-xl">🏦</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>ISA·연금저축·IRP</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>세제혜택 계좌와 미국 ETF</p>
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
