import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.investus.kr/#organization",
      "name": "SUNRYU Partners",
      "alternateName": ["선류파트너스", "주식회사 선류파트너스", "Investus"],
      "url": "https://www.investus.kr",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.investus.kr/icons/icon-512.png",
        "width": 512,
        "height": 512,
      },
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "마곡중앙6로 42, 7층 708호(마곡동, 사이언스타)",
        "addressLocality": "강서구",
        "addressRegion": "서울특별시",
        "addressCountry": "KR",
      },
      "telephone": "010-3461-2916",
      "email": "sunryupatners@gmail.com",
      "description": "미국·한국·안전자산·부동산을 AI로 한눈에 관리하는 자산관리 플랫폼 운영사",
    },
    {
      "@type": "Person",
      "@id": "https://www.investus.kr/#cio",
      "name": "류현우",
      "jobTitle": "최고투자책임자 (CIO)",
      "worksFor": { "@id": "https://www.investus.kr/#organization" },
      "knowsAbout": ["미국주식", "글로벌 자산배분", "포트폴리오 관리", "시장 분석"],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "name": "유사투자자문업 사전교육 수료",
        "credentialCategory": "certificate",
        "recognizedBy": {
          "@type": "Organization",
          "name": "금융투자협회 금융투자교육원 (KIFIN)",
          "url": "https://kifin.or.kr",
        },
        "dateCreated": "2023-03-23",
        "identifier": "수료번호 제 26066-2023-90318호",
        "description": "8시간 이수 · 유사투자자문업 사전교육",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.investus.kr/more/about",
      "url": "https://www.investus.kr/more/about",
      "name": "Investus 소개 — SUNRYU Partners · AI 자산관리 플랫폼",
      "description":
        "선류파트너스 CIO가 직접 분석하는 AI 자산관리 플랫폼. 미국·한국·안전자산·부동산을 한 화면에서. KIFIN 유사투자자문업 사전교육 이수.",
      "isPartOf": { "@id": "https://www.investus.kr/#website" },
      "about": { "@id": "https://www.investus.kr/#organization" },
      "author": { "@id": "https://www.investus.kr/#cio" },
      "inLanguage": "ko-KR",
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: "Investus 소개 — SUNRYU Partners CIO · AI 자산관리 플랫폼",
  description:
    "선류파트너스 CIO가 직접 분석하는 AI 자산관리 플랫폼. 미국·한국·안전자산·부동산을 한 화면에서 관리. KIFIN 유사투자자문업 사전교육 이수(2023). 투자 정보 제공 서비스.",
  alternates: await localizedAlternates("/more/about"),
  openGraph: {
    title: "Investus 소개 — SUNRYU Partners CIO",
    description:
      "선류파트너스 CIO 직접 분석 · 미국주식·한국주식·안전자산·부동산 AI 자산관리 플랫폼 · KIFIN 이수",
    url: "https://www.investus.kr/more/about",
    type: "profile",
  },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
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
