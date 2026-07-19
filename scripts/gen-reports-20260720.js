// 2026-07-20 리포트 SVG 생성기 — 7월 2일자 스타일 통일
// 실행: node scripts/gen-reports-20260720.js
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.07.20';

const P = {
  mint:   { fg:'#4ade80', fg2:'#22c55e', bg2:'#061209', card:'#0a1a0a' },
  blue:   { fg:'#60a5fa', fg2:'#3b82f6', bg2:'#06121f', card:'#0a1420' },
  red:    { fg:'#ef4444', fg2:'#dc2626', bg2:'#1a0808', card:'#1a0808' },
  purple: { fg:'#a78bfa', fg2:'#8b5cf6', bg2:'#140b1f', card:'#1a0f2a' },
  orange: { fg:'#fb923c', fg2:'#f97316', bg2:'#1a1408', card:'#1a1408' },
};

function esc(s) {
  return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;').replace(/</g,'&lt;');
}
function E(o) { const r={}; for (const k in o) r[k]=typeof o[k]==='string'?esc(o[k]):o[k]; return r; }

function tpl(oRaw) {
  const o = E(oRaw);
  const p = P[oRaw.color] || P.mint;
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
  <text x="974" y="44" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle">${DATE}</text>

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

  <text x="540" y="974" font-family="Arial" font-size="20" fill="#374151" text-anchor="middle">${o.footer} · ${DATE}</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#g)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${o.brand}</text>
</svg>`;
}

const BRAND_KO = 'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE';
const BRAND_EN = 'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE';

const T = [
// 1. Cybertruck Giga Texas 240
{ file:'cbrtruck-giga-texas-240', color:'mint', badge:'TSLA',
  ko:{ title:'Cybertruck — Giga Texas 240대 라인업', heroIcon:'🛻', heroBig:'240 units', heroSub:'기가 텍사스 야드에서 드론 촬영된 사이버트럭 라인업',
    cards:[{icon:'🛻',big:'240',mid:'Cybertruck 수량',sub:'record spotted'},{icon:'📍',big:'Giga TX',mid:'집계 위치',sub:'Texas factory'},{icon:'🚁',big:'Drone shot',mid:'출처',sub:'aerial confirm'}],
    quoteLabel:'SAWYER MERRITT', quoteKo:'"기가 텍사스에 240대 사이버트럭이 오늘 아침 포착됐다"', quoteEn:'"A record 240 Cybertrucks spotted this morning at Giga Texas"',
    source:'Source: Sawyer Merritt · 2026.07.19',
    noteHead:'양산 라인업 실측 — 인도/등록 데이터로 확정 필요', noteSub:'수요 흡수와 재고 회전이 진짜 지표',
    footer:'TSLA Cybertruck · Giga Texas 240', brand:BRAND_KO },
  en:{ title:'Cybertruck — 240 Units Lined Up at Giga Texas', heroIcon:'🛻', heroBig:'240 units', heroSub:'Aerial drone shot of Cybertrucks at Giga Texas',
    cards:[{icon:'🛻',big:'240',mid:'Cybertrucks',sub:'record spotted'},{icon:'📍',big:'Giga TX',mid:'Location',sub:'Texas factory'},{icon:'🚁',big:'Drone shot',mid:'Source',sub:'aerial confirm'}],
    quoteLabel:'SAWYER MERRITT', quoteKo:'"240대 사이버트럭 포착 - 오늘 아침"', quoteEn:'"A record 240 Cybertrucks spotted this morning at Giga Texas"',
    source:'Source: Sawyer Merritt · 2026.07.19',
    noteHead:'Line-up size is proof of build; demand must follow', noteSub:'Watch registrations & inventory turns',
    footer:'TSLA Cybertruck · Giga Texas 240', brand:BRAND_EN } },

// 2. Cybercab Giga Texas 200
{ file:'cbrcab-giga-texas-200', color:'mint', badge:'TSLA',
  ko:{ title:'Cybercab — 기가 텍사스 200대 이상 포착', heroIcon:'🚕', heroBig:'200+ units', heroSub:'기가 텍사스에 사이버캡 200대 이상 라인업 확인',
    cards:[{icon:'🚕',big:'200+',mid:'Cybercabs',sub:'aerial confirmed'},{icon:'📍',big:'Giga TX',mid:'집계 위치',sub:'Texas facility'},{icon:'⏱️',big:'Ramp',mid:'라인 가동',sub:'production ramp'}],
    quoteLabel:'MING ZHANG', quoteKo:'"테슬라가 게임을 강화하고 있다 — 기가 텍사스에 200대 넘게 포착"', quoteEn:'"Tesla is only stepping up its game, with upwards of 200 Cybercabs at Giga Texas"',
    source:'Source: Ming Zhang / Tesla Newswire · 2026.07.19',
    noteHead:'양산 규모 실측치 — sample-line SOP 근접 시그널', noteSub:'배포 시나리오·안전 승인이 다음 트리거',
    footer:'TSLA Cybercab · Giga Texas 200+', brand:BRAND_KO },
  en:{ title:'Cybercab — 200+ Units at Giga Texas', heroIcon:'🚕', heroBig:'200+ units', heroSub:'Aerial line-up of 200+ Cybercabs at Giga Texas',
    cards:[{icon:'🚕',big:'200+',mid:'Cybercabs',sub:'aerial confirmed'},{icon:'📍',big:'Giga TX',mid:'Location',sub:'Texas facility'},{icon:'⏱️',big:'Ramp',mid:'Line active',sub:'production ramp'}],
    quoteLabel:'MING ZHANG', quoteKo:'"테슬라가 게임을 강화하고 있다 — 200대 넘게 포착"', quoteEn:'"Tesla is stepping up its game — 200+ Cybercabs at Giga Texas"',
    source:'Source: Ming Zhang / Tesla Newswire · 2026.07.19',
    noteHead:'Real-count of production scale — near SOP signal', noteSub:'Deployment plan & safety approvals are next triggers',
    footer:'TSLA Cybercab · Giga Texas 200+', brand:BRAND_EN } },

// 3. Cybercab Giga Austin 250
{ file:'cbrcab-giga-austin-250', color:'mint', badge:'TSLA',
  ko:{ title:'Cybercab — 기가 오스틴 250대 확인', heroIcon:'🚕', heroBig:'~250 units', heroSub:'기가 오스틴에서 사이버캡 약 250대 라인업 관측',
    cards:[{icon:'🚕',big:'~250',mid:'Cybercabs',sub:'production yard'},{icon:'📍',big:'Giga Austin',mid:'집계 위치',sub:'Texas · Austin'},{icon:'📈',big:'Ramp',mid:'대량 배포 시나리오',sub:'evident reality'}],
    quoteLabel:'ALEX R', quoteKo:'"250대 사이버캡은 램프업의 증거 · 대량 배포 시나리오"', quoteEn:'"~250 Cybercabs is proof production is ramping — mass deployment"',
    source:'Source: Alex R · 2026.07.19',
    noteHead:'거대 자본지출을 뒷받침하는 실측 · 사업화 근접 시그널', noteSub:'sample-line SOP·인도/규제 승인 확인 필수',
    footer:'TSLA Cybercab · Giga Austin ~250', brand:BRAND_KO },
  en:{ title:'Cybercab — ~250 Units at Giga Austin', heroIcon:'🚕', heroBig:'~250 units', heroSub:'~250 Cybercabs spotted at Giga Austin yard',
    cards:[{icon:'🚕',big:'~250',mid:'Cybercabs',sub:'production yard'},{icon:'📍',big:'Giga Austin',mid:'Location',sub:'Texas · Austin'},{icon:'📈',big:'Ramp',mid:'Mass deploy scenario',sub:'evident reality'}],
    quoteLabel:'ALEX R', quoteKo:'"250대는 램프업의 증거 · 대량 배포 시나리오"', quoteEn:'"~250 Cybercabs is proof production is ramping — mass deployment"',
    source:'Source: Alex R · 2026.07.19',
    noteHead:'Real-count backing the capex thesis — near commercialization', noteSub:'Watch sample-line SOP, delivery & regulatory approvals',
    footer:'TSLA Cybercab · Giga Austin ~250', brand:BRAND_EN } },

// 4. Cybercab California delivery
{ file:'cbrcab-california-delivery', color:'mint', badge:'TSLA',
  ko:{ title:'Cybercab — 캘리포니아 도착 · 스티어링휠 없음', heroIcon:'🚕', heroBig:'CALIFORNIA', heroSub:'스티어링휠 없는 사이버캡이 캘리포니아 도착',
    cards:[{icon:'🚕',big:'No wheel',mid:'스티어링휠 없음',sub:'proto/prod hybrid'},{icon:'📍',big:'CA',mid:'도착지',sub:'San Bernardino 등'},{icon:'🚚',big:'Delivered',mid:'실 도착',sub:'first mile'}],
    quoteLabel:'SAWYER MERRITT / MORGAN', quoteKo:'"스티어링휠 없는 사이버캡이 캘리포니아 도착 · 실물 확인"', quoteEn:'"Cybercabs with no steering wheels have started arriving in California"',
    source:'Source: Sawyer Merritt · Morgan · 2026.07.19',
    noteHead:'전용 무인 설계의 실도로 노출 — 규제 프리뷰 성격', noteSub:'상용 개시 시점·안전 심사 결과가 관건',
    footer:'TSLA Cybercab · California Delivery', brand:BRAND_KO },
  en:{ title:'Cybercab — California Delivery · No Steering Wheel', heroIcon:'🚕', heroBig:'CALIFORNIA', heroSub:'Steering-wheel-less Cybercabs arriving in California',
    cards:[{icon:'🚕',big:'No wheel',mid:'wheel-less',sub:'proto/prod hybrid'},{icon:'📍',big:'CA',mid:'Arrival',sub:'San Bernardino etc'},{icon:'🚚',big:'Delivered',mid:'Physical arrival',sub:'first mile'}],
    quoteLabel:'SAWYER MERRITT / MORGAN', quoteKo:'"스티어링휠 없는 사이버캡 캘리포니아 도착"', quoteEn:'"Cybercabs with no steering wheels have started arriving in California"',
    source:'Source: Sawyer Merritt · Morgan · 2026.07.19',
    noteHead:'Purpose-built unmanned design hitting streets — regulator preview', noteSub:'Commercial start timing & safety review are decisive',
    footer:'TSLA Cybercab · California Delivery', brand:BRAND_EN } },

// 5. Robotaxi Fleet 770
{ file:'robotaxi-fleet-770', color:'mint', badge:'TSLA',
  ko:{ title:'로보택시 — 트래킹 사이트 총 770대', heroIcon:'📡', heroBig:'770', heroSub:'Robotaxi 플릿 총 770대 · 하루 3대씩 추가',
    cards:[{icon:'📡',big:'770',mid:'전체 플릿',sub:'tracking site'},{icon:'➕',big:'+3',mid:'금일 추가',sub:'daily add'},{icon:'📈',big:'가파른 기울기',mid:'flow rate',sub:'monotonic ramp'}],
    quoteLabel:'TESLA ROBOTAXI TRACKING SITE', quoteKo:'"3대가 추가되어 총 770대"', quoteEn:'"Three vehicles added — total 770"',
    source:'Source: Tesla2u / Robotaxi Tracking · 2026.07.19',
    noteHead:'플릿 매출·가동률 시나리오의 관측 앵커', noteSub:'대당 매출·유지비 프레임과 결합해서 봐야 함',
    footer:'TSLA Robotaxi Fleet · 770', brand:BRAND_KO },
  en:{ title:'Robotaxi — 770 Vehicles per Tracker', heroIcon:'📡', heroBig:'770', heroSub:'Robotaxi fleet total at 770 · +3 per day',
    cards:[{icon:'📡',big:'770',mid:'Total fleet',sub:'tracking site'},{icon:'➕',big:'+3',mid:'Daily add',sub:'today'},{icon:'📈',big:'Steep slope',mid:'Flow rate',sub:'monotonic ramp'}],
    quoteLabel:'TESLA ROBOTAXI TRACKING', quoteKo:'"3대 추가로 총 770"', quoteEn:'"Three vehicles added — total 770"',
    source:'Source: Tesla2u / Robotaxi Tracking · 2026.07.19',
    noteHead:'Observation anchor for fleet revenue/utilization', noteSub:'Combine with per-veh revenue & opex frame',
    footer:'TSLA Robotaxi Fleet · 770', brand:BRAND_EN } },

// 6. Norway EV 98%
{ file:'norway-ev-98pct-modely', color:'mint', badge:'TSLA',
  ko:{ title:'노르웨이 EV 98% · Model Y 5,686대 1위', heroIcon:'🇳🇴', heroBig:'98 %', heroSub:'노르웨이 신차의 98%가 EV · Model Y 5,686대 Q 1위',
    cards:[{icon:'🇳🇴',big:'98 %',mid:'신차 EV 비중',sub:'분기 기준'},{icon:'🥇',big:'5,686',mid:'Model Y 판매',sub:'Q1 판매 1위'},{icon:'🥈',big:'2,000+',mid:'Toyota Urban Cruiser',sub:'2위 대비 2.8배'}],
    quoteLabel:'MUSKONOMY', quoteKo:'"모든 신차가 사실상 EV · Model Y가 최다 판매"', quoteEn:'"Almost every new car sold in Norway is electric · Model Y leads"',
    source:'Source: Muskonomy · OpenTechnica / OFV · 2026.07.15',
    noteHead:'노르웨이 EV 누적 100만대 · Model Y 등록 10만대 돌파', noteSub:'EU 확산 로드맵의 정량 벤치마크',
    footer:'Norway EV 98% · Model Y #1', brand:BRAND_KO },
  en:{ title:'Norway EV 98% · Model Y 5,686 Units #1', heroIcon:'🇳🇴', heroBig:'98 %', heroSub:'98% of Norway new cars are EV · Model Y 5,686 units #1',
    cards:[{icon:'🇳🇴',big:'98 %',mid:'New-car EV share',sub:'quarterly'},{icon:'🥇',big:'5,686',mid:'Model Y sales',sub:'Q1 #1'},{icon:'🥈',big:'2,000+',mid:'Toyota Urban Cruiser',sub:'#2 · 2.8× gap'}],
    quoteLabel:'MUSKONOMY', quoteKo:'"거의 모든 신차가 EV · Model Y가 최다"', quoteEn:'"Almost every new car sold in Norway is EV — Model Y leads"',
    source:'Source: Muskonomy · OpenTechnica / OFV · 2026.07.15',
    noteHead:'Norway cumulative >1M EVs · Model Y crossed 100k registrations', noteSub:'Benchmark for EU rollout roadmap',
    footer:'Norway EV 98% · Model Y #1', brand:BRAND_EN } },

// 7. SPCX crash & shorts
{ file:'spcx-crash-shorts-6b1', color:'purple', badge:'SPCX',
  ko:{ title:'SPCX — $225 → $153 · 숏 $6.1B 급증', heroIcon:'📉', heroBig:'-44 %', heroSub:'IPO가 $153 하회 · 숏 비중 5% → 29% · $6.1B',
    cards:[{icon:'📉',big:'-44 %',mid:'고점 대비 낙폭',sub:'$225 → $153'},{icon:'🐻',big:'29 %',mid:'플로트 대비 숏',sub:'5% → 29%'},{icon:'💵',big:'$6.1 B',mid:'추정 숏 익스포저',sub:'estimated'}],
    quoteLabel:'ELON MUSK', quoteKo:'"SPCX 숏 포지션에 심각한 경고"', quoteEn:'"Time that hold a significant short in $SPCX"',
    source:'Source: Cryptozoons · Elon Musk · 2026.07.19',
    noteHead:'IPO가 하회 + 숏 폭증의 위험 균형점', noteSub:'스퀴즈 리스크 vs 실적 검증 사이의 변동성 확대',
    footer:'SPCX · -44% · Short $6.1B', brand:BRAND_KO },
  en:{ title:'SPCX — $225 → $153 · Short $6.1B Explosion', heroIcon:'📉', heroBig:'-44 %', heroSub:'Below $153 IPO · short 5% → 29% · est. $6.1B',
    cards:[{icon:'📉',big:'-44 %',mid:'From peak',sub:'$225 → $153'},{icon:'🐻',big:'29 %',mid:'Short % of float',sub:'up from 5%'},{icon:'💵',big:'$6.1 B',mid:'Short exposure',sub:'estimated'}],
    quoteLabel:'ELON MUSK', quoteKo:'"SPCX 숏에 대한 심각한 경고"', quoteEn:'"Time that hold a significant short in $SPCX"',
    source:'Source: Cryptozoons · Elon Musk · 2026.07.19',
    noteHead:'Below-IPO drawdown + surging short — risk balance point', noteSub:'Squeeze risk vs earnings-verification volatility',
    footer:'SPCX · -44% · Short $6.1B', brand:BRAND_EN } },

// 8. FSD Personalization
{ file:'fsd-personalization-roadmap', color:'mint', badge:'TSLA',
  ko:{ title:'FSD — 개인화 로드맵 · 소유자별 습관 학습', heroIcon:'🧠', heroBig:'PERSONAL', heroSub:'각 소유자 개입/취향을 기억해 매치하는 FSD 방향',
    cards:[{icon:'✅',big:'Remember',mid:'개별 개입 기억',sub:'specific interventions'},{icon:'🎯',big:'Adapt',mid:'소유자 취향 매치',sub:'individual preferences'},{icon:'📈',big:'Roadmap',mid:'FSD(Supervised)',sub:'evolves toward driver'}],
    quoteLabel:'ELON MUSK / TESLA NEWSWIRE', quoteKo:'"자동차가 개별 개입을 기억하고 각 소유자 취향에 맞출 것"', quoteEn:'"The car will remember your specific interventions and match individual preferences"',
    source:'Source: Elon Musk · Tesla Newswire · 2026.07.19',
    noteHead:'FSD 만족도·이탈 방지의 소프트웨어 UX 차별화', noteSub:'개인화가 데이터 재활용/광고 개인화와 결합될 수 있음',
    footer:'TSLA FSD · Personalization Roadmap', brand:BRAND_KO },
  en:{ title:'FSD — Personalization Roadmap', heroIcon:'🧠', heroBig:'PERSONAL', heroSub:'Remember owner interventions & match individual preferences',
    cards:[{icon:'✅',big:'Remember',mid:'Interventions',sub:'per-owner memory'},{icon:'🎯',big:'Adapt',mid:'Individual match',sub:'driving preferences'},{icon:'📈',big:'Roadmap',mid:'FSD(Supervised)',sub:'evolves to driver'}],
    quoteLabel:'ELON MUSK / TESLA NEWSWIRE', quoteKo:'"차량이 개별 개입 기억 + 취향 매치"', quoteEn:'"The car will remember your specific interventions and match preferences"',
    source:'Source: Elon Musk · Tesla Newswire · 2026.07.19',
    noteHead:'UX differentiation for FSD satisfaction & churn defense', noteSub:'Could combine with data-reuse/personalized ads later',
    footer:'TSLA FSD · Personalization Roadmap', brand:BRAND_EN } },

// 9. Tesla Physical AI Leader
{ file:'tsla-physical-ai-leader', color:'mint', badge:'TSLA',
  ko:{ title:'테슬라 — Physical AI 유일 리더 프레임', heroIcon:'🤖', heroBig:'PHYSICAL AI', heroSub:'휴머노이드·자율차가 동일 브레인을 공유하는 유일 회사',
    cards:[{icon:'🤖',big:'Humanoid',mid:'Optimus 로봇',sub:'로봇 파이프라인'},{icon:'🚗',big:'AV',mid:'자율주행 차량',sub:'FSD/Robotaxi'},{icon:'🧠',big:'Same brain',mid:'동일 컴퓨터',sub:'shared compute'}],
    quoteLabel:'NIC CRUZ PATANE', quoteKo:'"테슬라는 로봇과 자율차가 같은 브레인을 쓰는 유일한 회사"', quoteEn:'"Tesla is the only one building humanoids & AVs sharing the same brain"',
    source:'Source: Nic Cruz Patane · 2026.07.19',
    noteHead:'Physical AI 서사가 밸류에이션 프레임의 확장 축', noteSub:'실제 로봇 상용화 시점·실도로 성능이 검증 지표',
    footer:'TSLA · Physical AI Leader Frame', brand:BRAND_KO },
  en:{ title:'TSLA — The Only Physical AI Leader Frame', heroIcon:'🤖', heroBig:'PHYSICAL AI', heroSub:'Humanoids & AVs sharing the same brain',
    cards:[{icon:'🤖',big:'Humanoid',mid:'Optimus robot',sub:'robot pipeline'},{icon:'🚗',big:'AV',mid:'Autonomous vehicles',sub:'FSD/Robotaxi'},{icon:'🧠',big:'Same brain',mid:'Shared compute',sub:'unified stack'}],
    quoteLabel:'NIC CRUZ PATANE', quoteKo:'"테슬라만 로봇+자율차가 동일 브레인"', quoteEn:'"Tesla is the only one building humanoids & AVs sharing the same brain"',
    source:'Source: Nic Cruz Patane · 2026.07.19',
    noteHead:'Physical AI narrative broadens valuation frame', noteSub:'Verify via robot commercialization & real-road performance',
    footer:'TSLA · Physical AI Leader Frame', brand:BRAND_EN } },

// 10. Alibaba Qwen3 Max
{ file:'alibaba-qwen3-max-preview', color:'blue', badge:'BABA',
  ko:{ title:'Alibaba — Qwen 3.0 Max 프리뷰 공개', heroIcon:'🐉', heroBig:'Qwen 3.0 Max', heroSub:'중국 오픈소스 리더의 다음 세대 플래그십 프리뷰',
    cards:[{icon:'🐉',big:'Qwen 3.0',mid:'세대',sub:'flagship line'},{icon:'🚀',big:'Max',mid:'상위 모델',sub:'top tier'},{icon:'🧪',big:'Preview',mid:'공개 단계',sub:'early access'}],
    quoteLabel:'EVAN S', quoteKo:'"Alibaba가 플래그십 Qwen 3.0 Max 프리뷰를 공개했다"', quoteEn:'"Alibaba just launched a preview version of its flagship Qwen 3.0 Max"',
    source:'Source: Evan S · Bloomberg · 2026.07.19',
    noteHead:'중국 오픈모델의 성능·API 정책이 서구 경쟁 지형에 영향', noteSub:'BABA 클라우드 채택 데이터와 결합해 트래킹',
    footer:'BABA · Qwen 3.0 Max Preview', brand:BRAND_KO },
  en:{ title:'Alibaba — Qwen 3.0 Max Preview Released', heroIcon:'🐉', heroBig:'Qwen 3.0 Max', heroSub:'China open-source leader\'s next flagship preview',
    cards:[{icon:'🐉',big:'Qwen 3.0',mid:'Generation',sub:'flagship line'},{icon:'🚀',big:'Max',mid:'Top tier',sub:'flagship variant'},{icon:'🧪',big:'Preview',mid:'Release stage',sub:'early access'}],
    quoteLabel:'EVAN S', quoteKo:'"플래그십 Qwen 3.0 Max 프리뷰"', quoteEn:'"Alibaba just launched a preview version of Qwen 3.0 Max"',
    source:'Source: Evan S · Bloomberg · 2026.07.19',
    noteHead:'Chinese open-model perf & API policy reshapes Western landscape', noteSub:'Track alongside BABA cloud adoption data',
    footer:'BABA · Qwen 3.0 Max Preview', brand:BRAND_EN } },

// 11. Meta Plus $20B by 2030
{ file:'meta-plus-20b-2030', color:'blue', badge:'META',
  ko:{ title:'META Plus — 2030년 연 $20B 매출 전망', heroIcon:'📱', heroBig:'$20 B / yr', heroSub:'Instagram·Meta AI·Facebook·WhatsApp Plus 합계 · Truist',
    cards:[{icon:'📸',big:'$10 B',mid:'Instagram Plus',sub:'구독 매출'},{icon:'🧠',big:'$5.5 B',mid:'Meta AI premium',sub:'AI 구독'},{icon:'📘',big:'$3.3 B',mid:'Facebook Plus',sub:'서비스 구독'}],
    quoteLabel:'TRUIST / BLOSSOM', quoteKo:'"Meta Plus 연 $20B — 전체 매출의 약 5%"', quoteEn:'"Meta Plus estimated to add ~$20B/yr — about 5% of Meta total revenue by 2030"',
    source:'Source: Blossom · Truist · 2026.07.19',
    noteHead:'WhatsApp Plus $2B 포함 · 광고 외 매출축 다각화', noteSub:'AI 구독 채택률·ARPU가 재평가의 관건',
    footer:'META · Meta Plus $20B by 2030', brand:BRAND_KO },
  en:{ title:'META Plus — $20B/yr Revenue by 2030', heroIcon:'📱', heroBig:'$20 B / yr', heroSub:'Instagram + Meta AI + FB + WA Plus stack · Truist',
    cards:[{icon:'📸',big:'$10 B',mid:'Instagram Plus',sub:'subscription rev'},{icon:'🧠',big:'$5.5 B',mid:'Meta AI premium',sub:'AI subscription'},{icon:'📘',big:'$3.3 B',mid:'Facebook Plus',sub:'service subs'}],
    quoteLabel:'TRUIST / BLOSSOM', quoteKo:'"연 $20B — 전체 매출의 ~5%"', quoteEn:'"Meta Plus ~$20B/yr — about 5% of Meta total revenue by 2030"',
    source:'Source: Blossom · Truist · 2026.07.19',
    noteHead:'Includes WhatsApp Plus $2B — diversifies beyond ads', noteSub:'AI-sub uptake & ARPU are re-rating drivers',
    footer:'META · Meta Plus $20B by 2030', brand:BRAND_EN } },

// 12. SP500 valuation 1800s high
{ file:'spx-valuation-1800s-high', color:'red', badge:'SPX',
  ko:{ title:'S&P 500 — 1800년대 이후 최고 밸류에이션', heroIcon:'🏔️', heroBig:'1800s High', heroSub:'역사상 가장 비싼 구간 · Barchart 지수 비교',
    cards:[{icon:'🏔️',big:'ATH',mid:'역사적 밸류에이션',sub:'since late 1800s'},{icon:'📊',big:'SPX',mid:'비교 지수',sub:'S&P 500'},{icon:'⚠️',big:'Warning',mid:'"Probably Fine?"',sub:'풍자적 경고'}],
    quoteLabel:'BARCHART', quoteKo:'"미국 주식이 1800년대 후반 이후 가장 비싼 밸류에이션에 도달"', quoteEn:'"US Stock Market reaches the most expensive valuation since the late 1800s"',
    source:'Source: Barchart · 2026.07.19',
    noteHead:'금리·마진 프리미엄이 지탱하는 밸류에이션 확장', noteSub:'경제 서프라이즈·CAPEX 감소가 되돌림 트리거',
    footer:'SPX Valuation · 1800s High', brand:BRAND_KO },
  en:{ title:'S&P 500 — Most Expensive Since Late 1800s', heroIcon:'🏔️', heroBig:'1800s High', heroSub:'Highest US valuation on record · Barchart series',
    cards:[{icon:'🏔️',big:'ATH',mid:'Historical valuation',sub:'since late 1800s'},{icon:'📊',big:'SPX',mid:'Reference index',sub:'S&P 500'},{icon:'⚠️',big:'Warning',mid:'"Probably Fine?"',sub:'satirical tone'}],
    quoteLabel:'BARCHART', quoteKo:'"1800년대 이후 최고 밸류에이션"', quoteEn:'"US Stock Market reaches the most expensive valuation since the late 1800s"',
    source:'Source: Barchart · 2026.07.19',
    noteHead:'Rates & margin premium sustain expansion of multiples', noteSub:'Growth surprise & capex cuts are reversal triggers',
    footer:'SPX Valuation · 1800s High', brand:BRAND_EN } },

// 13. SP500 fwd PE 20
{ file:'spx-forward-pe-20', color:'red', badge:'SPX',
  ko:{ title:'S&P 500 — 선행 P/E 20 재돌파', heroIcon:'📊', heroBig:'20 ×', heroSub:'선행 이익 대비 배수가 다시 20 상회',
    cards:[{icon:'📊',big:'20×',mid:'Forward P/E',sub:'재돌파'},{icon:'🏔️',big:'Near ATH',mid:'역대 최고 근접',sub:'AI 사이클 프리미엄'},{icon:'⚠️',big:'Risk',mid:'수익 하향시 낙폭 확대',sub:'multiple compression'}],
    quoteLabel:'MIKE ZACCARDI', quoteKo:'"선행 P/E 20 이상 · 역대 최고 부근"', quoteEn:'"S&P 500 forward P/E above 20 again — near historical high"',
    source:'Source: Mike Zaccardi · 2026.07.19',
    noteHead:'멀티플 확장은 성장·마진 신뢰 유지가 조건', noteSub:'가이던스 하향시 배수 축소 리스크가 큼',
    footer:'SPX · Forward P/E 20×', brand:BRAND_KO },
  en:{ title:'S&P 500 — Forward P/E Above 20 Again', heroIcon:'📊', heroBig:'20 ×', heroSub:'Forward earnings multiple back over 20',
    cards:[{icon:'📊',big:'20×',mid:'Forward P/E',sub:'re-crossed'},{icon:'🏔️',big:'Near ATH',mid:'Near record',sub:'AI cycle premium'},{icon:'⚠️',big:'Risk',mid:'Est-cut drawdown',sub:'multiple compression'}],
    quoteLabel:'MIKE ZACCARDI', quoteKo:'"선행 P/E 20 이상, 역대 최고 근접"', quoteEn:'"S&P 500 forward P/E above 20 again — near record"',
    source:'Source: Mike Zaccardi · 2026.07.19',
    noteHead:'Multiple expansion requires margin/growth conviction', noteSub:'Big compression risk if guidance is cut',
    footer:'SPX · Forward P/E 20×', brand:BRAND_EN } },

// 14. NVDA Jevons Paradox
{ file:'nvda-jevons-paradox', color:'blue', badge:'NVDA',
  ko:{ title:'NVDA — 젠슨의 역설 · 저렴한 지능이 수요 폭발', heroIcon:'⚡', heroBig:'JEVONS', heroSub:'저렴한 중국 모델이 오히려 컴퓨트 수요를 폭발시킨다는 프레임',
    cards:[{icon:'🧠',big:'Cheaper AI',mid:'모델 원가 하락',sub:'중국 오픈모델'},{icon:'🚀',big:'Demand ↑',mid:'컴퓨트 수요 폭발',sub:'"detonates it"'},{icon:'🏭',big:'Capacity',mid:'급속 증설',sub:'CUDA 잠금 유지'}],
    quoteLabel:'BEN POULADIAN', quoteKo:'"저렴한 지능은 컴퓨트 수요를 줄이지 않고 폭발시킨다"', quoteEn:'"Cheaper intelligence doesn\'t reduce compute demand — it detonates it"',
    source:'Source: Ben Pouladian · 2026.07.19',
    noteHead:'제본스 역설을 AI에 적용한 서사 · NVDA 방어 논거', noteSub:'CUDA lock-in·CAPEX 흐름이 검증 축',
    footer:'NVDA · Jevons Paradox Frame', brand:BRAND_KO },
  en:{ title:'NVDA — The Jevons Paradox Frame', heroIcon:'⚡', heroBig:'JEVONS', heroSub:'Cheaper Chinese models detonate compute demand, not reduce it',
    cards:[{icon:'🧠',big:'Cheaper AI',mid:'Model cost drop',sub:'China open models'},{icon:'🚀',big:'Demand ↑',mid:'Compute explosion',sub:'"detonates it"'},{icon:'🏭',big:'Capacity',mid:'Rapid build-out',sub:'CUDA lock-in stays'}],
    quoteLabel:'BEN POULADIAN', quoteKo:'"저렴한 지능은 컴퓨트 수요를 폭발시킨다"', quoteEn:'"Cheaper intelligence doesn\'t reduce compute demand — it detonates it"',
    source:'Source: Ben Pouladian · 2026.07.19',
    noteHead:'Jevons paradox applied to AI — NVDA defense narrative', noteSub:'CUDA lock-in & capex trends are the verification axes',
    footer:'NVDA · Jevons Paradox Frame', brand:BRAND_EN } },

// 15. Buffett Google
{ file:'buffett-google-investment', color:'orange', badge:'BRK.B',
  ko:{ title:'버핏 — "Google은 오랜만에 좋은 사업이었다"', heroIcon:'🦉', heroBig:'GOOGLE', heroSub:'버핏이 Google 투자에 대해 이례적으로 강한 코멘트',
    cards:[{icon:'🦉',big:'Buffett',mid:'투자자',sub:'BRK.B CEO'},{icon:'🎯',big:'Google',mid:'주목 종목',sub:'"among best"'},{icon:'💰',big:'Compounding',mid:'복리 성장 인정',sub:'business quality'}],
    quoteLabel:'KEVIN CARPENTER', quoteKo:'"Google은 내가 본 오랜만의 좋은 사업 중 하나"', quoteEn:'"Google is one of the best businesses I have seen in a long time"',
    source:'Source: Kevin Carpenter · Buffett quote · 2026.07.19',
    noteHead:'버핏 이례적 톤 — GOOGL 밸류 프레임에 무게 부여', noteSub:'지분 변경·13F 확인은 별도',
    footer:'BUFFETT · Google Investment Frame', brand:BRAND_KO },
  en:{ title:'Buffett — "Google Among Best I\'ve Seen"', heroIcon:'🦉', heroBig:'GOOGLE', heroSub:'Buffett\'s unusually strong tone on Google',
    cards:[{icon:'🦉',big:'Buffett',mid:'Investor',sub:'BRK.B CEO'},{icon:'🎯',big:'Google',mid:'Focus stock',sub:'"among best"'},{icon:'💰',big:'Compounding',mid:'Recognized quality',sub:'business durability'}],
    quoteLabel:'KEVIN CARPENTER', quoteKo:'"Google은 오랜만에 본 최고 사업 중 하나"', quoteEn:'"Google is one of the best businesses I have seen in a long time"',
    source:'Source: Kevin Carpenter · Buffett quote · 2026.07.19',
    noteHead:'Rare tone from Buffett — weight added to GOOGL frame', noteSub:'Confirm actual holdings via 13F separately',
    footer:'BUFFETT · Google Investment Frame', brand:BRAND_EN } },

// 16. BofA summer pullback
{ file:'bofa-summer-pullback', color:'orange', badge:'MACRO',
  ko:{ title:'BofA — 여름 조정 · 연말 랠리 시나리오', heroIcon:'🌡️', heroBig:'SUMMER DIP', heroSub:'여름 조정 후 연말 랠리 가능성 - Bank of America',
    cards:[{icon:'📉',big:'Summer',mid:'여름 조정 시나리오',sub:'pullback'},{icon:'📈',big:'Year-end',mid:'연말 랠리 가능성',sub:'H2 rally'},{icon:'🏦',big:'BofA',mid:'제시 기관',sub:'strategy note'}],
    quoteLabel:'BANK OF AMERICA / UNUSUAL_WHALES', quoteKo:'"여름 조정 → 연말 랠리 시나리오"', quoteEn:'"Summer stock market pullback before possible year-end rally"',
    source:'Source: unusual_whales · Bank of America · 2026.07.19',
    noteHead:'포지션 사이즈·헤지 조정의 근거 프레임', noteSub:'실적·유동성·지정학 변수가 조합 트리거',
    footer:'MACRO · BofA Summer Pullback', brand:BRAND_KO },
  en:{ title:'BofA — Summer Pullback, Year-End Rally', heroIcon:'🌡️', heroBig:'SUMMER DIP', heroSub:'Summer pullback then year-end rally scenario - Bank of America',
    cards:[{icon:'📉',big:'Summer',mid:'Pullback scenario',sub:'seasonal'},{icon:'📈',big:'Year-end',mid:'Rally optionality',sub:'H2 rally'},{icon:'🏦',big:'BofA',mid:'Source',sub:'strategy note'}],
    quoteLabel:'BANK OF AMERICA / UNUSUAL_WHALES', quoteKo:'"여름 조정 → 연말 랠리"', quoteEn:'"Summer stock market pullback before possible year-end rally"',
    source:'Source: unusual_whales · Bank of America · 2026.07.19',
    noteHead:'Frame for repositioning sizing & hedges', noteSub:'Earnings, liquidity, geopolitics are combined triggers',
    footer:'MACRO · BofA Summer Pullback', brand:BRAND_EN } },
];

let written = 0;
for (const t of T) {
  fs.writeFileSync(path.join(OUT, `${t.file}-20260720.svg`),    tpl(t.ko));
  fs.writeFileSync(path.join(OUT, `${t.file}-20260720-en.svg`), tpl(t.en));
  written += 2;
}
console.log(`✅ ${written} SVG 파일 생성 완료 (${T.length} topics × KO/EN)`);
