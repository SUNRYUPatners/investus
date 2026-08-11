import { NextRequest, NextResponse } from "next/server";

/**
 * Fail-closed cron auth. Vercel Cron sends Authorization: Bearer ${CRON_SECRET}.
 * If CRON_SECRET is unset, reject — never allow public internet to trigger crons.
 */
export function assertCronAuth(req: NextRequest): NextResponse | null {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 503 });
  }
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return null;
}
