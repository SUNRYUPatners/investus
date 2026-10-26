#!/usr/bin/env node
// Chart generator — 2026-10-26 (월) — SPCX 328M 잠금해제 발효 · 합병위 · SpaceX Q3 +161% · Tesla Q3 · 10Y 5%
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/charts');
const DATE = '20261026';

function escXml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function wrapText(text, maxVis) {
  function visLen(s) { let v=0; for (const ch of s) v+=/[가-힯぀-ヿ一-鿿]/.test(ch)?2:1; return v; }
  const words=text.split(' '); const lines=[]; let cur='',curV=0;
  for (const w of words) {
    const wv=visLen(w); const sep=cur?1:0;
    if (curV+sep+wv>maxVis&&cur){lines.push(cur);cur=w;curV=wv;}
    else{cur=cur?cur+' '+w:w;curV+=sep+wv;}
  }
  if(cur)lines.push(cur); return lines;
}
function base(f1='#0D1117',f2='#0A0520',a1='#EF4444',a2='#C084FC'){
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
function footer(){
  return `<rect x="0" y="1340" width="1080" height="10" fill="url(#accentG)"/>
  <text x="40" y="1333" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">investus.kr · Not investment advice · INVESTUS SRP</text>`;
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
function msgBox(y,h,titleText,lines,accentTop='#F59E0B',borderColor='#92400E'){
  const lh=34;
  const textSvg=lines.map((ln,i)=>
    `<text x="108" y="${y+72+i*lh}" font-family="Arial,sans-serif" font-size="24" fill="${i===lines.length-1?'#FDE68A':'#E5E7EB'}">${escXml(ln)}</text>`
  ).join('');
  return `<rect x="54" y="${y}" width="972" height="${h}" rx="22" fill="#0F0A00" stroke="${borderColor}" stroke-width="2.5"/>
  <rect x="54" y="${y}" width="972" height="5" rx="3" fill="${accentTop}"/>
  <text x="108" y="${y+44}" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#FDE68A">${escXml(titleText)}</text>
  <rect x="108" y="${y+52}" width="864" height="1" fill="${borderColor}"/>
  ${textSvg}`;
}
async function save(name,svgStr){
  const svgPath=path.join(OUT,`${name}.svg`);
  const pngPath=path.join(OUT,`${name}.png`);
  fs.writeFileSync(svgPath,svgStr);
  await sharp(Buffer.from(svgStr)).resize(1080,1350).png().toFile(pngPath);
  console.log(`✓ ${name}.png`);
}

// ── 0. SUMMARY ──────────────────────────────────────────────────────────────
function makeSummary(ko){
  const rows = ko ? [
    { label:'SPCX', color:'#EC4899',
      title:'328M주 잠금해제 오늘(10/26) 발효 · 10/22 1.3B 이미 흡수',
      detail:'IPO 이후 6회 연속 해제마다 주가 상승 · EPS 0.35 서프라이즈 흡수 여력' },
    { label:'합병', color:'#A855F7',
      title:'Tesla-SpaceX 독립위원회 탐색 단계 — 머스크 불참',
      detail:'10/20 구성 확인 · 주주 투표 필요 · 확정 조건 없음' },
    { label:'SPCX', color:'#F97316',
      title:'SpaceX Q3 매출 +161% · AI 사업 거의 절반 · EPS 0.35 vs 0.15',
      detail:'145.8억달러 · 예상 127억 상회 · 9배 AI 성장 · Q1\'27 가이던스 330~370억' },
    { label:'TSLA', color:'#10B981',
      title:'Tesla Q3 FSD 174만(+67%) · Optimus 프리몬트 양산 시작',
      detail:'매출 280억 플랫 · 순이익 -43% · R&D +69% · 자본지출 200억 하향' },
    { label:'매크로', color:'#EF4444',
      title:'10Y 국채 5.00% 마감 — 성장주 할인율 압박',
      detail:'브렌트 116.72달러 · 물가기대 4.7% · 11월 FOMC 동결 예상' },
  ] : [
    { label:'SPCX', color:'#EC4899',
      title:'328M unlock live today (Oct 26) · 1.3B already absorbed Oct 22',
      detail:'6 consecutive post-IPO unlocks all net positive · EPS 0.35 beat provides absorption' },
    { label:'MERGER', color:'#A855F7',
      title:'Tesla-SpaceX independent committees — exploratory stage',
      detail:'Confirmed Oct 20 · Musk conflicted/not on committee · No agreed terms' },
    { label:'SPCX', color:'#F97316',
      title:'SpaceX Q3 +161% revenue · AI is nearly half · EPS $0.35 vs $0.15',
      detail:'$14.58B vs $12.7B est · 9x AI growth YoY · Q1\'27 guide $33–37B' },
    { label:'TSLA', color:'#10B981',
      title:'Tesla Q3 FSD 1.74M (+67%) · Optimus Fremont production starts',
      detail:'Revenue $28B flat · Net income -43% · R&D +69% · Capex cut to $20B' },
    { label:'MACRO', color:'#EF4444',
      title:'10Y yield at 5.00% — growth stock discount rate pressure',
      detail:'Brent $116.72 · Inflation exp. 4.7% · Nov FOMC expected hold' },
  ];

  const TITLE_FS=22,TITLE_LH=27,DETAIL_FS=18,DETAIL_LH=22,PAD_T=12,GAP=4,PAD_B=10,ROW_GAP=5;
  let rowsSvg=''; let curY=188;
  rows.forEach((r)=>{
    const tLines=wrapText(r.title,54); const dLines=wrapText(r.detail,62);
    const rowH=PAD_T+tLines.length*TITLE_LH+GAP+dLines.length*DETAIL_LH+PAD_B;
    rowsSvg+=`<rect x="54" y="${curY}" width="972" height="${rowH}" rx="12" fill="#111827" stroke="${r.color}" stroke-width="1.5" stroke-opacity="0.4"/>`;
    rowsSvg+=`<rect x="54" y="${curY}" width="8" height="${rowH}" rx="4" fill="${r.color}"/>`;
    rowsSvg+=`<text x="84" y="${curY+PAD_T+18}" font-family="Arial Black,Arial,sans-serif" font-size="15" font-weight="900" fill="${r.color}">${escXml(r.label)}</text>`;
    tLines.forEach((ln,li)=>{rowsSvg+=`<text x="168" y="${curY+PAD_T+TITLE_LH*(li+1)-3}" font-family="Arial Black,Arial,sans-serif" font-size="${TITLE_FS}" font-weight="900" fill="#F3F4F6">${escXml(ln)}</text>`;});
    dLines.forEach((ln,li)=>{rowsSvg+=`<text x="168" y="${curY+PAD_T+tLines.length*TITLE_LH+GAP+DETAIL_LH*(li+1)-2}" font-family="Arial,sans-serif" font-size="${DETAIL_FS}" fill="#9CA3AF">${escXml(ln)}</text>`;});
    curY+=rowH+ROW_GAP;
  });

  const topicCount=rows.length;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#020814','#06060F','#EC4899','#A855F7')}
  <text x="54" y="54" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">2026.10.26</text>
  <text x="1026" y="54" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">@investus.kr</text>
  <text x="54" y="108" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="#F9FAFB" filter="url(#glow)">${ko?'한장요약':'Daily Summary'}</text>
  <text x="54" y="148" font-family="Arial,sans-serif" font-size="26" fill="#EC4899">2026.10.26 · TOP ${topicCount}</text>
  <rect x="54" y="165" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  ${rowsSvg}
  ${footer()}
</svg>`;
}

// ── 1. SPCX LOCKUP 328M ──────────────────────────────────────────────────────
function makeSpcxUnlock(ko){
  const batches = ko ? [
    { date:'IPO 직후', shares:'2.1B', note:'기관·초기 직원 1차 해제', color:'#6B7280', pct:100 },
    { date:'10/22 (목)', shares:'1.3B', note:'분기 어닝 링크드 · 최대 단일', color:'#EF4444', pct:62 },
    { date:'10/26 (월)', shares:'328M', note:'토(10/24) 만기 → 오늘 거래 시작', color:'#F97316', pct:15 },
    { date:'11월 초(예정)', shares:'~200M', note:'다음 정기 잠금 만기', color:'#EAB308', pct:9 },
  ] : [
    { date:'Post-IPO', shares:'2.1B', note:'Institutional + early employee', color:'#6B7280', pct:100 },
    { date:'Oct 22 (Thu)', shares:'1.3B', note:'Earnings-linked · largest single', color:'#EF4444', pct:62 },
    { date:'Oct 26 (Mon)', shares:'328M', note:'Sat Oct 24 expiry → today', color:'#F97316', pct:15 },
    { date:'Early Nov (est)', shares:'~200M', note:'Next scheduled lockup expiry', color:'#EAB308', pct:9 },
  ];
  const barX=320,barMaxW=640,barH=42,rowH=72,startY=270;
  let barsSvg='';
  batches.forEach((b,i)=>{
    const y=startY+i*rowH; const bw=Math.round(barMaxW*b.pct/100);
    barsSvg+=`<rect x="${barX}" y="${y}" width="${barMaxW}" height="${barH}" rx="8" fill="#1F2937"/>`;
    barsSvg+=`<rect x="${barX}" y="${y}" width="${bw}" height="${barH}" rx="8" fill="${b.color}" opacity="0.85"/>`;
    barsSvg+=`<text x="${barX-12}" y="${y+barH/2+7}" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="19" font-weight="900" fill="#F3F4F6">${escXml(b.date)}</text>`;
    barsSvg+=`<text x="${barX+bw+10}" y="${y+barH/2-4}" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${b.color}">${escXml(b.shares)}</text>`;
    barsSvg+=`<text x="${barX+bw+10}" y="${y+barH/2+18}" font-family="Arial,sans-serif" font-size="17" fill="#9CA3AF">${escXml(b.note)}</text>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#080010','#04000A','#EC4899','#A855F7')}
  <text x="54" y="54" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">2026.10.26</text>
  <text x="1026" y="54" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">@investus.kr</text>
  ${badge(54,68,130,'# SPCX','#1E0A2E','#A855F7','#D8B4FE')}
  ${badge(196,68,180,'# 잠금해제','#1C1917','#F97316','#FED7AA')}
  <rect x="54" y="120" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="198" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="72" font-weight="900" fill="url(#heroG)" filter="url(#glow)">${ko?'328M주':'328M Shares'}</text>
  <text x="540" y="248" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="#C084FC">${ko?'오늘(10/26) 거래 가능 — 토요일 만기 이연':'Live Today Oct 26 — Weekend Expiry Rolls Over'}</text>
  ${barsSvg}
  ${statBox(54,580,476,180,ko?'10/22 해제':'Oct 22 unlock','1.3B',ko?'주 (역대 최대 단일)':'shares (record single)',ko?'주가 버텼음':'stock held','#EF4444')}
  ${statBox(550,580,476,180,ko?'오늘 해제':'Today unlock','328M',ko?'주 (25% 규모)':'shares (~25% of Oct 22)',ko?'토요일→월요일 이연':'Sat→Mon rollover','#F97316')}
  ${statBox(54,776,476,180,ko?'IPO 이후 총 해제':'Total since IPO','~3.7B',ko?'주 누적':'shares cumulative',ko?'전체 발행주 ~42%':'~42% of total shares','#6B7280')}
  ${statBox(550,776,476,180,ko?'Q1\'27 가이던스':'Q1\'27 guidance','$33-37B',ko?'vs 컨센서스 $22B':'vs $22B consensus',ko?'+50~68% 초과':'50–68% beat','#A855F7')}
  ${msgBox(972,310,ko?'핵심 체크포인트':'Key Checkpoint',ko?[
    '10/22에 1.3B주(최대 단일) 해제 — 주가가 버텼습니다.',
    '오늘 328M은 그것의 25% 규모 · 상대적으로 소규모입니다.',
    'EPS 0.35 서프라이즈 + 합병위 기대가 흡수 변수입니다.',
    'IPO 이후 6회 해제 모두 순흡수 — 7번째 확인 중입니다.',
  ]:[
    'Oct 22: 1.3B shares already unlocked — stock absorbed it.',
    'Today\'s 328M is ~25% that size — relatively manageable.',
    'EPS $0.35 beat + merger committee provide absorption.',
    '6 prior unlocks all net-positive — watching the 7th now.',
  ],'#A855F7','#4B0082')}
  ${footer()}
</svg>`;
}

// ── 2. MERGER COMMITTEE ───────────────────────────────────────────────────────
function makeMergerCommittee(ko){
  const items = ko ? [
    { label:'날짜', val:'2026년 10월 20일', sub:'머스크가 X에서 위원회 구성 확인', color:'#A855F7' },
    { label:'Tesla 위원장', val:'Robyn Denholm', sub:'독립이사 7명 중 구성 · 나스닥 상장 기준', color:'#10B981' },
    { label:'SpaceX 위원', val:'Botha·Jurvetson 外', sub:'독립이사 6명 포함', color:'#3B82F6' },
    { label:'머스크', val:'위원회 불참', sub:'양사 이해충돌자 → 협상 배제', color:'#EF4444' },
    { label:'현재 단계', val:'탐색 중', sub:'합의된 조건 없음 · 성사 보장 없음', color:'#6B7280' },
  ] : [
    { label:'Date', val:'October 20, 2026', sub:'Musk confirmed committees on X', color:'#A855F7' },
    { label:'Tesla Chair', val:'Robyn Denholm', sub:'7 independent directors · Nasdaq rules', color:'#10B981' },
    { label:'SpaceX Members', val:'Botha, Jurvetson +', sub:'6 independent directors included', color:'#3B82F6' },
    { label:'Musk', val:'NOT on committee', sub:'Conflicted party — excluded from talks', color:'#EF4444' },
    { label:'Current Stage', val:'Exploratory', sub:'No agreed terms · No deal guarantee', color:'#6B7280' },
  ];
  const rowH=136,startY=280;
  let itemsSvg='';
  items.forEach((it,i)=>{
    const y=startY+i*rowH;
    itemsSvg+=`<rect x="54" y="${y}" width="972" height="${rowH-10}" rx="16" fill="#0F1623" stroke="${it.color}" stroke-width="2"/>`;
    itemsSvg+=`<rect x="54" y="${y}" width="8" height="${rowH-10}" rx="4" fill="${it.color}"/>`;
    itemsSvg+=`<text x="90" y="${y+38}" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${escXml(it.label)}</text>`;
    itemsSvg+=`<text x="90" y="${y+80}" font-family="Arial Black,Arial,sans-serif" font-size="36" font-weight="900" fill="${it.color}">${escXml(it.val)}</text>`;
    itemsSvg+=`<text x="90" y="${y+110}" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${escXml(it.sub)}</text>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0A0210','#060014','#A855F7','#10B981')}
  <text x="54" y="54" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">2026.10.26</text>
  <text x="1026" y="54" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">@investus.kr</text>
  ${badge(54,68,130,'# TSLA','#051A10','#10B981','#6EE7B7')}
  ${badge(196,68,130,'# SPCX','#1E0A2E','#A855F7','#D8B4FE')}
  ${badge(338,68,190,'# 합병위원회','#100A28','#EC4899','#FBCFE8')}
  <rect x="54" y="120" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="198" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="56" font-weight="900" fill="url(#heroG)" filter="url(#glow)">${ko?'독립위원회':'Merger Committee'}</text>
  <text x="540" y="248" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#D8B4FE">${ko?'탐색 단계 · 머스크 이해충돌자로 불참':'Exploratory · Musk excluded as conflicted party'}</text>
  ${itemsSvg}
  ${msgBox(1000,284,ko?'다음 확인':'Next to Watch',ko?[
    '위원회 공식 보고 일정 — 아직 미발표.',
    '합병 비율 가정 — SpaceX 상장 4개월, 밸류에이션 협상이 핵심.',
    '주주 의결 구조 — 양사 과반 찬성 필요.',
    'Tesla 주주 입장: 비율과 SpaceX AI 가치 산정 방식이 관건.',
  ]:[
    'Committee official reporting timeline — not yet announced.',
    'Merger ratio: SpaceX IPO\'d 4 months ago — valuation gap is the hard part.',
    'Shareholder vote: both companies need majority approval.',
    'Tesla shareholders: ratio and how SpaceX AI revenue is valued.',
  ],'#A855F7','#4B0082')}
  ${footer()}
</svg>`;
}

// ── 3. TESLA Q3 ───────────────────────────────────────────────────────────────
function makeTeslaQ3(ko){
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#020C08','#010508','#10B981','#3B82F6')}
  <text x="54" y="54" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">2026.10.26</text>
  <text x="1026" y="54" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">@investus.kr</text>
  ${badge(54,68,130,'# TSLA','#051A10','#10B981','#6EE7B7')}
  ${badge(196,68,160,'# Q3 2026','#051214','#3B82F6','#93C5FD')}
  ${badge(368,68,130,'# 어닝','#1A0800','#F97316','#FED7AA')}
  <rect x="54" y="120" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="196" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="72" font-weight="900" fill="url(#heroG)" filter="url(#glow)">${ko?'FSD 174만':'FSD 1.74M'}</text>
  <text x="540" y="248" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="#F3F4F6">${ko?'+67% · Optimus 프리몬트 양산 시작':'+67% · Optimus Fremont Production Starts'}</text>
  <text x="540" y="284" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko?'Tesla Q3 2026 어닝 요약':'Tesla Q3 2026 Earnings Summary'}</text>
  <rect x="200" y="300" width="680" height="2" fill="url(#accentG)" opacity="0.3"/>
  ${statBox(54,316,308,190,ko?'Q3 매출':'Q3 Revenue','$28B',ko?'전년 동기 대비 플랫':'YoY flat',ko?'차량 인도 486,532대':'486,532 vehicles','#10B981')}
  ${statBox(386,316,308,190,ko?'순이익':'Net Income','$787M',ko?'-43% YoY':'-43% YoY',ko?'R&D 비용 69% 급증':'R&D +69% surge','#EF4444')}
  ${statBox(718,316,308,190,ko?'GAAP EPS':'GAAP EPS','$0.22',ko?'(비GAAP $0.48)':'(non-GAAP $0.48)',ko?'전년 $0.39':'prev year $0.39','#6B7280')}
  ${statBox(54,522,308,190,ko?'FSD 구독':'FSD Subs','174만',ko?'+67% YoY':'+67% YoY',ko?'ARR ~10억달러 근접':'ARR ~$1B approaching','#A855F7')}
  ${statBox(386,522,308,190,ko?'Optimus 생산':'Optimus','양산 개시',ko?'프리몬트 공장':'Fremont factory',ko?'46일 라인 전환':'46-day line retool','#F59E0B')}
  ${statBox(718,522,308,190,ko?'자본지출':'Capex','$20B',ko?'(기존 $25B+ → 하향)':'(cut from $25B+)',ko?'AI·로보틱스 집중':'AI & robotics focus','#3B82F6')}
  <!-- FSD growth visual -->
  <text x="540" y="758" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#9CA3AF">${ko?'FSD 구독 성장 추이':'FSD Subscription Growth'}</text>
  <rect x="54" y="770" width="972" height="2" fill="#1F2937"/>
  ${[
    { q:ko?'Q3\'25':'Q3\'25', v:104, c:'#4B5563' },
    { q:ko?'Q4\'25':'Q4\'25', v:121, c:'#4B5563' },
    { q:ko?'Q1\'26':'Q1\'26', v:140, c:'#10B981' },
    { q:ko?'Q2\'26':'Q2\'26', v:158, c:'#10B981' },
    { q:ko?'Q3\'26':'Q3\'26', v:174, c:'#A855F7' },
  ].map((b,i)=>{
    const maxH=150,maxV=174,bh=Math.round(b.v/maxV*maxH);
    const bx=160+i*155,by=900-bh,bw=110;
    return `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="8" fill="${b.c}"/>
<text x="${bx+bw/2}" y="${by-10}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="20" font-weight="900" fill="${b.c}">${b.v}만</text>
<text x="${bx+bw/2}" y="922" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#9CA3AF">${b.q}</text>`;
  }).join('')}
  ${msgBox(938,344,ko?'핵심 시사점':'Key Takeaway',ko?[
    '순이익 -43%는 R&D 27.6억(+69%) 급증이 원인 — AI·로보틱스 전환 비용.',
    'FSD 174만 구독은 반복매출 진입 신호 — ARR 10억달러 근접 중.',
    'Optimus 프리몬트 양산 개시 — 데모에서 상업 운영으로 전환.',
    '자본지출 200억 하향 = AI 투자 선별 집중 · 단기 FCF는 개선.',
  ]:[
    'Net income -43% comes from R&D $2.76B (+69%) — AI & robotics transition cost.',
    'FSD 1.74M subs signals repeatable revenue — ARR approaching $1B.',
    'Optimus Fremont line-start: demo to commercial production transition.',
    'Capex cut to $20B = selective AI focus · near-term FCF improves.',
  ],'#10B981','#064E3B')}
  ${footer()}
</svg>`;
}

// ── 4. SPACEX Q3 ─────────────────────────────────────────────────────────────
function makeSpacexQ3(ko){
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#080010','#04000A','#EC4899','#A855F7')}
  <text x="54" y="54" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">2026.10.26</text>
  <text x="1026" y="54" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">@investus.kr</text>
  ${badge(54,68,130,'# SPCX','#1E0A2E','#A855F7','#D8B4FE')}
  ${badge(196,68,160,'# Q3 2026','#100A28','#EC4899','#FBCFE8')}
  ${badge(368,68,130,'# 어닝','#1A0800','#F97316','#FED7AA')}
  <rect x="54" y="120" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="196" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="88" font-weight="900" fill="url(#heroG)" filter="url(#glow)">+161%</text>
  <text x="540" y="250" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="#F3F4F6">${ko?'매출 145.8억 · AI 사업 거의 절반 · EPS 0.35':'Revenue $14.58B · AI nearly half · EPS $0.35'}</text>
  <text x="540" y="286" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#C084FC">${ko?'SpaceX Q3 2026 어닝 · 2026년 10월 20일 발표':'SpaceX Q3 2026 Earnings · Reported October 20, 2026'}</text>
  <rect x="200" y="304" width="680" height="2" fill="url(#accentG)" opacity="0.3"/>
  ${statBox(54,318,308,190,ko?'Q3 매출':'Q3 Revenue','$14.58B',ko?'+161% YoY':'+161% YoY',ko?'예상 $12.7B 크게 상회':'vs $12.7B est (beat)','#EC4899')}
  ${statBox(386,318,308,190,ko?'EPS':'EPS','$0.35',ko?'예상 $0.15':'vs $0.15 est',ko?'2.3배 서프라이즈':'2.3× earnings beat','#F97316')}
  ${statBox(718,318,308,190,ko?'AI 사업':'AI business','~절반',ko?'전체 매출 비중':'of total revenue',ko?'전년 대비 9배 성장':'9x YoY growth','#A855F7')}
  ${statBox(54,524,308,190,ko?'Q1\'27 가이던스':'Q1\'27 guidance','$33-37B',ko?'컨센서스 $22B':'vs $22B consensus',ko?'+50~68% 초과':'50–68% beat','#10B981')}
  ${statBox(386,524,308,190,ko?'엔비디아 칩 구매':'Nvidia chip plan','$40B',ko?'금융조달 협의 중':'financing discussed',ko?'아폴로 주도 구조':'Apollo-led structure','#3B82F6')}
  ${statBox(718,524,308,190,ko?'시가총액 목표':'Target mktcap','$12T',ko?'씨티 존 고딘':'Citi John Godyn',ko?'모건 300달러 별도':'MS $300 separate','#6B7280')}
  <!-- revenue bar -->
  <text x="540" y="758" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#9CA3AF">${ko?'SpaceX 분기 매출 추이':'SpaceX Quarterly Revenue'}</text>
  <rect x="54" y="770" width="972" height="2" fill="#1F2937"/>
  ${[
    { q:'Q3\'25', v:559, c:'#4B5563' },
    { q:'Q4\'25', v:720, c:'#4B5563' },
    { q:'Q1\'26', v:900, c:'#EC4899' },
    { q:'Q2\'26', v:1180, c:'#EC4899' },
    { q:'Q3\'26', v:1458, c:'#A855F7' },
  ].map((b,i)=>{
    const maxH=150,maxV=1458,bh=Math.round(b.v/maxV*maxH);
    const bx=160+i*155,by=900-bh,bw=110;
    return `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="8" fill="${b.c}"/>
<text x="${bx+bw/2}" y="${by-10}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="18" font-weight="900" fill="${b.c}">$${(b.v/100).toFixed(1)}B</text>
<text x="${bx+bw/2}" y="922" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#9CA3AF">${b.q}</text>`;
  }).join('')}
  ${msgBox(938,344,ko?'핵심 시사점':'Key Takeaway',ko?[
    'AI 사업 절반·9배 성장 — 우주발사에서 AI 인프라 기업으로 중심 이동.',
    'EPS 0.35(예상 0.15) — 수익성이 매출 성장보다 빠르게 개선 중.',
    '400억달러 엔비디아 칩 구매 = 자체 AI 컴퓨팅 인프라 구축 의지.',
    'Q1\'27 가이던스 $33~37B vs $22B — 성장이 아직 초입임을 시사.',
  ]:[
    'AI is nearly half of sales, 9x YoY — SpaceX is now an AI infra company.',
    'EPS $0.35 vs $0.15 — profitability growing faster than revenue.',
    '$40B Nvidia chip plan = building own AI compute at data-center scale.',
    'Q1\'27 guide $33–37B vs $22B consensus — growth is still early innings.',
  ],'#A855F7','#4B0082')}
  ${footer()}
</svg>`;
}

// ── 5. MACRO 10Y 5% ──────────────────────────────────────────────────────────
function makeMacro10y(ko){
  const data = ko ? [
    { label:'10Y 국채수익률', val:'5.00%', sub:'10/24 금요일 종가 · 2025 이후 최고', color:'#EF4444' },
    { label:'브렌트유', val:'$116.72', sub:'중동 공급 우려 지속', color:'#F97316' },
    { label:'1년 물가기대', val:'4.7%', sub:'미시간대 소비자심리 조사', color:'#EAB308' },
    { label:'S&P 500', val:'-0.52%', sub:'NASDAQ -0.21% · 주간 기준', color:'#6B7280' },
    { label:'러셀 2000', val:'+2%', sub:'주간 상승 · 소형주 로테이션', color:'#10B981' },
    { label:'VIX', val:'19.71', sub:'공포지수 · 경계 수준 유지', color:'#A855F7' },
  ] : [
    { label:'10Y Treasury', val:'5.00%', sub:'Oct 24 close · highest since 2025', color:'#EF4444' },
    { label:'Brent Crude', val:'$116.72', sub:'Mideast supply concern persists', color:'#F97316' },
    { label:'1yr Inflation Exp', val:'4.7%', sub:'UMich consumer survey', color:'#EAB308' },
    { label:'S&P 500', val:'-0.52%', sub:'NASDAQ -0.21% · weekly basis', color:'#6B7280' },
    { label:'Russell 2000', val:'+2%', sub:'Weekly gain · small-cap rotation', color:'#10B981' },
    { label:'VIX', val:'19.71', sub:'Fear gauge · elevated caution', color:'#A855F7' },
  ];
  const rowH=110,startY=310,colW=486;
  let gridSvg='';
  data.forEach((it,i)=>{
    const col=i%2,row=Math.floor(i/2);
    const x=54+col*colW,y=startY+row*rowH;
    gridSvg+=`<rect x="${x}" y="${y}" width="${colW-12}" height="${rowH-10}" rx="14" fill="#0F1623" stroke="${it.color}" stroke-width="2"/>`;
    gridSvg+=`<rect x="${x}" y="${y}" width="6" height="${rowH-10}" rx="3" fill="${it.color}"/>`;
    gridSvg+=`<text x="${x+20}" y="${y+30}" font-family="Arial,sans-serif" font-size="19" fill="#9CA3AF">${escXml(it.label)}</text>`;
    gridSvg+=`<text x="${x+20}" y="${y+72}" font-family="Arial Black,Arial,sans-serif" font-size="38" font-weight="900" fill="${it.color}">${escXml(it.val)}</text>`;
    gridSvg+=`<text x="${x+20}" y="${y+96}" font-family="Arial,sans-serif" font-size="17" fill="#6B7280">${escXml(it.sub)}</text>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0D0004','#080002','#EF4444','#F97316')}
  <text x="54" y="54" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">2026.10.26</text>
  <text x="1026" y="54" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">@investus.kr</text>
  ${badge(54,68,170,'# 매크로','#200004','#EF4444','#FCA5A5')}
  ${badge(236,68,170,'# 10Y 금리','#180800','#F97316','#FED7AA')}
  <rect x="54" y="120" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="206" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="96" font-weight="900" fill="url(#heroG)" filter="url(#glow)">5.00%</text>
  <text x="540" y="258" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="#F3F4F6">${ko?'10년 국채수익률 — 2025년 이후 최고':'10Y Treasury — Highest Since 2025'}</text>
  <text x="540" y="294" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#FCA5A5">${ko?'성장주 할인율 직접 압박 · 2026년 10월 24일':'Direct discount rate headwind for growth stocks · Oct 24, 2026'}</text>
  ${gridSvg}
  ${msgBox(660,330,ko?'성장주 영향':'Growth Stock Impact',ko?[
    '10Y 5% → 미래 현금흐름 현재가치(PV) 하락 · TSLA·SPCX 직접 타격.',
    '브렌트 116달러 → 인플레 기대 고착화 → Fed 동결 압박 유지.',
    '소형주 +2% → 금리 민감도 낮은 가치주로 자금 이동 시작.',
    '11월 FOMC 금리 동결 예상 — 추가 인상 가능성은 에너지에 달림.',
  ]:[
    '5% yield → lower PV of future cash flows — TSLA & SPCX hit hardest.',
    'Brent $116 → sticky inflation expectations → Fed hold pressure stays.',
    'Russell 2000 +2% → money rotating to rate-insensitive value names.',
    'Nov FOMC expected hold — additional hike risk depends on energy.',
  ],'#EF4444','#7F1D1D')}
  ${msgBox(1006,276,ko?'투자 시사점':'Investment Angle',ko?[
    '웨드부시: FSD·로보택시 전환 스토리가 금리 변수를 넘는 차별화 요인.',
    '모건스탠리: 성장주 금리 압박 단기 유효 · AI 구조 수요는 지속.',
    '다음 확인: 11/6 FOMC, 에너지 공급 협상, 물가기대 추이.',
  ]:[
    'Wedbush: FSD + robotaxi story differentiates TSLA above rate risk.',
    'Morgan Stanley: rate headwind near-term real · AI structural demand holds.',
    'Next: Nov 6 FOMC, energy supply talks, inflation expectation trend.',
  ],'#F97316','#7C2D12')}
  ${footer()}
</svg>`;
}

(async()=>{
  for(const ko of [true,false]){
    const sfx=ko?'':'-en';
    await save(`summary-${DATE}${sfx}`,makeSummary(ko));
    await save(`spcx-unlock-328m-oct26-${DATE}${sfx}`,makeSpcxUnlock(ko));
    await save(`tsla-spcx-merger-committee-${DATE}${sfx}`,makeMergerCommittee(ko));
    await save(`tsla-q3-fsd-optimus-2026-${DATE}${sfx}`,makeTeslaQ3(ko));
    await save(`spcx-q3-earnings-161pct-${DATE}${sfx}`,makeSpacexQ3(ko));
    await save(`macro-10y-5pct-brent-oct26-${DATE}${sfx}`,makeMacro10y(ko));
  }
  console.log('All charts done.');
})();
