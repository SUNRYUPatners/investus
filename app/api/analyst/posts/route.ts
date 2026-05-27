import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase, getUserFromRequest } from "@/lib/supabase";
import { anonymize, likerHash } from "@/lib/analystCrypto";

export async function GET(req: NextRequest) {
  const supabase = getAdminSupabase();
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor");

  let query = supabase
    .from("analyst_posts")
    .select("id, alias, content, symbol, likes, created_at")
    .order("created_at", { ascending: false })
    .limit(30);

  if (cursor) query = query.lt("created_at", cursor);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const user = await getUserFromRequest(req);
  const ids = (data ?? []).map((p) => p.id);

  // Parallel: user's likes + comment counts per post
  const [likeData, commentRows] = await Promise.all([
    user && ids.length > 0
      ? supabase.from("analyst_post_likes").select("post_id").eq("liker_hash", likerHash(user.id)).in("post_id", ids).then((r) => r.data ?? [])
      : Promise.resolve([] as { post_id: number }[]),
    ids.length > 0
      ? supabase.from("analyst_post_comments").select("post_id").in("post_id", ids).then((r) => r.data ?? [])
      : Promise.resolve([] as { post_id: number }[]),
  ]);

  const likedIds = likeData.map((l) => l.post_id);
  const commentCounts: Record<number, number> = {};
  commentRows.forEach((r) => { commentCounts[r.post_id] = (commentCounts[r.post_id] ?? 0) + 1; });

  const posts = (data ?? []).map((p) => ({
    ...p,
    comments: commentCounts[p.id] ?? 0,
    liked: likedIds.includes(p.id),
  }));
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

  const { userHash, alias } = anonymize(user.id);
  const supabase = getAdminSupabase();

  // Verify analyst status using hash — no user_id lookup
  const { data: ver } = await supabase
    .from("analyst_verifications")
    .select("status, alias")
    .eq("user_hash", userHash)
    .maybeSingle();

  if (ver?.status !== "approved") {
    return NextResponse.json({ error: "애널리스트 인증이 필요합니다." }, { status: 403 });
  }

  let body: { content: string; symbol?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const content = body.content?.trim();
  if (!content || content.length < 10 || content.length > 1000) {
    return NextResponse.json({ error: "10~1000자로 작성해주세요." }, { status: 400 });
  }

  // Insert alias only — NO user_id stored in posts table
  const { data, error } = await supabase
    .from("analyst_posts")
    .insert({ alias: ver.alias ?? alias, content, symbol: body.symbol ?? null })
    .select("id, alias, content, symbol, likes, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ...data, comments: 0, liked: false });
}
