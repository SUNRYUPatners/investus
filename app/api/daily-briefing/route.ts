import { NextRequest, NextResponse } from "next/server";
import { getDailyMorningBriefing, type DailyBriefMarket } from "@/lib/dailyMorningBriefing";
import { parseMarketId } from "@/lib/markets/types";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const DAILY_MARKETS = new Set<DailyBriefMarket>(["safe", "kr-re"]);

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("market");
  const market = parseMarketId(raw, "safe");
  if (!DAILY_MARKETS.has(market as DailyBriefMarket)) {
    return NextResponse.json({ error: "unsupported market" }, { status: 400 });
  }

  const force = req.nextUrl.searchParams.get("force") === "1";
  if (force) {
    const secret = process.env.CRON_SECRET?.trim();
    const auth = req.headers.get("authorization");
    if (!secret || auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  try {
    const briefing = await getDailyMorningBriefing(market as DailyBriefMarket, { force });
    return NextResponse.json({ briefing, market });
  } catch {
    return NextResponse.json({ briefing: null, market });
  }
}
