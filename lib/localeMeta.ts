import type { Metadata } from "next";
import { headers } from "next/headers";
import { getLocale } from "@/lib/getLocale";

export const SITE_BASE = "https://www.investus.kr";

export function enUrlFor(path: string): string {
  if (path === "/") return `${SITE_BASE}/`;
  return `${SITE_BASE}${path}`;
}

export function koUrlFor(path: string): string {
  if (path === "/") return `${SITE_BASE}/ko`;
  return `${SITE_BASE}/ko${path}`;
}

/**
 * Self-canonical + hreflang (en / ko / x-default) for a given logical path
 * (the path WITHOUT the /ko prefix). The canonical points at the current
 * locale's URL so the English page canonicalizes to the default path and the
 * Korean page canonicalizes to its /ko URL. Crawlers (no locale cookie) resolve
 * their locale from the URL via proxy.ts, so the canonical always matches the
 * URL they fetched.
 */
export async function localizedAlternates(path: string): Promise<Metadata["alternates"]> {
  const locale = await getLocale();
  const en = enUrlFor(path);
  const ko = koUrlFor(path);
  return {
    canonical: locale === "ko" ? ko : en,
    languages: { en, ko, "x-default": en },
  };
}

/** The logical request path (without /ko), forwarded by proxy.ts as x-pathname. */
export async function currentLogicalPath(): Promise<string> {
  const h = await headers();
  return h.get("x-pathname") || "/";
}
