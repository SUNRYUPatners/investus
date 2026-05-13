import { NextResponse } from "next/server";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

async function test(label: string, url: string, extraHeaders: Record<string,string> = {}) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "*/*", "Accept-Language": "en-US,en;q=0.9", ...extraHeaders },
    });
    const text = await res.text();
    let pts = 0;
    try {
      const d = JSON.parse(text);
      const r = d?.chart?.result?.[0];
      if (r) {
        const cl = r.indicators?.quote?.[0]?.close ?? [];
        pts = (cl as (number|null)[]).filter((c) => c !== null).length;
      }
    } catch {}
    return { label, http: res.status, pts, preview: text.slice(0, 100) };
  } catch(e) { return { label, error: String(e) }; }
}

export async function GET() {
  const BASE = "https://query1.finance.yahoo.com/v8/finance/chart/AAPL";

  const results = await Promise.all([
    // Bare minimum
    test("bare", `${BASE}?interval=5m&range=1d&includePrePost=false`),
    // With browser-like Origin+Referer
    test("with_referer", `${BASE}?interval=5m&range=1d&includePrePost=false`, {
      Origin: "https://finance.yahoo.com",
      Referer: "https://finance.yahoo.com/chart/AAPL/",
    }),
    // Yahoo's internal params
    test("yf_params", `${BASE}?interval=5m&range=1d&includePrePost=false&useYfid=true&includeTimestamps=true&corsDomain=finance.yahoo.com`, {
      Origin: "https://finance.yahoo.com",
      Referer: "https://finance.yahoo.com/chart/AAPL/",
    }),
    // query2 with referer
    test("q2_referer", `https://query2.finance.yahoo.com/v8/finance/chart/AAPL?interval=5m&range=1d&includePrePost=false`, {
      Origin: "https://finance.yahoo.com",
      Referer: "https://finance.yahoo.com/chart/AAPL/",
    }),
    // Spark endpoint (used for mini charts)
    test("spark", `https://query1.finance.yahoo.com/v7/finance/spark?symbols=AAPL&range=1d&interval=5m`),
    // v8 daily range
    test("daily_1mo", `${BASE}?interval=1d&range=1mo&includePrePost=false`, {
      Origin: "https://finance.yahoo.com",
      Referer: "https://finance.yahoo.com/chart/AAPL/",
    }),
  ]);

  return NextResponse.json(results);
}
