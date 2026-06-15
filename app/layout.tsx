import type { Metadata, Viewport } from "next";
import { Syne, IBM_Plex_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { PullToRefresh } from "@/components/PullToRefresh";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { VersionBanner } from "@/components/VersionBanner";
import { ReportUpdateBanner } from "@/components/ReportUpdateBanner";
import { getLocale } from "@/lib/getLocale";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-syne",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Investus — 인베스트어스 | 미국주식 투자 플랫폼",
  description: "인베스트어스(Investus) — 미국주식 플랫폼. 실시간 시세 · S&P500 · NASDAQ · 투자 리포트 · 공포탐욕지수 · 선류파트너스",
  metadataBase: new URL("https://investus.kr"),
  keywords: [
    "인베스트어스", "investus", "investus.kr", "인베스트어스케이알",
    "선류파트너스", "선류 파트너스", "SUNRYU Partners",
    "미국주식", "미국 주식", "미국주식 투자", "미국주식 플랫폼",
    "주식", "S&P500", "나스닥", "NASDAQ", "다우존스", "DOW",
    "투자", "주가", "실시간 주가", "선물", "비트코인",
    "투자정보", "주식정보", "시세", "실시간시세",
    "NVIDIA", "엔비디아", "테슬라", "Tesla", "애플", "Apple",
    "AI주식", "성장주", "포트폴리오", "주식분석", "시장분석", "투자리포트",
    "공포탐욕지수", "버핏지수", "섹터분석", "미국주식투자정보",
  ],
  openGraph: {
    title: "Investus 인베스트어스 — 미국주식 투자 플랫폼",
    description: "Investus 인베스트어스 — 미국주식 투자 플랫폼",
    url: "https://investus.kr",
    siteName: "Investus — 인베스트어스",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/icons/icon-512.png", width: 512, height: 512, alt: "Investus 인베스트어스" }],
  },
  twitter: {
    card: "summary",
    title: "Investus 인베스트어스 — 미국주식 투자 플랫폼",
    description: "Investus 인베스트어스 — 미국주식 투자 플랫폼",
  },
  alternates: {
    canonical: "https://investus.kr",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Investus",
  },
  formatDetection: { telephone: false },
  verification: {
    google: "gWru1tXVNVr--phsNN1YCa53uJoAgx53ut5k2kfDCXo",
    other: {
      "naver-site-verification": "cf0399adf4ed75c57528ec884d2924f6c41d9a03",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // env(safe-area-inset-bottom) requires this on iOS
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://investus.kr/#website",
      "url": "https://investus.kr",
      "name": "Investus — 인베스트어스",
      "alternateName": ["인베스트어스", "investus.kr", "인베스트어스케이알", "Investus Korea"],
      "description": "미국주식 실시간 시세 · 시장 분석 리포트 · 선류파트너스 CIO 투자 정보",
      "inLanguage": "ko-KR",
      "publisher": { "@id": "https://investus.kr/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://investus.kr/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://investus.kr/#organization",
      "name": "Investus",
      "alternateName": ["인베스트어스", "SUNRYU Partners", "선류파트너스"],
      "url": "https://investus.kr",
      "logo": {
        "@type": "ImageObject",
        "url": "https://investus.kr/icons/icon-512.png",
        "width": 512,
        "height": 512,
      },
      "description": "미국주식 투자 플랫폼 — 실시간 시세, 시장 분석 리포트, 투자 기초 교육",
      "foundingDate": "2024",
      "address": { "@type": "PostalAddress", "addressCountry": "KR" },
      "sameAs": ["https://investus.kr", "https://investus.kr"],
    },
    {
      "@type": "WebPage",
      "@id": "https://investus.kr/#webpage",
      "url": "https://investus.kr",
      "name": "Investus — 인베스트어스 | 미국주식 투자 플랫폼",
      "isPartOf": { "@id": "https://investus.kr/#website" },
      "about": { "@id": "https://investus.kr/#organization" },
      "description": "인베스트어스(Investus) — 미국 주식 실시간 시세 · S&P500 · NASDAQ · 시장 분석 리포트",
      "inLanguage": "ko-KR",
    },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${syne.variable} ${ibmPlexMono.variable} ${notoSansKR.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ background: "var(--bg)" }}>
        {/* iOS PWA: prevent rubber-band overscroll at top/bottom revealing cached content */}
        <Script id="ios-overscroll" strategy="afterInteractive">{`
          (function(){
            var lastY = 0;
            document.addEventListener('touchstart', function(e){
              lastY = e.touches[0].clientY;
            }, { passive: true });
            document.addEventListener('touchmove', function(e){
              if (e.touches.length !== 1) return;
              var currentY = e.touches[0].clientY;
              var dy = currentY - lastY;
              lastY = currentY;
              var el = document.scrollingElement || document.documentElement;
              var atTop    = el.scrollTop <= 0;
              var atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
              if ((atTop && dy > 0) || (atBottom && dy < 0)) {
                e.preventDefault();
              }
            }, { passive: false });
          })();
        `}</Script>
        <LocaleProvider locale={locale}>
          <AuthProvider>
            <ServiceWorkerRegistration />
            <VersionBanner />
            <ReportUpdateBanner />
            <PullToRefresh />
            <PWAInstallPrompt />
            <div className="lg:min-h-screen">
              <DesktopSidebar />
              <div className="lg:pl-64" style={{ background: "var(--bg)" }}>
                {children}
              </div>
            </div>
            <BottomNav />
          </AuthProvider>
        </LocaleProvider>
        {/* Kakao AdFit SDK — afterInteractive로 React 렌더 후 실행 보장 */}
        <Script
          src="https://t1.kakaocdn.net/kas/static/ba.min.js"
          strategy="afterInteractive"
        />
        <Analytics />
      </body>
    </html>
  );
}
