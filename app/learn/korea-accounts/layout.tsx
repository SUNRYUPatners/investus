import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `ISA·연금저축·IRP 가이드 | Investus Learn`,
  description: "한국 세제혜택 계좌와 미국 ETF·주식, 비과세·세액공제 개념.",
  alternates: await localizedAlternates("/learn/korea-accounts"),
  openGraph: {
    title: "ISA·연금저축·IRP 가이드",
    description: "한국 세제혜택 계좌와 미국 ETF·주식, 비과세·세액공제 개념.",
    url: "https://www.investus.kr/learn/korea-accounts",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
