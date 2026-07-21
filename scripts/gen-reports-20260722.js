// 2026-07-22 리포트 SVG 생성기 — 종목별 팔레트 + 풀 본문 원칙
// 실행: node scripts/gen-reports-20260722.js
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.07.22';

// 종목별 팔레트 (memory: feedback_svg_per_symbol_colors.md)
const PSYM = {
  TSLA:   { fg:'#4ade80', fg2:'#22c55e', bg2:'#061209', card:'#0a1a0a' },
  NVDA:   { fg:'#60a5fa', fg2:'#3b82f6', bg2:'#06121f', card:'#0a1420' },
  SPCX:   { fg:'#c084fc', fg2:'#a78bfa', bg2:'#140b1f', card:'#1a0f2a' },
  META:   { fg:'#1877f2', fg2:'#3b82f6', bg2:'#06121f', card:'#0a1420' },
  AAPL:   { fg:'#ef4444', fg2:'#dc2626', bg2:'#1a0808', card:'#1a0808' },
  MSFT:   { fg:'#00a4ef', fg2:'#0078d4', bg2:'#061219', card:'#0a1520' },
  GOOGL:  { fg:'#4285f4', fg2:'#34a853', bg2:'#06121f', card:'#0a1420' },
  AMZN:   { fg:'#ff9900', fg2:'#f59e0b', bg2:'#1a1408', card:'#1a1408' },
  TSM:    { fg:'#eab308', fg2:'#ca8a04', bg2:'#191408', card:'#1a1408' },
  NFLX:   { fg:'#e50914', fg2:'#b91c1c', bg2:'#1a0808', card:'#1a0808' },
  UBER:   { fg:'#f9fafb', fg2:'#9ca3af', bg2:'#0a0a0a', card:'#111827' },
  CVX:    { fg:'#c11f27', fg2:'#7f1d1d', bg2:'#170808', card:'#1a0808' },
  BABA:   { fg:'#ff6a00', fg2:'#ea580c', bg2:'#1a0f08', card:'#1a1408' },
  SPX:    { fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
  MACRO:  { fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
  BUFFETT:{ fg:'#eab308', fg2:'#ca8a04', bg2:'#191408', card:'#1a1408' },
  ARK:    { fg:'#fb923c', fg2:'#f97316', bg2:'#1a1408', card:'#1a1408' },
  MU:     { fg:'#3b82f6', fg2:'#2563eb', bg2:'#06121f', card:'#0a1420' },
  BLK:    { fg:'#eab308', fg2:'#ca8a04', bg2:'#191408', card:'#1a1408' },
};

function esc(s) {
  return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;').replace(/</g,'&lt;');
}
function E(o) { const r={}; for (const k in o) r[k]=typeof o[k]==='string'?esc(o[k]):o[k]; return r; }

function tpl(oRaw) {
  const o = E(oRaw);
  const p = PSYM[oRaw.symbol] || PSYM.MACRO;
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
// 1. TSLA Q2 어닝 프리뷰
{ file:'tsla-q2-earnings-preview', symbol:'TSLA', badge:'TSLA',
  ko:{ title:'TSLA — Q2 2026 어닝 프리뷰 (수요일 장마감후)', heroIcon:'📊', heroBig:'480,126', heroSub:'분기 인도 사상 최고 · +25% YoY · Energy 21GWh',
    cards:[{icon:'🚗',big:'480,126',mid:'분기 인도(record)',sub:'+25% YoY'},{icon:'🔋',big:'21 GWh',mid:'Energy 저장 배치',sub:'분기 실적'},{icon:'🙋',big:'7개 질문',mid:'Robinhood 리테일',sub:'14.5M TSLA 주 이해관계'}],
    quoteLabel:'MUSKONOMY / TESLA', quoteKo:'"7 질문 중 4개가 Robotaxi/Cybercab · 5.4M주 Robotaxi 확장 · 5.3M주 Optimus Gen 3"', quoteEn:'"4 of 7 retail questions are about Robotaxi/Cybercab · 5.4M shares on Robotaxi expansion · 5.3M on Optimus Gen 3"',
    source:'Source: Muskonomy · Tesla · 2026.07.21',
    noteHead:'상반기 로보택시 7개 도시 중 5개 live · Phoenix·Vegas 남음', noteSub:'지난 48시간: Tampa/Orlando 오픈 · Bay Area SF/Q · Cybercab Starlink V3 · FSD v14 Lite HW3',
    footer:'TSLA · Q2 2026 Earnings Preview', brand:BRAND_KO },
  en:{ title:'TSLA — Q2 2026 Earnings Preview (Wed AMC)', heroIcon:'📊', heroBig:'480,126', heroSub:'Record quarterly deliveries · +25% YoY · Energy 21GWh',
    cards:[{icon:'🚗',big:'480,126',mid:'Quarterly deliveries',sub:'record · +25% YoY'},{icon:'🔋',big:'21 GWh',mid:'Energy storage',sub:'this quarter'},{icon:'🙋',big:'7 questions',mid:'Robinhood retail',sub:'14.5M TSLA shares'}],
    quoteLabel:'MUSKONOMY / TESLA', quoteKo:'"4/7이 Robotaxi/Cybercab · 5.4M주 확장 · 5.3M주 Optimus"', quoteEn:'"4 of 7 retail questions are Robotaxi/Cybercab · 5.4M shares on Robotaxi expansion · 5.3M on Optimus Gen 3"',
    source:'Source: Muskonomy · Tesla · 2026.07.21',
    noteHead:'5 of first-half 7 robotaxi cities now live — Phoenix, Vegas remain', noteSub:'Past 48h: Tampa/Orlando open · Bay Area SF/Q · Cybercab Starlink V3 · FSD v14 Lite on HW3',
    footer:'TSLA · Q2 2026 Earnings Preview', brand:BRAND_EN } },

// 2. TSLA Robotaxi 7 cities
{ file:'tsla-robotaxi-7cities', symbol:'TSLA', badge:'TSLA',
  ko:{ title:'TSLA Robotaxi — 7개 도시 서비스 · Orlando/Miami/Tampa/Dallas 신규 Unsupervised', heroIcon:'🚕', heroBig:'7 CITIES', heroSub:'Unsupervised Model Y · Austin은 Supervised · Bay Area/SF는 safety monitor',
    cards:[{icon:'✨',big:'+4',mid:'신규 Unsupervised',sub:'Orlando·Miami·Tampa·Dallas'},{icon:'🔵',big:'AUSTIN',mid:'Supervised only',sub:'기존 서비스'},{icon:'🌉',big:'SF/Bay',mid:'Unsupervised + safety',sub:'monitor 병행'}],
    quoteLabel:'SHAY BOLOOR', quoteKo:'"Tesla Robotaxi/ride-hailing 서비스가 7개 도시에서 이용 가능"', quoteEn:'"Tesla\'s Robotaxi/ride-hailing service is now available in 7 cities"',
    source:'Source: Shay Boloor · 2026.07.21',
    noteHead:'플로리다 확장은 첫 성공 Tampa/Orlando로부터 18일만에 확대', noteSub:'Phoenix·Vegas가 상반기 7개 도시 남은 2곳',
    footer:'TSLA Robotaxi · 7 Cities', brand:BRAND_KO },
  en:{ title:'TSLA Robotaxi — Live in 7 Cities · 4 New Unsupervised Markets', heroIcon:'🚕', heroBig:'7 CITIES', heroSub:'Unsupervised Model Y · Austin Supervised · SF/Bay with safety monitor',
    cards:[{icon:'✨',big:'+4',mid:'New Unsupervised',sub:'Orlando·Miami·Tampa·Dallas'},{icon:'🔵',big:'AUSTIN',mid:'Supervised only',sub:'existing'},{icon:'🌉',big:'SF/Bay',mid:'Unsupervised + safety',sub:'monitor combined'}],
    quoteLabel:'SHAY BOLOOR', quoteKo:'"7개 도시 서비스"', quoteEn:'"Tesla\'s Robotaxi/ride-hailing service is now available in 7 cities"',
    source:'Source: Shay Boloor · 2026.07.21',
    noteHead:'Florida expansion within 18 days of first Tampa/Orlando launch', noteSub:'Phoenix and Vegas are the last two of first-half 7-city plan',
    footer:'TSLA Robotaxi · 7 Cities', brand:BRAND_EN } },

// 3. Tampa 첫 Unsupervised
{ file:'tsla-tampa-first-unsupervised', symbol:'TSLA', badge:'TSLA',
  ko:{ title:'TSLA Robotaxi — Tampa FL 첫 Unsupervised Model Y 주행 시작', heroIcon:'🏁', heroBig:'TAMPA', heroSub:'첫 Unsupervised Tesla Model Y robotaxi 주행 개시',
    cards:[{icon:'📍',big:'Tampa FL',mid:'첫 Unsupervised',sub:'Model Y robotaxi'},{icon:'⏱️',big:'18 일',mid:'첫 성공 이후',sub:'Orlando 이어서'},{icon:'📈',big:'확장',mid:'플로리다 진입',sub:'ride-hailing 네트워크'}],
    quoteLabel:'SAWYER MERRITT · TESLA ROBOTAXI', quoteKo:'"Tampa, Florida에서 첫 Unsupervised Tesla Model Y robotaxi 주행 시작"', quoteEn:'"The first Unsupervised Tesla Model Y robotaxi rides in Tampa, Florida have now begun"',
    source:'Source: Sawyer Merritt · Tesla Robotaxi · 2026.07.21',
    noteHead:'Tampa/Orlando 오픈은 18일 만의 확장 · 플릿·라이드 데이터 축적 가속', noteSub:'다음 촉매: Miami·Dallas의 정식 상용 데이터',
    footer:'TSLA Robotaxi · First Tampa Unsupervised', brand:BRAND_KO },
  en:{ title:'TSLA Robotaxi — First Unsupervised Model Y Rides Begin in Tampa, FL', heroIcon:'🏁', heroBig:'TAMPA', heroSub:'First Unsupervised Tesla Model Y robotaxi rides now live',
    cards:[{icon:'📍',big:'Tampa FL',mid:'First Unsupervised',sub:'Model Y robotaxi'},{icon:'⏱️',big:'18 days',mid:'after first launch',sub:'following Orlando'},{icon:'📈',big:'Expand',mid:'Florida entry',sub:'ride-hailing network'}],
    quoteLabel:'SAWYER MERRITT · TESLA ROBOTAXI', quoteKo:'"Tampa 첫 Unsupervised Model Y robotaxi"', quoteEn:'"The first Unsupervised Tesla Model Y robotaxi rides in Tampa, Florida have now begun"',
    source:'Source: Sawyer Merritt · Tesla Robotaxi · 2026.07.21',
    noteHead:'Tampa/Orlando launch = 18-day expansion — fleet & ride data accelerate', noteSub:'Next catalysts: full commercial data from Miami and Dallas',
    footer:'TSLA Robotaxi · First Tampa Unsupervised', brand:BRAND_EN } },

// 4. TSLA 2026 Summer Update (2026.30)
{ file:'tsla-2026-summer-update', symbol:'TSLA', badge:'TSLA',
  ko:{ title:'TSLA — 2026 Summer Update (2026.30) 대규모 기능 업데이트', heroIcon:'🚀', heroBig:'2026.30', heroSub:'Grok 확장 · Carwalk 스코어 · Automatic Navigation · Rear Display Lock 외 다수',
    cards:[{icon:'🎙️',big:'More Grok',mid:'통화·음악·공조·글로브박스',sub:'차량 Q&A 명령 확장'},{icon:'🅿️',big:'Carwalk 스코어',mid:'주차 중 노래 점수',sub:'프로필 저장'},{icon:'🧭',big:'Auto Nav',mid:'루틴 학습·자동 제안',sub:'출근 경로 · 헬스장 등'}],
    quoteLabel:'THE TESLA NEWSWIRE', quoteKo:'"2026.30 소프트웨어 업데이트가 며칠 내 롤아웃 시작"', quoteEn:'"2026 Summer Update (likely 2026.30) will begin rolling out in the coming days"',
    source:'Source: The Tesla Newswire · 2026.07.21',
    noteHead:'Self-Driving Stats/Streak을 모바일 앱에서 열람·공유', noteSub:'Rear Display Lock · Preferred Routes · Custom Wraps · Model 3/Y 인트로 애니메이션',
    footer:'TSLA · 2026 Summer Update (2026.30)', brand:BRAND_KO },
  en:{ title:'TSLA — 2026 Summer Update (2026.30) — Big Feature Drop', heroIcon:'🚀', heroBig:'2026.30', heroSub:'More Grok · Carwalk scoring · Automatic Navigation · Rear Display Lock and more',
    cards:[{icon:'🎙️',big:'More Grok',mid:'calls·music·climate·glovebox',sub:'Q&A about your car'},{icon:'🅿️',big:'Carwalk score',mid:'karaoke score in Park',sub:'saved to profile'},{icon:'🧭',big:'Auto Nav',mid:'learns your routine',sub:'commute · gym etc.'}],
    quoteLabel:'THE TESLA NEWSWIRE', quoteKo:'"2026.30 며칠 내 롤아웃 시작"', quoteEn:'"2026 Summer Update (likely 2026.30) will begin rolling out in the coming days"',
    source:'Source: The Tesla Newswire · 2026.07.21',
    noteHead:'Self-Driving Stats/Streaks viewable & shareable via mobile app', noteSub:'Rear Display Lock · Preferred Routes · Custom Wraps · Model 3/Y intro animations',
    footer:'TSLA · 2026 Summer Update (2026.30)', brand:BRAND_EN } },

// 5. TSLA FSD EU vote Oct 8-9
{ file:'tsla-fsd-eu-vote-oct89', symbol:'TSLA', badge:'TSLA',
  ko:{ title:'TSLA FSD — 유럽 TCMV 승인 투표 10월 8~9일 예정', heroIcon:'🇪🇺', heroBig:'OCT 8–9', heroSub:'TCMV(기술위원회) 회의에서 회원국 투표 · 통과시 EU 전역 유효 승인',
    cards:[{icon:'🗓️',big:'Oct 8–9',mid:'TCMV 회의',sub:'FSD(Supervised) 투표'},{icon:'✅',big:'적격 다수',mid:'통과 조건',sub:'qualified majority'},{icon:'🇳🇱',big:'네덜란드',mid:'승인 발부처',sub:'EU 전역 유효'}],
    quoteLabel:'THE TESLA NEWSWIRE', quoteKo:'"10월 8~9일 TCMV 회의에서 회원국이 FSD(Supervised) 승인 투표"', quoteEn:'"At an upcoming TCMV meeting expected to take place on October 8/9, 2026, member states will vote on the FSD (Supervised) approval"',
    source:'Source: The Tesla Newswire · 2026.07.21',
    noteHead:'통과시 유럽위원회가 네덜란드 인가청에 EU 전역 유효한 type approval 부여', noteSub:'벨기에·네덜란드·독일 로드맵 → EU 전역 프리미엄 마진 활성화 관문',
    footer:'TSLA FSD · EU Vote Oct 8–9', brand:BRAND_KO },
  en:{ title:'TSLA FSD — EU TCMV Vote Expected Oct 8–9', heroIcon:'🇪🇺', heroBig:'OCT 8–9', heroSub:'Member states vote at TCMV meeting · pass = EU-wide type approval',
    cards:[{icon:'🗓️',big:'Oct 8–9',mid:'TCMV meeting',sub:'FSD(Supervised) vote'},{icon:'✅',big:'Qualified maj.',mid:'Pass threshold',sub:'per EU rules'},{icon:'🇳🇱',big:'Netherlands',mid:'Issuing authority',sub:'EU-wide validity'}],
    quoteLabel:'THE TESLA NEWSWIRE', quoteKo:'"10월 8~9일 TCMV 회의 FSD 승인 투표"', quoteEn:'"At an upcoming TCMV meeting expected to take place on October 8/9, 2026, member states will vote on the FSD (Supervised) approval"',
    source:'Source: The Tesla Newswire · 2026.07.21',
    noteHead:'Pass → EC adopts implementing act, Dutch authority grants EU-wide type approval', noteSub:'Gate for EU-wide premium margin activation across Belgium/Netherlands/Germany roadmap',
    footer:'TSLA FSD · EU Vote Oct 8–9', brand:BRAND_EN } },

// 6. Cantor $510
{ file:'tsla-cantor-510-target', symbol:'TSLA', badge:'TSLA',
  ko:{ title:'TSLA — Cantor Fitzgerald Overweight · $510 목표가 재확인 (Q2 어닝 전)', heroIcon:'🎯', heroBig:'$510', heroSub:'Cantor Fitzgerald가 어닝 앞두고 등급/목표가 재확인',
    cards:[{icon:'⭐',big:'Overweight',mid:'등급 유지',sub:'Cantor Fitzgerald'},{icon:'🎯',big:'$510',mid:'목표가 재확인',sub:'Q2 앞'},{icon:'🚕',big:'Robotaxi',mid:'상용화 시 신속 스케일',sub:'상당한 시장점유 예상'}],
    quoteLabel:'MING Z / CANTOR FITZGERALD', quoteKo:'"상용화 후 Tesla가 robotaxi 사업을 빠르게 확장, 지연에도 상당한 시장 점유 확보 가능"', quoteEn:'"Once commercialized, Tesla can swiftly scale its robotaxi operations and secure a substantial market share, despite delays"',
    source:'Source: Ming Z · Cantor Fitzgerald · 2026.07.21',
    noteHead:'Q2 어닝 발표 전 유지/재확인 = 애널리스트 기대치 앵커', noteSub:'실적/가이던스가 실 방향 결정 · 상용화 시점 확정 여부가 핵심',
    footer:'TSLA · Cantor OW · $510 PT', brand:BRAND_KO },
  en:{ title:'TSLA — Cantor Fitzgerald Reaffirms Overweight · $510 PT Ahead of Q2', heroIcon:'🎯', heroBig:'$510', heroSub:'Rating/target reaffirmed just before Q2 print',
    cards:[{icon:'⭐',big:'Overweight',mid:'Rating held',sub:'Cantor Fitzgerald'},{icon:'🎯',big:'$510',mid:'Price target',sub:'reaffirmed'},{icon:'🚕',big:'Robotaxi',mid:'Swift scale once live',sub:'substantial share'}],
    quoteLabel:'MING Z / CANTOR FITZGERALD', quoteKo:'"상용화 후 빠른 확장, 지연에도 상당 점유"', quoteEn:'"Once commercialized, Tesla can swiftly scale its robotaxi operations and secure a substantial market share, despite delays"',
    source:'Source: Ming Z · Cantor Fitzgerald · 2026.07.21',
    noteHead:'Reaffirmation just before Q2 = anchor on analyst expectations', noteSub:'Actual print/guidance sets direction · commercialization timing is the key axis',
    footer:'TSLA · Cantor OW · $510 PT', brand:BRAND_EN } },

// 7. TSLA xAI Grok Asia
{ file:'tsla-xai-asia-cars', symbol:'TSLA', badge:'TSLA',
  ko:{ title:'TSLA × xAI — Grok가 곧 아시아 5개국 Tesla 차량 탑재', heroIcon:'🤖', heroBig:'5 국가', heroSub:'인도·태국·싱가폴·필리핀·말레이시아 Tesla 차량 곧 탑재',
    cards:[{icon:'🇮🇳',big:'India',mid:'런칭 대상',sub:'곧'},{icon:'🇹🇭',big:'TH·SG',mid:'태국·싱가폴',sub:'곧'},{icon:'🇵🇭',big:'PH·MY',mid:'필리핀·말레이시아',sub:'곧'}],
    quoteLabel:'SAWYER MERRITT · TESLA', quoteKo:'"$XAI(Grok)가 곧 인도·태국·싱가폴·필리핀·말레이시아 Tesla 차량에 런칭"', quoteEn:'"Tesla has announced that xAI (Grok) will be launching soon in Tesla vehicles in India, Thailand, Singapore, Philippines, and Malaysia"',
    source:'Source: Sawyer Merritt · Tesla · 2026.07.21',
    noteHead:'2026.30 Summer Update의 More Grok Commands 확장과 연결', noteSub:'아시아 신흥국 신차 사용자 → xAI 데이터·구독 유입 축',
    footer:'TSLA × xAI · Asia rollout (5 countries)', brand:BRAND_KO },
  en:{ title:'TSLA × xAI — Grok Coming Soon to Cars in 5 Asian Markets', heroIcon:'🤖', heroBig:'5 markets', heroSub:'India, Thailand, Singapore, Philippines, Malaysia — coming soon in Tesla cars',
    cards:[{icon:'🇮🇳',big:'India',mid:'Launch target',sub:'soon'},{icon:'🇹🇭',big:'TH·SG',mid:'Thailand·Singapore',sub:'soon'},{icon:'🇵🇭',big:'PH·MY',mid:'Philippines·Malaysia',sub:'soon'}],
    quoteLabel:'SAWYER MERRITT · TESLA', quoteKo:'"5개 아시아 국가 곧 런칭"', quoteEn:'"Tesla has announced that xAI (Grok) will be launching soon in Tesla vehicles in India, Thailand, Singapore, Philippines, and Malaysia"',
    source:'Source: Sawyer Merritt · Tesla · 2026.07.21',
    noteHead:'Ties into More Grok Commands in 2026.30 Summer Update', noteSub:'Asian EM new-car users → xAI data + subscription funnel',
    footer:'TSLA × xAI · Asia rollout (5 countries)', brand:BRAND_EN } },

// 8. NVDA Vera Rubin Full Production
{ file:'nvda-vera-rubin-full-prod', symbol:'NVDA', badge:'NVDA',
  ko:{ title:'NVDA — Vera Rubin 정식 full production 진입 · AMD Turin 대비 빠름', heroIcon:'⚙️', heroBig:'FULL PROD', heroSub:'차세대 Vera Rubin AI 컴퓨팅 시스템 정식 양산 (per YF)',
    cards:[{icon:'⚙️',big:'Full prod',mid:'Vera Rubin',sub:'per Yahoo Finance'},{icon:'📅',big:'On sched',mid:'AI DC 배포 예정',sub:'Jensen 공식 확인'},{icon:'⚡',big:'> Turin',mid:'AMD Turin 대비 빠름',sub:'주요 고객 이미 테스트'}],
    quoteLabel:'unusual_whales · JENSEN HUANG', quoteKo:'"NVIDIA가 차세대 Vera Rubin AI 컴퓨팅 시스템의 full production에 공식 진입"', quoteEn:'"$NVDA is officially in full production of its next-generation \'Vera Rubin\' AI computing systems"',
    source:'Source: unusual_whales · YF · Jensen Huang · 2026.07.21',
    noteHead:'AMD Turin 대비 우위 언급 = 데이터센터 채택 근거', noteSub:'Rubin·Vera CPU/GPU 결합의 CoWoS/HBM 밸류체인 파급',
    footer:'NVDA Vera Rubin · Full Production', brand:BRAND_KO },
  en:{ title:'NVDA — Vera Rubin Officially in Full Production · Faster Than AMD Turin', heroIcon:'⚙️', heroBig:'FULL PROD', heroSub:'Next-gen Vera Rubin AI computing systems officially in mass production (per YF)',
    cards:[{icon:'⚙️',big:'Full prod',mid:'Vera Rubin',sub:'per Yahoo Finance'},{icon:'📅',big:'On sched',mid:'AI DC deployment',sub:'Jensen confirmed'},{icon:'⚡',big:'> Turin',mid:'Faster than AMD Turin',sub:'major customers testing'}],
    quoteLabel:'unusual_whales · JENSEN HUANG', quoteKo:'"NVDA Vera Rubin full production 공식 진입"', quoteEn:'"$NVDA is officially in full production of its next-generation \'Vera Rubin\' AI computing systems"',
    source:'Source: unusual_whales · YF · Jensen Huang · 2026.07.21',
    noteHead:'Explicit vs-AMD comparison = supports datacenter adoption case', noteSub:'Ripple into CoWoS/HBM value chain via Rubin GPU + Vera CPU pairing',
    footer:'NVDA Vera Rubin · Full Production', brand:BRAND_EN } },

// 9. NVDA × Nebius stake
{ file:'nvda-nbis-10pct-stake', symbol:'NVDA', badge:'NVDA',
  ko:{ title:'NVDA — Nebius(NBIS) 22.2M 지분 · 약 10% 보유 공개', heroIcon:'🤝', heroBig:'~10 %', heroSub:'NVDA가 Nebius Group $NBIS의 22.2M 주식(약 10%) 보유 공개',
    cards:[{icon:'🤝',big:'22.2 M',mid:'보유 주식수',sub:'NBIS'},{icon:'📊',big:'~10 %',mid:'회사 지분율',sub:'개시 공개'},{icon:'🌐',big:'Nebius',mid:'AI 인프라 · 데이터센터',sub:'네덜란드 상장'}],
    quoteLabel:'LEOPOLD STOCK TRACKER', quoteKo:'"NVIDIA가 Nebius Group 지분 공개 — 회사의 약 10%인 22.2M 주식 보유"', quoteEn:'"Nvidia $NVDA has disclosed an ownership stake in Nebius Group $NBIS — 22.2 million shares, representing nearly 10% of the company"',
    source:'Source: Leopold Stock Tracker · 2026.07.21',
    noteHead:'NVDA의 인프라 파트너 지분 축적 = 수요 락인 전략의 연장', noteSub:'NBIS 밸류에이션·CAPEX 계획과 상관관계 확대 관찰',
    footer:'NVDA × NBIS · ~10% Stake', brand:BRAND_KO },
  en:{ title:'NVDA — Discloses ~10% Stake in Nebius (NBIS) · 22.2M Shares', heroIcon:'🤝', heroBig:'~10 %', heroSub:'Nvidia disclosed ownership of 22.2M NBIS shares (~10% of company)',
    cards:[{icon:'🤝',big:'22.2 M',mid:'Shares owned',sub:'NBIS'},{icon:'📊',big:'~10 %',mid:'of the company',sub:'first disclosure'},{icon:'🌐',big:'Nebius',mid:'AI infra · datacenter',sub:'Netherlands-listed'}],
    quoteLabel:'LEOPOLD STOCK TRACKER', quoteKo:'"NVDA가 NBIS 22.2M 지분 공개 · ~10%"', quoteEn:'"Nvidia $NVDA has disclosed an ownership stake in Nebius Group $NBIS — 22.2 million shares, representing nearly 10% of the company"',
    source:'Source: Leopold Stock Tracker · 2026.07.21',
    noteHead:'NVDA accumulating stakes in infra partners = demand lock-in extension', noteSub:'Watch correlation with NBIS valuation & capex plans',
    footer:'NVDA × NBIS · ~10% Stake', brand:BRAND_EN } },

// 10. MU BofA HBM Kimi
{ file:'mu-bofa-hbm-kimi', symbol:'MU', badge:'MU',
  ko:{ title:'MU — BofA \"best investment ideas\" 추가 · 중국 AI가 HBM 부족 확대', heroIcon:'💾', heroBig:'~1.4 TB', heroSub:'Kimi K2 인스턴스당 HBM 사용량이 Micron 장기 전망 강화',
    cards:[{icon:'🏦',big:'BofA',mid:'MU 추가',sub:'best investment ideas'},{icon:'🇨🇳',big:'중국 AI',mid:'HBM 부족 확대',sub:'모델 대형화 압력'},{icon:'💾',big:'~1.4 TB',mid:'Kimi K2 인스턴스당',sub:'Moonshot AI'}],
    quoteLabel:'SHAY BOLOOR · BANK OF AMERICA', quoteKo:'"중국 AI 모델이 HBM 부족을 확대 · Kimi K2 인스턴스당 ~1.4 TB HBM 사용이 Micron 장기 전망 강화"', quoteEn:'"Chinese AI models are expanding a HBM shortage · Kimi K2 uses ~1.4 TB of HBM per instance, reinforcing Micron\'s long-term outlook"',
    source:'Source: Shay Boloor · Bank of America · 2026.07.21',
    noteHead:'MSFT의 Kimi K2 Copilot 평가(어제)와 결합 = HBM 수요 서사 이중 강화', noteSub:'HBM 공급 3사(SK하이닉스·삼성·MU) 마진·CAPEX 흐름 트래킹 축',
    footer:'MU · BofA Best Ideas · Kimi K2 HBM', brand:BRAND_KO },
  en:{ title:'MU — Added to BofA Best Investment Ideas · Chinese AI Widens HBM Shortage', heroIcon:'💾', heroBig:'~1.4 TB', heroSub:'Kimi K2 HBM usage per instance reinforces Micron\'s long-term outlook',
    cards:[{icon:'🏦',big:'BofA',mid:'MU added',sub:'best investment ideas'},{icon:'🇨🇳',big:'China AI',mid:'Widens HBM shortage',sub:'model scale pressure'},{icon:'💾',big:'~1.4 TB',mid:'Per Kimi K2 instance',sub:'Moonshot AI'}],
    quoteLabel:'SHAY BOLOOR · BANK OF AMERICA', quoteKo:'"중국 AI · HBM 부족 확대 · Kimi K2 ~1.4TB"', quoteEn:'"Chinese AI models are expanding a HBM shortage · Kimi K2 uses ~1.4 TB of HBM per instance, reinforcing Micron\'s long-term outlook"',
    source:'Source: Shay Boloor · Bank of America · 2026.07.21',
    noteHead:'Combines with yesterday\'s MSFT Copilot × Kimi K2 story = double reinforcement', noteSub:'Track HBM trio margins/capex (SK Hynix, Samsung, MU)',
    footer:'MU · BofA Best Ideas · Kimi K2 HBM', brand:BRAND_EN } },

// 11. MSFT safest mega-cap
{ file:'msft-safest-megacap', symbol:'MSFT', badge:'MSFT',
  ko:{ title:'MSFT — \"가장 안전한 mega-cap\" 프레임 (Ogus Ekan)', heroIcon:'🛡️', heroBig:'MSFT', heroSub:'모델 비즈니스 대신 컴퓨트 판매 = day-1 마진 · GOOGL 대비 저평가',
    cards:[{icon:'🛡️',big:'Safest',mid:'mega-cap 프레임',sub:'Ogus Ekan'},{icon:'💵',big:'Compute',mid:'day-1 마진',sub:'모델 black hole 회피'},{icon:'📉',big:'−5% vs GOOGL',mid:'earnings 프리미엄',sub:'GOOGL +27%'}],
    quoteLabel:'OGUS EKAN', quoteKo:'"모델 사업은 black hole · MSFT는 컴퓨트를 고객에게 팔아 day-1 마진 확보"', quoteEn:'"Model business is a black hole · MSFT sells compute to customers for training/inference, making margins from day 1"',
    source:'Source: Ogus Ekan · 2026.07.21',
    noteHead:'FCF Projection 2026–2030 시각화가 프레임 근거', noteSub:'실제 Azure/OpenAI 지분 재평가·Copilot ARR이 검증 축',
    footer:'MSFT · Safest Mega-cap Frame', brand:BRAND_KO },
  en:{ title:'MSFT — Framed as \"Safest Mega-Cap\" (Ogus Ekan)', heroIcon:'🛡️', heroBig:'MSFT', heroSub:'Sells compute rather than fighting the model battle → day-1 margin · cheaper vs GOOGL',
    cards:[{icon:'🛡️',big:'Safest',mid:'Mega-cap frame',sub:'Ogus Ekan'},{icon:'💵',big:'Compute',mid:'Day-1 margin',sub:'avoids model black hole'},{icon:'📉',big:'−5% vs GOOGL',mid:'Earnings premium',sub:'GOOGL +27%'}],
    quoteLabel:'OGUS EKAN', quoteKo:'"모델은 black hole · MSFT는 컴퓨트 판매로 day-1 마진"', quoteEn:'"Model business is a black hole · MSFT sells compute to customers for training/inference, making margins from day 1"',
    source:'Source: Ogus Ekan · 2026.07.21',
    noteHead:'FCF Projection 2026–2030 chart underpins the frame', noteSub:'Validate via Azure/OpenAI stake revaluation and Copilot ARR trend',
    footer:'MSFT · Safest Mega-cap Frame', brand:BRAND_EN } },

// 12. GOOGL Q3 earnings preview
{ file:'googl-q3-earnings-preview', symbol:'GOOGL', badge:'GOOGL',
  ko:{ title:'GOOGL — Q3 2026 어닝 프리뷰 (내일 · Cloud·AI CAPEX 주목)', heroIcon:'📈', heroBig:'$118 B', heroSub:'Net rev +21.3% · EPS $2.91 +25.5% · Cloud·YouTube·Search·AI CAPEX 관전',
    cards:[{icon:'💵',big:'$118 B',mid:'Net revenue',sub:'+21.3% YoY'},{icon:'📈',big:'$2.91',mid:'EPS',sub:'+25.5% YoY'},{icon:'☁️',big:'Cloud·AI',mid:'CAPEX outlook',sub:'주요 관전 포인트'}],
    quoteLabel:'INVESTING VISUALS', quoteKo:'"내일 GOOGL 어닝 · 주요 관전: Cloud 성장·YouTube 광고·Search 매출·AI CAPEX outlook"', quoteEn:'"$GOOGL reports earnings tomorrow · watch Cloud growth, YouTube ads, Search revenue, AI capex outlook"',
    source:'Source: Investing visuals · 2026.07.21',
    noteHead:'MSFT \"safest mega-cap\" 프레임과 GOOGL 프리미엄 격차 비교의 계기', noteSub:'AI CAPEX 코멘트가 하이퍼스케일러 지출 사이클의 방향타',
    footer:'GOOGL · Q3 2026 Preview', brand:BRAND_KO },
  en:{ title:'GOOGL — Q3 2026 Earnings Preview (Tomorrow · Cloud/AI Capex In Focus)', heroIcon:'📈', heroBig:'$118 B', heroSub:'Net rev +21.3% · EPS $2.91 +25.5% · Cloud/YT/Search/AI capex to watch',
    cards:[{icon:'💵',big:'$118 B',mid:'Net revenue',sub:'+21.3% YoY'},{icon:'📈',big:'$2.91',mid:'EPS',sub:'+25.5% YoY'},{icon:'☁️',big:'Cloud·AI',mid:'Capex outlook',sub:'main watch item'}],
    quoteLabel:'INVESTING VISUALS', quoteKo:'"내일 어닝 · Cloud·YouTube·Search·AI CAPEX"', quoteEn:'"$GOOGL reports earnings tomorrow · watch Cloud growth, YouTube ads, Search revenue, AI capex outlook"',
    source:'Source: Investing visuals · 2026.07.21',
    noteHead:'Contrast with MSFT \"safest mega-cap\" frame · GOOGL earnings premium debate', noteSub:'AI capex commentary sets tone for hyperscaler spend cycle',
    footer:'GOOGL · Q3 2026 Preview', brand:BRAND_EN } },

// 13. Fink compute futures market
{ file:'blk-fink-compute-futures', symbol:'BLK', badge:'BLK',
  ko:{ title:'BLK — Fink: \"컴퓨트가 다음 선물시장 · 다음 글로벌 금융혁명\"', heroIcon:'⚡', heroBig:'COMPUTE', heroSub:'수요 > 공급 지속 · 컴퓨트가 선물시장으로 등장할 것',
    cards:[{icon:'💰',big:'Futures',mid:'컴퓨트 선물시장',sub:'차기 금융혁명'},{icon:'📈',big:'수요 > 공급',mid:'AI compute',sub:'지속되는 미스매치'},{icon:'🇺🇸',big:'US mkts',mid:'자본시장이 자금 조달',sub:'리더십 유지'}],
    quoteLabel:'ARK INVEST TRACKER · LARRY FINK', quoteKo:'"컴퓨트가 새로운 선물시장이 될 것 · 금융의 차기 혁명"', quoteEn:'"Compute could become a new futures market · Fink says it\'s the next revolution in finance"',
    source:'Source: Ark Invest Tracker · Larry Fink (BlackRock) · 2026.07.21',
    noteHead:'AI 컴퓨트 부족·전력 부족이 미국 자본조달 스토리와 결합', noteSub:'BlackRock 컴퓨트 인프라 펀드·데이터센터 크레딧 프로덕트 확대 관찰',
    footer:'BLK · Fink · Compute Futures Market', brand:BRAND_KO },
  en:{ title:'BLK — Fink: \"Compute Will Be the Next Futures Market · Next Global Financial Revolution\"', heroIcon:'⚡', heroBig:'COMPUTE', heroSub:'Demand outrunning supply · compute set to emerge as a futures market',
    cards:[{icon:'💰',big:'Futures',mid:'Compute futures mkt',sub:'next revolution'},{icon:'📈',big:'Demand > Supply',mid:'AI compute',sub:'persistent mismatch'},{icon:'🇺🇸',big:'US mkts',mid:'Capital markets fund it',sub:'leadership retention'}],
    quoteLabel:'ARK INVEST TRACKER · LARRY FINK', quoteKo:'"컴퓨트 선물시장 등장"', quoteEn:'"Compute could become a new futures market · Fink says it\'s the next revolution in finance"',
    source:'Source: Ark Invest Tracker · Larry Fink (BlackRock) · 2026.07.21',
    noteHead:'AI compute + power shortage tied into US capital-formation story', noteSub:'Watch BLK compute-infra funds & datacenter-credit product expansion',
    footer:'BLK · Fink · Compute Futures Market', brand:BRAND_EN } },

// 14. SPCX SGX listing
{ file:'spcx-sgx-listing', symbol:'SPCX', badge:'SPCX',
  ko:{ title:'SPCX — 싱가폴 증권거래소(SGX) 예치증권 상장 (7월 22일)', heroIcon:'🇸🇬', heroBig:'SGX', heroSub:'싱가폴 투자자가 SPCX 예치증권을 SGX에서 직접 매매 (7/22부터)',
    cards:[{icon:'📅',big:'JUL 22',mid:'상장일',sub:'DR(예치증권)'},{icon:'🇸🇬',big:'SGD',mid:'싱가폴 달러 거래',sub:'현지 시간'},{icon:'🌏',big:'투자 접근성',mid:'아시아 소매 확대',sub:'아시아 판 SPCX 익스포저'}],
    quoteLabel:'DOGEDESIGNER', quoteKo:'"7/22부터 SGX가 SpaceX 예치증권 상장 · 싱가폴 달러·현지 시간 매매"', quoteEn:'"Starting July 22, SGX will begin listing SpaceX depository receipts · trade in SGD during local hours"',
    source:'Source: DogeDesigner · 2026.07.21',
    noteHead:'미국 시간 외 SPCX 익스포저 채널 확대 = 유동성/유입 축 다각화', noteSub:'DR 구조·거래량·프리미엄 discount 초기 형성 관찰',
    footer:'SPCX × SGX · DR Listing 7/22', brand:BRAND_KO },
  en:{ title:'SPCX — Depository Receipts List on Singapore Exchange (SGX) · Starts Jul 22', heroIcon:'🇸🇬', heroBig:'SGX', heroSub:'Singapore investors get direct SPCX exposure via DR on SGX from Jul 22',
    cards:[{icon:'📅',big:'JUL 22',mid:'Listing date',sub:'DR (depository receipt)'},{icon:'🇸🇬',big:'SGD',mid:'Trade in SG dollars',sub:'local hours'},{icon:'🌏',big:'Access',mid:'Asia retail expansion',sub:'Asian SPCX exposure'}],
    quoteLabel:'DOGEDESIGNER', quoteKo:'"7/22 SGX SPCX DR 상장"', quoteEn:'"Starting July 22, SGX will begin listing SpaceX depository receipts · trade in SGD during local hours"',
    source:'Source: DogeDesigner · 2026.07.21',
    noteHead:'Adds a non-US-hours SPCX exposure channel — liquidity/inflow diversification', noteSub:'Watch early DR structure, volume, and premium/discount dynamics',
    footer:'SPCX × SGX · DR Listing 7/22', brand:BRAND_EN } },

// 15. SPCX retail stopped buying
{ file:'spcx-retail-stopped-buying', symbol:'SPCX', badge:'SPCX',
  ko:{ title:'SPCX — 개인 투자자 순매수 중단 신호 (Barchart)', heroIcon:'📉', heroBig:'RETAIL ↓', heroSub:'어제 $320M 유입 1위였던 개인 자금이 순유출 국면 진입',
    cards:[{icon:'📉',big:'순매수 ↓',mid:'주간 흐름 반전',sub:'Barchart chart'},{icon:'💧',big:'$320 M',mid:'전주 유입 (참고)',sub:'2026-07-20 리포트'},{icon:'🐻',big:'−7% 회복',mid:'7일 연속 하락 후',sub:'2026-07-21 언급'}],
    quoteLabel:'BARCHART · WHALE INSIDER', quoteKo:'"개인 투자자들이 SpaceX $SPCX 매수를 멈췄다"', quoteEn:'"Investors have stopped buying SpaceX $SPCX"',
    source:'Source: Barchart · Whale Insider · 2026.07.21',
    noteHead:'실적(8/4)·Starship Flight 13 이벤트 앞두고 관망 심리 유입', noteSub:'SGX DR 상장으로 신규 지역 유동성 유입은 카운터 효과 가능',
    footer:'SPCX · Retail Net Flow Turned', brand:BRAND_KO },
  en:{ title:'SPCX — Retail Net Buying Turns Off (Barchart)', heroIcon:'📉', heroBig:'RETAIL ↓', heroSub:'Retail flow flips negative after last week\'s $320M #1 inflow',
    cards:[{icon:'📉',big:'Net flow ↓',mid:'Weekly reversal',sub:'Barchart chart'},{icon:'💧',big:'$320 M',mid:'Last week inflow',sub:'per 2026-07-20 report'},{icon:'🐻',big:'−7% recovery',mid:'After 7-day losses',sub:'2026-07-21 note'}],
    quoteLabel:'BARCHART · WHALE INSIDER', quoteKo:'"개인이 SPCX 매수 중단"', quoteEn:'"Investors have stopped buying SpaceX $SPCX"',
    source:'Source: Barchart · Whale Insider · 2026.07.21',
    noteHead:'Wait-and-see ahead of earnings (Aug 4) & Starship Flight 13', noteSub:'SGX DR listing may add new regional liquidity as offset',
    footer:'SPCX · Retail Net Flow Turned', brand:BRAND_EN } },

// 16. Macro Margin debt $1.5T
{ file:'macro-margin-debt-15t', symbol:'MACRO', badge:'MACRO',
  ko:{ title:'MACRO — 총 마진 부채 $1.5T 사상 최고 (Kalshi)', heroIcon:'💳', heroBig:'$1.5 T', heroSub:'총 마진 부채가 사상 최고 · 개인 레버리지 확대 사이클',
    cards:[{icon:'💳',big:'$1.5 T',mid:'Total margin debt',sub:'ATH'},{icon:'📊',big:'Kalshi',mid:'예측시장 헤드라인',sub:'JUST IN'},{icon:'⚠️',big:'Leverage ↑',mid:'개인 레버리지 사이클',sub:'변동성 확대 조건'}],
    quoteLabel:'KALSHI', quoteKo:'"총 마진 부채가 $1.5T · 사상 최고 도달"', quoteEn:'"Total margin debt hits $1.5 trillion — an all-time high"',
    source:'Source: Kalshi · 2026.07.21',
    noteHead:'AI/성장주 랠리 + 개인 레버리지 = 상방·하방 모두 확대 조건', noteSub:'전자책(Ron Baron)의 인플레이션 헤지·자산 소유 논거와 결합해 리스크·수익 재점검',
    footer:'MACRO · Margin Debt $1.5T ATH', brand:BRAND_KO },
  en:{ title:'MACRO — Total Margin Debt Hits $1.5T All-Time High (Kalshi)', heroIcon:'💳', heroBig:'$1.5 T', heroSub:'Total margin debt at record · retail leverage cycle',
    cards:[{icon:'💳',big:'$1.5 T',mid:'Total margin debt',sub:'ATH'},{icon:'📊',big:'Kalshi',mid:'Prediction-market feed',sub:'JUST IN'},{icon:'⚠️',big:'Leverage ↑',mid:'Retail leverage cycle',sub:'volatility expansion'}],
    quoteLabel:'KALSHI', quoteKo:'"마진 부채 $1.5T 사상 최고"', quoteEn:'"Total margin debt hits $1.5 trillion — an all-time high"',
    source:'Source: Kalshi · 2026.07.21',
    noteHead:'AI/growth rally + retail leverage → both upside and downside get amplified', noteSub:'Cross-read with Baron\'s inflation-hedge & asset-ownership frame',
    footer:'MACRO · Margin Debt $1.5T ATH', brand:BRAND_EN } },
];

let written = 0;
for (const t of T) {
  const koWith = { ...t.ko, symbol: t.symbol };
  const enWith = { ...t.en, symbol: t.symbol };
  fs.writeFileSync(path.join(OUT, `${t.file}-20260722.svg`),    tpl(koWith));
  fs.writeFileSync(path.join(OUT, `${t.file}-20260722-en.svg`), tpl(enWith));
  written += 2;
}
console.log(`✅ ${written} SVG 파일 생성 완료 (${T.length} topics × KO/EN)`);
