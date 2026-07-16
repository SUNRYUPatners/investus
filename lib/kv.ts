/**
 * Persistent key-value cache for price data across cold starts.
 *
 * Backend priority:
 *   1. Upstash Redis (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
 *   2. Vercel Edge Config (EDGE_CONFIG + VERCEL_API_TOKEN + EDGE_CONFIG_ID)
 *   3. No-op (local dev — silently skipped)
 *
 * Writes use fire-and-forget so they never block the response.
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
  if (!ec) { console.error("[kv.ecRead] no edge config client (EDGE_CONFIG not set)"); return null; }
  try {
    const v = await ec.get<T>(key);
    console.log("[kv.ecRead]", key, v == null ? "miss" : "hit");
    return v ?? null;
  } catch (e) {
    console.error("[kv.ecRead] error", String(e));
    return null;
  }
}

function ecWrite(key: string, value: unknown): void {
  const token  = process.env.VERCEL_API_TOKEN;
  const ecId   = process.env.EDGE_CONFIG_ID;
  const teamId = process.env.VERCEL_TEAM_ID;
  if (!token || !ecId) { console.error("[kv.ecWrite] missing token/ecId", { hasToken: !!token, hasEcId: !!ecId }); return; }
  const url = `https://api.vercel.com/v1/edge-config/${ecId}/items${teamId ? `?teamId=${teamId}` : ""}`;
  fetch(url, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ items: [{ operation: "upsert", key, value }] }),
  }).then(async (r) => {
    if (!r.ok) console.error("[kv.ecWrite] failed", r.status, await r.text().catch(() => ""));
    else console.log("[kv.ecWrite] ok", key);
  }).catch((e) => console.error("[kv.ecWrite] error", String(e)));
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

export function kvSetPrice(symbol: string, data: PriceData): void {
  const r = getRedis();
  if (r) {
    r.set(`price:${symbol}`, data, { ex: PRICE_TTL }).catch(() => {});
    return;
  }
  ecWrite(`price__${symbol}`, data);
}

export async function kvGetDetail(key: string): Promise<DetailData | null> {
  const r = getRedis();
  if (r) {
    try { return await r.get<DetailData>(`detail:${key}`); } catch {}
  }
  return ecRead<DetailData>(`detail__${key.replace(/[^a-zA-Z0-9_-]/g, "_")}`);
}

export function kvSetDetail(key: string, data: DetailData): void {
  const r = getRedis();
  if (r) {
    r.set(`detail:${key}`, data, { ex: PRICE_TTL }).catch(() => {});
    return;
  }
  ecWrite(`detail__${key.replace(/[^a-zA-Z0-9_-]/g, "_")}`, data);
}
