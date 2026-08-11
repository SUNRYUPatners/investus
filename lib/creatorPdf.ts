import { getAdminSupabase } from "@/lib/supabase";

export const CREATOR_PDF_BUCKET = "creator-pdfs";

/**
 * Only allow PDF paths that appear in the owner's published contents.json.
 * Blocks arbitrary Storage path traversal via service-role download.
 */
export async function assertPublishedPdfPath(pdfPath: string): Promise<boolean> {
  if (!pdfPath || pdfPath.includes("..") || pdfPath.startsWith("/") || pdfPath.includes("\\")) {
    return false;
  }
  const segments = pdfPath.split("/").filter(Boolean);
  if (segments.length < 2) return false;
  if (segments.some((s) => s === "." || s === "..")) return false;

  const owner = segments[0];
  const supabase = getAdminSupabase();
  const { data, error } = await supabase.storage
    .from(CREATOR_PDF_BUCKET)
    .download(`${owner}/contents.json`);

  if (error || !data) return false;

  try {
    const parsed = JSON.parse(await data.text()) as unknown;
    if (!Array.isArray(parsed)) return false;
    return parsed.some(
      (c) =>
        c &&
        typeof c === "object" &&
        "pdfPath" in c &&
        (c as { pdfPath?: string }).pdfPath === pdfPath,
    );
  } catch {
    return false;
  }
}
