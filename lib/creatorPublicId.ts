import { createHmac } from "crypto";
import { getAdminSupabase } from "@/lib/supabase";

type CreatorRow = Record<string, unknown> & { phone?: string | null };

function hmacSecret(): string {
  return (
    process.env.ANON_SALT?.trim()
    || process.env.CRON_SECRET?.trim()
    || "investus-creator-id"
  );
}

export function creatorPublicId(email: string): string {
  return "c" + createHmac("sha256", hmacSecret()).update(email.trim().toLowerCase()).digest("hex").slice(0, 20);
}

export function looksLikeEmail(s: string): boolean {
  return s.includes("@");
}

export function publicCreatorDto(row: CreatorRow): Record<string, unknown> {
  const email = String(row.phone ?? "");
  const { phone: _phone, ...rest } = row;
  return {
    ...rest,
    id: creatorPublicId(email),
  };
}

export async function findCreatorByPublicOrEmail(id: string): Promise<CreatorRow | null> {
  const { data, error } = await getAdminSupabase()
    .from("creator_verifications")
    .select("*")
    .eq("status", "approved");
  if (error || !data) return null;
  const needle = id.trim();
  if (looksLikeEmail(needle)) {
    return (data as CreatorRow[]).find((r) => String(r.phone ?? "").toLowerCase() === needle.toLowerCase()) ?? null;
  }
  return (data as CreatorRow[]).find((r) => creatorPublicId(String(r.phone ?? "")) === needle) ?? null;
}

export async function emailForCreatorId(id: string): Promise<string | null> {
  const row = await findCreatorByPublicOrEmail(id);
  const email = row?.phone ? String(row.phone) : null;
  return email;
}

export function rewriteStorageOwner(path: string, fromEmail: string, toPublicId: string): string {
  if (!path) return path;
  if (path.startsWith(fromEmail + "/")) return toPublicId + path.slice(fromEmail.length);
  return path;
}

export function rewriteContentsForPublic(contents: unknown, email: string): unknown {
  if (!Array.isArray(contents)) return contents;
  const pub = creatorPublicId(email);
  return contents.map((c) => {
    if (!c || typeof c !== "object") return c;
    const row = c as Record<string, unknown>;
    if (typeof row.pdfPath === "string") {
      return { ...row, pdfPath: rewriteStorageOwner(row.pdfPath, email, pub) };
    }
    return row;
  });
}

export function storagePathFromPublic(path: string, email: string): string {
  const pub = creatorPublicId(email);
  if (path.startsWith(pub + "/")) return email + path.slice(pub.length);
  return path;
}
