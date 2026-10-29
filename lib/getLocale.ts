import { cookies, headers } from "next/headers";
import type { Locale } from "@/lib/i18n";

export async function getLocale(): Promise<Locale> {
  const hdrs = await headers();

  // 0. URL-based locale (highest priority) — set by proxy.ts for /ko/* and
  //    /news/*. This makes <html lang> and server content match the URL.
  const urlLocale = hdrs.get("x-url-locale");
  if (urlLocale === "ko") return "ko";
  if (urlLocale === "en") return "en";

  const jar = await cookies();
  const cookieVal = jar.get("locale")?.value;

  // 1. Explicit user preference via cookie
  if (cookieVal === "ko") return "ko";
  if (cookieVal === "en") return "en";

  // 2. Browser Accept-Language — Korean browser → Korean (English default otherwise).
  //    We intentionally do NOT force Korean by IP country anymore; English is the default.
  const acceptLang = hdrs.get("accept-language") ?? "";
  if (/\bko\b/i.test(acceptLang.split(",")[0])) return "ko";

  // 3. Default: English
  return "en";
}
