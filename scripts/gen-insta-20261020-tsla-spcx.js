#!/usr/bin/env node
// Instagram card — TSLA × SPCX — Oct 20 2026 — English
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../instagram');
const BASE = '20261020-tsla-spcx';

function buildSVG() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  <defs>
    <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#0D1117"/>
      <stop offset="100%" stop-color="#0A0520"/>
    </linearGradient>
    <linearGradient id="heroG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#C084FC"/>
    </linearGradient>
    <linearGradient id="barFillG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#C084FC"/>
    </linearGradient>
    <linearGradient id="divG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#EF4444" stop-opacity="0"/>
      <stop offset="30%" stop-color="#EF4444"/>
      <stop offset="70%" stop-color="#C084FC"/>
      <stop offset="100%" stop-color="#C084FC" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1080" height="1350" fill="url(#bgG)"/>
  <rect x="0" y="0" width="1080" height="10" fill="url(#heroG)"/>

  <!-- ── BADGES ── -->
  <rect x="40" y="28" width="112" height="40" rx="20" fill="#7F1D1D"/>
  <rect x="40" y="28" width="112" height="40" rx="20" fill="none" stroke="#EF4444" stroke-width="2"/>
  <text x="96" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="20" font-weight="900" fill="#EF4444">TSLA</text>

  <rect x="164" y="28" width="112" height="40" rx="20" fill="#2D1657"/>
  <rect x="164" y="28" width="112" height="40" rx="20" fill="none" stroke="#C084FC" stroke-width="2"/>
  <text x="220" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="20" font-weight="900" fill="#C084FC">SPCX</text>

  <rect x="296" y="28" width="150" height="40" rx="20" fill="#450A0A"/>
  <rect x="296" y="28" width="150" height="40" rx="20" fill="none" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="5 3"/>
  <text x="371" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="#FCA5A5">BREAKING</text>

  <rect x="878" y="28" width="162" height="40" rx="20" fill="#1F2937"/>
  <text x="959" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="#9CA3AF">INVESTUS</text>

  <text x="40" y="100" font-family="Arial,sans-serif" font-size="22" fill="#6B7280">Oct 20, 2026</text>

  <!-- ── EYEBROW ── -->
  <text x="40" y="144" font-family="Arial,sans-serif" font-size="21" letter-spacing="2" fill="#9CA3AF">KALSHI PREDICTION MARKET  |  MERGER ODDS SURGE</text>

  <!-- ── HERO: 67% ── -->
  <text x="32" y="430" font-family="Arial Black,Arial,sans-serif" font-size="240" font-weight="900" fill="url(#heroG)">67%</text>

  <!-- ── HERO CAPTION ── -->
  <text x="40" y="476" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">TSLA x SPCX merger probability — Kalshi, Oct 20 2026</text>

  <!-- ── SUBHEADLINES ── -->
  <text x="40" y="536" font-family="Arial Black,Arial,sans-serif" font-size="50" font-weight="900" fill="#FFFFFF">The Merger Wall Street</text>
  <text x="40" y="594" font-family="Arial Black,Arial,sans-serif" font-size="50" font-weight="900" fill="#FFFFFF">Can't Stop Pricing In.</text>

  <!-- ── DIVIDER ── -->
  <rect x="40" y="616" width="1000" height="2" rx="1" fill="url(#divG)"/>

  <!-- ── PROBABILITY BAR ── -->
  <text x="40" y="654" font-family="Arial,sans-serif" font-size="21" letter-spacing="1" fill="#9CA3AF">MERGER PROBABILITY — KALSHI PREDICTION MARKET</text>
  <!-- bar bg -->
  <rect x="40" y="668" width="1000" height="48" rx="10" fill="#1F2937"/>
  <!-- bar fill: 67% of 1000 = 670px -->
  <rect x="40" y="668" width="670" height="48" rx="10" fill="url(#barFillG)"/>
  <!-- label inside bar -->
  <text x="706" y="700" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#FFFFFF">67%</text>
  <!-- bar note -->
  <text x="40" y="740" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">Up from 41% one week ago  |  Record options flow  |  Citi analyst note</text>

  <!-- ── DIVIDER 2 ── -->
  <rect x="40" y="756" width="1000" height="1" fill="#1F2937"/>

  <!-- ── 3 STAT CARDS  y=766 h=126 ── -->
  <!-- Card 1: SpaceX payload -->
  <rect x="40" y="766" width="313" height="126" rx="14" fill="#1A0D2E"/>
  <rect x="40" y="766" width="313" height="5" rx="2.5" fill="#A855F7"/>
  <text x="196" y="806" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#C084FC">SpaceX Payload</text>
  <text x="196" y="850" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="40" font-weight="900" fill="#FFFFFF">4.3x</text>
  <text x="196" y="882" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#9CA3AF">vs. all others 2025</text>

  <!-- Card 2: TX Robotaxi -->
  <rect x="383" y="766" width="314" height="126" rx="14" fill="#1A0808"/>
  <rect x="383" y="766" width="314" height="5" rx="2.5" fill="#EF4444"/>
  <text x="540" y="806" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#EF4444">TX Robotaxi Fleet</text>
  <text x="540" y="850" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="40" font-weight="900" fill="#FFFFFF">800+</text>
  <text x="540" y="882" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#9CA3AF">Cybercabs deployed</text>

  <!-- Card 3: Q3 Earnings -->
  <rect x="727" y="766" width="313" height="126" rx="14" fill="#081A08"/>
  <rect x="727" y="766" width="313" height="5" rx="2.5" fill="#4ADE80"/>
  <text x="883" y="806" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#4ADE80">Q3 Earnings</text>
  <text x="883" y="850" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="40" font-weight="900" fill="#FFFFFF">Oct 21</text>
  <text x="883" y="882" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#9CA3AF">Tesla reports tomorrow</text>

  <!-- ── DIVIDER 3 ── -->
  <rect x="40" y="906" width="1000" height="1" fill="#1F2937"/>

  <!-- ── KEY POINTS  y=916  h=338 ── -->
  <rect x="40" y="916" width="1000" height="338" rx="16" fill="#111827" stroke="#374151" stroke-width="1.5"/>
  <text x="80" y="958" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F3F4F6">Key Points</text>
  <rect x="80" y="968" width="920" height="1" fill="#2D333B"/>

  <!-- Bullet 1 -->
  <circle cx="104" cy="1008" r="9" fill="#EF4444"/>
  <text x="126" y="1001" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Merger odds: 41% to 67% in one week on Kalshi —</text>
  <text x="126" y="1029" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">driven by record options flow and a Citi analyst note</text>

  <!-- Bullet 2 -->
  <circle cx="104" cy="1077" r="9" fill="#A855F7"/>
  <text x="126" y="1070" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">SpaceX controls 80%+ of all mass launched to LEO —</text>
  <text x="126" y="1098" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Falcon reusability is a structural monopoly moat</text>

  <!-- Bullet 3 -->
  <circle cx="104" cy="1146" r="9" fill="#4ADE80"/>
  <text x="126" y="1139" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Tesla Q3 earnings tomorrow — 800+ Cybercabs on FSD;</text>
  <text x="126" y="1167" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">SPCX posts its first profitable quarter ever</text>

  <!-- Bullet 4 -->
  <circle cx="104" cy="1215" r="9" fill="#F59E0B"/>
  <text x="126" y="1208" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">A merged entity would own rockets, EVs, AI and energy —</text>
  <text x="126" y="1236" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">the most vertically integrated company in history</text>

  <!-- ── NEXT EVENT  y=1268 ── -->
  <rect x="40" y="1268" width="1000" height="52" rx="10" fill="#1F2937"/>
  <text x="60" y="1300" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">NEXT: Tesla + SPCX Q3 Earnings Report — Wednesday, Oct 21 2026</text>

  <!-- ── FOOTER ── -->
  <rect x="0" y="1340" width="1080" height="10" fill="url(#heroG)"/>
  <text x="40" y="1333" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">investus.kr  ·  Not investment advice  ·  INVESTUS SRP</text>
</svg>`;
}

const CAPTION = `Tesla × SpaceX merger odds just hit 67% on Kalshi — up from 41% just one week ago.

SpaceX controls 80%+ of all mass launched to LEO, 4.3× all other providers combined. Tesla's Texas Robotaxi fleet crossed 800 Cybercabs running FSD. SPCX posts its first ever profitable quarter.

Tomorrow: Tesla Q3 earnings. The Musk empire is converging.

$TSLA $SPCX #Tesla #SpaceX #Investing #StockMarket #Investus`;

async function main() {
  const svgStr = buildSVG();

  const svgPath = path.join(OUT_DIR, `${BASE}.svg`);
  fs.writeFileSync(svgPath, svgStr, 'utf8');
  console.log(`SVG -> ${svgPath}`);

  const pngPath = path.join(OUT_DIR, `${BASE}.png`);
  await sharp(Buffer.from(svgStr)).resize(1080, 1350).png().toFile(pngPath);
  console.log(`PNG -> ${pngPath}`);

  console.log('\n------- CAPTION (copy-paste) -------');
  console.log(CAPTION);
  console.log('------------------------------------');
  console.log(`\nChar count: ${CAPTION.length}`);
}

main().catch(e => { console.error(e); process.exit(1); });
