/** Internal symbol → Yahoo Finance ticker */
export const YAHOO_SYMBOL: Record<string, string> = {
  // Index cards
  SPX:    "^GSPC",
  COMP:   "^IXIC",
  DJI:    "^DJI",
  USDKRW: "USDKRW=X",
  // Index futures → underlying index
  ES:     "^GSPC",
  NQ:     "^IXIC",
  YM:     "^DJI",
  RTY:    "^RUT",
  // Commodity futures
  CL:     "CL=F",
  NG:     "NG=F",
  RB:     "RB=F",
  GC:     "GC=F",
  SI:     "SI=F",
  HG:     "HG=F",
  // Bond futures
  ZN:     "ZN=F",
  ZB:     "ZB=F",
  // FX futures
  "6E":   "EURUSD=X",
  "6J":   "JPY=X",
  // Agriculture futures
  ZC:     "ZC=F",
  ZW:     "ZW=F",
  ZS:     "ZS=F",
  // Crypto
  BTC:    "BTC-USD",
  ETH:    "ETH-USD",
};

export function toYahoo(symbol: string): string {
  return YAHOO_SYMBOL[symbol] ?? symbol;
}
