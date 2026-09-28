#!/usr/bin/env node
/**
 * 분량 패딩으로 섹션마다 붙인 「초보 말로 한 번 더」 문장과
 * 「오늘 숫자는 화면·집계 기준이며…」 꼬리를 제거한다.
 * 이어진 동일·접두 문단 중복도 접는다.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const FILLER_PARA =
  /[^\n]*초보 말로 한 번 더 적습니다\.[^\n]*숫자는 오늘 기준이며 다음 화면이 같으면 이야기가 두꺼워집니다\.[^\n]*한 번의 고점이나 시가는 종가·공시와 따로(?: 표에)? 두면 읽기 쉽습니다\.\n*/g;

const SUMMARY_TAIL =
  / ?오늘 숫자는 화면·집계 기준이며 다음 공시가 같으면 이야기가 두꺼워집니다\.?/g;

function collapseDupParas(text) {
  const paras = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const out = [];
  for (const p of paras) {
    const prev = out[out.length - 1];
    if (!prev) {
      out.push(p);
      continue;
    }
    if (p.startsWith("■ ")) {
      out.push(p);
      continue;
    }
    if (p === prev) continue;
    if (prev.startsWith("■ ")) {
      out.push(p);
      continue;
    }
    if (p.startsWith(prev) && prev.length > 40) {
      out[out.length - 1] = p;
      continue;
    }
    if (prev.startsWith(p) && p.length > 40) continue;
    out.push(p);
  }
  return out.join("\n\n");
}

function cleanText(s) {
  if (!s) return s;
  let t = s.replace(FILLER_PARA, "");
  t = t.replace(SUMMARY_TAIL, "");
  t = collapseDupParas(t);
  t = t.replace(/\n{3,}/g, "\n\n").trim();
  return t;
}

function escapeTs(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function unescapeTsChar(n) {
  if (n === "n") return "\n";
  if (n === "t") return "\t";
  if (n === '"') return '"';
  if (n === "\\") return "\\";
  return n;
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

function processReportFile(rel) {
  const file = path.join(ROOT, rel);
  const src = fs.readFileSync(file, "utf8");
  const marker = '\n  {\n    id: "';
  const parts = src.split(marker);
  if (parts.length < 2) {
    console.log(`skip (no blocks): ${rel}`);
    return { file: rel, changed: 0 };
  }
  let changed = 0;
  const head = parts[0];
  const blocks = parts.slice(1).map((chunk) => {
    let block = marker + chunk;
    for (const key of ["summary:", "body:"]) {
      const found = extractQuoted(block, key);
      if (found.open < 0) continue;
      const cleaned = cleanText(found.value);
      if (cleaned === found.value) continue;
      if (key === "body:" && found.value.length > 400 && cleaned.length < 400) {
        throw new Error(`refusing to shrink ${rel} body ${cleaned.length} from ${found.value.length}`);
      }
      block = replaceQuoted(block, key, cleaned);
      changed++;
    }
    return block;
  });
  const next = head + blocks.join("");
  if (next !== src) fs.writeFileSync(file, next);
  console.log(`${rel}: ${changed} fields cleaned`);
  return { file: rel, changed };
}

function processAnalystFile(rel) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) return { file: rel, changed: 0 };
  const src = fs.readFileSync(file, "utf8");
  const next = src.replace(SUMMARY_TAIL, "").replace(FILLER_PARA, "");
  const changed = next !== src;
  if (changed) fs.writeFileSync(file, next);
  console.log(`${rel}: ${changed ? "cleaned" : "no change"}`);
  return { file: rel, changed: changed ? 1 : 0 };
}

const reportFiles = [
  "lib/reports.ts",
  "lib/reports-kr.ts",
  "lib/reports-safe.ts",
  "lib/reports-kr-re.ts",
];
const analystFiles = [
  "lib/analystPosts.ts",
  "lib/analystPosts-markets.ts",
];

let total = 0;
for (const f of reportFiles) total += processReportFile(f).changed;
for (const f of analystFiles) total += processAnalystFile(f).changed;
console.log(`done, ${total} fields`);
