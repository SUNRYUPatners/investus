import type { Metadata } from "next";
import { getArticlesByKind } from "@/lib/articles";
import { hreflangAlternates } from "@/lib/articleSeo";
import { NewsChrome, NewsListView } from "@/components/news/NewsUI";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "SpaceX Valuation & Coverage | Investus",
  description: "SpaceX coverage for investors: valuation, Starlink, Starship, AI compute and how the private company is tracked and priced.",
  alternates: hreflangAlternates("/news/spacex", "en"),
  robots: { index: true, follow: true },
};

export default function SpacexEn() {
  return (
    <NewsChrome locale="en" altHref="/ko/news/spacex">
      <NewsListView
        locale="en"
        title="SpaceX — valuation & coverage"
        intro="SpaceX is private, so there is no ticker. This tracker collects our research on SpaceX valuation, Starlink economics, Starship milestones and AI-compute buildout, and how secondary markets and funding rounds imply a price."
        articles={getArticlesByKind("spacex")}
      />
    </NewsChrome>
  );
}
