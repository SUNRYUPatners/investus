import { NextRequest, NextResponse } from "next/server";
import { fetchFinnhubCompanyNews } from "@/lib/finnhub";

export async function GET(req: NextRequest) {
  const symbol = (req.nextUrl.searchParams.get("symbol") ?? "").toUpperCase();
  if (!symbol) return NextResponse.json([]);

  // Date range: last 30 days
  const toDate   = new Date();
  const fromDate = new Date(toDate);
  fromDate.setDate(fromDate.getDate() - 30);
  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const items = await fetchFinnhubCompanyNews(symbol, fmt(fromDate), fmt(toDate));

  const raw = items.filter((n) => n.headline && n.url).slice(0, 7);

  // Fallback: try Yahoo Finance if Finnhub returned nothing
  if (raw.length === 0) {
    try {
      const url =
        `https://query1.finance.yahoo.com/v1/finance/search` +
        `?q=${encodeURIComponent(symbol)}&quotesCount=0&newsCount=7&enableFuzzyQuery=false`;
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
          Accept: "application/json",
        },
      });
      if (res.ok) {
        const json = await res.json();
        const yhRaw = ((json?.news ?? []) as Record<string, unknown>[])
          .filter((n) => n.type === "STORY").slice(0, 7);
        const yhTitles = yhRaw.map((n) => String(n.title ?? ""));
        const { translateHeadlines } = await import("@/lib/translate");
        const translated = await translateHeadlines(yhTitles);
        return NextResponse.json(yhRaw.map((n, i) => ({
          uuid:                String(n.uuid),
          title:               translated[i] ?? yhTitles[i],
          publisher:           n.publisher,
          link:                n.link,
          providerPublishTime: n.providerPublishTime,
          thumbnail:
            (n.thumbnail as { resolutions?: { url: string }[] } | undefined)
              ?.resolutions?.[0]?.url ?? null,
        })));
      }
    } catch { /* ignore */ }
    return NextResponse.json([]);
  }

  const { translateHeadlines } = await import("@/lib/translate");
  const titles = await translateHeadlines(raw.map((n) => n.headline));
  return NextResponse.json(raw.map((n, i) => ({
    uuid:                String(n.id),
    title:               titles[i] ?? n.headline,
    publisher:           n.source,
    link:                n.url,
    providerPublishTime: n.datetime,
    thumbnail:           n.image || null,
  })));
}
