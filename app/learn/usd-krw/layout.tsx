import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `환율과 미국주식 | Investus Learn`,
  description: "달러 vs 원화 수익률, 환헤지 vs 환노출.",
  alternates: await localizedAlternates("/learn/usd-krw"),
  openGraph: {
    title: "환율과 미국주식",
    description: "달러 vs 원화 수익률, 환헤지 vs 환노출.",
    url: "https://www.investus.kr/learn/usd-krw",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
