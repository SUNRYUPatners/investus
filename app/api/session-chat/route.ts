import { NextResponse } from "next/server";
import { parseMarketId } from "@/lib/markets/types";
import { isSessionChatOpen, sessionChatSupported } from "@/lib/markets/sessionChatOpen";
import { generateSessionMessages, fakeOnlineCount, type ChatQuote } from "@/lib/sessionChat/generate";
import type { IndexQuote, Quote } from "@/lib/api";
import { kvGetDetail } from "@/lib/kv";

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

export async function GET(req: Request) {
  const url = new URL(req.url);
  const market = parseMarketId(url.searchParams.get("market") ?? "us", "us");

  if (!sessionChatSupported(market)) {
    return NextResponse.json({ open: false, supported: false, messages: [] });
  }

  const open = isSessionChatOpen(market);
  if (!open) {
    return NextResponse.json({
      open: false,
      supported: true,
      messages: [],
      online: 0,
      pollMs: 30_000,
    });
  }

  const sinceParam = url.searchParams.get("since");
  const sinceMs = sinceParam ? Number(sinceParam) : Date.now() - 8 * 60_000;

  const snap = await loadMarketSnap(market as "us" | "kr");
  const messages = generateSessionMessages(
    market as "us" | "kr",
    toChatQuotes(snap.quotes),
    toIndexQuotes(snap.indices),
    { sinceMs: Number.isFinite(sinceMs) ? sinceMs : Date.now() - 8 * 60_000 },
  );

  return NextResponse.json({
    open: true,
    supported: true,
    messages,
    online: fakeOnlineCount(market),
    pollMs: 12_000,
    liveAt: Date.now(),
  }, {
    headers: { "Cache-Control": "no-store" },
  });
}
