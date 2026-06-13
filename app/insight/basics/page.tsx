import { Header } from "@/components/Header";
import { InvestmentAllExpanded } from "@/components/InvestmentArticles";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function InvestmentLearnPage() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-10">
        <div className="pt-4 pb-2">
          <Link href="/insight" className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-4 h-4" />
            인사이트
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
