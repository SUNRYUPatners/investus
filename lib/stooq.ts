// Stooq commodity futures — bypasses Yahoo Finance server-side rate limiting
// Some Stooq futures are priced in cents; divide to get dollars
const STOOQ_DIVISOR: Record<string, number> = {
  "SI.F": 100,  // silver: cents/troy oz → $/troy oz
  "HG.F": 100,  // copper: cents/lb → $/lb
};

export type StooqQuote = { price: number; change: number; changePercent: number };

/**
 * Fetch a single Stooq futures quote.
 * stooqSym: Stooq ticker (CL.F, NG.F, GC.F …)
 */
export async function fetchStooqFuture(stooqSym: string): Promise<StooqQuote | null> {
  try {
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), 2_000);
    // f=sd2t2ohlcvkp → Symbol,Date,Time,Open,High,Low,Close,Volume,PrevClose
    const url = `https://stooq.com/q/l/?s=${encodeURIComponent(stooqSym)}&f=sd2t2ohlcvkp&h&e=csv`;
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/csv,*/*",
      },
      cache: "no-store",
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const text = await res.text();
    const lines = text.trim().split("\n");
    if (lines.length < 2) return null;
    const cols = lines[1].split(",");
    // cols index: 0=Symbol 1=Date 2=Time 3=Open 4=High 5=Low 6=Close 7=Volume 8=PrevClose
    const closeStr = cols[6];
    const prevStr  = cols[8];
    if (!closeStr || !prevStr || closeStr === "N/D" || prevStr === "N/D") return null;
    const divisor   = STOOQ_DIVISOR[stooqSym.toUpperCase()] ?? 1;
    const price     = parseFloat(closeStr) / divisor;
    const prevClose = parseFloat(prevStr)  / divisor;
    if (isNaN(price) || isNaN(prevClose) || prevClose === 0) return null;
    return {
      price,
      change:        price - prevClose,
      changePercent: ((price - prevClose) / prevClose) * 100,
    };
  } catch {
    return null;
  }
}
