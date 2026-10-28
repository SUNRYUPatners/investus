#!/usr/bin/env node
// Chart generator — 2026-10-28 (b): Tesla Robotaxi Texas + SPCX DB $250 + Summary update
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/charts');
const DATE = '20261028';

function escXml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
}
function base(f1='#0D1117',f2='#0A0520',a1='#EF4444',a2='#C084FC'){
  return `<defs>
    <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${f1}"/><stop offset="100%" stop-color="${f2}"/>
    </linearGradient>
    <linearGradient id="accentG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${a1}"/><stop offset="100%" stop-color="${a2}"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="glow2"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="1080" height="1350" fill="url(#bgG)"/>
  <rect x="0" y="0" width="1080" height="10" fill="url(#accentG)"/>`;
}
function footer(note=''){
  return `<rect x="0" y="1340" width="1080" height="10" fill="url(#accentG)"/>
  <text x="40" y="1333" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">investus.kr · Not investment advice${note?' · '+note:''} · INVESTUS SRP</text>`;
}
function badge(x,y,w,label,bg,border,tc){
  return `<rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="${bg}"/>
  <rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="none" stroke="${border}" stroke-width="2"/>
  <text x="${x+w/2}" y="${y+26}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="${tc}">${escXml(label)}</text>`;
}
function statBox(x,y,w,h,top,big,unit,sub,accent='#EF4444'){
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#0F1623" stroke="${accent}" stroke-width="2"/>
  <text x="${x+w/2}" y="${y+34}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${escXml(top)}</text>
  <text x="${x+w/2}" y="${y+96}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="54" font-weight="900" fill="${accent}">${escXml(big)}</text>
  <text x="${x+w/2}" y="${y+128}" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#D1D5DB">${escXml(unit)}</text>
  <text x="${x+w/2}" y="${y+158}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">${escXml(sub)}</text>`;
}
function msgBox(y, titleText, lines, accentTop='#F59E0B', borderColor='#92400E'){
  const lh = 34;
  const h = 72 + lines.length * lh + 28;
  const textSvg = lines.map((ln, i) =>
    `<text x="108" y="${y+72+i*lh}" font-family="Arial,sans-serif" font-size="24" fill="${i===lines.length-1?'#FDE68A':'#E5E7EB'}">${escXml(ln)}</text>`
  ).join('');
  return {
    svg: `<rect x="54" y="${y}" width="972" height="${h}" rx="22" fill="#0F0A00" stroke="${borderColor}" stroke-width="2.5"/>
  <line x1="54" y1="${y+48}" x2="1026" y2="${y+48}" stroke="${accentTop}" stroke-width="2"/>
  <text x="108" y="${y+33}" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="${accentTop}">${escXml(titleText)}</text>
  ${textSvg}`,
    h, nextY: y + h + 14
  };
}

async function save(slug, svg) {
  const svgPath = path.join(OUT, `${slug}.svg`);
  const pngPath = path.join(OUT, `${slug}.png`);
  fs.writeFileSync(svgPath, svg);
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
  console.log(`  ✓ ${slug}.png`);
}

// ── 1. Tesla Robotaxi Texas ──────────────────────────────────────
function makeTslaRobotaxi(ko) {
  const red = '#EF4444';
  const redDark = '#991B1B';
  const green = '#34D399';
  const blue = '#60A5FA';

  const mb1 = msgBox(658, ko?'📡 Waymo vs Tesla Austin':'📡 Waymo vs Tesla Austin', ko?[
    'Tesla: 438K마일/주 (2026년 10월 18일 기준)',
    'Waymo: 406K마일/주 (Q2 2026 — 분기 데이터)',
    'Tesla가 Austin 주간 마일리지에서 Waymo 추월',
    '→ Waymo 데이터는 수개월 뒤처짐, 실제 격차 더 클 수 있음',
  ]:[
    'Tesla: 438K miles/week (week to Oct 18, 2026)',
    'Waymo: 406K miles/week (Q2 2026 — quarterly data)',
    'Tesla now leads Waymo in Austin weekly driverless miles',
    '→ Waymo data lags months; actual gap likely larger',
  ], '#EF4444', '#7F1D1D');

  const mb2 = msgBox(mb1.nextY, ko?'🏭 기가텍사스 생산 라인':'🏭 Gigafactory Texas Line', ko?[
    'Lars (라인 책임자): "라인이 너무 빠르게 돌아서 매일 가동하지 않습니다"',
    '"생산 라인이 실제 배포 속도를 앞지르고 있습니다"',
    '→ 공급(생산)이 아닌 배포·규제가 속도 조절 요인',
  ]:[
    'Lars (Line lead): "We don\'t run the line every day — it runs too fast"',
    '"The line is currently outpacing our robotaxi deployments"',
    '→ Supply (production) is NOT the constraint — deployment is',
  ], '#F59E0B', '#78350F');

  const stats = [
    { top: 'Cybercab', big: '544', unit: ko?'대 (52%)':'units (52%)', sub: ko?'처음 Model Y 추월':'First time > Model Y', accent: red },
    { top: 'Model Y', big: '507', unit: ko?'대 (48%)':'units (48%)', sub: ko?'TxDMV 등록':'TxDMV Roster', accent: '#F97316' },
    { top: ko?'와이모까지':'To Waymo', big: '~12일', unit: ko?'13대/일 페이스':'~13/day pace', sub: ko?'역전 예상 ~11월 8일':'Crossover ~Nov 8', accent: green },
  ];
  const statsY = mb2.nextY + 4;
  const statsSvg = stats.map((s,i) => statBox(54+i*340, statsY, 316, 160, s.top, s.big, s.unit, s.sub, s.accent)).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#12020A','#1A0305','#EF4444','#F97316')}
  ${badge(40,24,120,'TSLA','#1A0505','#B91C1C','#FCA5A5')}
  ${badge(178,24,150,ko?'텍사스':'Texas DMV','#12020A','#EF4444','#FCA5A5')}
  ${badge(346,24,160,'TxDMV Roster','#0A1505','#16A34A','#86EFAC')}
  <text x="540" y="116" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#FCA5A5">${escXml(ko?'Tesla 로보택시 텍사스 — Cybercab이 Model Y를 추월하다':'Tesla Robotaxi Texas — Cybercab Passes Model Y')}</text>

  <text x="540" y="260" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="140" font-weight="900" fill="${red}" filter="url(#glow)">1,051</text>
  <text x="540" y="315" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="#FCA5A5">${escXml(ko?'총 등록 대수 (2026-10-28 기준)':'Total registered units (Oct 28, 2026)')}</text>

  <rect x="54" y="340" width="472" height="130" rx="18" fill="rgba(239,68,68,0.1)" stroke="${red}" stroke-width="2"/>
  <text x="290" y="382" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="${red}">Cybercab</text>
  <text x="290" y="438" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="64" font-weight="900" fill="${red}">544</text>
  <text x="290" y="462" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#FCA5A5">${escXml(ko?'52% · 처음 Model Y 추월':'52% · First time > Model Y')}</text>

  <rect x="554" y="340" width="472" height="130" rx="18" fill="rgba(249,115,22,0.1)" stroke="#F97316" stroke-width="2"/>
  <text x="790" y="382" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#F97316">Model Y</text>
  <text x="790" y="438" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="64" font-weight="900" fill="#F97316">507</text>
  <text x="790" y="462" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#FDBA74">${escXml(ko?'48% · TxDMV 등록':'48% · TxDMV Roster')}</text>

  <rect x="54" y="488" width="972" height="80" rx="16" fill="rgba(52,211,153,0.08)" stroke="${green}" stroke-width="2"/>
  <text x="540" y="522" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="${green}">${escXml(ko?'Tesla +737 vs 와이모 +471 (9월 1일 이후)':'Tesla +737 vs Waymo +471 (since Sep 1)')}</text>
  <text x="540" y="556" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#6EE7B7">${escXml(ko?'와이모 텍사스 현재 1,207대 — 역전까지 156대 차이':'Waymo Texas: 1,207 units — 156 unit gap to close')}</text>

  ${mb1.svg}
  ${mb2.svg}
  ${statsSvg}
  ${footer(DATE)}
</svg>`;
  return svg;
}

// ── 2. SPCX Deutsche Bank $250 ───────────────────────────────────
function makeSpcxDB(ko) {
  const blue = '#60A5FA';
  const purple = '#A78BFA';

  const mb1 = msgBox(530, ko?'📊 Deutsche Bank 핵심 논거':'📊 Deutsche Bank Core Thesis', ko?[
    'SpaceX 수직통합 구조 → GW당 컴퓨팅 비용 $35~36B (업계 평균 ~$50B)',
    '→ 30%+ 비용 우위 → 추론 단가에서 구조적 경쟁 우위',
    '2027년 말까지 신규 컴퓨팅 용량 10GW 추가 가동 전망',
    'Anthropic $120.5B + $40B GPU 파이낸싱이 실체 확인',
  ]:[
    'Vertical integration → compute cost $35-36B/GW (peers ~$50B)',
    '→ 30%+ cost advantage → structural edge in inference pricing',
    '10 GW new compute capacity expected by end of 2027',
    'Anthropic $120.5B + $40B GPU financing confirm the thesis',
  ], blue, '#1E3A5F');

  const mb2 = msgBox(mb1.nextY, ko?'📈 DB 추정치 상향':'📈 DB Estimate Revisions', ko?[
    '2026 매출: $49.7B → $50.7B (상향)',
    '2026 조정 EPS: $1.48 → $1.54 (상향)',
    '현재 주가 $148.55 → DB 목표가 $250 = 업사이드 ~68%',
    '"시장이 SPCX 컴퓨팅 레버리지를 여전히 낮게 평가하고 있다"',
  ]:[
    '2026 Revenue: $49.7B → $50.7B (raised)',
    '2026 Adj EPS: $1.48 → $1.54 (raised)',
    'SPCX at $148.55 → DB PT $250 = ~68% upside',
    '"The Street still underestimates SPCX\'s compute leverage"',
  ], purple, '#3B0764');

  const stats = [
    { top: ko?'목표주가':'Price Target', big: '$250', unit: ko?'Deutsche Bank':'Deutsche Bank', sub: ko?'매수 유지':'Buy maintained', accent: blue },
    { top: ko?'2026 매출':'2026 Revenue', big: '$50.7B', unit: ko?'상향':'Raised', sub: ko?'기존 $49.7B':'from $49.7B', accent: '#34D399' },
    { top: ko?'2026 EPS':'2026 Adj EPS', big: '$1.54', unit: ko?'상향':'Raised', sub: ko?'기존 $1.48':'from $1.48', accent: purple },
  ];
  const statsY = mb2.nextY + 4;
  const statsSvg = stats.map((s,i) => statBox(54+i*340, statsY, 316, 160, s.top, s.big, s.unit, s.sub, s.accent)).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#07051A','#04021A','#60A5FA','#A78BFA')}
  ${badge(40,24,120,'SPCX','#1E1B4B','#6D28D9','#C4B5FD')}
  ${badge(178,24,180,ko?'애널리스트':'Analyst PT','#1E1B4B','#60A5FA','#BAE6FD')}
  <text x="540" y="116" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#C4B5FD">${escXml(ko?'SPCX: Deutsche Bank 목표주가 $250 · 컴퓨팅 레버리지 저평가':'SPCX: Deutsche Bank PT $250 · Compute Leverage Underappreciated')}</text>

  <text x="540" y="260" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="140" font-weight="900" fill="${blue}" filter="url(#glow)">$250</text>
  <text x="540" y="315" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="#BAE6FD">${escXml(ko?'Deutsche Bank 목표주가 (매수 유지)':'Deutsche Bank Price Target (Buy maintained)')}</text>

  <rect x="54" y="340" width="460" height="100" rx="16" fill="rgba(96,165,250,0.1)" stroke="${blue}" stroke-width="2"/>
  <text x="284" y="378" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#93C5FD">${escXml(ko?'현재 주가':'Current Price')}</text>
  <text x="284" y="426" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="${blue}">$148.55</text>

  <rect x="566" y="340" width="460" height="100" rx="16" fill="rgba(167,139,250,0.1)" stroke="${purple}" stroke-width="2"/>
  <text x="796" y="378" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#C4B5FD">${escXml(ko?'업사이드':'Upside to PT')}</text>
  <text x="796" y="426" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="${purple}">~68%</text>

  <rect x="54" y="456" width="972" height="58" rx="14" fill="rgba(167,139,250,0.08)" stroke="${purple}" stroke-width="1.5"/>
  <text x="540" y="495" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#E5E7EB">${escXml(ko?'SpaceX GW당 컴퓨팅 비용: $35~36B (업계 ~$50B 대비 30%+ 저렴)':'SpaceX compute cost: $35-36B/GW vs ~$50B industry avg — 30%+ cheaper')}</text>

  ${mb1.svg}
  ${mb2.svg}
  ${statsSvg}
  ${footer(DATE)}
</svg>`;
  return svg;
}

// ── 3. Summary (updated) ─────────────────────────────────────────
function makeSummary(ko) {
  const topics = ko ? [
    { n:'1', txt:'Tesla 로보택시 텍사스 1,051대 — Cybercab 544 Model Y 추월 · 와이모 역전 12일', col:'#EF4444' },
    { n:'2', txt:'SpaceX $40B GPU 파이낸싱 — Apollo·Goldman·KKR·BlackRock · Vera Rubin 2027H1', col:'#60A5FA' },
    { n:'3', txt:'NVDA: Meta $3B 신규 투자 · Oracle NVL72 Supercluster 수주', col:'#86EFAC' },
    { n:'4', txt:'SPCX: Deutsche Bank $250 목표가 · 컴퓨팅 레버리지 저평가 · 매수 유지', col:'#A78BFA' },
  ] : [
    { n:'1', txt:'Tesla Robotaxi TX 1,051 units — Cybercab 544 beats Model Y · 12 days to Waymo', col:'#EF4444' },
    { n:'2', txt:'SpaceX $40B GPU financing — Apollo/Goldman/KKR/BlackRock · Vera Rubin H1 2027', col:'#60A5FA' },
    { n:'3', txt:'NVDA: Meta $3B investment · Oracle NVL72 Supercluster win', col:'#86EFAC' },
    { n:'4', txt:'SPCX: Deutsche Bank PT $250 · Compute leverage underappreciated · Buy', col:'#A78BFA' },
  ];

  let topicsY = 360;
  const topicsSvg = topics.map(t => {
    const svg = `<rect x="54" y="${topicsY}" width="972" height="68" rx="14" fill="rgba(255,255,255,0.03)" stroke="${t.col}" stroke-width="1.5"/>
  <text x="90" y="${topicsY+43}" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="${t.col}">${t.n}</text>
  <text x="140" y="${topicsY+43}" font-family="Arial,sans-serif" font-size="23" fill="#E5E7EB">${escXml(t.txt)}</text>`;
    topicsY += 80;
    return svg;
  }).join('');

  const footerY = topicsY + 16;
  const statsSvg = [
    { top: ko?'로보택시':'Robotaxi', big: '1,051', unit: ko?'텍사스 등록':'TX Registered', sub: ko?'Cybercab 첫 추월':'Cybercab leads', accent: '#EF4444' },
    { top: ko?'AI 파이낸싱':'AI Financing', big: '$40B', unit: ko?'SpaceX GPU':'SpaceX GPU', sub: ko?'Apollo 리드':'Apollo leads', accent: '#60A5FA' },
    { top: 'SPCX', big: '$148.55', unit: ko?'DB $250 목표':'DB PT $250', sub: ko?'업사이드 ~68%':'~68% upside', accent: '#A78BFA' },
  ].map((s,i) => statBox(54+i*340, footerY, 316, 160, s.top, s.big, s.unit, s.sub, s.accent)).join('');

  const count = topics.length;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#08051A','#04021A','#60A5FA','#A78BFA')}
  ${badge(40,24,120,'TSLA','#1A0505','#B91C1C','#FCA5A5')}
  ${badge(178,24,120,'SPCX','#1E1B4B','#6D28D9','#C4B5FD')}
  ${badge(316,24,120,'NVDA','#052E16','#16A34A','#86EFAC')}
  <text x="540" y="148" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="38" font-weight="900" fill="#E9D5FF">${escXml(ko?'한장요약 2026-10-28':'Daily Summary 2026-10-28')}</text>
  <text x="540" y="196" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#9CA3AF">${escXml(ko?`오늘의 핵심 ${count}가지`:`${count} key stories today`)}</text>
  <line x1="54" y1="220" x2="1026" y2="220" stroke="#A78BFA" stroke-width="2"/>
  <text x="54" y="300" font-family="Arial Black,Arial,sans-serif" font-size="28" font-weight="900" fill="#EF4444">${escXml(ko?'Tesla 로보택시 1,051 · SpaceX $40B GPU · NVDA Meta $3B · SPCX DB $250':'Tesla Robotaxi 1,051 · SpaceX $40B GPU · NVDA Meta $3B · SPCX DB $250')}</text>
  <text x="54" y="340" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">${escXml(ko?'2026년 10월 28일 (수) · investus.kr SRP':'October 28, 2026 (Wed) · investus.kr SRP')}</text>
  ${topicsSvg}
  ${statsSvg}
  ${footer(DATE)}
</svg>`;
  return svg;
}

async function main() {
  console.log('Generating 2026-10-28 (b) charts...');

  // Tesla Robotaxi Texas
  await save(`tsla-robotaxi-texas-${DATE}`, makeTslaRobotaxi(true));
  await save(`tsla-robotaxi-texas-${DATE}-en`, makeTslaRobotaxi(false));

  // SPCX Deutsche Bank $250
  await save(`spcx-analyst-upgrade-${DATE}`, makeSpcxDB(true));
  await save(`spcx-analyst-upgrade-${DATE}-en`, makeSpcxDB(false));

  // Summary (updated: Tesla Robotaxi + SpaceX + NVDA + SPCX DB)
  await save(`summary-${DATE}`, makeSummary(true));
  await save(`summary-${DATE}-en`, makeSummary(false));

  console.log('✓ All 6 charts generated.');
}

main().catch(e => { console.error(e); process.exit(1); });
