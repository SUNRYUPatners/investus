import { NextRequest, NextResponse } from "next/server";
import { fetchFinnhubCompanyNews } from "@/lib/finnhub";
import type { NewsItem } from "@/lib/api";

export const maxDuration = 20;

// ── Helpers ───────────────────────────────────────────────────────────────

const KO_CATEGORIES: Record<string, string> = {
  Macro: "거시경제", Earnings: "실적", Tech: "기술",
  Auto: "자동차", Energy: "에너지", Finance: "금융",
  Investing: "투자", Market: "시장",
};

function detectCategory(headline: string, isEn: boolean): { category: string; categoryColor: NewsItem["categoryColor"] } {
  const h = headline.toLowerCase();
  if (/\bfed\b|fomc|\brate\b|gdp|economy|inflation|cpi|macro|fiscal/.test(h))
    return { category: isEn ? "Macro" : KO_CATEGORIES["Macro"], categoryColor: "mint" };
  if (/earning|revenue|profit|\beps\b|quarter|guidance|forecast/.test(h))
    return { category: isEn ? "Earnings" : KO_CATEGORIES["Earnings"], categoryColor: "red" };
  if (/\bai\b|artificial intelligence|\btech\b|software|\bchip\b|nvidia|semiconductor/.test(h))
    return { category: isEn ? "Tech" : KO_CATEGORIES["Tech"], categoryColor: "blue" };
  if (/\bev\b|electric vehicle|automaker|automotive|\btesla\b|\bford\b|\bgm\b|\bcar\b/.test(h))
    return { category: isEn ? "Auto" : KO_CATEGORIES["Auto"], categoryColor: "yellow" };
  if (/\boil\b|energy|\bgas\b|crude|\bopec\b|exxon|chevron/.test(h))
    return { category: isEn ? "Energy" : KO_CATEGORIES["Energy"], categoryColor: "orange" };
  if (/\bbank\b|finance|crypto|bitcoin|ether|currency|forex/.test(h))
    return { category: isEn ? "Finance" : KO_CATEGORIES["Finance"], categoryColor: "purple" };
  if (/invest|\bfund\b|portfolio|warren|buffett|\betf\b/.test(h))
    return { category: isEn ? "Investing" : KO_CATEGORIES["Investing"], categoryColor: "orange" };
  return { category: isEn ? "Market" : KO_CATEGORIES["Market"], categoryColor: "blue" };
}

function relTime(unix: number, isEn: boolean): string {
  const s = Math.floor(Date.now() / 1000 - unix);
  if (s < 3600)  return isEn ? `${Math.floor(s / 60)}m ago`  : `${Math.floor(s / 60)}분 전`;
  if (s < 86400) return isEn ? `${Math.floor(s / 3600)}h ago` : `${Math.floor(s / 3600)}시간 전`;
  return isEn ? `${Math.floor(s / 86400)}d ago` : `${Math.floor(s / 86400)}일 전`;
}

// ── Route ─────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const symbol = (req.nextUrl.searchParams.get("symbol") ?? "").toUpperCase().slice(0, 12);
  if (!symbol) return NextResponse.json([]);

  const locale = req.nextUrl.searchParams.get("locale") ?? "ko";
  const isEn   = locale === "en";

  const toDate   = new Date();
  const fromDate = new Date(toDate);
  fromDate.setDate(fromDate.getDate() - 30);
  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const items = await fetchFinnhubCompanyNews(symbol, fmt(fromDate), fmt(toDate));
  const raw = items.filter((n) => n.headline && n.url).slice(0, 8);

  if (raw.length === 0) return NextResponse.json([]);

  let titles: string[];
  if (isEn) {
    // English mode: use original English headlines directly
    titles = raw.map((n) => n.headline);
  } else {
    const { translateHeadlines } = await import("@/lib/translate");
    titles = await translateHeadlines(raw.map((n) => n.headline));
  }

  const news: NewsItem[] = raw.map((n, i) => {
    const { category, categoryColor } = detectCategory(n.headline, isEn);
    return {
      id:            n.id || i,
      title:         titles[i] ?? n.headline,
      summary:       n.summary || "",
      source:        n.source,
      time:          relTime(n.datetime, isEn),
      category,
      categoryColor,
      url:           n.url   || undefined,
      image:         n.image || undefined,
    };
  });
  return NextResponse.json(news);
}
