"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "investus_theme";

type ThemeCtx = {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeCtx | null>(null);

function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#07090e" : "#10203c");
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("light");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const next: ThemeMode = raw === "dark" ? "dark" : "light";
      setThemeState(next);
      applyTheme(next);
    } catch {
      applyTheme("light");
    }
  }, []);

  const setTheme = useCallback((t: ThemeMode) => {
    setThemeState(t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch { /* ignore */ }
    applyTheme(t);
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/** Blocking inline script — paste in <head> to avoid FOUC */
export const THEME_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t!=='dark')t='light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;
