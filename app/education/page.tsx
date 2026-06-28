"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, CheckCircle, BookOpen, TrendingUp, Users, Clock, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";

const HIGHLIGHT_ICONS = [
  <Clock className="w-5 h-5" key="clock" />,
  <TrendingUp className="w-5 h-5" key="trend" />,
  <BookOpen className="w-5 h-5" key="book" />,
  <Users className="w-5 h-5" key="users" />,
];

const COURSE_TYPES = [
  {
    id: "one-on-one",
    emoji: "👤",
    title: "1:1 개인 수업",
    price: 500000,
    badge: "완전 맞춤형",
    badgeColor: "#60a5fa",
    desc: "CIO가 직접 1:1로 지도합니다. 내 수준과 목표에 맞는 완전 맞춤형 커리큘럼으로 가장 빠르게 성장할 수 있는 방식입니다.",
    details: ["완전 맞춤 커리큘럼", "일정 유연하게 협의", "CIO 직접 지도", "빠른 실력 향상"],
    detailColor: "#60a5fa",
  },
  {
    id: "group",
    emoji: "👥",
    title: "소수정예 그룹",
    price: 300000,
    badge: "최대 8명",
    badgeColor: "#a78bfa",
    desc: "소규모 그룹으로 함께 배우고 토론합니다. 다양한 시각과 질문 속에서 더 넓은 시야를 키울 수 있습니다.",
    details: ["최대 8명 소규모", "주 1회 · 90분", "강의 자료 PDF 제공", "종목 토론 포함"],
    detailColor: "#a78bfa",
  },
];

const PORTFOLIO = [
  { symbol: "TSLA",  name: "테슬라",      ret: "+100.49%" },
  { symbol: "PLTR",  name: "팔란티어",    ret: "+133.24%" },
  { symbol: "IBM",   name: "IBM",         ret: "+139.76%" },
  { symbol: "META",  name: "메타",        ret: "+159.99%" },
  { symbol: "GOOGL", name: "알파벳 A",    ret: "수익 ✓"   },
];

function fmt(n: number) {
  return "₩" + n.toLocaleString("ko-KR");
}

type Step = "form" | "submitting" | "success" | "error";

export default function EducationPage() {
  const t  = useLocale();
  const ed = t.education;
  const [step, setStep]             = useState<Step>("form");
  const [openWeek, setOpenWeek]     = useState<number | null>(0);
  const [courseType, setCourseType] = useState("");
  const [format, setFormat]         = useState<"online" | "offline" | "">("");
  const [name,   setName]           = useState("");
  const [phone,  setPhone]          = useState("");
  const [level,  setLevel]          = useState("");
  const [amount, setAmount]         = useState("");
  const [msg,    setMsg]            = useState("");
  const [error,  setError]          = useState("");

  const selectedCourse = COURSE_TYPES.find((c) => c.id === courseType);

  const handleSubmit = async () => {
    if (!courseType)    { setError(ed.errCourse);  return; }
    if (!format)        { setError("수업 형태를 선택해주세요."); return; }
    if (!name.trim())   { setError(ed.errName);    return; }
    if (!phone.trim())  { setError(ed.errPhone);   return; }
    if (!level)         { setError(ed.errLevel);   return; }

    setError("");
    setStep("submitting");

    const courseLabel = selectedCourse?.title ?? courseType;
    const formatLabel = format === "online" ? "온라인(Zoom)" : "오프라인(대면)";

    try {
      const res = await fetch("/api/edu-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          level: `[${courseLabel} · ${formatLabel}] ${level}`,
          amount,
          message: msg,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error((d as { error?: string }).error ?? "서버 오류");
      }
      setStep("success");
    } catch (e) {
      setError((e as Error).message ?? "신청 중 오류가 발생했습니다. 다시 시도해주세요.");
      setStep("form");
    }
  };

  /* ── 신청 완료 ── */
  if (step === "success") {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 gap-6 pb-safe"
        style={{ background: "var(--bg)" }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "rgba(212,175,55,0.15)" }}
        >
          <CheckCircle className="w-10 h-10" style={{ color: "#d4af37" }} />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
            {ed.successTitle}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {ed.successMsg(name)}
          </p>
          <p className="text-[11px] mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>
            수강료 안내 및 일정 협의는 개별적으로 연락드립니다.
          </p>
        </div>

        <div
          className="w-full max-w-sm rounded-2xl border p-5"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <p className="text-xs font-semibold mb-3 font-syne" style={{ color: "var(--muted)" }}>
            {ed.summaryTitle}
          </p>
          {[
            [ed.summaryCourse,  selectedCourse?.title ?? courseType],
            ["수업 형태",        format === "online" ? "온라인 (Zoom)" : "오프라인 (대면)"],
            [ed.summaryName,    name],
            [ed.summaryPhone,   phone],
            [ed.summaryLevel,   level],
            ...(selectedCourse ? [["수강료", fmt(selectedCourse.price)]] : []),
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1.5 border-b last:border-0"
              style={{ borderColor: "var(--border)" }}>
              <span className="text-xs" style={{ color: "var(--muted)" }}>{k}</span>
              <span className="text-xs font-medium" style={{ color: "var(--text)" }}>{v}</span>
            </div>
          ))}
        </div>

        <Link href="/insight" className="text-xs" style={{ color: "var(--muted)" }}>
          {ed.backToInsight}
        </Link>
      </div>
    );
  }

  /* ── 신청 폼 ── */
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 lg:px-8 pt-4 pb-12 lg:pb-10">
        <Link href="/insight"
          className="inline-flex items-center gap-1 text-xs mb-5"
          style={{ color: "var(--muted)" }}>
          <ChevronLeft className="w-3.5 h-3.5" /> {ed.back}
        </Link>

        {/* Hero */}
        <div
          className="rounded-2xl px-5 py-6 mb-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1c1500 0%, #0d0b00 60%, #0a0c10 100%)",
            border: "1px solid rgba(212,175,55,0.3)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at 80% 20%, rgba(212,175,55,0.1) 0%, transparent 60%)" }} />
          <div
            className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full mb-3"
            style={{ background: "rgba(212,175,55,0.18)", color: "#d4af37" }}
          >
            {ed.badge}
          </div>
          <h1 className="text-xl font-bold font-syne mb-2" style={{ color: "var(--text)" }}>
            {ed.heroTitle1}<br />{ed.heroTitle2}
          </h1>
          <p className="text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
            {ed.heroDesc.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
        </div>

        {/* ── CIO 검증 실적 ── */}
        <div className="mb-6 rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(212,175,55,0.3)" }}>
          {/* CIO 프로필 */}
          <div
            className="px-5 py-4 border-b"
            style={{ borderColor: "var(--border)", background: "linear-gradient(135deg, #1c1500 0%, #0a0c10 100%)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}
              >
                🎯
              </div>
              <div>
                <p className="text-[10px] font-bold" style={{ color: "#d4af37" }}>SUNRYU Partners CIO</p>
                <p className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>류현우</p>
                <p className="text-[11px]" style={{ color: "var(--muted)" }}>미국주식 투자 전략가 · 포트폴리오 매니저</p>
              </div>
            </div>
          </div>

          {/* 실적 지표 */}
          <div
            className="grid grid-cols-3"
            style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}
          >
            {[
              { value: "+103.69%", label: "실계좌 총 수익률",  color: "#4ade80" },
              { value: "0개",       label: "손실 종목",         color: "#4ade80" },
              { value: "약 2.8억",  label: "운용 금액",         color: "#d4af37" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="py-4 text-center"
                style={{ borderLeft: i > 0 ? "1px solid var(--border)" : undefined }}
              >
                <p className="text-base font-bold font-syne" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-[9px] mt-0.5" style={{ color: "var(--muted)" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* 실계좌 보유 종목 */}
          <div className="px-5 py-4" style={{ background: "var(--card)" }}>
            <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
              실계좌 보유 종목 · 브로커리지 인증
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {PORTFOLIO.map((s) => (
                <div
                  key={s.symbol}
                  className="rounded-xl p-2 border text-center"
                  style={{ background: "var(--bg)", borderColor: "var(--border)" }}
                >
                  <p className="text-[11px] font-bold font-mono-num" style={{ color: "var(--text)" }}>{s.symbol}</p>
                  <p className="text-[8px]" style={{ color: "var(--muted)" }}>{s.name}</p>
                  <p className="text-[8px] font-bold mt-0.5" style={{ color: "#4ade80" }}>{s.ret}</p>
                </div>
              ))}
            </div>
            <p className="text-[9px] mt-2.5 text-center" style={{ color: "var(--muted)" }}>
              ※ 전 보유 종목 수익률 100% 이상 달성 · 실계좌 스크린샷 인증
            </p>
          </div>
        </div>

        {/* ── 수업 유형 선택 ── */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
            style={{ color: "var(--muted)" }}>
            {ed.courseTypeLbl}
          </p>
          <div className="flex flex-col gap-3">
            {COURSE_TYPES.map((c) => {
              const selected = courseType === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCourseType(c.id)}
                  className="w-full text-left rounded-2xl p-4 border transition-all"
                  style={selected
                    ? { background: `${c.detailColor}12`, borderColor: c.detailColor }
                    : { background: "var(--card)", borderColor: "var(--border)" }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: selected ? `${c.detailColor}20` : "var(--bg)" }}
                    >
                      {c.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>
                          {c.title}
                        </p>
                        <span
                          className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${c.detailColor}20`, color: c.detailColor }}
                        >
                          {c.badge}
                        </span>
                        <span className="text-[11px] font-bold ml-auto" style={{ color: c.detailColor }}>
                          {fmt(c.price)}
                        </span>
                      </div>
                      <p className="text-[12px] leading-relaxed mb-2" style={{ color: "var(--muted)" }}>
                        {c.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {c.details.map((d) => (
                          <span
                            key={d}
                            className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{
                              background: selected ? `${c.detailColor}15` : "rgba(255,255,255,0.04)",
                              color: selected ? c.detailColor : "var(--muted)",
                              border: `1px solid ${selected ? `${c.detailColor}30` : "var(--border)"}`,
                            }}
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div
                      className="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center"
                      style={{
                        borderColor: selected ? c.detailColor : "var(--border)",
                        background: selected ? c.detailColor : "transparent",
                      }}
                    >
                      {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 수업 형태 선택 ── */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            수업 형태 선택
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "online",  emoji: "💻", label: "온라인",   desc: "Zoom 화상 · 녹화본 제공 · 전국 어디서나" },
              { id: "offline", emoji: "🏢", label: "오프라인", desc: "대면 강의 · 장소 개별 협의 · 서울 기준" },
            ].map((f) => {
              const sel = format === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id as "online" | "offline")}
                  className="rounded-2xl p-4 border text-left transition-all"
                  style={sel
                    ? { background: "rgba(212,175,55,0.12)", borderColor: "#d4af37" }
                    : { background: "var(--card)", borderColor: "var(--border)" }}
                >
                  <span className="text-2xl block mb-2">{f.emoji}</span>
                  <p className="text-sm font-bold mb-0.5" style={{ color: sel ? "#d4af37" : "var(--text)" }}>{f.label}</p>
                  <p className="text-[10px] leading-snug" style={{ color: "var(--muted)" }}>{f.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 수업 방식 ── */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            수업 방식
          </p>
          <div className="rounded-2xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="space-y-3.5">
              {[
                { icon: "📚", title: "CIO 직접 집필 교재 기반 커리큘럼", desc: "SUNRYU Partners CIO가 직접 집필한 교재를 기반으로 체계적으로 학습합니다. 수강 후 PDF 영구 보유 가능." },
                { icon: "💻", title: "온라인 · 오프라인 모두 강의", desc: "Zoom 화상 또는 대면 강의 선택 가능. 화상 수업은 녹화본 제공. 일정과 장소 모두 협의 가능합니다." },
                { icon: "📊", title: "CIO 실전 종목 분석 공개", desc: "CIO가 실제 보유 중인 종목의 매수 이유·목표가·관리법을 그대로 공개합니다." },
                { icon: "💬", title: "내 포트폴리오 직접 피드백", desc: "수업 중 실시간 Q&A 가능. 내 포트폴리오를 CIO가 직접 점검하고 피드백을 드립니다." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{item.title}</p>
                    <p className="text-[11px] leading-relaxed mt-0.5" style={{ color: "var(--muted)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {ed.highlights.map((h, i) => (
            <div
              key={h.label}
              className="rounded-xl p-3.5 border flex items-center gap-3"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(212,175,55,0.12)", color: "#d4af37" }}
              >
                {HIGHLIGHT_ICONS[i]}
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color: "var(--text)" }}>{h.label}</p>
                <p className="text-[10px]" style={{ color: "var(--muted)" }}>{h.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── 이런 분께 추천 ── */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            이런 분께 추천합니다
          </p>
          <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            {[
              "미국주식을 시작하고 싶지만 어디서 시작해야 할지 모르는 분",
              "손실이 무서워서 투자를 망설이고 계신 분",
              "유튜브·블로그만 보다가 체계적인 원칙을 잡고 싶은 분",
              "내 포트폴리오를 전문가에게 직접 점검받고 싶은 분",
              "AI·반도체 등 미래 성장 섹터에 집중 투자하고 싶은 분",
              "수익이 나도 왜 나는지 모르겠는 분 (재현 가능한 원칙 구축)",
            ].map((item, i) => (
              <div
                key={item}
                className="flex gap-2.5 px-4 py-2.5"
                style={{ borderTop: i > 0 ? "1px solid var(--border)" : undefined }}
              >
                <span className="text-sm flex-shrink-0">✅</span>
                <p className="text-[12px] leading-snug" style={{ color: "var(--muted)" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
            style={{ color: "var(--muted)" }}>
            {ed.curriculum}
          </p>
          <div className="rounded-2xl border overflow-hidden"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            {ed.weeks.map((c, i) => (
              <div key={c.week} className={i < ed.weeks.length - 1 ? "border-b" : ""}
                style={{ borderColor: "var(--border)" }}>
                <button
                  onClick={() => setOpenWeek(openWeek === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3.5"
                >
                  <div className="flex items-center gap-3 text-left">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: "rgba(212,175,55,0.15)", color: "#d4af37" }}
                    >
                      {c.week}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                      {c.title}
                    </span>
                  </div>
                  <ChevronDown
                    className="w-4 h-4 flex-shrink-0 transition-transform"
                    style={{
                      color: "var(--muted)",
                      transform: openWeek === i ? "rotate(180deg)" : "none",
                    }}
                  />
                </button>
                {openWeek === i && (
                  <div className="px-4 pb-3.5">
                    {c.items.map((item) => (
                      <div key={item} className="flex items-start gap-2 py-1">
                        <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: "#d4af37" }} />
                        <p className="text-[12px]" style={{ color: "var(--muted)" }}>{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            자주 묻는 질문
          </p>
          <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            {[
              { q: "완전 초보도 들을 수 있나요?", a: "네, 가능합니다. 1주차부터 투자 기초를 다루므로 처음 시작하는 분도 환영합니다." },
              { q: "온라인과 오프라인 중 어느 쪽이 좋나요?", a: "두 방식 모두 동일한 커리큘럼으로 진행됩니다. 온라인은 전국 어디서나 가능하고 녹화본을 제공하며, 오프라인은 서울 기준 대면으로 진행합니다." },
              { q: "수업 일정은 어떻게 정하나요?", a: "신청 후 CIO와 협의하여 일정을 정합니다. 주중·주말 모두 가능하며 시간대도 유연하게 협의 가능합니다." },
              { q: "강의 자료는 언제 받나요?", a: "수업 시작 전 PDF 파일로 발송됩니다. 수강 후에도 영구 보유 가능합니다." },
              { q: "환불 규정이 어떻게 되나요?", a: "수업 시작 24시간 전까지 전액 환불 가능합니다. 시작 후에는 진행된 회차만큼 공제 후 환불됩니다." },
            ].map((item, i) => (
              <div
                key={item.q}
                className="px-4 py-3.5"
                style={{ borderTop: i > 0 ? "1px solid var(--border)" : undefined }}
              >
                <p className="text-[12px] font-semibold" style={{ color: "var(--text)" }}>Q. {item.q}</p>
                <p className="text-[11px] mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>A. {item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 수강 신청 폼 ── */}
        <div className="mb-5">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
            style={{ color: "var(--muted)" }}>
            {ed.formTitle}
          </p>
          <div className="flex flex-col gap-2">

            {/* Name */}
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-[11px] w-14 flex-shrink-0" style={{ color: "var(--muted)" }}>{ed.nameLbl}</span>
              <input
                type="text"
                placeholder={ed.namePH}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text)" }}
              />
            </div>

            {/* Contact */}
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-[11px] w-14 flex-shrink-0" style={{ color: "var(--muted)" }}>{ed.phoneLbl}</span>
              <input
                type="tel"
                placeholder={ed.phonePH}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text)" }}
              />
            </div>

            {/* Investment experience */}
            <div>
              <p className="text-[11px] mb-1.5 ml-1" style={{ color: "var(--muted)" }}>
                {ed.levelLbl}
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {ed.levels.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className="py-2.5 rounded-xl border text-xs font-medium transition-all"
                    style={level === l
                      ? { background: "rgba(212,175,55,0.18)", borderColor: "#d4af37", color: "#d4af37" }
                      : { background: "var(--card)", borderColor: "var(--border)", color: "var(--muted)" }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Portfolio size */}
            <div>
              <p className="text-[11px] mb-1.5 ml-1" style={{ color: "var(--muted)" }}>
                {ed.amountLbl}
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {ed.amounts.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAmount(amount === a ? "" : a)}
                    className="py-2.5 rounded-xl border text-xs font-medium transition-all"
                    style={amount === a
                      ? { background: "rgba(212,175,55,0.18)", borderColor: "#d4af37", color: "#d4af37" }
                      : { background: "var(--card)", borderColor: "var(--border)", color: "var(--muted)" }}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <textarea
              placeholder={ed.msgPH}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={3}
              className="rounded-xl px-3 py-2.5 border text-sm outline-none resize-none"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>
        </div>

        {error && (
          <p className="text-xs mb-4 text-center" style={{ color: "#ef4444" }}>{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={step === "submitting"}
          className="w-full py-4 rounded-2xl text-base font-bold active:opacity-80 transition-opacity disabled:opacity-60"
          style={{
            background: selectedCourse
              ? `linear-gradient(135deg, ${selectedCourse.detailColor}cc, ${selectedCourse.detailColor})`
              : "linear-gradient(135deg, #b8960c, #d4af37)",
            color: selectedCourse ? "#fff" : "#000",
            boxShadow: `0 4px 24px ${selectedCourse?.detailColor ?? "#d4af37"}55`,
          }}
        >
          {step === "submitting" ? ed.submitting : ed.submit}
        </button>

        <p className="text-[10px] text-center mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
          {ed.notice.split("\n").map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </p>
      </main>
    </div>
  );
}
