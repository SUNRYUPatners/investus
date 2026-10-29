import type { Metadata } from "next";
import { getArticlesByKind } from "@/lib/articles";
import { hreflangAlternates } from "@/lib/articleSeo";
import { NewsChrome, NewsListView } from "@/components/news/NewsUI";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Analysis — Tesla, SpaceX & Musk Ecosystem | Investus",
  description: "In-depth analysis of Tesla, SpaceX, xAI and the Musk ecosystem: company deep-dives, sector reads and macro context for investors.",
  alternates: hreflangAlternates("/news/analysis", "en"),
  robots: { index: true, follow: true },
};

export default function AnalysisEn() {
  return (
    <NewsChrome locale="en" altHref="/ko/news/analysis">
      <NewsListView
        locale="en"
        title="Analysis"
        intro="Company deep-dives, sector reads and macro context across Tesla, SpaceX, xAI and related companies."
        articles={getArticlesByKind("analysis")}
      />
    </NewsChrome>
  );
}
