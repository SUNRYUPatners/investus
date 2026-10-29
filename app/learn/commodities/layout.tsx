import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `원자재 투자 가이드 — 금·유가·농산물 | Investus Learn`,
  description: "금, 원유, 농산물·산업금속, GLD·DBC 등 ETF와 인플레 헤지.",
  alternates: await localizedAlternates("/learn/commodities"),
  openGraph: {
    title: "원자재 투자 가이드 — 금·유가·농산물",
    description: "금, 원유, 농산물·산업금속, GLD·DBC 등 ETF와 인플레 헤지.",
    url: "https://www.investus.kr/learn/commodities",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
