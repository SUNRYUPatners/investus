import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { TeslaValuationView } from "@/components/TeslaValuationView";
import { NewsListView } from "@/components/news/NewsUI";
import { getArticles } from "@/lib/articles";
import { getLocale } from "@/lib/getLocale";
import { localizedAlternates } from "@/lib/localeMeta";
import { getTeslaQuoteSnapshot } from "@/lib/teslaValuation";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isKo = locale === "ko";
  return {
    title: isKo
      ? "테슬라 밸류에이션 — 시가총액·배수·시나리오 | Investus"
      : "Tesla Valuation — Market cap, multiples & scenarios | Investus",
    description: isKo
      ? "테슬라(TSLA) 시가총액과 배수(실시간 시세), ARK 2031 약세·기본·강세 시나리오, 자동차·에너지·FSD/로보택시·옵티머스 부문 노트. 인용된 수치만 사용합니다."
      : "Tesla (TSLA) market cap and multiples from live prices, ARK 2031 bear/base/bull scenarios, and auto, energy, FSD/robotaxi and Optimus notes. Cited figures only.",
    alternates: await localizedAlternates("/tesla-valuation"),
    robots: { index: true, follow: true },
  };
}

export default async function TeslaValuationPage() {
  const locale = await getLocale();
  const [snapshot, articles] = await Promise.all([
    getTeslaQuoteSnapshot(),
    Promise.resolve(getArticles({ ticker: "TSLA", limit: 12 })),
  ]);
  const isKo = locale === "ko";

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <TeslaValuationView locale={locale} snapshot={snapshot} />
        <div className="mt-8">
          <NewsListView
            locale={locale}
            title={isKo ? "관련 테슬라 리서치" : "Related Tesla research"}
            intro={
              isKo
                ? "인베스트어스 편집 데스크의 테슬라(TSLA) 노트입니다."
                : "Investus editorial notes tagged Tesla (TSLA)."
            }
            articles={articles}
          />
        </div>
      </main>
    </div>
  );
}
