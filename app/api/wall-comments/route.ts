import { NextRequest, NextResponse } from "next/server";
import { getSupabase, getUserFromRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function makeAnonNick(email: string): string {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = (hash * 31 + email.charCodeAt(i)) & 0x7fffffff;
  }
  return `익명_${String(hash % 10000).padStart(4, "0")}`;
}

// GET /api/wall-comments?post_id=123
export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("post_id");
  if (!postId) return NextResponse.json([]);

  const { data, error } = await getSupabase()
    .from("wall_comments")
    .select("id, post_id, user_id, nickname, content, likes, created_at, parent_id")
    .eq("post_id", postId)
    .order("created_at", { ascending: true })
    .limit(200);

  if (error) return NextResponse.json([]);
  return NextResponse.json(data ?? []);
}

// POST /api/wall-comments  — requires JWT
export async function POST(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  let body: { post_id?: number; content?: string; parent_id?: number };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const { post_id, content, parent_id } = body;
  if (!post_id || !content) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });
  }

  const trimmed = content.trim();
  if (trimmed.length < 1)   return NextResponse.json({ error: "내용을 입력해주세요." }, { status: 400 });
  if (trimmed.length > 200) return NextResponse.json({ error: "200자 이내로 작성해주세요." }, { status: 400 });

  // Verify user is approved creator (server-verified email)
  const { data: verif } = await getSupabase()
    .from("creator_verifications")
    .select("status")
    .eq("phone", authUser.email)
    .maybeSingle();

  if (verif?.status !== "approved") {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 403 });
  }

  const { data, error } = await getSupabase()
    .from("wall_comments")
    .insert({ post_id, user_id: authUser.email, nickname: makeAnonNick(authUser.email), content: trimmed, parent_id: parent_id ?? null })
    .select("id, post_id, user_id, nickname, content, likes, created_at, parent_id")
    .single();

  if (error) return NextResponse.json({ error: "댓글 게시 실패" }, { status: 500 });

  // Increment comment count on the parent post
  const { data: parentPost } = await getSupabase()
    .from("wall_posts")
    .select("comments")
    .eq("id", post_id)
    .single();
  if (parentPost) {
    await getSupabase()
      .from("wall_posts")
      .update({ comments: parentPost.comments + 1 })
      .eq("id", post_id);
  }

  return NextResponse.json(data, { status: 201 });
}

// DELETE /api/wall-comments?id=123  — requires JWT (owner only)
export async function DELETE(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });

  const { data: comment } = await getSupabase()
    .from("wall_comments")
    .select("user_id, post_id")
    .eq("id", id)
    .single();

  if (!comment || comment.user_id !== authUser.email) {
    return NextResponse.json({ error: "권한 없음" }, { status: 403 });
  }

  const { error } = await getSupabase().from("wall_comments").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "삭제 실패" }, { status: 500 });

  // Decrement comment count
  const { data: parentPost } = await getSupabase()
    .from("wall_posts")
    .select("comments")
    .eq("id", comment.post_id)
    .single();
  if (parentPost && parentPost.comments > 0) {
    await getSupabase()
      .from("wall_posts")
      .update({ comments: parentPost.comments - 1 })
      .eq("id", comment.post_id);
  }

  return NextResponse.json({ ok: true });
}
