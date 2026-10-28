"use client";

import { ReportFeed } from "@/components/ReportFeed";
import { useMarket } from "@/contexts/MarketContext";

export function InsightReportSection() {
  const market = useMarket();

  return (
    <div>
      <ReportFeed market={market} />
    </div>
  );
}
