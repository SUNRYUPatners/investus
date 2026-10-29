import type { Metadata } from "next";
import { getArticles } from "@/lib/articles";
import { hreflangAlternates } from "@/lib/articleSeo";
import { NewsChrome, NewsListView } from "@/components/news/NewsUI";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "테슬라·스페이스X·xAI 뉴스 — 투자 리서치 | Investus",
  description: "테슬라, 스페이스X, xAI 등 일론 머스크 생태계에 대한 매일의 투자 리서치 — 뉴스, 실적, 데이터 트래커, 밸류에이션 분석.",
  alternates: hreflangAlternates("/news", "ko"),
  robots: { index: true, follow: true },
};

export default function NewsIndexKo() {
  return (
    <NewsChrome locale="ko" altHref="/news">
      <NewsListView
        locale="ko"
        title="테슬라 · 스페이스X · xAI — 투자 리서치"
        intro="일론 머스크 생태계 — 테슬라, 스페이스X, xAI와 주변 기업 — 에 대한 독립적인 매일의 리서치. 장기 투자자를 위한 뉴스, 실적, 데이터 트래커, 밸류에이션 분석."
        articles={getArticles()}
      />
    </NewsChrome>
  );
}
