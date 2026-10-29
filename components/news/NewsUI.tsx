import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Header } from "@/components/Header";
import type { Article, ArticleLocale } from "@/lib/articles";
import { parseBody, pickText, tickerName } from "@/lib/articles";
import { CATEGORY_STYLE } from "@/lib/reports";

type L = ArticleLocale;

export const NEWS_STRINGS = {
  en: {
    brand: "INVESTUS",
    tagline: "Tesla · SpaceX · xAI — investor research on the Musk ecosystem",
    home: "Home",
    news: "News",
    analysis: "Analysis",
    earnings: "Earnings & data",
    spacex: "SpaceX valuation",
    guides: "Guides",
    about: "About & editorial",
    latest: "Latest research",
    allArticles: "All articles",
    readMore: "Read full analysis",
    sources: "Sources & further reading",
    published: "Published",
    disclaimerTitle: "Disclaimer",
    disclaimer:
      "This article is editorial research for informational purposes only. It is not investment advice, a recommendation, or a solicitation to buy or sell any security, and does not guarantee any return. Markets carry risk of loss. Verify figures against the primary sources before making decisions.",
    koVersion: "한국어로 보기",
    byline: "By the Investus editorial desk",
    relatedTicker: "More on",
    backToNews: "Back to all news",
    noEnglish:
      "A full English translation of this report is in progress. The analysis below reflects the original Korean research.",
  },
  ko: {
    brand: "INVESTUS",
    tagline: "테슬라 · 스페이스X · xAI — 머스크 생태계 투자 리서치",
    home: "홈",
    news: "뉴스",
    analysis: "분석",
    earnings: "실적·데이터",
    spacex: "스페이스X 밸류에이션",
    guides: "투자 가이드",
    about: "소개·편집 방침",
    latest: "최신 리서치",
    allArticles: "전체 글",
    readMore: "분석 전문 보기",
    sources: "출처 및 참고자료",
    published: "발행",
    disclaimerTitle: "투자 유의사항",
    disclaimer:
      "본 글은 정보 제공 목적의 편집 리서치입니다. 투자 자문이나 매수·매도 권유가 아니며 수익을 보장하지 않습니다. 투자에는 원금 손실 위험이 있습니다. 판단 전 반드시 원 출처로 수치를 확인하시기 바랍니다.",
    koVersion: "View in English",
    byline: "인베스트어스 편집팀",
    relatedTicker: "관련 종목",
    backToNews: "전체 뉴스로",
    noEnglish: "",
  },
} as const;

function navItems(locale: L) {
  const s = NEWS_STRINGS[locale];
  const base = locale === "en" ? "" : "/ko";
  return [
    { href: `${base}/news`, label: s.news },
    { href: `${base}/news/analysis`, label: s.analysis },
    { href: `${base}/news/earnings`, label: s.earnings },
    { href: `${base}/news/spacex`, label: s.spacex },
    { href: locale === "en" ? "/learn" : "/learn", label: s.guides },
    { href: `${base}/news/about`, label: s.about },
  ];
}

/** Article pages keep the site Header so users can return home via the top nav. */
export function ArticlePageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

export function NewsChrome({
  locale,
  altHref,
  children,
}: {
  locale: L;
  altHref: string;
  children: React.ReactNode;
}) {
  const s = NEWS_STRINGS[locale];
  const base = locale === "en" ? "" : "/ko";
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <header
        className="border-b"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <Link href={`${base}/news`} className="flex items-baseline gap-2">
              <span className="font-syne font-bold text-lg tracking-tight" style={{ color: "var(--text)" }}>
                {s.brand}
              </span>
              <span className="hidden sm:inline text-[11px]" style={{ color: "var(--muted)" }}>
                {s.tagline}
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href={altHref} className="text-[12px] font-semibold hover:underline" style={{ color: "var(--mint)" }}>
                {s.koVersion}
              </Link>
              <Link href={locale === "ko" ? "/ko" : "/"} className="text-[12px] hover:underline" style={{ color: "var(--muted)" }}>
                {s.home}
              </Link>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-1 mt-2" aria-label={s.news}>
            {navItems(locale).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-[12px] font-semibold hover:underline"
                style={{ color: "var(--text)" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

export function ArticleCard({ a, locale }: { a: Article; locale: L }) {
  const t = pickText(a, locale);
  const style = CATEGORY_STYLE[a.categoryColor];
  const base = locale === "en" ? "" : "/ko";
  return (
    <article
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <Link href={`${base}/news/${a.slug}`} className="block p-4 hover:opacity-90 transition-opacity">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: style.bg, color: style.color }}
          >
            {a.category}
          </span>
          {a.ticker && (
            <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "var(--text)" }}>
              {tickerName(a.ticker, locale)}
            </span>
          )}
          <time className="text-[10px] ml-auto tabular-nums" style={{ color: "var(--muted)" }} dateTime={a.date}>
            {a.date}
          </time>
        </div>
        <h2 className="text-sm font-bold leading-snug mb-1.5" style={{ color: "var(--text)" }}>
          {t.title}
        </h2>
        <p className="text-[12px] leading-relaxed line-clamp-3" style={{ color: "var(--muted)" }}>
          {t.summary}
        </p>
      </Link>
    </article>
  );
}

export function NewsListView({
  locale,
  title,
  intro,
  articles,
}: {
  locale: L;
  title: string;
  intro?: string;
  articles: Article[];
}) {
  return (
    <div>
      <h1 className="text-xl font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
        {title}
      </h1>
      {intro && (
        <p className="text-[13px] leading-relaxed mb-5 max-w-2xl" style={{ color: "var(--muted)" }}>
          {intro}
        </p>
      )}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.slug} a={a} locale={locale} />
        ))}
      </div>
    </div>
  );
}

export function ArticleFull({ a, locale }: { a: Article; locale: L }) {
  const s = NEWS_STRINGS[locale];
  const t = pickText(a, locale);
  const style = CATEGORY_STYLE[a.categoryColor];
  const base = locale === "en" ? "" : "/ko";
  const images = locale === "en" ? a.imagesEn : a.images;
  const sections = parseBody(t.body).filter(
    (sec) => !(sec.heading === null && sec.lines.join("").trim().length < 2),
  );

  return (
    <article className="max-w-2xl mx-auto">
      <Link href={`${base}/news`} className="inline-flex items-center gap-1 text-xs mb-4" style={{ color: "var(--muted)" }}>
        <ChevronLeft className="w-3.5 h-3.5" /> {s.backToNews}
      </Link>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: style.bg, color: style.color }}>
          {a.category}
        </span>
        {a.ticker && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "var(--text)" }}>
            {tickerName(a.ticker, locale)}
          </span>
        )}
      </div>

      <h1 className="text-2xl font-bold font-syne leading-tight mb-2" style={{ color: "var(--text)" }}>
        {t.title}
      </h1>
      <p className="text-[13px] mb-1" style={{ color: "var(--muted)" }}>
        {s.published} <time dateTime={a.date}>{a.displayDate}</time> · {s.byline}
      </p>
      <p className="text-[15px] leading-relaxed mb-5 mt-3" style={{ color: "var(--text)" }}>
        {t.summary}
      </p>

      {locale === "en" && !a.hasEnglish && s.noEnglish && (
        <p
          className="text-[12px] leading-relaxed mb-5 rounded-xl border px-4 py-3"
          style={{ color: "var(--muted)", borderColor: "var(--border)", background: "var(--card)" }}
        >
          {s.noEnglish}{" "}
          <Link href={`/ko/news/${a.slug}`} className="font-semibold hover:underline" style={{ color: "var(--mint)" }}>
            한국어 원문 →
          </Link>
        </p>
      )}

      {images.length > 0 && (
        <div className="flex flex-col gap-3 mb-5">
          {images.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt={t.title} className="w-full rounded-xl" style={{ objectFit: "contain" }} loading="lazy" />
          ))}
        </div>
      )}

      <div className="flex flex-col">
        {sections.map((sec, i) => (
          <section key={i} className="mb-4">
            {sec.heading && (
              <h2 className="text-base font-bold mb-2" style={{ color: style.color }}>
                {sec.heading}
              </h2>
            )}
            {sec.lines.map((line, j) => {
              const trimmed = line.trim();
              if (trimmed === "") return <div key={j} className="h-2" />;
              // Drop the publisher signature line from the rendered body.
              if (/investus\.kr SRP Chief Investment Officer/i.test(trimmed)) return null;
              if (/^investus\.kr/i.test(trimmed)) return null;
              const isBullet = trimmed.startsWith("•") || /^[0-9]+\)/.test(trimmed);
              return (
                <p
                  key={j}
                  className={`text-[14px] leading-relaxed mb-1.5 ${isBullet ? "pl-3" : ""}`}
                  style={{ color: "var(--text)" }}
                >
                  {line}
                </p>
              );
            })}
          </section>
        ))}
      </div>

      {a.sources.length > 0 && (
        <section className="mt-6 pt-5 border-t" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>
            {s.sources}
          </h2>
          <ul className="flex flex-col gap-1.5">
            {a.sources.map((src) => (
              <li key={src.url}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-[13px] hover:underline"
                  style={{ color: "var(--mint)" }}
                >
                  {src.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section
        className="mt-6 rounded-xl border px-4 py-3"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        <p className="text-[11px] font-semibold mb-1" style={{ color: "var(--muted)" }}>
          {s.disclaimerTitle}
        </p>
        <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
          {s.disclaimer}
        </p>
      </section>
    </article>
  );
}
