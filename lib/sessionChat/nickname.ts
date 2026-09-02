import { makeGuestDisplayNick } from "./guestId";

const NICK_RE = /^[\p{L}\p{N}_가-힣]{2,16}$/u;

export function sanitizeSessionNick(raw: string): string {
  const trimmed = raw.trim().replace(/\s+/g, " ").slice(0, 16);
  if (trimmed.length >= 2 && NICK_RE.test(trimmed)) return trimmed;
  const fallback = trimmed.replace(/[^\p{L}\p{N}_가-힣]/gu, "").slice(0, 16);
  if (fallback.length >= 2) return fallback;
  return "투자자";
}

export function nicknameFromAuthUser(user: {
  email: string;
  user_metadata?: Record<string, unknown>;
}): string {
  const meta = user.user_metadata?.nickname;
  if (typeof meta === "string" && meta.trim().length >= 2) {
    return sanitizeSessionNick(meta);
  }
  const tail = user.email.split("@")[0]?.slice(-4) || "user";
  return sanitizeSessionNick(`투자자_${tail}`);
}

export function guestNick(guestId: string): string {
  return makeGuestDisplayNick(guestId);
}
