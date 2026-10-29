import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/articleSeo";
import { NewsChrome } from "@/components/news/NewsUI";
import { AboutContent } from "@/components/news/AboutContent";

export const metadata: Metadata = {
  title: "인베스트어스 소개 및 편집 방침 | Investus",
  description: "인베스트어스를 누가 운영하고 어떻게 일하는지 — 독립적인 테슬라·스페이스X·xAI 리서치, 출처 인용, 균형 잡힌 시각, 대가성 보도 없음.",
  alternates: hreflangAlternates("/news/about", "ko"),
  robots: { index: true, follow: true },
};

export default function AboutKo() {
  return (
    <NewsChrome locale="ko" altHref="/news/about">
      <AboutContent locale="ko" />
    </NewsChrome>
  );
}
