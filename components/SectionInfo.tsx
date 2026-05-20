"use client";

import { useState, useRef, useEffect } from "react";
import { HelpCircle, X } from "lucide-react";

function useIsDesktop() {
  const [lg, setLg] = useState(false);
  useEffect(() => {
    const check = () => setLg(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return lg;
}

type PopupCoords = { top: number; left: number };

type Props = {
  title: string;
  children: React.ReactNode;
  side?: "left" | "right";
};

export function SectionInfo({ title, children, side = "left" }: Props) {
  const [open, setOpen]     = useState(false);
  const [coords, setCoords] = useState<PopupCoords>({ top: 0, left: 0 });
  const btnRef    = useRef<HTMLButtonElement>(null);
  const popupRef  = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const popupW    = isDesktop ? 480 : 280;
  const PAD       = 12;

  const computeCoords = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const vw   = window.innerWidth;
    const top  = rect.bottom + 8;

    let left: number;
    if (side === "right") {
      // Align popup's right edge with button's right edge → extends left
      left = rect.right - popupW;
      if (left < PAD) left = PAD;
    } else {
      // Align popup's left edge with button's left edge → extends right
      left = rect.left;
      if (left + popupW > vw - PAD) left = vw - PAD - popupW;
      if (left < PAD) left = PAD;
    }

    setCoords({ top, left });
  };

  useEffect(() => {
    if (!open) return;
    computeCoords();

    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        btnRef.current && !btnRef.current.contains(target) &&
        popupRef.current && !popupRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    const tid = setTimeout(() => {
      document.addEventListener("mousedown", handler);
      document.addEventListener("touchstart", handler);
    }, 60);
    return () => {
      clearTimeout(tid);
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="inline-flex items-center gap-1.5">
      <span className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
        {title}
      </span>
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center rounded-full transition-opacity active:opacity-60"
        style={{ width: 16, height: 16 }}
        aria-label="설명 보기"
      >
        <HelpCircle className="w-3.5 h-3.5" style={{ color: "var(--muted)", opacity: 0.6 }} />
      </button>

      {open && (
        <div
          ref={popupRef}
          className="rounded-xl border shadow-2xl"
          style={{
            position: "fixed",
            top: coords.top,
            left: coords.left,
            width: popupW,
            maxWidth: `calc(100vw - ${PAD * 2}px)`,
            zIndex: 9999,
            background: "var(--card)",
            borderColor: "var(--border)",
            padding: "14px 16px",
          }}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2.5 right-2.5 opacity-40 hover:opacity-70"
          >
            <X className="w-3.5 h-3.5" style={{ color: "var(--text)" }} />
          </button>
          <div className="text-[12px] leading-relaxed" style={{ color: "var(--text)" }}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
