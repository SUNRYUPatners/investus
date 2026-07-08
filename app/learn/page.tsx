import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "투자 지식 허브 — 미국주식 기초부터 심화까지 | 인베스트어스",
  description: "미국주식 투자 초보자부터 중급자까지, Investus 투자 지식 허브에서 S&P500, 공포탐욕지수, 버핏지수, 포트폴리오 전략 등 핵심 개념을 무료로 학습하세요.",
  alternates: { canonical: "https://www.investus.kr/learn" },
  openGraph: {
    title: "투자 지식 허브 | 인베스트어스 Investus",
    description: "S&P500, 공포탐욕지수, 버핏지수, 포트폴리오 전략 — 미국주식 핵심 지식 무료 학습",
    url: "https://www.investus.kr/learn",
    type: "website",
  },
};

const ARTICLES = [
  {
    href: "/learn/us-stock-basics",
    emoji: "🇺🇸",
    title: "미국주식 투자 완전 입문 가이드",
    desc: "처음 미국주식을 시작하는 투자자를 위한 A to Z. 계좌 개설부터 종목 선택까지 핵심만 정리했습니다.",
    tag: "입문",
    tagColor: "#10b981",
    minutes: "8분",
  },
  {
    href: "/learn/sp500",
    emoji: "📈",
    title: "S&P500 완전 가이드 — 미국 경제의 온도계",
    desc: "미국 대형주 500개로 구성된 S&P500 지수의 구성 방식, 역사적 성과, 투자 전략을 상세히 설명합니다.",
    tag: "지수",
    tagColor: "#60a5fa",
    minutes: "10분",
  },
  {
    href: "/learn/fear-greed",
    emoji: "😱",
    title: "공포탐욕지수 완전 가이드 — 시장 심리로 타이밍 잡기",
    desc: "CNN의 공포&탐욕 지수가 무엇인지, 어떻게 계산되는지, 실전 투자에서 어떻게 활용하는지 알아봅니다.",
    tag: "심리",
    tagColor: "#f59e0b",
    minutes: "7분",
  },
  {
    href: "/learn/buffett-indicator",
    emoji: "🏦",
    title: "버핏지수 완전 가이드 — 시장 고평가 여부 판단하기",
    desc: "워런 버핏이 즐겨 쓰는 버핏지수(총 시가총액/GDP)의 의미와 해석법, 현재 시장에 적용하는 방법.",
    tag: "밸류",
    tagColor: "#c084fc",
    minutes: "8분",
  },
  {
    href: "/learn/portfolio-strategy",
    emoji: "💼",
    title: "미국주식 포트폴리오 분산 투자 전략",
    desc: "집중 투자 vs 분산 투자, 섹터별 배분, 리밸런싱 전략까지 — 흔들리지 않는 포트폴리오 구성법.",
    tag: "전략",
    tagColor: "#fb923c",
    minutes: "9분",
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-10">
        {/* Back */}
        <div className="pt-4 pb-2">
          <Link href="/more" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            더보기
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1 font-syne" style={{ color: "var(--mint)" }}>
            INVESTUS LEARN
          </p>
          <h1 className="text-xl font-bold font-syne mb-2" style={{ color: "var(--text)" }}>
            투자 지식 허브
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            미국주식 투자에 필요한 핵심 개념과 전략을 무료로 학습하세요.
            초보자도 이해할 수 있는 쉬운 설명으로 투자 실력을 높여드립니다.
          </p>
        </div>

        {/* Articles */}
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

        {/* Footer note */}
        <div className="mt-8 rounded-2xl p-4 text-center border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>
            더 깊은 학습을 원하신다면
          </p>
          <p className="text-[11px] mb-3" style={{ color: "var(--muted)" }}>
            투자 기초 지식 & 전설적 투자가 전략 페이지에서 더 많은 내용을 확인하세요
          </p>
          <Link
            href="/insight/basics"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: "var(--mint)", color: "#000", textDecoration: "none" }}
          >
            투자 기초 보기 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
