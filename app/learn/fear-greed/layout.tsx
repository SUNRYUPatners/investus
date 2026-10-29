import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `공포탐욕지수 완전 가이드 | Investus Learn`,
  description: "CNN 공포·탐욕 지수 계산법과 활용 한계.",
  alternates: await localizedAlternates("/learn/fear-greed"),
  openGraph: {
    title: "공포탐욕지수 완전 가이드",
    description: "CNN 공포·탐욕 지수 계산법과 활용 한계.",
    url: "https://www.investus.kr/learn/fear-greed",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
