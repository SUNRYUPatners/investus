// 2026-08-14 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.14';

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
// 1. Musk 48.4% SPCX 지분 SEC 공식
{file:'musk-484pct-spcx-64b-shares-sec-official',symbol:'SPCX',
 ko:{title:'SPCX — SEC 공식 확인 "Musk가 스페이스X 지분 48.4%·64억 1,854만 주 소유·개인 지분 사상 최대급 공개"',heroIcon:'👑',heroBig:'48.4%',heroSub:'SEC 공식 서류에 따르면 엘론 머스크가 SPCX 주식 64억 1,854만 7,315주를 소유하고 있으며 이는 SPCX 총 발행 주식의 48.4%에 해당합니다. 개인이 상장 대형 회사의 절반에 가까운 지분을 보유하는 것은 극단적으로 이례적입니다.',
  cards:[{icon:'👑',big:'48.4%',mid:'Musk SPCX 지분율',sub:'SEC 공식 확인'},{icon:'📈',big:'64억 주',mid:'개인 보유 주식 수',sub:'6,418,547,315주'},{icon:'💰',big:'약 1조 달러',mid:'개인 지분 가치',sub:'SPCX 시가 기준'}],
  quoteLabel:'SEC · ELON MUSK',quoteKo:'"엘론 머스크가 SPCX 주식 6,418,547,315주를 소유하고 있으며, 이는 SPCX 총 발행 주식의 48.4%에 해당한다고 SEC가 공식 확인했습니다."',quoteEn:'SEC confirming Elon Musk owns 6,418,547,315 shares of SpaceX SPCX stock representing 48.4% of the company',
  source:'출처: SEC · Elon Musk · 2026.08.13',
  noteHead:'이 소식은 왜 중요한가',noteSub:'개인이 상장 대형 회사의 절반 가까이 소유하는 것은 극단적으로 이례적입니다. Musk 개인 결정이 SPCX 방향을 사실상 결정하며, 어제 별개 리포트의 All-Hands 15 GW·AI 99% 프레임이 개인 지분 가치를 극대화합니다. 6월 2027 락업 unlock 시 매도 여부가 시세 최대 변수입니다.',footer:'SPCX · Musk 48.4% · 64억 주',brand:BK},
 en:{title:'SPCX — SEC Confirms "Musk Owns 48.4% of SpaceX · 6.42 Billion Shares · Personal Stake Historic Level"',heroIcon:'👑',heroBig:'48.4%',heroSub:'Per SEC filing: Elon Musk owns 6,418,547,315 shares of SPCX representing 48.4% of total company shares outstanding. Individual holding nearly half of a listed large company is extremely rare.',
  cards:[{icon:'👑',big:'48.4%',mid:'Musk SPCX stake',sub:'SEC official confirm'},{icon:'📈',big:'6.42 B',mid:'Personal shares owned',sub:'6,418,547,315'},{icon:'💰',big:'~$1 T',mid:'Personal stake value',sub:'SPCX market cap basis'}],
  quoteLabel:'SEC · ELON MUSK',quoteKo:'"Musk 48.4% SPCX 지분"',quoteEn:'SEC confirming Elon Musk owns 6,418,547,315 shares of SpaceX SPCX stock representing 48.4% of the company',
  source:'Source: SEC · Elon Musk · 2026.08.13',
  noteHead:'Why this matters',noteSub:'Individual owning nearly half of a listed large company is extremely rare. Musk personal decision effectively determines SPCX direction. Yesterday All-Hands 15 GW / AI 99% frames maximize personal stake value. June 2027 lockup unlock sale decision is largest price variable.',footer:'SPCX · Musk 48.4% · 6.42B shares',brand:BE}},

// 2. Dan Ives 2027 2조 시총
{file:'dan-ives-spcx-2t-mcap-2027-target',symbol:'SPCX',
 ko:{title:'SPCX — Dan Ives "SPCX가 2027년까지 2조 달러 시가총액 도달 놀랍지 않을 것" 초강세 전망',heroIcon:'🎯',heroBig:'2조 달러',heroSub:'Wedbush의 유명 애널리스트 Dan Ives가 SPCX가 2027년까지 시가총액 2조 달러 수준에 도달할 수 있다고 전망했습니다. 현재 시가총액 대비 큰 폭 상승을 의미하며, 어제 별개 리포트의 Musk All-Hands 15 GW·AI 99% 프레임을 뒷받침하는 sell-side 전망입니다.',
  cards:[{icon:'🎯',big:'2조 달러',mid:'2027년 시가총액 전망',sub:'Dan Ives'},{icon:'📅',big:'2027년',mid:'목표 시점',sub:'약 2년 반 남음'},{icon:'📈',big:'대폭 상승',mid:'현재 대비',sub:'sell-side 초강세'}],
  quoteLabel:'DAN IVES · WEDBUSH',quoteKo:'"SPCX가 2027년까지 시가총액 2조 달러 수준에 도달해도 놀라지 마세요."',quoteEn:'Do not be surprised if SpaceX SPCX able to achieve $2T market cap by 2027',
  source:'출처: Dan Ives · Wedbush · 2026.08.13',
  noteHead:'이 소식은 왜 중요한가',noteSub:'어제 별개 리포트의 MS 600달러 불 케이스에 이어 Dan Ives 2조 달러 시총 전망까지·sell-side 강세 다층 축적됩니다. 오늘 별개 리포트의 Musk 48.4% 지분·All-Hands 15 GW·AI 99% 프레임과 정합해서 SPCX 밸류에이션 재평가 흐름이 명확해집니다.',footer:'SPCX · 2조 달러 시총 2027',brand:BK},
 en:{title:'SPCX — Dan Ives "Not Surprised if SPCX Reaches $2T Market Cap by 2027" Ultra-Bullish Forecast',heroIcon:'🎯',heroBig:'$2 T',heroSub:'Wedbush famed analyst Dan Ives forecasts SPCX could reach $2T market cap level by 2027. Meaningful upside vs current market cap · sell-side forecast supporting yesterday Musk All-Hands 15 GW / AI 99% frames.',
  cards:[{icon:'🎯',big:'$2 T',mid:'2027 mcap forecast',sub:'Dan Ives'},{icon:'📅',big:'2027',mid:'Target timeline',sub:'~2.5 years'},{icon:'📈',big:'Big upside',mid:'vs current',sub:'Sell-side super bullish'}],
  quoteLabel:'DAN IVES · WEDBUSH',quoteKo:'"SPCX 2조 달러 2027 시총"',quoteEn:'Do not be surprised if SpaceX SPCX able to achieve $2T market cap by 2027',
  source:'Source: Dan Ives · Wedbush · 2026.08.13',
  noteHead:'Why this matters',noteSub:'Following yesterday MS $600 bull case, Dan Ives $2T mcap forecast · sell-side bull thesis multi-layer accumulates. Aligns with today Musk 48.4% stake / All-Hands 15 GW / AI 99% frames · SPCX valuation re-rating flow clear.',footer:'SPCX · $2T mcap 2027',brand:BE}},

// 3. Ron Baron $23B 지분 · Starlink 14조 밸류
{file:'ron-baron-23b-spcx-starlink-14t-valuation',symbol:'SPCX',
 ko:{title:'SPCX — Ron Baron SPCX 지분 230억 달러 규모·Starlink 단독만 14조 달러 밸류 예상 프레임',heroIcon:'💎',heroBig:'230억 달러',heroSub:'Cosmos Europa 정리에 따르면 Baron Capital의 창립자 Ron Baron이 SPCX 개인 지분을 약 230억 달러 규모까지 확대했습니다. 2017년부터 SPCX에 투자를 시작해 지속 확대한 결과이며, Starlink 단독으로만 미래 14조 달러 밸류에 도달할 수 있다고 전망합니다.',
  cards:[{icon:'💎',big:'230억 달러',mid:'Ron Baron SPCX 지분',sub:'개인 규모'},{icon:'🛰️',big:'14조 달러',mid:'Starlink 단독 밸류 예상',sub:'Ron Baron 프레임'},{icon:'📅',big:'2017년',mid:'SPCX 첫 투자 시점',sub:'9년 지속 확대'}],
  quoteLabel:'COSMOS EUROPA · RON BARON',quoteKo:'"Ron Baron의 SPCX 지분이 230억 달러 규모까지 확대·Starlink 단독으로 14조 달러 밸류 예상·Baron Capital이 2017년부터 지속 투자·Starlink가 진짜 세계 통신 사업자가 되면 규모는 상상하기 어려울 정도"',quoteEn:'Ron Baron owns roughly $23B SpaceX stake · Baron Capital investor since 2017 · if Starlink becomes truly global connectivity player, scale of opportunity difficult to comprehend · $14T Starlink alone valuation frame',
  source:'출처: Cosmos Europa · Ron Baron · 2026.08.13',
  noteHead:'이 소식은 왜 중요한가',noteSub:'어제 별개 리포트의 Google 105배 return·오늘 별개 리포트의 Musk 48.4% 지분·Dan Ives 2조 달러 시총 프레임과 결합해 대형 매니저 강세가 다층 확인됩니다. Ron Baron의 Starlink 14조 달러 밸류 프레임은 Musk 15 GW·AI 99% 프레임을 매우 초과합니다.',footer:'SPCX · Ron Baron 230억',brand:BK},
 en:{title:'SPCX — Ron Baron $23B SpaceX Stake · Starlink Alone $14T Valuation Frame',heroIcon:'💎',heroBig:'$23 B',heroSub:'Per Cosmos Europa: Baron Capital founder Ron Baron built personal SPCX stake to ~$23B. Investing since 2017. Forecasts Starlink alone could reach $14T valuation.',
  cards:[{icon:'💎',big:'$23 B',mid:'Ron Baron SPCX stake',sub:'Personal scale'},{icon:'🛰️',big:'$14 T',mid:'Starlink alone valuation',sub:'Ron Baron frame'},{icon:'📅',big:'2017',mid:'First SPCX investment',sub:'9-year sustained'}],
  quoteLabel:'COSMOS EUROPA · RON BARON',quoteKo:'"Ron Baron 230억·Starlink 14조"',quoteEn:'Ron Baron owns roughly $23B SpaceX stake · Baron Capital investor since 2017 · if Starlink becomes truly global connectivity player, scale of opportunity difficult to comprehend',
  source:'Source: Cosmos Europa · Ron Baron · 2026.08.13',
  noteHead:'Why this matters',noteSub:'With yesterday Google 105x return and today Musk 48.4% stake / Dan Ives $2T mcap frames, large-manager bull thesis multi-layer confirmed. Ron Baron $14T Starlink-alone frame vastly exceeds Musk 15 GW / AI 99% frames.',footer:'SPCX · Ron Baron $23B',brand:BE}},

// 4. Tesla Nevada AV Network 라이선스
{file:'tsla-nevada-av-network-license-40-robotaxis',symbol:'TSLA',
 ko:{title:'TSLA — Nevada 자율주행 차량 네트워크 회사 허가 획득·최대 40대 로보택시 상업 서비스 시작',heroIcon:'✅',heroBig:'Nevada 허가',heroSub:'Sawyer Merritt 전달에 따르면 Nevada 교통청이 Tesla에 자율주행 차량 네트워크 회사 허가를 승인했습니다. 이제 Tesla가 Nevada 도로에서 최대 40대까지 완전 자율주행 로보택시로 상업 서비스를 시작할 수 있게 됐고, 예약·픽업 시스템도 승인됐습니다.',
  cards:[{icon:'✅',big:'40대',mid:'Nevada 최대 로보택시',sub:'허가 승인'},{icon:'🚕',big:'상업 서비스',mid:'예약·픽업 시작 가능',sub:'실 매출 시점'},{icon:'👤',big:'초기 안전 담당자',mid:'후속 원격 조작',sub:'단계적 전환'}],
  quoteLabel:'SAWYER MERRITT · NEVADA 교통청',quoteKo:'"Tesla가 Nevada에서 자율주행 차량 네트워크 회사 허가를 받았습니다. 최대 40대의 자율 차량으로 Robotaxi 상업 서비스를 시작할 수 있게 됐습니다."',quoteEn:'Tesla has received its Autonomous Vehicle Network Company permit in Nevada · Nevada Transportation Authority · Tesla granted permit · max 40 vehicles · Robotaxi passenger operator · reservation and pickup',
  source:'출처: Sawyer Merritt · Nevada Transportation Authority · 2026.08.13',
  noteHead:'이 소식은 왜 중요한가',noteSub:'어제 별개 리포트의 Cybercab 43/44 스티어링 없음 대량 관측·오늘 별개 리포트의 Austin 무감독 배치 임박에 이어 Nevada 상업 허가 획득으로 실제 매출 시작이 임박합니다. MS의 로보택시 증명 요구에 대한 결정적 대응입니다.',footer:'TSLA · Nevada 40대 허가',brand:BK},
 en:{title:'TSLA — Nevada Autonomous Vehicle Network Company Permit · Up to 40 Robotaxis Commercial Service Start',heroIcon:'✅',heroBig:'Nevada Permit',heroSub:'Per Sawyer Merritt: Nevada Transportation Authority granted Tesla Autonomous Vehicle Network Company permit. Tesla can now start commercial Robotaxi service with up to 40 fully autonomous vehicles on Nevada roads, with reservation/pickup approved.',
  cards:[{icon:'✅',big:'40 units',mid:'Nevada max robotaxis',sub:'Permit approved'},{icon:'🚕',big:'Commercial',mid:'Reservation/pickup start',sub:'Real revenue timing'},{icon:'👤',big:'Initial safety driver',mid:'Then remote operator',sub:'Staged transition'}],
  quoteLabel:'SAWYER MERRITT · NEVADA',quoteKo:'"Tesla Nevada 로보택시 허가"',quoteEn:'Tesla has received its Autonomous Vehicle Network Company permit in Nevada · Nevada Transportation Authority · Tesla granted permit · max 40 vehicles · Robotaxi passenger operator',
  source:'Source: Sawyer Merritt · Nevada Transportation Authority · 2026.08.13',
  noteHead:'Why this matters',noteSub:'Following yesterday Cybercab 43/44 no-steering mass observation and today Austin unsupervised deployment near, Nevada commercial permit imminent real revenue. Decisive response to MS robotaxi prove demand.',footer:'TSLA · Nevada 40 permit',brand:BE}},

// 5. Tesla China 7월 수출 +191%
{file:'tsla-china-export-68330-july-191pct-yoy',symbol:'TSLA',
 ko:{title:'TSLA — 상하이 팹 7월 수출 6만 8,330대·전년 대비 +191% 급증·중국 EV 수요 폭발',heroIcon:'🚗',heroBig:'+191%',heroSub:'TheSonOfWakley 전달에 따르면 Tesla 상하이 팹이 7월에 6만 8,330대를 수출했으며, 이는 전년 동월 대비 +191% 급증한 규모입니다. 중국 EV 시장에서 Tesla의 지배력이 폭발적으로 확장되고 있다는 실 매출 신호입니다.',
  cards:[{icon:'🚗',big:'68,330대',mid:'7월 수출',sub:'상하이 팹'},{icon:'📈',big:'+191%',mid:'전년 동월 대비 급증',sub:'약 3배 확장'},{icon:'🇨🇳',big:'중국 지배',mid:'EV 시장 확장',sub:'실 매출 시그널'}],
  quoteLabel:'THESONOFWAKLEY · TESLA CHINA',quoteKo:'"Tesla 중국이 7월에 6만 8,330대를 수출했습니다. 전년 대비 +191% 급증한 규모입니다. 초강세!"',quoteEn:'TESLA CHINA EXPORTED 68,330 CARS IN JULY - UP MASSIVE 191% YEAR-OVER-YEAR! Super bullish!',
  source:'출처: TheSonOfWakley · Tesla China · 2026.08.13',
  noteHead:'이 소식은 왜 중요한가',noteSub:'어제 별개 리포트의 Tesla 일본 배송 60% 확대에 이어 중국 수출 +191% 급증까지·아시아 매출 다각 회복 실체화. 오늘 별개 리포트의 Nevada 로보택시 허가·Austin 무감독 배치와 결합해 자동차 판매 + Robotaxi 사업 다층 확장 확인.',footer:'TSLA China · 68,330 · +191%',brand:BK},
 en:{title:'TSLA — Shanghai Fab July Exports 68,330 Cars · +191% YoY Surge · China EV Demand Explosion',heroIcon:'🚗',heroBig:'+191%',heroSub:'Per TheSonOfWakley: Tesla Shanghai Fab exported 68,330 cars in July, +191% YoY surge. Tesla dominance in China EV market explosive expansion · real revenue signal.',
  cards:[{icon:'🚗',big:'68,330',mid:'July exports',sub:'Shanghai Fab'},{icon:'📈',big:'+191%',mid:'YoY surge',sub:'~3x expansion'},{icon:'🇨🇳',big:'China dom.',mid:'EV market expansion',sub:'Real revenue signal'}],
  quoteLabel:'THESONOFWAKLEY',quoteKo:'"Tesla 중국 7월 +191%"',quoteEn:'TESLA CHINA EXPORTED 68,330 CARS IN JULY - UP MASSIVE 191% YEAR-OVER-YEAR!',
  source:'Source: TheSonOfWakley · Tesla China · 2026.08.13',
  noteHead:'Why this matters',noteSub:'Following yesterday Tesla Japan +60% delivery expansion, China exports +191% surge · Asia revenue multi-axis recovery materialized. With today Nevada robotaxi permit / Austin unsupervised deployment, car sales + Robotaxi business multi-layer expansion confirmed.',footer:'TSLA China · 68,330 · +191%',brand:BE}},

// 6. Cybercab Austin 무감독 상업 배치 임박
{file:'tsla-cybercab-austin-unsupervised-first-responder',symbol:'TSLA',
 ko:{title:'TSLA — Austin에서 무감독 Cybercab 상업 배치 임박·First Responder QR 스티커 부착 확인',heroIcon:'🚕',heroBig:'Austin 임박',heroSub:'Robotaxi Rider 관측에 따르면 Austin 소방서가 무감독(unsupervised) Cybercab이 곧 도시를 다닐 것이라고 확인했습니다. 26대에 Cybercab 로고가 부착됐고, 스티어링 휠 없는 모든 차량에 First Responder QR 스티커가 붙어 있으며, 이는 규제 승인 완료의 확실한 신호입니다.',
  cards:[{icon:'🚕',big:'무감독',mid:'Cybercab Austin 배치',sub:'상업 서비스 임박'},{icon:'🚨',big:'QR 스티커',mid:'First Responder 승인',sub:'규제 완료 신호'},{icon:'📸',big:'26대',mid:'Cybercab 로고 부착',sub:'실 상용 준비'}],
  quoteLabel:'ROBOTAXI RIDER · AUSTIN FIRE DEPT',quoteKo:'"무감독 Cybercab이 곧 Austin에서 다닐 예정입니다. Austin 소방서 사진이 스티어링 휠 없는 모든 차량에 First Responder QR 스티커가 붙었다고 확인해 줍니다."',quoteEn:'Unsupervised Cybercabs are about to start roaming Austin real soon · This photo from Austin fire department confirms sticker on the bottom side of the windshield is the first responders QR code sticker',
  source:'출처: Robotaxi Rider · Austin Fire Dept · 2026.08.13',
  noteHead:'이 소식은 왜 중요한가',noteSub:'어제 별개 리포트의 Cybercab 44대 중 43대 스티어링 없음 대량 관측에 이어 오늘 Austin 소방서 QR 스티커 확인은 규제 승인 완료 명확 신호입니다. 오늘 별개 리포트의 Nevada 40대 허가와 결합해 Tesla Robotaxi 실 상용 서비스가 8월 안에 시작될 가능성.',footer:'TSLA · Austin 무감독 임박',brand:BK},
 en:{title:'TSLA — Austin Unsupervised Cybercab Commercial Deployment Imminent · First Responder QR Sticker Confirmed',heroIcon:'🚕',heroBig:'Austin Near',heroSub:'Per Robotaxi Rider: Austin fire department confirms unsupervised Cybercabs about to roam city. 26 have Cybercab decals, all without steering wheel have First Responder QR sticker · clear regulatory approval signal.',
  cards:[{icon:'🚕',big:'Unsupervised',mid:'Cybercab Austin deploy',sub:'Commercial imminent'},{icon:'🚨',big:'QR sticker',mid:'First Responder approval',sub:'Regulatory complete'},{icon:'📸',big:'26 units',mid:'Cybercab decals',sub:'Real commercial prep'}],
  quoteLabel:'ROBOTAXI RIDER · AUSTIN FIRE',quoteKo:'"Cybercab Austin 무감독 임박"',quoteEn:'Unsupervised Cybercabs are about to start roaming Austin real soon · Austin fire department confirms first responders QR code sticker',
  source:'Source: Robotaxi Rider · Austin Fire Dept · 2026.08.13',
  noteHead:'Why this matters',noteSub:'Following yesterday Cybercab 43/44 no-steering mass observation, today Austin Fire QR sticker confirmation is clear regulatory approval signal. With today Nevada 40-unit permit, Tesla Robotaxi real commercial service likely starts within August.',footer:'TSLA · Austin unsupervised',brand:BE}},

// 7. Terafab 공식 착공
{file:'terafab-official-construction-16b-drone-first',symbol:'SPCX',
 ko:{title:'SPCX·TSLA — Terafab 공식 착공 시작·초기 168억 달러 투자·Joe Tegtmeyer 드론으로 첫 촬영',heroIcon:'🏗️',heroBig:'착공 시작',heroSub:'Sawyer Merritt이 공유한 바에 따르면 SPCX와 Tesla가 함께 짓는 Terafab 프로젝트가 공식 착공됐습니다. 초기 168억 달러 투자·향후 확장 시 총 투자 훨씬 확대 예정이며, Joe Tegtmeyer가 드론으로 첫 촬영에 성공해 실 진행이 확인됐습니다.',
  cards:[{icon:'🏗️',big:'착공 시작',mid:'Terafab 공식',sub:'2026-08-13'},{icon:'💰',big:'168억 달러',mid:'초기 투자 규모',sub:'SPCX + Tesla'},{icon:'🚁',big:'드론 첫 촬영',mid:'Joe Tegtmeyer',sub:'실 진행 확인'}],
  quoteLabel:'SAWYER MERRITT · JOE TEGTMEYER',quoteKo:'"Tesla와 SpaceX의 Terafab 프로젝트가 공식적으로 착공됐습니다. 초기 단계는 SPCX와 Tesla가 168억 달러를 투자할 예정이며, 향후 확장 단계에서 총 투자가 훨씬 확대됩니다. Terafab 부지 첫 드론 촬영. 사상 가장 진보한 chip 공장이 될 것입니다."',quoteEn:'Tesla and SpaceX Terafab project officially started construction · initial phase requires $16.8B capital investments from SpaceX and Tesla · future expansion phases much higher · first drone flight over Terafab site · most advanced chip factory of all time',
  source:'출처: Sawyer Merritt · Joe Tegtmeyer · 2026.08.13',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/7 Terafab 발표·8/10 규모 비교 (Pentagon 10배)·8/11 태양광 3,000 에이커에 이어 오늘 공식 착공까지 진행이 확정됐습니다. Musk 회사 그룹의 텍사스 인프라 중심 전략이 실체화되며, 어제 별개 리포트의 Musk 15 GW·AI 99% 프레임의 물리적 기반입니다.',footer:'Terafab · 168억 · 착공',brand:BK},
 en:{title:'SPCX·TSLA — Terafab Officially Starts Construction · $16.8B Initial · Joe Tegtmeyer First Drone Photos',heroIcon:'🏗️',heroBig:'START',heroSub:'Per Sawyer Merritt: SpaceX + Tesla Terafab project officially starts construction. Initial $16.8B investment, future expansion much higher. Joe Tegtmeyer first drone flight confirms real progress.',
  cards:[{icon:'🏗️',big:'START',mid:'Terafab official',sub:'2026-08-13'},{icon:'💰',big:'$16.8 B',mid:'Initial investment',sub:'SPCX + Tesla'},{icon:'🚁',big:'First drone',mid:'Joe Tegtmeyer',sub:'Real progress confirmed'}],
  quoteLabel:'SAWYER MERRITT · JOE TEGTMEYER',quoteKo:'"Terafab 공식 착공 · 168억 달러 · 드론 첫 촬영"',quoteEn:'Tesla and SpaceX Terafab project officially started construction · initial phase $16.8B · first drone flight over Terafab site · most advanced chip factory of all time',
  source:'Source: Sawyer Merritt · Joe Tegtmeyer · 2026.08.13',
  noteHead:'Why this matters',noteSub:'Following 8/7 Terafab announcement, 8/10 scale comparison (Pentagon 10x), 8/11 solar 3,000 acres, today official construction confirmed. Musk company group Texas infra strategy materialized · physical foundation for yesterday Musk 15 GW / AI 99% frames.',footer:'Terafab · $16.8B · Start',brand:BE}},

// 8. Starship 8/30 발사 + NASA Roman
{file:'starship-830-nasa-roman-telescope-9mo-early',symbol:'SPCX',
 ko:{title:'SPCX — Starship 8월 30일 발사 예정·9개월 앞당김·NASA Nancy Grace Roman 우주 망원경 통합',heroIcon:'🚀',heroBig:'8/30 발사',heroSub:'DogeDesigner 정리에 따르면 NASA가 Nancy Grace Roman 우주 망원경을 SPCX 발사 하드웨어와 통합하기 시작했습니다. Falcon Heavy 발사 목표가 8월 30일로 잡혔으며, 이는 원래 일정보다 9개월이나 앞당긴 것입니다.',
  cards:[{icon:'🚀',big:'8/30',mid:'Falcon Heavy 발사 목표',sub:'9개월 앞당김'},{icon:'🔭',big:'Nancy Grace Roman',mid:'NASA 우주 망원경',sub:'Hubble 100배 시야'},{icon:'🌌',big:'다크 매터',mid:'주요 미션 목표',sub:'수십억 은하 지도'}],
  quoteLabel:'DOGEDESIGNER · NASA',quoteKo:'"NASA가 Nancy Grace Roman 우주 망원경을 SPCX 발사 하드웨어와 통합하기 시작했습니다. Falcon Heavy 발사가 8월 30일로 예정되어 있으며, 원래 일정보다 9개월 앞당겨졌습니다. Roman은 다크 에너지·다크 매터 연구, 수십억 은하 지도 작성, 수천 개 신 행성 발견을 하며 Hubble보다 최소 100배 넓은 시야를 갖습니다."',quoteEn:'NASA has begun integrating the Nancy Grace Roman Space Telescope with SpaceX launch hardware at Kennedy Space Center · Falcon Heavy targeted for August 30, nine months ahead of schedule · Roman will study dark energy and dark matter, map billions of galaxies, discover thousands of new planets, with a field of view at least 100 times larger than Hubble',
  source:'출처: DogeDesigner · NASA · 2026.08.13',
  noteHead:'이 소식은 왜 중요한가',noteSub:'NASA가 SPCX 임무 일정을 9개월 앞당긴 것은 SPCX 발사 신뢰성이 정부 미션 수준으로 확립됐다는 뜻입니다. 오늘 별개 리포트의 Musk 48.4% 지분·Dan Ives 2조 달러 시총 프레임의 실 사업 기반이 확인됩니다.',footer:'SPCX · Starship 8/30 · NASA',brand:BK},
 en:{title:'SPCX — Starship Aug 30 Launch · 9 Months Ahead · NASA Nancy Grace Roman Space Telescope Integration',heroIcon:'🚀',heroBig:'Aug 30',heroSub:'Per DogeDesigner: NASA begins integrating Nancy Grace Roman Space Telescope with SPCX launch hardware. Falcon Heavy targeted August 30, nine months ahead of schedule.',
  cards:[{icon:'🚀',big:'Aug 30',mid:'Falcon Heavy target',sub:'9mo ahead'},{icon:'🔭',big:'Roman',mid:'NASA telescope',sub:'100x Hubble field'},{icon:'🌌',big:'Dark matter',mid:'Main mission goal',sub:'Billions galaxies map'}],
  quoteLabel:'DOGEDESIGNER · NASA',quoteKo:'"Starship 8/30 · NASA Roman"',quoteEn:'NASA has begun integrating the Nancy Grace Roman Space Telescope with SpaceX launch hardware · Falcon Heavy targeted for August 30, nine months ahead of schedule',
  source:'Source: DogeDesigner · NASA · 2026.08.13',
  noteHead:'Why this matters',noteSub:'NASA advancing SPCX mission 9 months means SPCX launch reliability established at government mission level. Real business foundation for today Musk 48.4% stake / Dan Ives $2T mcap frames.',footer:'SPCX · Starship Aug 30 · NASA',brand:BE}},

// 9. Anthropic 10월 상장 2조
{file:'anthropic-oct-ipo-2t-largest-debut-ever',symbol:'MACRO',
 ko:{title:'매크로 — Anthropic 10월 상장 목표·2조 달러 밸류·역대 최대 상장 데뷔 잠재 (FT)',heroIcon:'💰',heroBig:'2조 달러',heroSub:'unusual_whales가 파이낸셜타임스를 인용해 전한 바에 따르면 Anthropic이 10월 상장을 목표로 하고 있으며 밸류에이션 2조 달러+에 도달할 수 있어 역대 주식 시장 최대 상장 데뷔가 될 잠재를 갖습니다. 어제까지 4천억 달러 프레임이 대폭 상향된 수치입니다.',
  cards:[{icon:'💰',big:'2조 달러+',mid:'예상 상장 밸류',sub:'FT 보도'},{icon:'📅',big:'10월',mid:'상장 목표 시점',sub:'2026년'},{icon:'🏆',big:'역대 최대',mid:'상장 데뷔 잠재',sub:'주식 시장 사상'}],
  quoteLabel:'UNUSUAL_WHALES · FT',quoteKo:'"Anthropic 투자자들이 10월 상장에서 2조 달러 이상 밸류에이션으로 회사가 도달할 수 있다고 베팅하고 있으며, 이는 역대 최대 주식 시장 상장 데뷔가 될 잠재를 가집니다."',quoteEn:'Anthropic investors are betting the company could reach a $2 trillion-plus valuation in an October IPO, potentially making it the largest stock market debut ever · per FT',
  source:'출처: unusual_whales · Financial Times · 2026.08.13',
  noteHead:'이 소식은 왜 중요한가',noteSub:'어제 별개 리포트의 Anthropic 다음 달 상장 프레임·오늘 별개 리포트의 OpenAI 8,520억 달러 프레임에 이어 Anthropic 2조 달러까지·AI 상장 사이클이 극단 규모로 확장됩니다. 구글이 대규모 지분 보유라 구글 자산 재평가가 급속 진행됩니다.',footer:'Anthropic · 10월 · 2조',brand:BK},
 en:{title:'MACRO — Anthropic October IPO Target · $2T Valuation · Potentially Largest Debut Ever (FT)',heroIcon:'💰',heroBig:'$2 T+',heroSub:'Per unusual_whales citing FT: Anthropic investors betting company could reach $2T+ valuation in October IPO, potentially largest stock market debut ever. Vast upside from yesterday $400B frames.',
  cards:[{icon:'💰',big:'$2 T+',mid:'Expected IPO valuation',sub:'FT report'},{icon:'📅',big:'October',mid:'IPO target',sub:'2026'},{icon:'🏆',big:'Largest ever',mid:'IPO debut potential',sub:'Stock market history'}],
  quoteLabel:'UNUSUAL_WHALES · FT',quoteKo:'"Anthropic 10월 상장 2조"',quoteEn:'Anthropic investors are betting the company could reach a $2 trillion-plus valuation in an October IPO, potentially making it the largest stock market debut ever',
  source:'Source: unusual_whales · Financial Times · 2026.08.13',
  noteHead:'Why this matters',noteSub:'Yesterday Anthropic next-month IPO frame + today OpenAI $852B frame + Anthropic $2T · AI IPO cycle expanding to extreme scale. Google large stake means Google asset re-rating rapid.',footer:'Anthropic · Oct · $2T',brand:BE}},

// 10. Michael Burry $500B AI Enron 경고
{file:'burry-500b-ai-enron-warning-black-deal',symbol:'MACRO',
 ko:{title:'매크로 — Michael Burry "5,000억 달러 AI Enron 경고·Big Short 원조 위험 신호" (Yahoo)',heroIcon:'⚠️',heroBig:'AI Enron',heroSub:'unusual_whales가 Yahoo를 인용해 전한 바에 따르면 Big Short으로 유명한 Michael Burry가 5,000억 달러 규모의 AI 관련 "Enron" 급 사기 리스크를 경고했습니다. 오늘 별개 리포트의 Shiller CAPE 밸류에이션 경고와 결합해 시장 극단 상승기의 경계 신호입니다.',
  cards:[{icon:'⚠️',big:'5,000억 달러',mid:'AI Enron 규모 경고',sub:'Michael Burry'},{icon:'📉',big:'Enron 유사',mid:'사기 리스크 프레임',sub:'구조적 우려'},{icon:'🎯',big:'Big Short',mid:'2008 예측한 인물',sub:'신뢰도 높음'}],
  quoteLabel:'MICHAEL BURRY · YAHOO',quoteKo:'"Michael Burry가 5,000억 달러 규모의 AI 관련 Enron 급 위험을 경고했습니다."',quoteEn:'BREAKING - Michael Burry warns of a $500 billion AI black deal for Enron, per Yahoo',
  source:'출처: unusual_whales · Michael Burry · Yahoo · 2026.08.13',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Big Short으로 유명한 Michael Burry의 경고는 시장에 큰 영향력을 가집니다. 오늘 별개 리포트의 Tom Lee "2년 사상 최대 상승"·SPX 사상 최고와 정면 대립하는 관점이며, AI 사이클의 낙관 vs 경계 프레임 논쟁이 격화됩니다.',footer:'매크로 · Burry AI Enron 경고',brand:BK},
 en:{title:'MACRO — Michael Burry "$500B AI Enron Warning · Big Short Original Risk Signal" (Yahoo)',heroIcon:'⚠️',heroBig:'AI ENRON',heroSub:'Per unusual_whales citing Yahoo: Michael Burry, famed for Big Short, warns of $500B AI-related Enron-level fraud risk. With today Shiller CAPE valuation warning, extreme market rally warning signal.',
  cards:[{icon:'⚠️',big:'$500 B',mid:'AI Enron warning scale',sub:'Michael Burry'},{icon:'📉',big:'Enron-like',mid:'Fraud risk frame',sub:'Structural concern'},{icon:'🎯',big:'Big Short',mid:'2008 predictor',sub:'High credibility'}],
  quoteLabel:'MICHAEL BURRY · YAHOO',quoteKo:'"Burry $500B AI Enron"',quoteEn:'BREAKING - Michael Burry warns of a $500 billion AI black deal for Enron, per Yahoo',
  source:'Source: unusual_whales · Michael Burry · Yahoo · 2026.08.13',
  noteHead:'Why this matters',noteSub:'Big Short Michael Burry warnings carry significant market influence. Directly opposes today Tom Lee "biggest 2-year rally" / SPX all-time high · AI cycle optimism vs caution frame debate intensifies.',footer:'MACRO · Burry AI Enron',brand:BE}},

// 11. Tom Lee 2년 사상 최대 상승 예상
{file:'tom-lee-2yr-biggest-stock-gains-ever-bullish',symbol:'SPX',
 ko:{title:'SPX — Tom Lee "앞으로 2년 안에 시장 사상 최대 상승 예상·insanely bullish 경고"',heroIcon:'🚀',heroBig:'2년 최대',heroSub:'Cop이 전달한 바에 따르면 Tom Lee가 매우 강력한 시장 강세 전망을 냈습니다. 앞으로 2년 안에 미국 주식 시장이 사상 최대급 상승을 기록할 것이라고 예상하며, 자신의 표현 "insanely bullish"라고 강조했습니다.',
  cards:[{icon:'🚀',big:'2년 안',mid:'사상 최대 상승 예상',sub:'Tom Lee'},{icon:'📈',big:'insanely bullish',mid:'표현 극단 강세',sub:'그의 자체 표현'},{icon:'🎯',big:'사상 최대급',mid:'주식 시장 상승',sub:'우리 생 목격 최대'}],
  quoteLabel:'TOM LEE · COP',quoteKo:'"앞으로 2년 안에 우리는 미국 주식 시장이 우리 생에 목격한 사상 최대급 상승을 볼 것입니다. Bullish 전망 아닙니다. 사상 최대급 상승입니다. 이것은 극단 강세입니다."',quoteEn:'TOM LEE JUST DROPPED ONE OF HIS BIGGEST CALLS · OVER THE NEXT 2 YEARS, WE ARE ABOUT TO SEE SOME OF THE BIGGEST GAINS IN THE STOCK MARKET OF OUR LIFETIME · NOT A BULLISH TAKE · ONE OF THE BIGGEST WE HAVE EVER SEEN · THIS IS INSANELY BULLISH',
  source:'출처: Tom Lee · Cop · 2026.08.13',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Tom Lee는 Fundstrat 창립자로 시장 강세 관측으로 유명합니다. 오늘 별개 리포트의 SPX·러셀 2000 사상 최고·나스닥 100 3만 재확인과 결합해 극단 강세 프레임입니다. Michael Burry AI Enron 경고와 정면 대립.',footer:'SPX · Tom Lee 2년 최대',brand:BK},
 en:{title:'SPX — Tom Lee "Biggest Stock Market Gains of Our Lifetime in Next 2 Years · Insanely Bullish"',heroIcon:'🚀',heroBig:'2-YR MAX',heroSub:'Per Cop: Tom Lee released extremely strong market bull forecast. Expects US stocks to record all-time-max gains in next 2 years, own expression "insanely bullish".',
  cards:[{icon:'🚀',big:'2 years',mid:'All-time max gains expected',sub:'Tom Lee'},{icon:'📈',big:'Insanely bull',mid:'His own expression',sub:'Extreme bullish'},{icon:'🎯',big:'Biggest ever',mid:'Stock market gains',sub:'Our lifetime max'}],
  quoteLabel:'TOM LEE · COP',quoteKo:'"Tom Lee 2년 사상 최대 상승"',quoteEn:'OVER THE NEXT 2 YEARS, WE ARE ABOUT TO SEE SOME OF THE BIGGEST GAINS IN THE STOCK MARKET OF OUR LIFETIME · NOT A BULLISH TAKE · ONE OF THE BIGGEST WE HAVE EVER SEEN · THIS IS INSANELY BULLISH',
  source:'Source: Tom Lee · Cop · 2026.08.13',
  noteHead:'Why this matters',noteSub:'Tom Lee is Fundstrat founder famed for market bull observations. With today SPX/Russell 2000 all-time high / Nasdaq 100 30K reclaim, extreme bullish frame. Directly opposes Michael Burry AI Enron warning.',footer:'SPX · Tom Lee 2yr max',brand:BE}},

// 12. SPX 사상 최고 + 5일 5조 달러
{file:'sp500-russell-2000-all-time-high-5t-5days',symbol:'SPX',
 ko:{title:'SPX — S&P 500·러셀 2000 사상 최고·나스닥 100 3만 재확인·5일간 5조 달러 시장 가치 상승',heroIcon:'🎉',heroBig:'사상 최고',heroSub:'Bull Theory 정리에 따르면 S&P 500과 러셀 2000이 사상 최고를 재확인했고 나스닥 100도 오늘 +1% 상승해서 42일 만에 3만 수준을 재확인했습니다. 미국 주식이 지난 5일간 약 5조 달러 규모의 시장 가치를 추가했으며, 인플레이션 데이터 완화가 원인입니다.',
  cards:[{icon:'🎉',big:'사상 최고',mid:'SPX·러셀 2000',sub:'양대 지수 신기록'},{icon:'📊',big:'3만 재확인',mid:'나스닥 100 42일 만',sub:'회복 확정'},{icon:'💵',big:'5조 달러',mid:'5일간 시장 가치 상승',sub:'인플레이션 완화 원인'}],
  quoteLabel:'BULL THEORY',quoteKo:'"S&P 500과 러셀 2000이 사상 최고를 기록했습니다. 나스닥 100은 오늘 +1% 상승해 42일 만에 3만을 재확인했습니다. 미국 주식이 지난 5일간 약 5조 달러 규모의 시장 가치를 추가했습니다. 화요일 CPI와 오늘 PPI 두 인플레이션 지표 완화가 원인이며, 9월 Fed 회의 앞두고 압박이 감소했습니다."',quoteEn:'BREAKING: The S&P 500 and Russell 2000 just hit NEW ALL-TIME HIGHS · Nasdaq 100 also up +1% today, reclaiming 30,000 for the first time in 42 days · US stocks have added roughly $5 TRILLION in market value over the past 5 days by softer inflation data · Tuesday CPI and today PPI · both readings are easing inflation concerns',
  source:'출처: Bull Theory · 2026.08.13',
  noteHead:'이 소식은 왜 중요한가',noteSub:'SPX·러셀 2000·나스닥 100 3중 지수가 동시에 강세를 재확인했습니다. 5일 5조 달러 시장 가치 상승은 이례적 규모이며, 인플레이션 완화 + Fed 압박 감소가 매크로 지지 요인입니다. Tom Lee 2년 최대 상승 프레임과 정합.',footer:'SPX · 사상 최고 · 5조 5일',brand:BK},
 en:{title:'SPX — S&P 500 · Russell 2000 All-Time Highs · Nasdaq 100 30K Reclaim · $5T Market Cap Added in 5 Days',heroIcon:'🎉',heroBig:'ATH',heroSub:'Per Bull Theory: SPX and Russell 2000 reconfirmed all-time highs, Nasdaq 100 +1% today reclaiming 30K after 42 days. US stocks added ~$5T market value in 5 days, softer inflation data driving.',
  cards:[{icon:'🎉',big:'ATH',mid:'SPX/Russell 2000',sub:'Both records'},{icon:'📊',big:'30K reclaim',mid:'Nasdaq 100 in 42 days',sub:'Recovery confirmed'},{icon:'💵',big:'$5 T',mid:'5-day market cap add',sub:'Inflation easing driver'}],
  quoteLabel:'BULL THEORY',quoteKo:'"SPX·러셀 2000 사상 최고·5일 5조"',quoteEn:'BREAKING: The S&P 500 and Russell 2000 just hit NEW ALL-TIME HIGHS · Nasdaq 100 reclaiming 30,000 for the first time in 42 days · US stocks have added roughly $5 TRILLION in market value over the past 5 days by softer inflation data',
  source:'Source: Bull Theory · 2026.08.13',
  noteHead:'Why this matters',noteSub:'SPX/Russell 2000/Nasdaq 100 triple-index simultaneous bull reconfirmation. $5T market value in 5 days is exceptional scale · inflation easing + Fed pressure reduction as macro support. Aligns with Tom Lee 2yr max frame.',footer:'SPX · ATH · $5T 5-day',brand:BE}},

// 13. Grok 4.0 GPQA Diamond 95%
{file:'grok-40-high-gpqa-diamond-95pct-leaderboard',symbol:'SPCX',
 ko:{title:'xAI — Grok 4.0 (high) 95% GPQA Diamond 점수·리더보드 1위·Claude·Opus·GPT-5·Gemini 초과',heroIcon:'🏆',heroBig:'95%',heroSub:'GPQA Diamond 리더보드에 따르면 xAI Grok 4.0 (high)가 95% 점수로 1위를 차지했습니다. 대학원 수준 과학 추론 벤치마크에서 Claude Opus 5·GPT-5.5·Gemini 등 경쟁 모델을 모두 초과했으며, 어제 별개 리포트의 Grok 4.5·5·4.7 로드맵의 실 실체입니다.',
  cards:[{icon:'🏆',big:'95%',mid:'GPQA Diamond 점수',sub:'리더보드 1위'},{icon:'🧠',big:'과학 추론',mid:'대학원 수준',sub:'벤치마크'},{icon:'⚔️',big:'경쟁 초과',mid:'Claude·GPT-5·Gemini',sub:'모두 아래'}],
  quoteLabel:'GPQA DIAMOND LEADERBOARD',quoteKo:'"Grok 4.0 (high)가 95% 점수로 GPQA Diamond 리더보드에서 대학원 수준 과학 추론 부문 1위를 차지했습니다."',quoteEn:'Grok 4.0 (high) scores 95% · highest score on the chart for graduate-level scientific reasoning · outperforms Claude Fable 5, Opus 5, GPT-5.5 Sol and Kimi K2',
  source:'출처: GPQA Diamond Leaderboard · 2026.08.13',
  noteHead:'이 소식은 왜 중요한가',noteSub:'어제 별개 리포트의 Musk All-Hands Grok 4.5·5·4.7 로드맵의 실 실체입니다. xAI가 벤치마크 1위로 실 성능 리더십을 확인했으며, 오늘 별개 리포트의 Grok Bot·SpaceX 지식 학습 프레임의 근거가 됩니다.',footer:'Grok 4.0 · 95% · GPQA 1위',brand:BK},
 en:{title:'xAI — Grok 4.0 (high) 95% GPQA Diamond · Leaderboard #1 · Outperforms Claude/Opus/GPT-5/Gemini',heroIcon:'🏆',heroBig:'95%',heroSub:'Per GPQA Diamond leaderboard: xAI Grok 4.0 (high) achieves 95% #1 rank. Beats Claude Opus 5, GPT-5.5, Gemini in graduate-level scientific reasoning benchmark. Real substantiation of yesterday Grok 4.5/5/4.7 roadmap.',
  cards:[{icon:'🏆',big:'95%',mid:'GPQA Diamond score',sub:'Leaderboard #1'},{icon:'🧠',big:'Sci reasoning',mid:'Graduate level',sub:'Benchmark'},{icon:'⚔️',big:'Beats competition',mid:'Claude/GPT-5/Gemini',sub:'All below'}],
  quoteLabel:'GPQA DIAMOND LEADERBOARD',quoteKo:'"Grok 4.0 GPQA 95% 1위"',quoteEn:'Grok 4.0 (high) scores 95% · highest score on the chart for graduate-level scientific reasoning',
  source:'Source: GPQA Diamond Leaderboard · 2026.08.13',
  noteHead:'Why this matters',noteSub:'Real substantiation of yesterday Musk All-Hands Grok 4.5/5/4.7 roadmap. xAI confirms real performance leadership at #1 benchmark rank · basis for today Grok Bot / SpaceX knowledge training frames.',footer:'Grok 4.0 · 95% · GPQA #1',brand:BE}},

// 14. Starlink 1,300만 소비자 확인
{file:'starlink-13m-consumer-subscribers-official',symbol:'SPCX',
 ko:{title:'SPCX — Ilma Zeniuk "스타링크 소비자 구독자 1,300만 명 이상 공식 확인·급성장 지속"',heroIcon:'📡',heroBig:'1,300만',heroSub:'Ilma Zeniuk 정리에 따르면 스페이스X 스타링크의 소비자 구독자 수가 공식적으로 1,300만 명을 넘어섰습니다. 어제 별개 리포트의 스타링크 모바일 사용자 1,300만 명과 함께 총 사용자 규모가 명확히 확인되며, 오늘 별개 리포트의 Ron Baron 14조 달러 밸류 프레임의 실 근거입니다.',
  cards:[{icon:'📡',big:'1,300만',mid:'스타링크 소비자',sub:'공식 확인'},{icon:'🚀',big:'급성장',mid:'서비스 확장 지속',sub:'글로벌 확산'},{icon:'📅',big:'2026-08',mid:'현재 확인 시점',sub:'2027+ 확장 예상'}],
  quoteLabel:'ILMA ZENIUK · SPACEX',quoteKo:'"스페이스X 스타링크가 1,300만 명 이상의 소비자 구독자를 보유하고 있습니다."',quoteEn:'SpaceX Starlink now has more than 13 million consumer subscribers',
  source:'출처: Ilma Zeniuk · SpaceX · 2026.08.13',
  noteHead:'이 소식은 왜 중요한가',noteSub:'어제 별개 리포트의 스타링크 모바일 사용자 1,300만 명·오늘 소비자 구독자 1,300만 명 확인으로 총 사용자 규모가 대량 확장되고 있습니다. Ron Baron 14조 달러 프레임의 실 근거이며, 오늘 별개 리포트의 Musk 15 GW·AI 99% 프레임의 사용자 기반을 강화합니다.',footer:'Starlink · 소비자 1,300만',brand:BK},
 en:{title:'SPCX — Ilma Zeniuk "Starlink Consumer Subscribers Exceed 13M Officially · Rapid Growth Continues"',heroIcon:'📡',heroBig:'13M',heroSub:'Per Ilma Zeniuk: SPCX Starlink consumer subscribers officially exceed 13M. With yesterday Starlink Mobile 13M users, total user scale clearly confirmed · real basis for today Ron Baron $14T valuation frame.',
  cards:[{icon:'📡',big:'13M',mid:'Starlink consumers',sub:'Official confirm'},{icon:'🚀',big:'Rapid growth',mid:'Service expansion',sub:'Global spread'},{icon:'📅',big:'2026-08',mid:'Current confirmation',sub:'2027+ expansion'}],
  quoteLabel:'ILMA ZENIUK · SPACEX',quoteKo:'"스타링크 소비자 1,300만"',quoteEn:'SpaceX Starlink now has more than 13 million consumer subscribers',
  source:'Source: Ilma Zeniuk · SpaceX · 2026.08.13',
  noteHead:'Why this matters',noteSub:'Yesterday Starlink Mobile 13M + today consumer subscribers 13M · total user scale mass expansion. Real basis for Ron Baron $14T frame · strengthens user base for today Musk 15 GW / AI 99% frames.',footer:'Starlink · Consumer 13M',brand:BE}},

// 15. US 국가 부채 39.94조 신기록
{file:'us-national-debt-3994t-record-deficit-larger',symbol:'MACRO',
 ko:{title:'매크로 — 미국 국가 부채 39.94조 달러 신기록·이 회계 연도 적자 이미 지난 연도 전체 초과',heroIcon:'📊',heroBig:'39.94조 달러',heroSub:'Quiver Quantitative 정리에 따르면 미국 국가 부채가 39.94조 달러로 신기록을 달성했습니다. 이번 회계 연도의 적자가 이미 지난 회계 연도 전체보다 큰 규모이며, 아직 8월인 상황입니다. 매크로 재정 리스크가 확대되고 있는 신호입니다.',
  cards:[{icon:'📊',big:'39.94조 달러',mid:'미국 국가 부채',sub:'신기록'},{icon:'📈',big:'적자 급증',mid:'이 연도 이미 전년 초과',sub:'8월 시점 기준'},{icon:'⚠️',big:'매크로 리스크',mid:'재정 지속 가능성',sub:'우려 확대'}],
  quoteLabel:'QUIVER QUANTITATIVE',quoteKo:'"미국 국가 부채가 39.94조 달러로 신기록을 달성했습니다. 이 회계 연도의 적자가 이미 지난 회계 연도 전체보다 큽니다. 8월인데도 말입니다."',quoteEn:'JUST IN: Our national debt has hit a new record high of $39.94 trillion · The deficit this fiscal year is already larger than it was all of last fiscal year · Its August',
  source:'출처: Quiver Quantitative · 2026.08.13',
  noteHead:'이 소식은 왜 중요한가',noteSub:'매크로 재정 리스크가 급속 확대되고 있습니다. 오늘 별개 리포트의 SPX 사상 최고·Tom Lee 2년 최대 상승 강세 프레임과 대립하며, 장기 인플레이션·금리·달러 약세 리스크로 이어질 수 있습니다. Michael Burry AI Enron 경고와 함께 강세 사이클의 균형 관점입니다.',footer:'매크로 · 국가 부채 39.94조',brand:BK},
 en:{title:'MACRO — US National Debt $39.94T Record · This Fiscal Year Deficit Already Exceeds Last Year Total',heroIcon:'📊',heroBig:'$39.94 T',heroSub:'Per Quiver Quantitative: US national debt hits $39.94T record. This fiscal year deficit already exceeds all of last fiscal year · still August · macro fiscal risk expanding signal.',
  cards:[{icon:'📊',big:'$39.94 T',mid:'US national debt',sub:'New record'},{icon:'📈',big:'Deficit surge',mid:'This year exceeds prior',sub:'August basis'},{icon:'⚠️',big:'Macro risk',mid:'Fiscal sustainability',sub:'Concern expands'}],
  quoteLabel:'QUIVER QUANTITATIVE',quoteKo:'"미국 부채 39.94조 신기록"',quoteEn:'JUST IN: Our national debt has hit a new record high of $39.94 trillion · The deficit this fiscal year is already larger than it was all of last fiscal year · Its August',
  source:'Source: Quiver Quantitative · 2026.08.13',
  noteHead:'Why this matters',noteSub:'Macro fiscal risk rapidly expanding. Opposes today SPX all-time high / Tom Lee 2yr max bull frames · could lead to long-term inflation/rates/dollar-weakness risks. With Michael Burry AI Enron warning, balance perspective on bull cycle.',footer:'MACRO · Debt $39.94T',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260814.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260814-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
