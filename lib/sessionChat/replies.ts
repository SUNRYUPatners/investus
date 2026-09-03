import type { MarketId } from "@/lib/markets/types";
import { pickSessionNick } from "./nicks";
import { chatStockLabel } from "./labels";
import type { SessionChatMessage } from "./types";
import type { ChatQuote } from "./generate";

const TICKER_HINTS: { re: RegExp; symbols: string[] }[] = [
  { re: /테슬라|tsla/i, symbols: ["TSLA"] },
  { re: /엔비디아|nvidia|nvda|\b엔비\b/i, symbols: ["NVDA"] },
  { re: /애플|apple|aapl/i, symbols: ["AAPL"] },
  { re: /아마존|amazon|amzn/i, symbols: ["AMZN"] },
  { re: /구글|google|googl|alphabet|알파벳/i, symbols: ["GOOGL"] },
  { re: /메타|meta|facebook/i, symbols: ["META"] },
  { re: /마이크로소프트|microsoft|msft|\b마소\b/i, symbols: ["MSFT"] },
  { re: /브로드컴|avgo|broadcom/i, symbols: ["AVGO"] },
  { re: /넷플릭스|nflx|netflix/i, symbols: ["NFLX"] },
  { re: /\bamd\b|에이엠디/i, symbols: ["AMD"] },
  { re: /삼성전자|삼전|005930/i, symbols: ["005930.KS"] },
  { re: /하이닉스|sk하이닉스|000660/i, symbols: ["000660.KS"] },
  { re: /lg에너지|엘지엔솔|엔솔|373220/i, symbols: ["373220.KS"] },
  { re: /삼성바이오|207940/i, symbols: ["207940.KS"] },
  { re: /현대차|현차|005380/i, symbols: ["005380.KS"] },
  { re: /\b기아\b|000270/i, symbols: ["000270.KS"] },
  { re: /셀트리온|068270/i, symbols: ["068270.KS"] },
  { re: /kb금융|\b케이비\b|105560/i, symbols: ["105560.KS"] },
  { re: /신한지주|신한|055550/i, symbols: ["055550.KS"] },
  { re: /네이버|naver|035420/i, symbols: ["035420.KS"] },
  { re: /카카오|kakao|035720/i, symbols: ["035720.KS"] },
  { re: /코스피|kospi/i, symbols: ["^KS11"] },
  { re: /코스닥|kosdaq/i, symbols: ["^KQ11"] },
  { re: /나스닥|nasdaq|ixic/i, symbols: ["^IXIC"] },
  { re: /s&p|sp500|spy|에스앤피/i, symbols: ["^GSPC"] },
  { re: /다우|dow/i, symbols: ["^DJI"] },
];

type UserIntent =
  | "greeting"
  | "bullish"
  | "bearish"
  | "question"
  | "buyask"
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
  if (/^(ㅎㅇ|하이|안녕하세요?|헬로|hi|hello)[\sㅋㅎㅇ!~]*$/i.test(t)) return "greeting";
  if (/사도\s*돼|지금\s*사|매수할까|들어갈까|익절|손절할까|비중/i.test(t)) return "buyask";
  if (/왜|뭐임|뭔소리|틀린|아닌|맞아\?|진짜\?|설마|아닌데/i.test(t)) return "pushback";
  if (/\?|궁금|알려|어때|어떻게|언제/i.test(t)) return "question";
  if (/코스피|나스닥|s&p|지수|다우|nasdaq|kospi|코스닥/i.test(t)) return "index";
  if (/올라|상승|떡상|초록|강세|달린|불장|급등|반등|회복|좋네|개이득|가즈아/i.test(t)) return "bullish";
  if (/내려|하락|빠졌|약세|공포|손절|폭락|붕괴|피곤|물렸|죽겠|빨개/i.test(t)) return "bearish";
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
      if (market === "kr" && (sym === "^IXIC" || sym === "^GSPC" || sym === "^DJI")) continue;
      if (market === "us" && (sym === "^KS11" || sym === "^KQ11")) continue;

      const q = pool.find(
        (x) => x.symbol === sym || x.symbol.replace(".KS", "") === sym.replace(".KS", ""),
      );
      if (q) return q;
    }
  }

  const scored: { q: ChatQuote; len: number }[] = [];
  for (const q of pool) {
    const label = chatStockLabel(q, market);
    const code = q.symbol.replace(/\.KS$/i, "");
    const names = [label, q.name, code].filter((n) => n && n.length >= 2);
    for (const n of names) {
      if (n.length <= 2 && !/^[A-Z0-9.^]+$/i.test(n)) continue;
      const escaped = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (new RegExp(escaped, "i").test(content)) {
        scored.push({ q, len: n.length });
      }
    }
  }
  scored.sort((a, b) => b.len - a.len);
  return scored[0]?.q ?? null;
}

function pickMover(pool: ChatQuote[], seed: string, exclude: ChatQuote | null): ChatQuote | null {
  const movers = [...pool]
    .filter((q) => q.price > 0 && q.symbol !== exclude?.symbol)
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
  if (movers.length === 0) return null;
  return movers[hashSeed(seed) % Math.min(movers.length, 5)];
}

function tooSimilar(a: string, b: string): boolean {
  const na = a.replace(/\s+/g, "");
  const nb = b.replace(/\s+/g, "");
  if (na === nb) return true;
  if (na.length > 10 && nb.length > 10 && (na.includes(nb.slice(0, 12)) || nb.includes(na.slice(0, 12)))) {
    return true;
  }
  return false;
}

type ReplyCtx = {
  userNick: string;
  intent: UserIntent;
  market: MarketId;
  quote: ChatQuote | null;
  extra: ChatQuote | null;
  slot: number;
  seed: string;
};

function maybeNick(nick: string, seed: string, rate = 0.5): string {
  return hashSeed(`${seed}-nick`) % 100 < rate * 100 ? `${nick}님 ` : "";
}

function pick(arr: string[], seed: string): string {
  return arr[hashSeed(`${seed}-pick`) % arr.length];
}

function quoteBits(quote: ChatQuote | null, market: MarketId): { s: string; pct: string; up: boolean; strong: boolean } {
  if (!quote) return { s: "", pct: "", up: true, strong: false };
  return {
    s: shortLabel(quote, market),
    pct: fmtPct(quote.changePercent),
    up: quote.changePercent >= 0,
    strong: Math.abs(quote.changePercent) >= 1.5,
  };
}

function buildReply(ctx: ReplyCtx): string {
  const { userNick, intent, market, quote, extra, slot, seed } = ctx;
  const nick = maybeNick(userNick, seed, slot === 0 ? 0.7 : 0.35);
  const { s, pct, up, strong } = quoteBits(quote, market);
  const extraBits = quoteBits(extra, market);

  if (slot === 0) {
    if (intent === "greeting") {
      return pick([
        `${nick}ㅎㅇ 오늘 장 같이 보시죠`,
        "오 왔네요. 지금은 변동 좀 있는 편",
        "안녕하세여. 실시간으로 같이 보는 중",
        market === "kr" ? "ㅎㅇ 코스피부터 보고 있으면 됨" : "ㅎㅇ 나스닥 흐름부터 체크 중",
      ], seed);
    }

    if (intent === "buyask") {
      if (quote) {
        return pick([
          `${nick}${s} ${pct}인데 추격은 비추. 비중은 본인 선에서`,
          `${s} ${pct}면 ${up ? "이미 좀 온" : "눌린"} 구간이라 분할이 편함`,
          `${nick}지금 사도 되냐는 질문 많이 나오는데, 손절 라인부터 정하는 게`,
        ], seed);
      }
      return pick([
        `${nick}매수는 본인 비중 문제긴 한데 추격은 조심`,
        "손절 라인 정해두고 들어가면 후회가 덜하더라",
        "장중 단타는 변동 큰 날엔 잘 안 맞음",
      ], seed);
    }

    if (intent === "question" || intent === "pushback") {
      if (quote) {
        return pick([
          `${nick}${s} 지금 ${pct}인데, ${strong ? "뉴스·수급 같이 봐야" : "지수 따라가는 느낌"} 함`,
          `${s} ${pct} 보고 있으면 그 질문 나와요. 오후에 한번 더 보시죠`,
          `${s} ${pct}. 장중에 단정하긴 이름`,
        ], seed);
      }
      return pick([
        `${nick}그거 나도 같은 고민 중`,
        "뉴스 없이 움직이면 수급 쪽 먼저 의심하는 편",
        market === "kr" ? "외인·기관 방향 같이 보면 답 나올 때 많음" : "섹터 ETF 같이 보면 방향 잡기 쉬움",
        `${nick}말씀도 일리 있음. 오늘은 개별주가 더 튀는 날`,
      ], seed);
    }

    if (quote) {
      if (intent === "bullish") {
        return pick([
          `${nick}${s} ${pct} ㅋㅋ ${up ? "분위기 좋긴 한데 추격은 조심" : "올라온다 해도 아직 빨간데?"}`,
          `${s} ${pct} 맞음. ${up ? "수급 붙은 느낌" : "반등 시도 중인 듯"}`,
          `${s} ${pct} 보고 있으면 그 말 나와요`,
        ], seed);
      }
      if (intent === "bearish") {
        return pick([
          `${nick}${s} ${pct}… ${up ? "빠진 건 아닌데 체감이 그런가" : "좀 무겁긴 함. 관망하는 사람도 많음"}`,
          `${s} ${pct}면 ${up ? "숨 고르기" : "공포 매도는 금물"} 같아`,
          `${s} ${pct}. 손절 라인만 정해두면 됨`,
        ], seed);
      }
      return pick([
        `${nick}${s} ${pct} 보고 그 얘기 나온 거지`,
        `${s} ${pct} ㅋㅋ ${strong ? "변동성 큰데" : "무난한데"} 눈은 가네`,
        `나는 ${s} ${pct} 보고 있음`,
      ], seed);
    }

    if (intent === "index") {
      return pick(
        market === "kr"
          ? [
              `${nick}코스피·코스닥 따로 노는 날 많아서 둘 다 체크`,
              "지수는 밍기적인데 대형주만 튀는 패턴",
              "외국인 방향이 오늘 핵심인 듯",
            ]
          : [
              `${nick}지수·개별주 괴리 날엔 섹터부터 보면 편함`,
              "나스닥이 끌어주면 빅테크가 먼저 반응",
              "VIX 같이 보면 오늘 톤 잡기 쉬움",
            ],
        seed,
      );
    }

    if (intent === "bullish") {
      return pick([
        `${nick}ㅋㅋ 맞음 오늘 전반적으로 초록 쪽`,
        "분위기 좋긴 한데 추격 매수는 조심하는 게",
        "다 올라오는 날엔 오히려 뭐 살지 고민됨 ㅋㅋ",
        "수급이 붙은 느낌은 맞는 듯",
      ], seed);
    }

    if (intent === "bearish") {
      return pick([
        `${nick}오늘은 방어적으로 보는 게 맞을 듯`,
        "지수 약하면 개별주도 금방 힘 빠지더라",
        "공포에 팔면 손해 — 근데 추격도 위험",
        "나는 오늘 관망 쪽",
      ], seed);
    }

    return pick([
      `${nick}ㅇㅇ 나도 그렇게 봤음`,
      `${nick}그 말 공감함`,
      "체감상 확실히 분위기 살아있음",
      `${nick}의견 일리 있음. 장중엔 같이 보는 게 답`,
      "맞아 오늘은 눈에 띄는 종목이 많음",
    ], seed);
  }

  if (slot === 1) {
    if (quote) {
      return pick([
        `지금 ${s} ${pct}. ${up ? "수급 붙는" : "되돌림 나오는"} 느낌`,
        `${s} ${pct}면 ${up ? "추세" : "지지"} 테스트 중인 듯`,
        `나는 ${s} ${pct} 쪽 보고 있음. ${up ? "쉬어갈 타이밍인지" : "더 밀릴지"} 고민`,
        `${s} ${pct} ${up ? "↑" : "↓"} 다른 종목이랑 같이 움직이는지 봐야 함`,
        intent === "question"
          ? `${nick}질문 그거 — ${s} ${pct} 보면서 같이 정리 중`
          : `방금 ${s} ${pct} 찍혔는데 ${strong ? "뉴스 있나" : "지수 따라간 듯"}`,
      ], seed);
    }

    if (extra) {
      return pick([
        `나는 ${extraBits.s} ${extraBits.pct}도 같이 보고 있음`,
        `그 얘기 나오니까 ${extraBits.s} ${extraBits.pct}가 더 눈에 띄네`,
        `${extraBits.s} ${extraBits.pct}… 오늘 변동 큰 축`,
      ], seed);
    }

    return pick([
      "장중엔 변동성 큰 종목보다 대형주 흐름이 힌트",
      "오후에 더 움직일 것 같음",
      "뉴스 없이 움직이는 게 더 무섭다",
      `${nick}나도 같은 고민 중 ㅋㅋ`,
    ], seed);
  }

  if (quote) {
    return pick([
      `${s} ${pct}면 ${up ? "들고" : "줄이고"} 싶은데 오후에 한번 더`,
      `장 마감 전에 ${s} 한번 더 체크해야지`,
      extra
        ? `${s}만 보지 말고 ${extraBits.s} ${extraBits.pct}도 같이`
        : `${nick}그 의견 인정. ${s}는 계속 봄`,
      "오늘은 비중 조절이 답인 것 같음",
    ], seed);
  }

  return pick([
    "ㅇㅇ 오후에 더 움직일 듯",
    "나도 비슷하게 봄",
    "장 마감 전에 한번 더 체크해야지",
    `${nick}의견 인정`,
    extra ? `참고로 ${extraBits.s} ${extraBits.pct}도 눈에 띔` : "지금은 관망이 편함",
  ], seed);
}

function replyCount(content: string, h: number): number {
  const t = content.trim();
  if (t.length < 6 || /^(ㅋ+|ㅎ+|ㅇㅇ+|헐+|와+)$/.test(t)) return 1;
  if (classifyIntent(t) === "greeting") return 1 + (h % 2);
  return 2 + (h % 2);
}

function replyDelays(seed: string): number[] {
  const jitter = hashSeed(`${seed}-d`) % 700;
  return [2_200 + jitter, 6_400 + jitter, 12_200 + jitter];
}

/** 실제 사용자 글에 대한 봇 후속 댓글 (1~3개). 말한 내용·종목에 호응. */
export function generateRepliesToUserMessage(
  userMsg: SessionChatMessage,
  market: MarketId,
  quotes: ChatQuote[],
  indices: ChatQuote[],
): SessionChatMessage[] {
  if (!userMsg.id.startsWith("u-")) return [];

  const pool = [...quotes, ...indices].filter((q) => q.price > 0);
  const h = hashSeed(`${market}-reply-${userMsg.id}`);
  const count = replyCount(userMsg.content, h);
  const intent = classifyIntent(userMsg.content);
  const mentioned = findMentionedQuote(userMsg.content, pool, market);
  const extra = mentioned ? pickMover(pool, `${userMsg.id}-x`, mentioned) : null;

  const delays = replyDelays(userMsg.id);
  const out: SessionChatMessage[] = [];
  const usedContents: string[] = [];
  const usedNicks = new Set<string>([userMsg.nick]);

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
        intent,
        market,
        quote: mentioned,
        extra: i === 0 ? null : extra,
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
          symbol: mentioned?.symbol ?? (i > 0 ? extra?.symbol : undefined),
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
  const recent = userMsgs.filter((um) => um.at >= sinceMs);

  for (let i = 0; i < recent.length; i++) {
    const um = recent[i];
    const later = recent.slice(i + 1).find((x) => x.nick === um.nick);
    if (later && later.at - um.at < 25_000) continue;

    const replies = generateRepliesToUserMessage(um, market, quotes, indices);
    out.push(...(onlyPast ? replies.filter((m) => m.at <= now) : replies));
  }
  return out;
}
