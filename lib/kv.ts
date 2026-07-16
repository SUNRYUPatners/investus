/**
 * Persistent key-value cache for price data across cold starts.
 *
 * Backend priority:
 *   1. Upstash Redis (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
 *   2. Vercel Edge Config (EDGE_CONFIG + VERCEL_API_TOKEN + EDGE_CONFIG_ID)
 *   3. No-op (local dev — silently skipped)
 *
 * Writes return a Promise so callers can `await` them (e.g. inside Next.js
 * `after()`, which keeps the serverless function alive via `waitUntil` until
 * settled). Callers that don't care about completion can ignore the Promise —
 * this preserves the previous fire-and-forget behavior for existing callers.
 * IMPORTANT: without `await`/`after()`, an unawaited write can be killed
 * mid-flight when the function freezes right after the response is sent.
 */

import { Redis } from "@upstash/redis";
import { createClient } from "@vercel/edge-config";

// ── Upstash Redis (primary) ───────────────────────────────────────────────

let _redis: Redis | null = null;

function getRedis(): Redis | null {
  if (_redis) return _redis;
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  _redis = new Redis({ url, token });
  return _redis;
}

// ── Vercel Edge Config (fallback) ─────────────────────────────────────────

let _ec: ReturnType<typeof createClient> | null = null;

function getEdgeConfig(): ReturnType<typeof createClient> | null {
  if (_ec) return _ec;
  const conn = process.env.EDGE_CONFIG;
  if (!conn) return null;
  _ec = createClient(conn);
  return _ec;
}

async function ecRead<T>(key: string): Promise<T | null> {
  const ec = getEdgeConfig();
  if (!ec) return null;
  try {
    const v = await ec.get<T>(key);
    return v ?? null;
  } catch {
    return null;
  }
}

async function ecWrite(key: string, value: unknown): Promise<void> {
  const token  = process.env.VERCEL_API_TOKEN;
  const ecId   = process.env.EDGE_CONFIG_ID;
  const teamId = process.env.VERCEL_TEAM_ID;
  if (!token || !ecId) return;
  const url = `https://api.vercel.com/v1/edge-config/${ecId}/items${teamId ? `?teamId=${teamId}` : ""}`;
  try {
    await fetch(url, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ operation: "upsert", key, value }] }),
    });
  } catch {}
}

// ── Public types & TTL ────────────────────────────────────────────────────

/** TTL: 7 days — covers weekends (Fri close → Mon open ~65h gap) */
const PRICE_TTL = 604_800;

export type PriceData = {
  price:         number;
  change:        number;
  changePercent: number;
  at:            number;
};

export type DetailData = Record<string, unknown>;

// ── Public API ────────────────────────────────────────────────────────────

export async function kvGetPrice(symbol: string): Promise<PriceData | null> {
  const r = getRedis();
  if (r) {
    try { return await r.get<PriceData>(`price:${symbol}`); } catch {}
  }
  return ecRead<PriceData>(`price__${symbol}`);
}

export function kvSetPrice(symbol: string, data: PriceData): Promise<void> {
  const r = getRedis();
  if (r) return r.set(`price:${symbol}`, data, { ex: PRICE_TTL }).then(() => {}).catch(() => {});
  return ecWrite(`price__${symbol}`, data);
}

export async function kvGetDetail(key: string): Promise<DetailData | null> {
  const r = getRedis();
  if (r) {
    try { return await r.get<DetailData>(`detail:${key}`); } catch {}
  }
  return ecRead<DetailData>(`detail__${key.replace(/[^a-zA-Z0-9_-]/g, "_")}`);
}

export function kvSetDetail(key: string, data: DetailData): Promise<void> {
  const r = getRedis();
  if (r) return r.set(`detail:${key}`, data, { ex: PRICE_TTL }).then(() => {}).catch(() => {});
  return ecWrite(`detail__${key.replace(/[^a-zA-Z0-9_-]/g, "_")}`, data);
}
