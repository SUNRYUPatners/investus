import type { MarketId } from "./types";

export type MarketSymbol = {
  symbol: string;
  name: string;
  yahoo?: string;
};

export type MarketConfig = {
  id: MarketId;
  emoji: string;
  labelKo: string;
  labelEn: string;
  tagline: string;
  timezone: string;
  clockLabel: string;
  portfolioKey: string;
  watchlistKey: string;
  marketCacheKey: string;
  recommended: MarketSymbol[];
  popular: MarketSymbol[];
  indices: MarketSymbol[];
  newsQuery: string;
  newsHl: string;
  newsGl: string;
  sentiment: "us-fg" | "kr-fear" | "crypto-fg" | "policy" | "none";
  heatmap: "sp500" | "kospi" | "safe6" | "safe10" | "region";
  openHours: { startMin: number; endMin: number };
};

export const KR_TOP10: MarketSymbol[] = [
  { symbol: "005930.KS", name: "삼성전자" },
  { symbol: "000660.KS", name: "SK하이닉스" },
  { symbol: "373220.KS", name: "LG에너지솔루션" },
  { symbol: "207940.KS", name: "삼성바이오로직스" },
  { symbol: "005380.KS", name: "현대차" },
  { symbol: "000270.KS", name: "기아" },
  { symbol: "068270.KS", name: "셀트리온" },
  { symbol: "105560.KS", name: "KB금융" },
  { symbol: "055550.KS", name: "신한지주" },
  { symbol: "035420.KS", name: "NAVER" },
];

/** @deprecated use KR_TOP10 */
export const KR_TOP7 = KR_TOP10;

export const KR_HEATMAP: MarketSymbol[] = [
  ...KR_TOP10,
  { symbol: "005490.KS", name: "POSCO홀딩스" },
  { symbol: "035720.KS", name: "카카오" },
  { symbol: "006400.KS", name: "삼성SDI" },
  { symbol: "051910.KS", name: "LG화학" },
  { symbol: "028260.KS", name: "삼성물산" },
  { symbol: "012330.KS", name: "현대모비스" },
  { symbol: "066570.KS", name: "LG전자" },
  { symbol: "003550.KS", name: "LG" },
  { symbol: "032830.KS", name: "삼성생명" },
  { symbol: "086790.KS", name: "하나금융지주" },
  { symbol: "017670.KS", name: "SK텔레콤" },
  { symbol: "030200.KS", name: "KT" },
  { symbol: "034730.KS", name: "SK" },
  { symbol: "009150.KS", name: "삼성전기" },
  { symbol: "018260.KS", name: "삼성에스디에스" },
  { symbol: "003670.KS", name: "포스코퓨처엠" },
  { symbol: "096770.KS", name: "SK이노베이션" },
  { symbol: "010950.KS", name: "S-Oil" },
  { symbol: "011200.KS", name: "HMM" },
  { symbol: "259960.KS", name: "크래프톤" },
];

/** 가상화폐 탑5 */
export const SAFE_CRYPTO_TOP5: MarketSymbol[] = [
  { symbol: "BTC-USD", name: "비트코인" },
  { symbol: "ETH-USD", name: "이더리움" },
  { symbol: "SOL-USD", name: "솔라나" },
  { symbol: "XRP-USD", name: "리플" },
  { symbol: "BNB-USD", name: "BNB" },
];

/** 현물·원자재 탑5 */
export const SAFE_PHYSICAL_TOP5: MarketSymbol[] = [
  { symbol: "GC=F", name: "금" },
  { symbol: "SI=F", name: "은" },
  { symbol: "HG=F", name: "구리" },
  { symbol: "PL=F", name: "백금" },
  { symbol: "CL=F", name: "WTI원유" },
];

export const SAFE_ASSETS: MarketSymbol[] = [...SAFE_CRYPTO_TOP5, ...SAFE_PHYSICAL_TOP5];

export const MARKET_CONFIG: Record<MarketId, MarketConfig> = {
  us: {
    id: "us",
    emoji: "🇺🇸",
    labelKo: "미국주식",
    labelEn: "US Stocks",
    tagline: "실시간 미국주식",
    timezone: "America/New_York",
    clockLabel: "EST",
    portfolioKey: "investus-portfolio",
    watchlistKey: "investus-watchlist",
    marketCacheKey: "market-data-cache",
    recommended: [
      { symbol: "TSLA", name: "Tesla" },
      { symbol: "SPCX", name: "SpaceX" },
      { symbol: "IBM", name: "IBM" },
      { symbol: "JPM", name: "JPMorgan" },
    ],
    popular: [
      { symbol: "AAPL", name: "Apple" },
      { symbol: "NVDA", name: "NVIDIA" },
      { symbol: "MSFT", name: "Microsoft" },
      { symbol: "AMZN", name: "Amazon" },
      { symbol: "META", name: "Meta" },
      { symbol: "GOOGL", name: "Alphabet" },
      { symbol: "AMD", name: "AMD" },
    ],
    indices: [
      { symbol: "^GSPC", name: "S&P 500" },
      { symbol: "^IXIC", name: "NASDAQ" },
      { symbol: "^DJI", name: "Dow Jones" },
    ],
    newsQuery: "",
    newsHl: "en",
    newsGl: "US",
    sentiment: "us-fg",
    heatmap: "sp500",
    openHours: { startMin: 9 * 60 + 30, endMin: 16 * 60 },
  },
  kr: {
    id: "kr",
    emoji: "🇰🇷",
    labelKo: "한국주식",
    labelEn: "KR Stocks",
    tagline: "실시간 한국주식",
    timezone: "Asia/Seoul",
    clockLabel: "KST",
    portfolioKey: "investus-portfolio-kr",
    watchlistKey: "investus-watchlist-kr",
    marketCacheKey: "market-data-cache-kr-v2",
    recommended: KR_TOP10.slice(0, 4),
    popular: KR_TOP10,
    indices: [
      { symbol: "^KS11", name: "코스피" },
      { symbol: "^KQ11", name: "코스닥" },
    ],
    newsQuery: "코스피 OR 삼성전자 OR SK하이닉스 OR 현대차 OR 한국증시",
    newsHl: "ko",
    newsGl: "KR",
    sentiment: "kr-fear",
    heatmap: "kospi",
    openHours: { startMin: 9 * 60, endMin: 15 * 60 + 30 },
  },
  safe: {
    id: "safe",
    emoji: "🪙",
    labelKo: "안전자산",
    labelEn: "Safe Assets",
    tagline: "비트코인 · 금 · 은",
    timezone: "UTC",
    clockLabel: "UTC",
    portfolioKey: "investus-portfolio-safe",
    watchlistKey: "investus-watchlist-safe",
    marketCacheKey: "market-data-cache-safe-v2",
    recommended: [...SAFE_CRYPTO_TOP5.slice(0, 3), ...SAFE_PHYSICAL_TOP5.slice(0, 2)],
    popular: SAFE_ASSETS,
    indices: [
      { symbol: "BTC-USD", name: "비트코인" },
      { symbol: "ETH-USD", name: "이더리움" },
      { symbol: "GC=F", name: "금" },
    ],
    newsQuery: "비트코인 OR 이더리움 OR 금값 OR 은값 OR 암호화폐 OR 현물금",
    newsHl: "ko",
    newsGl: "KR",
    sentiment: "none",
    heatmap: "safe10",
    openHours: { startMin: 0, endMin: 24 * 60 },
  },
  "kr-re": {
    id: "kr-re",
    emoji: "🏠",
    labelKo: "한국부동산",
    labelEn: "KR Real Estate",
    tagline: "매매 · 전세 · 정책",
    timezone: "Asia/Seoul",
    clockLabel: "KST",
    portfolioKey: "investus-portfolio-kr-re",
    watchlistKey: "investus-watchlist-kr-re",
    marketCacheKey: "market-data-cache-kr-re",
    recommended: [
      { symbol: "SEOUL-SALE", name: "서울 매매" },
      { symbol: "SEOUL-JEONSE", name: "서울 전세" },
      { symbol: "CAPITAL-SALE", name: "수도권 매매" },
      { symbol: "POLICY", name: "정책 모멘텀" },
    ],
    popular: [
      { symbol: "SEOUL-SALE", name: "서울 매매" },
      { symbol: "SEOUL-JEONSE", name: "서울 전세" },
      { symbol: "GYEONGGI-SALE", name: "경기 매매" },
      { symbol: "INCHEON-SALE", name: "인천 매매" },
      { symbol: "BUSAN-SALE", name: "부산 매매" },
      { symbol: "DAEGU-SALE", name: "대구 매매" },
    ],
    indices: [
      { symbol: "KB-SALE", name: "KB매매지수" },
      { symbol: "KB-JEONSE", name: "KB전세지수" },
      { symbol: "POLICY", name: "정책지수" },
    ],
    newsQuery: "부동산 정책 OR 전세 OR 주택공급 OR 국토부 OR 부동산 규제",
    newsHl: "ko",
    newsGl: "KR",
    sentiment: "policy",
    heatmap: "region",
    openHours: { startMin: 9 * 60, endMin: 18 * 60 },
  },
};

export function getMarketConfig(id: MarketId): MarketConfig {
  return MARKET_CONFIG[id];
}
