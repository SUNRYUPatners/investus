"use client";

import { useLocalStorage } from "./useLocalStorage";

export type AuthUser = {
  phone:      string;
  nickname:   string;
  isVerified: boolean;
  avatar?:    string; // emoji char OR "data:image/..." base64
};

type StoredUser = { phone: string; pwHash: string; nickname: string; avatar?: string };

async function hashPw(pw: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function avatarKey(phone: string) { return `uss_avatar_${phone}`; }

export function useAuth() {
  const [user, setUser, loaded] = useLocalStorage<AuthUser | null>("uss_auth", null);

  const login = async (phone: string, pw: string): Promise<boolean> => {
    try {
      const users: StoredUser[] = JSON.parse(localStorage.getItem("uss_users") ?? "[]");
      const pwHash = await hashPw(pw);
      // 구형 plain-text pw 레코드와 호환: pwHash가 없으면 pw 필드로 비교 후 마이그레이션
      const found = users.find((u) => {
        if (u.phone !== phone) return false;
        if (u.pwHash) return u.pwHash === pwHash;
        // legacy: plain pw → migrate in-place
        if ((u as Record<string, unknown>)["pw"] === pw) {
          u.pwHash = pwHash;
          delete (u as Record<string, unknown>)["pw"];
          localStorage.setItem("uss_users", JSON.stringify(users));
          return true;
        }
        return false;
      });
      if (!found) return false;
      const avatar = localStorage.getItem(avatarKey(phone)) ?? undefined;
      setUser({ phone: found.phone, nickname: found.nickname, isVerified: false, avatar });
      return true;
    } catch { return false; }
  };

  const signup = async (phone: string, pw: string): Promise<{ ok: boolean; msg: string }> => {
    try {
      const users: StoredUser[] = JSON.parse(localStorage.getItem("uss_users") ?? "[]");
      if (users.find((u) => u.phone === phone)) return { ok: false, msg: "이미 가입된 번호입니다" };
      const nickname = `투자자_${phone.slice(-4)}`;
      const pwHash = await hashPw(pw);
      users.push({ phone, pwHash, nickname });
      localStorage.setItem("uss_users", JSON.stringify(users));
      setUser({ phone, nickname, isVerified: false });
      return { ok: true, msg: "" };
    } catch { return { ok: false, msg: "오류가 발생했습니다" }; }
  };

  const updateProfile = (updates: { nickname?: string; avatar?: string }) => {
    if (!user) return;
    // Persist avatar separately (may be large base64)
    if (updates.avatar !== undefined) {
      try { localStorage.setItem(avatarKey(user.phone), updates.avatar); } catch { /* ignore */ }
    }
    // Update users store nickname
    if (updates.nickname !== undefined) {
      try {
        const users: StoredUser[] = JSON.parse(localStorage.getItem("uss_users") ?? "[]");
        const idx = users.findIndex((u) => u.phone === user.phone);
        if (idx !== -1) { users[idx].nickname = updates.nickname!; localStorage.setItem("uss_users", JSON.stringify(users)); }
      } catch { /* ignore */ }
    }
    setUser((u) => u ? { ...u, ...updates } : null);
  };

  const logout  = () => setUser(null);
  const verify  = () => setUser((u) => u ? { ...u, isVerified: true } : null);

  return { user, loaded, login, signup, logout, verify, updateProfile };
}
