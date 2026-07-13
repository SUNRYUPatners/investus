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

const COURSE = {
  id: "vip-private",
  emoji: "👤",
  title: "1:1 VIP 프라이빗 교육",
  price: 990000,
  badge: "VIP 전용",
  desc: "CIO와 1:1로만 진행합니다. 수강생 일정에 맞춰 수업 시간을 조율하며, 실계좌 성장 과정과 그 기반이 된 투자 원칙·노하우를 교육 목적으로 전달합니다.",
  details: ["1:1 VIP 전용", "고객 맞춤 일정", "CIO 직접 지도", "수강료 99만원"],
  detailColor: "#d4af37",
};

const PORTFOLIO = [
  { symbol: "TSLA",  name: "테슬라",   ret: "+100.49%" },
  { symbol: "PLTR",  name: "팔란티어", ret: "+133.24%" },
  { symbol: "IBM",   name: "IBM",      ret: "+139.76%" },
  { symbol: "META",  name: "메타",     ret: "+159.99%" },
  { symbol: "GOOGL", name: "알파벳 A", ret: "수익 ✓"   },
];

function fmt(n: number) {
  return "₩" + n.toLocaleString("ko-KR");
}

type Step = "form" | "submitting" | "success";

export default function EducationPage() {
  const t  = useLocale();
  const ed = t.education;
  const [step, setStep]             = useState<Step>("form");
  const [openWeek, setOpenWeek]     = useState<number | null>(0);
  const [openFaq, setOpenFaq]       = useState<number | null>(null);
  const [format, setFormat]         = useState<"online" | "offline" | "">("");
  const [name,      setName]        = useState("");
  const [phone,     setPhone]       = useState("");
  const [level,     setLevel]       = useState("");
  const [amount,    setAmount]      = useState("");
  const [ageRange,  setAgeRange]    = useState("");
  const [timeSlot,  setTimeSlot]    = useState("");
  const [msg,       setMsg]         = useState("");
  const [error,     setError]       = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!format)      { setError("수업 형태를 선택해주세요."); return; }
    if (!name.trim()) { setError(ed.errName);             return; }
    if (!phone.trim()){ setError(ed.errPhone);            return; }
    if (!level)       { setError(ed.errLevel);            return; }
    setError("");
    setSubmitting(true);
    const formatLabel  = format === "online" ? "온라인(Zoom)" : "오프라인(대면)";
    const agePart      = ageRange  ? ` · ${ageRange}`  : "";
    const timePart     = timeSlot  ? ` · ${timeSlot}`  : "";
    try {
      const res = await fetch("/api/edu-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone,
          level: `[${COURSE.title} · ${formatLabel}${agePart}${timePart}] ${level}`,
          amount, message: msg,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error((d as { error?: string }).error ?? "서버 오류");
      }
      setStep("success");
    } catch (e) {
      setError((e as Error).message ?? "신청 중 오류가 발생했습니다.");
      setSubmitting(false);
    }
  };

  /* ── 신청 완료 ── */
  if (step === "success") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-6 pb-safe" style={{ background: "var(--bg)" }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(212,175,55,0.15)" }}>
          <CheckCircle className="w-10 h-10" style={{ color: "#d4af37" }} />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold font-syne mb-1" style={{ color: "var(--text)" }}>{ed.successTitle}</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{ed.successMsg(name)}</p>
          <p className="text-[11px] mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>수강료 안내 및 일정 협의는 개별적으로 연락드립니다.</p>
        </div>
        <div className="w-full max-w-sm rounded-2xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-semibold mb-3 font-syne" style={{ color: "var(--muted)" }}>{ed.summaryTitle}</p>
          {[
            [ed.summaryCourse, COURSE.title],
            ["수업 형태", format === "online" ? "온라인 (Zoom)" : "오프라인 (대면)"],
            [ed.summaryName,   name],
            [ed.summaryPhone,  phone],
            [ed.summaryLevel,  level],
            ...(ageRange  ? [[ed.summaryAge,      ageRange]]  : []),
            ...(timeSlot  ? [[ed.summaryTimeSlot, timeSlot]]  : []),
            ["수강료", fmt(COURSE.price)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1.5 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
              <span className="text-xs" style={{ color: "var(--muted)" }}>{k}</span>
              <span className="text-xs font-medium" style={{ color: "var(--text)" }}>{v}</span>
            </div>
          ))}
        </div>
        <Link href="/insight" className="text-xs" style={{ color: "var(--muted)" }}>{ed.backToInsight}</Link>
      </div>
    );
  }

  /* ──────────── 섹션 JSX 정의 ──────────── */

  const heroJSX = (
    <div className="rounded-2xl px-5 py-6 mb-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1c1500 0%, #0d0b00 60%, #0a0c10 100%)", border: "1px solid rgba(212,175,55,0.3)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 20%, rgba(212,175,55,0.1) 0%, transparent 60%)" }} />
      <div className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full mb-3"
        style={{ background: "rgba(212,175,55,0.18)", color: "#d4af37" }}>
        {ed.badge}
      </div>
      <h1 className="text-xl font-bold font-syne mb-2" style={{ color: "var(--text)" }}>
        {ed.heroTitle1}<br />{ed.heroTitle2}
      </h1>
      <p className="text-[13px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
        {ed.heroDesc.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
      </p>
      <p className="text-[11px] leading-relaxed" style={{ color: "rgba(212,175,55,0.85)" }}>
        CIO 본인 자산이 어떻게 성장해 왔는지, 그 과정에서 쌓은 투자 원칙과 의사결정 노하우를
        교육 목적으로 전부 전달합니다. 동일·유사 수익을 보장하지 않으며, 투자 판단과 책임은 수강생 본인에게 있습니다.
      </p>
    </div>
  );

  const cioJSX = (
    <div className="mb-6 rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(212,175,55,0.3)" }}>
      <div className="px-5 py-4 border-b"
        style={{ borderColor: "var(--border)", background: "linear-gradient(135deg, #1c1500 0%, #0a0c10 100%)" }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}>🎯</div>
          <div>
            <p className="text-[10px] font-bold" style={{ color: "#d4af37" }}>SUNRYU Partners CIO</p>
            <p className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>류현우</p>
            <p className="text-[11px]" style={{ color: "var(--muted)" }}>미국주식 투자 전략가 · 포트폴리오 매니저</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        {[
          { value: "+103.69%", label: "실계좌 전체 총 수익률", color: "#4ade80" },
          { value: "0개",       label: "손실 종목",             color: "#4ade80" },
          { value: "수억 원대", label: "운용 금액",             color: "#d4af37" },
        ].map((stat, i) => (
          <div key={stat.label} className="py-4 text-center"
            style={{ borderLeft: i > 0 ? "1px solid var(--border)" : undefined }}>
            <p className="text-sm font-bold font-syne leading-tight" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-[9px] mt-0.5" style={{ color: "var(--muted)" }}>{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="px-5 py-4" style={{ background: "var(--card)" }}>
        <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
          실계좌 보유 종목 · 브로커리지 인증
        </p>
        <div className="grid grid-cols-5 gap-1.5">
          {PORTFOLIO.map((s) => (
            <div key={s.symbol} className="rounded-xl p-2 border text-center"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
              <p className="text-[11px] font-bold font-mono-num" style={{ color: "var(--text)" }}>{s.symbol}</p>
              <p className="text-[8px]" style={{ color: "var(--muted)" }}>{s.name}</p>
              <p className="text-[8px] font-bold mt-0.5" style={{ color: "#4ade80" }}>{s.ret}</p>
            </div>
          ))}
        </div>
        <p className="text-[9px] mt-2.5 text-center" style={{ color: "var(--muted)" }}>
          ※ 과거 실적은 미래 수익을 보장하지 않습니다 · 교육·참고 목적의 사례 공개
        </p>
      </div>
    </div>
  );

  /* ── 수업 일정 (고객 맞춤) ── */
  const scheduleJSX = (
    <div className="mb-6">
      <p className="text-[10px] font-semibold tracking-widest uppercase mb-1 font-syne" style={{ color: "#d4af37" }}>
        {ed.scheduleTitle}
      </p>
      <p className="text-xl font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
        {ed.scheduleDesc}
      </p>
      <p className="text-[12px] mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
        고정된 반·시간표는 없습니다. 신청 후 CIO와 1:1로 평일·주말, 낮·저녁 중 가능한 시간을 맞춰 진행합니다.
      </p>

      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        {[
          { icon: "🗓️", title: "고객 맞춤 조율", desc: "수강생 일정에 맞춰 수업 요일·시간을 개별 협의합니다." },
          { icon: "⏰", title: "평일·주말 모두 가능", desc: `평일(${ed.scheduleWeekdayTime}) · 주말(${ed.scheduleWeekendTime})` },
          { icon: "👤", title: "1:1만 운영", desc: "그룹 반이 없어 다른 수강생 일정에 맞출 필요가 없습니다." },
        ].map((item, i) => (
          <div key={item.title} className="flex gap-3 px-4 py-3.5"
            style={{ borderTop: i > 0 ? "1px solid var(--border)" : undefined }}>
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{item.title}</p>
              <p className="text-[11px] leading-relaxed mt-0.5" style={{ color: "var(--muted)" }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] mt-2 text-center" style={{ color: "var(--muted)" }}>
        ※ 신청서의 희망 시간대를 참고해 개별 연락으로 최종 일정을 확정합니다.
      </p>
    </div>
  );

  /* ── 수업 흐름 ── */
  const flowJSX = (
    <div className="mb-6">
      <p className="text-[10px] font-semibold tracking-widest uppercase mb-1 font-syne" style={{ color: "#d4af37" }}>
        {ed.flowTitle}
      </p>
      <p className="text-xl font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
        {ed.flowDesc}
      </p>
      <p className="text-[12px] mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
        단발성 수업이 아니라, 배우고·적용하고·피드백 받는 과정이 매주 반복되는 투자 루틴입니다.
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {ed.steps.map((s) => (
          <div key={s.step} className="rounded-xl p-3.5 border"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="text-[9px] font-bold mb-1.5 font-syne" style={{ color: "#d4af37" }}>{s.step}</p>
            <p className="text-[12px] font-semibold mb-1" style={{ color: "var(--text)" }}>{s.title}</p>
            <p className="text-[10px] leading-snug" style={{ color: "var(--muted)" }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  /* ── 일정 변경 ── */
  const makeupJSX = (
    <div className="mb-6">
      <p className="text-[10px] font-semibold tracking-widest uppercase mb-1 font-syne" style={{ color: "#d4af37" }}>
        {ed.makeupTitle}
      </p>
      <p className="text-xl font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
        {ed.makeupDesc}
      </p>
      <p className="text-[12px] mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
        1:1 VIP이므로 고정 반이 없습니다. 부득이한 경우 사전 연락 주시면 대체 일정을 다시 맞춰 드립니다.
      </p>
      <div className="grid grid-cols-3 gap-2">
        {ed.makeups.map((m) => (
          <div key={m.num} className="rounded-xl p-3.5 border text-center"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="text-[10px] font-bold mb-2 font-syne" style={{ color: "var(--muted)" }}>{m.num}</p>
            <p className="text-[11px] font-semibold mb-1.5" style={{ color: "var(--text)" }}>{m.title}</p>
            <p className="text-[10px] leading-snug" style={{ color: "var(--muted)" }}>{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const classMethodJSX = (
    <div className="mb-6">
      <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>수업 방식</p>
      <div className="rounded-2xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="space-y-3.5">
          {[
            { icon: "📚", title: "CIO 직접 집필 교재 기반 커리큘럼", desc: "SUNRYU Partners CIO가 직접 집필한 교재를 기반으로 체계적으로 학습합니다. 수강 후 PDF 영구 보유 가능." },
            { icon: "💻", title: "실시간 Zoom 또는 오프라인 대면", desc: "Zoom 화상 수업 또는 서울 대면 중 선택. 일정은 수강생과 1:1로 조율합니다." },
            { icon: "📊", title: "실계좌 성장 과정·노하우 공개", desc: "CIO 본인 실계좌가 성장해 온 과정과 의사결정 원칙을 교육 사례로 공개합니다. (과거 실적 ≠ 미래 수익 보장)" },
            { icon: "💬", title: "내 포트폴리오 1:1 피드백", desc: "수업 중 실시간 Q&A. 포트폴리오를 CIO가 직접 점검하고 교육적 관점에서 피드백합니다." },
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
  );

  const whoForJSX = (
    <div className="mb-6">
      <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>이런 분께 추천합니다</p>
      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        {[
          "미국주식을 시작하고 싶지만 어디서 시작해야 할지 모르는 분",
          "손실이 무서워서 투자를 망설이고 계신 분",
          "유튜브·블로그만 보다가 체계적인 원칙을 잡고 싶은 분",
          "내 포트폴리오를 전문가에게 직접 점검받고 싶은 분",
          "AI·반도체 등 미래 성장 섹터에 집중 투자하고 싶은 분",
          "수익이 나도 왜 나는지 모르겠는 분 (재현 가능한 원칙 구축)",
        ].map((item, i) => (
          <div key={item} className="flex gap-2.5 px-4 py-2.5"
            style={{ borderTop: i > 0 ? "1px solid var(--border)" : undefined }}>
            <span className="text-sm flex-shrink-0">✅</span>
            <p className="text-[12px] leading-snug" style={{ color: "var(--muted)" }}>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const curriculumJSX = (
    <div className="mb-6">
      <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>{ed.curriculum}</p>
      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        {ed.weeks.map((c, i) => (
          <div key={c.week} className={i < ed.weeks.length - 1 ? "border-b" : ""} style={{ borderColor: "var(--border)" }}>
            <button onClick={() => setOpenWeek(openWeek === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3 text-left">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: "rgba(212,175,55,0.15)", color: "#d4af37" }}>{c.week}</span>
                <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>{c.title}</span>
              </div>
              <ChevronDown className="w-4 h-4 flex-shrink-0 transition-transform"
                style={{ color: "var(--muted)", transform: openWeek === i ? "rotate(180deg)" : "none" }} />
            </button>
            {openWeek === i && (
              <div className="px-4 pb-3.5">
                {c.items.map((item) => (
                  <div key={item} className="flex items-start gap-2 py-1">
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#d4af37" }} />
                    <p className="text-[12px]" style={{ color: "var(--muted)" }}>{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const allFaqs = [
    { q: "완전 초보도 들을 수 있나요?", a: "네, 가능합니다. 1주차부터 투자 기초를 다루므로 처음 시작하는 분도 환영합니다." },
    { q: "온라인과 오프라인 차이가 있나요?", a: "커리큘럼과 내용은 동일합니다. 온라인은 Zoom 실시간 화상, 오프라인은 서울 대면입니다. 일정은 모두 1:1로 조율합니다." },
    { q: "수업 일정은 어떻게 정하나요?", a: "고정 시간표가 없습니다. 신청 후 CIO와 협의하여 평일·주말, 낮·저녁 중 가능한 시간으로 확정합니다." },
    { q: "강의 자료는 언제 받나요?", a: "수업 시작 전 PDF 파일로 발송됩니다. 수강 후에도 영구 보유 가능합니다." },
    { q: "환불 규정이 어떻게 되나요?", a: "수업 시작 전까지 전액 환불 가능합니다. 수업이 시작되면 환불이 불가합니다." },
    { q: "수익을 보장하나요?", a: "보장하지 않습니다. 본 과정은 투자 교육이며, 과거 실적·사례 공유는 참고용입니다. 투자 판단과 결과에 대한 책임은 수강생 본인에게 있습니다." },
    ...ed.faqPlus,
  ];

  const faqJSX = (
    <div className="mb-6">
      <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>자주 묻는 질문</p>
      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        {allFaqs.map((item, i) => (
          <div key={item.q} style={{ borderTop: i > 0 ? "1px solid var(--border)" : undefined }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-start justify-between px-4 py-3.5 text-left gap-2">
              <p className="text-[12px] font-semibold" style={{ color: "var(--text)" }}>Q. {item.q}</p>
              <ChevronDown className="w-4 h-4 flex-shrink-0 mt-0.5 transition-transform"
                style={{ color: "var(--muted)", transform: openFaq === i ? "rotate(180deg)" : "none" }} />
            </button>
            {openFaq === i && (
              <div className="px-4 pb-3.5">
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>A. {item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const courseTypesJSX = (
    <div className="mb-6">
      <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>{ed.courseTypeLbl}</p>
      <div
        className="w-full text-left rounded-2xl p-4 border"
        style={{ background: `${COURSE.detailColor}12`, borderColor: COURSE.detailColor }}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${COURSE.detailColor}20` }}>{COURSE.emoji}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <p className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>{COURSE.title}</p>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${COURSE.detailColor}20`, color: COURSE.detailColor }}>{COURSE.badge}</span>
              <span className="text-[11px] font-bold ml-auto" style={{ color: COURSE.detailColor }}>{fmt(COURSE.price)}</span>
            </div>
            <p className="text-[12px] leading-relaxed mb-2" style={{ color: "var(--muted)" }}>{COURSE.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {COURSE.details.map((d) => (
                <span key={d} className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: `${COURSE.detailColor}15`,
                    color: COURSE.detailColor,
                    border: `1px solid ${COURSE.detailColor}30`,
                  }}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const formatJSX = (
    <div className="mb-6">
      <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>수업 형태 선택</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: "online",  emoji: "💻", label: "온라인",   desc: "실시간 Zoom 화상 미팅 · 전국 어디서나" },
          { id: "offline", emoji: "🏢", label: "오프라인", desc: "대면 강의 · 서울 · 장소 개별 협의" },
        ].map((f) => {
          const sel = format === f.id;
          return (
            <button key={f.id} onClick={() => setFormat(f.id as "online" | "offline")}
              className="rounded-2xl p-4 border text-left transition-all"
              style={sel ? { background: "rgba(212,175,55,0.12)", borderColor: "#d4af37" } : { background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-2xl block mb-2">{f.emoji}</span>
              <p className="text-sm font-bold mb-0.5" style={{ color: sel ? "#d4af37" : "var(--text)" }}>{f.label}</p>
              <p className="text-[10px] leading-snug" style={{ color: "var(--muted)" }}>{f.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );

  const highlightsJSX = (
    <div className="grid grid-cols-2 gap-2 mb-6">
      {ed.highlights.map((h, i) => (
        <div key={h.label} className="rounded-xl p-3.5 border flex items-center gap-3"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(212,175,55,0.12)", color: "#d4af37" }}>
            {HIGHLIGHT_ICONS[i]}
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: "var(--text)" }}>{h.label}</p>
            <p className="text-[10px]" style={{ color: "var(--muted)" }}>{h.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const formJSX = (
    <div className="mb-5">
      <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>{ed.formTitle}</p>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <span className="text-[11px] w-14 flex-shrink-0" style={{ color: "var(--muted)" }}>{ed.nameLbl}</span>
          <input type="text" placeholder={ed.namePH} value={name} onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none" style={{ color: "var(--text)" }} />
        </div>
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <span className="text-[11px] w-14 flex-shrink-0" style={{ color: "var(--muted)" }}>{ed.phoneLbl}</span>
          <input type="tel" placeholder={ed.phonePH} value={phone} onChange={(e) => setPhone(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none" style={{ color: "var(--text)" }} />
        </div>
        <div>
          <p className="text-[11px] mb-1.5 ml-1" style={{ color: "var(--muted)" }}>{ed.ageLbl}</p>
          <div className="grid grid-cols-3 gap-1.5">
            {ed.ages.map((a) => (
              <button key={a} onClick={() => setAgeRange(ageRange === a ? "" : a)}
                className="py-2.5 rounded-xl border text-xs font-medium transition-all"
                style={ageRange === a
                  ? { background: "rgba(212,175,55,0.18)", borderColor: "#d4af37", color: "#d4af37" }
                  : { background: "var(--card)", borderColor: "var(--border)", color: "var(--muted)" }}>
                {a}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] mb-1.5 ml-1" style={{ color: "var(--muted)" }}>{ed.levelLbl}</p>
          <div className="grid grid-cols-2 gap-1.5">
            {ed.levels.map((l) => (
              <button key={l} onClick={() => setLevel(l)}
                className="py-2.5 rounded-xl border text-xs font-medium transition-all"
                style={level === l
                  ? { background: "rgba(212,175,55,0.18)", borderColor: "#d4af37", color: "#d4af37" }
                  : { background: "var(--card)", borderColor: "var(--border)", color: "var(--muted)" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] mb-1.5 ml-1" style={{ color: "var(--muted)" }}>{ed.timeSlotLbl}</p>
          <div className="flex flex-col gap-1.5">
            {ed.timeSlots.map((ts) => (
              <button key={ts} onClick={() => setTimeSlot(timeSlot === ts ? "" : ts)}
                className="py-2.5 rounded-xl border text-xs font-medium transition-all text-left px-3"
                style={timeSlot === ts
                  ? { background: "rgba(212,175,55,0.18)", borderColor: "#d4af37", color: "#d4af37" }
                  : { background: "var(--card)", borderColor: "var(--border)", color: "var(--muted)" }}>
                {ts}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] mb-1.5 ml-1" style={{ color: "var(--muted)" }}>{ed.amountLbl}</p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
            {ed.amounts.map((a) => (
              <button key={a} onClick={() => setAmount(amount === a ? "" : a)}
                className="py-2.5 rounded-xl border text-xs font-medium transition-all"
                style={amount === a
                  ? { background: "rgba(212,175,55,0.18)", borderColor: "#d4af37", color: "#d4af37" }
                  : { background: "var(--card)", borderColor: "var(--border)", color: "var(--muted)" }}>
                {a}
              </button>
            ))}
          </div>
        </div>
        <textarea placeholder={ed.msgPH} value={msg} onChange={(e) => setMsg(e.target.value)}
          rows={3} className="rounded-xl px-3 py-2.5 border text-sm outline-none resize-none"
          style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }} />
      </div>
    </div>
  );

  const submitJSX = (
    <>
      <div className="rounded-xl px-4 py-3 mb-3 border"
        style={{ background: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.25)" }}>
        <p className="text-[11px] font-semibold mb-0.5" style={{ color: "#ef4444" }}>⚠ 환불 규정</p>
        <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
          수업 시작 전까지 전액 환불 가능합니다. <strong style={{ color: "#ef4444" }}>수업이 시작되면 환불이 불가합니다.</strong>
        </p>
      </div>
      <div className="rounded-xl px-4 py-3 mb-4 border"
        style={{ background: "rgba(255,255,255,0.03)", borderColor: "var(--border)" }}>
        <p className="text-[11px] font-semibold mb-0.5" style={{ color: "var(--muted)" }}>안내</p>
        <p className="text-[10px] leading-relaxed" style={{ color: "var(--muted)" }}>
          본 과정은 투자 교육 서비스입니다. 특정 종목의 매수·매도를 권유하거나 수익을 보장하지 않으며,
          공유되는 실계좌·사례는 참고용입니다. 투자 판단 및 결과에 대한 책임은 수강생 본인에게 있습니다.
        </p>
      </div>
      {error && <p className="text-xs mb-4 text-center" style={{ color: "#ef4444" }}>{error}</p>}
      <button onClick={handleSubmit} disabled={submitting}
        className="w-full py-4 rounded-2xl text-base font-bold active:opacity-80 transition-opacity disabled:opacity-60"
        style={{
          background: "linear-gradient(135deg, #b8960c, #d4af37)",
          color: "#000",
          boxShadow: "0 4px 24px #d4af3755",
        }}>
        {submitting ? ed.submitting : ed.submit}
      </button>
      <p className="text-[10px] text-center mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
        {ed.notice.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
      </p>
    </>
  );

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="lg:hidden max-w-[480px] mx-auto px-4 pt-4 pb-12">
        <Link href="/insight" className="inline-flex items-center gap-1 text-xs mb-5" style={{ color: "var(--muted)" }}>
          <ChevronLeft className="w-3.5 h-3.5" /> {ed.back}
        </Link>

        {heroJSX}
        {cioJSX}
        {highlightsJSX}
        {scheduleJSX}
        {flowJSX}
        {classMethodJSX}
        {makeupJSX}
        {whoForJSX}
        {curriculumJSX}
        {faqJSX}

        <div className="mt-2 mb-4 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span className="text-[11px] font-bold tracking-widest font-syne px-3 py-1 rounded-full"
            style={{ background: "rgba(212,175,55,0.12)", color: "#d4af37" }}>수강 신청</span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>
        {courseTypesJSX}
        {formatJSX}
        {formJSX}
        {submitJSX}
      </main>

      <div className="hidden lg:flex lg:gap-10 lg:px-10 lg:pt-5 lg:pb-12 lg:items-start">
        <div className="flex-1 min-w-0">
          <Link href="/insight" className="inline-flex items-center gap-1 text-xs mb-5" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-3.5 h-3.5" /> {ed.back}
          </Link>
          {heroJSX}
          {cioJSX}
          {highlightsJSX}
          {scheduleJSX}
          {flowJSX}
          {classMethodJSX}
          {makeupJSX}
          {whoForJSX}
          {curriculumJSX}
          {faqJSX}
        </div>

        <aside
          className="w-[420px] flex-shrink-0 sticky top-[57px] flex flex-col"
          style={{ maxHeight: "calc(100vh - 57px)" }}
        >
          <div className="overflow-y-auto no-scrollbar flex-1 pb-4">
            {courseTypesJSX}
            {formatJSX}
            {formJSX}
            {submitJSX}
          </div>
        </aside>
      </div>
    </div>
  );
}
