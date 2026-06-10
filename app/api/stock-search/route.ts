import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface YFSearchResult {
  symbol: string;
  shortname?: string;
  longname?: string;
  typeDisp?: string;
  exchDisp?: string;
  quoteType?: string;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (!q || q.length < 1) return NextResponse.json([]);

  try {
    const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(q)}&quotesCount=20&newsCount=0&enableFuzzyQuery=true&quotesQueryId=tss_match_phrase_query`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Accept": "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) return NextResponse.json([]);

    const data = await res.json() as { quotes?: YFSearchResult[] };
    // 점(.) 포함 심볼 = 해외 거래소 (005930.KS 등) → 제외
    // exchDisp 화이트리스트 제거: "NYSE Arca" 같은 변형값도 통과하도록
    const NON_US = /\.(KS|T|HK|L|PA|AS|DE|MI|SS|SZ|BO|NS|AX|TO|V|BR|MX|SW|VI|BE|DU|F|HM|ST)$/i;
    const quotes = (data?.quotes ?? [])
      .filter((q) =>
        (q.quoteType === "EQUITY" || q.quoteType === "ETF" || q.quoteType === "MUTUALFUND") &&
        !NON_US.test(q.symbol) &&
        !q.symbol.includes("^")   // 지수 심볼 제외
      )
      .slice(0, 15)
      .map((q) => ({
        symbol: q.symbol,
        name: q.longname ?? q.shortname ?? q.symbol,
        exchange: q.exchDisp ?? "",
        type: q.quoteType ?? "EQUITY",
      }));

    return NextResponse.json(quotes, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
    });
  } catch {
    return NextResponse.json([]);
  }
}
