"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown, Plus, X, Pin } from "lucide-react";
import {
  SEED_REPORTS,
  CATEGORY_STYLE,
  CATEGORY_EMOJI,
  type Report,
  type ReportCategory,
  type ReportColor,
} from "@/lib/reports";

const LS_KEY    = "investus-reports";
const ADMIN_PWD = "investus2026";

// ── helpers ──────────────────────────────────────────────────────────────────

function loadUserReports(): Report[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Report[]) : [];
  } catch { return []; }
}

function saveUserReports(list: Report[]) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(list)); } catch { /* ignore */ }
}

// ── ReportCard ────────────────────────────────────────────────────────────────

function ReportCard({
  report,
  onDelete,
  isAdmin,
}: {
  report: Report;
  onDelete?: (id: string) => void;
  isAdmin: boolean;
}) {
  const [open, setOpen] = useState(false);
  const style = CATEGORY_STYLE[report.categoryColor];
  const emoji = CATEGORY_EMOJI[report.category];

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Summary row */}
      <div className="p-4">
        {/* Top: category + date + pin */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: style.bg, color: style.color }}
          >
            {emoji} {report.category}
          </span>
          {report.isPinned && (
            <Pin className="w-3 h-3" style={{ color: style.color }} />
          )}
          <span className="text-[10px] ml-auto" style={{ color: "var(--muted)" }}>
            {report.date}
          </span>
          {isAdmin && onDelete && (
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(report.id); }}
              className="ml-1 active:opacity-60"
            >
              <X className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
            </button>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-sm font-bold leading-snug mb-2"
          style={{ color: "var(--text)" }}
        >
          {report.title}
        </h3>

        {/* Summary */}
        <p
          className="text-[12px] leading-relaxed"
          style={{
            color: "var(--muted)",
            display: "-webkit-box",
            WebkitLineClamp: open ? undefined : 3,
            WebkitBoxOrient: "vertical" as const,
            overflow: open ? "visible" : "hidden",
          }}
        >
          {report.summary}
        </p>

        {/* More button */}
        <button
          className="flex items-center gap-0.5 text-[11px] font-semibold mt-2.5 active:opacity-60 transition-opacity"
          style={{ color: style.color }}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "접기" : "더보기"}
          <ChevronDown
            className="w-3.5 h-3.5 transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "none" }}
          />
        </button>
      </div>

      {/* Full body */}
      {open && (
        <div
          className="border-t px-4 py-4"
          style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.02)" }}
        >
          {report.body.split("\n").map((line, i) => {
            if (line.startsWith("■")) {
              return (
                <p key={i} className="text-xs font-bold mt-4 mb-1.5 first:mt-0" style={{ color: style.color }}>
                  {line}
                </p>
              );
            }
            if (line.startsWith("•") || line.match(/^[0-9]+\)/)) {
              return (
                <p key={i} className="text-[12px] leading-relaxed pl-3 mb-1" style={{ color: "var(--muted)" }}>
                  {line}
                </p>
              );
            }
            if (line.trim() === "") return <div key={i} className="h-1" />;
            return (
              <p key={i} className="text-[12px] leading-relaxed mb-1" style={{ color: "var(--text)" }}>
                {line}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── WriteModal ────────────────────────────────────────────────────────────────

const CATEGORIES: ReportCategory[] = ["시장분석", "종목분석", "매크로", "섹터", "특집"];
const COLORS: Record<ReportCategory, ReportColor> = {
  "시장분석": "mint",
  "종목분석": "blue",
  "매크로":   "purple",
  "섹터":     "orange",
  "특집":     "red",
};

function WriteModal({
  onSave,
  onClose,
}: {
  onSave: (r: Report) => void;
  onClose: () => void;
}) {
  const [title,    setTitle]    = useState("");
  const [summary,  setSummary]  = useState("");
  const [body,     setBody]     = useState("");
  const [category, setCategory] = useState<ReportCategory>("시장분석");
  const [pinned,   setPinned]   = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const today = new Date().toISOString().split("T")[0];

  const handleSave = () => {
    if (!title.trim() || !summary.trim()) return;
    onSave({
      id:            `user-${Date.now()}`,
      title:         title.trim(),
      summary:       summary.trim(),
      body:          body.trim(),
      category,
      categoryColor: COLORS[category],
      date:          today,
      isPinned:      pinned,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "var(--bg)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
        style={{ borderColor: "var(--border)" }}
      >
        <h2 className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>
          리포트 작성
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={!title.trim() || !summary.trim()}
            className="text-xs font-bold px-3 py-1.5 rounded-lg disabled:opacity-40 transition-opacity active:opacity-70"
            style={{ background: "var(--mint)", color: "#000" }}
          >
            발행
          </button>
          <button onClick={onClose}>
            <X className="w-5 h-5" style={{ color: "var(--muted)" }} />
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {/* Category picker */}
        <div>
          <label className="text-[10px] font-semibold mb-1.5 block" style={{ color: "var(--muted)" }}>카테고리</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const s = CATEGORY_STYLE[COLORS[c]];
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all"
                  style={{
                    background: active ? s.bg : "transparent",
                    color:      active ? s.color : "var(--muted)",
                    borderColor: active ? s.color : "var(--border)",
                  }}
                >
                  {CATEGORY_EMOJI[c]} {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-[10px] font-semibold mb-1.5 block" style={{ color: "var(--muted)" }}>제목 *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="리포트 제목"
            className="w-full rounded-xl px-3 py-2.5 text-sm outline-none border"
            style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
          />
        </div>

        {/* Summary */}
        <div>
          <label className="text-[10px] font-semibold mb-1.5 block" style={{ color: "var(--muted)" }}>요약 * <span className="font-normal">(카드에 표시되는 미리보기)</span></label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="2~3줄 요약문을 작성하세요"
            rows={3}
            className="w-full rounded-xl px-3 py-2.5 text-sm outline-none border resize-none leading-relaxed"
            style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
          />
        </div>

        {/* Body */}
        <div className="flex-1">
          <label className="text-[10px] font-semibold mb-1.5 block" style={{ color: "var(--muted)" }}>
            본문 <span className="font-normal">(■ 소제목, • 항목, 빈 줄로 단락 구분)</span>
          </label>
          <textarea
            ref={bodyRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={"■ 제목\n\n본문 내용을 작성하세요.\n\n• 항목 1\n• 항목 2"}
            rows={14}
            className="w-full rounded-xl px-3 py-2.5 text-sm outline-none border resize-none leading-relaxed font-mono"
            style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
          />
        </div>

        {/* Pin toggle */}
        <button
          onClick={() => setPinned((v) => !v)}
          className="flex items-center gap-2 text-xs active:opacity-70"
          style={{ color: pinned ? "var(--mint)" : "var(--muted)" }}
        >
          <Pin className="w-3.5 h-3.5" />
          {pinned ? "상단 고정됨" : "상단 고정"}
        </button>
      </div>
    </div>
  );
}

// ── PinModal (password) ──────────────────────────────────────────────────────

function PinModal({
  onSuccess,
  onClose,
}: {
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(false);

  const check = () => {
    if (pwd === ADMIN_PWD) { onSuccess(); }
    else { setErr(true); setPwd(""); }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center pb-safe"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[480px] rounded-t-3xl p-6"
        style={{ background: "var(--card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm font-bold mb-4 font-syne" style={{ color: "var(--text)" }}>
          관리자 인증
        </p>
        <input
          type="password"
          value={pwd}
          onChange={(e) => { setPwd(e.target.value); setErr(false); }}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="비밀번호"
          autoFocus
          className="w-full rounded-xl px-3 py-2.5 text-sm outline-none border mb-3"
          style={{
            background: "var(--bg)",
            borderColor: err ? "#ff4d6d" : "var(--border)",
            color: "var(--text)",
          }}
        />
        {err && <p className="text-xs mb-3" style={{ color: "#ff4d6d" }}>비밀번호가 올바르지 않습니다.</p>}
        <button
          onClick={check}
          className="w-full py-3 rounded-xl text-sm font-bold text-black active:opacity-80"
          style={{ background: "var(--mint)" }}
        >
          확인
        </button>
      </div>
    </div>
  );
}

// ── ReportFeed (main export) ──────────────────────────────────────────────────

export function ReportFeed() {
  const [userReports, setUserReports] = useState<Report[]>([]);
  const [isAdmin,     setIsAdmin]     = useState(false);
  const [showPin,     setShowPin]     = useState(false);
  const [showWrite,   setShowWrite]   = useState(false);

  useEffect(() => { setUserReports(loadUserReports()); }, []);

  const all = [
    ...userReports.filter((r) => r.isPinned),
    ...SEED_REPORTS.filter((r) => r.isPinned),
    ...SEED_REPORTS.filter((r) => !r.isPinned),
    ...userReports.filter((r) => !r.isPinned),
  ];

  const handleSave = (r: Report) => {
    const updated = [r, ...userReports];
    setUserReports(updated);
    saveUserReports(updated);
  };

  const handleDelete = (id: string) => {
    const updated = userReports.filter((r) => r.id !== id);
    setUserReports(updated);
    saveUserReports(updated);
  };

  return (
    <>
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2
            className="text-xs font-semibold tracking-widest uppercase font-syne"
            style={{ color: "var(--muted)" }}
          >
            Investus 리포트
          </h2>
          <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
            시장 분석 · 종목 인사이트
          </p>
        </div>
        <button
          onClick={() => isAdmin ? setShowWrite(true) : setShowPin(true)}
          className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-xl border active:opacity-70 transition-opacity"
          style={{ borderColor: "var(--border)", color: isAdmin ? "var(--mint)" : "var(--muted)" }}
        >
          <Plus className="w-3.5 h-3.5" />
          {isAdmin ? "작성" : "관리"}
        </button>
      </div>

      {/* Report cards */}
      <div className="flex flex-col gap-3">
        {all.map((r) => (
          <ReportCard
            key={r.id}
            report={r}
            isAdmin={isAdmin && r.id.startsWith("user-")}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Modals */}
      {showPin  && <PinModal onSuccess={() => { setIsAdmin(true); setShowPin(false); setShowWrite(true); }} onClose={() => setShowPin(false)} />}
      {showWrite && <WriteModal onSave={handleSave} onClose={() => setShowWrite(false)} />}
    </>
  );
}
