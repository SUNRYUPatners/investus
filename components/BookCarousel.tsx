"use client";

import { useState } from "react";

type Book = {
  title: string;
  author: string;
  isbn: string;       // for Open Library cover
  kyobo: string;
  authorColor: string;
  authorLabel: string;
};

// Order: 워렌 버핏 → 찰리 멍거 → 피터 린치 → 존 보글
const BOOKS: Book[] = [
  // ── 워렌 버핏 ──
  {
    title: "워렌 버핏의 주주서한",
    author: "워렌 버핏 · 로런스 커닝햄",
    isbn: "9781611637588",
    kyobo: "워렌+버핏+주주서한",
    authorLabel: "워렌 버핏",
    authorColor: "#fb923c",
  },
  {
    title: "스노볼",
    author: "앨리스 슈뢰더",
    isbn: "9780553384611",
    kyobo: "스노볼+워렌버핏",
    authorLabel: "워렌 버핏",
    authorColor: "#fb923c",
  },
  {
    title: "현명한 투자자",
    author: "벤저민 그레이엄",
    isbn: "9780060555665",
    kyobo: "현명한+투자자+그레이엄",
    authorLabel: "워렌 버핏",
    authorColor: "#fb923c",
  },
  // ── 찰리 멍거 ──
  {
    title: "찰리 멍거의 투자와 인생 원칙",
    author: "찰리 멍거",
    isbn: "9781578645015",
    kyobo: "찰리+멍거+투자와+인생+원칙",
    authorLabel: "찰리 멍거",
    authorColor: "#c084fc",
  },
  {
    title: "멍거의 말",
    author: "피터 카우프만 편",
    isbn: "9789881399519",
    kyobo: "멍거의+말",
    authorLabel: "찰리 멍거",
    authorColor: "#c084fc",
  },
  // ── 피터 린치 ──
  {
    title: "전설로 떠나는 월가의 영웅",
    author: "피터 린치",
    isbn: "9780743200400",
    kyobo: "전설로+떠나는+월가의+영웅",
    authorLabel: "피터 린치",
    authorColor: "#60a5fa",
  },
  {
    title: "이기는 투자",
    author: "피터 린치",
    isbn: "9780743200497",
    kyobo: "이기는+투자+피터린치",
    authorLabel: "피터 린치",
    authorColor: "#60a5fa",
  },
  {
    title: "피터 린치의 투자 이야기",
    author: "피터 린치 · 존 로스차일드",
    isbn: "9780743229968",
    kyobo: "피터린치+투자이야기",
    authorLabel: "피터 린치",
    authorColor: "#60a5fa",
  },
  // ── 존 보글 ──
  {
    title: "모든 주식을 소유하라",
    author: "존 보글",
    isbn: "9780470102107",
    kyobo: "존+보글+모든+주식",
    authorLabel: "존 보글",
    authorColor: "#34d399",
  },
  {
    title: "뮤추얼 펀드 상식",
    author: "존 보글",
    isbn: "9781119404507",
    kyobo: "존+보글+뮤추얼+펀드",
    authorLabel: "존 보글",
    authorColor: "#34d399",
  },
];

const COVER_BASE = "https://covers.openlibrary.org/b/isbn";

function BookCard({ book }: { book: Book }) {
  const [imgFailed, setImgFailed] = useState(false);
  const kyoboUrl = `https://search.kyobobook.co.kr/search?keyword=${book.kyobo}`;

  return (
    <a
      href={kyoboUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-[110px] active:opacity-70 transition-opacity"
    >
      {/* Cover */}
      <div
        className="w-[110px] h-[160px] rounded-xl overflow-hidden mb-2 flex items-center justify-center"
        style={{ background: `${book.authorColor}18`, border: `1px solid ${book.authorColor}33` }}
      >
        {!imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${COVER_BASE}/${book.isbn}-M.jpg`}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 px-2">
            <span className="text-3xl">📖</span>
            <p
              className="text-[9px] text-center leading-snug font-semibold"
              style={{ color: book.authorColor }}
            >
              {book.title}
            </p>
          </div>
        )}
      </div>

      {/* Meta */}
      <p
        className="text-[10px] font-bold truncate"
        style={{ color: book.authorColor }}
      >
        {book.authorLabel}
      </p>
      <p
        className="text-[11px] font-semibold leading-snug line-clamp-2 mt-0.5"
        style={{ color: "var(--text)" }}
      >
        {book.title}
      </p>
      <p
        className="text-[10px] mt-0.5 truncate"
        style={{ color: "var(--muted)" }}
      >
        {book.author}
      </p>
    </a>
  );
}

export function BookCarousel() {
  return (
    <div
      className="flex gap-4 overflow-x-auto pb-3 no-scrollbar"
      style={{ touchAction: "pan-x" }}
    >
      {BOOKS.map((book) => (
        <BookCard key={`${book.title}-${book.isbn}`} book={book} />
      ))}
    </div>
  );
}
