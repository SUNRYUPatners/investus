import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `한국 거주자 미국주식 세금·계좌 | Investus Learn`,
  description: "양도소득·배당 원천징수·종합과세 개념 (세무 자문 아님).",
  alternates: { canonical: "https://www.investus.kr/learn/us-stock-tax" },
  openGraph: {
    title: "한국 거주자 미국주식 세금·계좌",
    description: "양도소득·배당 원천징수·종합과세 개념 (세무 자문 아님).",
    url: "https://www.investus.kr/learn/us-stock-tax",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
