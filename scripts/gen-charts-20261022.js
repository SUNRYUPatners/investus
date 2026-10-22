#!/usr/bin/env node
// Chart generator — 2026-10-22 — TSLA Q3 2026 어닝 (9 charts KO+EN + summary)
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/charts');
const DATE = '20261022';

function escXml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function wrapText(text, maxChars, isKo) {
  const lines = [];
  if (!isKo) {
    const words = text.split(' '); let cur = '';
    for (const w of words) {
      const test = cur ? cur + ' ' + w : w;
      if (test.length > maxChars && cur) { lines.push(cur); cur = w; } else cur = test;
    }
    if (cur) lines.push(cur); return lines;
  }
  let cur = '', i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (/[a-zA-Z0-9$]/.test(ch)) {
      let word = '';
      while (i < text.length && /[a-zA-Z0-9$.,+\-:%/·×]/.test(text[i])) word += text[i++];
      if (cur.length + word.length > maxChars && cur.length > 0) { lines.push(cur); cur = word; } else cur += word;
    } else { cur += ch; i++; if (cur.length >= maxChars) { lines.push(cur); cur = ''; } }
  }
  if (cur.trim()) lines.push(cur.trim()); return lines;
}
function base(f1='#0D1117', f2='#0A0520') {
  return `<defs>
    <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${f1}"/><stop offset="100%" stop-color="${f2}"/>
    </linearGradient>
    <linearGradient id="accentG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#EF4444"/><stop offset="100%" stop-color="#C084FC"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1350" fill="url(#bgG)"/>
  <rect x="0" y="0" width="1080" height="10" fill="url(#accentG)"/>`;
}
function footer(ko) {
  return `<rect x="0" y="1340" width="1080" height="10" fill="url(#accentG)"/>
    <text x="40" y="1333" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">investus.kr · Not investment advice · INVESTUS SRP</text>`;
}
function badge(x, y, w, label, bg, border, tc) {
  return `<rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="${bg}"/>
    <rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="none" stroke="${border}" stroke-width="2"/>
    <text x="${x+w/2}" y="${y+26}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="18" font-weight="900" fill="${tc}">${escXml(label)}</text>`;
}
function statBox(x,y,w,h,top,big,unit,sub,accent='#EF4444') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#0F1623" stroke="${accent}" stroke-width="2"/>
    <text x="${x+w/2}" y="${y+34}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${escXml(top)}</text>
    <text x="${x+w/2}" y="${y+96}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="56" font-weight="900" fill="${accent}">${escXml(big)}</text>
    <text x="${x+w/2}" y="${y+128}" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#D1D5DB">${escXml(unit)}</text>
    <text x="${x+w/2}" y="${y+158}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">${escXml(sub)}</text>`;
}
async function save(name, svgStr) {
  const svgPath = path.join(OUT, `${name}.svg`);
  const pngPath = path.join(OUT, `${name}.png`);
  fs.writeFileSync(svgPath, svgStr);
  await sharp(Buffer.from(svgStr)).resize(1080,1350).png().toFile(pngPath);
  console.log(`✓ ${name}.png`);
}

// ── 0. SUMMARY ─────────────────────────────────────────────────────────────
function makeSummary(ko) {
  const rows = ko ? [
    { label:'TSLA', color:'#EF4444', text:'TSLA Q3 어닝: EPS $0.48 beat · FCF +$1.53B(WS -$4.5B) · GM 19.6%' },
    { label:'TSLA', color:'#EF4444', text:'FSD 구독 1.74M (+67%) · 북미 어태치율 75%+ · 누적 15B 마일' },
    { label:'TSLA', color:'#10B981', text:'Cybercab 무감독 2M 마일 8배 QoQ · Robotaxi 10개 도시 확장' },
    { label:'TSLA', color:'#10B981', text:'Optimus Early Ramp 공식 확인 · Fremont 양산 시작' },
    { label:'TSLA', color:'#EF4444', text:'Tesla 2030 5M 대 목표 · "수요가 생산 상당히 초과"' },
    { label:'MERGE', color:'#C084FC', text:'TSLA-SPCX 합병 특위 어닝콜 공식 확인 · TSLA +1% $377' },
    { label:'SPCX',  color:'#A855F7', text:'JPMorgan SPCX $500 목표 · 10GW AI 2027 · $400B ARR' },
    { label:'SPCX',  color:'#A855F7', text:'전 세계 GPU 모두 없어 — NVDA·Google·Amazon 재고 전무' },
    { label:'SPCX',  color:'#3B82F6', text:'Starship 1기 = Falcon 9 10기 · Terafab 2028 Q3 칩 양산' },
  ] : [
    { label:'TSLA', color:'#EF4444', text:'TSLA Q3: EPS $0.48 beat · FCF +$1.53B vs -$4.5B est · GM 19.6%' },
    { label:'TSLA', color:'#EF4444', text:'FSD 1.74M (+67% YoY) · 75%+ NA attach rate · ~15B cumulative miles' },
    { label:'TSLA', color:'#10B981', text:'Cybercab: 2M unsupervised miles (8× QoQ) · expanding to 10 cities' },
    { label:'TSLA', color:'#10B981', text:'Optimus "Early Ramp" in Fremont official investor disclosure' },
    { label:'TSLA', color:'#EF4444', text:'Tesla 2030 target: 5M vehicles/year · demand exceeds supply' },
    { label:'MERGE', color:'#C084FC', text:'TSLA-SPCX merger committees confirmed on earnings call · +1% $377' },
    { label:'SPCX',  color:'#A855F7', text:'JPMorgan SPCX $500 · 10GW AI compute by 2027 · ~$400B ARR' },
    { label:'SPCX',  color:'#A855F7', text:'SpaceX tried NVDA GB300/200, H100s, Google TPU, Trainium — none available' },
    { label:'SPCX',  color:'#3B82F6', text:'Starship = 10× Falcon 9 capacity · Terafab Q3 2028 chip volume' },
  ];
  const rowH = 84, topY = 200;
  const totalH = rows.length * rowH + 30;
  let rowsSvg = '';
  rows.forEach((r,i) => {
    const y = topY + i * rowH;
    const lines = wrapText(r.text, ko ? 30 : 50, ko);
    rowsSvg += `<rect x="54" y="${y}" width="972" height="${rowH-6}" rx="12" fill="#111827" stroke="${r.color}" stroke-width="1.5" stroke-opacity="0.5"/>`;
    rowsSvg += `<rect x="54" y="${y}" width="8" height="${rowH-6}" rx="4" fill="${r.color}"/>`;
    rowsSvg += `<text x="84" y="${y+24}" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="${r.color}">${escXml(r.label)}</text>`;
    lines.forEach((ln,li) => {
      rowsSvg += `<text x="170" y="${y+24+li*24}" font-family="Arial,sans-serif" font-size="${ko?22:20}" fill="#E6EDF3">${escXml(ln)}</text>`;
    });
  });
  const heroText = ko ? '2026-10-22 오늘의 요약' : 'Daily Summary 2026-10-22';
  const subText = ko ? `총 ${rows.length}개 토픽` : `${rows.length} topics today`;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base()}
  <text x="540" y="100" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#F3F4F6">${escXml(heroText)}</text>
  <text x="540" y="150" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${escXml(subText)} · TSLA Q3 2026 어닝</text>
  <rect x="54" y="168" width="972" height="2" fill="url(#accentG)" opacity="0.6"/>
  ${rowsSvg}
  ${footer(ko)}
</svg>`;
  return svg;
}

// ── 1. TSLA Q3 재무 ─────────────────────────────────────────────────────────
function makeTslaQ3(ko) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0D0508','#1A0A05')}
  ${badge(54,18,130,'TSLA','#7F1D1D','#EF4444','#FCA5A5')}
  ${badge(196,18,130,'어닝','#1C1917','#F59E0B','#FDE68A')}
  <rect x="54" y="70" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="152" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="96" font-weight="900" fill="#EF4444">+$1.53B</text>
  <text x="540" y="210" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="40" font-weight="900" fill="#F1F5F9">${ko?'잉여현금흐름 (FCF)':'Free Cash Flow'}</text>
  <text x="540" y="260" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko?'Wall Street 예상 -$4.5B — 6B달러 역전':'Wall Street estimated -$4.5B — $6B positive swing'}</text>
  <rect x="200" y="282" width="680" height="2" fill="url(#accentG)" opacity="0.4"/>
  ${statBox(54,300,476,178,ko?'Non-GAAP EPS':'Non-GAAP EPS','$0.48',ko?'vs $0.40 예상':'vs $0.40 est','컨센서스 상회','#10B981')}
  ${statBox(550,300,476,178,ko?'총이익률':'Gross Margin','19.6%',ko?'전분기 +280bp':'+280bp QoQ','Q2 2026: 16.8%','#F59E0B')}
  ${statBox(54,496,476,178,ko?'총매출':'Revenue','$28.05B',ko?'전년 동기 보합':'Flat YoY','서비스 +33% YoY','#3B82F6')}
  ${statBox(550,496,476,178,ko?'현금 및 유가증권':'Cash &amp; Investments','$45.4B',ko?'+9% QoQ':'+9% QoQ','역대 최고 수준','#A855F7')}
  <rect x="54" y="684" width="972" height="1.5" fill="#1F2937"/>
  <text x="108" y="726" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">${ko?'추가 주요 수치':'Additional Key Metrics'}</text>
  <rect x="108" y="734" width="864" height="1" fill="#374151"/>
  ${[
    [ko?'딜리버리':'Deliveries','486,532대','전분기 -2% / 컨센 상회'],
    [ko?'생산량':'Production','464,391대','+4% YoY'],
    [ko?'영업이익':'Operating Income','$718M','영업이익률 2.6%'],
    [ko?'GAAP 순이익':'GAAP Net Income','$787M ($0.22/주)',''],
    [ko?'에너지 배포':'Energy Deployed','13.7 GWh','+10% YoY'],
    [ko?'규제 크레딧':'Reg. Credits','$113M','Q3\'25 $417M 대비 급감'],
    [ko?'비트코인 평가익':'Bitcoin Gain','$288M','공정가치 첫 반영'],
    [ko?'설비투자':'CapEx','$4.73B',''],
  ].map(([k,v,s],i)=>{
    const y=762+i*62;
    return `<rect x="54" y="${y}" width="972" height="56" rx="10" fill="${i%2===0?'#111827':'#0F1623'}"/>
    <text x="84" y="${y+34}" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">${escXml(k)}</text>
    <text x="600" y="${y+34}" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="#F3F4F6">${escXml(v)}</text>
    <text x="620" y="${y+34}" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">${escXml(s)}</text>`;
  }).join('')}
  ${footer(ko)}
</svg>`;
  return svg;
}

// ── 2. FSD 성장 ─────────────────────────────────────────────────────────────
function makeFSD(ko) {
  const bars = [
    { q:'Q3\'25', v:1.04, color:'#374151' },
    { q:'Q4\'25', v:1.10, color:'#374151' },
    { q:'Q1\'26', v:1.28, color:'#374151' },
    { q:'Q2\'26', v:1.48, color:'#374151' },
    { q:'Q3\'26', v:1.74, color:'#EF4444' },
  ];
  const maxV = 1.9, chartX=80, chartW=920, chartH=320, chartY=460;
  const barW = chartW/bars.length*0.55, gap = chartW/bars.length;
  const barsSvg = bars.map((b,i)=>{
    const bh = (b.v/maxV)*chartH;
    const bx = chartX + i*gap + gap*0.22;
    const by = chartY + chartH - bh;
    return `<rect x="${bx}" y="${by}" width="${barW}" height="${bh}" rx="8" fill="${b.color}"/>
    <text x="${bx+barW/2}" y="${by-10}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${b.color==='#EF4444'?'#EF4444':'#9CA3AF'}">${b.v}M</text>
    <text x="${bx+barW/2}" y="${chartY+chartH+28}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${b.q}</text>`;
  }).join('');
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0D1117','#0A1020')}
  ${badge(54,18,130,'TSLA','#7F1D1D','#EF4444','#FCA5A5')}
  ${badge(196,18,100,'FSD','#1E1B4B','#6366F1','#A5B4FC')}
  <rect x="54" y="70" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="158" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="108" font-weight="900" fill="#EF4444">1.74M</text>
  <text x="540" y="216" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="40" font-weight="900" fill="#F1F5F9">${ko?'FSD 활성 구독자':'FSD Active Subscriptions'}</text>
  <text x="540" y="266" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">+67% YoY · Q3 2025: 1.04M</text>
  <rect x="${chartX}" y="${chartY}" width="${chartW}" height="${chartH}" fill="none"/>
  ${barsSvg}
  <rect x="${chartX}" y="${chartY+chartH}" width="${chartW}" height="1.5" fill="#374151"/>
  <rect x="54" y="830" width="972" height="1.5" fill="#1F2937"/>
  ${[
    [ko?'북미 신차 어태치율':'NA New Vehicle Attach Rate','75%+',ko?'전분기 대비 +20%p':'+20pp QoQ','#10B981'],
    [ko?'EU 서비스 국가':'EU Countries','9개국',ko?'Q2 대비 4개국 추가':'4 added since Q2','#3B82F6'],
    [ko?'EU 고객':'EU FSD Customers','100K+',ko?'누적 160M km 주행':'160M+ km driven','#A855F7'],
    [ko?'누적 FSD 주행':'Cumulative FSD Miles','~15B 마일',ko?'V12+ 버전이 대부분':'V12+ makes up majority','#F59E0B'],
  ].map(([k,v,s,c],i)=>{
    const y=856+i*106;
    return `<rect x="54" y="${y}" width="972" height="96" rx="16" fill="#111827" stroke="${c}" stroke-width="1.5" stroke-opacity="0.5"/>
    <text x="84" y="${y+36}" font-family="Arial,sans-serif" font-size="21" fill="#9CA3AF">${escXml(k)}</text>
    <text x="84" y="${y+72}" font-family="Arial Black,Arial,sans-serif" font-size="32" font-weight="900" fill="${c}">${escXml(v)}</text>
    <text x="${84+String(v).length*20+40}" y="${y+72}" font-family="Arial,sans-serif" font-size="21" fill="#6B7280">${escXml(s)}</text>`;
  }).join('')}
  ${footer(ko)}
</svg>`;
  return svg;
}

// ── 3. Robotaxi 확장 ────────────────────────────────────────────────────────
function makeRoboTaxi(ko) {
  const cities = ko ? [
    { name:'오스틴 (TX)', miles:'2,118,015', active:true },
    { name:'댈러스 (TX)', miles:'608,130', active:true },
    { name:'휴스턴 (TX)', miles:'225,964', active:true },
    { name:'마이애미 (FL)', miles:'46,262', active:true },
    { name:'올랜도 (FL)', miles:'61,053', active:true },
    { name:'탬파 (FL)', miles:'53,117', active:true },
    { name:'라스베이거스 (NV)', miles:'출시 예정', active:false },
    { name:'피닉스 (AZ)', miles:'출시 예정', active:false },
    { name:'샌안토니오 (TX)', miles:'출시 예정', active:false },
    { name:'잭슨빌 (FL)', miles:'출시 예정', active:false },
  ] : [
    { name:'Austin, TX', miles:'2,118,015 mi', active:true },
    { name:'Dallas, TX', miles:'608,130 mi', active:true },
    { name:'Houston, TX', miles:'225,964 mi', active:true },
    { name:'Miami, FL', miles:'46,262 mi', active:true },
    { name:'Orlando, FL', miles:'61,053 mi', active:true },
    { name:'Tampa, FL', miles:'53,117 mi', active:true },
    { name:'Las Vegas, NV', miles:'Coming soon', active:false },
    { name:'Phoenix, AZ', miles:'Coming soon', active:false },
    { name:'San Antonio, TX', miles:'Coming soon', active:false },
    { name:'Jacksonville, FL', miles:'Coming soon', active:false },
  ];
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0D1117','#051010')}
  ${badge(54,18,130,'TSLA','#7F1D1D','#EF4444','#FCA5A5')}
  ${badge(196,18,160,ko?'로보택시':'Robotaxi','#064E3B','#10B981','#6EE7B7')}
  <rect x="54" y="70" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="156" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="108" font-weight="900" fill="#10B981">2M</text>
  <text x="540" y="214" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="38" font-weight="900" fill="#F1F5F9">${ko?'무감독 자율주행 마일 (8배 QoQ)':'Unsupervised Miles · 8× QoQ'}</text>
  <text x="540" y="264" text-anchor="middle" font-family="Arial,sans-serif" font-size="25" fill="#9CA3AF">${ko?'Austin 3.1M 총 자율 마일 · 사고 0건':'Austin 3.1M total autonomous miles · 0 accidents'}</text>
  <rect x="200" y="285" width="680" height="2" fill="url(#accentG)" opacity="0.4"/>
  <text x="108" y="328" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#F9FAFB">${ko?'운행 도시 현황 (10개 도시)':'Robotaxi Cities (10 total)'}</text>
  ${cities.map((c,i)=>{
    const y=342+i*95; const col=c.active?'#10B981':'#374151'; const tc=c.active?'#6EE7B7':'#9CA3AF';
    return `<rect x="54" y="${y}" width="972" height="85" rx="14" fill="${c.active?'#0A1F1A':'#111827'}" stroke="${col}" stroke-width="${c.active?2:1}"/>
    <circle cx="96" cy="${y+42}" r="10" fill="${col}"/>
    <text x="116" y="${y+48}" font-family="Arial Black,Arial,sans-serif" font-size="${ko?24:22}" font-weight="900" fill="#F3F4F6">${escXml(c.name)}</text>
    <text x="900" y="${y+48}" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${tc}">${escXml(c.miles)}</text>`;
  }).join('')}
  ${footer(ko)}
</svg>`;
  return svg;
}

// ── 4. Optimus Early Ramp ────────────────────────────────────────────────────
function makeOptimusRamp(ko) {
  const items = ko ? [
    { product:'Optimus (캘리포니아)', status:'Early Ramp', color:'#10B981', isNew:true },
    { product:'Optimus (텍사스)', status:'착공 중', color:'#F59E0B', isNew:false },
    { product:'Cybercab (텍사스)', status:'양산 · 연 125,000대+', color:'#EF4444', isNew:false },
    { product:'Tesla Semi (네바다)', status:'양산 · 연 25,000대', color:'#3B82F6', isNew:false },
    { product:'Model Y (캘리포니아)', status:'양산 · 연 550,000대+', color:'#A855F7', isNew:false },
    { product:'Cybertruck (텍사스)', status:'양산 · 연 125,000대+', color:'#EF4444', isNew:false },
    { product:'Roadster', status:'설계 개발 중', color:'#6B7280', isNew:false },
  ] : [
    { product:'Optimus (California)', status:'Early Ramp ← NEW', color:'#10B981', isNew:true },
    { product:'Optimus (Texas)', status:'Under Construction', color:'#F59E0B', isNew:false },
    { product:'Cybercab (Texas)', status:'Production · >125,000/yr', color:'#EF4444', isNew:false },
    { product:'Tesla Semi (Nevada)', status:'Production · 25,000/yr', color:'#3B82F6', isNew:false },
    { product:'Model Y (California)', status:'Production · >550,000/yr', color:'#A855F7', isNew:false },
    { product:'Cybertruck (Texas)', status:'Production · >125,000/yr', color:'#EF4444', isNew:false },
    { product:'Roadster', status:'Design Development', color:'#6B7280', isNew:false },
  ];
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#051A0D','#0D1117')}
  ${badge(54,18,130,'TSLA','#7F1D1D','#EF4444','#FCA5A5')}
  ${badge(196,18,160,ko?'옵티머스':'Optimus','#064E3B','#10B981','#6EE7B7')}
  <rect x="54" y="70" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="150" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="72" font-weight="900" fill="#10B981">${ko?'Early Ramp 공식 확인':'Early Ramp Confirmed'}</text>
  <text x="540" y="216" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="#F1F5F9">${ko?'Fremont 기가팩토리 — 첫 양산 품질 로봇 생산 중':'Fremont Gigafactory — first production-quality Optimus'}</text>
  <text x="540" y="262" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#9CA3AF">${ko?'Tesla Q3 2026 공식 실적 자료 최초 기재':'First appearance in official Tesla Q3 2026 investor materials'}</text>
  <rect x="200" y="284" width="680" height="2" fill="url(#accentG)" opacity="0.4"/>
  <text x="108" y="326" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#F9FAFB">${ko?'연간 생산 캐파 현황 (공식)':'Annual Production Capacity (Official)'}</text>
  ${items.map((it,i)=>{
    const y=342+i*128; const hl=it.isNew;
    return `<rect x="54" y="${y}" width="972" height="118" rx="16" fill="${hl?'#0A2A1A':'#0F1623'}" stroke="${it.color}" stroke-width="${hl?2.5:1.5}"/>
    ${hl?`<rect x="54" y="${y}" width="972" height="4" rx="2" fill="${it.color}"/>`:``}
    <text x="84" y="${y+44}" font-family="Arial Black,Arial,sans-serif" font-size="${ko?26:24}" font-weight="900" fill="#F3F4F6">${escXml(it.product)}</text>
    <text x="84" y="${y+82}" font-family="Arial,sans-serif" font-size="${ko?24:22}" fill="${it.color}">${escXml(it.status)}</text>`;
  }).join('')}
  ${footer(ko)}
</svg>`;
  return svg;
}

// ── 5. Tesla 5M 목표 ─────────────────────────────────────────────────────────
function makeTesla5M(ko) {
  const milestones = ko ? [
    { year:'2026', val:'~2M', label:'현재 연간 생산', color:'#374151' },
    { year:'2027', val:'~2.5M', label:'26% 성장 경로', color:'#4B5563' },
    { year:'2028', val:'~3.2M', label:'복리 26% 궤적', color:'#6B7280' },
    { year:'2029', val:'~4M',   label:'Cybercab + Optimus 가세', color:'#9CA3AF' },
    { year:'2030', val:'5M',   label:'어닝콜 공식 목표', color:'#EF4444' },
  ] : [
    { year:'2026', val:'~2M', label:'Current annual run rate', color:'#374151' },
    { year:'2027', val:'~2.5M', label:'On 26% CAGR path', color:'#4B5563' },
    { year:'2028', val:'~3.2M', label:'Compounding trajectory', color:'#6B7280' },
    { year:'2029', val:'~4M',   label:'Cybercab + Optimus added', color:'#9CA3AF' },
    { year:'2030', val:'5M',   label:'Musk earnings call target', color:'#EF4444' },
  ];
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0D1117','#1A0A05')}
  ${badge(54,18,130,'TSLA','#7F1D1D','#EF4444','#FCA5A5')}
  ${badge(196,18,130,'2030','#1C1917','#F59E0B','#FDE68A')}
  <rect x="54" y="70" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="160" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="120" font-weight="900" fill="#EF4444">5M</text>
  <text x="540" y="220" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="42" font-weight="900" fill="#F1F5F9">${ko?'2030년 연간 생산 목표':'2030 Annual Production Target'}</text>
  <text x="540" y="270" text-anchor="middle" font-family="Arial,sans-serif" font-size="25" fill="#9CA3AF">${ko?'"수요가 생산을 상당히 초과" — Musk, Q3 2026 어닝콜':'"Demand growing rapidly, exceeding production" — Musk, Q3 2026 call'}</text>
  <rect x="200" y="292" width="680" height="2" fill="url(#accentG)" opacity="0.4"/>
  ${milestones.map((m,i)=>{
    const y=318+i*188; const isLast=i===milestones.length-1;
    const barW=Math.round((i+1)/milestones.length*860);
    return `<rect x="54" y="${y}" width="972" height="174" rx="18" fill="${isLast?'#1F0A0A':'#111827'}" stroke="${m.color}" stroke-width="${isLast?2.5:1}"/>
    ${isLast?`<rect x="54" y="${y}" width="972" height="5" rx="3" fill="${m.color}"/>`:``}
    <text x="84" y="${y+40}" font-family="Arial Black,Arial,sans-serif" font-size="28" font-weight="900" fill="${m.color}">${escXml(m.year)}</text>
    <text x="200" y="${y+40}" font-family="Arial Black,Arial,sans-serif" font-size="38" font-weight="900" fill="#F3F4F6">${escXml(m.val)}</text>
    <text x="84" y="${y+74}" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">${escXml(m.label)}</text>
    <rect x="84" y="${y+90}" width="${barW}" height="20" rx="10" fill="${m.color}" opacity="0.8"/>`;
  }).join('')}
  ${footer(ko)}
</svg>`;
  return svg;
}

// ── 6. Starship + Terafab ────────────────────────────────────────────────────
function makeStarshipTerafab(ko) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#050A1A','#0D1117')}
  ${badge(54,18,130,'SPCX','#3B0764','#A855F7','#D8B4FE')}
  ${badge(196,18,160,ko?'스타십':'Starship','#0C1A2E','#3B82F6','#93C5FD')}
  <rect x="54" y="70" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="148" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="60" font-weight="900" fill="#3B82F6">Starship = Falcon 9 × 10</text>
  <text x="540" y="208" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko?'Flight 14 · Starlink V3 위성 26기 · ~26Tbps 단번 추가':'Flight 14 · 26 Starlink V3 sats · +~26Tbps in one launch'}</text>
  <text x="540" y="252" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" fill="#6B7280">${ko?'탑재 여유도 ~50% — 절반만 채워도 Falcon 9 10기 대등':'Only half loaded — still equals 10 Falcon 9 launches'}</text>
  <rect x="54" y="274" width="972" height="2" fill="#1F2937"/>
  ${statBox(54,290,476,178,ko?'Starship 다운링크 용량':'Starship Downlink','10×','Falcon 9 대비','V3 위성 1기 = V1.5 ×10','#3B82F6')}
  ${statBox(550,290,476,178,ko?'V3 위성 단일 발사':'V3 Sats Deployed','26기',ko?'(~26 Tbps 추가)':'(+~26 Tbps)','Flight 14 배포','#A855F7')}
  <rect x="54" y="480" width="972" height="2" fill="#1F2937"/>
  <text x="108" y="526" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="#F59E0B">Terafab</text>
  <text x="108" y="560" font-family="Arial,sans-serif" font-size="23" fill="#9CA3AF">${ko?'"세계에서 경제 가치가 가장 높은 건물 — 상위 20개국 수준"':'"Will be the most valuable building in the world — top 20 countries"'}</text>
  <text x="108" y="590" font-family="Arial,sans-serif" font-size="21" fill="#6B7280">— Elon Musk, Tesla Q3 2026 Earnings Call</text>
  ${[
    [ko?'기계 설비 착수':'Machinery Commissioning','2027년 H1','#F59E0B'],
    [ko?'첫 테스트 칩':'First Test Chip','2027년 5~6월','#F59E0B'],
    [ko?'칩 양산 규모':'Chip Volume Production','2028년 Q3 목표','#EF4444'],
    [ko?'1단계 투자':'Phase 1 Investment','$16.8B · 1억 sqft','#A855F7'],
    [ko?'한국 반도체 파트너':'Korean Semi NDA','10개사+ NDA 체결','#3B82F6'],
  ].map(([k,v,c],i)=>{
    const y=616+i*118;
    return `<rect x="54" y="${y}" width="972" height="108" rx="16" fill="#0F1623" stroke="${c}" stroke-width="1.5"/>
    <text x="84" y="${y+38}" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">${escXml(k)}</text>
    <text x="84" y="${y+76}" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="${c}">${escXml(v)}</text>`;
  }).join('')}
  ${footer(ko)}
</svg>`;
  return svg;
}

// ── 7. SPCX JPMorgan ─────────────────────────────────────────────────────────
function makeSpcxJPMorgan(ko) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0A0518','#0D1117')}
  ${badge(54,18,130,'SPCX','#3B0764','#A855F7','#D8B4FE')}
  ${badge(196,18,160,'JPMorgan','#1C1917','#F59E0B','#FDE68A')}
  <rect x="54" y="70" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="166" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="128" font-weight="900" fill="#A855F7">$500</text>
  <text x="540" y="224" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="40" font-weight="900" fill="#F1F5F9">JPMorgan ${ko?'목표가':'Price Target'}</text>
  <text x="540" y="272" text-anchor="middle" font-family="Arial,sans-serif" font-size="25" fill="#9CA3AF">${ko?'"모델에서 1년 이상 앞당김 · 추정치 두 배 이상 상향"':'"Pulling forward more than a year in our model, estimates 2×+"'}</text>
  <rect x="200" y="294" width="680" height="2" fill="url(#accentG)" opacity="0.4"/>
  ${statBox(54,310,476,178,ko?'2027년 AI 컴퓨팅':'2027 AI Compute','10GW',ko?'목표 달성 시':'Target by end-2027','2×+ from current 1.7GW','#A855F7')}
  ${statBox(550,310,476,178,ko?'예상 ARR':'Projected ARR','~$400B',ko?'연간 반복 매출':'Annual Recurring Revenue','10GW 달성 시','#F59E0B')}
  <rect x="54" y="500" width="972" height="1.5" fill="#1F2937"/>
  <text x="108" y="544" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#EF4444">${ko?'GPU 대여 시도 — 전 세계 모두 없음':'GPU Rental Attempt — None Available Globally'}</text>
  ${[
    ['NVDA GB300 / GB200',ko?'재고 없음':'Unavailable'],
    ['NVDA H100 (구형)',ko?'재고 없음':'Unavailable'],
    ['Google TPU',ko?'재고 없음':'Unavailable'],
    ['Amazon Trainium',ko?'재고 없음':'Unavailable'],
  ].map(([k,v],i)=>{
    const y=560+i*110;
    return `<rect x="54" y="${y}" width="972" height="100" rx="16" fill="#1F0A0A" stroke="#EF4444" stroke-width="1.5"/>
    <text x="84" y="${y+42}" font-family="Arial,sans-serif" font-size="26" fill="#F3F4F6">${escXml(k)}</text>
    <text x="900" y="${y+58}" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="28" font-weight="900" fill="#EF4444">${escXml(v)}</text>`;
  }).join('')}
  <rect x="54" y="1010" width="972" height="110" rx="18" fill="#0F1623" stroke="#A855F7" stroke-width="2"/>
  <text x="108" y="1054" font-family="Arial,sans-serif" font-size="23" fill="#D8B4FE">${ko?'결론: 자체 AI 인프라(Terafab) 구축이 유일한 전략':'Conclusion: Self-built AI infrastructure is the only viable path'}</text>
  <text x="108" y="1090" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#A855F7">${ko?'Deutsche Bank: SPCX 슈퍼인텔리전스 2027년 $70~80B 매출':'Deutsche Bank: SPCX SuperIntelligence $70–80B revenue by 2027'}</text>
  ${footer(ko)}
</svg>`;
  return svg;
}

// ── 8. 합병 특위 어닝콜 ──────────────────────────────────────────────────────
function makeMergerCall(ko) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#1A0505','#0D1117')}
  ${badge(54,18,130,'TSLA','#7F1D1D','#EF4444','#FCA5A5')}
  ${badge(196,18,130,'SPCX','#3B0764','#A855F7','#D8B4FE')}
  ${badge(338,18,160,ko?'합병 특위':'Merger Cmte','#1C1917','#F59E0B','#FDE68A')}
  <rect x="54" y="70" width="972" height="2" fill="url(#accentG)" opacity="0.5"/>
  <text x="540" y="158" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="64" font-weight="900" fill="#EF4444">${ko?'합병 특위':'MERGER COMMITTEE'}</text>
  <text x="540" y="218" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="#F1F5F9">${ko?'어닝콜 공식 확인':'CONFIRMED ON EARNINGS CALL'}</text>
  <text x="540" y="272" text-anchor="middle" font-family="Arial,sans-serif" font-size="25" fill="#9CA3AF">${ko?'Musk 직접 발언 — 양사 이사회 독립 특위 구성':'Musk confirmed directly — both boards formed independent special committees'}</text>
  <rect x="200" y="294" width="680" height="2" fill="url(#accentG)" opacity="0.4"/>
  ${statBox(54,310,476,178,ko?'TSLA 어닝 이후':'TSLA Post-Earnings','+1.01%','$377.49',ko?'합병 + EPS 서프 동시 소화':'Absorbed merger + EPS beat','#10B981')}
  ${statBox(550,310,476,178,ko?'ARK TSLA 목표가':'ARK TSLA Target','$4,400','Base 2031',ko?'합병 시너지 미반영':'Merger upside not yet reflected','#F59E0B')}
  <rect x="54" y="500" width="972" height="1.5" fill="#1F2937"/>
  ${[
    {
      who: ko?'진 먼스터 (딥워터)':'Gene Munster (Deepwater)',
      quote: ko?'"지금까지 분석한 모든 기업 합병 중 시너지가 가장 크다. TSLA 주주들이 좋은 조건의 딜을 받게 될 것."':'"Greatest synergies of any company merger I\'ve analyzed. TSLA shareholders will get a good bid."',
      color:'#F59E0B'
    },
    {
      who: ko?'콜 그라인드':'Cole Grinde',
      quote: ko?'"Tesla = 물리 인프라, SpaceX = 디지털·우주. 하나가 되면 지구상 단연 가장 큰 시총의 기업이 될 것."':'"Tesla has the physical, SpaceX has the digital. Largest company on earth by a mile if it comes to fruition."',
      color:'#A855F7'
    },
  ].map((it,i)=>{
    const y=524+i*280;
    const ql=wrapText(it.quote,ko?26:42,ko);
    const qh=ql.length*30+16;
    return `<rect x="54" y="${y}" width="972" height="${80+qh}" rx="18" fill="#111827" stroke="${it.color}" stroke-width="2"/>
    <rect x="54" y="${y}" width="972" height="4" rx="2" fill="${it.color}"/>
    <text x="84" y="${y+38}" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="${it.color}">${escXml(it.who)}</text>
    ${ql.map((ln,li)=>`<text x="84" y="${y+68+li*30}" font-family="Arial,sans-serif" font-size="${ko?22:20}" fill="#E6EDF3">${escXml(ln)}</text>`).join('')}`;
  }).join('')}
  <rect x="54" y="1100" width="972" height="130" rx="18" fill="#1F0A2A" stroke="#C084FC" stroke-width="2"/>
  <text x="108" y="1148" font-family="Arial Black,Arial,sans-serif" font-size="28" font-weight="900" fill="#C084FC">${ko?'합병 특위 구성 = 이사회 레벨 법적 절차 시작':'Special Committee = Board-level legal process initiated'}</text>
  <text x="108" y="1190" font-family="Arial,sans-serif" font-size="23" fill="#D8B4FE">${ko?'교환 비율 산정·실사 단계 진입 — 이제 루머가 아닙니다':'Due diligence &amp; ratio negotiation phase — no longer a rumor'}</text>
  ${footer(ko)}
</svg>`;
  return svg;
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
(async () => {
  await save(`summary-${DATE}`,      makeSummary(true));
  await save(`summary-${DATE}-en`,   makeSummary(false));
  await save(`tsla-q3-2026-${DATE}`,    makeTslaQ3(true));
  await save(`tsla-q3-2026-${DATE}-en`, makeTslaQ3(false));
  await save(`fsd-growth-${DATE}`,      makeFSD(true));
  await save(`fsd-growth-${DATE}-en`,   makeFSD(false));
  await save(`robotaxi-expansion-${DATE}`,    makeRoboTaxi(true));
  await save(`robotaxi-expansion-${DATE}-en`, makeRoboTaxi(false));
  await save(`optimus-earlyramp-${DATE}`,    makeOptimusRamp(true));
  await save(`optimus-earlyramp-${DATE}-en`, makeOptimusRamp(false));
  await save(`tesla-5m-2030-${DATE}`,    makeTesla5M(true));
  await save(`tesla-5m-2030-${DATE}-en`, makeTesla5M(false));
  await save(`starship-terafab-${DATE}`,    makeStarshipTerafab(true));
  await save(`starship-terafab-${DATE}-en`, makeStarshipTerafab(false));
  await save(`spcx-jpmorgan-${DATE}`,    makeSpcxJPMorgan(true));
  await save(`spcx-jpmorgan-${DATE}-en`, makeSpcxJPMorgan(false));
  await save(`merger-call-${DATE}`,    makeMergerCall(true));
  await save(`merger-call-${DATE}-en`, makeMergerCall(false));
  console.log('✅ All 18 charts done.');
})();
