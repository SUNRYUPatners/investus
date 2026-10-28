'use strict';
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/charts');

function svg() {
  const red   = '#F87171';
  const redD  = '#DC2626';
  const redBg = 'rgba(220,38,38,0.10)';
  const blue  = '#60A5FA';
  const blueD = '#2563EB';
  const blueBg= 'rgba(37,99,235,0.10)';
  const gold  = '#FBBF24';
  const white = '#F9FAFB';
  const gray  = '#9CA3AF';
  const bg    = '#06080F';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#08050F"/>
      <stop offset="100%" stop-color="#030508"/>
    </linearGradient>
    <linearGradient id="redGlow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#DC2626" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#DC2626" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="blueGlow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2563EB" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#2563EB" stop-opacity="0"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- background -->
  <rect width="1080" height="1350" fill="url(#bgGrad)"/>

  <!-- subtle side glows -->
  <rect x="0" y="0" width="400" height="1350" fill="url(#redGlow)" opacity="0.4"/>
  <rect x="680" y="0" width="400" height="1350" fill="url(#blueGlow)" opacity="0.4"/>

  <!-- TOP BAR -->
  <rect x="0" y="0" width="1080" height="72" fill="rgba(255,255,255,0.03)"/>
  <text x="54" y="46" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="${white}">investus.kr</text>
  <text x="1026" y="46" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="${gray}">Oct 28, 2026</text>

  <!-- HERO TITLE -->
  <text x="540" y="148" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="${white}" filter="url(#glow)">TSLA ✕ SPCX</text>
  <text x="540" y="196" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="${gray}">Daily Highlight · Oct 28, 2026</text>

  <!-- divider -->
  <line x1="54" y1="216" x2="1026" y2="216" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <!-- ══════════ TESLA CARD ══════════ -->
  <rect x="54" y="232" width="972" height="330" rx="20" fill="${redBg}" stroke="${redD}" stroke-width="1.5"/>

  <!-- TSLA badge -->
  <rect x="78" y="258" width="100" height="38" rx="8" fill="${redD}"/>
  <text x="128" y="283" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${white}">TSLA</text>

  <!-- TSLA label -->
  <text x="198" y="283" font-family="Arial,sans-serif" font-size="22" fill="${red}">Robotaxi Fleet · Texas (TxDMV)</text>

  <!-- Big number -->
  <text x="78" y="390" font-family="Arial Black,Arial,sans-serif" font-size="112" font-weight="900" fill="${red}" filter="url(#glow)">1,051</text>
  <text x="78" y="432" font-family="Arial,sans-serif" font-size="26" fill="${white}">autonomous vehicles registered</text>

  <!-- breakdown bar -->
  <!-- Cybercab: 544 / Total: 1051 → 51.8% -->
  <rect x="78" y="452" width="972" height="16" rx="8" fill="rgba(255,255,255,0.06)"/>
  <rect x="78" y="452" width="504" height="16" rx="8" fill="${redD}"/>
  <rect x="582" y="452" width="468" height="16" rx="0" fill="${red}" opacity="0.5"/>
  <rect x="78" y="452" width="972" height="16" rx="8" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>

  <text x="78" y="492" font-family="Arial,sans-serif" font-size="21" fill="${red}">Cybercab 544</text>
  <text x="390" y="492" font-family="Arial,sans-serif" font-size="21" fill="${white}" opacity="0.5">+</text>
  <text x="420" y="492" font-family="Arial,sans-serif" font-size="21" fill="${red}" opacity="0.7">Model Y 507</text>
  <text x="690" y="492" font-family="Arial,sans-serif" font-size="21" fill="${gray}">vs Waymo 1,207 (≈12 days behind)</text>

  <!-- pace chip -->
  <rect x="780" y="254" width="230" height="60" rx="12" fill="rgba(248,113,113,0.12)" stroke="${red}" stroke-width="1"/>
  <text x="895" y="279" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="${red}">+13/day</text>
  <text x="895" y="302" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="${gray}">pace since Sep 1</text>

  <!-- ══════════ SPACEX CARD ══════════ -->
  <rect x="54" y="582" width="972" height="350" rx="20" fill="${blueBg}" stroke="${blueD}" stroke-width="1.5"/>

  <!-- SPCX badge -->
  <rect x="78" y="608" width="100" height="38" rx="8" fill="${blueD}"/>
  <text x="128" y="633" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${white}">SPCX</text>

  <!-- SPCX label -->
  <text x="198" y="633" font-family="Arial,sans-serif" font-size="22" fill="${blue}">SpaceX · Revenue Momentum</text>

  <!-- Q1'27 guide — big hero -->
  <text x="78" y="728" font-family="Arial Black,Arial,sans-serif" font-size="96" font-weight="900" fill="${blue}" filter="url(#glow)">$33–37B</text>
  <text x="78" y="772" font-family="Arial,sans-serif" font-size="26" fill="${white}">Q1 2027 revenue guidance  <tspan fill="${gray}">(quarterly)</tspan></text>

  <!-- monthly conversion chip -->
  <rect x="78" y="792" width="440" height="52" rx="10" fill="rgba(96,165,250,0.10)" stroke="${blue}" stroke-width="1"/>
  <text x="298" y="823" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="23" font-weight="900" fill="${blue}">$11B–$12.3B / month</text>

  <rect x="540" y="792" width="460" height="52" rx="10" fill="rgba(251,191,36,0.08)" stroke="${gold}" stroke-width="1"/>
  <text x="770" y="823" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="23" font-weight="900" fill="${gold}">$100B ARR pace ✓</text>

  <!-- sub line -->
  <text x="78" y="874" font-family="Arial,sans-serif" font-size="21" fill="${gray}">Q3 2026 avg: $4.86B/mo → Q1'27 guide implies</text>
  <text x="78" y="900" font-family="Arial,sans-serif" font-size="21" fill="${blue}">+$6.2B–$7.4B monthly surge in one quarter</text>

  <!-- $40B GPU deal note -->
  <rect x="78" y="916" width="544" height="38" rx="8" fill="rgba(255,255,255,0.04)"/>
  <text x="350" y="940" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="${gray}">$40B GPU deal closed · Apollo · Goldman</text>

  <!-- ══════════ BOTTOM 2-CARD ROW ══════════ -->
  <!-- Anthropic compute card -->
  <rect x="54" y="952" width="468" height="148" rx="16" fill="rgba(139,92,246,0.08)" stroke="#7C3AED" stroke-width="1.5"/>
  <text x="78" y="994" font-family="Arial Black,Arial,sans-serif" font-size="21" font-weight="900" fill="#C4B5FD">Anthropic → SpaceX</text>
  <text x="78" y="1018" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="#A78BFA" filter="url(#glow)">$3.1B</text>
  <text x="78" y="1044" font-family="Arial,sans-serif" font-size="20" fill="${gray}">per month · compute contract</text>
  <text x="78" y="1068" font-family="Arial,sans-serif" font-size="18" fill="#7C3AED">$120.5B total through 2029</text>
  <text x="78" y="1090" font-family="Arial,sans-serif" font-size="16" fill="${gray}">SpaceX AI computing is already monetizing</text>

  <!-- Anthropic S-1 card -->
  <rect x="558" y="952" width="468" height="148" rx="16" fill="rgba(251,191,36,0.06)" stroke="${gold}" stroke-width="1.5"/>
  <text x="582" y="994" font-family="Arial Black,Arial,sans-serif" font-size="21" font-weight="900" fill="${gold}">Anthropic S-1</text>
  <text x="582" y="1018" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="${gold}" filter="url(#glow)">$16.3B</text>
  <text x="582" y="1044" font-family="Arial,sans-serif" font-size="20" fill="${gray}">H1 2026 revenue  +1,300% YoY</text>
  <text x="582" y="1068" font-family="Arial,sans-serif" font-size="18" fill="${gold}">$265.6B future commitments</text>
  <text x="582" y="1090" font-family="Arial,sans-serif" font-size="16" fill="${gray}">Confirms AI infra demand is very real</text>

  <!-- KEY TAKEAWAY STRIP -->
  <rect x="54" y="1118" width="972" height="90" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)" stroke-width="1"/>
  <text x="540" y="1153" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="${white}">The convergence is accelerating.</text>
  <text x="540" y="1190" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="${gray}">Self-driving fleet · AI compute revenue · $100B ARR trajectory</text>

  <!-- BOTTOM BAR -->
  <rect x="0" y="1278" width="1080" height="72" fill="rgba(255,255,255,0.03)"/>
  <text x="54" y="1320" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="${white}">investus.kr</text>
  <text x="540" y="1320" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="${gray}">For informational purposes only · Not investment advice</text>
  <text x="1026" y="1320" text-anchor="end" font-family="Arial,sans-serif" font-size="18" fill="${gray}">@investus_kr</text>
</svg>`;
}

async function main() {
  console.log('Generating Instagram card...');
  const svgStr = svg();
  const svgPath = path.join(OUT, 'insta-tsla-spcx-20261028.svg');
  const pngPath = path.join(OUT, 'insta-tsla-spcx-20261028.png');
  fs.writeFileSync(svgPath, svgStr, 'utf8');
  await sharp(Buffer.from(svgStr)).png({ quality: 95 }).toFile(pngPath);
  console.log('  ✓ insta-tsla-spcx-20261028.png');
}

main().catch(e => { console.error(e); process.exit(1); });
