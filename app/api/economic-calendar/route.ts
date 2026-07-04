import { NextResponse } from "next/server";
import { STATIC_US_ECO_EVENTS } from "@/lib/economicEventsStatic";

export const maxDuration = 15;

export type EconomicEvent = {
  event: string;
  country: string;
  impact: string;
  time: string;
  actual: string | null;
  estimate: string | null;
  prev: string | null;
  unit: string;
};

export type EarningsEvent = {
  symbol: string;
  date: string;
  hour: string;
  epsEstimate: number | null;
  epsActual: number | null;
  revenueEstimate: number | null;
  revenueActual: number | null;
  quarter: number;
  year: number;
};

const MAJOR_SYMBOLS = new Set([
  "AAPL","NVDA","TSLA","MSFT","AMZN","META","GOOGL","GOOG","AMD","NFLX",
  "ORCL","CRM","SHOP","UBER","LYFT","SNAP","BIDU","BABA","JNJ","UNH",
  "JPM","BAC","GS","V","MA","COIN","HOOD","PLTR","RBLX","SOFI",
  "NIO","RIVN","F","GM","PYPL","SQ","ABNB","DASH","DIS","WMT",
  "COST","TGT","HD","MCD","SBUX","NKE","LULU","XOM","CVX","OXY",
  "ENPH","FSLR","NEE","BA","CAT","GE","INTC","MU","QCOM","AVGO","ARM","SMCI",
]);

export async function GET(req: Request) {
  const key = process.env.FINNHUB_API_KEY ?? "";

  const { searchParams } = new URL(req.url);
  let from = searchParams.get("from") ?? "";
  let to   = searchParams.get("to")   ?? "";

  if (!from || !to) {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const m = now.getMonth() + 1;
    const lastDay = new Date(now.getFullYear(), m, 0).getDate();
    from = `${now.getFullYear()}-${pad(m)}-01`;
    to   = `${now.getFullYear()}-${pad(m)}-${lastDay}`;
  }

  // Economic events: always use hardcoded static list (Finnhub free tier often empty)
  const economicEvents: EconomicEvent[] = STATIC_US_ECO_EVENTS.filter(
    (e) => e.date >= from && e.date <= to,
  );

  // Earnings: Finnhub (real data, filtered to major symbols)
  let earningsEvents: EarningsEvent[] = [];
  if (key) {
    try {
      const r = await fetch(
        `https://finnhub.io/api/v1/calendar/earnings?from=${from}&to=${to}&token=${key}`,
        { signal: AbortSignal.timeout(8000) },
      );
      if (r.ok) {
        const data = await r.json() as { earningsCalendar?: EarningsEvent[] };
        earningsEvents = (data.earningsCalendar ?? []).filter((e) => MAJOR_SYMBOLS.has(e.symbol));
      }
    } catch { /* no earnings data */ }
  }

  return NextResponse.json(
    { from, to, economicEvents, earningsEvents },
    { headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" } },
  );
}
