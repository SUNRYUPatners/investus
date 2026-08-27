import { getNewsForMarket } from "@/lib/markets/news";
import { SAFE_CRYPTO_TOP5, SAFE_PHYSICAL_TOP5, getMarketConfig } from "@/lib/markets/config";
import { kvGetDetail, kvSetDetailEx } from "@/lib/kv";
import type { SessionBriefing } from "@/lib/morningBriefing";
import { getReportsForMarket } from "@/lib/markets/reports";
import { reportDateKey } from "@/lib/subscription";
import type { MarketId } from "@/lib/markets/types";

const KV_PREFIX = "daily-briefing:";
const KV_TTL = 7 * 24 * 3600;
const NINE_AM_MIN = 9 * 60;

export type DailyBriefMarket = Extract<MarketId, "safe" | "kr-re">;

type BriefItem = {
  symbol: string;
  title: string;
  summary: string;
  body: string;
};

type DailyBriefStored = {
  market: DailyBriefMarket;
  dateKey: string;
  headline: string;
  items: BriefItem[];
  generatedAt: number;
};

function kstDateAndMinutes(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const y = parts.find((p) => p.type === "year")?.value ?? "2026";
  const m = parts.find((p) => p.type === "month")?.value ?? "01";
  const d = parts.find((p) => p.type === "day")?.value ?? "01";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const h = hour === 24 ? 0 : hour;
  return { dateKey: `${y}-${m}-${d}`, minutes: h * 60 + minute };
}

function shiftDateKey(dateKey: string, days: number): string {
  const t = Date.parse(`${dateKey}T12:00:00+09:00`);
  const d = new Date(t);
  d.setDate(d.getDate() + days);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/** 9시 전이면 전날 브리핑, 9시 이후면 오늘 브리핑 */
export function activeDailyBriefDateKey(now = new Date()): string {
  const { dateKey, minutes } = kstDateAndMinutes(now);
  if (minutes < NINE_AM_MIN) return shiftDateKey(dateKey, -1);
  return dateKey;
}

function canGenerateForDate(dateKey: string, now = new Date()): boolean {
  const { dateKey: today, minutes } = kstDateAndMinutes(now);
  if (dateKey < today) return true;
  if (dateKey === today && minutes >= NINE_AM_MIN) return true;
  return false;
}

function kvKey(market: DailyBriefMarket, dateKey: string) {
  return `${KV_PREFIX}${market}:${dateKey}`;
}

function shorten(s: string, max: number): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

function extractJson(text: string): {
  headlineKo?: string;
  items?: BriefItem[];
} | null {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    return JSON.parse(m[0]) as ReturnType<typeof extractJson>;
  } catch {
    return null;
  }
}

function marketMeta(market: DailyBriefMarket) {
  if (market === "safe") {
    const crypto = SAFE_CRYPTO_TOP5.map((u) => u.name).join(" · ");
    const physical = SAFE_PHYSICAL_TOP5.map((u) => u.name).join(" · ");
    return {
      labelKo: "아침 9시 브리핑",
      labelEn: "9 AM brief",
      focus: `가상화폐: ${crypto} / 현물: ${physical}`,
      topics: [...SAFE_CRYPTO_TOP5, ...SAFE_PHYSICAL_TOP5].map((u) => u.name),
      promptHint:
        "전일 밤~당일 9시(KST)까지 쌓인 뉴스를 모아 아침 브리핑으로 정리. 금리·달러·ETF 수급·지정학 변수를 함께 짚어라.",
    };
  }
  return {
    labelKo: "아침 9시 브리핑",
    labelEn: "9 AM brief",
    focus: "서울·수도권 매매·전세 · 정부 주택·세제 정책 · DSR",
    topics: ["서울 매매", "서울 전세", "수도권", "정책", "전세대출", "재건축"],
    promptHint:
      "전일 밤~당일 9시(KST)까지 쌓인 부동산·정책 뉴스를 모아 아침 브리핑으로 정리. 실수요·투자 수요를 구분해 짚어라.",
  };
}

function storedToSession(stored: DailyBriefStored): SessionBriefing {
  const meta = marketMeta(stored.market);
  return {
    phase: "pre",
    dateKey: stored.dateKey,
    source: "session-news",
    labelKo: meta.labelKo,
    labelEn: meta.labelEn,
    headline: stored.headline,
    bullets: stored.items.slice(0, 3).map((it) => shorten(`${it.symbol} · ${it.title}`, 72)),
    reports: stored.items.map((it, i) => ({
      id: `daily-${stored.market}-${stored.dateKey}-${i}`,
      title: `${it.symbol} · ${it.title}`,
      summary: it.summary,
      body: it.body,
    })),
  };
}

function buildFromReports(market: DailyBriefMarket, dateKey: string): SessionBriefing | null {
  const list = getReportsForMarket(market);
  if (list.length === 0) return null;

  let best = "";
  for (const r of list) {
    const k = reportDateKey(r);
    if (k && k > best) best = k;
  }
  const targetKey = best || dateKey;
  const dayReports = list.filter((r) => reportDateKey(r) === targetKey);
  if (dayReports.length === 0) return null;

  const pinned = dayReports.find((r) => r.isPinned || r.subject === "한장요약");
  const rest = dayReports.filter((r) => r.id !== pinned?.id);
  const pick = [pinned, ...rest].filter((r): r is NonNullable<typeof r> => !!r).slice(0, 5);

  const headline = pinned
    ? shorten(pinned.summary || pinned.title, 140)
    : shorten(rest[0]?.summary || rest[0]?.title || "", 140);

  const meta = marketMeta(market);
  return {
    phase: "pre",
    dateKey: targetKey,
    source: "reports",
    labelKo: meta.labelKo,
    labelEn: meta.labelEn,
    headline: headline || "오늘 아침 9시 핵심을 확인하세요",
    bullets: pick
      .map((r) => shorten((r.subject || r.title).replace(/^20\d{2}[.\-/]\d{2}[.\-/]\d{2}\s*/, ""), 72))
      .slice(0, 3),
    reports: pick.slice(0, 4).map((r) => ({
      id: r.id,
      title: r.title,
      summary: r.summary,
      body: r.body || "",
      titleEn: r.titleEn,
      summaryEn: r.summaryEn,
      bodyEn: r.bodyEn,
      imageOnly: r.imageOnly,
      images: r.images,
      imagesEn: r.imagesEn,
    })),
  };
}

function fallbackFromNews(
  market: DailyBriefMarket,
  dateKey: string,
  headlines: string[],
): DailyBriefStored | null {
  if (headlines.length === 0) return null;
  const topics = marketMeta(market).topics;
  const items: BriefItem[] = headlines.slice(0, 6).map((title, i) => ({
    symbol: topics[i % topics.length] ?? getMarketConfig(market).labelKo,
    title: shorten(title, 72),
    summary: shorten(title, 180),
    body: `아침 9시 브리핑 — 전일~당일 9시 뉴스 헤드라인 기준. ${title}`,
  }));
  return {
    market,
    dateKey,
    headline: shorten(headlines[0], 100),
    items,
    generatedAt: Date.now(),
  };
}

async function loadStored(market: DailyBriefMarket, dateKey: string): Promise<DailyBriefStored | null> {
  const raw = await kvGetDetail(kvKey(market, dateKey));
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.dateKey !== "string" || !Array.isArray(o.items)) return null;
  return o as DailyBriefStored;
}

async function saveStored(stored: DailyBriefStored): Promise<void> {
  await kvSetDetailEx(kvKey(stored.market, stored.dateKey), stored, KV_TTL);
}

async function collectNewsLines(market: DailyBriefMarket): Promise<string[]> {
  try {
    const news = await getNewsForMarket(market);
    return news.map((n) => n.title).filter(Boolean).slice(0, 12);
  } catch {
    return [];
  }
}

async function generateWithClaude(
  market: DailyBriefMarket,
  dateKey: string,
  headlines: string[],
  apiKey: string,
): Promise<DailyBriefStored | null> {
  const meta = marketMeta(market);
  const newsBlock = headlines.map((h, i) => `${i + 1}. ${h}`).join("\n");

  const prompt = `${dateKey} ${getMarketConfig(market).labelKo} 아침 9시(KST) 브리핑을 한국어로 작성해.

${meta.promptHint}
중점: ${meta.focus}
아래는 실제 뉴스 헤드라인이다. 없는 사실·수치를 지어내지 마라.
투자 권유·목표가·매수/매도 금지. 증권사 데스크 톤.

뉴스:
${newsBlock}

JSON만:
{"headlineKo":"핵심 한 줄(80자)","items":[{"symbol":"비트코인","titleKo":"짧은 제목","summaryKo":"2문장","bodyKo":"4~6문장"}]}
items 4~6개. symbol에는 자산·주제명을 사용.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 3500,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: AbortSignal.timeout(45_000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { content?: { text?: string }[] };
    const parsed = extractJson(data.content?.[0]?.text?.trim() ?? "");
    if (!parsed?.items?.length) return null;

    const items: BriefItem[] = (parsed.items as Array<Record<string, string>>).map((it) => ({
      symbol: it.symbol || meta.topics[0] || getMarketConfig(market).labelKo,
      title: it.titleKo || it.title || "",
      summary: it.summaryKo || it.summary || "",
      body: it.bodyKo || it.body || "",
    }));

    return {
      market,
      dateKey,
      headline: parsed.headlineKo || headlines[0] || "",
      items,
      generatedAt: Date.now(),
    };
  } catch {
    return null;
  }
}

export async function getDailyMorningBriefing(
  market: DailyBriefMarket,
  opts?: { force?: boolean; now?: Date },
): Promise<SessionBriefing | null> {
  const now = opts?.now ?? new Date();
  const dateKey = activeDailyBriefDateKey(now);
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!opts?.force) {
    const cached = await loadStored(market, dateKey);
    if (cached) return storedToSession(cached);
  }

  if (!canGenerateForDate(dateKey, now) && !opts?.force) {
    const prev = await loadStored(market, dateKey);
    if (prev) return storedToSession(prev);
    return buildFromReports(market, dateKey);
  }

  const headlines = await collectNewsLines(market);

  if (apiKey && headlines.length > 0) {
    const generated = await generateWithClaude(market, dateKey, headlines, apiKey);
    if (generated) {
      await saveStored(generated);
      return storedToSession(generated);
    }
  }

  const fromNews = fallbackFromNews(market, dateKey, headlines);
  if (fromNews) {
    await saveStored(fromNews);
    return storedToSession(fromNews);
  }

  return buildFromReports(market, dateKey);
}
