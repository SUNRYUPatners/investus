import type { Metadata } from "next";
import { getArticlesByKind } from "@/lib/articles";
import { hreflangAlternates } from "@/lib/articleSeo";
import { NewsChrome, NewsListView } from "@/components/news/NewsUI";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "스페이스X 밸류에이션·커버리지 | Investus",
  description: "투자자를 위한 스페이스X 커버리지 — 밸류에이션, 스타링크, 스타십, AI 컴퓨트, 비상장 기업의 가격 추적.",
  alternates: hreflangAlternates("/news/spacex", "ko"),
  robots: { index: true, follow: true },
};

export default function SpacexKo() {
  return (
    <NewsChrome locale="ko" altHref="/news/spacex">
      <NewsListView
        locale="ko"
        title="스페이스X — 밸류에이션·커버리지"
        intro="스페이스X는 비상장이라 티커가 없습니다. 이 트래커는 스페이스X 밸류에이션, 스타링크 경제성, 스타십 마일스톤, AI 컴퓨트 확장과 2차 거래·투자 라운드가 시사하는 가격에 대한 리서치를 모읍니다."
        articles={getArticlesByKind("spacex")}
      />
    </NewsChrome>
  );
}
