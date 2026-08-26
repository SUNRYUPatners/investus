export type MarketId = "us" | "kr" | "safe" | "kr-re";

export const MARKET_IDS: MarketId[] = ["us", "kr", "safe", "kr-re"];

export function isMarketId(v: string): v is MarketId {
  return (MARKET_IDS as string[]).includes(v);
}

export function parseMarketId(v: string | null | undefined, fallback: MarketId = "us"): MarketId {
  if (v && isMarketId(v)) return v;
  return fallback;
}
