"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, CheckCircle, BookOpen, TrendingUp, Users, Clock, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";

const HIGHLIGHT_ICONS = [
  <Clock className="w-5 h-5" key="clock" />,
  <Users className="w-5 h-5" key="users" />,
  <BookOpen className="w-5 h-5" key="book" />,
  <TrendingUp className="w-5 h-5" key="trend" />,
];

type Step = "form" | "submitting" | "success" | "error";

export default function EducationPage() {
  const t  = useLocale();
  const ed = t.education;
  const [step, setStep]           = useState<Step>("form");
  const [openWeek, setOpenWeek]   = useState<number | null>(0);
  const [name,   setName]         = useState("");
  const [phone,  setPhone]        = useState("");
  const [level,  setLevel]        = useState("");
  const [amount, setAmount]       = useState("");
  const [msg,    setMsg]          = useState("");
  const [error,  setError]        = useState("");

  const handleSubmit = async () => {
    if (!name.trim())  { setError(ed.errName); return; }
    if (!phone.trim()) { setError(ed.errPhone); return; }
    if (!level)        { setError(ed.errLevel); return; }

    setError("");
    setStep("submitting");

    try {
      const res = await fetch("/api/edu-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, level, amount, message: msg }),
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
          style={{ background: "rgba(139,92,246,0.15)" }}
        >
          <CheckCircle className="w-10 h-10" style={{ color: "#a78bfa" }} />
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
            [ed.summaryName,   name],
            [ed.summaryPhone,  phone],
            [ed.summaryLevel,  level],
            [ed.summaryAmount, amount || ed.noAmount],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1.5 border-b last:border-0"
              style={{ borderColor: "var(--border)" }}>
              <span className="text-xs" style={{ color: "var(--muted)" }}>{k}</span>
              <span className="text-xs font-medium" style={{ color: "var(--text)" }}>{v}</span>
            </div>
          ))}
        </div>

        <Link
          href="/insight"
          className="text-xs"
          style={{ color: "var(--muted)" }}
        >
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
            background: "linear-gradient(135deg, #1a0d2e 0%, #0d0d1f 60%, #0a0c10 100%)",
            border: "1px solid rgba(139,92,246,0.25)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at 80% 20%, rgba(139,92,246,0.12) 0%, transparent 60%)" }} />
          <div
            className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full mb-3"
            style={{ background: "rgba(139,92,246,0.2)", color: "#a78bfa" }}
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
                style={{ background: "rgba(139,92,246,0.12)", color: "#a78bfa" }}
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
                      style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa" }}
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
                          style={{ background: "#a78bfa" }} />
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
                      ? { background: "rgba(139,92,246,0.2)", borderColor: "#a78bfa", color: "#a78bfa" }
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
                      ? { background: "rgba(139,92,246,0.2)", borderColor: "#a78bfa", color: "#a78bfa" }
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
            background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
            color: "#fff",
            boxShadow: "0 4px 24px rgba(139,92,246,0.35)",
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
