/**
 * US regular session: Mon–Fri 09:30–16:00 EST
 * Outside these hours → market closed → serve cache, skip API fetch
 */
export function isMarketOpen(): boolean {
  const now  = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  const day  = now.getDay();
  if (day === 0 || day === 6) return false;
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= 9 * 60 + 30 && mins < 16 * 60;
}
