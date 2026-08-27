import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "서비스 소개 | 인베스트어스 Investus",
  description:
    "한국주식을 넘어 미국 주식, 비트코인·금, 한국 부동산까지 — AI가 연결하는 글로벌 자산관리(WM) 플랫폼. 실시간 시세, CIO 리포트, AI 포트폴리오 인사이트를 무료 제공합니다.",
  alternates: { canonical: "https://www.investus.kr/more/about" },
  openGraph: {
    title: "서비스 소개 — AI 기반 차세대 자산관리(WM) 핀테크 플랫폼",
    description:
      "파편화된 투자 데이터를 AI가 하나로 연결합니다. 미국·한국 주식, 비트코인·금, 한국 부동산 인사이트.",
    url: "https://www.investus.kr/more/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
