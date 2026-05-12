/**
 * 데이터 추상화 레이어
 * - yahoo-finance2 를 통해 실시간 주가 조회 (서버 전용)
 * - 실패 시 mock 데이터로 폴백
 */

import { unstable_cache } from "next/cache";
import {
  fetchBatchQuotes,
  fetchIndex,
  fetchSparkline,
  fmtVolume,
  fmtMarketCap,
} from "./yahooFinance";

// ── Types ──────────────────────────────────────────────────────────────────

export type Quote = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sparkline: number[];
  volume: string;
  marketCap: string;
};

export type IndexQuote = {
  symbol: string;
  name: string;
  fullName: string;
  value: number;
  change: number;
  changePercent: number;
  sparkline: number[];
  isCurrency?: boolean;  // USD/KRW 같은 환율 표시용
};

export type NewsItem = {
  id: number;
  title: string;
  summary: string;
  source: string;
  time: string;
  category: string;
  categoryColor: "mint" | "red" | "blue" | "purple" | "yellow" | "orange";
};

export type Holding = {
  symbol: string;
  shares: number;
  avgCost: number;
};

export type FearGreedData = {
  value: number;        // 0–100
  label: string;        // "Extreme Fear" | "Fear" | "Neutral" | "Greed" | "Extreme Greed"
  prevWeek: number;
  prevMonth: number;
  updatedAt: string;
};

export type BuffettData = {
  ratio:       number;  // 실제 % (예: 195)
  marketCap:   string;  // 미국 전체 시총 (표시용)
  gdp:         string;  // 미국 GDP (표시용)
  prevQuarter: number;  // 전 분기 ratio
  prevYear:    number;  // 전년 동기 ratio
  updatedAt:   string;
};

export type FutureItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  group: string;
};

// ── Mock Data ──────────────────────────────────────────────────────────────

const mockIndices: IndexQuote[] = [
  {
    symbol: "SPX",
    name: "S&P 500",
    fullName: "S&P 500 Index",
    value: 5308.13,
    change: 23.45,
    changePercent: 0.44,
    sparkline: [5260, 5272, 5268, 5280, 5291, 5285, 5298, 5305, 5308],
  },
  {
    symbol: "COMP",
    name: "NASDAQ",
    fullName: "NASDAQ Composite",
    value: 16742.39,
    change: -48.12,
    changePercent: -0.29,
    sparkline: [16820, 16800, 16810, 16790, 16770, 16760, 16755, 16748, 16742],
  },
  {
    symbol: "DJI",
    name: "DOW",
    fullName: "Dow Jones Industrial",
    value: 39512.84,
    change: 134.21,
    changePercent: 0.34,
    sparkline: [39340, 39360, 39380, 39400, 39420, 39450, 39480, 39500, 39512],
  },
  {
    symbol: "USDKRW",
    name: "원달러",
    fullName: "USD/KRW 환율",
    value: 1372.50,
    change: -3.50,
    changePercent: -0.25,
    sparkline: [1382, 1380, 1378, 1376, 1375, 1374, 1373, 1372, 1372],
    isCurrency: true,
  },
];

const mockQuotes: Quote[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 189.3,
    change: 2.14,
    changePercent: 1.14,
    sparkline: [185, 186, 184, 187, 188, 187, 189, 190, 189],
    volume: "58.3M",
    marketCap: "2.92T",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 875.4,
    change: 18.72,
    changePercent: 2.18,
    sparkline: [840, 848, 852, 860, 858, 865, 870, 872, 875],
    volume: "41.2M",
    marketCap: "2.15T",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 174.12,
    change: -3.88,
    changePercent: -2.18,
    sparkline: [182, 180, 178, 179, 176, 175, 174, 173, 174],
    volume: "102.7M",
    marketCap: "554.8B",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 415.32,
    change: 4.21,
    changePercent: 1.02,
    sparkline: [408, 410, 411, 412, 413, 414, 414, 415, 415],
    volume: "22.1M",
    marketCap: "3.08T",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 182.54,
    change: 1.83,
    changePercent: 1.01,
    sparkline: [178, 179, 180, 180, 181, 181, 182, 183, 182],
    volume: "35.8M",
    marketCap: "1.90T",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 174.49,
    change: -1.22,
    changePercent: -0.69,
    sparkline: [177, 176, 176, 175, 175, 174, 175, 175, 174],
    volume: "24.4M",
    marketCap: "2.17T",
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    price: 499.2,
    change: 8.44,
    changePercent: 1.72,
    sparkline: [485, 488, 490, 492, 494, 496, 497, 498, 499],
    volume: "16.9M",
    marketCap: "1.28T",
  },
  {
    symbol: "NFLX",
    name: "Netflix Inc.",
    price: 627.18,
    change: -5.31,
    changePercent: -0.84,
    sparkline: [635, 633, 631, 630, 629, 629, 628, 627, 627],
    volume: "4.8M",
    marketCap: "271.4B",
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Dev.",
    price: 162.3,
    change: 3.45,
    changePercent: 2.17,
    sparkline: [155, 156, 157, 158, 159, 160, 161, 162, 162],
    volume: "38.1M",
    marketCap: "262.1B",
  },
  {
    symbol: "ORCL",
    name: "Oracle Corp.",
    price: 124.89,
    change: -0.88,
    changePercent: -0.70,
    sparkline: [127, 126, 126, 125, 125, 125, 124, 125, 124],
    volume: "8.2M",
    marketCap: "342.5B",
  },
  // ── Investus 추천 종목 ──
  {
    symbol: "PLTR",
    name: "Palantir Technologies",
    price: 28.46,
    change: 0.93,
    changePercent: 3.38,
    sparkline: [25, 25.8, 26.4, 27.1, 27.5, 27.9, 28.1, 28.3, 28.46],
    volume: "76.2M",
    marketCap: "61.4B",
  },
  {
    symbol: "IBM",
    name: "IBM Corp.",
    price: 172.54,
    change: -1.12,
    changePercent: -0.65,
    sparkline: [175, 174.5, 174, 173.8, 173.5, 173.1, 172.9, 172.7, 172.54],
    volume: "3.9M",
    marketCap: "157.2B",
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase",
    price: 201.38,
    change: 2.54,
    changePercent: 1.28,
    sparkline: [196, 197, 198, 198.5, 199.2, 200, 200.6, 201, 201.38],
    volume: "9.1M",
    marketCap: "578.4B",
  },
];

const RECOMMENDED_SYMBOLS = ["GOOGL", "TSLA", "PLTR", "IBM", "JPM"];

const mockFearGreed: FearGreedData = {
  value: 62,
  label: "Greed",
  prevWeek: 48,
  prevMonth: 71,
  updatedAt: "2025-05-11",
};

const mockBuffett: BuffettData = {
  ratio:       195,
  marketCap:   "~$55.4T",
  gdp:         "~$28.4T",
  prevQuarter: 182,
  prevYear:    168,
  updatedAt:   "2025 Q1",
};

const mockFutures: FutureItem[] = [
  // 지수
  { symbol: "ES", name: "S&P 500 선물", price: 5298.5, change: 12.25, changePercent: 0.23, group: "지수" },
  { symbol: "NQ", name: "나스닥 100 선물", price: 18412.0, change: -52.0, changePercent: -0.28, group: "지수" },
  { symbol: "YM", name: "다우존스 선물", price: 39380.0, change: 95.0, changePercent: 0.24, group: "지수" },
  { symbol: "RTY", name: "러셀 2000 선물", price: 2041.3, change: 8.4, changePercent: 0.41, group: "지수" },
  // 에너지
  { symbol: "CL", name: "WTI 원유 선물", price: 78.42, change: -0.68, changePercent: -0.86, group: "에너지" },
  { symbol: "NG", name: "천연가스 선물", price: 2.184, change: 0.027, changePercent: 1.25, group: "에너지" },
  { symbol: "RB", name: "RBOB 가솔린 선물", price: 2.432, change: -0.011, changePercent: -0.45, group: "에너지" },
  // 금속
  { symbol: "GC", name: "금 선물 (Gold)", price: 2342.8, change: 15.2, changePercent: 0.65, group: "금속" },
  { symbol: "SI", name: "은 선물 (Silver)", price: 28.14, change: 0.34, changePercent: 1.22, group: "금속" },
  { symbol: "HG", name: "구리 선물 (Copper)", price: 4.562, change: -0.015, changePercent: -0.33, group: "금속" },
  // 채권
  { symbol: "ZN", name: "미국채 10년물 선물", price: 108.94, change: -0.09, changePercent: -0.08, group: "채권" },
  { symbol: "ZB", name: "미국채 30년물 선물", price: 117.22, change: -0.17, changePercent: -0.14, group: "채권" },
  // 외환
  { symbol: "6E", name: "유로/달러 선물", price: 1.0812, change: 0.0013, changePercent: 0.12, group: "외환" },
  { symbol: "6J", name: "달러/엔 선물", price: 155.48, change: -0.52, changePercent: -0.33, group: "외환" },
  // 농산물
  { symbol: "ZC", name: "옥수수 선물 (Corn)", price: 461.25, change: 4.0, changePercent: 0.87, group: "농산물" },
  { symbol: "ZW", name: "밀 선물 (Wheat)", price: 582.5, change: -7.25, changePercent: -1.23, group: "농산물" },
  { symbol: "ZS",  name: "대두 선물 (Soybeans)", price: 1178.0,  change:  5.25, changePercent:  0.45, group: "농산물"  },
  // 암호화폐
  { symbol: "BTC", name: "비트코인",             price: 62850.0, change: 1240.0, changePercent:  2.01, group: "암호화폐" },
  { symbol: "ETH", name: "이더리움",             price:  3124.0, change:   64.5, changePercent:  2.11, group: "암호화폐" },
];

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "Fed, 인플레이션 우려 속 금리 인하 신중론 재확인",
    summary: "6월 금리 인하 가능성 낮아져, 2% 목표 달성까지 인내 필요 시사.",
    source: "Reuters",
    time: "2시간 전",
    category: "거시경제",
    categoryColor: "blue",
  },
  {
    id: 2,
    title: "엔비디아, AI 칩 수요 급증으로 1분기 실적 대폭 상회",
    summary: "데이터센터 매출 최고치 경신, 블랙웰 GPU 수요 폭발적 증가.",
    source: "Bloomberg",
    time: "3시간 전",
    category: "실적",
    categoryColor: "mint",
  },
  {
    id: 3,
    title: "애플, 아이폰 17에 대규모 온디바이스 AI 기능 탑재 예정",
    summary: "온디바이스 AI 기능 탑재로 아이폰 17 슈퍼사이클 기대감 고조.",
    source: "WSJ",
    time: "5시간 전",
    category: "기술",
    categoryColor: "purple",
  },
  {
    id: 4,
    title: "테슬라, EV 경쟁 심화로 1분기 인도량 예상치 하회",
    summary: "가격 경쟁 심화 및 중국 내 판매 둔화가 주요 원인으로 지목.",
    source: "CNBC",
    time: "6시간 전",
    category: "자동차",
    categoryColor: "red",
  },
  {
    id: 5,
    title: "S&P 500, 빅테크 랠리에 힘입어 사상 최고가 경신",
    summary: "AI 투자 확대 기대감과 실적 호조가 지수를 새 고점으로 이끌어.",
    source: "MarketWatch",
    time: "8시간 전",
    category: "시장",
    categoryColor: "yellow",
  },
  {
    id: 6,
    title: "버크셔 해서웨이, 현금 보유액 사상 최대 $1,890억 기록",
    summary: "밸류에이션 부담 고조로 마땅한 인수 대상 없다며 현금 유지.",
    source: "Fortune",
    time: "10시간 전",
    category: "투자",
    categoryColor: "orange",
  },
];

// ── API Functions ──────────────────────────────────────────────────────────
// To enable Alpha Vantage: set ALPHA_VANTAGE_API_KEY in .env.local
// and uncomment the fetch blocks below.

// Yahoo Finance 심볼 매핑 (지수)
const INDEX_MAP: { yahoo: string; symbol: string; name: string; fullName: string; isCurrency?: boolean }[] = [
  { yahoo: "^GSPC",    symbol: "SPX",    name: "S&P 500", fullName: "S&P 500 Index" },
  { yahoo: "^IXIC",    symbol: "COMP",   name: "NASDAQ",  fullName: "NASDAQ Composite" },
  { yahoo: "^DJI",     symbol: "DJI",    name: "DOW",     fullName: "Dow Jones Industrial" },
  { yahoo: "USDKRW=X", symbol: "USDKRW", name: "원달러",  fullName: "USD/KRW 환율", isCurrency: true },
];

const ALL_QUOTE_SYMBOLS = mockQuotes.map((q) => q.symbol);

// 5분 캐시 (서버 컴포넌트 전용)
const _fetchLiveIndices = unstable_cache(
  async (): Promise<IndexQuote[]> => {
    const results = await Promise.allSettled(
      INDEX_MAP.map(async (m) => {
        const [q, spark] = await Promise.all([
          fetchIndex(m.yahoo),
          fetchSparkline(m.yahoo).catch(() => [] as number[]),
        ]);
        if (!q) return null;
        const idx: IndexQuote = {
          symbol: m.symbol,
          name: m.name,
          fullName: m.fullName,
          value: q.price,
          change: q.change,
          changePercent: q.changePercent,
          sparkline: spark,
        };
        if (m.isCurrency) idx.isCurrency = true;
        return idx;
      })
    );
    const live = results
      .filter((r): r is PromiseFulfilledResult<IndexQuote | null> => r.status === "fulfilled")
      .map((r) => r.value)
      .filter((v): v is IndexQuote => v !== null);
    return live.length > 0 ? live : mockIndices;
  },
  ["yf-indices"],
  { revalidate: 300 }
);

const _fetchLiveQuotes = unstable_cache(
  async (): Promise<Quote[]> => {
    const live = await fetchBatchQuotes(ALL_QUOTE_SYMBOLS);
    if (live.length === 0) return mockQuotes;

    const sparkMap = new Map<string, number[]>();
    await Promise.allSettled(
      ALL_QUOTE_SYMBOLS.map(async (sym) => {
        const s = await fetchSparkline(sym).catch(() => [] as number[]);
        if (s.length > 0) sparkMap.set(sym, s);
      })
    );

    return live.map((q) => {
      const mock = mockQuotes.find((m) => m.symbol === q.symbol);
      return {
        symbol: q.symbol,
        name: q.shortName,
        price: q.price,
        change: q.change,
        changePercent: q.changePercent,
        sparkline: sparkMap.get(q.symbol) ?? mock?.sparkline ?? [],
        volume: fmtVolume(q.volume),
        marketCap: fmtMarketCap(q.marketCap),
      } satisfies Quote;
    });
  },
  ["yf-quotes"],
  { revalidate: 300 }
);

export async function getIndices(): Promise<IndexQuote[]> {
  try {
    return await _fetchLiveIndices();
  } catch {
    return mockIndices;
  }
}

export async function getQuotes(symbols?: string[]): Promise<Quote[]> {
  try {
    const all = await _fetchLiveQuotes();
    if (symbols) return all.filter((q) => symbols.includes(q.symbol));
    return all;
  } catch {
    if (symbols) return mockQuotes.filter((q) => symbols.includes(q.symbol));
    return mockQuotes;
  }
}

export async function getQuote(symbol: string): Promise<Quote | null> {
  const quotes = await getQuotes([symbol]);
  return quotes[0] ?? null;
}

export async function searchQuotes(query: string): Promise<Quote[]> {
  const q = query.toLowerCase();
  return mockQuotes.filter(
    (s) =>
      s.symbol.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q)
  );
}

export async function getNews(): Promise<NewsItem[]> {
  return mockNews;
}

export async function getRecommendedStocks(): Promise<Quote[]> {
  return mockQuotes.filter((q) => RECOMMENDED_SYMBOLS.includes(q.symbol));
}

export async function getFearGreed(): Promise<FearGreedData> {
  return mockFearGreed;
}

export async function getFutures(): Promise<FutureItem[]> {
  return mockFutures;
}

export async function getBuffett(): Promise<BuffettData> {
  return mockBuffett;
}

export { mockQuotes };
