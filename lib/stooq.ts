// Stooq commodity futures — bypasses Yahoo Finance server-side rate limiting
// Some Stooq futures are priced in cents; divide to get dollars
const STOOQ_DIVISOR: Record<string, number> = {
  "SI.F": 100,  // silver: cents/troy oz → $/troy oz
  "HG.F": 100,  // copper: cents/lb → $/lb
};

export type StooqQuote = { price: number; change: number; changePercent: number };

// ── US stock batch (guru holdings fallback) ───────────────────────────────

/** Fetch multiple US stock quotes from Stooq in parallel.
 *  Used as fallback when Finnhub rate-limits. */
export async function fetchStooqUSBatch(
  symbols: string[]
): Promise<Map<string, StooqQuote>> {
  const results = await Promise.all(
    symbols.map(async (sym) => {
      try {
        const stooqSym = sym.toLowerCase() + ".us";
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 3_000);
        // f=sd2t2ohlcvkp → Symbol,Date,Time,Open,High,Low,Close,Volume,PrevClose
        const url = `https://stooq.com/q/l/?s=${encodeURIComponent(stooqSym)}&f=sd2t2ohlcvkp&h&e=csv`;
        const res = await fetch(url, {
          signal: controller.signal,
          headers: { "User-Agent": "Mozilla/5.0", Accept: "text/csv,*/*" },
          cache: "no-store",
        });
        clearTimeout(tid);
        if (!res.ok) return null;
        const text = await res.text();
        const lines = text.trim().split("\n");
        if (lines.length < 2) return null;
        const cols = lines[1].split(",");
        // cols: 0=Symbol 1=Date 2=Time 3=Open 4=High 5=Low 6=Close 7=Volume 8=PrevClose
        const closeStr = cols[6];
        const prevStr  = cols[8];
        if (!closeStr || !prevStr || closeStr === "N/D" || prevStr === "N/D") return null;
        const price    = parseFloat(closeStr);
        const prevClose = parseFloat(prevStr);
        if (isNaN(price) || isNaN(prevClose) || prevClose === 0 || price <= 0) return null;
        return {
          symbol:        sym,
          price,
          change:        price - prevClose,
          changePercent: ((price - prevClose) / prevClose) * 100,
        };
      } catch {
        return null;
      }
    })
  );

  const map = new Map<string, StooqQuote>();
  results.forEach((q) => { if (q) map.set(q.symbol, q); });
  return map;
}

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
        "User-Agent": "Mozilla/5.0",
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
