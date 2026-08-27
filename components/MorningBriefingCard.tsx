"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Lock, Moon, Sun } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { SessionBriefing } from "@/lib/morningBriefing";

import type { MarketId } from "@/lib/markets/types";

type ViewLang = "ko" | "en";

function LangToggle({ value, onChange }: { value: ViewLang; onChange: (v: ViewLang) => void }) {
  return (
    <div
      className="flex rounded-full border overflow-hidden flex-shrink-0"
      style={{ borderColor: "var(--border)" }}
      role="group"
      aria-label="브리핑 언어"
    >
      {([
        { id: "ko" as const, label: "한글" },
        { id: "en" as const, label: "EN" },
      ]).map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className="text-[10px] font-bold px-2.5 py-0.5"
            style={{
              background: active ? "var(--mint)" : "transparent",
              color: active ? "var(--on-accent)" : "var(--muted)",
            }}
            aria-pressed={active}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function pickText(viewEn: boolean, ko: string | undefined, en: string | undefined): string {
  if (viewEn) return (en || ko || "").trim();
  return (ko || en || "").trim();
}

export function MorningBriefingCard({
  locale: _locale = "ko",
  market = "us",
}: {
  locale?: string;
  market?: MarketId;
}) {
  const { user } = useAuth();
  const isPro = user?.isPro === true;
  const [briefing, setBriefing] = useState<SessionBriefing | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [viewLang, setViewLang] = useState<ViewLang>("ko");
  const viewEn = viewLang === "en";
  const isKo = !viewEn;
  const isKr = market === "kr";
  const apiUrl = isKr ? "/api/kr-session-briefing" : "/api/session-briefing";

  useEffect(() => {
    let cancelled = false;
    fetch(apiUrl)
      .then(async (r) => {
        const d = await r.json().catch(() => null) as { briefing?: SessionBriefing | null } | null;
        return d;
      })
      .then((d: { briefing?: SessionBriefing | null } | null) => {
        if (!cancelled) setBriefing(d?.briefing ?? null);
      })
      .catch(() => {
        if (!cancelled) setBriefing(null);
      });
    return () => { cancelled = true; };
  }, [apiUrl]);

  if (!briefing) return null;

  const isPre = briefing.phase === "pre";
  const accent = isPre ? "#fbbf24" : "#60a5fa";
  const Icon = isPre ? Moon : Sun;
  const label = isKo ? briefing.labelKo : briefing.labelEn;
  const headline = pickText(viewEn, briefing.headline, briefing.headlineEn);
  const bullets = viewEn && briefing.bulletsEn?.length ? briefing.bulletsEn : briefing.bullets;
  const teaserTitle = isKo
    ? isKr
      ? (isPre ? "한국장 개장 전, 오늘 핵심" : "한국장 마감 후, 세션 핵심")
      : (isPre ? "미국 개장 전, 오늘 핵심" : "미국 장마감 후, 세션 핵심")
    : isKr
      ? (isPre ? "Before KRX open" : "After KRX close")
      : (isPre ? "Before the open" : "After the close");

  if (!isPro) {
    return (
      <div
        className="rounded-2xl border p-4"
        style={{
          background: `linear-gradient(135deg, ${accent}14 0%, var(--card) 55%)`,
          borderColor: `${accent}40`,
        }}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4" style={{ color: accent }} />
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${accent}26`, color: accent }}
            >
              {label} · Pro
            </span>
          </div>
          <LangToggle value={viewLang} onChange={setViewLang} />
        </div>
        <p className="text-sm font-bold mb-1 leading-snug" style={{ color: "var(--text)" }}>
          {teaserTitle}
        </p>
        <p className="text-[12px] leading-relaxed mb-3 line-clamp-2" style={{ color: "var(--muted)" }}>
          {headline}
        </p>
        <Link
          href="/subscribe"
          className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-2 rounded-xl"
          style={{ background: "var(--mint)", color: "var(--on-accent)", textDecoration: "none" }}
        >
          <Lock className="w-3.5 h-3.5" />
          {isKo ? `Pro로 ${briefing.labelKo} 열기` : "Unlock with Pro"}
        </Link>
      </div>
    );
  }

  return (
    <section
      className="rounded-2xl border p-4"
      style={{
        background: `linear-gradient(135deg, ${accent}1a 0%, var(--card) 50%)`,
        borderColor: `${accent}4d`,
      }}
      aria-label={label}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <Icon className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: `${accent}2e`, color: accent }}
          >
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>
            {briefing.dateKey}
          </span>
          <LangToggle value={viewLang} onChange={setViewLang} />
        </div>
      </div>
      {briefing.source === "session-news" && (
        <p className="text-[10px] mb-2" style={{ color: "var(--muted)" }}>
          {isKo
            ? isKr
              ? "뉴스 기반 · 시총 탑10(삼성전자·SK하이닉스·현대차 등)"
              : "장중 뉴스 기반 · 테슬라·스페이스X·빅테크(M7)"
            : isKr
              ? "News-based · KRX top 10"
              : "Session news · Tesla, SpaceX, Mag7"}
        </p>
      )}

      <p className="text-sm font-bold leading-snug mb-3" style={{ color: "var(--text)" }}>
        {headline}
      </p>

      {bullets.length > 0 && (
        <ul className="flex flex-col gap-1.5 mb-3">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-[12px] leading-snug" style={{ color: "var(--muted)" }}>
              <span className="font-bold flex-shrink-0" style={{ color: accent }}>{i + 1}.</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="text-[10px] mb-2" style={{ color: "var(--muted)" }}>
        {isKo ? "항목을 누르면 요약·본문이 펼쳐집니다" : "Tap a row to expand summary & body"}
      </p>

      <div className="flex flex-col gap-1.5">
        {briefing.reports.map((r) => {
          const open = openId === r.id;
          const title = pickText(viewEn, r.title, r.titleEn);
          const summary = pickText(viewEn, r.summary, r.summaryEn);
          const body = pickText(viewEn, r.body, r.bodyEn);
          const images = viewEn && r.imagesEn?.length ? r.imagesEn : r.images;
          return (
            <div
              key={r.id}
              className="rounded-xl border overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "var(--border)" }}
            >
              <button
                type="button"
                onClick={() => setOpenId(open ? null : r.id)}
                className="w-full text-left px-3 py-2.5 flex items-start gap-2 transition-opacity active:opacity-80"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold leading-snug" style={{ color: "var(--text)" }}>
                    {title}
                  </p>
                  {!open && (
                    <p className="text-[10px] line-clamp-2 mt-0.5" style={{ color: "var(--muted)" }}>
                      {summary}
                    </p>
                  )}
                </div>
                <ChevronDown
                  className="w-4 h-4 flex-shrink-0 mt-0.5 transition-transform"
                  style={{
                    color: "var(--muted)",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {open && (
                <div className="px-3 pb-3 border-t" style={{ borderColor: "var(--border)" }}>
                  <p className="text-[12px] leading-relaxed mt-2 mb-2" style={{ color: "var(--text)" }}>
                    {summary}
                  </p>
                  {r.imageOnly && images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={images[0]}
                      alt={title}
                      className="w-full rounded-lg mb-2"
                    />
                  ) : null}
                  {body ? (
                    <div
                      className="text-[11px] leading-relaxed whitespace-pre-line max-h-[40vh] overflow-y-auto rounded-lg p-2.5"
                      style={{ background: "var(--bg)", color: "var(--muted)" }}
                    >
                      {body}
                    </div>
                  ) : !r.imageOnly ? (
                    <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                      {isKo ? "본문이 이미지·요약 중심인 리포트입니다." : "This report is summary/image focused."}
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
