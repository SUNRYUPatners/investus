#!/usr/bin/env node
/**
 * 한글 리포트(title/summary/body)에 영문 키워드 덤프·스켈레톤이 섞였는지 검증.
 * insert-reports 일괄 삽입 시 영문 placeholder 유입 방지.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const VALIDATE_SINCE = "2026-08-29";

/** 허용 약어·고유명 (소문자 비교) */
const ALLOW = new Set([
  "fomc", "etf", "btc", "eth", "hbm", "ota", "cid", "nim", "asp", "pmi", "dxy",
  "nvda", "tsla", "kospi", "semicon", "taiwan", "dram", "capex", "dsr", "ltv",
  "apr", "gdp", "cpi", "spy", "arkk", "mac", "cxmt", "kb", "sk", "ai", "sw", "ev",
  "fx", "usd", "krw", "ipo", "sec", "fed", "gdp", "l2", "sdv", "gu", "pm", "ui",
  "ux", "id", "api", "ceo", "cfo", "coo", "gpu", "cpu", "ram", "mix", "nim",
]);

/** 한글 필드에 있으면 실패하는 영문 스켈레톤 패턴 */
const BAD_PATTERNS = [
  /\*\*A\s+[a-z]/i,
  /\bsupply fear\b/i,
  /\bflows vs\b/i,
  /\bTrack mix\b/i,
  /\bhike odds\b/i,
  /\bsafe assets repricing\b/i,
  /\bsoftware UX premium\b/i,
  /\bmacro linked\b/i,
  /\baffordability rotation\b/i,
  /\bSee Korean summary\b/,
  /\bBTC ~\d/i,
  /\bGold ~\d/i,
  /\bETH ~\d/i,
  /\bForeign sell\b/i,
  /\blisting tight\b/i,
  /\bopportunity cost\b/i,
  /\bdecorrelate\b/i,
  /\bunderperform\b/i,
  /\bbarometer\b/i,
  /\bforced sale\b/i,
  /\bpeak-out\b/i,
  /\bheat map\b/i,
  /\btier rotation\b/i,
  /;\s*[a-z]{3,}/, // "BTC ~78128, ETH ~2459;" style dumps
];

function load(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

/** reports-*.ts에서 { id, title, summary, body, date } 추출 (단순 파서) */
function parseReports(src) {
  const reports = [];
  const blocks = src.split(/\n  \{\n    id: "/).slice(1);
  for (const chunk of blocks) {
    const id = chunk.match(/^([^"]+)"/)?.[1];
    const date = chunk.match(/date: "([^"]+)"/)?.[1];
    if (!id || !date) continue;
    const title = extractQuoted(chunk, "title:");
    const summary = extractQuoted(chunk, "summary:");
    const body = extractBody(chunk);
    reports.push({ id, date, title, summary, body });
  }
  return reports;
}

function extractQuoted(chunk, key) {
  const idx = chunk.indexOf(key);
  if (idx === -1) return "";
  const rest = chunk.slice(idx + key.length).trimStart();
  if (rest.startsWith('"')) {
    let out = "";
    let i = 1;
    while (i < rest.length) {
      if (rest[i] === "\\") {
        out += rest[i + 1];
        i += 2;
        continue;
      }
      if (rest[i] === '"') break;
      out += rest[i++];
    }
    return out;
  }
  if (rest.startsWith("'")) {
    let out = "";
    let i = 1;
    while (i < rest.length) {
      if (rest[i] === "\\") {
        out += rest[i + 1];
        i += 2;
        continue;
      }
      if (rest[i] === "'") break;
      out += rest[i++];
    }
    return out;
  }
  return "";
}

function extractBody(chunk) {
  const bodyIdx = chunk.indexOf("body:");
  if (bodyIdx === -1) return "";
  const rest = chunk.slice(bodyIdx);
  const tpl = rest.match(/body:\s*`([\s\S]*?)`/);
  if (tpl) return tpl[1];
  const fn = rest.match(/body:\s*body\(`([\s\S]*?)`\)/);
  if (fn) return fn[1];
  return "";
}

function latinWordRatio(text) {
  const words = text.match(/[a-zA-Z]{4,}/g) || [];
  const bad = words.filter((w) => !ALLOW.has(w.toLowerCase()));
  return bad.length;
}

function validateReport(r, file) {
  const errors = [];
  const fields = [
    ["title", r.title],
    ["summary", r.summary],
    ["body", r.body],
  ];
  for (const [name, val] of fields) {
    if (!val) continue;
    for (const re of BAD_PATTERNS) {
      if (re.test(val)) {
        errors.push(`${file} ${r.id} ${name}: 영문 스켈레톤 패턴 (${re})`);
        break;
      }
    }
    const badLatin = latinWordRatio(val);
    if (name === "summary" && badLatin >= 4) {
      errors.push(`${file} ${r.id} summary: 허용 외 영단어 ${badLatin}개`);
    }
    if (name === "body" && badLatin >= 12) {
      errors.push(`${file} ${r.id} body: 허용 외 영단어 ${badLatin}개 (과다)`);
    }
  }
  return errors;
}

const FILES = [
  "lib/reports-kr.ts",
  "lib/reports-safe.ts",
  "lib/reports-kr-re.ts",
];

const allErrors = [];
for (const file of FILES) {
  const src = load(file);
  const reports = parseReports(src);
  for (const r of reports) {
    if (r.date < VALIDATE_SINCE) continue;
    allErrors.push(...validateReport(r, file));
  }
}

if (allErrors.length > 0) {
  console.error("✗ 한글 리포트 영문 혼입:\n" + allErrors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}

console.log("✓ 한글 리포트(title/summary/body) 영문 스켈레톤 검증 OK");
