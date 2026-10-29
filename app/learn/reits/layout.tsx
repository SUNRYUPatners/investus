import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `REITs 부동산 ETF 가이드 | Investus Learn`,
  description: "리츠 구조, 금리·임대수익, VNQ·IYR, 포트폴리오 역할.",
  alternates: await localizedAlternates("/learn/reits"),
  openGraph: {
    title: "REITs 부동산 ETF 가이드",
    description: "리츠 구조, 금리·임대수익, VNQ·IYR, 포트폴리오 역할.",
    url: "https://www.investus.kr/learn/reits",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
