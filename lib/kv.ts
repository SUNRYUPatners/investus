/**
 * Persistent key-value cache for price/detail data across cold starts.
 *
 * Backend priority:
 *   1. Upstash Redis (if UPSTASH_REDIS_REST_URL + TOKEN set)
 *   2. Supabase Storage bucket `guru-cache` (prod-ready — no write-token issues)
 *   3. Vercel Edge Config (read often works; write token frequently broken)
 *   4. No-op (local dev — silently skipped)
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
import { getAdminSupabase } from "@/lib/supabase";

// ── Upstash Redis (primary when configured) ───────────────────────────────

let _redis: Redis | null = null;

function getRedis(): Redis | null {
  if (_redis) return _redis;
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  _redis = new Redis({ url, token });
  return _redis;
}

// ── Supabase Storage (prod fallback — same bucket as 13F holdings) ────────

const STORAGE_BUCKET = "guru-cache";

function storageObject(kind: "price" | "detail", key: string): string {
  const safe = key.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `${kind}/${safe}.json`;
}

async function storageRead<T>(kind: "price" | "detail", key: string): Promise<T | null> {
  try {
    const sb = getAdminSupabase();
    const { data, error } = await sb.storage.from(STORAGE_BUCKET).download(storageObject(kind, key));
    if (error || !data) return null;
    const text = await data.text();
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

async function storageWrite(kind: "price" | "detail", key: string, value: unknown): Promise<boolean> {
  try {
    const sb = getAdminSupabase();
    const bytes = Buffer.from(JSON.stringify(value), "utf8");
    const { error } = await sb.storage
      .from(STORAGE_BUCKET)
      .upload(storageObject(kind, key), bytes, {
        contentType: "application/json",
        upsert: true,
      });
    return !error;
  } catch {
    return false;
  }
}

// ── Vercel Edge Config (last resort) ──────────────────────────────────────

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

async function ecWrite(key: string, value: unknown): Promise<boolean> {
  const token  = process.env.VERCEL_API_TOKEN;
  const ecId   = process.env.EDGE_CONFIG_ID;
  const teamId = process.env.VERCEL_TEAM_ID;
  if (!token || !ecId) return false;
  const url = `https://api.vercel.com/v1/edge-config/${ecId}/items${teamId ? `?teamId=${teamId}` : ""}`;
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ operation: "upsert", key, value }] }),
    });
    return res.ok;
  } catch {
    return false;
  }
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
  // Per-symbol prices are Redis/EC only — bulk home data lives in detail:market-data:v3
  return ecRead<PriceData>(`price__${symbol}`);
}

export async function kvSetPrice(symbol: string, data: PriceData): Promise<void> {
  const r = getRedis();
  if (r) {
    try {
      await r.set(`price:${symbol}`, data, { ex: PRICE_TTL });
      return;
    } catch { /* fall through */ }
  }
  // Skip Supabase Storage for per-symbol writes (100+ keys / request). Edge Config best-effort.
  await ecWrite(`price__${symbol}`, data);
}

export async function kvGetDetail(key: string): Promise<DetailData | null> {
  const r = getRedis();
  if (r) {
    try { return await r.get<DetailData>(`detail:${key}`); } catch {}
  }
  const fromStorage = await storageRead<DetailData>("detail", key);
  if (fromStorage) return fromStorage;
  return ecRead<DetailData>(`detail__${key.replace(/[^a-zA-Z0-9_-]/g, "_")}`);
}

export function kvSetDetail(key: string, data: DetailData): Promise<void> {
  return kvSetDetailEx(key, data, PRICE_TTL).then(() => {});
}

/** Custom TTL (seconds). Use for quarterly data that must outlive the 7-day price TTL. */
export async function kvSetDetailEx(key: string, data: DetailData, ttlSeconds: number): Promise<boolean> {
  const r = getRedis();
  if (r) {
    try {
      await r.set(`detail:${key}`, data, { ex: ttlSeconds });
      return true;
    } catch {
      /* try storage */
    }
  }
  if (await storageWrite("detail", key, data)) return true;
  return ecWrite(`detail__${key.replace(/[^a-zA-Z0-9_-]/g, "_")}`, data);
}
