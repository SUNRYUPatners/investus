"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, CheckCircle, BookOpen, TrendingUp, Users, Clock, ChevronDown, Copy, CreditCard } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";

const HIGHLIGHT_ICONS = [
  <Clock className="w-5 h-5" key="clock" />,
  <TrendingUp className="w-5 h-5" key="trend" />,
  <BookOpen className="w-5 h-5" key="book" />,
  <Users className="w-5 h-5" key="users" />,
];

const ACCOUNT = {
  bank:   "카카오뱅크",
  number: "3333-22-2070396",
  holder: "류현우",
};

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
    details: ["최대 8명 소규모", "주 1회 · 90분", "강의 PDF 제공", "종목 토론 포함"],
    detailColor: "#a78bfa",
  },
];

function fmt(n: number) {
  return "₩" + n.toLocaleString("ko-KR");
}

type Step = "form" | "submitting" | "success" | "error";

function AccountInfo({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(ACCOUNT.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="w-full max-w-sm rounded-2xl border p-5"
      style={{ background: "var(--card)", borderColor: "rgba(212,175,55,0.3)" }}>
      <p className="text-xs font-semibold mb-3 font-syne" style={{ color: "#d4af37" }}>
        계좌이체 안내
      </p>
      {[
        { label: "은행", value: ACCOUNT.bank },
        { label: "예금주", value: ACCOUNT.holder },
      ].map(({ label, value }) => (
        <div key={label} className="flex justify-between py-1.5 border-b"
          style={{ borderColor: "var(--border)" }}>
          <span className="text-xs" style={{ color: "var(--muted)" }}>{label}</span>
          <span className="text-xs font-medium" style={{ color: "var(--text)" }}>{value}</span>
        </div>
      ))}
      <div className="flex justify-between items-center py-1.5 border-b"
        style={{ borderColor: "var(--border)" }}>
        <span className="text-xs" style={{ color: "var(--muted)" }}>계좌번호</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold font-mono" style={{ color: "var(--text)" }}>{ACCOUNT.number}</span>
          <button onClick={copy}
            className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold"
            style={{
              background: copied ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.06)",
              color: copied ? "#d4af37" : "var(--muted)",
            }}>
            <Copy className="w-3 h-3" />{copied ? "복사됨" : "복사"}
          </button>
        </div>
      </div>
      <div className="pt-2 text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
        입금자명에{" "}
        <span className="font-bold" style={{ color: "var(--text)" }}>{name}</span>
        으로 입금해주세요.{"\n"}
        확인 후 1~2일 내 연락드립니다.
      </div>
    </div>
  );
}

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
            ...(selectedCourse ? [["수강료", fmt(selectedCourse.price)]] : []),
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1.5 border-b last:border-0"
              style={{ borderColor: "var(--border)" }}>
              <span className="text-xs" style={{ color: "var(--muted)" }}>{k}</span>
              <span className="text-xs font-medium" style={{ color: "var(--text)" }}>{v}</span>
            </div>
          ))}
        </div>

        <AccountInfo name={name} />

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

        {/* ── CIO 검증 실적 & 포트폴리오 ── */}
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

          {/* 트랙레코드 */}
          <div
            className="grid grid-cols-3"
            style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}
          >
            {[
              { value: "100%+", label: "전 종목 수익률", color: "#4ade80" },
              { value: "0개",   label: "손실 종목",      color: "#4ade80" },
              { value: "100%",  label: "수익 달성률",    color: "#d4af37" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="py-4 text-center"
                style={{ borderLeft: i > 0 ? "1px solid var(--border)" : undefined }}
              >
                <p className="text-xl font-bold font-syne" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-[9px] mt-0.5" style={{ color: "var(--muted)" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* 포트폴리오 보유 종목 */}
          <div className="px-5 py-4" style={{ background: "var(--card)" }}>
            <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
              CIO 보유 포트폴리오 · 전 종목 수익 중
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { symbol: "NVDA", name: "NVIDIA" },
                { symbol: "TSLA", name: "Tesla" },
                { symbol: "AAPL", name: "Apple" },
                { symbol: "META", name: "Meta" },
                { symbol: "GOOGL", name: "Alphabet" },
                { symbol: "AMZN", name: "Amazon" },
              ].map((s) => (
                <div
                  key={s.symbol}
                  className="rounded-xl p-2.5 border text-center"
                  style={{ background: "var(--bg)", borderColor: "var(--border)" }}
                >
                  <p className="text-xs font-bold font-mono-num" style={{ color: "var(--text)" }}>{s.symbol}</p>
                  <p className="text-[9px]" style={{ color: "var(--muted)" }}>{s.name}</p>
                  <p className="text-[9px] font-bold mt-1" style={{ color: "#4ade80" }}>수익 ✓</p>
                </div>
              ))}
            </div>
            <p className="text-[9px] mt-2.5 text-center" style={{ color: "var(--muted)" }}>
              ※ 전 보유 종목 수익률 100% 이상 달성 · 브로커리지 실계좌 인증
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

        {/* ── 수업 방식 ── */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            수업 방식
          </p>
          <div className="rounded-2xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="space-y-3.5">
              {[
                { icon: "📖", title: "전자책 기반 커리큘럼", desc: "CIO가 직접 집필한 전자책 교재 기반으로 학습합니다. 수강 후 PDF 영구 보유 가능." },
                { icon: "💻", title: "온라인 화상 수업 (Zoom)", desc: "시간·장소 제약 없이 편리하게 수업. 녹화본 제공으로 복습 가능. 일정 협의 가능." },
                { icon: "📊", title: "실전 종목 분석 공개", desc: "CIO가 실제 보유하는 종목의 매수 이유·목표가·관리법까지 실시간으로 공개합니다." },
                { icon: "💬", title: "포트폴리오 직접 피드백", desc: "수업 중 실시간 Q&A 가능. 내 포트폴리오에 대한 CIO 직접 피드백을 받을 수 있습니다." },
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
              "수익이 나도 왜 나는지 모르겠는 분 (재현 불가 투자 탈출)",
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
              { q: "수업 일정은 어떻게 정하나요?", a: "신청 후 CIO와 협의하여 일정을 정합니다. 주중·주말 모두 가능하며 시간대도 유연하게 협의 가능합니다." },
              { q: "전자책은 언제 받나요?", a: "수업 시작 전 PDF 파일로 발송됩니다. 수강 후에도 영구 보유 가능합니다." },
              { q: "환불 규정이 어떻게 되나요?", a: "수업 시작 24시간 전까지 전액 환불 가능합니다. 시작 후에는 진행된 회차만큼 공제 후 환불됩니다." },
              { q: "수업 녹화본을 받을 수 있나요?", a: "네, 모든 수업은 녹화되어 제공됩니다. 반복 학습 및 복습에 활용하세요." },
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

        {/* 결제 수단 */}
        <div className="mb-5">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
            style={{ color: "var(--muted)" }}>
            결제 수단
          </p>
          <div className="flex items-center gap-3 rounded-2xl border p-4 mb-2"
            style={{ background: "var(--card)", borderColor: "#d4af37" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(212,175,55,0.12)" }}>
              <span className="text-lg">🏦</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: "var(--text)" }}>계좌이체</p>
              <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                카카오뱅크 · 수수료 없음 · 신청 완료 후 계좌 안내
              </p>
            </div>
            <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "#d4af37" }}>
              <div className="w-2 h-2 rounded-full" style={{ background: "#d4af37" }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 opacity-40 pointer-events-none select-none">
            {[
              { icon: <CreditCard className="w-5 h-5" />, label: "신용·체크카드" },
              { icon: <span className="text-base font-black text-[#0064FF]">toss</span>, label: "토스페이" },
              { icon: <span className="text-lg">💛</span>, label: "카카오페이" },
              { icon: <span className="text-base font-black text-[#03C75A]">N</span>, label: "네이버페이" },
            ].map(({ icon, label }) => (
              <div key={label}
                className="flex flex-col items-center gap-1.5 py-3 rounded-2xl border relative"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                {icon}
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>{label}</span>
                <span className="absolute top-1.5 right-1.5 text-[8px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={{ background: "rgba(255,255,255,0.06)", color: "var(--muted)" }}>
                  준비중
                </span>
              </div>
            ))}
          </div>
        </div>

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
