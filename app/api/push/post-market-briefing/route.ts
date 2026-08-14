import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";
import { getBriefPhase } from "@/lib/morningBriefing";
import { getOrCreatePostMarketBriefing } from "@/lib/postMarketBriefing";
import { isNYSEHoliday } from "@/lib/marketHours";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

webpush.setVapidDetails(
  process.env.VAPID_MAILTO!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

function isAuthorized(req: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET?.trim();
  const notifySecret = process.env.NOTIFY_SECRET?.trim();
  if (!cronSecret && !notifySecret) return false;
  const authHeader = req.headers.get("authorization");
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) return true;
  if (notifySecret && req.headers.get("x-notify-secret") === notifySecret) return true;
  return false;
}

/** 16:05~16:25 ET — 장마감 직후 장후 브리핑 */
function isPostCloseWindow(): boolean {
  const now = new Date();
  if (isNYSEHoliday(now)) return false;
  const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const day = et.getDay();
  if (day === 0 || day === 6) return false;
  const mins = et.getHours() * 60 + et.getMinutes();
  return mins >= 16 * 60 + 5 && mins <= 16 * 60 + 25;
}

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET?.trim();
  const notifySecret = process.env.NOTIFY_SECRET?.trim();
  if (!cronSecret && !notifySecret) {
    return NextResponse.json({ error: "secret not configured" }, { status: 503 });
  }
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!isPostCloseWindow()) {
    return NextResponse.json({ skipped: true, reason: "not post-close window" });
  }

  // 강제 장후 카피용 — 윈도우 안이면 phase는 post여야 함
  if (getBriefPhase() !== "post") {
    return NextResponse.json({ skipped: true, reason: "phase not post" });
  }

  const briefing = await getOrCreatePostMarketBriefing();
  if (!briefing) {
    return NextResponse.json({ skipped: true, reason: "no session-news briefing" });
  }

  const { data: subs, error } = await supabase
    .from("push_subscriptions")
    .select("endpoint, p256dh, auth");

  if (error || !subs || subs.length === 0) {
    return NextResponse.json({ sent: 0, message: "no subscribers" });
  }

  const payload = JSON.stringify({
    title:   "☀️ 장후 브리핑",
    message: briefing.headline.slice(0, 120),
    url:     "/",
  });

  let sent = 0;
  const expired: string[] = [];

  await Promise.allSettled(
    subs.map(async (sub) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload,
        );
        sent++;
      } catch (err: unknown) {
        const status = (err as { statusCode?: number }).statusCode;
        if (status === 410 || status === 404) expired.push(sub.endpoint);
      }
    }),
  );

  if (expired.length > 0) {
    await supabase.from("push_subscriptions").delete().in("endpoint", expired);
  }

  return NextResponse.json({
    sent,
    expired: expired.length,
    total: subs.length,
    dateKey: briefing.dateKey,
    phase: briefing.phase,
  });
}
