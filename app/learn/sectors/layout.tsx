import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `미국 주식 11개 섹터 가이드 | Investus Learn`,
  description: "GICS 섹터별 특징, 기술주 쏠림 피하기.",
  alternates: { canonical: "https://www.investus.kr/learn/sectors" },
  openGraph: {
    title: "미국 주식 11개 섹터 가이드",
    description: "GICS 섹터별 특징, 기술주 쏠림 피하기.",
    url: "https://www.investus.kr/learn/sectors",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
