/** 첫 방문 A/B: 온보딩 팝업 vs 인라인 가치 배너. 둘 다 띄우지 않는다. */

export const FIRST_VISIT_VARIANT_KEY = "investus_first_visit_variant";
export const ONBOARDED_KEY = "investus_onboarded";
export const ONBOARDED_EVENT = "investus-onboarded";

export type FirstVisitVariant = "popup" | "banner";

let memoryVariant: FirstVisitVariant | null = null;

export function readOnboarded(): boolean {
  try {
    return localStorage.getItem(ONBOARDED_KEY) === "1";
  } catch {
    return false;
  }
}

export function markOnboarded() {
  try {
    localStorage.setItem(ONBOARDED_KEY, "1");
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(ONBOARDED_EVENT));
  }
}

export function assignFirstVisitVariant(): FirstVisitVariant {
  if (memoryVariant) return memoryVariant;
  try {
    const existing = localStorage.getItem(FIRST_VISIT_VARIANT_KEY);
    if (existing === "popup" || existing === "banner") {
      memoryVariant = existing;
      return existing;
    }
    const assigned: FirstVisitVariant = Math.random() < 0.5 ? "popup" : "banner";
    localStorage.setItem(FIRST_VISIT_VARIANT_KEY, assigned);
    memoryVariant = assigned;
    return assigned;
  } catch {
    memoryVariant = "banner";
    return "banner";
  }
}
