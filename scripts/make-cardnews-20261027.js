#!/usr/bin/env node
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/charts');

function escXml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
}

function hexGrid(x, y, cols, rows, size, color, opacity) {
  let paths = '';
  for(let r=0; r<rows; r++) {
    for(let c=0; c<cols; c++) {
      const cx2 = x + c * size * 1.75 + (r%2 ? size*0.875 : 0);
      const cy2 = y + r * size * 1.515;
      const pts = [];
      for(let i=0;i<6;i++){
        const a = Math.PI/180*(60*i-30);
        pts.push(`${(cx2+size*0.8*Math.cos(a)).toFixed(1)},${(cy2+size*0.8*Math.sin(a)).toFixed(1)}`);
      }
      paths += `<polygon points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}"/>`;
    }
  }
  return paths;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#06021A"/>
      <stop offset="50%" stop-color="#0A0420"/>
      <stop offset="100%" stop-color="#04011A"/>
    </linearGradient>
    <linearGradient id="heroG" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#C4B5FD"/>
      <stop offset="50%" stop-color="#A78BFA"/>
      <stop offset="100%" stop-color="#7C3AED"/>
    </linearGradient>
    <radialGradient id="glowBg" cx="50%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#6D28D9" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#06021A" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="glow2"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>

  <rect width="1080" height="1350" fill="url(#bg)"/>
  <rect width="1080" height="1350" fill="url(#glowBg)"/>
  ${hexGrid(30, 160, 9, 8, 62, '#7C3AED', 0.10)}
  <rect x="0" y="0" width="1080" height="8" fill="url(#heroG)"/>

  <!-- Rocket silhouette (bg) -->
  <g transform="translate(870,390) scale(1.5)" opacity="0.13">
    <ellipse cx="0" cy="0" rx="38" ry="110" fill="#A78BFA"/>
    <polygon points="0,-148 -38,0 38,0" fill="#C4B5FD"/>
    <polygon points="-38,62 -82,132 -38,110" fill="#7C3AED"/>
    <polygon points="38,62 82,132 38,110" fill="#7C3AED"/>
    <ellipse cx="0" cy="148" rx="22" ry="42" fill="#F97316" opacity="0.7"/>
    <ellipse cx="0" cy="172" rx="12" ry="24" fill="#FBBF24" opacity="0.5"/>
  </g>

  <!-- Badge row -->
  <rect x="54" y="32" width="152" height="44" rx="22" fill="#1E1B4B"/>
  <rect x="54" y="32" width="152" height="44" rx="22" fill="none" stroke="#6D28D9" stroke-width="2"/>
  <text x="130" y="61" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="19" font-weight="900" fill="#C4B5FD">SPCX</text>
  <rect x="222" y="32" width="152" height="44" rx="22" fill="#052E16"/>
  <rect x="222" y="32" width="152" height="44" rx="22" fill="none" stroke="#16A34A" stroke-width="2"/>
  <text x="298" y="61" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="19" font-weight="900" fill="#86EFAC">NVDA</text>
  <rect x="390" y="32" width="152" height="44" rx="22" fill="#1C1917"/>
  <rect x="390" y="32" width="152" height="44" rx="22" fill="none" stroke="#D97706" stroke-width="2"/>
  <text x="466" y="61" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="19" font-weight="900" fill="#FCD34D">AMZN</text>

  <!-- Pre-title -->
  <text x="54" y="136" font-family="Arial,sans-serif" font-size="27" fill="#9CA3AF">Anthropic S-1 SEC 공식 확인 · 2026.10.27</text>

  <!-- HERO -->
  <text x="54" y="330" font-family="Arial Black,Arial,sans-serif" font-size="190" font-weight="900" fill="url(#heroG)" filter="url(#glow)">$120.5B</text>
  <text x="54" y="392" font-family="Arial Black,Arial,sans-serif" font-size="46" font-weight="900" fill="#E9D5FF">SpaceX AI 컴퓨팅 5년 계약</text>

  <line x1="54" y1="434" x2="1026" y2="434" stroke="#4C1D95" stroke-width="2" stroke-dasharray="8,5"/>

  <!-- 3 contract blocks -->
  <rect x="54" y="458" width="300" height="196" rx="20" fill="#0D0620" stroke="#A78BFA" stroke-width="2.5"/>
  <text x="204" y="500" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">SpaceXAI</text>
  <text x="204" y="570" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="54" font-weight="900" fill="#A78BFA" filter="url(#glow2)">$120.5B</text>
  <text x="204" y="610" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#C4B5FD">月 $3.1B · NVDA GPU</text>
  <text x="204" y="640" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#6B7280">2029년까지</text>

  <rect x="390" y="458" width="300" height="196" rx="20" fill="#0D0620" stroke="#60A5FA" stroke-width="2.5"/>
  <text x="540" y="500" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">Amazon AWS</text>
  <text x="540" y="570" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="54" font-weight="900" fill="#60A5FA" filter="url(#glow2)">$110B</text>
  <text x="540" y="610" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#93C5FD">10년 비해약</text>
  <text x="540" y="640" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#6B7280">2026–2036</text>

  <rect x="726" y="458" width="300" height="196" rx="20" fill="#0D0620" stroke="#34D399" stroke-width="2.5"/>
  <text x="876" y="500" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">AMD Helios</text>
  <text x="876" y="570" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="54" font-weight="900" fill="#34D399" filter="url(#glow2)">$20B+</text>
  <text x="876" y="610" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#6EE7B7">2027년부터</text>
  <text x="876" y="640" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#6B7280">공급 다변화</text>

  <!-- Total -->
  <text x="54" y="714" font-family="Arial Black,Arial,sans-serif" font-size="34" font-weight="900" fill="#A78BFA">합산 $250B+ — AI 인프라 역대 최대 계약 규모</text>

  <!-- Box 1: Financials -->
  <rect x="54" y="742" width="972" height="218" rx="22" fill="#08030F" stroke="#5B21B6" stroke-width="2"/>
  <line x1="54" y1="790" x2="1026" y2="790" stroke="#7C3AED" stroke-width="1.8"/>
  <text x="108" y="776" font-family="Arial Black,Arial,sans-serif" font-size="25" font-weight="900" fill="#A78BFA">📊  Anthropic 재무 현황 (S-1)</text>
  <text x="108" y="826" font-family="Arial,sans-serif" font-size="23" fill="#E5E7EB">H1 2026 매출 $16.3B — 2025년 연간($4.6B)의 3.5배</text>
  <text x="108" y="860" font-family="Arial,sans-serif" font-size="23" fill="#E5E7EB">연환산 ARR $37.2B · 영업손실 $693M (-4.3%)</text>
  <text x="108" y="894" font-family="Arial,sans-serif" font-size="22" fill="#FDE68A">순손실 $80.7B 중 $72.4B = 전환사채 공정가치 변동 (비현금)</text>
  <text x="108" y="936" font-family="Arial,sans-serif" font-size="19" fill="#6B7280">전환사채 제외 시 실질 손실 $693M — 사실상 손익분기점 도달</text>

  <!-- Box 2: SPCX -->
  <rect x="54" y="980" width="972" height="216" rx="22" fill="#030A00" stroke="#16A34A" stroke-width="2"/>
  <line x1="54" y1="1026" x2="1026" y2="1026" stroke="#22C55E" stroke-width="1.8"/>
  <text x="108" y="1014" font-family="Arial Black,Arial,sans-serif" font-size="25" font-weight="900" fill="#4ADE80">🚀  SPCX 투자자가 봐야 할 것</text>
  <text x="108" y="1062" font-family="Arial,sans-serif" font-size="23" fill="#E5E7EB">SpaceX = AI 인프라 핵심 공급자, SEC 문서로 공식 최초 확인</text>
  <text x="108" y="1096" font-family="Arial,sans-serif" font-size="23" fill="#E5E7EB">로켓 외 AI 수익원 확보 → 기업가치 $1T 재평가 근거 추가</text>
  <text x="108" y="1130" font-family="Arial,sans-serif" font-size="22" fill="#BBF7D0">AI 수요 → NVDA GPU → SpaceX 매출 연결고리 직접 확인</text>
  <text x="108" y="1174" font-family="Arial,sans-serif" font-size="19" fill="#6B7280">SPCX 상장 후 첫 공식 AI 수익 공시 — 밸류에이션 재산정 시작</text>

  <!-- Mini stats row -->
  <rect x="54" y="1218" width="302" height="64" rx="14" fill="#0D0620" stroke="#A78BFA" stroke-width="1.5"/>
  <text x="205" y="1242" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#9CA3AF">Anthropic ARR</text>
  <text x="205" y="1270" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#A78BFA">$37.2B</text>

  <rect x="390" y="1218" width="302" height="64" rx="14" fill="#0D0620" stroke="#60A5FA" stroke-width="1.5"/>
  <text x="541" y="1242" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#9CA3AF">H1 2026 매출</text>
  <text x="541" y="1270" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#60A5FA">$16.3B</text>

  <rect x="726" y="1218" width="302" height="64" rx="14" fill="#0D0620" stroke="#34D399" stroke-width="1.5"/>
  <text x="877" y="1242" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#9CA3AF">3대 계약 합산</text>
  <text x="877" y="1270" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#34D399">$250B+</text>

  <!-- Footer -->
  <rect x="0" y="1300" width="1080" height="42" fill="#06021A"/>
  <text x="54" y="1328" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#A78BFA">investus.kr</text>
  <text x="270" y="1328" font-family="Arial,sans-serif" font-size="18" fill="#4B5563">투자 참고용 · 투자 권유 아닙니다 · 2026-10-27</text>
  <rect x="0" y="1342" width="1080" height="8" fill="url(#heroG)"/>
</svg>`;

const svgPath = path.join(OUT, 'cardnews-20261027.svg');
const pngPath = path.join(OUT, 'cardnews-20261027.png');
fs.writeFileSync(svgPath, svg);
sharp(Buffer.from(svg)).png().toFile(pngPath).then(() => {
  console.log('✓ cardnews-20261027.png 생성 완료');
}).catch(e => { console.error(e); process.exit(1); });
