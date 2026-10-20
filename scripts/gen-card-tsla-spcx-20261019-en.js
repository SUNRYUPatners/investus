#!/usr/bin/env node
const fs   = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT = path.join(__dirname, '../public/charts');
const W = 1080, H = 1350;

async function save(slug, svg) {
  fs.writeFileSync(path.join(OUT, slug + '.svg'), svg, 'utf8');
  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, slug + '.png'));
  console.log('✓', slug + '.png');
}

async function cardEn() {
  const c1 = '#EF4444', c2 = '#3B82F6';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#0D1117"/><stop offset="100%" stop-color="#080D1A"/>
  </linearGradient>
  <linearGradient id="tBar" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
  </linearGradient>
  <linearGradient id="heroG" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
  </linearGradient>
  <linearGradient id="divG" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}" stop-opacity="0"/>
    <stop offset="30%" stop-color="${c1}"/>
    <stop offset="70%" stop-color="${c2}"/>
    <stop offset="100%" stop-color="${c2}" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="card1G" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#1A0808"/><stop offset="100%" stop-color="#0D1117"/>
  </linearGradient>
  <linearGradient id="card2G" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#080D1A"/><stop offset="100%" stop-color="#0D1117"/>
  </linearGradient>
</defs>

<!-- bg -->
<rect width="${W}" height="${H}" fill="url(#bgG)"/>
<rect x="0" y="0" width="${W}" height="12" fill="url(#tBar)"/>

<!-- badges -->
<rect x="54" y="30" width="90" height="36" rx="8" fill="${c1}"/>
<text x="99" y="54" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" text-anchor="middle" font-weight="900">TSLA</text>
<rect x="160" y="30" width="102" height="36" rx="8" fill="${c2}"/>
<text x="211" y="54" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" text-anchor="middle" font-weight="900">SpaceX</text>
<rect x="278" y="30" width="148" height="36" rx="8" fill="#7C3AED"/>
<text x="352" y="54" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" text-anchor="middle" font-weight="900">Merger Signal</text>

<!-- date -->
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Oct 19, 2026 · TSLA × SpaceX Big Picture</text>

<!-- hero headline -->
<text x="54" y="196" font-family="Arial Black,Arial,sans-serif" font-size="72" fill="url(#heroG)" font-weight="900">Merger</text>
<text x="54" y="278" font-family="Arial Black,Arial,sans-serif" font-size="72" fill="url(#heroG)" font-weight="900">Signals ×3</text>
<text x="54" y="346" font-family="Arial,sans-serif" font-size="26" fill="#D1D5DB">Exec follow · Citi Research · Co-located staff · $3.5T</text>

<!-- divider -->
<rect x="54" y="374" width="972" height="3" fill="url(#divG)" rx="2"/>

<!-- 4 stat boxes: 2x2 grid -->
<!-- Row 1 -->
<rect x="54" y="396" width="462" height="200" rx="20" fill="url(#card1G)" stroke="${c1}" stroke-width="2"/>
<text x="78" y="436" font-family="Arial,sans-serif" font-size="19" fill="${c1}" font-weight="700">Merger Signal</text>
<text x="78" y="490" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">3 Signals</text>
<text x="78" y="542" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">Exec follow + Citi + Co-located</text>
<text x="78" y="572" font-family="Arial,sans-serif" font-size="19" fill="#FCA5A5">$3.5T combined · Dec AGM deadline</text>

<rect x="564" y="396" width="462" height="200" rx="20" fill="url(#card2G)" stroke="${c2}" stroke-width="2"/>
<text x="588" y="436" font-family="Arial,sans-serif" font-size="19" fill="${c2}" font-weight="700">SpaceX Launch Dominance</text>
<text x="588" y="490" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">4.3x</text>
<text x="588" y="542" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">vs rest of world combined</text>
<text x="588" y="572" font-family="Arial,sans-serif" font-size="19" fill="#93C5FD">2,308t vs 534t in 2025</text>

<!-- Row 2 -->
<rect x="54" y="614" width="462" height="200" rx="20" fill="url(#card2G)" stroke="#3B82F6" stroke-width="2"/>
<text x="78" y="654" font-family="Arial,sans-serif" font-size="19" fill="#3B82F6" font-weight="700">Starlink Mobile</text>
<text x="78" y="712" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">$65B</text>
<text x="78" y="764" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">Bloomberg 2031E forecast</text>
<text x="78" y="794" font-family="Arial,sans-serif" font-size="19" fill="#93C5FD">Delta exodus · Aviation &amp; rail rollout</text>

<rect x="564" y="614" width="462" height="200" rx="20" fill="url(#card1G)" stroke="${c1}" stroke-width="2"/>
<text x="588" y="654" font-family="Arial,sans-serif" font-size="19" fill="${c1}" font-weight="700">Texas Robotaxi Fleet</text>
<text x="588" y="712" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">800+</text>
<text x="588" y="764" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">Cybercab 346 + Model Y 454</text>
<text x="588" y="794" font-family="Arial,sans-serif" font-size="19" fill="#FCA5A5">Drivewise 87% · 3rd straight record</text>

<!-- big message box -->
<rect x="54" y="836" width="972" height="120" rx="20" fill="#10161F" stroke="#7C3AED" stroke-width="2"/>
<text x="84" y="878" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#A78BFA" font-weight="900">Musk: &quot;Only X2 (Optimus) and Robotics will scale&quot;</text>
<text x="84" y="920" font-family="Arial,sans-serif" font-size="23" fill="#D1D5DB">Cybercab already live · TSLA Q3 Oct 21 · X2 is the core growth narrative</text>

<!-- NASA row -->
<rect x="54" y="978" width="972" height="100" rx="16" fill="#0D1A1A" stroke="#22C55E" stroke-width="1.5"/>
<text x="84" y="1018" font-family="Arial,sans-serif" font-size="22" fill="#22C55E" font-weight="700">NASA Artemis HLS Update</text>
<text x="84" y="1056" font-family="Arial,sans-serif" font-size="22" fill="#D1D5DB">Artemis IV crewed lunar landing early 2028 · Starship HLS vs Blue Moon · direct SpaceX upside</text>

<!-- Fear & Greed row -->
<rect x="54" y="1096" width="972" height="100" rx="16" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="84" y="1136" font-family="Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="700">Fear &amp; Greed: Extreme Fear 18 — crashed from 46 in 1 week</text>
<text x="84" y="1174" font-family="Arial,sans-serif" font-size="22" fill="#D1D5DB">Earnings week + extreme fear = contrarian buy discussion in full swing</text>

<!-- bottom cta -->
<rect x="54" y="1218" width="972" height="44" rx="10" fill="url(#tBar)" opacity="0.15"/>
<text x="540" y="1247" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" text-anchor="middle" font-weight="900">SPCX Q3 Oct 20 · TSLA Q3 Oct 21 — Earnings Week</text>

<!-- footer -->
<rect x="0" y="1278" width="${W}" height="72" fill="#161B22"/>
<text x="54" y="1326" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#58A6FF" font-weight="900">investus.kr</text>
<text x="1026" y="1326" font-family="Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="end">2026.10.19</text>
</svg>`;

  await save('card-tsla-spcx-20261019-en', svg);
}

cardEn().catch(console.error);
