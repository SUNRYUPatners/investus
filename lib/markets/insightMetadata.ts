import type { Metadata } from "next";
import type { MarketId } from "./types";
import { getMarketConfig } from "./config";

const COPY: Record<MarketId, { title: string; description: string; og: string }> = {
  us: {
    title: "투자 인사이트 & 리포트 | 인베스트어스",
    description:
      "SUNRYU Partners CIO가 직접 작성한 미국주식 시장 분석 리포트. S&P500·NASDAQ 시장 흐름 분석, 개별 종목 실적·밸류에이션 분석을 무료로 제공합니다.",
    og: "CIO 직접 작성 미국주식 분석 리포트 · ETF·밸류에이션·세금 심화 가이드",
  },
  kr: {
    title: "한국주식 인사이트 & 리포트 | 인베스트어스",
    description:
      "SUNRYU Partners CIO가 직접 작성한 한국주식 시장 분석 리포트. 코스피·코스닥 흐름, 대형주·성장주 밸류에이션 분석을 무료로 제공합니다.",
    og: "CIO 직접 작성 한국주식 분석 리포트 · 코스피·코스닥·섹터 인사이트",
  },
  safe: {
    title: "안전자산 인사이트 & 리포트 | 인베스트어스",
    description:
      "비트코인·금·은·원유 등 안전자산·대체투자 리포트. 매크로·금리·헤지 판단에 직결되는 핵심 분석을 무료로 제공합니다.",
    og: "안전자산·크립토·금·은 매크로 리포트",
  },
  "kr-re": {
    title: "한국부동산 인사이트 & 리포트 | 인베스트어스",
    description:
      "한국 부동산·정책 리포트. 서울·수도권 매매·전세, 금리·DSR·공급 정책까지 주거·투자 판단에 직결되는 분석을 무료로 제공합니다.",
    og: "한국 부동산·전세·정책·지역 시장 리포트",
  },
};

export function insightMetadataFor(market: MarketId): Metadata {
  const cfg = getMarketConfig(market);
  const c = COPY[market];
  return {
    title: c.title,
    description: c.description,
    openGraph: {
      title: c.title,
      description: c.og,
      type: "website",
    },
    other: { "market-label": cfg.labelKo },
  };
}
