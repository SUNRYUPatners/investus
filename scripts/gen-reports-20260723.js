// 2026-07-23 리포트 SVG 생성기
// 신규 규칙 반영: badge=symbol 자동 · 제목 폰트 단계 · 티커별 팔레트 · 초보 친화 카드
// 실행: node scripts/gen-reports-20260723.js
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.07.23';

// 종목별 팔레트 (feedback_svg_per_symbol_colors.md)
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
  BLK:    { fg:'#eab308', fg2:'#ca8a04', bg2:'#191408', card:'#1a1408' },
  MU:     { fg:'#3b82f6', fg2:'#2563eb', bg2:'#06121f', card:'#0a1420' },
};

function esc(s) {
  return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;').replace(/</g,'&lt;');
}
function E(o) { const r={}; for (const k in o) r[k]=typeof o[k]==='string'?esc(o[k]):o[k]; return r; }

// 제목 길이별 폰트 (feedback_svg_title_length.md)
function pickTitleFont(len) {
  if (len <= 30) return 30;
  if (len <= 40) return 26;
  if (len <= 52) return 22;
  return 20;
}

function tpl(oRaw) {
  const o = E(oRaw);
  const p = PSYM[oRaw.symbol] || PSYM.MACRO;
  const badge = o.badge || o.symbol || 'INVESTUS'; // undefined 방지
  const titleFont = pickTitleFont(oRaw.title.length);
  if (oRaw.title.length > 40) {
    console.warn(`⚠️  긴 제목(${oRaw.title.length}자): ${oRaw.title}`);
  }
  const cards = oRaw.cards.map((cRaw, i) => {
    const c = E(cRaw);
    const x = [60, 390, 720][i];
    return `
  <rect x="${x}" y="402" width="300" height="190" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
  <text x="${x+150}" y="452" font-family="Arial" font-size="40" text-anchor="middle">${c.icon}</text>
  <text x="${x+150}" y="502" font-family="Arial Black,Arial" font-size="26" font-weight="900" fill="${p.fg}" text-anchor="middle">${c.big}</text>
  <text x="${x+150}" y="536" font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle">${c.mid}</text>
  <text x="${x+150}" y="566" font-family="Arial" font-size="18" fill="#6b7280" text-anchor="middle">${c.sub}</text>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0d1117"/><stop offset="100%" style="stop-color:${p.bg2}"/></linearGradient>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${p.fg}"/><stop offset="100%" style="stop-color:${p.fg2}"/></linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <rect width="1080" height="1080" fill="none" stroke="#1f2937" stroke-width="2"/>
  <rect x="0" y="0" width="1080" height="5" fill="url(#g)"/>
  <rect x="40" y="20" width="150" height="38" rx="19" fill="${p.fg}30" stroke="${p.fg}" stroke-width="1.5"/>
  <text x="115" y="44" font-family="Arial Black,Arial" font-size="16" font-weight="900" fill="${p.fg}" text-anchor="middle">${badge}</text>
  <text x="540" y="46" font-family="Arial" font-size="13" fill="#6b7280" text-anchor="middle" letter-spacing="3">INVESTUS DAILY REPORT</text>
  <rect x="900" y="20" width="148" height="38" rx="19" fill="#1f2937" stroke="#374151"/>
  <text x="974" y="44" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle">${DATE}</text>
  <text x="540" y="102" font-family="Arial Black,Arial" font-size="${titleFont}" font-weight="900" fill="#f9fafb" text-anchor="middle">${o.title}</text>
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
  <text x="540" y="852" font-family="Arial" font-size="22" fill="${p.fg}" text-anchor="middle">${o.noteHead}</text>
  <text x="540" y="886" font-family="Arial" font-size="19" fill="#9ca3af" text-anchor="middle">${o.noteSub}</text>
  <text x="540" y="974" font-family="Arial" font-size="20" fill="#374151" text-anchor="middle">${o.footer} · ${DATE}</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#g)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${o.brand}</text>
</svg>`;
}

const BRAND_KO = 'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE';
const BRAND_EN = 'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE';

const T = [
// 1. TSLA Q2 어닝
{ file:'tsla-q2-earnings-print', symbol:'TSLA',
  ko:{ title:'TSLA Q2 실적 — 매출 사상 최고 · EPS는 컨센 하회', heroIcon:'📊', heroBig:'$28.24 B', heroSub:'Q2 매출 사상 최고(컨센 $27.60B 상회) · EPS $2.34로 컨센 $2.50 소폭 하회',
    cards:[{icon:'💵',big:'$28.24 B',mid:'매출(Revenue)',sub:'예상 $27.60B 대비 상회 · 분기 record'},{icon:'📉',big:'$2.34',mid:'주당순이익(EPS)',sub:'예상 $2.50 대비 소폭 하회'},{icon:'💰',big:'$18.66 B',mid:'영업현금흐름 TTM',sub:'전기간 최고치 (Wall St Engine)'}],
    quoteLabel:'NIC CRUZ PATANE · THESONOFWALKLEY', quoteKo:'"매출 기준으로는 Tesla 사상 최고 분기"', quoteEn:'"Tesla had its best quarter EVER in terms of revenue"',
    source:'출처: Nic Cruz Patane · TheSonOfWalkley · Wall St Engine · 2026.07.22',
    noteHead:'왜 중요한가: 매출 record이지만 EPS 미스로 마진·비용 압력 존재', noteSub:'앞으로 볼 것: 컨퍼런스 콜의 마진 가이던스·Robotaxi/Optimus 로드맵 코멘트',
    footer:'TSLA · Q2 매출 record / EPS 미스', brand:BRAND_KO },
  en:{ title:'TSLA Q2 Print — Record Revenue · EPS Slight Miss', heroIcon:'📊', heroBig:'$28.24 B', heroSub:'Q2 revenue all-time high (est $27.60B) · EPS $2.34 vs est $2.50',
    cards:[{icon:'💵',big:'$28.24 B',mid:'Revenue',sub:'beat est $27.60B · quarterly record'},{icon:'📉',big:'$2.34',mid:'EPS',sub:'below est $2.50'},{icon:'💰',big:'$18.66 B',mid:'Op cash flow TTM',sub:'all-time high (Wall St Engine)'}],
    quoteLabel:'NIC CRUZ PATANE · THESONOFWALKLEY', quoteKo:'"매출 기준 Tesla 사상 최고 분기"', quoteEn:'"Tesla had its best quarter EVER in terms of revenue"',
    source:'Source: Nic Cruz Patane · TheSonOfWalkley · Wall St Engine · 2026.07.22',
    noteHead:'Why it matters: Revenue record, but EPS miss signals margin/cost pressure', noteSub:'Watch next: call commentary on margins and Robotaxi/Optimus roadmap',
    footer:'TSLA · Q2 Revenue Record / EPS Miss', brand:BRAND_EN } },

// 2. TSLA Q2 shareholder update highlights
{ file:'tsla-q2-shareholder-update', symbol:'TSLA',
  ko:{ title:'TSLA Q2 주주 업데이트 — Cybercab 파일럿·Robotaxi·셀 확장', heroIcon:'📝', heroBig:'HIGHLIGHTS', heroSub:'Cybercab 파일럿 시작·Robotaxi 24/7·배터리 셀 캐파 확장·Optimus Gen 3 라인 준비',
    cards:[{icon:'🚕',big:'Cybercab',mid:'Gigafactory Texas 파일럿',sub:'Tesla Semi 자율주행 도로 테스트 개시'},{icon:'🏭',big:'셀 캐파',mid:'배터리 셀 생산 확장',sub:'Cybertruck/Model Y/Semi용 4680 셀'},{icon:'🤖',big:'Optimus 3',mid:'양산 라인 준비',sub:'Fremont 100만/텍사스 1000만 목표 검토'}],
    quoteLabel:'TESLA Q2 SHAREHOLDER UPDATE', quoteKo:'"Robotaxi Tampa 24시간 운영 개시 · US 7개 도시 서비스"', quoteEn:'"Tampa Robotaxi begins 24/7 operations · service live in 7 US cities"',
    source:'출처: Tesla Q2 2026 shareholder update · 2026.07.22',
    noteHead:'왜 중요한가: 실적 발표와 동시에 상용화 로드맵 여러 축이 동시 전개', noteSub:'앞으로 볼 것: Cybercab 정식 런치·Optimus Gen 3 SOP·EU FSD 승인 후속',
    footer:'TSLA · Q2 Shareholder Update', brand:BRAND_KO },
  en:{ title:'TSLA Q2 Shareholder Update — Cybercab Pilot · Robotaxi · Cell Ramp', heroIcon:'📝', heroBig:'HIGHLIGHTS', heroSub:'Cybercab pilot starts · Robotaxi 24/7 · battery cell ramp · Optimus Gen 3 lines prep',
    cards:[{icon:'🚕',big:'Cybercab',mid:'Giga Texas pilot',sub:'Semi begins self-driving road testing'},{icon:'🏭',big:'Cell',mid:'Battery cell ramp',sub:'4680 supports Cybertruck/Y/Semi'},{icon:'🤖',big:'Optimus 3',mid:'Production lines prep',sub:'Fremont 1M / Texas 10M targets discussed'}],
    quoteLabel:'TESLA Q2 SHAREHOLDER UPDATE', quoteKo:'"Robotaxi Tampa 24시간 개시 · 미 7개 도시"', quoteEn:'"Tampa Robotaxi begins 24/7 operations · service live in 7 US cities"',
    source:'Source: Tesla Q2 2026 shareholder update · 2026.07.22',
    noteHead:'Why it matters: Multiple commercialization tracks moving alongside the print', noteSub:'Watch next: Cybercab launch date · Optimus Gen 3 SOP · EU FSD post-vote',
    footer:'TSLA · Q2 Shareholder Update', brand:BRAND_EN } },

// 3. FSD 8B miles + 1.48M paid users
{ file:'tsla-fsd-8b-148m-paid', symbol:'TSLA',
  ko:{ title:'TSLA FSD — 유료 사용자 148만·누적 자율주행 80억 마일', heroIcon:'🛣️', heroBig:'1.48 M', heroSub:'현재 유료 FSD 구독 사용자 148만 · 완전자율주행(FSD) 감독형 누적 주행 80억 마일',
    cards:[{icon:'👥',big:'148만',mid:'유료 FSD 구독자',sub:'Whole Mars Catalog 집계'},{icon:'🌍',big:'80억 mi',mid:'FSD 누적 마일',sub:'실도로 학습 데이터의 기반'},{icon:'📈',big:'성장',mid:'구독자·마일 동시 확장',sub:'데이터 플라이휠 가속'}],
    quoteLabel:'WHOLE MARS CATALOG · SAWYER MERRITT', quoteKo:'"Tesla 유료 FSD 구독자가 148만 명에 도달"', quoteEn:'"Tesla now has 1.48 million paid self-driving users"',
    source:'출처: Whole Mars Catalog · Sawyer Merritt · 2026.07.22',
    noteHead:'왜 중요한가: 구독 매출·데이터 확장이 동시 가속 = 반복 재활용 사이클', noteSub:'앞으로 볼 것: 신규 인도 FSD 부착률·EU 승인 후 지역 확장 속도',
    footer:'TSLA FSD · 1.48M 유료 · 8B mi 누적', brand:BRAND_KO },
  en:{ title:'TSLA FSD — 1.48M Paid Subs · 8B Cumulative Miles', heroIcon:'🛣️', heroBig:'1.48 M', heroSub:'1.48 million paid FSD subscribers · 8 billion cumulative FSD (Supervised) miles',
    cards:[{icon:'👥',big:'1.48 M',mid:'Paid FSD subs',sub:'per Whole Mars Catalog'},{icon:'🌍',big:'8 B mi',mid:'Cumulative FSD miles',sub:'foundation of real-world data'},{icon:'📈',big:'Growth',mid:'Subs + miles compound',sub:'data flywheel accelerating'}],
    quoteLabel:'WHOLE MARS CATALOG · SAWYER MERRITT', quoteKo:'"유료 FSD 148만"', quoteEn:'"Tesla now has 1.48 million paid self-driving users"',
    source:'Source: Whole Mars Catalog · Sawyer Merritt · 2026.07.22',
    noteHead:'Why it matters: Subscription revenue and data both compound = feedback loop', noteSub:'Watch next: attach rate on new deliveries and EU rollout post-approval',
    footer:'TSLA FSD · 1.48M Paid · 8B mi', brand:BRAND_EN } },

// 4. New deliveries FSD 55%
{ file:'tsla-fsd-55pct-new-delivery', symbol:'TSLA',
  ko:{ title:'TSLA — 신규 인도 차량의 55%가 FSD 구독', heroIcon:'📈', heroBig:'55 %', heroSub:'분기 신규 인도된 Tesla 차량 중 55%가 완전자율주행(FSD) 구독 · 부착률 사상 최고 수준',
    cards:[{icon:'📈',big:'55 %',mid:'신규 인도 FSD 부착률',sub:'구독형 매출 확대 축'},{icon:'📊',big:'상승',mid:'전 분기 대비 부착률 증가',sub:'광고·매장 마케팅 효과'},{icon:'💵',big:'ARR',mid:'반복 매출 구조 강화',sub:'자동차 회사가 SaaS성 매출로'}],
    quoteLabel:'SAWYER MERRITT', quoteKo:'"신규 인도 차량의 55%가 FSD를 구독 · 누적 8B마일 돌파"', quoteEn:'"55% of new deliveries now subscribe FSD · 8B miles cumulative"',
    source:'출처: Sawyer Merritt · 2026.07.22',
    noteHead:'왜 중요한가: FSD가 하드웨어 판매의 부속에서 반복 매출 축으로 이동', noteSub:'앞으로 볼 것: 지역별 부착률 격차·요금제 개편·EU 확산 속도',
    footer:'TSLA FSD · 신규 부착률 55%', brand:BRAND_KO },
  en:{ title:'TSLA — 55% of New Deliveries Subscribe FSD', heroIcon:'📈', heroBig:'55 %', heroSub:'55% of new Tesla deliveries this quarter subscribe FSD · record-high attach rate',
    cards:[{icon:'📈',big:'55 %',mid:'FSD attach on new deliv.',sub:'subscription rev axis'},{icon:'📊',big:'Rising',mid:'Above prior quarter',sub:'ads/store marketing help'},{icon:'💵',big:'ARR',mid:'Recurring rev model',sub:'auto co. adds SaaS-like stream'}],
    quoteLabel:'SAWYER MERRITT', quoteKo:'"신규 인도 55% FSD 구독 · 8B miles 누적"', quoteEn:'"55% of new deliveries now subscribe FSD · 8B miles cumulative"',
    source:'Source: Sawyer Merritt · 2026.07.22',
    noteHead:'Why it matters: FSD is shifting from HW accessory to recurring rev pillar', noteSub:'Watch next: region-level attach gaps, pricing plan tweaks, EU rollout',
    footer:'TSLA FSD · 55% New Attach', brand:BRAND_EN } },

// 5. Robotaxi Tampa 24/7
{ file:'tsla-robotaxi-tampa-247', symbol:'TSLA',
  ko:{ title:'TSLA Robotaxi — Tampa에서 24/7 상시 운영 최초 개시', heroIcon:'🕐', heroBig:'24 / 7', heroSub:'플로리다 Tampa에서 Robotaxi가 24시간 무휴 상시 운영 시작 · 지원 스태프 상주',
    cards:[{icon:'🕐',big:'24 / 7',mid:'Tampa 상시 운영',sub:'첫 24시간 로보택시 서비스'},{icon:'🔧',big:'현장 지원',mid:'차량 트러블·충전·경정비 대응',sub:'가동률 유지 인프라'},{icon:'📍',big:'7개 도시',mid:'미국 서비스 도시 수',sub:'Tampa/Orlando/Miami/Dallas 등'}],
    quoteLabel:'TESLA · TESLA Q2 UPDATE', quoteKo:'"Tesla Robotaxi Tampa 24시간 운영 개시 · 현장 지원 스태프 상주"', quoteEn:'"Robotaxi begins 24/7 operations in Tampa · on-site support staff for uptime"',
    source:'출처: Tesla / Q2 2026 shareholder update · 2026.07.22',
    noteHead:'왜 중요한가: 무휴 운영은 상용 로보택시 유닛 이코노믹스 검증의 실측 무대', noteSub:'앞으로 볼 것: 시간대별 이용률·대당 매출·개입률 데이터',
    footer:'TSLA Robotaxi · Tampa 24/7', brand:BRAND_KO },
  en:{ title:'TSLA Robotaxi — First 24/7 Service Launches in Tampa', heroIcon:'🕐', heroBig:'24 / 7', heroSub:'Robotaxi begins 24-hour operations in Tampa, FL · on-site support staff standing by',
    cards:[{icon:'🕐',big:'24 / 7',mid:'Tampa always-on',sub:'first 24h robotaxi service'},{icon:'🔧',big:'On-site',mid:'Handles issues/charging/minor fix',sub:'uptime infrastructure'},{icon:'📍',big:'7 cities',mid:'US service coverage',sub:'Tampa/Orlando/Miami/Dallas etc.'}],
    quoteLabel:'TESLA · TESLA Q2 UPDATE', quoteKo:'"Tampa 24시간 운영 개시"', quoteEn:'"Robotaxi begins 24/7 operations in Tampa · on-site support staff for uptime"',
    source:'Source: Tesla / Q2 2026 shareholder update · 2026.07.22',
    noteHead:'Why it matters: 24/7 ops = live testbed for commercial robotaxi unit economics', noteSub:'Watch next: time-of-day utilization, revenue per vehicle, intervention rate',
    footer:'TSLA Robotaxi · Tampa 24/7', brand:BRAND_EN } },

// 6. FSD v14.5.3 HW3 Zach review
{ file:'tsla-fsd-v1453-hw3-review', symbol:'TSLA',
  ko:{ title:'TSLA FSD v14.5.3 — HW3 실주행 리뷰: 큰 진전', heroIcon:'✅', heroBig:'HW3 · v14.5.3', heroSub:'Model 3 HW3(AI3)에서 FSD v14 라이트 배포 · 인간 같은 부드러움과 자연스러운 개입',
    cards:[{icon:'🛣️',big:'하이웨이',mid:'감속·차선 변경 자연스러움',sub:'긴급 브레이크 대신 부드럽게'},{icon:'🌆',big:'뉴욕 시가지',mid:'복잡한 도심 상황도 대응',sub:'사실상 완전자율에 가깝다는 리뷰'},{icon:'🅿️',big:'주차',mid:'이전 버전 대비 큰 개선',sub:'프로필 반영은 아직 부분적'}],
    quoteLabel:'ZACH · FSD 실사용자 리뷰', quoteKo:'"HW3에서 v14 라이트가 예상보다 훨씬 잘 굴러간다 — 대성공"', quoteEn:'"v14 lite on HW3 is working far better than expected — a big win"',
    source:'출처: Zach @Zack · 2026.07.22',
    noteHead:'왜 중요한가: 구형 하드웨어 재활성화 시나리오의 정성적 근거 축적', noteSub:'앞으로 볼 것: 안전 리포트의 정량 지표·전 사용자 롤아웃 속도',
    footer:'TSLA FSD v14.5.3 · HW3 리뷰', brand:BRAND_KO },
  en:{ title:'TSLA FSD v14.5.3 — HW3 Real-World Review: Big Leap', heroIcon:'✅', heroBig:'HW3 · v14.5.3', heroSub:'Model 3 HW3 (AI3) gets v14 Lite · human-like smoothness and natural takeovers',
    cards:[{icon:'🛣️',big:'Highway',mid:'Smooth deceleration & lane change',sub:'no jarring brakes'},{icon:'🌆',big:'NYC streets',mid:'Handles complex city scenes',sub:'reviewer calls it near-autonomous'},{icon:'🅿️',big:'Parking',mid:'Big improvement vs prior',sub:'profile-based tuning partial'}],
    quoteLabel:'ZACH · FSD OWNER REVIEW', quoteKo:'"HW3에서 v14 lite는 대성공"', quoteEn:'"v14 lite on HW3 is working far better than expected — a big win"',
    source:'Source: Zach @Zack · 2026.07.22',
    noteHead:'Why it matters: Qualitative evidence for reactivating legacy HW3 fleet', noteSub:'Watch next: quantitative safety-report metrics, rollout pace',
    footer:'TSLA FSD v14.5.3 · HW3 review', brand:BRAND_EN } },

// 7. Manufacturing Capacity +105K
{ file:'tsla-capacity-plus-105k', symbol:'TSLA',
  ko:{ title:'TSLA — 총 제조 캐파 +105,000 확장 발표', heroIcon:'🏭', heroBig:'+105,000', heroSub:'차량·에너지·로보틱스 전 부문에 걸친 신규 설치 캐파 · Nevada/Texas/NY 등',
    cards:[{icon:'🚗',big:'자동차',mid:'Model 3/Y/S/X · Cybertruck · Semi',sub:'Nevada Semi 프로덕션 등 확장'},{icon:'🔋',big:'에너지 저장',mid:'Megapack 등 셀·팩',sub:'유럽·미국 프로젝트 증설'},{icon:'🤖',big:'로보틱스',mid:'Optimus Gen 3 라인',sub:'초대량 자동화 목표'}],
    quoteLabel:'SAWYER MERRITT · TESLA', quoteKo:'"Tesla 총 설치 제조 캐파 105,000 확장 계획 발표"', quoteEn:'"Tesla announces total installed manufacturing capacity expansion of +105,000"',
    source:'출처: Sawyer Merritt · 2026.07.22',
    noteHead:'왜 중요한가: 캐파 확장이 매출 성장의 상한을 다시 끌어올림', noteSub:'앞으로 볼 것: 라인별 SOP 시점·부품 수급·인력 채용 진행',
    footer:'TSLA · Capacity +105K', brand:BRAND_KO },
  en:{ title:'TSLA — Total Installed Manufacturing Capacity +105,000', heroIcon:'🏭', heroBig:'+105,000', heroSub:'New capacity spans autos, energy, robotics · Nevada/Texas/NY and more',
    cards:[{icon:'🚗',big:'Auto',mid:'Model 3/Y/S/X · Cybertruck · Semi',sub:'Nevada Semi ramp etc.'},{icon:'🔋',big:'Energy',mid:'Megapack cells & packs',sub:'EU + US project expansion'},{icon:'🤖',big:'Robotics',mid:'Optimus Gen 3 lines',sub:'high-volume automation target'}],
    quoteLabel:'SAWYER MERRITT · TESLA', quoteKo:'"총 캐파 105,000 확장"', quoteEn:'"Tesla announces total installed manufacturing capacity expansion of +105,000"',
    source:'Source: Sawyer Merritt · 2026.07.22',
    noteHead:'Why it matters: Capacity expansion resets the revenue-growth ceiling', noteSub:'Watch next: per-line SOP dates, parts sourcing, hiring pipeline',
    footer:'TSLA · Capacity +105K', brand:BRAND_EN } },

// 8. Tesla Megapack EU €450M
{ file:'tsla-megapack-eu-450m', symbol:'TSLA',
  ko:{ title:'TSLA Energy — 유럽 Megapack 확장 · 4.5억 유로 파이낸싱', heroIcon:'🇪🇺', heroBig:'€450 M', heroSub:'벨기에 개발사 BSTOR SA/NV가 105 MW / 456 MWh Megapack 4개 프로젝트 파이낸싱 확보',
    cards:[{icon:'🔋',big:'105 MW',mid:'프로젝트당 출력',sub:'× 4 프로젝트'},{icon:'⚡',big:'456 MWh',mid:'프로젝트당 저장 용량',sub:'× 4 프로젝트'},{icon:'💶',big:'€450 M',mid:'파이낸싱 총액',sub:'벨기에 개발사 BSTOR SA/NV'}],
    quoteLabel:'MING Z', quoteKo:'"Tesla Megapack이 벨기에 대형 저장 프로젝트의 공급자"', quoteEn:'"Tesla Megapack is the supplier for large Belgian storage projects"',
    source:'출처: Ming Z · 2026.07.22',
    noteHead:'왜 중요한가: 유럽 6개국 확대·가스 발전 대체 시나리오가 병행', noteSub:'앞으로 볼 것: 실 배치 스케줄·후속 국가 계약·마진 프로파일',
    footer:'TSLA Energy · EU €450M Megapack', brand:BRAND_KO },
  en:{ title:'TSLA Energy — €450M Financing for European Megapack Rollout', heroIcon:'🇪🇺', heroBig:'€450 M', heroSub:'Belgian developer BSTOR SA/NV secures €450M for 4 × 105 MW / 456 MWh Megapack projects',
    cards:[{icon:'🔋',big:'105 MW',mid:'Per-project power',sub:'× 4 projects'},{icon:'⚡',big:'456 MWh',mid:'Per-project storage',sub:'× 4 projects'},{icon:'💶',big:'€450 M',mid:'Total financing',sub:'BSTOR SA/NV (Belgium)'}],
    quoteLabel:'MING Z', quoteKo:'"Tesla Megapack이 벨기에 대형 저장의 공급자"', quoteEn:'"Tesla Megapack is the supplier for large Belgian storage projects"',
    source:'Source: Ming Z · 2026.07.22',
    noteHead:'Why it matters: Multi-country EU expansion, gas-plant replacement thesis', noteSub:'Watch next: deployment schedule, follow-on contracts, margin profile',
    footer:'TSLA Energy · EU €450M Megapack', brand:BRAND_EN } },

// 9. Cybercab launch Sep
{ file:'tsla-cybercab-launch-sep', symbol:'TSLA',
  ko:{ title:'TSLA Cybercab — 9월 런치 준비 진행 중', heroIcon:'🚕', heroBig:'SEPT.', heroSub:'Cybercab 정식 런치가 9월경으로 준비 중 · Gigafactory Texas에서 파일럿 진행',
    cards:[{icon:'📅',big:'9월',mid:'예상 런치 시기',sub:'Q2 shareholder update 기준'},{icon:'🏭',big:'Giga TX',mid:'파일럿 진행 중',sub:'sample-line 검증'},{icon:'🔋',big:'4680 셀',mid:'배터리 공급 축',sub:'Cybertruck/Model Y와 공유'}],
    quoteLabel:'TESLA Q2 SHAREHOLDER UPDATE', quoteKo:'"Cybercab 런치를 9월 무렵으로 준비 · Giga Texas에서 파일럿 진행"', quoteEn:'"Cybercab launch targeted around September · pilot underway at Giga Texas"',
    source:'출처: Tesla Q2 2026 shareholder update · 2026.07.22',
    noteHead:'왜 중요한가: 파일럿 → 정식 런치 전환은 로보택시 유닛 이코노믹스의 실증 단계', noteSub:'앞으로 볼 것: 정확한 런치일·초도 배치 지역·규제 승인',
    footer:'TSLA Cybercab · Sept. launch prep', brand:BRAND_KO },
  en:{ title:'TSLA Cybercab — Launch Preparation Targets September', heroIcon:'🚕', heroBig:'SEPT.', heroSub:'Cybercab launch prep targets September · Gigafactory Texas pilot underway',
    cards:[{icon:'📅',big:'Sept.',mid:'Target launch timing',sub:'per Q2 shareholder update'},{icon:'🏭',big:'Giga TX',mid:'Pilot underway',sub:'sample-line validation'},{icon:'🔋',big:'4680 cell',mid:'Battery supply axis',sub:'shared w/ Cybertruck & Y'}],
    quoteLabel:'TESLA Q2 SHAREHOLDER UPDATE', quoteKo:'"Cybercab 9월 런치 준비 · Giga Texas 파일럿"', quoteEn:'"Cybercab launch targeted around September · pilot underway at Giga Texas"',
    source:'Source: Tesla Q2 2026 shareholder update · 2026.07.22',
    noteHead:'Why it matters: Pilot → launch = proof stage for robotaxi unit economics', noteSub:'Watch next: exact launch date, initial deployment regions, regulatory approvals',
    footer:'TSLA Cybercab · Sept. launch prep', brand:BRAND_EN } },

// 10. GOOGL Q3 earnings beat
{ file:'googl-q3-earnings-beat', symbol:'GOOGL',
  ko:{ title:'GOOGL Q3 실적 — 매출·EPS 모두 컨센 상회', heroIcon:'📈', heroBig:'$118.7 B', heroSub:'매출 $118.7B(컨센 $116.86B 상회) · EPS $2.94(컨센 $2.91 상회) · Cloud·Search 두 자릿수 성장',
    cards:[{icon:'💵',big:'$118.7 B',mid:'매출(컨센 상회)',sub:'예상 $116.86B 대비 상회'},{icon:'📈',big:'$2.94',mid:'주당순이익(컨센 상회)',sub:'예상 $2.91 대비 상회'},{icon:'☁️',big:'Cloud +33%',mid:'AI 클라우드 성장',sub:'Search +17% · 광고 견조'}],
    quoteLabel:'BLOSSOM · UNUSUAL_WHALES', quoteKo:'"Alphabet(GOOGL) 실적이 매출·EPS 동시 비트"', quoteEn:'"Alphabet(GOOGL) beats on both revenue and EPS"',
    source:'출처: Blossom · unusual_whales · 2026.07.22',
    noteHead:'왜 중요한가: Cloud +33% 유지가 하이퍼스케일러 프리미엄 정당화 지표', noteSub:'앞으로 볼 것: AI CAPEX 가이던스·YouTube 광고·Search 트렌드',
    footer:'GOOGL · Q3 Beat / Cloud +33%', brand:BRAND_KO },
  en:{ title:'GOOGL Q3 Print — Beats on Both Revenue and EPS', heroIcon:'📈', heroBig:'$118.7 B', heroSub:'Revenue $118.7B (vs $116.86B) · EPS $2.94 (vs $2.91) · Cloud & Search double-digit growth',
    cards:[{icon:'💵',big:'$118.7 B',mid:'Revenue beat',sub:'vs est $116.86B'},{icon:'📈',big:'$2.94',mid:'EPS beat',sub:'vs est $2.91'},{icon:'☁️',big:'Cloud +33%',mid:'AI cloud growth',sub:'Search +17% · ads solid'}],
    quoteLabel:'BLOSSOM · UNUSUAL_WHALES', quoteKo:'"Alphabet 매출·EPS 동시 비트"', quoteEn:'"Alphabet(GOOGL) beats on both revenue and EPS"',
    source:'Source: Blossom · unusual_whales · 2026.07.22',
    noteHead:'Why it matters: Cloud +33% sustains hyperscaler premium narrative', noteSub:'Watch next: AI capex guide, YouTube ads, Search trends',
    footer:'GOOGL · Q3 Beat / Cloud +33%', brand:BRAND_EN } },

// 11. Gemini 22B tokens weekly · F500 90%
{ file:'googl-gemini-22b-tokens', symbol:'GOOGL',
  ko:{ title:'GOOGL Gemini — 주간 220억 토큰 처리 · 포춘 500의 90% 사용', heroIcon:'🧠', heroBig:'22 B / 주', heroSub:'Gemini 모델이 매주 220억 토큰 처리 · 지난 분기 대비 2배 이상 · Fortune 500의 90%가 활용',
    cards:[{icon:'📊',big:'22 B',mid:'주간 처리 토큰',sub:'전 분기 대비 2배+'},{icon:'🏢',big:'90 %',mid:'Fortune 500 활용률',sub:'Gemini Enterprise 확산'},{icon:'👨‍💻',big:'400만+',mid:'개발자·950M 사용자',sub:'플랫폼 파급'}],
    quoteLabel:'SUNDAR PICHAI · GOOGL Q3', quoteKo:'"Gemini가 회사 전반의 AI 모멘텀을 다시 정의하고 있다"', quoteEn:'"Gemini is redefining the AI momentum across the company"',
    source:'출처: Sundar Pichai (GOOGL Q3 call) · Investing visuals · 2026.07.22',
    noteHead:'왜 중요한가: 토큰 처리량·엔터프라이즈 침투가 Cloud 매출로 전환되는 파이프라인', noteSub:'앞으로 볼 것: 토큰 단가·Gemini Enterprise 매출 기여·경쟁 대응(OpenAI/Anthropic)',
    footer:'GOOGL Gemini · 22B/주 · F500 90%', brand:BRAND_KO },
  en:{ title:'GOOGL Gemini — 22B Weekly Tokens · 90% of Fortune 500 Use It', heroIcon:'🧠', heroBig:'22 B / wk', heroSub:'Gemini processes 22B tokens/week (>2× prior quarter) · used by 90% of Fortune 500',
    cards:[{icon:'📊',big:'22 B',mid:'Weekly tokens',sub:'>2× prior quarter'},{icon:'🏢',big:'90 %',mid:'F500 adoption',sub:'Gemini Enterprise scale'},{icon:'👨‍💻',big:'4M+',mid:'Devs · 950M users',sub:'platform-wide reach'}],
    quoteLabel:'SUNDAR PICHAI · GOOGL Q3', quoteKo:'"Gemini가 회사 AI 모멘텀 재정의"', quoteEn:'"Gemini is redefining the AI momentum across the company"',
    source:'Source: Sundar Pichai (GOOGL Q3 call) · Investing visuals · 2026.07.22',
    noteHead:'Why it matters: Token throughput + enterprise share = Cloud revenue pipeline', noteSub:'Watch next: token pricing, Gemini Enterprise rev share, OpenAI/Anthropic response',
    footer:'GOOGL Gemini · 22B/wk · F500 90%', brand:BRAND_EN } },

// 12. Google CAPEX 3x in 2 years
{ file:'googl-capex-3x-in-2y', symbol:'GOOGL',
  ko:{ title:'GOOGL — CAPEX가 최근 2년간 약 3배 급증', heroIcon:'📊', heroBig:'~3 ×', heroSub:'AI 인프라 투자에 힘입어 Google의 자본지출(CAPEX)이 2년 새 약 3배로 확대',
    cards:[{icon:'📊',big:'~3 ×',mid:'2년 CAPEX 증가율',sub:'AI 인프라 주도'},{icon:'🏗️',big:'DC/GPU',mid:'데이터센터·GPU 도입',sub:'Cloud 매출 지원 축'},{icon:'💵',big:'>$150B+',mid:'하이퍼스케일러 지출',sub:'Google 단독 큰 몫'}],
    quoteLabel:'INVESTING VISUALS', quoteKo:'"Google의 자본지출이 지난 2년간 거의 3배로 증가"', quoteEn:'"Google\'s capex has nearly tripled over the past two years"',
    source:'출처: Investing visuals · 2026.07.22',
    noteHead:'왜 중요한가: 하이퍼스케일러 지출 집중 → 소수 대기업에 자본이 응집', noteSub:'앞으로 볼 것: 추가 CAPEX 가이던스·DC 상면 확보·감가상각 영향',
    footer:'GOOGL · CAPEX ~3× in 2y', brand:BRAND_KO },
  en:{ title:'GOOGL — Capex Has Nearly Tripled in Two Years', heroIcon:'📊', heroBig:'~3 ×', heroSub:'Google\'s capex ~3× over the past two years, driven by AI infrastructure',
    cards:[{icon:'📊',big:'~3 ×',mid:'2-year capex growth',sub:'AI-driven'},{icon:'🏗️',big:'DC/GPU',mid:'Datacenter + GPU build',sub:'supports Cloud'},{icon:'💵',big:'>$150B+',mid:'Hyperscaler spend',sub:'Google large share'}],
    quoteLabel:'INVESTING VISUALS', quoteKo:'"2년간 CAPEX 거의 3배"', quoteEn:'"Google\'s capex has nearly tripled over the past two years"',
    source:'Source: Investing visuals · 2026.07.22',
    noteHead:'Why it matters: Hyperscaler capex concentration → capital condenses into few names', noteSub:'Watch next: further capex guide, DC site availability, depreciation drag',
    footer:'GOOGL · Capex ~3× in 2y', brand:BRAND_EN } },

// 13. GOOGL SPCX $9.8B unrealized gain
{ file:'googl-spcx-98b-gain', symbol:'GOOGL',
  ko:{ title:'GOOGL — SpaceX(SPCX) 지분에서 98억 달러 미실현 이익', heroIcon:'🚀', heroBig:'$9.8 B', heroSub:'Q2 기준 Google이 보유한 SpaceX 지분의 미실현 이익 98억 달러 공개',
    cards:[{icon:'💰',big:'$9.8 B',mid:'미실현 이익(Q2 기준)',sub:'Google이 보유한 SPCX 지분'},{icon:'📅',big:'Q2 종료',mid:'분기말 시점',sub:'상장 후 첫 정식 공개'},{icon:'🔗',big:'GOOGL × SPCX',mid:'전략적 지분 관계',sub:'Starlink 파트너 연계'}],
    quoteLabel:'DAN D', quoteKo:'"Google이 SpaceX 지분에서 미실현 이익 98억 달러를 공개"', quoteEn:'"Google reported a $9.8B unrealized gain on its SpaceX (SPCX) shares"',
    source:'출처: Dan D · GOOGL Q3 공시 · 2026.07.22',
    noteHead:'왜 중요한가: SPCX 상장 이후 기업 지분 밸류에이션이 실적에 인식됨', noteSub:'앞으로 볼 것: 여타 상장전 지분(META/AMZN 등) 재평가 이벤트',
    footer:'GOOGL × SPCX · $9.8B 미실현 이익', brand:BRAND_KO },
  en:{ title:'GOOGL — $9.8B Unrealized Gain on SpaceX (SPCX) Shares', heroIcon:'🚀', heroBig:'$9.8 B', heroSub:'Google disclosed $9.8B unrealized gain on its SpaceX shares as of Q2 end',
    cards:[{icon:'💰',big:'$9.8 B',mid:'Unrealized (Q2 end)',sub:'Google\'s SPCX holdings'},{icon:'📅',big:'Q2 close',mid:'Period end',sub:'first formal disclosure post-listing'},{icon:'🔗',big:'GOOGL × SPCX',mid:'Strategic holding',sub:'ties to Starlink partnership'}],
    quoteLabel:'DAN D', quoteKo:'"$9.8B SPCX 미실현 이익 공개"', quoteEn:'"Google reported a $9.8B unrealized gain on its SpaceX (SPCX) shares"',
    source:'Source: Dan D · GOOGL Q3 disclosure · 2026.07.22',
    noteHead:'Why it matters: Post-SPCX-listing, private-stake gains hit reported earnings', noteSub:'Watch next: similar re-marks at META/AMZN and other holders',
    footer:'GOOGL × SPCX · $9.8B Unrealized', brand:BRAND_EN } },

// 14. SPCX Texas data center
{ file:'spcx-texas-datacenter-plan', symbol:'SPCX',
  ko:{ title:'SPCX — 텍사스에 대형 데이터센터 검토 보도', heroIcon:'🏢', heroBig:'TEXAS', heroSub:'SpaceX가 텍사스에 대규모("large-scale") 데이터센터 건설을 검토 중이라는 보도',
    cards:[{icon:'📍',big:'TEXAS',mid:'후보 부지',sub:'대형 규모 검토 중'},{icon:'🖥️',big:'DC',mid:'데이터센터 인프라',sub:'AI/Starlink 컴퓨트 지원'},{icon:'📰',big:'보도',mid:'현 단계 · 미확정',sub:'추가 공식 발표 대기'}],
    quoteLabel:'KELVISHALIK · 보도 인용', quoteKo:'"SpaceX가 텍사스에 대형 데이터센터 신설을 검토한다는 보도"', quoteEn:'"SpaceX reportedly considers building a new large-scale data center in Texas"',
    source:'출처: Kelvishalik / 관련 보도 · 2026.07.22',
    noteHead:'왜 중요한가: 어제 언급된 컴퓨트 부족 프레임(BlackRock Fink)과 결합', noteSub:'앞으로 볼 것: 부지·전력 계약·완공 시점·GPU 파트너 확인',
    footer:'SPCX · Texas DC 검토', brand:BRAND_KO },
  en:{ title:'SPCX — Reportedly Considers Large-Scale Data Center in Texas', heroIcon:'🏢', heroBig:'TEXAS', heroSub:'SpaceX reportedly evaluating a large-scale datacenter build in Texas',
    cards:[{icon:'📍',big:'TEXAS',mid:'Candidate location',sub:'large-scale under review'},{icon:'🖥️',big:'DC',mid:'Datacenter infra',sub:'supports AI/Starlink compute'},{icon:'📰',big:'Report',mid:'Current stage · unconfirmed',sub:'awaiting official news'}],
    quoteLabel:'KELVISHALIK · REPORT', quoteKo:'"텍사스 대형 DC 검토 보도"', quoteEn:'"SpaceX reportedly considers building a new large-scale data center in Texas"',
    source:'Source: Kelvishalik / related reports · 2026.07.22',
    noteHead:'Why it matters: Fits yesterday\'s compute-shortage frame from BlackRock\'s Fink', noteSub:'Watch next: site, power contracts, completion timing, GPU partner',
    footer:'SPCX · Texas DC Under Review', brand:BRAND_EN } },

// 15. Jensen on China open-source AI
{ file:'nvda-jensen-china-open-src', symbol:'NVDA',
  ko:{ title:'NVDA Jensen — 미국이 중국 오픈소스 AI에 접근해야 한다', heroIcon:'🌏', heroBig:'OPEN-SRC', heroSub:'젠슨 황: 미 기업들이 중국 오픈소스 AI 모델에 접근을 허용받아야 한다 · 리딩 사고의 확산',
    cards:[{icon:'🇨🇳',big:'China OSS',mid:'중국 오픈소스 모델',sub:'우수성 재조명'},{icon:'🇺🇸',big:'US 접근',mid:'H20 등 접근권 요구',sub:'workforce 이탈 방지 명분'},{icon:'💡',big:'리딩 사고',mid:'생태계 영향력 확산',sub:'API·개발자 유입'}],
    quoteLabel:'JENSEN HUANG (NVDA)', quoteKo:'"미 기업이 중국 오픈소스 AI 모델에 접근할 수 있어야 한다"', quoteEn:'"American companies should be allowed access to China\'s open-source AI models"',
    source:'출처: Jensen Huang / 관련 보도 · 2026.07.22',
    noteHead:'왜 중요한가: 오픈소스 채택률이 GPU 수요·CUDA 잠금 유지에 영향', noteSub:'앞으로 볼 것: 미국 정책 반응·H20 승인·글로벌 GPU 시장 재편',
    footer:'NVDA · Jensen on China OSS', brand:BRAND_KO },
  en:{ title:'NVDA Jensen — US Should Have Access to China\'s Open-Source AI', heroIcon:'🌏', heroBig:'OPEN-SRC', heroSub:'Jensen: US firms should be allowed access to China open-source AI models',
    cards:[{icon:'🇨🇳',big:'China OSS',mid:'China open-source models',sub:'quality re-appreciated'},{icon:'🇺🇸',big:'US access',mid:'Access to H20 etc.',sub:'workforce retention argument'},{icon:'💡',big:'Leading ideas',mid:'Ecosystem influence',sub:'API/developer inflow'}],
    quoteLabel:'JENSEN HUANG (NVDA)', quoteKo:'"미 기업이 중국 오픈소스 AI에 접근 가능해야"', quoteEn:'"American companies should be allowed access to China\'s open-source AI models"',
    source:'Source: Jensen Huang / related reports · 2026.07.22',
    noteHead:'Why it matters: OSS adoption shapes GPU demand & CUDA lock-in', noteSub:'Watch next: US policy response, H20 approvals, global GPU market shift',
    footer:'NVDA · Jensen on China OSS', brand:BRAND_EN } },

// 16. Macro Big Tech 65% S&P EPS growth
{ file:'macro-bigtech-sp500-65pct', symbol:'MACRO',
  ko:{ title:'MACRO — S&P 500 EPS 성장의 65%가 빅테크 집중', heroIcon:'📊', heroBig:'65 %', heroSub:'애널리스트 컨센 기준 Q1 2026 S&P 500 EPS 성장의 65%가 Big Tech · 반도체 25%',
    cards:[{icon:'🏢',big:'65 %',mid:'Big Tech 기여도',sub:'S&P 500 EPS 성장 대비'},{icon:'🧠',big:'25 %',mid:'반도체 기여도',sub:'2위 섹터'},{icon:'⚖️',big:'집중',mid:'지수 리더십 편중',sub:'하이퍼스케일러 소수에 응집'}],
    quoteLabel:'THE KOBEISSI LETTER', quoteKo:'"S&P 500 EPS 성장의 65%가 Big Tech에서 · 반도체 25% 추가"', quoteEn:'"65% of S&P 500 EPS growth is expected from Big Tech · semis add another 25%"',
    source:'출처: The Kobeissi Letter · 2026.07.22',
    noteHead:'왜 중요한가: 지수 편중이 큰 만큼 소수 종목 실적 하나가 지수 방향 결정', noteSub:'앞으로 볼 것: GOOGL·NVDA·MSFT 등 개별 실적/가이던스와 지수 반응',
    footer:'MACRO · Big Tech 65% of SPX EPS', brand:BRAND_KO },
  en:{ title:'MACRO — 65% of S&P 500 EPS Growth Concentrated in Big Tech', heroIcon:'📊', heroBig:'65 %', heroSub:'Analyst consensus: 65% of Q1 2026 S&P 500 EPS growth from Big Tech · semis another 25%',
    cards:[{icon:'🏢',big:'65 %',mid:'Big Tech contribution',sub:'to S&P 500 EPS growth'},{icon:'🧠',big:'25 %',mid:'Semiconductors',sub:'#2 contributor'},{icon:'⚖️',big:'Concentration',mid:'Leadership top-heavy',sub:'few hyperscalers dominate'}],
    quoteLabel:'THE KOBEISSI LETTER', quoteKo:'"Big Tech가 EPS 성장 65% · 반도체 25%"', quoteEn:'"65% of S&P 500 EPS growth is expected from Big Tech · semis add another 25%"',
    source:'Source: The Kobeissi Letter · 2026.07.22',
    noteHead:'Why it matters: With such concentration, a single big-name print steers the index', noteSub:'Watch next: GOOGL/NVDA/MSFT prints & guides vs index reaction',
    footer:'MACRO · Big Tech 65% of SPX EPS', brand:BRAND_EN } },
];

let written = 0;
for (const t of T) {
  const koWith = { ...t.ko, symbol: t.symbol };
  const enWith = { ...t.en, symbol: t.symbol };
  fs.writeFileSync(path.join(OUT, `${t.file}-20260723.svg`),    tpl(koWith));
  fs.writeFileSync(path.join(OUT, `${t.file}-20260723-en.svg`), tpl(enWith));
  written += 2;
}
console.log(`✅ ${written} SVG 파일 생성 완료 (${T.length} topics × KO/EN)`);
