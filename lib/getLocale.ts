import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n";

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const val = jar.get("locale")?.value;
  return val === "en" ? "en" : "ko";
}
