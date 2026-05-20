"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Token entered at runtime — not bundled

type Application = {
  id: string;
  name: string;
  phone: string;
  level: string;
  amount: string | null;
  message: string | null;
  created_at: string;
};

function fmt(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
}

export default function ApplicationsPage() {
  const [authed, setAuthed]   = useState(false);
  const [pw, setPw]           = useState("");
  const [pwError, setPwError] = useState(false);

  const [rows, setRows]       = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const login = async () => {
    // Validate token against the API — never check it client-side
    const res = await fetch("/api/admin/verifications", {
      headers: { Authorization: `Bearer ${pw}` },
    });
    if (res.ok) { setAuthed(true); setPwError(false); }
    else { setPwError(true); }
  };

  useEffect(() => {
    if (!authed) return;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) { setError("Supabase 환경변수 없음"); setLoading(false); return; }

    setLoading(true);
    const supabase = createClient(url, key);
    supabase
      .from("edu_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error: e }) => {
        if (e) setError(e.message);
        else   setRows(data ?? []);
        setLoading(false);
      });
  }, [authed]);

  if (!authed) {
    return (
      <div style={{ background: "#0a0c10", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#111318", border: "1px solid #1e2028", borderRadius: 20, padding: "32px 28px", width: 300 }}>
          <p style={{ color: "#e8eaed", fontWeight: 700, fontSize: 16, marginBottom: 20 }}>관리자 로그인</p>
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            style={{ width: "100%", background: "#1e2028", border: "1px solid #2a2d38", borderRadius: 10, padding: "10px 14px", color: "#e8eaed", fontSize: 14, outline: "none", boxSizing: "border-box" }}
          />
          {pwError && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 6 }}>비밀번호가 틀렸습니다.</p>}
          <button
            onClick={login}
            style={{ marginTop: 14, width: "100%", background: "#10b981", color: "#000", border: "none", borderRadius: 10, padding: "11px 0", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#0a0c10", minHeight: "100vh", padding: "24px 16px", color: "#e8eaed" }}>
      <h1 style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>수강 신청 목록</h1>
      <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 20 }}>총 {rows.length}건</p>

      {loading && <p style={{ color: "#6b7280" }}>불러오는 중…</p>}
      {error   && <p style={{ color: "#ef4444" }}>오류: {error}</p>}
      {!loading && !error && rows.length === 0 && (
        <p style={{ color: "#6b7280" }}>신청 내역이 없습니다.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {rows.map((r, i) => (
          <div key={r.id} style={{ background: "#111318", border: "1px solid #1e2028", borderRadius: 16, padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>{rows.length - i}. {r.name}</span>
              <span style={{ fontSize: 11, color: "#6b7280" }}>{fmt(r.created_at)}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px" }}>
              {[
                ["연락처",   r.phone],
                ["투자 경력", r.level],
                ["투자 규모", r.amount ?? "—"],
              ].map(([k, v]) => (
                <div key={k} style={{ fontSize: 13 }}>
                  <span style={{ color: "#6b7280" }}>{k}: </span>
                  <span style={{ color: "#e8eaed" }}>{v}</span>
                </div>
              ))}
            </div>
            {r.message && (
              <p style={{ marginTop: 8, fontSize: 13, color: "#a78bfa", borderTop: "1px solid #1e2028", paddingTop: 8 }}>
                💬 {r.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
