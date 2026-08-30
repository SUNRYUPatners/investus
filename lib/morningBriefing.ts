import { SEED_REPORTS, type Report } from "@/lib/reports";
import { isMarketOpen, isNYSEHoliday } from "@/lib/marketHours";
import { reportDateKey } from "@/lib/subscription";

export type BriefPhase = "pre" | "post";

export type SessionBriefing = {
  phase: BriefPhase;
  dateKey: string;
  labelKo: string;
  labelEn: string;
  headline: string;
  headlineEn?: string;
  bullets: string[];
  bulletsEn?: string[];
  /** reports = CIO 일일 리포트 / session-news = 장중 뉴스 기반 장마감 브리핑 */
  source?: "reports" | "session-news";
  reports: {
    id: string;
    title: string;
    summary: string;
    body: string;
    titleEn?: string;
    summaryEn?: string;
    bodyEn?: string;
    imageOnly?: boolean;
    images?: string[];
    imagesEn?: string[];
  }[];
};

function kstParts(now = new Date()) {
  const kst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  return {
    dow: kst.getDay(),
    mins: kst.getHours() * 60 + kst.getMinutes(),
  };
}

/**
 * 장전: 한국 평일 19:00 ~ 미국 정규장 마감(및 장중)
 * 장후: 마감 이후 ~ 다음날 한국 19:00 전, 주말·휴일
 */
export function getBriefPhase(now = new Date()): BriefPhase {
  if (isMarketOpen()) return "pre";

  const { dow, mins } = kstParts(now);
  // 한국 평일 저녁 7시부터 당일 밤 미국장 장전. 휴장일은 장후 유지.
  if (dow >= 1 && dow <= 5 && mins >= 19 * 60 && !isNYSEHoliday(now)) return "pre";
  return "post";
}

function latestDateKey(): string | null {
  let best = "";
  for (const r of SEED_REPORTS) {
    const k = reportDateKey(r);
    if (k && k > best) best = k;
  }
  return best || null;
}

function reportsForDate(dateKey: string): Report[] {
  return SEED_REPORTS.filter((r) => reportDateKey(r) === dateKey);
}

function shorten(s: string, max: number): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

/** 장전 — getOrCreatePreMarketBriefing (Tesla·SpaceX·Mag7). 장후 — getOrCreatePostMarketBriefing */
export function buildSessionBriefing(now = new Date()): SessionBriefing | null {
  const dateKey = latestDateKey();
  if (!dateKey) return null;

  const list = reportsForDate(dateKey);
  if (list.length === 0) return null;

  const phase = getBriefPhase(now);
  const pinned = list.find((r) => r.isPinned || r.subject === "한장요약");
  const rest = list
    .filter((r) => r.id !== pinned?.id)
    .sort((a, b) => (b.updatedAt ?? b.date).localeCompare(a.updatedAt ?? a.date));

  const pick = [pinned, ...rest].filter(Boolean).slice(0, 5) as Report[];

  const headline = pinned
    ? shorten(pinned.summary || pinned.title, 140)
    : shorten(rest[0]?.summary || rest[0]?.title || "", 140);
  const headlineEn = pinned
    ? shorten(pinned.summaryEn || pinned.titleEn || "", 140)
    : shorten(rest[0]?.summaryEn || rest[0]?.titleEn || "", 140);

  const bullets = pick
    .map((r) => {
      const t = (r.subject || r.title).replace(/^20\d{2}[.\-/]\d{2}[.\-/]\d{2}\s*/, "");
      return shorten(t, 72);
    })
    .filter(Boolean)
    .slice(0, 3);
  const bulletsEn = pick
    .map((r) => shorten((r.titleEn || r.subject || r.title).replace(/^20\d{2}[.\-/]\d{2}[.\-/]\d{2}\s*/, ""), 72))
    .filter(Boolean)
    .slice(0, 3);

  const reports = pick.slice(0, 4).map((r) => ({
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
  }));

  return {
    phase,
    dateKey,
    source: "reports",
    labelKo: phase === "pre" ? "장전 브리핑" : "장후 브리핑",
    labelEn: phase === "pre" ? "Pre-market brief" : "After-close brief",
    headline:
      phase === "pre"
        ? headline || "개장 전 오늘 핵심을 확인하세요"
        : headline || "마감 후 오늘 세션 핵심을 확인하세요",
    headlineEn: headlineEn || undefined,
    bullets,
    bulletsEn,
    reports,
  };
}

/** @deprecated use buildSessionBriefing */
export function buildMorningBriefing(now = new Date()) {
  return buildSessionBriefing(now);
}
