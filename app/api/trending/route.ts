import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FALLBACK = ["TSLA", "SPCX", "BTC", "ETH", "NVDA", "DOGE", "SOL", "PLTR", "AAPL", "MSFT", "AMZN", "META", "AMD", "GOOGL", "RKLB"];

export async function GET() {
  try {
    const res = await fetch(
      "https://query1.finance.yahoo.com/v1/finance/trending/US?count=20&lang=en-US",
      {
        headers: { "User-Agent": "Mozilla/5.0 (compatible)" },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) throw new Error("fetch failed");
    const data = await res.json();
    const raw: { symbol: string }[] = data?.finance?.result?.[0]?.quotes ?? [];
    const symbols = raw
      .map((q) => q.symbol)
      .filter((s) => s && !s.includes("=") && !s.startsWith("^") && s.length <= 5)
      .slice(0, 15);
    if (symbols.length < 5) throw new Error("too few symbols");
    return NextResponse.json(
      { symbols, updatedAt: Date.now() },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" } },
    );
  } catch {
    return NextResponse.json(
      { symbols: FALLBACK, updatedAt: Date.now(), fallback: true },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
    );
  }
}
