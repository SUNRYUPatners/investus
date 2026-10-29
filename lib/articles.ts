// Bilingual, crawlable article index built on top of the editorial report seeds.
//
// Goal: give every substantive report its own stable, server-renderable URL in
// each language (English default at /news/[slug], Korean at /ko/news/[slug]) so
// that search engines — and Google AdSense's reviewer — can discover real,
// unique content instead of a single 6.6MB client bundle.
//
// The source of truth is still `lib/reports.ts` (the working fallback). A future
// migration can move storage to a Supabase `articles` table; see
// `supabase/migrations/*_articles.sql` and `getArticlesFromDb()` below, which is
// intentionally a no-op placeholder until the table exists.

import { CATEGORY_STYLE, SEED_REPORTS, REPORT_TICKERS, type Report } from "./reports";
import type { HomeArticleCard } from "./homeArticleCard";

export type { HomeArticleCard } from "./homeArticleCard";

export type ArticleLocale = "en" | "ko";

export type ArticleSource = {
  label: string;
  url: string;
};

export type Article = {
  slug: string;
  id: string;
  /** Primary ticker / subject used for grouping and navigation. */
  ticker: string | null;
  tickers: string[];
  category: Report["category"];
  categoryColor: Report["categoryColor"];
  /** ISO date (YYYY-MM-DD) derived from the report date. */
  date: string;
  /** Human timestamp as authored (KST), e.g. "2026.10.29 07:27". */
  displayDate: string;
  images: string[];
  imagesEn: string[];
  /** True when a genuine English translation exists (not a Korean fallback). */
  hasEnglish: boolean;
  ko: { title: string; summary: string; body: string };
  en: { title: string; summary: string; body: string };
  sources: ArticleSource[];
};

// ── Official primary-source links (E-E-A-T) ──────────────────────────────────
// Story-specific press/regulator citations live in STORY_SOURCES. Every article
// also links to the authoritative IR / regulatory source for its ticker.
const TICKER_SOURCES: Record<string, ArticleSource[]> = {
  TSLA: [
    { label: "Tesla Investor Relations", url: "https://ir.tesla.com/" },
    { label: "Tesla SEC filings (EDGAR)", url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=TSLA&type=10-K" },
  ],
  SPCX: [
    { label: "SpaceX — Official site", url: "https://www.spacex.com/" },
  ],
  NVDA: [
    { label: "NVIDIA Investor Relations", url: "https://investor.nvidia.com/" },
    { label: "NVIDIA SEC filings (EDGAR)", url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=NVDA&type=10-K" },
  ],
  MSFT: [{ label: "Microsoft Investor Relations", url: "https://www.microsoft.com/en-us/investor" }],
  GOOGL: [{ label: "Alphabet Investor Relations", url: "https://abc.xyz/investor/" }],
  META: [{ label: "Meta Investor Relations", url: "https://investor.atmeta.com/" }],
  AMZN: [{ label: "Amazon Investor Relations", url: "https://ir.aboutamazon.com/" }],
  AAPL: [{ label: "Apple Investor Relations", url: "https://investor.apple.com/" }],
  AMD: [{ label: "AMD Investor Relations", url: "https://ir.amd.com/" }],
  PLTR: [{ label: "Palantir Investor Relations", url: "https://investors.palantir.com/" }],
};

const SEC_FULLTEXT: ArticleSource = {
  label: "SEC EDGAR full-text search",
  url: "https://efts.sec.gov/LATEST/search-index?q=",
};

/** Story-specific citations (press, regulators, IR). Prepended ahead of ticker IR links. */
const STORY_SOURCES: Record<string, ArticleSource[]> = {
  "seed-2143": [
    { label: "Electrek — Tesla Semi fire on I-880 (Oct. 28, 2026)", url: "https://electrek.co/2026/10/28/tesla-semi-fire-i-880-hayward-no-crash/" },
    { label: "The Drive — Pilot/Flying J 1.2 MW Megachargers (Oct. 28, 2026)", url: "https://www.thedrive.com/news/tesla-semis-are-now-charging-at-mainstream-truck-stops" },
    { label: "Tesla Investor Relations", url: "https://ir.tesla.com/" },
  ],
  "seed-2144": [
    { label: "The Guardian — Southaven home buyouts and noise suit (Oct. 28, 2026)", url: "https://www.theguardian.com/us-news/2026/oct/28/datacenter-noise-lawsuit-elon-musk-mississippi" },
    { label: "Forbes — xAI / SpaceXSI buyout offers (Oct. 28, 2026)", url: "https://www.forbes.com/sites/maryroeloffs/2026/10/28/xai-offers-home-buyouts-in-mississippi-to-quash-data-center-lawsuit/" },
    { label: "SpaceX — Official site", url: "https://www.spacex.com/" },
  ],
  "seed-2145": [
    { label: "Electrek — Tesla confirms Vietnam entry (Oct. 28, 2026)", url: "https://electrek.co/2026/10/28/tesla-vietnam-entry-vinfast/" },
    { label: "Tesla Investor Relations", url: "https://ir.tesla.com/" },
  ],
};

// English display names for the Musk-ecosystem + major tickers.
const TICKER_NAME_EN: Record<string, string> = {
  TSLA: "Tesla", SPCX: "SpaceX", NVDA: "NVIDIA", MSFT: "Microsoft",
  GOOGL: "Alphabet", GOOG: "Alphabet", META: "Meta", AMZN: "Amazon",
  AAPL: "Apple", AMD: "AMD", PLTR: "Palantir", BTC: "Bitcoin",
};

const TICKER_NAME_KO: Record<string, string> = {
  TSLA: "테슬라", SPCX: "스페이스X", NVDA: "엔비디아", MSFT: "마이크로소프트",
  GOOGL: "알파벳", GOOG: "알파벳", META: "메타", AMZN: "아마존",
  AAPL: "애플", AMD: "AMD", PLTR: "팔란티어", BTC: "비트코인",
};

export function tickerName(ticker: string | null, locale: ArticleLocale): string {
  if (!ticker) return locale === "en" ? "Markets" : "마켓";
  const table = locale === "en" ? TICKER_NAME_EN : TICKER_NAME_KO;
  return table[ticker] ?? ticker;
}

function dateKeyOf(r: Report): string {
  const raw = (r.updatedAt ?? r.date ?? "").trim();
  const day = raw.split(" ")[0].replace(/\./g, "-");
  // Normalize e.g. "2026-10-29" (already) or "2026-10-29" from "2026.10.29".
  const m = day.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!m) return "";
  const [, y, mo, d] = m;
  return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

function primaryTicker(r: Report): string | null {
  const mapped = REPORT_TICKERS[r.id];
  if (!mapped || mapped.length === 0) return null;
  return mapped.find((t) => t !== "MACRO") ?? mapped[0] ?? null;
}

function isSnapshot(r: Report): boolean {
  return (
    r.subject === "한장요약" ||
    (r.subject?.includes("한장") ?? false) ||
    r.title.includes("한장요약") ||
    r.title.includes("한장 요약")
  );
}

function hasRealEnglish(r: Report): boolean {
  const en = (r.bodyEn ?? "").trim();
  if (en.length < 60) return false;
  if (/^see korean/i.test(en)) return false;
  return true;
}

function slugBase(r: Report): string {
  if (isSnapshot(r)) return "daily-brief";
  const t = primaryTicker(r);
  if (t) return t.toLowerCase();
  switch (r.category) {
    case "매크로": return "macro";
    case "섹터": return "sector";
    case "가상자산": return "crypto";
    case "안전자산": return "safe-haven";
    case "한국시장": return "korea";
    default: return "report";
  }
}

function numericId(id: string): string {
  const m = id.match(/(\d+)/g);
  return m ? m[m.length - 1] : id.replace(/[^a-z0-9]+/gi, "");
}

export function articleSlug(r: Report): string {
  const date = dateKeyOf(r);
  return `${slugBase(r)}-${date}-${numericId(r.id)}`.replace(/--+/g, "-");
}

function enTitle(r: Report): string {
  if (r.titleEn && r.titleEn.trim().length > 0) return r.titleEn.trim();
  if (isSnapshot(r)) {
    const t = TICKER_NAME_EN[primaryTicker(r) ?? ""] ?? "Tesla, SpaceX & the Musk ecosystem";
    return `Daily market brief — ${t} and global markets (${dateKeyOf(r)})`;
  }
  return r.title;
}

function buildArticle(r: Report): Article {
  const tickers = REPORT_TICKERS[r.id] ?? [];
  const pt = primaryTicker(r);
  const hasEnglish = hasRealEnglish(r);
  const sources: ArticleSource[] = [];
  const seen = new Set<string>();
  const push = (list: ArticleSource[]) => {
    for (const s of list) {
      if (!s?.url || seen.has(s.url)) continue;
      seen.add(s.url);
      sources.push(s);
    }
  };
  if (STORY_SOURCES[r.id]) push(STORY_SOURCES[r.id]);
  if (pt && TICKER_SOURCES[pt]) push(TICKER_SOURCES[pt]);
  for (const t of tickers) {
    if (t !== pt && TICKER_SOURCES[t]) push(TICKER_SOURCES[t]);
  }
  if (sources.length === 0) push([SEC_FULLTEXT]);

  return {
    slug: articleSlug(r),
    id: r.id,
    ticker: pt,
    tickers: tickers.filter((t) => t !== "MACRO"),
    category: r.category,
    categoryColor: r.categoryColor,
    date: dateKeyOf(r),
    displayDate: r.updatedAt ?? r.date,
    images: r.images ?? [],
    imagesEn: r.imagesEn ?? r.images ?? [],
    hasEnglish,
    ko: { title: r.title, summary: r.summary, body: r.body },
    en: {
      title: enTitle(r),
      summary: r.summaryEn?.trim() || r.summary,
      body: hasEnglish ? (r.bodyEn as string) : r.body,
    },
    sources: sources.slice(0, 6),
  };
}

function isSubstantive(r: Report): boolean {
  if (!dateKeyOf(r)) return false;
  const body = (r.body ?? "").trim();
  // Exclude image-only cards with no textual body (nothing to index).
  if (r.imageOnly && body.length < 200) return false;
  return body.length >= 300;
}

let _cache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (_cache) return _cache;
  const seen = new Set<string>();
  const list: Article[] = [];
  for (const r of SEED_REPORTS) {
    if (!isSubstantive(r)) continue;
    const a = buildArticle(r);
    if (seen.has(a.slug)) continue;
    seen.add(a.slug);
    list.push(a);
  }
  list.sort((a, b) => (b.date < a.date ? -1 : b.date > a.date ? 1 : 0));
  _cache = list;
  return list;
}

export function getArticleBySlug(slug: string): Article | null {
  return getAllArticles().find((a) => a.slug === slug) ?? null;
}

/** Articles grouped newest-first, optionally filtered to a ticker. */
export function getArticles(opts?: { ticker?: string; limit?: number }): Article[] {
  let list = getAllArticles();
  if (opts?.ticker) {
    const t = opts.ticker.toUpperCase();
    list = list.filter((a) => a.tickers.includes(t) || a.ticker === t);
  }
  if (opts?.limit) list = list.slice(0, opts.limit);
  return list;
}

export function pickText(a: Article, locale: ArticleLocale) {
  return locale === "en" ? a.en : a.ko;
}

function toHomeCard(a: Article, locale: ArticleLocale): HomeArticleCard {
  const t = pickText(a, locale);
  const style = CATEGORY_STYLE[a.categoryColor];
  return {
    slug: a.slug,
    date: a.date,
    displayDate: a.displayDate,
    tickerLabel: a.ticker ? tickerName(a.ticker, locale) : null,
    category: a.category,
    categoryBg: style.bg,
    categoryFg: style.color,
    title: t.title,
    excerpt: t.summary,
  };
}

export function getHomeArticleCards(locale: ArticleLocale): HomeArticleCard[] {
  return getAllArticles().map((a) => toHomeCard(a, locale));
}

const MUSK_TICKERS = new Set(["TSLA", "SPCX"]);
const MUSK_KW =
  /tsla|tesla|spacex|spcx|xai|starlink|neuralink|boring|musk|테슬라|스페이스\s?x|머스크|스타링크|뉴럴링크|보링|사이버캡|옵티머스|스타십|cybercab|optimus|starship|grok/i;

export function isMuskEcosystemArticle(a: Article): boolean {
  if (a.ticker && MUSK_TICKERS.has(a.ticker.toUpperCase())) return true;
  if (a.tickers.some((t) => MUSK_TICKERS.has(t.toUpperCase()))) return true;
  const hay = [a.ticker, ...a.tickers, a.ko.title, a.en.title, a.ko.summary, a.en.summary].join(" ");
  return MUSK_KW.test(hay);
}

export function getMuskEcosystemCards(locale: ArticleLocale): HomeArticleCard[] {
  return getAllArticles()
    .filter(isMuskEcosystemArticle)
    .map((a) => toHomeCard(a, locale));
}

export function getKindCards(kind: NewsKind, locale: ArticleLocale): HomeArticleCard[] {
  return getArticlesByKind(kind).map((a) => toHomeCard(a, locale));
}

/** Kind-filtered owner articles, still restricted to the Musk ecosystem. */
export function getMuskKindCards(kind: NewsKind, locale: ArticleLocale): HomeArticleCard[] {
  return getArticlesByKind(kind)
    .filter(isMuskEcosystemArticle)
    .map((a) => toHomeCard(a, locale));
}

export function getTickerCards(ticker: string, locale: ArticleLocale, limit?: number): HomeArticleCard[] {
  return getArticles({ ticker, limit }).map((a) => toHomeCard(a, locale));
}

export type NewsKind = "analysis" | "earnings" | "spacex";

export function getArticlesByKind(kind: NewsKind, limit?: number): Article[] {
  const all = getAllArticles();
  let list: Article[];
  switch (kind) {
    case "analysis":
      list = all.filter((a) => ["종목분석", "섹터", "매크로"].includes(a.category));
      break;
    case "earnings":
      list = all.filter(
        (a) => a.category === "어닝" || /earnings|어닝|실적/i.test(a.ko.title + a.en.title),
      );
      break;
    case "spacex":
      list = all.filter((a) => a.ticker === "SPCX" || a.tickers.includes("SPCX"));
      break;
  }
  return limit ? list.slice(0, limit) : list;
}

/** Parse a report body into renderable sections (heading + lines). */
export type ArticleSection = { heading: string | null; lines: string[] };

export function parseBody(body: string): ArticleSection[] {
  const sections: ArticleSection[] = [];
  let current: ArticleSection | null = null;
  for (const rawLine of body.split("\n")) {
    const line = rawLine.replace(/\s+$/g, "");
    const isHeading = line.startsWith("■");
    if (isHeading) {
      if (current) sections.push(current);
      current = { heading: line.replace(/^■\s*/, "").trim(), lines: [] };
      continue;
    }
    if (!current) current = { heading: null, lines: [] };
    current.lines.push(line);
  }
  if (current) sections.push(current);
  // Trim trailing publisher signature lines handled by caller.
  return sections;
}

// ── Optional Supabase-backed source (future migration) ───────────────────────
// Kept as an explicit placeholder so the DB path and the fallback live together.
// When the `articles` table is populated, implement this to merge DB rows with
// the seed fallback. Until then the seeds are authoritative.
export async function getArticlesFromDb(): Promise<Article[] | null> {
  return null;
}
