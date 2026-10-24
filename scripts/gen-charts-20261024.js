#!/usr/bin/env node
// Chart generator — 2026-10-24 (토) — SPCX 잠금해제 · Cybercab 4개 도시 · Meta Q3 · 빅테크 어닝위크
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/charts');
const DATE = '20261024';

function escXml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function wrapText(text, maxVis) {
  function visLen(s) {
    let v = 0;
    for (const ch of s) v += /[가-힯぀-ヿ一-鿿]/.test(ch) ? 2 : 1;
    return v;
  }
  const words = text.split(' ');
  const lines = []; let cur = '', curV = 0;
  for (const w of words) {
    const wv = visLen(w); const sep = cur ? 1 : 0;
    if (curV + sep + wv > maxVis && cur) { lines.push(cur); cur = w; curV = wv; }
    else { cur = cur ? cur + ' ' + w : w; curV += sep + wv; }
  }
  if (cur) lines.push(cur);
  return lines;
}
function base(f1='#0D1117', f2='#0A0520', a1='#EF4444', a2='#C084FC') {
  return `<defs>
    <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${f1}"/><stop offset="100%" stop-color="${f2}"/>
    </linearGradient>
    <linearGradient id="accentG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${a1}"/><stop offset="100%" stop-color="${a2}"/>
    </linearGradient>
    <linearGradient id="heroG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${a1}"/><stop offset="100%" stop-color="${a2}"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="1080" height="1350" fill="url(#bgG)"/>
  <rect x="0" y="0" width="1080" height="10" fill="url(#accentG)"/>`;
}
function footer() {
  return `<rect x="0" y="1340" width="1080" height="10" fill="url(#accentG)"/>
  <text x="40" y="1333" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">investus.kr · Not investment advice · INVESTUS SRP</text>`;
}
function badge(x, y, w, label, bg, border, tc) {
  return `<rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="${bg}"/>
  <rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="none" stroke="${border}" stroke-width="2"/>
  <text x="${x+w/2}" y="${y+26}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="${tc}">${escXml(label)}</text>`;
}
function statBox(x,y,w,h,top,big,unit,sub,accent='#EF4444') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#0F1623" stroke="${accent}" stroke-width="2"/>
  <text x="${x+w/2}" y="${y+34}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${escXml(top)}</text>
  <text x="${x+w/2}" y="${y+96}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="54" font-weight="900" fill="${accent}">${escXml(big)}</text>
  <text x="${x+w/2}" y="${y+128}" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#D1D5DB">${escXml(unit)}</text>
  <text x="${x+w/2}" y="${y+158}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">${escXml(sub)}</text>`;
}
function msgBox(y, h, titleText, lines, accentTop='#F59E0B', borderColor='#92400E') {
  const lh = 34;
  const textSvg = lines.map((ln, i) =>
    `<text x="108" y="${y+72+i*lh}" font-family="Arial,sans-serif" font-size="24" fill="${i===lines.length-1?'#FDE68A':'#E5E7EB'}">${escXml(ln)}</text>`
  ).join('');
  return `<rect x="54" y="${y}" width="972" height="${h}" rx="22" fill="#0F0A00" stroke="${borderColor}" stroke-width="2.5"/>
  <rect x="54" y="${y}" width="972" height="5" rx="3" fill="${accentTop}"/>
  <text x="108" y="${y+44}" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#FDE68A">${escXml(titleText)}</text>
  <rect x="108" y="${y+52}" width="864" height="1" fill="${borderColor}"/>
  ${textSvg}`;
}
async function save(name, svgStr) {
  const svgPath = path.join(OUT, `${name}.svg`);
  const pngPath = path.join(OUT, `${name}.png`);
  fs.writeFileSync(svgPath, svgStr);
  await sharp(Buffer.from(svgStr)).resize(1080,1350).png().toFile(pngPath);
  console.log(`✓ ${name}.png`);
}

// ── 0. SUMMARY ──────────────────────────────────────────────────────────────
function makeSummary(ko) {
  const rows = ko ? [
    { label:'SPCX', color:'#EC4899',
      title:'잠금해제 328M주 → 10/26 시장 공급 · 10/22 이미 1.3B 해제',
      detail:'락업 해제 스케줄 연속 · IPO 이후 최대 규모 누적 · 10/26 주가 변동 주의' },
    { label:'TSLA', color:'#10B981',
      title:'Cybercab 4개 도시 추가 · Austin 지오펜스 확장',
      detail:'라스베이거스·피닉스·잭슨빌·샌안토니오 · 총 누적 3.4M 마일 · 연말 플릿 판매' },
    { label:'TSLA', color:'#F97316',
      title:'Optimus 프리몬트 생산 개시 — 46일 라인 전환 완료',
      detail:'첫 양산품질 로봇 출고 · 주 2만대 목표 1년+ · 기가텍사스 1000만/년 예정' },
    { label:'META', color:'#3B82F6',
      title:'Q3 매출 $64.6B +26% · AI capex $34.9B 급증',
      detail:'adj EPS $7.40 vs $6.54E · $9.9B 법적 합의 일회성 · Q4 가이던스 $73~76B' },
    { label:'TECH', color:'#A855F7',
      title:'빅테크 어닝 위크 — MSFT·GOOGL 10/28 · AMZN 10/29',
      detail:'AI 인프라 capex $725B 합산 예상 · 클라우드 성장률 핵심 지표' },
  ] : [
    { label:'SPCX', color:'#EC4899',
      title:'328M share unlock → hits market Oct 26 · 1.3B already released Oct 22',
      detail:'Consecutive lockup schedule · Largest cumulative release since IPO · Supply pressure watch' },
    { label:'TSLA', color:'#10B981',
      title:'Cybercab +4 cities · Austin geofence expanded',
      detail:'Las Vegas · Phoenix · Jacksonville · San Antonio · 3.4M total miles · fleet sales YE 2026' },
    { label:'TSLA', color:'#F97316',
      title:'Optimus production starts at Fremont — 46-day line retool',
      detail:'First production-quality bots off line · 20K/week target 1yr+ away · Giga TX 10M/yr planned' },
    { label:'META', color:'#3B82F6',
      title:'Q3 revenue $64.6B +26% · AI capex $34.9B surge',
      detail:'Adj EPS $7.40 vs $6.54E · $9.9B legal settlement one-time · Q4 guide $73–76B' },
    { label:'TECH', color:'#A855F7',
      title:'Big Tech earnings week — MSFT & GOOGL Oct 28 · AMZN Oct 29',
      detail:'Combined AI capex heading $725B · Cloud growth rate key metric to watch' },
  ];

  const TITLE_FS=22, TITLE_LH=27, DETAIL_FS=18, DETAIL_LH=22, PAD_T=12, GAP=4, PAD_B=10, ROW_GAP=5;
  let rowsSvg = ''; let curY = 188;
  rows.forEach((r) => {
    const tLines = wrapText(r.title, 54);
    const dLines = wrapText(r.detail, 62);
    const rowH = PAD_T + tLines.length*TITLE_LH + GAP + dLines.length*DETAIL_LH + PAD_B;
    rowsSvg += `<rect x="54" y="${curY}" width="972" height="${rowH}" rx="12" fill="#111827" stroke="${r.color}" stroke-width="1.5" stroke-opacity="0.4"/>`;
    rowsSvg += `<rect x="54" y="${curY}" width="8" height="${rowH}" rx="4" fill="${r.color}"/>`;
    rowsSvg += `<text x="84" y="${curY+PAD_T+18}" font-family="Arial Black,Arial,sans-serif" font-size="15" font-weight="900" fill="${r.color}">${escXml(r.label)}</text>`;
    tLines.forEach((ln,li) => {
      rowsSvg += `<text x="168" y="${curY+PAD_T+TITLE_LH*(li+1)-3}" font-family="Arial Black,Arial,sans-serif" font-size="${TITLE_FS}" font-weight="900" fill="#F3F4F6">${escXml(ln)}</text>`;
    });
    dLines.forEach((ln,li) => {
      rowsSvg += `<text x="168" y="${curY+PAD_T+tLines.length*TITLE_LH+GAP+DETAIL_LH*(li+1)-2}" font-family="Arial,sans-serif" font-size="${DETAIL_FS}" fill="#9CA3AF">${escXml(ln)}</text>`;
    });
    curY += rowH + ROW_GAP;
  });

  const topicCount = rows.length;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#020814','#06060F','#EC4899','#A855F7')}
  <text x="54" y="54" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">2026.10.24</text>
  <text x="1026" y="54" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">@investus.kr</text>
  <text x="54" y="108" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="#F9FAFB" filter="url(#glow)">${ko?'한장요약':'Daily Summary'}</text>
  <text x="54" y="148" font-family="Arial,sans-serif" font-size="26" fill="#EC4899">2026.10.24 · TOP ${topicCount}</text>
  <rect x="54" y="165" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  ${rowsSvg}
  ${footer()}
</svg>`;
  return svg;
}

// ── 1. SPCX LOCKUP ───────────────────────────────────────────────────────────
function makeSpcxLockup(ko) {
  const batches = ko ? [
    { date:'IPO 직후', shares:'2.1B', note:'기관·초기 직원 1차 해제', color:'#6B7280', pct:100 },
    { date:'10/22 (목)', shares:'1.3B', note:'분기 어닝 + 최대 단일 해제', color:'#EF4444', pct:62 },
    { date:'10/26 (월)', shares:'328M', note:'토요일 만기 → 월요일 거래', color:'#F97316', pct:15 },
    { date:'11/8 (예정)', shares:'~200M', note:'다음 정기 잠금 만기', color:'#EAB308', pct:10 },
  ] : [
    { date:'Post-IPO', shares:'2.1B', note:'Institutional + early employee release', color:'#6B7280', pct:100 },
    { date:'Oct 22 (Thu)', shares:'1.3B', note:'Earnings-linked, largest single batch', color:'#EF4444', pct:62 },
    { date:'Oct 26 (Mon)', shares:'328M', note:'Sat expiry → trades Monday open', color:'#F97316', pct:15 },
    { date:'Nov 8 (est)', shares:'~200M', note:'Next scheduled lockup expiry', color:'#EAB308', pct:10 },
  ];

  const barX=320, barMaxW=660, barH=42, rowH=70, startY=270;
  let barsSvg = '';
  batches.forEach((b,i) => {
    const y = startY + i*rowH;
    const bw = Math.round(barMaxW * b.pct / 100);
    barsSvg += `<rect x="${barX}" y="${y}" width="${barMaxW}" height="${barH}" rx="8" fill="#1F2937"/>`;
    barsSvg += `<rect x="${barX}" y="${y}" width="${bw}" height="${barH}" rx="8" fill="${b.color}" opacity="0.85"/>`;
    barsSvg += `<text x="${barX-12}" y="${y+barH/2+7}" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="19" font-weight="900" fill="#F3F4F6">${escXml(b.date)}</text>`;
    barsSvg += `<text x="${barX+bw+10}" y="${y+barH/2-4}" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${b.color}">${escXml(b.shares)}</text>`;
    barsSvg += `<text x="${barX+bw+10}" y="${y+barH/2+18}" font-family="Arial,sans-serif" font-size="17" fill="#9CA3AF">${escXml(b.note)}</text>`;
  });

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#080010','#04000A','#EC4899','#A855F7')}
  <text x="54" y="54" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">2026.10.24</text>
  <text x="1026" y="54" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">@investus.kr</text>
  ${badge(54,68,130,'# SPCX','#1E0A2E','#A855F7','#D8B4FE')}
  ${badge(196,68,180,'# LOCKUP','#1C1917','#F97316','#FED7AA')}
  <rect x="54" y="120" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="198" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="62" font-weight="900" fill="url(#heroG)" filter="url(#glow)">${ko?'328M주 해제':'328M Unlock'}</text>
  <text x="540" y="248" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#C084FC">${ko?'10월 26일(월) 시장 공급 압박':'Hits market Monday October 26'}</text>
  ${barsSvg}
  ${statBox(54, 570, 476, 180, ko?'10/22 해제':'Oct 22 unlock', '1.3B', ko?'주 (최대 단일)':'shares (record)', ko?'어닝 동시 발표':'earnings-linked', '#EF4444')}
  ${statBox(550, 570, 476, 180, ko?'10/26 해제':'Oct 26 unlock', '328M', ko?'주 (토→월 이연)':'shares (Sat expiry)', ko?'거래 시작 월요일':'trading Monday', '#F97316')}
  ${statBox(54, 766, 476, 180, ko?'IPO 이후 총 해제':'Total released since IPO', '~3.7B', ko?'주 누적':'shares cumul.', ko?'전체 발행주의 ~42%':'~42% of total shares', '#6B7280')}
  ${statBox(550, 766, 476, 180, ko?'SPCX 현재가':'SPCX price', '$147', ko?'10/23 종가':'Oct 23 close', ko?'10/22 고점 $149':'Oct 22 high $149', '#A855F7')}
  ${msgBox(962, 310, ko?'핵심 체크포인트':'Key Checkpoint', ko?[
    '10/22에 이미 1.3B주(최대 단일 해제)가 풀렸고 주가는 버텼습니다.',
    '10/26 328M주 추가 공급 — 단기 수급 압박 가능성.',
    '어닝 서프라이즈 + 합병 기대가 매도 물량 흡수 여부 결정.',
    '장기 보유자는 10GW 가이던스·Q1\'27 $33~37B 가이던스 기준으로 판단.',
  ]:[
    'Oct 22: 1.3B shares already unlocked — market absorbed it (stock held).',
    'Oct 26: 328M more shares hit — watch for short-term supply pressure.',
    'Earnings beat + merger premium will determine how much selling is absorbed.',
    'Long-term: Q1 2027 guide $33–37B vs $22B consensus is the real signal.',
  ], '#A855F7', '#4B0082')}
  ${footer()}
</svg>`;
  return svg;
}

// ── 2. CYBERCAB EXPANSION ────────────────────────────────────────────────────
function makeCybercabExpansion(ko) {
  const cities = ko ? [
    { name:'오스틴 TX', miles:'3.1M', status:'운영중·지오펜스 확장', color:'#10B981' },
    { name:'달라스 TX', miles:'예정', status:'11월 Cybercab 런칭', color:'#3B82F6' },
    { name:'휴스턴 TX', miles:'운영중', status:'Model Y 로보택시', color:'#10B981' },
    { name:'마이애미 FL', miles:'운영중', status:'Model Y 로보택시', color:'#10B981' },
    { name:'올랜도 FL', miles:'운영중', status:'Model Y 로보택시', color:'#10B981' },
    { name:'탬파 FL', miles:'운영중', status:'Model Y 로보택시', color:'#10B981' },
    { name:'라스베이거스', miles:'발표됨', status:'출시 예정', color:'#F59E0B' },
    { name:'피닉스 AZ', miles:'발표됨', status:'출시 예정', color:'#F59E0B' },
    { name:'잭슨빌 FL', miles:'발표됨', status:'출시 예정', color:'#F59E0B' },
    { name:'샌안토니오 TX', miles:'발표됨', status:'출시 예정', color:'#F59E0B' },
  ] : [
    { name:'Austin TX', miles:'3.1M', status:'Active · geofence expanded', color:'#10B981' },
    { name:'Dallas TX', miles:'TBD', status:'Cybercab launch Nov 2026', color:'#3B82F6' },
    { name:'Houston TX', miles:'Active', status:'Model Y robotaxi', color:'#10B981' },
    { name:'Miami FL', miles:'Active', status:'Model Y robotaxi', color:'#10B981' },
    { name:'Orlando FL', miles:'Active', status:'Model Y robotaxi', color:'#10B981' },
    { name:'Tampa FL', miles:'Active', status:'Model Y robotaxi', color:'#10B981' },
    { name:'Las Vegas', miles:'Announced', status:'Coming soon', color:'#F59E0B' },
    { name:'Phoenix AZ', miles:'Announced', status:'Coming soon', color:'#F59E0B' },
    { name:'Jacksonville FL', miles:'Announced', status:'Coming soon', color:'#F59E0B' },
    { name:'San Antonio TX', miles:'Announced', status:'Coming soon', color:'#F59E0B' },
  ];

  const rowH=88, startY=280, colW=486;
  let tablesvg = '';
  cities.forEach((c,i) => {
    const col = i % 2; const row = Math.floor(i / 2);
    const x = 54 + col*colW; const y = startY + row*rowH;
    tablesvg += `<rect x="${x}" y="${y}" width="${colW-12}" height="${rowH-8}" rx="12" fill="#0F1623" stroke="${c.color}" stroke-width="1.5"/>`;
    tablesvg += `<rect x="${x}" y="${y}" width="6" height="${rowH-8}" rx="3" fill="${c.color}"/>`;
    tablesvg += `<text x="${x+18}" y="${y+32}" font-family="Arial Black,Arial,sans-serif" font-size="21" font-weight="900" fill="#F3F4F6">${escXml(c.name)}</text>`;
    tablesvg += `<text x="${x+18}" y="${y+56}" font-family="Arial,sans-serif" font-size="18" fill="${c.color}">${escXml(c.miles)}</text>`;
    tablesvg += `<text x="${x+18}" y="${y+76}" font-family="Arial,sans-serif" font-size="16" fill="#6B7280">${escXml(c.status)}</text>`;
  });

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#020C08','#01080A','#10B981','#3B82F6')}
  <text x="54" y="54" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">2026.10.24</text>
  <text x="1026" y="54" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">@investus.kr</text>
  ${badge(54,68,130,'# TSLA','#051A10','#10B981','#6EE7B7')}
  ${badge(196,68,190,'# CYBERCAB','#051214','#3B82F6','#93C5FD')}
  <rect x="54" y="120" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="196" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="54" font-weight="900" fill="url(#heroG)" filter="url(#glow)">${ko?'10개 도시':'10 Cities'}</text>
  <text x="540" y="244" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="#F3F4F6">${ko?'+4개 도시 신규 발표 · 총 누적 3.4M 마일':'+4 Cities Announced · 3.4M Total Miles'}</text>
  <text x="540" y="276" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko?'2026.10.23 공식 발표':'Officially announced Oct 23, 2026'}</text>
  ${tablesvg}
  ${msgBox(1182, 106, ko?'핵심':'Key', ko?[
    '연말 플릿 판매 시작 · 달라스 11월 Cybercab 런칭 · 10개 도시로 데이터 폭발.',
  ]:[
    'Fleet sales to operators YE 2026 · Dallas Cybercab Nov · 10 cities = data flywheel.',
  ], '#10B981', '#064E3B')}
  ${footer()}
</svg>`;
  return svg;
}

// ── 3. META Q3 ───────────────────────────────────────────────────────────────
function makeMetaQ3(ko) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#020814','#06001A','#3B82F6','#818CF8')}
  <text x="54" y="54" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">2026.10.24</text>
  <text x="1026" y="54" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">@investus.kr</text>
  ${badge(54,68,130,'# META','#0A0E2A','#3B82F6','#93C5FD')}
  ${badge(196,68,160,'# Q3 2026','#1A1040','#818CF8','#C7D2FE')}
  <rect x="54" y="120" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="206" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="80" font-weight="900" fill="url(#heroG)" filter="url(#glow)">+26%</text>
  <text x="540" y="254" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="#F3F4F6">${ko?'매출 $64.6B — AI capex $34.9B 급증':'Revenue $64.6B — AI Capex $34.9B surge'}</text>
  <text x="540" y="290" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#818CF8">${ko?'Q3 2026 어닝 · 2026년 10월 21일 발표':'Q3 2026 Earnings · Reported October 21, 2026'}</text>
  <rect x="200" y="308" width="680" height="2" fill="url(#accentG)" opacity="0.3"/>
  ${statBox(54, 322, 308, 190, ko?'Q3 매출':'Q3 Revenue', '$64.6B', ko?'+26% YoY':'+26% YoY', ko?'컨센서스 $63.4B 상회':'beat $63.4B est', '#3B82F6')}
  ${statBox(386, 322, 308, 190, ko?'조정 EPS':'Adj EPS', '$7.40', ko?'vs 컨센서스 $6.54':'vs $6.54 consensus', ko?'+13.1% 어닝 서프라이즈':'+13% beat', '#818CF8')}
  ${statBox(718, 322, 308, 190, ko?'AI 설비투자':'AI Capex', '$34.9B', ko?'(연환산 $140B+)':'(annualized $140B+)', ko?'Q3\'25 $19.4B 대비 +80%':'+80% vs Q3\'25', '#EF4444')}
  ${statBox(54, 528, 308, 190, ko?'Q4 매출 가이던스':'Q4 Guide', '$73-76B', ko?'컨센서스 $73.7B':'vs $73.7B est', ko?'중간값 $74.5B':'midpoint $74.5B', '#10B981')}
  ${statBox(386, 528, 308, 190, ko?'연간 capex 상향':'Full-yr Capex', '$135-145B', ko?'(기존 $115-135B)':'(raised from $115-135B)', ko?'AI 인프라 투자 가속':'AI infra acceleration', '#F59E0B')}
  ${statBox(718, 528, 308, 190, ko?'잉여현금흐름':'Free Cash Flow', '-$2.1B', ko?'설비투자 급증 효과':'capex surge effect', ko?'법적비용 $9.9B 일회성':'$9.9B legal one-time', '#6B7280')}
  <!-- capex bar chart -->
  <text x="540" y="758" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#9CA3AF">${ko?'META AI 설비투자 추이':'META AI Capex Trend'}</text>
  <rect x="54" y="770" width="972" height="2" fill="#1F2937"/>
  ${[
    { q:'Q3\'25', v:194, c:'#4B5563' },
    { q:'Q4\'25', v:220, c:'#4B5563' },
    { q:'Q1\'26', v:280, c:'#3B82F6' },
    { q:'Q2\'26', v:310, c:'#3B82F6' },
    { q:'Q3\'26', v:349, c:'#818CF8' },
  ].map((b,i) => {
    const maxH=180, maxV=349;
    const bh = Math.round(b.v/maxV*maxH);
    const bx = 160+i*155, by=900-bh, bw=110;
    return `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="8" fill="${b.c}"/>
<text x="${bx+bw/2}" y="${by-10}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="20" font-weight="900" fill="${b.c}">$${b.v/10}B</text>
<text x="${bx+bw/2}" y="922" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#9CA3AF">${b.q}</text>`;
  }).join('')}
  ${msgBox(940, 342, ko?'핵심 시사점':'Key Takeaway', ko?[
    '$9.9B 법적 합의 → 일회성. 실질 영업이익 $22.9B은 전년 대비 성장.',
    'AI capex $34.9B/분기 = 연환산 $140B. Muse 500만 유저 돌파.',
    'Q4 가이던스 $73-76B: AI 광고 효율·Reels 성장이 계속 매출 견인.',
    '빅테크 AI 인프라 합산 $725B → SpaceX 수요 흡수 능력 검증 중.',
  ]:[
    '$9.9B legal charge is one-time. Core operating income $22.9B still grew.',
    'AI capex $34.9B/Q = ~$140B annualized. Muse crossed 5M users.',
    'Q4 guide $73–76B: AI ad efficiency + Reels still driving top-line.',
    'Hyperscaler combined $725B capex confirms SpaceX compute demand.',
  ], '#3B82F6', '#1E3A5F')}
  ${footer()}
</svg>`;
  return svg;
}

// ── 4. BIGTECH EARNINGS PREVIEW ──────────────────────────────────────────────
function makeBigtechPreview(ko) {
  const items = ko ? [
    { co:'Microsoft', ticker:'MSFT', date:'10/28 (수)', color:'#00BCF2', est:'클라우드 Azure +25% · Copilot 매출화' },
    { co:'Alphabet', ticker:'GOOGL', date:'10/28 (수)', color:'#4285F4', est:'Google Cloud +30% · AI Overviews 광고' },
    { co:'Amazon', ticker:'AMZN', date:'10/29 (목)', color:'#FF9900', est:'AWS +22% · AI 서비스 가속' },
  ] : [
    { co:'Microsoft', ticker:'MSFT', date:'Oct 28 (Wed)', color:'#00BCF2', est:'Azure cloud +25% · Copilot monetization' },
    { co:'Alphabet', ticker:'GOOGL', date:'Oct 28 (Wed)', color:'#4285F4', est:'Google Cloud +30% · AI Overviews ad rev' },
    { co:'Amazon', ticker:'AMZN', date:'Oct 29 (Thu)', color:'#FF9900', est:'AWS +22% · AI services acceleration' },
  ];

  const rowY = [274, 488, 702];
  let rowsSvg = '';
  items.forEach((it, i) => {
    const y = rowY[i];
    rowsSvg += `<rect x="54" y="${y}" width="972" height="186" rx="18" fill="#0F1623" stroke="${it.color}" stroke-width="2"/>`;
    rowsSvg += `<rect x="54" y="${y}" width="8" height="186" rx="4" fill="${it.color}"/>`;
    rowsSvg += `<text x="90" y="${y+62}" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="${it.color}">${escXml(it.co)}</text>`;
    rowsSvg += `<text x="90" y="${y+102}" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${escXml(it.ticker)} · ${escXml(it.date)}</text>`;
    rowsSvg += `<text x="90" y="${y+140}" font-family="Arial,sans-serif" font-size="22" fill="#D1D5DB">${escXml(it.est)}</text>`;
    rowsSvg += `<text x="1002" y="${y+94}" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="32" font-weight="900" fill="${it.color}">${ko?'발표 예정':'UPCOMING'}</text>`;
  });

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#020814','#0A0510','#00BCF2','#A855F7')}
  <text x="54" y="54" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">2026.10.24</text>
  <text x="1026" y="54" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">@investus.kr</text>
  ${badge(54,68,130,'# TECH','#04141A','#00BCF2','#7DD3FC')}
  ${badge(196,68,180,'# EARNINGS','#100A28','#A855F7','#D8B4FE')}
  <rect x="54" y="120" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="198" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="56" font-weight="900" fill="url(#heroG)" filter="url(#glow)">${ko?'어닝 위크':'Earnings Week'}</text>
  <text x="540" y="244" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko?'10/28~29 · MSFT · GOOGL · AMZN':'Oct 28–29 · MSFT · GOOGL · AMZN'}</text>
  ${rowsSvg}
  ${statBox(54, 904, 308, 180, ko?'빅테크 AI capex':'BigTech AI capex', '$725B', ko?'2026년 합산 예상':'2026 combined est.', ko?'4대 하이퍼스케일러':'4 hyperscalers', '#A855F7')}
  ${statBox(386, 904, 308, 180, ko?'META Q3 capex':'META Q3 capex', '$34.9B', ko?'연환산 $140B':'$140B annualized', ko?'전분기 $31B 대비 +13%':'+13% vs Q2\'s $31B', '#3B82F6')}
  ${statBox(718, 904, 308, 180, ko?'합병 시너지':'Merger synergy', '$3.63T', ko?'TSLA+SPCX 합산':'TSLA+SPCX combined', ko?'글로벌 시총 5위':'global mktcap #5', '#EC4899')}
  ${msgBox(1100, 182, ko?'이번주 핵심 관전 포인트':'This Week\'s Key Watch', ko?[
    'Azure·AWS 클라우드 성장률 → SpaceX AI 수요와 경쟁 vs 보완 구도.',
    'AI 설비투자 가이던스 → $725B 합산 유지 여부 확인.',
    'TSLA-SPCX 합병 업데이트 가능성 · 관련 발언 주목.',
  ]:[
    'Azure & AWS cloud growth: competition vs. complementary with SpaceX AI.',
    'AI capex guidance: confirming $725B combined estimate for 2026.',
    'Watch for any TSLA-SPCX merger commentary from Nadella or Pichai.',
  ], '#00BCF2', '#0C4A6E')}
  ${footer()}
</svg>`;
  return svg;
}

(async () => {
  for (const ko of [true, false]) {
    const sfx = ko ? '' : '-en';
    await save(`summary-${DATE}${sfx}`, makeSummary(ko));
    await save(`spcx-lockup-${DATE}${sfx}`, makeSpcxLockup(ko));
    await save(`tsla-cybercab-${DATE}${sfx}`, makeCybercabExpansion(ko));
    await save(`meta-q3-${DATE}${sfx}`, makeMetaQ3(ko));
    await save(`bigtech-earnings-${DATE}${sfx}`, makeBigtechPreview(ko));
  }
  console.log('All charts done.');
})();
