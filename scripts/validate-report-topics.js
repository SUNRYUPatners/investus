#!/usr/bin/env node
/**
 * lib/reports.ts · analystPosts.ts 가 fix-reports-YYYYMMDD 소스(slug·애널)와 일치하는지 검증.
 * 2026-09-02 사고: seed 존재 시 fix 스크립트가 skip → 9/1 본문이 9/2에 배포됨.
 * SVG 파일은 있어도 images 경로(slug)가 어제 토픽이면 배포 차단.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const VALIDATE_SINCE = "2026-08-29";

function load(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function dateToTag(dotDate) {
  return dotDate.replace(/\./g, "");
}

function parseReportChunks(src) {
  const chunks = [];
  const re = /\{\s*id:\s*["']([^"']+)["']/g;
  let m;
  const starts = [];
  while ((m = re.exec(src))) starts.push({ id: m[1], start: m.index });
  for (let i = 0; i < starts.length; i++) {
    const end = i + 1 < starts.length ? starts[i + 1].start : src.length;
    chunks.push({ id: starts[i].id, chunk: src.slice(starts[i].start, end) });
  }
  return chunks;
}

function extractDate(chunk) {
  const m = chunk.match(/date:\s*["'](\d{4}\.\d{2}\.\d{2})["']/);
  return m ? m[1] : "";
}

function extractTitle(chunk) {
  const m = chunk.match(/title:\s*['"]([^'"]+)['"]/);
  return m ? m[1] : "";
}

function extractImageSlug(chunk, tag) {
  const re = new RegExp(`/charts/(.+)-${tag}\\.svg`);
  const m = chunk.match(re);
  return m ? m[1] : "";
}

function loadExpectedUsReports(tag) {
  const fixPath = path.join(__dirname, `fix-reports-${tag}-ko.js`);
  const reportsPath = path.join(__dirname, `fix-reports-${tag}-ko-reports.js`);
  if (!fs.existsSync(fixPath) || !fs.existsSync(reportsPath)) return null;

  delete require.cache[require.resolve(fixPath)];
  delete require.cache[require.resolve(reportsPath)];

  const fix = require(fixPath);
  const detail = require(reportsPath);
  const expected = {};

  // seed-1445 summary lives in fix script REPORTS[0] — read via buildReportsBlock source
  const fixSrc = load(`scripts/fix-reports-${tag}-ko.js`);
  const summaryMatch = fixSrc.match(
    /id:\s*['"]seed-\d+['"],\s*slug:\s*['"]([^'"]+)['"]/,
  );
  const summarySlug = summaryMatch ? summaryMatch[1] : "summary";

  const summaryIdMatch = fixSrc.match(/id:\s*['"](seed-\d+)['"],\s*slug:\s*['"]summary['"]/);
  if (summaryIdMatch) {
    expected[summaryIdMatch[1]] = summarySlug;
  }

  for (const r of detail) {
    expected[r.id] = r.slug;
  }
  return expected;
}

function loadExpectedAnalystFingerprint(tag) {
  const p = path.join(__dirname, `fix-reports-${tag}-ko-analyst.js`);
  if (!fs.existsSync(p)) return null;
  delete require.cache[require.resolve(p)];
  const posts = require(p);
  if (!posts.length) return null;
  const first = posts[0].content.split("\n")[0].slice(0, 40);
  return { id: posts[0].id, fingerprint: first };
}

function extractAnalystBlock(src, marker) {
  const start = src.indexOf(marker);
  if (start === -1) return "";
  const end = src.indexOf("  // ──", start + marker.length);
  return end === -1 ? src.slice(start) : src.slice(start, end);
}

const errors = [];
const reportsSrc = load("lib/reports.ts");
const analystSrc = load("lib/analystPosts.ts");
const chunks = parseReportChunks(reportsSrc);

const byDate = new Map();
for (const { id, chunk } of chunks) {
  const date = extractDate(chunk);
  if (!date || date < VALIDATE_SINCE.replace(/-/g, ".")) continue;
  if (!byDate.has(date)) byDate.set(date, []);
  byDate.get(date).push({ id, chunk, title: extractTitle(chunk) });
}

const sortedDates = [...byDate.keys()].sort();
// fix-reports 소스가 있는 날짜 중 가장 최신 US 세트만 검증 (과거 수동 편집 오탐 방지)
const datesToCheck = sortedDates.filter((date) => {
  const tag = dateToTag(date);
  return fs.existsSync(path.join(__dirname, `fix-reports-${tag}-ko-reports.js`));
});
const latestDate = datesToCheck.length ? datesToCheck[datesToCheck.length - 1] : null;

for (const date of latestDate ? [latestDate] : []) {
  const tag = dateToTag(date);
  const expected = loadExpectedUsReports(tag);
  if (!expected) continue;

  const prevDate = sortedDates[sortedDates.indexOf(date) - 1];
  const prevTitles = new Set(
    prevDate
      ? (byDate.get(prevDate) || [])
          .filter((r) => !r.id.includes("summary") && r.chunk.includes("body:"))
          .map((r) => r.title)
      : [],
  );

  for (const { id, chunk, title } of byDate.get(date)) {
    const expSlug = expected[id];
    if (!expSlug) continue;

    const gotSlug = extractImageSlug(chunk, tag);
    if (!gotSlug) {
      errors.push(`${date} ${id}: images slug 추출 실패`);
      continue;
    }
    if (gotSlug !== expSlug) {
      errors.push(
        `${date} ${id}: slug 불일치 — lib/reports.ts="${gotSlug}", fix-reports="${expSlug}" (어제 본문·SVG 잔존 의심)`,
      );
    }

    if (prevTitles.has(title) && !id.match(/summary|1445|1430/)) {
      errors.push(
        `${date} ${id}: 제목이 전일(${prevDate}) 리포트와 동일 — "${title.slice(0, 50)}…"`,
      );
    }
  }

  const fp = loadExpectedAnalystFingerprint(tag);
  if (fp) {
    const marker = `  // ── ${date.slice(0, 4)}-${date.slice(5, 7)}-${date.slice(8, 10)} 신규`;
    const block = extractAnalystBlock(analystSrc, marker);
    const postRe = new RegExp(`id:\\s*${fp.id}[\\s\\S]*?content:\\s*"((?:\\\\.|[^"\\\\])*)"`);
    const pm = block.match(postRe);
    if (!pm) {
      errors.push(`${date}: analystPosts id ${fp.id} 블록 없음`);
    } else {
      const got = pm[1].replace(/\\n/g, "\n").replace(/\\\$/g, "$");
      if (!got.includes(fp.fingerprint.slice(0, 20))) {
        errors.push(
          `${date}: analystPosts ${fp.id} 내용이 fix-reports 소스와 다름 (전일 애널 잔존 의심)`,
        );
      }
    }
  }
}

if (errors.length > 0) {
  console.error(
    "✗ 리포트 토픽·slug 불일치 (배포 차단):\n" +
      errors.map((e) => `  - ${e}`).join("\n") +
      "\n\n→ node scripts/replace-reports-YYYYMMDD-content.js 또는 fix 스크립트 upsert 후 재검증",
  );
  process.exit(1);
}

console.log("✓ 리포트 topics ↔ fix-reports slug·애널 지문 검증 OK");
