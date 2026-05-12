"use client";

import { useLocalStorage } from "./useLocalStorage";

export type AuthUser = {
  phone: string;
  nickname: string;
  isVerified: boolean;
};

type StoredUser = { phone: string; pw: string; nickname: string };

export function useAuth() {
  const [user, setUser] = useLocalStorage<AuthUser | null>("uss_auth", null);

  const login = (phone: string, pw: string): boolean => {
    try {
      const users: StoredUser[] = JSON.parse(localStorage.getItem("uss_users") ?? "[]");
      const found = users.find((u) => u.phone === phone && u.pw === pw);
      if (!found) return false;
      setUser({ phone: found.phone, nickname: found.nickname, isVerified: false });
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

  const logout  = () => setUser(null);
  const verify  = () => setUser((u) => u ? { ...u, isVerified: true } : null);

  return { user, login, signup, logout, verify };
}
