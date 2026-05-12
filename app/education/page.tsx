"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, CheckCircle, BookOpen, TrendingUp, Users, Clock, ChevronDown } from "lucide-react";
import Link from "next/link";

const CURRICULUM = [
  {
    week: "1주차",
    title: "투자 마인드셋",
    items: ["잃지 않는 투자의 원칙", "리스크 관리 기초", "포트폴리오 설계 철학"],
  },
  {
    week: "2주차",
    title: "미국 시장 이해",
    items: ["S&P500 / 나스닥 구조 분석", "섹터 로테이션 전략", "경기 사이클과 투자 타이밍"],
  },
  {
    week: "3주차",
    title: "종목 분석 실전",
    items: ["재무제표 읽는 법", "밸류에이션 기초 (PER, PBR, EV/EBITDA)", "성장주 vs 가치주 선별 기준"],
  },
  {
    week: "4주차",
    title: "미래 투자 섹터",
    items: ["AI · 반도체 산업 분석", "에너지 전환과 투자 기회", "실전 포트폴리오 구성 실습"],
  },
];

const HIGHLIGHTS = [
  { icon: <Clock className="w-5 h-5" />,       label: "4주 과정",       sub: "주 2회 · 90분" },
  { icon: <Users className="w-5 h-5" />,        label: "소수 정예",       sub: "회당 최대 8명" },
  { icon: <BookOpen className="w-5 h-5" />,     label: "자료 제공",       sub: "강의 PDF 포함" },
  { icon: <TrendingUp className="w-5 h-5" />,   label: "실전 중심",       sub: "종목 토론 포함" },
];

const LEVELS = ["주식 처음입니다", "6개월 미만", "6개월~2년", "2년 이상"];
const AMOUNTS = ["500만원 미만", "500~2,000만원", "2,000~5,000만원", "5,000만원 이상"];

type Step = "form" | "success";

export default function EducationPage() {
  const [step, setStep]           = useState<Step>("form");
  const [openWeek, setOpenWeek]   = useState<number | null>(0);
  const [name,   setName]         = useState("");
  const [phone,  setPhone]        = useState("");
  const [level,  setLevel]        = useState("");
  const [amount, setAmount]       = useState("");
  const [msg,    setMsg]          = useState("");
  const [error,  setError]        = useState("");

  const handleSubmit = () => {
    if (!name.trim())  { setError("이름을 입력해주세요."); return; }
    if (!phone.trim()) { setError("연락처를 입력해주세요."); return; }
    if (!level)        { setError("투자 경력을 선택해주세요."); return; }

    // Save to localStorage (will be reviewed by host)
    try {
      const apps = JSON.parse(localStorage.getItem("edu_applications") ?? "[]");
      apps.push({ name, phone, level, amount, msg, at: new Date().toISOString() });
      localStorage.setItem("edu_applications", JSON.stringify(apps));
    } catch {}

    setStep("success");
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
            신청 완료!
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {name}님, 신청해 주셔서 감사합니다.{"\n"}
            빠른 시일 내에 연락드리겠습니다.
          </p>
        </div>

        <div
          className="w-full max-w-sm rounded-2xl border p-5"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <p className="text-xs font-semibold mb-3 font-syne" style={{ color: "var(--muted)" }}>
            신청 내역
          </p>
          {[
            ["이름",     name],
            ["연락처",   phone],
            ["투자 경력", level],
            ["투자 규모", amount || "미입력"],
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
          인사이트로 돌아가기
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
          <ChevronLeft className="w-3.5 h-3.5" /> 인사이트
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
            ✦ 소수 정예 클래스
          </div>
          <h1 className="text-xl font-bold font-syne mb-2" style={{ color: "var(--text)" }}>
            미국주식<br />투자 교육
          </h1>
          <p className="text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
            잃지 않는 투자의 원칙부터<br />
            실전 종목 분석까지 — 4주 집중 과정
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.label}
              className="rounded-xl p-3.5 border flex items-center gap-3"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(139,92,246,0.12)", color: "#a78bfa" }}
              >
                {h.icon}
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
            커리큘럼
          </p>
          <div className="rounded-2xl border overflow-hidden"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            {CURRICULUM.map((c, i) => (
              <div key={c.week} className={i < CURRICULUM.length - 1 ? "border-b" : ""}
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
            수강 신청
          </p>
          <div className="flex flex-col gap-2">

            {/* 이름 */}
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-[11px] w-12 flex-shrink-0" style={{ color: "var(--muted)" }}>이름</span>
              <input
                type="text"
                placeholder="홍길동 (필수)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text)" }}
              />
            </div>

            {/* 연락처 */}
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-[11px] w-12 flex-shrink-0" style={{ color: "var(--muted)" }}>연락처</span>
              <input
                type="tel"
                placeholder="010-0000-0000 (필수)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text)" }}
              />
            </div>

            {/* 투자 경력 */}
            <div>
              <p className="text-[11px] mb-1.5 ml-1" style={{ color: "var(--muted)" }}>
                투자 경력 (필수)
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {LEVELS.map((l) => (
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

            {/* 투자 규모 */}
            <div>
              <p className="text-[11px] mb-1.5 ml-1" style={{ color: "var(--muted)" }}>
                현재 투자 규모 (선택)
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {AMOUNTS.map((a) => (
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

            {/* 문의 사항 */}
            <textarea
              placeholder="문의 사항이나 궁금한 점을 남겨주세요. (선택)"
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
          <p className="text-xs mb-4 text-center" style={{ color: "#ff4d6d" }}>{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-2xl text-base font-bold active:opacity-80 transition-opacity"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
            color: "#fff",
            boxShadow: "0 4px 24px rgba(139,92,246,0.35)",
          }}
        >
          수강 신청하기
        </button>

        <p className="text-[10px] text-center mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
          신청 접수 후 1~2일 내 연락드립니다.{"\n"}
          문의: @hnryu_cio (X) · 카카오톡 오픈채팅
        </p>
      </main>
    </div>
  );
}
