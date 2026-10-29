import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: `비트코인·암호화폐 가이드 | Investus Learn`,
  description: "BTC·ETH, 현물 ETF(IBIT·FBTC), COIN·MSTR, 변동성·비중.",
  alternates: await localizedAlternates("/learn/crypto"),
  openGraph: {
    title: "비트코인·암호화폐 가이드",
    description: "BTC·ETH, 현물 ETF(IBIT·FBTC), COIN·MSTR, 변동성·비중.",
    url: "https://www.investus.kr/learn/crypto",
    type: "article",
  },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
