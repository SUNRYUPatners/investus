"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocaleCode } from "@/contexts/LocaleContext";

type NotiKey =
  | "market_open"
  | "market_close"
  | "report_publish"
  | "like_comment"
  | "new_subscriber"
  | "price_alert";

type NotiConfig = {
  key:   NotiKey;
  emoji: string;
  label: string;
  desc:  string;
  color: string;
  pushEnabled?: boolean;
  comingSoon?: boolean;
};

const NOTIFICATIONS_KO: NotiConfig[] = [
  { key: "market_open",    emoji: "🔔", label: "장 시작 알림",      desc: "미국 주식 시장 개장 (오전 10:30 KST)", color: "#10b981", pushEnabled: true },
  { key: "market_close",   emoji: "🔕", label: "장 마감 알림",      desc: "미국 주식 시장 마감 (오전 5:00 KST)",  color: "#60a5fa" },
  { key: "report_publish", emoji: "📋", label: "리포트 업데이트 알림", desc: "Investus 새 리포트·인사이트 발행 시 즉시 알림", color: "#c084fc", pushEnabled: true },
  { key: "like_comment",   emoji: "💬", label: "좋아요·댓글 알림",   desc: "내 게시글에 좋아요·댓글이 달릴 때",    color: "#fb923c" },
  { key: "new_subscriber", emoji: "⭐", label: "구독 알림",          desc: "내 크리에이터 채널 신규 구독자",       color: "#fbbf24" },
  { key: "price_alert",    emoji: "📈", label: "가격 알림",          desc: "관심종목 목표가 도달 시 알림 (준비 중)", color: "#f472b6", comingSoon: true },
];

const NOTIFICATIONS_EN: NotiConfig[] = [
  { key: "market_open",    emoji: "🔔", label: "Market Open Alert",   desc: "US stock market opens (9:30 AM ET)",        color: "#10b981", pushEnabled: true },
  { key: "market_close",   emoji: "🔕", label: "Market Close Alert",  desc: "US stock market closes (4:00 PM ET)",       color: "#60a5fa" },
  { key: "report_publish", emoji: "📋", label: "Report Update Alert", desc: "Instant alert when new Investus reports publish", color: "#c084fc", pushEnabled: true },
  { key: "like_comment",   emoji: "💬", label: "Likes & Comments",    desc: "When your posts receive likes or comments", color: "#fb923c" },
  { key: "new_subscriber", emoji: "⭐", label: "New Subscriber",      desc: "New subscriber on your creator channel",    color: "#fbbf24" },
  { key: "price_alert",    emoji: "📈", label: "Price Alert",         desc: "Alert when watchlist reaches target price (coming soon)", color: "#f472b6", comingSoon: true },
];

const STORAGE_KEY = "investus_notifications";

function loadPrefs(): Record<NotiKey, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {
    market_open: true, market_close: false, report_publish: true,
    like_comment: true, new_subscriber: true, price_alert: false,
  };
}

async function subscribePush(): Promise<PushSubscription | null> {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return null;
  const reg = await navigator.serviceWorker.ready;
  const existing = await reg.pushManager.getSubscription();
  if (existing) return existing;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
  const raw = atob(publicKey.replace(/-/g, "+").replace(/_/g, "/"));
  const appServerKey = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) appServerKey[i] = raw.charCodeAt(i);
  return reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: appServerKey });
}

async function unsubscribePush(): Promise<void> {
  if (!("serviceWorker" in navigator)) return;
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  if (sub) {
    await fetch("/api/push/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ endpoint: sub.endpoint }),
    });
    await sub.unsubscribe();
  }
}

function Toggle({ on, onChange, disabled }: { on: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      onClick={() => !disabled && onChange(!on)}
      disabled={disabled}
      className="relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 disabled:opacity-40"
      style={{ background: on ? "var(--mint)" : "rgba(255,255,255,0.1)" }}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-200"
        style={{ background: on ? "#000" : "rgba(255,255,255,0.5)", left: on ? "calc(100% - 1.375rem)" : "0.125rem" }}
      />
    </button>
  );
}

export default function NotificationsPage() {
  const router  = useRouter();
  const locale  = useLocaleCode();
  const isKo    = locale === "ko";
  const NOTIFICATIONS = isKo ? NOTIFICATIONS_KO : NOTIFICATIONS_EN;

  const [prefs, setPrefs]             = useState<Record<NotiKey, boolean> | null>(null);
  const [granted, setGranted]         = useState<boolean | null>(null);
  const [requesting, setRequesting]   = useState(false);
  const [pushLoading, setPushLoading] = useState(false);
  const [pushStatus, setPushStatus]   = useState<"idle" | "ok" | "err">("idle");

  useEffect(() => {
    setPrefs(loadPrefs());
    if (typeof Notification !== "undefined") setGranted(Notification.permission === "granted");
  }, []);

  const requestPermission = async () => {
    if (typeof Notification === "undefined") return;
    setRequesting(true);
    const result = await Notification.requestPermission();
    setGranted(result === "granted");
    setRequesting(false);
  };

  const update = async (key: NotiKey, val: boolean) => {
    setPrefs((prev) => {
      if (!prev) return prev;
      const next = { ...prev, [key]: val };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
    const cfg = NOTIFICATIONS.find((n) => n.key === key);
    if (cfg?.pushEnabled) {
      if (val) {
        setPushLoading(true); setPushStatus("idle");
        try {
          if (Notification.permission !== "granted") {
            const perm = await Notification.requestPermission();
            setGranted(perm === "granted");
            if (perm !== "granted") { setPushLoading(false); return; }
          }
          const sub = await subscribePush();
          if (sub) {
            const res = await fetch("/api/push/subscribe", {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify(sub.toJSON()),
            });
            setPushStatus(res.ok ? "ok" : "err");
          }
        } catch { setPushStatus("err"); }
        finally { setPushLoading(false); }
      } else {
        setPushLoading(true);
        try { await unsubscribePush(); } catch { /* ignore */ }
        setPushLoading(false); setPushStatus("idle");
      }
    }
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
            <ChevronLeft className="w-3.5 h-3.5" /> {isKo ? "뒤로" : "Back"}
          </button>
          <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>
            {isKo ? "알림 설정" : "Notification Settings"}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
            {isKo ? "원하는 알림만 골라서 받으세요" : "Choose which notifications to receive"}
          </p>
        </div>

        {/* Permission banner */}
        {granted === false && (
          <div className="rounded-2xl p-4 mb-4 border" style={{ background: "rgba(251,191,36,0.06)", borderColor: "rgba(251,191,36,0.2)" }}>
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">🔔</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold mb-0.5" style={{ color: "var(--text)" }}>
                  {isKo ? "알림 권한이 필요합니다" : "Notification Permission Required"}
                </p>
                <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                  {isKo
                    ? "리포트·장 시작 알림을 받으려면 브라우저 알림 권한을 허용해주세요."
                    : "Allow browser notifications to receive report and market alerts."}
                </p>
                <button
                  onClick={requestPermission}
                  disabled={requesting}
                  className="text-xs font-bold px-4 py-2 rounded-xl disabled:opacity-50 transition-opacity"
                  style={{ background: "#fbbf24", color: "#000" }}
                >
                  {requesting
                    ? (isKo ? "요청 중..." : "Requesting...")
                    : (isKo ? "알림 허용하기" : "Allow Notifications")}
                </button>
              </div>
            </div>
          </div>
        )}

        {granted === true && (
          <div className="rounded-xl px-3 py-2 mb-4 flex items-center gap-2"
            style={{ background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.15)" }}>
            <span className="text-sm">✅</span>
            <p className="text-[11px]" style={{ color: "var(--mint)" }}>
              {isKo ? "브라우저 알림 권한이 허용되어 있습니다." : "Browser notification permission is granted."}
            </p>
          </div>
        )}

        {pushStatus === "ok" && (
          <div className="rounded-xl px-3 py-2 mb-4 flex items-center gap-2"
            style={{ background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.15)" }}>
            <span className="text-sm">📋</span>
            <p className="text-[11px]" style={{ color: "var(--mint)" }}>
              {isKo ? "리포트 업데이트 알림 구독 완료!" : "Report update notifications subscribed!"}
            </p>
          </div>
        )}
        {pushStatus === "err" && (
          <div className="rounded-xl px-3 py-2 mb-4 flex items-center gap-2"
            style={{ background: "rgba(255,77,109,0.08)", border: "1px solid rgba(255,77,109,0.2)" }}>
            <span className="text-sm">⚠️</span>
            <p className="text-[11px]" style={{ color: "#ef4444" }}>
              {isKo ? "구독 설정 중 오류가 발생했습니다. 다시 시도해주세요." : "An error occurred. Please try again."}
            </p>
          </div>
        )}

        {/* Notification list */}
        <div className="rounded-2xl border overflow-hidden mb-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          {NOTIFICATIONS.map((noti, idx) => {
            const isLast = idx === NOTIFICATIONS.length - 1;
            return (
              <div
                key={noti.key}
                className={`flex items-center gap-3 px-4 py-3.5 ${!isLast ? "border-b" : ""}`}
                style={{ borderColor: "var(--border)" }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                  style={{ background: `${noti.color}14` }}>
                  {noti.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{noti.label}</p>
                    {noti.comingSoon && (
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.08)", color: "var(--muted)" }}>
                        {isKo ? "준비 중" : "Soon"}
                      </span>
                    )}
                    {noti.pushEnabled && (
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: "rgba(192,132,252,0.15)", color: "#c084fc" }}>
                        PUSH
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>{noti.desc}</p>
                </div>
                <Toggle
                  on={!noti.comingSoon && prefs[noti.key]}
                  onChange={(v) => !noti.comingSoon && update(noti.key, v)}
                  disabled={noti.comingSoon || (pushLoading && !!noti.pushEnabled)}
                />
              </div>
            );
          })}
        </div>

        {/* Footer notes */}
        <div className="rounded-xl px-4 py-3 border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}>
          <p className="text-[10px] leading-relaxed whitespace-pre-line" style={{ color: "var(--muted)" }}>
            {isKo
              ? "· 알림은 브라우저 또는 PWA 앱 설치 시 수신됩니다.\n· 리포트 알림(PUSH)은 앱이 꺼져 있어도 실시간으로 전송됩니다.\n· 장시작·장마감 알림은 미국 동부 시간 기준으로 발송됩니다.\n· 가격 알림 기능은 곧 출시 예정입니다."
              : "· Notifications are received in your browser or installed PWA.\n· Report alerts (PUSH) are delivered even when the app is closed.\n· Market open/close alerts are sent based on US Eastern Time.\n· Price alert feature is coming soon."}
          </p>
        </div>

        <p className="text-center text-[10px] mt-6" style={{ color: "var(--muted)" }}>
          Investus · investus.kr
        </p>
      </main>
    </div>
  );
}
