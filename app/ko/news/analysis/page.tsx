import type { Metadata } from "next";
import { getArticlesByKind } from "@/lib/articles";
import { hreflangAlternates } from "@/lib/articleSeo";
import { NewsChrome, NewsListView } from "@/components/news/NewsUI";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "분석 — 테슬라·스페이스X·머스크 생태계 | Investus",
  description: "테슬라, 스페이스X, xAI와 머스크 생태계 심층 분석 — 기업 분석, 섹터 리뷰, 매크로 맥락.",
  alternates: hreflangAlternates("/news/analysis", "ko"),
  robots: { index: true, follow: true },
};

export default function AnalysisKo() {
  return (
    <NewsChrome locale="ko" altHref="/news/analysis">
      <NewsListView
        locale="ko"
        title="분석"
        intro="테슬라, 스페이스X, xAI와 관련 기업에 대한 기업 분석·섹터 리뷰·매크로 맥락."
        articles={getArticlesByKind("analysis")}
      />
    </NewsChrome>
  );
}
