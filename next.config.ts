import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  // scripts: Next.js + Vercel analytics + Kakao AdFit + Google AdSense
  [
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "https://*.kakaocdn.net",
    "https://*.kakao.com",
    "https://*.daumcdn.net",
    "https://pagead2.googlesyndication.com",
    "https://www.googletagservices.com",
    "https://www.google.com",
    "https://www.gstatic.com",
    "https://adservice.google.com",
    "https://googleads.g.doubleclick.net",
    "https://tpc.googlesyndication.com",
    "https://*.adtrafficquality.google",
  ].join(" "),
  // styles: Tailwind inline styles + emotion + AdSense
  "style-src 'self' 'unsafe-inline' https://www.googletagservices.com https://www.gstatic.com",
  // images: data URIs + YouTube + Unsplash + news thumbnails (various CDNs) + book covers + ads
  "img-src 'self' data: blob: https:",
  // media: YouTube embeds
  "media-src 'self'",
  // frames: YouTube + Kakao AdFit + Google AdSense
  [
    "frame-src",
    "https://www.youtube.com",
    "https://*.kakao.com",
    "https://*.kakaocdn.net",
    "https://*.daumcdn.net",
    "https://googleads.g.doubleclick.net",
    "https://tpc.googlesyndication.com",
    "https://www.google.com",
    "https://pagead2.googlesyndication.com",
    "https://*.adtrafficquality.google",
  ].join(" "),
  // connect: all API sources used by the app + AdSense
  [
    "connect-src 'self'",
    "https://finnhub.io",
    "https://api.twelvedata.com",
    "https://query1.finance.yahoo.com",
    "https://query2.finance.yahoo.com",
    "https://open.er-api.com",
    "https://api.frankfurter.app",
    "https://stooq.com",
    "https://fred.stlouisfed.org",
    "https://production.dataviz.cnn.io",
    "https://formspree.io",
    "https://*.supabase.co",
    "https://accounts.google.com",
    "https://kauth.kakao.com",
    "https://kapi.kakao.com",
    "https://*.kakaocdn.net",
    "https://adfit.kakao.com",
    "https://*.kakao.com",
    "https://pagead2.googlesyndication.com",
    "https://googleads.g.doubleclick.net",
    "https://tpc.googlesyndication.com",
    "https://adservice.google.com",
    "https://*.adtrafficquality.google",
    "https://www.google.com",
    "https://www.gstatic.com",
  ].join(" "),
  "font-src 'self' data: https://fonts.gstatic.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy",  value: CSP },
  { key: "X-Frame-Options",          value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options",   value: "nosniff" },
  { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-XSS-Protection",         value: "1; mode=block" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  turbopack: {},
  serverExternalPackages: ["@napi-rs/canvas"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "*.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      // investus.kr → www.investus.kr (네이버/구글 크롤러 canonical 통일)
      {
        source: "/:path*",
        has: [{ type: "host", value: "investus.kr" }],
        destination: "https://www.investus.kr/:path*",
        permanent: true,
      },
      // 구 경로: 투자 기초·대가 → /learn 통합 (정식 308)
      // page.tsx permanentRedirect는 soft 200을 내어 Search Console "리디렉션" 오류를 유발함
      {
        source: "/insight/basics",
        destination: "/learn",
        permanent: true,
      },
      {
        source: "/insight/basics/",
        destination: "/learn",
        permanent: true,
      },
      {
        source: "/insight/masters",
        destination: "/learn",
        permanent: true,
      },
      {
        source: "/insight/masters/",
        destination: "/learn",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // AdSense crawler must always get a plain, cacheable ads.txt
        source: "/ads.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=86400, must-revalidate" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
