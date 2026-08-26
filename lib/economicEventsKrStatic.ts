import type { StaticEcoEvent } from "@/lib/economicEventsStatic";

/** 한국 경제 캘린더 — 한은·통계청·관세청 등 (미리보기용 정적, ±1~2일) */
export const STATIC_KR_ECO_EVENTS: StaticEcoEvent[] = [
  // ── July 2026 ──────────────────────────────────────────────────────────────
  { date: "2026-07-01", time: "2026-07-01T00:00:00+09:00", event: "수출입동향 (관세청)", impact: "high", country: "KR", unit: "", actual: null, estimate: null, prev: null },
  { date: "2026-07-10", time: "2026-07-10T08:00:00+09:00", event: "소비자물가 (CPI)", impact: "high", country: "KR", unit: "%", actual: null, estimate: null, prev: null },
  { date: "2026-07-11", time: "2026-07-11T08:00:00+09:00", event: "실업률·고용동향", impact: "medium", country: "KR", unit: "%", actual: null, estimate: null, prev: null },
  { date: "2026-07-23", time: "2026-07-23T08:00:00+09:00", event: "산업활동동향", impact: "medium", country: "KR", unit: "", actual: null, estimate: null, prev: null },
  { date: "2026-07-25", time: "2026-07-25T10:00:00+09:00", event: "한국은행 기준금리 결정", impact: "high", country: "KR", unit: "%", actual: null, estimate: null, prev: null },
  { date: "2026-07-31", time: "2026-07-31T08:00:00+09:00", event: "GDP (속보, QoQ)", impact: "high", country: "KR", unit: "%", actual: null, estimate: null, prev: null },

  // ── August 2026 ────────────────────────────────────────────────────────────
  { date: "2026-08-01", time: "2026-08-01T00:00:00+09:00", event: "수출입동향 (관세청)", impact: "high", country: "KR", unit: "", actual: null, estimate: null, prev: null },
  { date: "2026-08-05", time: "2026-08-05T08:00:00+09:00", event: "소비자물가 (CPI)", impact: "high", country: "KR", unit: "%", actual: null, estimate: null, prev: null },
  { date: "2026-08-13", time: "2026-08-13T08:00:00+09:00", event: "실업률·고용동향", impact: "medium", country: "KR", unit: "%", actual: null, estimate: null, prev: null },
  { date: "2026-08-14", time: "2026-08-14T08:00:00+09:00", event: "통화및유동성", impact: "low", country: "KR", unit: "", actual: null, estimate: null, prev: null },
  { date: "2026-08-21", time: "2026-08-21T08:00:00+09:00", event: "산업활동동향", impact: "medium", country: "KR", unit: "", actual: null, estimate: null, prev: null },
  { date: "2026-08-26", time: "2026-08-26T08:00:00+09:00", event: "무역수지 (속보)", impact: "medium", country: "KR", unit: "", actual: null, estimate: null, prev: null },
  { date: "2026-08-28", time: "2026-08-28T10:00:00+09:00", event: "한국은행 금융통화위원회", impact: "high", country: "KR", unit: "%", actual: null, estimate: null, prev: null },
  { date: "2026-08-29", time: "2026-08-29T08:00:00+09:00", event: "소매판매·설비투자", impact: "medium", country: "KR", unit: "", actual: null, estimate: null, prev: null },

  // ── September 2026 ─────────────────────────────────────────────────────────
  { date: "2026-09-01", time: "2026-09-01T00:00:00+09:00", event: "수출입동향 (관세청)", impact: "high", country: "KR", unit: "", actual: null, estimate: null, prev: null },
  { date: "2026-09-02", time: "2026-09-02T08:00:00+09:00", event: "소비자물가 (CPI)", impact: "high", country: "KR", unit: "%", actual: null, estimate: null, prev: null },
  { date: "2026-09-10", time: "2026-09-10T08:00:00+09:00", event: "실업률·고용동향", impact: "medium", country: "KR", unit: "%", actual: null, estimate: null, prev: null },
  { date: "2026-09-11", time: "2026-09-11T10:00:00+09:00", event: "한국은행 기준금리 결정", impact: "high", country: "KR", unit: "%", actual: null, estimate: null, prev: null },
  { date: "2026-09-24", time: "2026-09-24T08:00:00+09:00", event: "산업활동동향", impact: "medium", country: "KR", unit: "", actual: null, estimate: null, prev: null },
  { date: "2026-09-30", time: "2026-09-30T08:00:00+09:00", event: "GDP (속보, QoQ)", impact: "high", country: "KR", unit: "%", actual: null, estimate: null, prev: null },
];
