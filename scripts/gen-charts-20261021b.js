#!/usr/bin/env node
// Chart generator B — 2026-10-21 — 8 new topic charts + updated summary
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/charts');
const DATE = '20261021';

// ── helpers ────────────────────────────────────────────────────────────────

function escXml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function wrapText(text, maxChars, isKo) {
  const lines = [];
  if (!isKo) {
    const words = text.split(' ');
    let cur = '';
    for (const w of words) {
      const test = cur ? cur + ' ' + w : w;
      if (test.length > maxChars && cur) { lines.push(cur); cur = w; }
      else cur = test;
    }
    if (cur) lines.push(cur);
    return lines;
  }
  let cur = '', i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (/[a-zA-Z0-9$]/.test(ch)) {
      let word = '';
      while (i < text.length && /[a-zA-Z0-9$.,+\-:%/·×]/.test(text[i])) word += text[i++];
      if (cur.length + word.length > maxChars && cur.length > 0) { lines.push(cur); cur = word; }
      else cur += word;
    } else {
      cur += ch; i++;
      if (cur.length >= maxChars) { lines.push(cur); cur = ''; }
    }
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

function keyPoints(y, bullets, ko) {
  const COLORS = ['#EF4444','#A855F7','#3B82F6','#10B981','#F59E0B'];
  const lh = 56;
  const boxH = 56 + bullets.length * lh;
  let s = `<rect x="54" y="${y}" width="972" height="${boxH}" rx="16" fill="#111827" stroke="#374151" stroke-width="1.5"/>`;
  s += `<text x="84" y="${y + 38}" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#F3F4F6" font-weight="900">${ko ? '핵심 포인트' : 'Key Points'}</text>`;
  s += `<rect x="84" y="${y + 46}" width="904" height="1" fill="#2D333B"/>`;
  bullets.forEach((b, i) => {
    const by = y + 70 + i * lh;
    s += `<circle cx="106" cy="${by + 2}" r="8" fill="${COLORS[i % COLORS.length]}"/>`;
    const lines = wrapText(b, ko ? 32 : 52, ko);
    lines.forEach((ln, li) => {
      s += `<text x="126" y="${by + li * 26}" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">${escXml(ln)}</text>`;
    });
  });
  return { svg: s, height: boxH };
}

function base(fill1='#0D1117', fill2='#0A0520') {
  return `<defs>
    <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${fill1}"/><stop offset="100%" stop-color="${fill2}"/>
    </linearGradient>
    <linearGradient id="accentG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#EF4444"/><stop offset="100%" stop-color="#C084FC"/>
    </linearGradient>
    <linearGradient id="divG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#EF4444" stop-opacity="0"/>
      <stop offset="30%" stop-color="#EF4444"/>
      <stop offset="70%" stop-color="#C084FC"/>
      <stop offset="100%" stop-color="#C084FC" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1350" fill="url(#bgG)"/>
  <rect x="0" y="0" width="1080" height="10" fill="url(#accentG)"/>`;
}

function badge(x, y, w, label, bg, border, textColor) {
  return `<rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="${bg}"/>
    <rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="none" stroke="${border}" stroke-width="2"/>
    <text x="${x + w/2}" y="${y + 26}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="18" font-weight="900" fill="${textColor}">${escXml(label)}</text>`;
}

function footer() {
  return `<rect x="0" y="1340" width="1080" height="10" fill="url(#accentG)"/>
    <text x="40" y="1333" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">investus.kr · Not investment advice · INVESTUS SRP</text>`;
}

async function save(name, svgStr) {
  const svgPath = path.join(OUT, `${name}.svg`);
  const pngPath = path.join(OUT, `${name}.png`);
  fs.writeFileSync(svgPath, svgStr);
  await sharp(Buffer.from(svgStr)).resize(1080,1350).png().toFile(pngPath);
  console.log(`✓ ${name}.png`);
}

// ── 0. UPDATED SUMMARY ─────────────────────────────────────────────────────

function makeSummary(ko) {
  const rows = ko ? [
    { label: 'SPCX',   color: '#A855F7', text: 'SPCX Q3 EPS $0.35 vs $0.10E — 250% 어닝 서프라이즈, 매출 +161%' },
    { label: 'SPCX',   color: '#A855F7', text: 'SPCX AI 슈퍼인텔리전스 매출 $7.56B, 전년 대비 +830%' },
    { label: 'MERGE',  color: '#EF4444', text: 'TSLA-SPCX 합병 특위 공식 확인 — 양사 이사회 독립 특위 구성' },
    { label: 'TSLA',   color: '#EF4444', text: 'TSLA Q3 어닝 오늘밤 발표 — 딜리버리 486,532대 컨센서스 상회' },
    { label: 'STRLN',  color: '#3B82F6', text: 'Starlink 구독자 1,360만 / Starship 첫 수익 미션 / 컴퓨팅 1.7GW' },
    { label: 'TSLA',   color: '#10B981', text: 'Tesla Model Y 글로벌 1위 748,088대 — BYD 대비 130% 압도' },
    { label: 'TSLA',   color: '#10B981', text: 'Optimus V3 양산 공식화 — SEC 공시 · Fremont · 100만대/년' },
    { label: 'TSLA',   color: '#EF4444', text: 'Cybercab $1.53/마일 역대 최저 · 731대/일 · 무인 79%' },
    { label: 'ARK',    color: '#F59E0B', text: 'ARK TSLA 2031: Bear $3,300 / Base $4,400 / Bull $5,000 (5,000회)' },
    { label: 'TSLA',   color: '#EF4444', text: 'Tesla×Alipay 차내 결제 공식화 · Ferrari CEO 10/10 · Semi 롤아웃' },
    { label: 'TFAB',   color: '#3B82F6', text: 'Terafab 한국 반도체 10개사 NDA · $16.8B · 1억 sqft 텍사스' },
    { label: 'AI',     color: '#C084FC', text: 'OpenAI $30B · AI S&P500 49%(역대 2위) · Musk SpaceX $50T+' },
  ] : [
    { label: 'SPCX',   color: '#A855F7', text: 'SPCX Q3 EPS $0.35 vs $0.10E — 250% beat, revenue +161% YoY' },
    { label: 'SPCX',   color: '#A855F7', text: 'SPCX SuperIntelligence AI revenue $7.56B (+830% YoY)' },
    { label: 'MERGE',  color: '#EF4444', text: 'TSLA-SPCX merger committees officially confirmed by Musk' },
    { label: 'TSLA',   color: '#EF4444', text: 'Tesla Q3 earnings tonight — 486,532 deliveries beat consensus' },
    { label: 'STRLN',  color: '#3B82F6', text: 'Starlink 13.6M subs · Starship first revenue mission · 1.7GW compute' },
    { label: 'TSLA',   color: '#10B981', text: 'Tesla Model Y global #1: 748,088 units — 130% more than BYD #2' },
    { label: 'TSLA',   color: '#10B981', text: 'Optimus V3 production official — SEC filing · Fremont · 1M/yr cap' },
    { label: 'TSLA',   color: '#EF4444', text: 'Cybercab $1.53/mile all-time low · 731 units/day · 79% driverless' },
    { label: 'ARK',    color: '#F59E0B', text: 'ARK TSLA 2031: Bear $3,300 / Base $4,400 / Bull $5,000 (5,000 sims)' },
    { label: 'TSLA',   color: '#EF4444', text: 'Tesla × Alipay in-car payment · Ferrari CEO 10/10 · Semi rollout' },
    { label: 'TFAB',   color: '#3B82F6', text: 'Terafab: 10 Korea semi firms under NDA · $16.8B · 100M sqft TX' },
    { label: 'AI',     color: '#C084FC', text: 'OpenAI $30B · AI = 49% of S&P 500 (2nd highest ever) · Musk $50T' },
  ];

  const n = rows.length;
  const rowH = 82;
  const startY = 228;

  let rowsSvg = '';
  rows.forEach(({ label, color, text }, i) => {
    const y = startY + i * rowH;
    const lines = wrapText(text, ko ? 30 : 48, ko);
    rowsSvg += `<rect x="54" y="${y}" width="972" height="${rowH - 4}" rx="10" fill="#111827" stroke="${color}" stroke-width="1.5" stroke-opacity="0.4"/>`;
    rowsSvg += `<rect x="70" y="${y + 12}" width="72" height="26" rx="7" fill="${color}" opacity="0.18"/>`;
    rowsSvg += `<rect x="70" y="${y + 12}" width="72" height="4" rx="2" fill="${color}"/>`;
    rowsSvg += `<text x="106" y="${y + 32}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="12" font-weight="900" fill="${color}">${escXml(label)}</text>`;
    lines.forEach((ln, li) => {
      rowsSvg += `<text x="158" y="${y + 22 + li * 26}" font-family="Arial,sans-serif" font-size="${ko ? 21 : 20}" fill="#E6EDF3">${escXml(ln)}</text>`;
    });
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base()}
  ${badge(40,18,112,'TSLA','#7F1D1D','#EF4444','#EF4444')}
  ${badge(164,18,112,'SPCX','#2D1657','#C084FC','#C084FC')}
  <rect x="878" y="18" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="44" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>
  <text x="40" y="84" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${ko ? '2026년 10월 21일' : 'Oct 21, 2026'}</text>
  <text x="40" y="120" font-family="Arial Black,Arial,sans-serif" font-size="28" font-weight="900" fill="#FFFFFF">${ko ? 'SPCX 역대 최대 어닝 · 합병 특위 공식화 · TSLA Q3 오늘밤' : 'SPCX Record Earnings · Merger Confirmed · Tesla Q3 Tonight'}</text>
  <text x="40" y="158" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">${ko ? `오늘의 ${n}대 토픽 · investus.kr 데일리 브리핑` : `${n} Topics Today · investus.kr Daily Brief`}</text>
  <rect x="40" y="176" width="1000" height="2" rx="1" fill="url(#divG)"/>
  <text x="40" y="210" font-family="Arial,sans-serif" font-size="19" letter-spacing="2" fill="#6B7280">${ko ? '종목 / 주요 내용' : 'TICKER / SUMMARY'}</text>
  ${rowsSvg}
  ${footer()}
</svg>`;
}

// ── 1. TERAFAB ─────────────────────────────────────────────────────────────

function makeTerafab(ko) {
  const kp = keyPoints(910, ko
    ? ['한국 반도체 기업 약 10개사 — 절반 이상 NDA 서명 완료',
       '논의 범위: 칩 소재·공정 장비·밸브·테스트·패키징',
       'Terafab 1단계 투자 $16.8B · 반도체 단지 1억 sq ft',
       '머스크: "단일 건물 생산량 = 세계 GDP 상위 20개국 수준"']
    : ['~10 Korean semi firms in talks — 50%+ already signed NDAs',
       'Scope: chip materials, process equipment, valves, test, packaging',
       'Terafab Phase 1: $16.8B+ · semiconductor campus 100M sq ft TX',
       'Musk: "output rivals a top-20 country GDP from a single building"'],
    ko);

  const specs = ko ? [
    { label: '1단계 투자', val: '$16.8B+', color: '#3B82F6' },
    { label: '부지 규모', val: '1억 sq ft', color: '#A855F7' },
    { label: '예상 고용', val: '3,000+명', color: '#10B981' },
    { label: 'NDA 업체', val: '한국 10개사', color: '#F59E0B' },
  ] : [
    { label: 'Phase 1', val: '$16.8B+', color: '#3B82F6' },
    { label: 'Campus', val: '100M sq ft', color: '#A855F7' },
    { label: 'Jobs', val: '3,000+', color: '#10B981' },
    { label: 'Korea NDAs', val: '~10 firms', color: '#F59E0B' },
  ];

  let specsSvg = '';
  specs.forEach(({ label, val, color }, i) => {
    const x = 40 + (i % 2) * 510;
    const y = 680 + Math.floor(i / 2) * 120;
    specsSvg += `<rect x="${x}" y="${y}" width="480" height="100" rx="14" fill="#111827"/>`;
    specsSvg += `<rect x="${x}" y="${y}" width="480" height="5" rx="2.5" fill="${color}"/>`;
    specsSvg += `<text x="${x + 240}" y="${y + 42}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="${color}">${escXml(label)}</text>`;
    specsSvg += `<text x="${x + 240}" y="${y + 80}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="36" font-weight="900" fill="#FFFFFF">${escXml(val)}</text>`;
  });

  const chips = ko
    ? ['칩 제조 소재', '공정 장비', '밸브·배관', '테스트 부품', '첨단 패키징']
    : ['Chip Materials', 'Process Equip.', 'Valves & Piping', 'Test Components', 'Adv. Packaging'];
  let chipsSvg = '';
  chips.forEach((c, i) => {
    const x = 40 + i * 198;
    chipsSvg += `<rect x="${x}" y="614" width="186" height="44" rx="10" fill="#1E3A5F"/>`;
    chipsSvg += `<rect x="${x}" y="614" width="186" height="44" rx="10" fill="none" stroke="#3B82F6" stroke-width="1.5" stroke-opacity="0.6"/>`;
    chipsSvg += `<text x="${x + 93}" y="641" text-anchor="middle" font-family="Arial,sans-serif" font-size="${ko ? 19 : 17}" fill="#93C5FD">${escXml(c)}</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#070E1A','#050D18')}
  ${badge(40,28,112,'TSLA','#7F1D1D','#EF4444','#EF4444')}
  ${badge(164,28,112,'SPCX','#2D1657','#C084FC','#C084FC')}
  <rect x="878" y="28" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>
  <text x="40" y="100" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko ? '2026년 10월 21일' : 'Oct 21, 2026'}</text>
  <text x="40" y="144" font-family="Arial,sans-serif" font-size="21" letter-spacing="2" fill="#9CA3AF">${ko ? 'TERAFAB · 한국 반도체 공급망 · 텍사스' : 'TERAFAB  ·  KOREA SEMI SUPPLY CHAIN  ·  TEXAS'}</text>
  <text x="40" y="320" font-family="Arial Black,Arial,sans-serif" font-size="130" font-weight="900" fill="#3B82F6">TERA</text>
  <text x="40" y="440" font-family="Arial Black,Arial,sans-serif" font-size="130" font-weight="900" fill="#60A5FA">FAB</text>
  <text x="40" y="490" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko ? 'Tesla·SpaceX 통합 반도체 복합단지 · Grimes County, Texas' : 'Tesla·SpaceX Integrated Semiconductor Campus · Grimes County, TX'}</text>
  <text x="40" y="538" font-family="Arial Black,Arial,sans-serif" font-size="40" font-weight="900" fill="#FFFFFF">${ko ? '한국 기업 약 10개사 NDA 진행 중' : '~10 Korean Semiconductor Firms Under NDA'}</text>
  <text x="40" y="584" font-family="Arial,sans-serif" font-size="26" fill="#6B7280">${ko ? '칩 소재 · 공정 장비 · 밸브·배관 · 테스트 · 패키징' : 'Materials · Equipment · Valves · Testing · Packaging'}</text>
  <rect x="40" y="600" width="1000" height="2" rx="1" fill="url(#divG)"/>
  ${chipsSvg}
  ${specsSvg}
  <rect x="40" y="900" width="1000" height="1" fill="#1F2937"/>
  ${kp.svg}
  ${footer()}
</svg>`;
}

// ── 2. SPCX STARSHIP / Q3 DETAIL ───────────────────────────────────────────

function makeSpcxStarship(ko) {
  const kp = keyPoints(900, ko
    ? ['Starship 첫 수익 미션 — Starlink V3 26기 (용량 ~10배)  ',
       'Nameplate Compute 1.7GW (2026.09.30 기준)',
       '현금 및 유가증권 $90B · CapEx $19.59B (컨센 상회)',
       'YTD 발사 113회 · 궤도 질량 1,517t · 174개국 서비스']
    : ['Starship first revenue mission — 26 V3 sats (~10x capacity)',
       'Nameplate compute 1.7 GW as of Sep 30, 2026',
       'Cash & securities $90B · CapEx $19.59B (beat $19.08B est.)',
       'YTD: 113 launches · 1,517t to orbit · 174 countries served'],
    ko);

  const stats = ko ? [
    { label: '첫 수익 미션', val: 'V3 26기', sub: '1기 = 용량 ~10배↑', color: '#A855F7' },
    { label: '컴퓨팅 인프라', val: '1.7GW', sub: 'Nameplate Compute', color: '#3B82F6' },
    { label: '현금·유가증권', val: '$90B', sub: 'S&P500 최상위 현금', color: '#10B981' },
  ] : [
    { label: 'Starship Mission', val: '26 V3 Sats', sub: '~10x capacity per sat', color: '#A855F7' },
    { label: 'Compute', val: '1.7 GW', sub: 'Nameplate (Sep 30)', color: '#3B82F6' },
    { label: 'Cash & Sec.', val: '$90B', sub: 'Top-tier S&P 500 cash', color: '#10B981' },
  ];

  let statsSvg = '';
  stats.forEach(({ label, val, sub, color }, i) => {
    const x = 40 + i * 336;
    statsSvg += `<rect x="${x}" y="700" width="316" height="160" rx="14" fill="#111827"/>`;
    statsSvg += `<rect x="${x}" y="700" width="316" height="5" rx="2.5" fill="${color}"/>`;
    statsSvg += `<text x="${x + 158}" y="742" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="${color}">${escXml(label)}</text>`;
    statsSvg += `<text x="${x + 158}" y="800" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="${ko ? 36 : 32}" font-weight="900" fill="#FFFFFF">${escXml(val)}</text>`;
    statsSvg += `<text x="${x + 158}" y="838" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#9CA3AF">${escXml(sub)}</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0A0020','#050015')}
  ${badge(40,28,112,'SPCX','#2D1657','#C084FC','#C084FC')}
  <rect x="164" y="28" width="130" height="40" rx="20" fill="#14532D"/>
  <rect x="164" y="28" width="130" height="40" rx="20" fill="none" stroke="#4ADE80" stroke-width="2"/>
  <text x="229" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#4ADE80">${ko ? 'Q3 세부' : 'Q3 DETAIL'}</text>
  <rect x="878" y="28" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>
  <text x="40" y="100" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko ? '2026년 Q3 공식 보도자료' : 'Q3 2026 Official Press Release'}</text>
  <text x="40" y="144" font-family="Arial,sans-serif" font-size="21" letter-spacing="2" fill="#9CA3AF">${ko ? 'STARSHIP 첫 수익 · 컴퓨팅 1.7GW · 현금 $90B' : 'STARSHIP FIRST REVENUE  ·  1.7GW COMPUTE  ·  $90B CASH'}</text>
  <text x="40" y="350" font-family="Arial Black,Arial,sans-serif" font-size="120" font-weight="900" fill="#A855F7">1.7 GW</text>
  <text x="40" y="400" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko ? 'SPCX Nameplate Compute — AWS/Azure 단일 리전 수준' : 'SPCX Nameplate Compute — comparable to a major AWS/Azure region'}</text>
  <text x="40" y="456" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#FFFFFF">${ko ? 'Starship: 첫 상업 수익 미션 완수.' : 'Starship: First Commercial Revenue Mission.'}</text>
  <text x="40" y="514" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#FFFFFF">${ko ? 'V3 위성 1기 = 기존 대비 용량 10배.' : 'V3 Satellite = 10x Downlink Capacity.'}</text>
  <text x="40" y="570" font-family="Arial,sans-serif" font-size="24" fill="#6B7280">${ko ? 'Falcon 9 V1.5 → Starship V3 전환: 같은 발사 횟수로 10배 Starlink 용량 추가' : 'Falcon 9 → Starship: same launch count delivers 10x Starlink capacity growth'}</text>
  <rect x="40" y="596" width="1000" height="2" rx="1" fill="url(#divG)"/>
  <text x="40" y="640" font-family="Arial,sans-serif" font-size="21" letter-spacing="1" fill="#9CA3AF">${ko ? 'Q3 추가 세부 지표' : 'Q3 ADDITIONAL KEY METRICS'}</text>
  <!-- YTD metrics row -->
  <rect x="40" y="652" width="1000" height="38" rx="10" fill="#1F2937"/>
  <text x="60" y="677" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${ko ? '발사 113회  ·  궤도 질량 1,517t  ·  위성 11,100기  ·  174개국  ·  구독자 1,360만' : '113 launches  ·  1,517t to orbit  ·  11,100 sats  ·  174 countries  ·  13.6M subscribers'}</text>
  ${statsSvg}
  <rect x="40" y="872" width="1000" height="1" fill="#1F2937"/>
  ${kp.svg}
  ${footer()}
</svg>`;
}

// ── 3. TESLA MODEL Y GLOBAL #1 ─────────────────────────────────────────────

function makeModelY(ko) {
  const kp = keyPoints(906, ko
    ? ['시장 점유율 5.7% — 글로벌 NEV 시장 13,041,660대',
       '2위 BYD Song/Seal U(325,091)보다 423,000대 더 판매',
       '2~5위 모두 BYD — 비중국 브랜드 유일 Top5',
       '유럽·북미·아시아 3대 시장 동시 상위권 유일 모델']
    : ['5.7% market share — total global NEV market 13.04M units',
       'Outsells #2 BYD Song/Seal U by 423,000 units (+130%)',
       '#2–5 all BYD — Model Y is only non-Chinese brand in Top 5',
       'Only EV in the top rankings across EU, NA, and Asia simultaneously'],
    ko);

  const rankings = ko ? [
    { rank:'#1', ticker:'TSLA', model:'Tesla Model Y',      units:'748,088', pct:'5.7%', color:'#EF4444' },
    { rank:'#2', ticker:'BYD',  model:'BYD Song / Seal U', units:'325,091', pct:'2.5%', color:'#6B7280' },
    { rank:'#3', ticker:'GELY', model:'Geely Galaxy EX2',   units:'321,454', pct:'2.5%', color:'#6B7280' },
    { rank:'#4', ticker:'BYD',  model:'BYD Model 3',        units:'298,903', pct:'2.3%', color:'#6B7280' },
    { rank:'#5', ticker:'BYD',  model:'BYD Yuan UP/Atto 2', units:'225,334', pct:'1.7%', color:'#6B7280' },
  ] : [
    { rank:'#1', ticker:'TSLA', model:'Tesla Model Y',      units:'748,088', pct:'5.7%', color:'#EF4444' },
    { rank:'#2', ticker:'BYD',  model:'BYD Song / Seal U', units:'325,091', pct:'2.5%', color:'#6B7280' },
    { rank:'#3', ticker:'GELY', model:'Geely Galaxy EX2',   units:'321,454', pct:'2.5%', color:'#6B7280' },
    { rank:'#4', ticker:'BYD',  model:'BYD Model 3',        units:'298,903', pct:'2.3%', color:'#6B7280' },
    { rank:'#5', ticker:'BYD',  model:'BYD Yuan UP/Atto 2', units:'225,334', pct:'1.7%', color:'#6B7280' },
  ];

  const maxUnits = 748088;
  let rankSvg = '';
  rankings.forEach(({ rank, ticker, model, units, pct, color }, i) => {
    const y = 600 + i * 68;
    const barW = Math.round((parseInt(units.replace(/,/g,'')) / maxUnits) * 680);
    rankSvg += `<text x="40" y="${y + 28}" text-anchor="start" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${color}">${rank}</text>`;
    rankSvg += `<rect x="90" y="${y}" width="${barW}" height="50" rx="8" fill="${color}" opacity="${i === 0 ? '1' : '0.45'}"/>`;
    rankSvg += `<text x="${90 + barW + 8}" y="${y + 20}" font-family="Arial Black,Arial,sans-serif" font-size="19" font-weight="900" fill="#FFFFFF">${units}</text>`;
    rankSvg += `<text x="${90 + barW + 8}" y="${y + 42}" font-family="Arial,sans-serif" font-size="17" fill="#9CA3AF">${escXml(model)}</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0D0A0A','#170808')}
  ${badge(40,28,112,'TSLA','#7F1D1D','#EF4444','#EF4444')}
  <rect x="164" y="28" width="130" height="40" rx="20" fill="#14532D"/>
  <rect x="164" y="28" width="130" height="40" rx="20" fill="none" stroke="#4ADE80" stroke-width="2"/>
  <text x="229" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#4ADE80">${ko ? '글로벌 1위' : 'GLOBAL #1'}</text>
  <rect x="878" y="28" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>
  <text x="40" y="100" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko ? '2026년 1~8월 누적 · 中汽数研 집계' : 'Jan–Aug 2026 YTD · Source: 中汽数研 (CATARC)'}</text>
  <text x="40" y="144" font-family="Arial,sans-serif" font-size="21" letter-spacing="2" fill="#9CA3AF">${ko ? 'TESLA MODEL Y · 글로벌 NEV 판매 1위' : 'TESLA MODEL Y  ·  GLOBAL NEV SALES LEADER'}</text>
  <text x="40" y="360" font-family="Arial Black,Arial,sans-serif" font-size="190" font-weight="900" fill="#EF4444">#1</text>
  <text x="40" y="410" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko ? '2026년 1~8월 전 세계 전기차 모델별 판매 1위' : 'Global EV model sales leader, January–August 2026'}</text>
  <text x="40" y="466" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="#FFFFFF">748,088${ko ? '대' : ' units'}</text>
  <text x="40" y="522" font-family="Arial Black,Arial,sans-serif" font-size="40" font-weight="900" fill="#4ADE80">${ko ? '2위 BYD 대비 130% 더 판매' : '130% more units than #2 BYD'}</text>
  <rect x="40" y="550" width="1000" height="2" rx="1" fill="url(#divG)"/>
  <text x="40" y="590" font-family="Arial,sans-serif" font-size="21" letter-spacing="1" fill="#9CA3AF">${ko ? '글로벌 Top 5 · 2026년 1~8월 누적 판매' : 'GLOBAL TOP 5 · JAN–AUG 2026 YTD'}</text>
  ${rankSvg}
  <rect x="40" y="946" width="1000" height="1" fill="#1F2937"/>
  ${kp.svg}
  ${footer()}
</svg>`;
}

// ── 4. OPTIMUS V3 ──────────────────────────────────────────────────────────

function makeOptimus(ko) {
  const kp = keyPoints(900, ko
    ? ['Oct 19 SEC 공시 — 이사회 의장 Robyn Denholm 인용',
       '연간 생산 캐파 최대 100만 대 · 부품 1만 개 이상',
       '현재 Fremont → 이후 Terafab(텍사스)으로 확대',
       'ARK TSLA 2031 Base Case 가정 1M대와 일치']
    : ['Oct 19 SEC filing — Chair Robyn Denholm cited in filing',
       'Annual capacity up to 1M units · 10,000+ components',
       'Fremont Phase 1 → Terafab (Grimes County, TX) Phase 2',
       'Matches ARK TSLA 2031 Base Case assumption of 1M units/yr'],
    ko);

  const milestones = ko ? [
    { dot: '#3B82F6', label: '2025년', desc: 'Optimus V2 내부 시범 운용 · Fremont 공장 투입' },
    { dot: '#8B5CF6', label: '2026.10.19', desc: 'SEC 공시 — V3 양산 라인 공식화 (의장 Denholm 인용)' },
    { dot: '#10B981', label: '2027~2028', desc: 'Terafab 이전·확대 — 대량 외부 판매 개시 예상' },
    { dot: '#F59E0B', label: '2031 ARK Base', desc: 'ARK Invest: 연간 1M대 판매 / 시총 $17.5T 가정' },
  ] : [
    { dot: '#3B82F6', label: '2025', desc: 'Optimus V2 internal trials · deployed inside Fremont factory' },
    { dot: '#8B5CF6', label: 'Oct 19, 2026', desc: 'SEC filing — V3 production lines official (Chair Denholm cited)' },
    { dot: '#10B981', label: '2027–2028', desc: 'Terafab transition & scale — external commercial sales expected' },
    { dot: '#F59E0B', label: 'ARK 2031 Base', desc: 'ARK Invest: 1M units/yr · $17.5T market cap assumed' },
  ];

  let tlSvg = '';
  tlSvg += `<line x1="104" y1="640" x2="104" y2="880" stroke="#374151" stroke-width="2"/>`;
  milestones.forEach(({ dot, label, desc }, i) => {
    const y = 640 + i * 74;
    tlSvg += `<circle cx="104" cy="${y}" r="12" fill="${dot}"/>`;
    tlSvg += `<text x="132" y="${y - 6}" font-family="Arial Black,Arial,sans-serif" font-size="20" font-weight="900" fill="#F3F4F6">${escXml(label)}</text>`;
    tlSvg += `<text x="132" y="${y + 18}" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${escXml(desc)}</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#07090D','#040812')}
  ${badge(40,28,112,'TSLA','#7F1D1D','#EF4444','#EF4444')}
  <rect x="164" y="28" width="160" height="40" rx="20" fill="#1E3A5F"/>
  <rect x="164" y="28" width="160" height="40" rx="20" fill="none" stroke="#3B82F6" stroke-width="2"/>
  <text x="244" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#60A5FA">${ko ? 'SEC 공시' : 'SEC FILING'}</text>
  <rect x="878" y="28" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>
  <text x="40" y="100" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko ? 'Oct 19, 2026 SEC 공시' : 'Oct 19, 2026 SEC Filing'}</text>
  <text x="40" y="144" font-family="Arial,sans-serif" font-size="21" letter-spacing="2" fill="#9CA3AF">${ko ? 'OPTIMUS V3 · 양산 공식화 · FREMONT' : 'OPTIMUS V3  ·  MASS PRODUCTION OFFICIAL  ·  FREMONT'}</text>
  <text x="40" y="350" font-family="Arial Black,Arial,sans-serif" font-size="130" font-weight="900" fill="#3B82F6">1M</text>
  <text x="40" y="400" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko ? 'Fremont Optimus V3 연간 생산 캐파 — 양산 라인 첫 공식 발표' : 'Fremont Optimus V3 annual capacity — first official production disclosure'}</text>
  <text x="40" y="456" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#FFFFFF">${ko ? 'SEC 공시: 양산 라인 첫 제품 생산.' : 'SEC Filing: First Production Line Output.'}</text>
  <text x="40" y="514" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#FFFFFF">${ko ? '인류 역사상 최대 규모 로봇 양산 프로젝트.' : 'Largest Humanoid Robot Production Project in History.'}</text>
  <!-- spec badges -->
  <rect x="40" y="548" width="220" height="50" rx="12" fill="#1E3A5F"/>
  <text x="150" y="579" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="#60A5FA">${ko ? '100만대/년' : '1M/yr cap'}</text>
  <rect x="274" y="548" width="260" height="50" rx="12" fill="#1E3A5F"/>
  <text x="404" y="579" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="#60A5FA">${ko ? '부품 1만 개+' : '10,000+ parts'}</text>
  <rect x="548" y="548" width="260" height="50" rx="12" fill="#1E3A5F"/>
  <text x="678" y="579" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="#60A5FA">${ko ? 'Fremont 착공' : 'Fremont live'}</text>
  <rect x="40" y="618" width="1000" height="2" rx="1" fill="url(#divG)"/>
  <text x="40" y="642" font-family="Arial,sans-serif" font-size="21" letter-spacing="1" fill="#9CA3AF">${ko ? 'Optimus 로드맵' : 'OPTIMUS PRODUCTION ROADMAP'}</text>
  ${tlSvg}
  <rect x="40" y="890" width="1000" height="1" fill="#1F2937"/>
  ${kp.svg}
  ${footer()}
</svg>`;
}

// ── 5. CYBERCAB COST ───────────────────────────────────────────────────────

function makeCybercab(ko) {
  const kp = keyPoints(900, ko
    ? ['4개 도시 466회 요금 데이터 중 역대 최저 $1.53/마일',
       'Austin 일일 731대 운행 · 이 중 578대(79%) 완전 무인',
       '비무인 차량 235대 → 153대(35% 감소) · 무인화 가속',
       '장거리일수록 낮아지는 단가 구조 — 20마일+ 경쟁력 극대화']
    : ['All-time low $1.53/mile from 466 tracked fares in 4 cities',
       'Austin: 731 units in one day · 578 (79%) fully driverless',
       'Non-driverless count dropped 235 → 153 (35%) · autonomy accelerating',
       'Long-distance fares benefit most — 20+ miles = maximum advantage'],
    ko);

  const prices = [
    { label: ko ? 'Cybercab' : 'Cybercab', val: 1.53, color: '#4ADE80', isHero: true },
    { label: ko ? 'Uber W&S' : 'Uber Wait&Save', val: 1.64, color: '#6B7280', isHero: false },
    { label: ko ? 'UberX' : 'UberX', val: 1.78, color: '#6B7280', isHero: false },
    { label: ko ? '도심 택시' : 'Urban Taxi', val: 3.80, color: '#374151', isHero: false },
  ];
  const maxV = 3.80;
  let pricesSvg = '';
  prices.forEach(({ label, val, color, isHero }, i) => {
    const barW = Math.round((val / maxV) * 780);
    const y = 660 + i * 66;
    pricesSvg += `<text x="178" y="${y + 28}" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="${isHero ? 22 : 20}" font-weight="900" fill="${color}">${escXml(label)}</text>`;
    pricesSvg += `<rect x="190" y="${y}" width="${barW}" height="50" rx="8" fill="${color}" opacity="${isHero ? '1' : '0.55'}"/>`;
    pricesSvg += `<text x="${190 + barW + 10}" y="${y + 34}" font-family="Arial Black,Arial,sans-serif" font-size="${isHero ? 28 : 22}" font-weight="900" fill="#FFFFFF">$${val}/mi</text>`;
    if (isHero) {
      pricesSvg += `<rect x="${190 + barW + 130}" y="${y + 6}" width="${ko ? 96 : 86}" height="30" rx="10" fill="#14532D"/>`;
      pricesSvg += `<text x="${190 + barW + 130 + (ko ? 48 : 43)}" y="${y + 27}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#4ADE80">${ko ? '역대 최저' : 'ALL-TIME LOW'}</text>`;
    }
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#060D0A','#040B08')}
  ${badge(40,28,112,'TSLA','#7F1D1D','#EF4444','#EF4444')}
  <rect x="164" y="28" width="160" height="40" rx="20" fill="#052E16"/>
  <rect x="164" y="28" width="160" height="40" rx="20" fill="none" stroke="#4ADE80" stroke-width="2"/>
  <text x="244" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#4ADE80">${ko ? 'Cybercab' : 'CYBERCAB'}</text>
  <rect x="878" y="28" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>
  <text x="40" y="100" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko ? 'Austin 야간 탑승 기록 · 2026년 10월' : 'Austin Night Ride Record · October 2026'}</text>
  <text x="40" y="144" font-family="Arial,sans-serif" font-size="21" letter-spacing="2" fill="#9CA3AF">${ko ? 'CYBERCAB 요금 · 4개 도시 466회 데이터' : 'CYBERCAB FARE  ·  466 TRACKED RIDES ACROSS 4 CITIES'}</text>
  <text x="40" y="370" font-family="Arial Black,Arial,sans-serif" font-size="180" font-weight="900" fill="#4ADE80">$1.53</text>
  <text x="40" y="418" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko ? '마일당 역대 최저 요금 — Austin 24.3마일 야간 탑승 $37.16 / 53분' : 'All-time low per-mile fare — Austin 24.3mi night ride · $37.16 · 53 min'}</text>
  <text x="40" y="476" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#FFFFFF">${ko ? 'UberX보다 14% 저렴.' : '14% Cheaper Than UberX.'}</text>
  <text x="40" y="534" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#FFFFFF">${ko ? '드라이버 없이, 택시의 절반 가격.' : 'No Driver. Half the Cost of a Taxi.'}</text>
  <!-- Austin stats row -->
  <rect x="40" y="560" width="1000" height="56" rx="12" fill="#1F2937"/>
  <text x="60" y="580" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${ko ? 'Austin 일일 운행:' : 'Austin daily fleet:'}</text>
  <text x="60" y="604" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#4ADE80">${ko ? '731대 운행 · 578대(79%) 완전 무인' : '731 units operating · 578 (79%) fully driverless'}</text>
  <rect x="40" y="634" width="1000" height="2" rx="1" fill="url(#divG)"/>
  <text x="40" y="658" font-family="Arial,sans-serif" font-size="21" letter-spacing="1" fill="#9CA3AF">${ko ? '마일당 요금 비교' : 'PER-MILE FARE COMPARISON'}</text>
  ${pricesSvg}
  <rect x="40" y="936" width="1000" height="1" fill="#1F2937"/>
  ${kp.svg}
  ${footer()}
</svg>`;
}

// ── 6. ARK TSLA 2031 ───────────────────────────────────────────────────────

function makeARK(ko) {
  const kp = keyPoints(912, ko
    ? ['5,000회 Monte Carlo 시뮬레이션 · Oct 16, 2026 기준',
       'Base CAGR 62%: 매출 $1.45T · 로보택시 8.1M · Optimus 1M',
       'Bear조차 현 주가 대비 약 9배 — 모든 시나리오 상승 여지',
       'TSLA-SPCX 합병 변수는 미반영 — 합병 시 추가 상향 가능']
    : ['5,000 Monte Carlo simulations · as of Oct 16, 2026',
       'Base 62% CAGR: Revenue $1.45T · Robotaxi 8.1M · Optimus 1M',
       'Even Bear Case implies ~9x from current price — all scenarios positive',
       'TSLA-SPCX merger not yet in model — upside if deal closes'],
    ko);

  const scenarios = ko ? [
    { name: 'BULL', price: '$5,000', cagr: 'CAGR 66%', rev: '$1.62T', taxi: '10M대', opt: '1.2M대', mktcap: '$20.4T', color: '#4ADE80' },
    { name: 'BASE', price: '$4,400', cagr: 'CAGR 62%', rev: '$1.45T', taxi: '8.1M대', opt: '1M대', mktcap: '$17.5T', color: '#F59E0B' },
    { name: 'BEAR', price: '$3,300', cagr: 'CAGR 53%', rev: '$1.2T', taxi: '4.8M대', opt: '0.8M대', mktcap: '$13.4T', color: '#EF4444' },
  ] : [
    { name: 'BULL', price: '$5,000', cagr: '66% CAGR', rev: '$1.62T', taxi: '10M', opt: '1.2M', mktcap: '$20.4T', color: '#4ADE80' },
    { name: 'BASE', price: '$4,400', cagr: '62% CAGR', rev: '$1.45T', taxi: '8.1M', opt: '1M', mktcap: '$17.5T', color: '#F59E0B' },
    { name: 'BEAR', price: '$3,300', cagr: '53% CAGR', rev: '$1.2T', taxi: '4.8M', opt: '0.8M', mktcap: '$13.4T', color: '#EF4444' },
  ];

  let scenSvg = '';
  scenarios.forEach(({ name, price, cagr, rev, taxi, opt, mktcap, color }, i) => {
    const x = 40 + i * 334;
    scenSvg += `<rect x="${x}" y="640" width="320" height="240" rx="14" fill="#111827"/>`;
    scenSvg += `<rect x="${x}" y="640" width="320" height="6" rx="3" fill="${color}"/>`;
    scenSvg += `<text x="${x + 160}" y="680" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="${color}">${name}</text>`;
    scenSvg += `<text x="${x + 160}" y="728" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="46" font-weight="900" fill="#FFFFFF">${price}</text>`;
    scenSvg += `<text x="${x + 160}" y="760" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="${color}">${cagr}</text>`;
    scenSvg += `<line x1="${x + 16}" y1="772" x2="${x + 304}" y2="772" stroke="#374151" stroke-width="1"/>`;
    scenSvg += `<text x="${x + 20}" y="796" font-family="Arial,sans-serif" font-size="18" fill="#9CA3AF">${ko ? '매출' : 'Revenue'}</text>`;
    scenSvg += `<text x="${x + 304}" y="796" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="18" fill="#F3F4F6">${rev}</text>`;
    scenSvg += `<text x="${x + 20}" y="824" font-family="Arial,sans-serif" font-size="18" fill="#9CA3AF">${ko ? '로보택시' : 'Robotaxi'}</text>`;
    scenSvg += `<text x="${x + 304}" y="824" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="18" fill="#F3F4F6">${taxi}</text>`;
    scenSvg += `<text x="${x + 20}" y="852" font-family="Arial,sans-serif" font-size="18" fill="#9CA3AF">Optimus</text>`;
    scenSvg += `<text x="${x + 304}" y="852" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="18" fill="#F3F4F6">${opt}</text>`;
    scenSvg += `<text x="${x + 20}" y="862" font-family="Arial,sans-serif" font-size="18" fill="#9CA3AF"></text>`;
    scenSvg += `<text x="${x + 160}" y="868" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" fill="#6B7280">${ko ? '시총' : 'Mkt Cap'} ${mktcap}</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0A0800','#120F00')}
  ${badge(40,28,112,'TSLA','#7F1D1D','#EF4444','#EF4444')}
  <rect x="164" y="28" width="130" height="40" rx="20" fill="#451A03"/>
  <rect x="164" y="28" width="130" height="40" rx="20" fill="none" stroke="#F59E0B" stroke-width="2"/>
  <text x="229" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#F59E0B">ARK 2031</text>
  <rect x="878" y="28" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>
  <text x="40" y="100" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko ? 'Oct 16, 2026 기준 · 5,000회 Monte Carlo' : 'As of Oct 16, 2026 · 5,000 Monte Carlo simulations'}</text>
  <text x="40" y="144" font-family="Arial,sans-serif" font-size="21" letter-spacing="2" fill="#9CA3AF">${ko ? 'ARK INVEST · TESLA 2031 가치평가' : 'ARK INVEST  ·  TESLA 2031 VALUATION MODEL'}</text>
  <text x="40" y="370" font-family="Arial Black,Arial,sans-serif" font-size="180" font-weight="900" fill="#F59E0B">$4,400</text>
  <text x="40" y="418" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko ? 'ARK Base Case 2031 목표주가 — CAGR 62% (Oct 16, 2026 기준)' : 'ARK Base Case 2031 price target — 62% CAGR (as of Oct 16, 2026)'}</text>
  <text x="40" y="476" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#FFFFFF">${ko ? 'Bear조차 현 주가 대비 약 9배.' : 'Bear Case Still Implies ~9x From Today.'}</text>
  <text x="40" y="534" font-family="Arial Black,Arial,sans-serif" font-size="40" font-weight="900" fill="#F59E0B">${ko ? '로보택시 + Optimus = 두 개의 메가 성장 엔진' : 'Robotaxi + Optimus = Two Mega-Growth Engines'}</text>
  <rect x="40" y="560" width="1000" height="2" rx="1" fill="url(#divG)"/>
  <text x="40" y="600" font-family="Arial,sans-serif" font-size="21" letter-spacing="1" fill="#9CA3AF">${ko ? '2031년 시나리오별 가치평가' : '2031 SCENARIO VALUATION'}</text>
  <!-- column headers -->
  <text x="200" y="634" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#9CA3AF">▲ BULL</text>
  <text x="534" y="634" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#9CA3AF">◉ BASE</text>
  <text x="868" y="634" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#9CA3AF">▼ BEAR</text>
  ${scenSvg}
  <rect x="40" y="892" width="1000" height="1" fill="#1F2937"/>
  ${kp.svg}
  ${footer()}
</svg>`;
}

// ── 7. TSLA × ALIPAY + FERRARI ─────────────────────────────────────────────

function makeTslaAlipayFerrari(ko) {
  const kp = keyPoints(898, ko
    ? ['Tesla×Alipay: OTA 업데이트로 차내 화면에서 직접 주차 결제',
       '중국 Alipay 오프라인 결제 점유율 50%+ — 사실상 표준',
       'Ferrari CEO Vigna: 기술 10/10 · 프레젠테이션 10/10',
       '"Even in an old world, you can still innovate and dare"']
    : ['Tesla × Alipay: park & pay directly from in-car screen via OTA',
       'Alipay holds 50%+ of China offline payments — de facto standard',
       'Ferrari CEO Vigna: Technology 10/10 · Presentation 10/10',
       '"Even in an old world, you can still innovate and dare" — Ferrari CEO'],
    ko);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0D0A0A','#170808')}
  ${badge(40,28,112,'TSLA','#7F1D1D','#EF4444','#EF4444')}
  <rect x="878" y="28" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>
  <text x="40" y="100" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko ? '2026년 10월 21일' : 'Oct 21, 2026'}</text>
  <text x="40" y="144" font-family="Arial,sans-serif" font-size="21" letter-spacing="2" fill="#9CA3AF">${ko ? 'TESLA × ALIPAY · FERRARI CEO · SEMI 롤아웃' : 'TESLA × ALIPAY  ·  FERRARI CEO  ·  SEMI ROLLOUT'}</text>

  <!-- Top card: Tesla × Alipay -->
  <rect x="40" y="170" width="1000" height="340" rx="20" fill="#111827"/>
  <rect x="40" y="170" width="1000" height="6" rx="3" fill="#EF4444"/>
  <text x="70" y="218" font-family="Arial Black,Arial,sans-serif" font-size="28" font-weight="900" fill="#EF4444">Tesla × Alipay</text>
  <text x="70" y="258" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#FFFFFF">${ko ? '중국 차내 결제 공식 협력' : 'China In-Car Payment Official'}</text>
  <text x="70" y="306" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko ? '차내 화면 → Alipay로 직접 주차비 결제 · OTA 업데이트 배포 예정' : 'Pay parking fees directly from vehicle screen · via OTA software update'}</text>
  <text x="70" y="352" font-family="Arial,sans-serif" font-size="24" fill="#6B7280">${ko ? '중국 오프라인 결제 Alipay 점유율 50%+ · 사실상 표준 결제 수단 통합' : 'Alipay 50%+ of China offline payments — ecosystem integration complete'}</text>
  <text x="70" y="394" font-family="Arial,sans-serif" font-size="24" fill="#9CA3AF">${ko ? '→ BYD 현지 OTA 생태계 맞대응 · 중국 시장 현지화 가속' : '→ Directly counters BYD native OTA ecosystem in China market'}</text>
  <text x="70" y="434" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko ? '중국은 Tesla 최대 해외 단일 시장' : "China: Tesla's largest overseas single market"}</text>
  <text x="70" y="470" font-family="Arial,sans-serif" font-size="20" fill="#4ADE80">${ko ? '→ 소프트웨어 수익화 + 생태계 통합 양면 긍정' : '→ Positive for both software monetization and ecosystem depth'}</text>

  <!-- Bottom card: Ferrari 10/10 + Semi -->
  <rect x="40" y="530" width="480" height="340" rx="20" fill="#111827"/>
  <rect x="40" y="530" width="480" height="6" rx="3" fill="#F59E0B"/>
  <text x="70" y="578" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#F59E0B">Ferrari CEO</text>
  <text x="70" y="622" font-family="Arial Black,Arial,sans-serif" font-size="62" font-weight="900" fill="#FFFFFF">10/10</text>
  <text x="70" y="666" font-family="Arial,sans-serif" font-size="24" fill="#9CA3AF">${ko ? '기술 10/10 · 프레젠테이션 10/10' : 'Technology 10/10 · Presentation 10/10'}</text>
  <text x="70" y="712" font-family="Arial,sans-serif" font-size="21" fill="#6B7280">${ko ? 'Benedetto Vigna' : 'Benedetto Vigna'}</text>
  <text x="70" y="748" font-family="Arial,sans-serif" font-size="19" fill="#6B7280">${ko ? '"Tesla Roadster에 매우 인상적"' : '"Even in an old world,'}</text>
  <text x="70" y="776" font-family="Arial,sans-serif" font-size="19" fill="#6B7280">${ko ? '"혁신의 여지는 여전히 크다"' : 'you can still innovate and dare"'}</text>
  <text x="70" y="812" font-family="Arial,sans-serif" font-size="18" fill="#4ADE80">${ko ? '슈퍼카 업계 기준점이 달라졌다는 신호' : 'Supercar benchmark has shifted'}</text>
  <text x="70" y="842" font-family="Arial,sans-serif" font-size="17" fill="#6B7280">${ko ? '경쟁사 CEO 공개 최고 평점 — 이례적' : 'Competitor CEO public perfect rating — unusual'}</text>

  <rect x="540" y="530" width="500" height="340" rx="20" fill="#111827"/>
  <rect x="540" y="530" width="500" height="6" rx="3" fill="#3B82F6"/>
  <text x="570" y="578" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#3B82F6">Tesla Semi</text>
  <text x="570" y="622" font-family="Arial Black,Arial,sans-serif" font-size="42" font-weight="900" fill="#FFFFFF">${ko ? '롤아웃 진행 중' : 'Rollout Underway'}</text>
  <text x="570" y="666" font-family="Arial,sans-serif" font-size="23" fill="#9CA3AF">${ko ? '기가팩토리 Semi 생산 라인 롤아웃' : 'Gigafactory Semi production rollout'}</text>
  <text x="570" y="712" font-family="Arial,sans-serif" font-size="21" fill="#6B7280">${ko ? 'Class 8 전기 트럭 — PepsiCo·Amazon 운용 중' : 'Class 8 EV truck in service at'}</text>
  <text x="570" y="746" font-family="Arial,sans-serif" font-size="21" fill="#6B7280">${ko ? '' : 'PepsiCo, Amazon, and others'}</text>
  <text x="570" y="790" font-family="Arial,sans-serif" font-size="21" fill="#9CA3AF">${ko ? '→ B2B 매출 다각화 · 화물 시장 전동화 선도' : '→ B2B revenue diversification'}</text>
  <text x="570" y="820" font-family="Arial,sans-serif" font-size="21" fill="#9CA3AF">${ko ? '' : '→ Leader in commercial freight electrification'}</text>
  <text x="570" y="858" font-family="Arial,sans-serif" font-size="18" fill="#4ADE80">${ko ? '소비자 사업 외 추가 매출 채널' : 'Revenue channel alongside consumer'}</text>

  <rect x="40" y="888" width="1000" height="1" fill="#1F2937"/>
  ${kp.svg}
  ${footer()}
</svg>`;
}

// ── 8. OPENAI + AI S&P500 + MUSK $50T ──────────────────────────────────────

function makeOpenAI(ko) {
  const kp = keyPoints(900, ko
    ? ['OpenAI $30B 펀딩 협상 · 기업가치 $1.4T 목표',
       '연환산 매출 $50B → 연말 $70B 목표 · Anthropic IPO 11월 전망',
       'AI 주식 S&P500 49% — 역대 1위 1880년대 철도 수준 근접',
       'Musk: "Starship 시대 SpaceX 매출 $50T+ — 낮은 추정치"']
    : ['OpenAI raising $30B at $1.4T valuation — racing Anthropic IPO',
       'Annualized revenue $50B, targeting $70B year-end · Anthropic IPO: Nov',
       'AI stocks = 49% of S&P 500 — 2nd highest sector concentration ever',
       'Musk: "SpaceX $50T+ in a Starship world — that is a low estimate"'],
    ko);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0A0015','#050012')}
  <rect x="40" y="28" width="120" height="40" rx="20" fill="#1A0A2E"/>
  <rect x="40" y="28" width="120" height="40" rx="20" fill="none" stroke="#A855F7" stroke-width="2"/>
  <text x="100" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#C084FC">AI/매크로</text>
  <rect x="878" y="28" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>
  <text x="40" y="100" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko ? '2026년 10월 21일 · Bloomberg / Kalshi' : 'Oct 21, 2026 · Bloomberg / Kalshi'}</text>
  <text x="40" y="144" font-family="Arial,sans-serif" font-size="21" letter-spacing="2" fill="#9CA3AF">${ko ? 'AI 생태계 · OPENAI · S&amp;P500 집중도 · MUSK' : 'AI ECOSYSTEM  ·  OPENAI  ·  S&amp;P500 CONCENTRATION  ·  MUSK'}</text>

  <!-- S&P500 concentration hero -->
  <text x="40" y="350" font-family="Arial Black,Arial,sans-serif" font-size="190" font-weight="900" fill="#C084FC">49%</text>
  <text x="40" y="398" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko ? 'AI 주식이 S&amp;P500 지수의 49%를 차지 — 역대 2위 섹터 집중도' : 'AI stocks make up 49% of the S&amp;P 500 — 2nd highest sector concentration ever'}</text>
  <text x="40" y="454" font-family="Arial Black,Arial,sans-serif" font-size="40" font-weight="900" fill="#FFFFFF">${ko ? '역대 1위: 1880년대 철도 섹터 (산업화 인프라 독점)' : '#1 All-Time: 1880s Railroads (Industrial Infrastructure Monopoly)'}</text>
  <rect x="40" y="480" width="1000" height="2" rx="1" fill="url(#divG)"/>

  <!-- Three info cards -->
  <rect x="40" y="498" width="310" height="370" rx="16" fill="#111827"/>
  <rect x="40" y="498" width="310" height="6" rx="3" fill="#C084FC"/>
  <text x="195" y="540" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="#C084FC">OpenAI</text>
  <text x="195" y="594" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="#FFFFFF">$30B</text>
  <text x="195" y="636" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#9CA3AF">${ko ? '신규 펀딩 협상 중' : 'new funding in talks'}</text>
  <text x="195" y="678" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="34" font-weight="900" fill="#FFFFFF">$1.4T</text>
  <text x="195" y="714" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${ko ? '목표 기업가치' : 'target valuation'}</text>
  <text x="195" y="758" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#6B7280">${ko ? '연환산 매출 $50B' : 'ARR $50B'}</text>
  <text x="195" y="792" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#6B7280">${ko ? '연말 목표 $70B' : 'YE target $70B'}</text>
  <text x="195" y="834" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#A855F7">${ko ? 'Anthropic IPO 11월 전망' : 'Anthropic IPO: Nov (Kalshi 50%)'}</text>
  <text x="195" y="858" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">${ko ? '(Kalshi 확률 50%)' : ''}</text>

  <rect x="370" y="498" width="310" height="370" rx="16" fill="#111827"/>
  <rect x="370" y="498" width="310" height="6" rx="3" fill="#A855F7"/>
  <text x="525" y="540" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="#A855F7">${ko ? 'Milk Road 시너지' : 'Milk Road Synergies'}</text>
  <text x="390" y="590" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#F3F4F6">TSLA×SPCX</text>
  <text x="390" y="632" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${ko ? '① Tesla+X+SpaceX 데이터' : '① Tesla+X+SpaceX data'}</text>
  <text x="390" y="660" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${ko ? '동일 GPU로 통합 학습' : 'on shared GPU cluster'}</text>
  <text x="390" y="700" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${ko ? '② 컴퓨팅 차익 $11.2B 절감 추정' : '② $11.2B compute arbitrage'}</text>
  <text x="390" y="740" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${ko ? '③ SpaceX AI 손실 $3.7B' : '③ SpaceX AI loss $3.7B'}</text>
  <text x="390" y="768" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${ko ? 'Tesla 과세이익 상계 가능' : 'offset vs Tesla taxable profit'}</text>
  <text x="390" y="808" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${ko ? '④ 법무·HR·IR 중복 비용 제거' : '④ Eliminate duplicate overhead'}</text>
  <text x="390" y="848" font-family="Arial,sans-serif" font-size="18" fill="#C084FC">${ko ? '최대 가치 드라이버: 데이터+컴퓨팅 통합' : 'Core driver: data + compute unification'}</text>

  <rect x="700" y="498" width="340" height="370" rx="16" fill="#111827"/>
  <rect x="700" y="498" width="340" height="6" rx="3" fill="#F59E0B"/>
  <text x="870" y="540" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="#F59E0B">Musk Vision</text>
  <text x="720" y="596" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${ko ? '"Starship 시대"' : '"In a Starship major world"'}</text>
  <text x="870" y="656" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="#FFFFFF">$50T</text>
  <text x="870" y="698" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#F59E0B">${ko ? 'SpaceX 매출 이상 — "낮은 추정치"' : 'SpaceX revenue+ — "low estimate"'}</text>
  <text x="720" y="744" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">${ko ? 'Oct 8 발언: "SpaceX 가치' : 'Oct 8 quote: "SpaceX being worth'}</text>
  <text x="720" y="770" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">${ko ? '= 지구 경제 전체보다 클 수도"' : 'orders of magnitude more than'}</text>
  <text x="720" y="796" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">${ko ? '1,130만 뷰 기록' : 'the current Earth economy"'}</text>
  <text x="720" y="832" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">${ko ? '' : '→ 11.3M views on X'}</text>
  <text x="720" y="860" font-family="Arial,sans-serif" font-size="18" fill="#F59E0B">${ko ? '전제: Starship 상업화 성공 (10~20년)' : 'Requires: Starship commercialization (10-20yr)'}</text>

  <rect x="40" y="880" width="1000" height="1" fill="#1F2937"/>
  ${kp.svg}
  ${footer()}
</svg>`;
}

// ── main ───────────────────────────────────────────────────────────────────

async function main() {
  const charts = [
    // Updated summary (overwrite previous)
    [`summary-${DATE}`,                          makeSummary(true)],
    [`summary-${DATE}-en`,                       makeSummary(false)],
    // New charts
    [`terafab-semi-${DATE}`,                     makeTerafab(true)],
    [`terafab-semi-${DATE}-en`,                  makeTerafab(false)],
    [`spcx-q3-starship-${DATE}`,                 makeSpcxStarship(true)],
    [`spcx-q3-starship-${DATE}-en`,              makeSpcxStarship(false)],
    [`model-y-global-${DATE}`,                   makeModelY(true)],
    [`model-y-global-${DATE}-en`,                makeModelY(false)],
    [`optimus-v3-${DATE}`,                       makeOptimus(true)],
    [`optimus-v3-${DATE}-en`,                    makeOptimus(false)],
    [`cybercab-cost-${DATE}`,                    makeCybercab(true)],
    [`cybercab-cost-${DATE}-en`,                 makeCybercab(false)],
    [`ark-tsla-2031-${DATE}`,                    makeARK(true)],
    [`ark-tsla-2031-${DATE}-en`,                 makeARK(false)],
    [`tsla-alipay-ferrari-${DATE}`,              makeTslaAlipayFerrari(true)],
    [`tsla-alipay-ferrari-${DATE}-en`,           makeTslaAlipayFerrari(false)],
    [`openai-ai-sp500-${DATE}`,                  makeOpenAI(true)],
    [`openai-ai-sp500-${DATE}-en`,               makeOpenAI(false)],
  ];

  for (const [name, svg] of charts) {
    await save(name, svg);
  }
  console.log(`\n✅ All ${charts.length} charts generated for ${DATE}b`);
}

main().catch(e => { console.error(e); process.exit(1); });
