/**
 * Yahoo Finance 데이터 클라이언트
 * - YF_PROXY_URL 환경변수가 설정되면 Cloudflare Worker 프록시를 통해 요청
 *   (Vercel AWS IP → CF Worker → YF: 차단 우회)
 * - 미설정 시 직접 요청 (로컬 개발용)
 */

const YF_BASE  = "https://query1.finance.yahoo.com";
const YF_BASE2 = "https://query2.finance.yahoo.com";

// Cloudflare Worker 프록시 URL (Vercel 환경변수 YF_PROXY_URL)
const YF_PROXY = process.env.YF_PROXY_URL ?? "";

// ── Types ────────────────────────────────────────────────────────────────────

export type YFQuote = {
  symbol: string;
  shortName: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number | null;
  open: number | null;
  high: number | null;
  low: number | null;
};

export type YFIndex = YFQuote & {
  previousClose: number;
};

// ── Proxy-aware fetch ─────────────────────────────────────────────────────────

function yfHeaders() {
  return {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
    Accept: "application/json",
    Referer: "https://finance.yahoo.com/",
  };
}

/**
 * YF_PROXY_URL이 설정된 경우 Cloudflare Worker를 통해 요청.
 * 프록시 사용 시 yfHeaders()는 Worker가 직접 YF에 전달 — 외부 fetch엔 불필요하지만 무해.
 */
function yfFetch(url: string, init: RequestInit = {}): Promise<Response> {
  if (YF_PROXY) {
    return fetch(`${YF_PROXY}?url=${encodeURIComponent(url)}`, init);
  }
  return fetch(url, { headers: yfHeaders(), ...init });
}

// ── v8 Chart ─────────────────────────────────────────────────────────────────

export async function fetchQuoteV8(symbol: string): Promise<YFQuote | null> {
  for (const base of [YF_BASE2, YF_BASE]) {
    try {
      const ctrl = new AbortController();
      const tid  = setTimeout(() => ctrl.abort(), 5_000);
      const url  = `${base}/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=5d&includePrePost=false`;
      const res  = await yfFetch(url, { cache: "no-store", signal: ctrl.signal });
      clearTimeout(tid);
      if (!res.ok) continue;
      const json   = await res.json();
      const result = json?.chart?.result?.[0];
      const meta   = result?.meta;
      if (!meta || meta.regularMarketPrice == null) continue;

      const price  = Number(meta.regularMarketPrice);
      const isOpen = meta.marketState === "REGULAR";

      // chartPreviousClose는 부정확 — closes 배열에서 직접 전날 종가 추출
      // 장 마감: closes[-1]=당일종가, closes[-2]=전날종가
      // 장 중:  closes[-1]=전날종가 (당일 캔들 미완성), regularMarketPrice=현재가
      const rawCloses: unknown[] = result?.indicators?.quote?.[0]?.close ?? [];
      const closes = rawCloses.filter((c): c is number => typeof c === "number" && c > 0);
      const prev = isOpen
        ? (closes.at(-1) ?? price)          // 장 중: 마지막 완성 종가 = 전날
        : (closes.at(-2) ?? closes.at(-1) ?? price); // 장 마감: 마지막이 당일, 그 전이 전날

      const change = price - prev;
      return {
        symbol:        String(meta.symbol ?? symbol),
        shortName:     String(meta.longName ?? meta.shortName ?? symbol),
        price,
        change,
        changePercent: prev > 0 ? (change / prev) * 100 : 0,
        volume:        Number(meta.regularMarketVolume ?? 0),
        marketCap:     null,
        open:  isOpen && meta.regularMarketOpen    ? Number(meta.regularMarketOpen)    : null,
        high:  isOpen && meta.regularMarketDayHigh ? Number(meta.regularMarketDayHigh) : null,
        low:   isOpen && meta.regularMarketDayLow  ? Number(meta.regularMarketDayLow)  : null,
      };
    } catch { /* try next host */ }
  }
  return null;
}

// ── v7 Quote (배치 조회) ──────────────────────────────────────────────────────

export async function fetchBatchQuotes(symbols: string[]): Promise<YFQuote[]> {
  if (symbols.length === 0) return [];

  let v7Results: YFQuote[] = [];

  try {
    for (const base of [YF_BASE2, YF_BASE]) {
      const ctrl = new AbortController();
      const tid  = setTimeout(() => ctrl.abort(), 6_000);
      const url  =
        `${base}/v7/finance/quote?symbols=${encodeURIComponent(symbols.join(","))}` +
        `&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume,regularMarketOpen,regularMarketDayHigh,regularMarketDayLow,shortName,marketCap,marketState`;
      const res = await yfFetch(url, { cache: "no-store", signal: ctrl.signal });
      clearTimeout(tid);
      if (!res.ok) continue;
      const json   = await res.json();
      const quotes: unknown[] = json?.quoteResponse?.result ?? [];
      const valid = quotes
        .filter(
          (q): q is Record<string, unknown> =>
            !!q && typeof q === "object" &&
            (q as Record<string, unknown>).regularMarketPrice != null,
        )
        .map((q) => {
          const isOpen = q.marketState === "REGULAR";
          return {
            symbol:        String(q.symbol ?? ""),
            shortName:     String(q.shortName ?? q.symbol ?? ""),
            price:         Number(q.regularMarketPrice),
            change:        Number(q.regularMarketChange ?? 0),
            changePercent: Number(q.regularMarketChangePercent ?? 0),
            volume:        Number(q.regularMarketVolume ?? 0),
            marketCap:     q.marketCap != null ? Number(q.marketCap) : null,
            open:  isOpen && q.regularMarketOpen    ? Number(q.regularMarketOpen)    : null,
            high:  isOpen && q.regularMarketDayHigh ? Number(q.regularMarketDayHigh) : null,
            low:   isOpen && q.regularMarketDayLow  ? Number(q.regularMarketDayLow)  : null,
          };
        });
      if (valid.length > 0) { v7Results = valid; break; }
    }
  } catch { /* fall through */ }

  // 누락 심볼: 3개씩 순차 chunked v8
  const v7Map   = new Map(v7Results.map((q) => [q.symbol, q]));
  const missing = symbols.filter((s) => !v7Map.has(s));
  if (missing.length === 0) return v7Results;

  const out: YFQuote[] = [...v7Results];
  const CHUNK = 3, DELAY = 200;
  for (let i = 0; i < missing.length; i += CHUNK) {
    const chunk = missing.slice(i, i + CHUNK);
    const rows  = await Promise.all(chunk.map(fetchQuoteV8));
    rows.forEach((q) => { if (q && q.price > 0) out.push(q); });
    if (i + CHUNK < missing.length) await new Promise<void>((r) => setTimeout(r, DELAY));
  }
  return out;
}

export async function fetchIndex(yahooSymbol: string): Promise<YFIndex | null> {
  try {
    for (const base of [YF_BASE2, YF_BASE]) {
      const ctrl = new AbortController();
      const tid  = setTimeout(() => ctrl.abort(), 5_000);
      const url  =
        `${base}/v7/finance/quote?symbols=${encodeURIComponent(yahooSymbol)}` +
        `&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume,regularMarketPreviousClose,shortName`;
      const res = await yfFetch(url, { cache: "no-store", signal: ctrl.signal });
      clearTimeout(tid);
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
        open: null, high: null, low: null,
        previousClose: Number(q.regularMarketPreviousClose ?? q.regularMarketPrice),
      };
    }
  } catch { /* fall through */ }

  const q = await fetchQuoteV8(yahooSymbol);
  if (!q) return null;
  return { ...q, previousClose: q.price - q.change };
}

/** 상품 선물 v8 조회 */
export async function fetchFutureV8(
  yahooSym: string,
): Promise<{ price: number; change: number; changePercent: number } | null> {
  for (const base of [YF_BASE, YF_BASE2]) {
    for (const range of ["5d", "1mo"]) {
      try {
        const ctrl = new AbortController();
        const tid  = setTimeout(() => ctrl.abort(), 3_000);
        const url  =
          `${base}/v8/finance/chart/${encodeURIComponent(yahooSym)}` +
          `?interval=1d&range=${range}&includePrePost=false`;
        const res = await yfFetch(url, { cache: "no-store", signal: ctrl.signal });
        clearTimeout(tid);
        if (!res.ok) continue;
        const json   = await res.json();
        const result = json?.chart?.result?.[0];
        const meta   = result?.meta;
        if (!meta?.regularMarketPrice) continue;
        const price  = Number(meta.regularMarketPrice);
        const isOpen = meta.marketState === "REGULAR";
        const rawCloses: unknown[] = result?.indicators?.quote?.[0]?.close ?? [];
        const closes = rawCloses.filter((c): c is number => typeof c === "number" && c > 0);
        const prev   = isOpen
          ? (closes.at(-1) ?? price)
          : (closes.at(-2) ?? closes.at(-1) ?? price);
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
    const res = await yfFetch(url, { next: { revalidate: 60 } } as RequestInit);
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

// ── Format helpers ────────────────────────────────────────────────────────────

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
