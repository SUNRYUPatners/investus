// 2026-07-30 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.07.30';

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
// 1. MSFT Q4 · Azure $100B · Copilot 30M · Azure 43% YoY
{file:'msft-q4-azure-100b-copilot-30m',symbol:'MSFT',
 ko:{title:'MSFT — Azure $100B 첫 돌파 · Copilot 30M+ 유료 · Azure 43% 재가속',heroIcon:'☁️',heroBig:'$100 B+',heroSub:'Microsoft Q4 실적 · Azure 매출 $100B 첫 돌파 · Copilot 30M+ 유료 사용자 · Azure 성장률 43% YoY로 재가속 · 클라우드 매출 $155B(+76% YoY)',
  cards:[{icon:'☁️',big:'$100 B',mid:'Azure 매출 첫 돌파',sub:'분기 기준 사상 최초'},{icon:'🤖',big:'30 M+',mid:'Copilot 유료 사용자',sub:'M365 통합 확산'},{icon:'📈',big:'43 %',mid:'Azure YoY 재가속',sub:'AI 워크로드 견인'}],
  quoteLabel:'MICROSOFT · EVAN D',quoteKo:'"Azure 매출 사상 첫 $100B 돌파 · Copilot 30M+ 유료 · Azure 43% 재가속"',quoteEn:'"Azure revenue surpassed $100B for the first time · Copilot 30M+ paid users · Azure re-accelerated to 43% YoY"',
  source:'출처: Microsoft · Evan D · 2026.07.29',
  noteHead:'왜 중요한가: MSFT 클라우드+AI 축이 GOOGL FCF 음전환과 대비되는 강세',noteSub:'앞으로 볼 것: Azure 5분기 연속 재가속 여부·Copilot 매출·CAPEX 방향',footer:'MSFT · Azure $100B 첫 돌파',brand:BK},
 en:{title:'MSFT — Azure Tops $100B First Time · Copilot 30M+ Paid · Azure Re-Accelerates to 43%',heroIcon:'☁️',heroBig:'$100 B+',heroSub:'Microsoft Q4 print · Azure revenue tops $100B first time · Copilot 30M+ paid users · Azure growth re-accelerates to 43% YoY · Cloud revenue $155B (+76% YoY)',
  cards:[{icon:'☁️',big:'$100 B',mid:'Azure revenue first',sub:'quarterly all-time-first'},{icon:'🤖',big:'30 M+',mid:'Copilot paid users',sub:'M365 integration spreads'},{icon:'📈',big:'43 %',mid:'Azure YoY re-accel',sub:'AI workload drives'}],
  quoteLabel:'MICROSOFT · EVAN D',quoteKo:'"Azure $100B 첫 돌파 · Copilot 30M+"',quoteEn:'"Azure revenue surpassed $100B for the first time · Copilot 30M+ paid users · Azure re-accelerated to 43% YoY"',
  source:'Source: Microsoft · Evan D · 2026.07.29',
  noteHead:'Why: MSFT cloud+AI axis bullish contrast vs GOOGL FCF-negative',noteSub:'Watch: whether Azure keeps re-accelerating 5+ Q · Copilot revenue · CAPEX direction',footer:'MSFT · Azure $100B first',brand:BE}},

// 2. META Q2 · Rev record $60.8B · 비용 급증 · EPS -13% · CAPEX $105B+ 상향
{file:'meta-q2-rev-record-eps-miss',symbol:'META',
 ko:{title:'META Q2 — 매출 record $60.8B · 비용 급증 · EPS -13% · FY26 CAPEX $105B+ 상향',heroIcon:'📊',heroBig:'$60.8 B',heroSub:'META Q2 매출 record $60.8B(+18-20% YoY) · 비용 $42B(+59%)·순이익 -14% YoY $15.5B · Reality Labs 손실 -$4.62B · CAPEX $19.9B · FY26 CAPEX $105B+ 상향',
  cards:[{icon:'💵',big:'$60.8 B',mid:'매출 record',sub:'+18~20% YoY'},{icon:'💸',big:'-14 %',mid:'순이익 YoY',sub:'EPS $6.16 컨센 미스'},{icon:'🏗️',big:'$105 B+',mid:'FY26 CAPEX 상향',sub:'AI 인프라 지출 급증'}],
  quoteLabel:'CHARLIE BILELLO · AMIT',quoteKo:'"매출 record이지만 비용 +59% 급증·EPS 미스·CAPEX $105B로 상향"',quoteEn:'"Revenue record but costs +59% surge · EPS miss · FY26 CAPEX raised to $105B+"',
  source:'출처: Charlie Bilello · amit · 2026.07.29',
  noteHead:'왜 중요한가: 하이퍼스케일러 CAPEX 사이클의 마진 압박 재확인(GOOGL·GOOGL FCF 음전환과 정합)',noteSub:'앞으로 볼 것: Reality Labs 손실 · AI 매출 실체화·다음 분기 마진 방향',footer:'META Q2 · $105B+ CAPEX',brand:BK},
 en:{title:'META Q2 — Rev Record $60.8B · Costs Surge · EPS -13% · FY26 CAPEX Raised to $105B+',heroIcon:'📊',heroBig:'$60.8 B',heroSub:'META Q2 rev record $60.8B (+18-20% YoY) · costs $42B (+59%) · net income -14% YoY at $15.5B · Reality Labs loss -$4.62B · CAPEX $19.9B · FY26 CAPEX raised to $105B+',
  cards:[{icon:'💵',big:'$60.8 B',mid:'Revenue record',sub:'+18~20% YoY'},{icon:'💸',big:'-14 %',mid:'Net income YoY',sub:'EPS $6.16 miss'},{icon:'🏗️',big:'$105 B+',mid:'FY26 CAPEX raise',sub:'AI infra spend surge'}],
  quoteLabel:'CHARLIE BILELLO · AMIT',quoteKo:'"매출 record·비용 +59% 급증·EPS 미스"',quoteEn:'"Revenue record but costs +59% surge · EPS miss · FY26 CAPEX raised to $105B+"',
  source:'Source: Charlie Bilello · amit · 2026.07.29',
  noteHead:'Why: Reaffirms hyperscaler CAPEX-cycle margin pressure (aligns with GOOGL FCF-negative)',noteSub:'Watch: Reality Labs losses · AI revenue reality · next-quarter margin direction',footer:'META Q2 · $105B+ CAPEX',brand:BE}},

// 3. NVDA CDS 사상 최대 · 부채 위험 신호
{file:'nvda-cds-record-high',symbol:'NVDA',
 ko:{title:'NVDA — CDS 스프레드 사상 최대 상승 · 부채 위험 신호 부상',heroIcon:'⚠️',heroBig:'CDS ATH',heroSub:'Barchart: NVDA 부채 디폴트 대비 비용(CDS)이 사상 최대 폭으로 상승 · $750B 규모 AI 딜 확대 관련 신용 위험 재평가',
  cards:[{icon:'⚠️',big:'ATH',mid:'CDS 스프레드',sub:'사상 최대 상승 폭'},{icon:'💰',big:'$750 B',mid:'AI 딜 규모',sub:'신용 위험 재평가'},{icon:'📉',big:'디폴트 대비',mid:'부채 보험 비용 급증',sub:'채권 시장 신호'}],
  quoteLabel:'BARCHART · EVAN D',quoteKo:'"NVDA 디폴트 대비 비용이 사상 최대 폭으로 상승 · $750B AI 딜 관련"',quoteEn:'"Cost of protecting NVDA debt against default soared by largest amount in history · related to $750B AI push"',
  source:'출처: Barchart · Evan D · 2026.07.29',
  noteHead:'왜 중요한가: NVDA 밸류 프리미엄 vs 부채 위험의 divergence 신호',noteSub:'앞으로 볼 것: OpenAI $500B DC · Meta $105B CAPEX 등 파이낸싱 구조',footer:'NVDA CDS ATH',brand:BK},
 en:{title:'NVDA — CDS Spread Soars to Record High · Debt Risk Signal Emerges',heroIcon:'⚠️',heroBig:'CDS ATH',heroSub:'Barchart: NVDA CDS (cost to protect against default) soared by largest amount in history · related to $750B AI-push credit reassessment',
  cards:[{icon:'⚠️',big:'ATH',mid:'CDS spread',sub:'largest rise ever'},{icon:'💰',big:'$750 B',mid:'AI deal scale',sub:'credit reassessed'},{icon:'📉',big:'Default cover',mid:'Debt-insurance cost jumps',sub:'bond market signal'}],
  quoteLabel:'BARCHART · EVAN D',quoteKo:'"NVDA 부채 CDS 사상 최대"',quoteEn:'"Cost of protecting NVDA debt against default soared by largest amount in history · related to $750B AI push"',
  source:'Source: Barchart · Evan D · 2026.07.29',
  noteHead:'Why: Divergence signal between NVDA valuation premium and debt risk',noteSub:'Watch: financing structures of OpenAI $500B DC · Meta $105B CAPEX etc.',footer:'NVDA CDS ATH',brand:BE}},

// 4. SPCX 미 우주군 $1.6B · 18 Falcon 9 미션
{file:'spcx-space-force-16b-18-falcon9',symbol:'SPCX',
 ko:{title:'SPCX — 미 우주군 $1.6B 계약 · Falcon 9 18 미션 · 군용 타겟팅 위성',heroIcon:'🚀',heroBig:'$1.6 B',heroSub:'DogeDesigner: SpaceX가 미 우주군에서 $1.6B 계약 획득 · Falcon 9 18개 발사 미션 · 군용 타겟팅 위성 배치',
  cards:[{icon:'🚀',big:'$1.6 B',mid:'미 우주군 계약',sub:'단일 계약'},{icon:'📡',big:'18 미션',mid:'Falcon 9 발사',sub:'군용 타겟팅 위성'},{icon:'🛡️',big:'국방',mid:'국가 안보 페이로드',sub:'SPCX 정부 계약 확대'}],
  quoteLabel:'DOGEDESIGNER',quoteKo:'"SpaceX가 미 우주군 $1.6B 계약 획득 · Falcon 9 18 미션 · 군용 타겟팅 위성"',quoteEn:'"SpaceX awarded $1.6B contract by US Space Force for 18 Falcon 9 missions launching military targeting satellites"',
  source:'출처: DogeDesigner · 2026.07.29',
  noteHead:'왜 중요한가: SPCX -50% ATH 시세와 대비되는 실 정부 매출 계약',noteSub:'앞으로 볼 것: 발사 스케줄·NASA·NRO 후속 계약·Starship 상용',footer:'SPCX · US Space Force $1.6B',brand:BK},
 en:{title:'SPCX — US Space Force $1.6B Contract · 18 Falcon 9 Missions · Military Targeting Satellites',heroIcon:'🚀',heroBig:'$1.6 B',heroSub:'DogeDesigner: SpaceX awarded $1.6B contract by US Space Force · 18 Falcon 9 launch missions · military targeting satellite deployment',
  cards:[{icon:'🚀',big:'$1.6 B',mid:'US Space Force deal',sub:'single contract'},{icon:'📡',big:'18 missions',mid:'Falcon 9 launches',sub:'military targeting sats'},{icon:'🛡️',big:'Defense',mid:'National security payloads',sub:'SPCX gov expansion'}],
  quoteLabel:'DOGEDESIGNER',quoteKo:'"미 우주군 $1.6B · Falcon 9 18 미션"',quoteEn:'"SpaceX awarded $1.6B contract by US Space Force for 18 Falcon 9 missions launching military targeting satellites"',
  source:'Source: DogeDesigner · 2026.07.29',
  noteHead:'Why: Real government revenue contract contrasting with SPCX -50% ATH price action',noteSub:'Watch: launch schedule · NASA/NRO follow-on contracts · Starship commercial',footer:'SPCX · US Space Force $1.6B',brand:BE}},

// 5. 캐시 우드 SPCX·TSLA 지속 매수 · wall of worry 프레임
{file:'wood-spcx-tsla-wall-of-worry',symbol:'MACRO',
 ko:{title:'캐시 우드 — SPCX·TSLA 지속 매수 · "wall of worry 오르는 중"',heroIcon:'🧗',heroBig:'WALL OF WORRY',heroSub:'Herbert Ong 정리: 매도세 속에도 ARK가 SPCX·TSLA 수백만 달러 매수 지속 · 우드는 시장이 강세장 끝이 아닌 "wall of worry"를 오르는 중이라는 프레임',
  cards:[{icon:'💰',big:'수백만 $',mid:'ARK SPCX·TSLA 매수',sub:'지난 일주일 지속'},{icon:'🧗',big:'Wall of worry',mid:'우드 프레임',sub:'강세장 끝 아님'},{icon:'📉',big:'매도세 대응',mid:'contra-매수',sub:'개별 종목 dip-buying'}],
  quoteLabel:'HERBERT ONG · CATHIE WOOD',quoteKo:'"우드는 시장이 wall of worry를 오르는 중이라고 · 강세장 끝이 아니라"',quoteEn:'"Wood says the market may be climbing a \'wall of worry\' rather than signaling end of the bull market"',
  source:'출처: Herbert Ong · 2026.07.29',
  noteHead:'왜 중요한가: 어제 SPCX -50% ATH·매크로 경고 속 우드의 대표 강세 프레임',noteSub:'앞으로 볼 것: ARK 후속 매수 규모·기관 flow 동조 여부',footer:'Wood · Wall of Worry',brand:BK},
 en:{title:'Cathie Wood — Keeps Buying SPCX·TSLA · "Climbing a Wall of Worry"',heroIcon:'🧗',heroBig:'WALL OF WORRY',heroSub:'Per Herbert Ong: despite sell-off, ARK adds millions in SPCX and TSLA over past week · Wood frames market as climbing a "wall of worry" rather than end of bull market',
  cards:[{icon:'💰',big:'Millions $',mid:'ARK SPCX·TSLA buy',sub:'past week continues'},{icon:'🧗',big:'Wall of worry',mid:'Wood frame',sub:'not end of bull'},{icon:'📉',big:'Counter sell-off',mid:'Contra-buy',sub:'individual dip-buying'}],
  quoteLabel:'HERBERT ONG · CATHIE WOOD',quoteKo:'"시장이 wall of worry를 오르는 중"',quoteEn:'"Wood says the market may be climbing a \'wall of worry\' rather than signaling end of the bull market"',
  source:'Source: Herbert Ong · 2026.07.29',
  noteHead:'Why: Wood\'s canonical bull frame against yesterday\'s SPCX -50% ATH and macro warnings',noteSub:'Watch: ARK follow-through size · institutional flow alignment',footer:'Wood · Wall of Worry',brand:BE}},

// 6. 캐시 우드 화요일 TSLA $12.4M · 40,281주 · 이틀 연속
{file:'wood-tsla-124m-tuesday-2days',symbol:'TSLA',
 ko:{title:'캐시 우드 — 화요일 TSLA 40,281주 · $12.4M · 이틀 연속 매수',heroIcon:'💰',heroBig:'$12.4 M',heroSub:'Ming: ARK Invest가 화요일 세션에 TSLA 40,281주(약 $12.4M) 매수 · 월요일 $8.8M에 이어 이틀 연속 · 지난 주 -14% 낙폭 이후 총 매수 $70M+',
  cards:[{icon:'💰',big:'$12.4 M',mid:'화요일 매수 규모',sub:'40,281주'},{icon:'📅',big:'이틀 연속',mid:'월·화 dip-buying',sub:'$8.8M + $12.4M'},{icon:'📊',big:'~$70 M+',mid:'-14% 후 총 매수',sub:'우드 강세 유지'}],
  quoteLabel:'MING',quoteKo:'"우드가 이틀 연속 TSLA dip 매수 · 화요일 40,281주 $12.4M"',quoteEn:'"Wood buys TSLA dip for 2nd straight day · Tuesday 40,281 shares · $12.4M"',
  source:'출처: Ming · 2026.07.29',
  noteHead:'왜 중요한가: 우드가 강세 유지 · 지난 주 -14% 대응 매수의 연장',noteSub:'앞으로 볼 것: 수·목·금 지속 매수 여부·기관 flow 후속',footer:'TSLA · Wood 화요일 $12.4M',brand:BK},
 en:{title:'Cathie Wood — Bought 40,281 TSLA Shares Tuesday · $12.4M · 2 Straight Days',heroIcon:'💰',heroBig:'$12.4 M',heroSub:'Per Ming: ARK bought 40,281 TSLA shares Tuesday (~$12.4M) · after Monday $8.8M · 2 straight days · total $70M+ since last week -14% drop',
  cards:[{icon:'💰',big:'$12.4 M',mid:'Tuesday buy',sub:'40,281 shares'},{icon:'📅',big:'2 days',mid:'Mon+Tue dip-buying',sub:'$8.8M + $12.4M'},{icon:'📊',big:'~$70 M+',mid:'Since -14% drop',sub:'Wood bull continues'}],
  quoteLabel:'MING',quoteKo:'"우드 이틀 연속 TSLA dip · 화 40,281주 $12.4M"',quoteEn:'"Wood buys TSLA dip for 2nd straight day · Tuesday 40,281 shares · $12.4M"',
  source:'Source: Ming · 2026.07.29',
  noteHead:'Why: Wood sustains bull view · extension of -14% response buying last week',noteSub:'Watch: Wed/Thu/Fri continued buying · institutional flow follow-up',footer:'TSLA · Wood Tue $12.4M',brand:BE}},

// 7. Pierre Ferragu · SPCX 필수 프레임 (중국 경쟁·미국 정책)
{file:'ferragu-spcx-essential-china',symbol:'SPCX',
 ko:{title:'Pierre Ferragu — "미국이 우주에서 이기려면 SPCX가 필수 · 중국이 따라오는 중"',heroIcon:'🇺🇸',heroBig:'US NEEDS SPCX',heroSub:'Pierre Ferragu: 중국이 우주에서 공격적으로 따라오는 중 · 미국이 이기는 조건은 mass to orbit을 빠르게·저렴하게·대량으로 하는 것 · SPCX 없이는 불가',
  cards:[{icon:'🇺🇸',big:'US needs',mid:'SPCX 필수',sub:'미국 우주 리더십'},{icon:'🇨🇳',big:'중국 추격',mid:'우주 공격적 확대',sub:'경쟁 심화'},{icon:'📦',big:'Mass to orbit',mid:'빠르게·저렴하게·대량',sub:'승리 조건'}],
  quoteLabel:'PIERRE FERRAGU',quoteKo:'"미국이 이기려면 성공적인 SPCX가 필수 · 중국이 우주에서 따라오는 중"',quoteEn:'"The US needs a successful SpaceX to win · China catching up on space, mass to orbit at speed and scale"',
  source:'출처: Pierre Ferragu · 2026.07.29',
  noteHead:'왜 이 프레임: 어제 NASA Admin 강세 견해에 이어 정치·국가 안보 프레임 재확인',noteSub:'앞으로 볼 것: 중국 우주 프로그램 진전·미국 정책 변화',footer:'SPCX · Ferragu 국가 안보 프레임',brand:BK},
 en:{title:'Pierre Ferragu — "US Needs Successful SPCX to Win · China Catching Up in Space"',heroIcon:'🇺🇸',heroBig:'US NEEDS SPCX',heroSub:'Per Pierre Ferragu: China catching up aggressively in space · US wins only by bringing mass to orbit fast, cheap, and at volume · impossible without SPCX',
  cards:[{icon:'🇺🇸',big:'US needs',mid:'SPCX essential',sub:'US space leadership'},{icon:'🇨🇳',big:'CN catching up',mid:'Space aggressive expansion',sub:'competition intensifies'},{icon:'📦',big:'Mass to orbit',mid:'Fast · cheap · volume',sub:'winning conditions'}],
  quoteLabel:'PIERRE FERRAGU',quoteKo:'"미국이 이기려면 SPCX 필수"',quoteEn:'"The US needs a successful SpaceX to win · China catching up on space, mass to orbit at speed and scale"',
  source:'Source: Pierre Ferragu · 2026.07.29',
  noteHead:'Why the frame: Reaffirms political/national-security frame after yesterday\'s NASA Admin bull view',noteSub:'Watch: China space program progress · US policy shifts',footer:'SPCX · Ferragu national security frame',brand:BE}},

// 8. UBER 정치인 매수 · Pelosi $1M · Trump $5M · 로비 $1.25M
{file:'uber-politicians-pelosi-trump',symbol:'UBER',
 ko:{title:'UBER — 정치인 8명 매수 · Pelosi 최대 $1M · Trump 최대 $5M · Q2 로비 $1.25M',heroIcon:'🏛️',heroBig:'8 POLS',heroSub:'Nancy Pelosi Stock Tracker: 8명 미 의회 의원이 올해 UBER 매수 · Pelosi 5월 20일 콜옵션 최대 $1M · Trump 같은 날 최대 $5M · Uber Q2 로비 $1.25M',
  cards:[{icon:'🏛️',big:'8 명',mid:'매수 미 의원',sub:'초당적 매수'},{icon:'💵',big:'~$5 M',mid:'Trump 최대 매수',sub:'5월 20일'},{icon:'📢',big:'$1.25 M',mid:'Uber Q2 로비 지출',sub:'같은 분기'}],
  quoteLabel:'NANCY PELOSI STOCK TRACKER',quoteKo:'"8명 의원 UBER 매수 · Pelosi 콜옵션 $1M · Trump $5M · 로비 $1.25M"',quoteEn:'"8 politicians bought UBER · Pelosi $1M call options · Trump $5M · Uber Q2 lobbying $1.25M"',
  source:'출처: Nancy Pelosi Stock Tracker · 2026.07.29',
  noteHead:'왜 중요한가: 정치인 매수·로비 지출 동시 발생 · STOCK Act 논쟁 재점화',noteSub:'앞으로 볼 것: UBER 실적·Waymo 파트너십 재편·규제 변화',footer:'UBER · 정치인 8명 매수',brand:BK},
 en:{title:'UBER — 8 Politicians Bought · Pelosi Up to $1M · Trump Up to $5M · Q2 Lobbying $1.25M',heroIcon:'🏛️',heroBig:'8 POLS',heroSub:'Per Nancy Pelosi Stock Tracker: 8 US Congress members bought UBER this year · Pelosi up to $1M call options May 20 · Trump up to $5M same day · Uber Q2 lobbying $1.25M',
  cards:[{icon:'🏛️',big:'8',mid:'US Congress buyers',sub:'bipartisan'},{icon:'💵',big:'~$5 M',mid:'Trump upper bound',sub:'May 20'},{icon:'📢',big:'$1.25 M',mid:'Uber Q2 lobbying',sub:'same quarter'}],
  quoteLabel:'NANCY PELOSI STOCK TRACKER',quoteKo:'"8명 정치인 UBER 매수 · Trump $5M · 로비 $1.25M"',quoteEn:'"8 politicians bought UBER · Pelosi $1M call options · Trump $5M · Uber Q2 lobbying $1.25M"',
  source:'Source: Nancy Pelosi Stock Tracker · 2026.07.29',
  noteHead:'Why: Politician buying + lobbying spend concurrent · STOCK Act debate re-ignites',noteSub:'Watch: UBER earnings · Waymo partnership reshuffle · regulatory change',footer:'UBER · 8 politicians',brand:BE}},

// 9. TSLA 호주 Novon 12번째 Megapack · 2GW+ · Goyder 2배
{file:'tsla-au-novon-12th-megapack-2gw',symbol:'TSLA',
 ko:{title:'TSLA — 호주 Novon 12번째 Megapack 협업 · 총 2GW+ · Goyder 프로젝트 2배 확장',heroIcon:'🔋',heroBig:'2 GW+',heroSub:'Sawyer Merritt: 호주 Novon이 Tesla와 12번째 Megapack 배터리 프로젝트 · 총 결합 캐파 2GW 초과 · Goyder 배터리 프로젝트 사이즈 두 배 확장 · 총 454MW/1,814MWh',
  cards:[{icon:'🔋',big:'12 번째',mid:'Novon-Tesla 협업',sub:'호주 배터리 시장'},{icon:'📊',big:'2 GW+',mid:'총 결합 캐파',sub:'누적 배포'},{icon:'🏗️',big:'454 MW',mid:'Goyder 2배 확장',sub:'1,814 MWh 총 프로젝트'}],
  quoteLabel:'SAWYER MERRITT · NOVON',quoteKo:'"Novon이 Tesla와 12번째 Megapack · 총 2GW+ · Goyder 두 배로 확장"',quoteEn:'"Novon-Tesla 12th Megapack battery · combined 2GW+ · Goyder project doubled to 454MW/1,814MWh"',
  source:'출처: Sawyer Merritt · Novon · 2026.07.29',
  noteHead:'왜 중요한가: Tesla 에너지 부문 지속 성장 · 호주·글로벌 배터리 시장 리더십',noteSub:'앞으로 볼 것: 다른 호주 프로젝트·글로벌 Megapack 배포 확대',footer:'TSLA · Novon 12번째 · 2GW+',brand:BK},
 en:{title:'TSLA — Australia Novon 12th Megapack Deal · Combined 2GW+ · Goyder Project Doubled',heroIcon:'🔋',heroBig:'2 GW+',heroSub:'Per Sawyer Merritt: Australia Novon partners with Tesla on 12th Megapack battery project · combined capacity over 2GW · Goyder battery project doubled to 454MW/1,814MWh',
  cards:[{icon:'🔋',big:'12th',mid:'Novon-Tesla partnership',sub:'AU battery market'},{icon:'📊',big:'2 GW+',mid:'Combined capacity',sub:'cumulative deployment'},{icon:'🏗️',big:'454 MW',mid:'Goyder doubled',sub:'1,814 MWh total project'}],
  quoteLabel:'SAWYER MERRITT · NOVON',quoteKo:'"Novon-Tesla 12번째 Megapack · 2GW+"',quoteEn:'"Novon-Tesla 12th Megapack battery · combined 2GW+ · Goyder project doubled to 454MW/1,814MWh"',
  source:'Source: Sawyer Merritt · Novon · 2026.07.29',
  noteHead:'Why: Tesla energy segment continued growth · AU/global battery market leadership',noteSub:'Watch: other AU projects · global Megapack deployment expansion',footer:'TSLA · Novon 12th · 2GW+',brand:BE}},

// 10. 매크로 - 하이퍼스케일러 클라우드 백로그 ~$2T · 2028+ outperform
{file:'macro-hyperscaler-backlog-2t',symbol:'MACRO',
 ko:{title:'매크로 — 하이퍼스케일러 클라우드 백로그 ~$2T · 12-24개월 50% 전환 · 2028+ outperform',heroIcon:'📊',heroBig:'~$2 T',heroSub:'Ozgur Erken: 하이퍼스케일러 결합 백로그 ~$2T · 향후 12-24개월에 절반 전환 · 이후 마진 확대와 볼륨 성장으로 2028+ 지속 outperform 예상',
  cards:[{icon:'📊',big:'~$2 T',mid:'하이퍼스케일러 백로그',sub:'결합 전체'},{icon:'⏱️',big:'~50 %',mid:'12-24개월 전환',sub:'매출 실현'},{icon:'📈',big:'2028+',mid:'지속 outperform',sub:'마진 확대·볼륨 성장'}],
  quoteLabel:'OZGUR ERKEN',quoteKo:'"백로그 ~$2T · 12-24개월 50% 전환 · 계약 갱신은 훨씬 높은 가격에"',quoteEn:'"Backlog ~$2T · ~50% converts over 12-24 months · renewals at materially higher prices"',
  source:'출처: Ozgur Erken · 2026.07.29',
  noteHead:'왜 중요한가: GOOGL 백로그 $500B+·MSFT Azure $100B 등 실 백로그 데이터 종합',noteSub:'앞으로 볼 것: 백로그 매출 전환 속도·AWS·Azure 성장률·CAPEX vs 백로그',footer:'MACRO · 하이퍼스케일러 백로그 $2T',brand:BK},
 en:{title:'MACRO — Hyperscaler Cloud Backlog ~$2T · ~50% Converts in 12-24 Mo · 2028+ Outperform',heroIcon:'📊',heroBig:'~$2 T',heroSub:'Per Ozgur Erken: hyperscaler combined backlog ~$2T · ~50% converts over next 12-24 months · continued outperform post-2028 via margin expansion + volume growth',
  cards:[{icon:'📊',big:'~$2 T',mid:'Hyperscaler backlog',sub:'combined total'},{icon:'⏱️',big:'~50 %',mid:'Converts 12-24 mo',sub:'revenue realization'},{icon:'📈',big:'2028+',mid:'Sustained outperform',sub:'margin+volume'}],
  quoteLabel:'OZGUR ERKEN',quoteKo:'"백로그 ~$2T · 50% 12-24개월 전환"',quoteEn:'"Backlog ~$2T · ~50% converts over 12-24 months · renewals at materially higher prices"',
  source:'Source: Ozgur Erken · 2026.07.29',
  noteHead:'Why: Synthesizes real backlog data (GOOGL $500B+, MSFT Azure $100B etc.)',noteSub:'Watch: backlog-to-revenue conversion pace · AWS/Azure growth · CAPEX vs backlog',footer:'MACRO · Hyperscaler backlog $2T',brand:BE}},

// 11. 매크로 - 한국 KOSPI -8.17% · 마진 정리 · <35세 62% 피해
{file:'macro-korea-kospi-8pct-plunge',symbol:'MACRO',
 ko:{title:'매크로 — 한국 KOSPI -8.17% 급락 · CB 발동 · 마진콜 정리 · <35세 62% 피해',heroIcon:'🇰🇷',heroBig:'-8.17 %',heroSub:'한국 KOSPI가 -492.10(-8.17%)로 5,531.56 마감 · CB 발동 이후 재개된 후에도 하락 · 360K 마진 계좌 강제 청산 · 청산 대상 62%가 35세 미만',
  cards:[{icon:'📉',big:'-8.17 %',mid:'KOSPI 하루 하락',sub:'-492.10 · 5,531.56'},{icon:'⚠️',big:'360K',mid:'마진 계좌 청산',sub:'강제 정리'},{icon:'👥',big:'62 %',mid:'<35세 피해 비중',sub:'젊은 층 집중'}],
  quoteLabel:'NANCY PELOSI STOCK TRACKER',quoteKo:'"KOSPI -8.17% · 360K 마진 계좌 청산 · 청산 대상 62%가 35세 미만"',quoteEn:'"KOSPI -8.17% · 360K margin accounts liquidated · 62% of those wiped were under 35"',
  source:'출처: Nancy Pelosi Stock Tracker · 2026.07.29',
  noteHead:'왜 중요한가: 아시아 대형 시장 급락 · 글로벌 리스크 심리 전이 가능',noteSub:'앞으로 볼 것: 한국 규제 대응·미국·일본 시장 반응·연쇄 매도',footer:'MACRO · KOSPI -8.17%',brand:BK},
 en:{title:'MACRO — Korea KOSPI Plunges -8.17% · Circuit Breaker · Margin Liquidation · 62% Under 35',heroIcon:'🇰🇷',heroBig:'-8.17 %',heroSub:'Korea KOSPI closes at 5,531.56 down -492.10 (-8.17%) · dropped again after circuit-breaker reopen · 360K margin accounts force-liquidated · 62% of those wiped were under 35',
  cards:[{icon:'📉',big:'-8.17 %',mid:'KOSPI 1-day drop',sub:'-492.10 · 5,531.56'},{icon:'⚠️',big:'360K',mid:'Margin accts liquidated',sub:'forced closure'},{icon:'👥',big:'62 %',mid:'Under 35 damaged share',sub:'young-cohort concentration'}],
  quoteLabel:'NANCY PELOSI STOCK TRACKER',quoteKo:'"KOSPI -8.17% · 360K 마진 청산 · 62% 청산자가 35세 미만"',quoteEn:'"KOSPI -8.17% · 360K margin accounts liquidated · 62% of those wiped were under 35"',
  source:'Source: Nancy Pelosi Stock Tracker · 2026.07.29',
  noteHead:'Why: Large Asian market plunge · potential global-risk-sentiment contagion',noteSub:'Watch: Korea regulator response · US/Japan market reaction · chain selling',footer:'MACRO · KOSPI -8.17%',brand:BE}},

// 12. 매크로 - Mag 7 2026 YTD · AAPL +23.1% · MSFT -8.2% · META -12.6%
{file:'macro-mag7-ytd-aapl-1st',symbol:'MACRO',
 ko:{title:'매크로 — Mag 7 2026 YTD · AAPL +23.1% 1위 · MSFT -8.2% · META -12.6% 마이너스',heroIcon:'🏆',heroBig:'AAPL +23%',heroSub:'Evan D: 2026 YTD 매그니피센트 7 성과 · AAPL +23.1% 1위 · GOOG +9% · AMZN -4% · MSFT -8.2% · META -12.6% · defensive vs 하이퍼스케일러 divergence',
  cards:[{icon:'🏆',big:'+23.1 %',mid:'AAPL 1위',sub:'세계 최대 도달 배경'},{icon:'📉',big:'-12.6 %',mid:'META 최하위',sub:'FY26 CAPEX 부담'},{icon:'📊',big:'divergence',mid:'defensive vs 하이퍼',sub:'현금 흐름 재편'}],
  quoteLabel:'EVAN D',quoteKo:'"Apple be having a moment · Mag 7 YTD 성과 divergence 극단"',quoteEn:'"Apple be having a moment · Mag 7 YTD performance divergence extreme"',
  source:'출처: Evan D · 2026.07.29',
  noteHead:'왜 중요한가: 하이퍼스케일러 CAPEX 부담이 주가에 반영 · AAPL의 현금 창출력 리더십 재확인',noteSub:'앞으로 볼 것: 남은 5개월 반등 여부·NVDA 성과 별도',footer:'MACRO · Mag 7 YTD',brand:BK},
 en:{title:'MACRO — Mag 7 2026 YTD · AAPL +23.1% #1 · MSFT -8.2% · META -12.6% Negative',heroIcon:'🏆',heroBig:'AAPL +23%',heroSub:'Per Evan D: 2026 YTD Magnificent 7 · AAPL +23.1% #1 · GOOG +9% · AMZN -4% · MSFT -8.2% · META -12.6% · defensive vs hyperscaler divergence',
  cards:[{icon:'🏆',big:'+23.1 %',mid:'AAPL #1',sub:'behind world-largest reach'},{icon:'📉',big:'-12.6 %',mid:'META bottom',sub:'FY26 CAPEX burden'},{icon:'📊',big:'Divergence',mid:'Defensive vs hyper',sub:'cash-flow reshape'}],
  quoteLabel:'EVAN D',quoteKo:'"Apple be having a moment · Mag 7 YTD divergence 극단"',quoteEn:'"Apple be having a moment · Mag 7 YTD performance divergence extreme"',
  source:'Source: Evan D · 2026.07.29',
  noteHead:'Why: Hyperscaler CAPEX burden reflected in prices · reaffirms AAPL cash-generation leadership',noteSub:'Watch: rebound in remaining 5 months · NVDA performance separate',footer:'MACRO · Mag 7 YTD',brand:BE}},

// 13. 매크로 - Mag 7 사상 최저 밸류 (S&P 500 대비)
{file:'macro-mag7-cheapest-vs-spx',symbol:'MACRO',
 ko:{title:'매크로 — Mag 7이 S&P 500 대비 사상 최저 밸류에이션 근접',heroIcon:'📉',heroBig:'CHEAP',heroSub:'Whole Mars Catalog: Magnificent 7이 이제 S&P 500 대비 사상 최저 밸류에이션에 근접 · 상대 밸류 관점의 매력 부각 · 어제 반도체 밸류 닷컴 초과 경고와 대비',
  cards:[{icon:'📉',big:'사상 최저',mid:'Mag 7 상대 밸류',sub:'S&P 500 대비'},{icon:'🔄',big:'재편',mid:'defensive 회귀',sub:'AAPL·KO 부각'},{icon:'📊',big:'divergence',mid:'개별 P/E vs 지수',sub:'매크로 대비'}],
  quoteLabel:'WHOLE MARS CATALOG',quoteKo:'"Magnificent 7이 이제 S&P 500 대비 사상 최저 밸류에이션에 근접"',quoteEn:'"Magnificent 7 now nearing their cheapest valuation in history relative to the S&P 500"',
  source:'출처: Whole Mars Catalog · 2026.07.29',
  noteHead:'왜 이 프레임: MSFT·META 조정과 함께 Mag 7 개별 밸류 하락 · S&P는 상대적 유지',noteSub:'앞으로 볼 것: 상대 밸류 반등 여부·개별 종목 매수 매력',footer:'MACRO · Mag 7 cheap vs SPX',brand:BK},
 en:{title:'MACRO — Mag 7 Now Near Cheapest Valuation Ever Relative to S&P 500',heroIcon:'📉',heroBig:'CHEAP',heroSub:'Per Whole Mars Catalog: Magnificent 7 nearing their cheapest valuation in history relative to S&P 500 · relative-value appeal emerges · contrast with yesterday\'s semi valuation dot-com warning',
  cards:[{icon:'📉',big:'Historic low',mid:'Mag 7 relative val',sub:'vs S&P 500'},{icon:'🔄',big:'Reshape',mid:'Defensive rotation',sub:'AAPL/KO stand out'},{icon:'📊',big:'Divergence',mid:'Individual P/E vs index',sub:'macro vs micro'}],
  quoteLabel:'WHOLE MARS CATALOG',quoteKo:'"Mag 7 S&P 500 대비 사상 최저 밸류"',quoteEn:'"Magnificent 7 now nearing their cheapest valuation in history relative to the S&P 500"',
  source:'Source: Whole Mars Catalog · 2026.07.29',
  noteHead:'Why the frame: MSFT/META correction + Mag 7 individual valuations drop · S&P relatively steady',noteSub:'Watch: relative-value rebound · individual name buy attractiveness',footer:'MACRO · Mag 7 cheap vs SPX',brand:BE}},

// 14. V 7% 인력 감축 · 2,000명 · 기술·제품
{file:'v-7pct-layoffs-2000',symbol:'V',
 ko:{title:'V — Visa 7% 인력 감축 확정 · 약 2,000명 · 기술·제품 팀 중심',heroIcon:'✂️',heroBig:'7 %',heroSub:'Blossom: Visa가 인력의 약 7%(~2,000명) 감축 확정 · 주로 기술·제품 팀 · 소비재·핀테크 대형주 조정 시그널',
  cards:[{icon:'✂️',big:'7 %',mid:'인력 감축 비율',sub:'약 2,000명'},{icon:'💻',big:'기술·제품',mid:'주요 감축 대상',sub:'AI 자동화 여파'},{icon:'💳',big:'Visa',mid:'대형 핀테크',sub:'defensive 재구성'}],
  quoteLabel:'BLOSSOM',quoteKo:'"Visa가 7% 인력 감축 확정 · 약 2,000명 · 주로 기술·제품 팀"',quoteEn:'"Visa cutting 7% of workforce · ~2,000 jobs · primarily in technology and product teams"',
  source:'출처: Blossom · 2026.07.29',
  noteHead:'왜 중요한가: 대형 핀테크의 AI 자동화 대응·비용 구조조정 트렌드',noteSub:'앞으로 볼 것: 다른 핀테크(Mastercard·PayPal) 유사 조정·매출 방향',footer:'V · 7% 인력 감축',brand:BK},
 en:{title:'V — Visa Confirms 7% Layoffs · ~2,000 Jobs · Technology and Product Teams',heroIcon:'✂️',heroBig:'7 %',heroSub:'Per Blossom: Visa confirms cutting ~7% of workforce (~2,000) · primarily in technology and product teams · consumer/fintech large-cap reshuffle signal',
  cards:[{icon:'✂️',big:'7 %',mid:'Layoff ratio',sub:'~2,000 jobs'},{icon:'💻',big:'Tech · Product',mid:'Main cut targets',sub:'AI automation impact'},{icon:'💳',big:'Visa',mid:'Large fintech',sub:'defensive restructure'}],
  quoteLabel:'BLOSSOM',quoteKo:'"Visa 7% 인력 감축 · 2,000명 · 기술·제품"',quoteEn:'"Visa cutting 7% of workforce · ~2,000 jobs · primarily in technology and product teams"',
  source:'Source: Blossom · 2026.07.29',
  noteHead:'Why: Large-fintech AI automation response · cost restructuring trend',noteSub:'Watch: similar cuts at other fintechs (Mastercard, PayPal) · revenue direction',footer:'V · 7% layoffs',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260730.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260730-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN) · 폰트 고정 · 폭 초과 시만 wrap`);
