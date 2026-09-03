import type { MarketId } from "@/lib/markets/types";
import { pickSessionNick } from "./nicks";
import { chatStockLabel } from "./labels";
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
  { re: /kb|케이비|105560/i, symbols: ["105560.KS"] },
  { re: /lg에너지|373220/i, symbols: ["373220.KS"] },
  { re: /코스피|kospi/i, symbols: ["^KS11"] },
  { re: /나스닥|nasdaq|ixic/i, symbols: ["^IXIC"] },
  { re: /s&p|sp500|spy/i, symbols: ["^GSPC"] },
];

type UserIntent =
  | "bullish"
  | "bearish"
  | "question"
  | "pushback"
  | "index"
  | "general";

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) & 0x7fffffff;
  return h;
}

function fmtPct(n: number): string {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

function shortLabel(q: ChatQuote, market: MarketId): string {
  return chatStockLabel(q, market);
}

function classifyIntent(content: string): UserIntent {
  const t = content.trim();
  if (/왜|뭐|어떻|언제|맞아\?|틀린|아닌|뭔소리|진짜\?|설마/i.test(t)) return "pushback";
  if (/\?|궁금|알려|어때|어떻게/i.test(t)) return "question";
  if (/코스피|나스닥|s&p|지수|다우|nasdaq|kospi/i.test(t)) return "index";
  if (/올라|상승|떡상|초록|강세|달린|불장|급등|반등|회복/i.test(t)) return "bullish";
  if (/내려|하락|빠졌|약세|공포|손절|폭락|붕괴|피곤/i.test(t)) return "bearish";
  return "general";
}

function findMentionedQuote(
  content: string,
  pool: ChatQuote[],
  market: MarketId,
): ChatQuote | null {
  for (const hint of TICKER_HINTS) {
    if (!hint.re.test(content)) continue;
    for (const sym of hint.symbols) {
      const isKr = /^\d{6}/.test(sym) || sym.endsWith(".KS") || sym === "^KS11" || sym === "^KQ11";
      if (market === "us" && isKr) continue;
      if (market === "kr" && !isKr && !sym.startsWith("^")) {
        // US 티커 힌트는 KR 방에서 무시 (코스피 등 지수는 위에서 처리)
        if (/^[A-Z]{1,5}$/.test(sym.replace(".KS", ""))) continue;
      }
      if (market === "kr" && (sym === "^IXIC" || sym === "^GSPC" || sym === "^DJI")) continue;
      if (market === "us" && (sym === "^KS11" || sym === "^KQ11")) continue;

      const q = pool.find(
        (x) => x.symbol === sym || x.symbol.replace(".KS", "") === sym.replace(".KS", ""),
      );
      if (q) return q;
    }
  }
  return null;
}

function pickDistinctQuotes(
  pool: ChatQuote[],
  seed: string,
  count: number,
  exclude: ChatQuote | null,
): (ChatQuote | null)[] {
  const movers = [...pool]
    .filter((q) => q.price > 0 && q !== exclude && q.symbol !== exclude?.symbol)
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));

  const h = hashSeed(seed);
  const out: (ChatQuote | null)[] = [];
  const used = new Set<string>();
  if (exclude) used.add(exclude.symbol);

  for (let i = 0; i < count; i++) {
    const candidates = movers.filter((q) => !used.has(q.symbol));
    if (candidates.length === 0) {
      out.push(null);
      continue;
    }
    const q = candidates[(h + i * 7) % candidates.length];
    used.add(q.symbol);
    out.push(q);
  }
  return out;
}

function tooSimilar(a: string, b: string): boolean {
  const na = a.replace(/\s+/g, "");
  const nb = b.replace(/\s+/g, "");
  if (na === nb) return true;
  const pctA = a.match(/[+-]?\d+\.\d+%/g) ?? [];
  const pctB = b.match(/[+-]?\d+\.\d+%/g) ?? [];
  const p0 = pctA[0];
  const p1 = pctB[0];
  if (p0 && p1 && p0 === p1 && na.includes(p0) && nb.includes(p1)) {
    const stripPct = (s: string) => s.replace(/[+-]?\d+\.\d+%/g, "").replace(/\s+/g, "");
    const sa = stripPct(a);
    const sb = stripPct(b);
    if (sa.length > 8 && sb.length > 8 && (sa.includes(sb.slice(0, 10)) || sb.includes(sa.slice(0, 10)))) {
      return true;
    }
  }
  return false;
}

type ReplyCtx = {
  userNick: string;
  content: string;
  intent: UserIntent;
  market: MarketId;
  quote: ChatQuote | null;
  slot: number;
  seed: string;
};

function maybeNick(nick: string, seed: string, rate = 0.35): string {
  return hashSeed(`${seed}-nick`) % 100 < rate * 100 ? `${nick}님 ` : "";
}

function buildReply(ctx: ReplyCtx): string {
  const { userNick, intent, market, quote, slot, seed } = ctx;
  const nick = maybeNick(userNick, seed);
  const s = quote ? shortLabel(quote, market) : "";
  const pct = quote ? fmtPct(quote.changePercent) : "";
  const up = quote ? quote.changePercent >= 0 : true;

  const bullishNoTicker = [
    "ㅋㅋ 맞음 오늘 전반적으로 초록불이네",
    "분위기 좋긴 한데 추격 매수는 조심하는 게",
    "지수보다 개별주가 더 세게 달리는 날",
    "장 초반에 이렇게 올라오면 오후에 숨 고르기도 함",
    "다 올라오는 날엔 오히려 뭐 살지 고민됨 ㅋㅋ",
    "수급이 붙은 느낌은 맞는 듯",
    "나도 오늘 포지션 가벼운 편",
    "강세장 분위기인데 변동성도 같이 커지는 중",
  ];

  const pushbackNoTicker = [
    "ㅋㅋㅋ 말씀도 일리 있음",
    "오늘은 확실히 개별주 장인 듯",
    "지수는 아직 눌렸는데 종목만 달리는 그림",
    "장중에 이런 얘기 나오면 보통 수급 이슈",
    "맞아 오늘은 눈에 띄는 종목이 많음",
    "ㅇㅇ 나도 그렇게 봤음",
    "체감상 확실히 분위기 살아있음",
  ];

  const bearishNoTicker = [
    "오늘은 방어적으로 보는 게 맞을 듯",
    "지수 약하면 개별주도 금방 힘 빠지더라",
    "손절 라인 미리 정해두는 날",
    "공포에 팔면 손해 — 근데 추격도 위험",
    "나는 오늘 관망 쪽",
  ];

  const questionNoTicker = [
    "지수·섹터·개별주 순서로 보면 정리하기 편함",
    "뉴스 없이 움직이면 수급 쪽 먼저 의심",
    "장중엔 변동성 큰 종목보다 대형주 흐름이 힌트",
    "나도 같은 고민 중 ㅋㅋ",
    market === "kr" ? "외인·기관 수급 같이 보면 답 나올 때 많음" : "섹터 ETF 같이 보면 방향 잡기 쉬움",
  ];

  const withQuote = quote
    ? [
        `${s} ${pct} ㅋㅋ ${Math.abs(quote.changePercent) >= 1.5 ? "변동성 큰데" : "무난한데"}`,
        `${s} ${pct} — ${up ? "수급 붙는" : "되돌림 나오는"} 느낌`,
        `나는 ${s} ${pct} 쪽 보고 있음`,
        `${s} ${pct}. ${up ? "쉬어갈 타이밍" : "공포 매도는 금물"} 같아`,
        `${s} ${pct} ${up ? "↑" : "↓"} 다른 종목이랑 같이 움직이는지 봐야 함`,
        `방금 ${s} ${pct} 찍혔는데 이거 뉴스 있나`,
        `${s} ${pct}면 ${up ? "추세" : "지지"} 테스트 중인 듯`,
      ]
    : [];

  const indexLines =
    market === "kr"
      ? [
          "코스피·코스닥 따로 노는 날 많아서 둘 다 체크",
          "지수는 밍기적인데 대형주만 튀는 패턴",
          "외국인 방향이 오늘 핵심",
        ]
      : [
          "지수·개별주 괴리 날엔 섹터 ETF 같이 보면 편함",
          "나스닥이 끌어주면 빅테크가 먼저 반응",
          "VIX 같이 보면 오늘 톤 잡기 쉬움",
        ];

  const pick = (arr: string[]) => arr[hashSeed(`${seed}-pick`) % arr.length];

  if (slot === 0) {
    if (intent === "bullish" || intent === "pushback") return pick(bullishNoTicker);
    if (intent === "bearish") return pick(bearishNoTicker);
    if (intent === "question") return `${nick}${pick(questionNoTicker)}`;
    if (intent === "index") return pick(indexLines);
    return pick([...pushbackNoTicker, ...bullishNoTicker]);
  }

  if (slot === 1) {
    if (quote && withQuote.length > 0) return pick(withQuote);
    if (intent === "index") return pick(indexLines);
    return pick(questionNoTicker);
  }

  if (intent === "question") {
    return quote && withQuote.length > 0
      ? `${nick}질문 맞는 듯 — ${s} ${pct} 보면서 같이 정리 중`
      : pick(questionNoTicker);
  }

  if (quote && withQuote.length > 0) {
    const alt = withQuote.filter((line) => !line.includes(nick.trim()));
    return pick(alt.length > 0 ? alt : withQuote);
  }

  const closers = [
    "ㅇㅇ 오후에 더 움직일 듯",
    "나도 비슷하게 봄",
    "장 마감 전에 한번 더 체크해야지",
    "오늘은 비중 조절이 답인 것 같음",
    `${nick}의견 인정`,
  ];
  return pick(closers);
}

/** 실제 사용자 글에 대한 봇 후속 댓글 (2~3개, 서로 다른 톤·종목) */
export function generateRepliesToUserMessage(
  userMsg: SessionChatMessage,
  market: MarketId,
  quotes: ChatQuote[],
  indices: ChatQuote[],
): SessionChatMessage[] {
  if (!userMsg.id.startsWith("u-")) return [];

  const pool = [...quotes, ...indices].filter((q) => q.price > 0);
  const h = hashSeed(`${market}-reply-${userMsg.id}`);
  const count = 2 + (h % 2);
  const intent = classifyIntent(userMsg.content);
  const mentioned = findMentionedQuote(userMsg.content, pool, market);
  const slotQuotes = pickDistinctQuotes(pool, userMsg.id, count, mentioned);
  if (mentioned) slotQuotes[0] = mentioned;

  const delays = [4_500, 9_500, 15_500];
  const out: SessionChatMessage[] = [];
  const usedContents: string[] = [];
  const usedNicks = new Set<string>();

  for (let i = 0; i < count; i++) {
    let attempt = 0;
    while (attempt < 12) {
      const nick = pickSessionNick(`${userMsg.id}-r${i}-${attempt}`);
      if (usedNicks.has(nick)) {
        attempt++;
        continue;
      }

      const content = buildReply({
        userNick: userMsg.nick,
        content: userMsg.content,
        intent,
        market,
        quote: slotQuotes[i] ?? null,
        slot: i,
        seed: `${userMsg.id}-s${i}-a${attempt}`,
      });

      const dup = usedContents.some((prev) => tooSimilar(prev, content));
      if (!dup) {
        usedContents.push(content);
        usedNicks.add(nick);
        out.push({
          id: `sc-reply-${userMsg.id}-${i}`,
          nick,
          content,
          symbol: slotQuotes[i]?.symbol,
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
