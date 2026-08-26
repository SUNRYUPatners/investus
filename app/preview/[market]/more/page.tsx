"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import MorePage from "@/app/more/page";
import { isMarketId } from "@/lib/markets/types";

/** 본사이트 더보기 페이지 그대로 */
export default function PreviewMorePage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market: raw } = use(params);
  if (!isMarketId(raw)) notFound();
  return <MorePage />;
}
