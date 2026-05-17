"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type NotiKey =
  | "market_open"
  | "market_close"
  | "report_publish"
  | "like_comment"
  | "new_subscriber"
  | "price_alert";

type NotiConfig = {
  key: NotiKey;
  emoji: string;
  label: string;
  desc: string;
  color: string;
};

const NOTIFICATIONS: NotiConfig[] = [
  {
    key:   "market_open",
    emoji: "🔔",
    label: "장 시작 알림",
    desc:  "미국 주식 시장 개장 (오전 10:30 KST)",
    color: "#00e5a0",
  },
  {
    key:   "market_close",
    emoji: "🔕",
    label: "장 마감 알림",
    desc:  "미국 주식 시장 마감 (오전 5:00 KST)",
    color: "#60a5fa",
  },
  {
    key:   "report_publish",
    emoji: "📋",
    label: "리포트 발행 알림",
    desc:  "Investus 새 리포트·인사이트 업데이트",
    color: "#c084fc",
  },
  {
    key:   "like_comment",
    emoji: "💬",
    label: "좋아요·댓글 알림",
    desc:  "내 게시글에 좋아요·댓글이 달릴 때",
    color: "#fb923c",
  },
  {
    key:   "new_subscriber",
    emoji: "⭐",
    label: "구독 알림",
    desc:  "내 크리에이터 채널 신규 구독자",
    color: "#fbbf24",
  },
  {
    key:   "price_alert",
    emoji: "📈",
    label: "가격 알림",
    desc:  "관심종목 목표가 도달 시 알림 (준비 중)",
    color: "#f472b6",
  },
];

const STORAGE_KEY = "investus_notifications";

function loadPrefs(): Record<NotiKey, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {
    market_open:     true,
    market_close:    false,
    report_publish:  true,
    like_comment:    true,
    new_subscriber:  true,
    price_alert:     false,
  };
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200"
      style={{ background: on ? "var(--mint)" : "rgba(255,255,255,0.1)" }}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-200"
        style={{
          background: on ? "#000" : "rgba(255,255,255,0.5)",
          left: on ? "calc(100% - 1.375rem)" : "0.125rem",
        }}
      />
    </button>
  );
}

export default function NotificationsPage() {
  const router = useRouter();
  const [prefs, setPrefs]   = useState<Record<NotiKey, boolean> | null>(null);
  const [granted, setGranted] = useState<boolean | null>(null);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    setPrefs(loadPrefs());
    if (typeof Notification !== "undefined") {
      setGranted(Notification.permission === "granted");
    }
  }, []);

  const update = (key: NotiKey, val: boolean) => {
    setPrefs((prev) => {
      if (!prev) return prev;
      const next = { ...prev, [key]: val };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const requestPermission = async () => {
    if (typeof Notification === "undefined") return;
    setRequesting(true);
    const result = await Notification.requestPermission();
    setGranted(result === "granted");
    setRequesting(false);
  };

  if (!prefs) return null;

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-24 lg:pb-10">
        <div className="pt-4 pb-2">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-xs mb-4"
            style={{ color: "var(--muted)" }}
          >
            <ChevronLeft className="w-3.5 h-3.5" /> 뒤로
          </button>
          <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>알림 설정</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>원하는 알림만 골라서 받으세요</p>
        </div>

        {/* 브라우저 알림 권한 배너 */}
        {granted === false && (
          <div
            className="rounded-2xl p-4 mb-4 border"
            style={{ background: "rgba(251,191,36,0.06)", borderColor: "rgba(251,191,36,0.2)" }}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">🔔</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold mb-0.5" style={{ color: "var(--text)" }}>
                  알림 권한이 필요합니다
                </p>
                <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                  장 시작·리포트 알림을 받으려면 브라우저 알림 권한을 허용해주세요.
                </p>
                <button
                  onClick={requestPermission}
                  disabled={requesting}
                  className="text-xs font-bold px-4 py-2 rounded-xl disabled:opacity-50 transition-opacity"
                  style={{ background: "#fbbf24", color: "#000" }}
                >
                  {requesting ? "요청 중..." : "알림 허용하기"}
                </button>
              </div>
            </div>
          </div>
        )}

        {granted === true && (
          <div
            className="rounded-xl px-3 py-2 mb-4 flex items-center gap-2"
            style={{ background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.15)" }}
          >
            <span className="text-sm">✅</span>
            <p className="text-[11px]" style={{ color: "var(--mint)" }}>브라우저 알림 권한이 허용되어 있습니다.</p>
          </div>
        )}

        {/* 알림 목록 */}
        <div
          className="rounded-2xl border overflow-hidden mb-4"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          {NOTIFICATIONS.map((noti, idx) => {
            const isLast = idx === NOTIFICATIONS.length - 1;
            const isComingSoon = noti.key === "price_alert";
            return (
              <div
                key={noti.key}
                className={`flex items-center gap-3 px-4 py-3.5 ${!isLast ? "border-b" : ""}`}
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                  style={{ background: `${noti.color}14` }}
                >
                  {noti.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{noti.label}</p>
                    {isComingSoon && (
                      <span
                        className="text-[8px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.08)", color: "var(--muted)" }}
                      >
                        준비 중
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>{noti.desc}</p>
                </div>
                <Toggle
                  on={!isComingSoon && prefs[noti.key]}
                  onChange={(v) => !isComingSoon && update(noti.key, v)}
                />
              </div>
            );
          })}
        </div>

        {/* 안내 */}
        <div
          className="rounded-xl px-4 py-3 border"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}
        >
          <p className="text-[10px] leading-relaxed" style={{ color: "var(--muted)" }}>
            · 알림은 브라우저 또는 PWA 앱 설치 시 수신됩니다.{"\n"}
            · 장시작·장마감 알림은 미국 동부 시간 기준으로 발송됩니다.{"\n"}
            · 가격 알림 기능은 곧 출시 예정입니다.
          </p>
        </div>

        <p className="text-center text-[10px] mt-6" style={{ color: "var(--muted)" }}>
          Investus · investus.kr
        </p>
      </main>
    </div>
  );
}
