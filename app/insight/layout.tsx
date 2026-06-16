import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "인베스트어스 리포트 — 미국주식 투자 분석 | Investus Insight",
  description: "인베스트어스(Investus) 선류파트너스 CIO의 미국주식 투자 리포트, 시장 분석, S&P500·NASDAQ 주요 이슈, AI·반도체 종목 분석.",
  alternates: { canonical: "https://www.investus.kr/insight" },
  openGraph: {
    title: "인베스트어스 리포트 — 미국주식 투자 분석",
    description: "선류파트너스 CIO 투자 리포트 · S&P500 · NASDAQ · AI·반도체 종목 분석",
    url: "https://www.investus.kr/insight",
  },
};

export default function InsightLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
