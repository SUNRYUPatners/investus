import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://investus.kr/education" },
};

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
