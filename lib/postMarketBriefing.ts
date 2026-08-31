import { fetchFinnhubBatch, fetchFinnhubCompanyNews, fetchFinnhubMarketNews } from "@/lib/finnhub";
import { kvGetDetail, kvSetDetailEx } from "@/lib/kv";
import { NYSE_HOLIDAYS, toETDateString } from "@/lib/marketHours";
import type { BriefPhase, SessionBriefing } from "@/lib/morningBriefing";
import { REPORT_TICKERS, SEED_REPORTS } from "@/lib/reports";
import { getAdminSupabase } from "@/lib/supabase";

const KV_TTL = 7 * 24 * 3600;

/** Tesla · SpaceX · Magnificent 7 — 장전·장후 브리핑 공통 유니버스 */
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

/** 매 브리핑에 반드시 포함 (뉴스 없어도 CIO 리포트·프리마켓 시세로 채움) */
export const MANDATORY_BRIEFING_SYMBOLS = ["SPCX"] as const;

type NewsLine = { symbol: string; headline: string; summary: string; datetime: number; source: string };

type GeneratedItem = {
  symbol: string;
  title: string;
  summary: string;
  body: string;
  titleEn?: string;
  summaryEn?: string;
  bodyEn?: string;
};

export type PostMarketStored = {
  dateKey: string;
  headline: string;
  headlineEn?: string;
  items: GeneratedItem[];
  generatedAt: number;
};

function hasHangul(s: string | undefined): boolean {
  return !!s && /[가-힣]/.test(s);
}

function asText(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

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

function kvKey(phase: BriefPhase, dateKey: string) {
  const prefix = phase === "pre" ? "pre-market-briefing" : "post-market-briefing";
  return `${prefix}:${dateKey}`;
}

/** 다음 정규장 세션 날짜 (ET). 마감 후면 다음 거래일. */
export function upcomingSessionDate(now = new Date()): string {
  const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const pastClose = et.getHours() * 60 + et.getMinutes() >= 16 * 60;
  for (let forward = 0; forward < 10; forward++) {
    const d = new Date(et);
    d.setDate(d.getDate() + forward);
    const dow = d.getDay();
    const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (dow === 0 || dow === 6 || NYSE_HOLIDAYS.has(str)) continue;
    if (forward === 0 && pastClose) continue;
    return str;
  }
  return toETDateString(now);
}

function sessionDateKey(phase: BriefPhase, now = new Date()): string {
  return phase === "pre" ? upcomingSessionDate(now) : lastCompletedSessionDate(now);
}

function parseItem(raw: unknown): GeneratedItem | null {
  if (!raw || typeof raw !== "object") return null;
  const x = raw as Record<string, unknown>;
  const symbol = asText(x.symbol).toUpperCase();
  if (!symbol) return null;
  const titleKo = asText(x.titleKo) || asText(x.title);
  const titleEn = asText(x.titleEn);
  const summaryKo = asText(x.summaryKo) || asText(x.summary);
  const summaryEn = asText(x.summaryEn);
  const bodyKo = asText(x.bodyKo) || asText(x.body);
  const bodyEn = asText(x.bodyEn);
  if (!titleKo && !titleEn) return null;
  return {
    symbol,
    title: titleKo,
    summary: summaryKo,
    body: bodyKo,
    titleEn: titleEn || undefined,
    summaryEn: summaryEn || undefined,
    bodyEn: bodyEn || undefined,
  };
}

function asStored(raw: unknown): PostMarketStored | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.dateKey !== "string" || !Array.isArray(o.items)) return null;
  const items = o.items.map(parseItem).filter((it): it is GeneratedItem => !!it);
  const headline = asText(o.headlineKo) || asText(o.headline);
  const headlineEn = asText(o.headlineEn);
  if ((!headline && !headlineEn) || items.length === 0) return null;
  return normalizeStored({
    dateKey: o.dateKey,
    headline,
    headlineEn: headlineEn || undefined,
    items,
    generatedAt: typeof o.generatedAt === "number" ? o.generatedAt : Date.now(),
  });
}

/** 한글 필드에 영어가 들어 있으면 EN 칸으로 옮긴다. */
function normalizeStored(s: PostMarketStored): PostMarketStored {
  let headline = s.headline;
  let headlineEn = s.headlineEn || "";
  if (headline && !hasHangul(headline)) {
    if (!headlineEn) headlineEn = headline;
    headline = "";
  }
  const items = s.items.map((it) => {
    let title = it.title;
    let titleEn = it.titleEn || "";
    let summary = it.summary;
    let summaryEn = it.summaryEn || "";
    let body = it.body;
    let bodyEn = it.bodyEn || "";
    if (title && !hasHangul(title)) {
      if (!titleEn) titleEn = title;
      title = "";
    }
    if (summary && !hasHangul(summary)) {
      if (!summaryEn) summaryEn = summary;
      summary = "";
    }
    if (body && !hasHangul(body)) {
      if (!bodyEn) bodyEn = body;
      body = "";
    }
    return {
      ...it,
      title,
      summary,
      body,
      titleEn: titleEn || undefined,
      summaryEn: summaryEn || undefined,
      bodyEn: bodyEn || undefined,
    };
  });
  return {
    ...s,
    headline,
    headlineEn: headlineEn || undefined,
    items,
  };
}

function needsKorean(s: PostMarketStored): boolean {
  if (!hasHangul(s.headline) && !s.items.some((it) => hasHangul(it.title))) return true;
  return s.items.some((it) => !hasHangul(it.title) && !hasHangul(it.summary));
}

function needsEnglish(s: PostMarketStored): boolean {
  if (!s.headlineEn?.trim() && !s.items.some((it) => it.titleEn?.trim())) return true;
  return s.items.some((it) => !it.titleEn?.trim() && !it.summaryEn?.trim());
}

async function loadStored(phase: BriefPhase, dateKey: string): Promise<PostMarketStored | null> {
  const key = kvKey(phase, dateKey);
  const fromKv = asStored(await kvGetDetail(key));
  if (fromKv) return fromKv;
  try {
    const sb = getAdminSupabase();
    const { data, error } = await sb.from("app_kv").select("value").eq("key", key).maybeSingle();
    if (!error && data?.value) return asStored(data.value);
  } catch { /* ignore */ }
  return null;
}

async function saveStored(phase: BriefPhase, payload: PostMarketStored): Promise<void> {
  const key = kvKey(phase, payload.dateKey);
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

const LISTED_UNIVERSE = POST_MARKET_UNIVERSE.filter((u) => u.symbol !== "SPCX");

async function collectSessionNews(
  phase: BriefPhase,
  sessionDate: string,
  now = new Date(),
): Promise<{ news: NewsLine[]; quotes: string }> {
  const from =
    phase === "pre" ? lastCompletedSessionDate(now) : sessionDate;
  const to = sessionDate;
  const startUnix = dayStartUnix(from);
  const perSymbol = await Promise.all(
    LISTED_UNIVERSE.map(async ({ symbol }) => {
      try {
        const items = await fetchFinnhubCompanyNews(symbol, from, to);
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
      } catch {
        return [] as NewsLine[];
      }
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

  const quotes = await fetchFinnhubBatch(LISTED_UNIVERSE.map((u) => u.symbol));
  const quoteLines = POST_MARKET_UNIVERSE.map(({ symbol, name }) => {
    const q = quotes.get(symbol);
    if (!q) return `${name}(${symbol}): n/a`;
    const sign = q.changePercent >= 0 ? "+" : "";
    return `${name}(${symbol}): ${sign}${q.changePercent.toFixed(2)}%`;
  }).join("\n");

  return { news: deduped, quotes: quoteLines };
}

function latestReportForSymbol(symbol: string) {
  for (const r of SEED_REPORTS) {
    const tickers = REPORT_TICKERS[r.id];
    if (tickers?.includes(symbol) || (symbol === "SPCX" && r.subject === "스페이스X")) {
      return r;
    }
  }
  return null;
}

function fallbackItemForSymbol(symbol: string, news: NewsLine[], quotes: string): GeneratedItem {
  const meta = POST_MARKET_UNIVERSE.find((u) => u.symbol === symbol);
  const name = meta?.name ?? symbol;
  const rows = news.filter((n) => n.symbol === symbol);
  if (rows.length > 0) {
    const top = rows[0];
    return {
      symbol,
      title: "",
      summary: "",
      body: "",
      titleEn: top.headline.slice(0, 72),
      summaryEn: (top.summary || top.headline).slice(0, 180),
      bodyEn: rows
        .slice(0, 3)
        .map((n) => `· ${n.headline}${n.summary ? `\n${n.summary}` : ""}`)
        .join("\n\n"),
    };
  }

  const report = latestReportForSymbol(symbol);
  if (report) {
    return {
      symbol,
      title: report.title,
      summary: report.summary,
      body: (report.body || report.summary).slice(0, 1200),
      titleEn: report.titleEn,
      summaryEn: report.summaryEn,
      bodyEn: report.bodyEn,
    };
  }

  const quoteLine = quotes.split("\n").find((l) => l.startsWith(`${name}(${symbol})`));
  const move = quoteLine?.includes("n/a") ? "" : quoteLine?.split(": ")[1] ?? "";
  const phaseHint =
    symbol === "SPCX"
      ? "스타링크·스타십·발사 일정·위성 AI 등 우주 사업 뉴스를 개장 전·마감 후마다 함께 짚습니다."
      : `${name} 관련 헤드라인이 오늘 피드에 없습니다.`;

  return {
    symbol,
    title: `${name} · ${move ? `프리/정규장 ${move}` : "오늘 헤드라인 없음"}`,
    summary: phaseHint,
    body: `${phaseHint}\n\n당일 등락: ${quoteLine || "시세 데이터 없음"}\n\n투자 판단은 공식 실적·발사·계약 공시를 기준으로 하시기 바랍니다.`,
    titleEn: `${name} · ${move ? `session ${move}` : "no headline today"}`,
    summaryEn: `SpaceX is included in every US pre/post brief alongside Mag 7 and Tesla.`,
    bodyEn: `${phaseHint}\n\nSession move: ${quoteLine || "n/a"}`,
  };
}

function ensureMandatorySymbols(
  stored: PostMarketStored,
  news: NewsLine[],
  quotes: string,
): PostMarketStored {
  const items = [...stored.items];
  const have = new Set(items.map((it) => it.symbol));

  for (const symbol of MANDATORY_BRIEFING_SYMBOLS) {
    if (have.has(symbol)) continue;
    const item = fallbackItemForSymbol(symbol, news, quotes);
    const tslaIdx = items.findIndex((it) => it.symbol === "TSLA");
    const insertAt = symbol === "SPCX" && tslaIdx >= 0 ? tslaIdx + 1 : 0;
    items.splice(insertAt, 0, item);
    have.add(symbol);
  }

  return normalizeStored({ ...stored, items: items.slice(0, 8) });
}

function storedFromNews(dateKey: string, news: NewsLine[], quotes: string): PostMarketStored | null {
  const items: GeneratedItem[] = [];
  for (const { symbol } of POST_MARKET_UNIVERSE) {
    const rows = news.filter((n) => n.symbol === symbol).slice(0, 3);
    if (rows.length === 0) continue;
    const top = rows[0];
    items.push({
      symbol,
      title: "",
      summary: "",
      body: "",
      titleEn: top.headline.slice(0, 72),
      summaryEn: (top.summary || top.headline).slice(0, 180),
      bodyEn: rows
        .map((n) => `· ${n.headline}${n.summary ? `\n${n.summary}` : ""}`)
        .join("\n\n"),
    });
    if (items.length >= 8) break;
  }
  return ensureMandatorySymbols(
    {
      dateKey,
      headline: "",
      headlineEn: items.length > 0
        ? `${dateKey} session · ${items[0].symbol} ${items[0].titleEn || ""}`.slice(0, 80)
        : `${dateKey} · Tesla · SpaceX · Mag7`,
      items,
      generatedAt: Date.now(),
    },
    news,
    quotes,
  );
}

async function loadRecentStored(phase: BriefPhase, now = new Date()): Promise<PostMarketStored | null> {
  const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  for (let back = 0; back < 10; back++) {
    const d = new Date(et);
    d.setDate(d.getDate() - back);
    const dow = d.getDay();
    const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (dow === 0 || dow === 6 || NYSE_HOLIDAYS.has(str)) continue;
    const cached = await loadStored(phase, str);
    if (cached) return cached;
  }
  return null;
}

function extractJson(text: string): { headline: string; headlineEn?: string; items: GeneratedItem[] } | null {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const parsed = JSON.parse(m[0]) as Record<string, unknown>;
    const headline = asText(parsed.headlineKo) || asText(parsed.headline);
    const headlineEn = asText(parsed.headlineEn);
    if (!Array.isArray(parsed.items)) return null;
    const items: GeneratedItem[] = [];
    for (const it of parsed.items) {
      const row = parseItem(it);
      if (!row) continue;
      if (!POST_MARKET_UNIVERSE.some((u) => u.symbol === row.symbol)) continue;
      items.push(row);
    }
    if ((!headline && !headlineEn) || items.length === 0) return null;
    return {
      headline,
      headlineEn: headlineEn || undefined,
      items: items.slice(0, 8),
    };
  } catch {
    return null;
  }
}

function mergeLang(base: PostMarketStored, filled: { headline: string; headlineEn?: string; items: GeneratedItem[] }): PostMarketStored {
  const bySymbol = new Map(filled.items.map((it) => [it.symbol, it]));
  return normalizeStored({
    ...base,
    headline: filled.headline || base.headline,
    headlineEn: filled.headlineEn || base.headlineEn,
    items: base.items.map((it) => {
      const f = bySymbol.get(it.symbol);
      if (!f) return it;
      return {
        symbol: it.symbol,
        title: f.title || it.title,
        summary: f.summary || it.summary,
        body: f.body || it.body,
        titleEn: f.titleEn || it.titleEn,
        summaryEn: f.summaryEn || it.summaryEn,
        bodyEn: f.bodyEn || it.bodyEn,
      };
    }),
  });
}

async function fillMissingLang(stored: PostMarketStored, apiKey: string): Promise<PostMarketStored> {
  const needKo = needsKorean(stored);
  const needEn = needsEnglish(stored);
  if (!needKo && !needEn) return stored;

  const payload = {
    headlineKo: stored.headline,
    headlineEn: stored.headlineEn || "",
    items: stored.items.map((it) => ({
      symbol: it.symbol,
      titleKo: it.title,
      titleEn: it.titleEn || "",
      summaryKo: it.summary,
      summaryEn: it.summaryEn || "",
      bodyKo: it.body,
      bodyEn: it.bodyEn || "",
    })),
  };

  const prompt = `아래 장후 브리핑 JSON에서 비어 있는 언어 칸만 채워라.
한국어는 증권사 데스크 톤. 영어는 concise US desk English.
이미 채워진 칸은 그대로 두고, 사실·수치·종목을 바꾸거나 추가하지 마라.
JSON만 출력.

${JSON.stringify(payload)}`;

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
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return stored;
    const data = await res.json() as { content?: { text?: string }[] };
    const text = data.content?.[0]?.text?.trim() ?? "";
    const parsed = extractJson(text);
    if (!parsed) return stored;
    return mergeLang(stored, parsed);
  } catch {
    return stored;
  }
}

async function ensureBilingual(
  phase: BriefPhase,
  stored: PostMarketStored,
  apiKey?: string,
): Promise<PostMarketStored> {
  const normalized = normalizeStored(stored);
  if (!apiKey) return normalized;
  if (!needsKorean(normalized) && !needsEnglish(normalized)) return normalized;
  const filled = await fillMissingLang(normalized, apiKey);
  if (
    filled.headline !== stored.headline ||
    filled.headlineEn !== stored.headlineEn ||
    JSON.stringify(filled.items) !== JSON.stringify(stored.items)
  ) {
    await saveStored(phase, filled);
  }
  return filled;
}

async function generateWithClaude(
  phase: BriefPhase,
  dateKey: string,
  news: NewsLine[],
  quotes: string,
  apiKey: string,
): Promise<PostMarketStored | null> {
  const newsBlock = news
    .map((n) => `[${n.symbol}] ${n.headline}${n.summary ? ` — ${n.summary}` : ""} (${n.source})`)
    .join("\n");

  const phaseKo = phase === "pre" ? "개장 전(전일 마감~프리마켓)" : "마감 후(프리마켓~정규장 마감)";
  const newsWindow =
    phase === "pre"
      ? "전일 마감 이후~개장 전 뉴스와 프리/선물 시세"
      : "오늘 장중(프리마켓~마감) 실제 뉴스와 당일 등락";

  const prompt = `오늘(${dateKey}) 미국 정규장 ${phaseKo} 브리핑을 한국어와 영어로 동시에 작성해.

우선순위: Tesla, SpaceX(SPCX), Magnificent 7 (NVDA·AAPL·MSFT·GOOGL·AMZN·META).
아래는 ${newsWindow}이다. 여기에 없는 사실·수치·가이던스를 지어내지 마라.
**SpaceX(SPCX)는 뉴스가 없어도 items에 반드시 1개 포함** — 스타링크·스타십·발사·위성 AI 등 최근 맥락을 짧게 정리.
그 외 뉴스가 없는 종목은 생략. 비슷한 뉴스는 하나로 합쳐라.
투자 권유·목표가·매수/매도 금지.
한국어는 증권사 데스크 톤. 영어는 concise US desk English. 두 언어는 같은 사실이어야 한다.

당일·프리 등락:
${quotes}

뉴스:
${newsBlock}

JSON만 출력:
{"headlineKo":"세션 핵심 한 줄(80자 이내)","headlineEn":"one-line session takeaway","items":[{"symbol":"TSLA","titleKo":"짧은 제목","titleEn":"short title","summaryKo":"2문장","summaryEn":"2 sentences","bodyKo":"4~6문장. 뉴스 근거.","bodyEn":"4-6 sentences grounded in the news."}]}
items는 6~8개. Tesla·SpaceX(SPCX)를 앞에 두고 나머진 임팩트 순. SPCX는 필수.`;

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
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: AbortSignal.timeout(45_000),
    });
    if (!res.ok) return null;
    const data = await res.json() as { content?: { text?: string }[] };
    const text = data.content?.[0]?.text?.trim() ?? "";
    const parsed = extractJson(text);
    if (!parsed) return null;
    return ensureMandatorySymbols(
      normalizeStored({
        dateKey,
        headline: parsed.headline,
        headlineEn: parsed.headlineEn,
        items: parsed.items,
        generatedAt: Date.now(),
      }),
      news,
      quotes,
    );
  } catch {
    return null;
  }
}

export function storedToBriefing(stored: PostMarketStored, phase: BriefPhase = "post"): SessionBriefing {
  return {
    phase,
    dateKey: stored.dateKey,
    source: "session-news",
    labelKo: phase === "pre" ? "장전 브리핑" : "장후 브리핑",
    labelEn: phase === "pre" ? "Pre-market brief" : "After-close brief",
    headline: stored.headline || stored.headlineEn || "",
    headlineEn: stored.headlineEn || undefined,
    bullets: stored.items.slice(0, 3).map((it) => `${it.symbol} · ${it.title || it.titleEn || ""}`.slice(0, 72)),
    bulletsEn: stored.items.slice(0, 3).map((it) => `${it.symbol} · ${it.titleEn || it.title || ""}`.slice(0, 72)),
    reports: stored.items.map((it, i) => ({
      id: `${phase === "pre" ? "am" : "pm"}-${stored.dateKey}-${it.symbol}-${i}`,
      title: `${it.symbol} · ${it.title || it.titleEn || ""}`,
      summary: it.summary || it.summaryEn || "",
      body: it.body || it.bodyEn || "",
      titleEn: it.titleEn ? `${it.symbol} · ${it.titleEn}` : undefined,
      summaryEn: it.summaryEn,
      bodyEn: it.bodyEn,
    })),
  };
}

async function resolveStoredBriefing(
  phase: BriefPhase,
  stored: PostMarketStored,
  apiKey: string | undefined,
  awaitLang: boolean,
): Promise<SessionBriefing> {
  const normalized = normalizeStored(stored);
  if (apiKey && (needsKorean(normalized) || needsEnglish(normalized))) {
    if (awaitLang) {
      return storedToBriefing(await ensureBilingual(phase, normalized, apiKey), phase);
    }
    void ensureBilingual(phase, normalized, apiKey);
  }
  return storedToBriefing(normalized, phase);
}

async function getOrCreateSessionBriefing(
  phase: BriefPhase,
  opts?: { force?: boolean; now?: Date; awaitLang?: boolean },
): Promise<SessionBriefing | null> {
  const now = opts?.now ?? new Date();
  const dateKey = sessionDateKey(phase, now);
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const awaitLang = opts?.awaitLang !== false;
  if (!opts?.force) {
    const cached = await loadStored(phase, dateKey);
    if (cached) return resolveStoredBriefing(phase, cached, apiKey, awaitLang);
  }

  let news: NewsLine[] = [];
  let quotes = "";
  try {
    const collected = await collectSessionNews(phase, dateKey, now);
    news = collected.news;
    quotes = collected.quotes;
  } catch {
    news = [];
  }

  if (apiKey && news.length > 0) {
    const generated = await generateWithClaude(phase, dateKey, news, quotes, apiKey);
    if (generated) {
      const bilingual = await ensureBilingual(phase, generated, apiKey);
      await saveStored(phase, bilingual);
      return storedToBriefing(bilingual, phase);
    }
  }

  const fromNews = storedFromNews(dateKey, news, quotes);
  if (fromNews) {
    const bilingual = await ensureBilingual(phase, fromNews, apiKey);
    await saveStored(phase, bilingual);
    return storedToBriefing(bilingual, phase);
  }

  const mandatoryOnly = ensureMandatorySymbols(
    {
      dateKey,
      headline: "",
      headlineEn: `${dateKey} · Tesla · SpaceX · Mag7`,
      items: [],
      generatedAt: Date.now(),
    },
    news,
    quotes,
  );
  if (mandatoryOnly.items.length > 0) {
    const bilingual = await ensureBilingual(phase, mandatoryOnly, apiKey);
    await saveStored(phase, bilingual);
    return storedToBriefing(bilingual, phase);
  }

  const recent = await loadRecentStored(phase, now);
  if (recent) return resolveStoredBriefing(phase, recent, apiKey, awaitLang);
  return null;
}

/** 장전 — Tesla·SpaceX·Mag7 뉴스 기반 (SPCX 매번 포함) */
export async function getOrCreatePreMarketBriefing(opts?: {
  force?: boolean;
  now?: Date;
  /** false면 캐시 즉시 반환(한글 번역은 백그라운드). 푸시·크론은 true 유지 */
  awaitLang?: boolean;
}): Promise<SessionBriefing | null> {
  return getOrCreateSessionBriefing("pre", opts);
}

export async function getOrCreatePostMarketBriefing(opts?: {
  force?: boolean;
  now?: Date;
  awaitLang?: boolean;
}): Promise<SessionBriefing | null> {
  return getOrCreateSessionBriefing("post", opts);
}
