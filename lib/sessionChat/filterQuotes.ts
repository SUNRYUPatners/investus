import type { ChatQuote } from "./generate";

function isKrSymbol(sym: string): boolean {
  const s = sym.trim();
  if (s.endsWith(".KS") || s.endsWith(".KQ")) return true;
  if (/^\d{6}(\.KS)?$/i.test(s)) return true;
  if (s === "^KS11" || s === "^KQ11") return true;
  return false;
}

function isUsSymbol(sym: string): boolean {
  const s = sym.trim();
  if (isKrSymbol(s)) return false;
  if (s === "^GSPC" || s === "^IXIC" || s === "^DJI") return true;
  // 미국 티커 / ADR / BRK-B 등
  return /^[A-Z][A-Z0-9.-]{0,9}$/.test(s);
}

/** 시장별 시세만 남김 — US/KR 채팅 내용 혼입 방지 */
export function filterQuotesForMarket(
  market: "us" | "kr",
  quotes: ChatQuote[],
): ChatQuote[] {
  return quotes.filter((q) =>
    market === "kr" ? isKrSymbol(q.symbol) : isUsSymbol(q.symbol),
  );
}
