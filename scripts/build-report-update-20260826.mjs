#!/usr/bin/env node
// 2026-08-26 Investus daily report update — full build script
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CHARTS = path.join(ROOT, 'public', 'charts');
const DATE = '2026.08.26';
const DATETAG = '20260826';
const DATE_ISO = '2026-08-26';
const UPDATED_AT = '2026.08.26 08:00';
const T26AU = 1787698800000;
const BK = 'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE';
const BE = 'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE';
const BODY_EN = 'See Korean body.\n\ninvestus.kr SRP Chief Investment Officer';

const PSYM = {
  TSLA: { fg: '#4ade80', fg2: '#22c55e', bg2: '#061209', card: '#0a1a0a' },
  NVDA: { fg: '#60a5fa', fg2: '#3b82f6', bg2: '#06121f', card: '#0a1420' },
  SPCX: { fg: '#c084fc', fg2: '#a78bfa', bg2: '#140b1f', card: '#1a0f2a' },
  GOOGL: { fg: '#4285f4', fg2: '#34a853', bg2: '#06121f', card: '#0a1420' },
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
  <rect x="60" y="642" width="960" height="180" rx="16" fill="#0f172a" stroke="#374151"/>
${multilineIfOverflow(oRaw.quote, 540, 700, F.QUOTE, MAX_W.WIDE, 4, 28, `font-family="Arial" font-size="${F.QUOTE}" fill="${p.fg}" text-anchor="middle"`)}
  <rect x="60" y="850" width="960" height="110" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1"/>
${multilineIfOverflow(oRaw.noteHead, 540, 884, F.NOTE_HEAD, MAX_W.WIDE, 2, 24, `font-family="Arial" font-size="${F.NOTE_HEAD}" fill="${p.fg}" text-anchor="middle"`)}
${multilineIfOverflow(oRaw.noteSub, 540, 920, F.NOTE_SUB, MAX_W.WIDE, 3, 22, `font-family="Arial" font-size="${F.NOTE_SUB}" fill="#9ca3af" text-anchor="middle"`)}
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
  <rect x="60" y="642" width="960" height="200" rx="16" fill="#0f172a" stroke="#374151"/>
${multilineIfOverflow(oRaw.quote, 540, 710, F.QUOTE, MAX_W.WIDE, 5, 28, `font-family="Arial" font-size="${F.QUOTE}" fill="${p.fg}" text-anchor="middle"`)}
  <rect x="60" y="862" width="960" height="100" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1"/>
${multilineIfOverflow(oRaw.noteSub, 540, 910, F.NOTE_SUB, MAX_W.WIDE, 3, 22, `font-family="Arial" font-size="${F.NOTE_SUB}" fill="#9ca3af" text-anchor="middle"`)}
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
    { stroke: '#60a5fa', fill: '#0a1420', title: '그록 3 LPX가 본격 양산에 들어갑니다', body: '베라 루빈 플랫폼 위에서 그록 3 LPX가 풀 프로덕션에 들어갔고, 네비우스가 첫 고객으로 잡혔습니다.', stat: 'LPX' },
    { stroke: '#4ade80', fill: '#0a1a0a', title: '테슬라만 대규모 자율주행을 한다는 주장', body: '규모 있는 자율주행을 실제로 하고 있는 회사는 테슬라뿐이라는 주장이 나왔습니다. 경쟁사와 비교해 검증이 필요합니다.', stat: '' },
    { stroke: '#c084fc', fill: '#1a0f2a', title: '루이지애나에 1,000억 달러 우주항', body: '스타베이스 루이지애나 우주항 투자가 1,000억 달러를 넘고, 테라베이 3문·하루 30척·17패드 설계가 공개됐습니다.', stat: '$100B+' },
    { stroke: '#4ade80', fill: '#0a1a0a', title: '포트워스에 사이버캡 대기', body: '달러스 로보택시 구역 서쪽 약 32마일 포트워스에 사이버캡 함대가 준비됐다는 설명이 나왔습니다.', stat: 'FW' },
    { stroke: '#f472b6', fill: '#201018', title: 'AVGO·NVDA CDS 사상 최고', body: '8월 차트 기준 브로드컴 CDS 126.225bp, 엔비디아 86.735bp로 사상 최고 구간에 있습니다.', stat: 'CDS' },
    { stroke: '#a78bfa', fill: '#1a1030', title: 'Anthropic IPO 최대 2조 달러', body: 'TAM 30조 달러 이상, 2분기 매출 116억 달러, 9~10월 IPO로 최대 1,000억 달러 조달·약 2조 달러 밸류 전망입니다.', stat: '$2T' },
    { stroke: '#94a3b8', fill: '#111827', title: '연준 10~15년물 50% 이상', body: '연준이 10~15년물 국채 1,028억 달러 중 540억 달러 이상, 50% 넘게 보유하고 있다는 차트가 나왔습니다.', stat: '50%+' },
  ] : [
    { stroke: '#60a5fa', fill: '#0a1420', title: 'Groq 3 LPX enters full production', body: 'Groq 3 LPX is in full production on the Vera Rubin platform, with Nebius named as the first adopter.', stat: 'LPX' },
    { stroke: '#4ade80', fill: '#0a1a0a', title: 'Tesla-only self-driving at scale claim', body: 'A claim says Tesla is the only company doing self-driving at scale. That needs a side-by-side check with rivals.', stat: '' },
    { stroke: '#c084fc', fill: '#1a0f2a', title: '$100B+ Louisiana spaceport', body: 'Starbase Louisiana is framed above $100B, with Terabay 3 doors, 30 Starship/day, and 17 pads for 15,000+/year.', stat: '$100B+' },
    { stroke: '#4ade80', fill: '#0a1a0a', title: 'Cybercab fleet ready in Fort Worth', body: 'A Cybercab fleet is described as ready in Fort Worth, TX, about 32 miles west of the Dallas robotaxi geofence.', stat: 'FW' },
    { stroke: '#f472b6', fill: '#201018', title: 'AVGO and NVDA CDS at records', body: 'August charts put Broadcom CDS at 126.225 and Nvidia at 86.735, both at all-time wides.', stat: 'CDS' },
    { stroke: '#a78bfa', fill: '#1a1030', title: 'Anthropic IPO up to $2T', body: '$30T+ TAM, Q2 revenue $11.6B, and a Sept/Oct IPO that could raise up to $100B at roughly $2T valuation.', stat: '$2T' },
    { stroke: '#94a3b8', fill: '#111827', title: 'Fed owns over half of 10–15Y Treasuries', body: 'A chart shows the Fed holding over $540B of $1,028B in 10–15 year Treasuries, above 50%.', stat: '50%+' },
  ];
  const footer = ko
    ? '더 볼 것: 세미 9/24 · 스타링크 층권 · 재무부 개입 · Gemini Enterprise · 중국 밀수 기소'
    : 'Also: Semi 9/24 · Starlink tomography · Treasury intervention · Gemini Enterprise · China smuggling';
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
{ file:'nvda-groq3-lpx-production', symbol:'NVDA', layout:'tpl', seed:'seed-1102',
  category:'종목분석', categoryColor:'blue', subject:'엔비디아', tickers:['NVDA'],
  title:'그록 3 LPX가 베라 루빈 플랫폼에서 본격 양산에 들어갔습니다',
  summary:'그록 3 LPX는 엔비디아 차세대 추론 가속기 설계입니다. 베라 루빈 플랫폼 위에서 풀 프로덕션에 들어갔고, 네비우스가 첫 채택 고객으로 잡혔습니다. 추론 칩 수요가 클라우드에서 AI 팩토리로 확장되는 신호입니다.',
  titleEn:'Groq 3 LPX enters full production on the Vera Rubin platform',
  summaryEn:'Groq 3 LPX is in full production on Vera Rubin, with Nebius as the first adopter.',
  body: body(
    '그록 3 LPX는 엔비디아가 추론(inference)에 맞춘 차세대 가속기 라인입니다. LPX는 대규모 언어 모델 답변을 빠르게 내는 칩·랙 설계를 뜻합니다. 베라 루빈(Vera Rubin)은 블랙웰 다음 세대 GPU 플랫폼 이름입니다.\n\n이번 화면은 LPX가 시범이 아니라 풀 프로덕션(full production) 단계에 들어갔다는 설명입니다. 네비우스(Nebius)가 첫 고객으로 적혀 있습니다. 네비우스는 AI 클라우드·GPU 호스팅을 하는 업체로, 신규 칩을 실제 워크로드에 올리는 첫 파트너 역할을 합니다.\n\n학습(training)용 칩과 추론용 칩은 수요 곡선이 다릅니다. LPX가 양산되면 API 호출·에이전트·실시간 서비스 쪽 매출 믹스가 커질 수 있습니다. 다만 출하 대수·단가·마진은 이번 카드만으로 확정되지 않습니다.',
    ['풀 프로덕션은 개발 데모를 넘어 고객 납품 가능 상태를 뜻합니다.','베라 루빈 플랫폼과 묶이면 차세대 납품 일정과 같이 읽힙니다.','네비우스 선점은 AI 클라우드 경쟁에서 칩 우선권 신호입니다.','추론 수요는 챗봇·코딩 에이전트 확대와 직결됩니다.','경쟁사 커스텀 실리콘·TPU와 비교 검증이 필요합니다.'],
    '**A: 네비우스 실적·캡엑스 가이던스에 LPX 비중이 드러납니다.**\n**B: 추가 고객 발표가 이어집니다.**\n**C: 양산 지연·수율 이슈가 나오면 일정이 밀립니다.**',
    '- 블랙웰 출시·베라 루빈 로드맵\n- 오늘 LPX 풀 프로덕션·네비우스\n- 실적에서 데이터센터·추론 믹스 확인 필요',
    '(1) 첫 고객 한 곳만으로 수요 확정은 아닙니다\n(2) 추론 칩 ASP 하락 가능\n(3) 수출 규제·지역 제한\n(4) 소프트웨어 스택 호환\n(5) 전력·냉각 병목',
    '(1) 추가 LPX 고객\n(2) 베라 루빈 양산 시점\n(3) 추론 매출 비중\n(4) 네비우스 캡엑스\n(5) 경쟁 TPU·ASIC',
    'LPX는 학습 한 줄기가 아니라 추론 매출 축입니다. 네비우스는 초기 검증 고객이지 전체 수요가 아닙니다. 실적에서 데이터센터 가이던스와 함께 추론 믹스를 추적하시면 됩니다.'
  ),
  ko:{title:'그록 3 LPX가 베라 루빈 플랫폼에서 본격 양산에 들어갔습니다',heroIcon:'🧠',heroBig:'LPX',heroSub:'그록 3 LPX는 추론용 가속기입니다. 베라 루빈 위에서 풀 프로덕션에 들어갔고, 네비우스가 첫 고객입니다. 시범이 아니라 납품 가능 단계라는 점이 핵심입니다.',
    cards:[{icon:'🏭',big:'풀 양산',mid:'Full production',sub:'시범 단계 아님'},{icon:'🧠',big:'Groq 3',mid:'LPX 설계',sub:'추론 가속'},{icon:'☁️',big:'Nebius',mid:'첫 채택',sub:'AI 클라우드'}],
    quote:'"그록 3 LPX가 베라 루빈 플랫폼에서 풀 프로덕션에 들어갔습니다. LPX는 대규모 언어 모델 답변을 빠르게 내는 추론 칩 계열입니다. 네비우스가 첫 고객으로 적혀 있어, 신규 칩이 실제 워크로드에 올라가기 시작했음을 보여줍니다."',
    noteHead:'왜 중요한가',noteSub:'학습 칩만이 아니라 추론 칩이 양산 단계에 들어갔습니다. API·에이전트 수요와 직결됩니다. 다음엔 추가 고객과 출하 코멘트를 보면 됩니다.',footer:'NVDA · Groq 3 LPX',brand:BK},
  en:{title:'Groq 3 LPX enters full production on Vera Rubin',heroIcon:'🧠',heroBig:'LPX',heroSub:'Groq 3 LPX is an inference accelerator on Vera Rubin in full production. Nebius is the first adopter. This is deliverable production, not a demo.',
    cards:[{icon:'🏭',big:'Full prod',mid:'Not pilot',sub:'Shippable'},{icon:'🧠',big:'Groq 3',mid:'LPX design',sub:'Inference'},{icon:'☁️',big:'Nebius',mid:'First adopter',sub:'AI cloud'}],
    quote:'"Groq 3 LPX is in full production on the Vera Rubin platform. LPX targets fast LLM inference. Nebius is listed as the first customer, meaning the new design is entering live workloads."',
    noteHead:'Why this matters',noteSub:'Inference silicon is moving to production, not just training. That ties to API and agent demand. Next: more customers and shipment comments.',footer:'NVDA · Groq 3 LPX',brand:BE}},

{ file:'tsla-fsd-scale-only', symbol:'TSLA', layout:'tplQuote', seed:'seed-1103',
  category:'종목분석', categoryColor:'mint', subject:'테슬라', tickers:['TSLA'],
  title:'규모 있는 자율주행을 실제로 하는 회사는 테슬라뿐이라는 주장이 나왔습니다',
  summary:'대규모 자율주행을 상용 규모로 하고 있는 회사는 테슬라뿐이라는 주장이 나왔습니다. 로보택시·FSD·데이터 마일이 뒷받침해야 하며, 경쟁사 실적과 비교해 검증이 필요합니다.',
  titleEn:'A claim says Tesla is the only company doing self-driving at scale',
  summaryEn:'The claim is that only Tesla runs self-driving at commercial scale. Robotaxi miles and paid service need to back it up.',
  body: body(
    '자율주행 at scale은 몇 대 시험차가 아니라, 많은 차량이 매일 공공도로에서 소프트웨어로 운전하고 데이터를 쌓는 상태를 뜻합니다. 이번 주장은 그 기준에서 테슬라만 해당한다는 쪽입니다.\n\n테슬라 쪽 근거로는 오스틴·달러스 로보택시 구역, FSD 구독·감독 주행 마일, 사이버캡 출고 등이 같은 내러티브에 묶입니다. 반면 웨이모·주스 등은 유료 도시·제한 구역에서 다른 규모로 운행 중입니다.\n\n주장과 팩트는 구분해야 합니다. “유일”은 정의(무인·유료·도시 수·마일)에 따라 달라집니다. 안전·개입률·규제 허가는 별도 지표입니다.',
    ['로보택시 내러티브의 독점 프레임이 다시 강조됩니다.','규모=차량 대수×운행 시간×지리 범위입니다.','경쟁사와 비교 시 허가·유료·무인 조건이 달라집니다.','FSD v15·사이버캡·포트워스 함대와 같은 주에 읽힙니다.','과장 주장이면 규제·여론 반발 리스크가 있습니다.'],
    '**A: 유료 마일·도시 수가 늘면 주장이 강해집니다.**\n**B: 사고·회수로 규모 주장이 약해집니다.**\n**C: 경쟁사가 무인 유료를 확대하면 “유일” 프레임이 깨집니다.**',
    '- 로보택시 파일럿·유료 도시 확대\n- 오늘 scale-only 주장\n- 사이버캡·포트워스·세미 행사 일정',
    '(1) 감독원 탑승·무인 구분\n(2) 지리적 geofence 한계\n(3) 마일 수 공개 부족\n(4) 경쟁사 유료 서비스\n(5) 규제 지역별 상이',
    '(1) 유료 로보택시 마일\n(2) geofence 확대\n(3) 개입률·사고\n(4) 경쟁사 도시 수\n(5) FSD v15 출시',
    '독점 내러티브는 밸류에이션 프리미엄을 키웁니다. 다만 정의를 좁히면 검증 가능합니다. 유료 마일·도시·무인 조건을 숫자로 추적하시면 됩니다.'
  ),
  ko:{title:'규모 있는 자율주행을 실제로 하는 회사는 테슬라뿐이라는 주장이 나왔습니다',heroBig:'SCALE',heroSub:'자율주행 at scale은 많은 차가 매일 실제 도로에서 소프트웨어로 운행하는 상태입니다.',
    cards:[{icon:'🚕',big:'로보택시',mid:'오스틴·달러스',sub:'geofence'},{icon:'📊',big:'FSD',mid:'감독 주행',sub:'마일 축적'}],
    quote:'"규모 있는 자율주행을 하고 있는 회사는 테슬라뿐이라는 주장이 나왔습니다. at scale은 시험 몇 대가 아니라, 상용에 가까운 차량 수와 운행 시간을 뜻합니다. 웨이모·주스 등은 다른 도시·다른 조건에서 경쟁합니다. 유일 여부는 무인·유료·마일 정의에 달립니다."',
    noteHead:'왜 중요한가',noteSub:'독점 서사는 테슬라 프리미엄과 연결됩니다. 정의를 좁혀 유료 마일과 도시 수로 검증하세요. 경쟁사 확대 시 프레임이 약해질 수 있습니다.',footer:'TSLA · FSD at scale',brand:BK},
  en:{title:'Only Tesla does self-driving at scale, a claim says',heroBig:'SCALE',heroSub:'At scale means many cars daily on public roads under software control, not a handful of pilots.',
    cards:[{icon:'🚕',big:'Robotaxi',mid:'Austin·Dallas',sub:'Geofence'},{icon:'📊',big:'FSD',mid:'Supervised',sub:'Mile accumulation'}],
    quote:'"A claim says Tesla is the only company doing self-driving at scale. That means commercial-like fleet size and hours, not a few test cars. Waymo and Zoox compete under different cities and rules. Uniqueness depends on driverless, paid, and mile definitions."',
    noteHead:'Why this matters',noteSub:'A monopoly narrative supports Tesla premium. Narrow the definition to paid miles and cities. Rivals expanding paid service weakens the frame.',footer:'TSLA · FSD at scale',brand:BE}},

{ file:'spcx-louisiana-100b-terabay', symbol:'SPCX', layout:'tplBreaking', seed:'seed-1104',
  category:'종목분석', categoryColor:'purple', subject:'스페이스X', tickers:['SPCX'],
  title:'루이지애나 스타베이스 우주항 투자가 1,000억 달러를 넘고 테라베이 설계가 공개됐습니다',
  summary:'스타베이스 루이지애나 우주항 투자 규모가 1,000억 달러 이상으로 잡혔습니다. 테라베이 3문, 하루 30척 스타십, 17개 패드, 연 15,000회 이상 발사 용량, 2027년 착공이 핵심 숫자입니다.',
  titleEn:'Starbase Louisiana is framed above $100B with Terabay design details',
  summaryEn:'Investment tops $100B+. Terabay has 3 doors, 30 Starship/day, 17 pads, 15,000+/year capacity, construction from 2027.',
  body: body(
    '스타베이스 루이지애나는 텍사스 스타베이스와 별도로 건설되는 대형 우주항 프로젝트입니다. 투자 규모가 1,000억 달러(100B+)를 넘는다는 설명이 나왔습니다. 테라베이(Terabay)는 스타십 조립·출고를 위한 대형 시설로, 3개의 door(거대 개구부)가 적혀 있습니다.\n\n생산 목표는 하루 30척 Starship, 17개 launch pad, 연간 15,000회 이상 발사 capacity입니다. 착공은 2027년으로 잡혀 있습니다. 숫자가 크기 때문에 허가·환경·자금 조달·실제 공정 수율이 병목이 됩니다.\n\n스타링크·스타십·궤도 데이터센터 내러티브와 같은 축입니다. 발사 cadence가 늘면 위성·궤도 컴퓨팅 비용 곡선에 영향을 줄 수 있습니다.',
    ['100B+는 인프라 CAPEX 내러티브의 상한을 올립니다.','하루 30척은 현재 cadence와 비교해 극단적 목표입니다.','17 pads·15,000+/year는 위성·화물 수요 가정을 내포합니다.','2027 착공은 단기 실적보다 장기 옵션입니다.','허가·지역 정치·환경이 일정 리스크입니다.'],
    '**A: 2027 착공·EPC 계약이 나오면 구체화됩니다.**\n**B: 규제 지연으로 로드맵이 밀립니다.**\n**C: cadence 목표 하향 조정.**',
    '- 루이지애나 주 승인·토지\n- 오늘 100B+·Terabay 스펙\n- 스타십 비행·스타링크 위성 수',
    '(1) 100B+는 계획치\n(2) 하루 30척 수율·안전\n(3) 환경·주민 소송\n(4) 금리·자금 조달\n(5) 패드·인프라 병목',
    '(1) 2027 착공 공식 일정\n(2) EPC·지역 고용\n(3) 패드 건설 단계\n(4) Starship flight rate\n(5) 위성·화물 수요',
    '루이지애나는 장기 콜 옵션입니다. 숫자는 방향이지 단기 EPS가 아닙니다. 착공·허가·실제 flight rate를 추적하시면 됩니다.'
  ),
  ko:{title:'루이지애나 스타베이스 우주항 투자가 1,000억 달러를 넘고 테라베이 설계가 공개됐습니다',heroBig:'$100B+',heroSub:'테라베이 3문, 하루 30 Starship, 17 pads, 연 15,000+ 발사 capacity, 2027 착공입니다.',
    cards:[{icon:'🚀',big:'30/일',mid:'Starship',sub:'생산 목표'},{icon:'🛫',big:'17',mid:'Launch pads',sub:'15,000+/yr'},{icon:'📅',big:'2027',mid:'착공',sub:'건설 시작'}],
    quote:'"루이지애나 스타베이스 투자가 1,000억 달러를 넘고, 테라베이에 3 door, 하루 30척, 17 패드, 연 15,000회 이상 capacity, 2027 착공이 적혀 있습니다. 우주항은 발사 cadence와 위성·화물 비용의 장기 레버입니다."',
    noteSub:'발사 infra는 스타링크·궤도 컴퓨팅의 상류입니다. 숫자가 크므로 허가·자금·수율을 함께 보세요.',footer:'SPCX · Louisiana Terabay',brand:BK},
  en:{title:'Starbase Louisiana tops $100B with Terabay specs disclosed',heroBig:'$100B+',heroSub:'Terabay: 3 doors, 30 Starship/day, 17 pads, 15,000+/year capacity, construction from 2027.',
    cards:[{icon:'🚀',big:'30/day',mid:'Starship',sub:'Target rate'},{icon:'🛫',big:'17',mid:'Launch pads',sub:'15,000+/yr'},{icon:'📅',big:'2027',mid:'Start',sub:'Construction'}],
    quote:'"Starbase Louisiana is framed above $100B. Terabay lists 3 doors, 30 Starships per day, 17 pads, 15,000+ launches per year, and a 2027 construction start. Launch infra is the upstream lever for Starlink and orbital compute."',
    noteSub:'Launch capacity feeds Starlink and orbital compute. With huge numbers, watch permits, funding, and yield.',footer:'SPCX · Louisiana Terabay',brand:BE}},

{ file:'spcx-starlink-tomography', symbol:'SPCX', layout:'tpl', seed:'seed-1105',
  category:'종목분석', categoryColor:'purple', subject:'스페이스X', tickers:['SPCX'],
  title:'교토대가 1,200기 스타링크 위성으로 대기권 밀도 단층촬영을 했습니다',
  summary:'교토대는 약 1,200기의 스타링크 위성 신호를 이용해 thermospheric density tomography(대기권 상층 밀도 단층촬영)를 수행했습니다. 위성 통신망이 과학 관측 인프라로도 쓰일 수 있음을 보여줍니다.',
  titleEn:'Kyoto University used 1,200 Starlink satellites for thermospheric tomography',
  summaryEn:'About 1,200 Starlink satellites were used for thermospheric density tomography, showing the constellation as science infrastructure.',
  body: body(
    '단층촬영(tomography)은 여러 각도에서 측정해 3차원 구조를 재구성하는 방법입니다. 이번 연구는 스타링크 위성 약 1,200기의 신호를 활용해 thermosphere(대기권 상층, 약 80~600km) 밀도를 추정했습니다.\n\n스타링크는 원래 인터넷 통신용 저궤도(LEO) 위성입니다. 위성 수가 많아지면서 과학·기상·우주 날씨 관측에 재활용 가능하다는 사례입니다. 대기권 상층 밀도는 위성 궤도·재진입·통신 지연에 영향을 줍니다.\n\n매출 직접 기여는 작을 수 있으나, 위성 네트워크의 부가 가치·데이터 라이선스·정부 계약 가능성을 보여줍니다.',
    ['1,200기 규모는 다른 LEO 합보다 밀도가 높습니다.','과학 활용은 통신 외 수익원 옵션입니다.','우주 날씨·궤도 예측 수요와 맞닿습니다.','데이터 품질·교정 방법이 재현성을 가릅니다.','규제·스펙트럼 외 연구 파트너십도 변수입니다.'],
    '**A: 정부·대학 계약이 늘면 부가 매출 축이 생깁니다.**\n**B: 과학용은 부수적, 통신 ARR이 여전히 중심.**\n**C: 위성 신호 개방 범위 제한.**',
    '- 스타링크 위성 수 확대\n- 교토대 tomography 연구\n- 상용 ARR vs 부가 데이터',
    '(1) 논문·재현성\n(2) 상업 매출 기여 미미\n(3) 경쟁 LEO\n(4) 신호 품질\n(5) 데이터 독점',
    '(1) 후속 논문·인용\n(2) NASA·JAXA 협력\n(3) 데이터 제품화\n(4) 위성 수\n(5) 스펙트럼',
    '과학 활용은 옵션 가치입니다. 통신 ARR이 본체입니다. 정부·연구 데이터 계약이 늘면 재평가 여지가 있습니다.'
  ),
  ko:{title:'교토대가 1,200기 스타링크 위성으로 대기권 밀도 단층촬영을 했습니다',heroIcon:'🛰️',heroBig:'1,200',heroSub:'스타링크 위성 신호로 thermospheric density tomography를 수행했습니다. 통신망이 과학 관측에도 쓰일 수 있음을 보여줍니다.',
    cards:[{icon:'🛰️',big:'1,200',mid:'Starlink sats',sub:'신호 소스'},{icon:'📡',big:'Tomography',mid:'밀도 재구성',sub:'대기권 상층'},{icon:'🎓',big:'교토대',mid:'연구 사례',sub:'과학 활용'}],
    quote:'"교토대는 약 1,200기 스타링크 위성을 이용해 thermospheric density tomography를 수행했습니다. tomography는 여러 측정으로 3D 구조를 복원하는 기법입니다. 위성 인터넷망이 우주 날씨·과학 데이터 인프라가 될 수 있음을 보여줍니다."',
    noteHead:'왜 중요한가',noteSub:'통신 외 데이터·정부 계약 옵션이 열립니다. 본체 ARR과 구분해 보세요. 위성 수가 많을수록 관측 해상도가 좋아질 수 있습니다.',footer:'SPCX · Starlink tomography',brand:BK},
  en:{title:'Kyoto Univ. used 1,200 Starlink sats for thermospheric tomography',heroIcon:'🛰️',heroBig:'1,200',heroSub:'Starlink signals were used for thermospheric density tomography, showing the network as science infrastructure.',
    cards:[{icon:'🛰️',big:'1,200',mid:'Starlink',sub:'Signal source'},{icon:'📡',big:'Tomography',mid:'Density map',sub:'Thermosphere'},{icon:'🎓',big:'Kyoto',mid:'Research',sub:'Science use'}],
    quote:'"Kyoto University used about 1,200 Starlink satellites for thermospheric density tomography. Tomography rebuilds 3D structure from many measurements. A consumer LEO network can double as space-weather and science data infrastructure."',
    noteHead:'Why this matters',noteSub:'Optional data and government contracts open up. Keep separate from core ARR. More satellites can improve observation resolution.',footer:'SPCX · Starlink tomography',brand:BE}},

{ file:'tsla-cybercab-fort-worth', symbol:'TSLA', layout:'tpl', seed:'seed-1106',
  category:'종목분석', categoryColor:'mint', subject:'테슬라', tickers:['TSLA'],
  title:'포트워스에 사이버캡 로보택시 함대가 준비됐다는 설명이 나왔습니다',
  summary:'텍사스 포트워스(Fort Worth)에 사이버캡 함대가 준비됐다는 설명이 나왔습니다. 달러스 로보택시 geofence 서쪽 약 32마일 지점으로, 지리 확장 신호로 읽힙니다.',
  titleEn:'A Cybercab robotaxi fleet is described as ready in Fort Worth, TX',
  summaryEn:'Cybercab fleet ready in Fort Worth, about 32 miles west of the Dallas robotaxi geofence.',
  body: body(
    '포트워스는 텍사스 북부 도시로, 달러스 대都会 로보택시 시범 구역(geofence)에서 서쪽으로 약 32마일(약 51km) 떨어져 있습니다. 사이버캡은 운전석 없는 전용 로보택시 차량입니다.\n\n함대가 “ready”라는 것은 차량·충전·원격 지원·맵이 해당 지역에서 운행 가능 상태에 가깝다는 뜻으로 읽을 수 있습니다. 유료 승객 개시·허가 범위는 별도 확인이 필요합니다.\n\n달러스 geofence 확장·연결 또는 새 geofence의 전주곡일 수 있습니다. 로보택시는 지리를 넓힐수록 데이터·유료 마일이 늘지만, 규제·보험·통신 음영도 함께 검증해야 합니다.',
    ['32마일은 달러스와 다른 도시권이지만 같은 DFW 축입니다.','사이버캡 전용차는 모델Y 개조와 원가·센서 배치가 다릅니다.','ready는 상용과 동일하지 않을 수 있습니다.','지리 확대는 유료 마일 옵션을 키웁니다.','경쟁 로보택시·규제 속도와 비교 필요.'],
    '**A: 포트워스 유료 개시·geofence 공식 발표.**\n**B: 차량 대기·내부 테스트만.**\n**C: 일정 지연·규제 보류.**',
    '- 달러스 로보택시 geofence\n- 포트워스 Cybercab ready\n- 9/3 오스틴 행사·세미 9/24',
    '(1) ready 정의 모호\n(2) 허가 미확인\n(3) 사고·회수\n(4) geofence 미연결\n(5) 유료 미개시',
    '(1) TX 당국 허가\n(2) 유료 앱 전환\n(3) fleet size\n(4) geofence map\n(5) 9/3 행사',
    '지리 확장은 로보택시 실물 진전입니다. ready를 paid miles로 연결해 추적하시면 됩니다.'
  ),
  ko:{title:'포트워스에 사이버캡 로보택시 함대가 준비됐다는 설명이 나왔습니다',heroIcon:'🚕',heroBig:'FW',heroSub:'달러스 geofence 서쪽 약 32마일 포트워스에 사이버캡 함대가 준비됐습니다. 전용 로보택시 차량입니다.',
    cards:[{icon:'📍',big:'32 mi',mid:'달러스 서쪽',sub:'Fort Worth'},{icon:'🚕',big:'Cybercab',mid:'전용차',sub:'운전석 없음'},{icon:'🗺️',big:'Geofence',mid:'DFW 확장',sub:'지리 신호'}],
    quote:'"포트워스에 사이버캡 함대가 준비됐다는 설명이 나왔습니다. 포트워스는 달러스 로보택시 구역에서 서쪽 약 32마일 떨어진 도시입니다. ready는 운행 준비 상태이지, 유료 개시를 뜻하지 않을 수 있습니다."',
    noteHead:'왜 중요한가',noteSub:'DFW 축에서 지리가 넓어집니다. 허가·유료 전환을 다음 확인 포인트로 두세요.',footer:'TSLA · Cybercab Fort Worth',brand:BK},
  en:{title:'Cybercab fleet ready in Fort Worth, TX',heroIcon:'🚕',heroBig:'FW',heroSub:'Fort Worth sits about 32 miles west of the Dallas robotaxi geofence. A Cybercab fleet is described as ready.',
    cards:[{icon:'📍',big:'32 mi',mid:'West of Dallas',sub:'Fort Worth'},{icon:'🚕',big:'Cybercab',mid:'Dedicated',sub:'No wheel'},{icon:'🗺️',big:'Geofence',mid:'DFW axis',sub:'Expansion'}],
    quote:'"A Cybercab fleet is described as ready in Fort Worth, about 32 miles west of the Dallas robotaxi geofence. Ready means prepared to run, not necessarily paid service yet."',
    noteHead:'Why this matters',noteSub:'Geography widens on the DFW axis. Next checks: permits and paid conversion.',footer:'TSLA · Cybercab Fort Worth',brand:BE}},

{ file:'tsla-semi-rollout-sept24', symbol:'TSLA', layout:'tplDday', seed:'seed-1107',
  category:'종목분석', categoryColor:'mint', subject:'테슬라', tickers:['TSLA'],
  title:'테슬라 세미 롤아웃 행사가 2026년 9월 24일 네바다 스파크스에서 열립니다',
  summary:'테슬라 세미(Tesla Semi) 롤아웃 이벤트가 2026년 9월 24일 네바다 스파크스 공장에서 열린다고 알려졌습니다. 대형 전기 트럭 상용 일정의 캘린더 앵커입니다.',
  titleEn:'Tesla Semi Rollout event is set for September 24, 2026 in Sparks, Nevada',
  summaryEn:'The Tesla Semi Rollout event is September 24, 2026 at the Sparks, Nevada factory.',
  body: body(
    '테슬라 세미는 Class 8 대형 전기 트럭입니다. 롤아웃(rollout) 행사는 양산·고객 인도·스펙 공개를 묶는 이벤트로 읽힙니다. 일정은 2026년 9월 24일, 장소는 네바다 스파크스(Sparks) 공장입니다.\n\n세미는 펩시·월마트 등 대형 물류 수요와 연결됩니다. 배터리·충전·총소유비(TCO)가 판매 관건입니다. 행사에서 생산 목표·예약·충전 네트워크가 나올 수 있습니다.\n\n사이버캡 9/3, 세미 9/24로 9월에 두 개의 하드웨어 이벤트가 붙습니다. 일정 연기 시 캘린더 신뢰 비용이 생깁니다.',
    ['9/24는 분기 말 촉매입니다.','스파크스는 세미 생산 거점입니다.','대형 트럭 TCO·충전이 상용 관건입니다.','사이버캡과 같은 달 이중 이벤트.','예약→인도 전환율이 실적 관건.'],
    '**A: 행사에서 생산·고객 코멘트.**\n**B: 제한적 데모.**\n**C: 일정 연기.**',
    '- 세미 예약·파일럿\n- 9/24 Sparks Rollout 발표\n- Cybercab 9/3',
    '(1) 행사만 있고 인도 미미\n(2) TCO 불리\n(3) 충전 infra\n(4) 경쟁 전기·디젤\n(5) 일정 slip',
    '(1) 행사 스펙·가격\n(2) 생산 run-rate\n(3) 고객 인도\n(4) 메가차arger\n(5) 4680·배터리',
    '세미는 로보택시와 다른 축이지만 같은 9월 캘린더입니다. 행사 코멘트와 인도 숫자를 추적하시면 됩니다.'
  ),
  ko:{title:'테슬라 세미 롤아웃 행사가 2026년 9월 24일 네바다 스파크스에서 열립니다',heroBig:'9/24',ddayLabel:'SEMI ROLLOUT · SPARKS NV',
    heroSub:'2026년 9월 24일 네바다 스파크스 공장에서 Tesla Semi 롤아웃 이벤트가 열립니다. Class 8 전기 트럭 상용 일정의 앵커입니다.',
    cards:[{icon:'🚛',big:'Semi',mid:'Class 8',sub:'전기 트럭'},{icon:'🏭',big:'Sparks',mid:'Nevada',sub:'공장'},{icon:'📅',big:'9/24',mid:'2026',sub:'Rollout'}],
    quote:'"Tesla Semi Rollout 이벤트가 2026년 9월 24일 스파크스 네바다에서 열립니다. Semi는 대형 전기 트럭이며, rollout은 양산·인도 일정을 알리는 행사입니다."',
    noteHead:'왜 중요한가',noteSub:'9월에 Cybercab(9/3)과 Semi(9/24) 촉매가 겹칩니다. 행사에서 생산·TCO·충전 코멘트를 보세요.',footer:'TSLA · Semi 9/24',brand:BK},
  en:{title:'Tesla Semi Rollout is September 24, 2026 in Sparks, Nevada',heroBig:'9/24',ddayLabel:'SEMI ROLLOUT · SPARKS NV',
    heroSub:'The Tesla Semi Rollout event is September 24, 2026 at the Sparks, Nevada factory. It anchors the Class 8 electric truck timeline.',
    cards:[{icon:'🚛',big:'Semi',mid:'Class 8',sub:'Electric truck'},{icon:'🏭',big:'Sparks',mid:'Nevada',sub:'Factory'},{icon:'📅',big:'9/24',mid:'2026',sub:'Rollout'}],
    quote:'"The Tesla Semi Rollout event is set for September 24, 2026 in Sparks, Nevada. Semi is the Class 8 electric truck; rollout signals production and delivery timing."',
    noteHead:'Why this matters',noteSub:'September stacks Cybercab (9/3) and Semi (9/24). Watch production, TCO, and charging comments.',footer:'TSLA · Semi 9/24',brand:BE}},

{ file:'avgo-nvda-cds-record', symbol:'AVGO', layout:'tplCompare', seed:'seed-1108',
  category:'종목분석', categoryColor:'blue', subject:'브로드컴', tickers:['AVGO','NVDA'],
  title:'AVGO·NVDA CDS가 2026년 8월 차트 기준 사상 최고 구간에 있습니다',
  summary:'CDS(신용부도스와프) 스프레드가 AVGO 126.225bp, NVDA 86.735bp로 2026년 8월 차트에서 사상 최고(wide) 구간에 있습니다. 반도체·AI 이름의 신용 프리미엄 상승 신호로 읽힙니다.',
  titleEn:'AVGO and NVDA CDS hit all-time wides on August 2026 charts',
  summaryEn:'CDS spreads: AVGO 126.225 and NVDA 86.735, all-time wides on August 2026 charts.',
  body: body(
    'CDS(신용부도스와프)는 특정 회사 채권의 부도 위험을 보험하는 파생상품 가격입니다. 스프레드가 넓어(wide)진다는 것은 시장이 신용 리스크 프리미엄을 더 요구한다는 뜻입니다. bp는 basis point(0.01%p)입니다.\n\n2026년 8월 차트에서 AVGO(브로드컴) 126.225bp, NVDA(엔비디아) 86.735bp가 사상 최고 구간으로 표시됩니다. AI·반도체 CAPEX 사이클, 밸류에이션, 금리, 공급망·규제가 배경에 있을 수 있습니다.\n\n주가와 CDS는 항상 같은 방향은 아닙니다. CDS 급확대는 헤지 수요·기관 리스크 관리 신호일 수 있습니다. 실적·가이던스가 신용을 안정시키는지 봐야 합니다.',
    ['사상 최고 CDS는 낙관과 별도 신용 경계입니다.','AVGO는 커스텀 실리콘·M&A 레버가 큽니다.','NVDA는 AI CAPEX 허브입니다.','금리·macro와 함께 읽힙니다.','단기 spike vs 지속 추세 구분 필요.'],
    '**A: 실적 beat로 CDS 축소.**\n**B: macro shock로 further widening.**\n**C: 헤지 일시 수요.**',
    '- AI CAPEX·밸류 논쟁\n- 8월 CDS chart wides\n- Treasury·Fed 국채 이야기',
    '(1) CDS≠주가\n(2) 유동성 thin\n(3) 일시 헤지\n(4) 실적 개선\n(5) index inclusion',
    '(1) weekly CDS\n(2) earnings\n(3) bond spread\n(4) buyback\n(5) macro',
    'CDS는 보조 지표입니다. AI 낙관과 신용 헤지가 동시에 존재할 수 있습니다. 실적과 bond market을 함께 보세요.'
  ),
  ko:{title:'AVGO·NVDA CDS가 2026년 8월 차트 기준 사상 최고 구간에 있습니다',heroBig:'CDS',heroSub:'8월 차트: AVGO 126.225bp, NVDA 86.735bp. CDS는 부도 위험 프리미엄입니다.',
    beforeLabel:'이전 구간',beforeBig:'좁음',beforeSub:'낮은 프리미엄',afterLabel:'2026년 8월',afterBig:'ATH wide',afterSub:'AVGO·NVDA',
    cards:[{icon:'📈',big:'126.2',mid:'AVGO bp',sub:'사상 최고'},{icon:'📈',big:'86.7',mid:'NVDA bp',sub:'사상 최고'},{icon:'⚠️',big:'신용',mid:'헤지 수요',sub:'macro'}],
    quote:'"AVGO CDS 126.225bp, NVDA 86.735bp가 8월 차트에서 사상 최고입니다. CDS spread가 넓어지면 시장이 더 높은 신용 프리미엄을 요구합니다. AI 낙관과 별도로 채권·헤지 시장의 경계 신호일 수 있습니다."',
    noteHead:'왜 중요한가',noteSub:'주가와 CDS는 decouple될 수 있습니다. 실적·가이던스가 신용을 안정시키는지 추적하세요.',footer:'AVGO·NVDA · CDS record',brand:BK},
  en:{title:'AVGO and NVDA CDS at all-time wides in August 2026',heroBig:'CDS',heroSub:'August chart: AVGO 126.225bp, NVDA 86.735bp. CDS prices default-risk premium.',
    beforeLabel:'Prior',beforeBig:'Tighter',beforeSub:'Lower premium',afterLabel:'Aug 2026',afterBig:'ATH wide',afterSub:'AVGO·NVDA',
    cards:[{icon:'📈',big:'126.2',mid:'AVGO bp',sub:'Record'},{icon:'📈',big:'86.7',mid:'NVDA bp',sub:'Record'},{icon:'⚠️',big:'Credit',mid:'Hedge demand',sub:'Macro'}],
    quote:'"AVGO CDS 126.225bp and NVDA 86.735bp are at all-time wides on August charts. Wider CDS means higher credit premium demanded. It can be a hedge signal separate from AI optimism."',
    noteHead:'Why this matters',noteSub:'Equities and CDS can diverge. Track whether earnings stabilize credit.',footer:'AVGO·NVDA · CDS record',brand:BE}},

{ file:'macro-treasury-bond-intervention', symbol:'MACRO', layout:'tplQuote', seed:'seed-1109',
  category:'매크로', categoryColor:'red', subject:'금리', tickers:['MACRO'],
  title:'미국 재무부가 국채 시장 개입·환매 narrative가 다시 부각됐습니다',
  summary:'재무부 장관 베센트가 40억 달러 이상 buyback, 9,500억 달러 general account 등 국채·유동성 narrative와 맞물려 시장이 장기금리·수급을 재평가하고 있습니다.',
  titleEn:'Treasury bond intervention narrative is back in focus',
  summaryEn:'Bessent buybacks $4B+, $950B general account frame ties to Treasury supply and liquidity.',
  body: body(
    '국채 buyback(환매)은 재무부가 시장에서 자국 국채를 다시 사들여 유동성·수익률 곡선을 관리하는 도구입니다. general account(TGA)는 재무부가 연준에 예치한 현금 계정으로, 잔고가 크면 시장 유동성을 흡수할 수 있습니다.\n\n이번 narrative는 베센트 장관과 40억 달러 이상 buyback, 9,500억 달러 general account 규모가 함께 거론됩니다. 장기금리 급등 구간에서 “개입” 기대가 생기면 금리·성장주·은행주가 동시에 움직일 수 있습니다.\n\n실제 개입 규모·지속성·Fed QT와의 상호작용을 구분해야 합니다. 헤드라인만으로 지속적 금리 하락을 가정하면 위험합니다.',
    ['장기금리·30Y·10Y와 직결됩니다.','buyback는 supply 흡수 도구입니다.','TGA·유동성 narrative는 risk asset과 연결됩니다.','Fed 10–15Y 보유와 같은 주 macro 축.','정치·예산·부채한도가 배경.'],
    '**A: buyback 확대→금리 완화.**\n**B: rhetoric만, 실제 규모 제한.**\n**C: inflation 재가열→금리 재상승.**',
    '- 30Y·10Y 급등\n- Treasury buyback narrative\n- Fed 국채 보유 chart',
    '(1) 개입 규모 과대\n(2) inflation\n(3) Fed independence\n(4) supply wall\n(5) dollar',
    '(1) weekly buyback\n(2) TGA balance\n(3) 10Y·30Y\n(4) auction\n(5) CPI',
    'macro 덮개입니다. buyback 실제 집행과 TGA를 숫자로 추적하세요.'
  ),
  ko:{title:'미국 재무부가 국채 시장 개입·환매 narrative가 다시 부각됐습니다',heroBig:'BUYBACK',heroSub:'40억 달러+ buyback, 9,500억 달러 general account narrative. 국채 수급·유동성 기대가 금리에 영향을 줍니다.',
    cards:[{icon:'🏦',big:'$4B+',mid:'Buyback',sub:'환매 narrative'},{icon:'💵',big:'$950B',mid:'TGA',sub:'General account'}],
    quote:'"재무부 국채 buyback narrative가 부각됐습니다. buyback는 재무부가 시장에서 국채를 사들이는 도구입니다. general account는 재무부 예치금으로, 유동성과 맞물립니다. rhetoric과 실제 집행 규모는 다를 수 있습니다."',
    noteHead:'왜 중요한가',noteSub:'장기금리·성장주 할인율과 한 묶음입니다. 실제 buyback·TGA 잔고를 확인하세요.',footer:'MACRO · Treasury intervention',brand:BK},
  en:{title:'Treasury bond intervention narrative is back',heroBig:'BUYBACK',heroSub:'$4B+ buyback and $950B general account narrative affects yields and liquidity.',
    cards:[{icon:'🏦',big:'$4B+',mid:'Buyback',sub:'Intervention'},{icon:'💵',big:'$950B',mid:'TGA',sub:'Cash account'}],
    quote:'"Treasury buyback narrative is in focus. Buybacks repurchase bonds from the market. The general account ties to liquidity. Rhetoric can exceed actual size."',
    noteHead:'Why this matters',noteSub:'Long yields and growth-stock discount rates move together. Verify actual buybacks and TGA.',footer:'MACRO · Treasury intervention',brand:BE}},

{ file:'macro-fed-treasuries-half-10-15', symbol:'MACRO', layout:'tpl', seed:'seed-1110',
  category:'매크로', categoryColor:'red', subject:'금리', tickers:['MACRO'],
  title:'연준이 10~15년물 국채의 50% 이상을 보유하고 있다는 차트가 나왔습니다',
  summary:'연준(Fed)이 10~15년 만기 국채 1,028억 달러 중 540억 달러 이상, 50% 넘게 보유한다는 차트가 나왔습니다. QT·금리·수급 논쟁의 핵심 그림입니다.',
  titleEn:'The Fed owns over 50% of 10–15 year Treasuries, a chart shows',
  summaryEn:'Fed holds over $540B of $1,028B in 10–15Y Treasuries, above 50%.',
  body: body(
    '연준은 QE(양적완화) 기간에 국채를 대량 매입했고, QT(양적긴축)로 일부를 줄이고 있습니다. 10~15년물은 중기 장기금리·모기지·기업 차입금과 연결된 구간입니다.\n\n차트는 전체 1,028억 달러 중 연준 보유 540억 달러 이상, 50% 초과를 보여줍니다. 연준이 특정 maturity bucket을 많이 쥐면, QT 속도·재투자·Maturity runoff가 그 구간 수익률에 더 민감해질 수 있습니다.\n\n재무부 buyback narrative·30Y 금리·CDS와 같은 주 macro 화면에 두면, “누가 국채를 받느냐”가 자산 가격 할인율의 공통 변수입니다.',
    ['50%+ 보유는 해당 maturity 수급 집중을 뜻합니다.','QT·roll-off가 10–15Y에 민감할 수 있습니다.','재무부·Fed·시장삼자 수급 균형.','금리 peak·cut path와 연결.','차트 시점·정의 확인 필요.'],
    '**A: QT slow→10–15Y 완화.**\n**B: supply wall→yield up.**\n**C: Fed pivot rhetoric only.**',
    '- QE legacy·QT\n- 10–15Y Fed share chart\n- Treasury buyback same week',
    '(1) bucket 정의\n(2) QT pace change\n(3) fiscal supply\n(4) inflation\n(5) foreign demand',
    '(1) Fed SOMA\n(2) QT minutes\n(3) 10Y auction\n(4) term premium\n(5) bank demand',
    'Fed balance sheet는 macro anchor입니다. 10–15Y bucket과 QT를 함께 추적하세요.'
  ),
  ko:{title:'연준이 10~15년물 국채의 50% 이상을 보유하고 있다는 차트가 나왔습니다',heroIcon:'📊',heroBig:'50%+',heroSub:'10~15년물 1,028억 달러 중 540억 달러 이상을 Fed가 보유합니다. QT·금리·수급에 민감한 구간입니다.',
    cards:[{icon:'🏦',big:'$540B+',mid:'Fed 보유',sub:'10–15Y'},{icon:'📈',big:'$1,028B',mid:'전체',sub:'bucket'},{icon:'📉',big:'QT',mid:'roll-off',sub:'수급'}],
    quote:'"연준이 10~15년물 국채 1,028억 달러 중 540억 달러 이상, 50% 넘게 보유한다는 차트가 나왔습니다. 특정 만기 구간에 보유가 몰리면 QT·재투자가 그 구간 금리에 더 큰 영향을 줄 수 있습니다."',
    noteHead:'왜 중요한가',noteSub:'재무부 buyback·30Y·CDS와 같은 macro bundle입니다. SOMA·QT pace를 확인하세요.',footer:'MACRO · Fed 10–15Y',brand:BK},
  en:{title:'Fed owns over 50% of 10–15 year Treasuries',heroIcon:'📊',heroBig:'50%+',heroSub:'Fed holds over $540B of $1,028B in 10–15Y Treasuries. QT and supply matter here.',
    cards:[{icon:'🏦',big:'$540B+',mid:'Fed holds',sub:'10–15Y'},{icon:'📈',big:'$1,028B',mid:'Total',sub:'Bucket'},{icon:'📉',big:'QT',mid:'Roll-off',sub:'Supply'}],
    quote:'"A chart shows the Fed holding over $540B of $1,028B in 10–15 year Treasuries, above 50%. Concentrated holdings make QT and reinvestment more sensitive for that part of the curve."',
    noteHead:'Why this matters',noteSub:'Part of the same macro bundle as Treasury buybacks and CDS. Watch SOMA and QT pace.',footer:'MACRO · Fed 10–15Y',brand:BE}},

{ file:'anthropic-30t-ipo', symbol:'AI', layout:'tplBreaking', seed:'seed-1111',
  category:'매크로', categoryColor:'purple', subject:'AI', tickers:['MACRO'],
  title:'Anthropic TAM 30조 달러·2분기 매출 116억·IPO 최대 2조 밸류 전망이 나왔습니다',
  summary:'TAM 30조 달러 이상, 2분기 매출 116억 달러, 9~10월 IPO로 최대 1,000억 달러 조달·약 2조 달러 밸류 전망이 나왔습니다. AI 상장·밸류에이션 anchor입니다.',
  titleEn:'Anthropic $30T+ TAM, $11.6B Q2 revenue, IPO up to $2T valuation',
  summaryEn:'$30T+ TAM, Q2 revenue $11.6B, Sept/Oct IPO raising up to $100B at ~$2T valuation.',
  body: body(
    'TAM(total addressable market)은 회사가 겨냥하는 전체 시장 규모 추정치입니다. 30조 달러+ TAM은 AI·엔터프라이즈 소프트웨어 전체를 넓게 잡은 숫자로 읽힙니다. 2분기 매출 116억 달러는 ARR run-rate가 아니라 분기 매출입니다.\n\nIPO는 9~10월, 조달 규모 최대 1,000억 달러, 밸류에이션 약 2조 달러 전망이 함께 거론됩니다. 역대급 규모라 S-1·SEC 일정·시장 risk appetite가 관건입니다. Amazon·Google 등 기존 투자자 지분·lockup도 변수입니다.\n\n상장은 AI private→public 재평가 이벤트입니다. OpenAI·Meta·MSFT 밸류와 연결되지만, 실제 S-1 숫자로 검증해야 합니다.',
    ['2T 밸류는 AI bubble 논쟁의 anchor.','116억 Q2는 성장 속도 확인 필요.','100B raise는 유동성·index demand 필요.','9~10월은 macro·금리와 겹칩니다.','private mark vs public price gap.'],
    '**A: S-1→oversubscribed IPO.**\n**B: delay·down-round.**\n**C: macro shock blocks window.**',
    '- Anthropic revenue·S-1 rumor\n- Sept/Oct IPO window\n- Mag7 AI spend',
    '(1) TAM 과장\n(2) loss·burn\n(3) delay\n(4) regulation\n(5) competition',
    '(1) S-1 filing\n(2) revenue growth\n(3) raise size\n(4) lockup\n(5) first-day trade',
    'IPO는 catalyst이지 확정이 아닙니다. S-1 전까지 private mark discount를 두세요.'
  ),
  ko:{title:'Anthropic TAM 30조 달러·2분기 매출 116억·IPO 최대 2조 밸류 전망이 나왔습니다',heroBig:'$2T',heroSub:'TAM 30조+, Q2 매출 116억, 9~10월 IPO 최대 1,000억 조달·약 2조 밸류. AI 상장 anchor입니다.',
    cards:[{icon:'🌍',big:'$30T+',mid:'TAM',sub:'시장 규모'},{icon:'💰',big:'$11.6B',mid:'Q2 매출',sub:'분기'},{icon:'📅',big:'Sep/Oct',mid:'IPO',sub:'~$100B raise'}],
    quote:'"TAM 30조 달러+, 2분기 매출 116억, 9~10월 IPO로 최대 1,000억 조달·약 2조 밸류 전망입니다. TAM은 전체 시장 추정, Q2 매출은 분기 실적입니다. S-1 전까지는 rumor와 plan으로 구분하세요."',
    noteSub:'AI public re-rating 이벤트입니다. S-1·burn·lockup을 확인하세요.',footer:'AI · Anthropic IPO',brand:BK},
  en:{title:'Anthropic $30T+ TAM, $11.6B Q2, IPO up to $2T',heroBig:'$2T',heroSub:'$30T+ TAM, $11.6B Q2 revenue, Sept/Oct IPO up to $100B raise at ~$2T valuation.',
    cards:[{icon:'🌍',big:'$30T+',mid:'TAM',sub:'Market size'},{icon:'💰',big:'$11.6B',mid:'Q2 rev',sub:'Quarter'},{icon:'📅',big:'Sep/Oct',mid:'IPO',sub:'~$100B raise'}],
    quote:'"$30T+ TAM, $11.6B Q2 revenue, Sept/Oct IPO raising up to $100B at roughly $2T valuation. Treat as plan until S-1."',
    noteSub:'AI public re-rating event. Verify S-1, burn, and lockups.',footer:'AI · Anthropic IPO',brand:BE}},

{ file:'googl-gemini-enterprise-finance', symbol:'GOOGL', layout:'tpl', seed:'seed-1112',
  category:'종목분석', categoryColor:'blue', subject:'구글', tickers:['GOOGL'],
  title:'Gemini Enterprise for Legal/Financial Services가 출시됐고 MSCI·무디스·FactSet 등이 파트너입니다',
  summary:'Gemini Enterprise for Legal and Financial Services가 출시됐고, MSCI·Moody\'s·FactSet 등이 런치 파트너로 적혀 있습니다. 금융·법무 워크플로에 AI를 넣는 B2B 축입니다.',
  titleEn:'Gemini Enterprise for Legal/Financial Services launches with MSCI, Moody\'s, FactSet',
  summaryEn:'Gemini Enterprise for Legal/Financial Services launched with partners including MSCI, Moody\'s, and FactSet.',
  body: body(
    'Gemini Enterprise는 구글이 기업용으로 제공하는 AI 제품군입니다. Legal/Financial Services 버전은 법무·금융 규제·리서치·데이터 워크플로에 맞춘 패키지입니다.\n\nMSCI(지수·ESG 데이터), Moody\'s(신용·리스크), FactSet(금융 데이터·분석) 등이 launch partner로 적혀 있습니다. 파트너 데이터·도구와 LLM을 묶으면 금융기관·자산운용·법무팀의 채택 장벽을 낮출 수 있습니다.\n\n매출 기여 시점·좌석 가격·경쟁(OpenAI·MSFT Copilot·Anthropic)은 아직 숫자로 확인해야 합니다. 클라우드·Workspace와 cross-sell 가능성이 큽니다.',
    ['금융 B2B는 ARPU가 높습니다.','MSCI·Moody\'s·FactSet는 신뢰·데이터 moat.','규제·감사·hallucination 리스크 관리가 관건.','GOOGL vs MSFT enterprise AI 경쟁.','출시≠대규모 계약.'],
    '**A: 대형 bank·AM pilot→좌석 확대.**\n**B: slow compliance sales.**\n**C: 경쟁사 win.**',
    '- Gemini enterprise roadmap\n- Legal/Financial launch\n- Mag7 AI spend',
    '(1) pilot only\n(2) compliance delay\n(3) data privacy\n(4) pricing\n(5) MSFT lock-in',
    '(1) customer logos\n(2) seat pricing\n(3) cloud attach\n(4) partner rev share\n(5) earnings comment',
    'Enterprise finance vertical은 TAM 확장입니다. 계약·좌석 숫자가 나올 때까지 narrative discount를 유지하세요.'
  ),
  ko:{title:'Gemini Enterprise for Legal/Financial Services가 출시됐고 MSCI·무디스·FactSet 등이 파트너입니다',heroIcon:'💼',heroBig:'Enterprise',heroSub:'법무·금융용 Gemini Enterprise가 출시됐고 MSCI·Moody\'s·FactSet 등이 파트너입니다. B2B AI 워크플로 확장입니다.',
    cards:[{icon:'⚖️',big:'Legal',mid:'법무',sub:'워크플로'},{icon:'🏦',big:'Finance',mid:'금융',sub:'리스크·데이터'},{icon:'🤝',big:'MSCI',mid:'Moody\'s',sub:'FactSet'}],
    quote:'"Gemini Enterprise for Legal and Financial Services가 출시됐습니다. MSCI·Moody\'s·FactSet 등 데이터·신용 파트너와 LLM을 묶어 금융·법무 팀 채택을 노립니다. 출시와 대규모 매출은 단계가 다릅니다."',
    noteHead:'왜 중요한가',noteSub:'고 ARPU B2B vertical입니다. pilot→계약 숫자를 추적하세요.',footer:'GOOGL · Gemini Enterprise',brand:BK},
  en:{title:'Gemini Enterprise for Legal/Financial Services launches with major partners',heroIcon:'💼',heroBig:'Enterprise',heroSub:'Gemini Enterprise for Legal and Financial Services launched with MSCI, Moody\'s, FactSet and others.',
    cards:[{icon:'⚖️',big:'Legal',mid:'Workflow',sub:'Enterprise'},{icon:'🏦',big:'Finance',mid:'Risk·data',sub:'B2B'},{icon:'🤝',big:'MSCI',mid:'Moody\'s',sub:'FactSet'}],
    quote:'"Gemini Enterprise for Legal and Financial Services launched with partners including MSCI, Moody\'s, and FactSet. Launch and large revenue are different stages."',
    noteHead:'Why this matters',noteSub:'High-ARPU B2B vertical. Track pilots to signed seats.',footer:'GOOGL · Gemini Enterprise',brand:BE}},

{ file:'nvda-chip-smuggling-china', symbol:'NVDA', layout:'tplQuote', seed:'seed-1113',
  category:'종목분석', categoryColor:'blue', subject:'엔비디아', tickers:['NVDA'],
  title:'엔비디아 직원이 고급 칩을 중국으로 밀반출한 혐의로 기소됐다는 보도가 나왔습니다',
  summary:'엔비디아 직원이 고급 AI 칩을 중국으로 밀반출한 혐의로 기소됐다는 보도가 나왔습니다. 수출 통제·컴플라이언스·중국 수요 우회 리스크 이슈입니다.',
  titleEn:'An Nvidia employee was charged with smuggling advanced chips to China, reports say',
  summaryEn:'Reports say an Nvidia employee was charged with smuggling advanced chips to China.',
  body: body(
    '미국은 고성능 AI/GPU 칩의 중국 수출에 통제를 두고 있습니다. 밀반출(smuggling)은 허가 없이 칩을 중국 등 제한 지역으로 옮기는 행위입니다.\n\n보도는 엔비디아 직원이 고급 칩 밀반출 혐의로 기소됐다는 내용입니다. 개인 범죄 사건이지만, 회사 컴플라이언스·내부 통제·규제 당국 scrutiny·중국 grey market 수요 narrative와 연결됩니다.\n\n전체 매출에 직접 hit는 아닐 수 있으나, 수출 통제 강화·추가 audit·평판 리스크로 읽힐 수 있습니다. 중국 legitimate sales vs 우회 수요를 구분해야 합니다.',
    ['수출 통제는 NVDA 중국 narrative의 핵심.','직원 1건≠회사 정책 실패로 단정 금지.','grey market는 real demand signal.','규제 강화 tail risk.','경쟁사·대체 chip 우회.'],
    '**A: isolated case, limited impact.**\n**B: tighter export audit.**\n**C: political escalation.**',
    '- US export controls\n- smuggling charge report\n- China AI demand',
    '(1) one employee\n(2) immaterial revenue\n(3) headline risk\n(4) policy tightening\n(5) denial',
    '(1) court filing\n(2) NVDA statement\n(3) DoC rules\n(4) China revenue\n(5) compliance spend',
    '컴플라이언스 headline입니다. 매출 비중과 회사 statement를 확인하세요. 통제 강화가 tail risk입니다.'
  ),
  ko:{title:'엔비디아 직원이 고급 칩을 중국으로 밀반출한 혐의로 기소됐다는 보도가 나왔습니다',heroBig:'EXPORT',heroSub:'고급 AI 칩 중국 밀반출 혐의 기소. 수출 통제·컴플라이언스·grey market 이슈입니다.',
    cards:[{icon:'🚫',big:'통제',mid:'Export rules',sub:'고급 GPU'},{icon:'⚖️',big:'기소',mid:'직원 1건',sub:'개별 사건'}],
    quote:'"엔비디아 직원이 고급 칩을 중국으로 밀반출한 혐의로 기소됐다는 보도가 나왔습니다. 미국은 AI 칩 중국 수출을 제한합니다. 개인 사건이지만 컴플라이언스·규제 scrutiny narrative와 연결됩니다."',
    noteHead:'왜 중요한가',noteSub:'중국 수요·통제 강화 tail risk입니다. 회사 statement와 매출 비중을 확인하세요.',footer:'NVDA · chip smuggling',brand:BK},
  en:{title:'Nvidia employee charged with smuggling advanced chips to China',heroBig:'EXPORT',heroSub:'Advanced AI chip smuggling charge. Export controls and compliance risk.',
    cards:[{icon:'🚫',big:'Controls',mid:'Export rules',sub:'Advanced GPU'},{icon:'⚖️',big:'Charge',mid:'One employee',sub:'Individual case'}],
    quote:'"Reports say an Nvidia employee was charged with smuggling advanced chips to China. The US restricts AI chip exports. An individual case, but it ties to compliance and scrutiny."',
    noteHead:'Why this matters',noteSub:'China demand and tighter controls are tail risks. Check company statement and revenue mix.',footer:'NVDA · chip smuggling',brand:BE}},
];

function buildSeedSummary() {
  return `  // ── 2026-08-26 신규 ──────────────────────────────────────────────────────
  { id: "seed-1101", title: '2026년 8월 26일 한장 요약입니다. 그록 3 LPX 양산, 루이지애나 1,000억 우주항, 사이버캡 포트워스, CDS·국채·Anthropic IPO를 모았습니다', summary: '그록 3 LPX가 베라 루빈에서 풀 프로덕션에 들어갔고, 루이지애나 스타베이스는 1,000억 달러+·테라베이 스펙이 공개됐습니다. 테슬라는 FSD scale 주장·포트워스 사이버캡·9/24 세미 행사, AVGO·NVDA CDS 사상 최고, 재무부 buyback·Fed 10–15Y 50%+, Anthropic IPO·Gemini Enterprise·칩 밀반출 기소도 같이 보시기 바랍니다.',
    body: "",
    titleEn: 'Daily snapshot for August 26, 2026: Groq 3 LPX, Louisiana $100B+, Cybercab Fort Worth, CDS, Treasuries, Anthropic IPO',
    summaryEn: 'Groq 3 LPX is in full production; Louisiana Starbase tops $100B. Tesla FSD scale claim, Cybercab in Fort Worth, Semi 9/24. AVGO/NVDA CDS at records, Treasury/Fed charts, Anthropic IPO, Gemini Enterprise, chip smuggling charge.',
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
    bodyEn: '${BODY_EN}',
    category: '${t.category}', categoryColor: '${t.categoryColor}', subject: '${t.subject}',
    date: "${DATE_ISO}", updatedAt: "${UPDATED_AT}",
    images: ["${img}"],
    imagesEn: ["${imgEn}"],
  }`;
}

function buildTickersBlock() {
  const summaryTickers = "['NVDA', 'TSLA', 'SPCX', 'AVGO', 'GOOGL', 'MACRO']";
  const lines = [`  // 2026-08-26`, `  "seed-1101": ${summaryTickers},`];
  for (const t of TOPICS) {
    lines.push(`  "${t.seed}": [${t.tickers.map(x => `'${x}'`).join(', ')}],`);
  }
  return lines.join('\n');
}

function buildWallPosts() {
  const posts = [
    ['NVDA', '그록 3 LPX 풀 프로덕션이래. 베라 루빈에서 네비우스가 첫 고객'],
    ['TSLA', '테슬라만 대규모 자율주행 한다는데… 웨이모는 뭐라고 하지'],
    ['SPCX', '루이지애나 1000억+ 우주항 30척/일 17패드 2027 착공??'],
    ['SPCX', '교토대가 스타링크 1200기로 대기권 단층촬영했다네 tomography'],
    ['TSLA', '포트워스에 사이버캡 대기중. 달러스에서 서쪽 32마일'],
    ['TSLA', '세미 롤아웃 9월 24일 스파크스. 사이버캡 9/3이랑 같은 달'],
    ['AVGO', 'CDS 126bp NVDA 87bp 사상 최고래. 신용 시장도 AI 걱정?'],
    ['MACRO', '재무부 buyback 40억+ TGA 9500억 narrative 또 도네'],
    ['MACRO', '연준 10~15년물 절반 넘게 보유? QT랑 같이 봐야지'],
    ['MACRO', 'Anthropic IPO 2조 밸류 1000억 조달? 미쳤다 진짜'],
    ['GOOGL', 'Gemini Enterprise 금융·법무 버전 MSCI Moodys FactSet'],
    ['NVDA', '엔비디아 직원이 칩 중국 밀수 혐의로 기소? 통제 이슈'],
  ];
  let out = '  // ── 2026-08-26 신규 ────────────────\n';
  posts.forEach((p, i) => {
    const id = 1091 + i;
    const nick = `익명_${2300 + i}`;
    out += `  { id: ${id}, symbol: "${p[0]}", nickname: "${nick}", holdingLabel: "관심종목",\n    content: "${p[1]}",\n    createdAt: T26AU + ${(i + 1) * 8}*60_000, likes: ${10 + (i % 7)}, comments: ${i % 3 === 0 ? 2 : 1} },\n`;
  });
  return out;
}

function buildWallComments() {
  const comments = [
    [1091, ['LPX가 추론 칩이면 API 수요랑 직결', '네비우스 하나만으론 부족']],
    [1092, ['정의가 애매함 무인 유료 마일로 봐야지', '웨이모 베가스는?']],
    [1093, ['1000억이면 허가부터… 2027 착공이 현실?']],
    [1094, ['스타링크가 과학 데이터까지? 부가수익?']],
    [1095, ['ready랑 유료는 다름 허가 봐야', 'DFW geofence 확장 기대']],
    [1096, ['9월에 사이버캡 세미 둘 다네 총알 장전']],
    [1097, ['CDS만 오르고 주가는 버티면 decouple', '실적이 신용 잡아줄듯']],
    [1098, ['말만 하고 실제 buyback 규모가 관건']],
    [1099, ['50%면 QT가 그 구간에 더 민감한 거 아님', '10-15Y 금리']],
    [1100, ['S-1 전까지는 rumor', '2조면 Mag7 AI 리레이팅']],
    [1101, ['출시랑 대형 계약은 다른 단계', 'MSCI 붙은 건 신뢰']],
    [1102, ['직원 1명이면 회사랑 분리해야', '통제 더 세질 수도']],
  ];
  let out = '  // ── 2026-08-26 신규 댓글 ────────────────\n';
  for (const [postId, lines] of comments) {
    out += `  ${postId}: [\n`;
    lines.forEach((c, j) => {
      out += `    { id: ${j + 1}, nickname: "익명_${2400 + postId + j}", holdingLabel: "관심종목", content: "${c}", createdAt: T26AU + ${Math.floor(postId - 1090) * 8}*60_000 + ${(j + 1) * 3}*60_000, likes: ${4 + j} },\n`;
    });
    out += `  ],\n`;
  }
  return out;
}

function buildAnalystPosts() {
  const items = [
    [-891, '성수 너구리 #15', 'NVDA', '그록 3 LPX 풀 프로덕션.\n— 베라 루빈 플랫폼\n— 네비우스 첫 고객\n— 추론 칩 양산\n학습만이 아닌 API·에이전트 축입니다. 추가 고객을 기다리겠습니다.', 2],
    [-892, '한남 재규어 #27', 'TSLA', '왜 scale-only 주장이 민감할까요. 답은 정의입니다. 무인·유료·마일·도시 수로 좁히면 검증 가능합니다. 독점 서사는 프리미엄을 키웁니다.', 2],
    [-893, '압구정 치타 #44', 'SPCX', '루이지애나 100B+·Terabay 3 door·30/day·17 pads·2027.\n숫자가 크므로 허가·자금·flight rate를 함께 보시면 됩니다.', 1],
    [-894, '여의도 수리 #28', 'SPCX', '교토대 Starlink 1,200기 tomography.\n통신 ARR과 과학 데이터 옵션을 분리하세요. 위성 수가 관측 해상도를 키웁니다.', 0],
    [-895, '삼성동 올빼미 #19', 'TSLA', '포트워스 Cybercab ready는 DFW 지리 확장 신호입니다. ready≠paid. TX 허가와 geofence map을 확인하겠습니다.', 1],
    [-896, '광화문 여우 #62', 'TSLA', '9/24 Semi Rollout · Sparks NV.\n9/3 Cybercab과 같은 달 이중 촉매입니다. TCO·충전·인도 숫자가 본경기입니다.', 1],
    [-897, '마포 살쾡이 #08', 'AVGO', '숫자만 정리합니다. AVGO CDS 126.225bp, NVDA 86.735bp, 8월 ATH wide.\n주가와 decouple될 수 있습니다. 실적이 신용을 안정시키는지 보겠습니다.', 2],
    [-898, '판교 늑대 #90', 'MACRO', '재무부 buyback $4B+ narrative와 TGA $950B.\nrhetoric과 집행 규모는 다릅니다. 10–15Y Fed 50%+ chart와 같은 macro bundle입니다.', 2],
    [-899, '분당 매 #31', 'MACRO', 'Fed 10–15Y bucket 50%+ 보유.\nQT roll-off가 그 구간 금리에 민감합니다. SOMA·auction을 추적하시면 됩니다.', 1],
    [-900, '해운대 고래 #03', 'MACRO', 'Anthropic: TAM $30T+, Q2 rev $11.6B, IPO ~$100B raise ~$2T.\nS-1 전까지 plan과 fact를 나누겠습니다.', 2],
    [-901, '송파 독수리 #66', 'GOOGL', 'Gemini Enterprise Legal/Financial.\nMSCI·Moody\'s·FactSet launch partners.\n출시와 대형 계약은 단계가 다릅니다.', 0],
    [-902, '인천 갈매기 #52', 'NVDA', '고급 칩 중국 밀반출 기소 보도.\n개인 사건이지만 export control·compliance scrutiny narrative입니다. 회사 statement를 확인하겠습니다.', 1],
  ];
  const base = '2026-08-26T00:';
  let out = '  // ── 2026-08-26 신규 (12개 · 존댓말 · 구조 혼합) ──────────────────────\n';
  items.forEach(([id, alias, symbol, content, comments], i) => {
    const min = String(i * 7).padStart(2, '0');
    out += `  {\n    id: ${id}, alias: "${alias}", symbol: "${symbol}",\n    content: "${content.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",\n    likes: ${11 + (i % 5)}, comments: ${comments}, created_at: "${base}${min}:00.000Z", liked: false,\n  },\n`;
  });
  return out;
}

function buildAnalystComments() {
  const pairs = [[-891, ['추론 매출 비중이 실적에 나올까요']], [-892, ['웨이모 유료 도시는 scale에 포함?']], [-893, ['2027 착공 공식 문서']], [-897, ['실적 beat면 CDS 좁혀짐']], [-898, ['buyback weekly 집행']], [-900, ['S-1 delay risk']]];
  let out = '';
  for (const [id, lines] of pairs) {
    out += `  [${id}]: [\n`;
    lines.forEach((c, j) => {
      out += `    { alias: "댓글_260${Math.abs(id)}", content: "${c}", created_at: "2026-08-26T00:${String(10 + j).padStart(2, '0')}:00.000Z" },\n`;
    });
    out += `  ],\n`;
  }
  return out;
}

function buildPairsBlock() {
  const lines = [`  // ── 2026-08-26 ─────────────────────────────────────────────────────────`];
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
    /(\{ id: "seed-1088"[\s\S]*?)isPinned: true/,
    '$1isPinned: false'
  );
  const insert = buildSeedSummary() + ',\n' + TOPICS.map(buildSeedReport).join(',\n') + ',\n';
  c = patch(c, 'export const SEED_REPORTS: Report[] = [\n  // ── 2026-08-25', `export const SEED_REPORTS: Report[] = [\n${insert}  // ── 2026-08-25`, 'SEED_REPORTS insert');
  const tickers = buildTickersBlock() + '\n';
  c = patch(c, 'export const REPORT_TICKERS: Record<string, string[]> = {\n  // 2026-08-25', `export const REPORT_TICKERS: Record<string, string[]> = {\n${tickers}  // 2026-08-25`, 'REPORT_TICKERS insert');
  write('lib/reports.ts', c);
}

function patchWallPosts() {
  let c = read('lib/wallPosts.ts');
  c = patch(c, 'const T25AU = 1787612400000;', 'const T26AU = 1787698800000; // 2026-08-26 08:00 KST\nconst T25AU = 1787612400000;', 'T26AU');
  c = patch(c, 'export const LATEST_UPDATE = T25AU;', 'export const LATEST_UPDATE = T26AU;', 'LATEST_UPDATE');
  c = patch(c, 'export const MOCK_POSTS: Post[] = [\n  // ── 2026-08-25', `export const MOCK_POSTS: Post[] = [\n${buildWallPosts()}`, 'MOCK_POSTS');
  c = patch(c, 'export const MOCK_COMMENTS: Record<number, Comment[]> = {\n  // ── 2026-08-25', `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${buildWallComments()}`, 'MOCK_COMMENTS');
  write('lib/wallPosts.ts', c);
}

function patchAnalystPosts() {
  let c = read('lib/analystPosts.ts');
  c = patch(c, 'export const MOCK_ANALYST_POSTS: AnalystMockPost[] = [\n  // ── 2026-08-25', `export const MOCK_ANALYST_POSTS: AnalystMockPost[] = [\n${buildAnalystPosts()}`, 'MOCK_ANALYST_POSTS');
  c = patch(c, 'export const MOCK_ANALYST_COMMENTS: Record<number, AnalystMockComment[]> = {\n  [-879]:', `export const MOCK_ANALYST_COMMENTS: Record<number, AnalystMockComment[]> = {\n${buildAnalystComments()}  [-879]:`, 'MOCK_ANALYST_COMMENTS');
  write('lib/analystPosts.ts', c);
}

function patchExportPairs() {
  let c = read('scripts/export-report-pngs.js');
  c = patch(c, 'const PAIRS = [\n  // ── 2026-08-25 ─────────────────────────────────────────────────────────', `const PAIRS = [\n${buildPairsBlock()}\n  // ── 2026-08-25 ─────────────────────────────────────────────────────────`, 'PAIRS insert');
  write('scripts/export-report-pngs.js', c);
}

function main() {
  console.log('=== Investus 2026-08-26 report build ===');
  const svgCount = writeSvgs();
  console.log(`✅ ${svgCount} SVG written to public/charts/`);
  patchReports();
  console.log('✅ lib/reports.ts patched (seed-1088 unpinned, seed-1101–1113, tickers)');
  patchWallPosts();
  console.log('✅ lib/wallPosts.ts patched (T26AU, posts 1091–1102, comments)');
  patchAnalystPosts();
  console.log('✅ lib/analystPosts.ts patched (-891 to -902)');
  patchExportPairs();
  console.log('✅ scripts/export-report-pngs.js PAIRS updated');
  console.log('Done.');
}

main();
