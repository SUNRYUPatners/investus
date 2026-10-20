#!/usr/bin/env node
// 2026-10-20 개별 토픽 카드 + 요약 (KO + EN) — v2: 이모지 제거, 핵심포인트, 텍스트 wrap 수정
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

// Korean: preserve English words at boundaries. English: wrap at spaces.
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
  // Korean mode: wrap at maxChars but never break a Latin/number token
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

// 핵심 포인트 bullet section
function keyPoints(y, bullets, ko) {
  const BG = ['#EF4444','#A855F7','#3B82F6','#10B981','#F59E0B'];
  const title = ko ? '핵심 포인트' : 'Key Points';
  const lh = 54;
  const boxH = 54 + bullets.length * lh;
  let s = `<rect x="54" y="${y}" width="972" height="${boxH}" rx="16" fill="#111827" stroke="#374151" stroke-width="1.5"/>`;
  s += `<text x="84" y="${y + 36}" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#F3F4F6" font-weight="900">${title}</text>`;
  s += `<rect x="84" y="${y + 44}" width="904" height="1" fill="#2D333B"/>`;
  bullets.forEach((b, i) => {
    const by = y + 68 + i * lh;
    s += `<circle cx="104" cy="${by + 2}" r="7" fill="${BG[i % BG.length]}"/>`;
    s += `<text x="122" y="${by + 10}" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">${b}</text>`;
  });
  return s;
}

// ─── 1. SPCX Q3 첫 흑자 ───────────────────────────────────────────────────────
function spcxQ3Earnings(lang) {
  const ko = lang === 'ko';
  const c1 = '#10B981', c2 = '#34D399';

  const data = [
    { q: "Q1'25", rev: 9.8,  eps: -0.18 },
    { q: "Q2'25", rev: 10.5, eps: -0.12 },
    { q: "Q3'25", rev: 11.2, eps: -0.09 },
    { q: "Q4'25", rev: 11.8, eps: -0.05 },
    { q: "Q1'26", rev: 12.1, eps: -0.02 },
    { q: "Q2'26", rev: 12.5, eps:  0.04 },
    { q: "Q3'26", rev: 13.0, eps:  0.16 },
  ];
  const maxRev = 14, chartH = 280, chartY = 580, chartX = 54, chartW = 972;
  const bw = 90, bGap = (chartW - data.length * bw) / (data.length + 1);

  let bars = '';
  data.forEach((d, i) => {
    const bH = Math.round((d.rev / maxRev) * chartH);
    const bx = chartX + bGap + i * (bw + bGap);
    const isLast = i === data.length - 1;
    bars += `<rect x="${bx}" y="${chartY + chartH - bH}" width="${bw}" height="${bH}" rx="6" fill="${isLast ? 'url(#barG)' : (d.eps >= 0 ? '#047857' : '#374151')}"/>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH - bH - 10}" font-family="Arial Black,Arial,sans-serif" font-size="${isLast ? 20 : 17}" fill="${isLast ? '#34D399' : '#6B7280'}" text-anchor="middle" font-weight="900">$${d.rev}B</text>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH + 26}" font-family="Arial,sans-serif" font-size="17" fill="${isLast ? '#D1FAE5' : '#6B7280'}" text-anchor="middle">${d.q}</text>`;
    const ec = d.eps >= 0 ? '#34D399' : '#EF4444';
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH + 48}" font-family="Arial,sans-serif" font-size="15" fill="${ec}" text-anchor="middle">${d.eps >= 0 ? '+' : ''}${d.eps.toFixed(2)}</text>`;
  });

  const hero = ko ? '첫 흑자' : '1st Profit';
  const heroSub = ko ? 'SpaceX Q3 2026 · adj. EPS $0.16 (컨센 $0.14 상회)' : 'SpaceX Q3 2026 · adj. EPS $0.16 (beat $0.14E)';
  const ctx = ko ? '2026.10.20 · SPCX Q3 어닝' : '2026.10.20 · SPCX Q3 Earnings';

  let s = base(c1, c2);
  s += badge(54, 'SPCX', c1);
  s += badge(170, ko ? '어닝' : 'Earnings', '#047857');
  s += badge(ko ? 270 : 310, ko ? '첫 흑자 달성' : 'FIRST PROFIT', '#7C3AED');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="120" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="250" font-family="Arial,sans-serif" font-size="26" fill="#D1FAE5">${heroSub}</text>`;
  s += div(276);

  const stats = ko
    ? [{ label: '매출', val: '$13.0B', sub: '컨센 $12.8B 상회' }, { label: 'adj. EPS', val: '$0.16', sub: '컨센 $0.14 상회' }, { label: '전년 동기', val: '-$0.08', sub: '→ 흑자 전환' }]
    : [{ label: 'Revenue', val: '$13.0B', sub: 'Beat $12.8B est.' }, { label: 'adj. EPS', val: '$0.16', sub: 'Beat $0.14E est.' }, { label: 'YoY prior', val: '-$0.08', sub: '+$0.24 swing' }];
  stats.forEach((st, i) => {
    const cx = 54 + i * 326;
    s += card(cx, 294, 310, 120, c1);
    s += `<text x="${cx + 155}" y="336" font-family="Arial,sans-serif" font-size="20" fill="${c1}" text-anchor="middle">${st.label}</text>`;
    s += `<text x="${cx + 155}" y="382" font-family="Arial Black,Arial,sans-serif" font-size="36" fill="#fff" text-anchor="middle" font-weight="900">${st.val}</text>`;
    s += `<text x="${cx + 155}" y="406" font-family="Arial,sans-serif" font-size="18" fill="#6EE7B7" text-anchor="middle">${st.sub}</text>`;
  });

  s += `<text x="54" y="440" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="${c1}" font-weight="900">${ko ? '분기 매출 · adj. EPS 추이' : 'Quarterly revenue · adj. EPS trend'}</text>`;
  s += `<text x="54" y="466" font-family="Arial,sans-serif" font-size="19" fill="#6B7280">${ko ? '바 위 = 매출($B), 바 아래 = adj. EPS' : 'Bar top = revenue ($B), bottom = adj. EPS'}</text>`;
  s += bars;
  s += `<line x1="54" y1="${chartY + chartH}" x2="1026" y2="${chartY + chartH}" stroke="#30363D" stroke-width="1.5"/>`;

  const buls = ko ? [
    'SPCX 분기 흑자 처음 — Falcon 9 재사용·Starlink 가입자 확대 시너지',
    '매출 $13.0B · 컨센 $12.8B 상회 · EPS -$0.08→+$0.16 흑자 전환',
    'Morgan Stanley $350 목표주가 유지 — 장기 성장 스토리 더욱 탄탄',
    'Starship 상업화 이전 이미 흑자 — 성장 레버리지 극대화 국면',
    '내일 TSLA Q3 — 합병 코멘트 여부가 다음 촉매',
  ] : [
    'First SPCX quarterly profit via Falcon 9 reusability + Starlink growth',
    'Revenue $13.0B beat $12.8B est; EPS swings from -$0.08 to +$0.16 YoY',
    'Morgan Stanley maintains $350 PT — long-term thesis reinforced',
    'Profitable before Starship commercialization → massive growth leverage ahead',
    'TSLA Q3 earnings tomorrow — merger comment = next catalyst',
  ];
  s += keyPoints(900, buls, ko);
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

  const timeline = ko
    ? [{ label: '10월 15일', pct: 33 }, { label: '10월 17일', pct: 45 }, { label: '10월 19일', pct: 58 }, { label: '10월 20일', pct: 67 }]
    : [{ label: 'Oct 15', pct: 33 }, { label: 'Oct 17', pct: 45 }, { label: 'Oct 19', pct: 58 }, { label: 'Oct 20', pct: 67 }];

  const chartY = 570, chartH = 240, bw = 160, chartX = 54;
  const bGap = (972 - 4 * bw) / 5;
  let bars = '';
  timeline.forEach((d, i) => {
    const bH = Math.round((d.pct / 100) * chartH);
    const bx = chartX + bGap + i * (bw + bGap);
    const isLast = i === timeline.length - 1;
    bars += `<rect x="${bx}" y="${chartY + chartH - bH}" width="${bw}" height="${bH}" rx="8" fill="${isLast ? 'url(#hG)' : (i >= 2 ? '#7F1D1D' : '#374151')}"/>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH - bH - 12}" font-family="Arial Black,Arial,sans-serif" font-size="${isLast ? 30 : 24}" fill="${isLast ? '#FCA5A5' : '#8B949E'}" text-anchor="middle" font-weight="900">${d.pct}%</text>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH + 30}" font-family="Arial,sans-serif" font-size="20" fill="${isLast ? '#FCA5A5' : '#6B7280'}" text-anchor="middle">${d.label}</text>`;
  });

  const infos = ko
    ? [{ val: '67%', sub: 'Kalshi 합병 확률' }, { val: '$358.0', sub: 'TSLA +2.19%' }, { val: 'Nov 5', sub: '테슬라 주주총회' }]
    : [{ val: '67%', sub: 'Kalshi merger odds' }, { val: '$358.0', sub: 'TSLA +2.19%' }, { val: 'Nov 5', sub: 'Tesla AGM' }];
  const infoColors = [c1, '#F59E0B', '#8B5CF6'];

  let s = base(c1, c2);
  s += badge(54, 'TSLA', c1);
  s += badge(168, 'SPCX', '#3B82F6');
  s += badge(284, 'BREAKING', '#7C3AED');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="160" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="262" font-family="Arial,sans-serif" font-size="26" fill="#FCA5A5">${heroSub}</text>`;
  s += div(290);

  infos.forEach((inf, i) => {
    const cx = 54 + i * 326;
    s += card(cx, 308, 310, 118, infoColors[i]);
    s += `<rect x="${cx + 16}" y="308" width="310" height="10" rx="5" fill="${infoColors[i]}"/>`;
    s += `<text x="${cx + 155}" y="380" font-family="Arial Black,Arial,sans-serif" font-size="38" fill="#fff" text-anchor="middle" font-weight="900">${inf.val}</text>`;
    s += `<text x="${cx + 155}" y="416" font-family="Arial,sans-serif" font-size="19" fill="#D1D5DB" text-anchor="middle">${inf.sub}</text>`;
  });

  s += `<text x="54" y="460" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#F87171" font-weight="900">${ko ? 'Kalshi 합병 확률 추이 (2027년 2월 이전 기준)' : 'Kalshi merger probability trend (before Feb 2027)'}</text>`;
  s += `<text x="54" y="490" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${ko ? 'Walter Bloomberg 보도 — 시장 기대 급속 반영 중' : 'via Walter Bloomberg — market expectations repricing rapidly'}</text>`;
  s += bars;
  s += `<line x1="54" y1="${chartY + chartH}" x2="1026" y2="${chartY + chartH}" stroke="#30363D" stroke-width="1.5"/>`;

  const buls = ko ? [
    'Kalshi 합병 확률 67% — 직전 33%에서 단기간 두 배 급등',
    'TSLA $358 +2.19% — 합병 기대가 주가에 빠르게 선반영 중',
    'Barclays: 12월 6일 AGM 이전 공식 발표 가능성 제시',
    '합산 $3.5T · 올스톡 · 머스크 37% 지분 · 56% 의결권 유지',
    '11월 5일 Tesla 주주총회 — 합병 발표 여부 최대 관심사',
  ] : [
    'Kalshi merger odds hit 67% — doubled from ~33% in just days',
    'TSLA $358 +2.19% — market rapidly pricing in merger premium',
    'Barclays suggests announcement possible before Dec 6 shareholder vote',
    'Combined $3.5T · all-stock · Musk retains 37% stake, 56% voting',
    'Nov 5 Tesla AGM — official merger announcement = key watchpoint',
  ];
  s += keyPoints(876, buls, ko);
  s += footer('2026.10.20');
  return mkSvg(s);
}

// ─── 3. Tesla 주주서한 ─────────────────────────────────────────────────────────
function teslaShareholderLetter(lang) {
  const ko = lang === 'ko';
  const c1 = '#EF4444', c2 = '#FB923C';

  const milestones = ko ? [
    { label: '10M+', title: '누적 인도 대수', sub: '2003년 창업 이후 첫 10M 이정표' },
    { label: 'FSD', title: '190개국 이상 확장', sub: 'Unsupervised FSD 지리 확장 가속' },
    { label: 'Cab', title: 'Cybercab GF텍사스 양산', sub: '로보택시 플릿에 346대 이미 투입' },
    { label: 'MP3', title: 'Megapack 3 출하 시작', sub: '전력망 대형 에너지 저장 신세대' },
    { label: 'TFab', title: 'Terafab 텍사스 착공', sub: '1단계 $16.8B · Optimus 양산 허브' },
    { label: 'JB', title: 'JB Straubel 이사회 복귀', sub: '공동창업자·전 CTO · 배터리 전략' },
  ] : [
    { label: '10M+', title: '10M+ deliveries worldwide', sub: 'First 10M milestone since founding 2003' },
    { label: 'FSD', title: 'FSD in 190+ countries', sub: 'Unsupervised FSD geographic expansion' },
    { label: 'Cab', title: 'Cybercab production at GF TX', sub: '346 units already in robotaxi fleet' },
    { label: 'MP3', title: 'Megapack 3 shipping', sub: 'Next-gen grid-scale energy storage' },
    { label: 'TFab', title: 'Terafab Texas groundbreaking', sub: 'Phase 1 $16.8B · Optimus production' },
    { label: 'JB', title: 'JB Straubel rejoins board', sub: 'Co-founder · battery recycling strategy' },
  ];
  const mColors = [c1, '#FB923C', c1, '#FB923C', c1, '#FB923C'];

  const hero = '10M+';
  const heroSub = ko ? 'Tesla 전 세계 누적 인도 대수 돌파' : 'Tesla cumulative global deliveries';
  const ctx = ko ? '2026.10.20 · Tesla 주주서한 · Robyn Denholm' : '2026.10.20 · Tesla Shareholder Letter · Denholm';

  let s = base(c1, c2);
  s += badge(54, 'TSLA', c1);
  s += badge(168, ko ? '특집' : 'Special', '#B45309');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="130" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="252" font-family="Arial,sans-serif" font-size="26" fill="#FED7AA">${heroSub}</text>`;
  s += div(278);

  // 2-col, 3-row milestone cards
  milestones.forEach((m, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const mx = 54 + col * 494, my = 296 + row * 132;
    s += `<rect x="${mx}" y="${my}" width="474" height="116" rx="14" fill="#161B22" stroke="${mColors[i]}" stroke-width="2"/>`;
    s += `<rect x="${mx + 18}" y="${my + 14}" width="52" height="52" rx="10" fill="${mColors[i]}" opacity="0.15"/>`;
    s += `<text x="${mx + 44}" y="${my + 47}" font-family="Arial Black,Arial,sans-serif" font-size="18" fill="${mColors[i]}" text-anchor="middle" font-weight="900">${m.label}</text>`;
    s += `<text x="${mx + 84}" y="${my + 40}" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">${m.title}</text>`;
    s += `<text x="${mx + 84}" y="${my + 68}" font-family="Arial,sans-serif" font-size="18" fill="#D1D5DB">${m.sub}</text>`;
  });

  // AGM note
  const agmText = ko ? '📅→ AGM 11월 5일 확정  ·  합병 언급 없음' : 'AGM confirmed Nov 5  ·  No merger mention in letter';
  s += `<rect x="54" y="696" width="972" height="64" rx="12" fill="#1A0808" stroke="${c1}" stroke-width="1.5"/>`;
  s += `<text x="540" y="736" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FCA5A5" text-anchor="middle" font-weight="900">${agmText}</text>`;

  const buls = ko ? [
    '전 세계 누적 인도 1,000만 대 — 2003년 창업 이후 첫 10M 이정표',
    'GF텍사스에서 Cybercab 양산 시작 — 플릿에 346대 이미 투입 중',
    'JB Straubel 이사회 복귀 — 배터리 재활용·소재 공급망 전략 강화',
    'Terafab 텍사스 $16.8B 착공 — Optimus 양산·차세대 제조 허브',
    '합병 언급 없음 — 11월 5일 주주총회 공식 발표 여부 주시',
  ] : [
    '10M+ cumulative deliveries worldwide — historic EV industry milestone',
    'Cybercab now in production at GF Texas — 346 units in robotaxi fleet',
    'JB Straubel rejoins board — battery recycling and materials supply strategy',
    'Terafab groundbreaking $16.8B — Optimus production and next-gen manufacturing',
    'No merger mention — Nov 5 shareholder meeting is the next announcement watch',
  ];
  s += keyPoints(782, buls, ko);
  s += footer('2026.10.20');
  return mkSvg(s);
}

// ─── 4. FSD 응급 자동 개입 ────────────────────────────────────────────────────
function fsdEmergencyOverride(lang) {
  const ko = lang === 'ko';
  const c1 = '#EF4444', c2 = '#F97316';

  const triggers = ko ? [
    { label: '충돌', title: '임박한 충돌 감지', sub: '물리적으로 회피 불가 상황 → 자동 회피 기동', color: '#EF4444' },
    { label: '졸음', title: '운전자 부주의·수면 감지', sub: '핸들 접촉·눈 추적으로 감지 시 자동 개입', color: '#F97316' },
    { label: '응급', title: '의료 비상 상황 감지', sub: '비정상 신체 반응 → 갓길 정차 + 긴급 호출', color: '#A855F7' },
  ] : [
    { label: 'CRASH', title: 'Imminent collision detected', sub: 'Auto evasive maneuver when avoidance is impossible', color: '#EF4444' },
    { label: 'SLEEP', title: 'Driver inattention or asleep', sub: 'Wheel contact + eye tracking → auto intervention', color: '#F97316' },
    { label: 'MED', title: 'Medical emergency detected', sub: 'Abnormal body response → safe pullover + 911', color: '#A855F7' },
  ];

  const hero = ko ? '응급 개입' : 'Auto Override';
  const heroSub = ko ? '수동 운전 중에도 FSD 자동 제어 — 4가지 트리거' : 'FSD takes control during manual drive — 4 triggers';
  const ctx = ko ? '2026.10.20 · Tesla FSD 응급 안전 기능' : '2026.10.20 · Tesla FSD Emergency Safety';

  let s = base(c1, c2);
  s += badge(54, 'TSLA', c1);
  s += badge(168, ko ? '종목분석' : 'Analysis', '#991B1B');
  s += badge(ko ? 266 : 306, 'FSD Safety', '#7C3AED');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="196" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="248" font-family="Arial,sans-serif" font-size="26" fill="#FED7AA">${heroSub}</text>`;
  s += div(274);

  triggers.forEach((tr, i) => {
    const ty = 292 + i * 168;
    s += `<rect x="54" y="${ty}" width="972" height="152" rx="14" fill="#161B22" stroke="${tr.color}" stroke-width="2"/>`;
    // Colored label box instead of emoji
    s += `<rect x="72" y="${ty + 24}" width="70" height="70" rx="10" fill="${tr.color}" opacity="0.15"/>`;
    s += `<rect x="72" y="${ty + 24}" width="70" height="10" rx="5" fill="${tr.color}"/>`;
    s += `<text x="107" y="${ty + 75}" font-family="Arial Black,Arial,sans-serif" font-size="19" fill="${tr.color}" text-anchor="middle" font-weight="900">${tr.label}</text>`;
    s += `<text x="158" y="${ty + 58}" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" font-weight="900">${tr.title}</text>`;
    s += `<text x="158" y="${ty + 90}" font-family="Arial,sans-serif" font-size="21" fill="#D1D5DB">${tr.sub}</text>`;
    s += `<rect x="54" y="${ty + 120}" width="972" height="2" fill="${tr.color}" opacity="0.1"/>`;
  });

  // Impact stats
  const stats = ko
    ? [{ label: '적용 차량', val: '800+', sub: '텍사스 로보택시 전 차량' }, { label: 'FSD 국가', val: '190+', sub: '운영 중 국가 수' }, { label: '규제 논거', val: '강화', sub: 'NHTSA 안전 데이터' }]
    : [{ label: 'Robotaxi fleet', val: '800+', sub: 'All TX fleet equipped' }, { label: 'FSD countries', val: '190+', sub: 'Operating countries' }, { label: 'Regulatory', val: 'Building', sub: 'NHTSA safety dataset' }];
  stats.forEach((d, i) => {
    const cx = 54 + i * 326;
    s += card(cx, 806, 310, 110, '#374151');
    s += `<text x="${cx + 155}" y="848" font-family="Arial,sans-serif" font-size="19" fill="#9CA3AF" text-anchor="middle">${d.label}</text>`;
    s += `<text x="${cx + 155}" y="890" font-family="Arial Black,Arial,sans-serif" font-size="32" fill="#fff" text-anchor="middle" font-weight="900">${d.val}</text>`;
    s += `<text x="${cx + 155}" y="910" font-family="Arial,sans-serif" font-size="17" fill="#6B7280" text-anchor="middle">${d.sub}</text>`;
  });

  const buls = ko ? [
    '충돌·부주의·수면·의료비상 4가지 트리거 → 수동 중 자동 제어',
    '텍사스 로보택시 800대 전 차량 탑재 운행 중 — 실시간 데이터 축적',
    'NHTSA 등 규제 기관 안전 데이터 논거 지속 강화',
    'FSD가 단순 보조를 넘어 생명안전 시스템으로 진화 확인',
  ] : [
    '4 triggers: crash · inattention · asleep · medical emergency all covered',
    'All 800+ Texas robotaxi fleet vehicles running this feature actively',
    'Real-world safety dataset building for NHTSA regulatory approval',
    'FSD evolves from driver assistance into certified life-safety system',
  ];
  s += keyPoints(932, buls, ko);
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
    { label: 'Starship', title: 'Starship 비행 시뮬레이션', sub: '재착륙 정밀도 강화학습 파이프라인' },
    { label: 'SLink', title: 'Starlink 트래픽 최적화', sub: '수만 대 위성 실시간 네트워크 관리' },
    { label: 'Auto', title: 'AI 추론 · 자율비행', sub: 'Tesla 공동 자율주행 연산 가능성' },
  ] : [
    { label: 'Starship', title: 'Starship flight simulation', sub: 'Reinforcement learning for precision landing' },
    { label: 'SLink', title: 'Starlink traffic optimization', sub: 'Real-time management of 10,000+ satellites' },
    { label: 'Auto', title: 'AI inference · autonomy', sub: 'Potential joint Tesla autonomous compute' },
  ];
  const ucColors = ['#8B5CF6', '#3B82F6', '#10B981'];

  const hero = '5-6+';
  const heroSub = ko ? 'GPU 클러스터 · 2년 미만 완성 · 브라운스빌' : 'GPU clusters · built in under 2 years · Brownsville';
  const ctx = ko ? '2026.10.20 · SpaceX 자체 AI 인프라' : '2026.10.20 · SpaceX self-built AI infrastructure';

  let s = base(c1, c2);
  s += badge(54, 'SPCX', c1);
  s += badge(170, ko ? '종목분석' : 'Analysis', '#4C1D95');
  s += badge(ko ? 266 : 306, 'AI DC', '#1D4ED8');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="196" font-family="Arial Black,Arial,sans-serif" font-size="150" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="248" font-family="Arial,sans-serif" font-size="26" fill="#C4B5FD">${heroSub}</text>`;
  s += div(274);

  // Site cards (compact)
  sites.forEach((site, i) => {
    const sy = 292 + i * 118;
    s += `<rect x="54" y="${sy}" width="972" height="104" rx="14" fill="#161B22" stroke="${site.color}" stroke-width="2"/>`;
    s += `<rect x="54" y="${sy}" width="972" height="8" rx="4" fill="${site.color}" opacity="0.6"/>`;
    s += `<text x="84" y="${sy + 48}" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">${site.name}</text>`;
    s += `<text x="84" y="${sy + 78}" font-family="Arial,sans-serif" font-size="20" fill="#C4B5FD">${ko ? `${site.clusters}개 GPU 클러스터 · ${site.status}` : `${site.clusters} GPU cluster${site.clusters > 1 ? 's' : ''} · ${site.status}`}</text>`;
    // Cluster dots (right side, within content area)
    const dots = '●'.repeat(site.clusters);
    s += `<text x="900" y="${sy + 64}" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="${site.color}" text-anchor="middle" font-weight="900">${dots}</text>`;
  });

  // Why self-built box
  const why = ko
    ? 'AWS · Google · Azure에서 필요 규모 컴퓨팅을 적시에 조달 불가 → 자체 구축 결정'
    : 'AWS · Google · Azure could not supply needed compute at scale → self-build decision';
  s += `<rect x="54" y="528" width="972" height="60" rx="12" fill="#1E1B4B" stroke="${c1}" stroke-width="1.5"/>`;
  const whyLines = wrapText(why, ko ? 36 : 60, ko);
  whyLines.forEach((l, i) => {
    s += `<text x="540" y="${544 + i * 26}" font-family="Arial,sans-serif" font-size="21" fill="#C4B5FD" text-anchor="middle">${l}</text>`;
  });

  // Use cases
  s += `<text x="54" y="616" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="${c1}" font-weight="900">${ko ? '주요 활용 사례' : 'Primary use cases'}</text>`;
  useCases.forEach((uc, i) => {
    const uy = 630 + i * 106;
    s += `<rect x="54" y="${uy}" width="972" height="92" rx="12" fill="#161B22" stroke="#374151" stroke-width="1.5"/>`;
    s += `<rect x="72" y="${uy + 14}" width="56" height="56" rx="10" fill="${ucColors[i]}" opacity="0.15"/>`;
    s += `<rect x="72" y="${uy + 14}" width="56" height="8" rx="4" fill="${ucColors[i]}"/>`;
    s += `<text x="100" y="${uy + 54}" font-family="Arial Black,Arial,sans-serif" font-size="14" fill="${ucColors[i]}" text-anchor="middle" font-weight="900">${uc.label}</text>`;
    s += `<text x="144" y="${uy + 42}" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">${uc.title}</text>`;
    s += `<text x="144" y="${uy + 70}" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">${uc.sub}</text>`;
  });

  const buls = ko ? [
    'SpaceX, 브라운스빌에 5~6개 GPU 클러스터 2년 내 독자 구축',
    'AWS·Google·Azure 조달 불가 → 자체 인프라로 컴퓨팅 내재화',
    'Starship 재착륙·Starlink 네트워크·자율비행 3대 사용 사례',
    'AI 컴퓨팅이 발사·Starlink에 이은 SPCX 3번째 사업 축 형성',
    '클라우드 인프라 멀티플 논거 — 시장 미반영 옵션 가치 존재',
  ] : [
    'SpaceX self-built 5-6+ GPU clusters in Brownsville under 2 years',
    'AWS/Google/Azure could not supply at needed scale → internal build',
    'Three use cases: Starship landing, Starlink optimization, autonomy',
    'AI compute emerging as SPCX 3rd revenue axis after launch + Starlink',
    'Cloud infra multiple argument — unpriced option value forming in SPCX',
  ];
  s += keyPoints(958, buls, ko);
  s += footer('2026.10.20');
  return mkSvg(s);
}

// ─── 6. Anthropic $45B ────────────────────────────────────────────────────────
function anthropic45B(lang) {
  const ko = lang === 'ko';
  const c1 = '#F59E0B', c2 = '#EF4444';

  const deals = ko
    ? [{ name: 'Anthropic × Niazde', val: 45, color: 'url(#barG)' }, { name: 'MS × OpenAI 인프라', val: 13, color: '#374151' }, { name: '삼성전자 연간 매출', val: 23, color: '#1F2937' }]
    : [{ name: 'Anthropic × Niazde', val: 45, color: 'url(#barG)' }, { name: 'Microsoft × OpenAI', val: 13, color: '#374151' }, { name: 'Samsung annual rev.', val: 23, color: '#1F2937' }];

  const chartH = 260, chartY = 630, chartX = 54, bw = 200;
  const bGap = (972 - deals.length * bw) / (deals.length + 1);
  let bars = '';
  deals.forEach((d, i) => {
    const bH = Math.round((d.val / 50) * chartH);
    const bx = chartX + bGap + i * (bw + bGap);
    bars += `<rect x="${bx}" y="${chartY + chartH - bH}" width="${bw}" height="${bH}" rx="8" fill="${d.color}"/>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH - bH - 12}" font-family="Arial Black,Arial,sans-serif" font-size="${i === 0 ? 28 : 22}" fill="${i === 0 ? '#FCD34D' : '#6B7280'}" text-anchor="middle" font-weight="900">$${d.val}B</text>`;
    const nameLines = wrapText(d.name, ko ? 10 : 16, ko);
    nameLines.forEach((l, li) => {
      bars += `<text x="${bx + bw/2}" y="${chartY + chartH + 30 + li * 26}" font-family="Arial,sans-serif" font-size="18" fill="${i === 0 ? '#FCD34D' : '#6B7280'}" text-anchor="middle">${l}</text>`;
    });
  });

  const hero = '$45B';
  const heroSub = ko ? 'Anthropic · Niazde 컴퓨팅 구매 협상 (Bloomberg)' : 'Anthropic · Niazde compute deal in talks (Bloomberg)';
  const ctx = ko ? '2026.10.20 · AI 인프라 매크로' : '2026.10.20 · AI Infrastructure Macro';

  let s = base(c1, c2);
  s += badge(54, ko ? '매크로' : 'Macro', c1);
  s += badge(ko ? 154 : 180, 'Anthropic', '#7C3AED');
  s += badge(ko ? 286 : 328, 'AI Infra', '#1D4ED8');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="160" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="262" font-family="Arial,sans-serif" font-size="26" fill="#FCD34D">${heroSub}</text>`;
  s += div(288);

  const points = ko ? [
    'Niazde: 세계 최대 데이터센터 개발사 · 역대 최대 단일 AI 컴퓨팅 계약 가능',
    'Claude 4.x 추론 수요 급증 → AI 추론 비용이 학습 비용을 추월하는 시대 개막',
  ] : [
    'Niazde: world largest DC developer · potentially largest single AI compute deal ever',
    'Claude 4.x inference demand surge → AI inference now surpassing training costs',
  ];
  points.forEach((p, i) => {
    const py = 306 + i * 80;
    s += `<rect x="54" y="${py}" width="972" height="68" rx="10" fill="#161B22" stroke="#374151" stroke-width="1.5"/>`;
    s += `<circle cx="80" cy="${py + 34}" r="7" fill="${i === 0 ? c1 : c2}"/>`;
    s += `<text x="100" y="${py + 40}" font-family="Arial,sans-serif" font-size="21" fill="#D1D5DB">${p}</text>`;
  });

  s += `<text x="54" y="500" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="${c1}" font-weight="900">${ko ? '컴퓨팅 계약 규모 비교 ($B)' : 'Compute deal scale comparison ($B)'}</text>`;
  s += `<text x="54" y="526" font-family="Arial,sans-serif" font-size="19" fill="#6B7280">${ko ? '비교용 참고치 (공개 추정치 기준)' : 'Reference comparisons (public estimates)'}</text>`;
  s += bars;
  s += `<line x1="54" y1="${chartY + chartH}" x2="1026" y2="${chartY + chartH}" stroke="#30363D" stroke-width="1.5"/>`;

  const buls = ko ? [
    '$45B = 역대 최대 단일 AI 컴퓨팅 계약 가능성 — 전례 없는 규모',
    'AI 추론 비용이 모델 학습 비용을 추월하는 시대 개막',
    '빅테크 AI 계약이 GPU 수량에서 DC 장기 약정으로 진화 중',
    '전력·냉각·부지 통합 공급사 Niazde 협상력 급격히 상승',
  ] : [
    '$45B = potentially the largest single AI compute contract ever',
    'AI inference costs now surpassing model training — fundamental cost shift',
    'Big-tech AI contracts evolving from GPU orders to long-term DC commitments',
    'Niazde and integrated power+cooling+land providers gain major pricing power',
  ];
  s += keyPoints(988, buls, ko);
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

  const pwrData = ko
    ? [{ name: 'Meta Prometheus', mw: 1000, color: 'url(#barG)' }, { name: '일반 대형 DC', mw: 100, color: '#374151' }, { name: 'GPU 단독 클러스터', mw: 200, color: '#1D4ED8' }]
    : [{ name: 'Meta Prometheus', mw: 1000, color: 'url(#barG)' }, { name: 'Typical large DC', mw: 100, color: '#374151' }, { name: 'GPU-only cluster', mw: 200, color: '#1D4ED8' }];

  const chartH = 240, chartY = 700, chartX = 54, bw = 200;
  const bGap = (972 - pwrData.length * bw) / (pwrData.length + 1);
  let bars = '';
  pwrData.forEach((d, i) => {
    const bH = Math.round((d.mw / 1100) * chartH);
    const bx = chartX + bGap + i * (bw + bGap);
    bars += `<rect x="${bx}" y="${chartY + chartH - bH}" width="${bw}" height="${bH}" rx="8" fill="${d.color}"/>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH - bH - 12}" font-family="Arial Black,Arial,sans-serif" font-size="${i === 0 ? 28 : 20}" fill="${i === 0 ? '#93C5FD' : '#6B7280'}" text-anchor="middle" font-weight="900">${d.mw >= 1000 ? `${d.mw / 1000}GW` : `${d.mw}MW`}</text>`;
    const nameLines = wrapText(d.name, ko ? 10 : 14, ko);
    nameLines.forEach((l, li) => {
      bars += `<text x="${bx + bw/2}" y="${chartY + chartH + 30 + li * 24}" font-family="Arial,sans-serif" font-size="17" fill="${i === 0 ? '#93C5FD' : '#6B7280'}" text-anchor="middle">${l}</text>`;
    });
  });

  let s = base(c1, c2);
  s += badge(54, ko ? '섹터' : 'Sector', c1);
  s += badge(ko ? 150 : 184, 'Meta', '#1877F2');
  s += badge(ko ? 234 : 270, 'Prometheus', '#1D4ED8');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ctx}</text>`;
  s += `<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="170" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="252" font-family="Arial,sans-serif" font-size="26" fill="#BAE6FD">${heroSub}</text>`;
  s += div(278);

  const infos = ko
    ? [{ label: '전력 규모', val: '1GW', sub: '소도시 연간 전력량' }, { label: 'Muse Wonder', val: '학습 완료', sub: '멀티모달 파운데이션 AI' }, { label: '위치', val: '뉴올버니', sub: 'Ohio AI 허브' }]
    : [{ label: 'Power scale', val: '1GW', sub: 'Equals a small city' }, { label: 'Muse Wonder', val: 'Trained', sub: 'Multimodal foundation AI' }, { label: 'Location', val: 'New Albany', sub: 'Ohio AI data center hub' }];
  infos.forEach((inf, i) => {
    const cx = 54 + i * 326;
    s += card(cx, 296, 310, 120, c1);
    s += `<text x="${cx + 155}" y="340" font-family="Arial,sans-serif" font-size="20" fill="${c1}" text-anchor="middle">${inf.label}</text>`;
    s += `<text x="${cx + 155}" y="384" font-family="Arial Black,Arial,sans-serif" font-size="32" fill="#fff" text-anchor="middle" font-weight="900">${inf.val}</text>`;
    s += `<text x="${cx + 155}" y="408" font-family="Arial,sans-serif" font-size="18" fill="#93C5FD" text-anchor="middle">${inf.sub}</text>`;
  });

  s += `<text x="54" y="448" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="${c1}" font-weight="900">${ko ? 'Muse 파운데이션 모델 (Prometheus 학습)' : 'Muse foundation models trained on Prometheus'}</text>`;
  const museModels = ko
    ? ['Muse Wonder — 텍스트·이미지·비디오 통합 멀티모달 파운데이션 모델', 'Reels AI · Instagram 생성 AI · Facebook 피드 알고리즘에 순차 통합']
    : ['Muse Wonder — multimodal foundation AI for text, image, video', 'Rolling out to Reels AI, Instagram gen-AI, Facebook feed algorithms'];
  museModels.forEach((m, i) => {
    s += `<rect x="54" y="${466 + i * 72}" width="972" height="58" rx="10" fill="#0C1A2E" stroke="#1D4ED8" stroke-width="1.5"/>`;
    s += `<text x="84" y="${466 + i * 72 + 34}" font-family="Arial,sans-serif" font-size="21" fill="#93C5FD">${m}</text>`;
  });

  s += `<text x="54" y="634" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="${c1}" font-weight="900">${ko ? '전력 규모 비교 (MW)' : 'Power scale comparison (MW)'}</text>`;
  s += bars;
  s += `<line x1="54" y1="${chartY + chartH}" x2="1026" y2="${chartY + chartH}" stroke="#30363D" stroke-width="1.5"/>`;

  const buls = ko ? [
    'Meta, 1GW 슈퍼클러스터로 AI 학습 전력 경쟁 새 기준 제시',
    'Muse Wonder = 텍스트·이미지·비디오 통합 멀티모달 파운데이션 AI',
    'Instagram·Reels·Facebook 광고 알고리즘에 순차 통합 예정',
    'AI 경쟁이 전력 확보로 전환 — 전력망·냉각 기업이 수혜',
  ] : [
    'Meta sets new AI training power benchmark with 1GW Prometheus',
    'Muse Wonder = multimodal foundation AI for text, image, video',
    'Rolling out to Instagram Reels, Facebook feed ad algorithms',
    'AI race shifts to power access — grid infrastructure companies win',
  ];
  s += keyPoints(1012, buls, ko);
  s += footer('2026.10.20');
  return mkSvg(s);
}

// ─── 8. NVIDIA $430B ──────────────────────────────────────────────────────────
function nvda430B(lang) {
  const ko = lang === 'ko';
  const c1 = '#10B981', c2 = '#60A5FA';

  const companies = ko
    ? [{ name: 'NVDA AI칩 2026E', val: 430, color: 'url(#barG)' }, { name: 'AMD AI GPU 2026E', val: 30, color: '#EF4444' }, { name: 'Intel 전체 2026E', val: 50, color: '#374151' }]
    : [{ name: 'NVDA AI chip 2026E', val: 430, color: 'url(#barG)' }, { name: 'AMD AI GPU 2026E', val: 30, color: '#EF4444' }, { name: 'Intel total 2026E', val: 50, color: '#374151' }];

  const chartH = 240, chartY = 600, chartX = 54, bw = 210;
  const bGap = (972 - companies.length * bw) / (companies.length + 1);
  let bars = '';
  companies.forEach((d, i) => {
    const bH = Math.round((d.val / 460) * chartH);
    const bx = chartX + bGap + i * (bw + bGap);
    bars += `<rect x="${bx}" y="${chartY + chartH - bH}" width="${bw}" height="${bH}" rx="8" fill="${d.color}"/>`;
    bars += `<text x="${bx + bw/2}" y="${chartY + chartH - bH - 12}" font-family="Arial Black,Arial,sans-serif" font-size="${i === 0 ? 30 : 22}" fill="${i === 0 ? '#34D399' : (i === 1 ? '#FCA5A5' : '#6B7280')}" text-anchor="middle" font-weight="900">$${d.val}B</text>`;
    const nameLines = wrapText(d.name, ko ? 9 : 14, ko);
    nameLines.forEach((l, li) => {
      bars += `<text x="${bx + bw/2}" y="${chartY + chartH + 30 + li * 24}" font-family="Arial,sans-serif" font-size="17" fill="${i === 0 ? '#34D399' : (i === 1 ? '#EF4444' : '#6B7280')}" text-anchor="middle">${l}</text>`;
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
  s += `<text x="54" y="206" font-family="Arial Black,Arial,sans-serif" font-size="140" fill="url(#hG)" font-weight="900">${hero}</text>`;
  s += `<text x="54" y="256" font-family="Arial,sans-serif" font-size="26" fill="#6EE7B7">${heroSub}</text>`;
  s += div(280);

  const stats = ko
    ? [{ label: 'NVDA AI칩 2026E', val: '$430B', sub: '역대 단일 품목 최대', color: c1 }, { label: 'AMD AI GPU 전망', val: '240만→60만', sub: '-75% 대폭 하향', color: '#EF4444' }, { label: 'Blackwell NVL72', val: '$3M+', sub: '랙 시스템 단가', color: '#60A5FA' }]
    : [{ label: 'NVDA AI chip 2026E', val: '$430B', sub: 'Largest single product ever', color: c1 }, { label: 'AMD AI GPU cut', val: '2.4M→600K', sub: '75% reduction', color: '#EF4444' }, { label: 'Blackwell NVL72', val: '$3M+', sub: 'Per rack system', color: '#60A5FA' }];
  stats.forEach((st, i) => {
    const cx = 54 + i * 326;
    s += card(cx, 298, 310, 118, st.color);
    s += `<text x="${cx + 155}" y="340" font-family="Arial,sans-serif" font-size="18" fill="${st.color}" text-anchor="middle">${st.label}</text>`;
    s += `<text x="${cx + 155}" y="384" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#fff" text-anchor="middle" font-weight="900">${st.val}</text>`;
    s += `<text x="${cx + 155}" y="408" font-family="Arial,sans-serif" font-size="17" fill="#9CA3AF" text-anchor="middle">${st.sub}</text>`;
  });

  // AMD warning note
  const amdNote = ko
    ? '▲ AMD: AI GPU 출하 전망 240만 대 → 60만 대 (-75%) — CUDA 생태계 종속 예상 초과'
    : '▲ AMD: AI GPU forecast cut 2.4M → 600K (-75%) — CUDA lock-in far stronger than expected';
  s += `<rect x="54" y="430" width="972" height="58" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>`;
  s += `<text x="540" y="467" font-family="Arial,sans-serif" font-size="20" fill="#FCA5A5" text-anchor="middle">${amdNote}</text>`;

  s += `<text x="54" y="516" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="${c1}" font-weight="900">${ko ? '2026E AI 칩 매출 비교 ($B 추정)' : '2026E AI chip revenue comparison ($B estimate)'}</text>`;
  s += bars;
  s += `<line x1="54" y1="${chartY + chartH}" x2="1026" y2="${chartY + chartH}" stroke="#30363D" stroke-width="1.5"/>`;

  const buls = ko ? [
    'NVDA 2026년 $430B — 단일 제품 카테고리 역대 최대 규모',
    'AMD AI GPU 전망 240만→60만 (-75%) — CUDA 종속 예상 초과',
    'Blackwell NVL72 랙 $3M+ — Hopper 대비 단가 급등 매출 가속',
    'CUDA·NVLink·NIM이 전환 비용 극대화 — 구조적 시장 지배력',
  ] : [
    'NVDA 2026 chip sales ~$430B — unprecedented single-product scale',
    'AMD AI GPU cut 75%: CUDA lock-in far stronger than market expected',
    'Blackwell NVL72 at $3M+ per rack — ASP surge vs Hopper accelerates revenue',
    'CUDA + NVLink + NIM software stack maximizes switching costs structurally',
  ];
  s += keyPoints(896, buls, ko);
  s += footer('2026.10.20');
  return mkSvg(s);
}

// ─── 9. 한장 요약 ─────────────────────────────────────────────────────────────
function summary20261020(lang) {
  const ko = lang === 'ko';
  const c1 = '#A855F7', c2 = '#3B82F6';

  const catColors = ['#10B981','#EF4444','#F59E0B','#EF4444','#8B5CF6','#F59E0B','#3B82F6','#10B981','#6B7280'];

  const items = ko ? [
    { num: '01', title: 'SPCX Q3 첫 분기 흑자 달성', desc: 'adj. EPS $0.16 · 매출 $13.0B · Morgan Stanley $350 PT' },
    { num: '02', title: 'TSLA-SPCX 합병 확률 67%로 급등', desc: 'Kalshi 예측시장 · Walter Bloomberg · TSLA $358 +2.19%' },
    { num: '03', title: 'Tesla 주주서한 — Robyn Denholm', desc: '1,000만 대 · Cybercab 양산 · AGM 11/5 확정' },
    { num: '04', title: 'FSD 응급 자동 개입 기능 확인', desc: '충돌·부주의·수면·의료비상 → 수동 운전 중 자동 제어' },
    { num: '05', title: 'SpaceX AI DC 5~6개 클러스터 완성', desc: '브라운스빌 GPU · 멤피스 Minihard · 2년 내 완성' },
    { num: '06', title: 'Anthropic $45B 컴퓨팅 구매 협상', desc: 'Bloomberg · Niazde · 역대 최대 단일 AI 컴퓨팅 계약' },
    { num: '07', title: 'Meta Prometheus 1GW 슈퍼클러스터 가동', desc: '뉴올버니 Ohio · Muse Wonder 파운데이션 모델 학습' },
    { num: '08', title: 'NVDA 2026년 $430B 칩 판매 궤도', desc: 'H200 $50K · AMD AI GPU 전망 75% 대폭 하향' },
    { num: '09', title: 'TSLA Q3 어닝 내일 (Oct 21)', desc: '합병 언급·가이던스·로보택시 현황 모두 최대 관심사' },
  ] : [
    { num: '01', title: 'SPCX Q3 first profitable quarter ever', desc: 'adj. EPS $0.16 · Rev $13.0B · Morgan Stanley $350 PT' },
    { num: '02', title: 'TSLA-SPCX merger odds hit 67%', desc: 'Kalshi · Walter Bloomberg · TSLA $358 +2.19%' },
    { num: '03', title: 'Tesla shareholder letter — Robyn Denholm', desc: '10M+ deliveries · Cybercab production · AGM Nov 5' },
    { num: '04', title: 'FSD emergency auto-override confirmed', desc: 'Crash · inattention · asleep · medical emergency triggers' },
    { num: '05', title: 'SpaceX AI DC 5-6+ clusters built', desc: 'Brownsville GPU · Memphis Minihard · under 2 years' },
    { num: '06', title: 'Anthropic $45B compute deal in talks', desc: 'Bloomberg · Niazde · largest single AI compute deal ever' },
    { num: '07', title: 'Meta Prometheus 1GW supercluster live', desc: 'New Albany, Ohio · Muse Wonder foundation model trained' },
    { num: '08', title: 'NVIDIA on pace for $430B chip sales 2026', desc: '$50K per H200 · AMD AI GPU forecast slashed -75%' },
    { num: '09', title: 'TSLA Q3 earnings report tomorrow Oct 21', desc: 'Merger comment · guidance · robotaxi update most watched' },
  ];

  const titleLine = ko ? '2026년 10월 20일 · 9개 토픽 한장 요약' : 'Oct 20, 2026 · 9-Topic Daily Snapshot';

  let s = base(c1, c2);
  s += badge(54, ko ? '한장요약' : 'Daily Summary', c1);
  s += badge(ko ? 188 : 246, '2026.10.20', '#1D4ED8');
  s += `<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">${ko ? '2026.10.20 · investus.kr · 9개 토픽' : '2026.10.20 · investus.kr · 9 topics'}</text>`;
  s += `<text x="54" y="174" font-family="Arial Black,Arial,sans-serif" font-size="46" fill="url(#hG)" font-weight="900">${titleLine}</text>`;
  s += div(194);

  items.forEach((it, i) => {
    const iy = 210 + i * 112;
    const rowBg = i % 2 === 0 ? '#0D1117' : '#161B22';
    s += `<rect x="54" y="${iy}" width="972" height="104" rx="12" fill="${rowBg}" stroke="#21262D" stroke-width="1"/>`;
    // Number badge
    s += `<text x="98" y="${iy + 44}" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="url(#hG)" text-anchor="middle" font-weight="900">${it.num}</text>`;
    // Category color circle (replaces emoji)
    s += `<circle cx="148" cy="${iy + 42}" r="11" fill="${catColors[i]}" opacity="0.85"/>`;
    // Title
    s += `<text x="174" y="${iy + 46}" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="900">${it.title}</text>`;
    // Desc with proper wrap
    const descLines = wrapText(it.desc, ko ? 36 : 52, ko);
    descLines.forEach((l, li) => {
      s += `<text x="174" y="${iy + 70 + li * 24}" font-family="Arial,sans-serif" font-size="19" fill="#8B949E">${l}</text>`;
    });
  });

  s += footer('2026.10.20');
  return mkSvg(s);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  await save('summary-20261020',                        summary20261020('ko'));
  await save('summary-20261020-en',                     summary20261020('en'));
  await save('spcx-q3-earnings-preview-20261020',       spcxQ3Earnings('ko'));
  await save('spcx-q3-earnings-preview-20261020-en',    spcxQ3Earnings('en'));
  await save('tsla-spcx-merger-67pct-20261020',         mergerOdds67('ko'));
  await save('tsla-spcx-merger-67pct-20261020-en',      mergerOdds67('en'));
  await save('tsla-shareholder-letter-20261020',        teslaShareholderLetter('ko'));
  await save('tsla-shareholder-letter-20261020-en',     teslaShareholderLetter('en'));
  await save('tsla-fsd-emergency-override-20261020',    fsdEmergencyOverride('ko'));
  await save('tsla-fsd-emergency-override-20261020-en', fsdEmergencyOverride('en'));
  await save('spcx-ai-data-centers-20261020',           spcxAIDC('ko'));
  await save('spcx-ai-data-centers-20261020-en',        spcxAIDC('en'));
  await save('anthropic-45b-compute-20261020',          anthropic45B('ko'));
  await save('anthropic-45b-compute-20261020-en',       anthropic45B('en'));
  await save('meta-prometheus-1gw-20261020',            metaPrometheus('ko'));
  await save('meta-prometheus-1gw-20261020-en',         metaPrometheus('en'));
  await save('nvda-430b-chips-20261020',                nvda430B('ko'));
  await save('nvda-430b-chips-20261020-en',             nvda430B('en'));
  console.log('\n✅ All 18 charts generated for 2026-10-20 v2');
})();
