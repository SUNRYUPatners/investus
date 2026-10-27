#!/usr/bin/env node
// Chart generator — 2026-10-28
// SpaceX $40B · Tesla Q3 EPS · FOMC · BTC/DOGE/Gold · NVDA Meta · SPCX upgrades · Summary
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

// ── 1. SpaceX $40B GPU Financing ─────────────────────────────────
function makeSpaceX40B(ko) {
  const accent = '#60A5FA';
  const accentDark = '#1E40AF';
  const green = '#34D399';

  const consortiumData = [
    { label: ko?'Apollo Global':'Apollo Global',     val: ko?'리드':'Lead Arranger', sub1: ko?'대체투자 $650B 운용':'$650B AUM',          col: '#60A5FA' },
    { label: ko?'Goldman Sachs':'Goldman Sachs',    val: ko?'단독 구조':'Sole Structuring', sub1: ko?'설계 에이전트':'Agent',            col: '#A78BFA' },
    { label: ko?'KKR · BlackRock':'KKR · BlackRock', val: ko?'컨소시엄':'Consortium',       sub1: ko?'기관투자자 참여':'Institutional',    col: '#34D399' },
  ];

  const cBoxW = 316; const cBoxH = 185; const cBoxY = 460;
  const contractSvg = consortiumData.map((d, i) => {
    const x = 54 + i * (cBoxW + 14);
    return `<rect x="${x}" y="${cBoxY}" width="${cBoxW}" height="${cBoxH}" rx="18" fill="#130C2A" stroke="${d.col}" stroke-width="2.5"/>
  <text x="${x+cBoxW/2}" y="${cBoxY+34}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${escXml(d.label)}</text>
  <text x="${x+cBoxW/2}" y="${cBoxY+98}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="42" font-weight="900" fill="${d.col}">${escXml(d.val)}</text>
  <text x="${x+cBoxW/2}" y="${cBoxY+132}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#D1D5DB">${escXml(d.sub1)}</text>`;
  }).join('');

  const mb1 = msgBox(665, ko?'📊 SpaceX $40B GPU 파이낸싱 구조':'📊 SpaceX $40B GPU Financing Structure', ko?[
    'Vera Rubin GPU (NVDA 차세대) 확보 목적 — 2027년 상반기 인도',
    'Apollo 리드 · Goldman Sachs 단독 구조 설계 · KKR·BlackRock 컨소시엄',
    'Anthropic S-1 $120.5B에 이은 AI 인프라 실체 재확인',
    '민간 단일 AI 인프라 파이낸싱 역대 최대 규모',
  ]:[
    'Purpose: NVIDIA Vera Rubin GPU procurement — H1 2027 delivery',
    'Apollo leads · Goldman sole structuring agent · KKR·BlackRock consortium',
    'Confirms SpaceX AI compute reality after Anthropic S-1 $120.5B',
    'Largest single private AI infrastructure financing on record',
  ], '#60A5FA', '#1E40AF');

  const mb2 = msgBox(mb1.nextY, ko?'🚀 SPCX·NVDA 투자 포인트':'🚀 SPCX · NVDA Investment Angle', ko?[
    'SpaceX Vera Rubin 확보 → NVDA 2027년 수요 파이프라인 추가 확인',
    '번스타인 $268 · BofA $275(Buy) 목표주가 상향 근거',
    '기관 최고 수준이 $40B 배팅 = AI 컴퓨팅 사업성 공식 인정',
  ]:[
    'SpaceX Vera Rubin buy → NVDA 2027 demand pipeline confirmed',
    'Basis for Bernstein $268 · BofA $275 Buy SPCX PT upgrades',
    'World\'s top institutions betting $40B = AI compute thesis validated',
  ], '#34D399', '#065F46');

  const stats = [
    { top: ko?'파이낸싱 규모':'Financing Size',  big: '$40B', unit: ko?'GPU 인프라':'GPU Infrastructure', sub: ko?'2027 H1 인도':'H1 2027 delivery', accent: '#60A5FA' },
    { top: ko?'Goldman 역할':'Goldman Role',     big: ko?'단독':'Sole',   unit: ko?'구조 설계 에이전트':'Structuring Agent',   sub: ko?'최고 기관 참여':'Top institutions', accent: '#A78BFA' },
    { top: ko?'GPU 종류':'GPU Type',             big: ko?'Vera Rubin':'Vera Rubin', unit: ko?'NVDA 차세대':'NVDA Next-Gen', sub: ko?'Blackwell 이후':'Post-Blackwell', accent: '#34D399' },
  ];
  const statsY = mb2.nextY + 4;
  const statsSvg = stats.map((s,i) => statBox(54+i*340, statsY, 316, 160, s.top, s.big, s.unit, s.sub, s.accent)).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#08051A','#04021A','#60A5FA','#A78BFA')}
  ${badge(40,24,160,'SPCX','#1E1B4B','#6D28D9','#C4B5FD')}
  ${badge(218,24,140,'NVDA','#052E16','#16A34A','#86EFAC')}
  ${badge(376,24,150,'Apollo','#0F172A','#1D4ED8','#93C5FD')}
  <text x="540" y="116" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#E9D5FF">${escXml(ko?'SpaceX $40B GPU 파이낸싱 — Apollo·Goldman·KKR·BlackRock':'SpaceX $40B GPU Financing — Apollo·Goldman·KKR·BlackRock')}</text>
  <text x="540" y="278" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="155" font-weight="900" fill="#60A5FA" filter="url(#glow)">$40B</text>
  <text x="540" y="338" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="#93C5FD">${escXml(ko?'Vera Rubin GPU 인프라 파이낸싱 — 민간 단일 AI 역대 최대':'Vera Rubin GPU Infrastructure — Largest Single AI Private Financing')}</text>
  <line x1="54" y1="368" x2="1026" y2="368" stroke="#1E40AF" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="54" y="418" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#60A5FA">${escXml(ko?'컨소시엄 구조':'Consortium Structure')}</text>
  ${contractSvg}
  ${mb1.svg}
  ${mb2.svg}
  ${statsSvg}
  ${footer(DATE)}
</svg>`;
  return svg;
}

// ── 2. Tesla Q3 Earnings ─────────────────────────────────────────
function makeTslaQ3(ko) {
  const mb1 = msgBox(480, ko?'💰 Tesla Q3 2026 핵심 지표':'💰 Tesla Q3 2026 Key Metrics', ko?[
    '조정 EPS $0.48 — 컨센서스 $0.45 7% 초과, 긍정 서프라이즈',
    '매출 $28.05B · 순이익 $787M(-43% YoY, 비현금 항목 영향)',
    'CapEx 연간 가이던스 $25B → $20B 하향 — FCF 개선 신호',
    'FSD 활성 사용자 1.7M 돌파 — 소프트웨어 플라이휠 가동',
  ]:[
    'Adj EPS $0.48 — beat $0.45 consensus by 7%',
    'Revenue $28.05B · Net income $787M (-43% YoY, mostly non-cash)',
    'CapEx guide cut $25B → $20B — FCF improvement signal',
    'FSD active users 1.7M+ — software flywheel turning',
  ], '#EF4444', '#7F1D1D');

  const mb2 = msgBox(mb1.nextY, ko?'📊 하우스 뷰':'📊 House View', ko?[
    '웨드부시 $600 유지 — CapEx 하향은 FCF 개선·Cybercab 대비 재무 비축',
    '모건스탠리 기본 $415·상방 $610 — FSD 수익화 속도가 시나리오 분기점',
  ]:[
    'Wedbush $600 — CapEx cut = FCF pivot ahead of Cybercab ramp',
    'Morgan Stanley $415 base / $610 bull — FSD monetization pace is the key',
  ], '#F59E0B', '#78350F');

  const stats = [
    { top: ko?'조정 EPS':'Adj EPS', big: '$0.48', unit: ko?'컨센 $0.45':'vs $0.45 est', sub: ko?'+7% 서프라이즈':'+7% beat', accent: '#EF4444' },
    { top: ko?'분기 매출':'Revenue',  big: '$28.05B', unit: ko?'QoQ 성장':'QoQ growth', sub: ko?'연환산 $112B+':'~$112B annualized', accent: '#F97316' },
    { top: ko?'FSD 사용자':'FSD Users', big: '1.7M', unit: ko?'활성 사용자':'Active users', sub: ko?'Turo 오늘 개방':'Turo live today', accent: '#FBBF24' },
  ];
  const statsY = mb2.nextY + 4;
  const statsSvg = stats.map((s,i) => statBox(54+i*340, statsY, 316, 160, s.top, s.big, s.unit, s.sub, s.accent)).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#0D0505','#1A0A0A','#EF4444','#F97316')}
  ${badge(40,24,140,'TSLA','#1A0505','#B91C1C','#FCA5A5')}
  ${badge(198,24,150,'어닝 시즌','#1A0505','#C2410C','#FED7AA')}
  <text x="540" y="116" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#FCA5A5">${escXml(ko?'Tesla Q3 2026 어닝 — EPS $0.48 컨센 상회 · CapEx 하향':'Tesla Q3 2026 Earnings — EPS $0.48 Beat · CapEx Cut')}</text>
  <text x="540" y="278" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="140" font-weight="900" fill="#EF4444" filter="url(#glow)">$0.48</text>
  <text x="540" y="330" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#FCA5A5">${escXml(ko?'조정 EPS — 컨센서스 $0.45 초과 · 매출 $28.05B · CapEx $20B':'Adj EPS — Beats $0.45 Consensus · Revenue $28.05B · CapEx $20B')}</text>
  <line x1="54" y1="358" x2="1026" y2="358" stroke="#7F1D1D" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="54" y="408" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#EF4444">${escXml(ko?'Q3 2026 실적 요약':'Q3 2026 Results Summary')}</text>
  <rect x="54" y="425" width="229" height="42" rx="12" fill="#1A0505" stroke="#7F1D1D" stroke-width="1.5"/>
  <text x="168" y="452" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#FCA5A5">${escXml(ko?'EPS $0.48 (est $0.45)':'EPS $0.48 (est $0.45)')}</text>
  <rect x="297" y="425" width="229" height="42" rx="12" fill="#1A0505" stroke="#7F1D1D" stroke-width="1.5"/>
  <text x="411" y="452" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#FED7AA">${escXml(ko?'매출 $28.05B':'Revenue $28.05B')}</text>
  <rect x="540" y="425" width="229" height="42" rx="12" fill="#1A0505" stroke="#7F1D1D" stroke-width="1.5"/>
  <text x="654" y="452" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#FDE68A">${escXml(ko?'CapEx $20B(↓$25B)':'CapEx $20B(↓$25B)')}</text>
  <rect x="783" y="425" width="243" height="42" rx="12" fill="#1A0505" stroke="#7F1D1D" stroke-width="1.5"/>
  <text x="904" y="452" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#86EFAC">${escXml(ko?'FSD 1.7M 사용자':'FSD 1.7M users')}</text>
  ${mb1.svg}
  ${mb2.svg}
  ${statsSvg}
  ${footer(DATE)}
</svg>`;
  return svg;
}

// ── 3. FOMC Hold ─────────────────────────────────────────────────
function makeFomc(ko) {
  const mb1 = msgBox(480, ko?'🌐 FOMC 10월 결정':'🌐 FOMC October Decision', ko?[
    '3.75-4.00% 만장일치 동결 — 인상 확률 11%, 예상 범위',
    'S&P 500 7,676.77(+0.70%) · Nasdaq +0.83% 안도 랠리',
    '성명: 인플레이션 2% 목표 진전, 데이터 의존적 접근 유지',
    '첫 인하 예상: 2027년 1분기 — 현 동결 사이클 지속 전망',
  ]:[
    'Hold 3.75-4.00% unanimous — hike prob 11%, no surprise',
    'S&P 500 7,676.77 (+0.70%) · Nasdaq +0.83% relief rally',
    'Statement: inflation progress toward 2%, data-dependent stance',
    'First cut expected: 2027 Q1 — hold cycle continues',
  ], '#F59E0B', '#92400E');

  const mb2 = msgBox(mb1.nextY, ko?'📊 AI·기술주 영향':'📊 Impact on AI & Tech', ko?[
    '금리 동결 유지 = 할인율 압박 없음 → 성장주 밸류에이션 우호',
    '골드만삭스 S&P 연말 7,900 목표 유지 · JP모건 TSLA·NVDA·SPCX 긍정',
  ]:[
    'Rate hold = no discount rate pressure → growth multiple support',
    'Goldman year-end S&P 7,900 target · JPM positive on TSLA·NVDA·SPCX',
  ], '#60A5FA', '#1E3A5F');

  const stats = [
    { top: ko?'현행 금리':'Fed Rate', big: '3.75%', unit: ko?'~4.00%':'~4.00%', sub: ko?'만장일치 동결':'Unanimous hold', accent: '#F59E0B' },
    { top: ko?'S&P 500':'S&P 500', big: '7,677', unit: ko?'+0.70%':'+0.70%', sub: ko?'안도 랠리':'Relief rally', accent: '#60A5FA' },
    { top: ko?'첫 인하 예상':'First Cut Est', big: ko?'2027Q1':'2027Q1', unit: ko?'기준금리':' ', sub: ko?'3.5% 수준 예상':'~3.5% target', accent: '#34D399' },
  ];
  const statsY = mb2.nextY + 4;
  const statsSvg = stats.map((s,i) => statBox(54+i*340, statsY, 316, 160, s.top, s.big, s.unit, s.sub, s.accent)).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#0D0A00','#1A1200','#F59E0B','#D97706')}
  ${badge(40,24,160,'FOMC','#1C1505','#B45309','#FCD34D')}
  ${badge(218,24,160,'매크로','#1C1505','#92400E','#FDE68A')}
  <text x="540" y="116" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#FDE68A">${escXml(ko?'FOMC 10월 금리 동결 — 3.75-4.00% 유지, 시장 안도 랠리':'FOMC October Hold — 3.75-4.00%, Market Relief Rally')}</text>
  <text x="540" y="278" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="110" font-weight="900" fill="#F59E0B" filter="url(#glow)">${escXml(ko?'동결':'HOLD')}</text>
  <text x="540" y="338" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="#FDE68A">${escXml(ko?'3.75–4.00% 만장일치 · S&P +0.70% · Nasdaq +0.83%':'3.75–4.00% Unanimous · S&P +0.70% · Nasdaq +0.83%')}</text>
  <line x1="54" y1="368" x2="1026" y2="368" stroke="#92400E" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="54" y="418" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#F59E0B">${escXml(ko?'시장 반응 · 의미':'Market Reaction & Implications')}</text>
  <rect x="54" y="435" width="460" height="32" rx="10" fill="#1C1505" stroke="#B45309" stroke-width="1.5"/>
  <text x="284" y="457" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#FCD34D">${escXml(ko?'인상 확률 11% → 동결 사실상 기정사실':'Hike probability 11% → hold fully priced')}</text>
  <rect x="528" y="435" width="498" height="32" rx="10" fill="#1C1505" stroke="#B45309" stroke-width="1.5"/>
  <text x="777" y="457" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#FDE68A">${escXml(ko?'차기 결정: 2026년 12월 · 점도표 2027 초 인하 시사':'Next: Dec 2026 · Dot plot implies 2027 cut')}</text>
  ${mb1.svg}
  ${mb2.svg}
  ${statsSvg}
  ${footer(DATE)}
</svg>`;
  return svg;
}

// ── 4. BTC / DOGE / Gold ─────────────────────────────────────────
function makeBtcDogeGold(ko) {
  const mb1 = msgBox(560, ko?'₿ 가상자산·안전자산 동향':'₿ Crypto & Safe-Haven Update', ko?[
    'BTC $81,115 (+1.40%) — $80K 지지선 유지, 현물 ETF 자금 유입 지속',
    'DOGE $0.0787 (+2.00%) — Elon 생태계 이벤트 민감 반응',
    '금 $3,995 (-0.52%) — FOMC 후 위험선호 소폭 이동, $4,000 목전',
    'FOMC 동결 후 가상자산 상승·금 소폭 하락 = 위험선호 재확인',
  ]:[
    'BTC $81,115 (+1.40%) — $80K floor holds, ETF inflows continue',
    'DOGE $0.0787 (+2.00%) — Elon ecosystem sensitive',
    'Gold $3,995 (-0.52%) — mild risk-on shift post-FOMC, just below $4,000',
    'Crypto up, gold slight dip = risk-on sentiment reaffirmed',
  ], '#F59E0B', '#78350F');

  const stats = [
    { top: 'Bitcoin', big: '$81,115', unit: '+1.40%', sub: ko?'$80K 지지 유지':'$80K floor holds', accent: '#F59E0B' },
    { top: 'Dogecoin', big: '$0.0787', unit: '+2.00%', sub: ko?'Elon 생태계':'Elon ecosystem', accent: '#FBBF24' },
    { top: ko?'금 Gold':'Gold', big: '$3,995', unit: '-0.52%', sub: ko?'$4,000 목전':'Just below $4,000', accent: '#FCD34D' },
  ];
  const statsY = mb1.nextY + 4;
  const statsSvg = stats.map((s,i) => statBox(54+i*340, statsY, 316, 160, s.top, s.big, s.unit, s.sub, s.accent)).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#0D0800','#1A1200','#F59E0B','#FBBF24')}
  ${badge(40,24,120,'BTC','#1C1400','#B45309','#FCD34D')}
  ${badge(178,24,140,'DOGE','#1C1400','#D97706','#FDE68A')}
  ${badge(336,24,120,'Gold','#1C1400','#92400E','#FCD34D')}
  <text x="540" y="116" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#FDE68A">${escXml(ko?'BTC · DOGE · 금 — FOMC 동결 후 가상자산·안전자산 동향':'BTC · DOGE · Gold — Post-FOMC Crypto & Safe-Haven Update')}</text>
  <text x="300" y="260" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="90" font-weight="900" fill="#F59E0B" filter="url(#glow)">$81K</text>
  <text x="300" y="318" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#FDE68A">BTC +1.40%</text>
  <text x="780" y="240" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="72" font-weight="900" fill="#FBBF24" filter="url(#glow2)">$0.079</text>
  <text x="780" y="298" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#FDE68A">DOGE +2.00%</text>
  <text x="540" y="390" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="80" font-weight="900" fill="#FCD34D" filter="url(#glow2)">$3,995</text>
  <text x="540" y="445" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#FDE68A">${escXml(ko?'금 -0.52% · $4,000 목전':'Gold -0.52% · $4,000 threshold')}</text>
  <line x1="54" y1="472" x2="1026" y2="472" stroke="#92400E" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="54" y="520" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#F59E0B">${escXml(ko?'FOMC 동결 이후 시장 반응':'Post-FOMC Market Reaction')}</text>
  ${mb1.svg}
  ${statsSvg}
  ${footer(DATE)}
</svg>`;
  return svg;
}

// ── 5. NVDA Meta + Oracle ─────────────────────────────────────────
function makeNvdaMeta(ko) {
  const mb1 = msgBox(500, ko?'🔍 NVDA 수요 파이프라인 다층화':'🔍 NVDA Demand Pipeline Deepens', ko?[
    'Meta $3B 신규 투자 — MTIA 자체칩 개발과 동시 NVDA 협력 공식화',
    'Oracle NVL72 Supercluster 수주 — OCI AI 용량 대폭 확장',
    'SpaceX $120.5B+$40B · Anthropic · Meta · Oracle 4개 파이프라인 확인',
    '단일 고객 리스크 분산, 총 수요는 증가 — 구조적으로 더 강해짐',
  ]:[
    'Meta $3B invest — official NVDA-Meta partnership alongside MTIA development',
    'Oracle NVL72 Supercluster win — OCI AI capacity step-change',
    'SpaceX $120.5B+$40B + Anthropic + Meta + Oracle — 4 pipelines confirmed',
    'Single-customer risk diversifying while total demand grows',
  ], '#86EFAC', '#065F46');

  const mb2 = msgBox(mb1.nextY, ko?'📊 하우스 뷰':'📊 House View', ko?[
    '웨드부시: 수요 다층화로 데이터센터 추정치 추가 상향 근거 축적',
    'JP모건 오버웨이트 $230 — Blackwell→Rubin 수요 연속성 핵심',
  ]:[
    'Wedbush: multi-layer demand = basis for further datacenter estimate hike',
    'JPM Overweight $230 — Blackwell→Rubin demand continuity is the thesis',
  ], '#60A5FA', '#1E3A5F');

  const stats = [
    { top: ko?'Meta 투자':'Meta Investment', big: '$3B', unit: ko?'NVDA 신규':'New stake', sub: ko?'전략적 파트너십':'Strategic partnership', accent: '#86EFAC' },
    { top: ko?'Oracle 수주':'Oracle Win', big: 'NVL72', unit: 'Supercluster', sub: ko?'OCI AI 대규모 확장':'OCI AI expansion', accent: '#60A5FA' },
    { top: ko?'NVDA 주가':'NVDA Price', big: '$216', unit: ko?'안정적 흐름':'Stable', sub: ko?'추가 상방 촉매':'More upside catalysts', accent: '#A78BFA' },
  ];
  const statsY = mb2.nextY + 4;
  const statsSvg = stats.map((s,i) => statBox(54+i*340, statsY, 316, 160, s.top, s.big, s.unit, s.sub, s.accent)).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#020D08','#04150A','#22C55E','#16A34A')}
  ${badge(40,24,140,'NVDA','#052E16','#16A34A','#86EFAC')}
  ${badge(198,24,140,'Meta','#030D1A','#1D4ED8','#93C5FD')}
  ${badge(356,24,160,'Oracle','#0D0A00','#B45309','#FCD34D')}
  <text x="540" y="116" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#86EFAC">${escXml(ko?'NVDA: Meta $3B 신규 투자 · Oracle NVL72 Supercluster 수주':'NVDA: Meta $3B Investment · Oracle NVL72 Supercluster Win')}</text>
  <text x="300" y="260" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="110" font-weight="900" fill="#22C55E" filter="url(#glow)">$3B</text>
  <text x="300" y="316" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#86EFAC">${escXml(ko?'Meta → NVDA 신규 투자':'Meta → NVDA Investment')}</text>
  <text x="780" y="240" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="72" font-weight="900" fill="#60A5FA" filter="url(#glow2)">NVL72</text>
  <text x="780" y="296" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#93C5FD">${escXml(ko?'Oracle Supercluster 수주':'Oracle Supercluster')}</text>
  <text x="540" y="390" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="72" font-weight="900" fill="#86EFAC" filter="url(#glow2)">$216</text>
  <text x="540" y="445" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#86EFAC">${escXml(ko?'NVDA 주가 · AI 수요 4개 파이프라인 확인':'NVDA Price · 4 AI demand pipelines confirmed')}</text>
  <line x1="54" y1="462" x2="1026" y2="462" stroke="#065F46" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="54" y="485" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#22C55E">${escXml(ko?'SpaceX · Anthropic · Meta · Oracle':'SpaceX · Anthropic · Meta · Oracle')}</text>
  ${mb1.svg}
  ${mb2.svg}
  ${statsSvg}
  ${footer(DATE)}
</svg>`;
  return svg;
}

// ── 6. SPCX Analyst Upgrades ─────────────────────────────────────
function makeSpcxUpgrade(ko) {
  const mb1 = msgBox(560, ko?'📊 목표주가 상향 근거':'📊 PT Upgrade Rationale', ko?[
    '번스타인 $268 — AI 컴퓨팅 사업을 독립 밸류에이션 축으로 공식 반영',
    'BofA $275(Buy) — $40B 파이낸싱이 기관 신뢰도 검증 증거',
    'SPCX $150 → $268/$275 업사이드: 79%/83%',
    '기업가치 $1T 시나리오: AI 컴퓨팅 매출 본격화 시 재검토',
  ]:[
    'Bernstein $268 — AI compute now an independent valuation pillar',
    'BofA $275 Buy — $40B financing is institutional endorsement proof',
    'SPCX $150 → $268/$275 upside: 79%/83%',
    '$1T valuation scenario: revisit when AI compute revenue materializes',
  ], '#A78BFA', '#4C1D95');

  const stats = [
    { top: ko?'번스타인 PT':'Bernstein PT', big: '$268', unit: ko?'↑ $248':'↑ from $248', sub: ko?'+79% 업사이드':'79% upside', accent: '#A78BFA' },
    { top: ko?'BofA PT':'BofA PT',         big: '$275', unit: ko?'↑ $235 · Buy':'↑ from $235 Buy', sub: ko?'+83% 업사이드':'83% upside', accent: '#60A5FA' },
    { top: ko?'SPCX 마감':'SPCX Close',    big: '$150.33', unit: '+2.33%', sub: ko?'$150 안착':'$150 holding', accent: '#34D399' },
  ];
  const statsY = mb1.nextY + 4;
  const statsSvg = stats.map((s,i) => statBox(54+i*340, statsY, 316, 160, s.top, s.big, s.unit, s.sub, s.accent)).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#08051A','#04021A','#A78BFA','#7C3AED')}
  ${badge(40,24,160,'SPCX','#1E1B4B','#6D28D9','#C4B5FD')}
  ${badge(218,24,200,'번스타인 $268','#1E1B4B','#7C3AED','#C4B5FD')}
  ${badge(436,24,190,'BofA $275 Buy','#030D1A','#1D4ED8','#93C5FD')}
  <text x="540" y="116" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="25" font-weight="900" fill="#E9D5FF">${escXml(ko?'SPCX 목표주가 상향 — 번스타인 $268 · BofA $275 Buy':'SPCX PT Hikes — Bernstein $268 · BofA $275 Buy')}</text>
  <text x="300" y="265" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="110" font-weight="900" fill="#A78BFA" filter="url(#glow)">$268</text>
  <text x="300" y="320" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#C4B5FD">번스타인 ↑ $248</text>
  <text x="780" y="250" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="90" font-weight="900" fill="#60A5FA" filter="url(#glow2)">$275</text>
  <text x="780" y="306" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#93C5FD">BofA ↑ $235 Buy</text>
  <text x="540" y="400" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="60" font-weight="900" fill="#34D399">SPCX $150.33</text>
  <text x="540" y="450" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#86EFAC">${escXml(ko?'+2.33% 마감 · 목표가 대비 79~83% 업사이드':'+2.33% close · 79–83% upside to targets')}</text>
  <line x1="54" y1="468" x2="1026" y2="468" stroke="#4C1D95" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="54" y="514" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#A78BFA">${escXml(ko?'상향 근거: Anthropic S-1 $120.5B + $40B GPU 파이낸싱':'Basis: Anthropic S-1 $120.5B + $40B GPU Financing')}</text>
  ${mb1.svg}
  ${statsSvg}
  ${footer(DATE)}
</svg>`;
  return svg;
}

// ── 7. Summary ───────────────────────────────────────────────────
function makeSummary(ko) {
  const topics = ko ? [
    { n:'1', txt:'SpaceX $40B GPU 파이낸싱 — Apollo·Goldman·KKR·BlackRock · Vera Rubin 2027H1', col:'#60A5FA' },
    { n:'2', txt:'Tesla Q3 EPS $0.48 어닝 비트 · 매출 $28.05B · CapEx $25B→$20B · FSD 1.7M', col:'#EF4444' },
    { n:'3', txt:'FOMC 3.75-4.00% 동결 만장일치 · S&P +0.70% · Nasdaq +0.83%', col:'#F59E0B' },
    { n:'4', txt:'BTC $81,115(+1.4%) · DOGE $0.0787(+2.0%) · 금 $3,995(-0.5%)', col:'#FBBF24' },
    { n:'5', txt:'NVDA: Meta $3B 신규 투자 · Oracle NVL72 Supercluster 수주', col:'#86EFAC' },
    { n:'6', txt:'SPCX: 번스타인 $268 · BofA $275 Buy · $150.33(+2.33%)', col:'#A78BFA' },
  ] : [
    { n:'1', txt:'SpaceX $40B GPU financing — Apollo/Goldman/KKR/BlackRock · Vera Rubin H1 2027', col:'#60A5FA' },
    { n:'2', txt:'Tesla Q3 adj EPS $0.48 beat · Revenue $28.05B · CapEx $20B · FSD 1.7M', col:'#EF4444' },
    { n:'3', txt:'FOMC holds 3.75-4.00% unanimous · S&P +0.70% · Nasdaq +0.83%', col:'#F59E0B' },
    { n:'4', txt:'BTC $81,115 (+1.4%) · DOGE $0.0787 (+2.0%) · Gold $3,995 (-0.5%)', col:'#FBBF24' },
    { n:'5', txt:'NVDA: Meta $3B investment · Oracle NVL72 Supercluster win · $216', col:'#86EFAC' },
    { n:'6', txt:'SPCX: Bernstein $268 · BofA $275 Buy · closes $150.33 (+2.33%)', col:'#A78BFA' },
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
    { top: ko?'어닝':'Earnings', big: ko?'EPS 비트':'EPS Beat', unit: 'TSLA $0.48', sub: ko?'컨센 $0.45 상회':'vs $0.45 est', accent: '#EF4444' },
    { top: ko?'AI 파이낸싱':'AI Financing', big: '$40B', unit: ko?'SpaceX GPU':'SpaceX GPU', sub: ko?'Apollo 리드':'Apollo leads', accent: '#60A5FA' },
    { top: 'SPCX', big: '$150.33', unit: '+2.33%', sub: ko?'목표가 $268~275':'PT $268~275', accent: '#A78BFA' },
  ].map((s,i) => statBox(54+i*340, footerY, 316, 160, s.top, s.big, s.unit, s.sub, s.accent)).join('');

  const count = topics.length;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#08051A','#04021A','#60A5FA','#A78BFA')}
  ${badge(40,24,120,'TSLA','#1A0505','#B91C1C','#FCA5A5')}
  ${badge(178,24,120,'SPCX','#1E1B4B','#6D28D9','#C4B5FD')}
  ${badge(316,24,120,'NVDA','#052E16','#16A34A','#86EFAC')}
  ${badge(454,24,120,'BTC','#1C1400','#B45309','#FCD34D')}
  <text x="540" y="148" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="38" font-weight="900" fill="#E9D5FF">${escXml(ko?'한장요약 2026-10-28':'Daily Summary 2026-10-28')}</text>
  <text x="540" y="196" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#9CA3AF">${escXml(ko?`오늘의 핵심 ${count}가지`:`${count} key stories today`)}</text>
  <line x1="54" y1="220" x2="1026" y2="220" stroke="#A78BFA" stroke-width="2"/>
  <text x="54" y="300" font-family="Arial Black,Arial,sans-serif" font-size="28" font-weight="900" fill="#60A5FA">${escXml(ko?'SpaceX $40B GPU · Tesla Q3 · FOMC 동결 · BTC $81K · NVDA · SPCX':'SpaceX $40B GPU · Tesla Q3 · FOMC Hold · BTC $81K · NVDA · SPCX')}</text>
  <text x="54" y="340" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">${escXml(ko?'2026년 10월 28일 (수) · investus.kr SRP':'October 28, 2026 (Wed) · investus.kr SRP')}</text>
  ${topicsSvg}
  ${statsSvg}
  ${footer(DATE)}
</svg>`;
  return svg;
}

async function main() {
  console.log('Generating 2026-10-28 charts...');

  // 1. SpaceX $40B
  await save(`spacex-40b-gpu-${DATE}`, makeSpaceX40B(true));
  await save(`spacex-40b-gpu-${DATE}-en`, makeSpaceX40B(false));

  // 2. Tesla Q3
  await save(`tsla-q3-earnings-${DATE}`, makeTslaQ3(true));
  await save(`tsla-q3-earnings-${DATE}-en`, makeTslaQ3(false));

  // 3. FOMC
  await save(`fomc-hold-${DATE}`, makeFomc(true));
  await save(`fomc-hold-${DATE}-en`, makeFomc(false));

  // 4. BTC/DOGE/Gold
  await save(`btc-doge-gold-${DATE}`, makeBtcDogeGold(true));
  await save(`btc-doge-gold-${DATE}-en`, makeBtcDogeGold(false));

  // 5. NVDA Meta + Oracle
  await save(`nvda-meta-oracle-${DATE}`, makeNvdaMeta(true));
  await save(`nvda-meta-oracle-${DATE}-en`, makeNvdaMeta(false));

  // 6. SPCX Upgrades
  await save(`spcx-analyst-upgrade-${DATE}`, makeSpcxUpgrade(true));
  await save(`spcx-analyst-upgrade-${DATE}-en`, makeSpcxUpgrade(false));

  // 7. Summary
  await save(`summary-${DATE}`, makeSummary(true));
  await save(`summary-${DATE}-en`, makeSummary(false));

  console.log('✓ All 14 charts generated.');
}

main().catch(e => { console.error(e); process.exit(1); });
