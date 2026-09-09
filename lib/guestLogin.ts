export const OPEN_LOGIN_EVENT = "investus-open-login";

/** 헤더·홈 CTA에서 전역 로그인 시트를 연다. */
export function openGuestLogin() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_LOGIN_EVENT));
}
