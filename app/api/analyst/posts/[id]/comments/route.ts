import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase, getUserFromRequest } from "@/lib/supabase";
import { anonymize } from "@/lib/analystCrypto";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isFinite(postId)) return NextResponse.json({ error: "잘못된 ID" }, { status: 400 });

  const { data, error } = await getAdminSupabase()
    .from("analyst_post_comments")
    .select("id, alias, content, created_at")
    .eq("post_id", postId)
    .order("created_at", { ascending: true })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest, { params }: Ctx) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

  const { id } = await params;
  const postId = Number(id);
  if (!Number.isFinite(postId)) return NextResponse.json({ error: "잘못된 ID" }, { status: 400 });

  // Require approved analyst — check by hash only
  const { userHash, alias } = anonymize(user.id);
  const supabase = getAdminSupabase();

  const { data: ver } = await supabase
    .from("analyst_verifications")
    .select("status, alias")
    .eq("user_hash", userHash)
    .maybeSingle();

  if (ver?.status !== "approved") {
    return NextResponse.json({ error: "애널리스트 인증이 필요합니다." }, { status: 403 });
  }

  let body: { content: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const content = body.content?.trim();
  if (!content || content.length < 1 || content.length > 500) {
    return NextResponse.json({ error: "1~500자로 작성해주세요." }, { status: 400 });
  }

  // Store alias only — no user_id in comments table
  const { data, error } = await supabase
    .from("analyst_post_comments")
    .insert({ post_id: postId, alias: ver.alias ?? alias, content })
    .select("id, alias, content, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
