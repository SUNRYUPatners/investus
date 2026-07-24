// 2026-07-25 리포트 SVG 생성기 · 20 topics
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
// 1. TSLA FSD miles 315M/day 대폭 확대
{file:'tsla-fsd-miles-315m-day',symbol:'TSLA',
 ko:{title:'TSLA FSD — 하루 마일 315M · 몇 달 전 28.8M 대비 대폭 확대',heroIcon:'🛣️',heroBig:'315 M / DAY',heroSub:'FSD(Supervised) 안전 리포트: 누적 12.6B miles · 도심 마일만 4.85B · 하루 315M (2.3초당 1000마일)',
  cards:[{icon:'🛣️',big:'315 M/일',mid:'하루 자율주행 마일',sub:'몇달 전 28.8M · 초기 14.4M'},{icon:'📊',big:'12.6 B',mid:'누적 총 마일',sub:'FSD Supervised'},{icon:'🏙️',big:'4.85 B',mid:'도심 마일',sub:'도심 주행 비중 확대'}],
  quoteLabel:'SAWYER MERRITT',quoteKo:'"Tesla FSD 마일 트래커 대폭 개편 · 하루 315M 도달"',quoteEn:'"Tesla updated FSD miles tracker · fleet now at 315M miles/day"',
  source:'출처: Sawyer Merritt · Tesla Vehicle Safety Report · 2026.07.24',
  noteHead:'왜 중요한가: 학습 데이터 파이프라인이 exponential하게 확대되는 국면',noteSub:'앞으로 볼 것: 마일 확대가 V15 학습 속도·안전 지표에 반영되는 시점',footer:'TSLA FSD · 315M miles/day',brand:BK},
 en:{title:'TSLA FSD — 315M Miles/Day · Up From 28.8M Just Months Ago',heroIcon:'🛣️',heroBig:'315 M / DAY',heroSub:'FSD (Supervised) safety report: 12.6B cumulative miles · 4.85B city miles · 315M/day (1,000 miles every 2.3s)',
  cards:[{icon:'🛣️',big:'315 M/day',mid:'Autonomous miles/day',sub:'was 28.8M months ago · 14.4M initially'},{icon:'📊',big:'12.6 B',mid:'Cumulative miles',sub:'FSD Supervised'},{icon:'🏙️',big:'4.85 B',mid:'City miles',sub:'urban share expanding'}],
  quoteLabel:'SAWYER MERRITT',quoteKo:'"FSD 마일 트래커 대폭 개편 · 하루 315M"',quoteEn:'"Tesla updated FSD miles tracker · fleet now at 315M miles/day"',
  source:'Source: Sawyer Merritt · Tesla Vehicle Safety Report · 2026.07.24',
  noteHead:'Why: Training data pipeline scaling exponentially',noteSub:'Watch: how expanded miles feed V15 training speed and safety metrics',footer:'TSLA FSD · 315M miles/day',brand:BE}},

// 2. TSLA Robotaxi 26.6.0 code hints → Cybercab wide release
{file:'tsla-robotaxi-2660-cybercab',symbol:'TSLA',
 ko:{title:'TSLA Robotaxi 26.6.0 — Cybercab 지원 준비 · wide release 임박',heroIcon:'🚕',heroBig:'26.6.0',heroSub:'Robotaxi 앱 26.6.0 code에서 Cybercab 지원 준비·수동 스티어링/페달 임시 사용 코드 발견',
  cards:[{icon:'🚕',big:'Cybercab',mid:'지원 코드 추가',sub:'in-trip Cybercab 수'},{icon:'🎛️',big:'임시 제어',mid:'스티어링/페달 사용',sub:'검증 단계 표시'},{icon:'🌍',big:'Wide Release',mid:'검증 후 곧 확대',sub:'entities generalization 진전'}],
  quoteLabel:'THE TESLA NEWSWIRE',quoteKo:'"Robotaxi 26.6.0 코드에 Cybercab 지원 준비·wide release 시나리오"',quoteEn:'"Robotaxi 26.6.0 code hints at Cybercab support & wide release soon"',
  source:'출처: The Tesla Newswire · 2026.07.24',
  noteHead:'왜 중요한가: Cybercab 상용화가 코드 수준에서 이미 진행 중임을 확인',noteSub:'앞으로 볼 것: 검증 완료 → 공식 wide release 시점 발표',footer:'TSLA Robotaxi · 26.6.0',brand:BK},
 en:{title:'TSLA Robotaxi 26.6.0 — Cybercab Support Coming · Wide Release Ahead',heroIcon:'🚕',heroBig:'26.6.0',heroSub:'Robotaxi app 26.6.0 code shows Cybercab support prep and temporary manual controls for validation',
  cards:[{icon:'🚕',big:'Cybercab',mid:'Support code added',sub:'in-trip Cybercab count'},{icon:'🎛️',big:'Temp controls',mid:'Steering / pedals',sub:'validation flags'},{icon:'🌍',big:'Wide release',mid:'Soon after validation',sub:'entity generalization progress'}],
  quoteLabel:'THE TESLA NEWSWIRE',quoteKo:'"Robotaxi 26.6.0 코드에 Cybercab 지원·wide release"',quoteEn:'"Robotaxi 26.6.0 code hints at Cybercab support & wide release soon"',
  source:'Source: The Tesla Newswire · 2026.07.24',
  noteHead:'Why: Cybercab commercialization is already in motion at the code level',noteSub:'Watch: post-validation official wide-release announcement',footer:'TSLA Robotaxi · 26.6.0',brand:BE}},

// 3. Musk explains why Cybercab scale is slow
{file:'tsla-musk-cybercab-scale-delay',symbol:'TSLA',
 ko:{title:'Musk — Cybercab 확장이 왜 늦나 · 새 차대는 자체 데이터 필요',heroIcon:'⏳',heroBig:'다른 데이터',heroSub:'80억 마일 학습 데이터가 있어도 새 Cybercab 플랫폼에는 자동으로 이전되지 않음 · 자체 학습·검증 필요',
  cards:[{icon:'📸',big:'자체 데이터',mid:'새 차대는 별도 학습',sub:'기존 마일 자동 전이 X'},{icon:'🎛️',big:'검증 절차',mid:'임시 스티어링/페달',sub:'상용화 전 검증 단계'},{icon:'🏭',big:'준비 중',mid:'상용화 속도 조정',sub:'품질 유지가 우선'}],
  quoteLabel:'ELON MUSK · JOE HANSEN 인용',quoteKo:'"기존 차량의 마일이 새 Robotaxi 플랫폼에 자동 전이되지는 않는다"',quoteEn:'"Billions of miles on existing vehicles do not automatically transfer to a purpose-built Robotaxi platform"',
  source:'출처: Joe Hansen · 2026.07.24',
  noteHead:'왜 중요한가: FSD 마일 대폭 확대에도 Cybercab이 즉시 스케일 못 하는 이유 해명',noteSub:'앞으로 볼 것: Cybercab 자체 데이터 축적 속도·wide release 시점',footer:'TSLA · Cybercab data',brand:BK},
 en:{title:'Musk — Why Cybercab Scale-Up Is Slow · New Platform Needs Own Data',heroIcon:'⏳',heroBig:'Different data',heroSub:'8B+ training miles from existing fleet don\'t auto-transfer to the new Cybercab platform — needs its own learning and validation',
  cards:[{icon:'📸',big:'Own data',mid:'New chassis needs own',sub:'existing miles don\'t auto-transfer'},{icon:'🎛️',big:'Validation',mid:'Temp steering/pedals',sub:'pre-commercial stage'},{icon:'🏭',big:'In prep',mid:'Ramp paced',sub:'quality first'}],
  quoteLabel:'ELON MUSK · VIA JOE HANSEN',quoteKo:'"기존 마일이 새 Robotaxi 플랫폼으로 자동 전이되지 않음"',quoteEn:'"Billions of miles on existing vehicles do not automatically transfer to a purpose-built Robotaxi platform"',
  source:'Source: Joe Hansen · 2026.07.24',
  noteHead:'Why: Explains why Cybercab can\'t instantly scale despite FSD miles surge',noteSub:'Watch: pace of Cybercab-specific data accumulation and wide-release timing',footer:'TSLA · Cybercab data',brand:BE}},

// 4. Tesla First Responder Plan v1.4 · Arizona 9 areas
{file:'tsla-first-responder-plan-v14',symbol:'TSLA',
 ko:{title:'TSLA — 로보택시 First Responder Plan v1.4 · 애리조나 9개 지역',heroIcon:'🚨',heroBig:'v1.4',heroSub:'경찰·구급 대응 방식 정리 · 원격 정지 1000피트/1시간 · 애리조나 9개 지역(Phoenix·Scottsdale·Mesa·Tempe 등)',
  cards:[{icon:'🚨',big:'SAE L4',mid:'자율주행 표시',sub:'화면에 SELF-DRIVING'},{icon:'📞',big:'2-way call',mid:'사고 시 자동 통화',sub:'에어백 배포시 911 자동'},{icon:'🛑',big:'1000ft/1h',mid:'원격 서비스 정지',sub:'현장 반경/시간 지정'}],
  quoteLabel:'MUSKONOMY · SPENCER',quoteKo:'"First Responder Interaction Plan v1.4가 가장 자세한 로보택시 대응 지침"',quoteEn:'"v1.4 is the fullest look yet at driverless-car first-responder handling"',
  source:'출처: Muskonomy · Spencer · 2026.07.24',
  noteHead:'왜 중요한가: 상용 로보택시 인프라 문서화가 실체적으로 진전',noteSub:'앞으로 볼 것: 9지역 → 유럽·아시아 확장 문서 갱신 여부',footer:'TSLA · Responder Plan v1.4',brand:BK},
 en:{title:'TSLA — Robotaxi First Responder Plan v1.4 · 9 Arizona Areas',heroIcon:'🚨',heroBig:'v1.4',heroSub:'Police/paramedic handling documented · remote freeze within 1,000ft/~1hr · Arizona 9 areas (Phoenix, Scottsdale, Mesa, Tempe...)',
  cards:[{icon:'🚨',big:'SAE L4',mid:'Self-driving flagged',sub:'"SELF-DRIVING" on screen'},{icon:'📞',big:'2-way call',mid:'Auto call in a crash',sub:'auto-911 on airbag deploy'},{icon:'🛑',big:'1000ft/1h',mid:'Remote service freeze',sub:'radius/window specified'}],
  quoteLabel:'MUSKONOMY · SPENCER',quoteKo:'"v1.4는 로보택시 first-responder 대응의 가장 자세한 문서"',quoteEn:'"v1.4 is the fullest look yet at driverless-car first-responder handling"',
  source:'Source: Muskonomy · Spencer · 2026.07.24',
  noteHead:'Why: Commercial-robotaxi infrastructure is being formally documented',noteSub:'Watch: expansion of the plan to EU/Asia geographies',footer:'TSLA · Responder Plan v1.4',brand:BE}},

// 5. Cathie Wood TSLA $51M buy
{file:'tsla-cathie-wood-51m-buy',symbol:'TSLA',
 ko:{title:'TSLA — 캐시 우드가 $51M 매수 · 16만주 · 어제 급락 활용',heroIcon:'💰',heroBig:'$51 M',heroSub:'ARK Invest가 어제 TSLA -14% 급락일에 160,001주 매수 · Innovation·Autonomous·Next-Gen·Space & Defense ETF 전반 분산',
  cards:[{icon:'💰',big:'$51 M',mid:'하루 매수 규모',sub:'ARK Invest'},{icon:'🏦',big:'160,001주',mid:'매수 주식 수',sub:'단일 세션'},{icon:'📚',big:'4개 ETF',mid:'분산 매수',sub:'Innovation·Autonomous·NGI·Space'}],
  quoteLabel:'MING Z',quoteKo:'"캐시 우드가 어제 급락을 활용해 TSLA 16만주를 담았다"',quoteEn:'"Cathie Wood loaded up 160,001 TSLA shares on yesterday\'s big dip"',
  source:'출처: Ming Z · 2026.07.24',
  noteHead:'왜 중요한가: -14% 낙폭에 대응한 기관 강세 매수 신호',noteSub:'앞으로 볼 것: ARK 후속 매수 지속 여부 · Q3 실적까지의 흐름',footer:'TSLA · Wood $51M buy',brand:BK},
 en:{title:'TSLA — Cathie Wood Bought $51M · 160,001 Shares on Yesterday\'s Dip',heroIcon:'💰',heroBig:'$51 M',heroSub:'ARK Invest bought 160,001 TSLA shares on yesterday\'s -14% drop, split across Innovation, Autonomous, NGI, and Space & Defense ETFs',
  cards:[{icon:'💰',big:'$51 M',mid:'Single-day buy',sub:'ARK Invest'},{icon:'🏦',big:'160,001 sh',mid:'Shares purchased',sub:'in one session'},{icon:'📚',big:'4 ETFs',mid:'Diversified',sub:'Innovation·Autonomous·NGI·Space'}],
  quoteLabel:'MING Z',quoteKo:'"캐시 우드가 어제 급락에 TSLA 16만주 매수"',quoteEn:'"Cathie Wood loaded up 160,001 TSLA shares on yesterday\'s big dip"',
  source:'Source: Ming Z · 2026.07.24',
  noteHead:'Why: Institutional bull-buy signal in response to -14% drawdown',noteSub:'Watch: whether ARK follow-through continues · flow into Q3 print',footer:'TSLA · Wood $51M buy',brand:BE}},

// 6. Waymo · Uber partnership ending
{file:'tsla-waymo-uber-partnership-end',symbol:'GOOGL',
 ko:{title:'GOOGL Waymo — Uber 파트너십 종료 검토 · 2028년 독립 런치',heroIcon:'🚕',heroBig:'2028 독립',heroSub:'Waymo가 Uber와의 8년 독점 파트너십을 조기 종료 검토 · 2028년 오스틴·애틀랜타 독립 런치 예정',
  cards:[{icon:'🚕',big:'Waymo',mid:'Uber 파트너십 종료 검토',sub:'8년 독점'},{icon:'📅',big:'2028년',mid:'오스틴·애틀랜타',sub:'독립 런치'},{icon:'⚠️',big:'품질·안전',mid:'파트너십 이슈',sub:'서비스 품질·규제'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"Waymo가 Uber와의 8년 독점 종료 검토 · 2028년 독립 런치 준비"',quoteEn:'"Waymo reportedly considering ending 8-year exclusivity with Uber · to launch independently in 2028"',
  source:'출처: Shay Boloor · 2026.07.24',
  noteHead:'왜 중요한가: 자율주행 상용 시장의 파트너십 재편 · Tesla Robotaxi 경쟁 구도 변화',noteSub:'앞으로 볼 것: Waymo 독립 앱·요금 정책·Tesla 서비스와의 겹침 지역',footer:'GOOGL · Waymo × Uber',brand:BK},
 en:{title:'GOOGL Waymo — Considering Ending Uber Partnership · 2028 Solo Launch',heroIcon:'🚕',heroBig:'2028 solo',heroSub:'Waymo reportedly considering ending its 8-year exclusivity with Uber · plans independent launch in Austin and Atlanta in Jan 2028',
  cards:[{icon:'🚕',big:'Waymo',mid:'Ending Uber exclusivity',sub:'8-year deal'},{icon:'📅',big:'2028',mid:'Austin · Atlanta',sub:'independent launch'},{icon:'⚠️',big:'Quality/reg',mid:'Partnership friction',sub:'service quality, safety'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"Waymo · Uber 파트너십 종료 검토 · 2028년 독립 런치"',quoteEn:'"Waymo reportedly considering ending 8-year exclusivity with Uber · to launch independently in 2028"',
  source:'Source: Shay Boloor · 2026.07.24',
  noteHead:'Why: Autonomous-market partnership reshuffle · Tesla Robotaxi competitive frame shifts',noteSub:'Watch: Waymo standalone app/pricing · overlap with Tesla service areas',footer:'GOOGL · Waymo × Uber',brand:BE}},

// 7. SPCX data center hiring wave
{file:'spcx-datacenter-hiring-wave',symbol:'SPCX',
 ko:{title:'SPCX — 데이터센터 대규모 채용 wave · Neocloud 사업 확장 신호',heroIcon:'🏗️',heroBig:'HIRING WAVE',heroSub:'SpaceX가 Data Center Admin·Dev Lead·Supply Manager·Cooling·Memory·Networking 등 다중 포지션 동시 채용 개시',
  cards:[{icon:'👷',big:'Data Center',mid:'다중 리더 포지션',sub:'Admin·Dev·Supply'},{icon:'💾',big:'Memory · Storage',mid:'Supply Manager 채용',sub:'DC 스토리지 축'},{icon:'🌐',big:'Networking',mid:'Switches · Optics',sub:'광통신 인프라'}],
  quoteLabel:'S.E. ROBINSON',quoteKo:'"SpaceX가 여러 상급 데이터센터 포지션을 동시에 열었다"',quoteEn:'"SpaceX opened multiple senior data center positions across the org"',
  source:'출처: S.E. Robinson · 2026.07.24',
  noteHead:'왜 중요한가: 텍사스 대형 DC 검토 보도(어제 리포트) 실체화 신호',noteSub:'앞으로 볼 것: 부지·GPU 파트너·완공 시점 공식 발표',footer:'SPCX · DC hiring wave',brand:BK},
 en:{title:'SPCX — Data Center Hiring Wave · Neocloud Buildout Signal',heroIcon:'🏗️',heroBig:'HIRING WAVE',heroSub:'SpaceX opens multiple simultaneous roles: Data Center Admin, Dev Lead, Supply Managers (cooling, memory, networking...)',
  cards:[{icon:'👷',big:'Data Center',mid:'Multi-leader roles',sub:'Admin · Dev · Supply'},{icon:'💾',big:'Memory · Storage',mid:'Supply Manager hire',sub:'DC storage axis'},{icon:'🌐',big:'Networking',mid:'Switches · Optics',sub:'optical infra'}],
  quoteLabel:'S.E. ROBINSON',quoteKo:'"SpaceX 다중 상급 DC 포지션 채용"',quoteEn:'"SpaceX opened multiple senior data center positions across the org"',
  source:'Source: S.E. Robinson · 2026.07.24',
  noteHead:'Why: Materializes yesterday\'s large-scale Texas DC evaluation report',noteSub:'Watch: official site, GPU partner, and completion timeline announcements',footer:'SPCX · DC hiring wave',brand:BE}},

// 8. SPCX all-in Starship (Falcon 9 2028+ commercial)
{file:'spcx-all-in-starship-falcon9',symbol:'SPCX',
 ko:{title:'SPCX — All-in Starship · Falcon 9 2028년 후 상용 예약 중단',heroIcon:'🚀',heroBig:'2028+ 중단',heroSub:'SpaceX가 2028년 이후 Falcon 9 신규 상용 예약을 중단하고 Starship 캐파로 이동한다는 보도 · 대규모 베팅',
  cards:[{icon:'🚀',big:'Starship',mid:'All-in 전략',sub:'상용 우선순위'},{icon:'⛔',big:'2028+',mid:'Falcon 9 상용 예약 중단',sub:'해당 캐파 Starship 이관'},{icon:'💼',big:'Bloomberg',mid:'Elon 대형 베팅 프레임',sub:'미실증 Starship 앞세움'}],
  quoteLabel:'BLOOMBERG · NIC CRUZ PATANE',quoteKo:'"SpaceX가 2028년 이후 Falcon 9 상용 예약을 거절하기 시작"',quoteEn:'"SpaceX turning away commercial Falcon 9 rides beyond 2028 in favor of Starship"',
  source:'출처: Bloomberg · Nic Cruz Patane · 2026.07.24',
  noteHead:'왜 중요한가: 발사 리더십의 세대 전환 결정 · 실증 리스크와 대형 수요 이동',noteSub:'앞으로 볼 것: 오늘 V3 발사 결과 · 상용 고객 반응',footer:'SPCX · All-in Starship',brand:BK},
 en:{title:'SPCX — All-In Starship · No New Falcon 9 Commercial Bookings Past 2028',heroIcon:'🚀',heroBig:'2028+ paused',heroSub:'SpaceX is turning away commercial Falcon 9 rides beyond 2028 to shift capacity toward Starship — a massive bet',
  cards:[{icon:'🚀',big:'Starship',mid:'All-in strategy',sub:'commercial priority'},{icon:'⛔',big:'2028+',mid:'No new Falcon 9 bookings',sub:'capacity migrated'},{icon:'💼',big:'Bloomberg',mid:'Massive Musk bet frame',sub:'unproven Starship forward'}],
  quoteLabel:'BLOOMBERG · NIC CRUZ PATANE',quoteKo:'"2028년 이후 Falcon 9 상용 예약 거절 시작"',quoteEn:'"SpaceX turning away commercial Falcon 9 rides beyond 2028 in favor of Starship"',
  source:'Source: Bloomberg · Nic Cruz Patane · 2026.07.24',
  noteHead:'Why: Generation-shift decision in launch leadership · unproven-risk + big-demand migration',noteSub:'Watch: today\'s V3 flight outcome · commercial customer reaction',footer:'SPCX · All-in Starship',brand:BE}},

// 9. SPCX vs AMZN Leo satellite race
{file:'spcx-vs-amzn-leo-race',symbol:'SPCX',
 ko:{title:'SPCX vs AMZN Leo — 위성 수 10,700 vs 398 · Herald CEO 경쟁 프레임',heroIcon:'🛰️',heroBig:'10,700 vs 398',heroSub:'Starlink 10,700 위성·9M 고객·900+ 국가 vs Amazon Leo 398 위성·14 발사·상용 초기 · Herald CEO는 1년 내 추격 가능성 주장',
  cards:[{icon:'🛰️',big:'10,700',mid:'Starlink 위성 수',sub:'9M 고객·900+ 국가'},{icon:'📡',big:'398',mid:'Amazon Leo 위성 수',sub:'14 발사·상용 초기'},{icon:'⚡',big:'~1년',mid:'Herald CEO 추격 예상',sub:'속도 동등 여부'}],
  quoteLabel:'HERALD CEO · DOGEDESIGNER',quoteKo:'"Amazon Leo가 1년 내 Starlink 속도를 따라잡을 수 있다"',quoteEn:'"Amazon Leo could catch up to Starlink speeds within a year, per Herald CEO"',
  source:'출처: DogeDesigner · 2026.07.24',
  noteHead:'왜 중요한가: 위성 통신 시장의 첫 유의미한 경쟁 서사',noteSub:'앞으로 볼 것: Leo 실사용 속도·상용 서비스 지역 확대·가격 정책',footer:'SPCX vs AMZN Leo',brand:BK},
 en:{title:'SPCX vs AMZN Leo — 10,700 vs 398 Satellites · Herald CEO Race Frame',heroIcon:'🛰️',heroBig:'10,700 vs 398',heroSub:'Starlink: 10,700 satellites, 9M customers, 900+ countries vs Amazon Leo: 398 satellites, 14 launches, early commercial · Herald CEO claims catch-up within a year',
  cards:[{icon:'🛰️',big:'10,700',mid:'Starlink satellites',sub:'9M customers · 900+ countries'},{icon:'📡',big:'398',mid:'Amazon Leo satellites',sub:'14 launches · early commercial'},{icon:'⚡',big:'~1 yr',mid:'Herald CEO catch-up est',sub:'speed parity claim'}],
  quoteLabel:'HERALD CEO · DOGEDESIGNER',quoteKo:'"Amazon Leo가 1년 내 Starlink 속도 따라잡을 수 있다"',quoteEn:'"Amazon Leo could catch up to Starlink speeds within a year, per Herald CEO"',
  source:'Source: DogeDesigner · 2026.07.24',
  noteHead:'Why: First meaningful competitive narrative in satellite communications',noteSub:'Watch: Leo real-world speed · commercial-service geography expansion · pricing',footer:'SPCX vs AMZN Leo',brand:BE}},

// 10. TSLA-SPCX merger odds 79% (Kalshi update)
{file:'tsla-spcx-merger-79pct',symbol:'SPCX',
 ko:{title:'TSLA·SPCX 합병 확률 — 79% (Kalshi 예측시장 · 2028 이전)',heroIcon:'🤝',heroBig:'79 %',heroSub:'예측시장 Kalshi 기준 2028 이전 TSLA·SPCX 합병 확률 79% · 어제 Munster 애널 개인 견해 90%보다는 낮음',
  cards:[{icon:'📊',big:'79 %',mid:'예측시장 확률',sub:'2028 이전 기준'},{icon:'📅',big:'2028 이전',mid:'합병 시점 조건',sub:'실제 발표 미확정'},{icon:'⚖️',big:'vs 90%',mid:'Munster 개인 견해와 비교',sub:'예측시장이 더 보수적'}],
  quoteLabel:'KALSHI · JUST IN',quoteKo:'"Tesla와 SpaceX가 2028년 이전 합병할 확률 79%"',quoteEn:'"79% chance Tesla and SpaceX merge before 2028"',
  source:'출처: Kalshi · 2026.07.24',
  noteHead:'왜 중요한가: 애널 개인 견해와 예측시장 확률을 함께 볼 축이 생김',noteSub:'앞으로 볼 것: Musk 공식 발표 여부·구조·시기 확정',footer:'TSLA·SPCX · Merger 79%',brand:BK},
 en:{title:'TSLA·SPCX Merger Odds — 79% (Kalshi Prediction Market · Before 2028)',heroIcon:'🤝',heroBig:'79 %',heroSub:'Kalshi prediction-market pegs TSLA·SPCX merger odds at 79% before 2028 · lower than Munster\'s 90% individual view yesterday',
  cards:[{icon:'📊',big:'79 %',mid:'Prediction-market odds',sub:'before 2028'},{icon:'📅',big:'Before 2028',mid:'Merger timeline',sub:'no actual announcement'},{icon:'⚖️',big:'vs 90%',mid:'vs Munster individual',sub:'market more conservative'}],
  quoteLabel:'KALSHI · JUST IN',quoteKo:'"Tesla·SpaceX 2028 이전 합병 확률 79%"',quoteEn:'"79% chance Tesla and SpaceX merge before 2028"',
  source:'Source: Kalshi · 2026.07.24',
  noteHead:'Why: Adds a prediction-market axis to individual analyst views',noteSub:'Watch: Musk official announcement · structure · timing',footer:'TSLA·SPCX · Merger 79%',brand:BE}},

// 11. Morgan Stanley Adam Jonas SPCX $135
{file:'spcx-morgan-stanley-jonas-135',symbol:'SPCX',
 ko:{title:'SPCX — Morgan Stanley Adam Jonas: 매수 프레임 · $135/share',heroIcon:'🎯',heroBig:'$135',heroSub:'Adam Jonas: 최근 낙폭이 fundamentals와 disconnect · $120 이하 구간이 매력적 진입점 · 코어 Space+Connectivity만으로 ~$135 가치',
  cards:[{icon:'📄',big:'매수 프레임',mid:'Jonas 신규 노트',sub:'via Barchart'},{icon:'💵',big:'$135',mid:'Core 밸류에이션',sub:'Space + Connectivity만'},{icon:'📈',big:'상방',mid:'옵션가치 별도',sub:'Grok · Cursor · Neocloud 미포함'}],
  quoteLabel:'MORGAN STANLEY · ADAM JONAS',quoteKo:'"약세 sentiment와 fundamentals 사이 disconnect가 매력적 진입점을 만든다"',quoteEn:'"Disconnect between bearish sentiment and unchanged fundamentals creates attractive entry"',
  source:'출처: Sawyer Merritt (Adam Jonas · Barchart 인용) · 2026.07.24',
  noteHead:'왜 중요한가: 대형 하우스의 첫 명시적 매수 논거 정리 · -49% 낙폭 이후',noteSub:'앞으로 볼 것: MS 목표가 공식 등재·기관 flow 반영 여부',footer:'SPCX · MS Jonas $135',brand:BK},
 en:{title:'SPCX — Morgan Stanley\'s Adam Jonas: Attractive Entry · $135/share',heroIcon:'🎯',heroBig:'$135',heroSub:'Adam Jonas: recent drop disconnects from fundamentals · sub-$120 = attractive entry · core Space+Connectivity alone worth ~$135',
  cards:[{icon:'📄',big:'Bull frame',mid:'Jonas new note',sub:'via Barchart'},{icon:'💵',big:'$135',mid:'Core valuation',sub:'Space + Connectivity only'},{icon:'📈',big:'Upside',mid:'Optionality extra',sub:'Grok · Cursor · Neocloud excluded'}],
  quoteLabel:'MORGAN STANLEY · ADAM JONAS',quoteKo:'"약세 sentiment와 fundamentals disconnect = 매력적 진입점"',quoteEn:'"Disconnect between bearish sentiment and unchanged fundamentals creates attractive entry"',
  source:'Source: Sawyer Merritt (citing Adam Jonas via Barchart) · 2026.07.24',
  noteHead:'Why: First explicit bull thesis from a large house after the -49% drawdown',noteSub:'Watch: official MS PT registration · institutional flow response',footer:'SPCX · MS Jonas $135',brand:BE}},

// 12. GOOGL below 100-day MA
{file:'googl-below-100dma',symbol:'GOOGL',
 ko:{title:'GOOGL — 100일 이동평균 하회 · 4월 이후 두 번째',heroIcon:'📉',heroBig:'< 100-DMA',heroSub:'GOOGL이 4월 초 이후 두 번째로 100일 이동평균 아래로 종가 · 어제 Q2 FCF 첫 음전환·시총 -$84B의 연장선',
  cards:[{icon:'📉',big:'< 100 DMA',mid:'기술적 지지 하회',sub:'4월 이후 2번째'},{icon:'📅',big:'~4월 이후',mid:'첫 하회 이후 오랜만',sub:'추세 전환 관측'},{icon:'💸',big:'FCF 여파',mid:'어제 −$84B 시총',sub:'CAPEX 사이클 리스크 반영'}],
  quoteLabel:'BARCHART X',quoteKo:'"GOOGL이 4월 초 이후 두 번째로 100일 이동평균 아래에서 마감"',quoteEn:'"GOOGL just closed below its 100-day MA for only the 2nd time since early April"',
  source:'출처: Barchart X · 2026.07.24',
  noteHead:'왜 중요한가: 기술적 지지 이탈 + FCF 음전환 조합이 추세 전환 신호일 가능성',noteSub:'앞으로 볼 것: 200-DMA 지지선·Cloud 성장률 지속 여부',footer:'GOOGL · Below 100-DMA',brand:BK},
 en:{title:'GOOGL — Closes Below 100-Day Moving Average · 2nd Time Since April',heroIcon:'📉',heroBig:'< 100-DMA',heroSub:'GOOGL closed below 100-DMA for only the 2nd time since early April · extension of yesterday\'s first-negative FCF and -$84B market-cap drop',
  cards:[{icon:'📉',big:'< 100 DMA',mid:'Technical support broken',sub:'2nd since April'},{icon:'📅',big:'Since April',mid:'Rare occurrence',sub:'trend-shift watch'},{icon:'💸',big:'FCF echo',mid:'Yesterday -$84B cap',sub:'CAPEX-cycle risk pricing'}],
  quoteLabel:'BARCHART X',quoteKo:'"GOOGL이 100-DMA 하회 · 4월 이후 2번째"',quoteEn:'"GOOGL just closed below its 100-day MA for only the 2nd time since early April"',
  source:'Source: Barchart X · 2026.07.24',
  noteHead:'Why: Technical breakdown + FCF negative combined could signal trend shift',noteSub:'Watch: 200-DMA support · continuation of Cloud growth',footer:'GOOGL · Below 100-DMA',brand:BE}},

// 13. GOOGL Anthropic stake $8.4B
{file:'googl-anthropic-stake-84b',symbol:'GOOGL',
 ko:{title:'GOOGL — Anthropic 지분 가치 약 $8.4B로 재평가',heroIcon:'💎',heroBig:'~$8.4 B',heroSub:'Google이 보유한 Anthropic 지분 가치가 최근 라운드 기준 약 $8.4B로 재평가 · AI 스타트업 밸류에이션 이벤트',
  cards:[{icon:'💎',big:'~$8.4 B',mid:'Anthropic 지분 가치',sub:'Google 보유 기준'},{icon:'🧠',big:'AI 파트너',mid:'Anthropic Claude',sub:'GCP 인프라 협업'},{icon:'📊',big:'GOOGL',mid:'재무제표 이벤트',sub:'미실현 이익 인식'}],
  quoteLabel:'BLOSSOM',quoteKo:'"Anthropic 지분 가치 약 $8.4B로 상승"',quoteEn:'"Google\'s stake in Anthropic now worth roughly $8.4B"',
  source:'출처: Blossom · 2026.07.24',
  noteHead:'왜 중요한가: 지분법 이익 인식 시나리오 + AI 밸류에이션 프레임 재확인',noteSub:'앞으로 볼 것: 정식 회계 반영 시점·Anthropic IPO 시나리오',footer:'GOOGL · Anthropic $8.4B',brand:BK},
 en:{title:'GOOGL — Anthropic Stake Now Worth ~$8.4B',heroIcon:'💎',heroBig:'~$8.4 B',heroSub:'Google\'s stake in Anthropic re-marked to ~$8.4B based on latest round · AI startup valuation event',
  cards:[{icon:'💎',big:'~$8.4 B',mid:'Anthropic stake value',sub:'Google-held'},{icon:'🧠',big:'AI partner',mid:'Anthropic Claude',sub:'GCP infra collab'},{icon:'📊',big:'GOOGL',mid:'Financial event',sub:'unrealized gain recognition'}],
  quoteLabel:'BLOSSOM',quoteKo:'"Anthropic 지분 가치 약 $8.4B"',quoteEn:'"Google\'s stake in Anthropic now worth roughly $8.4B"',
  source:'Source: Blossom · 2026.07.24',
  noteHead:'Why: Equity-method gain scenario + AI valuation frame reaffirmed',noteSub:'Watch: formal accounting timing · Anthropic IPO scenarios',footer:'GOOGL · Anthropic $8.4B',brand:BE}},

// 14. GOOGL · VZ $1B DC partnership
{file:'googl-vz-1b-dc-partnership',symbol:'GOOGL',
 ko:{title:'GOOGL · VZ — $1B 데이터센터 파트너십 · AI/Cloud 인프라 확장',heroIcon:'🤝',heroBig:'$1 B',heroSub:'Google($GOOGL)과 Verizon($VZ)이 데이터센터 인프라·AI/Cloud 확장 위한 $1B 규모 전략적 파트너십 체결',
  cards:[{icon:'🤝',big:'$1 B',mid:'파트너십 규모',sub:'GOOGL × VZ'},{icon:'🏭',big:'DC 인프라',mid:'AI·Cloud 확장',sub:'주요 전략 파트너십'},{icon:'📡',big:'통신 결합',mid:'통신·클라우드 결합',sub:'5G/엣지 등 시너지'}],
  quoteLabel:'EVAN',quoteKo:'"Google $GOOGL과 Verizon $VZ가 데이터센터 인프라 $1B 파트너십 체결"',quoteEn:'"Google $GOOGL and Verizon $VZ signed a $1B agreement for data-center infrastructure, AI and cloud"',
  source:'출처: Evan · 2026.07.24',
  noteHead:'왜 중요한가: 하이퍼스케일러 CAPEX 사이클에 통신사 자산이 결합되는 첫 사례급',noteSub:'앞으로 볼 것: DC 위치·규모·MSFT/AMZN 유사 딜 여부',footer:'GOOGL × VZ · $1B DC',brand:BK},
 en:{title:'GOOGL × VZ — $1B Data Center Partnership · AI/Cloud Infra Expansion',heroIcon:'🤝',heroBig:'$1 B',heroSub:'Google ($GOOGL) and Verizon ($VZ) signed a $1B strategic partnership for data-center infra, AI and cloud',
  cards:[{icon:'🤝',big:'$1 B',mid:'Partnership size',sub:'GOOGL × VZ'},{icon:'🏭',big:'DC infra',mid:'AI · Cloud expansion',sub:'major strategic deal'},{icon:'📡',big:'Telco tie-in',mid:'Telco × Cloud',sub:'5G/edge synergy'}],
  quoteLabel:'EVAN',quoteKo:'"GOOGL × VZ $1B DC 파트너십"',quoteEn:'"Google $GOOGL and Verizon $VZ signed a $1B agreement for data-center infrastructure, AI and cloud"',
  source:'Source: Evan · 2026.07.24',
  noteHead:'Why: Landmark case of telco assets binding into hyperscaler CAPEX cycle',noteSub:'Watch: DC location/size · similar MSFT/AMZN deals',footer:'GOOGL × VZ · $1B DC',brand:BE}},

// 15. Cathie Wood AI = biggest investment opportunity
{file:'wood-ai-biggest-investment-opp',symbol:'MACRO',
 ko:{title:'AI 프레임 — 캐시 우드: AI가 우리 생애 최대 투자 기회',heroIcon:'🧬',heroBig:'AI = #1',heroSub:'캐시 우드: 진짜 disruption 테스트는 회사들이 실제로 업무 방식을 바꾸는지 여부 · ARK는 PLTR 활용 · 헬스케어가 가장 큰 응용',
  cards:[{icon:'🧠',big:'PLTR',mid:'ARK 자체 활용',sub:'포트폴리오 AI 배포 이해'},{icon:'📚',big:'AI-native',mid:'젊은 인재 채용',sub:'기존 관성 회사 vs 신흥'},{icon:'🧬',big:'헬스케어',mid:'AI의 가장 큰 응용',sub:'신약·진단·유전자 편집 시너지'}],
  quoteLabel:'CATHIE WOOD · ARK INVEST TRACKER',quoteKo:'"AI가 우리 생애 최대의 투자 기회다"',quoteEn:'"AI is the biggest investment opportunity of our lifetime"',
  source:'출처: ARK Invest Tracker · 2026.07.24',
  noteHead:'왜 이 프레임: 인프라(GOOGL·SPCX)+응용(헬스케어)+인재 3축 강세 서사',noteSub:'앞으로 볼 것: PLTR·헬스케어 AI 종목 자금 유입 · 채용 트렌드',footer:'AI 프레임 · Cathie Wood',brand:BK},
 en:{title:'AI Frame — Cathie Wood: The Biggest Investment Opportunity of Our Lives',heroIcon:'🧬',heroBig:'AI = #1',heroSub:'Wood: real disruption test is whether companies actually change how they work · ARK itself uses PLTR · healthcare is the most profound application',
  cards:[{icon:'🧠',big:'PLTR',mid:'ARK own use',sub:'to understand AI deployment'},{icon:'📚',big:'AI-native',mid:'Young-talent hiring',sub:'legacy inertia vs emerging'},{icon:'🧬',big:'Healthcare',mid:'AI\'s biggest app',sub:'drugs, diagnostics, gene editing synergy'}],
  quoteLabel:'CATHIE WOOD · ARK INVEST TRACKER',quoteKo:'"AI가 우리 생애 최대의 투자 기회"',quoteEn:'"AI is the biggest investment opportunity of our lifetime"',
  source:'Source: ARK Invest Tracker · 2026.07.24',
  noteHead:'Why: Three-axis bull frame — infra (GOOGL/SPCX) + application (healthcare) + talent',noteSub:'Watch: PLTR & healthcare-AI flow · hiring trends',footer:'AI frame · Cathie Wood',brand:BE}},

// 16. LMT earnings +16.32% · Trump 3× buy
{file:'lmt-earnings-plus1632-trump',symbol:'LMT',
 ko:{title:'LMT — 실적 발표 +16.32% 급등 · 트럼프 3회 매수 화제',heroIcon:'📈',heroBig:'+16.32 %',heroSub:'Lockheed Martin(LMT)이 실적 서프라이즈로 $572.62 · +$80.35 (+16.32%) 급등 · 트럼프 개인 계좌 5월 3회 매수 이력 공개',
  cards:[{icon:'📈',big:'+16.32 %',mid:'실적일 상승률',sub:'$80.35 상승'},{icon:'💵',big:'$572.62',mid:'종가',sub:'실적 서프라이즈'},{icon:'🇺🇸',big:'3회 매수',mid:'트럼프 5월 매수 이력',sub:'최대 $430K 규모'}],
  quoteLabel:'NANCY PELOSI STOCK TRACKER',quoteKo:'"Trump이 5월 LMT를 3회 매수 · 오늘 실적일 +16.32%"',quoteEn:'"Trump bought $LMT three times in May · today\'s earnings day +16.32%"',
  source:'출처: Nancy Pelosi Stock Tracker · 2026.07.24',
  noteHead:'왜 중요한가: 방산·지정학 프레임에서 리레이팅 신호 · 정치인 매수 논쟁 겹침',noteSub:'앞으로 볼 것: 실적 세부 내용·수주 파이프라인·주요 방산 정책',footer:'LMT · Earnings +16.32%',brand:BK},
 en:{title:'LMT — Earnings +16.32% · Trump Bought 3 Times in May',heroIcon:'📈',heroBig:'+16.32 %',heroSub:'Lockheed Martin (LMT) surged to $572.62 (+$80.35, +16.32%) on earnings surprise · Trump personal account bought LMT 3 times in May',
  cards:[{icon:'📈',big:'+16.32 %',mid:'Earnings-day move',sub:'+$80.35'},{icon:'💵',big:'$572.62',mid:'Close',sub:'earnings surprise'},{icon:'🇺🇸',big:'3 buys',mid:'Trump May buys',sub:'up to ~$430K total'}],
  quoteLabel:'NANCY PELOSI STOCK TRACKER',quoteKo:'"Trump 5월 LMT 3회 매수 · 오늘 +16.32%"',quoteEn:'"Trump bought $LMT three times in May · today\'s earnings day +16.32%"',
  source:'Source: Nancy Pelosi Stock Tracker · 2026.07.24',
  noteHead:'Why: Defense/geopolitics re-rating signal · overlaps with politician-buying debate',noteSub:'Watch: earnings detail · order pipeline · major defense policy',footer:'LMT · Earnings +16.32%',brand:BE}},

// 17. AMD growth super-cycle · $1.6T 2028 · +16.94%
{file:'amd-growth-supercycle-16t',symbol:'AMD',
 ko:{title:'AMD — 성장 슈퍼사이클 · +16.94% 급등 · $1.6T 시총 목표 2028',heroIcon:'⚡',heroBig:'+16.94 %',heroSub:'$AMD가 $205.90(+16.94%)로 급등 · 애널 컨센 2028년 시총 $1.6T 도달 예상 · 현재 대비 +82% upside',
  cards:[{icon:'⚡',big:'+16.94 %',mid:'오늘 상승률',sub:'$205.90 · 급등'},{icon:'🎯',big:'$1.6 T',mid:'2028 시총 목표',sub:'애널 컨센'},{icon:'📈',big:'+82 %',mid:'upside 예상',sub:'현재 시총 대비'}],
  quoteLabel:'BLOSSOM',quoteKo:'"AMD가 성장 슈퍼사이클에 진입 · 2028년 $1.6T 시총 예상"',quoteEn:'"AMD is in a growth super-cycle · analysts see $1.6T market cap by 2028"',
  source:'출처: Blossom · 2026.07.24',
  noteHead:'왜 중요한가: NVDA 다음의 AI 칩 수혜자로 자금 확산 · MI 시리즈·EPYC 축',noteSub:'앞으로 볼 것: MI350·MI400 실 수요·MS/META/GOOGL 계약 확대',footer:'AMD · Super-cycle',brand:BK},
 en:{title:'AMD — Growth Super-Cycle · +16.94% Rally · $1.6T Market-Cap Target for 2028',heroIcon:'⚡',heroBig:'+16.94 %',heroSub:'$AMD surged to $205.90 (+16.94%) · analyst consensus sees $1.6T market cap by 2028 · ~+82% upside vs now',
  cards:[{icon:'⚡',big:'+16.94 %',mid:'Today\'s gain',sub:'$205.90 · rally'},{icon:'🎯',big:'$1.6 T',mid:'2028 market-cap target',sub:'analyst consensus'},{icon:'📈',big:'+82 %',mid:'Upside est',sub:'vs current cap'}],
  quoteLabel:'BLOSSOM',quoteKo:'"AMD가 성장 슈퍼사이클 · 2028년 $1.6T 시총"',quoteEn:'"AMD is in a growth super-cycle · analysts see $1.6T market cap by 2028"',
  source:'Source: Blossom · 2026.07.24',
  noteHead:'Why: Capital rotates to the next AI-chip beneficiary after NVDA · MI series + EPYC axis',noteSub:'Watch: MI350/MI400 real demand · MS/META/GOOGL deal expansion',footer:'AMD · Super-cycle',brand:BE}},

// 18. Paramount · Warner Bros merger freeze
{file:'para-wbd-merger-freeze',symbol:'PARA',
 ko:{title:'Paramount · Warner Bros — $110B 합병 freeze · 반독점 리스크',heroIcon:'🎬',heroBig:'FREEZE',heroSub:'David Ellison\'s Paramount가 Warner Bros Discovery 인수 $110B 딜을 잠정 중단 · 여러 주가 반독점 이유로 저지 시도 (FT)',
  cards:[{icon:'🎬',big:'$110 B',mid:'합병 규모',sub:'Paramount·WBD'},{icon:'⏸️',big:'FREEZE',mid:'딜 잠정 중단',sub:'주 정부 저지 시도'},{icon:'⚖️',big:'반독점',mid:'antitrust 리스크',sub:'헐리우드 최대 딜'}],
  quoteLabel:'FT · UNUSUAL_WHALES',quoteKo:'"Paramount의 $110B WBD 인수를 여러 주가 반독점 이유로 저지 시도 · 딜 freeze"',quoteEn:'"Paramount agreed to freeze its $110B Warner Bros Discovery merger as multiple states seek to block it on antitrust grounds"',
  source:'출처: unusual_whales · FT · 2026.07.24',
  noteHead:'왜 중요한가: 미디어 산업 재편의 반독점 리스크 실체 · 헐리우드 최대 딜',noteSub:'앞으로 볼 것: 주정부 소송·연방 규제 개입·구조 재조정 여부',footer:'PARA × WBD · Freeze',brand:BK},
 en:{title:'Paramount · Warner Bros — $110B Merger Frozen · Antitrust Risk',heroIcon:'🎬',heroBig:'FREEZE',heroSub:'David Ellison\'s Paramount agreed to freeze its $110B Warner Bros Discovery acquisition as multiple states seek to block it on antitrust grounds (FT)',
  cards:[{icon:'🎬',big:'$110 B',mid:'Merger size',sub:'Paramount · WBD'},{icon:'⏸️',big:'FREEZE',mid:'Deal on hold',sub:'state challenges'},{icon:'⚖️',big:'Antitrust',mid:'Antitrust risk',sub:'largest Hollywood deal'}],
  quoteLabel:'FT · UNUSUAL_WHALES',quoteKo:'"Paramount $110B WBD 합병 freeze · 주 정부 반독점 저지 시도"',quoteEn:'"Paramount agreed to freeze its $110B Warner Bros Discovery merger as multiple states seek to block it on antitrust grounds"',
  source:'Source: unusual_whales · FT · 2026.07.24',
  noteHead:'Why: Concrete antitrust risk in media consolidation · largest Hollywood deal',noteSub:'Watch: state suits · federal regulatory involvement · restructured terms',footer:'PARA × WBD · Freeze',brand:BE}},

// 19. Macro — Fed hawkish · sell-off deepens
{file:'macro-fed-hawkish-selloff',symbol:'MACRO',
 ko:{title:'매크로 — Fed hawkish 유지 · 매도 심화 · 에너지 쇼크·무역 마찰',heroIcon:'📉',heroBig:'HAWKISH',heroSub:'미국 증시 매도가 심화되는 가운데 에너지 쇼크와 무역 마찰이 hawkish Fed 스탠스를 굳히고 있다는 프레임',
  cards:[{icon:'⛽',big:'에너지 쇼크',mid:'원유·가스 상승',sub:'물가 상방 압력'},{icon:'🌐',big:'무역 마찰',mid:'관세·공급망',sub:'인플레이션 스토리 재점화'},{icon:'🏛️',big:'Fed',mid:'hawkish 유지',sub:'금리 인하 지연'}],
  quoteLabel:'INVESTING.COM',quoteKo:'"매도가 심화되며 에너지 쇼크와 무역 마찰이 hawkish Fed 스탠스를 굳힌다"',quoteEn:'"US sell-off deepens as energy shock and trade friction lock in hawkish Fed"',
  source:'출처: Investing.com · 2026.07.24',
  noteHead:'왜 중요한가: TSLA·GOOGL 조정과 겹치는 매크로 배경 · 하이퍼스케일러 CAPEX 사이클과의 상충',noteSub:'앞으로 볼 것: 다음 CPI·FOMC 성명 톤·에너지 가격 추이',footer:'MACRO · Hawkish Fed',brand:BK},
 en:{title:'MACRO — Fed Stays Hawkish · Sell-Off Deepens · Energy Shock + Trade Friction',heroIcon:'📉',heroBig:'HAWKISH',heroSub:'US sell-off deepens as energy shock and trade friction lock in a hawkish Fed stance',
  cards:[{icon:'⛽',big:'Energy shock',mid:'Crude · gas up',sub:'inflation upside'},{icon:'🌐',big:'Trade friction',mid:'Tariffs · supply',sub:'inflation story reignites'},{icon:'🏛️',big:'Fed',mid:'Stays hawkish',sub:'cuts pushed out'}],
  quoteLabel:'INVESTING.COM',quoteKo:'"매도 심화 · 에너지 쇼크·무역 마찰이 hawkish Fed 스탠스 강화"',quoteEn:'"US sell-off deepens as energy shock and trade friction lock in hawkish Fed"',
  source:'Source: Investing.com · 2026.07.24',
  noteHead:'Why: Macro backdrop coinciding with TSLA/GOOGL pullback · tension with hyperscaler CAPEX cycle',noteSub:'Watch: next CPI · FOMC statement tone · energy prices',footer:'MACRO · Hawkish Fed',brand:BE}},

// 20. Macro — Central Banks own most Gold in history
{file:'macro-cb-gold-all-time-high',symbol:'MACRO',
 ko:{title:'매크로 — 전 세계 중앙은행 금 보유량 사상 최대',heroIcon:'🥇',heroBig:'ALL-TIME',heroSub:'Barchart 집계: 전 세계 중앙은행이 사상 최대 규모의 금을 보유 · IMF·Bloomberg 데이터 · 다변화 흐름 지속',
  cards:[{icon:'🥇',big:'사상 최대',mid:'중앙은행 금 보유',sub:'IMF/Bloomberg 데이터'},{icon:'🌍',big:'다변화',mid:'달러·USTs 다변화',sub:'BRICs 중심'},{icon:'📈',big:'2022→2026',mid:'급격한 매입 확대',sub:'차트 추세'}],
  quoteLabel:'BARCHART · IMF / BLOOMBERG',quoteKo:'"전 세계 중앙은행이 사상 최대 규모의 금을 보유"',quoteEn:'"Global central banks now own the most amount of gold in history"',
  source:'출처: Barchart · 2026.07.24',
  noteHead:'왜 중요한가: 어제 리포트한 \'금이 UST 초월\' 프레임의 연장선 · 준비자산 구조 변화 지속',noteSub:'앞으로 볼 것: 매입 지속성·금 ETF 흐름·달러 인덱스 반응',footer:'MACRO · CB Gold ATH',brand:BK},
 en:{title:'MACRO — Global Central Banks Own the Most Gold in History',heroIcon:'🥇',heroBig:'ALL-TIME',heroSub:'Per Barchart with IMF/Bloomberg data: global central banks now hold the most gold ever · diversification flow continues',
  cards:[{icon:'🥇',big:'All-time high',mid:'CB gold holdings',sub:'IMF/Bloomberg data'},{icon:'🌍',big:'Diversification',mid:'From USD / USTs',sub:'BRICs-led'},{icon:'📈',big:'2022→2026',mid:'Sharp buying acceleration',sub:'per chart'}],
  quoteLabel:'BARCHART · IMF / BLOOMBERG',quoteKo:'"중앙은행 금 보유 사상 최대"',quoteEn:'"Global central banks now own the most amount of gold in history"',
  source:'Source: Barchart · 2026.07.24',
  noteHead:'Why: Extension of yesterday\'s gold-overtakes-USTs frame · reserve structure keeps shifting',noteSub:'Watch: buying continuity · gold ETF flows · DXY reaction',footer:'MACRO · CB Gold ATH',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260725.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260725-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
