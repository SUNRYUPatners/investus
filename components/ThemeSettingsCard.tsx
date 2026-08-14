"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme, type ThemeMode } from "@/contexts/ThemeContext";

export function ThemeSettingsCard({ locale = "ko" }: { locale?: string }) {
  const isKo = locale === "ko";
  const { theme, setTheme } = useTheme();

  const options: { id: ThemeMode; label: string; hint: string; icon: typeof Sun }[] = [
    {
      id: "light",
      label: isKo ? "라이트" : "Light",
      hint: isKo ? "밝은 배경 · 기본" : "Bright · default",
      icon: Sun,
    },
    {
      id: "dark",
      label: isKo ? "다크" : "Dark",
      hint: isKo ? "어두운 배경" : "Dark background",
      icon: Moon,
    },
  ];

  return (
    <section className="mb-4" aria-label={isKo ? "화면 테마" : "Display theme"}>
      <p
        className="text-xs font-semibold tracking-widest uppercase mb-2 font-syne"
        style={{ color: "var(--muted)" }}
      >
        {isKo ? "화면 테마" : "Theme"}
      </p>
      <div
        className="rounded-2xl border overflow-hidden p-3"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <p className="text-[11px] mb-3 px-1" style={{ color: "var(--muted)" }}>
          {isKo
            ? "기본은 라이트입니다. 골드·네이비 포인트로 맞춰 두었습니다."
            : "Light is default. Accents use gold & navy."}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {options.map((opt) => {
            const active = theme === opt.id;
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTheme(opt.id)}
                className="rounded-xl border px-3 py-3 text-left transition-opacity active:opacity-80"
                style={
                  active
                    ? {
                        background: "rgba(var(--mint-rgb), 0.12)",
                        borderColor: "var(--mint)",
                        color: "var(--text)",
                      }
                    : {
                        background: "var(--bg)",
                        borderColor: "var(--border)",
                        color: "var(--muted)",
                      }
                }
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon
                    className="w-4 h-4"
                    style={{ color: active ? "var(--mint)" : "var(--muted)" }}
                  />
                  <span className="text-sm font-bold" style={{ color: "var(--text)" }}>
                    {opt.label}
                  </span>
                </div>
                <p className="text-[10px]" style={{ color: "var(--muted)" }}>
                  {opt.hint}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
