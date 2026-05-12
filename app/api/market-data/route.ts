import { NextResponse } from "next/server";
import { fetchFinnhubBatch, fetchFinnhubRawQuote, type FinnhubRawQuote } from "@/lib/finnhub";
import {
  mockIndices, mockQuotes, mockFutures, INDEX_MAP,
  type IndexQuote, type Quote, type FutureItem,
} from "@/lib/api";

export const dynamic = "force-dynamic";

// ── Synthetic sparkline (방향만 정확하면 충분 — 추가 API 호출 없음) ─────────

function syntheticSparkline(price: number, changePercent: number): number[] {
  const n = 9;
  const start = price / (1 + changePercent / 100);
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const noise = Math.sin(i * 2.1 + price) * 0.004 * price;
    return start + (price - start) * t + noise;
  });
}

// ── USD/KRW ───────────────────────────────────────────────────────────────

async function getUSDKRW(): Promise<number | null> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) return null;
    const d = await res.json();
    return d?.rates?.KRW ?? null;
  } catch { return null; }
}

// ── 핵심 Finnhub 호출 — 한 번에 묶어서 rate limit 최소화 ─────────────────
//   stocks 13 + indices 3 (^GSPC/^IXIC/^DJI) + crypto 2 (BTC/ETH) = 18 calls

const INDEX_FH: Record<string, string> = {
  SPX: "^GSPC", COMP: "^IXIC", DJI: "^DJI",
};

const CRYPTO_FH: Record<string, string> = {
  BTC: "BINANCE:BTCUSDT",
  ETH: "BINANCE:ETHUSDT",
};

// Index futures → reuse 위에서 가져온 지수 데이터 (중복 호출 없음)
const FUTURES_FROM_INDEX: Record<string, string> = {
  ES: "SPX", NQ: "COMP", YM: "DJI",
};

export async function GET() {
  const token = process.env.FINNHUB_API_KEY ?? "";

  // ── 1) 주식 13종 일괄 조회 ─────────────────────────────────────────────
  const stockSymbols = mockQuotes.map((q) => q.symbol);
  const stockMap     = await fetchFinnhubBatch(stockSymbols);

  // ── 2) 지수 3종 + 크립토 2종 조회 ─────────────────────────────────────
  const indexFHSyms  = ["^GSPC", "^IXIC", "^DJI"] as const;
  const cryptoFHSyms = Object.values(CRYPTO_FH);

  const [indexResults, cryptoResults, krwRate] = await Promise.all([
    token
      ? Promise.allSettled(indexFHSyms.map((s) => fetchFinnhubRawQuote(s)))
      : Promise.resolve(indexFHSyms.map(() => ({ status: "fulfilled", value: null } as PromiseFulfilledResult<null>))),
    token
      ? Promise.allSettled(cryptoFHSyms.map((s) => fetchFinnhubRawQuote(s)))
      : Promise.resolve(cryptoFHSyms.map(() => ({ status: "fulfilled", value: null } as PromiseFulfilledResult<null>))),
    getUSDKRW(),
  ]);

  // index symbol → raw quote
  const indexRaw = new Map<string, FinnhubRawQuote>();
  indexFHSyms.forEach((sym, i) => {
    const r = indexResults[i];
    if (r.status === "fulfilled" && r.value) indexRaw.set(sym, r.value);
  });

  // crypto symbol → raw quote
  const cryptoRaw = new Map<string, FinnhubRawQuote>();
  Object.values(CRYPTO_FH).forEach((sym, i) => {
    const r = cryptoResults[i];
    if (r.status === "fulfilled" && r.value) cryptoRaw.set(sym, r.value);
  });

  // ── 지수 (INDEX_MAP 순서 유지) ────────────────────────────────────────
  const indices: IndexQuote[] = mockIndices.map((mock) => {
    if (mock.isCurrency) {
      const val = krwRate ?? mock.value;
      return { ...mock, value: val, change: val - mock.value, changePercent: ((val - mock.value) / mock.value) * 100 };
    }
    const fhSym = INDEX_FH[mock.symbol];
    const q     = fhSym ? indexRaw.get(fhSym) : undefined;
    if (!q || q.c === 0) return mock;
    const prev = q.pc || (q.c - q.d);
    return {
      ...mock,
      value:         q.c,
      change:        q.d,
      changePercent: prev > 0 ? (q.d / prev) * 100 : q.dp,
      sparkline:     syntheticSparkline(q.c, q.dp),
    };
  });

  // ── 주식 (synthetic sparkline) ────────────────────────────────────────
  const quotes: Quote[] = mockQuotes.map((mock) => {
    const q = stockMap.get(mock.symbol);
    if (!q) return mock;
    return {
      ...mock,
      price:         q.price,
      change:        q.change,
      changePercent: q.changePercent,
      sparkline:     syntheticSparkline(q.price, q.changePercent),
    };
  });

  // ── 선물 ──────────────────────────────────────────────────────────────
  const futures: FutureItem[] = mockFutures.map((f) => {
    // 지수 선물 → 이미 가져온 지수 데이터 재사용 (추가 API 호출 없음)
    const idxKey = FUTURES_FROM_INDEX[f.symbol];
    if (idxKey) {
      const fhSym = INDEX_FH[idxKey];
      const q     = fhSym ? indexRaw.get(fhSym) : undefined;
      if (q && q.c > 0) return { ...f, price: q.c, change: q.d, changePercent: q.dp, isMock: false };
      return { ...f, isMock: true };
    }

    // 크립토
    const cryptoFH = CRYPTO_FH[f.symbol];
    if (cryptoFH) {
      const q = cryptoRaw.get(cryptoFH);
      if (q && q.c > 0) return { ...f, price: q.c, change: q.d, changePercent: q.dp, isMock: false };
      return { ...f, isMock: true };
    }

    // 나머지 (원유/채권/농산물 — 무료 API 미지원)
    return { ...f, isMock: true };
  });

  return NextResponse.json({ indices, quotes, futures });
}
