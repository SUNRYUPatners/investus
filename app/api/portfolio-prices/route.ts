import { NextRequest, NextResponse } from "next/server";
import { getPrices, ccHeader } from "@/lib/priceCache";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const raw     = req.nextUrl.searchParams.get("symbols") ?? "";
  const symbols = raw.split(",").map((s) => s.trim().toUpperCase()).filter(Boolean);

  // Always include USDKRW=X for currency conversion
  const all    = [...new Set([...symbols, "USDKRW=X"])];
  const prices = await getPrices(all);

  // Extract USDKRW with open.er-api.com fallback when YF fails
  let usdkrw = prices["USDKRW=X"]?.price ?? 0;
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

  const stockQuotes = symbols
    .filter((s) => s !== "USDKRW=X" && prices[s])
    .map((s) => ({
      symbol:        s,
      shortName:     s,
      price:         prices[s].price,
      change:        prices[s].change,
      changePercent: prices[s].changePercent,
      volume:        0,
      marketCap:     null,
      open:          null,
      high:          null,
      low:           null,
    }));

  return NextResponse.json(
    { quotes: stockQuotes, usdkrw },
    { headers: { "Cache-Control": ccHeader() } },
  );
}
