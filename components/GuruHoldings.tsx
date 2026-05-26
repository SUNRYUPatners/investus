"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, X } from "lucide-react";
import { GURUS, type Guru } from "@/lib/holdings13f";
import { useLocale } from "@/contexts/LocaleContext";
import { SectionInfo } from "./SectionInfo";

const GURU_INFO: Record<string, { title: string; body: string }> = {
  berkshire: {
    title: "워렌 버핏",
    body: "버크셔 해서웨이 회장. \"가치투자의 아버지\". 60년간 연평균 ~20% 수익률. \"좋은 기업을 적당한 가격에, 오래 보유\"가 핵심 철학. 13F 공시로 포트폴리오 공개.",
  },
  ark: {
    title: "캐시 우드",
    body: "ARK Invest 창업자. AI·바이오·핀테크·자율주행 등 혁신 테마 전문. 테슬라 최고 강세론자 중 한 명. 고위험 고성장주 집중 투자 전략.",
  },
  baron: {
    title: "론 베론",
    body: "바론 캐피털 창업자. \"10년 이상 보유\"가 철학인 장기 성장주 투자자. 테슬라 초기 투자자로 유명. $310억 운용.",
  },
  pelosi: {
    title: "낸시 펠로시",
    body: "미국 전 하원의장. 현직 의원으로 STOCK Act 공시 의무 대상. 빅테크 집중 투자로 유명. 공개 공시 기준 수익률이 S&P 500을 지속 상회해 주목받음.",
  },
  ackman: {
    title: "빌 애크먼",
    body: "퍼싱 스퀘어 캐피털 창업자. 집중 포트폴리오(10종목 내외)로 운용. 행동주의 투자자로 기업 경영에 직접 개입하는 전략으로 유명.",
  },
  druckenmiller: {
    title: "스탠리 드러켄밀러",
    body: "듀케인 패밀리 오피스 운용. 조지 소로스와 함께 영란은행을 무너뜨린 전설적 매크로 투자자. 트렌드 추종 + 집중 투자 전략.",
  },
};

const BADGE: Record<string, { label: string; color: string }> = {
  "13F":       { label: "SEC 13F",   color: "#60a5fa" },
  "STOCK_ACT": { label: "STOCK Act", color: "#f472b6" },
};

const UP   = "#10b981";
const DOWN = "#ef4444";

type PriceMap = Record<string, { price: number; change: number; changePercent: number }>;

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function readLocalCache(symbols: string[]): PriceMap {
  const result: PriceMap = {};
  try {
    // 1. market-data-cache (LiveMarket이 쓰는 공유 캐시)
    const mdRaw = localStorage.getItem("market-data-cache");
    if (mdRaw) {
      const md = JSON.parse(mdRaw) as {
        quotes?: { symbol: string; price: number; change: number; changePercent: number }[];
      };
      (md?.quotes ?? []).forEach((q) => {
        if (symbols.includes(q.symbol) && q.price > 0)
          result[q.symbol] = { price: q.price, change: q.change, changePercent: q.changePercent };
      });
    }
    // 2. 개별 종목 상세 캐시 (stock/[symbol] 페이지가 쓰는 캐시)
    symbols.forEach((sym) => {
      if (result[sym]) return;
      const raw = localStorage.getItem(`stock-detail-${sym}`);
      if (!raw) return;
      const d = JSON.parse(raw) as { price?: number; change?: number; changePercent?: number };
      if (d?.price && d.price > 0)
        result[sym] = { price: d.price, change: d.change ?? 0, changePercent: d.changePercent ?? 0 };
    });
  } catch { /* ignore */ }
  return result;
}

function GuruCard({ guru, open, onToggle }: { guru: Guru; open: boolean; onToggle: () => void }) {
  const t = useLocale();
  const [prices,  setPrices]  = useState<PriceMap>({});
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const info = GURU_INFO[guru.id];

  const fetchPrices = (syms: string[]) => {
    // Show cached values instantly for fast initial render
    const cached = readLocalCache(syms);
    if (Object.keys(cached).length > 0) setPrices((p) => ({ ...p, ...cached }));

    // Always call API for all symbols — never skip based on localStorage (data can be stale)
    setLoading(true);
    fetch(`/api/guru-prices?symbols=${encodeURIComponent(syms.join(","))}`)
      .then((r) => r.json())
      .then((data: PriceMap) => {
        if (Object.keys(data).length > 0) setPrices((p) => ({ ...p, ...data }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  // Fetch prices when opened (including on back-navigation restore)
  useEffect(() => {
    if (open && !fetched) {
      setFetched(true);
      fetchPrices(guru.holdings.map((h) => h.symbol));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleOpen = () => {
    onToggle();
  };

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* ── Header ── */}
      <button
        className="w-full flex items-center gap-3 px-4 py-3.5 active:opacity-80 transition-opacity"
        onClick={handleOpen}
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: `${guru.color}18`, border: `2px solid ${guru.color}44` }}
        >
          {guru.emoji}
        </div>

        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{guru.name}</p>
            {info && (
              <button
                onClick={(e) => { e.stopPropagation(); setInfoOpen((v) => !v); }}
                className="flex-shrink-0 opacity-50 hover:opacity-80 active:opacity-60 transition-opacity"
                aria-label="설명 보기"
              >
                <HelpCircle className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
              </button>
            )}
          </div>
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>{guru.fund}</p>
        </div>

        <div className="text-right flex-shrink-0 mr-1">
          <p className="text-xs font-semibold" style={{ color: guru.color }}>{guru.aum}</p>
          <div className="flex items-center justify-end gap-1 mt-0.5">
            <span className="text-[9px] px-1 py-0.5 rounded"
              style={{ background: `${BADGE[guru.disclosureType].color}18`, color: BADGE[guru.disclosureType].color }}>
              {BADGE[guru.disclosureType].label}
            </span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>{guru.quarter}</span>
          </div>
          <p className="text-[9px] mt-0.5 font-mono-num" style={{ color: "var(--muted)" }}>
            공시 {guru.filingDate}
          </p>
          <p className="text-[9px] font-mono-num" style={{ color: "var(--muted)" }}>
            다음 {guru.nextFilingDate}
          </p>
        </div>

        <ChevronDown
          className="w-4 h-4 flex-shrink-0 transition-transform"
          style={{ color: "var(--muted)", transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>

      {/* ── Guru info panel ── */}
      {infoOpen && info && (
        <div
          className="mx-3 mb-2 rounded-xl border px-3 py-2.5 relative"
          style={{ background: `${guru.color}0d`, borderColor: `${guru.color}22` }}
        >
          <button
            onClick={() => setInfoOpen(false)}
            className="absolute top-2 right-2 opacity-40 hover:opacity-70"
          >
            <X className="w-3 h-3" style={{ color: "var(--text)" }} />
          </button>
          <p className="text-[11px] font-bold mb-1" style={{ color: guru.color }}>{info.title}</p>
          <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>{info.body}</p>
        </div>
      )}

      {/* ── Holdings list ── */}
      {open && (
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          {/* Column header */}
          <div
            className="flex items-center px-4 py-2 text-[10px] font-semibold"
            style={{ color: "var(--muted)", background: "var(--bg)" }}
          >
            <span className="flex-1">{t.guru.colSymbol}</span>
            <span className="w-14 text-right">{t.guru.colWeight}</span>
            <span className="w-20 text-right">{t.guru.colPrice}</span>
            <span className="w-16 text-right">{t.guru.colChange}</span>
          </div>

          {guru.holdings.map((h, i) => {
            const p   = prices[h.symbol];
            const pos = p ? p.changePercent >= 0 : null;
            const clr = pos === null ? "var(--muted)" : pos ? UP : DOWN;

            return (
              <Link
                key={h.symbol}
                href={`/stock/${h.symbol}`}
                className={`flex items-center px-4 py-2.5 active:opacity-70 transition-opacity ${
                  i < guru.holdings.length - 1 ? "border-b" : ""
                }`}
                style={{ borderColor: "var(--border)", textDecoration: "none" }}
              >
                {/* Symbol + name */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: `${guru.color}18`, color: guru.color }}
                    >
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-xs font-bold font-mono-num" style={{ color: "var(--text)" }}>
                      {h.symbol}
                    </span>
                  </div>
                  <p className="text-[10px] truncate mt-0.5 pl-7" style={{ color: "var(--muted)" }}>
                    {h.name}
                  </p>
                </div>

                {/* 비중 */}
                <div className="w-14 text-right">
                  <p className="text-xs font-mono-num font-semibold" style={{ color: guru.color }}>
                    {h.portfolioPct.toFixed(1)}%
                  </p>
                  <div className="h-0.5 rounded-full mt-0.5 ml-auto"
                    style={{
                      width: `${Math.min(100, (h.portfolioPct / guru.holdings[0].portfolioPct) * 100)}%`,
                      background: guru.color,
                      opacity: 0.5,
                    }}
                  />
                </div>

                {/* 현재가 */}
                <div className="w-20 text-right">
                  {loading ? (
                    <div className="h-3 w-14 rounded ml-auto animate-pulse" style={{ background: "var(--border)" }} />
                  ) : p ? (
                    <p className="text-xs font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
                      {fmt(p.price)}
                    </p>
                  ) : (
                    <p className="text-xs font-mono-num" style={{ color: "var(--muted)" }}>—</p>
                  )}
                </div>

                {/* 등락률 */}
                <div className="w-16 text-right">
                  {loading ? (
                    <div className="h-3 w-10 rounded ml-auto animate-pulse" style={{ background: "var(--border)" }} />
                  ) : p ? (
                    <p className="text-[11px] font-mono-num font-semibold" style={{ color: clr }}>
                      {pos ? "+" : ""}{p.changePercent.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="text-[11px] font-mono-num" style={{ color: "var(--muted)" }}>—</p>
                  )}
                </div>
              </Link>
            );
          })}

          {/* Refresh row */}
          <div
            className="flex items-center justify-between px-4 py-2 border-t"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
          >
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>
              {t.guru.source} · {guru.quarter}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                fetchPrices(guru.holdings.map((h) => h.symbol));
              }}
              disabled={loading}
              className="text-[10px] font-semibold px-2 py-0.5 rounded disabled:opacity-40 active:opacity-70 transition-opacity"
              style={{ color: "var(--mint)", background: "rgba(0,229,160,0.08)" }}
            >
              {loading ? t.guru.loading : t.guru.refresh}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function GuruHoldings() {
  const t = useLocale();

  // Persist open/closed state across navigation (back button restores state)
  const [openSet, setOpenSet] = useState<Set<string>>(() => {
    try {
      const raw = sessionStorage.getItem("guru-open");
      return new Set(JSON.parse(raw ?? "[]") as string[]);
    } catch { return new Set(); }
  });

  const toggle = (id: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      try { sessionStorage.setItem("guru-open", JSON.stringify([...next])); } catch {}
      return next;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <SectionInfo title={t.guru.sectionTitle} side="right">
            <p className="font-bold mb-1" style={{ color: "#60a5fa" }}>13F 공시란?</p>
            <p style={{ color: "var(--muted)" }}>미국에서 자산 <b>$1억 이상</b> 기관투자자는 매 분기마다 보유 주식을 SEC(미국 증권거래위원회)에 의무 보고해야 해요. 이게 바로 <b>13F 공시</b>예요.</p>
            <div className="mt-2 space-y-1">
              <p>📋 분기 종료 후 <b>45일 이내</b> 공시 의무</p>
              <p>⏱️ 실제 매수 시점보다 최대 <b>3개월 늦게</b> 공개됨</p>
              <p>❓ 각 투자대가 이름 옆 <b>?</b>를 눌러 개인 소개 확인</p>
            </div>
          </SectionInfo>
          <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
            {t.guru.subtitle}
          </p>
        </div>
      </div>

      <div
        className="flex items-center gap-2 rounded-xl px-3 py-2 mb-3 border"
        style={{ background: "rgba(0,229,160,0.04)", borderColor: "rgba(0,229,160,0.12)" }}
      >
        <span className="text-xs">📋</span>
        <p className="text-[10px] leading-relaxed" style={{ color: "var(--muted)" }}>
          {t.guru.notice}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {GURUS.map((guru) => (
          <GuruCard
            key={guru.id}
            guru={guru}
            open={openSet.has(guru.id)}
            onToggle={() => toggle(guru.id)}
          />
        ))}
      </div>
    </div>
  );
}
