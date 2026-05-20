import type { MetadataRoute } from "next";

const HOT_SYMBOLS = ["NVDA","TSLA","AAPL","MSFT","AMZN","GOOGL","META","AVGO","AMD","BRK-B"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.investus.kr";
  return [
    { url: base,              lastModified: new Date(), changeFrequency: "always",  priority: 1 },
    { url: `${base}/search`,  lastModified: new Date(), changeFrequency: "always",  priority: 0.9 },
    { url: `${base}/insight`, lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/wall`,    lastModified: new Date(), changeFrequency: "always",  priority: 0.8 },
    { url: `${base}/education`, lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/more`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...HOT_SYMBOLS.map((sym) => ({
      url: `${base}/stock/${sym}`,
      lastModified: new Date(),
      changeFrequency: "always" as const,
      priority: 0.8,
    })),
  ];
}
