"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { getSupabase } from "@/lib/supabase";

export function PdfViewer({
  pdfPath,
  accessToken,
  title,
  onClose,
}: {
  pdfPath: string;
  accessToken: string;
  title?: string;
  onClose: () => void;
}) {
  const [numPages,   setNumPages]   = useState(0);
  const [page,       setPage]       = useState(1);
  const [scale,      setScale]      = useState(1.0);
  const [barsHidden, setBarsHidden] = useState(false);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);
  const [imgSrc,     setImgSrc]     = useState<string | null>(null);
  // Flash indicator when navigating by click/tap/scroll
  const [navFlash,   setNavFlash]   = useState<"prev" | "next" | null>(null);

  const prevBlobUrl  = useRef<string | null>(null);
  const hideTimer    = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const flashTimer   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const abortRef     = useRef<AbortController | null>(null);
  const touchY       = useRef(0);
  const touchSwiped  = useRef(false);
  const lastNavTime  = useRef(0); // throttle wheel/swipe

  /* ── auto-hide bars ─────────────────────────────────────────── */
  const resetHideTimer = useCallback(() => {
    setBarsHidden(false);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setBarsHidden(true), 3000);
  }, []);

  useEffect(() => {
    resetHideTimer();
    return () => clearTimeout(hideTimer.current);
  }, [resetHideTimer]);

  /* ── fetch a single page from the server ───────────────────── */
  useEffect(() => {
    if (!pdfPath || !accessToken) return;
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setError(null);

    const url =
      `/api/creator/pdf-page` +
      `?path=${encodeURIComponent(pdfPath)}&page=${page}`;

    const fetchPage = async (token: string, isRetry = false): Promise<void> => {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        signal: ctrl.signal,
      });

      if (res.status === 401 && !isRetry) {
        const { data } = await getSupabase().auth.refreshSession();
        const newToken = data.session?.access_token;
        if (!newToken) throw new Error("Session expired");
        return fetchPage(newToken, true);
      }

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      if (page === 1) {
        const total = res.headers.get("X-Total-Pages");
        if (total) setNumPages(parseInt(total, 10));
      }

      const blob = await res.blob();
      if (prevBlobUrl.current) URL.revokeObjectURL(prevBlobUrl.current);
      const blobUrl = URL.createObjectURL(blob);
      prevBlobUrl.current = blobUrl;
      setImgSrc(blobUrl);
      setLoading(false);
    };

    fetchPage(accessToken).catch((err) => {
      if (err.name === "AbortError") return;
      console.error("[PdfViewer] fetch page:", err);
      setError("페이지를 불러올 수 없습니다.");
      setLoading(false);
    });

    return () => ctrl.abort();
  }, [pdfPath, accessToken, page]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (prevBlobUrl.current) URL.revokeObjectURL(prevBlobUrl.current);
    };
  }, []);

  /* ── navigate with flash indicator ──────────────────────────── */
  const navigate = useCallback((dir: "prev" | "next") => {
    if (dir === "prev") setPage((p) => Math.max(1, p - 1));
    else setPage((p) => Math.min(numPages || 9999, p + 1));

    setNavFlash(dir);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setNavFlash(null), 280);
    resetHideTimer();
  }, [numPages, resetHideTimer]);

  /* ── keyboard ───────────────────────────────────────────────── */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      resetHideTimer();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") navigate("next");
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   navigate("prev");
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=")
        setScale((s) => Math.min(3, +(s + 0.25).toFixed(2)));
      if (e.key === "-")
        setScale((s) => Math.max(0.5, +(s - 0.25).toFixed(2)));
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [navigate, onClose, resetHideTimer]);

  /* ── wheel → page navigation (throttled 600ms) ──────────────── */
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastNavTime.current < 600) return;
    lastNavTime.current = now;
    if (e.deltaY > 0) navigate("next");
    else if (e.deltaY < 0) navigate("prev");
  }, [navigate]);

  /* ── touch swipe (vertical) ──────────────────────────────────── */
  const onTouchStart = (e: React.TouchEvent) => {
    touchY.current = e.touches[0].clientY;
    touchSwiped.current = false;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const now = Date.now();
    const dy = e.changedTouches[0].clientY - touchY.current;
    if (dy < -50 && now - lastNavTime.current > 400) {
      lastNavTime.current = now;
      touchSwiped.current = true;
      navigate("next");
    } else if (dy > 50 && now - lastNavTime.current > 400) {
      lastNavTime.current = now;
      touchSwiped.current = true;
      navigate("prev");
    } else {
      resetHideTimer();
    }
  };

  /* ── left/right click navigation ────────────────────────────── */
  const handlePageAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If a swipe just fired on touch, skip this synthetic click
    if (touchSwiped.current) { touchSwiped.current = false; return; }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.38) navigate("prev");
    else if (x > rect.width * 0.62) navigate("next");
    else resetHideTimer();
  };

  const pct = numPages > 1 ? ((page - 1) / (numPages - 1)) * 100 : 0;

  const imgStyle: React.CSSProperties = {
    display:      loading ? "none" : "block",
    maxWidth:     `calc((100vw - 32px) * ${scale})`,
    maxHeight:    `calc((100vh - 120px) * ${scale})`,
    width:        "auto",
    height:       "auto",
    margin:       "32px 16px",
    borderRadius: 4,
    boxShadow:    "0 32px 80px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)",
    userSelect:   "none",
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ background: "#07070d" }}
      onMouseMove={resetHideTimer}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center gap-3 px-4 py-3 transition-all duration-300"
        style={{
          background:    "linear-gradient(to bottom, rgba(7,7,13,0.95) 0%, transparent 100%)",
          opacity:       barsHidden ? 0 : 1,
          pointerEvents: barsHidden ? "none" : "auto",
          transform:     barsHidden ? "translateY(-6px)" : "translateY(0)",
        }}
      >
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <X className="w-4 h-4" style={{ color: "rgba(255,255,255,0.7)" }} />
        </button>

        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-semibold truncate leading-tight" style={{ color: "rgba(255,255,255,0.85)" }}>
              {title}
            </p>
          )}
          {numPages > 0 && (
            <p className="text-[11px] tabular-nums leading-tight" style={{ color: "rgba(255,255,255,0.3)" }}>
              {page} / {numPages}
            </p>
          )}
        </div>

        {/* Zoom */}
        <div
          className="flex items-center gap-0.5 rounded-full px-1.5 py-1"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <button
            onClick={() => setScale((s) => Math.max(0.5, +(s - 0.25).toFixed(2)))}
            className="w-7 h-7 flex items-center justify-center rounded-full active:bg-white/10 transition-colors"
          >
            <Minus className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.6)" }} />
          </button>
          <span className="text-[11px] tabular-nums w-9 text-center" style={{ color: "rgba(255,255,255,0.45)" }}>
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(3, +(s + 0.25).toFixed(2)))}
            className="w-7 h-7 flex items-center justify-center rounded-full active:bg-white/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.6)" }} />
          </button>
        </div>
      </div>

      {/* ── Page area ───────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-hidden relative"
        style={{ background: "#07070d" }}
        onClick={handlePageAreaClick}
        onWheel={onWheel}
      >
        {/* Spinner */}
        {loading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 pointer-events-none">
            <div
              className="w-9 h-9 rounded-full border-[2px] animate-spin"
              style={{ borderColor: "rgba(255,255,255,0.07)", borderTopColor: "rgba(255,255,255,0.55)" }}
            />
            <p className="text-xs tracking-wide" style={{ color: "rgba(255,255,255,0.25)" }}>
              페이지 불러오는 중…
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              📄
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>{error}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>다시 시도하거나 닫아 주세요</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={(e) => { e.stopPropagation(); setError(null); setLoading(true); setPage((p) => p); }}
                className="text-sm font-semibold px-6 py-2.5 rounded-2xl"
                style={{ background: "rgba(192,132,252,0.15)", color: "rgba(192,132,252,0.9)", border: "1px solid rgba(192,132,252,0.25)" }}
              >
                다시 시도
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="text-sm font-semibold px-6 py-2.5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                닫기
              </button>
            </div>
          </div>
        )}

        {/* Page image — centered when smaller than viewport, scrollable when larger */}
        {imgSrc && !error && (
          <div className="flex items-center justify-center min-h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc}
              alt={`페이지 ${page}`}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              style={imgStyle}
            />
          </div>
        )}

        {/* Click-zone flash indicators */}
        {navFlash && (
          <div
            className="absolute top-0 bottom-0 pointer-events-none flex items-center z-20"
            style={{
              left:   navFlash === "prev" ? 0 : undefined,
              right:  navFlash === "next" ? 0 : undefined,
              width:  "38%",
              justifyContent: navFlash === "prev" ? "flex-start" : "flex-end",
              padding: "0 20px",
              animation: "navFlashFade 280ms ease-out forwards",
            }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(4px)" }}
            >
              {navFlash === "prev"
                ? <ChevronLeft  className="w-6 h-6" style={{ color: "rgba(255,255,255,0.8)" }} />
                : <ChevronRight className="w-6 h-6" style={{ color: "rgba(255,255,255,0.8)" }} />
              }
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 transition-all duration-300"
        style={{
          background:    "linear-gradient(to top, rgba(7,7,13,0.97) 0%, transparent 100%)",
          opacity:       barsHidden ? 0 : 1,
          pointerEvents: barsHidden ? "none" : "auto",
          transform:     barsHidden ? "translateY(6px)" : "translateY(0)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {numPages > 1 && (
          <div className="px-6 pt-5 pb-1">
            <input
              type="range" min={1} max={numPages} value={page}
              onChange={(e) => { e.stopPropagation(); setPage(Number(e.target.value)); }}
              onClick={(e) => e.stopPropagation()}
              className="w-full h-[3px] rounded-full appearance-none outline-none cursor-pointer"
              style={{
                background:  `linear-gradient(to right, rgba(255,255,255,0.7) ${pct}%, rgba(255,255,255,0.1) ${pct}%)`,
                accentColor: "rgba(255,255,255,0.7)",
              }}
            />
          </div>
        )}

        <div className="flex items-center justify-between px-5 py-4">
          <button
            onClick={(e) => { e.stopPropagation(); navigate("prev"); }}
            disabled={page <= 1}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-2xl active:scale-95 disabled:opacity-20 transition-all"
            style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />이전
          </button>

          <div className="flex items-center gap-1.5">
            {numPages > 0 && numPages <= 9
              ? Array.from({ length: numPages }, (_, i) => (
                  <button key={i}
                    onClick={(e) => { e.stopPropagation(); setPage(i + 1); }}
                    className="rounded-full transition-all duration-200"
                    style={{
                      width:      page === i + 1 ? 18 : 5,
                      height:     5,
                      background: page === i + 1 ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))
              : (
                <span className="text-xs tabular-nums px-3 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
                  {numPages > 0 ? `${page} / ${numPages}` : `${page}페이지`}
                </span>
              )}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); navigate("next"); }}
            disabled={numPages > 0 && page >= numPages}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-2xl active:scale-95 disabled:opacity-20 transition-all"
            style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            다음<ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Flash animation keyframe */}
      <style>{`
        @keyframes navFlashFade {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
