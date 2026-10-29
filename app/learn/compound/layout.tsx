import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `복리와 장기 투자 | Investus Learn`,
  description: "시간이 수익을 만드는 원리, 초기·중기·후기의 차이.",
  alternates: await localizedAlternates("/learn/compound"),
  openGraph: {
    title: "복리와 장기 투자",
    description: "시간이 수익을 만드는 원리, 초기·중기·후기의 차이.",
    url: "https://www.investus.kr/learn/compound",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
