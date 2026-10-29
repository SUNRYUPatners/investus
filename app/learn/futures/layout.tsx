import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `선물·프리마켓 읽는 법 | Investus Learn`,
  description: "나스닥·S&P 선물, 야간 거래, 장 시작 전 시장 온도.",
  alternates: { canonical: "https://www.investus.kr/learn/futures" },
  openGraph: {
    title: "선물·프리마켓 읽는 법",
    description: "나스닥·S&P 선물, 야간 거래, 장 시작 전 시장 온도.",
    url: "https://www.investus.kr/learn/futures",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
