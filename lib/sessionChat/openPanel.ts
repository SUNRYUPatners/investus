/** 시황 토크 패널을 앱 어디서든 열기 (CustomEvent) */
export const SESSION_CHAT_OPEN_EVENT = "investus:session-chat-open";

export type SessionChatOpenDetail = { market?: "us" | "kr" };

export function openSessionChatPanel(market?: "us" | "kr"): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<SessionChatOpenDetail>(SESSION_CHAT_OPEN_EVENT, {
      detail: { market },
    }),
  );
}
