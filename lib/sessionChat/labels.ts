import { KR_HEATMAP, MARKET_CONFIG } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";
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

function cleanQuoteName(raw: string): string {
  let name = raw.trim();
  const dash = name.indexOf(" — ");
  if (dash >= 0) name = name.slice(dash + 3).trim();
  return name;
}

function isKrCode(s: string): boolean {
  return /^\d{6}$/.test(s);
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

  const name = cleanQuoteName(q.name);
  if (name && name.length <= 18) return name;
  if (/^[A-Z]{1,5}$/.test(sym)) return sym;
  if (name) return name.length > 22 ? `${name.slice(0, 20)}…` : name;
  return sym;
}

/** 저장된 메시지 본문의 6자리 KR 코드 → 회사명 (구 메시지 보정) */
export function humanizeKrCodesInText(text: string): string {
  return text.replace(/\b(\d{6})\b/g, (match, code: string) => {
    return KR_NAME_BY_SYMBOL.get(code) ?? match;
  });
}
