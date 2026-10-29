"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useLocaleCode } from "@/contexts/LocaleContext";
import {
  NEWS_STRINGS,
  newsSectionTabs,
  type NewsSectionTab,
} from "@/components/news/newsStrings";
import { HomeNewsFeed } from "@/components/HomeNewsFeed";
import { TeslaValuationView } from "@/components/TeslaValuationView";
import type { HomeArticleCard } from "@/lib/homeArticleCard";
import type { LiveNewsItem } from "@/lib/liveNewsTypes";
import type { TeslaQuoteSnapshot } from "@/lib/teslaValuationTypes";
import { localePath } from "@/lib/localePath";

const EMPTY_TSLA: TeslaQuoteSnapshot = {
  price: null,
  changePercent: null,
  marketCap: null,
  pe: null,
  eps: null,
  week52High: null,
  week52Low: null,
  asOfIso: null,
  quoteSource: null,
};

function relTime(iso: string, locale: "en" | "ko"): string {
  const s = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (locale === "ko") {
    if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}분 전`;
    if (s < 86400) return `${Math.floor(s / 3600)}시간 전`;
    return `${Math.floor(s / 86400)}일 전`;
  }
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export function HomeNewsPanel({
  analysis,
  earnings,
  spacex,
  tesla,
  teslaValuation,
}: {
  analysis: HomeArticleCard[];
  earnings: HomeArticleCard[];
  spacex: HomeArticleCard[];
  tesla: HomeArticleCard[];
  teslaValuation?: TeslaQuoteSnapshot;
}) {
  const locale = useLocaleCode();
  const s = NEWS_STRINGS[locale];
  const tabs = newsSectionTabs(locale);
  const [tab, setTab] = useState<NewsSectionTab>("news");
  const [headlines, setHeadlines] = useState<LiveNewsItem[] | null>(null);
  const [liveError, setLiveError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [liveTick, setLiveTick] = useState(0);

  useEffect(() => {
    if (tab !== "news") return;
    let cancelled = false;
    fetch(`/api/live-news?locale=${locale}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { items?: LiveNewsItem[]; error?: boolean }) => {
        if (cancelled) return;
        const items = Array.isArray(data.items) ? data.items : [];
        setHeadlines(items);
        setLiveError(!!data.error && items.length === 0);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setHeadlines([]);
        setLiveError(true);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tab, locale, liveTick]);

  const loadLive = useCallback(() => {
    setLoading(true);
    setLiveError(false);
    setHeadlines(null);
    setLiveTick((n) => n + 1);
  }, []);

  return (
    <section className="pt-3 pb-6">
      <nav
        className="px-4 lg:px-0 mb-4 flex flex-wrap gap-x-4 gap-y-1.5"
        aria-label={s.news}
      >
        {tabs.map((n) => {
          const active = n.id === tab;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => setTab(n.id)}
              aria-current={active ? "page" : undefined}
              className="text-[12px] font-semibold pb-0.5"
              style={{
                color: active ? "var(--mint)" : "var(--text)",
                borderBottom: active ? "1.5px solid var(--mint)" : "1.5px solid transparent",
              }}
            >
              {n.label}
            </button>
          );
        })}
      </nav>

      {tab === "news" && (
        <LiveHeadlineList
          items={headlines}
          loading={loading}
          error={liveError}
          onRetry={loadLive}
          locale={locale}
        />
      )}
      {tab === "analysis" && (
        <OwnerFeed
          articles={analysis}
          intro={s.analysisIntro}
          emptyHref={localePath("/news/analysis", locale)}
          emptyCta={s.allArticles}
        />
      )}
      {tab === "earnings" && (
        <OwnerFeed
          articles={earnings}
          intro={s.earningsIntro}
          emptyHref={localePath("/news/earnings", locale)}
          emptyCta={s.allArticles}
        />
      )}
      {tab === "spacex" && (
        <OwnerFeed
          articles={spacex}
          intro={s.spacexIntro}
          emptyHref={localePath("/news/spacex", locale)}
          emptyCta={s.allArticles}
        />
      )}
      {tab === "tesla" && (
        <>
          <div className="px-4 lg:px-0">
            <p className="text-[10px] mb-3" style={{ color: "var(--muted)" }}>
              {s.teslaIntro}
            </p>
            <TeslaValuationView locale={locale} snapshot={teslaValuation ?? EMPTY_TSLA} compact />
          </div>
          <OwnerFeed
            articles={tesla}
            intro=""
            emptyHref={localePath("/tesla-valuation", locale)}
            emptyCta={s.allArticles}
          />
        </>
      )}
    </section>
  );
}

function LiveHeadlineList({
  items,
  loading,
  error,
  onRetry,
  locale,
}: {
  items: LiveNewsItem[] | null;
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  locale: "en" | "ko";
}) {
  const s = NEWS_STRINGS[locale];
  if (loading || items === null) {
    return (
      <div className="px-4 lg:px-0 flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border animate-pulse"
            style={{ background: "var(--card)", borderColor: "var(--border)", height: 88 }}
          />
        ))}
      </div>
    );
  }
  if (error || items.length === 0) {
    return (
      <div className="px-4 lg:px-0 py-8 text-center">
        <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
          {error ? s.liveError : s.liveEmpty}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl"
          style={{ background: "var(--card)", color: "var(--mint)", border: "1px solid var(--border)" }}
        >
          {s.retry}
        </button>
      </div>
    );
  }
  return (
    <div className="px-4 lg:px-0 flex flex-col gap-3">
      {items.map((it) => (
        <a
          key={it.id + it.url}
          href={it.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="block rounded-2xl border p-4 no-underline hover:opacity-90 transition-opacity"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-semibold" style={{ color: "var(--mint)" }}>
              {it.source}
            </span>
            <time className="text-[10px] ml-auto tabular-nums" style={{ color: "var(--muted)" }} dateTime={it.publishedAt}>
              {relTime(it.publishedAt, locale)}
            </time>
          </div>
          <p className="text-sm font-bold leading-snug" style={{ color: "var(--text)" }}>
            {it.title}
          </p>
          <p className="text-[10px] mt-1.5" style={{ color: "var(--muted)" }}>
            {s.openOriginal} ↗
          </p>
        </a>
      ))}
    </div>
  );
}

function OwnerFeed({
  articles,
  intro,
  emptyHref,
  emptyCta,
}: {
  articles: HomeArticleCard[];
  intro: string;
  emptyHref: string;
  emptyCta: string;
}) {
  if (articles.length === 0) {
    return (
      <div className="px-4 lg:px-0 py-6">
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
          {intro}
        </p>
        <Link href={emptyHref} className="text-sm font-semibold no-underline" style={{ color: "var(--mint)" }}>
          {emptyCta} →
        </Link>
      </div>
    );
  }
  return <HomeNewsFeed articles={articles} intro={intro} />;
}

