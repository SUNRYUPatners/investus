"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Users } from "lucide-react";
import type { MarketId } from "@/lib/markets/types";
import { getMarketConfig } from "@/lib/markets/config";
import { isSessionChatOpen, sessionChatSupported } from "@/lib/markets/sessionChatOpen";
import type { SessionChatMessage } from "@/lib/sessionChat/types";

const MAX_MESSAGES = 40;

export function SessionChatWidget({ market }: { market: MarketId }) {
  const [open, setOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(false);
  const [messages, setMessages] = useState<SessionChatMessage[]>([]);
  const [online, setOnline] = useState(0);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const sinceRef = useRef(Date.now() - 5 * 60_000);
  const cfg = getMarketConfig(market);

  const supported = sessionChatSupported(market);

  const scrollToBottom = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  const poll = useCallback(async (initial = false) => {
    if (!supported) return;
    const isOpen = isSessionChatOpen(market);
    setSessionOpen(isOpen);
    if (!isOpen) return;

    if (initial) setLoading(true);
    try {
      const since = initial ? Date.now() - 8 * 60_000 : sinceRef.current;
      const res = await fetch(`/api/session-chat?market=${market}&since=${since}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json() as {
        open: boolean;
        messages: SessionChatMessage[];
        online?: number;
        pollMs?: number;
      };
      if (!data.open) {
        setSessionOpen(false);
        return;
      }
      if (data.online) setOnline(data.online);
      if (data.messages?.length) {
        setMessages((prev) => {
          const map = new Map(prev.map((m) => [m.id, m]));
          for (const m of data.messages) map.set(m.id, m);
          const merged = [...map.values()].sort((a, b) => a.at - b.at);
          return merged.slice(-MAX_MESSAGES);
        });
        const last = data.messages[data.messages.length - 1];
        if (last) sinceRef.current = last.at;
      }
    } catch { /* ignore */ }
    finally {
      if (initial) setLoading(false);
    }
  }, [market, supported]);

  useEffect(() => {
    if (!supported) return;
    const tick = () => setSessionOpen(isSessionChatOpen(market));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [market, supported]);

  useEffect(() => {
    if (!supported || !open) return;
    sinceRef.current = Date.now() - 5 * 60_000;
    void poll(true);
    const id = setInterval(() => void poll(false), 12_000);
    return () => clearInterval(id);
  }, [open, poll, supported]);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open, scrollToBottom]);

  if (!supported) return null;

  const closedLabel = market === "us"
    ? "미국 장 마감 후에는 열리지 않습니다"
    : "한국 장 마감 후에는 열리지 않습니다";

  return (
    <>
      {/* FAB */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="장중 실시간 시황방"
        className="session-chat-fab fixed z-[45] flex items-center justify-center rounded-full shadow-lg border transition-transform active:scale-95 bottom-[calc(72px+max(env(safe-area-inset-bottom,0px),12px))] lg:bottom-6 right-4"
        style={{
          width: 56,
          height: 56,
          background: sessionOpen ? "var(--accent)" : "var(--card)",
          borderColor: "var(--border)",
          color: sessionOpen ? "#fff" : "var(--muted)",
        }}
      >
        {sessionOpen && (
          <span
            className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2"
            style={{ borderColor: "var(--accent)" }}
          />
        )}
        <MessageCircle size={26} strokeWidth={2} />
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed inset-0 z-[46] lg:bg-black/20"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className="session-chat-panel absolute flex flex-col border shadow-2xl overflow-hidden
              inset-x-0 bottom-0 rounded-t-2xl max-h-[72vh]
              lg:inset-auto lg:right-6 lg:bottom-24 lg:w-[380px] lg:max-h-[min(520px,70vh)] lg:rounded-2xl"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="장중 실시간 시황방"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b shrink-0"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--text)" }}>
                  {sessionOpen ? "장중 실시간 시황방" : "시황방 (마감)"}
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                  {cfg.labelKo}
                  {sessionOpen && online > 0 && (
                    <span className="inline-flex items-center gap-1 ml-2">
                      <Users size={11} />
                      {online}명 접속 중
                    </span>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg"
                style={{ color: "var(--muted)" }}
                aria-label="닫기"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 min-h-[200px]"
              style={{ background: "var(--bg)" }}
            >
              {!sessionOpen && (
                <div className="text-center py-10 px-4">
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    지금은 장이 열려 있지 않습니다
                  </p>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>
                    {closedLabel}
                    <br />
                    장이 열리면 실시간 시세를 반영한 시황 대화가 이어집니다.
                  </p>
                </div>
              )}

              {sessionOpen && loading && messages.length === 0 && (
                <p className="text-center text-xs py-8" style={{ color: "var(--muted)" }}>
                  시황방 연결 중…
                </p>
              )}

              {sessionOpen && messages.map((m) => (
                <div key={m.id} className="flex gap-2 items-start">
                  <div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: "var(--card)", color: "var(--accent)", border: "1px solid var(--border)" }}
                  >
                    {m.nick.slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-[11px] font-semibold" style={{ color: "var(--text)" }}>
                        {m.nick}
                      </span>
                      <time className="text-[10px]" style={{ color: "var(--muted)" }}>
                        {formatTime(m.at)}
                      </time>
                    </div>
                    <p
                      className="text-[13px] leading-snug mt-0.5 rounded-xl px-3 py-2"
                      style={{ background: "var(--card)", color: "var(--text)" }}
                    >
                      {m.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              className="px-3 py-2.5 border-t text-[10px] leading-relaxed text-center shrink-0"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
            >
              실시간 시세 반영 · AI 시뮬레이션 시황 (읽기 전용)
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function formatTime(ms: number): string {
  return new Date(ms).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
}
