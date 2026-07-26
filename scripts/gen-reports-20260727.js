// 2026-07-27 리포트 SVG 생성기 · 19 topics
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.07.24';

const PSYM = {
  TSLA: { fg:'#4ade80', fg2:'#22c55e', bg2:'#061209', card:'#0a1a0a' },
  NVDA: { fg:'#60a5fa', fg2:'#3b82f6', bg2:'#06121f', card:'#0a1420' },
  SPCX: { fg:'#c084fc', fg2:'#a78bfa', bg2:'#140b1f', card:'#1a0f2a' },
  GOOGL:{ fg:'#4285f4', fg2:'#34a853', bg2:'#06121f', card:'#0a1420' },
  MSFT: { fg:'#00a4ef', fg2:'#0078d4', bg2:'#061219', card:'#0a1520' },
  INTC: { fg:'#0071c5', fg2:'#00558a', bg2:'#06121f', card:'#0a1420' },
  AMD:  { fg:"#ed1c24", fg2:"#c00000", bg2:"#1a0606", card:"#200a0a" },
  LMT:  { fg:"#facc15", fg2:"#eab308", bg2:"#1a1408", card:"#1e1a0a" },
  PARA: { fg:"#f97316", fg2:"#ea580c", bg2:"#1a0f06", card:"#1e1408" },
  VZ:   { fg:"#ef4444", fg2:"#dc2626", bg2:"#1a0808", card:"#1e0a0a" },
  AAPL: { fg:"#a1a1aa", fg2:"#71717a", bg2:"#0f0f10", card:"#141416" },
  AVGO: { fg:"#c62828", fg2:"#8f1d20", bg2:"#180505", card:"#1e0808" },
  BRK:  { fg:"#0891b2", fg2:"#0e7490", bg2:"#061219", card:"#0a1520" },
  SSNLF:{ fg:"#1f4e9d", fg2:"#163d7c", bg2:"#050c19", card:"#0a1420" },
  MACRO:{ fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
  SPX:  { fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
};

function esc(s){return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g,'&amp;').replace(/</g,'&lt;');}
function E(o){const r={};for(const k in o)r[k]=typeof o[k]==='string'?esc(o[k]):o[k];return r;}
function pickTitleFont(len){if(len<=30)return 30;if(len<=40)return 26;if(len<=52)return 22;return 20;}

function tpl(oRaw){
  const o=E(oRaw);
  const p=PSYM[oRaw.symbol]||PSYM.MACRO;
  const badge=o.badge||o.symbol;
  const titleFont=pickTitleFont(oRaw.title.length);
  if(oRaw.title.length>40)console.warn(`⚠️ 긴 제목(${oRaw.title.length}자): ${oRaw.title}`);
  const cards=oRaw.cards.map((cRaw,i)=>{
    const c=E(cRaw);const x=[60,390,720][i];
    return`
  <rect x="${x}" y="402" width="300" height="190" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
  <text x="${x+150}" y="452" font-family="Arial" font-size="40" text-anchor="middle">${c.icon}</text>
  <text x="${x+150}" y="502" font-family="Arial Black,Arial" font-size="26" font-weight="900" fill="${p.fg}" text-anchor="middle">${c.big}</text>
  <text x="${x+150}" y="536" font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle">${c.mid}</text>
  <text x="${x+150}" y="566" font-family="Arial" font-size="18" fill="#6b7280" text-anchor="middle">${c.sub}</text>`;
  }).join('');
  return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
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

const BK='INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE';
const BE='INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE';

const T=[
// 1. TSLA Q2 이후 최대 손실 · $313.03
{file:'tsla-q2-largest-loss-31303',symbol:'TSLA',
 ko:{title:'TSLA — Q2 실적 이후 사상 최대 규모 손실 · $313.03',heroIcon:'📉',heroBig:'$313.03',heroSub:'Roland Pircher 정리 · Tesla가 Q2 실적 발표 이후 사상 최대 규모의 하락 이벤트 · EPS/주가 반응 chart 공유',
  cards:[{icon:'📉',big:'$313.03',mid:'현재 주가',sub:'실적 후 지속 하락'},{icon:'📊',big:'Q2 반응',mid:'실적/주가 chart',sub:'EPS 미스 후폭풍'},{icon:'📅',big:'분기 최대',mid:'anomaly 이후 최대',sub:'다운그레이드 wave 여파'}],
  quoteLabel:'ROLAND PIRCHER',quoteKo:'"이번 분기 TSLA가 실적 발표 이후 사상 최대 규모의 손실을 겪고 있다"',quoteEn:'"This quarter, TSLA saw its largest loss following an earnings anomaly"',
  source:'출처: Roland Pircher · 2026.07.26',
  noteHead:'왜 중요한가: -14% 낙폭 이후 반등 실패·다운그레이드 wave 지속 여파',noteSub:'앞으로 볼 것: $300 지지·Q3 마진 방향·기관 flow 반응',footer:'TSLA · Q2 largest loss',brand:BK},
 en:{title:'TSLA — Largest Post-Earnings Loss on Record · $313.03',heroIcon:'📉',heroBig:'$313.03',heroSub:'Per Roland Pircher · Tesla in its biggest post-earnings drawdown ever · EPS/stock-reaction chart shared',
  cards:[{icon:'📉',big:'$313.03',mid:'Current price',sub:'continued post-print drop'},{icon:'📊',big:'Q2 reaction',mid:'EPS/stock chart',sub:'aftermath of EPS miss'},{icon:'📅',big:'Quarter max',mid:'Largest since anomaly',sub:'downgrade wave echo'}],
  quoteLabel:'ROLAND PIRCHER',quoteKo:'"이번 분기 TSLA 사상 최대 규모 손실"',quoteEn:'"This quarter, TSLA saw its largest loss following an earnings anomaly"',
  source:'Source: Roland Pircher · 2026.07.26',
  noteHead:'Why: Failed rebound after -14% drop · downgrade wave lingering',noteSub:'Watch: $300 support · Q3 margin direction · institutional flow response',footer:'TSLA · Q2 largest loss',brand:BE}},

// 2. TSLA 2026.26 Summer Update · Traction Control
{file:'tsla-2026-26-summer-update',symbol:'TSLA',
 ko:{title:'TSLA — 2026.26 Summer Update · Traction Control 3모드 (1% 배포)',heroIcon:'☀️',heroBig:'2026.26',heroSub:'Model 3/Y용 신규 Traction Control 모드 3종 · Auto·Slippery Surface·Stuck Assist · 1% 함대에 첫 배포',
  cards:[{icon:'⚙️',big:'Auto',mid:'일반 주행',sub:'매 주행 시작 시 리셋'},{icon:'🌧️',big:'Slippery Surface',mid:'빙판·젖은 노면',sub:'악천후 대응'},{icon:'🏔️',big:'Stuck Assist',mid:'눈·진흙·모래',sub:'탈출 지원'}],
  quoteLabel:'THE TESLA NEWSWIRE',quoteKo:'"2026.26 Summer Update가 함대 첫 1%에 배포 시작"',quoteEn:'"2026.26 Summer Update now rolling out to first 1% of the fleet"',
  source:'출처: The Tesla Newswire · 2026.07.26',
  noteHead:'왜 중요한가: Model 3/Y 신규 UX · 겨울·오프로드 커버리지 개선',noteSub:'앞으로 볼 것: batch 확대·다른 국가별 규제 승인·Cybertruck 반영',footer:'TSLA · Summer Update 2026.26',brand:BK},
 en:{title:'TSLA — 2026.26 Summer Update · 3 Traction Control Modes (1% Fleet)',heroIcon:'☀️',heroBig:'2026.26',heroSub:'New Traction Control modes for Model 3/Y — Auto, Slippery Surface, Stuck Assist · rolling out to first 1% of fleet',
  cards:[{icon:'⚙️',big:'Auto',mid:'Normal driving',sub:'resets each drive'},{icon:'🌧️',big:'Slippery',mid:'Ice / wet',sub:'bad weather'},{icon:'🏔️',big:'Stuck Assist',mid:'Snow / mud / sand',sub:'get-unstuck aid'}],
  quoteLabel:'THE TESLA NEWSWIRE',quoteKo:'"2026.26 Summer Update가 첫 1%에 배포"',quoteEn:'"2026.26 Summer Update now rolling out to first 1% of the fleet"',
  source:'Source: The Tesla Newswire · 2026.07.26',
  noteHead:'Why: Model 3/Y new UX · improves winter/off-road coverage',noteSub:'Watch: batch expansion · country regulatory approvals · Cybertruck inclusion',footer:'TSLA · Summer Update 2026.26',brand:BE}},

// 3. Musk — Model X 오픈소스 계획
{file:'tsla-musk-model-x-opensource',symbol:'TSLA',
 ko:{title:'Musk — Model X 디자인·소프트웨어 오픈소스 계획',heroIcon:'🔓',heroBig:'OPEN SOURCE',heroSub:'"원조 Roadster를 오픈소스한 것처럼 Model X도 같은 방식으로 공개할 계획"',
  cards:[{icon:'🔓',big:'Model X',mid:'디자인·SW 오픈소스',sub:'원조 Roadster 선례'},{icon:'📜',big:'Musk 예고',mid:'구체 시점 미상',sub:'계획 단계'},{icon:'♻️',big:'커뮤니티',mid:'복원·리메이크 활성화',sub:'브랜드 자산 확대'}],
  quoteLabel:'ELON MUSK',quoteKo:'"원조 Roadster 디자인·SW를 오픈소스한 것처럼 Model X도 그렇게 할 계획"',quoteEn:'"Just as Tesla open-sourced the original Roadster design & software, we plan to do the same with Model X"',
  source:'출처: Elon Musk · 2026.07.26',
  noteHead:'왜 이 시점: 신형 라인업(Cybercab/Optimus) 집중과 구형 Model X 세대교체 신호',noteSub:'앞으로 볼 것: 오픈소스 공개 범위·라이선스 조건·서드파티 활용 사례',footer:'TSLA · Model X open source',brand:BK},
 en:{title:'Musk — Model X Design & Software To Be Open-Sourced',heroIcon:'🔓',heroBig:'OPEN SOURCE',heroSub:'"Just as we open-sourced the original Roadster, we plan to do the same with Model X"',
  cards:[{icon:'🔓',big:'Model X',mid:'Design/SW open source',sub:'Roadster precedent'},{icon:'📜',big:'Musk teases',mid:'Exact timing TBD',sub:'plan stage'},{icon:'♻️',big:'Community',mid:'Restoration / remixes',sub:'brand asset expansion'}],
  quoteLabel:'ELON MUSK',quoteKo:'"원조 Roadster처럼 Model X도 오픈소스 예정"',quoteEn:'"Just as Tesla open-sourced the original Roadster design & software, we plan to do the same with Model X"',
  source:'Source: Elon Musk · 2026.07.26',
  noteHead:'Why now: Focus on new lineup (Cybercab/Optimus) · generational shift for legacy Model X',noteSub:'Watch: open-source scope · license terms · third-party use cases',footer:'TSLA · Model X open source',brand:BE}},

// 4. TSLA Energy Storage $232.3/KWh -20% YoY
{file:'tsla-energy-2323-per-kwh',symbol:'TSLA',
 ko:{title:'TSLA 에너지 스토리지 — Q2 평균 $232.3/KWh · -20% YoY',heroIcon:'🔋',heroBig:'$232.3/kWh',heroSub:'Tesla Q2 2026 에너지 스토리지 배포 kWh당 평균 매출 $232.3 · 전년 대비 -20% · CFO가 경쟁 심화 언급',
  cards:[{icon:'💵',big:'$232.3',mid:'kWh당 평균 매출',sub:'배포 기준'},{icon:'📉',big:'-20 %',mid:'YoY 감소',sub:'경쟁 심화'},{icon:'🌐',big:'글로벌',mid:'배터리 저장 시장',sub:'CATL·BYD 등 경쟁'}],
  quoteLabel:'AI INVESTMENT RESEARCH',quoteKo:'"에너지 스토리지 배포 단가가 사상 최저를 기록 · 경쟁 심화가 배경"',quoteEn:'"Energy storage per-KWh revenue at record low · intensifying global competition"',
  source:'출처: AI Investment Research · Tesla CFO 발언 인용 · 2026.07.26',
  noteHead:'왜 중요한가: Megapack·Powerwall 매출 성장에도 kWh 단가 하락 → 마진 압박',noteSub:'앞으로 볼 것: 셀 비용 하락과 매출 단가 하락의 상대 속도',footer:'TSLA Energy · $232.3/kWh',brand:BK},
 en:{title:'TSLA Energy Storage — Q2 Avg $232.3/KWh · -20% YoY',heroIcon:'🔋',heroBig:'$232.3/kWh',heroSub:'Tesla Q2 2026 avg revenue per deployed kWh of energy storage = $232.3 · down 20% YoY · CFO flags intensifying competition',
  cards:[{icon:'💵',big:'$232.3',mid:'Avg rev per kWh',sub:'per deployed unit'},{icon:'📉',big:'-20 %',mid:'YoY decline',sub:'competition intensifies'},{icon:'🌐',big:'Global',mid:'Battery storage market',sub:'CATL/BYD competition'}],
  quoteLabel:'AI INVESTMENT RESEARCH',quoteKo:'"에너지 스토리지 단가 사상 최저 · 경쟁 심화"',quoteEn:'"Energy storage per-KWh revenue at record low · intensifying global competition"',
  source:'Source: AI Investment Research citing Tesla CFO · 2026.07.26',
  noteHead:'Why: Megapack/Powerwall revenue grows but per-kWh price drops → margin squeeze',noteSub:'Watch: relative pace of cell-cost decline vs price decline',footer:'TSLA Energy · $232.3/kWh',brand:BE}},

// 5. TSLA Supercharger Croatia 100 stalls
{file:'tsla-supercharger-croatia-100',symbol:'TSLA',
 ko:{title:'TSLA Supercharger — 크로아티아 100번째 스톨 · Megapack 결합',heroIcon:'⚡',heroBig:'100 STALLS',heroSub:'Tesla가 크로아티아에 신규 3개 사이트(Gospić·Zadar Westbound·Vista Jadrana South) 오픈 · 총 스톨 100개 · Megapack으로 관광 성수기 전력 커버',
  cards:[{icon:'⚡',big:'100',mid:'크로아티아 총 스톨',sub:'3개 사이트 신규'},{icon:'🔋',big:'Megapack',mid:'현장 저장',sub:'성수기 전력 완충'},{icon:'📅',big:'2025→2026',mid:'44 → 72 → 100 확장',sub:'공약 이행 궤도'}],
  quoteLabel:'MUSKONOMY · TESLA CHARGING',quoteKo:'"크로아티아 100번째 Supercharger 스톨 · Zadar에 Megapack 결합"',quoteEn:'"Croatia hits 100 Tesla Supercharger stalls with 3 new sites · Megapack on-site at Zadar"',
  source:'출처: Muskonomy · Tesla Charging on X · 2026.07.26',
  noteHead:'왜 중요한가: 지역 그리드 취약한 관광지에서 Megapack으로 자체 완충',noteSub:'앞으로 볼 것: Rijeka·Pula·Šibenik 등 2026 잔여 리스트 진척',footer:'TSLA · Croatia 100 stalls',brand:BK},
 en:{title:'TSLA Supercharger — 100th Stall in Croatia · Bundled Megapack',heroIcon:'⚡',heroBig:'100 STALLS',heroSub:'Three new Croatia sites (Gospić, Zadar Westbound, Vista Jadrana South) bring total to 100 · Megapack covers tourist-season peak power',
  cards:[{icon:'⚡',big:'100',mid:'Croatia total stalls',sub:'3 new sites'},{icon:'🔋',big:'Megapack',mid:'On-site storage',sub:'peak-power buffer'},{icon:'📅',big:'2025→2026',mid:'44 → 72 → 100',sub:'commitment on track'}],
  quoteLabel:'MUSKONOMY · TESLA CHARGING',quoteKo:'"크로아티아 100번째 스톨 · Zadar Megapack"',quoteEn:'"Croatia hits 100 Tesla Supercharger stalls with 3 new sites · Megapack on-site at Zadar"',
  source:'Source: Muskonomy · Tesla Charging on X · 2026.07.26',
  noteHead:'Why: Megapack buffers weak local grid in a tourist region',noteSub:'Watch: Rijeka, Pula, Šibenik and other 2026 backlog progression',footer:'TSLA · Croatia 100 stalls',brand:BE}},

// 6. GOOGL SPCX 지분 $94.1B (6%)
{file:'googl-spcx-stake-94b-6pct',symbol:'GOOGL',
 ko:{title:'GOOGL — SPCX 지분 $94.1B(6% 지분) 공시 · 2024 $30.1B에서 대폭 상승',heroIcon:'💎',heroBig:'$94.1 B',heroSub:'Google이 재무제표에 SpaceX 지분 non-marketable equity fair value $94.1B로 공시 · 2024 $30.1B 대비 대폭 재평가 · 지분율 약 6%',
  cards:[{icon:'💎',big:'$94.1 B',mid:'SPCX 지분 fair value',sub:'GOOGL 보유'},{icon:'📈',big:'2024 → 26',mid:'$30.1B → $94.1B',sub:'약 3배 재평가'},{icon:'📊',big:'~6 %',mid:'GOOGL의 SPCX 지분율',sub:'대주주 지위'}],
  quoteLabel:'WHOLE MARS CATALOG',quoteKo:'"Google이 SpaceX 지분 $94.1B(6% 지분) 공시 · 2024 $30.1B에서 대폭 상승"',quoteEn:'"Google discloses $94.1B stake in SpaceX (6% stake) · up from $30.1B in 2024"',
  source:'출처: Whole Mars Catalog · GOOGL 재무제표 · 2026.07.26',
  noteHead:'왜 중요한가: GOOGL non-core 자산의 mega-cap 규모 확인 · SPCX 밸류 정당화 근거',noteSub:'앞으로 볼 것: 다른 대주주(Fidelity·Founders Fund) 지분·SPCX 실적 반영',footer:'GOOGL · SPCX $94.1B',brand:BK},
 en:{title:'GOOGL — Discloses $94.1B SPCX Stake (6%) · Up From $30.1B in 2024',heroIcon:'💎',heroBig:'$94.1 B',heroSub:'Google discloses SpaceX stake on financials as non-marketable equity at fair value of $94.1B · vs $30.1B in 2024 · ~6% stake',
  cards:[{icon:'💎',big:'$94.1 B',mid:'SPCX stake fair value',sub:'held by GOOGL'},{icon:'📈',big:'2024 → 26',mid:'$30.1B → $94.1B',sub:'~3× re-mark'},{icon:'📊',big:'~6 %',mid:'GOOGL SPCX stake',sub:'major holder'}],
  quoteLabel:'WHOLE MARS CATALOG',quoteKo:'"GOOGL SPCX 지분 $94.1B (6%) · 2024 대비 대폭 상승"',quoteEn:'"Google discloses $94.1B stake in SpaceX (6% stake) · up from $30.1B in 2024"',
  source:'Source: Whole Mars Catalog · GOOGL financials · 2026.07.26',
  noteHead:'Why: Confirms mega-cap scale of GOOGL non-core assets · validates SPCX valuation',noteSub:'Watch: other holders (Fidelity, Founders Fund) · SPCX earnings reflection',footer:'GOOGL · SPCX $94.1B',brand:BE}},

// 7. GOOGL 백로그 $500B+ (1년 전 $100B)
{file:'googl-backlog-500b',symbol:'GOOGL',
 ko:{title:'GOOGL — 백로그 $500B+ 돌파 · 1년 전 $100B의 5배',heroIcon:'📚',heroBig:'$500 B +',heroSub:'Google Cloud 등 백로그가 $500B 초과 · 1년 전 $100B에서 5배 확대 · AI/Cloud 수요 견조함 확인',
  cards:[{icon:'📚',big:'$500 B +',mid:'현재 백로그',sub:'Google Cloud 등'},{icon:'🚀',big:'5 ×',mid:'1년 전 $100B 대비',sub:'폭증 사이클'},{icon:'☁️',big:'AI · Cloud',mid:'수요 견조',sub:'CAPEX 정당화 근거'}],
  quoteLabel:'EVAN',quoteKo:'"Google이 이제 $500B 초과 백로그 · 1년 전 $100B의 5배"',quoteEn:'"Google now has a backlog of more than $500B · up from $100B a year ago"',
  source:'출처: Evan · 2026.07.26',
  noteHead:'왜 중요한가: 어제 FCF 첫 음전환에도 매출 성장 지속 확인 · CAPEX 리레이팅 근거',noteSub:'앞으로 볼 것: 백로그의 매출 전환 속도·클라우드 GM 회복 시점',footer:'GOOGL · Backlog $500B+',brand:BK},
 en:{title:'GOOGL — Backlog Tops $500B · 5× the $100B a Year Ago',heroIcon:'📚',heroBig:'$500 B +',heroSub:'Google Cloud etc. backlog exceeds $500B · 5× the $100B a year ago · confirms robust AI/Cloud demand',
  cards:[{icon:'📚',big:'$500 B +',mid:'Current backlog',sub:'Google Cloud etc.'},{icon:'🚀',big:'5 ×',mid:'vs $100B a year ago',sub:'surge cycle'},{icon:'☁️',big:'AI · Cloud',mid:'Demand robust',sub:'CAPEX justification'}],
  quoteLabel:'EVAN',quoteKo:'"GOOGL 백로그 $500B+ · 1년 전 $100B의 5배"',quoteEn:'"Google now has a backlog of more than $500B · up from $100B a year ago"',
  source:'Source: Evan · 2026.07.26',
  noteHead:'Why: Despite recent first-negative FCF, revenue growth continues · CAPEX re-rating basis',noteSub:'Watch: backlog-to-revenue conversion pace · cloud GM recovery',footer:'GOOGL · Backlog $500B+',brand:BE}},

// 8. GOOGL 강세 프레임 · -8% 주간
{file:'googl-bull-frame-minus-8pct',symbol:'GOOGL',
 ko:{title:'GOOGL — 주간 -8% 하락 · 그러나 AI 통합 자산 강세 프레임',heroIcon:'⚖️',heroBig:'−8 % 주간',heroSub:'Just a Dude who lives on X: GOOGL이 AI 경쟁에서 가장 잘 포지션됨 · 수십억이 매일 쓰는 제품에 통합 · -8%는 매수 기회 프레임',
  cards:[{icon:'📉',big:'-8 % 주간',mid:'최근 낙폭',sub:'FCF·100-DMA 여파'},{icon:'🌍',big:'수십억 사용자',mid:'GOOGL 제품 통합',sub:'Search·Gmail·Maps·YouTube'},{icon:'🎯',big:'AI 통합',mid:'모든 제품 layer',sub:'경쟁 우위 프레임'}],
  quoteLabel:'JUST A DUDE WHO LIVES ON X',quoteKo:'"AI 경쟁에서 Google보다 잘 포지션된 회사는 없다"',quoteEn:'"No company is better positioned to win the AI race than Google"',
  source:'출처: 개인 계정 · 2026.07.26',
  noteHead:'왜 이 프레임: FCF·100-DMA 부담과 backlog $500B+ 매출 성장이 팽팽함',noteSub:'앞으로 볼 것: -8%가 200-DMA까지 확장 vs backlog 매출 전환 속도',footer:'GOOGL · Bull frame vs -8%',brand:BK},
 en:{title:'GOOGL — Down 8% for the Week · But AI-Integrated Assets Bull Frame',heroIcon:'⚖️',heroBig:'−8 % week',heroSub:'Per Just a Dude who lives on X: GOOGL best positioned in AI race · products used by billions daily · -8% framed as opportunity',
  cards:[{icon:'📉',big:'-8 % week',mid:'Recent drawdown',sub:'FCF/100-DMA echo'},{icon:'🌍',big:'Billions of users',mid:'GOOGL products',sub:'Search/Gmail/Maps/YouTube'},{icon:'🎯',big:'AI integration',mid:'All product layers',sub:'competitive-edge frame'}],
  quoteLabel:'JUST A DUDE WHO LIVES ON X',quoteKo:'"AI 경쟁에서 GOOGL보다 잘 포지션된 회사 없음"',quoteEn:'"No company is better positioned to win the AI race than Google"',
  source:'Source: individual account · 2026.07.26',
  noteHead:'Why the frame: FCF/100-DMA drag tensions with $500B+ backlog growth',noteSub:'Watch: -8% extending to 200-DMA vs pace of backlog-to-rev conversion',footer:'GOOGL · Bull frame vs -8%',brand:BE}},

// 9. SPCX Starship V3 flight test learnings
{file:'spcx-starship-v3-flight-learnings',symbol:'SPCX',
 ko:{title:'SPCX — Starship V3 시험 발사 · 궤도·운영 미션 위한 학습',heroIcon:'🚀',heroBig:'V3 TEST',heroSub:'SpaceX 공식 코멘트: 시험 발사에서 얻은 학습이 궤도·운영 미션 위한 Starship 신뢰성 향상에 기여한다는 프레임',
  cards:[{icon:'🚀',big:'V3',mid:'Version 3 시험',sub:'재사용성 학습'},{icon:'📊',big:'학습',mid:'reliability 향상 목적',sub:'궤도 진입 준비'},{icon:'🌌',big:'궤도·운영',mid:'다음 단계 미션',sub:'상용 페이로드 준비'}],
  quoteLabel:'SPACEX 공식',quoteKo:'"오늘의 시험이 궤도·운영 미션 위한 Starship 신뢰성 향상에 기여할 것"',quoteEn:'"Today\'s test will help us advance Starship\'s reliability ahead of orbital and operational missions"',
  source:'출처: SpaceX 공식 · 2026.07.26',
  noteHead:'왜 이 프레임: All-in Starship 전략과 결합 · 발사 실패도 학습 자산 프레임',noteSub:'앞으로 볼 것: 다음 발사 결과·V4 로드맵·상용 고객 반응',footer:'SPCX · Starship V3 learnings',brand:BK},
 en:{title:'SPCX — Starship V3 Flight Test · Learnings Toward Orbital & Operational Missions',heroIcon:'🚀',heroBig:'V3 TEST',heroSub:'Official SpaceX comment: learnings from this test flight advance Starship reliability ahead of orbital and operational missions',
  cards:[{icon:'🚀',big:'V3',mid:'Version 3 test',sub:'reusability learning'},{icon:'📊',big:'Learning',mid:'reliability advance',sub:'orbital prep'},{icon:'🌌',big:'Orbit / Ops',mid:'Next-stage missions',sub:'commercial payload prep'}],
  quoteLabel:'SPACEX OFFICIAL',quoteKo:'"오늘 시험이 궤도·운영 미션 위한 신뢰성 향상"',quoteEn:'"Today\'s test will help us advance Starship\'s reliability ahead of orbital and operational missions"',
  source:'Source: SpaceX official · 2026.07.26',
  noteHead:'Why the frame: Combines with all-in Starship strategy · even flight failures reframed as learning',noteSub:'Watch: next flight outcome · V4 roadmap · commercial customer response',footer:'SPCX · Starship V3 learnings',brand:BE}},

// 10. TSLA·SPCX 합병 Kalshi 1년 내 74% record
{file:'tsla-spcx-merger-kalshi-74pct',symbol:'SPCX',
 ko:{title:'TSLA·SPCX 합병 확률 — Kalshi 1년 내 74% · 사상 최고 (Skyrocket)',heroIcon:'🤝',heroBig:'74 %',heroSub:'Kalshi 예측시장 기준 TSLA·SPCX가 향후 1년 내 합병할 확률이 74%로 급등 · 사상 최고 (skyrocketing)',
  cards:[{icon:'📊',big:'74 %',mid:'1년 내 합병 확률',sub:'Kalshi 사상 최고'},{icon:'⏱️',big:'1년 이내',mid:'시간 조건 축약',sub:'앞선 2028 이전 79%와 대비'},{icon:'⚡',big:'급등',mid:'skyrocketing',sub:'단기 뉴스 반응'}],
  quoteLabel:'THESONOFWALKEY · KALSHI',quoteKo:'"Tesla·SpaceX가 1년 내 합병할 확률이 74%로 사상 최고 급등"',quoteEn:'"Odds Tesla and SpaceX merge within the next year skyrocket to 74% — a record high"',
  source:'출처: TheSonOfWalkey · Kalshi · 2026.07.26',
  noteHead:'왜 급등인가: GOOGL SPCX $94.1B 재평가·All-in Starship·Jonas $135 등 시나리오 강화',noteSub:'앞으로 볼 것: Musk 공식 발표 여부·구조·주주 승인 타이밍',footer:'TSLA·SPCX · Kalshi 74%',brand:BK},
 en:{title:'TSLA·SPCX Merger Odds — Kalshi 74% Within a Year · Record High (Skyrocketing)',heroIcon:'🤝',heroBig:'74 %',heroSub:'Per Kalshi prediction market, odds TSLA·SPCX merge within the next year skyrocket to 74% — a record high',
  cards:[{icon:'📊',big:'74 %',mid:'Merger odds (1 yr)',sub:'record on Kalshi'},{icon:'⏱️',big:'Within 1 yr',mid:'Tighter time frame',sub:'vs 79% before 2028'},{icon:'⚡',big:'Skyrocketing',mid:'Sharp rise',sub:'short-term news response'}],
  quoteLabel:'THESONOFWALKEY · KALSHI',quoteKo:'"1년 내 합병 확률 74% 사상 최고 급등"',quoteEn:'"Odds Tesla and SpaceX merge within the next year skyrocket to 74% — a record high"',
  source:'Source: TheSonOfWalkey · Kalshi · 2026.07.26',
  noteHead:'Why the surge: GOOGL SPCX $94.1B re-mark, all-in Starship, Jonas $135 all strengthen the scenario',noteSub:'Watch: Musk official announcement · structure · shareholder-approval timing',footer:'TSLA·SPCX · Kalshi 74%',brand:BE}},

// 11. 중국 투자자 오프쇼어 크립토로 SpaceX·OpenAI 노출 (FT)
{file:'china-crypto-spacex-openai',symbol:'SPCX',
 ko:{title:'중국 투자자 — 오프쇼어 크립토로 SpaceX·OpenAI 노출 (FT)',heroIcon:'🌐',heroBig:'CN → US AI',heroSub:'FT: 중국 투자자들이 자본 통제를 우회하기 위해 오프쇼어 크립토 거래소의 토큰으로 SpaceX·OpenAI 등 미 AI 스타트업 노출 취득',
  cards:[{icon:'🇨🇳',big:'중국 자본',mid:'자본 통제 우회',sub:'베이징 규제'},{icon:'🪙',big:'오프쇼어 크립토',mid:'토큰화 지분 노출',sub:'우회 경로'},{icon:'🇺🇸',big:'SPCX · OpenAI',mid:'미 AI 스타트업',sub:'노출 대상'}],
  quoteLabel:'FT · JUST IN',quoteKo:'"중국 투자자들이 크립토 토큰으로 SpaceX·OpenAI 등 미 AI 노출 확대"',quoteEn:'"Chinese investors turn to crypto tokens on offshore exchanges to bypass capital controls and gain exposure to US AI stocks like SpaceX and OpenAI"',
  source:'출처: FT · 2026.07.26',
  noteHead:'왜 중요한가: 미 AI 스타트업 수요가 자본 통제도 뚫는 강도 · 크립토·주식 결합 시장',noteSub:'앞으로 볼 것: 규제(SEC·SAFE) 반응·토큰화 지분 시장 확대 여부',footer:'SPCX/OpenAI · CN offshore crypto',brand:BK},
 en:{title:'Chinese Investors — Offshore Crypto Tokens for SpaceX/OpenAI Exposure (FT)',heroIcon:'🌐',heroBig:'CN → US AI',heroSub:'Per FT: Chinese investors turn to crypto tokens on offshore exchanges to bypass capital controls and gain US AI-startup exposure like SpaceX and OpenAI',
  cards:[{icon:'🇨🇳',big:'CN capital',mid:'Bypasses controls',sub:'Beijing restrictions'},{icon:'🪙',big:'Offshore crypto',mid:'Tokenized exposure',sub:'workaround route'},{icon:'🇺🇸',big:'SPCX · OpenAI',mid:'US AI startups',sub:'exposure target'}],
  quoteLabel:'FT · JUST IN',quoteKo:'"중국 투자자가 크립토 토큰으로 SPCX·OpenAI 노출"',quoteEn:'"Chinese investors turn to crypto tokens on offshore exchanges to bypass capital controls and gain exposure to US AI stocks like SpaceX and OpenAI"',
  source:'Source: FT · 2026.07.26',
  noteHead:'Why: US AI-startup demand strong enough to breach capital controls · crypto-equity market convergence',noteSub:'Watch: regulatory (SEC/SAFE) response · tokenized-equity market expansion',footer:'SPCX/OpenAI · CN offshore crypto',brand:BE}},

// 12. Musk — AI 10년 통제 발언
{file:'musk-ai-10y-control',symbol:'MACRO',
 ko:{title:'Musk — "AI가 10년 안에 통제 위치에 있을 가능성 크다"',heroIcon:'🤖',heroBig:'10 YR',heroSub:'Elon Musk: AI-인간 지능 격차가 인간-침팬지 격차보다 훨씬 크다면 침팬지가 지휘하는 상황은 상상하기 어렵다는 비유',
  cards:[{icon:'⏰',big:'10년',mid:'AI 통제 시나리오',sub:'Musk 발언'},{icon:'🧠',big:'지능 격차',mid:'인간 vs 침팬지 비유',sub:'AI vs 인간'},{icon:'🌐',big:'거버넌스',mid:'AI 안전·규제 재점화',sub:'정책 논쟁'}],
  quoteLabel:'ELON MUSK · COINMARKETCAP',quoteKo:'"AI와 인간의 격차가 인간과 침팬지 격차보다 훨씬 크다면, 침팬지가 지휘한다고 상상하기 어렵다"',quoteEn:'"If the difference in intelligence between AI and humans is vastly greater than between humans and chimpanzees, it\'s hard to imagine the chimpanzees would be in charge"',
  source:'출처: CoinMarketCap · 2026.07.26',
  noteHead:'왜 이 발언인가: xAI Grok·Optimus·Robotaxi 로드맵 배경에서 CEO의 장기 관점',noteSub:'앞으로 볼 것: AI 안전 규제·xAI Colossus 확장·정책 논쟁 확대',footer:'MACRO · Musk AI 10yr',brand:BK},
 en:{title:'Musk — "AI Likely to Be In Control Within 10 Years"',heroIcon:'🤖',heroBig:'10 YR',heroSub:'Elon Musk: if AI-vs-human intelligence gap is vastly bigger than human-vs-chimpanzee, hard to imagine chimpanzees running the show',
  cards:[{icon:'⏰',big:'10 yrs',mid:'AI-in-charge scenario',sub:'Musk statement'},{icon:'🧠',big:'Intelligence gap',mid:'human vs chimp analogy',sub:'AI vs human'},{icon:'🌐',big:'Governance',mid:'AI safety/regulation',sub:'policy debate'}],
  quoteLabel:'ELON MUSK · COINMARKETCAP',quoteKo:'"AI-인간 격차가 인간-침팬지보다 크면, 침팬지가 지휘한다고 상상하기 어렵다"',quoteEn:'"If the difference in intelligence between AI and humans is vastly greater than between humans and chimpanzees, it\'s hard to imagine the chimpanzees would be in charge"',
  source:'Source: CoinMarketCap · 2026.07.26',
  noteHead:'Why: Long-term CEO framing behind xAI Grok, Optimus, Robotaxi roadmap',noteSub:'Watch: AI safety regulation · xAI Colossus scale-out · policy debate',footer:'MACRO · Musk AI 10yr',brand:BE}},

// 13. Musk Starlink multiplanetary
{file:'musk-starlink-multiplanetary',symbol:'SPCX',
 ko:{title:'Musk — "Starlink 사용자가 다행성 문명 만들기 돕는다" 감사 발언',heroIcon:'🌍',heroBig:'MULTIPLANETARY',heroSub:'Elon Musk가 Starlink 구독자들에게 감사 표명 · 문명의 미래·다행성 문명 만들기에 기여하고 있다는 프레임',
  cards:[{icon:'📡',big:'Starlink',mid:'구독자 감사',sub:'수익이 우주 사업 지원'},{icon:'🚀',big:'화성',mid:'Mars 임무 로드맵',sub:'수익 재투자 근거'},{icon:'🌌',big:'문명',mid:'multiplanetary',sub:'장기 프레임'}],
  quoteLabel:'ELON MUSK · DOGEDESIGNER',quoteKo:'"Starlink를 사용해주는 모든 분께 감사 · 문명의 미래를 지키고 다행성 문명에 기여하는 것"',quoteEn:'"Thanks to everyone who bought Starlink — you\'re helping secure the future of civilization and make life multiplanetary"',
  source:'출처: DogeDesigner · 2026.07.26',
  noteHead:'왜 이 시점: Starship V3 시험 발사·All-in Starship 결정 시점의 CEO 감사 메시지',noteSub:'앞으로 볼 것: Starlink 매출 성장·Mars 임무 로드맵 공개 시점',footer:'SPCX · Starlink multiplanetary',brand:BK},
 en:{title:'Musk — "Starlink Users Help Make Life Multiplanetary" Thank You',heroIcon:'🌍',heroBig:'MULTIPLANETARY',heroSub:'Elon Musk thanks Starlink subscribers · framing: they\'re helping secure the future of civilization and make life multiplanetary',
  cards:[{icon:'📡',big:'Starlink',mid:'Thank subscribers',sub:'revenue funds space biz'},{icon:'🚀',big:'Mars',mid:'Mission roadmap',sub:'reinvestment basis'},{icon:'🌌',big:'Civilization',mid:'multiplanetary',sub:'long-term frame'}],
  quoteLabel:'ELON MUSK · DOGEDESIGNER',quoteKo:'"Starlink 구독자에게 감사 · 문명 다행성화 기여"',quoteEn:'"Thanks to everyone who bought Starlink — you\'re helping secure the future of civilization and make life multiplanetary"',
  source:'Source: DogeDesigner · 2026.07.26',
  noteHead:'Why now: CEO thank-you at the time of Starship V3 test flight and all-in Starship decision',noteSub:'Watch: Starlink revenue growth · Mars roadmap reveal',footer:'SPCX · Starlink multiplanetary',brand:BE}},

// 14. Samsung × Broadcom $200B supply through 2030
{file:'ssnlf-avgo-200b-supply-2030',symbol:'AVGO',
 ko:{title:'Samsung × Broadcom — $200B 반도체 공급 계약 (2030까지)',heroIcon:'🤝',heroBig:'$200 B',heroSub:'Samsung이 Broadcom과 2030년까지 $200B 규모 반도체 공급 계약 체결 · HBM 메모리·파운드리·고급 패키징 포함 · 사상 최대급',
  cards:[{icon:'💾',big:'HBM',mid:'메모리 공급',sub:'AI 서버 핵심'},{icon:'🏭',big:'Foundry',mid:'파운드리 서비스',sub:'선단 공정'},{icon:'📦',big:'Advanced Pkg',mid:'고급 패키징',sub:'ASIC 패키징'}],
  quoteLabel:'BULL THEORY',quoteKo:'"Samsung × Broadcom $200B 공급 계약 · HBM·파운드리·패키징 커버"',quoteEn:'"Samsung × Broadcom sign a $200B semiconductor supply deal through 2030 · covering HBM, foundry, and advanced packaging"',
  source:'출처: Bull Theory · 2026.07.26',
  noteHead:'왜 중요한가: AVGO·Samsung 상호 의존 심화 · HBM 경쟁 재편 (SK하이닉스 vs Samsung)',noteSub:'앞으로 볼 것: NVDA·AMD의 Samsung HBM 채택·SK하이닉스 계약 반응',footer:'SSNLF × AVGO · $200B',brand:BK},
 en:{title:'Samsung × Broadcom — $200B Semiconductor Supply Deal Through 2030',heroIcon:'🤝',heroBig:'$200 B',heroSub:'Samsung signs a $200B supply deal with Broadcom through 2030 · covering HBM memory, foundry, and advanced packaging · one of the largest ever',
  cards:[{icon:'💾',big:'HBM',mid:'Memory supply',sub:'AI server core'},{icon:'🏭',big:'Foundry',mid:'Foundry services',sub:'leading-edge nodes'},{icon:'📦',big:'Advanced pkg',mid:'Advanced packaging',sub:'ASIC packaging'}],
  quoteLabel:'BULL THEORY',quoteKo:'"Samsung × Broadcom $200B 공급 계약"',quoteEn:'"Samsung × Broadcom sign a $200B semiconductor supply deal through 2030 · covering HBM, foundry, and advanced packaging"',
  source:'Source: Bull Theory · 2026.07.26',
  noteHead:'Why: Deeper AVGO-Samsung interdependence · HBM competition reshaped (SK Hynix vs Samsung)',noteSub:'Watch: NVDA/AMD Samsung-HBM adoption · SK Hynix contract response',footer:'SSNLF × AVGO · $200B',brand:BE}},

// 15. NVDA Jensen HBM supply chain 압박
{file:'nvda-jensen-hbm-supply-strain',symbol:'NVDA',
 ko:{title:'NVDA Jensen — 칩 공급망 압박 · HBM 조달이 핵심 병목',heroIcon:'🔗',heroBig:'STRAINED',heroSub:'Jensen Huang: 최근 수요 급증이 전체 칩 공급망을 압박 · HBM 확보가 SK하이닉스·INTC·Samsung 등에 걸쳐 병목',
  cards:[{icon:'🔗',big:'공급망 압박',mid:'수요 급증 영향',sub:'HBM · 파운드리'},{icon:'💾',big:'HBM',mid:'핵심 병목',sub:'AI GPU 성능 결정'},{icon:'🏭',big:'삼각 협력',mid:'SK하이닉스·INTC·Samsung',sub:'다중 조달'}],
  quoteLabel:'NVDA CEO JENSEN HUANG · SHAY BOLOOR',quoteKo:'"수요 급증이 SK하이닉스·INTC·Samsung을 포함해 전체 칩 공급망을 압박"',quoteEn:'"The surge is straining the entire chip supply chain, including HBM from SK Hynix, INTC, and Samsung"',
  source:'출처: Shay Boloor 인용 · 2026.07.26',
  noteHead:'왜 중요한가: HBM 배분이 GPU 매출 상단 결정 · Samsung × AVGO $200B와 결합',noteSub:'앞으로 볼 것: HBM4 배분 결과·다중 벤더 전략·NVDA 매출 가이던스',footer:'NVDA · HBM strain',brand:BK},
 en:{title:'NVDA Jensen — Chip Supply Chain Strained · HBM Sourcing Is the Choke Point',heroIcon:'🔗',heroBig:'STRAINED',heroSub:'Jensen Huang: recent demand surge strains entire chip supply chain · HBM sourcing across SK Hynix, INTC, and Samsung is the choke point',
  cards:[{icon:'🔗',big:'Supply strain',mid:'From demand surge',sub:'HBM · foundry'},{icon:'💾',big:'HBM',mid:'Key choke',sub:'defines AI GPU perf'},{icon:'🏭',big:'Tri-vendor',mid:'SK Hynix · INTC · Samsung',sub:'multi-source'}],
  quoteLabel:'NVDA CEO JENSEN HUANG · SHAY BOLOOR',quoteKo:'"수요 급증이 SK하이닉스·INTC·Samsung 등 전체 칩 공급망을 압박"',quoteEn:'"The surge is straining the entire chip supply chain, including HBM from SK Hynix, INTC, and Samsung"',
  source:'Source: via Shay Boloor · 2026.07.26',
  noteHead:'Why: HBM allocation caps GPU revenue upside · combines with Samsung × AVGO $200B',noteSub:'Watch: HBM4 allocation · multi-vendor strategy · NVDA revenue guidance',footer:'NVDA · HBM strain',brand:BE}},

// 16. AAPL FCF $135B · Nvidia +38% · Oracle +52%
{file:'aapl-fcf-135b-nvda-oracle-perf',symbol:'AAPL',
 ko:{title:'AAPL — 연간 FCF $135B · NVDA +38%·ORCL +52% 대비 부각',heroIcon:'💰',heroBig:'$135 B',heroSub:'Charlie Bilello: Apple 최근 12개월 FCF $135B · 같은 기간 NVDA 주가 +38%·ORCL +52% · AI CAPEX 지출과 현금 창출력의 대조',
  cards:[{icon:'💰',big:'$135 B',mid:'AAPL 연간 FCF',sub:'현금 창출 리더'},{icon:'📈',big:'+38 %',mid:'NVDA 주가',sub:'같은 기간'},{icon:'📈',big:'+52 %',mid:'ORCL 주가',sub:'AI CAPEX 사이클 수혜'}],
  quoteLabel:'CHARLIE BILELLO',quoteKo:'"결국 시간이 지나면 현금 흐름이 중요하다 · AI 지출을 시장이 재평가 중"',quoteEn:'"Over time, cash flow matters · investors are starting to draw a line on AI spending"',
  source:'출처: Charlie Bilello · 2026.07.26',
  noteHead:'왜 이 프레임: 하이퍼스케일러(GOOGL) FCF 첫 음전환과 AAPL 현금 창출력의 대조',noteSub:'앞으로 볼 것: AI CAPEX 리레이팅 흐름·AAPL의 AI 자체 사업 진전',footer:'AAPL · $135B FCF',brand:BK},
 en:{title:'AAPL — Annual FCF $135B · Stands Out vs NVDA +38% / ORCL +52%',heroIcon:'💰',heroBig:'$135 B',heroSub:'Per Charlie Bilello: Apple TTM FCF at $135B · in the same period NVDA +38% and ORCL +52% in price · a contrast of AI-CAPEX spend vs cash generation',
  cards:[{icon:'💰',big:'$135 B',mid:'AAPL annual FCF',sub:'cash-gen leader'},{icon:'📈',big:'+38 %',mid:'NVDA price',sub:'same period'},{icon:'📈',big:'+52 %',mid:'ORCL price',sub:'AI-CAPEX beneficiaries'}],
  quoteLabel:'CHARLIE BILELLO',quoteKo:'"시간이 지나면 현금 흐름이 중요 · AI 지출을 재평가 중"',quoteEn:'"Over time, cash flow matters · investors are starting to draw a line on AI spending"',
  source:'Source: Charlie Bilello · 2026.07.26',
  noteHead:'Why the frame: Contrast between hyperscaler (GOOGL) first-negative FCF and AAPL cash generation',noteSub:'Watch: AI-CAPEX re-rating flow · AAPL\'s own AI business progress',footer:'AAPL · $135B FCF',brand:BE}},

// 17. BRK 현금 $317B ATH
{file:'brk-cash-317b-ath',symbol:'BRK',
 ko:{title:'BRK — 현금 보유 $317B 사상 최대 · S&P 500 476개사 시총 규모',heroIcon:'💵',heroBig:'$317 B',heroSub:'Berkshire Hathaway가 현금 및 등가물 $317B로 사상 최대 · S&P 500 중 476개사 시가총액 합에 필적',
  cards:[{icon:'💵',big:'$317 B',mid:'BRK 현금',sub:'사상 최대'},{icon:'🏢',big:'476개사',mid:'S&P 500 살 수 있는 규모',sub:'매수 여력 축적'},{icon:'⏳',big:'대기',mid:'매수 시점 관망',sub:'밸류 재조정 대비'}],
  quoteLabel:'BARCHART',quoteKo:'"Berkshire Hathaway가 현금 $317B로 사상 최대 · S&P 500 476개사 살 수 있는 규모"',quoteEn:'"Berkshire Hathaway now sits on an all-time high $317B in cash, enough to buy 476 S&P 500 companies"',
  source:'출처: Barchart · 2026.07.26',
  noteHead:'왜 중요한가: Buffett 현금 대기·시장 밸류에이션 재조정 시그널로 해석',noteSub:'앞으로 볼 것: 다음 13F 매수 종목·후계 CEO 전략 방향',footer:'BRK · Cash $317B ATH',brand:BK},
 en:{title:'BRK — All-Time-High $317B in Cash · Enough to Buy 476 S&P 500 Companies',heroIcon:'💵',heroBig:'$317 B',heroSub:'Berkshire Hathaway sits on all-time-high $317B in cash & equivalents · comparable to the combined market cap of 476 S&P 500 companies',
  cards:[{icon:'💵',big:'$317 B',mid:'BRK cash',sub:'all-time high'},{icon:'🏢',big:'476 cos',mid:'S&P 500 buyable',sub:'huge dry powder'},{icon:'⏳',big:'On hold',mid:'Waiting for buys',sub:'valuation reset prep'}],
  quoteLabel:'BARCHART',quoteKo:'"BRK 현금 $317B 사상 최대 · S&P 500 476개사 규모"',quoteEn:'"Berkshire Hathaway now sits on an all-time high $317B in cash, enough to buy 476 S&P 500 companies"',
  source:'Source: Barchart · 2026.07.26',
  noteHead:'Why: Buffett cash sitting = market-valuation-reset signal read',noteSub:'Watch: next 13F buy names · successor CEO strategy',footer:'BRK · Cash $317B ATH',brand:BE}},

// 18. S&P 500 실적 91% 비트
{file:'spx-91pct-beat-119cos',symbol:'SPX',
 ko:{title:'매크로 — S&P 500 실적 91%가 EPS 컨센 상회 (119개사 발표)',heroIcon:'📊',heroBig:'91 %',heroSub:'Wall St Engine 집계: 이번 시즌 지금까지 S&P 500 실적 발표 119개사 중 91%가 EPS 컨센 상회',
  cards:[{icon:'📊',big:'91 %',mid:'EPS 컨센 상회 비중',sub:'이번 시즌 기준'},{icon:'📢',big:'119',mid:'현재까지 발표사 수',sub:'시즌 초·중반'},{icon:'📈',big:'컨센 상향 사이클',mid:'가이던스도 record',sub:'어제까지 프레임 지속'}],
  quoteLabel:'WALL ST ENGINE',quoteKo:'"이번 시즌 S&P 500 91% EPS 비트 (119개사 발표)"',quoteEn:'"91% of reporting S&P 500 companies have beaten EPS estimates (119 companies so far)"',
  source:'출처: Wall St Engine · 2026.07.26',
  noteHead:'왜 중요한가: EPS 성장 상단 확대 지속·다만 개별 종목은 마진·가이던스로 상이',noteSub:'앞으로 볼 것: 남은 대형 실적(MSFT·AMZN·META 등)·리비전 방향',footer:'SPX · 91% beat',brand:BK},
 en:{title:'MACRO — 91% of S&P 500 Reports Beating EPS Consensus (119 So Far)',heroIcon:'📊',heroBig:'91 %',heroSub:'Wall St Engine: this season, 91% of the 119 S&P 500 companies reporting so far have beaten EPS consensus',
  cards:[{icon:'📊',big:'91 %',mid:'EPS beat rate',sub:'this season'},{icon:'📢',big:'119',mid:'Companies reported',sub:'early-mid season'},{icon:'📈',big:'Upgrade cycle',mid:'Record guide too',sub:'frame continues from yesterday'}],
  quoteLabel:'WALL ST ENGINE',quoteKo:'"91% EPS 비트 (119개사)"',quoteEn:'"91% of reporting S&P 500 companies have beaten EPS estimates (119 companies so far)"',
  source:'Source: Wall St Engine · 2026.07.26',
  noteHead:'Why: EPS-growth ceiling keeps expanding · but individual names diverge on margin/guide',noteSub:'Watch: remaining large prints (MSFT/AMZN/META) · revision direction',footer:'SPX · 91% beat',brand:BE}},

// 19. S&P 500 short interest 15년 최고
{file:'spx-short-interest-15yr-high',symbol:'SPX',
 ko:{title:'매크로 — S&P 500 숏 관심(Short Interest) 15년래 최고',heroIcon:'📉',heroBig:'15-YR HIGH',heroSub:'First Squawk: S&P 500의 숏 포지션 관심이 15년래 최고 수준으로 상승 · 매크로 hawkish + 개별 부담과 결합',
  cards:[{icon:'📉',big:'15년 최고',mid:'S&P 500 숏 관심',sub:'First Squawk'},{icon:'⚖️',big:'양극화',mid:'91% 실적 비트와 대비',sub:'뉴스 vs 포지션'},{icon:'⏰',big:'스퀴즈 가능성',mid:'positive surprise 시',sub:'매수·매도 양방향'}],
  quoteLabel:'FIRST SQUAWK',quoteKo:'"S&P 500 숏 포지션 관심이 15년래 최고 수준으로 상승"',quoteEn:'"Short interest in S&P 500 rises to near 15-year high"',
  source:'출처: First Squawk · 2026.07.26',
  noteHead:'왜 중요한가: 91% 실적 비트와 대비되는 시장 포지션 · 양극화 신호',noteSub:'앞으로 볼 것: positive surprise 시 숏 커버링 랠리 발생 여부',footer:'SPX · Short interest 15yr high',brand:BK},
 en:{title:'MACRO — S&P 500 Short Interest at ~15-Year High',heroIcon:'📉',heroBig:'15-YR HIGH',heroSub:'Per First Squawk: short-interest in the S&P 500 has risen to a near-15-year high · combines with hawkish macro and individual burden',
  cards:[{icon:'📉',big:'15-yr high',mid:'S&P 500 short interest',sub:'First Squawk'},{icon:'⚖️',big:'Divergence',mid:'vs 91% EPS beat',sub:'news vs positioning'},{icon:'⏰',big:'Squeeze risk',mid:'On positive surprises',sub:'two-way risk'}],
  quoteLabel:'FIRST SQUAWK',quoteKo:'"S&P 500 숏 관심 15년래 최고"',quoteEn:'"Short interest in S&P 500 rises to near 15-year high"',
  source:'Source: First Squawk · 2026.07.26',
  noteHead:'Why: Market positioning contradicts 91% EPS beat rate · polarization signal',noteSub:'Watch: short-covering rally on positive surprises',footer:'SPX · Short interest 15yr high',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260727.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260727-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
