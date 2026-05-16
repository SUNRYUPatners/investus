const BASE = "https://finnhub.io/api/v1";

function getToken(): string {
  return process.env.FINNHUB_API_KEY ?? "";
}

// ── Types ─────────────────────────────────────────────────────────────────

export type FinnhubQuote = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
};

export type FinnhubRawQuote = {
  c: number;   // current price
  d: number;   // change
  dp: number;  // change percent
  h: number;   // high
  l: number;   // low
  o: number;   // open
  pc: number;  // previous close
};

export type FinnhubProfile = {
  name: string;
  exchange: string;
  currency: string;
};

export type FinnhubMetrics = {
  week52High:    number | null;
  week52Low:     number | null;
  pe:            number | null;
  marketCap:     number | null; // millions USD
  eps:           number | null;
  beta:          number | null;
  dividendYield: number | null;
};

export type FinnhubCandle = {
  ts: number;
  close: number;
  volume: number;
};

export type FinnhubNewsItem = {
  id: number;
  category: string;
  datetime: number;
  headline: string;
  image: string;
  source: string;
  summary: string;
  url: string;
};

// ── Internal single quote ─────────────────────────────────────────────────

async function fetchOne(symbol: string, token: string): Promise<FinnhubQuote | null> {
  try {
    const res = await fetch(`${BASE}/quote?symbol=${encodeURIComponent(symbol)}&token=${token}`);
    if (!res.ok) return null;
    const d = await res.json();
    // c=0 means market closed — fall back to pc (prev close) with no intraday change
    const isLive = d.c && d.c > 0;
    const price  = isLive ? d.c : d.pc;
    if (!price || price === 0) return null;
    return {
      symbol,
      price:         Number(price),
      change:        isLive ? Number(d.d  ?? 0) : 0,
      changePercent: isLive ? Number(d.dp ?? 0) : 0,
    };
  } catch {
    return null;
  }
}

// ── Batch quote (home page stocks) ────────────────────────────────────────
// Chunked to avoid Finnhub burst limit on cold starts

export async function fetchFinnhubBatch(
  symbols: string[]
): Promise<Map<string, FinnhubQuote>> {
  const token = getToken();
  if (!token) return new Map();

  const map   = new Map<string, FinnhubQuote>();
  const CHUNK = 10;
  const DELAY = 120; // ms between chunks — stays within 60/min free limit

  for (let i = 0; i < symbols.length; i += CHUNK) {
    const chunk   = symbols.slice(i, i + CHUNK);
    const results = await Promise.all(chunk.map((s) => fetchOne(s, token)));
    results.forEach((q) => { if (q) map.set(q.symbol, q); });
    if (i + CHUNK < symbols.length) {
      await new Promise<void>((r) => setTimeout(r, DELAY));
    }
  }
  return map;
}

// ── Raw quote with OHLC (detail page) ────────────────────────────────────

export async function fetchFinnhubRawQuote(symbol: string): Promise<FinnhubRawQuote | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${BASE}/quote?symbol=${encodeURIComponent(symbol)}&token=${token}`);
    if (!res.ok) return null;
    const d = await res.json();
    // Return data even when c=0 (market closed) as long as pc (prev close) is valid
    // Callers that need live price should check c > 0 themselves
    if (!d || ((!d.c || d.c === 0) && (!d.pc || d.pc === 0))) return null;
    return d as FinnhubRawQuote;
  } catch {
    return null;
  }
}

// ── Company profile ───────────────────────────────────────────────────────

export async function fetchFinnhubProfile(symbol: string): Promise<FinnhubProfile | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${BASE}/stock/profile2?symbol=${encodeURIComponent(symbol)}&token=${token}`);
    if (!res.ok) return null;
    const d = await res.json();
    if (!d.name) return null;
    return { name: d.name, exchange: d.exchange ?? "US", currency: d.currency ?? "USD" };
  } catch {
    return null;
  }
}

// ── Basic financials ──────────────────────────────────────────────────────

export async function fetchFinnhubMetrics(symbol: string): Promise<FinnhubMetrics | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${BASE}/stock/metric?symbol=${encodeURIComponent(symbol)}&metric=all&token=${token}`);
    if (!res.ok) return null;
    const d = await res.json();
    const m = d.metric ?? {};
    return {
      week52High:    m["52WeekHigh"]                   ?? null,
      week52Low:     m["52WeekLow"]                    ?? null,
      pe:            m.peBasicExclExtraTTM             ?? m.peAnnual             ?? null,
      marketCap:     m.marketCapitalization            ?? null,
      eps:           m.epsBasicExclExtraAnnual         ?? m.epsAnnual            ?? null,
      beta:          m.beta                            ?? null,
      // Finnhub returns dividendYield as %-unit (e.g. 0.36 = 0.36%); normalize to ratio
      dividendYield: m.dividendYieldIndicatedAnnual != null
        ? m.dividendYieldIndicatedAnnual / 100
        : m.currentDividendYieldTTM != null
          ? m.currentDividendYieldTTM / 100
          : null,
    };
  } catch {
    return null;
  }
}

// ── Candles (chart) ───────────────────────────────────────────────────────

export async function fetchFinnhubCandles(
  symbol: string,
  resolution: string,
  from: number,
  to: number
): Promise<FinnhubCandle[] | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const url =
      `${BASE}/stock/candle` +
      `?symbol=${encodeURIComponent(symbol)}` +
      `&resolution=${resolution}&from=${from}&to=${to}&token=${token}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const d = await res.json();
    if (d.s === "no_data" || !d.t || d.t.length === 0) return null;
    return (d.t as number[]).map((ts, i) => ({
      ts,
      close:  (d.c as number[])[i] ?? 0,
      volume: (d.v as number[])[i] ?? 0,
    }));
  } catch {
    return null;
  }
}

// ── 1D sparkline (30-min candles, for today's intraday movement) ──────────

export async function fetchFinnhubSparkline(symbol: string): Promise<number[]> {
  const now  = Math.floor(Date.now() / 1000);
  const from = now - 8 * 3600; // ~8h back covers today's US session
  const candles = await fetchFinnhubCandles(symbol, "30", from, now);
  if (!candles || candles.length < 2) return [];
  return candles.map((c) => c.close);
}

// ── Market news (home page) ───────────────────────────────────────────────

export async function fetchFinnhubMarketNews(): Promise<FinnhubNewsItem[]> {
  const token = getToken();
  if (!token) return [];
  try {
    const res = await fetch(`${BASE}/news?category=general&minId=0&token=${token}`);
    if (!res.ok) return [];
    const d = await res.json();
    return Array.isArray(d) ? d : [];
  } catch {
    return [];
  }
}

// ── Company news (stock detail page) ─────────────────────────────────────

export async function fetchFinnhubCompanyNews(
  symbol: string,
  fromDate: string, // YYYY-MM-DD
  toDate: string
): Promise<FinnhubNewsItem[]> {
  const token = getToken();
  if (!token) return [];
  try {
    const res = await fetch(
      `${BASE}/company-news?symbol=${encodeURIComponent(symbol)}&from=${fromDate}&to=${toDate}&token=${token}`
    );
    if (!res.ok) return [];
    const d = await res.json();
    return Array.isArray(d) ? d : [];
  } catch {
    return [];
  }
}
