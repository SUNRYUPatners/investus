import { cookies, headers } from "next/headers";
import type { Locale } from "@/lib/i18n";

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const cookieVal = jar.get("locale")?.value;

  // 1. Explicit user preference via cookie (highest priority)
  if (cookieVal === "ko") return "ko";
  if (cookieVal === "en") return "en";

  // 2. Vercel geo — Korean IP → Korean
  const hdrs = await headers();
  const country = hdrs.get("x-vercel-ip-country");
  if (country === "KR") return "ko";

  // 3. Browser Accept-Language — Korean browser → Korean
  const acceptLang = hdrs.get("accept-language") ?? "";
  if (/\bko\b/i.test(acceptLang.split(",")[0])) return "ko";

  // 4. Default: English
  return "en";
}
