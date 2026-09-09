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
    /\{\s*id:\s*(\d+)[\s\S]*?content:\s*"((?:\\.|[^"\\])*)"[\s\S]*?createdAt:\s*(T\d+)\s*-\s*(\d+)[\s\S]*?comments:\s*(\d+)/g;
  let m;
  while ((m = re.exec(section)) !== null) {
    posts.push({
      id: Number(m[1]),
      content: m[2].replace(/\\"/g, '"'),
      tVar: m[3],
      offset: Number(m[4]),
      comments: Number(m[5]),
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

  // posts.comments ↔ MOCK_COMMENTS: 클릭 시 빈 화면만 차단 (숫자 불일치는 표시만 어긋남)
  for (const p of posts) {
    if (p.comments <= 0) continue;
    const actual = (byPost.get(p.id) || []).length;
    if (actual === 0) {
      errors.push(
        `${label} id ${p.id}: comments=${p.comments}인데 MOCK 댓글 0개 — 클릭 시 빈 화면`,
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

/** 최신 배치(9/7) — 템플릿 오프닝·댓글·교차시장 */
function validateMarketsDayBatch() {
  const errors = [];
  const wall = load("lib/wallPosts-markets.ts");
  const analyst = load("lib/analystPosts-markets.ts");

  const dayAnalyst = [];
  const aRe =
    /\{\s*id:\s*(-21(?:0[0-6]|2[0-5]|4[0-4])),[\s\S]*?content:\s*"((?:\\.|[^"\\])*)"/g;
  let am;
  while ((am = aRe.exec(analyst)) !== null) {
    dayAnalyst.push({ id: Number(am[1]), content: am[2].replace(/\\"/g, '"') });
  }

  const missOpen = dayAnalyst.filter((p) =>
    /만 보면 놓칩니다|왜\s+.+\s*인가요\?|\s축:/.test(p.content),
  );
  if (missOpen.length >= 2) {
    errors.push(
      `analyst markets 9/7: ${missOpen.length}개가 템플릿 오프닝(만 보면/왜~인가요/축:) — 다양화 필요`,
    );
  }

  const priceOpen = dayAnalyst.filter((p) =>
    /^[가-힣A-Za-z]+[\s\S]{0,12}\d[\d,]*\s*원\s*\([+-]/.test(p.content),
  );
  if (priceOpen.length >= 3) {
    errors.push(
      `analyst markets 9/7: ${priceOpen.length}개가 「종목+가격(+%)」로 시작 — 오프닝 다양화 필요`,
    );
  }

  const commentBlob = [];
  for (const id of [
    -2100, -2101, -2102, -2103, -2104, -2105, -2106,
    -2120, -2121, -2122, -2123, -2124, -2125,
    -2140, -2141, -2142, -2143, -2144,
  ]) {
    const start = analyst.indexOf(`[${id}]:`);
    if (start === -1) continue;
    const end = analyst.indexOf("],", start);
    const block = analyst.slice(start, end + 2);
    const cmRe = /content:\s*"((?:\\.|[^"\\])*)"/g;
    let m;
    while ((m = cmRe.exec(block)) !== null) {
      commentBlob.push(m[1].replace(/\\"/g, '"'));
    }
  }
  const stemBanned = [
    /지난 종가와 이번 주 일정을 분리/,
    /자사주·외국인·물가를 칸으로/,
    /가격·상관·금리 확률을 한 줄에/,
    /CPI·FOMC 전 레버리지는 보수적/,
    /전세·매매·정책을 축으로 나눠/,
    /매물 수와 호가를 같이 보겠습니다/,
  ];
  for (const re of stemBanned) {
    const n = commentBlob.filter((c) => re.test(c)).length;
    if (n >= 2) {
      errors.push(`analyst markets 9/7: 템플릿 댓글 ${n}회 (${re})`);
    }
  }

  const safe07 = analyst.includes("id: -2120")
    ? analyst.slice(
        analyst.indexOf("id: -2120"),
        analyst.indexOf("id: -2057") > -1
          ? analyst.indexOf("id: -2057")
          : analyst.indexOf("MOCK_ANALYST_COMMENTS_SAFE"),
      )
    : "";
  if (/종부세|케이비금융|기타법인 12/.test(safe07)) {
    errors.push("SAFE analyst 9/7: KR/부동산 키워드 혼입");
  }
  const re07 = analyst.includes("id: -2140")
    ? analyst.slice(
        analyst.indexOf("id: -2140"),
        analyst.indexOf("id: -2063") > -1
          ? analyst.indexOf("id: -2063")
          : analyst.indexOf("MOCK_ANALYST_COMMENTS_KR_RE"),
      )
    : "";
  if (/비트코인|허깅페이스|사이버캡 요금/.test(re07)) {
    errors.push("KR-RE analyst 9/7: US/크립토 키워드 혼입");
  }

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
  checkWallCommentUniq([9070, 9071, 9072, 9073, 9074, 9075, 9076], "KR");
  checkWallCommentUniq([9160, 9161, 9162, 9163, 9164, 9165], "SAFE");
  checkWallCommentUniq([9270, 9271, 9272, 9273, 9274], "KR-RE");

  return errors;
}

function validateUsWallIdOffsetAndComments() {
  const src = load("lib/wallPosts.ts");
  const errors = [];
  const OFFSET = 10_000_000; // lib/wallPosts REAL_WALL_POST_OFFSET

  const postRe =
    /\{\s*id:\s*(\d+),[\s\S]*?comments:\s*(\d+)\s*\}/g;
  const posts = [];
  let m;
  while ((m = postRe.exec(src)) !== null) {
    // Only MOCK_POSTS section (before MOCK_COMMENTS)
    if (m.index > src.indexOf("export const MOCK_COMMENTS")) break;
    posts.push({ id: Number(m[1]), comments: Number(m[2]) });
  }

  const { byPost } = parseComments(
    extractCommentsBlock(src, "MOCK_COMMENTS"),
    "US",
  );

  for (const p of posts) {
    if (p.id >= OFFSET) {
      errors.push(
        `US id ${p.id}: 목 글 id가 REAL_WALL_POST_OFFSET(${OFFSET}) 이상 — 실유저 글과 충돌`,
      );
    }
    if (p.id >= 100000) {
      // Soft historical note — still allowed under 10M, but warn via fail if broken path returns
      // Keep as error only if we'd still collide with OLD offset detection (already fixed in UI).
      // No error — 12xxxx is intentional until renumber.
    }
    if (p.comments > 0) {
      const actual = (byPost.get(p.id) || []).length;
      if (actual === 0) {
        errors.push(
          `US id ${p.id}: comments=${p.comments}인데 MOCK 댓글 0개 — 클릭 시 빈 화면`,
        );
      }
    }
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
    ...validateUsWallCrossMarket(),
    ...validateMarketsDayBatch(),
    ...validateUsWallIdOffsetAndComments(),
  ];

  if (errors.length) {
    console.error("validate-wall-social: FAIL\n" + errors.map((e) => `  - ${e}`).join("\n"));
    process.exit(1);
  }
  console.log("validate-wall-social: OK (US · KR · SAFE · KR-RE · templates · cross-market)");
}

main();
