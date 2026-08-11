import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";
import { assertPublishedPdfPath, CREATOR_PDF_BUCKET } from "@/lib/creatorPdf";

export const dynamic = "force-dynamic";

// Signed URL only for PDFs listed in the creator's public contents.json
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  if (!path) return NextResponse.json({ error: "path 필요" }, { status: 400 });

  if (!(await assertPublishedPdfPath(path))) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const supabase = getAdminSupabase();
  const { data, error } = await supabase.storage
    .from(CREATOR_PDF_BUCKET)
    .createSignedUrl(path, 3600);

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: "URL 생성 실패" }, { status: 500 });
  }

  return NextResponse.json({ url: data.signedUrl });
}
