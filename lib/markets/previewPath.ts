import type { MarketId } from "./types";
import { marketHref, parseMarketPath, type MarketTab } from "./marketPath";

/** @deprecated use parseMarketPath */
export function parsePreviewPath(pathname: string): {
  market: MarketId | null;
  tab: MarketTab;
  suffix: string;
} {
  const parsed = parseMarketPath(pathname);
  if (parsed.isPreview) {
    return { market: parsed.market, tab: parsed.tab, suffix: parsed.suffix };
  }
  // 본사 `/kr` 등도 market 반환 (스위처·네비 호환)
  return { market: parsed.market, tab: parsed.tab, suffix: parsed.suffix };
}

/** @deprecated use marketHref */
export function previewHref(market: MarketId, tab: MarketTab): string {
  return marketHref(market, tab);
}

export { marketHref, parseMarketPath, type MarketTab };
