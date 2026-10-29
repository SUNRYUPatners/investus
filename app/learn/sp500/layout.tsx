import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `S&P500 완전 가이드 | Investus Learn`,
  description: "미국 대형주 500개 지수의 구성, 역사적 성과, 투자 전략.",
  alternates: await localizedAlternates("/learn/sp500"),
  openGraph: {
    title: "S&P500 완전 가이드",
    description: "미국 대형주 500개 지수의 구성, 역사적 성과, 투자 전략.",
    url: "https://www.investus.kr/learn/sp500",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
