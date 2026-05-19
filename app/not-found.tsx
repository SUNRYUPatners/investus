"use client";

import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] mx-auto px-4 flex flex-col items-center justify-center min-h-[70vh] text-center gap-6">
        <div className="text-6xl">📉</div>
        <div>
          <h1 className="text-2xl font-bold font-syne mb-2" style={{ color: "var(--text)" }}>
            페이지를 찾을 수 없어요
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            주소가 잘못됐거나 삭제된 페이지입니다.
          </p>
        </div>
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl text-sm font-bold text-black"
          style={{ background: "var(--mint)" }}
        >
          홈으로 돌아가기
        </Link>
      </main>
    </div>
  );
}
