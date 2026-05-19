import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || null; // null when unset — never matches empty string

function getAdminToken(req: NextRequest): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return null;
}

// Simple in-memory rate limit for failed admin auth attempts (10/min per IP)
const _authFails = new Map<string, { count: number; resetAt: number }>();
function checkAdminRateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = _authFails.get(ip);
  if (!rec || now > rec.resetAt) {
    _authFails.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (rec.count >= 10) return false;
  rec.count++;
  return true;
}

// GET /api/admin/verifications  (Authorization: Bearer <token>) → list all (admin)
// GET /api/admin/verifications?phone=...                        → check one user's status
export async function GET(req: NextRequest) {
  const token = getAdminToken(req);
  const phone = req.nextUrl.searchParams.get("phone");
  const ip    = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  // Admin: list all verifications
  if (ADMIN_TOKEN && token === ADMIN_TOKEN) {
    const { data, error } = await getSupabase()
      .from("creator_verifications")
      .select("*")
      .order("submitted_at", { ascending: false });
    if (error) return NextResponse.json({ error: "조회 실패" }, { status: 500 });
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

  // Wrong/missing token — rate limit brute-force attempts
  if (!checkAdminRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// POST /api/admin/verifications — submit verification request
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const { phone, nickname, avatar, bio } = body as Record<string, string>;
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

  if (error) return NextResponse.json({ error: "저장 실패" }, { status: 500 });

  // Email notification to admin
  try {
    await fetch("https://formspree.io/f/xgodqoey", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `[Investus] 크리에이터 인증 신청 — ${nickname}`,
        message: `새 크리에이터 인증 신청\n\n닉네임: ${nickname}\n이메일: ${phone}\n자기소개: ${bio}\n\n승인 페이지: https://investus.kr/admin/creators`,
      }),
    });
  } catch {}

  return NextResponse.json({ status: "pending" });
}

// PATCH /api/admin/verifications — approve or reject (Authorization: Bearer <token>)
export async function PATCH(req: NextRequest) {
  const token = getAdminToken(req);
  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { phone: string; action: "approve" | "reject" };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const { phone, action } = body;
  if (!phone || (action !== "approve" && action !== "reject")) {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }
  const status = action === "approve" ? "approved" : "rejected";

  const { error } = await getSupabase()
    .from("creator_verifications")
    .update({ status, reviewed_at: new Date().toISOString() })
    .eq("phone", phone);

  if (error) return NextResponse.json({ error: "업데이트 실패" }, { status: 500 });

  // 신청자에게 결과 이메일 알림 (phone 필드에 이메일 저장됨)
  if (phone.includes("@")) {
    try {
      const isApproved = action === "approve";
      await fetch("https://formspree.io/f/xgodqoey", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _replyto: phone,
          _subject: isApproved
            ? "[Investus] 크리에이터 인증이 승인되었습니다 🎉"
            : "[Investus] 크리에이터 인증 심사 결과 안내",
          message: isApproved
            ? `안녕하세요!\n\nInvestus 크리에이터 인증이 승인되었습니다.\n이제 투자 리포트와 콘텐츠를 작성하고 구독자를 모집할 수 있습니다.\n\nInvestus 앱에서 크리에이터 대시보드를 확인해 주세요.\nhttps://investus.kr`
            : `안녕하세요.\n\nInvestus 크리에이터 인증 심사 결과, 이번에는 승인이 어렵습니다.\n계좌 인증 캡쳐가 불명확하거나 요건을 충족하지 못한 경우 재신청이 가능합니다.\n\n문의: sunryupatners@gmail.com`,
        }),
      });
    } catch { /* 알림 실패는 무시 */ }
  }

  return NextResponse.json({ status });
}
