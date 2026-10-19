#!/usr/bin/env node
// 2026-10-20 개별 토픽 카드 + 요약 (KO + EN)
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

function wrapText(text, maxChars, isKo) {
  // For Korean wrap at character count, for English wrap at space
  const lines = [];
  if (isKo) {
    for (let i = 0; i < text.length; i += maxChars) {
      lines.push(text.slice(i, i + maxChars));
    }
  } else {
    const words = text.split(' ');
    let cur = '';
    for (const w of words) {
      if ((cur + ' ' + w).trim().length > maxChars) { lines.push(cur.trim()); cur = w; }
      else cur = (cur + ' ' + w).trim();
    }
    if (cur.trim()) lines.push(cur.trim());
  }
  return lines;
}

// ─── 1. SPCX Q3 첫 흑자 ───────────────────────────────────────────────────────
function spcxQ3Earnings(lang) {
  const ko = lang === 'ko';
  const c1 = '#10B981', c2 = '#34D399';

  // Revenue bars (quarterly 2025-2026)
  const data = [
    { q: ko ? 'Q1\'25' : 'Q1\'25', rev: 9.8,  eps: -0.18 },
    { q: ko ? 'Q2\'25' : 'Q2\'25', rev: 10.5, eps: -0.12 },
    { q: ko ? 'Q3\'25' : 'Q3\'25', rev: 11.2, eps: -0.09 },
    { q: ko ? 'Q4\'25' : 'Q4\'25', rev: 11.8, eps: -0.05 },
    { q: ko ? 'Q1\'26' : 'Q1\'26', rev: 12.1, eps: -0.02 },
    { q: ko ? 'Q2\'26' : 'Q2\'26', rev: 12.5, eps: 0.04  },
    { q: ko ? 'Q3\'26' : 'Q3\'26', rev: 13.0, eps: 0.16  },
  ];
  const maxRev = 14;
  const chartH = 300, chartY = 560, chartX = 54, chartW = 972;
  const bw = 90, bGap = (chartW - data.length * bw) / (data.length + 1);

  let bars = '';
  data.forEach((d, i) => {
    const bH = Math.round((d.rev / maxRev) * chartH);
    const bx = chartX + bGap + i * (bw + bGap);
    const isLast = i === data.length - 1;
    const color = isLast ? 'url(#barG)' : (d.eps >= 0 ? '#047857' : '#374151');
    bars += `<rect x="${bx}" y="${chartY + chartH - bH}" width="${bw}" height="${bH}" rx="6" fill="${color}"/>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH - bH - 10}" font-family="Arial Black,Arial,sans-serif" font-size="${isLast ? 22 : 18}" fill="${isLast ? '#34D399' : '#6B7280'}" text-anchor="middle" font-weight="900">$${d.rev}B</text>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH + 28}" font-family="Arial,sans-serif" font-size="18" fill="${isLast ? '#D1FAE5' : '#6B7280'}" text-anchor="middle">${d.q}</text>`;
    const epsColor = d.eps >= 0 ? '#34D399' : '#EF4444';
    const epsLabel = d.eps >= 0 ? `+$${d.eps.toFixed(2)}` : `$${d.eps.toFixed(2)}`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH + 52}" font-family="Arial,sans-serif" font-size="16" fill="${epsColor}" text-anchor="middle">${epsLabel}</text>`;
  });

  const hero = ko ? '첫 흑자' : '1st Profit';
  const heroSub = ko ? 'SpaceX Q3 2026 · adj. EPS $0.16 (vs $0.14E)' : 'SpaceX Q3 2026 · adj. EPS $0.16 (beat $0.14E)';
  const ctx = ko ? '2026.10.20 · SPCX Q3 어닝' : '2026.10.20 · SPCX Q3 Earnings';

  let s = base(c1, c2);
  s += badge(54, 'SPCX', c1);
  s += badge(170, ko ? '어닝' : 'Earnings', '#047857');
  s += badge(ko ? 270 : 308, ko ? '첫 흑자 달성' : 'FIRST PROFIT', '#7C3AED');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="120" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="252" font-family="Arial,sans-serif" font-size="26" fill="#D1FAE5">${heroSub}</text>`;
  s += div(278);
  // Key stats row
  const stats = ko
    ? [{ label: '매출', val: '$13.0B', sub: '컨센 $12.8B 상회' }, { label: 'adj. EPS', val: '$0.16', sub: '컨센 $0.14 상회' }, { label: '전년 동기', val: '-$0.08', sub: '흑자 전환 +$0.24' }]
    : [{ label: 'Revenue', val: '$13.0B', sub: 'Beat $12.8B cons.' }, { label: 'adj. EPS', val: '$0.16', sub: 'Beat $0.14E cons.' }, { label: 'YoY prior', val: '-$0.08', sub: '+$0.24 swing' }];
  stats.forEach((st, i) => {
    const cx = 54 + i * 326;
    s += card(cx, 296, 310, 130, c1);
    s += `<text x="${cx + 155}" y="342" font-family="Arial,sans-serif" font-size="20" fill="${c1}" text-anchor="middle">${st.label}</text>`;
    s += `<text x="${cx + 155}" y="392" font-family="Arial Black,Arial,sans-serif" font-size="38" fill="#fff" text-anchor="middle" font-weight="900">${st.val}</text>`;
    s += `<text x="${cx + 155}" y="418" font-family="Arial,sans-serif" font-size="18" fill="#6EE7B7" text-anchor="middle">${st.sub}</text>`;
  });
  s += `<text x="54" y="472" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="${c1}" font-weight="900">${ko ? '분기 매출 · adj. EPS 추이' : 'Quarterly revenue · adj. EPS trend'}</text>`;
  s += `<text x="54" y="502" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${ko ? '바 위 = 매출($B), 바 아래 = adj. EPS' : 'Bar top = revenue ($B), bar bottom = adj. EPS'}</text>`;
  s += bars;
  s += `<line x1="54" y1="${chartY + chartH}" x2="1026" y2="${chartY + chartH}" stroke="#30363D" stroke-width="1.5"/>`;
  const msg = ko
    ? 'Falcon 9 재사용 효율 + Starlink 가입자 확대 → 구조적 수익성 전환 · Morgan Stanley $350 PT 유지'
    : 'Falcon 9 reusability + Starlink subscriber growth → structural profitability · Morgan Stanley $350 PT maintained';
  const msgLines = wrapText(msg, ko ? 28 : 44, ko);
  s += `<rect x="54" y="952" width="972" height="${38 * msgLines.length + 44}" rx="16" fill="#052E16" stroke="${c1}" stroke-width="1.5"/>`;
  msgLines.forEach((l, i) => {
    s += `<text x="84" y="${952 + 40 + i * 38}" font-family="Arial,sans-serif" font-size="22" fill="#6EE7B7">${l}</text>`;
  });
  s += footer('2026.10.20');
  return mkSvg(s);
}

// ─── 2. TSLA-SPCX 합병 확률 67% ──────────────────────────────────────────────
function mergerOdds67(lang) {
  const ko = lang === 'ko';
  const c1 = '#EF4444', c2 = '#A855F7';

  const hero = '67%';
  const heroSub = ko ? 'Kalshi 합병 예측 · 2027년 2월 이전 성사 확률' : 'Kalshi merger odds before Feb 2027';
  const ctx = ko ? '2026.10.20 · TSLA + SPCX · BREAKING' : '2026.10.20 · TSLA + SPCX · BREAKING';

  // Probability gauge bars
  const timeline = ko
    ? [{ label: '10월 15일', pct: 33 }, { label: '10월 17일', pct: 45 }, { label: '10월 19일', pct: 58 }, { label: '10월 20일', pct: 67 }]
    : [{ label: 'Oct 15', pct: 33 }, { label: 'Oct 17', pct: 45 }, { label: 'Oct 19', pct: 58 }, { label: 'Oct 20', pct: 67 }];

  const chartY = 580, chartH = 280, bw = 160, chartX = 54;
  const bGap = (972 - 4 * bw) / 5;
  let bars = '';
  timeline.forEach((d, i) => {
    const bH = Math.round((d.pct / 100) * chartH);
    const bx = chartX + bGap + i * (bw + bGap);
    const isLast = i === timeline.length - 1;
    const color = isLast ? 'url(#hG)' : (i >= 2 ? '#7F1D1D' : '#374151');
    bars += `<rect x="${bx}" y="${chartY + chartH - bH}" width="${bw}" height="${bH}" rx="8" fill="${color}"/>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH - bH - 12}" font-family="Arial Black,Arial,sans-serif" font-size="${isLast ? 32 : 24}" fill="${isLast ? '#FCA5A5' : '#8B949E'}" text-anchor="middle" font-weight="900">${d.pct}%</text>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH + 32}" font-family="Arial,sans-serif" font-size="20" fill="${isLast ? '#FCA5A5' : '#6B7280'}" text-anchor="middle">${d.label}</text>`;
  });

  // Key info cards
  const infos = ko
    ? [{ icon: '📈', val: '67%', sub: 'Kalshi 합병 확률' }, { icon: '💰', val: '$358.0', sub: 'TSLA +2.19%' }, { icon: '📅', val: 'Nov 5', sub: '테슬라 주주총회' }]
    : [{ icon: '📈', val: '67%', sub: 'Kalshi merger odds' }, { icon: '💰', val: '$358.0', sub: 'TSLA +2.19%' }, { icon: '📅', val: 'Nov 5', sub: 'Tesla AGM' }];

  let s = base(c1, c2);
  s += badge(54, 'TSLA', c1);
  s += badge(168, 'SPCX', '#3B82F6');
  s += badge(284, 'BREAKING', '#7C3AED');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="160" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="272" font-family="Arial,sans-serif" font-size="26" fill="#FCA5A5">${heroSub}</text>`;
  s += div(300);
  // Info cards
  infos.forEach((inf, i) => {
    const cx = 54 + i * 326;
    s += card(cx, 316, 310, 130, c1);
    s += `<text x="${cx + 155}" y="356" font-family="Arial,sans-serif" font-size="24" text-anchor="middle">${inf.icon}</text>`;
    s += `<text x="${cx + 155}" y="402" font-family="Arial Black,Arial,sans-serif" font-size="36" fill="#fff" text-anchor="middle" font-weight="900">${inf.val}</text>`;
    s += `<text x="${cx + 155}" y="430" font-family="Arial,sans-serif" font-size="18" fill="#D1D5DB" text-anchor="middle">${inf.sub}</text>`;
  });
  s += `<text x="54" y="478" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#F87171" font-weight="900">${ko ? 'Kalshi 합병 확률 추이' : 'Kalshi merger probability trend'}</text>`;
  s += `<text x="54" y="510" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${ko ? 'Walter Bloomberg 보도 — 시장 기대 가속 반영 중' : 'via Walter Bloomberg — market expectations repricing rapidly'}</text>`;
  s += bars;
  s += `<line x1="54" y1="${chartY + chartH}" x2="1026" y2="${chartY + chartH}" stroke="#30363D" stroke-width="1.5"/>`;
  const msg = ko
    ? '합산 $3.5T · 올스톡 구조 · 머스크 37% 지분·56% 의결권 유지 · TSLA AGM 11/5 발표 주시'
    : 'Combined $3.5T · all-stock · Musk retains 37% stake, 56% voting · Watch Nov 5 AGM for announcement';
  const msgLines = wrapText(msg, ko ? 28 : 44, ko);
  s += `<rect x="54" y="918" width="972" height="${38 * msgLines.length + 44}" rx="16" fill="#1A0808" stroke="${c1}" stroke-width="1.5"/>`;
  msgLines.forEach((l, i) => {
    s += `<text x="84" y="${918 + 40 + i * 38}" font-family="Arial,sans-serif" font-size="22" fill="#FCA5A5">${l}</text>`;
  });
  s += footer('2026.10.20');
  return mkSvg(s);
}

// ─── 3. Tesla 주주서한 ─────────────────────────────────────────────────────────
function teslaShareholderLetter(lang) {
  const ko = lang === 'ko';
  const c1 = '#EF4444', c2 = '#FB923C';

  const milestones = ko ? [
    { icon: '🚗', title: '누적 인도 1,000만 대 돌파', sub: '2003년 창업 이후 첫 10M 이정표' },
    { icon: '🤖', title: 'FSD 190개국 이상 확장', sub: 'Unsupervised FSD 지리 확장 가속' },
    { icon: '🏭', title: 'Cybercab GF텍사스 양산 시작', sub: '로보택시 플릿에 346대 이미 투입' },
    { icon: '⚡', title: 'Megapack 3 출하 시작', sub: '전력망 대형 에너지 저장 신세대' },
    { icon: '🏗', title: 'Terafab 텍사스 착공', sub: '1단계 $16.8B · Optimus 양산 허브' },
    { icon: '🔬', title: 'JB Straubel 이사회 복귀', sub: '공동창업자·전 CTO · 배터리 전략 강화' },
  ] : [
    { icon: '🚗', title: '10M+ deliveries worldwide', sub: 'First 10M milestone since founding 2003' },
    { icon: '🤖', title: 'FSD in 190+ countries', sub: 'Unsupervised FSD geographic expansion' },
    { icon: '🏭', title: 'Cybercab production at GF Texas', sub: '346 units already in robotaxi fleet' },
    { icon: '⚡', title: 'Megapack 3 shipping', sub: 'Next-gen grid-scale energy storage' },
    { icon: '🏗', title: 'Terafab Texas groundbreaking', sub: 'Phase 1 $16.8B · Optimus production hub' },
    { icon: '🔬', title: 'JB Straubel rejoins board', sub: 'Co-founder·former CTO · battery strategy' },
  ];

  const hero = '10M+';
  const heroSub = ko ? 'Tesla 전 세계 누적 인도 대수 돌파' : 'Tesla cumulative global deliveries';
  const ctx = ko ? '2026.10.20 · Tesla 주주서한 · Robyn Denholm' : '2026.10.20 · Tesla Shareholder Letter · Robyn Denholm';

  let s = base(c1, c2);
  s += badge(54, 'TSLA', c1);
  s += badge(168, ko ? '특집' : 'Special', '#B45309');
  s += badge(ko ? 254 : 290, ko ? '주주서한' : 'Shareholder Letter', '#1F2937');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="130" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="260" font-family="Arial,sans-serif" font-size="26" fill="#FED7AA">${heroSub}</text>`;
  s += div(286);
  // Milestone list (2-col, 3 rows)
  milestones.forEach((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const mx = 54 + col * 494;
    const my = 308 + row * 140;
    s += card(mx, my, 474, 122, i % 2 === 0 ? c1 : '#FB923C');
    s += `<text x="${mx + 44}" y="${my + 50}" font-family="Arial,sans-serif" font-size="28">${m.icon}</text>`;
    // Title wrap
    const titleLines = wrapText(m.title, ko ? 14 : 20, ko);
    titleLines.forEach((l, li) => {
      s += `<text x="${mx + 84}" y="${my + 44 + li * 30}" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">${l}</text>`;
    });
    s += `<text x="${mx + 84}" y="${my + 44 + titleLines.length * 30 + 6}" font-family="Arial,sans-serif" font-size="18" fill="#D1D5DB">${m.sub.length > 28 ? m.sub.slice(0,28) + '…' : m.sub}</text>`;
  });
  // AGM note
  s += `<rect x="54" y="738" width="972" height="72" rx="14" fill="#1A0808" stroke="${c1}" stroke-width="1.5"/>`;
  s += `<text x="540" y="782" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FCA5A5" text-anchor="middle" font-weight="900">${ko ? '📅 주주총회 11월 5일 확정 · 합병 언급 없음' : '📅 AGM confirmed Nov 5 · No merger mention in letter'}</text>`;
  // No merger note
  const noMerger = ko
    ? 'SpaceX-Tesla 합병 관련 공식 언급 없음 — Terafab 공동 프로젝트가 사실상 협력 증거'
    : 'No SpaceX-Tesla merger mention — Terafab joint project serves as de facto collaboration evidence';
  const noLines = wrapText(noMerger, ko ? 30 : 48, ko);
  s += `<rect x="54" y="828" width="972" height="${38 * noLines.length + 44}" rx="16" fill="#161B22" stroke="#374151" stroke-width="1.5"/>`;
  noLines.forEach((l, i) => {
    s += `<text x="84" y="${828 + 40 + i * 38}" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">${l}</text>`;
  });
  s += footer('2026.10.20');
  return mkSvg(s);
}

// ─── 4. FSD 응급 자동 개입 ────────────────────────────────────────────────────
function fsdEmergencyOverride(lang) {
  const ko = lang === 'ko';
  const c1 = '#EF4444', c2 = '#F97316';

  const triggers = ko ? [
    { icon: '💥', title: '임박한 충돌 감지', sub: '물리적으로 회피 불가능 상황 자동 감지 후 회피 기동' },
    { icon: '😴', title: '운전자 부주의·수면', sub: '핸들 접촉·눈 추적으로 감지 시 자동 개입' },
    { icon: '🚑', title: '의료 비상 상황', sub: '비정상 신체 반응 감지 → 갓길 이동 + 긴급 호출' },
  ] : [
    { icon: '💥', title: 'Imminent collision detected', sub: 'Auto evasive maneuver when physical avoidance is impossible' },
    { icon: '😴', title: 'Driver inattention or asleep', sub: 'Wheel contact + eye tracking → auto intervention' },
    { icon: '🚑', title: 'Medical emergency', sub: 'Abnormal body response → safe pullover + 911 call' },
  ];

  const hero = ko ? '응급 개입' : 'Auto Override';
  const heroSub = ko ? '수동 운전 중에도 FSD 자동 제어 — 4가지 트리거' : 'FSD takes control during manual drive — 4 triggers';
  const ctx = ko ? '2026.10.20 · Tesla FSD 응급 안전 기능' : '2026.10.20 · Tesla FSD Emergency Safety';

  let s = base(c1, c2);
  s += badge(54, 'TSLA', c1);
  s += badge(168, ko ? '종목분석' : 'Analysis', '#991B1B');
  s += badge(ko ? 266 : 306, 'FSD Safety', '#7C3AED');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="256" font-family="Arial,sans-serif" font-size="26" fill="#FED7AA">${heroSub}</text>`;
  s += div(284);
  // Trigger cards
  triggers.forEach((tr, i) => {
    const ty = 308 + i * 190;
    s += card(54, ty, 972, 170, i === 0 ? '#EF4444' : (i === 1 ? '#F97316' : '#A855F7'));
    s += `<text x="100" y="${ty + 70}" font-family="Arial,sans-serif" font-size="44">${tr.icon}</text>`;
    const titleLines = wrapText(tr.title, ko ? 16 : 24, ko);
    titleLines.forEach((l, li) => {
      s += `<text x="166" y="${ty + 52 + li * 36}" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#fff" font-weight="900">${l}</text>`;
    });
    const subLines = wrapText(tr.sub, ko ? 26 : 44, ko);
    subLines.forEach((l, li) => {
      s += `<text x="166" y="${ty + 52 + titleLines.length * 36 + 10 + li * 30}" font-family="Arial,sans-serif" font-size="22" fill="#D1D5DB">${l}</text>`;
    });
  });
  // Impact cards
  const impactData = ko
    ? [{ label: '안전 데이터', val: '누적', sub: 'NHTSA 승인 논거 강화' }, { label: '로보택시', val: '800+', sub: '전차량 적용 중' }, { label: '규제 확장', val: '190+', sub: 'FSD 운영 국가' }]
    : [{ label: 'Safety data', val: 'Cumulative', sub: 'NHTSA approval argument' }, { label: 'Robotaxi', val: '800+', sub: 'All vehicles equipped' }, { label: 'Regulatory', val: '190+', sub: 'FSD operating countries' }];
  impactData.forEach((d, i) => {
    const cx = 54 + i * 326;
    s += card(cx, 882, 310, 118, '#374151');
    s += `<text x="${cx + 155}" y="926" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF" text-anchor="middle">${d.label}</text>`;
    s += `<text x="${cx + 155}" y="966" font-family="Arial Black,Arial,sans-serif" font-size="32" fill="#fff" text-anchor="middle" font-weight="900">${d.val}</text>`;
    s += `<text x="${cx + 155}" y="992" font-family="Arial,sans-serif" font-size="18" fill="#6B7280" text-anchor="middle">${d.sub}</text>`;
  });
  const msg = ko
    ? 'FSD가 단순 운전보조를 넘어 생명안전 시스템으로 진화 — 규제·보험·소비자 신뢰 모두에 강력한 논거'
    : 'FSD evolves beyond driver assistance into a life-safety system — strong argument for regulators, insurers, and consumer trust';
  const msgLines = wrapText(msg, ko ? 28 : 44, ko);
  s += `<rect x="54" y="1018" width="972" height="${38 * msgLines.length + 44}" rx="16" fill="#1A0808" stroke="${c1}" stroke-width="1.5"/>`;
  msgLines.forEach((l, i) => {
    s += `<text x="84" y="${1018 + 40 + i * 38}" font-family="Arial,sans-serif" font-size="22" fill="#FCA5A5">${l}</text>`;
  });
  s += footer('2026.10.20');
  return mkSvg(s);
}

// ─── 5. SpaceX AI 데이터센터 ──────────────────────────────────────────────────
function spcxAIDC(lang) {
  const ko = lang === 'ko';
  const c1 = '#8B5CF6', c2 = '#3B82F6';

  const sites = ko ? [
    { name: '브라운스빌 (Starbase)', clusters: 6, status: '가동 중', color: '#8B5CF6' },
    { name: '멤피스 (Minihard)', clusters: 1, status: '가동 중', color: '#3B82F6' },
  ] : [
    { name: 'Brownsville (Starbase)', clusters: 6, status: 'Operational', color: '#8B5CF6' },
    { name: 'Memphis (Minihard)', clusters: 1, status: 'Operational', color: '#3B82F6' },
  ];

  const useCases = ko ? [
    { icon: '🚀', title: 'Starship 비행 시뮬레이션', sub: '재착륙 정밀도 강화학습 파이프라인' },
    { icon: '🛰', title: 'Starlink 트래픽 최적화', sub: '수만 대 위성 실시간 네트워크 관리' },
    { icon: '🤖', title: 'AI 추론 · 자율비행', sub: 'Tesla 공동 자율주행 연산 가능성' },
  ] : [
    { icon: '🚀', title: 'Starship flight simulation', sub: 'Reinforcement learning for precision landing' },
    { icon: '🛰', title: 'Starlink traffic optimization', sub: 'Real-time management of 10,000+ satellites' },
    { icon: '🤖', title: 'AI inference · autonomy', sub: 'Potential joint Tesla autonomous compute' },
  ];

  const hero = '5-6+';
  const heroSub = ko ? 'GPU 클러스터 · 2년 미만 완성 · 브라운스빌' : 'GPU clusters · built in under 2 years · Brownsville';
  const ctx = ko ? '2026.10.20 · SpaceX 자체 AI 인프라' : '2026.10.20 · SpaceX self-built AI infrastructure';

  let s = base(c1, c2);
  s += badge(54, 'SPCX', c1);
  s += badge(170, ko ? '종목분석' : 'Analysis', '#4C1D95');
  s += badge(ko ? 266 : 306, 'AI DC', '#1D4ED8');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="150" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="260" font-family="Arial,sans-serif" font-size="26" fill="#C4B5FD">${heroSub}</text>`;
  s += div(286);
  // Site cards
  sites.forEach((site, i) => {
    const sy = 308 + i * 140;
    s += card(54, sy, 972, 120, site.color);
    s += `<text x="100" y="${sy + 54}" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" font-weight="900">${site.name}</text>`;
    s += `<text x="100" y="${sy + 88}" font-family="Arial,sans-serif" font-size="22" fill="#C4B5FD">${ko ? `${site.clusters}개 GPU 클러스터 · ${site.status}` : `${site.clusters} GPU cluster${site.clusters > 1 ? 's' : ''} · ${site.status}`}</text>`;
    s += `<text x="${W - 100}" y="${sy + 70}" font-family="Arial Black,Arial,sans-serif" font-size="48" fill="${site.color}" text-anchor="end" font-weight="900">${site.clusters === 6 ? '●●●●●●' : '●'}</text>`;
  });
  // Why self-built
  const why = ko ? '🔑 자체 구축 이유: AWS · Google · Azure에서 필요 규모의 컴퓨팅을 적시에 조달 불가' : '🔑 Why self-built: AWS · Google · Azure could not supply needed compute at scale and timeline';
  s += `<rect x="54" y="592" width="972" height="72" rx="14" fill="#1E1B4B" stroke="#8B5CF6" stroke-width="1.5"/>`;
  s += `<text x="540" y="634" font-family="Arial,sans-serif" font-size="22" fill="#C4B5FD" text-anchor="middle">${why}</text>`;
  // Use cases
  s += `<text x="54" y="698" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="${c1}" font-weight="900">${ko ? '주요 활용 사례' : 'Primary use cases'}</text>`;
  useCases.forEach((uc, i) => {
    const uy = 716 + i * 156;
    s += card(54, uy, 972, 136, '#374151');
    s += `<text x="100" y="${uy + 62}" font-family="Arial,sans-serif" font-size="40">${uc.icon}</text>`;
    const titleLines = wrapText(uc.title, ko ? 18 : 26, ko);
    titleLines.forEach((l, li) => {
      s += `<text x="166" y="${uy + 48 + li * 34}" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" font-weight="900">${l}</text>`;
    });
    s += `<text x="166" y="${uy + 48 + titleLines.length * 34 + 8}" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">${uc.sub}</text>`;
  });
  const msg = ko
    ? '발사·Starlink 넘어 AI 컴퓨팅 인프라가 3번째 사업 축으로 — 클라우드 기업 수준 멀티플 논거 등장'
    : 'Beyond launch + Starlink: AI compute infra emerges as 3rd business axis — cloud infra multiple argument forming';
  const msgLines = wrapText(msg, ko ? 28 : 44, ko);
  s += `<rect x="54" y="1188" width="972" height="${38 * msgLines.length + 44}" rx="16" fill="#0F0A23" stroke="${c1}" stroke-width="1.5"/>`;
  msgLines.forEach((l, i) => {
    s += `<text x="84" y="${1188 + 40 + i * 38}" font-family="Arial,sans-serif" font-size="22" fill="#C4B5FD">${l}</text>`;
  });
  s += footer('2026.10.20');
  return mkSvg(s);
}

// ─── 6. Anthropic $45B 컴퓨팅 ─────────────────────────────────────────────────
function anthropic45B(lang) {
  const ko = lang === 'ko';
  const c1 = '#F59E0B', c2 = '#EF4444';

  // Compute deal scale comparison
  const deals = ko
    ? [{ name: 'Anthropic × Niazde', val: 45, color: 'url(#barG)' }, { name: 'Microsoft × OpenAI 인프라', val: 13, color: '#374151' }, { name: '삼성전자 연간 매출', val: 23, color: '#1F2937' }]
    : [{ name: 'Anthropic × Niazde', val: 45, color: 'url(#barG)' }, { name: 'Microsoft × OpenAI infra', val: 13, color: '#374151' }, { name: 'Samsung annual revenue', val: 23, color: '#1F2937' }];

  const chartH = 280, chartY = 640, chartX = 54, bw = 200;
  const bGap = (972 - deals.length * bw) / (deals.length + 1);
  let bars = '';
  deals.forEach((d, i) => {
    const bH = Math.round((d.val / 50) * chartH);
    const bx = chartX + bGap + i * (bw + bGap);
    bars += `<rect x="${bx}" y="${chartY + chartH - bH}" width="${bw}" height="${bH}" rx="8" fill="${d.color}"/>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH - bH - 12}" font-family="Arial Black,Arial,sans-serif" font-size="${i === 0 ? 28 : 22}" fill="${i === 0 ? '#FCD34D' : '#6B7280'}" text-anchor="middle" font-weight="900">$${d.val}B</text>`;
    const nameLines = wrapText(d.name, ko ? 10 : 16, ko);
    nameLines.forEach((l, li) => {
      bars += `<text x="${bx + bw/2}" y="${chartY + chartH + 32 + li * 28}" font-family="Arial,sans-serif" font-size="18" fill="${i === 0 ? '#FCD34D' : '#6B7280'}" text-anchor="middle">${l}</text>`;
    });
  });

  const hero = '$45B';
  const heroSub = ko ? 'Anthropic · Niazde 컴퓨팅 구매 협상 (Bloomberg)' : 'Anthropic · Niazde compute deal in talks (Bloomberg)';
  const ctx = ko ? '2026.10.20 · AI 인프라 매크로' : '2026.10.20 · AI Infrastructure Macro';

  let s = base(c1, c2);
  s += badge(54, ko ? '매크로' : 'Macro', c1);
  s += badge(ko ? 150 : 180, 'Anthropic', '#7C3AED');
  s += badge(ko ? 280 : 324, 'AI Infra', '#1D4ED8');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="160" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="272" font-family="Arial,sans-serif" font-size="26" fill="#FCD34D">${heroSub}</text>`;
  s += div(300);
  // Key points
  const points = ko ? [
    '📦 Niazde: 세계 최대 데이터센터 개발사 · 역대 최대 단일 AI 컴퓨팅 계약 가능',
    '🧠 Claude 4.x 추론 수요 → 학습 비용을 추월하는 AI 추론 시대 개막',
  ] : [
    '📦 Niazde: world\'s largest DC developer · potentially largest single AI compute contract ever',
    '🧠 Claude 4.x inference demand → AI inference costs now surpassing training costs',
  ];
  points.forEach((p, i) => {
    const py = 318 + i * 88;
    s += card(54, py, 972, 72, '#374151');
    const pLines = wrapText(p, ko ? 34 : 54, ko);
    pLines.forEach((l, li) => {
      s += `<text x="84" y="${py + 36 + li * 28}" font-family="Arial,sans-serif" font-size="22" fill="#D1D5DB">${l}</text>`;
    });
  });
  s += `<text x="54" y="520" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="${c1}" font-weight="900">${ko ? '컴퓨팅 계약 규모 비교 ($B)' : 'Compute deal scale comparison ($B)'}</text>`;
  s += `<text x="54" y="552" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${ko ? '비교용 참고치 (공개 추정치 기준)' : 'Reference comparisons (based on public estimates)'}</text>`;
  s += bars;
  s += `<line x1="54" y1="${chartY + chartH}" x2="1026" y2="${chartY + chartH}" stroke="#30363D" stroke-width="1.5"/>`;
  const msg = ko
    ? 'AI 인프라 사이클: GPU 수량 경쟁(2024) → 데이터센터 장기 계약(2025-26) · 전력·냉각·부지 공급자 부상'
    : 'AI infra cycle: GPU quantity race (2024) → long-term DC contracts (2025-26) · power, cooling, land suppliers rising';
  const msgLines = wrapText(msg, ko ? 28 : 44, ko);
  s += `<rect x="54" y="994" width="972" height="${38 * msgLines.length + 44}" rx="16" fill="#1A0D00" stroke="${c1}" stroke-width="1.5"/>`;
  msgLines.forEach((l, i) => {
    s += `<text x="84" y="${994 + 40 + i * 38}" font-family="Arial,sans-serif" font-size="22" fill="#FCD34D">${l}</text>`;
  });
  s += footer('2026.10.20');
  return mkSvg(s);
}

// ─── 7. Meta Prometheus 1GW ────────────────────────────────────────────────────
function metaPrometheus(lang) {
  const ko = lang === 'ko';
  const c1 = '#3B82F6', c2 = '#60A5FA';

  const hero = '1GW';
  const heroSub = ko ? 'Meta Prometheus 슈퍼클러스터 · 오하이오 뉴올버니' : 'Meta Prometheus supercluster · New Albany, Ohio';
  const ctx = ko ? '2026.10.20 · Meta AI 인프라 · 섹터' : '2026.10.20 · Meta AI Infrastructure · Sector';

  // Power scale comparison
  const pwrData = ko
    ? [{ name: 'Meta Prometheus', mw: 1000, color: 'url(#barG)' }, { name: '일반 DC 평균', mw: 100, color: '#374151' }, { name: 'GPU 단독 클러스터', mw: 200, color: '#1D4ED8' }]
    : [{ name: 'Meta Prometheus', mw: 1000, color: 'url(#barG)' }, { name: 'Typical DC', mw: 100, color: '#374151' }, { name: 'GPU-only cluster', mw: 200, color: '#1D4ED8' }];

  const chartH = 260, chartY = 700, chartX = 54, bw = 200;
  const bGap = (972 - pwrData.length * bw) / (pwrData.length + 1);
  let bars = '';
  pwrData.forEach((d, i) => {
    const bH = Math.round((d.mw / 1100) * chartH);
    const bx = chartX + bGap + i * (bw + bGap);
    bars += `<rect x="${bx}" y="${chartY + chartH - bH}" width="${bw}" height="${bH}" rx="8" fill="${d.color}"/>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH - bH - 12}" font-family="Arial Black,Arial,sans-serif" font-size="${i === 0 ? 28 : 20}" fill="${i === 0 ? '#93C5FD' : '#6B7280'}" text-anchor="middle" font-weight="900">${d.mw >= 1000 ? `${d.mw / 1000}GW` : `${d.mw}MW`}</text>`;
    const nameLines = wrapText(d.name, ko ? 10 : 14, ko);
    nameLines.forEach((l, li) => {
      bars += `<text x="${bx + bw/2}" y="${chartY + chartH + 32 + li * 28}" font-family="Arial,sans-serif" font-size="18" fill="${i === 0 ? '#93C5FD' : '#6B7280'}" text-anchor="middle">${l}</text>`;
    });
  });

  let s = base(c1, c2);
  s += badge(54, ko ? '섹터' : 'Sector', c1);
  s += badge(ko ? 150 : 184, 'Meta', '#1877F2');
  s += badge(ko ? 234 : 270, 'Prometheus', '#1D4ED8');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="170" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="262" font-family="Arial,sans-serif" font-size="26" fill="#BAE6FD">${heroSub}</text>`;
  s += div(290);
  // Info cards
  const infos = ko
    ? [{ label: '전력 규모', val: '1GW', sub: '소도시 연간 전력량' }, { label: 'Muse Wonder', val: '학습 완료', sub: '멀티모달 파운데이션 AI' }, { label: '위치', val: '뉴올버니', sub: '오하이오 AI 허브' }]
    : [{ label: 'Power scale', val: '1GW', sub: 'Equivalent to a small city' }, { label: 'Muse Wonder', val: 'Trained', sub: 'Multimodal foundation AI' }, { label: 'Location', val: 'New Albany', sub: 'Ohio AI data center hub' }];
  infos.forEach((inf, i) => {
    const cx = 54 + i * 326;
    s += card(cx, 308, 310, 130, c1);
    s += `<text x="${cx + 155}" y="354" font-family="Arial,sans-serif" font-size="20" fill="${c1}" text-anchor="middle">${inf.label}</text>`;
    s += `<text x="${cx + 155}" y="400" font-family="Arial Black,Arial,sans-serif" font-size="32" fill="#fff" text-anchor="middle" font-weight="900">${inf.val}</text>`;
    s += `<text x="${cx + 155}" y="428" font-family="Arial,sans-serif" font-size="18" fill="#93C5FD" text-anchor="middle">${inf.sub}</text>`;
  });
  // Muse models
  s += `<text x="54" y="468" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="${c1}" font-weight="900">${ko ? 'Muse 파운데이션 모델 (Prometheus 학습)' : 'Muse foundation models (trained on Prometheus)'}</text>`;
  const museModels = ko
    ? ['Muse Wonder (멀티모달 · 텍스트+이미지+비디오)', 'Reels AI 알고리즘 · Instagram 생성 AI · Facebook 피드']
    : ['Muse Wonder (multimodal · text+image+video)', 'Reels AI · Instagram generative AI · Facebook feed'];
  museModels.forEach((m, i) => {
    s += `<rect x="54" y="${488 + i * 76}" width="972" height="60" rx="10" fill="#0C1A2E" stroke="#1D4ED8" stroke-width="1.5"/>`;
    s += `<text x="84" y="${518 + i * 76}" font-family="Arial,sans-serif" font-size="22" fill="#93C5FD">${m}</text>`;
  });
  s += `<text x="54" y="658" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="${c1}" font-weight="900">${ko ? '전력 규모 비교 (MW)' : 'Power scale comparison (MW)'}</text>`;
  s += bars;
  s += `<line x1="54" y1="${chartY + chartH}" x2="1026" y2="${chartY + chartH}" stroke="#30363D" stroke-width="1.5"/>`;
  const msg = ko
    ? 'AI 경쟁이 GPU 수량에서 전력 확보로 전환 — 전력 인프라·냉각 솔루션·전력망 장비 기업이 신규 수혜 섹터'
    : 'AI race shifts from GPU count to power access — grid infra, cooling solutions, and power equipment companies are the new beneficiaries';
  const msgLines = wrapText(msg, ko ? 28 : 44, ko);
  s += `<rect x="54" y="1036" width="972" height="${38 * msgLines.length + 44}" rx="16" fill="#060F1E" stroke="${c1}" stroke-width="1.5"/>`;
  msgLines.forEach((l, i) => {
    s += `<text x="84" y="${1036 + 40 + i * 38}" font-family="Arial,sans-serif" font-size="22" fill="#93C5FD">${l}</text>`;
  });
  s += footer('2026.10.20');
  return mkSvg(s);
}

// ─── 8. NVIDIA $430B ──────────────────────────────────────────────────────────
function nvda430B(lang) {
  const ko = lang === 'ko';
  const c1 = '#10B981', c2 = '#60A5FA';

  // Revenue comparison
  const companies = ko
    ? [{ name: 'NVDA AI칩 2026E', val: 430, color: 'url(#barG)' }, { name: 'AMD AI GPU 2026E', val: 30, color: '#EF4444' }, { name: 'Intel 전체 2026E', val: 50, color: '#374151' }]
    : [{ name: 'NVDA AI chip 2026E', val: 430, color: 'url(#barG)' }, { name: 'AMD AI GPU 2026E', val: 30, color: '#EF4444' }, { name: 'Intel total 2026E', val: 50, color: '#374151' }];

  const chartH = 300, chartY = 700, chartX = 54, bw = 210;
  const bGap = (972 - companies.length * bw) / (companies.length + 1);
  let bars = '';
  companies.forEach((d, i) => {
    const bH = Math.round((d.val / 460) * chartH);
    const bx = chartX + bGap + i * (bw + bGap);
    bars += `<rect x="${bx}" y="${chartY + chartH - bH}" width="${bw}" height="${bH}" rx="8" fill="${d.color}"/>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH - bH - 12}" font-family="Arial Black,Arial,sans-serif" font-size="${i === 0 ? 30 : 22}" fill="${i === 0 ? '#34D399' : (i === 1 ? '#FCA5A5' : '#6B7280')}" text-anchor="middle" font-weight="900">$${d.val}B</text>`;
    const nameLines = wrapText(d.name, ko ? 9 : 14, ko);
    nameLines.forEach((l, li) => {
      bars += `<text x="${bx + bw/2}" y="${chartY + chartH + 32 + li * 28}" font-family="Arial,sans-serif" font-size="18" fill="${i === 0 ? '#34D399' : (i === 1 ? '#EF4444' : '#6B7280')}" text-anchor="middle">${l}</text>`;
    });
  });

  const hero = '$430B';
  const heroSub = ko ? 'NVIDIA 2026년 AI 칩 판매 추정 · H200 장당 ~$50K' : 'NVIDIA 2026 AI chip sales estimate · ~$50K per H200';
  const ctx = ko ? '2026.10.20 · NVDA vs AMD · 종목분석' : '2026.10.20 · NVDA vs AMD · Analysis';

  let s = base(c1, c2);
  s += badge(54, 'NVDA', c1);
  s += badge(168, ko ? '종목분석' : 'Analysis', '#047857');
  s += badge(ko ? 266 : 306, 'vs AMD', '#EF4444');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="140" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="270" font-family="Arial,sans-serif" font-size="26" fill="#6EE7B7">${heroSub}</text>`;
  s += div(296);
  // Stats
  const stats = ko
    ? [{ label: 'NVDA AI칩 2026E', val: '$430B', sub: '역대 단일 품목 최대', color: c1 }, { label: 'AMD AI GPU 전망', val: '240만→60만', sub: '75% 대폭 하향', color: '#EF4444' }, { label: 'Blackwell NVL72', val: '$3M+', sub: '랙 시스템 단가', color: '#60A5FA' }]
    : [{ label: 'NVDA AI chip 2026E', val: '$430B', sub: 'Largest single product ever', color: c1 }, { label: 'AMD AI GPU cut', val: '2.4M→600K', sub: '75% reduction', color: '#EF4444' }, { label: 'Blackwell NVL72', val: '$3M+', sub: 'Per rack system', color: '#60A5FA' }];
  stats.forEach((st, i) => {
    const cx = 54 + i * 326;
    s += card(cx, 312, 310, 130, st.color);
    s += `<text x="${cx + 155}" y="358" font-family="Arial,sans-serif" font-size="18" fill="${st.color}" text-anchor="middle">${st.label}</text>`;
    s += `<text x="${cx + 155}" y="404" font-family="Arial Black,Arial,sans-serif" font-size="30" fill="#fff" text-anchor="middle" font-weight="900">${st.val}</text>`;
    s += `<text x="${cx + 155}" y="432" font-family="Arial,sans-serif" font-size="18" fill="#9CA3AF" text-anchor="middle">${st.sub}</text>`;
  });
  s += `<text x="54" y="472" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="${c1}" font-weight="900">${ko ? '2026년 AI 칩 매출 비교 ($B 추정)' : '2026E AI chip revenue comparison ($B estimate)'}</text>`;
  // AMD contrast note
  s += `<rect x="54" y="490" width="972" height="62" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>`;
  s += `<text x="84" y="530" font-family="Arial,sans-serif" font-size="22" fill="#FCA5A5">${ko ? '⚠ AMD: AI GPU 출하 전망 240만 대 → 60만 대 (-75%) — CUDA 생태계 종속 예상보다 훨씬 강함' : '⚠ AMD: AI GPU forecast cut 2.4M → 600K (-75%) — CUDA lock-in far stronger than expected'}</text>`;
  s += bars;
  s += `<line x1="54" y1="${chartY + chartH}" x2="1026" y2="${chartY + chartH}" stroke="#30363D" stroke-width="1.5"/>`;
  const msg = ko
    ? 'CUDA·NVLink·NIM 소프트웨어 스택이 경쟁 전환 비용 극대화 — 단기 NVDA 프리미엄 밸류에이션 정당화 근거'
    : 'CUDA + NVLink + NIM software stack maximizes switching costs — justifies near-term NVDA premium valuation';
  const msgLines = wrapText(msg, ko ? 28 : 44, ko);
  s += `<rect x="54" y="1076" width="972" height="${38 * msgLines.length + 44}" rx="16" fill="#052E16" stroke="${c1}" stroke-width="1.5"/>`;
  msgLines.forEach((l, i) => {
    s += `<text x="84" y="${1076 + 40 + i * 38}" font-family="Arial,sans-serif" font-size="22" fill="#6EE7B7">${l}</text>`;
  });
  s += footer('2026.10.20');
  return mkSvg(s);
}

// ─── 9. 한장 요약 ─────────────────────────────────────────────────────────────
function summary20261020(lang) {
  const ko = lang === 'ko';
  const c1 = '#A855F7', c2 = '#3B82F6';

  const items = ko ? [
    { num: '01', icon: '💰', title: 'SPCX Q3 첫 흑자', desc: 'adj. EPS $0.16 · 매출 $13.0B · Morgan Stanley $350 PT' },
    { num: '02', icon: '🔥', title: '합병 확률 67%', desc: 'Kalshi 예측시장 · Walter Bloomberg · TSLA $358 +2.19%' },
    { num: '03', icon: '📜', title: 'Tesla 주주서한', desc: '1,000만 대 · Cybercab 양산 · JB Straubel 복귀 · AGM 11/5' },
    { num: '04', icon: '🛡', title: 'FSD 응급 자동 개입', desc: '충돌·부주의·수면·의료 비상 시 수동 운전 중 자동 제어' },
    { num: '05', icon: '🖥', title: 'SpaceX AI DC 5-6+', desc: '브라운스빌 GPU 클러스터 · 멤피스 Minihard · 2년 내 완성' },
    { num: '06', icon: '🤖', title: 'Anthropic $45B 협상', desc: 'Bloomberg · Niazde · 역대 최대 단일 AI 컴퓨팅 계약' },
    { num: '07', icon: '⚡', title: 'Meta Prometheus 1GW', desc: '뉴올버니 슈퍼클러스터 · Muse Wonder 학습 완료' },
    { num: '08', icon: '📈', title: 'NVDA $430B 궤도', desc: 'H200 장당 $50K · AMD AI GPU 전망 -75% 대폭 하향' },
    { num: '09', icon: '📅', title: 'TSLA Q3 어닝 내일', desc: 'Oct 21 실적 발표 · 합병 언급 여부 최대 관심사' },
  ] : [
    { num: '01', icon: '💰', title: 'SPCX Q3 first profit', desc: 'adj. EPS $0.16 · Rev $13.0B · MS $350 PT' },
    { num: '02', icon: '🔥', title: 'Merger odds 67%', desc: 'Kalshi · Walter Bloomberg · TSLA $358 +2.19%' },
    { num: '03', icon: '📜', title: 'Tesla shareholder letter', desc: '10M+ deliveries · Cybercab production · AGM Nov 5' },
    { num: '04', icon: '🛡', title: 'FSD emergency override', desc: 'Crash·inattention·asleep·medical → auto control' },
    { num: '05', icon: '🖥', title: 'SpaceX AI DC 5-6+', desc: 'Brownsville GPU clusters · Memphis Minihard · under 2 yrs' },
    { num: '06', icon: '🤖', title: 'Anthropic $45B deal', desc: 'Bloomberg · Niazde · largest single AI compute deal ever' },
    { num: '07', icon: '⚡', title: 'Meta Prometheus 1GW', desc: 'New Albany supercluster · Muse Wonder trained' },
    { num: '08', icon: '📈', title: 'NVDA $430B pace', desc: '$50K/H200 · AMD AI GPU forecast -75%' },
    { num: '09', icon: '📅', title: 'TSLA Q3 earnings tomorrow', desc: 'Oct 21 report · merger comment = key catalyst' },
  ];

  const dateStr = '2026.10.20';
  const titleLine = ko ? `2026년 10월 20일 · 9개 토픽 한장 요약` : `Oct 20, 2026 · 9-Topic Daily Snapshot`;

  let s = base(c1, c2);
  s += badge(54, ko ? '한장요약' : 'Daily Summary', c1);
  s += badge(ko ? 188 : 246, dateStr, '#1D4ED8');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ko ? '2026.10.20 · investus.kr · 9개 토픽' : '2026.10.20 · investus.kr · 9 topics'}</text>`;
  s += `<text x="54" y="178" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="url(#hG)" font-weight="900">${titleLine}</text>`;
  s += div(200);

  // 9 topic rows
  items.forEach((it, i) => {
    const iy = 218 + i * 112;
    const rowBg = i % 2 === 0 ? '#0D1117' : '#161B22';
    s += `<rect x="54" y="${iy}" width="972" height="104" rx="12" fill="${rowBg}" stroke="#21262D" stroke-width="1"/>`;
    // Number
    s += `<text x="98" y="${iy + 42}" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="url(#hG)" text-anchor="middle" font-weight="900">${it.num}</text>`;
    // Icon
    s += `<text x="140" y="${iy + 50}" font-family="Arial,sans-serif" font-size="28">${it.icon}</text>`;
    // Title
    s += `<text x="186" y="${iy + 44}" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#E6EDF3" font-weight="900">${it.title}</text>`;
    // Desc
    const descLines = wrapText(it.desc, ko ? 32 : 52, ko);
    descLines.forEach((l, li) => {
      s += `<text x="186" y="${iy + 72 + li * 26}" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">${l}</text>`;
    });
  });

  s += footer('2026.10.20');
  return mkSvg(s);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  await save('summary-20261020',                      summary20261020('ko'));
  await save('summary-20261020-en',                   summary20261020('en'));
  await save('spcx-q3-earnings-preview-20261020',     spcxQ3Earnings('ko'));
  await save('spcx-q3-earnings-preview-20261020-en',  spcxQ3Earnings('en'));
  await save('tsla-spcx-merger-67pct-20261020',       mergerOdds67('ko'));
  await save('tsla-spcx-merger-67pct-20261020-en',    mergerOdds67('en'));
  await save('tsla-shareholder-letter-20261020',      teslaShareholderLetter('ko'));
  await save('tsla-shareholder-letter-20261020-en',   teslaShareholderLetter('en'));
  await save('tsla-fsd-emergency-override-20261020',  fsdEmergencyOverride('ko'));
  await save('tsla-fsd-emergency-override-20261020-en', fsdEmergencyOverride('en'));
  await save('spcx-ai-data-centers-20261020',         spcxAIDC('ko'));
  await save('spcx-ai-data-centers-20261020-en',      spcxAIDC('en'));
  await save('anthropic-45b-compute-20261020',        anthropic45B('ko'));
  await save('anthropic-45b-compute-20261020-en',     anthropic45B('en'));
  await save('meta-prometheus-1gw-20261020',          metaPrometheus('ko'));
  await save('meta-prometheus-1gw-20261020-en',       metaPrometheus('en'));
  await save('nvda-430b-chips-20261020',              nvda430B('ko'));
  await save('nvda-430b-chips-20261020-en',           nvda430B('en'));
  console.log('\n✅ All 18 charts generated for 2026-10-20');
})();
