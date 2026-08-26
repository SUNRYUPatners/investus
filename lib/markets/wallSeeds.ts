import type { Post, Comment } from "@/lib/wallPosts";
import { MOCK_POSTS, MOCK_COMMENTS, LATEST_UPDATE } from "@/lib/wallPosts";
import type { AnalystMockPost, AnalystMockComment } from "@/lib/analystPosts";
import { MOCK_ANALYST_POSTS, MOCK_ANALYST_COMMENTS } from "@/lib/analystPosts";
import {
  MOCK_POSTS_KR,
  MOCK_COMMENTS_KR,
  MOCK_POSTS_SAFE,
  MOCK_COMMENTS_SAFE,
  MOCK_POSTS_KR_RE,
  MOCK_COMMENTS_KR_RE,
} from "@/lib/wallPosts-markets";
import {
  MOCK_ANALYST_POSTS_KR,
  MOCK_ANALYST_COMMENTS_KR,
  MOCK_ANALYST_POSTS_SAFE,
  MOCK_ANALYST_COMMENTS_SAFE,
  MOCK_ANALYST_POSTS_KR_RE,
  MOCK_ANALYST_COMMENTS_KR_RE,
} from "@/lib/analystPosts-markets";
import type { MarketId } from "./types";

export type WallSeeds = {
  posts: Post[];
  comments: Record<number, Comment[]>;
  analystPosts: AnalystMockPost[];
  analystComments: Record<number, AnalystMockComment[]>;
  symbols: string[];
  latestUpdate: number;
};

const US_SYMBOLS = [
  "NVDA", "TSLA", "SPCX", "AAPL", "PLTR", "MSFT", "META",
  "AMZN", "GOOGL", "AMD", "AVGO", "COIN", "SMCI",
  "RKLB", "IONQ", "CEG",
  "VOO", "SPY", "QQQ", "SCHD",
];

function symbolsFromPosts(posts: Post[], extra: string[] = []): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of [...posts.map((p) => p.symbol), ...extra]) {
    if (!s || seen.has(s)) continue;
    seen.add(s);
    out.push(s);
  }
  return out;
}

function latestFromPosts(posts: Post[]): number {
  if (posts.length === 0) return Date.now();
  return Math.max(...posts.map((p) => p.createdAt));
}

/** 시장별 피드 시드 — 레이아웃은 본사이트 WallPage 그대로, 내용만 교체 */
export function getWallSeeds(market: MarketId): WallSeeds {
  if (market === "kr") {
    return {
      posts: MOCK_POSTS_KR,
      comments: MOCK_COMMENTS_KR,
      analystPosts: MOCK_ANALYST_POSTS_KR,
      analystComments: MOCK_ANALYST_COMMENTS_KR,
      symbols: symbolsFromPosts(MOCK_POSTS_KR, [
        "삼성전자", "SK하이닉스", "LG에너지솔루션", "삼성바이오로직스", "현대차",
        "기아", "셀트리온", "KB금융", "신한지주", "네이버",
      ]),
      latestUpdate: latestFromPosts(MOCK_POSTS_KR),
    };
  }
  if (market === "safe") {
    return {
      posts: MOCK_POSTS_SAFE,
      comments: MOCK_COMMENTS_SAFE,
      analystPosts: MOCK_ANALYST_POSTS_SAFE,
      analystComments: MOCK_ANALYST_COMMENTS_SAFE,
      symbols: symbolsFromPosts(MOCK_POSTS_SAFE, ["비트코인", "이더리움", "솔라나", "리플", "BNB", "금", "은", "구리", "백금", "WTI원유"]),
      latestUpdate: latestFromPosts(MOCK_POSTS_SAFE),
    };
  }
  if (market === "kr-re") {
    return {
      posts: MOCK_POSTS_KR_RE,
      comments: MOCK_COMMENTS_KR_RE,
      analystPosts: MOCK_ANALYST_POSTS_KR_RE,
      analystComments: MOCK_ANALYST_COMMENTS_KR_RE,
      symbols: symbolsFromPosts(MOCK_POSTS_KR_RE, ["서울매매", "전세", "정책", "강남", "수도권"]),
      latestUpdate: latestFromPosts(MOCK_POSTS_KR_RE),
    };
  }
  return {
    posts: MOCK_POSTS,
    comments: MOCK_COMMENTS,
    analystPosts: MOCK_ANALYST_POSTS,
    analystComments: MOCK_ANALYST_COMMENTS,
    symbols: US_SYMBOLS,
    latestUpdate: LATEST_UPDATE,
  };
}
