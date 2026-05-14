"use client";

import { Header } from "@/components/Header";
import { ChevronLeft, TrendingUp, Shield, Target, Award } from "lucide-react";
import Link from "next/link";

const STATS = [
  { value: "100%+", label: "전 종목 수익률", sub: "보유 전 종목 플러스" },
  { value: "0",     label: "누적 손실 종목", sub: "단 한 종목도 손실 없음" },
  { value: "U.S.",  label: "오직 미국주식", sub: "검증된 시장만 집중" },
  { value: "S/O",   label: "싱글패밀리오피스", sub: "독립 운용 구조" },
];

const PRINCIPLES = [
  {
    icon: <Shield className="w-5 h-5" />,
    color: "#00e5a0",
    title: "절대 잃지 않는 투자",
    desc: "수익 극대화 이전에 원금 보존을 최우선합니다. 리스크를 철저히 계산하고, 확신이 없는 종목에는 절대 진입하지 않습니다.",
  },
  {
    icon: <Target className="w-5 h-5" />,
    color: "#60a5fa",
    title: "오직 미국주식",
    desc: "세계 최고 기업들이 상장된 미국 시장만 집중합니다. 분산이 아닌 선택과 집중으로 압도적 수익률을 달성합니다.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    color: "#c084fc",
    title: "실전 데이터 기반",
    desc: "감이 아닌 데이터로 투자합니다. 실시간 시세·섹터 흐름·거시경제 지표를 종합 분석하여 최적의 타이밍을 포착합니다.",
  },
  {
    icon: <Award className="w-5 h-5" />,
    color: "#fb923c",
    title: "투명한 공개 원칙",
    desc: "보유 포트폴리오와 수익률을 투명하게 공개합니다. 숨길 것이 없는 성과만이 진정한 신뢰를 만든다고 믿습니다.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-24 lg:pb-10">

        {/* Back */}
        <div className="pt-4 pb-2">
          <Link href="/more" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-3.5 h-3.5" /> 더보기
          </Link>
        </div>

        {/* ── Hero ── */}
        <div
          className="relative rounded-3xl overflow-hidden p-6 mb-6"
          style={{ background: "linear-gradient(145deg, #0d1f18 0%, #0a0c10 50%, #0e0c1f 100%)" }}
        >
          {/* Glow orbs */}
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,229,160,0.12) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", transform: "translate(30%, 30%)" }} />

          {/* Logo mark */}
          <div className="relative flex items-center gap-3 mb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpeg"
              alt="Investus"
              className="w-14 h-14 rounded-2xl object-cover flex-shrink-0"
              style={{ boxShadow: "0 8px 24px rgba(212,175,55,0.4)" }}
            />
            <div>
              <p className="text-xl font-bold font-syne" style={{ color: "var(--text)" }}>Investus</p>
              <p className="text-[11px]" style={{ color: "var(--mint)" }}>by SUNRYU PARTNERS</p>
            </div>
          </div>

          <p className="relative text-sm leading-relaxed mb-4" style={{ color: "var(--text)" }}>
            손실 없이, 오직 수익만.<br />
            미국주식 전 보유 종목 <span style={{ color: "var(--mint)", fontWeight: 700 }}>수익률 100% 이상</span>을<br />
            기록한 팀이 만든 투자 정보 플랫폼입니다.
          </p>

          <div
            className="relative inline-flex items-center gap-1.5 text-[10px] font-semibold px-3 py-1.5 rounded-full"
            style={{ background: "rgba(0,229,160,0.12)", color: "var(--mint)", border: "1px solid rgba(0,229,160,0.2)" }}
          >
            ✦ SUNRYU PARTNERS 법인 운영
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-4 border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <p className="text-2xl font-bold font-syne mb-0.5" style={{ color: "var(--mint)" }}>
                {s.value}
              </p>
              <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>{s.label}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Founder ── */}
        <div
          className="rounded-2xl p-5 mb-6 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            설립자
          </p>
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,160,0.15), rgba(99,102,241,0.15))",
                border: "1px solid rgba(0,229,160,0.2)",
              }}
            >
              🦅
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>류현우</p>
              <p className="text-xs mb-2" style={{ color: "var(--mint)" }}>
                CIO · 최고투자책임자 @ 싱글패밀리오피스
              </p>
              <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
                SUNRYU PARTNERS 법인의 최고투자책임자. 미국주식 단일 시장에 집중하여
                전 보유 종목 수익률 100% 이상을 달성했으며, 단 한 번의 손실 없이
                꾸준한 성과를 이어가고 있습니다. 복잡한 시장을 단순하게 해석하고,
                검증된 정보만을 공유하는 것을 원칙으로 합니다.
              </p>
            </div>
          </div>
        </div>

        {/* ── Mission ── */}
        <div
          className="rounded-2xl p-5 mb-6"
          style={{
            background: "linear-gradient(135deg, rgba(0,229,160,0.06), rgba(99,102,241,0.06))",
            border: "1px solid rgba(0,229,160,0.15)",
          }}
        >
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-2 font-syne" style={{ color: "var(--mint)" }}>
            미션
          </p>
          <p className="text-sm font-bold leading-relaxed mb-1" style={{ color: "var(--text)" }}>
            "모든 투자자가 검증된 정보로<br />올바른 결정을 내릴 수 있도록"
          </p>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
            Investus는 미국주식 투자에 필요한 정보만을 담습니다.
            실시간 시세, 섹터 히트맵, 투자 대가 포트폴리오, 시장 뉴스 —
            소음을 제거하고 본질적인 투자 정보에 집중할 수 있는 환경을 제공합니다.
          </p>
        </div>

        {/* ── Principles ── */}
        <div className="mb-6">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            투자 철학
          </p>
          <div className="flex flex-col gap-3">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl p-4 border flex gap-3 items-start"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${p.color}18`, color: p.color }}
                >
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{p.title}</p>
                  <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Why US only ── */}
        <div
          className="rounded-2xl p-5 mb-6 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            왜 미국주식만인가
          </p>
          <div className="flex flex-col gap-3">
            {[
              ["🌐", "세계 최대 자본 시장", "전 세계 주식시가총액의 약 42%를 차지하는 미국 시장은 유동성, 투명성, 성장성 모든 면에서 압도적입니다."],
              ["🏆", "검증된 글로벌 기업", "Apple, NVIDIA, Microsoft — 세계를 바꾸는 기업들이 상장된 유일한 시장입니다."],
              ["📊", "완벽한 정보 공개", "SEC 규정에 따라 재무·공시 정보가 완전히 공개되어 데이터 기반 투자가 가능합니다."],
              ["⚡", "24시간 글로벌 흐름", "달러 기반 자산으로 글로벌 경제 성장의 수혜를 직접 향유할 수 있습니다."],
            ].map(([icon, title, desc]) => (
              <div key={title as string} className="flex gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--text)" }}>{title}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stock Performance ── */}
        <div className="mb-6">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            실제 수익률 공개 · 2024년 기준
          </p>

          {/* Total return hero */}
          <div
            className="relative rounded-2xl overflow-hidden p-5 mb-3"
            style={{ background: "linear-gradient(145deg, #0a1f14 0%, #0a0c10 60%, #120a1f 100%)" }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(0,229,160,0.08) 0%, transparent 60%)" }} />
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase font-syne mb-1" style={{ color: "var(--mint)" }}>
                    종합계좌 전체 수익률
                  </p>
                  <p className="text-4xl font-bold font-syne" style={{ color: "var(--mint)" }}>
                    +103.69%
                  </p>
                </div>
                <div
                  className="px-3 py-1.5 rounded-full text-[10px] font-bold"
                  style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)", border: "1px solid rgba(0,229,160,0.25)" }}
                >
                  ✦ 인증됨
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-[10px]" style={{ color: "var(--muted)" }}>투자 원금</p>
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>약 1.4억</p>
                </div>
                <div className="w-px self-stretch" style={{ background: "var(--border)" }} />
                <div>
                  <p className="text-[10px]" style={{ color: "var(--muted)" }}>현재 가치</p>
                  <p className="text-sm font-bold" style={{ color: "var(--mint)" }}>약 2.8억</p>
                </div>
                <div className="w-px self-stretch" style={{ background: "var(--border)" }} />
                <div>
                  <p className="text-[10px]" style={{ color: "var(--muted)" }}>수익</p>
                  <p className="text-sm font-bold" style={{ color: "var(--mint)" }}>약 +1.4억</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emphasis banner */}
          <div
            className="rounded-2xl p-4 mb-3 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(0,229,160,0.08), rgba(99,102,241,0.08))",
              border: "1px solid rgba(0,229,160,0.18)",
            }}
          >
            <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>
              전 보유 종목 수익률 <span style={{ color: "var(--mint)" }}>100% 이상</span>
            </p>
            <p className="text-[11px]" style={{ color: "var(--muted)" }}>
              단 한 종목도 손실 없이 — 계좌 전체 수익률 100% 돌파
            </p>
          </div>

          {/* Per-stock returns */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { symbol: "TSLA", name: "테슬라", ret: "+100.49%", shares: "342.56주", color: "#e879f9" },
              { symbol: "PLTR", name: "팔란티어", ret: "+133.24%", shares: "102.62주", color: "#60a5fa" },
              { symbol: "IBM",  name: "IBM",     ret: "+139.76%", shares: "5.514주",  color: "#34d399" },
              { symbol: "META", name: "메타",    ret: "+159.99%", shares: "0.002주",  color: "#fb923c" },
            ].map((s) => (
              <div
                key={s.symbol}
                className="rounded-2xl p-4 border"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-syne" style={{ color: "var(--text)" }}>{s.symbol}</span>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${s.color}18`, color: s.color }}
                  >
                    {s.ret}
                  </span>
                </div>
                <p className="text-[11px]" style={{ color: "var(--muted)" }}>{s.name}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>{s.shares}</p>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-center mt-3" style={{ color: "var(--muted)" }}>
            * 정확한 매입가·현재가는 비공개. 수익률·보유 수량·억 단위 금액만 공개.
          </p>
        </div>

        {/* ── Footer brand ── */}
        <div className="text-center py-2">
          <p className="text-xs font-bold font-syne mb-1" style={{ color: "var(--text)" }}>Investus</p>
          <p className="text-[10px]" style={{ color: "var(--muted)" }}>SUNRYU PARTNERS · 싱글패밀리오피스</p>
          <p className="text-[10px] mt-1" style={{ color: "var(--muted)" }}>미국주식, 제대로 알고 투자하세요.</p>
        </div>

      </main>
    </div>
  );
}
