"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogIn, MessageCircle, Send, UserPlus, X, Users } from "lucide-react";
import type { MarketId } from "@/lib/markets/types";
import { getMarketConfig } from "@/lib/markets/config";
import { isSessionChatOpen, sessionChatSupported } from "@/lib/markets/sessionChatOpen";
import type { SessionChatMessage } from "@/lib/sessionChat/types";
import { sessionChatAuthHeaders } from "@/lib/sessionChat/authHeaders";
import { useAuth } from "@/hooks/useAuth";

const MAX_MESSAGES = 60;
const READ_KEY = (market: MarketId) => `investus-session-chat-read-${market}`;

export function SessionChatWidget({ market }: { market: MarketId }) {
  const { user, loaded, loginWithOAuth, loginWithNaver } = useAuth();
  const [panelOpen, setPanelOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(false);
  const [messages, setMessages] = useState<SessionChatMessage[]>([]);
  const [online, setOnline] = useState(0);
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState("");
  const [hasNewPulse, setHasNewPulse] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const sinceRef = useRef(Date.now() - 8 * 60_000);
  const lastMsgAtRef = useRef(0);
  const panelOpenRef = useRef(panelOpen);
  const cfg = getMarketConfig(market);

  const supported = sessionChatSupported(market);

  useEffect(() => {
    panelOpenRef.current = panelOpen;
  }, [panelOpen]);

  // 모바일: 팝업 열릴 때 뒤 페이지 스크롤 잠금
  useEffect(() => {
    if (!panelOpen) return;
    const scrollY = window.scrollY;
    const { style } = document.body;
    const prev = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
    };
    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    return () => {
      style.overflow = prev.overflow;
      style.position = prev.position;
      style.top = prev.top;
      style.left = prev.left;
      style.right = prev.right;
      style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [panelOpen]);

  const markRead = useCallback(() => {
    const now = Date.now();
    try {
      localStorage.setItem(READ_KEY(market), String(now));
    } catch { /* ignore */ }
    setUnread(0);
    setHasNewPulse(false);
    lastMsgAtRef.current = now;
  }, [market]);

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
      const res = await fetch(`/api/session-chat?market=${market}&since=${since}`, {
        cache: "no-store",
        headers: await sessionChatAuthHeaders(),
      });
      if (!res.ok) return;
      const data = await res.json() as {
        open: boolean;
        messages: SessionChatMessage[];
        online?: number;
      };
      if (!data.open) {
        setSessionOpen(false);
        return;
      }
      if (data.online) setOnline(data.online);

      if (data.messages?.length) {
        const latestAt = Math.max(...data.messages.map((m) => m.at));
        let readAt = 0;
        try {
          readAt = Number(localStorage.getItem(READ_KEY(market)) ?? "0");
        } catch { /* ignore */ }

        if (!panelOpenRef.current && latestAt > readAt) {
          const newCount = data.messages.filter((m) => m.at > readAt && !m.is_mine).length;
          if (newCount > 0) {
            setUnread((u) => Math.min(99, u + newCount));
            setHasNewPulse(true);
          }
        }

        setMessages((prev) => {
          const map = new Map(prev.map((m) => [m.id, m]));
          for (const m of data.messages) map.set(m.id, m);
          const merged = [...map.values()].sort((a, b) => a.at - b.at);
          return merged.slice(-MAX_MESSAGES);
        });

        const last = data.messages[data.messages.length - 1];
        if (last) {
          sinceRef.current = last.at;
          lastMsgAtRef.current = last.at;
        }
      }
    } catch { /* ignore */ }
    finally {
      if (initial) setLoading(false);
    }
  }, [market, supported]);

  // 장중 여부 체크
  useEffect(() => {
    if (!supported) return;
    const tick = () => setSessionOpen(isSessionChatOpen(market));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [market, supported]);

  // 장중이면 패널 열림 여부와 관계없이 폴링 (새 글 알림)
  useEffect(() => {
    if (!supported || !sessionOpen) return;
    sinceRef.current = Date.now() - 8 * 60_000;
    void poll(true);
    const id = setInterval(() => void poll(false), 8_000);
    return () => clearInterval(id);
  }, [poll, sessionOpen, supported]);

  useEffect(() => {
    if (panelOpen) {
      markRead();
      scrollToBottom();
    }
  }, [messages, panelOpen, markRead, scrollToBottom]);

  const submitMessage = async () => {
    if (!user) return;
    const content = draft.trim();
    if (content.length < 2) {
      setSubmitErr("2자 이상 작성해주세요.");
      return;
    }
    setSubmitting(true);
    setSubmitErr("");
    try {
      const res = await fetch("/api/session-chat", {
        method: "POST",
        headers: await sessionChatAuthHeaders(),
        body: JSON.stringify({ market, content }),
      });
      const data = await res.json() as { message?: SessionChatMessage; error?: string };
      if (!res.ok || data.error) {
        setSubmitErr(data.error ?? "전송 실패");
        return;
      }
      if (data.message) {
        setMessages((prev) => [...prev, data.message!].slice(-MAX_MESSAGES));
        sinceRef.current = data.message.at;
        setDraft("");
        markRead();
        requestAnimationFrame(scrollToBottom);
      }
    } catch {
      setSubmitErr("네트워크 오류");
    } finally {
      setSubmitting(false);
    }
  };

  if (!supported) return null;

  const closedLabel = market === "us"
    ? "미국 장 마감 후에는 열리지 않습니다"
    : "한국 장 마감 후에는 열리지 않습니다";

  const showPulse = sessionOpen && (unread > 0 || hasNewPulse);

  return (
    <>
      {/* FAB */}
      <div className="fixed z-[45] right-4 bottom-[calc(72px+max(env(safe-area-inset-bottom,0px),12px))] lg:bottom-6">
        {showPulse && (
          <span
            className="absolute inset-0 rounded-full session-chat-ring pointer-events-none"
            aria-hidden
          />
        )}
        <button
          type="button"
          onClick={() => {
            setPanelOpen((v) => !v);
            if (!panelOpen) markRead();
          }}
          aria-label="장중 실시간 시황방"
          className={`relative flex items-center justify-center rounded-full shadow-lg border transition-transform active:scale-95 w-14 h-14 ${
            showPulse ? "session-chat-fab-pulse" : ""
          }`}
          style={{
            background: sessionOpen ? "var(--accent)" : "var(--card)",
            borderColor: showPulse ? "var(--mint)" : "var(--border)",
            color: sessionOpen ? "#fff" : "var(--muted)",
          }}
        >
          {sessionOpen && (
            <span
              className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2"
              style={{ borderColor: "var(--accent)" }}
            />
          )}
          {unread > 0 && (
            <span
              className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
              style={{ background: "var(--down)" }}
            >
              {unread > 99 ? "99+" : unread}
            </span>
          )}
          <MessageCircle size={26} strokeWidth={2} />
        </button>
      </div>

      {/* Panel — overlay와 시트 분리 (모바일 스크롤 격리) */}
      {panelOpen && (
        <>
          <div
            className="fixed inset-0 z-[46] bg-black/40 lg:bg-black/20"
            onClick={() => setPanelOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
            role="presentation"
            aria-hidden
          />
          <div
            className="session-chat-sheet fixed inset-x-0 bottom-0 z-[47] flex flex-col border shadow-2xl overflow-hidden
              h-[min(78dvh,560px)] max-h-[78dvh] min-h-0 rounded-t-2xl
              lg:inset-auto lg:right-6 lg:bottom-24 lg:left-auto lg:w-[380px] lg:h-[min(560px,78dvh)] lg:max-h-[78dvh] lg:rounded-2xl"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
            role="dialog"
            aria-label="장중 실시간 시황방"
          >
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
                onClick={() => setPanelOpen(false)}
                className="p-2 rounded-lg"
                style={{ color: "var(--muted)" }}
                aria-label="닫기"
              >
                <X size={20} />
              </button>
            </div>

            <div
              ref={listRef}
              className="session-chat-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 py-3 space-y-2.5"
              style={{ background: "var(--bg)", WebkitOverflowScrolling: "touch" }}
            >
              {!sessionOpen && (
                <div className="text-center py-10 px-4">
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    지금은 장이 열려 있지 않습니다
                  </p>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>
                    {closedLabel}
                  </p>
                </div>
              )}

              {sessionOpen && loading && messages.length === 0 && (
                <p className="text-center text-xs py-8" style={{ color: "var(--muted)" }}>
                  시황방 연결 중…
                </p>
              )}

              {sessionOpen && messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2 items-start ${m.is_mine ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: m.is_mine ? "var(--mint)" : "var(--card)",
                      color: m.is_mine ? "var(--on-accent)" : "var(--accent)",
                      border: m.is_mine ? "none" : "1px solid var(--border)",
                    }}
                  >
                    {m.nick.slice(0, 2)}
                  </div>
                  <div className={`min-w-0 flex-1 ${m.is_mine ? "text-right" : ""}`}>
                    <div className={`flex items-baseline gap-2 flex-wrap ${m.is_mine ? "justify-end" : ""}`}>
                      <span className="text-[11px] font-semibold" style={{ color: "var(--text)" }}>
                        {m.nick}
                      </span>
                      <time className="text-[10px]" style={{ color: "var(--muted)" }}>
                        {formatTime(m.at)}
                      </time>
                    </div>
                    <p
                      className="text-[13px] leading-snug mt-0.5 rounded-xl px-3 py-2 inline-block text-left max-w-[92%]"
                      style={{
                        background: m.is_mine ? "rgba(var(--mint-rgb),0.15)" : "var(--card)",
                        color: "var(--text)",
                        border: m.is_mine ? "1px solid rgba(var(--mint-rgb),0.25)" : "none",
                      }}
                    >
                      {m.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {sessionOpen && (
              <div
                className="px-3 py-2.5 border-t shrink-0"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                {!loaded ? (
                  <p className="text-center text-[11px] py-2" style={{ color: "var(--muted)" }}>
                    확인 중…
                  </p>
                ) : user ? (
                  <>
                    <div className="flex gap-2 items-end">
                      <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            void submitMessage();
                          }
                        }}
                        rows={2}
                        maxLength={200}
                        placeholder="장중 시황을 남겨보세요 (2~200자)"
                        className="flex-1 resize-none rounded-xl px-3 py-2 text-[13px] outline-none border"
                        style={{
                          background: "var(--bg)",
                          color: "var(--text)",
                          borderColor: "var(--border)",
                        }}
                      />
                      <button
                        type="button"
                        disabled={submitting || draft.trim().length < 2}
                        onClick={() => void submitMessage()}
                        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-40"
                        style={{ background: "var(--mint)", color: "var(--on-accent)" }}
                        aria-label="보내기"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                    {submitErr && (
                      <p className="text-[10px] mt-1.5" style={{ color: "var(--down)" }}>
                        {submitErr}
                      </p>
                    )}
                    <p className="text-[10px] mt-1" style={{ color: "var(--muted)" }}>
                      익명 닉네임으로 표시됩니다 · {draft.trim().length}/200
                    </p>
                  </>
                ) : (
                  <div className="py-1">
                    <div
                      className="rounded-xl px-3 py-3 mb-3 text-center"
                      style={{ background: "rgba(var(--mint-rgb),0.08)", border: "1px solid rgba(var(--mint-rgb),0.2)" }}
                    >
                      <p className="text-[13px] font-semibold" style={{ color: "var(--text)" }}>
                        채팅하려면 로그인이 필요합니다
                      </p>
                      <p className="text-[11px] mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>
                        회원가입 또는 로그인 후 장중 시황을 남길 수 있습니다.
                        <br />
                        읽기는 로그인 없이 가능합니다.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => loginWithOAuth("google")}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border mb-2 text-[13px] font-semibold"
                      style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
                    >
                      <LogIn size={16} />
                      Google로 로그인
                    </button>
                    <button
                      type="button"
                      onClick={() => loginWithOAuth("kakao")}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl mb-2 text-[13px] font-semibold"
                      style={{ background: "#FEE500", color: "#3C1E1E" }}
                    >
                      카카오로 로그인
                    </button>
                    <button
                      type="button"
                      onClick={loginWithNaver}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl mb-3 text-[13px] font-semibold"
                      style={{ background: "#03C75A", color: "#fff" }}
                    >
                      네이버로 로그인
                    </button>
                    <Link
                      href="/more"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-semibold no-underline"
                      style={{ background: "var(--mint)", color: "var(--on-accent)" }}
                      onClick={() => setPanelOpen(false)}
                    >
                      <UserPlus size={16} />
                      이메일 회원가입 · 로그인
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

function formatTime(ms: number): string {
  return new Date(ms).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
}
