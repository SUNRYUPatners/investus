import { NextRequest, NextResponse } from "next/server";
import { fetchFinnhubCompanyNews } from "@/lib/finnhub";
import type { NewsItem } from "@/lib/api";

// ── Shared helpers (same logic as lib/api.ts) ─────────────────────────────

function detectCategory(headline: string): { category: string; categoryColor: NewsItem["categoryColor"] } {
  const h = headline.toLowerCase();
  if (/fed|fomc|rate|gdp|economy|inflation|cpi|macro|fiscal/.test(h))
    return { category: "거시경제", categoryColor: "mint" };
  if (/earning|revenue|profit|eps|quarter|guidance|forecast/.test(h))
    return { category: "실적", categoryColor: "red" };
  if (/ai|artificial intelligence|tech|software|chip|nvidia|semiconductor/.test(h))
    return { category: "기술", categoryColor: "blue" };
  if (/ev|electric vehicle|auto|tesla|ford|gm|car/.test(h))
    return { category: "자동차", categoryColor: "yellow" };
  if (/oil|energy|gas|crude|opec|exxon|chevron/.test(h))
    return { category: "에너지", categoryColor: "orange" };
  if (/bank|finance|crypto|bitcoin|ether|currency|forex/.test(h))
    return { category: "금융", categoryColor: "purple" };
  if (/invest|fund|portfolio|warren|buffett|etf/.test(h))
    return { category: "투자", categoryColor: "orange" };
  return { category: "시장", categoryColor: "blue" };
}

function relTimeKo(unix: number): string {
  const s = Math.floor(Date.now() / 1000 - unix);
  if (s < 3600)  return `${Math.floor(s / 60)}분 전`;
  if (s < 86400) return `${Math.floor(s / 3600)}시간 전`;
  return `${Math.floor(s / 86400)}일 전`;
}

// ── Route ─────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const symbol = (req.nextUrl.searchParams.get("symbol") ?? "").toUpperCase().slice(0, 12);
  if (!symbol) return NextResponse.json([]);

  const toDate   = new Date();
  const fromDate = new Date(toDate);
  fromDate.setDate(fromDate.getDate() - 30);
  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const items = await fetchFinnhubCompanyNews(symbol, fmt(fromDate), fmt(toDate));
  const raw = items.filter((n) => n.headline && n.url).slice(0, 8);

  if (raw.length > 0) {
    const { translateHeadlines } = await import("@/lib/translate");
    const titles = await translateHeadlines(raw.map((n) => n.headline));
    const news: NewsItem[] = raw.map((n, i) => {
      const { category, categoryColor } = detectCategory(n.headline);
      return {
        id:            n.id || i,
        title:         titles[i] ?? n.headline,
        summary:       n.summary || "",
        source:        n.source,
        time:          relTimeKo(n.datetime),
        category,
        categoryColor,
        url:           n.url   || undefined,
        image:         n.image || undefined,
      };
    });
    return NextResponse.json(news);
  }

  return NextResponse.json([]);
}
