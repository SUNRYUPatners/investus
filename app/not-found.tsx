import Link from "next/link";
import { getLocale } from "@/lib/getLocale";
import { currentLogicalPath } from "@/lib/localeMeta";
import { getAllArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/news/NewsUI";
import { TickerSearchBox } from "@/components/TickerSearchBox";

// Renders within the root layout (which supplies the brand header/footer, nav
// and <html>). notFound() is thrown at the leaf (stock layout / news page),
// which keeps the real HTTP 404 status and injects
// <meta name="robots" content="noindex">. Kept content-only to avoid a second
// header/footer. Fast: server-rendered, in-memory data, no extra client JS
// beyond the small ticker search box.

const POPULAR_TICKERS = ["TSLA", "NVDA", "AAPL", "MSFT", "AMZN", "META", "GOOGL", "PLTR"];

const COPY = {
  en: {
    genericH: "This page moved or doesn't exist",
    genericP: "The link may be outdated — but there's plenty to explore below.",
    stockH: (s: string) => `We couldn't find the ticker "${s}"`,
    stockP: "It may be delisted, misspelled, or not covered yet. Search for a symbol or try a popular one:",
    newsH: "We couldn't find that article",
    newsP: "It may have moved or been renamed. Here's the latest Tesla, SpaceX and xAI research:",
    popular: "Popular tickers",
    latest: "Latest research",
    explore: "Explore",
    home: "Home",
    search: "Search",
    nav: { news: "News", analysis: "Analysis", earnings: "Earnings & data", spacex: "SpaceX", guides: "Guides" },
    searchPlaceholder: "Search a ticker (e.g. TSLA)",
    searchCta: "Go",
    backHome: "Back to home",
  },
  ko: {
    genericH: "페이지가 이동했거나 존재하지 않아요",
    genericP: "링크가 오래됐을 수 있습니다 — 아래에서 더 둘러보세요.",
    stockH: (s: string) => `"${s}" 종목을 찾을 수 없어요`,
    stockP: "상장폐지되었거나, 철자가 다르거나, 아직 다루지 않은 종목일 수 있습니다. 종목을 검색하거나 인기 종목을 확인해 보세요:",
    newsH: "해당 글을 찾을 수 없어요",
    newsP: "이동되었거나 주소가 바뀌었을 수 있습니다. 최신 테슬라·스페이스X·xAI 리서치를 확인해 보세요:",
    popular: "인기 종목",
    latest: "최신 리서치",
    explore: "둘러보기",
    home: "홈",
    search: "검색",
    nav: { news: "뉴스", analysis: "분석", earnings: "실적·데이터", spacex: "스페이스X", guides: "투자 가이드" },
    searchPlaceholder: "종목 검색 (예: TSLA)",
    searchCta: "이동",
    backHome: "홈으로 돌아가기",
  },
} as const;

export default async function NotFound() {
  const locale = await getLocale();
  const c = COPY[locale];
  const base = locale === "ko" ? "/ko" : "";
  const path = await currentLogicalPath();

  const stockMatch = path.match(/^\/stock\/([^/]+)\/?$/);
  const newsMatch = path.match(/^\/news\/([^/]+)\/?$/);
  const kind: "stock" | "news" | "generic" = stockMatch ? "stock" : newsMatch ? "news" : "generic";
  const attemptedSymbol = stockMatch ? decodeURIComponent(stockMatch[1]).toUpperCase().slice(0, 12) : "";

  const latest = getAllArticles().slice(0, 6);

  const navItems = [
    { href: `${base}/news`, label: c.nav.news },
    { href: `${base}/news/analysis`, label: c.nav.analysis },
    { href: `${base}/news/earnings`, label: c.nav.earnings },
    { href: `${base}/news/spacex`, label: c.nav.spacex },
    { href: "/learn", label: c.nav.guides },
    { href: `${base}/`, label: c.home },
    { href: `${base}/search`, label: c.search },
  ];

  const headline = kind === "stock" ? c.stockH(attemptedSymbol) : kind === "news" ? c.newsH : c.genericH;
  const sub = kind === "stock" ? c.stockP : kind === "news" ? c.newsP : c.genericP;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 w-full" style={{ background: "var(--bg)" }}>
      {/* Friendly hero */}
      <div className="max-w-2xl">
        <div className="text-4xl mb-3" aria-hidden>
          {kind === "stock" ? "🔎" : kind === "news" ? "🗞️" : "🧭"}
        </div>
        <h1 className="text-2xl font-bold font-syne mb-2" style={{ color: "var(--text)" }}>
          {headline}
        </h1>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
          {sub}
        </p>

        {kind === "stock" && (
          <div className="mb-6">
            <div className="mb-4">
              <TickerSearchBox basePath={base} placeholder={c.searchPlaceholder} cta={c.searchCta} />
            </div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>
              {c.popular}
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TICKERS.map((t) => (
                <Link
                  key={t}
                  href={`${base}/stock/${t}`}
                  className="text-[13px] font-semibold px-3 py-1.5 rounded-lg no-underline border"
                  style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Primary actions */}
        <div className="flex flex-wrap gap-2 mb-5">
          <Link
            href={`${base}/`}
            className="px-5 py-2.5 rounded-xl text-sm font-bold no-underline"
            style={{ background: "var(--mint)", color: "var(--on-accent)" }}
          >
            {c.backHome}
          </Link>
          <Link
            href={`${base}/news`}
            className="px-5 py-2.5 rounded-xl text-sm font-bold no-underline border"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            {c.nav.news}
          </Link>
        </div>

        {/* Explore nav sections + home/search */}
        <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>
          {c.explore}
        </p>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 mb-8" aria-label={c.explore}>
          {navItems.map((n) => (
            <Link key={n.href + n.label} href={n.href} className="text-[13px] font-semibold hover:underline no-underline" style={{ color: "var(--mint)" }}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Latest research */}
      {latest.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--muted)" }}>
            {c.latest}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((a) => (
              <ArticleCard key={a.slug} a={a} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
