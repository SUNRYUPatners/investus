"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import WallPage from "@/app/wall/page";
import { isMarketId } from "@/lib/markets/types";

/** 본사이트 피드(WallPage) 레이아웃 그대로 — 내용은 useMarket() 시드로 분기 */
export default function PreviewWallPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market: raw } = use(params);
  if (!isMarketId(raw)) notFound();
  return <WallPage />;
}
