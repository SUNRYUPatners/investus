import { NextRequest, NextResponse } from "next/server";
import { fetchBatchQuotes } from "@/lib/yahooFinance";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const raw     = req.nextUrl.searchParams.get("symbols") ?? "";
  const symbols = raw.split(",").map((s) => s.trim().toUpperCase()).filter(Boolean);

  // Always include USDKRW=X so the client can do currency conversion
  const all    = [...new Set([...symbols, "USDKRW=X"])];
  const quotes = await fetchBatchQuotes(all);

  // Finnhub fallback for any stock symbols Yahoo Finance missed
  const stockSymbols = all.filter(s => s !== "USDKRW=X");
  const found        = new Set(quotes.map(q => q.symbol));
  const missing      = stockSymbols.filter(s => !found.has(s));

  if (missing.length > 0) {
    try {
      const { fetchFinnhubBatch } = await import("@/lib/finnhub");
      const fhMap = await fetchFinnhubBatch(missing);
      fhMap.forEach((fhQ, sym) => {
        quotes.push({
          symbol:        sym,
          shortName:     sym,
          price:         fhQ.price,
          change:        fhQ.change,
          changePercent: fhQ.changePercent,
          volume:        0,
          marketCap:     null,
          open:          null,
          high:          null,
          low:           null,
        });
      });
    } catch { /* Finnhub also failed — omit these symbols */ }
  }

  const usdkrwQ    = quotes.find(q => q.symbol === "USDKRW=X");
  const stockQuotes = quotes.filter(q => q.symbol !== "USDKRW=X");

  // USDKRW fallback via open exchange rates when Yahoo Finance is blocked
  let usdkrw = usdkrwQ?.price ?? 0;
  if (!usdkrw) {
    try {
      const resp = await fetch("https://open.er-api.com/v6/latest/USD", {
        next: { revalidate: 3600 },
      });
      const json = await resp.json() as { rates?: { KRW?: number } };
      usdkrw = json?.rates?.KRW ?? 1350;
    } catch {
      usdkrw = 1350;
    }
  }

  return NextResponse.json({ quotes: stockQuotes, usdkrw });
}
