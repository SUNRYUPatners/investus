// 2026-07-17 리포트 SVG 생성기 — 7월 2일자 스타일 통일
// 실행: node scripts/gen-reports-20260717.js
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.07.17';

// 카테고리 팔레트
const P = {
  mint:   { fg:'#4ade80', fg2:'#22c55e', bg2:'#061209', card:'#0a1a0a' },
  blue:   { fg:'#60a5fa', fg2:'#3b82f6', bg2:'#06121f', card:'#0a1420' },
  red:    { fg:'#ef4444', fg2:'#dc2626', bg2:'#1a0808', card:'#1a0808' },
  purple: { fg:'#a78bfa', fg2:'#8b5cf6', bg2:'#140b1f', card:'#1a0f2a' },
  orange: { fg:'#fb923c', fg2:'#f97316', bg2:'#1a1408', card:'#1a1408' },
};

// XML escape — & 등 문자
function esc(s) {
  return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;').replace(/</g,'&lt;');
}
function E(o) { const r={}; for (const k in o) r[k]=typeof o[k]==='string'?esc(o[k]):o[k]; return r; }

// SVG 템플릿 — 7월 2일 스타일 (3-card + quote + note)
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
// TSLA robotaxi 175
{ file:'tsla-robotaxi-175-tx', color:'mint', badge:'TSLA',
  ko:{ title:'TSLA 로보택시 텍사스 175대', heroIcon:'🚕', heroBig:'175 · +58', heroSub:'텍사스 완전무감독 플릿 확대 · 연 수익 추정 $10.5M',
    cards:[{icon:'➕',big:'+58',mid:'신규 추가',sub:'TX Robotaxi'},{icon:'🚕',big:'175',mid:'총 플릿 규모',sub:'unsupervised est.'},{icon:'💰',big:'$10.5M',mid:'연 수익 추정',sub:'@ $60k/veh'}],
    quoteLabel:'FLEET COMPARISON (2026-07-16)', quoteKo:'"Waymo 642 · Avride 317 · Tesla 175 · Zoox 44"', quoteEn:'"Tesla Robotaxi fleet entering hockey-stick growth"',
    source:'Source: Cole Grinde / TXDMV · 2026.07.16',
    noteHead:'5월말~7/15 플릿 성장이 하키 스틱 구간 진입', noteSub:'후속 공식 발표·실적·규제 일정 추적 필요',
    footer:'TSLA Robotaxi Texas Fleet · 175 units', brand:BRAND_KO },
  en:{ title:'TSLA Robotaxi Texas Fleet Hits 175', heroIcon:'🚕', heroBig:'175 · +58', heroSub:'TX unsupervised fleet expansion · ~$10.5M ann. rev est.',
    cards:[{icon:'➕',big:'+58',mid:'Newly added',sub:'TX Robotaxi'},{icon:'🚕',big:'175',mid:'Total fleet',sub:'unsupervised est.'},{icon:'💰',big:'$10.5M',mid:'Ann. revenue',sub:'@ $60k/veh'}],
    quoteLabel:'FLEET COMPARISON (2026-07-16)', quoteKo:'"Waymo 642 · Avride 317 · Tesla 175 · Zoox 44"', quoteEn:'"Fleet growth accelerating into a hockey-stick phase"',
    source:'Source: Cole Grinde / TXDMV · 2026.07.16',
    noteHead:'Fleet growth May–Jul 15 entering hockey-stick', noteSub:'Track follow-on official updates & regulation',
    footer:'TSLA Robotaxi Texas Fleet · 175 units', brand:BRAND_EN } },

// QQQ volatility
{ file:'qqq-volatility-20-26', color:'blue', badge:'QQQ',
  ko:{ title:'나스닥100 — 26거래일 중 20일 ±1% 변동', heroIcon:'⚡', heroBig:'20 / 26', heroSub:'최근 26거래일 중 20일이 ±1% 이상 등락',
    cards:[{icon:'📊',big:'20 / 26',mid:'±1% 이상 등락일',sub:'최근 26일'},{icon:'🚨',big:'위기 수준',mid:'변동성 클러스터',sub:'버블·위기때만 관측'},{icon:'📉',big:'리스크',mid:'큰 날 빈도 자체가',sub:'방향 아닌 진폭'}],
    quoteLabel:'VOLATILITY REGIME', quoteKo:'"이 수준의 변동성은 주요 위기·버블 구간에만 관측된다"', quoteEn:'"Volatility cluster is rare outside crisis/bubble regimes"',
    source:'Source: Barchart / Bloomberg · 2026.07.16',
    noteHead:'방향성보다 큰 날 빈도 자체가 리스크 신호', noteSub:'포지션 사이즈 조절 · 헷지 검토 필요',
    footer:'QQQ · ±1% Cluster 20/26', brand:BRAND_KO },
  en:{ title:'Nasdaq 100 — ±1% Moves in 20 of 26 Days', heroIcon:'⚡', heroBig:'20 / 26', heroSub:'20 of last 26 sessions moved ≥1% either way',
    cards:[{icon:'📊',big:'20 / 26',mid:'≥1% sessions',sub:'last 26 days'},{icon:'🚨',big:'Crisis-tier',mid:'volatility cluster',sub:'rare outside crisis'},{icon:'📉',big:'Risk',mid:'Frequency of big days',sub:'not direction'}],
    quoteLabel:'VOLATILITY REGIME', quoteKo:'"큰 날 빈도 자체가 리스크 신호"', quoteEn:'"Frequency of big days itself is a risk signal"',
    source:'Source: Barchart / Bloomberg · 2026.07.16',
    noteHead:'Cluster typically appears in crisis/bubble regimes', noteSub:'Consider position sizing & hedging',
    footer:'QQQ · ±1% Cluster 20/26', brand:BRAND_EN } },

// TSLA FSD 12B miles
{ file:'tsla-fsd-12b-miles', color:'mint', badge:'TSLA',
  ko:{ title:'TSLA FSD — 글로벌 누적 120억 마일 임박', heroIcon:'🛣️', heroBig:'12 B mi', heroSub:'전 세계 FSD 누적 주행거리 120억 마일 돌파 임박',
    cards:[{icon:'🌍',big:'글로벌',mid:'전 세계 누적',sub:'12B mi 임박'},{icon:'🛡️',big:'안전 지표',mid:'tesla.com/fsd/safety',sub:'실도로 마일 근거'},{icon:'📡',big:'데이터 루프',mid:'학습 데이터 확대',sub:'모델 신뢰도 강화'}],
    quoteLabel:'MILESTONE NOTE', quoteKo:'"FSD 실도로 마일스톤은 소프트웨어 신뢰도·규제 대화의 핵심 근거"', quoteEn:'"Real-world FSD miles are core evidence for trust & regulation"',
    source:'Source: Whole Mars Catalog / Tesla · 2026.07.16',
    noteHead:'누적 마일 증가 = 학습·규제·보험 협상 근거', noteSub:'후속 안전 리포트·규제 대화 추적 필요',
    footer:'TSLA FSD · 12B Miles Approaching', brand:BRAND_KO },
  en:{ title:'TSLA FSD — Approaching 12 Billion Miles', heroIcon:'🛣️', heroBig:'12 B mi', heroSub:'Global FSD miles about to cross 12 billion',
    cards:[{icon:'🌍',big:'Global',mid:'Worldwide cumulative',sub:'12B mi soon'},{icon:'🛡️',big:'Safety page',mid:'tesla.com/fsd/safety',sub:'evidence base'},{icon:'📡',big:'Data loop',mid:'Training data scale',sub:'model reliability'}],
    quoteLabel:'MILESTONE NOTE', quoteKo:'"실도로 마일이 신뢰·규제 논의의 핵심 근거"', quoteEn:'"Real-world FSD miles anchor trust & regulation talks"',
    source:'Source: Whole Mars Catalog / Tesla · 2026.07.16',
    noteHead:'Miles compound safety, regulation, insurance leverage', noteSub:'Track upcoming safety reports & regulator dialogue',
    footer:'TSLA FSD · 12B Miles Approaching', brand:BRAND_EN } },

// Kalshi TSLA SPCX merge
{ file:'kalshi-tsla-spcx-merge', color:'mint', badge:'TSLA·SPCX',
  ko:{ title:'Kalshi — TSLA·SPCX 2028 전 합병 확률 69%', heroIcon:'🤝', heroBig:'69 %', heroSub:'Tesla와 SpaceX가 2028년 이전 합병할 예측시장 확률',
    cards:[{icon:'📈',big:'69%',mid:'Kalshi 확률',sub:'Merger by 2028'},{icon:'📆',big:'2028 前',mid:'예측 기한',sub:'Deadline anchor'},{icon:'🎯',big:'시나리오',mid:'공식 발표 전 앵커',sub:'≠ 확정 딜'}],
    quoteLabel:'PREDICTION MARKET', quoteKo:'"예측시장 확률은 확정 딜이 아니다 — 시나리오 앵커"', quoteEn:'"Odds ≠ a done deal — scenario anchor until official news"',
    source:'Source: Kalshi / TheSonOfWalkley · 2026.07.16',
    noteHead:'합병 내러티브는 TSLA·SPCX 밸류에이션 연동 리스크 확대', noteSub:'실제 발표·규제·이해상충 이슈 순차 확인 필요',
    footer:'Kalshi · TSLA/SPCX Merge Odds 69%', brand:BRAND_KO },
  en:{ title:'Kalshi — 69% Odds TSLA/SPCX Merge by 2028', heroIcon:'🤝', heroBig:'69 %', heroSub:'Prediction market odds Tesla merges with SpaceX before 2028',
    cards:[{icon:'📈',big:'69%',mid:'Kalshi probability',sub:'Merger by 2028'},{icon:'📆',big:'Pre-2028',mid:'Contract deadline',sub:'Time anchor'},{icon:'🎯',big:'Scenario',mid:'Anchor before news',sub:'≠ done deal'}],
    quoteLabel:'PREDICTION MARKET', quoteKo:'"확률은 확정 딜이 아니다"', quoteEn:'"Odds are not a done deal — scenario anchor"',
    source:'Source: Kalshi / TheSonOfWalkley · 2026.07.16',
    noteHead:'Merger narrative links TSLA/SPCX valuation risk', noteSub:'Watch actual filings, regulators, conflict-of-interest',
    footer:'Kalshi · TSLA/SPCX Merge Odds 69%', brand:BRAND_EN } },

// NVDA Japan AI factory
{ file:'nvda-japan-ai-factory', color:'blue', badge:'NVDA',
  ko:{ title:'일본 국가 AI 팩토리 — NVDA Rubin 27,500장', heroIcon:'🏭', heroBig:'27,500', heroSub:'세계 최초 국가 단위 AI 팩토리 · Nvidia 파트너십',
    cards:[{icon:'🧠',big:'13,750',mid:'Vera CPU',sub:'units'},{icon:'⚙️',big:'27,500',mid:'Rubin GPU',sub:'units'},{icon:'⚡',big:'140 MW',mid:'데이터센터 전력',sub:'sovereign build'}],
    quoteLabel:'SOVEREIGN AI BUILD', quoteKo:'"국가 주도 AI 인프라 발주 — NVDA 수요 가시성 강화"', quoteEn:'"Sovereign AI buildout strengthens NVDA demand visibility"',
    source:'Source: Bloomberg / unusual_whales · 2026.07.16',
    noteHead:'로봇용 AI 구축 목적도 함께 언급됨', noteSub:'유럽·중동 sovereign AI 발주 확산 여부 관찰',
    footer:'JP National AI Factory · 27,500 Rubin', brand:BRAND_KO },
  en:{ title:'Japan National AI Factory — 27,500 NVDA Rubin', heroIcon:'🏭', heroBig:'27,500', heroSub:"World's first national AI factory · Nvidia partnership",
    cards:[{icon:'🧠',big:'13,750',mid:'Vera CPU',sub:'units'},{icon:'⚙️',big:'27,500',mid:'Rubin GPU',sub:'units'},{icon:'⚡',big:'140 MW',mid:'Datacenter power',sub:'sovereign build'}],
    quoteLabel:'SOVEREIGN AI BUILD', quoteKo:'"NVDA 수요 가시성 강화"', quoteEn:'"Sovereign AI buildout strengthens NVDA demand visibility"',
    source:'Source: Bloomberg / unusual_whales · 2026.07.16',
    noteHead:'Also framed as an AI buildout for robotics', noteSub:'Watch EU/ME follow-on sovereign AI programs',
    footer:'JP National AI Factory · 27,500 Rubin', brand:BRAND_EN } },

// TSMC Q2 beat
{ file:'tsm-q2-beat-2026', color:'blue', badge:'TSM',
  ko:{ title:'TSMC Q2 서프라이즈 — 마진·가이던스 강세', heroIcon:'💎', heroBig:'+33.7 %', heroSub:'매출 YoY 비트 · EPS +77.4% · 2026 매출 +40% 전망',
    cards:[{icon:'📊',big:'60.3 %',mid:'Operating Margin',sub:'영업이익률'},{icon:'💰',big:'67.7 %',mid:'Gross Margin',sub:'총이익률'},{icon:'💵',big:'$419',mid:'Price · 1Y +77%',sub:'주가 상승률'}],
    quoteLabel:'GUIDANCE', quoteKo:'"2026년 매출 YoY +40% 성장 기대"', quoteEn:'"We expect to grow revenue by +40% YoY in 2026"',
    source:'Source: TSMC / Blossom · 2026.07.16',
    noteHead:'AI 인프라 통행세(toll road) 내러티브 강화', noteSub:'HBM·CoWoS·N2 램프업 진행률이 후속 촉매',
    footer:'TSMC Q2 Beat · +40% FY26 Guide', brand:BRAND_KO },
  en:{ title:'TSMC Q2 Beat — Margins & Guidance Strong', heroIcon:'💎', heroBig:'+33.7 %', heroSub:'Revenue beat YoY · EPS +77.4% · +40% rev growth guided for 2026',
    cards:[{icon:'📊',big:'60.3 %',mid:'Operating Margin',sub:'Op. profitability'},{icon:'💰',big:'67.7 %',mid:'Gross Margin',sub:'Blended GM'},{icon:'💵',big:'$419',mid:'Price · 1Y +77%',sub:'Stock return'}],
    quoteLabel:'GUIDANCE', quoteKo:'"2026 매출 +40% 전망"', quoteEn:'"We expect to grow revenue by +40% YoY in 2026"',
    source:'Source: TSMC / Blossom · 2026.07.16',
    noteHead:'Reinforces AI infrastructure toll-road narrative', noteSub:'Watch HBM/CoWoS/N2 ramp as next catalysts',
    footer:'TSMC Q2 Beat · +40% FY26 Guide', brand:BRAND_EN } },

// TSMC Arizona 100B
{ file:'tsm-arizona-100b', color:'blue', badge:'TSM',
  ko:{ title:'TSMC 애리조나 — 추가 $100B · 미국 투자 $265B', heroIcon:'🇺🇸', heroBig:'$265 B', heroSub:'미국 칩 공장 총 투자 계획 · 애리조나에 $100B 추가',
    cards:[{icon:'➕',big:'+$100B',mid:'애리조나 추가',sub:'AZ add-on'},{icon:'🏭',big:'$265B',mid:'미국 합계',sub:'US total plan'},{icon:'🛡️',big:'헤지',mid:'지정학 리스크',sub:'onshore capacity'}],
    quoteLabel:'CAPEX PLAN', quoteKo:'"미국 내 첨단 파운드리 캐파 확대 — 지정학 리스크 헤지"', quoteEn:'"Expands US advanced foundry capacity — geopolitics hedge"',
    source:'Source: StockMKTNewz / TSMC · 2026.07.16',
    noteHead:'대규모 캐파 투자로 중장기 감가비·가동률 리스크 동반', noteSub:'미국·대만 마진 스프레드·인력 확보 진행률 관찰',
    footer:'TSMC AZ · +$100B → $265B US', brand:BRAND_KO },
  en:{ title:'TSMC Arizona — Extra $100B · $265B US Total', heroIcon:'🇺🇸', heroBig:'$265 B', heroSub:'Total US chip plant plan · +$100B for Arizona',
    cards:[{icon:'➕',big:'+$100B',mid:'Arizona add-on',sub:'AZ commitment'},{icon:'🏭',big:'$265B',mid:'US total',sub:'Capex plan'},{icon:'🛡️',big:'Hedge',mid:'Geopolitics',sub:'onshore capacity'}],
    quoteLabel:'CAPEX PLAN', quoteKo:'"온쇼어 캐파 확대 — 지정학 헤지"', quoteEn:'"US advanced foundry capacity — geopolitics hedge"',
    source:'Source: StockMKTNewz / TSMC · 2026.07.16',
    noteHead:'Huge capex also brings depreciation & utilization risk', noteSub:'Watch US/TW margin spread & workforce ramp',
    footer:'TSMC AZ · +$100B → $265B US', brand:BRAND_EN } },

// Tesla Semi Tour
{ file:'tsla-semi-tour-jul', color:'mint', badge:'TSLA',
  ko:{ title:'Tesla Semi On Tour — 7월 시카고·버지니아', heroIcon:'🚛', heroBig:'SEMI', heroSub:'양산 스펙 2026 Semi 투어 공개',
    cards:[{icon:'📍',big:'시카고',mid:'7월 투어',sub:'ACT Expo 라인'},{icon:'📍',big:'버지니아',mid:'7월 투어',sub:'East-coast 시연'},{icon:'🚛',big:'양산 스펙',mid:'2026 Semi',sub:'상용 트럭 진입'}],
    quoteLabel:'SEMI TOUR NOTE', quoteKo:'"상용 트럭 시장 진입의 가시적 마일스톤"', quoteEn:'"Visible milestone for commercial truck market entry"',
    source:'Source: Sawyer Merritt · 2026.07.16',
    noteHead:'주문·인도 데이터로 확인 필요 — 투어는 사전 노출', noteSub:'네바다 팩토리 양산 진행률·플릿 계약이 후속 트리거',
    footer:'TSLA Semi · Chicago & Virginia', brand:BRAND_KO },
  en:{ title:'Tesla Semi On Tour — July Chicago & Virginia', heroIcon:'🚛', heroBig:'SEMI', heroSub:'Production-spec 2026 Semi on tour',
    cards:[{icon:'📍',big:'Chicago',mid:'July tour',sub:'Midwest demo'},{icon:'📍',big:'Virginia',mid:'July tour',sub:'East-coast demo'},{icon:'🚛',big:'Prod spec',mid:'2026 Semi',sub:'commercial entry'}],
    quoteLabel:'SEMI TOUR NOTE', quoteKo:'"상용 트럭 시장 진입의 마일스톤"', quoteEn:'"Visible milestone for commercial trucks — confirm via orders/deliveries"',
    source:'Source: Sawyer Merritt · 2026.07.16',
    noteHead:'Tour is exposure — orders/deliveries are the confirm', noteSub:'Watch Nevada ramp & fleet contracts',
    footer:'TSLA Semi · Chicago & Virginia', brand:BRAND_EN } },

// Jensen AI cycle
{ file:'nvda-jensen-ai-cycle', color:'blue', badge:'NVDA',
  ko:{ title:'젠슨 황 — "AI 사이클은 이제 시작"', heroIcon:'🚀', heroBig:'10–15 Y', heroSub:'기술 사이클은 보통 10~15년 지속된 뒤 정체 · AI는 시작 단계',
    cards:[{icon:'📈',big:'초기',mid:'AI 사이클 단계',sub:'Just beginning'},{icon:'⏳',big:'10–15Y',mid:'통상 사이클 지속',sub:'plateau 이전'},{icon:'🏭',big:'인프라',mid:'구축 초기',sub:'GPU · DC · 전력'}],
    quoteLabel:'JENSEN HUANG · NVIDIA', quoteKo:'"기술 사이클은 보통 10~15년 지속된 뒤 정체한다. AI 사이클은 이제 시작이다"', quoteEn:'"Tech cycles typically last 10–15 years before plateauing. The AI cycle is just beginning."',
    source:'Source: Burry Tracker / NVIDIA · 2026.07.16',
    noteHead:'CEO 코멘터리 — 밸류에이션 프리미엄 정당화 프레임', noteSub:'단기 지표(수요·재고·CAPEX)로 사이클 위치 재검증 필요',
    footer:'NVDA · Jensen AI Cycle Just Beginning', brand:BRAND_KO },
  en:{ title:'Jensen Huang — "AI Cycle Is Just Beginning"', heroIcon:'🚀', heroBig:'10–15 Y', heroSub:'Tech cycles last 10–15 years before plateauing · AI just starting',
    cards:[{icon:'📈',big:'Early',mid:'AI cycle stage',sub:'Just beginning'},{icon:'⏳',big:'10–15Y',mid:'Typical cycle len',sub:'before plateau'},{icon:'🏭',big:'Infra',mid:'Early buildout',sub:'GPU · DC · power'}],
    quoteLabel:'JENSEN HUANG · NVIDIA', quoteKo:'"AI 사이클은 이제 시작"', quoteEn:'"Tech cycles typically last 10–15 years before plateauing. The AI cycle is just beginning."',
    source:'Source: Burry Tracker / NVIDIA · 2026.07.16',
    noteHead:'CEO framing supports premium valuation narrative', noteSub:'Re-verify via demand, inventory, capex signals',
    footer:'NVDA · Jensen AI Cycle Just Beginning', brand:BRAND_EN } },

// SOX correction
{ file:'sox-correction-16', color:'red', badge:'SOX',
  ko:{ title:'반도체 SOX — ATH 대비 -16% 조정', heroIcon:'📉', heroBig:'-16 %', heroSub:'ATH 14,655 → 현재 12,331 · 기술적 조정 구간',
    cards:[{icon:'🏔️',big:'14,655',mid:'ATH (전고점)',sub:'All-time high'},{icon:'📍',big:'12,331',mid:'현재 지수',sub:'Current level'},{icon:'⚠️',big:'-16%',mid:'ATH 대비 하락',sub:'bear zone 근접'}],
    quoteLabel:'INDEX-LEVEL RISK', quoteKo:'"AI 반도체 강세 속에서도 지수 레벨 리스크 관리 필요"', quoteEn:'"Even in AI boom, index-level risk management matters"',
    source:'Source: Barchart · 2026.07.15–16',
    noteHead:'기술적 조정 구간 · 베어마켓 경계선(-20%) 근접', noteSub:'개별 종목 강세 vs 지수 약세 — 상관관계 재확인 필요',
    footer:'SOX · -16% From ATH', brand:BRAND_KO },
  en:{ title:'SOX Semis — -16% From ATH', heroIcon:'📉', heroBig:'-16 %', heroSub:'ATH 14,655 → Now 12,331 · Technical correction',
    cards:[{icon:'🏔️',big:'14,655',mid:'ATH',sub:'All-time high'},{icon:'📍',big:'12,331',mid:'Current level',sub:'Now'},{icon:'⚠️',big:'-16%',mid:'From ATH',sub:'near bear zone'}],
    quoteLabel:'INDEX-LEVEL RISK', quoteKo:'"지수 레벨 리스크 관리 필요"', quoteEn:'"Even in AI boom, index-level risk management matters"',
    source:'Source: Barchart · 2026.07.15–16',
    noteHead:'Technical correction · nearing -20% bear threshold', noteSub:'Reconcile single-name strength vs index weakness',
    footer:'SOX · -16% From ATH', brand:BRAND_EN } },

// SPCX AI1 power upgrade
{ file:'spcx-ai1-power-upgrade', color:'purple', badge:'SPCX',
  ko:{ title:'SPCX AI1 위성 — 피크전력 ~250 kW로 상향', heroIcon:'🛰️', heroBig:'~250 kW', heroSub:'AI1 위성 피크전력 150 → ~250 kW (+67%)',
    cards:[{icon:'⚡',big:'150 kW',mid:'기존 Peak',sub:'Prior spec'},{icon:'⚡',big:'~250 kW',mid:'상향 Peak',sub:'New spec (+67%)'},{icon:'🖥️',big:'Rubin',mid:'지상 랙 스펙 근접',sub:'230/190 kW rack'}],
    quoteLabel:'ELON MUSK / SPCX', quoteKo:'"24h 추론 시 GPU 평균 전력은 피크의 약 2/3"', quoteEn:'"24h inference avg GPU power is ~2/3 of peak"',
    source:'Source: Nic Cruz Patane / Elon Musk · 2026.07.16',
    noteHead:'지상 Rubin 랙(230/190 kW · $5–9M) 스펙을 넘보는 위성 컴퓨트', noteSub:'궤도상 열/전력 관리·발사 캐던스가 후속 관찰 포인트',
    footer:'SPCX AI1 · Peak ~250 kW', brand:BRAND_KO },
  en:{ title:'SPCX AI1 Satellites — Peak Power ~250 kW', heroIcon:'🛰️', heroBig:'~250 kW', heroSub:'AI1 satellite peak lifted 150 → ~250 kW (+67%)',
    cards:[{icon:'⚡',big:'150 kW',mid:'Prior peak',sub:'Legacy spec'},{icon:'⚡',big:'~250 kW',mid:'New peak',sub:'+67% uplift'},{icon:'🖥️',big:'Rubin',mid:'Terrestrial rack',sub:'230/190 kW rack'}],
    quoteLabel:'ELON MUSK / SPCX', quoteKo:'"24h 추론 평균 GPU 전력은 피크의 ~2/3"', quoteEn:'"24h inference avg GPU power ~2/3 of peak"',
    source:'Source: Nic Cruz Patane / Elon Musk · 2026.07.16',
    noteHead:'Sat compute nearing terrestrial Rubin racks ($5–9M)', noteSub:'Watch thermal/power on-orbit & launch cadence',
    footer:'SPCX AI1 · Peak ~250 kW', brand:BRAND_EN } },

// AAPL China AI
{ file:'aapl-china-ai-ms', color:'red', badge:'AAPL',
  ko:{ title:'모건스탠리 — 중국 Apple Intelligence 승인 촉매', heroIcon:'🍎', heroBig:'CHINA AI', heroSub:'중국 Apple Intelligence 승인을 핵심 AI 촉매로 평가',
    cards:[{icon:'🏦',big:'MS',mid:'Morgan Stanley',sub:'분석 기관'},{icon:'🇨🇳',big:'승인',mid:'중국 Apple Intel.',sub:'AI 촉매'},{icon:'📱',big:'업그레이드',mid:'아이폰 교체 사이클',sub:'수혜 예상'}],
    quoteLabel:'MS RESEARCH', quoteKo:'"중국 Apple Intelligence 승인은 핵심 AI 촉매"', quoteEn:'"China Apple Intelligence approval is a key AI catalyst"',
    source:'Source: Investing.com / Morgan Stanley · 2026.07.16',
    noteHead:'중국 아이폰 AI 기능 해제는 업그레이드 사이클 자극 가능', noteSub:'실제 출시 범위·일정 확인돼야 주가에 온전히 반영',
    footer:'AAPL · China AI · MS Catalyst', brand:BRAND_KO },
  en:{ title:'Morgan Stanley — China Apple Intelligence Catalyst', heroIcon:'🍎', heroBig:'CHINA AI', heroSub:'Sees China AI approval as key catalyst for Apple',
    cards:[{icon:'🏦',big:'MS',mid:'Morgan Stanley',sub:'Analyst'},{icon:'🇨🇳',big:'Approval',mid:'China Apple Intel.',sub:'AI catalyst'},{icon:'📱',big:'Upgrade',mid:'iPhone cycle',sub:'expected lift'}],
    quoteLabel:'MS RESEARCH', quoteKo:'"중국 AI 승인은 핵심 촉매"', quoteEn:'"China Apple Intelligence approval is a key AI catalyst"',
    source:'Source: Investing.com / Morgan Stanley · 2026.07.16',
    noteHead:'Unlocking iPhone AI in China can spur upgrade cycles', noteSub:'Full pricing needs confirmed feature scope & timing',
    footer:'AAPL · China AI · MS Catalyst', brand:BRAND_EN } },

// UBER Delivery Hero
{ file:'uber-delivery-hero', color:'orange', badge:'UBER',
  ko:{ title:'Uber — Delivery Hero 주당 €41.50 인수 제안', heroIcon:'🍔', heroBig:'€41.50', heroSub:'Delivery Hero 인수 제안 · 글로벌 99개 시장 확장',
    cards:[{icon:'💶',big:'€41.50',mid:'주당 제안가',sub:'per share offer'},{icon:'🌍',big:'99',mid:'글로벌 시장',sub:'combined footprint'},{icon:'🤝',big:'제안',mid:'Offer 단계',sub:'not closed yet'}],
    quoteLabel:'DEAL NOTE', quoteKo:'"성사 여부·규제·시너지 실현이 관건 — 제안 단계"', quoteEn:'"Still an offer — closing, regulators, synergies matter"',
    source:'Source: Blossom / Uber · 2026.07.16',
    noteHead:'발표 전후 UBER 주가 변동성 확대 가능', noteSub:'유럽 반독점·주요주주 승낙률·주식 대금 여부 확인',
    footer:'UBER · Delivery Hero €41.50 Offer', brand:BRAND_KO },
  en:{ title:'Uber — €41.50/Share Offer for Delivery Hero', heroIcon:'🍔', heroBig:'€41.50', heroSub:'Offer for Delivery Hero · expand to 99 markets',
    cards:[{icon:'💶',big:'€41.50',mid:'per share offer',sub:'stated price'},{icon:'🌍',big:'99',mid:'Global markets',sub:'combined reach'},{icon:'🤝',big:'Offer',mid:'Not closed',sub:'proposal stage'}],
    quoteLabel:'DEAL NOTE', quoteKo:'"제안 단계 — 성사·규제·시너지가 관건"', quoteEn:'"Still an offer — closing, regulators, synergies matter"',
    source:'Source: Blossom / Uber · 2026.07.16',
    noteHead:'UBER volatility likely to rise around deal news', noteSub:'Watch EU antitrust, holder acceptance, mix of cash/stock',
    footer:'UBER · Delivery Hero €41.50 Offer', brand:BRAND_EN } },

// ARK AI CAPEX
{ file:'ark-ai-capex-bubble', color:'orange', badge:'ARK',
  ko:{ title:'ARK — AI CAPEX가 2000년 버블 고점 돌파', heroIcon:'💸', heroBig:'>$700 B', heroSub:'빅4 하이퍼스케일러 2026 CAPEX · 2030 AI 시스템 시장 ~$1.5T',
    cards:[{icon:'📊',big:'2000',mid:'버블 고점 상회',sub:'GDP 대비 비중'},{icon:'💰',big:'>$700B',mid:'2026 CAPEX',sub:'빅4 하이퍼스케일러'},{icon:'🌐',big:'$1.5 T',mid:'2030 시장',sub:'AI systems TAM'}],
    quoteLabel:'ARK CAPEX NOTE', quoteKo:'"현재 NVDA 시장 장악 · AMD Helios가 OpenAI·Meta·Oracle 관심으로 도전"', quoteEn:'"NVDA dominates; AMD Helios challenges w/ OpenAI/Meta/Oracle interest"',
    source:'Source: ARK Invest Tracker · 2026.07.16',
    noteHead:'GDP 대비 기술 CAPEX 비중이 닷컴 버블 때보다 높다는 주장', noteSub:'하이퍼스케일러 자본지출 감소 신호가 리버설 트리거',
    footer:'ARK · AI CAPEX &gt; 2000 Bubble', brand:BRAND_KO },
  en:{ title:'ARK — AI CAPEX Passed 2000 Bubble Peak', heroIcon:'💸', heroBig:'>$700 B', heroSub:'Big-4 hyperscaler 2026 CAPEX · AI systems ~$1.5T by 2030',
    cards:[{icon:'📊',big:'2000',mid:'Above bubble peak',sub:'as % of GDP'},{icon:'💰',big:'>$700B',mid:'2026 CAPEX',sub:'Big-4 hyperscalers'},{icon:'🌐',big:'$1.5 T',mid:'2030 market',sub:'AI systems TAM'}],
    quoteLabel:'ARK CAPEX NOTE', quoteKo:'"NVDA 지배 · AMD Helios가 도전"', quoteEn:'"NVDA dominates; AMD Helios challenges with OpenAI/Meta/Oracle interest"',
    source:'Source: ARK Invest Tracker · 2026.07.16',
    noteHead:'Tech capex/GDP said higher than dot-com bubble era', noteSub:'Hyperscaler capex cuts would be a key reversal trigger',
    footer:'ARK · AI CAPEX &gt; 2000 Bubble', brand:BRAND_EN } },

// NVDA Jetson Thor
{ file:'nvda-jetson-thor', color:'blue', badge:'NVDA',
  ko:{ title:'NVDA Jetson Thor — T2000·T3000 모듈 공개', heroIcon:'🤖', heroBig:'THOR', heroSub:'Blackwell 기반 로보틱스·엣지 AI 양산 모듈',
    cards:[{icon:'🔧',big:'T2000',mid:'엣지 AI 모듈',sub:'Blackwell arch'},{icon:'🔧',big:'T3000',mid:'상위 모듈',sub:'higher perf tier'},{icon:'🤖',big:'로보틱스',mid:'메인스트림 이전',sub:'compact & efficient'}],
    quoteLabel:'NVIDIA NEWSROOM', quoteKo:'"메인스트림 로보틱스·엣지 AI를 소형·고효율 시스템으로 이전"', quoteEn:'"Move advanced robotics & edge AI onto compact, efficient systems"',
    source:'Source: NVIDIA Newsroom · 2026.07.16',
    noteHead:'로보틱스 확산은 NVDA 데이터센터 외 성장 축', noteSub:'파트너 로봇·자율모빌리티 채택 사례가 후속 확인 포인트',
    footer:'NVDA · Jetson Thor T2000/T3000', brand:BRAND_KO },
  en:{ title:'NVDA Jetson Thor — T2000 & T3000 Modules', heroIcon:'🤖', heroBig:'THOR', heroSub:'Blackwell modules for mass-market robotics & edge AI',
    cards:[{icon:'🔧',big:'T2000',mid:'Edge AI module',sub:'Blackwell arch'},{icon:'🔧',big:'T3000',mid:'Higher tier',sub:'more compute'},{icon:'🤖',big:'Robotics',mid:'Mainstream shift',sub:'compact & efficient'}],
    quoteLabel:'NVIDIA NEWSROOM', quoteKo:'"메인스트림 로보틱스·엣지 AI 이전"', quoteEn:'"Move advanced robotics & edge AI onto compact, efficient systems"',
    source:'Source: NVIDIA Newsroom · 2026.07.16',
    noteHead:'Robotics is a growth axis beyond datacenter', noteSub:'Watch partner robot & autonomous mobility adoption',
    footer:'NVDA · Jetson Thor T2000/T3000', brand:BRAND_EN } },
];

let written = 0;
for (const t of T) {
  fs.writeFileSync(path.join(OUT, `${t.file}-20260717.svg`),    tpl(t.ko));
  fs.writeFileSync(path.join(OUT, `${t.file}-20260717-en.svg`), tpl(t.en));
  written += 2;
}
console.log(`✅ ${written} SVG 파일 생성 완료 (${T.length} topics × KO/EN)`);
