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
import { toYahoo } from "./symbolMap";

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
  url?: string;
  image?: string;
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
  isMock?: boolean;
};

// ── Mock Data ──────────────────────────────────────────────────────────────

const mockIndices: IndexQuote[] = [
  {
    symbol: "SPX",
    name: "S&P 500",
    fullName: "S&P 500 Index",
    value: 7353.61,
    change: -49.44,
    changePercent: -0.67,
    sparkline: [7425, 7369, 7396, 7406, 7350, 7378, 7387, 7331, 7353],
  },
  {
    symbol: "COMP",
    name: "NASDAQ",
    fullName: "NASDAQ Composite",
    value: 25870.7,
    change: -220.02,
    changePercent: -0.84,
    sparkline: [26121, 25962, 26106, 26037, 25880, 26025, 25953, 25798, 25870],
  },
  {
    symbol: "DJI",
    name: "DOW",
    fullName: "Dow Jones Industrial",
    value: 50091.0,
    change: 115.0,
    changePercent: 0.23,
    sparkline: [49800, 49850, 49920, 49980, 50010, 50030, 50060, 50080, 50091],
  },
  {
    symbol: "USDKRW",
    name: "원달러",
    fullName: "USD/KRW 환율",
    value: 1506.24,
    change: 13.92,
    changePercent: 0.93,
    sparkline: [1486, 1496, 1499, 1491, 1501, 1504, 1496, 1506, 1509],
    isCurrency: true,
  },
  {
    symbol: "RTY",
    name: "Russell 2000",
    fullName: "Russell 2000 Index",
    value: 2820.5,
    change: 8.4,
    changePercent: 0.30,
    sparkline: [2790, 2795, 2800, 2805, 2808, 2812, 2815, 2818, 2820],
  },
];

const mockQuotes: Quote[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 300.23,
    change: 2.05,
    changePercent: 0.69,
    sparkline: [292, 294, 296, 297, 298, 299, 299, 300, 300],
    volume: "58.3M",
    marketCap: "4.52T",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 225.32,
    change: -1.71,
    changePercent: -0.75,
    sparkline: [229, 228, 227, 226, 226, 225, 225, 225, 225],
    volume: "144.0M",
    marketCap: "5.47T",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 422.24,
    change: 13.15,
    changePercent: 3.21,
    sparkline: [404, 408, 412, 414, 416, 418, 419, 421, 422],
    volume: "85.0M",
    marketCap: "1.36T",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 421.92,
    change: 12.68,
    changePercent: 3.10,
    sparkline: [406, 409, 412, 414, 416, 418, 419, 421, 421],
    volume: "22.1M",
    marketCap: "3.13T",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 264.14,
    change: -3.07,
    changePercent: -1.15,
    sparkline: [270, 269, 268, 267, 266, 266, 265, 264, 264],
    volume: "35.8M",
    marketCap: "2.79T",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 396.78,
    change: -4.30,
    changePercent: -1.07,
    sparkline: [404, 402, 401, 400, 399, 399, 398, 397, 396],
    volume: "24.4M",
    marketCap: "4.83T",
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    price: 614.23,
    change: -4.18,
    changePercent: -0.68,
    sparkline: [621, 620, 618, 617, 616, 616, 615, 614, 614],
    volume: "16.9M",
    marketCap: "2.20T",
  },
  {
    symbol: "NFLX",
    name: "Netflix Inc.",
    price: 88.09,
    change: -0.74,
    changePercent: -0.83,
    sparkline: [90, 89.5, 89.2, 89, 88.8, 88.6, 88.4, 88.2, 88.09],
    volume: "4.8M",
    marketCap: "37.9B",
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Dev.",
    price: 447.58,
    change: 9.72,
    changePercent: 2.22,
    sparkline: [432, 435, 438, 440, 442, 444, 445, 446, 447],
    volume: "38.1M",
    marketCap: "727.0B",
  },
  {
    symbol: "ORCL",
    name: "Oracle Corp.",
    price: 188.16,
    change: -1.31,
    changePercent: -0.69,
    sparkline: [192, 191, 190, 190, 189, 189, 188, 188, 188],
    volume: "8.2M",
    marketCap: "519.0B",
  },
  // ── Investus 추천 종목 ──
  {
    symbol: "PLTR",
    name: "Palantir Technologies",
    price: 137.15,
    change: 1.90,
    changePercent: 1.41,
    sparkline: [132, 133, 134, 135, 135, 136, 136, 137, 137],
    volume: "76.2M",
    marketCap: "314.0B",
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
    price: 301.98,
    change: 6.22,
    changePercent: 2.10,
    sparkline: [292, 294, 296, 297, 299, 299, 300, 301, 301],
    volume: "9.1M",
    marketCap: "868.0B",
  },
];

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
  { symbol: "ES",   name: "S&P 500 선물",       price:  7420.0, change:  31.0, changePercent:  0.42, group: "지수" },
  { symbol: "NQ",   name: "나스닥 100 선물",     price: 29200.0, change: 186.0, changePercent:  0.64, group: "지수" },
  { symbol: "YM",   name: "다우존스 선물",       price: 50000.0, change:  90.0, changePercent:  0.18, group: "지수" },
  { symbol: "RTY",  name: "러셀 2000 선물",      price:  2814.0, change:   7.0, changePercent:  0.25, group: "지수" },
  // 에너지
  { symbol: "CL",   name: "WTI 원유 선물",       price:    98.9, change:  0.60, changePercent:  0.61, group: "에너지" },
  { symbol: "NG",   name: "천연가스 선물",        price:   3.034, change: 0.030, changePercent:  1.00, group: "에너지" },
  { symbol: "RB",   name: "RBOB 가솔린 선물",    price:   2.850, change:-0.011, changePercent: -0.38, group: "에너지" },
  // 금속
  { symbol: "GC",   name: "금 선물 (Gold)",      price:  4547.0, change:  11.4, changePercent:  0.25, group: "금속" },
  { symbol: "SI",   name: "은 선물 (Silver)",    price:    76.0, change: -0.15, changePercent: -0.20, group: "금속" },
  { symbol: "HG",   name: "구리 선물 (Copper)",  price:   6.330, change:-0.001, changePercent: -0.01, group: "금속" },
  // 채권
  { symbol: "ZN",   name: "미국채 10년물 선물",  price: 109.360, change: -0.09, changePercent: -0.09, group: "채권" },
  { symbol: "ZB",   name: "미국채 30년물 선물",  price: 110.875, change: -0.08, changePercent: -0.08, group: "채권" },
  // 외환
  { symbol: "6E",   name: "유로/달러 선물",      price:  1.1631, change: 0.0024, changePercent: 0.21, group: "외환" },
  { symbol: "6J",   name: "달러/엔 선물",        price: 158.876, change: -0.160, changePercent:-0.10, group: "외환" },
  // 농산물
  { symbol: "ZC",   name: "옥수수 선물 (Corn)",  price:   465.8, change:   0.0, changePercent:  0.00, group: "농산물" },
  { symbol: "ZW",   name: "밀 선물 (Wheat)",     price:   661.0, change:   0.5, changePercent:  0.08, group: "농산물" },
  { symbol: "ZS",   name: "대두 선물 (Soybeans)",price:  1199.0, change:  -0.5, changePercent: -0.04, group: "농산물" },
  // 해외지수
  { symbol: "NK",   name: "닛케이 225",          price: 59804.0, change: -1007.0, changePercent: -1.66, group: "해외지수" },
  { symbol: "DAX",  name: "DAX",                 price: 24737.0, change:   341.0, changePercent:  1.40, group: "해외지수" },
  { symbol: "FTSE", name: "FTSE 100",            price: 10432.0, change:   101.0, changePercent:  0.98, group: "해외지수" },
  { symbol: "HSI",  name: "항셍",                price: 25651.0, change:   -23.0, changePercent: -0.09, group: "해외지수" },
  // 암호화폐
  { symbol: "BTC",  name: "비트코인",            price: 77620.0, change:  752.0, changePercent:  0.98, group: "암호화폐" },
  { symbol: "ETH",  name: "이더리움",            price:  2133.0, change:   21.0, changePercent:  0.99, group: "암호화폐" },
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

export const RECOMMENDED_SYMBOLS = ["GOOGL", "TSLA", "PLTR", "IBM", "JPM"];
const ALL_QUOTE_SYMBOLS = mockQuotes.map((q) => q.symbol);

export const INDEX_MAP: { yahoo: string; symbol: string; name: string; fullName: string; isCurrency?: boolean }[] = [
  { yahoo: "^GSPC",    symbol: "SPX",    name: "S&P 500",      fullName: "S&P 500 Index" },
  { yahoo: "^IXIC",    symbol: "COMP",   name: "NASDAQ",       fullName: "NASDAQ Composite" },
  { yahoo: "^DJI",     symbol: "DJI",    name: "DOW",          fullName: "Dow Jones Industrial" },
  { yahoo: "^RUT",     symbol: "RTY",    name: "Russell 2000", fullName: "Russell 2000 Index" },
  { yahoo: "USDKRW=X", symbol: "USDKRW", name: "원달러",       fullName: "USD/KRW 환율", isCurrency: true },
];
export { mockIndices, mockFutures };

// 60초 캐시 — 실패 시 null 반환(mock 캐시 방지)
const _fetchLiveIndices = unstable_cache(
  async (): Promise<IndexQuote[] | null> => {
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
    return live.length > 0 ? live : null;
  },
  ["yf-indices"],
  { revalidate: 60 }
);

const _fetchLiveQuotes = unstable_cache(
  async (): Promise<Quote[] | null> => {
    const live = await fetchBatchQuotes(ALL_QUOTE_SYMBOLS);
    if (live.length === 0) return null;

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
  { revalidate: 60 }
);

export async function getIndices(): Promise<IndexQuote[]> {
  try {
    return (await _fetchLiveIndices()) ?? mockIndices;
  } catch {
    return mockIndices;
  }
}

export async function getQuotes(symbols?: string[]): Promise<Quote[]> {
  try {
    const all = (await _fetchLiveQuotes()) ?? mockQuotes;
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

// ── Category detection from Finnhub news headline ─────────────────────────
function detectCategory(headline: string): { category: string; categoryColor: NewsItem["categoryColor"] } {
  const h = headline.toLowerCase();
  if (/\bfed\b|fomc|\brate\b|gdp|economy|inflation|cpi|macro|fiscal/.test(h)) return { category: "거시경제", categoryColor: "mint" };
  if (/earning|revenue|profit|\beps\b|quarter|guidance|forecast/.test(h))      return { category: "실적",     categoryColor: "red" };
  if (/\bai\b|artificial intelligence|\btech\b|software|\bchip\b|nvidia|semiconductor/.test(h)) return { category: "기술", categoryColor: "blue" };
  if (/\bev\b|electric vehicle|automaker|automotive|\btesla\b|\bford\b|\bgm\b|\bcar\b/.test(h)) return { category: "자동차", categoryColor: "yellow" };
  if (/\boil\b|energy|\bgas\b|crude|\bopec\b|exxon|chevron/.test(h))           return { category: "에너지",   categoryColor: "orange" };
  if (/\bbank\b|finance|crypto|bitcoin|ether|currency|forex/.test(h))          return { category: "금융",     categoryColor: "purple" };
  if (/invest|\bfund\b|portfolio|warren|buffett|\betf\b/.test(h))              return { category: "투자",     categoryColor: "orange" };
  return { category: "시장", categoryColor: "blue" };
}

function relTimeKo(unix: number): string {
  const s = Math.floor(Date.now() / 1000 - unix);
  if (s < 3600)  return `${Math.floor(s / 60)}분 전`;
  if (s < 86400) return `${Math.floor(s / 3600)}시간 전`;
  return `${Math.floor(s / 86400)}일 전`;
}

export async function getNews(): Promise<NewsItem[]> {
  try {
    const { fetchFinnhubMarketNews } = await import("./finnhub");
    const items = await fetchFinnhubMarketNews();
    if (items.length > 0) {
      const raw = items.slice(0, 20);
      const { translateHeadlines } = await import("./translate");
      const titles = await translateHeadlines(raw.map((n) => n.headline));
      return raw.map((n, i) => {
        const { category, categoryColor } = detectCategory(n.headline);
        return {
          id:            n.id || i,
          title:         titles[i] ?? n.headline,
          summary:       n.summary || "",
          source:        n.source,
          time:          relTimeKo(n.datetime),
          category,
          categoryColor,
          url:           n.url   || undefined,
          image:         n.image || undefined,
        };
      });
    }
  } catch { /* ignore */ }
  return mockNews;
}

export async function getRecommendedStocks(): Promise<Quote[]> {
  return mockQuotes.filter((q) => RECOMMENDED_SYMBOLS.includes(q.symbol));
}

export async function getFearGreed(): Promise<FearGreedData> {
  return mockFearGreed;
}

const _fetchLiveFutures = unstable_cache(
  async (): Promise<FutureItem[] | null> => {
    const yahooSymbols = mockFutures.map((f) => toYahoo(f.symbol));
    const quotes = await fetchBatchQuotes(yahooSymbols);
    if (quotes.length === 0) return null;

    const quoteMap = new Map(quotes.map((q) => [q.symbol, q]));
    const live = mockFutures.map((f) => {
      const q = quoteMap.get(toYahoo(f.symbol));
      if (!q) return f;
      return { symbol: f.symbol, name: f.name, price: q.price, change: q.change, changePercent: q.changePercent, group: f.group };
    });
    return live;
  },
  ["yf-futures"],
  { revalidate: 60 }
);

export async function getFutures(): Promise<FutureItem[]> {
  try {
    return (await _fetchLiveFutures()) ?? mockFutures;
  } catch {
    return mockFutures;
  }
}

export async function getBuffett(): Promise<BuffettData> {
  return mockBuffett;
}

export { mockQuotes };
