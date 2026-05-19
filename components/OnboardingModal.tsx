"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/contexts/LocaleContext";

const STORAGE_KEY = "investus_onboarded";

export function OnboardingModal() {
  const [visible, setVisible] = useState(false);
  const [step, setStep]       = useState(0);
  const t = useLocale();

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch { /* ignore */ }
  }, []);

  const finish = () => {
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
    setVisible(false);
  };

  if (!visible) return null;

  const steps   = t.onboarding.steps;
  const current = steps[step];
  const isLast  = step === steps.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
    >
      <div
        className="w-full max-w-[340px] rounded-3xl px-6 py-7 flex flex-col items-center text-center"
        style={{ background: "var(--card)" }}
      >
        {/* 스텝 인디케이터 */}
        <div className="flex gap-1.5 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === step ? 24 : 8,
                background: i === step ? "var(--mint)" : "var(--border)",
              }}
            />
          ))}
        </div>

        <div className="text-5xl mb-4">{current.emoji}</div>
        <h2 className="text-base font-bold font-syne mb-2" style={{ color: "var(--text)" }}>
          {current.title}
        </h2>
        <p className="text-[12px] leading-relaxed mb-7" style={{ color: "var(--muted)" }}>
          {current.desc}
        </p>

        <button
          onClick={() => isLast ? finish() : setStep((s) => s + 1)}
          className="w-full py-3 rounded-2xl text-sm font-bold text-black mb-3"
          style={{ background: "var(--mint)" }}
        >
          {isLast ? t.onboarding.start : t.onboarding.next}
        </button>
        <button
          onClick={finish}
          className="text-xs"
          style={{ color: "var(--muted)" }}
        >
          {t.onboarding.skip}
        </button>
      </div>
    </div>
  );
}
