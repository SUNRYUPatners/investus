import type { Metadata, Viewport } from "next";
import { Syne, IBM_Plex_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { PullToRefresh } from "@/components/PullToRefresh";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { LocaleProvider } from "@/contexts/LocaleContext";
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
  description: "미국 주식 시장 실시간 정보 · S&P500 · NASDAQ · DOW",
  metadataBase: new URL("https://investus.kr"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Investus",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#00e5a0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
          <PullToRefresh />
          <PWAInstallPrompt />
          <div className="lg:flex lg:min-h-screen">
            <DesktopSidebar />
            <div className="flex-1 min-w-0 lg:ml-64">
              {children}
            </div>
          </div>
          <BottomNav />
          {/* Google AdSense — pub ID 설정 시 자동 활성화 */}
          {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID && (
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          )}
        </LocaleProvider>
      </body>
    </html>
  );
}
