import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `투자 심리·행동재무 가이드 | Investus Learn`,
  description: "FOMO, 손실 회피, 공포탐욕, 규칙으로 막는 실수.",
  alternates: await localizedAlternates("/learn/investing-psychology"),
  openGraph: {
    title: "투자 심리·행동재무 가이드",
    description: "FOMO, 손실 회피, 공포탐욕, 규칙으로 막는 실수.",
    url: "https://www.investus.kr/learn/investing-psychology",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
