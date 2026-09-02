#!/usr/bin/env node
/**
 * 종토방(wallPosts-markets) · 애널(analystPosts-markets) 소셜 품질 검증.
 * 2026-09-02 사고: 같은 날 게시글·댓글 복붙, 키워드 나열, 잘못된 Safe 가격.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const BANNED_COMMENT = [
  /9\/2 수급 체크/,
  /Cybercab D-1 같이 봐야죠/,
];
const BANNED_NICKNAMES = new Set(["댓글러", "팔로워"]);
const KEYWORD_DUMP_RE = /^[^.]{0,80}·[^.]{0,80}·[^.]{0,60}$/;

function load(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function parsePosts(section, label) {
  const posts = [];
  const re =
    /\{\s*id:\s*(\d+)[\s\S]*?content:\s*"((?:\\.|[^"\\])*)"[\s\S]*?createdAt:\s*(T\d+)\s*-\s*(\d+)/g;
  let m;
  while ((m = re.exec(section)) !== null) {
    posts.push({
      id: Number(m[1]),
      content: m[2].replace(/\\"/g, '"'),
      tVar: m[3],
      offset: Number(m[4]),
      label,
    });
  }
  return posts;
}

function parseComments(section, label) {
  const byPost = new Map();
  const blockRe = /(\d+):\s*\[([\s\S]*?)\n\s*\],/g;
  let m;
  while ((m = blockRe.exec(section)) !== null) {
    const postId = Number(m[1]);
    const inner = m[2];
    const comments = [];
    const cmRe =
      /nickname:\s*"([^"]+)"[\s\S]*?content:\s*"((?:\\.|[^"\\])*)"/g;
    let cm;
    while ((cm = cmRe.exec(inner)) !== null) {
      comments.push({
        nickname: cm[1],
        content: cm[2].replace(/\\"/g, '"'),
      });
    }
    if (!byPost.has(postId)) byPost.set(postId, []);
    byPost.get(postId).push(...comments);
  }
  return { byPost, label };
}

function extractBlock(src, exportName) {
  const start = src.indexOf(`export const ${exportName}`);
  if (start === -1) throw new Error(`${exportName} not found`);
  const open = src.indexOf("[", start);
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]") {
      depth--;
      if (depth === 0) return src.slice(open + 1, i);
    }
  }
  throw new Error(`${exportName} block end not found`);
}

function extractCommentsBlock(src, exportName) {
  const start = src.indexOf(`export const ${exportName}`);
  if (start === -1) throw new Error(`${exportName} not found`);
  const open = src.indexOf("{", start);
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) return src.slice(open + 1, i);
    }
  }
  throw new Error(`${exportName} block end not found`);
}

function latestBatch(posts) {
  if (!posts.length) return [];
  const tCounts = new Map();
  for (const p of posts) {
    tCounts.set(p.tVar, (tCounts.get(p.tVar) || 0) + 1);
  }
  let bestT = posts[0].tVar;
  let bestOff = -1;
  for (const p of posts) {
    if (p.tVar === bestT && p.offset > bestOff) bestOff = p.offset;
  }
  for (const p of posts) {
    if (p.tVar !== bestT && p.offset === 0) {
      const cnt = tCounts.get(p.tVar) || 0;
      if (cnt >= 4) {
        bestT = p.tVar;
        bestOff = 0;
      }
    }
  }
  const latestT =
    [...tCounts.entries()].sort((a, b) => {
      const aMax = Math.max(
        ...posts.filter((p) => p.tVar === a[0]).map((p) => -p.offset),
      );
      const bMax = Math.max(
        ...posts.filter((p) => p.tVar === b[0]).map((p) => -p.offset),
      );
      return aMax - bMax;
    })[0]?.[0] || "T02";
  return posts.filter((p) => p.tVar === latestT);
}

function normalizeContent(s) {
  return s.replace(/\s+/g, " ").trim().toLowerCase();
}

function validateWallMarket(src, postsExport, commentsExport, label) {
  const errors = [];
  const posts = parsePosts(extractBlock(src, postsExport), label);
  const { byPost } = parseComments(
    extractCommentsBlock(src, commentsExport),
    label,
  );

  const batch = latestBatch(posts);
  const contents = new Map();
  for (const p of batch) {
    const n = normalizeContent(p.content);
    if (contents.has(n)) {
      errors.push(
        `${label} id ${p.id}: 당일 게시글 본문 중복 (id ${contents.get(n)})`,
      );
    } else contents.set(n, p.id);

    if (p.content.includes("종토_")) {
      errors.push(`${label} id ${p.id}: 자동 생성 닉네임(종토_) 잔존`);
    }
    if (
      KEYWORD_DUMP_RE.test(p.content) &&
      p.content.length < 90 &&
      !p.content.includes("습니다")
    ) {
      errors.push(
        `${label} id ${p.id}: 키워드 나열형 본문 — 문장형으로 작성 필요`,
      );
    }
    if (label === "SAFE" && /~79500|~2520/.test(p.content)) {
      errors.push(`${label} id ${p.id}: 잘못된 Safe 가격(~79500/~2520) 잔존`);
    }
  }

  const commentTexts = new Map();
  for (const [postId, comments] of byPost) {
    const post = posts.find((p) => p.id === postId);
    if (!post || post.tVar !== batch[0]?.tVar) continue;
    for (const c of comments) {
      if (BANNED_NICKNAMES.has(c.nickname)) {
        errors.push(
          `${label} id ${postId}: 보일러플레이트 닉네임 "${c.nickname}"`,
        );
      }
      for (const re of BANNED_COMMENT) {
        if (re.test(c.content)) {
          errors.push(
            `${label} id ${postId}: 보일러플레이트 댓글 — "${c.content.slice(0, 30)}"`,
          );
        }
      }
      const key = normalizeContent(c.content);
      commentTexts.set(key, (commentTexts.get(key) || 0) + 1);
    }
  }
  for (const [text, count] of commentTexts) {
    if (count >= 3) {
      errors.push(
        `${label}: 동일 댓글 "${text.slice(0, 40)}…" 가 ${count}건 — 고유화 필요`,
      );
    }
  }

  const seenIds = new Set();
  const dupIds = new Set();
  const commentsSrc = extractCommentsBlock(src, commentsExport);
  const idRe = /^\s*(\d+):/gm;
  let im;
  while ((im = idRe.exec(commentsSrc)) !== null) {
    const id = Number(im[1]);
    if (seenIds.has(id)) dupIds.add(id);
    seenIds.add(id);
  }
  for (const id of dupIds) {
    errors.push(`${label}: 댓글 블록 id ${id} 중복 정의`);
  }

  return errors;
}

function main() {
  const wall = load("lib/wallPosts-markets.ts");
  const errors = [
    ...validateWallMarket(
      wall,
      "MOCK_POSTS_KR",
      "MOCK_COMMENTS_KR",
      "KR",
    ),
    ...validateWallMarket(
      wall,
      "MOCK_POSTS_SAFE",
      "MOCK_COMMENTS_SAFE",
      "SAFE",
    ),
    ...validateWallMarket(
      wall,
      "MOCK_POSTS_KR_RE",
      "MOCK_COMMENTS_KR_RE",
      "KR-RE",
    ),
  ];

  if (errors.length) {
    console.error("validate-wall-social: FAIL\n" + errors.map((e) => `  - ${e}`).join("\n"));
    process.exit(1);
  }
  console.log("validate-wall-social: OK (KR · SAFE · KR-RE)");
}

main();
