import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase, getUserFromRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const BUCKET = "creator-pdfs";

export async function GET(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  if (!path) return NextResponse.json({ error: "path 필요" }, { status: 400 });

  // Security: path must start with the requesting user's email
  if (!path.startsWith(authUser.email + "/")) {
    return NextResponse.json({ error: "접근 권한 없음" }, { status: 403 });
  }

  const supabase = getAdminSupabase();
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, 3600); // 1-hour signed URL

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: "URL 생성 실패" }, { status: 500 });
  }

  return NextResponse.json({ url: data.signedUrl });
}
