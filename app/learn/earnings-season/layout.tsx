import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `실적 시즌 읽는 법 | Investus Learn`,
  description: "EPS·컨센서스·가이던스, 발표 전후 체크리스트.",
  alternates: await localizedAlternates("/learn/earnings-season"),
  openGraph: {
    title: "실적 시즌 읽는 법",
    description: "EPS·컨센서스·가이던스, 발표 전후 체크리스트.",
    url: "https://www.investus.kr/learn/earnings-season",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
