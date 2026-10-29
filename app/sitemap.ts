import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

const base = "https://www.investus.kr";

// Learn hub guides (real, substantive content).
const LEARN_SLUGS = [
  "us-stock-basics", "korea-stocks", "safe-assets", "korea-real-estate",
  "value-investing", "etf", "kr-us-etf", "reits", "options", "technical-analysis",
  "sp500", "nasdaq", "valuation", "financial-statements", "dividend", "bonds",
  "safe-haven-etfs", "commodities", "crypto", "macro-rates", "futures",
  "earnings-season", "buy-checklist", "13f-guide", "economic-calendar", "myths",
  "dca", "compound", "investing-psychology", "us-stock-tax", "korea-accounts",
  "usd-krw", "sectors", "fear-greed", "buffett-indicator", "portfolio-strategy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const articles = getAllArticles();

  // Only stock pages that actually have substantive report coverage are indexable.
  const tickerCount = new Map<string, number>();
  for (const a of articles) {
    for (const t of a.tickers) tickerCount.set(t, (tickerCount.get(t) ?? 0) + 1);
    if (a.ticker) tickerCount.set(a.ticker, (tickerCount.get(a.ticker) ?? 0) + 1);
  }
  const coveredTickers = [...tickerCount.entries()]
    .filter(([t, n]) => n >= 2 && /^[A-Z.]+$/.test(t) && t !== "SPCX")
    .map(([t]) => t);

  const newsLocalized = (path: string, priority: number, freq: MetadataRoute.Sitemap[number]["changeFrequency"]) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
    alternates: {
      languages: {
        en: `${base}${path}`,
        ko: `${base}/ko${path}`,
        "x-default": `${base}${path}`,
      },
    },
  });

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/news/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        en: `${base}/news/${a.slug}`,
        ko: `${base}/ko/news/${a.slug}`,
        "x-default": `${base}/news/${a.slug}`,
      },
    },
  }));

  return [
    { url: base, lastModified: now, changeFrequency: "always", priority: 1 },

    // Musk-ecosystem news hub (primary positioning) — localized en/ko.
    newsLocalized("/news", 0.95, "daily"),
    newsLocalized("/news/analysis", 0.85, "daily"),
    newsLocalized("/news/earnings", 0.85, "daily"),
    newsLocalized("/news/spacex", 0.85, "weekly"),
    newsLocalized("/news/about", 0.6, "monthly"),

    ...articleEntries,

    // Core app sections.
    { url: `${base}/insight`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/search`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/kr`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${base}/safe`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${base}/kr-re`, lastModified: now, changeFrequency: "daily", priority: 0.7 },

    // Trust / legal.
    { url: `${base}/more/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/more/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/more/us-investing-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/more/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/more/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/more/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/more/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },

    // Learn hub guides.
    { url: `${base}/learn`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...LEARN_SLUGS.map((slug) => ({
      url: `${base}/learn/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    // Stock pages — only tickers with real report coverage.
    ...coveredTickers.map((sym) => ({
      url: `${base}/stock/${sym}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: ["NVDA", "TSLA", "AAPL", "MSFT", "AMZN", "META", "GOOGL"].includes(sym) ? 0.8 : 0.6,
    })),
  ];
}
