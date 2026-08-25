import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase, getUserFromRequest } from "@/lib/supabase";
import { emailForCreatorId, rewriteContentsForPublic } from "@/lib/creatorPublicId";

export const dynamic = "force-dynamic";

const BUCKET = "creator-pdfs";
const contentsPath = (email: string) => `${email}/contents.json`;

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json([], { status: 400 });

  const email = await emailForCreatorId(id);
  if (!email) return NextResponse.json([]);

  const supabase = getAdminSupabase();
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.find((b) => b.name === BUCKET)) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .download(contentsPath(email));

  if (error || !data) return NextResponse.json([]);

  try {
    const text = await data.text();
    const parsed = JSON.parse(text);
    return NextResponse.json(rewriteContentsForPublic(Array.isArray(parsed) ? parsed : [], email));
  } catch {
    return NextResponse.json([]);
  }
}

export async function PUT(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let contents: unknown;
  try { contents = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid body" }, { status: 400 }); }

  if (!Array.isArray(contents)) {
    return NextResponse.json({ error: "Expected array" }, { status: 400 });
  }

  const supabase = getAdminSupabase();
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.find((b) => b.name === BUCKET)) {
    await supabase.storage.createBucket(BUCKET, { public: false, fileSizeLimit: "50mb" });
  }

  const json = JSON.stringify(contents);
  const blob = new Blob([json], { type: "application/json" });

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(contentsPath(authUser.email), blob, {
      contentType: "application/json",
      upsert: true,
    });

  if (error) return NextResponse.json({ error: "Save failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
