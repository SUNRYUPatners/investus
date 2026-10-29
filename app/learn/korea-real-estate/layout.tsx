import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `한국 부동산 입문 — 매매·전세·정책 | Investus Learn`,
  description: "공급·전세·대출·세제 삼각 축, 실수요 vs 투자 수요.",
  alternates: { canonical: "https://www.investus.kr/learn/korea-real-estate" },
  openGraph: {
    title: "한국 부동산 입문 — 매매·전세·정책",
    description: "공급·전세·대출·세제 삼각 축, 실수요 vs 투자 수요.",
    url: "https://www.investus.kr/learn/korea-real-estate",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
