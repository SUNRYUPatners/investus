import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  // scripts: Next.js inline scripts + Vercel analytics + Kakao AdFit
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://t1.kakaocdn.net https://adfit.kakao.com",
  // styles: Tailwind inline styles + emotion
  "style-src 'self' 'unsafe-inline'",
  // images: data URIs + YouTube + Unsplash + news thumbnails (various CDNs) + book covers
  "img-src 'self' data: blob: https:",
  // media: YouTube embeds
  "media-src 'self'",
  // frames: YouTube player + Kakao AdFit
  "frame-src https://www.youtube.com https://adfit.kakao.com https://t1.kakaocdn.net",
  // connect: all API sources used by the app
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
  ].join(" "),
  "font-src 'self' data:",
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
