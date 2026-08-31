#!/usr/bin/env node
/**
 * MOCK 애널 글(comments 필드) ↔ MOCK_ANALYST_COMMENTS 배열 길이 일치 검증.
 * 리포트 업데이트 시 댓글 데이터 누락으로 「숫자만 있고 본문 없음」 버그 방지.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function loadFile(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function parseMockPosts(src) {
  const posts = [];
  const re = /\{\s*id:\s*(-\d+),[\s\S]*?comments:\s*(\d+),[\s\S]*?created_at:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    posts.push({ id: Number(m[1]), comments: Number(m[2]), created_at: m[3] });
  }
  return posts;
}

/** 2026-08-29 이후 시드부터 댓글 본문 필수 (그 이전 레거시는 UI가 mock 우선) */
const VALIDATE_SINCE = "2026-08-29";

function countMockComments(src, id) {
  const key = `[${id}]:`;
  const idx = src.indexOf(key);
  if (idx === -1) return 0;
  const blockStart = src.indexOf("[", idx + key.length);
  if (blockStart === -1) return 0;
  let depth = 0;
  let aliasCount = 0;
  for (let i = blockStart; i < src.length; i++) {
    if (src.slice(i, i + 6) === "alias:") aliasCount++;
    const ch = src[i];
    if (ch === "[") depth++;
    if (ch === "]") {
      depth--;
      if (depth === 0) break;
    }
  }
  return aliasCount;
}

function validateFile(postsFile, commentsMarker) {
  const src = loadFile(postsFile);
  const commentsSrc = commentsMarker === "US"
    ? src
    : loadFile(`lib/analystPosts-markets.ts`);
  const posts = parseMockPosts(src);
  const errors = [];

  for (const p of posts) {
    if (p.id >= 0) continue;
    if (p.created_at < VALIDATE_SINCE) continue;
    const commentSrc = commentsMarker === "US" ? src : commentsSrc;
    const prefix = commentsMarker === "US"
      ? ""
      : commentsMarker === "KR"
        ? "MOCK_ANALYST_COMMENTS_KR"
        : commentsMarker === "SAFE"
          ? "MOCK_ANALYST_COMMENTS_SAFE"
          : "MOCK_ANALYST_COMMENTS_KR_RE";
    const hay = commentsMarker === "US" ? commentSrc : commentSrc.split(prefix)[1] ?? "";
    const actual = countMockComments(hay, p.id);
    if (p.comments > 0 && actual === 0) {
      errors.push(
        `${postsFile} id ${p.id}: comments=${p.comments} but MOCK has 0 — 클릭 시 빈 댓글`,
      );
    } else if (actual > 0 && actual !== p.comments) {
      // 표시 숫자는 UI가 mock 길이 우선 — 경고만 (구 시드 정리 전)
      console.warn(`⚠ ${postsFile} id ${p.id}: comments=${p.comments}, mock=${actual}`);
    }
  }
  return errors;
}

const allErrors = [
  ...validateFile("lib/analystPosts.ts", "US"),
];

// markets — 경고만 (KR/Safe/KR-RE 댓글 보강은 별도 작업)
for (const [file, marker] of [
  ["lib/analystPosts-markets.ts", "KR"],
  ["lib/analystPosts-markets.ts", "SAFE"],
  ["lib/analystPosts-markets.ts", "KR_RE"],
]) {
  const src = loadFile(file);
  const posts = [];
  const listName =
    marker === "KR"
      ? "MOCK_ANALYST_POSTS_KR"
      : marker === "SAFE"
        ? "MOCK_ANALYST_POSTS_SAFE"
        : "MOCK_ANALYST_POSTS_KR_RE";
  const section = src.split(`export const ${listName}`)[1];
  if (!section) continue;
  const re = /\{\s*id:\s*(-\d+),[\s\S]*?comments:\s*(\d+),[\s\S]*?created_at:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(section)) !== null) {
    posts.push({ id: Number(m[1]), comments: Number(m[2]), created_at: m[3] });
  }
  const commentsName =
    marker === "KR"
      ? "MOCK_ANALYST_COMMENTS_KR"
      : marker === "SAFE"
        ? "MOCK_ANALYST_COMMENTS_SAFE"
        : "MOCK_ANALYST_COMMENTS_KR_RE";
  const commentsHay = src.split(`export const ${commentsName}`)[1] ?? "";
  for (const p of posts) {
    if (p.id >= 0) continue;
    if (p.created_at < VALIDATE_SINCE) continue;
    const actual = countMockComments(commentsHay, p.id);
    if (p.comments > 0 && actual === 0) {
      console.warn(`⚠ ${file} (${marker}) id ${p.id}: comments=${p.comments} but MOCK has 0`);
    } else if (actual > 0 && actual !== p.comments) {
      console.warn(`⚠ ${file} (${marker}) id ${p.id}: comments=${p.comments}, mock=${actual}`);
    }
  }
}

if (allErrors.length > 0) {
  console.error("✗ 애널 MOCK 댓글 동기화 오류:\n" + allErrors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}

console.log("✓ 애널 MOCK posts ↔ comments 동기화 OK");
