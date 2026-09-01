// 2026-08-29 리포트 SVG 생성기
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
const DATE = '2026.09.02';
const TAG = '20260902';

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

/* KR / Safe / KR-RE topics for 2026-09-01 */

add('summary-kr', 'ROWS', 'KOSPI', {
  headline: '2026.09.02 한국장 한장 요약',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'+0.35%', title:'코스피가 6,812.44로 0.35% 올라 소폭 반등했습니다',
      sub:'금요일 1.79% 하락 뒤 첫 거래일로 6,800선을 회복했습니다.' },
    { color:'#22d3ee', fill:'#06171c', right:'412억', title:'외국인이 412억 원 순매수로 전환됐습니다',
      sub:'금요일 1조 7,564억 원 순매도에서 크게 줄었습니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'HBM', title:'삼성전자 +0.82%, SK하이닉스 +1.12%로 반도체가 지수를 받쳤습니다',
      sub:'HBM 생산능력 70%·HBM3E 현물가 5배 전망이 국내 메모리주에 전달됐습니다.' },
    { color:'#f59e0b', fill:'#1a1205', right:'기아', title:'LG에너지솔루션 +0.55%, 기아 +0.91%로 2차전지·완성차가 강했습니다',
      sub:'9월 3일 사이버캡 D-2가 완성차 심리 변수입니다.' },
    { color:'#94a3b8', fill:'#0f1419', right:'1,369', title:'원·달러 환율은 1,369.2원(-3.3원)으로 약세를 이어갔습니다',
      sub:'외국인 소폭 순매수와 함께 환율이 내렸습니다.' },
    { color:'#a78bfa', fill:'#120b1f', right:'57%', title:'SemiCon Taiwan·FOMC 9/15~16·인상 확률 57%가 겹칩니다',
      sub:'9월 3일 사이버캡·9월 4일 미국 고용이 이번 주 캘린더입니다.' },
  ],
  caption: '더 볼 것: 코스피 6,812.44 · 외국인 412억 순매수 · 삼성 +0.82% · 하이닉스 +1.12% · 환율 1,369.2원 · FOMC 9/15-16',
}, {
  headline: '2026.09.02 Korea Market Snapshot',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'+0.35%', title:'KOSPI rose 0.35% to 6,812.44 in a modest bounce',
      sub:'First session after Friday\'s 1.79% drop; reclaimed the 6,800 line.' },
    { color:'#22d3ee', fill:'#06171c', right:'+41.2B', title:'Foreign investors turned to net buyers of 41.2bn won',
      sub:'Down sharply from Friday\'s 1.756T won net sell.' },
    { color:'#60a5fa', fill:'#0a1420', right:'HBM', title:'Samsung +0.82% and SK Hynix +1.12% led chips higher',
      sub:'70% HBM capacity and ~5x HBM3E spot themes hit Korean memory names.' },
    { color:'#f59e0b', fill:'#1a1205', right:'Kia', title:'LG Energy +0.55%, Kia +0.91% lifted batteries and autos',
      sub:'Cybercab on Sept 3 is the near-term autonomy catalyst.' },
    { color:'#94a3b8', fill:'#0f1419', right:'1,369', title:'USDKRW closed 3.3 won weaker at 1,369.2',
      sub:'Won softened alongside modest foreign buying.' },
    { color:'#a78bfa', fill:'#120b1f', right:'57%', title:'SemiCon Taiwan, FOMC Sept 15-16, hike odds ~57%',
      sub:'Sept 3 Cybercab and Sept 4 US jobs round out the week.' },
  ],
  caption: 'Watch: KOSPI 6,812.44 · foreign +41.2B won · Samsung +0.82% · Hynix +1.12% · USDKRW 1,369.2 · FOMC 9/15-16',
});

add('samsung-hbm-capacity-kr', 'L1', 'SEC', {
  badge: '삼성전자',
  title: '삼성전자가 HBM 생산능력 70%·HBM3E 현물가 5배 전망과 함께 +0.82% 반등했습니다',
  heroIcon: '🧠', heroBig: '+0.82%',
  heroSub: '2031년까지 메모리 생산능력의 약 70%를 AI 고객에 공급할 수 있다는 전망과 HBM3E 현물가 계약가 대비 약 5배가 겹쳤습니다.',
  cards: [
    { icon:'🏭', big:'70%', mid:'HBM 생산능력 비중', sub:'범용 DRAM이 아닌 고객 맞춤 물량으로 이동합니다' },
    { icon:'💰', big:'약 5배', mid:'HBM3E 현물 프리미엄', sub:'품귀가 가격 협상력을 높입니다' },
    { icon:'🗓️', big:'SemiCon', mid:'대만 반도체 전시회', sub:'장비·수요 메시지가 추가 변수입니다' },
  ],
  quote: '고대역폭 메모리(HBM)는 AI 가속기 옆에서 데이터를 빠르게 주고받는 칩입니다. 생산능력 70%는 장기 고객 물량 확보 신호이며, 단기 주가는 수급과 함께 움직입니다.',
  noteSub: '70% 전망은 계획이므로 분기 HBM 출하·ASP로 검증해야 합니다. 금요일 외국인 매도 뒤 월요일 반등은 수급 완화와 테마가 겹친 날일 수 있습니다. 다음에는 SemiCon Taiwan 메시지와 분기 실적 가이던스를 확인하시기 바랍니다.',
  footer: '삼성전자 · HBM 70%',
}, {
  badge: 'SAMSUNG',
  title: 'Samsung rose 0.82% as ~70% HBM capacity and ~5x HBM3E spot themes overlapped',
  heroIcon: '🧠', heroBig: '+0.82%',
  heroSub: 'Reports cite ~70% of memory capacity through 2031 for AI hyperscalers and HBM3E spot near 5x contract.',
  cards: [
    { icon:'🏭', big:'70%', mid:'HBM capacity share', sub:'Shift from commodity DRAM to custom volumes' },
    { icon:'💰', big:'~5x', mid:'HBM3E spot premium', sub:'Tight supply lifts pricing power' },
    { icon:'🗓️', big:'SemiCon', mid:'Taiwan chip show', sub:'Equipment and demand headlines matter' },
  ],
  quote: 'HBM sits beside AI accelerators to move data quickly. The 70% capacity call signals long-term customer volumes, while near-term shares still track flows.',
  noteSub: 'The 70% figure is a plan until quarterly HBM shipments and ASP prove it. Monday\'s bounce may blend easier flows with theme buying. Watch SemiCon Taiwan and the next earnings guide.',
  footer: 'Samsung · HBM 70%',
});

add('skhynix-hbm-kr', 'L3', 'HYNIX', {
  badge: 'SK하이닉스',
  title: 'SK하이닉스가 +1.12%로 반도체 대형주 중 상대 강세였습니다',
  heroIcon: '🧊', heroBig: '+1.12%',
  heroSub: '삼성 HBM 70%·HBM3E 5배 전망이 국내 HBM 1·2위 실적 mix에 동시에 연결됐습니다.',
  cards: [
    { icon:'📈', big:'+1.12%', mid:'9월 1일 등락', sub:'금요일 조정 뒤 HBM 테마 반등' },
    { icon:'🔗', big:'HBM mix', mid:'분기 실적 핵심', sub:'ASP·출하량이 방어축입니다' },
    { icon:'🌐', big:'외국인', mid:'수급 완화', sub:'412억 원 순매수 구간' },
  ],
  quote: 'HBM3E 현물가 계약가 대비 약 5배는 공급자 가격 협상력을 높입니다. 업종 전체 시장 규모 신호이기도 합니다.',
  noteSub: '단기 +1.12%는 수급 완화와 테마가 겹친 날로 읽힙니다. 장기 투자자는 CapEx·고객 발주를 분기마다 확인하시기 바랍니다. 9/15 FOMC 전 성장주 변동성에도 대비하시면 됩니다.',
  footer: 'SK하이닉스 · HBM 반등',
}, {
  badge: 'SK HYNIX',
  title: 'SK Hynix rose 1.12%, leading large-cap chips on the day',
  heroIcon: '🧊', heroBig: '+1.12%',
  heroSub: 'Samsung 70% capacity and ~5x HBM3E spot themes hit Korea\'s top HBM names together.',
  cards: [
    { icon:'📈', big:'+1.12%', mid:'Sept 1 move', sub:'HBM theme bounce after Friday drop' },
    { icon:'🔗', big:'HBM mix', mid:'Quarterly earnings key', sub:'ASP and shipments defend margins' },
    { icon:'🌐', big:'Flows', mid:'Easier selling', sub:'Foreign net buy ~41.2B won' },
  ],
  quote: 'HBM3E spot near 5x contract lifts supplier pricing power. It is also a signal for total industry market size.',
  noteSub: 'The 1.12% gain may blend easier flows with theme buying. Long-term holders should track CapEx and customer orders each quarter. Watch growth-stock volatility into the Sept 15 FOMC.',
  footer: 'SK Hynix · HBM bounce',
});

add('lg-energy-kr', 'L1', 'SEC', {
  badge: 'LG에너지솔루션',
  title: 'LG에너지솔루션이 +0.55%로 2차전지가 지수 반등을 받쳤습니다',
  heroIcon: '🔋', heroBig: '+0.55%',
  heroSub: '코스피 +0.35%보다 강했고, 북미 에너지저장장치·전기차 배터리 수요가 실적 변수입니다.',
  cards: [
    { icon:'🚗', big:'전기차', mid:'수요 둔화 vs ESS', sub:'두 서사가 공존합니다' },
    { icon:'💵', big:'1,369원', mid:'원·달러 환율', sub:'수출주에 우호적일 수 있습니다' },
    { icon:'📊', big:'ASP', mid:'분기 가이던스', sub:'출하·마진이 핵심입니다' },
  ],
  quote: '2차전지 업종이 지수 반등에 동참한 사례입니다. 에너지저장장치 수요와 전기차 둔화 서사가 동시에 작용합니다.',
  noteSub: '단기 +0.55%는 반등일 수 있습니다. 분기 출하·ASP·마진 가이던스가 핵심이며, 미국 IRA·관세 변수도 함께 봐야 합니다. SemiCon·FOMC 캘린더와 매크로가 연동됩니다.',
  footer: 'LG에너지솔루션 · 2차전지',
}, {
  badge: 'LG ENERGY',
  title: 'LG Energy Solution rose 0.55% as batteries joined the KOSPI bounce',
  heroIcon: '🔋', heroBig: '+0.55%',
  heroSub: 'Outperformed KOSPI +0.35%; North America ESS and EV battery demand drive earnings.',
  cards: [
    { icon:'🚗', big:'EV', mid:'Slowdown vs ESS', sub:'Two narratives coexist' },
    { icon:'💵', big:'1,369', mid:'USDKRW', sub:'Weaker won can help exporters' },
    { icon:'📊', big:'ASP', mid:'Quarterly guide', sub:'Shipments and margins matter' },
  ],
  quote: 'Batteries joined the index bounce. ESS growth and EV slowdown narratives work at the same time.',
  noteSub: 'The 0.55% gain may be a short-term bounce. Watch quarterly shipments, ASP and margin guide, plus US IRA and tariff variables tied to the macro calendar.',
  footer: 'LG Energy · batteries',
});

add('kia-robotaxi-kr', 'L3', 'TSLA', {
  badge: '기아',
  title: '기아가 +0.91%로 사이버캡 D-2 글로벌 자율주행 테마와 겹쳤습니다',
  heroIcon: '🚗', heroBig: '+0.91%',
  heroSub: '미국 텍사스 로보택시 314대·9월 3일 사이버캡 행사가 완성차 심리에 영향을 줍니다.',
  cards: [
    { icon:'🤖', big:'D-2', mid:'사이버캡 행사', sub:'9월 3일 오스틴 이벤트' },
    { icon:'🛣️', big:'314대', mid:'텍사스 fleet', sub:'글로벌 로보택시 확대' },
    { icon:'📦', big:'수출', mid:'SUV mix', sub:'실적 방어축입니다' },
  ],
  quote: '9/3 사이버캡는 글로벌 첨단 운전 보조·로보택시 서사 촉매입니다. 현대차그룹 내에서도 개별 이슈 분화가 있습니다.',
  noteSub: '사이버캡는 테슬라 이슈지만 완성차 연동에 영향을 줍니다. 행사 결과가 단기 변동성을 키울 수 있으니, 9/3 전후 글로벌 완성차 심리를 함께 보시기 바랍니다.',
  footer: '기아 · 사이버캡 D-2',
}, {
  badge: 'KIA',
  title: 'Kia rose 0.91% as global robotaxi headlines build into Cybercab',
  heroIcon: '🚗', heroBig: '+0.91%',
  heroSub: 'Texas robotaxi fleet at 314 units and the Sept 3 Cybercab event lift auto sentiment.',
  cards: [
    { icon:'🤖', big:'D-2', mid:'Cybercab event', sub:'Austin event on Sept 3' },
    { icon:'🛣️', big:'314', mid:'Texas fleet', sub:'Global robotaxi expansion' },
    { icon:'📦', big:'Exports', mid:'SUV mix', sub:'Earnings defense line' },
  ],
  quote: 'The Sept 3 Cybercab event is a catalyst for global autonomy narratives. Even within Hyundai Motor Group, stock moves diverge by name.',
  noteSub: 'Cybercab is a Tesla story but it spills into autos. Event results can add near-term volatility, so track global auto sentiment around Sept 3.',
  footer: 'Kia · Cybercab D-2',
});

add('naver-ai-kr', 'L4', 'AI', {
  badge: 'NAVER', badgeLine: '🌐 플랫폼 · AI capex 변수',
  title: 'NAVER가 -0.34%로 반등장에서 플랫폼주는 상대 약세였습니다',
  heroIcon: '📱', heroBig: '지수와 엇갈림',
  heroSub: '코스피 +0.35%와 반대로 움직였고, 반도체·완성차가 외국인 소폭 순매수 장에서 지수를 이끌었습니다.',
  cards: [
    { icon:'📉', big:'-0.34%', mid:'9월 1일 등락', sub:'플랫폼주 상대 약세' },
    { icon:'☁️', big:'AI capex', mid:'클라우드 투자', sub:'글로벌 hyperscaler 경쟁' },
    { icon:'📈', big:'금리', mid:'성장주 민감', sub:'FOMC 9/15~16 변수' },
  ],
  quote: '지수 반등 ≠ 전 종목 반등입니다. AI·클라우드 capex와 광고 경기가 밸류에이션 변수입니다.',
  noteSub: '플랫폼주는 금리·성장주 민감도가 큽니다. -0.34%는 단기 로테이션일 수 있으며, AI 서비스 수익화 일정과 FOMC 전 변동성을 함께 보시기 바랍니다.',
  footer: 'NAVER · 플랫폼 약세',
}, {
  badge: 'NAVER', badgeLine: '🌐 Platform · AI capex overhang',
  title: 'NAVER fell 0.34% as platforms lagged on a modest KOSPI bounce',
  heroIcon: '📱', heroBig: 'Index divergence',
  heroSub: 'Moved opposite to KOSPI +0.35% while chips and autos led modest foreign buying.',
  cards: [
    { icon:'📉', big:'-0.34%', mid:'Sept 1 move', sub:'Platforms relatively weak' },
    { icon:'☁️', big:'AI capex', mid:'Cloud spend', sub:'Global hyperscaler competition' },
    { icon:'📈', big:'Rates', mid:'Growth sensitivity', sub:'FOMC Sept 15-16 risk' },
  ],
  quote: 'An index bounce does not lift every name. AI and cloud capex plus ad cycles remain valuation drivers.',
  noteSub: 'Platforms are rate-sensitive growth names. The 0.34% drop may be short-term rotation; watch AI monetization timing and volatility into the FOMC.',
  footer: 'NAVER · platform lag',
});

add('summary-safe', 'ROWS', 'MACRO', {
  headline: '2026.09.02 안전자산 한장 요약',
  rows: [
    { color:'#f7931a', fill:'#1a0f00', right:'비트', title:'비트코인이 약 108,248달러, 10.8만 달러 선 부근입니다',
      sub:'금리 인상 확률 57%와 함께 기회비용을 재계산받습니다.' },
    { color:'#facc15', fill:'#1a1600', right:'금', title:'금은 온스당 약 3,475달러입니다',
      sub:'금>달러 준비자산 서사와 FOMC 9/15~16이 겹칩니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'이더', title:'이더리움은 약 4,512달러, 4,500달러 심리선 위입니다',
      sub:'비트코인·금과 같은 거시 변수를 공유합니다.' },
    { color:'#94a3b8', fill:'#0f1419', right:'달러', title:'달러인덱스는 약 98.2입니다',
      sub:'98선이 단기 분기점입니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'은', title:'은은 약 38.6달러, 금·산업 수요가 겹칩니다',
      sub:'Au/Ag ratio로 상대 강약을 봅니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'57%', title:'9월 금리 인상 확률 57%가 공통 변수입니다',
      sub:'2년물 금리·상장지수펀드 유입·달러지수 세 줄을 같이 보세요.' },
  ],
  caption: '더 볼 것: 비트코인 약 108,248달러 · 금 약 3,475달러 · 이더리움 약 4,512달러 · 달러인덱스 98.2 · 은 약 38.6달러 · 인상 57%',
}, {
  headline: '2026.09.02 Safe-haven snapshot',
  rows: [
    { color:'#f7931a', fill:'#1a0f00', right:'BTC', title:'Bitcoin near $108,248 trades around the $108K line',
      sub:'September hike odds near 57% reset opportunity cost.' },
    { color:'#facc15', fill:'#1a1600', right:'GOLD', title:'Gold near $3,475 an ounce',
      sub:'Gold-over-USD reserve narrative meets FOMC Sept 15-16.' },
    { color:'#60a5fa', fill:'#0a1420', right:'ETH', title:'Ethereum near $4,512 holds above $4,500',
      sub:'Shares macro shocks with bitcoin and gold.' },
    { color:'#94a3b8', fill:'#0f1419', right:'DXY', title:'Dollar index near 98.2',
      sub:'The 98 line is a near-term pivot.' },
    { color:'#c084fc', fill:'#140b1f', right:'Ag', title:'Silver near $38.6 blends gold and industrial demand',
      sub:'Watch the gold-silver ratio.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'57%', title:'September hike odds near 57% are the common driver',
      sub:'Track the 2-year yield, ETF flows and DXY together.' },
  ],
  caption: 'Watch: BTC ~108,248 · gold ~3,475 · ETH ~4,512 · DXY ~98.2 · silver ~38.6 · hike 57%',
});

add('btc-safe', 'L6', 'BTC', {
  badge: 'BTC',
  title: '비트코인이 약 108,248달러, 10.8만 달러 심리선 부근에서 거래됩니다',
  breaking: '금리 인상 확률 57% · DXY ~98.2',
  heroBig: '~108,248달러',
  heroSub: '이자를 주지 않는 자산이라 금리 기대가 오르면 기회비용이 커집니다. ETF 순유입이 방향을 가늠합니다.',
  grid: [
    { icon:'🪙', big:'108K', mid:'심리선', sub:'10.8만 달러 부근' },
    { icon:'📊', big:'57%', mid:'9월 인상 확률', sub:'거시 변수' },
    { icon:'💵', big:'98.2', mid:'달러인덱스', sub:'역상관 점검' },
    { icon:'📈', big:'ETF', mid:'순유입', sub:'기관 축 변수' },
  ],
  ctx1: '금과 함께 움직였다면 가상자산 고유 이슈가 아니라 거시 요인일 가능성이 큽니다',
  ctx2: '레버리지 청산은 하락을 키우는 후행 변수입니다',
  quote: '2024년 현물 ETF 승인 이후 기관 유입이 새 축이 됐지만, 금리 변수는 여전히 강합니다.',
  noteSub: '확인 지표는 가격보다 ETF 유입 + 2년물 금리 + 인상 확률입니다. 10.8만 달러 방어는 세 가지가 동시에 개선될 때 수월합니다. FOMC 9/15~16 전후 변동성에 대비하시기 바랍니다.',
  footer: '비트코인 · 10.8만 달러',
}, {
  badge: 'BTC',
  title: 'Bitcoin near $108,248 trades around the $108K psychological line',
  breaking: 'September hike odds ~57% · DXY ~98.2',
  heroBig: '~$108,248',
  heroSub: 'Bitcoin pays no yield, so higher rate expectations raise opportunity cost. Spot ETF flows guide direction.',
  grid: [
    { icon:'🪙', big:'108K', mid:'Psych line', sub:'Around $108,000' },
    { icon:'📊', big:'57%', mid:'Sept hike odds', sub:'Macro driver' },
    { icon:'💵', big:'98.2', mid:'Dollar index', sub:'Inverse check' },
    { icon:'📈', big:'ETF', mid:'Net flows', sub:'Institutional lane' },
  ],
  ctx1: 'If gold moved the same way, macro rates likely drove the move rather than crypto-specific news',
  ctx2: 'Leveraged liquidations are a lagging accelerator on the downside',
  quote: 'Spot ETF approval in 2024 added an institutional lane, but rates still dominate medium-term moves.',
  noteSub: 'Watch ETF inflows, the 2-year yield and hike odds more than spot price alone. Defending $108K is easier when all three improve. Brace for volatility around the Sept 15-16 FOMC.',
  footer: 'Bitcoin · $108K line',
});

add('gold-safe', 'L5', 'GOLD', {
  badge: 'GOLD',
  title: '금이 온스당 약 3,475달러, 금>달러 준비자산 서사를 재점검합니다',
  heroIcon: '🥇', heroBig: '약 3,475달러',
  heroSub: '금요일 조정 뒤 월요일 재정비 구간으로, 3,450~3,500달러 밴드를 확인합니다.',
  before: { label:'8월 말', big:'조정', sub:'금리 재가격 구간' },
  after:  { label:'9월 1일', big:'3,475달러', sub:'준비자산 서사 재점검' },
  cards: [
    { icon:'🏦', big:'준비자산', mid:'금>달러 논의', sub:'중앙은행 재배분' },
    { icon:'📈', big:'57%', mid:'인상 확률', sub:'실질금리 변수' },
    { icon:'🛡️', big:'3,450', mid:'지지 구간', sub:'밴드 하단' },
  ],
  quote: '금은 이자를 주지 않으므로 실질금리(명목금리−물가)가 오르면 상대 매력이 떨어집니다.',
  noteSub: '단기 조정과 장기 중앙은행 수요를 분리해서 보시기 바랍니다. 3,450~3,500달러 구간에서 횡보하면 금리 변수 변화를 기다리는 구간일 수 있습니다. 금 ETF 보유량 변화도 함께 확인하시면 됩니다.',
  footer: '금 · 3,475달러',
}, {
  badge: 'GOLD',
  title: 'Gold near $3,475 revisits the gold-over-USD reserve narrative',
  heroIcon: '🥇', heroBig: '~$3,475/oz',
  heroSub: 'Monday consolidation after Friday\'s adjustment; watch the $3,450-$3,500 band.',
  before: { label:'Late Aug', big:'Pullback', sub:'Rates repricing' },
  after:  { label:'Sept 1', big:'$3,475', sub:'Reserve narrative check' },
  cards: [
    { icon:'🏦', big:'Reserves', mid:'Gold vs USD', sub:'Central bank rotation' },
    { icon:'📈', big:'57%', mid:'Hike odds', sub:'Real-rate driver' },
    { icon:'🛡️', big:'$3,450', mid:'Support zone', sub:'Band floor' },
  ],
  quote: 'Gold pays no coupon, so higher real yields (nominal rates minus inflation) reduce its relative appeal.',
  noteSub: 'Separate short-term rate trades from long-term central-bank demand. Sideways action inside $3,450-$3,500 may mean waiting on rate expectations. Track gold ETF holdings as a physical-demand proxy.',
  footer: 'Gold · $3,475',
});

add('eth-safe', 'L3', 'AI', {
  badge: '이더리움',
  title: '이더리움 약 4,512달러, 4,500달러 심리선 위에서 거래됩니다',
  heroIcon: '💎', heroBig: '~4,512달러',
  heroSub: '비트코인·금과 같은 금리·달러 변수를 공유하면서 스테이킹 수익 변수도 남아 있습니다.',
  cards: [
    { icon:'🔗', big:'BTC 연동', mid:'단기 베타', sub:'10.8만 달러와 같이 봅니다' },
    { icon:'🔑', big:'4,500', mid:'심리선', sub:'재돌파·이탈 변수' },
    { icon:'📊', big:'스테이킹', mid:'보유 유인', sub:'채권 금리와 비교' },
  ],
  quote: '스테이킹은 네트워크에 코인을 맡겨 검증 보상을 받는 방식입니다. 그 수익도 채권 금리와 비교됩니다.',
  noteSub: '단기에는 비트코인·금리가 더 큰 비중을 차지합니다. 4,500달러 재돌파는 비트코인 10.8만 달러 회복과 종종 같이 움직이니 한 화면에 두시면 편합니다.',
  footer: '이더리움 · 4,500달러',
}, {
  badge: 'ETH',
  title: 'Ethereum near $4,512 holds above the $4,500 line',
  heroIcon: '💎', heroBig: '~$4,512',
  heroSub: 'Shares macro rate and dollar shocks with bitcoin and gold while staking yield still matters.',
  cards: [
    { icon:'🔗', big:'BTC link', mid:'Near-term beta', sub:'Watch $108K together' },
    { icon:'🔑', big:'$4,500', mid:'Psych line', sub:'Reclaim or break' },
    { icon:'📊', big:'Staking', mid:'Hold incentive', sub:'Versus bond yields' },
  ],
  quote: 'Staking locks coins to secure the network and earn rewards, but those rewards still compete with bond yields.',
  noteSub: 'Over days to weeks, bitcoin and rates often dominate. Reclaiming $4,500 often aligns with bitcoin holding $108K, so keep both on one screen.',
  footer: 'Ethereum · $4,500',
});

add('dxy-safe', 'L2', 'RATES', {
  badge: '달러인덱스',
  title: '달러인덱스(DXY) 약 98.2, 금·비트코인·원화와 연동됩니다',
  heroIcon: '💵', heroBig: '~98.2',
  heroSub: '9월 금리 인상 확률 57%·FOMC 9/15~16에서 달러 강세/약세가 준비자산 방향을 좌우합니다.',
  cards: [
    { label:'DXY', big:'98.2', mid:'단기 분기점', sub:'98선 위·아래 반응 기록' },
    { label:'원화', big:'1,369', mid:'원·달러 환율', sub:'국내 수급과 연동' },
    { label:'FOMC', big:'9/15', mid:'변동성 이벤트', sub:'고용 9/4 선행' },
  ],
  detailHead: '교차 자산에서 보는 달러',
  detailLines: [
    '💵 달러 강세는 금·비트코인·신흥국 통화에 압박을 줄 수 있습니다',
    '📈 9월 4일 미국 고용이 강하면 달러·금리 재상승 조합이 나올 수 있습니다',
    '🇰🇷 원·달러 1,369.2원과 DXY 98.2는 같은 거시 환경을 공유합니다',
  ],
  noteSub: 'DXY는 가격 한 줄이 아니라 금리·고용·FOMC와 연결된 변수입니다. 98.2 자체보다 98선을 지키는지와 2년물 금리 변화를 함께 보시기 바랍니다. 국내 투자자는 DXY와 원·달러를 같이 기록하면 수급 해석이 쉬워집니다.',
  footer: '달러인덱스 · 98선',
}, {
  badge: 'DXY',
  title: 'Dollar index near 98.2 links bitcoin, gold and the won',
  heroIcon: '💵', heroBig: '~98.2',
  heroSub: 'September hike odds near 57% and FOMC Sept 15-16 steer dollar strength and haven moves.',
  cards: [
    { label:'DXY', big:'98.2', mid:'Near-term pivot', sub:'Log reactions above/below 98' },
    { label:'KRW', big:'1,369', mid:'USDKRW', sub:'Tied to local equity flows' },
    { label:'FOMC', big:'Sept 15', mid:'Vol event', sub:'Jobs on Sept 4 first' },
  ],
  detailHead: 'Dollar across assets',
  detailLines: [
    '💵 A stronger dollar can pressure gold, bitcoin and EM currencies',
    '📈 Strong Sept 4 jobs can pair with a stronger dollar and higher rates',
    '🇰🇷 USDKRW 1,369.2 and DXY 98.2 share the same macro backdrop',
  ],
  noteSub: 'DXY is not a standalone price; it tracks rates, jobs and the FOMC. Watch whether 98 holds more than the exact print, alongside the 2-year yield. Korean investors should log DXY next to USDKRW for flow reads.',
  footer: 'Dollar index · 98 line',
});

add('summary-krre', 'ROWS', 'POLICY', {
  headline: '2026.09.02 부동산 한장 요약',
  rows: [
    { color:'#fb923c', fill:'#1a0d02', right:'전세', title:'전세는 학군·역세권 일부에서 소폭 반등했습니다',
      sub:'지방은 약세가 이어지고 입주 물량이 변수입니다.' },
    { color:'#38bdf8', fill:'#061520', right:'매매', title:'매매는 FOMC·세금 부담으로 관망세가 이어집니다',
      sub:'수도권 실거래 지수는 보합~ -0.1% 구간입니다.' },
    { color:'#a78bfa', fill:'#120b1f', right:'정책', title:'공급 확대 수사와 대출 규제 유지가 공존합니다',
      sub:'LTV·DSR이 수요의 즉각적 지렛대입니다.' },
    { color:'#4ade80', fill:'#061209', right:'서울', title:'서울은 강남·마포 등 일부 구 소폭 반등',
      sub:'구별 온도 차를 분리해서 봐야 합니다.' },
    { color:'#22d3ee', fill:'#06171c', right:'경기', title:'경기·인천은 수도권 외곽 수요가 섞입니다',
      sub:'전세·매매 온도가 서울과 다를 수 있습니다.' },
    { color:'#f59e0b', fill:'#1a1205', right:'부산', title:'부산·제주는 지역별 수급 차가 큽니다',
      sub:'관광·이전 수요와 공급 물량이 변수입니다.' },
  ],
  caption: '더 볼 것: 전세 반등 · 매매 관망 · 공급·규제 · 서울·경기·부산·제주 · FOMC 9/15-16',
}, {
  headline: '2026.09.02 Korea property snapshot',
  rows: [
    { color:'#fb923c', fill:'#1a0d02', right:'JEONSE', title:'Jeonse bounced modestly in select school/transit pockets',
      sub:'Regions stay weak and move-in supply matters.' },
    { color:'#38bdf8', fill:'#061520', right:'SALES', title:'Sales stay sidelined on FOMC and tax burdens',
      sub:'Metro price indices are flat to down ~0.1%.' },
    { color:'#a78bfa', fill:'#120b1f', right:'POLICY', title:'Supply rhetoric coexists with tight loan rules',
      sub:'LTV and DSR caps hit demand immediately.' },
    { color:'#4ade80', fill:'#061209', right:'SEOUL', title:'Seoul shows pockets of bounce in select districts',
      sub:'Read district-level temperature, not one average.' },
    { color:'#22d3ee', fill:'#06171c', right:'GG', title:'Gyeonggi and Incheon mix outer-metro demand',
      sub:'Jeonse and sales can diverge from Seoul.' },
    { color:'#f59e0b', fill:'#1a1205', right:'BUSAN', title:'Busan and Jeju show wide regional spreads',
      sub:'Tourism, migration and supply differ by city.' },
  ],
  caption: 'Watch: jeonse bounce · sidelined sales · supply/rules · Seoul/Gyeonggi/Busan/Jeju · FOMC 9/15-16',
});

add('jeonse-krre', 'L3', 'JEONSE', {
  badge: '전세',
  title: '전세는 학군·역세권 일부 반등, 지방은 약세가 지속됩니다',
  heroIcon: '🔑', heroBig: '서울 일부 반등',
  heroSub: '9월 입주 물량과 전세대출 LTV·DSR 규제가 수요를 제한합니다.',
  cards: [
    { icon:'🏙️', big:'서울', mid:'강남·마포 등', sub:'0.2~0.4% 소폭 반등' },
    { icon:'📦', big:'입주', mid:'9월 물량', sub:'전세 공급 충격 후보' },
    { icon:'📉', big:'지방', mid:'약세 지속', sub:'수도권과 온도 차' },
  ],
  quote: '전세는 가격보다 입주 물량·대출 규제·금리가 방향을 정합니다.',
  noteSub: '학군·역세권 선호는 구조적입니다. FOMC 결과가 주담대 금리 기대에 전가되면 전세·매매 심리가 함께 움직일 수 있습니다. 지역별로 나눠 기록하시기 바랍니다.',
  footer: '전세 · 혼조',
}, {
  badge: 'JEONSE',
  title: 'Jeonse bounced in pockets while regions stayed weak',
  heroIcon: '🔑', heroBig: 'Seoul pockets up',
  heroSub: 'September move-ins and jeonse LTV/DSR rules cap demand.',
  cards: [
    { icon:'🏙️', big:'Seoul', mid:'Gangnam, Mapo', sub:'Modest 0.2-0.4% bounce' },
    { icon:'📦', big:'Supply', mid:'Sept move-ins', sub:'Potential jeonse shock' },
    { icon:'📉', big:'Regions', mid:'Still weak', sub:'Gap vs metro' },
  ],
  quote: 'Jeonse direction is set more by move-in supply, loan rules and rates than by headlines alone.',
  noteSub: 'School and transit premiums are structural. If FOMC shifts mortgage-rate expectations, jeonse and sales sentiment can move together. Log regions separately.',
  footer: 'Jeonse · mixed',
});

add('sale-krre', 'L5', 'KOSPI', {
  badge: '매매',
  title: '매매는 FOMC·세금 부담으로 관망, 실거래는 보합입니다',
  heroIcon: '🏠', heroBig: '관망세 지속',
  heroSub: '9월 FOMC·인상 확률 57%·보유세 부담으로 매수 관망이 이어집니다.',
  before: { label:'수요', big:'관망', sub:'금리·세금 부담' },
  after:  { label:'지수', big:'보합', sub:'수도권 -0.1% 안팎' },
  cards: [
    { icon:'📈', big:'57%', mid:'인상 확률', sub:'주담대 심리' },
    { icon:'🧾', big:'세금', mid:'보유·양도', sub:'매매 누름' },
    { icon:'📊', big:'거래량', mid:'선행 지표', sub:'가격보다 먼저 움직임' },
  ],
  quote: '매매 거래량은 가격보다 먼저 움직이는 경우가 많습니다.',
  noteSub: 'FOMC 9/15~16 결과가 국내 금리 기대에 전가됩니다. 긴축이면 거래 동결, 완화면 회복 기대가 나올 수 있습니다. 지역별로 미분양·거래량을 분리해 보시기 바랍니다.',
  footer: '매매 · 관망',
}, {
  badge: 'SALES',
  title: 'Sales stay sidelined as FOMC and taxes cap transactions',
  heroIcon: '🏠', heroBig: 'Wait-and-see',
  heroSub: 'September FOMC, ~57% hike odds and holding-tax burdens keep buyers on hold.',
  before: { label:'Demand', big:'Waiting', sub:'Rates and taxes' },
  after:  { label:'Index', big:'Flat', sub:'Metro ~-0.1%' },
  cards: [
    { icon:'📈', big:'57%', mid:'Hike odds', sub:'Mortgage sentiment' },
    { icon:'🧾', big:'Taxes', mid:'Holding/transfer', sub:'Caps turnover' },
    { icon:'📊', big:'Volume', mid:'Leading signal', sub:'Moves before price' },
  ],
  quote: 'Transaction volume often turns before prices do.',
  noteSub: 'FOMC Sept 15-16 feeds into local rate expectations. A hawkish result can freeze deals; a dovish surprise can revive hope. Split unsold inventory and volume by region.',
  footer: 'Sales · sidelined',
});

add('policy-krre', 'L2', 'POLICY', {
  badge: '정책',
  title: '9월 부동산 정책基調는 공급 확대 수사·대출 규제 유지입니다',
  heroIcon: '🏛️', heroBig: '공급+규제',
  heroSub: '택지·재개발 공급 확대와 전세대출 LTV·DSR 규제 유지가 공존합니다.',
  cards: [
    { label:'공급', big:'택지·재개발', mid:'중장기 변수', sub:'단기 가격과 속도 다름' },
    { label:'규제', big:'LTV·DSR', mid:'수요 지렛대', sub:'즉각적 영향' },
    { label:'FOMC', big:'9/15', mid:'금리 전가', sub:'주담대 심리' },
  ],
  detailHead: '정책이 가격에 닿는 경로',
  detailLines: [
    '🏗️ 공급 발표는 심리부터 움직이고 착공·입주는 늦게 반영됩니다',
    '🏦 LTV·DSR 규제는 수요를 바로 제한합니다',
    '📅 9~10월 입주+FOMC가 정책 리스크 구간입니다',
  ],
  noteSub: '정책은 집값 구호보다 LTV·DSR·공급 입주 일정이 실제 지렛대입니다. 지자체 주택·도시 계획은 지역별 온도 차를 만듭니다. 서울·경기·부산·제주를 분리해 기록하시기 바랍니다.',
  footer: '정책 · 공급·규제',
}, {
  badge: 'POLICY',
  title: 'September housing policy mixes supply expansion with tight loan rules',
  heroIcon: '🏛️', heroBig: 'Supply + rules',
  heroSub: 'Land and redevelopment supply rhetoric coexists with jeonse LTV and DSR caps.',
  cards: [
    { label:'Supply', big:'Land/redev', mid:'Medium-term', sub:'Slower than headlines' },
    { label:'Rules', big:'LTV/DSR', mid:'Demand lever', sub:'Immediate effect' },
    { label:'FOMC', big:'Sept 15', mid:'Rate pass-through', sub:'Mortgage mood' },
  ],
  detailHead: 'How policy reaches prices',
  detailLines: [
    '🏗️ Supply announcements move sentiment before groundbreaking',
    '🏦 LTV and DSR caps restrict demand immediately',
    '📅 Sept-Oct move-ins plus FOMC are the risk window',
  ],
  noteSub: 'LTV, DSR and move-in schedules matter more than slogans. Local housing plans widen regional gaps. Log Seoul, Gyeonggi, Busan and Jeju separately.',
  footer: 'Policy · supply and rules',
});

/* output */
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
