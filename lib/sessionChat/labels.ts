import { KR_HEATMAP, MARKET_CONFIG } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";
import { US_NAME_KO_BY_SYMBOL } from "@/lib/stockSearchDb";
import type { ChatQuote } from "./generate";

const KR_NAME_BY_SYMBOL = new Map<string, string>();
for (const s of KR_HEATMAP) {
  const code = s.symbol.replace(/\.KS$/i, "");
  KR_NAME_BY_SYMBOL.set(s.symbol, s.name);
  KR_NAME_BY_SYMBOL.set(code, s.name);
}

const INDEX_LABEL: Record<string, string> = {};
for (const id of ["us", "kr"] as const) {
  for (const idx of MARKET_CONFIG[id].indices) {
    INDEX_LABEL[idx.symbol] = idx.name;
  }
}
INDEX_LABEL["^KS11"] = INDEX_LABEL["^KS11"] ?? "코스피";
INDEX_LABEL["^KQ11"] = "코스닥";
INDEX_LABEL["^IXIC"] = "나스닥";
INDEX_LABEL["^GSPC"] = "S&P500";
INDEX_LABEL["^DJI"] = "다우";

function cleanQuoteName(raw: string): string {
  let name = raw.trim();
  const dash = name.indexOf(" — ");
  if (dash >= 0) name = name.slice(dash + 3).trim();
  return name;
}

function isKrCode(s: string): boolean {
  return /^\d{6}$/.test(s);
}

function isUsTicker(s: string): boolean {
  return /^[A-Z]{1,5}(?:-[A-Z])?$/.test(s);
}

function truncateLabel(name: string): string {
  return name.length > 22 ? `${name.slice(0, 20)}…` : name;
}

function shortEnglishName(raw: string): string | null {
  const name = cleanQuoteName(raw);
  if (!name || isUsTicker(name)) return null;
  const short = name.replace(/\s+(Inc\.?|Corp\.?|Co\.?|Ltd\.?|plc|PLC).*$/i, "").trim();
  if (!short || isUsTicker(short)) return null;
  return truncateLabel(short);
}

/** 채팅·시황 토크에 노출할 종목명 (KR은 숫자 코드 대신 회사명) */
export function chatStockLabel(q: ChatQuote, market: MarketId): string {
  const sym = q.symbol.trim();
  const code = sym.replace(/\.KS$/i, "");

  if (INDEX_LABEL[sym]) return INDEX_LABEL[sym];

  if (market === "kr" || sym.endsWith(".KS") || isKrCode(code)) {
    const mapped = KR_NAME_BY_SYMBOL.get(sym) ?? KR_NAME_BY_SYMBOL.get(code);
    if (mapped) return mapped;

    const name = cleanQuoteName(q.name);
    if (name && !isKrCode(name) && name !== code) {
      return name.length > 22 ? `${name.slice(0, 20)}…` : name;
    }
    return mapped ?? name ?? code;
  }

  if (market === "us" || isUsTicker(sym)) {
    const mapped = US_NAME_KO_BY_SYMBOL[sym];
    if (mapped) return truncateLabel(mapped);

    const english = shortEnglishName(q.name);
    if (english) return english;
  }

  const name = cleanQuoteName(q.name);
  if (name && name.length <= 18 && !isUsTicker(name)) return name;
  if (name && !isUsTicker(name)) return truncateLabel(name);
  return US_NAME_KO_BY_SYMBOL[sym] ?? sym;
}

/** 저장된 메시지 본문의 6자리 KR 코드 → 회사명 (구 메시지 보정) */
export function humanizeKrCodesInText(text: string): string {
  return text.replace(/\b(\d{6})\b/g, (match, code: string) => {
    return KR_NAME_BY_SYMBOL.get(code) ?? match;
  });
}

/** 저장된 메시지 본문의 US 티커 → 한글 회사명 (구 메시지 보정) */
export function humanizeUsTickersInText(text: string): string {
  return text.replace(/\b[A-Z]{1,5}(?:-[A-Z])?\b/g, (match) => {
    return US_NAME_KO_BY_SYMBOL[match] ?? match;
  });
}

export function humanizeChatStockText(text: string, market: MarketId): string {
  if (market === "kr") return humanizeKrCodesInText(text);
  if (market === "us") return humanizeUsTickersInText(text);
  return text;
}
