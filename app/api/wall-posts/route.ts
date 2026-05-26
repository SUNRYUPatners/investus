import { NextRequest, NextResponse } from "next/server";
import { getSupabase, getAdminSupabase, getUserFromRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function makeAnonNick(email: string): string {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = (hash * 31 + email.charCodeAt(i)) & 0x7fffffff;
  }
  return `익명_${String(hash % 10000).padStart(4, "0")}`;
}

// Block content that resembles financial fraud / external links
const BANNED_PATTERNS = [
  /수익\s*(보장|확실|100%)/i,
  /절대\s*(수익|안전|손실\s*없)/i,
  /https?:\/\/(?!investus\.kr)/i, // external URLs
];

function isContentBanned(text: string): boolean {
  return BANNED_PATTERNS.some((re) => re.test(text));
}

// GET /api/wall-posts?symbol=NVDA  — latest 50 posts for a symbol
export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get("symbol")?.toUpperCase();
  if (!symbol) return NextResponse.json([]);

  const { data, error } = await getSupabase()
    .from("wall_posts")
    .select("id, symbol, user_id, nickname, holding_label, content, likes, comments, created_at")
    .eq("symbol", symbol)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return NextResponse.json([]);

  return NextResponse.json(data ?? []);
}

// POST /api/wall-posts  — create a new post (requires JWT)
export async function POST(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  let body: { symbol?: string; content?: string; holdingLabel?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const { symbol, content, holdingLabel } = body;

  if (!symbol || !content) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });
  }

  const trimmed = content.trim();
  if (trimmed.length < 5)   return NextResponse.json({ error: "내용이 너무 짧습니다." }, { status: 400 });
  if (trimmed.length > 300) return NextResponse.json({ error: "300자 이내로 작성해주세요." }, { status: 400 });

  if (isContentBanned(trimmed)) {
    return NextResponse.json({ error: "게시할 수 없는 내용이 포함되어 있습니다." }, { status: 400 });
  }

  // Verify user is approved creator (using server-verified email)
  const { data: verif } = await getSupabase()
    .from("creator_verifications")
    .select("status")
    .eq("phone", authUser.email)
    .maybeSingle();

  if (verif?.status !== "approved") {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 403 });
  }

  const { data, error } = await getSupabase()
    .from("wall_posts")
    .insert({
      symbol:        symbol.toUpperCase(),
      user_id:       authUser.email,
      nickname:      makeAnonNick(authUser.email),
      holding_label: holdingLabel ?? "보유확인",
      content:       trimmed,
    })
    .select("id, symbol, user_id, nickname, holding_label, content, likes, comments, created_at")
    .single();

  if (error) {
    if (error.code === "42P01") {
      return NextResponse.json({ error: "DB 설정 필요 — Supabase에서 wall_posts 테이블을 생성해주세요." }, { status: 503 });
    }
    return NextResponse.json({ error: "게시 실패" }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// PATCH /api/wall-posts?id=123  — edit own post content
export async function PATCH(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });

  let body: { content?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const trimmed = body.content?.trim() ?? "";
  if (trimmed.length < 5)   return NextResponse.json({ error: "내용이 너무 짧습니다." }, { status: 400 });
  if (trimmed.length > 300) return NextResponse.json({ error: "300자 이내로 작성해주세요." }, { status: 400 });
  if (isContentBanned(trimmed)) return NextResponse.json({ error: "게시할 수 없는 내용이 포함되어 있습니다." }, { status: 400 });

  // Verify ownership
  const { data: post } = await getSupabase()
    .from("wall_posts")
    .select("user_id")
    .eq("id", id)
    .single();

  if (!post || post.user_id !== authUser.email) {
    return NextResponse.json({ error: "권한 없음" }, { status: 403 });
  }

  const { error } = await getAdminSupabase()
    .from("wall_posts")
    .update({ content: trimmed })
    .eq("id", id);

  if (error) return NextResponse.json({ error: "수정 실패" }, { status: 500 });

  return NextResponse.json({ ok: true, content: trimmed });
}

// DELETE /api/wall-posts?id=123  — requires JWT (owner only)
export async function DELETE(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });

  // Verify ownership before deleting
  const { data: post } = await getSupabase()
    .from("wall_posts")
    .select("user_id")
    .eq("id", id)
    .single();

  if (!post || post.user_id !== authUser.email) {
    return NextResponse.json({ error: "권한 없음" }, { status: 403 });
  }

  const { error } = await getAdminSupabase()
    .from("wall_posts")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: "삭제 실패" }, { status: 500 });

  return NextResponse.json({ ok: true });
}
