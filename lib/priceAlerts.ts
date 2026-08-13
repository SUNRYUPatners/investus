import { kvGetDetail, kvSetDetailEx } from "@/lib/kv";

export type PriceAlertDirection = "above" | "below";

export type StoredPriceAlert = {
  id: string;
  userId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  symbol: string;
  direction: PriceAlertDirection;
  target: number;
  createdAt: number;
  /** 발송 시각 — 있으면 재발송 안 함 (수동 삭제 전까지) */
  firedAt?: number | null;
};

const KEY = "price-alerts-v1";
const TTL_SEC = 60 * 60 * 24 * 120; // 120일
export const MAX_ALERTS_PER_USER = 10;

export async function loadPriceAlerts(): Promise<StoredPriceAlert[]> {
  const data = await kvGetDetail(KEY);
  const alerts = data?.alerts;
  return Array.isArray(alerts) ? (alerts as StoredPriceAlert[]) : [];
}

export async function savePriceAlerts(alerts: StoredPriceAlert[]): Promise<boolean> {
  return kvSetDetailEx(KEY, { alerts }, TTL_SEC);
}

export function alertsForUser(all: StoredPriceAlert[], userId: string): StoredPriceAlert[] {
  return all.filter((a) => a.userId === userId && !a.firedAt);
}
