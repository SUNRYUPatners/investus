import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `버핏지수 완전 가이드 | Investus Learn`,
  description: "시가총액/GDP, 고평가·저평가 맥락 읽기.",
  alternates: { canonical: "https://www.investus.kr/learn/buffett-indicator" },
  openGraph: {
    title: "버핏지수 완전 가이드",
    description: "시가총액/GDP, 고평가·저평가 맥락 읽기.",
    url: "https://www.investus.kr/learn/buffett-indicator",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
