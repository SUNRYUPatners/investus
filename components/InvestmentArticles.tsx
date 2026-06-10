"use client";

import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

const SECTIONS = [
  {
    badge:   "투자 기초 지식",
    title:   "주식이란 무엇인가? 완전 기초부터",
    desc:    "주식의 개념부터 주주의 권리까지, 투자를 처음 접하는 분을 위한 가장 기본적인 설명입니다.",
    count:   22,
    color:   "var(--mint)",
    anchor:  "#basics",
  },
  {
    badge:   "투자 대가 전략",
    title:   "워렌 버핏의 투자 원칙: 60년을 관통하는 7가지 지혜",
    desc:    "버크셔 해서웨이 주주서한과 버핏의 연설에서 추린, 세상에서 가장 검증된 투자 원칙을 정리합니다.",
    count:   9,
    color:   "#f59e0b",
    anchor:  "#masters",
  },
];

export function InvestmentArticles() {
  return (
    <div className="flex flex-col gap-3">
      {SECTIONS.map((s) => (
        <Link
          key={s.badge}
          href={`/study${s.anchor}`}
          style={{ textDecoration: "none" }}
        >
          <div
            className="rounded-2xl border p-4 flex gap-3 active:opacity-80 transition-opacity"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${s.color}18` }}
            >
              <BookOpen className="w-5 h-5" style={{ color: s.color }} />
            </div>

            <div className="flex-1 min-w-0">
              <span
                className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mb-1.5"
                style={{ background: `${s.color}18`, color: s.color }}
              >
                {s.badge}
              </span>
              <p className="text-[13px] font-bold leading-snug mb-1" style={{ color: "var(--text)" }}>
                {s.title}
              </p>
              <p className="text-[11px] leading-snug mb-2" style={{ color: "var(--muted)" }}>
                {s.desc}
              </p>
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-semibold" style={{ color: s.color }}>
                  더보기 ({s.count}개 글)
                </span>
                <ChevronRight className="w-3 h-3" style={{ color: s.color }} />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
