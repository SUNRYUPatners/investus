import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `CPI·연준(FOMC)·금리 가이드 | Investus Learn`,
  description: "인플레이션 지표, 금리 결정이 주식·채권에 미치는 영향.",
  alternates: await localizedAlternates("/learn/macro-rates"),
  openGraph: {
    title: "CPI·연준(FOMC)·금리 가이드",
    description: "인플레이션 지표, 금리 결정이 주식·채권에 미치는 영향.",
    url: "https://www.investus.kr/learn/macro-rates",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
