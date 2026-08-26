import { notFound, redirect } from "next/navigation";
import { MarketHomeShell } from "@/components/market/MarketHomeShell";
import { getLocale } from "@/lib/getLocale";
import { getHomeMarketSnapshot } from "@/lib/getHomeMarketSnapshot";
import { isMarketId, type MarketId } from "@/lib/markets/types";

export default async function PreviewMarketPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market: raw } = await params;
  if (raw === "gold") redirect("/preview/gold");
  if (!isMarketId(raw)) notFound();
  const market = raw as MarketId;
  const locale = await getLocale();
  // 미국 미리보기 = 본사이트와 동일한 SSR 시세 스냅샷
  const marketSnap = market === "us" ? await getHomeMarketSnapshot() : null;
  return (
    <MarketHomeShell
      market={market}
      locale={locale}
      initialData={marketSnap}
    />
  );
}
