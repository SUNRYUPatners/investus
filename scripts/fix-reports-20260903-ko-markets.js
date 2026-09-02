#!/usr/bin/env node
/** 2026-09-03 KR / Safe / KR-RE reports — English skeleton → full Korean */
const fs = require('fs');
const path = require('path');

const DATA = require('./topics-20260903-kr-markets-data.js');

const ROOT = path.join(__dirname, '..');
const DATE = '2026-09-03';
const UPDATED = '2026.09.03 08:00';
const BODY_EN = 'See Korean body.\\n\\ninvestus.kr SRP Chief Investment Officer';
const SUMMARY_EN = 'See Korean summary.';
const BK = 'investus.kr SRP 최고투자책임자 발행';

const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

function esc(s) {
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

function wrapSummaryBody(text) {
  return `■ 오늘의 큰 그림\n\n${text.summaryBody}\n\n■ 앞으로 볼 것\n\n${text.forward}\n\n■ 투자시사점\n\n${text.invest}\n\n${BK}`;
}

function wrapDetailBody(r) {
  return [
    `■ 상세\n\n${r.detail}`,
    `■ 왜 이 뉴스가 중요한가\n\n${r.why}`,
    `■ 시나리오\n\n${r.scenario}`,
    `■ 오늘까지 흐름\n\n${r.flow}`,
    `■ 장기 투자 관점\n\n${r.longTerm}`,
    `■ 앞으로 볼 것\n\n${r.forward}`,
    `■ 투자시사점\n\n${r.invest}`,
    BK,
  ].join('\n\n');
}

function reportBlock(r, useBodyHelper) {
  const img = `/charts/${r.slug}-20260903.svg`;
  const imgEn = `/charts/${r.slug}-20260903-en.svg`;
  const rawBody = r.type === 'summary' ? wrapSummaryBody(r) : wrapDetailBody(r);
  const bodyField = useBodyHelper
    ? `body: body(\`${esc(rawBody)}\`)`
    : `body: \`${esc(rawBody)}\``;
  const pinned = r.isPinned ? '\n    isPinned: true,' : '';
  const titleEn = r.titleEn || r.title;
  const summaryEn = r.summaryEn || SUMMARY_EN;
  return `  {
    id: "${r.id}",
    title: "${esc(r.title)}",
    summary: "${esc(r.summary)}",
    ${bodyField},
    titleEn: "${esc(titleEn)}",
    summaryEn: "${esc(summaryEn)}",
    bodyEn: "${BODY_EN}",
    category: "${r.category}",
    categoryColor: "${r.color}",
    subject: "${esc(r.subject)}",
    date: "${DATE}",
    updatedAt: "${UPDATED}",${pinned}
    images: ["${img}"],
    imagesEn: ["${imgEn}"],
  }`;
}

function insertBefore(filePath, beforeId, reports, useBodyHelper) {
  let c = read(filePath);
  const beforeIdx = c.indexOf(`id: "${beforeId}"`);
  if (beforeIdx === -1) throw new Error(`${filePath}: beforeId ${beforeId} not found`);
  const blockStart = c.lastIndexOf('  {', beforeIdx);
  const block = reports.map((r) => reportBlock(r, useBodyHelper)).join(',\n') + ',\n';
  if (c.indexOf(`id: "${reports[0].id}"`) !== -1) {
    console.log(`${filePath}: ${reports[0].id} already present — skip`);
    return;
  }
  c = c.slice(0, blockStart) + block + c.slice(blockStart);
  write(filePath, c);
  console.log(`${filePath}: inserted ${reports[0].id}~${reports[reports.length - 1].id} before ${beforeId}`);
}

function main() {
  insertBefore('lib/reports-kr.ts', 'kr-seed-132', DATA.KR, true);
  insertBefore('lib/reports-safe.ts', 'safe-seed-115', DATA.SAFE, false);
  insertBefore('lib/reports-kr-re.ts', 'krre-seed-114', DATA.KRRE, false);
  console.log('done');
}

main();
