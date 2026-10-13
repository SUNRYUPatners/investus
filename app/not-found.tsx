"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { useLocaleCode } from "@/contexts/LocaleContext";

export default function NotFound() {
  const locale = useLocaleCode();
  const isKo = locale === "ko";

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] mx-auto px-4 flex flex-col items-center justify-center min-h-[70vh] text-center gap-6">
        <div className="text-6xl">📉</div>
        <div>
          <h1 className="text-2xl font-bold font-syne mb-2" style={{ color: "var(--text)" }}>
            {isKo ? "페이지를 찾을 수 없어요" : "Page not found"}
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {isKo ? "주소가 잘못됐거나 삭제된 페이지입니다." : "The URL may be incorrect or the page has been removed."}
          </p>
        </div>
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl text-sm font-bold text-black"
          style={{ background: "var(--mint)" }}
        >
          {isKo ? "홈으로 돌아가기" : "Back to Home"}
        </Link>
      </main>
    </div>
  );
}
