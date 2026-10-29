import { STOCK_SEARCH_DB } from "@/lib/stockSearchDb";
import { isKrSymbol } from "@/lib/markets/krSymbol";

// Known, real tickers: the comprehensive US search registry + any KR (numeric)
// symbol. Anything else (e.g. ZZZZ) is unknown and should 404.
const KNOWN_SYMBOLS = new Set<string>(STOCK_SEARCH_DB.map((x) => x.symbol.toUpperCase()));

export function isKnownStockSymbol(s: string): boolean {
  const up = s.toUpperCase();
  if (KNOWN_SYMBOLS.has(up)) return true;
  try {
    if (isKrSymbol(up)) return true;
  } catch {
    /* ignore */
  }
  return false;
}
