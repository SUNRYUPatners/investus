#!/usr/bin/env node
// 2026-09-03 Sep 2 US reports (seed-1461~1475) + analystPosts -992~-1006 — insert BEFORE 9/1 block
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BODY_EN = 'See Korean body.\\n\\ninvestus.kr SRP Chief Investment Officer';
const BK = 'investus.kr SRP 최고투자책임자 발행';
const DATE = '2026.09.03';
const TAG = '20260903';
const UPDATED = '2026.09.03 08:00';

const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);
const esc = (s) => String(s)
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$/g, '\\$')
  .replace(/'/g, "\\'")
  .replace(/"/g, '\\"')
  .replace(/\n/g, '\\n')
  .replace(/\r/g, '');

function body(sections) {
  return sections.join('\n\n') + '\n\n' + BK;
}

function makeBody(detail, why, scenario, flow, longTerm, forward, invest) {
  return body([
    `■ 상세\n\n${detail}`,
    `■ 왜 이 뉴스가 중요한가\n\n${why}`,
    `■ 시나리오\n\n${scenario}`,
    `■ 오늘까지 흐름\n\n${flow}`,
    `■ 장기 투자 관점\n\n${longTerm}`,
    `■ 앞으로 볼 것\n\n${forward}`,
    `■ 투자시사점\n\n${invest}`,
  ]);
}

function reportObj(r) {
  const img = `/charts/${r.slug}-${TAG}.svg`;
  const imgEn = `/charts/${r.slug}-${TAG}-en.svg`;
  const pinned = r.pinned ? '\n    isPinned: true, imageOnly: true,' : '';
  const b = r.bodyOnly ? '""' : `\`${esc(makeBody(r.detail, r.why, r.scenario, r.flow, r.longTerm, r.forward, r.invest))}\``;
  return `  { id: "${r.id}", title: '${esc(r.title)}', summary: '${esc(r.summary)}',
    body: ${b},
    titleEn: '${esc(r.titleEn)}',
    summaryEn: '${esc(r.summaryEn)}',
    bodyEn: "${BODY_EN}",
    category: '${r.category}', categoryColor: '${r.color}', subject: '${esc(r.subject)}',
    date: "${DATE}", updatedAt: "${UPDATED}",
    images: ["${img}"],
    imagesEn: ["${imgEn}"],${pinned}
  }`;
}

function buildReportsBlock() {
  return REPORTS.map(reportObj).join(',\n') + ',\n';
}

function buildAnalystBlock() {
  let out = '  // ── 2026-09-03 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────\n';
  ANALYST.forEach((a, i) => {
    const min = String(i * 7).padStart(2, '0');
    out += `  {\n    id: ${a.id}, alias: "${a.alias}", symbol: "${a.symbol}",\n    content: "${esc(a.content)}",\n    likes: ${12 + (i % 5)}, comments: ${1 + (i % 2)}, created_at: "2026-09-03T00:${min}:00.000Z", liked: false,\n  },\n`;
  });
  return out;
}

function buildAnalystCommentsBlock() {
  const ANALYST_COMMENTS = require('./fix-reports-20260903-ko-analyst-comments.js');
  let out = '';
  for (const [id, comments] of Object.entries(ANALYST_COMMENTS)) {
    const lines = comments.map(
      (c) =>
        `    { alias: "${c.alias}", content: "${esc(c.content)}", created_at: "${c.created_at}" }`,
    );
    out += `  [${id}]: [\n${lines.join(',\n')},\n  ],\n`;
  }
  return out;
}

const TICKERS = {
  'seed-1461': ['MACRO', 'TSLA', 'SPCX', 'NVDA', 'GOOGL', 'AAPL'],
  'seed-1462': ['TSLA'],
  'seed-1463': ['TSLA'],
  'seed-1464': ['UBER'],
  'seed-1465': ['NVDA'],
  'seed-1466': ['GOOGL'],
  'seed-1467': ['SPCX'],
  'seed-1468': ['SPCX', 'NVDA'],
  'seed-1469': ['TSLA'],
  'seed-1470': ['TSLA'],
  'seed-1471': ['MACRO'],
  'seed-1472': ['MACRO'],
  'seed-1473': ['AAPL'],
  'seed-1474': ['TSLA'],
  'seed-1475': ['TSLA', 'UBER'],
};

function buildTickersBlock() {
  let out = '  // 2026-09-03\n';
  for (let i = 1461; i <= 1475; i++) {
    const id = `seed-${i}`;
    const t = TICKERS[id] || ['MACRO'];
    out += `  "${id}": [${t.map((x) => `'${x}'`).join(', ')}],\n`;
  }
  return out;
}

function insertAnalystAndComments() {
  const analystPath = 'lib/analystPosts.ts';
  let a = read(analystPath);
  const aStart902 = '  // ── 2026-09-03 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────';
  if (a.indexOf(aStart902) === -1) {
    const aStart902 = '  // ── 2026-09-02 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────';
    const aStartIdx = a.indexOf(aStart902);
    if (aStartIdx === -1) throw new Error('analystPosts.ts: 2026-09-02 marker not found');
    a = a.slice(0, aStartIdx) + buildAnalystBlock() + a.slice(aStartIdx);
    write(analystPath, a);
    console.log('analystPosts.ts: inserted -992~-1006');
  }

  a = read(analystPath);
  if (a.indexOf('  [-992]:') === -1) {
    const commMarker = '  // ── 2026-09-02 애널 댓글 ──────────────────────';
    const commInsert = a.indexOf(commMarker);
    const block = '  // ── 2026-09-03 애널 댓글 ──────────────────────\n' + buildAnalystCommentsBlock() + '\n';
    if (commInsert === -1) {
      const alt = a.indexOf('  [-961]:');
      if (alt === -1) throw new Error('analystPosts comments marker not found');
      a = a.slice(0, alt) + block + a.slice(alt);
    } else {
      a = a.slice(0, commInsert) + block + a.slice(commInsert);
    }
    write(analystPath, a);
    console.log('analystPosts.ts: inserted comments for -992~-1006');
  }
}

function main() {
  const reportsPath = 'lib/reports.ts';
  let c = read(reportsPath);
  const insertAt = c.indexOf('  { id: "seed-1445"');
  if (insertAt === -1) throw new Error('reports.ts: seed-1445 not found');
  const hadSeeds = c.indexOf('  { id: "seed-1461"') !== -1;
  if (hadSeeds) {
    const replace = require('./replace-reports-20260903-content.js');
    replace.replaceReportsBlock();
    replace.replaceAnalystPosts();
    replace.replaceAnalystComments();
    console.log('reports.ts: upserted seed-1461~1475 from fix-reports source');
  } else {
    const newBlock = buildReportsBlock();
    c = c.slice(0, insertAt) + newBlock + c.slice(insertAt);
    write(reportsPath, c);
    console.log('reports.ts: inserted seed-1461~1475 before seed-1445');
    insertAnalystAndComments();
  }

  c = read(reportsPath);
  const tickMarker = '  // 2026-09-02';
  const tickStart = c.indexOf('  // 2026-09-03');
  if (tickStart !== -1) {
    console.log('REPORT_TICKERS: 2026-09-03 already present');
  } else {
    const tickInsert = c.indexOf(tickMarker);
    if (tickInsert === -1) throw new Error('REPORT_TICKERS: 2026-09-02 marker not found');
    c = c.slice(0, tickInsert) + buildTickersBlock() + c.slice(tickInsert);
    write(reportsPath, c);
    console.log('REPORT_TICKERS: inserted seed-1461~1475');
  }
  console.log('done');
}

const REPORTS = [
  {
    id: 'seed-1461', slug: 'summary', pinned: true, bodyOnly: true,
    category: '특집', color: 'mint', subject: '한장요약',
    title: '2026년 9월 3일 한장 요약입니다. 사이버캡 행사·중국 86,166대·우버 10% 감원·NVDA 물리 AI·구글 TPU·F14·금리 4.80%·연금 112%를 모았습니다',
    summary: '9월 3일 미국 시장을 한 줄로 요약하면 「사이버캡 이벤트 데이·중국 판매·로bo 경쟁·AI·우주·금리」가 겹친 날입니다.\n\n첫째, 테슬라·로bo입니다. 9월 3일 오스틴 사이버캡 행사가 오후 5시 45분(미 동부)에 열리며, V15 무인 시승·플릿 대량 투입 기대가 최대입니다. 중국 8월 도매 86,166대(+3.57% YoY), 소매 27,249·수출 58,917, 기가 텍사스 사이버캡·칩 fab·옵티머스, FSD 프랑스 2대 시험·EU 승인 임박, 배터리 2850억 마일 자발적 화재 0건 블로그가 겹칩니다.\n\n둘째, 경쟁·ARK입니다. 우버 10% 감원·100억 달러+ 로bo 투자, ARK 사이버캡 TAM 30~60× vs 우버 탄력성 논쟁이 같은 날입니다.\n\n셋째, AI·칩·전력입니다. NVDA 물리 AI 10×·로봇 10년 1,000억 달러, 구글 TPU 2027년 840억·2028년 1,080억 달러 전망 상향, 스페이스X 15GW 전력 부족·1.2GW 발전·구글·앤스로픽 임대, F14 V3 20~60기 투입·HLS 목업입니다.\n\n넷째, 매크로·애플입니다. 10년물 4.80%·30년 ~5.30%, 연금 충당률 112%(2001년 이후 최고), 캐시 우드 애플 AI 디스ruption 경고입니다.\n\n이번 주 확인할 세 줄은 (1) 9/3 사이버캡 행사 결과 (2) 9/4 고용·9/15 F14·FOMC (3) powered GW·GPU·전력 일정입니다.',
    titleEn: 'Daily snapshot September 3, 2026: Cybercab event, China 86,166, Uber layoffs, NVDA physical AI, Google TPU, F14, 10yr 4.80%, pension 112%',
    summaryEn: 'Cybercab Sept 3 5:45 PM ET; China wholesale +3.57%; Uber 10% cuts; NVDA physical AI 10×; Google TPU $84B/$108B; Starship F14 V3; 10yr 4.80%; pension 112%; TSLA battery blog; ARK Cybercab TAM.',
  },
];

REPORTS.push(...require('./fix-reports-20260903-ko-reports.js'));

const ANALYST = require('./fix-reports-20260903-ko-analyst.js');

if (require.main === module) {
  main();
}

module.exports = {
  buildReportsBlock,
  buildAnalystBlock,
  buildAnalystCommentsBlock,
};
