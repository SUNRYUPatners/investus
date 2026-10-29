import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `가치투자·대가 전략 가이드 | Investus Learn`,
  description: "버핏·그레이엄·린치·보글·달리오·막스 등 전설적 투자가의 핵심 원칙.",
  alternates: await localizedAlternates("/learn/value-investing"),
  openGraph: {
    title: "가치투자·대가 전략 가이드",
    description: "버핏·그레이엄·린치·보글·달리오·막스 등 전설적 투자가의 핵심 원칙.",
    url: "https://www.investus.kr/learn/value-investing",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
