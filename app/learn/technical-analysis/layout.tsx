import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `기술적 분석 입문 — 이동평균·RSI | Investus Learn`,
  description: "이동평균, RSI, 지지·저항. 차트는 보조 도구로.",
  alternates: { canonical: "https://www.investus.kr/learn/technical-analysis" },
  openGraph: {
    title: "기술적 분석 입문 — 이동평균·RSI",
    description: "이동평균, RSI, 지지·저항. 차트는 보조 도구로.",
    url: "https://www.investus.kr/learn/technical-analysis",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
