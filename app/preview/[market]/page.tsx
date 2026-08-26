import { redirect } from "next/navigation";
import { marketHref } from "@/lib/markets/marketPath";
import { isMarketId, type MarketId } from "@/lib/markets/types";

/** 레거시 `/preview/*` → 본사 `/`, `/kr` 등으로 리다이렉트 */
export default async function PreviewMarketRedirect({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market: raw } = await params;
  if (raw === "gold") redirect("/preview/gold");
  if (!isMarketId(raw)) redirect("/");
  redirect(marketHref(raw as MarketId, "home"));
}
