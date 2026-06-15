import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.investus.kr/more" },
};

export default function MoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
