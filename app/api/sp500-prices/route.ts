import { NextResponse } from "next/server";
import { fetchBatchQuotes } from "@/lib/yahooFinance";
import { kvGetDetail } from "@/lib/kv";
import { isMarketOpen, isEodCacheFresh } from "@/lib/marketHours";

export const dynamic = "force-dynamic";
export const maxDuration = 20;

const KV_MARKET_KEY = "market-data:v3";

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

type SectorResult = {
  isLive: boolean;
  liveAt: number;
  sectors: { key: string; name: string; stocks: { symbol: string; name: string; price: number | null; changePercent: number | null; weight: number }[] }[];
};
let _cached: { data: SectorResult; at: number } | null = null;

function buildSectors(
  priceMap: Record<string, number>,
  changeMap: Record<string, number | null>,
  isLive: boolean,
  liveAt: number,
): SectorResult {
  return {
    isLive,
    liveAt,
    sectors: SECTORS.map((s) => ({
      key:    s.key,
      name:   s.name,
      stocks: s.stocks.map((t) => ({
        symbol:        t.symbol,
        name:          t.name,
        price:         priceMap[t.symbol]  ?? null,
        changePercent: changeMap[t.symbol] ?? null,
        weight:        t.weight,
      })),
    })),
  };
}

export async function GET() {
  const open = isMarketOpen();
  const TTL  = open ? 60_000 : 30 * 60_000;
  const cc   = open
    ? "public, s-maxage=55, stale-while-revalidate=120"
    : "public, s-maxage=1800, stale-while-revalidate=86400";

  // Serve from in-memory cache if fresh (장마감 후에는 EOD 이후 갱신분만)
  if (_cached && Date.now() - _cached.at < TTL) {
    const dataLiveAt = _cached.data.liveAt || _cached.at;
    if (open ? Date.now() - dataLiveAt < 55_000 : isEodCacheFresh(dataLiveAt)) {
      return NextResponse.json(_cached.data, { headers: { "Cache-Control": cc } });
    }
  }

  const allSymbols = SECTORS.flatMap((s) => s.stocks.map((t) => t.symbol));
  const changeMap: Record<string, number | null> = {};
  const priceMap:  Record<string, number> = {};
  let isLive = false;
  let liveAt = 0;

  // 1) market-data KV와 동일 소스 우선 (추천주·인기종목과 숫자 일치)
  try {
    const kvRaw = await kvGetDetail(KV_MARKET_KEY) as {
      quotes?: { symbol: string; price: number; changePercent: number }[];
      liveAt?: number;
    } | null;
    const kvLiveAt = kvRaw?.liveAt ?? 0;
    const kvFresh = kvLiveAt > 0 && (open
      ? Date.now() - kvLiveAt < 55_000
      : isEodCacheFresh(kvLiveAt));
    if (kvFresh && kvRaw?.quotes?.length) {
      liveAt = kvLiveAt;
      isLive = true;
      for (const q of kvRaw.quotes) {
        if (allSymbols.includes(q.symbol) && q.price > 0) {
          priceMap[q.symbol] = q.price;
          changeMap[q.symbol] = q.changePercent;
        }
      }
    }
  } catch { /* ignore */ }

  const missing = allSymbols.filter((s) => !priceMap[s]);

  try {
    if (missing.length > 0) {
      const mid = Math.ceil(missing.length / 2);
      const [a, b] = await Promise.all([
        fetchBatchQuotes(missing.slice(0, mid)),
        fetchBatchQuotes(missing.slice(mid)),
      ]);
      const yfQuotes = [...a, ...b];
      if (yfQuotes.length > 0) {
        if (!liveAt) liveAt = Date.now();
        isLive = true;
        for (const q of yfQuotes) {
          if (q.price > 0) {
            changeMap[q.symbol] = q.changePercent;
            priceMap[q.symbol]  = q.price;
          }
        }
      }
    }
  } catch { /* fall through — isLive stays false */ }

  if (!liveAt && Object.keys(priceMap).length > 0) liveAt = Date.now();

  const result: SectorResult = buildSectors(priceMap, changeMap, isLive, liveAt);
  _cached = { data: result, at: Date.now() };

  return NextResponse.json(result, { headers: { "Cache-Control": cc } });
}
