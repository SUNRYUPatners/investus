import { KR_HEATMAP, KR_TOP10, getMarketConfig } from "./config";

const KR_NAME = new Map<string, string>();
for (const s of [...KR_TOP10, ...KR_HEATMAP]) {
  const code = s.symbol.replace(/\.KS$/i, "");
  KR_NAME.set(code, s.name);
  KR_NAME.set(s.symbol.toUpperCase(), s.name);
}

const INDEX_NAMES: Record<string, string> = {
  "^KS11": "코스피",
  "^KQ11": "코스닥",
  KOSPI: "코스피",
  KOSDAQ: "코스닥",
};

/** 6자리 코드 또는 005930.KS */
export function parseKrStockCode(symbol: string): string | null {
  const s = symbol.toUpperCase().trim();
  if (/^\d{6}$/.test(s)) return s;
  const m = s.match(/^(\d{6})\.KS$/);
  return m ? m[1] : null;
}

export function isKrIndexSymbol(symbol: string): boolean {
  const s = symbol.toUpperCase();
  return s === "^KS11" || s === "^KQ11" || s === "KOSPI" || s === "KOSDAQ";
}

export function isKrSymbol(symbol: string): boolean {
  return parseKrStockCode(symbol) != null || isKrIndexSymbol(symbol);
}

export function normalizeKrStockSymbol(code: string): string {
  const c = code.replace(/\.KS$/i, "");
  return `${c}.KS`;
}

export function krStockDisplayName(symbol: string, fallback?: string): string {
  const code = parseKrStockCode(symbol);
  if (code && KR_NAME.has(code)) return KR_NAME.get(code)!;
  if (INDEX_NAMES[symbol.toUpperCase()]) return INDEX_NAMES[symbol.toUpperCase()];
  return fallback ?? symbol;
}

export function krMarketCacheKey(): string {
  return getMarketConfig("kr").marketCacheKey;
}
