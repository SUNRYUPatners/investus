#!/usr/bin/env node
// Chart generator — 2026-10-26 final — 합병 Kalshi · FSD 수요 · TSLA P/E · 한장요약
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/charts');
const DATE = '20261026';

function escXml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
}
function base(f1='#0D1117',f2='#0A0520',a1='#EF4444',a2='#C084FC'){
  return `<defs>
    <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${f1}"/><stop offset="100%" stop-color="${f2}"/>
    </linearGradient>
    <linearGradient id="accentG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${a1}"/><stop offset="100%" stop-color="${a2}"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="1080" height="1350" fill="url(#bgG)"/>
  <rect x="0" y="0" width="1080" height="10" fill="url(#accentG)"/>`;
}
function footer(){
  return `<rect x="0" y="1340" width="1080" height="10" fill="url(#accentG)"/>
  <text x="40" y="1333" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">investus.kr · Not investment advice · INVESTUS SRP</text>`;
}
function badge(x,y,w,label,bg,border,tc){
  return `<rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="${bg}"/>
  <rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="none" stroke="${border}" stroke-width="2"/>
  <text x="${x+w/2}" y="${y+26}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="${tc}">${escXml(label)}</text>`;
}
function statBox(x,y,w,h,top,big,unit,sub,accent='#EF4444'){
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#0F1623" stroke="${accent}" stroke-width="2"/>
  <text x="${x+w/2}" y="${y+34}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${escXml(top)}</text>
  <text x="${x+w/2}" y="${y+96}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="54" font-weight="900" fill="${accent}">${escXml(big)}</text>
  <text x="${x+w/2}" y="${y+128}" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#D1D5DB">${escXml(unit)}</text>
  <text x="${x+w/2}" y="${y+158}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">${escXml(sub)}</text>`;
}
function msgBox(y, titleText, lines, accentTop='#F59E0B', borderColor='#92400E'){
  const lh = 34;
  const h = 72 + lines.length * lh + 28;
  const textSvg = lines.map((ln, i) =>
    `<text x="108" y="${y+72+i*lh}" font-family="Arial,sans-serif" font-size="24" fill="${i===lines.length-1?'#FDE68A':'#E5E7EB'}">${escXml(ln)}</text>`
  ).join('');
  const svg = `<rect x="54" y="${y}" width="972" height="${h}" rx="22" fill="#0F0A00" stroke="${borderColor}" stroke-width="2.5"/>
  <line x1="54" y1="${y+48}" x2="1026" y2="${y+48}" stroke="${accentTop}" stroke-width="2"/>
  <text x="108" y="${y+33}" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="${accentTop}">${escXml(titleText)}</text>
  ${textSvg}`;
  return { svg, h, nextY: y + h + 14 };
}

async function save(slug, svg) {
  const svgPath = path.join(OUT, `${slug}.svg`);
  const pngPath = path.join(OUT, `${slug}.png`);
  fs.writeFileSync(svgPath, svg);
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
  console.log(`  ✓ ${slug}.png`);
}

// ── Tesla-SpaceX 합병 Kalshi 70% ─────────────────────────────────
function makeKalshi(ko){
  const heroNum  = ko ? '70%' : '70%';
  const heroSub  = ko ? 'Tesla-SpaceX 합병 · 2028년 전 성사 확률 (Kalshi 예측시장)' : 'Tesla-SpaceX merger before 2028 — Kalshi prediction market';
  const msg1lines = ko
    ? ['Kalshi: 2028년 전 Tesla-SpaceX 합병 성사 확률 70%',
       '$3.7조 메가딜 — SpaceX 1.7조 + Tesla 1.2조 합산',
       '양사 독립위원회 구성, 대등합병 탐색 단계',
       '확정 조건·교환비율 없음 — 탐색 단계']
    : ['Kalshi: 70% odds Tesla-SpaceX merge before 2028',
       '$3.7T mega-deal — SpaceX ~$1.7T + Tesla ~$1.2T',
       'Both companies formed independent committees',
       'No confirmed terms or exchange ratio yet'];
  const msg2lines = ko
    ? ['Gerstner(Benchmark): SpaceX가 TSLA를 $420~$550에 현금 인수 시나리오',
       'Tesla 주주: 최대 45% 프리미엄 수령 구도',
       'SpaceX 주주: 자금 조달 부담 + EV 리스크 검토 필요']
    : ['Gerstner(Benchmark): SpaceX acquires TSLA at $420–$550 cash',
       'Tesla shareholders: up to 45% premium scenario',
       'SpaceX shareholders: financing burden + EV risk to assess'];

  const m1 = msgBox(808, ko?'📊 Kalshi 예측시장':'📊 Kalshi Prediction Market', msg1lines, '#6366F1', '#312E81');
  const m2 = msgBox(m1.nextY, ko?'💡 Gerstner 인수 시나리오':'💡 Gerstner Acquisition Scenario', msg2lines, '#10B981', '#064E3B');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#050518','#030315','#6366F1','#4338CA')}
  ${badge(40,24,130,'TSLA','#064E3B','#10B981','#A7F3D0')}
  ${badge(192,24,130,'SPCX','#312E81','#6366F1','#C7D2FE')}
  <text x="540" y="200" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="220" font-weight="900" fill="#6366F1" filter="url(#glow)">${escXml(heroNum)}</text>
  <text x="540" y="286" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="#C7D2FE">${escXml(heroSub)}</text>
  <line x1="54" y1="316" x2="1026" y2="316" stroke="#4338CA" stroke-width="1.5" stroke-dasharray="6,4"/>
  ${statBox(40,336,310,176,ko?'합병 규모':'Deal Size','$3.7T',ko?'추산':'estimated',ko?'합산 기업가치':'combined market cap','#6366F1')}
  ${statBox(380,336,310,176,ko?'인수 상단 (Gerstner)':'Upper Price (Gerstner)','$550','per share',ko?'현재가 +45%':'vs ~$379 +45%','#10B981')}
  ${statBox(720,336,320,176,ko?'TSLA (발언 시점)':'TSLA at comment','$379','TSLA',ko?'CNBC 기준':'CNBC ref price','#F59E0B')}
  <rect x="54" y="540" width="972" height="248" rx="22" fill="#0A0A2A" stroke="#4338CA" stroke-width="2"/>
  <text x="540" y="586" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#A5B4FC">${ko?'합병 vs 인수 — 두 시나리오 비교':'Merger vs Acquisition — Two Scenarios'}</text>
  <line x1="54" y1="598" x2="1026" y2="598" stroke="#4338CA" stroke-width="1.5"/>
  <text x="80" y="644" font-family="Arial,sans-serif" font-size="24" fill="#C7D2FE">${ko?'▸ 독립위원회: 대등합병(비율 협상, 양사 병존)':'▸ Independent Committee: merger of equals (ratio negotiation)'}</text>
  <text x="80" y="682" font-family="Arial,sans-serif" font-size="24" fill="#6EE7B7">${ko?'▸ Gerstner: SpaceX가 Tesla를 현금 매수($420~550)':'▸ Gerstner: SpaceX acquires Tesla for cash ($420–550)'}</text>
  <text x="80" y="720" font-family="Arial,sans-serif" font-size="24" fill="#9CA3AF">${ko?'시너지: FSD+Starlink · Optimus+AI 컴퓨트 · 에너지 생태계':'Synergies: FSD+Starlink · Optimus+AI compute · Energy'}</text>
  <text x="80" y="758" font-family="Arial,sans-serif" font-size="24" fill="#6B7280">${ko?'→ 어느 쪽도 확정 없음. 탐색 단계.':'→ Neither confirmed. Exploration phase only.'}</text>
  ${m1.svg}
  ${m2.svg}
  ${footer()}
</svg>`;
}

// ── Tesla FSD 수요 > 생산 ─────────────────────────────────────────
function makeFsdDemand(ko){
  const heroLine = ko ? '"상당한 격차"' : '"Significant Margin"';
  const heroSub  = ko ? 'Tesla 수요가 생산을 초과 — FSD가 판매 드라이브 (Musk, Q3 어닝콜)' : 'Tesla demand exceeds production — FSD drives sales (Musk, Q3 call)';
  const msg1lines = ko
    ? ['머스크: FSD에 대한 급증하는 관심이 수요를 이끌고 있습니다',
       'Polymarket: Tesla 차량 수요가 생산 능력을 상당한 격차로 초과',
       'Doctor Jack: FSD가 지금 Tesla 판매를 이끌고 있습니다',
       '생산 램프업 약속 — 빠를수록 단기 EPS에 직결']
    : ['Musk: surging interest in FSD is driving demand',
       'Polymarket: demand exceeds production by a significant margin',
       'Doctor Jack: FSD is now driving Tesla sales',
       'Production ramp promised — speed matters for near-term EPS'];
  const msg2lines = ko
    ? ['오스틴 F1 예선 Cybercab 목격 1,250건 — 사상 최다',
       '무인 비율 92.7% (1,159/1,250) — 역대 최고',
       '수요>공급 구도 = 가격 인하 없이 매출 확대 가능']
    : ['Austin F1 qualifying: 1,250 Cybercab sightings — all-time record',
       '92.7% driverless (1,159/1,250) — new high',
       'Demand>supply = ASP maintained without price cuts'];

  const m1 = msgBox(800, ko?'🔥 수요 초과 신호':'🔥 Demand Surge Signal', msg1lines, '#10B981', '#065F46');
  const m2 = msgBox(m1.nextY, ko?'🏎️ F1 예선 현장 데이터':'🏎️ Austin F1 Field Data', msg2lines, '#F59E0B', '#78350F');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#020F0A','#010805','#10B981','#059669')}
  ${badge(40,24,130,'TSLA','#065F46','#10B981','#A7F3D0')}
  <text x="540" y="160" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="72" font-weight="900" fill="#10B981" filter="url(#glow)">${escXml(heroLine)}</text>
  <text x="540" y="230" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#A7F3D0">${escXml(heroSub)}</text>
  <line x1="54" y1="260" x2="1026" y2="260" stroke="#065F46" stroke-width="1.5" stroke-dasharray="6,4"/>
  ${statBox(40,280,240,156,ko?'오스틴 F1 목격':'Austin F1','1,250',ko?'건':'sightings',ko?'역대 최다':'all-time record','#10B981')}
  ${statBox(302,280,240,156,ko?'무인 주행':'Driverless','1,159',ko?'건':'sightings','92.7%','#34D399')}
  ${statBox(564,280,240,156,ko?'웨이모 현황':'Waymo now','1,207',ko?'대':'fleet',ko?'237대 앞서':'237 ahead','#F59E0B')}
  ${statBox(826,280,214,156,ko?'텍사스 Tesla':'TX Tesla','970',ko?'대':'total',ko?'DMV 등록':'DMV reg.','#6EE7B7')}
  <rect x="54" y="462" width="972" height="310" rx="22" fill="#021A10" stroke="#065F46" stroke-width="2"/>
  <text x="540" y="506" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#34D399">${ko?'Musk — Q3 2026 어닝콜 직접 발언':'Musk — Q3 2026 Earnings Call'}</text>
  <line x1="54" y1="518" x2="1026" y2="518" stroke="#065F46" stroke-width="1.5"/>
  <text x="80" y="564" font-family="Arial,sans-serif" font-size="24" fill="#A7F3D0">${ko?'"Tesla 차량에 대한 수요가 생산 능력을':'&quot;Demand for Tesla vehicles is exceeding'}</text>
  <text x="80" y="598" font-family="Arial,sans-serif" font-size="24" fill="#A7F3D0">${ko?'상당한 격차(significant margin)로 초과하고 있습니다."':'our production capacity by a significant margin.&quot;'}</text>
  <text x="80" y="642" font-family="Arial,sans-serif" font-size="24" fill="#10B981">${ko?'"이 수요는 Full Self-Driving 기술에 대한':'&quot;This is driven by surging interest in our'}</text>
  <text x="80" y="676" font-family="Arial,sans-serif" font-size="24" fill="#10B981">${ko?'급증하는 관심에 의해 주도되고 있습니다."':'Full Self-Driving technology.&quot;'}</text>
  <text x="80" y="720" font-family="Arial,sans-serif" font-size="24" fill="#6B7280">${ko?'→ 가격 인하 없이 수요 유지, 생산 램프업이 단기 EPS 열쇠':'→ No price cuts needed; ramp speed is the short-term EPS lever'}</text>
  ${m1.svg}
  ${m2.svg}
  ${footer()}
</svg>`;
}

// ── TSLA P/E 244.5배 GNG ─────────────────────────────────────────
function makeTslaPe(ko){
  const heroNum  = ko ? '244.5x' : '244.5x';
  const heroSub  = ko ? 'TSLA P/E 블렌드 (GNG Research · 10월 23일 기준)' : 'TSLA Blended P/E · GNG Research · Oct 23, 2026';
  const msg1lines = ko
    ? ['P/E 블렌드 244.5배 · TTM 258.5배 · 주가 $372.22',
       '10년 Normal P/E 148.1배 대비 현재 65% 프리미엄',
       'GNG Custom FV(244.5배) = $372.22 → 현재가 = 공정가치',
       'Normal FV(148.1배) = $225.52 → 현재 39% 고평가 구도']
    : ['P/E blended 244.5x · TTM 258.5x · Price $372.22',
       '65% premium to own 10-yr normal P/E of 148.1x',
       'GNG Custom FV (244.5x) = $372.22 → current price = fair',
       'Normal FV (148.1x) = $225.52 → 39% overvalued at normal'];
  const msg2lines = ko
    ? ['EPS CAGR FY25~FY27E +18.5%/년 → PEG 13.2배 (합리적 수준)',
       'Vulcan Research: FY25~27 성장 + TSLA/SPCX 합병 잠재력',
       '2027년 말 Custom FV 기준 +43.8%/년 → $572 시나리오']
    : ['EPS CAGR FY25-27E +18.5%/yr → PEG 13.2x (reasonable)',
       'Vulcan Research: growth + TSLA/SPCX merger premium',
       'Custom FV path by Dec 2027: +43.8%/yr → $572 scenario'];

  const m1 = msgBox(808, ko?'📊 GNG 밸류에이션 요약':'📊 GNG Valuation Summary', msg1lines, '#3B82F6', '#1D4ED8');
  const m2 = msgBox(m1.nextY, ko?'📈 EPS 성장 & 합병 논리':'📈 EPS Growth & Merger Logic', msg2lines, '#10B981', '#064E3B');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#030A18','#020712','#3B82F6','#1D4ED8')}
  ${badge(40,24,130,'TSLA','#1D4ED8','#3B82F6','#BFDBFE')}
  <text x="540" y="188" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="160" font-weight="900" fill="#3B82F6" filter="url(#glow)">${escXml(heroNum)}</text>
  <text x="540" y="252" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#BFDBFE">${escXml(heroSub)}</text>
  <line x1="54" y1="282" x2="1026" y2="282" stroke="#1D4ED8" stroke-width="1.5" stroke-dasharray="6,4"/>
  ${statBox(40,302,320,176,ko?'Custom FV (244.5x)':'Custom FV (244.5x)','$372','= 현재가',ko?'과대평가 없음':'no overvaluation','#3B82F6')}
  ${statBox(390,302,300,176,ko?'Normal FV (148.1x)':'Normal FV (148.1x)','$226','vs $372',ko?'-39% 괴리':'39% gap','#EF4444')}
  ${statBox(720,302,320,176,ko?'EPS CAGR':'EPS CAGR','+18.5%','FY25-27E',ko?'연간 성장':'annual','#10B981')}
  <rect x="54" y="506" width="972" height="270" rx="22" fill="#030F24" stroke="#1D4ED8" stroke-width="2"/>
  <text x="540" y="552" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#60A5FA">${ko?'P/E 배수 분해 — Custom vs Normal':'P/E Multiple Analysis — Custom vs Normal'}</text>
  <line x1="54" y1="564" x2="1026" y2="564" stroke="#1D4ED8" stroke-width="1.5"/>
  <text x="80" y="610" font-family="Arial,sans-serif" font-size="24" fill="#BFDBFE">${ko?'▸ Custom FV 244.5x: EPS CAGR 18.5% 지속 가정 기준 적정':'▸ Custom FV 244.5x: fair IF 18.5% EPS CAGR sustained'}</text>
  <text x="80" y="648" font-family="Arial,sans-serif" font-size="24" fill="#F87171">${ko?'▸ Normal FV 148.1x: 역사적 평균 회귀 시 $225 (-39%)':'▸ Normal FV 148.1x: mean reversion scenario → $225 (-39%)'}</text>
  <text x="80" y="686" font-family="Arial,sans-serif" font-size="24" fill="#10B981">${ko?'▸ PEG 비율: 244.5 ÷ 18.5 = 13.2배 (고성장주 기준 합리적)':'▸ PEG ratio: 244.5 ÷ 18.5 = 13.2x (reasonable for high-growth)'}</text>
  <text x="80" y="724" font-family="Arial,sans-serif" font-size="24" fill="#6B7280">${ko?'→ 합병 프리미엄 제거 시 Custom FV 근거 약화 — 리스크 요소':'→ Remove merger premium → Custom FV basis weakens — key risk'}</text>
  ${m1.svg}
  ${m2.svg}
  ${footer()}
</svg>`;
}

// ── 한장요약 2026-10-26 ──────────────────────────────────────────
function makeSummary(ko){
  const date = ko ? '2026년 10월 26일' : 'October 26, 2026';
  const topicCount = 8;
  const topics = ko
    ? [
        ['합병', 'Kalshi 70%', '2028년 전 Tesla-SpaceX 합병 성사', '#6366F1'],
        ['META', 'FCF 적자', '상장 14년 만에 첫 분기 FCF -$1.2B', '#3B82F6'],
        ['Cybercab', '970대 신기록', '텍사스 970대 · F1 1,250건 무인 92.7%', '#10B981'],
        ['FSD', '수요>생산', '머스크 "상당한 격차" · 생산 램프업 약속', '#34D399'],
        ['TSLA', 'P/E 244.5x', 'GNG 공정가치 $372 · Normal $226 격차', '#60A5FA'],
        ['SPCX', '$40B GPU', '네오클라우드 200개 붕괴 · GPU 흡수', '#9333EA'],
        ['Starlink', '1,360만', 'YoY +89% · $40B 부채 신용 근거', '#A855F7'],
        ['Gerstner', '$420~550', 'SpaceX가 Tesla 현금 인수 시나리오', '#F59E0B'],
      ]
    : [
        ['MERGER', 'Kalshi 70%', 'Tesla-SpaceX before 2028 on Kalshi', '#6366F1'],
        ['META', 'FCF Negative', 'First-ever negative FCF -$1.2B since IPO', '#3B82F6'],
        ['Cybercab', '970 Record', 'TX 970 fleet · F1 1,250 sightings 92.7%', '#10B981'],
        ['FSD', 'Demand>Supply', 'Musk: significant margin · ramp promised', '#34D399'],
        ['TSLA', 'P/E 244.5x', 'GNG Custom FV=$372 · Normal=$226 gap', '#60A5FA'],
        ['SPCX', '$40B GPU', '200+ neoclouds collapse · GPU absorption', '#9333EA'],
        ['Starlink', '13.6M', 'YoY+89% · underpins $40B credit profile', '#A855F7'],
        ['Gerstner', '$420–550', 'SpaceX acquires Tesla cash scenario', '#F59E0B'],
      ];

  const topicSvg = topics.map((t, i) => {
    const col = Math.floor(i / 4);  // 0 or 1
    const row = i % 4;
    const x = 54 + col * 510;
    const y = 360 + row * 108;
    const [tag, num, desc, color] = t;
    return `<rect x="${x}" y="${y}" width="490" height="94" rx="16" fill="#0A0A1A" stroke="${color}" stroke-width="1.5"/>
    <rect x="${x}" y="${y}" width="100" height="94" rx="16" fill="${color}22"/>
    <text x="${x+50}" y="${y+38}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" fill="${color}">${escXml(tag)}</text>
    <text x="${x+50}" y="${y+62}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="18" font-weight="900" fill="${color}">${escXml(num)}</text>
    <text x="${x+116}" y="${y+55}" font-family="Arial,sans-serif" font-size="21" fill="#E5E7EB">${escXml(desc)}</text>`;
  }).join('');

  const heroTitle = ko ? `2026.10.26 — TOP ${topicCount}` : `Oct 26, 2026 — TOP ${topicCount}`;
  const heroSub = ko ? 'TSLA·SPCX·META 한장요약' : 'TSLA · SPCX · META Daily Summary';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#050510','#020208','#6366F1','#10B981')}
  ${badge(40,24,130,'TSLA','#064E3B','#10B981','#A7F3D0')}
  ${badge(192,24,130,'SPCX','#312E81','#6366F1','#C7D2FE')}
  ${badge(344,24,120,'META','#1D4ED8','#3B82F6','#BFDBFE')}
  <text x="540" y="130" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="#E5E7EB" filter="url(#glow)">${escXml(heroTitle)}</text>
  <text x="540" y="184" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="#9CA3AF">${escXml(heroSub)}</text>
  <line x1="54" y1="210" x2="1026" y2="210" stroke="#4338CA" stroke-width="1.5"/>
  <text x="54" y="268" font-family="Arial Black,Arial,sans-serif" font-size="36" font-weight="900" fill="#6366F1">${ko?'합병 Kalshi 70%':'MERGER: Kalshi 70%'}</text>
  <text x="54" y="314" font-family="Arial,sans-serif" font-size="24" fill="#C7D2FE">${ko?'Tesla+SpaceX 2028년 전 · $3.7조 메가딜 · 독립위원회 탐색 단계':'Tesla+SpaceX before 2028 · $3.7T mega-deal · independent committees exploring'}</text>
  <line x1="54" y1="340" x2="1026" y2="340" stroke="#1F2937" stroke-width="1"/>
  ${topicSvg}
  <line x1="54" y1="810" x2="1026" y2="810" stroke="#1F2937" stroke-width="1"/>
  <text x="54" y="866" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="#10B981">${ko?'오늘의 시사점':'Key Takeaway'}</text>
  <text x="54" y="912" font-family="Arial,sans-serif" font-size="23" fill="#A7F3D0">${ko?'합병 70% + FSD 수요>생산 + AI 컴퓨트 독점 — 세 흐름이 동시 전개':'Merger 70% + FSD demand>supply + AI compute dominance — all three converging'}</text>
  <text x="54" y="956" font-family="Arial,sans-serif" font-size="23" fill="#9CA3AF">${ko?'META FCF 첫 적자는 AI 투자 사이클 현금 소비 단계 확인':'META first FCF loss confirms AI capex cycle is in cash-burn phase'}</text>
  <text x="54" y="1000" font-family="Arial,sans-serif" font-size="23" fill="#9CA3AF">${ko?'MSFT·GOOGL(10/28)·AMZN(10/29) 어닝에서 AI capex 방향 추가 확인':'MSFT·GOOGL(10/28)·AMZN(10/29) earnings will confirm AI capex cycle'}</text>
  <line x1="54" y1="1030" x2="1026" y2="1030" stroke="#1F2937" stroke-width="1"/>
  <text x="54" y="1090" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="#F59E0B">${ko?'핵심 수치 한눈에':'Key Numbers at a Glance'}</text>
  <text x="54" y="1134" font-family="Arial,sans-serif" font-size="23" fill="#FDE68A">${ko?'TSLA P/E 244.5x  ·  합병 $3.7T  ·  Gerstner $420~550':'TSLA P/E 244.5x  ·  Merger $3.7T  ·  Gerstner $420–550'}</text>
  <text x="54" y="1178" font-family="Arial,sans-serif" font-size="23" fill="#FDE68A">${ko?'Cybercab 970대 · F1 1,250건 · 무인 92.7%  ·  Starlink 1,360만':'Cybercab 970 · F1 1,250 sightings · 92.7% driverless  ·  Starlink 13.6M'}</text>
  <text x="54" y="1222" font-family="Arial,sans-serif" font-size="23" fill="#FDE68A">${ko?'META FCF -$1.2B · AI capex $34.9B  ·  SpaceX $40B GPU 부채':'META FCF -$1.2B · AI capex $34.9B  ·  SpaceX $40B GPU debt'}</text>
  <text x="54" y="1266" font-family="Arial,sans-serif" font-size="23" fill="#FDE68A">${ko?'SpaceX 13GW 컴퓨트 · GB300 20만대/월  ·  Starlink +89% YoY':'SpaceX 13GW compute · 200K GB300/mo  ·  Starlink +89% YoY'}</text>
  ${footer()}
</svg>`;
}

(async()=>{
  for(const ko of [true,false]){
    const sfx=ko?'':'-en';
    await save(`kalshi-tsla-spcx-merger-70pct-${DATE}${sfx}`, makeKalshi(ko));
    await save(`tsla-fsd-demand-exceeds-supply-${DATE}${sfx}`, makeFsdDemand(ko));
    await save(`tsla-pe-244x-gng-${DATE}${sfx}`, makeTslaPe(ko));
    await save(`summary-${DATE}${sfx}`, makeSummary(ko));
  }
  console.log('All final charts done.');
})();
