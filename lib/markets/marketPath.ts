import { MARKET_IDS, type MarketId } from "./types";

export type MarketTab = "home" | "search" | "portfolio" | "wall" | "insight" | "more";

const TAB_PREFIXES: { tab: MarketTab; prefix: string }[] = [
  { tab: "search", prefix: "/search" },
  { tab: "portfolio", prefix: "/portfolio" },
  { tab: "wall", prefix: "/wall" },
  { tab: "insight", prefix: "/insight" },
  { tab: "more", prefix: "/more" },
];

function parseTab(rest: string): MarketTab {
  for (const { tab, prefix } of TAB_PREFIXES) {
    if (rest === prefix || rest.startsWith(`${prefix}/`)) return tab;
  }
  return "home";
}

/** `/`, `/kr`, `/kr/search`, `/preview/kr/wall` 등에서 시장·탭 파싱 */
export function parseMarketPath(pathname: string): {
  market: MarketId;
  tab: MarketTab;
  suffix: string;
  isPreview: boolean;
} {
  // Legacy preview: /preview/{market}(/tab...)
  const preview = pathname.match(/^\/preview\/([^/]+)(\/.*)?$/);
  if (preview) {
    const raw = preview[1];
    if ((MARKET_IDS as string[]).includes(raw)) {
      const rest = preview[2] ?? "";
      const tab = parseTab(rest);
      const suffix = tab === "home" ? "" : TAB_PREFIXES.find((t) => t.tab === tab)!.prefix;
      return { market: raw as MarketId, tab, suffix, isPreview: true };
    }
  }

  // Main site: /kr(/tab...) — us uses / without prefix
  for (const id of MARKET_IDS) {
    if (id === "us") continue;
    const base = `/${id}`;
    if (pathname === base || pathname.startsWith(`${base}/`)) {
      const rest = pathname.slice(base.length) || "";
      const tab = parseTab(rest);
      const suffix = tab === "home" ? "" : TAB_PREFIXES.find((t) => t.tab === tab)!.prefix;
      return { market: id, tab, suffix, isPreview: false };
    }
  }

  // US main: /, /search, ...
  const tab = parseTab(pathname);
  const suffix = tab === "home" ? "" : TAB_PREFIXES.find((t) => t.tab === tab)!.prefix;
  return { market: "us", tab, suffix, isPreview: false };
}

/** 시장·탭 → 본사 URL (us 홈 = `/`) */
export function marketHref(market: MarketId, tab: MarketTab = "home"): string {
  const tabPath = tab === "home" ? "" : `/${tab}`;
  if (market === "us") return tabPath || "/";
  return `/${market}${tabPath}`;
}

export function isMarketHomePath(pathname: string): boolean {
  return parseMarketPath(pathname).tab === "home";
}
