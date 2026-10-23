#!/usr/bin/env node
// Chart generator — 2026-10-23 — TSLA Q3 상세 + SPCX Q3 + 합병 구조 + 10GW + Optimus + FSD
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/charts');
const DATE = '20261023';

function escXml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function wrapText(text, maxVis, _isKo) {
  function visLen(s) {
    let v = 0;
    for (const ch of s) v += /[가-힯぀-ヿ一-鿿]/.test(ch) ? 2 : 1;
    return v;
  }
  const words = text.split(' ');
  const lines = [];
  let cur = '', curV = 0;
  for (const w of words) {
    const wv = visLen(w);
    const sep = cur ? 1 : 0;
    if (curV + sep + wv > maxVis && cur) {
      lines.push(cur); cur = w; curV = wv;
    } else {
      cur = cur ? cur + ' ' + w : w;
      curV += sep + wv;
    }
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
  let textSvg = lines.map((ln, i) =>
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
    { label:'TSLA', color:'#10B981',
      title:'Q3 총마진 19.6% — Q2 16.8% 대비 +2.8%p 회복',
      detail:'12개월 매출 $100B 2분기 연속 돌파 · 서비스 총이익 $724M 역대 최고 · 순이익 $804M' },
    { label:'TSLA', color:'#F59E0B',
      title:'10개 하우스 전원 목표가 인상 · 캔터 $485 최고',
      detail:'CLSA Underperform→Hold · Baird $460 Buy · JPM $440 · GS $360 · 평균 $436' },
    { label:'SPCX', color:'#A855F7',
      title:'Q3 매출 $14.6B +161% · AI가 전체의 48%(1위)',
      detail:'AI Solutions $7.02B +1856% · 총이익 $9.1B +217% · 순이익 $4.4B' },
    { label:'MERGE', color:'#EC4899',
      title:'합병 구조 3가지 Reuters 단독 공개',
      detail:'SPCX→TSLA 인수 / 신규 지주회사 / 전주식교환 · Apollo·Goldman 8.3% 파이낸싱' },
    { label:'SPCX', color:'#06B6D4',
      title:'Musk "내년 10GW 초과 가능" · Q1\'27 가이던스 $33~37B',
      detail:'컨센서스 $22B 대비 +50~68% · BofA $100B 런레이트 현실화' },
    { label:'TSLA', color:'#F97316',
      title:'Optimus "S커브 초입, 1M/년 라인 프리몬트 완료"',
      detail:'Musk: 설계·AI 이슈 내년 말 해결 · "지구 최대 제품" · AI5 칩 2027년 4월' },
    { label:'TSLA', color:'#3B82F6',
      title:'FSD 174만 활성 구독 · Ashok "수백만 대 경로 명확"',
      detail:'누적 무인주행 200만 마일 달성 · v15 스택 기반 · 안전 데이터 업계 최고' },
  ] : [
    { label:'TSLA', color:'#10B981',
      title:'Q3 Gross Margin 19.6% — recovery from Q2 16.8%',
      detail:'Trailing 12M revenue $100B+ (2nd straight) · Services gross profit $724M record · Net income $804M' },
    { label:'TSLA', color:'#F59E0B',
      title:'All 10 analyst houses raised targets · Cantor $485 high',
      detail:'CLSA Underperform→Hold · Baird $460 Buy · JPM $440 · GS $360 · avg ~$436' },
    { label:'SPCX', color:'#A855F7',
      title:'Q3 revenue $14.6B +161% · AI now #1 segment (48%)',
      detail:'AI Solutions $7.02B +1856% YoY · Gross profit $9.1B +217% · Net income $4.4B' },
    { label:'MERGE', color:'#EC4899',
      title:'Reuters: 3 merger deal structures disclosed',
      detail:'SPCX acquires TSLA / New holdco / All-stock swap · Apollo & Goldman 8.3% financing' },
    { label:'SPCX', color:'#06B6D4',
      title:'Musk: "shot at exceeding 10GW next year" · Q1\'27 guide $33-37B',
      detail:'vs $22B consensus (+50–68%) · BofA: $100B run-rate "approaching reality"' },
    { label:'TSLA', color:'#F97316',
      title:'Optimus: "S curve early stage · 1M/yr line at Fremont done"',
      detail:'Musk: design & AI issues solved by end of next year · "biggest product on Earth" · AI5 chip Apr 2027' },
    { label:'TSLA', color:'#3B82F6',
      title:'FSD 1.74M active subs · Ashok: "clear path to millions"',
      detail:'2M cumulative unsupervised miles · v15 stack · world-class safety data' },
  ];

  const TITLE_FS=22, TITLE_LH=27, DETAIL_FS=18, DETAIL_LH=22, PAD_T=12, GAP=4, PAD_B=10, ROW_GAP=5;
  let rowsSvg = '';
  let curY = 188;

  rows.forEach((r) => {
    const tLines = wrapText(r.title, 54, ko);
    const dLines = wrapText(r.detail, 62, ko);
    const rowH = PAD_T + tLines.length*TITLE_LH + GAP + dLines.length*DETAIL_LH + PAD_B;
    rowsSvg += `<rect x="54" y="${curY}" width="972" height="${rowH}" rx="12" fill="#111827" stroke="${r.color}" stroke-width="1.5" stroke-opacity="0.4"/>`;
    rowsSvg += `<rect x="54" y="${curY}" width="8" height="${rowH}" rx="4" fill="${r.color}"/>`;
    rowsSvg += `<text x="84" y="${curY+PAD_T+18}" font-family="Arial Black,Arial,sans-serif" font-size="15" font-weight="900" fill="${r.color}">${escXml(r.label)}</text>`;
    tLines.forEach((ln,li) => {
      rowsSvg += `<text x="168" y="${curY+PAD_T+TITLE_LH*(li+1)-3}" font-family="Arial Black,Arial,sans-serif" font-size="${TITLE_FS}" font-weight="900" fill="#F3F4F6">${escXml(ln)}</text>`;
    });
    const detY = curY+PAD_T+tLines.length*TITLE_LH+GAP;
    dLines.forEach((ln,li) => {
      rowsSvg += `<text x="168" y="${detY+DETAIL_LH*(li+1)-3}" font-family="Arial,sans-serif" font-size="${DETAIL_FS}" fill="#9CA3AF">${escXml(ln)}</text>`;
    });
    curY += rowH+ROW_GAP;
  });

  const heroText = ko ? '2026-10-23 오늘의 요약' : 'Daily Summary 2026-10-23';
  const subText  = ko ? `총 ${rows.length}개 토픽` : `${rows.length} topics today`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base()}
  <text x="540" y="92" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="#F3F4F6">${escXml(heroText)}</text>
  <text x="540" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#9CA3AF">${escXml(subText)} · TSLA Q3 2026 ${ko?'상세 · SPCX Q3 · 합병':'Detail · SPCX Q3 · Merger'}</text>
  <rect x="54" y="160" width="972" height="2" fill="url(#accentG)" opacity="0.6"/>
  ${rowsSvg}
  ${footer()}
</svg>`;
}

// ── 1. TSLA Gross Margin Recovery ────────────────────────────────────────────
function makeTslaMargin(ko) {
  // 마진 3분기 비교 bar chart: Q3'25=18.0%, Q2'26=16.8%, Q3'26=19.6%
  const barData = [
    { label: ko?'Q3 2025':'Q3 2025', val: 18.0, color:'#6B7280' },
    { label: ko?'Q2 2026':'Q2 2026', val: 16.8, color:'#EF4444' },
    { label: ko?'Q3 2026':'Q3 2026', val: 19.6, color:'#10B981' },
  ];
  const BAR_BASE_Y=560, MAX_H=180, MAX_VAL=22;
  let barsSvg = '';
  barData.forEach((b,i) => {
    const bx = 160 + i*280, bw=180;
    const bh = Math.round(b.val/MAX_VAL * MAX_H);
    const by = BAR_BASE_Y - bh;
    barsSvg += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="8" fill="${b.color}" opacity="${b.color==='#10B981'?'1':'0.7'}"/>`;
    barsSvg += `<text x="${bx+bw/2}" y="${by-12}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="28" font-weight="900" fill="${b.color}">${b.val}%</text>`;
    barsSvg += `<text x="${bx+bw/2}" y="${BAR_BASE_Y+30}" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">${escXml(b.label)}</text>`;
  });
  // arrow showing recovery
  const arrowSvg = `<line x1="250" y1="490" x2="720" y2="490" stroke="#10B981" stroke-width="2" stroke-dasharray="6,4" opacity="0.5"/>
    <text x="540" y="484" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#10B981">${ko?'+2.8%p 회복':'+2.8pp recovery'}</text>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#020E08','#040A02','#10B981','#34D399')}
  ${badge(54,18,130,'TSLA','#064E3B','#10B981','#6EE7B7')}
  ${badge(196,18,160,ko?'마진 회복':'Margin Recovery','#064E3B','#10B981','#6EE7B7')}
  ${badge(368,18,160,ko?'Q3 실적':'Q3 Earnings','#1C1917','#F59E0B','#FDE68A')}
  <rect x="54" y="70" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>

  <text x="540" y="160" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="110" font-weight="900" fill="url(#heroG)" filter="url(#glow)">19.6%</text>
  <text x="540" y="218" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="36" font-weight="900" fill="#F1F5F9">${ko?'Q3 총이익률 — 회복세 확인':'GROSS MARGIN — RECOVERY CONFIRMED'}</text>
  <text x="540" y="266" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#9CA3AF">${ko?'Q2 16.8% → Q3 19.6% · +2.8%p 개선 · Q3 2025(18.0%) 상회':'Q2 16.8% → Q3 19.6% · +2.8pp · Surpasses Q3 2025 (18.0%)'}</text>
  <rect x="200" y="288" width="680" height="2" fill="url(#accentG)" opacity="0.4"/>

  ${arrowSvg}
  ${barsSvg}

  <rect x="54" y="610" width="972" height="1.5" fill="#1F2937"/>

  ${statBox(54,630,476,168,ko?'12개월 누적 매출':'Trailing 12M Revenue','$100B+',ko?'2분기 연속 돌파':'2nd straight quarter',ko?'12개월 연속 매출 방어':'Revenue defense maintained','#F59E0B')}
  ${statBox(550,630,476,168,ko?'서비스 총이익':'Services Gross Profit','$724M',ko?'역대 최고':'All-time record',ko?'+36% YoY · 충전·보험·부품':'+36% YoY · Charging, Insurance, Parts','#3B82F6')}

  <rect x="54" y="815" width="972" height="1.5" fill="#1F2937"/>

  <text x="108" y="858" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">${ko?'순이익 및 EPS 참고':'Net Income &amp; EPS Note'}</text>
  <rect x="108" y="866" width="864" height="1" fill="#374151"/>
  ${[
    [ko?'Q3 순이익':'Q3 Net Income', '$804M', ko?'-42.1% YoY (공정가치 회계 영향)':'-42.1% YoY (fair value accounting change)', '#EF4444'],
    [ko?'12개월 누적 순이익':'Trailing 12M Net Income', '$3,279M', ko?'전분기 말 대비 -15.1%':'-15.1% from end of prior quarter', '#EF4444'],
    [ko?'Non-GAAP EPS':'Non-GAAP EPS', '$0.72', ko?'컨센서스 ~$0.35 대비 약 2배':'vs ~$0.35 consensus, approx. 2×', '#10B981'],
    [ko?'잉여현금흐름 (FCF)':'Free Cash Flow', '$2.9B', ko?'컨센서스 $1.3B 대비 2배 초과':'vs $1.3B consensus — more than doubled', '#10B981'],
  ].map(([k,v,s,c],i) => `
    <rect x="54" y="${890+i*96}" width="972" height="80" rx="12" fill="#0F1623" stroke="${c}" stroke-width="1.5" stroke-opacity="0.5"/>
    <text x="108" y="${890+i*96+30}" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${escXml(k)}</text>
    <text x="108" y="${890+i*96+62}" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="${c}">${escXml(v)}</text>
    <text x="780" y="${890+i*96+62}" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${escXml(s)}</text>`).join('')}

  ${footer()}
</svg>`;
}

// ── 2. TSLA Analyst Targets ──────────────────────────────────────────────────
function makeTslaAnalyst(ko) {
  const analysts = [
    { house:'Cantor Fitzgerald', pt:485, rating:ko?'비중확대':'Overweight', change:'', color:'#10B981' },
    { house:'TD Cowen',          pt:460, rating:ko?'매수':'Buy',           change:'',        color:'#10B981' },
    { house:'Baird',             pt:460, rating:ko?'매수':'Buy',           change:ko?'$450→$460':'$450→$460', color:'#10B981' },
    { house:'Canaccord',         pt:460, rating:ko?'비중확대':'Outperform', change:ko?'$450→$460':'$450→$460', color:'#10B981' },
    { house:'Mizuho',            pt:460, rating:ko?'비중확대':'Outperform', change:ko?'$450→$460':'$450→$460', color:'#10B981' },
    { house:'JPMorgan',          pt:440, rating:ko?'중립':'Neutral',       change:ko?'$415→$440':'$415→$440', color:'#F59E0B' },
    { house:'UBS',               pt:425, rating:ko?'중립':'Neutral',       change:ko?'$391→$425':'$391→$425', color:'#F59E0B' },
    { house:'CLSA',              pt:400, rating:ko?'보유':'Hold',          change:ko?'UP→Hold $310→$400':'UP→Hold $310→$400', color:'#A855F7' },
    { house:'Morgan Stanley',    pt:410, rating:ko?'비중유지':'Equalweight',change:ko?'$400→$410':'$400→$410', color:'#F59E0B' },
    { house:'Goldman Sachs',     pt:360, rating:ko?'중립':'Neutral',       change:'',        color:'#6B7280' },
  ];

  // range bar
  const MIN_PT=340, MAX_PT=510, BAR_X=54, BAR_W=972, BAR_Y=310;
  function ptX(pt) { return BAR_X + (pt-MIN_PT)/(MAX_PT-MIN_PT)*BAR_W; }
  const rangeSvg = `
    <rect x="${BAR_X}" y="${BAR_Y}" width="${BAR_W}" height="12" rx="6" fill="#1F2937"/>
    <rect x="${ptX(360)}" y="${BAR_Y}" width="${ptX(485)-ptX(360)}" height="12" rx="6" fill="url(#accentG)" opacity="0.6"/>
    <text x="${ptX(360)}" y="${BAR_Y+36}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">$360</text>
    <text x="${ptX(485)}" y="${BAR_Y+36}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#10B981">$485</text>
    <text x="${ptX(436)}" y="${BAR_Y-14}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#F59E0B">${ko?'평균 ~$436':'avg ~$436'}</text>
    <line x1="${ptX(436)}" y1="${BAR_Y-4}" x2="${ptX(436)}" y2="${BAR_Y+12}" stroke="#F59E0B" stroke-width="2"/>`;

  let listSvg = '';
  analysts.forEach((a, i) => {
    const y = 376 + i*88;
    listSvg += `<rect x="54" y="${y}" width="972" height="76" rx="10" fill="#0F1623" stroke="${a.color}" stroke-width="1.5" stroke-opacity="0.6"/>`;
    listSvg += `<text x="108" y="${y+30}" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="#F3F4F6">${escXml(a.house)}</text>`;
    listSvg += `<text x="108" y="${y+58}" font-family="Arial,sans-serif" font-size="19" fill="#9CA3AF">${escXml(a.rating)}${a.change?' · '+a.change:''}</text>`;
    listSvg += `<text x="990" y="${y+50}" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="34" font-weight="900" fill="${a.color}">$${a.pt}</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0A0800','#150F00','#F59E0B','#EF4444')}
  ${badge(54,18,130,'TSLA','#78350F','#F59E0B','#FDE68A')}
  ${badge(196,18,200,ko?'목표가 전원 상향':'All Targets Raised','#78350F','#F59E0B','#FDE68A')}
  <rect x="54" y="70" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>

  <text x="540" y="148" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="90" font-weight="900" fill="url(#heroG)" filter="url(#glow)">${ko?'전원 인상':'ALL 10'}</text>
  <text x="540" y="210" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="36" font-weight="900" fill="#F1F5F9">${ko?'10개 하우스 목표가 전원 인상':'ANALYST HOUSES RAISED TARGETS'}</text>
  <text x="540" y="260" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#9CA3AF">${ko?'Q3 어닝비트 반응 · 목표가 범위 $360~$485':'Post-Q3 beat reaction · Target range $360–$485'}</text>
  <rect x="200" y="282" width="680" height="2" fill="url(#accentG)" opacity="0.4"/>

  ${rangeSvg}
  ${listSvg}

  ${footer()}
</svg>`;
}

// ── 3. SPCX Q3 Full Financials ───────────────────────────────────────────────
function makeSpcxQ3(ko) {
  // Revenue breakdown bars
  const segs = [
    { label:ko?'AI Solutions':'AI Solutions', val:7.02, pct:'48%', growth:'+1856%', color:'#A855F7' },
    { label:ko?'Starlink (소비자)':'Starlink (Consumer)', val:3.12, pct:'21%', growth:'+57%', color:'#3B82F6' },
    { label:ko?'엔터프라이즈·정부':'Enterprise & Govt', val:2.13, pct:'15%', growth:'+91%', color:'#10B981' },
    { label:ko?'기타':'Other', val:2.31, pct:'16%', growth:'+9%', color:'#6B7280' },
  ];
  const MAX_W=720, SEG_X=54, SEG_START_Y=340;
  let segsSvg = '';
  segs.forEach((s,i) => {
    const y = SEG_START_Y + i*120;
    const bw = Math.round(s.val/14.6*MAX_W);
    segsSvg += `<rect x="${SEG_X}" y="${y}" width="${bw}" height="80" rx="10" fill="${s.color}" opacity="0.85"/>`;
    segsSvg += `<text x="${SEG_X+18}" y="${y+30}" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="#000">${escXml(s.label)}</text>`;
    segsSvg += `<text x="${SEG_X+18}" y="${y+60}" font-family="Arial,sans-serif" font-size="20" fill="#000">$${s.val}B (${s.pct}) ${s.growth} YoY</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#08001A','#100030','#A855F7','#EC4899')}
  ${badge(54,18,130,'SPCX','#3B0764','#A855F7','#D8B4FE')}
  ${badge(196,18,130,ko?'Q3 실적':'Q3 Earnings','#1C1917','#F59E0B','#FDE68A')}
  ${badge(338,18,130,ko?'AI 1위':'AI is #1','#3B0764','#EC4899','#F9A8D4')}
  <rect x="54" y="70" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>

  <text x="540" y="154" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="100" font-weight="900" fill="url(#heroG)" filter="url(#glow)">$14.6B</text>
  <text x="540" y="212" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="38" font-weight="900" fill="#F1F5F9">${ko?'Q3 2026 총매출 · +161% YoY':'Q3 2026 REVENUE · +161% YoY'}</text>
  <text x="540" y="260" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#9CA3AF">${ko?'AI Solutions가 처음으로 1위 사업 등극 — 전체의 48%':'AI Solutions becomes #1 revenue segment — 48% of total'}</text>
  <rect x="200" y="282" width="680" height="2" fill="url(#accentG)" opacity="0.4"/>

  <text x="54" y="330" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">${ko?'매출 구성 (Q3 2026)':'Revenue breakdown (Q3 2026)'}</text>
  ${segsSvg}

  <rect x="54" y="830" width="972" height="1.5" fill="#2D1B69"/>

  ${statBox(54,852,296,170,ko?'총이익':'Gross Profit','$9.1B',ko?'+217% YoY':'+217% YoY',ko?'총이익률 62.3%':'62.3% gross margin','#A855F7')}
  ${statBox(392,852,296,170,ko?'영업이익':'Op. Income','$2.79B',ko?'Q3 2026':'Q3 2026',ko?'영업이익률 19.1%':'19.1% op. margin','#3B82F6')}
  ${statBox(730,852,296,170,ko?'순이익':'Net Income','$4.4B',ko?'Q3 2026':'Q3 2026',ko?'YoY 보합':'— YoY','#10B981')}

  ${msgBox(1044,240,
    ko?'핵심 포인트':'Key Point',
    ko?[
      'SpaceX의 가장 큰 사업은 이제 로켓도 스타링크도 아닌 AI다.',
      'Q3 한 분기에만 AI 매출 $7.02B — 이 숫자가 분기 단위다.',
      'AI Solutions +1856% YoY · R&D $4.6B · S&A $1.71B 함께 급증.',
      '2027년 AI 컴퓨팅 10GW 목표가 이 성장 속도를 설명한다.',
    ]:[
      "SpaceX's biggest business is now AI — not rockets, not Starlink.",
      'Q3 AI revenue $7.02B in a single quarter — that is a quarterly figure.',
      'AI Solutions +1856% YoY · R&D $4.6B +101% · SG&A $1.71B +197%.',
      '10GW AI compute target by 2027 maps exactly onto this growth trajectory.',
    ],
    'url(#accentG)','#4C1D95'
  )}

  ${footer()}
</svg>`;
}

// ── 4. Merger Structure (Reuters) ────────────────────────────────────────────
function makeMergerStructure(ko) {
  const structures = [
    {
      num:'①',
      title: ko?'SPCX가 TSLA 인수':'SPCX Acquires TSLA',
      body: ko?'테슬라 주주가 SpaceX 주식을 대가로 수령 — TSLA 보유자가 새 SpaceX 주주가 됨':'Tesla shareholders receive SpaceX shares as consideration',
      color:'#A855F7'
    },
    {
      num:'②',
      title: ko?'신규 지주회사 설립':'New Holding Company',
      body: ko?'양사 모두 새 지주회사의 자회사로 편입 — 별도 법인 유지하면서 통합 가능':'Both become subsidiaries of a newly established parent company',
      color:'#EC4899'
    },
    {
      num:'③',
      title: ko?'전주식 교환 (All-stock swap)':'All-Stock Transaction',
      body: ko?'현금 없이 주식으로만 거래 완결 — 양사 주주가 합병법인 주식을 나눠 보유':'No cash payment — companies exchange shares to complete the deal',
      color:'#3B82F6'
    },
  ];

  let structSvg = '';
  structures.forEach((s,i) => {
    const y = 390 + i*190;
    structSvg += `<rect x="54" y="${y}" width="972" height="168" rx="16" fill="#0F1623" stroke="${s.color}" stroke-width="2.5"/>`;
    structSvg += `<text x="108" y="${y+50}" font-family="Arial Black,Arial,sans-serif" font-size="40" font-weight="900" fill="${s.color}">${s.num}</text>`;
    structSvg += `<text x="170" y="${y+50}" font-family="Arial Black,Arial,sans-serif" font-size="28" font-weight="900" fill="#F3F4F6">${escXml(s.title)}</text>`;
    const bodyLines = wrapText(s.body, 56, ko);
    bodyLines.forEach((ln,li) => {
      structSvg += `<text x="108" y="${y+92+li*32}" font-family="Arial,sans-serif" font-size="23" fill="#D1D5DB">${escXml(ln)}</text>`;
    });
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0A0014','#18003A','#EC4899','#A855F7')}
  ${badge(54,18,130,'MERGE','#4C1D95','#A855F7','#D8B4FE')}
  ${badge(196,18,160,'Reuters','#1C1917','#F59E0B','#FDE68A')}
  ${badge(368,18,120,ko?'단독':'Exclusive','#7F1D1D','#EF4444','#FCA5A5')}
  <rect x="54" y="70" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>

  <text x="540" y="158" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="90" font-weight="900" fill="url(#heroG)" filter="url(#glow)">${ko?'합병 3가지':'3 PATHS'}</text>
  <text x="540" y="222" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="34" font-weight="900" fill="#F1F5F9">${ko?'Reuters 단독 — 협상 중인 딜 구조 공개':'REUTERS EXCLUSIVE — DEAL STRUCTURES DISCLOSED'}</text>
  <text x="540" y="272" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" fill="#9CA3AF">${ko?'합의된 조건 아닌 검토 중인 가능성 · Apollo·Goldman Sachs 8.3% 파이낸싱':'Possibilities under discussion, not agreed terms · Apollo &amp; GS 8.3% financing'}</text>
  <rect x="200" y="294" width="680" height="2" fill="url(#accentG)" opacity="0.4"/>

  <text x="54" y="375" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">${ko?'검토 중인 구조 3가지 (Reuters 2026-10-22)':'Structures under consideration (Reuters, Oct 22 2026)'}</text>
  ${structSvg}

  <rect x="54" y="966" width="972" height="90" rx="14" fill="#0F1623" stroke="#EC4899" stroke-width="2"/>
  <text x="540" y="1000" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#9CA3AF">${ko?'합병 시 합산 시가총액':'Combined market cap if merged'}</text>
  <text x="540" y="1046" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="40" font-weight="900" fill="#EC4899">${ko?'$3.63조 달러 — 글로벌 5위':'$3.63T — 5th most valuable company globally'}</text>

  ${msgBox(1078,220,
    ko?'이게 왜 중요한가':'Why This Matters',
    ko?[
      'Reuters가 구체적 딜 구조 3가지를 이름 붙여 보도했다.',
      '어드바이저(Apollo·Goldman) 선임은 딜이 법적 단계로 진입했다는 신호.',
      'TSLA 보유자는 시나리오 ①에서 SPCX 주식을 직접 수령한다.',
    ]:[
      'Reuters named three specific deal structures — this is not vague reporting.',
      'Apollo & Goldman hiring signals the deal has entered formal legal phase.',
      'Under scenario ①: TSLA holders directly receive SpaceX shares.',
    ],
    'url(#accentG)','#4C1D95'
  )}

  ${footer()}
</svg>`;
}

// ── 5. SpaceX 10GW + Q1'27 Guidance ─────────────────────────────────────────
function makeSpcxCompute(ko) {
  // Compute scale bar: current 1.7GW vs target 10GW+ vs US total 43GW
  const barY=500, barX=54, barW=972;
  function pctW(v) { return Math.round(v/43*barW); }
  const computeSvg = `
    <text x="54" y="${barY-16}" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${ko?'2027년 AI 컴퓨팅 규모 비교 (GW)':'2027 AI compute scale comparison (GW)'}</text>
    <rect x="${barX}" y="${barY}" width="${barW}" height="52" rx="10" fill="#1F2937"/>
    <rect x="${barX}" y="${barY}" width="${pctW(1.7)}" height="52" rx="10" fill="#6B7280"/>
    <rect x="${barX}" y="${barY}" width="${pctW(10)}" height="52" rx="4" fill="#06B6D4" opacity="0.7"/>
    <text x="${barX+pctW(1.7)/2}" y="${barY+35}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#fff">${ko?'현재 1.7GW':'Now 1.7GW'}</text>
    <text x="${barX+pctW(10)+10}" y="${barY+35}" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="#06B6D4">10GW+</text>
    <text x="${barX+barW}" y="${barY+35}" text-anchor="end" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">${ko?'미국 전체 43GW':'US total 43GW'}</text>`;

  // Q1'27 guidance comparison
  const guideY=620;
  const guideSvg = `
    <text x="54" y="${guideY-16}" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${ko?'Q1 2027 매출 가이던스 vs 컨센서스':'Q1 2027 Revenue Guidance vs Consensus'}</text>
    <rect x="${barX}" y="${guideY}" width="${Math.round(22/37*barW)}" height="56" rx="8" fill="#6B7280" opacity="0.6"/>
    <rect x="${barX}" y="${guideY}" width="${barW}" height="56" rx="8" fill="none" stroke="#06B6D4" stroke-width="2" stroke-dasharray="8,4"/>
    <text x="${barX+Math.round(22/37*barW)/2}" y="${guideY+38}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#fff">${ko?'컨센서스 $22B':'Consensus $22B'}</text>
    <text x="${barX+barW-16}" y="${guideY+38}" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#06B6D4">${ko?'가이던스 $33~37B':'Guidance $33–37B'}</text>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#000E18','#001820','#06B6D4','#3B82F6')}
  ${badge(54,18,130,'SPCX','#164E63','#06B6D4','#A5F3FC')}
  ${badge(196,18,160,ko?'컴퓨팅 확장':'Compute Scale','#164E63','#06B6D4','#A5F3FC')}
  ${badge(368,18,150,ko?'Q1 가이던스':'Q1\'27 Guide','#1C1917','#F59E0B','#FDE68A')}
  <rect x="54" y="70" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>

  <text x="540" y="158" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="110" font-weight="900" fill="url(#heroG)" filter="url(#glow)">10GW</text>
  <text x="540" y="218" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="34" font-weight="900" fill="#F1F5F9">${ko?'"내년 10GW 초과 가능" — Musk 직접 언급':'MUSK: "SHOT AT EXCEEDING 10GW NEXT YEAR"'}</text>
  <text x="540" y="266" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" fill="#9CA3AF">${ko?'미국 전체 AI 컴퓨팅 예측치 43GW 중 약 25% 점유 전망':'~25% of projected total US AI compute capacity by 2027'}</text>
  <rect x="200" y="288" width="680" height="2" fill="url(#accentG)" opacity="0.4"/>

  <rect x="54" y="308" width="972" height="168" rx="16" fill="#0F1A20" stroke="#06B6D4" stroke-width="2.5"/>
  <text x="108" y="352" font-family="Arial Black,Arial,sans-serif" font-size="28" font-weight="900" fill="#A5F3FC">${ko?'머스크 어닝콜 발언 원문 (요약)':'Musk Earnings Call Quote'}</text>
  <text x="108" y="390" font-family="Arial,sans-serif" font-size="23" fill="#E5E7EB">"${ko?'우리는 내년 10GW를 초과할 가능성이 있다':'We have a shot at exceeding 10GW next year'}"</text>
  <text x="108" y="428" font-family="Arial,sans-serif" font-size="21" fill="#9CA3AF">${ko?'— Elon Musk, SPCX Q3 2026 어닝콜':'— Elon Musk, SPCX Q3 2026 Earnings Call'}</text>
  <text x="108" y="464" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${ko?'기존 가이던스: 2027년 10GW | 현재: 1.7GW (약 17%)':'Prior guidance: 10GW by 2027 · Current: 1.7GW (~17%)'}</text>

  ${computeSvg}
  ${guideSvg}

  ${statBox(54,716,476,168,ko?'Q1\'27 가이던스 하단':'Q1\'27 Guide Low','$33B',ko?'vs 컨센서스 $22B':'vs $22B consensus',ko?'+50% 상회':'+50% above','#06B6D4')}
  ${statBox(550,716,476,168,ko?'BofA SPCX 목표가':'BofA SPCX Target','$275',ko?'기존 $235→상향':'$235→raised',ko?'$100B 런레이트 현실화 근거':'$100B run-rate reality basis','#3B82F6')}

  ${msgBox(908,390,
    ko?'$100B 런레이트 현실화':'$100B Run-Rate Reality',
    ko?[
      'BofA: "$100B 런레이트 2026년 내 달성 — 단순히 진행 중이 아니라 현실화 접근 중"',
      'Q1\'27 가이던스 $33~37B × 4 = $132~148B 연환산 — 이미 $100B 추월',
      '현재 컴퓨팅 1.7GW → 목표 10GW → 미국 AI 인프라 25% 독점 경로',
      'Terafab 완공(2028 Q3) 이전에도 자체 확장으로 10GW 달성 시도.',
    ]:[
      'BofA: "$100B run-rate by end of 2026 is not only on track, it\'s approaching reality."',
      'Q1\'27 guide $33–37B × 4 = $132–148B annualized — already past $100B threshold.',
      '1.7GW now → 10GW target → path to 25% of projected US AI infrastructure.',
      'Pre-Terafab (before Q3 2028): organic expansion bridges to 10GW.',
    ],
    'url(#accentG)','#164E63'
  )}

  ${footer()}
</svg>`;
}

// ── 6. Optimus Musk Quote ─────────────────────────────────────────────────────
function makeOptimusMusk(ko) {
  const quotes = ko ? [
    { text:'"초기 양산을 시작했다"', sub:'S커브 초입 — 초기 기울기는 완만하게 시작' },
    { text:'"1M대/년 라인 대부분 프리몬트 설치 완료"', sub:'일부 설계 조정·AI 개선 작업 진행 중' },
    { text:'"설계·AI 이슈는 내년 말까지 해결 예상"', sub:'전기기계 설계, 신뢰성, 수명, AI — 모두 내년 말' },
    { text:'"Optimus는 지구 최대 제품이 될 것"', sub:'기대 조정도 함께 — "아직 1년 더 필요한 과정"' },
  ] : [
    { text:'"We\'ve started early production"', sub:'S curve — initial curve is a shallow slope' },
    { text:'"Vast majority of 1M/yr line installed at Fremont"', sub:'Some design tweaks and AI work still in progress' },
    { text:'"Design & AI issues to be solved by end of next year"', sub:'Electromechanical design, reliability, usage life, AI' },
    { text:'"Optimus will be the biggest product on Earth"', sub:'Tempering expectations: "about a year to get through"' },
  ];

  let quotesSvg = '';
  quotes.forEach((q,i) => {
    const y = 350 + i*196;
    const tLines = wrapText(q.text, 50, ko);
    quotesSvg += `<rect x="54" y="${y}" width="972" height="174" rx="16" fill="#0F1623" stroke="#F97316" stroke-width="2" stroke-opacity="${0.9-i*0.15}"/>`;
    quotesSvg += `<rect x="54" y="${y}" width="6" height="174" rx="3" fill="#F97316" opacity="${1-i*0.2}"/>`;
    tLines.forEach((ln,li) => {
      quotesSvg += `<text x="88" y="${y+46+li*36}" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#FED7AA">${escXml(ln)}</text>`;
    });
    quotesSvg += `<text x="88" y="${y+148}" font-family="Arial,sans-serif" font-size="21" fill="#9CA3AF">${escXml(q.sub)}</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0A0400','#180800','#F97316','#FBBF24')}
  ${badge(54,18,130,'TSLA','#7C2D12','#F97316','#FED7AA')}
  ${badge(196,18,140,'Optimus','#7C2D12','#F97316','#FED7AA')}
  ${badge(348,18,180,ko?'머스크 발언':'Musk on Optimus','#1C1917','#F59E0B','#FDE68A')}
  <rect x="54" y="70" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>

  <text x="540" y="152" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="72" font-weight="900" fill="url(#heroG)" filter="url(#glow)">${ko?'지구 최대 제품':'BIGGEST PRODUCT'}</text>
  <text x="540" y="210" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="34" font-weight="900" fill="#F1F5F9">${ko?'Musk, Tesla Q3 2026 어닝콜 발언 전문':'MUSK · TESLA Q3 2026 EARNINGS CALL'}</text>
  <text x="540" y="260" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" fill="#9CA3AF">${ko?'"초기 양산 시작 · S커브 초입 · 1M/년 라인 프리몬트 완료"':'"Early production started · S curve early stage · 1M/yr line at Fremont"'}</text>
  <rect x="200" y="282" width="680" height="2" fill="url(#accentG)" opacity="0.4"/>

  ${quotesSvg}

  <rect x="54" y="1140" width="972" height="72" rx="14" fill="#0F1623" stroke="#FBBF24" stroke-width="2"/>
  <text x="108" y="1170" font-family="Arial,sans-serif" font-size="21" fill="#9CA3AF">${ko?'추가 — Kalshi 리포트 (10.22)':'Additional · Kalshi Report (Oct 22)'}</text>
  <text x="108" y="1202" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#FBBF24">${ko?'Optimus V3 영상 1~2개월 내 공개 · AI5 칩 통합 목표 2027년 4월':'Optimus V3 video in 1–2 months · AI5 chip integration target April 2027'}</text>

  ${footer()}
</svg>`;
}

// ── 7. FSD & Robotaxi ────────────────────────────────────────────────────────
function makeFsdRoboTaxi(ko) {
  const ashokLines = ko ? [
    '"수백만 대 규모로 확장하는 경로가 명확하게 보인다."',
    '"수개월 안에 수백만 대로 확장이 진행 중이다."',
    '"지난 수년간의 기술 투자가 이제 결실을 맺고 있다."',
    '"v15 스택이 핵심 — 기초가 빙산처럼 수면 아래에 있다."',
    '"이 기술은 우리가 운영 가능한 모든 곳의 수백만 대로 확장될 것이다."',
  ] : [
    '"We see a clear path towards scaling to millions of vehicles over the next several months."',
    '"The technology investments of the last several years are now paying off."',
    '"The v15 stack is the core — the foundations are like an iceberg below the surface."',
    '"The same technology should scale to millions of vehicles wherever we are allowed to operate."',
  ];

  let ashokSvg = '';
  ashokLines.forEach((ln,i) => {
    const lines = wrapText(ln, 56, ko);
    const y = 404 + i*(ko?64:80);
    ashokSvg += lines.map((l,li) =>
      `<text x="108" y="${y+li*28}" font-family="Arial,sans-serif" font-size="${ko?21:20}" fill="${i===0?'#93C5FD':'#9CA3AF'}">${escXml(l)}</text>`
    ).join('');
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#000A18','#00081A','#3B82F6','#06B6D4')}
  ${badge(54,18,130,'TSLA','#1E3A5F','#3B82F6','#93C5FD')}
  ${badge(196,18,100,'FSD','#1E3A5F','#3B82F6','#93C5FD')}
  ${badge(308,18,150,ko?'로보택시':'Robotaxi','#164E63','#06B6D4','#A5F3FC')}
  <rect x="54" y="70" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>

  <text x="540" y="158" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="110" font-weight="900" fill="url(#heroG)" filter="url(#glow)">1.74M</text>
  <text x="540" y="218" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="36" font-weight="900" fill="#F1F5F9">${ko?'FSD 활성 구독자 — 67% YoY 성장':'FSD ACTIVE SUBSCRIPTIONS — +67% YoY'}</text>
  <text x="540" y="268" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" fill="#9CA3AF">${ko?'누적 무인주행 200만 마일 달성 · 안전 데이터 업계 최고':'2M cumulative unsupervised miles · World-class safety data'}</text>
  <rect x="200" y="290" width="680" height="2" fill="url(#accentG)" opacity="0.4"/>

  <rect x="54" y="306" width="972" height="82" rx="14" fill="#1E3A5F" stroke="#3B82F6" stroke-width="2"/>
  <text x="108" y="336" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="#93C5FD">${ko?'Ashok Elluswamy — Tesla AI/FSD 책임자, Q3 어닝콜':'Ashok Elluswamy — Tesla AI/FSD VP, Q3 2026 Earnings Call'}</text>
  <text x="108" y="372" font-family="Arial,sans-serif" font-size="21" fill="#6B7280">${ko?'"v15 스택 기반으로 수백만 대 확장 경로 명확"':'"v15 stack enables clear path to millions of vehicles"'}</text>

  ${ashokSvg}

  <rect x="54" y="${ko?740:800}" width="972" height="1.5" fill="#1F2937"/>

  ${statBox(54,ko?760:820,476,168,ko?'FSD 누적 주행':'Cumulative FSD Miles','~15B',ko?'마일 (약 240억 km)':'miles driven',ko?'v12 이후 급격한 증가':'Exponential growth post-v12','#3B82F6')}
  ${statBox(550,ko?760:820,476,168,ko?'누적 무인주행':'Unsupervised Robotaxi','2M',ko?'마일 — 사고 0건':'miles, zero accidents',ko?'QoQ 8배 성장 · Austin 중심':'8× QoQ · Austin-based','#06B6D4')}

  ${msgBox(ko?952:1012,340,
    ko?'Ashok 발언의 의미':'Why Ashok\'s Statement Matters',
    ko?[
      'FSD VP가 어닝콜에서 직접 "수개월 안에 수백만 대" 발언.',
      '이는 Musk의 비전이 아닌 엔지니어링 리더의 기술적 확인이다.',
      'v15 스택 → 안전 데이터 업계 최고 → 규제 확장의 선순환.',
      '무인주행 누적 200만 마일은 데이터 기반 자율주행의 실증이다.',
    ]:[
      'The FSD VP — not Musk — said "millions of vehicles in next several months" on earnings call.',
      'That is an engineering leadership technical confirmation, not a vision statement.',
      'v15 stack → best-in-class safety data → regulatory expansion: a flywheel.',
      '2M unsupervised miles is empirical proof of data-driven autonomy at scale.',
    ],
    'url(#accentG)','#1E3A5F'
  )}

  ${footer()}
</svg>`;
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
(async () => {
  await save(`summary-${DATE}`,               makeSummary(true));
  await save(`summary-${DATE}-en`,            makeSummary(false));
  await save(`tsla-margin-${DATE}`,           makeTslaMargin(true));
  await save(`tsla-margin-${DATE}-en`,        makeTslaMargin(false));
  await save(`tsla-analyst-${DATE}`,          makeTslaAnalyst(true));
  await save(`tsla-analyst-${DATE}-en`,       makeTslaAnalyst(false));
  await save(`spcx-q3-${DATE}`,              makeSpcxQ3(true));
  await save(`spcx-q3-${DATE}-en`,           makeSpcxQ3(false));
  await save(`merger-structure-${DATE}`,      makeMergerStructure(true));
  await save(`merger-structure-${DATE}-en`,   makeMergerStructure(false));
  await save(`spcx-compute-${DATE}`,         makeSpcxCompute(true));
  await save(`spcx-compute-${DATE}-en`,      makeSpcxCompute(false));
  await save(`optimus-musk-${DATE}`,         makeOptimusMusk(true));
  await save(`optimus-musk-${DATE}-en`,      makeOptimusMusk(false));
  await save(`fsd-robotaxi-${DATE}`,         makeFsdRoboTaxi(true));
  await save(`fsd-robotaxi-${DATE}-en`,      makeFsdRoboTaxi(false));
  console.log(`\n✅ All 16 charts done.`);
})();
