// 2026-07-18 리포트 SVG 생성기 — 7월 2일자 스타일 통일
// 실행: node scripts/gen-reports-20260718.js
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.07.18';

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
// 1. TSLA FSD 12B miles crossed
{ file:'tsla-fsd-12b-crossed', color:'mint', badge:'TSLA',
  ko:{ title:'TSLA FSD — 120억 마일 돌파 확정', heroIcon:'🛣️', heroBig:'12,002,485,572', heroSub:'FSD (Supervised) 누적 주행거리 · 도시 도로 45.3억 마일',
    cards:[{icon:'🌍',big:'12.00 B',mid:'Total FSD miles',sub:'2026.07.17 세이프티'},{icon:'🏙️',big:'4.53 B',mid:'City miles',sub:'City Miles Driven'},{icon:'📆',big:'6월 8일',mid:'11B 돌파일',sub:'약 40일만에 +1B'}],
    quoteLabel:'FLEET SCALE-UP', quoteKo:'"하루 약 3,000만 마일 추가 — 연초 1,400만 대비 2배 이상"', quoteEn:'"Fleet now adds ~30M miles/day, up from ~14M at year start"',
    source:'Source: Muskmoney · Whole Mars Catalog · Tesla Safety Report · 2026.07.17',
    noteHead:'각 10억 마일 도달 속도가 계속 짧아지고 있음', noteSub:'대규모 무감독 준비 여부의 정량 근거로 인용됨',
    footer:'TSLA FSD · 12 Billion Miles Crossed', brand:BRAND_KO },
  en:{ title:'TSLA FSD — 12 Billion Miles Crossed', heroIcon:'🛣️', heroBig:'12,002,485,572', heroSub:'FSD (Supervised) miles · city miles 4.53B',
    cards:[{icon:'🌍',big:'12.00 B',mid:'Total FSD miles',sub:'2026.07.17 safety'},{icon:'🏙️',big:'4.53 B',mid:'City miles',sub:'City Miles Driven'},{icon:'📆',big:'Jun 8',mid:'Prior 11B mark',sub:'~40 days · +1B'}],
    quoteLabel:'FLEET SCALE-UP', quoteKo:'"하루 3천만 마일 추가"', quoteEn:'"Adding ~30M miles per day, up from ~14M at start of year"',
    source:'Source: Muskmoney · Whole Mars Catalog · Tesla Safety Report · 2026.07.17',
    noteHead:'Each additional billion arriving faster than the last', noteSub:'Cited as quantitative proof for large-scale unsupervised readiness',
    footer:'TSLA FSD · 12 Billion Miles Crossed', brand:BRAND_EN } },

// 2. META × Anthropic $10B
{ file:'meta-anthropic-10b-deal', color:'blue', badge:'META',
  ko:{ title:'META × Anthropic — 최대 $10B / 2년 컴퓨팅 딜', heroIcon:'🧠', heroBig:'$10 B', heroSub:'Meta가 Anthropic에 AI 컴퓨팅 capacity 임대 · 2년 계약',
    cards:[{icon:'💰',big:'$10 B',mid:'딜 규모(최대)',sub:'up to · 2 years'},{icon:'⚙️',big:'Compute',mid:'Meta → Anthropic',sub:'AI infra 임대'},{icon:'📈',big:'신규매출',mid:'Meta 새 수익원',sub:'neocloud 사업 진입'}],
    quoteLabel:'NEW YORK TIMES', quoteKo:'"Meta가 Anthropic과 최대 $10B/2년 컴퓨팅 임대 협상 중"', quoteEn:'"Meta in talks to lease compute to Anthropic in deal worth up to $10B/2y"',
    source:'Source: Sam Badawi / NYT · SmackAndM · 2026.07.17–18',
    noteHead:'AWS 임원 Dave Brown 영입과 결합된 클라우드 사업 진입 신호', noteSub:'단기 FCF 압박 vs 장기 매출원 트레이드오프 논의',
    footer:'META × Anthropic Compute Lease · $10B', brand:BRAND_KO },
  en:{ title:'META × Anthropic — Up To $10B / 2Y Compute Deal', heroIcon:'🧠', heroBig:'$10 B', heroSub:'Meta reportedly leasing AI compute to Anthropic · 2-year term',
    cards:[{icon:'💰',big:'$10 B',mid:'Deal size (up to)',sub:'2-year term'},{icon:'⚙️',big:'Compute',mid:'Meta → Anthropic',sub:'AI infra lease'},{icon:'📈',big:'New rev',mid:'Meta enters neocloud',sub:'monetize capex'}],
    quoteLabel:'NEW YORK TIMES', quoteKo:'"Meta ↔ Anthropic 최대 $10B/2년 컴퓨팅 임대"', quoteEn:'"Meta in talks to lease compute to Anthropic in deal worth up to $10B/2y"',
    source:'Source: Sam Badawi / NYT · SmackAndM · 2026.07.17–18',
    noteHead:'Combined with AWS exec hire — signaling cloud pivot', noteSub:'Near-term FCF pressure vs long-term revenue stream',
    footer:'META × Anthropic Compute Lease · $10B', brand:BRAND_EN } },

// 3. META hires Dave Brown from AWS
{ file:'meta-aws-hire-brown', color:'blue', badge:'META',
  ko:{ title:'META — AWS 최고 임원 Dave Brown 영입', heroIcon:'🤝', heroBig:'Dave Brown', heroSub:'AWS 20년 커리어 · Meta 데이터센터 인프라 총괄로 합류',
    cards:[{icon:'👤',big:'Dave Brown',mid:'AWS 시니어 임원',sub:'20년 커리어'},{icon:'🏢',big:'AWS → Meta',mid:'이직',sub:'Head of Infra 보고선'},{icon:'🏭',big:'DC build-out',mid:'담당 업무',sub:'데이터센터 확장 총괄'}],
    quoteLabel:'WSJ', quoteKo:'"AWS 최고 임원 중 한 명이 Meta 데이터센터 확장을 책임진다"', quoteEn:'"One of AWS most senior execs will lead Meta datacenter build-out"',
    source:'Source: Evan S / WSJ · 2026.07.17',
    noteHead:'Meta의 CAPEX 확장 사이클 실행력을 강화하는 인사', noteSub:'Anthropic 딜과 함께 클라우드/컴퓨트 사업 본격화 시그널',
    footer:'META hires AWS Dave Brown', brand:BRAND_KO },
  en:{ title:'META Hires AWS Senior Exec Dave Brown', heroIcon:'🤝', heroBig:'Dave Brown', heroSub:'20-year AWS veteran to lead Meta datacenter build-out',
    cards:[{icon:'👤',big:'Dave Brown',mid:'Senior AWS exec',sub:'20 yrs at AWS'},{icon:'🏢',big:'AWS → Meta',mid:'Move',sub:'reports to Head of Infra'},{icon:'🏭',big:'DC build-out',mid:'Scope',sub:'DC expansion lead'}],
    quoteLabel:'WSJ', quoteKo:'"AWS 최고 임원이 Meta 데이터센터 확장 총괄"', quoteEn:'"One of AWS most senior execs will lead Meta datacenter build-out"',
    source:'Source: Evan S / WSJ · 2026.07.17',
    noteHead:'Reinforces execution capacity for Meta capex cycle', noteSub:'Combined with Anthropic deal — cloud/compute pivot signal',
    footer:'META hires AWS Dave Brown', brand:BRAND_EN } },

// 4. AAPL Most Valuable
{ file:'aapl-most-valuable-4t9', color:'red', badge:'AAPL',
  ko:{ title:'AAPL — 세계 최대 시총 탈환 · $4.92T', heroIcon:'🍎', heroBig:'$4.92 T', heroSub:'NVDA $4.86T를 아침 거래에서 추월 · 세계 최대 기업',
    cards:[{icon:'🥇',big:'$4.92 T',mid:'AAPL 시가총액',sub:'Barchart 아침 거래'},{icon:'🥈',big:'$4.86 T',mid:'NVDA 시가총액',sub:'2위'},{icon:'🥉',big:'$4.20 T',mid:'GOOGL 시가총액',sub:'3위'}],
    quoteLabel:'MARKET CAP RANK', quoteKo:'"AAPL이 NVDA를 아침 거래에서 재역전"', quoteEn:'"AAPL surpasses NVDA as the world\'s most valuable company"',
    source:'Source: Barchart · Michael Burry Track · 2026.07.17–18',
    noteHead:'중국 Apple Intelligence 승인 촉매 이후 리레이팅', noteSub:'MSFT $3.99T · AMZN $2.66T · Big Tech 상위권 재편',
    footer:'AAPL #1 by Market Cap · $4.92T', brand:BRAND_KO },
  en:{ title:'AAPL — Reclaims #1 Market Cap · $4.92T', heroIcon:'🍎', heroBig:'$4.92 T', heroSub:'Passed NVDA $4.86T in early hours · world\'s most valuable',
    cards:[{icon:'🥇',big:'$4.92 T',mid:'AAPL market cap',sub:'Barchart AM'},{icon:'🥈',big:'$4.86 T',mid:'NVDA market cap',sub:'#2'},{icon:'🥉',big:'$4.20 T',mid:'GOOGL market cap',sub:'#3'}],
    quoteLabel:'MARKET CAP RANK', quoteKo:'"AAPL이 NVDA를 아침 거래에서 추월"', quoteEn:'"AAPL surpasses NVDA as world\'s most valuable company"',
    source:'Source: Barchart · Michael Burry Track · 2026.07.17–18',
    noteHead:'Follows China Apple Intelligence approval re-rating', noteSub:'MSFT $3.99T · AMZN $2.66T · Big Tech reshuffle',
    footer:'AAPL #1 by Market Cap · $4.92T', brand:BRAND_EN } },

// 5. SPCX × Pentagon
{ file:'spcx-pentagon-datacenter', color:'purple', badge:'SPCX',
  ko:{ title:'SPCX × 美 국방부 — 수십억 달러 DC 협상', heroIcon:'🛡️', heroBig:'$$$ B', heroSub:'SpaceX가 미 국방부에 데이터센터 capacity 제공 협상 중',
    cards:[{icon:'🇺🇸',big:'DoD',mid:'거래 상대',sub:'US Pentagon'},{icon:'🖥️',big:'DC',mid:'제공 자원',sub:'compute capacity'},{icon:'💵',big:'$$$B',mid:'딜 규모',sub:'billions of $ - WSJ'}],
    quoteLabel:'WSJ / KALSHI', quoteKo:'"SpaceX가 국방부에 AI 모델 실행용 DC capacity 제공 협상"', quoteEn:'"SpaceX in talks with DoD to provide DC capacity for AI models"',
    source:'Source: WSJ · Evan S · Kalshi · Whale Insider · 2026.07.17',
    noteHead:'sovereign AI 발주 확산과 맞물린 SPCX 신규 매출 축', noteSub:'Starlink/AI1 인프라 → 국방 컴퓨트로 확장 시나리오',
    footer:'SPCX × US DoD · Datacenter Talks', brand:BRAND_KO },
  en:{ title:'SPCX × US DoD — Multi-Billion DC Talks', heroIcon:'🛡️', heroBig:'$$$ B', heroSub:'SpaceX in talks to provide DC capacity to US Pentagon',
    cards:[{icon:'🇺🇸',big:'DoD',mid:'Counterparty',sub:'US Pentagon'},{icon:'🖥️',big:'DC',mid:'Resource',sub:'compute capacity'},{icon:'💵',big:'$$$B',mid:'Deal size',sub:'billions of $ - WSJ'}],
    quoteLabel:'WSJ / KALSHI', quoteKo:'"SpaceX ↔ DoD 데이터센터 협상"', quoteEn:'"SpaceX in talks with DoD to provide compute for AI models"',
    source:'Source: WSJ · Evan S · Kalshi · Whale Insider · 2026.07.17',
    noteHead:'Fits sovereign AI theme — new SPCX revenue axis', noteSub:'Starlink/AI1 infra scaling into defense compute',
    footer:'SPCX × US DoD · Datacenter Talks', brand:BRAND_EN } },

// 6. SPCX × NASA Moon
{ file:'spcx-nasa-moon-pathway', color:'purple', badge:'SPCX',
  ko:{ title:'SPCX — NASA 달 복귀 Pathway 선정', heroIcon:'🚀', heroBig:'MOON', heroSub:'NASA가 SpaceX Starship을 달 복귀 경로에 선택',
    cards:[{icon:'🌙',big:'MOON',mid:'미션 대상',sub:'달 복귀'},{icon:'🚀',big:'Starship',mid:'선정 로켓',sub:'Starship HLS'},{icon:'🏛️',big:'NASA',mid:'발주 기관',sub:'미국 항공우주국'}],
    quoteLabel:'ELON MUSK', quoteKo:'"NASA가 SpaceX Starship을 달 복귀 pathway로 선택했다"', quoteEn:'"Starship has been chosen by NASA for the pathway back to the moon"',
    source:'Source: Sawyer Merritt · Elon Musk · 2026.07.17',
    noteHead:'Artemis 지연 리스크 vs Starship 재사용 경제성 재조명', noteSub:'Blue Origin/BE-4 대비 경쟁 구도 변화 관찰 필요',
    footer:'SPCX Starship · NASA Moon Pathway', brand:BRAND_KO },
  en:{ title:'SPCX — Starship Chosen for NASA Moon Pathway', heroIcon:'🚀', heroBig:'MOON', heroSub:'NASA selects SpaceX Starship for return-to-moon pathway',
    cards:[{icon:'🌙',big:'MOON',mid:'Mission',sub:'return to moon'},{icon:'🚀',big:'Starship',mid:'Rocket',sub:'Starship HLS'},{icon:'🏛️',big:'NASA',mid:'Agency',sub:'US space agency'}],
    quoteLabel:'ELON MUSK', quoteKo:'"NASA가 Starship을 달 복귀 pathway로 선택"', quoteEn:'"Starship has been chosen by NASA for the pathway back to the moon"',
    source:'Source: Sawyer Merritt · Elon Musk · 2026.07.17',
    noteHead:'Reframes Artemis delays vs Starship reuse economics', noteSub:'Watch competitive dynamics vs Blue Origin/BE-4',
    footer:'SPCX Starship · NASA Moon Pathway', brand:BRAND_EN } },

// 7. NVDA Rubin NVL72 950kW
{ file:'nvda-rubin-nvl72-950kw', color:'blue', badge:'NVDA',
  ko:{ title:'NVDA NVL72 Rubin — 랙 평균 소비 950 kW', heroIcon:'⚡', heroBig:'~950 kW', heroSub:'24시간 추론 시 GPU 평균 전력은 피크의 약 2/3',
    cards:[{icon:'⚡',big:'~950 kW',mid:'평균 소비',sub:'24h 추론 기준'},{icon:'📈',big:'Peak',mid:'피크의 ~2/3',sub:'평균 전력'},{icon:'🛰️',big:'AI1 대응',mid:'SPCX 위성',sub:'250 kW 피크 스펙'}],
    quoteLabel:'ELON MUSK', quoteKo:'"24h 추론 평균 GPU 전력은 피크의 약 2/3"', quoteEn:'"24h inference avg GPU power is ~2/3 of peak"',
    source:'Source: Elon Musk · Whole Mars Catalog · Aaron Burnett · 2026.07.17',
    noteHead:'지상 Rubin 랙 950 kW · SPCX AI1 위성 250 kW로 도전', noteSub:'평균 전력이 실 운영 원가와 냉각 인프라 규모 결정',
    footer:'NVDA NVL72 Rubin · ~950 kW avg', brand:BRAND_KO },
  en:{ title:'NVDA NVL72 Rubin — ~950 kW Rack Average', heroIcon:'⚡', heroBig:'~950 kW', heroSub:'24h inference avg GPU power ~2/3 of peak',
    cards:[{icon:'⚡',big:'~950 kW',mid:'Rack avg',sub:'24h inference basis'},{icon:'📈',big:'Peak',mid:'~2/3 → avg',sub:'thermal ratio'},{icon:'🛰️',big:'AI1 match',mid:'SPCX satellite',sub:'250 kW peak spec'}],
    quoteLabel:'ELON MUSK', quoteKo:'"24h 추론 평균 = 피크의 ~2/3"', quoteEn:'"24h inference avg GPU power is ~2/3 of peak"',
    source:'Source: Elon Musk · Whole Mars Catalog · Aaron Burnett · 2026.07.17',
    noteHead:'Terrestrial Rubin 950 kW rack vs SPCX AI1 250 kW peak', noteSub:'Avg power drives ops cost and cooling infra scale',
    footer:'NVDA NVL72 Rubin · ~950 kW avg', brand:BRAND_EN } },

// 8. TSLA Cybercab Austin Hire
{ file:'tsla-cybercab-austin-hire', color:'mint', badge:'TSLA',
  ko:{ title:'TSLA Cybercab — 오스틴 사출성형 감독자 채용', heroIcon:'🏭', heroBig:'AUSTIN', heroSub:'Cybercab injection molding 감독자 · 텍사스 오스틴 근무',
    cards:[{icon:'📍',big:'AUSTIN',mid:'근무지',sub:'Texas · Gigafactory'},{icon:'🔧',big:'Injection',mid:'사출성형 관리',sub:'stamping dies·tools'},{icon:'👷',big:'Senior Supr',mid:'채용 포지션',sub:'AI Sr Supervisor'}],
    quoteLabel:'TESLA CAREERS', quoteKo:'"Cybercab 사출성형 감독자 — 텍사스 오스틴"', quoteEn:'"Sr Supervisor for Cybercab injection molding operations in Austin"',
    source:'Source: Tesla2u · Tesla Careers · 2026.07.17',
    noteHead:'양산 준비 신호 — 오스틴 라인 구축 가속화 근거', noteSub:'실제 sample-line 가동 시점·SOP 목표가 후속 트래킹 포인트',
    footer:'TSLA Cybercab · Austin Injection Molding', brand:BRAND_KO },
  en:{ title:'TSLA Cybercab — Austin Injection Molding Hire', heroIcon:'🏭', heroBig:'AUSTIN', heroSub:'Cybercab injection molding Sr Supervisor · Austin, TX',
    cards:[{icon:'📍',big:'AUSTIN',mid:'Location',sub:'Texas · Giga'},{icon:'🔧',big:'Injection',mid:'Molding ops mgmt',sub:'stamping dies·tools'},{icon:'👷',big:'Senior Supr',mid:'Role',sub:'AI Sr Supervisor'}],
    quoteLabel:'TESLA CAREERS', quoteKo:'"Cybercab 사출성형 감독자 — 오스틴"', quoteEn:'"Sr Supervisor for Cybercab injection molding operations in Austin"',
    source:'Source: Tesla2u · Tesla Careers · 2026.07.17',
    noteHead:'Production-prep signal — Austin line ramp evidence', noteSub:'Watch sample-line start & SOP target as next trackers',
    footer:'TSLA Cybercab · Austin Injection Molding', brand:BRAND_EN } },

// 9. TSLA FSD Germany
{ file:'tsla-fsd-germany-path', color:'mint', badge:'TSLA',
  ko:{ title:'TSLA FSD — 독일 승인 프로세스 진전', heroIcon:'🇩🇪', heroBig:'KBA', heroSub:'교통부 차관 확인 · KBA 안전성 평가 · 7월 독립 테스트',
    cards:[{icon:'🛡️',big:'KBA',mid:'안전성 평가 중',sub:'교통안전청'},{icon:'📅',big:'7월',mid:'독립 시스템 테스트',sub:'Tesla 차량 제공'},{icon:'🇪🇺',big:'EU vote',mid:'최종 결정 조건',sub:'유럽 전체 표결'}],
    quoteLabel:'GERMAN MOT', quoteKo:'"Christian Hirte(교통부 차관): FSD(Supervised) 승인 3단계 확인"', quoteEn:'"State Sec Hirte clarified FSD (Supervised) approval path in Germany"',
    source:'Source: The Tesla Newswire · 2026.07.17',
    noteHead:'벨기에·네덜란드 이후 EU 확산 스텝의 정공법 트랙', noteSub:'EU 표결 통과가 프리미엄 마진 활성화의 마지막 관문',
    footer:'TSLA FSD · Germany Approval Path', brand:BRAND_KO },
  en:{ title:'TSLA FSD — German Approval Path Advances', heroIcon:'🇩🇪', heroBig:'KBA', heroSub:'State Sec confirms · KBA safety review · July independent test',
    cards:[{icon:'🛡️',big:'KBA',mid:'Safety review',sub:'Federal MTV agency'},{icon:'📅',big:'July',mid:'Independent test',sub:'Tesla to provide car'},{icon:'🇪🇺',big:'EU vote',mid:'Final gating',sub:'Europe-wide vote'}],
    quoteLabel:'GERMAN MOT', quoteKo:'"교통부 차관이 승인 경로 확정"', quoteEn:'"State Sec Hirte clarified FSD (Supervised) approval path in Germany"',
    source:'Source: The Tesla Newswire · 2026.07.17',
    noteHead:'Textbook next step after Belgium/Netherlands rollout', noteSub:'EU vote is the gate for premium margin activation',
    footer:'TSLA FSD · Germany Approval Path', brand:BRAND_EN } },

// 10. TSLA Latvia
{ file:'tsla-latvia-entry', color:'mint', badge:'TSLA',
  ko:{ title:'TSLA — 라트비아 공식 진출', heroIcon:'🇱🇻', heroBig:'RIGA', heroSub:'Model 3/Y 리가 직접 판매 시작 · 정부 인센티브 결합',
    cards:[{icon:'💶',big:'€4,000',mid:'신차 EV 보조금',sub:'€2,000 중고+폐차'},{icon:'📊',big:'34 %',mid:'인센티브 활용률',sub:'라트비아 EV 구매'},{icon:'🔌',big:'2,051',mid:'충전소(2025)',sub:'YoY +77%'}],
    quoteLabel:'ENTRY NOTE', quoteKo:'"Tesla 라트비아 직접 판매 개시 — Model 3/Y부터"', quoteEn:'"Tesla officially entering Latvia — Model 3/Y at launch"',
    source:'Source: Sawyer Merritt · 2026.07.17',
    noteHead:'디젤/가솔린 세금 인상 + 충전 인프라 확장의 삼각 촉매', noteSub:'EU FSD 상용화 로드맵과 결합 시 마진 개선 여지',
    footer:'TSLA · Latvia Entry', brand:BRAND_KO },
  en:{ title:'TSLA — Officially Enters Latvia', heroIcon:'🇱🇻', heroBig:'RIGA', heroSub:'Model 3/Y direct sales in Riga · combined with gov incentives',
    cards:[{icon:'💶',big:'€4,000',mid:'New EV grant',sub:'€2,000 used+scrap'},{icon:'📊',big:'34 %',mid:'Incentive uptake',sub:'of Latvia EV buys'},{icon:'🔌',big:'2,051',mid:'Charging stns (2025)',sub:'YoY +77%'}],
    quoteLabel:'ENTRY NOTE', quoteKo:'"Tesla 라트비아 직접 판매 개시"', quoteEn:'"Tesla officially entering Latvia — Model 3/Y at launch"',
    source:'Source: Sawyer Merritt · 2026.07.17',
    noteHead:'Diesel/gas tax hikes + charging build-out = triple tailwind', noteSub:'Margin upside stacks with EU FSD monetization roadmap',
    footer:'TSLA · Latvia Entry', brand:BRAND_EN } },

// 11. Global EV 2M/month
{ file:'global-ev-2m-month', color:'mint', badge:'EV',
  ko:{ title:'글로벌 EV 판매 — 월 200만 대 최초 돌파', heroIcon:'🌐', heroBig:'2.0 M', heroSub:'월간 EV 판매 첫 200만대 · 유럽 Tesla +37% 견인',
    cards:[{icon:'🌐',big:'2.0 M',mid:'월 판매(최초)',sub:'글로벌 EV'},{icon:'🇪🇺',big:'+37 %',mid:'Tesla 유럽 판매',sub:'YoY'},{icon:'🚗',big:'Model Y',mid:'견인 모델',sub:'신형 리프레시'}],
    quoteLabel:'MARKET DATA', quoteKo:'"신형 Model Y가 유럽 EV 성장 주도"', quoteEn:'"All-new Model Y is leading Europe\'s EV growth"',
    source:'Source: James Stephenson · 2026.07.17',
    noteHead:'월 2M 임계 돌파 — 침투율 곡선의 변곡점 시그널', noteSub:'중국·미국 리테일 데이터가 후속 실측 트랙',
    footer:'Global EV · 2M/month milestone', brand:BRAND_KO },
  en:{ title:'Global EV Sales — First 2M/Month', heroIcon:'🌐', heroBig:'2.0 M', heroSub:'First-ever 2M EVs in a month · Tesla Europe +37% led',
    cards:[{icon:'🌐',big:'2.0 M',mid:'Monthly (first)',sub:'Global EV sales'},{icon:'🇪🇺',big:'+37 %',mid:'Tesla Europe',sub:'YoY'},{icon:'🚗',big:'Model Y',mid:'Lead model',sub:'refreshed variant'}],
    quoteLabel:'MARKET DATA', quoteKo:'"신형 Model Y가 유럽 EV 성장 주도"', quoteEn:'"All-new Model Y is leading Europe\'s EV growth"',
    source:'Source: James Stephenson · 2026.07.17',
    noteHead:'2M threshold crossed — inflection signal on penetration', noteSub:'Watch China/US retail data as next verification',
    footer:'Global EV · 2M/month milestone', brand:BRAND_EN } },

// 12. NFLX Q2 2026
{ file:'nflx-q2-2026', color:'orange', badge:'NFLX',
  ko:{ title:'NFLX Q2 2026 — 매출 미스 · EPS 비트 · 자사주 $4.7B', heroIcon:'📺', heroBig:'MISS / BEAT', heroSub:'매출 YoY 23% · EPS YoY 11% · Buyback $4.7B',
    cards:[{icon:'📉',big:'MISS',mid:'매출 (YoY 23%)',sub:'Revenue miss'},{icon:'📈',big:'BEAT',mid:'EPS (YoY 11%)',sub:'EPS beat'},{icon:'💰',big:'$4.7 B',mid:'자사주 매입',sub:'잔여 $21B'}],
    quoteLabel:'BLOSSOM', quoteKo:'"NFLX Q2 매출 미스 · EPS 비트 · 자사주 사상 최대"', quoteEn:'"NFLX Q2 rev miss · EPS beat · largest share repurchase in company history"',
    source:'Source: Blossom · Netflix IR · 2026.07.17',
    noteHead:'광고형 요금제·게임 콘텐츠가 매출 미스의 상쇄 축', noteSub:'가이던스와 광고 매출 성장률이 재평가 트리거',
    footer:'NFLX Q2 2026 · Miss/Beat', brand:BRAND_KO },
  en:{ title:'NFLX Q2 2026 — Rev Miss · EPS Beat · $4.7B Buyback', heroIcon:'📺', heroBig:'MISS / BEAT', heroSub:'Rev YoY 23% (miss) · EPS YoY 11% (beat) · Buyback $4.7B',
    cards:[{icon:'📉',big:'MISS',mid:'Revenue (YoY 23%)',sub:'below cons'},{icon:'📈',big:'BEAT',mid:'EPS (YoY 11%)',sub:'above cons'},{icon:'💰',big:'$4.7 B',mid:'Buyback',sub:'$21B remaining'}],
    quoteLabel:'BLOSSOM', quoteKo:'"NFLX 자사주 사상 최대 규모"', quoteEn:'"Largest share repurchase in company history"',
    source:'Source: Blossom · Netflix IR · 2026.07.17',
    noteHead:'Ad-tier + gaming offset revenue miss narrative', noteSub:'Guidance & ad-rev growth are the re-rating triggers',
    footer:'NFLX Q2 2026 · Miss/Beat', brand:BRAND_EN } },

// 13. SOX bear threshold
{ file:'sox-bear-threshold-15', color:'red', badge:'SOX',
  ko:{ title:'반도체 SOX — ATH 대비 -15% · 베어 문턱', heroIcon:'📉', heroBig:'-15 %', heroSub:'6월 사상 최고가 대비 -15% · 베어마켓 진입 문턱',
    cards:[{icon:'🏔️',big:'ATH',mid:'6월 신고가',sub:'reference peak'},{icon:'📍',big:'-15 %',mid:'현재 낙폭',sub:'ATH 대비'},{icon:'⚠️',big:'Bear',mid:'-20% 근접',sub:'베어 문턱'}],
    quoteLabel:'BARCHART', quoteKo:'"반도체 지수가 베어마켓 문턱에 있음"', quoteEn:'"Semi stocks on the brink of entering a bear market"',
    source:'Source: Barchart · 2026.07.17',
    noteHead:'개별주 강세 vs 지수 약세 괴리 확대', noteSub:'AMD·NVDA 실적/가이던스가 지수 리커버리 트리거',
    footer:'SOX · -15% From ATH', brand:BRAND_KO },
  en:{ title:'SOX Semis — -15% From ATH · Bear Threshold', heroIcon:'📉', heroBig:'-15 %', heroSub:'-15% from June ATH · at bear-market threshold',
    cards:[{icon:'🏔️',big:'ATH',mid:'June peak',sub:'reference'},{icon:'📍',big:'-15 %',mid:'Drawdown',sub:'from ATH'},{icon:'⚠️',big:'Bear',mid:'nearing -20%',sub:'threshold'}],
    quoteLabel:'BARCHART', quoteKo:'"반도체 지수가 베어마켓 문턱"', quoteEn:'"Semi stocks on the brink of entering a bear market"',
    source:'Source: Barchart · 2026.07.17',
    noteHead:'Single-name strength vs index weakness diverges', noteSub:'AMD/NVDA prints & guidance are recovery triggers',
    footer:'SOX · -15% From ATH', brand:BRAND_EN } },

// 14. MSFT 3y 4x
{ file:'msft-3y-4x-outlook', color:'blue', badge:'MSFT',
  ko:{ title:'MSFT — 향후 3년 매출 약 4배 성장 전망', heroIcon:'💠', heroBig:'~4×', heroSub:'런치·연결성·컴퓨트 3축 · 극단 속도의 CAPEX',
    cards:[{icon:'🚀',big:'Launch',mid:'우주/런치 지배',sub:'상용 발사 축'},{icon:'🌐',big:'Connectivity',mid:'글로벌 네트워크',sub:'세계급 커넥트'},{icon:'⚙️',big:'Compute',mid:'극단 속도 CAPEX',sub:'AI 인프라 확장'}],
    quoteLabel:'SHAY BOLOOR', quoteKo:'"MSFT가 향후 3년 매출을 거의 4배 늘릴 것으로 예상"', quoteEn:'"MSFT is expected to nearly quadruple its revenue over next three years"',
    source:'Source: Shay Boloor · 2026.07.17',
    noteHead:'애널리스트 코멘트 프레임 — 실제 가이던스는 별도 확인 필요', noteSub:'Azure·Copilot·게임즈 매출 스택이 검증 축',
    footer:'MSFT · ~4× Revenue Outlook', brand:BRAND_KO },
  en:{ title:'MSFT — Nearly 4× Revenue in Next 3 Years?', heroIcon:'💠', heroBig:'~4×', heroSub:'Launch · connectivity · compute — extreme-speed capex',
    cards:[{icon:'🚀',big:'Launch',mid:'Dominates launch',sub:'commercial space'},{icon:'🌐',big:'Connectivity',mid:'Global network',sub:'world-class'},{icon:'⚙️',big:'Compute',mid:'Extreme-speed capex',sub:'AI infra scale-out'}],
    quoteLabel:'SHAY BOLOOR', quoteKo:'"MSFT 향후 3년 매출 4배 예상"', quoteEn:'"MSFT is expected to nearly quadruple its revenue over next three years"',
    source:'Source: Shay Boloor · 2026.07.17',
    noteHead:'Commentary frame — verify against actual guidance', noteSub:'Azure/Copilot/Gaming stack are the validation axes',
    footer:'MSFT · ~4× Revenue Outlook', brand:BRAND_EN } },

// 15. Moritz on TSLA valuation
{ file:'moritz-tsla-msft-analogy', color:'mint', badge:'TSLA',
  ko:{ title:'Michael Moritz — "MSFT IPO 사례처럼 TSLA도 前例 없음"', heroIcon:'📚', heroBig:'HISTORY', heroSub:'MSFT $400–600M 밸류 회의론 → 오늘의 사례로 재조명',
    cards:[{icon:'🧠',big:'Moritz',mid:'실리콘밸리 원로',sub:'Sequoia Capital'},{icon:'📈',big:'전례 없음',mid:'TSLA·SPCX 성장',sub:'"no precedent"'},{icon:'⏳',big:'FB·GOOG 15Y前',mid:'같은 회의론 반복',sub:'valuation 논쟁'}],
    quoteLabel:'MICHAEL MORITZ', quoteKo:'"MSFT IPO 당시 $400–600M 밸류를 사람들이 우스꽝스럽다 했다"', quoteEn:'"When MSFT went public everybody thought the ~$400–600M valuation was ludicrous"',
    source:'Source: Ming · 2026.07.17',
    noteHead:'벨류 회의론에 대한 시간축 프레임 — 확정적 결론 아님', noteSub:'현금흐름·지분희석·거버넌스는 별도 정량 검증 필요',
    footer:'Moritz · TSLA / MSFT Analogy', brand:BRAND_KO },
  en:{ title:'Michael Moritz — "MSFT IPO Analogy for TSLA"', heroIcon:'📚', heroBig:'HISTORY', heroSub:'MSFT $400–600M IPO skepticism → cited to reframe TSLA valuation',
    cards:[{icon:'🧠',big:'Moritz',mid:'SV veteran',sub:'ex-Sequoia'},{icon:'📈',big:'No precedent',mid:'TSLA·SPCX growth',sub:'"no precedent"'},{icon:'⏳',big:'FB·GOOG 15Y ago',mid:'Same skepticism',sub:'valuation debate'}],
    quoteLabel:'MICHAEL MORITZ', quoteKo:'"MSFT IPO ~$400M 밸류를 우스꽝스럽다 했다"', quoteEn:'"When MSFT went public everybody thought the ~$400–600M valuation was ludicrous"',
    source:'Source: Ming · 2026.07.17',
    noteHead:'Time-axis reframe of valuation skepticism — not a verdict', noteSub:'Verify against cash-flow, dilution, governance separately',
    footer:'Moritz · TSLA / MSFT Analogy', brand:BRAND_EN } },

// 16. CVX × Iraq
{ file:'cvx-iraq-mou', color:'orange', badge:'CVX',
  ko:{ title:'Chevron — 이라크 유전 재진입 MOU 서명', heroIcon:'🛢️', heroBig:'IRAQ', heroSub:'이라크와 유전 2개 진입 · 최대 유전 연구·인프라 구축 MOU',
    cards:[{icon:'🛢️',big:'2 fields',mid:'진입 대상',sub:'Iraqi 유전 2곳'},{icon:'🏗️',big:'Infra',mid:'인프라 구축',sub:'생산·수송'},{icon:'📝',big:'MOU',mid:'양해각서',sub:'단계적 스텝'}],
    quoteLabel:'DEAL NOTE', quoteKo:'"Chevron의 이라크 재진입은 국가사에 남을 최대 투자 중 하나"', quoteEn:'"Iraq PM described Chevron\'s re-entry as most significant investment in country\'s history"',
    source:'Source: Eric Daugherty · Trump/Iraq PM meeting · 2026.07.17',
    noteHead:'중동 지정학 · 유가 · CVX 리저브 확장의 삼각 변화', noteSub:'MOU 단계 → 실제 계약·생산량 확인 필요',
    footer:'CVX · Iraq Re-entry MOU', brand:BRAND_KO },
  en:{ title:'Chevron — Iraq Re-Entry MOU', heroIcon:'🛢️', heroBig:'IRAQ', heroSub:'Two Iraqi oil fields + largest-field study + infra build MOU',
    cards:[{icon:'🛢️',big:'2 fields',mid:'Entry scope',sub:'Iraqi oil fields'},{icon:'🏗️',big:'Infra',mid:'Build-out',sub:'production/transport'},{icon:'📝',big:'MOU',mid:'Memorandum',sub:'staged commitment'}],
    quoteLabel:'DEAL NOTE', quoteKo:'"CVX 재진입은 이라크사에 남을 투자"', quoteEn:'"Iraq PM described Chevron\'s re-entry as most significant investment in country\'s history"',
    source:'Source: Eric Daugherty · Trump/Iraq PM meeting · 2026.07.17',
    noteHead:'ME geopolitics · crude prices · CVX reserves triangle', noteSub:'MOU stage — confirm via contracts & production volumes',
    footer:'CVX · Iraq Re-entry MOU', brand:BRAND_EN } },
];

let written = 0;
for (const t of T) {
  fs.writeFileSync(path.join(OUT, `${t.file}-20260718.svg`),    tpl(t.ko));
  fs.writeFileSync(path.join(OUT, `${t.file}-20260718-en.svg`), tpl(t.en));
  written += 2;
}
console.log(`✅ ${written} SVG 파일 생성 완료 (${T.length} topics × KO/EN)`);
