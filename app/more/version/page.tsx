"use client";

import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const VERSIONS = [
  {
    ver: "v1.0.6",
    date: "2026.05.24",
    current: true,
    items: [
      "피드 탭 오픈 — 종토방에서 피드로 이름 변경",
      "나만의 AI 투자비서 — 포트폴리오 AI 비서 리뉴얼",
      "애널들은 채널 — 탭 순서 재배치 (종목토론 → 애널들은 → 크리에이터)",
      "사용 가이드 업데이트 — 새 기능 설명 추가",
    ],
  },
  {
    ver: "v1.0.5",
    date: "2026.05.22",
    current: false,
    items: [
      "애널들은 채널 오픈 — 인증 애널리스트 익명 소통",
      "SpaceX S-1 특집 리포트 추가 (Starlink 완전분석 포함)",
      "종목 토론방 글 수정 기능 추가",
      "리포트 이미지 확대 기능 개선 (ESC·배경 클릭 닫기)",
      "알림 배너 데스크탑 중앙 모달로 개선",
      "더보기 탭 데스크탑 2컬럼 레이아웃 적용",
      "즐겨찾기·앱 설치 가이드 개선",
    ],
  },
  {
    ver: "v1.0.4",
    date: "2026.05.16",
    current: false,
    items: ["UI 개선", "데이터 정확도 향상", "성능 최적화"],
  },
  {
    ver: "v1.0.3",
    date: "2026.05.15",
    current: false,
    items: ["기능 추가", "UI 업데이트"],
  },
  {
    ver: "v1.0.2",
    date: "2026.05.14",
    current: false,
    items: ["안정화", "법적 고지 추가"],
  },
  {
    ver: "v1.0.1",
    date: "2026.05.10",
    current: false,
    items: ["Pull-to-Refresh", "PWA 설치"],
  },
  {
    ver: "v1.0.0",
    date: "2026.05.01",
    current: false,
    items: ["정식 출시"],
  },
];

export default function VersionPage() {
  const router = useRouter();
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
          <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>버전 정보</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>업데이트 이력 · 변경사항</p>
        </div>

        {/* Current version badge */}
        <div
          className="flex items-center justify-between rounded-2xl p-4 mb-4 border"
          style={{ background: "linear-gradient(135deg,#111318,#0d1f18)", borderColor: "rgba(0,229,160,0.2)" }}
        >
          <div>
            <p className="text-[10px] font-semibold" style={{ color: "var(--muted)" }}>현재 버전</p>
            <p className="text-xl font-bold font-mono-num mt-0.5" style={{ color: "var(--mint)" }}>
              {VERSIONS[0].ver}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px]" style={{ color: "var(--muted)" }}>출시일</p>
            <p className="text-sm font-mono-num mt-0.5" style={{ color: "var(--text)" }}>{VERSIONS[0].date}</p>
          </div>
        </div>

        {/* Version history */}
        <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          {VERSIONS.map((v, idx, arr) => (
            <div
              key={v.ver}
              className={`px-4 py-4 ${idx < arr.length - 1 ? "border-b" : ""}`}
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full font-mono-num"
                  style={v.current
                    ? { background: "rgba(0,229,160,0.15)", color: "var(--mint)" }
                    : { background: "rgba(255,255,255,0.06)", color: "var(--muted)" }}
                >
                  {v.ver}
                </span>
                {v.current && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)" }}>
                    현재
                  </span>
                )}
                <span className="text-[10px] font-mono-num ml-auto" style={{ color: "var(--muted)" }}>{v.date}</span>
              </div>
              <ul className="flex flex-col gap-0.5">
                {v.items.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-[11px]" style={{ color: "var(--muted)" }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: "var(--mint)" }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] mt-6" style={{ color: "var(--muted)" }}>
          Investus · investus.kr
        </p>
      </main>
    </div>
  );
}
