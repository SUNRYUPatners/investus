"use client";

import { useRef, useState } from "react";
import { X, Camera, Check, AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getSupabase } from "@/lib/supabase";

const EMOJI_PRESETS = [
  "🦁","🐯","🦊","🐻","🐼","🐨",
  "🦅","🦋","🌟","💫","🔥","⚡",
  "💎","🚀","🎯","🏆","💰","📈",
  "🌙","☀️","🎭","🎪","🌊","🏔️",
];

function resizeImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const size   = 200;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      // crop center square
      const s = Math.min(img.width, img.height);
      const sx = (img.width  - s) / 2;
      const sy = (img.height - s) / 2;
      ctx.drawImage(img, sx, sy, s, s, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function ProfileEditModal({ onClose }: { onClose: () => void }) {
  const { user, updateProfile, logout } = useAuth();
  const fileRef  = useRef<HTMLInputElement>(null);

  const [avatar,        setAvatar]        = useState(user?.avatar ?? "");
  const [nickname,      setNickname]      = useState(user?.nickname ?? "");
  const [tab,           setTab]           = useState<"emoji" | "photo">("emoji");
  const [saving,        setSaving]        = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting,      setDeleting]      = useState(false);
  const [deleteError,   setDeleteError]   = useState("");

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setDeleteError("");
    try {
      const { data: { session } } = await getSupabase().auth.getSession();
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (session?.access_token) headers["Authorization"] = `Bearer ${session.access_token}`;
      const r = await fetch("/api/auth/delete-account", { method: "DELETE", headers });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        setDeleteError((d as { error?: string }).error ?? "오류가 발생했습니다.");
        setDeleting(false);
        return;
      }
      // Clear localStorage data
      try {
        ["investus_holdings", "investus_my_creator", "investus_creator_contents"].forEach((k) => localStorage.removeItem(k));
      } catch { /* ignore */ }
      await logout();
      onClose();
    } catch {
      setDeleteError("네트워크 오류가 발생했습니다.");
      setDeleting(false);
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const b64 = await resizeImageToBase64(file);
      setAvatar(b64);
      setTab("photo");
    } catch { /* ignore */ }
    e.target.value = "";
  };

  const handleSave = async () => {
    if (!nickname.trim()) return;
    setSaving(true);
    await updateProfile({ nickname: nickname.trim(), avatar: avatar || undefined });
    setSaving(false);
    onClose();
  };

  const isPhoto = avatar.startsWith("data:");

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
        style={{ borderColor: "var(--border)" }}
      >
        <button onClick={onClose}>
          <X className="w-5 h-5" style={{ color: "var(--muted)" }} />
        </button>
        <h2 className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>
          프로필 수정
        </h2>
        <button
          onClick={handleSave}
          disabled={!nickname.trim() || saving}
          className="text-xs font-bold px-3 py-1.5 rounded-lg disabled:opacity-40 active:opacity-70 transition-opacity"
          style={{ background: "var(--mint)", color: "#000" }}
        >
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">

        {/* Avatar preview */}
        <div className="flex flex-col items-center pt-8 pb-6 px-4">
          <div className="relative">
            {isPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatar}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover"
                style={{ border: "3px solid var(--mint)" }}
              />
            ) : (
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                style={{
                  background: avatar
                    ? "rgba(0,229,160,0.12)"
                    : "linear-gradient(135deg,#10b981,#0d6efd)",
                  border: "3px solid rgba(0,229,160,0.3)",
                }}
              >
                {avatar || "👤"}
              </div>
            )}
            {/* Camera button */}
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-2 active:opacity-70"
              style={{ background: "var(--mint)", borderColor: "var(--bg)" }}
            >
              <Camera className="w-4 h-4 text-black" />
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="mt-3 text-xs active:opacity-70"
            style={{ color: "var(--mint)" }}
          >
            사진 업로드
          </button>
        </div>

        {/* Nickname */}
        <div className="px-4 mb-6">
          <label className="text-[10px] font-semibold mb-1.5 block" style={{ color: "var(--muted)" }}>
            이름 (닉네임)
          </label>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={20}
            placeholder="이름을 입력하세요"
            className="w-full rounded-xl px-3 py-2.5 text-sm outline-none border"
            style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
          />
          <p className="text-[10px] mt-1 text-right" style={{ color: "var(--muted)" }}>
            {nickname.length} / 20
          </p>
        </div>

        {/* Email (read-only) */}
        <div className="px-4 mb-6">
          <label className="text-[10px] font-semibold mb-1.5 block" style={{ color: "var(--muted)" }}>
            이메일 <span className="font-normal">(본인만 볼 수 있음)</span>
          </label>
          <div
            className="w-full rounded-xl px-3 py-2.5 text-sm border flex items-center gap-2"
            style={{ background: "rgba(255,255,255,0.03)", borderColor: "var(--border)" }}
          >
            <span className="truncate" style={{ color: "var(--muted)" }}>
              {user?.email ?? "—"}
            </span>
            <span
              className="ml-auto flex-shrink-0 text-[9px] px-1.5 py-0.5 rounded"
              style={{ background: "rgba(255,255,255,0.06)", color: "var(--muted)" }}
            >
              🔒 비공개
            </span>
          </div>
        </div>

        {/* Emoji picker */}
        <div className="px-4 mb-6">
          <label className="text-[10px] font-semibold mb-2 block" style={{ color: "var(--muted)" }}>
            아바타 이모지 선택
          </label>
          <div className="grid grid-cols-6 gap-2">
            {/* Clear option */}
            <button
              onClick={() => setAvatar("")}
              className="w-full aspect-square rounded-xl flex items-center justify-center border transition-all active:opacity-70"
              style={{
                background: avatar === "" && !isPhoto ? "rgba(0,229,160,0.12)" : "var(--card)",
                borderColor: avatar === "" && !isPhoto ? "var(--mint)" : "var(--border)",
              }}
            >
              <span className="text-[10px]" style={{ color: "var(--muted)" }}>없음</span>
            </button>
            {EMOJI_PRESETS.map((em) => {
              const active = avatar === em;
              return (
                <button
                  key={em}
                  onClick={() => setAvatar(em)}
                  className="w-full aspect-square rounded-xl flex items-center justify-center text-2xl border transition-all active:opacity-70 relative"
                  style={{
                    background:  active ? "rgba(0,229,160,0.12)" : "var(--card)",
                    borderColor: active ? "var(--mint)"           : "var(--border)",
                  }}
                >
                  {em}
                  {active && (
                    <span className="absolute top-0.5 right-0.5">
                      <Check className="w-2.5 h-2.5" style={{ color: "var(--mint)" }} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 회원 탈퇴 */}
        <div className="px-4 pb-10 border-t pt-5" style={{ borderColor: "var(--border)" }}>
          <p className="text-[10px] mb-2" style={{ color: "var(--muted)" }}>계정 관리</p>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold border active:opacity-70 transition-opacity"
            style={{ borderColor: "rgba(239,68,68,0.25)", color: "#ef4444", background: "rgba(239,68,68,0.05)" }}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            회원 탈퇴
          </button>
        </div>

      </div>

      {/* 탈퇴 확인 다이얼로그 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          style={{ background: "rgba(0,0,0,0.75)" }}
          onClick={() => !deleting && setShowDeleteConfirm(false)}>
          <div className="w-full max-w-[320px] rounded-3xl p-6"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl mx-auto mb-4"
              style={{ background: "rgba(239,68,68,0.12)" }}>
              <AlertTriangle className="w-6 h-6" style={{ color: "#ef4444" }} />
            </div>
            <h3 className="text-sm font-bold text-center mb-2" style={{ color: "var(--text)" }}>
              정말 탈퇴하시겠어요?
            </h3>
            <p className="text-[11px] text-center leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              탈퇴하면 계정, 포트폴리오, 게시글 등 모든 데이터가 영구 삭제되며 복구할 수 없습니다.
            </p>
            {deleteError && (
              <p className="text-[11px] text-center mb-3" style={{ color: "#ef4444" }}>{deleteError}</p>
            )}
            <button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="w-full py-3 rounded-2xl text-sm font-bold mb-2 active:opacity-80 transition-opacity disabled:opacity-50"
              style={{ background: "#ef4444", color: "#fff" }}
            >
              {deleting ? "탈퇴 처리 중..." : "탈퇴하기"}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              disabled={deleting}
              className="w-full py-2.5 text-xs rounded-2xl"
              style={{ color: "var(--muted)" }}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
