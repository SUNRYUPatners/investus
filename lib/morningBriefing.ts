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
  bullets: string[];
  /** reports = CIO 일일 리포트 / session-news = 장중 뉴스 기반 장마감 브리핑 */
  source?: "reports" | "session-news";
  reports: {
    id: string;
    title: string;
    summary: string;
    body: string;
    imageOnly?: boolean;
    images?: string[];
  }[];
};

function etParts(now = new Date()) {
  const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  return {
    et,
    dow: et.getDay(),
    mins: et.getHours() * 60 + et.getMinutes(),
  };
}

/**
 * 장전: 평일 08:00 ET ~ 정규장 마감 직전(및 장중) — 개장 준비·장중 참고
 * 장후: 마감 이후 ~ 다음날 08:00 ET 전, 주말·휴일
 */
export function getBriefPhase(now = new Date()): BriefPhase {
  if (isMarketOpen()) return "pre";

  const { dow, mins } = etParts(now);
  if (dow >= 1 && dow <= 5 && !isNYSEHoliday(now)) {
    // 08:00–16:00 ET: 장전(개장 직전 포함). 장중은 isMarketOpen에서 이미 pre.
    if (mins >= 8 * 60 && mins < 16 * 60) return "pre";
    if (mins >= 16 * 60) return "post";
    return "post"; // 00:00–08:00 — 전일 장후
  }
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

/** 장전 브리핑 — 최신 일자 CIO 리포트. 장마감은 getOrCreatePostMarketBriefing 사용. */
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

  const bullets = pick
    .map((r) => {
      const t = (r.subject || r.title).replace(/^20\d{2}[.\-/]\d{2}[.\-/]\d{2}\s*/, "");
      return shorten(t, 72);
    })
    .filter(Boolean)
    .slice(0, 3);

  const reports = pick.slice(0, 4).map((r) => ({
    id: r.id,
    title: r.title,
    summary: r.summary,
    body: r.body || "",
    imageOnly: r.imageOnly,
    images: r.images,
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
    bullets,
    reports,
  };
}

/** @deprecated use buildSessionBriefing */
export function buildMorningBriefing(now = new Date()) {
  return buildSessionBriefing(now);
}
