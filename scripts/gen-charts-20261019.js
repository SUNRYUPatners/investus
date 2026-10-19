#!/usr/bin/env node
// 2026-10-19 개별 토픽 카드 + 요약 (KO + EN)
const fs   = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT = path.join(__dirname, '../public/charts');
const W = 1080, H = 1350;

async function save(slug, svg) {
  fs.writeFileSync(path.join(OUT, slug + '.svg'), svg, 'utf8');
  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, slug + '.png'));
  console.log('✓', slug + '.png');
}

function mkSvg(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${inner}</svg>`;
}

function base(c1, c2) {
  return `<defs>
  <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#0D1117"/><stop offset="100%" stop-color="#0A0E1A"/>
  </linearGradient>
  <linearGradient id="tBar" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
  </linearGradient>
  <linearGradient id="divG" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}" stop-opacity="0"/><stop offset="30%" stop-color="${c1}"/>
    <stop offset="70%" stop-color="${c2}"/><stop offset="100%" stop-color="${c2}" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="hG" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
  </linearGradient>
  <linearGradient id="barG" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
  </linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bgG)"/>
<rect x="0" y="0" width="${W}" height="12" fill="url(#tBar)"/>`;
}

function badge(x, label, color) {
  const w = label.length * 13 + 28;
  return `<rect x="${x}" y="30" width="${w}" height="36" rx="8" fill="${color}"/>
<text x="${x + w/2}" y="54" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" text-anchor="middle" font-weight="900">${label}</text>`;
}

function footer(d) {
  return `<rect x="0" y="${H-72}" width="${W}" height="72" fill="#161B22"/>
<text x="54" y="${H-24}" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#58A6FF" font-weight="900">investus.kr</text>
<text x="${W-54}" y="${H-24}" font-family="Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="end">${d}</text>`;
}

function div(y) {
  return `<rect x="54" y="${y}" width="972" height="3" fill="url(#divG)" rx="2"/>`;
}

function card(x, y, w, h, stroke) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#161B22" stroke="${stroke}" stroke-width="2"/>`;
}

function msgBox(y, h, text, color) {
  const lines = [];
  let cur = '';
  const maxCh = 24;
  for (const ch of text) {
    cur += ch;
    if (cur.length >= maxCh && (ch === '.' || ch === ',' || ch === ' ' || ch === '·')) {
      lines.push(cur.trim()); cur = '';
    }
  }
  if (cur.trim()) lines.push(cur.trim());
  const boxH = Math.max(h, lines.length * 38 + 48);
  let out = `<rect x="54" y="${y}" width="972" height="${boxH}" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>`;
  lines.forEach((l, i) => {
    out += `<text x="84" y="${y + 44 + i * 38}" font-family="Arial,sans-serif" font-size="24" fill="${color}">${l}</text>`;
  });
  return out;
}

// ─── 1. SPCX 발사 질량 4.3x ────────────────────────────────────────────────
function spcxMassDelivery(lang) {
  const ko = lang === 'ko';
  const c1 = '#3B82F6', c2 = '#60A5FA';
  const data = [
    { yr: '2020', spcx: 308,  row: 273 },
    { yr: '2021', spcx: 388,  row: 445 },
    { yr: '2022', spcx: 678,  row: 428 },
    { yr: '2023', spcx: 1237, row: 265 },
    { yr: '2024', spcx: 1756, row: 324 },
    { yr: '2025', spcx: 2308, row: 534 },
  ];
  const maxV = 2400;
  const chartH = 420;
  const chartY = 540;
  const chartX = 54;
  const chartW = 972;
  const groupW = chartW / 6;
  const barW = 64;
  const gap = 14;

  let bars = '';
  data.forEach((d, i) => {
    const gx = chartX + i * groupW + (groupW - barW * 2 - gap) / 2;
    const sH = Math.round((d.spcx / maxV) * chartH);
    const rH = Math.round((d.row / maxV) * chartH);
    bars += `<rect x="${gx}" y="${chartY + chartH - sH}" width="${barW}" height="${sH}" rx="6" fill="url(#barG)"/>`;
    bars += `<rect x="${gx + barW + gap}" y="${chartY + chartH - rH}" width="${barW}" height="${rH}" rx="6" fill="#374151"/>`;
    bars += `<text x="${gx + barW/2}" y="${chartY + chartH - sH - 8}" font-family="Arial Black,Arial,sans-serif" font-size="18" fill="#60A5FA" text-anchor="middle" font-weight="900">${d.spcx}</text>`;
    if (d.row > 0 && rH > 30) bars += `<text x="${gx + barW + gap + barW/2}" y="${chartY + chartH - rH - 8}" font-family="Arial,sans-serif" font-size="17" fill="#6B7280" text-anchor="middle">${d.row}</text>`;
    bars += `<text x="${gx + barW + gap/2}" y="${chartY + chartH + 28}" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="middle" font-weight="900">${d.yr}</text>`;
  });

  const hero = ko ? '4.3×' : '4.3×';
  const heroSub = ko ? '나머지 전 세계 합산 대비 (2025년)' : 'vs rest of world combined (2025)';
  const ctx = ko ? '2026.10.19 · 지구 저궤도 발사 질량' : '2026.10.19 · Mass to orbit';
  const spcxLabel = ko ? 'SpaceX (Falcon 9 / Heavy)' : 'SpaceX (Falcon 9 / Heavy)';
  const rowLabel = ko ? '나머지 전 세계 합산' : 'Rest of world combined';
  const k1 = ko ? 'SpaceX 2025' : 'SpaceX 2025';
  const k2 = ko ? '전 세계 534t' : 'Rest of world 534t';
  const msg = ko
    ? '지구 저궤도 화물의 80% 이상이 SpaceX — Falcon 9 / Heavy의 압도적 재사용 효율이 만든 구조적 해자'
    : 'SpaceX hauls 80%+ of all mass to LEO — Falcon 9/Heavy reusability is a structural moat';

  let s = base(c1, c2);
  s += badge(54, 'SPCX', c1);
  s += badge(180, ko ? '종목분석' : 'Analysis', '#1D4ED8');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="140" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="262" font-family="Arial,sans-serif" font-size="28" fill="#E6EDF3">${heroSub}</text>`;
  s += div(290);
  // Legend
  s += `<rect x="54" y="310" width="28" height="16" rx="4" fill="${c1}"/>`;
  s += `<text x="90" y="324" font-family="Arial,sans-serif" font-size="20" fill="#E6EDF3">${spcxLabel}</text>`;
  s += `<rect x="460" y="310" width="28" height="16" rx="4" fill="#374151"/>`;
  s += `<text x="496" y="324" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">${rowLabel}</text>`;
  // Source
  s += `<text x="54" y="350" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">Source: Jonathan McDowell, GCAT (planet4589.org)</text>`;
  // Bars
  s += bars;
  // X axis line
  s += `<line x1="54" y1="${chartY + chartH}" x2="1026" y2="${chartY + chartH}" stroke="#30363D" stroke-width="1.5"/>`;
  // Stat cards
  s += card(54, 1010, 466, 120, c1);
  s += `<text x="287" y="1060" font-family="Arial,sans-serif" font-size="20" fill="${c1}" text-anchor="middle">${k1}</text>`;
  s += `<text x="287" y="1110" font-family="Arial Black,Arial,sans-serif" font-size="42" fill="#fff" text-anchor="middle" font-weight="900">2,308t</text>`;
  s += card(560, 1010, 466, 120, '#374151');
  s += `<text x="793" y="1060" font-family="Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="middle">${k2}</text>`;
  s += `<text x="793" y="1110" font-family="Arial Black,Arial,sans-serif" font-size="42" fill="#6B7280" text-anchor="middle" font-weight="900">534t</text>`;
  // Msg
  const msgLines = msg.match(/.{1,28}(?=\s|$)|\S+/g) || [msg];
  s += `<rect x="54" y="1160" width="972" height="${38 * msgLines.length + 40}" rx="16" fill="#0D1A2E" stroke="${c1}" stroke-width="1.5"/>`;
  msgLines.forEach((l, i) => {
    s += `<text x="84" y="${1160 + 38 + i * 36}" font-family="Arial,sans-serif" font-size="22" fill="#93C5FD">${l}</text>`;
  });
  s += footer('2026.10.19');
  return mkSvg(s);
}

// ─── 2. Starlink Mobile $65B + 항공철도 ────────────────────────────────────
function starlinkExpansion(lang) {
  const ko = lang === 'ko';
  const c1 = '#3B82F6', c2 = '#38BDF8';
  const data = [
    { yr: '2025', rev: 0.2 },
    { yr: '2026E', rev: 0.5 },
    { yr: '2027E', rev: 1.5 },
    { yr: '2028E', rev: 4 },
    { yr: '2029E', rev: 16 },
    { yr: '2030E', rev: 32 },
    { yr: '2031E', rev: 65 },
  ];
  const maxV = 70;
  const chartH = 320;
  const chartY = 470;
  const chartX = 54;
  const groupW = 972 / 7;
  const barW = 80;

  let bars = '';
  data.forEach((d, i) => {
    const bH = Math.max(4, Math.round((d.rev / maxV) * chartH));
    const bx = chartX + i * groupW + (groupW - barW) / 2;
    const color = i === 6 ? 'url(#barG)' : (i >= 4 ? '#1D4ED8' : '#374151');
    bars += `<rect x="${bx}" y="${chartY + chartH - bH}" width="${barW}" height="${bH}" rx="6" fill="${color}"/>`;
    const label = d.rev >= 1 ? `$${d.rev}B` : `$${(d.rev*1000).toFixed(0)}M`;
    if (bH > 20) bars += `<text x="${bx + barW/2}" y="${chartY + chartH - bH - 10}" font-family="Arial Black,Arial,sans-serif" font-size="${i === 6 ? 22 : 18}" fill="${i >= 4 ? '#60A5FA' : '#6B7280'}" text-anchor="middle" font-weight="900">${label}</text>`;
    bars += `<text x="${bx + barW/2}" y="${chartY + chartH + 30}" font-family="Arial,sans-serif" font-size="${d.yr.length > 4 ? 16 : 18}" fill="#6B7280" text-anchor="middle">${d.yr}</text>`;
  });

  const hero = '$65B';
  const heroSub = ko ? '2031년 Starlink Mobile 예상 매출 (Bloomberg)' : 'Starlink Mobile 2031E revenue (Bloomberg)';
  const ctx = ko ? '2026.10.19 · Starlink 모빌 확장' : '2026.10.19 · Starlink Mobile expansion';

  const points = ko ? [
    '🛤  Virgin, 파리↔브뤼셀↔암스테르담 고속열차 Starlink 탑재',
    '✈  Delta 고객, Starlink 탑재 United·Southwest로 이탈 가속',
    '📡  Starlink Mobile: 2031E 전체 TAM 의 약 10% 점유 전망',
  ] : [
    '🛤  Virgin high-speed trains (Paris↔Brussels↔Amsterdam) get Starlink',
    '✈  Delta customers switching to United/Southwest for Starlink WiFi',
    '📡  Starlink Mobile projected ~10% of global TAM by 2031E',
  ];

  let s = base(c1, c2);
  s += badge(54, 'SPCX', c1);
  s += badge(180, ko ? '종목분석' : 'Analysis', '#0369A1');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="120" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="270" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">${heroSub}</text>`;
  s += div(300);
  s += bars;
  s += `<line x1="54" y1="${chartY + chartH}" x2="1026" y2="${chartY + chartH}" stroke="#30363D" stroke-width="1.5"/>`;
  // Points
  points.forEach((p, i) => {
    const y = 850 + i * 58;
    s += card(54, y - 10, 972, 50, '#1D4ED8');
    s += `<text x="84" y="${y + 24}" font-family="Arial,sans-serif" font-size="22" fill="#BAE6FD">${p}</text>`;
  });
  const msg = ko
    ? 'Starlink은 이미 항공·철도·해양 와이파이 시장을 재편 중 — B2B 구독 매출이 소비자 분야를 압도할 것'
    : 'Starlink is already reshaping aviation, rail, and maritime WiFi — B2B subscription revenue will dwarf consumer';
  s += `<rect x="54" y="1032" width="972" height="88" rx="16" fill="#0D1A2E" stroke="${c1}" stroke-width="1.5"/>`;
  s += `<text x="84" y="1068" font-family="Arial,sans-serif" font-size="22" fill="#93C5FD">${ko ? msg.slice(0, 30) : msg.slice(0, 40)}</text>`;
  s += `<text x="84" y="1103" font-family="Arial,sans-serif" font-size="22" fill="#93C5FD">${ko ? msg.slice(30) : msg.slice(40)}</text>`;
  s += footer('2026.10.19');
  return mkSvg(s);
}

// ─── 3. TSLA-SPCX 합병 시그널 ────────────────────────────────────────────────
function mergerSignals(lang) {
  const ko = lang === 'ko';
  const c1 = '#EF4444', c2 = '#F59E0B';

  const signals = ko ? [
    { icon: '🔗', title: 'SpaceX 임원 → Tesla 수석 디자이너 팔로우', sub: '@michaelnicollsx → @woodhaus2 (Franz von Holzhausen)' },
    { icon: '🏦', title: 'Citi Research: TSLA, SPCX에 인수 가능성 언급', sub: '월가 주요 투자은행 처음으로 공식 리서치에 인수 시나리오 포함' },
    { icon: '🏢', title: 'Tesla+SpaceX 직원 공동 근무 확인', sub: '중간·상위 프로젝트에서 직원 공동 배치 — Terafab $16.8B 연계' },
    { icon: '👥', title: 'SPCX 임원들 Tesla 임원 계정 팔로우 시작', sub: 'SawyerMerritt 집계 — 짧은 기간 내 복수 임원 동시 팔로우' },
  ] : [
    { icon: '🔗', title: 'SpaceX exec follows Tesla Chief Designer', sub: '@michaelnicollsx → @woodhaus2 (Franz von Holzhausen)' },
    { icon: '🏦', title: 'Citi Research mentions TSLA acquisition scenario', sub: 'First major Wall Street bank to include acquisition scenario in official research' },
    { icon: '🏢', title: 'Tesla+SpaceX staff co-located confirmed', sub: 'Staff working in same buildings on joint projects — tied to Terafab $16.8B' },
    { icon: '👥', title: 'SPCX execs start following Tesla execs', sub: 'SawyerMerritt tracked multiple simultaneous follows in short period' },
  ];

  const hero = ko ? '합병 시그널' : 'Merger Signals';
  const heroSub = ko ? '12월 6일 AGM 이전 발표 가능성' : 'Announcement possible before Dec 6 AGM';
  const ctx = ko ? '2026.10.19 · TSLA + SPCX · BREAKING' : '2026.10.19 · TSLA + SPCX · BREAKING';

  let s = base(c1, c2);
  s += badge(54, 'TSLA', c1);
  s += badge(168, 'SPCX', '#3B82F6');
  s += badge(290, 'BREAKING', '#7C3AED');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="88" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="262" font-family="Arial,sans-serif" font-size="26" fill="#FCA5A5">${heroSub}</text>`;
  s += div(292);
  signals.forEach((sg, i) => {
    const y = 330 + i * 180;
    s += card(54, y, 972, 160, i % 2 === 0 ? '#EF4444' : '#F59E0B');
    s += `<text x="96" y="${y + 52}" font-family="Arial,sans-serif" font-size="34">${sg.icon}</text>`;
    // title wrap at ~36 chars
    const titleLines = [];
    let cur = '';
    for (const w of sg.title.split(' ')) {
      if ((cur + ' ' + w).trim().length > 28) { titleLines.push(cur.trim()); cur = w; }
      else cur = (cur + ' ' + w).trim();
    }
    if (cur) titleLines.push(cur);
    titleLines.forEach((l, li) => {
      s += `<text x="148" y="${y + 44 + li * 34}" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" font-weight="900">${l}</text>`;
    });
    s += `<text x="148" y="${y + 44 + titleLines.length * 34 + 10}" font-family="Arial,sans-serif" font-size="20" fill="#D1D5DB">${sg.sub.length > 38 ? sg.sub.slice(0, 38) + '…' : sg.sub}</text>`;
  });
  const msg = ko
    ? 'Barclays: 12월 6일 AGM 이전 발표 → 합산 $3.5T · 올스톡 구조 · 머스크 37% 지분 유지'
    : 'Barclays: announcement before Dec 6 AGM → combined $3.5T · all-stock · Musk retains 37% stake';
  s += `<rect x="54" y="1056" width="972" height="88" rx="16" fill="#1A0E0E" stroke="#EF4444" stroke-width="1.5"/>`;
  s += `<text x="84" y="1090" font-family="Arial,sans-serif" font-size="21" fill="#FCA5A5">${ko ? msg.slice(0, 28) : msg.slice(0, 38)}</text>`;
  s += `<text x="84" y="1124" font-family="Arial,sans-serif" font-size="21" fill="#FCA5A5">${ko ? msg.slice(28) : msg.slice(38)}</text>`;
  s += footer('2026.10.19');
  return mkSvg(s);
}

// ─── 4. 로보택시 800대 돌파 ────────────────────────────────────────────────
function robotaxi800(lang) {
  const ko = lang === 'ko';
  const c1 = '#EF4444', c2 = '#FB923C';

  const hero = '800+';
  const heroSub = ko ? '텍사스 상업 로보택시 플릿 (2026.10.17)' : 'Texas commercial robotaxi fleet (Oct 17, 2026)';
  const ctx = ko ? '2026.10.19 · 텍사스 로보택시 플릿' : '2026.10.19 · Texas robotaxi fleet';

  // Fleet bar
  const modelY = 454, cybercab = 346, total = 800;

  // Monthly growth bars (simplified — daily sightings trend)
  const sightings = [
    { label: 'Sep', val: 350 },
    { label: 'Oct 1', val: 880 },
    { label: 'Oct 10', val: 750 },
    { label: 'Oct 17', val: 1150 },
  ];

  const chartH = 240, chartY = 680, chartX = 54, chartW = 972;
  const bw = 160, bgap = (chartW - 4 * bw) / 5;
  let bars = '';
  sightings.forEach((d, i) => {
    const bH = Math.round((d.val / 1200) * chartH);
    const bx = chartX + bgap + i * (bw + bgap);
    const color = i === 3 ? 'url(#barG)' : (i === 1 ? '#7F1D1D' : '#374151');
    bars += `<rect x="${bx}" y="${chartY + chartH - bH}" width="${bw}" height="${bH}" rx="8" fill="${color}"/>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH - bH - 12}" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="${i === 3 ? '#FCA5A5' : '#8B949E'}" text-anchor="middle" font-weight="900">${d.val.toLocaleString()}</text>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH + 32}" font-family="Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="middle">${d.label}</text>`;
  });

  let s = base(c1, c2);
  s += badge(54, 'TSLA', c1);
  s += badge(168, ko ? '종목분석' : 'Analysis', '#991B1B');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="140" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="262" font-family="Arial,sans-serif" font-size="26" fill="#FCA5A5">${heroSub}</text>`;
  s += div(292);
  // Fleet breakdown
  s += `<text x="54" y="340" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#F87171" font-weight="900">${ko ? '차종 구성' : 'Fleet breakdown'}</text>`;
  // Model Y bar
  s += `<text x="54" y="378" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Model Y</text>`;
  s += `<rect x="240" y="354" width="560" height="32" rx="6" fill="#1F2937"/>`;
  s += `<rect x="240" y="354" width="${Math.round(560 * modelY/total)}" height="32" rx="6" fill="#374151"/>`;
  s += `<text x="${240 + Math.round(560 * modelY/total) + 10}" y="376" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#9CA3AF" font-weight="900">454대</text>`;
  // Cybercab bar
  s += `<text x="54" y="418" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Cybercab</text>`;
  s += `<rect x="240" y="394" width="560" height="32" rx="6" fill="#1F2937"/>`;
  s += `<rect x="240" y="394" width="${Math.round(560 * cybercab/total)}" height="32" rx="6" fill="url(#barG)"/>`;
  s += `<text x="${240 + Math.round(560 * cybercab/total) + 10}" y="416" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FCA5A5" font-weight="900">346대</text>`;
  // Drivewise stat
  s += card(840, 354, 186, 80, c1);
  s += `<text x="933" y="388" font-family="Arial,sans-serif" font-size="19" fill="#F87171" text-anchor="middle">${ko ? 'Drivewise' : 'Drivewise'}</text>`;
  s += `<text x="933" y="420" font-family="Arial Black,Arial,sans-serif" font-size="30" fill="#fff" text-anchor="middle" font-weight="900">87%</text>`;
  // Sub text
  s += `<text x="54" y="464" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${ko ? 'Drivewise 87% = 3일 연속 신기록 (직전 65%)' : 'Drivewise 87% = 3rd straight record (prev 65%)'}</text>`;
  // Chart label
  s += `<text x="54" y="510" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#F87171" font-weight="900">${ko ? '일별 목격 건수 추이' : 'Daily sighting trend'}</text>`;
  s += `<text x="54" y="540" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${ko ? '(무인 + 유인 합산 목격 건수)' : '(driverless + supervised sightings)'}</text>`;
  s += bars;
  s += `<line x1="54" y1="${chartY + chartH}" x2="1026" y2="${chartY + chartH}" stroke="#30363D" stroke-width="1.5"/>`;
  // Msg
  const msg = ko
    ? '오스틴 무인 주행 목격이 Oct 17 기준 1,150건/일 — 3주 전(300건) 대비 4배 폭증'
    : 'Austin driverless sightings hit 1,150/day on Oct 17 — 4x vs 3 weeks ago (300/day)';
  s += `<rect x="54" y="978" width="972" height="88" rx="16" fill="#1A0808" stroke="${c1}" stroke-width="1.5"/>`;
  s += `<text x="84" y="1012" font-family="Arial,sans-serif" font-size="22" fill="#FCA5A5">${ko ? msg.slice(0, 26) : msg.slice(0, 38)}</text>`;
  s += `<text x="84" y="1048" font-family="Arial,sans-serif" font-size="22" fill="#FCA5A5">${ko ? msg.slice(26) : msg.slice(38)}</text>`;
  s += footer('2026.10.19');
  return mkSvg(s);
}

// ─── 5. NASA 아르테미스 IAC 2026 ────────────────────────────────────────────
function nasaArtemis(lang) {
  const ko = lang === 'ko';
  const c1 = '#3B82F6', c2 = '#A78BFA';

  const missions = ko ? [
    { name: 'Artemis III', date: '2027년', color: '#60A5FA', desc: 'Orion + 양쪽 착륙선 지구 궤도 시험', sub: 'Starship HLS + Blue Moon 동시 투입' },
    { name: 'Artemis IV', date: '2028년 초', color: '#A78BFA', desc: '1972년 이후 첫 유인 달 착륙', sub: '착륙선 선택 TBD (Starship vs Blue Moon)' },
    { name: 'Artemis V',  date: '2028년 말', color: '#34D399', desc: '두 번째 유인 달 착륙', sub: '화물 착륙선(Cargo Lander) 병행 운용' },
  ] : [
    { name: 'Artemis III', date: '2027', color: '#60A5FA', desc: 'Test Orion with both landers in Earth orbit', sub: 'Starship HLS + Blue Moon simultaneously' },
    { name: 'Artemis IV', date: 'Early 2028', color: '#A78BFA', desc: 'First crewed lunar landing since 1972', sub: 'Lander choice TBD (Starship vs Blue Moon)' },
    { name: 'Artemis V',  date: 'Late 2028', color: '#34D399', desc: 'Second crewed lunar landing', sub: 'Cargo Lander deployed in parallel' },
  ];

  const milestones = ko ? [
    'Starship v3 비행 시험 + 대규모 극저온 추진제 이송 시험',
    'Blue Moon MK1 무인 달 착륙 데모',
    'SpaceX UCD(통합 크루 데모) 1호 비행 Q4 2027',
  ] : [
    'Starship v3 flight tests + large-scale cryogenic propellant transfer',
    'Blue Moon MK1 uncrewed lunar landing demo',
    'SpaceX UCD (Uncrewed Demo) Flight Q4 2027',
  ];

  const hero = ko ? 'IAC 2026' : 'IAC 2026';
  const heroSub = ko ? 'NASA 아르테미스·HLS 공식 로드맵 업데이트' : 'NASA Artemis·HLS official roadmap update';
  const ctx = ko ? '2026.10.19 · NASA 우주 프로그램' : '2026.10.19 · NASA Space Program';

  let s = base(c1, c2);
  s += badge(54, 'SPCX', c1);
  s += badge(180, ko ? '섹터' : 'Sector', '#6D28D9');
  s += badge(300, 'NASA', '#1F2937');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="250" font-family="Arial,sans-serif" font-size="26" fill="#C4B5FD">${heroSub}</text>`;
  s += div(278);
  // Mission cards
  missions.forEach((m, i) => {
    const y = 306 + i * 220;
    s += `<rect x="54" y="${y}" width="972" height="200" rx="16" fill="#161B22" stroke="${m.color}" stroke-width="2"/>`;
    s += `<text x="84" y="${y + 52}" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="${m.color}" font-weight="900">${m.name}</text>`;
    s += `<rect x="480" y="${y + 24}" width="180" height="40" rx="8" fill="${m.color}22" stroke="${m.color}" stroke-width="1"/>`;
    s += `<text x="570" y="${y + 50}" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="${m.color}" text-anchor="middle" font-weight="900">${m.date}</text>`;
    s += `<text x="84" y="${y + 108}" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">${m.desc}</text>`;
    s += `<text x="84" y="${y + 148}" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${m.sub}</text>`;
    if (i < 2) s += `<line x1="54" y1="${y + 200}" x2="1026" y2="${y + 200}" stroke="#21262D" stroke-width="1"/>`;
  });
  // Milestones
  s += `<text x="54" y="978" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#8B949E" font-weight="900">${ko ? 'HLS 주요 마일스톤' : 'Key HLS Milestones'}</text>`;
  milestones.forEach((m, i) => {
    s += `<circle cx="72" cy="${1006 + i * 44}" r="6" fill="${c1}"/>`;
    s += `<text x="92" y="${1013 + i * 44}" font-family="Arial,sans-serif" font-size="20" fill="#C4B5FD">${m}</text>`;
  });
  s += footer('2026.10.19');
  return mkSvg(s);
}

// ─── 6. Fear & Greed 18 ────────────────────────────────────────────────────
function fearGreed(lang) {
  const ko = lang === 'ko';
  const c1 = '#F59E0B', c2 = '#EF4444';

  const hero = '18';
  const heroSub = ko ? '극단적 공포 (Extreme Fear) — Oct 16' : 'Extreme Fear — Oct 16, 2026';
  const ctx = ko ? '2026.10.19 · CNN Fear &amp; Greed Index' : '2026.10.19 · CNN Fear &amp; Greed Index';

  const hist = ko ? [
    { label: '현재', val: 18, color: '#EF4444', mood: '극단적 공포' },
    { label: '직전 마감', val: 31, color: '#F59E0B', mood: '공포' },
    { label: '1주일 전', val: 46, color: '#EAB308', mood: '중립' },
    { label: '1개월 전', val: 27, color: '#F59E0B', mood: '공포' },
    { label: '1년 전', val: 23, color: '#EF4444', mood: '극단적 공포' },
  ] : [
    { label: 'Now', val: 18, color: '#EF4444', mood: 'Extreme Fear' },
    { label: 'Prev close', val: 31, color: '#F59E0B', mood: 'Fear' },
    { label: '1 week ago', val: 46, color: '#EAB308', mood: 'Neutral' },
    { label: '1 month ago', val: 27, color: '#F59E0B', mood: 'Fear' },
    { label: '1 year ago', val: 23, color: '#EF4444', mood: 'Extreme Fear' },
  ];

  // Gauge arc (simplified as rectangle gauge)
  const gaugeY = 380;

  let s = base(c1, c2);
  s += badge(54, ko ? '시장분석' : 'Market', '#B45309');
  s += badge(ko ? 204 : 204, ko ? '공포탐욕지수' : 'Fear &amp; Greed', '#7F1D1D');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="240" font-family="Arial Black,Arial,sans-serif" font-size="180" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="290" font-family="Arial,sans-serif" font-size="28" fill="#FCA5A5">${heroSub}</text>`;
  s += div(318);

  // Gauge bar
  s += `<text x="54" y="368" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">0</text>`;
  s += `<text x="508" y="368" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">50</text>`;
  s += `<text x="1000" y="368" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="end">100</text>`;
  // Gradient gauge background
  s += `<defs><linearGradient id="gaugeG" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#EF4444"/>
    <stop offset="25%" stop-color="#F59E0B"/>
    <stop offset="50%" stop-color="#EAB308"/>
    <stop offset="75%" stop-color="#22C55E"/>
    <stop offset="100%" stop-color="#16A34A"/>
  </linearGradient></defs>`;
  s += `<rect x="54" y="376" width="972" height="36" rx="18" fill="url(#gaugeG)" opacity="0.4"/>`;
  s += `<rect x="54" y="376" width="${972 * 0.18}" height="36" rx="18" fill="#EF4444"/>`;
  // Needle
  const needleX = 54 + 972 * 0.18;
  s += `<polygon points="${needleX},370 ${needleX-10},418 ${needleX+10},418" fill="#fff"/>`;
  s += `<text x="${needleX}" y="450" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" text-anchor="middle" font-weight="900">18</text>`;

  // Labels
  s += `<text x="54" y="490" font-family="Arial,sans-serif" font-size="19" fill="#EF4444">${ko ? '극단적공포' : 'Extreme Fear'}</text>`;
  s += `<text x="420" y="490" font-family="Arial,sans-serif" font-size="19" fill="#EAB308" text-anchor="middle">${ko ? '중립' : 'Neutral'}</text>`;
  s += `<text x="1026" y="490" font-family="Arial,sans-serif" font-size="19" fill="#16A34A" text-anchor="end">${ko ? '극단적탐욕' : 'Extreme Greed'}</text>`;

  // History table
  hist.forEach((h, i) => {
    const hy = 530 + i * 86;
    s += card(54, hy, 972, 76, h.color);
    s += `<text x="84" y="${hy + 30}" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">${h.label}</text>`;
    s += `<text x="84" y="${hy + 62}" font-family="Arial,sans-serif" font-size="21" fill="#D1D5DB">${h.mood}</text>`;
    s += `<text x="1000" y="${hy + 48}" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="${h.color}" text-anchor="end" font-weight="900">${h.val}</text>`;
  });

  const msg = ko
    ? '지수 18은 2026년 3월 이후 최저 — 1주 만에 46(중립)에서 18(극단적 공포)로 급락'
    : 'Index 18 is the lowest since March 2026 — plunged from 46 (Neutral) to 18 (Extreme Fear) in one week';
  s += `<rect x="54" y="970" width="972" height="88" rx="16" fill="#1A0808" stroke="${c2}" stroke-width="1.5"/>`;
  s += `<text x="84" y="1004" font-family="Arial,sans-serif" font-size="21" fill="#FCA5A5">${ko ? msg.slice(0, 26) : msg.slice(0, 38)}</text>`;
  s += `<text x="84" y="1038" font-family="Arial,sans-serif" font-size="21" fill="#FCA5A5">${ko ? msg.slice(26) : msg.slice(38)}</text>`;
  s += footer('2026.10.19');
  return mkSvg(s);
}

// ─── 7. Jensen Huang NVDA 전 산업 컴퓨팅 ──────────────────────────────────
function nvdaJensen(lang) {
  const ko = lang === 'ko';
  const c1 = '#76C442', c2 = '#A3E635';

  const points = ko ? [
    { icon: '🖥', title: '물리적 AI는 NVDA 컴퓨팅 시스템 필요', sub: '모든 AI 플랫폼이 디지털·물리 2대의 컴퓨터를 요구' },
    { icon: '🤖', title: '로봇·AI 에이전트: 완전 스택 전 산업 구축', sub: '배포 전·배포 후 각 1대 — NVDA가 양쪽 공급' },
    { icon: '🌐', title: '전 산업에 걸쳐 AI 인프라 수요 확대', sub: '헬스케어·금융·제조·물류 — 섹터 무관하게 NVDA 수요' },
  ] : [
    { icon: '🖥', title: 'Physical AI requires NVDA computing systems', sub: 'Every AI platform needs two computers: digital + physical' },
    { icon: '🤖', title: 'Robots &amp; AI agents: full-stack across all industries', sub: 'One for training, one for inference — NVDA supplies both' },
    { icon: '🌐', title: 'AI infrastructure demand expanding across all sectors', sub: 'Healthcare, finance, manufacturing, logistics — sector-agnostic NVDA demand' },
  ];

  const hero = ko ? 'AI 전 산업' : 'Every Industry';
  const heroSub = ko ? 'Jensen Huang: NVDA가 완전 AI 컴퓨팅 스택 구축' : 'Jensen Huang: NVDA builds complete AI computing stacks';
  const ctx = ko ? '2026.10.19 · Ark Invest 트래커 인용' : '2026.10.19 · via Ark Invest Tracker';

  let s = base(c1, c2);
  s += badge(54, 'NVDA', c1);
  s += badge(168, ko ? '종목분석' : 'Analysis', '#3D7A1A');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="88" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="262" font-family="Arial,sans-serif" font-size="26" fill="#BEF264">${heroSub}</text>`;
  s += div(292);

  points.forEach((p, i) => {
    const y = 330 + i * 220;
    s += card(54, y, 972, 196, c1);
    s += `<text x="88" y="${y + 56}" font-family="Arial,sans-serif" font-size="40">${p.icon}</text>`;
    const titleWords = p.title.split(' ');
    let tl = '', tlines = [];
    for (const w of titleWords) {
      if ((tl + ' ' + w).trim().length > 30) { tlines.push(tl.trim()); tl = w; }
      else tl = (tl + ' ' + w).trim();
    }
    if (tl) tlines.push(tl);
    tlines.forEach((l, li) => {
      s += `<text x="150" y="${y + 46 + li * 36}" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#fff" font-weight="900">${l}</text>`;
    });
    s += `<text x="150" y="${y + 46 + tlines.length * 36 + 20}" font-family="Arial,sans-serif" font-size="21" fill="#9CA3AF">${p.sub.length > 42 ? p.sub.slice(0, 42) + '…' : p.sub}</text>`;
  });

  const msg = ko
    ? 'NVDA 주가 단기 하락은 노이즈 — 전 산업 AI 구축 총수요는 구조적 상승 중'
    : 'NVDA short-term dip is noise — total AI build-out demand across all industries is structurally rising';
  s += `<rect x="54" y="1008" width="972" height="88" rx="16" fill="#0D1A0D" stroke="${c1}" stroke-width="1.5"/>`;
  s += `<text x="84" y="1042" font-family="Arial,sans-serif" font-size="21" fill="#BEF264">${ko ? msg.slice(0, 26) : msg.slice(0, 42)}</text>`;
  s += `<text x="84" y="1076" font-family="Arial,sans-serif" font-size="21" fill="#BEF264">${ko ? msg.slice(26) : msg.slice(42)}</text>`;
  s += footer('2026.10.19');
  return mkSvg(s);
}

// ─── 8. Tesla FSD 노인 생활 혁신 ──────────────────────────────────────────
function tslafsdElderly(lang) {
  const ko = lang === 'ko';
  const c1 = '#34D399', c2 = '#6EE7B7';

  const quotes = ko ? [
    { age: '92세', q: '이웃에게 FSD 테스트 드라이브 시켜줬는데 다음 날 바로 Model Y를 구매했습니다.' },
    { age: '83세', q: '야간에 손주 행사 참석, 겨울 저녁 외식이 가능해졌습니다. FSD 98% 수준. 정말 혁명입니다.' },
    { age: '87세', q: '아버지가 Y로 거의 모든 곳을 다닙니다. FSD 없었으면 고속도로는 못 타셨을 거예요.' },
  ] : [
    { age: '92', q: '"I let my 92-yr-old neighbor test drive with FSD. They bought one the next day."' },
    { age: '83', q: '"My 83-yr-old dad drives at night to see grandkids and dine out. 98% FSD. Truly transformational."' },
    { age: '87', q: '"My dad uses FSD to get just about everywhere. He\'d never get on the highway without it."' },
  ];

  const hero = ko ? '87·83·92' : '87·83·92';
  const heroSub = ko ? '세 — FSD가 노인 이동 자유를 되돌렸습니다' : 'yr olds — FSD restored their mobility &amp; independence';
  const ctx = ko ? '2026.10.19 · Tesla FSD 사용자 사례' : '2026.10.19 · Tesla FSD user stories';

  let s = base(c1, c2);
  s += badge(54, 'TSLA', '#EF4444');
  s += badge(168, 'FSD', c1);
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="254" font-family="Arial,sans-serif" font-size="26" fill="#A7F3D0">${heroSub}</text>`;
  s += div(282);

  quotes.forEach((q, i) => {
    const y = 314 + i * 270;
    s += card(54, y, 972, 248, c1);
    s += `<rect x="54" y="${y}" width="120" height="248" rx="16" fill="${c1}22"/>`;
    s += `<text x="114" y="${y + 148}" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="${c1}" text-anchor="middle" font-weight="900">${q.age}</text>`;
    s += `<text x="114" y="${y + 188}" font-family="Arial,sans-serif" font-size="18" fill="#6EE7B7" text-anchor="middle">${ko ? '세' : 'yrs'}</text>`;
    // Quote wrap
    const maxQLen = 20;
    const words = q.q.split(' ');
    let ql = '', qlines = [];
    for (const w of words) {
      if ((ql + ' ' + w).trim().length > maxQLen) { qlines.push(ql.trim()); ql = w; }
      else ql = (ql + ' ' + w).trim();
    }
    if (ql) qlines.push(ql);
    qlines.forEach((l, li) => {
      s += `<text x="196" y="${y + 66 + li * 36}" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">${l}</text>`;
    });
  });

  const msg = ko
    ? 'FSD는 단순 자율주행이 아니라 이동 약자의 사회 참여를 확대하는 복지 기술로 자리잡고 있습니다'
    : 'FSD is not just autonomous driving — it\'s emerging as an accessibility technology restoring independence to mobility-limited users';
  s += `<rect x="54" y="1132" width="972" height="88" rx="16" fill="#0D1A14" stroke="${c1}" stroke-width="1.5"/>`;
  s += `<text x="84" y="1166" font-family="Arial,sans-serif" font-size="20" fill="#A7F3D0">${ko ? msg.slice(0, 28) : msg.slice(0, 42)}</text>`;
  s += `<text x="84" y="1200" font-family="Arial,sans-serif" font-size="20" fill="#A7F3D0">${ko ? msg.slice(28) : msg.slice(42)}</text>`;
  s += footer('2026.10.19');
  return mkSvg(s);
}

// ─── 9. Musk: Optimus·로봇 초거대 스케일 ───────────────────────────────────
function muskOptimus(lang) {
  const ko = lang === 'ko';
  const c1 = '#A78BFA', c2 = '#EC4899';

  const hero = ko ? 'X2 + 로봇' : 'X2 + Robots';
  const heroSub = ko ? '"초거대 규모로 성장할 것은 X2와 로봇뿐" — Elon Musk' : '"The only things that will scale to incredible size — X2 and Robotics" — Elon Musk';
  const ctx = ko ? '2026.10.19 · Musk X 발언' : '2026.10.19 · Musk on X';

  const items = ko ? [
    { label: 'X2 (Optimus)', val: '초거대 스케일', note: '목표 수십억 대 · 인간 노동력 대체' },
    { label: '로봇공학', val: '초거대 스케일', note: 'X2 이후 범용 로봇 생태계 확장' },
    { label: 'Cybercab', val: '2028년 라이브', note: '자율주행 택시 전국 배포 예정' },
    { label: '여타 비즈니스', val: '2차 수혜', note: '처음 두 가지 확보 시 나머지는 자동' },
  ] : [
    { label: 'X2 (Optimus)', val: 'Incredible scale', note: 'Target: billions of units · replaces human labor' },
    { label: 'Robotics', val: 'Incredible scale', note: 'General-purpose robot ecosystem after X2' },
    { label: 'Cybercab', val: 'Live in 2028', note: 'Nationwide autonomous taxi rollout planned' },
    { label: 'Other business', val: 'Second-order', note: '"If you have the first two, the rest will follow"' },
  ];

  let s = base(c1, c2);
  s += badge(54, 'TSLA', '#EF4444');
  s += badge(168, ko ? '종목분석' : 'Analysis', '#7C3AED');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="url(#hG)" font-weight="900">${hero}</text>`;
  // Sub wrap
  const subWords = heroSub.split(' ');
  let sl = '', slines = [];
  for (const w of subWords) {
    if ((sl + ' ' + w).trim().length > (ko ? 22 : 36)) { slines.push(sl.trim()); sl = w; }
    else sl = (sl + ' ' + w).trim();
  }
  if (sl) slines.push(sl);
  slines.forEach((l, i) => {
    s += `<text x="54" y="${246 + i * 32}" font-family="Arial,sans-serif" font-size="24" fill="#C4B5FD">${l}</text>`;
  });
  s += div(246 + slines.length * 32 + 16);

  items.forEach((it, i) => {
    const y = 350 + slines.length * 16 + i * 192;
    const col = i < 2 ? c1 : (i === 2 ? '#EC4899' : '#6B7280');
    s += card(54, y, 972, 170, col);
    s += `<text x="84" y="${y + 56}" font-family="Arial Black,Arial,sans-serif" font-size="36" fill="${col}" font-weight="900">${it.label}</text>`;
    s += `<rect x="620" y="${y + 24}" width="380" height="44" rx="8" fill="${col}22" stroke="${col}" stroke-width="1"/>`;
    s += `<text x="810" y="${y + 52}" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="${col}" text-anchor="middle" font-weight="900">${it.val}</text>`;
    s += `<text x="84" y="${y + 106}" font-family="Arial,sans-serif" font-size="22" fill="#D1D5DB">${it.note}</text>`;
  });

  s += footer('2026.10.19');
  return mkSvg(s);
}

// ─── 10. Anthropic AI 안전 법안 ───────────────────────────────────────────
function anthropicBill(lang) {
  const ko = lang === 'ko';
  const c1 = '#F59E0B', c2 = '#FBBF24';

  const hero = ko ? 'AI 안전법' : 'AI Safety Bill';
  const heroSub = ko ? 'Anthropic, 의회에 AI 안전 법안 초안 제출' : 'Anthropic pitches draft AI safety bill to Congress';
  const ctx = ko ? '2026.10.19 · 매크로 · AI 규제' : '2026.10.19 · Macro · AI Regulation';

  const pts = ko ? [
    '정부가 $1B+ 피해 유발 가능 AI 모델에 차단 권한 부여',
    '안전 기준 미달 AI 개발사 → 정부 직접 개발 차단 가능',
    'Anthropic 입장: 선제적 안전 규제가 장기 산업 신뢰 구축',
    '업계 반응: OpenAI·구글, 자율 규제 선호 vs. Anthropic 법제화 선호',
  ] : [
    'Government gains authority to block AI models capable of $1B+ damage',
    'AI developers failing safety standards face direct government blocks',
    "Anthropic's position: proactive safety regulation builds long-term trust",
    'Industry split: OpenAI/Google prefer self-regulation vs Anthropic backing legislation',
  ];

  let s = base(c1, c2);
  s += badge(54, ko ? '매크로' : 'Macro', '#92400E');
  s += badge(ko ? 204 : 204, 'AI', '#B45309');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="262" font-family="Arial,sans-serif" font-size="26" fill="#FDE68A">${heroSub}</text>`;
  s += div(290);

  pts.forEach((p, i) => {
    const y = 326 + i * 120;
    s += card(54, y, 972, 100, c1);
    const pwords = p.split(' ');
    let pl = '', plines = [];
    for (const w of pwords) {
      if ((pl + ' ' + w).trim().length > (ko ? 24 : 42)) { plines.push(pl.trim()); pl = w; }
      else pl = (pl + ' ' + w).trim();
    }
    if (pl) plines.push(pl);
    plines.forEach((l, li) => {
      s += `<text x="84" y="${y + 38 + li * 34}" font-family="Arial,sans-serif" font-size="${ko ? 24 : 22}" fill="#FDE68A">${l}</text>`;
    });
  });

  const msg = ko
    ? 'AI 안전 법제화는 Anthropic·Claude에 유리한 구도 — 안전 우선 개발사가 규제 수혜 기업으로'
    : 'AI safety legislation favors Anthropic — safety-first developers become the regulated-standard setters';
  s += `<rect x="54" y="820" width="972" height="88" rx="16" fill="#1A1000" stroke="${c1}" stroke-width="1.5"/>`;
  s += `<text x="84" y="854" font-family="Arial,sans-serif" font-size="21" fill="#FDE68A">${ko ? msg.slice(0, 26) : msg.slice(0, 44)}</text>`;
  s += `<text x="84" y="888" font-family="Arial,sans-serif" font-size="21" fill="#FDE68A">${ko ? msg.slice(26) : msg.slice(44)}</text>`;
  s += footer('2026.10.19');
  return mkSvg(s);
}

// ─── 11. BlackRock 텍사스 데이터센터 ──────────────────────────────────────
function blackrockDC(lang) {
  const ko = lang === 'ko';
  const c1 = '#3B82F6', c2 = '#6366F1';

  const hero = ko ? 'BlackRock' : 'BlackRock';
  const heroSub = ko ? '텍사스 AI 데이터센터 오픈 — AI 인프라 투자 가속' : 'Opens Texas AI data center — AI infra investment accelerates';
  const ctx = ko ? '2026.10.19 · 매크로 · AI 인프라' : '2026.10.19 · Macro · AI Infrastructure';

  const pts = ko ? [
    '세계 최대 자산운용사($10T+ AUM) BlackRock, 텍사스 데이터센터 개설',
    'AI 연산 인프라 직접 구축 → 금융사의 AI 내재화 신호',
    'JP모건·BlackRock 등 월가 주요사 AI 인프라 투자 경쟁',
    'NVDA·AMD·EQIX 등 데이터센터 인프라 수요 기반 확충',
  ] : [
    "World's largest asset manager ($10T+ AUM) opens Texas data center",
    'Direct AI compute infrastructure build — signal of financial firms internalizing AI',
    'Wall Street majors (JPMorgan, BlackRock) in AI infrastructure spending race',
    'Expands demand base for NVDA, AMD, EQIX data center infrastructure',
  ];

  let s = base(c1, c2);
  s += badge(54, ko ? '매크로' : 'Macro', '#1D4ED8');
  s += badge(ko ? 204 : 204, ko ? 'AI인프라' : 'AI Infra', '#4338CA');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="88" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="262" font-family="Arial,sans-serif" font-size="26" fill="#BAE6FD">${heroSub}</text>`;
  s += div(290);

  pts.forEach((p, i) => {
    const y = 326 + i * 120;
    s += card(54, y, 972, 100, i % 2 === 0 ? c1 : '#6366F1');
    const pwords = p.split(' ');
    let pl = '', plines = [];
    for (const w of pwords) {
      if ((pl + ' ' + w).trim().length > (ko ? 24 : 44)) { plines.push(pl.trim()); pl = w; }
      else pl = (pl + ' ' + w).trim();
    }
    if (pl) plines.push(pl);
    plines.forEach((l, li) => {
      s += `<text x="84" y="${y + 38 + li * 34}" font-family="Arial,sans-serif" font-size="${ko ? 24 : 22}" fill="#BAE6FD">${l}</text>`;
    });
  });

  const msg = ko
    ? 'AI 인프라는 이제 빅테크만의 영역이 아님 — 금융·보험·물류 전 산업이 직접 AI 컴퓨팅을 내재화하는 흐름'
    : 'AI infrastructure is no longer just Big Tech — finance, insurance, and logistics are all internalizing AI compute directly';
  s += `<rect x="54" y="822" width="972" height="88" rx="16" fill="#0D1220" stroke="${c1}" stroke-width="1.5"/>`;
  s += `<text x="84" y="856" font-family="Arial,sans-serif" font-size="20" fill="#BAE6FD">${ko ? msg.slice(0, 26) : msg.slice(0, 44)}</text>`;
  s += `<text x="84" y="890" font-family="Arial,sans-serif" font-size="20" fill="#BAE6FD">${ko ? msg.slice(26) : msg.slice(44)}</text>`;
  s += footer('2026.10.19');
  return mkSvg(s);
}

// ─── 12. 한장요약 2026-10-19 ───────────────────────────────────────────────
function summary20261019(lang) {
  const ko = lang === 'ko';
  const c1 = '#A78BFA', c2 = '#EC4899';

  const topics = ko ? [
    { n: '01', text: 'TSLA-SPCX 합병 시그널 폭증 — SpaceX 임원이 Tesla 수석 디자이너 팔로우, Citi Research 인수 시나리오' },
    { n: '02', text: 'SpaceX 2025 발사 질량 4.3배 — 2,308t, 나머지 전 세계 534t 합산 압도' },
    { n: '03', text: 'Starlink Mobile Bloomberg 2031년 $65B 전망 — Delta 고객 이탈, Virgin 고속열차 탑재' },
    { n: '04', text: '텍사스 로보택시 800대 돌파 — Cybercab 346 + Model Y 454, Drivewise 87% 신기록' },
    { n: '05', text: 'NASA IAC 2026 — Artemis III 2027 · IV 2028 초반 첫 유인 달 착륙 · V 2028 말' },
    { n: '06', text: '공포탐욕 지수 18 (극단적 공포) — 1주 만에 46(중립)→18로 급락, 2026년 최저' },
    { n: '07', text: 'Jensen Huang: NVDA가 전 산업 AI 컴퓨팅 시스템 완전 구축 책임진다' },
    { n: '08', text: 'Tesla FSD 87·83·92세 노인 사용자들 — 이동 자유 회복 사례 집중 공유' },
    { n: '09', text: 'Musk: "초거대 규모로 성장할 것은 X2(Optimus)와 로봇뿐" · Cybercab 2028 확인' },
    { n: '10', text: 'Anthropic AI 안전 법안 초안 — 정부 $1B+ 피해 모델 차단 권한' },
    { n: '11', text: 'BlackRock 텍사스 AI 데이터센터 오픈 — 금융사 AI 인프라 내재화 신호' },
  ] : [
    { n: '01', text: 'TSLA-SPCX merger signals surge — SpaceX exec follows Tesla Chief Designer, Citi Research adds acquisition scenario' },
    { n: '02', text: 'SpaceX 2025 launch mass 4.3x — 2,308t vs 534t for rest of world combined' },
    { n: '03', text: 'Starlink Mobile Bloomberg $65B by 2031E — Delta customer exodus, Virgin train deal' },
    { n: '04', text: 'Texas robotaxi fleet crosses 800 — Cybercab 346 + Model Y 454, Drivewise 87% record' },
    { n: '05', text: 'NASA IAC 2026 — Artemis III 2027 · IV early 2028 first crewed moon landing · V late 2028' },
    { n: '06', text: 'Fear &amp; Greed Index 18 (Extreme Fear) — crashed from 46 (Neutral) in one week' },
    { n: '07', text: 'Jensen Huang: NVDA to build complete AI computing stacks across every industry' },
    { n: '08', text: 'Tesla FSD 87·83·92-yr-old users — stories of restored mobility going viral' },
    { n: '09', text: 'Musk: "Only X2 (Optimus) &amp; Robotics will scale to incredible size" · Cybercab 2028 confirmed' },
    { n: '10', text: 'Anthropic AI safety bill draft — government gains $1B+ damage model block authority' },
    { n: '11', text: 'BlackRock opens Texas AI data center — Wall Street internalizing AI compute directly' },
  ];

  const count = topics.length;
  const title = ko ? `2026년 10월 19일 한장 요약` : `Oct 19, 2026 · Daily Snapshot`;
  const sub = ko ? `오늘의 ${count}개 주요 토픽` : `Today's ${count} key topics`;

  let s = base(c1, c2);
  s += badge(54, ko ? '특집' : 'Feature', '#7C3AED');
  s += badge(ko ? 180 : 196, ko ? '한장요약' : 'Snapshot', '#BE185D');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.19</text>`;
  s += `<text x="54" y="186" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">${title}</text>`;
  s += `<text x="54" y="234" font-family="Arial,sans-serif" font-size="26" fill="#C4B5FD">${sub}</text>`;
  s += div(258);

  // 2줄 wrap: 1080px 폭 안에서 완결된 문장 2줄로 표시 (말줄임 금지)
  topics.forEach((t, i) => {
    const y = 278 + i * 92;
    const isOdd = i % 2;
    const accent = i < 3 ? '#7C3AED' : (i < 6 ? '#1D4ED8' : (i < 9 ? '#991B1B' : '#B45309'));
    const accentT = i < 3 ? '#A78BFA' : (i < 6 ? '#60A5FA' : (i < 9 ? '#F87171' : '#FCD34D'));
    s += `<rect x="54" y="${y}" width="972" height="82" rx="10" fill="${isOdd ? '#161B22' : '#0D1117'}" stroke="#21262D" stroke-width="1"/>`;
    s += `<rect x="54" y="${y}" width="66" height="82" rx="10" fill="${accent}22"/>`;
    s += `<text x="87" y="${y + 50}" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="${accentT}" text-anchor="middle" font-weight="900">${t.n}</text>`;
    // 2줄 wrap: 첫줄 maxCh, 나머지 2줄째
    const maxCh1 = ko ? 22 : 38;
    const line1 = t.text.slice(0, maxCh1);
    const line2 = t.text.slice(maxCh1, maxCh1 + (ko ? 26 : 44));
    s += `<text x="136" y="${y + 35}" font-family="Arial Black,Arial,sans-serif" font-size="${ko ? 21 : 18}" fill="#fff" font-weight="900">${line1}</text>`;
    s += `<text x="136" y="${y + 62}" font-family="Arial,sans-serif" font-size="${ko ? 18 : 16}" fill="#9CA3AF">${line2}</text>`;
  });

  s += footer('2026.10.19');
  return mkSvg(s);
}

// ─── MAIN ──────────────────────────────────────────────────────────────────
async function main() {
  const charts = [
    ['spcx-mass-delivery-20261019',        spcxMassDelivery('ko')],
    ['spcx-mass-delivery-20261019-en',     spcxMassDelivery('en')],
    ['spcx-starlink-65b-20261019',         starlinkExpansion('ko')],
    ['spcx-starlink-65b-20261019-en',      starlinkExpansion('en')],
    ['tsla-spcx-merger-signals-20261019',  mergerSignals('ko')],
    ['tsla-spcx-merger-signals-20261019-en', mergerSignals('en')],
    ['tsla-robotaxi-800-20261019',         robotaxi800('ko')],
    ['tsla-robotaxi-800-20261019-en',      robotaxi800('en')],
    ['nasa-artemis-hls-20261019',          nasaArtemis('ko')],
    ['nasa-artemis-hls-20261019-en',       nasaArtemis('en')],
    ['macro-fear-greed-18-20261019',       fearGreed('ko')],
    ['macro-fear-greed-18-20261019-en',    fearGreed('en')],
    ['nvda-jensen-computing-20261019',     nvdaJensen('ko')],
    ['nvda-jensen-computing-20261019-en',  nvdaJensen('en')],
    ['tsla-fsd-elderly-20261019',          tslafsdElderly('ko')],
    ['tsla-fsd-elderly-20261019-en',       tslafsdElderly('en')],
    ['tsla-musk-optimus-20261019',         muskOptimus('ko')],
    ['tsla-musk-optimus-20261019-en',      muskOptimus('en')],
    ['macro-anthropic-ai-bill-20261019',   anthropicBill('ko')],
    ['macro-anthropic-ai-bill-20261019-en', anthropicBill('en')],
    ['macro-blackrock-dc-20261019',        blackrockDC('ko')],
    ['macro-blackrock-dc-20261019-en',     blackrockDC('en')],
    ['summary-20261019',                   summary20261019('ko')],
    ['summary-20261019-en',                summary20261019('en')],
  ];
  for (const [slug, svg] of charts) await save(slug, svg);
  console.log(`\n✅ ${charts.length} charts generated`);
}
main().catch(console.error);
