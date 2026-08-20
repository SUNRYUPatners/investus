import { kvGetDetail, kvSetDetailEx } from "@/lib/kv";
import { toETDateString } from "@/lib/marketHours";
import nodemailer from "nodemailer";
import { Resend } from "resend";

const DEDUP_TTL = 20 * 3600; // 20h — 당일 크론 재시도 구간

type AlertDedup = { sentAt: number; title: string };

/** ntfy·Slack 등 웹훅 URL */
function webhookUrl(): string | null {
  const url = (
    process.env.CRON_ALERT_WEBHOOK?.trim()
    || process.env.ORDER_NOTIFY_WEBHOOK?.trim()
    || ""
  );
  return url || null;
}

/** 장마감 알림 수신 이메일 */
function alertEmail(): string | null {
  const raw = (
    process.env.CRON_ALERT_EMAIL?.trim()
    || process.env.NEXT_PUBLIC_BIZ_EMAIL?.trim()
    || "sunryupatners@gmail.com"
  );
  return raw.includes("@") ? raw : null;
}

async function sendAlertEmailGmail(title: string, message: string): Promise<boolean> {
  const user = process.env.CRON_ALERT_GMAIL_USER?.trim();
  const pass = process.env.CRON_ALERT_GMAIL_APP_PASSWORD?.trim()?.replace(/\s+/g, "");
  const to = alertEmail();
  if (!user || !pass || !to) return false;
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });
    await transport.sendMail({
      from: `Investus Ops <${user}>`,
      to,
      subject: title,
      text: message,
    });
    return true;
  } catch (e) {
    console.error("[ops-alert] Gmail SMTP failed:", e);
    return false;
  }
}

async function sendAlertEmail(title: string, message: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (key) {
    const to = alertEmail();
    if (!to) return false;
    try {
      const resend = new Resend(key);
      const { error } = await resend.emails.send({
        from: "Investus Ops <onboarding@resend.dev>",
        to: [to],
        subject: title,
        text: message,
      });
      if (!error) return true;
      console.error("[ops-alert] Resend error:", error);
    } catch (e) {
      console.error("[ops-alert] Resend failed:", e);
    }
  }
  return sendAlertEmailGmail(title, message);
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
  const text = `${opts.title}\n${opts.message}`;

  let sentEmail = false;
  let sentWebhook = false;

  sentEmail = await sendAlertEmail(opts.title, text);

  if (url) {
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
      sentWebhook = res.ok;
      if (!res.ok) console.error(`[ops-alert] webhook HTTP ${res.status}`);
    } catch (e) {
      console.error("[ops-alert] webhook failed:", e);
    }
  }

  if (!sentEmail && !sentWebhook) {
    console.error("[ops-alert] 이메일·웹훅 모두 실패 — 로그만 기록");
    return { sent: false, skipped: "no-channel" };
  }

  await markSent(fullKey, opts.title);
  return { sent: true };
}
