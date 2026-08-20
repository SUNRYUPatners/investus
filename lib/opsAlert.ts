import { kvGetDetail, kvSetDetailEx } from "@/lib/kv";
import { toETDateString } from "@/lib/marketHours";

const DEDUP_TTL = 20 * 3600; // 20h — 당일 크론 재시도 구간

type AlertDedup = { sentAt: number; title: string };

function webhookUrl(): string | null {
  const url = (
    process.env.CRON_ALERT_WEBHOOK?.trim()
    || process.env.ORDER_NOTIFY_WEBHOOK?.trim()
    || ""
  );
  return url || null;
}

async function alreadySent(dedupKey: string): Promise<boolean> {
  const prev = await kvGetDetail(`ops-alert:${dedupKey}`);
  return !!prev && typeof (prev as AlertDedup).sentAt === "number";
}

async function markSent(dedupKey: string, title: string): Promise<void> {
  await kvSetDetailEx(`ops-alert:${dedupKey}`, { sentAt: Date.now(), title } satisfies AlertDedup, DEDUP_TTL);
}

/**
 * 운영 알림 (Slack/Discord incoming webhook).
 * dedupKey + ET 거래일 기준 하루 1회 (force=true면 dedup 무시).
 */
export async function sendOpsAlert(opts: {
  dedupKey: string;
  title: string;
  message: string;
  force?: boolean;
}): Promise<{ sent: boolean; skipped?: string }> {
  const day = toETDateString();
  const fullKey = `${opts.dedupKey}:${day}`;

  console.error(`[ops-alert] ${opts.title} — ${opts.message}`);

  if (!opts.force && await alreadySent(fullKey)) {
    return { sent: false, skipped: "dedup" };
  }

  const url = webhookUrl();
  if (!url) {
    console.error("[ops-alert] CRON_ALERT_WEBHOOK / ORDER_NOTIFY_WEBHOOK 미설정 — 로그만 기록");
    return { sent: false, skipped: "no-webhook" };
  }

  const text = `${opts.title}\n${opts.message}`;
  const isNtfy = url.includes("ntfy.sh");
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: isNtfy
        ? { "Content-Type": "text/plain; charset=utf-8", Title: opts.title.slice(0, 250) }
        : { "Content-Type": "application/json" },
      body: isNtfy ? text : JSON.stringify({ text, content: text }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) {
      console.error(`[ops-alert] webhook HTTP ${res.status}`);
      return { sent: false, skipped: `webhook-${res.status}` };
    }
  } catch (e) {
    console.error("[ops-alert] webhook failed:", e);
    return { sent: false, skipped: "webhook-error" };
  }

  await markSent(fullKey, opts.title);
  return { sent: true };
}
