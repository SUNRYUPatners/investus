"use client";

import { useState } from "react";
import { X, Search } from "lucide-react";
import { mockQuotes } from "@/lib/api";
import type { Holding } from "@/lib/api";

type Props = {
  onClose: () => void;
  onAdd: (h: Holding) => void;
  existing: string[];
};

export function AddStockModal({ onClose, onAdd, existing }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [shares, setShares] = useState("");
  const [avgCost, setAvgCost] = useState("");

  const filtered = query.length > 0
    ? mockQuotes.filter(
        (q) =>
          (q.symbol.toLowerCase().includes(query.toLowerCase()) ||
            q.name.toLowerCase().includes(query.toLowerCase())) &&
          !existing.includes(q.symbol)
      )
    : [];

  const selectedQuote = mockQuotes.find((q) => q.symbol === selected);

  const handleSubmit = () => {
    if (!selected || !shares || !avgCost) return;
    onAdd({
      symbol: selected,
      shares: parseFloat(shares),
      avgCost: parseFloat(avgCost),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-[480px] rounded-t-3xl sm:rounded-3xl p-6 border"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        {/* Title */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>
            종목 추가
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full"
            style={{ background: "var(--bg)" }}
          >
            <X className="w-4 h-4" style={{ color: "var(--muted)" }} />
          </button>
        </div>

        {/* Search */}
        {!selected ? (
          <div>
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 border"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}
            >
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
              <input
                autoFocus
                type="text"
                placeholder="종목 검색 (예: AAPL, Apple)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text)" }}
              />
            </div>

            {filtered.length > 0 && (
              <div className="mt-2 max-h-48 overflow-y-auto space-y-1">
                {filtered.map((q) => (
                  <button
                    key={q.symbol}
                    onClick={() => {
                      setSelected(q.symbol);
                      setAvgCost(q.price.toFixed(2));
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors"
                    style={{ background: "var(--bg)" }}
                  >
                    <div>
                      <p className="text-sm font-bold font-mono-num" style={{ color: "var(--text)" }}>
                        {q.symbol}
                      </p>
                      <p className="text-xs" style={{ color: "var(--muted)" }}>{q.name}</p>
                    </div>
                    <p className="text-sm font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
                      ${q.price.toFixed(2)}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Selected stock */}
            <div
              className="flex items-center justify-between px-3 py-3 rounded-xl border"
              style={{ background: "var(--bg)", borderColor: "rgba(0,229,160,0.3)" }}
            >
              <div>
                <p className="text-sm font-bold font-mono-num" style={{ color: "var(--text)" }}>
                  {selectedQuote?.symbol}
                </p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>{selectedQuote?.name}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-xs"
                style={{ color: "var(--mint)" }}
              >
                변경
              </button>
            </div>

            {/* Shares */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--muted)" }}>
                보유 수량
              </label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                className="w-full rounded-xl px-3 py-2.5 text-sm font-mono-num outline-none border"
                style={{
                  background: "var(--bg)",
                  color: "var(--text)",
                  borderColor: "var(--border)",
                }}
              />
            </div>

            {/* Avg cost */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--muted)" }}>
                평균 매수가 (USD)
              </label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={avgCost}
                onChange={(e) => setAvgCost(e.target.value)}
                className="w-full rounded-xl px-3 py-2.5 text-sm font-mono-num outline-none border"
                style={{
                  background: "var(--bg)",
                  color: "var(--text)",
                  borderColor: "var(--border)",
                }}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!shares || !avgCost}
              className="w-full py-3 rounded-xl text-sm font-bold transition-opacity disabled:opacity-40"
              style={{ background: "var(--mint)", color: "#000" }}
            >
              추가하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
