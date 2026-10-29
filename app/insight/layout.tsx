import type { Metadata } from "next";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://www.investus.kr/insight",
  "url": "https://www.investus.kr/insight",
  "name": "Investus 리포트 — 미국주식 투자 분석",
  "description":
    "선류파트너스 CIO가 매일 분석하는 미국주식 투자 리포트. S&P500·NASDAQ·AI·반도체·바이오·매크로 분석을 한 곳에서.",
  "isPartOf": { "@id": "https://www.investus.kr/#website" },
  "publisher": { "@id": "https://www.investus.kr/#organization" },
  "author": { "@id": "https://www.investus.kr/#cio" },
  "inLanguage": ["ko-KR", "en"],
  "about": {
    "@type": "Thing",
    "name": "미국주식 투자 분석",
    "description": "S&P500, NASDAQ, 주요 종목, 매크로, 섹터 분석 리포트",
  },
};

export const metadata: Metadata = {
  title: "인베스트어스 리포트 — 미국주식 투자 분석 | Investus Insight",
  description:
    "선류파트너스 CIO의 미국주식 투자 리포트. S&P500·NASDAQ·AI·반도체·바이오·매크로 분석. 종목분석·시장분석·어닝·BREAKING 뉴스를 매일 업데이트.",
  alternates: { canonical: "https://www.investus.kr/insight" },
  openGraph: {
    title: "인베스트어스 리포트 — 미국주식 투자 분석",
    description:
      "선류파트너스 CIO 투자 리포트 · S&P500 · NASDAQ · AI·반도체 종목 분석 · 매일 업데이트",
    url: "https://www.investus.kr/insight",
    type: "website",
  },
};

export default function InsightLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
