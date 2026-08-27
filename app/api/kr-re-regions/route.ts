import { NextResponse } from "next/server";
import { fetchKrReSaleRegions } from "@/lib/markets/krReRegions";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchKrReSaleRegions();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
    });
  } catch (e) {
    console.error("[kr-re-regions]", e);
    return NextResponse.json(
      { regions: [], periodLabel: "", source: "", limited: true, error: "fetch_failed" },
      { status: 503 },
    );
  }
}
