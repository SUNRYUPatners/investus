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
  description: "인베스트어스(Investus) — 미국 주식 실시간 시세 · S&P500 · NASDAQ · DOW · 선물 · 공포탐욕지수 · 버핏지수 · 시장 분석 리포트. 선류파트너스 CIO 직접 분석.",
  metadataBase: new URL("https://www.investus.kr"),
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
    url: "https://www.investus.kr",
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
    canonical: "https://www.investus.kr",
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
      "@id": "https://www.investus.kr/#website",
      "url": "https://www.investus.kr",
      "name": "Investus — 인베스트어스",
      "alternateName": ["인베스트어스", "investus.kr", "인베스트어스케이알"],
      "description": "미국주식 실시간 시세 · 시장 분석 리포트 · 선류파트너스 CIO 투자 정보",
      "inLanguage": "ko-KR",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.investus.kr/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.investus.kr/#organization",
      "name": "SUNRYU Partners",
      "alternateName": ["선류파트너스", "선류 파트너스", "Investus"],
      "url": "https://www.investus.kr",
      "logo": { "@type": "ImageObject", "url": "https://www.investus.kr/icons/icon-512.png" },
      "sameAs": ["https://www.investus.kr"],
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
        {/* Kakao AdFit SDK — 공식 가이드 방식: 프로토콜 상대 URL, type 명시, async */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script type="text/javascript" src="//t1.kakaocdn.net/kas/static/ba.min.js" async />
      </head>
      <body style={{ background: "var(--bg)" }}>
        {/* iOS PWA: prevent rubber-band overscroll at bottom revealing content under nav */}
        <Script id="ios-overscroll" strategy="afterInteractive">{`
          (function(){
            var startY = 0;
            document.addEventListener('touchstart', function(e){
              startY = e.touches[0].clientY;
            }, { passive: true });
            document.addEventListener('touchmove', function(e){
              if (e.touches.length !== 1) return; // ignore pinch
              var dy = e.touches[0].clientY - startY;
              var atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 4;
              // Only block downward swipe (scroll down) when already at bottom
              if (atBottom && dy < 0) {
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
              <div className="lg:pl-64">
                {children}
              </div>
            </div>
            <BottomNav />
          </AuthProvider>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
