"use client";

import { useRouter } from "next/navigation";
import { Bell, Wallet } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { openGuestLogin } from "@/lib/guestLogin";
import { useLocaleCode } from "@/contexts/LocaleContext";
import type { MarketId } from "@/lib/markets/types";

export function HomeValueStrip({ market: _market }: { market: MarketId }) {
  const { user, loaded } = useAuth();
  const locale = useLocaleCode();
  const isKo = locale === "ko";
  const router = useRouter();

  if (!loaded || user) return null;

  return (
    <section className="px-4 lg:px-0 pt-3">
      <div
        className="rounded-2xl border px-4 py-3.5"
        style={{
          background: "linear-gradient(135deg, rgba(var(--mint-rgb),0.10) 0%, rgba(59,130,246,0.06) 100%)",
          borderColor: "rgba(var(--mint-rgb),0.28)",
        }}
      >
        <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "var(--mint)" }}>
          {isKo ? "AI 자산관리" : "AI wealth management"}
        </p>
        <p className="text-sm font-bold leading-snug" style={{ color: "var(--text)" }}>
          {isKo
            ? "미국·한국·안전자산·부동산 — 매일 아침 AI가 정리합니다"
            : "US, Korea, safe assets, real estate — AI briefs you every morning"}
        </p>
        <p className="text-[12px] leading-relaxed mt-1.5" style={{ color: "var(--muted)" }}>
          {isKo
            ? "보유 종목을 연동하면 내 자산 기준으로 시세와 흐름을 보여 줍니다. 알림을 켜 두면 장전 브리핑을 놓치지 않습니다."
            : "Link holdings to see prices in your context. Turn on alerts so you never miss the morning brief."}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            type="button"
            onClick={openGuestLogin}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold"
            style={{ background: "var(--mint)", color: "var(--on-accent)" }}
          >
            <Wallet className="w-3.5 h-3.5" />
            {isKo ? "내 자산 연동하기" : "Link my assets"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/more/notifications")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold border"
            style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--card)" }}
          >
            <Bell className="w-3.5 h-3.5" />
            {isKo ? "아침 알림 받기" : "Morning alerts"}
          </button>
        </div>
      </div>
    </section>
  );
}
