import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `안전자산 탑10 — 달러·TLT·GLD·SGOV 해설 | Investus Learn`,
  description: "히트맵 달러인덱스·국채·금 ETF 10개가 뭔지, 만기·금리 민감도 한 장.",
  alternates: await localizedAlternates("/learn/safe-haven-etfs"),
  openGraph: {
    title: "안전자산 탑10 — 달러·TLT·GLD·SGOV 해설",
    description: "히트맵 달러인덱스·국채·금 ETF 10개가 뭔지, 만기·금리 민감도 한 장.",
    url: "https://www.investus.kr/learn/safe-haven-etfs",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
