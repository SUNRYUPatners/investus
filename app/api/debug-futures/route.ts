import { NextResponse } from "next/server";

const YF_BASE = "https://query1.finance.yahoo.com";
const YF_BASE2 = "https://query2.finance.yahoo.com";

export async function GET() {
  const results: Record<string, unknown> = {};
  
  for (const base of [YF_BASE, YF_BASE2]) {
    const url = `${base}/v8/finance/chart/CL%3DF?interval=1d&range=5d&includePrePost=false`;
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          Accept: "application/json",
          Referer: "https://finance.yahoo.com/",
        },
        cache: "no-store",
      });
      const json = await res.json();
      const meta = json?.chart?.result?.[0]?.meta;
      results[base] = {
        status: res.status,
        ok: res.ok,
        price: meta?.regularMarketPrice ?? null,
        error: json?.chart?.error ?? null,
      };
    } catch (e) {
      results[base] = { error: String(e) };
    }
  }
  
  return NextResponse.json(results);
}
