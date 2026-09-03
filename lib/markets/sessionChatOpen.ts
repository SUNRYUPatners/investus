import { isMarketOpen } from "@/lib/marketHours";
import type { MarketId } from "./types";
import { isMarketSessionOpen } from "./hours";

/** 실시간 시황방 — US·KR (전 페이지 FAB) */
export function sessionChatSupported(market: MarketId): boolean {
  return market === "us" || market === "kr";
}

export function isSessionChatOpen(market: MarketId, date = new Date()): boolean {
  if (!sessionChatSupported(market)) return false;
  if (market === "us") return isMarketOpen();
  return isMarketSessionOpen("kr", date);
}
