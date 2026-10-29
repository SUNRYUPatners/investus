import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `적립식 투자(DCA) 가이드 | Investus Learn`,
  description: "매달 같은 금액, 환율 분산, 실패하는 적립 패턴.",
  alternates: await localizedAlternates("/learn/dca"),
  openGraph: {
    title: "적립식 투자(DCA) 가이드",
    description: "매달 같은 금액, 환율 분산, 실패하는 적립 패턴.",
    url: "https://www.investus.kr/learn/dca",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
