import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.investus.kr/more/privacy",
  "url": "https://www.investus.kr/more/privacy",
  "name": "개인정보처리방침 — Investus Privacy Policy",
  "description":
    "Investus 개인정보처리방침. 수집 항목, 이용 목적, 제3자 제공(Google AdSense), 보유 기간, 이용자 권리, 쿠키 정책 안내.",
  "isPartOf": { "@id": "https://www.investus.kr/#website" },
  "publisher": { "@id": "https://www.investus.kr/#organization" },
  "inLanguage": "ko-KR",
};

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: "개인정보처리방침 — Investus Privacy Policy",
  description:
    "Investus 개인정보처리방침. 수집 항목, 이용 목적, 제3자 제공(Google AdSense·Vercel·Supabase), 보유 기간, 이용자 권리, 쿠키 정책.",
  alternates: await localizedAlternates("/more/privacy"),
  openGraph: {
    title: "개인정보처리방침 — Investus",
    description: "Investus 개인정보 처리 방침 · 쿠키 정책 · Google AdSense 정보 수집 안내",
    url: "https://www.investus.kr/more/privacy",
  },
  };
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
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
