/**
 * Yahoo v8 chart — 직접 호출 (선물·일부 심볼용). 실호가만 반환.
 */

export type ChartLive = {
  price: number;
  change: number;
  changePercent: number;
};

const YF_BASES = [
  "https://query1.finance.yahoo.com",
  "https://query2.finance.yahoo.com",
] as const;

export async function fetchYahooChartLive(symbol: string): Promise<ChartLive | null> {
  const YF_PROXY = process.env.YF_PROXY_URL ?? "";
  for (const base of YF_BASES) {
    try {
      const url =
        `${base}/v8/finance/chart/${encodeURIComponent(symbol)}` +
        `?interval=1d&range=5d&includePrePost=false`;
      const target = YF_PROXY ? `${YF_PROXY}?url=${encodeURIComponent(url)}` : url;
      const res = await fetch(target, {
        headers: YF_PROXY
          ? undefined
          : {
              "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
              Accept: "*/*",
              "Accept-Language": "en-US,en;q=0.9",
              Referer: "https://finance.yahoo.com/",
            },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const text = await res.text();
      let json: { chart?: { result?: { meta?: Record<string, unknown> }[] } };
      try { json = JSON.parse(text); } catch { continue; }
      const result = json?.chart?.result?.[0];
      const meta = result?.meta;
      const price = Number(meta?.regularMarketPrice ?? 0);
      if (!(price > 0)) continue;
      const prev = Number(
        meta?.chartPreviousClose ?? meta?.previousClose ?? meta?.regularMarketPreviousClose ?? 0,
      );
      const change = prev > 0 ? price - prev : 0;
      const changePercent = prev > 0 ? (change / prev) * 100 : 0;
      return { price, change, changePercent };
    } catch {
      continue;
    }
  }
  return null;
}
