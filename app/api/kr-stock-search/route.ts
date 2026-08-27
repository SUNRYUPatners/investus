import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type YFQuote = {
  symbol: string;
  shortname?: string;
  longname?: string;
  quoteType?: string;
  exchDisp?: string;
  exchange?: string;
};

/** 코스피·코스닥 종목 검색 — Yahoo Finance (region=KR) */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (!q || q.length < 1) return NextResponse.json([]);

  try {
    const url =
      `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(q)}` +
      "&quotesCount=25&newsCount=0&enableFuzzyQuery=true&region=KR&lang=ko-KR";
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return NextResponse.json([]);

    const data = (await res.json()) as { quotes?: YFQuote[] };
    const seen = new Set<string>();
    const quotes = (data.quotes ?? [])
      .filter((row) => {
        if (row.quoteType !== "EQUITY") return false;
        if (!/\.(KS|KQ)$/i.test(row.symbol)) return false;
        if (seen.has(row.symbol)) return false;
        seen.add(row.symbol);
        return true;
      })
      .slice(0, 20)
      .map((row) => ({
        symbol: row.symbol,
        name: row.longname ?? row.shortname ?? row.symbol.replace(/\.(KS|KQ)$/i, ""),
        exchange: row.exchDisp ?? (row.symbol.endsWith(".KQ") ? "KOSDAQ" : "KOSPI"),
      }));

    return NextResponse.json(quotes, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
    });
  } catch {
    return NextResponse.json([]);
  }
}
