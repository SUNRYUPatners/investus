import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/articleSeo";
import { NewsChrome } from "@/components/news/NewsUI";
import { AboutContent } from "@/components/news/AboutContent";

export const metadata: Metadata = {
  title: "About Investus & Editorial Policy | Investus",
  description: "Who runs Investus and how we work: independent Tesla, SpaceX and xAI research, with source citations, balanced views, and no paid coverage.",
  alternates: hreflangAlternates("/news/about", "en"),
  robots: { index: true, follow: true },
};

export default function AboutEn() {
  return (
    <NewsChrome locale="en" altHref="/ko/news/about">
      <AboutContent locale="en" />
    </NewsChrome>
  );
}
