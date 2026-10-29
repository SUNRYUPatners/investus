import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `초보 투자 오해 TOP10 | Investus Learn`,
  description: "레버리지, 타이밍, 대가 복제, 세금 등 흔한 오해.",
  alternates: { canonical: "https://www.investus.kr/learn/myths" },
  openGraph: {
    title: "초보 투자 오해 TOP10",
    description: "레버리지, 타이밍, 대가 복제, 세금 등 흔한 오해.",
    url: "https://www.investus.kr/learn/myths",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
