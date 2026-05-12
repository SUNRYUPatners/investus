const BASE = "https://finnhub.io/api/v1";

export type FinnhubQuote = {
  symbol:        string;
  price:         number;
  change:        number;
  changePercent: number;
};

async function fetchOne(symbol: string, token: string): Promise<FinnhubQuote | null> {
  try {
    const res = await fetch(
      `${BASE}/quote?symbol=${encodeURIComponent(symbol)}&token=${token}`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) return null;
    const d = await res.json();
    if (!d.c || d.c === 0) return null;
    return {
      symbol,
      price:         Number(d.c),
      change:        Number(d.d  ?? 0),
      changePercent: Number(d.dp ?? 0),
    };
  } catch {
    return null;
  }
}

export async function fetchFinnhubBatch(
  symbols: string[]
): Promise<Map<string, FinnhubQuote>> {
  const token = process.env.FINNHUB_API_KEY ?? "";
  if (!token) return new Map();
  const results = await Promise.all(symbols.map((s) => fetchOne(s, token)));
  const map = new Map<string, FinnhubQuote>();
  results.forEach((q) => { if (q) map.set(q.symbol, q); });
  return map;
}
