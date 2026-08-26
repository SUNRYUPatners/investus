"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import type { MarketId } from "@/lib/markets/types";
import { getMarketConfig } from "@/lib/markets/config";
import {
  MOCK_POSTS_KR,
  MOCK_COMMENTS_KR,
  MOCK_POSTS_SAFE,
  MOCK_COMMENTS_SAFE,
  MOCK_POSTS_KR_RE,
  MOCK_COMMENTS_KR_RE,
} from "@/lib/wallPosts-markets";
import {
  MOCK_ANALYST_POSTS_KR,
  MOCK_ANALYST_COMMENTS_KR,
  MOCK_ANALYST_POSTS_SAFE,
  MOCK_ANALYST_COMMENTS_SAFE,
  MOCK_ANALYST_POSTS_KR_RE,
  MOCK_ANALYST_COMMENTS_KR_RE,
} from "@/lib/analystPosts-markets";

function seeds(market: MarketId) {
  if (market === "kr") {
    return {
      posts: MOCK_POSTS_KR,
      comments: MOCK_COMMENTS_KR,
      analysts: MOCK_ANALYST_POSTS_KR,
      analystComments: MOCK_ANALYST_COMMENTS_KR,
    };
  }
  if (market === "safe") {
    return {
      posts: MOCK_POSTS_SAFE,
      comments: MOCK_COMMENTS_SAFE,
      analysts: MOCK_ANALYST_POSTS_SAFE,
      analystComments: MOCK_ANALYST_COMMENTS_SAFE,
    };
  }
  return {
    posts: MOCK_POSTS_KR_RE,
    comments: MOCK_COMMENTS_KR_RE,
    analysts: MOCK_ANALYST_POSTS_KR_RE,
    analystComments: MOCK_ANALYST_COMMENTS_KR_RE,
  };
}

/** 본사이트 피드와 같은 Header·레이아웃 슬롯, 포스트 내용만 시장별 */
export function MarketWallClient({ market }: { market: MarketId }) {
  const cfg = getMarketConfig(market);
  const data = useMemo(() => seeds(market), [market]);
  const [tab, setTab] = useState<"wall" | "analyst">("analyst");

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] mx-auto lg:max-w-none px-4 lg:px-8 pt-5 lg:pb-10">
        <div className="mb-4">
          <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>
            {cfg.labelKo} 피드
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
            본사이트 피드와 같은 구성 · 포스트만 {cfg.labelKo} 기준
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          {(["analyst", "wall"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: tab === t ? "rgba(var(--mint-rgb),0.15)" : "var(--card)",
                color: tab === t ? "var(--mint)" : "var(--muted)",
                border: "1px solid var(--border)",
              }}
            >
              {t === "analyst" ? "애널리스트" : "종목토론"}
            </button>
          ))}
        </div>

        {tab === "analyst" ? (
          <ul className="space-y-3">
            {data.analysts.map((p) => (
              <li
                key={p.id}
                className="rounded-2xl border p-4"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold" style={{ color: "var(--mint)" }}>
                    {p.alias ?? "애널리스트"}
                  </span>
                  {p.symbol && (
                    <span className="text-[10px] font-mono-num" style={{ color: "var(--muted)" }}>
                      {p.symbol}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text)" }}>
                  {p.content}
                </p>
                <p className="text-[10px] mt-2" style={{ color: "var(--muted)" }}>
                  댓글 {(data.analystComments[p.id] ?? []).length}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-3">
            {data.posts.map((p) => (
              <li
                key={p.id}
                className="rounded-2xl border p-4"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold font-mono-num" style={{ color: "var(--text)" }}>
                    {p.symbol}
                  </span>
                  <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                    {p.nickname}
                  </span>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text)" }}>
                  {p.content}
                </p>
                <p className="text-[10px] mt-2" style={{ color: "var(--muted)" }}>
                  댓글 {(data.comments[p.id] ?? []).length}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
