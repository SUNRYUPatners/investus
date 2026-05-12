"use client";

import { useLocalStorage } from "./useLocalStorage";

export type AuthUser = {
  phone:      string;
  nickname:   string;
  isVerified: boolean;
  avatar?:    string; // emoji char OR "data:image/..." base64
};

type StoredUser = { phone: string; pw: string; nickname: string; avatar?: string };

function avatarKey(phone: string) { return `uss_avatar_${phone}`; }

export function useAuth() {
  const [user, setUser] = useLocalStorage<AuthUser | null>("uss_auth", null);

  const login = (phone: string, pw: string): boolean => {
    try {
      const users: StoredUser[] = JSON.parse(localStorage.getItem("uss_users") ?? "[]");
      const found = users.find((u) => u.phone === phone && u.pw === pw);
      if (!found) return false;
      const avatar = localStorage.getItem(avatarKey(phone)) ?? undefined;
      setUser({ phone: found.phone, nickname: found.nickname, isVerified: false, avatar });
      return true;
    } catch { return false; }
  };

  const signup = (phone: string, pw: string): { ok: boolean; msg: string } => {
    try {
      const users: StoredUser[] = JSON.parse(localStorage.getItem("uss_users") ?? "[]");
      if (users.find((u) => u.phone === phone)) return { ok: false, msg: "이미 가입된 번호입니다" };
      const nickname = `투자자_${phone.slice(-4)}`;
      users.push({ phone, pw, nickname });
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

  return { user, login, signup, logout, verify, updateProfile };
}
