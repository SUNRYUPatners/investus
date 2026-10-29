import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `안전자산 가이드 — 비트코인·이더·금·은 | Investus Learn`,
  description: "가상화폐와 현물을 나눠 보기, 금리·달러·ETF 수급, 비중.",
  alternates: await localizedAlternates("/learn/safe-assets"),
  openGraph: {
    title: "안전자산 가이드 — 비트코인·이더·금·은",
    description: "가상화폐와 현물을 나눠 보기, 금리·달러·ETF 수급, 비중.",
    url: "https://www.investus.kr/learn/safe-assets",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
