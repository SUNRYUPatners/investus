#!/usr/bin/env node
// Chart generator — 2026-10-21 — SPCX Q3 earnings + TSLA-SPCX merger committee
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/charts');
const DATE = '20261021';

// ── helpers ────────────────────────────────────────────────────────────────

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
      while (i < text.length && /[a-zA-Z0-9$.,+\-:%/]/.test(text[i])) word += text[i++];
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

function escXml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
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

function footer(date='Oct 21, 2026') {
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

// ── 1. SUMMARY ─────────────────────────────────────────────────────────────

const SUMMARY_ROWS_KO = [
  { label: 'SPCX', color: '#A855F7', text: 'SPCX Q3 EPS $0.35 vs $0.10E — 250% 어닝 서프라이즈, 매출 +161%' },
  { label: 'SPCX', color: '#A855F7', text: 'SPCX AI 슈퍼인텔리전스 매출 $7.56B, 전년 대비 +830%' },
  { label: 'MERGE', color: '#EF4444', text: 'TSLA-SPCX 합병 특위 공식 확인 — 양사 이사회 독립 특위 구성' },
  { label: 'TSLA', color: '#EF4444', text: 'TSLA Q3 어닝 오늘밤 발표 — 딜리버리 486,532대 컨센서스 상회' },
  { label: 'TSLA', color: '#10B981', text: 'Tesla FSD 자동차 마진·FSD 전환율·합병 언급 3대 관전포인트' },
  { label: 'STRLN', color: '#3B82F6', text: 'Starlink 구독자 1,360만 — 연결 매출 $5.2B (+69%)' },
];

const SUMMARY_ROWS_EN = [
  { label: 'SPCX', color: '#A855F7', text: 'SPCX Q3 EPS $0.35 vs $0.10E — 250% beat, revenue +161% YoY' },
  { label: 'SPCX', color: '#A855F7', text: 'SPCX SuperIntelligence AI revenue $7.56B (+830% YoY)' },
  { label: 'MERGE', color: '#EF4444', text: 'TSLA-SPCX merger committees officially confirmed by Musk' },
  { label: 'TSLA', color: '#EF4444', text: 'Tesla Q3 earnings tonight — 486,532 deliveries beat consensus' },
  { label: 'TSLA', color: '#10B981', text: 'Tesla: auto margins, FSD attach rate, merger commentary — 3 watches' },
  { label: 'STRLN', color: '#3B82F6', text: 'Starlink 13.6M subscribers — connectivity revenue $5.2B (+69%)' },
];

function makeSummary(ko) {
  const rows = ko ? SUMMARY_ROWS_KO : SUMMARY_ROWS_EN;
  const n = rows.length;
  const heroLabel = ko ? '6대 토픽' : `${n} Topics`;
  const heroSub = ko ? '2026년 10월 21일 · SPCX 대어닝 · TSLA-SPCX 합병 특위 공식화' : 'Oct 21, 2026 · SPCX record earnings · TSLA-SPCX merger confirmed';
  const rowH = 98, startY = 340;

  let rowsSvg = '';
  rows.forEach(({ label, color, text }, i) => {
    const y = startY + i * rowH;
    const lines = wrapText(text, ko ? 30 : 46, ko);
    rowsSvg += `<rect x="54" y="${y}" width="972" height="${rowH - 6}" rx="12" fill="#111827" stroke="${color}" stroke-width="1.5" stroke-opacity="0.4"/>`;
    // colored label box
    rowsSvg += `<rect x="70" y="${y + 14}" width="72" height="28" rx="8" fill="${color}" opacity="0.18"/>`;
    rowsSvg += `<rect x="70" y="${y + 14}" width="72" height="4" rx="2" fill="${color}"/>`;
    rowsSvg += `<text x="106" y="${y + 36}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="13" font-weight="900" fill="${color}">${escXml(label)}</text>`;
    lines.forEach((ln, li) => {
      rowsSvg += `<text x="158" y="${y + 28 + li * 27}" font-family="Arial,sans-serif" font-size="${ko ? 22 : 21}" fill="#E6EDF3">${escXml(ln)}</text>`;
    });
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base()}
  ${badge(40,28,112,'TSLA','#7F1D1D','#EF4444','#EF4444')}
  ${badge(164,28,112,'SPCX','#2D1657','#C084FC','#C084FC')}
  <rect x="878" y="28" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>
  <text x="40" y="100" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko ? '2026년 10월 21일' : 'Oct 21, 2026'}</text>
  <text x="40" y="146" font-family="Arial,sans-serif" font-size="21" letter-spacing="2" fill="#9CA3AF">${ko ? 'SPCX Q3 역대 최대 · 합병 특위 공식화 · TSLA 어닝' : 'SPCX RECORD EARNINGS  ·  MERGER COMMITTEE CONFIRMED  ·  TSLA Q3'}</text>
  <text x="40" y="${260}" font-family="Arial Black,Arial,sans-serif" font-size="140" font-weight="900" fill="url(#accentG)">${heroLabel}</text>
  <text x="40" y="300" font-family="Arial,sans-serif" font-size="24" fill="#9CA3AF">${escXml(heroSub)}</text>
  <rect x="40" y="322" width="1000" height="2" rx="1" fill="url(#divG)"/>
  ${rowsSvg}
  ${footer()}
</svg>`;
}

// ── 2. SPCX Q3 ACTUAL EARNINGS ─────────────────────────────────────────────

function makeSpcxQ3(ko) {
  const kp = keyPoints(910, ko
    ? ['EPS $0.35 — 컨센서스 $0.10 대비 250% 어닝 서프라이즈', 'AI 슈퍼인텔리전스 매출 $7.56B (+830% YoY)', 'Starlink 구독자 1,360만, 연결 매출 $5.2B (+69%)', '시간외 주가 $151.70 (정규장 $147.79)', '합병 특위 공식 확인 — 머스크 어닝콜 직접 발언']
    : ['EPS $0.35 vs $0.10E — 250% earnings surprise', 'AI SuperIntelligence revenue $7.56B (+830% YoY)', 'Starlink 13.6M subs, connectivity $5.2B (+69%)', 'AH shares hit $151.70 vs $147.79 regular close', 'Merger committees confirmed by Musk on this call'],
    ko);
  const kpEnd = 910 + kp.height;

  const bars = [
    { label: ko ? 'SPCX AI' : 'SuperIntelligence', val: 7.56, maxVal: 14.58, color: '#A855F7' },
    { label: ko ? 'Starlink' : 'Connectivity', val: 5.2, maxVal: 14.58, color: '#3B82F6' },
    { label: ko ? '발사·기타' : 'Launch & Other', val: 1.82, maxVal: 14.58, color: '#6B7280' },
  ];

  let barsSvg = '';
  bars.forEach(({ label, val, maxVal, color }, i) => {
    const barW = Math.round((val / maxVal) * 820);
    const y = 620 + i * 84;
    barsSvg += `<text x="178" y="${y + 28}" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="20" font-weight="900" fill="${color}">${escXml(label)}</text>`;
    barsSvg += `<rect x="190" y="${y}" width="${barW}" height="52" rx="8" fill="${color}" opacity="${i === 0 ? 1 : 0.7}"/>`;
    barsSvg += `<text x="${190 + barW + 10}" y="${y + 34}" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="#FFFFFF">$${val}B</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base()}
  ${badge(40,28,112,'SPCX','#2D1657','#C084FC','#C084FC')}
  <rect x="164" y="28" width="100" height="40" rx="20" fill="#14532D"/>
  <rect x="164" y="28" width="100" height="40" rx="20" fill="none" stroke="#4ADE80" stroke-width="2"/>
  <text x="214" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#4ADE80">${ko ? 'Q3 어닝' : 'Q3 BEAT'}</text>
  <rect x="878" y="28" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>
  <text x="40" y="100" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko ? '2026년 10월 20일 발표' : 'Reported Oct 20, 2026'}</text>
  <text x="40" y="144" font-family="Arial,sans-serif" font-size="21" letter-spacing="2" fill="#9CA3AF">${ko ? 'SPCX Q3 실적 · 역대 최대 어닝 서프라이즈' : 'SPCX Q3 RESULTS  ·  RECORD EARNINGS BEAT'}</text>
  <text x="40" y="380" font-family="Arial Black,Arial,sans-serif" font-size="180" font-weight="900" fill="#4ADE80">$0.35</text>
  <text x="40" y="428" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko ? 'Q3 조정 EPS — 컨센서스 $0.10 대비 250% 상회' : 'Q3 adj. EPS — 250% beat vs $0.10 consensus'}</text>
  <text x="40" y="484" font-family="Arial Black,Arial,sans-serif" font-size="46" font-weight="900" fill="#FFFFFF">${ko ? '매출 $14.6B · 전년 대비 +161%' : 'Revenue $14.6B · +161% YoY'}</text>
  <text x="40" y="534" font-family="Arial Black,Arial,sans-serif" font-size="46" font-weight="900" fill="#FFFFFF">${ko ? '순이익 $4.4B · 상장 이래 최대 분기 흑자' : 'Net Income $4.4B · Largest quarterly profit ever'}</text>
  <rect x="40" y="558" width="1000" height="2" rx="1" fill="url(#divG)"/>
  <text x="40" y="600" font-family="Arial,sans-serif" font-size="21" letter-spacing="1" fill="#9CA3AF">${ko ? 'Q3 사업부별 매출 분해' : 'Q3 REVENUE BREAKDOWN BY SEGMENT'}</text>
  ${barsSvg}
  <rect x="40" y="884" width="1000" height="1" fill="#1F2937"/>
  ${kp.svg}
  ${footer()}
</svg>`;
}

// ── 3. MERGER COMMITTEE ────────────────────────────────────────────────────

function makeMergerCommittee(ko) {
  const kp = keyPoints(928, ko
    ? ['양사 이사회 독립이사로 구성된 특별위원회 설치', '머스크는 이해충돌로 논의 배제 — 특위에 불참', '합병 조건: TSLA 전체 발행주식 50% 이상 찬성', 'Barclays: 10월 말~11월 초 발표 가능, $3.5T 추정', 'Kalshi 합병 확률 67%에서 추가 상승 중']
    : ['Both boards formed independent-director special committees', 'Musk excluded as conflicted party — not in committee talks', 'Tesla requires 50%+ of ALL outstanding shares to approve', 'Barclays: announcement late Oct–early Nov, $3.5T entity value', 'Kalshi merger odds rising further from 67% post-confirmation'],
    ko);

  const timeline = [
    { dot: '#EF4444', y: 620, label: ko ? '10월 20일' : 'Oct 20', desc: ko ? '머스크 어닝콜 — 특위 공식 확인' : 'Musk confirms committees on SPCX call' },
    { dot: '#F59E0B', y: 720, label: ko ? '10월 말~11월 초' : 'Late Oct–Nov', desc: ko ? 'Barclays 합병 발표 예상 시점' : 'Barclays: merger announcement expected' },
    { dot: '#A855F7', y: 820, label: ko ? '12월 6일' : 'Dec 6', desc: ko ? 'Tesla AGM — 주주 동의 예상 창구' : 'Tesla AGM — shareholder vote window' },
    { dot: '#10B981', y: 920, label: ko ? '2027 Q1' : 'Q1 2027', desc: ko ? '합병 최종 완료 예상' : 'Expected merger close (est.)' },
  ];

  let tlSvg = '';
  tlSvg += `<line x1="104" y1="620" x2="104" y2="930" stroke="#374151" stroke-width="2"/>`;
  timeline.forEach(({ dot, y, label, desc }) => {
    tlSvg += `<circle cx="104" cy="${y}" r="12" fill="${dot}"/>`;
    tlSvg += `<text x="130" y="${y - 6}" font-family="Arial Black,Arial,sans-serif" font-size="20" font-weight="900" fill="#F3F4F6">${escXml(label)}</text>`;
    tlSvg += `<text x="130" y="${y + 18}" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${escXml(desc)}</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0A0010','#0A0520')}
  ${badge(40,28,112,'TSLA','#7F1D1D','#EF4444','#EF4444')}
  ${badge(164,28,112,'SPCX','#2D1657','#C084FC','#C084FC')}
  <rect x="296" y="28" width="160" height="40" rx="20" fill="#450A0A"/>
  <rect x="296" y="28" width="160" height="40" rx="20" fill="none" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="5 3"/>
  <text x="376" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#FCA5A5">BREAKING</text>
  <rect x="878" y="28" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>
  <text x="40" y="100" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko ? '2026년 10월 21일' : 'Oct 21, 2026'}</text>
  <text x="40" y="146" font-family="Arial,sans-serif" font-size="21" letter-spacing="2" fill="#9CA3AF">${ko ? '머스크 공식 확인 · 합병 특별위원회 구성' : 'MUSK CONFIRMS  ·  MERGER SPECIAL COMMITTEES FORMED'}</text>
  <text x="40" y="380" font-family="Arial Black,Arial,sans-serif" font-size="110" font-weight="900" fill="url(#accentG)">${ko ? '합병 특위' : 'MERGER'}</text>
  <text x="40" y="480" font-family="Arial Black,Arial,sans-serif" font-size="110" font-weight="900" fill="url(#accentG)">${ko ? '공식 확인' : 'CONFIRMED'}</text>
  <text x="40" y="530" font-family="Arial,sans-serif" font-size="25" fill="#9CA3AF">${ko ? '양사 이사회 독립이사 특별위원회 구성 — 머스크 어닝콜 공식 발언' : 'Both boards form independent special committees — Musk earnings call'}</text>
  <rect x="40" y="556" width="1000" height="2" rx="1" fill="url(#divG)"/>
  <text x="40" y="596" font-family="Arial,sans-serif" font-size="21" letter-spacing="1" fill="#9CA3AF">${ko ? '합병 일정 로드맵' : 'MERGER TIMELINE ROADMAP'}</text>
  ${tlSvg}
  <rect x="40" y="956" width="1000" height="1" fill="#1F2937"/>
  <rect x="40" y="962" width="1000" height="64" rx="12" fill="#1F2937"/>
  <text x="60" y="1000" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#C084FC">${ko ? 'Barclays 합병 후 기업가치 추정' : 'Barclays Post-Merger Valuation'}</text>
  <text x="740" y="1000" font-family="Arial Black,Arial,sans-serif" font-size="36" font-weight="900" fill="#FFFFFF">$3.5T</text>
  ${kp.svg}
  ${footer()}
</svg>`;
}

// ── 4. TSLA Q3 EARNINGS PREVIEW ────────────────────────────────────────────

function makeTslaQ3(ko) {
  const kp = keyPoints(934, ko
    ? ['딜리버리: 486,532대 컨센서스 461,974 대비 +5.3% 상회', '에너지: 13.7 GWh vs 컨센서스 15.9 GWh (미달)', '자동차 마진 컨센: 15.8~16.2% (Q2 15.2%에서 회복 기대)', 'FSD 전환율 20%+ 시 반복 수익 최초 가시화', '합병 언급 여부 — 이번 어닝콜 최대 관심사']
    : ['Deliveries: 486,532 vs 461,974E (+5.3% beat)', 'Energy storage: 13.7 GWh vs 15.9 GWh consensus (miss)', 'Auto gross margin consensus: 15.8–16.2% (recovery from 15.2%)', 'FSD conversion >20% = first visible recurring revenue', 'Merger commentary — top catalyst on this call'],
    ko);

  const stats = [
    { label: ko ? '딜리버리' : 'Deliveries', val: '486,532', sub: ko ? 'vs 컨센서스 461,974' : 'vs 461,974 consensus', color: '#4ADE80', verdict: ko ? '상회' : 'BEAT' },
    { label: ko ? '에너지 GWh' : 'Energy GWh', val: '13.7', sub: ko ? 'vs 컨센서스 15.9 GWh' : 'vs 15.9 GWh consensus', color: '#EF4444', verdict: ko ? '미달' : 'MISS' },
    { label: ko ? 'EPS 컨센' : 'EPS Consensus', val: '$0.44', sub: ko ? '전년 $0.50 대비 -12%' : 'vs $0.50 a year ago', color: '#F59E0B', verdict: ko ? '발표 대기' : 'TBD' },
  ];

  let statsSvg = '';
  stats.forEach(({ label, val, sub, color, verdict }, i) => {
    const x = 40 + i * 346;
    statsSvg += `<rect x="${x}" y="740" width="320" height="150" rx="14" fill="#111827"/>`;
    statsSvg += `<rect x="${x}" y="740" width="320" height="5" rx="2.5" fill="${color}"/>`;
    statsSvg += `<text x="${x + 160}" y="782" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="${color}">${escXml(label)}</text>`;
    statsSvg += `<text x="${x + 160}" y="832" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="40" font-weight="900" fill="#FFFFFF">${escXml(val)}</text>`;
    statsSvg += `<text x="${x + 160}" y="864" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" fill="#9CA3AF">${escXml(sub)}</text>`;
    statsSvg += `<rect x="${x + 90}" y="874" width="140" height="28" rx="12" fill="${color}" opacity="0.18"/>`;
    statsSvg += `<text x="${x + 160}" y="894" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="15" font-weight="900" fill="${color}">${escXml(verdict)}</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base()}
  ${badge(40,28,112,'TSLA','#7F1D1D','#EF4444','#EF4444')}
  <rect x="164" y="28" width="130" height="40" rx="20" fill="#451A03"/>
  <rect x="164" y="28" width="130" height="40" rx="20" fill="none" stroke="#FB923C" stroke-width="2"/>
  <text x="229" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#FB923C">${ko ? 'Q3 어닝' : 'Q3 EARNINGS'}</text>
  <rect x="878" y="28" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>
  <text x="40" y="100" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko ? '2026년 10월 21일 오후 4:30 CT 발표' : 'Reporting Oct 21, 2026 at 4:30pm CT'}</text>
  <text x="40" y="146" font-family="Arial,sans-serif" font-size="21" letter-spacing="2" fill="#9CA3AF">${ko ? 'TESLA Q3 2026 어닝 · 오늘밤 발표' : 'TESLA Q3 2026 EARNINGS  ·  AFTER CLOSE TODAY'}</text>
  <text x="40" y="400" font-family="Arial Black,Arial,sans-serif" font-size="200" font-weight="900" fill="url(#accentG)">${ko ? '오늘밤' : 'TONIGHT'}</text>
  <text x="40" y="448" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko ? 'Tesla Q3 실적 — 오후 4:30 CT / 한국 10월 22일 오전 6:30' : 'Tesla Q3 results — 4:30pm CT / Oct 22 6:30am KST'}</text>
  <text x="40" y="506" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#FFFFFF">${ko ? '딜리버리 이미 BEAT.' : 'Deliveries Already Beat.'}</text>
  <text x="40" y="562" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#FFFFFF">${ko ? '마진·FSD·합병 발언이 관건.' : 'Margins, FSD, Merger Talk Are the Keys.'}</text>
  <rect x="40" y="586" width="1000" height="2" rx="1" fill="url(#divG)"/>
  <text x="40" y="726" font-family="Arial,sans-serif" font-size="21" letter-spacing="1" fill="#9CA3AF">${ko ? 'Q3 이미 발표된 지표' : 'ALREADY REPORTED Q3 METRICS'}</text>
  ${statsSvg}
  <rect x="40" y="904" width="1000" height="1" fill="#1F2937"/>
  ${kp.svg}
  ${footer()}
</svg>`;
}

// ── 5. SPCX AI REVENUE ─────────────────────────────────────────────────────

function makeSpcxAI(ko) {
  const kp = keyPoints(940, ko
    ? ['AI 사업부 분기 $7.56B — 연환산 $30B 규모', 'Starlink 연결 매출 $5.2B 제치고 최대 사업부 등극', '브라운스빌 GPU 클러스터 5~6개 이상 2년 내 자체 구축', 'AWS·Google·Azure 공급 불가 판정 — 자체 인프라 선택']
    : ['AI segment quarterly $7.56B — ~$30B annualized run rate', 'Now larger than Starlink ($5.2B) — SpaceX largest segment', 'Brownsville TX: 5-6+ GPU clusters built in-house in under 2 yrs', 'AWS/Google/Azure couldn\'t supply at needed scale — self-built'],
    ko);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base('#0A0020','#050015')}
  ${badge(40,28,112,'SPCX','#2D1657','#C084FC','#C084FC')}
  <rect x="164" y="28" width="100" height="40" rx="20" fill="#1A0A2E"/>
  <rect x="164" y="28" width="100" height="40" rx="20" fill="none" stroke="#A855F7" stroke-width="2"/>
  <text x="214" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="15" font-weight="900" fill="#A855F7">${ko ? 'AI 사업부' : 'AI SEGMENT'}</text>
  <rect x="878" y="28" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>
  <text x="40" y="100" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko ? '2026년 10월 20일 Q3 어닝 발표' : 'Q3 2026 Earnings Report — Oct 20'}</text>
  <text x="40" y="146" font-family="Arial,sans-serif" font-size="21" letter-spacing="2" fill="#9CA3AF">${ko ? 'SPCX AI 슈퍼인텔리전스 · 역대 최대 성장' : 'SPCX SUPERINTELLIGENCE  ·  RECORD GROWTH'}</text>
  <text x="40" y="380" font-family="Arial Black,Arial,sans-serif" font-size="160" font-weight="900" fill="#A855F7">+830%</text>
  <text x="40" y="428" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko ? 'AI 슈퍼인텔리전스 사업부 Q3 매출 — 전년 $813M → $7.56B' : 'SuperIntelligence segment Q3 revenue — $813M → $7.56B YoY'}</text>
  <text x="40" y="486" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#FFFFFF">${ko ? 'SpaceX는 이제 AI 인프라 기업.' : 'SpaceX Is Now an AI Infrastructure Company.'}</text>
  <text x="40" y="542" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#FFFFFF">${ko ? '로켓 회사는 옛말.' : 'The Rocket Company Label Is Obsolete.'}</text>
  <rect x="40" y="566" width="1000" height="2" rx="1" fill="url(#divG)"/>
  <!-- Comparison bars -->
  <text x="40" y="608" font-family="Arial,sans-serif" font-size="21" letter-spacing="1" fill="#9CA3AF">${ko ? 'SPCX 사업부별 분기 매출' : 'SPCX Q3 REVENUE BY SEGMENT'}</text>
  <!-- AI bar: 7.56 / 7.56 * 820 = 820 -->
  <text x="178" y="660" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#A855F7">${ko ? 'AI' : 'AI'}</text>
  <rect x="190" y="636" width="820" height="52" rx="8" fill="#A855F7"/>
  <text x="1018" y="670" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FFFFFF">$7.56B</text>
  <!-- Starlink bar: 5.2 / 7.56 * 820 = 564 -->
  <text x="178" y="726" text-anchor="end" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#3B82F6">Starlink</text>
  <rect x="190" y="704" width="564" height="52" rx="8" fill="#3B82F6" opacity="0.8"/>
  <text x="762" y="738" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FFFFFF">$5.2B</text>
  <!-- Launch bar: 1.82/7.56*820 = 197 -->
  <text x="178" y="792" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${ko ? '발사 등' : 'Launch'}</text>
  <rect x="190" y="772" width="197" height="52" rx="8" fill="#374151"/>
  <text x="396" y="806" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">$1.82B</text>
  <!-- Year comparison note -->
  <text x="40" y="848" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${ko ? '전년 Q3 AI 사업부 $813M → 금년 $7.56B (+830%) · 연환산 ~$30B' : 'YoY: AI segment $813M → $7.56B (+830%) · ~$30B annualized'}</text>
  <rect x="40" y="868" width="1000" height="1" fill="#1F2937"/>
  ${kp.svg}
  ${footer()}
</svg>`;
}

// ── 6. MERGER STRUCTURE ────────────────────────────────────────────────────

function makeMergerStructure(ko) {
  const kp = keyPoints(960, ko
    ? ['TSLA 전체 발행주식 32억 주 중 50% 이상 찬성 필요', '머스크 지분 약 13% — 기관투자자 과반 찬성이 필수', '반대 시나리오: 특위 결렬 → 합병 프리미엄 소멸 위험', '합병 후 $3.5T → 현재 합산 $2.1T 대비 +$1.4T 프리미엄']
    : ['~3.2B total TSLA shares, 50%+ = 1.6B+ votes needed', 'Musk ~13% — institutional majority support is essential', 'Downside: if committees fail, merger premium unwinds', 'Post-merger $3.5T vs current ~$2.1T combined — $1.4T synergy premium'],
    ko);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${base()}
  ${badge(40,28,112,'TSLA','#7F1D1D','#EF4444','#EF4444')}
  ${badge(164,28,112,'SPCX','#2D1657','#C084FC','#C084FC')}
  <rect x="878" y="28" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>
  <text x="40" y="100" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">${ko ? '2026년 10월 21일' : 'Oct 21, 2026'}</text>
  <text x="40" y="146" font-family="Arial,sans-serif" font-size="21" letter-spacing="2" fill="#9CA3AF">${ko ? '합병 구조 분석 · 주주 동의 요건 · 일정' : 'MERGER STRUCTURE  ·  APPROVAL THRESHOLD  ·  TIMELINE'}</text>
  <text x="40" y="380" font-family="Arial Black,Arial,sans-serif" font-size="200" font-weight="900" fill="url(#accentG)">50%</text>
  <text x="40" y="428" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">${ko ? '테슬라 합병 성사 요건 — 전체 발행주식 과반수 찬성 필요' : 'Tesla merger approval threshold — majority of ALL outstanding shares'}</text>
  <text x="40" y="484" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#FFFFFF">${ko ? '"투표 참여자 아닌' : '"Not just those who vote —'}</text>
  <text x="40" y="540" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#FFFFFF">${ko ? '전체 주주 과반이 필요합니다."' : 'all shareholders." — Musk'}</text>
  <rect x="40" y="566" width="1000" height="2" rx="1" fill="url(#divG)"/>
  <!-- Shareholder breakdown bar -->
  <text x="40" y="608" font-family="Arial,sans-serif" font-size="21" letter-spacing="1" fill="#9CA3AF">${ko ? 'TSLA 주주 구성 (추정)' : 'ESTIMATED TSLA SHAREHOLDER BREAKDOWN'}</text>
  <rect x="40" y="622" width="1000" height="60" rx="10" fill="#1F2937"/>
  <!-- Musk 13%: 130px -->
  <rect x="40" y="622" width="130" height="60" rx="10" fill="#EF4444" opacity="0.85"/>
  <text x="105" y="658" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" fill="#FFF">13%</text>
  <!-- Institutional 50%: 500px -->
  <rect x="170" y="622" width="500" height="60" fill="#3B82F6" opacity="0.75"/>
  <text x="420" y="658" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" fill="#FFF">${ko ? '기관투자자 ~50%' : 'Institutional ~50%'}</text>
  <!-- Retail 37% -->
  <rect x="670" y="622" width="370" height="60" rx="0 10 10 0" fill="#6B7280" opacity="0.7"/>
  <text x="855" y="658" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" fill="#FFF">${ko ? '개인 ~37%' : 'Retail ~37%'}</text>
  <text x="105" y="700" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#EF4444">${ko ? '머스크' : 'Musk'}</text>
  <text x="420" y="700" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#3B82F6">${ko ? '기관 — 찬성 필수' : 'Institutions — Essential'}</text>
  <!-- Valuation comparison -->
  <text x="40" y="748" font-family="Arial,sans-serif" font-size="21" letter-spacing="1" fill="#9CA3AF">${ko ? '합병 후 기업가치 비교 (Barclays)' : 'POST-MERGER VALUATION (BARCLAYS)'}</text>
  <!-- Current: TSLA $1.4T + SPCX $0.7T -->
  <rect x="40" y="762" width="420" height="80" rx="12" fill="#1F2937"/>
  <text x="250" y="798" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#9CA3AF">${ko ? '현재 합산 가치' : 'Current combined'}</text>
  <text x="250" y="832" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="34" fill="#FFFFFF">~$2.1T</text>
  <!-- Arrow -->
  <text x="498" y="810" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#C084FC">→</text>
  <!-- Post-merger: $3.5T -->
  <rect x="558" y="762" width="480" height="80" rx="12" fill="#2D1657"/>
  <rect x="558" y="762" width="480" height="5" rx="2.5" fill="#C084FC"/>
  <text x="798" y="798" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#C084FC">${ko ? 'Barclays 합병 후' : 'Barclays post-merger'}</text>
  <text x="798" y="832" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="34" fill="#FFFFFF">$3.5T</text>
  <!-- +$1.4T premium label -->
  <text x="540" y="872" font-family="Arial,sans-serif" font-size="20" fill="#4ADE80">${ko ? '+$1.4T 합병 시너지 프리미엄 (AI·에너지·운송 통합)' : '+$1.4T merger synergy premium (AI + energy + transport)'}</text>
  <rect x="40" y="890" width="1000" height="1" fill="#1F2937"/>
  ${kp.svg}
  ${footer()}
</svg>`;
}

// ── main ───────────────────────────────────────────────────────────────────

async function main() {
  const charts = [
    [`summary-${DATE}`,                    makeSummary(true)],
    [`summary-${DATE}-en`,                 makeSummary(false)],
    [`spcx-q3-actual-${DATE}`,             makeSpcxQ3(true)],
    [`spcx-q3-actual-${DATE}-en`,          makeSpcxQ3(false)],
    [`tsla-spcx-merger-committee-${DATE}`, makeMergerCommittee(true)],
    [`tsla-spcx-merger-committee-${DATE}-en`, makeMergerCommittee(false)],
    [`tsla-q3-earnings-${DATE}`,           makeTslaQ3(true)],
    [`tsla-q3-earnings-${DATE}-en`,        makeTslaQ3(false)],
    [`spcx-ai-revenue-${DATE}`,            makeSpcxAI(true)],
    [`spcx-ai-revenue-${DATE}-en`,         makeSpcxAI(false)],
    [`merger-structure-${DATE}`,           makeMergerStructure(true)],
    [`merger-structure-${DATE}-en`,        makeMergerStructure(false)],
  ];

  for (const [name, svg] of charts) {
    await save(name, svg);
  }
  console.log(`\n✅ All ${charts.length} charts generated for ${DATE}`);
}

main().catch(e => { console.error(e); process.exit(1); });
