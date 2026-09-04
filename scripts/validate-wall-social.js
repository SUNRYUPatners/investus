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

function validateUsWallCrossMarket() {
  const src = load("lib/wallPosts.ts");
  const errors = [];
  const pStart = src.indexOf("  // ── 2026-09-04 신규 ────────────────");
  const pEnd = src.indexOf("  // ── 2026-09-03 신규 ────────────────");
  const cStart = src.indexOf("  // ── 2026-09-04 신규 댓글 ────────────────");
  const cEnd = src.indexOf("  // ── 2026-09-03 신규 댓글 ────────────────");
  if (pStart === -1 || pEnd === -1 || cStart === -1 || cEnd === -1) {
    return errors; // older tree without 9/4 — skip
  }
  const posts = src.slice(pStart, pEnd);
  const comments = src.slice(cStart, cEnd);
  const blob = posts + "\n" + comments;

  const CROSS = [
    /종부세/,
    /케이비/,
    /KB금융/,
    /엘지엔솔/,
    /LG엔솔/,
    /코스피/,
    /하이닉스/,
    /삼성전자/,
    /기타법인/,
  ];
  const TEMPLATES = [
    /숫자만 남기면/,
    /이 부분이에요\. 레버리지는 내일/,
    /나는 허가랑 공시부터 볼 거예요/,
    /오늘 포인트는 .+는 점이에요/,
  ];
  for (const re of CROSS) {
    if (re.test(blob)) {
      errors.push(
        `US wall 9/4: 다른 시장 키워드 혼입 (${re}) — 미국 종토방에 KR/부동산 문구 금지`,
      );
    }
  }
  for (const re of TEMPLATES) {
    if (re.test(blob)) {
      errors.push(`US wall 9/4: 템플릿 문구 잔존 (${re})`);
    }
  }

  // comment text reuse within 9/4 batch
  const cmRe = /content:\s*"((?:\\.|[^"\\])*)"/g;
  const counts = new Map();
  let m;
  while ((m = cmRe.exec(comments)) !== null) {
    const key = normalizeContent(m[1]);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  for (const [text, count] of counts) {
    if (count >= 2) {
      errors.push(
        `US wall 9/4: 동일 댓글 ${count}회 — "${text.slice(0, 36)}…"`,
      );
    }
  }
  return errors;
}

/** 당일(T04 / 2026-09-04) 배치만 — 템플릿·교차시장·동일 오프닝 */
function validateMarketsDayBatch() {
  const errors = [];
  const wall = load("lib/wallPosts-markets.ts");
  const analyst = load("lib/analystPosts-markets.ts");

  const TEMPLATE_RES = [
    /확인했습니다\.\s*숫자부터 표에 남기겠습니다/,
    /다음 확인 지표는 .+ 쪽에서 따로 보겠습니다/,
    /숫자만 남기면/,
    /레버리지는 내일 볼게요/,
    /나는 허가랑 공시부터/,
  ];
  for (const re of TEMPLATE_RES) {
    if (re.test(wall) || re.test(analyst)) {
      errors.push(`markets: 템플릿 문구 잔존 (${re})`);
    }
  }

  // Analyst KR/Safe/KR-RE 9/4 blocks: no shared comment pool pattern
  const dayAnalyst = [];
  const aRe =
    /\{\s*id:\s*(-205[1-6]|-205[7-9]|-206[0-6]),[\s\S]*?content:\s*"((?:\\.|[^"\\])*)"/g;
  let am;
  while ((am = aRe.exec(analyst)) !== null) {
    dayAnalyst.push({ id: Number(am[1]), content: am[2].replace(/\\"/g, '"') });
  }

  // Opening sameness: "종목명 숫자원(+x%)" or same prefix
  const priceOpen = dayAnalyst.filter((p) =>
    /^[가-힣A-Za-z]+[\s\S]{0,12}\d[\d,]*\s*원\s*\([+-]/.test(p.content),
  );
  if (priceOpen.length >= 3) {
    errors.push(
      `analyst markets 9/4: ${priceOpen.length}개가 「종목+가격(+%)」로 시작 — 오프닝 다양화 필요`,
    );
  }

  // Same ending boilerplate
  const endCounts = new Map();
  for (const p of dayAnalyst) {
    const tail = p.content.slice(-24);
    endCounts.set(tail, (endCounts.get(tail) || 0) + 1);
  }
  for (const [tail, n] of endCounts) {
    if (n >= 3) {
      errors.push(`analyst markets 9/4: 동일 종결 ${n}회 — "…${tail}"`);
    }
  }

  // Cross-market: Safe day posts must not talk 종부세/코스피수급 as primary; KR-RE not BTC
  const safeSlice = analyst.includes("id: -2057")
    ? analyst.slice(analyst.indexOf("id: -2057"), analyst.indexOf("id: -2041") > -1 ? analyst.indexOf("id: -2041") : analyst.length)
    : "";
  if (/종부세|케이비금융|기타법인 12/.test(safeSlice)) {
    errors.push("SAFE analyst 9/4: KR/부동산 키워드 혼입");
  }
  const reSlice = analyst.includes("id: -2063")
    ? analyst.slice(analyst.indexOf("id: -2063"), analyst.indexOf("id: -2047") > -1 ? analyst.indexOf("id: -2047") : analyst.length)
    : "";
  if (/비트코인|허깅페이스|사이버캡 요금/.test(reSlice)) {
    errors.push("KR-RE analyst 9/4: US/크립토 키워드 혼입");
  }

  // Wall comment uniqueness within each market's T04 ids
  function checkWallCommentUniq(ids, label) {
    const texts = [];
    for (const id of ids) {
      const start = wall.indexOf(`  ${id}: [`);
      if (start === -1) continue;
      const end = wall.indexOf("  ],", start);
      const block = wall.slice(start, end);
      const cmRe = /content:\s*"((?:\\.|[^"\\])*)"/g;
      let m;
      while ((m = cmRe.exec(block)) !== null) texts.push(normalizeContent(m[1]));
    }
    const counts = new Map();
    for (const t of texts) counts.set(t, (counts.get(t) || 0) + 1);
    for (const [t, n] of counts) {
      if (n >= 2) errors.push(`${label} wall: 동일 댓글 ${n}회 — "${t.slice(0, 36)}…"`);
    }
  }
  checkWallCommentUniq([9060, 9061, 9062, 9063, 9064, 9065], "KR");
  checkWallCommentUniq([9152, 9153, 9154, 9155, 9156, 9157], "SAFE");
  checkWallCommentUniq([9257, 9258, 9259, 9260], "KR-RE");

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
    ...validateUsWallCrossMarket(),
    ...validateMarketsDayBatch(),
  ];

  if (errors.length) {
    console.error("validate-wall-social: FAIL\n" + errors.map((e) => `  - ${e}`).join("\n"));
    process.exit(1);
  }
  console.log("validate-wall-social: OK (US · KR · SAFE · KR-RE · templates · cross-market)");
}

main();
