import type { Report } from "@/lib/reports";
import { SEED_REPORTS } from "@/lib/reports";
import { SEED_REPORTS_KR } from "@/lib/reports-kr";
import { SEED_REPORTS_SAFE } from "@/lib/reports-safe";
import { SEED_REPORTS_KR_RE } from "@/lib/reports-kr-re";
import type { MarketId } from "@/lib/markets/types";

export function getReportsForMarket(market: MarketId): Report[] {
  if (market === "kr") return SEED_REPORTS_KR;
  if (market === "safe") return SEED_REPORTS_SAFE;
  if (market === "kr-re") return SEED_REPORTS_KR_RE;
  return SEED_REPORTS;
}
