import { notFound } from "next/navigation";
import InsightPage from "@/app/insight/page";
import { isMarketId } from "@/lib/markets/types";

/** 본사이트 인사이트 페이지 그대로 — ReportFeed가 useMarket으로 내용 분기 */
export default async function PreviewInsightPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market: raw } = await params;
  if (!isMarketId(raw)) notFound();
  return <InsightPage />;
}
