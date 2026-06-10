"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";

type TargetLang = "en" | "ja" | "zh" | "es" | "fr";

interface TranslateCtx {
  enabled: boolean;
  targetLang: TargetLang;
  setTargetLang: (lang: TargetLang) => void;
  toggle: () => void;
  translate: (text: string) => Promise<string>;
}

const Ctx = createContext<TranslateCtx | null>(null);

export const LANG_LABELS: Record<TargetLang, string> = {
  en: "EN",
  ja: "JA",
  zh: "ZH",
  es: "ES",
  fr: "FR",
};

export function TranslateProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [targetLang, setTargetLang] = useState<TargetLang>("en");
  const cache = useRef<Map<string, string>>(new Map());

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  const translate = useCallback(async (text: string): Promise<string> => {
    if (!text.trim()) return text;
    const key = `${targetLang}:${text}`;
    if (cache.current.has(key)) return cache.current.get(key)!;
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang }),
      });
      const data = await res.json() as { translated?: string };
      const result = data.translated ?? text;
      cache.current.set(key, result);
      return result;
    } catch {
      return text;
    }
  }, [targetLang]);

  return (
    <Ctx.Provider value={{ enabled, targetLang, setTargetLang, toggle, translate }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTranslate() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTranslate must be inside TranslateProvider");
  return ctx;
}
