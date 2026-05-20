"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getSupabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export type AuthUser = {
  id:         string;
  email:      string;
  nickname:   string;
  isVerified: boolean;
  isPro:      boolean;
  avatar?:    string;
};

type AuthCtx = {
  user:           AuthUser | null;
  loaded:         boolean;
  login:          (email: string, pw: string) => Promise<boolean>;
  signup:         (email: string, pw: string) => Promise<{ ok: boolean; msg: string }>;
  logout:         () => Promise<void>;
  verify:         () => void;
  updateProfile:  (u: { nickname?: string; avatar?: string }) => Promise<void>;
  resetPassword:  (email: string) => Promise<{ ok: boolean; msg: string }>;
  loginWithOAuth: (provider: "google" | "kakao") => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

function avatarKey(id: string) { return `uss_avatar_${id}`; }

function buildUser(u: User, isVerified = false): AuthUser {
  const avatar =
    typeof window !== "undefined"
      ? (localStorage.getItem(avatarKey(u.id)) ?? undefined)
      : undefined;
  return {
    id:         u.id,
    email:      u.email ?? "",
    nickname:   String(
      u.user_metadata?.nickname ??
      `투자자_${(u.email ?? "user").split("@")[0].slice(-4)}`
    ),
    isVerified,
    isPro:      u.user_metadata?.investus_pro === true,
    avatar,
  };
}

async function fetchVerified(email: string, token?: string): Promise<boolean> {
  try {
    const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`/api/admin/verifications?phone=${encodeURIComponent(email)}`, { headers });
    if (!res.ok) return false;
    const data = await res.json();
    return data?.status === "approved";
  } catch { return false; }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user,   setUser]   = useState<AuthUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const verified = await fetchVerified(session.user.email ?? "", session.access_token);
        setUser(buildUser(session.user, verified));
      }
      setLoaded(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const verified = await fetchVerified(session.user.email ?? "", session.access_token);
        setUser(buildUser(session.user, verified));
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      } else if (event === "USER_UPDATED" && session?.user) {
        setUser((prev) => prev ? buildUser(session.user!, prev.isVerified) : null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, pw: string): Promise<boolean> => {
    const { error } = await getSupabase().auth.signInWithPassword({ email, password: pw });
    return !error;
  };

  const signup = async (email: string, pw: string): Promise<{ ok: boolean; msg: string }> => {
    const nickname = `투자자_${email.split("@")[0].slice(-4)}`;
    const { data, error } = await getSupabase().auth.signUp({
      email,
      password: pw,
      options: {
        data: { nickname },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("already registered") || msg.includes("already")) {
        return { ok: false, msg: "이미 가입된 이메일입니다." };
      }
      return { ok: false, msg: error.message };
    }
    if (!data.session) return { ok: true, msg: "confirm_email" };
    return { ok: true, msg: "" };
  };

  const logout = async () => { await getSupabase().auth.signOut(); };

  const updateProfile = async (updates: { nickname?: string; avatar?: string }) => {
    if (!user) return;
    if (updates.avatar !== undefined) {
      try { localStorage.setItem(avatarKey(user.id), updates.avatar); } catch {}
    }
    if (updates.nickname !== undefined) {
      await getSupabase().auth.updateUser({ data: { nickname: updates.nickname } });
    }
    setUser((u) => u ? { ...u, ...updates } : null);
  };

  const verify = () => setUser((u) => u ? { ...u, isVerified: true } : null);

  const resetPassword = async (email: string): Promise<{ ok: boolean; msg: string }> => {
    const { error } = await getSupabase().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    });
    if (error) return { ok: false, msg: error.message };
    return { ok: true, msg: "" };
  };

  const loginWithOAuth = async (provider: "google" | "kakao") => {
    await getSupabase().auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <Ctx.Provider value={{ user, loaded, login, signup, logout, verify, updateProfile, resetPassword, loginWithOAuth }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuthCtx(): AuthCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuthCtx must be used inside <AuthProvider>");
  return ctx;
}
