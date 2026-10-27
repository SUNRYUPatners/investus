#!/usr/bin/env node
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '../public/charts');

function hexGrid(x,y,cols,rows,size,color,op){
  let p='';
  for(let r=0;r<rows;r++){for(let c=0;c<cols;c++){
    const cx=x+c*size*1.75+(r%2?size*0.875:0), cy=y+r*size*1.515;
    const pts=[];
    for(let i=0;i<6;i++){const a=Math.PI/180*(60*i-30);pts.push(`${(cx+size*0.8*Math.cos(a)).toFixed(1)},${(cy+size*0.8*Math.sin(a)).toFixed(1)}`);}
    p+=`<polygon points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="1" opacity="${op}"/>`;
  }}return p;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#04011A"/>
    <stop offset="45%" stop-color="#080220"/>
    <stop offset="100%" stop-color="#03000F"/>
  </linearGradient>
  <linearGradient id="purpleG" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#C4B5FD"/>
    <stop offset="50%" stop-color="#A78BFA"/>
    <stop offset="100%" stop-color="#7C3AED"/>
  </linearGradient>
  <linearGradient id="redG" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#FCA5A5"/>
    <stop offset="100%" stop-color="#EF4444"/>
  </linearGradient>
  <radialGradient id="gBg" cx="50%" cy="28%" r="45%">
    <stop offset="0%" stop-color="#5B21B6" stop-opacity="0.28"/>
    <stop offset="100%" stop-color="#04011A" stop-opacity="0"/>
  </radialGradient>
  <filter id="glow"><feGaussianBlur stdDeviation="14" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="glow2"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>

<rect width="1080" height="1350" fill="url(#bg)"/>
<rect width="1080" height="1350" fill="url(#gBg)"/>
${hexGrid(20,140,10,9,58,'#6D28D9',0.09)}
<rect x="0" y="0" width="1080" height="8" fill="url(#purpleG)"/>

<!-- Rocket bg silhouette -->
<g transform="translate(880,380) scale(1.4)" opacity="0.11">
  <ellipse cx="0" cy="0" rx="38" ry="110" fill="#A78BFA"/>
  <polygon points="0,-148 -38,0 38,0" fill="#C4B5FD"/>
  <polygon points="-38,62 -82,132 -38,110" fill="#7C3AED"/>
  <polygon points="38,62 82,132 38,110" fill="#7C3AED"/>
  <ellipse cx="0" cy="148" rx="22" ry="42" fill="#F97316" opacity="0.7"/>
</g>

<!-- Badge row -->
<rect x="54" y="32" width="156" height="44" rx="22" fill="#1E1B4B"/>
<rect x="54" y="32" width="156" height="44" rx="22" fill="none" stroke="#6D28D9" stroke-width="2"/>
<text x="132" y="61" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="19" font-weight="900" fill="#C4B5FD">$SPCX</text>

<rect x="226" y="32" width="136" height="44" rx="22" fill="#1A0505"/>
<rect x="226" y="32" width="136" height="44" rx="22" fill="none" stroke="#DC2626" stroke-width="2"/>
<text x="294" y="61" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="19" font-weight="900" fill="#FCA5A5">$TSLA</text>

<rect x="378" y="32" width="140" height="44" rx="22" fill="#052E16"/>
<rect x="378" y="32" width="140" height="44" rx="22" fill="none" stroke="#16A34A" stroke-width="2"/>
<text x="448" y="61" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="19" font-weight="900" fill="#86EFAC">$NVDA</text>

<!-- Date / pre-title -->
<text x="54" y="134" font-family="Arial,sans-serif" font-size="26" fill="#6B7280">Anthropic SEC S-1 · Oct 27, 2026</text>

<!-- HERO SPCX -->
<text x="54" y="332" font-family="Arial Black,Arial,sans-serif" font-size="190" font-weight="900" fill="url(#purpleG)" filter="url(#glow)">$120.5B</text>
<text x="54" y="390" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="#E9D5FF">SpaceX AI Compute — 5-Year Deal</text>
<text x="54" y="434" font-family="Arial,sans-serif" font-size="26" fill="#9CA3AF">$3.1B/month · 100% NVDA GPUs · Confirmed in SEC filing</text>

<line x1="54" y1="466" x2="1026" y2="466" stroke="#4C1D95" stroke-width="1.5" stroke-dasharray="8,5"/>

<!-- 3 contract boxes -->
<rect x="54" y="486" width="300" height="186" rx="18" fill="#0A0420" stroke="#A78BFA" stroke-width="2"/>
<text x="204" y="526" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#9CA3AF">SpaceXAI</text>
<text x="204" y="592" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="#A78BFA" filter="url(#glow2)">$120.5B</text>
<text x="204" y="630" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#C4B5FD">$3.1B/mo · NVDA</text>
<text x="204" y="658" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">thru 2029</text>

<rect x="390" y="486" width="300" height="186" rx="18" fill="#0A0420" stroke="#60A5FA" stroke-width="2"/>
<text x="540" y="526" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#9CA3AF">Amazon AWS</text>
<text x="540" y="592" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="#60A5FA" filter="url(#glow2)">$110B</text>
<text x="540" y="630" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#93C5FD">10yr non-cancel</text>
<text x="540" y="658" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">2026–2036</text>

<rect x="726" y="486" width="300" height="186" rx="18" fill="#0A0420" stroke="#34D399" stroke-width="2"/>
<text x="876" y="526" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#9CA3AF">AMD Helios</text>
<text x="876" y="592" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="52" font-weight="900" fill="#34D399" filter="url(#glow2)">$20B+</text>
<text x="876" y="630" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#6EE7B7">from 2027</text>
<text x="876" y="658" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">supply divers.</text>

<text x="54" y="736" font-family="Arial Black,Arial,sans-serif" font-size="32" font-weight="900" fill="#A78BFA">3 Contracts Total $250B+ — Largest AI Infra Commitments Ever</text>

<!-- Box 1: Anthropic S-1 -->
<rect x="54" y="762" width="972" height="210" rx="20" fill="#080310" stroke="#5B21B6" stroke-width="2"/>
<line x1="54" y1="808" x2="1026" y2="808" stroke="#7C3AED" stroke-width="1.8"/>
<text x="108" y="795" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#A78BFA">📊  Anthropic Financials (S-1)</text>
<text x="108" y="842" font-family="Arial,sans-serif" font-size="23" fill="#E5E7EB">H1 2026 revenue $16.3B — 3.5x full-year 2025 ($4.6B) in 6 months</text>
<text x="108" y="876" font-family="Arial,sans-serif" font-size="23" fill="#E5E7EB">Annualized ARR $37.2B · Op. loss $693M (−4.3%), near breakeven</text>
<text x="108" y="910" font-family="Arial,sans-serif" font-size="21" fill="#FDE68A">Net loss $80.7B: $72.4B non-cash (convertible note fair-value change)</text>
<text x="108" y="950" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">Excluding non-cash: real operating loss is just $693M — breakeven in sight</text>

<!-- Box 2: TSLA today -->
<rect x="54" y="992" width="972" height="196" rx="20" fill="#080310" stroke="#DC2626" stroke-width="2"/>
<line x1="54" y1="1036" x2="1026" y2="1036" stroke="#EF4444" stroke-width="1.8"/>
<text x="108" y="1024" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#FCA5A5">⚡  Tesla Today</text>
<text x="108" y="1068" font-family="Arial,sans-serif" font-size="23" fill="#E5E7EB">FSD launches on Turo — first time renters access Full Self-Driving</text>
<text x="108" y="1102" font-family="Arial,sans-serif" font-size="23" fill="#E5E7EB">Tesla earns $3,284 every second — $10.2B revenue per hour run-rate</text>
<text x="108" y="1136" font-family="Arial,sans-serif" font-size="21" fill="#FCA5A5">FSD on Turo = new recurring revenue stream beyond vehicle sales</text>
<text x="108" y="1168" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">Turo fleet deployment expands FSD data collection at zero incremental cost</text>

<!-- Bottom mini stats -->
<rect x="54" y="1210" width="298" height="68" rx="14" fill="#0A0420" stroke="#A78BFA" stroke-width="1.5"/>
<text x="203" y="1234" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" fill="#9CA3AF">Anthropic ARR</text>
<text x="203" y="1264" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="27" font-weight="900" fill="#A78BFA">$37.2B</text>

<rect x="391" y="1210" width="298" height="68" rx="14" fill="#0A0420" stroke="#EF4444" stroke-width="1.5"/>
<text x="540" y="1234" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" fill="#9CA3AF">TSLA rev/sec</text>
<text x="540" y="1264" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="27" font-weight="900" fill="#FCA5A5">$3,284</text>

<rect x="728" y="1210" width="298" height="68" rx="14" fill="#0A0420" stroke="#34D399" stroke-width="1.5"/>
<text x="877" y="1234" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" fill="#9CA3AF">Contracts total</text>
<text x="877" y="1264" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="27" font-weight="900" fill="#34D399">$250B+</text>

<!-- Footer -->
<rect x="0" y="1300" width="1080" height="42" fill="#04011A"/>
<text x="54" y="1329" font-family="Arial Black,Arial,sans-serif" font-size="22" font-weight="900" fill="#A78BFA">investus.kr</text>
<text x="265" y="1329" font-family="Arial,sans-serif" font-size="17" fill="#4B5563">For reference only · Not investment advice · Oct 27, 2026</text>
<rect x="0" y="1342" width="1080" height="8" fill="url(#purpleG)"/>
</svg>`;

const svgPath = path.join(OUT, 'cardnews-20261027-en.svg');
const pngPath = path.join(OUT, 'cardnews-20261027-en.png');
fs.writeFileSync(svgPath, svg);
sharp(Buffer.from(svg)).png().toFile(pngPath)
  .then(()=>console.log('✓ cardnews-20261027-en.png'))
  .catch(e=>{console.error(e);process.exit(1);});
