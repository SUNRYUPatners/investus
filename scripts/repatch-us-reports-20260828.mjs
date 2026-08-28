#!/usr/bin/env node
// 2026.08.28 — seed-1302~seed-1314 재작성 패치
// seed-1301(한장 요약)과 2026-08-27 블록은 손대지 않고, 미국장 13개 리포트만 교체합니다.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  TOPICS,
  buildSeedReport,
  writeSvgs,
  buildWallPosts,
  buildWallComments,
  buildAnalystPosts,
  buildAnalystComments,
} from './build-report-update-20260828.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const REPORTS = path.join(ROOT, 'lib', 'reports.ts');
const WALL = path.join(ROOT, 'lib', 'wallPosts.ts');
const ANALYST = path.join(ROOT, 'lib', 'analystPosts.ts');

const FIRST = '  { id: "seed-1302"';
const AFTER = '  // ── 2026-08-27 신규';

function replaceReportBlock(c) {
  const start = c.indexOf(FIRST);
  const end = c.indexOf(AFTER);
  if (start < 0) throw new Error('seed-1302 앵커를 찾지 못했습니다');
  if (end < 0) throw new Error('2026-08-27 블록 앵커를 찾지 못했습니다');
  if (end <= start) throw new Error('앵커 순서가 예상과 다릅니다');
  const block = TOPICS.map(buildSeedReport).join(',\n') + ',\n';
  return c.slice(0, start) + block + c.slice(end);
}

function replaceTickers(c) {
  const summary = Array.from(new Set(TOPICS.flatMap((t) => t.tickers)));
  const summaryRe = /("seed-1301":\s*)\[[^\]]*\]/;
  if (!summaryRe.test(c)) throw new Error('REPORT_TICKERS에 seed-1301 항목이 없습니다');
  c = c.replace(summaryRe, `$1[${summary.map((x) => `'${x}'`).join(', ')}]`);
  for (const t of TOPICS) {
    const re = new RegExp(`("${t.seed}":\\s*)\\[[^\\]]*\\]`);
    if (!re.test(c)) throw new Error(`REPORT_TICKERS에 ${t.seed} 항목이 없습니다`);
    c = c.replace(re, `$1[${t.tickers.map((x) => `'${x}'`).join(', ')}]`);
  }
  return c;
}

function assertNoDuplicates(c) {
  for (const seed of ['seed-1301', ...TOPICS.map((t) => t.seed)]) {
    const n = c.split(`{ id: "${seed}"`).length - 1;
    if (n !== 1) throw new Error(`${seed} 정의가 ${n}개입니다 (1개여야 합니다)`);
  }
  if (!c.includes('{ id: "seed-1201"')) throw new Error('2026-08-27 요약(seed-1201)이 사라졌습니다');
}

// 2026-08-28 구간(시작 앵커부터 바로 다음 날짜 구분선 앞까지)을 새 블록으로 교체합니다.
function replaceSection(c, from, block, label) {
  const start = c.indexOf(from);
  if (start < 0) throw new Error(`${label}: 시작 앵커를 찾지 못했습니다`);
  const end = c.indexOf('\n  // ── ', start + from.length);
  if (end < 0) throw new Error(`${label}: 다음 구분선을 찾지 못했습니다`);
  return c.slice(0, start) + block + c.slice(end + 1);
}

function replaceBetween(c, from, to, block, label) {
  const start = c.indexOf(from);
  if (start < 0) throw new Error(`${label}: 시작 앵커를 찾지 못했습니다`);
  const end = c.indexOf(to, start + from.length);
  if (end < 0) throw new Error(`${label}: 종료 앵커를 찾지 못했습니다`);
  return c.slice(0, start) + block + c.slice(end);
}

function patchWall() {
  let c = fs.readFileSync(WALL, 'utf8');
  c = replaceSection(c, '  // ── 2026-08-28 신규 ────────────────\n', buildWallPosts(), 'wall posts');
  c = replaceSection(c, '  // ── 2026-08-28 신규 댓글 ────────────────\n', buildWallComments(), 'wall comments');
  for (let id = 1117; id <= 1130; id += 1) {
    if ((c.split(`{ id: ${id},`).length - 1) !== 1) throw new Error(`wall post ${id} 정의 개수가 1이 아닙니다`);
  }
  fs.writeFileSync(WALL, c);
}

function patchAnalyst() {
  let c = fs.readFileSync(ANALYST, 'utf8');
  c = replaceSection(c, '  // ── 2026-08-28 신규 (14개 · 존댓말 · 구조 혼합) ──────────────────────\n', buildAnalystPosts(), 'analyst posts');
  c = replaceBetween(c, '  [-917]: [', '  [-903]:', buildAnalystComments(), 'analyst comments');
  for (let id = -930; id <= -917; id += 1) {
    if ((c.split(`id: ${id},`).length - 1) !== 1) throw new Error(`analyst post ${id} 정의 개수가 1이 아닙니다`);
  }
  fs.writeFileSync(ANALYST, c);
}

function main() {
  console.log('=== Investus 2026.08.28 미국장 리포트 재작성 (seed-1302~1314) ===');
  let c = fs.readFileSync(REPORTS, 'utf8');
  c = replaceReportBlock(c);
  c = replaceTickers(c);
  assertNoDuplicates(c);
  fs.writeFileSync(REPORTS, c);
  console.log('✅ lib/reports.ts: seed-1302~seed-1314 교체, REPORT_TICKERS 갱신');

  patchWall();
  console.log('✅ lib/wallPosts.ts: 1117~1130 게시글·댓글 교체');
  patchAnalyst();
  console.log('✅ lib/analystPosts.ts: -917~-930 게시글·댓글 교체');

  const n = writeSvgs();
  console.log(`✅ ${n} SVG written to public/charts/`);
  console.log('Done.');
}

main();
