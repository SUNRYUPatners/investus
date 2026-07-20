// 2026-07-21 리포트 SVG 생성기 — 종목별 팔레트 + 풀 본문 원칙
// 실행: node scripts/gen-reports-20260721.js
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.07.21';

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
// 1. FSD v14 Lite HW3 4M cars
{ file:'fsd-v14-lite-hw3-4m', symbol:'TSLA', badge:'TSLA',
  ko:{ title:'FSD v14 Lite — 400만 HW3 차량 wide release', heroIcon:'🚗', heroBig:'4 M · HW3', heroSub:'AI distillation로 HW4 v14 주행 방식을 HW3에 학습',
    cards:[{icon:'💾',big:'v14 Lite',mid:'구형 HW3용 소형 빌드',sub:'Ashok Elluswamy VP AI'},{icon:'🧠',big:'AI distill',mid:'HW4 v14 → HW3',sub:'2025 초 이후 첫 major'},{icon:'🅿️',big:'Parking↑',mid:'후진·merge·traffic·pedestrian',sub:'still supervised'}],
    quoteLabel:'ASHOK ELLUSWAMY · MUSKONOMY', quoteKo:'"HW3의 지난 1년 중 가장 큰 진전 — 여전히 supervised"', quoteEn:'"Biggest step forward HW3 has seen in a year — still supervised"',
    source:'Source: Muskonomy · Ashok Elluswamy on X · 2026.07.20',
    noteHead:'구형 400만 차량 소프트웨어 재활성화 = 구독/데이터 회수 축', noteSub:'v14 Lite는 destination 주차 옵션 표시·Blue P 대체 UI 포함',
    footer:'TSLA FSD v14 Lite · HW3 wide release', brand:BRAND_KO },
  en:{ title:'FSD v14 Lite — Wide Release for ~4M HW3 Cars', heroIcon:'🚗', heroBig:'4 M · HW3', heroSub:'AI distillation teaches HW3 how HW4 v14 drives',
    cards:[{icon:'💾',big:'v14 Lite',mid:'Smaller HW3 build',sub:'per Ashok Elluswamy'},{icon:'🧠',big:'AI distill',mid:'HW4 v14 → HW3',sub:'biggest since early 2025'},{icon:'🅿️',big:'Parking↑',mid:'reverse · merges · lights · peds',sub:'still supervised'}],
    quoteLabel:'ASHOK ELLUSWAMY · MUSKONOMY', quoteKo:'"HW3의 지난 1년 중 가장 큰 진전"', quoteEn:'"Biggest step forward HW3 has seen in a year — still supervised"',
    source:'Source: Muskonomy · Ashok Elluswamy on X · 2026.07.20',
    noteHead:'Reactivates software layer for ~4M older cars — sub/data recapture', noteSub:'v14 Lite adds destination parking options UI, replaces Blue P',
    footer:'TSLA FSD v14 Lite · HW3 wide release', brand:BRAND_EN } },

// 2. FSD China Benchmark
{ file:'fsd-china-benchmark-v1434', symbol:'TSLA', badge:'TSLA',
  ko:{ title:'FSD v14.3.4 — 중국 자율차 인플루언서가 인정한 벤치마크', heroIcon:'🏆', heroBig:'BENCHMARK', heroSub:'Huawei ADS·XPeng VLA·Li Auto ADIC 최고라 믿던 자들이 FSD 체험 후 태도 전환',
    cards:[{icon:'🇨🇳',big:'2 인플루언서',mid:'중국 자율차 테스터',sub:'LA에서 FSD 체험'},{icon:'🚗',big:'v14.3.4',mid:'테스트 버전',sub:'Los Angeles 도로'},{icon:'🌏',big:'China ref',mid:'FSD가 중국 자율차 벤치마크',sub:'Ray Q 코멘트'}],
    quoteLabel:'RAY Q (@RAYQC4)', quoteKo:'"FSD가 중국의 모든 자율주행 시스템에 벤치마크가 되는 시점이 매우 명확해졌다"', quoteEn:'"FSD is the benchmark for every autonomous system in China"',
    source:'Source: Ray Q · 2026.07.20',
    noteHead:'중국 시스템(Huawei ADS·XPeng VLA·Li Auto ADIC)이 여전히 catch-up 필요', noteSub:'중국 FSD 승인 서사(Apple Intelligence 유형) 연쇄 촉매 가능',
    footer:'TSLA FSD v14.3.4 · China benchmark', brand:BRAND_KO },
  en:{ title:'FSD v14.3.4 — Chinese AV Influencers Concede FSD is Benchmark', heroIcon:'🏆', heroBig:'BENCHMARK', heroSub:'Influencers who touted Huawei ADS/XPeng VLA/Li Auto ADIC shifted after testing FSD',
    cards:[{icon:'🇨🇳',big:'2 influencers',mid:'Chinese AV testers',sub:'tested FSD in LA'},{icon:'🚗',big:'v14.3.4',mid:'Version tested',sub:'Los Angeles roads'},{icon:'🌏',big:'China ref',mid:'FSD = benchmark for CN',sub:'Ray Q comment'}],
    quoteLabel:'RAY Q (@RAYQC4)', quoteKo:'"FSD가 중국 모든 자율차 시스템의 벤치마크"', quoteEn:'"FSD is the benchmark for every autonomous system in China"',
    source:'Source: Ray Q · 2026.07.20',
    noteHead:'Chinese systems still need catch-up per the influencers themselves', noteSub:'Could compound with China FSD approval narrative',
    footer:'TSLA FSD v14.3.4 · China benchmark', brand:BRAND_EN } },

// 3. FSD Zach 100mi Review
{ file:'fsd-v14-lite-zach-100mi', symbol:'TSLA', badge:'TSLA',
  ko:{ title:'FSD v14 Lite — 100마일 실주행 후기 (2026.20.8.10)', heroIcon:'📝', heroBig:'100+ mi', heroSub:'Start Self-Driving · parking taps · Self Driving App · streaks 신규',
    cards:[{icon:'▶️',big:'Start SD',mid:'브레이크 없이 auto 진입',sub:'주차→FSD 반응성↑'},{icon:'🅿️',big:'Parking',mid:'blue arrow tap 개선',sub:'brake hold 불필요'},{icon:'🔥',big:'App·Streak',mid:'FSD 사용률/연속기록',sub:'AG4와 동일 트래킹'}],
    quoteLabel:'ZACH (@ZACK)', quoteKo:'"UI 개선 · 부드럽고 자신감 · v10 급 하이웨이 · 도시 개입 low"', quoteEn:'"UI upgrades feel much better · quiet/smooth/confident · v10-tier highway"',
    source:'Source: Zach on X · 2026.07.20',
    noteHead:'auto braking lag 거의 없음 · 도시/스쿨존 개입 0 (본인 후기)', noteSub:'개인 후기이므로 안전 지표 정량 개선은 별도 검증 필요',
    footer:'TSLA FSD v14 Lite · Zach 100mi review', brand:BRAND_KO },
  en:{ title:'FSD v14 Lite — 100+ mi Review (2026.20.8.10)', heroIcon:'📝', heroBig:'100+ mi', heroSub:'Start Self-Driving · parking taps · Self Driving App · streaks new',
    cards:[{icon:'▶️',big:'Start SD',mid:'auto without brake press',sub:'faster park→FSD'},{icon:'🅿️',big:'Parking',mid:'blue-arrow tap improved',sub:'no brake hold'},{icon:'🔥',big:'App·Streak',mid:'FSD usage % / streaks',sub:'like AG4 tracking'}],
    quoteLabel:'ZACH (@ZACK)', quoteKo:'"UI 개선 · 조용/부드러움/자신감 · v10급 하이웨이"', quoteEn:'"UI upgrades feel much better · quiet/smooth/confident · v10-tier highway"',
    source:'Source: Zach on X · 2026.07.20',
    noteHead:'Auto braking lag-free · zero city/school-zone intervenes (owner)', noteSub:'Personal review — quantitative safety gains need separate verification',
    footer:'TSLA FSD v14 Lite · Zach 100mi review', brand:BRAND_EN } },

// 4. FSD Natick Mall Ad
{ file:'fsd-natick-mall-banner', symbol:'TSLA', badge:'TSLA',
  ko:{ title:'FSD 광고 — Natick Mall(뉴잉글랜드 최대) 배너 게시', heroIcon:'🏬', heroBig:'1.6 M sqft', heroSub:'"커피값보다 저렴 · Tesla 매장에서 FSD(Supervised) 체험"',
    cards:[{icon:'☕',big:'"< coffee"',mid:'월 커피값보다 저렴',sub:'가격 프레임'},{icon:'📍',big:'Natick Mall',mid:'뉴잉글랜드 최대 쇼핑몰',sub:'1.6M sqft'},{icon:'🚗',big:'FSD Sup',mid:'Tesla 매장 1층 북쪽',sub:'현장 체험 가능'}],
    quoteLabel:'SAWYER MERRITT · P.S', quoteKo:'"당신의 데일리 커피값보다 저렴 — FSD(Supervised)를 체험하세요"', quoteEn:'"More affordable than your daily coffee. Visit Tesla to experience FSD (Supervised)"',
    source:'Source: Sawyer Merritt · P.S · 2026.07.21',
    noteHead:'B2C 오프라인 마케팅 첫 전면 확장 — 대중 접점 확대', noteSub:'FSD 구독 전환율 데이터가 후속 검증 지표',
    footer:'TSLA FSD · Natick Mall banner', brand:BRAND_KO },
  en:{ title:'FSD Ad — Massive Banner at Natick Mall (Largest in New England)', heroIcon:'🏬', heroBig:'1.6 M sqft', heroSub:'"More affordable than your daily coffee · Visit Tesla to experience FSD"',
    cards:[{icon:'☕',big:'"< coffee"',mid:'Cheaper than daily coffee',sub:'pricing frame'},{icon:'📍',big:'Natick Mall',mid:'Largest NE mall',sub:'1.6M sqft'},{icon:'🚗',big:'FSD Sup',mid:'Tesla store · 1F north',sub:'in-mall demo'}],
    quoteLabel:'SAWYER MERRITT · P.S', quoteKo:'"데일리 커피값보다 저렴 — FSD(Supervised) 체험"', quoteEn:'"More affordable than your daily coffee. Visit Tesla to experience FSD (Supervised)"',
    source:'Source: Sawyer Merritt · P.S · 2026.07.21',
    noteHead:'First major offline B2C marketing push — mass consumer touchpoint', noteSub:'FSD subscription conversion rate is the follow-on verification',
    footer:'TSLA FSD · Natick Mall banner', brand:BRAND_EN } },

// 5. Cybercab × Starlink integrated
{ file:'cybercab-starlink-integrated', symbol:'TSLA', badge:'TSLA·SPCX',
  ko:{ title:'Cybercab — Starlink가 프레임에 통합됐다', heroIcon:'🛰️', heroBig:'INTEGRATED', heroSub:'Cybercab 차체 프레임에 Starlink 안테나 통합 설계 확인',
    cards:[{icon:'🚕',big:'Cybercab',mid:'전용 로보택시',sub:'Starlink 통합 프레임'},{icon:'🛰️',big:'Starlink',mid:'프레임에 내장',sub:'별도 모듈 아님'},{icon:'📡',big:'Always-on',mid:'연결성 상시 확보',sub:'플릿 운영 필수 기반'}],
    quoteLabel:'NIC CRUZ PATANE', quoteKo:'"와, Tesla Cybercab에 SpaceLink(Starlink)가 프레임에 통합됐다"', quoteEn:'"Wow. The Tesla Cybercab has Starlink integrated into the frame"',
    source:'Source: Nic Cruz Patane · 2026.07.20',
    noteHead:'SPCX 인프라를 TSLA 하드웨어에 직접 결합 — Musk-verse 결합의 물리적 근거', noteSub:'주행 데이터·V2X·원격 명령 채널의 안정성 확보 지표',
    footer:'Cybercab × Starlink · frame-integrated', brand:BRAND_KO },
  en:{ title:'Cybercab — Starlink Integrated Into The Frame', heroIcon:'🛰️', heroBig:'INTEGRATED', heroSub:'Cybercab chassis frame integrates Starlink antenna directly',
    cards:[{icon:'🚕',big:'Cybercab',mid:'Purpose-built robotaxi',sub:'Starlink in frame'},{icon:'🛰️',big:'Starlink',mid:'Built into frame',sub:'not add-on module'},{icon:'📡',big:'Always-on',mid:'Persistent connectivity',sub:'fleet ops requirement'}],
    quoteLabel:'NIC CRUZ PATANE', quoteKo:'"Cybercab 프레임에 Starlink 통합"', quoteEn:'"Wow. The Tesla Cybercab has Starlink integrated into the frame"',
    source:'Source: Nic Cruz Patane · 2026.07.20',
    noteHead:'SPCX infra directly built into TSLA HW — physical Musk-verse fusion', noteSub:'Reliability anchor for data offload, V2X, remote command',
    footer:'Cybercab × Starlink · frame-integrated', brand:BRAND_EN } },

// 6. Cybercab Austin 2nd lot
{ file:'cybercab-austin-2ndlot-14', symbol:'TSLA', badge:'TSLA',
  ko:{ title:'Cybercab — 오스틴 두번째 lot에서 14대 목격 · Model Y validation 동수', heroIcon:'📍', heroBig:'2nd LOT · 14', heroSub:'camera washer 장착 validation Model Y 14대와 나란히 관측',
    cards:[{icon:'🚕',big:'14 units',mid:'Cybercab',sub:'오스틴 2nd lot'},{icon:'🚙',big:'~14',mid:'validation Model Y',sub:'camera washer 장착'},{icon:'📍',big:'AUSTIN',mid:'두번째 야드',sub:'생산·테스트 확장'}],
    quoteLabel:'TESLAJOE · SPENCER', quoteKo:'"오스틴 두번째 lot에서 Cybercab 14대 이상 + camera washer 장착 Model Y 비슷한 수 목격"', quoteEn:'"At least 14 Cybercabs and similar number of validation Model Ys with camera washers spotted at a second lot in Austin"',
    source:'Source: TeslaJoe · Spencer · 2026.07.20',
    noteHead:'첫 lot 이후 두번째 배치 실측 — 다양한 build 병행 검증', noteSub:'validation Model Y = FSD 로보택시 이원 플릿 시사',
    footer:'Cybercab · Austin second lot (14+)', brand:BRAND_KO },
  en:{ title:'Cybercab — 14 Spotted at 2nd Austin Lot with Validation Model Ys', heroIcon:'📍', heroBig:'2nd LOT · 14', heroSub:'Similar count of camera-washer Model Ys alongside',
    cards:[{icon:'🚕',big:'14 units',mid:'Cybercabs',sub:'Austin 2nd lot'},{icon:'🚙',big:'~14',mid:'Validation Model Y',sub:'camera washers'},{icon:'📍',big:'AUSTIN',mid:'Second yard',sub:'expanded production'}],
    quoteLabel:'TESLAJOE · SPENCER', quoteKo:'"오스틴 두번째 lot Cybercab 14대 이상 · Model Y 비슷"', quoteEn:'"At least 14 Cybercabs and similar number of validation Model Ys spotted at a second Austin lot"',
    source:'Source: TeslaJoe · Spencer · 2026.07.20',
    noteHead:'Second batch after first lot — multi-build validation in parallel', noteSub:'Validation Model Y suggests dual-fleet robotaxi model',
    footer:'Cybercab · Austin second lot (14+)', brand:BRAND_EN } },

// 7. Giga Berlin 18 GWh
{ file:'giga-berlin-18gwh-14b', symbol:'TSLA', badge:'TSLA',
  ko:{ title:'Giga Berlin — 배터리 18 GWh 확장 · 40,000대 추가 / 5,000 신규 일자리', heroIcon:'🏭', heroBig:'18 GWh', heroSub:'배터리 셀 생산 8→18 GWh · 총 투자 ~$1.4B · Q3 2026부터 7,000대/주',
    cards:[{icon:'🔋',big:'18 GWh',mid:'배터리 셀 capacity',sub:'8 GWh → 18 GWh 상향'},{icon:'💵',big:'$1.4 B',mid:'셀 제조 총 투자',sub:'FY25 Management Report'},{icon:'👷',big:'+5,000',mid:'신규 일자리',sub:'+40,000대/년'}],
    quoteLabel:'TESLA · GIGA BERLIN FY25 REPORT', quoteKo:'"2026 회계연도 생산량 유의미한 증가 예상 · 30개 국가 공급 중 · 추가 시장 개방 계획"', quoteEn:'"Significant increase in production volume for 2026 · currently supplying 30+ markets · will open more"',
    source:'Source: Sawyer Merritt · Giga Berlin FY2025 Management Report (2026.06.25 filed)',
    noteHead:'Q3 2026부터 +30% 생산 확장 · 주간 7,000대 계획', noteSub:'Q3 2026 vehicle sales + energy 사상 최고 예상',
    footer:'TSLA Giga Berlin · 18 GWh · $1.4B', brand:BRAND_KO },
  en:{ title:'Giga Berlin — 18 GWh Battery Expansion · +40,000 cars/yr · 5,000 jobs', heroIcon:'🏭', heroBig:'18 GWh', heroSub:'Cell capacity raised 8→18 GWh · ~$1.4B total invest · 7,000 cars/wk from Q3 2026',
    cards:[{icon:'🔋',big:'18 GWh',mid:'Battery cell capacity',sub:'raised from 8 GWh'},{icon:'💵',big:'$1.4 B',mid:'Total cell invest',sub:'FY25 Mgmt Report'},{icon:'👷',big:'+5,000',mid:'New jobs',sub:'+40,000 cars/yr'}],
    quoteLabel:'TESLA · GIGA BERLIN FY25 REPORT', quoteKo:'"2026 생산량 유의미 증가 · 30개국 공급 · 신규 시장 개방"', quoteEn:'"Significant increase in 2026 production volume · 30+ markets supplied · plans to open more"',
    source:'Source: Sawyer Merritt · Giga Berlin FY2025 Management Report (filed 2026.06.25)',
    noteHead:'+30% output from Q3 2026 · targeting 7,000 cars/week', noteSub:'Q3 2026 vehicle + energy expected to set new records',
    footer:'TSLA Giga Berlin · 18 GWh · $1.4B', brand:BRAND_EN } },

// 8. Model Y Standard Germany €40k
{ file:'model-y-standard-de-40k', symbol:'TSLA', badge:'TSLA',
  ko:{ title:'Model Y Standard — 독일 €40,000 · Premium 대비 €10,000 저렴', heroIcon:'💶', heroBig:'€40,000', heroSub:'Giga Berlin 생산 · 유럽 판매 감소에 대한 저가 대응',
    cards:[{icon:'💶',big:'€40,000',mid:'Model Y Standard 가격',sub:'Premium −€10,000'},{icon:'📉',big:'−18 %',mid:'독일 비교 EV 가격',sub:'2020~ 인플레 조정'},{icon:'📈',big:'+27 %',mid:'같은 기간 내연차 가격',sub:'ICCT/Fraunhofer ISI'}],
    quoteLabel:'MUSKONOMY · ICCT/FRAUNHOFER ISI (VIA REUTERS)', quoteKo:'"독일 EV 중앙값이 €53,000(+42%)로 오르며 저가 시장이 얇아진 자리에 Model Y Standard 진입"', quoteEn:'"Median German EV jumped to ~€53,000 (+42%) as brands pushed pricier models — leaving the affordable end thin"',
    source:'Source: Muskonomy · ICCT and Fraunhofer ISI via Reuters, July 18',
    noteHead:'저가 EV 공백 = Tesla가 채우려는 시장 슬롯', noteSub:'유럽 판매 회복·MoM 데이터 결합 시 실효성 검증',
    footer:'TSLA Model Y Standard · €40k Germany', brand:BRAND_KO },
  en:{ title:'Model Y Standard — €40,000 in Germany · €10k Below Premium', heroIcon:'💶', heroBig:'€40,000', heroSub:'Giga Berlin build · low-price response to slowing EU sales',
    cards:[{icon:'💶',big:'€40,000',mid:'Model Y Standard',sub:'Premium −€10,000'},{icon:'📉',big:'−18 %',mid:'Comparable EV prices',sub:'since 2020, inflation-adj'},{icon:'📈',big:'+27 %',mid:'ICE prices same period',sub:'ICCT/Fraunhofer ISI'}],
    quoteLabel:'MUSKONOMY · ICCT/FRAUNHOFER ISI (VIA REUTERS)', quoteKo:'"독일 EV 중앙값 €53k(+42%) — 저가 시장 얇아진 자리에 Model Y Standard 진입"', quoteEn:'"Median German EV jumped to ~€53,000 (+42%) as brands pushed pricier models — leaving affordable end thin"',
    source:'Source: Muskonomy · ICCT and Fraunhofer ISI via Reuters, July 18',
    noteHead:'Low-price EV void = the slot Tesla is targeting', noteSub:'Verify effectiveness via European sales recovery/MoM data',
    footer:'TSLA Model Y Standard · €40k Germany', brand:BRAND_EN } },

// 9. Starlink × Italy High-speed Rail
{ file:'starlink-italy-highspeed-3b', symbol:'SPCX', badge:'SPCX',
  ko:{ title:'Starlink × 이탈리아 고속열차 — €3B 계약 · 2027 완공', heroIcon:'🚄', heroBig:'€3 B', heroSub:'이탈리아 고속철이 Siemens Velaro MS 26대에 Starlink 통합 (Germany 확장용)',
    cards:[{icon:'🚄',big:'26 trains',mid:'Siemens Velaro MS',sub:'Germany 확장용'},{icon:'💶',big:'€3 B',mid:'총 계약 규모',sub:'~2027 완공'},{icon:'🛰️',big:'Integrated',mid:'제조 단계 통합',sub:'기존 이탈리아 fleet도 2027까지'}],
    quoteLabel:'DOGEDESIGNER', quoteKo:'"고속위성 인터넷을 열차에 · 제조 시점에 안테나 통합 · €3B 계약"', quoteEn:'"High-speed satellite internet on trains · antennas integrated at manufacture · nearly €3B"',
    source:'Source: DogeDesigner · 2026.07.20',
    noteHead:'유럽 대중교통 인프라 Starlink 채택 사례 — B2G 매출축 확대', noteSub:'추가 국가·기존 fleet 리트로핏 로드맵이 후속 트리거',
    footer:'Starlink × Italy HSR · €3B', brand:BRAND_KO },
  en:{ title:'Starlink × Italian High-Speed Rail — €3B · 2027 Completion', heroIcon:'🚄', heroBig:'€3 B', heroSub:'Italian HSR to integrate Starlink on 26 Siemens Velaro MS trains (Germany expansion)',
    cards:[{icon:'🚄',big:'26 trains',mid:'Siemens Velaro MS',sub:'Germany expansion'},{icon:'💶',big:'€3 B',mid:'Total contract',sub:'~2027 completion'},{icon:'🛰️',big:'Integrated',mid:'At manufacturing',sub:'existing IT fleet retrofit by 2027'}],
    quoteLabel:'DOGEDESIGNER', quoteKo:'"고속위성 인터넷 열차 · 제조 통합 · €3B"', quoteEn:'"High-speed satellite internet on trains · antennas integrated at manufacture · nearly €3B"',
    source:'Source: DogeDesigner · 2026.07.20',
    noteHead:'European public-transit Starlink adoption — B2G revenue axis', noteSub:'Watch further countries & retrofit roadmap',
    footer:'Starlink × Italy HSR · €3B', brand:BRAND_EN } },

// 10. Foxconn × SPCX $50B Dojo
{ file:'foxconn-spcx-dojo-50b', symbol:'SPCX', badge:'SPCX',
  ko:{ title:'Foxconn — SPCX 차세대 Dojo QN300 시스템 제조 · $50B 계약', heroIcon:'🔧', heroBig:'$50 B', heroSub:'Foxconn이 $500B/$200B AI 서버 oligopoly에 첫 진입 — SPCX 계약',
    cards:[{icon:'🏭',big:'Foxconn',mid:'AI 서버 첫 진입',sub:'$500B/$200B oligopoly'},{icon:'💾',big:'Dojo QN300',mid:'SPCX 차세대 시스템',sub:'제조 위탁'},{icon:'💵',big:'$50 B',mid:'보도된 계약 규모',sub:'즉시 주요 공급자화'}],
    quoteLabel:'SHAY BOLOOR', quoteKo:'"$50B 규모의 이번 계약이 Foxconn을 즉시 주요 AI 서버 공급자로 자리매김시킨다"', quoteEn:'"The reported $50B deal would immediately establish Foxconn as a major AI server supplier"',
    source:'Source: Shay Boloor · 2026.07.20',
    noteHead:'주의: 스크린샷 원문 인용 · Dojo 브랜드/QN300 스펙은 별도 팩트체크 필요', noteSub:'실 계약·양산 스케줄 확정 시 SPCX/Foxconn 매출 흐름 재추정',
    footer:'Foxconn × SPCX · Dojo QN300 $50B', brand:BRAND_KO },
  en:{ title:'Foxconn — SPCX Next-Gen Dojo QN300 Manufacturing · $50B Deal', heroIcon:'🔧', heroBig:'$50 B', heroSub:'Foxconn breaks into $500B/$200B AI server oligopoly via SPCX win',
    cards:[{icon:'🏭',big:'Foxconn',mid:'First AI-server win',sub:'$500B/$200B oligopoly'},{icon:'💾',big:'Dojo QN300',mid:'SPCX next-gen',sub:'contract manufactured'},{icon:'💵',big:'$50 B',mid:'Reported deal size',sub:'immediate major supplier'}],
    quoteLabel:'SHAY BOLOOR', quoteKo:'"$50B 계약이 Foxconn을 즉시 주요 AI 서버 공급자로"', quoteEn:'"The reported $50B deal would immediately establish Foxconn as a major AI server supplier"',
    source:'Source: Shay Boloor · 2026.07.20',
    noteHead:'Caveat: quoted per screenshot — Dojo brand/QN300 specs need extra fact-check', noteSub:'Re-estimate SPCX/Foxconn revenue flow after contract & schedule confirm',
    footer:'Foxconn × SPCX · Dojo QN300 $50B', brand:BRAND_EN } },

// 11. SPCX Q2 Aug4 + Starship Flight 13
{ file:'spcx-q2-aug4-flight13', symbol:'SPCX', badge:'SPCX',
  ko:{ title:'SPCX — Q2 2026 실적 8월 4일 · Starship Flight 13 발사 확률 88%', heroIcon:'📅', heroBig:'AUG 4', heroSub:'Q2/Q3 2026 결과 오후 3:30 CT audio webcast · Starship 13 8/4 전 발사 확률 88%',
    cards:[{icon:'📅',big:'Aug 4',mid:'실적 발표일',sub:'audio webcast 3:30 CT'},{icon:'🚀',big:'88 %',mid:'Starship Flight 13',sub:'Polymarket 확률'},{icon:'📡',big:'Investor site',mid:'스트리밍/replay 제공',sub:'+X live stream'}],
    quoteLabel:'SPACEX · ARK INVEST TRACKER · POLYMARKET', quoteKo:'"8월 4일 이전 Starship 13번째 비행 발사 확률 88%로 프라이싱"', quoteEn:'"Polymarket pricing an 88% chance SpaceX gets Starship Flight Test 13 off the ground before August 4"',
    source:'Source: SpaceX · Ark Invest Tracker · Polymarket · 2026.07.20',
    noteHead:'실적일 + 발사 이벤트 겹침 = 이벤트 밀도 매우 높은 주간', noteSub:'실적/발사 결과에 따라 short pressure ($6.1B) 재조정 가능성',
    footer:'SPCX · Q2 Aug 4 + Flight 13 88%', brand:BRAND_KO },
  en:{ title:'SPCX — Q2 2026 Earnings Aug 4 · Starship Flight 13 88% Chance', heroIcon:'📅', heroBig:'AUG 4', heroSub:'Results 3:30 CT audio webcast · Flight 13 88% odds to launch before Aug 4',
    cards:[{icon:'📅',big:'Aug 4',mid:'Earnings date',sub:'3:30 CT audio only'},{icon:'🚀',big:'88 %',mid:'Starship Flight 13',sub:'Polymarket odds'},{icon:'📡',big:'Investor site',mid:'webcast + replay',sub:'+X livestream'}],
    quoteLabel:'SPACEX · ARK INVEST TRACKER · POLYMARKET', quoteKo:'"Flight 13 발사 확률 88% (8월 4일 전)"', quoteEn:'"Polymarket pricing an 88% chance SpaceX gets Starship Flight Test 13 off the ground before August 4"',
    source:'Source: SpaceX · Ark Invest Tracker · Polymarket · 2026.07.20',
    noteHead:'Earnings + launch overlap = extremely dense event week', noteSub:'Short pressure ($6.1B) could rebalance depending on outcomes',
    footer:'SPCX · Q2 Aug 4 + Flight 13 88%', brand:BRAND_EN } },

// 12. SPCX retail $320M + Baron $10k + Timmons
{ file:'spcx-retail-320m-baron-timmons', symbol:'SPCX', badge:'SPCX',
  ko:{ title:'SPCX — 개인투자자 유입 $320M/월 (1위) · Baron $10k · Timmons 매수', heroIcon:'💰', heroBig:'$320 M', heroSub:'월 개인 유입 개별종목 압도적 1위 · Ron Baron 10년 $10k 예상 · 의원 매수',
    cards:[{icon:'💰',big:'$320 M',mid:'월 개인 유입',sub:'개별종목 1위 (Barchart)'},{icon:'📈',big:'$10 K',mid:'Ron Baron 10년 예상',sub:'Optimus 덕분'},{icon:'🏛️',big:'≤$250 K',mid:'Rep. Timmons 매수',sub:'Quiver Quantitative'}],
    quoteLabel:'BARCHART · EVA MCMILLAN · QUIVER QUANTITATIVE', quoteKo:'"이번 달 개인 자금이 SPCX에 $320M — 압도적 1위"', quoteEn:'"Retail investors poured $320M into SPCX this month — by far the most of any single stock"',
    source:'Source: Barchart · Eva McMillan · Quiver Quantitative · 2026.07.20',
    noteHead:'하락(-44%)·숏 급증($6.1B)에도 개인 관심 유지 — 밸류 vs 헤드라인 대치', noteSub:'인사이더/의원 매수 흐름이 감성 지표 트리거',
    footer:'SPCX · Retail $320M · Baron $10K · Timmons', brand:BRAND_KO },
  en:{ title:'SPCX — Retail Inflow $320M/mo (#1) · Baron $10K · Timmons Buy', heroIcon:'💰', heroBig:'$320 M', heroSub:'#1 among individual stocks · Baron sees $10K in 10y · Congress buy',
    cards:[{icon:'💰',big:'$320 M',mid:'Monthly retail flow',sub:'#1 stock (Barchart)'},{icon:'📈',big:'$10 K',mid:'Baron 10y forecast',sub:'thanks to Optimus'},{icon:'🏛️',big:'≤$250 K',mid:'Rep. Timmons buy',sub:'Quiver Quantitative'}],
    quoteLabel:'BARCHART · EVA MCMILLAN · QUIVER QUANTITATIVE', quoteKo:'"개인 $320M — 개별종목 압도적 1위"', quoteEn:'"Retail investors poured $320M into SPCX this month — by far the most of any single stock"',
    source:'Source: Barchart · Eva McMillan · Quiver Quantitative · 2026.07.20',
    noteHead:'Retail sticks through -44% and $6.1B short spike — value vs headline standoff', noteSub:'Insider/lawmaker buys act as sentiment triggers',
    footer:'SPCX · Retail $320M · Baron $10K · Timmons', brand:BRAND_EN } },

// 13. MSFT × Kimi K2 Copilot
{ file:'msft-kimi-k2-copilot', symbol:'MSFT', badge:'MSFT',
  ko:{ title:'MSFT — 중국 Kimi K2를 Copilot용으로 Azure 로드 평가', heroIcon:'🤖', heroBig:'Kimi K2', heroSub:'OpenAI/Anthropic 대체 가능성 평가 — The Information · Moonshot GPU 한계로 신규 구독 정지',
    cards:[{icon:'🤖',big:'Kimi K2',mid:'중국 오픈웨이트 모델',sub:'Moonshot AI'},{icon:'⚙️',big:'Copilot',mid:'OpenAI/Anthropic 대체 평가',sub:'Azure에 로드'},{icon:'🚫',big:'GPU 한계',mid:'신규 구독 일시중단',sub:'수요 폭증 · 한국 코딩 1위'}],
    quoteLabel:'THE INFORMATION · WALL ST ENGINE', quoteKo:'"MSFT 엔지니어들이 K2가 현재 OpenAI/Anthropic 모델을 대체할 수 있는지 평가할 예정"', quoteEn:'"Engineers will evaluate whether K2 can power features currently using OpenAI and Anthropic models"',
    source:'Source: Wall St Engine · The Information · 2026.07.20',
    noteHead:'중국 오픈모델의 Big Tech 채택 사례 — 서구 프리미엄 프레임 압박', noteSub:'실제 Copilot 채택 여부·비용 절감 규모가 후속 검증',
    footer:'MSFT × Kimi K2 · Copilot evaluation', brand:BRAND_KO },
  en:{ title:'MSFT — Loading China\'s Kimi K2 to Azure for Copilot Trial', heroIcon:'🤖', heroBig:'Kimi K2', heroSub:'Evaluate as OpenAI/Anthropic replacement — The Information · Moonshot paused new subs on GPU limit',
    cards:[{icon:'🤖',big:'Kimi K2',mid:'Chinese open-weight',sub:'by Moonshot AI'},{icon:'⚙️',big:'Copilot',mid:'Replace OpenAI/Anthropic?',sub:'loaded to Azure'},{icon:'🚫',big:'GPU cap',mid:'New subs paused',sub:'demand surge · KR coding #1'}],
    quoteLabel:'THE INFORMATION · WALL ST ENGINE', quoteKo:'"MSFT 엔지니어들이 K2로 OpenAI/Anthropic 대체 가능성 평가"', quoteEn:'"Engineers will evaluate whether K2 can power features currently using OpenAI and Anthropic models"',
    source:'Source: Wall St Engine · The Information · 2026.07.20',
    noteHead:'Chinese open-model getting Big Tech adoption — pressure on Western premium', noteSub:'Actual Copilot uptake & cost savings are follow-on validation',
    footer:'MSFT × Kimi K2 · Copilot evaluation', brand:BRAND_EN } },

// 14. NVDA × MSFT AI RAN 2028
{ file:'nvda-msft-ai-ran-2028', symbol:'NVDA', badge:'NVDA',
  ko:{ title:'NVDA × MSFT — AI 기반 RAN 파트너십 · 2028 배포 · 탄소·지연 90% 절감', heroIcon:'📡', heroBig:'AI-RAN', heroSub:'차세대 대역 · GPU 최적화 · 에지 AI 확장 · SW-defined',
    cards:[{icon:'📡',big:'AI-RAN',mid:'차세대 무선접속망',sub:'2028 배포 목표'},{icon:'🌱',big:'−90 %',mid:'탄소·지연 절감 목표',sub:'AI-driven RAN'},{icon:'⚙️',big:'GPU-opt',mid:'SW-defined 시스템',sub:'네트워크 에지 AI 확장'}],
    quoteLabel:'NEX SHARES', quoteKo:'"MSFT/NVDA가 차세대 대역폭을 겨냥한 AI 기반 RAN 프로젝트 공개 · SW-defined 시스템"', quoteEn:'"NVDA and MSFT unveiled an AI-driven RAN project delivering next-generation baseband spectrum by 2028"',
    source:'Source: NEX Shares · 2026.07.20',
    noteHead:'통신 인프라 AI 침투 사례 — NVDA 데이터센터 외 새 매출축', noteSub:'통신사 채택 로드맵·상용 배포 시점이 트리거',
    footer:'NVDA × MSFT · AI-RAN 2028', brand:BRAND_KO },
  en:{ title:'NVDA × MSFT — AI-Driven RAN Partnership · 2028 · 90% Carbon/Latency Cut', heroIcon:'📡', heroBig:'AI-RAN', heroSub:'Next-gen baseband · GPU-optimized · Edge AI expansion · SW-defined',
    cards:[{icon:'📡',big:'AI-RAN',mid:'Next-gen radio access',sub:'2028 target'},{icon:'🌱',big:'−90 %',mid:'Carbon/latency cut',sub:'AI-driven RAN'},{icon:'⚙️',big:'GPU-opt',mid:'SW-defined system',sub:'edge AI expansion'}],
    quoteLabel:'NEX SHARES', quoteKo:'"MSFT/NVDA 차세대 대역폭 AI RAN 프로젝트"', quoteEn:'"NVDA and MSFT unveiled an AI-driven RAN project delivering next-gen baseband spectrum by 2028"',
    source:'Source: NEX Shares · 2026.07.20',
    noteHead:'AI infiltrates telecom infra — new NVDA revenue axis beyond DC', noteSub:'Carrier adoption roadmap & commercial deployment are triggers',
    footer:'NVDA × MSFT · AI-RAN 2028', brand:BRAND_EN } },

// 15. GOOGL Gemini chip 2028
{ file:'googl-gemini-chip-2028', symbol:'GOOGL', badge:'GOOGL',
  ko:{ title:'Google — Gemini 청사진 내장 신규 서버 칩 · 2028 배포 목표', heroIcon:'🧊', heroBig:'2028', heroSub:'Gemini AI 모델 청사진을 직접 통합해 훨씬 효율적으로 서비스',
    cards:[{icon:'🧊',big:'New chip',mid:'서버용 칩',sub:'Google 내부 개발'},{icon:'🧠',big:'Gemini',mid:'모델 청사진 통합',sub:'inference 최적화'},{icon:'📅',big:'2028',mid:'배포 목표',sub:'The Information'}],
    quoteLabel:'THE INFORMATION · SAWYER MERRITT', quoteKo:'"Google이 Gemini AI 모델 청사진을 직접 통합한 새 서버 칩 개발 · 2028 배포 목표"', quoteEn:'"Google is working on a new server chip that would directly integrate the blueprint of its Gemini AI model · targeting deployment as early as 2028"',
    source:'Source: Sawyer Merritt · The Information · 2026.07.20',
    noteHead:'TPU 계열과 별개 · 인퍼런스 원가 구조 재설계 시도', noteSub:'NVDA 의존도 감소 vs 자체 칩 R&D 부담의 트레이드오프',
    footer:'GOOGL · Gemini-integrated server chip 2028', brand:BRAND_KO },
  en:{ title:'Google — New Server Chip With Gemini Blueprint Built-In · 2028', heroIcon:'🧊', heroBig:'2028', heroSub:'Directly integrates Gemini AI model blueprint for far more efficient serving',
    cards:[{icon:'🧊',big:'New chip',mid:'Server chip',sub:'Google in-house'},{icon:'🧠',big:'Gemini',mid:'Model blueprint built-in',sub:'inference-optimized'},{icon:'📅',big:'2028',mid:'Deploy target',sub:'The Information'}],
    quoteLabel:'THE INFORMATION · SAWYER MERRITT', quoteKo:'"Google Gemini 청사진 내장 서버 칩 · 2028 배포 목표"', quoteEn:'"Google is working on a new server chip integrating its Gemini AI model blueprint · targeting deployment as early as 2028"',
    source:'Source: Sawyer Merritt · The Information · 2026.07.20',
    noteHead:'Separate from TPU line · redesigning inference cost structure', noteSub:'Trade-off: NVDA dependency reduction vs in-house R&D cost',
    footer:'GOOGL · Gemini-integrated server chip 2028', brand:BRAND_EN } },

// 16. US-China AI investment gap
{ file:'us-china-ai-invest-gap', symbol:'MACRO', badge:'MACRO',
  ko:{ title:'미-중 AI 투자 격차 — 표면 23배지만 국가주도 포함 시 1.4배', heroIcon:'🌐', heroBig:'23 × → 1.4 ×', heroSub:'표면 $265.5B vs $12.4B · 국가주도 $184B(중국) 포함시 격차 급감',
    cards:[{icon:'🇺🇸',big:'$265.5 B',mid:'미국 민간 AI 투자 2025',sub:'Stanford 2026 AI Index'},{icon:'🇨🇳',big:'$12.4 B',mid:'중국 민간 투자 (표면)',sub:'+국가주도 $184B(2000~)'},{icon:'📊',big:'$95.5 M',mid:'평균 딜 크기 +65%',sub:'$1B+ 라운드 11→28'}],
    quoteLabel:'BULL THEORY · SOCIÉTÉ GÉNÉRALE · STANFORD 2026 AI INDEX', quoteKo:'"중국은 지출을 감추고, 미국은 몇 안 되는 회사에 자본이 집중된다"', quoteEn:'"China hides how much it actually spends; the US shows everything, and it lands on the same few companies"',
    source:'Source: Bull Theory · Stanford 2026 AI Index Report · Société Générale · 2026.07.20',
    noteHead:'구글 하나가 인프라 $150B+ 지출 · 하이퍼스케일러가 시장 흡수', noteSub:'중국 국가 자금 실측·미국 신규 스타트업 자금 21.3% 감소 조합',
    footer:'MACRO · US-China AI Invest Gap', brand:BRAND_KO },
  en:{ title:'US-China AI Investment Gap — 23× on Surface, 1.4× with State Funding', heroIcon:'🌐', heroBig:'23 × → 1.4 ×', heroSub:'US $265.5B vs China $12.4B · Chinese $184B state funding cuts gap',
    cards:[{icon:'🇺🇸',big:'$265.5 B',mid:'US private AI 2025',sub:'Stanford 2026 AI Index'},{icon:'🇨🇳',big:'$12.4 B',mid:'China private (surface)',sub:'+$184B state (since 2000)'},{icon:'📊',big:'$95.5 M',mid:'Avg deal +65%',sub:'$1B+ rounds 11→28'}],
    quoteLabel:'BULL THEORY · SOCIÉTÉ GÉNÉRALE · STANFORD 2026 AI INDEX', quoteKo:'"중국은 지출을 감추고, 미국은 소수 대기업에 자본이 집중"', quoteEn:'"China hides how much it spends; US shows everything and it lands on the same few companies"',
    source:'Source: Bull Theory · Stanford 2026 AI Index · Société Générale · 2026.07.20',
    noteHead:'Google alone spends $150B+ on infra · hyperscalers absorb the market', noteSub:'Combine with 21.3% drop in newly funded AI cos in US',
    footer:'MACRO · US-China AI Invest Gap', brand:BRAND_EN } },
];

let written = 0;
for (const t of T) {
  const koWith = { ...t.ko, symbol: t.symbol };
  const enWith = { ...t.en, symbol: t.symbol };
  fs.writeFileSync(path.join(OUT, `${t.file}-20260721.svg`),    tpl(koWith));
  fs.writeFileSync(path.join(OUT, `${t.file}-20260721-en.svg`), tpl(enWith));
  written += 2;
}
console.log(`✅ ${written} SVG 파일 생성 완료 (${T.length} topics × KO/EN)`);
