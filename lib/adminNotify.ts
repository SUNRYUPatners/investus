import { Resend } from "resend";
import { escapeHtml } from "@/lib/htmlEscape";

function adminInbox(): string {
  return (
    process.env.CRON_ALERT_EMAIL?.trim()
    || process.env.NEXT_PUBLIC_BIZ_EMAIL?.trim()
    || "sunryupatners@gmail.com"
  );
}

export async function notifyAdminEmail(subject: string, html: string, text: string): Promise<void> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return;
  const resend = new Resend(key);
  await resend.emails.send({
    from: "Investus <onboarding@resend.dev>",
    to: [adminInbox()],
    subject,
    html,
    text,
  });
}

export async function notifyOneUserEmail(to: string, subject: string, text: string): Promise<void> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key || !to.includes("@")) return;
  const resend = new Resend(key);
  await resend.emails.send({
    from: "Investus <onboarding@resend.dev>",
    to: [to],
    subject,
    text,
    html: `<pre style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
  });
}
