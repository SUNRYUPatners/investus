// 2026-07-28 리포트 SVG 생성기 · 18 topics
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.07.28';

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
// 1. AAPL - NVDA 넘어 세계 최고 가치 + $5T 시총 임박
{file:'aapl-most-valuable-5t-cap',symbol:'AAPL',
 ko:{title:'AAPL — NVDA 넘어 세계 최고 가치 기업 · $5T 시총 임박',heroIcon:'🏆',heroBig:'#1',heroSub:'Apple이 NVIDIA를 넘어 세계에서 가장 가치 있는 상장 기업으로 복귀 · $5T 시총 도달까지 약 $50B 남음 · 10년 평균 ROIC 약 37%',
  cards:[{icon:'🏆',big:'#1',mid:'세계 최고 가치',sub:'NVDA 재역전'},{icon:'💰',big:'~$5 T',mid:'시총 임박',sub:'약 $50B 남음'},{icon:'📈',big:'~37 %',mid:'10년 평균 ROIC',sub:'세계 최상급'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"10년 평균 ROIC 약 37%인 회사보다 신뢰할 만한 투자처는 드물다"',quoteEn:'"Few companies are more trustworthy than one that generated an average ROIC of ~37% over the past decade"',
  source:'출처: Shay Boloor · 2026.07.27',
  noteHead:'왜 중요한가: 어제 Bilello의 AAPL FCF $135B 프레임과 정합 · 현금 창출력 리더십 재확인',noteSub:'앞으로 볼 것: 실 $5T 돌파 시점·AAPL 자체 AI 전략 진전·NVDA와의 위치 재역전',footer:'AAPL · Most Valuable',brand:BK},
 en:{title:'AAPL — Most Valuable Company Passing NVDA · Nearing $5T Cap',heroIcon:'🏆',heroBig:'#1',heroSub:'Apple regains world\'s most valuable public company title from NVIDIA · about $50B away from $5T market cap · ~37% average 10-year ROIC',
  cards:[{icon:'🏆',big:'#1',mid:'World\'s most valuable',sub:'passes NVDA again'},{icon:'💰',big:'~$5 T',mid:'Cap approaching',sub:'~$50B remaining'},{icon:'📈',big:'~37 %',mid:'10-yr avg ROIC',sub:'best-in-class'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"10년 평균 ROIC 37% 회사보다 신뢰할 만한 투자처 드물다"',quoteEn:'"Few companies are more trustworthy than one that generated an average ROIC of ~37% over the past decade"',
  source:'Source: Shay Boloor · 2026.07.27',
  noteHead:'Why: Consistent with yesterday\'s Bilello AAPL FCF $135B frame · cash-generation leadership reaffirmed',noteSub:'Watch: actual $5T crossing · AAPL own AI strategy progress · positioning vs NVDA',footer:'AAPL · Most Valuable',brand:BE}},

// 2. BRK - Buffett GOOGL $10B 매수 (지난달)
{file:'brk-buffett-googl-10b-buy',symbol:'BRK',
 ko:{title:'BRK — Buffett이 지난달 GOOGL $10B 매수 (13F 공시)',heroIcon:'💵',heroBig:'$10 B',heroSub:'Berkshire Hathaway가 지난달 Google($GOOG·$GOOGL) 주식을 약 $10B 규모로 매수한 것으로 확인 · 최근 GOOGL -8% 주간 낙폭 구간과 겹침',
  cards:[{icon:'🏦',big:'$10 B',mid:'BRK 매수 규모',sub:'지난달 기준'},{icon:'📉',big:'GOOGL -8%',mid:'같은 기간 주간 낙폭',sub:'매수 기회 활용'},{icon:'💼',big:'$317 B',mid:'BRK 현금 여전히 대기',sub:'추가 매수 여력'}],
  quoteLabel:'HOLZENBERG',quoteKo:'"Warren Buffett이 지난달 $10B 규모 $GOOG·$GOOGL 주식 매수"',quoteEn:'"Warren Buffett bought $10B worth of $GOOG/$GOOGL stock last month"',
  source:'출처: Holzenberg · 2026.07.27',
  noteHead:'왜 중요한가: 어제 BRK 현금 $317B ATH 대기 상황에서 명시적 매수 신호',noteSub:'앞으로 볼 것: 다음 13F 상세 공시 · Buffett의 다른 하이퍼스케일러 매수 여부',footer:'BRK · GOOGL $10B buy',brand:BK},
 en:{title:'BRK — Buffett Bought $10B in GOOGL Last Month (13F Signal)',heroIcon:'💵',heroBig:'$10 B',heroSub:'Berkshire Hathaway bought roughly $10B in Google ($GOOG/$GOOGL) shares last month · overlaps with GOOGL\'s recent -8% weekly drawdown',
  cards:[{icon:'🏦',big:'$10 B',mid:'BRK buy size',sub:'last month'},{icon:'📉',big:'GOOGL -8%',mid:'Weekly drop',sub:'buy the dip'},{icon:'💼',big:'$317 B',mid:'BRK cash pile still',sub:'more dry powder'}],
  quoteLabel:'HOLZENBERG',quoteKo:'"Buffett 지난달 $10B GOOGL 매수"',quoteEn:'"Warren Buffett bought $10B worth of $GOOG/$GOOGL stock last month"',
  source:'Source: Holzenberg · 2026.07.27',
  noteHead:'Why: Explicit buy signal amid BRK $317B all-time-high cash pile',noteSub:'Watch: next 13F detail · potential Buffett buys in other hyperscalers',footer:'BRK · GOOGL $10B buy',brand:BE}},

// 3. OpenAI - $250B backstop · $500B 오하이오 DC 프로젝트
{file:'openai-250b-backstop-500b-ohio',symbol:'OAI',
 ko:{title:'OpenAI — $250B backstop 요청 · 오하이오 $500B DC 프로젝트',heroIcon:'🏭',heroBig:'$500 B',heroSub:'OpenAI가 남부 오하이오 컬럼버스에 10 GW 규모 데이터센터 프로젝트 · 총비용 $500B 초과 · Softbank이 $250B backstop 협상 중 · NVDA가 개발자 역할',
  cards:[{icon:'⚡',big:'10 GW',mid:'DC 용량',sub:'단일 규모 사상 최대'},{icon:'🇺🇸',big:'오하이오',mid:'컬럼버스 인근',sub:'대형 부지'},{icon:'💸',big:'$250 B',mid:'Softbank backstop',sub:'OpenAI 신용 부재 커버'}],
  quoteLabel:'BRIAN D · WSJ',quoteKo:'"오하이오 $500B DC · Softbank $250B backstop · NVDA 개발자"',quoteEn:'"Ohio $500B DC · Softbank $250B backstop · NVIDIA as developer"',
  source:'출처: Brian D · WSJ 보도 · 2026.07.27',
  noteHead:'왜 중요한가: 사상 최대 규모 데이터센터 프로젝트 · AI CAPEX 사이클의 극단',noteSub:'앞으로 볼 것: OpenAI 신용도·NVDA 계약 상세·부지·전력 계약 확정',footer:'OpenAI · $500B Ohio DC',brand:BK},
 en:{title:'OpenAI — Seeking $250B Backstop · $500B Ohio DC Project',heroIcon:'🏭',heroBig:'$500 B',heroSub:'OpenAI plans a 10 GW data center near Columbus, Ohio · total cost exceeds $500B · Softbank in talks for $250B backstop · NVIDIA acting as developer',
  cards:[{icon:'⚡',big:'10 GW',mid:'DC capacity',sub:'largest single-site ever'},{icon:'🇺🇸',big:'Ohio',mid:'Near Columbus',sub:'large site'},{icon:'💸',big:'$250 B',mid:'Softbank backstop',sub:'covers OpenAI credit gap'}],
  quoteLabel:'BRIAN D · WSJ',quoteKo:'"오하이오 $500B DC · Softbank $250B backstop · NVDA 개발"',quoteEn:'"Ohio $500B DC · Softbank $250B backstop · NVIDIA as developer"',
  source:'Source: Brian D · WSJ report · 2026.07.27',
  noteHead:'Why: Largest data-center project ever · extreme end of the AI CAPEX cycle',noteSub:'Watch: OpenAI credit · NVDA contract detail · site/power contract finalization',footer:'OpenAI · $500B Ohio DC',brand:BE}},

// 4. TSLA - Cybertruck 기가 텍사스 팩토리 확장
{file:'tsla-cybertruck-gigatx-expansion',symbol:'TSLA',
 ko:{title:'TSLA — Cybertruck 기가 텍사스 팩토리 확장 · 800피트+ 도달',heroIcon:'🏭',heroBig:'800+ ft',heroSub:'기가팩토리 텍사스 Cybertruck 라인 확장 진행 · 12 column grid N-S로 확장돼 약 800피트(~150m) 근접 · 남쪽으로 계속 확장 예정',
  cards:[{icon:'🏭',big:'12 grid',mid:'N-S column 확장',sub:'철골 도착 지속'},{icon:'📏',big:'~800 ft',mid:'현재 길이',sub:'~150m 근접'},{icon:'🚛',big:'프리몬트',mid:'별도 파일럿 라인',sub:'올해 말 온라인'}],
  quoteLabel:'JOE TEGTMEYER',quoteKo:'"12 column N-S 그리드로 확장되며 약 800피트 · 남쪽으로 계속 성장"',quoteEn:'"Expanded to 12-column N-S grid nearing 800\' · will continue growing south"',
  source:'출처: Joe Tegtmeyer · 2026.07.27',
  noteHead:'왜 중요한가: Cybercab 준비와 별개로 Cybertruck 캐파의 실체적 확장',noteSub:'앞으로 볼 것: 확장 완공 시점·프리몬트 파일럿 시점·연 캐파 목표',footer:'TSLA · Cybertruck Gigatx 확장',brand:BK},
 en:{title:'TSLA — Cybertruck Giga Texas Factory Expansion · Nears 800+ ft',heroIcon:'🏭',heroBig:'800+ ft',heroSub:'Cybertruck line expansion at Giga Texas ongoing · 12-column N-S grid now nearing ~800 ft (~150 m) · to continue growing south',
  cards:[{icon:'🏭',big:'12 grid',mid:'N-S column expansion',sub:'steel keeps arriving'},{icon:'📏',big:'~800 ft',mid:'Current length',sub:'~150 m'},{icon:'🚛',big:'Fremont',mid:'Separate pilot line',sub:'online later this year'}],
  quoteLabel:'JOE TEGTMEYER',quoteKo:'"12 column N-S 그리드 · 약 800피트 · 남쪽으로 확장"',quoteEn:'"Expanded to 12-column N-S grid nearing 800\' · will continue growing south"',
  source:'Source: Joe Tegtmeyer · 2026.07.27',
  noteHead:'Why: Substantive Cybertruck capacity expansion alongside Cybercab prep',noteSub:'Watch: expansion completion timing · Fremont pilot timing · annual capacity target',footer:'TSLA · Cybertruck Gigatx expansion',brand:BE}},

// 5. TSLA - Houston 133대·San Antonio 다수 Cybertruck 배치
{file:'tsla-cybertruck-deployment-tx',symbol:'TSLA',
 ko:{title:'TSLA — Houston 133대 Cybertruck 발견 · San Antonio 배치 준비',heroIcon:'🚛',heroBig:'133 대',heroSub:'Houston에서 오늘 133 Cybertrucks 확인(Tesla Hempstead Center 5대·fleet lot 128대) · San Antonio에도 수백 대 배치 준비 중 (Robotaxi 확장 가능성)',
  cards:[{icon:'🚛',big:'133 대',mid:'Houston 발견',sub:'대부분 fleet lot'},{icon:'🇺🇸',big:'San Antonio',mid:'수백 대 배치 준비',sub:'Robotaxi 확장?'},{icon:'📅',big:'집중 배치',mid:'짧은 기간에 급증',sub:'상용 fleet 준비'}],
  quoteLabel:'S.E. ROBINSON · DALTON BREWER',quoteKo:'"Houston에 133대·San Antonio 수백 대 Cybertruck 배치 준비"',quoteEn:'"133 Cybertrucks spotted in Houston today · hundreds in San Antonio getting ready"',
  source:'출처: S.E. Robinson · Dalton Brewer · 2026.07.27',
  noteHead:'왜 중요한가: Cybertruck 상용 fleet 배치가 실체적으로 확대되는 신호',noteSub:'앞으로 볼 것: Robotaxi 확장 지역·상용 고객 계약 발표·fleet 규모 공식 확정',footer:'TSLA · Cybertruck TX 배치',brand:BK},
 en:{title:'TSLA — 133 Cybertrucks Spotted in Houston · Hundreds Prep in San Antonio',heroIcon:'🚛',heroBig:'133',heroSub:'133 Cybertrucks spotted in Houston today (5 at Tesla Hempstead Center, 128 at fleet lot) · hundreds more prepping in San Antonio (possible Robotaxi expansion)',
  cards:[{icon:'🚛',big:'133 units',mid:'Houston sighting',sub:'mostly at fleet lot'},{icon:'🇺🇸',big:'San Antonio',mid:'Hundreds prepping',sub:'Robotaxi expansion?'},{icon:'📅',big:'Concentrated',mid:'Spike in short time',sub:'commercial fleet prep'}],
  quoteLabel:'S.E. ROBINSON · DALTON BREWER',quoteKo:'"Houston 133대·San Antonio 수백 대 배치 준비"',quoteEn:'"133 Cybertrucks spotted in Houston today · hundreds in San Antonio getting ready"',
  source:'Source: S.E. Robinson · Dalton Brewer · 2026.07.27',
  noteHead:'Why: Substantive expansion of Cybertruck commercial fleet deployment',noteSub:'Watch: Robotaxi expansion regions · commercial customer deal announcements · official fleet size',footer:'TSLA · Cybertruck TX 배치',brand:BE}},

// 6. TSLA - 상하이 M3 생산 정상화 · 인도 2-4주로 단축
{file:'tsla-shanghai-m3-normalized',symbol:'TSLA',
 ko:{title:'TSLA — 상하이 Gigafactory Model 3 생산 정상화 · 인도 2-4주',heroIcon:'🏭',heroBig:'2~4 주',heroSub:'Tesla 중국이 Model 3 전 트림 예상 인도 시간을 4-6주에서 2-4주로 단축 · 상하이 Gigafactory 생산 정상화 신호',
  cards:[{icon:'📉',big:'4~6 → 2~4',mid:'인도 시간 단축',sub:'중국 홈페이지'},{icon:'🏭',big:'상하이',mid:'Gigafactory M3',sub:'생산 정상화'},{icon:'🇨🇳',big:'Tesla China',mid:'수요·공급 재조정',sub:'상반기 부족 해소'}],
  quoteLabel:'MING',quoteKo:'"상하이 M3 생산 정상화 · 인도 시간 2-4주로 단축 (전 트림)"',quoteEn:'"Shanghai M3 production returns to normal · delivery cut to 2-4 weeks for all trims"',
  source:'출처: Ming · Tesla China · 2026.07.27',
  noteHead:'왜 중요한가: 중국 시장 대응 캐파 정상화·Q3 인도 흐름에 긍정',noteSub:'앞으로 볼 것: 중국 판매 데이터·Model Y 인도 시간·Cybertruck 중국 출시',footer:'TSLA · 상하이 M3 정상',brand:BK},
 en:{title:'TSLA — Shanghai Gigafactory Model 3 Production Normalized · 2-4 Wk Delivery',heroIcon:'🏭',heroBig:'2-4 wk',heroSub:'Tesla China cuts estimated M3 delivery times across all trims from 4-6 wks to 2-4 wks · signal Shanghai Gigafactory production is back to normal',
  cards:[{icon:'📉',big:'4-6 → 2-4',mid:'Delivery cut',sub:'China homepage'},{icon:'🏭',big:'Shanghai',mid:'Gigafactory M3',sub:'production normalized'},{icon:'🇨🇳',big:'Tesla China',mid:'Supply/demand reset',sub:'shortage resolved'}],
  quoteLabel:'MING',quoteKo:'"상하이 M3 정상화 · 인도 2-4주"',quoteEn:'"Shanghai M3 production returns to normal · delivery cut to 2-4 weeks for all trims"',
  source:'Source: Ming · Tesla China · 2026.07.27',
  noteHead:'Why: China-market capacity normalized · positive for Q3 delivery flow',noteSub:'Watch: China sales data · Model Y delivery times · Cybertruck China launch',footer:'TSLA · Shanghai M3 normal',brand:BE}},

// 7. TSLA - Cole Grinde slow-steady 전략
{file:'tsla-cole-grinde-slow-steady',symbol:'TSLA',
 ko:{title:'TSLA — Cole Grinde: Slow & Steady 전략 프레임 · $43B 현금',heroIcon:'🐢',heroBig:'SLOW & STEADY',heroSub:'Cole Grinde: Tesla가 $43B 현금 보유·Q2 매출 record와 함께 안전 우선 Robotaxi 배포, in-house 로봇 공급망, 점진 캐파, 인프라 확장, Cybercab 전략을 병행해야',
  cards:[{icon:'💰',big:'$43 B',mid:'Tesla 현금 보유',sub:'다축 투자 자금'},{icon:'🐢',big:'Slow',mid:'안전 우선 Robotaxi',sub:'사고 리스크 관리'},{icon:'🔄',big:'in-house',mid:'로봇 공급망 자체 구축',sub:'FCF 양전환 목표'}],
  quoteLabel:'COLE GRINDE',quoteKo:'"Slow and Steady wins the war · Wall Street will come around"',quoteEn:'"Slow and steady wins the war · Wall Street will come around"',
  source:'출처: Cole Grinde · 2026.07.27',
  noteHead:'왜 이 프레임: -14% 낙폭·다운그레이드 wave 여파에 대한 개인 강세 프레임',noteSub:'앞으로 볼 것: Q3 마진 회복·현금 흐름 정상화·Robotaxi 안전 지표',footer:'TSLA · Slow & Steady',brand:BK},
 en:{title:'TSLA — Cole Grinde: Slow & Steady Strategy Frame · $43B Cash',heroIcon:'🐢',heroBig:'SLOW & STEADY',heroSub:'Cole Grinde: with $43B cash and record Q2 revenue, Tesla should combine safety-first Robotaxi rollout, in-house robotics supply chain, gradual capacity, infra expansion and Cybercab strategy',
  cards:[{icon:'💰',big:'$43 B',mid:'Tesla cash on hand',sub:'multi-axis funding'},{icon:'🐢',big:'Slow',mid:'Safety-first Robotaxi',sub:'crash-risk managed'},{icon:'🔄',big:'in-house',mid:'Own robotics supply',sub:'FCF-positive goal'}],
  quoteLabel:'COLE GRINDE',quoteKo:'"Slow and Steady wins the war · Wall Street will come around"',quoteEn:'"Slow and steady wins the war · Wall Street will come around"',
  source:'Source: Cole Grinde · 2026.07.27',
  noteHead:'Why the frame: Individual bull thesis against -14% drop and downgrade-wave backdrop',noteSub:'Watch: Q3 margin recovery · cash-flow normalization · Robotaxi safety metrics',footer:'TSLA · Slow & Steady',brand:BE}},

// 8. SPCX - Moskowitz (6번째 의원) SPCX 매수
{file:'spcx-moskowitz-6th-congress-buy',symbol:'SPCX',
 ko:{title:'SPCX — Moskowitz(민주) 매수 · 6번째 SPCX 매수 미 의원',heroIcon:'🏛️',heroBig:'6번째',heroSub:'Rep. Jared Moskowitz(D)가 최대 $340,000 규모 거래 공시 · 그 중 SPCX 지분 매수 포함 · 미 의회에서 SPCX를 매수한 6번째 의원',
  cards:[{icon:'🏛️',big:'6번째',mid:'SPCX 매수 의원',sub:'초당적 관심 확대'},{icon:'💵',big:'~$340 K',mid:'공시 거래 총액',sub:'상한 기준'},{icon:'📋',big:'STOCK Act',mid:'매수 신고 완료',sub:'투명성 확인'}],
  quoteLabel:'NANCY PELOSI STOCK TRACKER',quoteKo:'"Moskowitz가 SPCX 매수 · 6번째 SPCX 매수 의원"',quoteEn:'"Moskowitz buys $SPCX · 6th Congress member to buy SpaceX"',
  source:'출처: Nancy Pelosi Stock Tracker · 2026.07.27',
  noteHead:'왜 중요한가: 정치인 매수 확산이 SPCX의 정치·정책적 위상 부각',noteSub:'앞으로 볼 것: STOCK Act 논쟁 재점화·다른 의원 매수·정책 결합 리스크',footer:'SPCX · Moskowitz 6th',brand:BK},
 en:{title:'SPCX — Moskowitz (D) Buys · 6th US Congress Member to Buy SPCX',heroIcon:'🏛️',heroBig:'6th',heroSub:'Rep. Jared Moskowitz (D) discloses up to $340,000 in trades including SPCX shares · becomes the 6th member of Congress to buy SpaceX',
  cards:[{icon:'🏛️',big:'6th',mid:'SPCX-buying member',sub:'bipartisan interest widens'},{icon:'💵',big:'~$340 K',mid:'Disclosed trades',sub:'upper bound'},{icon:'📋',big:'STOCK Act',mid:'Filed',sub:'transparency confirmed'}],
  quoteLabel:'NANCY PELOSI STOCK TRACKER',quoteKo:'"Moskowitz SPCX 매수 · 6번째 의원"',quoteEn:'"Moskowitz buys $SPCX · 6th Congress member to buy SpaceX"',
  source:'Source: Nancy Pelosi Stock Tracker · 2026.07.27',
  noteHead:'Why: Political-figure buys elevate SPCX\'s policy/political positioning',noteSub:'Watch: STOCK Act debate reignition · other member buys · policy-linked risk',footer:'SPCX · Moskowitz 6th',brand:BE}},

// 9. SPCX - Starship Flight 13 heat shield 스트레스 테스트 성공
{file:'spcx-starship-heat-shield-test',symbol:'SPCX',
 ko:{title:'SPCX — Starship Flight 13 히트실드 스트레스 테스트 성공',heroIcon:'🔥',heroBig:'HEAT SHIELD ✓',heroSub:'SpaceX가 Flight 13에서 히트실드 타일을 의도적으로 더 강한 dynamic pressure로 스트레스 테스트 · Elon 성공 확인 · Flight 14 ship catch 준비의 리스크 하나 해소',
  cards:[{icon:'🔥',big:'고압',mid:'스트레스 테스트',sub:'의도된 고 dynamic pressure'},{icon:'✅',big:'성공',mid:'Elon 공식 확인',sub:'접착제→볼트 개선 검증'},{icon:'🚀',big:'Flight 14',mid:'ship catch 준비',sub:'다음 마일스톤'}],
  quoteLabel:'JOE HANSEN',quoteKo:'"Flight 13의 비밀 히트실드 스트레스 테스트 성공 · Flight 14 ship catch 리스크 해소"',quoteEn:'"Secret heat-shield stress test on Flight 13 succeeded · clears a risk for Flight 14 ship catch"',
  source:'출처: Joe Hansen · 2026.07.27',
  noteHead:'왜 중요한가: 성공적 발사에도 조용히 상방 실험·재사용 신뢰성 축적',noteSub:'앞으로 볼 것: Flight 14 ship catch 시도·V3의 상용 페이로드 배치',footer:'SPCX · Heat shield ✓',brand:BK},
 en:{title:'SPCX — Starship Flight 13 Heat Shield Stress Test Succeeded',heroIcon:'🔥',heroBig:'HEAT SHIELD ✓',heroSub:'SpaceX intentionally pushed heat-shield tiles harder on Flight 13 under higher dynamic pressure · Elon confirms success · clears a risk ahead of Flight 14 ship catch',
  cards:[{icon:'🔥',big:'High-press',mid:'Stress test',sub:'intentional dynamic pressure'},{icon:'✅',big:'Success',mid:'Elon confirmed',sub:'adhesive→bolt improvement validated'},{icon:'🚀',big:'Flight 14',mid:'Ship-catch prep',sub:'next milestone'}],
  quoteLabel:'JOE HANSEN',quoteKo:'"Flight 13 비밀 스트레스 테스트 성공 · Flight 14 리스크 해소"',quoteEn:'"Secret heat-shield stress test on Flight 13 succeeded · clears a risk for Flight 14 ship catch"',
  source:'Source: Joe Hansen · 2026.07.27',
  noteHead:'Why: Quietly pushes limits even on successful flights · reusability reliability accumulates',noteSub:'Watch: Flight 14 ship catch attempt · V3 commercial payload deployment',footer:'SPCX · Heat shield ✓',brand:BE}},

// 10. SPCX × NVDA - Open Secure AI Alliance
{file:'spcx-nvda-open-secure-ai-alliance',symbol:'SPCX',
 ko:{title:'SPCX × NVDA — Open Secure AI Alliance 창립 멤버 합류',heroIcon:'🛡️',heroBig:'ALLIANCE',heroSub:'SpaceX가 NVIDIA와 함께 Open Secure AI Alliance 창립 멤버로 합류 · 소프트웨어·AI 에이전트 보호 위한 오픈 툴 공동 개발',
  cards:[{icon:'🛡️',big:'Secure AI',mid:'오픈 툴 개발',sub:'AI 에이전트 보호'},{icon:'🤝',big:'창립 멤버',mid:'SPCX + NVDA',sub:'초기 앵커'},{icon:'🌐',big:'오픈 소스',mid:'커뮤니티 협력',sub:'표준화 시도'}],
  quoteLabel:'DOGEDESIGNER',quoteKo:'"SpaceX가 NVIDIA와 함께 Open Secure AI Alliance 창립 멤버"',quoteEn:'"SpaceX joined NVIDIA as a founding member of the Open Secure AI Alliance"',
  source:'출처: DogeDesigner · 2026.07.27',
  noteHead:'왜 중요한가: SPCX의 AI 인프라·안전 프레임에서의 명시적 참여',noteSub:'앞으로 볼 것: 다른 창립 멤버 발표·표준 채택 회사·정책 반영',footer:'SPCX × NVDA · Alliance',brand:BK},
 en:{title:'SPCX × NVDA — Founding Members of Open Secure AI Alliance',heroIcon:'🛡️',heroBig:'ALLIANCE',heroSub:'SpaceX joins NVIDIA as founding members of the Open Secure AI Alliance · to build open tools for protecting software and AI agents',
  cards:[{icon:'🛡️',big:'Secure AI',mid:'Open tools',sub:'protect AI agents'},{icon:'🤝',big:'Founding',mid:'SPCX + NVDA',sub:'initial anchors'},{icon:'🌐',big:'Open source',mid:'Community collab',sub:'standardization push'}],
  quoteLabel:'DOGEDESIGNER',quoteKo:'"SpaceX가 NVIDIA와 창립 멤버 합류"',quoteEn:'"SpaceX joined NVIDIA as a founding member of the Open Secure AI Alliance"',
  source:'Source: DogeDesigner · 2026.07.27',
  noteHead:'Why: Explicit SPCX participation in AI infra/safety framing',noteSub:'Watch: additional founding members · standard-adopting companies · policy alignment',footer:'SPCX × NVDA · Alliance',brand:BE}},

// 11. SPCX - Ron Baron 20-30배 · $30-40T 예측
{file:'spcx-ron-baron-30-40t',symbol:'SPCX',
 ko:{title:'SPCX — Ron Baron: 10~15년 안에 20~30배 · $30~40T 밸류 예상',heroIcon:'🚀',heroBig:'20~30 ×',heroSub:'Baron Capital 창립자 Ron Baron: SPCX가 IPO 가격 대비 10~15년 안에 20~30배 상승 · $3~4T에서 시작해 $30~40T 도달 예상 · 최소 $40T까지도',
  cards:[{icon:'📈',big:'20~30 ×',mid:'10~15년 예상',sub:'IPO 가격 대비'},{icon:'💰',big:'$30~40 T',mid:'예상 밸류',sub:'현재 대비 폭발적'},{icon:'⏳',big:'10~15 yr',mid:'투자 기간',sub:'장기 관점'}],
  quoteLabel:'RON BARON · MOONSHOTS POD',quoteKo:'"우리는 SPCX가 $30~40T 밸류가 될 것으로 본다 · 최소 $40T까지도"',quoteEn:'"We think SpaceX will be $30-40T in value, at least $40T"',
  source:'출처: Ron Baron · The Compound and Friends · 2026.07.26',
  noteHead:'왜 이 프레임: Baron의 극단적 강세 · Adam Jonas $135 매수 콜과 결합해 강세 지속',noteSub:'앞으로 볼 것: Starship 상용 진전·Neocloud 실체화·Baron 후속 매수 여부',footer:'SPCX · Baron 20-30x',brand:BK},
 en:{title:'SPCX — Ron Baron: 20-30× in 10-15 Years · $30-40T Valuation Est',heroIcon:'🚀',heroBig:'20-30 ×',heroSub:'Baron Capital founder Ron Baron: SPCX to rise 20-30× from IPO price over 10-15 years · starts at $3-4T reaching $30-40T · at least $40T possible',
  cards:[{icon:'📈',big:'20-30 ×',mid:'10-15 year est',sub:'from IPO price'},{icon:'💰',big:'$30-40 T',mid:'Expected value',sub:'explosive vs current'},{icon:'⏳',big:'10-15 yr',mid:'Investment horizon',sub:'long-term view'}],
  quoteLabel:'RON BARON · MOONSHOTS POD',quoteKo:'"SPCX $30-40T 밸류·최소 $40T까지"',quoteEn:'"We think SpaceX will be $30-40T in value, at least $40T"',
  source:'Source: Ron Baron · The Compound and Friends · 2026.07.26',
  noteHead:'Why the frame: Baron\'s extreme bull view · combines with Adam Jonas $135 buy call to sustain bull momentum',noteSub:'Watch: Starship commercial progress · Neocloud materialization · Baron follow-through',footer:'SPCX · Baron 20-30x',brand:BE}},

// 12. SPCX - NASA Administrator 강세 견해
{file:'spcx-nasa-admin-bull-view',symbol:'SPCX',
 ko:{title:'SPCX — NASA Administrator Sean Duffy 강세 견해',heroIcon:'🌌',heroBig:'NASA · SPCX',heroSub:'NASA Administrator Sean Duffy가 팟캐스트에서 Elon Musk와 SpaceX에 강한 신뢰 표명 · 달 재귀환 미션 위해 SPCX 필수 · 극단적 자본과 엔지니어링 인재 강조',
  cards:[{icon:'🌙',big:'Moon',mid:'재귀환 미션',sub:'SPCX 없이는 불가'},{icon:'💪',big:'자본',mid:'극단적 자본화',sub:'"매우 좋은 것"'},{icon:'🏆',big:'Musk 평가',mid:'최고 창업자·엔지니어',sub:'"의문의 여지 없이"'}],
  quoteLabel:'SEAN DUFFY · NASA ADMIN',quoteKo:'"극단적 자본화된 Elon에 절대 반대하지 마라"',quoteEn:'"Never bet against an extremely well capitalized Elon"',
  source:'출처: Sawyer Merritt · Moonshots pod · 2026.07.27',
  noteHead:'왜 이 발언인가: 정부 기관 최고 책임자의 명시적 SPCX 지지 · 정책 리스크 완화',noteSub:'앞으로 볼 것: NASA 계약 확대·Artemis 프로그램 SPCX 역할·정책 조합',footer:'SPCX · NASA Admin bull',brand:BK},
 en:{title:'SPCX — NASA Administrator Sean Duffy\'s Bull View',heroIcon:'🌌',heroBig:'NASA · SPCX',heroSub:'NASA Administrator Sean Duffy expresses strong confidence in Elon Musk and SpaceX on a podcast · says NASA can\'t return to the Moon without them · emphasizes extreme capital and engineering talent',
  cards:[{icon:'🌙',big:'Moon',mid:'Return mission',sub:'impossible without SPCX'},{icon:'💪',big:'Capital',mid:'Extremely capitalized',sub:'"very good thing"'},{icon:'🏆',big:'Musk rating',mid:'Best founder + engineer',sub:'"without question"'}],
  quoteLabel:'SEAN DUFFY · NASA ADMIN',quoteKo:'"극단적 자본화된 Elon에 절대 반대 마라"',quoteEn:'"Never bet against an extremely well capitalized Elon"',
  source:'Source: Sawyer Merritt · Moonshots pod · 2026.07.27',
  noteHead:'Why: Explicit endorsement from a top government agency head · softens policy risk',noteSub:'Watch: NASA contract expansion · Artemis program SPCX role · policy alignment',footer:'SPCX · NASA Admin bull',brand:BE}},

// 13. GOOGL × CMCSA - YouTube TV × Peacock 딜
{file:'googl-cmcsa-youtubetv-peacock',symbol:'GOOGL',
 ko:{title:'GOOGL × CMCSA — YouTube TV × Peacock 신규 딜 · 라이브 스포츠 포함',heroIcon:'📺',heroBig:'DEAL',heroSub:'Google($GOOGL) 소유 YouTube TV와 Comcast($CMCSA) 소유 Peacock이 딜 체결 · Peacock 콘텐츠 전체(라이브 스포츠 포함)가 내년 초부터 YouTube Premium 구독자에게 제공',
  cards:[{icon:'📺',big:'YouTube TV',mid:'라이브 스포츠 확대',sub:'Peacock 콘텐츠 전체'},{icon:'🏈',big:'라이브 스포츠',mid:'포함',sub:'프리미엄 확장'},{icon:'📅',big:'내년 초',mid:'서비스 시작',sub:'US 시장'}],
  quoteLabel:'EVAN · CNBC',quoteKo:'"YouTube TV와 Peacock 딜 · Peacock 전체 콘텐츠·라이브 스포츠 포함 YouTube Premium 제공"',quoteEn:'"YouTube TV and Peacock deal · all Peacock content including live sports to YouTube Premium"',
  source:'출처: Evan · CNBC · 2026.07.27',
  noteHead:'왜 중요한가: GOOGL의 미디어 유통 파워 강화·CMCSA의 콘텐츠 유통 확대',noteSub:'앞으로 볼 것: 서비스 시작 후 구독자 증가·다른 스트리밍 파트너십 확대',footer:'GOOGL × CMCSA',brand:BK},
 en:{title:'GOOGL × CMCSA — YouTube TV × Peacock New Deal · Live Sports Included',heroIcon:'📺',heroBig:'DEAL',heroSub:'Google ($GOOGL) YouTube TV and Comcast ($CMCSA) Peacock sign a deal · all Peacock content including live sports available to YouTube Premium subscribers in US early next year',
  cards:[{icon:'📺',big:'YouTube TV',mid:'Live sports expansion',sub:'all Peacock content'},{icon:'🏈',big:'Live sports',mid:'Included',sub:'premium expansion'},{icon:'📅',big:'Early next year',mid:'Service start',sub:'US market'}],
  quoteLabel:'EVAN · CNBC',quoteKo:'"YouTube TV × Peacock 딜"',quoteEn:'"YouTube TV and Peacock deal · all Peacock content including live sports to YouTube Premium"',
  source:'Source: Evan · CNBC · 2026.07.27',
  noteHead:'Why: GOOGL media-distribution power strengthens · CMCSA content-distribution expansion',noteSub:'Watch: subscriber growth post-launch · additional streaming partnerships',footer:'GOOGL × CMCSA',brand:BE}},

// 14. 매크로 - 반도체 밸류 닷컴 버블 초과
{file:'macro-semi-valuation-dotcom-plus',symbol:'MACRO',
 ko:{title:'매크로 — 반도체 밸류에이션이 닷컴 버블 정점 초과',heroIcon:'📊',heroBig:'> DOT-COM',heroSub:'Charlie Bilello: 반도체 회사들의 밸류에이션이 이제 닷컴 버블 정점보다 높은 수준 · AI가 혁명적이더라도 지불하는 가격이 여전히 중요',
  cards:[{icon:'📊',big:'닷컴 초과',mid:'반도체 밸류',sub:'2000 정점 대비'},{icon:'⚠️',big:'가격 리스크',mid:'AI 혁명 별개',sub:'valuation matters'},{icon:'📉',big:'조정 리스크',mid:'과열 신호',sub:'BRK 대기·숏 15년 최고'}],
  quoteLabel:'CHARLIE BILELLO',quoteKo:'"AI는 혁명적일 수 있지만, 지불하는 가격이 여전히 중요하다"',quoteEn:'"AI may be revolutionary, but the price you pay still matters"',
  source:'출처: Charlie Bilello · 2026.07.27',
  noteHead:'왜 중요한가: BRK 대기·숏 15년 최고와 결합해 시장 밸류에이션 부담 신호',noteSub:'앞으로 볼 것: NVDA·AMD 실적·CAPEX 사이클 지속 가능성',footer:'MACRO · Semi > dot-com',brand:BK},
 en:{title:'MACRO — Chipmaker Valuations Now Above Dot-Com Peak',heroIcon:'📊',heroBig:'> DOT-COM',heroSub:'Charlie Bilello: chipmaker valuations are now higher than they were at the peak of the dot-com bubble · AI may be revolutionary but price paid still matters',
  cards:[{icon:'📊',big:'> Dot-com',mid:'Semi valuation',sub:'vs 2000 peak'},{icon:'⚠️',big:'Price risk',mid:'AI revolution aside',sub:'valuation matters'},{icon:'📉',big:'Correction risk',mid:'Overheating signal',sub:'BRK cash + shorts 15y high'}],
  quoteLabel:'CHARLIE BILELLO',quoteKo:'"AI는 혁명적일 수 있지만 지불 가격이 중요"',quoteEn:'"AI may be revolutionary, but the price you pay still matters"',
  source:'Source: Charlie Bilello · 2026.07.27',
  noteHead:'Why: Combines with BRK cash pile and 15-year-high short interest to signal valuation stress',noteSub:'Watch: NVDA/AMD prints · sustainability of CAPEX cycle',footer:'MACRO · Semi > dot-com',brand:BE}},

// 15. 매크로 - S&P 500 vs M2 = 닷컴 정점 수준
{file:'macro-spx-m2-dotcom-level',symbol:'MACRO',
 ko:{title:'매크로 — S&P 500 vs M2 Money Supply 비율 = 닷컴 정점 수준',heroIcon:'⚠️',heroBig:'= 2000 정점',heroSub:'Barchart: S&P 500 대 M2 통화공급 비율이 이제 닷컴 버블 정점을 표시한 것과 정확히 동일한 수준에 도달',
  cards:[{icon:'📊',big:'S&P/M2',mid:'닷컴 정점 = 현재',sub:'통화 대비 지수 비율'},{icon:'📅',big:'2000',mid:'닷컴 정점',sub:'참조 시점'},{icon:'⚠️',big:'경고',mid:'과열 시그널',sub:'조정 리스크 축적'}],
  quoteLabel:'BARCHART',quoteKo:'"S&P 500 대 M2 통화공급 비율이 닷컴 버블 정점과 같은 수준"',quoteEn:'"S&P 500 vs M2 Money Supply just hit the exact same level that marked the peak of the Dot Com Bubble"',
  source:'출처: Barchart · 2026.07.27',
  noteHead:'왜 중요한가: 반도체 밸류 초과·숏 15년 최고와 동시 발생하는 매크로 경고',noteSub:'앞으로 볼 것: Fed 유동성 흐름·M2 방향·지수 조정 시점',footer:'MACRO · S&P/M2 dot-com',brand:BK},
 en:{title:'MACRO — S&P 500 vs M2 Money Supply = Dot-Com Peak Level',heroIcon:'⚠️',heroBig:'= 2000 peak',heroSub:'Per Barchart: S&P 500 vs M2 Money Supply ratio just hit the exact same level that marked the peak of the Dot Com Bubble',
  cards:[{icon:'📊',big:'S&P/M2',mid:'Dot-com peak = now',sub:'index/money ratio'},{icon:'📅',big:'2000',mid:'Dot-com peak',sub:'reference point'},{icon:'⚠️',big:'Warning',mid:'Overheating signal',sub:'correction risk accumulates'}],
  quoteLabel:'BARCHART',quoteKo:'"S&P 500 대 M2 비율 = 닷컴 정점"',quoteEn:'"S&P 500 vs M2 Money Supply just hit the exact same level that marked the peak of the Dot Com Bubble"',
  source:'Source: Barchart · 2026.07.27',
  noteHead:'Why: Concurrent macro warning with semi valuation and 15-year-high shorts',noteSub:'Watch: Fed liquidity flow · M2 direction · index correction timing',footer:'MACRO · S&P/M2 dot-com',brand:BE}},

// 16. 매크로 - JPMorgan bullish 전환
{file:'macro-jpmorgan-bullish',symbol:'MACRO',
 ko:{title:'매크로 — JPMorgan 강세 전환 · S&P 500 upside 신호',heroIcon:'📈',heroBig:'BUY',heroSub:'JPMorgan 전술 포지셔닝 미터가 매수 신호 · S&P 500 upside 기대 · 낮은 채권 수익률·달러 약세·안정 Fed·강한 실적 조합 · 다만 심리·포지션 여전히 lofty',
  cards:[{icon:'🏦',big:'JPM',mid:'전술 매수 시그널',sub:'포지셔닝 미터'},{icon:'📈',big:'Upside',mid:'S&P 500 예상',sub:'낮은 채권·달러 조합'},{icon:'⚠️',big:'리스크',mid:'심리·미-이란',sub:'양방향 가능'}],
  quoteLabel:'WALTER BLOOMBERG',quoteKo:'"JPMorgan 전술 포지셔닝 미터가 매수 신호로 S&P 500 upside 기대"',quoteEn:'"JPMorgan tactical positioning meter is flashing a buy signal, pointing to S&P 500 upside"',
  source:'출처: Walter Bloomberg · JPMorgan · 2026.07.27',
  noteHead:'왜 중요한가: 반도체 밸류·M2 경고와 대조되는 대형 하우스 강세',noteSub:'앞으로 볼 것: Fed 톤·미-이란 tension·실 채권 수익률 흐름',footer:'MACRO · JPM bullish',brand:BK},
 en:{title:'MACRO — JPMorgan Turns Bullish · S&P 500 Upside Signal',heroIcon:'📈',heroBig:'BUY',heroSub:'JPMorgan tactical positioning meter flashes a buy signal · S&P 500 upside expected · combo of lower bond yields, weaker dollar, steady Fed, strong earnings · but sentiment/positioning lofty',
  cards:[{icon:'🏦',big:'JPM',mid:'Tactical buy',sub:'positioning meter'},{icon:'📈',big:'Upside',mid:'S&P 500 est',sub:'low yields + weak USD'},{icon:'⚠️',big:'Risks',mid:'Sentiment · US-Iran',sub:'two-way possible'}],
  quoteLabel:'WALTER BLOOMBERG',quoteKo:'"JPM 포지셔닝 매수 신호 · S&P 500 upside"',quoteEn:'"JPMorgan tactical positioning meter is flashing a buy signal, pointing to S&P 500 upside"',
  source:'Source: Walter Bloomberg · JPMorgan · 2026.07.27',
  noteHead:'Why: Large-house bull view contrasting with semi valuation and M2 warnings',noteSub:'Watch: Fed tone · US-Iran tension · actual yield flow',footer:'MACRO · JPM bullish',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260728.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260728-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
