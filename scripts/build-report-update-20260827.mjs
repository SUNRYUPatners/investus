#!/usr/bin/env node
// 2026-08-27 Investus daily report update — full build script
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CHARTS = path.join(ROOT, 'public', 'charts');
const DATE = '2026.08.27';
const DATETAG = '20260827';
const DATE_ISO = '2026-08-27';
const UPDATED_AT = '2026.08.27 08:00';
const T27AU = 1787785200000;
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
    { stroke: '#60a5fa', fill: '#0a1420', title: '엔비디아 2분기 매출 961억 달러로 예상을 상회했습니다', body: '주당순이익 2.22달러, 데이터센터 890억 달러, 총마진 75%입니다. 실적은 좋았지만 시간외 -2%로 반응했습니다.', stat: 'NVDA' },
    { stroke: '#a78bfa', fill: '#120b1f', title: '앤트로픽 63%·스페이스X 37%로 2026년 최대 IPO 확률이 나왔습니다', body: '예측시장 기준 앤트로픽이 스페이스X보다 높게 잡혔습니다. AI·우주 상장 서사의 기준점입니다.', stat: 'IPO' },
    { stroke: '#c084fc', fill: '#1a0f2a', title: '스페이스X 시가총액 1조 8,260억 달러·1조 달러 이상 51일째입니다', body: '최초 표기 150달러(-8%), 발행가 135달러(+2%), 사상 최고 226달러, 거래대금 약 70억 달러입니다.', stat: '$1.8T' },
    { stroke: '#c084fc', fill: '#1a0f2a', title: '루이지애나 스타베이스는 발사대 12개 이상·하루 30척 이상을 목표합니다', body: '스타십 4대는 연간 200만 톤 이상 궤도 투입을 겨냥합니다. 발사 cadence가 위성·화물 비용의 상류입니다.', stat: 'SPCX' },
    { stroke: '#1877f2', fill: '#050c19', title: '메타는 2030년까지 5GW 잉여 컴퓨트를 재판매한다는 시나리오가 나왔습니다', body: 'GW당 캡엑스 380억·매출 200억, 마진 73%, ROI 38%로 잡힙니다. AI 인프라가 자산이 될 수 있다는 프레임입니다.', stat: 'META' },
    { stroke: '#94a3b8', fill: '#0f1419', title: '미국 은행 미실현 손실 5,117억 달러로 BREAKING 수준입니다', body: '직전 2분기 연속 증가했습니다. 금리·채권 평가와 AI·매크로 리스크가 같은 화면에 겹칩니다.', stat: '$512B' },
    { stroke: '#4ade80', fill: '#061209', title: '테슬라 로보택시는 6개 도시에서 하루 16시간 운행합니다', body: '오스틴·달러스·휴스턴·마이애미·올랜도·탬파, 오전 6시~오후 10시입니다. 무인 함대도 늘었다는 설명입니다.', stat: 'TSLA' },
  ] : [
    { stroke: '#60a5fa', fill: '#0a1420', title: 'Nvidia Q2 revenue beat at $96.1B', body: 'EPS $2.22 vs $2.10, data center $89B, GM 75%. Shares fell about 2% after hours despite the beat.', stat: 'NVDA' },
    { stroke: '#a78bfa', fill: '#1a1030', title: 'Anthropic 63% vs SpaceX 37% for 2026 largest IPO', body: 'Prediction-market odds frame Anthropic ahead of SpaceX for the year\'s biggest listing.', stat: 'IPO' },
    { stroke: '#c084fc', fill: '#1a0f2a', title: 'SpaceX valuation $1,826B, 51 days above $1T', body: 'Issuance $135 (+2%), first notation $150 (-8%), ATH $226, volume near $7B.', stat: '$1.8T' },
    { stroke: '#c084fc', fill: '#1a0f2a', title: 'Louisiana Starbase targets 12+ towers, 30+ Starship/day', body: 'Starship 4 aims for 2M+ tons/year to orbit. Launch cadence is upstream of Starlink and cargo cost.', stat: 'SPCX' },
    { stroke: '#1877f2', fill: '#0a1420', title: 'Meta 5GW excess compute resale scenario by 2030', body: '$38B/GW capex, $20B/GW revenue, 73% margin, 38% ROI frames AI infra as an asset.', stat: 'META' },
    { stroke: '#94a3b8', fill: '#111827', title: 'US banks unrealized losses $511.7B', body: 'Losses grew for two prior quarters. Rates, bond marks, and AI macro sit on the same screen.', stat: '$512B' },
    { stroke: '#4ade80', fill: '#0a1a0a', title: 'Tesla robotaxi runs 16 hours/day in six cities', body: 'Austin, Dallas, Houston, Miami, Orlando, Tampa, 6am–10pm. Unsupervised fleet reportedly grew.', stat: 'TSLA' },
  ];
  const footer = ko
    ? '더 볼 것: 테라팹 1,190억 · DC 부채 7,000억+ · 그록 2.0 · TPU v8 · 사이버트럭 +5,000 · Nscale 450억'
    : 'Also: Terafab $119B · DC debt $700B+ · Grok Think Fast 2.0 · TPU v8 · Cybertruck +$5K · Nscale $45B';
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
{ file:'nvda-q2-earnings', symbol:'NVDA', layout:'tpl', seed:'seed-1202',
  category:'어닝', categoryColor:'blue', subject:'엔비디아', tickers:['NVDA'],
  title:'엔비디아 2분기 매출 961억 달러·주당순이익 2.22달러로 예상을 상회했지만 시간외 -2%로 반응했습니다',
  summary:'엔비디아 2분기 매출은 961억 달러(컨센서스 922억), 주당순이익 2.22달러(2.10달러)로 예상을 넘겼습니다. 데이터센터 890억 달러(854억), 총마진 75%입니다. 실적은 beat였지만 시간외 약 -2%로 반응했습니다.',
  titleEn:'Nvidia Q2 revenue $96.1B beats, EPS $2.22, but shares fell ~2% after hours',
  summaryEn:'Q2 revenue $96.1B vs $92.2B est., EPS $2.22 vs $2.10, data center $89B vs $85.4B, GM 75%. Beat but AH ~-2%.',
  body: `■ 상세

엔비디아는 2026 회계 2분기 매출 961억 달러, 주당순이익(adj.) 2.22달러를 기록했습니다. 시장 컨센서스는 매출 922억 달러, EPS 2.10달러였습니다. 데이터센터 매출 890억 달러(컨센서스 854억), 총마진(gross margin) 75%입니다.

실적은 전 구간에서 예상을 상회(beat)했습니다. 다만 발표 직후 시간외 거래에서 주가는 약 -2% 하락했습니다. beat인데도 하락한 것은 가이던스·공급·밸류에이션·매수세 소진 등 여러 해석이 가능합니다.

데이터센터 890억 달러는 AI GPU 수요가 여전히 중심축임을 보여 줍니다. 총마진 75%는 고부가 제품 믹스가 유지되고 있음을 시사합니다. 다음 분기 가이던스와 블랙웰·베라 루빈 출하 코멘트가 주가 방향을 좌우할 수 있습니다.

■ 왜 이 뉴스가 중요한가

1. 매출·EPS·데이터센터가 모두 beat면 AI CAPEX 사이클이 아직 강하다는 신호입니다.

2. 총마진 75%는 가격·믹스 방어가 되고 있음을 뜻합니다.

3. beat인데 시간외 -2%는 기대치가 더 높았거나 가이던스가 약했을 수 있습니다.

4. 데이터센터 890억은 클라우드·AI 팩토리 수요의 척도입니다.

5. 실적 후 변동성은 옵션·레버리지 ETF 포지션과도 연결됩니다.

■ 시나리오

**A: 가이던스 상향·추가 beat로 시간외 하락을 만회합니다.**
**B: 가이던스 보수→조정 지속.**
**C: macro shock와 함께 semi 섹터 동반 조정.**

■ 오늘까지 흐름

- 블랙웰 출하·수율
- 2분기 beat·시간외 -2%
- 데이터센터 가이던스

■ 반대 관점

(1) beat=추가 상승 아님
(2) 공급 제약
(3) 중국·수출
(4) 경쟁 TPU·ASIC
(5) 밸류에이션

■ 앞으로 볼 것

(1) 3분기 가이던스
(2) 데이터센터 믹스
(3) 총마진 추이
(4) CFO 코멘트
(5) AH→정규장

■ 투자시사점

beat와 주가 반응은 다를 수 있습니다. 데이터센터 890억·마진 75%는 본체이고, 시간외 -2%는 다음 가이던스를 확인하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'엔비디아 2분기 매출 961억 달러·주당순이익 2.22달러로 예상을 상회했지만 시간외 -2%로 반응했습니다',
    heroIcon:'📊',
    heroBig:'$96.1B',
    heroSub:'매출 961억 달러(예상 922억), 주당순이익 2.22달러(2.10), 데이터센터 890억, 총마진 75%입니다. 실적은 beat였지만 시간외 약 -2% 하락했습니다.',
    cards:[{icon:'💰',big:'$96.1B',mid:'매출 beat',sub:'예상 922억'},{icon:'🖥️',big:'$89B',mid:'데이터센터',sub:'예상 854억'},{icon:'📈',big:'75%',mid:'총마진',sub:'AH 약 -2%'}],
    quote:'"2분기 매출 961억 달러, 주당순이익 2.22달러로 시장 예상을 넘겼습니다. 데이터센터 890억, 총마진 75%입니다. 실적은 좋았지만 시간외 -2%로 반응했습니다. beat인데도 하락할 때는 가이던스와 다음 분기 코멘트를 함께 보셔야 합니다."',
    noteHead:'왜 중요한가',
    noteSub:'AI CAPEX 허브 실적입니다. 숫자는 강하지만 기대치가 더 높았을 수 있습니다. 3분기 가이던스와 데이터센터 믹스를 추적하시면 됩니다.',
    footer:'NVDA · 2분기 실적',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Nvidia Q2 beats at $96.1B revenue, EPS $2.22, AH ~-2%',
    heroIcon:'📊',
    heroBig:'$96.1B',
    heroSub:'Revenue beat $92.2B est., EPS $2.22 vs $2.10, data center $89B, GM 75%. Shares fell ~2% after hours despite the beat.',
    cards:[{icon:'💰',big:'$96.1B',mid:'Rev beat',sub:'vs $92.2B'},{icon:'🖥️',big:'$89B',mid:'Data ctr',sub:'vs $85.4B'},{icon:'📈',big:'75%',mid:'GM',sub:'AH ~-2%'}],
    quote:'"Q2 revenue $96.1B and EPS $2.22 beat estimates. Data center $89B, gross margin 75%. After-hours was about -2% despite the beat. Check guidance and next-quarter comments."',
    noteHead:'Why this matters',
    noteSub:'Core AI earnings print. Numbers are strong but expectations may have been higher. Track Q3 guidance and data-center mix.',
    footer:'NVDA · Q2 earnings',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'anthropic-ipo-odds-polymarket', symbol:'AI', layout:'tplCompare', seed:'seed-1203',
  category:'매크로', categoryColor:'purple', subject:'AI', tickers:['MACRO'],
  title:'2026년 최대 IPO 확률에서 앤트로픽 63%·스페이스X 37%로 나왔습니다',
  summary:'예측시장 기준 2026년 최대 규모 IPO는 앤트로픽 63%, 스페이스X 37%로 잡혔습니다. AI·우주 상장 서사의 상대 확률을 보여 줍니다.',
  titleEn:'Anthropic 63% vs SpaceX 37% for 2026 largest IPO on prediction markets',
  summaryEn:'Prediction markets put Anthropic at 63% and SpaceX at 37% for the biggest 2026 IPO.',
  body: `■ 상세

예측시장(prediction market)은 특정 사건의 발생 확률을 가격으로 거래하는 플랫폼입니다. 이번 화면은 2026년 한 해 중 가장 큰 규모의 IPO가 어느 회사일지에 대한 확률입니다.

앤트로픽(Anthropic) 63%, 스페이스X(SpaceX) 37%로 표시됩니다. 두 회사 모두 비상장(unlisted)이며, 상장 시 시장 전체 밸류에이션·유동성·섹터 재평가에 영향을 줄 수 있습니다.

확률은 사실이 아니라 시장 참여자의 집단 기대입니다. IPO 일정·규모·macro window·SEC 심사가 바뀌면 확률도 빠르게 움직입니다.

■ 왜 이 뉴스가 중요한가

1. 63% vs 37%는 AI 소프트웨어 vs 우주 인프라 상장 경쟁 프레임입니다.

2. 최대 IPO는 조달 규모·밸류·시장 appetite에 달립니다.

3. 앤트로픽 상장은 Mag7 AI spend와 연결됩니다.

4. 스페이스X는 스타링크·스타십 내러티브와 연결됩니다.

5. 예측시장 확률≠확정 일정.

■ 시나리오

**A: 앤트로픽 S-1→확률 추가 상승.**
**B: 스페이스X delay→비율 역전.**
**C: macro 창 닫힘→둘 다 지연.**

■ 오늘까지 흐름

- Anthropic IPO rumor
- SpaceX private marks
- 2026 largest IPO odds

■ 반대 관점

(1) 예측시장 유동성
(2) 확률 급변
(3) 둘 다 delay
(4) third rival
(5) regulation

■ 앞으로 볼 것

(1) S-1 filing
(2) odds weekly
(3) raise size
(4) first-day trade
(5) peer re-rating

■ 투자시사점

확률은 thermometer입니다. S-1·일정·조달 규모로 검증하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'2026년 최대 IPO 확률에서 앤트로픽 63%·스페이스X 37%로 나왔습니다',
    heroBig:'63% vs 37%',
    heroSub:'예측시장에서 2026년 최대 IPO는 앤트로픽 63%, 스페이스X 37%입니다. AI와 우주 상장의 상대 확률입니다.',
    beforeLabel:'스페이스X',
    beforeBig:'37%',
    beforeSub:'2026 최대 IPO',
    afterLabel:'앤트로픽',
    afterBig:'63%',
    afterSub:'2026 최대 IPO',
    cards:[{icon:'🤖',big:'63%',mid:'앤트로픽',sub:'AI 소프트웨어'},{icon:'🚀',big:'37%',mid:'스페이스X',sub:'우주·위성'},{icon:'📅',big:'2026',mid:'최대 IPO',sub:'확률 기준'}],
    quote:'"2026년 가장 큰 IPO가 앤트로픽일 확률 63%, 스페이스X 37%로 거래됩니다. 확률은 확정이 아니라 시장 기대입니다. 상장 일정·조달 규모·증권신고서가 나오면 숫자가 바뀔 수 있습니다."',
    noteHead:'왜 중요한가',
    noteSub:'비상장 AI·우주의 공개 시장 재평가 온도계입니다. 확률만으로 매매하지 말고 S-1과 일정을 확인하세요.',
    footer:'AI · IPO 확률',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Anthropic 63% vs SpaceX 37% for 2026 largest IPO',
    heroBig:'63% vs 37%',
    heroSub:'Prediction markets: Anthropic 63%, SpaceX 37% for the biggest 2026 IPO.',
    beforeLabel:'SpaceX',
    beforeBig:'37%',
    beforeSub:'Largest 2026 IPO',
    afterLabel:'Anthropic',
    afterBig:'63%',
    afterSub:'Largest 2026 IPO',
    cards:[{icon:'🤖',big:'63%',mid:'Anthropic',sub:'AI software'},{icon:'🚀',big:'37%',mid:'SpaceX',sub:'Space·sat'},{icon:'📅',big:'2026',mid:'Largest IPO',sub:'Odds'}],
    quote:'"Odds trade Anthropic at 63% vs SpaceX 37% for the largest 2026 IPO. These are expectations, not schedules. S-1 filings and window timing can move them quickly."',
    noteHead:'Why this matters',
    noteSub:'Thermometer for AI vs space listings. Verify with filings, not odds alone.',
    footer:'AI · IPO odds',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'spcx-valuation-1826b', symbol:'SPCX', layout:'tplBreaking', seed:'seed-1204',
  category:'종목분석', categoryColor:'purple', subject:'스페이스X', tickers:['SPCX'],
  title:'스페이스X 시가총액 1조 8,260억 달러·1조 달러 이상 51일째입니다',
  summary:'시가총액 1조 8,260억 달러, 1조 달러 이상 51일, 발행가 135달러(+2%), 최초 표기 150달러(-8%), 사상 최고 226달러, 거래대금 약 70억 달러입니다.',
  titleEn:'SpaceX valuation $1,826B, 51 days above $1T, volume near $7B',
  summaryEn:'Market cap $1,826B, 51 days above $1T. Issuance $135 (+2%), first notation $150 (-8%), ATH $226, volume ~$7B.',
  body: `■ 상세

스페이스X 비상장 지분 거래에서 시가총액이 1조 8,260억 달러(약 \$1,826B)로 잡혔습니다. 1조 달러(\$1T) 이상 구간을 51일째 유지 중입니다.

발행가(issuance) 135달러(+2%), 최초 표기(first notation) 150달러(-8%), 사상 최고(ATH) 226달러, 거래대금(volume) 약 70억 달러가 함께 표시됩니다. private mark는 공개 시장 가격과 다를 수 있습니다.

스타링크 ARR·스타십 cadence·정부 계약·상장 odds와 같은 축에서 읽힙니다. 51일 \$1T+는 liquidity premium과 narrative momentum 신호입니다.

■ 왜 이 뉴스가 중요한가

1. \$1,826B는 private 시장의 valuation anchor입니다.

2. 51일 \$1T+는 지속적 관심·거래량을 시사합니다.

3. 발행가 vs 표기 vs ATH는 참여자별 가격대 차이입니다.

4. 거래대금 \$7B는 secondary 유동성 규모입니다.

5. 상장 전까지 mark vs public price gap 존재.

■ 시나리오

**A: 상장 window→public re-rating.**
**B: private mark 조정.**
**C: macro로 secondary 거래 위축.**

■ 오늘까지 흐름

- Starlink·Starship narrative
- \$1,826B cap·51 days \$1T+
- IPO odds same week

■ 반대 관점

(1) private mark only
(2) illiquid
(3) insider-only
(4) delay
(5) competition

■ 앞으로 볼 것

(1) weekly marks
(2) volume trend
(3) issuance price
(4) S-1 rumor
(5) Starlink metrics

■ 투자시사점

private valuation은 옵션 가치입니다. 거래대금·발행가·51일 \$1T+를 함께 추적하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'스페이스X 시가총액 1조 8,260억 달러·1조 달러 이상 51일째입니다',
    heroBig:'$1,826B',
    heroSub:'시가총액 1조 8,260억 달러, 1조 달러 이상 51일. 발행가 135(+2%), 표기 150(-8%), ATH 226, 거래대금 약 70억.',
    cards:[{icon:'💎',big:'$1.8T',mid:'시가총액',sub:'51일 $1T+'},{icon:'💵',big:'$135',mid:'발행가',sub:'+2%'},{icon:'📊',big:'$7B',mid:'거래대금',sub:'ATH $226'}],
    quote:'"시가총액 1조 8,260억 달러, 1조 달러 이상 51일째입니다. 발행가 135달러, 최초 표기 150(-8%), 사상 최고 226, 거래대금 약 70억. 비상장 mark는 공개 시장과 다를 수 있으니 유동성과 발행가를 함께 보세요."',
    noteSub:'우주·위성 내러티브의 밸류 anchor입니다. 상장 전까지 mark discount를 유지하시면 됩니다.',
    footer:'SPCX · $1.8T 밸류',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'SpaceX valuation $1,826B, 51 days above $1T',
    heroBig:'$1,826B',
    heroSub:'Market cap $1,826B, 51 days above $1T. Issuance $135 (+2%), notation $150 (-8%), ATH $226, volume ~$7B.',
    cards:[{icon:'💎',big:'$1.8T',mid:'Market cap',sub:'51d $1T+'},{icon:'💵',big:'$135',mid:'Issuance',sub:'+2%'},{icon:'📊',big:'$7B',mid:'Volume',sub:'ATH $226'}],
    quote:'"Market cap $1,826B with 51 days above $1T. Issuance $135, first notation $150 (-8%), ATH $226, volume near $7B. Private marks can differ from a public listing price."',
    noteSub:'Valuation anchor for space narrative. Keep a mark discount until IPO.',
    footer:'SPCX · $1.8T valuation',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'spcx-starbase-louisiana-cadence', symbol:'SPCX', layout:'tplBreaking', seed:'seed-1205',
  category:'종목분석', categoryColor:'purple', subject:'스페이스X', tickers:['SPCX'],
  title:'루이지애나 스타베이스는 발사대 12개 이상·하루 30척 이상 스타십을 목표합니다',
  summary:'발사대(tower) 12개 이상, 하루 30척 이상 Starship, Starship 4대는 연간 200만 톤 이상 궤도 투입을 겨냥합니다. 발사 cadence의 구체 숫자입니다.',
  titleEn:'Louisiana Starbase targets 12+ towers, 30+ Starship/day, 2M+ tons/year',
  summaryEn:'12+ launch towers, 30+ Starship/day, Starship 4 for 2M+ tons/year to orbit.',
  body: `■ 상세

루이지애나 스타베이스(Louisiana Starbase)는 텍사스와 별도로 건설되는 대형 발사·조립 거점입니다. 이번 스펙은 발사대 12개 이상, 하루 30척 이상 Starship 생산·발사 cadence입니다.

Starship 4대(4-ship fleet)는 연간 200만 톤 이상을 궤도에 올리는 목표와 연결됩니다. 톤nage는 위성·화물·궤도 인프라 비용 곡선의 상류 지표입니다.

숫자가 크므로 허가·환경·자금·실제 flight rate를 계획과 분리해 보셔야 합니다. cadence 목표는 방향이지 단기 EPS가 아닙니다.

■ 왜 이 뉴스가 중요한가

1. 12+ tower는 동시 발사·turnaround infra를 뜻합니다.

2. 30+/day는 현재 cadence 대비 극단 목표입니다.

3. 200만 톤/년은 위성·화물 수요 가정을 내포합니다.

4. Starship 4 fleet는 병렬 운용 설계입니다.

5. 허가·지역 정치가 일정 리스크입니다.

■ 시나리오

**A: EPC·착공 공식화.**
**B: cadence 목표 하향.**
**C: 규제 지연.**

■ 오늘까지 흐름

- Louisiana Starbase plan
- 12+ towers·30+/day
- Starship flight rate

■ 반대 관점

(1) plan only
(2) safety·yield
(3) funding
(4) env lawsuit
(5) pad bottleneck

■ 앞으로 볼 것

(1) permit docs
(2) construction start
(3) flight rate
(4) tonnage delivered
(5) Starlink demand

■ 투자시사점

발사 cadence는 장기 콜 옵션입니다. 착공·허가·실제 비행률을 추적하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'루이지애나 스타베이스는 발사대 12개 이상·하루 30척 이상 스타십을 목표합니다',
    heroBig:'30+/day',
    heroSub:'발사대 12개 이상, 하루 30척 이상 Starship. Starship 4는 연 200만 톤+ 궤도 투입 목표입니다.',
    cards:[{icon:'🗼',big:'12+',mid:'발사대',sub:'tower'},{icon:'🚀',big:'30+/일',mid:'스타십',sub:'cadence'},{icon:'⚖️',big:'2M+ t',mid:'연간 투입',sub:'Starship 4'}],
    quote:'"루이지애나 스타베이스는 발사대 12개 이상, 하루 30척 이상을 목표합니다. Starship 4대는 연 200만 톤 이상 궤도 투입을 겨냥합니다. 숫자가 크므로 허가·자금·실제 비행률을 계획과 나눠 보세요."',
    noteSub:'위성·화물 비용의 상류입니다. 목표 cadence와 실제 flight rate를 분리해 추적하세요.',
    footer:'SPCX · 루이지애나 cadence',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Louisiana Starbase: 12+ towers, 30+ Starship/day',
    heroBig:'30+/day',
    heroSub:'12+ launch towers, 30+ Starship per day. Starship 4 targets 2M+ tons/year to orbit.',
    cards:[{icon:'🗼',big:'12+',mid:'Towers',sub:'Launch pads'},{icon:'🚀',big:'30+/d',mid:'Starship',sub:'Cadence'},{icon:'⚖️',big:'2M+ t',mid:'Per year',sub:'Starship 4'}],
    quote:'"Louisiana Starbase targets 12+ towers and 30+ Starships per day. Starship 4 aims for 2M+ tons/year to orbit. Separate plans from permits and actual flight rate."',
    noteSub:'Upstream of satellite and cargo cost curves. Track permits vs flight rate.',
    footer:'SPCX · Louisiana cadence',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'spcx-terafab-texas-48b', symbol:'SPCX', layout:'tpl', seed:'seed-1206',
  category:'종목분석', categoryColor:'purple', subject:'스페이스X', tickers:['SPCX'],
  title:'텍사스 테라팹에 추가 약 480억 달러·총 1,190억 달러·서브2nm AI 칩이 잡혔습니다',
  summary:'추가 투자 약 480억 달러, 1단계 168억 확정, 총 1,190억 달러, 34쪽 세제협약·2026년 12월~2028년 12월 공사, 서브2nm AI 칩 생산이 핵심입니다.',
  titleEn:'Terafab Texas: ~$48B additional, $119B total, sub-2nm AI chips',
  summaryEn:'~$48B additional capex, Phase 1 $16.8B committed, $119B total, 34-page tax agreement, Dec 2026–Dec 2028 construction, sub-2nm AI chips.',
  body: `■ 상세

테라팹(Terafab)은 텍사스에 건설되는 대형 반도체·AI 칩 파브 프로젝트로 읽힙니다. 추가 투자 약 480억 달러(~\$48B), 1단계(Phase 1) 168억 달러(\$16.8B) committed, 총 1,190억 달러(\$119B) 규모가 잡혔습니다.

34페이지 세제협약(tax agreement), 공사 기간 2026년 12월~2028년 12월, 서브2nm(sub-2nm) AI 칩 생산이 핵심 스펙입니다. sub-2nm는 최첨단 공정 노드로 AI 가속기 수요와 맞닿습니다.

스페이스X·xAI·테슬라 AI 실리콘 내러티브와 연결될 수 있습니다. CAPEX 규모가 크므로 자금 조달·인허가·수율 ramp가 관건입니다.

■ 왜 이 뉴스가 중요한가

1. \$119B total는 semi CAPEX의 상한을 올립니다.

2. Phase 1 \$16.8B committed는 단기 executable chunk입니다.

3. sub-2nm는 NVDA·TSMC·삼성과 같은 경쟁 구간입니다.

4. 세제협약 34p는 지역 incentive 민감도를 보여줍니다.

5. 2026.12–2028.12 공사는 2년 착공 window입니다.

■ 시나리오

**A: fab 착공·장비 발주 공식화.**
**B: CAPEX scale-down.**
**C: 공정 지연·수율 이슈.**

■ 오늘까지 흐름

- Terafab Texas plan
- \$48B add·\$119B total
- sub-2nm AI chips

■ 반대 관점

(1) plan vs groundbreak
(2) funding
(3) talent·water
(4) foundry competition
(5) timeline slip

■ 앞으로 볼 것

(1) tax agreement filing
(2) Phase 1 spend
(3) equipment orders
(4) sub-2nm roadmap
(5) offtake partners

■ 투자시사점

테라팹은 장기 semi 옵션입니다. committed \$16.8B와 착공 일정을 숫자로 추적하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'텍사스 테라팹에 추가 약 480억 달러·총 1,190억 달러·서브2nm AI 칩이 잡혔습니다',
    heroIcon:'🏭',
    heroBig:'$119B',
    heroSub:'추가 ~480억, 1단계 168억 확정, 총 1,190억. 2026.12~2028.12 공사, 서브2nm AI 칩.',
    cards:[{icon:'💰',big:'$48B',mid:'추가 투자',sub:'on top'},{icon:'✅',big:'$16.8B',mid:'1단계',sub:'committed'},{icon:'🔬',big:'sub-2nm',mid:'AI 칩',sub:'첨단 공정'}],
    quote:'"테라팹 텍사스에 추가 약 480억, 1단계 168억 확정, 총 1,190억입니다. 34쪽 세제협약, 2026년 12월~2028년 12월 공사, 서브2nm AI 칩. 규모가 크므로 착공·장비 발주·수율을 단계별로 확인하세요."',
    noteHead:'왜 중요한가',
    noteSub:'AI 실리콘 vertical integration 옵션입니다. committed 금액과 착공이 나오기 전까지는 계획으로 두세요.',
    footer:'SPCX · 테라팹 $119B',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Terafab Texas ~$48B additional, $119B total, sub-2nm AI',
    heroIcon:'🏭',
    heroBig:'$119B',
    heroSub:'~$48B additional, Phase 1 $16.8B committed, Dec 2026–Dec 2028 build, sub-2nm AI chips.',
    cards:[{icon:'💰',big:'$48B',mid:'Additional',sub:'Capex'},{icon:'✅',big:'$16.8B',mid:'Phase 1',sub:'Committed'},{icon:'🔬',big:'sub-2nm',mid:'AI chips',sub:'Leading edge'}],
    quote:'"Terafab Texas adds ~$48B for $119B total. Phase 1 $16.8B committed, 34-page tax agreement, Dec 2026–Dec 2028 construction, sub-2nm AI chips."',
    noteHead:'Why this matters',
    noteSub:'Long-dated silicon option. Track committed spend and groundbreak before treating as near-term EPS.',
    footer:'SPCX · Terafab $119B',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'macro-dc-debt-jll-700b', symbol:'MACRO', layout:'tpl', seed:'seed-1207',
  category:'매크로', categoryColor:'red', subject:'금리', tickers:['MACRO'],
  title:'데이터센터 파이프라인 66GW·2028년까지 영구부채 7,000억 달러+가 잡혔습니다',
  summary:'JLL 기준 데이터센터 파이프라인 66GW, 2028년까지 영구부채(permanent debt) 7,000억 달러 이상. MSFT·META·GOOG·AMZN·ORCL 등 빅테크 CAPEX·부채 축입니다.',
  titleEn:'Data center 66GW pipeline, $700B+ permanent debt through 2028',
  summaryEn:'66GW pipeline, $700B+ permanent debt through 2028 per JLL. MSFT, META, GOOG, AMZN, ORCL in focus.',
  body: `■ 상세

데이터센터(data center)는 AI 학습·추론을 위한 GPU·전력·냉각 인프라입니다. JLL 리포트 기준 파이프라인 66GW(기가와트), 2028년까지 영구부채(permanent debt) 7,000억 달러(\$700B+)가 필요하다는 추정이 나왔습니다.

MSFT(마이크로소프트), META(메타), GOOG(구글), AMZN(아마존), ORCL(오라클) 등 hyperscaler가 CAPEX·부채 발행의 중심입니다. GW는 전력 용량 단위로, AI 팩토리 확장 규모를 보여 줍니다.

\$700B+ debt는 금리·신용 스프레드·은행 대출 여력과 연결됩니다. CAPEX boom과 financial leverage가 동시에 진행 중임을 시사합니다.

■ 왜 이 뉴스가 중요한가

1. 66GW pipeline은 전력·부지·grid bottleneck을 내포합니다.

2. \$700B+ debt는 AI infra financing wall입니다.

3. hyperscaler 5社는 Mag7 CAPEX의 core.

4. 영구부채는 금리 민감도가 큽니다.

5. 전력·허가 지연이 debt drawdown을 늦출 수 있습니다.

■ 시나리오

**A: debt 발행·프로젝트 financing 가속.**
**B: 금리·regulation으로 pipeline 축소.**
**C: utility·grid가 binding constraint.**

■ 오늘까지 흐름

- AI CAPEX boom
- 66GW·\$700B+ debt
- bank unrealized losses same week

■ 반대 관점

(1) JLL estimate
(2) project cancel
(3) rate spike
(4) power delay
(5) equity vs debt mix

■ 앞으로 볼 것

(1) quarterly capex
(2) bond issuance
(3) GW online
(4) utility deals
(5) credit spreads

■ 투자시사점

AI infra는 실물+금융 이중 레버입니다. GW pipeline과 debt issuance를 함께 추적하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'데이터센터 파이프라인 66GW·2028년까지 영구부채 7,000억 달러+가 잡혔습니다',
    heroIcon:'🏗️',
    heroBig:'$700B+',
    heroSub:'파이프라인 66GW, 2028년까지 영구부채 7,000억+. MSFT·META·GOOG·AMZN·ORCL CAPEX·부채 축.',
    cards:[{icon:'⚡',big:'66GW',mid:'파이프라인',sub:'전력 용량'},{icon:'💳',big:'$700B+',mid:'영구부채',sub:'~2028'},{icon:'🏢',big:'5社',mid:'hyperscaler',sub:'MSFT·META 등'}],
    quote:'"데이터센터 파이프라인 66GW, 2028년까지 영구부채 7,000억 달러 이상이 필요하다는 추정입니다. AI 팩토리는 GPU만이 아니라 전력·부지·금융이 묶입니다. 금리와 은행 여력이 같은 화면의 변수입니다."',
    noteHead:'왜 중요한가',
    noteSub:'AI CAPEX와 부채 발행이 동시에 커집니다. GW 착공과 bond issuance를 숫자로 확인하세요.',
    footer:'MACRO · DC debt $700B+',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Data center 66GW pipeline, $700B+ debt through 2028',
    heroIcon:'🏗️',
    heroBig:'$700B+',
    heroSub:'66GW pipeline, $700B+ permanent debt through 2028. MSFT, META, GOOG, AMZN, ORCL capex and debt in focus.',
    cards:[{icon:'⚡',big:'66GW',mid:'Pipeline',sub:'Power capacity'},{icon:'💳',big:'$700B+',mid:'Permanent debt',sub:'Through 2028'},{icon:'🏢',big:'5',mid:'Hyperscalers',sub:'Big Tech'}],
    quote:'"A 66GW data-center pipeline may need $700B+ permanent debt through 2028. AI factories tie GPUs to power, land, and financing. Rates and bank capacity matter on the same screen."',
    noteHead:'Why this matters',
    noteSub:'AI capex and debt issuance scale together. Track GW builds and bond supply.',
    footer:'MACRO · DC debt $700B+',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'tsla-robotaxi-16h-6cities', symbol:'TSLA', layout:'tpl', seed:'seed-1208',
  category:'종목분석', categoryColor:'mint', subject:'테슬라', tickers:['TSLA'],
  title:'테슬라 로보택시가 6개 도시에서 하루 16시간(오전 6시~오후 10시) 운행합니다',
  summary:'오스틴·달러스·휴스턴·마이애미·올랜도·탬파 6개 도시, 하루 16시간(6am–10pm) 운행. 무인(unsupervised) 함대도 성장했다는 설명입니다.',
  titleEn:'Tesla robotaxi runs 16 hours/day in six cities, unsupervised fleet grew',
  summaryEn:'Six cities Austin–Tampa, 16h/day 6am–10pm. Unsupervised fleet reportedly grew.',
  body: `■ 상세

로보택시(robotaxi)는 자율주행 소프트웨어로 승객을 실어 나르는 서비스입니다. 이번 업데이트는 6개 도시에서 하루 16시간, 오전 6시~오후 10시(6am–10pm) 운행한다는 설명입니다.

도시는 오스틴(Austin), 달러스(Dallas), 휴스턴(Houston), 마이애미(Miami), 올랜도(Orlando), 탬파(Tampa)입니다. 플로리다 3개·텍사스 3개로 geofence가 넓어졌습니다. 무인(unsupervised) 함대도 늘었다는 설명이 함께 나왔습니다.

운행 시간·도시 수·무인 비율은 유료 마일과 revenue run-rate의 선행 지표입니다. 허가·보험·사고·개입률은 별도 확인이 필요합니다.

■ 왜 이 뉴스가 중요한가

1. 16h/day는 차량 utilization 상한을 올립니다.

2. 6 cities는 지리 확장의 실물 신호입니다.

3. unsupervised fleet growth는 감독원 탑승에서 한 단계 전진입니다.

4. FL+TX mix는 규제 환경 다양성을 뜻합니다.

5. 운행 시간≠유료 승객.

■ 시나리오

**A: 유료 마일·도시 추가 발표.**
**B: 사고·회수로 시간·도시 축소.**
**C: 경쟁사 유료 확대.**

■ 오늘까지 흐름

- Robotaxi geofence expansion
- 16h·6 cities·unsupervised
- Cybercab price hike same week

■ 반대 관점

(1) paid vs test
(2) geofence map
(3) incident rate
(4) weather·night
(5) insurance

■ 앞으로 볼 것

(1) weekly miles
(2) city permits
(3) unsupervised %
(4) app pricing
(5) fleet size

■ 투자시사점

로보택시는 지리·시간·무인 세 축입니다. 유료 마일 숫자로 검증하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'테슬라 로보택시가 6개 도시에서 하루 16시간(오전 6시~오후 10시) 운행합니다',
    heroIcon:'🚕',
    heroBig:'16h',
    heroSub:'6개 도시, 6am–10pm, 16시간/일. 오스틴·달러스·휴스턴·마이애미·올랜도·탬파. 무인 함대도 성장.',
    cards:[{icon:'🌆',big:'6개',mid:'도시',sub:'TX·FL'},{icon:'⏰',big:'16h',mid:'운행',sub:'6am–10pm'},{icon:'🤖',big:'무인',mid:'함대 성장',sub:'unsupervised'}],
    quote:'"로보택시가 6개 도시에서 하루 16시간 운행합니다. 오전 6시~오후 10시, 텍사스·플로리다 3개씩입니다. 무인 함대도 늘었다는 설명입니다. 운행 시간과 유료 승객은 단계가 다르므로 마일·요금 앱을 확인하세요."',
    noteHead:'왜 중요한가',
    noteSub:'지리·시간·무인이 동시에 늘면 실물 진전입니다. 유료 전환과 사고율을 함께 보시면 됩니다.',
    footer:'TSLA · 로보택시 16h',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Tesla robotaxi 16h/day in six cities',
    heroIcon:'🚕',
    heroBig:'16h',
    heroSub:'Six cities, 6am–10pm, 16 hours/day. Austin through Tampa. Unsupervised fleet reportedly grew.',
    cards:[{icon:'🌆',big:'6',mid:'Cities',sub:'TX·FL'},{icon:'⏰',big:'16h',mid:'Daily',sub:'6am–10pm'},{icon:'🤖',big:'Fleet',mid:'Unsupervised',sub:'Grew'}],
    quote:'"Robotaxi service runs 16 hours per day across six cities, 6am–10pm. Unsupervised fleet growth is cited. Operating hours and paid passengers are different stages—check miles and pricing."',
    noteHead:'Why this matters',
    noteSub:'Geography, hours, and driverless mix advancing together. Verify paid conversion and safety stats.',
    footer:'TSLA · Robotaxi 16h',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'tsla-grok-think-fast-2', symbol:'TSLA', layout:'tplQuote', seed:'seed-1209',
  category:'종목분석', categoryColor:'mint', subject:'테슬라', tickers:['TSLA'],
  title:'그록 Think Fast 2.0이 음성 대화 1위로 올라 차량·설정·내비·음악을 제어합니다',
  summary:'Grok Think Fast 2.0이 speech-to-speech(음성 대화) 벤치 1위. 차량 제어, 설정, 내비, 음악을 음성으로 조작합니다. 차량 OS·AI assistant 축입니다.',
  titleEn:'Grok Think Fast 2.0 ranks #1 in speech-to-speech, controls car/settings/nav/music',
  summaryEn:'Grok Think Fast 2.0 #1 in speech-to-speech. Controls vehicle, settings, navigation, and music.',
  body: `■ 상세

Think Fast 2.0은 xAI·테슬라 생태계의 음성 AI 모델입니다. speech-to-speech는 텍스트 중간 없이 음성 입력→음성 출력으로 대화하는 방식입니다.

벤치에서 1위로 표시되며, 차량 제어(vehicle control), 설정(settings), 내비게이션(navigation), 음악(music)을 음성 명령으로 조작합니다. FSD·로보택시와 별도로, 차량 내 UX·체류 시간·구독 monetization 축입니다.

벤치 1위가 곧 실차 만족도는 아닙니다. latency·안전·오프라인·개인정보는 실사용에서 검증해야 합니다.

■ 왜 이 뉴스가 중요한가

1. 음성 UI는 운전 중 hands-free 핵심입니다.

2. 차량 제어 연동은 OS lock-in을 강화합니다.

3. speech-to-speech 1위는 모델 경쟁력 신호입니다.

4. FSD·로보택시와 AI 스택 synergy.

5. 벤치 vs real-world gap 가능.

■ 시나리오

**A: 차량 OTA로 대-scale rollout.**
**B: rival voice assistant catch-up.**
**C: safety incident→rollout pause.**

■ 오늘까지 흐름

- Grok in-car stack
- Think Fast 2.0 #1 S2S
- Robotaxi same week

■ 반대 관점

(1) bench only
(2) distraction risk
(3) privacy
(4) rival Siri/Google
(5) subscription

■ 앞으로 볼 것

(1) OTA release notes
(2) user reviews
(3) latency
(4) feature parity
(5) xAI roadmap

■ 투자시사점

in-car AI는 로보택시 옆 revenue leg입니다. OTA 배포와 실사용 리뷰를 추적하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'그록 Think Fast 2.0이 음성 대화 1위로 올라 차량·설정·내비·음악을 제어합니다',
    heroBig:'#1 S2S',
    heroSub:'음성 대화(speech-to-speech) 1위. 차량·설정·내비·음악 음성 제어.',
    chip1big:'#1',
    chip1sub:'음성 대화',
    chip2big:'4-in-1',
    chip2sub:'차량·내비·음악',
    cards:[{icon:'🎙️',big:'S2S',mid:'음성 대화',sub:'벤치 1위'},{icon:'🚗',big:'차량',mid:'제어',sub:'설정·내비'},{icon:'🎵',big:'음악',mid:'연동',sub:'hands-free'}],
    quote:'"그록 Think Fast 2.0이 음성 대화 벤치 1위입니다. 텍스트 없이 말로 대화하고, 차량·설정·내비·음악을 조작합니다. 운전 중 손을 떼지 않는 UX가 목표입니다. 벤치 1위와 실차 만족도는 다를 수 있으니 OTA 후 리뷰를 보세요."',
    noteHead:'왜 중요한가',
    noteSub:'차량 OS·AI assistant 경쟁력입니다. 로보택시와 별도 monetization leg. OTA 배포 범위를 확인하세요.',
    footer:'TSLA · Grok Think Fast 2.0',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Grok Think Fast 2.0 #1 speech-to-speech, controls car/nav/music',
    heroBig:'#1 S2S',
    heroSub:'#1 in speech-to-speech. Controls vehicle, settings, navigation, and music by voice.',
    chip1big:'#1',
    chip1sub:'Speech-to-speech',
    chip2big:'4-in-1',
    chip2sub:'Car·nav·music',
    cards:[{icon:'🎙️',big:'S2S',mid:'Voice',sub:'#1 bench'},{icon:'🚗',big:'Car',mid:'Control',sub:'Settings·nav'},{icon:'🎵',big:'Music',mid:'Linked',sub:'Hands-free'}],
    quote:'"Grok Think Fast 2.0 ranks #1 in speech-to-speech. It controls vehicle, settings, navigation, and music without text in the middle. Bench rank and in-car satisfaction can differ—watch OTA rollout."',
    noteHead:'Why this matters',
    noteSub:'In-car AI competes with phone assistants. Separate leg from robotaxi. Track OTA scope.',
    footer:'TSLA · Grok Think Fast 2.0',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'meta-compute-resale-wf', symbol:'META', layout:'tplCompare', seed:'seed-1210',
  category:'종목분석', categoryColor:'blue', subject:'메타', tickers:['META'],
  title:'메타는 2030년까지 5GW 잉여 컴퓨트 재판매 시 GW당 ROI 38% 시나리오가 나왔습니다',
  summary:'2030년 5GW excess, GW당 캡엑스 380억·매출 200억, 마진 73%, 순이익 146억, ROI 38% 시나리오. AI infra를 자산으로 monetize하는 프레임입니다.',
  titleEn:'Meta 5GW excess compute resale by 2030: $38B/GW capex, 38% ROI scenario',
  summaryEn:'5GW excess by 2030, $38B/GW capex, $20B/GW revenue, 73% margin, $14.6B NI, 38% ROI.',
  body: `■ 상세

메타(Meta)는 AI 학습·추론을 위해 대규모 GPU 클러스터를 구축 중입니다. 이번 시나리오는 2030년까지 5GW(gigawatt-scale compute) 잉여(excess) capacity를 재판매(resale)한다는 가정입니다.

GW당 캡엑스(capex) 380억 달러(\$38B/GW), 매출(revenue) 200억(\$20B/GW), 마진(margin) 73%, 순이익(NI) 146억(\$14.6B), ROI(return on investment) 38%로 잡혔습니다. 자체 사용 후 남는 컴퓨트를 외부에 파는 asset-light monetization 프레임입니다.

시나리오≠가이던스입니다. 전력·냉각·네트워크·경쟁 클라우드 가격이 ROI를 좌우합니다.

■ 왜 이 뉴스가 중요한가

1. 5GW excess는 overshoot capacity 가정입니다.

2. \$38B/GW capex는 AI factory cost curve입니다.

3. 73% margin은 utilisation·pricing optimistic일 수 있습니다.

4. 38% ROI는 Mag7 capex debate의 anchor.

5. 재판매는 MSFT·AMZN cloud와 경쟁.

■ 시나리오

**A: resale product launch·enterprise contracts.**
**B: all capacity internal, no resale.**
**C: power cost erodes margin.**

■ 오늘까지 흐름

- Meta AI capex
- 5GW excess resale model
- DC debt \$700B same week

■ 반대 관점

(1) model only
(2) power cost
(3) cloud price war
(4) regulation
(5) utilisation

■ 앞으로 볼 것

(1) capex guide
(2) DC online GW
(3) cloud pricing
(4) partnership
(5) earnings call

■ 투자시사점

AI infra monetization은 upside option입니다. capex guide와 실제 GW online을 먼저 보시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'메타는 2030년까지 5GW 잉여 컴퓨트 재판매 시 GW당 ROI 38% 시나리오가 나왔습니다',
    heroBig:'38% ROI',
    heroSub:'5GW 잉여, GW당 캡엑스 380억·매출 200억, 마진 73%, 순이익 146억.',
    beforeLabel:'GW당 캡엑스',
    beforeBig:'$38B',
    beforeSub:'투자',
    afterLabel:'GW당 매출',
    afterBig:'$20B',
    afterSub:'73% 마진',
    cards:[{icon:'⚡',big:'5GW',mid:'잉여',sub:'2030'},{icon:'💰',big:'$14.6B',mid:'순이익',sub:'시나리오'},{icon:'📈',big:'38%',mid:'ROI',sub:'재판매'}],
    quote:'"2030년 5GW 잉여 컴퓨트를 재판매하면 GW당 캡엑스 380억, 매출 200억, 마진 73%, ROI 38%라는 시나리오입니다. AI 인프라를 자산으로 돌리는 그림입니다. 시나리오와 실적 가이던스는 다릅니다."',
    noteHead:'왜 중요한가',
    noteSub:'Mag7 capex가 revenue leg로 확장될 수 있다는 프레임입니다. 모델과 실제 GW·계약을 분리하세요.',
    footer:'META · compute resale',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Meta 5GW excess compute resale, 38% ROI scenario',
    heroBig:'38% ROI',
    heroSub:'5GW excess by 2030. $38B/GW capex, $20B/GW revenue, 73% margin, $14.6B NI.',
    beforeLabel:'Capex/GW',
    beforeBig:'$38B',
    beforeSub:'Investment',
    afterLabel:'Revenue/GW',
    afterBig:'$20B',
    afterSub:'73% margin',
    cards:[{icon:'⚡',big:'5GW',mid:'Excess',sub:'By 2030'},{icon:'💰',big:'$14.6B',mid:'Net income',sub:'Scenario'},{icon:'📈',big:'38%',mid:'ROI',sub:'Resale'}],
    quote:'"A scenario resells 5GW excess compute by 2030 at $38B/GW capex and $20B/GW revenue, 73% margin, 38% ROI. Separate model from official guidance."',
    noteHead:'Why this matters',
    noteSub:'Frames AI infra as monetizable assets. Track GW online and contracts.',
    footer:'META · compute resale',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'googl-tpu-v8-broader-market', symbol:'GOOGL', layout:'tplQuote', seed:'seed-1211',
  category:'종목분석', categoryColor:'blue', subject:'구글', tickers:['GOOGL'],
  title:'구글 TPU v8이 내부용을 넘어 더 넓은 AI 시장을 겨냥합니다',
  summary:'TPU v8(Tensor Processing Unit)이 Google 내부 워크로드뿐 아니라 broader AI market(외부·광범위 AI 시장)을 겨냥한다는 설명입니다. NVDA 대안 실리콘 축.',
  titleEn:'Google TPU v8 targets the broader AI market, not just internal use',
  summaryEn:'TPU v8 is aimed at the broader AI market beyond Google-internal workloads.',
  body: `■ 상세

TPU(Tensor Processing Unit)는 구글이 AI 학습·추론용으로 설계한 ASIC 칩입니다. v8은 8세대로, 성능·전력·scale-out이 개선된 버전입니다.

기존 TPU는 주로 Google Cloud·내부 검색·YouTube 워크로드에 쓰였습니다. 이번 메시지는 internal only를 넘어 broader AI market—외부 enterprise·startup·경쟁 클라우드 고객—을 겨냥한다는 쪽입니다.

NVDA GPU dominance에 대한 hyperscaler 대안 실리콘 narrative입니다. availability·소프트웨어 stack·가격·생산 capacity가 채택 관건입니다.

■ 왜 이 뉴스가 중요한가

1. broader market는 external sales ramp를 뜻합니다.

2. TPU v8은 NVDA·AMD·custom silicon 경쟁.

3. 구글 vertical integration 강화.

4. cloud margin·capex efficiency lever.

5. 내부→외부는 go-to-market 전환.

■ 시나리오

**A: GCP TPU v8 GA·대형 contract.**
**B: internal only 유지.**
**C: yield·supply delay.**

■ 오늘까지 흐름

- Google TPU roadmap
- v8 broader market
- NVDA earnings same week

■ 반대 관점

(1) limited supply
(2) CUDA moat
(3) software gap
(4) pricing
(5) export rules

■ 앞으로 볼 것

(1) GCP pricing page
(2) customer logos
(3) v8 benchmarks
(4) capex comment
(5) Anthropic tie

■ 투자시사점

TPU externalization은 NVDA TAM narrative의 변수입니다. GCP 가격·가용성을 추적하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'구글 TPU v8이 내부용을 넘어 더 넓은 AI 시장을 겨냥합니다',
    heroBig:'TPU v8',
    heroSub:'Tensor Processing Unit 8세대. 내부 워크로드뿐 아니라 외부 AI 시장을 겨냥합니다.',
    chip1big:'v8',
    chip1sub:'차세대 TPU',
    chip2big:'외부',
    chip2sub:'broader market',
    cards:[{icon:'🔬',big:'TPU v8',mid:'ASIC',sub:'AI 칩'},{icon:'☁️',big:'GCP',mid:'클라우드',sub:'외부 판매'},{icon:'⚔️',big:'대안',mid:'NVDA',sub:'GPU 경쟁'}],
    quote:'"TPU v8은 구글 AI 칩 8세대입니다. 예전에는 주로 내부·GCP에 썼지만, 이제 더 넓은 AI 시장을 겨냥한다는 설명입니다. GPU 독점에 대한 클라우드 대안 실리콘 narrative입니다. 가용성과 소프트웨어 호환이 관건입니다."',
    noteHead:'왜 중요한가',
    noteSub:'hyperscaler custom silicon이 외부 매출로 나올 수 있습니다. GCP TPU 가격·대형 계약을 확인하세요.',
    footer:'GOOGL · TPU v8',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Google TPU v8 targets broader AI market beyond internal use',
    heroBig:'TPU v8',
    heroSub:'8th-gen Tensor Processing Unit aimed at external AI market, not just Google workloads.',
    chip1big:'v8',
    chip1sub:'Next TPU',
    chip2big:'External',
    chip2sub:'Broader market',
    cards:[{icon:'🔬',big:'TPU v8',mid:'ASIC',sub:'AI chip'},{icon:'☁️',big:'GCP',mid:'Cloud',sub:'External sales'},{icon:'⚔️',big:'Alt',mid:'vs NVDA',sub:'GPU rival'}],
    quote:'"TPU v8 targets the broader AI market beyond internal Google workloads. Custom silicon as a cloud alternative to GPU dominance. Availability and software stack are gating factors."',
    noteHead:'Why this matters',
    noteSub:'Hyperscaler silicon may externalize. Watch GCP TPU pricing and logos.',
    footer:'GOOGL · TPU v8',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'macro-us-banks-unrealized-511b', symbol:'MACRO', layout:'tplBreaking', seed:'seed-1212',
  category:'매크로', categoryColor:'red', subject:'금리', tickers:['MACRO'],
  title:'미국 은행 미실현 손실 5,117억 달러로 직전 2분기 연속 증가했습니다',
  summary:'BREAKING: 미국 은행 미실현 손실(unrealized losses) 5,117억 달러($511.7B). 직전 2분기 연속 증가. 금리·채권 평가와 AI·DC debt narrative가 겹칩니다.',
  titleEn:'BREAKING: US banks unrealized losses $511.7B, up two prior quarters',
  summaryEn:'Unrealized losses $511.7B, grew for two prior quarters.',
  body: `■ 상세

미실현 손실(unrealized losses)은 은행이 보유한 채권·증권의 시장가치 하락으로 장부에 잡히지만 아직 실현(sell)하지 않은 손실입니다. Held-to-maturity(만기보유) 포트폴리오에서 특히 논쟁이 됩니다.

이번 수치는 5,117억 달러(\$511.7B)이며, 직전 2분기 연속 증가했습니다. 장기금리 상승·채권 가격 하락·지역은행 stress memory와 연결됩니다.

AI CAPEX·\$700B+ DC debt·NVDA earnings와 같은 주 macro 화면에서, bank balance sheet capacity가 AI financing wall의 변수입니다.

■ 왜 이 뉴스가 중요한가

1. \$511.7B는 system-wide bond mark risk입니다.

2. 2 quarters up은 추세 신호입니다.

3. unrealized≠immediate failure but limits lending.

4. 금리 peak·cut path와 반대 방향.

5. regional vs money center mix matters.

■ 시나리오

**A: rate cut→marks recover.**
**B: further rate up→losses widen.**
**C: forced sales tail risk low but sentiment hit.**

■ 오늘까지 흐름

- Long yields·bond prices
- \$511.7B unrealized
- DC \$700B debt same week

■ 반대 관점

(1) HTM accounting
(2) deposit flight
(3) regulatory forbearance
(4) hedge
(5) equity raise

■ 앞으로 볼 것

(1) quarterly FDIC/OCC
(2) 10Y yield
(3) bank earnings
(4) credit spreads
(5) loan growth

■ 투자시사점

은행 marks는 macro risk overlay입니다. 금리·분기 보고서와 함께 추적하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'미국 은행 미실현 손실 5,117억 달러로 직전 2분기 연속 증가했습니다',
    heroBig:'$511.7B',
    heroSub:'미실현 손실 5,117억 달러. 직전 2분기 연속 증가. 채권 평가와 금리 민감도.',
    cards:[{icon:'🏦',big:'$511.7B',mid:'미실현',sub:'은행 전체'},{icon:'📉',big:'2분기',mid:'연속 증가',sub:'추세'},{icon:'📊',big:'채권',mid:'평가손',sub:'HTM·AFS'}],
    quote:'"미국 은행 미실현 손실이 5,117억 달러로 집계됐고, 2분기 연속 늘었습니다. 아직 팔지 않은 채권 평가 손실입니다. 금리와 채권 가격이 변수이며, AI·데이터센터 부채와 같은 화면의 금융 여력 이슈입니다."',
    noteSub:'macro overlay입니다. 실현 손실과 예금 이탈을 분리해 보시고, 분기 은행 보고서를 확인하세요.',
    footer:'MACRO · bank unrealized',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'BREAKING: US bank unrealized losses $511.7B',
    heroBig:'$511.7B',
    heroSub:'Unrealized losses $511.7B, up two prior quarters. Bond marks and rate sensitivity.',
    cards:[{icon:'🏦',big:'$511.7B',mid:'Unrealized',sub:'All banks'},{icon:'📉',big:'2Q',mid:'Consecutive',sub:'Increase'},{icon:'📊',big:'Bonds',mid:'Mark loss',sub:'HTM·AFS'}],
    quote:'"US bank unrealized losses hit $511.7B, rising two quarters in a row. Paper losses on bonds—not yet sold. Rates and AI financing capacity sit on the same screen."',
    noteSub:'Macro overlay. Separate marks from deposit flight. Watch quarterly bank filings.',
    footer:'MACRO · unrealized losses',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'tsla-cybertruck-price-5000', symbol:'TSLA', layout:'tplCompare', seed:'seed-1213',
  category:'종목분석', categoryColor:'mint', subject:'테슬라', tickers:['TSLA'],
  title:'사이버트럭 가격이 5,000달러 인상됐습니다',
  summary:'Cybertruck 가격 +$5,000 인상. 수요·원가·마진·경쟁 EV pickup과 연결. 가격 lever는 demand elasticity test입니다.',
  titleEn:'Cybertruck price increased by $5,000',
  summaryEn:'Cybertruck gets a $5,000 price hike.',
  body: `■ 상세

사이버트럭(Cybertruck)은 테슬라의 각진 스테인리스 전기 픽업입니다. 이번 변경은 가격 5,000달러(+ \$5,000) 인상입니다.

인상은 원가(스테인리스·4680·생산 수율), 마진 방어, 수요 과열 완화, 또는 옵션 mix 변경 등 여러 해석이 가능합니다. EV pickup 경쟁(Rivian R1T, Ford F-150 Lightning 등)과 가격 대비를 봐야 합니다.

로보택시·세미와 다른 passenger/cycle 축이지만, 브랜드 pricing power와 reservation cancel율 변수입니다.

■ 왜 이 뉴스가 중요한가

1. +\$5K는 visible price lever입니다.

2. 인상 후 주문·cancel율이 demand test.

3. 스테인리스·수율 원가 압력 가능.

4. pickup EV 경쟁 pricing map.

5. 마진 vs volume tradeoff.

■ 시나리오

**A: demand holds→margin up.**
**B: cancel↑→promo return.**
**C: competitor undercut.**

■ 오늘까지 흐름

- Cybertruck production
- +\$5K price hike
- Robotaxi same week

■ 반대 관점

(1) elastic demand
(2) inventory build
(3) incentive return
(4) raw material
(5) brand

■ 앞으로 볼 것

(1) configurator price
(2) delivery wait
(3) cancel data
(4) competitor MSRP
(5) gross margin

■ 투자시사점

가격 인상은 demand test입니다. 주문 대기·취소·재고를 추적하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'사이버트럭 가격이 5,000달러 인상됐습니다',
    heroBig:'+$5,000',
    heroSub:'Cybertruck 가격 5,000달러 인상. 수요·원가·마진·경쟁 픽업과 연결.',
    beforeLabel:'인상 전',
    beforeBig:'기존가',
    beforeSub:'MSRP',
    afterLabel:'인상 후',
    afterBig:'+$5K',
    afterSub:'신규 가격',
    cards:[{icon:'🛻',big:'+$5K',mid:'인상',sub:'Cybertruck'},{icon:'📋',big:'수요',mid:'주문·취소',sub:'elasticity'},{icon:'⚔️',big:'경쟁',mid:'EV pickup',sub:'Rivian·Ford'}],
    quote:'"사이버트럭 가격이 5,000달러 올랐습니다. 원가·마진·수요를 동시에 조정하는 lever입니다. 인상 후에도 주문이 유지되는지, 취소가 늘지는지가 다음 확인 포인트입니다."',
    noteHead:'왜 중요한가',
    noteSub:'pricing power vs demand elasticity입니다. 설정 페이지 가격과 대기 기간을 확인하세요.',
    footer:'TSLA · Cybertruck +$5K',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Cybertruck price up $5,000',
    heroBig:'+$5,000',
    heroSub:'Cybertruck MSRP raised by $5,000. Tests demand, cost, and margin.',
    beforeLabel:'Before',
    beforeBig:'Prior',
    beforeSub:'MSRP',
    afterLabel:'After',
    afterBig:'+$5K',
    afterSub:'New price',
    cards:[{icon:'🛻',big:'+$5K',mid:'Hike',sub:'Cybertruck'},{icon:'📋',big:'Demand',mid:'Orders',sub:'Elasticity'},{icon:'⚔️',big:'Rivals',mid:'EV pickup',sub:'Comp set'}],
    quote:'"Cybertruck price rose $5,000. A lever on cost, margin, and demand. Watch orders, cancellations, and wait times after the hike."',
    noteHead:'Why this matters',
    noteSub:'Pricing power test. Check configurator and delivery queue.',
    footer:'TSLA · Cybertruck +$5K',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }},

{ file:'anthropic-nscale-45b-vera-rubin', symbol:'AI', layout:'tplDday', seed:'seed-1214',
  category:'매크로', categoryColor:'purple', subject:'AI', tickers:['MACRO'],
  title:'앤트로픽·Nscale 450억 달러·베라 루빈·460MW 내년 말 가동이 잡혔습니다',
  summary:'Anthropic–Nscale $45B, Vera Rubin chips, 6-year 460MW deal, late next year online. AI compute supply chain·IPO narrative 연결.',
  titleEn:'Anthropic Nscale $45B, Vera Rubin, 460MW online late next year',
  summaryEn:'$45B Nscale deal, Vera Rubin chips, 6-year 460MW, online late next year.',
  body: `■ 상세

Nscale는 AI 데이터센터·GPU 호스팅 인프라 업체로 읽힙니다. 앤트로픽(Anthropic)과 450억 달러(\$45B), 6-year, 460MW(megawatt) 규모 계약이 잡혔습니다.

칩은 Vera Rubin(NVIDIA next-gen platform) 기반입니다. 가동(online) 시점은 late next year(내년 말)로 표시됩니다. MW는 전력·compute capacity proxy입니다.

Anthropic IPO odds·NVDA supply·DC debt narrative와 같은 AI infra bundle입니다. \$45B는 committed capex/offtake signal이지만 execution risk remains.

■ 왜 이 뉴스가 중요한가

1. \$45B는 multi-year compute commitment입니다.

2. 460MW는 대형 AI factory scale.

3. Vera Rubin tie는 NVDA supply chain.

4. late next year online은 calendar anchor.

5. Anthropic IPO·revenue growth lever.

■ 시나리오

**A: on-time energize→capacity online.**
**B: power·chip delay.**
**C: contract scale revision.**

■ 오늘까지 흐름

- Anthropic IPO odds
- Nscale \$45B·460MW
- NVDA Vera Rubin

■ 반대 관점

(1) \$45B not all upfront
(2) power permit
(3) chip allocation
(4) competition
(5) financing

■ 앞으로 볼 것

(1) construction milestone
(2) MW energized
(3) Rubin shipment
(4) Anthropic revenue
(5) Nscale partners

■ 투자시사점

compute contract는 AI growth의 physical layer입니다. MW energize·Rubin shipment를 추적하시면 됩니다.

investus.kr SRP 최고투자책임자 발행`,
  ko:{
    title:'앤트로픽·Nscale 450억 달러·베라 루빈·460MW 내년 말 가동이 잡혔습니다',
    heroBig:'$45B',
    ddayLabel:'내년 말 가동',
    heroSub:'6년 460MW, Vera Rubin 칩. Nscale 인프라에 앤트로픽 compute commitment.',
    cards:[{icon:'💰',big:'$45B',mid:'계약',sub:'6-year'},{icon:'⚡',big:'460MW',mid:'전력',sub:'AI factory'},{icon:'🧠',big:'Vera Rubin',mid:'칩',sub:'NVDA next-gen'}],
    quote:'"앤트로픽과 Nscale이 450억 달러, 6년, 460MW 규모로 맞손했습니다. Vera Rubin 칩, 내년 말 가동 목표입니다. AI 수요를 전력·칩·부지로 전환하는 계약입니다. 일정·전력·칩 allocation을 단계별로 확인하세요."',
    noteHead:'왜 중요한가',
    noteSub:'Anthropic growth와 NVDA supply의 접점입니다. MW online과 Rubin 출하가 관건입니다.',
    footer:'AI · Nscale $45B',
    brand:'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE',
  },
  en:{
    title:'Anthropic Nscale $45B, Vera Rubin, 460MW late next year',
    heroBig:'$45B',
    ddayLabel:'ONLINE LATE NEXT YEAR',
    heroSub:'6-year 460MW deal on Vera Rubin chips. Nscale infra for Anthropic compute.',
    cards:[{icon:'💰',big:'$45B',mid:'Deal',sub:'6-year'},{icon:'⚡',big:'460MW',mid:'Power',sub:'AI factory'},{icon:'🧠',big:'Vera Rubin',mid:'Chips',sub:'Next-gen'}],
    quote:'"$45B, 6-year, 460MW Anthropic–Nscale deal on Vera Rubin chips, online late next year. Track power, chips, and construction milestones."',
    noteHead:'Why this matters',
    noteSub:'Links Anthropic growth to NVDA supply. MW online is the gating item.',
    footer:'AI · Nscale $45B',
    brand:'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE',
  }}
];
function buildSeedSummary() {
  return `  // ── 2026-08-27 신규 ──────────────────────────────────────────────────────
  { id: "seed-1201", title: '2026년 8월 27일 한장 요약입니다. NVDA 2분기 beat·SPCX 1.8T·로보택시 16h·DC 부채 7,000억+·은행 미실현 5,117억을 모았습니다', summary: '엔비디아 2분기 매출 961억·EPS 2.22로 beat했지만 시간외 -2%였습니다. 앤트로픽 IPO 확률 63%, 스페이스X 1.8T·루이지애나 cadence·테라팹 1,190억, DC 부채 7,000억+, 테슬라 로보택시 16h·그록 2.0, 메타 compute 재판매, TPU v8, 은행 미실현 5,117억, 사이버트럭 +5,000, Nscale 450억도 같이 보시기 바랍니다.',
    body: "",
    titleEn: 'Daily snapshot August 27, 2026: NVDA Q2, SpaceX $1.8T, robotaxi 16h, DC debt $700B+, bank unrealized $511.7B',
    summaryEn: 'Nvidia Q2 beat but AH -2%. Anthropic 63% IPO odds, SpaceX $1.8T, Louisiana cadence, Terafab $119B, DC $700B+ debt, Tesla robotaxi 16h, Grok 2.0, Meta compute resale, TPU v8, bank unrealized $511.7B, Cybertruck +$5K, Nscale $45B.',
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
  const summaryTickers = "['NVDA', 'TSLA', 'SPCX', 'META', 'GOOGL', 'MACRO', 'AI']";
  const lines = [`  // 2026-08-27`, `  "seed-1201": ${summaryTickers},`];
  for (const t of TOPICS) {
    lines.push(`  "${t.seed}": [${t.tickers.map(x => `'${x}'`).join(', ')}],`);
  }
  return lines.join('\n');
}

function buildWallPosts() {
  const posts = [
    ['NVDA', 'NVDA 2분기 961억 beat인데 AH -2%?? 가이던스 봐야지'],
    ['MACRO', '앤트로픽 63% vs 스페이스X 37% 2026 최대 IPO odds'],
    ['SPCX', '스페이스X 1.8T 51일째 1T 위. ATH 226'],
    ['SPCX', '루이지애나 12+타워 30척/일 200만톤/년??'],
    ['SPCX', '테라팹 텍사스 +480억 총 1190억 sub-2nm'],
    ['MACRO', 'DC 66GW 파이프라인 부채 7000억+ JLL 미쳤다'],
    ['TSLA', '로보택시 6개 도시 16시간 6am-10pm 무인도 늘었다네'],
    ['TSLA', '그록 Think Fast 2.0 S2S 1위 차량 내비 음악 제어'],
    ['META', '메타 5GW 잉여 재판매 ROI 38%?? WF 시나리오'],
    ['GOOGL', 'TPU v8 내부용 아니고 broader market 겨냥'],
    ['MACRO', '은행 미실현손실 5117억 2분기 연속 증가 BREAKING'],
    ['TSLA', '사이버트럭 5000달러 올랐대 +5K'],
    ['MACRO', '앤트로픽 Nscale 450억 460MW Vera Rubin 내년말'],
    ['NVDA', '오늘 NVDA 실적+SPCX+로보택시+은행손실 한판 정리'],
  ];
  let out = '  // ── 2026-08-27 신규 ────────────────\n';
  posts.forEach((p, i) => {
    const id = 1103 + i;
    const nick = `익명_${3100 + i * 17}`;
    out += `  { id: ${id}, symbol: "${p[0]}", nickname: "${nick}", holdingLabel: "관심종목",\n    content: "${p[1]}",\n    createdAt: T27AU + ${(i + 1) * 8}*60_000, likes: ${10 + (i % 7)}, comments: ${i % 3 === 0 ? 2 : 1} },\n`;
  });
  return out;
}

function buildWallComments() {
  const comments = [
    [1103, ['beat인데 -2%면 가이던스 약한 거 아님', 'DC 890억은 여전히 크다']],
    [1104, ['polymarket odds는 S-1 전까지 변함', '스페이스X delay면 역전']],
    [1105, ['private mark vs 상장가 gap', '7B volume이 핵심']],
    [1106, ['30/day 현실성… 허가부터', '200만톤/year 목표']],
    [1107, ['1190억이면 funding', 'sub-2nm는 NVDA랑 겹침']],
    [1108, ['7000억 debt 금리 올라가면', '은행 미실현이랑 연결']],
    [1109, ['16h≠유료 승객', 'FL 3개 도시 확장']],
    [1110, ['벤치 1위 vs 실차 UX', 'OTA 언제']],
    [1111, ['시나리오일 뿐 가이던스 아님', '5GW excess 가정']],
    [1112, ['NVDA 대안 실리콘', 'GCP 가격 봐야']],
    [1113, ['HTM 채권 평가손', '금리 cut이면 회복']],
    [1114, ['+5K 후 cancel율', 'Rivian이랑 비교']],
    [1115, ['460MW 전력 허가', 'Rubin 출하']],
    [1116, ['한장요약 8/27', 'NVDA+macro bundle']],
  ];
  let out = '  // ── 2026-08-27 신규 댓글 ────────────────\n';
  for (const [postId, lines] of comments) {
    out += `  ${postId}: [\n`;
    lines.forEach((c, j) => {
      out += `    { id: ${j + 1}, nickname: "익명_${3200 + postId + j * 3}", holdingLabel: "관심종목", content: "${c}", createdAt: T27AU + ${Math.floor(postId - 1102) * 8}*60_000 + ${(j + 1) * 3}*60_000, likes: ${4 + j} },\n`;
    });
    out += `  ],\n`;
  }
  return out;
}

function buildAnalystPosts() {
  const items = [
    [-903, '성수 너구리 #15', 'NVDA', '2분기 매출 961억·EPS 2.22·DC 890억·GM 75%로 beat였습니다.\n시간외 -2%는 가이던스·기대치 문제로 읽히며, 3분기 코멘트를 확인하겠습니다.', 2],
    [-904, '한남 재규어 #27', 'MACRO', '2026 최대 IPO odds: Anthropic 63%, SpaceX 37%.\n확률은 thermometer이며 S-1·일정으로 검증하시면 됩니다.', 1],
    [-905, '압구정 치타 #44', 'SPCX', '시가총액 $1,826B, 51일 $1T+.\n발행가 $135, ATH $226, volume ~$7B.\nprivate mark와 상장가는 다를 수 있습니다.', 2],
    [-906, '여의도 수리 #28', 'SPCX', '루이지애나: 12+ towers, 30+ Starship/day, 2M+ tons/year.\n허가·flight rate를 계획과 분리해 추적하겠습니다.', 1],
    [-907, '삼성동 올빼미 #19', 'SPCX', 'Terafab Texas +$48B, total $119B, Phase 1 $16.8B committed.\nsub-2nm AI chips, Dec 2026–Dec 2028 build window입니다.', 0],
    [-908, '광화문 여우 #62', 'MACRO', '66GW DC pipeline, $700B+ permanent debt through 2028.\nMSFT·META·GOOG·AMZN·ORCL capex·debt bundle입니다.', 2],
    [-909, '마포 살쾡이 #08', 'TSLA', '로보택시 6 cities, 16h/day 6am–10pm.\nunsupervised fleet growth cited.\n유료 마일로 검증하겠습니다.', 2],
    [-910, '판교 늑대 #90', 'TSLA', 'Grok Think Fast 2.0 #1 speech-to-speech.\nvehicle·nav·music control.\n벤치 1위와 OTA rollout은 다릅니다.', 1],
    [-911, '분당 매 #31', 'META', '5GW excess compute resale by 2030.\n$38B/GW capex, $20B/GW rev, 38% ROI scenario.\n모델과 가이던스를 분리하세요.', 2],
    [-912, '해운대 고래 #03', 'GOOGL', 'TPU v8 targets broader AI market beyond internal.\nGCP pricing·availability가 채택 관건입니다.', 0],
    [-913, '송파 독수리 #66', 'MACRO', 'US bank unrealized losses $511.7B, up two quarters.\nDC debt·NVDA earnings와 같은 macro screen입니다.', 2],
    [-914, '인천 갈매기 #52', 'TSLA', 'Cybertruck +$5,000 price hike.\n주문·cancel율이 demand elasticity test입니다.', 1],
    [-915, '역삼 판다 #77', 'MACRO', 'Anthropic–Nscale $45B, 460MW, Vera Rubin, online late next year.\nMW energize가 gating item입니다.', 2],
    [-916, '종로 까치 #41', 'NVDA', '오늘 bundle: NVDA beat/AH -2%, SpaceX $1.8T, bank $511.7B unrealized.\n실물 AI capex와 financial overlay를 함께 보시면 됩니다.', 1],
  ];
  const base = '2026-08-27T00:';
  let out = '  // ── 2026-08-27 신규 (14개 · 존댓말 · 구조 혼합) ──────────────────────\n';
  items.forEach(([id, alias, symbol, content, comments], i) => {
    const min = String(i * 7).padStart(2, '0');
    out += `  {\n    id: ${id}, alias: "${alias}", symbol: "${symbol}",\n    content: "${content.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",\n    likes: ${11 + (i % 5)}, comments: ${comments}, created_at: "${base}${min}:00.000Z", liked: false,\n  },\n`;
  });
  return out;
}

function buildAnalystComments() {
  const pairs = [[-903, ['3분기 가이던스가 AH -2% 원인일까요']], [-905, ['51일 $1T+ 지속 가능?']], [-908, ['7000억 debt와 은행 미실현 연결']], [-909, ['6 cities 유료 마일 공개 시점']], [-911, ['5GW excess 현실성']], [-913, ['5117억 추세 반전 조건']], [-915, ['460MW 전력 허가 일정']]];
  let out = '';
  for (const [id, lines] of pairs) {
    out += `  [${id}]: [\n`;
    lines.forEach((c, j) => {
      out += `    { alias: "댓글_270${Math.abs(id)}", content: "${c}", created_at: "2026-08-27T00:${String(10 + j).padStart(2, '0')}:00.000Z" },\n`;
    });
    out += `  ],\n`;
  }
  return out;
}

function buildPairsBlock() {
  const lines = [`  // ── 2026-08-27 ─────────────────────────────────────────────────────────`];
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
    /(\{ id: "seed-1101"[\s\S]*?)isPinned: true/,
    '$1isPinned: false'
  );
  const insert = buildSeedSummary() + ',\n' + TOPICS.map(buildSeedReport).join(',\n') + ',\n';
  c = patch(c, 'export const SEED_REPORTS: Report[] = [\n  // ── 2026-08-26', `export const SEED_REPORTS: Report[] = [\n${insert}  // ── 2026-08-26`, 'SEED_REPORTS insert');
  const tickers = buildTickersBlock() + '\n';
  c = patch(c, 'export const REPORT_TICKERS: Record<string, string[]> = {\n  // 2026-08-26', `export const REPORT_TICKERS: Record<string, string[]> = {\n${tickers}  // 2026-08-26`, 'REPORT_TICKERS insert');
  write('lib/reports.ts', c);
}

function patchWallPosts() {
  let c = read('lib/wallPosts.ts');
  c = patch(c, 'const T26AU = 1787698800000;', 'const T27AU = 1787785200000; // 2026-08-27 08:00 KST\nconst T26AU = 1787698800000;', 'T27AU');
  c = patch(c, 'export const LATEST_UPDATE = T26AU;', 'export const LATEST_UPDATE = T27AU;', 'LATEST_UPDATE');
  c = patch(c, 'export const MOCK_POSTS: Post[] = [\n  // ── 2026-08-26', `export const MOCK_POSTS: Post[] = [\n${buildWallPosts()}`, 'MOCK_POSTS');
  c = patch(c, 'export const MOCK_COMMENTS: Record<number, Comment[]> = {\n  // ── 2026-08-26', `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${buildWallComments()}`, 'MOCK_COMMENTS');
  write('lib/wallPosts.ts', c);
}

function patchAnalystPosts() {
  let c = read('lib/analystPosts.ts');
  c = patch(c, 'export const MOCK_ANALYST_POSTS: AnalystMockPost[] = [\n  // ── 2026-08-26', `export const MOCK_ANALYST_POSTS: AnalystMockPost[] = [\n${buildAnalystPosts()}`, 'MOCK_ANALYST_POSTS');
  c = patch(c, 'export const MOCK_ANALYST_COMMENTS: Record<number, AnalystMockComment[]> = {\n  [-891]:', `export const MOCK_ANALYST_COMMENTS: Record<number, AnalystMockComment[]> = {\n${buildAnalystComments()}  [-891]:`, 'MOCK_ANALYST_COMMENTS');
  write('lib/analystPosts.ts', c);
}

function patchExportPairs() {
  let c = read('scripts/export-report-pngs.js');
  c = patch(c, 'const PAIRS = [\n  // ── 2026-08-26 ─────────────────────────────────────────────────────────', `const PAIRS = [\n${buildPairsBlock()}\n  // ── 2026-08-26 ─────────────────────────────────────────────────────────`, 'PAIRS insert');
  write('scripts/export-report-pngs.js', c);
}

function main() {
  const svgOnly = process.argv.includes('--svg-only');
  console.log('=== Investus 2026-08-27 report build' + (svgOnly ? ' (SVG only)' : '') + ' ===');
  const svgCount = writeSvgs();
  console.log(`✅ ${svgCount} SVG written to public/charts/`);
  if (svgOnly) { console.log('Done (SVG only).'); return; }
  patchReports();
  console.log('✅ lib/reports.ts patched (seed-1101 unpinned, seed-1201–1214, tickers)');
  patchWallPosts();
  console.log('✅ lib/wallPosts.ts patched (T27AU, posts 1103–1116, comments)');
  patchAnalystPosts();
  console.log('✅ lib/analystPosts.ts patched (-903 to -916)');
  patchExportPairs();
  console.log('✅ scripts/export-report-pngs.js PAIRS updated');
  console.log('Done.');
}

main();
