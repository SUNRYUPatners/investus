#!/usr/bin/env node
// Apply 2026-10-26 final — seed-2100, 2111, 2112, 2113 + wall/analyst posts
const fs = require("fs");
const path = require("path");
const { NEW_SEEDS, NEW_TICKERS, NEW_ANALYST_POSTS, NEW_ANALYST_COMMENTS, NEW_WALL_POSTS, NEW_WALL_COMMENTS } = require("./data-20261026-us-final.js");

const ROOT = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

// ── 1. lib/reports.ts ────────────────────────────────────────────
function applyReports() {
  let c = read("lib/reports.ts");

  // Build seed entries text
  // Insert before "// ── 2026-10-24 (토) 주말 자체 수집" marker
  // Order: seed-2100(pinned), seed-2113, seed-2112, seed-2111 — newest first within Oct 26
  const SEEDS_IN_ORDER = [
    NEW_SEEDS.find(s => s.id === "seed-2100"),
    NEW_SEEDS.find(s => s.id === "seed-2113"),
    NEW_SEEDS.find(s => s.id === "seed-2112"),
    NEW_SEEDS.find(s => s.id === "seed-2111"),
  ];

  function seedEntry(s) {
    const fields = [
      `    id: "${s.id}",`,
      `    title: ${JSON.stringify(s.title)},`,
      `    summary: ${JSON.stringify(s.summary)},`,
      `    body: ${JSON.stringify(s.body)},`,
      `    titleEn: ${JSON.stringify(s.titleEn)},`,
      `    summaryEn: ${JSON.stringify(s.summaryEn)},`,
      `    bodyEn: ${JSON.stringify(s.bodyEn)},`,
      `    category: "${s.category}",`,
      `    categoryColor: "${s.categoryColor}",`,
      ...(s.isPinned ? [`    isPinned: true,`] : []),
      `    subject: ${JSON.stringify(s.subject)},`,
      `    date: "${s.date}",`,
      `    updatedAt: "${s.updatedAt}",`,
      `    images: ${JSON.stringify(s.images)},`,
      `    imagesEn: ${JSON.stringify(s.imagesEn)},`,
    ];
    return `  {\n${fields.join("\n")}\n  },\n`;
  }

  const MARKER = `  // ── 2026-10-24 (토) 주말 자체 수집`;
  const markerIdx = c.indexOf(MARKER);
  if (markerIdx === -1) throw new Error("Marker '2026-10-24 주말 자체 수집' not found in reports.ts");

  // Insert Oct 26 header + new seeds before the Oct 24 marker
  const insertBlock = `  // ── 2026-10-26 (월) 장중 수집 ──────────────────────────────────────\n` +
    SEEDS_IN_ORDER.map(seedEntry).join("");

  c = c.slice(0, markerIdx) + insertBlock + c.slice(markerIdx);
  console.log("reports.ts: inserted seed-2100, 2111, 2112, 2113");

  // ── REPORT_TICKERS ────────────────────────────────────────────
  // Insert after last existing "// 2026-10-26" ticker entry (after seed-2110)
  const TICKER_MARKER = `  // 2026-10-26\n`;
  const tickerMarkerIdx = c.indexOf(TICKER_MARKER);
  if (tickerMarkerIdx === -1) throw new Error("REPORT_TICKERS // 2026-10-26 marker not found");

  // Find end of existing Oct 26 tickers block (seed-2110 line)
  const after2110 = c.indexOf('"seed-2110"', tickerMarkerIdx);
  if (after2110 === -1) throw new Error("seed-2110 ticker not found");
  const endOf2110Line = c.indexOf("\n", after2110) + 1;

  const newTickerLines = Object.entries(NEW_TICKERS)
    .map(([id, tickers]) => `  "${id}": ${JSON.stringify(tickers)},\n`)
    .join("");

  c = c.slice(0, endOf2110Line) + newTickerLines + c.slice(endOf2110Line);
  console.log("REPORT_TICKERS: inserted seed-2100, 2111, 2112, 2113");

  write("lib/reports.ts", c);
}

// ── 2. lib/analystPosts.ts ───────────────────────────────────────
function applyAnalystPosts() {
  let c = read("lib/analystPosts.ts");

  // Build post entries
  function postEntry(p) {
    const lines = [
      `    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},`,
      `    content: ${JSON.stringify(p.content)},`,
      ...(p.contentEn ? [`    contentEn: ${JSON.stringify(p.contentEn)},`] : []),
      `    likes: ${p.likes}, comments: ${p.comments}, created_at: "${p.created_at}", liked: false,`,
    ];
    return `  {\n${lines.join("\n")}\n  },\n`;
  }

  // Insert after the "// ── 2026-10-26 (월) 추가" block, before "// ── 2026-10-24 (토)"
  const MARKER = `  // ── 2026-10-24 (토) 주말 자체수집 ──`;
  const idx = c.indexOf(MARKER);
  if (idx === -1) throw new Error("analystPosts: Oct 24 marker not found");

  const insertText = NEW_ANALYST_POSTS.map(postEntry).join("");
  c = c.slice(0, idx) + insertText + c.slice(idx);
  console.log("analystPosts: inserted posts -1675, -1676, -1677");

  // Build comment entries
  let commentBlock = "";
  for (const [postId, comments] of Object.entries(NEW_ANALYST_COMMENTS)) {
    commentBlock += `  [${postId}]: [\n`;
    for (const cm of comments) {
      commentBlock += `    { id: ${cm.id}, postId: ${cm.postId}, alias: ${JSON.stringify(cm.alias)}, content: ${JSON.stringify(cm.content)}, likes: ${cm.likes}, created_at: "${cm.created_at}", liked: false },\n`;
    }
    commentBlock += `  ],\n`;
  }

  // Insert comments after existing [-1674] comments block
  const CM_MARKER = `  [-1674]: [`;
  const cmIdx = c.indexOf(CM_MARKER);
  if (cmIdx === -1) throw new Error("analystPosts: [-1674] comment block not found");
  const cmEnd = c.indexOf("\n  ],\n", cmIdx) + "\n  ],\n".length;
  c = c.slice(0, cmEnd) + commentBlock + c.slice(cmEnd);
  console.log("analystPosts: inserted comments for -1675, -1676, -1677");

  write("lib/analystPosts.ts", c);
}

// ── 3. lib/wallPosts.ts ──────────────────────────────────────────
function applyWallPosts() {
  let c = read("lib/wallPosts.ts");

  // Build wall post entries
  function wallEntry(p) {
    return `  { id: ${p.id}, symbol: "${p.symbol}", nickname: "${p.nickname}", holdingLabel: "${p.holdingLabel}",\n    content: ${JSON.stringify(p.content)},\n    contentEn: ${JSON.stringify(p.contentEn)},\n    createdAt: T26OCT + ${(p.createdAt - 1792969200000) / 60000}*60_000, likes: ${p.likes}, comments: ${p.comments} },\n`;
  }

  // Insert after existing 122419 wall post, before "  // ── 2026-10-24 (토) 주말 자체수집"
  const MARKER = `  // ── 2026-10-24 (토) 주말 자체수집`;
  const idx = c.indexOf(MARKER);
  if (idx === -1) throw new Error("wallPosts: Oct 24 marker not found");

  const insertText = NEW_WALL_POSTS.map(wallEntry).join("");
  c = c.slice(0, idx) + insertText + c.slice(idx);
  console.log("wallPosts: inserted posts 122420-122423");

  // Build comment entries
  let commentBlock = "";
  for (const [postId, comments] of Object.entries(NEW_WALL_COMMENTS)) {
    commentBlock += `  ${postId}: [\n`;
    for (const cm of comments) {
      commentBlock += `    { id: ${cm.id}, postId: ${cm.postId}, nickname: ${JSON.stringify(cm.nickname)}, content: ${JSON.stringify(cm.content)}, likes: ${cm.likes}, createdAt: T26OCT + ${(cm.createdAt - 1792969200000) / 60000}*60_000 },\n`;
    }
    commentBlock += `  ],\n`;
  }

  // Insert comments after existing 122419 comments block
  const CM_MARKER = `  122419: [`;
  const cmIdx = c.indexOf(CM_MARKER);
  if (cmIdx === -1) throw new Error("wallPosts: 122419 comment block not found");
  const cmEnd = c.indexOf("\n  ],\n", cmIdx) + "\n  ],\n".length;
  c = c.slice(0, cmEnd) + commentBlock + c.slice(cmEnd);
  console.log("wallPosts: inserted comments for 122420-122423");

  write("lib/wallPosts.ts", c);
}

applyReports();
applyAnalystPosts();
applyWallPosts();
console.log("✓ apply-20261026-final done");
