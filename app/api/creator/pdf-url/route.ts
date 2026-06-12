import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const BUCKET = "creator-pdfs";

// Public endpoint — all content is free; signed URL is time-limited (1 h)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  if (!path) return NextResponse.json({ error: "path 필요" }, { status: 400 });

  const supabase = getAdminSupabase();
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, 3600);

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: "URL 생성 실패" }, { status: 500 });
  }

  return NextResponse.json({ url: data.signedUrl });
}
