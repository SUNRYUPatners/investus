"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocaleCode } from "@/contexts/LocaleContext";

const SAVED_KEY = "investus_newsletter_email";

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const locale = useLocaleCode();
  const isKo = locale === "ko";
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [err, setErr] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(SAVED_KEY)) setStatus("ok");
    } catch {
      /* ignore */
    }
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErr(isKo ? "수신 동의를 체크해 주세요." : "Please agree to receive emails.");
      setStatus("err");
      return;
    }
    setStatus("saving");
    setErr("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale: isKo ? "ko" : "en", consent: true, website: "" }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setErr(data.error || (isKo ? "신청에 실패했습니다." : "Could not subscribe."));
        setStatus("err");
        return;
      }
      try {
        localStorage.setItem(SAVED_KEY, email.trim().toLowerCase());
      } catch {
        /* ignore */
      }
      setStatus("ok");
    } catch {
      setErr(isKo ? "네트워크 오류입니다. 다시 시도해 주세요." : "Network error. Try again.");
      setStatus("err");
    }
  };

  if (status === "ok") {
    return (
      <p className="text-[11px] leading-relaxed" style={{ color: "var(--mint)" }}>
        {isKo
          ? "신청되었습니다. 장전 브리핑을 메일로 보내 드립니다."
          : "You're in. We'll email the pre-market brief."}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={compact ? "mt-3" : "mt-0"}>
      <p className={`font-semibold ${compact ? "text-[11px] mb-1.5" : "text-[12px] mb-2"}`} style={{ color: "var(--text)" }}>
        {isKo ? "이메일로 아침 브리핑 받기" : "Email the morning brief"}
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isKo ? "you@email.com" : "you@email.com"}
          className="flex-1 min-w-0 px-3 py-2 rounded-xl text-[12px] outline-none"
          style={{ background: "var(--bg)", color: "var(--text)", border: "1px solid var(--border)" }}
        />
        <button
          type="submit"
          disabled={status === "saving"}
          className="flex-shrink-0 px-3 py-2 rounded-xl text-[12px] font-bold disabled:opacity-50"
          style={{ background: "var(--mint)", color: "var(--on-accent)" }}
        >
          {status === "saving" ? (isKo ? "신청 중" : "Sending") : (isKo ? "신청" : "Subscribe")}
        </button>
      </div>
      <label className="flex items-start gap-2 mt-2 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        <span className="text-[10px] leading-relaxed" style={{ color: "var(--muted)" }}>
          {isKo ? (
            <>
              장전 브리핑 메일 수신에 동의합니다.{" "}
              <Link href="/more/privacy" className="underline">개인정보처리방침</Link>
            </>
          ) : (
            <>
              I agree to receive the pre-market brief.{" "}
              <Link href="/more/privacy" className="underline">Privacy policy</Link>
            </>
          )}
        </span>
      </label>
      {status === "err" && err && (
        <p className="text-[10px] mt-1" style={{ color: "#ef4444" }}>{err}</p>
      )}
    </form>
  );
}
