"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronUp } from "lucide-react";
import { NewsCard } from "./NewsCard";
import type { NewsItem } from "@/lib/api";

const INITIAL_COUNT = 4;

function NewsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: INITIAL_COUNT }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border animate-pulse"
          style={{ background: "var(--card)", borderColor: "var(--border)", height: 80 }}
        />
      ))}
    </div>
  );
}

export function NewsSection({ news: initialNews }: { news?: NewsItem[] }) {
  const [news, setNews]         = useState<NewsItem[]>(initialNews ?? []);
  const [expanded, setExpanded] = useState(false);
  const [loaded, setLoaded]     = useState(!!initialNews?.length);

  useEffect(() => {
    if (initialNews?.length) return; // already have server data
    fetch("/api/news")
      .then((r) => r.ok ? r.json() : [])
      .then((d) => { setNews(Array.isArray(d) ? d : []); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, [initialNews]);

  const visible = expanded ? news : news.slice(0, INITIAL_COUNT);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
          시장 뉴스
        </h2>
        {loaded && news.length > INITIAL_COUNT && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-0.5 text-xs font-medium transition-opacity hover:opacity-80"
            style={{ color: "var(--mint)" }}
          >
            {expanded ? (
              <><ChevronUp className="w-3.5 h-3.5" /> 접기</>
            ) : (
              <>더보기 <ChevronRight className="w-3.5 h-3.5" /></>
            )}
          </button>
        )}
      </div>

      {!loaded ? (
        <NewsSkeleton />
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {visible.map((item) => (
              <NewsCard key={item.id} item={item} large={expanded} />
            ))}
          </div>

          {!expanded && news.length > INITIAL_COUNT && (
            <button
              onClick={() => setExpanded(true)}
              className="w-full mt-3 py-2.5 rounded-2xl text-xs font-semibold transition-opacity hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.04)", color: "var(--muted)", border: "1px solid var(--border)" }}
            >
              뉴스 {news.length - INITIAL_COUNT}개 더보기
            </button>
          )}
        </>
      )}
    </div>
  );
}
