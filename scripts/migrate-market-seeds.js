#!/usr/bin/env node
/**
 * Migrate Korean/safe-asset/crypto seeds from reports.ts →
 * reports-kr.ts (한국시장) and reports-safe.ts (안전자산 + 가상자산)
 *
 * Seeds to move:
 *   → reports-kr.ts   : seed-1975, seed-1976, seed-1990, seed-1991
 *   → reports-safe.ts : seed-1977, seed-1978, seed-1979, seed-1980,
 *                       seed-1992, seed-1993, seed-1994, seed-1995
 */

const fs = require("fs");
const path = require("path");

const LIB = path.join(__dirname, "../lib");
const REPORTS_TS   = path.join(LIB, "reports.ts");
const REPORTS_KR   = path.join(LIB, "reports-kr.ts");
const REPORTS_SAFE = path.join(LIB, "reports-safe.ts");

const KR_SEEDS   = ["seed-1975", "seed-1976", "seed-1990", "seed-1991"];
const SAFE_SEEDS = ["seed-1977", "seed-1978", "seed-1979", "seed-1980",
                    "seed-1992", "seed-1993", "seed-1994", "seed-1995"];
const ALL_MOVE   = new Set([...KR_SEEDS, ...SAFE_SEEDS]);

// ── 1. Read source file ──────────────────────────────────────────────────────
const src = fs.readFileSync(REPORTS_TS, "utf8");
const lines = src.split("\n");

// ── 2. Find seed block boundaries ────────────────────────────────────────────
// A seed block starts with "  {" and ends with "  }," (2-space indent)
// We detect the start by scanning for the `id: "seed-XXXX"` line and then
// backtrack to the opening `{`.

function extractSeedBlocks(lines, seedIds) {
  const blocks = {}; // id → { text, startLine, endLine }

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s+id:\s*"(seed-\d+)"/);
    if (!m) continue;
    const id = m[1];
    if (!seedIds.has(id)) continue;

    // Find opening brace (go backwards)
    let start = i - 1;
    while (start > 0 && lines[start].trim() !== "{") start--;

    // Find closing brace (go forwards, look for "  }," at depth 1)
    let depth = 0;
    let end = start;
    for (let j = start; j < lines.length; j++) {
      const t = lines[j].trim();
      if (t === "{") depth++;
      else if (t === "},") { depth--; if (depth === 0) { end = j; break; } }
      else if (t === "}") { depth--; if (depth === 0) { end = j; break; } }
    }

    const block = lines.slice(start, end + 1).join("\n");
    blocks[id] = { text: block, startLine: start, endLine: end };
  }
  return blocks;
}

const allBlocks = extractSeedBlocks(lines, ALL_MOVE);

if (Object.keys(allBlocks).length !== ALL_MOVE.size) {
  const missing = [...ALL_MOVE].filter(id => !allBlocks[id]);
  console.error("ERROR: could not find blocks for:", missing);
  process.exit(1);
}

// ── 3. Build updated reports.ts (remove moved seeds) ─────────────────────────
// Mark lines belonging to moved blocks
const removedRanges = Object.values(allBlocks).map(b => [b.startLine, b.endLine]);
const keepLine = new Array(lines.length).fill(true);
for (const [s, e] of removedRanges) {
  for (let i = s; i <= e; i++) keepLine[i] = false;
}
const newSrc = lines.filter((_, i) => keepLine[i]).join("\n");
fs.writeFileSync(REPORTS_TS, newSrc, "utf8");
console.log(`reports.ts: removed ${ALL_MOVE.size} seed blocks`);

// ── 4. Build seed text to insert ─────────────────────────────────────────────
function buildInsertText(seedIds) {
  return seedIds
    .map(id => allBlocks[id].text)
    .join(",\n") + ",";
}

const krText   = buildInsertText(KR_SEEDS);
const safeText = buildInsertText(SAFE_SEEDS);

// ── 5. Insert into reports-kr.ts ─────────────────────────────────────────────
{
  let content = fs.readFileSync(REPORTS_KR, "utf8");
  // Insert right after "export const SEED_REPORTS_KR: Report[] = ["
  const marker = "export const SEED_REPORTS_KR: Report[] = [";
  const idx = content.indexOf(marker);
  if (idx === -1) { console.error("ERROR: marker not found in reports-kr.ts"); process.exit(1); }
  const insertAt = idx + marker.length;
  content = content.slice(0, insertAt) + "\n  // ── 2026-10-12/13 한국시장 (moved from reports.ts) ──\n" + krText + "\n" + content.slice(insertAt);
  fs.writeFileSync(REPORTS_KR, content, "utf8");
  console.log(`reports-kr.ts: inserted ${KR_SEEDS.length} seeds`);
}

// ── 6. Insert into reports-safe.ts ───────────────────────────────────────────
{
  let content = fs.readFileSync(REPORTS_SAFE, "utf8");
  const marker = "export const SEED_REPORTS_SAFE: Report[] = [";
  const idx = content.indexOf(marker);
  if (idx === -1) { console.error("ERROR: marker not found in reports-safe.ts"); process.exit(1); }
  const insertAt = idx + marker.length;
  content = content.slice(0, insertAt) + "\n  // ── 2026-10-12/13 안전자산·가상자산 (moved from reports.ts) ──\n" + safeText + "\n" + content.slice(insertAt);
  fs.writeFileSync(REPORTS_SAFE, content, "utf8");
  console.log(`reports-safe.ts: inserted ${SAFE_SEEDS.length} seeds`);
}

console.log("Done ✓");
