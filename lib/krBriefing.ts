import { getNewsForMarket } from "@/lib/markets/news";
import { KR_TOP10 } from "@/lib/markets/config";
import { kvGetDetail, kvSetDetailEx } from "@/lib/kv";
import type { BriefPhase, SessionBriefing } from "@/lib/morningBriefing";
import { getReportsForMarket } from "@/lib/markets/reports";
import { reportDateKey } from "@/lib/subscription";

const KV_PRE = "kr-pre-briefing:";
const KV_POST = "kr-post-briefing:";
const KV_TTL = 7 * 24 * 3600;

type BriefItem = {
  symbol: string;
  title: string;
  summary: string;
  body: string;
  titleEn?: string;
  summaryEn?: string;
  bodyEn?: string;
};

type KrBriefStored = {
  dateKey: string;
  phase: BriefPhase;
  headline: string;
  headlineEn?: string;
  items: BriefItem[];
  generatedAt: number;
};

function kstParts(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const h = hour === 24 ? 0 : hour;
  return { day: dayMap[weekday] ?? 1, minutes: h * 60 + minute };
}

export function krDateKey(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/**
 * 장전: 개장 전 ~ 장중(15:30 전) — 장중 전용 브리핑 없음, 장전 내용 유지
 * 장후: 15:30 KST 이후
 */
export function getKrBriefPhase(now = new Date()): BriefPhase {
  const { day, minutes } = kstParts(now);
  if (day === 0 || day === 6) return "post";
  const closeMin = 15 * 60 + 30;
  if (minutes >= closeMin) return "post";
  return "pre";
}

function kvKey(phase: BriefPhase, dateKey: string) {
  return `${phase === "pre" ? KV_PRE : KV_POST}${dateKey}`;
}

function shorten(s: string, max: number): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

function extractJson(text: string): {
  headlineKo?: string;
  headlineEn?: string;
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

function storedToSession(stored: KrBriefStored): SessionBriefing {
  const phase = stored.phase;
  return {
    phase,
    dateKey: stored.dateKey,
    source: "session-news",
    labelKo: phase === "pre" ? "장전 브리핑" : "장후 브리핑",
    labelEn: phase === "pre" ? "Pre-market brief" : "After-close brief",
    headline: stored.headline || stored.headlineEn || "",
    headlineEn: stored.headlineEn || undefined,
    bullets: stored.items.slice(0, 3).map((it) => shorten(`${it.symbol} · ${it.title}`, 72)),
    bulletsEn: stored.items.slice(0, 3).map((it) => shorten(`${it.symbol} · ${it.titleEn || it.title}`, 72)),
    reports: stored.items.map((it, i) => ({
      id: `kr-${stored.phase}-${stored.dateKey}-${it.symbol}-${i}`,
      title: `${it.symbol} · ${it.title}`,
      summary: it.summary,
      body: it.body,
      titleEn: it.titleEn ? `${it.symbol} · ${it.titleEn}` : undefined,
      summaryEn: it.summaryEn,
      bodyEn: it.bodyEn,
    })),
  };
}

function buildFromReports(phase: BriefPhase, dateKey: string): SessionBriefing | null {
  const list = getReportsForMarket("kr");
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

  return {
    phase,
    dateKey: targetKey,
    source: "reports",
    labelKo: phase === "pre" ? "장전 브리핑" : "장후 브리핑",
    labelEn: phase === "pre" ? "Pre-market brief" : "After-close brief",
    headline:
      phase === "pre"
        ? headline || "개장 전 한국장 핵심을 확인하세요"
        : headline || "장마감 후 한국장 핵심을 확인하세요",
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

function fallbackFromNews(phase: BriefPhase, dateKey: string, headlines: string[]): KrBriefStored | null {
  if (headlines.length === 0) return null;
  const universe = KR_TOP10.slice(0, 6);
  const items: BriefItem[] = headlines.slice(0, 6).map((title, i) => {
    const u = universe[i % universe.length];
    return {
      symbol: u.name,
      title: shorten(title, 72),
      summary: shorten(title, 180),
      body: phase === "pre"
        ? `장전 뉴스 헤드라인 기준입니다. ${title}`
        : `장후 뉴스 헤드라인 기준입니다. ${title}`,
    };
  });
  return {
    dateKey,
    phase,
    headline: shorten(headlines[0], 100),
    items,
    generatedAt: Date.now(),
  };
}

async function loadStored(phase: BriefPhase, dateKey: string): Promise<KrBriefStored | null> {
  const raw = await kvGetDetail(kvKey(phase, dateKey));
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.dateKey !== "string" || !Array.isArray(o.items)) return null;
  return o as KrBriefStored;
}

async function saveStored(stored: KrBriefStored): Promise<void> {
  await kvSetDetailEx(kvKey(stored.phase, stored.dateKey), stored, KV_TTL);
}

async function collectKrNewsLines(): Promise<string[]> {
  try {
    const news = await getNewsForMarket("kr");
    return news.map((n) => n.title).filter(Boolean).slice(0, 12);
  } catch {
    return [];
  }
}

async function generateWithClaude(
  phase: BriefPhase,
  dateKey: string,
  headlines: string[],
  apiKey: string,
): Promise<KrBriefStored | null> {
  const newsBlock = headlines.map((h, i) => `${i + 1}. ${h}`).join("\n");
  const focus = KR_TOP10.map((u) => u.name).join(" · ");
  const phaseKo = phase === "pre" ? "장전(개장 전·장중에는 갱신 없음)" : "장후(당일 마감 후)";

  const prompt = `오늘(${dateKey}) 한국 증시 ${phaseKo} 브리핑을 한국어로 작성해.

시총 탑10 중심: ${focus}
아래는 실제 뉴스 헤드라인이다. 없는 사실·수치를 지어내지 마라.
투자 권유·목표가·매수/매도 금지. 증권사 데스크 톤.
${phase === "pre" ? "개장 전 체크포인트·환율·미국 마감 영향 위주." : "당일 장 마감 후 수급·섹터·시총 상위 흐름 위주."}

뉴스:
${newsBlock}

JSON만:
{"headlineKo":"핵심 한 줄(80자)","items":[{"symbol":"삼성전자","titleKo":"짧은 제목","summaryKo":"2문장","bodyKo":"4~6문장"}]}
items 4~6개. 시총 상위 종목명을 symbol에 사용.`;

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
      symbol: it.symbol || "한국장",
      title: it.titleKo || it.title || "",
      summary: it.summaryKo || it.summary || "",
      body: it.bodyKo || it.body || "",
    }));

    return {
      dateKey,
      phase,
      headline: parsed.headlineKo || headlines[0] || "",
      items,
      generatedAt: Date.now(),
    };
  } catch {
    return null;
  }
}

async function getOrCreatePhaseBriefing(
  phase: BriefPhase,
  opts?: { force?: boolean; now?: Date },
): Promise<SessionBriefing | null> {
  const now = opts?.now ?? new Date();
  const dateKey = krDateKey(now);
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!opts?.force) {
    const cached = await loadStored(phase, dateKey);
    if (cached) return storedToSession(cached);
  }

  const headlines = await collectKrNewsLines();

  if (apiKey && headlines.length > 0) {
    const generated = await generateWithClaude(phase, dateKey, headlines, apiKey);
    if (generated) {
      await saveStored(generated);
      return storedToSession(generated);
    }
  }

  const fromNews = fallbackFromNews(phase, dateKey, headlines);
  if (fromNews) {
    await saveStored(fromNews);
    return storedToSession(fromNews);
  }

  return buildFromReports(phase, dateKey);
}

export async function getKrSessionBriefing(opts?: {
  force?: boolean;
  now?: Date;
}): Promise<{ briefing: SessionBriefing | null; phase: BriefPhase }> {
  const now = opts?.now ?? new Date();
  const phase = getKrBriefPhase(now);
  const briefing = await getOrCreatePhaseBriefing(phase, opts);
  return { briefing, phase };
}
