#!/usr/bin/env node
/** Patch lib + SVG for 2026-09-03 validator failures */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

function patchSummaries() {
  const patches = [
    ['lib/reports-kr.ts', 'kr-seed-140', 'summary: "SK하이닉스 -4.73%, 1,613,000원. 삼성 -4.02%보다 큰 하락. 외국인·기관 매도·유가·금리 변수가 HBM 대형주에 전달됐습니다."', 'summary: "SK하이닉스 -4.73%, 1,613,000원. 삼성 -4.02%보다 큰 하락. 외국인·기관 매도·WTI $91+·10년물 4.80%·중동 유가 충격이 HBM 대형주에 전달됐습니다."'],
    ['lib/reports-kr.ts', 'kr-seed-141', 'summary: "LG에너지솔루션 -5.31%. 유가 $91+·금리 4.8%·성장주 약세 속 2차전지가 지수보다 더 크게 하락했습니다."', 'summary: "LG에너지솔루션 -5.31%. WTI $91+·10년물 4.80%·성장주 약세 속 2차전지가 코스피 -3.99%보다 더 크게 하락했습니다."'],
    ['lib/reports-kr.ts', 'kr-seed-142', 'summary: "현대차 -5.62%. WTI $91+는 원가·인플레 우려, 10년물 4.8%는 할인율 압력. 기아 -5%+와 함께 완성차가 지수 하락을 주도했습니다."', 'summary: "현대차 -5.62%. WTI $91+는 원가·인플레 우려, 10년물 4.80%는 할인율 압력. 기아 -5% 이상과 함께 완성차 업종이 코스피 -3.99% 급락을 주도했습니다."'],
    ['lib/reports-safe.ts', 'safe-seed-122', 'summary: "BTC 약 105,000~107,000달러(직전 ~108,248 대비 조정). 코스피 -3.99%·WTI $91+·10년 4.8%·ETF 유입·청산이 변수."', 'summary: "비트코인 약 105,000~107,000달러(직전 약 108,248달러 대비 조정). 코스피 -3.99%·WTI $91+·10년물 4.80%·ETF 유입·청산이 변수입니다."'],
    ['lib/reports-safe.ts', 'safe-seed-123', 'summary: "금 ~3,550~3,650달러. WTI $91+·중동 리스크·10년물 4.8%·실질금리·DXY가 방향을 좌우합니다."', 'summary: "금 약 3,550~3,650달러/온스. WTI $91+·중동 지정학·10년물 4.80%·실질금리·달러인덱스가 방향을 좌우합니다."'],
    ['lib/reports-safe.ts', 'safe-seed-124', 'summary: "WTI ~$91+. 중동 지정학·공급 우려·인플레·금리 재상승·완성차·항공·물류 원가 변수. 코스피 -3.99%와 같은 날 겹침."', 'summary: "WTI 원유 배럴당 $91+ . 중동 지정학·공급 우려·인플레·금리 재상승·완성차·항공·물류 원가 변수. 코스피 -3.99% 급락과 같은 날 겹칩니다."'],
    ['lib/reports-safe.ts', 'safe-seed-125', 'summary: "DXY(달러인덱스)는 WTI $91+·10년물 4.8%·리스크오ff와 연동. 원·달러·금·BTC 방향을 함께 추적하시기 바랍니다."', 'summary: "달러인덱스는 WTI $91+·10년물 4.80%·리스크오프와 연동됩니다. 원·달러·금·비트코인 방향을 함께 추적하시기 바랍니다."'],
    ['lib/reports-safe.ts', 'safe-seed-126', 'summary: "은은 금 ~3550-3650·WTI $91+·DXY와 연동. 금은비(Au/Ag)로 상대 평가. 변동성은 금보다 클 수 있습니다."', 'summary: "은은 금 3,550~3,650달러·WTI $91+·달러인덱스와 연동됩니다. 금은비로 상대 평가하며 변동성은 금보다 클 수 있습니다."'],
    ['lib/reports-kr-re.ts', 'krre-seed-120', 'summary: "WTI $91+·10년물 4.80%·코스피 -3.99%가 주담대·전세 심리에 영향. 공급 확대·전세대출 규제·LTV·DSR 유지. 9/4 고용·9/15 FOMC 변수."', 'summary: "WTI $91+·10년물 4.80%·코스피 -3.99%가 주담대·전세 심리에 영향을 줍니다. 공급 확대·전세대출 규제·LTV·DSR 유지. 9/4 고용·9/15 FOMC가 변수입니다."'],
    ['lib/reports-kr-re.ts', 'krre-seed-121', 'summary: "10년물 4.8%·WTI $91+·코스피 -3.99%가 전세대출·실수요 심리에 영향. 전세대출 규제·9월 입주 물량 변수."', 'summary: "10년물 4.80%·WTI $91+·코스피 -3.99%가 전세대출·실수요 심리에 영향을 줍니다. 전세대출 규제·9월 입주 물량·FOMC 9/15가 변수입니다."'],
    ['lib/reports-kr-re.ts', 'krre-seed-122', 'summary: "WTI $91+·10년 4.8%·코스피 -3.99%가 주담대·실수요 심리에 압력. 세제·공급 정책과 FOMC가 변수."', 'summary: "WTI $91+·10년물 4.80%·코스피 -3.99%가 주담대·실수요 심리에 압력을 줍니다. 세제·공급 정책과 FOMC 9/15가 변수입니다."'],
    ['lib/reports-kr-re.ts', 'krre-seed-123', 'summary: "공급 확대 수사·LTV·DSR·전세대출 규제 유지. WTI $91+·10년 4.8%·FOMC가 주담대 심리에 영향."', 'summary: "공급 확대 수사·LTV·DSR·전세대출 규제 유지. WTI $91+·10년물 4.80%·FOMC 9/15가 주담대·전세대출 심리에 영향을 줍니다."'],
  ];
  for (const [file, id, from, to] of patches) {
    let c = read(file);
    if (!c.includes(from)) {
      console.log(`skip ${file} ${id} (already patched or text changed)`);
      continue;
    }
    c = c.replace(from, to);
    write(file, c);
    console.log(`patched ${file} ${id} summary`);
  }
  // safe-seed-121 title
  let s = read('lib/reports-safe.ts');
  const oldTitle = 'title: "2026년 9월 3일 안전자산 한장 요약입니다. WTI $91+·10년물 4.8%·금 ~3,550-3,650·BTC ~105,000-107,000·코스피 급락을 모았습니다"';
  const newTitle = 'title: "2026년 9월 3일 안전자산 한장 요약입니다. WTI $91+·10년물 4.8%·금 3,550~3,650달러·비트코인 10.5~10.7만 달러·코스피 급락을 모았습니다"';
  if (s.includes(oldTitle)) {
    s = s.replace(oldTitle, newTitle);
    write('lib/reports-safe.ts', s);
    console.log('patched safe-seed-121 title');
  }
  // krre flow English
  let r = read('lib/reports-kr-re.ts');
  r = r.replace(/flow: "Oil\/rates shock · KOSPI -3\.99% · jeonse watch\."/g, 'flow: "유가·금리 충격·코스피 -3.99%·전세 관망."');
  r = r.replace(/flow: "Macro shock · sales cautious\."/g, 'flow: "매크로 충격·매매 관망."');
  r = r.replace(/flow: "Policy steady · macro shock overlay\."/g, 'flow: "정책 유지·매크로 충격 겹침."');
  r = r.replace(/wealth effect/g, '자산 효과');
  r = r.replace(/risk-off/g, '리스크오프');
  r = r.replace(/shock/g, '충격');
  write('lib/reports-kr-re.ts', r);
  console.log('patched kr-re English in body/flow');
}

function patchAnalystComments() {
  const comments = {
    [-992]: [{ alias: '종로 까치 #41', content: '9/3 한장에 사이버캡·중국·우버·금리까지 한눈에 보기 좋습니다', created_at: '2026-09-03T00:10:00.000Z' }],
    [-993]: [
      { alias: '광화문 여우 #62', content: '5:45 PM ET 행사 후 무인 영상 나오면 바로 확인할게요', created_at: '2026-09-03T00:13:00.000Z' },
      { alias: '역삼 판다 #77', content: '플릿 flooding이 말인지 등록 대수인지 구분해서 봐야겠네요', created_at: '2026-09-03T00:14:00.000Z' },
    ],
    [-994]: [{ alias: '여의도 수리 #28', content: '수출 58,917대가 크네요. 내수 27,249와 분리 추적하겠습니다', created_at: '2026-09-03T00:16:00.000Z' }],
    [-995]: [
      { alias: '송파 독수리 #66', content: '10% 감원과 로bo 100억$+ 투자가 같은 날이면 비용 구조 재편 신호 같아요', created_at: '2026-09-03T00:19:00.000Z' },
      { alias: '해운대 고래 #03', content: '사이버캡 행사랑 겹친 타이밍이 포인트네요', created_at: '2026-09-03T00:20:00.000Z' },
    ],
    [-996]: [{ alias: '분당 매 #31', content: '물리 AI 10배는 로bo·공장·자율주행 전부 해당이겠네요', created_at: '2026-09-03T00:22:00.000Z' }],
    [-997]: [
      { alias: '성수 너구리 #15', content: 'TPU 840억·1,080억$ 전망 상향 폭이 꽤 크네요', created_at: '2026-09-03T00:25:00.000Z' },
      { alias: '한남 재규어 #27', content: 'GPU vs TPU capex 같이 추적하겠습니다', created_at: '2026-09-03T00:26:00.000Z' },
    ],
    [-998]: [{ alias: '역삼 판다 #77', content: 'V3 20~60기 operational이 핵심 숫자죠', created_at: '2026-09-03T00:28:00.000Z' }],
    [-999]: [
      { alias: '한남 재규어 #27', content: '15GW gap이면 전력 capex가 칩만큼 중요하겠네요', created_at: '2026-09-03T00:31:00.000Z' },
      { alias: '삼성동 올빼미 #19', content: '1.2GW 발전소 일정도 같이 봐야겠어요', created_at: '2026-09-03T00:32:00.000Z' },
    ],
    [-1000]: [{ alias: '삼성동 올빼미 #19', content: '칩 fab 기초 공사랑 사이버캡 생산이 같은 캠퍼스네요', created_at: '2026-09-03T00:34:00.000Z' }],
    [-1001]: [
      { alias: '해운대 고래 #03', content: 'EU 승인 수주 내는지 행사 후 확인할게요', created_at: '2026-09-03T00:37:00.000Z' },
      { alias: '마포 살쾡이 #08', content: '프랑스 2대 시험이 무인인지 감독인지가 관건', created_at: '2026-09-03T00:38:00.000Z' },
    ],
    [-1002]: [{ alias: '마포 살쾡이 #08', content: '4.80%면 성장주 할인율 부담 커지는 구간이죠', created_at: '2026-09-03T00:40:00.000Z' }],
    [-1003]: [
      { alias: '판교 늑대 #90', content: '112% 충당률이면 de-risking flow 변수 맞네요', created_at: '2026-09-03T00:43:00.000Z' },
      { alias: '인천 갈매기 #52', content: '2001년 이후 최고라는 게 인상적이에요', created_at: '2026-09-03T00:44:00.000Z' },
    ],
    [-1004]: [{ alias: '인천 갈매기 #52', content: '고점에서 disruption 경고는 심리적으로 무겁네요', created_at: '2026-09-03T00:46:00.000Z' }],
    [-1005]: [
      { alias: '압구정 치타 #44', content: '2,850억 mi 0건은 로bo fleet 안전 논거로 쓰이겠네요', created_at: '2026-09-03T00:49:00.000Z' },
      { alias: '종로 까치 #41', content: '4680·8년 70% 보증도 fleet 운영에 중요하죠', created_at: '2026-09-03T00:50:00.000Z' },
    ],
    [-1006]: [{ alias: '종로 까치 #41', content: '30~60× TAM은 오늘 행사 숫자로 검증해야겠네요', created_at: '2026-09-03T00:52:00.000Z' }],
  };
  let c = read('lib/analystPosts.ts');
  const start = c.indexOf('  // ── 2026-09-03 애널 댓글 ──────────────────────');
  const end = c.indexOf('  [-961]:');
  if (start === -1 || end === -1) throw new Error('analystPosts 9/3 comment block not found');
  let block = '  // ── 2026-09-03 애널 댓글 ──────────────────────\n';
  for (const [id, arr] of Object.entries(comments)) {
    const lines = arr.map((x) => `    { alias: "${x.alias}", content: "${x.content}", created_at: "${x.created_at}" }`);
    block += `  [${id}]: [\n${lines.join(',\n')},\n  ],\n`;
  }
  block += '\n';
  c = c.slice(0, start) + block + c.slice(end);
  write('lib/analystPosts.ts', c);
  console.log('patched analystPosts -992~-1006 comments');
}

function patchAnalystMarketsComments() {
  const aliasFix = {
    '수급파트': '여의도 너구리 #12',
    '유가체크': '마포 살쾡이 #09',
    '메모리사이클': '판교 치타 #33',
    '수출통계러': '성수 수달 #21',
    'HBM러버': '삼성동 여우 #18',
    '이익률체크': '잠실 백로 #07',
    '배터리존버': '성수 수달 #35',
    '가동률체크': '한남 두루미 #14',
    '자동차매니아': '해운대 고래 #03',
    '미국판매러': '송파 독수리 #66',
    '환율데스크': '종로 까치 #41',
    '헷지': '분당 매 #31',
    '실질금리': '압구정 치타 #44',
    'ETF추적': '역삼 판다 #77',
    '달러보기': '인천 갈매기 #52',
    '유가러': '마포 살쾡이 #08',
    '매크로': '판교 늑대 #90',
    'EM체크': '해운대 고래 #03',
    '실물러': '압구정 치타 #44',
    '비율체크': '종로 까치 #41',
    '정책워처': '강남 두더지 #02',
    '전세대출': '전세러 #09',
    '전세러': '전세러 #09',
    '대출상담': '실수요 #05',
    '실수요': '실수요 #05',
    '세제확인': '정책워처 #01',
    '서울러': '서울러 #11',
  };
  let c = read('lib/analystPosts-markets.ts');
  for (const [oldA, newA] of Object.entries(aliasFix)) {
    c = c.replace(new RegExp(`alias: "${oldA}"`, 'g'), `alias: "${newA}"`);
  }
  write('lib/analystPosts-markets.ts', c);
  console.log('patched analystPosts-markets comment aliases');
}

function patchWallPostsMarketsDup() {
  let c = read('lib/wallPosts-markets.ts');
  // Fix duplicate post id 9249 -> 9253 for 9/3 batch
  c = c.replace(
    '{ id: 9249, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "공급·LTV·DSR·전세대출 규제 유지. 유가·금리 shock가 주담대 심리 변수", createdAt: T03 - 0, likes: 28, comments: 2, }',
    '{ id: 9253, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "공급·LTV·DSR·전세대출 규제 유지. 유가·금리 충격이 주담대 심리 변수", createdAt: T03 - 0, likes: 28, comments: 2, }',
  );
  c = c.replace(
    '{ id: 9250, symbol: "전세"',
    '{ id: 9254, symbol: "전세"',
  );
  c = c.replace(
    '{ id: 9251, symbol: "매매"',
    '{ id: 9255, symbol: "매매"',
  );
  c = c.replace(
    '{ id: 9252, symbol: "서울"',
    '{ id: 9256, symbol: "서울"',
  );
  // Remove duplicate 9249 comment block (9/3 batch at top of comments)
  const dupStart = c.indexOf('  9249: [\n    { id: 1, nickname: "정책워처"');
  const dupEnd = c.indexOf('  ],\n  9250: [', dupStart);
  if (dupStart !== -1 && dupEnd !== -1) {
    const fixed = `  9253: [
    { id: 1, nickname: "정책워처", holdingLabel: "관심", content: "공급 수사 vs LTV·DSR 실행 분리", createdAt: T03 + 600_000, likes: 4 },
    { id: 2, nickname: "전세대출", holdingLabel: "관심", content: "유가 충격이 주담대 심리에도", createdAt: T03 + 1200_000, likes: 3 },
  ],
  9254: [`;
    c = c.slice(0, dupStart) + fixed + c.slice(dupEnd + '  ],\n  9250: ['.length);
    c = c.replace('  9250: [', '  9254: [');
    c = c.replace('  9251: [', '  9255: [');
    c = c.replace('  9252: [', '  9256: [');
  }
  write('lib/wallPosts-markets.ts', c);
  console.log('patched wallPosts-markets KR-RE ids 9253-9256');
}

function patchSvgTopicsFile() {
  const p = path.join(__dirname, 'gen-markets-svg-20260903-topics.js');
  let t = read(p.replace(ROOT + path.sep, '').replace(/^scripts\//, 'scripts/'));
  t = fs.readFileSync(p, 'utf8');
  t = t.replace(/\bshock\b/g, '충격');
  t = t.replace(/BTC ~105-107K/g, '비트코인 10.5~10.7만$');
  t = t.replace(/gold ~3550-3650/g, '금 3550~3650$');
  t = t.replace(/foreign sell ~1\.9-2\.4T/g, '외국인 1.9~2.4조');
  t = t.replace(/Policy\/supply · oil\/rates shock · jeonse\/sale watch · FOMC 9\/15/g, '정책·공급 · 유가·금리 · 전월세 · FOMC 9/15');
  t = t.replace(/WTI \$91\+ · 10yr 4\.8% · gold ~3550-3650 · BTC ~105-107K · KOSPI -3\.99%/g, 'WTI $91+ · 10년 4.8% · 금 3550~3650 · 비트 10.5~10.7만 · 코스피 -3.99%');
  t = t.replace(/WTI \$91\+ · 10yr 4\.8% · gold ~3550-3650 · BTC ~105-107K/g, 'WTI $91+ · 10년 4.8% · 금 3550~3650 · 비트 10.5~10.7만');
  t = t.replace(/~106K/g, '약10.6만$');
  t = t.replace(/Au\/Ag/g, '금은비');
  t = t.replace(/Split risk-on\/off memos\./g, '리스크온·오프 메모 분리.');
  t = t.replace(/Track DXY, silver, WTI separately/g, '달러·은·유가 개별 추적');
  t = t.replace(/Oil\/rates\/flows shock/g, '유가·금리·수급');
  t = t.replace(/Middle East oil/g, '중동·유가');
  t = t.replace(/Discount rate/g, '할인율');
  fs.writeFileSync(p, t);
  console.log('patched SVG topics Korean');
}

patchSummaries();
patchAnalystComments();
patchAnalystMarketsComments();
patchWallPostsMarketsDup();
patchSvgTopicsFile();
console.log('done');
