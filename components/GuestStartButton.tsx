"use client";

import { useAuth } from "@/hooks/useAuth";
import { openGuestLogin } from "@/lib/guestLogin";
import { useLocaleCode } from "@/contexts/LocaleContext";

export function GuestStartButton({ compact = false }: { compact?: boolean }) {
  const { user, loaded } = useAuth();
  const locale = useLocaleCode();
  const isKo = locale === "ko";

  if (!loaded || user) return null;

  return (
    <button
      type="button"
      onClick={openGuestLogin}
      className={compact ? "text-[11px] font-bold px-2.5 py-1 rounded-full" : "w-full py-2.5 rounded-xl text-sm font-bold"}
      style={{ background: "var(--mint)", color: "var(--on-accent)" }}
    >
      {isKo ? "시작하기" : "Get started"}
    </button>
  );
}
