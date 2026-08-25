import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";

const ipLog = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = ipLog.get(ip);
  if (!rec || now > rec.resetAt) {
    ipLog.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (rec.count >= 5) return false;
  rec.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "too many requests" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.endpoint || !body?.keys?.p256dh || !body?.keys?.auth) {
    return NextResponse.json({ error: "invalid subscription" }, { status: 400 });
  }

  if (String(body.endpoint).length > 500) {
    return NextResponse.json({ error: "invalid endpoint" }, { status: 400 });
  }
  try {
    const u = new URL(String(body.endpoint));
    if (u.protocol !== "https:") return NextResponse.json({ error: "invalid endpoint" }, { status: 400 });
    const h = u.hostname.toLowerCase();
    const ok =
      h.endsWith(".fcm.googleapis.com") ||
      h === "fcm.googleapis.com" ||
      h.endsWith(".googleapis.com") && h.includes("fcm") ||
      h.endsWith("push.services.mozilla.com") ||
      h.endsWith(".push.apple.com") ||
      h.endsWith("notify.windows.com");
    if (!ok) return NextResponse.json({ error: "invalid endpoint" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "invalid endpoint" }, { status: 400 });
  }

  const { error } = await getAdminSupabase()
    .from("push_subscriptions")
    .upsert(
      {
        endpoint: body.endpoint,
        p256dh:   body.keys.p256dh,
        auth:     body.keys.auth,
      },
      { onConflict: "endpoint" },
    );

  if (error) {
    return NextResponse.json({ error: "구독 저장 실패" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
