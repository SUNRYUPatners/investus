import type { MetadataRoute } from "next";

// 한국 투자자 인기 종목 + 주요 지수 ETF
const SYMBOLS = [
  // 빅테크
  "AAPL","MSFT","GOOGL","GOOG","AMZN","META","NVDA","TSLA","AVGO","ORCL",
  // 반도체
  "AMD","INTC","QCOM","MU","AMAT","LRCX","KLAC","MRVL","ARM","SMCI",
  // AI / 클라우드
  "PLTR","SNOW","NET","DDOG","AI","SOUN","BBAI","IONQ","RGTI",
  // 우주 / 방산
  "RKLB","PL","SPCE","LMT","RTX","NOC","GD",
  // 금융
  "JPM","BAC","GS","MS","V","MA","BRK-B","BRK-A","AXP",
  // 헬스케어
  "UNH","LLY","JNJ","ABBV","MRK","PFE","NVO","ISRG",
  // 에너지
  "XOM","CVX","COP","SLB",
  // 소비재 / 리테일
  "AMZN","COST","WMT","TGT","NKE","SBUX","MCD","NFLX","DIS",
  // 크립토 관련
  "COIN","MSTR","MARA","RIOT","HUT",
  // ETF
  "SPY","QQQ","TQQQ","SOXL","SOXS","ARKK","IWM","DIA","GLD","SLV",
  // 한국인 인기
  "PLTR","RKLB","IONQ","SMCI","TSM","ASML","BABA","JD","SE",
];

// 중복 제거
const UNIQUE = [...new Set(SYMBOLS)];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://investus.kr";
  const now  = new Date();
  return [
    { url: base,                         lastModified: now, changeFrequency: "always",  priority: 1    },
    { url: `${base}/insight`,            lastModified: now, changeFrequency: "daily",   priority: 0.95 },
    { url: `${base}/insight/basics`,     lastModified: now, changeFrequency: "weekly",  priority: 0.9  },
    { url: `${base}/search`,             lastModified: now, changeFrequency: "always",  priority: 0.9  },
    { url: `${base}/wall`,               lastModified: now, changeFrequency: "always",  priority: 0.85 },
    { url: `${base}/portfolio`,          lastModified: now, changeFrequency: "always",  priority: 0.8  },
    { url: `${base}/more`,               lastModified: now, changeFrequency: "monthly", priority: 0.5  },
    { url: `${base}/more/about`,         lastModified: now, changeFrequency: "monthly", priority: 0.6  },
    ...UNIQUE.map((sym) => ({
      url: `${base}/stock/${sym}`,
      lastModified: now,
      changeFrequency: "always" as const,
      priority: ["NVDA","TSLA","AAPL","MSFT","AMZN","META","GOOGL"].includes(sym) ? 0.9 : 0.75,
    })),
  ];
}
