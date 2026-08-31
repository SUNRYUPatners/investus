#!/usr/bin/env node
/**
 * MOCK 애널 글(comments 필드) ↔ MOCK_ANALYST_COMMENTS 배열 길이 일치 검증.
 * 리포트 업데이트 시 댓글 데이터 누락으로 「숫자만 있고 본문 없음」 버그 방지.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

/** 2026-08-29 이후 시드부터 댓글 본문 필수 */
const VALIDATE_SINCE = "2026-08-29";

function loadFile(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function countMockComments(hay, id) {
  const key = `[${id}]:`;
  const idx = hay.indexOf(key);
  if (idx === -1) return 0;
  const blockStart = hay.indexOf("[", idx + key.length);
  if (blockStart === -1) return 0;
  let depth = 0;
  let aliasCount = 0;
  for (let i = blockStart; i < hay.length; i++) {
    if (hay.slice(i, i + 6) === "alias:") aliasCount++;
    const ch = hay[i];
    if (ch === "[") depth++;
    if (ch === "]") {
      depth--;
      if (depth === 0) break;
    }
  }
  return aliasCount;
}

function parseMockPosts(section) {
  const posts = [];
  const re =
    /\{\s*id:\s*(-\d+),[\s\S]*?comments:\s*(\d+),[\s\S]*?created_at:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(section)) !== null) {
    posts.push({ id: Number(m[1]), comments: Number(m[2]), created_at: m[3] });
  }
  return posts;
}

function extractSection(src, exportName) {
  const parts = src.split(`export const ${exportName}`);
  if (parts.length < 2) return "";
  return parts[1].split(/export const MOCK_/)[0];
}

function validateMarketPair(src, postsName, commentsName, label) {
  const postsSection = extractSection(src, postsName);
  const commentsSection = extractSection(src, commentsName);
  const posts = parseMockPosts(postsSection);
  const errors = [];
  const warnings = [];

  for (const p of posts) {
    if (p.id >= 0) continue;
    if (p.created_at < VALIDATE_SINCE) continue;
    const actual = countMockComments(commentsSection, p.id);
    if (p.comments > 0 && actual === 0) {
      errors.push(
        `${label} id ${p.id}: comments=${p.comments} but MOCK has 0 — 클릭 시 빈 댓글`,
      );
    } else if (actual > 0 && actual !== p.comments) {
      warnings.push(`${label} id ${p.id}: comments=${p.comments}, mock=${actual}`);
    }
  }
  return { errors, warnings };
}

function validateUs() {
  const src = loadFile("lib/analystPosts.ts");
  const posts = parseMockPosts(src);
  const errors = [];
  const warnings = [];

  for (const p of posts) {
    if (p.id >= 0) continue;
    if (p.created_at < VALIDATE_SINCE) continue;
    const actual = countMockComments(src, p.id);
    if (p.comments > 0 && actual === 0) {
      errors.push(
        `lib/analystPosts.ts id ${p.id}: comments=${p.comments} but MOCK has 0 — 클릭 시 빈 댓글`,
      );
    } else if (actual > 0 && actual !== p.comments) {
      warnings.push(`lib/analystPosts.ts id ${p.id}: comments=${p.comments}, mock=${actual}`);
    }
  }
  return { errors, warnings };
}

const marketsSrc = loadFile("lib/analystPosts-markets.ts");
const allErrors = [];
const allWarnings = [];

const us = validateUs();
allErrors.push(...us.errors);
allWarnings.push(...us.warnings);

for (const [postsName, commentsName, label] of [
  ["MOCK_ANALYST_POSTS_KR", "MOCK_ANALYST_COMMENTS_KR", "KR"],
  ["MOCK_ANALYST_POSTS_SAFE", "MOCK_ANALYST_COMMENTS_SAFE", "SAFE"],
  ["MOCK_ANALYST_POSTS_KR_RE", "MOCK_ANALYST_COMMENTS_KR_RE", "KR_RE"],
]) {
  const { errors, warnings } = validateMarketPair(
    marketsSrc,
    postsName,
    commentsName,
    `lib/analystPosts-markets.ts (${label})`,
  );
  allErrors.push(...errors);
  allWarnings.push(...warnings);
}

for (const w of allWarnings) {
  console.warn(`⚠ ${w}`);
}

if (allErrors.length > 0) {
  console.error(
    "✗ 애널 MOCK 댓글 동기화 오류:\n" +
      allErrors.map((e) => `  - ${e}`).join("\n"),
  );
  process.exit(1);
}

console.log("✓ 애널 MOCK posts ↔ comments 동기화 OK");
