import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `채권과 금리 — 10년물·역수익률 | Investus Learn`,
  description: "채권 가격과 금리의 역관계, 주식과의 역할, 대표 ETF.",
  alternates: { canonical: "https://www.investus.kr/learn/bonds" },
  openGraph: {
    title: "채권과 금리 — 10년물·역수익률",
    description: "채권 가격과 금리의 역관계, 주식과의 역할, 대표 ETF.",
    url: "https://www.investus.kr/learn/bonds",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
