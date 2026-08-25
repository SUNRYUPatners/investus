import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase, getUserFromRequest } from "@/lib/supabase";
import { findCreatorByPublicOrEmail, looksLikeEmail, publicCreatorDto } from "@/lib/creatorPublicId";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const rawId = req.nextUrl.searchParams.get("id");
  const mine = req.nextUrl.searchParams.get("mine") === "1";
  const id = rawId ? (() => { try { return decodeURIComponent(rawId); } catch { return rawId; } })() : null;
  const authUser = await getUserFromRequest(req);
  const db = getAdminSupabase();

  if (mine) {
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { data, error } = await db
      .from("creator_verifications")
      .select("nickname, avatar, bio, status, annual_return, portfolio_scale, top_holdings, tags, subscription_enabled, subscription_price, submitted_at, phone")
      .eq("phone", authUser.email)
      .maybeSingle();
    if (error) return NextResponse.json([]);
    if (!data) return NextResponse.json([]);
    return NextResponse.json([publicCreatorDto(data)]);
  }

  if (id && looksLikeEmail(id)) {
    if (!authUser || authUser.email.toLowerCase() !== id.toLowerCase()) {
      return NextResponse.json([]);
    }
    const { data } = await db
      .from("creator_verifications")
      .select("nickname, avatar, bio, status, annual_return, portfolio_scale, top_holdings, tags, subscription_enabled, subscription_price, submitted_at, phone")
      .eq("phone", authUser.email)
      .maybeSingle();
    return NextResponse.json(data ? [publicCreatorDto(data)] : []);
  }

  if (id) {
    const row = await findCreatorByPublicOrEmail(id);
    if (!row || row.status !== "approved") return NextResponse.json([]);
    return NextResponse.json([publicCreatorDto(row)]);
  }

  const { data, error } = await db
    .from("creator_verifications")
    .select("nickname, avatar, bio, status, annual_return, portfolio_scale, top_holdings, tags, subscription_enabled, subscription_price, submitted_at, phone")
    .eq("status", "approved")
    .order("submitted_at", { ascending: false });

  if (error) return NextResponse.json([]);
  return NextResponse.json((data ?? []).map((r) => publicCreatorDto(r)));
}

