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
    name: "Apple Inc. — 애플",
    price: 300.23,
    change: 2.05,
    changePercent: 0.69,
    sparkline: [292, 294, 296, 297, 298, 299, 299, 300, 300],
    volume: "58.3M",
    marketCap: "4.52T",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp. — 엔비디아 반도체",
    price: 225.32,
    change: -1.71,
    changePercent: -0.75,
    sparkline: [229, 228, 227, 226, 226, 225, 225, 225, 225],
    volume: "144.0M",
    marketCap: "5.47T",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc. — 테슬라 전기차",
    price: 422.24,
    change: 13.15,
    changePercent: 3.21,
    sparkline: [404, 408, 412, 414, 416, 418, 419, 421, 422],
    volume: "85.0M",
    marketCap: "1.36T",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp. — 마이크로소프트",
    price: 421.92,
    change: 12.68,
    changePercent: 3.10,
    sparkline: [406, 409, 412, 414, 416, 418, 419, 421, 421],
    volume: "22.1M",
    marketCap: "3.13T",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc. — 아마존",
    price: 264.14,
    change: -3.07,
    changePercent: -1.15,
    sparkline: [270, 269, 268, 267, 266, 266, 265, 264, 264],
    volume: "35.8M",
    marketCap: "2.79T",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc. — 구글 알파벳",
    price: 396.78,
    change: -4.30,
    changePercent: -1.07,
    sparkline: [404, 402, 401, 400, 399, 399, 398, 397, 396],
    volume: "24.4M",
    marketCap: "4.83T",
  },
  {
    symbol: "META",
    name: "Meta Platforms — 메타 페이스북 인스타그램",
    price: 614.23,
    change: -4.18,
    changePercent: -0.68,
    sparkline: [621, 620, 618, 617, 616, 616, 615, 614, 614],
    volume: "16.9M",
    marketCap: "2.20T",
  },
  {
    symbol: "NFLX",
    name: "Netflix Inc. — 넷플릭스",
    price: 88.09,
    change: -0.74,
    changePercent: -0.83,
    sparkline: [90, 89.5, 89.2, 89, 88.8, 88.6, 88.4, 88.2, 88.09],
    volume: "4.8M",
    marketCap: "37.9B",
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices — AMD 반도체",
    price: 447.58,
    change: 9.72,
    changePercent: 2.22,
    sparkline: [432, 435, 438, 440, 442, 444, 445, 446, 447],
    volume: "38.1M",
    marketCap: "727.0B",
  },
  {
    symbol: "ORCL",
    name: "Oracle Corp. — 오라클",
    price: 188.16,
    change: -1.31,
    changePercent: -0.69,
    sparkline: [192, 191, 190, 190, 189, 189, 188, 188, 188],
    volume: "8.2M",
    marketCap: "519.0B",
  },
  // ── Investus 추천 종목 ──
  {
    symbol: "SPCX",
    name: "SpaceX — 스페이스엑스 나스닥 상장",
    price: 172.68,
    change: 37.68,
    changePercent: 27.91,
    sparkline: [135, 145, 152, 158, 162, 168, 172, 175, 172.68],
    volume: "42.5M",
    marketCap: "2260.0B",
  },
  {
    symbol: "IBM",
    name: "IBM Corp. — 아이비엠",
    price: 172.54,
    change: -1.12,
    changePercent: -0.65,
    sparkline: [175, 174.5, 174, 173.8, 173.5, 173.1, 172.9, 172.7, 172.54],
    volume: "3.9M",
    marketCap: "157.2B",
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase — JP모건",
    price: 301.98,
    change: 6.22,
    changePercent: 2.10,
    sparkline: [292, 294, 296, 297, 299, 299, 300, 301, 301],
    volume: "9.1M",
    marketCap: "868.0B",
  },
  // ── 지수 추종 ETF ──
  { symbol: "SPY",  name: "SPDR S&P 500 ETF — 에스앤피500 S&P500",           price: 590.0,  change: 2.1,  changePercent: 0.36, sparkline: [], volume: "52M",  marketCap: "560B" },
  { symbol: "VOO",  name: "Vanguard S&P 500 ETF — 뱅가드 에스앤피500",        price: 542.0,  change: 1.9,  changePercent: 0.35, sparkline: [], volume: "8M",   marketCap: "530B" },
  { symbol: "IVV",  name: "iShares S&P 500 ETF — 아이쉐어즈 S&P500",         price: 595.0,  change: 2.0,  changePercent: 0.34, sparkline: [], volume: "5M",   marketCap: "510B" },
  { symbol: "QQQ",  name: "Invesco QQQ — 나스닥100 ETF 나스닥 100",           price: 508.0,  change: 3.5,  changePercent: 0.69, sparkline: [], volume: "41M",  marketCap: "220B" },
  { symbol: "QQQM", name: "Invesco Nasdaq 100 Mini — 나스닥100 미니",         price: 195.0,  change: 1.3,  changePercent: 0.67, sparkline: [], volume: "3M",   marketCap: "40B"  },
  { symbol: "VTI",  name: "Vanguard Total Market ETF — 미국전체주식 러셀3000", price: 278.0,  change: 0.9,  changePercent: 0.32, sparkline: [], volume: "4M",   marketCap: "400B" },
  { symbol: "IWM",  name: "iShares Russell 2000 ETF — 러셀2000 소형주",       price: 214.0,  change: 0.8,  changePercent: 0.37, sparkline: [], volume: "25M",  marketCap: "72B"  },
  { symbol: "IWB",  name: "iShares Russell 1000 ETF — 러셀1000",              price: 305.0,  change: 1.1,  changePercent: 0.36, sparkline: [], volume: "1M",   marketCap: "40B"  },
  { symbol: "VTHR", name: "Vanguard Russell 3000 ETF — 러셀3000 전체시장",    price: 270.0,  change: 0.9,  changePercent: 0.33, sparkline: [], volume: "0.5M", marketCap: "8B"   },
  { symbol: "DIA",  name: "SPDR Dow Jones ETF — 다우존스 ETF",                price: 444.0,  change: 1.2,  changePercent: 0.27, sparkline: [], volume: "3M",   marketCap: "33B"  },
  // ── 레버리지 ETF ──
  { symbol: "TQQQ", name: "ProShares UltraPro QQQ — 나스닥 3배 레버리지",     price: 72.0,   change: 3.1,  changePercent: 4.50, sparkline: [], volume: "78M",  marketCap: "21B"  },
  { symbol: "SQQQ", name: "ProShares UltraPro Short QQQ — 나스닥 3배 인버스", price: 8.2,    change:-0.4,  changePercent:-4.65, sparkline: [], volume: "62M",  marketCap: "3.5B" },
  { symbol: "SPXL", name: "Direxion S&P 500 Bull 3x — S&P 3배 레버리지",     price: 150.0,  change: 3.8,  changePercent: 2.60, sparkline: [], volume: "12M",  marketCap: "5B"   },
  { symbol: "SPXS", name: "Direxion S&P 500 Bear 3x — S&P 3배 인버스",       price: 7.5,    change:-0.2,  changePercent:-2.60, sparkline: [], volume: "8M",   marketCap: "0.8B" },
  { symbol: "UPRO", name: "ProShares UltraPro S&P 500 3x — 에스앤피 3배",    price: 92.0,   change: 2.4,  changePercent: 2.68, sparkline: [], volume: "7M",   marketCap: "4.5B" },
  { symbol: "SSO",  name: "ProShares Ultra S&P 500 2x — 에스앤피 2배",       price: 101.0,  change: 1.4,  changePercent: 1.41, sparkline: [], volume: "3M",   marketCap: "4B"   },
  { symbol: "QLD",  name: "ProShares Ultra QQQ 2x — 나스닥 2배 레버리지",    price: 95.0,   change: 2.8,  changePercent: 3.03, sparkline: [], volume: "5M",   marketCap: "5B"   },
  { symbol: "TECL", name: "Direxion Tech Bull 3x — 기술주 3배 레버리지",      price: 72.0,   change: 4.0,  changePercent: 5.88, sparkline: [], volume: "6M",   marketCap: "2B"   },
  { symbol: "CURE", name: "Direxion Healthcare Bull 3x — 헬스케어 3배",       price: 105.0,  change: 1.5,  changePercent: 1.45, sparkline: [], volume: "1M",   marketCap: "0.6B" },
  { symbol: "LABU", name: "Direxion Biotech Bull 3x — 바이오 3배 레버리지",   price: 14.5,   change: 0.8,  changePercent: 5.83, sparkline: [], volume: "12M",  marketCap: "0.8B" },
  { symbol: "SOXL", name: "Direxion Semiconductor Bull 3x — 반도체 3배",      price: 22.0,   change: 1.8,  changePercent: 8.91, sparkline: [], volume: "55M",  marketCap: "5B"   },
  { symbol: "SOXS", name: "Direxion Semiconductor Bear 3x — 반도체 3배 인버스", price: 5.2, change:-0.5,  changePercent:-8.77, sparkline: [], volume: "30M",  marketCap: "0.5B" },
  { symbol: "UVXY", name: "ProShares Ultra VIX — 변동성 2배 공포지수",        price: 12.5,   change: 0.3,  changePercent: 2.46, sparkline: [], volume: "20M",  marketCap: "0.4B" },
  { symbol: "SH",   name: "ProShares Short S&P 500 — S&P 인버스",            price: 15.8,   change:-0.1,  changePercent:-0.63, sparkline: [], volume: "5M",   marketCap: "1.5B" },
  { symbol: "PSQ",  name: "ProShares Short QQQ — 나스닥 인버스",              price: 11.2,   change:-0.1,  changePercent:-0.89, sparkline: [], volume: "4M",   marketCap: "0.5B" },
  // ── 섹터 ETF ──
  { symbol: "XLK",  name: "Tech Select Sector SPDR — 기술주 ETF",             price: 240.0,  change: 3.2,  changePercent: 1.35, sparkline: [], volume: "7M",   marketCap: "65B"  },
  { symbol: "SOXX", name: "iShares Semiconductor ETF — 반도체 ETF",            price: 240.0,  change: 8.0,  changePercent: 3.45, sparkline: [], volume: "3M",   marketCap: "11B"  },
  { symbol: "SMH",  name: "VanEck Semiconductor ETF — 반도체 ETF",             price: 252.0,  change: 8.5,  changePercent: 3.49, sparkline: [], volume: "10M",  marketCap: "23B"  },
  { symbol: "XLF",  name: "Financial Select Sector SPDR — 금융주 ETF",        price: 48.0,   change: 0.4,  changePercent: 0.84, sparkline: [], volume: "28M",  marketCap: "42B"  },
  { symbol: "XLE",  name: "Energy Select Sector SPDR — 에너지주 ETF",         price: 90.0,   change:-0.3,  changePercent:-0.33, sparkline: [], volume: "12M",  marketCap: "32B"  },
  { symbol: "XLV",  name: "Health Care Select Sector SPDR — 헬스케어 ETF",    price: 145.0,  change: 0.6,  changePercent: 0.42, sparkline: [], volume: "7M",   marketCap: "38B"  },
  { symbol: "XLY",  name: "Consumer Discretionary Select SPDR — 소비재 ETF",  price: 218.0,  change: 1.8,  changePercent: 0.83, sparkline: [], volume: "4M",   marketCap: "20B"  },
  { symbol: "XLI",  name: "Industrial Select Sector SPDR — 산업재 ETF",       price: 138.0,  change: 0.5,  changePercent: 0.36, sparkline: [], volume: "5M",   marketCap: "18B"  },
  { symbol: "ARKK", name: "ARK Innovation ETF — 아크 이노베이션 혁신 ETF",    price: 52.0,   change: 1.5,  changePercent: 2.97, sparkline: [], volume: "12M",  marketCap: "10B"  },
  { symbol: "ARKG", name: "ARK Genomic Revolution ETF — 아크 유전공학",       price: 14.5,   change: 0.4,  changePercent: 2.84, sparkline: [], volume: "3M",   marketCap: "1.5B" },
  // ── 채권·금·원자재 ETF ──
  { symbol: "TLT",  name: "iShares 20+ Year Treasury ETF — 장기국채 ETF",     price: 88.0,   change:-0.3,  changePercent:-0.34, sparkline: [], volume: "28M",  marketCap: "52B"  },
  { symbol: "AGG",  name: "iShares Core US Aggregate Bond — 종합채권 ETF",    price: 98.0,   change: 0.1,  changePercent: 0.10, sparkline: [], volume: "7M",   marketCap: "100B" },
  { symbol: "BND",  name: "Vanguard Total Bond Market ETF — 뱅가드 채권",     price: 74.0,   change: 0.1,  changePercent: 0.14, sparkline: [], volume: "5M",   marketCap: "110B" },
  { symbol: "GLD",  name: "SPDR Gold Shares ETF — 금 ETF 골드",               price: 295.0,  change: 2.5,  changePercent: 0.86, sparkline: [], volume: "10M",  marketCap: "86B"  },
  { symbol: "IAU",  name: "iShares Gold Trust — 금 ETF",                       price: 58.0,   change: 0.5,  changePercent: 0.87, sparkline: [], volume: "8M",   marketCap: "35B"  },
  { symbol: "SLV",  name: "iShares Silver Trust — 은 ETF 실버",               price: 33.0,   change: 0.4,  changePercent: 1.23, sparkline: [], volume: "12M",  marketCap: "16B"  },
  { symbol: "GDX",  name: "VanEck Gold Miners ETF — 금광주 ETF",              price: 42.0,   change: 1.0,  changePercent: 2.44, sparkline: [], volume: "20M",  marketCap: "14B"  },
  // ── 비트코인·크립토 ETF ──
  { symbol: "IBIT", name: "iShares Bitcoin Trust ETF — 비트코인 ETF",         price: 60.0,   change: 2.0,  changePercent: 3.45, sparkline: [], volume: "40M",  marketCap: "45B"  },
  { symbol: "FBTC", name: "Fidelity Wise Origin Bitcoin Fund — 비트코인 ETF", price: 62.0,   change: 2.1,  changePercent: 3.51, sparkline: [], volume: "15M",  marketCap: "20B"  },
  { symbol: "GBTC", name: "Grayscale Bitcoin Trust — 그레이스케일 비트코인",  price: 72.0,   change: 2.3,  changePercent: 3.30, sparkline: [], volume: "10M",  marketCap: "25B"  },
  // ── 개별 주식 추가 ──
  { symbol: "COIN", name: "Coinbase Global — 코인베이스 크립토 거래소",       price: 285.0,  change: 8.5,  changePercent: 3.07, sparkline: [], volume: "18M",  marketCap: "73B"  },
  { symbol: "MSTR", name: "MicroStrategy — 마이크로스트래티지 비트코인",      price: 420.0,  change: 15.0, changePercent: 3.70, sparkline: [], volume: "20M",  marketCap: "50B"  },
  { symbol: "BRK.B",name: "Berkshire Hathaway B — 버크셔 해서웨이 버핏",     price: 544.0,  change: 1.2,  changePercent: 0.22, sparkline: [], volume: "3M",   marketCap: "788B" },
  { symbol: "V",    name: "Visa Inc. — 비자",                                  price: 375.0,  change: 1.8,  changePercent: 0.48, sparkline: [], volume: "6M",   marketCap: "780B" },
  { symbol: "MA",   name: "Mastercard Inc. — 마스터카드",                     price: 570.0,  change: 2.5,  changePercent: 0.44, sparkline: [], volume: "3M",   marketCap: "545B" },
  { symbol: "BAC",  name: "Bank of America — 뱅크오브아메리카",               price: 48.0,   change: 0.5,  changePercent: 1.05, sparkline: [], volume: "30M",  marketCap: "370B" },
  { symbol: "GS",   name: "Goldman Sachs — 골드만삭스",                       price: 628.0,  change: 3.5,  changePercent: 0.56, sparkline: [], volume: "2M",   marketCap: "210B" },
  { symbol: "WMT",  name: "Walmart Inc. — 월마트",                            price: 97.0,   change: 0.3,  changePercent: 0.31, sparkline: [], volume: "8M",   marketCap: "780B" },
  { symbol: "COST", name: "Costco Wholesale — 코스트코",                      price: 1000.0, change: 4.0,  changePercent: 0.40, sparkline: [], volume: "2M",   marketCap: "440B" },
  { symbol: "DIS",  name: "Walt Disney Co. — 월트 디즈니",                    price: 120.0,  change: 0.8,  changePercent: 0.67, sparkline: [], volume: "10M",  marketCap: "218B" },
  { symbol: "SBUX", name: "Starbucks Corp. — 스타벅스",                       price: 83.0,   change: 0.4,  changePercent: 0.48, sparkline: [], volume: "7M",   marketCap: "93B"  },
  { symbol: "NKE",  name: "Nike Inc. — 나이키",                               price: 72.0,   change:-0.3,  changePercent:-0.41, sparkline: [], volume: "8M",   marketCap: "108B" },
  { symbol: "KO",   name: "Coca-Cola Co. — 코카콜라",                         price: 72.0,   change: 0.2,  changePercent: 0.28, sparkline: [], volume: "12M",  marketCap: "310B" },
  { symbol: "PEP",  name: "PepsiCo Inc. — 펩시콜라 펩시코",                   price: 142.0,  change: 0.5,  changePercent: 0.35, sparkline: [], volume: "4M",   marketCap: "194B" },
  { symbol: "XOM",  name: "ExxonMobil — 엑슨모빌",                            price: 112.0,  change:-0.5,  changePercent:-0.44, sparkline: [], volume: "16M",  marketCap: "482B" },
  { symbol: "CVX",  name: "Chevron Corp. — 쉐브론",                           price: 161.0,  change:-0.6,  changePercent:-0.37, sparkline: [], volume: "7M",   marketCap: "295B" },
  { symbol: "LLY",  name: "Eli Lilly — 일라이릴리 오젬픽 비만치료제",        price: 850.0,  change: 8.0,  changePercent: 0.95, sparkline: [], volume: "3M",   marketCap: "806B" },
  { symbol: "UNH",  name: "UnitedHealth Group — 유나이티드헬스",              price: 360.0,  change:-2.0,  changePercent:-0.55, sparkline: [], volume: "4M",   marketCap: "330B" },
  { symbol: "PFE",  name: "Pfizer Inc. — 화이자",                             price: 24.0,   change:-0.1,  changePercent:-0.41, sparkline: [], volume: "25M",  marketCap: "136B" },
  { symbol: "AVGO", name: "Broadcom Inc. — 브로드컴 반도체",                  price: 275.0,  change: 5.0,  changePercent: 1.85, sparkline: [], volume: "12M",  marketCap: "1.3T" },
  { symbol: "INTC", name: "Intel Corp. — 인텔",                               price: 24.0,   change:-0.2,  changePercent:-0.83, sparkline: [], volume: "35M",  marketCap: "103B" },
  { symbol: "ARM",  name: "Arm Holdings — ARM 홀딩스 반도체",                 price: 160.0,  change: 4.0,  changePercent: 2.56, sparkline: [], volume: "8M",   marketCap: "340B" },
  { symbol: "QCOM", name: "Qualcomm Inc. — 퀄컴 반도체",                      price: 185.0,  change: 2.0,  changePercent: 1.09, sparkline: [], volume: "8M",   marketCap: "203B" },
  { symbol: "TSM",  name: "Taiwan Semiconductor ADR — TSMC 대만반도체",       price: 205.0,  change: 3.5,  changePercent: 1.74, sparkline: [], volume: "12M",  marketCap: "1.1T" },
  { symbol: "SPOT", name: "Spotify Technology — 스포티파이 음악 스트리밍",    price: 700.0,  change: 8.0,  changePercent: 1.16, sparkline: [], volume: "2M",   marketCap: "140B" },
  { symbol: "UBER", name: "Uber Technologies — 우버",                         price: 88.0,   change: 1.2,  changePercent: 1.38, sparkline: [], volume: "12M",  marketCap: "185B" },
  { symbol: "ABNB", name: "Airbnb Inc. — 에어비앤비",                         price: 152.0,  change: 2.0,  changePercent: 1.33, sparkline: [], volume: "5M",   marketCap: "97B"  },
  { symbol: "RBLX", name: "Roblox Corp. — 로블록스",                          price: 60.0,   change: 1.5,  changePercent: 2.56, sparkline: [], volume: "10M",  marketCap: "38B"  },
  { symbol: "RIVN", name: "Rivian Automotive — 리비안 전기차",                price: 14.0,   change: 0.3,  changePercent: 2.19, sparkline: [], volume: "25M",  marketCap: "13B"  },
  { symbol: "HOOD", name: "Robinhood Markets — 로빈후드 주식거래",            price: 52.0,   change: 1.8,  changePercent: 3.58, sparkline: [], volume: "22M",  marketCap: "46B"  },
  { symbol: "SNAP", name: "Snap Inc. — 스냅챗",                               price: 12.0,   change: 0.3,  changePercent: 2.56, sparkline: [], volume: "28M",  marketCap: "20B"  },
  { symbol: "HD",   name: "Home Depot — 홈디포",                              price: 410.0,  change: 1.5,  changePercent: 0.37, sparkline: [], volume: "3M",   marketCap: "408B" },
  { symbol: "BA",   name: "Boeing Co. — 보잉",                                price: 210.0,  change: 2.0,  changePercent: 0.96, sparkline: [], volume: "6M",   marketCap: "162B" },
  { symbol: "F",    name: "Ford Motor — 포드 자동차",                         price: 11.5,   change: 0.1,  changePercent: 0.88, sparkline: [], volume: "50M",  marketCap: "46B"  },
  { symbol: "GM",   name: "General Motors — 제너럴모터스",                    price: 50.0,   change: 0.5,  changePercent: 1.01, sparkline: [], volume: "12M",  marketCap: "46B"  },
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

export const RECOMMENDED_SYMBOLS = ["GOOGL", "TSLA", "SPCX", "IBM", "JPM"];
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
