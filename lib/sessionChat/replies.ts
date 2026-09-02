import type { MarketId } from "@/lib/markets/types";
import { pickSessionNick } from "./nicks";
import type { SessionChatMessage } from "./types";
import type { ChatQuote } from "./generate";

const TICKER_HINTS: { re: RegExp; symbols: string[] }[] = [
  { re: /테슬라|tsla/i, symbols: ["TSLA"] },
  { re: /엔비디아|nvidia|nvda/i, symbols: ["NVDA"] },
  { re: /애플|apple|aapl/i, symbols: ["AAPL"] },
  { re: /아마존|amazon|amzn/i, symbols: ["AMZN"] },
  { re: /구글|google|googl|alphabet/i, symbols: ["GOOGL"] },
  { re: /메타|meta|facebook/i, symbols: ["META"] },
  { re: /마이크로소프트|microsoft|msft/i, symbols: ["MSFT"] },
  { re: /삼성|삼전|005930/i, symbols: ["005930.KS"] },
  { re: /하이닉스|sk하이닉스|000660/i, symbols: ["000660.KS"] },
  { re: /코스피|kospi|지수/i, symbols: ["^KS11"] },
  { re: /나스닥|nasdaq|ixic/i, symbols: ["^IXIC"] },
  { re: /s&p|sp500|spy|지수/i, symbols: ["^GSPC"] },
];

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) & 0x7fffffff;
  return h;
}

function fmtPct(n: number): string {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

function shortLabel(q: ChatQuote): string {
  const dash = q.name.indexOf(" — ");
  if (dash >= 0) return q.name.slice(dash + 3).trim();
  if (q.name.length <= 14) return q.name;
  return q.symbol.replace(/\.KS$/, "");
}

function findRelatedQuote(content: string, quotes: ChatQuote[], indices: ChatQuote[]): ChatQuote | null {
  const pool = [...quotes, ...indices];
  for (const hint of TICKER_HINTS) {
    if (!hint.re.test(content)) continue;
    for (const sym of hint.symbols) {
      const q = pool.find((x) => x.symbol === sym || x.symbol.replace(".KS", "") === sym.replace(".KS", ""));
      if (q) return q;
    }
  }
  const movers = [...pool].filter((q) => q.price > 0).sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
  return movers[0] ?? null;
}

function snippet(content: string): string {
  const t = content.trim().replace(/\s+/g, " ");
  if (t.length <= 18) return t;
  return `${t.slice(0, 16)}…`;
}

type ReplyBuilder = (nick: string, content: string, q: ChatQuote | null, market: MarketId) => string;

const REPLY_BUILDERS: ReplyBuilder[] = [
  (nick, content, q) => {
    if (q) {
      const s = shortLabel(q);
      return `${nick}님 말대로 ${s} ${fmtPct(q.changePercent)}도 같이 봐야겠네`;
    }
    return `${nick}님 ㅇㅇ ${snippet(content)} 공감`;
  },
  (nick, content, q) => {
    if (/왜|뭐|어떻|반대|다르/i.test(content)) {
      return q
        ? `나도 ${shortLabel(q)} ${fmtPct(q.changePercent)} 보면서 ${nick}님 말 이해함`
        : `${nick}님 질문 맞는 듯 — 지수랑 개별주 타이밍이 어긋날 때 있음`;
    }
    return `${nick}님 ${snippet(content)} — 나도 비슷하게 봄`;
  },
  (nick, _content, q) => {
    if (!q) return `${nick}님 말 듣고 다시 차트 봤는데 흐름 비슷함`;
    const s = shortLabel(q);
    return q.changePercent >= 0
      ? `${s} ${fmtPct(q.changePercent)}면 ${nick}님 말대로 강한 편인 듯`
      : `${s} ${fmtPct(q.changePercent)}라 ${nick}님 우려 이해됨`;
  },
  (nick, content) => `${nick}님 ${snippet(content)} ㅋㅋ 장중에 이런 얘기 나오면 보통 수급 이슈`,
  (nick, content, q, market) => {
    if (/지수|나스닥|코스피|s&p/i.test(content)) {
      return market === "kr"
        ? "지수랑 개별주 따로 노는 날이 많아서 둘 다 체크하는 게 맞음"
        : "지수·개별주 괴리 날엔 섹터 ETF 같이 보면 편함";
    }
    if (q) return `${shortLabel(q)} ${fmtPct(q.changePercent)} — ${nick}님 포인트랑 맞물리네`;
    return `${nick}님 의견 인정`;
  },
  (nick, content) => `ㅇㅇ ${snippet(content)} 쪽으로 나도 정리 중`,
  (nick, _content, q) => {
    if (!q) return `${nick}님 말 듣고 포지션 다시 봤음`;
    return `${shortLabel(q)} ${fmtPct(q.changePercent)} 찍고 있는데 ${nick}님 말이랑 타이밍 맞네`;
  },
];

/** 실제 사용자 글에 대한 봇 후속 댓글 (2~3개) */
export function generateRepliesToUserMessage(
  userMsg: SessionChatMessage,
  market: MarketId,
  quotes: ChatQuote[],
  indices: ChatQuote[],
): SessionChatMessage[] {
  if (!userMsg.id.startsWith("u-")) return [];

  const h = hashSeed(`${market}-reply-${userMsg.id}`);
  const count = 2 + (h % 2); // 2 or 3
  const related = findRelatedQuote(userMsg.content, quotes, indices);
  const delays = [4_500, 9_000, 14_500];
  const used = new Set<string>();
  const out: SessionChatMessage[] = [];

  for (let i = 0; i < count; i++) {
    const seed = `${userMsg.id}-r${i}`;
    let attempt = 0;
    while (attempt < 8) {
      const idx = (h + i * 3 + attempt) % REPLY_BUILDERS.length;
      const content = REPLY_BUILDERS[idx](userMsg.nick, userMsg.content, related, market);
      if (!used.has(content)) {
        used.add(content);
        out.push({
          id: `sc-reply-${userMsg.id}-${i}`,
          nick: pickSessionNick(seed),
          content,
          symbol: related?.symbol,
          at: userMsg.at + delays[i],
        });
        break;
      }
      attempt++;
    }
  }

  return out;
}

export function generateRepliesToUserMessages(
  userMsgs: SessionChatMessage[],
  market: MarketId,
  quotes: ChatQuote[],
  indices: ChatQuote[],
  sinceMs: number,
  opts: { onlyPast?: boolean } = {},
): SessionChatMessage[] {
  const onlyPast = opts.onlyPast !== false;
  const now = Date.now();
  const out: SessionChatMessage[] = [];
  for (const um of userMsgs) {
    if (um.at < sinceMs) continue;
    const replies = generateRepliesToUserMessage(um, market, quotes, indices);
    out.push(...(onlyPast ? replies.filter((m) => m.at <= now) : replies));
  }
  return out;
}
