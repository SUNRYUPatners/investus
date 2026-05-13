import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? "investus2026";

function getAdminToken(req: NextRequest): string | null {
  // Authorization: Bearer <token>  OR  ?token= (legacy, deprecated)
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return req.nextUrl.searchParams.get("token");
}

// GET /api/admin/verifications  (Authorization: Bearer <token>) → list all (admin)
// GET /api/admin/verifications?phone=...                        → check one user's status
export async function GET(req: NextRequest) {
  const token = getAdminToken(req);
  const phone = req.nextUrl.searchParams.get("phone");

  // Admin: list all verifications
  if (token === ADMIN_TOKEN) {
    const { data, error } = await getSupabase()
      .from("creator_verifications")
      .select("*")
      .order("submitted_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data ?? []);
  }

  // User: check their own status
  if (phone) {
    const { data } = await getSupabase()
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
  // Size guards — prevent oversized payloads (avatar base64 etc.)
  if (String(phone).length > 20 || String(nickname ?? "").length > 50
      || String(bio ?? "").length > 500 || String(avatar ?? "").length > 2000) {
    return NextResponse.json({ error: "payload too large" }, { status: 413 });
  }

  // Upsert (re-submission resets to pending)
  const { error } = await getSupabase()
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

// PATCH /api/admin/verifications — approve or reject (Authorization: Bearer <token>)
export async function PATCH(req: NextRequest) {
  const token = getAdminToken(req);
  if (token !== ADMIN_TOKEN) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { phone, action } = await req.json() as { phone: string; action: "approve" | "reject" };
  const status = action === "approve" ? "approved" : "rejected";

  const { error } = await getSupabase()
    .from("creator_verifications")
    .update({ status, reviewed_at: new Date().toISOString() })
    .eq("phone", phone);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ status });
}
