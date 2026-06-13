import { Header } from "@/components/Header";
import { InvestmentBasics } from "@/components/InvestmentArticles";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function BasicsPage() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-10">
        <div className="pt-4 pb-2">
          <Link href="/insight" className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-4 h-4" />
            인사이트
          </Link>
        </div>
        <InvestmentBasics />
      </main>
    </div>
  );
}
