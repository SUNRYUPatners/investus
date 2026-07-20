// 2026-07-21 팩트체크 수정: SPCX Baron→TSLA 분리
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'public', 'charts');

const PSYM = {
  TSLA: { fg:'#4ade80', fg2:'#22c55e', bg2:'#061209', card:'#0a1a0a' },
  SPCX: { fg:'#c084fc', fg2:'#a78bfa', bg2:'#140b1f', card:'#1a0f2a' },
};
function esc(s){return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g,'&amp;').replace(/</g,'&lt;');}
function E(o){const r={};for(const k in o)r[k]=typeof o[k]==='string'?esc(o[k]):o[k];return r;}

function tpl(oRaw) {
  const o = E(oRaw);
  const p = PSYM[oRaw.symbol];
  const cards = oRaw.cards.map((cRaw, i) => {
    const c = E(cRaw);
    const x = [60, 390, 720][i];
    return `
  <rect x="${x}" y="402" width="300" height="190" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
  <text x="${x+150}" y="456" font-family="Arial" font-size="44" text-anchor="middle">${c.icon}</text>
  <text x="${x+150}" y="512" font-family="Arial Black,Arial" font-size="30" font-weight="900" fill="${p.fg}" text-anchor="middle">${c.big}</text>
  <text x="${x+150}" y="548" font-family="Arial" font-size="22" fill="#9ca3af" text-anchor="middle">${c.mid}</text>
  <text x="${x+150}" y="578" font-family="Arial" font-size="18" fill="#6b7280" text-anchor="middle">${c.sub}</text>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0d1117"/><stop offset="100%" style="stop-color:${p.bg2}"/></linearGradient>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${p.fg}"/><stop offset="100%" style="stop-color:${p.fg2}"/></linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <rect width="1080" height="1080" fill="none" stroke="#1f2937" stroke-width="2"/>
  <rect x="0" y="0" width="1080" height="5" fill="url(#g)"/>
  <rect x="40" y="20" width="140" height="38" rx="19" fill="${p.fg}30" stroke="${p.fg}" stroke-width="1.5"/>
  <text x="110" y="44" font-family="Arial Black,Arial" font-size="16" font-weight="900" fill="${p.fg}" text-anchor="middle">${o.badge}</text>
  <text x="540" y="46" font-family="Arial" font-size="13" fill="#6b7280" text-anchor="middle" letter-spacing="3">INVESTUS DAILY REPORT</text>
  <rect x="900" y="20" width="148" height="38" rx="19" fill="#1f2937" stroke="#374151"/>
  <text x="974" y="44" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle">2026.07.21</text>
  <text x="540" y="102" font-family="Arial Black,Arial" font-size="${o.title.length>28?26:30}" font-weight="900" fill="#f9fafb" text-anchor="middle">${o.title}</text>
  <line x1="80" y1="120" x2="1000" y2="120" stroke="#1f2937" stroke-width="1"/>
  <text x="540" y="256" font-family="Arial Black,Arial" font-size="110" font-weight="900" fill="${p.fg}" text-anchor="middle" opacity=".12">${o.heroIcon}</text>
  <text x="540" y="256" font-family="Arial Black,Arial" font-size="94" font-weight="900" fill="${p.fg}" text-anchor="middle">${o.heroIcon}</text>
  <text x="540" y="316" font-family="Arial Black,Arial" font-size="46" font-weight="900" fill="#f9fafb" text-anchor="middle">${o.heroBig}</text>
  <text x="540" y="356" font-family="Arial" font-size="22" fill="#9ca3af" text-anchor="middle">${o.heroSub}</text>
  <line x1="80" y1="384" x2="1000" y2="384" stroke="#1f2937" stroke-width="1"/>
${cards}
  <rect x="60" y="612" width="960" height="180" rx="16" fill="#0f172a" stroke="#374151"/>
  <text x="540" y="656" font-family="Arial" font-size="20" fill="#6b7280" text-anchor="middle" letter-spacing="2">${o.quoteLabel}</text>
  <text x="540" y="700" font-family="Arial" font-size="24" fill="${p.fg}" text-anchor="middle">${o.quoteKo}</text>
  <text x="540" y="740" font-family="Arial" font-size="20" fill="#e5e7eb" text-anchor="middle">${o.quoteEn}</text>
  <text x="540" y="776" font-family="Arial" font-size="18" fill="#6b7280" text-anchor="middle">${o.source}</text>
  <rect x="60" y="812" width="960" height="100" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1"/>
  <text x="540" y="854" font-family="Arial" font-size="24" fill="${p.fg}" text-anchor="middle">${o.noteHead}</text>
  <text x="540" y="890" font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle">${o.noteSub}</text>
  <text x="540" y="974" font-family="Arial" font-size="20" fill="#374151" text-anchor="middle">${o.footer} · 2026.07.21</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#g)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${o.brand}</text>
</svg>`;
}

const BRAND_KO = 'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE';
const BRAND_EN = 'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE';

const T = [
// SPCX (Baron 제거)
{ file:'spcx-retail-320m-timmons', symbol:'SPCX', badge:'SPCX',
  ko:{ title:'SPCX — 개인 자금 월 $320M 유입 (1위) · Rep. Timmons 매수', heroIcon:'💰', heroBig:'$320 M', heroSub:'월 개인 유입 개별종목 압도적 1위 · 의원 최대 $250K 매수 신고',
    cards:[{icon:'💰',big:'$320 M',mid:'월 개인 유입',sub:'개별종목 1위 (Barchart)'},{icon:'🏛️',big:'≤$250 K',mid:'Rep. Timmons 매수',sub:'Quiver Quantitative'},{icon:'🐻',big:'−44%·$6.1B',mid:'낙폭·숏 컨텍스트',sub:'2026-07-20 리포트'}],
    quoteLabel:'BARCHART · QUIVER QUANTITATIVE', quoteKo:'"이번 달 개인 자금이 SPCX에 $320M — 압도적 1위"', quoteEn:'"Retail investors poured $320M into SPCX this month — by far the most of any single stock"',
    source:'Source: Barchart · Quiver Quantitative · 2026.07.20',
    noteHead:'하락(-44%)·숏 급증($6.1B)에도 개인·인사이더 관심 유지', noteSub:'실적(8/4)·Starship Flight 13 결과가 실제 방향 결정',
    footer:'SPCX · Retail $320M · Timmons', brand:BRAND_KO },
  en:{ title:'SPCX — Retail Inflow $320M/mo (#1) · Rep. Timmons Buy', heroIcon:'💰', heroBig:'$320 M', heroSub:'#1 monthly retail flow among individual stocks · lawmaker filed up to $250K buy',
    cards:[{icon:'💰',big:'$320 M',mid:'Monthly retail flow',sub:'#1 stock (Barchart)'},{icon:'🏛️',big:'≤$250 K',mid:'Rep. Timmons buy',sub:'Quiver Quantitative'},{icon:'🐻',big:'−44%·$6.1B',mid:'Drawdown / short context',sub:'per 2026-07-20 report'}],
    quoteLabel:'BARCHART · QUIVER QUANTITATIVE', quoteKo:'"개인 $320M — 개별종목 압도적 1위"', quoteEn:'"Retail investors poured $320M into SPCX this month — by far the most of any single stock"',
    source:'Source: Barchart · Quiver Quantitative · 2026.07.20',
    noteHead:'Retail & insider interest holds through -44% and $6.1B short spike', noteSub:'Earnings (Aug 4) + Flight 13 will set actual direction',
    footer:'SPCX · Retail $320M · Timmons', brand:BRAND_EN } },

// TSLA (Baron $10K — 신규)
{ file:'tsla-baron-10k-optimus', symbol:'TSLA', badge:'TSLA',
  ko:{ title:'TSLA — Ron Baron: Optimus 덕분에 10년 내 주당 $10,000 예상', heroIcon:'🎯', heroBig:'$10,000', heroSub:'Ron Baron 장기 상방 프레임 · Optimus 앵커 · 10년 내 도달 예상',
    cards:[{icon:'🎯',big:'$10,000',mid:'주당 목표(10년)',sub:'Ron Baron 전망'},{icon:'🤖',big:'Optimus',mid:'상방의 앵커',sub:'Tesla 휴머노이드'},{icon:'⚠️',big:'티커 오기',mid:'원 트윗 $SpaceX',sub:'Optimus는 TSLA — TSLA로 재편'}],
    quoteLabel:'EVA MCMILLAN (원문 티커 오기 주의)', quoteKo:'"Ron Baron은 Optimus 덕분에 10년 내 주당 $10,000 도달 예상"', quoteEn:'"Ron Baron thinks it will claim $10,000 per share in 10 years thanks to Optimus"',
    source:'Source: Eva McMillan · 2026.07.20 (원문 티커 $SpaceX → 논거상 TSLA 재분류)',
    noteHead:'Baron이 반복적으로 Tesla 상방 프레임에 Optimus를 앵커로 사용해온 히스토리와 일치', noteSub:'상용화 시점·양산·단위경제가 검증 축 · 확정 촉매 아님',
    footer:'TSLA · Baron $10K / Optimus', brand:BRAND_KO },
  en:{ title:'TSLA — Ron Baron Sees $10,000/share in 10 Years Thanks to Optimus', heroIcon:'🎯', heroBig:'$10,000', heroSub:'Long-term upside anchor · Optimus-driven · 10-year horizon',
    cards:[{icon:'🎯',big:'$10,000',mid:'Per-share target (10y)',sub:'Ron Baron view'},{icon:'🤖',big:'Optimus',mid:'Upside anchor',sub:'Tesla humanoid'},{icon:'⚠️',big:'Ticker typo',mid:'Tweet said $SpaceX',sub:'Optimus is TSLA — refiled'}],
    quoteLabel:'EVA MCMILLAN (source-typo caveat)', quoteKo:'"Baron: 10년 내 $10K/share, Optimus 덕분"', quoteEn:'"Ron Baron thinks it will claim $10,000 per share in 10 years thanks to Optimus"',
    source:'Source: Eva McMillan · 2026.07.20 (original ticker $SpaceX — reclassified to TSLA on logic)',
    noteHead:'Consistent with Baron\'s recurring use of Optimus as Tesla upside anchor', noteSub:'Verify via commercialization timing, ramp, and unit economics — not a hard catalyst',
    footer:'TSLA · Baron $10K / Optimus', brand:BRAND_EN } },
];

let n = 0;
for (const t of T) {
  const koWith = { ...t.ko, symbol: t.symbol };
  const enWith = { ...t.en, symbol: t.symbol };
  fs.writeFileSync(path.join(OUT, `${t.file}-20260721.svg`),    tpl(koWith));
  fs.writeFileSync(path.join(OUT, `${t.file}-20260721-en.svg`), tpl(enWith));
  n += 2;
}
console.log(`✅ ${n} 파일 재생성`);
