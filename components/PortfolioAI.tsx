"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Send, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { AdGateModal } from "@/components/AdGateModal";
import { useAuth } from "@/hooks/useAuth";
import { useLocaleCode } from "@/contexts/LocaleContext";

type LiveQ = { symbol: string; price: number; changePercent: number };

type HoldingInput = {
  symbol:   string;
  shares:   number;
  avgCost:  number;
};

type Message = { role: "user" | "assistant"; content: string };

const CHIPS_KO = [
  "내 포트 현재 상태 요약해줘",
  "오늘 왜 떨어졌어?",
  "오늘 왜 올랐어?",
  "가장 손실 큰 종목이 뭐야?",
  "종목 비중이 너무 편향된 거 아냐?",
  "리밸런싱 해야 할까?",
];
const CHIPS_EN = [
  "Summarize my portfolio",
  "Why did it drop today?",
  "Why did it rise today?",
  "What's my biggest loser?",
  "Is my allocation too concentrated?",
  "Should I rebalance?",
];

const DAILY_KEY = () => {
  const d = new Date();
  return `pf_ai_count_${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
/** 광고 없이 무료로 쓸 수 있는 1일 첫 사용 횟수 */
const FREE_USES = 1;
/** Pro 일일 한도 */
const PRO_LIMIT = 30;

export function PortfolioAI({
  holdings,
  liveMap,
  usdkrw,
}: {
  holdings: HoldingInput[];
  liveMap:  Record<string, LiveQ>;
  usdkrw:   number;
}) {
  const { user } = useAuth();
  const isPro = user?.isPro === true;
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const CHIPS = isKo ? CHIPS_KO : CHIPS_EN;

  const [messages,        setMessages]        = useState<Message[]>([]);
  const [input,           setInput]           = useState("");
  const [loading,         setLoading]         = useState(false);
  const [count,           setCount]           = useState(0);
  const [showAdGate,      setShowAdGate]      = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const [collapsed,       setCollapsed]       = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(DAILY_KEY());
      setCount(v ? parseInt(v, 10) : 0);
    } catch {}
  }, []);

  // 페이지 점프 없이 채팅 컨테이너 내부만 스크롤
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Pro: 하루 PRO_LIMIT 하드캡. 비Pro: 첫 1회 무료, 이후 매번 광고 필요 (무제한)
  const limitReached = isPro && count >= PRO_LIMIT;
  const remaining    = isPro ? Math.max(0, PRO_LIMIT - count) : 0;
  // 비Pro에서 첫 1회 이후는 광고 게이트 필요
  const needsAdGate  = !isPro && count >= FREE_USES;

  function buildCtx() {
    const totalValue  = holdings.reduce((s, h) => s + h.shares * (liveMap[h.symbol]?.price ?? h.avgCost), 0);
    const totalCost   = holdings.reduce((s, h) => s + h.shares * h.avgCost, 0);
    const totalPnlPct = totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;

    const enriched = holdings.map((h) => {
      const price        = liveMap[h.symbol]?.price ?? h.avgCost;
      const dayChangePct = liveMap[h.symbol]?.changePercent ?? 0;
      const value        = h.shares * price;
      const costBasis    = h.shares * h.avgCost;
      const pnlPct       = costBasis > 0 ? ((value - costBasis) / costBasis) * 100 : 0;
      const weightPct    = totalValue > 0 ? (value / totalValue) * 100 : 0;
      return { symbol: h.symbol, shares: h.shares, avgCost: h.avgCost, currentPrice: price, value, costBasis, pnlPct, dayChangePct, weightPct };
    });

    return { holdings: enriched, totalValue, totalCost, totalPnlPct, usdkrw, isPro };
  }

  const ask = async (q: string, opts?: { fetchNews?: boolean; skipAdGate?: boolean }) => {
    const trimmed = q.trim();
    if (!trimmed || loading || limitReached || holdings.length === 0) return;

    // 비Pro 두 번째 사용부터 광고 게이트
    if (needsAdGate && !opts?.skipAdGate) {
      setPendingQuestion(trimmed);
      setShowAdGate(true);
      return;
    }

    const userMsg: Message = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res  = await fetch("/api/portfolio-ai", {
        method:  "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          question: trimmed,
          ...buildCtx(),
          history: messages.slice(-4),
          locale: localeCode,
          ...(opts?.fetchNews ? { fetchNews: true } : {}),
        }),
      });
      const data = await res.json() as { answer?: string };
      const answer = data.answer ?? (isKo ? "응답을 받지 못했습니다." : "No response received.");
      setMessages([...next, { role: "assistant", content: answer }]);

      const newCount = count + 1;
      setCount(newCount);
      try { localStorage.setItem(DAILY_KEY(), String(newCount)); } catch {}
    } catch {
      setMessages([...next, { role: "assistant", content: isKo ? "오류가 발생했습니다. 잠시 후 다시 시도해주세요." : "An error occurred. Please try again shortly." }]);
    }
    setLoading(false);
  };

  if (holdings.length === 0) return null;

  return (
    // 데스크탑에서 flex-col + 고정 높이로 오른쪽 바의 상당 부분을 점유
    <div className="rounded-2xl border overflow-hidden flex flex-col lg:min-h-[700px]"
      style={{ background: "var(--card)", borderColor: "rgba(var(--mint-rgb),0.2)" }}>

      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b flex-shrink-0 flex items-center justify-between"
        style={{ borderColor: "rgba(var(--mint-rgb),0.1)", background: "rgba(var(--mint-rgb),0.03)" }}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: "var(--mint)" }} />
          <p className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>{isKo ? "나만의 AI 투자비서" : "My AI Portfolio Advisor"}</p>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: "rgba(var(--mint-rgb),0.15)", color: "var(--mint)" }}>
            {isPro ? "Pro" : "Claude"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!collapsed && !limitReached && (
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>
              {isKo
                ? (isPro ? `오늘 ${remaining}/${PRO_LIMIT}회` : needsAdGate ? "광고 후 무제한" : "첫 1회 무료")
                : (isPro ? `${remaining}/${PRO_LIMIT} today` : needsAdGate ? "Ad · unlimited" : "1st free")}
            </span>
          )}
          <button onClick={() => setCollapsed((v) => !v)}
            className="p-1 rounded-lg transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}>
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {!collapsed && (
        // 내부도 flex-col + flex-1로 남은 높이 꽉 채움
        <div className="flex flex-col flex-1 min-h-0">
          {/* 소개 문구 — 대화 없을 때만 */}
          {messages.length === 0 && (
            <div className="px-4 py-3 border-b flex-shrink-0" style={{ borderColor: "rgba(var(--mint-rgb),0.08)" }}>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {isKo
                  ? (isPro
                    ? `내 종목·수익률·비중을 알고 있어요. Pro는 하루 ${PRO_LIMIT}회까지 이용할 수 있어요.`
                    : "내 종목·수익률·비중을 모두 알고 있어요. 첫 1회 무료 · 이후 짧은 광고 시청 후 무제한.")
                  : (isPro
                    ? `I know your holdings, returns, and weights. Pro members get up to ${PRO_LIMIT} analyses per day.`
                    : "I know your holdings, returns, and weights. First ask is free · Unlimited after a short ad.")}
              </p>
            </div>
          )}

          {/* 빠른 질문 칩 — 항상 가로 스크롤, 줄바꿈 없음 */}
          {!limitReached && (
            <div className="flex gap-2 px-4 pt-3 pb-2 overflow-x-auto no-scrollbar flex-shrink-0">
              {CHIPS.map((chip) => (
                <button key={chip} onClick={() => ask(chip)} disabled={loading}
                  className="flex-shrink-0 text-[11px] px-3 py-1.5 rounded-full border transition-all active:opacity-60 disabled:opacity-40"
                  style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--muted)", whiteSpace: "nowrap" }}>
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* 대화 영역 — 모바일 max-h-[55vh], 데스크탑 flex-1으로 남은 공간 꽉 채움 */}
          <div ref={chatRef}
            className="px-4 py-3 space-y-4 overflow-y-auto max-h-[55vh] lg:max-h-none lg:flex-1">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(var(--mint-rgb),0.15)", color: "var(--mint)" }}>✦</div>
                  )}
                  <div className="max-w-[80%] rounded-2xl px-3.5 py-2.5"
                    style={m.role === "user"
                      ? { background: "var(--mint)", color: "var(--on-accent)" }
                      : { background: "rgba(var(--mint-rgb),0.06)", border: "1px solid rgba(var(--mint-rgb),0.12)", color: "var(--text)" }}>
                    <p className="text-[12px] leading-relaxed whitespace-pre-line">{m.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: "rgba(var(--mint-rgb),0.15)", color: "var(--mint)" }}>✦</div>
                  <div className="rounded-2xl px-3.5 py-3"
                    style={{ background: "rgba(var(--mint-rgb),0.06)", border: "1px solid rgba(var(--mint-rgb),0.12)" }}>
                    <div className="flex gap-1.5 items-center">
                      {[0, 150, 300].map((d) => (
                        <div key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                          style={{ background: "var(--mint)", animationDelay: `${d}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

          {/* Pro 하드캡 도달 */}
          {limitReached ? (
            <div className="px-4 py-5 flex flex-col items-center gap-3 text-center flex-shrink-0 border-t"
              style={{ borderColor: "rgba(var(--mint-rgb),0.1)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{ background: "rgba(var(--mint-rgb),0.08)" }}>✦</div>
              <div>
                <p className="text-sm font-bold mb-0.5" style={{ color: "var(--text)" }}>
                  {isKo ? `오늘 Pro 분석 ${PRO_LIMIT}회 소진` : `Pro limit reached (${PRO_LIMIT}/day)`}
                </p>
                <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                  {isKo ? "내일 다시 이용할 수 있어요" : "Come back tomorrow"}
                </p>
              </div>
              <p className="text-[9px]" style={{ color: "var(--muted)" }}>{isKo ? "투자 참고용 · 투자 권유 아님" : "For reference only · Not investment advice"}</p>
            </div>
          ) : (
            <div className="px-4 py-3 border-t flex-shrink-0" style={{ borderColor: "rgba(var(--mint-rgb),0.1)" }}>
              <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border"
                style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && ask(input)}
                  placeholder={isKo ? "내 포트폴리오에 대해 뭐든 물어보세요" : "Ask anything about my portfolio"}
                  className="flex-1 text-[13px] bg-transparent outline-none"
                  style={{ color: "var(--text)" }}
                />
                <button onClick={() => ask(input)} disabled={!input.trim() || loading}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-opacity disabled:opacity-30"
                  style={{ background: "var(--mint)" }}>
                  <Send className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
              <p className="text-[9px] text-center mt-1.5" style={{ color: "var(--muted)" }}>
                {isKo ? "투자 참고용 · 투자 권유 아님" : "For reference only · Not investment advice"}
              </p>
            </div>
          )}
        </div>
      )}

      {showAdGate && (
        <AdGateModal
          title={isKo ? "AI 투자비서 이용" : "AI Portfolio Advisor"}
          headerText={isKo ? "짧은 광고 후 무제한 이용" : "Watch a short ad · Unlimited use"}
          confirmText={isKo ? "질문하기" : "Ask"}
          onConfirm={() => {
            setShowAdGate(false);
            if (pendingQuestion) {
              const q = pendingQuestion;
              setPendingQuestion(null);
              ask(q, { skipAdGate: true });
            }
          }}
          onClose={() => {
            setShowAdGate(false);
            setPendingQuestion(null);
          }}
        />
      )}
    </div>
  );
}
