"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, CheckCircle, BookOpen, TrendingUp, Users, Clock, ChevronDown, User } from "lucide-react";
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
    badge: "최대 8명",
    badgeColor: "#a78bfa",
    desc: "소규모 그룹으로 함께 배우고 토론합니다. 다양한 시각과 질문 속에서 더 넓은 시야를 키울 수 있습니다.",
    details: ["최대 8명 소규모", "주 1회 · 90분", "강의 PDF 제공", "종목 토론 포함"],
    detailColor: "#a78bfa",
  },
];

type Step = "form" | "submitting" | "success" | "error";

export default function EducationPage() {
  const t  = useLocale();
  const ed = t.education;
  const [step, setStep]           = useState<Step>("form");
  const [openWeek, setOpenWeek]   = useState<number | null>(0);
  const [courseType, setCourseType] = useState("");
  const [name,   setName]         = useState("");
  const [phone,  setPhone]        = useState("");
  const [level,  setLevel]        = useState("");
  const [amount, setAmount]       = useState("");
  const [msg,    setMsg]          = useState("");
  const [error,  setError]        = useState("");

  const selectedCourse = COURSE_TYPES.find((c) => c.id === courseType);

  const handleSubmit = async () => {
    if (!courseType)    { setError(ed.errCourse); return; }
    if (!name.trim())   { setError(ed.errName);  return; }
    if (!phone.trim())  { setError(ed.errPhone); return; }
    if (!level)         { setError(ed.errLevel); return; }

    setError("");
    setStep("submitting");

    const courseLabel = selectedCourse?.title ?? courseType;

    try {
      const res = await fetch("/api/edu-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          level: `[${courseLabel}] ${level}`,
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
            [ed.summaryName,    name],
            [ed.summaryPhone,   phone],
            [ed.summaryLevel,   level],
            [ed.summaryAmount,  amount || ed.noAmount],
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
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>
                          {c.title}
                        </p>
                        <span
                          className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${c.detailColor}20`, color: c.detailColor }}
                        >
                          {c.badge}
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
                    {/* 선택 표시 */}
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

        {/* Application form */}
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
