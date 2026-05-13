import { NextResponse } from "next/server";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
export async function GET() {
  const results: Record<string, unknown> = {};
  for (const host of ["query1", "query2"]) {
    for (const cfg of [["5m","1d"], ["1d","1mo"], ["1wk","1y"]]) {
      const [interval, range] = cfg;
      const url = `https://${host}.finance.yahoo.com/v8/finance/chart/AAPL?interval=${interval}&range=${range}&includePrePost=false`;
      try {
        const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
        const text = await res.text();
        let pts = 0, nullPts = 0, meta = "";
        try {
          const d = JSON.parse(text);
          const r = d?.chart?.result?.[0];
          if (r) {
            const closes: (number|null)[] = r.indicators?.quote?.[0]?.close ?? [];
            pts = closes.length;
            nullPts = closes.filter((c) => c === null).length;
            meta = String(r.meta?.regularMarketPrice ?? "");
          }
        } catch {}
        results[`${host}|${interval}|${range}`] = { http: res.status, pts, nullPts, meta };
      } catch(e) { results[`${host}|${interval}|${range}`] = String(e); }
    }
  }
  return NextResponse.json(results);
}
