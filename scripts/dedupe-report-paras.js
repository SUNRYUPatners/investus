#!/usr/bin/env node
/**
 * 같은 사실을 문장만 바꿔 섹션마다 다시 붙인 문단을 제거한다.
 * 검증기(validate-report-korean.js)와 같은 유사도 규칙을 쓴다.
 */
const fs = require("fs");
const path = require("path");
const {
  cleanBody,
  findPairs,
  findRepeatSentences,
} = require("./lib/report-similarity");

const ROOT = path.join(__dirname, "..");

function unescapeTsChar(n) {
  if (n === "n") return "\n";
  if (n === "t") return "\t";
  if (n === '"') return '"';
  if (n === "\\") return "\\";
  return n;
}
function escapeTs(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}
function extractQuoted(chunk, key) {
  const idx = chunk.indexOf(key);
  if (idx === -1) return { value: "", open: -1, close: -1 };
  let i = idx + key.length;
  while (i < chunk.length && /\s/.test(chunk[i])) i++;
  if (chunk[i] !== '"') return { value: "", open: -1, close: -1 };
  const open = i;
  i++;
  let out = "";
  while (i < chunk.length) {
    if (chunk[i] === "\\") {
      out += unescapeTsChar(chunk[i + 1]);
      i += 2;
      continue;
    }
    if (chunk[i] === '"') break;
    out += chunk[i++];
  }
  return { value: out, open, close: i };
}
function replaceQuoted(chunk, key, newVal) {
  const found = extractQuoted(chunk, key);
  if (found.open < 0) return chunk;
  return chunk.slice(0, found.open + 1) + escapeTs(newVal) + chunk.slice(found.close);
}

function processFile(rel, apply, previewId) {
  const file = path.join(ROOT, rel);
  const src = fs.readFileSync(file, "utf8");
  const marker = '\n  {\n    id: "';
  const parts = src.split(marker);
  const hits = [];
  let changed = 0;
  const blocks = parts.slice(1).map((chunk) => {
    let block = marker + chunk;
    const id = chunk.match(/^([^"]+)"/)?.[1];
    const dateRaw = chunk.match(/date: "([^"]+)"/)?.[1] || "";
    const date = dateRaw.replace(/\./g, "-");
    if (!id || date < "2026-09-10") return block;
    const bodyFound = extractQuoted(block, "body:");
    if (bodyFound.open < 0) return block;
    const pairs = findPairs(bodyFound.value);
    const sents = findRepeatSentences(bodyFound.value);
    if (pairs.length || sents.length) {
      hits.push({ file: rel, id, n: pairs.length, s: sents.length, pairs: pairs.slice(0, 3) });
    }
    if (previewId && id === previewId) {
      const cleaned = cleanBody(bodyFound.value);
      console.log("\n===== BEFORE", id, bodyFound.value.length, "=====\n");
      console.log(bodyFound.value);
      console.log("\n===== AFTER", id, cleaned.length, "=====\n");
      console.log(cleaned);
    }
    if (!apply) return block;
    const cleaned = cleanBody(bodyFound.value);
    if (cleaned !== bodyFound.value) {
      if (bodyFound.value.length > 500 && cleaned.length < 280) {
        throw new Error(`refusing to shrink ${rel} ${id} ${cleaned.length} from ${bodyFound.value.length}`);
      }
      block = replaceQuoted(block, "body:", cleaned);
      changed++;
    }
    return block;
  });
  if (apply) {
    const next = parts[0] + blocks.join("");
    if (next !== src) fs.writeFileSync(file, next);
  }
  return { hits, changed };
}

const apply = process.argv.includes("--apply");
const previewArg = process.argv.find((a) => a.startsWith("--preview="));
const previewId = previewArg ? previewArg.slice("--preview=".length) : "";
const files = ["lib/reports.ts", "lib/reports-kr.ts", "lib/reports-safe.ts", "lib/reports-kr-re.ts"];
let totalHits = 0;
let totalChanged = 0;
for (const f of files) {
  const { hits, changed } = processFile(f, apply, previewId);
  totalHits += hits.length;
  totalChanged += changed;
  if (!previewId) {
    for (const h of hits) {
      console.log(`${h.file} ${h.id} 유사문단 ${h.n}쌍 유사문장 ${h.s}쌍`);
      for (const p of h.pairs) console.log(`  ${p.jaccard}%  ${p.a} / ${p.b}`);
    }
  }
}
if (!previewId) {
  console.log(apply ? `applied ${totalChanged} bodies, ${totalHits} reports had overlaps` : `dry-run: ${totalHits} reports with similar paragraphs/sentences`);
}
