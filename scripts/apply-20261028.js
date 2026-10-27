#!/usr/bin/env node
// Apply 2026-10-28 — seed-2121~2127 + wall/analyst posts
const fs = require("fs");
const path = require("path");
const { NEW_SEEDS, NEW_TICKERS, NEW_ANALYST_POSTS, NEW_ANALYST_COMMENTS, NEW_WALL_POSTS, NEW_WALL_COMMENTS, T28OCT } = require("./data-20261028.js");

const ROOT = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

// ── 1. lib/reports.ts ───────────────────────────────────────────
function applyReports() {
  let c = read("lib/reports.ts");

  const ORDER = ["seed-2127","seed-2126","seed-2125","seed-2124","seed-2123","seed-2122","seed-2121"];
  const SEEDS_IN_ORDER = ORDER.map(id => NEW_SEEDS.find(s => s.id === id));

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

  const MARKER = `  // ── 2026-10-27 (화) 장중 수집`;
  const markerIdx = c.indexOf(MARKER);
  if (markerIdx === -1) throw new Error("Marker '2026-10-27 장중 수집' not found in reports.ts");

  const insertBlock = `  // ── 2026-10-28 (수) 장중 수집 ──────────────────────────────────────\n` +
    SEEDS_IN_ORDER.map(seedEntry).join("");
  c = c.slice(0, markerIdx) + insertBlock + c.slice(markerIdx);
  console.log("reports.ts: inserted seed-2121 through seed-2127");

  // ── REPORT_TICKERS ──────────────────────────────────────────────
  const TICKER_MARKER = `  "seed-2120": ["TSLA","SPCX","NVDA","MSFT"],`;
  const tickerIdx = c.indexOf(TICKER_MARKER);
  if (tickerIdx === -1) throw new Error("REPORT_TICKERS seed-2120 marker not found");
  const endOfLine = c.indexOf("\n", tickerIdx) + 1;

  const newTickerLines = Object.entries(NEW_TICKERS)
    .map(([id, tickers]) => `  "${id}": ${JSON.stringify(tickers)},\n`)
    .join("");
  c = c.slice(0, endOfLine) + newTickerLines + c.slice(endOfLine);
  console.log("REPORT_TICKERS: inserted seed-2121 through seed-2127");

  write("lib/reports.ts", c);
}

// ── 2. lib/analystPosts.ts ──────────────────────────────────────
function applyAnalystPosts() {
  let c = read("lib/analystPosts.ts");

  function postEntry(p) {
    const lines = [
      `    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${p.symbol !== null ? JSON.stringify(p.symbol) : 'null'},`,
      ...(p.contentEn ? [`    contentEn: ${JSON.stringify(p.contentEn)},`] : []),
      `    likes: ${p.likes}, comments: ${p.comments}, created_at: "${p.created_at}", liked: false,`,
    ];
    // content goes as field on its own line
    return `  {\n    ${lines[0]}\n    content: ${JSON.stringify(p.content)},\n${lines.slice(1).join("\n")}\n  },\n`;
  }

  const MARKER = `  // ── 2026-10-27 (화) 추가`;
  const idx = c.indexOf(MARKER);
  if (idx === -1) throw new Error("analystPosts: Oct 27 marker not found");
  const insertText = `  // ── 2026-10-28 (수) 추가 ──────────────────────\n` + NEW_ANALYST_POSTS.map(postEntry).join("");
  c = c.slice(0, idx) + insertText + c.slice(idx);
  console.log("analystPosts: inserted posts -1685 through -1691");

  // Insert comments after [-1684] block
  let commentBlock = `  // ── 2026-10-28 애널 댓글 ──────────────────────\n`;
  for (const [postId, comments] of Object.entries(NEW_ANALYST_COMMENTS)) {
    commentBlock += `  [${postId}]: [\n`;
    for (const cm of comments) {
      commentBlock += `    { alias: ${JSON.stringify(cm.alias)}, content: ${JSON.stringify(cm.content)}, created_at: "${cm.created_at}" },\n`;
    }
    commentBlock += `  ],\n`;
  }

  const CM_MARKER = `  [-1684]: [`;
  const cmIdx = c.indexOf(CM_MARKER);
  if (cmIdx === -1) throw new Error("analystPosts: [-1684] comment block not found");
  const cmEnd = c.indexOf("\n  ],\n", cmIdx) + "\n  ],\n".length;
  c = c.slice(0, cmEnd) + commentBlock + c.slice(cmEnd);
  console.log("analystPosts: inserted comments for -1685 through -1691");

  write("lib/analystPosts.ts", c);
}

// ── 3. lib/wallPosts.ts ─────────────────────────────────────────
function applyWallPosts() {
  let c = read("lib/wallPosts.ts");

  // Add T28OCT constant
  const T27LINE = `const T27OCT = 1793055600000; // 2026-10-27 08:00 KST (화)`;
  if (!c.includes(T27LINE)) throw new Error("wallPosts: T27OCT line not found");
  const T28LINE = `const T28OCT = 1793142000000; // 2026-10-28 08:00 KST (수)`;
  if (!c.includes(T28LINE)) {
    c = c.replace(T27LINE, T27LINE + "\n" + T28LINE);
    console.log("wallPosts: added T28OCT constant");
  } else {
    console.log("wallPosts: T28OCT already exists, skipping");
  }

  // Update LATEST_UPDATE
  c = c.replace(`export const LATEST_UPDATE = T27OCT;`, `export const LATEST_UPDATE = T28OCT;`);
  console.log("wallPosts: updated LATEST_UPDATE to T28OCT");

  function wallEntry(p) {
    const offsetMin = Math.round((p.createdAt - T28OCT) / 60000);
    return `  { id: ${p.id}, symbol: ${p.symbol ? `"${p.symbol}"` : 'null'}, nickname: "${p.nickname}", holdingLabel: "${p.holdingLabel}",\n    content: ${JSON.stringify(p.content)},\n    contentEn: ${JSON.stringify(p.contentEn)},\n    createdAt: T28OCT + ${offsetMin}*60_000, likes: ${p.likes}, comments: ${p.comments} },\n`;
  }

  const MARKER = `  // ── 2026-10-27 (화) 추가`;
  const idx = c.indexOf(MARKER);
  if (idx === -1) throw new Error("wallPosts: Oct 27 marker not found");
  const insertText = `  // ── 2026-10-28 (수) 추가 ────────────────\n` + NEW_WALL_POSTS.map(wallEntry).join("");
  c = c.slice(0, idx) + insertText + c.slice(idx);
  console.log("wallPosts: inserted posts 122431 through 122437");

  // Build comment entries
  let commentBlock = "";
  for (const [postId, comments] of Object.entries(NEW_WALL_COMMENTS)) {
    commentBlock += `  ${postId}: [\n`;
    for (const cm of comments) {
      const offsetMs = cm.createdAt - T28OCT;
      commentBlock += `    { id: ${cm.id}, nickname: "${cm.nickname}", holdingLabel: "${cm.holdingLabel}", content: ${JSON.stringify(cm.content)}, likes: ${cm.likes}, createdAt: T28OCT + ${offsetMs} },\n`;
    }
    commentBlock += `  ],\n`;
  }

  // Insert after 122430 comment block
  const CM_MARKER = `  122430: [`;
  const cmIdx = c.indexOf(CM_MARKER);
  if (cmIdx === -1) throw new Error("wallPosts: 122430 comment block not found");
  const cmEnd = c.indexOf("\n  ],\n", cmIdx) + "\n  ],\n".length;
  c = c.slice(0, cmEnd) + commentBlock + c.slice(cmEnd);
  console.log("wallPosts: inserted comments for 122431 through 122437");

  write("lib/wallPosts.ts", c);
}

applyReports();
applyAnalystPosts();
applyWallPosts();
console.log("✓ apply-20261028 done");
