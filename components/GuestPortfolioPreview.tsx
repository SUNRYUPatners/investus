"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wallet } from "lucide-react";
import { openGuestLogin } from "@/lib/guestLogin";
import { useLocaleCode } from "@/contexts/LocaleContext";
import type { Quote } from "@/lib/api";
import type { MarketId } from "@/lib/markets/types";
import { EXAMPLE_MARKET_ROWS, EXAMPLE_US_HOLDINGS } from "@/lib/samplePortfolio";

type Row = { symbol: string; name: string; shares?: number };

function rowsFor(market: MarketId): Row[] {
  if (market === "us") return EXAMPLE_US_HOLDINGS;
  return EXAMPLE_MARKET_ROWS[market] ?? [];
}

function fmtUsd(n: number) {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function GuestPortfolioPreview({
  market,
  variant = "card",
}: {
  market: MarketId;
  variant?: "card" | "page";
}) {
  const locale = useLocaleCode();
  const isKo = locale === "ko";
  const rows = rowsFor(market);
  const [live, setLive] = useState<Record<string, { price: number; changePercent: number }>>({});

  useEffect(() => {
    const url = market === "us" ? "/api/market-data" : `/api/market-data?market=${market}`;
    let cancelled = false;
    fetch(url)
      .then((r) => r.json())
      .then((d: { quotes?: Quote[] }) => {
        if (cancelled) return;
        const map: Record<string, { price: number; changePercent: number }> = {};
        for (const q of d.quotes ?? []) {
          if (q.price > 0) map[q.symbol] = { price: q.price, changePercent: q.changePercent };
        }
        setLive(map);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [market]);

  const connect = () => {
    openGuestLogin();
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(var(--mint-rgb),0.12)" }}
          >
            <Wallet className="w-3 h-3" style={{ color: "var(--mint)" }} />
          </div>
          <span className="text-sm font-bold" style={{ color: "var(--text)" }}>
            {isKo ? "내 보유종목" : "My Holdings"}
          </span>
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: "rgba(var(--mint-rgb),0.14)", color: "var(--mint)" }}
          >
            {isKo ? "예시" : "SAMPLE"}
          </span>
        </div>
      </div>
      <div className="px-4 pb-2 space-y-2">
        {rows.map((r) => {
          const q = live[r.symbol];
          const change = q?.changePercent;
          const value = q && r.shares
            ? fmtUsd(r.shares * q.price)
            : q
              ? fmtUsd(q.price)
              : "—";
          return (
            <div key={r.symbol} className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{r.name}</p>
                <p className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>{r.symbol}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-semibold" style={{ color: "var(--text)" }}>{value}</p>
                <p
                  className="text-[11px] font-mono font-semibold"
                  style={{ color: change == null ? "var(--muted)" : change >= 0 ? "var(--up)" : "var(--down)" }}
                >
                  {change == null ? "—" : `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {variant === "card" && (
      <div className="px-4 pb-3.5 pt-1">
        <Link
          href="/subscribe"
          className="block w-full py-2.5 rounded-xl text-center text-[12px] font-bold"
          style={{ background: "var(--mint)", color: "var(--on-accent)" }}
        >
          {isKo ? "구독하고 내 계좌로 바꾸기" : "Subscribe and use my account"}
        </Link>
        <button
          type="button"
          onClick={connect}
          className="w-full mt-2 py-2 text-[11px] font-semibold"
          style={{ color: "var(--muted)" }}
        >
          {isKo ? "먼저 계정 연동하기" : "Link an account first"}
        </button>
      </div>
      )}
    </div>
  );
}
