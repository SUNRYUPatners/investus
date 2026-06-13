"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import {
  Plus, Trash2, TrendingUp, TrendingDown,
  Search, X, RefreshCw, Building2, ChevronRight, ChevronDown, ChevronUp, Wallet, LogIn, Lock,
  Camera, CheckSquare, Square, AlertTriangle, Sparkles, CheckCircle2,
} from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import type { ParsedHolding } from "@/app/api/parse-portfolio-screenshot/route";
import { usePortfolio } from "@/hooks/usePortfolio";
import { mockQuotes } from "@/lib/api";
import type { Holding } from "@/lib/api";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { AdFitBanner, AdFitStrip } from "@/components/AdFitBanner";
import { PortfolioAI } from "@/components/PortfolioAI";

// ── Types & Constants ─────────────────────────────────────────────────────────

type LiveQ = { symbol: string; shortName: string; price: number; changePercent: number };
type Cur   = "USD" | "KRW";

const BROKERAGES_KR = [
  { name: "키움", emoji: "🟠" }, { name: "KB증권", emoji: "🟡" },
  { name: "삼성", emoji: "💎" }, { name: "미래에셋", emoji: "🌐" },
  { name: "신한", emoji: "🔵" }, { name: "NH투자", emoji: "🟢" },
  { name: "대신", emoji: "🔴" }, { name: "한투", emoji: "⭐" },
];
const BROKERAGES_US = [
  { name: "Fidelity", emoji: "🦅" }, { name: "Schwab", emoji: "🇺🇸" },
  { name: "Robinhood", emoji: "🏹" }, { name: "IBKR", emoji: "🌍" },
];

// ── Formatting helpers ────────────────────────────────────────────────────────

function fmtUSD(v: number, dec = 2) {
  return "$" + v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

function fmtKRW(v: number) {
  if (v >= 1e12) return `${(v / 1e12).toFixed(1)}조원`;
  if (v >= 1e8)  return `${(v / 1e8).toFixed(1)}억원`;
  if (v >= 1e4)  return `${Math.round(v / 1e4).toLocaleString()}만원`;
  return `${Math.round(v).toLocaleString()}원`;
}

function fmtVal(usd: number, cur: Cur, rate: number, dec = 2) {
  return cur === "KRW" ? fmtKRW(usd * rate) : fmtUSD(usd, dec);
}

function clr(v: number) { return v >= 0 ? "var(--mint)" : "#ef4444"; }
function sgn(v: number)  { return v >= 0 ? "+" : ""; }

// ── Currency toggle pill ──────────────────────────────────────────────────────

function CurrencyToggle({ cur, onChange }: { cur: Cur; onChange: (c: Cur) => void }) {
  return (
    <div className="flex items-center rounded-full p-0.5 gap-0.5" style={{ background: "var(--border)" }}>
      {(["USD", "KRW"] as Cur[]).map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className="px-2 py-1 rounded-full text-[10px] font-bold transition-all"
          style={cur === c
            ? { background: "var(--card)", color: "var(--text)" }
            : { color: "var(--muted)" }}
        >
          {c === "USD" ? "$" : "₩"}
        </button>
      ))}
    </div>
  );
}

// ── Auth header helper ────────────────────────────────────────────────────────

async function authHeaders(): Promise<HeadersInit> {
  try {
    const { data: { session } } = await getSupabase().auth.getSession();
    const h: Record<string, string> = { "Content-Type": "application/json" };
    if (session?.access_token) h["Authorization"] = `Bearer ${session.access_token}`;
    return h;
  } catch {
    return { "Content-Type": "application/json" };
  }
}

// ── Screenshot import sheet ───────────────────────────────────────────────────

type ImportRow = ParsedHolding & { checked: boolean; editShares: string; editAvgCost: string };

type ImportState = "upload" | "analyzing" | "results" | "error";

function ScreenshotImportSheet({ onClose, onImport, existing }: {
  onClose:  () => void;
  onImport: (rows: { symbol: string; shares: number; avgCost: number }[]) => void;
  existing: string[];
}) {
  const [state,     setState]     = useState<ImportState>("upload");
  const [rows,      setRows]      = useState<ImportRow[]>([]);
  const [errMsg,    setErrMsg]    = useState("");
  const [preview,   setPreview]   = useState<string | null>(null);
  const [dragging,  setDragging]  = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) { setErrMsg("이미지 파일만 가능합니다."); return; }
    if (file.size > 5 * 1024 * 1024) { setErrMsg("5MB 이하 파일만 가능합니다."); return; }

    // Preview
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    setState("analyzing");
    setErrMsg("");

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload  = () => resolve((r.result as string).split(",")[1]);
        r.onerror = reject;
        r.readAsDataURL(file);
      });

      const res  = await fetch("/api/parse-portfolio-screenshot", {
        method:  "POST",
        headers: await authHeaders(),
        body:    JSON.stringify({ imageBase64: base64, mimeType: file.type }),
      });
      const data = await res.json() as { holdings?: ParsedHolding[]; error?: string };

      if (!res.ok || data.error) { setState("error"); setErrMsg(data.error ?? "인식 실패"); return; }
      if (!data.holdings || data.holdings.length === 0) { setState("error"); setErrMsg("보유종목을 찾지 못했어요."); return; }

      setRows(
        data.holdings.map((h) => ({
          ...h,
          checked:      !existing.includes(h.symbol),
          editShares:   String(h.shares),
          editAvgCost:  h.avgCost != null ? String(h.avgCost) : "",
        }))
      );
      setState("results");
    } catch {
      setState("error");
      setErrMsg("네트워크 오류. 다시 시도해주세요.");
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) processFile(f);
  };

  const checkedCount = rows.filter((r) => r.checked && parseFloat(r.editShares) > 0 && parseFloat(r.editAvgCost) > 0).length;

  const handleApply = () => {
    const valid = rows
      .filter((r) => r.checked)
      .map((r) => ({ symbol: r.symbol, shares: parseFloat(r.editShares), avgCost: parseFloat(r.editAvgCost) }))
      .filter((r) => r.shares > 0 && r.avgCost > 0);
    if (valid.length === 0) return;
    onImport(valid);
    onClose();
  };

  const hasMissingPrice = rows.some((r) => r.checked && (!r.editAvgCost || parseFloat(r.editAvgCost) <= 0));

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.78)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full sm:max-w-[480px] rounded-t-3xl sm:rounded-3xl border max-h-[92vh] overflow-y-auto"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,229,160,0.12)" }}>
              <Camera className="w-4 h-4" style={{ color: "var(--mint)" }} />
            </div>
            <div>
              <p className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>
                {state === "results" ? `${rows.length}개 종목 인식 완료` : "계좌 스크린샷으로 불러오기"}
              </p>
              <p className="text-[10px]" style={{ color: "var(--muted)" }}>
                {state === "upload"    && "AI가 보유종목을 자동으로 읽어드려요"}
                {state === "analyzing" && "AI가 종목을 분석 중입니다…"}
                {state === "results"   && "확인 후 추가할 종목을 선택하세요"}
                {state === "error"     && "인식에 실패했습니다"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity active:opacity-60" style={{ background: "var(--bg)" }}>
            <X className="w-4 h-4" style={{ color: "var(--muted)" }} />
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">

          {/* ── State: UPLOAD ── */}
          {state === "upload" && (
            <>
              <div
                className="relative rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-12 gap-4 cursor-pointer transition-all"
                style={{
                  borderColor: dragging ? "var(--mint)" : "var(--border)",
                  background:  dragging ? "rgba(0,229,160,0.04)" : "var(--bg)",
                }}
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,229,160,0.1)" }}>
                  <Camera className="w-8 h-8" style={{ color: "var(--mint)" }} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>스크린샷 업로드</p>
                  <p className="text-[12px]" style={{ color: "var(--muted)" }}>클릭하거나 파일을 끌어다 놓으세요</p>
                  <p className="text-[10px] mt-1" style={{ color: "var(--muted)", opacity: 0.6 }}>JPG · PNG · 최대 5MB</p>
                </div>
                <button
                  className="px-5 py-2 rounded-full text-sm font-bold transition-opacity"
                  style={{ background: "var(--mint)", color: "#000" }}
                  onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
                >
                  파일 선택
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              </div>

              {errMsg && (
                <p className="text-xs text-center" style={{ color: "#ef4444" }}>{errMsg}</p>
              )}

              {/* USD 설정 안내 (핵심) */}
              <div className="rounded-2xl p-4 border" style={{ background: "rgba(251,191,36,0.05)", borderColor: "rgba(251,191,36,0.25)" }}>
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#fbbf24" }} />
                  <p className="text-[12px] font-bold" style={{ color: "#fbbf24" }}>
                    스크린샷 찍기 전에 먼저 USD 설정!
                  </p>
                </div>
                <div className="space-y-1.5 text-[11px]" style={{ color: "var(--muted)" }}>
                  <p>평단가가 <b style={{ color: "var(--text)" }}>달러($)로 표시된 화면</b>을 캡처해야 자동 입력됩니다.</p>
                  <div className="mt-2 pt-2 border-t space-y-1" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <p>🟠 <b>키움</b> — 해외주식 보유 → 외화 탭 선택</p>
                    <p>🌐 <b>미래에셋</b> — 해외주식 → USD 표시로 전환</p>
                    <p>🟡 <b>KB증권</b> — 해외주식 잔고 → 통화 USD</p>
                    <p>🦅 <b>Fidelity / Schwab</b> — 기본 USD 표시</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-4 border space-y-2" style={{ background: "rgba(0,229,160,0.03)", borderColor: "rgba(0,229,160,0.12)" }}>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--mint)" }} />
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                    <b style={{ color: "var(--text)" }}>보유종목 화면을 캡처</b>해 주세요. 종목명·수량·평단가(USD)가 보이면 AI가 자동 인식합니다.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ── State: ANALYZING ── */}
          {state === "analyzing" && (
            <div className="flex flex-col items-center py-10 gap-5">
              {preview && (
                <div className="w-full max-h-52 overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="preview" className="w-full h-full object-contain" style={{ maxHeight: 208 }} />
                </div>
              )}
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-12 h-12">
                  <div className="w-12 h-12 rounded-full border-4 animate-spin"
                    style={{ borderColor: "var(--border)", borderTopColor: "var(--mint)" }} />
                  <Sparkles className="w-5 h-5 absolute inset-0 m-auto" style={{ color: "var(--mint)" }} />
                </div>
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>AI가 종목 분석 중…</p>
                <p className="text-[11px]" style={{ color: "var(--muted)" }}>보통 3~5초 소요됩니다</p>
              </div>
            </div>
          )}

          {/* ── State: ERROR ── */}
          {state === "error" && (
            <div className="flex flex-col items-center py-10 gap-5 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                <AlertTriangle className="w-7 h-7" style={{ color: "#ef4444" }} />
              </div>
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>종목을 인식하지 못했어요</p>
                <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
                  {errMsg || "보유종목이 잘 보이는 화면을 캡처해서 다시 시도해주세요."}
                </p>
              </div>
              <button
                onClick={() => { setState("upload"); setErrMsg(""); setPreview(null); }}
                className="px-6 py-2.5 rounded-full text-sm font-bold"
                style={{ background: "var(--mint)", color: "#000" }}
              >
                다시 시도
              </button>
            </div>
          )}

          {/* ── State: RESULTS ── */}
          {state === "results" && (
            <>
              {/* Toggle all */}
              <div className="flex items-center justify-between">
                <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                  인식된 종목을 확인하고 수정해 주세요
                </p>
                <button
                  onClick={() => setRows((r) => r.map((x) => ({ ...x, checked: !r.every((y) => y.checked) })))}
                  className="text-[11px] font-semibold"
                  style={{ color: "var(--mint)" }}
                >
                  {rows.every((r) => r.checked) ? "전체 해제" : "전체 선택"}
                </button>
              </div>

              {/* Rows */}
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                {rows.map((row, i) => (
                  <div
                    key={row.symbol}
                    className={`px-4 py-3 ${i < rows.length - 1 ? "border-b" : ""}`}
                    style={{ borderColor: "var(--border)", background: row.checked ? "var(--bg)" : "transparent", opacity: row.checked ? 1 : 0.45 }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Checkbox */}
                      <button onClick={() => setRows((r) => r.map((x, j) => j === i ? { ...x, checked: !x.checked } : x))}>
                        {row.checked
                          ? <CheckSquare className="w-5 h-5" style={{ color: "var(--mint)" }} />
                          : <Square     className="w-5 h-5" style={{ color: "var(--muted)" }} />}
                      </button>

                      {/* Symbol */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold font-mono-num" style={{ color: "var(--text)" }}>{row.symbol}</span>
                          {existing.includes(row.symbol) && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: "rgba(0,229,160,0.12)", color: "var(--mint)" }}>보유중</span>
                          )}
                        </div>
                        {row.name && <p className="text-[10px] truncate" style={{ color: "var(--muted)" }}>{row.name}</p>}
                      </div>

                      {/* Shares input */}
                      <div className="flex flex-col items-end gap-1">
                        <p className="text-[9px]" style={{ color: "var(--muted)" }}>수량</p>
                        <input
                          type="number"
                          value={row.editShares}
                          onChange={(e) => setRows((r) => r.map((x, j) => j === i ? { ...x, editShares: e.target.value } : x))}
                          className="w-16 text-right text-xs font-mono-num rounded-lg px-2 py-1 outline-none border"
                          style={{ background: "var(--card)", color: "var(--text)", borderColor: "var(--border)", fontSize: "13px" }}
                        />
                      </div>

                      {/* AvgCost input */}
                      <div className="flex flex-col items-end gap-1">
                        <p className="text-[9px]" style={{ color: "var(--muted)" }}>평단가 (USD)</p>
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px]" style={{ color: "var(--muted)" }}>$</span>
                          <input
                            type="number"
                            value={row.editAvgCost}
                            onChange={(e) => setRows((r) => r.map((x, j) => j === i ? { ...x, editAvgCost: e.target.value } : x))}
                            placeholder="직접 입력"
                            className="w-24 text-right text-xs font-mono-num rounded-lg px-2 py-1 pl-5 outline-none border"
                            style={{
                              background:   "var(--card)",
                              color:        row.editAvgCost ? "var(--text)" : "#ef4444",
                              borderColor:  row.editAvgCost ? "var(--border)" : "rgba(239,68,68,0.4)",
                              fontSize:     "13px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Warning: missing avgCost (원화 감지 or 미인식) */}
              {hasMissingPrice && (
                <div className="rounded-2xl p-4 border space-y-3" style={{ background: "rgba(251,191,36,0.05)", borderColor: "rgba(251,191,36,0.25)" }}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#fbbf24" }} />
                    <div>
                      <p className="text-[12px] font-bold mb-0.5" style={{ color: "#fbbf24" }}>평단가가 원화(₩)로 표시된 것 같아요</p>
                      <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                        아래 두 가지 방법 중 하나를 선택해주세요.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => { setState("upload"); setPreview(null); setRows([]); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-opacity active:opacity-70"
                      style={{ background: "var(--card)", borderColor: "rgba(251,191,36,0.2)" }}
                    >
                      <span className="text-base">📷</span>
                      <div>
                        <p className="text-[12px] font-semibold" style={{ color: "var(--text)" }}>앱에서 USD 설정 후 다시 찍기</p>
                        <p className="text-[10px]" style={{ color: "var(--muted)" }}>평단가가 $ 달러로 보이는 화면을 캡처하세요</p>
                      </div>
                    </button>
                    <div className="flex items-center gap-2 px-1">
                      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                      <p className="text-[10px]" style={{ color: "var(--muted)" }}>또는</p>
                      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                    </div>
                    <p className="text-[11px] text-center" style={{ color: "var(--muted)" }}>
                      빨간 칸에 USD 평단가를 직접 입력한 뒤 추가
                    </p>
                  </div>
                </div>
              )}

              {/* Apply button */}
              <button
                onClick={handleApply}
                disabled={checkedCount === 0}
                className="w-full py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-opacity disabled:opacity-40"
                style={{ background: "var(--mint)", color: "#000" }}
              >
                <CheckCircle2 className="w-4 h-4" />
                선택한 종목 추가 ({checkedCount}개)
              </button>

              <button
                onClick={() => { setState("upload"); setPreview(null); setRows([]); }}
                className="w-full text-[12px] py-2 text-center transition-opacity active:opacity-60"
                style={{ color: "var(--muted)" }}
              >
                다른 스크린샷 다시 올리기
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Add stock sheet ───────────────────────────────────────────────────────────

function AddSheet({ onClose, onAdd, existing }: {
  onClose: () => void;
  onAdd: (h: Holding) => void;
  existing: string[];
}) {
  const [query, setQuery]     = useState("");
  const [selected, setSelected] = useState<{ symbol: string; name: string; price: number } | null>(null);
  const [shares, setShares]   = useState("");
  const [avgCost, setAvgCost] = useState("");
  const [looking, setLooking] = useState(false);
  const [err, setErr]         = useState("");
  const inputRef              = useRef<HTMLInputElement>(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 120); }, []);

  const suggestions = query.length >= 1
    ? mockQuotes.filter((q) =>
        (q.symbol.toLowerCase().startsWith(query.toLowerCase()) ||
         q.name.toLowerCase().includes(query.toLowerCase())) &&
        !existing.includes(q.symbol)
      ).slice(0, 6)
    : [];

  async function lookupTicker(sym: string) {
    const upper = sym.trim().toUpperCase();
    if (!upper) return;
    const known = mockQuotes.find((q) => q.symbol === upper);
    if (known) {
      setSelected({ symbol: known.symbol, name: known.name, price: known.price });
      setAvgCost(known.price.toFixed(2));
      return;
    }
    setLooking(true); setErr("");
    try {
      const res  = await fetch(`/api/guru-prices?symbols=${encodeURIComponent(upper)}`);
      const data = await res.json() as Record<string, { price: number; changePercent: number }>;
      const entry = data[upper];
      if (entry?.price > 0) {
        setSelected({ symbol: upper, name: upper, price: entry.price });
        setAvgCost(entry.price.toFixed(2));
      } else {
        setErr("종목을 찾을 수 없습니다.");
      }
    } catch { setErr("조회 실패. 티커를 확인해주세요."); }
    finally  { setLooking(false); }
  }

  function submit() {
    if (!selected || !shares || !avgCost) return;
    onAdd({ symbol: selected.symbol, shares: parseFloat(shares), avgCost: parseFloat(avgCost) });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.72)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-[440px] rounded-3xl border max-h-[85vh] overflow-y-auto"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="px-5 pt-5 pb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>종목 추가</h2>
            <button onClick={onClose} className="p-1.5 rounded-full" style={{ background: "var(--bg)" }}>
              <X className="w-4 h-4" style={{ color: "var(--muted)" }} />
            </button>
          </div>

          {!selected ? (
            <>
              <div className="flex items-center gap-2 rounded-2xl px-4 py-3 border mb-3"
                style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
                <Search className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="티커 입력 (예: AAPL, NVDA, TSLA)"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setErr(""); }}
                  onKeyDown={(e) => e.key === "Enter" && lookupTicker(query)}
                  className="flex-1 bg-transparent outline-none"
                  style={{ color: "var(--text)", fontSize: "16px" }}
                />
                {query && <button onClick={() => setQuery("")}><X className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} /></button>}
              </div>
              {err && <p className="text-xs mb-3 px-1" style={{ color: "#ef4444" }}>{err}</p>}
              {suggestions.length > 0 && (
                <div className="mb-3 max-h-44 overflow-y-auto flex flex-col gap-1">
                  {suggestions.map((q) => (
                    <button key={q.symbol}
                      onClick={() => { setSelected({ symbol: q.symbol, name: q.name, price: q.price }); setAvgCost(q.price.toFixed(2)); }}
                      className="flex items-center justify-between px-4 py-2.5 rounded-xl text-left transition-opacity active:opacity-70"
                      style={{ background: "var(--bg)" }}>
                      <div>
                        <p className="text-sm font-bold font-mono-num" style={{ color: "var(--text)" }}>{q.symbol}</p>
                        <p className="text-[11px] truncate" style={{ color: "var(--muted)" }}>{q.name}</p>
                      </div>
                      <p className="text-sm font-mono-num tabular-nums ml-4 flex-shrink-0" style={{ color: "var(--text)" }}>${q.price.toFixed(2)}</p>
                    </button>
                  ))}
                </div>
              )}
              <button onClick={() => lookupTicker(query)} disabled={!query.trim() || looking}
                className="w-full py-3 rounded-2xl text-sm font-bold transition-opacity disabled:opacity-40"
                style={{ background: "var(--mint)", color: "#000" }}>
                {looking ? "조회 중…" : "종목 조회"}
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-4 py-3 rounded-2xl border"
                style={{ background: "var(--bg)", borderColor: "rgba(0,229,160,0.3)" }}>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-bold font-mono-num" style={{ color: "var(--text)" }}>{selected.symbol}</p>
                    <p className="text-[11px] max-w-[160px] truncate" style={{ color: "var(--muted)" }}>{selected.name}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-xs font-semibold" style={{ color: "var(--mint)" }}>변경</button>
              </div>
              <div>
                <label className="text-xs font-medium mb-2 block" style={{ color: "var(--muted)" }}>보유 수량</label>
                <input type="number" min="0.001" step="0.001" placeholder="0" value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  className="w-full rounded-2xl px-4 py-3 font-mono-num outline-none border"
                  style={{ background: "var(--bg)", color: "var(--text)", borderColor: "var(--border)", fontSize: "16px" }} />
              </div>
              <div>
                <label className="text-xs font-medium mb-2 block" style={{ color: "var(--muted)" }}>
                  평균 매수가 (USD)
                  <span className="ml-2 font-normal opacity-60">현재가: ${selected.price.toFixed(2)}</span>
                </label>
                <input type="number" min="0.01" step="0.01" placeholder="0.00" value={avgCost}
                  onChange={(e) => setAvgCost(e.target.value)}
                  className="w-full rounded-2xl px-4 py-3 font-mono-num outline-none border"
                  style={{ background: "var(--bg)", color: "var(--text)", borderColor: "var(--border)", fontSize: "16px" }} />
              </div>
              {shares && avgCost && (() => {
                const val  = parseFloat(shares) * selected.price;
                const cost = parseFloat(shares) * parseFloat(avgCost);
                const pnl  = val - cost;
                const pct  = cost > 0 ? (pnl / cost) * 100 : 0;
                return (
                  <div className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="flex items-center justify-between text-xs">
                      <span style={{ color: "var(--muted)" }}>예상 평가금액</span>
                      <div className="text-right">
                        <span className="font-mono-num font-semibold" style={{ color: "var(--text)" }}>${val.toFixed(2)}</span>
                        <span className="ml-2 font-mono-num" style={{ color: clr(pnl) }}>
                          {sgn(pnl)}${Math.abs(pnl).toFixed(2)} ({sgn(pct)}{pct.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
              <button onClick={submit} disabled={!shares || !avgCost || parseFloat(shares) <= 0}
                className="w-full py-3.5 rounded-2xl text-sm font-bold transition-opacity disabled:opacity-40"
                style={{ background: "var(--mint)", color: "#000" }}>
                추가하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Holding card ──────────────────────────────────────────────────────────────

function HoldingCard({ holding, live, weight, cur, rate, onDelete }: {
  holding: Holding;
  live: LiveQ | undefined;
  weight: number;
  cur: Cur;
  rate: number;
  onDelete: () => void;
}) {
  const router   = useRouter();
  const price    = live?.price ?? holding.avgCost;
  const todayPct = live?.changePercent ?? 0;
  const name     = live?.shortName ?? mockQuotes.find((q) => q.symbol === holding.symbol)?.name ?? holding.symbol;
  const val      = holding.shares * price;
  const cost     = holding.shares * holding.avgCost;
  const pnl      = val - cost;
  const pnlPct   = cost > 0 ? (pnl / cost) * 100 : 0;
  const todayAmt = holding.shares * price * (todayPct / 100);

  return (
    <div
      className="rounded-2xl border p-4 cursor-pointer transition-opacity active:opacity-80"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
      onClick={() => router.push(`/stock/${holding.symbol}`)}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm font-bold font-mono-num leading-tight" style={{ color: "var(--text)" }}>{holding.symbol}</p>
            <p className="text-[11px] leading-tight mt-0.5 max-w-[140px] truncate" style={{ color: "var(--muted)" }}>{name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold font-mono-num px-2 py-0.5 rounded-full"
            style={todayPct >= 0
              ? { background: "rgba(0,229,160,0.12)", color: "var(--mint)" }
              : { background: "rgba(255,77,109,0.12)", color: "#ef4444" }}>
            {sgn(todayPct)}{todayPct.toFixed(2)}%
          </span>
          <button
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-opacity active:opacity-50"
            style={{ background: "var(--bg)" }}
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
          >
            <Trash2 className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex gap-4 text-[11px] mb-3 flex-wrap">
        <span style={{ color: "var(--muted)" }}>{holding.shares}주</span>
        <span style={{ color: "var(--muted)" }}>
          평단 <span className="font-mono-num" style={{ color: "var(--text)" }}>{fmtVal(holding.avgCost, cur, rate)}</span>
        </span>
        <span style={{ color: "var(--muted)" }}>
          현재 <span className="font-mono-num" style={{ color: "var(--text)" }}>{fmtVal(price, cur, rate)}</span>
        </span>
      </div>

      {/* Value + P&L */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] mb-0.5" style={{ color: "var(--muted)" }}>평가금액</p>
          <p className="text-base font-bold font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
            {fmtVal(val, cur, rate)}
          </p>
          <p className="text-[10px] font-mono-num tabular-nums mt-0.5" style={{ color: "var(--muted)" }}>
            {cur === "KRW" ? `(${fmtUSD(val)})` : `(${fmtKRW(val * rate)})`}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] mb-0.5" style={{ color: "var(--muted)" }}>
            손익 / 오늘 {sgn(todayAmt)}{fmtVal(Math.abs(todayAmt), cur, rate, 0)}
          </p>
          <div className="flex items-center justify-end gap-1.5">
            {pnl >= 0 ? <TrendingUp className="w-3.5 h-3.5" style={{ color: "var(--mint)" }} /> : <TrendingDown className="w-3.5 h-3.5" style={{ color: "#ef4444" }} />}
            <p className="text-sm font-bold font-mono-num tabular-nums" style={{ color: clr(pnl) }}>
              {sgn(pnl)}{fmtVal(Math.abs(pnl), cur, rate, 0)}
            </p>
          </div>
          <p className="text-[11px] font-mono-num tabular-nums" style={{ color: clr(pnl) }}>
            {sgn(pnlPct)}{pnlPct.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Weight bar */}
      <div className="mt-3.5">
        <div className="h-[3px] rounded-full" style={{ background: "var(--border)" }}>
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.min(weight, 100)}%`, background: clr(pnl) }} />
        </div>
        <p className="text-[9px] mt-1 flex items-center justify-between" style={{ color: "var(--muted)" }}>
          <span>비중 {weight.toFixed(1)}%</span>
          <span className="flex items-center gap-1">
            차트·뉴스 보기 <ChevronRight className="w-3 h-3" />
          </span>
        </p>
      </div>
    </div>
  );
}

// ── Summary card ──────────────────────────────────────────────────────────────

// ── SummaryCard ───────────────────────────────────────────────────────────────

function SummaryCard({ holdings, liveMap, cur, rate, onRefresh, locale }: {
  holdings: Holding[]; liveMap: Record<string, LiveQ>;
  cur: Cur; rate: number;
  onRefresh: () => void; locale: string;
}) {
  const totalVal  = holdings.reduce((s, h) => s + h.shares * (liveMap[h.symbol]?.price ?? h.avgCost), 0);
  const totalCost = holdings.reduce((s, h) => s + h.shares * h.avgCost, 0);
  const totalPnl  = totalVal - totalCost;
  const pnlPct    = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;
  const dailyPnl  = holdings.reduce((s, h) => {
    const lv = liveMap[h.symbol];
    return lv ? s + h.shares * lv.price * (lv.changePercent / 100) : s;
  }, 0);
  const dailyPct  = totalVal > 0 ? (dailyPnl / (totalVal - dailyPnl)) * 100 : 0;

  const mainVal = cur === "KRW" ? fmtKRW(totalVal * rate) : fmtUSD(totalVal);
  const subVal  = cur === "KRW" ? fmtUSD(totalVal) : fmtKRW(totalVal * rate);

  return (
    <div className="rounded-2xl border overflow-hidden relative mb-5"
      style={{ background: "linear-gradient(135deg, #0d1f18 0%, #0a0c10 70%, #0d1520 100%)", borderColor: "rgba(0,229,160,0.2)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 15% 50%, rgba(0,229,160,0.09) 0%, transparent 60%)" }} />

      <div className="relative p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-semibold tracking-widest uppercase font-syne" style={{ color: "rgba(0,229,160,0.7)" }}>
            {locale === "ko" ? "총 평가금액" : "Total Portfolio Value"}
          </p>
          <button onClick={onRefresh} className="transition-opacity active:opacity-50">
            <RefreshCw className="w-3.5 h-3.5" strokeWidth={2} style={{ color: "rgba(0,229,160,0.5)" }} />
          </button>
        </div>
        <p className="text-[32px] font-bold font-mono-num tabular-nums leading-none" style={{ color: "var(--text)" }}>
          {mainVal}
        </p>
        <p className="text-[11px] font-mono-num mt-0.5 mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
          {subVal}
        </p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-mono-num font-semibold" style={{ color: clr(dailyPnl) }}>
            {dailyPnl >= 0 ? "▲" : "▼"} {sgn(dailyPnl)}{fmtVal(Math.abs(dailyPnl), cur, rate, 0)}
          </span>
          <span className="text-[11px] font-mono-num font-bold px-2 py-0.5 rounded-full"
            style={dailyPnl >= 0
              ? { background: "rgba(0,229,160,0.15)", color: "var(--mint)" }
              : { background: "rgba(255,77,109,0.15)", color: "#ef4444" }}>
            {sgn(dailyPct)}{Math.abs(dailyPct).toFixed(2)}%
          </span>
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
            {locale === "ko" ? "오늘" : "Today"}
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          {[
            { label: locale === "ko" ? "투자원금"  : "Invested",     v: fmtVal(totalCost, cur, rate, 0), c: "var(--text)" },
            { label: locale === "ko" ? "총 수익률" : "Total Return",  v: `${sgn(pnlPct)}${pnlPct.toFixed(2)}%`, c: clr(pnlPct) },
            { label: locale === "ko" ? "평가손익"  : "P&L",          v: `${sgn(totalPnl)}${fmtVal(Math.abs(totalPnl), cur, rate, 0)}`, c: clr(totalPnl) },
            { label: locale === "ko" ? "보유종목"  : "Holdings",      v: `${holdings.length}`, c: "var(--text)" },
          ].map(({ label, v, c }) => (
            <div key={label}>
              <p className="text-[10px] mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
              <p className="text-sm font-bold font-mono-num tabular-nums" style={{ color: c }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Brokerage section ─────────────────────────────────────────────────────────

function BrokerageSection({ locale, onImport }: { locale: string; onImport: () => void }) {
  const [tab,       setTab]       = useState<"kr" | "us">("kr");
  const [collapsed, setCollapsed] = useState(true);
  const list = tab === "kr" ? BROKERAGES_KR : BROKERAGES_US;
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <button
        className="w-full flex items-center justify-between px-4 py-3 transition-opacity hover:opacity-80"
        onClick={() => setCollapsed((v) => !v)}
        style={collapsed ? {} : { borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" style={{ color: "var(--muted)" }} />
          <h3 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
            {locale === "ko" ? "증권사 계좌 연동" : "Brokerage Connection"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {collapsed && (
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>
              {locale === "ko" ? "펼치기" : "Expand"}
            </span>
          )}
          {collapsed
            ? <ChevronDown className="w-4 h-4" style={{ color: "var(--muted)" }} />
            : <ChevronUp   className="w-4 h-4" style={{ color: "var(--muted)" }} />}
        </div>
      </button>
      {!collapsed && <div className="p-4">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {list.map((b) => (
            <div key={b.name} className="rounded-xl py-3 px-1 flex flex-col items-center gap-1.5"
              style={{ background: "var(--bg)", opacity: 0.55 }}>
              <span className="text-xl leading-none">{b.emoji}</span>
              <p className="text-[9px] font-semibold text-center leading-tight" style={{ color: "var(--muted)" }}>{b.name}</p>
            </div>
          ))}
        </div>

        {/* Screenshot import CTA */}
        <button
          onClick={onImport}
          className="w-full rounded-2xl p-4 flex items-center gap-4 text-left transition-opacity active:opacity-80 border mb-3"
          style={{ background: "linear-gradient(135deg, rgba(0,229,160,0.08) 0%, rgba(59,130,246,0.06) 100%)", borderColor: "rgba(0,229,160,0.2)" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,229,160,0.15)" }}>
            <Camera className="w-5 h-5" style={{ color: "var(--mint)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>
              {locale === "ko" ? "계좌 스크린샷으로 한 번에 가져오기" : "Import from Account Screenshot"}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
              {locale === "ko"
                ? "AI가 종목·수량·평단가를 자동으로 인식해요"
                : "AI reads your holdings automatically"}
            </p>
          </div>
          <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: "var(--mint)" }} />
        </button>

        <div className="rounded-xl p-3.5 text-center"
          style={{ background: "rgba(0,229,160,0.03)", border: "1px solid rgba(0,229,160,0.08)" }}>
          <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
            {locale === "ko"
              ? "증권사 API 자동 연동은 파트너십 체결 후 제공 예정"
              : "Full API auto-sync coming after brokerage partnerships"}
          </p>
        </div>
      </div>}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const router                          = useRouter();
  const { holdings, setHoldings, cur, setCur, loaded, isLoggedIn } = usePortfolio();
  const [liveMap, setLiveMap]       = useState<Record<string, LiveQ>>({});
  const [usdkrw, setUsdkrw]        = useState(1350);
  const [showAdd, setShowAdd]       = useState(false);
  const [showImport, setShowImport] = useState(false);
  const locale                      = useLocaleCode();

  const fetchLive = useCallback((syms: string[]) => {
    if (syms.length === 0) return;
    try {
      const raw = localStorage.getItem("market-data-cache");
      if (!raw) return;
      const md = JSON.parse(raw) as {
        quotes?:  { symbol: string; price: number; changePercent: number }[];
        indices?: { symbol: string; value: number }[];
      };
      const cacheMap = new Map((md.quotes ?? []).map((q) => [q.symbol, q]));
      const map: Record<string, LiveQ> = {};
      syms.forEach((s) => {
        const q = cacheMap.get(s);
        if (q && q.price > 0) map[s] = { symbol: s, shortName: s, price: q.price, changePercent: q.changePercent };
      });
      if (Object.keys(map).length > 0) setLiveMap(map);
      const krw = (md.indices ?? []).find((i) => i.symbol === "USDKRW");
      if (krw?.value && krw.value > 100) setUsdkrw(krw.value);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!loaded || holdings.length === 0) return;
    const syms = holdings.map((h) => h.symbol);
    fetchLive(syms);
    const onStorage = (e: StorageEvent) => { if (e.key === "market-data-cache") fetchLive(syms); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, holdings]);

  const addHolding    = (h: Holding) => setHoldings((p: Holding[]) => [...p.filter((x) => x.symbol !== h.symbol), h]);
  const deleteHolding = (sym: string) => setHoldings((p: Holding[]) => p.filter((x) => x.symbol !== sym));
  const importHoldings = (items: { symbol: string; shares: number; avgCost: number }[]) => {
    setHoldings((p: Holding[]) => {
      const merged = [...p];
      items.forEach((item) => {
        const idx = merged.findIndex((x) => x.symbol === item.symbol);
        if (idx >= 0) merged[idx] = item; else merged.push(item);
      });
      return merged;
    });
  };

  const totalVal = holdings.reduce((s, h) => s + h.shares * (liveMap[h.symbol]?.price ?? h.avgCost), 0);

  // Not logged in — show login prompt
  if (loaded && !isLoggedIn) {
    return (
      <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[65vh] gap-6 px-8 text-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <Lock className="w-10 h-10 opacity-25" style={{ color: "var(--muted)" }} />
          </div>
          <div>
            <p className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>
              {locale === "ko" ? "로그인이 필요합니다" : "Login required"}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {locale === "ko"
                ? "포트폴리오는 로그인 후 모든 기기에서\n실시간으로 동기화됩니다"
                : "Sign in to sync your portfolio\nacross all your devices"}
            </p>
          </div>
          <button
            onClick={() => router.push("/more")}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold"
            style={{ background: "var(--mint)", color: "#000" }}>
            <LogIn className="w-4 h-4" />
            {locale === "ko" ? "로그인 하기" : "Sign in"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] lg:max-w-none lg:grid lg:grid-cols-[1fr_340px] lg:gap-8 mx-auto px-4 lg:px-8 pt-5">

        {/* ── Left ── */}
        <div>
          {/* Title + controls */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>
                {locale === "ko" ? "내 포트폴리오 💼" : "My Portfolio 💼"}
              </h1>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                {locale === "ko"
                  ? `실시간 · 1달러 = ${usdkrw.toLocaleString()}원`
                  : `Live · $1 = ₩${usdkrw.toLocaleString()}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CurrencyToggle cur={cur} onChange={setCur} />
              {holdings.length > 0 && (
                <button onClick={() => setShowImport(true)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border"
                  style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}>
                  <Camera className="w-3.5 h-3.5" />
                </button>
              )}
              <button onClick={() => setShowAdd(true)}
                className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-full"
                style={{ background: "var(--mint)", color: "#000" }}>
                <Plus className="w-3 h-3" strokeWidth={2.5} />
                {locale === "ko" ? "추가" : "Add"}
              </button>
            </div>
          </div>

          {/* Summary */}
          {loaded && holdings.length > 0 && (
            <SummaryCard
              holdings={holdings} liveMap={liveMap}
              cur={cur} rate={usdkrw}
              onRefresh={() => fetchLive(holdings.map((h) => h.symbol))}
              locale={locale}
            />
          )}

          {/* 모바일 전용: AI 비서 (전체 요약과 보유종목 사이) */}
          {loaded && holdings.length > 0 && (
            <div className="lg:hidden mb-5">
              <PortfolioAI holdings={holdings} liveMap={liveMap} usdkrw={usdkrw} />
            </div>
          )}

          {/* Holdings header */}
          {loaded && holdings.length > 0 && (
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
                {locale === "ko" ? `보유종목 (${holdings.length})` : `Holdings (${holdings.length})`}
              </h2>
              <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                {locale === "ko" ? "탭하면 차트·뉴스" : "Tap for chart & news"}
              </span>
            </div>
          )}

          {/* Ad — above holdings */}
          <div className="mb-1">
            <AdFitStrip />
          </div>
          <div className="mb-4">
            <AdFitBanner />
          </div>

          {/* Holdings or empty state */}
          {loaded && holdings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <Wallet className="w-8 h-8 opacity-25" style={{ color: "var(--muted)" }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold mb-1.5" style={{ color: "var(--text)" }}>
                  {locale === "ko" ? "보유 종목이 없습니다" : "No holdings yet"}
                </p>
                <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
                  {locale === "ko"
                    ? "+ 추가 버튼으로 종목을 등록하면\n실시간 수익률을 바로 확인할 수 있어요"
                    : "Tap + Add to track your stocks\nand see real-time returns instantly"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowImport(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border"
                  style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}>
                  <Camera className="w-4 h-4" />
                  {locale === "ko" ? "스크린샷으로 가져오기" : "Import from screenshot"}
                </button>
                <button onClick={() => setShowAdd(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold"
                  style={{ background: "var(--mint)", color: "#000" }}>
                  <Plus className="w-4 h-4" strokeWidth={2.5} />
                  {locale === "ko" ? "직접 추가" : "Add manually"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {[...holdings]
                .sort((a, b) => {
                  const valA = (liveMap[a.symbol]?.price ?? a.avgCost) * a.shares;
                  const valB = (liveMap[b.symbol]?.price ?? b.avgCost) * b.shares;
                  return valB - valA;
                })
                .map((h, i) => (
                <>
                  <HoldingCard
                    key={h.symbol}
                    holding={h}
                    live={liveMap[h.symbol]}
                    weight={totalVal > 0 ? ((liveMap[h.symbol]?.price ?? h.avgCost) * h.shares / totalVal) * 100 : 0}
                    cur={cur}
                    rate={usdkrw}
                    onDelete={() => deleteHolding(h.symbol)}
                  />
                  {/* Ad after every 3rd holding */}
                  {(i + 1) % 3 === 0 && i < holdings.length - 1 && (
                    <AdFitBanner key={`ad-${i}`} />
                  )}
                </>
              ))}
              <button onClick={() => setShowAdd(true)}
                className="w-full py-3.5 rounded-2xl border text-sm font-semibold flex items-center justify-center gap-2 transition-opacity active:opacity-60"
                style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--muted)" }}>
                <Plus className="w-4 h-4" />
                {locale === "ko" ? "종목 추가" : "Add stock"}
              </button>
            </div>
          )}
        </div>

        {/* ── Right (desktop) / Below (mobile) ── */}
        {/* 데스크탑: 증권사(1위) → AI(2위) / 모바일: AI(1위) → 증권사(2위) */}
        <div className={`flex flex-col ${holdings.length > 0 ? "mt-6 lg:mt-0" : "mt-0"}`}>
          {/* 증권사 계좌 연동 — 데스크탑 1위, 모바일 2위 */}
          <div className="order-2 lg:order-1 mb-5">
            <BrokerageSection locale={locale} onImport={() => setShowImport(true)} />
          </div>
          {/* AI 포트폴리오 비서 — 데스크탑만 표시 (모바일은 왼쪽 컬럼에 삽입) */}
          {loaded && holdings.length > 0 && (
            <div className="hidden lg:block order-2 mb-5">
              <PortfolioAI
                holdings={holdings}
                liveMap={liveMap}
                usdkrw={usdkrw}
              />
            </div>
          )}
          {/* Ad */}
          <div className="order-3 mb-3">
            <AdFitBanner />
          </div>
          {/* Ad bottom */}
          <div className="order-4 mb-5">
            <AdFitBanner />
          </div>
        </div>
      </main>

      {showAdd    && <AddSheet             onClose={() => setShowAdd(false)}    onAdd={addHolding}         existing={holdings.map((h) => h.symbol)} />}
      {showImport && <ScreenshotImportSheet onClose={() => setShowImport(false)} onImport={importHoldings} existing={holdings.map((h) => h.symbol)} />}
    </div>
  );
}
