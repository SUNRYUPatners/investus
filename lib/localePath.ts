import type { Locale } from "./i18n";

/** Prefix a site-relative path with `/ko` when the UI locale is Korean. */
export function localePath(path: string, locale: Locale): string {
  if (locale !== "ko") return path || "/";
  if (!path || path === "/") return "/ko";
  if (path === "/ko" || path.startsWith("/ko/")) return path;
  return path.startsWith("/") ? `/ko${path}` : `/ko/${path}`;
}
