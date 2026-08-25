import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase, getUserFromRequest } from "@/lib/supabase";
import { makeAnonNick } from "@/lib/wallNick";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("post_id");
  if (!postId) return NextResponse.json([]);

  const [{ data, error }, authUser] = await Promise.all([
    getAdminSupabase()
      .from("wall_comments")
      .select("id, post_id, user_id, nickname, content, likes, created_at, parent_id")
      .eq("post_id", postId)
      .order("created_at", { ascending: true })
      .limit(200),
    getUserFromRequest(req),
  ]);

  if (error) return NextResponse.json([]);

  const safe = (data ?? []).map(({ user_id, ...rest }) => ({
    ...rest,
    is_mine: !!authUser && user_id === authUser.email,
  }));
  return NextResponse.json(safe);
}

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

  const db = getAdminSupabase();
  const { data, error } = await db
    .from("wall_comments")
    .insert({ post_id, user_id: authUser.email, nickname: makeAnonNick(authUser.email), content: trimmed, parent_id: parent_id ?? null })
    .select("id, post_id, nickname, content, likes, created_at, parent_id")
    .single();

  if (error) return NextResponse.json({ error: "댓글 게시 실패" }, { status: 500 });

  const { data: parentPost } = await db
    .from("wall_posts")
    .select("comments")
    .eq("id", post_id)
    .single();
  if (parentPost) {
    await db
      .from("wall_posts")
      .update({ comments: parentPost.comments + 1 })
      .eq("id", post_id);
  }

  return NextResponse.json({ ...data, post_id, is_mine: true }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });

  const db = getAdminSupabase();
  const { data: comment } = await db
    .from("wall_comments")
    .select("user_id, post_id")
    .eq("id", id)
    .single();

  if (!comment || comment.user_id !== authUser.email) {
    return NextResponse.json({ error: "권한 없음" }, { status: 403 });
  }

  const { error } = await db.from("wall_comments").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "삭제 실패" }, { status: 500 });

  const { data: parentPost } = await db
    .from("wall_posts")
    .select("comments")
    .eq("id", comment.post_id)
    .single();
  if (parentPost && parentPost.comments > 0) {
    await db
      .from("wall_posts")
      .update({ comments: parentPost.comments - 1 })
      .eq("id", comment.post_id);
  }

  return NextResponse.json({ ok: true });
}
