"use client";

import { useState } from "react";

// ── New palette constants ────────────────────────────────────────────────────
const GOLD_VARS = {
  "--bg":      "#0b0c0e",   // Rich Black (기존 #0a0c10 → 더 깊게)
  "--card":    "#14161a",   // Charcoal (기존 #111318 → 더 세련되게)
  "--border":  "#1e2330",   // 약간 블루-다크
  "--mint":    "#00e5a0",   // ← 기존 민트 그대로 유지
  "--down":    "#ef4444",   // Rose Red (기존 #ff4d6d → 차분하게)
  "--text":    "#f5f6f8",   // Platinum White (기존 #e8eaed → 더 밝고 선명)
  "--muted":   "#b0b5bc",   // Metallic Silver (기존 #6b7280 → 밝은 실버)
  "--muted-2": "#252830",
};

const CURRENT_VARS = {
  "--bg":      "#0a0c10",
  "--card":    "#111318",
  "--border":  "#1e2028",
  "--mint":    "#00e5a0",
  "--down":    "#ff4d6d",
  "--text":    "#e8eaed",
  "--muted":   "#6b7280",
  "--muted-2": "#374151",
};

const UP_GOLD    = "#10b981"; // Emerald Green (상승 — 기존보다 차분)
const UP_CURRENT = "#00e5a0"; // 기존 민트
const DOWN       = "#ef4444"; // Rose Red

// ── Mock data ────────────────────────────────────────────────────────────────
const INDICES = [
  { label: "S&P 500",   value: "5,308.13", change: "+0.44%", pos: true },
  { label: "NASDAQ",    value: "16,742.39", change: "-0.29%", pos: false },
  { label: "DOW",       value: "39,512.84", change: "+0.34%", pos: true },
  { label: "Russell 2K",value: "2,089.12",  change: "+0.61%", pos: true },
];

const STOCKS = [
  { sym: "NVDA", name: "NVIDIA",     price: "$1,087.12", change: "+3.24%", pos: true  },
  { sym: "TSLA", name: "Tesla",      price: "$172.43",   change: "-1.43%", pos: false },
  { sym: "AAPL", name: "Apple",      price: "$189.64",   change: "+0.82%", pos: true  },
  { sym: "PLTR", name: "Palantir",   price: "$35.12",    change: "+5.17%", pos: true  },
];

const GURU_ITEMS = [
  { name: "워렌 버핏",        fund: "Berkshire Hathaway", aum: "$3,000억", color: "#fb923c" },
  { name: "론 베론",          fund: "Baron Capital",      aum: "$310억",   color: "#f97316" },
  { name: "낸시 펠로시",      fund: "STOCK Act 공시",    aum: "비공개",   color: "#f472b6" },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function IndexCard({ v, mint, up }: { v: typeof INDICES[0]; mint: string; up: string }) {
  return (
    <div className="rounded-2xl border p-3 flex-1"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <p className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: "var(--muted)" }}>{v.label}</p>
      <p className="text-sm font-bold font-mono mt-0.5" style={{ color: "var(--text)" }}>{v.value}</p>
      <p className="text-xs font-bold font-mono" style={{ color: v.pos ? up : DOWN }}>{v.change}</p>
    </div>
  );
}

function StockRow({ s, up }: { s: typeof STOCKS[0]; up: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b last:border-b-0"
      style={{ borderColor: "var(--border)" }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold"
        style={{ background: "var(--border)", color: "var(--text)" }}>{s.sym.slice(0, 2)}</div>
      <div className="flex-1">
        <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{s.sym}</p>
        <p className="text-[11px]" style={{ color: "var(--muted)" }}>{s.name}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-mono font-semibold" style={{ color: "var(--text)" }}>{s.price}</p>
        <p className="text-xs font-mono font-bold" style={{ color: s.pos ? up : DOWN }}>{s.change}</p>
      </div>
    </div>
  );
}

function FearGauge({ mint }: { mint: string }) {
  const pct = 63;
  const R = 28, C = 2 * Math.PI * R;
  const dash = C * (pct / 100);
  return (
    <div className="rounded-2xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <p className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--muted)" }}>
        시장 심리 ◎
      </p>
      <div className="flex items-center gap-4">
        <div className="relative" style={{ width: 72, height: 72 }}>
          <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="36" cy="36" r={R} fill="none" stroke="var(--border)" strokeWidth="7" />
            <circle cx="36" cy="36" r={R} fill="none" stroke={mint} strokeWidth="7"
              strokeDasharray={C} strokeDashoffset={C - dash} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold font-mono" style={{ color: mint }}>{pct}</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: "var(--text)" }}>탐욕</p>
          <p className="text-[11px] mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>
            투자자들의 탐욕 심리가<br />우세한 구간이에요
          </p>
          <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold border"
            style={{ background: `${mint}1e`, color: mint, borderColor: `${mint}33` }}>
            ⚡ 탐욕 · 63
          </div>
        </div>
      </div>
    </div>
  );
}

function BuffettBar({ mint }: { mint: string }) {
  const val = 261;
  return (
    <div className="rounded-2xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <p className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--muted)" }}>
        버핏 지수 ◎
      </p>
      <div className="flex items-end justify-between mb-2">
        <span className="text-2xl font-bold font-mono" style={{ color: "#ff4d6d" }}>{val}%</span>
        <span className="text-[11px] px-2 py-0.5 rounded-full font-bold"
          style={{ background: "rgba(255,77,109,0.12)", color: "#ff4d6d" }}>극단적 고평가</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
        <div className="h-full rounded-full"
          style={{ width: "100%", background: `linear-gradient(90deg, #00C9A4 0%, ${mint} 60%, #ff4d6d 100%)` }} />
      </div>
      <div className="flex justify-between mt-1">
        {["적정 ~100%", "고평가 ~150%", "극단 150%+"].map((l) => (
          <span key={l} className="text-[8px]" style={{ color: "var(--muted)" }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function GuruCard({ g, mint }: { g: typeof GURU_ITEMS[0]; mint: string }) {
  return (
    <div className="rounded-2xl border px-4 py-3 flex items-center gap-3"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: `${g.color}18`, border: `2px solid ${g.color}44` }}>
        {g.name === "워렌 버핏" ? "🎩" : g.name === "론 베론" ? "🏰" : "🏛️"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{g.name} ◎</p>
        <p className="text-[11px]" style={{ color: "var(--muted)" }}>{g.fund}</p>
      </div>
      <div className="text-right">
        <p className="text-xs font-semibold" style={{ color: g.color }}>{g.aum}</p>
        <span className="text-[9px] px-1 py-0.5 rounded"
          style={{ background: "rgba(96,165,250,0.12)", color: "#60a5fa" }}>SEC 13F</span>
      </div>
    </div>
  );
}

function NavBar({ mint, text, muted }: { mint: string; text: string; muted: string }) {
  const items = ["홈","검색","자산","종토방","인사이트","더보기"];
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div className="flex items-center h-14">
        {items.map((label, i) => (
          <div key={label} className="flex-1 flex flex-col items-center justify-center gap-0.5">
            <span className="text-xl">
              {["📊","🔍","💼","💬","💡","···"][i]}
            </span>
            <span className="text-[9px] font-medium" style={{ color: i === 0 ? mint : muted }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Swatch({ label, hex }: { label: string; hex: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg border border-white/10 flex-shrink-0"
        style={{ background: hex }} />
      <div>
        <p className="text-[11px] font-bold" style={{ color: "#EDF0F8" }}>{label}</p>
        <p className="text-[10px] font-mono" style={{ color: "#8896AD" }}>{hex}</p>
      </div>
    </div>
  );
}

// ── Preview panel ─────────────────────────────────────────────────────────────
function ThemePanel({ vars, up, label, isGold }: {
  vars: Record<string, string>;
  up: string;
  label: string;
  isGold: boolean;
}) {
  const mint = vars["--mint"];
  return (
    <div
      className="rounded-3xl overflow-hidden border-2 flex flex-col"
      style={{
        ...Object.fromEntries(Object.entries(vars)) as React.CSSProperties,
        background: vars["--bg"],
        borderColor: isGold ? "#C9A84C" : "#00e5a0",
        minWidth: 320,
        maxWidth: 400,
        flex: 1,
      }}
    >
      {/* Panel label */}
      <div className="px-4 py-2 flex items-center justify-between"
        style={{ background: vars["--card"], borderBottom: `1px solid ${vars["--border"]}` }}>
        <span className="text-xs font-bold tracking-wider uppercase font-mono" style={{ color: mint }}>
          {label}
        </span>
        {isGold && (
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
            style={{ background: `${mint}22`, color: mint }}>포인트 유지 ✓</span>
        )}
      </div>

      <div className="flex flex-col gap-3 p-3 overflow-y-auto" style={{ flex: 1 }}>

        {/* Color swatches — gold only */}
        {isGold && (
          <div className="rounded-2xl border p-3 space-y-2"
            style={{ background: vars["--card"], borderColor: vars["--border"] }}>
            <p className="text-[10px] font-semibold tracking-wider uppercase mb-2" style={{ color: mint }}>
              NEW PALETTE
            </p>
            <Swatch label="Mint — 포인트 유지 ✓"       hex="#00e5a0" />
            <Swatch label="Platinum White — 메인 텍스트" hex="#f5f6f8" />
            <Swatch label="Metallic Silver — 보조"  hex="#b0b5bc" />
            <Swatch label="Emerald Green — 상승"    hex="#10b981" />
            <Swatch label="Rose Red — 하락"         hex="#ef4444" />
            <Swatch label="Rich Black — BG"         hex="#0b0c0e" />
            <Swatch label="Charcoal — Card"         hex="#14161a" />
          </div>
        )}

        {/* Nav bar */}
        <NavBar mint={mint} text={vars["--text"]} muted={vars["--muted"]} />

        {/* Indices */}
        <div className="rounded-2xl border overflow-hidden"
          style={{ background: vars["--card"], borderColor: vars["--border"] }}>
          <div className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: vars["--border"] }}>
            <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: vars["--muted"] }}>
              주요 지수
            </span>
            <span className="text-[10px]" style={{ color: mint }}>★ INVESTUS</span>
          </div>
          <div className="flex gap-2 p-3">
            {INDICES.map((v) => <IndexCard key={v.label} v={v} mint={mint} up={up} />)}
          </div>
        </div>

        {/* Stock list */}
        <div className="rounded-2xl border overflow-hidden"
          style={{ background: vars["--card"], borderColor: vars["--border"] }}>
          <div className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: vars["--border"] }}>
            <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: vars["--muted"] }}>
              ★ INVESTUS 추천주식
            </span>
            <span className="text-[10px]" style={{ color: vars["--muted"] }}>CIO 선정</span>
          </div>
          {STOCKS.map((s) => <StockRow key={s.sym} s={s} up={up} />)}
        </div>

        {/* Fear & Greed + Buffett */}
        <FearGauge mint={mint} />
        <BuffettBar mint={mint} />

        {/* Guru cards */}
        <div className="rounded-2xl border overflow-hidden"
          style={{ background: vars["--card"], borderColor: vars["--border"] }}>
          <div className="px-4 py-3 border-b"
            style={{ borderColor: vars["--border"] }}>
            <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: vars["--muted"] }}>
              13F 투자 대가
            </span>
          </div>
          <div className="flex flex-col gap-2 p-3">
            {GURU_ITEMS.map((g) => <GuruCard key={g.name} g={g} mint={mint} />)}
          </div>
        </div>

        {/* CTA button */}
        <button className="w-full py-3 rounded-2xl font-bold text-sm"
          style={{ background: mint, color: isGold ? "#0b0c0e" : "#000" }}>
          {isGold ? "✦ 지금 적용 — Premium Rich" : "현재 테마 유지"}
        </button>

      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function GoldPreviewPage() {
  const [mode, setMode] = useState<"side" | "gold" | "current">("side");

  return (
    <div className="min-h-screen p-4 pb-12" style={{ background: "#0b0c0e" }}>
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#d4af37" }}>
          INVESTUS · THEME PREVIEW
        </p>
        <h1 className="text-2xl font-bold mt-1" style={{ color: "#f5f6f8" }}>
          Premium Rich — 민트 포인트 유지 버전
        </h1>
        <p className="text-sm mt-1" style={{ color: "#b0b5bc" }}>
          현재 테마(좌)와 새 팔레트(우)를 나란히 비교해보세요. 확인 후 적용 여부를 알려주세요.
        </p>

        {/* Mode toggle */}
        <div className="flex gap-2 mt-4">
          {([["side","↔ 나란히 비교"],["gold","✦ 골드만"],["current","◎ 현재만"]] as [typeof mode, string][]).map(([m, l]) => (
            <button key={m} onClick={() => setMode(m)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all"
              style={{
                background: mode === m ? "#C9A84C" : "transparent",
                color:      mode === m ? "#1a1200"  : "#8896AD",
                borderColor: mode === m ? "#C9A84C" : "#283041",
              }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Panels */}
      <div className="max-w-5xl mx-auto flex gap-4 items-start">
        {(mode === "side" || mode === "current") && (
          <ThemePanel vars={CURRENT_VARS} up={UP_CURRENT} label="현재 테마" isGold={false} />
        )}
        {(mode === "side" || mode === "gold") && (
          <ThemePanel vars={GOLD_VARS} up={UP_GOLD} label="Premium Rich · Gold" isGold={true} />
        )}
      </div>

      {/* Footer note */}
      <p className="text-center text-[10px] mt-8" style={{ color: "#283041" }}>
        /preview/gold — 비공개 프리뷰 페이지 · 메인 사이트와 무관
      </p>
    </div>
  );
}
