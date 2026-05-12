"use client";

import { useState } from "react";
import { ChevronRight, ChevronUp } from "lucide-react";
import { NewsCard } from "./NewsCard";
import type { NewsItem } from "@/lib/api";

const INITIAL_COUNT = 4;

export function NewsSection({ news }: { news: NewsItem[] }) {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? news : news.slice(0, INITIAL_COUNT);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
          시장 뉴스
        </h2>
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
      </div>

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
    </div>
  );
}
