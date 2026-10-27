#!/usr/bin/env node
// Apply 2026-10-27 final — seed-2114~2120 + wall/analyst posts
const fs = require("fs");
const path = require("path");
const { NEW_SEEDS, NEW_TICKERS, NEW_ANALYST_POSTS, NEW_ANALYST_COMMENTS, NEW_WALL_POSTS, NEW_WALL_COMMENTS, T27OCT } = require("./data-20261027-us-final.js");

const ROOT = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

// ── 1. lib/reports.ts ────────────────────────────────────────────
function applyReports() {
  let c = read("lib/reports.ts");

  const SEEDS_IN_ORDER = [
    NEW_SEEDS.find(s => s.id === "seed-2120"),
    NEW_SEEDS.find(s => s.id === "seed-2119"),
    NEW_SEEDS.find(s => s.id === "seed-2118"),
    NEW_SEEDS.find(s => s.id === "seed-2117"),
    NEW_SEEDS.find(s => s.id === "seed-2116"),
    NEW_SEEDS.find(s => s.id === "seed-2115"),
    NEW_SEEDS.find(s => s.id === "seed-2114"),
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

  // Insert before "// ── 2026-10-26 (월) 장중 수집"
  const MARKER = `  // ── 2026-10-26 (월) 장중 수집`;
  const markerIdx = c.indexOf(MARKER);
  if (markerIdx === -1) throw new Error("Marker '2026-10-26 장중 수집' not found in reports.ts");

  const insertBlock = `  // ── 2026-10-27 (화) 장중 수집 ──────────────────────────────────────\n` +
    SEEDS_IN_ORDER.map(seedEntry).join("");

  c = c.slice(0, markerIdx) + insertBlock + c.slice(markerIdx);
  console.log("reports.ts: inserted seed-2114 through seed-2120");

  // ── REPORT_TICKERS ────────────────────────────────────────────
  // Insert after "seed-2100" ticker entry
  const TICKER_MARKER = `  "seed-2100": ["TSLA","SPCX","META"],`;
  const tickerIdx = c.indexOf(TICKER_MARKER);
  if (tickerIdx === -1) throw new Error("REPORT_TICKERS seed-2100 marker not found");
  const endOf2100Line = c.indexOf("\n", tickerIdx) + 1;

  const newTickerLines = Object.entries(NEW_TICKERS)
    .map(([id, tickers]) => `  "${id}": ${JSON.stringify(tickers)},\n`)
    .join("");

  c = c.slice(0, endOf2100Line) + newTickerLines + c.slice(endOf2100Line);
  console.log("REPORT_TICKERS: inserted seed-2114 through seed-2120");

  write("lib/reports.ts", c);
}

// ── 2. lib/analystPosts.ts ───────────────────────────────────────
function applyAnalystPosts() {
  let c = read("lib/analystPosts.ts");

  function postEntry(p) {
    const lines = [
      `    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${p.symbol !== null ? JSON.stringify(p.symbol) : 'null'},`,
      `    content: ${JSON.stringify(p.content)},`,
      ...(p.contentEn ? [`    contentEn: ${JSON.stringify(p.contentEn)},`] : []),
      `    likes: ${p.likes}, comments: ${p.comments}, created_at: "${p.created_at}", liked: false,`,
    ];
    return `  {\n${lines.join("\n")}\n  },\n`;
  }

  // Insert before "// ── 2026-10-26 (월) 추가"
  const MARKER = `  // ── 2026-10-26 (월) 추가`;
  const idx = c.indexOf(MARKER);
  if (idx === -1) throw new Error("analystPosts: Oct 26 marker not found");

  const insertText = `  // ── 2026-10-27 (화) 추가 ──────────────────────\n` + NEW_ANALYST_POSTS.map(postEntry).join("");
  c = c.slice(0, idx) + insertText + c.slice(idx);
  console.log("analystPosts: inserted posts -1678 through -1684");

  // ── Comments: insert after [-1677] block ─────────────────────
  // Build comment entries (AnalystMockComment: alias, content, created_at ONLY)
  let commentBlock = `  // ── 2026-10-27 애널 댓글 ──────────────────────\n`;
  for (const [postId, comments] of Object.entries(NEW_ANALYST_COMMENTS)) {
    commentBlock += `  [${postId}]: [\n`;
    for (const cm of comments) {
      commentBlock += `    { alias: ${JSON.stringify(cm.alias)}, content: ${JSON.stringify(cm.content)}, created_at: "${cm.created_at}" },\n`;
    }
    commentBlock += `  ],\n`;
  }

  // Find end of [-1677] block
  const CM_MARKER = `  [-1677]: [`;
  const cmIdx = c.indexOf(CM_MARKER);
  if (cmIdx === -1) throw new Error("analystPosts: [-1677] comment block not found");
  const cmEnd = c.indexOf("\n  ],\n", cmIdx) + "\n  ],\n".length;
  c = c.slice(0, cmEnd) + commentBlock + c.slice(cmEnd);
  console.log("analystPosts: inserted comments for -1678 through -1684");

  write("lib/analystPosts.ts", c);
}

// ── 3. lib/wallPosts.ts ──────────────────────────────────────────
function applyWallPosts() {
  let c = read("lib/wallPosts.ts");

  // Add T27OCT constant after T26OCT line
  const T26LINE = `const T26OCT = 1792969200000; // 2026-10-26 08:00 KST (월)`;
  if (!c.includes(T26LINE)) throw new Error("wallPosts: T26OCT line not found");
  const T27LINE = `const T27OCT = 1793055600000; // 2026-10-27 08:00 KST (화)`;
  if (!c.includes(T27LINE)) {
    c = c.replace(T26LINE, T26LINE + "\n" + T27LINE);
    console.log("wallPosts: added T27OCT constant");
  } else {
    console.log("wallPosts: T27OCT already exists, skipping");
  }

  // Update LATEST_UPDATE to T27OCT
  c = c.replace(
    `export const LATEST_UPDATE = T26OCT;`,
    `export const LATEST_UPDATE = T27OCT;`
  );
  console.log("wallPosts: updated LATEST_UPDATE to T27OCT");

  // Build wall post entries
  function wallEntry(p) {
    const offsetMin = Math.round((p.createdAt - T27OCT) / 60000);
    return `  { id: ${p.id}, symbol: "${p.symbol}", nickname: "${p.nickname}", holdingLabel: "${p.holdingLabel}",\n    content: ${JSON.stringify(p.content)},\n    contentEn: ${JSON.stringify(p.contentEn)},\n    createdAt: T27OCT + ${offsetMin}*60_000, likes: ${p.likes}, comments: ${p.comments} },\n`;
  }

  // Insert before "// ── 2026-10-26 (월) 추가"
  const MARKER = `  // ── 2026-10-26 (월) 추가`;
  const idx = c.indexOf(MARKER);
  if (idx === -1) throw new Error("wallPosts: Oct 26 marker not found");

  const insertText = `  // ── 2026-10-27 (화) 추가 ────────────────\n` + NEW_WALL_POSTS.map(wallEntry).join("");
  c = c.slice(0, idx) + insertText + c.slice(idx);
  console.log("wallPosts: inserted posts 122424 through 122430");

  // Build comment entries
  let commentBlock = "";
  for (const [postId, comments] of Object.entries(NEW_WALL_COMMENTS)) {
    commentBlock += `  ${postId}: [\n`;
    for (const cm of comments) {
      const offsetMs = cm.createdAt - T27OCT;
      commentBlock += `    { id: ${cm.id}, nickname: "${cm.nickname}", holdingLabel: "${cm.holdingLabel}", content: ${JSON.stringify(cm.content)}, likes: ${cm.likes}, createdAt: T27OCT + ${offsetMs} },\n`;
    }
    commentBlock += `  ],\n`;
  }

  // Insert after 122423 comment block
  const CM_MARKER = `  122423: [`;
  const cmIdx = c.indexOf(CM_MARKER);
  if (cmIdx === -1) throw new Error("wallPosts: 122423 comment block not found");
  const cmEnd = c.indexOf("\n  ],\n", cmIdx) + "\n  ],\n".length;
  c = c.slice(0, cmEnd) + commentBlock + c.slice(cmEnd);
  console.log("wallPosts: inserted comments for 122424 through 122430");

  write("lib/wallPosts.ts", c);
}

applyReports();
applyAnalystPosts();
applyWallPosts();
console.log("✓ apply-20261027-final done");
