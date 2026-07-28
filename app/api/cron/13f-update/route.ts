/**
 * Daily — SEC EDGAR에서 최신 13F-HR 확인 후 KV에 저장.
 * 신규 accession이 있을 때만 holdings를 교체 (공시일 자동 반영).
 */
import { NextRequest, NextResponse } from "next/server";
import { updateAll13FHoldings } from "@/lib/edgar13f";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const authSecret = process.env.CRON_SECRET;
  if (authSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${authSecret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const force = new URL(req.url).searchParams.has("force");

  try {
    const result = await updateAll13FHoldings(force);
    return NextResponse.json(result, { status: result.ok ? 200 : 207 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
