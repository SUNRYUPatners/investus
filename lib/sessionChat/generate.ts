import type { MarketId } from "@/lib/markets/types";
import { getMarketConfig } from "@/lib/markets/config";
import { pickSessionNick } from "./nicks";
import { chatStockLabel } from "./labels";
import type { SessionChatMessage } from "./types";

export type ChatQuote = {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
};

type Template = (ctx: TemplateCtx) => string;

type TemplateCtx = {
  short: string;
  ticker: string;
  pct: string;
  price: string;
  up: boolean;
  strong: boolean;
};

const US_TEMPLATES: Template[] = [
  (c) => `${c.short} ${c.pct}에 $${c.price}. 오전 흐름 꽤 선명한데`,
  (c) => `지금 ${c.ticker} ${c.pct}… 거래량 따라가면 오후에 더 움직일 듯`,
  (c) => `${c.short} $${c.price} — 프리마켓 대비 ${c.up ? "탄력" : "압박"} 느낌이야`,
  (c) => `${c.short} ${c.pct} ${c.strong ? "확실히" : "살짝"} ${c.up ? "밀어올리는" : "누르는"} 중`,
  (c) => `${c.ticker} ${c.pct}… 여기서 ${c.up ? "돌파" : "지지"} 나오면 다시 본다`,
  (c) => `나스닥 흐름이랑 ${c.short} ${c.pct} 같이 읽는 중`,
  (c) => `${c.short} ${c.pct} ㅋㅋ ${c.strong ? "변동성 큰데" : "큰 건 아닌데"} 눈은 가네`,
  (c) => `방금 ${c.ticker} ${c.pct} 찍혔는데 이거 실화?`,
  (c) => `${c.short} ${c.up ? "올라가니까" : "밀리니까"} 섹터 전체 분위기도 ${c.up ? "나아짐" : "무거워짐"}`,
  (c) => `개인적으로 ${c.short} ${c.pct}는 ${c.up ? "추격 매수" : "손절"} 구간 아닌 것 같음`,
  (c) => `${c.ticker} ${c.pct} — ${c.up ? "고점 돌파" : "저점 테스트"} 중인 듯`,
  (c) => `누가 ${c.short} ${c.up ? "매수" : "매도"} 치는지 수급 봐야 할 듯`,
  (c) => `${c.short} ${c.pct}. ${c.up ? "쉬어갈 타이밍" : "공포에 팔면 손해"} 같아 보임`,
  (c) => `오늘 ${c.ticker} ${c.pct}면 ${c.strong ? "뉴스 있었나?" : "그냥 지수 따라간 듯"}`,
  (c) => `${c.short} $${c.price} — ${c.up ? "추세 유지" : "되돌림"} 기다리는 중`,
  (c) => `빅테크 중 ${c.short}만 ${c.pct}로 ${c.up ? "튀네" : "혼자 약함"}`,
  (c) => `${c.ticker} ${c.pct}… ${c.up ? "콜" : "풋"} 옵션 쪽도 같이 움직이는지 봐야 함`,
  (c) => `${c.short} ${c.pct} ${c.up ? "↑" : "↓"} 지금 포지션 ${c.up ? "들고" : "줄이고"} 싶은데`,
  (c) => `장중에 ${c.short} ${c.pct} 나오면 보통 오후에 ${c.up ? "추가 상승" : "반등 시도"} 나오더라`,
  (c) => `${c.ticker} ${c.pct} — VIX랑 같이 보면 ${c.up ? "리스크온" : "리스크오프"} 느낌`,
  (c) => `${c.short} ${c.pct}인데 ${c.up ? "추가 매수" : "관망"} 쪽인 사람 있어?`,
  (c) => `솔직히 ${c.short} ${c.pct}는 ${c.strong ? "좀 과한데" : "무난한데"}`,
  (c) => `${c.ticker} $${c.price} — ${c.up ? "52주 고점" : "지지선"} 근처인지 확인 중`,
  (c) => `${c.short} ${c.pct}. ${c.up ? "실적 기대" : "차익실현"} 때문인가`,
  (c) => `지수보다 ${c.short} ${c.pct}가 ${c.up ? "더 세네" : "약하네"}`,
  (c) => `${c.ticker} ${c.pct}… ${c.up ? "돌파" : "이탈"}하면 알림 좀`,
  (c) => `${c.short} ${c.pct} ${c.up ? "좋긴 한데" : "아쉽긴 한데"} 다른 종목이 더 끌림`,
  (c) => `M7 중에 ${c.short} ${c.pct}로 ${c.up ? "주목" : "조용"}`,
  (c) => `${c.short} ${c.pct} — ${c.up ? "추세 추종" : "역추세"} 관점 둘 다 가능`,
  (c) => `프리장보다 ${c.short} ${c.pct} ${c.up ? "나아졌네" : "약해졌네"}`,
];

const KR_TEMPLATES: Template[] = [
  (c) => `${c.short} ${c.pct} · ${c.price}원. 수급 붙는 느낌`,
  (c) => `지금 ${c.ticker} ${c.pct}인데 외인·기관 방향 같이 봐야 함`,
  (c) => `${c.short} ${c.price}원대 — ${c.up ? "고점 돌파" : "지지 테스트"} 중`,
  (c) => `코스피 흐름이랑 ${c.short} ${c.pct} 같이 체크`,
  (c) => `${c.short} ${c.pct}… 반도체·2차전지랑 같이 움직이는지 볼게`,
  (c) => `대형주 중 ${c.short} ${c.pct}로 ${c.up ? "이슈" : "조정"} 있어 보임`,
  (c) => `${c.ticker} ${c.pct} ㅋㅋ ${c.strong ? "변동성 큰데" : "무난한데"}`,
  (c) => `${c.short} ${c.up ? "올라가니" : "밀리니"} 섹터 분위기도 ${c.up ? "살아남" : "무거워짐"}`,
  (c) => `방금 ${c.short} ${c.pct} 찍혔는데 이거 뉴스 있나`,
  (c) => `${c.ticker} ${c.pct} — ${c.up ? "추격" : "손절"} 구간 아닌 것 같음`,
  (c) => `${c.short} ${c.pct}. ${c.up ? "쉬어갈 타이밍" : "공포 매도는 금물"} 같아`,
  (c) => `오늘 ${c.short} ${c.pct}면 ${c.strong ? "수급 이슈" : "지수 따라간 듯"}`,
  (c) => `${c.short} ${c.price}원 — ${c.up ? "추세" : "되돌림"} 기다리는 중`,
  (c) => `외국인 ${c.short} ${c.up ? "사는" : "파는"} 중인지 봐야 함`,
  (c) => `${c.ticker} ${c.pct}… ${c.up ? "돌파" : "이탈"} 나오면 알려줘`,
  (c) => `${c.short} ${c.pct} ${c.up ? "↑" : "↓"} 포지션 ${c.up ? "유지" : "줄일"}까 고민`,
  (c) => `장중 ${c.short} ${c.pct} 나오면 오후 ${c.up ? "추가 상승" : "반등"} 나오더라`,
  (c) => `${c.short} ${c.pct}인데 ${c.up ? "추가 매수" : "관망"} 하는 사람?`,
  (c) => `솔직히 ${c.short} ${c.pct}는 ${c.strong ? "좀 과함" : "무난함"}`,
  (c) => `지수보다 ${c.short} ${c.pct}가 ${c.up ? "더 세네" : "약하네"}`,
  (c) => `${c.ticker} ${c.pct} — ${c.up ? "52주 고점" : "지지선"} 근처`,
  (c) => `${c.short} ${c.pct}. ${c.up ? "실적 기대" : "차익실현"} 때문인가`,
  (c) => `대형주 중 ${c.short}만 ${c.pct}로 ${c.up ? "튀네" : "혼자 약함"}`,
  (c) => `${c.short} ${c.pct} ${c.up ? "좋긴 한데" : "아쉽긴 한데"} 다른 종목이 더 끌림`,
];

const INDEX_TEMPLATES: Template[] = [
  (c) => `${c.short} ${c.pct} — 지수 방향이 오늘 종목 선택에 힌트 줌`,
  (c) => `지수 ${c.short} ${c.pct}. 개별주보다 먼저 이거 보고 있음`,
  (c) => `${c.short} ${c.pct} ${c.up ? "↑" : "↓"} ${c.strong ? "변동성 큰 날" : "무난한 날"} 느낌`,
  (c) => `지수 ${c.pct}면 ${c.up ? "리스크온" : "리스크오프"} 분위기`,
  (c) => `${c.short} ${c.pct}… ${c.up ? "돌파" : "지지"} 나오면 개별주도 따라갈 듯`,
  (c) => `오늘 ${c.short} ${c.pct} — ${c.up ? "매수" : "관망"} 쪽인 사람 많을 듯`,
  (c) => `지수 ${c.pct} 찍고 ${c.up ? "쉬어가는" : "되돌림"} 중`,
  (c) => `${c.short} ${c.pct}. ${c.up ? "추세" : "조정"} 구간인 것 같음`,
];

const CHAT_TEMPLATES: Template[] = [
  () => "지금 뭐 보고 계세요?",
  () => "오늘 포지션 어떻게 잡으셨어요?",
  () => "장중 변동성 좀 크네 ㅋㅋ",
  () => "지수 방향 먼저 보고 종목 고르는 중",
  () => "오후에 더 움직일 것 같음",
  () => "뉴스 없이 움직이는 게 더 무섭다",
  () => "손절 라인 미리 정해두는 게 좋더라",
  () => "오늘은 추격 매수 자제하려고",
  () => "장 마감 전에 정리할 듯",
  () => "지금은 관망이 답인 것 같음",
  () => "변동성 큰 날엔 비중 줄이는 게 맞는 듯",
  () => "실시간으로 같이 봐서 다행이네",
];

function fmtPct(n: number): string {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

function fmtPrice(n: number): string {
  return n.toFixed(2);
}

function fmtKrPrice(n: number): string {
  return Math.round(n).toLocaleString("ko-KR");
}

function buildCtx(q: ChatQuote, market: MarketId): TemplateCtx {
  const label = chatStockLabel(q, market);
  const short = label;
  const ticker = market === "kr" ? label : q.symbol.replace(/\.KS$/i, "");
  const pct = fmtPct(q.changePercent);
  const price = market === "kr" ? fmtKrPrice(q.price) : fmtPrice(q.price);
  const up = q.changePercent >= 0;
  const strong = Math.abs(q.changePercent) >= 1.5;
  return { short, ticker, pct, price, up, strong };
}

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) & 0x7fffffff;
  return h;
}

function pickQuotes(quotes: ChatQuote[], market: MarketId, avoid: Set<string>): ChatQuote[] {
  const cfg = getMarketConfig(market);
  const popular = new Set(cfg.popular.map((s) => s.symbol));
  const big = quotes.filter((q) => popular.has(q.symbol) && !avoid.has(q.symbol));
  const movers = [...quotes]
    .filter((q) => q.price > 0 && !avoid.has(q.symbol))
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
    .slice(0, 6);
  const merged = new Map<string, ChatQuote>();
  for (const q of [...big, ...movers]) merged.set(q.symbol, q);
  const pool = [...merged.values()];
  if (pool.length === 0) {
    return quotes.filter((q) => !avoid.has(q.symbol)).slice(0, 8);
  }
  return pool.slice(0, 10);
}

function messageForSlot(
  market: MarketId,
  slotMs: number,
  quotes: ChatQuote[],
  indices: ChatQuote[],
  usedSymbols: Set<string>,
  usedContents: Set<string>,
): SessionChatMessage | null {
  const seed = `${market}-${slotMs}`;

  for (let attempt = 0; attempt < 16; attempt++) {
    const h = hashSeed(`${seed}-a${attempt}`);
    const skip = attempt < 8 ? usedSymbols : new Set<string>();
    const pool = pickQuotes(quotes, market, skip);
    const idxPool = indices.filter((q) => !skip.has(q.symbol));

    const mode = h % 23;
    const useChatOnly = mode === 0;
    const useIndex = !useChatOnly && idxPool.length > 0 && mode % 7 === 0;

    if (useChatOnly) {
      const tpl = CHAT_TEMPLATES[h % CHAT_TEMPLATES.length];
      const content = tpl(buildCtx({ symbol: "", name: "", price: 0, changePercent: 0 }, market));
      if (usedContents.has(content)) continue;
      usedContents.add(content);
      const nick = pickSessionNick(`${seed}-n${attempt}`);
      return {
        id: `sc-${market}-${slotMs}-${h % 10000}`,
        nick,
        content,
        at: slotMs,
      };
    }

    const q = useIndex
      ? idxPool[(h + attempt) % idxPool.length]
      : pool.length > 0
        ? pool[(h + attempt * 3) % pool.length]
        : null;
    if (!q) continue;

    const templates = useIndex
      ? INDEX_TEMPLATES
      : market === "kr"
        ? KR_TEMPLATES
        : US_TEMPLATES;
    const tplIdx = (h + attempt * 5 + hashSeed(q.symbol)) % templates.length;
    const ctx = buildCtx(q, market);
    const content = templates[tplIdx](ctx);
    if (usedContents.has(content)) continue;

    usedSymbols.add(q.symbol);
    usedContents.add(content);
    const nick = pickSessionNick(`${seed}-n${attempt}-${q.symbol}`);

    return {
      id: `sc-${market}-${slotMs}-${h % 10000}`,
      nick,
      content,
      symbol: q.symbol,
      at: slotMs,
    };
  }

  return null;
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
  const usedSymbols = new Set<string>();
  const usedContents = new Set<string>();

  for (let t = startSlot; t <= currentSlot && out.length < max; t += slot) {
    if (hashSeed(`${market}-skip-${t}`) % 10 < 3) continue;
    const msg = messageForSlot(market, t, quotes, indices, usedSymbols, usedContents);
    if (msg && msg.at > since) {
      out.push(msg);
      if (usedSymbols.size > 6) {
        const oldest = [...usedSymbols].slice(0, usedSymbols.size - 6);
        for (const s of oldest) usedSymbols.delete(s);
      }
      if (usedContents.size > 40) {
        const drop = [...usedContents].slice(0, usedContents.size - 30);
        for (const c of drop) usedContents.delete(c);
      }
    }
  }
  return out.sort((a, b) => a.at - b.at);
}

export function fakeOnlineCount(market: MarketId, now = Date.now()): number {
  const base = market === "us" ? 120 : 85;
  const hourBoost = new Date(now).getHours() % 12;
  const jitter = hashSeed(`${market}-online-${Math.floor(now / 60_000)}`) % 90;
  return base + hourBoost * 8 + jitter;
}
