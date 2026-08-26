"use client";

import { notFound } from "next/navigation";
import SearchPage from "@/app/search/page";
import { isMarketId } from "@/lib/markets/types";
import { use } from "react";

/** 본사이트 검색 페이지 그대로 — 내용은 useMarket()으로만 분기 */
export default function PreviewSearchPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market: raw } = use(params);
  if (!isMarketId(raw)) notFound();
  return <SearchPage />;
}
