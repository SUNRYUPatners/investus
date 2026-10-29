import type { Metadata } from "next";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.investus.kr/learn",
  "url": "https://www.investus.kr/learn",
  "name": "투자 지식 허브 — Investus Learn",
  "description":
    "미국주식 ETF·밸류에이션·배당·세금·매크로·옵션·부동산·안전자산까지 — 초보부터 심화까지 35편 이상의 투자 교육 가이드.",
  "isPartOf": { "@id": "https://www.investus.kr/#website" },
  "publisher": { "@id": "https://www.investus.kr/#organization" },
  "author": { "@id": "https://www.investus.kr/#cio" },
  "about": {
    "@type": "Thing",
    "name": "투자 교육",
    "description": "미국주식·ETF·채권·부동산·가상자산 투자 기초 및 심화 가이드"
  },
  "educationalLevel": "beginner to intermediate",
  "inLanguage": ["ko-KR", "en"],
};

export const metadata: Metadata = {
  title: "투자 지식 허브 — Investus Learn · 미국주식 교육 가이드",
  description:
    "미국주식 ETF·밸류에이션·배당·세금·매크로·옵션·부동산·안전자산 투자 교육 가이드. 초보부터 심화까지 35편 이상 무료 제공. 선류파트너스 CIO 직접 정리.",
  alternates: { canonical: "https://www.investus.kr/learn" },
  openGraph: {
    title: "투자 지식 허브 — Investus Learn",
    description:
      "미국주식 ETF·배당·세금·매크로·옵션 투자 교육 35편 이상 · 초보~심화 · 무료",
    url: "https://www.investus.kr/learn",
    type: "website",
  },
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
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
