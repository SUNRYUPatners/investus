/**
 * Yahoo Finance 데이터 클라이언트
 * - v8 chart API 우선 (크럼/인증 불필요, Vercel에서 안정적)
 * - v7 quote API 폴백 (배치 조회용)
 */

const YF_BASE  = "https://query2.finance.yahoo.com";
const YF_BASE2 = "https://query1.finance.yahoo.com";

// ── Types ────────────────────────────────────────────────────────────────────

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

// ── Helpers ──────────────────────────────────────────────────────────────────

function yfHeaders() {
  return {
    "User-Agent": "Mozilla/5.0",
    Accept: "application/json",
  };
}

// ── v8 Chart (크럼 불필요 — Vercel 서버에서 안정적) ─────────────────────────

async function fetchQuoteV8(symbol: string): Promise<YFQuote | null> {
  const url =
    `${YF_BASE}/v8/finance/chart/${encodeURIComponent(symbol)}` +
    `?interval=1d&range=1d&includePrePost=false`;
  try {
    const res = await fetch(url, {
      headers: yfHeaders(),
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const meta = json?.chart?.result?.[0]?.meta;
    if (!meta || meta.regularMarketPrice == null) return null;
    const price = Number(meta.regularMarketPrice);
    const prev  = Number(meta.chartPreviousClose ?? meta.regularMarketPrice);
    const change = price - prev;
    return {
      symbol:        String(meta.symbol ?? symbol),
      shortName:     String(meta.longName ?? meta.shortName ?? symbol),
      price,
      change,
      changePercent: prev > 0 ? (change / prev) * 100 : 0,
      volume:        Number(meta.regularMarketVolume ?? 0),
      marketCap:     null,
    };
  } catch {
    return null;
  }
}

// ── v7 Quote (배치 조회 — 실패 시 v8로 폴백) ────────────────────────────────

export async function fetchBatchQuotes(symbols: string[]): Promise<YFQuote[]> {
  if (symbols.length === 0) return [];

  // v7 시도 (배치라 빠름)
  try {
    for (const base of [YF_BASE, YF_BASE2]) {
      const sym = symbols.join(",");
      const url =
        `${base}/v7/finance/quote?symbols=${encodeURIComponent(sym)}` +
        `&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume,shortName,marketCap`;
      const res = await fetch(url, {
        headers: yfHeaders(),
        next: { revalidate: 60 },
      });
      if (!res.ok) continue;
      const json   = await res.json();
      const quotes: unknown[] = json?.quoteResponse?.result ?? [];
      const valid = quotes
        .filter(
          (q): q is Record<string, unknown> =>
            !!q &&
            typeof q === "object" &&
            (q as Record<string, unknown>).regularMarketPrice != null,
        )
        .map((q) => ({
          symbol:        String(q.symbol ?? ""),
          shortName:     String(q.shortName ?? q.symbol ?? ""),
          price:         Number(q.regularMarketPrice),
          change:        Number(q.regularMarketChange ?? 0),
          changePercent: Number(q.regularMarketChangePercent ?? 0),
          volume:        Number(q.regularMarketVolume ?? 0),
          marketCap:     q.marketCap != null ? Number(q.marketCap) : null,
        }));
      if (valid.length > 0) return valid;
    }
  } catch { /* fall through */ }

  // v7 실패 → v8 병렬 폴백
  const results = await Promise.all(symbols.map(fetchQuoteV8));
  return results.filter((q): q is YFQuote => q !== null);
}

export async function fetchIndex(yahooSymbol: string): Promise<YFIndex | null> {
  // v7 시도
  try {
    for (const base of [YF_BASE, YF_BASE2]) {
      const url =
        `${base}/v7/finance/quote?symbols=${encodeURIComponent(yahooSymbol)}` +
        `&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume,regularMarketPreviousClose,shortName`;
      const res = await fetch(url, {
        headers: yfHeaders(),
        next: { revalidate: 60 },
      });
      if (!res.ok) continue;
      const json = await res.json();
      const q    = json?.quoteResponse?.result?.[0];
      if (!q || q.regularMarketPrice == null) continue;
      return {
        symbol:        String(q.symbol ?? yahooSymbol),
        shortName:     String(q.shortName ?? q.symbol ?? yahooSymbol),
        price:         Number(q.regularMarketPrice),
        change:        Number(q.regularMarketChange ?? 0),
        changePercent: Number(q.regularMarketChangePercent ?? 0),
        volume:        Number(q.regularMarketVolume ?? 0),
        marketCap:     null,
        previousClose: Number(q.regularMarketPreviousClose ?? q.regularMarketPrice),
      };
    }
  } catch { /* fall through */ }

  // v8 폴백
  const q = await fetchQuoteV8(yahooSymbol);
  if (!q) return null;
  return {
    ...q,
    previousClose: q.price - q.change,
  };
}

/**
 * 상품 선물 v8 조회 (v7는 Unauthorized) — range=5d로 장 마감 중에도 안정적
 * internalKey: 앱 내부 심볼 (CL, NG, GC …)
 * yahooSym:    Yahoo Finance 티커 (CL=F, NG=F, GC=F …)
 */
export async function fetchFutureV8(
  yahooSym: string,
): Promise<{ price: number; change: number; changePercent: number } | null> {
  for (const base of [YF_BASE, YF_BASE2]) {
    for (const range of ["5d", "1mo"]) {
      try {
        const ctrl = new AbortController();
        const tid  = setTimeout(() => ctrl.abort(), 3_000);
        const url =
          `${base}/v8/finance/chart/${encodeURIComponent(yahooSym)}` +
          `?interval=1d&range=${range}&includePrePost=false`;
        const res = await fetch(url, {
          headers: yfHeaders(),
          cache: "no-store",
          signal: ctrl.signal,
        });
        clearTimeout(tid);
        if (!res.ok) continue;
        const json = await res.json();
        const meta = json?.chart?.result?.[0]?.meta;
        if (!meta?.regularMarketPrice) continue;
        const price = Number(meta.regularMarketPrice);
        const prev  = Number(meta.chartPreviousClose ?? meta.regularMarketPreviousClose ?? price);
        return {
          price,
          change:        price - prev,
          changePercent: prev > 0 ? ((price - prev) / prev) * 100 : 0,
        };
      } catch { /* try next host / range */ }
    }
  }
  return null;
}

/** 스파크라인 (1시간봉 × 9개) */
export async function fetchSparkline(symbol: string): Promise<number[]> {
  const url =
    `${YF_BASE}/v8/finance/chart/${encodeURIComponent(symbol)}` +
    `?interval=1h&range=1d`;
  try {
    const res = await fetch(url, {
      headers: yfHeaders(),
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const closes: unknown[] =
      json?.chart?.result?.[0]?.indicators?.quote?.[0]?.close ?? [];
    return closes
      .filter((c): c is number => typeof c === "number" && c > 0)
      .slice(-9);
  } catch {
    return [];
  }
}

// ── Format helpers ───────────────────────────────────────────────────────────

export function fmtVolume(v: number): string {
  if (v >= 1e9) return `${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
  return v.toFixed(0);
}

export function fmtMarketCap(v: number | null): string {
  if (!v) return "—";
  if (v >= 1e12) return `${(v / 1e12).toFixed(2)}T`;
  if (v >= 1e9)  return `${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6)  return `${(v / 1e6).toFixed(1)}M`;
  return v.toFixed(0);
}
