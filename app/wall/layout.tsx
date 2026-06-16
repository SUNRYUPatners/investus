import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "종토방 — 미국주식 투자 커뮤니티 | 인베스트어스 Investus",
  description: "인베스트어스(Investus) 종토방 — 미국주식 투자자들의 실시간 의견, 종목 토론, 투자 아이디어를 공유하는 커뮤니티.",
  alternates: { canonical: "https://www.investus.kr/wall" },
  openGraph: {
    title: "종토방 — 미국주식 투자 커뮤니티 | 인베스트어스",
    description: "미국주식 투자자 커뮤니티 — 종목 토론, 실시간 의견 공유",
    url: "https://www.investus.kr/wall",
  },
};

export default function WallLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
