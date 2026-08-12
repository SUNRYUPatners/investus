import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronRight } from "lucide-react";
import { InvestmentAllExpanded } from "@/components/InvestmentArticles";

export const metadata: Metadata = {
  title: "투자 지식 허브 — 기초·대가 전략부터 ETF·세금까지 | 인베스트어스",
  description:
    "주식·채권·ETF·복리 기초와 워런 버핏·피터 린치 등 대가 전략, 미국주식 입문, S&P500, 나스닥, DCA, 세금, 환율, 섹터까지 Investus 오리지널 가이드.",
  alternates: { canonical: "https://www.investus.kr/learn" },
  openGraph: {
    title: "투자 지식 허브 | 인베스트어스 Investus",
    description: "투자 기초·대가 전략과 미국주식 가이드를 한 페이지에서",
    url: "https://www.investus.kr/learn",
    type: "website",
  },
};

const ARTICLES = [
  {
    href: "/learn/us-stock-basics",
    emoji: "🇺🇸",
    title: "미국주식 투자 완전 입문 가이드",
    desc: "계좌 개설, 수수료·환율, 세금 개념, DCA, Investus 5분 루틴까지. 처음 미국주식을 시작하는 A to Z.",
    tag: "입문",
    tagColor: "#10b981",
    minutes: "18분",
  },
  {
    href: "/learn/etf",
    emoji: "📦",
    title: "미국 ETF 완전 가이드 — SPY·VOO·QQQ",
    desc: "상장지수펀드란 무엇인지, 운용보수·추적오차, 레버리지 함정, 코어/위성 나누는 법.",
    tag: "ETF",
    tagColor: "#60a5fa",
    minutes: "18분",
  },
  {
    href: "/learn/nasdaq",
    emoji: "💻",
    title: "나스닥 완전 가이드 — 나스닥100과 QQQ",
    desc: "거래소·종합지수·나스닥100을 구분하고, S&P500과 왜 다르게 움직이는지 설명합니다.",
    tag: "지수",
    tagColor: "#38bdf8",
    minutes: "16분",
  },
  {
    href: "/learn/sp500",
    emoji: "📈",
    title: "S&P500 완전 가이드 — 미국 경제의 온도계",
    desc: "미국 대형주 500개로 구성된 S&P500 지수의 구성 방식, 역사적 성과, 투자 전략을 상세히 설명합니다.",
    tag: "지수",
    tagColor: "#60a5fa",
    minutes: "16분",
  },
  {
    href: "/learn/dca",
    emoji: "📅",
    title: "적립식 투자(DCA) 가이드",
    desc: "매달 같은 금액으로 모으는 법. 목돈 일시 투자와의 차이, 환율, 실패하는 적립 패턴.",
    tag: "습관",
    tagColor: "#10b981",
    minutes: "16분",
  },
  {
    href: "/learn/us-stock-tax",
    emoji: "🧾",
    title: "한국 거주자 미국주식 세금·계좌",
    desc: "양도소득·배당 원천징수·종합과세·ISA 관계를 개념으로 정리합니다. 세무 자문이 아닙니다.",
    tag: "세금",
    tagColor: "#f87171",
    minutes: "18분",
  },
  {
    href: "/learn/usd-krw",
    emoji: "💱",
    title: "환율과 미국주식 — 원/달러 수익률",
    desc: "달러 수익률과 원화 수익률이 다른 이유, 환전 타이밍, 환헤지 vs 환노출.",
    tag: "환율",
    tagColor: "#f59e0b",
    minutes: "15분",
  },
  {
    href: "/learn/sectors",
    emoji: "🏭",
    title: "미국 주식 11개 섹터 가이드",
    desc: "GICS 섹터별 특징과 입문자가 가장 많이 하는 기술주 쏠림을 피하는 법.",
    tag: "섹터",
    tagColor: "#fb923c",
    minutes: "17분",
  },
  {
    href: "/learn/fear-greed",
    emoji: "😱",
    title: "공포탐욕지수 완전 가이드 — 시장 심리로 타이밍 잡기",
    desc: "CNN의 공포&탐욕 지수가 무엇인지, 어떻게 계산되는지, 실전 투자에서 어떻게 활용하는지 알아봅니다.",
    tag: "심리",
    tagColor: "#f59e0b",
    minutes: "14분",
  },
  {
    href: "/learn/buffett-indicator",
    emoji: "🏦",
    title: "버핏지수 완전 가이드 — 시장 고평가 여부 판단하기",
    desc: "워런 버핏이 즐겨 쓰는 버핏지수(총 시가총액/GDP)의 의미와 해석법, 현재 시장에 적용하는 방법.",
    tag: "밸류",
    tagColor: "#c084fc",
    minutes: "14분",
  },
  {
    href: "/learn/portfolio-strategy",
    emoji: "💼",
    title: "미국주식 포트폴리오 분산 투자 전략",
    desc: "집중 투자 vs 분산 투자, 섹터별 배분, 현금 비중, 리밸런싱까지 — 흔들리지 않는 구성법.",
    tag: "전략",
    tagColor: "#fb923c",
    minutes: "16분",
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-10">
        <div className="pt-4 pb-2">
          <Link href="/more" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            더보기
          </Link>
        </div>

        <div className="mb-6">
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1 font-syne" style={{ color: "var(--mint)" }}>
            INVESTUS LEARN
          </p>
          <h1 className="text-xl font-bold font-syne mb-2" style={{ color: "var(--text)" }}>
            투자 지식 허브
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            투자 기초·대가 전략부터 미국주식 입문·ETF·세금·환율까지.
            다른 페이지로 나가지 않고 이 화면에서 바로 펼쳐 읽을 수 있습니다.
          </p>
        </div>

        {/* 투자 기초 & 대가 전략 — 인라인 (별도 진입 없음) */}
        <section id="basics" className="mb-10 scroll-mt-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(0,229,160,0.12)", color: "rgba(0,229,160,0.95)" }}>
              투자 기초
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(212,175,55,0.15)", color: "#d4af37" }}>
              대가 전략
            </span>
          </div>
          <InvestmentAllExpanded />
        </section>

        {/* 심화 가이드 글 목록 */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            심화 가이드
          </h2>
          <div className="flex flex-col gap-3">
            {ARTICLES.map((a) => (
              <Link key={a.href} href={a.href} style={{ textDecoration: "none" }}>
                <div
                  className="rounded-2xl p-4 border flex items-start gap-4 active:opacity-80 transition-opacity"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                    style={{ background: "rgba(255,255,255,0.04)" }}>
                    {a.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${a.tagColor}18`, color: a.tagColor }}>
                        {a.tag}
                      </span>
                      <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                        {a.minutes} 읽기
                      </span>
                    </div>
                    <p className="text-sm font-bold leading-snug mb-1" style={{ color: "var(--text)" }}>
                      {a.title}
                    </p>
                    <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
                      {a.desc}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 mt-1 opacity-30" style={{ color: "var(--muted)" }} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-6 rounded-2xl p-4 text-center border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>
            AI 투자비서에게 바로 물어보세요
          </p>
          <p className="text-[11px] mb-3" style={{ color: "var(--muted)" }}>
            포트폴리오 분석, 종목 질문, 시장 해석 — 자산 탭에서 무료로 이용
          </p>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: "var(--mint)", color: "#000", textDecoration: "none" }}
          >
            AI 투자비서 열기 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
