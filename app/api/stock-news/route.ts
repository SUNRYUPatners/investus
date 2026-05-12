import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get("symbol") ?? "";

  const url =
    `https://query1.finance.yahoo.com/v1/finance/search` +
    `?q=${encodeURIComponent(symbol)}&quotesCount=0&newsCount=7&enableFuzzyQuery=false`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
      Accept: "application/json",
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) return NextResponse.json([]);

  const json = await res.json();
  const news = ((json?.news ?? []) as Record<string, unknown>[])
    .filter((n) => n.type === "STORY")
    .slice(0, 7)
    .map((n) => ({
      uuid:                n.uuid,
      title:               n.title,
      publisher:           n.publisher,
      link:                n.link,
      providerPublishTime: n.providerPublishTime,
      thumbnail:
        (n.thumbnail as { resolutions?: { url: string }[] } | undefined)
          ?.resolutions?.[0]?.url ?? null,
    }));

  return NextResponse.json(news);
}
