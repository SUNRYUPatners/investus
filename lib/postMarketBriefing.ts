import { fetchFinnhubBatch, fetchFinnhubCompanyNews, fetchFinnhubMarketNews } from "@/lib/finnhub";
import { kvGetDetail, kvSetDetailEx } from "@/lib/kv";
import { NYSE_HOLIDAYS, toETDateString } from "@/lib/marketHours";
import type { SessionBriefing } from "@/lib/morningBriefing";
import { getAdminSupabase } from "@/lib/supabase";

const KV_PREFIX = "post-market-briefing:";
const KV_TTL = 7 * 24 * 3600;

/** Tesla · SpaceX · Magnificent 7 */
export const POST_MARKET_UNIVERSE = [
  { symbol: "TSLA", name: "Tesla" },
  { symbol: "SPCX", name: "SpaceX" },
  { symbol: "NVDA", name: "NVIDIA" },
  { symbol: "AAPL", name: "Apple" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "GOOGL", name: "Alphabet" },
  { symbol: "AMZN", name: "Amazon" },
  { symbol: "META", name: "Meta" },
] as const;

type NewsLine = { symbol: string; headline: string; summary: string; datetime: number; source: string };

type GeneratedItem = { symbol: string; title: string; summary: string; body: string };

export type PostMarketStored = {
  dateKey: string;
  headline: string;
  items: GeneratedItem[];
  generatedAt: number;
};

/** 직전 정규장 세션 날짜 (ET). 마감 전이면 전 거래일. */
export function lastCompletedSessionDate(now = new Date()): string {
  const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const pastClose = et.getHours() * 60 + et.getMinutes() >= 16 * 60;
  for (let back = 0; back < 10; back++) {
    const d = new Date(et);
    d.setDate(d.getDate() - back);
    const dow = d.getDay();
    const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (dow === 0 || dow === 6 || NYSE_HOLIDAYS.has(str)) continue;
    if (back > 0 || pastClose) return str;
  }
  return toETDateString(now);
}

function kvKey(dateKey: string) {
  return `${KV_PREFIX}${dateKey}`;
}

function asStored(raw: unknown): PostMarketStored | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.dateKey !== "string" || typeof o.headline !== "string" || !Array.isArray(o.items)) return null;
  const items = o.items.filter((it): it is GeneratedItem => {
    if (!it || typeof it !== "object") return false;
    const x = it as Record<string, unknown>;
    return typeof x.symbol === "string" && typeof x.title === "string" && typeof x.summary === "string" && typeof x.body === "string";
  });
  if (!o.headline.trim() || items.length === 0) return null;
  return {
    dateKey: o.dateKey,
    headline: o.headline,
    items,
    generatedAt: typeof o.generatedAt === "number" ? o.generatedAt : Date.now(),
  };
}

async function loadStored(dateKey: string): Promise<PostMarketStored | null> {
  const fromKv = asStored(await kvGetDetail(kvKey(dateKey)));
  if (fromKv) return fromKv;
  try {
    const sb = getAdminSupabase();
    const { data, error } = await sb.from("app_kv").select("value").eq("key", kvKey(dateKey)).maybeSingle();
    if (!error && data?.value) return asStored(data.value);
  } catch { /* ignore */ }
  return null;
}

async function saveStored(payload: PostMarketStored): Promise<void> {
  const key = kvKey(payload.dateKey);
  await kvSetDetailEx(key, payload, KV_TTL);
  try {
    const sb = getAdminSupabase();
    await sb.from("app_kv").upsert({
      key,
      value: payload,
      updated_at: new Date().toISOString(),
    });
  } catch { /* ignore */ }
}

function dayStartUnix(dateKey: string): number {
  const t = Date.parse(`${dateKey}T00:00:00-05:00`);
  return Number.isFinite(t) ? Math.floor(t / 1000) : 0;
}

async function collectSessionNews(dateKey: string): Promise<{ news: NewsLine[]; quotes: string }> {
  const from = dateKey;
  const startUnix = dayStartUnix(dateKey);
  const perSymbol = await Promise.all(
    POST_MARKET_UNIVERSE.map(async ({ symbol }) => {
      const items = await fetchFinnhubCompanyNews(symbol, from, dateKey);
      return items
        .filter((n) => n.headline)
        .slice(0, 6)
        .map((n) => ({
          symbol,
          headline: n.headline,
          summary: (n.summary || "").slice(0, 220),
          datetime: n.datetime,
          source: n.source || "",
        }));
    }),
  );

  const news: NewsLine[] = perSymbol.flat();

  const general = await fetchFinnhubMarketNews();
  const spacexRe = /\b(spacex|starship|starlink|spcx)\b/i;
  for (const n of general) {
    if (!n.headline || (n.datetime ?? 0) < startUnix) continue;
    if (!spacexRe.test(`${n.headline} ${n.summary || ""}`)) continue;
    news.push({
      symbol: "SPCX",
      headline: n.headline,
      summary: (n.summary || "").slice(0, 220),
      datetime: n.datetime,
      source: n.source || "",
    });
  }

  news.sort((a, b) => b.datetime - a.datetime);

  const seen = new Set<string>();
  const deduped: NewsLine[] = [];
  for (const n of news) {
    const k = n.headline.toLowerCase().replace(/\s+/g, " ").trim();
    if (seen.has(k)) continue;
    seen.add(k);
    deduped.push(n);
    if (deduped.length >= 40) break;
  }

  const quotes = await fetchFinnhubBatch(POST_MARKET_UNIVERSE.map((u) => u.symbol));
  const quoteLines = POST_MARKET_UNIVERSE.map(({ symbol, name }) => {
    const q = quotes.get(symbol);
    if (!q) return `${name}(${symbol}): n/a`;
    const sign = q.changePercent >= 0 ? "+" : "";
    return `${name}(${symbol}): ${sign}${q.changePercent.toFixed(2)}%`;
  }).join("\n");

  return { news: deduped, quotes: quoteLines };
}

function extractJson(text: string): { headline: string; items: GeneratedItem[] } | null {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const parsed = JSON.parse(m[0]) as { headline?: unknown; items?: unknown };
    if (typeof parsed.headline !== "string" || !Array.isArray(parsed.items)) return null;
    const items: GeneratedItem[] = [];
    for (const it of parsed.items) {
      if (!it || typeof it !== "object") continue;
      const x = it as Record<string, unknown>;
      if (typeof x.symbol !== "string" || typeof x.title !== "string" || typeof x.summary !== "string" || typeof x.body !== "string") continue;
      const symbol = x.symbol.toUpperCase().trim();
      if (!POST_MARKET_UNIVERSE.some((u) => u.symbol === symbol)) continue;
      items.push({
        symbol,
        title: x.title.trim(),
        summary: x.summary.trim(),
        body: x.body.trim(),
      });
    }
    if (!parsed.headline.trim() || items.length === 0) return null;
    return { headline: parsed.headline.trim(), items: items.slice(0, 8) };
  } catch {
    return null;
  }
}

async function generateWithClaude(
  dateKey: string,
  news: NewsLine[],
  quotes: string,
  apiKey: string,
): Promise<PostMarketStored | null> {
  const newsBlock = news
    .map((n) => `[${n.symbol}] ${n.headline}${n.summary ? ` — ${n.summary}` : ""} (${n.source})`)
    .join("\n");

  const prompt = `오늘(${dateKey}) 미국 정규장 마감 후 브리핑을 작성해.

우선순위: Tesla, SpaceX, Magnificent 7 (NVDA·AAPL·MSFT·GOOGL·AMZN·META).
아래는 오늘 장중(프리마켓~마감) 실제 뉴스와 당일 등락이다. 여기에 없는 사실·수치·가이던스를 지어내지 마라.
뉴스가 없는 종목은 생략. 비슷한 뉴스는 하나로 합쳐라.
투자 권유·목표가·매수/매도 금지. 한국어, 증권사 데스크 톤.

당일 등락:
${quotes}

장중 뉴스:
${newsBlock}

JSON만 출력:
{"headline":"세션 핵심 한 줄(80자 이내)","items":[{"symbol":"TSLA","title":"짧은 제목","summary":"2문장","body":"4~6문장. 뉴스 근거."}]}
items는 6~8개. Tesla·SpaceX를 앞에 두고 나머진 임팩트 순.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2200,
      messages: [{ role: "user", content: prompt }],
    }),
    signal: AbortSignal.timeout(35_000),
  });
  if (!res.ok) return null;
  const data = await res.json() as { content?: { text?: string }[] };
  const text = data.content?.[0]?.text?.trim() ?? "";
  const parsed = extractJson(text);
  if (!parsed) return null;
  return {
    dateKey,
    headline: parsed.headline,
    items: parsed.items,
    generatedAt: Date.now(),
  };
}

export function storedToBriefing(stored: PostMarketStored): SessionBriefing {
  return {
    phase: "post",
    dateKey: stored.dateKey,
    source: "session-news",
    labelKo: "장후 브리핑",
    labelEn: "After-close brief",
    headline: stored.headline,
    bullets: stored.items.slice(0, 3).map((it) => `${it.symbol} · ${it.title}`.slice(0, 72)),
    reports: stored.items.map((it, i) => ({
      id: `pm-${stored.dateKey}-${it.symbol}-${i}`,
      title: `${it.symbol} · ${it.title}`,
      summary: it.summary,
      body: it.body,
    })),
  };
}

export async function getOrCreatePostMarketBriefing(opts?: {
  force?: boolean;
  now?: Date;
}): Promise<SessionBriefing | null> {
  const dateKey = lastCompletedSessionDate(opts?.now);
  if (!opts?.force) {
    const cached = await loadStored(dateKey);
    if (cached) return storedToBriefing(cached);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const { news, quotes } = await collectSessionNews(dateKey);
  if (news.length === 0) return null;

  const generated = await generateWithClaude(dateKey, news, quotes, apiKey);
  if (!generated) return null;
  await saveStored(generated);
  return storedToBriefing(generated);
}
