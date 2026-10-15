"use client";

import { useState } from "react";
import { useLocaleCode } from "@/contexts/LocaleContext";

type Book = {
  title: string;
  titleEn: string;
  author: string;
  authorEn: string;
  isbn: string;       // for Open Library cover
  kyobo: string;
  amazon: string;     // Amazon search keyword
  authorColor: string;
  authorLabel: string;
  authorLabelEn: string;
};

// Order: 워렌 버핏 → 찰리 멍거 → 피터 린치 → 존 보글
const BOOKS: Book[] = [
  // ── 워렌 버핏 ──
  {
    title: "워렌 버핏의 주주서한",
    titleEn: "The Essays of Warren Buffett",
    author: "워렌 버핏 · 로런스 커닝햄",
    authorEn: "Warren Buffett & Lawrence Cunningham",
    isbn: "9781611637588",
    kyobo: "워렌+버핏+주주서한",
    amazon: "Essays+Warren+Buffett+Cunningham",
    authorLabel: "워렌 버핏",
    authorLabelEn: "Warren Buffett",
    authorColor: "#fb923c",
  },
  {
    title: "스노볼",
    titleEn: "The Snowball",
    author: "앨리스 슈뢰더",
    authorEn: "Alice Schroeder",
    isbn: "9780553384611",
    kyobo: "스노볼+워렌버핏",
    amazon: "Snowball+Warren+Buffett+Schroeder",
    authorLabel: "워렌 버핏",
    authorLabelEn: "Warren Buffett",
    authorColor: "#fb923c",
  },
  {
    title: "현명한 투자자",
    titleEn: "The Intelligent Investor",
    author: "벤저민 그레이엄",
    authorEn: "Benjamin Graham",
    isbn: "9780060555665",
    kyobo: "현명한+투자자+그레이엄",
    amazon: "Intelligent+Investor+Benjamin+Graham",
    authorLabel: "워렌 버핏",
    authorLabelEn: "Warren Buffett",
    authorColor: "#fb923c",
  },
  // ── 찰리 멍거 ──
  {
    title: "찰리 멍거의 투자와 인생 원칙",
    titleEn: "Poor Charlie's Almanack",
    author: "찰리 멍거",
    authorEn: "Charlie Munger",
    isbn: "9781578645015",
    kyobo: "찰리+멍거+투자와+인생+원칙",
    amazon: "Poor+Charlies+Almanack+Munger",
    authorLabel: "찰리 멍거",
    authorLabelEn: "Charlie Munger",
    authorColor: "#c084fc",
  },
  {
    title: "멍거의 말",
    titleEn: "Seeking Wisdom: From Darwin to Munger",
    author: "피터 카우프만 편",
    authorEn: "Peter Bevelin",
    isbn: "9789881399519",
    kyobo: "멍거의+말",
    amazon: "Seeking+Wisdom+Darwin+Munger+Bevelin",
    authorLabel: "찰리 멍거",
    authorLabelEn: "Charlie Munger",
    authorColor: "#c084fc",
  },
  // ── 피터 린치 ──
  {
    title: "전설로 떠나는 월가의 영웅",
    titleEn: "One Up On Wall Street",
    author: "피터 린치",
    authorEn: "Peter Lynch",
    isbn: "9780743200400",
    kyobo: "전설로+떠나는+월가의+영웅",
    amazon: "One+Up+On+Wall+Street+Lynch",
    authorLabel: "피터 린치",
    authorLabelEn: "Peter Lynch",
    authorColor: "#60a5fa",
  },
  {
    title: "이기는 투자",
    titleEn: "Beating the Street",
    author: "피터 린치",
    authorEn: "Peter Lynch",
    isbn: "9780743200497",
    kyobo: "이기는+투자+피터린치",
    amazon: "Beating+the+Street+Peter+Lynch",
    authorLabel: "피터 린치",
    authorLabelEn: "Peter Lynch",
    authorColor: "#60a5fa",
  },
  {
    title: "피터 린치의 투자 이야기",
    titleEn: "Learn to Earn",
    author: "피터 린치 · 존 로스차일드",
    authorEn: "Peter Lynch & John Rothchild",
    isbn: "9780743229968",
    kyobo: "피터린치+투자이야기",
    amazon: "Learn+to+Earn+Peter+Lynch",
    authorLabel: "피터 린치",
    authorLabelEn: "Peter Lynch",
    authorColor: "#60a5fa",
  },
  // ── 존 보글 ──
  {
    title: "모든 주식을 소유하라",
    titleEn: "The Little Book of Common Sense Investing",
    author: "존 보글",
    authorEn: "John C. Bogle",
    isbn: "9780470102107",
    kyobo: "존+보글+모든+주식",
    amazon: "Little+Book+Common+Sense+Investing+Bogle",
    authorLabel: "존 보글",
    authorLabelEn: "John Bogle",
    authorColor: "#34d399",
  },
  {
    title: "뮤추얼 펀드 상식",
    titleEn: "Common Sense on Mutual Funds",
    author: "존 보글",
    authorEn: "John C. Bogle",
    isbn: "9781119404507",
    kyobo: "존+보글+뮤추얼+펀드",
    amazon: "Common+Sense+Mutual+Funds+Bogle",
    authorLabel: "존 보글",
    authorLabelEn: "John Bogle",
    authorColor: "#34d399",
  },
];

const COVER_BASE = "https://covers.openlibrary.org/b/isbn";

function BookCard({ book, isKo }: { book: Book; isKo: boolean }) {
  const [imgFailed, setImgFailed] = useState(false);
  const href = isKo
    ? `https://search.kyobobook.co.kr/search?keyword=${book.kyobo}`
    : `https://www.amazon.com/s?k=${book.amazon}`;
  const displayTitle = isKo ? book.title : book.titleEn;
  const displayAuthor = isKo ? book.author : book.authorEn;
  const displayLabel = isKo ? book.authorLabel : book.authorLabelEn;

  return (
    <a
      href={href}
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
            alt={displayTitle}
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
              {displayTitle}
            </p>
          </div>
        )}
      </div>

      {/* Meta */}
      <p
        className="text-[10px] font-bold truncate"
        style={{ color: book.authorColor }}
      >
        {displayLabel}
      </p>
      <p
        className="text-[11px] font-semibold leading-snug line-clamp-2 mt-0.5"
        style={{ color: "var(--text)" }}
      >
        {displayTitle}
      </p>
      <p
        className="text-[10px] mt-0.5 truncate"
        style={{ color: "var(--muted)" }}
      >
        {displayAuthor}
      </p>
    </a>
  );
}

export function BookCarousel() {
  const locale = useLocaleCode();
  const isKo = locale === "ko";
  return (
    <div
      className="flex gap-4 overflow-x-auto pb-3 no-scrollbar"
      style={{ touchAction: "pan-x pan-y" }}
    >
      {BOOKS.map((book) => (
        <BookCard key={`${book.titleEn}-${book.isbn}`} book={book} isKo={isKo} />
      ))}
    </div>
  );
}
