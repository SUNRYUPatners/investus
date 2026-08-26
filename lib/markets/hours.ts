import type { MarketId } from "./types";
import { getMarketConfig } from "./config";

/** Minutes from midnight in the market's timezone. */
function wallClockMinutes(timeZone: string, date = new Date()): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  // Intl may return "24" for midnight in some environments
  const h = hour === 24 ? 0 : hour;
  return { day: dayMap[weekday] ?? 1, minutes: h * 60 + minute };
}

export function isMarketSessionOpen(market: MarketId, date = new Date()): boolean {
  const cfg = getMarketConfig(market);
  if (market === "safe") return true; // 24h crypto/commodities
  if (market === "us") {
    // reuse existing US logic via dynamic import would be circular — lightweight here
    const { day, minutes } = wallClockMinutes(cfg.timezone, date);
    if (day === 0 || day === 6) return false;
    return minutes >= cfg.openHours.startMin && minutes < cfg.openHours.endMin;
  }
  const { day, minutes } = wallClockMinutes(cfg.timezone, date);
  if (day === 0 || day === 6) return false;
  return minutes >= cfg.openHours.startMin && minutes < cfg.openHours.endMin;
}
