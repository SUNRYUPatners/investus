import { NextRequest, NextResponse } from "next/server";
import { getSupabase, getUserFromRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Only profile/subscription fields are editable.
// AI-verified fields (annual_return, portfolio_scale, top_holdings) are immutable here.
export async function PATCH(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) return NextResponse.json({ error: "로그인 필요" }, { status: 401 });

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const { nickname, bio, avatar, tags, subscription_enabled, subscription_price } = body;

  const fullPayload: Record<string, unknown> = {
    nickname:             String(nickname ?? "").slice(0, 50),
    bio:                  String(bio ?? "").slice(0, 500),
    avatar:               String(avatar ?? "").slice(0, 10),
    tags:                 Array.isArray(tags) ? tags.slice(0, 5) : [],
    subscription_enabled: subscription_enabled === true,
    subscription_price:   typeof subscription_price === "number" ? subscription_price : null,
  };

  let { error } = await getSupabase()
    .from("creator_verifications")
    .update(fullPayload)
    .eq("phone", authUser.email);

  if (error) {
    // Extra columns may not exist — retry with minimal fields only
    const minimal: Record<string, unknown> = {
      nickname: fullPayload.nickname,
      bio:      fullPayload.bio,
      avatar:   fullPayload.avatar,
      tags:     fullPayload.tags,
    };
    const { error: e2 } = await getSupabase()
      .from("creator_verifications")
      .update(minimal)
      .eq("phone", authUser.email);
    if (e2) return NextResponse.json({ error: "업데이트 실패" }, { status: 500 });
    error = null;
  }

  return NextResponse.json({ ok: true });
}
