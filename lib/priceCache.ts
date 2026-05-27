/**
 * Shared in-process price cache — ALL routes must use this module.
 * Single YF v8 source of truth: prevents endpoint mismatch between routes.
 *
 * Cache hierarchy (read):  in-memory → KV → Yahoo Finance v8 → TwelveData
 * Cache hierarchy (write): in-memory + KV updated together on every fresh fetch
 */

import { fetchBatchQuotes, fetchQuoteV8, type YFQuote } from "@/lib/yahooFinance";
import { isMarketOpen } from "@/lib/marketHours";
import { kvGetPrice, kvSetPrice, type PriceData } from "@/lib/kv";

export type PriceEntry = { price: number; change: number; changePercent: number };

type CacheEntry = PriceEntry & { at: number };

// Module-level singleton — shared across all requests within the same instance
const _cache = new Map<string, CacheEntry>();
const LIVE_TTL       = 60_000;            // 1 min during market hours
const CLOSED_KV_TTL = 23 * 60 * 60_000; // 23h — force YF v7 refresh once per day when market closed

function getCached(sym: string, open: boolean): CacheEntry | null {
  const e = _cache.get(sym);
  if (!e) return null;
  if (!open) return e;
  return Date.now() - e.at < LIVE_TTL ? e : null;
}

function setCache(sym: string, data: PriceEntry): void {
  const entry: PriceData = { ...data, at: Date.now() };
  _cache.set(sym, entry);
  kvSetPrice(sym, entry);
}


async function fetchTDPrice(sym: string): Promise<PriceEntry | null> {
  const key = process.env.TWELVEDATA_API_KEY;
  if (!key) return null;
  try {
    const r = await fetch(
      `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(sym)}&apikey=${key}`,
      { cache: "no-store" },
    );
    if (!r.ok) return null;
    const d = await r.json();
    const price = parseFloat(d.close ?? "0");
    if (isNaN(price) || price <= 0) return null;
    return {
      price,
      change:        parseFloat(d.change         ?? "0"),
      changePercent: parseFloat(d.percent_change ?? "0"),
    };
  } catch { return null; }
}

/**
 * Returns prices for the given symbols from the shared cache.
 * Symbols not found in cache are fetched from YF v8 and written back.
 * Max 20 symbols per call.
 */
export async function getPrices(
  symbols: string[],
): Promise<Record<string, PriceEntry>> {
  const open   = isMarketOpen();
  const result: Record<string, PriceEntry> = {};
  const need: string[]                     = [];

  // 1) In-memory cache
  for (const sym of symbols) {
    const c = getCached(sym, open);
    if (c) result[sym] = { price: c.price, change: c.change, changePercent: c.changePercent };
    else need.push(sym);
  }
  if (need.length === 0) return result;

  // 2) KV fallback
  const kvRows    = await Promise.all(need.map(async (sym) => ({ sym, d: await kvGetPrice(sym) })));
  const stillNeed: string[] = [];
  for (const { sym, d } of kvRows) {
    if (d && d.price > 0) {
      const kvAge   = Date.now() - (d.at ?? 0);
      const tooOld  = !open && kvAge > CLOSED_KV_TTL;
      result[sym] = { price: d.price, change: d.change, changePercent: d.changePercent };
      _cache.set(sym, { ...d, at: open || tooOld ? 0 : Date.now() });
      if (open || tooOld) stillNeed.push(sym); // re-fetch when live or KV is stale
    } else {
      stillNeed.push(sym);
    }
  }
  need.splice(0, need.length, ...stillNeed);
  if (need.length === 0) return result;
  if (need.length === 0) return result;

  // 3) Yahoo Finance v7 batch (same source as market-data — correct prices)
  try {
    const yfRows = await fetchBatchQuotes(need);
    yfRows.forEach((q) => {
      if (q.price > 0) {
        const entry = { price: q.price, change: q.change, changePercent: q.changePercent };
        result[q.symbol] = entry;
        setCache(q.symbol, entry);
      }
    });
  } catch { /* return partial results */ }

  // 4) TwelveData — only for symbols still missing after YF
  const missing = need.filter((s) => !result[s]);
  if (missing.length > 0) {
    await Promise.all(missing.map(async (sym) => {
      const td = await fetchTDPrice(sym);
      if (td && td.price > 0) { result[sym] = td; setCache(sym, td); return; }
      // Last resort: individual YF v8 retry
      const yf = await fetchQuoteV8(sym);
      if (yf && yf.price > 0) {
        const entry = { price: yf.price, change: yf.change, changePercent: yf.changePercent };
        result[sym] = entry;
        setCache(sym, entry);
      }
    }));
  }

  return result;
}

/** Cache-control header value based on market state */
export function ccHeader(): string {
  return isMarketOpen()
    ? "public, s-maxage=55, stale-while-revalidate=120"
    : "public, s-maxage=3600, stale-while-revalidate=86400";
}
