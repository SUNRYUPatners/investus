import type { MarketId } from "./types";

/** 시장별 가격 표시 (카드·목록·티커 공통) */
export function formatMarketPrice(market: MarketId, price: number): string {
  if (market === "kr") return `₩${Math.round(price).toLocaleString("ko-KR")}`;
  if (market === "safe") {
    if (price >= 1000) return `$${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
    return `$${price.toFixed(2)}`;
  }
  if (market === "kr-re") return `${Math.round(price).toLocaleString("ko-KR")}`;
  return `$${price.toFixed(2)}`;
}

/** 티커·상단바 라벨 — KR·Safe는 기업/자산 한글명 우선 */
export function marketQuoteLabel(market: MarketId, quote: { symbol: string; name: string }): string {
  if (market === "kr" || market === "safe" || market === "kr-re") return quote.name;
  return quote.symbol;
}
