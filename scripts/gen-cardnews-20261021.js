#!/usr/bin/env node
// Instagram card news — 2026-10-21 — TSLA × SPCX
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/charts');

function escXml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function makeCardNews() {
  const W = 1080, H = 1350;

  // stat box helper: x, y, w, h, topLabel, bigNum, unit, subLabel, accent
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
      <stop offset="0%" stop-color="#0A0010"/>
      <stop offset="55%" stop-color="#0D0820"/>
      <stop offset="100%" stop-color="#1A0A05"/>
    </linearGradient>
    <linearGradient id="accentG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#A855F7"/>
    </linearGradient>
    <linearGradient id="heroG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="50%" stop-color="#EC4899"/>
      <stop offset="100%" stop-color="#A855F7"/>
    </linearGradient>
    <linearGradient id="msgG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#1C0F2E"/>
      <stop offset="100%" stop-color="#160818"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- BG -->
  <rect width="${W}" height="${H}" fill="url(#bgG)"/>

  <!-- subtle grid lines for depth -->
  <line x1="0" y1="500" x2="${W}" y2="500" stroke="#1F2937" stroke-width="1" opacity="0.4"/>
  <line x1="0" y1="850" x2="${W}" y2="850" stroke="#1F2937" stroke-width="1" opacity="0.4"/>

  <!-- top accent bar -->
  <rect x="0" y="0" width="${W}" height="8" fill="url(#accentG)"/>

  <!-- date + handle -->
  <text x="54" y="52" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">2026.10.21</text>
  <text x="${W - 54}" y="52" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">@investus.kr</text>

  <!-- category badges -->
  <rect x="54" y="68" width="130" height="38" rx="19" fill="#7F1D1D" stroke="#EF4444" stroke-width="1.5"/>
  <text x="119" y="93" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#FCA5A5"># TSLA</text>

  <rect x="196" y="68" width="130" height="38" rx="19" fill="#3B0764" stroke="#A855F7" stroke-width="1.5"/>
  <text x="261" y="93" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#D8B4FE"># SPCX</text>

  <rect x="338" y="68" width="150" height="38" rx="19" fill="#1C1917" stroke="#F59E0B" stroke-width="1.5"/>
  <text x="413" y="93" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#FDE68A"># MERGER</text>

  <!-- divider -->
  <rect x="54" y="118" width="972" height="2" fill="url(#accentG)" opacity="0.6"/>

  <!-- HERO -->
  <text x="${W/2}" y="208" text-anchor="middle"
        font-family="Arial Black,Arial,sans-serif" font-size="100" font-weight="900"
        fill="url(#heroG)" filter="url(#glow)">MERGER</text>

  <!-- hero sub -->
  <text x="${W/2}" y="286" text-anchor="middle"
        font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900"
        fill="#F1F5F9">COMMITTEE CONFIRMED</text>

  <!-- descriptor -->
  <text x="${W/2}" y="346" text-anchor="middle"
        font-family="Arial,sans-serif" font-size="25" fill="#9CA3AF">TSLA &amp; SPCX boards form independent special committees</text>

  <!-- divider 2 -->
  <rect x="200" y="368" width="680" height="2" fill="url(#accentG)" opacity="0.4"/>

  <!-- Q3 earnings tonight banner -->
  <rect x="54" y="384" width="972" height="64" rx="16" fill="#1F0A0A" stroke="#EF4444" stroke-width="1.5"/>
  <text x="${W/2}" y="426" text-anchor="middle"
        font-family="Arial Black,Arial,sans-serif" font-size="27" font-weight="900" fill="#FCA5A5">⚡  TSLA Q3 EARNINGS TONIGHT  ·  486,532 deliveries beat consensus</text>

  <!-- 2×2 stat grid -->
  ${statBox(54,  466, 476, 188, 'SPCX Q3 EPS', '+250%', 'earnings beat', '$0.35 vs $0.10 est', '#A855F7')}
  ${statBox(550, 466, 476, 188, 'SPCX AI Revenue', '+830%', 'YoY growth', '$7.56B SuperIntelligence', '#A855F7')}
  ${statBox(54,  672, 476, 188, 'Cybercab fare', '$1.53', '/mile all-time low', '731 units/day · 79% driverless', '#10B981')}
  ${statBox(550, 672, 476, 188, 'ARK TSLA target', '$4,400', 'Base case (2031)', 'Bear $3,300 · Bull $5,000', '#F59E0B')}

  <!-- middle divider -->
  <rect x="54" y="868" width="972" height="1.5" fill="#1F2937"/>

  <!-- additional stats row -->
  <rect x="54" y="882" width="296" height="80" rx="14" fill="#0F1623" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="202" y="912" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#93C5FD">Model Y Global</text>
  <text x="202" y="946" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="#3B82F6">#1 — 748,088 units</text>

  <rect x="392" y="882" width="296" height="80" rx="14" fill="#0F1623" stroke="#10B981" stroke-width="1.5"/>
  <text x="540" y="912" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#6EE7B7">Optimus V3</text>
  <text x="540" y="946" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="#10B981">Production · 1M units/yr</text>

  <rect x="730" y="882" width="296" height="80" rx="14" fill="#0F1623" stroke="#F59E0B" stroke-width="1.5"/>
  <text x="878" y="912" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#FDE68A">Starlink subscribers</text>
  <text x="878" y="946" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="#F59E0B">13.6M subs · +161%</text>

  <!-- message box -->
  <rect x="54" y="980" width="972" height="300" rx="22" fill="url(#msgG)" stroke="#4C1D95" stroke-width="2.5"/>
  <rect x="54" y="980" width="972" height="4" rx="2" fill="url(#heroG)"/>

  <text x="108" y="1030" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#E9D5FF">Key Takeaway</text>
  <rect x="108" y="1038" width="864" height="1" fill="#4C1D95"/>

  <text x="108" y="1082" font-family="Arial,sans-serif" font-size="25" fill="#F3F4F6">A special committee is not a rumor — it's a legal, board-level</text>
  <text x="108" y="1114" font-family="Arial,sans-serif" font-size="25" fill="#F3F4F6">process. The TSLA-SPCX deal is becoming real.</text>
  <text x="108" y="1158" font-family="Arial,sans-serif" font-size="25" fill="#D1D5DB">SPCX Q3 confirmed explosive AI growth. Tonight, TSLA Q3</text>
  <text x="108" y="1190" font-family="Arial,sans-serif" font-size="25" fill="#D1D5DB">earnings will set the tone for the rest of the year.</text>
  <text x="108" y="1240" font-family="Arial,sans-serif" font-size="23" fill="#A855F7">Space · AI · Robotics · Energy — converging into one company.</text>

  <!-- bottom footer -->
  <text x="54" y="1324" font-family="Arial,sans-serif" font-size="19" fill="#4B5563">investus.kr  ·  Not investment advice  ·  INVESTUS SRP</text>
  <rect x="0" y="1342" width="${W}" height="8" fill="url(#accentG)"/>
</svg>`;

  return svg;
}

(async () => {
  const svg = makeCardNews();
  const name = 'cardnews-20261021';
  const svgPath = path.join(OUT, `${name}.svg`);
  const pngPath = path.join(OUT, `${name}.png`);
  fs.writeFileSync(svgPath, svg);
  await sharp(Buffer.from(svg)).resize(1080, 1350).png().toFile(pngPath);
  console.log(`✓ ${name}.png saved`);
})();
