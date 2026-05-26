import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase, getUserFromRequest } from "@/lib/supabase";
import { likerHash } from "@/lib/analystCrypto";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

  const { id } = await params;
  const postId = Number(id);
  if (!Number.isFinite(postId)) return NextResponse.json({ error: "잘못된 ID" }, { status: 400 });

  // Use one-way hash — user_id is never stored in likes table
  const hash = likerHash(user.id);
  const supabase = getAdminSupabase();

  const { data: existing } = await supabase
    .from("analyst_post_likes")
    .select("post_id")
    .eq("post_id", postId)
    .eq("liker_hash", hash)
    .maybeSingle();

  const { data: post } = await supabase
    .from("analyst_posts")
    .select("likes")
    .eq("id", postId)
    .single();

  if (!post) return NextResponse.json({ error: "포스트 없음" }, { status: 404 });

  if (existing) {
    await supabase.from("analyst_post_likes").delete()
      .eq("post_id", postId).eq("liker_hash", hash);
    const newLikes = Math.max(0, post.likes - 1);
    await supabase.from("analyst_posts").update({ likes: newLikes }).eq("id", postId);
    return NextResponse.json({ liked: false, likes: newLikes });
  } else {
    await supabase.from("analyst_post_likes").insert({ post_id: postId, liker_hash: hash });
    const newLikes = post.likes + 1;
    await supabase.from("analyst_posts").update({ likes: newLikes }).eq("id", postId);
    return NextResponse.json({ liked: true, likes: newLikes });
  }
}
