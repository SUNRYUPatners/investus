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
const DATE = '2026.08.29';
const TAG = '20260829';

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

/* ══════════════════════════ 미국 · 15 ══════════════════════════ */

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.08.29 한장 요약',
  rows: [
    { color:'#94a3b8', fill:'#0f1419', right:'JH',    title:'잭슨홀 연설이 매파적이었습니다',
      sub:'물가가 충분히 내려오지 않으면 금리를 더 올릴 수 있다는 발언이 나왔습니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'59.7%', title:'9월 금리 인상 확률이 59.7%로 뛰었습니다',
      sub:'연설 직전 35.4%에서 하루 만에 올라섰고 2년물 금리는 4.317%가 됐습니다.' },
    { color:'#facc15', fill:'#1a1600', right:'160엔', title:'엔·달러 환율이 160엔대로 올라섰습니다',
      sub:'약 한 달 만의 엔 약세 구간이며 개입 경계감이 다시 커졌습니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'NVDA',  title:'엔비디아 목표주가가 줄지어 상향됐습니다',
      sub:'320달러·315달러·425달러 등 최소 열 곳이 목표주가를 올렸습니다.' },
    { color:'#4ade80', fill:'#061209', right:'TSLA',  title:'사이버캡 운행 구역이 12배 넓어졌습니다',
      sub:'약 20제곱마일에서 약 245제곱마일로 확대됐습니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX',  title:'루이지애나 부지에서 지반 조사가 시작됐습니다',
      sub:'스타팩토리·테라팹 예정지 서쪽에서 코어 시료를 뽑고 있습니다.' },
  ],
  caption: '더 볼 것: 워시 매파 발언 · 9월 인상 확률 59.7% · 엔 160엔 · 단기금리 급등 · 엔비디아 목표가 상향 · 사이버캡 245제곱마일',
}, {
  headline: '2026.08.29 Daily Snapshot',
  rows: [
    { color:'#94a3b8', fill:'#0f1419', right:'JH',    title:'Warsh delivered a hawkish Jackson Hole speech',
      sub:'He said rates could go higher if inflation does not fall enough.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'59.7%', title:'September hike odds jumped to 59.7%',
      sub:'Up from 35.4% before the speech; the 2-year yield rose to 4.317%.' },
    { color:'#facc15', fill:'#1a1600', right:'160',   title:'The dollar-yen rate moved above 160',
      sub:'That is the weakest yen in about a month and revives intervention talk.' },
    { color:'#60a5fa', fill:'#0a1420', right:'NVDA',  title:'Nvidia price targets were raised across the street',
      sub:'At least ten brokers lifted targets, including $320, $315 and $425.' },
    { color:'#4ade80', fill:'#061209', right:'TSLA',  title:'The Cybercab service area expanded about 12 times',
      sub:'The geofence went from roughly 20 square miles to about 245.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX',  title:'Core drilling began at the Louisiana site',
      sub:'Samples are being taken on the west portion of the planned campus.' },
  ],
  caption: 'Also: hawkish Warsh · 59.7% Sept odds · yen 160 · short-end yields up · NVDA target hikes · Cybercab 245 sq mi',
});

add('jackson-hole-warsh-hawkish', 'L4', 'MACRO', {
  badge: 'MACRO', badgeLine: '🌐 잭슨홀 기조연설 · 2026.08.28',
  title: '워시 연준 의장이 잭슨홀 첫 기조연설에서 물가가 충분히 내려오지 않으면 금리를 더 올릴 수 있다고 말했습니다',
  heroIcon: '🎤', heroBig: '해야 할 일이 남아 있습니다',
  heroSub: '물가상승률이 충분히 내려가고 있다고 확신할 수 없다면 해야 할 일이 남아 있다는 표현으로, 추가 인상 가능성을 열어 두었습니다.',
  cards: [
    { icon:'🎯', big:'2%',   mid:'물가 목표', sub:'목표 복귀를 정책의 중심에 두었습니다' },
    { icon:'📊', big:'54%',  mid:'3% 이상 오른 품목 비중', sub:'코로나 이전 20년 평균은 32%였습니다' },
    { icon:'🧮', big:'4.1%', mid:'6개월 연율 물가', sub:'최근 개선을 추세로 보기는 이르다는 판단입니다' },
  ],
  quote: '"물가상승률이 충분히 내려가고 있다고 확신할 수 없다면 해야 할 일이 남아 있습니다." 특정 회의 결정을 미리 알려 주는 선제적 지침은 제공하지 않겠다고 밝혔고, 인공지능 관련 투자가 2021년 이후 가장 빠른 속도로 늘고 있다는 언급도 함께 나왔습니다.',
  noteSub: '연초까지 시장을 지배했던 금리 인하 기대가 사실상 정리된 발언입니다. 선제적 지침을 주지 않겠다는 것은 회의마다 지표를 보고 결정한다는 뜻이므로, 9월 초 발표되는 8월 고용과 소비자물가가 다음 판단 재료가 됩니다.',
  footer: '잭슨홀 · 워시 첫 기조연설',
}, {
  badge: 'MACRO', badgeLine: '🌐 Jackson Hole keynote · Aug 28, 2026',
  title: 'Warsh used his first Jackson Hole keynote to say rates can go higher if inflation does not fall enough',
  heroIcon: '🎤', heroBig: 'There is work left to do',
  heroSub: 'He said that if he cannot be confident inflation is falling enough, there is still work left to do, keeping another hike on the table.',
  cards: [
    { icon:'🎯', big:'2%',   mid:'Inflation target', sub:'Returning to target is now the policy center' },
    { icon:'📊', big:'54%',  mid:'Items up over 3%', sub:'The pre-Covid 20-year average was 32%' },
    { icon:'🧮', big:'4.1%', mid:'6-month annualized', sub:'Recent improvement is not yet a trend' },
  ],
  quote: '"If I cannot be confident that inflation is falling enough, there is work left to do." He also said he will not offer forward guidance on specific meetings, and noted that AI-related investment is growing at the fastest pace since 2021.',
  noteSub: 'This effectively retires the rate-cut expectations that dominated early in the year. No forward guidance means every meeting is data dependent, so the August jobs and CPI prints due in early September become the next real test.',
  footer: 'Jackson Hole · Warsh first keynote',
});

add('usdjpy-160', 'L1', 'JPY', {
  badge: 'JPY',
  title: '엔·달러 환율이 160엔대로 올라서며 약 한 달 만에 가장 약한 엔화 수준으로 돌아갔습니다',
  heroIcon: '💱', heroBig: '160.15',
  heroSub: '잭슨홀 연설 이후 미국과 일본의 금리 차이가 다시 부각되며 엔화가 약해졌습니다. 전일 대비 약 0.48% 올랐습니다.',
  cards: [
    { icon:'🇯🇵', big:'+0.48%',  mid:'엔·달러 상승률', sub:'숫자가 오르면 엔화가 약해진 것입니다' },
    { icon:'📅', big:'약 1개월', mid:'160엔대 재진입 간격', sub:'지난달 31일 협조 개입 이후 처음입니다' },
    { icon:'🏦', big:'미국 국채', mid:'일본은 주요 보유국', sub:'엔 약세가 길어지면 개입 재료가 됩니다' },
  ],
  quote: '160엔대에 올라선 것은 지난달 31일 미국과 일본의 협조 개입 이후 약 한 달 만입니다. 엔·달러 환율이 오른다는 말은 1달러를 사기 위해 엔을 더 많이 내야 한다는 뜻이므로 엔화 약세를 의미합니다.',
  noteSub: '엔화가 약해지면 일본 투자자의 해외 자산 평가액은 커지지만, 수입 물가와 무역수지에는 부담이 됩니다. 일본은 미국 국채를 많이 보유한 나라여서 개입이 실제로 이뤄지면 미국 장기금리에도 영향이 옵니다. 다음에는 당국 발언과 일본은행 회의 결과를 보시면 됩니다.',
  footer: '환율 · 엔 약세',
}, {
  badge: 'JPY',
  title: 'The dollar-yen rate pushed above 160, the weakest yen level in about a month',
  heroIcon: '💱', heroBig: '160.15',
  heroSub: 'After the Jackson Hole speech, the US-Japan rate gap came back into focus and the yen weakened about 0.48% on the day.',
  cards: [
    { icon:'🇯🇵', big:'+0.48%', mid:'Dollar-yen change', sub:'A higher number means a weaker yen' },
    { icon:'📅', big:'~1 month', mid:'Since the last 160 print', sub:'The first time since the July 31 joint action' },
    { icon:'🏦', big:'Treasuries', mid:'Japan is a top holder', sub:'A long yen slide keeps intervention live' },
  ],
  quote: 'This is the first move above 160 since the coordinated US-Japan intervention on July 31. A rising dollar-yen number means more yen are needed to buy one dollar, which is yen weakness rather than strength.',
  noteSub: 'A weaker yen lifts the value of Japanese holdings abroad but raises import costs. Japan is also a major holder of US Treasuries, so actual intervention can push back into US long-end yields. Watch official comments and the next Bank of Japan meeting.',
  footer: 'FX · yen weakness',
});

add('us-short-rates-surge', 'L2', 'RATES', {
  badge: 'RATES',
  title: '미국 단기 국채 금리가 일제히 급등해 1년물 4.123%, 2년물 4.317%, 5년물 4.451%가 됐습니다',
  heroIcon: '📈', heroBig: '4.317%',
  heroSub: '통화정책에 가장 민감한 2년물 금리가 하루 만에 약 2.01% 올랐습니다. 연준이 금리를 더 올릴 수 있다는 해석이 짧은 만기부터 반영됐습니다.',
  cards: [
    { label:'1년물', big:'4.123%', mid:'+2.51%', sub:'1년 안의 정책 경로를 반영합니다' },
    { label:'2년물', big:'4.317%', mid:'+2.01%', sub:'정책금리 기대에 가장 민감한 구간입니다' },
    { label:'5년물', big:'4.451%', mid:'+1.25%', sub:'중기 성장과 물가 기대를 함께 담습니다' },
  ],
  detailHead: '곡선이 이렇게 움직인 이유',
  detailLines: [
    '🎤 잭슨홀 연설이 추가 금리 인상 가능성을 열어 두었습니다',
    '🎯 짧은 만기가 먼저 오르면 단기 긴축 기대가 커진 것입니다',
    '🧭 단기물이 장기물보다 더 오르면 금리 곡선은 평탄해집니다',
  ],
  noteSub: '국채 금리는 만기별로 다른 이야기를 합니다. 1~2년물은 연준이 앞으로 무엇을 할지, 5년물은 성장과 물가를 함께 봅니다. 짧은 쪽이 더 크게 오른 이날 흐름은 시장이 인하가 아니라 인상을 준비하기 시작했다는 뜻입니다.',
  footer: '금리 · 단기물 급등',
}, {
  badge: 'RATES',
  title: 'Short-dated US yields jumped together: the 1-year at 4.123%, the 2-year at 4.317% and the 5-year at 4.451%',
  heroIcon: '📈', heroBig: '4.317%',
  heroSub: 'The policy-sensitive 2-year yield rose about 2.01% in a day, as the idea of further Fed hikes was priced into the front end first.',
  cards: [
    { label:'1-year', big:'4.123%', mid:'+2.51%', sub:'Reflects the path over the next year' },
    { label:'2-year', big:'4.317%', mid:'+2.01%', sub:'The most policy-sensitive maturity' },
    { label:'5-year', big:'4.451%', mid:'+1.25%', sub:'Mixes growth and inflation expectations' },
  ],
  detailHead: 'Why the curve moved this way',
  detailLines: [
    '🎤 The Jackson Hole speech left another hike on the table',
    '🎯 When the front end leads, tightening expectations are rising',
    '🧭 Short yields rising faster than long yields flattens the curve',
  ],
  noteSub: 'Different maturities tell different stories. One- and two-year yields track what the Fed will do next, while the five-year blends growth and inflation. The front end leading here means the market is preparing for hikes, not cuts.',
  footer: 'Rates · front-end surge',
});

add('fed-sept-hike-odds', 'L5', 'MACRO', {
  badge: 'MACRO',
  title: '9월 금리 인상 확률이 연설 직전 35.4%에서 59.7%로 하루 만에 뛰었습니다',
  heroIcon: '🎲', heroBig: '하루 만에 24%포인트 상승',
  heroSub: '선물시장 기준 9월 인상 확률이 크게 올랐지만, 다른 예측시장은 아직 절반 아래를 가리켜 해석이 갈립니다.',
  before: { label:'연설 직전', big:'35.4%', sub:'인상 가능성은 낮게 잡혀 있었습니다' },
  after:  { label:'연설 직후', big:'59.7%', sub:'하루 만에 절반을 크게 넘겼습니다' },
  cards: [
    { icon:'📉', big:'약 49%',      mid:'다른 예측시장', sub:'같은 사안을 절반 아래로 봅니다' },
    { icon:'🗓️', big:'9월 15~16일', mid:'다음 정책회의', sub:'8월 고용·물가 지표 발표 뒤입니다' },
    { icon:'🧩', big:'11월',        mid:'대체 시나리오', sub:'지표를 더 보고 움직일 수 있습니다' },
  ],
  quote: '확률이 60%라는 말은 40%는 인상이 없다는 뜻이기도 합니다. 시장 확률이 너무 높게 잡혔다는 반론도 함께 나왔고, 같은 사안을 두고 시장마다 숫자가 달랐습니다.',
  noteSub: '확률표는 예측이 아니라 시장이 지금 어디에 돈을 걸고 있는지를 보여 주는 온도계입니다. 시장마다 숫자가 다르면 아직 결론이 아니라는 뜻입니다. 9월 초 발표되는 8월 고용과 소비자물가가 이 확률을 다시 크게 움직일 수 있습니다.',
  footer: '연준 · 9월 인상 확률',
}, {
  badge: 'MACRO',
  title: 'Odds of a September hike jumped from 35.4% to 59.7% in a single day',
  heroIcon: '🎲', heroBig: 'A 24-point move in one day',
  heroSub: 'Futures-implied odds rose sharply, but another prediction market still sits below half, so the read is not settled.',
  before: { label:'Before the speech', big:'35.4%', sub:'A hike was priced as unlikely' },
  after:  { label:'After the speech',  big:'59.7%', sub:'Now well above a coin flip' },
  cards: [
    { icon:'📉', big:'~49%',      mid:'Another market', sub:'Still prices the same event below half' },
    { icon:'🗓️', big:'Sept 15-16', mid:'Next policy meeting', sub:'Comes after August jobs and CPI' },
    { icon:'🧩', big:'November',  mid:'Alternative path', sub:'The Fed may wait for more data' },
  ],
  quote: 'Sixty percent odds also mean a forty percent chance of no hike. Some argued the market number is too high, and different venues priced the same event differently on the same day.',
  noteSub: 'Probability boards are a thermometer of where money sits, not a forecast. When venues disagree, the question is still open. The August jobs and inflation prints in early September can move these odds sharply again.',
  footer: 'Fed · September hike odds',
});

add('nvda-pt-raises', 'L6', 'NVDA', {
  badge: 'NVDA', breaking: '목표주가 일제 상향',
  title: '엔비디아 목표주가가 실적 발표 뒤 최소 열 곳에서 줄지어 상향됐습니다',
  heroBig: '227.98달러',
  heroSub: '실적 발표 다음 정규장에서 8.74% 올라 마감한 뒤 상향이 이어졌습니다.',
  grid: [
    { icon:'🏦', big:'320달러', mid:'280달러에서 상향', sub:'가장 많이 인용된 조정입니다' },
    { icon:'📐', big:'315달러', mid:'300달러에서 상향', sub:'같은 구간 상향이 여러 곳 나왔습니다' },
    { icon:'🚀', big:'425달러', mid:'400달러에서 상향', sub:'제시된 목표 가운데 높은 편입니다' },
    { icon:'🔼', big:'400달러', mid:'315달러에서 상향', sub:'상향 폭이 85달러로 가장 컸습니다' },
  ],
  ctx1: '285달러에서 300달러로, 282달러에서 315달러로 올린 곳도 함께 확인됐습니다',
  ctx2: '목표주가는 약속이 아니라 애널리스트의 매출 가정이 바뀐 결과입니다',
  quote: '회계 2분기 매출은 962억 달러로 전년 대비 106% 늘었고 조정 주당순이익은 2.22달러였습니다. 3분기 매출 전망 1,080억 달러와 2028 회계연도 성장률 약 70% 제시가 상향의 직접 근거로 인용됐습니다.',
  noteSub: '목표주가가 오르는 이유는 실적이 좋아졌기 때문이 아니라 앞으로의 매출 가정이 올라갔기 때문입니다. 여러 곳이 같은 방향으로 움직이면 시장 평균 목표가도 함께 올라갑니다. 다음에는 3분기 실제 매출이 1,080억 달러 전망에 닿는지 확인하시면 됩니다.',
  footer: 'NVDA · 목표주가 상향',
}, {
  badge: 'NVDA', breaking: 'TARGETS RAISED ACROSS THE STREET',
  title: 'At least ten brokers raised Nvidia price targets after the quarterly report',
  heroBig: '$227.98',
  heroSub: 'The stock closed 8.74% higher in the session after earnings, and target hikes followed.',
  grid: [
    { icon:'🏦', big:'$320', mid:'raised from $280', sub:'The most widely cited revision' },
    { icon:'📐', big:'$315', mid:'raised from $300', sub:'Several landed in the same band' },
    { icon:'🚀', big:'$425', mid:'raised from $400', sub:'Among the highest targets given' },
    { icon:'🔼', big:'$400', mid:'raised from $315', sub:'The largest single step, up $85' },
  ],
  ctx1: 'Others moved from $285 to $300, from $300 to $315, and from $282 to $315',
  ctx2: 'A price target is not a promise; it is the output of revised revenue assumptions',
  quote: 'Fiscal Q2 revenue was $96.2B, up 106% year over year, with adjusted EPS of $2.22. The $108B Q3 outlook and roughly 70% fiscal 2028 growth guidance were cited directly as the reason for the upgrades.',
  noteSub: 'Targets rise because forward revenue assumptions rise, not because a past quarter looked good. When many houses move the same way, the street average moves with them. The next check is whether Q3 revenue actually reaches the $108B guide.',
  footer: 'NVDA · target hikes',
});

add('nvda-vera-rubin-price', 'L1', 'NVDA', {
  badge: 'NVDA',
  title: '엔비디아가 2027년 초 베라 루빈과 그레이스 블랙웰 서버 가격을 약 15% 올릴 것으로 전해졌습니다',
  heroIcon: '🧠', heroBig: '+15%',
  heroSub: '2027년 초 적용이 거론되며, 1기가와트 규모 데이터센터 한 곳당 비용이 50억 달러 이상 늘어날 수 있다는 계산이 함께 나왔습니다.',
  cards: [
    { icon:'🏗️', big:'50억 달러+', mid:'1기가와트당 추가 비용', sub:'데이터센터 한 곳 기준 계산입니다' },
    { icon:'📅', big:'2027년 초',   mid:'가격 인상 시점',       sub:'차세대 제품 전환 구간과 겹칩니다' },
    { icon:'🔌', big:'1GW',        mid:'기준 설비 규모',       sub:'대형 발전기 한 기가 만드는 전력 수준입니다' },
  ],
  quote: '차세대 제품인 베라 루빈과 그레이스 블랙웰 기반 서버 가격이 약 15% 오를 것으로 거론됩니다. 1기가와트는 대형 발전기 한 기가 만드는 전력에 가까운 규모이며, 그만한 데이터센터 한 곳의 장비 비용이 50억 달러 이상 늘어난다는 계산입니다.',
  noteSub: '가격을 올릴 수 있다는 것은 수요가 공급보다 많다는 신호입니다. 다만 같은 예산으로 살 수 있는 물량이 줄어들기 때문에 고객사의 투자 계획이 늦춰질 위험도 함께 커집니다. 다음에는 대형 고객사가 투자 규모를 그대로 유지하는지 확인하시면 됩니다.',
  footer: 'NVDA · 차세대 서버 가격',
}, {
  badge: 'NVDA',
  title: 'Nvidia is said to be raising Vera Rubin and Grace Blackwell server prices about 15% in early 2027',
  heroIcon: '🧠', heroBig: '+15%',
  heroSub: 'The increase is discussed for early 2027, and would add more than $5B of equipment cost to a single one-gigawatt data center.',
  cards: [
    { icon:'🏗️', big:'$5B+',      mid:'Added cost per gigawatt', sub:'Measured for one data center campus' },
    { icon:'📅', big:'Early 2027', mid:'Timing of the increase',  sub:'Overlaps the next-generation transition' },
    { icon:'🔌', big:'1GW',       mid:'Reference build size',    sub:'Close to the output of one large power unit' },
  ],
  quote: 'Servers built on the next-generation Vera Rubin and Grace Blackwell platforms are said to be priced about 15% higher. One gigawatt is close to the output of a single large power unit, and a build that size would carry over $5B in extra equipment cost.',
  noteSub: 'Being able to raise prices signals demand still exceeds supply. The flip side is that the same budget now buys less capacity, which raises the risk that customers stretch their build schedules. Watch whether large buyers keep their capital plans intact.',
  footer: 'NVDA · next-gen server pricing',
});

add('openai-jalapeno-inference-chip', 'L5', 'AI', {
  badge: 'AI',
  title: '오픈AI의 자체 추론 칩이 비교 대상 대비 지연을 약 4.2배 낮췄다는 수치가 제시됐습니다',
  heroIcon: '🌶️', heroBig: '지연 약 4.2배 개선',
  heroSub: '추론은 이미 학습된 모델이 답을 만들어 내는 단계입니다. 같은 효율 조건에서 지연이 낮으면 응답이 더 빨라집니다.',
  before: { label:'비교 기준 가속기', big:'1.0배', sub:'비교의 기준선입니다' },
  after:  { label:'자체 추론 칩',     big:'약 4.2배', sub:'지연이 낮은 쪽으로 개선됐습니다' },
  cards: [
    { icon:'🤝', big:'공동 개발', mid:'통신 반도체 기업과 협업', sub:'설계는 함께, 생산은 위탁하는 구조입니다' },
    { icon:'🎯', big:'추론 전용', mid:'학습이 아닌 응답 단계',   sub:'용도를 좁혀 효율을 올린 설계입니다' },
    { icon:'⚖️', big:'동등 효율', mid:'비교 조건',              sub:'효율을 맞춘 상태의 지연 비교입니다' },
  ],
  quote: '지연은 질문을 넣고 답이 나오기까지의 시간이며, 대화형 서비스에서는 체감 품질과 직접 연결됩니다. 같은 효율 조건에서 지연이 약 4.2배 낮다는 수치가 제시됐습니다.',
  noteSub: '자체 칩은 범용 가속기를 완전히 대체하기 어렵지만, 추론처럼 용도가 정해진 작업에서는 유리할 수 있습니다. 학습용 수요와 추론용 수요를 나눠 보시는 편이 좋습니다. 다음에는 실제 양산 시점과 사내 배치 비중을 확인하시면 됩니다.',
  footer: 'AI 반도체 · 추론 칩 비교',
}, {
  badge: 'AI',
  title: "OpenAI's in-house inference chip is claimed to cut latency about 4.2 times versus the reference part",
  heroIcon: '🌶️', heroBig: 'About 4.2x lower latency',
  heroSub: 'Inference is the stage where a trained model produces answers. At comparable efficiency, lower latency means faster responses.',
  before: { label:'Reference accelerator', big:'1.0x', sub:'This is the comparison baseline' },
  after:  { label:'In-house inference chip', big:'~4.2x', sub:'Improved on the latency side' },
  cards: [
    { icon:'🤝', big:'Co-designed', mid:'With a networking chip partner', sub:'Design shared, manufacturing outsourced' },
    { icon:'🎯', big:'Inference only', mid:'Serving, not training', sub:'A narrow scope traded for efficiency' },
    { icon:'⚖️', big:'Equal efficiency', mid:'Comparison basis', sub:'Latency measured at matched efficiency' },
  ],
  quote: 'Latency is the time between a request and an answer, and it maps directly to perceived quality in conversational products. The claim is roughly 4.2 times lower latency at comparable efficiency.',
  noteSub: 'Custom silicon rarely replaces general-purpose accelerators outright, but it can win on narrow workloads such as serving. It helps to separate training demand from inference demand. Watch the production timeline and how much internal traffic actually moves over.',
  footer: 'AI silicon · inference comparison',
});

add('softbank-10b-openai-loan', 'L1', 'AI', {
  badge: 'AI',
  title: '소프트뱅크가 오픈AI 투자 재원을 위해 100억 달러 규모 차입을 준비한다고 전해졌습니다',
  heroIcon: '💵', heroBig: '100억 달러',
  heroSub: '기존 부채를 새 조건으로 바꾸는 재조정 방식이 함께 거론됩니다. 자기 자본이 아니라 빌린 돈으로 투자를 이어 가는 구조입니다.',
  cards: [
    { icon:'🔁', big:'차입 재조정', mid:'기존 부채 조건 변경', sub:'만기와 금리를 다시 짜는 작업입니다' },
    { icon:'🎯', big:'오픈AI',     mid:'자금 사용 목적',     sub:'지분 투자 재원으로 거론됩니다' },
    { icon:'📊', big:'금리 환경',   mid:'조달 비용 변수',     sub:'금리가 오르면 이자 부담이 커집니다' },
  ],
  quote: '오픈AI 투자 재원을 마련하기 위해 100억 달러 규모의 차입을 준비하고 있다고 전해졌습니다. 부채 재조정은 빚을 없애는 것이 아니라 만기와 금리 조건을 다시 짜는 작업을 뜻합니다.',
  noteSub: '인공지능 투자에 들어가는 돈의 성격이 자기 자본에서 차입으로 옮겨 가고 있다는 점이 핵심입니다. 금리가 더 오를 수 있다는 전망이 나온 주에 차입 계획이 거론됐다는 사실도 함께 보셔야 합니다. 다음에는 조달 금리와 실제 집행 규모를 확인하시면 됩니다.',
  footer: 'AI 투자 · 차입 구조',
}, {
  badge: 'AI',
  title: 'SoftBank is reported to be arranging a $10B loan to fund its OpenAI investment',
  heroIcon: '💵', heroBig: '$10B',
  heroSub: 'The plan is described as refinancing existing debt, meaning the investment is funded with borrowed money rather than cash on hand.',
  cards: [
    { icon:'🔁', big:'Refinancing', mid:'Reworking existing debt', sub:'Maturities and rates are reset' },
    { icon:'🎯', big:'OpenAI',      mid:'Use of proceeds',        sub:'Cited as equity investment funding' },
    { icon:'📊', big:'Rate path',   mid:'Cost of funding',        sub:'Higher rates mean heavier interest' },
  ],
  quote: 'The company is said to be arranging about $10B of borrowing to fund its OpenAI stake. Refinancing does not remove debt; it resets maturities and interest terms on debt that already exists.',
  noteSub: 'The important shift is that AI investment money is moving from equity toward borrowing. It matters that this plan surfaced in the same week that markets moved to price further rate hikes. Watch the funding cost and how much is actually drawn.',
  footer: 'AI funding · debt structure',
});

add('amzn-anthropic-stake-math', 'L2', 'AMZN', {
  badge: 'AMZN',
  title: '앤트로픽 가치가 2조 5,000억 달러라면 아마존 보유 지분이 시가총액의 약 20%에 해당한다는 계산이 나왔습니다',
  heroIcon: '📦', heroBig: '약 20%',
  heroSub: '지분 가치를 빼고 보면 최근 5년 아마존 주가 상승은 약 10%에 그친다는 계산이 함께 제시됐습니다.',
  cards: [
    { label:'가정한 기업가치', big:'2.5조 달러', mid:'앤트로픽 기준',   sub:'확정 가치가 아니라 가정입니다' },
    { label:'시가총액 대비',   big:'약 20%',    mid:'아마존 보유 지분', sub:'지분 하나가 5분의 1을 설명합니다' },
    { label:'지분 제외 5년',   big:'약 +10%',   mid:'주가 상승률',     sub:'클라우드 성장에도 크지 않았습니다' },
  ],
  detailHead: '이 계산이 말해 주는 것',
  detailLines: [
    '🧮 지분 가치가 커질수록 본업의 기여도는 상대적으로 작아 보입니다',
    '☁️ 클라우드 매출은 늘었지만 주가에는 충분히 반영되지 않았습니다',
    '⚠️ 가정한 기업가치가 낮아지면 계산 결과도 함께 줄어듭니다',
  ],
  noteSub: '지분 가치로 설명되는 시가총액 비중이 커지면, 주가가 본업이 아니라 남의 회사 평가에 따라 흔들리게 됩니다. 앤트로픽 가치는 아직 확정되지 않은 가정이므로 하나의 숫자보다 범위로 보셔야 합니다. 다음에는 상장 서류와 클라우드 영업이익률을 확인하시면 됩니다.',
  footer: 'AMZN · 지분 가치 계산',
}, {
  badge: 'AMZN',
  title: 'If Anthropic is worth $2.5T, the Amazon stake equals roughly 20% of Amazon market cap',
  heroIcon: '📦', heroBig: '~20%',
  heroSub: 'Strip the stake out and Amazon shares are up only about 10% over the last five years, despite cloud growth.',
  cards: [
    { label:'Assumed value', big:'$2.5T',  mid:'For Anthropic',     sub:'An assumption, not a settled price' },
    { label:'Share of cap',  big:'~20%',   mid:'Amazon stake value', sub:'One holding explains a fifth of it' },
    { label:'5Y ex-stake',   big:'~+10%',  mid:'Share price change', sub:'Modest despite AWS growth' },
  ],
  detailHead: 'What this math implies',
  detailLines: [
    '🧮 The bigger the stake, the smaller the core business appears',
    '☁️ Cloud revenue grew, but the share price did not follow fully',
    '⚠️ Lower the assumed valuation and the whole result shrinks',
  ],
  noteSub: 'When a stake explains a large share of market cap, the share price starts to move on someone else valuation. The Anthropic number is still an assumption, so treat it as a range rather than a fact. Watch the filing timeline and the cloud operating margin.',
  footer: 'AMZN · stake valuation math',
});

add('tsla-cybercab-geofence-245', 'L6', 'TSLA', {
  badge: 'TSLA', breaking: '운행 구역 약 12배 확대',
  title: '테슬라가 사이버캡 운행 구역을 약 20제곱마일에서 약 245제곱마일로 넓혔습니다',
  heroBig: '245제곱마일',
  heroSub: '운전석 없는 전용 로보택시가 처음 지정된 구역 밖에서도 무인으로 달렸습니다.',
  grid: [
    { icon:'🚕', big:'245',    mid:'현재 운행 구역', sub:'제곱마일 기준 약 635제곱킬로미터입니다' },
    { icon:'📍', big:'20',     mid:'초기 운행 구역', sub:'제곱마일 기준 약 52제곱킬로미터였습니다' },
    { icon:'🧭', big:'약 12배', mid:'구역 확대 배수', sub:'면적 기준 단순 비교입니다' },
    { icon:'🛞', big:'무인',    mid:'운전석 없는 차량', sub:'안전요원 없이 달리는 구간입니다' },
  ],
  ctx1: '지오펜스는 자율주행 차량이 달릴 수 있도록 미리 지정해 둔 지리적 경계를 뜻합니다',
  ctx2: '같은 기간 다른 도시에서는 2인승 시험 차량의 주행도 함께 목격됐습니다',
  quote: '구역이 넓어지면 한 대가 하루에 태울 수 있는 승객 수가 늘어나고 빈 차로 이동하는 거리가 줄어듭니다. 로보택시 사업에서 구역 면적은 사실상 매출 상한과 같은 역할을 합니다.',
  noteSub: '구역이 넓어야 호출 대기 시간이 짧아지고 차량 회전율이 올라갑니다. 반대로 구역이 넓어지면 만나는 도로 상황도 다양해져 운행 난이도가 올라갑니다. 다음에는 확대된 구역이 유지되는지, 안전요원 없는 운행 비중이 늘어나는지 확인하시면 됩니다.',
  footer: 'TSLA · 사이버캡 운행 구역',
}, {
  badge: 'TSLA', breaking: 'SERVICE AREA UP ABOUT 12X',
  title: 'Tesla expanded the Cybercab service area from roughly 20 square miles to about 245',
  heroBig: '245 sq mi',
  heroSub: 'Driverless Cybercabs were seen operating outside the original mapped zone.',
  grid: [
    { icon:'🚕', big:'245',  mid:'Current zone',   sub:'About 635 square kilometers' },
    { icon:'📍', big:'20',   mid:'Original zone',  sub:'About 52 square kilometers' },
    { icon:'🧭', big:'~12x', mid:'Expansion ratio', sub:'A simple comparison by area' },
    { icon:'🛞', big:'No driver', mid:'Purpose-built', sub:'Running without a safety monitor onboard' },
  ],
  ctx1: 'A geofence is the pre-mapped boundary inside which a robotaxi may drive',
  ctx2: 'Two-seat test vehicles were also spotted running in another city over the same period',
  quote: 'A wider zone means more rides per vehicle per day and fewer empty repositioning miles. In a robotaxi business, service area functions as a practical ceiling on revenue.',
  noteSub: 'Wider coverage shortens pickup waits and lifts vehicle utilization, but it also exposes the fleet to more varied road conditions. Watch whether the larger zone holds and whether the share of monitor-free operation keeps rising.',
  footer: 'TSLA · Cybercab service area',
});

add('tsla-semi-einride-500', 'L3', 'TSLA', {
  badge: 'TSLA',
  title: '테슬라 세미가 2027년 말까지 모두 500대를 인도하는 공급 계획을 확보했습니다',
  heroIcon: '🚚', heroBig: '500대',
  heroSub: '2026년 말까지 75대를 먼저 인도하고, 2027년 말까지 425대를 더해 합계 500대가 되는 단계별 계획입니다.',
  cards: [
    { icon:'📦', big:'75대',   mid:'2026년 말까지',    sub:'첫 인도 구간입니다' },
    { icon:'🗓️', big:'425대',  mid:'2027년 말까지 추가', sub:'합계 500대가 됩니다' },
    { icon:'🔋', big:'전기 트럭', mid:'장거리 화물 운송',  sub:'전용 충전망 구축이 관건입니다' },
  ],
  quote: '대형 전기 트럭은 한 대 값이 크고 운행 거리가 길어, 계약 대수보다 실제 인도 시점과 충전 설비 준비 상태가 더 중요합니다. 이번 계획은 2026년 말 75대, 2027년 말 누적 500대로 나뉩니다.',
  noteSub: '화물 운송 회사가 500대를 계약했다는 것은 시험 도입 단계를 지나 운영 단계로 넘어간다는 뜻입니다. 다만 대형 전기 트럭은 전용 충전 설비 없이는 운행 일정을 짜기 어렵습니다. 다음에는 분기별 실제 인도 대수와 충전 거점 확보 속도를 확인하시면 됩니다.',
  footer: 'TSLA · 세미 500대 계획',
}, {
  badge: 'TSLA',
  title: 'Tesla Semi secured a plan to deliver 500 trucks in total by the end of 2027',
  heroIcon: '🚚', heroBig: '500 trucks',
  heroSub: 'The schedule is staged: 75 units by the end of 2026, then 425 more by the end of 2027 for 500 in total.',
  cards: [
    { icon:'📦', big:'75',      mid:'By end of 2026',   sub:'The first delivery tranche' },
    { icon:'🗓️', big:'425',     mid:'Added by end 2027', sub:'Bringing the total to 500' },
    { icon:'🔋', big:'Electric', mid:'Long-haul freight', sub:'Dedicated charging is the gating item' },
  ],
  quote: 'Heavy electric trucks are expensive per unit and run long routes, so delivery timing and charging readiness matter more than the headline order count. This plan splits into 75 units by end 2026 and 500 cumulative by end 2027.',
  noteSub: 'A 500-truck commitment from a freight operator suggests the move from pilot to operations. Even so, heavy electric trucks cannot be scheduled without dedicated charging. Watch quarterly delivered units and the pace of charging-site buildout.',
  footer: 'TSLA · Semi 500-truck plan',
});

add('tsla-modely-japan-import-no1', 'L3', 'TSLA', {
  badge: 'TSLA',
  title: '모델Y가 일본에서 수입차 판매 1위에 올랐습니다',
  heroIcon: '🇯🇵', heroBig: '수입차 판매 1위',
  heroSub: '8월 28일 기준으로 일본 시장에서 가장 많이 팔린 수입 차량이 됐습니다.',
  cards: [
    { icon:'🥇', big:'1위',   mid:'일본 수입차 판매',      sub:'8월 28일 기준 집계입니다' },
    { icon:'🚙', big:'모델Y', mid:'판매 1위 차종',         sub:'중형 전동 스포츠유틸리티차입니다' },
    { icon:'🏯', big:'일본',  mid:'자국 브랜드가 강한 시장', sub:'수입차 점유율이 낮은 편입니다' },
  ],
  quote: '일본은 자국 브랜드와 경차 비중이 매우 높아 수입차가 자리를 잡기 어려운 시장으로 꼽힙니다. 그런 시장에서 수입차 판매 1위에 올랐다는 것은 특정 차종의 가격과 상품성이 현지 수요와 맞물렸다는 뜻입니다.',
  noteSub: '판매 1위는 절대 대수가 크다는 뜻이 아니라 같은 분류 안에서 가장 많이 팔렸다는 뜻입니다. 일본은 수입차 전체 시장 자체가 작기 때문에 순위와 대수를 함께 보셔야 합니다. 다음에는 월간 등록 대수와 순위가 유지되는지 확인하시면 됩니다.',
  footer: 'TSLA · 일본 수입차 1위',
}, {
  badge: 'TSLA',
  title: 'The Model Y became the best-selling imported car in Japan',
  heroIcon: '🇯🇵', heroBig: 'No. 1 imported car',
  heroSub: 'As of August 28 it was the most-sold imported vehicle in the Japanese market.',
  cards: [
    { icon:'🥇', big:'No. 1',   mid:'Japan import sales', sub:'Based on the August 28 tally' },
    { icon:'🚙', big:'Model Y', mid:'The leading model',  sub:'A mid-size electric crossover' },
    { icon:'🏯', big:'Japan',   mid:'Home brands dominate', sub:'Import share is structurally low' },
  ],
  quote: 'Japan is one of the hardest markets for imports, with very high domestic-brand and kei-car share. Leading import sales there suggests one model matched local demand on both price and product.',
  noteSub: 'A number-one ranking is about relative position, not absolute volume, and the total import market in Japan is small. Read the rank together with monthly registration counts, and watch whether the position holds next month.',
  footer: 'TSLA · Japan import leader',
});

add('spcx-louisiana-core-sampling', 'L2', 'SPCX', {
  badge: 'SPCX',
  title: '스페이스X가 루이지애나 공장 예정지 서쪽에서 지반 시추 조사를 시작했습니다',
  heroIcon: '🛠️', heroBig: '지반 시추 조사',
  heroSub: '코어 시료를 뽑아 지층을 확인하는 단계이며, 대형 공장과 발사 설비 설계에 앞서 반드시 거치는 절차입니다.',
  cards: [
    { label:'조사 방식', big:'코어 시추', mid:'지층 시료 채취',     sub:'땅속 상태를 직접 확인합니다' },
    { label:'조사 구역', big:'부지 서쪽', mid:'예정지 일부 구간',   sub:'전체가 아니라 서쪽부터입니다' },
    { label:'예정 설비', big:'공장·팹',   mid:'스타팩토리와 테라팹', sub:'건설 순서를 가르는 사전 작업입니다' },
  ],
  detailHead: '시추 조사가 필요한 이유',
  detailLines: [
    '🧱 무거운 구조물은 지반이 버틸 수 있는지 먼저 확인해야 합니다',
    '📐 지층 자료가 나오면 기초 공사 방식과 비용이 정해집니다',
    '🕐 조사 결과가 늦어지면 착공 일정 전체가 뒤로 밀립니다',
  ],
  noteSub: '시추 조사는 눈에 띄는 소식은 아니지만 착공 일정의 출발선입니다. 계획 발표와 실제 공사 사이에는 허가와 지반 조사라는 두 단계가 남아 있습니다. 다음에는 조사 완료 뒤 기초 공사 허가와 착공 발표가 나오는지 확인하시면 됩니다.',
  footer: 'SPCX · 루이지애나 부지 조사',
}, {
  badge: 'SPCX',
  title: 'SpaceX began core drilling on the west portion of its planned Louisiana site',
  heroIcon: '🛠️', heroBig: 'Core sampling',
  heroSub: 'Crews are pulling core samples to map subsurface layers, a required step before designing a large factory and launch infrastructure.',
  cards: [
    { label:'Method', big:'Core drilling', mid:'Subsurface samples', sub:'Directly checks ground conditions' },
    { label:'Area',   big:'West portion',  mid:'Part of the site',   sub:'Starting west rather than site-wide' },
    { label:'Planned', big:'Factory & fab', mid:'Starfactory, Terafab', sub:'Sequencing depends on this survey' },
  ],
  detailHead: 'Why the survey comes first',
  detailLines: [
    '🧱 Heavy structures require proof the ground can carry the load',
    '📐 Subsurface data sets the foundation method and its cost',
    '🕐 A late survey pushes the entire construction schedule back',
  ],
  noteSub: 'Core sampling is unglamorous but it is the starting line for construction timing. Between an announcement and a real build sit two gates: permits and geotechnical work. Watch for foundation permits and a groundbreaking date once the survey wraps.',
  footer: 'SPCX · Louisiana site survey',
});

add('spcx-starshield-maritime', 'L3', 'SPCX', {
  badge: 'SPCX',
  title: '위성통신 사업이 군용기 계약과 개인용 해상 요금제로 동시에 넓어졌습니다',
  heroIcon: '🛰️', heroBig: '군용기와 해상으로 확장',
  heroSub: '군용 항공기용 위성통신 공급 계약과 개인용 해상 요금제가 같은 날 함께 확인됐습니다.',
  cards: [
    { icon:'✈️', big:'군용기',      mid:'우주군 발주 계약',    sub:'정부 수요는 단가가 높은 편입니다' },
    { icon:'🚤', big:'월 185달러',  mid:'영해 내 무제한 요금제', sub:'개인용 해상 상품입니다' },
    { icon:'🌊', big:'1GB당 6달러', mid:'12해리 밖 사용',      sub:'영해를 벗어나면 별도로 과금됩니다' },
  ],
  quote: '군용 항공기에 위성통신을 공급하는 계약이 확인됐고, 개인용 해상 요금제는 영해 안에서 월 185달러 무제한, 12해리 밖에서는 1기가바이트당 6달러로 나뉩니다. 12해리는 각국이 영해로 인정하는 거리 기준입니다.',
  noteSub: '위성통신 매출은 가입자 수보다 어떤 고객이 쓰는지가 중요합니다. 군과 항공·해운은 대체 수단이 적어 가격을 방어하기 쉬운 시장입니다. 다음에는 계약 연장 선택권 행사와 해상 가입자 증가 속도를 확인하시면 됩니다.',
  footer: 'SPCX · 군용기 계약과 해상 요금제',
}, {
  badge: 'SPCX',
  title: 'The satellite communications business widened into military aircraft and personal maritime plans at once',
  heroIcon: '🛰️', heroBig: 'Defense and maritime',
  heroSub: 'A Space Force contract for military aircraft connectivity and a personal maritime plan surfaced on the same day.',
  cards: [
    { icon:'✈️', big:'Military air', mid:'Space Force award',    sub:'Government demand carries higher pricing' },
    { icon:'🚤', big:'$185/mo',     mid:'Unlimited inshore', sub:'A personal maritime plan for territorial waters' },
    { icon:'🌊', big:'$6 per GB',   mid:'Beyond 12 nautical miles', sub:'Charged separately outside the limit' },
  ],
  quote: 'A contract to supply satellite links for military aircraft was confirmed, while the personal maritime plan runs $185 per month unlimited inside territorial waters and $6 per gigabyte beyond 12 nautical miles, the standard territorial limit.',
  noteSub: 'In satellite connectivity, who the customer is matters more than raw subscriber counts. Defense, aviation and shipping have few substitutes, which makes pricing easier to defend. Watch whether the extension option is exercised and how fast maritime subscribers grow.',
  footer: 'SPCX · defense award and maritime plans',
});

/* ══════════════════════════ 한국주식 · 7 ══════════════════════════ */

add('summary-kr', 'ROWS', 'MACRO', {
  headline: '2026.08.29 한국장 한장 요약',
  rows: [
    { color:'#ef4444', fill:'#1a0a0a', right:'-1.79%',  title:'코스피가 6,788.88로 1.79% 내렸습니다',
      sub:'전날 상승분을 하루 만에 대부분 반납하고 6,800선을 내줬습니다.' },
    { color:'#22d3ee', fill:'#06171c', right:'외국인',   title:'외국인이 1조 7,564억 원을 순매도했습니다',
      sub:'기관도 2,842억 원을 팔았고 개인이 4,244억 원을 받아냈습니다.' },
    { color:'#f59e0b', fill:'#1a1205', right:'-4.45%',  title:'SK하이닉스가 4.45% 내려 반도체가 밀렸습니다',
      sub:'삼성전자도 3% 안팎 내렸고 전기·전자 업종이 3%대 하락했습니다.' },
    { color:'#4ade80', fill:'#061209', right:'1372.5',  title:'원·달러 환율은 8.4원 내린 1,372.5원이었습니다',
      sub:'외국인 순매도에도 글로벌 달러 약세 압력이 더 강했습니다.' },
    { color:'#a78bfa', fill:'#120b1f', right:'2030',    title:'메모리 공급 부족이 2030년 말까지 간다는 전망입니다',
      sub:'미국 인디애나 고대역폭 메모리 공장 기공식에서 나온 발언입니다.' },
    { color:'#94a3b8', fill:'#0f1419', right:'JH',      title:'잭슨홀 매파 발언이 다음 주 수급 변수로 남았습니다',
      sub:'9월 인상 확률이 59.7%로 뛰어 환율과 외국인 수급을 흔들 수 있습니다.' },
  ],
  caption: '더 볼 것: 코스피 6,788.88 · 외국인 1조 7,564억 순매도 · 하이닉스 -4.45% · 환율 1,372.5원 · 메모리 부족 2030 · 잭슨홀',
}, {
  headline: '2026.08.29 Korea Market Snapshot',
  rows: [
    { color:'#ef4444', fill:'#1a0a0a', right:'-1.79%', title:'KOSPI fell 1.79% to close at 6,788.88',
      sub:'It gave back most of the prior session gain and lost the 6,800 line.' },
    { color:'#22d3ee', fill:'#06171c', right:'Foreign', title:'Foreign investors sold a net 1.756 trillion won',
      sub:'Institutions sold 284bn won while retail absorbed 424bn won.' },
    { color:'#f59e0b', fill:'#1a1205', right:'-4.45%', title:'SK Hynix dropped 4.45% and led chips lower',
      sub:'Samsung Electronics fell around 3% and tech hardware lost over 3%.' },
    { color:'#4ade80', fill:'#061209', right:'1372.5', title:'The won closed 8.4 won stronger at 1,372.5',
      sub:'Global dollar weakness outweighed foreign equity selling.' },
    { color:'#a78bfa', fill:'#120b1f', right:'2030',   title:'Memory tightness is seen lasting through end-2030',
      sub:'The comment came at the Indiana HBM packaging groundbreaking.' },
    { color:'#94a3b8', fill:'#0f1419', right:'JH',     title:'The hawkish Jackson Hole speech is next week risk',
      sub:'September hike odds at 59.7% can move the won and foreign flows.' },
  ],
  caption: 'Also: KOSPI 6,788.88 · foreign net sell 1.756T won · Hynix -4.45% · USDKRW 1,372.5 · memory tight to 2030 · Jackson Hole',
});

add('kospi-kr', 'L6', 'KOSPI', {
  badge: 'KOSPI', breaking: '6,800선 하회',
  title: '코스피가 123.49포인트 내린 6,788.88로 마감해 6,800선을 내줬습니다',
  heroBig: '6,788.88',
  heroSub: '전날 1.53% 오르며 6,900선에 올라섰지만 하루 만에 상승분을 대부분 반납했습니다.',
  grid: [
    { icon:'📉', big:'-1.79%',   mid:'코스피 하락률', sub:'123.49포인트 내렸습니다' },
    { icon:'🔻', big:'6,780',    mid:'장중 저점',    sub:'-1.91%까지 밀렸습니다' },
    { icon:'🔼', big:'6,902',    mid:'장중 고점',    sub:'-0.15%까지 회복했습니다' },
    { icon:'📗', big:'838.41',   mid:'코스닥 종가',   sub:'0.09% 올라 보합권이었습니다' },
  ],
  ctx1: '6,846.54로 하락 출발한 뒤 장중 등락을 거듭했지만 낙폭을 만회하지 못했습니다',
  ctx2: '잭슨홀 회의를 앞둔 경계감과 대외 정책 불확실성이 함께 작용했습니다',
  quote: '전날 미국에서 인공지능 반도체 실적이 좋게 나왔는데도 국내 증시는 반대로 움직였습니다. 좋은 실적 뉴스가 지수를 끌어올리지 못한 하루였고, 원인은 국내가 아니라 대외 변수에 있었습니다.',
  noteSub: '지수가 하루 만에 전날 상승분을 반납했다는 것은 상승의 근거가 국내 요인이 아니었다는 뜻입니다. 6,800선은 심리적 기준선이므로, 다음 주에 이 선을 회복하는지가 첫 확인 지점입니다. 외국인 순매수 전환 여부를 함께 보시면 됩니다.',
  footer: '코스피 · 6,800선 하회',
}, {
  badge: 'KOSPI', breaking: 'BELOW THE 6,800 LINE',
  title: 'KOSPI closed 123.49 points lower at 6,788.88, giving up the 6,800 line',
  heroBig: '6,788.88',
  heroSub: 'The index closed above 6,900 the day before, then gave most of it back.',
  grid: [
    { icon:'📉', big:'-1.79%', mid:'Index change', sub:'A drop of 123.49 points' },
    { icon:'🔻', big:'6,780',  mid:'Session low',  sub:'Down as much as 1.91%' },
    { icon:'🔼', big:'6,902',  mid:'Session high', sub:'Recovered to just -0.15%' },
    { icon:'📗', big:'838.41', mid:'KOSDAQ close', sub:'Up 0.09%, essentially flat' },
  ],
  ctx1: 'The index opened lower at 6,846.54 and swung both ways but never closed the gap',
  ctx2: 'Caution ahead of Jackson Hole combined with external policy uncertainty',
  quote: 'Strong AI chip earnings in the US the night before did not carry over. Good news failed to lift the index, and the driver sat outside Korea rather than inside it.',
  noteSub: 'Giving back a full session gain in one day suggests the rally was not built on domestic fundamentals. The 6,800 line is a psychological marker, so the first check next week is whether it is reclaimed, alongside any turn in foreign net buying.',
  footer: 'KOSPI · below 6,800',
});

add('foreign-flow-kr', 'L2', 'FLOW', {
  badge: '수급',
  title: '외국인이 1조 7,564억 원을 순매도해 지수 하락을 이끌었습니다',
  heroIcon: '💸', heroBig: '1조 7,564억',
  heroSub: '장 초반 407억 원이던 외국인 순매도가 마감까지 크게 늘어났습니다. 개인이 4,244억 원을 순매수해 물량을 받아냈습니다.',
  cards: [
    { label:'외국인', big:'-1조 7,564억', mid:'순매도', sub:'반도체 대형주에 집중됐습니다' },
    { label:'기관',   big:'-2,842억',    mid:'순매도', sub:'장 초반보다 매도가 늘었습니다' },
    { label:'개인',   big:'+4,244억',    mid:'순매수', sub:'장 초반 대비 약 4.4배 확대됐습니다' },
  ],
  detailHead: '수급이 이렇게 움직인 배경',
  detailLines: [
    '🎤 잭슨홀 연설을 앞둔 경계감이 매도 규모를 키웠습니다',
    '💵 원·달러 환율은 8.4원 내린 1,372.5원으로 마감했습니다',
    '📦 외국인 매도는 시가총액 상위 반도체주에 몰렸습니다',
  ],
  noteSub: '보통 외국인이 주식을 팔면 환전 수요가 생겨 환율이 오르지만, 이날은 세계적으로 달러가 약해지는 힘이 더 컸습니다. 환율과 수급이 같은 방향으로 움직이지 않는 날은 원인이 국내가 아니라 해외에 있다는 신호입니다. 다음에는 외국인 순매수 전환 시점을 보시면 됩니다.',
  footer: '수급 · 외국인 순매도',
}, {
  badge: 'FLOWS',
  title: 'Foreign investors sold a net 1.7564 trillion won and led the index lower',
  heroIcon: '💸', heroBig: '1.756T won',
  heroSub: 'Foreign selling was only 40.7bn won early in the session and grew sharply into the close, while retail bought 424.4bn won.',
  cards: [
    { label:'Foreign',      big:'-1.756T', mid:'Net sell', sub:'Concentrated in large-cap chips' },
    { label:'Institutions', big:'-284bn',  mid:'Net sell', sub:'Selling widened through the day' },
    { label:'Retail',       big:'+424bn',  mid:'Net buy',  sub:'About 4.4 times the early figure' },
  ],
  detailHead: 'What drove the flows',
  detailLines: [
    '🎤 Caution ahead of the Jackson Hole speech widened the selling',
    '💵 The won closed 8.4 won stronger at 1,372.5 per dollar',
    '📦 Foreign selling clustered in the largest chip names',
  ],
  noteSub: 'Foreign selling usually pushes the currency weaker through conversion demand, but global dollar softness dominated on the day. When flows and FX disagree, the cause is usually offshore rather than domestic. Watch for the point where foreign net buying turns.',
  footer: 'Flows · foreign net selling',
});

add('samsung-kr', 'L1', 'SEC', {
  badge: '삼성전자',
  title: '삼성전자가 3% 안팎 내리며 전기·전자 업종 약세를 이끌었습니다',
  heroIcon: '📱', heroBig: '약 -3%',
  heroSub: '미국 인공지능 반도체 실적 호조에도 외국인 매도가 대형 반도체주에 집중되며 하락했습니다.',
  cards: [
    { icon:'🏭', big:'전기·전자', mid:'업종 하락률 3%대',  sub:'지수 하락의 가장 큰 축이었습니다' },
    { icon:'🌐', big:'외국인',   mid:'반도체 집중 매도',   sub:'전체 1조 7,564억 원 순매도였습니다' },
    { icon:'🗓️', big:'다음 확인', mid:'월간 반도체 수출',   sub:'기대가 계약으로 이어지는지 봅니다' },
  ],
  quote: '전날 미국에서 인공지능 반도체 실적이 예상을 넘겼지만 국내 대형 반도체주는 반대로 움직였습니다. 좋은 뉴스가 나온 다음 날 주가가 내리는 경우는 이미 기대가 가격에 반영돼 있을 때 자주 나타납니다.',
  noteSub: '미국 실적이 좋다고 국내 메모리 실적이 곧바로 좋아지는 것은 아닙니다. 사이에는 계약 가격과 출하량이라는 두 단계가 있습니다. 다음에는 월간 반도체 수출 증가율과 서버용 메모리 계약 가격을 확인하시면 기대와 실적의 거리를 스스로 재실 수 있습니다.',
  footer: '삼성전자 · 반도체 약세',
}, {
  badge: 'SAMSUNG',
  title: 'Samsung Electronics fell around 3% and led tech hardware lower',
  heroIcon: '📱', heroBig: '~-3%',
  heroSub: 'Despite strong US AI chip earnings, foreign selling concentrated in the largest Korean chip names and pulled the sector down.',
  cards: [
    { icon:'🏭', big:'Tech hardware', mid:'Sector down over 3%', sub:'The largest drag on the index' },
    { icon:'🌐', big:'Foreign',       mid:'Selling in chips',    sub:'1.756T won net sell market-wide' },
    { icon:'🗓️', big:'Next check',    mid:'Monthly chip exports', sub:'Tests whether hope becomes contracts' },
  ],
  quote: 'US AI chip results beat expectations the night before, yet the large Korean chip names moved the other way. Shares falling the day after good news often means the expectation was already in the price.',
  noteSub: 'Strong US results do not translate directly into Korean memory earnings. Two steps sit in between: contract prices and shipment volumes. Track monthly semiconductor export growth and server memory contract prices to measure the gap yourself.',
  footer: 'Samsung · chip weakness',
});

add('hynix-kr', 'L3', 'HYNIX', {
  badge: 'SK하이닉스',
  title: 'SK하이닉스는 4.45% 내렸지만 최고경영자는 메모리 공급 부족이 2030년 말까지 이어진다고 밝혔습니다',
  heroIcon: '🧊', heroBig: '-4.45%',
  heroSub: '주가는 1,653,000원으로 77,000원 내렸습니다. 같은 주 미국 인디애나 고대역폭 메모리 공장 기공식에서는 장기 공급 부족 전망이 제시됐습니다.',
  cards: [
    { icon:'🗓️', big:'2030년 말',  mid:'공급 부족 예상 시점',   sub:'시장 예상보다 약 2년 긴 전망입니다' },
    { icon:'🏗️', big:'40억 달러',  mid:'인디애나 공장 투자',    sub:'2029년 하반기 양산 계획입니다' },
    { icon:'🧩', big:'맞춤형 전환', mid:'범용에서 고객 맞춤으로', sub:'과거식 가격 급락 가능성을 낮춥니다' },
  ],
  quote: '최고경영자는 경기 하강을 예고하는 뚜렷한 신호가 보이지 않는다며 타이트한 수급이 2030년 말까지 이어질 것으로 예상한다고 밝혔습니다. 시장은 2028년 무렵 해소를 예상해 왔으므로, 전망 기간이 약 2년 더 긴 셈입니다.',
  noteSub: '메모리는 예전에 호황기에 늘린 물량이 한꺼번에 풀려 가격이 급락하는 일이 반복됐습니다. 고객 맞춤형 제품 비중이 커지면 필요한 물량을 미리 파악할 수 있어 급락 위험이 줄어듭니다. 다음에는 인디애나 공장 일정과 분기 영업이익률을 확인하시면 됩니다.',
  footer: 'SK하이닉스 · 공급 부족 전망',
}, {
  badge: 'SK HYNIX',
  title: 'SK Hynix fell 4.45% even as its CEO said memory tightness will last through the end of 2030',
  heroIcon: '🧊', heroBig: '-4.45%',
  heroSub: 'Shares closed 77,000 won lower at 1,653,000 won, while the Indiana HBM packaging groundbreaking brought a long-tightness outlook.',
  cards: [
    { icon:'🗓️', big:'End-2030',  mid:'Tight supply horizon',  sub:'About two years past consensus' },
    { icon:'🏗️', big:'$4B',       mid:'Indiana fab investment', sub:'Mass production from 2H 2029' },
    { icon:'🧩', big:'Custom mix', mid:'From commodity to custom', sub:'Lowers the odds of a price crash' },
  ],
  quote: 'The chief executive said there is no clear signal of a downturn and that tight supply should persist through the end of 2030. Consensus had assumed relief around 2028, so this outlook runs roughly two years longer.',
  noteSub: 'Memory has repeatedly crashed when boom-time capacity arrived all at once. As customer-specific products take a larger share, required volumes become visible earlier and crash risk falls. Watch the Indiana timeline and the quarterly operating margin.',
  footer: 'SK Hynix · long tight-supply call',
});

add('jackson-kr', 'L4', 'MACRO', {
  badge: '매크로', badgeLine: '🌐 잭슨홀 이후 · 국내 영향 점검',
  title: '잭슨홀 매파 발언이 원화와 외국인 수급에 다음 주 변수로 남았습니다',
  heroIcon: '🧭', heroBig: '금리 인하 기대가 정리됐습니다',
  heroSub: '9월 인상 확률이 59.7%로 뛰면서 원화와 외국인 자금에 대한 계산도 함께 바뀌었습니다.',
  cards: [
    { icon:'📈', big:'59.7%',     mid:'9월 인상 확률',    sub:'연설 직전에는 35.4%였습니다' },
    { icon:'💵', big:'1,372.5원', mid:'원·달러 환율 종가', sub:'8.4원 내렸지만 방향은 다시 열렸습니다' },
    { icon:'🌐', big:'1조 7,564억', mid:'외국인 순매도',   sub:'연설 경계감이 반영된 수치입니다' },
  ],
  quote: '미국 금리가 더 오를 수 있다는 전망은 한국 시장에 두 가지로 옵니다. 첫째, 달러 자산의 상대 매력이 커져 외국인 자금이 빠질 수 있습니다. 둘째, 원화가 약해지면 수출 기업에는 유리하지만 외국인 투자 수익률에는 불리합니다.',
  noteSub: '미국 금리가 오르면 한국은 금리를 따라 올리지 않아도 환율을 통해 영향을 받습니다. 환율이 오르면 외국인은 같은 주가에서도 손실을 볼 수 있어 매도가 늘어날 수 있습니다. 다음에는 원·달러 환율과 외국인 순매수를 한 표에 나란히 적어 두고 보시면 됩니다.',
  footer: '매크로 · 잭슨홀 이후 국내 영향',
}, {
  badge: 'MACRO', badgeLine: '🌐 After Jackson Hole · Korea read-through',
  title: 'The hawkish Jackson Hole message leaves the won and foreign flows as next week key variables',
  heroIcon: '🧭', heroBig: 'Rate-cut hopes are gone',
  heroSub: 'With September hike odds at 59.7%, the calculus for the won and for foreign equity money changed at the same time.',
  cards: [
    { icon:'📈', big:'59.7%',   mid:'September hike odds', sub:'It was 35.4% before the speech' },
    { icon:'💵', big:'1,372.5', mid:'USDKRW close',        sub:'8.4 won stronger, but direction reopened' },
    { icon:'🌐', big:'1.756T',  mid:'Foreign net selling', sub:'Reflects pre-speech caution' },
  ],
  quote: 'Higher-for-longer US rates reach Korea in two ways. First, dollar assets look relatively more attractive, which can pull foreign money out. Second, a weaker won helps exporters but hurts the returns foreign investors actually realize.',
  noteSub: 'Korea feels US rate moves through the exchange rate even without matching them. A weaker won can turn a flat share price into a loss for offshore holders, which invites more selling. Keep USDKRW and foreign net buying side by side in one table.',
  footer: 'Macro · Korea read-through',
});

add('top10-kr', 'L5', 'KOSPI', {
  badge: '시총 상위',
  title: '시가총액 상위 종목이 반도체 약세와 금융·자동차 강세로 갈렸습니다',
  heroIcon: '⚖️', heroBig: '업종별로 방향이 갈렸습니다',
  heroSub: '같은 날 지수는 1.79% 내렸지만 모든 대형주가 함께 내린 것은 아니었습니다.',
  before: { label:'내린 쪽', big:'반도체·바이오', sub:'삼성바이오로직스는 6%대 내렸습니다' },
  after:  { label:'오른 쪽', big:'금융·자동차',   sub:'KB금융과 기아 등이 올랐습니다' },
  cards: [
    { icon:'🏦', big:'2%대 상승', mid:'KB금융',          sub:'금융주가 상대적으로 강했습니다' },
    { icon:'🚗', big:'1%대 상승', mid:'기아',            sub:'자동차는 하락장에서 버텼습니다' },
    { icon:'🧪', big:'6%대 하락', mid:'삼성바이오로직스', sub:'대형주 가운데 낙폭이 컸습니다' },
  ],
  quote: '지수가 내린 날에도 화학은 3%대, 섬유·의류와 음식료·담배는 2~3% 올랐습니다. 반면 전기·전자는 3%대, 전기가스와 제약은 3% 안팎 내렸습니다.',
  noteSub: '지수는 평균이므로 업종별 온도 차를 감춥니다. 금리가 더 오를 수 있다는 전망이 나오면 금융주가 상대적으로 유리해지고, 기대가 많이 반영된 기술주는 먼저 눌립니다. 다음에는 업종별 등락률 표를 지수와 함께 보시면 됩니다.',
  footer: '시총 상위 · 업종 방향 분화',
}, {
  badge: 'TOP CAPS',
  title: 'Large-cap leadership split between weak chips and firm financials and autos',
  heroIcon: '⚖️', heroBig: 'Sectors moved in opposite directions',
  heroSub: 'The index fell 1.79%, but not every large cap fell with it on the same day.',
  before: { label:'Lower', big:'Chips, bio', sub:'Samsung Biologics fell over 6%' },
  after:  { label:'Higher', big:'Banks, autos', sub:'KB Financial and Kia advanced' },
  cards: [
    { icon:'🏦', big:'Up over 2%', mid:'KB Financial', sub:'Financials were relatively strong' },
    { icon:'🚗', big:'Up over 1%', mid:'Kia',          sub:'Autos held up in a down market' },
    { icon:'🧪', big:'Down over 6%', mid:'Samsung Biologics', sub:'One of the largest large-cap drops' },
  ],
  quote: 'Even on a down day, chemicals rose over 3% while textiles, apparel, food and tobacco gained 2-3%. Tech hardware fell over 3%, and utilities and pharma dropped around 3%.',
  noteSub: 'An index is an average, so it hides sector-level temperature differences. When rate expectations move higher, financials tend to gain relative appeal while richly priced tech gets marked down first. Read the sector table next to the index level.',
  footer: 'Top caps · sector divergence',
});

/* ══════════════════════════ 안전자산 · 3 (KO) ══════════════════════════ */

add('summary-safe', 'ROWS', 'MACRO', {
  headline: '2026.08.29 안전자산 한장 요약',
  rows: [
    { color:'#f7931a', fill:'#1a0f00', right:'BTC',   title:'비트코인이 7만 8,000달러를 밑돌았습니다',
      sub:'자정 기준 79,623.35달러에서 0.86% 내린 뒤 새벽에 주요 가격대를 내줬습니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'청산',   title:'24시간 청산 금액이 3억 6,900만 달러였습니다',
      sub:'청산된 거래자는 8만 7,082명으로 집계됐습니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'ETH',   title:'이더리움은 2,500달러 선을 내줬습니다',
      sub:'자정 기준 2,516.31달러에서 0.08% 내렸습니다.' },
    { color:'#facc15', fill:'#1a1600', right:'GOLD',  title:'금 현물이 온스당 4,500달러를 밑돌았습니다',
      sub:'장중 100달러 넘게 떨어졌고 24시간 하락률은 2.3% 수준입니다.' },
    { color:'#94a3b8', fill:'#0f1419', right:'2년물', title:'미국 2년물 금리가 장중 4.33%까지 올랐습니다',
      sub:'4.286%로 7월 말 이후 최고를 기록한 뒤 10bp 더 올랐습니다.' },
    { color:'#a78bfa', fill:'#120b1f', right:'원인',   title:'원인은 잭슨홀에서 나온 매파 발언 하나였습니다',
      sub:'물가에 관해 해야 할 일이 남아 있다는 취지의 발언이 나왔습니다.' },
  ],
  caption: '더 볼 것: 비트코인 7만 8,000달러 하회 · 청산 3억 6,900만 달러 · 이더리움 2,516.31달러 · 금 4,500달러 하회 · 미국 2년물 4.33%',
}, {
  headline: '2026.08.29 Safe-haven snapshot',
  rows: [
    { color:'#f7931a', fill:'#1a0f00', right:'BTC',   title:'Bitcoin slipped below $78,000',
      sub:'It traded at $79,623.35 at midnight KST, down 0.86%, then broke lower overnight.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'LIQS',  title:'24-hour liquidations reached $369 million',
      sub:'A total of 87,082 traders were liquidated across venues.' },
    { color:'#60a5fa', fill:'#0a1420', right:'ETH',   title:'Ethereum gave up the $2,500 line',
      sub:'It was at $2,516.31 at midnight KST, down 0.08% on the day.' },
    { color:'#facc15', fill:'#1a1600', right:'GOLD',  title:'Spot gold fell below $4,500 an ounce',
      sub:'It dropped more than $100 intraday, about 2.3% over 24 hours.' },
    { color:'#94a3b8', fill:'#0f1419', right:'2Y',    title:'The US 2-year yield touched 4.33% intraday',
      sub:'It first hit 4.286%, the highest since late July, then added 10bp.' },
    { color:'#a78bfa', fill:'#120b1f', right:'CAUSE', title:'One hawkish Jackson Hole line drove all of it',
      sub:'The message was that there is still work to do on inflation.' },
  ],
  caption: 'Watch next: bitcoin under $78,000 · $369M liquidations · ETH $2,516.31 · gold under $4,500 · US 2-year at 4.33%',
});

add('btc-safe', 'L6', 'BTC', {
  badge: 'BTC',
  title: '비트코인이 잭슨홀 매파 발언 이후 7만 8,000달러를 내줬습니다',
  breaking: '24시간 청산 3억 6,900만 달러 · 8만 7,082명',
  heroBig: '7만 8,000달러 하회',
  heroSub: '자정 기준 79,623.35달러에서 0.86% 내린 뒤 새벽 1시 25분 무렵 기준선을 내줬습니다.',
  grid: [
    { icon:'🪙', big:'79,623', mid:'자정 기준 가격(달러)', sub:'전날보다 0.86% 낮았습니다' },
    { icon:'💥', big:'3.69억', mid:'24시간 청산(달러)',   sub:'8만 7,082명이 정리됐습니다' },
    { icon:'🔗', big:'2,516',  mid:'이더리움(달러)',       sub:'2,500달러를 내줬습니다' },
    { icon:'📉', big:'218만',  mid:'단일 최대 청산(달러)', sub:'한 파생상품 거래쌍에서 나왔습니다' },
  ],
  ctx1: '청산은 빌린 돈으로 잡은 포지션이 손실 한계를 넘겨 강제로 정리되는 것을 말합니다',
  ctx2: '이때 나오는 매도는 투자자 판단과 무관하므로 하락이 하락을 부르는 구조를 만듭니다',
  quote: '파생상품 거래량은 함께 줄었고 비트코인 점유율은 낮아졌습니다. 새 자금이 들어오는 국면이 아니라 기존 포지션이 정리되는 국면이었다는 뜻입니다.',
  noteSub: '비트코인은 이자를 주지 않는 자산이라, 금리가 더 오를 수 있다는 전망이 나오면 예금과 채권의 상대 매력이 올라갑니다. 그래서 이날 하락의 원인은 가상자산 내부가 아니라 금리 기대에 있습니다. 다음에는 미국 2년물 금리와 현물 상장지수펀드 순유입을 함께 확인하시면 됩니다.',
  footer: '비트코인 · 잭슨홀 이후',
}, {
  badge: 'BTC',
  title: 'Bitcoin gave up $78,000 after the hawkish Jackson Hole message',
  breaking: '$369M liquidated in 24 hours · 87,082 traders',
  heroBig: 'Below $78,000',
  heroSub: 'It was $79,623.35 at midnight KST, down 0.86%, and broke the line around 1:25 a.m.',
  grid: [
    { icon:'🪙', big:'79,623', mid:'Midnight price ($)', sub:'Down 0.86% on the day' },
    { icon:'💥', big:'$369M',  mid:'24-hour liquidations', sub:'87,082 traders were closed out' },
    { icon:'🔗', big:'2,516',  mid:'Ethereum ($)',        sub:'It gave up $2,500' },
    { icon:'📉', big:'$2.18M', mid:'Largest single liq.',  sub:'On one derivatives pair' },
  ],
  ctx1: 'A liquidation is a leveraged position force-closed once losses pass its collateral',
  ctx2: 'That selling is not a decision, so it turns a decline into more decline',
  quote: 'Derivatives volume shrank at the same time and bitcoin dominance eased. That points to old positions being cleared rather than new money arriving.',
  noteSub: 'Bitcoin pays no yield, so when the market prices in higher policy rates, deposits and bonds gain relative appeal. The cause of this drop sits in rate expectations rather than inside crypto. Track the US 2-year yield and spot ETF flows next.',
  footer: 'Bitcoin · after Jackson Hole',
});

add('gold-safe', 'L5', 'GOLD', {
  badge: 'GOLD',
  title: '현물 금이 장중 100달러 넘게 떨어져 온스당 4,500달러를 밑돌았습니다',
  heroIcon: '🥇', heroBig: '온스당 4,500달러 하회',
  heroSub: '24시간 하락률은 2.3% 수준이며, 며칠 사이의 상승분을 하루에 되돌렸습니다.',
  before: { label:'8월 28일 아시아 시장', big:'4,580달러', sub:'연설을 앞두고 매수 포지션이 줄었습니다' },
  after:  { label:'8월 29일 새벽',       big:'4,500달러 하회', sub:'장중 100달러 넘게 떨어졌습니다' },
  cards: [
    { icon:'📈', big:'4.33%',    mid:'미국 2년물 금리',   sub:'장중 10bp 올랐습니다' },
    { icon:'🎯', big:'4,700',    mid:'주요 저항선(달러)', sub:'앞서 이 부근까지 올랐습니다' },
    { icon:'🛡️', big:'4,530',    mid:'주요 지지선(달러)', sub:'이 구간을 이미 시험했습니다' },
  ],
  quote: '금은 이자를 주지 않으므로 채권 금리가 오르면 들고 있는 기회비용이 커집니다. 여기서 중요한 것은 명목금리가 아니라 물가를 뺀 실질금리입니다.',
  noteSub: '이날 금은 위험을 걱정하는 뉴스가 아니라 금리를 걱정하는 뉴스에 내렸습니다. 다만 10일과 20일 이동평균선은 정배열을 유지해 추세가 꺾였다고 보기는 어렵습니다. 다음에는 실질금리와 달러 지수, 4,530달러 지지 유지 여부를 확인하시면 됩니다.',
  footer: '금 · 잭슨홀 이후 하락',
}, {
  badge: 'GOLD',
  title: 'Spot gold fell more than $100 intraday and slipped below $4,500 an ounce',
  heroIcon: '🥇', heroBig: 'Below $4,500 an ounce',
  heroSub: 'The 24-hour decline was about 2.3%, undoing several days of gains in one session.',
  before: { label:'Aug 28, Asia hours', big:'$4,580', sub:'Buyers trimmed ahead of the speech' },
  after:  { label:'Aug 29, overnight', big:'Under $4,500', sub:'It lost more than $100 intraday' },
  cards: [
    { icon:'📈', big:'4.33%',  mid:'US 2-year yield',   sub:'Up 10bp intraday' },
    { icon:'🎯', big:'$4,700', mid:'Key resistance',     sub:'It had approached that level' },
    { icon:'🛡️', big:'$4,530', mid:'Key support',        sub:'That zone is being tested' },
  ],
  quote: 'Gold pays no interest, so a higher bond yield raises the cost of holding it. What matters is not the nominal yield but the real yield, which nets out inflation.',
  noteSub: 'Gold fell on a rates story rather than a risk story. Still, the 10-day and 20-day moving averages remain in bullish order, so the trend has not clearly broken. Watch real yields, the dollar index, and whether $4,530 support holds.',
  footer: 'Gold · post Jackson Hole',
});

/* ══════════════════════════ 한국부동산 · 3 (KO) ══════════════════════════ */

add('summary-krre', 'ROWS', 'MACRO', {
  headline: '2026.08.29 부동산 한장 요약',
  rows: [
    { color:'#38bdf8', fill:'#061520', right:'0.29%', title:'서울 아파트 매매가격이 0.29% 올랐습니다',
      sub:'전주 0.22%보다 확대돼 6주 만에 가장 높은 상승 폭입니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'강남',   title:'강남구는 0.11% 내려 3주 연속 하락했습니다',
      sub:'서초구도 0.05% 내렸고 낙폭은 전주보다 커졌습니다.' },
    { color:'#4ade80', fill:'#061209', right:'0.56%', title:'중랑구가 0.56%로 서울에서 가장 많이 올랐습니다',
      sub:'성북구와 강북구가 각각 0.55%, 도봉구와 노원구가 각각 0.54%입니다.' },
    { color:'#a78bfa', fill:'#120b1f', right:'0.03%', title:'동남권 상승률은 0.03%까지 낮아졌습니다',
      sub:'7월 20일 0.18%에서 다섯 주 연속 낮아진 결과입니다.' },
    { color:'#fb923c', fill:'#1a0d02', right:'전세',   title:'서울 전세가격은 0.22% 올랐습니다',
      sub:'전주 0.19%보다 확대됐고 경기도도 0.19%로 커졌습니다.' },
    { color:'#94a3b8', fill:'#0f1419', right:'신탁',   title:'전월세 안심신탁은 9월 말 공고가 예정됐습니다',
      sub:'10월 신청, 11월 3자 약정을 거쳐 12월부터 입주를 지원합니다.' },
  ],
  caption: '더 볼 것: 서울 매매 0.29% · 강남 -0.11% 3주 연속 · 중랑 0.56% · 동남권 0.03% · 서울 전세 0.22% · 안심신탁 9월 말 공고',
}, {
  headline: '2026.08.29 Korea property snapshot',
  rows: [
    { color:'#38bdf8', fill:'#061520', right:'0.29%', title:'Seoul apartment prices rose 0.29% on the week',
      sub:'That is up from 0.22% and the fastest pace in six weeks.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'GANGNAM', title:'Gangnam fell 0.11%, a third straight weekly drop',
      sub:'Seocho slipped 0.05% and the pace of decline widened.' },
    { color:'#4ade80', fill:'#061209', right:'0.56%', title:'Jungnang led all Seoul districts with 0.56%',
      sub:'Seongbuk and Gangbuk rose 0.55%, Dobong and Nowon 0.54%.' },
    { color:'#a78bfa', fill:'#120b1f', right:'0.03%', title:'The southeast district group slowed to 0.03%',
      sub:'It has cooled every week from 0.18% on July 20.' },
    { color:'#fb923c', fill:'#1a0d02', right:'JEONSE', title:'Seoul jeonse prices rose 0.22% on the week',
      sub:'That is up from 0.19%, and Gyeonggi accelerated to 0.19%.' },
    { color:'#94a3b8', fill:'#0f1419', right:'TRUST', title:'The jeonse trust scheme posts terms in September',
      sub:'Applications open in October and move-ins begin in December.' },
  ],
  caption: 'Watch next: Seoul +0.29% · Gangnam -0.11% for a third week · Jungnang +0.56% · southeast +0.03% · jeonse +0.22% · trust terms in late September',
});

add('policy-krre', 'L2', 'POLICY', {
  badge: '정책',
  title: '전세금을 공공기관이 맡고 임대인이 운용수익을 월세처럼 받는 제도가 추진됩니다',
  heroIcon: '🏦', heroBig: '연 4~5%',
  heroSub: '임차인이 예치한 전세금을 공적 기관이 운용해 임대인에게 매달 지급하는 예상 수익률입니다.',
  cards: [
    { label:'대상 주택', big:'20억 원 이하', mid:'시세 기준 우선 시행', sub:'주택 유형에는 제한이 없습니다' },
    { label:'시범 물량', big:'500호',        mid:'매입임대 적용 규모',   sub:'올해 시범 공급 기준입니다' },
    { label:'보증료 절감', big:'약 30만 원', mid:'등록 임대사업자 기준', sub:'보증 가입 의무가 면제됩니다' },
  ],
  detailHead: '제도가 작동하는 순서',
  detailLines: [
    '🤝 임차인·임대인·공적 기관이 세 당사자로 계약을 맺습니다',
    '🏦 임차인은 전세금을 임대인이 아니라 공적 기관에 예치합니다',
    '📅 9월 말 공고, 10월 신청, 11월 약정, 12월 입주로 진행됩니다',
  ],
  noteSub: '이 제도는 가격을 직접 움직이는 정책이 아니라 거래 구조를 바꾸는 정책입니다. 핵심 변수는 하나인데, 임대인에게 지급되는 수익률이 시장 월세 수익률과 비교해 충분한지입니다. 이 숫자가 낮으면 임대인이 참여하지 않고, 참여가 없으면 전세 공급도 늘지 않습니다.',
  footer: '정책 · 전월세 안심신탁',
}, {
  badge: 'POLICY',
  title: 'A public agency will hold jeonse deposits and pay landlords the investment income monthly',
  heroIcon: '🏦', heroBig: '4-5% a year',
  heroSub: 'That is the expected return the agency plans to pass to landlords each month.',
  cards: [
    { label:'Eligible homes', big:'Up to 2bn won', mid:'By market value first', sub:'No restriction on housing type' },
    { label:'Pilot volume', big:'500 units',      mid:'Public rental stock',   sub:'Planned for this year' },
    { label:'Fee saving',   big:'~300k won',      mid:'Registered landlords',  sub:'Deposit guarantee waived' },
  ],
  detailHead: 'How the scheme works',
  detailLines: [
    '🤝 Tenant, landlord and the public agency sign one three-party contract',
    '🏦 The tenant deposits the jeonse sum with the agency, not the landlord',
    '📅 Terms post in September, applications in October, move-ins in December',
  ],
  noteSub: 'This policy changes the structure of a lease rather than the price of a home. The single variable that decides its fate is whether the yield paid to landlords compares well with market rental yields. If it does not, landlords stay away and no extra jeonse supply appears.',
  footer: 'Policy · jeonse trust scheme',
});

add('jeonse-krre', 'L3', 'JEONSE', {
  badge: '전세',
  title: '서울 전세가격이 0.22% 올라 매매가 강한 지역에서 전세도 함께 가팔라졌습니다',
  heroIcon: '🔑', heroBig: '서울 전세 0.22%',
  heroSub: '전주 0.19%보다 상승 폭이 커졌고, 경기도도 0.17%에서 0.19%로 확대됐습니다.',
  cards: [
    { icon:'🏙️', big:'0.29%',  mid:'같은 주 서울 매매',   sub:'전세와 같은 방향으로 올랐습니다' },
    { icon:'🗺️', big:'0.19%',  mid:'경기도 전세 상승률',  sub:'전주 0.17%에서 커졌습니다' },
    { icon:'📉', big:'물건 감소', mid:'전세 공급 측 요인',  sub:'월세 선호가 물건을 줄였습니다' },
  ],
  quote: '전세는 실제로 거주하려는 수요를 반영합니다. 매매가격만 오르는 시장과 전세가격이 함께 오르는 시장은 성격이 다르므로, 두 지표를 나란히 놓고 보시는 편이 정확합니다.',
  noteSub: '이번 상승 폭 확대에는 수요만이 아니라 공급 측 요인이 섞여 있습니다. 전세사기 이후 임차인은 전세를 피하고 임대인은 월세를 선호해 전세 물건이 줄었습니다. 정책 물량이 실제로 공급되는 12월 이후 상승 폭이 어떻게 바뀌는지가 구분 지점입니다.',
  footer: '전세 · 주간 상승 폭 확대',
}, {
  badge: 'JEONSE',
  title: 'Seoul jeonse prices rose 0.22% as rents climbed fastest where sale prices are strongest',
  heroIcon: '🔑', heroBig: 'Seoul jeonse +0.22%',
  heroSub: 'That is up from 0.19% a week earlier, and Gyeonggi accelerated from 0.17% to 0.19%.',
  cards: [
    { icon:'🏙️', big:'0.29%', mid:'Seoul sale prices',   sub:'Moving the same direction' },
    { icon:'🗺️', big:'0.19%', mid:'Gyeonggi jeonse',     sub:'Up from 0.17% a week earlier' },
    { icon:'📉', big:'Supply', mid:'Fewer jeonse listings', sub:'Landlords now prefer monthly rent' },
  ],
  quote: 'Jeonse prices track people who actually intend to live in a home. A market where only sale prices rise differs from one where jeonse rises too, so the two series belong side by side.',
  noteSub: 'Part of this acceleration comes from supply, not demand. After a wave of deposit fraud, tenants avoid jeonse and landlords prefer monthly rent, so listings thinned out. The test comes after December, when policy conversions actually reach the market.',
  footer: 'Jeonse · weekly gain widens',
});

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
