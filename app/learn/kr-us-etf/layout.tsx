import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `한국 vs 미국 ETF — KODEX·TIGER vs SPY | Investus Learn`,
  description: "국내 상장 해외 ETF와 미국 ETF, 세금·환율·환헤지 차이.",
  alternates: { canonical: "https://www.investus.kr/learn/kr-us-etf" },
  openGraph: {
    title: "한국 vs 미국 ETF — KODEX·TIGER vs SPY",
    description: "국내 상장 해외 ETF와 미국 ETF, 세금·환율·환헤지 차이.",
    url: "https://www.investus.kr/learn/kr-us-etf",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
