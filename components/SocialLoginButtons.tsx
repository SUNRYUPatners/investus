"use client";

import { useAuth } from "@/hooks/useAuth";

export function SocialLoginButtons({ compact = false }: { compact?: boolean }) {
  const { loginWithOAuth, loginWithNaver } = useAuth();
  const btn = compact ? "py-2 text-[12px]" : "py-2.5 text-sm";

  return (
    <div>
      <button
        type="button"
        onClick={() => loginWithOAuth("google")}
        className={`w-full flex items-center justify-center gap-2 ${btn} rounded-xl border mb-2 font-medium active:opacity-70 transition-opacity`}
        style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Google로 계속하기
      </button>
      <button
        type="button"
        onClick={() => loginWithOAuth("kakao")}
        className={`w-full flex items-center justify-center gap-2 ${btn} rounded-xl font-medium active:opacity-70 transition-opacity mb-2`}
        style={{ background: "#FEE500", color: "#3C1E1E" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#3C1E1E" d="M12 3C6.48 3 2 6.72 2 11.28c0 2.9 1.74 5.45 4.36 6.97l-.9 3.35 3.94-2.6c.83.15 1.68.23 2.6.23 5.52 0 10-3.72 10-8.28C22 6.72 17.52 3 12 3z"/>
        </svg>
        카카오로 계속하기
      </button>
      <button
        type="button"
        onClick={loginWithNaver}
        className={`w-full flex items-center justify-center gap-2 ${btn} rounded-xl font-medium active:opacity-70 transition-opacity`}
        style={{ background: "#03C75A", color: "#fff" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#fff" d="M16.27 4H7.73C5.22 4 3.2 6.02 3.2 8.53v6.94C3.2 17.98 5.22 20 7.73 20h8.54c2.51 0 4.53-2.02 4.53-4.53V8.53C20.8 6.02 18.78 4 16.27 4zm-1.1 11.38h-1.9l-2.2-3.42v3.42H9.17V8.62h1.9l2.2 3.42V8.62h1.9v6.76z"/>
        </svg>
        네이버로 계속하기
      </button>
    </div>
  );
}
