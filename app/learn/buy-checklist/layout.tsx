import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `매수 전 체크리스트 10가지 | Investus Learn`,
  description: "비중·밸류·세금·심리 — 사기 전에 적을 규칙.",
  alternates: { canonical: "https://www.investus.kr/learn/buy-checklist" },
  openGraph: {
    title: "매수 전 체크리스트 10가지",
    description: "비중·밸류·세금·심리 — 사기 전에 적을 규칙.",
    url: "https://www.investus.kr/learn/buy-checklist",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
