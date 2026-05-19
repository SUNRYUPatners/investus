"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabase();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        subscription.unsubscribe();
        // Return to more page; user updates password via profile settings
        router.replace("/more");
        return;
      }
      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        subscription.unsubscribe();
        router.replace("/more");
      }
    });

    const fallback = setTimeout(() => router.replace("/more"), 5000);
    return () => {
      subscription.unsubscribe();
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
