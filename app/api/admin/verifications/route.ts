import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase, getUserFromRequest } from "@/lib/supabase";
import { notifyAdminEmail, notifyOneUserEmail } from "@/lib/adminNotify";
import { escapeHtml } from "@/lib/htmlEscape";

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
    const { data, error } = await getAdminSupabase()
      .from("creator_verifications")
      .select("*")
      .order("submitted_at", { ascending: false });
    if (error) return NextResponse.json({ error: "조회 실패" }, { status: 500 });
    return NextResponse.json(data ?? []);
  }

  // User: check their own status — JWT required, can only query their own email
  if (phone) {
    // Verify the requester's JWT and ensure they're querying their own email
    const authHeader = req.headers.get("authorization");
    const jwtToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (jwtToken) {
      const user = await getUserFromRequest(req);
      if (!user || user.email !== phone) {
        return NextResponse.json({ status: null });
      }
    } else {
      // No token → return null without revealing whether email exists
      return NextResponse.json({ status: null });
    }

    const { data } = await getAdminSupabase()
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
  const authUser = await getUserFromRequest(req);
  if (!authUser) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const {
    nickname, avatar, bio,
    tags, annual_return, portfolio_scale, top_holdings,
  } = body as Record<string, unknown>;

  const phoneStr    = authUser.email;
  const nicknameStr = String(nickname ?? "");
  const bioStr      = String(bio ?? "");
  const avatarStr   = String(avatar ?? "");
  // Size guards — prevent oversized payloads
  if (phoneStr.length > 100 || nicknameStr.length > 50
      || bioStr.length > 500 || avatarStr.length > 2000) {
    return NextResponse.json({ error: "payload too large" }, { status: 413 });
  }

  // AI 승인 플래그는 클라이언트가 위조할 수 있으므로 무시 — 항상 pending.
  // 승인은 관리자 PATCH 또는 별도 서버측 검증에서만.
  const status = "pending";
  const now = new Date().toISOString();

  const upsertData: Record<string, unknown> = {
    phone: phoneStr, nickname: nicknameStr, avatar: avatarStr, bio: bioStr,
    status, submitted_at: now,
    ...(Array.isArray(tags) && { tags }),
    ...(annual_return != null && { annual_return }),
    ...(portfolio_scale != null && { portfolio_scale }),
    ...(top_holdings != null && { top_holdings }),
  };

  // Upsert (re-submission resets)
  let { error } = await getAdminSupabase()
    .from("creator_verifications")
    .upsert(upsertData, { onConflict: "phone" });

  if (error) {
    const baseData = { phone: phoneStr, nickname: nicknameStr, avatar: avatarStr, bio: bioStr, status, submitted_at: now };
    ({ error } = await getAdminSupabase().from("creator_verifications").upsert(baseData, { onConflict: "phone" }));
  }

  if (error) return NextResponse.json({ error: "저장 실패" }, { status: 500 });

  // Email notification to admin
  try {
    await notifyAdminEmail(
      `[Investus] 크리에이터 인증 신청 — ${nicknameStr.slice(0, 40)}`,
      `<p>닉네임: ${escapeHtml(nicknameStr)}</p><p>상태: 검토 대기</p>`,
      `새 크리에이터 인증 신청\n닉네임: ${nicknameStr}\n상태: 검토 대기`,
    );
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

  const { error } = await getAdminSupabase()
    .from("creator_verifications")
    .update({ status, reviewed_at: new Date().toISOString() })
    .eq("phone", phone);

  if (error) return NextResponse.json({ error: "업데이트 실패" }, { status: 500 });

  // 신청자에게 결과 이메일 알림 (phone 필드에 이메일 저장됨)
  if (phone.includes("@")) {
    try {
      const isApproved = action === "approve";
      await notifyOneUserEmail(
        phone,
        isApproved
          ? "[Investus] 크리에이터 인증이 승인되었습니다"
          : "[Investus] 크리에이터 인증 심사 결과 안내",
        isApproved
          ? `안녕하세요.\n\nInvestus 크리에이터 인증이 승인되었습니다.\nhttps://www.investus.kr/creator/dashboard`
          : `안녕하세요.\n\n이번에는 승인이 어렵습니다. 재신청이 가능합니다.\n문의: sunryupatners@gmail.com`,
      );
    } catch { /* 알림 실패는 무시 */ }
  }

  return NextResponse.json({ status });
}
