import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `미국주식 투자 완전 입문 가이드 | Investus Learn`,
  description: "계좌 개설, 수수료·환율, 세금 개념, DCA, Investus 5분 루틴까지.",
  alternates: await localizedAlternates("/learn/us-stock-basics"),
  openGraph: {
    title: "미국주식 투자 완전 입문 가이드",
    description: "계좌 개설, 수수료·환율, 세금 개념, DCA, Investus 5분 루틴까지.",
    url: "https://www.investus.kr/learn/us-stock-basics",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
