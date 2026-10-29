import { fetchBatchQuotes } from "@/lib/yahooFinance";
import { fetchFinnhubBatch, fetchFinnhubMetrics } from "@/lib/finnhub";
import type { TeslaQuoteSnapshot } from "./teslaValuationTypes";

export type { TeslaQuoteSnapshot } from "./teslaValuationTypes";

function num(v: unknown): number | null {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) && n !== 0 ? n : null;
}

/**
 * Live TSLA price and multiples from the site's existing quote providers.
 * Returns null fields rather than inventing or using mock quotes.
 */
export async function getTeslaQuoteSnapshot(): Promise<TeslaQuoteSnapshot> {
  const empty: TeslaQuoteSnapshot = {
    price: null,
    changePercent: null,
    marketCap: null,
    pe: null,
    eps: null,
    week52High: null,
    week52Low: null,
    asOfIso: null,
    quoteSource: null,
  };

  const [yfSettled, fhQuoteSettled, fhMetricsSettled] = await Promise.allSettled([
    fetchBatchQuotes(["TSLA"]),
    fetchFinnhubBatch(["TSLA"]),
    fetchFinnhubMetrics("TSLA"),
  ]);

  const out = { ...empty };
  const yf = yfSettled.status === "fulfilled" ? yfSettled.value[0] : undefined;
  if (yf && yf.price > 0) {
    out.price = yf.price;
    out.changePercent = Number.isFinite(yf.changePercent) ? yf.changePercent : null;
    out.marketCap = yf.marketCap && yf.marketCap > 0 ? yf.marketCap : null;
    out.quoteSource = "yahoo";
    out.asOfIso = new Date().toISOString();
  }

  const fhQuote =
    fhQuoteSettled.status === "fulfilled" ? fhQuoteSettled.value.get("TSLA") : undefined;
  if (!out.price && fhQuote && fhQuote.price > 0) {
    out.price = fhQuote.price;
    out.changePercent = Number.isFinite(fhQuote.changePercent) ? fhQuote.changePercent : out.changePercent;
    out.quoteSource = "finnhub";
    out.asOfIso = new Date().toISOString();
  }

  const metrics = fhMetricsSettled.status === "fulfilled" ? fhMetricsSettled.value : null;
  if (metrics) {
    // Finnhub marketCapitalization is millions of USD.
    const capM = num(metrics.marketCap);
    if (!out.marketCap && capM) out.marketCap = capM * 1_000_000;
    out.pe = num(metrics.pe);
    out.eps = num(metrics.eps);
    out.week52High = num(metrics.week52High);
    out.week52Low = num(metrics.week52Low);
    if (!out.asOfIso) out.asOfIso = new Date().toISOString();
  }

  if (out.pe == null && out.price && out.eps && out.eps > 0) {
    out.pe = out.price / out.eps;
  }

  return out;
}
