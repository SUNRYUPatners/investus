#!/usr/bin/env node
// Instagram card news — 2026-10-22 — TSLA Q3 Earnings Beat + Merger Committee
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/charts');

function escXml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function makeCardNews() {
  const W = 1080, H = 1350;

  function statBox(x, y, w, h, topLabel, bigNum, unit, subLabel, accent='#EF4444') {
    return `
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="#0F1623" stroke="${accent}" stroke-width="2.5"/>
      <text x="${x + w/2}" y="${y + 36}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${escXml(topLabel)}</text>
      <text x="${x + w/2}" y="${y + 102}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="60" font-weight="900" fill="${accent}">${escXml(bigNum)}</text>
      <text x="${x + w/2}" y="${y + 136}" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#D1D5DB">${escXml(unit)}</text>
      <text x="${x + w/2}" y="${y + 166}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">${escXml(subLabel)}</text>`;
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#020814"/>
      <stop offset="50%" stop-color="#060D1F"/>
      <stop offset="100%" stop-color="#0A0510"/>
    </linearGradient>
    <linearGradient id="accentG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="50%" stop-color="#F97316"/>
      <stop offset="100%" stop-color="#EAB308"/>
    </linearGradient>
    <linearGradient id="heroG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#FBBF24"/>
      <stop offset="50%" stop-color="#F97316"/>
      <stop offset="100%" stop-color="#EF4444"/>
    </linearGradient>
    <linearGradient id="mergerG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#A855F7"/>
      <stop offset="100%" stop-color="#EC4899"/>
    </linearGradient>
    <linearGradient id="msgG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#1A0D00"/>
      <stop offset="100%" stop-color="#0D0000"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowSoft">
      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- BG -->
  <rect width="${W}" height="${H}" fill="url(#bgG)"/>

  <!-- subtle grid lines -->
  <line x1="0" y1="490" x2="${W}" y2="490" stroke="#1F2937" stroke-width="1" opacity="0.35"/>
  <line x1="0" y1="870" x2="${W}" y2="870" stroke="#1F2937" stroke-width="1" opacity="0.35"/>

  <!-- top accent bar -->
  <rect x="0" y="0" width="${W}" height="8" fill="url(#accentG)"/>

  <!-- date + handle -->
  <text x="54" y="52" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">2026.10.22</text>
  <text x="${W - 54}" y="52" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">@investus.kr</text>

  <!-- badges -->
  <rect x="54" y="68" width="130" height="38" rx="19" fill="#7F1D1D" stroke="#EF4444" stroke-width="1.5"/>
  <text x="119" y="93" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#FCA5A5"># TSLA</text>

  <rect x="196" y="68" width="130" height="38" rx="19" fill="#3B0764" stroke="#A855F7" stroke-width="1.5"/>
  <text x="261" y="93" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#D8B4FE"># SPCX</text>

  <rect x="338" y="68" width="188" height="38" rx="19" fill="#1C1917" stroke="#F97316" stroke-width="1.5"/>
  <text x="432" y="93" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#FED7AA"># Q3 EARNINGS</text>

  <!-- divider -->
  <rect x="54" y="118" width="972" height="2" fill="url(#accentG)" opacity="0.6"/>

  <!-- HERO -->
  <text x="${W/2}" y="214" text-anchor="middle"
        font-family="Arial Black,Arial,sans-serif" font-size="92" font-weight="900"
        fill="url(#heroG)" filter="url(#glow)">MONSTER</text>
  <text x="${W/2}" y="298" text-anchor="middle"
        font-family="Arial Black,Arial,sans-serif" font-size="92" font-weight="900"
        fill="url(#heroG)" filter="url(#glow)">BEAT</text>

  <!-- hero sub -->
  <text x="${W/2}" y="354" text-anchor="middle"
        font-family="Arial Black,Arial,sans-serif" font-size="34" font-weight="900"
        fill="#F1F5F9">FCF $2.9B · EPS $0.72 · 2× CONSENSUS</text>

  <!-- descriptor -->
  <text x="${W/2}" y="400" text-anchor="middle"
        font-family="Arial,sans-serif" font-size="24" fill="#9CA3AF">Tesla Q3 2026 — demand exceeds supply by a significant margin</text>

  <!-- divider 2 -->
  <rect x="200" y="420" width="680" height="2" fill="url(#accentG)" opacity="0.4"/>

  <!-- merger alert banner -->
  <rect x="54" y="434" width="972" height="48" rx="14" fill="#1C0A2E" stroke="#A855F7" stroke-width="1.5"/>
  <text x="${W/2}" y="466" text-anchor="middle"
        font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#E9D5FF">🔥  MERGER  ·  Independent Special Committees confirmed — BOTH boards</text>

  <!-- 2×2 stat grid -->
  ${statBox(54,  494, 476, 188, 'Free Cash Flow', '$2.9B', 'vs $1.3B est', 'FCF margin at all-time high', '#F97316')}
  ${statBox(550, 494, 476, 188, 'EPS Beat', '$0.72', 'vs ~$0.35 est', 'Q3 2026 consensus ~2×', '#EAB308')}
  ${statBox(54,  700, 476, 188, 'Cybercab Fare', '$1.53', '/mile all-time low', '2M miles · 79% driverless', '#10B981')}
  ${statBox(550, 700, 476, 188, 'SPCX AI Rev', '+830%', 'YoY Q3 growth', '$7.56B SuperIntelligence', '#A855F7')}

  <!-- middle divider -->
  <rect x="54" y="896" width="972" height="1.5" fill="#1F2937"/>

  <!-- stats row -->
  <rect x="54" y="910" width="296" height="80" rx="14" fill="#0F1623" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="202" y="940" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#93C5FD">FSD Active Users</text>
  <text x="202" y="974" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="#3B82F6">1.74M · 9 Countries</text>

  <rect x="392" y="910" width="296" height="80" rx="14" fill="#0F1623" stroke="#10B981" stroke-width="1.5"/>
  <text x="540" y="940" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#6EE7B7">Deliveries</text>
  <text x="540" y="974" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="#10B981">486,532 · Beat</text>

  <rect x="730" y="910" width="296" height="80" rx="14" fill="#0F1623" stroke="#F59E0B" stroke-width="1.5"/>
  <text x="878" y="940" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#FDE68A">2030 Target</text>
  <text x="878" y="974" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="#F59E0B">5M units/year</text>

  <!-- message box -->
  <rect x="54" y="1008" width="972" height="274" rx="22" fill="url(#msgG)" stroke="#92400E" stroke-width="2.5"/>
  <rect x="54" y="1008" width="972" height="4" rx="2" fill="url(#accentG)"/>

  <text x="108" y="1055" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#FED7AA">Key Takeaway</text>
  <rect x="108" y="1063" width="864" height="1" fill="#92400E"/>

  <text x="108" y="1106" font-family="Arial,sans-serif" font-size="25" fill="#F3F4F6">FCF doubled consensus. Backlog at a 4-year high. Supply</text>
  <text x="108" y="1138" font-family="Arial,sans-serif" font-size="25" fill="#F3F4F6">is now the only constraint — demand is not the problem.</text>
  <text x="108" y="1182" font-family="Arial,sans-serif" font-size="25" fill="#D1D5DB">Special committees mean the TSLA-SPCX deal is a legal</text>
  <text x="108" y="1214" font-family="Arial,sans-serif" font-size="25" fill="#D1D5DB">process now, not a rumor. Both boards are committed.</text>
  <text x="108" y="1258" font-family="Arial,sans-serif" font-size="23" fill="#F97316">Q3 Earnings × Merger × Terafab — converging at once.</text>

  <!-- footer -->
  <text x="54" y="1324" font-family="Arial,sans-serif" font-size="19" fill="#4B5563">investus.kr  ·  Not investment advice  ·  INVESTUS SRP</text>
  <rect x="0" y="1342" width="${W}" height="8" fill="url(#accentG)"/>
</svg>`;

  return svg;
}

(async () => {
  const svg = makeCardNews();
  const name = 'cardnews-20261022';
  const svgPath = path.join(OUT, `${name}.svg`);
  const pngPath = path.join(OUT, `${name}.png`);
  fs.writeFileSync(svgPath, svg);
  await sharp(Buffer.from(svg)).resize(1080, 1350).png().toFile(pngPath);
  console.log(`✓ ${name}.png saved`);
})();
