import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getAdminSupabase();

  // Delete bot comments first (FK constraint)
  const { error: commentsErr, count: commentsCount } = await supabase
    .from("wall_comments")
    .delete({ count: "exact" })
    .eq("user_id", "bot2@investus.kr");

  if (commentsErr) {
    return NextResponse.json({ error: commentsErr.message }, { status: 500 });
  }

  // Delete bot posts
  const { error: postsErr, count: postsCount } = await supabase
    .from("wall_posts")
    .delete({ count: "exact" })
    .eq("user_id", "bot@investus.kr");

  if (postsErr) {
    return NextResponse.json({ error: postsErr.message }, { status: 500 });
  }

  return NextResponse.json({
    deleted: { comments: commentsCount ?? 0, posts: postsCount ?? 0 },
  });
}
