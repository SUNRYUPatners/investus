import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase, getUserFromRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const BUCKET = "creator-pdfs";

export async function POST(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

  let body: { contentId?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const { contentId } = body;
  if (!contentId) return NextResponse.json({ error: "contentId 필요" }, { status: 400 });

  const supabase = getAdminSupabase();

  // Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.find((b) => b.name === BUCKET)) {
    await supabase.storage.createBucket(BUCKET, { public: false, fileSizeLimit: "50mb" });
  }

  const path = `${authUser.email}/${contentId}.pdf`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUploadUrl(path);

  if (error || !data) {
    return NextResponse.json({ error: "업로드 URL 생성 실패: " + (error?.message ?? "") }, { status: 500 });
  }

  return NextResponse.json({ path, signedUrl: data.signedUrl, token: data.token });
}
