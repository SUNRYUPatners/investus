"use client";

import { useState, useTransition } from "react";
import { Search, X, Plus, Trash2, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Header } from "@/components/Header";
import { AddStockModal } from "@/components/AddStockModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { mockQuotes } from "@/lib/api";
import type { Holding, Quote } from "@/lib/api";

// US convention: up = red, down = green
const UP   = "#ff4d6d";
const DOWN = "#00e5a0";

// ── Search result row ────────────────────────────────────────────────────────
function StockRow({ stock }: { stock: Quote }) {
  const pos = stock.changePercent >= 0;
  const color = pos ? UP : DOWN;
  return (
    <button
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border active:opacity-70 transition-opacity"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "var(--border)" }}>
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
    </button>
  );
}

// ── Holdings row ─────────────────────────────────────────────────────────────
function HoldingRow({ holding, onDelete }: { holding: Holding; onDelete: (s: string) => void }) {
  const quote = mockQuotes.find((q) => q.symbol === holding.symbol);
  if (!quote) return null;

  const currentValue = quote.price * holding.shares;
  const costBasis    = holding.avgCost * holding.shares;
  const pnl          = currentValue - costBasis;
  const pnlPct       = (pnl / costBasis) * 100;
  const pos          = pnl >= 0;

  return (
    <div className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--border)" }}>
            <span className="text-xs font-bold font-mono-num" style={{ color: "var(--text)" }}>
              {holding.symbol.slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="text-sm font-bold font-mono-num" style={{ color: "var(--text)" }}>{holding.symbol}</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {holding.shares}주 · 평단 ${holding.avgCost.toFixed(2)}
            </p>
          </div>
        </div>
        <button onClick={() => onDelete(holding.symbol)} className="p-1.5 rounded-lg opacity-40 hover:opacity-70 transition-opacity">
          <Trash2 className="w-4 h-4" style={{ color: "var(--muted)" }} />
        </button>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] mb-0.5" style={{ color: "var(--muted)" }}>현재가</p>
          <p className="text-sm font-bold font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
            ${quote.price.toFixed(2)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] mb-0.5" style={{ color: "var(--muted)" }}>평가금액</p>
          <p className="text-sm font-bold font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
            ${currentValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] mb-0.5" style={{ color: "var(--muted)" }}>평가손익</p>
          <div className="flex items-center justify-end gap-0.5" style={{ color: pos ? "var(--mint)" : "var(--down)" }}>
            {pos ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span className="text-xs font-bold font-mono-num tabular-nums">
              {pos ? "+" : ""}{pnlPct.toFixed(2)}%
            </span>
          </div>
          <p className="text-xs font-mono-num tabular-nums" style={{ color: pos ? "var(--mint)" : "var(--down)" }}>
            {pos ? "+" : ""}${pnl.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [holdings, setHoldings, loaded] = useLocalStorage<Holding[]>("sp_portfolio", []);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery]         = useState("");
  const [results, setResults]     = useState<Quote[]>([]);
  const [, startTransition]       = useTransition();

  const addHolding    = (h: Holding) => setHoldings((p) => [...p.filter((x) => x.symbol !== h.symbol), h]);
  const deleteHolding = (sym: string) => setHoldings((p) => p.filter((x) => x.symbol !== sym));

  const handleSearch = (q: string) => {
    setQuery(q);
    startTransition(() => {
      if (!q.trim()) { setResults([]); return; }
      const lq = q.toLowerCase();
      setResults(mockQuotes.filter((s) => s.symbol.toLowerCase().includes(lq) || s.name.toLowerCase().includes(lq)));
    });
  };

  const totalValue  = holdings.reduce((a, h) => { const q = mockQuotes.find((x) => x.symbol === h.symbol); return a + (q ? q.price * h.shares : 0); }, 0);
  const totalCost   = holdings.reduce((a, h) => a + h.avgCost * h.shares, 0);
  const totalPnl    = totalValue - totalCost;
  const totalPnlPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;
  const portfolioUp = totalPnl >= 0;
  const searching   = query.length > 0;

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] mx-auto px-4 pt-5 pb-24">
        {/* Search bar */}
        <div className="flex items-center gap-2 rounded-2xl px-4 py-3 border mb-5"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <Search className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
          <input
            type="text"
            placeholder="종목명 또는 티커 검색"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "var(--text)" }}
          />
          {query && (
            <button onClick={() => handleSearch("")}>
              <X className="w-4 h-4" style={{ color: "var(--muted)" }} />
            </button>
          )}
        </div>

        {/* ── Search results ── */}
        {searching ? (
          <div>
            <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>검색 결과 {results.length}개</p>
            {results.length > 0 ? (
              <div className="flex flex-col gap-2">
                {results.map((s) => <StockRow key={s.symbol} stock={s} />)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Search className="w-10 h-10 opacity-20" style={{ color: "var(--muted)" }} />
                <p className="text-sm" style={{ color: "var(--muted)" }}>"{query}" 검색 결과가 없습니다</p>
              </div>
            )}
          </div>
        ) : (
          /* ── Portfolio ── */
          <>
            {/* Summary card */}
            {loaded && holdings.length > 0 && (
              <div className="rounded-2xl p-5 mb-5 border"
                style={{ background: "linear-gradient(135deg,#111318,#0d1f18)", borderColor: "rgba(0,229,160,0.2)" }}>
                <p className="text-xs font-semibold tracking-widest uppercase mb-1 font-syne" style={{ color: "var(--muted)" }}>
                  총 평가금액
                </p>
                <p className="text-3xl font-bold font-mono-num tabular-nums mb-1" style={{ color: "var(--text)" }}>
                  ${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono-num font-semibold"
                    style={{ color: portfolioUp ? "var(--mint)" : "var(--down)" }}>
                    {portfolioUp ? "+" : ""}${totalPnl.toFixed(2)}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono-num font-semibold"
                    style={portfolioUp
                      ? { background: "rgba(0,229,160,0.12)", color: "var(--mint)" }
                      : { background: "rgba(255,77,109,0.12)", color: "var(--down)" }}>
                    {portfolioUp ? "+" : ""}{totalPnlPct.toFixed(2)}%
                  </span>
                </div>
              </div>
            )}

            {/* Holdings header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
                보유 종목 {loaded ? `(${holdings.length})` : ""}
              </h2>
              <button onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: "var(--mint)", color: "#000" }}>
                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                추가
              </button>
            </div>

            {/* Holdings list */}
            {loaded && holdings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "var(--card)" }}>
                  <Wallet className="w-8 h-8 opacity-30" style={{ color: "var(--muted)" }} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>보유 종목이 없습니다</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>위 검색창 또는 + 추가 버튼으로 종목을 등록하세요</p>
                </div>
                <button onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold mt-2"
                  style={{ background: "var(--mint)", color: "#000" }}>
                  <Plus className="w-4 h-4" strokeWidth={2.5} />
                  첫 종목 추가하기
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {holdings.map((h) => <HoldingRow key={h.symbol} holding={h} onDelete={deleteHolding} />)}
              </div>
            )}
          </>
        )}
      </main>

      {showModal && (
        <AddStockModal onClose={() => setShowModal(false)} onAdd={addHolding} existing={holdings.map((h) => h.symbol)} />
      )}
    </div>
  );
}
