/**
 * 사용자가 정기결제 구독을 해지.
 * - billingKey 삭제
 * - 구독 상태 'cancelled'
 * - Pro 메타 즉시 해제 여부는 정책에 따라 (여기서는 만료일까지 유지 → cancelled_at만 마킹)
 */
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, getAdminSupabase } from "@/lib/supabase";
import { deleteBillingKey } from "@/lib/portone";

type Body = {
  subscriptionId: string;
  immediate?: boolean; // true면 즉시 Pro 해제
};

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "로그인 필요" }, { status: 401 });

  let body: Body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  if (!body.subscriptionId) {
    return NextResponse.json({ error: "subscriptionId 누락" }, { status: 400 });
  }

  const sb = getAdminSupabase();
  const { data: sub, error } = await sb
    .from("portone_subscriptions")
    .select("id, user_id, plan_kind, billing_key, status")
    .eq("id", body.subscriptionId)
    .single();

  if (error || !sub) {
    return NextResponse.json({ error: "구독을 찾을 수 없음" }, { status: 404 });
  }
  if (sub.user_id !== user.id) {
    return NextResponse.json({ error: "권한 없음" }, { status: 403 });
  }
  if (sub.status === "cancelled") {
    return NextResponse.json({ ok: true, alreadyCancelled: true });
  }

  // billingKey 삭제 (실패해도 구독 상태는 취소로 마킹)
  try {
    await deleteBillingKey(sub.billing_key, "user requested cancel");
  } catch (e) {
    console.error("billingKey 삭제 실패(무시):", (e as Error).message);
  }

  await sb.from("portone_subscriptions")
    .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
    .eq("id", sub.id);

  // 즉시 해제 옵션이면 Pro 메타 벗김
  if (body.immediate && sub.plan_kind === "pro") {
    try {
      await sb.auth.admin.updateUserById(user.id, {
        user_metadata: { investus_pro: false },
      });
    } catch (e) {
      console.error("investus_pro 해제 실패:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
