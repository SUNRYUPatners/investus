import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "미국주식 종목 검색 — 실시간 시세 | 인베스트어스 Investus",
  description: "NVIDIA·Tesla·Apple 등 미국주식 실시간 시세 검색. 인베스트어스(Investus)에서 주가·등락률·시가총액을 한눈에 확인하세요.",
  alternates: { canonical: "https://www.investus.kr/search" },
  openGraph: {
    title: "미국주식 종목 검색 — 실시간 시세 | 인베스트어스",
    description: "NVIDIA·Tesla·Apple 등 미국주식 실시간 시세 검색",
    url: "https://www.investus.kr/search",
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
