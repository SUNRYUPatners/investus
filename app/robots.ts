import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/auth/",
          // /creator/[id] 공개 프로필은 색인 허용 — 대시보드/설정만 차단
          "/creator/dashboard",
          "/creator/setup",
          "/preview/",
          "/api/",
        ],
      },
    ],
    sitemap: "https://www.investus.kr/sitemap.xml",
    host: "https://www.investus.kr",
  };
}
