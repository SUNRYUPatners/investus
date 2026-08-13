import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { assertCronAuth } from "@/lib/cronAuth";
import { kvGetPrice } from "@/lib/kv";
import { loadPriceAlerts, savePriceAlerts } from "@/lib/priceAlerts";
import { isNYSEHoliday } from "@/lib/marketHours";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

webpush.setVapidDetails(
  process.env.VAPID_MAILTO!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

/** 미국 정규장 대략 창 (ET 9:30–16:05) */
function isUsSessionWindow(): boolean {
  const now = new Date();
  if (isNYSEHoliday(now)) return false;
  const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const day = et.getDay();
  if (day === 0 || day === 6) return false;
  const mins = et.getHours() * 60 + et.getMinutes();
  return mins >= 9 * 60 + 25 && mins <= 16 * 60 + 10;
}

export async function GET(req: NextRequest) {
  const denied = assertCronAuth(req);
  if (denied) return denied;

  if (!isUsSessionWindow()) {
    return NextResponse.json({ skipped: true, reason: "outside US session" });
  }

  const all = await loadPriceAlerts();
  const active = all.filter((a) => !a.firedAt);
  if (active.length === 0) {
    return NextResponse.json({ checked: 0, fired: 0 });
  }

  const symbols = [...new Set(active.map((a) => a.symbol))];
  const prices = new Map<string, number>();
  await Promise.all(
    symbols.map(async (sym) => {
      const p = await kvGetPrice(sym);
      if (p && p.price > 0) prices.set(sym, p.price);
    }),
  );

  let fired = 0;
  const expiredEndpoints: string[] = [];
  const next = [...all];

  for (const alert of active) {
    const price = prices.get(alert.symbol);
    if (price == null) continue;
    const hit =
      (alert.direction === "above" && price >= alert.target) ||
      (alert.direction === "below" && price <= alert.target);
    if (!hit) continue;

    const dirKo = alert.direction === "above" ? "돌파" : "하회";
    const payload = JSON.stringify({
      title:   `📈 ${alert.symbol} 목표가 ${dirKo}`,
      message: `${alert.symbol} $${price.toFixed(2)} · 목표 $${alert.target.toFixed(2)}`,
      url:     `/stock/${alert.symbol}`,
    });

    try {
      await webpush.sendNotification(
        { endpoint: alert.endpoint, keys: { p256dh: alert.p256dh, auth: alert.auth } },
        payload,
      );
      fired++;
      const idx = next.findIndex((a) => a.id === alert.id);
      if (idx >= 0) next[idx] = { ...next[idx], firedAt: Date.now() };
    } catch (err: unknown) {
      const status = (err as { statusCode?: number }).statusCode;
      if (status === 410 || status === 404) {
        expiredEndpoints.push(alert.endpoint);
        // 만료 구독 알림은 제거
        const idx = next.findIndex((a) => a.id === alert.id);
        if (idx >= 0) next.splice(idx, 1);
      }
    }
  }

  if (fired > 0 || expiredEndpoints.length > 0) {
    await savePriceAlerts(next);
  }

  return NextResponse.json({
    checked: active.length,
    symbols: symbols.length,
    fired,
    expired: expiredEndpoints.length,
  });
}
