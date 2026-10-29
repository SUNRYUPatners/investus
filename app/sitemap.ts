import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

const base = "https://www.investus.kr";

type Entry = MetadataRoute.Sitemap[number];
type Freq = Entry["changeFrequency"];

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

// Trust / legal pages (bilingual).
const MORE_PAGES = [
  "about", "contact", "us-investing-guide", "faq", "privacy", "terms", "disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const articles = getAllArticles();

  // Bilingual entry: English default URL + ko alternate + x-default.
  const bi = (path: string, priority: number, freq: Freq, lastModified: Date = now): Entry => {
    const en = path === "/" ? `${base}/` : `${base}${path}`;
    const ko = path === "/" ? `${base}/ko` : `${base}/ko${path}`;
    return {
      url: en,
      lastModified,
      changeFrequency: freq,
      priority,
      alternates: { languages: { en, ko, "x-default": en } },
    };
  };

  // Only stock pages that actually have substantive report coverage are indexable.
  const tickerCount = new Map<string, number>();
  for (const a of articles) {
    for (const t of a.tickers) tickerCount.set(t, (tickerCount.get(t) ?? 0) + 1);
    if (a.ticker) tickerCount.set(a.ticker, (tickerCount.get(a.ticker) ?? 0) + 1);
  }
  const coveredTickers = [...tickerCount.entries()]
    .filter(([t, n]) => n >= 2 && /^[A-Z.]+$/.test(t) && t !== "SPCX")
    .map(([t]) => t);

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
    bi("/", 1, "daily"),

    // Musk-ecosystem news hub (primary positioning).
    bi("/news", 0.95, "daily"),
    bi("/news/analysis", 0.85, "daily"),
    bi("/news/earnings", 0.85, "daily"),
    bi("/news/spacex", 0.85, "weekly"),
    bi("/tesla-valuation", 0.85, "daily"),
    bi("/news/about", 0.6, "monthly"),

    ...articleEntries,

    // Core app sections.
    bi("/insight", 0.8, "daily"),
    bi("/search", 0.5, "weekly"),
    bi("/kr", 0.7, "daily"),
    bi("/safe", 0.7, "daily"),
    bi("/kr-re", 0.7, "daily"),

    // Trust / legal.
    ...MORE_PAGES.map((p) => bi(`/more/${p}`, p === "about" || p === "us-investing-guide" ? 0.7 : 0.5, "monthly")),

    // Learn hub guides.
    bi("/learn", 0.8, "weekly"),
    ...LEARN_SLUGS.map((slug) => bi(`/learn/${slug}`, 0.6, "monthly")),

    // Stock pages — only tickers with real report coverage.
    ...coveredTickers.map((sym) =>
      bi(
        `/stock/${sym}`,
        ["NVDA", "TSLA", "AAPL", "MSFT", "AMZN", "META", "GOOGL"].includes(sym) ? 0.8 : 0.6,
        "daily",
      ),
    ),
  ];
}
