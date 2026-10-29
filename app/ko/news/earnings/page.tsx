import type { Metadata } from "next";
import { getArticlesByKind } from "@/lib/articles";
import { hreflangAlternates } from "@/lib/articleSeo";
import { NewsChrome, NewsListView } from "@/components/news/NewsUI";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "실적·데이터 — 테슬라·스페이스X·머스크 생태계 | Investus",
  description: "테슬라, 스페이스X, xAI 등 머스크 생태계 실적 커버리지와 데이터 트래커 — 실적, 인도량, 마진, 가이던스.",
  alternates: hreflangAlternates("/news/earnings", "ko"),
  robots: { index: true, follow: true },
};

export default function EarningsKo() {
  return (
    <NewsChrome locale="ko" altHref="/news/earnings">
      <NewsListView
        locale="ko"
        title="실적·데이터"
        intro="머스크 생태계 전반의 실적 커버리지와 데이터 트래커 — 분기 실적, 인도량, 마진, 가이던스."
        articles={getArticlesByKind("earnings")}
      />
    </NewsChrome>
  );
}
