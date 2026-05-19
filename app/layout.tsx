import type { Metadata, Viewport } from "next";
import { Syne, IBM_Plex_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { PullToRefresh } from "@/components/PullToRefresh";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { VersionBanner } from "@/components/VersionBanner";
import { getLocale } from "@/lib/getLocale";
import Script from "next/script";

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
  title: "Investus — 인베스트어스",
  description: "미국 주식 실시간 시세 · S&P500 · NASDAQ · DOW · 선물 · 공포탐욕지수 · 시장 분석 리포트",
  metadataBase: new URL("https://www.investus.kr"),
  keywords: ["미국주식", "주식", "S&P500", "나스닥", "투자", "주가", "실시간", "선물", "비트코인", "투자정보"],
  openGraph: {
    title: "Investus — 미국주식 실시간 정보",
    description: "S&P500 · NASDAQ · DOW · 선물 · 공포탐욕지수 · 버핏지수 · 시장분석 리포트",
    url: "https://www.investus.kr",
    siteName: "Investus",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Investus — 미국주식 실시간 정보",
    description: "S&P500 · NASDAQ · DOW · 선물 · 공포탐욕지수 · 버핏지수 · 시장분석 리포트",
  },
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Investus",
  },
  formatDetection: { telephone: false },
  verification: {
    google: "gWru1tXVNVr--phsNN1YCa53uJoAgx53ut5k2kfDCXo",
    other: {
      "naver-site-verification": "62e5066af0d7a38be59c4ad514534d0e43e85d9b",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#00e5a0",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // env(safe-area-inset-bottom) requires this on iOS
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${syne.variable} ${ibmPlexMono.variable} ${notoSansKR.variable}`}
    >
      <body style={{ background: "var(--bg)" }}>
        <LocaleProvider locale={locale}>
          <ServiceWorkerRegistration />
          <VersionBanner />
          <PullToRefresh />
          <PWAInstallPrompt />
          <div className="lg:flex lg:min-h-screen">
            <DesktopSidebar />
            <div className="flex-1 min-w-0 lg:ml-64">
              {children}
            </div>
          </div>
          <BottomNav />
          {/* Google AdSense */}
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1075509322890486"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        </LocaleProvider>
      </body>
    </html>
  );
}
