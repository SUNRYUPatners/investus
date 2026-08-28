/** 안전자산 히트맵 타일 크기 — 시가총액·ETF AUM·시장 규모 기준 상대 가중치 */

export const SAFE_HEATMAP_WEIGHTS: Record<string, number> = {
  // 가상화폐 (시총 비중 근사)
  "BTC-USD": 55,
  "ETH-USD": 16,
  "SOL-USD": 4.5,
  "XRP-USD": 4,
  "BNB-USD": 3.5,
  "DOGE-USD": 2,
  "ADA-USD": 1.5,
  "TRX-USD": 1.2,
  "AVAX-USD": 1,
  "LINK-USD": 1,

  // 현물·원자재 (시장 규모·유동성 근사)
  "GC=F": 38,
  "CL=F": 28,
  "SI=F": 12,
  "NG=F": 8,
  "HG=F": 7,
  "PL=F": 4,
  "ZC=F": 3,
  "ZW=F": 2.5,
  "ZS=F": 2.5,
  "PA=F": 1.5,

  // 달러·국채·금 ETF (AUM·중요도 근사)
  "BND": 24,
  "GLD": 22,
  "SGOV": 20,
  "TLT": 18,
  "SHY": 14,
  "LQD": 12,
  "IEF": 10,
  "DX-Y.NYB": 9,
  "TIP": 8,
  "UUP": 3,
};

export function safeHeatmapWeight(symbol: string): number {
  return SAFE_HEATMAP_WEIGHTS[symbol] ?? 1;
}

/** 히트맵 가로 스크롤 최소 너비 — 타일 텍스트 ... 방지 */
export const SAFE_HEATMAP_MIN_WIDTH = 720;
