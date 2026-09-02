import { NextRequest, NextResponse } from "next/server";
import { parseMarketId } from "@/lib/markets/types";
import { isSessionChatOpen, sessionChatSupported } from "@/lib/markets/sessionChatOpen";
import { generateSessionMessages, fakeOnlineCount, type ChatQuote } from "@/lib/sessionChat/generate";
import { isSessionChatBanned } from "@/lib/sessionChat/banned";
import type { SessionChatMessage } from "@/lib/sessionChat/types";
import type { IndexQuote, Quote } from "@/lib/api";
import { kvGetDetail } from "@/lib/kv";
import { getAdminSupabase, getUserFromRequest } from "@/lib/supabase";
import { makeAnonNick } from "@/lib/wallNick";

export const dynamic = "force-dynamic";
export const maxDuration = 15;

async function loadMarketSnap(market: "us" | "kr"): Promise<{ quotes: Quote[]; indices: IndexQuote[] }> {
  if (market === "kr") {
    try {
      const { fetchAltMarketData } = await import("@/lib/markets/fetchAltMarket");
      const data = await fetchAltMarketData("kr");
      return { quotes: data.quotes ?? [], indices: data.indices ?? [] };
    } catch {
      const cached = await kvGetDetail("market-data:kr:v2");
      if (cached) {
        const c = cached as { quotes?: Quote[]; indices?: IndexQuote[] };
        return { quotes: c.quotes ?? [], indices: c.indices ?? [] };
      }
    }
  } else {
    const cached = await kvGetDetail("market-data:v3");
    if (cached) {
      const c = cached as { quotes?: Quote[]; indices?: IndexQuote[] };
      if ((c.quotes?.length ?? 0) > 0) return { quotes: c.quotes ?? [], indices: c.indices ?? [] };
    }
  }
  const { mockQuotes, mockIndices } = await import("@/lib/api");
  return { quotes: mockQuotes, indices: mockIndices };
}

function toChatQuotes(quotes: Quote[]): ChatQuote[] {
  return quotes.map((q) => ({
    symbol: q.symbol,
    name: q.name,
    price: q.price,
    changePercent: q.changePercent,
  }));
}

function toIndexQuotes(indices: IndexQuote[]): ChatQuote[] {
  return indices.map((q) => ({
    symbol: q.symbol,
    name: q.name,
    price: q.value,
    changePercent: q.changePercent,
  }));
}

type DbRow = {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
  user_id: string;
};

async function loadUserMessages(
  market: "us" | "kr",
  authEmail: string | null,
  sinceMs: number,
  limit = 80,
): Promise<SessionChatMessage[]> {
  const db = getAdminSupabase();
  const sinceIso = new Date(Math.max(sinceMs, Date.now() - 24 * 60 * 60_000)).toISOString();
  const { data, error } = await db
    .from("session_chat_messages")
    .select("id, nickname, content, created_at, user_id")
    .eq("market", market)
    .gte("created_at", sinceIso)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) {
    if (error.code === "42P01") return [];
    return [];
  }

  return (data as DbRow[] ?? []).map((row) => ({
    id: `u-${row.id}`,
    nick: row.nickname,
    content: row.content,
    at: new Date(row.created_at).getTime(),
    is_mine: !!authEmail && row.user_id === authEmail,
  }));
}

async function countRecentParticipants(market: "us" | "kr"): Promise<number> {
  const db = getAdminSupabase();
  const since = new Date(Date.now() - 10 * 60_000).toISOString();
  const { data, error } = await db
    .from("session_chat_messages")
    .select("user_id")
    .eq("market", market)
    .gte("created_at", since);

  if (error || !data) return 0;
  return new Set(data.map((r: { user_id: string }) => r.user_id)).size;
}

function mergeMessages(lists: SessionChatMessage[][]): SessionChatMessage[] {
  const map = new Map<string, SessionChatMessage>();
  for (const list of lists) {
    for (const m of list) map.set(m.id, m);
  }
  return [...map.values()].sort((a, b) => a.at - b.at);
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const market = parseMarketId(url.searchParams.get("market") ?? "us", "us");
  const authUser = await getUserFromRequest(req);

  if (!sessionChatSupported(market)) {
    return NextResponse.json({ open: false, supported: false, messages: [] });
  }

  const open = isSessionChatOpen(market);
  const m = market as "us" | "kr";

  const sinceParam = url.searchParams.get("since");
  const defaultSince = open ? Date.now() - 8 * 60_000 : Date.now() - 24 * 60 * 60_000;
  const sinceMs = sinceParam ? Number(sinceParam) : defaultSince;
  const safeSince = Number.isFinite(sinceMs) ? sinceMs : defaultSince;

  const snap = await loadMarketSnap(m);
  const userMsgs = await loadUserMessages(
    m,
    authUser?.email ?? null,
    safeSince,
    open ? 80 : 120,
  );

  const botMsgs = generateSessionMessages(
    m,
    toChatQuotes(snap.quotes),
    toIndexQuotes(snap.indices),
    {
      sinceMs: open ? safeSince : Math.max(safeSince, Date.now() - 24 * 60 * 60_000),
      maxBackfill: open ? 20 : 50,
    },
  );

  const messages = mergeMessages([userMsgs, botMsgs]).slice(-80);
  const recentUsers = open ? await countRecentParticipants(m) : 0;
  const online = open ? fakeOnlineCount(m) + recentUsers : 0;

  return NextResponse.json({
    open,
    supported: true,
    messages,
    online,
    pollMs: open ? 8_000 : 60_000,
    liveAt: Date.now(),
  }, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  let body: { market?: string; content?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const market = parseMarketId(body.market ?? "us", "us");
  if (!sessionChatSupported(market)) {
    return NextResponse.json({ error: "지원하지 않는 시장입니다." }, { status: 400 });
  }

  if (!isSessionChatOpen(market)) {
    return NextResponse.json({ error: "장중에만 메시지를 보낼 수 있습니다." }, { status: 403 });
  }

  const trimmed = body.content?.trim() ?? "";
  if (trimmed.length < 2) return NextResponse.json({ error: "2자 이상 작성해주세요." }, { status: 400 });
  if (trimmed.length > 200) return NextResponse.json({ error: "200자 이내로 작성해주세요." }, { status: 400 });
  if (isSessionChatBanned(trimmed)) {
    return NextResponse.json({ error: "게시할 수 없는 내용이 포함되어 있습니다." }, { status: 400 });
  }

  const m = market as "us" | "kr";
  const db = getAdminSupabase();

  // 5초 이내 연속 전송 방지
  const fiveSecAgo = new Date(Date.now() - 5_000).toISOString();
  const { data: recent } = await db
    .from("session_chat_messages")
    .select("id")
    .eq("market", m)
    .eq("user_id", authUser.email)
    .gte("created_at", fiveSecAgo)
    .limit(1);

  if (recent && recent.length > 0) {
    return NextResponse.json({ error: "잠시 후 다시 보내주세요." }, { status: 429 });
  }

  const { data, error } = await db
    .from("session_chat_messages")
    .insert({
      market: m,
      user_id: authUser.email,
      nickname: makeAnonNick(authUser.email),
      content: trimmed,
    })
    .select("id, nickname, content, created_at")
    .single();

  if (error) {
    if (error.code === "42P01") {
      return NextResponse.json({
        error: "DB 설정 필요 — Supabase에서 session_chat_messages 테이블을 생성해주세요.",
      }, { status: 503 });
    }
    return NextResponse.json({ error: "전송 실패" }, { status: 500 });
  }

  const row = data as { id: number; nickname: string; content: string; created_at: string };
  const message: SessionChatMessage = {
    id: `u-${row.id}`,
    nick: row.nickname,
    content: row.content,
    at: new Date(row.created_at).getTime(),
    is_mine: true,
  };

  return NextResponse.json({ message }, { status: 201 });
}
