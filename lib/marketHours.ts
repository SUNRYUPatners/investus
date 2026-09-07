/**
 * US regular session: Mon–Fri 09:30–16:00 ET, excluding NYSE holidays.
 * DST is handled automatically via "America/New_York" timezone.
 */

/** NYSE full-day closures (observed dates) — 2025–2028, with display names. */
export const NYSE_HOLIDAY_META: Record<string, { ko: string; en: string }> = {
  // 2025
  "2025-01-01": { ko: "신년", en: "New Year's Day" },
  "2025-01-20": { ko: "마틴 루터 킹 데이", en: "Martin Luther King Jr. Day" },
  "2025-02-17": { ko: "대통령의 날", en: "Presidents' Day" },
  "2025-04-18": { ko: "성금요일", en: "Good Friday" },
  "2025-05-26": { ko: "현충일", en: "Memorial Day" },
  "2025-06-19": { ko: "준틴스", en: "Juneteenth" },
  "2025-07-04": { ko: "독립기념일", en: "Independence Day" },
  "2025-09-01": { ko: "노동절", en: "Labor Day" },
  "2025-11-27": { ko: "추수감사절", en: "Thanksgiving" },
  "2025-12-25": { ko: "크리스마스", en: "Christmas" },
  // 2026
  "2026-01-01": { ko: "신년", en: "New Year's Day" },
  "2026-01-19": { ko: "마틴 루터 킹 데이", en: "Martin Luther King Jr. Day" },
  "2026-02-16": { ko: "대통령의 날", en: "Presidents' Day" },
  "2026-04-03": { ko: "성금요일", en: "Good Friday" },
  "2026-05-25": { ko: "현충일", en: "Memorial Day" },
  "2026-06-19": { ko: "준틴스", en: "Juneteenth" },
  "2026-07-03": { ko: "독립기념일(대체휴일)", en: "Independence Day (observed)" },
  "2026-09-07": { ko: "노동절", en: "Labor Day" },
  "2026-11-26": { ko: "추수감사절", en: "Thanksgiving" },
  "2026-12-25": { ko: "크리스마스", en: "Christmas" },
  // 2027
  "2027-01-01": { ko: "신년", en: "New Year's Day" },
  "2027-01-18": { ko: "마틴 루터 킹 데이", en: "Martin Luther King Jr. Day" },
  "2027-02-15": { ko: "대통령의 날", en: "Presidents' Day" },
  "2027-03-26": { ko: "성금요일", en: "Good Friday" },
  "2027-05-31": { ko: "현충일", en: "Memorial Day" },
  "2027-06-18": { ko: "준틴스(대체휴일)", en: "Juneteenth (observed)" },
  "2027-07-05": { ko: "독립기념일(대체휴일)", en: "Independence Day (observed)" },
  "2027-09-06": { ko: "노동절", en: "Labor Day" },
  "2027-11-25": { ko: "추수감사절", en: "Thanksgiving" },
  "2027-12-24": { ko: "크리스마스(대체휴일)", en: "Christmas (observed)" },
  // 2028
  "2028-01-17": { ko: "마틴 루터 킹 데이", en: "Martin Luther King Jr. Day" },
  "2028-02-21": { ko: "대통령의 날", en: "Presidents' Day" },
  "2028-04-14": { ko: "성금요일", en: "Good Friday" },
  "2028-05-29": { ko: "현충일", en: "Memorial Day" },
  "2028-06-19": { ko: "준틴스", en: "Juneteenth" },
  "2028-07-04": { ko: "독립기념일", en: "Independence Day" },
  "2028-09-04": { ko: "노동절", en: "Labor Day" },
  "2028-11-23": { ko: "추수감사절", en: "Thanksgiving" },
  "2028-12-25": { ko: "크리스마스", en: "Christmas" },
};

export const NYSE_HOLIDAYS = new Set(Object.keys(NYSE_HOLIDAY_META));

export type NyseHolidayNotice = {
  date: string;
  nameKo: string;
  nameEn: string;
  /** 0 = 오늘(ET) 휴장 */
  daysUntil: number;
  nextSessionDate: string;
};

function etYmdFromParts(et: Date, dayOffset: number): string {
  const d = new Date(et);
  d.setDate(et.getDate() + dayOffset);
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${mo}-${dd}`;
}

/** 해당 ET 일자 이후 첫 정규장 세션일. */
export function nextNyseSessionAfter(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const base = new Date(y, m - 1, d);
  for (let forward = 1; forward < 12; forward++) {
    const cand = new Date(base);
    cand.setDate(base.getDate() + forward);
    const str = `${cand.getFullYear()}-${String(cand.getMonth() + 1).padStart(2, "0")}-${String(cand.getDate()).padStart(2, "0")}`;
    const dow = cand.getDay();
    if (dow === 0 || dow === 6 || NYSE_HOLIDAYS.has(str)) continue;
    return str;
  }
  return ymd;
}

/**
 * 오늘(ET) 휴장이거나, lookaheadDays 이내 다가오는 NYSE 전일 휴장 안내.
 * 주말·연휴 전 미리 보이도록 기본 5일.
 */
export function getNyseHolidayNotice(
  now = new Date(),
  lookaheadDays = 5,
): NyseHolidayNotice | null {
  const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  for (let i = 0; i <= lookaheadDays; i++) {
    const ymd = etYmdFromParts(et, i);
    const meta = NYSE_HOLIDAY_META[ymd];
    if (!meta) continue;
    return {
      date: ymd,
      nameKo: meta.ko,
      nameEn: meta.en,
      daysUntil: i,
      nextSessionDate: nextNyseSessionAfter(ymd),
    };
  }
  return null;
}

/** Returns "YYYY-MM-DD" in Eastern Time for a given Date (or now). */
export function toETDateString(date?: Date): string {
  const d = date ?? new Date();
  const et = new Date(d.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const y  = et.getFullYear();
  const mo = String(et.getMonth() + 1).padStart(2, "0");
  const dd = String(et.getDate()).padStart(2, "0");
  return `${y}-${mo}-${dd}`;
}

/** Returns true if the given date (or today) is an NYSE holiday. */
export function isNYSEHoliday(date?: Date): boolean {
  return NYSE_HOLIDAYS.has(toETDateString(date));
}

/**
 * Seconds until the next regular-session open (09:30 ET), skipping weekends
 * and NYSE holidays. Returns 0 while the market is already open.
 *
 * Used to cap CDN cache TTL so a response generated after the close can never
 * outlive the next open — otherwise the CDN keeps serving yesterday's close
 * for hours into the new session.
 */
export function secondsUntilNextOpen(from?: Date): number {
  const now = from ?? new Date();
  if (isMarketOpen()) return 0;

  // Date whose *local* fields mirror ET wall-clock, so diffs are wall-clock diffs.
  const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));

  for (let offset = 0; offset <= 8; offset++) {
    const cand = new Date(et);
    cand.setDate(et.getDate() + offset);
    cand.setHours(9, 30, 0, 0);
    if (cand.getTime() <= et.getTime()) continue;

    const dow = cand.getDay();
    if (dow === 0 || dow === 6) continue;

    const ymd = `${cand.getFullYear()}-${String(cand.getMonth() + 1).padStart(2, "0")}-${String(cand.getDate()).padStart(2, "0")}`;
    if (NYSE_HOLIDAYS.has(ymd)) continue;

    return Math.max(0, Math.round((cand.getTime() - et.getTime()) / 1000));
  }
  return 3600;
}

/** Returns true if the US stock market is currently open (regular session). */
export function isMarketOpen(): boolean {
  const now = new Date();
  const et  = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));

  // Weekend
  const dow = et.getDay();
  if (dow === 0 || dow === 6) return false;

  // NYSE holiday
  if (isNYSEHoliday(now)) return false;

  // Regular session: 09:30–16:00 ET
  const mins = et.getHours() * 60 + et.getMinutes();
  return mins >= 9 * 60 + 30 && mins < 16 * 60;
}

function sessionCloseMsEt(ymd: string): number {
  for (const offset of ["-04:00", "-05:00"] as const) {
    const ms = Date.parse(`${ymd}T16:00:00${offset}`);
    if (Number.isFinite(ms) && toETDateString(new Date(ms)) === ymd) return ms;
  }
  return Date.parse(`${ymd}T21:00:00Z`);
}

/** 직전 완료된 정규장 세션 16:00 ET (epoch ms). */
export function lastSessionCloseMs(now = new Date()): number {
  const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const pastCloseToday = et.getHours() * 60 + et.getMinutes() >= 16 * 60;

  for (let back = pastCloseToday ? 0 : 1; back < 10; back++) {
    const d = new Date(et);
    d.setDate(d.getDate() - back);
    const ymd = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const dow = d.getDay();
    if (dow === 0 || dow === 6 || NYSE_HOLIDAYS.has(ymd)) continue;
    return sessionCloseMsEt(ymd);
  }
  return 0;
}

/**
 * 장마감 후 서빙 가능한 EOD 캐시인지.
 * 장중(16:00 ET 이전)에 저장된 스냅샷은 종가가 아니므로 무효.
 */
export function isEodCacheFresh(liveAt: number, now = new Date()): boolean {
  if (!liveAt || liveAt <= 0) return false;
  const closeMs = lastSessionCloseMs(now);
  if (!closeMs) return false;
  return liveAt >= closeMs - 120_000; // 크론 지연 2분 허용
}
