// 2026-07-31 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.07.31';

const PSYM = {
  TSLA: { fg:'#4ade80', fg2:'#22c55e', bg2:'#061209', card:'#0a1a0a' },
  NVDA: { fg:'#60a5fa', fg2:'#3b82f6', bg2:'#06121f', card:'#0a1420' },
  SPCX: { fg:'#c084fc', fg2:'#a78bfa', bg2:'#140b1f', card:'#1a0f2a' },
  GOOGL:{ fg:'#4285f4', fg2:'#34a853', bg2:'#06121f', card:'#0a1420' },
  MSFT: { fg:'#00a4ef', fg2:'#0078d4', bg2:'#061219', card:'#0a1520' },
  INTC: { fg:'#0071c5', fg2:'#00558a', bg2:'#06121f', card:'#0a1420' },
  AMD:  { fg:'#ed1c24', fg2:'#c00000', bg2:'#1a0606', card:'#200a0a' },
  LMT:  { fg:'#facc15', fg2:'#eab308', bg2:'#1a1408', card:'#1e1a0a' },
  PARA: { fg:'#f97316', fg2:'#ea580c', bg2:'#1a0f06', card:'#1e1408' },
  VZ:   { fg:'#ef4444', fg2:'#dc2626', bg2:'#1a0808', card:'#1e0a0a' },
  CMCSA:{ fg:'#0089cf', fg2:'#005a8f', bg2:'#050f1a', card:'#0a1a26' },
  OAI:  { fg:'#10a37f', fg2:'#0d8465', bg2:'#061a15', card:'#0a2018' },
  AAPL: { fg:'#a1a1aa', fg2:'#71717a', bg2:'#0f0f10', card:'#141416' },
  AVGO: { fg:'#c62828', fg2:'#8f1d20', bg2:'#180505', card:'#1e0808' },
  BRK:  { fg:'#0891b2', fg2:'#0e7490', bg2:'#061219', card:'#0a1520' },
  SSNLF:{ fg:'#1f4e9d', fg2:'#163d7c', bg2:'#050c19', card:'#0a1420' },
  META: { fg:'#1877f2', fg2:'#1266d6', bg2:'#050c19', card:'#0a1420' },
  BLK:  { fg:'#000000', fg2:'#374151', bg2:'#0c0c0c', card:'#141416' },
  AMZN: { fg:'#ff9900', fg2:'#e58600', bg2:'#1a0e00', card:'#201408' },
  KO:   { fg:'#f40009', fg2:'#c00007', bg2:'#1a0505', card:'#200a0a' },
  UBER: { fg:'#22c55e', fg2:'#16a34a', bg2:'#061a0d', card:'#0a2014' },
  V:    { fg:'#1a1f71', fg2:'#0f1447', bg2:'#050614', card:'#0a0c1e' },
  MACRO:{ fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
  SPX:  { fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
};

function esc(s){return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g,'&amp;').replace(/</g,'&lt;');}
function E(o){const r={};for(const k in o)r[k]=typeof o[k]==='string'?esc(o[k]):o[k];return r;}

// === 새 wrap 로직 (2026-07-30~) ===
// 폰트 고정 · 폭 초과 시에만 문맥 기반 wrap
function estimatePxWidth(text, fontSize){
  let w=0;
  for(const c of String(text)){
    if(/[가-힣一-龥]/.test(c)) w += fontSize;
    else if(/\s/.test(c)) w += fontSize*0.3;
    else if(/[·—:]/.test(c)) w += fontSize*0.4;
    else if(/[A-Z0-9]/.test(c)) w += fontSize*0.6;
    else w += fontSize*0.5;
  }
  return w;
}

// 폭 초과 시에만 wrap · 우선순위: (1) 절 구분자(·—) → (2) 공백 → (3) 강제 자르기
function multilineIfOverflow(text, x, y, fontSize, maxPxWidth, maxLines, lh, attrs){
  const px = estimatePxWidth(text, fontSize);
  if(px <= maxPxWidth){
    return `  <text x="${x}" y="${y}" ${attrs}>${esc(text)}</text>`;
  }
  // 폭 초과 → 절 구분자 기준 분리
  const parts = String(text).split(/(\s·\s|\s—\s|·|—)/).filter(p=>p!==undefined&&p!=='');
  const lines=[]; let cur='';
  for(const p of parts){
    const test = cur + p;
    if(estimatePxWidth(test, fontSize) <= maxPxWidth) cur = test;
    else{
      if(cur.trim()) lines.push(cur.trim());
      cur = p.replace(/^[·—\s]+/,'').trim();
      if(lines.length >= maxLines - 1){
        // 마지막 줄
        if(estimatePxWidth(cur, fontSize) > maxPxWidth){
          // 단어 단위 자르기
          const words = cur.split(/(\s+)/);
          let last='';
          for(const w of words){
            if(estimatePxWidth(last + w, fontSize) <= maxPxWidth - fontSize) last += w;
            else break;
          }
          cur = (last.trim()||cur.slice(0, Math.floor(maxPxWidth/fontSize)-1)) + '…';
        }
        break;
      }
    }
  }
  if(cur.trim() && lines.length < maxLines) lines.push(cur.trim());
  return lines.slice(0, maxLines).map((l,i) =>
    `  <text x="${x}" y="${y+i*lh}" ${attrs}>${esc(l)}</text>`
  ).join('\n');
}

// === 고정 폰트 사이즈 (모바일 가독성 우선) ===
const F = {
  TITLE: 28, HERO_BIG: 42, HERO_SUB: 20,
  QUOTE_KO: 20, QUOTE_EN: 17,
  NOTE_HEAD: 19, NOTE_SUB: 17,
  CARD_BIG: 22, CARD_MID: 18, CARD_SUB: 16
};
// 실제 사용 폭 (양쪽 여백 40px씩 · 카드 300px)
const MAX_W = { WIDE: 980, CARD: 260 };

function tpl(oRaw){
  const o=E(oRaw);
  const p=PSYM[oRaw.symbol]||PSYM.MACRO;
  const badge=o.badge||o.symbol;
  const cards=oRaw.cards.map((cRaw,i)=>{
    const c=E(cRaw);const x=[60,390,720][i];
    return`
  <rect x="${x}" y="402" width="300" height="220" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
  <text x="${x+150}" y="450" font-family="Arial" font-size="36" text-anchor="middle">${c.icon}</text>
  <text x="${x+150}" y="494" font-family="Arial Black,Arial" font-size="${F.CARD_BIG}" font-weight="900" fill="${p.fg}" text-anchor="middle">${c.big}</text>
${multilineIfOverflow(cRaw.mid, x+150, 528, F.CARD_MID, MAX_W.CARD, 2, 22, `font-family="Arial" font-size="${F.CARD_MID}" fill="#9ca3af" text-anchor="middle"`)}
${multilineIfOverflow(cRaw.sub, x+150, 588, F.CARD_SUB, MAX_W.CARD, 2, 20, `font-family="Arial" font-size="${F.CARD_SUB}" fill="#6b7280" text-anchor="middle"`)}`;
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
${multilineIfOverflow(oRaw.title, 540, 108, F.TITLE, MAX_W.WIDE, 2, 36, `font-family="Arial Black,Arial" font-size="${F.TITLE}" font-weight="900" fill="#f9fafb" text-anchor="middle"`)}
  <line x1="80" y1="150" x2="1000" y2="150" stroke="#1f2937" stroke-width="1"/>
  <text x="540" y="240" font-family="Arial Black,Arial" font-size="90" font-weight="900" fill="${p.fg}" text-anchor="middle" opacity=".15">${o.heroIcon}</text>
  <text x="540" y="240" font-family="Arial Black,Arial" font-size="76" font-weight="900" fill="${p.fg}" text-anchor="middle">${o.heroIcon}</text>
  <text x="540" y="300" font-family="Arial Black,Arial" font-size="${F.HERO_BIG}" font-weight="900" fill="#f9fafb" text-anchor="middle">${o.heroBig}</text>
${multilineIfOverflow(oRaw.heroSub, 540, 340, F.HERO_SUB, MAX_W.WIDE, 2, 26, `font-family="Arial" font-size="${F.HERO_SUB}" fill="#9ca3af" text-anchor="middle"`)}
  <line x1="80" y1="390" x2="1000" y2="390" stroke="#1f2937" stroke-width="1"/>
${cards}
  <rect x="60" y="642" width="960" height="180" rx="16" fill="#0f172a" stroke="#374151"/>
  <text x="540" y="682" font-family="Arial" font-size="18" fill="#6b7280" text-anchor="middle" letter-spacing="2">${o.quoteLabel}</text>
${multilineIfOverflow(oRaw.quoteKo, 540, 714, F.QUOTE_KO, MAX_W.WIDE, 2, 26, `font-family="Arial" font-size="${F.QUOTE_KO}" fill="${p.fg}" text-anchor="middle"`)}
${multilineIfOverflow(oRaw.quoteEn, 540, 772, F.QUOTE_EN, MAX_W.WIDE, 2, 24, `font-family="Arial" font-size="${F.QUOTE_EN}" fill="#e5e7eb" text-anchor="middle"`)}
  <text x="540" y="826" font-family="Arial" font-size="15" fill="#6b7280" text-anchor="middle">${o.source}</text>
  <rect x="60" y="850" width="960" height="110" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1"/>
${multilineIfOverflow(oRaw.noteHead, 540, 884, F.NOTE_HEAD, MAX_W.WIDE, 2, 26, `font-family="Arial" font-size="${F.NOTE_HEAD}" fill="${p.fg}" text-anchor="middle"`)}
${multilineIfOverflow(oRaw.noteSub, 540, 930, F.NOTE_SUB, MAX_W.WIDE, 2, 24, `font-family="Arial" font-size="${F.NOTE_SUB}" fill="#9ca3af" text-anchor="middle"`)}
  <text x="540" y="994" font-family="Arial" font-size="16" fill="#374151" text-anchor="middle">${o.footer} · ${DATE}</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#g)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${o.brand}</text>
</svg>`;
}

const BK='INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE';
const BE='INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE';

const T=[
// 1. SPCX Falcon 9 $1.8B US Space Force
{file:'spcx-falcon9-18b-space-force',symbol:'SPCX',
 ko:{title:'SPCX — Falcon 9 $1.8B 미 우주군 계약 · 2027까지 · NSSL Phase 3 최대',heroIcon:'🚀',heroBig:'$1.8 B',heroSub:'SpaceX가 미 우주군 Space-Based Sensing/Targeting 포트폴리오 $1.8B 계약 · Vandenberg에서 월 1회 발사 · 2027까지 · NSSL Phase 3 Lane 1 최대 task',
  cards:[{icon:'🚀',big:'$1.8 B',mid:'미 우주군 계약',sub:'Space-Based Sensing/Targeting'},{icon:'📅',big:'2027 까지',mid:'월 1회 Falcon 9',sub:'Vandenberg 발사'},{icon:'🎯',big:'NSSL P3',mid:'Lane 1 최대 task',sub:'단일 최대 규모'}],
  quoteLabel:'JOE HANSEN',quoteKo:'"SpaceX가 미 우주군 Falcon 9 $1.8B 계약 · Vandenberg에서 월 1회 · 2027까지"',quoteEn:'"SpaceX won $1.8B US Space Force contract · one Falcon 9 per month from Vandenberg through 2027"',
  source:'출처: Joe Hansen · 2026.07.30',
  noteHead:'왜 중요한가: 어제 $1.6B 계약(18 미션)에 이은 두번째 대형 정부 계약 · 국가 안보 매출 축 확대',noteSub:'앞으로 볼 것: NSSL Phase 3 후속 계약·NRO 파트너십·Starship 상용 계약',footer:'SPCX · Space Force $1.8B',brand:BK},
 en:{title:'SPCX — Falcon 9 $1.8B US Space Force Contract · Through 2027 · Largest NSSL Phase 3 Task',heroIcon:'🚀',heroBig:'$1.8 B',heroSub:'SpaceX awarded $1.8B for US Space Force Space-Based Sensing/Targeting portfolio · one Falcon 9 per month from Vandenberg through 2027 · largest NSSL Phase 3 Lane 1 task',
  cards:[{icon:'🚀',big:'$1.8 B',mid:'US Space Force deal',sub:'Space-Based Sensing/Targeting'},{icon:'📅',big:'Through 2027',mid:'One Falcon 9/month',sub:'Vandenberg launches'},{icon:'🎯',big:'NSSL P3',mid:'Largest Lane 1 task',sub:'single-largest task order'}],
  quoteLabel:'JOE HANSEN',quoteKo:'"미 우주군 $1.8B · 월 1회 발사 · 2027까지"',quoteEn:'"SpaceX won $1.8B US Space Force contract · one Falcon 9 per month from Vandenberg through 2027"',
  source:'Source: Joe Hansen · 2026.07.30',
  noteHead:'Why: Second large government contract after yesterday\'s $1.6B (18 missions) · national-security revenue axis expands',noteSub:'Watch: NSSL Phase 3 follow-ons · NRO partnership · Starship commercial contracts',footer:'SPCX · Space Force $1.8B',brand:BE}},

// 2. NHTSA AV policy overhaul
{file:'nhtsa-av-policy-overhaul',symbol:'MACRO',
 ko:{title:'NHTSA — AV 정책 대개편 · L4 표준화·SGO 3년·ADSDONO 컨소시엄',heroIcon:'🏛️',heroBig:'AV REFORM',heroSub:'미 교통부장관 Sean Duffy가 NHTSA에 AV 정책 대개편 지시 · L4 성능 표준 가속·SGO 3년/$5M ADSDONO 컨소시엄·단일 국가 안전 표준·FMVSS 개정',
  cards:[{icon:'🎯',big:'L4 표준',mid:'SAE 산업 파트너십',sub:'성능 표준 가속'},{icon:'📋',big:'3년/$5M',mid:'ADSDONO 컨소시엄',sub:'안전 데이터 공유'},{icon:'🇺🇸',big:'단일 국가 표준',mid:'50개주 패치워크 해소',sub:'혁신 저해 요인 제거'}],
  quoteLabel:'SAWYER MERRITT · SEAN DUFFY',quoteKo:'"NHTSA가 AV 안전 데이터 위한 3년/$5M ADSDONO 컨소시엄·단일 국가 표준 지시"',quoteEn:'"NHTSA to establish 3-year/$5M ADSDONO consortium · single national AV safety standard"',
  source:'출처: Sawyer Merritt · Sean Duffy · 2026.07.30',
  noteHead:'왜 중요한가: 자율주행 상용화 규제 장벽 해소 · Tesla·Waymo 등 전면 수혜',noteSub:'앞으로 볼 것: 실 표준 발효 시점·주별 규제 조정·L5 후속 논의',footer:'NHTSA · AV 정책 대개편',brand:BK},
 en:{title:'NHTSA — Major AV Policy Overhaul · L4 Standards · 3-Yr/$5M ADSDONO Consortium',heroIcon:'🏛️',heroBig:'AV REFORM',heroSub:'US Transportation Secretary Sean Duffy directs NHTSA to overhaul AV policy · accelerate L4 performance standards · 3-year/$5M ADSDONO consortium · single national safety standard · FMVSS updates',
  cards:[{icon:'🎯',big:'L4 stds',mid:'SAE industry partnership',sub:'perf standard acceleration'},{icon:'📋',big:'3-yr/$5M',mid:'ADSDONO consortium',sub:'safety data sharing'},{icon:'🇺🇸',big:'National std',mid:'Ends 50-state patchwork',sub:'removes innovation drag'}],
  quoteLabel:'SAWYER MERRITT · SEAN DUFFY',quoteKo:'"NHTSA ADSDONO 컨소시엄·단일 국가 표준"',quoteEn:'"NHTSA to establish 3-year/$5M ADSDONO consortium · single national AV safety standard"',
  source:'Source: Sawyer Merritt · Sean Duffy · 2026.07.30',
  noteHead:'Why: Removes AV commercialization regulatory barrier · Tesla/Waymo etc. all benefit',noteSub:'Watch: real standard effective date · state-level adjustments · L5 follow-up',footer:'NHTSA · AV policy overhaul',brand:BE}},

// 3. TSLA Cybercab regulatory edge vs Zoox 2500 cap
{file:'tsla-cybercab-regulatory-edge',symbol:'TSLA',
 ko:{title:'TSLA — Cybercab 규제 우위 · Zoox 2,500대 cap vs Tesla 자기 인증 무제한',heroIcon:'⚙️',heroBig:'NO CAP',heroSub:'NHTSA가 Zoox에 2,500대 임시 배치 exemption 부여했지만 2년간 제한 · Tesla는 Cybercab을 기존 규정에 맞춰 self-certify · cap 미적용 · 무제한 생산',
  cards:[{icon:'⛔',big:'2,500 cap',mid:'Zoox 임시 exemption',sub:'2년 제한'},{icon:'🏭',big:'무제한',mid:'Tesla self-certify',sub:'기존 규정 준수'},{icon:'⚡',big:'제조 우위',mid:'공장 캐파만큼',sub:'승인 대기 없음'}],
  quoteLabel:'MING',quoteKo:'"Tesla가 Cybercab을 기존 규정으로 self-certify · 2,500 cap 미적용"',quoteEn:'"Tesla self-certifies Cybercab under existing rules · 2,500 cap does not apply"',
  source:'출처: Ming · 2026.07.30',
  noteHead:'왜 중요한가: Cybercab이 규제 exemption 없이 무제한 배치 가능 · Zoox 대비 대량 우위',noteSub:'앞으로 볼 것: DOT 협력·주별 로보택시 규제 조정·실 배포 확대 속도',footer:'TSLA Cybercab · 규제 우위',brand:BK},
 en:{title:'TSLA — Cybercab Regulatory Edge · Zoox 2,500 Cap vs Tesla Self-Certify Unlimited',heroIcon:'⚙️',heroBig:'NO CAP',heroSub:'NHTSA grants Zoox temporary 2,500-unit exemption for 2 years · Tesla self-certified Cybercab under existing rules · cap does NOT apply · unlimited production',
  cards:[{icon:'⛔',big:'2,500 cap',mid:'Zoox exemption',sub:'2-year limit'},{icon:'🏭',big:'Unlimited',mid:'Tesla self-certify',sub:'existing rules'},{icon:'⚡',big:'Mfg edge',mid:'As factories can build',sub:'no waiver wait'}],
  quoteLabel:'MING',quoteKo:'"Tesla가 self-certify · 2,500 cap 미적용"',quoteEn:'"Tesla self-certifies Cybercab under existing rules · 2,500 cap does not apply"',
  source:'Source: Ming · 2026.07.30',
  noteHead:'Why: Cybercab can deploy without regulatory exemption · massive scale edge vs Zoox',noteSub:'Watch: DOT cooperation · state-level robotaxi regulation · real deployment pace',footer:'TSLA Cybercab · regulatory edge',brand:BE}},

// 4. TSLA 10 million vehicle milestone
{file:'tsla-10m-vehicle-milestone',symbol:'TSLA',
 ko:{title:'TSLA — 10 million 차량 생산 마일스톤 · Fremont Diamond Black Model Y',heroIcon:'🏁',heroBig:'10 M',heroSub:'Tesla가 사상 10 million 번째 차량 공식 제조 · Fremont에서 Diamond Black Model Y로 완성 · 2003년 창립 이후 23년 만',
  cards:[{icon:'🏁',big:'10 M',mid:'누적 생산 총 차량',sub:'사상 마일스톤'},{icon:'🏭',big:'Fremont',mid:'생산 시설',sub:'Diamond Black Model Y'},{icon:'📅',big:'23 년',mid:'2003 창립부터',sub:'가속화되는 페이스'}],
  quoteLabel:'SAWYER MERRITT',quoteKo:'"Diamond Black Model Y가 Fremont에서 Tesla 10 millionth 차량"',quoteEn:'"Diamond Black Model Y built at Fremont this week is Tesla\'s 10 millionth vehicle"',
  source:'출처: Sawyer Merritt · 2026.07.30',
  noteHead:'왜 중요한가: 사상 10M 마일스톤·페이스 가속 (초기 100만대까지 12년·10M까지 23년)',noteSub:'앞으로 볼 것: 다음 마일스톤 시점·Cybercab 포함 확장·상하이·베를린 기여',footer:'TSLA · 10 million 차량',brand:BK},
 en:{title:'TSLA — 10 Million Vehicle Manufacturing Milestone · Fremont Diamond Black Model Y',heroIcon:'🏁',heroBig:'10 M',heroSub:'Tesla officially manufactured its 10 millionth vehicle · a Diamond Black Model Y at Fremont · 23 years since 2003 founding',
  cards:[{icon:'🏁',big:'10 M',mid:'Cumulative vehicles built',sub:'historic milestone'},{icon:'🏭',big:'Fremont',mid:'Production facility',sub:'Diamond Black Model Y'},{icon:'📅',big:'23 yrs',mid:'Since 2003 founding',sub:'accelerating pace'}],
  quoteLabel:'SAWYER MERRITT',quoteKo:'"Diamond Black Model Y가 10 millionth"',quoteEn:'"Diamond Black Model Y built at Fremont this week is Tesla\'s 10 millionth vehicle"',
  source:'Source: Sawyer Merritt · 2026.07.30',
  noteHead:'Why: 10M historic milestone · pace accelerating (first 1M took 12 years, 10M took 23)',noteSub:'Watch: next milestone timing · Cybercab inclusion · Shanghai/Berlin contribution',footer:'TSLA · 10M vehicles',brand:BE}},

// 5. GOOGL Anthropic Q2 $53.4B gain
{file:'googl-anthropic-q2-534b-gain',symbol:'GOOGL',
 ko:{title:'GOOGL — Anthropic 지분 가치 Q2에 $53.4B 증가',heroIcon:'💎',heroBig:'+$53.4 B',heroSub:'Evan D: Google이 보유한 Anthropic 지분 가치가 Q2 한 분기에 약 $53.4B 증가 · 7/25 리포트한 $8.4B → 이제 훨씬 큰 규모로 재평가',
  cards:[{icon:'💎',big:'+$53.4 B',mid:'Q2 지분 가치 증가',sub:'단일 분기'},{icon:'📈',big:'재평가',mid:'AI 스타트업 밸류 상승',sub:'라운드 반영'},{icon:'💰',big:'unrealized',mid:'미실현 이익',sub:'회계 반영'}],
  quoteLabel:'EVAN D',quoteKo:'"Google Anthropic 지분 가치가 Q2에 약 $53.4B 증가"',quoteEn:'"Google\'s stake in Anthropic increased in value by roughly $53.4B during Q2"',
  source:'출처: Evan D · 2026.07.30',
  noteHead:'왜 중요한가: GOOGL non-core 자산의 대규모 재평가 · AI 밸류에이션 사이클 확인',noteSub:'앞으로 볼 것: Anthropic IPO 시나리오·다른 하이퍼스케일러 AI 지분 재평가',footer:'GOOGL · Anthropic +$53.4B',brand:BK},
 en:{title:'GOOGL — Anthropic Stake Value Up $53.4B in Q2',heroIcon:'💎',heroBig:'+$53.4 B',heroSub:'Per Evan D: Google\'s Anthropic stake value increased by roughly $53.4B in Q2 alone · from previously reported $8.4B (7/25) to much larger re-mark',
  cards:[{icon:'💎',big:'+$53.4 B',mid:'Q2 stake value increase',sub:'single quarter'},{icon:'📈',big:'Re-mark',mid:'AI startup val rise',sub:'round reflected'},{icon:'💰',big:'Unrealized',mid:'Unrealized gain',sub:'accounting reflected'}],
  quoteLabel:'EVAN D',quoteKo:'"Google Anthropic Q2에 약 $53.4B 증가"',quoteEn:'"Google\'s stake in Anthropic increased in value by roughly $53.4B during Q2"',
  source:'Source: Evan D · 2026.07.30',
  noteHead:'Why: Large-scale re-mark of GOOGL non-core assets · confirms AI valuation cycle',noteSub:'Watch: Anthropic IPO scenarios · other hyperscaler AI-stake re-marks',footer:'GOOGL · Anthropic +$53.4B',brand:BE}},

// 6. AMZN Q2 · $62.6B net income · CAPEX $200B → $220B
{file:'amzn-q2-626b-capex-220b',symbol:'AMZN',
 ko:{title:'AMZN — Q2 순이익 $62.6B(3배) · CAPEX $200B → $220B 상향 · 주가 +8%',heroIcon:'📈',heroBig:'+8 %',heroSub:'Amazon Q2 순이익 $62.6B로 3배 이상 성장(단일 분기 사상 최대 투자 붐) · 2026 CAPEX $200B → $220B 상향 · 2027 더 상향 예정 · 수요 공급보다 훨씬 많음 · 주가 +8%',
  cards:[{icon:'💰',big:'$62.6 B',mid:'Q2 순이익',sub:'전년 대비 3배'},{icon:'🏗️',big:'$220 B',mid:'2026 CAPEX 상향',sub:'$200B 에서'},{icon:'📈',big:'+8 %',mid:'주가 반응',sub:'ROI 스토리 신뢰'}],
  quoteLabel:'WOLF DEN · AMIT',quoteKo:'"AMZN 순이익 3배 $62.6B · CAPEX $220B로 상향 · 수요 공급보다 훨씬 많음"',quoteEn:'"AMZN net income tripled to $62.6B · 2026 CAPEX raised from $200B to $220B · demand still far more than supply"',
  source:'출처: WOLF DEN · amit · 2026.07.30',
  noteHead:'왜 중요한가: 어제 AWS 매 분기 가속·P/E 사상 최저 프레임이 실적으로 확인',noteSub:'앞으로 볼 것: 2027 CAPEX 가이던스·AWS 매출 세부·AI 매출 $77B+ 목표',footer:'AMZN Q2 · $62.6B · $220B',brand:BK},
 en:{title:'AMZN — Q2 Net Income $62.6B (3×) · CAPEX Raised $200B → $220B · Stock +8%',heroIcon:'📈',heroBig:'+8 %',heroSub:'Amazon Q2 net income tripled to $62.6B (largest single-quarter investment boom) · 2026 CAPEX raised from $200B to $220B · 2027 to rise more · demand still far exceeds supply · stock +8%',
  cards:[{icon:'💰',big:'$62.6 B',mid:'Q2 net income',sub:'3× YoY'},{icon:'🏗️',big:'$220 B',mid:'2026 CAPEX raise',sub:'from $200B'},{icon:'📈',big:'+8 %',mid:'Stock reaction',sub:'ROI story trusted'}],
  quoteLabel:'WOLF DEN · AMIT',quoteKo:'"AMZN 순이익 3배·CAPEX $220B·수요 초과"',quoteEn:'"AMZN net income tripled to $62.6B · 2026 CAPEX raised from $200B to $220B · demand still far more than supply"',
  source:'Source: WOLF DEN · amit · 2026.07.30',
  noteHead:'Why: Yesterday\'s AWS-quarterly-accel + P/E-historic-low frame confirmed in print',noteSub:'Watch: 2027 CAPEX guide · AWS revenue detail · AI revenue $77B+ target',footer:'AMZN Q2 · $62.6B · $220B',brand:BE}},

// 7. Leopold Aschenbrenner Situational Awareness Fund liquidated · Citadel bought
{file:'aschenbrenner-fund-liquidated-citadel',symbol:'MACRO',
 ko:{title:'시장 — Leopold Aschenbrenner Situational Awareness Fund 강제 청산 · +439% 후 · Citadel 인수',heroIcon:'💥',heroBig:'FORCED SELL',heroSub:'Situational Awareness Fund가 6월까지 +439% 수익 후 AI 관련 대형 손실로 마진콜 강제 청산 · Citadel이 포트폴리오 인수 · SNTA·TVTX·Bldnr 등 큰 낙폭',
  cards:[{icon:'💥',big:'+439 %',mid:'6월까지 순수익',sub:'그 후 마진콜'},{icon:'🏦',big:'Citadel',mid:'포트폴리오 인수',sub:'스프레드 완화 수혜'},{icon:'📉',big:'SNTA -29.3%',mid:'대표 하락 종목',sub:'매도 여파'}],
  quoteLabel:'BARCHART · CNBC',quoteKo:'"Aschenbrenner의 Situational Awareness가 AI 손실로 강제 청산 · Citadel이 인수"',quoteEn:'"Aschenbrenner\'s Situational Awareness forced to unwind after AI losses · Citadel bought portfolio"',
  source:'출처: Barchart · CNBC · 2026.07.30',
  noteHead:'왜 중요한가: AI 관련 대형 개인 펀드의 강제 청산 · 유동성 리스크 신호',noteSub:'앞으로 볼 것: 다른 AI 헤지펀드 유사 리스크·시장 스프레드 반응',footer:'시장 · Aschenbrenner 청산',brand:BK},
 en:{title:'Market — Leopold Aschenbrenner Situational Awareness Fund Forced Liquidation · After +439% · Citadel Buys',heroIcon:'💥',heroBig:'FORCED SELL',heroSub:'Situational Awareness Fund was up +439% through June, then AI-related big losses triggered margin-call forced liquidation · Citadel bought the portfolio · SNTA/TVTX/Bldnr etc. big drops',
  cards:[{icon:'💥',big:'+439 %',mid:'Net through June',sub:'then margin call'},{icon:'🏦',big:'Citadel',mid:'Bought portfolio',sub:'spread relief winner'},{icon:'📉',big:'SNTA -29.3%',mid:'Rep decline name',sub:'sell-off impact'}],
  quoteLabel:'BARCHART · CNBC',quoteKo:'"Aschenbrenner AI 손실 강제 청산·Citadel 인수"',quoteEn:'"Aschenbrenner\'s Situational Awareness forced to unwind after AI losses · Citadel bought portfolio"',
  source:'Source: Barchart · CNBC · 2026.07.30',
  noteHead:'Why: Forced liquidation of large individual AI-related fund · liquidity risk signal',noteSub:'Watch: similar risks in other AI hedge funds · market spread reactions',footer:'Market · Aschenbrenner liquidation',brand:BE}},

// 8. NVDA Jensen xAI investment
{file:'nvda-jensen-xai-investment-regret',symbol:'NVDA',
 ko:{title:'NVDA Jensen — "xAI에 더 많이 투자하지 못한 것이 유일한 후회"',heroIcon:'💡',heroBig:'xAI ALL-IN',heroSub:'DogeDesigner: Jensen Huang이 "Elon Musk가 하는 거의 모든 것에 참여하고 싶다 · xAI 투자 이미 진행 중 · 더 많이 못 준 것이 유일한 후회"라며 xAI 투자 확대 의지',
  cards:[{icon:'💰',big:'xAI',mid:'투자 확대 의지',sub:'Jensen 발언'},{icon:'😌',big:'유일한 후회',mid:'"더 못 준 것"',sub:'투자 후회 표현'},{icon:'🤝',big:'Elon',mid:'"거의 모든 것에 참여"',sub:'전략적 파트너십'}],
  quoteLabel:'DOGEDESIGNER · JENSEN HUANG',quoteKo:'"Elon Musk가 하는 거의 모든 것에 참여하고 싶다 · xAI에 더 많이 못 준 것이 유일한 후회"',quoteEn:'"I want to be involved in nearly everything Elon Musk does · my only regret is I didn\'t give him more money for xAI"',
  source:'출처: DogeDesigner · 2026.07.30',
  noteHead:'왜 중요한가: NVDA-xAI 전략 결합 심화 · Grok/Colossus에 대한 NVDA 후원 확대 시사',noteSub:'앞으로 볼 것: xAI 다음 라운드·Colossus 확장·xAI 매출 세부',footer:'NVDA-xAI · Jensen 후회',brand:BK},
 en:{title:'NVDA Jensen — "Only Regret Is I Didn\'t Give Elon More Money for xAI"',heroIcon:'💡',heroBig:'xAI ALL-IN',heroSub:'Per DogeDesigner: Jensen Huang says "I want to be involved in nearly everything Elon Musk does · we\'re an investor in xAI already · my only regret is I didn\'t give him more money"',
  cards:[{icon:'💰',big:'xAI',mid:'Investment expansion',sub:'Jensen statement'},{icon:'😌',big:'Only regret',mid:'"Didn\'t give more"',sub:'investment regret expressed'},{icon:'🤝',big:'Elon',mid:'"Nearly everything"',sub:'strategic partnership'}],
  quoteLabel:'DOGEDESIGNER · JENSEN HUANG',quoteKo:'"거의 모든 것에 참여·xAI 더 못 준 것이 후회"',quoteEn:'"I want to be involved in nearly everything Elon Musk does · my only regret is I didn\'t give him more money for xAI"',
  source:'Source: DogeDesigner · 2026.07.30',
  noteHead:'Why: NVDA-xAI strategic bond deepens · signals expanded NVDA backing for Grok/Colossus',noteSub:'Watch: xAI next round · Colossus expansion · xAI revenue detail',footer:'NVDA-xAI · Jensen regret',brand:BE}},

// 9. MSFT Q4 detailed print
{file:'msft-q4-eps-365-rev-764b',symbol:'MSFT',
 ko:{title:'MSFT Q4 — EPS $3.65·Rev $76.4B·Cloud +27%·Azure 43% (다음 가이던스 45%)',heroIcon:'📊',heroBig:'$76.4 B',heroSub:'MSFT Q4 EPS $3.65(컨센 $3.66)·매출 $76.4B(컨센 $76.4B)·클라우드 +27%·Azure 43% YoY·다음 분기 Azure 가이던스 45% YoY · 백로그 +51%·CAPEX +60% 엔터프라이즈 배포',
  cards:[{icon:'💵',big:'$76.4 B',mid:'Q4 매출',sub:'EPS $3.65'},{icon:'☁️',big:'43 % → 45%',mid:'Azure YoY',sub:'다음 분기 가속 예상'},{icon:'📚',big:'+51 %',mid:'Q4 백로그 증가',sub:'FY27 매출 두 자릿수'}],
  quoteLabel:'MICROSOFT · STOCK TALK',quoteKo:'"Azure 43% (다음 45% 가이던스) · 90%가 비프런티어 모델 고객 · 백로그 +51%"',quoteEn:'"Azure 43% (next 45% guide) · 90% cloud revenue from non-frontier · backlog +51%"',
  source:'출처: Microsoft · Stock Talk · 2026.07.30',
  noteHead:'왜 중요한가: MSFT가 프런티어 랩 아닌 하이퍼스케일러로 명시 · Nvidia 가격 우려 대응',noteSub:'앞으로 볼 것: FY27 두 자릿수 매출 가이던스·CAPEX 방향·비프런티어 90% 지속',footer:'MSFT Q4 · $76.4B · Azure 43%',brand:BK},
 en:{title:'MSFT Q4 — EPS $3.65 · Rev $76.4B · Cloud +27% · Azure 43% (Next Guide 45%)',heroIcon:'📊',heroBig:'$76.4 B',heroSub:'MSFT Q4 EPS $3.65 (est $3.66) · Rev $76.4B (est $76.4B) · Cloud +27% · Azure 43% YoY · next-quarter Azure guide 45% YoY · backlog +51% · CAPEX +60% enterprise deployment',
  cards:[{icon:'💵',big:'$76.4 B',mid:'Q4 revenue',sub:'EPS $3.65'},{icon:'☁️',big:'43 % → 45%',mid:'Azure YoY',sub:'next quarter accel expected'},{icon:'📚',big:'+51 %',mid:'Q4 backlog growth',sub:'FY27 double-digit rev'}],
  quoteLabel:'MICROSOFT · STOCK TALK',quoteKo:'"Azure 43%→45% · 90% 비프런티어 · 백로그 +51%"',quoteEn:'"Azure 43% (next 45% guide) · 90% cloud revenue from non-frontier · backlog +51%"',
  source:'Source: Microsoft · Stock Talk · 2026.07.30',
  noteHead:'Why: MSFT positioning as hyperscaler not frontier lab · responds to Nvidia pricing concerns',noteSub:'Watch: FY27 double-digit revenue guide · CAPEX direction · non-frontier 90% sustainability',footer:'MSFT Q4 · $76.4B · Azure 43%',brand:BE}},

// 10. Michael Burry new positions
{file:'burry-mu-soxx-short-googl-amzn-long',symbol:'MACRO',
 ko:{title:'Michael Burry — 신규 포지션 · MU/SOXX/META/DKNG 숏·GOOGL/AMZN 롱',heroIcon:'🎯',heroBig:'BURRY',heroSub:'Michael Burry 신규 공시 · Micron $880 숏 + Semi ETF SOXX $208 숏 + META $600.5·DKNG $23.4 숏 · GOOGL $178 롱 + AMZN $210.5 롱 + Nebius/QuantumScape 롱 · Tesla·Palantir 유지',
  cards:[{icon:'📉',big:'숏',mid:'MU · SOXX · META · DKNG',sub:'반도체·미디어 부정'},{icon:'📈',big:'롱',mid:'GOOGL · AMZN · NEBIS',sub:'하이퍼스케일러 강세'},{icon:'✋',big:'유지',mid:'Tesla · Palantir',sub:'기존 포지션 그대로'}],
  quoteLabel:'MICHAEL BERRY STOCK TRACK',quoteKo:'"Burry 신규 · Micron $880·SOXX $208 숏 · GOOGL $178·AMZN $210 롱 · TSLA·PLTR 유지"',quoteEn:'"Burry adds · Micron $880/SOXX $208 short · GOOGL $178/AMZN $210 long · TSLA/PLTR untouched"',
  source:'출처: Michael Berry Stock Track · 2026.07.30',
  noteHead:'왜 중요한가: 반도체 숏 vs 하이퍼스케일러 롱의 divergence 베팅',noteSub:'앞으로 볼 것: 다음 13F 공시·MU 실적·SOXX 조정 여부',footer:'Burry · MU·SOXX 숏·GOOGL·AMZN 롱',brand:BK},
 en:{title:'Michael Burry — New Positions · Short MU/SOXX/META/DKNG · Long GOOGL/AMZN',heroIcon:'🎯',heroBig:'BURRY',heroSub:'Michael Burry new disclosure · Short Micron $880 + Semi ETF SOXX $208 + META $600.5 + DKNG $23.4 · Long GOOGL $178 + AMZN $210.5 + Nebius/QuantumScape · Tesla/Palantir untouched',
  cards:[{icon:'📉',big:'Shorts',mid:'MU · SOXX · META · DKNG',sub:'semis + media bearish'},{icon:'📈',big:'Longs',mid:'GOOGL · AMZN · NEBIS',sub:'hyperscaler bullish'},{icon:'✋',big:'Holds',mid:'Tesla · Palantir',sub:'existing untouched'}],
  quoteLabel:'MICHAEL BERRY STOCK TRACK',quoteKo:'"Burry 신규·MU 숏·GOOGL 롱·TSLA 유지"',quoteEn:'"Burry adds · Micron $880/SOXX $208 short · GOOGL $178/AMZN $210 long · TSLA/PLTR untouched"',
  source:'Source: Michael Berry Stock Track · 2026.07.30',
  noteHead:'Why: Divergence bet · semi shorts vs hyperscaler longs',noteSub:'Watch: next 13F · MU earnings · SOXX correction',footer:'Burry · MU·SOXX short · GOOGL·AMZN long',brand:BE}},

// 11. Cathie Wood SPCX 356,600 shares $50.2M this week
{file:'wood-spcx-356k-shares-week',symbol:'SPCX',
 ko:{title:'캐시 우드 — 이번 주 SPCX 356,600주 · $50.2M 매수 · 4개 ETF 분산',heroIcon:'💰',heroBig:'$50.2 M',heroSub:'ARK Invest가 월-수 3거래일 SPCX 356,600주(약 $50.2M) 매수 · 매일 매수 · ARKW 229,498주·ARKQ 65,557주·ARKX 31,762주·ARKG 29,745주 분산',
  cards:[{icon:'💰',big:'$50.2 M',mid:'이번 주 매수',sub:'월·화·수 3거래일'},{icon:'📊',big:'356,600 주',mid:'ARK 합계',sub:'4개 ETF 분산'},{icon:'📉',big:'$112.30',mid:'SPCX 현재가',sub:'-0.29% (매수 시점)'}],
  quoteLabel:'ARK INVEST TRACKER',quoteKo:'"ARK가 3거래일에 SPCX 356,600주·$50.2M 매수 · 매일 매수"',quoteEn:'"ARK bought 356,600 SPCX shares (~$50.2M) over 3 trading days · buying every day"',
  source:'출처: Ark Invest Tracker · 2026.07.30',
  noteHead:'왜 중요한가: SPCX -50% ATH 시세에도 우드의 매수 크게 확대 · wall of worry 프레임 실체화',noteSub:'앞으로 볼 것: 목·금 매수 지속·다른 대형 기관 flow 동조',footer:'SPCX · Wood 이번 주 $50.2M',brand:BK},
 en:{title:'Cathie Wood — Bought 356,600 SPCX Shares · $50.2M This Week · 4 ETFs',heroIcon:'💰',heroBig:'$50.2 M',heroSub:'ARK Invest bought 356,600 SPCX shares (~$50.2M) over Mon-Wed 3 trading days · buying every day · ARKW 229,498 · ARKQ 65,557 · ARKX 31,762 · ARKG 29,745',
  cards:[{icon:'💰',big:'$50.2 M',mid:'This-week buy',sub:'Mon·Tue·Wed 3 sessions'},{icon:'📊',big:'356,600 sh',mid:'ARK total',sub:'4 ETFs diversified'},{icon:'📉',big:'$112.30',mid:'SPCX current',sub:'-0.29% at buy'}],
  quoteLabel:'ARK INVEST TRACKER',quoteKo:'"ARK 3거래일 SPCX 356,600주·$50.2M · 매일 매수"',quoteEn:'"ARK bought 356,600 SPCX shares (~$50.2M) over 3 trading days · buying every day"',
  source:'Source: Ark Invest Tracker · 2026.07.30',
  noteHead:'Why: Wood substantially expands buying despite SPCX -50% ATH price · wall-of-worry frame materializes',noteSub:'Watch: Thu/Fri continued buying · other institutional flow alignment',footer:'SPCX · Wood this-week $50.2M',brand:BE}},

// 12. US corporate insiders selling near record pace
{file:'macro-insider-selling-30yr-high',symbol:'MACRO',
 ko:{title:'매크로 — US 기업 임원 매도 30년래 최고 · 클래식 red flag',heroIcon:'🚩',heroBig:'30-YR HIGH',heroSub:'Barchart: US 기업 임원(insider)이 30년래 두번째로 빠른 페이스로 주식 매도 · 시장 최고 정보 보유자의 매도 = 클래식 red flag',
  cards:[{icon:'🚩',big:'2nd fastest',mid:'30년래 매도 속도',sub:'클래식 red flag'},{icon:'👔',big:'Insider',mid:'기업 임원 매도',sub:'최고 정보 보유'},{icon:'⚠️',big:'경고',mid:'시장 상단 시사',sub:'매크로 부담 축적'}],
  quoteLabel:'BARCHART',quoteKo:'"US 임원이 30년래 두번째로 빠르게 매도 · 시장 top 정보 보유자의 신호"',quoteEn:'"US executives selling shares at 2nd-fastest pace in 30+ years · classic red flag from those with most corporate knowledge"',
  source:'출처: Barchart · 2026.07.30',
  noteHead:'왜 중요한가: 밸류 부담·NVDA CDS·KOSPI 급락과 결합된 매크로 경고 신호',noteSub:'앞으로 볼 것: 다음 분기 임원 매도 지속·시장 조정 트리거',footer:'MACRO · Insider 매도 30년 최고',brand:BK},
 en:{title:'MACRO — US Corporate Insiders Selling at 30-Year High Pace · Classic Red Flag',heroIcon:'🚩',heroBig:'30-YR HIGH',heroSub:'Barchart: US corporate insiders selling at 2nd-fastest pace in 30+ years · people with most corporate knowledge selling = classic red flag',
  cards:[{icon:'🚩',big:'2nd fastest',mid:'30-yr selling pace',sub:'classic red flag'},{icon:'👔',big:'Insider',mid:'Corporate exec selling',sub:'most information holders'},{icon:'⚠️',big:'Warning',mid:'Market top signal',sub:'macro burden accumulates'}],
  quoteLabel:'BARCHART',quoteKo:'"US 임원 30년래 두번째 빠른 매도"',quoteEn:'"US executives selling shares at 2nd-fastest pace in 30+ years · classic red flag from those with most corporate knowledge"',
  source:'Source: Barchart · 2026.07.30',
  noteHead:'Why: Macro warning signal combined with valuation burden · NVDA CDS · KOSPI plunge',noteSub:'Watch: next-quarter insider selling continuity · market correction triggers',footer:'MACRO · Insider selling 30-yr high',brand:BE}},

// 13. TSLA AZ Project Sterling official + global Supercharger frame
{file:'tsla-az-project-sterling-official',symbol:'TSLA',
 ko:{title:'TSLA — AZ Project Sterling 태양광 정식 확인 · 458 MW(90%)·2028·Global Supercharger 프레임',heroIcon:'☀️',heroBig:'458 MW',heroSub:'Musk 확인: Tesla가 ContourGlobal Project Sterling(509 MW 태양광 + 350 MW 4h 배터리)에서 90%(458 MW) 인수 · 2028 가동 · Global Supercharger 재생에너지 공급 프레임',
  cards:[{icon:'☀️',big:'458 MW',mid:'Tesla 인수 (90%)',sub:'509 MW 중'},{icon:'🔋',big:'350 MW',mid:'배터리 4시간 결합',sub:'24시간 안정 공급'},{icon:'🌍',big:'Global',mid:'Supercharger 재생',sub:'Musk 프레임 확장'}],
  quoteLabel:'ELON MUSK · SAWYER MERRITT',quoteKo:'"Tesla가 Supercharger 네트워크 재생에너지 공급 위한 push의 일환"',quoteEn:'"Part of Tesla\'s push for renewable energy supply to our Supercharger network globally"',
  source:'출처: Elon Musk · Sawyer Merritt · 2026.07.30',
  noteHead:'왜 중요한가: Musk가 Global Supercharger 재생에너지 프레임 명시적 확인',noteSub:'앞으로 볼 것: 다른 지역 대형 PPA·Megapack 자체 활용·xAI Colossus 전력',footer:'TSLA · AZ Sterling 458 MW·Global',brand:BK},
 en:{title:'TSLA — AZ Project Sterling Solar Officially Confirmed · 458 MW (90%) · 2028 · Global Supercharger Frame',heroIcon:'☀️',heroBig:'458 MW',heroSub:'Musk confirms: Tesla buys 90% (458 MW) of ContourGlobal Project Sterling (509 MW solar + 350 MW 4h battery) · online 2028 · Global Supercharger renewable-supply frame',
  cards:[{icon:'☀️',big:'458 MW',mid:'Tesla purchase (90%)',sub:'of 509 MW'},{icon:'🔋',big:'350 MW',mid:'Battery 4h combined',sub:'24-hr stable supply'},{icon:'🌍',big:'Global',mid:'Supercharger renewable',sub:'Musk frame expanded'}],
  quoteLabel:'ELON MUSK · SAWYER MERRITT',quoteKo:'"Global Supercharger 재생 supply push의 일환"',quoteEn:'"Part of Tesla\'s push for renewable energy supply to our Supercharger network globally"',
  source:'Source: Elon Musk · Sawyer Merritt · 2026.07.30',
  noteHead:'Why: Musk explicitly confirms Global Supercharger renewable-energy frame',noteSub:'Watch: other-region large PPAs · Megapack own-use · xAI Colossus power',footer:'TSLA · AZ Sterling 458 MW · Global',brand:BE}},

// 14. GOOGL-Anthropic $15B DC loan
{file:'googl-anthropic-15b-dc-tx',symbol:'GOOGL',
 ko:{title:'GOOGL-Anthropic — $15B DC 대출 · 텍사스 · 1.6 GW 가스 발전 · Morgan Stanley 주도 (WSJ)',heroIcon:'🏭',heroBig:'$15 B',heroSub:'WSJ: Anthropic 파트너 DC 개발사가 Morgan Stanley 주도 컨소시엄으로 $15B 대출 · 텍사스 Hubbard 대형 캠퍼스 + 1.6 GW 자체 가스 발전 · Google이 지불 보증',
  cards:[{icon:'💰',big:'$15 B',mid:'DC 대출 규모',sub:'MS 주도 컨소시엄'},{icon:'🇺🇸',big:'Hubbard TX',mid:'DC 캠퍼스 위치',sub:'대형 사이트'},{icon:'⚡',big:'1.6 GW',mid:'자체 가스 발전',sub:'그리드 독립 운영'}],
  quoteLabel:'SAWYER MERRITT · WSJ',quoteKo:'"Anthropic DC 개발사가 Google 보증으로 $15B 대출 · 텍사스 1.6 GW 가스 발전 결합"',quoteEn:'"Anthropic DC developer borrowing $15B backed by Google · Texas 1.6 GW gas plant included"',
  source:'출처: Sawyer Merritt · WSJ · 2026.07.30',
  noteHead:'왜 중요한가: OpenAI $500B DC·META×BLK $14B와 다른 하이퍼스케일러 CAPEX 자본 조달 모델',noteSub:'앞으로 볼 것: 완공 시점·Anthropic 매출 성장·다른 프론티어 AI 유사 DC',footer:'GOOGL-Anthropic · $15B TX DC',brand:BK},
 en:{title:'GOOGL-Anthropic — $15B DC Loan · Texas · 1.6 GW Gas Plant · Morgan Stanley Led (WSJ)',heroIcon:'🏭',heroBig:'$15 B',heroSub:'WSJ: Anthropic-partner DC developer borrowing $15B via Morgan Stanley-led consortium · large Hubbard, Texas campus + 1.6 GW own gas plant · Google provides payment guarantee',
  cards:[{icon:'💰',big:'$15 B',mid:'DC loan size',sub:'MS-led consortium'},{icon:'🇺🇸',big:'Hubbard TX',mid:'DC campus location',sub:'large site'},{icon:'⚡',big:'1.6 GW',mid:'Own gas plant',sub:'grid-independent operation'}],
  quoteLabel:'SAWYER MERRITT · WSJ',quoteKo:'"Anthropic DC $15B 대출·Google 보증·1.6GW 가스"',quoteEn:'"Anthropic DC developer borrowing $15B backed by Google · Texas 1.6 GW gas plant included"',
  source:'Source: Sawyer Merritt · WSJ · 2026.07.30',
  noteHead:'Why: New hyperscaler CAPEX financing model distinct from OpenAI $500B DC and META×BLK $14B',noteSub:'Watch: completion timing · Anthropic revenue growth · other frontier AI similar DCs',footer:'GOOGL-Anthropic · $15B TX DC',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260731.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260731-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
