import { NextResponse } from "next/server";
import { fetchStooqFuture } from "@/lib/stooq";

const COMMODITY_STOOQ: Record<string, string> = {
  CL: "CL.F", NG: "NG.F", GC: "GC.F", SI: "SI.F", HG: "HG.F",
  ZN: "ZN.F", ZB: "ZB.F", ZC: "ZC.F", ZW: "ZW.F", ZS: "ZS.F",
};

export async function GET() {
  const results: Record<string, unknown> = {};
  for (const [sym, stooqSym] of Object.entries(COMMODITY_STOOQ)) {
    const r = await fetchStooqFuture(stooqSym);
    results[sym] = r ?? "null";
  }
  return NextResponse.json(results);
}
