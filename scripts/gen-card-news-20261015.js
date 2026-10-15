#!/usr/bin/env node
// Card News — 2026-10-15 TESLA × SPCX (English only)
// Layout: top bar → badges → hero → subhead → visual → 3 stat cards → message box → footer
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT = path.join(__dirname, '../public/charts');
const W = 1080, H = 1350;

async function save(filename, svg) {
  const svgPath = path.join(OUT, filename + '.svg');
  const pngPath = path.join(OUT, filename + '.png');
  fs.writeFileSync(svgPath, svg, 'utf8');
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
  console.log('✓', filename + '.png');
}

// ── hbar helper (horizontal bar) ─────────────────────────────────────────────
function hbar(x, y, label, value, maxVal, barW, h, color, unit = '') {
  const filled = Math.round((value / maxVal) * barW);
  return `
<text x="${x}" y="${y + 22}" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">${label}</text>
<rect x="${x + 220}" y="${y}" width="${barW}" height="${h}" rx="6" fill="#21262D"/>
<rect x="${x + 220}" y="${y}" width="${filled}" height="${h}" rx="6" fill="${color}"/>
<text x="${x + 220 + filled + 10}" y="${y + 22}" font-family="Arial Black,Arial,sans-serif" font-size="21" fill="#fff" font-weight="900">${value}${unit}</text>`;
}

// ── stat card ─────────────────────────────────────────────────────────────────
function stat(x, y, w, label, big, sub, accent) {
  return `<rect x="${x}" y="${y}" width="${w}" height="130" rx="16" fill="#161B22" stroke="${accent}" stroke-width="2"/>
<text x="${x + w / 2}" y="${y + 36}" font-family="Arial,sans-serif" font-size="19" fill="${accent}" text-anchor="middle" font-weight="700">${label}</text>
<text x="${x + w / 2}" y="${y + 84}" font-family="Arial Black,Arial,sans-serif" font-size="32" fill="#fff" text-anchor="middle" font-weight="900">${big}</text>
<text x="${x + w / 2}" y="${y + 114}" font-family="Arial,sans-serif" font-size="18" fill="#8B949E" text-anchor="middle">${sub}</text>`;
}

// ── bullet ────────────────────────────────────────────────────────────────────
function bullet(x, y, text, color, line2 = '') {
  const second = line2
    ? `<text x="${x + 34}" y="${y + 50}" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">${line2}</text>`
    : '';
  return `<circle cx="${x + 14}" cy="${y + 14}" r="7" fill="${color}"/>
<text x="${x + 34}" y="${y + 22}" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">${text}</text>${second}`;
}

async function main() {

  const barW = 510;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#0D1117"/>
    <stop offset="100%" stop-color="#0A0E1A"/>
  </linearGradient>
  <linearGradient id="topBar" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#EF4444"/>
    <stop offset="50%" stop-color="#8B5CF6"/>
    <stop offset="100%" stop-color="#60A5FA"/>
  </linearGradient>
  <linearGradient id="divGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#EF4444" stop-opacity="0"/>
    <stop offset="30%" stop-color="#EF4444"/>
    <stop offset="70%" stop-color="#60A5FA"/>
    <stop offset="100%" stop-color="#60A5FA" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#EF4444"/>
    <stop offset="50%" stop-color="#8B5CF6"/>
    <stop offset="100%" stop-color="#60A5FA"/>
  </linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bgGrad)"/>

<!-- ① Top gradient bar -->
<rect x="0" y="0" width="${W}" height="12" fill="url(#topBar)"/>

<!-- ② Header badges -->
<rect x="54" y="30" width="92" height="36" rx="8" fill="#EF4444"/>
<text x="100" y="54" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" text-anchor="middle" font-weight="900">TSLA</text>
<rect x="160" y="30" width="92" height="36" rx="8" fill="#60A5FA"/>
<text x="206" y="54" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" text-anchor="middle" font-weight="900">SPCX</text>
<rect x="266" y="30" width="138" height="36" rx="8" fill="#8B5CF6"/>
<text x="335" y="54" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" text-anchor="middle" font-weight="900">CARD NEWS</text>

<!-- ③ Eyebrow -->
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Oct 15, 2026 · Tesla &amp; SpaceX Key Updates</text>

<!-- ④ HUGE Hero -->
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="108" fill="#fff" font-weight="900">TESLA</text>
<text x="54" y="318" font-family="Arial Black,Arial,sans-serif" font-size="88" fill="url(#heroGrad)" font-weight="900">× SPACEX</text>

<!-- ⑤ Sub-headline -->
<text x="54" y="366" font-family="Arial,sans-serif" font-size="28" fill="#8B949E">Roadster TONIGHT · Cybercab 399 · SPCX $300</text>

<!-- ⑥ Divider -->
<rect x="54" y="390" width="${W - 108}" height="3" fill="url(#divGrad)" rx="2"/>

<!-- ⑦ Visual — Austin Cybercab Fleet + Driverless Sightings -->
<text x="54" y="432" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#60A5FA" font-weight="900">Austin Robotaxi Fleet &amp; Driverless Sightings</text>
<rect x="740" y="410" width="296" height="40" rx="8" fill="#0D1A2A" stroke="#60A5FA" stroke-width="1.5"/>
<text x="888" y="436" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#60A5FA" text-anchor="middle" font-weight="900">Total Fleet: 399 vehicles</text>
${hbar(54, 452, 'Model Y', 224, 490, barW, 28, '#60A5FA', '')}
${hbar(54, 492, 'Cybercab', 175, 490, barW, 28, '#8B5CF6', '')}
${hbar(54, 534, 'Last Tue', 415, 490, barW, 28, '#374151', ' trips')}
${hbar(54, 574, 'This Tue', 490, 490, barW, 28, '#34D399', ' trips')}
<rect x="740" y="574" width="116" height="28" rx="6" fill="#0D2A1A" stroke="#34D399" stroke-width="1.5"/>
<text x="798" y="593" font-family="Arial Black,Arial,sans-serif" font-size="18" fill="#34D399" text-anchor="middle" font-weight="900">+18% WoW</text>

<!-- ⑧ 3 Stat cards -->
${stat(54,  626, 306, 'Roadster Reveal', 'TONIGHT', '7:55 PM CT Live', '#EF4444')}
${stat(384, 626, 306, 'Cybercab Fleet', '399', 'Austin · +18% WoW', '#60A5FA')}
${stat(714, 626, 312, 'SPCX Target', '$300', 'Morgan Stanley Strong Buy', '#34D399')}

<!-- ⑨ Message box -->
<rect x="54" y="784" width="${W - 108}" height="456" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="830" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">Today's 5 Key Stories</text>
<line x1="82" y1="844" x2="${W - 82}" y2="844" stroke="#30363D" stroke-width="1"/>

${bullet(82, 858, 'Roadster reveal TONIGHT 7:55PM CT — livestreamed on Tesla &amp; X', '#EF4444')}
${bullet(82, 920, 'Cybercab fleet 399 (Model Y 224 + Cybercab 175) — 490 driverless', '#60A5FA', '   sightings Tue, up 18% week over week')}
${bullet(82, 994, 'Grok Voice 3.0 live — Starlink 20k calls/day, 70% auto-resolved', '#8B5CF6')}
${bullet(82, 1054, 'Morgan Stanley reiterates SPCX $300 Strong Buy — DIC top driver', '#34D399')}
${bullet(82, 1114, 'Tesla Energy NightHawk Bocamno 2 Megapack done — Brazoria Co. TX', '#F59E0B')}

<!-- Calendar -->
<rect x="82" y="1174" width="${W - 164}" height="50" rx="12" fill="#1A2233" stroke="#FBBF24" stroke-width="1.5"/>
<text x="110" y="1205" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FBBF24" font-weight="900">Oct 21 — Tesla Q3 Earnings Call</text>

<!-- ⑩ Footer -->
<rect x="0" y="${H - 72}" width="${W}" height="72" fill="#161B22"/>
<text x="54" y="${H - 30}" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#58A6FF" font-weight="900">investus.kr</text>
<text x="${W - 54}" y="${H - 30}" font-family="Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="end">2026.10.15</text>

</svg>`;

  await save('tsla-spcx-card-20261015', svg);
  console.log('\n✅ Card news done.');
}

main().catch(console.error);
