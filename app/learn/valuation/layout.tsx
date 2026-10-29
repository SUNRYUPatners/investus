import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `PER·PBR·기업 가치 평가 가이드 | Investus Learn`,
  description: "주식이 비싼지 싼지 판단하는 밸류에이션 지표와 EV/EBITDA.",
  alternates: { canonical: "https://www.investus.kr/learn/valuation" },
  openGraph: {
    title: "PER·PBR·기업 가치 평가 가이드",
    description: "주식이 비싼지 싼지 판단하는 밸류에이션 지표와 EV/EBITDA.",
    url: "https://www.investus.kr/learn/valuation",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
