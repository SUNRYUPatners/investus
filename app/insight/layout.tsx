import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://investus.kr/insight" },
};

export default function InsightLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
