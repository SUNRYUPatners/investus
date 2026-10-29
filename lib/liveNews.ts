import type { LiveNewsItem } from "./liveNewsTypes";

export type { LiveNewsItem } from "./liveNewsTypes";

type Locale = "en" | "ko";

const TTL_MS = 12 * 60_000;
const MAX_ITEMS = 40;

const RSS_UA =
  "Mozilla/5.0 (compatible; InvestusNews/1.0; +https://www.investus.kr)";

function rssUrl(locale: Locale): string {
  if (locale === "ko") {
    const q = encodeURIComponent(
      '테슬라 OR 스페이스X OR xAI OR 뉴럴링크 OR "일론 머스크" OR Tesla OR SpaceX OR "Elon Musk"',
    );
    return `https://news.google.com/rss/search?q=${q}&hl=ko&gl=KR&ceid=KR:ko`;
  }
  const q = encodeURIComponent(
    'Tesla OR SpaceX OR xAI OR Neuralink OR "Boring Company" OR "Elon Musk"',
  );
  return `https://news.google.com/rss/search?q=${q}&hl=en-US&gl=US&ceid=US:en`;
}

function stripHtml(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function normTitle(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9가-힣]+/gi, " ").trim();
}

function tag(xml: string, name: string): string {
  const href = xml.match(new RegExp(`<${name}[^>]*href=["']([^"']+)["']`, "i"));
  if (href?.[1]) return href[1].trim();
  const cdata = xml.match(
    new RegExp(`<${name}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${name}>`, "i"),
  );
  if (cdata?.[1]) return cdata[1].trim();
  const plain = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"));
  return (plain?.[1] ?? "").trim();
}

function sourceOf(block: string): string {
  const named = stripHtml(tag(block, "source"));
  if (named) return named;
  const dc = stripHtml(tag(block, "dc:creator"));
  return dc || "News";
}

function originalUrl(block: string, fallback: string): string {
  const desc = tag(block, "description");
  const href = desc.match(/href=["'](https?:\/\/[^"']+)["']/i)?.[1];
  if (href && !/news\.google\.com/i.test(href)) return href;
  return fallback;
}

function parseRssItems(xml: string): LiveNewsItem[] {
  const items: LiveNewsItem[] = [];
  const blocks = xml.split(/<item[\s>]/i).slice(1);
  for (const block of blocks.slice(0, 50)) {
    const title = stripHtml(tag(block, "title"));
    const linkRaw = stripHtml(tag(block, "link")) || tag(block, "guid");
    const link = originalUrl(block, linkRaw);
    const pubDate = tag(block, "pubDate");
    const source = sourceOf(block);
    if (!title || !link) continue;
    const cleaned = title.replace(/\s+-\s+[^-]+$/, (m) =>
      source && m.toLowerCase().includes(source.toLowerCase()) ? "" : m,
    );
    const pub = pubDate ? new Date(pubDate) : new Date();
    items.push({
      id: `rss-${normTitle(cleaned).slice(0, 48) || items.length}`,
      title: cleaned || title,
      source,
      url: link.startsWith("http") ? link : `https://${link}`,
      publishedAt: Number.isNaN(pub.getTime()) ? new Date().toISOString() : pub.toISOString(),
    });
  }
  return items;
}

function dedupe(items: LiveNewsItem[]): LiveNewsItem[] {
  const seen = new Set<string>();
  const out: LiveNewsItem[] = [];
  for (const it of items) {
    const key = normTitle(it.title) || it.url;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  out.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  return out.slice(0, MAX_ITEMS);
}

async function fetchOneRss(url: string): Promise<LiveNewsItem[]> {
  const res = await fetch(url, {
    headers: { "User-Agent": RSS_UA, Accept: "application/rss+xml, application/xml, text/xml, */*" },
    next: { revalidate: 720 },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`rss ${res.status}`);
  const xml = await res.text();
  return parseRssItems(xml);
}

async function fetchRss(locale: Locale): Promise<LiveNewsItem[]> {
  const urls = [
    rssUrl(locale),
    "https://feeds.finance.yahoo.com/rss/2.0/headline?s=TSLA&region=US&lang=en-US",
  ];
  let lastErr: unknown;
  for (const url of urls) {
    try {
      const items = await fetchOneRss(url);
      if (items.length > 0) return items;
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("empty rss");
}

async function fetchFinnhubTsla(): Promise<LiveNewsItem[]> {
  const { fetchFinnhubCompanyNews } = await import("@/lib/finnhub");
  const to = new Date();
  const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const rows = await fetchFinnhubCompanyNews("TSLA", iso(from), iso(to));
  return rows
    .filter((r) => r.headline && r.url)
    .slice(0, 15)
    .map((r) => ({
      id: `fh-${r.id}`,
      title: r.headline,
      source: r.source || "Finnhub",
      url: r.url,
      publishedAt: new Date((r.datetime || 0) * 1000).toISOString(),
    }));
}

type CacheEntry = { at: number; items: LiveNewsItem[] };
const mem = new Map<string, CacheEntry>();

export async function getLiveMuskNews(locale: Locale): Promise<LiveNewsItem[]> {
  const hit = mem.get(locale);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.items;

  const [rssSettled, fhSettled] = await Promise.allSettled([
    fetchRss(locale),
    fetchFinnhubTsla(),
  ]);
  const rss = rssSettled.status === "fulfilled" ? rssSettled.value : [];
  const extra = fhSettled.status === "fulfilled" ? fhSettled.value : [];
  const items = dedupe([...rss, ...extra]);
  if (items.length === 0) {
    if (hit?.items.length) return hit.items;
    throw new Error("no live news");
  }
  mem.set(locale, { at: Date.now(), items });
  return items;
}
