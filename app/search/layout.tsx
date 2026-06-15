import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.investus.kr/search" },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
