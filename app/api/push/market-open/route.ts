import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";
import { isNYSEHoliday } from "@/lib/marketHours";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

webpush.setVapidDetails(
  process.env.VAPID_MAILTO!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// Vercel Cron이 Authorization: Bearer {CRON_SECRET} 헤더를 자동으로 추가
// 수동 테스트 시: x-notify-secret 헤더로도 인증 가능
function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  if (authHeader === `Bearer ${process.env.CRON_SECRET}`) return true;
  if (req.headers.get("x-notify-secret") === process.env.NOTIFY_SECRET) return true;
  return false;
}

// ET 기준 9:25~9:40 사이인지 확인 (DST 자동, NYSE 휴일 제외)
function isMarketOpenWindow(): boolean {
  const now   = new Date();
  const et    = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const day   = et.getDay();
  if (day === 0 || day === 6) return false;
  if (isNYSEHoliday(now)) return false;
  const mins  = et.getHours() * 60 + et.getMinutes();
  return mins >= 9 * 60 + 25 && mins <= 9 * 60 + 40;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // 실제로 9:25~9:40 AM ET 사이가 아니면 스킵 (DST 대응 — 13:30 UTC·14:30 UTC 두 번 호출)
  if (!isMarketOpenWindow()) {
    return NextResponse.json({ skipped: true, reason: "not market open window" });
  }

  const { data: subs, error } = await supabase
    .from("push_subscriptions")
    .select("endpoint, p256dh, auth");

  if (error || !subs || subs.length === 0) {
    return NextResponse.json({ sent: 0, message: "no subscribers" });
  }

  const payload = JSON.stringify({
    title:   "📈 미국 장 시작",
    message: "뉴욕 증권거래소가 개장했습니다. 오늘의 시장을 확인하세요!",
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

  return NextResponse.json({ sent, expired: expired.length, total: subs.length });
}
