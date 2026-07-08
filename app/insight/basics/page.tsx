import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { InvestmentAllExpanded } from "@/components/InvestmentArticles";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "투자 기초 지식 & 대가 전략 | investus",
  description: "주식·채권·ETF·배당·복리·분산투자·재무제표·기업 가치 평가 등 핵심 투자 개념과 워렌 버핏, 찰리 멍거, 피터 린치, 존 보글, 하워드 막스, 레이 달리오, 벤저민 그레이엄, 필립 피셔, 짐 로저스 등 전설적 투자가들의 전략을 한 곳에서 학습하세요.",
  keywords: ["투자 기초", "주식 투자", "워렌 버핏", "ETF", "배당", "복리", "분산투자", "재무제표", "가치투자", "성장주투자"],
  alternates: { canonical: "https://www.investus.kr/insight/basics" },
  openGraph: {
    title: "투자 기초 지식 & 대가 전략 | investus",
    description: "주식·채권·ETF·배당·복리·분산투자 등 핵심 투자 개념과 전설적 투자가들의 전략",
    url: "https://www.investus.kr/insight/basics",
    type: "article",
  },
};

export default function InvestmentLearnPage() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-10">
        <div className="pt-4 pb-2">
          <Link href="/learn" className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-4 h-4" />
            투자 지식 허브
          </Link>
          <h1 className="text-base font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
            투자 기초 & 대가 전략
          </h1>
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>
            핵심 투자 개념부터 전설적 투자가들의 철학까지
          </p>
        </div>
        <div className="pt-4">
          <InvestmentAllExpanded />
        </div>
      </main>
    </div>
  );
}
