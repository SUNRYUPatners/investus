import { NextRequest } from "next/server";
import { getAdminSupabase, getUserFromRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const BUCKET = "creator-pdfs";

// Returns raw PDF bytes — no CORS, no redirect, pdfjs receives Uint8Array directly.
export async function GET(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) return new Response("Unauthorized", { status: 401 });

  const path = new URL(req.url).searchParams.get("path");
  if (!path) return new Response("No path", { status: 400 });

  if (!path.startsWith(authUser.email + "/")) {
    return new Response("Forbidden", { status: 403 });
  }

  const supabase = getAdminSupabase();
  const { data, error } = await supabase.storage.from(BUCKET).download(path);

  if (error || !data) {
    console.error("[pdf-proxy] download error:", error?.message, "path:", path);
    return new Response("Not found", { status: 404 });
  }

  return new Response(data, {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "private, no-store",
    },
  });
}
