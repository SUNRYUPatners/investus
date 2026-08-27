import { NextRequest, NextResponse } from "next/server";
import { getKrSessionBriefing } from "@/lib/krBriefing";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function GET(req: NextRequest) {
  const force = req.nextUrl.searchParams.get("force") === "1";
  if (force) {
    const secret = process.env.CRON_SECRET?.trim();
    const auth = req.headers.get("authorization");
    if (!secret || auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  try {
    const { briefing, phase } = await getKrSessionBriefing({ force });
    return NextResponse.json({ briefing, phase });
  } catch {
    return NextResponse.json({ briefing: null, phase: "pre" });
  }
}
