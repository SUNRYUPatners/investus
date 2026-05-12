"use client";

import { Header } from "@/components/Header";
import { ExternalLink } from "lucide-react";

// ── Books ────────────────────────────────────────────────────────────────────
type Book = { title: string; desc: string; kyobo: string };

const BOOKS: Record<string, { color: string; books: Book[] }> = {
  "피터 린치": {
    color: "#60a5fa",
    books: [
      { title: "전설로 떠나는 월가의 영웅", desc: "10루타 종목을 찾는 투자의 교과서", kyobo: "전설로+떠나는+월가의+영웅" },
      { title: "이기는 투자", desc: "뮤추얼 펀드 매니저의 실전 투자법칙", kyobo: "이기는+투자+피터린치" },
      { title: "피터 린치의 투자 이야기", desc: "초보 투자자를 위한 주식 입문서", kyobo: "피터린치+투자이야기" },
    ],
  },
  "찰리 멍거": {
    color: "#c084fc",
    books: [
      { title: "찰리 멍거의 투자와 인생 원칙", desc: "버크셔 부회장의 지혜 모음집 (Poor Charlie's Almanack)", kyobo: "찰리+멍거+투자와+인생+원칙" },
      { title: "멍거의 말", desc: "인간 심리와 투자 실수를 분석한 강의록", kyobo: "멍거의+말" },
    ],
  },
  "워렌 버핏": {
    color: "#fb923c",
    books: [
      { title: "워렌 버핏의 주주서한", desc: "버크셔 해서웨이 연간 투자 철학의 정수", kyobo: "워렌+버핏+주주서한" },
      { title: "스노볼", desc: "버핏의 삶과 투자 여정을 담은 공식 전기", kyobo: "스노볼+워렌버핏" },
      { title: "현명한 투자자", desc: "버핏이 가장 추천하는 가치투자 바이블 (벤저민 그레이엄)", kyobo: "현명한+투자자+그레이엄" },
    ],
  },
};

// ── XTimeline ────────────────────────────────────────────────────────────────
function XProfileCard() {
  return (
    <div className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      {/* Profile header */}
      <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#1d9bf0,#0d6efd)" }}>
            𝕏
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold" style={{ color: "var(--text)" }}>@hnryu_cio</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>미국주식 · 투자 인사이트</p>
          </div>
          <a href="https://x.com/hnryu_cio" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ background: "#1d9bf0", color: "#fff" }}>
            팔로우
          </a>
        </div>
      </div>
      {/* CTA */}
      <a href="https://x.com/hnryu_cio" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-between px-4 py-3 active:opacity-70 transition-opacity">
        <p className="text-sm" style={{ color: "var(--muted)" }}>최신 게시물 보기</p>
        <ExternalLink className="w-4 h-4" style={{ color: "var(--muted)" }} />
      </a>
    </div>
  );
}

// ── YouTube placeholder ───────────────────────────────────────────────────────
function YoutubeSection() {
  return (
    <div className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: "rgba(255,0,0,0.1)" }}>
            ▶️
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold" style={{ color: "var(--text)" }}>유튜브 채널</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>미국주식 분석 · 투자 전략</p>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)", color: "var(--muted)" }}>
            준비중
          </span>
        </div>
      </div>
      <div className="px-4 py-4 flex flex-col gap-2">
        {["S&P 500 지금 사도 될까? 5가지 체크리스트", "엔비디아 실적 분석 — AI 사이클 어디까지 왔나", "초보 투자자를 위한 ETF 포트폴리오 구성법"].map((title, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0"
            style={{ borderColor: "var(--border)" }}>
            <div className="w-14 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
              style={{ background: "var(--border)" }}>▶</div>
            <p className="text-xs leading-snug flex-1" style={{ color: "var(--text)" }}>{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Book card ────────────────────────────────────────────────────────────────
function BookCard({ book, color }: { book: Book; color: string }) {
  const url = `https://search.kyobobook.co.kr/search?keyword=${book.kyobo}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="flex items-start gap-3 p-3 rounded-xl border active:opacity-70 transition-opacity"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
      <div className="w-10 h-14 rounded-lg flex-shrink-0 flex items-center justify-center text-xl"
        style={{ background: `${color}22` }}>
        📖
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold leading-snug mb-0.5" style={{ color: "var(--text)" }}>
          {book.title}
        </p>
        <p className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>{book.desc}</p>
        <p className="text-[10px] mt-1.5 font-medium" style={{ color }}>교보문고 바로가기 →</p>
      </div>
    </a>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function StudyPage() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] mx-auto px-4 pb-24">
        {/* Title */}
        <div className="pt-5 pb-4">
          <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>공부방 📚</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>투자 인사이트 · 추천 도서</p>
        </div>

        {/* X 프로필 */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
            style={{ color: "var(--muted)" }}>
            X 프로필
          </h2>
          <XProfileCard />
        </section>

        {/* YouTube */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
            style={{ color: "var(--muted)" }}>
            유튜브
          </h2>
          <YoutubeSection />
        </section>

        {/* Books by author */}
        <section>
          <h2 className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
            style={{ color: "var(--muted)" }}>
            추천 도서
          </h2>
          <div className="flex flex-col gap-5">
            {Object.entries(BOOKS).map(([author, { color, books }]) => (
              <div key={author}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-4 rounded-full" style={{ background: color }} />
                  <p className="text-xs font-bold" style={{ color }}>{author}</p>
                </div>
                <div className="rounded-2xl border overflow-hidden"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="flex flex-col divide-y" style={{ borderColor: "var(--border)" }}>
                    {books.map((book) => (
                      <div key={book.title} className="p-3">
                        <BookCard book={book} color={color} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
