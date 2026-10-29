import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `기술적 분석 입문 — 이동평균·RSI | Investus Learn`,
  description: "이동평균, RSI, 지지·저항. 차트는 보조 도구로.",
  alternates: await localizedAlternates("/learn/technical-analysis"),
  openGraph: {
    title: "기술적 분석 입문 — 이동평균·RSI",
    description: "이동평균, RSI, 지지·저항. 차트는 보조 도구로.",
    url: "https://www.investus.kr/learn/technical-analysis",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
