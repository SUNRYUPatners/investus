#!/usr/bin/env node
/** Remove seed-2100~2105 — created before reading screenshots */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

const REMOVE_IDS = ["seed-2100","seed-2101","seed-2102","seed-2103","seed-2104","seed-2105"];
const REMOVE_ANALYST_IDS = [-1665,-1666,-1667,-1668,-1669];
const REMOVE_WALL_IDS = [122410,122411,122412,122413,122414];

// ── 1. lib/reports.ts — remove seed-2100~2105 entries ──────────────────────
function cleanReports() {
  let c = read("lib/reports.ts");

  for (const id of REMOVE_IDS) {
    const marker = `id: "${id}"`;
    const idx = c.indexOf(marker);
    if (idx === -1) { console.log(`reports.ts: ${id} not found — skip`); continue; }
    // find start of object { ...
    const start = c.lastIndexOf("  {", idx);
    // find end: next top-level },\n  { or },\n]; pattern
    const afterMarker = c.indexOf("\n  },\n", idx);
    if (afterMarker === -1) { console.log(`reports.ts: ${id} end not found — skip`); continue; }
    const end = afterMarker + "\n  },\n".length;
    c = c.slice(0, start) + c.slice(end);
    console.log(`reports.ts: removed ${id}`);
  }

  // Remove REPORT_TICKERS entries for seed-2100~2105
  for (const id of REMOVE_IDS) {
    const re = new RegExp(`  "${id}": \\[[^\\]]*\\],\\n`, "g");
    const before = c.length;
    c = c.replace(re, "");
    if (c.length < before) console.log(`REPORT_TICKERS: removed ${id}`);
  }

  // Remove the "// 2026-10-26" comment line if no more 2026-10-26 entries remain
  // (seed-2106~2110 have no date comment since they were added with a different script)
  // Actually keep the comment if seed-2106~2110 exist
  const hasOct26 = c.includes('"seed-2106"');
  if (!hasOct26) {
    c = c.replace(/  \/\/ 2026-10-26\n/, "");
    console.log("REPORT_TICKERS: removed // 2026-10-26 comment");
  }

  write("lib/reports.ts", c);
}

// ── 2. lib/analystPosts.ts — remove posts -1665~-1669 and their comments ───
function cleanAnalystPosts() {
  let c = read("lib/analystPosts.ts");

  // Remove post entries
  for (const id of REMOVE_ANALYST_IDS) {
    // Each post is a multi-line block: "  {\n    id: -1665, ...liked: false,\n  },"
    const marker = `id: ${id},`;
    const idx = c.indexOf(marker);
    if (idx === -1) { console.log(`analystPosts: id ${id} not found — skip`); continue; }
    const start = c.lastIndexOf("  {", idx);
    const end = c.indexOf("\n  },\n", idx) + "\n  },\n".length;
    c = c.slice(0, start) + c.slice(end);
    console.log(`analystPosts: removed post ${id}`);
  }

  // Remove comment entries [id]: [...]
  for (const id of REMOVE_ANALYST_IDS) {
    const re = new RegExp(`  \\[${id}\\]: \\[\\n[\\s\\S]*?\\],\\n`, "g");
    const before = c.length;
    c = c.replace(re, "");
    if (c.length < before) console.log(`analystPosts: removed comments for ${id}`);
  }

  // Remove the section header "// ── 2026-10-26 (월) 신규 ──────────────────────"
  c = c.replace(/  \/\/ ── 2026-10-26 \(월\) 신규 ──────────────────────\n/, "");
  // Remove the comment header "// ── 2026-10-26 애널 댓글 ──────────────────────"
  c = c.replace(/  \/\/ ── 2026-10-26 애널 댓글 ──────────────────────\n/, "");

  write("lib/analystPosts.ts", c);
  console.log("analystPosts: cleanup done");
}

// ── 3. lib/wallPosts.ts — remove posts 122410~122414 and their comments ────
function cleanWallPosts() {
  let c = read("lib/wallPosts.ts");

  for (const id of REMOVE_WALL_IDS) {
    // Each post: "  { id: 122410, symbol: ...\n    content: ...,\n    createdAt: ..., likes: ..., comments: ... },"
    const marker = `id: ${id},`;
    const idx = c.indexOf(marker);
    if (idx === -1) { console.log(`wallPosts: id ${id} not found — skip`); continue; }
    const start = c.lastIndexOf("  {", idx);
    const end = c.indexOf("},\n", idx) + "},\n".length;
    c = c.slice(0, start) + c.slice(end);
    console.log(`wallPosts: removed post ${id}`);
  }

  // Remove comment entries
  for (const id of REMOVE_WALL_IDS) {
    const re = new RegExp(`  ${id}: \\[\\n[\\s\\S]*?\\],\\n`, "g");
    const before = c.length;
    c = c.replace(re, "");
    if (c.length < before) console.log(`wallPosts: removed comments for ${id}`);
  }

  // Remove section header
  c = c.replace(/  \/\/ ── 2026-10-26 \(월\) 신규 ────────────────\n/, "");

  write("lib/wallPosts.ts", c);
  console.log("wallPosts: cleanup done");
}

// ── 4. Delete pre-screenshot chart files ────────────────────────────────────
function cleanCharts() {
  const CHARTS = path.join(ROOT, "public/charts");
  const toDelete = [
    "summary-20261026.png","summary-20261026-en.png",
    "summary-20261026.svg","summary-20261026-en.svg",
    "spcx-unlock-328m-oct26-20261026.png","spcx-unlock-328m-oct26-20261026-en.png",
    "spcx-unlock-328m-oct26-20261026.svg","spcx-unlock-328m-oct26-20261026-en.svg",
    "tsla-spcx-merger-committee-20261026.png","tsla-spcx-merger-committee-20261026-en.png",
    "tsla-spcx-merger-committee-20261026.svg","tsla-spcx-merger-committee-20261026-en.svg",
    "tsla-q3-fsd-optimus-2026-20261026.png","tsla-q3-fsd-optimus-2026-20261026-en.png",
    "tsla-q3-fsd-optimus-2026-20261026.svg","tsla-q3-fsd-optimus-2026-20261026-en.svg",
    "spcx-q3-earnings-161pct-20261026.png","spcx-q3-earnings-161pct-20261026-en.png",
    "spcx-q3-earnings-161pct-20261026.svg","spcx-q3-earnings-161pct-20261026-en.svg",
    "macro-10y-5pct-brent-oct26-20261026.png","macro-10y-5pct-brent-oct26-20261026-en.png",
    "macro-10y-5pct-brent-oct26-20261026.svg","macro-10y-5pct-brent-oct26-20261026-en.svg",
  ];
  for (const f of toDelete) {
    const fp = path.join(CHARTS, f);
    if (fs.existsSync(fp)) { fs.unlinkSync(fp); console.log(`deleted: ${f}`); }
    else console.log(`not found (skip): ${f}`);
  }
}

cleanReports();
cleanAnalystPosts();
cleanWallPosts();
cleanCharts();
console.log("✓ cleanup-20261026-prescreenshot done");
