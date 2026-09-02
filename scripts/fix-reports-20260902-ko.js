#!/usr/bin/env node
// 2026-09-02 Sep 2 US reports (seed-1445~1459) + analystPosts -976~-990 — insert BEFORE 9/1 block
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BODY_EN = 'See Korean body.\\n\\ninvestus.kr SRP Chief Investment Officer';
const BK = 'investus.kr SRP 최고투자책임자 발행';
const DATE = '2026.09.02';
const TAG = '20260902';
const UPDATED = '2026.09.02 08:00';

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
  let out = '  // ── 2026-09-02 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────\n';
  ANALYST.forEach((a, i) => {
    const min = String(i * 7).padStart(2, '0');
    out += `  {\n    id: ${a.id}, alias: "${a.alias}", symbol: "${a.symbol}",\n    content: "${esc(a.content)}",\n    likes: ${12 + (i % 5)}, comments: ${1 + (i % 2)}, created_at: "2026-09-02T00:${min}:00.000Z", liked: false,\n  },\n`;
  });
  return out;
}

function buildAnalystCommentsBlock() {
  const ANALYST_COMMENTS = require('./fix-reports-20260902-ko-analyst-comments.js');
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
  'seed-1445': ['MACRO', 'TSLA', 'SPCX', 'NVDA', 'AI', 'GOOGL'],
  'seed-1446': ['TSLA'],
  'seed-1447': ['DELL'],
  'seed-1448': ['PANW'],
  'seed-1449': ['TSLA'],
  'seed-1450': ['SPCX'],
  'seed-1451': ['SPCX'],
  'seed-1452': ['TSLA'],
  'seed-1453': ['SPCX'],
  'seed-1454': ['AI', 'NVDA'],
  'seed-1455': ['GOOGL'],
  'seed-1456': ['GOOGL', 'TSLA'],
  'seed-1457': ['GOOGL', 'AMZN'],
  'seed-1458': ['MACRO'],
  'seed-1459': ['AAPL', 'AI'],
};

function buildTickersBlock() {
  let out = '  // 2026-09-02\n';
  for (let i = 1445; i <= 1459; i++) {
    const id = `seed-${i}`;
    const t = TICKERS[id] || ['MACRO'];
    out += `  "${id}": [${t.map((x) => `'${x}'`).join(', ')}],\n`;
  }
  return out;
}

function insertAnalystAndComments() {
  const analystPath = 'lib/analystPosts.ts';
  let a = read(analystPath);
  const aStart902 = '  // ── 2026-09-02 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────';
  if (a.indexOf(aStart902) === -1) {
    const aStart901 = '  // ── 2026-09-01 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────';
    const aStartIdx = a.indexOf(aStart901);
    if (aStartIdx === -1) throw new Error('analystPosts.ts: 2026-09-01 marker not found');
    a = a.slice(0, aStartIdx) + buildAnalystBlock() + a.slice(aStartIdx);
    write(analystPath, a);
    console.log('analystPosts.ts: inserted -976~-990');
  }

  a = read(analystPath);
  if (a.indexOf('  [-976]:') === -1) {
    const commMarker = '  // ── 2026-09-01 애널 댓글 ──';
    const commInsert = a.indexOf(commMarker);
    const block = '  // ── 2026-09-02 애널 댓글 ──────────────────────\n' + buildAnalystCommentsBlock() + '\n';
    if (commInsert === -1) {
      const alt = a.indexOf('  [-961]:');
      if (alt === -1) throw new Error('analystPosts comments marker not found');
      a = a.slice(0, alt) + block + a.slice(alt);
    } else {
      a = a.slice(0, commInsert) + block + a.slice(commInsert);
    }
    write(analystPath, a);
    console.log('analystPosts.ts: inserted comments for -976~-990');
  }
}

function main() {
  const reportsPath = 'lib/reports.ts';
  let c = read(reportsPath);
  const insertAt = c.indexOf('  { id: "seed-1430"');
  if (insertAt === -1) throw new Error('reports.ts: seed-1430 not found');
  const hadSeeds = c.indexOf('  { id: "seed-1445"') !== -1;
  if (hadSeeds) {
    const replace = require('./replace-reports-20260902-content.js');
    replace.replaceReportsBlock();
    replace.replaceAnalystPosts();
    replace.replaceAnalystComments();
    console.log('reports.ts: upserted seed-1445~1459 from fix-reports source');
  } else {
    const newBlock = buildReportsBlock();
    c = c.slice(0, insertAt) + newBlock + c.slice(insertAt);
    write(reportsPath, c);
    console.log('reports.ts: inserted seed-1445~1459 before seed-1430');
    insertAnalystAndComments();
  }

  c = read(reportsPath);
  const tickMarker = '  // 2026-09-01';
  const tickStart = c.indexOf('  // 2026-09-02');
  if (tickStart !== -1) {
    console.log('REPORT_TICKERS: 2026-09-02 already present');
  } else {
    const tickInsert = c.indexOf(tickMarker);
    if (tickInsert === -1) throw new Error('REPORT_TICKERS: 2026-09-01 marker not found');
    c = c.slice(0, tickInsert) + buildTickersBlock() + c.slice(tickInsert);
    write(reportsPath, c);
    console.log('REPORT_TICKERS: inserted seed-1445~1459');
  }
  console.log('done');
}

const REPORTS = [
  {
    id: 'seed-1445', slug: 'summary', pinned: true, bodyOnly: true,
    category: '특집', color: 'mint', subject: '한장요약',
    title: '2026년 9월 2일 한장 요약입니다. 기가텍사스 반도체 697만 SF·델·PANW 실적·사이버캡 45대·SpaceX 궤도연산·F14·Anthropic 350억 달러·Waymo 14개 도시를 모았습니다',
    summary: '9월 2일 미국 시장을 한 줄로 요약하면 「반도체·실적·로보택시 D-1·우주·AI 인프라·심리 둔화」가 겹친 날입니다.\n\n첫째, 테슬라·텍사스입니다. 기가 텍사스 북캠퍼스 반도체 연면적 약 6,974,854평방피트, 오스틴 팹 489,600·코텍스 2.0 46,400, 완공 목표 2029년 12월 31일이 공개됐습니다. 오스틴 사이버캡 45대, 골든 캡, 지오펜스 약 264제곱마일(+9%)이며 9월 3일 전용 행사가 하루 앞(D-1)입니다. 프랑스 8월 판매 전년 대비 +279%, 덴마크 +104% YoY도 거론됐습니다.\n\n둘째, 실적입니다. 델 주당순이익 7.04달러(예상 4.92달러), 매출 469억 달러(예상 445억 달러)를 상회했습니다. 팔로알토네트웍스는 주당순이익 1.02달러·매출 34.1억 달러로 예상을 넘겼습니다.\n\n셋째, 스페이스X·AI 인프라입니다. 2030년 궤도 연산 10GW·매출 3,000억~5,000억 달러(합산 1조 달러 서사), 데이터센터 팀 인사 변동, 스타십 F14 9월 15일 전후 첫 궤도·V3 10배·FCC 42.0~42.5GHz STA가 겹쳤습니다. 앤스로픽 350억 달러 람다 계약·텍사스 헛8·엔비디아 GPU, 구글 396MW 페르보 지열 유타도 같은 흐름입니다.\n\n넷째, 자율주행·플랫폼입니다. 웨이모 14개 도시 유료 승차(덴버·샌디에이고·탬파), 유튜브 아마존 제품 태깅이 부각됐습니다.\n\n다섯째, 매크로·법무입니다. 공포·탐욕 지수 44(1주 전 56), 애플의 OpenAI 증거 파기 주장이 겹쳤습니다.\n\n이번 주 확인할 세 줄은 (1) 9월 3일 사이버캡 행사 (2) 9월 15일 F14·FOMC (3) AI DC 전력·GPU 가동 일정입니다.',
    titleEn: 'Daily snapshot September 2, 2026: Giga Texas semi, DELL/PANW beats, Cybercab 45 D-1, SpaceX orbital compute, F14, Anthropic $35B, Waymo 14 cities',
    summaryEn: 'Giga Texas North Campus ~6.97M sq ft; Dell EPS $7.04 vs $4.92; PANW beat; Cybercab 45 geofence ~264 sq mi D-1; SpaceX $1T orbital compute narrative; F14 Sept 15; Anthropic $35B Lambda; Waymo 14 cities; Fear & Greed 44; Apple vs OpenAI.',
  },
];

REPORTS.push(...require('./fix-reports-20260902-ko-reports.js'));

const ANALYST = require('./fix-reports-20260902-ko-analyst.js');

if (require.main === module) {
  main();
}

module.exports = {
  buildReportsBlock,
  buildAnalystBlock,
  buildAnalystCommentsBlock,
};
