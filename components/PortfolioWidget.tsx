"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, TrendingDown, ChevronRight, Wallet, ChevronDown, ChevronUp } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useLocaleCode } from "@/contexts/LocaleContext";

type LiveQ = { symbol: string; shortName: string; price: number; changePercent: number };
type Cur   = "USD" | "KRW";

function fmtUSD(v: number) {
  return "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtKRW(v: number) {
  if (v >= 1e12) return `${(v / 1e12).toFixed(1)}조원`;
  if (v >= 1e8)  return `${(v / 1e8).toFixed(1)}억원`;
  if (v >= 1e4)  return `${Math.round(v / 1e4).toLocaleString()}만원`;
  return `${Math.round(v).toLocaleString()}원`;
}
function fmtVal(usd: number, cur: Cur, rate: number) {
  return cur === "KRW" ? fmtKRW(usd * rate) : fmtUSD(usd);
}
function clr(v: number) { return v >= 0 ? "var(--mint)" : "#ef4444"; }
function sgn(v: number)  { return v >= 0 ? "+" : ""; }

function CurToggle({ cur, onChange }: { cur: Cur; onChange: (c: Cur) => void }) {
  return (
    <div className="flex items-center rounded-full p-0.5 gap-0.5" style={{ background: "var(--border)" }}>
      {(["USD", "KRW"] as Cur[]).map((c) => (
        <button key={c} onClick={() => onChange(c)}
          className="px-2 py-0.5 rounded-full text-[9px] font-bold transition-all"
          style={cur === c
            ? { background: "var(--bg)", color: "var(--text)" }
            : { color: "var(--muted)" }}>
          {c === "USD" ? "$" : "원"}
        </button>
      ))}
    </div>
  );
}

export function PortfolioWidget() {
  const router  = useRouter();
  const locale  = useLocaleCode();
  const isKo    = locale === "ko";
  const { holdings, cur, setCur, loaded, isLoggedIn } = usePortfolio();
  const [quotes,    setQuotes]    = useState<LiveQ[]>([]);
  const [usdkrw,    setUsdkrw]    = useState(1350);
  const [showAll,   setShowAll]   = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!loaded || holdings.length === 0) return;

    const syms = holdings.map((h) => h.symbol);

    // Single price source: market-data-cache (written by LiveMarket via YF v7 batch)
    // This is the SAME source as 추천주식·인기종목 — guarantees identical prices everywhere
    const applyCache = () => {
      try {
        const raw = localStorage.getItem("market-data-cache");
        if (!raw) return;
        const d = JSON.parse(raw) as {
          quotes?: { symbol: string; price: number; changePercent: number }[];
          indices?: { symbol: string; value: number }[];
        };
        const map = new Map((d.quotes ?? []).map((q) => [q.symbol, q]));
        const found = syms.filter((s) => { const q = map.get(s); return q && q.price > 0; });
        if (found.length > 0) {
          setQuotes(found.map((s) => {
            const q = map.get(s)!;
            return { symbol: s, shortName: s, price: q.price, changePercent: q.changePercent };
          }));
        }
        const krw = (d.indices ?? []).find((i) => i.symbol === "USDKRW");
        if (krw && krw.value > 100) setUsdkrw(krw.value);
      } catch { /* ignore */ }
    };

    applyCache();

    // Auto-sync whenever LiveMarket refreshes the cache
    const onStorage = (e: StorageEvent) => { if (e.key === "market-data-cache") applyCache(); };
    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, [loaded, holdings.length]);

  if (!loaded) return null;

  if (!isLoggedIn) {
    return (
      <section className="px-4 lg:px-0 pt-4">
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 px-4 py-3.5">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(0,229,160,0.12)" }}>
              <Wallet className="w-3 h-3" style={{ color: "var(--mint)" }} />
            </div>
            <span className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "내 보유종목" : "My Holdings"}</span>
          </div>
          <div className="border-t px-4 py-4 flex items-center justify-between gap-3"
            style={{ borderColor: "var(--border)" }}>
            <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
              {isKo
                ? <>로그인 후 포트폴리오를 연동하면<br/>보유 종목과 수익률을 확인할 수 있어요</>
                : "Connect your portfolio after logging in to track your holdings and returns."}
            </p>
            <button
              onClick={() => router.push("/portfolio")}
              className="flex-shrink-0 text-[11px] font-bold px-3 py-1.5 rounded-xl transition-opacity active:opacity-70"
              style={{ background: "rgba(0,229,160,0.12)", color: "var(--mint)" }}>
              {isKo ? "연동하기" : "Connect"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (holdings.length === 0) return null;

  let totalCost  = 0;
  let totalValue = 0;
  const enriched = holdings.map((h) => {
    const q    = quotes.find((q) => q.symbol === h.symbol);
    const cost = h.shares * h.avgCost;
    const val  = q ? h.shares * q.price : cost;
    totalCost  += cost;
    totalValue += val;
    return { ...h, q, cost, val };
  });

  const totalPnl    = totalValue - totalCost;
  const totalPnlPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;

  // Desktop: vertical list capped at 3 (or all if showAll)
  const DESKTOP_LIMIT = 3;
  const desktopList   = showAll ? enriched : enriched.slice(0, DESKTOP_LIMIT);
  const hasMore       = enriched.length > DESKTOP_LIMIT;

  const header = (
    <div className="flex items-center justify-between px-4 pt-4 pb-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(0,229,160,0.12)" }}>
          <Wallet className="w-3 h-3" style={{ color: "var(--mint)" }} />
        </div>
        <span className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "내 보유종목" : "My Holdings"}</span>
      </div>
      <div className="flex items-center gap-2">
        {!collapsed && <CurToggle cur={cur} onChange={setCur} />}
        {!collapsed && (
          <button className="flex items-center gap-0.5" onClick={() => router.push("/portfolio")}>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>{isKo ? "전체" : "All"}</span>
            <ChevronRight className="w-3 h-3" style={{ color: "var(--muted)" }} />
          </button>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg transition-opacity hover:opacity-70"
          style={{ background: "var(--border)" }}
        >
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>{collapsed ? "펼치기" : "숨기기"}</span>
          {collapsed
            ? <ChevronDown className="w-3 h-3" style={{ color: "var(--muted)" }} />
            : <ChevronUp className="w-3 h-3" style={{ color: "var(--muted)" }} />}
        </button>
      </div>
    </div>
  );

  const summaryRow = (
    <div className="px-4 pb-2.5 flex items-center gap-3">
      <div className="text-lg font-bold tabular-nums" style={{ color: "var(--text)" }}>
        {fmtVal(totalValue, cur, usdkrw)}
      </div>
      <div className="flex items-center gap-1">
        {totalPnl >= 0
          ? <TrendingUp  className="w-3 h-3" style={{ color: clr(totalPnl) }} />
          : <TrendingDown className="w-3 h-3" style={{ color: clr(totalPnl) }} />}
        <span className="text-[11px] font-semibold tabular-nums" style={{ color: clr(totalPnl) }}>
          {sgn(totalPnlPct)}{totalPnlPct.toFixed(2)}%
        </span>
      </div>
    </div>
  );

  return (
    <section className="px-4 lg:px-0 pt-4">
      <div className="rounded-2xl overflow-hidden"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        {header}
        {!collapsed && summaryRow}

        {!collapsed && <>
        {/* ── Mobile: horizontal swipe ── */}
        <div className="lg:hidden flex gap-2.5 overflow-x-auto no-scrollbar px-4 pb-4"
          style={{ scrollSnapType: "x mandatory" }}>
          {enriched.map((h) => {
            const dayChg = h.q?.changePercent ?? 0;
            const pnlPct = h.cost > 0 ? ((h.val - h.cost) / h.cost) * 100 : 0;
            const price  = h.q?.price ?? h.avgCost;
            return (
              <button key={h.symbol}
                className="flex-shrink-0 flex flex-col gap-1.5 rounded-xl p-3 text-left transition-opacity active:opacity-70"
                style={{ background: "var(--bg)", border: "1px solid var(--border)", width: "110px", scrollSnapAlign: "start" }}
                onClick={() => router.push(`/stock/${h.symbol}`)}>
                <div className="flex items-center">
                  <span className="text-xs font-bold truncate" style={{ color: "var(--text)" }}>{h.symbol}</span>
                </div>
                <div className="text-[11px] font-mono tabular-nums leading-none" style={{ color: "var(--muted)" }}>
                  {h.q ? (cur === "USD" ? `$${price.toFixed(2)}` : fmtKRW(price * usdkrw)) : "—"}
                </div>
                <div className="text-xs font-bold tabular-nums" style={{ color: "var(--text)" }}>
                  {fmtVal(h.val, cur, usdkrw)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tabular-nums" style={{ color: clr(pnlPct) }}>
                    {sgn(pnlPct)}{pnlPct.toFixed(1)}%
                  </span>
                  <span className="text-[9px] tabular-nums" style={{ color: clr(dayChg) }}>
                    {h.q ? `${sgn(dayChg)}${dayChg.toFixed(1)}%` : ""}
                  </span>
                </div>
              </button>
            );
          })}
          <button
            className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl"
            style={{ background: "var(--bg)", border: "1px dashed var(--border)", width: "64px", minHeight: "90px", scrollSnapAlign: "start" }}
            onClick={() => router.push("/portfolio")}>
            <span className="text-lg leading-none" style={{ color: "var(--muted)" }}>+</span>
            <span className="text-[9px] mt-1 text-center leading-tight" style={{ color: "var(--muted)" }}>종목<br/>추가</span>
          </button>
        </div>

        {/* ── Desktop: vertical list ── */}
        <div className="hidden lg:block border-t" style={{ borderColor: "var(--border)" }}>
          {desktopList.map((h, i) => {
            const dayChg = h.q?.changePercent ?? 0;
            const pnlPct = h.cost > 0 ? ((h.val - h.cost) / h.cost) * 100 : 0;
            const price  = h.q?.price ?? h.avgCost;
            const isLast = i === desktopList.length - 1 && (!hasMore || showAll);
            return (
              <button key={h.symbol}
                className="w-full flex items-center justify-between px-4 py-3 text-left transition-opacity active:opacity-70"
                style={!isLast ? { borderBottom: "1px solid var(--border)" } : {}}
                onClick={() => router.push(`/stock/${h.symbol}`)}>
                <div className="flex items-center gap-2.5">
                  <div>
                    <div className="text-xs font-bold" style={{ color: "var(--text)" }}>{h.symbol}</div>
                    <div className="text-[10px] tabular-nums leading-tight" style={{ color: "var(--muted)" }}>
                      {h.q ? (cur === "USD" ? `$${price.toFixed(2)}` : fmtKRW(price * usdkrw)) : "—"}
                      {h.q && (
                        <span className="ml-1.5" style={{ color: clr(dayChg) }}>
                          {sgn(dayChg)}{dayChg.toFixed(2)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold tabular-nums" style={{ color: "var(--text)" }}>
                    {fmtVal(h.val, cur, usdkrw)}
                  </div>
                  <div className="text-[10px] tabular-nums" style={{ color: clr(pnlPct) }}>
                    {sgn(pnlPct)}{pnlPct.toFixed(2)}%
                  </div>
                </div>
              </button>
            );
          })}

          {/* 더보기 / 접기 */}
          {hasMore && (
            <button
              className="w-full py-2.5 text-center text-[11px] border-t"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              onClick={() => setShowAll((v) => !v)}>
              {showAll ? (isKo ? "접기 ▲" : "Show less ▲") : (isKo ? `+${enriched.length - DESKTOP_LIMIT}개 더보기 ▼` : `+${enriched.length - DESKTOP_LIMIT} more ▼`)}
            </button>
          )}

          {/* Add shortcut */}
          {(!hasMore || showAll) && (
            <button
              className="w-full py-2.5 text-center text-[11px] border-t"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              onClick={() => router.push("/portfolio")}>
              + 종목 추가
            </button>
          )}
        </div>
        </>}
      </div>
    </section>
  );
}
