"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import PortfolioPage from "@/app/portfolio/page";
import { isMarketId } from "@/lib/markets/types";

/** 본사이트 포트폴리오 페이지 그대로 */
export default function PreviewPortfolioPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market: raw } = use(params);
  if (!isMarketId(raw)) notFound();
  return <PortfolioPage />;
}
