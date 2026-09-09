"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { SocialLoginButtons } from "@/components/SocialLoginButtons";
import { OPEN_LOGIN_EVENT } from "@/lib/guestLogin";

export function GuestLoginSheet() {
  const { user, loaded } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_LOGIN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_LOGIN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (user) setOpen(false);
  }, [user]);

  if (!loaded || user || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end lg:items-center justify-center lg:p-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full lg:max-w-[380px] rounded-t-3xl lg:rounded-3xl px-5 pt-4 pb-8"
        style={{ background: "var(--card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-3 lg:hidden">
          <div className="w-10 h-1 rounded-full" style={{ background: "var(--border)" }} />
        </div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-base font-bold" style={{ color: "var(--text)" }}>
              30초면 시작됩니다
            </p>
            <p className="text-[12px] leading-relaxed mt-1" style={{ color: "var(--muted)" }}>
              자산을 넣으면 매일 아침 AI가 흐름을 정리합니다. 구글·카카오·네이버로 바로 이어서 쓸 수 있습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-shrink-0 opacity-50 hover:opacity-80"
            aria-label="닫기"
          >
            <X className="w-4 h-4" style={{ color: "var(--text)" }} />
          </button>
        </div>
        <SocialLoginButtons />
        <p className="text-[10px] mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
          가입은 무료입니다. 리포트·시세·포트폴리오 분석은 참고용이며 투자 권유가 아닙니다.
        </p>
      </div>
    </div>
  );
}
