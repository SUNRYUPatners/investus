import { MarketHomeShell } from "@/components/market/MarketHomeShell";
import { getLocale } from "@/lib/getLocale";
import { getHomeMarketSnapshot } from "@/lib/getHomeMarketSnapshot";
import type { MarketId } from "@/lib/markets/types";

/** 시장별 홈 페이지 공통 SSR */
export async function renderMarketHome(market: MarketId) {
  const locale = await getLocale();
  const marketSnap = market === "us" ? await getHomeMarketSnapshot() : null;
  return (
    <MarketHomeShell market={market} locale={locale} initialData={marketSnap} />
  );
}
