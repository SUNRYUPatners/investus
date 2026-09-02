import { NextRequest, NextResponse } from "next/server";
import { buildSessionBriefing, getBriefPhase, type SessionBriefing } from "@/lib/morningBriefing";
import { getOrCreatePostMarketBriefing, getOrCreatePreMarketBriefing } from "@/lib/postMarketBriefing";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

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
    try {
      const briefing = await getOrCreatePreMarketBriefing({ force });
      if (briefing) return NextResponse.json({ briefing: asPhase(briefing, "pre"), phase: "pre" });
    } catch { /* CIO 리포트로 폴백 */ }

    const reports = buildSessionBriefing();
    if (!reports) return NextResponse.json({ briefing: null, phase });
    return NextResponse.json({ briefing: asPhase(reports, "pre"), phase: "pre" });
  }

  try {
    const briefing = await getOrCreatePostMarketBriefing({ force });
    if (briefing) return NextResponse.json({ briefing: asPhase(briefing, "post"), phase: "post" });
  } catch { /* 장중 뉴스 없으면 null — CIO 일일 리포트로 대체하지 않음 */ }

  return NextResponse.json({ briefing: null, phase: "post" });
}
