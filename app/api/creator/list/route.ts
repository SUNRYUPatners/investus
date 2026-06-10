import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET /api/creator/list          — all approved creators
// GET /api/creator/list?id=email — single creator by email
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  const base = getSupabase()
    .from("creator_verifications")
    .select("phone, nickname, avatar, bio, status, annual_return, portfolio_scale, top_holdings, tags, subscription_enabled, subscription_price, submitted_at")
    .eq("status", "approved")
    .order("submitted_at", { ascending: false });

  if (id) base.eq("phone", id);

  const { data, error } = await base;

  if (error) {
    // Extra columns may not exist — fallback to minimal select
    const fallback = getSupabase()
      .from("creator_verifications")
      .select("phone, nickname, avatar, bio, status, submitted_at")
      .eq("status", "approved")
      .order("submitted_at", { ascending: false });

    if (id) fallback.eq("phone", id);

    const { data: d2 } = await fallback;
    return NextResponse.json(d2 ?? []);
  }

  return NextResponse.json(data ?? []);
}
