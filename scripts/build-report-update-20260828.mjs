#!/usr/bin/env node
// 2026.08.28 Investus daily report update — full build script
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CHARTS = path.join(ROOT, 'public', 'charts');
const DATE = '2026.08.28';
const DATETAG = '20260828';
const DATE_ISO = '2026.08.28';
const UPDATED_AT = '2026.08.28 08:00';
const T28AU = 1787871600000;
const BK = 'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE';
const BE = 'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE';
const BODY_EN = 'See Korean body.\n\ninvestus.kr SRP Chief Investment Officer';

const PSYM = {
  TSLA: { fg: '#4ade80', fg2: '#22c55e', bg2: '#061209', card: '#0a1a0a' },
  NVDA: { fg: '#60a5fa', fg2: '#3b82f6', bg2: '#06121f', card: '#0a1420' },
  SPCX: { fg: '#c084fc', fg2: '#a78bfa', bg2: '#140b1f', card: '#1a0f2a' },
  GOOGL: { fg: '#4285f4', fg2: '#34a853', bg2: '#06121f', card: '#0a1420' },
  META: { fg: '#1877f2', fg2: '#1266d6', bg2: '#050c19', card: '#0a1420' },
  AVGO: { fg: '#f472b6', fg2: '#ec4899', bg2: '#1a0a14', card: '#201018' },
  MACRO: { fg: '#94a3b8', fg2: '#64748b', bg2: '#0c1017', card: '#111827' },
  AI: { fg: '#a78bfa', fg2: '#8b5cf6', bg2: '#120b1f', card: '#1a1030' },
};

function esc(s) { return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;').replace(/</g, '&lt;'); }
function E(o) { const r = {}; for (const k in o) r[k] = typeof o[k] === 'string' ? esc(o[k]) : o[k]; return r; }

function estimatePxWidth(text, fontSize, isBold) {
  const b = isBold ? 1.15 : 1.0; let w = 0;
  for (const c of String(text)) {
    if (/[가-힣一-龥]/.test(c)) w += fontSize * b;
    else if (/\s/.test(c)) w += fontSize * 0.32;
    else if (/[·—:]/.test(c)) w += fontSize * 0.42;
    else if (/[A-Z0-9]/.test(c)) w += fontSize * 0.68 * b;
    else if (/[iljI!.,;'"`]/.test(c)) w += fontSize * 0.32 * b;
    else if (/[mwMW]/.test(c)) w += fontSize * 0.85 * b;
    else w += fontSize * 0.58 * b;
  }
  return w;
}

function multilineIfOverflow(text, x, y, fontSize, maxPxWidth, maxLines, lh, attrs) {
  const isBold = /font-weight="?(bold|[89]00)/i.test(attrs) || /Arial Black/.test(attrs);
  const est = (t) => estimatePxWidth(t, fontSize, isBold);
  if (est(text) <= maxPxWidth) return `  <text x="${x}" y="${y}" ${attrs}>${esc(text)}</text>`;
  const parts = []; const rawParts = String(text).split(/(\s·\s|\s—\s|·|—)/).filter(Boolean);
  for (const p of rawParts) {
    if (est(p) <= maxPxWidth) { parts.push(p); continue; }
    for (const s of p.split(/(\s+)/).filter(Boolean)) {
      if (est(s) <= maxPxWidth) parts.push(s);
      else {
        let tmp = s;
        while (est(tmp) > maxPxWidth) {
          let cutAt = 1;
          while (cutAt < tmp.length && est(tmp.slice(0, cutAt + 1)) <= maxPxWidth) cutAt++;
          parts.push(tmp.slice(0, cutAt)); tmp = tmp.slice(cutAt);
        }
        if (tmp) parts.push(tmp);
      }
    }
  }
  const lines = []; let cur = '';
  for (const p of parts) {
    const test = cur + p;
    if (est(test) <= maxPxWidth) cur = test;
    else { if (cur.trim()) lines.push(cur.trim()); cur = p.replace(/^[·—\s]+/, '').trim(); if (lines.length >= maxLines) break; }
  }
  if (cur.trim() && lines.length < maxLines) {
    if (est(cur) > maxPxWidth) {
      let cutAt = 1;
      while (cutAt < cur.length && est(cur.slice(0, cutAt + 1) + '…') <= maxPxWidth) cutAt++;
      cur = cur.slice(0, cutAt) + '…';
    }
    lines.push(cur);
  }
  return lines.slice(0, maxLines).map((l, i) => `  <text x="${x}" y="${y + i * lh}" ${attrs}>${esc(l)}</text>`).join('\n');
}

const F = { TITLE: 28, HERO_BIG: 42, HERO_SUB: 20, QUOTE: 19, NOTE_HEAD: 18, NOTE_SUB: 16, CARD_BIG: 22, CARD_MID: 18, CARD_SUB: 16 };
const MAX_W = { WIDE: 980, CARD: 260 };

function svgHeader(oRaw, p, badge) {
  const o = E(oRaw);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0d1117"/><stop offset="100%" style="stop-color:${p.bg2}"/></linearGradient>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${p.fg}"/><stop offset="100%" style="stop-color:${p.fg2}"/></linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <rect width="1080" height="1080" fill="none" stroke="#1f2937" stroke-width="2"/>
  <rect x="0" y="0" width="1080" height="5" fill="url(#g)"/>
  <rect x="40" y="20" width="150" height="38" rx="19" fill="${p.fg}30" stroke="${p.fg}" stroke-width="1.5"/>
  <text x="115" y="44" font-family="Arial Black,Arial" font-size="16" font-weight="900" fill="${p.fg}" text-anchor="middle">${badge}</text>
  <text x="540" y="46" font-family="Arial" font-size="13" fill="#6b7280" text-anchor="middle" letter-spacing="3">INVESTUS DAILY REPORT</text>
  <rect x="900" y="20" width="148" height="38" rx="19" fill="#1f2937" stroke="#374151"/>
  <text x="974" y="44" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle">${DATE}</text>
${multilineIfOverflow(oRaw.title, 540, 108, F.TITLE, MAX_W.WIDE, 2, 36, `font-family="Arial Black,Arial" font-size="${F.TITLE}" font-weight="900" fill="#f9fafb" text-anchor="middle"`)}
  <line x1="80" y1="150" x2="1000" y2="150" stroke="#1f2937" stroke-width="1"/>`;
}

function svgFooter(o, p) {
  return `  <text x="540" y="994" font-family="Arial" font-size="16" fill="#374151" text-anchor="middle">${o.footer} · ${DATE}</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#g)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${o.brand}</text>
</svg>`;
}

function renderCards(cards, p, y = 402) {
  return cards.map((cRaw, i) => {
    const c = E(cRaw); const x = [60, 390, 720][i];
    return `
  <rect x="${x}" y="${y}" width="300" height="220" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
  <text x="${x + 150}" y="${y + 48}" font-family="Arial" font-size="36" text-anchor="middle">${c.icon}</text>
  <text x="${x + 150}" y="${y + 92}" font-family="Arial Black,Arial" font-size="${F.CARD_BIG}" font-weight="900" fill="${p.fg}" text-anchor="middle">${c.big}</text>
${multilineIfOverflow(cRaw.mid, x + 150, y + 126, F.CARD_MID, MAX_W.CARD, 2, 22, `font-family="Arial" font-size="${F.CARD_MID}" fill="#9ca3af" text-anchor="middle"`)}
${multilineIfOverflow(cRaw.sub, x + 150, y + 186, F.CARD_SUB, MAX_W.CARD, 2, 20, `font-family="Arial" font-size="${F.CARD_SUB}" fill="#6b7280" text-anchor="middle"`)}`;
  }).join('');
}

function tpl(oRaw) {
  const o = E(oRaw); const p = PSYM[oRaw.symbol] || PSYM.MACRO; const badge = o.badge || o.symbol;
  return `${svgHeader(oRaw, p, badge)}
  <text x="540" y="240" font-family="Arial Black,Arial" font-size="90" font-weight="900" fill="${p.fg}" text-anchor="middle" opacity=".15">${o.heroIcon}</text>
  <text x="540" y="240" font-family="Arial Black,Arial" font-size="76" font-weight="900" fill="${p.fg}" text-anchor="middle">${o.heroIcon}</text>
  <text x="540" y="300" font-family="Arial Black,Arial" font-size="${F.HERO_BIG}" font-weight="900" fill="#f9fafb" text-anchor="middle">${o.heroBig}</text>
${multilineIfOverflow(oRaw.heroSub, 540, 340, F.HERO_SUB, MAX_W.WIDE, 3, 26, `font-family="Arial" font-size="${F.HERO_SUB}" fill="#9ca3af" text-anchor="middle"`)}
  <line x1="80" y1="390" x2="1000" y2="390" stroke="#1f2937" stroke-width="1"/>
${renderCards(oRaw.cards, p)}
  <rect x="60" y="630" width="960" height="200" rx="16" fill="#0f172a" stroke="#374151"/>
${multilineIfOverflow(oRaw.quote, 540, 680, F.QUOTE, MAX_W.WIDE, 5, 26, `font-family="Arial" font-size="${F.QUOTE}" fill="${p.fg}" text-anchor="middle"`)}
  <rect x="60" y="850" width="960" height="110" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1"/>
${multilineIfOverflow(oRaw.noteHead, 540, 878, F.NOTE_HEAD, MAX_W.WIDE, 1, 24, `font-family="Arial" font-size="${F.NOTE_HEAD}" fill="${p.fg}" text-anchor="middle"`)}
${multilineIfOverflow(oRaw.noteSub, 540, 908, F.NOTE_SUB, MAX_W.WIDE, 3, 22, `font-family="Arial" font-size="${F.NOTE_SUB}" fill="#9ca3af" text-anchor="middle"`)}
${svgFooter(o, p)}`;
}

function tplBreaking(oRaw) {
  const o = E(oRaw); const p = PSYM[oRaw.symbol] || PSYM.MACRO;
  return `${svgHeader(oRaw, p, 'BREAKING')}
  <rect x="420" y="168" width="240" height="36" rx="18" fill="${p.fg}40" stroke="${p.fg}" stroke-width="2"/>
  <text x="540" y="192" font-family="Arial Black,Arial" font-size="16" font-weight="900" fill="${p.fg}" text-anchor="middle">BREAKING</text>
  <text x="540" y="280" font-family="Arial Black,Arial" font-size="64" font-weight="900" fill="${p.fg}" text-anchor="middle">${o.heroBig}</text>
${multilineIfOverflow(oRaw.heroSub, 540, 340, 22, MAX_W.WIDE, 3, 28, `font-family="Arial" font-size="22" fill="#e5e7eb" text-anchor="middle"`)}
  <line x1="80" y1="390" x2="1000" y2="390" stroke="#1f2937" stroke-width="1"/>
${renderCards(oRaw.cards, p, 402)}
  <rect x="60" y="630" width="960" height="210" rx="16" fill="#0f172a" stroke="#374151"/>
${multilineIfOverflow(oRaw.quote, 540, 680, F.QUOTE, MAX_W.WIDE, 6, 26, `font-family="Arial" font-size="${F.QUOTE}" fill="${p.fg}" text-anchor="middle"`)}
  <rect x="60" y="860" width="960" height="100" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1"/>
${multilineIfOverflow(oRaw.noteSub, 540, 900, F.NOTE_SUB, MAX_W.WIDE, 3, 22, `font-family="Arial" font-size="${F.NOTE_SUB}" fill="#9ca3af" text-anchor="middle"`)}
${svgFooter(o, p)}`;
}

function tplQuote(oRaw) {
  const o = E(oRaw); const p = PSYM[oRaw.symbol] || PSYM.MACRO; const badge = o.badge || o.symbol;
  return `${svgHeader(oRaw, p, badge)}
  <text x="540" y="230" font-family="Arial Black,Arial" font-size="52" font-weight="900" fill="${p.fg}" text-anchor="middle">${o.heroBig}</text>
${multilineIfOverflow(oRaw.heroSub, 540, 280, F.HERO_SUB, MAX_W.WIDE, 2, 26, `font-family="Arial" font-size="${F.HERO_SUB}" fill="#9ca3af" text-anchor="middle"`)}
  <rect x="80" y="320" width="920" height="240" rx="18" fill="#0f172a" stroke="${p.fg}" stroke-width="2"/>
${multilineIfOverflow(oRaw.quote, 540, 400, 21, 860, 6, 30, `font-family="Arial" font-size="21" fill="#f9fafb" text-anchor="middle"`)}
  <rect x="120" y="590" width="400" height="120" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1.5"/>
  <text x="320" y="640" font-family="Arial Black,Arial" font-size="28" font-weight="900" fill="${p.fg}" text-anchor="middle">${o.chip1big || oRaw.cards[0].big}</text>
  <text x="320" y="680" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">${o.chip1sub || oRaw.cards[0].mid}</text>
  <rect x="560" y="590" width="400" height="120" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1.5"/>
  <text x="760" y="640" font-family="Arial Black,Arial" font-size="28" font-weight="900" fill="${p.fg}" text-anchor="middle">${o.chip2big || oRaw.cards[1].big}</text>
  <text x="760" y="680" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">${o.chip2sub || oRaw.cards[1].mid}</text>
  <rect x="60" y="740" width="960" height="200" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1"/>
  <text x="540" y="780" font-family="Arial" font-size="${F.NOTE_HEAD}" fill="${p.fg}" text-anchor="middle">${o.noteHead}</text>
${multilineIfOverflow(oRaw.noteSub, 540, 820, F.NOTE_SUB, MAX_W.WIDE, 4, 24, `font-family="Arial" font-size="${F.NOTE_SUB}" fill="#9ca3af" text-anchor="middle"`)}
${svgFooter(o, p)}`;
}

function tplCompare(oRaw) {
  const o = E(oRaw); const p = PSYM[oRaw.symbol] || PSYM.MACRO; const badge = o.badge || o.symbol;
  return `${svgHeader(oRaw, p, badge)}
  <text x="540" y="240" font-family="Arial Black,Arial" font-size="56" font-weight="900" fill="${p.fg}" text-anchor="middle">${o.heroBig}</text>
${multilineIfOverflow(oRaw.heroSub, 540, 290, F.HERO_SUB, MAX_W.WIDE, 2, 26, `font-family="Arial" font-size="${F.HERO_SUB}" fill="#9ca3af" text-anchor="middle"`)}
  <rect x="80" y="340" width="400" height="200" rx="16" fill="#1f2937" stroke="#374151" stroke-width="2"/>
  <text x="280" y="390" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">${o.beforeLabel}</text>
  <text x="280" y="450" font-family="Arial Black,Arial" font-size="36" font-weight="900" fill="#9ca3af" text-anchor="middle">${o.beforeBig}</text>
  <text x="280" y="500" font-family="Arial" font-size="17" fill="#6b7280" text-anchor="middle">${o.beforeSub}</text>
  <text x="540" y="450" font-family="Arial Black,Arial" font-size="48" fill="${p.fg}" text-anchor="middle">→</text>
  <rect x="600" y="340" width="400" height="200" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
  <text x="800" y="390" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">${o.afterLabel}</text>
  <text x="800" y="450" font-family="Arial Black,Arial" font-size="36" font-weight="900" fill="${p.fg}" text-anchor="middle">${o.afterBig}</text>
  <text x="800" y="500" font-family="Arial" font-size="17" fill="#9ca3af" text-anchor="middle">${o.afterSub}</text>
${renderCards(oRaw.cards, p, 570)}
  <rect x="60" y="810" width="960" height="150" rx="14" fill="#0f172a" stroke="#374151"/>
${multilineIfOverflow(oRaw.quote, 540, 870, F.QUOTE, MAX_W.WIDE, 4, 28, `font-family="Arial" font-size="${F.QUOTE}" fill="${p.fg}" text-anchor="middle"`)}
  <rect x="60" y="970" width="960" height="0" fill="none"/>
${svgFooter(o, p)}`;
}

function tplDday(oRaw) {
  const o = E(oRaw); const p = PSYM[oRaw.symbol] || PSYM.MACRO; const badge = o.badge || o.symbol;
  return `${svgHeader(oRaw, p, badge)}
  <text x="540" y="250" font-family="Arial Black,Arial" font-size="72" font-weight="900" fill="${p.fg}" text-anchor="middle">${o.heroBig}</text>
  <text x="540" y="310" font-family="Arial Black,Arial" font-size="24" font-weight="900" fill="#f9fafb" text-anchor="middle">${o.ddayLabel || 'EVENT'}</text>
${multilineIfOverflow(oRaw.heroSub, 540, 350, F.HERO_SUB, MAX_W.WIDE, 3, 26, `font-family="Arial" font-size="${F.HERO_SUB}" fill="#9ca3af" text-anchor="middle"`)}
  <rect x="120" y="390" width="840" height="100" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1.5"/>
${multilineIfOverflow(oRaw.quote, 540, 450, 18, 780, 3, 24, `font-family="Arial" font-size="18" fill="#e5e7eb" text-anchor="middle"`)}
${renderCards(oRaw.cards, p, 520)}
  <rect x="60" y="760" width="960" height="200" rx="14" fill="#0f172a" stroke="#374151"/>
  <text x="540" y="800" font-family="Arial" font-size="${F.NOTE_HEAD}" fill="${p.fg}" text-anchor="middle">${o.noteHead}</text>
${multilineIfOverflow(oRaw.noteSub, 540, 840, F.NOTE_SUB, MAX_W.WIDE, 4, 24, `font-family="Arial" font-size="${F.NOTE_SUB}" fill="#9ca3af" text-anchor="middle"`)}
${svgFooter(o, p)}`;
}

const LAYOUTS = { tpl, tplBreaking, tplQuote, tplCompare, tplDday };

function summarySvg(lang) {
  const ko = lang === 'ko';
  const brand = ko ? 'investus.kr SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE' : 'investus.kr SRP Chief Investment Officer · NOT FINANCIAL ADVICE';
  const title = ko ? `${DATE} 한장 요약` : `Daily Snapshot ${DATE}`;
  const rows = ko ? [
    { stroke: '#60a5fa', fill: '#0a1420', title: '엔비디아가 정규장에서 8.74% 급등하며 기술주 랠리를 이끌었습니다', body: '나스닥 +1.57%, S&P500 +0.72%로 마감했습니다. 3분기 매출 전망 1,080억 달러가 핵심입니다.', stat: 'NVDA' },
    { stroke: '#94a3b8', fill: '#0f1419', title: '오늘 잭슨홀에서 워시 연준 의장의 첫 기조연설이 예정돼 있습니다', body: '인플레이션·30년물 국채·추가 금리 인상 가능성에 대한 단서를 찾을 것으로 보입니다.', stat: 'JH' },
    { stroke: '#facc15', fill: '#1a1600', title: '미국 전력망 보호 행정명령이 전력기기·변압器주를 들썩이게 했습니다', body: '미국 현지 생산 거점을 둔 업체의 경쟁력이 부각됐습니다.', stat: 'PWR' },
    { stroke: '#ef4444', fill: '#1a0a0a', title: '30년물 국채 금리가 5.31%까지 올라 장기 금리 부담이 커졌습니다', body: '재정·발행 우려와 연준 메시지가 겹치는 구간입니다.', stat: '5.31%' },
    { stroke: '#a78bfa', fill: '#120b1f', title: '비트코인은 약 78,800달러 부근에서 잭슨홀을 앞두고 관망했습니다', body: '위험자산·유동성·달러 방향에 민감하게 반응할 이벤트입니다.', stat: 'BTC' },
    { stroke: '#4ade80', fill: '#061209', title: '한국 증시도 엔비디아 후속과 전력기기 강세로 7,000선을 재시도했습니다', body: '코스피 6,984.95(+1.05%)로 마감했습니다.', stat: 'KR' },
  ] : [
    { stroke: '#60a5fa', fill: '#0a1420', title: 'Nvidia rallied 8.74% in the regular session', body: 'Nasdaq +1.57%, S&P 500 +0.72%. Q3 revenue guide of $108B is the key.', stat: 'NVDA' },
    { stroke: '#94a3b8', fill: '#111827', title: 'Jackson Hole: Chair Warsh keynote today', body: 'Markets seek clues on inflation, 30Y yields, and hikes.', stat: 'JH' },
    { stroke: '#facc15', fill: '#1a1600', title: 'US grid protection order lifted power equipment', body: 'Names with US manufacturing footprints gained.', stat: 'PWR' },
    { stroke: '#ef4444', fill: '#1a0a0a', title: '30-year Treasury yield reached 5.31%', body: 'Long-end pressure overlaps with Fed messaging.', stat: '5.31%' },
    { stroke: '#a78bfa', fill: '#1a1030', title: 'Bitcoin near $78,800 ahead of Jackson Hole', body: 'Sensitive to liquidity, USD, and risk tone.', stat: 'BTC' },
    { stroke: '#4ade80', fill: '#0a1a0a', title: 'Korea retested 7,000 on NVDA spillover', body: 'KOSPI closed 6,984.95 (+1.05%).', stat: 'KR' },
  ];
  const footer = ko
    ? '더 볼 것: NVDA +8.74% · 잭슨홀 워시 · 전력망 EO · 30년물 5.31% · BTC 78,800 · 코스피 7,000 재시도'
    : 'Also: NVDA +8.74% · Jackson Hole Warsh · grid EO · 30Y 5.31% · BTC ~78.8K · KOSPI 7K retest';
  const y0 = 122; const h = 112; const gap = 12;
  const rowSvg = rows.map((r, i) => {
    const y = y0 + i * (h + gap);
    const stat = r.stat ? `\n  <text x="970" y="${y + 66}" font-family="Arial Black,Arial" font-size="22" font-weight="900" fill="${r.stroke}" text-anchor="end">${esc(r.stat)}</text>` : '';
    return `
  <rect x="60" y="${y}" width="960" height="${h}" rx="14" fill="${r.fill}" stroke="${r.stroke}" stroke-width="2"/>
  <rect x="60" y="${y}" width="8" height="${h}" rx="4" fill="${r.stroke}"/>
  <text x="116" y="${y + 42}" font-family="Arial Black,Arial" font-size="24" font-weight="900" fill="${r.stroke}">${esc(r.title)}</text>
  <text x="116" y="${y + 80}" font-family="Arial" font-size="18" fill="#9ca3af">${esc(r.body)}</text>${stat}`;
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
  <text x="540" y="92" font-family="Arial Black,Arial" font-size="36" font-weight="900" fill="#f9fafb" text-anchor="middle">${esc(title)}</text>
  <line x1="80" y1="108" x2="1000" y2="108" stroke="#1f2937" stroke-width="1"/>
${rowSvg}
  <text x="540" y="1010" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">${esc(footer)}</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#flow)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${esc(brand)}</text>
</svg>`;
}

function body(detail, why, scenario, flow, counter, watch, invest) {
  const w = why.map((x, i) => `${i + 1}. ${x}`).join('\n\n');
  return `■ 상세\n\n${detail}\n\n■ 왜 이 뉴스가 중요한가\n\n${w}\n\n■ 시나리오\n\n${scenario}\n\n■ 오늘까지 흐름\n\n${flow}\n\n■ 반대 관점\n\n${counter}\n\n■ 앞으로 볼 것\n\n${watch}\n\n■ 투자시사점\n\n${invest}\n\ninvestus.kr SRP 최고투자책임자 발행`;
}

function patch(content, find, replace, label) {
  if (!content.includes(find)) throw new Error(`Patch failed (${label}): anchor not found`);
  return content.replace(find, replace);
}

function read(rel) { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); }
function write(rel, data) { fs.writeFileSync(path.join(ROOT, rel), data); }

const TOPICS = [
{ file:'nvda-q2-earnings', symbol:'NVDA', layout:'tpl', seed:'seed-1302',
  category:'어닝', categoryColor:'blue', subject:'엔비디아', tickers:['NVDA'],
  title:'엔비디아가 실적 발표 뒤 정규장에서 8.74% 급등하며 하루에 시가총액을 최대 5,050억 달러 늘렸습니다',
  summary:'엔비디아는 실적 발표 다음 정규장에서 8.74% 올랐고, 하루 만에 시가총액이 3,600억~5,050억 달러 늘었습니다. 이 상승분은 같은 날 미국 시장 전체 상승의 약 77%를 차지했습니다. 회계 2분기 데이터센터 매출은 890억 2,000만 달러로 전년 대비 116.6% 늘었고, 3분기 매출 전망은 약 1,080억 달러입니다.',
  titleEn:'Nvidia jumps 8.74% after earnings, adding up to $505B of market cap in one day',
  summaryEn:'Nvidia rose 8.74% in the regular session after earnings, adding $360-505B of market cap in a single day, roughly 77% of the entire US market gain. FQ2 data center revenue was $89.02B, up 116.6% year over year and $13.78B quarter over quarter, with Q3 guidance near $108B.',
  body: `■ 상세

엔비디아는 실적 발표 다음 정규장에서 8.74% 상승했습니다. 집계 기준에 따라 7~10% 상승으로도 인용됩니다. 하루 만에 시가총액이 3,600억 달러에서 5,050억 달러까지 늘어났고, 같은 날 미국 시장 전체 상승분의 약 77%를 이 한 종목이 만들어 냈습니다.

회계 2분기 데이터센터 매출은 890억 2,000만 달러입니다. 전년 같은 기간보다 116.6% 늘었고, 직전 분기보다 137억 8,000만 달러 증가했습니다. 단순 계산하면 하루 매출이 약 10억 달러에 이릅니다. 3분기 매출 전망은 약 1,080억 달러로 제시됐습니다.

자기주식 매입은 200억 달러 규모로 집행됐고 추가 매입 계획도 함께 언급됐습니다. 최고경영자는 성장률의 하한을 약 70%로 제시했는데, 시장이 기대한 수준은 40% 부근이었습니다. 수요가 아니라 공급이 제약이라는 설명이며, 아마존은 200만 개 이상의 그래픽처리장치를 추가로 확보하겠다고 밝혔습니다. 중앙처리장치 매출은 2028 회계연도에 두 배 이상 늘어날 것으로 전망됩니다.

■ 왜 이 뉴스가 중요한가

1. 한 종목이 시장 상승의 약 77%를 만들었다는 점은 지수 상승의 폭이 좁다는 뜻입니다.

2. 데이터센터 매출이 전년 대비 116.6% 늘어난 것은 인공지능 투자 사이클이 아직 감속하지 않았음을 보여 줍니다.

3. 성장률 하한 70%와 시장 기대 40%의 차이는 앞으로의 추정치 상향 여지를 뜻합니다.

4. 수요가 아니라 공급이 제약이라는 설명은 가격과 마진 방어에 유리한 조건입니다.

5. 200억 달러 자기주식 매입은 현금흐름이 주주환원까지 감당한다는 신호입니다.

■ 시나리오

**A: 3분기 매출이 1,080억 달러 전망을 넘기면 추정치 상향이 이어질 수 있습니다.**
**B: 공급 제약이 길어지면 매출 인식 시점이 뒤로 밀릴 수 있습니다.**
**C: 금리와 유동성 여건이 나빠지면 실적과 무관하게 밸류에이션이 낮아질 수 있습니다.**

■ 오늘까지 흐름

- 실적 발표 직후 시간외에서는 방향이 엇갈렸습니다.
- 다음 정규장에서 8.74% 상승으로 정리됐습니다.
- 하루 매출 약 10억 달러와 3분기 전망 1,080억 달러가 상승 근거로 인용됐습니다.

■ 반대 관점

(1) 시가총액 증가폭은 계산 기준에 따라 3,600억에서 5,050억 달러까지 편차가 큽니다.

(2) 한 종목 의존도가 높은 상승은 되돌림도 빠를 수 있습니다.

(3) 성장률 하한은 확약이 아니라 경영진의 표현입니다.

(4) 공급 제약은 경쟁사에 기회를 주기도 합니다.

(5) 아마존의 추가 확보 약속은 실제 계약 물량과 다를 수 있습니다.

■ 앞으로 볼 것

(1) 3분기 실제 매출이 1,080억 달러 전망과 얼마나 차이 나는지 확인하시면 됩니다.

(2) 데이터센터 매출의 분기 증가액이 137억 달러 수준을 유지하는지 보시기 바랍니다.

(3) 추가 자기주식 매입의 발표 시점과 규모를 확인하시면 됩니다.

(4) 공급 제약이 완화되는 신호가 나오는지 살펴보시기 바랍니다.

(5) 중앙처리장치 매출이 2028 회계연도 목표대로 늘어나는지 추적하시면 됩니다.

■ 투자시사점

숫자는 강했고 주가도 이를 반영했습니다. 다만 시장 상승의 약 77%가 한 종목에서 나왔다는 점은 분산의 필요를 함께 말해 줍니다. 3분기 매출 1,080억 달러 전망의 달성 여부를 다음 확인 지점으로 두시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'엔비디아가 실적 발표 뒤 정규장에서 8.74% 급등하며 하루에 시가총액을 최대 5,050억 달러 늘렸습니다',
    heroIcon:'📊',
    heroBig:'+8.74%',
    heroSub:'실적 발표 뒤 정규장에서 8.74% 올랐고 하루에 시가총액이 최대 5,050억 달러 늘었습니다. 같은 날 미국 시장 상승분의 약 77%를 이 종목이 만들었습니다.',
    cards:[{icon:'💰',big:'$89.02B',mid:'데이터센터 매출',sub:'전년 대비 116.6% 증가'},{icon:'📈',big:'$108B',mid:'3분기 매출 전망',sub:'하루 매출 약 10억 달러'},{icon:'🔁',big:'$20B',mid:'자기주식 매입',sub:'추가 매입도 예고'}],
    quote:'"실적 발표 다음 정규장에서 8.74% 올랐고, 하루 만에 시가총액이 3,600억에서 5,050억 달러까지 늘었습니다. 회계 2분기 데이터센터 매출은 890억 2,000만 달러로 전년 대비 116.6% 증가했고, 3분기 매출 전망은 약 1,080억 달러입니다."',
    noteHead:'왜 중요한가',
    noteSub:'최고경영자는 성장률 하한을 약 70%로 제시했고 시장 기대는 40% 부근이었습니다. 수요가 아니라 공급이 제약이라는 설명이며, 아마존은 200만 개 이상의 그래픽처리장치를 추가로 확보하겠다고 밝혔습니다. 중앙처리장치 매출도 2028 회계연도에 두 배 이상 늘어날 전망입니다.',
    footer:'NVDA · 실적 뒤 급등',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Nvidia jumps 8.74% after earnings, up to $505B added in a day',
    heroIcon:'📊',
    heroBig:'+8.74%',
    heroSub:'Nvidia rose 8.74% in the regular session after earnings, adding up to $505B of market cap in one day, about 77% of the entire US market gain.',
    cards:[{icon:'💰',big:'$89.02B',mid:'Data center',sub:'+116.6% YoY'},{icon:'📈',big:'$108B',mid:'Q3 guide',sub:'~$1B revenue/day'},{icon:'🔁',big:'$20B',mid:'Buyback',sub:'More planned'}],
    quote:'"Nvidia rose 8.74% in the regular session, adding $360-505B of market cap in one day. FQ2 data center revenue was $89.02B, up 116.6% year over year and $13.78B sequentially. Q3 guidance is near $108B."',
    noteHead:'Why this matters',
    noteSub:'Management framed roughly 70% as the growth floor while the street expected about 40%. The constraint is supply, not demand, and Amazon pledged two million more GPUs.',
    footer:'NVDA · post-earnings surge',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'anthropic-ipo-odds-polymarket', symbol:'AI', layout:'tplCompare', seed:'seed-1303',
  category:'매크로', categoryColor:'purple', subject:'AI', tickers:['META'],
  title:'앤트로픽 기업공개 가치가 2조 달러까지 거론되지만 상장 전 매출 훼손 위험이 함께 지적됩니다',
  summary:'앤트로픽의 기업공개 가치가 2조 달러까지 거론됩니다. 다만 메타가 자체 도구를 늘리거나 오픈AI 사용을 확대하면 상장 전에 앤트로픽 매출이 줄어들 수 있다는 지적이 함께 나옵니다. 대형 인공지능 기업의 상장이 서로의 매출을 흔드는 구도입니다.',
  titleEn:'Anthropic IPO talk reaches a $2T valuation while pre-IPO revenue risk is flagged',
  summaryEn:'Anthropic could be valued near $2T at IPO. At the same time, Meta shifting to internal tools or wider OpenAI usage could cut Anthropic revenue before the listing.',
  body: `■ 상세

앤트로픽의 기업공개 가치가 2조 달러까지 거론되고 있습니다. 아직 상장 일정이 확정된 단계가 아니므로, 이 숫자는 시장에서 논의되는 상단으로 이해하시는 편이 안전합니다.

같은 화면에서 반대쪽 위험도 지적됩니다. 메타는 앤트로픽 사용을 줄이겠다는 방침을 밝혔지만 실제로는 매달 수억 달러를 계속 쓰고 있습니다. 메타가 자체 도구를 늘리거나 오픈AI 사용을 확대하면 상장 전에 앤트로픽 매출이 줄어들 수 있습니다.

대형 인공지능 기업들은 서로의 고객이면서 경쟁자입니다. 한쪽의 내부화 결정이 다른 쪽의 매출 성장률을 바꾸는 구조이므로, 기업공개 가치와 매출 지속성을 함께 보셔야 합니다.

■ 왜 이 뉴스가 중요한가

1. 2조 달러라는 숫자는 비상장 인공지능 기업 밸류에이션의 기준점 역할을 합니다.

2. 대형 고객 한 곳의 지출 변화가 매출 성장률을 크게 흔들 수 있습니다.

3. 상장 전 매출 훼손은 공모가 산정에 직접 반영됩니다.

4. 메타가 매달 수억 달러를 계속 쓰고 있다는 사실은 축소 방침과 실제 집행이 다르다는 뜻입니다.

5. 인공지능 기업 간 고객 관계는 언제든 경쟁 관계로 바뀔 수 있습니다.

■ 시나리오

**A: 메타 지출이 유지되면 2조 달러 논의가 이어질 수 있습니다.**
**B: 메타가 내부 도구로 전환하면 상장 전 성장률이 낮아질 수 있습니다.**
**C: 상장 창구가 닫히면 일정 자체가 뒤로 밀릴 수 있습니다.**

■ 오늘까지 흐름

- 메타는 앤트로픽 사용 축소 방침을 밝혔습니다.
- 실제로는 매달 수억 달러 지출이 이어지고 있습니다.
- 기업공개 가치는 2조 달러까지 거론되기 시작했습니다.

■ 반대 관점

(1) 2조 달러는 확정 가치가 아니라 논의되는 상단입니다.

(2) 상장 일정이 나오지 않은 단계입니다.

(3) 메타의 지출 축소는 발표와 실행 사이에 시차가 있습니다.

(4) 기업 고객 매출은 계약 구조에 따라 인식 시점이 다릅니다.

(5) 경쟁 모델의 성능 변화가 고객 이동을 앞당길 수 있습니다.

■ 앞으로 볼 것

(1) 메타의 월 지출 규모가 실제로 줄어드는지 확인하시면 됩니다.

(2) 앤트로픽의 상장 서류가 제출되는 시점을 보시기 바랍니다.

(3) 거론되는 기업공개 가치가 2조 달러에서 어떻게 움직이는지 추적하시면 됩니다.

(4) 대형 고객 집중도가 공개되는지 살펴보시기 바랍니다.

(5) 메타 자체 도구의 실제 대체 범위를 확인하시면 됩니다.

■ 투자시사점

기업공개 가치는 기대이고, 매출 지속성은 사실입니다. 2조 달러라는 숫자보다 대형 고객의 월 지출이 유지되는지를 먼저 확인하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'앤트로픽 기업공개 가치가 2조 달러까지 거론되지만 상장 전 매출 훼손 위험이 함께 지적됩니다',
    heroBig:'$2T',
    heroSub:'기업공개 가치는 2조 달러까지 거론됩니다. 다만 대형 고객의 내부화가 상장 전 매출을 줄일 수 있습니다.',
    beforeLabel:'상장 전 위험',
    beforeBig:'매출 훼손',
    beforeSub:'대형 고객 이탈 가능성',
    afterLabel:'기업공개 가치',
    afterBig:'$2T',
    afterSub:'거론되는 상단',
    cards:[{icon:'🏛️',big:'$2T',mid:'기업공개 가치',sub:'논의되는 상단'},{icon:'💵',big:'월 수억',mid:'대형 고객 지출',sub:'축소 방침에도 지속'},{icon:'⚔️',big:'내부화',mid:'자체 도구 확대',sub:'매출 감소 위험'}],
    quote:'"앤트로픽의 기업공개 가치가 2조 달러까지 거론됩니다. 동시에 메타가 자체 도구를 늘리거나 오픈AI 사용을 확대하면 상장 전에 앤트로픽 매출이 줄어들 수 있다는 지적도 나옵니다. 대형 인공지능 기업은 서로의 고객이면서 경쟁자입니다."',
    footer:'AI · 앤트로픽 상장 논의',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Anthropic IPO talk near $2T, with pre-IPO revenue risk flagged',
    heroBig:'$2T',
    heroSub:'IPO talk reaches a $2T valuation, while a large customer moving in-house could cut revenue before the listing.',
    beforeLabel:'Pre-IPO risk',
    beforeBig:'Revenue hit',
    beforeSub:'Large customer shift',
    afterLabel:'IPO valuation',
    afterBig:'$2T',
    afterSub:'Upper end discussed',
    cards:[{icon:'🏛️',big:'$2T',mid:'IPO value',sub:'Upper end'},{icon:'💵',big:'$100Ms',mid:'Monthly spend',sub:'Despite pullback'},{icon:'⚔️',big:'In-house',mid:'Internal tools',sub:'Revenue risk'}],
    quote:'"Anthropic IPO talk reaches a $2T valuation. At the same time, Meta expanding internal tools or OpenAI usage could reduce Anthropic revenue before the listing. These firms are customers and rivals at once."',
    footer:'AI · Anthropic IPO talk',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'spcx-valuation-1826b', symbol:'SPCX', layout:'tplBreaking', seed:'seed-1304',
  category:'종목분석', categoryColor:'purple', subject:'스페이스X', tickers:['SPCX'],
  title:'스페이스X 주가가 매력적인 수준이라는 평가와 함께 2033년 매출 3조 5,000억 달러 전망이 나왔습니다',
  summary:'스페이스X 주가가 매력적인 밸류에이션이라는 평가가 나왔습니다. 일론 머스크는 2033년 무렵 스페이스X 매출이 약 3조 5,000억 달러에 이를 수 있다고 언급했습니다. 이는 엔비디아 최근 12개월 매출의 약 11.5배 규모입니다.',
  titleEn:'SpaceX called attractively valued as a $3.5T revenue outlook for 2033 emerges',
  summaryEn:'SpaceX stock is described as attractively valued. Elon Musk pointed to roughly $3.5T of SpaceX revenue around 2033, about 11.5 times Nvidia trailing twelve month revenue.',
  body: `■ 상세

스페이스X 주가가 현재 수준에서 매력적인 밸류에이션이라는 평가가 나왔습니다. 비상장 지분 거래 시장에서 형성된 가격을 기준으로 한 판단이므로, 상장 이후 가격과는 다를 수 있습니다.

일론 머스크는 2033년 무렵 스페이스X 매출이 약 3조 5,000억 달러에 이를 수 있다고 언급했습니다. 이 숫자는 엔비디아의 최근 12개월 매출과 비교하면 약 11.5배 규모입니다. 위성 통신과 발사 서비스만으로 설명되기 어려운 수준이므로, 어떤 사업이 포함된 전망인지 확인이 필요합니다.

장기 전망은 방향을 보여 주는 자료이지 실적 추정치가 아닙니다. 7년 뒤 매출 목표는 발사 빈도, 위성 가입자, 정부 계약이 모두 계획대로 진행된다는 가정을 담고 있습니다.

■ 왜 이 뉴스가 중요한가

1. 3조 5,000억 달러는 현재 대형 기술기업 매출과 비교해도 매우 큰 숫자입니다.

2. 엔비디아 매출의 11.5배라는 비교는 기대치의 크기를 직관적으로 보여 줍니다.

3. 비상장 지분 가격이 저평가라는 평가는 2차 거래 수요를 자극할 수 있습니다.

4. 장기 매출 전망은 상장 시 공모가 논의의 출발점이 됩니다.

5. 목표가 클수록 실행 위험도 같이 커집니다.

■ 시나리오

**A: 위성 가입자와 정부 계약이 함께 늘면 전망의 신뢰도가 올라갑니다.**
**B: 발사 빈도가 계획보다 낮으면 목표 시점이 뒤로 밀립니다.**
**C: 상장이 늦어지면 비상장 가격과 공개 시장 가격의 차이가 유지됩니다.**

■ 오늘까지 흐름

- 비상장 지분 가격이 계속 높은 수준을 유지해 왔습니다.
- 현재 주가가 매력적이라는 평가가 새로 제시됐습니다.
- 2033년 매출 3조 5,000억 달러 전망이 함께 언급됐습니다.

■ 반대 관점

(1) 7년 뒤 매출 전망은 검증 구간이 매우 깁니다.

(2) 비상장 가격은 거래량이 적어 왜곡될 수 있습니다.

(3) 엔비디아 매출과의 배수 비교는 사업 구조가 달라 단순 비교가 어렵습니다.

(4) 위성 통신 시장의 경쟁이 강화되고 있습니다.

(5) 규제와 주파수 배분이 성장 속도를 제한할 수 있습니다.

■ 앞으로 볼 것

(1) 위성 통신 가입자와 매출 공개 여부를 확인하시면 됩니다.

(2) 정부 계약 수주가 이어지는지 보시기 바랍니다.

(3) 비상장 지분 거래 가격과 거래량을 추적하시면 됩니다.

(4) 발사 빈도가 목표 대비 어떻게 움직이는지 살펴보시기 바랍니다.

(5) 상장 관련 서류가 제출되는 시점을 확인하시면 됩니다.

■ 투자시사점

장기 전망은 기대의 크기를 보여 주는 자료입니다. 3조 5,000억 달러라는 숫자보다 가입자와 정부 계약처럼 검증 가능한 지표를 먼저 확인하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'스페이스X 주가가 매력적인 수준이라는 평가와 함께 2033년 매출 3조 5,000억 달러 전망이 나왔습니다',
    heroBig:'$3.5T',
    heroSub:'2033년 무렵 매출 3조 5,000억 달러 전망입니다. 엔비디아 최근 12개월 매출의 약 11.5배이며, 현재 주가는 매력적이라는 평가가 함께 나왔습니다.',
    cards:[{icon:'💰',big:'$3.5T',mid:'매출 전망',sub:'2033년 무렵 목표'},{icon:'⚖️',big:'11.5배',mid:'엔비디아 대비',sub:'최근 12개월 매출 기준'},{icon:'📊',big:'저평가',mid:'현재 주가 평가',sub:'비상장 거래 기준'}],
    quote:'"현재 스페이스X 주가가 매력적인 수준이라는 평가가 나왔습니다. 2033년 무렵 매출은 약 3조 5,000억 달러로 언급됐고, 엔비디아 최근 12개월 매출의 약 11.5배 규모입니다. 7년 뒤 목표이므로 가입자와 정부 계약으로 검증하시기 바랍니다."',
    noteSub:'장기 매출 전망은 방향을 보여 주는 자료이지 실적 추정치가 아닙니다. 엔비디아 최근 12개월 매출의 11.5배라는 비교는 기대의 크기를 보여 주지만 사업 구조가 달라 단순 비교는 어렵습니다. 발사 빈도와 위성 가입자, 정부 계약을 단계별로 확인하시면 됩니다.',
    footer:'SPCX · 2033년 매출 전망',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'SpaceX called attractively valued, $3.5T revenue outlook for 2033',
    heroBig:'$3.5T',
    heroSub:'Revenue around 2033 is put near $3.5T, roughly 11.5 times Nvidia trailing twelve month revenue, while the current stock is called attractively valued.',
    cards:[{icon:'💰',big:'$3.5T',mid:'Revenue view',sub:'Around 2033'},{icon:'⚖️',big:'11.5x',mid:'vs Nvidia',sub:'Trailing revenue'},{icon:'📊',big:'Cheap',mid:'Current price',sub:'Private marks'}],
    quote:'"SpaceX stock is described as attractively valued. Revenue around 2033 is put near $3.5T, roughly 11.5 times Nvidia trailing twelve month revenue. That is a seven year horizon, so verify with subscribers and contracts."',
    noteSub:'A long dated revenue outlook shows direction, not an estimate. Track launch cadence, satellite subscribers, and government contracts step by step.',
    footer:'SPCX · 2033 revenue view',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'spcx-starbase-louisiana-cadence', symbol:'SPCX', layout:'tplBreaking', seed:'seed-1305',
  category:'종목분석', categoryColor:'purple', subject:'스페이스X', tickers:['SPCX'],
  title:'스타십 40호기가 크리스마스섬 해상에서 점검됐고 내열 타일 시료가 회수됐습니다',
  summary:'스타십 40호기가 크리스마스섬 인근 해상에서 점검됐습니다. 내열 타일 시료가 회수돼 손상 정도를 분석할 수 있게 됐고, 이를 토대로 재진입 성능 개선이 예정돼 있습니다.',
  titleEn:'Starship Ship 40 inspected off Christmas Island, heat shield tile samples collected',
  summaryEn:'Ship 40 was inspected off Christmas Island. Heat shield tile samples were collected for damage analysis, and reentry improvements are planned on that basis.',
  body: `■ 상세

스타십 40호기가 크리스마스섬 인근 해상에서 점검됐습니다. 착수한 기체를 직접 확인했다는 뜻이므로, 비행 후 상태를 사진과 계측 자료가 아니라 실물로 검증할 수 있게 됐습니다.

점검 과정에서 내열 타일 시료가 회수됐습니다. 내열 타일은 대기권 재진입 때 발생하는 고온으로부터 기체를 보호하는 부품입니다. 어느 위치의 타일이 얼마나 손상됐는지를 확인하면 다음 비행에서 보완할 지점을 특정할 수 있습니다.

회수된 시료를 바탕으로 재진입 성능 개선이 예정돼 있습니다. 재진입 신뢰도는 기체 재사용의 전제 조건이므로, 발사 비용 곡선과 직접 연결되는 항목입니다.

■ 왜 이 뉴스가 중요한가

1. 착수 기체를 실물로 점검한 것은 설계 검증의 질을 높입니다.

2. 내열 타일 손상 위치를 특정하면 개선 범위를 좁힐 수 있습니다.

3. 재진입 신뢰도는 기체 재사용의 전제 조건입니다.

4. 재사용이 안정되면 발사 단가가 내려갑니다.

5. 발사 단가는 위성 통신 사업의 원가와 직접 연결됩니다.

■ 시나리오

**A: 타일 개선이 반영되면 다음 비행의 재진입 손상이 줄어들 수 있습니다.**
**B: 손상 범위가 넓게 확인되면 설계 변경에 시간이 더 걸립니다.**
**C: 회수 작업 자체가 지연되면 개선 반영 시점도 늦어집니다.**

■ 오늘까지 흐름

- 40호기가 비행을 마치고 해상에 착수했습니다.
- 크리스마스섬 인근 해상에서 기체 점검이 이뤄졌습니다.
- 내열 타일 시료가 회수되고 재진입 개선 계획이 언급됐습니다.

■ 반대 관점

(1) 시료 회수는 분석의 시작이지 개선의 완료가 아닙니다.

(2) 해상 점검은 날씨와 작업 환경에 크게 좌우됩니다.

(3) 타일 손상 원인은 여러 요인이 겹칠 수 있습니다.

(4) 개선 설계가 반영되는 데는 여러 차례 비행이 필요합니다.

(5) 재사용 목표와 실제 재사용 횟수는 차이가 큽니다.

■ 앞으로 볼 것

(1) 내열 타일 손상 분석 결과가 공개되는지 확인하시면 됩니다.

(2) 다음 비행 일정과 개선 항목을 보시기 바랍니다.

(3) 재진입 후 기체 상태가 이전보다 나아지는지 살펴보시기 바랍니다.

(4) 기체 회수 방식이 표준화되는지 추적하시면 됩니다.

(5) 발사 빈도가 실제로 올라가는지 확인하시면 됩니다.

■ 투자시사점

재진입 신뢰도는 발사 단가를 결정하는 핵심 변수입니다. 내열 타일 개선이 다음 비행에서 실제 손상 감소로 확인되는지를 지켜보시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'스타십 40호기가 크리스마스섬 해상에서 점검됐고 내열 타일 시료가 회수됐습니다',
    heroBig:'Ship 40',
    heroSub:'크리스마스섬 인근 해상에서 40호기가 점검됐습니다. 내열 타일 시료가 회수돼 재진입 성능 개선에 반영될 예정입니다.',
    cards:[{icon:'🛰️',big:'40호기',mid:'해상 점검',sub:'크리스마스섬 인근'},{icon:'🔥',big:'내열 타일',mid:'시료 회수',sub:'손상 정도 분석'},{icon:'🔁',big:'재진입',mid:'성능 개선',sub:'다음 비행 반영'}],
    quote:'"스타십 40호기가 크리스마스섬 인근 해상에서 점검됐습니다. 내열 타일 시료가 회수돼 어느 위치가 얼마나 손상됐는지 확인할 수 있게 됐고, 이를 토대로 재진입 성능 개선이 예정돼 있습니다."',
    noteSub:'재진입 신뢰도는 기체 재사용의 전제 조건이고, 재사용은 발사 단가를 결정합니다. 발사 단가는 위성 통신 사업의 원가와 직접 연결됩니다. 시료 회수는 분석의 시작이므로 다음 비행에서 손상이 실제로 줄어드는지 확인하시면 됩니다.',
    footer:'SPCX · 40호기 점검',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Ship 40 inspected off Christmas Island, tile samples collected',
    heroBig:'Ship 40',
    heroSub:'Ship 40 was inspected in waters off Christmas Island. Heat shield tile samples were collected and will feed reentry improvements.',
    cards:[{icon:'🛰️',big:'Ship 40',mid:'Inspected',sub:'Off Christmas Island'},{icon:'🔥',big:'Tiles',mid:'Samples taken',sub:'Damage analysis'},{icon:'🔁',big:'Reentry',mid:'Improvements',sub:'Next flights'}],
    quote:'"Ship 40 was inspected off Christmas Island. Heat shield tile samples were collected, showing which positions took damage, and reentry improvements are planned on that basis."',
    noteSub:'Reentry reliability gates reuse, and reuse sets launch cost. Sample collection is the start of analysis, so watch whether damage actually falls on the next flight.',
    footer:'SPCX · Ship 40 inspection',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'spcx-terafab-texas-48b', symbol:'SPCX', layout:'tpl', seed:'seed-1306',
  category:'종목분석', categoryColor:'purple', subject:'스페이스X', tickers:['SPCX'],
  title:'우주군이 군용기 위성통신을 스페이스X 단독으로 발주하고 하향 500Mbps 속도를 명시했습니다',
  summary:'미 우주군이 군용기용 위성통신 사업을 스페이스X 단독 공급으로 발주했습니다. 전 세계 지역 제한 없는 통신, 하향 500Mbps·상향 100Mbps 속도, 타일형과 소형 단말이 조건에 담겼습니다. 기본 계약은 2027년 7월까지이고 2028년 7월까지 연장 선택권이 있습니다.',
  titleEn:'Space Force awards SpaceX a sole source Starshield deal for military aircraft at 500Mbps down',
  summaryEn:'The Space Force awarded SpaceX a sole source satellite communications contract for military aircraft, with worldwide coverage, 500Mbps down and 100Mbps up, tile and mini terminals, a base period through July 2027 and an option to July 2028.',
  body: `■ 상세

미 우주군이 군용기용 위성통신 사업을 발주했고, 공급자는 스페이스X 단독으로 지정됐습니다. 단독 공급은 경쟁 입찰 없이 특정 업체만 조건을 충족한다고 판단할 때 사용하는 방식입니다.

조건에는 전 세계 지역 제한 없는 통신, 하향 500Mbps와 상향 100Mbps 속도, 타일형 단말과 소형 단말 공급이 담겼습니다. 군용기는 이동 속도가 빠르고 고도 변화가 크기 때문에 위성 추적과 지연 시간 관리가 까다로운 영역입니다.

기본 계약 기간은 2027년 7월까지이고, 2028년 7월까지 연장할 수 있는 선택권이 포함됐습니다. 계약은 7월 28일에 이뤄졌고 8월 25일에 공개됐습니다.

■ 왜 이 뉴스가 중요한가

1. 단독 공급 지정은 대체 사업자가 사실상 없다는 판단을 담고 있습니다.

2. 군용기 통신은 민간 서비스보다 요구 조건이 까다롭고 단가도 높습니다.

3. 하향 500Mbps는 기존 군용 위성통신 대비 큰 개선입니다.

4. 2028년 7월까지의 선택권은 매출 가시성을 늘려 줍니다.

5. 정부 계약은 위성 통신 사업의 매출 변동성을 낮춰 줍니다.

■ 시나리오

**A: 연장 선택권이 행사되면 계약 매출이 1년 더 이어집니다.**
**B: 다른 기종으로 적용이 확대되면 규모가 커질 수 있습니다.**
**C: 예산 조정이나 대체 사업자 등장으로 단독 구조가 흔들릴 수 있습니다.**

■ 오늘까지 흐름

- 군용 위성통신 수요가 저궤도 통신망으로 이동해 왔습니다.
- 7월 28일 계약이 체결됐습니다.
- 8월 25일 계약 내용이 공개됐습니다.

■ 반대 관점

(1) 단독 공급은 정책 변화에 따라 재검토될 수 있습니다.

(2) 계약 금액이 공개되지 않아 매출 기여를 추정하기 어렵습니다.

(3) 표기된 속도는 조건이며 실제 운용 성능과 다를 수 있습니다.

(4) 군용 단말 인증에는 시간이 걸립니다.

(5) 국방 예산 편성 일정에 따라 집행이 늦어질 수 있습니다.

■ 앞으로 볼 것

(1) 연장 선택권 행사 여부를 확인하시면 됩니다.

(2) 적용 기종이 늘어나는지 보시기 바랍니다.

(3) 단말 납품 일정이 지켜지는지 살펴보시기 바랍니다.

(4) 계약 금액이 추후 공개되는지 추적하시면 됩니다.

(5) 다른 군 조직으로 확대되는지 확인하시면 됩니다.

■ 투자시사점

정부 단독 공급 계약은 매출의 질을 높여 줍니다. 2028년 7월 연장 선택권 행사와 적용 기종 확대를 확인 지점으로 두시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'우주군이 군용기 위성통신을 스페이스X 단독으로 발주하고 하향 500Mbps 속도를 명시했습니다',
    heroIcon:'🛡️',
    heroBig:'500Mbps',
    heroSub:'군용기용 위성통신을 스페이스X 단독 공급으로 발주했습니다. 전 세계 통신, 하향 500Mbps와 상향 100Mbps, 타일형과 소형 단말이 조건입니다.',
    cards:[{icon:'✈️',big:'군용기',mid:'전 세계 통신',sub:'지역 제한 없음'},{icon:'📶',big:'500/100',mid:'하향·상향 속도',sub:'단위는 Mbps'},{icon:'📅',big:'2027년 7월',mid:'기본 계약 종료',sub:'2028년 7월 연장 선택'}],
    quote:'"군용기용 위성통신이 스페이스X 단독 공급으로 발주됐습니다. 전 세계 지역 제한 없는 통신과 하향 500Mbps, 상향 100Mbps가 조건이며, 기본 계약은 2027년 7월까지입니다. 2028년 7월까지 연장 선택권이 포함됐습니다."',
    noteHead:'왜 중요한가',
    noteSub:'단독 공급 지정은 대체 사업자가 사실상 없다는 판단을 담고 있습니다. 군용기 통신은 민간 서비스보다 요구 조건이 까다롭고 단가도 높은 영역입니다. 계약은 7월 28일에 이뤄져 8월 25일 공개됐고, 연장 선택권 행사 여부가 매출 가시성을 결정합니다.',
    footer:'SPCX · 군용기 위성통신',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Space Force awards SpaceX sole source military aircraft satcom at 500Mbps',
    heroIcon:'🛡️',
    heroBig:'500Mbps',
    heroSub:'A sole source award covers satellite communications for military aircraft, with worldwide coverage, 500Mbps down, 100Mbps up, and tile and mini terminals.',
    cards:[{icon:'✈️',big:'Aircraft',mid:'Worldwide',sub:'No region limit'},{icon:'📶',big:'500/100',mid:'Down·up speed',sub:'Megabits per second'},{icon:'📅',big:'Jul 2027',mid:'Base period',sub:'Option to Jul 2028'}],
    quote:'"Military aircraft satellite communications were awarded to SpaceX on a sole source basis. Worldwide coverage with 500Mbps down and 100Mbps up is specified, with a base period through July 2027 and an option to July 2028."',
    noteHead:'Why this matters',
    noteSub:'A sole source award implies no practical alternative supplier. The contract was made on July 28 and disclosed on August 25, and the option exercise will drive revenue visibility.',
    footer:'SPCX · military satcom',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'macro-dc-debt-jll-700b', symbol:'MACRO', layout:'tpl', seed:'seed-1307',
  category:'매크로', categoryColor:'red', subject:'수급', tickers:['MACRO'],
  title:'외국인의 미국 주식 순매수가 최근 1년간 8,000억 달러를 넘어 사상 최대를 기록했습니다',
  summary:'외국인의 미국 주식 순매수 규모가 최근 1년 동안 8,000억 달러를 넘었습니다. 1986년 이후 집계에서 가장 큰 규모이며, 미국 자산으로 자금이 집중되고 있음을 보여 줍니다.',
  titleEn:'Foreign net purchases of US equities top $800B over the past year, the largest on record',
  summaryEn:'Foreign investors bought more than $800B of US equities on a net basis over the past year, the largest amount in records going back to 1986.',
  body: `■ 상세

외국인의 미국 주식 순매수 규모가 최근 1년 동안 8,000억 달러를 넘었습니다. 순매수는 매수 금액에서 매도 금액을 뺀 값이므로, 실제로 미국 주식으로 들어온 자금 규모를 보여 줍니다.

1986년부터의 장기 집계와 비교하면 이번 수치는 가장 큰 규모입니다. 과거 여러 차례 급증 구간이 있었지만, 이번처럼 8,000억 달러를 넘어선 사례는 없었습니다.

해외 자금이 미국 주식에 집중되는 이유로는 인공지능 관련 기업의 실적 성장, 달러 자산 선호, 다른 지역 대비 높은 수익률이 함께 거론됩니다. 다만 자금 유입은 방향이 바뀔 때 속도도 빠릅니다.

■ 왜 이 뉴스가 중요한가

1. 8,000억 달러 순매수는 미국 주식 상승의 수급 배경을 설명합니다.

2. 1986년 이후 최대라는 점은 현재 국면이 예외적임을 보여 줍니다.

3. 해외 자금 비중이 높아지면 환율과 주가의 연동이 강해집니다.

4. 자금 유입이 멈추는 시점이 조정의 계기가 될 수 있습니다.

5. 특정 지역 자금 편중은 정책 변화에 민감합니다.

■ 시나리오

**A: 실적 성장이 이어지면 순매수 흐름이 유지될 수 있습니다.**
**B: 달러가 약해지면 환차손 부담으로 유입 속도가 줄어들 수 있습니다.**
**C: 다른 지역 수익률이 개선되면 자금이 분산될 수 있습니다.**

■ 오늘까지 흐름

- 해외 자금의 미국 주식 순매수가 수년간 늘어났습니다.
- 최근 1년 누적 규모가 8,000억 달러를 넘었습니다.
- 1986년 이후 집계에서 가장 큰 규모로 확인됐습니다.

■ 반대 관점

(1) 순매수 통계는 발표 시차가 있어 최신 흐름과 다를 수 있습니다.

(2) 명목 금액은 시장 규모가 커지면 자연히 늘어납니다.

(3) 특정 국가의 대규모 거래가 전체 수치를 왜곡할 수 있습니다.

(4) 지수 편입 관련 기계적 매수가 포함될 수 있습니다.

(5) 사상 최대라는 표현 자체가 과열 신호로 읽힐 수도 있습니다.

■ 앞으로 볼 것

(1) 월별 순매수 흐름이 유지되는지 확인하시면 됩니다.

(2) 달러 지수 방향과 함께 보시기 바랍니다.

(3) 국가별 자금 구성이 공개되는지 살펴보시기 바랍니다.

(4) 채권과 주식 사이 자금 배분 변화를 추적하시면 됩니다.

(5) 유입이 둔화되는 첫 신호가 어디서 나오는지 확인하시면 됩니다.

■ 투자시사점

수급은 가격을 설명하는 중요한 축입니다. 사상 최대 순매수는 상승의 배경이자 되돌림의 조건이므로, 월별 흐름의 방향 전환을 확인 지점으로 두시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'외국인의 미국 주식 순매수가 최근 1년간 8,000억 달러를 넘어 사상 최대를 기록했습니다',
    heroIcon:'🌐',
    heroBig:'$800B+',
    heroSub:'최근 1년 외국인 순매수가 8,000억 달러를 넘었습니다. 1986년 이후 집계에서 가장 큰 규모입니다.',
    cards:[{icon:'📈',big:'$800B+',mid:'최근 1년 순매수',sub:'사상 최대 규모'},{icon:'🗓️',big:'1986년',mid:'집계 시작',sub:'40년 비교 기준'},{icon:'💵',big:'달러',mid:'환율·유동성',sub:'함께 볼 변수'}],
    quote:'"외국인의 미국 주식 순매수가 최근 1년 동안 8,000억 달러를 넘어 1986년 이후 가장 큰 규모가 됐습니다. 인공지능 실적 성장과 달러 자산 선호가 배경으로 거론됩니다. 자금 유입은 방향이 바뀔 때 속도도 빠릅니다."',
    noteHead:'왜 중요한가',
    noteSub:'해외 자금 비중이 커지면 환율과 주가의 연동이 강해집니다. 인공지능 실적 성장과 달러 자산 선호가 배경으로 거론되지만, 명목 금액은 시장 규모가 커지면 자연히 늘어납니다. 월별 유입 흐름의 방향 전환을 확인하시면 됩니다.',
    footer:'MACRO · 외국인 순매수',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Foreign net purchases of US equities top $800B, the largest on record',
    heroIcon:'🌐',
    heroBig:'$800B+',
    heroSub:'Foreign investors bought more than $800B of US equities on a net basis over the past year, the largest in records since 1986.',
    cards:[{icon:'📈',big:'$800B+',mid:'Net buying',sub:'Past twelve months'},{icon:'🗓️',big:'1986',mid:'Record start',sub:'Forty year window'},{icon:'💵',big:'USD',mid:'FX·liquidity',sub:'Watch alongside'}],
    quote:'"Foreign net purchases of US equities exceeded $800B over the past year, the largest since records began in 1986. AI driven earnings growth and dollar asset preference are cited. Flows can reverse quickly."',
    noteHead:'Why this matters',
    noteSub:'A larger foreign share ties equity prices more closely to the currency. Record buying is both a support and a condition for reversal, so watch the monthly turn in flows.',
    footer:'MACRO · foreign flows',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'tsla-robotaxi-16h-6cities', symbol:'TSLA', layout:'tpl', seed:'seed-1308',
  category:'종목분석', categoryColor:'mint', subject:'테슬라', tickers:['TSLA'],
  title:'사이버캡 전면 조명이 색을 바꿔 호출한 차량을 군중 속에서 찾도록 설계됐습니다',
  summary:'사이버캡 전면에 색을 바꿀 수 있는 조명 띠가 적용됐습니다. 호출 앱이 차량마다 색을 배정해 승객이 붐비는 곳에서도 자기 차량을 구분할 수 있게 하는 방식입니다. 시험 주행에서는 금색 차체에 녹색과 주황색 띠가 켜진 모습이 확인됐습니다.',
  titleEn:'Cybercab front light bar changes color so riders can find their assigned car in a crowd',
  summaryEn:'Cybercab carries an RGB front light bar. The app assigns a color per ride so passengers can identify their car in a crowd, and gold test units were seen with green and orange strips.',
  body: `■ 상세

사이버캡 전면에 색을 바꿀 수 있는 조명 띠가 적용됐습니다. 호출 앱이 차량마다 색을 배정하고 그 색이 전면 조명에 표시되는 방식입니다. 승객은 번호판을 확인하지 않고도 자기 차량을 구분할 수 있습니다.

시험 주행에서는 금색 차체에 녹색과 주황색 띠가 켜진 모습이 확인됐습니다. 색 배정이 실제로 작동하는 단계임을 보여 주는 장면입니다.

운전자가 없는 차량은 승객을 찾아 주는 사람도 없습니다. 따라서 승객이 차량을 빨리 찾도록 돕는 장치는 편의 기능이 아니라 운영 효율과 직접 연결됩니다. 승객 대기 시간이 줄면 차량 회전율이 올라갑니다.

■ 왜 이 뉴스가 중요한가

1. 무인 차량은 승객이 스스로 차량을 찾아야 하므로 식별 장치가 필요합니다.

2. 승객 탑승 시간이 줄면 차량 한 대의 하루 운행 횟수가 늘어납니다.

3. 조명 색 배정은 앱과 차량이 실시간으로 연동돼야 작동합니다.

4. 시험 주행 차량이 목격됐다는 것은 검증 단계가 진행 중이라는 뜻입니다.

5. 승객 경험의 세부 설계는 기존 호출 서비스와의 경쟁 요소입니다.

■ 시나리오

**A: 색 배정이 안정되면 승객 대기 시간이 줄어 회전율이 올라갑니다.**
**B: 야간이나 악천후에서 식별이 어려우면 보완 장치가 필요합니다.**
**C: 조명 관련 규정이 지역별로 다르면 적용 범위가 제한될 수 있습니다.**

■ 오늘까지 흐름

- 무인 호출 서비스의 승객 식별 문제가 계속 지적돼 왔습니다.
- 사이버캡 전면에 색 변경 조명 띠가 적용됐습니다.
- 금색 차체에 녹색과 주황색 띠가 켜진 시험 차량이 확인됐습니다.

■ 반대 관점

(1) 조명 색 식별은 밝은 낮이나 먼 거리에서 효과가 떨어질 수 있습니다.

(2) 색을 구분하기 어려운 승객을 위한 대안이 필요합니다.

(3) 차량 외부 조명은 지역 규정의 제약을 받습니다.

(4) 목격된 차량은 시험 단계일 수 있습니다.

(5) 식별 편의가 곧 유료 운행 확대를 뜻하지는 않습니다.

■ 앞으로 볼 것

(1) 호출 앱에 색 안내 기능이 정식으로 들어가는지 확인하시면 됩니다.

(2) 사이버캡 양산 일정과 배치 도시를 보시기 바랍니다.

(3) 승객 탑승까지 걸리는 시간이 줄어드는지 살펴보시기 바랍니다.

(4) 차량 외부 조명 관련 규정 대응을 추적하시면 됩니다.

(5) 유료 운행 대수가 늘어나는지 확인하시면 됩니다.

■ 투자시사점

무인 호출 서비스의 수익성은 차량 회전율에서 나옵니다. 승객 식별 장치는 작아 보이지만 회전율에 직접 영향을 주므로, 탑승 대기 시간 변화를 확인 지점으로 두시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'사이버캡 전면 조명이 색을 바꿔 호출한 차량을 군중 속에서 찾도록 설계됐습니다',
    heroIcon:'🚕',
    heroBig:'색상 배정',
    heroSub:'전면 조명 띠가 색을 바꿉니다. 호출 앱이 차량마다 색을 배정해 붐비는 곳에서도 자기 차량을 구분할 수 있습니다.',
    cards:[{icon:'🌈',big:'조명 띠',mid:'전면 색 변경',sub:'차량마다 다른 색'},{icon:'📱',big:'앱 배정',mid:'색으로 식별',sub:'호출 차량 확인'},{icon:'👀',big:'금색 차량',mid:'시험 주행 목격',sub:'녹색·주황 띠 확인'}],
    quote:'"사이버캡 전면 조명이 색을 바꿉니다. 호출 앱이 차량마다 색을 배정해 승객이 붐비는 곳에서도 자기 차량을 찾을 수 있게 하는 방식입니다. 시험 주행에서는 금색 차체에 녹색과 주황색 띠가 켜진 모습이 확인됐습니다."',
    noteHead:'왜 중요한가',
    noteSub:'무인 차량은 승객을 안내해 줄 사람이 없으므로 식별 장치가 운영 효율과 직접 연결됩니다. 탑승 대기 시간이 줄면 차량 한 대의 하루 운행 횟수가 늘어납니다. 다만 밝은 낮이나 먼 거리에서는 색 식별 효과가 떨어질 수 있습니다.',
    footer:'TSLA · 사이버캡 조명',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Cybercab front light bar assigns a color so riders find their car',
    heroIcon:'🚕',
    heroBig:'Color ID',
    heroSub:'The front light bar changes color. The ride app assigns a color per car so passengers can identify their vehicle in a crowd.',
    cards:[{icon:'🌈',big:'Light bar',mid:'Front strip',sub:'Color per car'},{icon:'📱',big:'App',mid:'Assigns color',sub:'Find your ride'},{icon:'👀',big:'Gold unit',mid:'Test sighting',sub:'Green·orange strips'}],
    quote:'"The Cybercab front light bar changes color. The app assigns a color per ride so passengers can find their car in a crowd. Gold test units were seen running green and orange strips."',
    noteHead:'Why this matters',
    noteSub:'With no driver to flag riders down, identification directly affects operations. Shorter pickup time raises how many trips each car completes per day.',
    footer:'TSLA · Cybercab lighting',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'tsla-grok-think-fast-2', symbol:'TSLA', layout:'tplQuote', seed:'seed-1309',
  category:'종목분석', categoryColor:'mint', subject:'테슬라', tickers:['TSLA'],
  title:'테슬라 세미가 9월 24일 행사에서 본격 출시되고 연 5만 대 생산 공장이 준비됐습니다',
  summary:'테슬라 세미의 본격 출시 행사가 9월 24일로 예정됐습니다. 네바다 공장은 4월부터 건설돼 연 5만 대 생산 능력을 갖췄고, 선주문은 두 곳에서 870대가 확인됐습니다. 배터리 용량은 822kWh이며 전용 충전망도 함께 구축됩니다.',
  titleEn:'Tesla Semi gets a September 24 rollout event with a 50,000 per year Nevada plant',
  summaryEn:'Tesla Semi has a big rollout event set for September 24. The Nevada factory has been under construction since April with 50,000 units per year of capacity, Einride and WattEV ordered 870 trucks, packs are 822 kWh, and a dedicated charging network is being built.',
  body: `■ 상세

테슬라 세미의 본격 출시 행사가 9월 24일로 예정됐습니다. 세미는 장거리 화물용 대형 전기 트럭으로, 승용차와는 판매 구조와 고객이 완전히 다릅니다.

네바다 공장은 4월부터 건설이 진행됐고 연 5만 대 생산 능력을 목표로 합니다. 선주문은 두 물류 업체에서 870대가 확인됐습니다. 배터리 용량은 822kWh로, 대형 트럭에 필요한 주행거리를 확보하기 위한 규모입니다.

충전은 전용 대용량 충전망을 통해 이뤄집니다. 대형 트럭은 충전 시간이 운행 계획에 직접 영향을 주므로, 노선을 따라 충전소가 배치돼야 실제 운행이 가능합니다. 장기적으로는 운전자 없는 세미 운행도 목표로 제시됐습니다.

■ 왜 이 뉴스가 중요한가

1. 연 5만 대 생산 능력은 시험 생산 단계를 넘어섰다는 뜻입니다.

2. 870대 선주문은 물류 업체가 실제 운행을 계획하고 있음을 보여 줍니다.

3. 822kWh 배터리는 대당 배터리 수요가 승용차의 여러 배임을 뜻합니다.

4. 전용 충전망 구축은 초기 투자 부담과 진입 장벽을 동시에 만듭니다.

5. 9월 24일 행사는 일정이 특정된 확인 지점입니다.

■ 시나리오

**A: 행사에서 양산 일정과 추가 주문이 공개되면 사업 가시성이 올라갑니다.**
**B: 충전망 구축이 늦어지면 인도 대수가 계획보다 낮아질 수 있습니다.**
**C: 배터리 물량 배분에서 승용차와 경쟁하면 생산이 제한될 수 있습니다.**

■ 오늘까지 흐름

- 네바다 공장이 4월부터 건설돼 왔습니다.
- 물류 업체 두 곳에서 870대 주문이 확인됐습니다.
- 9월 24일 본격 출시 행사가 예정됐습니다.

■ 반대 관점

(1) 생산 능력은 설비 기준이며 실제 생산량과 다릅니다.

(2) 선주문은 취소와 조건 변경이 가능합니다.

(3) 대형 트럭 충전망 구축에는 시간과 비용이 많이 듭니다.

(4) 대당 배터리 사용량이 커 승용차 생산과 물량 경쟁이 생깁니다.

(5) 운전자 없는 운행은 장기 목표이며 규제 허가가 남아 있습니다.

■ 앞으로 볼 것

(1) 9월 24일 행사에서 공개되는 양산 일정을 확인하시면 됩니다.

(2) 870대 이후 추가 주문이 나오는지 보시기 바랍니다.

(3) 충전소 배치 계획과 완공 시점을 살펴보시기 바랍니다.

(4) 분기별 인도 대수가 집계에 반영되는지 추적하시면 됩니다.

(5) 배터리 물량 배분 관련 언급을 확인하시면 됩니다.

■ 투자시사점

세미는 승용차와 다른 매출 축입니다. 연 5만 대 생산 능력과 870대 선주문 사이의 간격을 메우는 속도가 핵심이므로, 9월 24일 행사에서 나오는 양산 일정을 확인 지점으로 두시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'테슬라 세미가 9월 24일 행사에서 본격 출시되고 연 5만 대 생산 공장이 준비됐습니다',
    heroBig:'9월 24일',
    heroSub:'세미 본격 출시 행사가 9월 24일로 예정됐습니다. 네바다 공장은 연 5만 대 생산 능력을 목표로 합니다.',
    chip1big:'5만 대',
    chip1sub:'연간 생산 능력',
    chip2big:'870대',
    chip2sub:'확인된 선주문',
    cards:[{icon:'🚛',big:'5만 대',mid:'연간 생산 능력',sub:'네바다 공장'},{icon:'🔋',big:'822kWh',mid:'배터리 용량',sub:'대형 트럭 기준'},{icon:'⚡',big:'전용 충전',mid:'충전망 구축',sub:'노선별 배치 필요'}],
    quote:'"테슬라 세미의 본격 출시 행사가 9월 24일로 예정됐습니다. 네바다 공장은 4월부터 건설돼 연 5만 대 생산 능력을 목표로 하고, 물류 업체 두 곳에서 870대 선주문이 확인됐습니다. 배터리는 822kWh이며 전용 충전망도 함께 구축됩니다."',
    noteHead:'왜 중요한가',
    noteSub:'대형 트럭은 대당 배터리 사용량이 승용차의 여러 배이고, 충전 시간이 운행 계획을 좌우합니다. 연 5만 대 생산 능력과 870대 선주문 사이의 간격을 메우는 속도가 관건이며, 운전자 없는 운행은 장기 목표로 남아 있습니다.',
    footer:'TSLA · 세미 9월 24일',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Tesla Semi rollout set for September 24 with a 50,000 per year plant',
    heroBig:'Sep 24',
    heroSub:'The Semi rollout event is set for September 24, with the Nevada plant targeting 50,000 units per year.',
    chip1big:'50,000',
    chip1sub:'Units per year',
    chip2big:'870',
    chip2sub:'Trucks ordered',
    cards:[{icon:'🚛',big:'50,000',mid:'Annual capacity',sub:'Nevada plant'},{icon:'🔋',big:'822kWh',mid:'Battery pack',sub:'Class 8 truck'},{icon:'⚡',big:'Charging',mid:'Dedicated network',sub:'Route coverage'}],
    quote:'"The Tesla Semi rollout event is set for September 24. The Nevada plant has been under construction since April targeting 50,000 units a year, and two logistics operators ordered 870 trucks. Packs are 822 kWh with a dedicated charging network."',
    noteHead:'Why this matters',
    noteSub:'Heavy trucks use several times more battery per unit than cars, and charging time drives route planning. Closing the gap between 50,000 units of capacity and 870 orders is the key, with driverless operation a long term goal.',
    footer:'TSLA · Semi September 24',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'meta-compute-resale-wf', symbol:'META', layout:'tplCompare', seed:'seed-1310',
  category:'종목분석', categoryColor:'blue', subject:'메타', tickers:['META'],
  title:'메타는 앤트로픽 사용을 줄이겠다고 밝혔지만 여전히 매달 수억 달러를 쓰고 있습니다',
  summary:'메타는 앤트로픽 사용을 줄이겠다는 방침을 밝혔지만 실제로는 매달 수억 달러를 계속 지출하고 있습니다. 자체 도구와 다른 모델로 전환이 진행되면 지출 구조가 바뀔 수 있어, 외부 모델 비용과 자체 개발 비용의 균형이 관건입니다.',
  titleEn:'Meta said it would pull back from Anthropic yet still spends hundreds of millions a month',
  summaryEn:'Meta signaled a pullback from Anthropic but still spends hundreds of millions of dollars per month. A shift to internal tools or other models would change that cost structure.',
  body: `■ 상세

메타는 앤트로픽 사용을 줄이겠다는 방침을 밝혔습니다. 그러나 실제 지출은 매달 수억 달러 수준으로 이어지고 있습니다. 방침과 집행 사이에 시차가 있다는 뜻입니다.

외부 모델 사용료는 손익계산서에서 비용으로 인식됩니다. 자체 모델과 내부 도구로 전환하면 비용 항목이 사용료에서 인프라 투자와 인건비로 옮겨 갑니다. 총액이 줄어드는지, 항목만 바뀌는지가 실제 관심사입니다.

메타는 다른 모델 사용도 함께 늘릴 수 있습니다. 대형 인공지능 기업들은 서로의 고객이면서 경쟁자이므로, 한쪽의 내부화 결정이 다른 쪽의 매출 성장률을 바꿉니다.

■ 왜 이 뉴스가 중요한가

1. 매달 수억 달러 지출은 외부 모델 비용의 실제 규모를 보여 줍니다.

2. 축소 방침과 실제 집행의 차이는 전환에 시간이 걸린다는 뜻입니다.

3. 자체 도구 전환은 비용 항목을 사용료에서 투자로 옮깁니다.

4. 대형 고객의 결정이 공급 기업의 매출 성장률을 흔듭니다.

5. 인공지능 비용 구조는 영업이익률의 핵심 변수입니다.

■ 시나리오

**A: 자체 도구가 성능을 맞추면 외부 사용료가 줄어들 수 있습니다.**
**B: 전환이 늦어지면 매달 수억 달러 지출이 유지됩니다.**
**C: 다른 모델로 옮기면 총액은 유지되고 공급처만 바뀝니다.**

■ 오늘까지 흐름

- 메타는 앤트로픽 사용 축소 방침을 밝혔습니다.
- 실제 지출은 매달 수억 달러 수준으로 이어졌습니다.
- 자체 도구와 다른 모델 사용 확대가 함께 거론되고 있습니다.

■ 반대 관점

(1) 수억 달러라는 표현은 범위가 넓어 정확한 규모를 알기 어렵습니다.

(2) 계약 구조에 따라 최소 사용 약정이 남아 있을 수 있습니다.

(3) 자체 도구의 성능이 외부 모델을 대체할 수준인지 확인이 필요합니다.

(4) 비용을 줄이면 서비스 품질이 낮아질 수 있습니다.

(5) 전환 과정에서 이중 비용이 발생할 수 있습니다.

■ 앞으로 볼 것

(1) 월 지출 규모가 실제로 줄어드는지 확인하시면 됩니다.

(2) 자체 모델 관련 인프라 투자 계획을 보시기 바랍니다.

(3) 외부 모델 공급처 구성이 바뀌는지 살펴보시기 바랍니다.

(4) 인공지능 관련 비용이 실적 발표에서 어떻게 설명되는지 추적하시면 됩니다.

(5) 영업이익률이 비용 전환과 함께 어떻게 움직이는지 확인하시면 됩니다.

■ 투자시사점

비용 축소 방침은 발표보다 집행이 중요합니다. 매달 수억 달러 지출이 실제로 줄어드는지, 아니면 항목만 옮겨 가는지를 확인 지점으로 두시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'메타는 앤트로픽 사용을 줄이겠다고 밝혔지만 여전히 매달 수억 달러를 쓰고 있습니다',
    heroBig:'월 수억 달러',
    heroSub:'축소 방침을 밝혔지만 실제 지출은 매달 수억 달러로 이어집니다. 자체 도구 전환은 비용 항목을 옮길 뿐일 수 있습니다.',
    beforeLabel:'공식 방침',
    beforeBig:'사용 축소',
    beforeSub:'외부 의존도 줄이기',
    afterLabel:'실제 지출',
    afterBig:'월 수억 달러',
    afterSub:'축소에도 지속',
    cards:[{icon:'💵',big:'월 수억',mid:'외부 모델 비용',sub:'지출 지속 중'},{icon:'🛠️',big:'자체 도구',mid:'전환 추진',sub:'항목 이동 가능성'},{icon:'📉',big:'성장률',mid:'공급 기업 영향',sub:'고객 이탈 위험'}],
    quote:'"메타는 앤트로픽 사용을 줄이겠다고 밝혔지만 실제로는 매달 수억 달러를 계속 쓰고 있습니다. 자체 도구로 전환하면 비용이 사용료에서 인프라 투자로 옮겨 갑니다. 총액이 줄어드는지, 항목만 바뀌는지를 확인하셔야 합니다."',
    footer:'META · 외부 모델 비용',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Meta signaled a pullback yet still spends hundreds of millions monthly',
    heroBig:'$100Ms/mo',
    heroSub:'Despite a stated pullback, monthly spending continues at hundreds of millions. Internal tools may only move the cost line.',
    beforeLabel:'Stated policy',
    beforeBig:'Pull back',
    beforeSub:'Less external use',
    afterLabel:'Actual spend',
    afterBig:'$100Ms/mo',
    afterSub:'Still ongoing',
    cards:[{icon:'💵',big:'$100Ms',mid:'External model cost',sub:'Monthly run rate'},{icon:'🛠️',big:'In-house',mid:'Tool shift',sub:'Cost line moves'},{icon:'📉',big:'Growth',mid:'Supplier impact',sub:'Customer risk'}],
    quote:'"Meta said it would reduce Anthropic usage but still spends hundreds of millions a month. Moving to internal tools shifts cost from usage fees to infrastructure. The question is whether the total falls or the line item moves."',
    footer:'META · external model cost',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'googl-tpu-v8-broader-market', symbol:'MU', layout:'tplQuote', seed:'seed-1311',
  category:'종목분석', categoryColor:'blue', subject:'마이크론', tickers:['MU'],
  title:'마이크론이 인공지능 연구시설에 100억 달러를 추가로 투자하겠다고 밝혔습니다',
  summary:'마이크론이 미국 내 인공지능·첨단 연산 연구시설에 100억 달러를 추가 투자하겠다고 밝혔습니다. 기존에 발표한 2,500억 달러 규모 투자 약속에 더해지는 금액입니다.',
  titleEn:'Micron commits an additional $10B to US research labs for AI and advanced computing',
  summaryEn:'Micron will add $10B for US research labs focused on AI and advanced computing, on top of a previously announced $250B commitment.',
  body: `■ 상세

마이크론이 미국 내 연구시설에 100억 달러를 추가로 투자하겠다고 밝혔습니다. 대상은 인공지능과 첨단 연산 분야이며, 생산 설비가 아니라 연구 기능에 배분되는 금액입니다.

이 금액은 기존에 발표한 2,500억 달러 규모 투자 약속에 더해집니다. 기존 약속이 주로 생산 설비 확충에 초점을 맞췄던 것과 달리, 이번 발표는 연구 역량 쪽으로 범위를 넓힌 것입니다.

메모리 반도체는 인공지능 서버에서 연산 칩과 함께 병목이 되는 부품입니다. 고대역폭 메모리 수요가 늘어나는 국면에서 연구 투자를 늘리는 것은 다음 세대 제품 경쟁을 준비하는 성격으로 읽힙니다.

■ 왜 이 뉴스가 중요한가

1. 100억 달러는 연구 기능에 배분되는 금액으로는 큰 규모입니다.

2. 기존 2,500억 달러 약속에 더해지는 구조여서 총 투자 규모가 커집니다.

3. 메모리는 인공지능 서버 성능의 병목 지점입니다.

4. 미국 내 투자 확대는 정책 환경과 맞물려 있습니다.

5. 연구 투자는 다음 세대 제품의 경쟁력으로 이어집니다.

■ 시나리오

**A: 연구 성과가 제품에 반영되면 고부가 메모리 비중이 올라갑니다.**
**B: 투자 집행이 늦어지면 발표와 실제의 차이가 남습니다.**
**C: 메모리 가격 사이클이 꺾이면 투자 속도가 조정될 수 있습니다.**

■ 오늘까지 흐름

- 인공지능 서버 수요로 고대역폭 메모리 수요가 늘어났습니다.
- 미국 내 생산 설비 투자 약속이 2,500억 달러 규모로 발표됐습니다.
- 연구시설에 100억 달러 추가 투자가 더해졌습니다.

■ 반대 관점

(1) 투자 발표는 집행 일정과 조건이 함께 확인돼야 합니다.

(2) 연구 투자 성과는 실적에 반영되기까지 시간이 걸립니다.

(3) 메모리 산업은 가격 변동성이 큰 사이클 산업입니다.

(4) 정책 변화에 따라 투자 조건이 달라질 수 있습니다.

(5) 경쟁사도 같은 방향으로 투자를 늘리고 있습니다.

■ 앞으로 볼 것

(1) 연구시설의 위치와 착공 일정을 확인하시면 됩니다.

(2) 100억 달러의 연도별 집행 계획을 보시기 바랍니다.

(3) 고대역폭 메모리 매출 비중 변화를 살펴보시기 바랍니다.

(4) 기존 2,500억 달러 약속의 진행 상황을 추적하시면 됩니다.

(5) 메모리 가격 흐름과 함께 확인하시면 됩니다.

■ 투자시사점

연구 투자는 다음 세대 제품 경쟁력의 선행 지표입니다. 다만 성과 반영에는 시간이 걸리므로, 고대역폭 메모리 매출 비중과 투자 집행 일정을 함께 확인하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'마이크론이 인공지능 연구시설에 100억 달러를 추가로 투자하겠다고 밝혔습니다',
    heroBig:'$10B',
    heroSub:'인공지능·첨단 연산 연구시설에 100억 달러 추가 투자입니다. 기존 2,500억 달러 약속에 더해집니다.',
    chip1big:'$10B',
    chip1sub:'연구시설 추가 투자',
    chip2big:'$250B',
    chip2sub:'기존 투자 약속',
    cards:[{icon:'🔬',big:'$10B',mid:'연구시설 투자',sub:'인공지능·첨단 연산'},{icon:'🏭',big:'$250B',mid:'기존 약속',sub:'미국 내 투자 규모'},{icon:'🧠',big:'메모리',mid:'서버 병목 부품',sub:'고대역폭 수요 증가'}],
    quote:'"마이크론이 미국 내 인공지능·첨단 연산 연구시설에 100억 달러를 추가로 투자하겠다고 밝혔습니다. 기존에 발표한 2,500억 달러 약속에 더해지는 금액이며, 생산 설비가 아니라 연구 기능에 배분됩니다."',
    noteHead:'왜 중요한가',
    noteSub:'메모리는 인공지능 서버에서 연산 칩과 함께 병목이 되는 부품입니다. 연구 투자는 다음 세대 제품 경쟁력의 선행 지표이지만 실적 반영에는 시간이 걸리므로, 집행 일정과 고대역폭 메모리 매출 비중을 함께 확인하시면 됩니다.',
    footer:'MU · 연구시설 $10B',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Micron adds $10B for US AI and advanced computing research labs',
    heroBig:'$10B',
    heroSub:'An additional $10B goes to US research labs for AI and advanced computing, on top of a prior $250B commitment.',
    chip1big:'$10B',
    chip1sub:'Research labs',
    chip2big:'$250B',
    chip2sub:'Prior commitment',
    cards:[{icon:'🔬',big:'$10B',mid:'Research labs',sub:'AI·advanced compute'},{icon:'🏭',big:'$250B',mid:'Prior pledge',sub:'US investment'},{icon:'🧠',big:'Memory',sub:'HBM demand rising',mid:'Server bottleneck'}],
    quote:'"Micron will add $10B for US research labs focused on AI and advanced computing. The amount sits on top of a previously announced $250B commitment and goes to research capability rather than production lines."',
    noteHead:'Why this matters',
    noteSub:'Memory is a bottleneck alongside compute in AI servers. Research spending leads next generation competitiveness but takes time to show in earnings, so track the spending schedule and the high bandwidth memory mix.',
    footer:'MU · $10B research labs',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'macro-us-banks-unrealized-511b', symbol:'MACRO', layout:'tplBreaking', seed:'seed-1312',
  category:'매크로', categoryColor:'red', subject:'금리', tickers:['MACRO'],
  title:'재무장관은 국채 금리를 낮추길 원하지만 채권시장은 다른 방향으로 움직이고 있습니다',
  summary:'재무장관은 미국의 차입 비용을 낮추고 싶다는 뜻을 밝혔습니다. 그러나 채권시장은 발행 물량과 재정 부담을 반영해 반대 방향으로 움직이고 있습니다. 정책 의도와 시장 반응이 어긋나는 국면입니다.',
  titleEn:'The Treasury chief wants lower US borrowing costs, but the bond market has other ideas',
  summaryEn:'The Treasury secretary wants lower US borrowing costs, yet the bond market is moving the other way as it prices issuance volume and fiscal burden.',
  body: `■ 상세

재무장관은 미국의 차입 비용을 낮추고 싶다는 뜻을 밝혔습니다. 국채 이자 부담이 재정에서 차지하는 비중이 커지고 있으므로, 정책 담당자로서는 금리를 낮추려는 유인이 분명합니다.

그러나 채권시장은 반대 방향으로 움직이고 있습니다. 국채 금리는 정책 의도가 아니라 발행 물량, 물가 기대, 재정 지속성에 대한 판단으로 결정됩니다. 발행이 늘어나는 국면에서는 매수자가 더 높은 금리를 요구합니다.

정책 의도와 시장 반응이 어긋나면 장기 금리 변동성이 커집니다. 장기 금리는 주식 밸류에이션의 할인율로 쓰이므로, 이 괴리는 주식시장에도 그대로 전달됩니다.

■ 왜 이 뉴스가 중요한가

1. 국채 금리는 모든 자산 가격의 기준이 되는 할인율입니다.

2. 정책 의도만으로 장기 금리를 낮추기는 어렵습니다.

3. 발행 물량이 늘어나면 매수자는 더 높은 금리를 요구합니다.

4. 이자 부담 증가는 재정 여력을 줄입니다.

5. 정책과 시장의 괴리는 변동성을 키웁니다.

■ 시나리오

**A: 물가가 낮아지면 정책 의도와 시장 방향이 일치할 수 있습니다.**
**B: 발행 물량이 계속 늘면 장기 금리 부담이 이어집니다.**
**C: 단기 금리는 내려가고 장기 금리는 오르는 구간이 나타날 수 있습니다.**

■ 오늘까지 흐름

- 국채 이자 부담이 재정에서 차지하는 비중이 커져 왔습니다.
- 재무장관이 차입 비용을 낮추고 싶다는 뜻을 밝혔습니다.
- 채권시장은 발행 물량과 재정 부담을 반영해 반대로 움직였습니다.

■ 반대 관점

(1) 정책 발언은 시장 심리에 단기적으로 영향을 줄 수 있습니다.

(2) 발행 구조를 단기물 중심으로 바꾸면 평균 비용을 낮출 수 있습니다.

(3) 금리는 성장률과 물가에 따라 자연히 내려갈 수도 있습니다.

(4) 해외 수요가 강하면 발행 부담이 완화됩니다.

(5) 단기 금리와 장기 금리는 다른 요인으로 움직입니다.

■ 앞으로 볼 것

(1) 장기 국채 금리의 방향을 확인하시면 됩니다.

(2) 국채 발행 계획의 만기 구성 변화를 보시기 바랍니다.

(3) 물가 지표가 기대를 낮추는지 살펴보시기 바랍니다.

(4) 해외 투자자의 국채 수요를 추적하시면 됩니다.

(5) 이자 비용이 재정에서 차지하는 비중을 확인하시면 됩니다.

■ 투자시사점

장기 금리는 정책 의도보다 수급과 물가로 결정됩니다. 정책과 시장의 괴리가 길어지면 변동성이 커지므로, 발행 계획의 만기 구성과 장기 금리 방향을 함께 확인하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'재무장관은 국채 금리를 낮추길 원하지만 채권시장은 다른 방향으로 움직이고 있습니다',
    heroBig:'금리 역행',
    heroSub:'차입 비용을 낮추려는 정책 의도와 달리 채권시장은 발행 물량과 재정 부담을 반영해 반대로 움직였습니다.',
    cards:[{icon:'🏛️',big:'정책 목표',mid:'차입 비용 인하',sub:'이자 부담 축소'},{icon:'📈',big:'시장 반응',mid:'금리 상승 압력',sub:'발행·재정 우려'},{icon:'⚖️',big:'괴리',mid:'의도와 결과',sub:'장기물 중심 부담'}],
    quote:'"재무장관은 미국의 차입 비용을 낮추고 싶다는 뜻을 밝혔습니다. 그러나 국채 금리는 정책 의도가 아니라 발행 물량과 물가 기대, 재정 지속성으로 결정됩니다. 정책과 시장이 어긋나면 장기 금리 변동성이 커집니다."',
    noteSub:'장기 금리는 주식 밸류에이션의 할인율로 쓰입니다. 발행이 늘어나는 국면에서는 매수자가 더 높은 금리를 요구하며, 이자 부담 증가는 재정 여력을 줄입니다. 국채 발행 계획의 만기 구성과 장기물 금리 방향을 함께 확인하시면 됩니다.',
    footer:'MACRO · 정책과 금리',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Treasury wants lower borrowing costs, the bond market disagrees',
    heroBig:'Rate gap',
    heroSub:'Policy wants lower borrowing costs, but the bond market moved the other way as it priced issuance volume and fiscal burden.',
    cards:[{icon:'🏛️',big:'Policy',mid:'Lower borrowing cost',sub:'Interest burden'},{icon:'📈',big:'Market',mid:'Upward pressure',sub:'Issuance·fiscal'},{icon:'⚖️',big:'Gap',mid:'Intent vs outcome',sub:'Long end pressure'}],
    quote:'"The Treasury secretary wants lower US borrowing costs. Yet yields are set by issuance volume, inflation expectations, and fiscal sustainability rather than intent. When policy and market diverge, long end volatility rises."',
    noteSub:'Long yields serve as the discount rate for equity valuation. Intent alone rarely turns the trend, so track the maturity mix of issuance plans alongside long end yields.',
    footer:'MACRO · policy vs yields',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'tsla-cybertruck-price-5000', symbol:'SPCX', layout:'tplCompare', seed:'seed-1313',
  category:'종목분석', categoryColor:'purple', subject:'스페이스X', tickers:['SPCX'],
  title:'대한항공이 9월 초부터 기내 위성 와이파이를 무료로 제공합니다',
  summary:'대한항공이 9월 초부터 저궤도 위성 기반 기내 와이파이를 무료로 제공합니다. 국내 항공사 중 처음이며, 게임과 영상 통화까지 가능한 수준의 속도를 제시했습니다.',
  titleEn:'Korean Air will offer free Starlink onboard Wi-Fi from early September',
  summaryEn:'Korean Air will provide free satellite based onboard Wi-Fi from early September, the first Korean carrier to do so, with speeds supporting gaming and video calls.',
  body: `■ 상세

대한항공이 9월 초부터 기내 와이파이를 무료로 제공합니다. 저궤도 위성 통신망을 이용하는 방식이며, 국내 항공사 가운데 처음입니다.

기존 기내 통신은 정지궤도 위성을 이용해 지연 시간이 길고 속도도 제한적이었습니다. 저궤도 위성은 고도가 낮아 지연 시간이 짧으므로, 게임과 영상 통화처럼 실시간 반응이 필요한 사용까지 가능하다는 설명입니다.

기내 와이파이를 유료 부가서비스가 아니라 무료 기본 서비스로 제공하는 것은 항공사 간 경쟁 요소가 바뀐다는 뜻입니다. 위성 통신 사업자 쪽에서는 항공 부문이 가입자 대비 단가가 높은 시장입니다.

■ 왜 이 뉴스가 중요한가

1. 국내 항공사 최초 적용은 다른 항공사의 도입 압력으로 이어집니다.

2. 무료 제공은 기내 서비스 경쟁의 기준을 바꿉니다.

3. 저궤도 위성의 짧은 지연 시간이 실사용 품질을 결정합니다.

4. 항공 부문은 위성 통신 사업에서 단가가 높은 시장입니다.

5. 기업용 항공 계약은 매출의 안정성을 높여 줍니다.

■ 시나리오

**A: 이용자 반응이 좋으면 다른 항공사 도입이 이어질 수 있습니다.**
**B: 동시 접속이 많은 노선에서 속도가 떨어지면 만족도가 낮아질 수 있습니다.**
**C: 무료 제공 비용 부담으로 적용 노선이 제한될 수 있습니다.**

■ 오늘까지 흐름

- 저궤도 위성 통신의 항공 적용이 여러 항공사로 확대돼 왔습니다.
- 대한항공이 국내 최초로 도입을 확정했습니다.
- 9월 초부터 무료 제공이 시작됩니다.

■ 반대 관점

(1) 무료 제공은 노선과 기종에 따라 단계적으로 적용될 수 있습니다.

(2) 동시 접속자가 많으면 실제 속도는 낮아집니다.

(3) 단말 설치에는 기종별 인증과 시간이 필요합니다.

(4) 무료화는 항공사 비용 부담으로 이어집니다.

(5) 경쟁 위성 통신 사업자도 항공 시장에 진입하고 있습니다.

■ 앞으로 볼 것

(1) 적용 노선과 기종이 얼마나 빠르게 늘어나는지 확인하시면 됩니다.

(2) 다른 국내 항공사의 도입 발표를 보시기 바랍니다.

(3) 실제 이용 속도와 만족도를 살펴보시기 바랍니다.

(4) 위성 통신 사업자의 항공 부문 계약 건수를 추적하시면 됩니다.

(5) 기내 서비스 비용이 항공사 손익에 어떻게 반영되는지 확인하시면 됩니다.

■ 투자시사점

항공 부문은 위성 통신 사업에서 단가가 높은 시장입니다. 국내 첫 무료 제공이 다른 항공사 도입으로 이어지는지를 확인 지점으로 두시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'대한항공이 9월 초부터 기내 위성 와이파이를 무료로 제공합니다',
    heroBig:'무료 제공',
    heroSub:'9월 초부터 저궤도 위성 기반 기내 와이파이를 무료로 제공합니다. 국내 항공사 중 처음입니다.',
    beforeLabel:'기존 기내 통신',
    beforeBig:'제한적',
    beforeSub:'속도·지연 시간 부담',
    afterLabel:'9월 초부터',
    afterBig:'무료 제공',
    afterSub:'국내 항공사 최초',
    cards:[{icon:'✈️',big:'9월 초',mid:'서비스 시작',sub:'국내 최초 도입'},{icon:'🛰️',big:'저궤도',mid:'위성 통신망',sub:'지연 시간 짧음'},{icon:'🎮',big:'게임·통화',mid:'영상 통화 가능',sub:'실시간 사용 지원'}],
    quote:'"대한항공이 9월 초부터 저궤도 위성 기반 기내 와이파이를 무료로 제공합니다. 국내 항공사 가운데 처음이며, 게임과 영상 통화까지 가능한 속도를 제시했습니다. 항공 부문은 위성 통신에서 단가가 높은 시장입니다."',
    footer:'SPCX · 기내 위성 와이파이',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Korean Air offers free satellite onboard Wi-Fi from early September',
    heroBig:'Free Wi-Fi',
    heroSub:'From early September, low earth orbit satellite Wi-Fi will be free onboard, a first among Korean carriers.',
    beforeLabel:'Previous onboard',
    beforeBig:'Limited',
    beforeSub:'Speed and latency',
    afterLabel:'From early Sep',
    afterBig:'Free',
    afterSub:'First Korean carrier',
    cards:[{icon:'✈️',big:'Early Sep',mid:'Service start',sub:'First in Korea'},{icon:'🛰️',big:'LEO',mid:'Satellite network',sub:'Lower latency'},{icon:'🎮',big:'Gaming',mid:'Video calls',sub:'Real time use'}],
    quote:'"Korean Air will offer free low earth orbit satellite Wi-Fi onboard from early September, a first among Korean carriers, with speeds supporting gaming and video calls. Aviation is a high value segment for satellite connectivity."',
    footer:'SPCX · onboard satellite Wi-Fi',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'anthropic-nscale-45b-vera-rubin', symbol:'NVDA', layout:'tplDday', seed:'seed-1314',
  category:'종목분석', categoryColor:'blue', subject:'엔비디아', tickers:['NVDA'],
  title:'엔비디아 중앙처리장치 매출이 2028 회계연도에 두 배 이상 늘어날 전망입니다',
  summary:'엔비디아의 중앙처리장치 매출이 2028 회계연도에 두 배 이상 늘어날 것으로 전망됩니다. 그래픽처리장치와 함께 공급하는 구조가 자리 잡으면서 서버용 중앙처리장치 공급에서도 선두를 노리는 흐름입니다.',
  titleEn:'Nvidia CPU revenue is expected to more than double in fiscal 2028',
  summaryEn:'Nvidia CPU revenue is expected to more than double in fiscal 2028, as bundling with GPUs positions the company as a leading server CPU supplier.',
  body: `■ 상세

엔비디아의 중앙처리장치 매출이 2028 회계연도에 두 배 이상 늘어날 것으로 전망됩니다. 중앙처리장치는 서버 전체의 작업을 조율하는 칩으로, 그래픽처리장치와 짝을 이뤄 사용됩니다.

엔비디아는 그래픽처리장치를 중심으로 성장했지만, 인공지능 서버를 통째로 공급하는 방식이 늘면서 중앙처리장치도 함께 판매되고 있습니다. 고객이 서버 단위로 구매하면 개별 부품을 따로 고르는 여지가 줄어듭니다.

이 흐름이 이어지면 서버용 중앙처리장치 공급에서도 선두 사업자가 될 수 있다는 전망이 나옵니다. 기존 중앙처리장치 업체들에게는 점유율 위협이 되는 구조입니다.

■ 왜 이 뉴스가 중요한가

1. 두 배 이상 증가는 중앙처리장치가 부수 사업을 넘어선다는 뜻입니다.

2. 서버 단위 판매는 부품 선택권을 공급자 쪽으로 옮깁니다.

3. 중앙처리장치까지 확보하면 서버당 매출이 늘어납니다.

4. 기존 중앙처리장치 업체는 점유율 압박을 받습니다.

5. 2028 회계연도라는 시점이 명시돼 검증이 가능합니다.

■ 시나리오

**A: 서버 단위 판매가 늘면 중앙처리장치 매출 증가가 이어집니다.**
**B: 고객이 부품을 직접 조합하면 증가 속도가 낮아질 수 있습니다.**
**C: 기존 업체가 가격으로 대응하면 마진이 압박받을 수 있습니다.**

■ 오늘까지 흐름

- 인공지능 서버 수요가 그래픽처리장치를 중심으로 늘어났습니다.
- 서버를 통째로 공급하는 방식이 확대됐습니다.
- 중앙처리장치 매출이 2028 회계연도에 두 배 이상 늘어날 전망이 제시됐습니다.

■ 반대 관점

(1) 전망은 계획이며 실제 매출과 다를 수 있습니다.

(2) 서버 단위 판매를 원하지 않는 고객도 있습니다.

(3) 기존 중앙처리장치 업체의 생태계가 아직 강합니다.

(4) 두 배 증가는 기준 금액이 작을 때 상대적으로 쉽습니다.

(5) 부품 구성 변화는 총마진에 다른 방향으로 작용할 수 있습니다.

■ 앞으로 볼 것

(1) 분기 실적에서 중앙처리장치 매출이 별도로 공개되는지 확인하시면 됩니다.

(2) 서버 단위 판매 비중을 보시기 바랍니다.

(3) 기존 중앙처리장치 업체의 점유율 변화를 살펴보시기 바랍니다.

(4) 서버당 평균 판매 금액 추이를 추적하시면 됩니다.

(5) 총마진이 부품 구성 변화와 함께 어떻게 움직이는지 확인하시면 됩니다.

■ 투자시사점

중앙처리장치는 그래픽처리장치 매출에 더해지는 두 번째 축입니다. 2028 회계연도 두 배 증가 전망이 분기 실적에서 확인되는지를 다음 점검 지점으로 두시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'엔비디아 중앙처리장치 매출이 2028 회계연도에 두 배 이상 늘어날 전망입니다',
    heroBig:'2배 이상',
    ddayLabel:'2028 회계연도 전망',
    heroSub:'중앙처리장치 매출이 두 배 이상 늘어날 전망입니다. 서버를 통째로 공급하는 방식이 확대된 결과입니다.',
    quote:'"엔비디아 중앙처리장치 매출이 2028 회계연도에 두 배 이상 늘어날 전망입니다. 서버 단위 공급이 늘면서 부품 선택권이 공급자 쪽으로 옮겨 가고 있습니다."',
    cards:[{icon:'🧠',big:'2배 이상',mid:'매출 증가 전망',sub:'2028 회계연도'},{icon:'🖥️',big:'서버용',mid:'중앙처리장치',sub:'그래픽칩과 함께 공급'},{icon:'🏆',big:'선두 목표',mid:'서버 칩 공급',sub:'점유율 확대 시나리오'}],
    noteHead:'왜 중요한가',
    noteSub:'서버를 통째로 공급하면 고객이 개별 부품을 고르는 여지가 줄어들고 서버당 매출이 늘어납니다. 기존 중앙처리장치 업체에는 점유율 압박이며, 2028 회계연도라는 시점이 명시돼 분기 실적으로 검증할 수 있습니다. 다만 전망은 계획이며 실제 매출과 다를 수 있습니다.',
    footer:'NVDA · 중앙처리장치 매출',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Nvidia CPU revenue expected to more than double in fiscal 2028',
    heroBig:'2x+',
    ddayLabel:'FISCAL 2028 OUTLOOK',
    heroSub:'CPU revenue is expected to more than double as full server level supply expands.',
    quote:'"Nvidia CPU revenue is expected to more than double in fiscal 2028. As full server supply expands, component choice shifts toward the vendor."',
    cards:[{icon:'🧠',big:'2x+',mid:'Revenue growth',sub:'Fiscal 2028'},{icon:'🖥️',big:'Server',mid:'CPU business',sub:'Sold with GPUs'},{icon:'🏆',big:'Leader',mid:'Server CPU supply',sub:'Share gain path'}],
    noteHead:'Why this matters',
    noteSub:'Selling complete servers reduces customer component choice and raises revenue per server. Incumbent CPU vendors face share pressure, and the fiscal 2028 timeline makes the claim checkable in quarterly results.',
    footer:'NVDA · CPU revenue',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }}
];
function buildSeedSummary() {
  return `  // ── 2026-08-28 신규 ──────────────────────────────────────────────────────
  { id: "seed-1301", title: '2026년 8월 28일 한장 요약입니다. 엔비디아 8.74% 급등·잭슨홀 워시 연설·전력망 행정명령·30년물 5.31%·비트코인·코스피 7,000 재시도를 모았습니다', summary: '엔비디아가 정규장에서 8.74% 급등하며 나스닥 +1.57%, S&P500 +0.72%로 마감했습니다. 3분기 매출 전망 1,080억 달러가 핵심입니다. 오늘 잭슨홀 워시 연준 의장 연설, 미국 전력망 보호 행정명령, 30년물 5.31%, 비트코인 약 78,800달러, 코스피 6,984.95(+1.05%) 7,000 재시도도 같이 보시기 바랍니다.',
    body: "",
    titleEn: 'Daily snapshot August 28, 2026: NVDA +8.74%, Jackson Hole Warsh, grid EO, 30Y 5.31%, BTC, KOSPI 7K retest',
    summaryEn: 'Nvidia +8.74%, Nasdaq +1.57%, S&P +0.72%, Q3 guide $108B. Jackson Hole Warsh speech, US grid EO, 30Y 5.31%, BTC ~$78.8K, KOSPI 6,984.95.',
    category: '특집', categoryColor: 'mint', subject: '한장요약',
    date: "${DATE_ISO}", updatedAt: "${UPDATED_AT}",
    images: ["/charts/summary-${DATETAG}.svg"],
    imagesEn: ["/charts/summary-${DATETAG}-en.svg"],
    isPinned: true, imageOnly: true,
  }`;
}

function buildSeedReport(t) {
  const img = `/charts/${t.file}-${DATETAG}.svg`;
  const imgEn = `/charts/${t.file}-${DATETAG}-en.svg`;
  const titleEsc = t.title.replace(/'/g, "\\'");
  const summaryEsc = t.summary.replace(/'/g, "\\'");
  return `  { id: "${t.seed}", title: '${titleEsc}', summary: '${summaryEsc}',
    body: \`${t.body}\`,
    titleEn: '${t.titleEn.replace(/'/g, "\\'")}',
    summaryEn: '${t.summaryEn.replace(/'/g, "\\'")}',
    bodyEn: ${JSON.stringify(BODY_EN)},
    category: '${t.category}', categoryColor: '${t.categoryColor}', subject: '${t.subject}',
    date: "${DATE_ISO}", updatedAt: "${UPDATED_AT}",
    images: ["${img}"],
    imagesEn: ["${imgEn}"],
  }`;
}

function buildTickersBlock() {
  const summaryTickers = "['NVDA', 'MACRO', 'TSLA', 'SPCX', 'META', 'GOOGL', 'AI']";
  const lines = [`  // 2026-08-28`, `  "seed-1301": ${summaryTickers},`];
  for (const t of TOPICS) {
    lines.push(`  "${t.seed}": [${t.tickers.map(x => `'${x}'`).join(', ')}],`);
  }
  return lines.join('\n');
}

function buildWallPosts() {
  const posts = [
    ['NVDA', '정규장 +8.74%… 하루에 시총 5050억 달러 늘었다는 계산'],
    ['META', '앤트로픽 IPO 2조 달러 얘기 나오네. 메타 지출 줄면 어쩔'],
    ['SPCX', '2033년 매출 3.5조? 엔비디아 최근 12개월 매출 11.5배라는데'],
    ['SPCX', '스타십 40호기 내열 타일 시료 회수했대. 재진입 개선 들어감'],
    ['SPCX', '우주군 군용기 위성통신 단독 수주. 하향 500Mbps'],
    ['MACRO', '외국인 미국주식 순매수 1년 8000억 넘음. 1986년 이후 최대'],
    ['TSLA', '사이버캡 앞 조명 색으로 내 차 찾는 거 은근 실용적'],
    ['TSLA', '세미 9월 24일 행사. 네바다 연 5만대, 선주문 870대'],
    ['META', '줄인다더니 앤트로픽에 아직 월 수억 달러 쓰는 중'],
    ['MU', '마이크론 연구시설 100억 추가. 기존 2500억에 얹는 거'],
    ['MACRO', '재무장관은 금리 내리고 싶은데 채권시장은 반대로 감'],
    ['SPCX', '대한항공 9월 초부터 기내 와이파이 무료. 국내 최초'],
    ['NVDA', 'NVDA CPU 매출 FY28에 2배 이상? 서버 통째로 파니까'],
    ['MACRO', '잭슨홀 워시 연설·30년물 5.31%·코스피 7000 재시도 같이 보자'],
  ];
  let out = '  // ── 2026-08-28 신규 ────────────────\n';
  posts.forEach((p, i) => {
    const id = 1117 + i;
    const nick = `익명_${3400 + i * 17}`;
    out += `  { id: ${id}, symbol: "${p[0]}", nickname: "${nick}", holdingLabel: "관심종목",\n    content: "${p[1]}",\n    createdAt: T28AU + ${(i + 1) * 8}*60_000, likes: ${10 + (i % 7)}, comments: ${i % 3 === 0 ? 2 : 1} },\n`;
  });
  return out;
}

function buildWallComments() {
  const comments = [
    [1117, ['시총 5050억은 계산 기준마다 다르던데', '3분기 1080억 가이던스가 핵심']],
    [1118, ['2조는 거론되는 상단 얘기지', '메타가 내부 도구로 갈아타면 매출 빠짐']],
    [1119, ['7년 뒤 전망이라 검증 구간 김', '비상장 가격이라 거래량 봐야']],
    [1120, ['타일 손상 위치 특정되면 개선 빠름', '착수 기체 실물 점검이 크다']],
    [1121, ['단독 수주면 대체 사업자 없다는 뜻', '2028년 7월 연장 선택권 주목']],
    [1122, ['수급 좋으면 되돌림도 빠름', '달러 방향 같이 봐야']],
    [1123, ['무인차라 승객이 직접 찾아야 하니까', '밤이나 비 올 때도 잘 보일까']],
    [1124, ['822kWh면 승용차 여러 대분', '충전망이 먼저 깔려야']],
    [1125, ['발표랑 집행이 다르네', '항목만 옮기는 거 아닌지']],
    [1126, ['연구시설이라 실적 반영은 느림', '고대역폭 메모리 비중이 관건']],
    [1127, ['발행 물량 늘면 금리 못 내림', '만기 구성 바꾸는지 봐야']],
    [1128, ['무료면 다른 항공사도 따라올 듯', '동시 접속 많으면 느려질 텐데']],
    [1129, ['서버 통째로 팔면 부품 선택권 없어짐', '기존 CPU 업체 점유율 압박']],
    [1130, ['30년물 5.31%가 제일 부담', '코스피 7000은 터치만 했음']],
  ];
  let out = '  // ── 2026-08-28 신규 댓글 ────────────────\n';
  for (const [postId, lines] of comments) {
    out += `  ${postId}: [\n`;
    lines.forEach((c, j) => {
      out += `    { id: ${j + 1}, nickname: "익명_${3500 + postId + j * 3}", holdingLabel: "관심종목", content: "${c}", createdAt: T28AU + ${Math.floor(postId - 1116) * 8}*60_000 + ${(j + 1) * 3}*60_000, likes: ${4 + j} },\n`;
    });
    out += `  ],\n`;
  }
  return out;
}

function buildAnalystPosts() {
  const items = [
    [-917, '성수 너구리 #15', 'NVDA', '엔비디아가 실적 발표 다음 정규장에서 8.74% 올라 하루 만에 시가총액이 3,600억~5,050억 달러 늘었습니다.\n이 상승분이 같은 날 미국 시장 전체 상승의 약 77%를 차지했습니다. 회계 2분기 데이터센터 매출 890억 2,000만 달러와 3분기 전망 1,080억 달러를 확인하시기 바랍니다.', 2],
    [-918, '한남 재규어 #27', 'META', '앤트로픽의 기업공개 가치가 2조 달러까지 거론되고 있습니다.\n다만 메타가 자체 도구를 늘리거나 다른 모델 사용을 확대하면 상장 전에 앤트로픽 매출이 줄어들 수 있다는 지적도 함께 나옵니다.', 2],
    [-919, '압구정 치타 #44', 'SPCX', '스페이스X 주가가 매력적인 수준이라는 평가와 함께 2033년 무렵 매출 3조 5,000억 달러 전망이 제시됐습니다.\n엔비디아 최근 12개월 매출의 약 11.5배 규모이므로, 위성 가입자와 정부 계약으로 검증하시기 바랍니다.', 1],
    [-920, '여의도 수리 #28', 'SPCX', '스타십 40호기가 크리스마스섬 인근 해상에서 점검되고 내열 타일 시료가 회수됐습니다.\n손상 위치를 특정하면 개선 범위를 좁힐 수 있으며, 재진입 신뢰도는 기체 재사용과 발사 단가로 이어집니다.', 2],
    [-921, '삼성동 올빼미 #19', 'SPCX', '우주군이 군용기용 위성통신을 스페이스X 단독 공급으로 발주했습니다.\n전 세계 통신과 하향 500Mbps·상향 100Mbps가 조건이며, 기본 계약은 2027년 7월까지, 2028년 7월까지 연장 선택권이 포함됐습니다.', 1],
    [-922, '광화문 여우 #62', 'MACRO', '외국인의 미국 주식 순매수가 최근 1년 동안 8,000억 달러를 넘어 1986년 이후 가장 큰 규모가 됐습니다.\n수급은 상승의 배경이면서 되돌림의 조건이므로, 월별 유입 흐름과 달러 방향을 함께 보시기 바랍니다.', 1],
    [-923, '마포 살쾡이 #08', 'TSLA', '사이버캡 전면 조명이 색을 바꿔 호출한 차량을 군중 속에서 찾도록 설계됐습니다.\n무인 차량은 안내해 줄 사람이 없으므로 승객 식별이 운영 효율과 직접 연결되며, 탑승 대기 시간이 줄면 회전율이 올라갑니다.', 1],
    [-924, '판교 늑대 #90', 'TSLA', '테슬라 세미의 본격 출시 행사가 9월 24일로 예정됐습니다.\n네바다 공장은 연 5만 대 생산 능력을 목표로 하고 선주문은 870대가 확인됐습니다. 배터리는 822kWh이며 전용 충전망 구축이 관건입니다.', 2],
    [-925, '분당 매 #31', 'META', '메타는 앤트로픽 사용을 줄이겠다고 밝혔지만 실제로는 매달 수억 달러를 계속 쓰고 있습니다.\n자체 도구로 전환하면 비용이 사용료에서 인프라 투자로 옮겨 가므로, 총액이 줄어드는지를 확인하시면 됩니다.', 1],
    [-926, '해운대 고래 #03', 'MU', '마이크론이 미국 내 인공지능·첨단 연산 연구시설에 100억 달러를 추가 투자하겠다고 밝혔습니다.\n기존에 발표한 2,500억 달러 약속에 더해지는 금액이며, 생산 설비가 아니라 연구 기능에 배분됩니다.', 0],
    [-927, '송파 독수리 #66', 'MACRO', '재무장관은 미국의 차입 비용을 낮추고 싶다는 뜻을 밝혔지만 채권시장은 반대 방향으로 움직였습니다.\n장기 금리는 발행 물량과 물가 기대, 재정 지속성으로 결정되므로 정책 의도만으로는 방향이 바뀌지 않습니다.', 2],
    [-928, '인천 갈매기 #52', 'SPCX', '대한항공이 9월 초부터 저궤도 위성 기반 기내 와이파이를 무료로 제공합니다.\n국내 항공사 가운데 처음이며, 게임과 영상 통화까지 가능한 속도를 제시했습니다. 항공 부문은 단가가 높은 시장입니다.', 1],
    [-929, '역삼 판다 #77', 'NVDA', '엔비디아 중앙처리장치 매출이 2028 회계연도에 두 배 이상 늘어날 것으로 전망됩니다.\n서버를 통째로 공급하는 방식이 늘면서 부품 선택권이 공급자 쪽으로 옮겨 가고 있으며, 기존 업체는 점유율 압박을 받습니다.', 2],
    [-930, '종로 까치 #41', 'MACRO', '오늘 함께 보실 항목은 엔비디아 8.74% 급등, 잭슨홀 워시 연준 의장 연설, 미국 전력망 보호 행정명령입니다.\n30년물 국채 금리 5.31%, 비트코인 약 78,800달러, 코스피 6,984.95의 7,000선 재시도도 같은 화면입니다.', 1],
  ];
  const base = '2026-08-28T00:';
  let out = '  // ── 2026-08-28 신규 (14개 · 존댓말 · 구조 혼합) ──────────────────────\n';
  items.forEach(([id, alias, symbol, content, comments], i) => {
    const min = String(i * 7).padStart(2, '0');
    out += `  {\n    id: ${id}, alias: "${alias}", symbol: "${symbol}",\n    content: "${content.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",\n    likes: ${11 + (i % 5)}, comments: ${comments}, created_at: "${base}${min}:00.000Z", liked: false,\n  },\n`;
  });
  return out;
}

function buildAnalystComments() {
  const pairs = [[-917, ['시가총액 증가폭이 기준에 따라 달라지는 이유가 있을까요']], [-918, ['2조 달러는 어디까지 근거가 있는 숫자일까요']], [-920, ['내열 타일 개선이 다음 비행에 바로 반영될까요']], [-921, ['연장 선택권 행사 가능성은 어느 정도일까요']], [-924, ['충전망 없이 인도 대수가 늘어날 수 있을까요']], [-927, ['만기 구성을 바꾸면 평균 비용이 내려갈까요']], [-929, ['중앙처리장치 매출이 따로 공개될까요']]];
  let out = '';
  for (const [id, lines] of pairs) {
    out += `  [${id}]: [\n`;
    lines.forEach((c, j) => {
      out += `    { alias: "댓글_280${Math.abs(id)}", content: "${c}", created_at: "2026-08-28T00:${String(10 + j).padStart(2, '0')}:00.000Z" },\n`;
    });
    out += `  ],\n`;
  }
  return out;
}

function buildPairsBlock() {
  const lines = [`  // ── 2026-08-28 ─────────────────────────────────────────────────────────`];
  lines.push(`  { ko: 'summary-${DATETAG}.svg', en: 'summary-${DATETAG}-en.svg', label: 'summary', date: '${DATETAG}' },`);
  for (const t of TOPICS) {
    lines.push(`  { ko: '${t.file}-${DATETAG}.svg', en: '${t.file}-${DATETAG}-en.svg', label: '${t.file}', date: '${DATETAG}' },`);
  }
  return lines.join('\n');
}

function writeSvgs() {
  fs.writeFileSync(path.join(CHARTS, `summary-${DATETAG}.svg`), summarySvg('ko'));
  fs.writeFileSync(path.join(CHARTS, `summary-${DATETAG}-en.svg`), summarySvg('en'));
  let n = 2;
  for (const t of TOPICS) {
    const fn = LAYOUTS[t.layout] || tpl;
    const ko = { ...t.ko, symbol: t.symbol };
    const en = { ...t.en, symbol: t.symbol };
    fs.writeFileSync(path.join(CHARTS, `${t.file}-${DATETAG}.svg`), fn(ko));
    fs.writeFileSync(path.join(CHARTS, `${t.file}-${DATETAG}-en.svg`), fn(en));
    n += 2;
  }
  return n;
}

function patchReports() {
  let c = read('lib/reports.ts');
  c = c.replace(
    /(\{ id: "seed-1201"[\s\S]*?)isPinned: true/,
    '$1isPinned: false'
  );
  const insert = buildSeedSummary() + ',\n' + TOPICS.map(buildSeedReport).join(',\n') + ',\n';
  c = patch(c, 'export const SEED_REPORTS: Report[] = [\n  // ── 2026-08-27', `export const SEED_REPORTS: Report[] = [\n${insert}  // ── 2026-08-27`, 'SEED_REPORTS insert');
  const tickers = buildTickersBlock() + '\n';
  c = patch(c, 'export const REPORT_TICKERS: Record<string, string[]> = {\n  // 2026-08-27', `export const REPORT_TICKERS: Record<string, string[]> = {\n${tickers}  // 2026-08-27`, 'REPORT_TICKERS insert');
  write('lib/reports.ts', c);
}

function patchWallPosts() {
  let c = read('lib/wallPosts.ts');
  c = patch(c, 'const T27AU = 1787785200000;', 'const T28AU = 1787871600000; // 2026.08.28 08:00 KST\nconst T27AU = 1787785200000;', 'T28AU');
  c = patch(c, 'export const LATEST_UPDATE = T27AU;', 'export const LATEST_UPDATE = T28AU;', 'LATEST_UPDATE');
  c = patch(c, 'export const MOCK_POSTS: Post[] = [\n  // ── 2026-08-27', `export const MOCK_POSTS: Post[] = [\n${buildWallPosts()}`, 'MOCK_POSTS');
  c = patch(c, 'export const MOCK_COMMENTS: Record<number, Comment[]> = {\n  // ── 2026-08-27', `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${buildWallComments()}`, 'MOCK_COMMENTS');
  write('lib/wallPosts.ts', c);
}

function patchAnalystPosts() {
  let c = read('lib/analystPosts.ts');
  c = patch(c, 'export const MOCK_ANALYST_POSTS: AnalystMockPost[] = [\n  // ── 2026-08-27', `export const MOCK_ANALYST_POSTS: AnalystMockPost[] = [\n${buildAnalystPosts()}`, 'MOCK_ANALYST_POSTS');
  c = patch(c, 'export const MOCK_ANALYST_COMMENTS: Record<number, AnalystMockComment[]> = {\n  [-903]:', `export const MOCK_ANALYST_COMMENTS: Record<number, AnalystMockComment[]> = {\n${buildAnalystComments()}  [-903]:`, 'MOCK_ANALYST_COMMENTS');
  write('lib/analystPosts.ts', c);
}

function patchExportPairs() {
  let c = read('scripts/export-report-pngs.js');
  c = patch(c, 'const PAIRS = [\n  // ── 2026-08-26 ─────────────────────────────────────────────────────────', `const PAIRS = [\n${buildPairsBlock()}\n  // ── 2026-08-26 ─────────────────────────────────────────────────────────`, 'PAIRS insert');
  write('scripts/export-report-pngs.js', c);
}

function main() {
  const svgOnly = process.argv.includes('--svg-only');
  const analystOnly = process.argv.includes('--analyst-only');
  if (!analystOnly) {
    console.log('=== Investus 2026.08.28 report build' + (svgOnly ? ' (SVG only)' : '') + ' ===');
    const svgCount = writeSvgs();
    console.log(`✅ ${svgCount} SVG written to public/charts/`);
    if (svgOnly) { console.log('Done (SVG only).'); return; }
    if (!fs.readFileSync(path.join(ROOT, 'lib/reports.ts'), 'utf8').includes('seed-1301')) {
      patchReports();
      console.log('✅ lib/reports.ts patched (seed-1201 unpinned, seed-1301–1314, tickers)');
    } else {
      console.log('⏭ lib/reports.ts already has seed-1301');
    }
    if (!fs.readFileSync(path.join(ROOT, 'lib/wallPosts.ts'), 'utf8').includes('id: 1117')) {
      patchWallPosts();
      console.log('✅ lib/wallPosts.ts patched (T28AU, posts 1117–1130, comments)');
    } else {
      console.log('⏭ lib/wallPosts.ts already has Aug 28 posts');
    }
  } else {
    console.log('=== Investus 2026.08.28 analyst-only patch ===');
  }
  patchAnalystPosts();
  console.log('✅ lib/analystPosts.ts patched (-917 to -930)');
  patchExportPairs();
  console.log('✅ scripts/export-report-pngs.js PAIRS updated');
  console.log('Done.');
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) main();

export { TOPICS, LAYOUTS, writeSvgs, buildSeedReport, buildSeedSummary, buildWallPosts, buildWallComments, buildAnalystPosts, buildAnalystComments, tpl, DATE, DATETAG, DATE_ISO, UPDATED_AT, ROOT, CHARTS };
