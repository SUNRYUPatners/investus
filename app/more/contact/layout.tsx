import type { Metadata } from "next";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://www.investus.kr/more/contact",
  "url": "https://www.investus.kr/more/contact",
  "name": "문의하기 — Investus 고객센터",
  "description": "Investus 서비스 문의, 광고·제휴 문의. 이메일: sunryupatners@gmail.com · 전화: 010-3461-2916",
  "isPartOf": { "@id": "https://www.investus.kr/#website" },
  "publisher": { "@id": "https://www.investus.kr/#organization" },
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://www.investus.kr/#organization",
    "name": "주식회사 선류파트너스 (Investus)",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "sunryupatners@gmail.com",
        "telephone": "010-3461-2916",
        "availableLanguage": ["Korean", "English"],
        "areaServed": "KR"
      },
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "sunryupatners@gmail.com",
        "description": "광고·제휴 문의"
      }
    ]
  }
};

export const metadata: Metadata = {
  title: "문의하기 — Investus 고객센터",
  description:
    "Investus 서비스 문의, 광고·제휴 문의. 이메일: sunryupatners@gmail.com · 전화: 010-3461-2916 · 주식회사 선류파트너스.",
  alternates: { canonical: "https://www.investus.kr/more/contact" },
  openGraph: {
    title: "문의하기 — Investus",
    description: "Investus 서비스 문의 · 광고·제휴 · 이메일 sunryupatners@gmail.com",
    url: "https://www.investus.kr/more/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
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
