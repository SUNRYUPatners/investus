import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `나스닥 완전 가이드 — 나스닥100과 QQQ | Investus Learn`,
  description: "거래소·종합지수·나스닥100 구분, S&P500과의 차이.",
  alternates: { canonical: "https://www.investus.kr/learn/nasdaq" },
  openGraph: {
    title: "나스닥 완전 가이드 — 나스닥100과 QQQ",
    description: "거래소·종합지수·나스닥100 구분, S&P500과의 차이.",
    url: "https://www.investus.kr/learn/nasdaq",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
