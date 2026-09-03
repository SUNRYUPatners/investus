"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useMarket } from "@/contexts/MarketContext";
import { SessionChatWidget } from "@/components/SessionChatWidget";
import { isStockMarketOpen } from "@/lib/markets/hours";
import { sessionChatSupported } from "@/lib/markets/sessionChatOpen";
import type { MarketId } from "@/lib/markets/types";

function stockPathMarket(pathname: string): "us" | "kr" | null {
  const m = pathname.match(/^\/stock\/([^/?#]+)/i);
  if (!m) return null;
  const sym = decodeURIComponent(m[1]).toUpperCase();
  if (sym.endsWith(".KS") || sym.endsWith(".KQ") || /^\d{6}$/.test(sym)) return "kr";
  return "us";
}

/** US/KR 외 경로(/safe, /learn, /stock 등)에서도 시황 토크 시장 선택 */
function resolveSessionChatMarket(pathMarket: MarketId, pathname: string): "us" | "kr" {
  if (pathMarket === "us" || pathMarket === "kr") return pathMarket;
  const fromStock = stockPathMarket(pathname);
  if (fromStock) return fromStock;
  if (isStockMarketOpen("kr")) return "kr";
  if (isStockMarketOpen("us")) return "us";
  return "kr";
}

/** 모든 페이지에서 실시간 시황 토크 FAB */
export function GlobalSessionChatWidget() {
  const pathMarket = useMarket();
  const pathname = usePathname() ?? "";
  const market = useMemo(
    () => resolveSessionChatMarket(pathMarket, pathname),
    [pathMarket, pathname],
  );

  if (!sessionChatSupported(market)) return null;

  // market별 인스턴스 분리 — US/KR 메시지 상태 혼입 방지
  return <SessionChatWidget key={market} market={market} />;
}
