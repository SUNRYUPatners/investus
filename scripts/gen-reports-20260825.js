// 2026-08-25 리포트 SVG 생성기 · 12 topics · 한장요약은 수동 리스트형 유지
//
// ⚠️ 다음날(08-25~): 문장 + 합니다체. Cosmos Europa 등 출처 이름 없이 내용만.
//   quote: 2~4줄 (무슨 일 + 어디/누구 + 숫자 + 용어 한 줄 풀이). 한 줄 헤드라인만 금지.
//   noteHead/noteSub: 「왜 중요한가」+ 초보용 2~3문장 (왜 뉴스 → 뭐가 다른지 → 다음에 볼 것).
//   글이 늘면 quote/note 박스 높이·multilineIfOverflow maxLines를 먼저 늘릴 것.
//   상세: .cursor/skills/investus-report-update/SKILL.md 「SVG 카피 밀도」
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.25';
const DATETAG = '20260825';

const PSYM = {
  TSLA: { fg:'#4ade80', fg2:'#22c55e', bg2:'#061209', card:'#0a1a0a' },
  NVDA: { fg:'#60a5fa', fg2:'#3b82f6', bg2:'#06121f', card:'#0a1420' },
  SPCX: { fg:'#c084fc', fg2:'#a78bfa', bg2:'#140b1f', card:'#1a0f2a' },
  GOOGL:{ fg:'#4285f4', fg2:'#34a853', bg2:'#06121f', card:'#0a1420' },
  MSFT: { fg:'#00a4ef', fg2:'#0078d4', bg2:'#061219', card:'#0a1520' },
  META: { fg:'#1877f2', fg2:'#1266d6', bg2:'#050c19', card:'#0a1420' },
  AMZN: { fg:'#ff9900', fg2:'#e58600', bg2:'#1a0e00', card:'#201408' },
  AAPL: { fg:'#a1a1aa', fg2:'#71717a', bg2:'#0f0f10', card:'#141416' },
  MACRO:{ fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
  SPX:  { fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
  BE:   { fg:'#f59e0b', fg2:'#d97706', bg2:'#1a1205', card:'#201408' },
};

function esc(s){return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g,'&amp;').replace(/</g,'&lt;');}
function E(o){const r={};for(const k in o)r[k]=typeof o[k]==='string'?esc(o[k]):o[k];return r;}

function estimatePxWidth(text, fontSize, isBold){
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

function multilineIfOverflow(text, x, y, fontSize, maxPxWidth, maxLines, lh, attrs){
  const isBold = /font-weight="?(bold|[89]00)/i.test(attrs) || /Arial Black/.test(attrs);
  const est = (t) => estimatePxWidth(t, fontSize, isBold);
  const px = est(text);
  if(px <= maxPxWidth){
    return `  <text x="${x}" y="${y}" ${attrs}>${esc(text)}</text>`;
  }
  const rawParts = String(text).split(/(\s·\s|\s—\s|·|—)/).filter(p=>p!==undefined&&p!=='');
  const parts = [];
  for(const p of rawParts){
    if(est(p) <= maxPxWidth){ parts.push(p); continue; }
    const subs = p.split(/(\s+)/).filter(s=>s!=='');
    for(const s of subs){
      if(est(s) <= maxPxWidth){ parts.push(s); continue; }
      let tmp = s;
      while(est(tmp) > maxPxWidth){
        let cutAt = 1;
        while(cutAt < tmp.length && est(tmp.slice(0, cutAt+1)) <= maxPxWidth) cutAt++;
        parts.push(tmp.slice(0, cutAt));
        tmp = tmp.slice(cutAt);
      }
      if(tmp) parts.push(tmp);
    }
  }
  const lines=[]; let cur='';
  for(const p of parts){
    const test = cur + p;
    if(est(test) <= maxPxWidth) cur = test;
    else{
      if(cur.trim()) lines.push(cur.trim());
      cur = p.replace(/^[·—\s]+/,'').trim();
      if(lines.length >= maxLines) break;
    }
  }
  if(cur.trim() && lines.length < maxLines){
    if(est(cur) > maxPxWidth){
      let cutAt = 1;
      while(cutAt < cur.length && est(cur.slice(0, cutAt+1) + '…') <= maxPxWidth) cutAt++;
      cur = cur.slice(0, cutAt) + '…';
    }
    lines.push(cur);
  }
  return lines.slice(0, maxLines).map((l,i) =>
    `  <text x="${x}" y="${y+i*lh}" ${attrs}>${esc(l)}</text>`
  ).join('\n');
}

const F = {
  TITLE: 28, HERO_BIG: 42, HERO_SUB: 20,
  QUOTE_KO: 19, QUOTE_EN: 16,
  NOTE_HEAD: 18, NOTE_SUB: 16,
  CARD_BIG: 22, CARD_MID: 18, CARD_SUB: 16
};
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
  <rect x="60" y="630" width="960" height="200" rx="16" fill="#0f172a" stroke="#374151"/>
${multilineIfOverflow(oRaw.quote, 540, 688, F.QUOTE_KO, MAX_W.WIDE, 5, 26, `font-family="Arial" font-size="${F.QUOTE_KO}" fill="${p.fg}" text-anchor="middle"`)}
  <text x="540" y="818" font-family="Arial" font-size="15" fill="#6b7280" text-anchor="middle">${o.dateLabel||DATE}</text>
  <rect x="60" y="838" width="960" height="140" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1"/>
${multilineIfOverflow(oRaw.noteHead, 540, 868, F.NOTE_HEAD, MAX_W.WIDE, 2, 24, `font-family="Arial" font-size="${F.NOTE_HEAD}" fill="${p.fg}" text-anchor="middle"`)}
${multilineIfOverflow(oRaw.noteSub, 540, 910, F.NOTE_SUB, MAX_W.WIDE, 3, 22, `font-family="Arial" font-size="${F.NOTE_SUB}" fill="#9ca3af" text-anchor="middle"`)}
  <text x="540" y="994" font-family="Arial" font-size="16" fill="#374151" text-anchor="middle">${o.footer} · ${DATE}</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#g)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${o.brand}</text>
</svg>`;
}

const BK='INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE';
const BE='INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE';

function summarySvg(lang){
  const ko = lang==='ko';
  const brand = ko ? 'investus.kr SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE' : 'investus.kr SRP Chief Investment Officer · NOT FINANCIAL ADVICE';
  const title = ko ? `${DATE} · 오늘의 한장 요약` : `${DATE} · Daily Snapshot`;
  const heroSub1 = ko
    ? 'Cybercab 09.03 Austin · 4680 캐소드 북미 · 시내 로밍'
    : 'Cybercab 09.03 Austin · 4680 NA cathode · city roaming';
  const heroSub2 = ko
    ? 'DB ARR $98.1B · Starlink 11,040 · NVDA $6B Poolside · 30Y 5.27%'
    : 'DB ARR $98.1B · Starlink 11,040 · NVDA $6B Poolside · 30Y 5.27%';
  const c = [
    {icon:'🚕', big: ko?'09.03.26':'09.03.26', mid: ko?'Cybercab 이벤트':'Cybercab event', sub: ko?'Austin, TX 전용 초대':'Austin TX exclusive', stroke:'#4ade80', card:'#0a1a0a'},
    {icon:'🔋', big: ko?'4680':'4680', mid: ko?'북미 첫 대형 캐소드':'First large NA cathode', sub: ko?'Austin · 건식 코팅':'Austin · dry coating', stroke:'#4ade80', card:'#0a1a0a'},
    {icon:'📡', big: '$98.1B', mid: ko?'DB 연말 ARR 전망':'DB year-end ARR', sub: ko?'Neocloud $48B':'Neocloud $48B', stroke:'#c084fc', card:'#1a0f2a'},
    {icon:'🛰️', big: '11,040', mid: ko?'Starlink 가동 위성':'Starlink working sats', sub: ko?'다음 9개 LEO 합 >5배':'Next 9 LEO >5x', stroke:'#c084fc', card:'#1a0f2a'},
    {icon:'🧠', big: '$6B', mid: ko?'Nvidia×Poolside':'Nvidia×Poolside', sub: ko?'Nemotron·오픈웨이트':'Nemotron open-weight', stroke:'#60a5fa', card:'#0a1220'},
    {icon:'📉', big: '5.27%', mid: ko?'30Y 주간 종가':'30Y weekly close', sub: ko?'2007년 6월 이후 최고':'Highest since Jun 2007', stroke:'#94a3b8', card:'#111827'},
  ];
  const extra1 = ko
    ? 'Citizens ~87% IRR · WSJ FSD Model Y · Austin 심야 로밍 · natgas 트레이딩 데스크'
    : 'Citizens ~87% IRR · WSJ FSD Model Y · Austin night roaming · natgas trading desk';
  const extra2 = ko
    ? 'NVDA 15%+ 가격인상 · Trump SPCX $15k–$50k · Ship 41 · 수 PCE+GDP · 금 Warsh'
    : 'NVDA 15%+ AI price hike · Trump SPCX $15k–$50k · Ship 41 · Wed PCE+GDP · Fri Warsh';
  const topCards = c.slice(0,3).map((x,i)=>{
    const xpos=[60,390,720][i];
    return `
  <rect x="${xpos}" y="402" width="300" height="220" rx="16" fill="${x.card}" stroke="${x.stroke}" stroke-width="2"/>
  <text x="${xpos+150}" y="450" font-family="Arial" font-size="36" text-anchor="middle">${x.icon}</text>
  <text x="${xpos+150}" y="494" font-family="Arial Black,Arial" font-size="22" font-weight="900" fill="${x.stroke}" text-anchor="middle">${esc(x.big)}</text>
  <text x="${xpos+150}" y="530" font-family="Arial" font-size="18" fill="#9ca3af" text-anchor="middle">${esc(x.mid)}</text>
  <text x="${xpos+150}" y="590" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">${esc(x.sub)}</text>`;
  }).join('');
  const botCards = c.slice(3,6).map((x,i)=>{
    const xpos=[60,390,720][i];
    return `
  <rect x="${xpos}" y="642" width="300" height="180" rx="16" fill="${x.card}" stroke="${x.stroke}" stroke-width="2"/>
  <text x="${xpos+150}" y="694" font-family="Arial" font-size="36" text-anchor="middle">${x.icon}</text>
  <text x="${xpos+150}" y="738" font-family="Arial Black,Arial" font-size="22" font-weight="900" fill="${x.stroke}" text-anchor="middle">${esc(x.big)}</text>
  <text x="${xpos+150}" y="768" font-family="Arial" font-size="18" fill="#9ca3af" text-anchor="middle">${esc(x.mid)}</text>
  <text x="${xpos+150}" y="796" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">${esc(x.sub)}</text>`;
  }).join('');
  return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0d1117"/><stop offset="100%" style="stop-color:#061209"/></linearGradient>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#4ade80"/><stop offset="100%" style="stop-color:#22c55e"/></linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <rect width="1080" height="1080" fill="none" stroke="#1f2937" stroke-width="2"/>
  <rect x="0" y="0" width="1080" height="5" fill="url(#g)"/>
  <rect x="40" y="20" width="150" height="38" rx="19" fill="rgba(74,222,128,.18)" stroke="#4ade80" stroke-width="1.5"/>
  <text x="115" y="44" font-family="Arial Black,Arial" font-size="16" font-weight="900" fill="#4ade80" text-anchor="middle">DAILY</text>
  <text x="540" y="46" font-family="Arial" font-size="13" fill="#6b7280" text-anchor="middle" letter-spacing="3">INVESTUS DAILY REPORT</text>
  <rect x="900" y="20" width="148" height="38" rx="19" fill="#1f2937" stroke="#374151"/>
  <text x="974" y="44" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle">${DATE}</text>
  <text x="540" y="108" font-family="Arial Black,Arial" font-size="28" font-weight="900" fill="#f9fafb" text-anchor="middle">${esc(title)}</text>
  <line x1="80" y1="150" x2="1000" y2="150" stroke="#1f2937" stroke-width="1"/>
  <text x="540" y="240" font-family="Arial Black,Arial" font-size="90" font-weight="900" fill="#4ade80" text-anchor="middle" opacity=".15">14</text>
  <text x="540" y="240" font-family="Arial Black,Arial" font-size="70" font-weight="900" fill="#4ade80" text-anchor="middle">TOP 14</text>
  <text x="540" y="300" font-family="Arial Black,Arial" font-size="24" font-weight="900" fill="#f9fafb" text-anchor="middle">${esc(heroSub1)}</text>
  <text x="540" y="342" font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle">${esc(heroSub2)}</text>
  <line x1="80" y1="390" x2="1000" y2="390" stroke="#1f2937" stroke-width="1"/>
${topCards}
${botCards}
  <rect x="60" y="842" width="960" height="120" rx="16" fill="#0f172a" stroke="#374151"/>
  <text x="540" y="880" font-family="Arial" font-size="18" fill="#6b7280" text-anchor="middle" letter-spacing="2">EXTRA COVERAGE</text>
  <text x="540" y="912" font-family="Arial" font-size="17" fill="#e5e7eb" text-anchor="middle">${esc(extra1)}</text>
  <text x="540" y="940" font-family="Arial" font-size="17" fill="#e5e7eb" text-anchor="middle">${esc(extra2)}</text>
  <text x="540" y="994" font-family="Arial" font-size="16" fill="#374151" text-anchor="middle">INVESTUS · TOP 14 STORIES · ${DATE}</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#g)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${esc(brand)}</text>
</svg>`;
}

const T=[
{file:'tsla-germany-robotaxi-talks',symbol:'TSLA',
 ko:{title:'독일의 한 주가 외딴 지역에 테슬라 로보택시를 넣는 방안을 협의합니다',heroIcon:'🚕',heroBig:'독일',heroSub:'교통 장관이 밝힌 내용은 특정 주의 원격 지역에 테슬라 로보택시를 시범 운행하는 협의입니다. 로보택시는 기사 없이 소프트웨어가 운전하는 호출 차량입니다. 어느 주인지는 이 발표만으로 확정되지 않습니다.',
  cards:[{icon:'🇩🇪',big:'협의',mid:'주 정부와 테슬라',sub:'원격 지역'},{icon:'🗣️',big:'장관',mid:'로버트 크룸바흐',sub:'교통 당국'},{icon:'🚕',big:'시범',mid:'로보택시',sub:'상용 확정은 아님'}],
  quote:'"독일 교통 당국은 한 주가 외딴 지역에 테슬라 로보택시를 넣는 방안을 협의 중이라고 했습니다. 로보택시는 기사가 없는 호출 차량입니다. 도시 중심부가 아니라 대중교통이 얇은 곳을 겨냥한 이야기입니다. 허가와 노선은 아직 확정되지 않았습니다."',
  noteHead:'왜 중요한가',noteSub:'유럽에서 로보택시가 뉴스이면 보통 대도시입니다. 이번에는 원격 지역이라 규제·보험·통신 조건이 다릅니다. 협의는 운행 개시가 아닙니다. 다음엔 주 이름·시험 대수·유료 여부를 확인하면 됩니다.',footer:'TSLA · 독일 로보택시 협의',brand:BK},
 en:{title:'A German state is in talks to put Tesla robotaxis in remote regions',heroIcon:'🚕',heroBig:'Germany',heroSub:'The transport minister said a state is talking with Tesla about robotaxis in remote areas. A robotaxi is a ride-hail car driven by software, not a human driver. Which state is not confirmed by this remark alone.',
  cards:[{icon:'🇩🇪',big:'Talks',mid:'State and Tesla',sub:'Remote regions'},{icon:'🗣️',big:'Minister',mid:'Robert Crumbach',sub:'Transport'},{icon:'🚕',big:'Pilot',mid:'Robotaxi',sub:'Not commercial yet'}],
  quote:'"German transport officials said a state is in talks to deploy Tesla robotaxis in remote regions. A robotaxi is driverless ride-hail. The target is thin public transit, not a downtown showcase. Permits and routes are not locked."',
  noteHead:'Why this matters',noteSub:'European robotaxi news usually means big cities. Remote regions change insurance, comms, and regulation. Talks are not service launch. Next: the state name, test fleet size, and whether rides are paid.',footer:'TSLA · Germany robotaxi talks',brand:BE}},

{file:'tsla-cybercab-giga-ship-0903',symbol:'TSLA',
 ko:{title:'기가 텍사스에서 사이버캡이 대량 출고되고, 9월 3일 행사가 남았습니다',heroIcon:'🚕',heroBig:'9/3',heroSub:'사이버캡은 운전석을 없앤 전용 로보택시입니다. 공장 주차장에서 차량이 나가고 있고, 오스틴 공개 행사는 9월 3일입니다. 출고는 양산 신호가 될 수 있지만, 유료 승객 개시일과는 다릅니다.',
  cards:[{icon:'📅',big:'9/3',mid:'오스틴 행사',sub:'2026년 9월 3일'},{icon:'🏭',big:'출고',mid:'기가 텍사스',sub:'전용 로보택시'},{icon:'🚕',big:'전용차',mid:'운전석 없음',sub:'모델Y 개조 아님'}],
  quote:'"기가 텍사스 부지에서 사이버캡이 대량으로 나가고 있습니다. 사이버캡은 모델Y에 소프트웨어만 얹은 차가 아니라, 처음부터 무인용으로 만든 차입니다. 9월 3일 오스틴 행사가 캘린더에 남아 있습니다. 출고 대수 공식 공시는 이 화면에 없습니다."',
  noteHead:'왜 중요한가',noteSub:'초대장만 있을 때와 달리 공장에서 차가 움직입니다. 전용 폼팩터 양산이 보이면 원가 논쟁의 전제가 바뀝니다. 다음엔 행사에서 시승·가격·양산 코멘트가 나오는지를 보면 됩니다.',footer:'TSLA · 사이버캡 출고 · 9/3',brand:BK},
 en:{title:'Cybercabs are shipping from Giga Texas ahead of the September 3 event',heroIcon:'🚕',heroBig:'9/3',heroSub:'Cybercab is a dedicated robotaxi with no driver seat. Vehicles are leaving the Giga Texas lot, and the Austin event is September 3. Shipping can signal production, but it is not a paid-service start date.',
  cards:[{icon:'📅',big:'9/3',mid:'Austin event',sub:'September 3, 2026'},{icon:'🏭',big:'Shipping',mid:'Giga Texas',sub:'Dedicated robotaxi'},{icon:'🚕',big:'No wheel',mid:'Purpose-built',sub:'Not a Model Y conversion'}],
  quote:'"Cybercabs are leaving the Giga Texas lot in volume. Cybercab is purpose-built for unmanned rides, not a software-upgraded Model Y. The Austin event remains September 3. Official unit counts are not on this screen."',
  noteHead:'Why this matters',noteSub:'Cars moving off the lot are a step beyond invite graphics. Dedicated production changes the unit-cost debate. Next: rides, price, and production comments at the event.',footer:'TSLA · Cybercab shipping · 9/3',brand:BE}},

{file:'tsla-giga-texas-switchyard-power',symbol:'TSLA',
 ko:{title:'기가 텍사스 변전 설비가 약 아홉 달 만에 올라와 공장 전력을 받칩니다',heroIcon:'⚡',heroBig:'9개월',heroSub:'스위치야드는 고압 전력을 공장에 나누어 주는 변전 설비입니다. 오스틴 기가팩토리와 코텍스 인공지능 클러스터의 전력이 이 축에 묶입니다. 로보택시·학습용 컴퓨터는 둘 다 전기가 먼저입니다.',
  cards:[{icon:'⚡',big:'~9개월',mid:'스위치야드',sub:'건설 기간'},{icon:'🏭',big:'기가',mid:'텍사스 공장',sub:'생산 전력'},{icon:'🧠',big:'코텍스',mid:'1·2 전력',sub:'학습 클러스터'}],
  quote:'"기가 텍사스에 스위치야드가 약 아홉 달 만에 올라왔다는 설명이 나왔습니다. 스위치야드는 공장과 데이터 학습 단지에 고압 전기를 나누는 설비입니다. 코텍스 1과 2의 전력이 같은 이야기에 붙습니다. 허가만 있고 전력이 없으면 차는 못 뽑습니다."',
  noteHead:'왜 중요한가',noteSub:'사이버캡 출고와 같은 주에 전력 병목이 풀리는 그림입니다. AI 학습과 차량 생산이 같은 부지를 씁니다. 다음엔 실제 수전 용량과 가동률을 보면 됩니다.',footer:'TSLA · 기가텍사스 전력',brand:BK},
 en:{title:'Giga Texas switchyard power came up in about nine months',heroIcon:'⚡',heroBig:'9 mo',heroSub:'A switchyard splits high-voltage power into the plant. Austin production and the Cortex AI clusters sit on that power spine. Robotaxis and training computers both need electricity first.',
  cards:[{icon:'⚡',big:'~9 mo',mid:'Switchyard',sub:'Build window'},{icon:'🏭',big:'Giga',mid:'Texas plant',sub:'Production power'},{icon:'🧠',big:'Cortex',mid:'1 and 2',sub:'Training clusters'}],
  quote:'"The Giga Texas switchyard is described as coming up in about nine months. A switchyard feeds high-voltage power into the factory and training campus. Cortex 1 and 2 are in the same power story. Permits without megawatts do not build cars."',
  noteHead:'Why this matters',noteSub:'Power relief lands in the same week as Cybercab shipping. Training compute and vehicle output share a site. Next: actual interconnection capacity and utilization.',footer:'TSLA · Giga Texas power',brand:BE}},

{file:'nvda-pt-325-earnings-week',symbol:'NVDA',
 ko:{title:'엔비디아 실적 주간에 목표주가 325달러 전망이 나왔습니다',heroIcon:'💹',heroBig:'$325',heroSub:'증권사가 매수 의견을 유지하고 목표주가를 325달러로 제시했습니다. 매출과 이익, 다음 분기 가이던스가 시장 예상을 넘을 것이라는 전제입니다. 화면 위젯은 약 208.48달러, 하루 −2.91%였습니다.',
  cards:[{icon:'🎯',big:'$325',mid:'목표가',sub:'매수 의견'},{icon:'📊',big:'실적',mid:'이번 주',sub:'매출·이익·가이던스'},{icon:'📉',big:'$208.48',mid:'화면 가격',sub:'하루 −2.91%'}],
  quote:'"엔비디아 실적을 앞두고 목표주가 325달러가 제시됐습니다. 가이던스는 회사가 다음 분기에 얼마나 팔겠다고 미리 말하는 숫자입니다. 전제는 매출·이익과 3분기 가이던스가 예상을 넘는 것입니다. 같은 화면 가격은 약 208.48달러였습니다."',
  noteHead:'왜 중요한가',noteSub:'목표가는 의견이지 확정이 아닙니다. 실적 주간에는 숫자보다 가이던스 톤이 주가를 더 흔듭니다. 다음엔 데이터센터 매출과 공급 코멘트를 보면 됩니다.',footer:'NVDA · 목표가 325달러',brand:BK},
 en:{title:'A $325 Nvidia price target landed in earnings week',heroIcon:'💹',heroBig:'$325',heroSub:'A broker kept a buy rating and set a $325 target. The case is a beat on revenue, profit, and next-quarter guidance. The on-screen quote was about $208.48, down 2.91% on the day.',
  cards:[{icon:'🎯',big:'$325',mid:'Price target',sub:'Buy rating'},{icon:'📊',big:'Print',mid:'This week',sub:'Sales · profit · guide'},{icon:'📉',big:'$208.48',mid:'On-screen',sub:'−2.91% day'}],
  quote:'"A $325 Nvidia target was published into earnings week. Guidance is the company’s own next-quarter sales outlook. The thesis is a beat on revenue, profit, and the third-quarter guide. The widget showed about $208.48."',
  noteHead:'Why this matters',noteSub:'A target is an opinion, not a print. In earnings week, guidance tone often moves the stock more than the quarter just ended. Next: datacenter revenue and supply comments.',footer:'NVDA · $325 target',brand:BE}},

{file:'nvda-vera-rubin-starmind',symbol:'NVDA',
 ko:{title:'그록용 지상 공장과 스타마인드 위성에 같은 차세대 칩 설계가 붙습니다',heroIcon:'🛰️',heroBig:'NVL72',heroSub:'베라 루빈 NVL72는 엔비디아의 차세대 가속기 랙 설계입니다. 지상에서는 그록 학습·추론에, 우주에서는 1세대 스타마인드 위성에 같은 계열을 쓰겠다는 그림입니다. 이번 주 실적에서 세부 일정이 나올 수 있습니다.',
  cards:[{icon:'🧠',big:'Grok',mid:'지상 클러스터',sub:'Vera Rubin'},{icon:'🛰️',big:'스타마인드',mid:'1세대 위성',sub:'궤도 컴퓨팅'},{icon:'📅',big:'실적',mid:'이번 주',sub:'일정 코멘트'}],
  quote:'"그록을 돌리는 지상 공장과 스타마인드라는 1세대 위성에 베라 루빈 NVL72 계열을 쓰겠다는 설명이 나왔습니다. NVL72는 여러 가속기를 한 랙처럼 묶는 설계입니다. 궤도 데이터센터는 지상 랙보다 가볍고 밀도 높게 만들겠다는 주장과 같이 갑니다. 일정은 실적 발표를 봐야 합니다."',
  noteHead:'왜 중요한가',noteSub:'칩 수요가 지구 전력망만이 아니라 위성으로 확장된다는 이야기입니다. 아직 설계·의도이지 매출 확정은 아닙니다. 다음엔 양산 시점과 우주 환경 검증을 보면 됩니다.',footer:'NVDA · 베라 루빈 · 스타마인드',brand:BK},
 en:{title:'The same next-gen chip design is framed for Grok on the ground and Starmind in orbit',heroIcon:'🛰️',heroBig:'NVL72',heroSub:'Vera Rubin NVL72 is Nvidia’s next accelerator rack design. The picture is Grok training and inference on the ground, and first-generation Starmind satellites in space. This week’s earnings may add dates.',
  cards:[{icon:'🧠',big:'Grok',mid:'Ground cluster',sub:'Vera Rubin'},{icon:'🛰️',big:'Starmind',mid:'First-gen sat',sub:'Orbital compute'},{icon:'📅',big:'Print',mid:'This week',sub:'Timing comments'}],
  quote:'"Vera Rubin NVL72 is described for Grok on the ground and first-generation Starmind satellites. NVL72 packs many accelerators like a rack. Orbital datacenters are claimed to be simpler, cheaper, denser, and lighter than a traditional rack. Dates wait on the earnings call."',
  noteHead:'Why this matters',noteSub:'Chip demand is being narrated beyond terrestrial power grids. This is design intent, not booked revenue. Next: production timing and space qualification.',footer:'NVDA · Vera Rubin · Starmind',brand:BE}},

{file:'spcx-starship-alloys-orbital-rack',symbol:'SPCX',
 ko:{title:'스타십 합금이 바뀌고, 궤도 랙은 지상보다 가볍다고 설명합니다',heroIcon:'🚀',heroBig:'합금',heroSub:'엘론 머스크는 스타십이 더 이상 301 스테인리스를 쓰지 않고 자체 합금을 쓴다고 했습니다. 궤도 데이터센터 설계는 전통 랙보다 단순하고 저렴하며 밀도 높고 가볍다고 했습니다. 합금은 재진입 열과 무게를 가르는 소재입니다.',
  cards:[{icon:'🧪',big:'자체 합금',mid:'301 스테인리스 종료',sub:'머스크 발언'},{icon:'🛰️',big:'궤도 랙',mid:'더 가볍고 밀도 높음',sub:'지상 랙 대비'},{icon:'🔥',big:'재진입',mid:'열·무게',sub:'소재가 관건'}],
  quote:'"머스크는 스타십이 301 스테인리스를 그만 쓰고 독자 합금을 쓴다고 했습니다. 같은 맥락에서 궤도 데이터센터 랙은 지상 랙보다 단순하고 저렴하며 밀도 높고 가볍다고 했습니다. 301은 흔한 스테인리스 강종입니다. 자체 합금은 공급망과 용접 공정을 바꿉니다."',
  noteHead:'왜 중요한가',noteSub:'발사체 소재가 바뀌면 양산 단가와 일정 리스크가 같이 움직입니다. 궤도 컴퓨팅은 그 로켓 위에 얹히는 수요입니다. 다음엔 합금 양산 규모와 궤도 실증을 보면 됩니다.',footer:'SPCX · 스타십 합금 · 궤도 랙',brand:BK},
 en:{title:'Starship moves off 301 stainless, and orbital racks are described as lighter than terrestrial ones',heroIcon:'🚀',heroBig:'Alloy',heroSub:'Elon Musk said Starship no longer uses 301 stainless and uses proprietary alloys. Orbital datacenter design is described as simpler, lower cost, denser, and lighter than a traditional rack. Alloy choice splits reentry heat and mass.',
  cards:[{icon:'🧪',big:'Own alloy',mid:'Off 301 stainless',sub:'Musk comment'},{icon:'🛰️',big:'Orbital rack',mid:'Lighter, denser',sub:'Vs ground rack'},{icon:'🔥',big:'Reentry',mid:'Heat and mass',sub:'Materials matter'}],
  quote:'"Musk said Starship no longer uses 301 stainless and uses proprietary alloys. He also said orbital datacenter racks can be simpler, cheaper, denser, and lighter than a traditional rack. 301 is a common stainless grade. A house alloy changes supply and welding."',
  noteHead:'Why this matters',noteSub:'A vehicle alloy shift moves unit cost and schedule risk together. Orbital compute rides on that rocket. Next: alloy scale and on-orbit proof.',footer:'SPCX · Starship alloy · orbital rack',brand:BE}},

{file:'meta-ai-infra-500b',symbol:'META',
 ko:{title:'메타가 앞으로 몇 년 동안 인공지능 인프라에 5,000억 달러 이상을 쓸 수 있습니다',heroIcon:'🏗️',heroBig:'$500B+',heroSub:'칩·전력·데이터센터에 대한 장기 지출 이야기입니다. 별도로 2024년 6월 말 분기보고서에는 취소 불가 약정이 약 149억 달러로 잡혀 있습니다. 5,000억은 다년 전망이고, 149억은 그 시점의 계약 잔액입니다.',
  cards:[{icon:'💵',big:'$500B+',mid:'다년 인프라',sub:'칩·전력·센터'},{icon:'📄',big:'~$14.9B',mid:'취소 불가 약정',sub:'2024.6.30 기준'},{icon:'📅',big:'24–25',mid:'잔여 지급',sub:'약 53억·82억'}],
  quote:'"메타가 앞으로 수년간 인공지능 인프라에 5,000억 달러 이상을 쓸 수 있다는 설명이 나왔습니다. 2024년 6월 30일 기준 분기보고서에는 클라우드·서버·데이터센터·리얼리티 랩스 관련 취소 불가 약정이 약 149억 달러로 적혀 있습니다. 남은 2024년 약 53억, 2025년 약 82억 달러입니다. 두 숫자의 기간이 다릅니다."',
  noteHead:'왜 중요한가',noteSub:'다년 전망은 수요 내러티브이고, 약정은 이미 계약된 현금 약속입니다. 혼동하면 규모를 열 배 키우게 됩니다. 다음엔 실제 자본적 지출 가이던스를 보면 됩니다.',footer:'META · AI 인프라 지출',brand:BK},
 en:{title:'Meta could spend more than $500 billion on AI infrastructure over coming years',heroIcon:'🏗️',heroBig:'$500B+',heroSub:'This is a multi-year chip, power, and datacenter story. Separately, the June 30, 2024 10-Q showed about $14.9 billion of non-cancelable commitments. $500 billion is a horizon; $14.9 billion is contracted residual at that date.',
  cards:[{icon:'💵',big:'$500B+',mid:'Multi-year infra',sub:'Chips · power · DCs'},{icon:'📄',big:'~$14.9B',mid:'Non-cancelable',sub:'As of Jun 30, 2024'},{icon:'📅',big:'24–25',mid:'Remaining pay',sub:'~$5.4B · ~$8.2B'}],
  quote:'"Meta is described as able to spend more than $500 billion on AI infrastructure over coming years. The June 30, 2024 quarterly filing listed about $14.9 billion of non-cancelable commitments for cloud, servers, datacenters, and Reality Labs. Remainder 2024 about $5.4 billion; 2025 about $8.2 billion. The two figures cover different clocks."',
  noteHead:'Why this matters',noteSub:'The multi-year figure is a demand narrative; commitments are contracted cash. Mixing them inflates scale by about ten times. Next: actual capex guidance.',footer:'META · AI infra spend',brand:BE}},

{file:'amzn-zoox-sf-vegas',symbol:'AMZN',
 ko:{title:'아마존 주스가 샌프란시스코 거리를 달리고, 라스베이거스에서는 유료입니다',heroIcon:'🚌',heroBig:'Zoox',heroSub:'주스는 핸들·계기판·페달이 없는 양방향 로보택시입니다. 승객 네 명이 마주 앉습니다. 샌프란시스코는 도로 운행, 라스베이거스는 유료 호출입니다.',
  cards:[{icon:'🌉',big:'SF',mid:'시내 운행',sub:'핸들 없음'},{icon:'🎰',big:'Vegas',mid:'유료 호출',sub:'상용 요금'},{icon:'👥',big:'4인',mid:'마주 앉기',sub:'양방향 차체'}],
  quote:'"아마존의 주스가 샌프란시스코 거리를 달리고, 라스베이거스에서는 돈을 받고 태운다는 설명이 나왔습니다. 핸들과 페달이 없고 앞뒤가 같은 모양입니다. 네 명이 마주 앉습니다. 테슬라 사이버캡과 다른 폼팩터의 경쟁입니다."',
  noteHead:'왜 중요한가',noteSub:'로보택시 시장이 한 회사 전유가 아니라는 현장입니다. 유료 도시는 유닛 이코노믹스를 검증하는 단계입니다. 다음엔 운행 시간·사고·확대 도시를 보면 됩니다.',footer:'AMZN · 주스 SF·Vegas',brand:BK},
 en:{title:'Amazon Zoox is on San Francisco streets and charging for rides in Las Vegas',heroIcon:'🚌',heroBig:'Zoox',heroSub:'Zoox is a bidirectional robotaxi with no wheel, dash, or pedals. Four passengers sit facing one another. San Francisco is street running; Las Vegas is paid hail.',
  cards:[{icon:'🌉',big:'SF',mid:'City streets',sub:'No steering wheel'},{icon:'🎰',big:'Vegas',mid:'Paid rides',sub:'Commercial fares'},{icon:'👥',big:'4 pax',mid:'Face to face',sub:'Bidirectional body'}],
  quote:'"Amazon Zoox is described on San Francisco streets and as a paid service in Las Vegas. There is no wheel or pedals, and both ends look the same. Four people sit facing each other. It is a different form factor from Tesla Cybercab."',
  noteHead:'Why this matters',noteSub:'Robotaxi is not a single-company street. A paid city is where unit economics get tested. Next: hours, incidents, and new cities.',footer:'AMZN · Zoox SF · Vegas',brand:BE}},

{file:'msft-openai-agents-20m',symbol:'MSFT',
 ko:{title:'챗지피티 업무용 에이전트 주간 사용자가 약 2,000만 명까지 늘었습니다',heroIcon:'🤖',heroBig:'20M',heroSub:'주간 활성 사용자(WAU)는 일주일 동안 한 번이라도 쓴 사람 수입니다. 1월 1일 약 20만, 7월 12일 약 600만, 8월 19일 약 2,000만입니다. 챗지피티 워크 출시 이후 기업 판매가 50% 이상, 전체 성장이 분기 초 대비 약 35% 빨라졌다는 설명입니다.',
  cards:[{icon:'📈',big:'20M',mid:'8월 19일 WAU',sub:'에이전트'},{icon:'🏢',big:'+50%+',mid:'기업 판매',sub:'워크 이후'},{icon:'📊',big:'+35%',mid:'전체 성장',sub:'분기 초 대비'}],
  quote:'"오픈에이아이 업무용 에이전트의 주간 사용자가 8월 19일 약 2,000만 명이라고 했습니다. 연초 약 20만, 7월 중순 약 600만이었습니다. 챗지피티 워크는 회사 계정으로 쓰는 업무용 제품입니다. 기업 판매가 50% 이상 늘고 전체 성장이 약 35% 빨라졌다는 숫자가 붙었습니다."',
  noteHead:'왜 중요한가',noteSub:'채팅 사용자가 아니라 업무 에이전트 스케일입니다. 클라우드와 칩 수요의 앞단 지표가 됩니다. 다음엔 유료 전환과 잔존율을 보면 됩니다.',footer:'OpenAI · 에이전트 2,000만',brand:BK},
 en:{title:'ChatGPT work-agent weekly users reached about 20 million',heroIcon:'🤖',heroBig:'20M',heroSub:'Weekly active users are people who used the product at least once in seven days. About 200k on January 1, about 6 million on July 12, about 20 million on August 19. After ChatGPT Work, enterprise sales are described up more than 50% and overall growth about 35% faster quarter-to-date.',
  cards:[{icon:'📈',big:'20M',mid:'Aug 19 WAU',sub:'Agents'},{icon:'🏢',big:'+50%+',mid:'Enterprise sales',sub:'After Work'},{icon:'📊',big:'+35%',mid:'Overall growth',sub:'QTD'}],
  quote:'"OpenAI said work-agent weekly users were about 20 million on August 19. That is up from about 200k at year-start and about 6 million in mid-July. ChatGPT Work is the company-account product. Enterprise sales are described up more than 50%, with overall growth about 35% faster quarter-to-date."',
  noteHead:'Why this matters',noteSub:'This is work-agent scale, not casual chat. It is a leading tell for cloud and chip demand. Next: paid conversion and retention.',footer:'OpenAI · 20M agents',brand:BE}},

{file:'be-pelosi-bloom-energy',symbol:'BE',
 ko:{title:'낸시 펠로시가 블룸 에너지를 주식과 콜옵션으로 매수했다고 공시했습니다',heroIcon:'⚡',heroBig:'BE',heroSub:'블룸 에너지는 연료전지로 전력을 만드는 회사입니다. 공시는 2026년 8월 21일이고, 거래는 7월 말입니다. 주식과 콜을 합치면 상한 약 1,200만 달러 밴드로 읽힙니다. 같은 표에 인텔 매수도 있습니다. 화면 가격은 약 204.02달러, +1.28%였습니다.',
  cards:[{icon:'📝',big:'8/21',mid:'공시일',sub:'7월 말 거래'},{icon:'💵',big:'~$12M',mid:'상한 밴드',sub:'주식+콜'},{icon:'💻',big:'INTC',mid:'콜·주식',sub:'같은 공시'}],
  quote:'"낸시 펠로시 공시에 블룸 에너지 주식과 콜옵션 매수가 적혀 있습니다. 콜옵션은 정해진 가격에 살 수 있는 권리입니다. 금액은 구간 공시라 정확한 주수는 아닙니다. 인텔 콜과 주식 매수도 같은 표에 있습니다. 거래는 7월 말, 공시는 8월 21일입니다."',
  noteHead:'왜 중요한가',noteSub:'고위 정치인 거래는 헤드라인이 크지만, 구간 공시라 수급 신호로 쓰기 어렵습니다. 연료전지는 데이터센터 전력 테마와 겹칩니다. 이해충돌 논쟁과 펀더멘털은 따로 보면 됩니다.',footer:'BE · 펠로시 공시',brand:BK},
 en:{title:'Nancy Pelosi disclosed Bloom Energy stock and call purchases',heroIcon:'⚡',heroBig:'BE',heroSub:'Bloom Energy makes power with fuel cells. The filing is August 21, 2026; trades were late July. Combined stock and calls read up to about a $12 million band. The same table shows Intel buys. The quote was about $204.02, up 1.28%.',
  cards:[{icon:'📝',big:'Aug 21',mid:'Filed',sub:'Traded late July'},{icon:'💵',big:'~$12M',mid:'Upper band',sub:'Stock + calls'},{icon:'💻',big:'INTC',mid:'Calls and stock',sub:'Same filing'}],
  quote:'"Nancy Pelosi’s filing lists Bloom Energy stock and call buys. A call is the right to buy at a set price. Amounts are ranges, not share counts. Intel calls and stock sit on the same table. Trades were late July; the file date is August 21."',
  noteHead:'Why this matters',noteSub:'Politician trades make headlines, but range filings are weak flow signals. Fuel cells overlap the datacenter power theme. Keep conflict debate separate from fundamentals.',footer:'BE · Pelosi filing',brand:BE}},

{file:'macro-us-net-interest-32-gdp',symbol:'MACRO',
 ko:{title:'미국 국채 이자 순지급이 국내총생산의 약 3.2%로, 1991년 이후 가장 높습니다',heroIcon:'📉',heroBig:'3.2%',heroSub:'순이자는 정부가 받은 이자에서 지급한 이자를 뺀 값입니다. 국내총생산 대비 비중이 약 3.2%까지 올라갔습니다. 금리가 높고 빚이 쌓이면 이 비율이 커집니다.',
  cards:[{icon:'📈',big:'3.2%',mid:'GDP 대비 순이자',sub:'최근 수준'},{icon:'📅',big:'1991',mid:'이후 최고',sub:'약 35년'},{icon:'🏦',big:'국채',mid:'이자 부담',sub:'재정 제약'}],
  quote:'"미국 연방 순이자 지급이 국내총생산의 약 3.2%라는 그래프가 나왔습니다. 1991년 이후 가장 높은 비중입니다. 순이자는 정부가 실제로 떠안는 이자 부담입니다. 성장보다 이자 지출이 먼저 커지면 다른 예산이 밀립니다."',
  noteHead:'왜 중요한가',noteSub:'장기 금리와 재정이 같은 방향으로 조여집니다. 성장주 할인율과 국채 수급이 한 묶음입니다. 다음엔 금리가 유지되는지, 성장이 따라오는지 보면 됩니다.',footer:'MACRO · 순이자 3.2% of GDP',brand:BK},
 en:{title:'US net interest is about 3.2% of GDP, the highest share since 1991',heroIcon:'📉',heroBig:'3.2%',heroSub:'Net interest is interest paid minus interest received by the government. The share of GDP is about 3.2%. High yields plus a large debt stock lift that ratio.',
  cards:[{icon:'📈',big:'3.2%',mid:'Net interest / GDP',sub:'Latest'},{icon:'📅',big:'1991',mid:'Highest since',sub:'~35 years'},{icon:'🏦',big:'Treasuries',mid:'Interest burden',sub:'Fiscal squeeze'}],
  quote:'"A chart puts US federal net interest near 3.2% of GDP, the highest since 1991. Net interest is the government’s true interest burden. If interest outruns growth, other budget items get crowded out."',
  noteHead:'Why this matters',noteSub:'Long rates and the fiscal accounts tighten together. Growth-stock discount rates and Treasury supply are one bundle. Next: whether yields stay high or growth catches up.',footer:'MACRO · Net interest 3.2% of GDP',brand:BE}},

{file:'macro-gold-btc-4710-78143',symbol:'MACRO',
 ko:{title:'금 선물과 비트코인이 같이 올랐습니다. 12월 금은 약 4,710달러입니다',heroIcon:'🥇',heroBig:'$4,711',heroSub:'뉴욕상품거래소 12월 2026 금 선물이 약 4,710.60달러, 하루 +0.64%였습니다. 비트코인은 약 78,143.22달러, +1.02%였습니다. 선물은 나중에 받기로 한 가격입니다.',
  cards:[{icon:'🥇',big:'$4,710.60',mid:'금 12월물',sub:'+0.64%'},{icon:'🪙',big:'$78,143',mid:'비트코인',sub:'+1.02%'},{icon:'📅',big:'Dec’26',mid:'COMEX',sub:'만기 표시'}],
  quote:'"금 12월 2026 선물이 약 4,710.60달러로 올랐고, 비트코인은 약 78,143달러였습니다. 선물 가격은 만기에 금을 인도받기로 한 계약 가격입니다. 두 자산이 같은 화면에 오른 것은 위험 회피와 유동성 기대가 섞인 날로 읽힙니다. 하루 등락은 추세 확정이 아닙니다."',
  noteHead:'왜 중요한가',noteSub:'이자 부담이 커진 주에 실물·암호자산이 같이 움직이면 헤지 수요인지 위험 선호인지를 가려야 합니다. 다음엔 실질금리와 달러 방향을 보면 됩니다.',footer:'MACRO · 금·비트코인',brand:BK},
 en:{title:'Gold futures and bitcoin rose together; December gold was about $4,711',heroIcon:'🥇',heroBig:'$4,711',heroSub:'COMEX December 2026 gold settled near $4,710.60, up 0.64%. Bitcoin was about $78,143.22, up 1.02%. A futures price is the contracted later delivery price.',
  cards:[{icon:'🥇',big:'$4,710.60',mid:'Gold Dec contract',sub:'+0.64%'},{icon:'🪙',big:'$78,143',mid:'Bitcoin',sub:'+1.02%'},{icon:'📅',big:'Dec’26',mid:'COMEX',sub:'Expiry tag'}],
  quote:'"December 2026 gold was about $4,710.60 and bitcoin about $78,143. A futures price is the contracted delivery price. Both printing green on one screen can mix haven demand and liquidity hopes. One session is not a trend."',
  noteHead:'Why this matters',noteSub:'In a week of heavier interest costs, joint gold and bitcoin moves need a split between hedge demand and risk appetite. Next: real yields and the dollar.',footer:'MACRO · Gold and bitcoin',brand:BE}},
];



let n=0;
// 한장요약은 7/2 리스트형(제목+본문 1문장)으로 수동 유지. TOP 그리드로 덮어쓰지 말 것.
// public/charts/summary-20260825.svg · -en.svg
n+=2;

for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-${DATETAG}.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-${DATETAG}-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics + summary × KO/EN)`);
