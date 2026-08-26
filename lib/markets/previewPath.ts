import { MARKET_IDS, type MarketId } from "./types";

/** `/preview/kr/search` → `{ market: "kr", tab: "search" }` */
export function parsePreviewPath(pathname: string): {
  market: MarketId | null;
  tab: "home" | "search" | "portfolio" | "wall" | "insight" | "more";
  suffix: string;
} {
  const m = pathname.match(/^\/preview\/([^/]+)(\/.*)?$/);
  if (!m) return { market: null, tab: "home", suffix: "" };
  const raw = m[1];
  if (!(MARKET_IDS as string[]).includes(raw)) {
    return { market: null, tab: "home", suffix: "" };
  }
  const rest = m[2] ?? "";
  const suffix = rest || "";
  let tab: "home" | "search" | "portfolio" | "wall" | "insight" | "more" = "home";
  if (rest.startsWith("/search")) tab = "search";
  else if (rest.startsWith("/portfolio")) tab = "portfolio";
  else if (rest.startsWith("/wall")) tab = "wall";
  else if (rest.startsWith("/insight")) tab = "insight";
  else if (rest.startsWith("/more")) tab = "more";
  return { market: raw as MarketId, tab, suffix };
}

export function previewHref(market: MarketId, tab: "home" | "search" | "portfolio" | "wall" | "insight" | "more"): string {
  if (tab === "home") return `/preview/${market}`;
  return `/preview/${market}/${tab}`;
}
