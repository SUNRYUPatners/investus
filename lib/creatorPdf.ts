import { getAdminSupabase } from "@/lib/supabase";
import { emailForCreatorId, looksLikeEmail, storagePathFromPublic } from "@/lib/creatorPublicId";

export const CREATOR_PDF_BUCKET = "creator-pdfs";

function pathOk(pdfPath: string): boolean {
  if (!pdfPath || pdfPath.includes("..") || pdfPath.startsWith("/") || pdfPath.includes("\\")) {
    return false;
  }
  const segments = pdfPath.split("/").filter(Boolean);
  if (segments.length < 2) return false;
  if (segments.some((s) => s === "." || s === "..")) return false;
  return true;
}

/**
 * Map a public (or legacy email) PDF path to the Storage object path if it is listed in contents.json.
 */
export async function resolvePublishedPdfPath(pdfPath: string): Promise<string | null> {
  if (!pathOk(pdfPath)) return null;

  const owner = pdfPath.split("/").filter(Boolean)[0];
  const email = looksLikeEmail(owner) ? owner.trim() : await emailForCreatorId(owner);
  if (!email) return null;

  const realPath = storagePathFromPublic(pdfPath, email);
  const supabase = getAdminSupabase();
  const { data, error } = await supabase.storage
    .from(CREATOR_PDF_BUCKET)
    .download(`${email}/contents.json`);

  if (error || !data) return null;

  try {
    const parsed = JSON.parse(await data.text()) as unknown;
    if (!Array.isArray(parsed)) return null;
    const listed = parsed.some((c) => {
      if (!c || typeof c !== "object" || !("pdfPath" in c)) return false;
      const listedPath = (c as { pdfPath?: string }).pdfPath;
      return listedPath === pdfPath || listedPath === realPath;
    });
    return listed ? realPath : null;
  } catch {
    return null;
  }
}

export async function assertPublishedPdfPath(pdfPath: string): Promise<boolean> {
  return (await resolvePublishedPdfPath(pdfPath)) != null;
}
