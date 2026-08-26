import type { NewsItem } from "@/lib/api";
import { getMarketConfig } from "./config";
import type { MarketId } from "./types";

function detectCategory(headline: string): { category: string; categoryColor: NewsItem["categoryColor"] } {
  const h = headline.toLowerCase();
  if (/부동산|전세|매매|아파트|주택|국토|재건축/.test(h)) return { category: "부동산", categoryColor: "orange" };
  if (/bitcoin|btc|ethereum|eth|crypto|비트코인|이더|코인/.test(h)) return { category: "암호화폐", categoryColor: "purple" };
  if (/gold|silver|금 |은 |현물/.test(h)) return { category: "현물", categoryColor: "yellow" };
  if (/삼성|하이닉스|현대|코스피|코스닥|반도체/.test(h)) return { category: "한국증시", categoryColor: "blue" };
  if (/정책|규제|금리|은행|dsr/.test(h)) return { category: "정책", categoryColor: "mint" };
  return { category: "시장", categoryColor: "blue" };
}

function relTimeKo(date: Date): string {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}분 전`;
  if (s < 86400) return `${Math.floor(s / 3600)}시간 전`;
  return `${Math.floor(s / 86400)}일 전`;
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').trim();
}

function parseRssItems(xml: string): { title: string; link: string; pubDate: string; source: string }[] {
  const items: { title: string; link: string; pubDate: string; source: string }[] = [];
  const blocks = xml.split(/<item[\s>]/i).slice(1);
  for (const block of blocks.slice(0, 16)) {
    const title = stripHtml((block.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>/i)?.[1]
      ?? block.match(/<title[^>]*>(.*?)<\/title>/i)?.[1]
      ?? "").trim());
    const link = (block.match(/<link[^>]*>(.*?)<\/link>/i)?.[1] ?? "").trim();
    const pubDate = (block.match(/<pubDate[^>]*>(.*?)<\/pubDate>/i)?.[1] ?? "").trim();
    const source = stripHtml((block.match(/<source[^>]*>(.*?)<\/source>/i)?.[1] ?? "News").trim()) || "News";
    if (title) items.push({ title, link, pubDate, source });
  }
  return items;
}

const MOCK_BY_MARKET: Record<Exclude<MarketId, "us">, NewsItem[]> = {
  kr: [
    { id: 1, title: "코스피, 반도체·자동차 중심 혼조 — 시총 상위주 장중 흐름", summary: "", source: "Investus", time: "1시간 전", category: "한국증시", categoryColor: "blue" },
    { id: 2, title: "삼성전자·SK하이닉스, AI 메모리 수요 기대 속 수급 공방", summary: "", source: "Investus", time: "2시간 전", category: "한국증시", categoryColor: "blue" },
    { id: 3, title: "현대차, 해외 판매·전기차 믹스 주시 — 자동차 섹터 동반", summary: "", source: "Investus", time: "3시간 전", category: "한국증시", categoryColor: "yellow" },
  ],
  safe: [
    { id: 1, title: "비트코인, ETF 수급·매크로 변수에 민감 — 단기 변동성 주시", summary: "", source: "Investus", time: "1시간 전", category: "암호화폐", categoryColor: "purple" },
    { id: 2, title: "금값, 실질금리·달러 동향에 반응 — 안전자산 수요 점검", summary: "", source: "Investus", time: "2시간 전", category: "현물", categoryColor: "yellow" },
    { id: 3, title: "이더리움·솔라나, 리스크온 구간에서 비트와 동행 여부 주목", summary: "", source: "Investus", time: "3시간 전", category: "암호화폐", categoryColor: "purple" },
    { id: 4, title: "은·구리 등 현물, 산업수요와 금리 기대가 겹치는 구간", summary: "", source: "Investus", time: "4시간 전", category: "현물", categoryColor: "yellow" },
  ],
  "kr-re": [
    { id: 1, title: "정부 주택공급·재건축 논의 — 서울 매매심리에 영향", summary: "", source: "Investus", time: "1시간 전", category: "정책", categoryColor: "mint" },
    { id: 2, title: "전세가 상승세 지속 — 수도권 전세 수급 타이트", summary: "", source: "Investus", time: "2시간 전", category: "부동산", categoryColor: "orange" },
    { id: 3, title: "DSR·전세대출 한도 이슈, 실수요 거래 관망", summary: "", source: "Investus", time: "3시간 전", category: "정책", categoryColor: "mint" },
  ],
};

export async function getNewsForMarket(market: MarketId): Promise<NewsItem[]> {
  if (market === "us") {
    const { getNews } = await import("@/lib/api");
    return getNews();
  }

  const cfg = getMarketConfig(market);
  try {
    const q = encodeURIComponent(cfg.newsQuery);
    const url =
      `https://news.google.com/rss/search?q=${q}&hl=${cfg.newsHl}&gl=${cfg.newsGl}&ceid=${cfg.newsGl}:${cfg.newsHl}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0", Accept: "application/rss+xml, application/xml, text/xml" },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`rss ${res.status}`);
    const xml = await res.text();
    const raw = parseRssItems(xml).slice(0, 12);
    if (raw.length === 0) throw new Error("empty rss");

    let titles = raw.map((r) => r.title);
    // 한글 RSS여도 영문 헤드라인이 섞이면 번역 보강
    if (market === "safe") {
      const needsTr = titles.some((t) => /[A-Za-z]{4,}/.test(t) && !/[가-힣]{2,}/.test(t));
      if (needsTr) {
        try {
          const { translateHeadlines } = await import("@/lib/translate");
          titles = await translateHeadlines(titles);
        } catch { /* keep original */ }
      }
    }

    return raw.map((r, i) => {
      const { category, categoryColor } = detectCategory(r.title);
      const pub = r.pubDate ? new Date(r.pubDate) : new Date();
      return {
        id: i + 1,
        title: titles[i] ?? r.title,
        summary: r.title,
        source: r.source,
        time: relTimeKo(Number.isNaN(pub.getTime()) ? new Date() : pub),
        category,
        categoryColor,
        url: r.link || undefined,
      };
    });
  } catch {
    return MOCK_BY_MARKET[market];
  }
}
