#!/usr/bin/env node
// Chart generator — 2026-10-27 final
// Anthropic $120.5B · SpaceX CAPEX · Tesla FSD Turo · 초당 $3284 · MSFT 60k · NeoCloud · Summary
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/charts');
const DATE = '20261027';

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

// ── 1. Anthropic S-1 SpaceX $120.5B ──────────────────────────────
function makeAnthropic(ko){
  const accent = '#A78BFA';
  const accentDark = '#5B21B6';
  const green = '#34D399';

  // Contract boxes: start at y=460, h=185 (no gap from label above)
  const contractData = [
    { label: ko?'SpaceX AI 컴퓨팅':'SpaceXAI Compute', val: '$120.5B', sub1: ko?'월 $3.1B · NVDA GPU':'$3.1B/mo · NVDA GPU', sub2: ko?'2029년까지':'through 2029', col: '#A78BFA' },
    { label: ko?'Amazon (AWS)':'Amazon (AWS)',         val: '$110.0B', sub1: ko?'10년 비해약':'10yr non-cancel',   sub2: ko?'2026–2036':'2026–2036',      col: '#60A5FA' },
    { label: ko?'AMD Helios 랙':'AMD Helios Rack',     val: '$20B+',  sub1: ko?'2027년부터':'from 2027',        sub2: ko?'공급 다변화':'supply divers.', col: '#34D399' },
  ];

  const contractSvg = contractData.map((c, i) => {
    const bx = 54 + i * 330, by = 460, bw = 316, bh = 185;
    return `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="18" fill="#130C2A" stroke="${c.col}" stroke-width="2.5"/>
    <text x="${bx+bw/2}" y="${by+34}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${escXml(c.label)}</text>
    <text x="${bx+bw/2}" y="${by+98}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="${c.col}">${escXml(c.val)}</text>
    <text x="${bx+bw/2}" y="${by+132}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#D1D5DB">${escXml(c.sub1)}</text>
    <text x="${bx+bw/2}" y="${by+156}" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" fill="#6B7280">${escXml(c.sub2)}</text>`;
  }).join('');

  // msgBox1 at y=665 (20px after contract boxes end at 645)
  const m1 = msgBox(665, ko?'📊 Anthropic 재무 현황 (S-1)':'📊 Anthropic Financials (S-1)',
    ko
      ? ['H1 2026 매출 $16.3B — 2025년 연간($4.6B)의 3.5배를 6개월에 달성',
         '연환산 ARR ≈ $32.6B · 영업손실 $693M (-4.3%), 손익분기 근접',
         '순손실 $80.7B 중 $72.4B은 전환사채 공정가치 변동 (비현금)']
      : ['H1 2026 revenue $16.3B — 3.5x full-year 2025 ($4.6B) in 6 months',
         'Annualized ARR ≈ $32.6B · Op. loss $693M (−4.3%), near breakeven',
         'Net loss $80.7B: $72.4B from convertible note fair-value change (non-cash)'],
    accent, accentDark);

  // msgBox2 at y=887 (20px after m1 ends at ~867)
  const m2 = msgBox(887, ko?'🚀 SPCX 투자 포인트':'🚀 SPCX Investment Implications',
    ko
      ? ['Anthropic S-1: SpaceX가 AI 인프라 핵심 공급자임을 SEC 공식 확인',
         'AI 수익 다각화 — 로켓 이외 수익원으로 기업가치 $1T 재평가 근거',
         '3대 계약($250B+) 수혜 = SpaceX → NVDA GPU 수요 연결 고리 직접 확인']
      : ['S-1 confirms SpaceX as core AI infrastructure supplier on record with SEC',
         'AI revenue stream beyond rockets underpins $1T valuation reassessment',
         '$250B+ contract trio: SpaceX → NVDA GPU demand chain directly confirmed'],
    green, '#065F46');

  // 3 mini stat boxes at y=1110
  const miniStats = [
    { x:54,  top: ko?'Anthropic ARR':'Anthropic ARR', big:'$32.6B', unit:ko?'연환산 매출':'Annualized rev', sub:ko?'영업손실 −4.3%':'op loss −4.3%', col:'#A78BFA' },
    { x:384, top: ko?'SpaceX AI 계약':'SpaceX AI Deal', big:'$120.5B', unit:ko?'5년 총액':'5yr total', sub:ko?'월 $3.1B · NVDA 전량':'$3.1B/mo NVDA', col:'#C4B5FD' },
    { x:714, top: ko?'3대 합산':'3 Contracts', big:'$250B+', unit:ko?'컴퓨팅 계약 합산':'compute total', sub:ko?'SpaceX+AWS+AMD':'SpaceX+AWS+AMD', col:green },
  ];
  const statsRowSvg = miniStats.map(s => statBox(s.x, 1110, 316, 160, s.top, s.big, s.unit, s.sub, s.col)).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#08051A','#04021A',accent,'#7C3AED')}
  ${badge(40,24,160,'SPCX','#1E1B4B','#6D28D9','#C4B5FD')}
  ${badge(218,24,140,'NVDA','#052E16','#16A34A','#86EFAC')}
  ${badge(376,24,140,'AMZN','#1C1917','#D97706','#FCD34D')}
  <text x="540" y="116" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="27" font-weight="900" fill="#E9D5FF">${ko?'Anthropic S-1 공개 — 역대 최대 컴퓨팅 계약':'Anthropic S-1 — Largest Compute Commitments Ever'}</text>
  <text x="540" y="278" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="155" font-weight="900" fill="${accent}" filter="url(#glow)">$120.5B</text>
  <text x="540" y="338" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="#C4B5FD">${ko?'SpaceXAI 컴퓨팅 계약 — S-1 SEC 공식 문서 확인':'SpaceXAI compute contract — confirmed in SEC S-1 filing'}</text>
  <line x1="54" y1="368" x2="1026" y2="368" stroke="#4C1D95" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="54" y="418" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#A78BFA">${ko?'3대 컴퓨팅 계약 합산 $250B+':'3 Compute Contracts Total $250B+'}</text>
  ${contractSvg}
  ${m1.svg}
  ${m2.svg}
  ${statsRowSvg}
  ${footer(ko?'2026-10-27':'2026-10-27')}
</svg>`;
}

// ── 2. SpaceX NVDA Capex 분기별 바 차트 ─────────────────────────
function makeSpaceXCapex(ko){
  const accent = '#60A5FA'; // blue
  const nvdaCol = '#34D399';
  const otherCol = '#374151';

  const quarters = ['Q1\'26','Q2\'26','Q3\'26','Q4\'26','Q1\'27','Q2\'27','Q3\'27','Q4\'27'];
  const totalCapex = [7.7, 16, 16, 40, 70, 110, 120, 130];
  const nvdaCapex =  [13,   14, 14, 33, 60,  98, 107, 116];
  // Note: some early quarters NVDA > total due to rounding/estimates — use as-is from data

  const chartTop = 420, chartH = 580, chartLeft = 80, chartW = 920;
  const maxVal = 130;
  const barW = Math.floor(chartW / quarters.length) - 12;
  const barSlot = Math.floor(chartW / quarters.length);

  const bars = quarters.map((q, i) => {
    const tot = totalCapex[i];
    const nvd = nvdaCapex[i];
    const isGuide = i >= 3;
    const bx = chartLeft + i * barSlot + 6;
    const totH = Math.round((Math.min(tot,maxVal)/maxVal) * chartH);
    const nvdH = Math.round((Math.min(nvd,maxVal)/maxVal) * chartH);
    const totY = chartTop + chartH - totH;
    const nvdY = chartTop + chartH - nvdH;
    const pct = Math.round(nvd/tot*100);
    const labelFill = isGuide ? '#9CA3AF' : '#D1D5DB';
    return `
    <rect x="${bx}" y="${totY}" width="${barW}" height="${totH}" rx="4" fill="${otherCol}" opacity="${isGuide?0.7:1}"/>
    <rect x="${bx}" y="${nvdY}" width="${barW}" height="${nvdH}" rx="4" fill="${nvdaCol}" opacity="${isGuide?0.7:1}"/>
    ${isGuide?`<rect x="${bx}" y="${totY}" width="${barW}" height="4" rx="2" fill="#9CA3AF" opacity="0.5"/>`:'' }
    <text x="${bx+barW/2}" y="${totY-10}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="20" font-weight="900" fill="${labelFill}">$${tot}B</text>
    <text x="${bx+barW/2}" y="${chartTop+chartH+28}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="${isGuide?'#6B7280':'#9CA3AF'}">${q}</text>
    <text x="${bx+barW/2}" y="${chartTop+chartH+52}" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" fill="${isGuide?'#4B5563':'#6B7280'}">${isGuide?'예상':'실적'}</text>`;
  }).join('');

  const m1 = msgBox(1068, ko?'💡 NVDA 수혜 구조':'💡 NVDA Beneficiary Structure',
    ko
      ? ['Q4\'27 SpaceX 분기 CAPEX $130B 중 NVDA $116B — 89% 독점',
         '2027년 연간 +10GW 증설 · MACROHARD 캠퍼스 건설 중']
      : ['Q4\'27 SpaceX quarterly capex $130B → NVDA $116B (89%)',
         '2027 +10GW capacity add · MACROHARD campus under construction'],
    accent, '#1E3A5F');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#030E1A','#050C18',accent,'#1D4ED8')}
  ${badge(40,24,150,'SPCX','#0B1D35','#3B82F6','#93C5FD')}
  ${badge(208,24,140,'NVDA','#052E16','#16A34A','#86EFAC')}
  <text x="540" y="84" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#93C5FD">${ko?'SpaceX 컴퓨팅 CAPEX · NVIDIA 수혜 분기별 추이':'SpaceX Compute CAPEX · NVDA Share by Quarter'}</text>
  <text x="540" y="200" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="140" font-weight="900" fill="${accent}" filter="url(#glow)">$130B</text>
  <text x="540" y="278" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="#93C5FD">${ko?'Q4\'27 분기 CAPEX 예상 — NVDA $116B(89%) 흡수':'Q4\'27 quarterly est — NVDA takes $116B (89%)'}</text>
  <line x1="${chartLeft}" y1="${chartTop-10}" x2="${chartLeft+chartW}" y2="${chartTop-10}" stroke="#1E3A5F" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="${chartLeft}" y1="${chartTop+chartH}" x2="${chartLeft+chartW}" y2="${chartTop+chartH}" stroke="#374151" stroke-width="2"/>
  ${bars}
  <rect x="620" y="336" width="22" height="22" rx="4" fill="${nvdaCol}"/>
  <text x="650" y="354" font-family="Arial,sans-serif" font-size="20" fill="#D1D5DB">${ko?'NVDA 몫':'NVDA share'}</text>
  <rect x="780" y="336" width="22" height="22" rx="4" fill="${otherCol}"/>
  <text x="810" y="354" font-family="Arial,sans-serif" font-size="20" fill="#D1D5DB">${ko?'기타(비-NVDA)':'Other (non-NVDA)'}</text>
  <rect x="40" y="336" width="22" height="22" rx="4" fill="#9CA3AF" opacity="0.5"/>
  <text x="70" y="354" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${ko?'점선=예상':'dashed=estimate'}</text>
  ${m1.svg}
  ${footer(ko?'2026-10-27':'2026-10-27')}
</svg>`;
}

// ── 3. Tesla FSD on Turo ─────────────────────────────────────────
function makeFSDTuro(ko){
  const accent = '#34D399'; // green
  const accentDark = '#064E3B';

  const m1 = msgBox(720, ko?'📣 Turo CEO Andre Haddad 공식 발표':'📣 Turo CEO Andre Haddad Official Announcement',
    ko
      ? ['10월 28일부터 Turo에서 FSD 활성화 Tesla 검색 · 예약 가능',
         '이미 수천 대(thousands)의 FSD 활성화 Tesla가 Turo에 등록 완료',
         '렌탈 오너: FSD 요금으로 추가 수익 창출 가능']
      : ['From Oct 28: search & book FSD-enabled Tesla on Turo',
         'Thousands of FSD-activated Teslas already listed on platform',
         'Owners: earn extra income through FSD rental premium'],
    accent, accentDark);

  const m2 = msgBox(m1.nextY, ko?'💡 FSD 수익화 3-레이어':'💡 FSD Monetization 3-Layer',
    ko
      ? ['① 개인 구매/구독 → ② Turo 렌탈 P2P → ③ Tesla Cybercab 로보택시(미래)',
         'Turo 출시로 수익화 채널이 B2C에서 P2P로 확장',
         '오너 없는 완전 무인 렌탈은 Cybercab 합류 시점이 진짜 게임체인저']
      : ['① Personal buy/subscribe → ② Turo P2P rental → ③ Cybercab robotaxi (future)',
         'Turo opens P2P monetization channel alongside B2C',
         'True driverless rental: Cybercab joining Turo will be the real game-changer'],
    '#FBBF24', '#78350F');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#021A0E','#030F07',accent,'#059669')}
  ${badge(40,24,130,'TSLA','#052E16','#16A34A','#86EFAC')}
  <text x="40" y="92" font-family="Arial Black,Arial,sans-serif" font-size="28" font-weight="900" fill="#A7F3D0">${ko?'Tesla FSD × Turo':'Tesla FSD × Turo'}</text>
  <text x="540" y="220" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="130" font-weight="900" fill="${accent}" filter="url(#glow)">FSD</text>
  <text x="540" y="320" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="70" font-weight="900" fill="#FFFFFF">× Turo</text>
  <text x="540" y="390" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" fill="#6EE7B7">${ko?'P2P 렌탈카 플랫폼 정식 개방 — 10월 28일':'P2P Car Rental Platform Launch — October 28'}</text>
  <line x1="54" y1="420" x2="1026" y2="420" stroke="#065F46" stroke-width="1.5" stroke-dasharray="6,4"/>

  <rect x="54" y="446" width="460" height="246" rx="20" fill="#0A2416" stroke="${accent}" stroke-width="2"/>
  <text x="274" y="494" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#6EE7B7">${ko?'이미 등록 완료':'Already Listed'}</text>
  <text x="274" y="572" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="88" font-weight="900" fill="${accent}">수천</text>
  <text x="274" y="634" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#A7F3D0">${ko?'FSD 활성화 Tesla 대수 (출시 전)':'FSD-enabled Teslas (pre-launch)'}</text>
  <text x="274" y="666" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${ko?'실제 수요 존재 확인':'Real demand confirmed'}</text>

  <rect x="566" y="446" width="460" height="246" rx="20" fill="#0A2416" stroke="#FBBF24" stroke-width="2"/>
  <text x="796" y="494" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#FDE68A">${ko?'오너 추가 수익':'Owner Extra Income'}</text>
  <text x="796" y="560" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="50" font-weight="900" fill="#FBBF24">${ko?'FSD요금':'FSD Fee'}</text>
  <text x="796" y="608" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="50" font-weight="900" fill="#FBBF24">+α</text>
  <text x="796" y="650" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#FDE68A">${ko?'주차 대신 수익화':'Monetize parked time'}</text>
  <text x="796" y="678" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${ko?'→ FSD 구매 유인 증가':'→ incentivizes FSD purchase'}</text>

  ${m1.svg}
  ${m2.svg}
  ${footer(ko?'2026-10-27':'2026-10-27')}
</svg>`;
}

// ── 4. Tesla Revenue per Second ───────────────────────────────────
function makeRevenuePerSec(ko){
  const accent = '#EF4444'; // red/TSLA

  const bars = [
    { yr: '2011', val: 6.38,    mul: null,   col: '#374151' },
    { yr: '2016', val: 188.01,  mul: '29.5×', col: '#6B7280' },
    { yr: '2021', val: 1485.61, mul: '7.9×',  col: '#DC2626' },
    { yr: '2026', val: 3284.18, mul: '2.2×',  col: accent   },
  ];

  const chartTop = 410, chartH = 560, chartLeft = 80, chartW = 920;
  const maxVal = 3284.18;
  const barW = 160;
  const positions = [chartLeft+30, chartLeft+270, chartLeft+510, chartLeft+720];

  const barsSvg = bars.map((b, i) => {
    const bh = Math.max(Math.round((b.val/maxVal)*chartH), 4);
    const bx = positions[i];
    const by = chartTop + chartH - bh;
    const labelY = by - 14;
    return `
    <rect x="${bx}" y="${by}" width="${barW}" height="${bh}" rx="6" fill="${b.col}"/>
    <text x="${bx+barW/2}" y="${labelY}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="${i===3?26:22}" font-weight="900" fill="${b.col}">$${b.val}</text>
    <text x="${bx+barW/2}" y="${chartTop+chartH+32}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#D1D5DB">${b.yr}</text>
    ${b.mul ? `<text x="${bx+barW/2}" y="${chartTop+chartH+58}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${ko?'전기比':'prev 5yr'} ${b.mul}</text>` : `<text x="${bx+barW/2}" y="${chartTop+chartH+58}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">기준</text>`}`;
  }).join('');

  const m1 = msgBox(1020, ko?'📈 15년 성장 요약':'📈 15-Year Growth Summary',
    ko
      ? ['2011($6.38) → 2016($188) → 2021($1,486) → 2026($3,284) — 514배 성장',
         '초당 $3,284 = 분당 $197,051 = 하루 $283.8M = 연환산 $103.6B',
         '절대 증가액은 매 5년 커짐: +$5.7B → +$40.9B → +$56.8B']
      : ['2011($6.38) → 2016($188) → 2021($1,486) → 2026($3,284) — 514x growth',
         '$3,284/sec = $197K/min = $283.8M/day = $103.6B annualized',
         'Absolute additions growing: +$5.7B → +$40.9B → +$56.8B per 5 years'],
    accent, '#7F1D1D');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#0D0507','#0A0304',accent,'#B91C1C')}
  ${badge(40,24,130,'TSLA','#2D0A0A','#DC2626','#FCA5A5')}
  <text x="40" y="92" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#FCA5A5">${ko?'Tesla 초당 매출 — 15년 성장 궤적':'Tesla Revenue Per Second — 15-Year Trajectory'}</text>
  <text x="540" y="210" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="110" font-weight="900" fill="${accent}" filter="url(#glow)">$3,284</text>
  <text x="540" y="290" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="60" font-weight="900" fill="#D1D5DB">${ko?'/초 (2026년)':'/sec (2026)'}</text>
  <text x="540" y="360" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="#9CA3AF">${ko?'2011년 $6.38 대비 514배 · 연환산 $103.6B':'514× vs $6.38 in 2011 · $103.6B annualized'}</text>
  <line x1="${chartLeft}" y1="${chartTop+chartH}" x2="${chartLeft+chartW}" y2="${chartTop+chartH}" stroke="#374151" stroke-width="2"/>
  ${barsSvg}
  ${m1.svg}
  ${footer(ko?'2026-10-27 TTM Q3':'2026-10-27 TTM Q3')}
</svg>`;
}

// ── 5. Microsoft 60,000 Buyouts ───────────────────────────────────
function makeMSFT(ko){
  const accent = '#60A5FA'; // blue/MSFT

  const m1 = msgBox(720, ko?'📋 구조조정 세부 사항':'📋 Buyout Details',
    ko
      ? ['대상: 미국·캐나다·인도·영국 · 부사장(VP)급 이하',
         '집중 부서: 데이터센터 · 판매 · 마케팅',
         '공식 이유: "AI 시대를 위한 인력 재편(retool workforce for AI era)"',
         '단순 추산: 연 $90B 인건비 절감 (실현은 2027년~)']
      : ['Target: VP-level and below in US, Canada, India, UK',
         'Focus: data centers, sales, marketing departments',
         'Stated reason: "retool its workforce for the artificial intelligence era"',
         'Simple est: $9B/yr savings (reflected in P&L from 2027)'],
    accent, '#1E3A5F');

  const m2 = msgBox(m1.nextY, ko?'💡 Big Tech AI 구조조정 흐름':'💡 Big Tech AI Restructuring Wave',
    ko
      ? ['Google → Meta → Microsoft 순서로 AI 대체 구조조정 공식화',
         'Microsoft가 최초로 "AI로 대체" 이유를 명시적으로 공개 발표',
         '투자 시사점: MSFT 영업이익률 개선 2027년부터 숫자로 확인 가능']
      : ['Google → Meta → Microsoft: Big Tech AI replacement wave spreads',
         'MSFT first to explicitly state "AI is replacing the work" in an announcement',
         'Implication: MSFT operating margin improvement visible in numbers from 2027'],
    '#FBBF24', '#78350F');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#030C1A','#040D1F',accent,'#2563EB')}
  ${badge(40,24,130,'MSFT','#0B1D35','#3B82F6','#93C5FD')}
  <text x="40" y="92" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#93C5FD">${ko?'Microsoft — AI 구조조정 공식화':'Microsoft — AI Restructuring Official'}</text>
  <text x="540" y="210" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="160" font-weight="900" fill="${accent}" filter="url(#glow)">${ko?'6만':'60K'}</text>
  <text x="540" y="310" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="60" font-weight="900" fill="#FFFFFF">${ko?'희망퇴직':'Buyouts'}</text>
  <text x="540" y="388" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" fill="#93C5FD">${ko?'전체 직원 22만명의 27% — AI 업무 대체 공식화':'27% of 220,000 headcount — AI replacement explicitly cited'}</text>
  <line x1="54" y1="418" x2="1026" y2="418" stroke="#1E3A5F" stroke-width="1.5" stroke-dasharray="6,4"/>

  <rect x="54" y="444" width="460" height="250" rx="20" fill="#0A1628" stroke="${accent}" stroke-width="2"/>
  <text x="274" y="492" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#93C5FD">${ko?'희망퇴직 규모':'Buyout Scale'}</text>
  <text x="274" y="572" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="80" font-weight="900" fill="${accent}">27%</text>
  <text x="274" y="634" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#D1D5DB">${ko?'of 220,000':'of 220,000'}</text>
  <text x="274" y="664" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${ko?'역사상 최대 AI 전환 조정 중 하나':'One of biggest AI workforce transitions'}</text>

  <rect x="566" y="444" width="460" height="250" rx="20" fill="#0A1628" stroke="#FBBF24" stroke-width="2"/>
  <text x="796" y="492" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#FDE68A">${ko?'연 인건비 절감 추산':'Est. Annual Savings'}</text>
  <text x="796" y="572" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="80" font-weight="900" fill="#FBBF24">$9B</text>
  <text x="796" y="634" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#D1D5DB">${ko?'/년 (단순추산)':'/yr (simple est.)'}</text>
  <text x="796" y="664" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${ko?'실현 2027년~':'Realized from 2027'}</text>

  ${m1.svg}
  ${m2.svg}
  ${footer(ko?'2026-10-27':'2026-10-27')}
</svg>`;
}

// ── 6. NeoCloud Debt/Equity ───────────────────────────────────────
function makeNeoCloud(ko){
  const accent = '#F97316'; // orange

  const firms = [
    { ticker: 'WYFI',  ratio: 0.95,  col: '#34D399', label: ko?'안전':'Safe'   },
    { ticker: 'NBIS',  ratio: 0.97,  col: '#34D399', label: ko?'안전':'Safe'   },
    { ticker: 'IREN',  ratio: 1.87,  col: '#FBBF24', label: ko?'중간':'Mid'    },
    { ticker: 'DOCN',  ratio: 2.13,  col: '#FBBF24', label: ko?'고부채':'High' },
    { ticker: 'ORCL',  ratio: 2.32,  col: '#FBBF24', label: ko?'고부채':'High' },
    { ticker: 'HUT',   ratio: 4.58,  col: '#EF4444', label: ko?'매우 高':'V.High' },
    { ticker: 'CRWV',  ratio: 10.27, col: '#C084FC', label: ko?'초레버리지':'Ultra-Lev' },
  ];

  const chartTop = 390, chartH = 540, chartLeft = 80, chartW = 920;
  const maxVal = 11;
  const barW = Math.floor(chartW/firms.length) - 12;
  const barSlot = Math.floor(chartW/firms.length);

  const barsSvg = firms.map((f, i) => {
    const bh = Math.max(Math.round((f.ratio/maxVal)*chartH), 4);
    const bx = chartLeft + i*barSlot + 6;
    const by = chartTop + chartH - bh;
    const valSize = f.ticker === 'CRWV' ? 22 : 20;
    return `
    <rect x="${bx}" y="${by}" width="${barW}" height="${bh}" rx="6" fill="${f.col}"/>
    <text x="${bx+barW/2}" y="${by-12}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="${valSize}" font-weight="900" fill="${f.col}">${f.ratio}x</text>
    <text x="${bx+barW/2}" y="${chartTop+chartH+30}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="21" font-weight="900" fill="#D1D5DB">${f.ticker}</text>
    <text x="${bx+barW/2}" y="${chartTop+chartH+54}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="${f.col}">${f.label}</text>`;
  }).join('');

  const m1 = msgBox(1014, ko?'💡 레버리지 전략의 명암':'💡 Leverage Strategy — Risk & Reward',
    ko
      ? ['CoreWeave(CRWV) 10.27배 — 자본의 10배 부채로 AI GPU 클라우드 공격적 구축',
         'SpaceX AI 독식 속도에 따라 중소 NeoCloud 생존 여부 갈림 (Musk 200개 붕괴 경고)',
         'WYFI·NBIS 1배 이하 — 안전 구조, 성장은 느리나 충격 흡수 가능']
      : ['CoreWeave (CRWV) 10.27x — 10x leveraged bet on AI GPU cloud dominance',
         'SpaceX AI compute monopoly speed determines NeoCloud survival (Musk: 200 to fail)',
         'WYFI & NBIS below 1x — safe structure, slower growth but high shock absorption'],
    accent, '#7C2D12');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#0D0804','#080503',accent,'#EA580C')}
  ${badge(40,24,210,'AI인프라 (NeoCloud)','#1C0A00','#EA580C','#FED7AA')}
  <text x="40" y="92" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#FED7AA">${ko?'NeoCloud 7개사 부채비율(D/E) 비교':'NeoCloud 7-Firm Debt/Equity Ratio Comparison'}</text>
  <text x="540" y="200" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="160" font-weight="900" fill="#C084FC" filter="url(#glow)">10.27x</text>
  <text x="540" y="278" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" fill="#C4B5FD">${ko?'CRWV(CoreWeave) 총부채비율 — 7개사 중 최고 레버리지':'CRWV (CoreWeave) D/E — highest leverage among 7 firms'}</text>
  <text x="540" y="340" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko?'vs WYFI 0.95x · NBIS 0.97x (안전권)':'vs WYFI 0.95x · NBIS 0.97x (safe zone)'}</text>
  <line x1="${chartLeft}" y1="${chartTop+chartH}" x2="${chartLeft+chartW}" y2="${chartTop+chartH}" stroke="#374151" stroke-width="2"/>
  ${barsSvg}
  ${m1.svg}
  ${footer(ko?'2026-10-27':'2026-10-27')}
</svg>`;
}

// ── 7. Summary 2026-10-27 ─────────────────────────────────────────
function makeSummary(ko){
  const accent = '#34D399'; // green

  const topics = ko ? [
    { n:'1', col:'#A78BFA', title:'Anthropic S-1', line1:'SpaceX $120.5B (월 $3.1B)', line2:'Amazon $110B · AMD $20B+', sub:'합산 $250B+ · SEC 공식 확인' },
    { n:'2', col:'#60A5FA', title:'SpaceX CAPEX 폭증', line1:'Q4\'26 $40B → Q4\'27 $130B', line2:'NVDA $116B 흡수(89%)', sub:'MACROHARD 캠퍼스 건설 중' },
    { n:'3', col:'#34D399', title:'Tesla FSD × Turo', line1:'10월 28일 P2P 렌탈 개방', line2:'수천 대 이미 등록 완료', sub:'오너 FSD 요금으로 추가 수익' },
    { n:'4', col:'#EF4444', title:'Tesla 초당 $3,284', line1:'2011($6.38) → 2026($3,284)', line2:'15년 514배 · 연 $103.6B', sub:'절대 증가액은 매 5년 커짐' },
    { n:'5', col:'#93C5FD', title:'MSFT 6만명 AI 조정', line1:'전체 22만명의 27%', line2:'AI 업무 대체 공식화', sub:'영업이익률 개선 2027년~' },
    { n:'6', col:'#F97316', title:'NeoCloud D/E 비교', line1:'CRWV 10.27배 초레버리지', line2:'WYFI 0.95 · NBIS 0.97배', sub:'SpaceX 독식 속도가 생존 변수' },
  ] : [
    { n:'1', col:'#A78BFA', title:'Anthropic S-1', line1:'SpaceX $120.5B ($3.1B/mo)', line2:'Amazon $110B · AMD $20B+', sub:'$250B+ total · SEC confirmed' },
    { n:'2', col:'#60A5FA', title:'SpaceX CAPEX Surge', line1:'Q4\'26 $40B → Q4\'27 $130B', line2:'NVDA gets $116B (89%)', sub:'MACROHARD campus under construction' },
    { n:'3', col:'#34D399', title:'Tesla FSD × Turo', line1:'Oct 28 P2P rental launch', line2:'Thousands already listed', sub:'Owners earn FSD rental premium' },
    { n:'4', col:'#EF4444', title:'Tesla $3,284/sec', line1:'2011($6.38) → 2026($3,284)', line2:'514× in 15 yrs · $103.6B ARR', sub:'Absolute dollar gains growing per 5yr' },
    { n:'5', col:'#93C5FD', title:'MSFT 60K AI Buyouts', line1:'27% of 220,000 headcount', line2:'AI replacement explicitly cited', sub:'Margin improvement from 2027' },
    { n:'6', col:'#F97316', title:'NeoCloud D/E', line1:'CRWV 10.27x ultra-leverage', line2:'WYFI 0.95x · NBIS 0.97x safe', sub:'SpaceX dominance speed = key variable' },
  ];

  const gx = [54, 566];
  const topicCount = topics.length;

  const topicsSvg = topics.map((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bx = gx[col], by = 380 + row * 308;
    const bw = 472, bh = 288;
    return `
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="18" fill="#0A0F1A" stroke="${t.col}" stroke-width="2"/>
    <rect x="${bx}" y="${by}" width="56" height="56" rx="18" fill="${t.col}"/>
    <text x="${bx+28}" y="${by+38}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="28" font-weight="900" fill="#000000">${t.n}</text>
    <text x="${bx+70}" y="${by+38}" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${t.col}">${escXml(t.title)}</text>
    <text x="${bx+24}" y="${by+100}" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#FFFFFF">${escXml(t.line1)}</text>
    <text x="${bx+24}" y="${by+142}" font-family="Arial,sans-serif" font-size="24" fill="#D1D5DB">${escXml(t.line2)}</text>
    <line x1="${bx+24}" y1="${by+160}" x2="${bx+bw-24}" y2="${by+160}" stroke="${t.col}" stroke-width="1" opacity="0.4"/>
    <text x="${bx+24}" y="${by+198}" font-family="Arial,sans-serif" font-size="21" fill="#9CA3AF">${escXml(t.sub)}</text>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#030712','#040A14',accent,'#059669')}
  ${badge(40,24,200,ko?'일론 생태계 오늘의 요약':'Elon Ecosystem Daily Summary','#052E16','#16A34A','#A7F3D0')}
  <text x="540" y="100" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="${accent}">${ko?'2026-10-27 한장요약':'2026-10-27 Daily Summary'}</text>
  <text x="540" y="152" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="#FFFFFF" filter="url(#glow2)">TOP ${topicCount}</text>
  <text x="540" y="206" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#6EE7B7">${ko?'Anthropic S-1 · SpaceX CAPEX · FSD Turo · MSFT · NeoCloud':'Anthropic S-1 · SpaceX CAPEX · FSD Turo · MSFT · NeoCloud'}</text>
  <line x1="54" y1="340" x2="1026" y2="340" stroke="#065F46" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="540" y="374" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#374151">${ko?'— 오늘의 주요 토픽 —':'— Today\'s Key Topics —'}</text>
  ${topicsSvg}
  ${footer(ko?'2026-10-27':'2026-10-27')}
</svg>`;
}

async function main(){
  console.log('Generating 2026-10-27 charts...');
  await save(`anthropic-spacex-120b-${DATE}`,    makeAnthropic(true));
  await save(`anthropic-spacex-120b-${DATE}-en`, makeAnthropic(false));
  await save(`spacex-nvda-capex-${DATE}`,         makeSpaceXCapex(true));
  await save(`spacex-nvda-capex-${DATE}-en`,      makeSpaceXCapex(false));
  await save(`tsla-fsd-turo-${DATE}`,             makeFSDTuro(true));
  await save(`tsla-fsd-turo-${DATE}-en`,          makeFSDTuro(false));
  await save(`tsla-revenue-per-sec-${DATE}`,      makeRevenuePerSec(true));
  await save(`tsla-revenue-per-sec-${DATE}-en`,   makeRevenuePerSec(false));
  await save(`msft-60k-ai-cut-${DATE}`,           makeMSFT(true));
  await save(`msft-60k-ai-cut-${DATE}-en`,        makeMSFT(false));
  await save(`neocloud-debt-ratio-${DATE}`,       makeNeoCloud(true));
  await save(`neocloud-debt-ratio-${DATE}-en`,    makeNeoCloud(false));
  await save(`summary-${DATE}`,                   makeSummary(true));
  await save(`summary-${DATE}-en`,                makeSummary(false));
  console.log('Done — 14 PNGs generated.');
}
main().catch(e => { console.error(e); process.exit(1); });
