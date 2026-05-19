import { NextResponse } from "next/server";
import { fetchBatchQuotes } from "@/lib/yahooFinance";

// Cache 60s
export const revalidate = 60;

type SectorStock = { symbol: string; name: string; weight: number };
type SectorDef   = { key: string; name: string; stocks: SectorStock[] };

const SECTORS: SectorDef[] = [
  { key: "IT", name: "정보기술", stocks: [
    { symbol: "AAPL",  name: "Apple",      weight: 7.2 },
    { symbol: "MSFT",  name: "Microsoft",  weight: 6.8 },
    { symbol: "NVDA",  name: "NVIDIA",     weight: 5.8 },
    { symbol: "AVGO",  name: "Broadcom",   weight: 2.5 },
    { symbol: "AMD",   name: "AMD",        weight: 1.8 },
    { symbol: "ORCL",  name: "Oracle",     weight: 1.5 },
  ]},
  { key: "COMM", name: "커뮤니케이션", stocks: [
    { symbol: "META",  name: "Meta",       weight: 2.8 },
    { symbol: "GOOGL", name: "Alphabet",   weight: 2.6 },
    { symbol: "NFLX",  name: "Netflix",    weight: 0.8 },
    { symbol: "DIS",   name: "Disney",     weight: 0.7 },
  ]},
  { key: "HEALTH", name: "헬스케어", stocks: [
    { symbol: "LLY",   name: "Eli Lilly",    weight: 2.0 },
    { symbol: "UNH",   name: "UnitedHealth", weight: 1.8 },
    { symbol: "JNJ",   name: "J&J",          weight: 1.4 },
    { symbol: "ABBV",  name: "AbbVie",       weight: 1.2 },
    { symbol: "MRK",   name: "Merck",        weight: 1.0 },
  ]},
  { key: "FIN", name: "금융", stocks: [
    { symbol: "BRK-B", name: "Berkshire",  weight: 3.5 },
    { symbol: "JPM",   name: "JPMorgan",   weight: 2.2 },
    { symbol: "V",     name: "Visa",       weight: 1.9 },
    { symbol: "MA",    name: "Mastercard", weight: 1.5 },
    { symbol: "GS",    name: "Goldman",    weight: 0.8 },
  ]},
  { key: "CONS_D", name: "임의소비재", stocks: [
    { symbol: "AMZN",  name: "Amazon",    weight: 4.0 },
    { symbol: "TSLA",  name: "Tesla",     weight: 1.8 },
    { symbol: "HD",    name: "HomeDepot", weight: 1.0 },
    { symbol: "NKE",   name: "Nike",      weight: 0.6 },
  ]},
  { key: "IND", name: "산업재", stocks: [
    { symbol: "GE",    name: "GE",          weight: 1.0 },
    { symbol: "CAT",   name: "Caterpillar", weight: 0.9 },
    { symbol: "BA",    name: "Boeing",      weight: 0.7 },
    { symbol: "RTX",   name: "Raytheon",    weight: 0.7 },
  ]},
  { key: "CONS_S", name: "필수소비재", stocks: [
    { symbol: "WMT",   name: "Walmart",   weight: 1.5 },
    { symbol: "COST",  name: "Costco",    weight: 1.0 },
    { symbol: "PG",    name: "P&G",       weight: 1.0 },
    { symbol: "KO",    name: "Coca-Cola", weight: 0.9 },
  ]},
  { key: "ENERGY", name: "에너지", stocks: [
    { symbol: "XOM",   name: "ExxonMobil",     weight: 2.0 },
    { symbol: "CVX",   name: "Chevron",        weight: 1.4 },
    { symbol: "COP",   name: "ConocoPhillips", weight: 0.7 },
  ]},
  { key: "MAT", name: "소재", stocks: [
    { symbol: "LIN",   name: "Linde",        weight: 0.8 },
    { symbol: "APD",   name: "Air Products", weight: 0.4 },
  ]},
  { key: "UTIL", name: "유틸리티", stocks: [
    { symbol: "NEE",   name: "NextEra", weight: 0.8 },
    { symbol: "DUK",   name: "Duke",    weight: 0.4 },
  ]},
  { key: "REIT", name: "부동산", stocks: [
    { symbol: "AMT",   name: "American Tower", weight: 0.6 },
    { symbol: "PLD",   name: "Prologis",       weight: 0.5 },
  ]},
];

const MOCK_CHANGES: Record<string, number> = {
  AAPL: 1.14,  MSFT: 1.02,  NVDA: 2.18, AVGO: 0.85,  AMD: 2.17,  ORCL: -0.70,
  META: 1.72,  GOOGL: -0.69, NFLX: -0.84, DIS: -1.20,
  LLY: 0.95,   UNH: 0.42,  JNJ: -0.28,  ABBV: 0.63,  MRK: -0.15,
  "BRK-B": 0.78, JPM: 1.28, V: 0.55,    MA: 0.62,    GS: 1.05,
  AMZN: 1.01,  TSLA: -2.18, HD: 0.35,   NKE: -0.92,
  GE: 1.45,    CAT: 0.72,  BA: -1.34,   RTX: 0.48,
  WMT: 0.38,   COST: 0.91, PG: 0.18,    KO: 0.12,
  XOM: -0.52,  CVX: -0.38, COP: -0.75,
  LIN: 0.35,   APD: 0.22,
  NEE: -0.44,  DUK: 0.15,
  AMT: -0.88,  PLD: 0.42,
};

export async function GET() {
  const allSymbols = SECTORS.flatMap((s) => s.stocks.map((t) => t.symbol));
  const changeMap: Record<string, number> = { ...MOCK_CHANGES };
  const priceMap:  Record<string, number> = {};
  let isLive = false;

  try {
    const yfQuotes = await fetchBatchQuotes(allSymbols);
    if (yfQuotes.length > 0) {
      isLive = true;
      for (const q of yfQuotes) {
        if (q.price > 0) {
          changeMap[q.symbol] = q.changePercent;
          priceMap[q.symbol]  = q.price;
        }
      }
    }
  } catch {
    // keep mock fallback
  }

  return NextResponse.json({
    isLive,
    sectors: SECTORS.map((s) => ({
      key: s.key,
      name: s.name,
      stocks: s.stocks.map((t) => ({
        symbol:        t.symbol,
        name:          t.name,
        price:         priceMap[t.symbol]  ?? null,
        changePercent: changeMap[t.symbol] ?? 0,
        weight:        t.weight,
      })),
    })),
  });
}
