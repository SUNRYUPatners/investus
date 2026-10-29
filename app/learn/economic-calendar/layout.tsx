import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `경제 캘린더 활용법 | Investus Learn`,
  description: "CPI·FOMC·고용 발표 전후 변동성 관리.",
  alternates: { canonical: "https://www.investus.kr/learn/economic-calendar" },
  openGraph: {
    title: "경제 캘린더 활용법",
    description: "CPI·FOMC·고용 발표 전후 변동성 관리.",
    url: "https://www.investus.kr/learn/economic-calendar",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
