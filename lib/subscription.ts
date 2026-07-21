/** Investus Pro 구독 — 추천주식 · 이전 날짜 리포트 열람 */

export type SubPeriod = "month" | "year";
export type SubPayMethod = "CARD" | "KAKAOPAY" | "NAVERPAY" | "TOSSPAY";

export const SUBSCRIPTION = {
  /** 결제 연동 전에도 게이팅 활성화 — PortOne 결제 후 investus_pro 메타데이터로 해제 */
  enabled: true,
  /** 월간 */
  priceKrw: 5900,
  /** 연간 (월 대비 약 2개월 무료 ≈ 17% 할인) */
  yearlyPriceKrw: 59_000,
  periodLabel: "월",
  productName: "Investus Pro",
} as const;

export const SUB_PAY_METHODS: {
  id: SubPayMethod;
  label: string;
  hint: string;
}[] = [
  { id: "CARD",     label: "신용·체크카드", hint: "국내 카드 · 자동 연장" },
  { id: "KAKAOPAY", label: "카카오페이",   hint: "카카오톡 간편결제" },
  { id: "NAVERPAY", label: "네이버페이",   hint: "네이버 간편결제" },
  { id: "TOSSPAY",  label: "토스페이",     hint: "토스 간편결제" },
];

/** 관리자 — 구독 없이 Pro(추천주식·과거 리포트) 전부 열람 */
export const ADMIN_EMAILS = ["sunryupatners@gmail.com"] as const;

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return (ADMIN_EMAILS as readonly string[]).includes(email.trim().toLowerCase());
}

/** Pro 메타데이터 또는 관리자 이메일 */
export function hasProAccess(opts: {
  email?: string | null;
  investusPro?: boolean;
}): boolean {
  return opts.investusPro === true || isAdminEmail(opts.email);
}

export function formatSubPrice(n: number = SUBSCRIPTION.priceKrw): string {
  return `₩${n.toLocaleString("ko-KR")}`;
}

export function planPriceKrw(period: SubPeriod): number {
  return period === "year" ? SUBSCRIPTION.yearlyPriceKrw : SUBSCRIPTION.priceKrw;
}

export function planLabel(period: SubPeriod): string {
  return period === "year" ? "연" : "월";
}

/** KST 기준 오늘 YYYY-MM-DD */
export function kstTodayKey(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** 리포트 date / updatedAt → YYYY-MM-DD */
export function reportDateKey(r: { date?: string; updatedAt?: string }): string {
  const s = r.updatedAt ?? r.date ?? "";
  const m = s.match(/(\d{4})[.\-/](\d{2})[.\-/](\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : "";
}

/** 오늘(KST) 리포트는 무료, 이전 날짜는 Pro 필요 */
export function isFreeReport(r: { date?: string; updatedAt?: string }, now = new Date()): boolean {
  const key = reportDateKey(r);
  return key !== "" && key === kstTodayKey(now);
}
