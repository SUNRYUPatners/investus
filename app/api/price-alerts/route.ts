import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";
import { hasProAccess } from "@/lib/subscription";
import {
  MAX_ALERTS_PER_USER,
  loadPriceAlerts,
  savePriceAlerts,
  type PriceAlertDirection,
  type StoredPriceAlert,
} from "@/lib/priceAlerts";

export const dynamic = "force-dynamic";

async function requireProUser(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;
  try {
    const { data: { user }, error } = await getAdminSupabase().auth.getUser(token);
    if (error || !user) return null;
    const isPro = hasProAccess({
      email: user.email,
      investusPro: user.user_metadata?.investus_pro === true,
    });
    return { user, isPro };
  } catch {
    return null;
  }
}

/** GET — 내 알림 목록 */
export async function GET(req: NextRequest) {
  const auth = await requireProUser(req);
  if (!auth) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!auth.isPro) return NextResponse.json({ error: "pro_required" }, { status: 403 });

  const all = await loadPriceAlerts();
  const mine = all.filter((a) => a.userId === auth.user.id);
  return NextResponse.json({
    alerts: mine.map(({ id, symbol, direction, target, createdAt, firedAt }) => ({
      id, symbol, direction, target, createdAt, firedAt: firedAt ?? null,
    })),
    max: MAX_ALERTS_PER_USER,
  });
}

/** POST — 알림 추가 */
export async function POST(req: NextRequest) {
  const auth = await requireProUser(req);
  if (!auth) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!auth.isPro) return NextResponse.json({ error: "pro_required" }, { status: 403 });

  const body = await req.json().catch(() => null) as {
    symbol?: string;
    direction?: PriceAlertDirection;
    target?: number;
    endpoint?: string;
    keys?: { p256dh?: string; auth?: string };
  } | null;

  const symbol = String(body?.symbol ?? "").trim().toUpperCase();
  const direction = body?.direction;
  const target = Number(body?.target);
  const endpoint = String(body?.endpoint ?? "").trim();
  const p256dh = String(body?.keys?.p256dh ?? "").trim();
  const authKey = String(body?.keys?.auth ?? "").trim();

  if (!symbol || symbol.length > 12) {
    return NextResponse.json({ error: "invalid_symbol" }, { status: 400 });
  }
  if (direction !== "above" && direction !== "below") {
    return NextResponse.json({ error: "invalid_direction" }, { status: 400 });
  }
  if (!Number.isFinite(target) || target <= 0 || target > 1_000_000) {
    return NextResponse.json({ error: "invalid_target" }, { status: 400 });
  }
  if (!endpoint || endpoint.length > 500 || !p256dh || !authKey) {
    return NextResponse.json({ error: "push_subscription_required" }, { status: 400 });
  }

  const all = await loadPriceAlerts();
  const activeMine = all.filter((a) => a.userId === auth.user.id && !a.firedAt);
  if (activeMine.length >= MAX_ALERTS_PER_USER) {
    return NextResponse.json({ error: "limit_reached", max: MAX_ALERTS_PER_USER }, { status: 400 });
  }
  if (activeMine.some((a) => a.symbol === symbol && a.direction === direction)) {
    return NextResponse.json({ error: "duplicate" }, { status: 409 });
  }

  const alert: StoredPriceAlert = {
    id: `pa_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    userId: auth.user.id,
    endpoint,
    p256dh,
    auth: authKey,
    symbol,
    direction,
    target,
    createdAt: Date.now(),
    firedAt: null,
  };

  const next = [...all.filter((a) => !(a.userId === auth.user.id && a.firedAt && Date.now() - (a.firedAt) > 7 * 86_400_000)), alert];
  const ok = await savePriceAlerts(next);
  if (!ok) return NextResponse.json({ error: "save_failed" }, { status: 500 });

  return NextResponse.json({
    ok: true,
    alert: {
      id: alert.id,
      symbol: alert.symbol,
      direction: alert.direction,
      target: alert.target,
      createdAt: alert.createdAt,
      firedAt: null,
    },
  });
}

/** DELETE — ?id= */
export async function DELETE(req: NextRequest) {
  const auth = await requireProUser(req);
  if (!auth) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!auth.isPro) return NextResponse.json({ error: "pro_required" }, { status: 403 });

  const id = req.nextUrl.searchParams.get("id")?.trim();
  if (!id) return NextResponse.json({ error: "missing_id" }, { status: 400 });

  const all = await loadPriceAlerts();
  const next = all.filter((a) => !(a.id === id && a.userId === auth.user.id));
  if (next.length === all.length) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const ok = await savePriceAlerts(next);
  if (!ok) return NextResponse.json({ error: "save_failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
