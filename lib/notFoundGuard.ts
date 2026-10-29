import { notFound } from "next/navigation";

// Static sub-pages under /news that are real routes (not article slugs).
const NEWS_STATIC = new Set(["analysis", "earnings", "spacex", "about"]);

/**
 * Hard-404 guard for dynamic routes with unknown params.
 *
 * `notFound()` must be thrown ABOVE the Suspense boundary created by the global
 * `app/loading.tsx`; otherwise the loading fallback streams a 200 first and the
 * route becomes a soft 404 (HTTP 200). This runs in the root layout (which wraps
 * — and renders before — that boundary), so an unknown ticker / article slug
 * returns a real HTTP 404.
 *
 * `path` is the logical path (proxy.ts strips the /ko prefix), so this covers
 * both `/stock|/news/...` and their `/ko/...` equivalents. Modules are imported
 * lazily so non-matching routes never load the symbol DB or the report bundle.
 */
export async function guardRoute(path: string): Promise<void> {
  const stock = path.match(/^\/stock\/([^/]+)\/?$/);
  if (stock) {
    const symbol = decodeURIComponent(stock[1]);
    const { isKnownStockSymbol } = await import("@/lib/stockValidation");
    if (!isKnownStockSymbol(symbol)) notFound();
    return;
  }

  const news = path.match(/^\/news\/([^/]+)\/?$/);
  if (news) {
    const slug = decodeURIComponent(news[1]);
    if (NEWS_STATIC.has(slug)) return;
    const { getArticleBySlug } = await import("@/lib/articles");
    if (!getArticleBySlug(slug)) notFound();
  }
}
