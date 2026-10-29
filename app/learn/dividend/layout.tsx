import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `배당 투자 가이드 | Investus Learn`,
  description: "배당수익률, 배당귀족, DRIP, 미국주식 배당 세금.",
  alternates: { canonical: "https://www.investus.kr/learn/dividend" },
  openGraph: {
    title: "배당 투자 가이드",
    description: "배당수익률, 배당귀족, DRIP, 미국주식 배당 세금.",
    url: "https://www.investus.kr/learn/dividend",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
