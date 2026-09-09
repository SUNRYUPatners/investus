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

/** 자동 생성·플레이스홀더 댓글 차단 (2026-09-02 사고) */
const PLACEHOLDER_CONTENT = [
  /핵심 포인트 잘 정리/,
  /포인트 감사합니다/,
  /FOMC 전후 같이 보겠습니다$/,
];
const GENERIC_ALIASES = new Set(["팔로워", "질문", "댓글"]);
/** 애널 페르소나 ID (예: "분당 매 #31") */
const ANALYST_ALIAS_RE = /^.+ #\d{1,3}$/;

function loadFile(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function parseCommentEntries(commentsSection, postDates) {
  const entries = [];
  const blockRe = /\[(-\d+)\]:\s*\[([\s\S]*?)\n\s*\],/g;
  let m;
  while ((m = blockRe.exec(commentsSection)) !== null) {
    const postId = Number(m[1]);
    const postDate = postDates.get(postId);
    if (!postDate || postDate < VALIDATE_SINCE) continue;
    const inner = m[2];
    const cmRe = /alias:\s*"([^"]+)"[\s\S]*?content:\s*"((?:\\.|[^"\\])*)"/g;
    let cm;
    while ((cm = cmRe.exec(inner)) !== null) {
      const content = cm[2].replace(/\\n/g, "\n").replace(/\\"/g, '"');
      entries.push({ postId, alias: cm[1], content });
    }
  }
  return entries;
}

function buildPostDateMap(postsSection) {
  const map = new Map();
  for (const p of parseMockPosts(postsSection)) {
    map.set(p.id, p.created_at.slice(0, 10));
  }
  return map;
}

function getLatestPostDate(postsSection) {
  let max = "";
  for (const p of parseMockPosts(postsSection)) {
    if (p.id >= 0) continue;
    const d = p.created_at.slice(0, 10);
    if (d > max) max = d;
  }
  return max;
}

function validateCommentQuality(commentsSection, postsSection, label) {
  const errors = [];
  const latestDate = getLatestPostDate(postsSection);
  if (!latestDate) return errors;
  const postDates = buildPostDateMap(postsSection);
  const entries = parseCommentEntries(commentsSection, postDates);
  const contentCount = new Map();

  for (const e of entries) {
    const postDate = postDates.get(e.postId);
    if (!postDate || postDate !== latestDate) continue;
    if (PLACEHOLDER_CONTENT.some((re) => re.test(e.content))) {
      errors.push(
        `${label} id ${e.postId}: 플레이스홀더 댓글 — "${e.content.slice(0, 40)}…"`,
      );
    }
    if (/^댓글_\d+$/.test(e.alias)) {
      errors.push(
        `${label} id ${e.postId}: 자동 생성 alias "${e.alias}" — 페르소나 alias 사용`,
      );
    }
    if (GENERIC_ALIASES.has(e.alias)) {
      errors.push(
        `${label} id ${e.postId}: generic alias "${e.alias}" — 주제 맞춤 alias 필요`,
      );
    }
    if (!ANALYST_ALIAS_RE.test(e.alias)) {
      errors.push(
        `${label} id ${e.postId}: 애널 ID 형식 아님 "${e.alias}" — "지역 동물 #번호" 사용`,
      );
    }
    const key = e.content.trim();
    if (!contentCount.has(key)) contentCount.set(key, []);
    contentCount.get(key).push(e.postId);
  }

  for (const [content, ids] of contentCount) {
    const unique = [...new Set(ids)];
    if (unique.length > 1) {
      errors.push(
        `${label}: 동일 댓글 ${unique.length}곳 중복 — "${content.slice(0, 36)}…"`,
      );
    }
  }

  // 번호만 다른 템플릿 댓글 (한국 3번째… / 안전자산 5: … / 부동산 2 후속…)
  const stemCount = new Map();
  for (const e of entries) {
    const stem = e.content
      .replace(/한국\s*\d+\s*(번째\s*)?/g, "한국N")
      .replace(/안전자산\s*\d+/g, "안전자산N")
      .replace(/부동산\s*\d+/g, "부동산N")
      .replace(/\d+/g, "#")
      .replace(/\s+/g, " ")
      .trim();
    if (stem.length < 12) continue;
    if (!stemCount.has(stem)) stemCount.set(stem, []);
    stemCount.get(stem).push(e.postId);
  }
  for (const [stem, ids] of stemCount) {
    const unique = [...new Set(ids)];
    if (unique.length >= 3) {
      errors.push(
        `${label}: 번호만 다른 댓글 템플릿 ${unique.length}곳 — "${stem.slice(0, 40)}…"`,
      );
    }
  }

  return errors;
}

/**
 * 심볼별 댓글이 다른 종목·주제 키워드를 담으면 차단 (2026-09-08 사고).
 * 원인: 고유 댓글 일괄 rewrite 시 ID 오프셋으로 NVDA↔TSLA 댓글이 뒤바뀜.
 */
const SYMBOL_FORBIDDEN = {
  TSLA: [
    /엔비디아/,
    /파이어버드/,
    /칩 접근권/,
    /에이아?르엠|에이알엠/,
    /해외증권\s*880/,
    /구리 사상/,
    /비트코인을 금/,
  ],
  NVDA: [
    /사이버캡/,
    /테슬라/,
    /목표주가\s*500/,
    /언박스트/,
    /슬로베니아/,
    /옵티머스/,
    /기가\s*베를린/,
    /로보택시\s*플릿/,
    /스타십/,
    /준설/,
  ],
  SPCX: [
    /사이버캡/,
    /엔비디아/,
    /비트코인/,
    /슬로베니아/,
    /옵티머스/,
    /목표주가\s*500/,
    /언박스트/,
  ],
  BTC: [
    /사이버캡/,
    /엔비디아/,
    /슬로베니아/,
    /언박스트/,
    /옵티머스/,
    /스타십/,
    /준설/,
  ],
  ARM: [
    /사이버캡/,
    /엔비디아/,
    /비트코인/,
    /옵티머스/,
    /스타십/,
    /슬로베니아/,
  ],
};

function parsePostsWithSymbol(section) {
  const posts = [];
  const re =
    /\{\s*id:\s*(-\d+),[\s\S]*?symbol:\s*("([^"]*)"|null)[\s\S]*?content:\s*"((?:\\.|[^"\\])*)"[\s\S]*?created_at:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(section)) !== null) {
    posts.push({
      id: Number(m[1]),
      symbol: m[2] === "null" ? null : m[3],
      content: m[4].replace(/\\"/g, '"'),
      created_at: m[5],
    });
  }
  return posts;
}

function parseCommentTextsByPostId(commentsSection) {
  const map = new Map();
  const blockRe = /\[(-\d+)\]:\s*\[([\s\S]*?)\n\s*\],/g;
  let m;
  while ((m = blockRe.exec(commentsSection)) !== null) {
    const id = Number(m[1]);
    const texts = [];
    const cmRe = /content:\s*"((?:\\.|[^"\\])*)"/g;
    let cm;
    while ((cm = cmRe.exec(m[2])) !== null) {
      texts.push(cm[1].replace(/\\"/g, '"').replace(/\\n/g, "\n"));
    }
    map.set(id, texts);
  }
  return map;
}

function validateCommentSymbolMatch(postsSection, commentsSection, label) {
  const errors = [];
  const posts = parsePostsWithSymbol(postsSection);
  let latest = "";
  for (const p of posts) {
    if (p.id >= 0) continue;
    const d = p.created_at.slice(0, 10);
    if (d > latest) latest = d;
  }
  if (!latest) return errors;

  const comments = parseCommentTextsByPostId(commentsSection);
  for (const p of posts) {
    if (p.id >= 0) continue;
    if (p.created_at.slice(0, 10) !== latest) continue;
    if (!p.symbol || p.symbol === "MACRO") continue;
    const rules = SYMBOL_FORBIDDEN[p.symbol];
    if (!rules) continue;
    const texts = comments.get(p.id) || [];
    for (const t of texts) {
      for (const re of rules) {
        if (re.test(t)) {
          errors.push(
            `${label} id ${p.id} (${p.symbol}): 댓글이 다른 종목·주제 — "${t.slice(0, 48)}…"`,
          );
        }
      }
    }
  }
  return errors;
}

/** 당일 애널 글 오프닝 템플릿 (9/7 사고) */
function validatePostOpenings(postsSection, label) {
  const errors = [];
  const posts = [];
  const re =
    /\{\s*id:\s*(-\d+),[\s\S]*?content:\s*"((?:\\.|[^"\\])*)"[\s\S]*?created_at:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(postsSection)) !== null) {
    if (!m[3].startsWith("2026-09-07")) continue;
    posts.push({ id: Number(m[1]), content: m[2].replace(/\\"/g, '"') });
  }
  if (posts.length < 3) return errors;

  const BAD = [
    [/만 보면 놓칩니다/, "「만 보면 놓칩니다」"],
    [/왜\s+.+\s*인가요\?/, "「왜 ~인가요?」"],
    [/^[가-힣A-Za-z0-9]+\s*축:/, "「종목 축:」"],
    [/한장입니다\.\s/, "「~한장입니다.」+요약 복붙"],
  ];
  for (const [pat, name] of BAD) {
    const hit = posts.filter((p) => pat.test(p.content));
    if (hit.length >= 2) {
      errors.push(
        `${label}: ${name} 오프닝 ${hit.length}/${posts.length} — 글마다 구조 다양화 필요`,
      );
    }
  }

  // summary 복붙: 같은 날짜·가격 구문이 3글 이상에 반복
  const priceSnippet = posts.filter((p) =>
    /9월\s*4일[\s\S]{0,40}\d[\d,]*\s*원/.test(p.content),
  );
  if (priceSnippet.length >= Math.ceil(posts.length * 0.6)) {
    errors.push(
      `${label}: ${priceSnippet.length}개 글이 「9월 4일 …원」 요약 복붙형 — 각도별 문장 필요`,
    );
  }
  return errors;
}

/** 본문 중간 절단 (summary.slice 사고) — 문장 끝이 아니면 실패 (2026-09-09~) */
function validatePostContentComplete(postsSection, label, since = "2026-09-08") {
  const errors = [];
  const re =
    /\{\s*id:\s*(-\d+),[\s\S]*?content:\s*"((?:\\.|[^"\\])*)"[\s\S]*?created_at:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(postsSection)) !== null) {
    const created = m[3].slice(0, 10);
    if (created < since) continue;
    const content = m[2]
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\")
      .trim();
    if (content.length < 80) continue;
    const looksCut =
      /마시기 바$|마시기 바랍$|전기차 점$|킬로와시\)를\s*$|공개되기$|슬로베니아가$|필요합$|추론\s*$/.test(
        content,
      ) ||
      (!/(습니다|바랍니다|니다|요|다|죠)\.?["」』)]*$/.test(content) &&
        /[을를이가은는에의와과도로자시바점칸기]$/.test(content));
    if (looksCut) {
      errors.push(
        `${label} id ${m[1]}: 본문 중간 절단 — "${content.slice(-36)}…" (summary.slice 금지, 문장 끝까지)`,
      );
    }
  }
  return errors;
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

const usSrc = loadFile("lib/analystPosts.ts");
allErrors.push(
  ...validateCommentQuality(usSrc, usSrc, "lib/analystPosts.ts"),
);
allErrors.push(
  ...validateCommentSymbolMatch(usSrc, usSrc, "lib/analystPosts.ts"),
);
allErrors.push(
  ...validatePostContentComplete(usSrc, "lib/analystPosts.ts"),
);

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
  const postsSection = extractSection(marketsSrc, postsName);
  const commentsSection = extractSection(marketsSrc, commentsName);
  allErrors.push(
    ...validateCommentQuality(
      commentsSection,
      postsSection,
      `lib/analystPosts-markets.ts (${label})`,
    ),
  );
  allErrors.push(
    ...validatePostOpenings(
      postsSection,
      `lib/analystPosts-markets.ts (${label})`,
    ),
  );
  allErrors.push(
    ...validateCommentSymbolMatch(
      postsSection,
      commentsSection,
      `lib/analystPosts-markets.ts (${label})`,
    ),
  );
  allErrors.push(
    ...validatePostContentComplete(
      postsSection,
      `lib/analystPosts-markets.ts (${label})`,
    ),
  );
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
