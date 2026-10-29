import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `옵션 기초 — 콜·풋·IV | Investus Learn`,
  description: "콜·풋, 행사가·만기, 내재변동성. 교육용·고위험 안내.",
  alternates: await localizedAlternates("/learn/options"),
  openGraph: {
    title: "옵션 기초 — 콜·풋·IV",
    description: "콜·풋, 행사가·만기, 내재변동성. 교육용·고위험 안내.",
    url: "https://www.investus.kr/learn/options",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
