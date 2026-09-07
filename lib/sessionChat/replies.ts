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
  | "whyMove"
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
  // 「왜 오르/내리」는 원인 질문 — pushback보다 먼저
  if (/왜\s*(오르|올라|급등|떡상|강세|내리|빠져|급락|약세|빨개)/i.test(t) || /왜오르|왜내리|왜빠져|왜올라/i.test(t)) {
    return "whyMove";
  }
  if (/뭐임|뭔소리|틀린|아닌데|설마|진짜\?/i.test(t)) return "pushback";
  if (/\?|궁금|알려|어때|어떻게|언제|왜/i.test(t)) return "question";
  if (/코스피|나스닥|s&p|지수|다우|nasdaq|kospi|코스닥/i.test(t)) return "index";
  if (/올라|상승|떡상|초록|강세|달린|불장|급등|반등|회복|좋네|개이득|가즈아/i.test(t)) return "bullish";
  if (/내려|하락|빠졌|약세|공포|손절|폭락|붕괴|피곤|물렸|죽겠|빨개/i.test(t)) return "bearish";
  return "general";
}

/** 종목별 추측성 한 줄 (단정 금지 — ~일 수도 / 뉴스 쪽?) */
function speculativeHints(quote: ChatQuote | null, market: MarketId, up: boolean): string[] {
  const sym = (quote?.symbol ?? "").replace(/\.KS$/i, "");
  const kr: Record<string, { up: string[]; down: string[] }> = {
    "000660": {
      up: [
        "HBM·AI 메모리 기대 뉴스 쪽 아닐까요?",
        "자사주·ADR 강세 이야기 이어진 건가…",
        "반도체 수급 붙는다는 얘기 있던데 그거?",
      ],
      down: [
        "차익실현·고베타 조정일 수도",
        "금리·달러 쪽 뉴스 반영된 건가",
        "외국인 매도 소식 있던데 그거 아닐지",
      ],
    },
    "005930": {
      up: [
        "자사주 수급 방패 이야기가 또 나온 건가",
        "HBM·반도체 로테이션으로 붙는 느낌?",
        "외국인·기관 같이 산다는 속보 있었나",
      ],
      down: [
        "프로그램 매도·차익실현 쪽일 수도",
        "지수보다 먼저 쉬는 날도 있더라",
        "환율·금리 뉴스에 베타로 빠진 건가",
      ],
    },
    "373220": {
      up: ["에너지저장·수주 뉴스 있었나?", "2차전지 섹터 로테이션일 수도"],
      down: ["전기차 수요 둔화 이야기 반영된 듯?", "반도체만 강한 날 배터리는 쉬더라"],
    },
    "005380": {
      up: ["수출·모빌리티 이슈 붙은 건가", "환율 우호 쪽으로 읽는 사람 있던데"],
      down: ["유가·금리 부담으로 빠진 건가", "완성차는 반도체랑 따로 노는 날 많음"],
    },
    "105560": {
      up: ["금리 기대가 금융주에 우호로 바뀐 건가"],
      down: ["할인율·금리 재가격으로 은행주 먼저 빠지더라"],
    },
  };
  const us: Record<string, { up: string[]; down: string[] }> = {
    TSLA: {
      up: ["로보택시·FSD 뉴스 흐름 아닐까요?", "사이버캡 이슈 여운인가…"],
      down: ["규제·조사 헤드라인 반영된 건가", "고배율이라 차익실현 빠른 듯"],
    },
    NVDA: {
      up: ["AI 캡엑스·실적 기대가 붙는 날?", "반도체 섹터 전체 탄력이려나"],
      down: ["차익실현·금리 민감으로 먼저 쉬는 듯", "가이던스 소화 구간일 수도"],
    },
    SPCX: {
      up: ["발사·스타링크 뉴스 있었나?", "상장 테마로 붙는 날도 있더라"],
      down: ["비상장 호가 노이즈일 수도", "테슬라랑 같이 흔들리는 구간?"],
    },
  };
  const pack = market === "kr" ? kr[sym] : us[sym];
  if (pack) return up ? pack.up : pack.down;
  return up
    ? [
        "수급·뉴스 둘 중 하나일 듯한데 확실하진 않음",
        "섹터 전체가 붙는 흐름일 수도",
        "장중엔 재료 없이 튀는 날도 있음",
      ]
    : [
        "차익실현·수급 이탈 쪽일 수도",
        "지수 약세에 베타로 빠진 건가",
        "뉴스 없이 밀릴 때도 있더라",
      ];
}

function uncertainReplies(userNick: string, s: string, seed: string): string[] {
  // maybeNick is defined below — call via local prefix only when building buildReply
  return [
    `솔직히 나도 잘 모르겠음. 아시는분?`,
    `${s ? `${s} ` : ""}왜 그런지 단정 못 하겠음 ㅋㅋ 누가 알려주셈`,
    "뉴스 못 봤는데… 수급만인가? 아시는분 계세요?",
    `몰라서 물어본 건데 같이 찾아보죠`,
    "저도 궁금함. 속보 보신 분?",
    `${s ? `${s} ` : ""}장중이라 추측만 나옴. 확정 재료 보신 분?`,
  ];
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

  // 「왜 오르/내리」— 슬롯마다 톤을 다르게 (가격 복창만 하지 않음)
  if (intent === "whyMove") {
    const hints = speculativeHints(quote, market, up);
    const hint = pick(hints, `${seed}-hint`);
    if (slot === 0) {
      const mode = hashSeed(`${seed}-wm0`) % 10;
      if (mode < 4) {
        return maybeNick(userNick, seed, 0.5) + pick(uncertainReplies(userNick, s, seed), `${seed}-unc`);
      }
      if (quote) {
        return pick([
          `${nick}${hint}`,
          `${s} ${pct}인데… ${hint}`,
          `${nick}${up ? "오르는" : "빠지는"} 이유 단정은 어렵고, ${hint}`,
          `${hint}${s ? ` (${s} ${pct})` : ""}`,
        ], seed);
      }
      return pick([`${nick}${hint}`, ...uncertainReplies(userNick, "", seed).slice(0, 2)], seed);
    }
    if (slot === 1) {
      const mode = hashSeed(`${seed}-wm1`) % 10;
      if (mode < 4) {
        return pick(uncertainReplies(userNick, s, `${seed}-u2`), `${seed}-u2`);
      }
      return pick([
        `${nick}그거 나도 궁금했음. ${hint}`,
        quote ? `방금 ${s} ${pct}인데 ${hint}` : hint,
        `${nick}속보 본 사람? 나는 ${hint}`,
        market === "kr"
          ? "외인·기관 수급이랑 뉴스 같이 보면 힌트 나올 때 있음"
          : "섹터 ETF·헤드라인 같이 보면 방향 잡기 쉬움",
      ], seed);
    }
    return pick([
      "ㅇㅇ 장중엔 추측만 난무함 ㅋㅋ",
      `${nick}오후에 재료 확인되면 얘기하죠`,
      quote ? `${s}는 계속 보되 추격은 조심` : "일단 관망하면서 속보만 체크",
      "맞아 확정 전엔 비중 안 키우는 게",
    ], seed);
  }

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
        const hints = speculativeHints(quote, market, up);
        const hint = pick(hints, `${seed}-qh`);
        return pick([
          `${nick}${hint}`,
          `${nick}${s} 지금 ${pct}인데, ${strong ? hint : "지수 따라가는 느낌도 있음"}`,
          `${s} ${pct} 보고 있으면 그 질문 나와요. ${hint}`,
          pick(uncertainReplies(userNick, s, seed), `${seed}-qu`),
          `${s} ${pct}. 장중이라 단정은 이르죠 — ${hint}`,
        ], seed);
      }
      return pick([
        `${nick}그거 나도 같은 고민 중`,
        "뉴스 없이 움직이면 수급 쪽 먼저 의심하는 편",
        market === "kr" ? "외인·기관 방향 같이 보면 답 나올 때 많음" : "섹터 ETF 같이 보면 방향 잡기 쉬움",
        `${nick}말씀도 일리 있음. 오늘은 개별주가 더 튀는 날`,
        pick(uncertainReplies(userNick, "", seed), `${seed}-qg`),
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
    if (intent === "question" || intent === "pushback") {
      const hints = speculativeHints(quote, market, up);
      const hint = pick(hints, `${seed}-s1q`);
      return pick([
        pick(uncertainReplies(userNick, s, `${seed}-s1u`), `${seed}-s1u`),
        hint,
        quote ? `${s} ${pct}만 보고 단정은 금물. ${hint}` : "오후에 재료 나오면 다시 얘기하죠",
        `${nick}나도 같은 고민 중 ㅋㅋ`,
      ], seed);
    }

    if (quote) {
      return pick([
        `지금 ${s} ${pct}. ${up ? "수급 붙는" : "되돌림 나오는"} 느낌`,
        `${s} ${pct}면 ${up ? "추세" : "지지"} 테스트 중인 듯`,
        `나는 ${s} ${pct} 쪽 보고 있음. ${up ? "쉬어갈 타이밍인지" : "더 밀릴지"} 고민`,
        `${s} ${pct} ${up ? "↑" : "↓"} 다른 종목이랑 같이 움직이는지 봐야 함`,
        `방금 ${s} ${pct} 찍혔는데 ${strong ? "뉴스 있나" : "지수 따라간 듯"}`,
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
