/**
 * US regular session: Mon–Fri 09:30–16:00 ET, excluding NYSE holidays
 */

// NYSE observed holidays — full-day closures only
const NYSE_HOLIDAYS = new Set([
  // 2025
  "2025-01-01", "2025-01-20", "2025-02-17", "2025-04-18",
  "2025-05-26", "2025-06-19", "2025-07-04", "2025-09-01",
  "2025-11-27", "2025-12-25",
  // 2026
  "2026-01-01", "2026-01-19", "2026-02-16", "2026-04-03",
  "2026-05-25", // Memorial Day
  "2026-06-19", "2026-07-03", "2026-09-07",
  "2026-11-26", "2026-12-25",
  // 2027
  "2027-01-01", "2027-01-18", "2027-02-15", "2027-03-26",
  "2027-05-31", "2027-06-18", "2027-07-05", "2027-09-06",
  "2027-11-25", "2027-12-24",
]);

export function isMarketOpen(): boolean {
  const now = new Date();

  // Interpret current moment as an ET-timezone Date object
  // (trick: toLocaleString gives ET wall-clock time → parse as local → getDay/getHours are now ET)
  const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const dow = et.getDay(); // 0=Sun, 6=Sat
  if (dow === 0 || dow === 6) return false;

  // Holiday check — build YYYY-MM-DD from ET components
  const y = et.getFullYear();
  const mo = String(et.getMonth() + 1).padStart(2, "0");
  const d  = String(et.getDate()).padStart(2, "0");
  if (NYSE_HOLIDAYS.has(`${y}-${mo}-${d}`)) return false;

  // Trading hours: 09:30–16:00 ET
  const mins = et.getHours() * 60 + et.getMinutes();
  return mins >= 9 * 60 + 30 && mins < 16 * 60;
}
