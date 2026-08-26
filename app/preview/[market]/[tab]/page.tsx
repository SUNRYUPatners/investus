import { redirect } from "next/navigation";
import { marketHref } from "@/lib/markets/marketPath";
import { isMarketId, type MarketId } from "@/lib/markets/types";

export default async function PreviewMarketTabRedirect({
  params,
}: {
  params: Promise<{ market: string; tab: string }>;
}) {
  const { market: raw, tab } = await params;
  if (!isMarketId(raw)) redirect("/");
  const allowed = ["search", "portfolio", "wall", "insight", "more"] as const;
  if (!(allowed as readonly string[]).includes(tab)) redirect("/");
  redirect(marketHref(raw as MarketId, tab as (typeof allowed)[number]));
}
