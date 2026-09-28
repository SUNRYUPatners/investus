#!/usr/bin/env node
/**
 * 중복을 지운 뒤 사라진 *고유* 문장만 원래 섹션에 되돌린다.
 * 같은 사실의 바꿔 말하기는 넣지 않는다.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const {
  cleanBody,
  splitSentences,
  similarSentence,
  similarPara,
  coveredBySeen,
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

function splitSections(body) {
  const parts = {};
  const re = /■ ([^\n]+)\n\n([\s\S]*?)(?=\n\n■ |\n\ninvestus\.kr|$)/g;
  let m;
  while ((m = re.exec(body))) parts[m[1]] = m[2].trim();
  return parts;
}
function joinSections(parts, isSummary) {
  const order = isSummary
    ? ["오늘의 큰 그림", "투자 시사점"]
    : ["무슨 일인가요", "조금만 더 알려드리면", "장기적으로 보면", "투자 시사점"];
  const out = [];
  for (const k of order) if (parts[k]) out.push(`■ ${k}\n\n${parts[k].trim()}`);
  out.push("investus.kr SRP 최고투자책임자 발행");
  return out.join("\n\n");
}

function uniqueSents(origSec, nowSec, wholeNow) {
  const origParas = (origSec || "").split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const nowParas = (nowSec || "").split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const kept = [];
  for (const p of origParas) {
    if (nowParas.some((n) => similarPara(n, p))) continue;
    const sents = splitSentences(p);
    const keepS = [];
    for (const s of sents.length ? sents : [p]) {
      if (splitSentences(wholeNow).some((n) => similarSentence(n, s))) continue;
      if (coveredBySeen(s, wholeNow)) continue;
      keepS.push(s);
    }
    if (keepS.length) kept.push(keepS.join(" "));
  }
  return kept;
}

function countLong(text, min) {
  return (text || "")
    .split(/\n\n+/)
    .filter((p) => p.trim().length > min).length;
}

function needs(parts, isSummary) {
  const miss = [];
  if (isSummary) {
    if (countLong(parts["오늘의 큰 그림"], 40) < 3) miss.push("오늘의 큰 그림");
    if (countLong(parts["투자 시사점"], 30) < 2) miss.push("투자 시사점");
  } else {
    if (countLong(parts["무슨 일인가요"], 40) < 3) miss.push("무슨 일인가요");
    if (countLong(parts["조금만 더 알려드리면"], 40) < 2) miss.push("조금만 더 알려드리면");
    if (countLong(parts["장기적으로 보면"], 40) < 2) miss.push("장기적으로 보면");
    if (countLong(parts["투자 시사점"], 30) < 2) miss.push("투자 시사점");
  }
  return miss;
}

function processFile(rel) {
  const file = path.join(ROOT, rel);
  const src = fs.readFileSync(file, "utf8");
  const origSrc = execSync(`git show HEAD:${rel}`, { cwd: ROOT, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });
  const marker = '\n  {\n    id: "';
  const parts = src.split(marker);
  const origParts = origSrc.split(marker);
  const origById = {};
  for (const chunk of origParts.slice(1)) {
    const id = chunk.match(/^([^"]+)"/)?.[1];
    if (!id) continue;
    origById[id] = extractQuoted(marker + chunk, "body:").value;
  }
  let n = 0;
  const blocks = parts.slice(1).map((chunk) => {
    let block = marker + chunk;
    const id = chunk.match(/^([^"]+)"/)?.[1];
    const dateRaw = chunk.match(/date: "([^"]+)"/)?.[1] || "";
    const date = dateRaw.replace(/\./g, "-");
    if (!id || date < "2026-09-10") return block;
    const bodyFound = extractQuoted(block, "body:");
    if (bodyFound.open < 0) return block;
    const subject = extractQuoted(block, "subject:").value;
    const pinned = /isPinned:\s*true/.test(block);
    const isSummary = pinned || subject === "한장요약";
    const orig = origById[id] || "";
    const nowParts = splitSections(bodyFound.value);
    const origPartsSec = splitSections(orig);
    let changed = false;
    const whole = bodyFound.value;
    for (const k of Object.keys(nowParts)) {
      const extras = uniqueSents(origPartsSec[k], nowParts[k], whole + "\n" + Object.values(nowParts).join("\n"));
      if (extras.length) {
        nowParts[k] = [nowParts[k], ...extras].filter(Boolean).join("\n\n");
        changed = true;
      }
    }
    for (const k of Object.keys(origPartsSec)) {
      if (nowParts[k]) continue;
      const extras = uniqueSents(origPartsSec[k], "", Object.values(nowParts).join("\n"));
      if (extras.length) {
        nowParts[k] = extras.join("\n\n");
        changed = true;
      }
    }
    let next = joinSections(nowParts, isSummary);
    next = cleanBody(next);
    if (next !== bodyFound.value) {
      block = replaceQuoted(block, "body:", next);
      n++;
    } else if (changed) {
      const cleaned = cleanBody(joinSections(nowParts, isSummary));
      if (cleaned !== bodyFound.value) {
        block = replaceQuoted(block, "body:", cleaned);
        n++;
      }
    }
    return block;
  });
  const out = parts[0] + blocks.join("");
  if (out !== src) fs.writeFileSync(file, out);
  console.log(`${rel}: restored unique sentences in ${n} bodies`);
}

for (const f of ["lib/reports.ts", "lib/reports-kr.ts", "lib/reports-safe.ts", "lib/reports-kr-re.ts"]) {
  processFile(f);
}
