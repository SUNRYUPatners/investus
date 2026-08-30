// 2026.08.31 리포트 SVG 생성기
// 레이아웃 6종을 소재별로 배분 (하나의 레이아웃이 세트의 40%를 넘지 않도록)
//   L1 heroKpi        숫자 히어로 + KPI 카드 3개 + 인용 + 왜중요한가
//   L2 threeStat      이모지 히어로 + 3-스탯 카드 + 상세 리스트 박스
//   L3 checkFeature   체크/이모지 히어로 + 피처 카드 3개 + 큰 인용박스
//   L4 badgeQuote     배지 + 문구 히어로 + 아이콘 카드 3개 + 큰 인용박스
//   L5 beforeAfter    Before → After 비교 박스 + 카드 3개
//   L6 breakingGrid   BREAKING 배지 + 히어로 밴드 + 4칸 그리드 + 컨텍스트
//   ROWS              한장요약 가로 줄 나열 (summary-20260702 / 20260828 기준)
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.31';
const TAG = '20260831';

const P = {
  MACRO:  { fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
  JPY:    { fg:'#facc15', fg2:'#eab308', bg2:'#1a1600', card:'#1c1805' },
  RATES:  { fg:'#ef4444', fg2:'#dc2626', bg2:'#1a0a0a', card:'#1c0d0d' },
  NVDA:   { fg:'#60a5fa', fg2:'#3b82f6', bg2:'#06121f', card:'#0a1420' },
  TSLA:   { fg:'#4ade80', fg2:'#22c55e', bg2:'#061209', card:'#0a1a0a' },
  SPCX:   { fg:'#c084fc', fg2:'#a78bfa', bg2:'#140b1f', card:'#1a0f2a' },
  AMZN:   { fg:'#ff9900', fg2:'#e58600', bg2:'#1a0e00', card:'#201408' },
  AI:     { fg:'#a78bfa', fg2:'#8b5cf6', bg2:'#120b1f', card:'#180f28' },
  KOSPI:  { fg:'#38bdf8', fg2:'#0ea5e9', bg2:'#061520', card:'#0a1a26' },
  FLOW:   { fg:'#22d3ee', fg2:'#06b6d4', bg2:'#06171c', card:'#0a1c22' },
  SEC:    { fg:'#60a5fa', fg2:'#3b82f6', bg2:'#06121f', card:'#0a1420' },
  HYNIX:  { fg:'#f59e0b', fg2:'#d97706', bg2:'#1a1205', card:'#201408' },
  BTC:    { fg:'#f7931a', fg2:'#e07c0a', bg2:'#1a0f00', card:'#201408' },
  GOLD:   { fg:'#facc15', fg2:'#d4a017', bg2:'#1a1600', card:'#1c1805' },
  POLICY: { fg:'#a78bfa', fg2:'#8b5cf6', bg2:'#120b1f', card:'#180f28' },
  JEONSE: { fg:'#fb923c', fg2:'#f97316', bg2:'#1a0d02', card:'#20130a' },
};

const BRAND_KO = 'investus.kr SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE';
const BRAND_EN = 'investus.kr SRP Chief Investment Officer · NOT FINANCIAL ADVICE';

function esc(s){ return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function estimatePxWidth(text, fontSize, isBold){
  const b = isBold ? 1.13 : 1.0;
  let w = 0;
  for(const c of String(text)){
    if(/[가-힣一-龥ぁ-ゟァ-ヿ]/.test(c)) w += fontSize * b;
    else if(/\s/.test(c)) w += fontSize * 0.30;
    else if(/[·—–:%]/.test(c)) w += fontSize * 0.45;
    else if(/[iljI!.,;'"`()]/.test(c)) w += fontSize * 0.32 * b;
    else if(/[mwMW]/.test(c)) w += fontSize * 0.85 * b;
    else if(/[A-Z0-9$]/.test(c)) w += fontSize * 0.64 * b;
    else w += fontSize * 0.56 * b;
  }
  return w;
}

/** 폭을 넘으면 여러 줄로 나눠 <text> 반환 */
function ml(text, x, y, fontSize, maxPx, maxLines, lh, attrs){
  const bold = /font-weight="?(bold|[89]00)/i.test(attrs) || /Arial Black/.test(attrs);
  const est = (t) => estimatePxWidth(t, fontSize, bold);
  if(est(text) <= maxPx) return `  <text x="${x}" y="${y}" ${attrs}>${esc(text)}</text>`;
  const words = String(text).split(/(\s+)/).filter(s => s !== '');
  const parts = [];
  for(const wd of words){
    if(est(wd) <= maxPx){ parts.push(wd); continue; }
    let tmp = wd;
    while(est(tmp) > maxPx){
      let cut = 1;
      while(cut < tmp.length && est(tmp.slice(0, cut+1)) <= maxPx) cut++;
      parts.push(tmp.slice(0, cut));
      tmp = tmp.slice(cut);
    }
    if(tmp) parts.push(tmp);
  }
  const lines = []; let cur = '';
  for(const p of parts){
    if(est(cur + p) <= maxPx){ cur += p; continue; }
    if(cur.trim()) lines.push(cur.trim());
    cur = /^\s+$/.test(p) ? '' : p;
  }
  if(cur.trim()) lines.push(cur.trim());
  const out = lines.slice(0, maxLines);
  if(lines.length > maxLines){
    let last = out[maxLines-1];
    while(last.length > 1 && est(last + '…') > maxPx) last = last.slice(0, -1);
    out[maxLines-1] = last + '…';
  }
  return out.map((l, i) =>
    `  <text x="${x}" y="${y + i*lh}" ${attrs}>${esc(l)}</text>`).join('\n');
}

function head(p, badge, ko){
  const bw = Math.max(110, Math.min(230, Math.round(estimatePxWidth(badge, 16, true) + 44)));
  return `  <rect width="1080" height="1080" fill="url(#bg)"/>
  <rect width="1080" height="1080" fill="none" stroke="#1f2937" stroke-width="2"/>
  <rect x="0" y="0" width="1080" height="5" fill="url(#g)"/>
  <rect x="40" y="20" width="${bw}" height="38" rx="19" fill="${p.fg}30" stroke="${p.fg}" stroke-width="1.5"/>
  <text x="${40 + bw/2}" y="44" font-family="Arial Black,Arial" font-size="16" font-weight="900" fill="${p.fg}" text-anchor="middle">${esc(badge)}</text>
  <text x="540" y="46" font-family="Arial" font-size="13" fill="#6b7280" text-anchor="middle" letter-spacing="3">INVESTUS DAILY REPORT</text>
  <rect x="900" y="20" width="148" height="38" rx="19" fill="#1f2937" stroke="#374151"/>
  <text x="974" y="44" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle">${DATE}</text>`;
}

function shell(p, inner){
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0d1117"/><stop offset="100%" style="stop-color:${p.bg2}"/></linearGradient>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${p.fg}"/><stop offset="100%" style="stop-color:${p.fg2}"/></linearGradient>
  </defs>
${inner}
</svg>`;
}

function foot(p, footer, ko, y){
  return `  <text x="540" y="${y}" font-family="Arial" font-size="16" fill="#374151" text-anchor="middle">${esc(footer)} · ${DATE}</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#g)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${ko ? BRAND_KO : BRAND_EN}</text>`;
}

function noteBox(p, o, y, h, ko){
  return `  <rect x="60" y="${y}" width="960" height="${h}" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1"/>
  <text x="540" y="${y+30}" font-family="Arial" font-size="18" fill="${p.fg}" text-anchor="middle">${esc(o.noteHead || (ko ? '왜 중요한가' : 'Why it matters'))}</text>
${ml(o.noteSub, 540, y+62, 16, 940, 4, 22, `font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle"`)}`;
}

function quoteBox(p, text, y, h, size, maxLines, lh){
  return `  <rect x="60" y="${y}" width="960" height="${h}" rx="16" fill="#0f172a" stroke="#374151"/>
${ml(text, 540, y+46, size, 930, maxLines, lh, `font-family="Arial" font-size="${size}" fill="${p.fg}" text-anchor="middle"`)}`;
}

// ── L1 · 숫자 히어로 + KPI 카드 3개 + 인용 + 왜중요한가 ─────────────────────
function L1(o, ko){
  const p = P[o.pal];
  const cards = o.cards.map((c, i) => {
    const x = [60, 390, 720][i];
    return `
  <rect x="${x}" y="402" width="300" height="220" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
  <text x="${x+150}" y="450" font-family="Arial" font-size="36" text-anchor="middle">${c.icon}</text>
${ml(c.big, x+150, 494, 22, 268, 1, 24, `font-family="Arial Black,Arial" font-size="22" font-weight="900" fill="${p.fg}" text-anchor="middle"`)}
${ml(c.mid, x+150, 528, 18, 268, 2, 22, `font-family="Arial" font-size="18" fill="#9ca3af" text-anchor="middle"`)}
${ml(c.sub, x+150, 586, 15, 272, 2, 19, `font-family="Arial" font-size="15" fill="#6b7280" text-anchor="middle"`)}`;
  }).join('');
  return shell(p, `${head(p, o.badge, ko)}
${ml(o.title, 540, 108, 28, 970, 2, 36, `font-family="Arial Black,Arial" font-size="28" font-weight="900" fill="#f9fafb" text-anchor="middle"`)}
  <line x1="80" y1="152" x2="1000" y2="152" stroke="#1f2937" stroke-width="1"/>
  <text x="540" y="238" font-family="Arial Black,Arial" font-size="86" font-weight="900" fill="${p.fg}" text-anchor="middle" opacity=".15">${o.heroIcon}</text>
  <text x="540" y="238" font-family="Arial Black,Arial" font-size="72" font-weight="900" fill="${p.fg}" text-anchor="middle">${o.heroIcon}</text>
${ml(o.heroBig, 540, 298, 42, 940, 1, 44, `font-family="Arial Black,Arial" font-size="42" font-weight="900" fill="#f9fafb" text-anchor="middle"`)}
${ml(o.heroSub, 540, 338, 20, 940, 2, 26, `font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle"`)}
  <line x1="80" y1="390" x2="1000" y2="390" stroke="#1f2937" stroke-width="1"/>${cards}
${quoteBox(p, o.quote, 640, 186, 19, 4, 26)}
${noteBox(p, o, 844, 148, ko)}
${foot(p, o.footer, ko, 1024)}`);
}

// ── L2 · 이모지 히어로 + 3-스탯 카드 + 상세 리스트 박스 ──────────────────────
function L2(o, ko){
  const p = P[o.pal];
  const cards = o.cards.map((c, i) => {
    const x = [60, 390, 720][i];
    return `
  <rect x="${x}" y="418" width="300" height="176" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
  <text x="${x+150}" y="452" font-family="Arial" font-size="20" fill="#6b7280" text-anchor="middle">${esc(c.label)}</text>
${ml(c.big, x+150, 500, 32, 274, 1, 34, `font-family="Arial Black,Arial" font-size="32" font-weight="900" fill="${p.fg}" text-anchor="middle"`)}
${ml(c.mid, x+150, 532, 19, 272, 1, 22, `font-family="Arial" font-size="19" fill="#9ca3af" text-anchor="middle"`)}
${ml(c.sub, x+150, 560, 15, 274, 2, 19, `font-family="Arial" font-size="15" fill="#6b7280" text-anchor="middle"`)}`;
  }).join('');
  const lines = o.detailLines.map((t, i) =>
    ml(t, 100, 686 + i*38, 23, 890, 1, 26, `font-family="Arial" font-size="23" fill="#e5e7eb"`)).join('\n');
  return shell(p, `${head(p, o.badge, ko)}
${ml(o.title, 540, 108, 28, 970, 2, 36, `font-family="Arial Black,Arial" font-size="28" font-weight="900" fill="#f9fafb" text-anchor="middle"`)}
  <line x1="80" y1="152" x2="1000" y2="152" stroke="#1f2937" stroke-width="1"/>
  <text x="540" y="234" font-family="Arial" font-size="80" text-anchor="middle">${o.heroIcon}</text>
${ml(o.heroBig, 540, 318, 60, 940, 1, 60, `font-family="Arial Black,Arial" font-size="60" font-weight="900" fill="${p.fg}" text-anchor="middle"`)}
${ml(o.heroSub, 540, 358, 19, 940, 2, 25, `font-family="Arial" font-size="19" fill="#9ca3af" text-anchor="middle"`)}
  <line x1="80" y1="406" x2="1000" y2="406" stroke="#1f2937" stroke-width="1"/>${cards}
  <rect x="60" y="612" width="960" height="172" rx="16" fill="#0f172a" stroke="#374151"/>
  <text x="540" y="650" font-family="Arial" font-size="20" fill="#6b7280" text-anchor="middle" letter-spacing="2">${esc(o.detailHead)}</text>
${lines}
${noteBox(p, o, 800, 148, ko)}
${foot(p, o.footer, ko, 1000)}`);
}

// ── L3 · 체크/이모지 히어로 + 피처 카드 3개 + 큰 인용박스 ─────────────────────
function L3(o, ko){
  const p = P[o.pal];
  const cards = o.cards.map((c, i) => {
    const x = [60, 390, 720][i];
    return `
  <rect x="${x}" y="396" width="300" height="196" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
  <text x="${x+150}" y="448" font-family="Arial" font-size="40" text-anchor="middle">${c.icon}</text>
${ml(c.big, x+150, 502, 28, 272, 1, 30, `font-family="Arial Black,Arial" font-size="28" font-weight="900" fill="${p.fg}" text-anchor="middle"`)}
${ml(c.mid, x+150, 534, 18, 272, 1, 22, `font-family="Arial" font-size="18" fill="#9ca3af" text-anchor="middle"`)}
${ml(c.sub, x+150, 560, 15, 274, 2, 19, `font-family="Arial" font-size="15" fill="#6b7280" text-anchor="middle"`)}`;
  }).join('');
  return shell(p, `${head(p, o.badge, ko)}
${ml(o.title, 540, 106, 28, 970, 2, 34, `font-family="Arial Black,Arial" font-size="28" font-weight="900" fill="#f9fafb" text-anchor="middle"`)}
  <line x1="80" y1="150" x2="1000" y2="150" stroke="#1f2937" stroke-width="1"/>
  <text x="540" y="248" font-family="Arial" font-size="76" text-anchor="middle">${o.heroIcon}</text>
${ml(o.heroBig, 540, 306, 44, 940, 1, 46, `font-family="Arial Black,Arial" font-size="44" font-weight="900" fill="#f9fafb" text-anchor="middle"`)}
${ml(o.heroSub, 540, 344, 19, 940, 2, 25, `font-family="Arial" font-size="19" fill="#9ca3af" text-anchor="middle"`)}
  <line x1="80" y1="384" x2="1000" y2="384" stroke="#1f2937" stroke-width="1"/>${cards}
${quoteBox(p, o.quote, 610, 186, 19, 4, 26)}
${noteBox(p, o, 814, 148, ko)}
${foot(p, o.footer, ko, 1002)}`);
}

// ── L4 · 배지 + 문구 히어로 + 아이콘 카드 3개 + 큰 인용박스 ───────────────────
function L4(o, ko){
  const p = P[o.pal];
  const bw = Math.max(360, Math.min(760, Math.round(estimatePxWidth(o.badgeLine, 20, false) + 70)));
  const cards = o.cards.map((c, i) => {
    const x = [60, 390, 720][i];
    return `
  <rect x="${x}" y="450" width="300" height="178" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
  <text x="${x+150}" y="496" font-family="Arial" font-size="34" text-anchor="middle">${c.icon}</text>
${ml(c.big, x+150, 542, 26, 272, 1, 28, `font-family="Arial Black,Arial" font-size="26" font-weight="900" fill="${p.fg}" text-anchor="middle"`)}
${ml(c.mid, x+150, 572, 18, 272, 1, 22, `font-family="Arial" font-size="18" fill="#9ca3af" text-anchor="middle"`)}
${ml(c.sub, x+150, 598, 15, 274, 2, 19, `font-family="Arial" font-size="15" fill="#6b7280" text-anchor="middle"`)}`;
  }).join('');
  return shell(p, `${head(p, o.badge, ko)}
${ml(o.title, 540, 106, 28, 970, 2, 34, `font-family="Arial Black,Arial" font-size="28" font-weight="900" fill="#f9fafb" text-anchor="middle"`)}
  <line x1="80" y1="150" x2="1000" y2="150" stroke="#1f2937" stroke-width="1"/>
  <rect x="${540-bw/2}" y="166" width="${bw}" height="46" rx="23" fill="${p.fg}18" stroke="${p.fg}" stroke-width="1"/>
  <text x="540" y="196" font-family="Arial" font-size="20" fill="${p.fg}" text-anchor="middle">${esc(o.badgeLine)}</text>
  <text x="540" y="292" font-family="Arial" font-size="66" text-anchor="middle">${o.heroIcon}</text>
${ml(o.heroBig, 540, 352, 38, 940, 1, 40, `font-family="Arial Black,Arial" font-size="38" font-weight="900" fill="${p.fg}" text-anchor="middle"`)}
${ml(o.heroSub, 540, 392, 19, 940, 2, 25, `font-family="Arial" font-size="19" fill="#9ca3af" text-anchor="middle"`)}
  <line x1="80" y1="436" x2="1000" y2="436" stroke="#1f2937" stroke-width="1"/>${cards}
${quoteBox(p, o.quote, 644, 186, 19, 4, 26)}
${noteBox(p, o, 848, 144, ko)}
${foot(p, o.footer, ko, 1024)}`);
}

// ── L5 · Before → After 비교 + 카드 3개 ─────────────────────────────────────
function L5(o, ko){
  const p = P[o.pal];
  const cards = o.cards.map((c, i) => {
    const x = [60, 390, 720][i];
    return `
  <rect x="${x}" y="548" width="300" height="164" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="1.5"/>
  <text x="${x+150}" y="592" font-family="Arial" font-size="32" text-anchor="middle">${c.icon}</text>
${ml(c.big, x+150, 634, 24, 272, 1, 26, `font-family="Arial Black,Arial" font-size="24" font-weight="900" fill="${p.fg}" text-anchor="middle"`)}
${ml(c.mid, x+150, 662, 17, 272, 1, 20, `font-family="Arial" font-size="17" fill="#9ca3af" text-anchor="middle"`)}
${ml(c.sub, x+150, 686, 15, 274, 2, 19, `font-family="Arial" font-size="15" fill="#6b7280" text-anchor="middle"`)}`;
  }).join('');
  return shell(p, `${head(p, o.badge, ko)}
${ml(o.title, 540, 106, 28, 970, 2, 34, `font-family="Arial Black,Arial" font-size="28" font-weight="900" fill="#f9fafb" text-anchor="middle"`)}
  <line x1="80" y1="150" x2="1000" y2="150" stroke="#1f2937" stroke-width="1"/>
  <text x="540" y="222" font-family="Arial" font-size="62" text-anchor="middle">${o.heroIcon}</text>
${ml(o.heroBig, 540, 272, 34, 940, 1, 36, `font-family="Arial Black,Arial" font-size="34" font-weight="900" fill="${p.fg}" text-anchor="middle"`)}
${ml(o.heroSub, 540, 308, 19, 940, 2, 25, `font-family="Arial" font-size="19" fill="#9ca3af" text-anchor="middle"`)}
  <rect x="60" y="356" width="420" height="168" rx="16" fill="#0a0a14" stroke="#374151" stroke-width="1.5"/>
  <text x="270" y="400" font-family="Arial" font-size="20" fill="#6b7280" text-anchor="middle">${esc(o.before.label)}</text>
${ml(o.before.big, 270, 460, 44, 384, 1, 46, `font-family="Arial Black,Arial" font-size="44" font-weight="900" fill="#9ca3af" text-anchor="middle"`)}
${ml(o.before.sub, 270, 496, 16, 388, 1, 20, `font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle"`)}
  <text x="540" y="455" font-family="Arial Black,Arial" font-size="40" fill="${p.fg}" text-anchor="middle">&#8594;</text>
  <rect x="600" y="356" width="420" height="168" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
  <text x="810" y="400" font-family="Arial" font-size="20" fill="${p.fg}" text-anchor="middle">${esc(o.after.label)}</text>
${ml(o.after.big, 810, 460, 44, 384, 1, 46, `font-family="Arial Black,Arial" font-size="44" font-weight="900" fill="${p.fg}" text-anchor="middle"`)}
${ml(o.after.sub, 810, 496, 16, 388, 1, 20, `font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle"`)}${cards}
${quoteBox(p, o.quote, 730, 134, 18, 3, 25)}
${noteBox(p, o, 878, 140, ko)}
${foot(p, o.footer, ko, 1042)}`);
}

// ── L6 · BREAKING 배지 + 히어로 밴드 + 4칸 그리드 + 컨텍스트 ─────────────────
function L6(o, ko){
  const p = P[o.pal];
  const bw = Math.max(320, Math.min(700, Math.round(estimatePxWidth(o.breaking, 18, true) + 70)));
  const grid = o.grid.map((c, i) => {
    const x = [80, 312, 544, 776][i];
    return `
  <rect x="${x}" y="372" width="192" height="176" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="1.5"/>
  <text x="${x+96}" y="418" font-family="Arial" font-size="34" text-anchor="middle">${c.icon}</text>
${ml(c.big, x+96, 462, 26, 176, 1, 28, `font-family="Arial Black,Arial" font-size="26" font-weight="900" fill="${p.fg}" text-anchor="middle"`)}
${ml(c.mid, x+96, 492, 16, 178, 1, 19, `font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle"`)}
${ml(c.sub, x+96, 514, 14, 180, 2, 17, `font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle"`)}`;
  }).join('');
  return shell(p, `${head(p, o.badge, ko)}
${ml(o.title, 540, 104, 28, 970, 2, 34, `font-family="Arial Black,Arial" font-size="28" font-weight="900" fill="#f9fafb" text-anchor="middle"`)}
  <line x1="80" y1="146" x2="1000" y2="146" stroke="#1f2937" stroke-width="1"/>
  <rect x="${540-bw/2}" y="160" width="${bw}" height="44" rx="22" fill="rgba(239,68,68,.15)" stroke="#ef4444" stroke-width="1.5"/>
  <text x="540" y="188" font-family="Arial Black,Arial" font-size="18" font-weight="900" fill="#ef4444" text-anchor="middle">${esc(o.breaking)}</text>
  <rect x="80" y="220" width="920" height="132" rx="18" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
${ml(o.heroBig, 540, 288, 50, 880, 1, 52, `font-family="Arial Black,Arial" font-size="50" font-weight="900" fill="${p.fg}" text-anchor="middle"`)}
${ml(o.heroSub, 540, 324, 19, 880, 1, 24, `font-family="Arial" font-size="19" fill="#9ca3af" text-anchor="middle"`)}${grid}
  <rect x="80" y="566" width="920" height="112" rx="14" fill="#0f172a" stroke="#374151"/>
${ml(o.ctx1, 540, 606, 21, 890, 1, 26, `font-family="Arial" font-size="21" fill="#e5e7eb" text-anchor="middle"`)}
${ml(o.ctx2, 540, 644, 18, 890, 1, 24, `font-family="Arial" font-size="18" fill="#9ca3af" text-anchor="middle"`)}
${quoteBox(p, o.quote, 694, 134, 18, 3, 25)}
${noteBox(p, o, 842, 148, ko)}
${foot(p, o.footer, ko, 1026)}`);
}

// ── ROWS · 한장요약 가로 줄 나열 ─────────────────────────────────────────────
function ROWS(o, ko){
  const rows = o.rows.map((r, i) => {
    const y = 122 + i*124;
    return `
  <rect x="60" y="${y}" width="960" height="112" rx="14" fill="${r.fill}" stroke="${r.color}" stroke-width="2"/>
  <rect x="60" y="${y}" width="8" height="112" rx="4" fill="${r.color}"/>
${ml(r.title, 116, y+42, 24, 740, 1, 28, `font-family="Arial Black,Arial" font-size="24" font-weight="900" fill="${r.color}"`)}
${ml(r.sub, 116, y+80, 18, 830, 1, 22, `font-family="Arial" font-size="18" fill="#9ca3af"`)}
  <text x="985" y="${y+66}" font-family="Arial Black,Arial" font-size="21" font-weight="900" fill="${r.color}" text-anchor="end">${esc(r.right)}</text>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0d1117"/><stop offset="100%" style="stop-color:#0a0f1a"/></linearGradient>
    <linearGradient id="flow" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#ef4444"/><stop offset="25%" style="stop-color:#f59e0b"/><stop offset="50%" style="stop-color:#4ade80"/><stop offset="75%" style="stop-color:#60a5fa"/><stop offset="100%" style="stop-color:#c084fc"/></linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <rect width="1080" height="1080" fill="none" stroke="#1f2937" stroke-width="2"/>
  <rect x="0" y="0" width="1080" height="5" fill="url(#flow)"/>
  <text x="540" y="48" font-family="Arial" font-size="13" fill="#6b7280" text-anchor="middle" letter-spacing="3">INVESTUS DAILY REPORT</text>
  <text x="540" y="92" font-family="Arial Black,Arial" font-size="34" font-weight="900" fill="#f9fafb" text-anchor="middle">${esc(o.headline)}</text>
  <line x1="80" y1="108" x2="1000" y2="108" stroke="#1f2937" stroke-width="1"/>${rows}
${ml(o.caption, 540, 1010, 16, 960, 2, 22, `font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle"`)}
  <rect x="0" y="1060" width="1080" height="20" fill="url(#flow)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${ko ? BRAND_KO : BRAND_EN}</text>
</svg>`;
}

const LAYOUT = { L1, L2, L3, L4, L5, L6, ROWS };

const TOPICS = [];
function add(file, layout, pal, ko, en){
  TOPICS.push({ file, layout, pal, ko, en });
}

require('./topics-20260831-data.js')(add);

/* ══════════════════════════ 출력 ══════════════════════════ */

let n = 0;
for(const t of TOPICS){
  const fn = LAYOUT[t.layout];
  const koPath = path.join(OUT, `${t.file}-${TAG}.svg`);
  fs.writeFileSync(koPath, fn({ ...t.ko, pal: t.pal }, true));
  n++;
  if(t.en){
    const enPath = path.join(OUT, `${t.file}-${TAG}-en.svg`);
    fs.writeFileSync(enPath, fn({ ...t.en, pal: t.pal }, false));
    n++;
  }
}
console.log(`wrote ${n} svg files to ${OUT}`);
const counts = {};
for(const t of TOPICS) counts[t.layout] = (counts[t.layout] || 0) + 1;
console.log('layout mix:', counts);
