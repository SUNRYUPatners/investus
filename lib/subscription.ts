/** Investus Pro 구독 — 추천주식 · 이전 날짜 리포트 열람 */

export const SUBSCRIPTION = {
  /** 결제 연동 전에도 게이팅 활성화 — PortOne 결제 후 investus_pro 메타데이터로 해제 */
  enabled: true,
  priceKrw: 5900,
  periodLabel: "월",
  productName: "Investus Pro",
} as const;

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

export function formatSubPrice(n = SUBSCRIPTION.priceKrw): string {
  return `₩${n.toLocaleString("ko-KR")}`;
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
