// 2026-08-11 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.11';

const PSYM = {
  TSLA: { fg:'#4ade80', fg2:'#22c55e', bg2:'#061209', card:'#0a1a0a' },
  NVDA: { fg:'#60a5fa', fg2:'#3b82f6', bg2:'#06121f', card:'#0a1420' },
  SPCX: { fg:'#c084fc', fg2:'#a78bfa', bg2:'#140b1f', card:'#1a0f2a' },
  GOOGL:{ fg:'#4285f4', fg2:'#34a853', bg2:'#06121f', card:'#0a1420' },
  MSFT: { fg:'#00a4ef', fg2:'#0078d4', bg2:'#061219', card:'#0a1520' },
  INTC: { fg:'#0071c5', fg2:'#00558a', bg2:'#06121f', card:'#0a1420' },
  AMD:  { fg:'#ed1c24', fg2:'#c00000', bg2:'#1a0606', card:'#200a0a' },
  PLTR: { fg:'#00b4d8', fg2:'#0077b6', bg2:'#050f14', card:'#0a1520' },
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
  JPY:  { fg:"#dc2626", fg2:"#991b1b", bg2:"#1a0505", card:"#200a0a" },
  ORCL: { fg:"#f80000", fg2:"#c00000", bg2:"#0f0505", card:"#1a0808" },
  MACRO:{ fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
  SPX:  { fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
};

function esc(s){return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g,'&amp;').replace(/</g,'&lt;');}
function E(o){const r={};for(const k in o)r[k]=typeof o[k]==='string'?esc(o[k]):o[k];return r;}

// === 새 wrap 로직 (2026-07-30~) ===
// 폰트 고정 · 폭 초과 시에만 문맥 기반 wrap
function estimatePxWidth(text, fontSize, isBold){
  // Arial Black(bold) 계수 상향 · 소문자·괄호 등도 상향 조정으로 실 렌더링 근사
  const b = isBold ? 1.15 : 1.0;
  let w=0;
  for(const c of String(text)){
    if(/[가-힣一-龥]/.test(c)) w += fontSize * b;
    else if(/\s/.test(c)) w += fontSize * 0.32;
    else if(/[·—:]/.test(c)) w += fontSize * 0.42;
    else if(/[A-Z0-9]/.test(c)) w += fontSize * 0.68 * b;
    else if(/[iljI!.,;'"`]/.test(c)) w += fontSize * 0.32 * b;
    else if(/[mwMW]/.test(c)) w += fontSize * 0.85 * b;
    else w += fontSize * 0.58 * b;
  }
  return w;
}

// 폭 초과 시에만 wrap · (1) 절 구분자(·—) → (2) 공백 → (3) 문자 강제 분할
function multilineIfOverflow(text, x, y, fontSize, maxPxWidth, maxLines, lh, attrs){
  const isBold = /font-weight="?(bold|[89]00)/i.test(attrs) || /Arial Black/.test(attrs);
  const est = (t) => estimatePxWidth(t, fontSize, isBold);
  const px = est(text);
  if(px <= maxPxWidth){
    return `  <text x="${x}" y="${y}" ${attrs}>${esc(text)}</text>`;
  }
  // 1단계: 절 구분자로 분리
  const rawParts = String(text).split(/(\s·\s|\s—\s|·|—)/).filter(p=>p!==undefined&&p!=='');
  // 2단계: 각 절이 폭 초과 시 공백으로 재분할 (그래도 초과하면 문자 단위)
  const parts = [];
  for(const p of rawParts){
    if(est(p, fontSize) <= maxPxWidth){ parts.push(p); continue; }
    const subs = p.split(/(\s+)/).filter(s=>s!=='');
    for(const s of subs){
      if(est(s, fontSize) <= maxPxWidth){ parts.push(s); continue; }
      // 초긴 단일 토큰 → 문자 단위 강제 분할
      let tmp = s;
      while(est(tmp, fontSize) > maxPxWidth){
        let cutAt = 1;
        while(cutAt < tmp.length && est(tmp.slice(0, cutAt+1), fontSize) <= maxPxWidth) cutAt++;
        parts.push(tmp.slice(0, cutAt));
        tmp = tmp.slice(cutAt);
      }
      if(tmp) parts.push(tmp);
    }
  }
  // 3단계: 라인 조립
  const lines=[]; let cur='';
  for(const p of parts){
    const test = cur + p;
    if(est(test, fontSize) <= maxPxWidth) cur = test;
    else{
      if(cur.trim()) lines.push(cur.trim());
      cur = p.replace(/^[·—\s]+/,'').trim();
      if(lines.length >= maxLines) break;
    }
  }
  if(cur.trim() && lines.length < maxLines){
    if(est(cur, fontSize) > maxPxWidth){
      // 마지막 줄이 여전히 초과하면 잘라내고 …
      let cutAt = 1;
      while(cutAt < cur.length && est(cur.slice(0, cutAt+1) + '…', fontSize) <= maxPxWidth) cutAt++;
      cur = cur.slice(0, cutAt) + '…';
    }
    lines.push(cur);
  }
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
${multilineIfOverflow(oRaw.heroSub, 540, 340, F.HERO_SUB, MAX_W.WIDE, 3, 26, `font-family="Arial" font-size="${F.HERO_SUB}" fill="#9ca3af" text-anchor="middle"`)}
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
// 1. Lufthansa Starlink
{file:'lufthansa-starlink-a320-first-service',symbol:'SPCX',
 ko:{title:'SpaceX — 루프트한자 항공기에 스타링크 첫 설치, 8월 18일부터 승객이 이용합니다',heroIcon:'✈️',heroBig:'8월 18일',heroSub:'DogeDesigner가 공개한 사진에 따르면 독일 루프트한자 항공사가 자사 여객기에 스타링크 위성 인터넷을 처음으로 설치했습니다. 8월 18일부터 A320neo 기종 승객이 비행 중 인터넷을 쓸 수 있게 됩니다.',
  cards:[{icon:'✈️',big:'루프트한자',mid:'유럽 최대 항공사 하나',sub:'스타링크 첫 도입'},{icon:'📅',big:'8월 18일',mid:'상용 서비스 시작일',sub:'승객이 실제 사용'},{icon:'🛫',big:'A320neo',mid:'첫 설치 기종',sub:'유럽·중단거리 노선'}],
  quoteLabel:'루프트한자·SpaceX',quoteKo:'루프트한자가 자사 여객기에 스타링크 위성 인터넷을 처음 설치했으며, 8월 18일부터 승객이 이용합니다.',quoteEn:'Lufthansa Airlines released new pictures of Starlink being installed on its aircraft · A320neo first service on August 18',
  source:'출처: DogeDesigner · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'항공사 스타링크 도입이 프리미엄 유럽 항공사까지 확대되고 있습니다. 이전에 IAG(영국항공·이베리아 등)가 계약한 것에 이어, 루프트한자가 실제 설치 사진까지 공개한 것은 시장이 스타링크를 표준 인프라로 받아들이고 있다는 신호입니다.',footer:'루프트한자 스타링크 · 8월 18일',brand:BK},
 en:{title:'SPCX — Lufthansa First Aircraft With Starlink · Service Starts August 18',heroIcon:'✈️',heroBig:'Aug 18',heroSub:'Per DogeDesigner: Lufthansa Airlines released new pictures of Starlink being installed on its aircraft. From August 18, passengers on A320neo aircraft will have internet access during flights.',
  cards:[{icon:'✈️',big:'Lufthansa',mid:'One of largest European carriers',sub:'First Starlink adoption'},{icon:'📅',big:'Aug 18',mid:'Commercial service start',sub:'Passengers actual use'},{icon:'🛫',big:'A320neo',mid:'First installed aircraft',sub:'European/short-haul routes'}],
  quoteLabel:'LUFTHANSA · SPACEX',quoteKo:'루프트한자 8월 18일 스타링크 서비스 시작',quoteEn:'Lufthansa Airlines released new pictures of Starlink being installed on its aircraft · A320neo first service on August 18',
  source:'Source: DogeDesigner · 2026.08.10',
  noteHead:'Why this matters',noteSub:'Airline Starlink adoption expands to premium European airlines. After IAG (BA/Iberia etc.) contracts, Lufthansa releasing actual installation photos signals market accepting Starlink as standard infrastructure.',footer:'Lufthansa Starlink · Aug 18',brand:BE}},

// 2. Musk Starlink 통합
{file:'musk-starlink-anywhere-integrated',symbol:'SPCX',
 ko:{title:'Musk — "스타링크가 집·사무실·카페 어디서든 하나의 계정으로 연결됩니다"',heroIcon:'🌐',heroBig:'어디든',heroSub:'Musk가 밝힌 스타링크의 미래 모습입니다. 지금 통신사(AT&T·버라이즌 등)처럼 스타링크 계정 하나로 집·사무실·카페 어디서든 그대로 이어서 쓰게 됩니다. 기존 통신사도 주파수를 가지고 있어 함께 살아남을 거라고 덧붙였습니다.',
  cards:[{icon:'🏠',big:'집',mid:'가정용 스타링크',sub:'기존 서비스'},{icon:'🏢',big:'사무실·카페',mid:'외부에서도 같은 계정',sub:'끊김 없이 이동'},{icon:'📶',big:'통신사 공존',mid:'기존 통신사도 유지',sub:'주파수 소유'}],
  quoteLabel:'ELON MUSK',quoteKo:'"기존 통신사(AT&T·버라이즌 등)처럼 스타링크 계정 하나로 집·사무실·카페 어디서든 그대로 쓸 수 있게 됩니다."',quoteEn:'You should be able to have a Starlink account like you have AT&T or Verizon · works at home, office, coffee shop · we are not going to put other carriers out of business',
  source:'출처: DogeDesigner · Elon Musk · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'스타링크가 단순한 위성 인터넷을 넘어 통신사와 같은 통합 서비스가 되려고 합니다. 며칠 전 T-모바일 CEO가 "위협이 과장됐다"고 폄하했지만, Musk의 발언은 정확히 그 반대 방향을 가리키고 있습니다.',footer:'스타링크 · 집·사무실·카페 통합',brand:BK},
 en:{title:'Musk — "Starlink Account Works at Home, Office, Coffee Shop · One Account Everywhere"',heroIcon:'🌐',heroBig:'ANYWHERE',heroSub:'Musk describes Starlink future: like existing carriers (AT&T/Verizon), one Starlink account will work at home, office, and coffee shop seamlessly. Existing carriers will still exist as they own spectrum.',
  cards:[{icon:'🏠',big:'Home',mid:'Residential Starlink',sub:'Existing service'},{icon:'🏢',big:'Office·Cafe',mid:'Same account outside',sub:'Seamless mobility'},{icon:'📶',big:'Carrier coexistence',mid:'Existing carriers survive',sub:'Own spectrum'}],
  quoteLabel:'ELON MUSK',quoteKo:'"스타링크 하나로 어디서든 사용"',quoteEn:'You should be able to have a Starlink account like you have AT&T or Verizon · works at home, office, coffee shop · we are not going to put other carriers out of business',
  source:'Source: DogeDesigner · Elon Musk · 2026.08.10',
  noteHead:'Why this matters',noteSub:'Starlink evolving beyond satellite internet into integrated telecom service. T-Mobile CEO dismissed threat as "exaggerated" days ago; Musks statement points exactly opposite direction.',footer:'Starlink · Home·Office·Cafe unified',brand:BE}},

// 3. NVDA + 6대 금융사 $500B AI
{file:'nvda-500b-consortium-apollo-blackstone',symbol:'NVDA',
 ko:{title:'NVIDIA — 아폴로·블랙스톤·블랙록·브룩필드·골드만·KKR 6개 대형 금융사와 5,000억 달러 AI 인프라 자금 조성',heroIcon:'🏛️',heroBig:'5,000억 달러',heroSub:'세계 최대 금융 그룹들이 엔비디아와 손잡고 AI 인프라 구축에 필요한 5,000억 달러 규모의 자금을 조성한다고 파이낸셜타임스가 보도했습니다. 아폴로·블랙스톤·블랙록의 GIP 사업부·브룩필드·골드만삭스·KKR이 참여합니다.',
  cards:[{icon:'💰',big:'5,000억 달러',mid:'AI 인프라 자금 규모',sub:'FT 보도'},{icon:'🏛️',big:'6개 금융사',mid:'세계 최대 사모펀드·투자은행',sub:'컨소시엄 형태'},{icon:'⚙️',big:'AI 인프라',mid:'데이터센터·GPU·전력',sub:'엔비디아 고객 지원'}],
  quoteLabel:'파이낸셜타임스 · Evan D',quoteKo:'"엔비디아와 6개 세계 최대 금융 그룹이 AI 인프라 구축을 위한 5,000억 달러 자금 조성 파트너십을 맺었습니다."',quoteEn:'World\'s largest financial groups working with Nvidia to assemble $500B funding package for AI infrastructure development · Apollo·Blackstone·BlackRock GIP·Brookfield·Goldman Sachs·KKR',
  source:'출처: Evan D · Financial Times · CNBC · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'엔비디아 GPU를 사고 싶어도 데이터센터 짓고 전력 확보하는 자금이 없는 하이퍼스케일러 고객들을 위한 자금 지원입니다. 오라클 같은 고객의 신용 리스크(며칠 전 CDS 사상 최고) 우려를 완화하는 조치입니다.',footer:'NVDA · 5,000억 달러 컨소시엄',brand:BK},
 en:{title:'NVIDIA — Apollo·Blackstone·BlackRock·Brookfield·Goldman·KKR 6-Firm $500B AI Infrastructure Funding',heroIcon:'🏛️',heroBig:'$500 B',heroSub:'World\'s largest financial groups joining Nvidia for $500B AI infrastructure funding, per Financial Times. Consortium includes Apollo, Blackstone, BlackRock\'s GIP division, Brookfield, Goldman Sachs, KKR.',
  cards:[{icon:'💰',big:'$500 B',mid:'AI infra funding',sub:'per FT'},{icon:'🏛️',big:'6 finance firms',mid:'Largest PE·IB',sub:'Consortium'},{icon:'⚙️',big:'AI infra',mid:'DC·GPU·power',sub:'NVDA customer support'}],
  quoteLabel:'FINANCIAL TIMES · EVAN D',quoteKo:'"NVIDIA + 6개 대형 금융사 $500B AI 자금"',quoteEn:'World\'s largest financial groups working with Nvidia to assemble $500B funding package for AI infrastructure development · Apollo·Blackstone·BlackRock GIP·Brookfield·Goldman Sachs·KKR',
  source:'Source: Evan D · Financial Times · CNBC · 2026.08.10',
  noteHead:'Why this matters',noteSub:'Funding support for hyperscaler customers who want NVDA GPUs but lack capital for datacenters/power. Eases credit-risk concerns (Oracle CDS hit all-time high recently).',footer:'NVDA · $500B Consortium',brand:BE}},

// 4. TSMC 7월 +45%
{file:'tsmc-july-45pct-yoy-14b',symbol:'MACRO',
 ko:{title:'TSMC — 7월 매출 145억 달러·전년 대비 +45% 급증·AI 반도체 수요 강력',heroIcon:'📈',heroBig:'+45%',heroSub:'세계 최대 반도체 위탁 생산사 TSMC가 7월 매출로 4,676억 대만 달러(약 145억 달러)를 기록했다고 발표했습니다. 지난해 같은 달보다 +45% 급증한 수치로, AI 반도체 수요가 여전히 매우 강력하다는 뜻입니다.',
  cards:[{icon:'📈',big:'+45%',mid:'전년 동월 대비 매출 성장',sub:'AI 수요 강력'},{icon:'💵',big:'145억 달러',mid:'7월 매출 규모',sub:'4,676억 대만 달러'},{icon:'🏭',big:'세계 최대',mid:'반도체 위탁 생산사',sub:'NVIDIA·Apple 등 주 고객'}],
  quoteLabel:'CNBC · TSMC',quoteKo:'"세계 최대 반도체 위탁 생산사 TSMC가 7월 매출 +45% 급증·AI 반도체 수요 지속"',quoteEn:'World\'s biggest chipmaker TSMC July sales surge 45% amid buoyant AI demand · NT$467.68B (~$14.5B)',
  source:'출처: CNBC · TSMC · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'NVIDIA·Apple·AMD 등 주요 반도체 회사가 TSMC에 생산을 맡깁니다. TSMC 매출이 +45%로 급증했다는 것은 이 회사들의 반도체 주문이 계속 강력하다는 뜻이며, AI 사이클이 여전히 강세임을 보여줍니다.',footer:'TSMC 7월 · +45% 성장',brand:BK},
 en:{title:'TSMC — July Revenue $14.5B · +45% YoY Surge · Strong AI Chip Demand',heroIcon:'📈',heroBig:'+45%',heroSub:'World\'s biggest chipmaker TSMC reported July revenue of NT$467.68B (~$14.5B), a +45% YoY surge. AI chip demand remains very strong.',
  cards:[{icon:'📈',big:'+45%',mid:'YoY revenue growth',sub:'AI demand strong'},{icon:'💵',big:'$14.5 B',mid:'July revenue',sub:'NT$467.68B'},{icon:'🏭',big:'World largest',mid:'Semi foundry',sub:'NVIDIA·Apple main customers'}],
  quoteLabel:'CNBC · TSMC',quoteKo:'"TSMC 7월 +45%·AI 수요"',quoteEn:'World\'s biggest chipmaker TSMC July sales surge 45% amid buoyant AI demand · NT$467.68B (~$14.5B)',
  source:'Source: CNBC · TSMC · 2026.08.10',
  noteHead:'Why this matters',noteSub:'NVIDIA/Apple/AMD outsource production to TSMC. +45% TSMC revenue surge means these companies\' semi orders remain strong, indicating AI cycle bull continuity.',footer:'TSMC July · +45%',brand:BE}},

// 5. Nasdaq 70% 200일 이평
{file:'macro-nasdaq-70pct-above-200dma',symbol:'MACRO',
 ko:{title:'매크로 — 나스닥 100 종목 70% 이상이 200일 이평선 위·1년 이상 만에 최대 강세',heroIcon:'📊',heroBig:'70% 이상',heroSub:'나스닥 100 지수를 구성하는 종목의 70% 이상이 지금 200일 이동평균선 위에서 거래되고 있습니다. 1년 이상 만에 가장 넓은 상승 참여이며, 시장 강세의 폭이 넓어지고 있다는 뜻입니다.',
  cards:[{icon:'📊',big:'70%+',mid:'200일 이평 위 종목 비율',sub:'나스닥 100 중'},{icon:'📅',big:'1년 최대',mid:'가장 넓은 상승 참여',sub:'breadth 지표'},{icon:'📈',big:'매크로 강세',mid:'폭넓은 회복',sub:'개별 종목 다수 상승'}],
  quoteLabel:'BARCHART',quoteKo:'"나스닥 100 종목의 70% 이상이 200일 이평선 위에서 거래 중·1년 이상 만의 최대 강세"',quoteEn:'More than 70% of Nasdaq 100 stocks now trading above 200-day moving average · strongest market breadth in more than 1 year',
  source:'출처: Barchart · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'매그니피센트 7 같은 소수 대형주만 오르는 게 아니라 나스닥 100의 대부분 종목이 함께 상승하고 있다는 신호입니다. 시장 강세가 특정 종목에 쏠린 것이 아니라 폭넓게 확산되고 있어 조정 리스크는 상대적으로 낮습니다.',footer:'나스닥 100 · 70%+ 200일 위',brand:BK},
 en:{title:'MACRO — Over 70% of Nasdaq 100 Stocks Trading Above 200-Day MA · Strongest Breadth in 1+ Year',heroIcon:'📊',heroBig:'70%+',heroSub:'Over 70% of Nasdaq 100 constituent stocks trade above their 200-day moving average - the broadest participation in over a year, indicating expanding market breadth.',
  cards:[{icon:'📊',big:'70%+',mid:'Above 200-DMA ratio',sub:'Of Nasdaq 100'},{icon:'📅',big:'1-year max',mid:'Broadest participation',sub:'Breadth indicator'},{icon:'📈',big:'Macro bull',mid:'Broad recovery',sub:'Multi-stock rise'}],
  quoteLabel:'BARCHART',quoteKo:'"Nasdaq 100 70%+ 200-DMA 위"',quoteEn:'More than 70% of Nasdaq 100 stocks now trading above 200-day moving average · strongest market breadth in more than 1 year',
  source:'Source: Barchart · 2026.08.10',
  noteHead:'Why this matters',noteSub:'Not just Mag 7 rising - most Nasdaq 100 constituents rising together. Bull breadth is broad rather than concentrated, meaning correction risk is relatively low.',footer:'Nasdaq 100 · 70%+ above 200DMA',brand:BE}},

// 6. samuel Starlink AI backbone
{file:'starlink-ai-backbone-samuel-frame',symbol:'SPCX',
 ko:{title:'SPCX — samuel "스타링크가 AI 시대 지구 주요 인터넷·AI 로봇/에이전트 트래픽이 인간 초과할 것"',heroIcon:'🌍',heroBig:'AI 시대',heroSub:'samuel의 분석: 앞으로 5년 안에 수백억에서 조 단위 AI 에이전트(디지털·로봇·자동차)가 등장하면, 이들에게 필요한 인터넷 통신량은 인간이 쓰는 것을 훨씬 넘어섭니다. 이 규모를 물리적으로 감당할 수 있는 회사는 Starship을 가진 SpaceX뿐입니다.',
  cards:[{icon:'🌍',big:'AI 시대',mid:'인터넷 수요 폭발',sub:'로봇·자동차·에이전트'},{icon:'🚀',big:'Starship 필수',mid:'대량 위성 발사 유일',sub:'다른 회사 불가'},{icon:'🌐',big:'지구 backbone',mid:'AI 인프라 척추',sub:'스타링크 미래 역할'}],
  quoteLabel:'SAMUEL',quoteKo:'"AI 에이전트가 수백억~조 단위로 등장하면 이 규모의 인터넷을 물리적으로 확장할 수 있는 회사는 Starship을 가진 SpaceX뿐이며, 스타링크는 AI 시대의 척추가 될 것입니다."',quoteEn:'AI agents (digital, robots, cars) will need massive bandwidth · only SpaceX with Starship can physically scale · Starlink will be backbone of AI age',
  source:'출처: samuel · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'스타링크를 단순한 위성 인터넷 회사로 보는 게 아니라, AI 시대의 필수 인프라로 재정의하는 프레임입니다. 오늘 Aaron Barrett의 20만 위성 배치 예상, Musk의 인간 초과 트래픽 발언과도 일치합니다.',footer:'스타링크 · AI 시대 인프라',brand:BK},
 en:{title:'SPCX — samuel "Starlink Will Be Backbone of AI Age · AI Agent Traffic to Exceed Human Traffic"',heroIcon:'🌍',heroBig:'AI ERA',heroSub:'samuel analysis: In next 5 years, tens of billions to trillions of AI agents (digital/robots/cars) will emerge, needing bandwidth far exceeding human internet use. Only SpaceX with Starship can physically scale.',
  cards:[{icon:'🌍',big:'AI era',mid:'Internet demand explosion',sub:'Robots·cars·agents'},{icon:'🚀',big:'Starship essential',mid:'Only mass launcher',sub:'Other companies cannot'},{icon:'🌐',big:'Earth backbone',mid:'AI infra spine',sub:'Starlink future role'}],
  quoteLabel:'SAMUEL',quoteKo:'"스타링크가 AI 시대 척추"',quoteEn:'AI agents (digital, robots, cars) will need massive bandwidth · only SpaceX with Starship can physically scale · Starlink will be backbone of AI age',
  source:'Source: samuel · 2026.08.10',
  noteHead:'Why this matters',noteSub:'Reframes Starlink from simple satellite ISP to essential AI-era infrastructure. Aligns with todays Aaron Barrett 200K satellite deployment estimate and Musks AI-exceeds-human traffic remark.',footer:'Starlink · AI Era Infra',brand:BE}},

// 7. Aaron Barrett Starlink Pbps
{file:'aaron-barrett-starlink-pbps-200k-sats',symbol:'SPCX',
 ko:{title:'SPCX — Aaron Barrett "스타링크 총 통신 용량 초당 2-8 페타비트·20만 위성 10년 내 배치 예상"',heroIcon:'📶',heroBig:'2-8 Pbps',heroSub:'Aaron Barrett의 분석: 스타링크 전 세계 총 통신 용량이 초당 2-8 페타비트(2,000-8,000 Tbps)입니다. V3 위성 10만 개를 배치하면 10 페타비트가 되고, V3+가 5배 강력해서 20만 위성이 향후 10년 안에 배치될 것으로 예상합니다.',
  cards:[{icon:'📶',big:'2-8 Pbps',mid:'현재 총 통신 용량',sub:'초당 페타비트'},{icon:'🛰️',big:'20만 위성',mid:'10년 내 배치 예상',sub:'현재 대비 20배'},{icon:'🚀',big:'V3 5배',mid:'V3+ 위성이 V3 대비',sub:'통신 용량 상향'}],
  quoteLabel:'AARON BARRETT · MUSK 확인',quoteKo:'"스타링크 총 통신 용량 2-8 Pbps·20만 위성 10년 배치·V3가 V2 대비 5배·아직 20억 명이 인터넷 접근 없음"',quoteEn:'Starlink total bandwidth 2-8 Pbps · 200K satellites 10 years · V3 5x V2 · ~2B people still lack regular internet',
  source:'출처: Aaron Barrett · Elon Musk · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'구체적인 수치로 스타링크의 미래 규모를 보여주는 분석입니다. 세계 아직 인터넷 접근이 없는 20억 명이 있어 수요가 넉넉하고, Musk가 "V3가 V2 대비 5배 통신 용량"이라고 직접 확인했습니다.',footer:'스타링크 · 2-8 Pbps · 20만 위성',brand:BK},
 en:{title:'SPCX — Aaron Barrett "Starlink Total Bandwidth 2-8 Pbps · 200K Satellites Expected in 10 Years"',heroIcon:'📶',heroBig:'2-8 Pbps',heroSub:'Aaron Barrett analysis: Starlink global total bandwidth is 2-8 Pbps (2,000-8,000 Tbps). V3 100K deployment = 10 Pbps · V3+ 5x more capable · 200K satellites expected within 10 years.',
  cards:[{icon:'📶',big:'2-8 Pbps',mid:'Current total bandwidth',sub:'Petabits per second'},{icon:'🛰️',big:'200K sats',mid:'10-year deployment',sub:'20x current'},{icon:'🚀',big:'V3+ 5x',mid:'vs current V3',sub:'Capacity upgrade'}],
  quoteLabel:'AARON BARRETT · MUSK CONFIRM',quoteKo:'"2-8 Pbps·200K 위성·V3 5배"',quoteEn:'Starlink total bandwidth 2-8 Pbps · 200K satellites 10 years · V3 5x V2 · ~2B people still lack regular internet',
  source:'Source: Aaron Barrett · Elon Musk · 2026.08.10',
  noteHead:'Why this matters',noteSub:'Concrete numbers on Starlinks future scale. ~2B people still lack internet access = ample demand. Musk directly confirmed "V3 5x V2 capacity".',footer:'Starlink · 2-8 Pbps · 200K sats',brand:BE}},

// 8. SPCX Cursor $60B
{file:'spcx-cursor-60b-acquisition-ai-coding',symbol:'SPCX',
 ko:{title:'SPCX — AI 코딩 스타트업 Cursor를 600억 달러에 인수 예정·다음 주 마감',heroIcon:'💼',heroBig:'600억 달러',heroSub:'스페이스X가 AI 코딩 스타트업 Cursor를 600억 달러에 인수하는 딜을 다음 주에 마감할 것이라고 Elena Zaniuk이 보도했습니다. Cursor는 개발자용 AI 코드 어시스턴트로 유명한 회사입니다.',
  cards:[{icon:'💼',big:'600억 달러',mid:'Cursor 인수 규모',sub:'SPCX 역대 최대 인수'},{icon:'📅',big:'다음 주',mid:'마감 예상 시점',sub:'거의 확정'},{icon:'🤖',big:'AI 코딩',mid:'개발자용 AI 도구',sub:'Cursor 주력 사업'}],
  quoteLabel:'ELENA ZANIUK',quoteKo:'"스페이스X가 AI 코딩 스타트업 Cursor 600억 달러 인수를 다음 주에 마감할 것으로 보도됨"',quoteEn:'SpaceX could reportedly close its $60 billion acquisition of AI coding startup Cursor as soon as next week',
  source:'출처: Elena Zaniuk · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'SPCX가 로켓·위성을 넘어 AI 소프트웨어까지 확장한다는 의미입니다. Cursor의 AI 코딩 기술은 SPCX·Tesla의 자체 소프트웨어 개발을 가속화하고, Starmind 궤도 데이터센터 등 AI 인프라와도 연결됩니다.',footer:'SPCX · Cursor 인수 · 600억 달러',brand:BK},
 en:{title:'SPCX — Acquiring AI Coding Startup Cursor for $60B · Deal Closing Next Week',heroIcon:'💼',heroBig:'$60 B',heroSub:'SpaceX could close its $60B acquisition of AI coding startup Cursor as soon as next week, per Elena Zaniuk. Cursor is famous for its AI code assistant for developers.',
  cards:[{icon:'💼',big:'$60 B',mid:'Cursor acquisition',sub:'SPCX largest ever'},{icon:'📅',big:'Next week',mid:'Expected close',sub:'Near confirmed'},{icon:'🤖',big:'AI coding',mid:'Developer AI tool',sub:'Cursor core business'}],
  quoteLabel:'ELENA ZANIUK',quoteKo:'"SPCX Cursor 600억 달러 인수 다음 주"',quoteEn:'SpaceX could reportedly close its $60 billion acquisition of AI coding startup Cursor as soon as next week',
  source:'Source: Elena Zaniuk · 2026.08.10',
  noteHead:'Why this matters',noteSub:'SPCX expanding beyond rockets/satellites to AI software. Cursors AI coding tech accelerates SPCX/Tesla internal software dev and connects to Starmind orbital DC AI infra.',footer:'SPCX · Cursor Acquisition · $60B',brand:BE}},

// 9. 매크로 일본 JGB 21년 최고
{file:'macro-japan-jgb-2yr-1614-21yr-high',symbol:'MACRO',
 ko:{title:'매크로 — 일본 2년 국채 수익률 1.614%로 21년 최고·9월 BOJ 금리 인상 예상',heroIcon:'🇯🇵',heroBig:'1.614%',heroSub:'일본 2년 만기 국채 수익률이 1.614%까지 올라 21년 만에 최고 수준입니다. 엔화 개입과 유가 하락에도 수익률이 계속 오르는 것은 일본은행이 9월에 다시 금리를 인상할 것이라는 시장 예상이 강하기 때문입니다.',
  cards:[{icon:'🇯🇵',big:'1.614%',mid:'일본 2년 국채 수익률',sub:'21년 최고'},{icon:'📅',big:'9월 예상',mid:'BOJ 금리 인상',sub:'시장 컨센'},{icon:'💴',big:'엔·유가 무관',mid:'개입·유가 하락에도',sub:'수익률 계속 상승'}],
  quoteLabel:'BULL THEORY',quoteKo:'"일본 2년 국채 수익률 21년 최고 1.614%·9월 BOJ 금리 인상 예상"',quoteEn:'Japan 2-year bond yield hit 1.614%, highest in 21 years · markets betting BOJ hikes again in September',
  source:'출처: Bull Theory · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'일본 금리 인상은 캐리 트레이드(엔화 빌려 미국 자산 투자) 자금 회수로 이어질 수 있습니다. 이 자금이 미국 주식·채권에서 빠져나오면 시장 변동성이 커질 수 있어, 9월 BOJ 결정을 주시해야 합니다.',footer:'JPY · 2년 국채 1.614%',brand:BK},
 en:{title:'MACRO — Japan 2-Yr Bond Yield 1.614% · 21-Year High · BOJ September Hike Expected',heroIcon:'🇯🇵',heroBig:'1.614%',heroSub:'Japan 2-year bond yield hit 1.614%, highest in 21 years. Yields keep climbing despite yen intervention and falling oil prices, as markets bet BOJ will hike rates again in September.',
  cards:[{icon:'🇯🇵',big:'1.614%',mid:'Japan 2Y yield',sub:'21-year high'},{icon:'📅',big:'Sep expected',mid:'BOJ rate hike',sub:'Market consensus'},{icon:'💴',big:'JPY/oil ignore',mid:'Despite intervention/oil drop',sub:'Yields keep rising'}],
  quoteLabel:'BULL THEORY',quoteKo:'"JGB 1.614% 21년 최고·9월 BOJ 인상"',quoteEn:'Japan 2-year bond yield hit 1.614%, highest in 21 years · markets betting BOJ hikes again in September',
  source:'Source: Bull Theory · 2026.08.10',
  noteHead:'Why this matters',noteSub:'Japan rate hikes could trigger carry trade unwind (yen borrowed for US assets). If funds exit US stocks/bonds, market volatility increases · watch September BOJ decision.',footer:'JPY · 2Y JGB 1.614%',brand:BE}},

// 10. Boring Company $2B
{file:'boring-company-2b-loop-city-expansion',symbol:'MACRO',
 ko:{title:'Boring Company — 20억 달러 신규 자금 조성·도시별 Loop 건설 사업으로 급성장',heroIcon:'🚇',heroBig:'20억 달러',heroSub:'머스크 산하 Boring Company가 신규로 약 20억 달러 자금을 조성했다고 Phil Trubey가 관측했습니다. 사업 개발 인력 대량 채용 중이며, 이는 도시별 지하 Loop 건설 사업을 세계 여러 도시에 청구할 수 있는 기술 성숙 단계에 도달했다는 신호입니다.',
  cards:[{icon:'🚇',big:'20억 달러',mid:'신규 자금 조성',sub:'Boring Company'},{icon:'👥',big:'인력 급증',mid:'사업 개발 대량 채용',sub:'기술 성숙 신호'},{icon:'🏙️',big:'세계 도시',mid:'Loop 건설 청구',sub:'약 34억 도시 인구 대상'}],
  quoteLabel:'PHIL TRUBEY',quoteKo:'"Boring Company가 20억 달러 신규 자금 조성 후 사업 개발 인력 대량 채용·세계 도시 Loop 사업 확장 시작 신호"',quoteEn:'Boring Company just closed about $2B in new funding · hiring tons of business development · reached tech maturity to bill municipalities worldwide for Loop projects',
  source:'출처: Phil Trubey · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Boring Company는 아직 상장 전이지만, 머스크 회사 그룹의 성장 축 중 하나입니다. Terafab·SpaceX·Tesla·xAI에 이어 Boring도 급성장한다는 신호이며, Loop 건설이 성공하면 도시 인프라 시장에 큰 변화가 옵니다.',footer:'Boring · 20억 달러 · Loop 확장',brand:BK},
 en:{title:'Boring Company — $2B New Funding · Rapid Growth for City Loop Construction Business',heroIcon:'🚇',heroBig:'$2 B',heroSub:'Musk-owned Boring Company raised ~$2B in new funding, per Phil Trubey. Aggressive business development hiring signals technical maturity to bill cities worldwide for Loop projects.',
  cards:[{icon:'🚇',big:'$2 B',mid:'New funding raised',sub:'Boring Company'},{icon:'👥',big:'Hiring surge',mid:'BD mass hiring',sub:'Tech maturity signal'},{icon:'🏙️',big:'Cities globally',mid:'Loop construction billing',sub:'~3.4B urban population target'}],
  quoteLabel:'PHIL TRUBEY',quoteKo:'"Boring $2B·Loop 세계 확장"',quoteEn:'Boring Company just closed about $2B in new funding · hiring tons of business development · reached tech maturity to bill municipalities worldwide for Loop projects',
  source:'Source: Phil Trubey · 2026.08.10',
  noteHead:'Why this matters',noteSub:'Boring still pre-IPO but one of Musk company groups growth axes. After Terafab/SPCX/Tesla/xAI, Boring also surges · Loop construction success = major urban infrastructure change.',footer:'Boring · $2B · Loop Expansion',brand:BE}},

// 11. TSLA Cybercab Giga Texas
{file:'tsla-cybercab-giga-texas-production-signal',symbol:'TSLA',
 ko:{title:'TSLA — Cybercab 로고 부착 차량 Giga Texas에 대량 목격·상업 생산 임박 신호',heroIcon:'🚕',heroBig:'생산 임박',heroSub:'Joe Tegtmeyer가 관측한 바에 따르면, 지난 주 낮았던 Cybercab 생산이 오늘 Giga Texas 서쪽 라인에 크게 늘어난 모습입니다. 이번엔 문·해치에 "Cybercab" 로고가 실제 부착된 상태로, 상업 생산 준비의 명확한 시그널입니다.',
  cards:[{icon:'🚕',big:'로고 부착',mid:'Cybercab 정식 배지',sub:'문·해치에 새겨짐'},{icon:'📈',big:'생산 증가',mid:'지난 주 저조 → 오늘 급증',sub:'서쪽 라인'},{icon:'🏭',big:'Giga Texas',mid:'생산 지점',sub:'미국 최대 Tesla 공장'}],
  quoteLabel:'JOE TEGTMEYER',quoteKo:'"Cybercab 생산이 지난 주 낮았지만 오늘 Giga Texas 서쪽 라인에 로고 부착 차량 대량 목격·상업 생산 준비 신호"',quoteEn:'Cybercab production low last week, but today many with "Cybercab" logos on doors/hatches lining up on W side at Giga Texas · commercial production readiness signal',
  source:'출처: Joe Tegtmeyer · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'며칠 전 삼성전기·LG이노텍의 Cybercab 카메라 5억 달러 계약, Robotaxi Ops 6개 도시 채용에 이어 실제 생산 차량이 라인에 등장했습니다. 상업 로보택시 서비스 개시가 코앞이라는 강력한 시그널입니다.',footer:'TSLA Cybercab · 생산 임박',brand:BK},
 en:{title:'TSLA — Cybercab Logo-Branded Vehicles Massed at Giga Texas · Commercial Production Signal',heroIcon:'🚕',heroBig:'PROD NEAR',heroSub:'Per Joe Tegtmeyer: Cybercab production was low last week but today many vehicles lining up on W side of Giga Texas, this time with actual "Cybercab" logos on doors/hatches - clear signal of commercial production readiness.',
  cards:[{icon:'🚕',big:'Logo attached',mid:'Cybercab official badge',sub:'On doors/hatches'},{icon:'📈',big:'Production up',mid:'Last week low → today surge',sub:'W side line'},{icon:'🏭',big:'Giga Texas',mid:'Production site',sub:'Largest US Tesla plant'}],
  quoteLabel:'JOE TEGTMEYER',quoteKo:'"Cybercab 로고 대량 목격"',quoteEn:'Cybercab production low last week, but today many with "Cybercab" logos on doors/hatches lining up on W side at Giga Texas · commercial production readiness signal',
  source:'Source: Joe Tegtmeyer · 2026.08.10',
  noteHead:'Why this matters',noteSub:'After Samsung Electro-Mechanics/LG Innotek $500M Cybercab camera deal and Robotaxi Ops 6-city hiring, real production vehicles now on line. Strong signal commercial Robotaxi service launch is imminent.',footer:'TSLA Cybercab · Production Near',brand:BE}},

// 12. TSLA Japan +60%
{file:'tsla-japan-delivery-60pct-expand',symbol:'TSLA',
 ko:{title:'TSLA — 일본 배송 네트워크 60% 확대·요코하마·고베 등 신규·연 배송 12,000대 돌파',heroIcon:'🇯🇵',heroBig:'+60%',heroSub:'테슬라가 성장하는 일본 수요에 대응해 배송 네트워크를 올해 60% 가까이 확대한다고 DogeDesigner가 보도했습니다. 8월에 요코하마·고베가 열리고, 연말까지 간토·나고야에도 추가 지점을 개설합니다. 연 배송이 12,000대를 넘었고 6월 한 달 배송이 4,000대에 이릅니다.',
  cards:[{icon:'🏢',big:'+60%',mid:'일본 배송 네트워크 확대',sub:'이 해 목표'},{icon:'📍',big:'4개 신규',mid:'요코하마·고베·간토·나고야',sub:'8월-연말 순차 오픈'},{icon:'🚗',big:'12,000+대',mid:'2028년 배송 완료',sub:'6월 4,000대'}],
  quoteLabel:'DOGEDESIGNER',quoteKo:'"테슬라가 일본 배송 네트워크 60% 확대·요코하마·고베 등 신규 지점 개설·연 배송 12,000대 돌파"',quoteEn:'Tesla to expand Japanese delivery network by nearly 60% this year · Yokohama/Kobe/Kanto/Nagoya · 12K+ deliveries YTD',
  source:'출처: DogeDesigner · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'테슬라가 유럽(France +86%)·중국(7월 93K대)에 이어 일본 시장에서도 급성장하고 있습니다. 일본은 도요타·혼다의 본진이라 침투가 어려웠지만, Tesla의 글로벌 다각 회복이 아시아에서도 실체화되는 시그널입니다.',footer:'TSLA 일본 · +60% · 12K대',brand:BK},
 en:{title:'TSLA — Japan Delivery Network Expands +60% · Yokohama/Kobe New · 12,000+ Annual Deliveries',heroIcon:'🇯🇵',heroBig:'+60%',heroSub:'Tesla expanding Japan delivery network by nearly 60% this year to meet growing demand, per DogeDesigner. Yokohama/Kobe opening August, Kanto/Nagoya by year-end. Annual deliveries exceed 12K · June alone 4K.',
  cards:[{icon:'🏢',big:'+60%',mid:'Japan network expansion',sub:'This year target'},{icon:'📍',big:'4 new locations',mid:'Yokohama·Kobe·Kanto·Nagoya',sub:'Aug-YE staged opens'},{icon:'🚗',big:'12,000+',mid:'2028 deliveries',sub:'June 4,000'}],
  quoteLabel:'DOGEDESIGNER',quoteKo:'"Tesla 일본 +60% 확대"',quoteEn:'Tesla to expand Japanese delivery network by nearly 60% this year · Yokohama/Kobe/Kanto/Nagoya · 12K+ deliveries YTD',
  source:'Source: DogeDesigner · 2026.08.10',
  noteHead:'Why this matters',noteSub:'After Europe (France +86%) and China (July 93K), Tesla now surging in Japan too. Japan is Toyota/Hondas home, hard to penetrate - Teslas global multi-axis recovery materializing in Asia too.',footer:'TSLA Japan · +60% · 12K units',brand:BE}},

// 13. GOOGL 현금 $242.5B
{file:'googl-cash-record-2425b-net-cash-144b',symbol:'GOOGL',
 ko:{title:'GOOGL — 현금 잔고 사상 최대 2,425억 달러·부채 983억 달러·순현금 1,440억 달러',heroIcon:'💰',heroBig:'2,425억 달러',heroSub:'구글이 사상 최대 현금 잔고를 기록했다고 Qualstom이 정리했습니다. 현금 2,425억 달러·부채 983억 달러·순현금 1,440억 달러입니다. AI CAPEX와 자사주 매입에 사용할 여력이 매우 큽니다.',
  cards:[{icon:'💰',big:'2,425억 달러',mid:'현금 잔고 사상 최대',sub:'구글'},{icon:'💳',big:'983억 달러',mid:'총 부채',sub:'우량 신용도'},{icon:'✅',big:'1,440억 달러',mid:'순현금(현금-부채)',sub:'투자 여력 극대'}],
  quoteLabel:'QUALSTOM',quoteKo:'"구글 현금 사상 최대 2,425억 달러·부채 983억 달러·순현금 1,440억 달러"',quoteEn:'Google largest cash balance ever · Cash $242.5B · Debt $98.3B · Net cash $144B',
  source:'출처: Qualstom · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'며칠 전 GOOGL이 250억 달러 채권을 발행했는데도 순현금이 1,440억 달러입니다. AI CAPEX·Anthropic 지분·자사주 매입·인수합병 등 어디에든 대규모로 자금 투입이 가능합니다. Buffett가 100억 달러를 신규 투자한 이유도 이 재무 강세와 연결됩니다.',footer:'GOOGL · 현금 2,425억 · 순현금 1,440억',brand:BK},
 en:{title:'GOOGL — Cash Balance Record $242.5B · Debt $98.3B · Net Cash $144B',heroIcon:'💰',heroBig:'$242.5 B',heroSub:'Google\'s largest cash balance ever, per Qualstom. Cash $242.5B · Debt $98.3B · Net cash $144B. Massive capacity for AI CAPEX and buybacks.',
  cards:[{icon:'💰',big:'$242.5 B',mid:'Cash balance record',sub:'Google'},{icon:'💳',big:'$98.3 B',mid:'Total debt',sub:'Investment grade'},{icon:'✅',big:'$144 B',mid:'Net cash (cash-debt)',sub:'Max investment capacity'}],
  quoteLabel:'QUALSTOM',quoteKo:'"GOOGL 현금 사상 최대"',quoteEn:'Google largest cash balance ever · Cash $242.5B · Debt $98.3B · Net cash $144B',
  source:'Source: Qualstom · 2026.08.10',
  noteHead:'Why this matters',noteSub:'Even after $25B bond issuance, GOOGL has $144B net cash. Massive dry powder for AI CAPEX/Anthropic stake/buybacks/M&A. Buffetts $10B new investment aligns with this financial strength.',footer:'GOOGL · Cash $242.5B · Net $144B',brand:BE}},

// 14. MSFT Maia 300
{file:'msft-maia-300-ai-chip-2m-sep',symbol:'MSFT',
 ko:{title:'MSFT — 자체 AI 칩 Maia 300 9월에 2백만 개 생산 확대·자체 실리콘 push',heroIcon:'💾',heroBig:'2백만 개',heroSub:'마이크로소프트가 자체 AI 칩 Maia 300 생산을 9월에 2백만 개까지 확대한다고 Shay Boloor가 정리했습니다. 자체 실리콘 push를 가속화하며, 이 칩이 향후 1년 동안 MSFT 내부 AI 워크로드 대부분을 처리할 예정입니다.',
  cards:[{icon:'💾',big:'2백만 개',mid:'Maia 300 9월 생산 목표',sub:'MSFT 자체 AI 칩'},{icon:'⚡',big:'자체 실리콘',mid:'NVIDIA 의존 축소',sub:'push 가속'},{icon:'🔗',big:'내부 AI',mid:'MSFT 워크로드 처리',sub:'향후 1년 대부분'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"MSFT가 자체 AI 칩 Maia 300 9월 2M 생산 확대·자체 실리콘 push·내부 AI 워크로드 대부분 처리"',quoteEn:'MSFT plans to ramp production toward 2M Maia 300 AI chips in September · custom silicon push · powers most Microsoft internal AI workloads next year',
  source:'출처: Shay Boloor · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'MSFT는 지금까지 NVIDIA GPU를 대량 구매했지만, 오늘 자체 칩 대량 생산은 NVIDIA 의존 축소를 뜻합니다. 오늘 NVIDIA + 5,000억 달러 컨소시엄과 대비되는 방향이며, AI 반도체 시장의 큰 판도 변화입니다.',footer:'MSFT Maia 300 · 9월 2M',brand:BK},
 en:{title:'MSFT — Custom AI Chip Maia 300 Ramps to 2M Units in September · Custom Silicon Push',heroIcon:'💾',heroBig:'2M units',heroSub:'Microsoft ramping custom AI chip Maia 300 production to 2M in September, per Shay Boloor. Accelerating custom silicon push · this chip powers most MSFT internal AI workloads next year.',
  cards:[{icon:'💾',big:'2M units',mid:'Maia 300 Sep target',sub:'MSFT custom AI chip'},{icon:'⚡',big:'Custom silicon',mid:'NVIDIA dependency reduce',sub:'Push accelerating'},{icon:'🔗',big:'Internal AI',mid:'MSFT workload processing',sub:'Most for next year'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"MSFT Maia 300 9월 2M"',quoteEn:'MSFT plans to ramp production toward 2M Maia 300 AI chips in September · custom silicon push · powers most Microsoft internal AI workloads next year',
  source:'Source: Shay Boloor · 2026.08.10',
  noteHead:'Why this matters',noteSub:'MSFT has been big NVIDIA GPU buyer, but todays mass custom chip production means reducing NVIDIA dependency. Opposite direction from todays NVIDIA $500B consortium · big semi market shift.',footer:'MSFT Maia 300 · Sep 2M',brand:BE}},

// 15. TSLA App 1천만 + Musk 모든차 Starlink
{file:'tsla-app-10m-users-musk-all-cars-starlink',symbol:'TSLA',
 ko:{title:'TSLA — 테슬라 앱 월간 사용자 1,000만 명 돌파·Musk "모든 차량에 스타링크 미래 탑재"',heroIcon:'📱',heroBig:'1,000만 명',heroSub:'Musk가 테슬라 앱 월간 활성 사용자가 1,000만 명을 돌파했다고 발표했다고 TheSonOfWisley가 전했습니다. 동시에 Musk는 "미래에 모든 차량에 스타링크가 탑재될 것"이라고 Kalshi를 통해 언급했습니다.',
  cards:[{icon:'📱',big:'1,000만',mid:'테슬라 앱 월간 사용자',sub:'주요 마일스톤'},{icon:'🚗',big:'모든 차량',mid:'스타링크 탑재 미래',sub:'Musk 발언'},{icon:'🔗',big:'통합 축',mid:'앱·차량·인터넷',sub:'테슬라·SPCX 시너지'}],
  quoteLabel:'ELON MUSK · TheSonOfWisley·KALSHI',quoteKo:'"테슬라 앱 월간 사용자 1천만 명 돌파·미래에 모든 차량에 스타링크 탑재"',quoteEn:'Tesla app now has 10M monthly users · Musk says "all cars" will have Starlink in future',
  source:'출처: TheSonOfWisley · Kalshi · Elon Musk · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'테슬라 앱 1,000만 사용자는 자동차 회사가 아닌 소프트웨어·서비스 회사로 확장한다는 신호입니다. 여기에 모든 차량에 스타링크 탑재까지 되면 SPCX와의 시너지가 극대화되며, Wood의 "Robotaxi 마진 80-90%" 프레임의 실 근거가 됩니다.',footer:'TSLA · 앱 1천만 · 스타링크 통합',brand:BK},
 en:{title:'TSLA — Tesla App Exceeds 10M Monthly Users · Musk "All Cars Will Have Starlink in Future"',heroIcon:'📱',heroBig:'10M users',heroSub:'Musk announced Tesla app monthly active users exceeded 10M, per TheSonOfWisley. Simultaneously via Kalshi: "all cars will have Starlink in future".',
  cards:[{icon:'📱',big:'10M',mid:'Tesla app MAU',sub:'Major milestone'},{icon:'🚗',big:'All cars',mid:'Starlink future install',sub:'Musk statement'},{icon:'🔗',big:'Integration axis',mid:'App·car·internet',sub:'Tesla·SPCX synergy'}],
  quoteLabel:'ELON MUSK · TheSonOfWisley·KALSHI',quoteKo:'"Tesla 앱 10M·모든 차 Starlink"',quoteEn:'Tesla app now has 10M monthly users · Musk says "all cars" will have Starlink in future',
  source:'Source: TheSonOfWisley · Kalshi · Elon Musk · 2026.08.10',
  noteHead:'Why this matters',noteSub:'Tesla app 10M users signals expansion from car company to software/service company. Adding Starlink to all cars maximizes SPCX synergy and substantiates Woods "Robotaxi 80-90% margin" frame.',footer:'TSLA · App 10M · Starlink Integration',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260811.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260811-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
