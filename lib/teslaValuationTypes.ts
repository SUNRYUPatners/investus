/** Live Tesla quote/multiples for the valuation page. No mock fallbacks. */
export type TeslaQuoteSnapshot = {
  price: number | null;
  changePercent: number | null;
  /** Absolute USD market cap, or null when the live feed did not return one. */
  marketCap: number | null;
  pe: number | null;
  eps: number | null;
  week52High: number | null;
  week52Low: number | null;
  asOfIso: string | null;
  quoteSource: "yahoo" | "finnhub" | null;
};
