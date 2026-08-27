import type { MarketId } from "./types";

/** 시장별 CIO 리포트 소개문 — ReportFeed·인사이트 등 */
export const REPORT_CIO_INTRO: Record<MarketId, { ko: string; en: string }> = {
  us: {
    ko: "SUNRYU Partners CIO가 매일 직접 분석한 미국주식 투자 리포트. S&P500·NASDAQ 시장 흐름·섹터 분석·개별 종목 밸류에이션까지 투자 판단에 직결되는 핵심 분석을 무료로 제공합니다.",
    en: "Daily US equity research by SUNRYU Partners CIO — S&P 500 & NASDAQ market flow, sector analysis, and stock valuation for actionable investment decisions.",
  },
  kr: {
    ko: "SUNRYU Partners CIO가 매일 직접 분석한 한국주식 투자 리포트. 코스피·코스닥 시장 흐름·섹터·대형주·성장주 밸류에이션까지 국내 증시 판단에 직결되는 핵심 분석을 무료로 제공합니다.",
    en: "Daily Korean equity research by SUNRYU Partners CIO — KOSPI & KOSDAQ flow, sectors, and large-cap / growth stock valuation.",
  },
  safe: {
    ko: "SUNRYU Partners CIO가 매일 직접 분석한 안전자산·대체투자 리포트. 비트코인·이더리움·금·은·원유 등 디지털·실물 자산 흐름과 매크로 연동까지 포트폴리오 헤지 판단에 직결되는 핵심 분석을 무료로 제공합니다.",
    en: "Daily safe-asset research by SUNRYU Partners CIO — Bitcoin, gold, silver, oil & macro-linked hedge insights.",
  },
  "kr-re": {
    ko: "SUNRYU Partners CIO가 매일 직접 분석한 한국 부동산·정책 리포트. 서울·수도권 매매·전세, 금리·DSR·공급 정책까지 주거·투자 판단에 직결되는 핵심 분석을 무료로 제공합니다.",
    en: "Daily Korea real-estate research by SUNRYU Partners CIO — Seoul metro sale/jeonse, rates, DSR & housing policy.",
  },
};

export function getReportCioIntro(market: MarketId, lang: "ko" | "en" = "ko"): string {
  return REPORT_CIO_INTRO[market][lang];
}

export const REPORT_SUBTITLE: Record<MarketId, { ko: string; en: string }> = {
  us: { ko: "S&P500 · NASDAQ 시장 분석 · 종목 인사이트", en: "S&P 500 · NASDAQ · Stock insights" },
  kr: { ko: "코스피 · 코스닥 시장 분석 · 종목 인사이트", en: "KOSPI · KOSDAQ · Stock insights" },
  safe: { ko: "비트코인 · 금 · 매크로 · 안전자산 인사이트", en: "BTC · Gold · Macro · Safe-asset insights" },
  "kr-re": { ko: "매매 · 전세 · 정책 · 지역 시장 인사이트", en: "Sale · Jeonse · Policy · Regional insights" },
};

export function getReportSubtitle(market: MarketId, lang: "ko" | "en" = "ko"): string {
  return REPORT_SUBTITLE[market][lang];
}
