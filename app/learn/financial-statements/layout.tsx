import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `재무제표 읽기 — 손익·재무·현금흐름 | Investus Learn`,
  description: "10-K·10-Q에서 매출·이익·부채·FCF를 어떻게 보는지.",
  alternates: { canonical: "https://www.investus.kr/learn/financial-statements" },
  openGraph: {
    title: "재무제표 읽기 — 손익·재무·현금흐름",
    description: "10-K·10-Q에서 매출·이익·부채·FCF를 어떻게 보는지.",
    url: "https://www.investus.kr/learn/financial-statements",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
