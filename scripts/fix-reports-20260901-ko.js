#!/usr/bin/env node
// 2026-09-01 Sep 1 US reports (seed-1430~1444) + analystPosts -961~-975 Korean rewrite
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BODY_EN = 'See Korean body.\\n\\ninvestus.kr SRP Chief Investment Officer';
const BK = 'investus.kr SRP 최고투자책임자 발행';
const DATE = '2026.09.01';
const TAG = '20260901';
const UPDATED = '2026.09.01 08:00';

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
  let out = '  // ── 2026-09-01 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────\n';
  ANALYST.forEach((a, i) => {
    const min = String(i * 7).padStart(2, '0');
    out += `  {\n    id: ${a.id}, alias: "${a.alias}", symbol: "${a.symbol}",\n    content: "${esc(a.content)}",\n    likes: ${12 + (i % 5)}, comments: ${1 + (i % 2)}, created_at: "2026-09-01T00:${min}:00.000Z", liked: false,\n  },\n`;
  });
  return out;
}

const TICKERS = {
  'seed-1430': ['MACRO', 'TSLA', 'SPCX', 'NVDA', 'AI'],
  'seed-1431': ['SPCX'],
  'seed-1432': ['TSLA'],
  'seed-1433': ['SPCX'],
  'seed-1434': ['SPCX'],
  'seed-1435': ['TSLA'],
  'seed-1436': ['TSLA'],
  'seed-1437': ['TSLA'],
  'seed-1438': ['SPCX'],
  'seed-1439': ['NVDA'],
  'seed-1440': ['NVDA', 'AI'],
  'seed-1441': ['TSLA', 'SPCX', 'MACRO'],
  'seed-1442': ['AMZN', 'NVDA'],
  'seed-1443': ['MACRO'],
  'seed-1444': ['SPCX'],
};

function buildTickersBlock() {
  let out = '  // 2026-09-01\n';
  for (let i = 1430; i <= 1444; i++) {
    const id = `seed-${i}`;
    const t = TICKERS[id] || ['MACRO'];
    out += `  "${id}": [${t.map((x) => `'${x}'`).join(', ')}],\n`;
  }
  return out;
}

function main() {
  const reportsPath = 'lib/reports.ts';
  let c = read(reportsPath);
  const marker = '  // ── 2026-08-29 신규 ──────────────────────────────────────────────────────';
  const startIdx = c.indexOf('  { id: "seed-1430"');
  const endIdx = c.indexOf(marker);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error('reports.ts markers not found (seed-1430 or 2026-08-29)');
  }
  const newBlock = buildReportsBlock();
  c = c.slice(0, startIdx) + newBlock + c.slice(endIdx);
  write(reportsPath, c);
  console.log('reports.ts: replaced seed-1430~1444');

  const tickStart = c.indexOf('  // 2026-09-01');
  const tickEnd = c.indexOf('  // 2026-08-29', tickStart);
  if (tickStart === -1 || tickEnd === -1) {
    throw new Error('REPORT_TICKERS markers not found');
  }
  c = read(reportsPath);
  c = c.slice(0, tickStart) + buildTickersBlock() + c.slice(tickEnd);
  write(reportsPath, c);
  console.log('REPORT_TICKERS: updated seed-1430~1444');

  const analystPath = 'lib/analystPosts.ts';
  let a = read(analystPath);
  const aStart09 = '  // ── 2026-09-01 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────';
  if (a.indexOf(aStart09) !== -1) {
    console.log('analystPosts.ts: 2026-09-01 block already present, skip');
  } else {
    const aStart831 = '  // ── 2026-08-31 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────';
    const aEnd = '  // ── 2026-08-29 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────';
    const aStartIdx = a.indexOf(aStart831);
    const aEndIdx = a.indexOf(aEnd);
    if (aStartIdx === -1 || aEndIdx === -1) {
      throw new Error('analystPosts.ts markers not found');
    }
    a = a.slice(0, aStartIdx) + buildAnalystBlock() + a.slice(aEndIdx);
    write(analystPath, a);
    console.log('analystPosts.ts: replaced -946~-960 with -961~-975');
  }
  console.log('done');
}

const REPORTS = [
  {
    id: 'seed-1430', slug: 'summary', pinned: true, bodyOnly: true,
    category: '특집', color: 'mint', subject: '한장요약',
    title: '2026년 9월 1일 한장 요약입니다. 텍사스 로보택시 314대·위성 3세대·14번째 비행 9월 15일·테슬라 급등·완전자율주행 140억 마일·삼성 고대역폭메모리 70%·금 준비자산 논의를 모았습니다',
    summary: '9월 1일 미국 시장을 한 줄로 요약하면 「로보택시 확장·위성·발사·테슬라·메모리·전력·안전자산」이 같은 날 겹친 날입니다.\n\n첫째, 자율주행입니다. 텍사스 로보택시 등록 차량이 5일 만에 124대 늘어 누적 314대에 도달했습니다. 사이버캡 7대에서 45대로, 모델Y 269대로 구성됩니다. 8월 27일 하루만 79대가 늘었고, 9월 3일 오스틴 사이버캡 전용 행사가 이틀 앞입니다.\n\n둘째, 위성·발사입니다. 스타링크 3세대 위성은 위성당 용량이 약 10배 커지고, 미국 연방통신위원회 허가와 스타십 14번째 비행이 9월 15일 전후로 맞물릴 수 있습니다. 로얄 와겐보르크 건화물선 약 160척 해상 서비스 확대, NASA 로마 망원경 43억 달러 과학 임무, 슈퍼헤비 33기 엔진 정적점화도 같은 흐름입니다.\n\n셋째, 테슬라입니다. 주가는 4.4~5.51% 급등하며 시가총액 약 540억 달러가 늘었습니다. 옵티머스 1년 100만 대 생산 목표, 모델S·X 라인 해체, 기가 텍사스 사이버캡 24대 시험, 완전자율주행 누적 140억 마일(130억→140억은 약 24일)이 겹쳤습니다.\n\n넷째, 인공지능·메모리·클라우드입니다. 젠슨 황 최고경영자는 Vera Rubin 세대가 기가와트당 400억 달러 이상 매출을 낼 수 있다고 말했습니다. 삼성전자는 2031년까지 메모리 생산능력의 약 70%를 대형 인공지능 고객에 공급할 수 있다는 전망과 HBM3E 현물가 계약가 대비 약 5배가 거론됐습니다. AWS는 사우디에 53억 달러 이상 투자하고, 미국 데이터센터 5,375개가 세계 1위라는 집계와 「데이터가 지배한다」 정책 메시지가 겹쳤습니다.\n\n다섯째, 전력·안전자산입니다. 사우스헤이븐 11기 임시 터빈 가동 중단·1.2GW 청정대기법 이슈, 금 보유액이 달러를 넘는 준비자산 논의, 캐시 우드 관련 테슬라·스페이스X 보유 합산 약 10억 달러도 같은 날입니다.\n\n이번 주 확인할 세 줄은 (1) 9월 3일 사이버캡 행사 (2) 9월 15~16일 FOMC·금리 인상 확률 (3) 위성 3세대·14번째 비행 일정입니다.',
    titleEn: 'Daily snapshot September 1, 2026: robotaxi 314, V3/F14 Sept 15, TSLA +5%, FSD 14B mi, Samsung HBM 70%, gold vs USD reserves',
    summaryEn: 'Texas robotaxi fleet hit 314 (+124 in five days) ahead of Sept 3 Cybercab; Starlink V3/F14 may align around Sept 15; Tesla rallied ~5% with FSD 14B miles and Optimus targets; Samsung ~70% HBM capacity through 2031; gold vs USD reserve debate; AWS Saudi $5.3B+ and 5,375 US data centers.',
  },
];

REPORTS.push(...require('./fix-reports-20260901-ko-reports.js'));

const ANALYST = require('./fix-reports-20260901-ko-analyst.js');

if (require.main === module) {
  main();
}
