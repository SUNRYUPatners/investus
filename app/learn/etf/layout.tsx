import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `미국 ETF 완전 가이드 — SPY·VOO·QQQ | Investus Learn`,
  description: "운용보수·추적오차, 레버리지 함정, 코어/위성 나누는 법.",
  alternates: await localizedAlternates("/learn/etf"),
  openGraph: {
    title: "미국 ETF 완전 가이드 — SPY·VOO·QQQ",
    description: "운용보수·추적오차, 레버리지 함정, 코어/위성 나누는 법.",
    url: "https://www.investus.kr/learn/etf",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
