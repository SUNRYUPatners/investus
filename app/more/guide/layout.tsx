import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investus 사용법 가이드 | 인베스트어스",
  description: "인베스트어스(Investus) 사용법 완전 가이드. 홈 화면 구성, S&P500·NASDAQ 지수 읽는 법, 선물 시장(Futures Map), S&P500 히트맵, 공포&탐욕 지수, 버핏 지수, 포트폴리오 관리, 13F 투자 대가 포트폴리오 보는 법까지 초보자도 쉽게 이해할 수 있도록 설명합니다.",
  alternates: { canonical: "https://www.investus.kr/more/guide" },
  openGraph: {
    title: "Investus 사용법 가이드 | 인베스트어스",
    description: "미국주식 초보자를 위한 Investus 완전 사용법 — 지수·선물·히트맵·버핏지수 설명",
    url: "https://www.investus.kr/more/guide",
  },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
