import type { Metadata } from "next";
import { getArticles } from "@/lib/articles";
import { hreflangAlternates } from "@/lib/articleSeo";
import { NewsChrome, NewsListView, NEWS_STRINGS } from "@/components/news/NewsUI";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Tesla, SpaceX & xAI News — Investor Research | Investus",
  description:
    "Daily investor research on Tesla, SpaceX, xAI and the wider Elon Musk ecosystem: news, earnings, data trackers and valuation analysis.",
  alternates: hreflangAlternates("/news", "en"),
  robots: { index: true, follow: true },
};

export default function NewsIndexEn() {
  const articles = getArticles();
  const s = NEWS_STRINGS.en;
  return (
    <NewsChrome locale="en" altHref="/ko/news">
      <NewsListView
        locale="en"
        title="Tesla · SpaceX · xAI — Investor Research"
        intro="Independent, daily research on the Elon Musk ecosystem — Tesla, SpaceX, xAI and the companies around them. News, earnings, data trackers and valuation analysis for long-term investors."
        articles={articles}
      />
      <p className="sr-only">{s.latest}</p>
    </NewsChrome>
  );
}
