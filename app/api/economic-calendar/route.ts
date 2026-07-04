import { NextResponse } from "next/server";

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

function getWeekBounds(weekOffset: number): { from: string; to: string } {
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1) + weekOffset * 7);
  monday.setHours(0, 0, 0, 0);
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);
  return {
    from: monday.toISOString().split("T")[0],
    to:   friday.toISOString().split("T")[0],
  };
}

export async function GET(req: Request) {
  const key = process.env.FINNHUB_API_KEY ?? "";
  if (!key) return NextResponse.json({ error: "no_key" }, { status: 503 });

  const { searchParams } = new URL(req.url);
  const weekOffset = parseInt(searchParams.get("week") ?? "0");
  const { from, to } = getWeekBounds(weekOffset);

  const [ecoRes, earnRes] = await Promise.allSettled([
    fetch(
      `https://finnhub.io/api/v1/calendar/economic?from=${from}&to=${to}&token=${key}`,
      { signal: AbortSignal.timeout(8000) },
    ),
    fetch(
      `https://finnhub.io/api/v1/calendar/earnings?from=${from}&to=${to}&token=${key}`,
      { signal: AbortSignal.timeout(8000) },
    ),
  ]);

  let economicEvents: EconomicEvent[] = [];
  let earningsEvents: EarningsEvent[] = [];

  if (ecoRes.status === "fulfilled" && ecoRes.value.ok) {
    const data = await ecoRes.value.json() as { economicCalendar?: EconomicEvent[] };
    economicEvents = (data.economicCalendar ?? []).filter((e) => e.country === "US");
  }

  if (earnRes.status === "fulfilled" && earnRes.value.ok) {
    const data = await earnRes.value.json() as { earningsCalendar?: EarningsEvent[] };
    earningsEvents = (data.earningsCalendar ?? []).filter((e) => MAJOR_SYMBOLS.has(e.symbol));
  }

  return NextResponse.json(
    { from, to, economicEvents, earningsEvents },
    { headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" } },
  );
}
