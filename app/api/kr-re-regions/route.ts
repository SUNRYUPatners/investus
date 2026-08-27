import { NextResponse } from "next/server";
import { fetchKrReSaleRegions, fetchKrReTxnVolumes } from "@/lib/markets/krReRegions";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [sale, txn] = await Promise.all([
      fetchKrReSaleRegions(),
      fetchKrReTxnVolumes(),
    ]);
    return NextResponse.json(
      {
        regions: sale.regions,
        periodLabel: sale.periodLabel,
        source: sale.source,
        limited: sale.limited || txn.limited,
        transactions: {
          regions: txn.regions,
          national: txn.national,
          periodLabel: txn.periodLabel,
          source: txn.source,
        },
      },
      {
        headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
      },
    );
  } catch (e) {
    console.error("[kr-re-regions]", e);
    return NextResponse.json(
      {
        regions: [],
        periodLabel: "",
        source: "",
        limited: true,
        transactions: { regions: [], national: null, periodLabel: "", source: "" },
        error: "fetch_failed",
      },
      { status: 503 },
    );
  }
}
