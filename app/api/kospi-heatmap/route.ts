import { NextResponse } from "next/server";
import { fetchNaverStockQuotes, type NaverLiveQuote } from "@/lib/naverFinance";
import { kvGetDetail, kvSetDetail } from "@/lib/kv";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const KV_HEATMAP_KEY = "kospi-heatmap:eod:v1";

/** S&P500 히트맵과 동일한 섹터 타일 구조 — 코스피 대형주 */
const SECTORS: {
  key: string;
  name: string;
  stocks: { symbol: string; name: string; weight: number }[];
}[] = [
  {
    key: "SEMI",
    name: "반도체",
    stocks: [
      { symbol: "005930", name: "삼성전자", weight: 8.0 },
      { symbol: "000660", name: "SK하이닉스", weight: 6.5 },
      { symbol: "006400", name: "삼성SDI", weight: 2.0 },
      { symbol: "009150", name: "삼성전기", weight: 1.2 },
      { symbol: "000990", name: "DB하이텍", weight: 0.8 },
    ],
  },
  {
    key: "BAT",
    name: "2차전지·소재",
    stocks: [
      { symbol: "373220", name: "LG에너지솔루션", weight: 5.0 },
      { symbol: "051910", name: "LG화학", weight: 2.2 },
      { symbol: "003670", name: "포스코퓨처엠", weight: 1.5 },
      { symbol: "005490", name: "POSCO홀딩스", weight: 2.0 },
    ],
  },
  {
    key: "AUTO",
    name: "자동차",
    stocks: [
      { symbol: "005380", name: "현대차", weight: 3.5 },
      { symbol: "000270", name: "기아", weight: 2.8 },
      { symbol: "012330", name: "현대모비스", weight: 1.8 },
    ],
  },
  {
    key: "BIO",
    name: "바이오",
    stocks: [
      { symbol: "207940", name: "삼성바이오로직스", weight: 4.0 },
      { symbol: "068270", name: "셀트리온", weight: 2.5 },
    ],
  },
  {
    key: "FIN",
    name: "금융",
    stocks: [
      { symbol: "105560", name: "KB금융", weight: 2.5 },
      { symbol: "055550", name: "신한지주", weight: 2.2 },
      { symbol: "086790", name: "하나금융지주", weight: 1.5 },
      { symbol: "032830", name: "삼성생명", weight: 1.2 },
    ],
  },
  {
    key: "IT",
    name: "IT·플랫폼",
    stocks: [
      { symbol: "035420", name: "NAVER", weight: 2.8 },
      { symbol: "035720", name: "카카오", weight: 1.8 },
      { symbol: "259960", name: "크래프톤", weight: 1.2 },
      { symbol: "018260", name: "삼성에스디에스", weight: 1.0 },
    ],
  },
  {
    key: "IND",
    name: "산업·통신",
    stocks: [
      { symbol: "028260", name: "삼성물산", weight: 1.8 },
      { symbol: "066570", name: "LG전자", weight: 1.5 },
      { symbol: "017670", name: "SK텔레콤", weight: 1.2 },
      { symbol: "011200", name: "HMM", weight: 1.0 },
    ],
  },
  {
    key: "ENERGY",
    name: "에너지",
    stocks: [
      { symbol: "096770", name: "SK이노베이션", weight: 1.2 },
      { symbol: "010950", name: "S-Oil", weight: 1.0 },
      { symbol: "034730", name: "SK", weight: 1.0 },
    ],
  },
];

type HeatmapStock = { symbol: string; name: string; price: number | null; changePercent: number | null; weight: number };
type HeatmapSector = { key: string; name: string; stocks: HeatmapStock[] };

function buildSectors(map: Map<string, NaverLiveQuote>): HeatmapSector[] {
  return SECTORS.map((sec) => ({
    key: sec.key,
    name: sec.name,
    stocks: sec.stocks.map((st) => {
      const q = map.get(st.symbol) ?? map.get(`${st.symbol}.KS`);
      return {
        symbol: st.symbol,
        name: st.name,
        price: q?.price ?? null,
        changePercent: q?.changePercent ?? null,
        weight: st.weight,
      };
    }),
  }));
}

function mergeChangeFromCache(
  sectors: HeatmapSector[],
  cached: { sectors?: HeatmapSector[] },
): HeatmapSector[] {
  const pctMap = new Map<string, number>();
  for (const sec of cached.sectors ?? []) {
    for (const st of sec.stocks) {
      if (st.changePercent != null && st.changePercent !== 0) {
        pctMap.set(st.symbol, st.changePercent);
      }
    }
  }
  if (pctMap.size === 0) return sectors;

  return sectors.map((sec) => ({
    ...sec,
    stocks: sec.stocks.map((st) => {
      if (st.changePercent !== 0 && st.changePercent != null) return st;
      const cachedPct = pctMap.get(st.symbol);
      return cachedPct != null ? { ...st, changePercent: cachedPct } : st;
    }),
  }));
}

export async function GET() {
  try {
    const codes = [...new Set(SECTORS.flatMap((s) => s.stocks.map((x) => x.symbol)))];
    const map = await fetchNaverStockQuotes(codes);

    let sectors = buildSectors(map);

    const allZero = sectors.every((s) =>
      s.stocks.every((x) => x.changePercent == null || x.changePercent === 0),
    );
    if (allZero) {
      const cached = await kvGetDetail(KV_HEATMAP_KEY);
      if (cached && Array.isArray((cached as { sectors?: unknown }).sectors)) {
        sectors = mergeChangeFromCache(sectors, cached as { sectors: HeatmapSector[] });
      }
    } else {
      void kvSetDetail(KV_HEATMAP_KEY, { sectors, liveAt: Date.now() } as Record<string, unknown>);
    }

    const isPreopen = [...map.values()].some((q) => q.marketStatus === "PREOPEN");
    const isLive = sectors.some((s) => s.stocks.some((x) => x.price != null));
    const cc = isPreopen
      ? "public, s-maxage=120, stale-while-revalidate=300"
      : "public, s-maxage=55, stale-while-revalidate=60";

    return NextResponse.json(
      { isLive, isPreopen, sectors, liveAt: Date.now() },
      { headers: { "Cache-Control": cc, "X-Kospi-Preopen": isPreopen ? "1" : "0" } },
    );
  } catch {
    const cached = await kvGetDetail(KV_HEATMAP_KEY);
    if (cached && Array.isArray((cached as { sectors?: unknown }).sectors)) {
      return NextResponse.json({
        isLive: true,
        isPreopen: true,
        sectors: (cached as { sectors: HeatmapSector[] }).sectors,
        liveAt: (cached as { liveAt?: number }).liveAt ?? Date.now(),
        fromCache: true,
      });
    }
    return NextResponse.json({ isLive: false, sectors: [], liveAt: Date.now(), error: true });
  }
}
