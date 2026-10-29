import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `13F·기관 포트폴리오 읽는 법 | Investus Learn`,
  description: "SEC 13F 공시 해석과 한계. 단순 모방의 위험.",
  alternates: await localizedAlternates("/learn/13f-guide"),
  openGraph: {
    title: "13F·기관 포트폴리오 읽는 법",
    description: "SEC 13F 공시 해석과 한계. 단순 모방의 위험.",
    url: "https://www.investus.kr/learn/13f-guide",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
