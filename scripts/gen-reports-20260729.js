// 2026-07-29 리포트 SVG 생성기 · 19 topics
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.07.29';

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
  CMCSA:{ fg:"#0089cf", fg2:"#005a8f", bg2:"#050f1a", card:"#0a1a26" },
  OAI:  { fg:"#10a37f", fg2:"#0d8465", bg2:"#061a15", card:"#0a2018" },
  AAPL: { fg:"#a1a1aa", fg2:"#71717a", bg2:"#0f0f10", card:"#141416" },
  AVGO: { fg:"#c62828", fg2:"#8f1d20", bg2:"#180505", card:"#1e0808" },
  BRK:  { fg:"#0891b2", fg2:"#0e7490", bg2:"#061219", card:"#0a1520" },
  META: { fg:"#1877f2", fg2:"#1266d6", bg2:"#050c19", card:"#0a1420" },
  BLK:  { fg:"#000000", fg2:"#374151", bg2:"#0c0c0c", card:"#141416" },
  AMZN: { fg:"#ff9900", fg2:"#e58600", bg2:"#1a0e00", card:"#201408" },
  KO:   { fg:"#f40009", fg2:"#c00007", bg2:"#1a0505", card:"#200a0a" },
  SSNLF:{ fg:"#1f4e9d", fg2:"#163d7c", bg2:"#050c19", card:"#0a1420" },
  MACRO:{ fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
  SPX:  { fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
};

function esc(s){return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g,'&amp;').replace(/</g,'&lt;');}
function E(o){const r={};for(const k in o)r[k]=typeof o[k]==='string'?esc(o[k]):o[k];return r;}
function pickTitleFont(len){if(len<=30)return 30;if(len<=40)return 26;if(len<=52)return 22;return 20;}
// 한글은 폭 2, 영문/숫자/공백은 폭 1로 계산 · 스마트 wrap
function widthOf(s){let w=0;for(const c of String(s)){w+=(/[가-힣一-龥]/.test(c))?2:1;}return w;}
function wrap(text,maxW,maxLines){
  const words=String(text).split(/(\s+|·|,)/); // 공백·구분자로 분리
  const lines=[];let cur='';
  for(const w of words){
    if(!w)continue;
    const test=cur+w;
    if(widthOf(test)<=maxW)cur=test;
    else{if(cur.trim())lines.push(cur.trim());cur=w.trim();}
    if(lines.length>=maxLines-1&&widthOf(cur)>maxW){
      // 마지막 줄은 강제 자름
      let cut='';for(const ch of cur){if(widthOf(cut+ch)<=maxW-1)cut+=ch;else break;}
      cur=cut+'…';break;
    }
  }
  if(cur.trim()&&lines.length<maxLines)lines.push(cur.trim());
  return lines.slice(0,maxLines);
}
function multiline(text,x,y,maxW,maxLines,lh,attrs){
  const lines=wrap(text,maxW,maxLines);
  return lines.map((l,i)=>`  <text x="${x}" y="${y+i*lh}" ${attrs}>${esc(l)}</text>`).join('\n');
}

function tpl(oRaw){
  const o=E(oRaw);
  const p=PSYM[oRaw.symbol]||PSYM.MACRO;
  const badge=o.badge||o.symbol;
  const titleFont=pickTitleFont(oRaw.title.length);
  if(oRaw.title.length>40)console.warn(`⚠️ 긴 제목(${oRaw.title.length}자): ${oRaw.title}`);
  const cards=oRaw.cards.map((cRaw,i)=>{
    const c=E(cRaw);const x=[60,390,720][i];
    return`
  <rect x="${x}" y="402" width="300" height="220" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
  <text x="${x+150}" y="450" font-family="Arial" font-size="36" text-anchor="middle">${c.icon}</text>
  <text x="${x+150}" y="494" font-family="Arial Black,Arial" font-size="22" font-weight="900" fill="${p.fg}" text-anchor="middle">${c.big}</text>
${multiline(cRaw.mid,x+150,530,26,2,24,`font-family="Arial" font-size="18" fill="#9ca3af" text-anchor="middle"`)}
${multiline(cRaw.sub,x+150,590,28,2,22,`font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle"`)}`;
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
${multiline(oRaw.title,540,102,52,2,titleFont+8,`font-family="Arial Black,Arial" font-size="${titleFont}" font-weight="900" fill="#f9fafb" text-anchor="middle"`)}
  <line x1="80" y1="130" x2="1000" y2="130" stroke="#1f2937" stroke-width="1"/>
  <text x="540" y="240" font-family="Arial Black,Arial" font-size="90" font-weight="900" fill="${p.fg}" text-anchor="middle" opacity=".15">${o.heroIcon}</text>
  <text x="540" y="240" font-family="Arial Black,Arial" font-size="76" font-weight="900" fill="${p.fg}" text-anchor="middle">${o.heroIcon}</text>
  <text x="540" y="300" font-family="Arial Black,Arial" font-size="42" font-weight="900" fill="#f9fafb" text-anchor="middle">${o.heroBig}</text>
${multiline(oRaw.heroSub,540,340,70,2,26,`font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle"`)}
  <line x1="80" y1="390" x2="1000" y2="390" stroke="#1f2937" stroke-width="1"/>
${cards}
  <rect x="60" y="642" width="960" height="180" rx="16" fill="#0f172a" stroke="#374151"/>
  <text x="540" y="682" font-family="Arial" font-size="18" fill="#6b7280" text-anchor="middle" letter-spacing="2">${o.quoteLabel}</text>
${multiline(oRaw.quoteKo,540,714,70,2,26,`font-family="Arial" font-size="20" fill="${p.fg}" text-anchor="middle"`)}
${multiline(oRaw.quoteEn,540,772,80,2,24,`font-family="Arial" font-size="17" fill="#e5e7eb" text-anchor="middle"`)}
  <text x="540" y="826" font-family="Arial" font-size="15" fill="#6b7280" text-anchor="middle">${o.source}</text>
  <rect x="60" y="850" width="960" height="110" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1"/>
${multiline(oRaw.noteHead,540,884,70,2,26,`font-family="Arial" font-size="19" fill="${p.fg}" text-anchor="middle"`)}
${multiline(oRaw.noteSub,540,930,80,2,24,`font-family="Arial" font-size="17" fill="#9ca3af" text-anchor="middle"`)}
  <text x="540" y="994" font-family="Arial" font-size="16" fill="#374151" text-anchor="middle">${o.footer} · ${DATE}</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#g)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${o.brand}</text>
</svg>`;
}

const BK='INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE';
const BE='INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE';
const T=[
// 1. AAPL $3.9T 시총 · 세계 최대 (NVDA 6% 상회)
{file:'aapl-39t-worlds-largest',symbol:'AAPL',
 ko:{title:'AAPL — $3.9T 시총 도달 · 세계 최대 기업 · NVDA 6% 상회',heroIcon:'🏆',heroBig:'$3.9 T',heroSub:'The Kobeissi Letter: Apple이 사상 두번째로 $3.9T 시총 도달 · 세계 최대 상장 기업 · NVIDIA 대비 6% 크다 · 2003년 $10K 투자 시 오늘 $5.5M',
  cards:[{icon:'🏆',big:'$3.9 T',mid:'Apple 시총 도달',sub:'두번째 사상'},{icon:'📊',big:'+6 %',mid:'NVDA 상회',sub:'세계 최대'},{icon:'💰',big:'$5.5 M',mid:'2003년 $10K 투자',sub:'23년 550배'}],
  quoteLabel:'THE KOBEISSI LETTER',quoteKo:'"Apple이 이제 세계 최대 기업 · NVIDIA보다 6% 크다"',quoteEn:'"Apple is now the largest company in the world, now 6% larger than NVIDIA"',
  source:'출처: The Kobeissi Letter · 2026.07.28',
  noteHead:'왜 중요한가: 어제 $5T 임박 프레임의 실제 $3.9T 도달로 정정 · 현금 창출력 리더십 재확인',noteSub:'앞으로 볼 것: $4T·$5T 순차 돌파 시점·NVDA와의 격차 변동',footer:'AAPL · $3.9T 시총',brand:BK},
 en:{title:'AAPL — Hits $3.9T Market Cap · World\'s Largest Now 6% Above NVDA',heroIcon:'🏆',heroBig:'$3.9 T',heroSub:'Per The Kobeissi Letter: Apple becomes only the 2nd company to reach $3.9T · world\'s largest listed company · 6% larger than NVDA · $10K in AAPL 2003 = $5.5M today',
  cards:[{icon:'🏆',big:'$3.9 T',mid:'Apple market cap',sub:'2nd ever'},{icon:'📊',big:'+6 %',mid:'Above NVDA',sub:'world\'s largest'},{icon:'💰',big:'$5.5 M',mid:'From $10K in 2003',sub:'550× in 23 years'}],
  quoteLabel:'THE KOBEISSI LETTER',quoteKo:'"Apple이 세계 최대 · NVDA보다 6% 크다"',quoteEn:'"Apple is now the largest company in the world, now 6% larger than NVIDIA"',
  source:'Source: The Kobeissi Letter · 2026.07.28',
  noteHead:'Why: Actualized version of yesterday\'s $5T-near frame at $3.9T · cash-generation leadership reaffirmed',noteSub:'Watch: sequential $4T · $5T crossings · gap movement vs NVDA',footer:'AAPL · $3.9T cap',brand:BE}},

// 2. SPCX 사상 최저 종가 · -50% ATH · 16/13일 하락
{file:'spcx-50pct-ath-drop-record-low',symbol:'SPCX',
 ko:{title:'SPCX — 사상 최저 종가 · ATH 대비 -50% 하락 · 16일 중 13일 red',heroIcon:'📉',heroBig:'−50 %',heroSub:'Barchart: SPCX가 사상 최저 종가 · 최근 16일 중 13일 하락 · Kalshi: ATH 대비 이제 -50% 이상 하락 · 캐시 우드 강세 견해와 상충되는 시세',
  cards:[{icon:'📉',big:'-50 %',mid:'ATH 대비 하락',sub:'Kalshi 확인'},{icon:'📊',big:'16 / 13',mid:'최근 16일 중 red',sub:'Barchart'},{icon:'📅',big:'ATL 종가',mid:'사상 최저',sub:'상장 이후 최저'}],
  quoteLabel:'BARCHART · KALSHI',quoteKo:'"SPCX 사상 최저 종가 · 16일 중 13일 하락 · ATH 대비 -50% 이상"',quoteEn:'"SPCX at lowest close in history · red in 13 of last 16 days · now down over 50% from ATH"',
  source:'출처: Barchart · Kalshi · 2026.07.28',
  noteHead:'왜 중요한가: 캐시 우드 10년 리드 강세와 시세 극단 대립 · Baron $30-40T 예상과도 상충',noteSub:'앞으로 볼 것: 반등 트리거·매수 유입 vs 매도 지속',footer:'SPCX · -50% ATH · 사상 최저 종가',brand:BK},
 en:{title:'SPCX — Record-Low Close · Down -50% From ATH · Red in 13 of Last 16 Days',heroIcon:'📉',heroBig:'−50 %',heroSub:'Barchart: SPCX at lowest close in history · red in 13 of last 16 days · Kalshi: now down over 50% from ATH · price action contradicts Cathie Wood bull view',
  cards:[{icon:'📉',big:'-50 %',mid:'Drop from ATH',sub:'per Kalshi'},{icon:'📊',big:'13 of 16',mid:'Recent red days',sub:'per Barchart'},{icon:'📅',big:'ATL close',mid:'Lowest in history',sub:'since IPO'}],
  quoteLabel:'BARCHART · KALSHI',quoteKo:'"SPCX 사상 최저 종가 · -50% ATH"',quoteEn:'"SPCX at lowest close in history · red in 13 of last 16 days · now down over 50% from ATH"',
  source:'Source: Barchart · Kalshi · 2026.07.28',
  noteHead:'Why: Extreme opposition between Cathie Wood 10-yr-lead bull view and actual price · also conflicts with Baron $30-40T estimate',noteSub:'Watch: rebound triggers · buy inflow vs continued selling',footer:'SPCX · -50% ATH · record-low close',brand:BE}},

// 3. 캐시 우드 SPCX 10년 리드 발언
{file:'wood-spcx-10y-lead',symbol:'SPCX',
 ko:{title:'캐시 우드 — SPCX가 경쟁사 대비 10년 리드 · 재사용성이 핵심',heroIcon:'🚀',heroBig:'10-YR LEAD',heroSub:'Ark Invest Tracker: 캐시 우드가 SPCX의 우주 산업 10년 리드 재확인 · 스케일 재사용성이 핵심 격차 · Blue Origin 첫 착륙 인정하지만 궤도 도달 실패',
  cards:[{icon:'🚀',big:'10 년',mid:'SPCX 리드',sub:'경쟁사 대비'},{icon:'♻️',big:'재사용',mid:'스케일 재사용성',sub:'핵심 격차 요인'},{icon:'🥈',big:'Blue Origin',mid:'첫 착륙 밀레스톤',sub:'궤도 도달 실패'}],
  quoteLabel:'CATHIE WOOD · ARK INVEST TRACKER',quoteKo:'"우주에서의 압도적 우위는 따라잡기 매우 어려우며, 핵심은 스케일 재사용성"',quoteEn:'"The immense advantage in space is very hard to catch · key has been reusability at scale"',
  source:'출처: Ark Invest Tracker · 2026.07.28',
  noteHead:'왜 중요한가: 시세 -50% ATH와 대비되는 펀더멘털 강세 프레임',noteSub:'앞으로 볼 것: Blue Origin 후속 궤도 시도·Starship V4 로드맵',footer:'SPCX · Wood 10-yr lead',brand:BK},
 en:{title:'Cathie Wood — SPCX Has a 10-Year Lead Over Competition · Reusability Is Key',heroIcon:'🚀',heroBig:'10-YR LEAD',heroSub:'Ark Invest Tracker: Wood reaffirms SPCX 10-year space-industry lead · reusability at scale is the key gap · Blue Origin\'s first landing recognized but rebuild missed orbit',
  cards:[{icon:'🚀',big:'10 yrs',mid:'SPCX lead',sub:'vs competition'},{icon:'♻️',big:'Reusability',mid:'At scale',sub:'core gap driver'},{icon:'🥈',big:'Blue Origin',mid:'First landing milestone',sub:'missed orbit'}],
  quoteLabel:'CATHIE WOOD · ARK INVEST TRACKER',quoteKo:'"우주 우위는 매우 어렵고 재사용성이 핵심"',quoteEn:'"The immense advantage in space is very hard to catch · key has been reusability at scale"',
  source:'Source: Ark Invest Tracker · 2026.07.28',
  noteHead:'Why: Fundamental bull frame contrasting with -50% ATH price action',noteSub:'Watch: Blue Origin follow-on orbital attempt · Starship V4 roadmap',footer:'SPCX · Wood 10-yr lead',brand:BE}},

// 4. 캐시 우드 TSLA 월요일 $8.8M 매수 · $309.22
{file:'wood-tsla-88m-monday-buy',symbol:'TSLA',
 ko:{title:'캐시 우드 — 월요일 TSLA 18,730주 매수 · ~$8.8M · $309.22 종가',heroIcon:'💰',heroBig:'$8.8 M',heroSub:'Kalki 정리: ARK Invest가 월요일 TSLA 18,730주 매수 · ARKK ETF · TSLA $309.22 종가 기준 약 $8.8M · dip 지속 매수',
  cards:[{icon:'💰',big:'~$8.8 M',mid:'월요일 매수',sub:'ARKK 기준'},{icon:'📊',big:'18,730 주',mid:'매수 주식 수',sub:'단일 세션'},{icon:'📉',big:'$309.22',mid:'TSLA 종가',sub:'-14% 후 지속 하락'}],
  quoteLabel:'KALKI',quoteKo:'"캐시 우드가 TSLA dip을 계속 매수 · 월요일 ARKK 18,730주"',quoteEn:'"Cathie Wood keeps buying the TSLA dip · Monday ARKK 18,730 shares"',
  source:'출처: Kalki · 2026.07.28',
  noteHead:'왜 중요한가: 어제 -14% 후 $51M · 오늘 $8.8M 추가 매수 → 지속 dip-buying 확인',noteSub:'앞으로 볼 것: 화·수 후속 매수 여부·다른 기관 flow 반응',footer:'TSLA · Wood $8.8M 월요일',brand:BK},
 en:{title:'Cathie Wood — Bought 18,730 TSLA Shares Monday · ~$8.8M · $309.22 Close',heroIcon:'💰',heroBig:'$8.8 M',heroSub:'Per Kalki: ARK bought 18,730 TSLA shares in ARKK Monday · TSLA closed at $309.22 · ~$8.8M size · continued dip-buying',
  cards:[{icon:'💰',big:'~$8.8 M',mid:'Monday buy',sub:'via ARKK'},{icon:'📊',big:'18,730 sh',mid:'Shares bought',sub:'single session'},{icon:'📉',big:'$309.22',mid:'TSLA close',sub:'continued drop post -14%'}],
  quoteLabel:'KALKI',quoteKo:'"Wood TSLA dip 매수 지속 · 월요일 18,730주"',quoteEn:'"Cathie Wood keeps buying the TSLA dip · Monday ARKK 18,730 shares"',
  source:'Source: Kalki · 2026.07.28',
  noteHead:'Why: Follow-through dip-buying · $51M last week + $8.8M today confirms continuity',noteSub:'Watch: Tue/Wed follow-on buys · other institutional flow response',footer:'TSLA · Wood $8.8M Monday',brand:BE}},

// 5. TSLA 유럽 FSD Supervised 5.2x 안전
{file:'tsla-eu-fsd-52x-safer',symbol:'TSLA',
 ko:{title:'TSLA — 유럽 FSD Supervised 첫 안전 데이터 · 사람 대비 5.2x 안전',heroIcon:'🛡️',heroBig:'5.2 X',heroSub:'Tesla EU Q2 FSD(Supervised) 첫 안전 데이터 공개 · FSD 사용자가 유럽 승인 국가에서 사람보다 5.2x 안전 · Q3 프랑스·덴마크·벨기에 확대 예정 (4/10-7/28 데이터)',
  cards:[{icon:'🛡️',big:'5.2 x',mid:'사람 대비 안전',sub:'평균 사고 감소'},{icon:'🛣️',big:'8.5 x',mid:'고속도로 안전',sub:'49,394 km/사고'},{icon:'🇪🇺',big:'Q3 확대',mid:'France·Denmark·Belgium',sub:'승인 대기'}],
  quoteLabel:'TESLA EU · SAWYER MERRITT',quoteKo:'"유럽 FSD 사용자가 사람보다 5.2x 적은 충돌 · 4/10-7/28 데이터"',quoteEn:'"EU FSD (Supervised) users have 5.2x fewer collisions than human drivers · data Apr 10-Jul 28, 2026"',
  source:'출처: Tesla Europe/ME · Sawyer Merritt · 2026.07.28',
  noteHead:'왜 중요한가: FSD 안전성 정량 데이터 첫 유럽 공개 · 규제 승인 근거 확보',noteSub:'앞으로 볼 것: 프랑스·덴마크·벨기에 승인 시점·전체 유럽 롤아웃',footer:'TSLA EU FSD · 5.2x 안전',brand:BK},
 en:{title:'TSLA — First Europe FSD Supervised Safety Data · 5.2× Safer Than Humans',heroIcon:'🛡️',heroBig:'5.2 ×',heroSub:'Tesla EU Q2 FSD (Supervised) first safety data · users 5.2× fewer collisions than human drivers in approved EU countries · Q3 expansion to France/Denmark/Belgium · data covers Apr 10-Jul 28',
  cards:[{icon:'🛡️',big:'5.2 ×',mid:'Fewer collisions',sub:'vs humans'},{icon:'🛣️',big:'8.5 ×',mid:'Highway safer',sub:'49,394 km/collision'},{icon:'🇪🇺',big:'Q3 expand',mid:'France · Denmark · Belgium',sub:'approvals pending'}],
  quoteLabel:'TESLA EU · SAWYER MERRITT',quoteKo:'"EU FSD 5.2x 사고 감소"',quoteEn:'"EU FSD (Supervised) users have 5.2x fewer collisions than human drivers · data Apr 10-Jul 28, 2026"',
  source:'Source: Tesla Europe/ME · Sawyer Merritt · 2026.07.28',
  noteHead:'Why: First quantitative EU FSD safety data · basis for regulatory approvals',noteSub:'Watch: France/Denmark/Belgium approval timing · full EU rollout',footer:'TSLA EU FSD · 5.2× safer',brand:BE}},

// 6. TSLA 캐나다 Model Y 2026 매진 · +98% YoY
{file:'tsla-canada-model-y-soldout',symbol:'TSLA',
 ko:{title:'TSLA — 캐나다 2026 Model Y 사실상 매진 · Q2 판매 +98% YoY',heroIcon:'🍁',heroBig:'SOLD OUT',heroSub:'Sawyer Merritt·TeslaZoo: Tesla 캐나다 Model Y 2026 할당 거의 소진 · 인도 시간이 12월-1월로 밀림 · 상반기 미국→베를린 공급 이전으로 관세 회피·저가 RWD 도입 · Q2 판매 +98% YoY',
  cards:[{icon:'📅',big:'12월-1월',mid:'인도 시간',sub:'RWD·AWD·Perf 모두'},{icon:'📈',big:'+98 %',mid:'Q2 판매 YoY',sub:'급증'},{icon:'🇩🇪',big:'베를린 공급',mid:'미국→독일 전환',sub:'관세 회피·<$60K RWD'}],
  quoteLabel:'SAWYER MERRITT · TESLAZOO',quoteKo:'"캐나다 2026 Model Y 할당 거의 소진 · Q2 판매 +98% YoY"',quoteEn:'"Canada 2026 Model Y allocation nearly exhausted · Q2 sales +98% YoY"',
  source:'출처: Sawyer Merritt · TeslaZoo · 2026.07.28',
  noteHead:'왜 중요한가: 관세 대응 전략(미국→베를린 이전)이 실 판매 급증으로 결과',noteSub:'앞으로 볼 것: 2027 할당 계획·미국 캐나다 Model Y 이관 지속 여부',footer:'TSLA Canada Model Y · +98%',brand:BK},
 en:{title:'TSLA — Canada 2026 Model Y Effectively Sold Out · Q2 Sales +98% YoY',heroIcon:'🍁',heroBig:'SOLD OUT',heroSub:'Per Sawyer Merritt/TeslaZoo: Tesla Canada 2026 Model Y allocation nearly exhausted · delivery slipped to Dec-Jan · US→Berlin supply shift avoided tariffs & introduced sub-$60K RWD · Q2 sales +98% YoY',
  cards:[{icon:'📅',big:'Dec-Jan',mid:'Delivery timing',sub:'RWD/AWD/Perf all'},{icon:'📈',big:'+98 %',mid:'Q2 sales YoY',sub:'surge'},{icon:'🇩🇪',big:'Berlin supply',mid:'US→Germany shift',sub:'tariff-avoidance · sub-$60K RWD'}],
  quoteLabel:'SAWYER MERRITT · TESLAZOO',quoteKo:'"캐나다 Model Y 2026 매진 · +98% YoY"',quoteEn:'"Canada 2026 Model Y allocation nearly exhausted · Q2 sales +98% YoY"',
  source:'Source: Sawyer Merritt · TeslaZoo · 2026.07.28',
  noteHead:'Why: Tariff-response strategy (US→Berlin shift) materialized as sales surge',noteSub:'Watch: 2027 allocation plan · sustainability of US→Berlin transfer',footer:'TSLA Canada Model Y · +98%',brand:BE}},

// 7. TSLA 애리조나 509 MW + TX 140 MW 태양광 딜
{file:'tsla-solar-509mw-plus-140mw',symbol:'TSLA',
 ko:{title:'TSLA — 애리조나 509 MW + 텍사스 140 MW 태양광 · 하루 두 건 딜',heroIcon:'☀️',heroBig:'509 MW',heroSub:'Muskonomy · Bloomberg: Tesla가 KKR 지원 ContourGlobal Project Sterling(509 MW 태양광 + 350 MW 4h 배터리) 출력의 90% 인수 · 2028 가동 · TX 140 MW 태양광 전체 출력 딜도 별도',
  cards:[{icon:'☀️',big:'509 MW',mid:'AZ 태양광',sub:'+ 350 MW 배터리'},{icon:'⚡',big:'140 MW',mid:'TX 태양광',sub:'전체 출력 인수'},{icon:'📅',big:'2028',mid:'Project Sterling 가동',sub:'KKR ContourGlobal'}],
  quoteLabel:'MUSKONOMY · BLOOMBERG',quoteKo:'"Tesla가 하루에 두 건의 대형 태양광 딜 · AZ 509 MW · TX 140 MW"',quoteEn:'"Tesla signs two big solar deals in a day · AZ 509 MW · TX 140 MW"',
  source:'출처: ContourGlobal via Bloomberg · Muskonomy · 2026.07.28',
  noteHead:'왜 중요한가: Tesla의 AI 데이터센터·자체 캐파 전력 확보 흐름 · 태양광+저장 결합',noteSub:'앞으로 볼 것: 다음 대형 PPA 계약·xAI Colossus 전력 관계',footer:'TSLA 태양광 · 649 MW 하루',brand:BK},
 en:{title:'TSLA — AZ 509 MW + TX 140 MW Solar · Two Big Deals in a Day',heroIcon:'☀️',heroBig:'509 MW',heroSub:'Per Muskonomy/Bloomberg: Tesla to buy 90% of KKR-backed ContourGlobal Project Sterling output (509 MW solar + 350 MW 4-hr battery) · online 2028 · separate TX 140 MW full solar output deal',
  cards:[{icon:'☀️',big:'509 MW',mid:'AZ solar',sub:'+ 350 MW battery'},{icon:'⚡',big:'140 MW',mid:'TX solar',sub:'full output'},{icon:'📅',big:'2028',mid:'Project Sterling online',sub:'KKR ContourGlobal'}],
  quoteLabel:'MUSKONOMY · BLOOMBERG',quoteKo:'"Tesla 하루 두 건 태양광 · AZ 509 MW · TX 140 MW"',quoteEn:'"Tesla signs two big solar deals in a day · AZ 509 MW · TX 140 MW"',
  source:'Source: ContourGlobal via Bloomberg · Muskonomy · 2026.07.28',
  noteHead:'Why: Tesla securing power for AI datacenters and own capacity · solar+storage combo',noteSub:'Watch: next large PPAs · relationship with xAI Colossus power needs',footer:'TSLA solar · 649 MW in a day',brand:BE}},

// 8. TSLA Unsupervised Model Y Robotaxi fleet 자율 귀환
{file:'tsla-unsup-modely-fleet-return',symbol:'TSLA',
 ko:{title:'TSLA — Unsupervised Model Y Robotaxi fleet 자율 귀환 관측',heroIcon:'🚗',heroBig:'AUTO RTN',heroSub:'Aryan Butala: 무인 Model Y Robotaxi 여러 대가 하루 업무 후 자율 귀환 · 각자 주차 위치 찾음 · 빨강·검정 차체에 Robotaxi 스티커 확인',
  cards:[{icon:'🚗',big:'Unsupervised',mid:'무인 자율 주행',sub:'운전자 없음'},{icon:'🏠',big:'Home base',mid:'자율 귀환',sub:'각자 주차 찾기'},{icon:'🚕',big:'Robotaxi 스티커',mid:'빨강·검정 차체',sub:'상용 fleet 확인'}],
  quoteLabel:'ARYAN BUTALA',quoteKo:'"무인 Model Y Robotaxi fleet이 하루 업무 후 자율 귀환 · 각자 주차 찾기"',quoteEn:'"Fleet of Unsupervised Model Y Robotaxis returns to homebase without a driver · finds parking on its own"',
  source:'출처: Aryan Butala · 2026.07.28',
  noteHead:'왜 중요한가: Model Y가 Cybercab과 병렬 Robotaxi 상용 fleet 실체화 신호',noteSub:'앞으로 볼 것: fleet 소유자 확인·사업 모델·Cybercab과 역할 분화',footer:'TSLA · Unsup Model Y 귀환',brand:BK},
 en:{title:'TSLA — Unsupervised Model Y Robotaxi Fleet Autonomously Returns to Base',heroIcon:'🚗',heroBig:'AUTO RTN',heroSub:'Per Aryan Butala: multiple driverless Model Y Robotaxis return to homebase after a day\'s work · find parking spots on their own · Robotaxi stickers on red and black bodies',
  cards:[{icon:'🚗',big:'Unsupervised',mid:'Driverless',sub:'no driver'},{icon:'🏠',big:'Home base',mid:'Auto-return',sub:'self-parking'},{icon:'🚕',big:'Robotaxi stickers',mid:'Red/black bodies',sub:'commercial fleet confirmed'}],
  quoteLabel:'ARYAN BUTALA',quoteKo:'"Model Y Robotaxi fleet 자율 귀환·주차"',quoteEn:'"Fleet of Unsupervised Model Y Robotaxis returns to homebase without a driver · finds parking on its own"',
  source:'Source: Aryan Butala · 2026.07.28',
  noteHead:'Why: Signal of Model Y commercial Robotaxi fleet materialization alongside Cybercab',noteSub:'Watch: fleet owner ID · business model · role split with Cybercab',footer:'TSLA · Unsup Model Y return',brand:BE}},

// 9. TSLA Cybercab 기가 텍사스 직원 운영
{file:'tsla-cybercab-gigatx-employee-ops',symbol:'TSLA',
 ko:{title:'TSLA — Cybercab이 기가 텍사스 직원 pickup·dropoff 운영 지속',heroIcon:'🚕',heroBig:'EMPLOYEE OPS',heroSub:'Herbert Ong: Tesla 직원 Cybercab pickup·dropoff이 기가 텍사스 주변에서 계속 관측 · 어제 Houston 133대·SA 수백 대 배치와 결합 · 실 상용 준비 단계',
  cards:[{icon:'🚕',big:'Cybercab',mid:'직원 운송 운영',sub:'기가 텍사스 주변'},{icon:'🏭',big:'Giga TX',mid:'파일럿 지역',sub:'상용 검증 단계'},{icon:'🔗',big:'연장선',mid:'어제 Houston 133대',sub:'SA 수백대와 결합'}],
  quoteLabel:'HERBERT ONG',quoteKo:'"기가 텍사스 주변에서 Cybercab 직원 pickup·dropoff이 계속 관측"',quoteEn:'"Employee Cybercab pickups and drop-offs continue around Giga Texas"',
  source:'출처: Herbert Ong · 2026.07.28',
  noteHead:'왜 중요한가: 어제 Houston·SA Cybercab 배치와 정합 · 직원 대상 검증 후 상용 확장 시나리오',noteSub:'앞으로 볼 것: 공식 상용 서비스 개시 · 다른 도시 확장 순서',footer:'TSLA Cybercab · Giga TX 직원',brand:BK},
 en:{title:'TSLA — Cybercab Continues Employee Pickups/Dropoffs Around Giga Texas',heroIcon:'🚕',heroBig:'EMPLOYEE OPS',heroSub:'Per Herbert Ong: Tesla employee Cybercab pickups/dropoffs continue around Giga Texas · combines with yesterday\'s Houston 133 + SA hundreds · real commercial-prep stage',
  cards:[{icon:'🚕',big:'Cybercab',mid:'Employee transport ops',sub:'around Giga TX'},{icon:'🏭',big:'Giga TX',mid:'Pilot region',sub:'commercial validation'},{icon:'🔗',big:'Continuation',mid:'Yesterday Houston 133',sub:'combines with SA hundreds'}],
  quoteLabel:'HERBERT ONG',quoteKo:'"Cybercab 직원 pickup·dropoff 계속"',quoteEn:'"Employee Cybercab pickups and drop-offs continue around Giga Texas"',
  source:'Source: Herbert Ong · 2026.07.28',
  noteHead:'Why: Consistent with yesterday\'s Houston/SA Cybercab deployment · employee-validation-then-commercial scenario',noteSub:'Watch: official commercial service launch · other-city expansion order',footer:'TSLA Cybercab · Giga TX employee',brand:BE}},

// 10. TSLA 프랑스·스페인 산불 무료 슈퍼차징
{file:'tsla-fr-es-wildfire-freecharge',symbol:'TSLA',
 ko:{title:'TSLA — 프랑스·스페인 산불 영향 지역 무료 슈퍼차징 · 비-Tesla도',heroIcon:'⚡',heroBig:'FREE CHARGE',heroSub:'Sawyer Merritt: Tesla가 프랑스·스페인 산불 영향 지역에서 8/5까지 무료 슈퍼차징 제공 · 비-Tesla EV도 포함 · Ares(FR)·Málaga(ES)·Bigueros(FR) 등',
  cards:[{icon:'⚡',big:'무료',mid:'슈퍼차징',sub:'비-Tesla 포함'},{icon:'📅',big:'~8/5',mid:'제공 기간',sub:'8/5 자정까지'},{icon:'🇫🇷🇪🇸',big:'FR · ES',mid:'산불 영향 지역',sub:'Ares · Málaga · Bigueros'}],
  quoteLabel:'SAWYER MERRITT',quoteKo:'"Tesla가 프랑스·스페인 산불 지역에서 8/5까지 무료 슈퍼차징 · 비-Tesla도"',quoteEn:'"Tesla offering free Supercharging in France/Spain wildfire areas until Aug 5 · non-Tesla EVs included"',
  source:'출처: Sawyer Merritt · Tesla Charging · 2026.07.28',
  noteHead:'왜 중요한가: 산불 재난 대응 · 브랜드 신뢰 · 인프라 오픈 정책의 상징',noteSub:'앞으로 볼 것: 유럽 슈퍼차징 확대 정책·다른 재난 지역 대응',footer:'TSLA · FR·ES 산불 무료 충전',brand:BK},
 en:{title:'TSLA — Free Supercharging in France/Spain Wildfire Areas · Non-Tesla EVs Too',heroIcon:'⚡',heroBig:'FREE CHARGE',heroSub:'Per Sawyer Merritt: Tesla providing free Supercharging in France/Spain wildfire-affected areas through Aug 5 · non-Tesla EVs included · Ares (FR) · Málaga (ES) · Bigueros (FR)',
  cards:[{icon:'⚡',big:'Free',mid:'Supercharging',sub:'non-Tesla incl.'},{icon:'📅',big:'~Aug 5',mid:'Coverage window',sub:'through midnight Aug 5'},{icon:'🇫🇷🇪🇸',big:'FR · ES',mid:'Wildfire regions',sub:'Ares · Málaga · Bigueros'}],
  quoteLabel:'SAWYER MERRITT',quoteKo:'"프랑스·스페인 산불 지역 무료 슈퍼차징 · 비-Tesla도"',quoteEn:'"Tesla offering free Supercharging in France/Spain wildfire areas until Aug 5 · non-Tesla EVs included"',
  source:'Source: Sawyer Merritt · Tesla Charging · 2026.07.28',
  noteHead:'Why: Wildfire-disaster response · brand trust · infra open-policy symbol',noteSub:'Watch: EU Supercharging expansion policy · response to other disaster areas',footer:'TSLA · FR/ES wildfire free charge',brand:BE}},

// 11. TSLA FSD 라이선싱 $6.5B + $781M ARR
{file:'tsla-fsd-licensing-65b-781m-arr',symbol:'TSLA',
 ko:{title:'TSLA — FSD 라이선싱 매출 ~$6.5B · 월 구독 $781M ARR',heroIcon:'💵',heroBig:'$6.5 B',heroSub:'Whole Mars Catalog: Tesla가 다른 자동차 제조사에 자율주행 라이선싱 약 $6.5B 매출 · 월 구독에서 $781M ARR 창출 · SaaS성 반복 매출 축 확대',
  cards:[{icon:'💵',big:'$6.5 B',mid:'FSD 라이선싱 매출',sub:'타 OEM 대상'},{icon:'📅',big:'$781 M',mid:'ARR',sub:'월 구독 기준'},{icon:'📈',big:'SaaS 축',mid:'반복 매출',sub:'하드웨어 별개'}],
  quoteLabel:'WHOLE MARS CATALOG',quoteKo:'"Tesla가 FSD 라이선싱 $6.5B 매출 · 월 구독 $781M ARR"',quoteEn:'"Tesla has sold ~$6.5B of self-driving licensing to other automakers, generating $781M ARR from monthly subscribers"',
  source:'출처: Whole Mars Catalog · 2026.07.28',
  noteHead:'왜 중요한가: FSD가 소비자 옵션에서 B2B 라이선싱 축까지 확장',noteSub:'앞으로 볼 것: 라이선싱 계약 상세·구독자 성장률·EU 승인 파급',footer:'TSLA FSD · $6.5B + $781M ARR',brand:BK},
 en:{title:'TSLA — FSD Licensing Revenue ~$6.5B · Monthly Subs $781M ARR',heroIcon:'💵',heroBig:'$6.5 B',heroSub:'Per Whole Mars Catalog: Tesla generated ~$6.5B in self-driving licensing to other automakers · $781M ARR from monthly subscribers · SaaS-like recurring revenue axis expanding',
  cards:[{icon:'💵',big:'$6.5 B',mid:'FSD licensing rev',sub:'to other OEMs'},{icon:'📅',big:'$781 M',mid:'ARR',sub:'from monthly subs'},{icon:'📈',big:'SaaS axis',mid:'Recurring rev',sub:'separate from hardware'}],
  quoteLabel:'WHOLE MARS CATALOG',quoteKo:'"FSD 라이선싱 $6.5B · 구독 $781M ARR"',quoteEn:'"Tesla has sold ~$6.5B of self-driving licensing to other automakers, generating $781M ARR from monthly subscribers"',
  source:'Source: Whole Mars Catalog · 2026.07.28',
  noteHead:'Why: FSD expands from consumer option to B2B licensing axis',noteSub:'Watch: licensing deal details · subscriber growth rate · EU approval impact',footer:'TSLA FSD · $6.5B + $781M ARR',brand:BE}},

// 12. TSLA 자율성·로봇 성장 프레임 · $100B 매출·이익
{file:'tsla-100b-autonomy-robotics-frame',symbol:'TSLA',
 ko:{title:'TSLA — 자율성·로봇 대전환 프레임 · 매출 $100B → 이익 $100B',heroIcon:'🤖',heroBig:'REV → PROFIT',heroSub:'Whole Mars Catalog: Tesla가 매출 $100B/년 회사에서 이익 $100B/년 회사로 전환 중 · 자율성·로보틱스 성장 축 · Model Y·Robotaxi·Optimus 3축 결합',
  cards:[{icon:'🚗',big:'$100 B',mid:'현재 매출 축',sub:'하드웨어 중심'},{icon:'💎',big:'$100 B',mid:'미래 이익 축',sub:'자율성 · 로보틱스'},{icon:'🔀',big:'3축 결합',mid:'Model Y+Cybercab',sub:'+ Optimus'}],
  quoteLabel:'WHOLE MARS CATALOG',quoteKo:'"$100B 매출 회사에서 $100B 이익 회사로 전환 중"',quoteEn:'"Tesla is transitioning from a $100B revenue company to a $100B+ bottom-line company"',
  source:'출처: Whole Mars Catalog · 2026.07.28',
  noteHead:'왜 이 프레임: FSD 라이선싱·Cybercab·Optimus의 실체적 진전이 뒷받침',noteSub:'앞으로 볼 것: 이익 전환의 실 시점·자율성 매출 별도 세그먼트 공개',footer:'TSLA · $100B rev→profit 프레임',brand:BK},
 en:{title:'TSLA — Autonomy/Robotics Transformation Frame · $100B Rev → $100B Profit',heroIcon:'🤖',heroBig:'REV → PROFIT',heroSub:'Per Whole Mars Catalog: Tesla transitioning from $100B/yr revenue company to $100B/yr bottom-line company · autonomy/robotics growth axes · Model Y + Robotaxi + Optimus triad',
  cards:[{icon:'🚗',big:'$100 B',mid:'Current rev axis',sub:'hardware-heavy'},{icon:'💎',big:'$100 B',mid:'Future profit axis',sub:'autonomy · robotics'},{icon:'🔀',big:'Triad',mid:'Model Y + Cybercab',sub:'+ Optimus'}],
  quoteLabel:'WHOLE MARS CATALOG',quoteKo:'"$100B 매출 → $100B 이익 회사로 전환"',quoteEn:'"Tesla is transitioning from a $100B revenue company to a $100B+ bottom-line company"',
  source:'Source: Whole Mars Catalog · 2026.07.28',
  noteHead:'Why the frame: FSD licensing, Cybercab, Optimus substantive progress backs it',noteSub:'Watch: actual profit-transition timing · autonomy-revenue separate segment disclosure',footer:'TSLA · $100B rev→profit frame',brand:BE}},

// 13. SPCX Starship Flight 13 착륙 성공
{file:'spcx-starship-flight13-splash',symbol:'SPCX',
 ko:{title:'SPCX — Starship Flight 13 착륙 성공 · Elon·팀 대형 성과',heroIcon:'🚀',heroBig:'FLIGHT 13 ✓',heroSub:'Jesus Watters: Starship 13번째 flight 로켓이 극도로 부드럽게 splash · Elon과 SpaceX 팀에 대형 성과 · 어제 히트실드 스트레스 테스트 성공과 결합',
  cards:[{icon:'🚀',big:'Flight 13',mid:'대형 성과',sub:'Elon·팀'},{icon:'💧',big:'Soft splash',mid:'매우 부드러운 착륙',sub:'"USA USA" 순간'},{icon:'🔥',big:'히트실드',mid:'어제 스트레스 테스트',sub:'성공과 결합'}],
  quoteLabel:'JESUS WATTERS',quoteKo:'"Starship 13번째 flight은 Elon과 SpaceX 프로그램에 MASSIVE WIN"',quoteEn:'"SpaceX Starship\'s 13th flight is a MASSIVE WIN for Elon Musk and the SpaceX Program"',
  source:'출처: Jesus Watters · 2026.07.28',
  noteHead:'왜 중요한가: 시세 -50% ATH 상황과 대비되는 기술 성과 · Flight 14 ship catch 준비 강화',noteSub:'앞으로 볼 것: Flight 14 ship catch 시도·V4 로드맵',footer:'SPCX · Flight 13 splash 성공',brand:BK},
 en:{title:'SPCX — Starship Flight 13 Splash Down Success · Massive Win for Elon',heroIcon:'🚀',heroBig:'FLIGHT 13 ✓',heroSub:'Per Jesus Watters: Starship\'s 13th flight rocket splashed down extremely softly · massive win for Elon and SpaceX program · combines with yesterday\'s heat-shield stress test success',
  cards:[{icon:'🚀',big:'Flight 13',mid:'Massive win',sub:'Elon · team'},{icon:'💧',big:'Soft splash',mid:'Very smooth landing',sub:'"USA USA" moment'},{icon:'🔥',big:'Heat shield',mid:'Yesterday\'s stress test',sub:'combines with success'}],
  quoteLabel:'JESUS WATTERS',quoteKo:'"Starship 13번째 flight · 대형 성과"',quoteEn:'"SpaceX Starship\'s 13th flight is a MASSIVE WIN for Elon Musk and the SpaceX Program"',
  source:'Source: Jesus Watters · 2026.07.28',
  noteHead:'Why: Tech achievement contrasts with -50% ATH price action · reinforces Flight 14 ship catch prep',noteSub:'Watch: Flight 14 ship catch attempt · V4 roadmap',footer:'SPCX · Flight 13 splash success',brand:BE}},

// 14. AMZN AI 쇼핑 어시스턴트 · P/E 최저
{file:'amzn-ai-shopping-pe-low',symbol:'AMZN',
 ko:{title:'AMZN — AI 쇼핑 어시스턴트 사용 2배 · AWS 매 분기 가속 · P/E 사상 최저',heroIcon:'🛒',heroBig:'2 ×',heroSub:'Evan · Ozzy Erken: Amazon AI 쇼핑 어시스턴트 사용 2025년 2배 · 쇼퍼 절반 이상이 AI에 전체 구매 과정 위임 의향 · AWS 매 분기 가속(2023 이후) · P/E 사상 최저',
  cards:[{icon:'🛒',big:'2 ×',mid:'AI 쇼핑 사용',sub:'2025년 vs 이전'},{icon:'☁️',big:'AWS 가속',mid:'매 분기(2023 이후)',sub:'클라우드 성장 지속'},{icon:'📉',big:'P/E 최저',mid:'사상 최저 밸류',sub:'매력적 진입점'}],
  quoteLabel:'EVAN · OZZY ERKEN',quoteKo:'"AI 쇼핑 사용 2배 · 절반 이상 쇼퍼가 AI에 구매 과정 위임"',quoteEn:'"AI shopping assistant use more than doubled in 2025 · over half of shoppers open to AI handling the entire buying process"',
  source:'출처: Evan · Ozzy Erken · 2026.07.28',
  noteHead:'왜 중요한가: AMZN 두 축(리테일 AI + AWS)가 동시에 가속 · 밸류에이션 저평가 상태',noteSub:'앞으로 볼 것: AMZN 실적 발표(내일)·AWS 성장률 지속·AI 쇼핑 매출 세부',footer:'AMZN · AI + AWS + P/E 저',brand:BK},
 en:{title:'AMZN — AI Shopping Assistant Doubles · AWS Accelerating · P/E at Historic Low',heroIcon:'🛒',heroBig:'2 ×',heroSub:'Per Evan/Ozzy Erken: Amazon AI shopping assistant use more than doubled in 2025 · over half of shoppers open to AI handling entire buying process · AWS accelerating every quarter since 2023 · P/E at historic low',
  cards:[{icon:'🛒',big:'2 ×',mid:'AI shopping use',sub:'2025 vs prior'},{icon:'☁️',big:'AWS accel',mid:'Every Q since 2023',sub:'sustained cloud growth'},{icon:'📉',big:'P/E low',mid:'Historic low val',sub:'attractive entry'}],
  quoteLabel:'EVAN · OZZY ERKEN',quoteKo:'"AI 쇼핑 2배 · 쇼퍼 절반 AI에 구매 위임"',quoteEn:'"AI shopping assistant use more than doubled in 2025 · over half of shoppers open to AI handling the entire buying process"',
  source:'Source: Evan · Ozzy Erken · 2026.07.28',
  noteHead:'Why: AMZN twin axes (retail AI + AWS) both accelerating · valuation at historic-low P/E',noteSub:'Watch: AMZN earnings (tomorrow) · AWS growth continuity · AI shopping revenue detail',footer:'AMZN · AI + AWS + low P/E',brand:BE}},

// 15. AMZN Kuiper vs SPCX direct-to-phone 3,232 위성
{file:'amzn-kuiper-3232-vs-spcx',symbol:'AMZN',
 ko:{title:'AMZN vs SPCX — Kuiper direct-to-phone 3,232 위성 FCC 신청',heroIcon:'🛰️',heroBig:'3,232 위성',heroSub:'DogeDesigner: Amazon Kuiper가 FCC에 3,232 위성 direct-to-phone 신청 · Musk와 정면 경쟁 · 그러나 SPCX는 이미 10년 앞선다는 논거',
  cards:[{icon:'🛰️',big:'3,232',mid:'Kuiper 위성 신청',sub:'FCC 인가 대기'},{icon:'📞',big:'Direct-to-phone',mid:'스마트폰 직접',sub:'Starlink와 정면'},{icon:'⏳',big:'10 년',mid:'SPCX 리드',sub:'DogeDesigner 프레임'}],
  quoteLabel:'DOGEDESIGNER',quoteKo:'"Amazon이 Kuiper 3,232 direct-to-phone 위성 FCC 신청 · SPCX는 이미 10년 앞섬"',quoteEn:'"Amazon files with FCC for 3,232 direct-to-phone satellites · SPCX already a decade ahead"',
  source:'출처: DogeDesigner · 2026.07.28',
  noteHead:'왜 중요한가: 위성 통신 시장 실체 경쟁 심화 · Kuiper 확장 실행력 관건',noteSub:'앞으로 볼 것: FCC 인가 시점·Amazon 발사 캐파 확보 계획',footer:'AMZN · Kuiper 3,232 vs SPCX',brand:BK},
 en:{title:'AMZN vs SPCX — Kuiper Files FCC for 3,232 Direct-to-Phone Satellites',heroIcon:'🛰️',heroBig:'3,232 sats',heroSub:'Per DogeDesigner: Amazon Kuiper filed with FCC for a 3,232-satellite direct-to-phone constellation · direct competition with Musk · but SPCX argued to be a decade ahead',
  cards:[{icon:'🛰️',big:'3,232',mid:'Kuiper filing',sub:'FCC pending'},{icon:'📞',big:'Direct-to-phone',mid:'To smartphones',sub:'head-on with Starlink'},{icon:'⏳',big:'10 yr',mid:'SPCX lead',sub:'per DogeDesigner'}],
  quoteLabel:'DOGEDESIGNER',quoteKo:'"Amazon Kuiper 3,232 direct-to-phone 신청 · SPCX 10년 앞섬"',quoteEn:'"Amazon files with FCC for 3,232 direct-to-phone satellites · SPCX already a decade ahead"',
  source:'Source: DogeDesigner · 2026.07.28',
  noteHead:'Why: Real intensification of satellite-comms competition · Kuiper execution is the key',noteSub:'Watch: FCC approval timing · Amazon launch-capacity plan',footer:'AMZN · Kuiper 3,232 vs SPCX',brand:BE}},

// 16. META × BLK 1 GW DC JV $14B
{file:'meta-blk-1gw-dc-14b-jv',symbol:'META',
 ko:{title:'META × BLK — 1 GW DC 조인트벤처 · $14B · 루이지애나 텍사스 · 2028',heroIcon:'🏭',heroBig:'1 GW · $14B',heroSub:'Evan · Bloomberg: Meta와 BlackRock이 루이지애나·텍사스에 1 GW DC JV 설립 · 총 개발비 ~$14B · 2028 가동 · BlackRock 80%·META 20% 지분',
  cards:[{icon:'⚡',big:'1 GW',mid:'DC 용량',sub:'루이지애나·텍사스'},{icon:'💰',big:'$14 B',mid:'총 개발비',sub:'건물·전력·냉각·연결성'},{icon:'📊',big:'BLK 80% · META 20%',mid:'JV 지분 구조',sub:'BLK 펀드 대주주'}],
  quoteLabel:'EVAN · BLOOMBERG',quoteKo:'"META·BLK 1 GW DC JV · $14B · 2028 가동 · BLK 80% META 20%"',quoteEn:'"META·BLK 1 GW DC JV · $14B · online 2028 · BlackRock funds 80% · META 20%"',
  source:'출처: Evan · Bloomberg · 2026.07.28',
  noteHead:'왜 중요한가: 하이퍼스케일러 CAPEX 사이클에 BLK 자본 결합의 새 축 · OpenAI $500B와 다른 구조',noteSub:'앞으로 볼 것: 다른 META/BLK 프로젝트·MSFT·AMZN 유사 딜',footer:'META × BLK · 1 GW · $14B',brand:BK},
 en:{title:'META × BLK — 1 GW DC JV · $14B · Louisiana + Texas · 2028',heroIcon:'🏭',heroBig:'1 GW · $14B',heroSub:'Per Evan/Bloomberg: Meta and BlackRock to establish JV building/operating 1 GW datacenter in Louisiana + Texas · total dev cost ~$14B · online 2028 · BlackRock 80% · META 20%',
  cards:[{icon:'⚡',big:'1 GW',mid:'DC capacity',sub:'Louisiana + Texas'},{icon:'💰',big:'$14 B',mid:'Total dev cost',sub:'buildings/power/cooling/connectivity'},{icon:'📊',big:'BLK 80% · META 20%',mid:'JV equity split',sub:'BLK funds majority'}],
  quoteLabel:'EVAN · BLOOMBERG',quoteKo:'"META·BLK 1 GW DC · $14B · BLK 80%·META 20%"',quoteEn:'"META·BLK 1 GW DC JV · $14B · online 2028 · BlackRock funds 80% · META 20%"',
  source:'Source: Evan · Bloomberg · 2026.07.28',
  noteHead:'Why: New axis of BLK capital combined with hyperscaler CAPEX cycle · different structure from OpenAI $500B',noteSub:'Watch: additional META/BLK projects · similar MSFT/AMZN deals',footer:'META × BLK · 1 GW · $14B',brand:BE}},

// 17. KO Q2 실적 비트 · 가이던스 상향
{file:'ko-q2-beat-guidance-raised',symbol:'KO',
 ko:{title:'KO — Coca-Cola Q2 실적 비트 · 매출 $13.4B · EPS $0.87 · 가이던스 상향',heroIcon:'🥤',heroBig:'BEAT',heroSub:'Evan: Coca-Cola Q2 매출 $13.4B(컨센 $13.16B) · EPS $0.87(컨센 $0.83) · 판매량 +5% YoY · Comparable Op Margin 35.6% · FY26 가이던스 상향',
  cards:[{icon:'💵',big:'$13.4 B',mid:'매출(+1.7% YoY)',sub:'컨센 $13.16B 상회'},{icon:'📈',big:'$0.87',mid:'조정 EPS',sub:'컨센 $0.83 상회'},{icon:'🎯',big:'가이던스 상향',mid:'FY26 유기 매출 ~5%',sub:'EPS 성장 9-12%'}],
  quoteLabel:'EVAN',quoteKo:'"KO Q2 record 실적 · 가이던스 상향 · FCF ~$12.4B"',quoteEn:'"KO Q2 beat print · guidance raised · FCF ~$12.4B"',
  source:'출처: Evan · 2026.07.28',
  noteHead:'왜 중요한가: 소비재 대형주 견조한 실적 · defensive 축 재확인 · JPM bullish와 정합',noteSub:'앞으로 볼 것: 다른 소비재 실적·판매량 5% 지속·글로벌 가격 정책',footer:'KO · Q2 beat · 가이던스 상향',brand:BK},
 en:{title:'KO — Coca-Cola Q2 Beats · Rev $13.4B · EPS $0.87 · Guidance Raised',heroIcon:'🥤',heroBig:'BEAT',heroSub:'Per Evan: Coca-Cola Q2 Rev $13.4B (est. $13.16B) · EPS $0.87 (est. $0.83) · unit volume +5% YoY · Comparable Op Margin 35.6% · FY26 guidance raised',
  cards:[{icon:'💵',big:'$13.4 B',mid:'Revenue (+1.7% YoY)',sub:'above $13.16B est'},{icon:'📈',big:'$0.87',mid:'Adj EPS',sub:'above $0.83 est'},{icon:'🎯',big:'Guide raised',mid:'FY26 organic rev ~5%',sub:'EPS growth 9-12%'}],
  quoteLabel:'EVAN',quoteKo:'"KO Q2 record 실적 · 가이던스 상향"',quoteEn:'"KO Q2 beat print · guidance raised · FCF ~$12.4B"',
  source:'Source: Evan · 2026.07.28',
  noteHead:'Why: Consumer staples large-cap solid print · defensive axis reaffirmed · aligns with JPM bullish',noteSub:'Watch: other consumer prints · unit volume 5% sustainability · global pricing policy',footer:'KO · Q2 beat · guidance raised',brand:BE}},

// 18. 중국 AI - Moonshot Kimi K4 $1B+ Blackwell
{file:'cn-moonshot-kimi-k4-1b',symbol:'NVDA',
 ko:{title:'중국 AI — Moonshot Kimi K4 $1B+ 자금 조달 · Blackwell 활용',heroIcon:'🇨🇳',heroBig:'K4 · $1B+',heroSub:'Shay Boloor: Moonshot AI가 Kimi K4 훈련에 $1B+ 자금 조달 · K3(2.81B 파라미터)보다 훨씬 크게 · 미국 수출 제한에도 중국 클라우드에서 Blackwell 활용 · K3는 이미 인프라 압도',
  cards:[{icon:'💰',big:'$1 B +',mid:'K4 훈련 자금',sub:'조달 중'},{icon:'🔥',big:'Blackwell',mid:'중국 클라우드 활용',sub:'수출 제한 우회'},{icon:'📊',big:'K3 → K4',mid:'2.81B→더 큰 규모',sub:'파라미터 확장'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"Moonshot이 Kimi K4 훈련 $1B+ · 중국 클라우드에서 Blackwell 활용"',quoteEn:'"Moonshot seeking $1B+ for Kimi K4 · using Blackwell capacity across Chinese cloud providers"',
  source:'출처: Shay Boloor · 2026.07.28',
  noteHead:'왜 중요한가: 중국 프런티어 AI가 미국 칩(Blackwell)로 확장 지속 · NVDA 매출·수출 제한 정치 쟁점',noteSub:'앞으로 볼 것: K4 릴리스 시점·미국 수출 제한 정책·NVDA 매출 세그먼트',footer:'중국 AI · Kimi K4 $1B+',brand:BK},
 en:{title:'CN AI — Moonshot Seeks $1B+ for Kimi K4 · Blackwell Across Chinese Clouds',heroIcon:'🇨🇳',heroBig:'K4 · $1B+',heroSub:'Per Shay Boloor: Moonshot AI seeking $1B+ to train Kimi K4 far larger than 2.81B-param K3 · using Blackwell capacity across Chinese cloud providers despite US export restrictions · K3 already overwhelmed infra',
  cards:[{icon:'💰',big:'$1 B +',mid:'K4 training funding',sub:'raising'},{icon:'🔥',big:'Blackwell',mid:'On Chinese clouds',sub:'sidesteps export limits'},{icon:'📊',big:'K3 → K4',mid:'2.81B → larger',sub:'param scale-up'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"Moonshot K4 $1B+ · Blackwell 활용"',quoteEn:'"Moonshot seeking $1B+ for Kimi K4 · using Blackwell capacity across Chinese cloud providers"',
  source:'Source: Shay Boloor · 2026.07.28',
  noteHead:'Why: Chinese frontier AI continues expansion on US chips (Blackwell) · NVDA revenue and export-policy political issue',noteSub:'Watch: K4 release timing · US export policy · NVDA revenue segments',footer:'CN AI · Kimi K4 $1B+',brand:BE}},

// 19. 매크로 - 내일 Fed 77% 유지 + MSFT META QCOM ARM 실적
{file:'macro-fed-77-plus-big-earnings',symbol:'MACRO',
 ko:{title:'매크로 — 내일 Fed 77% 유지 확률 + MSFT·META·QCOM·ARM 대형 실적 동시',heroIcon:'🎢',heroBig:'FED + 4',heroSub:'Kalshi: 내일 Fed 금리 유지 확률 77% · 동시에 MSFT·META·QCOM·ARM 실적 발표 · JPMorgan bullish 신호와 결합 · 시장 방향 결정 축',
  cards:[{icon:'🏛️',big:'77 %',mid:'Fed 유지 확률',sub:'Kalshi'},{icon:'📊',big:'4 개',mid:'대형 실적 발표',sub:'MSFT·META·QCOM·ARM'},{icon:'⚡',big:'롤러코스터',mid:'양방향 리스크',sub:'매크로 + 실적 겹침'}],
  quoteLabel:'KALSHI',quoteKo:'"내일 Fed + MSFT/META/QCOM/ARM · 시장 롤러코스터"',quoteEn:'"Tomorrow will be a rollercoaster · Fed + MSFT/META/QCOM/ARM reporting"',
  source:'출처: Kalshi · 2026.07.28',
  noteHead:'왜 중요한가: 매크로 + 대형 실적 동시 = 지수 방향 결정 이벤트',noteSub:'앞으로 볼 것: Fed 성명 톤·MSFT/META Cloud+AI 매출·QCOM/ARM 가이던스',footer:'MACRO · Fed 77% + 4 실적',brand:BK},
 en:{title:'MACRO — Tomorrow: Fed 77% Hold + MSFT/META/QCOM/ARM Big Earnings Same Day',heroIcon:'🎢',heroBig:'FED + 4',heroSub:'Kalshi: 77% chance Fed holds rates tomorrow · same day MSFT/META/QCOM/ARM report · combined with JPMorgan bullish signal · market direction-defining axis',
  cards:[{icon:'🏛️',big:'77 %',mid:'Fed hold odds',sub:'Kalshi'},{icon:'📊',big:'4 prints',mid:'Big earnings',sub:'MSFT · META · QCOM · ARM'},{icon:'⚡',big:'Rollercoaster',mid:'Two-way risk',sub:'macro + earnings overlap'}],
  quoteLabel:'KALSHI',quoteKo:'"내일 Fed + 4 실적 · 롤러코스터"',quoteEn:'"Tomorrow will be a rollercoaster · Fed + MSFT/META/QCOM/ARM reporting"',
  source:'Source: Kalshi · 2026.07.28',
  noteHead:'Why: Macro + big earnings simultaneous = index-direction-defining event',noteSub:'Watch: Fed statement tone · MSFT/META Cloud+AI revenue · QCOM/ARM guidance',footer:'MACRO · Fed 77% + 4 prints',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260729.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260729-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
