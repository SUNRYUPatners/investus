"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Send, X, Users } from "lucide-react";
import type { MarketId } from "@/lib/markets/types";
import { getMarketConfig } from "@/lib/markets/config";
import { isSessionChatOpen, sessionChatSupported } from "@/lib/markets/sessionChatOpen";
import type { SessionChatMessage } from "@/lib/sessionChat/types";
import { sessionChatAuthHeaders } from "@/lib/sessionChat/authHeaders";
import { getOrCreateGuestId } from "@/lib/sessionChat/guestId";
import { humanizeKrCodesInText } from "@/lib/sessionChat/labels";
import { useAuth } from "@/hooks/useAuth";

const MAX_MESSAGES = 80;
const READ_KEY = (market: MarketId) => `investus-session-chat-read-${market}`;

export function SessionChatWidget({ market }: { market: MarketId }) {
  const { user, loaded, loginWithOAuth } = useAuth();
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
  const replyTimersRef = useRef<number[]>([]);
  const cfg = getMarketConfig(market);

  const supported = sessionChatSupported(market);

  useEffect(() => {
    panelOpenRef.current = panelOpen;
  }, [panelOpen]);

  useEffect(() => {
    getOrCreateGuestId();
    return () => {
      for (const id of replyTimersRef.current) window.clearTimeout(id);
      replyTimersRef.current = [];
    };
  }, []);

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

    if (initial) setLoading(true);
    try {
      const since = initial
        ? (isOpen ? Date.now() - 8 * 60_000 : Date.now() - 24 * 60 * 60_000)
        : sinceRef.current;
      const res = await fetch(`/api/session-chat?market=${market}&since=${since}`, {
        cache: "no-store",
        headers: await sessionChatAuthHeaders(),
      });
      if (!res.ok) return;
      const data = await res.json() as {
        open: boolean;
        messages: SessionChatMessage[];
        online?: number;
        pollMs?: number;
      };
      setSessionOpen(data.open);

      if (data.open && data.online) setOnline(data.online);
      if (!data.open) setOnline(0);

      if (data.messages?.length) {
        const latestAt = Math.max(...data.messages.map((m) => m.at));

        if (data.open && !panelOpenRef.current) {
          let readAt = 0;
          try {
            readAt = Number(localStorage.getItem(READ_KEY(market)) ?? "0");
          } catch { /* ignore */ }
          if (latestAt > readAt) {
            const newCount = data.messages.filter((m) => m.at > readAt && !m.is_mine).length;
            if (newCount > 0) {
              setUnread((u) => Math.min(99, u + newCount));
              setHasNewPulse(true);
            }
          }
        }

        setMessages((prev) => {
          const map = new Map(prev.map((m) => [m.id, m]));
          for (const m of data.messages) map.set(m.id, m);
          const merged = [...map.values()].sort((a, b) => a.at - b.at);
          return merged.slice(-MAX_MESSAGES);
        });

        const last = data.messages[data.messages.length - 1];
        if (last && data.open) {
          sinceRef.current = last.at;
          lastMsgAtRef.current = last.at;
        }
      } else if (initial) {
        setMessages([]);
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

  // 장중: 백그라운드 폴링 · 마감: 패널 열릴 때만 이력 로드
  useEffect(() => {
    if (!supported) return;
    if (!sessionOpen && !panelOpen) return;

    sinceRef.current = sessionOpen ? Date.now() - 8 * 60_000 : Date.now() - 24 * 60 * 60_000;
    void poll(true);
    if (!sessionOpen) return;

    const id = setInterval(() => void poll(false), 8_000);
    return () => clearInterval(id);
  }, [poll, sessionOpen, supported, panelOpen]);

  useEffect(() => {
    if (panelOpen) {
      markRead();
      scrollToBottom();
    }
  }, [messages, panelOpen, markRead, scrollToBottom]);

  const scheduleBotReplies = useCallback((replies: SessionChatMessage[]) => {
    const now = Date.now();
    for (const reply of replies) {
      const delay = Math.max(0, reply.at - now);
      const timerId = window.setTimeout(() => {
        setMessages((prev) => {
          if (prev.some((m) => m.id === reply.id)) return prev;
          return [...prev, reply].sort((a, b) => a.at - b.at).slice(-MAX_MESSAGES);
        });
        requestAnimationFrame(scrollToBottom);
      }, delay);
      replyTimersRef.current.push(timerId);
    }
  }, [scrollToBottom]);

  const submitMessage = async () => {
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
        body: JSON.stringify({ market, content, guestId: getOrCreateGuestId() }),
      });
      const data = await res.json() as {
        message?: SessionChatMessage;
        botReplies?: SessionChatMessage[];
        error?: string;
      };
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
        if (data.botReplies?.length) scheduleBotReplies(data.botReplies);
      }
    } catch {
      setSubmitErr("네트워크 오류");
    } finally {
      setSubmitting(false);
    }
  };

  if (!supported) return null;

  const closedHint = market === "us"
    ? "미국 장 마감 — 채팅은 장중에만 가능합니다"
    : "한국 장 마감 — 채팅은 장중에만 가능합니다";

  const showPulse = sessionOpen && (unread > 0 || hasNewPulse);

  return (
    <>
      {/* FAB — 패널 열리면 숨김 (헤더 X로 닫기) */}
      {!panelOpen && (
        <div className="session-chat-fab-host">
          <div className="session-chat-fab-inner">
            <div className="flex flex-col items-end gap-1.5 pointer-events-auto">
              <span
                className={`session-chat-fab-label ${
                  sessionOpen ? "session-chat-fab-label--live" : "session-chat-fab-label--idle"
                }`}
              >
                {sessionOpen ? (
                  <>
                    <span className="session-chat-fab-live-dot" aria-hidden />
                    실시간 시황 토크중
                  </>
                ) : (
                  "지난 시황 보기"
                )}
              </span>
              <div
                className={`relative ${sessionOpen ? "session-chat-fab-glow-wrap" : ""} ${
                  showPulse ? "session-chat-fab-pulse" : ""
                }`}
              >
                {sessionOpen && <span className="session-chat-fab-sweep" aria-hidden />}
                {showPulse && (
                  <span
                    className="absolute inset-0 rounded-full session-chat-ring pointer-events-none"
                    aria-hidden
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    setPanelOpen(true);
                    markRead();
                  }}
                  aria-label={sessionOpen ? "실시간 시황 토크 열기" : "지난 시황 보기"}
                  className="relative flex items-center justify-center rounded-full shadow-lg border transition-transform active:scale-95 w-[52px] h-[52px]"
                  style={{
                    background: sessionOpen ? "var(--accent)" : "var(--card)",
                    borderColor: sessionOpen ? "rgba(var(--mint-rgb),0.5)" : "var(--border)",
                    color: sessionOpen ? "#fff" : "var(--muted)",
                  }}
                >
                  <span className="text-[22px] leading-none" aria-hidden>
                    💬
                  </span>
                  {unread > 0 && (
                    <span
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold leading-[18px] text-center text-white"
                      style={{ background: "var(--down)" }}
                    >
                      {unread > 99 ? "99+" : unread}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
              h-[min(78dvh,560px)] max-h-[78dvh] min-h-0 rounded-t-2xl max-lg:pb-[env(safe-area-inset-bottom,0px)]
              lg:left-auto lg:right-6 lg:bottom-[calc(58px+16px+env(safe-area-inset-bottom,0px))] lg:w-[380px] lg:h-[min(560px,78dvh)] lg:max-h-[78dvh] lg:rounded-2xl"
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
                <div
                  className="rounded-xl px-3 py-2 mb-1 text-center text-[11px] leading-relaxed"
                  style={{
                    background: "rgba(var(--mint-rgb),0.06)",
                    color: "var(--muted)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {closedHint} · 아래는 최근 24시간 대화입니다
                </div>
              )}

              {loading && messages.length === 0 && (
                <p className="text-center text-xs py-8" style={{ color: "var(--muted)" }}>
                  대화 불러오는 중…
                </p>
              )}

              {!loading && messages.length === 0 && (
                <p className="text-center text-xs py-8" style={{ color: "var(--muted)" }}>
                  {sessionOpen ? "아직 대화가 없습니다. 첫 시황을 남겨보세요." : "최근 대화 기록이 없습니다."}
                </p>
              )}

              {messages.map((m) => (
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
                      {market === "kr" ? humanizeKrCodesInText(m.content) : m.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="px-3 py-2.5 border-t shrink-0"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              {!sessionOpen ? (
                <p className="text-center text-[11px] py-2 leading-relaxed" style={{ color: "var(--muted)" }}>
                  {closedHint}
                </p>
              ) : !loaded ? (
                <p className="text-center text-[11px] py-2" style={{ color: "var(--muted)" }}>
                  확인 중…
                </p>
              ) : (
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
                    {user
                      ? `${user.nickname}(으)로 표시됩니다`
                      : "익명 번호로 표시됩니다"}
                    {" · "}
                    {draft.trim().length}/200
                  </p>
                  {!user && (
                    <p className="text-[10px] mt-1.5 text-center" style={{ color: "var(--muted)" }}>
                      로그인하면{" "}
                      <button
                        type="button"
                        onClick={() => loginWithOAuth("google")}
                        className="underline font-semibold"
                        style={{ color: "var(--mint)" }}
                      >
                        프로필 닉네임
                      </button>
                      으로 표시돼요
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

function formatTime(ms: number): string {
  return new Date(ms).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
}
