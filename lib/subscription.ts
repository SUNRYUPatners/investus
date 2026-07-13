/** Investus Pro 구독 — 추천주식 · 이전 날짜 리포트 열람 */

export const SUBSCRIPTION = {
  /** 결제 연동 전에도 게이팅 활성화 — 입금 확인 후 investus_pro 메타데이터로 해제 */
  enabled: true,
  priceKrw: 5900,
  periodLabel: "월",
  productName: "Investus Pro",
  bank: {
    bank: "카카오뱅크",
    number: "3333-22-2070396",
    holder: "류현우",
  },
} as const;

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
