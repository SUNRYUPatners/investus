import { NextRequest, NextResponse } from "next/server";
import { getPrices, ccHeader } from "@/lib/priceCache";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("symbols") ?? "";
  const symbols = raw
    .split(",")
    .map((s) => s.trim().toUpperCase().slice(0, 12))
    .filter(Boolean)
    .slice(0, 20);

  if (symbols.length === 0) return NextResponse.json({});

  const result = await getPrices(symbols);
  return NextResponse.json(result, { headers: { "Cache-Control": ccHeader() } });
}
