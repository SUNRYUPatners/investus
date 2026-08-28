import { mockFutures, type FutureItem } from "@/lib/api";
import { fetchFinnhubRawQuote } from "@/lib/finnhub";
import { kvGetDetail } from "@/lib/kv";
import { fetchFutureV8 } from "@/lib/yahooFinance";
import { fetchYahooChartLive } from "@/lib/yahooChartLive";

const KV_KEY = "market-data:v3";

/** FuturesHeatmap 타일에 쓰이는 심볼 */
const HEATMAP_SYMS = new Set([
  "NK", "DAX", "FTSE", "HSI",
  "CL", "NG", "GC", "SI", "HG",
  "ZN", "ZB", "6E", "6J", "ZC", "ZW", "ZS",
  "BTC", "ETH",
]);

const YF: Record<string, string> = {
  NK: "^N225",
  DAX: "^GDAXI",
  FTSE: "^FTSE",
  HSI: "^HSI",
  CL: "CL=F",
  NG: "NG=F",
  GC: "GC=F",
  SI: "SI=F",
  HG: "HG=F",
  ZN: "ZN=F",
  ZB: "ZB=F",
  ZC: "ZC=F",
  ZW: "ZW=F",
  ZS: "ZS=F",
};

const CRYPTO_FH: Record<string, string> = {
  BTC: "BINANCE:BTCUSDT",
  ETH: "BINANCE:ETHUSDT",
};

async function fetchCoinGeckoCrypto(sym: "BTC" | "ETH"): Promise<Pick<FutureItem, "price" | "change" | "changePercent"> | null> {
  const id = sym === "BTC" ? "bitcoin" : "ethereum";
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true`,
      { cache: "no-store", signal: AbortSignal.timeout(5000) },
    );
    if (!res.ok) return null;
    const d = await res.json();
    const row = d?.[id];
    if (row?.usd == null) return null;
    const pct = Number(row.usd_24h_change ?? 0);
    const price = Number(row.usd);
    return { price, change: (price * pct) / 100, changePercent: pct };
  } catch {
    return null;
  }
}

async function fetchLiveFuturesMap(): Promise<FutureItem[]> {
  const mockBySym = Object.fromEntries(mockFutures.map((f) => [f.symbol, f]));

  const results = await Promise.all(
    [...HEATMAP_SYMS].map(async (sym): Promise<FutureItem | null> => {
      const base = mockBySym[sym];
      if (!base) return null;

      if (sym === "BTC" || sym === "ETH") {
        const fh = await fetchFinnhubRawQuote(CRYPTO_FH[sym]);
        if (fh && fh.c > 0) {
          return { ...base, price: fh.c, change: fh.d, changePercent: fh.dp };
        }
        const cg = await fetchCoinGeckoCrypto(sym);
        if (cg) return { ...base, ...cg };
        return null;
      }

      if (sym === "6E" || sym === "6J") {
        const yf = sym === "6E" ? "EURUSD=X" : "JPY=X";
        const q = await fetchYahooChartLive(yf);
        if (q && q.price > 0) {
          return { ...base, price: q.price, change: q.change, changePercent: q.changePercent };
        }
        return null;
      }

      const yfSym = YF[sym];
      if (!yfSym) return null;
      const q = (await fetchFutureV8(yfSym)) ?? (await fetchYahooChartLive(yfSym));
      if (q && q.price > 0) {
        return { ...base, price: q.price, change: q.change, changePercent: q.changePercent };
      }
      return null;
    }),
  );

  return results.filter((f): f is FutureItem => f != null);
}

/** 미국 시장 KV 캐시 우선, 없으면 라이브 조회 — KR·Safe 탭 Futures Map 공용 */
export async function fetchFuturesMap(): Promise<FutureItem[]> {
  try {
    const raw = await kvGetDetail(KV_KEY);
    const cached = Array.isArray(raw?.futures) ? (raw.futures as FutureItem[]) : [];
    const hit = cached.filter((f) => HEATMAP_SYMS.has(f.symbol) && f.price > 0);
    if (hit.length >= 12) return hit;
  } catch {
    /* ignore */
  }

  return fetchLiveFuturesMap();
}
