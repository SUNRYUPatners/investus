import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `포트폴리오 분산·리밸런싱 전략 | Investus Learn`,
  description: "비중·현금·섹터·리밸런싱 주기.",
  alternates: await localizedAlternates("/learn/portfolio-strategy"),
  openGraph: {
    title: "포트폴리오 분산·리밸런싱 전략",
    description: "비중·현금·섹터·리밸런싱 주기.",
    url: "https://www.investus.kr/learn/portfolio-strategy",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
