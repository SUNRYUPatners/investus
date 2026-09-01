#!/usr/bin/env node
/**
 * lib/reports*.ts에 등록된 chart SVG 경로가 public/charts에 실제 존재하는지 검증.
 * 2026-09-01 사고: kr/safe/kr-re 시드만 추가되고 SVG 30개 미생성 → 배포 통과.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const VALIDATE_SINCE = "2026-08-29";

const REPORT_FILES = [
  "lib/reports.ts",
  "lib/reports-kr.ts",
  "lib/reports-safe.ts",
  "lib/reports-kr-re.ts",
];

function load(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
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

function extractQuotedList(chunk, key) {
  const re = new RegExp(key + ":\\s*\\[([^\\]]*)\\]", "s");
  const m = chunk.match(re);
  if (!m) return [];
  const out = [];
  const pathRe = /["'](\/charts\/[^"']+\.svg)["']/g;
  let pm;
  while ((pm = pathRe.exec(m[1]))) out.push(pm[1]);
  return out;
}

function extractDate(chunk) {
  const m = chunk.match(/date:\s*["'](\d{4}-\d{2}-\d{2})["']/);
  return m ? m[1] : "";
}

function toEnPath(koPath) {
  return koPath.replace(/\.svg$/, "-en.svg");
}

function chartExists(chartPath) {
  // reports images: "/charts/foo.svg" → public/charts/foo.svg
  const name = chartPath.replace(/^\/charts\//, "").replace(/^\/+/, "");
  return fs.existsSync(path.join(ROOT, "public", "charts", name));
}

const errors = [];

for (const file of REPORT_FILES) {
  const src = load(file);
  for (const { id, chunk } of parseReportChunks(src)) {
    const date = extractDate(chunk);
    if (!date || date < VALIDATE_SINCE) continue;

    const images = extractQuotedList(chunk, "images");
    const imagesEn = extractQuotedList(chunk, "imagesEn");

    if (images.length === 0) {
      errors.push(`${file} ${id} (${date}): images 배열 없음`);
      continue;
    }

    for (const p of images) {
      if (!chartExists(p)) {
        errors.push(`${file} ${id} (${date}): SVG 파일 없음 → ${p}`);
      }
    }

    if (imagesEn.length > 0) {
      if (imagesEn.length !== images.length) {
        errors.push(
          `${file} ${id} (${date}): images(${images.length}) ≠ imagesEn(${imagesEn.length})`,
        );
      }
      for (const p of imagesEn) {
        if (!chartExists(p)) {
          errors.push(`${file} ${id} (${date}): EN SVG 없음 → ${p}`);
        }
      }
    } else {
      for (const ko of images) {
        const en = toEnPath(ko);
        if (!chartExists(en)) {
          errors.push(`${file} ${id} (${date}): imagesEn 누락·EN SVG 없음 → ${en}`);
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error(
    "✗ 리포트 chart SVG 누락 (배포 차단):\n" +
      errors.map((e) => `  - ${e}`).join("\n") +
      "\n\n→ US: node scripts/gen-reports-YYYYMMDD.js\n" +
      "→ kr/safe/kr-re: node scripts/gen-markets-svg-YYYYMMDD.js (또는 동일 TAG 생성기)",
  );
  process.exit(1);
}

console.log("✓ 리포트 images ↔ public/charts SVG 존재 검증 OK");
