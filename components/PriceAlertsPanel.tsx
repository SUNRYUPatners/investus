"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Lock, Plus, Trash2 } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

type AlertRow = {
  id: string;
  symbol: string;
  direction: "above" | "below";
  target: number;
  createdAt: number;
  firedAt: number | null;
};

async function authHeaders(): Promise<HeadersInit> {
  const { data: { session } } = await getSupabase().auth.getSession();
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (session?.access_token) h["Authorization"] = `Bearer ${session.access_token}`;
  return h;
}

async function ensurePushSubscription(): Promise<{
  endpoint: string;
  keys: { p256dh: string; auth: string };
} | null> {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return null;
  if (typeof Notification !== "undefined" && Notification.permission !== "granted") {
    const perm = await Notification.requestPermission();
    if (perm !== "granted") return null;
  }
  const reg = await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
    const raw = atob(publicKey.replace(/-/g, "+").replace(/_/g, "/"));
    const appServerKey = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) appServerKey[i] = raw.charCodeAt(i);
    sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: appServerKey });
  }
  const json = sub.toJSON();
  if (!json.endpoint || !json.keys?.p256dh || !json.keys?.auth) return null;
  await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(json),
  });
  return {
    endpoint: json.endpoint,
    keys: { p256dh: json.keys.p256dh, auth: json.keys.auth },
  };
}

export function PriceAlertsPanel({
  symbols,
  livePrices,
}: {
  /** 보유+관심 심볼 후보 */
  symbols: string[];
  livePrices: Record<string, number>;
}) {
  const { user } = useAuth();
  const isPro = user?.isPro === true;

  const [alerts, setAlerts] = useState<AlertRow[]>([]);
  const [max, setMax] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [symbol, setSymbol] = useState("");
  const [direction, setDirection] = useState<"above" | "below">("above");
  const [target, setTarget] = useState("");

  const refresh = useCallback(async () => {
    if (!isPro) return;
    try {
      const res = await fetch("/api/price-alerts", { headers: await authHeaders() });
      if (!res.ok) return;
      const data = await res.json() as { alerts: AlertRow[]; max: number };
      setAlerts(data.alerts ?? []);
      setMax(data.max ?? 10);
    } catch { /* ignore */ }
  }, [isPro]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!symbol && symbols.length > 0) setSymbol(symbols[0]);
  }, [symbols, symbol]);

  const add = async () => {
    setError("");
    const t = parseFloat(target);
    if (!symbol || !Number.isFinite(t) || t <= 0) {
      setError("종목과 목표가를 입력하세요");
      return;
    }
    setLoading(true);
    try {
      const push = await ensurePushSubscription();
      if (!push) {
        setError("브라우저 알림 권한이 필요합니다");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/price-alerts", {
        method: "POST",
        headers: await authHeaders(),
        body: JSON.stringify({
          symbol,
          direction,
          target: t,
          endpoint: push.endpoint,
          keys: push.keys,
        }),
      });
      const data = await res.json() as { error?: string; alert?: AlertRow };
      if (!res.ok) {
        const map: Record<string, string> = {
          limit_reached: `최대 ${max}개까지 설정할 수 있어요`,
          duplicate: "같은 종목·방향 알림이 이미 있어요",
          pro_required: "Pro 구독이 필요합니다",
          push_subscription_required: "푸시 구독이 필요합니다",
        };
        setError(map[data.error ?? ""] ?? "저장에 실패했습니다");
        setLoading(false);
        return;
      }
      setTarget("");
      await refresh();
    } catch {
      setError("네트워크 오류");
    }
    setLoading(false);
  };

  const remove = async (id: string) => {
    try {
      await fetch(`/api/price-alerts?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: await authHeaders(),
      });
      await refresh();
    } catch { /* ignore */ }
  };

  if (!user) return null;

  if (!isPro) {
    return (
      <div
        className="rounded-2xl border p-4"
        style={{ background: "var(--card)", borderColor: "rgba(244,114,182,0.25)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Bell className="w-4 h-4" style={{ color: "#f472b6" }} />
          <p className="text-sm font-bold" style={{ color: "var(--text)" }}>가격 알림</p>
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: "rgba(244,114,182,0.15)", color: "#f472b6" }}
          >
            Pro
          </span>
        </div>
        <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
          보유·관심 종목 목표가 도달 시 푸시로 알려드립니다. 종목당 상·하한가 각 1개.
        </p>
        <Link
          href="/subscribe"
          className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-2 rounded-xl"
          style={{ background: "var(--mint)", color: "var(--on-accent)", textDecoration: "none" }}
        >
          <Lock className="w-3.5 h-3.5" />
          Pro로 알림 설정
        </Link>
      </div>
    );
  }

  const active = alerts.filter((a) => !a.firedAt);
  const live = symbol ? livePrices[symbol] : undefined;

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "rgba(244,114,182,0.25)" }}
    >
      <div className="px-4 pt-4 pb-3 border-b flex items-center gap-2"
        style={{ borderColor: "rgba(244,114,182,0.12)" }}>
        <Bell className="w-4 h-4" style={{ color: "#f472b6" }} />
        <p className="text-sm font-bold" style={{ color: "var(--text)" }}>가격 알림</p>
        <span className="text-[10px] ml-auto" style={{ color: "var(--muted)" }}>
          {active.length}/{max}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="text-[12px] rounded-xl px-3 py-2 border outline-none"
            style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
          >
            {symbols.length === 0 && <option value="">종목 없음</option>}
            {symbols.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as "above" | "below")}
            className="text-[12px] rounded-xl px-3 py-2 border outline-none"
            style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
          >
            <option value="above">이상 돌파</option>
            <option value="below">이하 하회</option>
          </select>
          <input
            type="number"
            inputMode="decimal"
            placeholder={live ? `현재 $${live.toFixed(2)}` : "목표가 $"}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="flex-1 min-w-[100px] text-[12px] rounded-xl px-3 py-2 border outline-none"
            style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
          />
          <button
            onClick={() => void add()}
            disabled={loading || symbols.length === 0}
            className="inline-flex items-center gap-1 text-[12px] font-bold px-3 py-2 rounded-xl disabled:opacity-40"
            style={{ background: "rgba(244,114,182,0.2)", color: "#f472b6" }}
          >
            <Plus className="w-3.5 h-3.5" />
            추가
          </button>
        </div>

        {error && (
          <p className="text-[11px]" style={{ color: "#ef4444" }}>{error}</p>
        )}

        {alerts.length === 0 ? (
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>
            설정된 알림이 없습니다. 목표가 도달 시 푸시로 알려드립니다.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {alerts.map((a) => (
              <li
                key={a.id}
                className="flex items-center gap-2 rounded-xl px-3 py-2 border"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderColor: "var(--border)",
                  opacity: a.firedAt ? 0.55 : 1,
                }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold" style={{ color: "var(--text)" }}>
                    {a.symbol}{" "}
                    <span style={{ color: a.direction === "above" ? "var(--mint)" : "#ef4444" }}>
                      {a.direction === "above" ? "≥" : "≤"} ${a.target.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-[10px]" style={{ color: "var(--muted)" }}>
                    {a.firedAt ? "발송 완료" : "대기 중"}
                  </p>
                </div>
                <button
                  onClick={() => void remove(a.id)}
                  className="p-1.5 rounded-lg"
                  style={{ color: "var(--muted)" }}
                  aria-label="삭제"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
