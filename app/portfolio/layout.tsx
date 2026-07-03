import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.investus.kr/portfolio" },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
