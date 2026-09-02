#!/usr/bin/env node
// Replace seed-1445~1459 + analyst -976~-990 with correct 2026-09-02 screenshot content
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

const fix = require('./fix-reports-20260902-ko.js');

function replaceReportsBlock() {
  let c = read('lib/reports.ts');
  const start = c.indexOf('  { id: "seed-1445"');
  const end = c.indexOf('  { id: "seed-1430"');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('reports.ts: seed-1445 or seed-1430 marker not found');
  }
  const newBlock = fix.buildReportsBlock();
  c = c.slice(0, start) + newBlock + c.slice(end);
  write('lib/reports.ts', c);
  console.log('reports.ts: replaced seed-1445~1459');
}

function replaceAnalystPosts() {
  let a = read('lib/analystPosts.ts');
  const startMarker = '  // ── 2026-09-02 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────';
  const endMarker = '  // ── 2026-09-01 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────';
  const start = a.indexOf(startMarker);
  const end = a.indexOf(endMarker);
  if (start === -1 || end === -1) throw new Error('analystPosts.ts: 2026-09-02 markers not found');
  a = a.slice(0, start) + fix.buildAnalystBlock() + a.slice(end);
  write('lib/analystPosts.ts', a);
  console.log('analystPosts.ts: replaced -976~-990');
}

function replaceAnalystComments() {
  let a = read('lib/analystPosts.ts');
  const startMarker = '  // 2026-09-02';
  const endMarker = '  [-961]:';
  const start = a.indexOf(startMarker);
  const end = a.indexOf(endMarker);
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('analystPosts comments: 2026-09-02 block not found');
  }
  const block = startMarker + '\n' + fix.buildAnalystCommentsBlock();
  a = a.slice(0, start) + block + a.slice(end);
  write('lib/analystPosts.ts', a);
  console.log('analystPosts.ts: replaced comments -976~-990');
}

function main() {
  replaceReportsBlock();
  replaceAnalystPosts();
  replaceAnalystComments();
  console.log('done — run node scripts/gen-reports-20260902.js to refresh SVGs if needed');
}

if (require.main === module) main();

module.exports = { replaceReportsBlock, replaceAnalystPosts, replaceAnalystComments };
