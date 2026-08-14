import { NextRequest, NextResponse } from "next/server";
import { buildSessionBriefing, getBriefPhase } from "@/lib/morningBriefing";
import { getOrCreatePostMarketBriefing } from "@/lib/postMarketBriefing";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const force = req.nextUrl.searchParams.get("force") === "1";
  if (force) {
    const secret = process.env.CRON_SECRET?.trim();
    const auth = req.headers.get("authorization");
    if (!secret || auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const phase = getBriefPhase();

  if (phase === "pre") {
    const briefing = buildSessionBriefing();
    if (!briefing) return NextResponse.json({ briefing: null, phase });
    return NextResponse.json({ briefing: { ...briefing, phase: "pre" }, phase });
  }

  try {
    const briefing = await getOrCreatePostMarketBriefing({ force });
    return NextResponse.json({ briefing, phase: "post" });
  } catch {
    return NextResponse.json({ briefing: null, phase: "post" }, { status: 502 });
  }
}
