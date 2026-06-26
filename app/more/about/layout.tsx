import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "서비스 소개 | 인베스트어스 Investus",
  description: "인베스트어스(Investus)는 SUNRYU Partners CIO가 운영하는 미국주식 투자 정보 플랫폼입니다. 전 보유 종목 수익률 100% 이상, 손실 종목 0개 기록. 미국주식 실시간 시세, CIO 분석 리포트, 투자 기초 교육을 무료 제공합니다.",
  alternates: { canonical: "https://www.investus.kr/more/about" },
  openGraph: {
    title: "서비스 소개 — SUNRYU Partners & Investus",
    description: "SUNRYU Partners CIO 운영 미국주식 플랫폼. 실시간 시세·CIO 리포트·투자교육 무료 제공",
    url: "https://www.investus.kr/more/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
