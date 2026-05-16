"use client";

import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const CURRENT_VERSION = "1.0.0";

const CHANGELOG: {
  version: string;
  date: string;
  items: { title: string; details: string[] }[];
}[] = [
  {
    version: "1.0.7",
    date: "2026-05-16",
    items: [
      {
        title: "투자 대가 가격 안정화",
        details: [
          "Finnhub 요청 한도 초과 시 Stooq로 자동 전환 — 항상 데이터 표시",
          "다음 13F 공시 예정일 자동 계산 표시 추가",
        ],
      },
      {
        title: "종목토론 댓글 수 정확도 개선",
        details: [
          "표시되는 댓글 수를 실제 DB 기준으로 반영",
          "Supabase wall_posts 연동 — 실데이터 우선, 목 데이터 폴백",
          "로딩 중 스켈레톤 애니메이션 추가",
        ],
      },
    ],
  },
  {
    version: "1.0.6",
    date: "2026-05-15",
    items: [
      {
        title: "원달러(USDKRW) 가격 표시 수정",
        details: [
          "종목 상세 API 실패 시 1D 차트 데이터로 자동 폴백",
          "USDKRW 차트 이상값(2015년 스파이크 등) 범위 필터 적용",
        ],
      },
    ],
  },
  {
    version: "1.0.5",
    date: "2026-05-14",
    items: [
      {
        title: "데이터 소스 전면 교체",
        details: [
          "야후 파이낸스 → Stooq / Finnhub / er-api로 대체",
          "Vercel 서버리스 환경에서 안정적으로 데이터 수신",
          "장마감 시 CDN 캐싱으로 이전 종가 유지 (서버 재시작 후에도 유지)",
        ],
      },
      {
        title: "투자 대가 13F 현재가 수정",
        details: [
          "장마감 후 prev-close(종가) 기준으로 자동 표시",
          "빈 화면(—) 재발 방지를 위한 캐시 전략 개선",
        ],
      },
    ],
  },
  {
    version: "1.0.4",
    date: "2026-05-14",
    items: [
      {
        title: "데이터 영구 저장 & 뒤로가기 개선",
        details: [
          "장 마감 시점의 실제 시세를 저장해 개장 전까지 표시",
          "빈 화면 또는 Mock 데이터는 절대 표시하지 않음",
          "종목 상세에서 뒤로가기 시 이전 화면 그대로 복귀",
          "시가총액 표시 개선 (1.672조 → 1.67조)",
        ],
      },
    ],
  },
  {
    version: "1.0.3",
    date: "2026-05-10",
    items: [
      {
        title: "당겨서 새로고침 · PWA 설치 · 관심종목 클릭",
        details: [
          "iOS 홈 화면 앱 모드 — 아래로 당겨 새로고침",
          "관심종목 카드 → 종목 상세 페이지 이동",
          "더보기 탭 하단 PWA 설치 버튼 추가 (iOS·Android·데스크톱)",
          "서비스 워커 캐시 최적화로 항상 최신 데이터 표시",
        ],
      },
    ],
  },
  {
    version: "1.0.0",
    date: "2026-05-01",
    items: [
      {
        title: "Investus 정식 출시",
        details: [
          "미국 주요 지수 실시간 조회 (S&P500, 나스닥, 다우존스)",
          "관심종목 등록 및 실시간 시세 확인",
          "공포&탐욕 지수, 버핏 지수 제공",
          "선물·원자재·외환·암호화폐 히트맵",
          "투자 대가 13F 포트폴리오 공시 확인",
          "종목별 10년 차트 조회",
        ],
      },
    ],
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
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>업데이트 이력 · 새로운 기능</p>
        </div>

        {/* Current version badge */}
        <div
          className="rounded-2xl p-4 mb-5 flex items-center gap-4 border"
          style={{
            background: "linear-gradient(135deg, rgba(0,229,160,0.08) 0%, rgba(0,229,160,0.02) 100%)",
            borderColor: "rgba(0,229,160,0.2)",
          }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
            style={{ background: "rgba(0,229,160,0.12)", border: "1px solid rgba(0,229,160,0.25)" }}
          >
            📦
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>현재 버전</p>
            <p className="text-xl font-bold font-mono-num font-syne" style={{ color: "var(--text)" }}>
              v{CURRENT_VERSION}
            </p>
          </div>
          <div className="ml-auto">
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)", border: "1px solid rgba(0,229,160,0.25)" }}
            >
              최신
            </span>
          </div>
        </div>

        {/* Changelog */}
        <div className="flex flex-col gap-4">
          {CHANGELOG.map((release, ri) => (
            <div key={release.version}>
              {/* Version header */}
              <div className="flex items-center gap-3 mb-2 px-1">
                <span
                  className="text-xs font-bold font-mono-num px-2 py-0.5 rounded-full"
                  style={
                    ri === 0
                      ? { background: "rgba(0,229,160,0.15)", color: "var(--mint)", border: "1px solid rgba(0,229,160,0.3)" }
                      : { background: "var(--card)", color: "var(--muted)", border: "1px solid var(--border)" }
                  }
                >
                  v{release.version}
                </span>
                <span className="text-[10px] font-mono-num" style={{ color: "var(--muted)" }}>
                  {release.date}
                </span>
              </div>

              {/* Items */}
              <div
                className="rounded-2xl border overflow-hidden"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                {release.items.map((item, ii) => (
                  <div
                    key={item.title}
                    className={ii < release.items.length - 1 ? "border-b" : ""}
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="px-4 py-3.5">
                      <p className="text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
                        {item.title}
                      </p>
                      <ul className="flex flex-col gap-1">
                        {item.details.map((d) => (
                          <li key={d} className="flex items-start gap-2">
                            <span className="mt-1 flex-shrink-0 w-1 h-1 rounded-full" style={{ background: "var(--mint)" }} />
                            <span className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
                              {d}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
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
