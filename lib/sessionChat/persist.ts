import { Redis } from "@upstash/redis";
import type { PostgrestError } from "@supabase/supabase-js";
import { getAdminSupabase } from "@/lib/supabase";
import { makeAnonNick } from "@/lib/wallNick";
import type { SessionChatMessage } from "./types";

const TTL_SEC = 48 * 60 * 60;
const MAX_STORED = 200;

type DbRow = {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
  user_id: string;
};

type StoredRow = {
  id: string;
  market: "us" | "kr";
  user_id: string;
  nickname: string;
  content: string;
  at: number;
};

let _redis: Redis | null = null;

function getRedis(): Redis | null {
  if (_redis) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  _redis = new Redis({ url, token });
  return _redis;
}

function redisKey(market: "us" | "kr"): string {
  return `session-chat:${market}`;
}

function rateKey(market: "us" | "kr", email: string): string {
  return `session-chat:rate:${market}:${email.trim().toLowerCase()}`;
}

export function isSessionChatDbUnavailable(error: PostgrestError | null): boolean {
  if (!error) return false;
  const code = error.code ?? "";
  const msg = (error.message ?? "").toLowerCase();
  if (code === "42P01" || code === "PGRST205" || code === "PGRST204") return true;
  return msg.includes("session_chat_messages") && (
    msg.includes("does not exist") || msg.includes("could not find")
  );
}

function rowToMessage(row: DbRow, authEmail: string | null): SessionChatMessage {
  return {
    id: `u-${row.id}`,
    nick: row.nickname,
    content: row.content,
    at: new Date(row.created_at).getTime(),
    is_mine: !!authEmail && row.user_id === authEmail,
  };
}

function storedToMessage(row: StoredRow, authEmail: string | null): SessionChatMessage {
  return {
    id: row.id,
    nick: row.nickname,
    content: row.content,
    at: row.at,
    is_mine: !!authEmail && row.user_id === authEmail,
  };
}

async function loadFromRedis(
  market: "us" | "kr",
  authEmail: string | null,
  sinceMs: number,
  limit: number,
): Promise<SessionChatMessage[]> {
  const redis = getRedis();
  if (!redis) return [];

  try {
    const raw = await redis.lrange(redisKey(market), 0, MAX_STORED - 1);
    const since = Math.max(sinceMs, Date.now() - 24 * 60 * 60_000);
    const rows = (raw as string[])
      .map((s) => {
        try { return JSON.parse(s) as StoredRow; } catch { return null; }
      })
      .filter((r): r is StoredRow => !!r && r.at >= since)
      .sort((a, b) => a.at - b.at)
      .slice(-limit);
    return rows.map((r) => storedToMessage(r, authEmail));
  } catch {
    return [];
  }
}

async function saveToRedis(
  market: "us" | "kr",
  email: string,
  nickname: string,
  content: string,
): Promise<SessionChatMessage | null> {
  const redis = getRedis();
  if (!redis) return null;

  const at = Date.now();
  const row: StoredRow = {
    id: `u-r-${market}-${at}-${Math.random().toString(36).slice(2, 8)}`,
    market,
    user_id: email,
    nickname,
    content,
    at,
  };

  try {
    const key = redisKey(market);
    await redis.lpush(key, JSON.stringify(row));
    await redis.ltrim(key, 0, MAX_STORED - 1);
    await redis.expire(key, TTL_SEC);
    await redis.set(rateKey(market, email), at, { ex: 5 });
    return storedToMessage(row, email);
  } catch {
    return null;
  }
}

async function hasRecentRedisPost(market: "us" | "kr", email: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  try {
    const last = await redis.get<number>(rateKey(market, email));
    return typeof last === "number" && Date.now() - last < 5_000;
  } catch {
    return false;
  }
}

export async function loadSessionUserMessages(
  market: "us" | "kr",
  authEmail: string | null,
  sinceMs: number,
  limit = 80,
): Promise<SessionChatMessage[]> {
  const sinceIso = new Date(Math.max(sinceMs, Date.now() - 24 * 60 * 60_000)).toISOString();
  const db = getAdminSupabase();
  const { data, error } = await db
    .from("session_chat_messages")
    .select("id, nickname, content, created_at, user_id")
    .eq("market", market)
    .gte("created_at", sinceIso)
    .order("created_at", { ascending: true })
    .limit(limit);

  const fromRedis = await loadFromRedis(market, authEmail, sinceMs, limit);

  if (error) {
    if (isSessionChatDbUnavailable(error)) return fromRedis;
    return fromRedis;
  }

  const fromDb = (data as DbRow[] ?? []).map((row) => rowToMessage(row, authEmail));
  const merged = new Map<string, SessionChatMessage>();
  for (const m of [...fromDb, ...fromRedis]) merged.set(m.id, m);
  return [...merged.values()].sort((a, b) => a.at - b.at).slice(-limit);
}

export async function countSessionParticipants(market: "us" | "kr"): Promise<number> {
  const since = new Date(Date.now() - 10 * 60_000).toISOString();
  const users = new Set<string>();

  const db = getAdminSupabase();
  const { data, error } = await db
    .from("session_chat_messages")
    .select("user_id")
    .eq("market", market)
    .gte("created_at", since);

  if (!error && data) {
    for (const row of data as { user_id: string }[]) users.add(row.user_id);
  }

  const redis = getRedis();
  if (redis) {
    try {
      const raw = await redis.lrange(redisKey(market), 0, 99);
      const cutoff = Date.now() - 10 * 60_000;
      for (const s of raw as string[]) {
        try {
          const row = JSON.parse(s) as StoredRow;
          if (row.at >= cutoff) users.add(row.user_id);
        } catch { /* skip */ }
      }
    } catch { /* skip */ }
  }

  return users.size;
}

export async function saveSessionUserMessage(
  market: "us" | "kr",
  email: string,
  content: string,
): Promise<{ message?: SessionChatMessage; error?: string; status?: number }> {
  const nickname = makeAnonNick(email);
  const db = getAdminSupabase();

  const fiveSecAgo = new Date(Date.now() - 5_000).toISOString();
  const { data: recent, error: recentErr } = await db
    .from("session_chat_messages")
    .select("id")
    .eq("market", market)
    .eq("user_id", email)
    .gte("created_at", fiveSecAgo)
    .limit(1);

  if (!recentErr && recent && recent.length > 0) {
    return { error: "잠시 후 다시 보내주세요.", status: 429 };
  }
  if (recentErr && isSessionChatDbUnavailable(recentErr)) {
    if (await hasRecentRedisPost(market, email)) {
      return { error: "잠시 후 다시 보내주세요.", status: 429 };
    }
  }

  const { data, error } = await db
    .from("session_chat_messages")
    .insert({
      market,
      user_id: email,
      nickname,
      content,
    })
    .select("id, nickname, content, created_at")
    .single();

  if (!error && data) {
    const row = data as { id: number; nickname: string; content: string; created_at: string };
    return {
      message: {
        id: `u-${row.id}`,
        nick: row.nickname,
        content: row.content,
        at: new Date(row.created_at).getTime(),
        is_mine: true,
      },
    };
  }

  if (error && !isSessionChatDbUnavailable(error)) {
    console.error("[session-chat] insert failed:", error.code, error.message);
  }

  const fallback = await saveToRedis(market, email, nickname, content);
  if (fallback) return { message: fallback };

  if (error && isSessionChatDbUnavailable(error)) {
    return {
      error: "채팅 저장소 연결 중입니다. Supabase SQL Editor에서 session_chat_messages 마이그레이션을 실행해주세요.",
      status: 503,
    };
  }

  return { error: "전송 실패 — 잠시 후 다시 시도해주세요.", status: 500 };
}
