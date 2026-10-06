import type { MarketId } from "@/lib/markets/types";

/** 공개 예시용 미국 보유. 1주 미만 잔량은 예시에서 뺀다. */
export const EXAMPLE_US_HOLDINGS: {
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
}[] = [
  { symbol: "TSLA", name: "테슬라", shares: 342.5617, avgCost: 255.51 },
  { symbol: "SPCX", name: "스페이스X", shares: 73, avgCost: 150.63 },
  { symbol: "IBM", name: "IBM", shares: 5.514, avgCost: 137.33 },
];

export const EXAMPLE_MARKET_ROWS: Record<
  Exclude<MarketId, "us">,
  { symbol: string; name: string }[]
> = {
  kr: [
    { symbol: "005930.KS", name: "삼성전자" },
    { symbol: "000660.KS", name: "SK하이닉스" },
    { symbol: "373220.KS", name: "LG에너지솔루션" },
  ],
  safe: [
    { symbol: "BTC-USD", name: "비트코인" },
    { symbol: "GC=F", name: "금" },
    { symbol: "SI=F", name: "은" },
  ],
  "kr-re": [
    { symbol: "SEOUL-SALE", name: "서울 매매" },
    { symbol: "SEOUL-JEONSE", name: "서울 전세" },
    { symbol: "CAPITAL-SALE", name: "수도권 매매" },
  ],
};
