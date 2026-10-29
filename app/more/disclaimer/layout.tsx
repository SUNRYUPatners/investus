import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.investus.kr/more/disclaimer",
  "url": "https://www.investus.kr/more/disclaimer",
  "name": "투자 유의사항 및 법적 고지 — Investus",
  "description":
    "Investus 투자 유의사항. 원금 손실 위험, 정보 제공 목적, 투자 책임 귀속, 환율 위험 등 7개 항목의 법적 고지. 자본시장법상 투자자문업 미인가 서비스.",
  "isPartOf": { "@id": "https://www.investus.kr/#website" },
  "publisher": { "@id": "https://www.investus.kr/#organization" },
  "inLanguage": "ko-KR",
  "about": {
    "@type": "Thing",
    "name": "투자 위험 고지",
    "description": "금융투자상품의 원금 손실 위험 및 서비스 이용 주의사항",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: "투자 유의사항 — Investus 법적 고지",
  description:
    "Investus 투자 유의사항. 원금 손실 위험, 정보 제공 목적 명시, 과거 수익률과 미래 성과, 투자 책임 귀속 안내. 자본시장법상 투자자문업 미인가 서비스.",
  alternates: await localizedAlternates("/more/disclaimer"),
  openGraph: {
    title: "투자 유의사항 — Investus 법적 고지",
    description: "Investus 투자 유의사항 · 원금 손실 위험 · 정보 제공 목적 · 투자 책임",
    url: "https://www.investus.kr/more/disclaimer",
  },
  };
}

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
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
