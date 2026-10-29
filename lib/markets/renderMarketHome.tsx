import { MarketHomeShell } from "@/components/market/MarketHomeShell";
import { getLocale } from "@/lib/getLocale";
import { getHomeMarketSnapshot } from "@/lib/getHomeMarketSnapshot";
import { getHomeArticleCards } from "@/lib/articles";
import type { MarketId } from "@/lib/markets/types";

/** 시장별 홈 페이지 공통 SSR */
export async function renderMarketHome(market: MarketId) {
  const locale = await getLocale();
  const marketSnap = market === "us" ? await getHomeMarketSnapshot() : null;
  // Cap the inline home list so the RSC payload stays small; /news has the full index.
  const articles = getHomeArticleCards(locale).slice(0, 48);
  return (
    <MarketHomeShell
      market={market}
      locale={locale}
      initialData={marketSnap}
      articles={articles}
    />
  );
}
