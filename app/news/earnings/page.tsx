import type { Metadata } from "next";
import { getArticlesByKind } from "@/lib/articles";
import { hreflangAlternates } from "@/lib/articleSeo";
import { NewsChrome, NewsListView } from "@/components/news/NewsUI";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Earnings & Data — Tesla, SpaceX & Musk Ecosystem | Investus",
  description: "Earnings coverage and data trackers for Tesla, SpaceX, xAI and related companies — results, deliveries, margins and guidance.",
  alternates: hreflangAlternates("/news/earnings", "en"),
  robots: { index: true, follow: true },
};

export default function EarningsEn() {
  return (
    <NewsChrome locale="en" altHref="/ko/news/earnings">
      <NewsListView
        locale="en"
        title="Earnings & data"
        intro="Earnings coverage and data trackers — quarterly results, deliveries, margins and guidance across the Musk ecosystem."
        articles={getArticlesByKind("earnings")}
      />
    </NewsChrome>
  );
}
