import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

webpush.setVapidDetails(
  process.env.VAPID_MAILTO!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function GET() {
  const { data: subs, error } = await supabase
    .from("push_subscriptions")
    .select("endpoint, p256dh, auth");

  if (error) {
    console.error("fetch subscriptions error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!subs || subs.length === 0) {
    return NextResponse.json({ sent: 0, message: "no subscribers" });
  }

  const payload = JSON.stringify({
    title: "📊 오늘 리포트 업데이트",
    message: "오늘자 리포트가 업데이트 되었습니다. 바로 확인하시겠습니까?",
    url: "/insight",
  });

  let sent = 0;
  const expired: string[] = [];

  await Promise.allSettled(
    subs.map(async (sub) => {
      const pushSub = {
        endpoint: sub.endpoint,
        keys: { p256dh: sub.p256dh, auth: sub.auth },
      };
      try {
        await webpush.sendNotification(pushSub, payload);
        sent++;
      } catch (err: unknown) {
        const status = (err as { statusCode?: number }).statusCode;
        if (status === 410 || status === 404) {
          expired.push(sub.endpoint);
        }
      }
    }),
  );

  if (expired.length > 0) {
    await supabase
      .from("push_subscriptions")
      .delete()
      .in("endpoint", expired);
  }

  // 리포트 업데이트 시 애널리스트 탭 + 종토방에도 글 자동 생성
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://investus.kr";
    const cronSecret = process.env.CRON_SECRET ?? "";
    await fetch(`${base}/api/cron/market-open-posts?session=report`, {
      headers: cronSecret ? { authorization: `Bearer ${cronSecret}` } : {},
    });
  } catch {
    // 실패해도 push 전송 결과는 반환
  }

  return NextResponse.json({ sent, expired: expired.length, total: subs.length });
}
