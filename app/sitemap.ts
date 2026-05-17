import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://investus.kr";
  return [
    { url: base,             lastModified: new Date(), changeFrequency: "always",  priority: 1 },
    { url: `${base}/search`, lastModified: new Date(), changeFrequency: "always",  priority: 0.9 },
    { url: `${base}/insight`,lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${base}/more`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
