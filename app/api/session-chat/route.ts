import { NextRequest, NextResponse } from "next/server";
import { parseMarketId } from "@/lib/markets/types";
import { isSessionChatOpen, sessionChatSupported } from "@/lib/markets/sessionChatOpen";
import { generateSessionMessages, fakeOnlineCount, type ChatQuote } from "@/lib/sessionChat/generate";
import { filterQuotesForMarket } from "@/lib/sessionChat/filterQuotes";
import { isSessionChatBanned } from "@/lib/sessionChat/banned";
import { guestUserId, readGuestIdFromRequest } from "@/lib/sessionChat/guestId";
import { guestNick, sanitizeSessionNick } from "@/lib/sessionChat/nickname";
import {
  countSessionParticipants,
  loadSessionUserMessages,
  saveSessionUserMessage,
} from "@/lib/sessionChat/persist";
import { generateRepliesToUserMessages } from "@/lib/sessionChat/replies";
import type { SessionChatMessage } from "@/lib/sessionChat/types";
import type { IndexQuote, Quote } from "@/lib/api";
import { kvGetDetail } from "@/lib/kv";
import { getUserFromRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const maxDuration = 15;

async function loadMarketSnap(market: "us" | "kr"): Promise<{ quotes: Quote[]; indices: IndexQuote[] }> {
  if (market === "kr") {
    try {
      const { fetchAltMarketData } = await import("@/lib/markets/fetchAltMarket");
      const data = await fetchAltMarketData("kr");
      return { quotes: data.quotes ?? [], indices: data.indices ?? [] };
    } catch {
      const cached = await kvGetDetail("market-data:kr:v3");
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

function mergeMessages(lists: SessionChatMessage[][]): SessionChatMessage[] {
  const map = new Map<string, SessionChatMessage>();
  for (const list of lists) {
    for (const m of list) map.set(m.id, m);
  }
  return [...map.values()].sort((a, b) => a.at - b.at);
}

function resolveActorKey(req: NextRequest, authEmail: string | null): string | null {
  if (authEmail) return authEmail;
  const guestId = readGuestIdFromRequest(req);
  return guestId ? guestUserId(guestId) : null;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const market = parseMarketId(url.searchParams.get("market") ?? "us", "us");
  const authUser = await getUserFromRequest(req);
  const actorKey = resolveActorKey(req, authUser?.email ?? null);

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
  const chatQuotes = filterQuotesForMarket(m, toChatQuotes(snap.quotes));
  const chatIndices = filterQuotesForMarket(m, toIndexQuotes(snap.indices));

  const userMsgs = await loadSessionUserMessages(m, actorKey, safeSince, open ? 80 : 120);

  const botMsgs = generateSessionMessages(m, chatQuotes, chatIndices, {
    sinceMs: open ? safeSince : Math.max(safeSince, Date.now() - 24 * 60 * 60_000),
    maxBackfill: open ? 20 : 50,
  });

  // 장중: 아직 안 뜬 호응도 내려서 클라이언트가 딜레이 후 표시.
  // 마감: 이미 지난 호응만 — 대화 이력에 사람 말에 대한 답이 남게.
  const replyMsgs = generateRepliesToUserMessages(
    userMsgs,
    m,
    chatQuotes,
    chatIndices,
    safeSince,
    { onlyPast: !open },
  );

  const messages = mergeMessages([userMsgs, botMsgs, replyMsgs]).slice(-80);
  const recentUsers = open ? await countSessionParticipants(m) : 0;
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
  const guestId = readGuestIdFromRequest(req);

  if (!authUser && !guestId) {
    return NextResponse.json({ error: "게스트 ID가 필요합니다. 페이지를 새로고침해주세요." }, { status: 400 });
  }

  let body: { market?: string; content?: string; guestId?: string };
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

  const author = authUser
    ? {
        userId: authUser.email,
        nickname: sanitizeSessionNick(authUser.nickname),
        actorKey: authUser.email,
      }
    : {
        userId: guestUserId(guestId!),
        nickname: guestNick(guestId!),
        actorKey: guestUserId(guestId!),
      };

  const result = await saveSessionUserMessage(m, author, trimmed);
  if (result.error || !result.message) {
    return NextResponse.json({ error: result.error ?? "전송 실패" }, { status: result.status ?? 500 });
  }

  const snap = await loadMarketSnap(m);
  const chatQuotes = filterQuotesForMarket(m, toChatQuotes(snap.quotes));
  const chatIndices = filterQuotesForMarket(m, toIndexQuotes(snap.indices));
  const botReplies = generateRepliesToUserMessages(
    [result.message],
    m,
    chatQuotes,
    chatIndices,
    result.message.at - 1,
    { onlyPast: false },
  );

  return NextResponse.json({ message: result.message, botReplies }, { status: 201 });
}
