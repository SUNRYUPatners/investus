/**
 * US regular session: Mon–Fri 09:30–16:00 ET, excluding NYSE holidays.
 * DST is handled automatically via "America/New_York" timezone.
 */

// NYSE full-day closures (observed dates) — 2025–2028
export const NYSE_HOLIDAYS = new Set([
  // 2025
  "2025-01-01", // New Year's Day
  "2025-01-20", // MLK Day
  "2025-02-17", // Presidents' Day
  "2025-04-18", // Good Friday
  "2025-05-26", // Memorial Day
  "2025-06-19", // Juneteenth
  "2025-07-04", // Independence Day
  "2025-09-01", // Labor Day
  "2025-11-27", // Thanksgiving
  "2025-12-25", // Christmas
  // 2026
  "2026-01-01", // New Year's Day
  "2026-01-19", // MLK Day
  "2026-02-16", // Presidents' Day
  "2026-04-03", // Good Friday
  "2026-05-25", // Memorial Day
  "2026-06-19", // Juneteenth
  "2026-07-03", // Independence Day (observed, Jul 4 is Sat)
  "2026-09-07", // Labor Day
  "2026-11-26", // Thanksgiving
  "2026-12-25", // Christmas
  // 2027
  "2027-01-01", // New Year's Day
  "2027-01-18", // MLK Day
  "2027-02-15", // Presidents' Day
  "2027-03-26", // Good Friday
  "2027-05-31", // Memorial Day
  "2027-06-18", // Juneteenth (observed, Jun 19 is Sat)
  "2027-07-05", // Independence Day (observed, Jul 4 is Sun)
  "2027-09-06", // Labor Day
  "2027-11-25", // Thanksgiving
  "2027-12-24", // Christmas (observed, Dec 25 is Sat)
  // 2028
  "2028-01-17", // MLK Day (Jan 1 falls on Sat → no New Year's Day closure)
  "2028-02-21", // Presidents' Day
  "2028-04-14", // Good Friday
  "2028-05-29", // Memorial Day
  "2028-06-19", // Juneteenth
  "2028-07-04", // Independence Day
  "2028-09-04", // Labor Day
  "2028-11-23", // Thanksgiving
  "2028-12-25", // Christmas
]);

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
