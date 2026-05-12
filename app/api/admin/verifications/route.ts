import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const ADMIN_TOKEN = "investus2026";

// GET /api/admin/verifications?token=... → list all (admin)
// GET /api/admin/verifications?phone=... → check one user's status (user)
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const phone = req.nextUrl.searchParams.get("phone");

  // Admin: list all verifications
  if (token === ADMIN_TOKEN) {
    const { data, error } = await supabase
      .from("creator_verifications")
      .select("*")
      .order("submitted_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data ?? []);
  }

  // User: check their own status
  if (phone) {
    const { data } = await supabase
      .from("creator_verifications")
      .select("status")
      .eq("phone", phone)
      .maybeSingle();
    return NextResponse.json({ status: data?.status ?? null });
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// POST /api/admin/verifications — submit verification request
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { phone, nickname, avatar, bio } = body;
  if (!phone) return NextResponse.json({ error: "phone required" }, { status: 400 });

  // Upsert (re-submission resets to pending)
  const { error } = await supabase
    .from("creator_verifications")
    .upsert({ phone, nickname, avatar, bio, status: "pending", submitted_at: new Date().toISOString() }, { onConflict: "phone" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Email notification to admin
  try {
    await fetch("https://formspree.io/f/xgodqoey", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `[Investus] 크리에이터 인증 신청 — ${nickname}`,
        message: `새 크리에이터 인증 신청\n\n닉네임: ${nickname}\n전화번호: ${phone}\n자기소개: ${bio}\n\n승인 페이지: https://investus.vercel.app/admin/creators`,
      }),
    });
  } catch {}

  return NextResponse.json({ status: "pending" });
}

// PATCH /api/admin/verifications?token=... — approve or reject
export async function PATCH(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (token !== ADMIN_TOKEN) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { phone, action } = await req.json() as { phone: string; action: "approve" | "reject" };
  const status = action === "approve" ? "approved" : "rejected";

  const { error } = await supabase
    .from("creator_verifications")
    .update({ status, reviewed_at: new Date().toISOString() })
    .eq("phone", phone);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ status });
}
