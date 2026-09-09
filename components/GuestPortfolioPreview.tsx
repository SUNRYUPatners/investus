"use client";

import { Wallet } from "lucide-react";
import { openGuestLogin } from "@/lib/guestLogin";
import { useLocaleCode } from "@/contexts/LocaleContext";
import type { MarketId } from "@/lib/markets/types";

const SAMPLES: Record<MarketId, { symbol: string; name: string; change: number; value: string }[]> = {
  us: [
    { symbol: "NVDA", name: "NVIDIA", change: 1.82, value: "$12,480" },
    { symbol: "AAPL", name: "Apple", change: -0.41, value: "$8,210" },
    { symbol: "MSFT", name: "Microsoft", change: 0.63, value: "$6,940" },
  ],
  kr: [
    { symbol: "005930", name: "삼성전자", change: 0.94, value: "1,240만원" },
    { symbol: "000660", name: "SK하이닉스", change: 1.21, value: "860만원" },
    { symbol: "005380", name: "현대차", change: -0.32, value: "410만원" },
  ],
  safe: [
    { symbol: "BTC", name: "비트코인", change: 2.14, value: "$8,420" },
    { symbol: "ETH", name: "이더리움", change: 1.05, value: "$2,180" },
    { symbol: "GLD", name: "금", change: 0.28, value: "$3,050" },
  ],
  "kr-re": [
    { symbol: "APT", name: "수도권 아파트", change: 0.12, value: "9.4억" },
    { symbol: "JEONSE", name: "전세 지수", change: -0.08, value: "4.1억" },
    { symbol: "REIT", name: "리츠 예시", change: 0.41, value: "1,280만원" },
  ],
};

export function GuestPortfolioPreview({
  market,
  variant = "card",
}: {
  market: MarketId;
  variant?: "card" | "page";
}) {
  const locale = useLocaleCode();
  const isKo = locale === "ko";
  const rows = SAMPLES[market] ?? SAMPLES.us;

  const connect = () => {
    openGuestLogin();
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(var(--mint-rgb),0.12)" }}
          >
            <Wallet className="w-3 h-3" style={{ color: "var(--mint)" }} />
          </div>
          <span className="text-sm font-bold" style={{ color: "var(--text)" }}>
            {isKo ? "내 보유종목" : "My Holdings"}
          </span>
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: "rgba(var(--mint-rgb),0.14)", color: "var(--mint)" }}
          >
            {isKo ? "예시" : "SAMPLE"}
          </span>
        </div>
      </div>
      <p className="px-4 text-[11px] leading-relaxed mb-2" style={{ color: "var(--muted)" }}>
        {isKo
          ? "내 종목을 넣으면 매일 아침 AI가 이렇게 흐름을 정리합니다."
          : "Add your holdings and AI will summarize the flow like this every morning."}
      </p>
      <div className="px-4 pb-2 space-y-2 opacity-80">
        {rows.map((r) => (
          <div key={r.symbol} className="flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{r.name}</p>
              <p className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>{r.symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono font-semibold" style={{ color: "var(--text)" }}>{r.value}</p>
              <p
                className="text-[11px] font-mono font-semibold"
                style={{ color: r.change >= 0 ? "var(--up)" : "var(--down)" }}
              >
                {r.change >= 0 ? "+" : ""}{r.change.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
      {variant === "card" && (
      <div className="px-4 pb-3.5 pt-1">
        <button
          type="button"
          onClick={connect}
          className="w-full py-2.5 rounded-xl text-[12px] font-bold"
          style={{ background: "var(--mint)", color: "var(--on-accent)" }}
        >
          {isKo ? "내 자산 연동하기" : "Link my assets"}
        </button>
      </div>
      )}
    </div>
  );
}
