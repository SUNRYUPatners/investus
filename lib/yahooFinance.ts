/**
 * Yahoo Finance 데이터 클라이언트 (fetch 직접 호출, 패키지 불필요)
 *
 * Yahoo Finance 무료 비공식 엔드포인트를 직접 사용.
 * API 키 불필요.
 */

const YF_BASE = "https://query1.finance.yahoo.com";

// ── Types ───────────────────────────────────────────────────────────────────

export type YFQuote = {
  symbol: string;
  shortName: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number | null;
};

export type YFIndex = YFQuote & {
  previousClose: number;
};

// ── Helpers ─────────────────────────────────────────────────────────────────

function yfHeaders() {
  return {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
    Accept: "application/json",
  };
}

// ── Quote API ────────────────────────────────────────────────────────────────

/** 여러 종목을 한 번에 조회 */
export async function fetchBatchQuotes(symbols: string[]): Promise<YFQuote[]> {
  if (symbols.length === 0) return [];
  const sym = symbols.join(",");
  const url = `${YF_BASE}/v7/finance/quote?symbols=${encodeURIComponent(sym)}&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume,shortName,marketCap`;
  const res = await fetch(url, {
    headers: yfHeaders(),
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  const json = await res.json();
  const quotes: unknown[] =
    json?.quoteResponse?.result ?? [];
  return quotes
    .filter(
      (q): q is Record<string, unknown> =>
        !!q && typeof q === "object" && (q as Record<string, unknown>).regularMarketPrice != null
    )
    .map((q) => ({
      symbol: String(q.symbol ?? ""),
      shortName: String(q.shortName ?? q.symbol ?? ""),
      price: Number(q.regularMarketPrice),
      change: Number(q.regularMarketChange ?? 0),
      changePercent: Number(q.regularMarketChangePercent ?? 0),
      volume: Number(q.regularMarketVolume ?? 0),
      marketCap: q.marketCap != null ? Number(q.marketCap) : null,
    }));
}

/** 인덱스 1개 조회 (^GSPC, ^IXIC, ^DJI 등) */
export async function fetchIndex(yahooSymbol: string): Promise<YFIndex | null> {
  const url = `${YF_BASE}/v7/finance/quote?symbols=${encodeURIComponent(yahooSymbol)}&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume,regularMarketPreviousClose,shortName`;
  const res = await fetch(url, {
    headers: yfHeaders(),
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  const q = json?.quoteResponse?.result?.[0];
  if (!q || q.regularMarketPrice == null) return null;
  return {
    symbol: String(q.symbol ?? yahooSymbol),
    shortName: String(q.shortName ?? q.symbol ?? yahooSymbol),
    price: Number(q.regularMarketPrice),
    change: Number(q.regularMarketChange ?? 0),
    changePercent: Number(q.regularMarketChangePercent ?? 0),
    volume: Number(q.regularMarketVolume ?? 0),
    marketCap: null,
    previousClose: Number(q.regularMarketPreviousClose ?? q.regularMarketPrice),
  };
}

/** 최근 9개 시간봉 종가 (스파크라인용) */
export async function fetchSparkline(symbol: string): Promise<number[]> {
  const url = `${YF_BASE}/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1h&range=1d`;
  const res = await fetch(url, {
    headers: yfHeaders(),
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  const json = await res.json();
  const closes: unknown[] =
    json?.chart?.result?.[0]?.indicators?.quote?.[0]?.close ?? [];
  return closes
    .filter((c): c is number => typeof c === "number" && c > 0)
    .slice(-9);
}

// ── Format helpers ──────────────────────────────────────────────────────────

export function fmtVolume(v: number): string {
  if (v >= 1e9) return `${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
  return v.toFixed(0);
}

export function fmtMarketCap(v: number | null): string {
  if (!v) return "—";
  if (v >= 1e12) return `${(v / 1e12).toFixed(2)}T`;
  if (v >= 1e9) return `${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  return v.toFixed(0);
}
