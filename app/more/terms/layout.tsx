import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.investus.kr/more/terms" },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
