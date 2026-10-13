#!/usr/bin/env node
/**
 * Migrate Korean/safe-asset/crypto wallPosts and analystPosts from US files
 * to the correct market files (wallPosts-markets.ts, analystPosts-markets.ts).
 *
 * wallPosts to move:
 *   KR:   122272-122277 (Oct12), 122302-122303 (Oct13)
 *   SAFE: 122278-122289 (Oct12), 122304-122307 (Oct13)
 *
 * analystPosts to move:
 *   KR:   -1602 to -1606 (Oct12), -1626 to -1627 (Oct13) + comments
 *   SAFE: -1607 to -1616 (Oct12), -1628 to -1631 (Oct13) + comments
 */

const fs = require("fs");
const path = require("path");

const LIB = path.join(__dirname, "../lib");

const WALL_US      = path.join(LIB, "wallPosts.ts");
const WALL_MKT     = path.join(LIB, "wallPosts-markets.ts");
const ANALYST_US   = path.join(LIB, "analystPosts.ts");
const ANALYST_MKT  = path.join(LIB, "analystPosts-markets.ts");

// IDs to move (by market)
const WALL_KR_IDS   = new Set([122272, 122273, 122274, 122275, 122276, 122277, 122302, 122303]);
const WALL_SAFE_IDS = new Set([122278, 122279, 122280, 122281, 122282, 122283,
                                122284, 122285, 122286, 122287, 122288, 122289,
                                122304, 122305, 122306, 122307]);

const ANALYST_KR_IDS   = new Set([-1602, -1603, -1604, -1605, -1606, -1626, -1627]);
const ANALYST_SAFE_IDS = new Set([-1607, -1608, -1609, -1610, -1611, -1612,
                                   -1613, -1614, -1615, -1616, -1628, -1629, -1630, -1631]);

// Timestamp constants to add
const NEW_CONSTS = `const T12OCT = 1791759600000; // 2026-10-12 08:00 KST
const T13OCT = 1791846000000; // 2026-10-13 08:00 KST
`;

// ─────────────────────────────────────────────────────────────
// 1. WALL POSTS migration
// ─────────────────────────────────────────────────────────────

function migrateWallPosts() {
  let src = fs.readFileSync(WALL_US, "utf8");
  const lines = src.split("\n");

  const krLines   = [];
  const safeLines = [];
  const keepLines = [];

  for (const line of lines) {
    const m = line.match(/\{\s*id:\s*(\d+),/);
    if (m) {
      const id = parseInt(m[1]);
      if (WALL_KR_IDS.has(id))   { krLines.push(line);   continue; }
      if (WALL_SAFE_IDS.has(id)) { safeLines.push(line); continue; }
    }
    keepLines.push(line);
  }

  fs.writeFileSync(WALL_US, keepLines.join("\n"), "utf8");
  console.log(`wallPosts.ts: removed ${krLines.length + safeLines.length} posts`);

  // Now add to wallPosts-markets.ts
  let mkt = fs.readFileSync(WALL_MKT, "utf8");

  // 1a. Add timestamp constants (after existing T07OCT line)
  mkt = mkt.replace(
    "const T07OCT = 1791327600000; // 2026-10-07 08:00 KST\n",
    "const T07OCT = 1791327600000; // 2026-10-07 08:00 KST\n" + NEW_CONSTS
  );

  // 1b. Add KR posts to MOCK_POSTS_KR (at top of array)
  const krInsert = "  // ── 2026-10-12/13 한국시장 종토방 ──\n" +
    krLines.map(l => l).join("\n") + "\n";
  mkt = mkt.replace(
    "export const MOCK_POSTS_KR: Post[] = [\n",
    "export const MOCK_POSTS_KR: Post[] = [\n" + krInsert
  );

  // 1c. Add SAFE posts to MOCK_POSTS_SAFE (at top of array)
  const safeInsert = "  // ── 2026-10-12/13 안전자산·가상자산 종토방 ──\n" +
    safeLines.map(l => l).join("\n") + "\n";
  mkt = mkt.replace(
    "export const MOCK_POSTS_SAFE: Post[] = [\n",
    "export const MOCK_POSTS_SAFE: Post[] = [\n" + safeInsert
  );

  fs.writeFileSync(WALL_MKT, mkt, "utf8");
  console.log(`wallPosts-markets.ts: added ${krLines.length} KR + ${safeLines.length} SAFE posts`);
}

// ─────────────────────────────────────────────────────────────
// 2. ANALYST POSTS migration
// ─────────────────────────────────────────────────────────────

function extractAnalystBlocks(content, idSet) {
  const lines = content.split("\n");
  const blocks = {}; // id → { postText, commentText }

  // --- extract post blocks ---
  // A post block spans from "  {\n    id: -XXXX," to "  },"
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s+id:\s*(-\d+),/);
    if (!m) continue;
    const id = parseInt(m[1]);
    if (!idSet.has(id)) continue;

    // find opening brace
    let start = i - 1;
    while (start > 0 && lines[start].trim() !== "{") start--;

    // find closing brace
    let depth = 0, end = start;
    for (let j = start; j < lines.length; j++) {
      for (const ch of lines[j]) {
        if (ch === "{") depth++;
        if (ch === "}") { depth--; if (depth === 0) { end = j; break; } }
      }
      if (depth === 0) break;
    }

    blocks[id] = { postLines: lines.slice(start, end + 1), commentLines: null };
  }

  return blocks;
}

function extractCommentBlocks(content, idSet) {
  const lines = content.split("\n");
  const comments = {};

  for (let i = 0; i < lines.length; i++) {
    // Match "  [-XXXX]: ["
    const m = lines[i].match(/^\s+\[(-\d+)\]:\s*\[/);
    if (!m) continue;
    const id = parseInt(m[1]);
    if (!idSet.has(id)) continue;

    // Find closing "],"
    let end = i;
    for (let j = i; j < lines.length; j++) {
      if (lines[j].trim() === "],") { end = j; break; }
    }
    comments[id] = lines.slice(i, end + 1);
  }
  return comments;
}

function migrateAnalystPosts() {
  const allIds = new Set([...ANALYST_KR_IDS, ...ANALYST_SAFE_IDS]);

  let src = fs.readFileSync(ANALYST_US, "utf8");

  // Extract post blocks
  const postBlocks = extractAnalystBlocks(src, allIds);
  const commentBlocks = extractCommentBlocks(src, allIds);

  console.log(`Found ${Object.keys(postBlocks).length} post blocks, ${Object.keys(commentBlocks).length} comment blocks`);

  // Remove from analystPosts.ts
  const srcLines = src.split("\n");
  const postLinesToRemove = new Set();
  const commentLinesToRemove = new Set();

  for (const id of allIds) {
    if (postBlocks[id]) {
      // Find actual line range in file
      const idStr = `id: ${id},`;
      for (let i = 0; i < srcLines.length; i++) {
        if (srcLines[i].includes(idStr)) {
          // Find start
          let start = i - 1;
          while (start > 0 && srcLines[start].trim() !== "{") start--;
          // Find end
          let depth = 0, end = start;
          for (let j = start; j < srcLines.length; j++) {
            for (const ch of srcLines[j]) {
              if (ch === "{") depth++;
              if (ch === "}") { depth--; if (depth === 0) { end = j; break; } }
            }
            if (depth === 0) break;
          }
          for (let k = start; k <= end; k++) postLinesToRemove.add(k);
          break;
        }
      }
    }
    if (commentBlocks[id]) {
      // Find actual line range in file
      const idStr = `[${id}]: [`;
      for (let i = 0; i < srcLines.length; i++) {
        if (srcLines[i].includes(idStr)) {
          let end = i;
          for (let j = i; j < srcLines.length; j++) {
            if (srcLines[j].trim() === "],") { end = j; break; }
          }
          for (let k = i; k <= end; k++) commentLinesToRemove.add(k);
          break;
        }
      }
    }
  }

  const removedTotal = postLinesToRemove.size + commentLinesToRemove.size;
  const allLinesToRemove = new Set([...postLinesToRemove, ...commentLinesToRemove]);
  const newSrc = srcLines.filter((_, i) => !allLinesToRemove.has(i)).join("\n");
  fs.writeFileSync(ANALYST_US, newSrc, "utf8");
  console.log(`analystPosts.ts: removed ~${removedTotal} lines`);

  // Build insert texts
  function buildPostInsert(ids) {
    return ids.map(id => {
      const b = postBlocks[id];
      return b ? b.postLines.join("\n") + "," : "";
    }).filter(Boolean).join("\n") + "\n";
  }

  function buildCommentInsert(ids) {
    return ids.map(id => {
      const c = commentBlocks[id];
      return c ? c.join("\n") : "";
    }).filter(Boolean).join("\n") + "\n";
  }

  // Sort IDs: Oct12 after Oct13 (to keep newest first)
  const krIds   = [...ANALYST_KR_IDS].sort((a, b) => b - a);
  const safeIds = [...ANALYST_SAFE_IDS].sort((a, b) => b - a);

  const krPostText   = buildPostInsert(krIds);
  const safePostText = buildPostInsert(safeIds);
  const krCommentText   = buildCommentInsert(krIds);
  const safeCommentText = buildCommentInsert(safeIds);

  // Insert into analystPosts-markets.ts
  let mkt = fs.readFileSync(ANALYST_MKT, "utf8");

  // Add KR posts at top of MOCK_ANALYST_POSTS_KR
  mkt = mkt.replace(
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n",
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n" +
    "  // ── 2026-10-12/13 한국시장 애널 ──\n" + krPostText
  );

  // Add SAFE posts at top of MOCK_ANALYST_POSTS_SAFE
  mkt = mkt.replace(
    "export const MOCK_ANALYST_POSTS_SAFE: AnalystMockPost[] = [\n",
    "export const MOCK_ANALYST_POSTS_SAFE: AnalystMockPost[] = [\n" +
    "  // ── 2026-10-12/13 안전자산·가상자산 애널 ──\n" + safePostText
  );

  // Add KR comments at top of MOCK_ANALYST_COMMENTS_KR
  mkt = mkt.replace(
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n",
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n" +
    "  // ── 2026-10-12/13 한국시장 댓글 ──\n" + krCommentText
  );

  // Add SAFE comments at top of MOCK_ANALYST_COMMENTS_SAFE
  mkt = mkt.replace(
    "export const MOCK_ANALYST_COMMENTS_SAFE: Record<number, AnalystMockComment[]> = {\n",
    "export const MOCK_ANALYST_COMMENTS_SAFE: Record<number, AnalystMockComment[]> = {\n" +
    "  // ── 2026-10-12/13 안전자산·가상자산 댓글 ──\n" + safeCommentText
  );

  fs.writeFileSync(ANALYST_MKT, mkt, "utf8");
  console.log(`analystPosts-markets.ts: added KR (${ANALYST_KR_IDS.size}) + SAFE (${ANALYST_SAFE_IDS.size}) posts + comments`);
}

// ─────────────────────────────────────────────────────────────
migrateWallPosts();
migrateAnalystPosts();
console.log("Done ✓");
