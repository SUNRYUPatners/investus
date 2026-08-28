"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import type { EmailOtpType } from "@supabase/supabase-js";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabase();
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      router.replace("/more");
    };

    const params = new URLSearchParams(window.location.search);
    const tokenHash = params.get("token_hash");
    const type = params.get("type") as EmailOtpType | null;

    let subscription: { unsubscribe: () => void } | null = null;
    const fallback = setTimeout(finish, 5000);

    (async () => {
      // Naver 등 커스텀 OAuth → magic link token_hash
      if (tokenHash && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
        if (!error) {
          finish();
          return;
        }
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        finish();
        return;
      }

      const { data } = supabase.auth.onAuthStateChange((event) => {
        if (event === "PASSWORD_RECOVERY") {
          finish();
          return;
        }
        if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
          finish();
        }
      });
      subscription = data.subscription;
    })();

    return () => {
      subscription?.unsubscribe();
      clearTimeout(fallback);
    };
  }, [router]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="w-12 h-12 rounded-full border-4 animate-spin"
        style={{ borderColor: "var(--mint)", borderTopColor: "transparent" }}
      />
      <p className="text-sm" style={{ color: "var(--muted)" }}>로그인 처리 중...</p>
    </div>
  );
}
