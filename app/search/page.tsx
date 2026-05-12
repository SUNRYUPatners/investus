"use client";

import { useState, useTransition } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { mockQuotes } from "@/lib/api";
import type { Quote } from "@/lib/api";
import { Header } from "@/components/Header";
import { useWatchlist } from "@/hooks/useWatchlist";
import { GuruHoldings } from "@/components/GuruHoldings";
import { AdBanner } from "@/components/AdBanner";

const UP   = "#ff4d6d";
const DOWN = "#00e5a0";

const POPULAR = ["AAPL", "NVDA", "TSLA", "MSFT", "AMZN", "META", "GOOGL", "AMD"];

function StockRow({
  stock,
  inWatchlist,
  onToggle,
}: {
  stock: Quote;
  inWatchlist: boolean;
  onToggle: () => void;
}) {
  const pos   = stock.changePercent >= 0;
  const color = pos ? UP : DOWN;

  return (
    <div
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <Link href={`/stock/${stock.symbol}`} className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--border)" }}
        >
          <span className="text-xs font-bold font-mono-num" style={{ color: "var(--text)" }}>
            {stock.symbol.slice(0, 2)}
          </span>
        </div>

        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-bold font-mono-num" style={{ color: "var(--text)" }}>{stock.symbol}</p>
          <p className="text-xs truncate" style={{ color: "var(--muted)" }}>{stock.name}</p>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="text-sm font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
            ${stock.price.toFixed(2)}
          </p>
          <p className="text-xs font-mono-num" style={{ color }}>
            {pos ? "+" : ""}{stock.changePercent.toFixed(2)}%
          </p>
        </div>
      </Link>

      <button
        onClick={onToggle}
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg active:scale-90 transition-transform"
        aria-label={inWatchlist ? "관심종목 제거" : "관심종목 추가"}
      >
        <span
          className="text-lg leading-none"
          style={{ color: inWatchlist ? "#facc15" : "var(--border)", filter: inWatchlist ? "drop-shadow(0 0 4px #facc15)" : "none" }}
        >
          ★
        </span>
      </button>
    </div>
  );
}

export default function SearchPage() {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<Quote[]>([]);
  const [, startTransition]   = useTransition();
  const { list, toggle }      = useWatchlist();

  const handleChange = (q: string) => {
    setQuery(q);
    startTransition(() => {
      if (!q.trim()) { setResults([]); return; }
      const lq = q.toLowerCase();
      setResults(
        mockQuotes.filter(
          (s) => s.symbol.toLowerCase().includes(lq) || s.name.toLowerCase().includes(lq)
        )
      );
    });
  };

  const popularStocks = mockQuotes.filter((q) => POPULAR.includes(q.symbol));
  const showResults   = query.length > 0;

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] mx-auto lg:max-w-none px-4 lg:px-8 pt-5 pb-24 lg:pb-10">
        <div className="lg:flex lg:gap-8 lg:items-start">

          {/* 왼쪽: 검색 + 결과 / 인기종목 */}
          <div className="lg:flex-1 lg:min-w-0">
            {/* Search input */}
            <div
              className="flex items-center gap-2 rounded-2xl px-4 py-3 border mb-5"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
              <input
                type="text"
                placeholder="종목명 또는 티커 검색"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text)" }}
              />
              {query && (
                <button onClick={() => handleChange("")}>
                  <X className="w-4 h-4" style={{ color: "var(--muted)" }} />
                </button>
              )}
            </div>

            {showResults ? (
              <div>
                <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>
                  검색 결과 {results.length}개
                </p>
                {results.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {results.map((s) => (
                      <StockRow
                        key={s.symbol}
                        stock={s}
                        inWatchlist={list.includes(s.symbol)}
                        onToggle={() => toggle(s.symbol)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <Search className="w-10 h-10 opacity-20" style={{ color: "var(--muted)" }} />
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      &quot;{query}&quot; 검색 결과가 없습니다
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {/* 투자 대가 13F — 모바일에서만 여기 */}
                <div className="lg:hidden">
                  <GuruHoldings />
                </div>

                {/* 광고 */}
                <AdBanner format="auto" />

                {/* 인기 종목 */}
                <div>
                  <h2
                    className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
                    style={{ color: "var(--muted)" }}
                  >
                    인기 종목
                  </h2>
                  <div className="flex flex-col gap-2">
                    {popularStocks.map((s) => (
                      <StockRow
                        key={s.symbol}
                        stock={s}
                        inWatchlist={list.includes(s.symbol)}
                        onToggle={() => toggle(s.symbol)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 오른쪽: 투자대가 13F — 데스크톱 전용 sticky */}
          <div className="hidden lg:block lg:w-[400px] lg:flex-shrink-0 lg:sticky lg:top-[57px]">
            <GuruHoldings />
          </div>

        </div>
      </main>
    </div>
  );
}
