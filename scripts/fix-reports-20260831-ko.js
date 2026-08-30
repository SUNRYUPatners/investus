#!/usr/bin/env node
// 2026-08-31 Aug 31 US reports (seed-1417~1429) + analystPosts -946~-960 Korean rewrite
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BODY_EN = 'See Korean body.\\n\\ninvestus.kr SRP Chief Investment Officer';
const BK = 'investus.kr SRP 최고투자책임자 발행';
const DATE = '2026.08.31';
const UPDATED = '2026.08.31 08:00';

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
  const img = `/charts/${r.slug}-20260831.svg`;
  const imgEn = `/charts/${r.slug}-20260831-en.svg`;
  const b = `\`${esc(makeBody(r.detail, r.why, r.scenario, r.flow, r.longTerm, r.forward, r.invest))}\``;
  return `  { id: "${r.id}", title: '${esc(r.title)}', summary: '${esc(r.summary)}',
    body: ${b},
    titleEn: '${esc(r.titleEn)}',
    summaryEn: '${esc(r.summaryEn)}',
    bodyEn: "${BODY_EN}",
    category: '${r.category}', categoryColor: '${r.color}', subject: '${esc(r.subject)}',
    date: "${DATE}", updatedAt: "${UPDATED}",
    images: ["${img}"],
    imagesEn: ["${imgEn}"],
  }`;
}

function buildReportsBlock() {
  return REPORTS.map(reportObj).join(',\n') + ',\n';
}

function buildAnalystBlock() {
  let out = '  // ── 2026-08-31 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────\n';
  ANALYST.forEach((a, i) => {
    const min = String(i * 7).padStart(2, '0');
    out += `  {\n    id: ${a.id}, alias: "${a.alias}", symbol: "${a.symbol}",\n    content: "${esc(a.content)}",\n    likes: ${12 + (i % 5)}, comments: ${1 + (i % 2)}, created_at: "2026-08-31T00:${min}:00.000Z", liked: false,\n  },\n`;
  });
  return out;
}

function main() {
  const reportsPath = 'lib/reports.ts';
  let c = read(reportsPath);
  const marker = '  // ── 2026-08-29 신규 ──────────────────────────────────────────────────────';
  const startIdx = c.indexOf('  { id: "seed-1417"');
  const endIdx = c.indexOf(marker);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error('reports.ts markers not found (seed-1417 or 2026-08-29)');
  }
  const beforeLines = c.slice(0, startIdx).split('\n').length;
  const newBlock = buildReportsBlock();
  c = c.slice(0, startIdx) + newBlock + c.slice(endIdx);
  write(reportsPath, c);
  const afterLines = c.split('\n').length;
  console.log(`reports.ts: replaced seed-1417~1429 (${beforeLines} → ${afterLines} lines, delta ${afterLines - beforeLines})`);

  const analystPath = 'lib/analystPosts.ts';
  let a = read(analystPath);
  const aStart = '  // ── 2026-08-31 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────';
  const aEnd = '  // ── 2026-08-29 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────';
  const aStartIdx = a.indexOf(aStart);
  const aEndIdx = a.indexOf(aEnd);
  if (aStartIdx === -1 || aEndIdx === -1) {
    throw new Error('analystPosts.ts markers not found');
  }
  a = a.slice(0, aStartIdx) + buildAnalystBlock() + a.slice(aEndIdx);
  write(analystPath, a);
  console.log('analystPosts.ts: replaced -946~-960 with Korean content');
  console.log('done');
}

// ── Report content (seed-1417 ~ seed-1429) ───────────────────────────────────

const REPORTS = [
  {
    id: 'seed-1417', slug: 'agent-memory-goldman',
    category: '섹터', color: 'purple', subject: '인공지능',
    title: '인공지능 에이전트 확산 시 메모리 수요가 2030년까지 약 24배 늘 수 있고 고대역폭 메모리는 2026~27년 품귀가 이어질 수 있다는 전망이 나왔습니다',
    summary: '인공지능 에이전트는 질문에 한 번 답하는 챗봇과 달리 검색·계산·외부 연동을 연속 수행하므로 메모리 사용량이 크게 늘어납니다. 장기 전망에서는 2030년까지 에이전트 관련 메모리 수요가 약 24배 늘 수 있다는 추정이 제시됐고, 고대역폭 메모리는 2026~27년까지 공급이 빠듯할 수 있습니다. 에이전트 한 번 실행에 쓰이는 텍스트 조각(토큰)은 기존 챗봇 대비 5~30배까지 늘 수 있다는 점도 함께 거론됐습니다.',
    titleEn: 'Agent-driven AI could lift memory demand roughly 24-fold by 2030, with high-bandwidth memory tight through 2026-27',
    summaryEn: 'AI agents that chain search, calculation, and external calls use far more memory than one-shot chatbots. Long-range estimates point to about 24 times more agent-related memory demand by 2030, tight high-bandwidth memory supply through 2026-27, and five to thirty times more tokens per agent run versus chat.',
    detail: '인공지능 에이전트는 사용자 질문에 한 번 답하고 끝나는 챗봇과 다릅니다. 검색·계산·코딩·외부 프로그램 연동을 연속으로 수행하는 프로그램에 가깝습니다. 그래서 같은 사용자 수라도 그래픽 처리 장치뿐 아니라 메모리에 오가는 데이터량이 크게 늘어납니다.\n\n장기 전망에서는 2030년까지 에이전트 관련 메모리 수요가 약 24배 늘 수 있다는 추정이 나왔습니다. 고대역폭 메모리는 인공지능 가속기 옆에 붙어 데이터를 빠르게 주고받는 칩으로, 2026~27년까지 품귀가 이어질 수 있다는 전망도 함께 제시됐습니다. 에이전트 한 번 실행에 쓰이는 토큰(텍스트 조각)은 5~30배까지 늘 수 있다는 점이 핵심입니다. 토큰이 많아지면 추론(이미 학습된 모델로 답을 만드는 과정) 단계에서 메모리 대역폭이 병목이 되기 쉽습니다.',
    why: '1. 인공지능 투자 논의가 「그래픽 처리 장치 몇 장」에서 「메모리 몇 기가바이트」로 옮겨가고 있습니다. 수요를 칩 단위가 아니라 데이터 이동량 단위로 읽어야 합니다.\n\n2. 고대역폭 메모리 품귀는 메모리 업체의 가격과 제품 구성에 직접 연결됩니다. 범용 동적랜덤액세스메모리와 달리 고객 맞춤형 물량이 많아 가격 협상력이 다릅니다.\n\n3. 에이전트 상용화가 늘면 추론 수요가 학습 수요와 분리됩니다. 추론은 24시간 돌아가므로 메모리 대역폭이 병목이 되기 쉽습니다.\n\n4. 24배 전망은 가정에 민감합니다. 그러나 방향성은 분명합니다. 인공지능 작업이 길어질수록 메모리 한계가 커집니다.\n\n5. 국내 SK하이닉스·삼성전자 실적에도 같은 논리가 적용됩니다. 고대역폭 메모리 비중이 올라가는 분기부터 실적 가시성이 달라집니다.',
    scenario: '**A: 에이전트 출시가 예상보다 빠르면 2026~27년 고대역폭 메모리 품귀가 더 길어질 수 있습니다.**\n**B: 모델 효율 개선으로 토큰 사용이 줄면 24배 전망은 하향 조정될 수 있습니다.**\n**C: 클라우드 업체가 자체 메모리 설계를 쓰면 공급자 구성이 바뀔 수 있습니다.**',
    flow: '이번 주 국내외에서 에이전트·고대역폭 메모리 테마가 SK하이닉스 주가와 엇갈리며 부각됐습니다. 장기 수요 전망은 강하지만 단기에는 외국인 매도와 지수 조정이 먼저 반영됐습니다.',
    longTerm: '메모리 산업은 2016~18년 범용 동적랜덤액세스메모리 호황 뒤 2019~20년 급락을 겪었습니다. 이번 사이클은 인공지능·고대역폭 메모리·고객 맞춤형 비중이 커져 과거와 다른 구조입니다. 2030년까지 공급 부족 전망이 맞다면, 단기 주가 조정은 장기 공급자에게 유리한 진입 구간으로 기록될 수 있습니다. 다만 설비 투자 과잉이 다시 나오면 2028년 이후 전망은 바뀔 수 있습니다.',
    forward: '(1) 분기 고대역폭 메모리 출하량과 평균 판매 가격을 확인하시면 됩니다.\n\n(2) 주요 클라우드 업체의 에이전트 상용 일정을 보시기 바랍니다.\n\n(3) 대형 인공지능 기업의 추론 설비투자 계획을 추적하시면 됩니다.\n\n(4) SK하이닉스·마이크론·삼성의 고대역폭 메모리 로드맵을 살펴보시기 바랍니다.\n\n(5) 2026~27년 공급 격차 추정치 변화를 확인하시면 됩니다.',
    invest: '에이전트 메모리는 「테마」가 아니라 「용량 계획」 문제입니다. 투자 시에는 그래픽 처리 장치 발표 수치와 고대역폭 메모리 장착 비율을 같은 표에 두시기 바랍니다.\n\n장기 투자자라면 2026~27년 품귀가 실적 구성으로 전환되는 분기를 기준점으로 삼으시면 됩니다. 단기 수급과 장기 수요 전망을 분리해 기록해 두는 편이 혼선을 줄입니다.\n\n국내 메모리 업체는 범용 가격과 고대역폭 메모리 믹스를 함께 봐야 합니다. 에이전트 확산이 느리면 전망은 하향 조정될 수 있으므로, 분기 실적에서 고대역폭 메모리 매출 비중 변화를 우선 확인하시기 바랍니다.',
  },
];

REPORTS.push(...require('./fix-reports-20260831-ko-reports.js'));

const ANALYST = require('./fix-reports-20260831-ko-analyst.js');

main();
