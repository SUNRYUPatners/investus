import { NextRequest, NextResponse } from "next/server";
import { buildSessionBriefing, getBriefPhase, type SessionBriefing } from "@/lib/morningBriefing";
import { getOrCreatePostMarketBriefing } from "@/lib/postMarketBriefing";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function asPhase(briefing: SessionBriefing, phase: "pre" | "post"): SessionBriefing {
  return {
    ...briefing,
    phase,
    labelKo: phase === "pre" ? "장전 브리핑" : "장후 브리핑",
    labelEn: phase === "pre" ? "Pre-market brief" : "After-close brief",
  };
}

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
    return NextResponse.json({ briefing: asPhase(briefing, "pre"), phase });
  }

  try {
    const briefing = await getOrCreatePostMarketBriefing({ force });
    if (briefing) return NextResponse.json({ briefing: asPhase(briefing, "post"), phase: "post" });
  } catch { /* CIO 리포트로 폴백 */ }

  const reports = buildSessionBriefing();
  if (reports) {
    return NextResponse.json({
      briefing: asPhase({ ...reports, source: "reports" }, "post"),
      phase: "post",
    });
  }
  return NextResponse.json({ briefing: null, phase: "post" });
}
