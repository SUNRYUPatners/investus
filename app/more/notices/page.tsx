"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

type NoticeType = "notice" | "legal";

const TYPE_CONFIG: Record<NoticeType, { label: string; color: string; bg: string }> = {
  notice: { label: "공지", color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  legal:  { label: "법적 고지", color: "#f59e0b", bg: "rgba(245,158,11,0.10)" },
};

const NOTICES: { id: string; type: NoticeType; date: string; title: string; body: string }[] = [
  {
    id: "n005",
    type: "legal",
    date: "2026-05-14",
    title: "투자 정보 제공 서비스 법적 고지 (필독)",
    body: `Investus는 자본시장과 금융투자업에 관한 법률(자본시장법)에 따른 금융투자업 인가를 받지 않은 순수 정보 제공 서비스입니다.

■ 제공 서비스 성격
- 미국 주식 시장 데이터(시세, 지수, 차트 등) 열람 서비스
- SEC 공시 기반 투자 대가 포트폴리오 참고 정보
- 시장 심리 지표(공포&탐욕 지수, 버핏 지수) 안내
- 투자 관련 뉴스·리포트 정보 제공

■ 투자 권유 해당 없음
본 서비스의 어떠한 내용도 특정 금융투자상품의 가치 및 취득·처분(매수·매도)을 권유하지 않습니다. 모든 데이터는 참고용이며, 투자 의사결정의 유일한 근거로 삼지 마십시오.

■ 손실 가능성 및 책임 한계
미국주식을 포함한 모든 금융투자상품은 원금 손실이 발생할 수 있습니다. Investus 정보를 참고하여 발생한 투자 손실에 대해 Investus 및 운영자는 어떠한 법적 책임도 부담하지 않습니다.

■ 저작권 및 데이터 출처
제공 데이터는 Finnhub, Stooq, CNN Business, FRED 등 공신력 있는 외부 API를 통해 수집됩니다. 무단 크롤링·상업적 재배포를 금합니다.`,
  },
  {
    id: "n004",
    type: "legal",
    date: "2026-05-14",
    title: "개인정보 처리 고지",
    body: `Investus는 이용자의 개인정보를 최소한으로 수집합니다.

■ 수집 항목 (회원 한정)
- 전화번호: 계정 식별 목적
- 닉네임: 서비스 내 표시용

■ 수집하지 않는 정보
- 투자 포트폴리오·자산 정보
- 금융 계좌 정보
- 위치 정보

■ 제3자 제공 없음
수집된 개인정보는 광고·마케팅 목적으로 제3자에게 제공되지 않습니다.

■ 비회원 이용
관심종목 등은 기기의 로컬 저장소(localStorage)에 보관되어 Investus 서버에 전송되지 않습니다.

자세한 사항은 더보기 → 개인정보처리방침을 참고해 주세요.`,
  },
  {
    id: "n001",
    type: "notice",
    date: "2026-05-01",
    title: "Investus 서비스 정식 출시",
    body: `안녕하세요, Investus팀입니다.

미국 주식 투자 정보 플랫폼 Investus가 정식 서비스를 시작합니다.

■ 주요 기능
- 미국 주요 지수 실시간 조회 (S&P500, 나스닥, 다우존스)
- 관심종목 등록 및 실시간 시세 확인
- 공포&탐욕 지수, 버핏 지수 제공
- 선물·원자재·외환·암호화폐 히트맵
- 투자 대가 13F 포트폴리오 공시 확인
- 종목별 10년 차트 조회

■ 향후 계획
- 종목 알림 기능
- 관심종목 클라우드 동기화
- 포트폴리오 수익률 계산기

이용해 주셔서 감사합니다.
Investus CIO @hnryu_cio`,
  },
];

function NoticeItem({ notice }: { notice: typeof NOTICES[number] }) {
  const [open, setOpen] = useState(notice.id === "n005");
  const cfg = TYPE_CONFIG[notice.type];
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
      <button
        className="w-full flex items-start justify-between gap-3 px-4 py-4 text-left active:opacity-70 transition-opacity"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{ background: cfg.bg, color: cfg.color }}
            >
              {cfg.label}
            </span>
            <span className="text-[10px] font-mono-num" style={{ color: "var(--muted)" }}>{notice.date}</span>
          </div>
          <p className="text-sm font-medium leading-snug" style={{ color: "var(--text)" }}>{notice.title}</p>
        </div>
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 mt-1 transition-transform duration-200"
          style={{ color: "var(--muted)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div className="px-4 pb-4">
          <div
            className="rounded-xl p-3 text-xs leading-relaxed whitespace-pre-line"
            style={{ background: "var(--bg)", color: "var(--muted)", borderColor: "var(--border)" }}
          >
            {notice.body}
          </div>
        </div>
      )}
    </div>
  );
}

export default function NoticesPage() {
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
          <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>공지사항</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>업데이트 · 법적 고지 · 서비스 안내</p>
        </div>

        <div className="mt-4 rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          {NOTICES.map((notice) => (
            <NoticeItem key={notice.id} notice={notice} />
          ))}
        </div>

        <p className="text-center text-[10px] mt-6" style={{ color: "var(--muted)" }}>
          Investus · investus.kr
        </p>
      </main>
    </div>
  );
}
