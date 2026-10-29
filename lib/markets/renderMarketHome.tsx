import { MarketHomeShell } from "@/components/market/MarketHomeShell";
import { getLocale } from "@/lib/getLocale";
import { getHomeMarketSnapshot } from "@/lib/getHomeMarketSnapshot";
import { getMuskKindCards, getMuskEcosystemCards, getTickerCards } from "@/lib/articles";
import { getTeslaQuoteSnapshot } from "@/lib/teslaValuation";
import type { MarketId } from "@/lib/markets/types";

/** 시장별 홈 페이지 공통 SSR */
export async function renderMarketHome(market: MarketId) {
  const locale = await getLocale();
  const [marketSnap, teslaValuation] = await Promise.all([
    market === "us" ? getHomeMarketSnapshot() : Promise.resolve(null),
    getTeslaQuoteSnapshot(),
  ]);
  return (
    <MarketHomeShell
      market={market}
      locale={locale}
      initialData={marketSnap}
      analysisArticles={getMuskEcosystemCards(locale).slice(0, 48)}
      earningsArticles={getMuskKindCards("earnings", locale).slice(0, 24)}
      spacexArticles={getMuskKindCards("spacex", locale).slice(0, 24)}
      teslaArticles={getTickerCards("TSLA", locale, 24)}
      teslaValuation={teslaValuation}
    />
  );
}
