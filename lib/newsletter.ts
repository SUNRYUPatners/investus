import { createHmac } from "crypto";
import { Redis } from "@upstash/redis";
import { notifyAdminEmail, notifyOneUserEmail } from "@/lib/adminNotify";
import { escapeHtml } from "@/lib/htmlEscape";

const SET_KEY = "newsletter:emails";
const META_PREFIX = "newsletter:meta:";

export type NewsletterLocale = "ko" | "en";

type NewsletterMeta = {
  locale: NewsletterLocale;
  createdAt: number;
};

let _redis: Redis | null | undefined;

function getRedis(): Redis | null {
  if (_redis !== undefined) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    _redis = null;
    return null;
  }
  _redis = new Redis({ url, token });
  return _redis;
}

function hmacSecret(): string {
  return (
    process.env.NOTIFY_SECRET?.trim()
    || process.env.CRON_SECRET?.trim()
    || "investus-newsletter"
  );
}

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 200;
}

export function unsubscribeToken(email: string): string {
  return createHmac("sha256", hmacSecret()).update(normalizeEmail(email)).digest("hex").slice(0, 32);
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expected = unsubscribeToken(email);
  return expected.length === token.length && expected === token;
}

function metaKey(email: string) {
  return `${META_PREFIX}${normalizeEmail(email)}`;
}

export async function addNewsletterEmail(email: string, locale: NewsletterLocale): Promise<"added" | "exists"> {
  const addr = normalizeEmail(email);
  const redis = getRedis();
  if (redis) {
    const added = await redis.sadd(SET_KEY, addr);
    await redis.hset(metaKey(addr), { locale, createdAt: String(Date.now()) });
    return added === 1 ? "added" : "exists";
  }
  return "added";
}

export async function removeNewsletterEmail(email: string): Promise<void> {
  const addr = normalizeEmail(email);
  const redis = getRedis();
  if (!redis) return;
  await redis.srem(SET_KEY, addr);
  await redis.del(metaKey(addr));
}

export async function listNewsletterEmails(): Promise<{ email: string; locale: NewsletterLocale }[]> {
  const redis = getRedis();
  if (!redis) return [];
  const emails = (await redis.smembers(SET_KEY)) as string[];
  const out: { email: string; locale: NewsletterLocale }[] = [];
  for (const email of emails) {
    if (!isValidEmail(email)) continue;
    const meta = (await redis.hgetall(metaKey(email))) as NewsletterMeta | null;
    out.push({ email, locale: meta?.locale === "en" ? "en" : "ko" });
  }
  return out;
}

export async function notifyAdminNewSubscriber(email: string, locale: NewsletterLocale): Promise<void> {
  const addr = escapeHtml(email);
  await notifyAdminEmail(
    `[Investus] 아침 브리핑 메일 구독 — ${email}`,
    `<p>새 구독: <b>${addr}</b> (${locale})</p>`,
    `새 구독: ${email} (${locale})`,
  );
}

export async function sendBriefingDigestEmails(opts: {
  headlineKo: string;
  headlineEn?: string;
  dateKey: string;
}): Promise<{ sent: number; failed: number; total: number }> {
  const redis = getRedis();
  if (!redis) return { sent: 0, failed: 0, total: 0 };
  if (!process.env.RESEND_API_KEY?.trim()) {
    const emails = (await redis.smembers(SET_KEY)) as string[];
    return { sent: 0, failed: 0, total: emails.length };
  }
  const list = await listNewsletterEmails();
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.investus.kr";
  let sent = 0;
  let failed = 0;
  const batch = list.slice(0, 80);

  await Promise.allSettled(
    batch.map(async ({ email, locale }) => {
      const isKo = locale !== "en";
      const headline = isKo ? opts.headlineKo : (opts.headlineEn || opts.headlineKo);
      const token = unsubscribeToken(email);
      const unsub = `${origin}/api/newsletter?email=${encodeURIComponent(email)}&token=${token}`;
      const subject = isKo
        ? `장전 브리핑 · ${opts.dateKey}`
        : `Pre-market brief · ${opts.dateKey}`;
      const text = isKo
        ? `${headline}\n\n오늘 브리핑: ${origin}\n수신거부: ${unsub}\n\n참고용 정보이며 투자 권유가 아닙니다.`
        : `${headline}\n\nToday's brief: ${origin}\nUnsubscribe: ${unsub}\n\nReference only — not investment advice.`;
      try {
        await notifyOneUserEmail(email, subject, text);
        sent++;
      } catch {
        failed++;
      }
    }),
  );

  return { sent, failed, total: list.length };
}
