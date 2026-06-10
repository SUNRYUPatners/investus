"use client";

import { useState } from "react";
import { Languages } from "lucide-react";
import { useTranslate, LANG_LABELS } from "@/contexts/TranslateContext";

type TargetLang = keyof typeof LANG_LABELS;

export function TranslateButton() {
  const { enabled, targetLang, setTargetLang, toggle } = useTranslate();
  const [showPicker, setShowPicker] = useState(false);

  const handleLangSelect = (lang: TargetLang) => {
    setTargetLang(lang);
    setShowPicker(false);
    if (!enabled) toggle();
  };

  return (
    <div className="relative flex items-center gap-1">
      {/* Lang picker */}
      {showPicker && (
        <div
          className="absolute bottom-full right-0 mb-2 rounded-xl border flex flex-col overflow-hidden z-50"
          style={{ background: "var(--card)", borderColor: "var(--border)", minWidth: 64 }}
        >
          {(Object.keys(LANG_LABELS) as TargetLang[]).map((lang) => (
            <button
              key={lang}
              className="px-3 py-1.5 text-xs font-bold text-left transition-opacity active:opacity-60"
              style={{
                color: lang === targetLang ? "var(--mint)" : "var(--muted)",
                background: lang === targetLang ? "rgba(0,229,160,0.08)" : "transparent",
              }}
              onClick={() => handleLangSelect(lang)}
            >
              {LANG_LABELS[lang]}
            </button>
          ))}
        </div>
      )}

      {/* Lang label (click to open picker) */}
      {enabled && (
        <button
          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full border"
          style={{
            color: "var(--mint)",
            borderColor: "rgba(0,229,160,0.3)",
            background: "rgba(0,229,160,0.08)",
          }}
          onClick={() => setShowPicker((v) => !v)}
        >
          {LANG_LABELS[targetLang]}
        </button>
      )}

      {/* Toggle button */}
      <button
        onClick={() => {
          if (!enabled) {
            setShowPicker(false);
            toggle();
          } else {
            toggle();
          }
        }}
        className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-full border transition-all active:opacity-60"
        style={{
          background: enabled ? "rgba(0,229,160,0.12)" : "var(--bg)",
          borderColor: enabled ? "rgba(0,229,160,0.35)" : "var(--border)",
          color: enabled ? "var(--mint)" : "var(--muted)",
        }}
        title={enabled ? "번역 끄기" : "번역하기"}
        aria-label="번역"
        aria-pressed={enabled}
      >
        <Languages className="w-3.5 h-3.5" />
        {!enabled && <span>번역</span>}
        {enabled && (
          <button
            className="ml-0.5 text-[10px] opacity-60 hover:opacity-100"
            style={{ color: "var(--mint)" }}
            onClick={(e) => { e.stopPropagation(); setShowPicker((v) => !v); }}
          >
            ▾
          </button>
        )}
      </button>
    </div>
  );
}
