"use client";

import { useState, useEffect } from "react";
import { useTranslate } from "@/contexts/TranslateContext";

export function useTranslated(text: string): string {
  const { enabled, translate, targetLang } = useTranslate();
  const [result, setResult] = useState(text);

  useEffect(() => {
    if (!enabled) {
      setResult(text);
      return;
    }
    let cancelled = false;
    translate(text).then((t) => { if (!cancelled) setResult(t); });
    return () => { cancelled = true; };
  }, [enabled, text, targetLang, translate]);

  return result;
}
