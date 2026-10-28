#!/usr/bin/env node
// Chart generator — 2026-10-28 (c): Anthropic S-1 + SpaceX ARR + NVDA Neocloud + favicon + Summary update
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

// ── 1. Anthropic S-1 ─────────────────────────────────────────────
function makeAnthropicS1(ko) {
  const purple = '#A78BFA';
  const blue = '#60A5FA';
  const green = '#34D399';

  const mb1 = msgBox(600, ko?'📊 엔터프라이즈 모멘텀':'📊 Enterprise Momentum', ko?[
    '연간 $100K+ 지출 고객: 11,900개 이상',
    '연간 $1M+ 지출 고객: 1,300개 이상 (전체의 ~11%)',
    '순매출 유지율(NRR): 약 900% (TTM Sep 2026)',
    '계약 미래 매출(RPO): $10.8B (2026년 6월 30일 기준)',
  ]:[
    'Customers spending $100K+: 11,900+',
    'Customers spending $1M+: 1,300+ (~11% of base)',
    'Net Revenue Retention (NRR): ~900% (TTM Sep 2026)',
    'Contracted Future Revenue (RPO): $10.8B (Jun 30, 2026)',
  ], purple, '#4C1D95');

  const mb2 = msgBox(mb1.nextY, ko?'💰 미래 구매 약정 $265.6B':'💰 Future Purchase Commitments $265.6B', ko?[
    'SpaceX: $120.5B (월 $3.1B, 2029년까지 — SEC 공식 문서)',
    'Amazon AWS: $110B (10년 계약)',
    'AMD Helios 랙: $20B+ (공급 계약)',
    'H1 컴퓨팅 비용: $8.95B (매출의 약 55%)',
  ]:[
    'SpaceX: $120.5B ($3.1B/mo through 2029 — SEC confirmed)',
    'Amazon AWS: $110B (10-year contract)',
    'AMD Helios rack: $20B+ (supply agreement)',
    'H1 compute expenses: $8.95B (~55% of revenue)',
  ], blue, '#1E3A5F');

  const stats = [
    { top: ko?'H1 2026 매출':'H1 2026 Revenue', big: '$16.3B', unit: '+1,300% YoY', sub: ko?'사용량 80% 구독 20%':'80% usage 20% sub', accent: green },
    { top: ko?'현금+투자':'Cash+Investments', big: '$131.7B', unit: ko?'2026년 6월':'Jun 30, 2026', sub: ko?'영업현금 +$3.93B':'Op CF +$3.93B', accent: purple },
    { top: ko?'Q2 영업이익':'Q2 Op Profit', big: '$974M', unit: '+8.4% 마진', sub: ko?'H1 영업손실 $693M':'H1 op loss $693M', accent: blue },
  ];
  const statsY = mb2.nextY + 4;
  const statsSvg = stats.map((s,i) => statBox(54+i*340, statsY, 316, 160, s.top, s.big, s.unit, s.sub, s.accent)).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#06021A','#09031F','#A78BFA','#60A5FA')}
  ${badge(40,24,160,'BREAKING','#1A0030','#A78BFA','#E9D5FF')}
  ${badge(218,24,120,'SPCX','#1E1B4B','#6D28D9','#C4B5FD')}
  ${badge(356,24,120,'NVDA','#052E16','#16A34A','#86EFAC')}
  <text x="540" y="116" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#E9D5FF">${escXml(ko?'Anthropic S-1 — 역사상 가장 빠른 성장 AI 기업 재무 공개':'Anthropic S-1 — Fastest Growing AI Company Financials Revealed')}</text>

  <text x="300" y="260" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="110" font-weight="900" fill="${green}" filter="url(#glow)">$16.3B</text>
  <text x="300" y="316" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#6EE7B7">${escXml(ko?'H1 2026 매출 · +1,300% YoY':'H1 2026 Revenue · +1,300% YoY')}</text>

  <text x="790" y="240" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="80" font-weight="900" fill="${purple}" filter="url(#glow2)">900%</text>
  <text x="790" y="296" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#C4B5FD">NRR (TTM Sep 2026)</text>

  <rect x="54" y="330" width="972" height="62" rx="14" fill="rgba(167,139,250,0.08)" stroke="${purple}" stroke-width="1.5"/>
  <text x="540" y="356" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="${purple}">${escXml(ko?'미래 구매 약정 $265.6B — SpaceX $120.5B · Amazon $110B · AMD $20B+':'Future Purchase Commitments $265.6B — SpaceX $120.5B · Amazon $110B · AMD $20B+')}</text>
  <text x="540" y="386" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">${escXml(ko?'H1 순손실 $80.7B = 비현금 공정가치 변동 $81.1B (실제 사업 현금흐름 양호)':'H1 net loss $80.7B = $81.1B non-cash fair-value charges (underlying business cash-flow positive)')}</text>

  <rect x="54" y="406" width="460" height="90" rx="16" fill="rgba(52,211,153,0.08)" stroke="${green}" stroke-width="1.5"/>
  <text x="284" y="442" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#6EE7B7">${escXml(ko?'Q2 분기 매출':'Q2 Revenue')}</text>
  <text x="284" y="484" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="${green}">$11.56B</text>

  <rect x="566" y="406" width="460" height="90" rx="16" fill="rgba(96,165,250,0.08)" stroke="${blue}" stroke-width="1.5"/>
  <text x="796" y="442" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#93C5FD">${escXml(ko?'QoQ 성장률':'QoQ Growth')}</text>
  <text x="796" y="484" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="${blue}">+144%</text>

  ${mb1.svg}
  ${mb2.svg}
  ${statsSvg}
  ${footer(DATE)}
</svg>`;
  return svg;
}

// ── 2. SpaceX $100B ARR Path ──────────────────────────────────────
function makeSpaceXArr(ko) {
  const blue = '#60A5FA';
  const green = '#34D399';
  const yellow = '#FBBF24';

  const barData = [
    { label: ko?'Q3 2026 월평균':'Q3 2026 avg/mo', val: 4.86, color: '#6B7280', pct: 35 },
    { label: ko?'12월 필요 ($100B ARR)':'Dec needed ($100B ARR)', val: 8.33, color: yellow, pct: 60 },
    { label: ko?'Q1 2027 가이드 하단':'Q1 2027 guide low', val: 11.0, color: green, pct: 79 },
    { label: ko?'Q1 2027 가이드 상단':'Q1 2027 guide high', val: 12.3, color: blue, pct: 89 },
  ];

  const barSvg = barData.map((d, i) => {
    const y = 320 + i * 130;
    const barW = Math.round(d.pct / 100 * 860);
    return `<text x="54" y="${y+24}" font-family="Arial,sans-serif" font-size="21" fill="#9CA3AF">${escXml(d.label)}</text>
  <rect x="54" y="${y+36}" width="${barW}" height="52" rx="10" fill="${d.color}"/>
  <text x="${54+barW+16}" y="${y+68}" font-family="Arial Black,Arial,sans-serif" font-size="28" font-weight="900" fill="${d.color}">$${d.val}B</text>`;
  }).join('');

  const mb1 = msgBox(880, ko?'📊 매출 경로 분석':'📊 Revenue Path Analysis', ko?[
    'SpaceX CFO Q1 2027 가이드: $33B~$37B (분기)',
    '→ 월 환산: $11.0B~$12.3B',
    '→ $100B ARR 기준($8.33B/월) 대비 32%~48% 초과',
    'Vera Rubin GPU 2027 H1 도입 시 추가 컴퓨팅 수익 상승 예상',
  ]:[
    'SpaceX CFO Q1 2027 guidance: $33B-$37B (quarterly)',
    '→ Monthly: $11.0B-$12.3B',
    '→ Exceeds $100B ARR threshold ($8.33B/mo) by 32%-48%',
    'Vera Rubin GPU delivery H1 2027 → additional compute revenue uplift',
  ], blue, '#1E3A5F');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#02080F','#03060D','#60A5FA','#34D399')}
  ${badge(40,24,120,'SPCX','#1E1B4B','#6D28D9','#C4B5FD')}
  ${badge(178,24,180,ko?'ARR 경로 분석':'ARR Path Analysis','#02080F','#60A5FA','#BAE6FD')}
  <text x="540" y="116" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#BAE6FD">${escXml(ko?'SpaceX $100B ARR 경로 — Q1 2027 가이드가 핵심':'SpaceX $100B ARR Path — Q1 2027 Guide Is the Real Signal')}</text>

  <text x="540" y="230" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="80" font-weight="900" fill="${blue}" filter="url(#glow)">$100B ARR</text>
  <text x="540" y="285" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#BAE6FD">${escXml(ko?'연환산 매출 목표 · 달성 조건: 12월 월 $8.33B 필요':'Annualized revenue target · Requires: $8.33B/month in December')}</text>

  ${barSvg}

  <line x1="54" y1="856" x2="914" y2="856" stroke="${yellow}" stroke-width="2" stroke-dasharray="8,4"/>
  <text x="916" y="862" font-family="Arial,sans-serif" font-size="20" fill="${yellow}">$100B ARR</text>

  ${mb1.svg}
  ${footer(DATE)}
</svg>`;
  return svg;
}

// ── 3. NVDA Neocloud Backlog ──────────────────────────────────────
function makeNvdaNeocloud(ko) {
  const green = '#34D399';
  const blue = '#60A5FA';
  const purple = '#A78BFA';

  const rows = [
    { name: ko?'Customer #1':'Customer #1', gpu: '435K', price: '$7.39', rev: '$28.2B', mw: '700MW', color: blue },
    { name: 'Google', gpu: '110K', price: '$11.46', rev: '$11.0B', mw: '220MW', color: '#1DA1F2' },
    { name: ko?'Customer #2':'Customer #2', gpu: '110K', price: '$13.90', rev: '$13.4B', mw: '220MW', color: green },
    { name: ko?'Customer #3':'Customer #3', gpu: '110K', price: '$13.80', rev: '$13.3B', mw: '220MW', color: green },
    { name: 'Reflection AI', gpu: '18K', price: '$11.74', rev: '$1.8B', mw: '35MW', color: purple },
  ];

  const rowSvg = rows.map((r, i) => {
    const y = 340 + i * 72;
    const bg = i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)';
    return `<rect x="54" y="${y}" width="972" height="66" rx="8" fill="${bg}" stroke="${r.color}" stroke-width="1"/>
  <text x="80" y="${y+40}" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${r.color}">${escXml(r.name)}</text>
  <text x="380" y="${y+40}" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#D1D5DB">${r.gpu}</text>
  <text x="560" y="${y+40}" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#D1D5DB">${r.price}/hr</text>
  <text x="760" y="${y+40}" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#D1D5DB">${r.rev}</text>
  <text x="980" y="${y+40}" text-anchor="right" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${r.mw}</text>`;
  }).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#020D08','#04150A','#34D399','#60A5FA')}
  ${badge(40,24,120,'NVDA','#052E16','#16A34A','#86EFAC')}
  ${badge(178,24,180,ko?'Neocloud 수주':'Neocloud Backlog','#052E16','#34D399','#A7F3D0')}
  <text x="540" y="116" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#A7F3D0">${escXml(ko?'NVDA Neocloud 수주 잔량 — 계약 $67.7B · 2027E 업사이드 $216B':'NVDA Neocloud Order Backlog — $67.7B Contracted · $216B 2027E Upside')}</text>

  <text x="300" y="240" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="90" font-weight="900" fill="${green}" filter="url(#glow)">$67.7B</text>
  <text x="300" y="292" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#6EE7B7">${escXml(ko?'계약 잔량 (2026E 기준)':'Contracted (exiting 2026E)')}</text>
  <text x="300" y="324" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">783K GPUs · $9.88/hr avg · 1,395MW</text>

  <text x="800" y="230" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="72" font-weight="900" fill="${blue}" filter="url(#glow2)">$216B</text>
  <text x="800" y="280" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#93C5FD">${escXml(ko?'2027E 업사이드':'2027E Upside')}</text>
  <text x="800" y="308" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#6B7280">2,323K GPUs · $10.62/hr</text>

  <rect x="54" y="330" width="180" height="34" rx="6" fill="#052E16"/>
  <text x="144" y="353" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#86EFAC">${ko?'고객':'Customer'}</text>
  <rect x="262" y="330" width="236" height="34" rx="6" fill="#052E16"/>
  <text x="380" y="353" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#86EFAC">GPU</text>
  <rect x="460" y="330" width="198" height="34" rx="6" fill="#052E16"/>
  <text x="560" y="353" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#86EFAC">${ko?'단가':'Price/hr'}</text>
  <rect x="660" y="330" width="198" height="34" rx="6" fill="#052E16"/>
  <text x="760" y="353" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#86EFAC">${ko?'연간 매출':'Annual Rev'}</text>
  ${rowSvg}

  <rect x="54" y="706" width="972" height="66" rx="8" fill="rgba(52,211,153,0.12)" stroke="${green}" stroke-width="2"/>
  <text x="80" y="746" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${green}">${ko?'계약 합계 (2026E)':'Contracted Total (2026E)'}</text>
  <text x="380" y="746" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${green}">783K</text>
  <text x="560" y="746" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${green}">$9.88</text>
  <text x="760" y="746" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${green}">$67.7B</text>

  <rect x="54" y="784" width="972" height="66" rx="8" fill="rgba(96,165,250,0.12)" stroke="${blue}" stroke-width="2"/>
  <text x="80" y="824" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${blue}">${ko?'업사이드 (2027E)':'Upside Total (2027E)'}</text>
  <text x="380" y="824" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${blue}">2,323K</text>
  <text x="560" y="824" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${blue}">$10.62</text>
  <text x="760" y="824" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${blue}">$216.1B</text>

  <rect x="54" y="868" width="972" height="80" rx="14" fill="rgba(251,191,36,0.08)" stroke="#FBBF24" stroke-width="1.5"/>
  <text x="540" y="900" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#FBBF24">${ko?'GB300 최고 단가: $13.70~$13.90/hr':'GB300 Premium Pricing: $13.70-$13.90/hr'}</text>
  <text x="540" y="932" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#FDE68A">${ko?'H100 $3.50/hr 대비 약 4배 — Blackwell 수요 강도 반증':'vs H100 $3.50/hr (~4x premium) — proof of Blackwell demand intensity'}</text>

  <rect x="54" y="962" width="460" height="130" rx="16" fill="rgba(52,211,153,0.06)" stroke="${green}" stroke-width="1.5"/>
  <text x="284" y="1000" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#6EE7B7">${ko?'계약 대비 업사이드 배수':'Contracted vs Upside'}</text>
  <text x="284" y="1056" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="54" font-weight="900" fill="${green}">3.2x</text>
  <text x="284" y="1086" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#6B7280">${ko?'잠재 계약 현실화 시':'If potential deals convert'}</text>

  <rect x="566" y="962" width="460" height="130" rx="16" fill="rgba(96,165,250,0.06)" stroke="${blue}" stroke-width="1.5"/>
  <text x="796" y="1000" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#93C5FD">${ko?'총 컴퓨팅 용량 (2027E)':'Total Compute (2027E)'}</text>
  <text x="796" y="1056" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="54" font-weight="900" fill="${blue}">4,475MW</text>
  <text x="796" y="1086" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#6B7280">${ko?'현재 1,395MW의 3.2배':'3.2x current 1,395MW'}</text>

  ${footer(DATE)}
</svg>`;
  return svg;
}

// ── 4. Updated Summary (7 topics) ────────────────────────────────
function makeSummary(ko) {
  const topics = ko ? [
    { n:'1', txt:'Tesla 로보택시 텍사스 1,051대 — Cybercab 544 Model Y 추월 · 와이모 역전 12일', col:'#EF4444' },
    { n:'2', txt:'SpaceX $40B GPU 파이낸싱 — Apollo·Goldman·KKR·BlackRock · Vera Rubin 2027H1', col:'#60A5FA' },
    { n:'3', txt:'Anthropic S-1: H1 $16.3B(+1300%) · $131.7B 현금 · NRR 900% · $265.6B 약정', col:'#A78BFA' },
    { n:'4', txt:'SpaceX ARR 경로: Q3 $4.86B/월 · Q1 2027 가이드 $33~37B($11~12.3B/월)', col:'#60A5FA' },
    { n:'5', txt:'NVDA Neocloud: 계약 783K GPUs/$67.7B · 2027E 업사이드 2,323K/$216B', col:'#86EFAC' },
    { n:'6', txt:'NVDA: Meta $3B 신규 투자 · Oracle NVL72 Supercluster 수주', col:'#86EFAC' },
    { n:'7', txt:'SPCX: Deutsche Bank $250 목표가 · 컴퓨팅 레버리지 저평가 · 매수 유지', col:'#A78BFA' },
  ] : [
    { n:'1', txt:'Tesla Robotaxi TX 1,051 units — Cybercab 544 beats Model Y · 12 days to Waymo', col:'#EF4444' },
    { n:'2', txt:'SpaceX $40B GPU financing — Apollo/Goldman/KKR/BlackRock · Vera Rubin H1 2027', col:'#60A5FA' },
    { n:'3', txt:'Anthropic S-1: H1 $16.3B(+1300%) · $131.7B cash · 900% NRR · $265.6B commitments', col:'#A78BFA' },
    { n:'4', txt:'SpaceX ARR: Q3 $4.86B/mo · Q1 2027 guide $33-37B ($11-12.3B/mo)', col:'#60A5FA' },
    { n:'5', txt:'NVDA Neocloud: 783K GPUs/$67.7B contracted · 2,323K/$216B 2027E upside', col:'#86EFAC' },
    { n:'6', txt:'NVDA: Meta $3B investment · Oracle NVL72 Supercluster win', col:'#86EFAC' },
    { n:'7', txt:'SPCX: Deutsche Bank PT $250 · Compute leverage underappreciated · Buy', col:'#A78BFA' },
  ];

  let topicsY = 310;
  const topicsSvg = topics.map(t => {
    const svg = `<rect x="54" y="${topicsY}" width="972" height="60" rx="12" fill="rgba(255,255,255,0.03)" stroke="${t.col}" stroke-width="1.5"/>
  <text x="88" y="${topicsY+38}" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${t.col}">${t.n}</text>
  <text x="134" y="${topicsY+38}" font-family="Arial,sans-serif" font-size="20" fill="#E5E7EB">${escXml(t.txt)}</text>`;
    topicsY += 72;
    return svg;
  }).join('');

  const footerY = topicsY + 8;
  const statsSvg = [
    { top: ko?'로보택시':'Robotaxi', big: '1,051', unit: ko?'텍사스 등록':'TX Registered', sub: ko?'Cybercab 첫 추월':'Cybercab leads', accent: '#EF4444' },
    { top: ko?'AI 파이낸싱':'AI Financing', big: '$40B', unit: ko?'SpaceX GPU':'SpaceX GPU', sub: ko?'Apollo 리드':'Apollo leads', accent: '#60A5FA' },
    { top: 'NVDA', big: '$216B', unit: ko?'Neocloud 업사이드':'Neocloud Upside', sub: ko?'2027E 잠재':'2027E potential', accent: '#86EFAC' },
  ].map((s,i) => statBox(54+i*340, footerY, 316, 160, s.top, s.big, s.unit, s.sub, s.accent)).join('');

  const count = topics.length;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#08051A','#04021A','#60A5FA','#A78BFA')}
  ${badge(40,24,120,'TSLA','#1A0505','#B91C1C','#FCA5A5')}
  ${badge(178,24,120,'SPCX','#1E1B4B','#6D28D9','#C4B5FD')}
  ${badge(316,24,120,'NVDA','#052E16','#16A34A','#86EFAC')}
  <text x="540" y="130" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="36" font-weight="900" fill="#E9D5FF">${escXml(ko?'한장요약 2026-10-28':'Daily Summary 2026-10-28')}</text>
  <text x="540" y="174" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">${escXml(ko?`오늘의 핵심 ${count}가지`:`${count} key stories today`)}</text>
  <line x1="54" y1="196" x2="1026" y2="196" stroke="#A78BFA" stroke-width="2"/>
  <text x="54" y="268" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#EF4444">${escXml(ko?'Tesla 로보택시 · SpaceX $40B · Anthropic S-1 · NVDA Neocloud $216B':'Tesla Robotaxi · SpaceX $40B · Anthropic S-1 · NVDA Neocloud $216B')}</text>
  <text x="54" y="302" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${escXml(ko?'2026년 10월 28일 (수) · investus.kr SRP':'October 28, 2026 (Wed) · investus.kr SRP')}</text>
  ${topicsSvg}
  ${statsSvg}
  ${footer(DATE)}
</svg>`;
  return svg;
}

async function main() {
  console.log('Generating 2026-10-28 (c) charts...');
  await save(`anthropic-s1-${DATE}`, makeAnthropicS1(true));
  await save(`anthropic-s1-${DATE}-en`, makeAnthropicS1(false));
  await save(`spacex-arr-${DATE}`, makeSpaceXArr(true));
  await save(`spacex-arr-${DATE}-en`, makeSpaceXArr(false));
  await save(`nvda-neocloud-${DATE}`, makeNvdaNeocloud(true));
  await save(`nvda-neocloud-${DATE}-en`, makeNvdaNeocloud(false));
  await save(`summary-${DATE}`, makeSummary(true));
  await save(`summary-${DATE}-en`, makeSummary(false));
  console.log('✓ All 8 charts generated.');
}
main().catch(e => { console.error(e); process.exit(1); });
