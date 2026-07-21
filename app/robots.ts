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
          "/creator/",
          "/preview/",
          "/api/",
        ],
      },
    ],
    sitemap: "https://www.investus.kr/sitemap.xml",
    host: "https://www.investus.kr",
  };
}
