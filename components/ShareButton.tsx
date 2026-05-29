"use client";

import { useState } from "react";
import { Share2, Link, Check } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  size?: "sm" | "md";
}

export function ShareButton({ title, text, url, size = "md" }: ShareButtonProps) {
  const [copied,    setCopied]    = useState(false);
  const [showMenu,  setShowMenu]  = useState(false);

  const shareUrl  = url  ?? (typeof window !== "undefined" ? window.location.href : "");
  const shareText = text ?? title;

  const handleShare = async () => {
    // 모바일: Web Share API (카카오톡·인스타·문자 등 네이티브 공유)
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl });
      } catch { /* 취소 */ }
      return;
    }
    // 데스크톱: 메뉴 표시
    setShowMenu((v) => !v);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setShowMenu(false);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToX = () => {
    const encoded = encodeURIComponent(`${shareText}\n${shareUrl}`);
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, "_blank");
    setShowMenu(false);
  };

  const iconSize  = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const btnPad    = size === "sm" ? "px-2.5 py-1.5" : "px-3 py-2";
  const textSize  = size === "sm" ? "text-[11px]"   : "text-xs";

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className={`flex items-center gap-1.5 ${btnPad} rounded-xl border transition-all active:opacity-70`}
        style={{ background: "rgba(255,255,255,0.04)", borderColor: "var(--border)" }}
      >
        {copied
          ? <Check className={`${iconSize} flex-shrink-0`} style={{ color: "var(--mint)" }} />
          : <Share2 className={`${iconSize} flex-shrink-0`} style={{ color: "var(--muted)" }} />
        }
        <span className={`${textSize} font-medium`} style={{ color: copied ? "var(--mint)" : "var(--muted)" }}>
          {copied ? "복사됨" : "공유"}
        </span>
      </button>

      {/* 데스크톱 공유 메뉴 */}
      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 rounded-xl border overflow-hidden shadow-xl"
            style={{ background: "var(--card)", borderColor: "var(--border)", minWidth: 160 }}>
            <button onClick={shareToX}
              className="flex items-center gap-2.5 w-full px-4 py-3 text-xs font-medium hover:bg-white/5 transition-colors text-left">
              <span className="w-3.5 h-3.5 flex items-center justify-center font-bold text-xs" style={{ color: "#fff" }}>𝕏</span>
              <span style={{ color: "var(--text)" }}>X (트위터)</span>
            </button>
            <div style={{ height: 1, background: "var(--border)" }} />
            <button onClick={copyLink}
              className="flex items-center gap-2.5 w-full px-4 py-3 text-xs font-medium hover:bg-white/5 transition-colors text-left">
              <Link className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
              <span style={{ color: "var(--text)" }}>링크 복사</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
