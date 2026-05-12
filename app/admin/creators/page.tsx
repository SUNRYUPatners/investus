"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, XCircle, Clock, RefreshCw, Shield } from "lucide-react";

type Verification = {
  phone: string;
  nickname: string;
  avatar: string;
  bio: string;
  status: "pending" | "approved" | "rejected";
  submitted_at: string;
  reviewed_at?: string;
};

const STATUS_LABEL = { pending: "검토 대기", approved: "승인됨", rejected: "거절됨" };
const STATUS_COLOR = { pending: "#f59e0b", approved: "#00e5a0", rejected: "#ff4d6d" };

function fmtDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

export default function AdminCreatorsPage() {
  const [authed, setAuthed]   = useState(false);
  const [pw, setPw]           = useState("");
  const [pwError, setPwError] = useState(false);

  const [list, setList]       = useState<Verification[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter]   = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [acting, setActing]   = useState<string | null>(null);

  // Manual approve by phone
  const [manualPhone, setManualPhone]   = useState("");
  const [manualResult, setManualResult] = useState<string | null>(null);

  const TOKEN = "investus2026";

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/verifications?token=${TOKEN}`);
      const data = await res.json();
      setList(Array.isArray(data) ? data : []);
    } catch {
      setList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  const handleLogin = () => {
    if (pw === TOKEN) { setAuthed(true); setPwError(false); }
    else { setPwError(true); setPw(""); }
  };

  const act = async (phone: string, action: "approve" | "reject") => {
    setActing(phone);
    try {
      await fetch(`/api/admin/verifications?token=${TOKEN}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, action }),
      });
      await load();
    } finally {
      setActing(null);
    }
  };

  const handleManual = async () => {
    const phone = manualPhone.trim().replace(/-/g, "");
    if (!phone) return;
    setActing("manual");
    try {
      await fetch(`/api/admin/verifications?token=${TOKEN}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, action: "approve" }),
      });
      setManualResult(`✓ ${phone} 승인 완료`);
      setManualPhone("");
      await load();
    } catch {
      setManualResult("오류가 발생했습니다");
    } finally {
      setActing(null);
    }
  };

  const counts = {
    pending:  list.filter((v) => v.status === "pending").length,
    approved: list.filter((v) => v.status === "approved").length,
    rejected: list.filter((v) => v.status === "rejected").length,
  };
  const filtered = filter === "all" ? list : list.filter((v) => v.status === filter);

  /* ── Login screen ── */
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--bg)" }}>
        <div className="w-full max-w-xs">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Shield className="w-6 h-6" style={{ color: "var(--mint)" }} />
            <span className="text-lg font-bold font-syne" style={{ color: "var(--text)" }}>관리자</span>
          </div>

          <div className="rounded-2xl border p-6 flex flex-col gap-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="text-sm font-semibold text-center" style={{ color: "var(--text)" }}>
              크리에이터 인증 관리
            </p>

            <input
              type="password"
              placeholder="관리자 비밀번호"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                background: "var(--bg)",
                border: `1px solid ${pwError ? "#ff4d6d" : "var(--border)"}`,
                color: "var(--text)",
              }}
            />

            {pwError && (
              <p className="text-xs text-center" style={{ color: "#ff4d6d" }}>
                비밀번호가 틀렸습니다
              </p>
            )}

            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl text-sm font-bold"
              style={{ background: "var(--mint)", color: "#000" }}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Admin dashboard ── */
  return (
    <div className="min-h-screen pb-10" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b"
        style={{ background: "var(--bg)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" style={{ color: "var(--mint)" }} />
          <span className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>
            크리에이터 인증 관리
          </span>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="p-1.5 rounded-lg disabled:opacity-40"
          style={{ background: "rgba(0,229,160,0.08)" }}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} style={{ color: "var(--mint)" }} />
        </button>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 flex flex-col gap-4">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {(["pending", "approved", "rejected"] as const).map((s) => (
            <div key={s} className="rounded-2xl border p-3 text-center"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-2xl font-bold font-mono-num" style={{ color: STATUS_COLOR[s] }}>
                {counts[s]}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>{STATUS_LABEL[s]}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--card)" }}>
          {(["pending", "all", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
              style={
                filter === f
                  ? { background: "var(--mint)", color: "#000" }
                  : { color: "var(--muted)" }
              }
            >
              {f === "all" ? "전체" : STATUS_LABEL[f]}
            </button>
          ))}
        </div>

        {/* Manual approve */}
        <div className="rounded-2xl border p-4 flex flex-col gap-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>이메일로 받은 번호 직접 승인</p>
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={manualPhone}
              onChange={(e) => { setManualPhone(e.target.value); setManualResult(null); }}
              onKeyDown={(e) => e.key === "Enter" && handleManual()}
              className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
              style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}
            />
            <button
              onClick={handleManual}
              disabled={acting === "manual" || !manualPhone.trim()}
              className="px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-40"
              style={{ background: "var(--mint)", color: "#000" }}
            >
              승인
            </button>
          </div>
          {manualResult && (
            <p className="text-xs" style={{ color: manualResult.startsWith("✓") ? "var(--mint)" : "#ff4d6d" }}>
              {manualResult}
            </p>
          )}
        </div>

        {/* Verification list */}
        {loading && list.length === 0 ? (
          <div className="flex flex-col gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border h-24 animate-pulse" style={{ background: "var(--card)", borderColor: "var(--border)" }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {filter === "pending" ? "대기 중인 신청이 없습니다" : "항목이 없습니다"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((v) => (
              <div
                key={v.phone}
                className="rounded-2xl border p-4"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                {/* Row 1: avatar + name + status */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{v.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: "var(--text)" }}>{v.nickname}</p>
                    <p className="text-[11px] font-mono-num" style={{ color: "var(--muted)" }}>{v.phone}</p>
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: `${STATUS_COLOR[v.status]}18`, color: STATUS_COLOR[v.status] }}
                  >
                    {v.status === "pending" && <Clock className="w-3 h-3 inline mr-0.5 -mt-0.5" />}
                    {v.status === "approved" && <CheckCircle2 className="w-3 h-3 inline mr-0.5 -mt-0.5" />}
                    {v.status === "rejected" && <XCircle className="w-3 h-3 inline mr-0.5 -mt-0.5" />}
                    {STATUS_LABEL[v.status]}
                  </span>
                </div>

                {/* Bio */}
                {v.bio && (
                  <p className="text-[11px] mb-3 px-1 leading-relaxed" style={{ color: "var(--muted)" }}>
                    {v.bio}
                  </p>
                )}

                {/* Date */}
                <p className="text-[10px] mb-3" style={{ color: "var(--muted)" }}>
                  신청: {fmtDate(v.submitted_at)}
                  {v.reviewed_at && ` · 검토: ${fmtDate(v.reviewed_at)}`}
                </p>

                {/* Actions — only for pending */}
                {v.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => act(v.phone, "approve")}
                      disabled={acting === v.phone}
                      className="flex-1 py-2 rounded-xl text-xs font-bold disabled:opacity-40 flex items-center justify-center gap-1"
                      style={{ background: "rgba(0,229,160,0.12)", color: "var(--mint)" }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {acting === v.phone ? "처리 중..." : "승인"}
                    </button>
                    <button
                      onClick={() => act(v.phone, "reject")}
                      disabled={acting === v.phone}
                      className="flex-1 py-2 rounded-xl text-xs font-bold disabled:opacity-40 flex items-center justify-center gap-1"
                      style={{ background: "rgba(255,77,109,0.12)", color: "#ff4d6d" }}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      거절
                    </button>
                  </div>
                )}

                {/* Re-open if already processed */}
                {v.status !== "pending" && (
                  <button
                    onClick={() => act(v.phone, v.status === "approved" ? "reject" : "approve")}
                    disabled={acting === v.phone}
                    className="w-full py-1.5 rounded-xl text-[11px] disabled:opacity-40"
                    style={{ background: "var(--bg)", color: "var(--muted)" }}
                  >
                    {v.status === "approved" ? "승인 취소" : "재승인"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
