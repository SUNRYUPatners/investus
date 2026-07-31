// 2026-08-01 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.01';

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
  JPY:  { fg:"#dc2626", fg2:"#991b1b", bg2:"#1a0505", card:"#200a0a" },
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
// 1. MSFT 주가 +15.85% · 시총 +$400B
{file:'msft-price-plus1585-cap-400b',symbol:'MSFT',
 ko:{title:'MSFT — 오늘 +15.85% 급등 · 시총 +$400B · Q1 2026 강세 실적 반응',heroIcon:'📈',heroBig:'+$400 B',heroSub:'Stocks.News: MSFT가 오늘 +15.85% 급등하며 시총 +$400B 이상 증가 · Q1 2026 매출·이익 두 자릿수 성장 반응 · 추가 자사주 매입 $15B',
  cards:[{icon:'📈',big:'+15.85 %',mid:'하루 상승률',sub:'실적 반응'},{icon:'💰',big:'+$400 B',mid:'시총 증가',sub:'하루 기준'},{icon:'🔁',big:'$15 B',mid:'추가 자사주 매입',sub:'주주 환원 확대'}],
  quoteLabel:'STOCKS.NEWS · INVESTING VISUALS',quoteKo:'"MSFT가 오늘 시총 +$400B 증가 · Q4 실적 상회·Q1 가이던스 강세로 반응"',quoteEn:'"MSFT gained over $400B in market cap today · reacting to Q4 beat and Q1 guidance strength"',
  source:'출처: Stocks.News · Investing visuals · 2026.07.31',
  noteHead:'왜 중요한가: 어제 리포트한 Azure $100B·Copilot 30M+·백로그 +51%의 시장 반응 확정',noteSub:'앞으로 볼 것: Mag 7 YTD MSFT -8.2% 반등 여부·다음 실적 지속성',footer:'MSFT · +$400B 시총',brand:BK},
 en:{title:'MSFT — Up +15.85% Today · Market Cap +$400B · Q1 2026 Bull Print Reaction',heroIcon:'📈',heroBig:'+$400 B',heroSub:'Stocks.News: MSFT surged +15.85% today, adding over $400B in market cap · Q1 2026 revenue/income double-digit growth reaction · additional $15B buyback',
  cards:[{icon:'📈',big:'+15.85 %',mid:'Daily gain',sub:'earnings reaction'},{icon:'💰',big:'+$400 B',mid:'Market cap add',sub:'in one day'},{icon:'🔁',big:'$15 B',mid:'Additional buyback',sub:'shareholder return expands'}],
  quoteLabel:'STOCKS.NEWS · INVESTING VISUALS',quoteKo:'"MSFT 시총 +$400B · Q4 실적 상회 반응"',quoteEn:'"MSFT gained over $400B in market cap today · reacting to Q4 beat and Q1 guidance strength"',
  source:'Source: Stocks.News · Investing visuals · 2026.07.31',
  noteHead:'Why: Confirms market reaction to yesterday-reported Azure $100B · Copilot 30M+ · backlog +51%',noteSub:'Watch: MSFT Mag 7 YTD -8.2% rebound · next-earnings continuity',footer:'MSFT · +$400B cap',brand:BE}},

// 2. MSFT AI cyber attack
{file:'msft-ai-cyber-attack-3orgs',symbol:'MSFT',
 ko:{title:'MSFT — AI 모델이 사이버 공격에 이용 · 3개 조직 침입 · OpenAI 유사 사례 후 (Bloomberg)',heroIcon:'⚠️',heroBig:'AI ATTACK',heroSub:'unusual_whales: MSFT AI 모델이 이번 주와 지난 주에 걸쳐 3개 서로 다른 조직 침입 사이버 공격에 이용됨 · OpenAI 유사 사례 공개 후 1주일 만 (Bloomberg)',
  cards:[{icon:'⚠️',big:'3 조직',mid:'AI로 침입',sub:'서로 다른 대상'},{icon:'🕐',big:'2주 내',mid:'이번 주·지난 주',sub:'단기 반복'},{icon:'🔗',big:'OpenAI 이후',mid:'유사 사례 공개',sub:'1주일 만'}],
  quoteLabel:'UNUSUAL_WHALES · BLOOMBERG',quoteKo:'"MSFT AI 모델이 3개 조직 사이버 공격에 이용 · OpenAI 유사 사례 후 일주일"',quoteEn:'"MSFT AI models used in cyber attacks breaching 3 organizations · one week after OpenAI similar disclosure"',
  source:'출처: unusual_whales · Bloomberg · 2026.07.31',
  noteHead:'왜 중요한가: 프런티어 AI 안전 논쟁 재점화·오늘 MSFT 강세 실적과 대비되는 리스크',noteSub:'앞으로 볼 것: AI 사이버 보안 규제 강화·MSFT 대응 조치',footer:'MSFT · AI 사이버 이슈',brand:BK},
 en:{title:'MSFT — AI Models Used in Cyber Attacks · Breached 3 Organizations · Week After OpenAI Similar (Bloomberg)',heroIcon:'⚠️',heroBig:'AI ATTACK',heroSub:'unusual_whales: MSFT AI models used to breach 3 different organizations in cyber attacks this week and last · little more than a week after OpenAI disclosed similar incident (Bloomberg)',
  cards:[{icon:'⚠️',big:'3 orgs',mid:'AI breached',sub:'different targets'},{icon:'🕐',big:'Within 2 wks',mid:'This week and last',sub:'short-term repeat'},{icon:'🔗',big:'After OpenAI',mid:'Similar disclosure',sub:'one week'}],
  quoteLabel:'UNUSUAL_WHALES · BLOOMBERG',quoteKo:'"MSFT AI 3개 조직 침입"',quoteEn:'"MSFT AI models used in cyber attacks breaching 3 organizations · one week after OpenAI similar disclosure"',
  source:'Source: unusual_whales · Bloomberg · 2026.07.31',
  noteHead:'Why: Reignites frontier AI safety debate · risk contrasting with today\'s MSFT bull print',noteSub:'Watch: AI cybersecurity regulation tightening · MSFT response measures',footer:'MSFT · AI cyber issue',brand:BE}},

// 3. MSFT Cloud demand exceeds capacity
{file:'msft-cloud-demand-exceeds',symbol:'MSFT',
 ko:{title:'MSFT — 클라우드 수요가 캐파 초과 지속 · 실적 콜 명시',heroIcon:'☁️',heroBig:'DEMAND > SUPPLY',heroSub:'Enno D: MSFT가 실적 콜에서 클라우드 비즈니스 고객 수요가 캐파를 초과하는 상황이 지속되고 있다고 명시적으로 발언',
  cards:[{icon:'☁️',big:'수요 > 공급',mid:'클라우드 캐파',sub:'초과 지속'},{icon:'📢',big:'실적 콜 명시',mid:'CEO/CFO 확인',sub:'투자자에 직접'},{icon:'🏗️',big:'CAPEX 정당화',mid:'추가 확장 필요',sub:'FY27 두 자릿수 매출'}],
  quoteLabel:'ENNO D',quoteKo:'"MSFT: 클라우드 비즈니스 고객 수요가 캐파를 초과하는 상황이 지속된다"',quoteEn:'"MSFT said: customer demand in the cloud business continues to exceed available capacity"',
  source:'출처: Enno D · Microsoft · 2026.07.31',
  noteHead:'왜 중요한가: 어제 AMZN CAPEX $220B·오늘 하이퍼스케일러 $155B와 정합 · 수요 견조 재확인',noteSub:'앞으로 볼 것: MSFT 후속 CAPEX 상향·데이터센터 확장 스케줄',footer:'MSFT · 수요 초과',brand:BK},
 en:{title:'MSFT — Cloud Demand Continues to Exceed Available Capacity · Earnings Call Note',heroIcon:'☁️',heroBig:'DEMAND > SUPPLY',heroSub:'Enno D: MSFT explicitly stated on earnings call that customer demand in the cloud business continues to exceed available capacity',
  cards:[{icon:'☁️',big:'Demand > supply',mid:'Cloud capacity',sub:'exceeding continues'},{icon:'📢',big:'Call explicit',mid:'CEO/CFO confirmed',sub:'to investors'},{icon:'🏗️',big:'CAPEX justified',mid:'Further expansion needed',sub:'FY27 double-digit rev'}],
  quoteLabel:'ENNO D',quoteKo:'"클라우드 수요가 캐파 초과 지속"',quoteEn:'"MSFT said: customer demand in the cloud business continues to exceed available capacity"',
  source:'Source: Enno D · Microsoft · 2026.07.31',
  noteHead:'Why: Consistent with yesterday\'s AMZN CAPEX $220B and today\'s hyperscaler $155B · demand strength reaffirmed',noteSub:'Watch: MSFT follow-on CAPEX raise · datacenter expansion schedule',footer:'MSFT · Demand exceeds',brand:BE}},

// 4. JPY intervention warning
{file:'macro-jpy-intervention-warning',symbol:'JPY',
 ko:{title:'매크로 — 미 재무부, JPY 시장 개입 가능성 · 은행에 유동성 대비 통지',heroIcon:'💴',heroBig:'JPY 개입 대비',heroSub:'unusual_whales: 미 재무부가 여러 은행에 금요일 일본 엔 시장 개입 가능성 통지 · 은행이 JPY 예금 관련 주말 홀딩용 여분 유동성 준비 필요',
  cards:[{icon:'💴',big:'JPY 개입',mid:'금요일 가능성',sub:'미 재무부 통지'},{icon:'🏦',big:'유동성 대비',mid:'은행에 통지',sub:'주말 홀딩용'},{icon:'⚡',big:'변동성',mid:'FX·글로벌 유동성',sub:'파급 가능'}],
  quoteLabel:'UNUSUAL_WHALES',quoteKo:'"미 재무부가 은행에 금요일 JPY 시장 개입 가능성 통지 · 유동성 대비"',quoteEn:'"US Treasury informed banks it may intervene in Japanese yen market Friday · liquidity prep for weekend JPY deposits"',
  source:'출처: unusual_whales · 2026.07.31',
  noteHead:'왜 중요한가: 어제 KOSPI -8.17%에 이은 아시아 통화·시장 리스크 · 글로벌 FX 파급',noteSub:'앞으로 볼 것: 실 개입 여부·USD/JPY 반응·아시아 시장 심리',footer:'MACRO · JPY 개입 대비',brand:BK},
 en:{title:'MACRO — US Treasury Signals Possible JPY Intervention · Banks Told to Prep Liquidity',heroIcon:'💴',heroBig:'JPY INTERVENTION',heroSub:'unusual_whales: US Treasury informed several banks it may intervene in Japanese yen market on Friday · banks need extra liquidity for JPY deposit weekend holdings',
  cards:[{icon:'💴',big:'JPY intervention',mid:'Friday possible',sub:'US Treasury notice'},{icon:'🏦',big:'Liquidity prep',mid:'Banks notified',sub:'weekend holdings'},{icon:'⚡',big:'Volatility',mid:'FX · global liquidity',sub:'contagion possible'}],
  quoteLabel:'UNUSUAL_WHALES',quoteKo:'"미 재무부 JPY 개입 통지·은행 유동성 대비"',quoteEn:'"US Treasury informed banks it may intervene in Japanese yen market Friday · liquidity prep for weekend JPY deposits"',
  source:'Source: unusual_whales · 2026.07.31',
  noteHead:'Why: Asian currency/market risk after yesterday\'s KOSPI -8.17% · global FX contagion',noteSub:'Watch: actual intervention · USD/JPY reaction · Asian market sentiment',footer:'MACRO · JPY intervention prep',brand:BE}},

// 5. Tesla LFP Megapack Made in America
{file:'tsla-lfp-megapack-made-in-america',symbol:'TSLA',
 ko:{title:'TSLA — Made-in-America LFP 셀 첫 Megapack 출하 · Sparks Nevada 자체 생산',heroIcon:'🔋',heroBig:'FIRST US LFP',heroSub:'Tesla Megapacks 공식: 미국 자체 생산 LFP 셀을 통합한 첫 Megapack이 고객에 출하 · Sparks Nevada 공장에서 제조·통합',
  cards:[{icon:'🔋',big:'미국 LFP',mid:'셀 자체 생산',sub:'Sparks Nevada'},{icon:'🚚',big:'첫 출하',mid:'고객 배송 시작',sub:'상용 배치'},{icon:'🇺🇸',big:'국산화',mid:'중국 의존 축소',sub:'세금 크레딧 자격'}],
  quoteLabel:'TESLA MEGAPACKS',quoteKo:'"Made-in-America LFP 셀을 통합한 첫 Megapack이 고객에 출하"',quoteEn:'"Our First Megapacks with Made-in-America LFP cells are on their way to customers"',
  source:'출처: Tesla Megapacks · 2026.07.31',
  noteHead:'왜 중요한가: 배터리 국산화·중국 의존 축소·미 세금 크레딧 자격 확보',noteSub:'앞으로 볼 것: 미국 LFP 생산 캐파 확대·다음 Megapack 배치·비용 구조',footer:'TSLA · US LFP Megapack',brand:BK},
 en:{title:'TSLA — First Megapacks With Made-in-America LFP Cells Shipping · Sparks Nevada Production',heroIcon:'🔋',heroBig:'FIRST US LFP',heroSub:'Tesla Megapacks official: first Megapacks integrating US-domestically-produced LFP cells shipping to customers · manufactured and integrated at Sparks, Nevada facility',
  cards:[{icon:'🔋',big:'US LFP',mid:'Cells own-produced',sub:'Sparks Nevada'},{icon:'🚚',big:'First shipment',mid:'Customer delivery starts',sub:'commercial deployment'},{icon:'🇺🇸',big:'Domestication',mid:'China dependency down',sub:'tax credit eligible'}],
  quoteLabel:'TESLA MEGAPACKS',quoteKo:'"미국 LFP 셀 통합 첫 Megapack 출하"',quoteEn:'"Our First Megapacks with Made-in-America LFP cells are on their way to customers"',
  source:'Source: Tesla Megapacks · 2026.07.31',
  noteHead:'Why: Battery domestication · reduced China dependency · US tax-credit eligibility',noteSub:'Watch: US LFP production capacity expansion · next Megapack shipments · cost structure',footer:'TSLA · US LFP Megapack',brand:BE}},

// 6. SPCX record low close · -50% ATH
{file:'spcx-record-low-14102-atl',symbol:'SPCX',
 ko:{title:'SPCX — 사상 최저 종가 · 6월 ATH $141.02 대비 -50% · 이번 달 -34%',heroIcon:'📉',heroBig:'ATL CLOSE',heroSub:'Barchart: SPCX가 사상 최저 종가 · 6월 ATH $141.02 대비 -50% 하락 · 이번 달 -34%이지만 8월 4일 실적 앞두고 매도세 완화 조짐',
  cards:[{icon:'📉',big:'-50 %',mid:'ATH $141.02 대비',sub:'사상 최저 종가'},{icon:'📅',big:'-34 %',mid:'이번 달 (7월)',sub:'대폭 낙폭'},{icon:'🗓️',big:'8/4',mid:'실적 발표 임박',sub:'매도세 완화 조짐'}],
  quoteLabel:'BARCHART · BARCHART X',quoteKo:'"SPCX 사상 최저 종가·6월 ATH -50% · 8/4 실적 앞두고 매도 완화"',quoteEn:'"SPCX at lowest close in history · down 50% from June ATH $141.02 · selling appears to slow ahead of Aug 4 earnings"',
  source:'출처: Barchart · Barchart X · 2026.07.31',
  noteHead:'왜 중요한가: 다층 강세 견해와 정부 계약에도 시세 극단 divergence 지속',noteSub:'앞으로 볼 것: 8/4 첫 실적 발표·매도 완화 지속·기관 flow 반전',footer:'SPCX · ATL · -50% ATH',brand:BK},
 en:{title:'SPCX — Record-Low Close · Down 50% From June ATH $141.02 · Down 34% This Month',heroIcon:'📉',heroBig:'ATL CLOSE',heroSub:'Barchart: SPCX at lowest close in history · down 50% from June ATH $141.02 · down 34% this month · but selling appears to slow ahead of Aug 4 earnings',
  cards:[{icon:'📉',big:'-50 %',mid:'From ATH $141.02',sub:'lowest close ever'},{icon:'📅',big:'-34 %',mid:'This month (July)',sub:'large drawdown'},{icon:'🗓️',big:'Aug 4',mid:'Earnings imminent',sub:'selling slows'}],
  quoteLabel:'BARCHART · BARCHART X',quoteKo:'"SPCX 사상 최저·-50% ATH·매도 완화"',quoteEn:'"SPCX at lowest close in history · down 50% from June ATH $141.02 · selling appears to slow ahead of Aug 4 earnings"',
  source:'Source: Barchart · Barchart X · 2026.07.31',
  noteHead:'Why: Extreme price-vs-fundamentals divergence despite multi-layer bull views and government contracts',noteSub:'Watch: Aug 4 first earnings · selling slowdown continuity · institutional flow reversal',footer:'SPCX · ATL · -50% ATH',brand:BE}},

// 7. Musk fake news denial (Tesla China → SPCX merger)
{file:'musk-fake-news-tesla-china-spcx',symbol:'TSLA',
 ko:{title:'Musk — Tesla 중국 사업 매각·SPCX 합병 fake news 명시적 부인 (WSJ)',heroIcon:'❌',heroBig:'FAKE NEWS',heroSub:'Sawyer Merritt: Musk가 WSJ의 Tesla가 중국 사업을 매각하고 SPCX와 합병 준비한다는 보도에 대해 "이 얘기는 어떤 논의에서도 나온 적 없다·완전히 fake news"라고 부인',
  cards:[{icon:'❌',big:'Fake news',mid:'명시적 부인',sub:'Musk 직접'},{icon:'📰',big:'WSJ 보도',mid:'Tesla China 매각',sub:'SPCX 합병 위한'},{icon:'🚫',big:'논의 없음',mid:'"어떤 논의에서도"',sub:'CEO 확인'}],
  quoteLabel:'ELON MUSK · SAWYER MERRITT',quoteKo:'"이 얘기는 어떤 논의에서도 나온 적 없다 · 완전히 fake news"',quoteEn:'"This has never even come up in a discussion ever · absolutely fake news"',
  source:'출처: Sawyer Merritt · Elon Musk · 2026.07.31',
  noteHead:'왜 중요한가: TSLA·SPCX 합병 시나리오 · Kalshi 74% 확률 프레임의 근거 재검토',noteSub:'앞으로 볼 것: 실제 중국 사업 방향·Kalshi 확률 변동·후속 보도',footer:'TSLA/SPCX · Musk 부인',brand:BK},
 en:{title:'Musk — Explicitly Denies Tesla China Sale + SPCX Merger as "Fake News" (WSJ)',heroIcon:'❌',heroBig:'FAKE NEWS',heroSub:'Sawyer Merritt: Musk denies WSJ report saying Tesla considering sale of its China business to pave way for SPCX merger · "This has never even come up in a discussion ever · absolutely fake news"',
  cards:[{icon:'❌',big:'Fake news',mid:'Explicit denial',sub:'Musk direct'},{icon:'📰',big:'WSJ report',mid:'Tesla China sale',sub:'for SPCX merger'},{icon:'🚫',big:'No discussion',mid:'"Never even come up"',sub:'CEO confirms'}],
  quoteLabel:'ELON MUSK · SAWYER MERRITT',quoteKo:'"어떤 논의에서도 나온 적 없다·완전 fake news"',quoteEn:'"This has never even come up in a discussion ever · absolutely fake news"',
  source:'Source: Sawyer Merritt · Elon Musk · 2026.07.31',
  noteHead:'Why: Basis re-examination for TSLA·SPCX merger scenario and Kalshi 74% probability frame',noteSub:'Watch: actual China business direction · Kalshi odds shift · follow-on reports',footer:'TSLA/SPCX · Musk denies',brand:BE}},

// 8. Musk 99.99% compute in space
{file:'musk-9999pct-compute-space',symbol:'SPCX',
 ko:{title:'Musk — "장기적으로 99.99% 컴퓨트가 우주로 이동 · SpaceX는 money printer"',heroIcon:'🌌',heroBig:'99.99 %',heroSub:'Elon Musk 발언 (Nic Cruz Patane 인용): 장기적으로 99.99%의 컴퓨트가 우주로 이동 · SpaceX가 money printer가 될 것 · 다른 방식으로는 볼 수 없다',
  cards:[{icon:'🌌',big:'99.99 %',mid:'컴퓨트 우주 이동',sub:'장기 예상'},{icon:'💵',big:'Money printer',mid:'SpaceX 프레임',sub:'다른 방식 없음'},{icon:'☀️',big:'우주 태양광',mid:'무한 태양광',sub:'열 배출 무한'}],
  quoteLabel:'ELON MUSK · NIC CRUZ PATANE',quoteKo:'"장기적으로 99.99%의 컴퓨트가 우주로 이동 · SpaceX가 money printer가 될 것"',quoteEn:'"Long-term, 99.99% of compute will be in space · SpaceX will be a money printer"',
  source:'출처: Nic Cruz Patane · Elon Musk · 2026.07.31',
  noteHead:'왜 중요한가: SPCX의 궤도 데이터센터 프레임 명시적 · 캐시 우드 강세 견해 재확인',noteSub:'앞으로 볼 것: 궤도 DC 구체 계획·실 상용 시점·NVDA·MSFT 등 하이퍼 반응',footer:'SPCX · Musk 99.99% 우주',brand:BK},
 en:{title:'Musk — "Long-Term, 99.99% of Compute Will Be in Space · SpaceX Will Be a Money Printer"',heroIcon:'🌌',heroBig:'99.99 %',heroSub:'Elon Musk statement (per Nic Cruz Patane): long-term, 99.99% of compute will be in space · SpaceX will be a money printer · can\'t see it any other way',
  cards:[{icon:'🌌',big:'99.99 %',mid:'Compute to space',sub:'long-term'},{icon:'💵',big:'Money printer',mid:'SpaceX frame',sub:'no other way'},{icon:'☀️',big:'Solar in space',mid:'Infinite solar',sub:'infinite heat dissipation'}],
  quoteLabel:'ELON MUSK · NIC CRUZ PATANE',quoteKo:'"99.99% 컴퓨트가 우주로·SPCX money printer"',quoteEn:'"Long-term, 99.99% of compute will be in space · SpaceX will be a money printer"',
  source:'Source: Nic Cruz Patane · Elon Musk · 2026.07.31',
  noteHead:'Why: Makes SPCX orbital datacenter frame explicit · reaffirms Cathie Wood bull view',noteSub:'Watch: orbital DC specific plans · real commercial timing · reaction from NVDA/MSFT/hyperscalers',footer:'SPCX · Musk 99.99% space',brand:BE}},

// 9. SPCX Colossus turbines removal + 1.2 GW BlackRock plant
{file:'spcx-colossus-89-turbines-12gw',symbol:'SPCX',
 ko:{title:'SPCX Colossus — 89 임시 터빈 제거·2027까지·BlackRock ArcLight 1.2 GW 발전소로 전환',heroIcon:'⚡',heroBig:'1.2 GW',heroSub:'Muskonomy: SpaceX가 Mississippi Southaven Colossus 시설에서 89개 임시 이동식 터빈을 2027까지 모두 제거 · 인근 BlackRock ArcLight 신규 1.2 GW 발전소로 영구 전력 전환',
  cards:[{icon:'⚡',big:'89 터빈',mid:'제거 대상',sub:'임시 이동식'},{icon:'📅',big:'2027 까지',mid:'제거 완료 시점',sub:'환경 규제 준수'},{icon:'🏗️',big:'1.2 GW',mid:'BlackRock ArcLight',sub:'신규 영구 발전소'}],
  quoteLabel:'MUSKONOMY',quoteKo:'"SpaceX가 Colossus의 89개 임시 터빈을 2027까지 제거·BlackRock ArcLight 1.2 GW로 전환"',quoteEn:'"SpaceX to remove 89 temporary turbines at Colossus by 2027 · switch to new 1.2 GW BlackRock ArcLight plant"',
  source:'출처: Muskonomy · 2026.07.31',
  noteHead:'왜 중요한가: xAI Colossus 전력 · 환경 규제·BlackRock 자본 참여의 결합',noteSub:'앞으로 볼 것: Colossus 완공 후 실 컴퓨트 캐파·다른 지역 유사 딜',footer:'SPCX Colossus · 1.2 GW',brand:BK},
 en:{title:'SPCX Colossus — Removing 89 Temporary Turbines by 2027 · Switching to 1.2 GW BlackRock ArcLight Plant',heroIcon:'⚡',heroBig:'1.2 GW',heroSub:'Muskonomy: SpaceX to remove all 89 temporary mobile turbines from Mississippi Southaven Colossus facility by 2027 · permanent power from new 1.2 GW BlackRock ArcLight plant nearby',
  cards:[{icon:'⚡',big:'89 turbines',mid:'Removal target',sub:'temporary mobile'},{icon:'📅',big:'By 2027',mid:'Removal completion',sub:'env regulation compliance'},{icon:'🏗️',big:'1.2 GW',mid:'BlackRock ArcLight',sub:'new permanent plant'}],
  quoteLabel:'MUSKONOMY',quoteKo:'"SPCX Colossus 89 터빈 제거 · BlackRock 1.2 GW 전환"',quoteEn:'"SpaceX to remove 89 temporary turbines at Colossus by 2027 · switch to new 1.2 GW BlackRock ArcLight plant"',
  source:'Source: Muskonomy · 2026.07.31',
  noteHead:'Why: xAI Colossus power · environmental regulation · BlackRock capital participation combined',noteSub:'Watch: post-completion actual compute capacity · similar deals in other regions',footer:'SPCX Colossus · 1.2 GW',brand:BE}},

// 10. SPCX NASA Super Heavy V3 wind tunnel test
{file:'spcx-nasa-super-heavy-v3-wind',symbol:'SPCX',
 ko:{title:'SPCX — NASA가 Super Heavy V3 부스터 풍동 테스트 · Starship HLS Artemis 미션용',heroIcon:'🔬',heroBig:'V3 WIND TEST',heroSub:'DogeDesigner: NASA가 SpaceX Super Heavy Version 3 부스터의 풍동 테스트 세부 공개 · Starship HLS Artemis 미션용 · 1.2% 스케일 모델·Mach 0.2-3.5 속도 테스트',
  cards:[{icon:'🔬',big:'풍동 테스트',mid:'NASA Ames',sub:'1.2% 스케일'},{icon:'⚡',big:'Mach 0.2-3.5',mid:'테스트 속도',sub:'광범위 커버'},{icon:'🌙',big:'Artemis HLS',mid:'미션용 준비',sub:'재진입 flight guidance'}],
  quoteLabel:'DOGEDESIGNER · NASA',quoteKo:'"NASA가 Super Heavy V3 풍동 테스트 · 1.2% 스케일 · Mach 0.2-3.5"',quoteEn:'"NASA revealed Super Heavy V3 wind-tunnel testing at NASA Ames · 1.2% scale · Mach 0.2-3.5"',
  source:'출처: DogeDesigner · NASA · 2026.07.31',
  noteHead:'왜 중요한가: NASA-SPCX 협업 심화 · Artemis 미션 SPCX 역할의 실체 진전',noteSub:'앞으로 볼 것: V3 실 발사·Artemis 착륙 시점·HLS 다음 단계',footer:'SPCX · Super Heavy V3 · Artemis',brand:BK},
 en:{title:'SPCX — NASA Wind-Tunnel Tests Super Heavy V3 Booster · For Starship HLS Artemis Missions',heroIcon:'🔬',heroBig:'V3 WIND TEST',heroSub:'DogeDesigner: NASA reveals wind-tunnel testing details of SpaceX Super Heavy Version 3 booster · for Starship HLS Artemis missions · 1.2% scale model · Mach 0.2-3.5 speeds',
  cards:[{icon:'🔬',big:'Wind tunnel',mid:'NASA Ames',sub:'1.2% scale'},{icon:'⚡',big:'Mach 0.2-3.5',mid:'Test speeds',sub:'wide coverage'},{icon:'🌙',big:'Artemis HLS',mid:'Mission preparation',sub:'re-entry flight guidance'}],
  quoteLabel:'DOGEDESIGNER · NASA',quoteKo:'"NASA가 Super Heavy V3 풍동 테스트"',quoteEn:'"NASA revealed Super Heavy V3 wind-tunnel testing at NASA Ames · 1.2% scale · Mach 0.2-3.5"',
  source:'Source: DogeDesigner · NASA · 2026.07.31',
  noteHead:'Why: NASA-SPCX partnership deepens · substantive progress on SPCX Artemis mission role',noteSub:'Watch: V3 actual launch · Artemis landing timing · HLS next stage',footer:'SPCX · Super Heavy V3 · Artemis',brand:BE}},

// 11. Cloud Q2 $142B · AWS 28%/Azure 22%/GCP 15%
{file:'macro-cloud-q2-142b-share',symbol:'MACRO',
 ko:{title:'매크로 — 클라우드 인프라 Q2 매출 $142B (+43% YoY) · AWS 28%·Azure 22%·GCP 15%',heroIcon:'☁️',heroBig:'$142 B',heroSub:'The Future Investors: 클라우드 인프라 매출이 Q2 2026에 $142B로 전년 대비 +43% 성장 · AWS 28%·Azure 22%·Google Cloud 15%·기타 35%',
  cards:[{icon:'☁️',big:'$142 B',mid:'Q2 클라우드 매출',sub:'+43% YoY'},{icon:'🥇',big:'AWS 28 %',mid:'점유율 1위',sub:'Azure 22% · GCP 15%'},{icon:'📈',big:'+43 %',mid:'YoY 성장',sub:'AI 워크로드 견인'}],
  quoteLabel:'THE FUTURE INVESTORS',quoteKo:'"클라우드 인프라 매출이 Q2 2026에 $142B (+43% YoY) · AWS 28% Azure 22% GCP 15%"',quoteEn:'"Cloud infrastructure revenue $142B in Q2 2026 (+43% YoY) · AWS 28% · Azure 22% · Google Cloud 15%"',
  source:'출처: The Future Investors · 2026.07.31',
  noteHead:'왜 중요한가: 하이퍼스케일러 CAPEX $155B 대비 매출 규모·AI 사이클 지속',noteSub:'앞으로 볼 것: 점유율 변화·기타 35%의 세부·중국 클라우드 성장',footer:'MACRO · 클라우드 Q2 $142B',brand:BK},
 en:{title:'MACRO — Cloud Infrastructure Q2 Revenue $142B (+43% YoY) · AWS 28% · Azure 22% · GCP 15%',heroIcon:'☁️',heroBig:'$142 B',heroSub:'The Future Investors: Cloud infrastructure revenue $142B in Q2 2026 (+43% YoY) · AWS 28% · Azure 22% · Google Cloud 15% · Others 35%',
  cards:[{icon:'☁️',big:'$142 B',mid:'Q2 cloud revenue',sub:'+43% YoY'},{icon:'🥇',big:'AWS 28 %',mid:'#1 market share',sub:'Azure 22% · GCP 15%'},{icon:'📈',big:'+43 %',mid:'YoY growth',sub:'AI workloads drive'}],
  quoteLabel:'THE FUTURE INVESTORS',quoteKo:'"클라우드 Q2 $142B·AWS 28%"',quoteEn:'"Cloud infrastructure revenue $142B in Q2 2026 (+43% YoY) · AWS 28% · Azure 22% · Google Cloud 15%"',
  source:'Source: The Future Investors · 2026.07.31',
  noteHead:'Why: Revenue scale vs hyperscaler CAPEX $155B · AI cycle continuity',noteSub:'Watch: share changes · detail of Others 35% · Chinese cloud growth',footer:'MACRO · Cloud Q2 $142B',brand:BE}},

// 12. AMZN Q2 detailed print
{file:'amzn-q2-detail-1802b-eps255',symbol:'AMZN',
 ko:{title:'AMZN Q2 상세 — Rev $180.2B · EPS $2.55(컨센 $1.99) · AWS $30B(+20% YoY) · Q3 $200B+',heroIcon:'📊',heroBig:'$180.2 B',heroSub:'Investing visuals: AMZN Q2 매출 $180.2B(컨센 $178.5B) · EPS $2.55(컨센 $1.99, +28% 비트) · Op Income $23.85B(컨센 $22.60B) · AWS $30.0B(+20% YoY) · Q3 가이던스 $200B+ (컨센 $198.28B)',
  cards:[{icon:'💵',big:'$180.2 B',mid:'Q2 매출',sub:'컨센 $178.5B'},{icon:'📈',big:'$2.55',mid:'EPS (컨센 $1.99)',sub:'+28% 비트'},{icon:'☁️',big:'$30 B',mid:'AWS 매출',sub:'+20% YoY'}],
  quoteLabel:'INVESTING VISUALS',quoteKo:'"AMZN Q2 record 실적 · Q3 가이던스 $200B+ · AWS +20% YoY"',quoteEn:'"AMZN Q2 record print · Q3 guide $200B+ · AWS +20% YoY"',
  source:'출처: Investing visuals · 2026.07.31',
  noteHead:'왜 중요한가: 어제 순이익 3배·CAPEX $220B 상향과 결합 · 하이퍼스케일러 강세 재확인',noteSub:'앞으로 볼 것: Q3 매출 실현·AWS 20% 성장률 지속·CAPEX vs 매출 밸런스',footer:'AMZN Q2 · $180.2B · AWS +20%',brand:BK},
 en:{title:'AMZN Q2 Detail — Rev $180.2B · EPS $2.55 (est $1.99) · AWS $30B (+20% YoY) · Q3 $200B+',heroIcon:'📊',heroBig:'$180.2 B',heroSub:'Investing visuals: AMZN Q2 Rev $180.2B (est $178.5B) · EPS $2.55 (est $1.99, +28% beat) · Op Income $23.85B (est $22.60B) · AWS $30.0B (+20% YoY) · Q3 guide $200B+ (est $198.28B)',
  cards:[{icon:'💵',big:'$180.2 B',mid:'Q2 revenue',sub:'est $178.5B'},{icon:'📈',big:'$2.55',mid:'EPS (est $1.99)',sub:'+28% beat'},{icon:'☁️',big:'$30 B',mid:'AWS revenue',sub:'+20% YoY'}],
  quoteLabel:'INVESTING VISUALS',quoteKo:'"AMZN Q2 record·Q3 $200B+·AWS +20%"',quoteEn:'"AMZN Q2 record print · Q3 guide $200B+ · AWS +20% YoY"',
  source:'Source: Investing visuals · 2026.07.31',
  noteHead:'Why: Combines with yesterday\'s 3× net income and CAPEX $220B raise · hyperscaler bull reaffirmed',noteSub:'Watch: Q3 revenue realization · AWS 20% growth continuity · CAPEX vs revenue balance',footer:'AMZN Q2 · $180.2B · AWS +20%',brand:BE}},

// 13. Hyperscaler Q2 CAPEX combined $155B (3× vs 2024)
{file:'macro-hyper-capex-q2-155b',symbol:'MACRO',
 ko:{title:'매크로 — 하이퍼스케일러 Q2 CAPEX 합계 $155B · 2024 $52.5B의 3배',heroIcon:'🏗️',heroBig:'$155 B',heroSub:'Evan D: 하이퍼스케일러 4사(AMZN·META·GOOGL·MSFT)가 Q2에 CAPEX 합계 $155B 지출 · 2024 동분기 $52.5B의 3배 · Amazon $34.2B·Meta $43.4B·Google $34.0B·Microsoft $43.4B',
  cards:[{icon:'💰',big:'$155 B',mid:'Q2 CAPEX 합계',sub:'AMZN+META+GOOGL+MSFT'},{icon:'📈',big:'3 ×',mid:'2024 대비',sub:'$52.5B → $155B'},{icon:'📊',big:'META·MSFT 43 B',mid:'회사별 최상위',sub:'AMZN·GOOGL 34B'}],
  quoteLabel:'EVAN D',quoteKo:'"하이퍼스케일러 4사가 Q2에 CAPEX $155B 지출 · 2024 대비 3배"',quoteEn:'"Hyperscalers combined to spend $155B on CAPEX this quarter, up from $52.5B same quarter 2024"',
  source:'출처: Evan D · 2026.07.31',
  noteHead:'왜 중요한가: AI 인프라 CAPEX 사이클 사상 최대 규모·NVDA 매출 성장 계속 시사',noteSub:'앞으로 볼 것: 2027 CAPEX 추가 상향·FCF vs CAPEX 밸런스·수요 초과 지속',footer:'MACRO · 하이퍼 CAPEX $155B',brand:BK},
 en:{title:'MACRO — Hyperscalers Q2 CAPEX Combined $155B · 3× the $52.5B of Same Quarter 2024',heroIcon:'🏗️',heroBig:'$155 B',heroSub:'Evan D: 4 hyperscalers (AMZN·META·GOOGL·MSFT) spent combined $155B CAPEX in Q2 · 3× the $52.5B in same quarter 2024 · Amazon $34.2B · Meta $43.4B · Google $34.0B · Microsoft $43.4B',
  cards:[{icon:'💰',big:'$155 B',mid:'Q2 CAPEX combined',sub:'AMZN+META+GOOGL+MSFT'},{icon:'📈',big:'3 ×',mid:'vs 2024',sub:'$52.5B → $155B'},{icon:'📊',big:'META·MSFT 43 B',mid:'Top per company',sub:'AMZN·GOOGL 34B'}],
  quoteLabel:'EVAN D',quoteKo:'"하이퍼 CAPEX $155B · 3배"',quoteEn:'"Hyperscalers combined to spend $155B on CAPEX this quarter, up from $52.5B same quarter 2024"',
  source:'Source: Evan D · 2026.07.31',
  noteHead:'Why: AI-infra CAPEX cycle at historic scale · signals continued NVDA revenue growth',noteSub:'Watch: 2027 CAPEX further raise · FCF vs CAPEX balance · demand-exceeding continuity',footer:'MACRO · Hyper CAPEX $155B',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260801.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260801-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
