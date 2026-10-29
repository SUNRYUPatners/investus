import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `S&P500 완전 가이드 | Investus Learn`,
  description: "미국 대형주 500개 지수의 구성, 역사적 성과, 투자 전략.",
  alternates: { canonical: "https://www.investus.kr/learn/sp500" },
  openGraph: {
    title: "S&P500 완전 가이드",
    description: "미국 대형주 500개 지수의 구성, 역사적 성과, 투자 전략.",
    url: "https://www.investus.kr/learn/sp500",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
