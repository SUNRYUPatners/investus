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
  marketCap:     number | null; // in millions USD
  eps:           number | null;
  beta:          number | null;
  dividendYield: number | null;
};

export type FinnhubCandle = {
  ts: number;
  close: number;
  volume: number;
};

// ── Batch quote (for home page stocks) ────────────────────────────────────

async function fetchOne(symbol: string, token: string): Promise<FinnhubQuote | null> {
  try {
    const res = await fetch(
      `${BASE}/quote?symbol=${encodeURIComponent(symbol)}&token=${token}`
    );
    if (!res.ok) return null;
    const d = await res.json();
    if (!d.c || d.c === 0) return null;
    return { symbol, price: Number(d.c), change: Number(d.d ?? 0), changePercent: Number(d.dp ?? 0) };
  } catch {
    return null;
  }
}

export async function fetchFinnhubBatch(
  symbols: string[]
): Promise<Map<string, FinnhubQuote>> {
  const token = getToken();
  if (!token) return new Map();
  const results = await Promise.all(symbols.map((s) => fetchOne(s, token)));
  const map = new Map<string, FinnhubQuote>();
  results.forEach((q) => { if (q) map.set(q.symbol, q); });
  return map;
}

// ── Raw quote (price + OHLC, for detail page) ─────────────────────────────

export async function fetchFinnhubRawQuote(symbol: string): Promise<FinnhubRawQuote | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${BASE}/quote?symbol=${encodeURIComponent(symbol)}&token=${token}`);
    if (!res.ok) return null;
    const d = await res.json();
    if (!d.c || d.c === 0) return null;
    return d as FinnhubRawQuote;
  } catch {
    return null;
  }
}

// ── Company profile (name, exchange, currency) ────────────────────────────

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

// ── Basic financials (PE, market cap, 52w, beta, etc.) ───────────────────

export async function fetchFinnhubMetrics(symbol: string): Promise<FinnhubMetrics | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(
      `${BASE}/stock/metric?symbol=${encodeURIComponent(symbol)}&metric=all&token=${token}`
    );
    if (!res.ok) return null;
    const d = await res.json();
    const m = d.metric ?? {};
    return {
      week52High:    m["52WeekHigh"]                    ?? null,
      week52Low:     m["52WeekLow"]                     ?? null,
      pe:            m.peBasicExclExtraTTM              ?? null,
      marketCap:     m.marketCapitalization             ?? null,
      eps:           m.epsBasicExclExtraAnnual          ?? null,
      beta:          m.beta                             ?? null,
      dividendYield: m.dividendYieldIndicatedAnnual     ?? null,
    };
  } catch {
    return null;
  }
}

// ── Candles (for chart, resolution: 1/5/15/30/60/D/W/M) ─────────────────

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
