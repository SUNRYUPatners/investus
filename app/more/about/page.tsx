"use client";

import { Header } from "@/components/Header";
import { ChevronLeft, BookOpen, PlayCircle, TrendingUp, Shield, Layers, AlertTriangle, Award } from "lucide-react";
import Link from "next/link";

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
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,229,160,0.12) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", transform: "translate(30%, 30%)" }} />

          <div className="relative flex items-center gap-3 mb-5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--mint)", boxShadow: "0 8px 24px rgba(0,229,160,0.35)" }}
            >
              <TrendingUp className="w-7 h-7 text-black" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xl font-bold font-syne" style={{ color: "var(--text)" }}>Investus</p>
              <p className="text-[11px]" style={{ color: "var(--mint)" }}>Invest · US · Together</p>
            </div>
          </div>

          {/* Name meaning */}
          <div className="relative flex flex-col gap-2 mb-5">
            <div className="flex items-start gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)" }}>Invest US</span>
              <p className="text-[12px] leading-relaxed" style={{ color: "var(--text)" }}>
                미국(United States)에 투자하라 — 세계에서 가장 검증된 시장
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                style={{ background: "rgba(99,102,241,0.15)", color: "#a78bfa" }}>Invest us</span>
              <p className="text-[12px] leading-relaxed" style={{ color: "var(--text)" }}>
                우리와 함께 투자하라 — 혼자가 아닌, 같은 방향으로
              </p>
            </div>
          </div>

          <p className="relative text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            두 가지 의미를 담은 이름처럼,<br />
            Investus는 <span style={{ color: "var(--text)", fontWeight: 600 }}>미국주식에 집중</span>하고
            <span style={{ color: "var(--text)", fontWeight: 600 }}> 함께 성장</span>하는
            투자 정보 플랫폼입니다.
          </p>
        </div>

        {/* ── Why we built this ── */}
        <div
          className="rounded-2xl p-5 mb-4 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(251,146,60,0.12)", color: "#fb923c" }}>
              <Layers className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold font-syne" style={{ color: "var(--text)" }}>왜 만들었는가</p>
          </div>
          <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
            인터넷에는 투자 정보가 넘쳐납니다. 그런데 정보가 많을수록 오히려
            <span style={{ color: "var(--text)", fontWeight: 600 }}> 판단이 흐려지고 잘못된 투자</span>로
            이어지는 경우가 많습니다.
          </p>
          <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
            Investus는 이 문제에서 출발했습니다.
            수많은 노이즈를 걷어내고, <span style={{ color: "var(--text)", fontWeight: 600 }}>진짜 필요한 핵심 정보만</span>을
            한 곳에 모았습니다.
          </p>
          <div
            className="rounded-xl p-3"
            style={{ background: "linear-gradient(135deg, rgba(0,229,160,0.06), rgba(99,102,241,0.06))", border: "1px solid rgba(0,229,160,0.12)" }}
          >
            <p className="text-[11px] font-semibold leading-relaxed" style={{ color: "var(--text)" }}>
              "매일 Investus 하나만 봐도<br />
              전날 시장 전체를 파악할 수 있어야 한다."
            </p>
            <p className="text-[10px] mt-1.5" style={{ color: "var(--muted)" }}>
              — 이것이 Investus가 추구하는 기준
            </p>
          </div>
        </div>

        {/* ── How to use daily ── */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            이렇게 활용하세요
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              {
                icon: <TrendingUp className="w-4 h-4" />,
                color: "#10b981",
                step: "DAILY",
                title: "홈 — 매일 아침 5분",
                desc: "선물·지수·환율·공포탐욕지수·버핏지수·섹터 히트맵까지, 홈탭 하나로 전날 장을 완벽히 정리하고 오늘 장을 준비하세요.",
              },
              {
                icon: <Layers className="w-4 h-4" />,
                color: "#d4af37",
                step: "REPORT",
                title: "Investus 리포트 — 최고투자책임자의 시각",
                desc: "SUNRYU Partners CIO가 직접 분석한 리포트를 인사이트 탭에서 확인하세요. 단순 뉴스 요약이 아닌, 투자 판단에 직결되는 핵심 분석입니다.",
              },
              {
                icon: <BookOpen className="w-4 h-4" />,
                color: "#60a5fa",
                step: "STUDY",
                title: "추천 책 — 투자 기준 확립",
                desc: "흔들리지 않는 투자를 하려면 나만의 기준이 필요합니다. Investus가 엄선한 책들로 투자의 철학과 원칙을 다지세요.",
              },
              {
                icon: <PlayCircle className="w-4 h-4" />,
                color: "#ef4444",
                step: "WATCH",
                title: "추천 유튜브 — 시장 분석 심화",
                desc: "신뢰할 수 있는 채널을 통해 시장 흐름을 추가로 파악하세요. 좋은 채널 하나가 수백 개의 노이즈를 대신합니다.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl p-4 border flex gap-3 items-start"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${item.color}18`, color: item.color }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] font-bold tracking-widest" style={{ color: item.color }}>{item.step}</span>
                    <p className="text-xs font-bold" style={{ color: "var(--text)" }}>{item.title}</p>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── E-book ── */}
        <div
          className="rounded-2xl p-5 mb-4"
          style={{
            background: "linear-gradient(145deg, #0d1a2e 0%, #0a0c10 100%)",
            border: "1px solid rgba(96,165,250,0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(96,165,250,0.12)", color: "#60a5fa" }}>
              <BookOpen className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold font-syne" style={{ color: "var(--text)" }}>Investus 전자책</p>
          </div>
          <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
            SUNRYU Partners CIO가 직접 집필한 전자책입니다.
            수년간의 미국주식 투자 경험에서 걸러낸 <span style={{ color: "#60a5fa", fontWeight: 600 }}>핵심만</span>을
            담았습니다. 두꺼운 책 열 권보다, 이 한 권으로 투자의 기준을 세우세요.
          </p>
          <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)", opacity: 0.8 }}>
            불필요한 이론은 없습니다. 당장 내일 투자에 적용할 수 있는 판단 기준과
            원칙만으로 구성되어 있습니다.
          </p>
        </div>

        {/* ── Education ── */}
        <div
          className="rounded-2xl p-5 mb-6"
          style={{
            background: "linear-gradient(145deg, #1a0d1f 0%, #0a0c10 100%)",
            border: "1px solid rgba(192,132,252,0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(192,132,252,0.12)", color: "#c084fc" }}>
              <Shield className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold font-syne" style={{ color: "var(--text)" }}>투자 교육</p>
          </div>
          <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
            투자는 어릴 때부터 배워야 합니다. 선진국에서는 금융 교육이 일상이지만,
            대한민국에서는 아직도 <span style={{ color: "#c084fc", fontWeight: 600 }}>투자 교육이 절대적으로 부족</span>합니다.
            사회에 나온 뒤에야 처음 주식을 접하고, 검증되지 않은 정보에 노출되어
            잘못된 첫 투자 경험을 갖는 경우가 너무 많습니다.
          </p>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
            Investus의 투자 교육은 이 공백을 채우기 위해 존재합니다.
            올바른 기준과 사고방식을 갖춘 투자자를 만드는 것 —
            그것이 우리가 교육을 하는 이유입니다.
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span className="text-[10px] tracking-widest font-syne" style={{ color: "var(--muted)" }}>운영 주체</span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── Operator card ── */}
        <div
          className="rounded-2xl p-5 mb-4 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-sunryu.jpeg"
              alt="SUNRYU Partners"
              className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = "none";
              }}
            />
            <div>
              <p className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>SUNRYU PARTNERS</p>
              <p className="text-[11px]" style={{ color: "var(--mint)" }}>싱글패밀리오피스 · 독립 운용 구조</p>
            </div>
            <div className="ml-auto">
              <span
                className="text-[9px] font-semibold px-2 py-1 rounded-full"
                style={{ background: "rgba(0,229,160,0.12)", color: "var(--mint)", border: "1px solid rgba(0,229,160,0.2)" }}
              >
                법인 운영
              </span>
            </div>
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
            손실 없이, 오직 수익만.
            미국주식 전 보유 종목 <span style={{ color: "var(--text)", fontWeight: 600 }}>수익률 100% 이상</span>을
            기록한 팀이 만든 투자 정보 플랫폼입니다.
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { value: "100%+", label: "전 종목 수익률", sub: "보유 전 종목 플러스" },
            { value: "0",     label: "누적 손실 종목", sub: "단 한 종목도 손실 없음" },
            { value: "U.S.",  label: "오직 미국주식",  sub: "검증된 시장만 집중" },
            { value: "S/O",   label: "싱글패밀리오피스", sub: "독립 운용 구조" },
          ].map((s) => (
            <div key={s.label}
              className="rounded-2xl p-4 border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <p className="text-2xl font-bold font-syne mb-0.5" style={{ color: "var(--mint)" }}>{s.value}</p>
              <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>{s.label}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── 투자 철학 ── */}
        <div className="mb-5">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            투자 철학
          </p>
          <div className="flex flex-col gap-3">
            {[
              { color: "#10b981", title: "절대 잃지 않는 투자", desc: "수익 극대화 이전에 원금 보존을 최우선합니다. 리스크를 철저히 계산하고, 확신이 없는 종목에는 절대 진입하지 않습니다." },
              { color: "#60a5fa", title: "오직 미국주식", desc: "세계 최고 기업들이 상장된 미국 시장만 집중합니다. 분산이 아닌 선택과 집중으로 압도적 수익률을 달성합니다." },
              { color: "#c084fc", title: "실전 데이터 기반", desc: "감이 아닌 데이터로 투자합니다. 실시간 시세·섹터 흐름·거시경제 지표를 종합 분석하여 최적의 타이밍을 포착합니다." },
              { color: "#fb923c", title: "투명한 공개 원칙", desc: "보유 포트폴리오와 수익률을 투명하게 공개합니다. 숨길 것이 없는 성과만이 진정한 신뢰를 만든다고 믿습니다." },
            ].map((p) => (
              <div key={p.title}
                className="rounded-2xl p-4 border flex gap-3 items-start"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: p.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{p.title}</p>
                  <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 왜 미국주식만인가 ── */}
        <div
          className="rounded-2xl p-5 mb-5 border"
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

        {/* ── 법적 고지 및 운영 자격 ── */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
            <p className="text-[10px] font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
              법적 고지 및 운영 자격
            </p>
          </div>

          {/* 사전교육 이수 증서 */}
          <div className="rounded-2xl border p-4 mb-3"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.2)" }}>
                <Award className="w-5 h-5" style={{ color: "var(--mint)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold mb-0.5" style={{ color: "var(--text)" }}>
                  금융투자협회 유사투자자문업 사전교육 이수
                </p>
                <p className="text-[11px] mb-2" style={{ color: "var(--muted)" }}>
                  금융투자교육원 (KIFIN) · 2023년 03월 23일 · 8시간
                </p>
                <div className="rounded-lg px-3 py-2"
                  style={{ background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.12)" }}>
                  <p className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>
                    수료번호 제 26066-2023-90318호
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 서비스 성격 안내 */}
          <div className="rounded-2xl border p-4 mb-3"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>서비스 성격 안내</p>
            <div className="flex flex-col gap-2">
              {[
                "Investus는 투자 정보 제공을 목적으로 운영되는 서비스입니다.",
                "제공되는 리포트·AI 분석·시장 데이터는 모두 참고용이며, 개인별 투자 권유가 아닙니다.",
                "투자 결과에 대한 최종 책임은 투자자 본인에게 있습니다.",
                "원금 손실이 발생할 수 있으며, 과거 수익률은 미래 성과를 보장하지 않습니다.",
              ].map((t) => (
                <div key={t} className="flex gap-2 items-start">
                  <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: "var(--muted)" }} />
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 주의 배너 */}
          <div className="rounded-xl px-4 py-3 flex items-start gap-2.5"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.18)" }}>
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#fbbf24" }} />
            <p className="text-[11px] leading-relaxed" style={{ color: "rgba(251,191,36,0.8)" }}>
              Investus는 자본시장법상 투자자문업(인가) 또는 투자일임업 서비스가 아닙니다.
              금융투자상품 투자 전 반드시 공인 금융 전문가의 상담을 받으시기 바랍니다.
            </p>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="text-center py-4">
          <p className="text-xs font-bold font-syne mb-1" style={{ color: "var(--text)" }}>Investus</p>
          <p className="text-[10px]" style={{ color: "var(--muted)" }}>미국주식, 제대로 알고 투자하세요.</p>
        </div>

      </main>
    </div>
  );
}
