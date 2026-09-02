export const SESSION_CHAT_GUEST_KEY = "investus-session-chat-guest";

export function parseGuestId(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const id = raw.trim();
  return /^\d{8}$/.test(id) ? id : null;
}

export function guestUserId(guestId: string): string {
  return `guest:${guestId}`;
}

export function makeGuestDisplayNick(guestId: string): string {
  return `익명${guestId}`;
}

/** 클라이언트 — localStorage에 8자리 게스트 ID 유지 */
export function getOrCreateGuestId(): string {
  if (typeof window === "undefined") {
    return String(Math.floor(10_000_000 + Math.random() * 90_000_000));
  }
  try {
    const existing = localStorage.getItem(SESSION_CHAT_GUEST_KEY);
    if (existing && /^\d{8}$/.test(existing)) return existing;
    const id = String(Math.floor(10_000_000 + Math.random() * 90_000_000));
    localStorage.setItem(SESSION_CHAT_GUEST_KEY, id);
    return id;
  } catch {
    return String(Math.floor(10_000_000 + Math.random() * 90_000_000));
  }
}

export function readGuestIdFromRequest(req: { headers: { get(name: string): string | null } }): string | null {
  return parseGuestId(req.headers.get("x-session-guest-id"));
}
