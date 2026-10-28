#!/usr/bin/env node
// Chart generator — 2026-10-29 (목): MSFT/GOOGL earnings · TSLA Cybercab 573 · AWS 3x · Anthropic cash · Gemini 4 · FOMC · Summary
'use strict';
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/charts');
const DATE = '20261029';

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

// ── 1. MSFT Q3 Earnings ──────────────────────────────────────────────
function makeMsftEarnings(ko) {
  const blue = '#60A5FA';
  const green = '#34D399';
  const gold = '#FBBF24';
  const gray = '#9CA3AF';

  const hero = ko
    ? `<text x="540" y="190" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="${blue}" filter="url(#glow)">MSFT Q3 2026</text>
  <text x="540" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="${gray}">어닝 서프라이즈 · Azure 가속</text>`
    : `<text x="540" y="190" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="${blue}" filter="url(#glow)">MSFT Q3 2026</text>
  <text x="540" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="${gray}">Earnings Beat · Azure Acceleration</text>`;

  const stats = [
    statBox(54, 272, 300, 190, ko?'EPS (조정)':'EPS (Adj)', '$4.89', ko?'+4% 비트':'Beat +4%', ko?'예상 $4.72':'vs est $4.72', blue),
    statBox(390, 272, 300, 190, ko?'매출':'Revenue', '$92.2B', ko?'+2% 비트':'Beat +2%', ko?'예상 $90.7B':'vs est $90.7B', blue),
    statBox(726, 272, 300, 190, ko?'주가 반응':'Stock Reaction', '+6.11%', ko?'어닝 후':'Post-Earnings', ko?'당일 상승':'Day return', green),
  ].join('\n');

  const stats2 = [
    statBox(54, 494, 460, 190, ko?'EPS 성장':'EPS Growth', '+18%', ko?'YoY':'YoY', ko?'+3% QoQ':'QoQ +3%', blue),
    statBox(566, 494, 460, 190, ko?'매출 성장':'Revenue Growth', '+19%', ko?'YoY':'YoY', ko?'+3% QoQ':'QoQ +3%', blue),
  ].join('\n');

  const mb1 = msgBox(716, ko?'💡 핵심 드라이버':'💡 Key Drivers', ko?[
    'Azure AI 수요 — 기업 AI 도입 가속, 전망치 상회',
    'Copilot 상용화 — Office 365 기업 구독 단가 상승',
    'EPS +18% YoY — AI 수요 실적 전환 지속 확인',
    '→ 빅테크 어닝 중 가장 깔끔한 숫자',
  ]:[
    'Azure AI demand — enterprise adoption accelerating, ahead of forecast',
    'Copilot monetization — Office 365 enterprise ARPU rising',
    'EPS +18% YoY — AI demand converting to earnings consistently',
    '→ Cleanest print of big-tech earnings season',
  ], blue, '#1E3A5F');

  const mb2 = msgBox(mb1.nextY, ko?'⚠️ 어닝 전 기관 옵션 포착':'⚠️ Pre-Earnings Options Detected', ko?[
    '10월 30일 만기 MSFT 540콜: $572K 스윕',
    '11월 6일 만기 MSFT 540콜: $3.7M 스윕 — 어닝 후 수익',
    '어닝 후: 11월 6일 640콜 $2.7M 추가 포지션',
  ]:[
    'Oct 30 expiry MSFT 540 calls: $572K sweep',
    'Nov 6 expiry MSFT 540 calls: $3.7M sweep — paid off post-earnings',
    'Post-earnings: Nov 6 640 calls $2.7M new position',
  ], gold, '#78350F');

  const header = ko
    ? `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,180,'💰 어닝','rgba(96,165,250,0.15)','#60A5FA','#60A5FA')}
  ${badge(234,78,100,'MSFT','rgba(96,165,250,0.2)','#60A5FA','#F9FAFB')}`
    : `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,180,'💰 Earnings','rgba(96,165,250,0.15)','#60A5FA','#60A5FA')}
  ${badge(234,78,100,'MSFT','rgba(96,165,250,0.2)','#60A5FA','#F9FAFB')}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#0A0F1E','#050A14',blue,'#3B82F6')}
  ${header}
  ${hero}
  ${stats}
  ${stats2}
  ${mb1.svg}
  ${mb2.svg}
  ${footer('MSFT Q3 2026')}
</svg>`;
}

// ── 2. GOOGL Q3 Earnings ──────────────────────────────────────────────
function makeGooglEarnings(ko) {
  const orange = '#FB923C';
  const red = '#F87171';
  const green = '#34D399';
  const gray = '#9CA3AF';

  const hero = ko
    ? `<text x="540" y="190" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="${orange}" filter="url(#glow)">GOOGL Q3 2026</text>
  <text x="540" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="${gray}">실망 서프라이즈 · FCF 연속 적자</text>`
    : `<text x="540" y="190" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="${orange}" filter="url(#glow)">GOOGL Q3 2026</text>
  <text x="540" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="${gray}">Earnings Disappointment · FCF Negative x2</text>`;

  const stats = [
    statBox(54, 272, 300, 190, ko?'주가 반응':'Stock Reaction', '-9%', ko?'어닝 발표 후':'Post-Earnings', ko?'당일 급락':'Day decline', red),
    statBox(390, 272, 300, 190, ko?'영업마진':'Op. Margin', '31.8%', ko?'Q2 34%에서 하락':'Down from Q2 34%', ko?'마진 압박':'Margin pressure', orange),
    statBox(726, 272, 300, 190, ko?'Q3 FCF':'Q3 FCF', '-$9.1B', ko?'2분기 연속':'2nd Straight -', ko?'Q2: -$5.9B':'Q2: -$5.9B', red),
  ].join('\n');

  const stats2 = [
    statBox(54, 494, 300, 190, ko?'매출':'Revenue', '$127.6B', ko?'+25% YoY':'YoY +25%', ko?'예상 대비 인라인':'~Inline vs est', orange),
    statBox(390, 494, 300, 190, ko?'Google Cloud':'Google Cloud', '$30.7B', ko?'+5% 예상 초과':'Beat +5% vs est', ko?'Cloud 강세':'Cloud strong', green),
    statBox(726, 494, 300, 190, ko?'Capex 변화':'Capex Change', '×2배', ko?'1년 만에 두 배':'YoY doubled', ko?'AI 인프라 투자':'AI infra invest', red),
  ].join('\n');

  const mb1 = msgBox(716, ko?'📊 FCF 추이':'📊 FCF Quarterly Trend', ko?[
    'Q2 2026: -$5.9B  ←  2분기 연속 음수 FCF',
    'Q3 2026: -$9.1B  ←  악화 추세',
    'Q3 2025: +$24.5B  vs  Q3 2026: -$9.1B',
    '→ AI 인프라 CapEx 급증이 현금 흐름 역전',
  ]:[
    'Q2 2026: -$5.9B  ←  2nd straight negative',
    'Q3 2026: -$9.1B  ←  worsening trend',
    'Q3 2025: +$24.5B  vs  Q3 2026: -$9.1B',
    '→ AI infra CapEx surge reversed free cash flow',
  ], red, '#7F1D1D');

  const mb2 = msgBox(mb1.nextY, ko?'⚠️ 투자 관건 — Gemini 4가 이익 전환의 키':'⚠️ Key Question — Will Gemini 4 Deliver?', ko?[
    'Cloud +103% — AI 수요 강세 확인',
    'Search 광고 $63.4B — 예상 -2% 하회 · 구조적 둔화 우려',
    'Gemini 4 Carbon 96% long-context — 기업 고객 채택 속도가 관건',
    '→ Capex 두 배 투자의 성과를 2027년 어닝에서 검증해야',
  ]:[
    'Cloud +103% — AI demand confirmed strong',
    'Search Ads $63.4B — miss vs est -2%, structural slowdown fears',
    'Gemini 4 Carbon 96% long-context — enterprise adoption pace is key',
    '→ The doubled CapEx must show returns in 2027 earnings',
  ], orange, '#7C2D12');

  const header = ko
    ? `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,180,'💰 어닝','rgba(251,146,60,0.15)','#FB923C','#FB923C')}
  ${badge(234,78,120,'GOOGL','rgba(251,146,60,0.2)','#FB923C','#F9FAFB')}`
    : `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,180,'💰 Earnings','rgba(251,146,60,0.15)','#FB923C','#FB923C')}
  ${badge(234,78,120,'GOOGL','rgba(251,146,60,0.2)','#FB923C','#F9FAFB')}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#120A02','#0A0500',orange,'#EA580C')}
  ${header}
  ${hero}
  ${stats}
  ${stats2}
  ${mb1.svg}
  ${mb2.svg}
  ${footer('GOOGL Q3 2026')}
</svg>`;
}

// ── 3. TSLA Cybercab vs Waymo ──────────────────────────────────────────────
function makeTslaCybercabWaymo(ko) {
  const red = '#F87171';
  const redD = '#EF4444';
  const gray = '#9CA3AF';
  const green = '#34D399';

  const hero = ko
    ? `<text x="540" y="190" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="56" font-weight="900" fill="${red}" filter="url(#glow)">Cybercab 573대</text>
  <text x="540" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="${gray}">텍사스 DMV 기준 · 지난주 +222대 추가</text>`
    : `<text x="540" y="190" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="56" font-weight="900" fill="${red}" filter="url(#glow)">Cybercab 573 Units</text>
  <text x="540" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="${gray}">Texas DMV · +222 Added Last Week</text>`;

  const stats = [
    statBox(54, 272, 300, 190, ko?'TSLA Cybercab 단가':'TSLA Cybercab Cost', '$25K', ko?'대당 비용':'per unit', ko?'vs Waymo 7배 저렴':'7x cheaper vs Waymo', red),
    statBox(390, 272, 300, 190, ko?'Waymo 평균 단가':'Waymo Avg Cost', '$175K', ko?'대당 비용':'per unit', ko?'Jaguar $200K / Zeekr $125K':'Jaguar $200K / Zeekr $125K', gray),
    statBox(726, 272, 300, 190, ko?'플릿 비용 차이':'Fleet Cost Diff', '7×', ko?'1,000대 기준':'per 1,000 units', ko?'$25M vs $175M':'$25M vs $175M', green),
  ].join('\n');

  // Bar chart for fleet size comparison
  const barSection = `
  <text x="54" y="510" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">${ko?'등록 대수 비교 (Texas DMV)':'Registered Fleet (Texas DMV)'}</text>
  <text x="54" y="544" font-family="Arial,sans-serif" font-size="22" fill="${gray}">${ko?'Cybercab':'Cybercab'}</text>
  <rect x="54" y="558" width="472" height="44" rx="8" fill="${redD}"/>
  <text x="540" y="587" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#F9FAFB">573</text>
  <text x="54" y="634" font-family="Arial,sans-serif" font-size="22" fill="${gray}">${ko?'Waymo':'Waymo'}</text>
  <rect x="54" y="648" width="992" height="44" rx="8" fill="rgba(156,163,175,0.3)"/>
  <rect x="54" y="648" width="992" height="44" rx="8" fill="none" stroke="${gray}" stroke-width="1.5"/>
  <text x="1060" y="677" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="${gray}">1,207</text>`;

  const mb1 = msgBox(730, ko?'💡 비용 구조 비교 (1,000대 기준)':'💡 Fleet Cost Comparison (per 1,000 units)', ko?[
    'Tesla Cybercab: $25K × 1,000 = $25M',
    'Waymo Jaguar I-PACE: $200K × 812대 → Zeekr Ojai: $125K × 395대',
    'Waymo 평균 $175K × 1,000 = $175M',
    '→ 7배 차이: 규모 확장할수록 Tesla 원가 우위 극대화',
  ]:[
    'Tesla Cybercab: $25K × 1,000 = $25M',
    'Waymo Jaguar I-PACE: $200K × 812 → Zeekr Ojai: $125K × 395',
    'Waymo avg $175K × 1,000 = $175M',
    '→ 7x gap: cost advantage compounds with scale',
  ], red, '#7F1D1D');

  const mb2 = msgBox(mb1.nextY, ko?'📈 추가 페이스 분석':'📈 Pace Analysis', ko?[
    '10월 24일: 970대 (Cybercab 463, Model Y 507)',
    '10월 27일: 1,051대 (Cybercab 544, Model Y 507)',
    '10월 29일: Cybercab 573대 (+29대)',
    '→ +13대/일 페이스 유지 시 와이모 역전 임박',
  ]:[
    'Oct 24: 970 total (Cybercab 463, Model Y 507)',
    'Oct 27: 1,051 total (Cybercab 544, Model Y 507)',
    'Oct 29: Cybercab 573 (+29)',
    '→ At +13/day pace, Waymo overtake approaching fast',
  ], red, '#7F1D1D');

  const header = ko
    ? `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,180,'🔍 종목분析','rgba(248,113,113,0.15)','#F87171','#F87171')}
  ${badge(234,78,100,'TSLA','rgba(239,68,68,0.2)','#EF4444','#F9FAFB')}`
    : `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,220,'🔍 Stock Analysis','rgba(248,113,113,0.15)','#F87171','#F87171')}
  ${badge(274,78,100,'TSLA','rgba(239,68,68,0.2)','#EF4444','#F9FAFB')}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#140808','#0A0404',redD,'#F87171')}
  ${header}
  ${hero}
  ${stats}
  ${barSection}
  ${mb1.svg}
  ${mb2.svg}
  ${footer('TSLA Robotaxi')}
</svg>`;
}

// ── 4. Tesla Optimus Robot University ──────────────────────────────────────────────
function makeTslaOptimus(ko) {
  const red = '#F87171';
  const redD = '#EF4444';
  const purple = '#C084FC';
  const gray = '#9CA3AF';

  const hero = ko
    ? `<text x="540" y="185" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="46" font-weight="900" fill="${red}" filter="url(#glow)">Optimus 로봇 유니버시티</text>
  <text x="540" y="235" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="${gray}">팔로알토 · 24파운드 슈트 · 40카메라 · 24/7</text>`
    : `<text x="540" y="185" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="46" font-weight="900" fill="${red}" filter="url(#glow)">Optimus Robot University</text>
  <text x="540" y="235" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="${gray}">Palo Alto · 24lb Suit · 40 Cameras · 24/7</text>`;

  const stats = [
    statBox(54, 272, 300, 190, ko?'카메라 수':'Camera Count', '40', ko?'개 카메라':'cameras', ko?'vs Tesla 차량 9개':'vs Tesla car: 9', red),
    statBox(390, 272, 300, 190, ko?'슈트 무게':'Suit Weight', '24lb', ko?'약 11kg':'~11kg', ko?'3D 센서 내장':'3D sensors built-in', red),
    statBox(726, 272, 300, 190, ko?'운영 방식':'Operations', '24/7', ko?'3교대 운영':'3 shifts', ko?'365일 데이터 수집':'365 days/year', purple),
  ].join('\n');

  const mb1 = msgBox(494, ko?'🤖 시설 운영 방식':'🤖 How The Facility Works', ko?[
    '작업자: 24파운드 슈트 착용, 40개 카메라+3D 센서 그리드',
    '로봇이 수행할 동작을 직접 재현 → 초고밀도 데이터 수집',
    '3교대 24시간 — 멈추지 않는 데이터 파이프라인',
    '다양한 팀: 각 과제 독립 수행, 서로 연결 모름',
    '가정 팀: 샌드위치 만들기 등 일상 동작',
    '공장 팀: HVAC 설치 등 산업 동작',
  ]:[
    'Workers: 24lb suit, 40 cameras + 3D sensor grid',
    'Mirror robot motions → ultra-dense data capture',
    '3 shifts, 24/7 — non-stop data pipeline',
    'Multiple teams, each working independently (siloed)',
    'Home team: sandwich making, daily activities',
    'Factory team: HVAC install, industrial tasks',
  ], red, '#7F1D1D');

  const mb2 = msgBox(mb1.nextY, ko?'📡 데이터 플라이휠 — Tesla 자동차 대비':'📡 Data Flywheel vs Tesla Vehicles', ko?[
    'Tesla 차량 카메라: 9개  →  Optimus 슈트: 40개 (4.4배)',
    '24/7 수집으로 플리트 배포 없이도 데이터 폭증',
    'FSD 플라이휠과 동일한 구조 — 데이터가 모델 개선을 부르는 사이클',
    '→ Elon: "장난치는 게 아니다" (Robert Scoble 인용)',
  ]:[
    'Tesla vehicle cameras: 9  →  Optimus suit: 40 (4.4x)',
    '24/7 collection without fleet deployment — data explosion',
    'Same structure as FSD flywheel — data → model → more data',
    '→ Elon: "not playing around" (via Robert Scoble)',
  ], purple, '#4C1D95');

  const mb3 = msgBox(mb2.nextY, ko?'💡 의미':'💡 Why It Matters', ko?[
    '학습 데이터 규모 → Optimus 상용화 타임라인 결정',
    'Robotaxi처럼 "데이터가 먼저 → 제품이 따라온다" 공식',
    '→ 아크인베스트: Optimus 데이터 플라이휠 경쟁사 대비 압도적',
  ]:[
    'Training data scale determines Optimus commercialization timeline',
    'Same playbook as Robotaxi: data first → product follows',
    '→ ARK: Optimus data flywheel dominates vs competition',
  ], red, '#7F1D1D');

  const header = ko
    ? `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,180,'🔍 종목분析','rgba(248,113,113,0.15)','#F87171','#F87171')}
  ${badge(234,78,100,'TSLA','rgba(239,68,68,0.2)','#EF4444','#F9FAFB')}`
    : `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,220,'🔍 Stock Analysis','rgba(248,113,113,0.15)','#F87171','#F87171')}
  ${badge(274,78,100,'TSLA','rgba(239,68,68,0.2)','#EF4444','#F9FAFB')}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#140808','#0A0404',redD,'#C084FC')}
  ${header}
  ${hero}
  ${stats}
  ${mb1.svg}
  ${mb2.svg}
  ${mb3.svg}
  ${footer('TSLA Optimus')}
</svg>`;
}

// ── 5. SPCX Volume Rank ──────────────────────────────────────────────
function makeSpcxVolumeRank(ko) {
  const blue = '#60A5FA';
  const blueD = '#2563EB';
  const gold = '#FBBF24';
  const gray = '#9CA3AF';

  const hero = ko
    ? `<text x="540" y="190" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="${blue}" filter="url(#glow)">SPCX 주간 거래량</text>
  <text x="540" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="${gray}">ETF 제외 1위 × 2회 · 기관 매집 패턴</text>`
    : `<text x="540" y="190" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="${blue}" filter="url(#glow)">SPCX Weekly Volume</text>
  <text x="540" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="${gray}">#1 ex-ETFs Twice · Institutional Accumulation</text>`;

  // Volume table
  const tableData = [
    { date: ko?'10/20 (화)':'Oct 20', rank: '2위', vol: '8,935만주', px: '$147.79', chg: '-0.11%' },
    { date: ko?'10/21 (수)':'Oct 21', rank: '1위', vol: '2억1,737만주', px: '$159.31', chg: '+7.79%' },
    { date: ko?'10/22 (목)':'Oct 22', rank: '2위', vol: '1억9,381만주', px: '$144.75', chg: '-9.14%' },
    { date: ko?'10/23 (금)':'Oct 23', rank: '1위', vol: '1억945만주', px: '$147.49', chg: '+1.89%' },
    { date: ko?'10/26 (월)':'Oct 26', rank: '5위', vol: '1억244만주', px: '$146.90', chg: '-0.40%' },
    { date: ko?'10/27 (화)':'Oct 27', rank: '3위', vol: '9,484만주', px: '$148.58', chg: '+1.14%' },
  ];

  const tableY = 272;
  let tableSvg = `<text x="54" y="${tableY-14}" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="#F9FAFB">${ko?'일별 거래량 순위 (ETF 제외)':'Daily Volume Rank (ex-ETFs)'}</text>`;
  tableData.forEach((row, i) => {
    const y = tableY + i * 58;
    const isRank1 = row.rank === '1위' || row.rank === '#1';
    const bgFill = isRank1 ? 'rgba(37,99,235,0.25)' : (i%2===0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)');
    const rankColor = isRank1 ? gold : (row.rank === '2위' || row.rank === '#2' ? blue : gray);
    tableSvg += `<rect x="54" y="${y}" width="972" height="54" rx="8" fill="${bgFill}"/>`;
    if (isRank1) tableSvg += `<rect x="54" y="${y}" width="972" height="54" rx="8" fill="none" stroke="${blueD}" stroke-width="1.5"/>`;
    tableSvg += `<text x="80" y="${y+34}" font-family="Arial,sans-serif" font-size="20" fill="${gray}">${escXml(row.date)}</text>`;
    tableSvg += `<text x="240" y="${y+34}" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${rankColor}">${escXml(row.rank)}</text>`;
    tableSvg += `<text x="360" y="${y+34}" font-family="Arial,sans-serif" font-size="20" fill="#F9FAFB">${escXml(row.vol)}</text>`;
    tableSvg += `<text x="720" y="${y+34}" font-family="Arial,sans-serif" font-size="20" fill="${gray}">${escXml(row.px)}</text>`;
    const chgColor = row.chg.startsWith('+') ? '#34D399' : '#F87171';
    tableSvg += `<text x="860" y="${y+34}" font-family="Arial,sans-serif" font-size="20" fill="${chgColor}">${escXml(row.chg)}</text>`;
  });

  const mb1 = msgBox(tableY + tableData.length * 58 + 20, ko?'💡 기관 매집 시그널 해석':'💡 Institutional Accumulation Signal', ko?[
    '1위 × 2회 = 이벤트가 아닌 지속적 기관 수요',
    '$144~$148 좁은 구간 유지 — 가격 안 올리고 물량 흡수',
    '2억 주 이상 거래에도 주가 흔들림 없음',
    '→ 13F 분기 공시에서 대형 기관 포지션 확인 예정',
  ]:[
    '#1 twice = not an event, sustained institutional demand',
    '$144-$148 tight range — absorbing shares without moving price',
    '200M+ shares traded with minimal price impact',
    '→ Confirm large institutional position in Q-end 13F filings',
  ], blue, '#1E3A5F');

  const header = ko
    ? `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,180,'🔍 종목분析','rgba(96,165,250,0.15)','#60A5FA','#60A5FA')}
  ${badge(234,78,100,'SPCX','rgba(37,99,235,0.2)','#2563EB','#F9FAFB')}`
    : `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,220,'🔍 Stock Analysis','rgba(96,165,250,0.15)','#60A5FA','#60A5FA')}
  ${badge(274,78,100,'SPCX','rgba(37,99,235,0.2)','#2563EB','#F9FAFB')}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#060B18','#030509',blueD,'#60A5FA')}
  ${header}
  ${hero}
  ${tableSvg}
  ${mb1.svg}
  ${footer('SPCX Volume')}
</svg>`;
}

// ── 6. SPCX Starlink FCC ──────────────────────────────────────────────
function makeSpcxStarlinkFcc(ko) {
  const blue = '#60A5FA';
  const blueD = '#2563EB';
  const green = '#34D399';
  const gray = '#9CA3AF';

  const hero = ko
    ? `<text x="540" y="185" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="${blue}" filter="url(#glow)">Starlink FCC 482 MHz</text>
  <text x="540" y="235" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="${gray}">위성-전화 주파수 추가 신청 · ABS Jets 1Gbps 첫 설치</text>`
    : `<text x="540" y="185" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="${blue}" filter="url(#glow)">Starlink FCC 482 MHz</text>
  <text x="540" y="235" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="${gray}">Satellite-to-Phone Spectrum · ABS Jets 1Gbps First Install</text>`;

  const stats = [
    statBox(54, 272, 300, 190, ko?'추가 주파수':'Additional Spectrum', '482', ko?'MHz 추가 신청':'MHz Requested', ko?'FCC 투표 예정':'FCC vote upcoming', blue),
    statBox(390, 272, 300, 190, ko?'신청 대역':'Band Proposed', '902-928', ko?'MHz ISM 대역':'MHz ISM band', ko?'유연 면허 방식':'Flexible-use license', blue),
    statBox(726, 272, 300, 190, ko?'항공기 탑재':'Aviation Install', '1Gbps', ko?'ABS Jets 첫 설치':'ABS Jets 1st install', ko?'Legacy 650 기종':'Legacy 650', green),
  ].join('\n');

  const mb1 = msgBox(494, ko?'📡 FCC 신청 핵심 내용':'📡 FCC Petition Details', ko?[
    '대상: 위성-전화(Satellite-to-Phone) 서비스용 주파수',
    '신청 방식: 902~928 MHz ISM 대역 유연 면허',
    'Verizon·AT&T: 전체 482 MHz 중 290 MHz 희망',
    '효과: 음영 지역 해소 → 문자→실제 데이터 서비스 확장',
  ]:[
    'Target: Spectrum for Satellite-to-Phone service',
    'Method: 902-928 MHz ISM band flexible-use license',
    'Carriers want 290 MHz of 482 MHz split',
    'Effect: Eliminate dead zones → Text to real data service',
  ], blue, '#1E3A5F');

  const mb2 = msgBox(mb1.nextY, ko?'✈️ ABS Jets — Starlink Aviation 첫 설치':'✈️ ABS Jets — First Starlink Aviation Install', ko?[
    'ABS Jets: Starlink 공인 딜러 인증 완료',
    'Legacy 650 기종 첫 설치 완료 (최대 1Gbps 다운로드)',
    'Starlink Aviation Performance Kit 적용',
    '→ 고급 비즈니스 항공기 연결성 수요 강세 확인',
  ]:[
    'ABS Jets: Certified as official Starlink dealer',
    'First Legacy 650 install completed (up to 1Gbps)',
    'Starlink Aviation Performance Kit deployed',
    '→ Confirms strong demand for premium bizjet connectivity',
  ], green, '#064E3B');

  const mb3 = msgBox(mb2.nextY, ko?'💡 SPCX 수익화 함의':'💡 SPCX Revenue Implications', ko?[
    'FCC 승인 → Starlink 위성 통신 대역폭 대폭 확대',
    '기존 기기 호환 가능 → 신규 단말 없이 서비스 확장',
    '스마트폰 기본 위성 연결 표준화 시나리오',
    '→ Starlink ARR 상방 요인 추가',
  ]:[
    'FCC approval → Starlink satellite bandwidth dramatically expanded',
    'ISM band compatible with existing devices → no new hardware needed',
    'Smartphone default satellite connectivity standardization scenario',
    '→ Additional upside factor for Starlink ARR',
  ], blue, '#1E3A5F');

  const header = ko
    ? `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,180,'🔍 종목분析','rgba(96,165,250,0.15)','#60A5FA','#60A5FA')}
  ${badge(234,78,100,'SPCX','rgba(37,99,235,0.2)','#2563EB','#F9FAFB')}`
    : `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,220,'🔍 Stock Analysis','rgba(96,165,250,0.15)','#60A5FA','#60A5FA')}
  ${badge(274,78,100,'SPCX','rgba(37,99,235,0.2)','#2563EB','#F9FAFB')}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#020814','#020510',blueD,'#60A5FA')}
  ${header}
  ${hero}
  ${stats}
  ${mb1.svg}
  ${mb2.svg}
  ${mb3.svg}
  ${footer('SPCX Starlink')}
</svg>`;
}

// ── 7. AWS Triple ──────────────────────────────────────────────
function makeAwsTriple(ko) {
  const orange = '#FB923C';
  const orangeD = '#EA580C';
  const blue = '#60A5FA';
  const gray = '#9CA3AF';

  const hero = ko
    ? `<text x="540" y="190" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="${orange}" filter="url(#glow)">AWS 2028E $373.6B</text>
  <text x="540" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="${gray}">모건스탠리 전망 · 2025년 대비 약 3배</text>`
    : `<text x="540" y="190" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="${orange}" filter="url(#glow)">AWS 2028E $373.6B</text>
  <text x="540" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="${gray}">Morgan Stanley Forecast · ~3x from 2025</text>`;

  // Bar chart for AWS revenue growth
  const bars = [
    { year:'2024', val:107.6, pct:'+19%', actual:true },
    { year:'2025', val:128.7, pct:'+20%', actual:true },
    { year:'2026E', val:178.3, pct:'+38%', actual:false },
    { year:'2027E', val:262.3, pct:'+47%', actual:false },
    { year:'2028E', val:373.6, pct:'+42%', actual:false },
  ];
  const maxVal = 373.6;
  const barAreaW = 960;
  const barW = 150;
  const barGap = (barAreaW - bars.length * barW) / (bars.length - 1);
  let barsSvg = `<text x="54" y="278" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#F9FAFB">${ko?'AWS 연간 매출 추이 (B$)':'AWS Annual Revenue (B$)'}</text>`;
  bars.forEach((b, i) => {
    const x = 60 + i * (barW + barGap);
    const barH = Math.round((b.val / maxVal) * 480);
    const y = 820 - barH;
    const fill = b.actual ? 'rgba(251,146,60,0.5)' : orange;
    const border = b.actual ? '#F97316' : orangeD;
    barsSvg += `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="8" fill="${fill}" stroke="${border}" stroke-width="2"/>`;
    barsSvg += `<text x="${x+barW/2}" y="${y-8}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${orange}">$${b.val}B</text>`;
    barsSvg += `<text x="${x+barW/2}" y="845" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="${gray}">${b.year}</text>`;
    barsSvg += `<text x="${x+barW/2}" y="870" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="${b.actual?gray:orange}">${b.pct}</text>`;
  });

  const mb1 = msgBox(920, ko?'💡 3배 성장 시나리오 핵심 가정':'💡 Key Assumptions for 3x Growth', ko?[
    'AI 워크로드 퍼블릭 클라우드 집중 지속',
    'Anthropic $110B AWS 컴퓨팅 계약 2026~2028 집행',
    'Trainium 자체 칩 + GPU 확보로 공급 병목 해소',
    '→ 2026~2028 CAGR ~42%: 현재 시장 컨센서스 초과',
  ]:[
    'AI workloads continue concentrating in public cloud',
    'Anthropic $110B AWS compute contract executes 2026-2028',
    'Trainium + GPU procurement eliminates supply bottlenecks',
    '→ CAGR ~42% 2026-2028: well above current market consensus',
  ], orange, '#7C2D12');

  const header = ko
    ? `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,180,'🏭 섹터','rgba(251,146,60,0.15)','#FB923C','#FB923C')}
  ${badge(234,78,100,'AMZN','rgba(234,88,12,0.2)','#EA580C','#F9FAFB')}`
    : `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,140,'🏭 Sector','rgba(251,146,60,0.15)','#FB923C','#FB923C')}
  ${badge(194,78,100,'AMZN','rgba(234,88,12,0.2)','#EA580C','#F9FAFB')}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#110800','#080400',orangeD,orange)}
  ${header}
  ${hero}
  ${barsSvg}
  ${mb1.svg}
  ${footer('AWS 2028 Forecast · Morgan Stanley')}
</svg>`;
}

// ── 8. Anthropic Cash ──────────────────────────────────────────────
function makeAnthropicCash(ko) {
  const purple = '#C084FC';
  const purpleD = '#7C3AED';
  const blue = '#60A5FA';
  const gold = '#FBBF24';
  const gray = '#9CA3AF';

  const hero = ko
    ? `<text x="540" y="190" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="${purple}" filter="url(#glow)">Anthropic $131.7B</text>
  <text x="540" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="${gray}">미국 비금융 기업 현금 3위 · Berkshire·Alphabet 다음</text>`
    : `<text x="540" y="190" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="${purple}" filter="url(#glow)">Anthropic $131.7B</text>
  <text x="540" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="${gray}">#3 US Non-Bank Cash · Behind Berkshire &amp; Alphabet Only</text>`;

  // Ranking bar chart
  const rankings = [
    { name:'Berkshire', val:365.5, color:gold },
    { name:'Alphabet', val:242.5, color:blue },
    { name:'Anthropic', val:131.7, color:purple },
    { name:'Amazon', val:123, color:'#34D399' },
    { name:ko?'SpaceX (SPCX)':'SpaceX (SPCX)', val:100, color:'#60A5FA' },
    { name:'Meta', val:90.3, color:'#818CF8' },
    { name:'Microsoft', val:76.8, color:'#60A5FA' },
    { name:'NVDA', val:62.5, color:'#34D399' },
  ];
  const maxVal = 365.5;
  let rankSvg = `<text x="54" y="278" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="#F9FAFB">${ko?'미국 비금융 기업 현금 순위 (B$)':'US Non-Bank Cash Rankings (B$)'}</text>`;
  rankings.forEach((r, i) => {
    const y = 300 + i * 64;
    const barW = Math.round((r.val / maxVal) * 780);
    const isAnthropicRow = r.name === 'Anthropic';
    const rowFill = isAnthropicRow ? 'rgba(168,85,247,0.15)' : 'transparent';
    rankSvg += `<rect x="54" y="${y-4}" width="972" height="54" rx="6" fill="${rowFill}"/>`;
    rankSvg += `<text x="64" y="${y+30}" font-family="Arial Black,Arial,sans-serif" font-size="20" font-weight="${isAnthropicRow?'900':'400'}" fill="${isAnthropicRow?r.color:'#F9FAFB'}">${i+1}. ${r.name}</text>`;
    rankSvg += `<rect x="310" y="${y+2}" width="${barW}" height="36" rx="6" fill="${r.color}" opacity="${isAnthropicRow?'1':'0.5'}"/>`;
    rankSvg += `<text x="${310+barW+8}" y="${y+26}" font-family="Arial Black,Arial,sans-serif" font-size="20" font-weight="900" fill="${r.color}">$${r.val}B</text>`;
  });

  const mb1 = msgBox(300 + rankings.length * 64 + 20, ko?'💡 왜 중요한가':'💡 Why It Matters', ko?[
    'AI 스타트업 창업 6년 만에 비금융 기업 현금 3위',
    'Amazon·SpaceX·Meta·Microsoft·NVDA·Apple 모두 제침',
    '$265.6B 미래 약정의 절반 수준 — SpaceX AI 컴퓨팅 46% 포함',
    '→ SpaceX 수익 가시성이 S-1 공식 문서로 확인됨',
  ]:[
    'AI startup, 6 years old: #3 non-bank cash in America',
    'Ahead of Amazon, SpaceX, Meta, Microsoft, NVDA, Apple',
    '$131.7B covers ~half of $265.6B future commitments',
    '→ SpaceX AI compute revenue confirmed in SEC filing',
  ], purple, '#4C1D95');

  const header = ko
    ? `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,180,'🚨 BREAKING','rgba(192,132,252,0.15)','#C084FC','#C084FC')}
  ${badge(234,78,100,'SPCX','rgba(124,58,237,0.2)','#7C3AED','#F9FAFB')}`
    : `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,200,'🚨 BREAKING','rgba(192,132,252,0.15)','#C084FC','#C084FC')}
  ${badge(254,78,100,'SPCX','rgba(124,58,237,0.2)','#7C3AED','#F9FAFB')}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#0A0514','#050210',purpleD,purple)}
  ${header}
  ${hero}
  ${rankSvg}
  ${mb1.svg}
  ${footer('Anthropic S-1 · CNBC')}
</svg>`;
}

// ── 9. Gemini 4 Carbon ──────────────────────────────────────────────
function makeGemini4(ko) {
  const blue = '#60A5FA';
  const blueD = '#2563EB';
  const orange = '#FB923C';
  const green = '#34D399';
  const gray = '#9CA3AF';

  const hero = ko
    ? `<text x="540" y="190" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="${blue}" filter="url(#glow)">Gemini 4 Carbon</text>
  <text x="540" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="${gray}">장문 맥락 96% · SWE-sweep 9.6% · 에이전틱 SOTA</text>`
    : `<text x="540" y="190" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="${blue}" filter="url(#glow)">Gemini 4 Carbon</text>
  <text x="540" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="${gray}">96% Long-Context · 9.6% SWE-sweep · Agentic SOTA</text>`;

  const stats = [
    statBox(54, 272, 300, 190, ko?'장문 맥락':'Long-Context', '96%', ko?'경쟁 모델 ~70%':'Rivals ~70%', ko?'업계 최고 수준':'Industry leading', green),
    statBox(390, 272, 300, 190, ko?'SWE-sweep':'SWE-sweep', '9.6%', ko?'경쟁 4.3% 대비 2배':'vs rivals 4.3% (2x)', ko?'코딩 에이전트':'Coding agent', blue),
    statBox(726, 272, 300, 190, ko?'Vals Index v5.0':'Vals Index v5.0', '59', ko?'GPT-4 Atlas 67점':'GPT-4 Atlas: 67', ko?'Claude Opus 5.5: 58':'Claude Opus 5.5: 58', orange),
  ].join('\n');

  const mb1 = msgBox(494, ko?'📊 주요 벤치마크':'📊 Key Benchmarks', ko?[
    'FrontierMath 2.0 (에이전틱): 61.2% vs 55.0%',
    'Terminal-Bench 4.0: 65.2% vs 57%',
    'OSWorld 2.1: 81.5% vs 74.7%',
    'Agents\' Last Exam v1.1: 77.4%',
  ]:[
    'FrontierMath 2.0 (Agentic): 61.2% vs 55.0%',
    'Terminal-Bench 4.0: 65.2% vs 57%',
    'OSWorld 2.1: 81.5% vs 74.7%',
    'Agents\' Last Exam v1.1: 77.4%',
  ], blue, '#1E3A5F');

  const mb2 = msgBox(mb1.nextY, ko?'💡 기업 고객 함의':'💡 Enterprise Implications', ko?[
    '장문 맥락 96%: 수천 페이지 문서 한번에 처리',
    '법률·의료·엔지니어링 업무 자동화 실수요 겨냥',
    'Google Cloud +103% 성장에 Gemini 4 효과 추가 기대',
    '→ GOOGL 어닝 미스 극복의 열쇠가 Gemini 4 기업 채택',
  ]:[
    '96% long-context: process thousands of pages at once',
    'Targets law, medicine, engineering enterprise workflows',
    'Google Cloud +103% growth + Gemini 4 enterprise effect incoming',
    '→ Gemini 4 enterprise adoption is the key to GOOGL recovery',
  ], blue, '#1E3A5F');

  const mb3 = msgBox(mb2.nextY, ko?'⚠️ 주의 — Vals Index 59 vs GPT-4 Atlas 67':'⚠️ Caveat — Vals Index 59 vs GPT-4 Atlas 67', ko?[
    '종합 랭킹에서 GPT-4 Atlas(67)보다 낮은 수치',
    '장문 맥락 특화 성능은 업계 1위, 전반적 종합은 2위권',
    '→ 특화 모델 vs 종합 모델 포지셔닝 차이',
  ]:[
    'Overall Vals Index 59 trails GPT-4 Atlas 67',
    'Best in class for long-context, 2nd-tier on overall composite',
    '→ Specialized vs generalist model positioning tradeoff',
  ], orange, '#7C2D12');

  const header = ko
    ? `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,180,'🔍 종목분析','rgba(96,165,250,0.15)','#60A5FA','#60A5FA')}
  ${badge(234,78,120,'GOOGL','rgba(37,99,235,0.2)','#2563EB','#F9FAFB')}`
    : `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,220,'🔍 Stock Analysis','rgba(96,165,250,0.15)','#60A5FA','#60A5FA')}
  ${badge(274,78,120,'GOOGL','rgba(37,99,235,0.2)','#2563EB','#F9FAFB')}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#030A18','#020610',blueD,blue)}
  ${header}
  ${hero}
  ${stats}
  ${mb1.svg}
  ${mb2.svg}
  ${mb3.svg}
  ${footer('Gemini 4 Carbon · Google')}
</svg>`;
}

// ── 10. FOMC Warsh ──────────────────────────────────────────────
function makeFomcWarsh(ko) {
  const mint = '#34D399';
  const mintD = '#059669';
  const gold = '#FBBF24';
  const gray = '#9CA3AF';

  const hero = ko
    ? `<text x="540" y="185" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="${mint}" filter="url(#glow)">Fed FOMC 구조 개편</text>
  <text x="540" y="235" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="${gray}">Warsh 의장 · 투표권 1명 축소 · 회의 8→6회</text>`
    : `<text x="540" y="185" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="${mint}" filter="url(#glow)">Fed FOMC Restructure</text>
  <text x="540" y="235" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="${gray}">Chair Warsh · -1 Voter · Meetings 8→6</text>`;

  const stats = [
    statBox(54, 272, 300, 190, ko?'투표권 위원':'Voting Members', '-1명', ko?'2027년 가을부터':'From Fall 2027', ko?'결정 집중도 강화':'More concentrated', mint),
    statBox(390, 272, 300, 190, ko?'연간 회의':'Annual Meetings', '8→6', ko?'2028년부터':'From 2028', ko?'2회 전략 회의로 전환':'2 become strategy sessions', mint),
    statBox(726, 272, 300, 190, ko?'현재 기조':'Current Stance', '관망', ko?'Wait and See':'Wait and See', ko?'인플레이션 여전히 높음':'Inflation still elevated', gold),
  ].join('\n');

  const mb1 = msgBox(494, ko?'📋 Warsh 의장 주요 발언':'📋 Chair Warsh Key Statements', ko?[
    '"통화 의학이 효과를 내기 시작하고 있다" — 압도적 내부 공감대',
    '"금융 여건이 빡빡하다고 부르기를 꺼리고 꺼린다"',
    '"미국 인플레이션은 여전히 높다"',
    '"Fed는 지켜보며 기다리는 모드"',
  ]:[
    '"Monetary medicine is starting to work" — overwhelming consensus',
    '"Unwilling and unable to call financial conditions tight"',
    '"US inflation remains elevated"',
    '"Fed is in wait and see mode"',
  ], mint, '#064E3B');

  const mb2 = msgBox(mb1.nextY, ko?'💡 구조 변경이 의미하는 것':'💡 What the Restructure Means', ko?[
    '회의 6회: 정책 변경 빈도 낮아짐 → 신중한 속도',
    '투표권 -1명: 다수결 형성 더 어려워질 가능성',
    '2회 전략 회의: 장기 프레임 논의 강화',
    '→ 단기 금리 변동 줄어들고 시장 예측 가능성 변화',
  ]:[
    '6 meetings: Less frequent policy changes → more deliberate pace',
    '-1 voter: Majority formation potentially harder',
    '2 strategy sessions: More focus on long-term framework',
    '→ Fewer near-term rate moves, shift in market predictability',
  ], mint, '#064E3B');

  const mb3 = msgBox(mb2.nextY, ko?'🔮 2025~2027년 금리 경로 전망':'🔮 Rate Path Outlook 2025-2027', ko?[
    '2025년: 인하 3회 기시행 (골드만삭스 기준)',
    '2026년~2027년: 동결 유지 기조',
    'Warsh 취임 후 데이터 의존적 기조 강화',
    '→ 포워드 가이던스 감소 → 각 회의마다 민감도 상승',
  ]:[
    '2025: 3 cuts already delivered (Goldman Sachs)',
    '2026-2027: Hold bias maintained',
    'Post-Warsh era: stronger data-dependence',
    '→ Less forward guidance → market more sensitive per meeting',
  ], gold, '#78350F');

  const header = ko
    ? `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,140,'🌐 매크로','rgba(52,211,153,0.15)','#34D399','#34D399')}
  ${badge(194,78,100,'FOMC','rgba(5,150,105,0.2)','#059669','#F9FAFB')}`
    : `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 29, 2026</text>
  ${badge(40,78,160,'🌐 Macro','rgba(52,211,153,0.15)','#34D399','#34D399')}
  ${badge(214,78,100,'FOMC','rgba(5,150,105,0.2)','#059669','#F9FAFB')}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#020E0A','#010806',mintD,mint)}
  ${header}
  ${hero}
  ${stats}
  ${mb1.svg}
  ${mb2.svg}
  ${mb3.svg}
  ${footer('Fed FOMC · Warsh')}
</svg>`;
}

// ── 11. Summary ──────────────────────────────────────────────
function makeSummary(ko) {
  const blue = '#60A5FA';
  const red = '#F87171';
  const orange = '#FB923C';
  const green = '#34D399';
  const purple = '#C084FC';
  const gold = '#FBBF24';
  const gray = '#9CA3AF';
  const white = '#F9FAFB';

  const dateLabel = ko ? 'Oct 29, 2026 · 한장요약' : 'Oct 29, 2026 · Daily Summary';
  const topics = ko ? [
    { num: '1', color: blue, line1: 'MSFT Q3 어닝 — EPS $4.89(+4% 비트)', line2: '매출 $92.2B(+2%), 주가 +6.11% · Azure 가속' },
    { num: '2', color: orange, line1: 'GOOGL Q3 어닝 실망 — 주가 -9%', line2: 'FCF 2분기 연속 음수 · Capex 2배 · 마진 31.8%' },
    { num: '3', color: red, line1: 'TSLA Cybercab 573대 · 지난주 +222대', line2: 'Waymo 대비 차량 비용 7배 차이($25K vs $175K)' },
    { num: '4', color: red, line1: 'Tesla Optimus 팔로알토 로봇 유니버시티', line2: '24파운드 슈트·40카메라·3교대 24/7 데이터 수집' },
    { num: '5', color: blue, line1: 'SPCX 주간 거래량 1위 × 2회 — 기관 매집 패턴', line2: '$144~$148 좁은 구간 유지, 2억+ 주 거래' },
    { num: '6', color: blue, line1: 'Starlink FCC 482MHz 주파수 추가 신청', line2: '902~928MHz ISM 대역 · ABS Jets 1Gbps 첫 설치' },
    { num: '7', color: orange, line1: 'AWS 2028E $373.6B — 모건스탠리 3배 전망', line2: '2026E +38% · 2027E +47% · AI 클라우드 가속' },
    { num: '8', color: purple, line1: 'Anthropic 현금 $131.7B — 미국 비금융 3위', line2: 'Berkshire·Alphabet 다음 · SpaceX 46% 약정 확인' },
    { num: '9', color: blue, line1: 'Gemini 4 Carbon — 장문 맥락 96%', line2: 'SWE-sweep 9.6% vs 4.3% · 에이전틱 코딩 2배' },
    { num: '10', color: green, line1: 'Fed Warsh FOMC 구조 개편', line2: '2027년 투표권 -1명 · 2028년 회의 8→6회' },
    { num: '11', color: blue, line1: 'MSFT vs GOOGL — AI 클라우드 승자 분기점', line2: '어닝 비트 vs 어닝 미스로 구도 선명히 갈림' },
  ] : [
    { num: '1', color: blue, line1: 'MSFT Q3 Earnings — EPS $4.89 (+4% Beat)', line2: 'Revenue $92.2B (+2%), Stock +6.11% · Azure Acceleration' },
    { num: '2', color: orange, line1: 'GOOGL Q3 Disappointment — Stock -9%', line2: 'FCF Negative x2 · Capex Doubled · Margin 31.8%' },
    { num: '3', color: red, line1: 'TSLA Cybercab 573 · +222 Last Week', line2: 'Fleet cost 7x cheaper vs Waymo ($25K vs $175K)' },
    { num: '4', color: red, line1: 'Tesla Optimus Palo Alto Robot University', line2: '24lb suit · 40 cameras · 3 shifts · 24/7 data collection' },
    { num: '5', color: blue, line1: 'SPCX Weekly Volume #1 x2 — Institutional Accumulation', line2: '$144-$148 tight range, 200M+ shares absorbed' },
    { num: '6', color: blue, line1: 'Starlink FCC 482MHz Additional Spectrum Filed', line2: '902-928MHz ISM band · ABS Jets 1Gbps first install' },
    { num: '7', color: orange, line1: 'AWS 2028E $373.6B — Morgan Stanley 3x Forecast', line2: '2026E +38% · 2027E +47% · AI cloud acceleration' },
    { num: '8', color: purple, line1: 'Anthropic Cash $131.7B — #3 US Non-Bank', line2: 'Behind Berkshire, Alphabet only · SpaceX 46% confirmed' },
    { num: '9', color: blue, line1: 'Gemini 4 Carbon — 96% Long-Context', line2: 'SWE-sweep 9.6% vs 4.3% · Agentic coding 2x rivals' },
    { num: '10', color: green, line1: 'Fed Warsh Restructures FOMC', line2: '-1 Voter from 2027 · Meetings 8→6 from 2028' },
    { num: '11', color: blue, line1: 'MSFT vs GOOGL — AI Cloud Divergence', line2: 'Earnings beat vs miss: clear winner emerging' },
  ];

  const totalCount = topics.length;
  let topicsSvg = '';
  const rowH = 86;
  const startY = 280;
  topics.forEach((t, i) => {
    const y = startY + i * rowH;
    const isEven = i % 2 === 0;
    topicsSvg += `<rect x="54" y="${y-6}" width="972" height="${rowH-4}" rx="10" fill="${isEven?'rgba(255,255,255,0.02)':'rgba(255,255,255,0.01)'}"/>`;
    topicsSvg += `<circle cx="90" cy="${y+32}" r="22" fill="${t.color}" opacity="0.18"/>`;
    topicsSvg += `<text x="90" y="${y+39}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="20" font-weight="900" fill="${t.color}">${t.num}</text>`;
    topicsSvg += `<text x="124" y="${y+22}" font-family="Arial Black,Arial,sans-serif" font-size="23" font-weight="900" fill="${white}">${escXml(t.line1)}</text>`;
    topicsSvg += `<text x="124" y="${y+52}" font-family="Arial,sans-serif" font-size="20" fill="${gray}">${escXml(t.line2)}</text>`;
    if (i < topics.length - 1) {
      topicsSvg += `<line x1="54" y1="${y+rowH-6}" x2="1026" y2="${y+rowH-6}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>`;
    }
  });

  const header = ko
    ? `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="${white}">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">${dateLabel}</text>
  ${badge(40,78,180,'⭐ 특집·요약','rgba(96,165,250,0.15)','#60A5FA','#60A5FA')}
  <text x="234" y="107" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${blue}">TOP ${totalCount}</text>`
    : `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="${white}">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">${dateLabel}</text>
  ${badge(40,78,220,'⭐ Daily Summary','rgba(96,165,250,0.15)','#60A5FA','#60A5FA')}
  <text x="274" y="107" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${blue}">TOP ${totalCount}</text>`;

  const heroTitle = ko
    ? `<text x="540" y="220" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="${white}" filter="url(#glow)">2026년 10월 29일</text>`
    : `<text x="540" y="220" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="${white}" filter="url(#glow)">October 29, 2026</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#030610','#020408','#60A5FA','#A78BFA')}
  ${header}
  ${heroTitle}
  ${topicsSvg}
  ${footer()}
</svg>`;
}

async function main() {
  console.log('Generating 2026-10-29 charts...');

  // KO + EN for each topic
  await save(`msft-earnings-${DATE}`,          makeMsftEarnings(true));
  await save(`msft-earnings-${DATE}-en`,       makeMsftEarnings(false));
  await save(`googl-earnings-${DATE}`,         makeGooglEarnings(true));
  await save(`googl-earnings-${DATE}-en`,      makeGooglEarnings(false));
  await save(`tsla-cybercab-waymo-${DATE}`,    makeTslaCybercabWaymo(true));
  await save(`tsla-cybercab-waymo-${DATE}-en`, makeTslaCybercabWaymo(false));
  await save(`tsla-optimus-robot-${DATE}`,     makeTslaOptimus(true));
  await save(`tsla-optimus-robot-${DATE}-en`,  makeTslaOptimus(false));
  await save(`spcx-volume-rank-${DATE}`,       makeSpcxVolumeRank(true));
  await save(`spcx-volume-rank-${DATE}-en`,    makeSpcxVolumeRank(false));
  await save(`spcx-starlink-fcc-${DATE}`,      makeSpcxStarlinkFcc(true));
  await save(`spcx-starlink-fcc-${DATE}-en`,   makeSpcxStarlinkFcc(false));
  await save(`aws-triple-${DATE}`,             makeAwsTriple(true));
  await save(`aws-triple-${DATE}-en`,          makeAwsTriple(false));
  await save(`anthropic-cash-${DATE}`,         makeAnthropicCash(true));
  await save(`anthropic-cash-${DATE}-en`,      makeAnthropicCash(false));
  await save(`gemini4-${DATE}`,                makeGemini4(true));
  await save(`gemini4-${DATE}-en`,             makeGemini4(false));
  await save(`fomc-warsh-${DATE}`,             makeFomcWarsh(true));
  await save(`fomc-warsh-${DATE}-en`,          makeFomcWarsh(false));
  await save(`summary-${DATE}`,               makeSummary(true));
  await save(`summary-${DATE}-en`,            makeSummary(false));

  console.log('Done! 22 charts generated.');
}

main().catch(e => { console.error(e); process.exit(1); });
