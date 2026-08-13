import { SEED_REPORTS, type Report } from "@/lib/reports";
import { kstTodayKey, reportDateKey } from "@/lib/subscription";

export type MorningBriefing = {
  dateKey: string;
  headline: string;
  bullets: string[];
  reportLinks: { id: string; title: string; summary: string }[];
};

/** 오늘(KST) 리포트로 장전 브리핑 카드 데이터 생성 */
export function buildMorningBriefing(now = new Date()): MorningBriefing | null {
  const dateKey = kstTodayKey(now);
  const today = SEED_REPORTS.filter((r) => reportDateKey(r) === dateKey);
  if (today.length === 0) return null;

  const pinned = today.find((r) => r.isPinned || r.subject === "한장요약");
  const rest = today
    .filter((r) => r.id !== pinned?.id)
    .sort((a, b) => (b.updatedAt ?? b.date).localeCompare(a.updatedAt ?? a.date));

  const headline = pinned
    ? shorten(pinned.summary || pinned.title, 120)
    : shorten(rest[0]?.summary || rest[0]?.title || "오늘의 시장을 확인하세요", 120);

  const pick = [pinned, ...rest].filter(Boolean).slice(0, 4) as Report[];
  const bullets = pick
    .map((r) => {
      const t = (r.subject || r.title).replace(/^20\d{2}[.\-/]\d{2}[.\-/]\d{2}\s*/, "");
      return shorten(t, 64);
    })
    .filter(Boolean)
    .slice(0, 3);

  const reportLinks = pick.slice(0, 3).map((r) => ({
    id: r.id,
    title: r.title.length > 72 ? `${r.title.slice(0, 70)}…` : r.title,
    summary: shorten(r.summary, 100),
  }));

  return { dateKey, headline, bullets, reportLinks };
}

function shorten(s: string, max: number): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}
