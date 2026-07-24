// 2026-07-24 리포트 SVG 생성기 · 22 topics
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
// 1. TSLA Q2 detail (Bilello)
{file:'tsla-q2-detail-bilello',symbol:'TSLA',
 ko:{title:'TSLA Q2 세부 — 매출 $28.4B(+24%) · Auto GM 15% · FCF TTM -$6.4B',heroIcon:'📊',heroBig:'$28.4 B',heroSub:'분기 매출 사상 최고 · Auto Rev $22.7B · Auto GM ex-credits 15% · CAPEX +141% YoY',
  cards:[{icon:'💵',big:'$28.4 B',mid:'매출(+24% YoY)',sub:'Auto Rev $22.7B'},{icon:'📉',big:'15 %',mid:'Auto GM ex-credits',sub:'마진 압박 원인'},{icon:'💸',big:'−$6.4 B',mid:'FCF TTM',sub:'CAPEX +141% YoY 여파'}],
  quoteLabel:'CHARLIE BILELLO',quoteKo:'"Tesla Q2 매출 record · CAPEX +141% YoY로 FCF는 마이너스 전환"',quoteEn:'"Record Q2 revenue · CAPEX up +141% YoY drove FCF negative"',
  source:'출처: Charlie Bilello · 2026.07.23',
  noteHead:'왜 중요한가: 매출 성장 이면에 마진 압박·자본지출 부담',noteSub:'앞으로 볼 것: Auto GM 회복 · CAPEX 정상화 시점',footer:'TSLA · Q2 detail',brand:BK},
 en:{title:'TSLA Q2 Detail — $28.4B Rev (+24%) · Auto GM 15% · FCF TTM -$6.4B',heroIcon:'📊',heroBig:'$28.4 B',heroSub:'Record quarterly revenue · Auto Rev $22.7B · Auto GM ex-credits 15% · CAPEX +141% YoY',
  cards:[{icon:'💵',big:'$28.4 B',mid:'Revenue (+24% YoY)',sub:'Auto Rev $22.7B'},{icon:'📉',big:'15 %',mid:'Auto GM ex-credits',sub:'margin pressure'},{icon:'💸',big:'−$6.4 B',mid:'FCF TTM',sub:'from CAPEX +141% YoY'}],
  quoteLabel:'CHARLIE BILELLO',quoteKo:'"매출 record · CAPEX +141% YoY로 FCF 마이너스"',quoteEn:'"Record Q2 revenue · CAPEX up +141% YoY drove FCF negative"',
  source:'Source: Charlie Bilello · 2026.07.23',
  noteHead:'Why: Revenue growth with margin pressure and heavy capex',noteSub:'Watch: Auto GM recovery · normalization of CAPEX',footer:'TSLA · Q2 detail',brand:BE}},

// 2. TSLA analyst downgrade wave + -14% biggest 13-mo loss
{file:'tsla-analyst-downgrade-wave',symbol:'TSLA',
 ko:{title:'TSLA — 애널 다운그레이드 wave · -14% 13개월래 최대 낙폭',heroIcon:'📉',heroBig:'−14 %',heroSub:'실적 후 여러 IB가 동시에 목표가 하향 · Ming Z는 -12%, Barchart는 -14%(13개월래 최대)',
  cards:[{icon:'🏦',big:'Cantor',mid:'$475 → $445',sub:'목표가 하향'},{icon:'🏦',big:'Morgan Stan.',mid:'$480 → $450',sub:'목표가 하향'},{icon:'🏦',big:'Truist·Wells',mid:'$505/$470 → $460',sub:'다중 하향'}],
  quoteLabel:'BARCHART',quoteKo:'"TSLA가 14% 이상 급락 · 13개월래 최대 낙폭"',quoteEn:'"TSLA plunges more than 14% for its biggest loss in 13 months"',
  source:'출처: Barchart · Ming Z · 2026.07.23',
  noteHead:'왜 중요한가: 매출 record에도 다중 목표가 하향 = 마진·CAPEX 우려 반영',noteSub:'앞으로 볼 것: Cantor 지속 유지 vs 하향 재조정',footer:'TSLA · Downgrade wave',brand:BK},
 en:{title:'TSLA — Downgrade Wave · -14% Biggest 13-Month Loss',heroIcon:'📉',heroBig:'−14 %',heroSub:'Multiple IBs cut PTs post-earnings · Ming Z noted -12%, Barchart -14% (biggest 13-month loss)',
  cards:[{icon:'🏦',big:'Cantor',mid:'$475 → $445',sub:'PT cut'},{icon:'🏦',big:'Morgan Stan.',mid:'$480 → $450',sub:'PT cut'},{icon:'🏦',big:'Truist·Wells',mid:'$505/$470 → $460',sub:'multiple cuts'}],
  quoteLabel:'BARCHART',quoteKo:'"TSLA -14% · 13개월래 최대 낙폭"',quoteEn:'"TSLA plunges more than 14% for its biggest loss in 13 months"',
  source:'Source: Barchart · Ming Z · 2026.07.23',
  noteHead:'Why: PT cuts despite record revenue = margin/CAPEX concerns',noteSub:'Watch: Cantor holding vs also revising down',footer:'TSLA · Downgrade wave',brand:BE}},

// 3. Cole Grinde TSLA bull frame
{file:'tsla-cole-grinde-bull',symbol:'TSLA',
 ko:{title:'TSLA — 현재 진행 중인 15+ 항목 · Cole Grinde 강세 프레임',heroIcon:'🚀',heroBig:'15+ 진행중',heroSub:'Cybercab/Semi Production · Robotaxi Scaling · FSD 구독자 증가 · Optimus Giga · AI 칩 · Megapack 3',
  cards:[{icon:'🚕',big:'Production',mid:'Cybercab · Semi',sub:'양산 진입'},{icon:'📈',big:'Scaling',mid:'Robotaxi · FSD 구독자',sub:'실질 확장 중'},{icon:'🏗️',big:'짓는 중',mid:'Optimus Giga · Megapack 3',sub:'미래 사업'}],
  quoteLabel:'COLE GRINDE',quoteKo:'"현재 없는 미래를 문자 그대로 만들고 있다"',quoteEn:'"They are quite literally creating the future that currently does not exist"',
  source:'출처: Cole Grinde · 2026.07.23',
  noteHead:'왜 이 프레임인가: 애널 다운그레이드 반대편의 강세 서사',noteSub:'AI 칩 · 지역 슈퍼차징 DC · 리튬 정제 · Optimus 등 다축 병행',footer:'TSLA · 15+ in progress',brand:BK},
 en:{title:'TSLA — 15+ Ongoing Initiatives · Cole Grinde Bull Case',heroIcon:'🚀',heroBig:'15+ ongoing',heroSub:'Cybercab/Semi Production · Robotaxi Scaling · FSD subs growing · Optimus Giga · AI chip · Megapack 3',
  cards:[{icon:'🚕',big:'Production',mid:'Cybercab · Semi',sub:'in production'},{icon:'📈',big:'Scaling',mid:'Robotaxi · FSD subs',sub:'real growth'},{icon:'🏗️',big:'Building',mid:'Optimus Giga · Megapack 3',sub:'future biz'}],
  quoteLabel:'COLE GRINDE',quoteKo:'"현재 없는 미래를 문자 그대로 만든다"',quoteEn:'"They are quite literally creating the future that currently does not exist"',
  source:'Source: Cole Grinde · 2026.07.23',
  noteHead:'Why the frame: bull narrative offsetting downgrade wave',noteSub:'AI chip · regional supercharging DCs · lithium refining · Optimus all in parallel',footer:'TSLA · 15+ in progress',brand:BE}},

// 4. Tesla Owners SV bull summary
{file:'tsla-owners-sv-bull-summary',symbol:'TSLA',
 ko:{title:'TSLA 강세 종합 (TOSV) — Cybertruck·Robotaxi 유럽·훈련 컴퓨트·Optimus',heroIcon:'💪',heroBig:'BULL',heroSub:'Cybertruck Fremont 시작 · Robotaxi 유럽 40 도시 확대 · H1 훈련 컴퓨트 2배 · Optimus Gen 3 +20%',
  cards:[{icon:'🛻',big:'Fremont',mid:'Cybertruck 시작',sub:'다음은 Cybercab'},{icon:'🇪🇺',big:'40 도시+',mid:'Robotaxi 유럽 확장',sub:'Bay Area +50%'},{icon:'🤖',big:'+20 %',mid:'Optimus Gen 3',sub:'Gen 2 대비'}],
  quoteLabel:'TESLA OWNERS SILICON VALLEY',quoteKo:'"매출 record·서비스 +50%·에너지 21.6 GWh 등 종합 강세"',quoteEn:'"Record rev · services +50% · energy 21.6 GWh · overall bull setup"',
  source:'출처: Tesla Owners SV · 2026.07.23',
  noteHead:'왜 중요한가: 애널 다운그레이드에 맞서는 소유자 커뮤니티 강세 프레임',noteSub:'훈련 컴퓨트 텍사스 H1 2배 · Q3/Q4 온라인 예정',footer:'TSLA · TOSV bull summary',brand:BK},
 en:{title:'TSLA Bull Summary (TOSV) — Cybertruck · Robotaxi EU · Training Compute · Optimus',heroIcon:'💪',heroBig:'BULL',heroSub:'Cybertruck Fremont starts · Robotaxi 40+ EU cities · H1 training compute 2× · Optimus Gen 3 +20%',
  cards:[{icon:'🛻',big:'Fremont',mid:'Cybertruck begins',sub:'Cybercab next'},{icon:'🇪🇺',big:'40+ cities',mid:'Robotaxi EU expansion',sub:'Bay Area +50%'},{icon:'🤖',big:'+20 %',mid:'Optimus Gen 3',sub:'vs Gen 2'}],
  quoteLabel:'TESLA OWNERS SILICON VALLEY',quoteKo:'"매출 record·서비스 +50%·에너지 21.6 GWh"',quoteEn:'"Record rev · services +50% · energy 21.6 GWh · overall bull setup"',
  source:'Source: Tesla Owners SV · 2026.07.23',
  noteHead:'Why: Owner-community bull frame countering analyst downgrades',noteSub:'Training compute Texas H1 2× · online in Q3/Q4',footer:'TSLA · TOSV bull summary',brand:BE}},

// 5. Musk "Best Year Ever"
{file:'tsla-musk-best-year',symbol:'TSLA',
 ko:{title:'Musk — "Tesla 사상 최고의 해 중 하나가 될 것"',heroIcon:'🌟',heroBig:'BEST YEAR',heroSub:'Q2 실적 후 Musk 발언 · 남은 5개월에 대한 강한 낙관',
  cards:[{icon:'📅',big:'남은 5개월',mid:'2026 잔여 기간',sub:'Cybercab·V15 등'},{icon:'🎯',big:'Best Year',mid:'Musk 자체 프레임',sub:'실행력 자신감'},{icon:'⚖️',big:'vs 애널',mid:'다운그레이드 반대편',sub:'CEO 톤 대비'}],
  quoteLabel:'ELON MUSK (Q2 CALL)',quoteKo:'"이 해가 Tesla 사상 최고의 해 중 하나가 될 것"',quoteEn:'"This will be one of Tesla\'s best years ever"',
  source:'출처: Tesla Owners SV 인용 · 2026.07.23',
  noteHead:'왜 주목: Q2 EPS 미스·-12% 반응과 대조되는 CEO 강세 톤',noteSub:'Cybercab 런치·V15 실질 실행이 이 프레임 검증 축',footer:'TSLA · Musk "Best Year"',brand:BK},
 en:{title:'Musk — "One of Tesla\'s Best Years Ever"',heroIcon:'🌟',heroBig:'BEST YEAR',heroSub:'Musk statement post-Q2 · strong optimism for remaining months',
  cards:[{icon:'📅',big:'5 mo left',mid:'2026 remaining',sub:'Cybercab, V15 etc.'},{icon:'🎯',big:'Best Year',mid:'Musk own frame',sub:'execution confidence'},{icon:'⚖️',big:'vs analysts',mid:'against downgrades',sub:'CEO tone contrast'}],
  quoteLabel:'ELON MUSK (Q2 CALL)',quoteKo:'"Tesla 사상 최고의 해 중 하나"',quoteEn:'"This will be one of Tesla\'s best years ever"',
  source:'Source: Tesla Owners SV · 2026.07.23',
  noteHead:'Why: CEO bull tone contrasts Q2 EPS miss and -12% reaction',noteSub:'Cybercab launch & V15 execution will validate this frame',footer:'TSLA · Musk "Best Year"',brand:BE}},

// 6. FSD v14.3.8 · v14 Lite 6th batch
{file:'tsla-fsd-v1438-6th-batch',symbol:'TSLA',
 ko:{title:'TSLA FSD — v14.3.8 · v14 Lite 6번째 batch 롤아웃',heroIcon:'💾',heroBig:'2026.20.8.11',heroSub:'FSD(Supervised) v14.3.8과 v14 Lite가 HW3/HW4 차량 6번째 batch에 배포',
  cards:[{icon:'💾',big:'v14.3.8',mid:'HW4 배포',sub:'6번째 batch'},{icon:'💡',big:'v14 Lite',mid:'HW3 배포',sub:'6번째 batch'},{icon:'🔧',big:'2026.20.8.11',mid:'소프트웨어 버전',sub:'주간 롤아웃 지속'}],
  quoteLabel:'THE TESLA NEWSWIRE',quoteKo:'"v14.3.8과 v14 Lite가 6번째 배치 롤아웃 시작"',quoteEn:'"FSD v14.3.8 and v14 Lite rolling out to 6th batch"',
  source:'출처: The Tesla Newswire · 2026.07.23',
  noteHead:'왜 중요한가: HW3/HW4 병행 확산 · 사용자 커버리지 점진 확대',noteSub:'앞으로 볼 것: 릴리스 노트 변경점 · 안전 지표 반영',footer:'TSLA FSD · 6th batch rollout',brand:BK},
 en:{title:'TSLA FSD — v14.3.8 & v14 Lite Roll Out to 6th Batch',heroIcon:'💾',heroBig:'2026.20.8.11',heroSub:'FSD (Supervised) v14.3.8 and v14 Lite rolling out to a 6th batch of HW3/HW4 vehicles',
  cards:[{icon:'💾',big:'v14.3.8',mid:'HW4 build',sub:'6th batch'},{icon:'💡',big:'v14 Lite',mid:'HW3 build',sub:'6th batch'},{icon:'🔧',big:'2026.20.8.11',mid:'Software version',sub:'weekly rollout'}],
  quoteLabel:'THE TESLA NEWSWIRE',quoteKo:'"v14.3.8·v14 Lite 6번째 배치"',quoteEn:'"FSD v14.3.8 and v14 Lite rolling out to 6th batch"',
  source:'Source: The Tesla Newswire · 2026.07.23',
  noteHead:'Why: Parallel HW3/HW4 diffusion · widening user coverage',noteSub:'Watch: release-note changes and safety-report impact',footer:'TSLA FSD · 6th batch rollout',brand:BE}},

// 7. FSD V15 early in Robotaxi
{file:'tsla-fsd-v15-early-robotaxi',symbol:'TSLA',
 ko:{title:'TSLA FSD V15 — Robotaxi에 이미 early 버전 실행 중',heroIcon:'🧠',heroBig:'V15 EARLY',heroSub:'Nic Cruz Patane: Tesla Robotaxi가 이미 FSD V15 초기 버전 실행 · 약 10B 파라미터 · 안전성 대폭 개선',
  cards:[{icon:'🧠',big:'~10 B',mid:'V15 파라미터',sub:'v14의 약 18B와 대비'},{icon:'🚕',big:'Robotaxi',mid:'V15 실행 중',sub:'실주행 학습 데이터'},{icon:'📅',big:'2026말~2027초',mid:'고객 배포 예상',sub:'Musk 언급'}],
  quoteLabel:'NIC CRUZ PATANE',quoteKo:'"V15는 안전성의 major leap과 함께 완전한 아키텍처 개편"',quoteEn:'"V15 is a full architectural overhaul with a major leap in safety"',
  source:'출처: Nic Cruz Patane · 2026.07.23',
  noteHead:'왜 중요한가: v15의 실주행 학습 데이터가 이미 축적되는 국면',noteSub:'앞으로 볼 것: 고객 배포 정확한 시점 · 안전 지표 정량',footer:'TSLA FSD · V15 early in Robotaxi',brand:BK},
 en:{title:'TSLA FSD V15 — Already Running Early Build in Robotaxi',heroIcon:'🧠',heroBig:'V15 EARLY',heroSub:'Nic Cruz Patane: Tesla Robotaxi already running an early FSD V15 · roughly 10B params · big safety leap',
  cards:[{icon:'🧠',big:'~10 B',mid:'V15 params',sub:'vs ~18B in v14'},{icon:'🚕',big:'Robotaxi',mid:'V15 in use',sub:'real-world data'},{icon:'📅',big:'Late 26 – Early 27',mid:'Customer rollout est.',sub:'per Musk'}],
  quoteLabel:'NIC CRUZ PATANE',quoteKo:'"V15는 안전성 major leap과 함께 아키텍처 개편"',quoteEn:'"V15 is a full architectural overhaul with a major leap in safety"',
  source:'Source: Nic Cruz Patane · 2026.07.23',
  noteHead:'Why: Real-world V15 training data is already accumulating',noteSub:'Watch: exact customer rollout date & quantitative safety metrics',footer:'TSLA FSD · V15 early in Robotaxi',brand:BE}},

// 8. HW4 below upgrade
{file:'tsla-hw4-below-upgrade',symbol:'TSLA',
 ko:{title:'TSLA — Musk: HW4 미만 카메라 차량 업그레이드 방향',heroIcon:'🔩',heroBig:'HW < 4 · UPGR',heroSub:'Musk 언급 · 카메라만 있으면 HW4 미만 차량은 새 AI 보드로 업그레이드 방향',
  cards:[{icon:'📸',big:'카메라 有',mid:'업그레이드 대상',sub:'HW3 등'},{icon:'🔩',big:'새 AI 보드',mid:'교체 방향',sub:'HW4 급 성능'},{icon:'🌍',big:'전 세계',mid:'HW4 칩 이미 프로덕션',sub:'전년 중반부터'}],
  quoteLabel:'ELON MUSK',quoteKo:'"카메라가 있는 모든 차는 새 AI 보드로 업그레이드하는 것이 합리적"',quoteEn:'"Any car with cameras — it makes sense to upgrade to the new-gen AI board"',
  source:'출처: Sawyer Merritt 인용 · 2026.07.23',
  noteHead:'왜 중요한가: 구형 하드웨어 재활성화 스토리(어제 v14 Lite HW3)와 결합',noteSub:'앞으로 볼 것: 업그레이드 비용·프로그램 상세 발표',footer:'TSLA · Upgrade path for HW3',brand:BK},
 en:{title:'TSLA — Musk: Upgrade Path for Pre-HW4 Camera Cars',heroIcon:'🔩',heroBig:'HW < 4 · UPGR',heroSub:'Per Musk: cars with cameras but pre-HW4 will be upgraded to the new-gen AI board',
  cards:[{icon:'📸',big:'With cams',mid:'Upgrade target',sub:'HW3 etc.'},{icon:'🔩',big:'New AI board',mid:'Swap path',sub:'HW4-class perf'},{icon:'🌍',big:'Worldwide',mid:'HW4 chip in prod',sub:'since mid last year'}],
  quoteLabel:'ELON MUSK',quoteKo:'"카메라 있는 차는 새 AI 보드 업그레이드가 합리적"',quoteEn:'"Any car with cameras — it makes sense to upgrade to the new-gen AI board"',
  source:'Source: via Sawyer Merritt · 2026.07.23',
  noteHead:'Why: Combines with yesterday\'s v14 Lite HW3 reactivation story',noteSub:'Watch: upgrade cost & program-detail announcement',footer:'TSLA · Upgrade path for HW3',brand:BE}},

// 9. Optimus Data Collection hire (Tempe)
{file:'tsla-optimus-hire-tempe',symbol:'TSLA',
 ko:{title:'TSLA Optimus — Tempe AZ 데이터 수집 리드 채용',heroIcon:'🤖',heroBig:'TEMPE, AZ',heroSub:'Optimus Data Collection Operations Lead 채용 · 애리조나 템피 근무',
  cards:[{icon:'📍',big:'Tempe',mid:'애리조나 근무',sub:'Optimus 사업소'},{icon:'📊',big:'Data Coll.',mid:'수집·주석 프로세스',sub:'모델 학습 인프라'},{icon:'🤖',big:'Optimus',mid:'로봇 데이터 파이프',sub:'Gen 3 지원'}],
  quoteLabel:'TESLAZO',quoteKo:'"Tesla가 Optimus 데이터 수집 리드를 애리조나에서 모집 중"',quoteEn:'"Tesla is hiring a Data Collection Operations Lead for Optimus in Tempe, AZ"',
  source:'출처: TeslaZo · 2026.07.23',
  noteHead:'왜 중요한가: Optimus 학습 데이터 파이프라인 확장 신호',noteSub:'앞으로 볼 것: Gen 3 실 배포·데이터 규모·라벨링 자동화',footer:'TSLA Optimus · Tempe AZ hire',brand:BK},
 en:{title:'TSLA Optimus — Data Collection Ops Lead Hire in Tempe, AZ',heroIcon:'🤖',heroBig:'TEMPE, AZ',heroSub:'Optimus Data Collection Operations Lead role · based in Tempe, Arizona',
  cards:[{icon:'📍',big:'Tempe',mid:'Arizona base',sub:'Optimus site'},{icon:'📊',big:'Data coll.',mid:'Collection & labeling',sub:'training infra'},{icon:'🤖',big:'Optimus',mid:'Robot data pipeline',sub:'supports Gen 3'}],
  quoteLabel:'TESLAZO',quoteKo:'"Optimus 데이터 수집 리드 채용"',quoteEn:'"Tesla is hiring a Data Collection Operations Lead for Optimus in Tempe, AZ"',
  source:'Source: TeslaZo · 2026.07.23',
  noteHead:'Why: Signal of Optimus training data pipeline scale-up',noteSub:'Watch: Gen 3 deployment, data scale, labeling automation',footer:'TSLA Optimus · Tempe AZ hire',brand:BE}},

// 10. Musk statements — CAPEX 자신감 + robotaxi 신중 + long-term
{file:'tsla-musk-3-statements',symbol:'TSLA',
 ko:{title:'Musk 발언 3선 — CAPEX 자신감 · 로보택시 신중 · 5~10년 장기',heroIcon:'🎙️',heroBig:'3 코멘트',heroSub:'대규모 CAPEX 회수 자신감 + 사고 방지 신중 + 5~10년 관점 강조',
  cards:[{icon:'💰',big:'CAPEX',mid:'"엄청난 회수" 자신감',sub:'투자가 결과 낼 것'},{icon:'⚠️',big:'로보택시',mid:'"사고 방지가 제약"',sub:'인간이 낼 수 있는 최대 속도로'},{icon:'⏳',big:'5~10년',mid:'장기 프레임',sub:'분기 실적 압박 vs 장기 투자'}],
  quoteLabel:'ELON MUSK (Q2 콜/발언)',quoteKo:'"거대한 CAPEX 해지만 투자한 모든 것이 놀라운 회수를 만들어낼 것이라 확신"',quoteEn:'"This is a massive CAPEX year, but I\'m confident all things will generate incredible returns"',
  source:'출처: Evan S · Sawyer Merritt · 2026.07.23',
  noteHead:'왜 중요한가: 실적 미스·다운그레이드에 대응하는 CEO 3중 메시징',noteSub:'앞으로 볼 것: 실 CAPEX 회수 지표·안전 사고율·5~10년 로드맵 실행',footer:'TSLA · Musk 3 statements',brand:BK},
 en:{title:'Musk × 3 Statements — Confident on CAPEX · Cautious on Robotaxi · 5–10y Long-Term',heroIcon:'🎙️',heroBig:'3 remarks',heroSub:'Confidence on massive CAPEX returns + caution on preventing accidents + 5–10y horizon framing',
  cards:[{icon:'💰',big:'CAPEX',mid:'"Incredible returns"',sub:'confident on payback'},{icon:'⚠️',big:'Robotaxi',mid:'"Accident-prevention constraint"',sub:'as fast as humanly possible'},{icon:'⏳',big:'5–10 yrs',mid:'Long-term framing',sub:'quarterly pressure vs long invest'}],
  quoteLabel:'ELON MUSK (Q2 CALL/COMMENTS)',quoteKo:'"거대한 CAPEX 해 · 놀라운 회수 자신"',quoteEn:'"This is a massive CAPEX year, but I\'m confident all things will generate incredible returns"',
  source:'Source: Evan S · Sawyer Merritt · 2026.07.23',
  noteHead:'Why: CEO triple-messaging in response to EPS miss/downgrades',noteSub:'Watch: actual CAPEX payback, safety-incident rate, 5–10y roadmap execution',footer:'TSLA · Musk 3 statements',brand:BE}},

// 11. Robotaxi expansion — city-time compress + state-level
{file:'tsla-robotaxi-expansion-scenario',symbol:'TSLA',
 ko:{title:'TSLA Robotaxi 확장 시나리오 — 도시 시간 압축 → 주 단위 확장',heroIcon:'🗺️',heroBig:'CITY → STATE',heroSub:'Nic Cruz Patane: 도시별 런치 시간 계속 압축 · Gene Munster/Ashok: 결국 주 단위 확장',
  cards:[{icon:'⏱️',big:'시간 압축',mid:'도시별 런치',sub:'Nic Cruz Patane'},{icon:'🗺️',big:'주 단위',mid:'Ashok: 결국 전 주 확장',sub:'Gene Munster 인용'},{icon:'📍',big:'상반기 7 도시',mid:'현재 라이브 상태',sub:'Phoenix·Vegas 남음'}],
  quoteLabel:'NIC CRUZ PATANE · GENE MUNSTER',quoteKo:'"도시 런치 시간이 계속 압축되며, 결국 Robotaxi는 주 단위로 확장될 것"',quoteEn:'"City-launch time keeps compressing · eventually Robotaxi turns on entire states"',
  source:'출처: Nic Cruz Patane · Gene Munster (Ashok Elluswamy 인용) · 2026.07.23',
  noteHead:'왜 중요한가: 상용화 스케일이 도시 단위에서 주 단위로 전환되는 프레임',noteSub:'앞으로 볼 것: Phoenix·Vegas 런치 시점 · Bay Area +50% 확대 실체',footer:'TSLA Robotaxi · scenario',brand:BK},
 en:{title:'TSLA Robotaxi Expansion Scenario — Cities Compress → State-Level',heroIcon:'🗺️',heroBig:'CITY → STATE',heroSub:'Nic Cruz Patane: city-launch time keeps compressing · Gene Munster (via Ashok): eventually state-scale',
  cards:[{icon:'⏱️',big:'Compressing',mid:'City-launch time',sub:'Nic Cruz Patane'},{icon:'🗺️',big:'State-scale',mid:'Ashok: entire states',sub:'via Gene Munster'},{icon:'📍',big:'7 cities H1',mid:'Currently live',sub:'Phoenix, Vegas remain'}],
  quoteLabel:'NIC CRUZ PATANE · GENE MUNSTER',quoteKo:'"도시 시간 계속 압축 · 결국 주 단위"',quoteEn:'"City-launch time keeps compressing · eventually Robotaxi turns on entire states"',
  source:'Source: Nic Cruz Patane · Gene Munster (citing Ashok Elluswamy) · 2026.07.23',
  noteHead:'Why: Frame shift from city-by-city to state-scale commercialization',noteSub:'Watch: Phoenix/Vegas launch timing · Bay Area +50% expansion reality',footer:'TSLA Robotaxi · scenario',brand:BE}},

// 12. FSD 1.48M subs growth
{file:'tsla-fsd-148m-growth',symbol:'TSLA',
 ko:{title:'TSLA FSD 활성 유료 구독자 — 148만 · 높은 마진 매출 축',heroIcon:'💵',heroBig:'1.48 M',heroSub:'활성 FSD 유료 구독자 148만명 · Gali 인용 · 고마진 반복 매출 스토리 확대',
  cards:[{icon:'👥',big:'1.48 M',mid:'활성 유료 구독자',sub:'현재 시점'},{icon:'📈',big:'고마진',mid:'반복 매출 축',sub:'SaaS성 수익 프로파일'},{icon:'🚗',big:'신규 인도 55%+',mid:'부착률 (전날 리포트)',sub:'파이프 지속 확장'}],
  quoteLabel:'DOGEDESIGNER · GALI',quoteKo:'"활성 FSD 구독자 1.48M · 고마진 매출이 가속되는 시점"',quoteEn:'"Active FSD subscribers at 1.48M · high-margin revenue accelerating"',
  source:'출처: DogeDesigner (Gali 인용) · 2026.07.23',
  noteHead:'왜 중요한가: 매출 record와 함께 매출의 질(마진 프로파일) 확인 지표',noteSub:'앞으로 볼 것: 지역 확장(EU·아시아)·요금제 개편·V15 도입 효과',footer:'TSLA FSD · 1.48M active',brand:BK},
 en:{title:'TSLA FSD Active Paid Subscribers — 1.48M · High-Margin Recurring Rev',heroIcon:'💵',heroBig:'1.48 M',heroSub:'Active FSD paid subs at 1.48M (via Gali/DogeDesigner) · high-margin recurring revenue axis expanding',
  cards:[{icon:'👥',big:'1.48 M',mid:'Active paid subs',sub:'current'},{icon:'📈',big:'High-margin',mid:'Recurring rev axis',sub:'SaaS-like profile'},{icon:'🚗',big:'55%+ new attach',mid:'From prior day',sub:'pipeline expanding'}],
  quoteLabel:'DOGEDESIGNER · GALI',quoteKo:'"활성 FSD 1.48M · 고마진 매출 가속"',quoteEn:'"Active FSD subscribers at 1.48M · high-margin revenue accelerating"',
  source:'Source: DogeDesigner (via Gali) · 2026.07.23',
  noteHead:'Why: With record revenue, this confirms revenue quality (margin profile)',noteSub:'Watch: regional expansion (EU/Asia), pricing tiers, V15 rollout impact',footer:'TSLA FSD · 1.48M active',brand:BE}},

// 13. SPCX Starship V3 flight
{file:'spcx-starship-v3-flight',symbol:'SPCX',
 ko:{title:'SPCX Starship V3 — 두번째 발사 시도 (오늘 5:45 PM ET)',heroIcon:'🚀',heroBig:'5:45 PM ET',heroSub:'SpaceX Starbase에서 Starship V3 두번째 시험 발사 · Version 3의 두번째 flight',
  cards:[{icon:'🚀',big:'Starship',mid:'Version 3 (V3)',sub:'두번째 시험 발사'},{icon:'📍',big:'Starbase',mid:'남부 텍사스',sub:'발사장'},{icon:'🕐',big:'5:45 PM ET',mid:'발사 예정',sub:'오늘 · 저녁'}],
  quoteLabel:'EVAN S · BLOOMBERG',quoteKo:'"Starship V3의 두번째 시험 발사가 오늘 5:45 PM ET로 잡혔다"',quoteEn:'"Second flight test of Starship Version 3 targeted for 5:45 PM ET today"',
  source:'출처: Evan S · Bloomberg · 2026.07.23',
  noteHead:'왜 중요한가: V3 두번째 발사 = 새 이터레이션의 실체 검증 단계',noteSub:'앞으로 볼 것: 상단 재진입·히트실드 성능·재사용 반복성 검증',footer:'SPCX · Starship V3 flight 2',brand:BK},
 en:{title:'SPCX Starship V3 — Second Flight Attempt Today (5:45 PM ET)',heroIcon:'🚀',heroBig:'5:45 PM ET',heroSub:'Starship V3 second test flight from SpaceX Starbase · second flight of Version 3',
  cards:[{icon:'🚀',big:'Starship',mid:'Version 3 (V3)',sub:'second test flight'},{icon:'📍',big:'Starbase',mid:'South Texas',sub:'launch site'},{icon:'🕐',big:'5:45 PM ET',mid:'Launch target',sub:'today · evening'}],
  quoteLabel:'EVAN S · BLOOMBERG',quoteKo:'"오늘 5:45 PM ET Starship V3 두번째 시험 발사"',quoteEn:'"Second flight test of Starship Version 3 targeted for 5:45 PM ET today"',
  source:'Source: Evan S · Bloomberg · 2026.07.23',
  noteHead:'Why: Second V3 flight = validation stage for the new iteration',noteSub:'Watch: heat shield perf on ascent, reuse-cycle reliability',footer:'SPCX · Starship V3 flight 2',brand:BE}},

// 14. SPCX -49% ATH drawdown
{file:'spcx-49pct-ath-drop',symbol:'SPCX',
 ko:{title:'SPCX — 6월 사상 최고가 대비 -49% 하락',heroIcon:'📉',heroBig:'−49 %',heroSub:'SPCX가 6월 ATH 대비 -49% 하락 · 상당한 시가총액 손실',
  cards:[{icon:'📉',big:'−49 %',mid:'6월 ATH 대비',sub:'Barchart 집계'},{icon:'📅',big:'2개월',mid:'하락 기간',sub:'6월 → 7월'},{icon:'💸',big:'시총 손실',mid:'수천억 달러 규모',sub:'개인 매수 흐름 반전'}],
  quoteLabel:'BARCHART',quoteKo:'"SpaceX가 6월 사상 최고가 대비 -49% 하락"',quoteEn:'"SpaceX $SPCX down more than 49% from its June all-time high"',
  source:'출처: Barchart · 2026.07.23',
  noteHead:'왜 중요한가: 상장 후 급락 · Starship V3 발사·실적(8/4)이 반전 트리거 후보',noteSub:'앞으로 볼 것: 오늘 발사 결과·기관 매수 흐름·개인 재유입 여부',footer:'SPCX · -49% from ATH',brand:BK},
 en:{title:'SPCX — Down 49%+ From June All-Time High',heroIcon:'📉',heroBig:'−49 %',heroSub:'SPCX down more than 49% from its June ATH · sizable market-cap loss',
  cards:[{icon:'📉',big:'−49 %',mid:'From June ATH',sub:'per Barchart'},{icon:'📅',big:'~2 mo',mid:'Drawdown window',sub:'June → July'},{icon:'💸',big:'Mkt cap loss',mid:'Hundreds of $B',sub:'retail flow flipped'}],
  quoteLabel:'BARCHART',quoteKo:'"SPCX 6월 ATH 대비 -49% 하락"',quoteEn:'"SpaceX $SPCX down more than 49% from its June all-time high"',
  source:'Source: Barchart · 2026.07.23',
  noteHead:'Why: Post-listing drawdown · Starship V3 flight & earnings (Aug 4) are reversal triggers',noteSub:'Watch: today\'s flight outcome, institutional flow, retail re-entry',footer:'SPCX · -49% from ATH',brand:BE}},

// 15. SPCX +5.3% rebound $80B
{file:'spcx-rebound-80b-cap',symbol:'SPCX',
 ko:{title:'SPCX — 오늘 +5.3% 반등 · 시가총액 +800억 달러 증가',heroIcon:'📈',heroBig:'+$80 B',heroSub:'SPCX가 오늘 하루 +5.3% 반등 · 시가총액 약 800억 달러 증가',
  cards:[{icon:'📈',big:'+5.3 %',mid:'오늘 상승률',sub:'Stocks.News 집계'},{icon:'💰',big:'+$80 B',mid:'시가총액 증가',sub:'하루 기준'},{icon:'🔄',big:'반전',mid:'-49% 낙폭 이후',sub:'반등 신호'}],
  quoteLabel:'STOCKS.NEWS',quoteKo:'"SpaceX가 오늘 시가총액 800억 달러 증가 · +5.3%"',quoteEn:'"SpaceX has gained over $80 billion in market cap today · up 5.3%"',
  source:'출처: Stocks.News · 2026.07.23',
  noteHead:'왜 중요한가: 개인 매수 중단 이후 첫 유의미한 반등 · Cathie Wood 재조명과 겹침',noteSub:'앞으로 볼 것: Starship V3 발사 결과가 반등 지속 여부의 트리거',footer:'SPCX · +5.3% · +$80B',brand:BK},
 en:{title:'SPCX — Rebounds +5.3% Today · +$80B in Market Cap',heroIcon:'📈',heroBig:'+$80 B',heroSub:'SPCX up 5.3% today · added ~$80 billion in market cap in one day',
  cards:[{icon:'📈',big:'+5.3 %',mid:'Today\'s gain',sub:'per Stocks.News'},{icon:'💰',big:'+$80 B',mid:'Market-cap add',sub:'in a day'},{icon:'🔄',big:'Reversal',mid:'After -49% drawdown',sub:'rebound signal'}],
  quoteLabel:'STOCKS.NEWS',quoteKo:'"SPCX 시총 +$80B · +5.3%"',quoteEn:'"SpaceX has gained over $80 billion in market cap today · up 5.3%"',
  source:'Source: Stocks.News · 2026.07.23',
  noteHead:'Why: First meaningful bounce after halted retail buying · overlaps with Cathie Wood re-focus',noteSub:'Watch: Starship V3 flight outcome as sustain trigger',footer:'SPCX · +5.3% · +$80B',brand:BE}},

// 16. Cathie Wood on SPCX (재조명)
{file:'spcx-cathie-wood-redux',symbol:'SPCX',
 ko:{title:'SPCX — 캐시 우드 재조명: 발사 + Starlink + AI 인프라 결합',heroIcon:'🌌',heroBig:'ARK · WOOD',heroSub:'캐시 우드 (Eva McMillan 인용): SpaceX가 발사·Starlink·AI 인프라를 결합해 세계사상 가장 중요한 기업 될 수 있다',
  cards:[{icon:'🚀',big:'Launch',mid:'발사 리더십',sub:'재사용 로켓 10년 리드'},{icon:'📡',big:'Starlink',mid:'통신 인프라 재편',sub:'글로벌 사업'},{icon:'🧠',big:'AI Infra',mid:'저비용 프런티어 AI',sub:'세계 최저 비용 모델'}],
  quoteLabel:'CATHIE WOOD · EVA MCMILLAN 인용',quoteKo:'"발사·Starlink·AI 인프라 결합 시 세계사상 가장 중요한 기업"',quoteEn:'"Could become the most important company in global history by combining launch, Starlink, and AI infra"',
  source:'출처: Eva McMillan · TheSonOfWalkey (재확인) · 2026.07.23',
  noteHead:'왜 이 시점: 어제 정정 배포된 캐시 우드 리포트가 오늘 다수 계정에서 재확산',noteSub:'앞으로 볼 것: 텍사스 DC 검토·GOOGL 재평가와의 서사 결합 지속',footer:'SPCX · Cathie Wood redux',brand:BK},
 en:{title:'SPCX — Cathie Wood Re-Amplified: Launch + Starlink + AI Infra',heroIcon:'🌌',heroBig:'ARK · WOOD',heroSub:'Cathie Wood (per Eva McMillan): combining launch, Starlink and AI infra, SpaceX could be the most important company in global history',
  cards:[{icon:'🚀',big:'Launch',mid:'Launch leadership',sub:'10y reusable rocket lead'},{icon:'📡',big:'Starlink',mid:'Telecom reshaping',sub:'global business'},{icon:'🧠',big:'AI Infra',mid:'Low-cost frontier AI',sub:'world\'s cheapest models'}],
  quoteLabel:'CATHIE WOOD · VIA EVA MCMILLAN',quoteKo:'"발사+Starlink+AI 결합 = 세계사상 최중요"',quoteEn:'"Could become the most important company in global history by combining launch, Starlink, and AI infra"',
  source:'Source: Eva McMillan · TheSonOfWalkey (echo) · 2026.07.23',
  noteHead:'Why now: Yesterday\'s corrected Cathie Wood report re-amplified today',noteSub:'Watch: continued narrative fit with Texas DC eval & GOOGL re-mark',footer:'SPCX · Cathie Wood redux',brand:BE}},

// 17. TSLA·SPCX merger 90%
{file:'tsla-spcx-merger-90pct',symbol:'SPCX',
 ko:{title:'TSLA·SPCX 합병 확률 — 이제 90% (Deepwater Munster)',heroIcon:'🤝',heroBig:'90 %',heroSub:'Deepwater\'s Munster: 향후 TSLA·SPCX 합병 확률 90% 수준 · 이전 대비 대폭 상승',
  cards:[{icon:'📊',big:'90 %',mid:'합병 확률',sub:'Munster 코멘트'},{icon:'⬆️',big:'상승',mid:'이전 컨센 대비',sub:'예: Kalshi 69%'},{icon:'🤝',big:'TSLA×SPCX',mid:'합병 시나리오',sub:'구조·시기 미상'}],
  quoteLabel:'INVESTING.COM · MUNSTER',quoteKo:'"TSLA와 SpaceX의 합병 확률이 이제 90%"',quoteEn:'"TSLA-SpaceX merger odds now at 90%, per Deepwater\'s Munster"',
  source:'출처: Investing.com · Deepwater\'s Munster · 2026.07.23',
  noteHead:'왜 중요한가: 이전(예: Kalshi 69%) 대비 큰 폭 상승 · 구조·시기 논쟁 촉발',noteSub:'앞으로 볼 것: 공식 발표 여부·주주 승인·구조 방안(현금 vs 주식)',footer:'TSLA·SPCX · Munster 90%',brand:BK},
 en:{title:'TSLA·SPCX Merger Odds — Now 90% (Deepwater Munster)',heroIcon:'🤝',heroBig:'90 %',heroSub:'Deepwater\'s Munster puts TSLA-SPCX merger odds near 90% · big jump from earlier levels',
  cards:[{icon:'📊',big:'90 %',mid:'Merger odds',sub:'Munster comment'},{icon:'⬆️',big:'Up',mid:'From prior consensus',sub:'e.g. Kalshi 69%'},{icon:'🤝',big:'TSLA×SPCX',mid:'Merger scenario',sub:'structure/timing TBD'}],
  quoteLabel:'INVESTING.COM · MUNSTER',quoteKo:'"합병 확률 이제 90%"',quoteEn:'"TSLA-SpaceX merger odds now at 90%, per Deepwater\'s Munster"',
  source:'Source: Investing.com · Deepwater\'s Munster · 2026.07.23',
  noteHead:'Why: Big jump from prior levels (e.g. Kalshi 69%) · triggers structure/timing debate',noteSub:'Watch: official announcement, shareholder approvals, deal structure (cash vs stock)',footer:'TSLA·SPCX · Munster 90%',brand:BE}},

// 18. GOOGL 2026 CAPEX $200B + MAG7 $1T
{file:'googl-capex-200b-mag7-1t',symbol:'GOOGL',
 ko:{title:'GOOGL — 2026 CAPEX $200B 상향 · MAG 7 합계 $1T+',heroIcon:'💵',heroBig:'$200 B',heroSub:'Alphabet(GOOGL)가 2026 CAPEX 가이던스를 $200B로 상향 · MAG 7 합계 곧 $1T+',
  cards:[{icon:'💵',big:'$200 B',mid:'GOOGL 2026 CAPEX',sub:'가이던스 상향'},{icon:'📊',big:'$1 T +',mid:'MAG 7 합계 예상',sub:'곧 돌파'},{icon:'📅',big:'2년 전',mid:'GOOGL 시총만 함',sub:'이 정도 CAPEX 규모'}],
  quoteLabel:'THE KOBEISSI LETTER',quoteKo:'"이 CAPEX만으로도 20년 전 Alphabet 시가총액보다 크다"',quoteEn:'"This annual CAPEX alone is larger than Alphabet\'s market cap 20 years ago"',
  source:'출처: The Kobeissi Letter · 2026.07.23',
  noteHead:'왜 중요한가: 하이퍼스케일러 지출 사상 최대 집중 · AI 인프라 사이클 재확인',noteSub:'앞으로 볼 것: MSFT·AMZN·META CAPEX 가이던스와의 합계',footer:'GOOGL CAPEX · MAG7 $1T+',brand:BK},
 en:{title:'GOOGL — 2026 CAPEX Raised to $200B · MAG 7 Total Soon $1T+',heroIcon:'💵',heroBig:'$200 B',heroSub:'Alphabet (GOOGL) raises 2026 CAPEX guidance to $200B · MAG 7 combined soon $1T+',
  cards:[{icon:'💵',big:'$200 B',mid:'GOOGL 2026 CAPEX',sub:'guidance raise'},{icon:'📊',big:'$1 T +',mid:'MAG 7 combined',sub:'soon to cross'},{icon:'📅',big:'20 yr ago',mid:'GOOGL market cap',sub:'was this size'}],
  quoteLabel:'THE KOBEISSI LETTER',quoteKo:'"이 CAPEX만으로도 20년 전 Alphabet 시총보다 크다"',quoteEn:'"This annual CAPEX alone is larger than Alphabet\'s market cap 20 years ago"',
  source:'Source: The Kobeissi Letter · 2026.07.23',
  noteHead:'Why: Peak concentration of hyperscaler spend · AI infra cycle reaffirmed',noteSub:'Watch: MSFT/AMZN/META CAPEX guides for combined total',footer:'GOOGL CAPEX · MAG7 $1T+',brand:BE}},

// 19. GOOGL FCF negative + market cap drop
{file:'googl-fcf-neg-cap-drop',symbol:'GOOGL',
 ko:{title:'GOOGL — Q2 FCF 첫 음전환 -$5.9B + 시총 -$84B 하락',heroIcon:'💸',heroBig:'−$5.9 B',heroSub:'Google이 상장 이후 처음으로 분기 FCF 음전환 · 대규모 CAPEX 여파 · 시총 하루 -$84B',
  cards:[{icon:'💸',big:'−$5.9 B',mid:'Q2 FCF (첫 음전환)',sub:'AI 인프라 CAPEX 급증'},{icon:'📉',big:'−$84 B',mid:'하루 시총 감소',sub:'unusual_whales'},{icon:'📊',big:'Q1 → Q2',mid:'FCF 급감 추세',sub:'$24.6B → -$5.9B'}],
  quoteLabel:'CHARLIE BILELLO · UNUSUAL_WHALES',quoteKo:'"Google이 공개기업 역사상 처음으로 분기 FCF가 음전환"',quoteEn:'"First time in Google\'s public history that quarterly FCF turned negative"',
  source:'출처: Charlie Bilello · unusual_whales · 2026.07.23',
  noteHead:'왜 중요한가: 매출·EPS 비트했지만 FCF는 CAPEX 폭증에 눌림',noteSub:'앞으로 볼 것: FCF 회복 시점 · 감가상각·마진 프로파일 변화',footer:'GOOGL · FCF -$5.9B · cap -$84B',brand:BK},
 en:{title:'GOOGL — Q2 FCF First Negative at -$5.9B + Market Cap Drops $84B',heroIcon:'💸',heroBig:'−$5.9 B',heroSub:'First-ever quarterly FCF negative for Google (post-listing) · large CAPEX driver · $84B market-cap drop in a day',
  cards:[{icon:'💸',big:'−$5.9 B',mid:'Q2 FCF (first negative)',sub:'AI infra CAPEX surge'},{icon:'📉',big:'−$84 B',mid:'Market-cap drop',sub:'per unusual_whales'},{icon:'📊',big:'Q1 → Q2',mid:'FCF slide',sub:'$24.6B → -$5.9B'}],
  quoteLabel:'CHARLIE BILELLO · UNUSUAL_WHALES',quoteKo:'"공개기업 역사상 첫 분기 FCF 음전환"',quoteEn:'"First time in Google\'s public history that quarterly FCF turned negative"',
  source:'Source: Charlie Bilello · unusual_whales · 2026.07.23',
  noteHead:'Why: Beat on rev/EPS but FCF crushed by exploding CAPEX',noteSub:'Watch: FCF recovery timing · margin & depreciation profile',footer:'GOOGL · FCF -$5.9B · cap -$84B',brand:BE}},

// 20. INTC Q3 크게 비트 + 주가 +2.15% 상승 (정정)
{file:'intc-q3-beat-up',symbol:'INTC',
 ko:{title:'INTC Q3 — EPS·매출 크게 비트 · 주가 +2.15% 상승',heroIcon:'📈',heroBig:'+2.15 %',heroSub:'Intel Q3 EPS $0.42(컨센 $0.21의 2배) · 매출 $18.10B(컨센 $14.14B) · 주가 상승 반응',
  cards:[{icon:'💵',big:'$18.10 B',mid:'매출 (컨센 $14.14B)',sub:'큰 폭 비트'},{icon:'📈',big:'$0.42',mid:'EPS (컨센 $0.21)',sub:'2배 비트'},{icon:'💹',big:'+2.15 %',mid:'INTC 주가',sub:'긍정 반응'}],
  quoteLabel:'UNUSUAL_WHALES · INVESTING.COM',quoteKo:'"Intel Q3 EPS/매출 컨센 크게 상회 · 가이던스 Q3 매출 $18.8~19.4B"',quoteEn:'"Intel Q3 EPS and revenue crushed consensus · Q3 guide $18.8-19.4B"',
  source:'출처: unusual_whales · Investing.com · 2026.07.23',
  noteHead:'왜 중요한가: 반도체 사이클·파운드리 재무 정상화의 정량 신호',noteSub:'앞으로 볼 것: Q4 가이던스 지속성·파운드리 매출·CHIPS Act 활용',footer:'INTC · Q3 beat · +2.15%',brand:BK},
 en:{title:'INTC Q3 — Big Beat on EPS/Rev · Stock Up +2.15%',heroIcon:'📈',heroBig:'+2.15 %',heroSub:'Intel Q3 EPS $0.42 (2× consensus $0.21) · Rev $18.10B (vs $14.14B) · positive stock reaction',
  cards:[{icon:'💵',big:'$18.10 B',mid:'Rev (est $14.14B)',sub:'big beat'},{icon:'📈',big:'$0.42',mid:'EPS (est $0.21)',sub:'2× beat'},{icon:'💹',big:'+2.15 %',mid:'INTC stock',sub:'positive reaction'}],
  quoteLabel:'UNUSUAL_WHALES · INVESTING.COM',quoteKo:'"Intel Q3 크게 비트 · Q3 매출 가이드 $18.8~19.4B"',quoteEn:'"Intel Q3 EPS and revenue crushed consensus · Q3 guide $18.8-19.4B"',
  source:'Source: unusual_whales · Investing.com · 2026.07.23',
  noteHead:'Why: Quantitative signal of semi cycle & foundry normalization',noteSub:'Watch: Q4 guide sustainability · foundry revenue · CHIPS Act leverage',footer:'INTC · Q3 beat · +2.15%',brand:BE}},

// 21. Macro — S&P 500 guidance record
{file:'macro-sp500-guidance-record',symbol:'MACRO',
 ko:{title:'MACRO — S&P 500 실적 가이던스가 사상 최대 폭으로 컨센 상회',heroIcon:'📈',heroBig:'RECORD',heroSub:'Barchart: S&P 500 기업 실적 가이던스가 애널리스트 예상을 사상 최대 폭으로 상회',
  cards:[{icon:'📈',big:'Record',mid:'가이던스 상회 폭',sub:'사상 최대 규모'},{icon:'🏢',big:'S&P 500',mid:'전체 지수 대상',sub:'섹터 광범위'},{icon:'📊',big:'컨센 상회',mid:'애널리스트 예상 vs 실체',sub:'상향 재조정 필요'}],
  quoteLabel:'BARCHART',quoteKo:'"S&P 500 기업 가이던스가 애널리스트 예상을 사상 최대 폭으로 상회"',quoteEn:'"S&P 500 corporate guidance surpassing analyst estimates by the largest margin ever recorded"',
  source:'출처: Barchart · 2026.07.23',
  noteHead:'왜 중요한가: 컨센 상향 사이클이 지속되며 EPS 성장 상단 확대',noteSub:'앞으로 볼 것: 섹터별 상향 폭 비교 · 대형주 vs 중소형주',footer:'MACRO · SPX guidance ATH',brand:BK},
 en:{title:'MACRO — S&P 500 Guidance Beats Estimates by Record Margin',heroIcon:'📈',heroBig:'RECORD',heroSub:'Barchart: S&P 500 corporate guidance surpasses analyst estimates by the largest margin ever recorded',
  cards:[{icon:'📈',big:'Record',mid:'Beat margin',sub:'all-time largest'},{icon:'🏢',big:'S&P 500',mid:'Index-wide',sub:'across sectors'},{icon:'📊',big:'Beat cons.',mid:'Analyst vs reality',sub:'upward revisions ahead'}],
  quoteLabel:'BARCHART',quoteKo:'"S&P 500 가이던스가 사상 최대 폭 상회"',quoteEn:'"S&P 500 corporate guidance surpassing analyst estimates by the largest margin ever recorded"',
  source:'Source: Barchart · 2026.07.23',
  noteHead:'Why: Consensus-upgrade cycle continues, expanding EPS ceiling',noteSub:'Watch: sector-level beat margins, mega vs small caps',footer:'MACRO · SPX guidance ATH',brand:BE}},

// 22. Macro — Gold overtakes US treasuries
{file:'macro-gold-usts-top-reserve',symbol:'MACRO',
 ko:{title:'MACRO — 금이 미국 국채 앞질러 세계 최대 준비자산',heroIcon:'🥇',heroBig:'GOLD #1',heroSub:'Barchart: 금이 미국 국채를 초월해 세계에서 가장 큰 준비자산이 됐다',
  cards:[{icon:'🥇',big:'금 #1',mid:'세계 준비자산 1위',sub:'US Treasuries 초월'},{icon:'📉',big:'USTs',mid:'상대적 지위 하락',sub:'전통적 안전자산 재편'},{icon:'🌍',big:'중앙은행',mid:'매입 지속',sub:'다변화 흐름'}],
  quoteLabel:'BARCHART',quoteKo:'"금이 세계 최대 준비자산으로 미국 국채를 초월"',quoteEn:'"Gold has overtaken US Treasuries as the world\'s top reserve asset"',
  source:'출처: Barchart · 2026.07.23',
  noteHead:'왜 중요한가: 준비자산 구조 변화 · 달러·미국채 신뢰 재조명',noteSub:'앞으로 볼 것: BRICs 매입 흐름 · 금 ETF·마이닝 회사 파급',footer:'MACRO · Gold vs USTs',brand:BK},
 en:{title:'MACRO — Gold Overtakes US Treasuries as World\'s Top Reserve Asset',heroIcon:'🥇',heroBig:'GOLD #1',heroSub:'Barchart: Gold has overtaken US Treasuries as the world\'s largest reserve asset',
  cards:[{icon:'🥇',big:'Gold #1',mid:'World reserve asset',sub:'past US Treasuries'},{icon:'📉',big:'USTs',mid:'Relative decline',sub:'safe-asset reshuffle'},{icon:'🌍',big:'Central banks',mid:'Continued buying',sub:'diversification flow'}],
  quoteLabel:'BARCHART',quoteKo:'"금이 세계 최대 준비자산"',quoteEn:'"Gold has overtaken US Treasuries as the world\'s top reserve asset"',
  source:'Source: Barchart · 2026.07.23',
  noteHead:'Why: Reserve-asset structure shifting · dollar/Treasury credibility in focus',noteSub:'Watch: BRICs buying · gold ETFs and miners impact',footer:'MACRO · Gold vs USTs',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260724.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260724-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
