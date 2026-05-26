import type { Metadata } from "next";

type Props = { params: Promise<{ symbol: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  return {
    alternates: { canonical: `https://www.investus.kr/stock/${symbol}` },
  };
}

export default function StockLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
