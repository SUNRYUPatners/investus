import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `한국주식 투자 입문 가이드 | Investus Learn`,
  description: "코스피·시총상위·수급·장전·장중·장후, 미국주식과의 차이.",
  alternates: { canonical: "https://www.investus.kr/learn/korea-stocks" },
  openGraph: {
    title: "한국주식 투자 입문 가이드",
    description: "코스피·시총상위·수급·장전·장중·장후, 미국주식과의 차이.",
    url: "https://www.investus.kr/learn/korea-stocks",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
