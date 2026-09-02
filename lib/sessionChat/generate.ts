import type { MarketId } from "@/lib/markets/types";
import { getMarketConfig } from "@/lib/markets/config";
import { pickSessionNick } from "./nicks";
import type { SessionChatMessage } from "./types";

export type ChatQuote = {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
};

type Template = (q: ChatQuote, market: MarketId) => string;

const US_TEMPLATES: Template[] = [
  (q) => `${q.name} ${fmtPct(q.changePercent)}에 $${fmtPrice(q.price)}. 오전 흐름이 꽤 선명함`,
  (q) => `지금 ${q.name} ${fmtPct(q.changePercent)}인데 거래량 따라가면 오후에 더 움직일 듯`,
  (q) => `${q.name} $${fmtPrice(q.price)} — 프리마켓 대비 ${q.changePercent >= 0 ? "탄력" : "압박"} 느낌`,
  (q) => `빅테크 중에 ${q.name}이 ${fmtPct(q.changePercent)}로 눈에 띔. 섹터랑 같이 볼게`,
  (q) => `${q.name} ${fmtPct(q.changePercent)}… 여기서 눌림 나오면 관심 종목 다시 본다`,
  (q) => `나스닥 흐름이랑 ${q.name} ${fmtPct(q.changePercent)} 같이 읽는 중`,
];

const KR_TEMPLATES: Template[] = [
  (q) => `${q.name} ${fmtPct(q.changePercent)} · ${fmtKrPrice(q.price)}원. 수급이 붙는 느낌`,
  (q) => `지금 ${q.name} ${fmtPct(q.changePercent)}인데 외인·기관 방향 같이 봐야 함`,
  (q) => `${q.name} ${fmtKrPrice(q.price)}원대 — 오전 고점 돌파하면 분위기 바뀜`,
  (q) => `코스피 흐름이랑 ${q.name} ${fmtPct(q.changePercent)} 같이 체크 중`,
  (q) => `${q.name} ${fmtPct(q.changePercent)}… 반도체·2차전지랑 같이 움직이는지 볼게`,
  (q) => `대형주 중 ${q.name} ${fmtPct(q.changePercent)}로 이슈 있어 보임`,
];

const INDEX_TEMPLATES: Template[] = [
  (q) => `${q.name} ${fmtPct(q.changePercent)} — 지수 방향이 오늘 종목 선택에 힌트 줌`,
  (q) => `지수 ${q.name} ${fmtPct(q.changePercent)}. 개별주보다 먼저 이거 보고 있음`,
];

function fmtPct(n: number): string {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

function fmtPrice(n: number): string {
  if (n >= 1000) return n.toFixed(2);
  if (n >= 100) return n.toFixed(2);
  return n.toFixed(2);
}

function fmtKrPrice(n: number): string {
  return Math.round(n).toLocaleString("ko-KR");
}

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) & 0x7fffffff;
  return h;
}

function pickQuotes(quotes: ChatQuote[], market: MarketId): ChatQuote[] {
  const cfg = getMarketConfig(market);
  const popular = new Set(cfg.popular.map((s) => s.symbol));
  const big = quotes.filter((q) => popular.has(q.symbol));
  const movers = [...quotes]
    .filter((q) => q.price > 0)
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
    .slice(0, 5);
  const merged = new Map<string, ChatQuote>();
  for (const q of [...big, ...movers]) merged.set(q.symbol, q);
  return [...merged.values()].slice(0, 8);
}

function messageForSlot(
  market: MarketId,
  slotMs: number,
  quotes: ChatQuote[],
  indices: ChatQuote[],
): SessionChatMessage | null {
  const seed = `${market}-${slotMs}`;
  const h = hashSeed(seed);
  const pool = pickQuotes(quotes, market);
  if (pool.length === 0 && indices.length === 0) return null;

  const useIndex = indices.length > 0 && h % 5 === 0;
  const q = useIndex
    ? indices[h % indices.length]
    : pool[h % pool.length];
  if (!q) return null;

  const templates = useIndex ? INDEX_TEMPLATES : market === "kr" ? KR_TEMPLATES : US_TEMPLATES;
  const content = templates[h % templates.length](q, market);
  const nick = pickSessionNick(`${seed}-${h % 17}`);

  return {
    id: `sc-${market}-${slotMs}-${h % 1000}`,
    nick,
    content,
    symbol: q.symbol,
    at: slotMs,
  };
}

/** 12초 슬롯마다 0~1개 메시지 (장중 시뮬레이션) */
export function generateSessionMessages(
  market: MarketId,
  quotes: ChatQuote[],
  indices: ChatQuote[],
  opts: { sinceMs?: number; nowMs?: number; maxBackfill?: number } = {},
): SessionChatMessage[] {
  const now = opts.nowMs ?? Date.now();
  const slot = 12_000;
  const currentSlot = Math.floor(now / slot) * slot;
  const since = opts.sinceMs ?? now - 8 * 60_000;
  const startSlot = Math.floor(since / slot) * slot;
  const max = opts.maxBackfill ?? 20;

  const out: SessionChatMessage[] = [];
  for (let t = startSlot; t <= currentSlot && out.length < max; t += slot) {
    // 약 70% 슬롯만 메시지 생성 (자연스러운 간격)
    if (hashSeed(`${market}-skip-${t}`) % 10 < 3) continue;
    const msg = messageForSlot(market, t, quotes, indices);
    if (msg && msg.at > since) out.push(msg);
  }
  return out.sort((a, b) => a.at - b.at);
}

export function fakeOnlineCount(market: MarketId, now = Date.now()): number {
  const base = market === "us" ? 120 : 85;
  const hourBoost = new Date(now).getHours() % 12;
  const jitter = hashSeed(`${market}-online-${Math.floor(now / 60_000)}`) % 90;
  return base + hourBoost * 8 + jitter;
}
